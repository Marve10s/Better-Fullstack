import { afterAll, afterEach, describe, expect, it } from "bun:test";
import fs from "fs-extra";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { registryHandler } from "@/commands/generation/registry";
import {
  addPack,
  applyPackInstall,
  listInstalledPacks,
  planPackInstall,
  type RegistryAddOptions,
  type RegistryApplyOptions,
} from "@/helpers/core/registry-handler";

const FIXTURES = join(import.meta.dir, "..", "fixtures", "registry");
const SAMPLE_PACK = join(FIXTURES, "sample-pack");
const INVALID_PACK = join(FIXTURES, "invalid-pack");
const TRAVERSAL_FILE_PACK = join(FIXTURES, "traversal-file-pack");
const TRAVERSAL_DEP_PACK = join(FIXTURES, "traversal-dep-pack");
const TEMP_ROOTS: string[] = [];
const originalLog = console.log;

async function stageProject(): Promise<string> {
  const dir = await mkdtemp(join(tmpdir(), "bfs-registry-"));
  TEMP_ROOTS.push(dir);
  await fs.copy(join(FIXTURES, "project"), dir);
  return dir;
}

function serverFile(dir: string, rel: string): string {
  return join(dir, "apps", "server", rel);
}

async function readServerPackageJson(dir: string): Promise<{
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}> {
  return fs.readJson(serverFile(dir, "package.json"));
}

async function applyReviewedPack(options: RegistryAddOptions, hooks?: RegistryApplyOptions) {
  const plan = await planPackInstall(options);
  if (!plan.reviewToken) throw new Error("Registry plan did not issue a review token.");
  return applyPackInstall(options, plan.reviewToken, hooks);
}

afterAll(async () => {
  await Promise.all(TEMP_ROOTS.map((dir) => rm(dir, { recursive: true, force: true })));
});

afterEach(() => {
  console.log = originalLog;
  process.exitCode = undefined;
});

async function captureJsonOutput(action: () => Promise<void>): Promise<unknown> {
  let captured = "";
  console.log = (...args: unknown[]) => {
    captured += args.map(String).join(" ");
  };
  await action();
  return JSON.parse(captured);
}

async function runRegistryJsonAdd(input: { projectDir: string; source?: string }): Promise<{
  exitCode: number;
  output: { ok: boolean; error: string };
}> {
  const originalExit = process.exit;
  let exitCode = 0;
  let captured = "";
  console.log = (...args: unknown[]) => {
    captured += args.map(String).join(" ");
  };
  process.exit = ((code?: number) => {
    exitCode = code ?? 0;
    throw new Error("__REGISTRY_PROCESS_EXIT__");
  }) as typeof process.exit;

  try {
    await registryHandler({
      action: "add",
      json: true,
      projectDir: input.projectDir,
      source: input.source,
    });
  } catch (error) {
    if (!(error instanceof Error) || error.message !== "__REGISTRY_PROCESS_EXIT__") throw error;
  } finally {
    process.exit = originalExit;
    console.log = originalLog;
  }

  return { exitCode, output: JSON.parse(captured) };
}

