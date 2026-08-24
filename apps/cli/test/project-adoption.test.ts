import { EMBEDDED_TEMPLATES, generateVirtualProject } from "@better-fullstack/template-generator";
import { writeTreeToFilesystem } from "@better-fullstack/template-generator/fs-writer";
import { createCliDefaultProjectConfigBase, type ProjectConfig } from "@better-fullstack/types";
import { afterAll, describe, expect, it } from "bun:test";
import fs from "fs-extra";
import { parse } from "jsonc-parser";
import { tmpdir } from "node:os";
import path from "node:path";

import { planScaffoldUpgrade } from "../src/helpers/core/scaffold-upgrade";
import { buildBtsConfigForPersistence, writeBtsConfig } from "../src/utils/bts-config";
import { formatProject } from "../src/utils/file-formatter";
import { confirmProjectAdoption, planProjectAdoption } from "../src/utils/project-adoption";
import {
  readScaffoldManifest,
  readScaffoldManifestResult,
  SCAFFOLD_MANIFEST_FILE,
} from "../src/utils/scaffold-manifest";

const roots: string[] = [];

afterAll(async () => {
  await Promise.all(roots.map((root) => fs.remove(root)));
});

async function makeProject(): Promise<string> {
  const projectDir = await fs.mkdtemp(path.join(tmpdir(), "bfs-adoption-"));
  roots.push(projectDir);
  const config = {
    ...createCliDefaultProjectConfigBase(),
    projectName: "adoption-app",
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
  } as ProjectConfig;
  const persisted = buildBtsConfigForPersistence(config);
  const normalized = {
    ...config,
    ...persisted,
    projectDir,
    relativePath: ".",
  } as ProjectConfig;
  const generated = await generateVirtualProject({
    config: normalized,
    templates: EMBEDDED_TEMPLATES,
  });
  if (!generated.success || !generated.tree) {
    throw new Error(generated.error ?? "Could not generate adoption fixture");
  }
  await writeTreeToFilesystem(generated.tree, projectDir);
  await writeBtsConfig(normalized, {
    version: persisted.version,
    createdAt: persisted.createdAt,
  });
  await formatProject(projectDir);
  return projectDir;
}

