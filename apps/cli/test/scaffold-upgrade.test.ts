import { EMBEDDED_TEMPLATES, generateVirtualProject } from "@better-fullstack/template-generator";
import { writeTreeToFilesystem } from "@better-fullstack/template-generator/fs-writer";
import { createCliDefaultProjectConfigBase, type ProjectConfig } from "@better-fullstack/types";
import { afterAll, describe, expect, it } from "bun:test";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { applyScaffoldUpgrade, planScaffoldUpgrade } from "../src/helpers/core/scaffold-upgrade";
import { buildBtsConfigForPersistence, writeBtsConfig } from "../src/utils/bts-config";
import { formatProject } from "../src/utils/file-formatter";
import {
  hashContent,
  readScaffoldManifest,
  recordScaffoldManifest,
  SCAFFOLD_MANIFEST_FILE,
  writeScaffoldManifest,
} from "../src/utils/scaffold-manifest";

const TEMP_ROOTS: string[] = [];

afterAll(async () => {
  await Promise.all(TEMP_ROOTS.map((dir) => rm(dir, { recursive: true, force: true })));
});

async function makeTempDir(): Promise<string> {
  const dir = await mkdtemp(join(tmpdir(), "bfs-upgrade-"));
  TEMP_ROOTS.push(dir);
  return dir;
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
  await recordScaffoldManifest(projectDir);
}

function assertSuccess<T extends { success: boolean }>(
  result: T,
): asserts result is Extract<T, { success: true }> {
  expect(result.success).toBe(true);
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
    expect(Object.keys(hashes).length).toBeGreaterThan(10);
    // Excluded from its own walk + the config file is not template-comparable.
    expect(hashes[SCAFFOLD_MANIFEST_FILE]).toBeUndefined();
    expect(hashes["bts.jsonc"]).toBeUndefined();
    // Every value is a sha256 hex digest.
    for (const value of Object.values(hashes)) {
      expect(value).toMatch(/^[0-9a-f]{64}$/);
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

  it("classifies template drift and patches it on apply", async () => {
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

    const applied = await applyScaffoldUpgrade(dir);
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

    const applied = await applyScaffoldUpgrade(dir);
    assertSuccess(applied);
    expect(applied.applied.patched).not.toContain(target);
    // Left exactly as the user wrote it.
    expect(await readFile(targetPath, "utf-8")).toBe(edited);
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
    const applied = await applyScaffoldUpgrade(dir);
    assertSuccess(applied);
    expect(applied.applied.patched).not.toContain(target);
    expect(await readFile(targetPath, "utf-8")).toBe(`// local change\n`);
  });

  it("always routes an edited package.json to manual review", async () => {
    const dir = await makeTempDir();
    await scaffoldWithBaseline(dir, makeConfig(dir));

    const pkgPath = join(dir, "package.json");
    const pkg = JSON.parse(await readFile(pkgPath, "utf-8"));
    pkg.dependencies = { ...pkg.dependencies, "left-pad": "^1.3.0" };
    await writeFile(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`, "utf-8");

    const plan = await planScaffoldUpgrade(dir);
    assertSuccess(plan);
    const manualPaths = plan.manual.map((entry) => entry.path);
    expect(manualPaths).toContain("package.json");
    expect(plan.drift).not.toContain("package.json");
    expect(plan.actionable).not.toContain("package.json");

    // Never auto-written.
    const applied = await applyScaffoldUpgrade(dir);
    assertSuccess(applied);
    expect(applied.applied.patched).not.toContain("package.json");
    expect(await readFile(pkgPath, "utf-8")).toContain("left-pad");
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

    const applied = await applyScaffoldUpgrade(dir);
    assertSuccess(applied);
    // README is a skippable doc: apply must leave the user's copy intact.
    expect(await readFile(readmePath, "utf-8")).toBe(custom);
  });

  it("reports a missing project as an error", async () => {
    const dir = await makeTempDir();
    const plan = await planScaffoldUpgrade(dir);
    expect(plan.success).toBe(false);
  });
});
