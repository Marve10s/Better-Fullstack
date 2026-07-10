import { EMBEDDED_TEMPLATES, generateVirtualProject } from "@better-fullstack/template-generator";
import { writeTreeToFilesystem } from "@better-fullstack/template-generator/fs-writer";
import { createCliDefaultProjectConfigBase, type ProjectConfig } from "@better-fullstack/types";
import { afterAll, describe, expect, it } from "bun:test";
import { mkdtemp, readFile, rm, unlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { applyScaffoldUpgrade, planScaffoldUpgrade } from "../src/helpers/core/scaffold-upgrade";
import { buildBtsConfigForPersistence, writeBtsConfig } from "../src/utils/bts-config";
import { formatProject } from "../src/utils/file-formatter";
import {
  collectStructuredBaselines,
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
  await recordScaffoldManifest(projectDir, {
    baselines: collectStructuredBaselines(result.tree),
  });
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

    const applied = await applyScaffoldUpgrade(dir);
    assertSuccess(applied);
    expect(applied.applied.added).not.toContain(target);
    await expect(readFile(targetPath, "utf-8")).rejects.toThrow();
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
    const applied = await applyScaffoldUpgrade(dir);
    assertSuccess(applied);
    expect(applied.applied.patched).not.toContain("package.json");
    expect(applied.applied.merged).not.toContain("package.json");
    expect(await readFile(pkgPath, "utf-8")).toContain("left-pad");
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

    const applied = await applyScaffoldUpgrade(dir);
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
    const applied = await applyScaffoldUpgrade(dir);
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
    const applied = await applyScaffoldUpgrade(dir);
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
    const applied = await applyScaffoldUpgrade(dir);
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

    const applied = await applyScaffoldUpgrade(dir);
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
    // addition and re-append it — the file must go to manual review instead.
    const plan = await planScaffoldUpgrade(dir);
    assertSuccess(plan);
    const entry = plan.manual.find((file) => file.path === target);
    expect(entry).toBeDefined();
    expect(entry?.reason).toContain("baseline");
    expect(plan.merged).not.toContain(target);
    expect(plan.actionable).not.toContain(target);

    const applied = await applyScaffoldUpgrade(dir);
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

    const applied = await applyScaffoldUpgrade(dir);
    assertSuccess(applied);
    expect(await readFile(envPath, "utf-8")).toContain("MY_SECRET=shh");
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