describe("project adoption", () => {
  it("plans likely Stack Parts and uncertainty without writing", async () => {
    const projectDir = await makeProject();
    const first = await planProjectAdoption(projectDir);
    const second = await planProjectAdoption(projectDir);

    expect(first.success).toBe(true);
    expect(second).toEqual(first);
    if (!first.success) return;
    expect(first.mode).toBe("plan");
    expect(first.adopted).toBe(false);
    expect(first.confirmationToken).toMatch(/^[0-9a-f]{64}$/);
    expect(first.likelyStackParts.length).toBeGreaterThan(0);
    expect(first.likelyStackParts.every((part) => part.confidence === "low")).toBe(true);
    expect(first.likelyStackParts.every((part) => part.declaredSource === "legacy")).toBe(true);
    expect(first.templateEvidence.presentFiles).toBeGreaterThan(0);
    expect(first.uncertainty.join(" ")).toContain("cannot be proven");
    expect(await readScaffoldManifestResult(projectDir)).toEqual({ status: "missing" });
  });

  it("marks Stack Parts translated from legacy fields as low confidence", async () => {
    const projectDir = await makeProject();
    const configPath = path.join(projectDir, "bts.jsonc");
    const config = parse(await fs.readFile(configPath, "utf-8")) as Record<string, unknown>;
    delete config.stackParts;
    await fs.writeJson(configPath, config, { spaces: 2 });

    const plan = await planProjectAdoption(projectDir);
    expect(plan.success).toBe(true);
    if (!plan.success) return;
    expect(plan.likelyStackParts.length).toBeGreaterThan(0);
    expect(plan.likelyStackParts.every((part) => part.confidence === "low")).toBe(true);
    expect(plan.likelyStackParts.every((part) => part.basis === "legacy-config-inference")).toBe(
      true,
    );
  });

  it("requires the exact current-state token before creating an unverified baseline", async () => {
    const projectDir = await makeProject();
    const plan = await planProjectAdoption(projectDir);
    expect(plan.success).toBe(true);
    if (!plan.success) return;

    const missing = await confirmProjectAdoption(projectDir, undefined);
    expect(missing).toMatchObject({ success: false, error: expect.stringContaining("required") });
    expect(await readScaffoldManifestResult(projectDir)).toEqual({ status: "missing" });

    const confirmed = await confirmProjectAdoption(projectDir, plan.confirmationToken);
    expect(confirmed.success).toBe(true);
    if (!confirmed.success) return;
    expect(confirmed).toMatchObject({
      mode: "adopted",
      adopted: true,
      provenanceState: "adopted-unverified",
      manifest: { version: "2", provenanceState: "adopted-unverified" },
    });
    const manifest = await readScaffoldManifest(projectDir);
    expect(manifest?.provenance).toEqual({
      state: "adopted-unverified",
      createdWith: null,
      current: null,
    });
    expect(manifest?.baselines?.["package.json"]).toBe(
      await fs.readFile(path.join(projectDir, "package.json"), "utf-8"),
    );
    expect(Object.keys(manifest?.modes ?? {})).toEqual(Object.keys(manifest?.hashes ?? {}));
  });

  it("rejects an adoption token after a mode-only project change", async () => {
    const projectDir = await makeProject();
    const plan = await planProjectAdoption(projectDir);
    expect(plan.success).toBe(true);
    if (!plan.success) return;

    await fs.chmod(path.join(projectDir, "apps/server/src/index.ts"), 0o700);

    const confirmed = await confirmProjectAdoption(projectDir, plan.confirmationToken);
    expect(confirmed.success).toBe(false);
    if (!confirmed.success) expect(confirmed.error).toContain("stale");
    expect(await readScaffoldManifestResult(projectDir)).toEqual({ status: "missing" });
  });

  it("does not record divergent user files as generated baselines", async () => {
    const projectDir = await makeProject();
    const sourcePath = "apps/server/src/index.ts";
    await fs.appendFile(path.join(projectDir, sourcePath), "\n// user-owned route\n");
    const packageJson = await fs.readJson(path.join(projectDir, "package.json"));
    packageJson.betterFullstackUserMetadata = true;
    await fs.writeJson(path.join(projectDir, "package.json"), packageJson, { spaces: 2 });

    const plan = await planProjectAdoption(projectDir);
    expect(plan.success).toBe(true);
    if (!plan.success) return;
    expect(plan.templateEvidence.divergentPaths).toContain(sourcePath);
    expect(plan.templateEvidence.divergentPaths).toContain("package.json");

    const confirmed = await confirmProjectAdoption(projectDir, plan.confirmationToken);
    expect(confirmed.success).toBe(true);
    if (!confirmed.success) return;
    const manifest = await readScaffoldManifest(projectDir);
    expect(manifest?.hashes[sourcePath]).toBeUndefined();
    expect(manifest?.hashes["package.json"]).toBeUndefined();
    expect(manifest?.modes?.[sourcePath]).toBeUndefined();
    expect(manifest?.modes?.["package.json"]).toBeUndefined();
    expect(manifest?.baselines?.["package.json"]).toBeUndefined();

    const updatePlan = await planScaffoldUpgrade(projectDir);
    expect(updatePlan.success).toBe(true);
    if (!updatePlan.success) return;
    expect(updatePlan.manual).toContainEqual(
      expect.objectContaining({ path: sourcePath, category: "manual" }),
    );
    expect(updatePlan.manual).toContainEqual(
      expect.objectContaining({ path: "package.json", category: "manual" }),
    );
  });

  it("rejects a stale token and never replaces an existing manifest", async () => {
    const projectDir = await makeProject();
    const plan = await planProjectAdoption(projectDir);
    expect(plan.success).toBe(true);
    if (!plan.success) return;
    await fs.appendFile(path.join(projectDir, "package.json"), "\n");

    const stale = await confirmProjectAdoption(projectDir, plan.confirmationToken);
    expect(stale).toMatchObject({ success: false, error: expect.stringContaining("stale") });
    expect(await fs.pathExists(path.join(projectDir, SCAFFOLD_MANIFEST_FILE))).toBe(false);

    const fresh = await planProjectAdoption(projectDir);
    expect(fresh.success).toBe(true);
    if (!fresh.success) return;
    expect((await confirmProjectAdoption(projectDir, fresh.confirmationToken)).success).toBe(true);
    const existing = await planProjectAdoption(projectDir);
    expect(existing).toMatchObject({
      success: false,
      error: expect.stringContaining("already exists"),
    });
  });
});
