import {
  RECOVERY_ROOT,
  recoverProjectTransaction,
} from "@better-fullstack/project-lifecycle/transaction";
import { EMBEDDED_TEMPLATES, generateVirtualProject } from "@better-fullstack/template-generator";
import { writeTreeToFilesystem } from "@better-fullstack/template-generator/fs-writer";
import { createCliDefaultProjectConfigBase, type ProjectConfig } from "@better-fullstack/types";
import { afterAll, describe, expect, it } from "bun:test";
import {
  chmod,
  cp,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rename,
  rm,
  stat,
  symlink,
  unlink,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, dirname, join } from "node:path";

import {
  getUpdateApplyAuthorizationError,
  getUpdateApplyCommand,
  getUpdateApplyCommandFlavor,
  quotePowerShellArgument,
  quotePosixShellArgument,
  toJsonPlan,
} from "@/commands/lifecycle/update";
import { buildBtsConfigForPersistence, writeBtsConfig } from "@/config/bts-config";
import {
  applyScaffoldUpgrade,
  getUpgradePlanDigest,
  planScaffoldUpgrade,
} from "@/helpers/core/scaffold-upgrade";
import { planProjectAdoption } from "@/lifecycle/project-adoption";
import {
  collectStructuredBaselines,
  hashContent,
  readScaffoldManifest,
  readScaffoldManifestResult,
  recordScaffoldManifest,
  refreshScaffoldManifestFiles,
  SCAFFOLD_MANIFEST_FILE,
  writeScaffoldManifest,
} from "@/lifecycle/scaffold-manifest";
import { formatProject } from "@/platform/file-formatter";
import { getLatestCLIVersion } from "@/platform/get-latest-cli-version";

const TEMP_ROOTS: string[] = [];

afterAll(async () => {
  await Promise.all(TEMP_ROOTS.map((dir) => rm(dir, { recursive: true, force: true })));
});

async function makeTempDir(): Promise<string> {
  const dir = await mkdtemp(join(tmpdir(), "bfs-upgrade-"));
  TEMP_ROOTS.push(dir);
  return dir;
}

async function simulateStoppedTransactionOwner(projectDir: string): Promise<void> {
  const recoveryRoot = join(projectDir, RECOVERY_ROOT);
  const lockName = (await readdir(recoveryRoot))
    .filter((name) => name === "active.lock" || /^active\.lock\.\d{12}$/.test(name))
    .sort()
    .at(-1);
  if (!lockName) throw new Error("Expected a lifecycle transaction lock generation.");
  const lockPath = join(recoveryRoot, lockName);
  const lock = JSON.parse(await readFile(lockPath, "utf-8")) as Record<string, unknown>;
  lock.pid = 2_147_483_647;
  await writeFile(lockPath, `${JSON.stringify(lock)}\n`);
}

function makeConfig(projectDir: string, overrides: Partial<ProjectConfig> = {}): ProjectConfig {
  return {
    ...createCliDefaultProjectConfigBase(),
    projectName: "upgrade-app",
    projectDir,
    relativePath: ".",
    git: false,
    install: false,
    frontend: ["tanstack-router"],
    backend: "hono",
    runtime: "bun",
    api: "trpc",
    database: "sqlite",
    orm: "drizzle",
    auth: "none",
    ...overrides,
  } as ProjectConfig;
}

/**
 * Scaffold a project to disk the same way `createProject` does at the point the
 * baseline is recorded: write the generated tree, persist bts.jsonc, format on
 * disk, then record the scaffold manifest. (Skips install + post-processing,
 * which are irrelevant to template-drift classification.)
 */
async function scaffoldWithBaseline(projectDir: string, config: ProjectConfig): Promise<void> {
  const persistedConfig = buildBtsConfigForPersistence(config);
  const normalizedConfig = {
    ...config,
    ...persistedConfig,
    projectName: config.projectName,
    projectDir,
    relativePath: ".",
    git: false,
    install: false,
  } as ProjectConfig;

  const result = await generateVirtualProject({
    config: normalizedConfig,
    templates: EMBEDDED_TEMPLATES,
  });
  if (!result.success || !result.tree) {
    throw new Error(result.error ?? "Failed to generate fixture project");
  }
  await writeTreeToFilesystem(result.tree, projectDir);
  await writeBtsConfig(normalizedConfig, {
    version: persistedConfig.version,
    createdAt: persistedConfig.createdAt,
  });
  await formatProject(projectDir);
  await recordScaffoldManifest(projectDir, {
    baselines: collectStructuredBaselines(result.tree),
  });
}

function assertSuccess<T extends { success: boolean }>(
  result: T,
): asserts result is Extract<T, { success: true }> {
  expect(result.success).toBe(true);
}

function applyAcknowledged(
  projectDir: string,
  options: Parameters<typeof applyScaffoldUpgrade>[1] = {},
) {
  return applyScaffoldUpgrade(projectDir, {
    ...options,
    acknowledgeUnprovenManifestV1: true,
  });
}

/** Pick a plain source file that is safe to treat as pure template content. */
function pickSourceFile(paths: string[], exclude: string[] = []): string {
  const excluded = new Set(exclude);
  const candidate = paths.find(
    (candidatePath) =>
      !excluded.has(candidatePath) &&
      /\.(ts|tsx)$/.test(candidatePath) &&
      !candidatePath.endsWith(".d.ts") &&
      !candidatePath.endsWith("package.json"),
  );
  if (!candidate) throw new Error("No suitable source file found in the generated project");
  return candidate;
}