describe("registry add", () => {
  it("installs a pack: writes files, merges deps, appends env, records the install", async () => {
    const dir = await stageProject();

    const result = await applyReviewedPack({ projectDir: dir, source: SAMPLE_PACK });

    expect(result.dryRun).toBe(false);
    expect(result.pack).toEqual({ name: "@acme/rate-limit", version: "1.0.0" });

    // Files written (plain + templated).
    expect(result.filesWritten).toContain("apps/server/src/lib/rate-limit.ts");
    expect(result.filesWritten).toContain("apps/server/src/lib/rate-limit-meta.ts");
    const plain = await fs.readFile(serverFile(dir, "src/lib/rate-limit.ts"), "utf-8");
    expect(plain).toContain("export function rateLimitKey(ip: string)");
    const templated = await fs.readFile(serverFile(dir, "src/lib/rate-limit-meta.ts"), "utf-8");
    // {{ecosystem}} rendered from the project's bts.jsonc (typescript).
    expect(templated).toContain('export const RATE_LIMIT_ECOSYSTEM = "typescript";');

    // Dependencies merged into apps/server/package.json (existing dep preserved).
    const pkg = await readServerPackageJson(dir);
    expect(pkg.dependencies?.["@acme/token-bucket"]).toBe("^1.0.0");
    expect(pkg.dependencies?.hono).toBe("^4.0.0");
    expect(pkg.devDependencies?.["@types/acme-token-bucket"]).toBe("^1.0.0");

    // Env var appended to apps/server/.env.example (existing var preserved).
    const env = await fs.readFile(serverFile(dir, ".env.example"), "utf-8");
    expect(env).toContain("DATABASE_URL=");
    expect(env).toContain("RATE_LIMIT_MAX=100");
    expect(env).toContain("# Max requests per window");

    // Lockfile records the install.
    const lock = await fs.readJson(join(dir, ".better-fullstack", "registry.json"));
    expect(lock.packs).toHaveLength(1);
    expect(lock.packs[0].name).toBe("@acme/rate-limit");
    expect(lock.packs[0].files).toContain("apps/server/src/lib/rate-limit.ts");

    // bts.jsonc additively records the pack + declared addon metadata.
    const bts = await fs.readFile(join(dir, "bts.jsonc"), "utf-8");
    expect(bts).toContain('"@acme/rate-limit@1.0.0"');
    expect(bts).toContain('"rate-limit"');
  });

  it("is idempotent for env/files and dedupes the lock on re-install", async () => {
    const dir = await stageProject();
    await applyReviewedPack({ projectDir: dir, source: SAMPLE_PACK });

    // Re-running skips already-present files and does not duplicate env keys.
    const second = await applyReviewedPack({ projectDir: dir, source: SAMPLE_PACK });
    expect(second.filesWritten).toEqual([]);
    expect(second.filesSkipped).toContain("apps/server/src/lib/rate-limit.ts");

    const env = await fs.readFile(serverFile(dir, ".env.example"), "utf-8");
    expect(env.match(/RATE_LIMIT_MAX=/g)?.length).toBe(1);

    const lock = await fs.readJson(join(dir, ".better-fullstack", "registry.json"));
    expect(lock.packs).toHaveLength(1);
  });

  it("rejects an invalid manifest with a clear validation error", async () => {
    const dir = await stageProject();
    await expect(addPack({ projectDir: dir, source: INVALID_PACK })).rejects.toThrow(
      /Invalid capability pack manifest/,
    );
    // Nothing was recorded.
    expect(await fs.pathExists(join(dir, ".better-fullstack", "registry.json"))).toBe(false);
  });

  it("rejects a pack whose file path escapes the project dir (path traversal)", async () => {
    const dir = await stageProject();
    await expect(addPack({ projectDir: dir, source: TRAVERSAL_FILE_PACK })).rejects.toThrow(
      /escapes the project directory/,
    );
    expect(await fs.pathExists(join(dir, "..", "outside.txt"))).toBe(false);
  });

  it("rejects a pack whose dependency target dir escapes the project dir", async () => {
    const dir = await stageProject();
    await expect(addPack({ projectDir: dir, source: TRAVERSAL_DEP_PACK })).rejects.toThrow(
      /escapes the project directory/,
    );
  });

  it("rejects file writes that escape through an existing project symlink", async () => {
    const dir = await stageProject();
    const outside = await mkdtemp(join(tmpdir(), "bfs-registry-outside-"));
    TEMP_ROOTS.push(outside);
    await fs.ensureDir(join(dir, "apps", "server", "src"));
    await fs.symlink(outside, join(dir, "apps", "server", "src", "lib"), "dir");

    await expect(addPack({ projectDir: dir, source: SAMPLE_PACK })).rejects.toThrow(
      /escapes the project directory through a symlink/,
    );
    expect(await fs.pathExists(join(outside, "rate-limit.ts"))).toBe(false);
  });

  it("rejects dependency merges that escape through an existing project symlink", async () => {
    const dir = await stageProject();
    const outside = await mkdtemp(join(tmpdir(), "bfs-registry-dep-outside-"));
    TEMP_ROOTS.push(outside);
    await fs.writeJson(join(outside, "package.json"), { name: "outside" });
    await fs.remove(join(dir, "apps", "server"));
    await fs.symlink(outside, join(dir, "apps", "server"), "dir");
    const pack = await mkdtemp(join(tmpdir(), "bfs-registry-dep-pack-"));
    TEMP_ROOTS.push(pack);
    await fs.writeJson(join(pack, "registry.json"), {
      name: "@evil/symlink-dependency",
      version: "1.0.0",
      description: "Dependency-only symlink escape fixture",
      files: [],
      dependencies: { "apps/server": { escaped: "1.0.0" } },
      env: [],
    });

    await expect(addPack({ projectDir: dir, source: pack })).rejects.toThrow(
      /escapes the project directory through a symlink/,
    );
    expect(await fs.readJson(join(outside, "package.json"))).toEqual({ name: "outside" });
  });

  it("--dry-run writes nothing", async () => {
    const dir = await stageProject();
    const before = await readServerPackageJson(dir);

    const result = await addPack({ projectDir: dir, source: SAMPLE_PACK, dryRun: true });
    expect(result.dryRun).toBe(true);
    expect(result.mode).toBe("plan");
    expect(result.reviewToken).toStartWith("v2.");
    expect(result.filesWritten).toContain("apps/server/src/lib/rate-limit.ts");
    expect(result.dependencies.map((dep) => dep.name)).toContain("@acme/token-bucket");
    expect(result.envKeys).toContain("RATE_LIMIT_MAX");

    // No files, deps, env, or lockfile touched.
    expect(await fs.pathExists(serverFile(dir, "src/lib/rate-limit.ts"))).toBe(false);
    expect(await readServerPackageJson(dir)).toEqual(before);
    const env = await fs.readFile(serverFile(dir, ".env.example"), "utf-8");
    expect(env).not.toContain("RATE_LIMIT_MAX");
    expect(await fs.pathExists(join(dir, ".better-fullstack", "registry.json"))).toBe(false);
  });

  it("rejects a stale review token before any write", async () => {
    const dir = await stageProject();
    const plan = await planPackInstall({ projectDir: dir, source: SAMPLE_PACK });
    const packageJsonPath = serverFile(dir, "package.json");
    const packageJson = await fs.readJson(packageJsonPath);
    await fs.writeJson(packageJsonPath, { ...packageJson, concurrentEdit: true }, { spaces: 2 });

    const result = await applyPackInstall(
      { projectDir: dir, source: SAMPLE_PACK },
      plan.reviewToken,
    );

    expect(result.mode).toBe("blocked");
    expect(await fs.pathExists(serverFile(dir, "src/lib/rate-limit.ts"))).toBe(false);
    expect(await fs.pathExists(join(dir, ".better-fullstack", "registry.json"))).toBe(false);
  });

  it("rolls back after a failure at every registry write boundary", async () => {
    const probeDir = await stageProject();
    const probe = await planPackInstall({ projectDir: probeDir, source: SAMPLE_PACK });

    for (const failureIndex of probe.files.keys()) {
      const dir = await stageProject();
      const packageBefore = await fs.readFile(serverFile(dir, "package.json"), "utf-8");
      const envBefore = await fs.readFile(serverFile(dir, ".env.example"), "utf-8");
      const configBefore = await fs.readFile(join(dir, "bts.jsonc"), "utf-8");

      const result = await applyReviewedPack(
        { projectDir: dir, source: SAMPLE_PACK },
        {
          afterWrite: (_file, index) => {
            if (index === failureIndex) throw new Error("injected registry write failure");
          },
        },
      );

      expect(result.mode).toBe("rolled-back");
      expect(await fs.pathExists(serverFile(dir, "src/lib/rate-limit.ts"))).toBe(false);
      expect(await fs.readFile(serverFile(dir, "package.json"), "utf-8")).toBe(packageBefore);
      expect(await fs.readFile(serverFile(dir, ".env.example"), "utf-8")).toBe(envBefore);
      expect(await fs.readFile(join(dir, "bts.jsonc"), "utf-8")).toBe(configBefore);
      expect(await fs.pathExists(join(dir, ".better-fullstack", "registry.json"))).toBe(false);
    }
  });

  it("reports package-manager work as a manual side effect", async () => {
    const dir = await stageProject();
    const result = await planPackInstall({ projectDir: dir, source: SAMPLE_PACK });

    expect(result.lifecycle.sideEffects).toContainEqual(
      expect.objectContaining({ kind: "package-manager", status: "manual" }),
    );
  });

  it("restores prior outputs when a registry disk write fails", async () => {
    const dir = await stageProject();
    const packageBefore = await fs.readFile(serverFile(dir, "package.json"), "utf-8");
    let writes = 0;
    const result = await applyReviewedPack(
      { projectDir: dir, source: SAMPLE_PACK },
      {
        writeFile: async (target, content) => {
          writes += 1;
          if (writes === 3) throw new Error("injected disk write failure");
          await fs.writeFile(target, content, "utf-8");
        },
      },
    );

    expect(result.mode).toBe("rolled-back");
    expect(await fs.pathExists(serverFile(dir, "src/lib/rate-limit.ts"))).toBe(false);
    expect(await fs.readFile(serverFile(dir, "package.json"), "utf-8")).toBe(packageBefore);
    expect(await fs.pathExists(join(dir, ".better-fullstack", "registry.json"))).toBe(false);
  });

  it("writes nothing when the registry recovery snapshot cannot be created", async () => {
    const dir = await stageProject();
    const result = await applyReviewedPack(
      { projectDir: dir, source: SAMPLE_PACK },
      {
        beforeTransactionSnapshot: () => {
          throw new Error("injected snapshot failure");
        },
      },
    );

    expect(result.mode).toBe("failed");
    expect(await fs.pathExists(serverFile(dir, "src/lib/rate-limit.ts"))).toBe(false);
    expect(await fs.pathExists(join(dir, ".better-fullstack", "registry.json"))).toBe(false);
  });

  it("errors when the project has no bts.jsonc", async () => {
    const dir = await mkdtemp(join(tmpdir(), "bfs-registry-empty-"));
    TEMP_ROOTS.push(dir);
    await expect(addPack({ projectDir: dir, source: SAMPLE_PACK })).rejects.toThrow(
      /No Better Fullstack project found/,
    );
  });

  it("prints parseable JSON errors in command JSON mode", async () => {
    const dir = await stageProject();

    const missingSource = await runRegistryJsonAdd({ projectDir: dir });
    expect(missingSource.exitCode).toBe(1);
    expect(missingSource.output.ok).toBe(false);
    expect(missingSource.output.error).toContain("registry add requires a <source>");

    const invalidManifest = await runRegistryJsonAdd({ projectDir: dir, source: INVALID_PACK });
    expect(invalidManifest.exitCode).toBe(1);
    expect(invalidManifest.output.ok).toBe(false);
    expect(invalidManifest.output.error).toContain("Invalid capability pack manifest");
  });

  it("prints the complete versioned plan in command JSON mode", async () => {
    const dir = await stageProject();
    const parsed = (await captureJsonOutput(() =>
      registryHandler({
        action: "add",
        projectDir: dir,
        source: SAMPLE_PACK,
        json: true,
      }),
    )) as { mode?: string; files?: unknown[]; lifecycle?: { contractVersion?: string } };

    expect(parsed.mode).toBe("plan");
    expect(parsed.files?.length).toBeGreaterThan(0);
    expect(parsed.lifecycle?.contractVersion).toBe("2");
  });
});

describe("registry list", () => {
  it("reflects installed packs and prints JSON via the command handler", async () => {
    const dir = await stageProject();
    await applyReviewedPack({ projectDir: dir, source: SAMPLE_PACK });

    const packs = await listInstalledPacks(dir);
    expect(packs).toHaveLength(1);
    expect(packs[0]?.name).toBe("@acme/rate-limit");

    const parsed = (await captureJsonOutput(() =>
      registryHandler({ action: "list", projectDir: dir, json: true }),
    )) as Array<{ name: string; version: string }>;
    expect(parsed).toHaveLength(1);
    expect(parsed[0]?.name).toBe("@acme/rate-limit");
    expect(parsed[0]?.version).toBe("1.0.0");
  });

  it("prints an empty JSON array when nothing is installed", async () => {
    const dir = await stageProject();
    const parsed = await captureJsonOutput(() =>
      registryHandler({ action: "list", projectDir: dir, json: true }),
    );
    expect(parsed).toEqual([]);
  });
});
