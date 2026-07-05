import { afterAll, afterEach, describe, expect, it } from "bun:test";
import fs from "fs-extra";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { registryHandler } from "../src/commands/registry";
import { addPack, listInstalledPacks } from "../src/helpers/core/registry-handler";

const FIXTURES = join(import.meta.dir, "fixtures", "registry");
const SAMPLE_PACK = join(FIXTURES, "sample-pack");
const INVALID_PACK = join(FIXTURES, "invalid-pack");
const TRAVERSAL_FILE_PACK = join(FIXTURES, "traversal-file-pack");
const TRAVERSAL_DEP_PACK = join(FIXTURES, "traversal-dep-pack");
const TEMP_ROOTS: string[] = [];

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

afterAll(async () => {
  await Promise.all(TEMP_ROOTS.map((dir) => rm(dir, { recursive: true, force: true })));
});

describe("registry add", () => {
  it("installs a pack: writes files, merges deps, appends env, records the install", async () => {
    const dir = await stageProject();

    const result = await addPack({ projectDir: dir, source: SAMPLE_PACK });

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
    await addPack({ projectDir: dir, source: SAMPLE_PACK });

    // Re-running skips already-present files and does not duplicate env keys.
    const second = await addPack({ projectDir: dir, source: SAMPLE_PACK });
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

  it("--dry-run writes nothing", async () => {
    const dir = await stageProject();
    const before = await readServerPackageJson(dir);

    const result = await addPack({ projectDir: dir, source: SAMPLE_PACK, dryRun: true });
    expect(result.dryRun).toBe(true);
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

  it("errors when the project has no bts.jsonc", async () => {
    const dir = await mkdtemp(join(tmpdir(), "bfs-registry-empty-"));
    TEMP_ROOTS.push(dir);
    await expect(addPack({ projectDir: dir, source: SAMPLE_PACK })).rejects.toThrow(
      /No Better Fullstack project found/,
    );
  });
});

describe("registry list", () => {
  const originalLog = console.log;

  afterEach(() => {
    console.log = originalLog;
  });

  it("reflects installed packs and prints JSON via the command handler", async () => {
    const dir = await stageProject();
    await addPack({ projectDir: dir, source: SAMPLE_PACK });

    const packs = await listInstalledPacks(dir);
    expect(packs).toHaveLength(1);
    expect(packs[0]?.name).toBe("@acme/rate-limit");

    let captured = "";
    console.log = (...args: unknown[]) => {
      captured += args.map(String).join(" ");
    };
    await registryHandler({ action: "list", projectDir: dir, json: true });
    console.log = originalLog;

    const parsed = JSON.parse(captured) as Array<{ name: string; version: string }>;
    expect(parsed).toHaveLength(1);
    expect(parsed[0]?.name).toBe("@acme/rate-limit");
    expect(parsed[0]?.version).toBe("1.0.0");
  });

  it("prints an empty JSON array when nothing is installed", async () => {
    const dir = await stageProject();
    let captured = "";
    console.log = (...args: unknown[]) => {
      captured += args.map(String).join(" ");
    };
    await registryHandler({ action: "list", projectDir: dir, json: true });
    console.log = originalLog;
    expect(JSON.parse(captured)).toEqual([]);
  });
});