describe("scaffold-upgrade engine", () => {
  it("records a baseline manifest at scaffold time with sensible hashes", async () => {
    const dir = await makeTempDir();
    await scaffoldWithBaseline(dir, makeConfig(dir));

    const manifest = await readScaffoldManifest(dir);
    expect(manifest).not.toBeNull();
    const hashes = manifest!.hashes;
    const modes = manifest!.modes;
    expect(Object.keys(hashes).length).toBeGreaterThan(10);
    expect(Object.keys(modes ?? {})).toEqual(Object.keys(hashes));
    // Excluded from its own walk + the config file is not template-comparable.
    expect(hashes[SCAFFOLD_MANIFEST_FILE]).toBeUndefined();
    expect(hashes["bts.jsonc"]).toBeUndefined();
    // Every value is a sha256 hex digest.
    for (const value of Object.values(hashes)) {
      expect(value).toMatch(/^[0-9a-f]{64}$/);
    }
    for (const value of Object.values(modes ?? {})) {
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(0o7777);
    }
  });

  it("refreshes the recorded mode for an existing reconciled file", async () => {
    const dir = await makeTempDir();
    const executable = join(dir, "mvnw");
    await writeFile(executable, "#!/bin/sh\n");
    await chmod(executable, 0o644);
    await recordScaffoldManifest(dir);

    await chmod(executable, 0o755);
    await refreshScaffoldManifestFiles(dir, ["mvnw"]);

    const manifest = await readScaffoldManifest(dir);
    expect(manifest?.modes?.mvnw).toBe((await stat(executable)).mode & 0o7777);
  });

  it("fails closed on malformed manifest-v1 field shapes", async () => {
    const dir = await makeTempDir();
    const valid = {
      version: "1",
      createdAt: "2026-08-10T00:00:00.000Z",
      hashes: { "src/index.ts": "a".repeat(64) },
      baselines: { "package.json": "{}\n" },
    };
    const malformed = [
      { ...valid, version: 1 },
      { ...valid, createdAt: "not-a-date" },
      { ...valid, hashes: null },
      { ...valid, hashes: { "src/index.ts": "not-sha256" } },
      { ...valid, hashes: { "../outside.ts": "a".repeat(64) } },
      { ...valid, hashes: { "/absolute.ts": "a".repeat(64) } },
      { ...valid, hashes: { "": "a".repeat(64) } },
      { ...valid, baselines: null },
      { ...valid, baselines: { "package.json": 42 } },
      { ...valid, baselines: { "..\\outside.json": "{}" } },
    ];
    for (const candidate of malformed) {
      await writeFile(join(dir, SCAFFOLD_MANIFEST_FILE), JSON.stringify(candidate), "utf-8");
      const result = await readScaffoldManifestResult(dir);
      expect(result.status).toBe("invalid");
      expect(await readScaffoldManifest(dir)).toBeNull();
    }
  });

  it("migrates a valid manifest v1 deterministically without inventing provenance", async () => {
    const dir = await makeTempDir();
    const legacy = {
      version: "1",
      createdAt: "2026-08-10T00:00:00.000Z",
      hashes: { "src/index.ts": "a".repeat(64) },
      baselines: { "package.json": "{}\n" },
    };
    await writeFile(join(dir, SCAFFOLD_MANIFEST_FILE), JSON.stringify(legacy), "utf-8");

    const first = await readScaffoldManifestResult(dir);
    const second = await readScaffoldManifestResult(dir);
    expect(first).toEqual(second);
    expect(first).toMatchObject({
      status: "valid",
      migratedFromVersion: "1",
      manifest: {
        version: "2",
        provenance: { state: "migrated-v1", createdWith: null, current: null },
      },
    });
    if (first.status === "valid") {
      expect(first.manifest.history[0]?.id).toMatch(/^[0-9a-f]{24}$/);
      expect(first.manifest.modes).toBeUndefined();
    }
  });

  it("fails closed on malformed manifest file modes", async () => {
    const dir = await makeTempDir();
    const valid = {
      version: "2",
      createdAt: "2026-08-10T00:00:00.000Z",
      updatedAt: "2026-08-10T00:00:00.000Z",
      provenance: { state: "migrated-v1", createdWith: null, current: null },
      history: [],
      hashes: { "src/index.ts": "a".repeat(64) },
      modes: { "src/index.ts": 0o4644 },
    };
    const malformed = [
      { ...valid, modes: null },
      { ...valid, modes: { "../outside.ts": 0o644 } },
      { ...valid, modes: { "src/index.ts": "0644" } },
      { ...valid, modes: { "src/index.ts": 0o10000 } },
      { ...valid, modes: { "src/missing.ts": 0o644 } },
    ];

    for (const candidate of malformed) {
      await writeFile(join(dir, SCAFFOLD_MANIFEST_FILE), JSON.stringify(candidate), "utf-8");
      expect((await readScaffoldManifestResult(dir)).status).toBe("invalid");
    }
  });

  it("reports no drift on an untouched fresh project", async () => {
    const dir = await makeTempDir();
    await scaffoldWithBaseline(dir, makeConfig(dir));

    const plan = await planScaffoldUpgrade(dir);
    assertSuccess(plan);

    expect(plan.hasBaseline).toBe(true);
    expect(plan.unchanged.length).toBeGreaterThan(10);
    expect(plan.drift).toEqual([]);
    expect(plan.newFiles).toEqual([]);
    expect(plan.userEdited).toEqual([]);
    expect(plan.conflicts).toEqual([]);
    expect(plan.manual).toEqual([]);
    expect(plan.actionable).toEqual([]);
  });

  it("classifies a substantive future template change as drift from the raw baseline", async () => {
    const dir = await makeTempDir();
    await scaffoldWithBaseline(dir, makeConfig(dir));

    const baselinePlan = await planScaffoldUpgrade(dir);
    assertSuccess(baselinePlan);
    const target = pickSourceFile(baselinePlan.unchanged);
    const targetPath = join(dir, target);
    const originalRender = await readFile(targetPath, "utf-8");

    // Simulate a template that has since moved: the on-disk file differs from
    // the current render, but still matches the recorded baseline (user never
    // touched it). Rewrite disk + baseline together so disk == baseline.
    const drifted = `// simulated old template output\n${originalRender}`;
    await writeFile(targetPath, drifted, "utf-8");
    const manifest = await readScaffoldManifest(dir);
    expect(manifest).not.toBeNull();
    manifest!.hashes[target] = hashContent(Buffer.from(drifted, "utf-8"));
    await writeScaffoldManifest(dir, manifest!);

    const plan = await planScaffoldUpgrade(dir);
    assertSuccess(plan);
    expect(plan.drift).toContain(target);
    expect(plan.actionable).toContain(target);
    expect(plan.userEdited).not.toContain(target);
    expect(plan.conflicts).not.toContain(target);
    expect(plan.files.find((file) => file.path === target)?.preserveBaseline).not.toBe(true);
    expect(plan.actionableHashes[target]).toBe(hashContent(Buffer.from(originalRender, "utf-8")));

    const applied = await applyAcknowledged(dir);
    assertSuccess(applied);
    expect(applied.applied.patched).toContain(target);

    // Disk was patched back to the current render, and the baseline refreshed.
    expect(await readFile(targetPath, "utf-8")).toBe(originalRender);
    const refreshed = await readScaffoldManifest(dir);
    expect(refreshed!.hashes[target]).toBe(hashContent(Buffer.from(originalRender, "utf-8")));

    // A re-plan now sees the file as up to date.
    const rePlan = await planScaffoldUpgrade(dir);
    assertSuccess(rePlan);
    expect(rePlan.drift).not.toContain(target);
    expect(rePlan.unchanged).toContain(target);
  });

  it("classifies a user edit and leaves it untouched on apply", async () => {
    const dir = await makeTempDir();
    await scaffoldWithBaseline(dir, makeConfig(dir));

    const baselinePlan = await planScaffoldUpgrade(dir);
    assertSuccess(baselinePlan);
    const target = pickSourceFile(baselinePlan.unchanged);
    const targetPath = join(dir, target);

    // User edited the file: disk != baseline, while the template (render) still
    // matches the baseline. The baseline is left as-is.
    const edited = `// my local customization\nexport const CUSTOM = true;\n`;
    await writeFile(targetPath, edited, "utf-8");

    const plan = await planScaffoldUpgrade(dir);
    assertSuccess(plan);
    expect(plan.userEdited).toContain(target);
    expect(plan.drift).not.toContain(target);
    expect(plan.actionable).not.toContain(target);

    const applied = await applyAcknowledged(dir);
    assertSuccess(applied);
    expect(applied.applied.patched).not.toContain(target);
    // Left exactly as the user wrote it.
    expect(await readFile(targetPath, "utf-8")).toBe(edited);
  });

  it("treats a deleted baseline file as a local edit instead of a new template file", async () => {
    const dir = await makeTempDir();
    await scaffoldWithBaseline(dir, makeConfig(dir));

    const baselinePlan = await planScaffoldUpgrade(dir);
    assertSuccess(baselinePlan);
    const target = pickSourceFile(baselinePlan.unchanged);
    const targetPath = join(dir, target);

    await unlink(targetPath);

    const plan = await planScaffoldUpgrade(dir);
    assertSuccess(plan);
    expect(plan.userEdited).toContain(target);
    expect(plan.newFiles).not.toContain(target);
    expect(plan.actionable).not.toContain(target);

    const applied = await applyAcknowledged(dir);
    assertSuccess(applied);
    expect(applied.applied.added).not.toContain(target);
    await expect(readFile(targetPath, "utf-8")).rejects.toThrow();
  });

  it("preserves a user-renamed baseline file and keeps the missing original non-actionable", async () => {
    const dir = await makeTempDir();
    await scaffoldWithBaseline(dir, makeConfig(dir));
    const baseline = await planScaffoldUpgrade(dir);
    assertSuccess(baseline);
    const original = pickSourceFile(baseline.unchanged);
    const renamed = join(dirname(original), `local-${basename(original)}`);
    const originalBytes = await readFile(join(dir, original));
    await rename(join(dir, original), join(dir, renamed));

    const plan = await planScaffoldUpgrade(dir);
    assertSuccess(plan);
    expect(plan.userEdited).toContain(original);
    expect(plan.actionable).not.toContain(original);
    expect(plan.files.some((file) => file.path === renamed)).toBe(false);

    const applied = await applyAcknowledged(dir);
    assertSuccess(applied);
    expect(await readFile(join(dir, renamed))).toEqual(originalBytes);
    await expect(readFile(join(dir, original))).rejects.toThrow();
  });

  it("models a template rename as an additive new file and a retained removed path", async () => {
    const dir = await makeTempDir();
    await scaffoldWithBaseline(dir, makeConfig(dir));
    const baseline = await planScaffoldUpgrade(dir);
    assertSuccess(baseline);
    const currentPath = pickSourceFile(baseline.unchanged);
    const previousPath = join(dirname(currentPath), `legacy-${basename(currentPath)}`);
    const currentBytes = await readFile(join(dir, currentPath));
    await rename(join(dir, currentPath), join(dir, previousPath));
    const manifest = await readScaffoldManifest(dir);
    expect(manifest).not.toBeNull();
    delete manifest!.hashes[currentPath];
    manifest!.hashes[previousPath] = hashContent(currentBytes);
    const currentMode = manifest!.modes?.[currentPath];
    expect(currentMode).toBeDefined();
    delete manifest!.modes![currentPath];
    manifest!.modes![previousPath] = currentMode!;
    await writeScaffoldManifest(dir, manifest!);

    const plan = await planScaffoldUpgrade(dir);
    assertSuccess(plan);
    expect(plan.newFiles).toContain(currentPath);
    expect(plan.removed).toContain(previousPath);
    expect(plan.actionable).toContain(currentPath);
    const before = await readFile(join(dir, previousPath));

    const applied = await applyAcknowledged(dir);
    assertSuccess(applied);
    expect(await readFile(join(dir, currentPath))).toEqual(currentBytes);
    expect(await readFile(join(dir, previousPath))).toEqual(before);
    expect(applied.recoveryId).toBeDefined();
    await recoverProjectTransaction(dir, applied.recoveryId!);
    await expect(readFile(join(dir, currentPath))).rejects.toThrow();
    expect(await readFile(join(dir, previousPath))).toEqual(before);
  });

  it("flags a conflict when both the template and the local copy changed", async () => {
    const dir = await makeTempDir();
    await scaffoldWithBaseline(dir, makeConfig(dir));

    const baselinePlan = await planScaffoldUpgrade(dir);
    assertSuccess(baselinePlan);
    const target = pickSourceFile(baselinePlan.unchanged);
    const targetPath = join(dir, target);

    // disk != baseline AND render != baseline: point the baseline at a third
    // value so neither the disk nor the render matches it.
    await writeFile(targetPath, `// local change\n`, "utf-8");
    const manifest = await readScaffoldManifest(dir);
    manifest!.hashes[target] = hashContent("something-else-entirely");
    await writeScaffoldManifest(dir, manifest!);

    const plan = await planScaffoldUpgrade(dir);
    assertSuccess(plan);
    expect(plan.conflicts).toContain(target);
    expect(plan.drift).not.toContain(target);
    expect(plan.actionable).not.toContain(target);

    // Apply never overwrites a conflict.
    const applied = await applyAcknowledged(dir);
    assertSuccess(applied);
    expect(applied.applied.patched).not.toContain(target);
    expect(await readFile(targetPath, "utf-8")).toBe(`// local change\n`);
  });

  it("keeps a user-edited package.json as-is when the template side is unchanged", async () => {
    const dir = await makeTempDir();
    await scaffoldWithBaseline(dir, makeConfig(dir));

    const pkgPath = join(dir, "package.json");
    const pkg = JSON.parse(await readFile(pkgPath, "utf-8"));
    pkg.dependencies = { ...pkg.dependencies, "left-pad": "^1.3.0" };
    await writeFile(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`, "utf-8");

    const plan = await planScaffoldUpgrade(dir);
    assertSuccess(plan);
    expect(plan.userEdited).toContain("package.json");
    expect(plan.drift).not.toContain("package.json");
    expect(plan.actionable).not.toContain("package.json");

    // Never auto-written: the user's additions win when the template is idle.
    const applied = await applyAcknowledged(dir);
    assertSuccess(applied);
    expect(applied.applied.patched).not.toContain("package.json");
    expect(applied.applied.merged).not.toContain("package.json");
    expect(await readFile(pkgPath, "utf-8")).toContain("left-pad");
  });

  it("cleanly auto-merges a structured template addition with no local divergence", async () => {
    const dir = await makeTempDir();
    await scaffoldWithBaseline(dir, makeConfig(dir));
    const target = "apps/server/package.json";
    const pkgPath = join(dir, target);
    const render = JSON.parse(await readFile(pkgPath, "utf-8"));
    const [templateDep] = Object.keys(render.dependencies);
    expect(templateDep).toBeDefined();
    const older = structuredClone(render);
    delete older.dependencies[templateDep];
    const olderContent = `${JSON.stringify(older, null, 2)}\n`;
    const manifest = await readScaffoldManifest(dir);
    expect(manifest).not.toBeNull();
    manifest!.baselines![target] = olderContent;
    manifest!.hashes[target] = hashContent(olderContent);
    await writeScaffoldManifest(dir, manifest!);
    await writeFile(pkgPath, olderContent, "utf-8");

    const plan = await planScaffoldUpgrade(dir);
    assertSuccess(plan);
    expect(plan.merged).toContain(target);
    expect(plan.conflicts).not.toContain(target);
    const applied = await applyAcknowledged(dir);
    assertSuccess(applied);
    expect(JSON.parse(await readFile(pkgPath, "utf-8")).dependencies[templateDep!]).toBe(
      render.dependencies[templateDep!],
    );
  });

  it("structurally merges template dependency/script additions into a user-edited package.json", async () => {
    const dir = await makeTempDir();
    await scaffoldWithBaseline(dir, makeConfig(dir));

    const target = "apps/server/package.json";
    const pkgPath = join(dir, target);
    const render = JSON.parse(await readFile(pkgPath, "utf-8"));
    const [templateDep] = Object.keys(render.dependencies);
    const [templateScript, userScript] = Object.keys(render.scripts);
    expect(templateDep).toBeDefined();
    expect(userScript).toBeDefined();

    // Simulate an older template: drop one dependency and one script from both
    // the on-disk file and the recorded render baseline, so the current render
    // looks like a template that has since added them.
    const manifest = await readScaffoldManifest(dir);
    const baseline = JSON.parse(manifest!.baselines![target]!);
    delete baseline.dependencies[templateDep];
    delete baseline.scripts[templateScript];
    manifest!.baselines![target] = `${JSON.stringify(baseline, null, 2)}\n`;
    await writeScaffoldManifest(dir, manifest!);

    const edited = structuredClone(render);
    delete edited.dependencies[templateDep];
    delete edited.scripts[templateScript];
    // User edits: a new dependency plus a customized script the template never touched.
    edited.dependencies["left-pad"] = "^1.3.0";
    edited.scripts[userScript] = "echo custom";
    await writeFile(pkgPath, `${JSON.stringify(edited, null, 2)}\n`, "utf-8");

    const plan = await planScaffoldUpgrade(dir);
    assertSuccess(plan);
    expect(plan.merged).toContain(target);
    expect(plan.actionable).toContain(target);
    expect(plan.manual.map((entry) => entry.path)).not.toContain(target);
    expect(plan.lifecycle.affected.dependencies).toContainEqual(
      expect.objectContaining({
        name: templateDep,
        action: "update",
        version: render.dependencies[templateDep],
        target: `${target}:dependencies`,
      }),
    );

    const applied = await applyAcknowledged(dir);
    assertSuccess(applied);
    expect(applied.applied.merged).toContain(target);

    // Union: template additions folded in, user edits preserved.
    const result = JSON.parse(await readFile(pkgPath, "utf-8"));
    expect(result.dependencies[templateDep]).toBe(render.dependencies[templateDep]);
    expect(result.scripts[templateScript]).toBe(render.scripts[templateScript]);
    expect(result.dependencies["left-pad"]).toBe("^1.3.0");
    expect(result.scripts[userScript]).toBe("echo custom");

    // The content baseline advanced: a re-plan sees only the user's local edits.
    const rePlan = await planScaffoldUpgrade(dir);
    assertSuccess(rePlan);
    expect(rePlan.merged).not.toContain(target);
    expect(rePlan.userEdited).toContain(target);
    expect(rePlan.actionable).not.toContain(target);
  });

  it("flags a conflict when the template and the user changed the same dependency", async () => {
    const dir = await makeTempDir();
    await scaffoldWithBaseline(dir, makeConfig(dir));

    const target = "apps/server/package.json";
    const pkgPath = join(dir, target);
    const render = JSON.parse(await readFile(pkgPath, "utf-8"));
    const [dep] = Object.keys(render.dependencies);

    // Template changed the version (baseline differs from the current render)...
    const manifest = await readScaffoldManifest(dir);
    const baseline = JSON.parse(manifest!.baselines![target]!);
    baseline.dependencies[dep] = "0.0.1-old";
    manifest!.baselines![target] = `${JSON.stringify(baseline, null, 2)}\n`;
    await writeScaffoldManifest(dir, manifest!);

    // ...and the user pinned their own version.
    const edited = structuredClone(render);
    edited.dependencies[dep] = "9.9.9";
    await writeFile(pkgPath, `${JSON.stringify(edited, null, 2)}\n`, "utf-8");

    const plan = await planScaffoldUpgrade(dir);
    assertSuccess(plan);
    expect(plan.conflicts).toContain(target);
    expect(plan.actionable).not.toContain(target);
    const entry = plan.files.find((file) => file.path === target);
    expect(entry?.reason).toContain(`dependencies.${dep}`);

    // Apply never touches a conflicted file: the user's pin wins.
    const applied = await applyAcknowledged(dir);
    assertSuccess(applied);
    const result = JSON.parse(await readFile(pkgPath, "utf-8"));
    expect(result.dependencies[dep]).toBe("9.9.9");
  });

  it("blocks re-adding a dependency the user deleted when the template changed it", async () => {
    const dir = await makeTempDir();
    await scaffoldWithBaseline(dir, makeConfig(dir));

    const target = "apps/server/package.json";
    const pkgPath = join(dir, target);
    const render = JSON.parse(await readFile(pkgPath, "utf-8"));
    const [dep] = Object.keys(render.dependencies);

    // Template changed the version since the baseline...
    const manifest = await readScaffoldManifest(dir);
    const baseline = JSON.parse(manifest!.baselines![target]!);
    baseline.dependencies[dep] = "0.0.1-old";
    manifest!.baselines![target] = `${JSON.stringify(baseline, null, 2)}\n`;
    await writeScaffoldManifest(dir, manifest!);

    // ...and the user deleted the dependency entirely.
    const edited = structuredClone(render);
    delete edited.dependencies[dep];
    await writeFile(pkgPath, `${JSON.stringify(edited, null, 2)}\n`, "utf-8");

    const plan = await planScaffoldUpgrade(dir);
    assertSuccess(plan);
    expect(plan.conflicts).toContain(target);
    expect(plan.actionable).not.toContain(target);
    const entry = plan.files.find((file) => file.path === target);
    expect(entry?.reason).toContain(`dependencies.${dep}`);

    // Apply must not resurrect the deleted dependency.
    const applied = await applyAcknowledged(dir);
    assertSuccess(applied);
    const result = JSON.parse(await readFile(pkgPath, "utf-8"));
    expect(result.dependencies[dep]).toBeUndefined();
  });

  it("routes template changes outside the merged sections to manual review", async () => {
    const dir = await makeTempDir();
    await scaffoldWithBaseline(dir, makeConfig(dir));

    const target = "apps/server/package.json";
    const pkgPath = join(dir, target);
    const render = JSON.parse(await readFile(pkgPath, "utf-8"));

    // Simulate an older template that shipped an extra dependency and a
    // top-level field the current template no longer has: baseline and disk
    // both carry them (user never touched the file), the proposed render lacks
    // them. mergePackageJson cannot express removals or top-level changes.
    const older = structuredClone(render);
    older.dependencies["legacy-sdk"] = "1.0.0";
    older.sideEffects = false;
    const olderContent = `${JSON.stringify(older, null, 2)}\n`;
    const manifest = await readScaffoldManifest(dir);
    manifest!.baselines![target] = olderContent;
    await writeScaffoldManifest(dir, manifest!);
    await writeFile(pkgPath, olderContent, "utf-8");

    const plan = await planScaffoldUpgrade(dir);
    assertSuccess(plan);
    const entry = plan.manual.find((file) => file.path === target);
    expect(entry).toBeDefined();
    expect(entry?.reason).toContain("dependencies.legacy-sdk removed");
    expect(entry?.reason).toContain("sideEffects");
    expect(plan.merged).not.toContain(target);
    expect(plan.userEdited).not.toContain(target);
    expect(plan.actionable).not.toContain(target);

    // Apply leaves the file for the user to reconcile.
    const applied = await applyAcknowledged(dir);
    assertSuccess(applied);
    expect(await readFile(pkgPath, "utf-8")).toBe(olderContent);
  });

  it("falls back to manual review for package.json when the manifest has no content baseline", async () => {
    const dir = await makeTempDir();
    await scaffoldWithBaseline(dir, makeConfig(dir));

    // Simulate a manifest recorded by an older CLI (hashes only).
    const manifest = await readScaffoldManifest(dir);
    delete manifest!.baselines;
    await writeScaffoldManifest(dir, manifest!);

    const pkgPath = join(dir, "package.json");
    const pkg = JSON.parse(await readFile(pkgPath, "utf-8"));
    pkg.dependencies = { ...pkg.dependencies, "left-pad": "^1.3.0" };
    await writeFile(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`, "utf-8");

    const plan = await planScaffoldUpgrade(dir);
    assertSuccess(plan);
    const entry = plan.manual.find((file) => file.path === "package.json");
    expect(entry).toBeDefined();
    expect(entry?.reason).toContain("baseline");
    expect(plan.actionable).not.toContain("package.json");
  });

  it("appends template-added env keys to an edited .env.example, keeping user keys", async () => {
    const dir = await makeTempDir();
    const config = makeConfig(dir, {
      ecosystem: "go",
      frontend: [],
      backend: "none",
      runtime: "none",
      api: "none",
      orm: "none",
      database: "sqlite",
      auth: "none",
      goWebFramework: "gin",
      goOrm: "gorm",
    } as Partial<ProjectConfig>);
    await scaffoldWithBaseline(dir, config);

    const target = "apps/server/.env.example";
    const envPath = join(dir, target);
    const render = await readFile(envPath, "utf-8");
    const lines = render.split("\n");
    const keyLine = lines.find((line) => /^[A-Z][A-Z0-9_]*=/.test(line));
    expect(keyLine).toBeDefined();
    const templateKey = (keyLine as string).split("=")[0] as string;

    // Simulate an older template without that key, plus a user-added key.
    const withoutKey = lines.filter((line) => line !== keyLine).join("\n");
    const manifest = await readScaffoldManifest(dir);
    manifest!.baselines![target] = withoutKey;
    await writeScaffoldManifest(dir, manifest!);
    await writeFile(envPath, `${withoutKey}\nCUSTOM_FLAG=1\n`, "utf-8");

    const plan = await planScaffoldUpgrade(dir);
    assertSuccess(plan);
    expect(plan.merged).toContain(target);
    const entry = plan.files.find((file) => file.path === target);
    expect(entry?.reason).toContain(templateKey);

    const applied = await applyAcknowledged(dir);
    assertSuccess(applied);
    expect(applied.applied.merged).toContain(target);
    const result = await readFile(envPath, "utf-8");
    expect(result).toContain(keyLine as string);
    expect(result).toContain("CUSTOM_FLAG=1");
  });

  it("routes an edited .env.example to manual review when the manifest has no content baseline", async () => {
    const dir = await makeTempDir();
    const config = makeConfig(dir, {
      ecosystem: "go",
      frontend: [],
      backend: "none",
      runtime: "none",
      api: "none",
      orm: "none",
      database: "sqlite",
      auth: "none",
      goWebFramework: "gin",
      goOrm: "gorm",
    } as Partial<ProjectConfig>);
    await scaffoldWithBaseline(dir, config);

    const target = "apps/server/.env.example";
    const envPath = join(dir, target);
    const render = await readFile(envPath, "utf-8");
    const lines = render.split("\n");
    const keyLine = lines.find((line) => /^[A-Z][A-Z0-9_]*=/.test(line));
    expect(keyLine).toBeDefined();

    // Older-CLI manifest (hashes only) + the user deliberately removed a key.
    const manifest = await readScaffoldManifest(dir);
    delete manifest!.baselines;
    await writeScaffoldManifest(dir, manifest!);
    await writeFile(envPath, lines.filter((line) => line !== keyLine).join("\n"), "utf-8");

    // Without a baseline, a merge would mistake the removed key for a template
    // addition and re-append it - the file must go to manual review instead.
    const plan = await planScaffoldUpgrade(dir);
    assertSuccess(plan);
    const entry = plan.manual.find((file) => file.path === target);
    expect(entry).toBeDefined();
    expect(entry?.reason).toContain("baseline");
    expect(plan.merged).not.toContain(target);
    expect(plan.actionable).not.toContain(target);

    const applied = await applyAcknowledged(dir);
    assertSuccess(applied);
    expect(await readFile(envPath, "utf-8")).not.toContain(keyLine as string);
  });

  it("routes .env (user secrets) to manual review, never auto-patching it", async () => {
    const dir = await makeTempDir();
    await scaffoldWithBaseline(dir, makeConfig(dir));

    // .env is generated for this stack; make it differ from the render.
    const envPath = join(dir, "apps/server/.env");
    const original = await readFile(envPath, "utf-8");
    await writeFile(envPath, `${original}MY_SECRET=shh\n`, "utf-8");

    const plan = await planScaffoldUpgrade(dir);
    assertSuccess(plan);
    const entry = plan.manual.find((file) => file.path === "apps/server/.env");
    expect(entry).toBeDefined();
    expect(plan.actionable).not.toContain("apps/server/.env");

    const applied = await applyAcknowledged(dir);
    assertSuccess(applied);
    expect(await readFile(envPath, "utf-8")).toContain("MY_SECRET=shh");
  });

  it("keeps plans stable when a generated secrets file is absent", async () => {
    const dir = await makeTempDir();
    await scaffoldWithBaseline(dir, makeConfig(dir));
    const target = "apps/server/.env";
    await unlink(join(dir, target));
    const manifest = await readScaffoldManifest(dir);
    delete manifest!.hashes[target];
    await writeScaffoldManifest(dir, manifest!);

    const first = await planScaffoldUpgrade(dir);
    const second = await planScaffoldUpgrade(dir);
    assertSuccess(first);
    assertSuccess(second);
    expect(getUpgradePlanDigest(second)).toBe(getUpgradePlanDigest(first));
    expect(first.manual).toContainEqual({
      path: target,
      category: "manual",
      reason: "secrets file is absent - create it manually; never generated during update",
    });
    expect(first.actionable).not.toContain(target);
  });

  it("never treats a generated README as drift, even when it differs from the render", async () => {
    const dir = await makeTempDir();
    await scaffoldWithBaseline(dir, makeConfig(dir));

    const readmePath = join(dir, "README.md");
    const custom = `# custom\nThis README diverges from the current template render.\n`;
    await writeFile(readmePath, custom, "utf-8");
    // Make disk == baseline so a normal file would classify as safe drift.
    const manifest = await readScaffoldManifest(dir);
    manifest!.hashes["README.md"] = hashContent(Buffer.from(custom, "utf-8"));
    await writeScaffoldManifest(dir, manifest!);

    const plan = await planScaffoldUpgrade(dir);
    assertSuccess(plan);
    expect(plan.drift).not.toContain("README.md");
    expect(plan.actionable).not.toContain("README.md");
    expect(plan.files.some((file) => file.path === "README.md")).toBe(false);

    const applied = await applyAcknowledged(dir);
    assertSuccess(applied);
    // README is a skippable doc: apply must leave the user's copy intact.
    expect(await readFile(readmePath, "utf-8")).toBe(custom);
  });

  it("reports a missing project as an error", async () => {
    const dir = await makeTempDir();
    const plan = await planScaffoldUpgrade(dir);
    expect(plan.success).toBe(false);
  });

  it("refuses apply when the reviewed plan digest is stale", async () => {
    const dir = await makeTempDir();
    await scaffoldWithBaseline(dir, makeConfig(dir));
    const reviewed = await planScaffoldUpgrade(dir);
    assertSuccess(reviewed);
    const reviewToken = getUpgradePlanDigest(reviewed);

    const source = pickSourceFile(reviewed.unchanged);
    await writeFile(join(dir, source), "// changed after review\n", "utf-8");
    const result = await applyAcknowledged(dir, { expectedPlanDigest: reviewToken });
    expect(result.success).toBe(false);
    if (!result.success)
      expect(result.error).toContain("changed after this update plan was reviewed");
    expect(await readFile(join(dir, source), "utf-8")).toBe("// changed after review\n");
  });

  it("applies verified manifest-v2 plans without a lineage acknowledgement", async () => {
    const dir = await makeTempDir();
    await scaffoldWithBaseline(dir, makeConfig(dir));
    const baseline = await planScaffoldUpgrade(dir);
    assertSuccess(baseline);
    const target = pickSourceFile(baseline.unchanged);
    const current = await readFile(join(dir, target), "utf-8");
    const old = `// old template\n${current}`;
    await writeFile(join(dir, target), old, "utf-8");
    const manifest = await readScaffoldManifest(dir);
    manifest!.hashes[target] = hashContent(old);
    await writeScaffoldManifest(dir, manifest!);
    const reviewed = await planScaffoldUpgrade(dir);
    assertSuccess(reviewed);

    const result = await applyScaffoldUpgrade(dir, {
      expectedPlanDigest: getUpgradePlanDigest(reviewed),
    });
    assertSuccess(result);
    expect(await readFile(join(dir, target), "utf-8")).toBe(current);
    expect(result.lifecycle).toMatchObject({
      status: "applied",
      provenance: { verified: true },
      recovery: { available: true, automaticRollback: true },
    });
  });

  it("requires a CLI apply review token and reports the v2 recovery guarantee", async () => {
    expect(getUpdateApplyAuthorizationError({ apply: true })).toContain("--review-token");
    expect(
      getUpdateApplyAuthorizationError({
        apply: true,
        reviewToken: "a".repeat(64),
        acknowledgeUnprovenManifestV1: true,
      }),
    ).toBeNull();

    const dir = await makeTempDir();
    await scaffoldWithBaseline(dir, makeConfig(dir));
    const plan = await planScaffoldUpgrade(dir);
    assertSuccess(plan);
    expect(toJsonPlan(plan)).toMatchObject({
      reviewToken: getUpgradePlanDigest(plan),
      guarantee: "verified-manifest-v2-recoverable",
      actionableHashes: plan.actionableHashes,
      actionablePreimages: plan.actionablePreimages,
    });
    expect(getUpdateApplyCommand(plan, "linux")).toBe(
      `npx --yes create-better-fullstack@${getLatestCLIVersion()} update ${quotePosixShellArgument(plan.projectDir)} --apply ` +
        `--review-token ${getUpgradePlanDigest(plan)}`,
    );
  });

  it("renders a supported apply command with a safely quoted reviewed project path", async () => {
    const dir = await makeTempDir();
    await scaffoldWithBaseline(dir, makeConfig(dir));
    const plan = await planScaffoldUpgrade(dir);
    assertSuccess(plan);
    const reviewedProjectDir = "/tmp/review path/$(touch should-not-run)/o'brien";
    const reviewedPlan = { ...plan, projectDir: reviewedProjectDir };
    const command = getUpdateApplyCommand(reviewedPlan, "linux");

    expect(command).toBe(
      `npx --yes create-better-fullstack@${getLatestCLIVersion()} update '/tmp/review path/$(touch should-not-run)/o'"'"'brien' --apply ` +
        `--review-token ${getUpgradePlanDigest(reviewedPlan)}`,
    );
    expect(command).not.toContain("bfs update");
    expect(getUpdateApplyCommandFlavor("linux")).toBe("POSIX shell");

    const windowsPath = "C:\\review path\\$(should-not-run)\\o'brien";
    const windowsPlan = { ...plan, projectDir: windowsPath };
    expect(getUpdateApplyCommand(windowsPlan, "win32")).toBe(
      `npx --yes create-better-fullstack@${getLatestCLIVersion()} update ${quotePowerShellArgument(windowsPath)} --apply ` +
        `--review-token ${getUpgradePlanDigest(windowsPlan)}`,
    );
    expect(getUpdateApplyCommandFlavor("win32")).toBe("PowerShell");
  });

  it("binds the raw manifest identity into the reviewed plan", async () => {
    const dir = await makeTempDir();
    await scaffoldWithBaseline(dir, makeConfig(dir));
    const reviewed = await planScaffoldUpgrade(dir);
    assertSuccess(reviewed);
    const reviewToken = getUpgradePlanDigest(reviewed);
    const manifestPath = join(dir, SCAFFOLD_MANIFEST_FILE);
    await writeFile(manifestPath, `${await readFile(manifestPath, "utf-8")}\n`, "utf-8");

    const result = await applyAcknowledged(dir, { expectedPlanDigest: reviewToken });
    expect(result.success).toBe(false);
    if (!result.success)
      expect(result.error).toContain("changed after this update plan was reviewed");
  });

  it("preserves a later actionable file changed concurrently after the first write", async () => {
    const dir = await makeTempDir();
    await scaffoldWithBaseline(dir, makeConfig(dir));
    const baseline = await planScaffoldUpgrade(dir);
    assertSuccess(baseline);
    const first = pickSourceFile(baseline.unchanged);
    const second = pickSourceFile(baseline.unchanged, [first]);
    const manifest = await readScaffoldManifest(dir);
    for (const target of [first, second]) {
      const old = `// old template\n${await readFile(join(dir, target), "utf-8")}`;
      await writeFile(join(dir, target), old, "utf-8");
      manifest!.hashes[target] = hashContent(old);
    }
    await writeScaffoldManifest(dir, manifest!);
    const reviewed = await planScaffoldUpgrade(dir);
    assertSuccess(reviewed);
    expect(reviewed.drift).toHaveLength(2);
    const ordered = [...reviewed.drift].sort();
    const concurrentBytes = "// concurrent edit must survive\n";

    const result = await applyAcknowledged(dir, {
      expectedPlanDigest: getUpgradePlanDigest(reviewed),
      afterActionableWrite: async ({ index }) => {
        if (index === 0) await writeFile(join(dir, ordered[1]!), concurrentBytes, "utf-8");
      },
    });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error).toContain("bytes changed after review");
    expect(await readFile(join(dir, ordered[1]!), "utf-8")).toBe(concurrentBytes);
  });

  it("rolls back exact preimages when an actionable write reports a failure", async () => {
    const dir = await makeTempDir();
    await scaffoldWithBaseline(dir, makeConfig(dir));
    const baseline = await planScaffoldUpgrade(dir);
    assertSuccess(baseline);
    const target = pickSourceFile(baseline.unchanged);
    const targetPath = join(dir, target);
    const current = await readFile(targetPath, "utf-8");
    const old = `// old template\n${current}`;
    await writeFile(targetPath, old, "utf-8");
    const manifest = await readScaffoldManifest(dir);
    expect(manifest).not.toBeNull();
    manifest!.hashes[target] = hashContent(old);
    await writeScaffoldManifest(dir, manifest!);
    const manifestBefore = await readFile(join(dir, SCAFFOLD_MANIFEST_FILE));

    const reviewed = await planScaffoldUpgrade(dir);
    assertSuccess(reviewed);
    const result = await applyAcknowledged(dir, {
      expectedPlanDigest: getUpgradePlanDigest(reviewed),
      afterActionableWrite: () => {
        throw new Error("injected write failure");
      },
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toContain("injected write failure");
      expect(result.lifecycle?.status).toBe("rolled-back");
    }
    expect(await readFile(targetPath, "utf-8")).toBe(old);
    expect(await readFile(join(dir, SCAFFOLD_MANIFEST_FILE))).toEqual(manifestBefore);
  });

  it("keeps a crashed template write recoverable from its durable postimage", async () => {
    const dir = await makeTempDir();
    const crashRoot = await makeTempDir();
    const crashedDir = join(crashRoot, "project");
    await scaffoldWithBaseline(dir, makeConfig(dir));
    const baseline = await planScaffoldUpgrade(dir);
    assertSuccess(baseline);
    const target = pickSourceFile(baseline.unchanged);
    const before = `// old template\n${await readFile(join(dir, target), "utf-8")}`;
    await writeFile(join(dir, target), before, "utf-8");
    const manifest = await readScaffoldManifest(dir);
    manifest!.hashes[target] = hashContent(before);
    await writeScaffoldManifest(dir, manifest!);
    const reviewed = await planScaffoldUpgrade(dir);
    assertSuccess(reviewed);

    const result = await applyAcknowledged(dir, {
      expectedPlanDigest: getUpgradePlanDigest(reviewed),
      afterActionableWrite: async () => {
        await cp(dir, crashedDir, { recursive: true });
        throw new Error("injected process stop");
      },
    });
    expect(result.success).toBe(false);

    const transactionId = (await readdir(join(crashedDir, RECOVERY_ROOT))).find((entry) =>
      /^[0-9a-f-]{36}$/i.test(entry),
    );
    expect(transactionId).toBeDefined();
    if (!transactionId) return;
    const metadata = JSON.parse(
      await readFile(join(crashedDir, RECOVERY_ROOT, transactionId, "transaction.json"), "utf-8"),
    ) as { outputs?: Record<string, string | null> };
    expect(metadata.outputs?.[target]).toBe(reviewed.actionableHashes[target]);
    await simulateStoppedTransactionOwner(crashedDir);
    await recoverProjectTransaction(crashedDir, transactionId);
    expect(await readFile(join(crashedDir, target), "utf-8")).toBe(before);
  });

  it("fails before baseline refresh when an already-written output changes", async () => {
    const dir = await makeTempDir();
    await scaffoldWithBaseline(dir, makeConfig(dir));
    const baseline = await planScaffoldUpgrade(dir);
    assertSuccess(baseline);
    const target = pickSourceFile(baseline.unchanged);
    const old = `// old template\n${await readFile(join(dir, target), "utf-8")}`;
    await writeFile(join(dir, target), old, "utf-8");
    const manifest = await readScaffoldManifest(dir);
    manifest!.hashes[target] = hashContent(old);
    await writeScaffoldManifest(dir, manifest!);
    const manifestBefore = await readFile(join(dir, SCAFFOLD_MANIFEST_FILE), "utf-8");
    const reviewed = await planScaffoldUpgrade(dir);
    assertSuccess(reviewed);
    const concurrentBytes = "// changed after this file was written\n";

    const result = await applyAcknowledged(dir, {
      expectedPlanDigest: getUpgradePlanDigest(reviewed),
      afterActionableWrite: async ({ path: writtenPath }) => {
        if (writtenPath === target) await writeFile(join(dir, target), concurrentBytes, "utf-8");
      },
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toContain(`${target} changed after it was written`);
      expect(result.error).toContain("Refused to overwrite files changed after the transaction");
    }
    expect(await readFile(join(dir, target), "utf-8")).toBe(concurrentBytes);
    expect(await readFile(join(dir, SCAFFOLD_MANIFEST_FILE), "utf-8")).toBe(manifestBefore);
  });

  it("fails before baseline refresh when bts.jsonc changes after an output write", async () => {
    const dir = await makeTempDir();
    await scaffoldWithBaseline(dir, makeConfig(dir));
    const baseline = await planScaffoldUpgrade(dir);
    assertSuccess(baseline);
    const target = pickSourceFile(baseline.unchanged);
    const old = `// old template\n${await readFile(join(dir, target), "utf-8")}`;
    await writeFile(join(dir, target), old, "utf-8");
    const manifest = await readScaffoldManifest(dir);
    manifest!.hashes[target] = hashContent(old);
    await writeScaffoldManifest(dir, manifest!);
    const manifestBefore = await readFile(join(dir, SCAFFOLD_MANIFEST_FILE), "utf-8");
    const reviewed = await planScaffoldUpgrade(dir);
    assertSuccess(reviewed);
    const configPath = join(dir, "bts.jsonc");
    const changedConfig = `${await readFile(configPath, "utf-8")}\n`;

    const result = await applyAcknowledged(dir, {
      expectedPlanDigest: getUpgradePlanDigest(reviewed),
      afterActionableWrite: async () => {
        await writeFile(configPath, changedConfig, "utf-8");
      },
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toContain("bts.jsonc changed during apply");
      expect(result.error).toContain("transaction restored every bound preimage");
    }
    expect(await readFile(configPath, "utf-8")).toBe(changedConfig);
    expect(await readFile(join(dir, SCAFFOLD_MANIFEST_FILE), "utf-8")).toBe(manifestBefore);
  });

  it("rechecks manifest bytes before baseline refresh", async () => {
    const dir = await makeTempDir();
    await scaffoldWithBaseline(dir, makeConfig(dir));
    const baseline = await planScaffoldUpgrade(dir);
    assertSuccess(baseline);
    const target = pickSourceFile(baseline.unchanged);
    const current = await readFile(join(dir, target), "utf-8");
    const old = `// old template\n${current}`;
    await writeFile(join(dir, target), old, "utf-8");
    const manifest = await readScaffoldManifest(dir);
    manifest!.hashes[target] = hashContent(old);
    await writeScaffoldManifest(dir, manifest!);
    const reviewed = await planScaffoldUpgrade(dir);
    assertSuccess(reviewed);
    const manifestPath = join(dir, SCAFFOLD_MANIFEST_FILE);

    const result = await applyAcknowledged(dir, {
      expectedPlanDigest: getUpgradePlanDigest(reviewed),
      afterActionableWrite: async () => {
        await writeFile(manifestPath, `${await readFile(manifestPath, "utf-8")}\n`, "utf-8");
      },
    });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error).toContain("before baseline refresh");
    expect(await readFile(join(dir, target), "utf-8")).toBe(old);
  });

  it("binds the raw bts config identity into the reviewed plan", async () => {
    const dir = await makeTempDir();
    await scaffoldWithBaseline(dir, makeConfig(dir));
    const reviewed = await planScaffoldUpgrade(dir);
    assertSuccess(reviewed);
    const reviewToken = getUpgradePlanDigest(reviewed);
    const configPath = join(dir, "bts.jsonc");
    await writeFile(configPath, `${await readFile(configPath, "utf-8")}\n`, "utf-8");

    const result = await applyAcknowledged(dir, { expectedPlanDigest: reviewToken });
    expect(result.success).toBe(false);
    if (!result.success)
      expect(result.error).toContain("changed after this update plan was reviewed");
  });

  it("rejects a stale render when project-name input changes after review", async () => {
    const dir = await makeTempDir();
    await scaffoldWithBaseline(dir, makeConfig(dir));
    const reviewed = await planScaffoldUpgrade(dir);
    assertSuccess(reviewed);
    const reviewToken = getUpgradePlanDigest(reviewed);
    const packagePath = join(dir, "package.json");
    const packageJson = JSON.parse(await readFile(packagePath, "utf-8")) as Record<string, unknown>;
    packageJson.name = "changed-after-review";
    await writeFile(packagePath, `${JSON.stringify(packageJson, null, 2)}\n`, "utf-8");

    const result = await applyAcknowledged(dir, { expectedPlanDigest: reviewToken });
    expect(result.success).toBe(false);
    if (!result.success)
      expect(result.error).toContain("changed after this update plan was reviewed");
  });

  it("refuses an actionable target symlink that escapes the canonical project root", async () => {
    const dir = await makeTempDir();
    await scaffoldWithBaseline(dir, makeConfig(dir));
    const baselinePlan = await planScaffoldUpgrade(dir);
    assertSuccess(baselinePlan);
    const target = pickSourceFile(baselinePlan.unchanged);
    const targetPath = join(dir, target);
    const original = await readFile(targetPath, "utf-8");
    const drifted = `// old template\n${original}`;
    const outside = join(await makeTempDir(), "outside.ts");
    await writeFile(outside, drifted, "utf-8");
    const manifest = await readScaffoldManifest(dir);
    manifest!.hashes[target] = hashContent(Buffer.from(drifted, "utf-8"));
    await writeScaffoldManifest(dir, manifest!);
    await unlink(targetPath);
    await symlink(outside, targetPath);

    const plan = await planScaffoldUpgrade(dir);
    expect(plan.success).toBe(false);
    if (!plan.success) expect(plan.error).toContain("symlinked target or parent");
    expect(await readFile(outside, "utf-8")).toBe(drifted);
  });

  it("refuses an actionable path beneath a symlinked parent", async () => {
    const dir = await makeTempDir();
    await scaffoldWithBaseline(dir, makeConfig(dir));
    const baselinePlan = await planScaffoldUpgrade(dir);
    assertSuccess(baselinePlan);
    const target = pickSourceFile(baselinePlan.unchanged);
    const targetPath = join(dir, target);
    const original = await readFile(targetPath, "utf-8");
    const drifted = `// old template\n${original}`;
    const parent = dirname(targetPath);
    const outsideParent = join(await makeTempDir(), "outside-parent");
    await mkdir(outsideParent, { recursive: true });
    await writeFile(join(outsideParent, basename(targetPath)), drifted, "utf-8");
    const manifest = await readScaffoldManifest(dir);
    manifest!.hashes[target] = hashContent(Buffer.from(drifted, "utf-8"));
    await writeScaffoldManifest(dir, manifest!);
    await rm(parent, { recursive: true, force: true });
    await symlink(outsideParent, parent, "dir");

    const plan = await planScaffoldUpgrade(dir);
    expect(plan.success).toBe(false);
    if (!plan.success) expect(plan.error).toContain("symlinked target or parent");
    expect(await readFile(join(outsideParent, basename(targetPath)), "utf-8")).toBe(drifted);
  });

  it("refuses adoption through a symlinked manifest target", async () => {
    const dir = await makeTempDir();
    await scaffoldWithBaseline(dir, makeConfig(dir));
    const manifestPath = join(dir, SCAFFOLD_MANIFEST_FILE);
    const outsidePath = join(await makeTempDir(), "outside-lock.json");
    const outsideBytes = "outside file must not change\n";
    await writeFile(outsidePath, outsideBytes, "utf-8");
    await unlink(manifestPath);
    await symlink(outsidePath, manifestPath, "file");

    const plan = await planProjectAdoption(dir);
    expect(plan.success).toBe(false);
    expect(await readFile(outsidePath, "utf-8")).toBe(outsideBytes);
  });
});
