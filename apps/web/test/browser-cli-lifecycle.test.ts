import {
  EMBEDDED_TEMPLATES,
  generateVirtualProject,
} from "@better-fullstack/template-generator/browser";
import { afterEach, describe, expect, it } from "bun:test";
import { unzipSync } from "fflate";
import { mkdir, mkdtemp, readFile, rm, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import {
  applyScaffoldUpgrade,
  getUpgradePlanDigest,
} from "../../cli/src/helpers/core/scaffold-upgrade";
import { add } from "../../cli/src/run";
import { readBtsConfig } from "../../cli/src/utils/bts-config";
import { getLatestCLIVersion } from "../../cli/src/utils/get-latest-cli-version";
import { planReviewedProjectUpdate } from "../../cli/src/utils/project-lifecycle";
import { inspectProject } from "../../cli/src/utils/project-status";
import { hashContent, readScaffoldManifest } from "../../cli/src/utils/scaffold-manifest";
import { stackStateToProjectConfig } from "../src/lib/preview-config";
import { createProjectArchive } from "../src/lib/project-download";
import { DEFAULT_STACK } from "../src/lib/stack-defaults";

const roots: string[] = [];
const repositoryRoot = path.resolve(import.meta.dir, "../../..");
const originalTelemetryOverride = process.env.BTS_TELEMETRY_DISABLED;

afterEach(async () => {
  await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
  if (originalTelemetryOverride === undefined) delete process.env.BTS_TELEMETRY_DISABLED;
  else process.env.BTS_TELEMETRY_DISABLED = originalTelemetryOverride;
});

async function pathExists(target: string): Promise<boolean> {
  return stat(target).then(
    () => true,
    () => false,
  );
}

async function extractArchive(bytes: Uint8Array): Promise<string> {
  const extractionRoot = await mkdtemp(path.join(tmpdir(), "bfs-browser-lifecycle-"));
  roots.push(extractionRoot);
  await Promise.all(
    Object.entries(unzipSync(bytes)).map(async ([archivePath, content]) => {
      const target = path.join(extractionRoot, archivePath);
      await mkdir(path.dirname(target), { recursive: true });
      await writeFile(target, content);
    }),
  );
  return path.join(extractionRoot, "browser-lifecycle-proof");
}

describe("browser ZIP to CLI lifecycle", () => {
  it("accepts an extracted browser project for check, update planning, and add planning/apply", async () => {
    const config = stackStateToProjectConfig({
      ...DEFAULT_STACK,
      projectName: "browser-lifecycle-proof",
      webFrontend: ["react-vite"],
      backend: "none",
      runtime: "none",
      database: "none",
      orm: "none",
      auth: "none",
      api: "none",
      forms: "none",
      validation: "none",
      testing: "none",
      cssFramework: "none",
      uiLibrary: "none",
      codeQuality: [],
      documentation: [],
      appPlatforms: [],
      examples: [],
      aiDocs: [],
      workspaceShape: "monorepo",
      install: "false",
      git: "false",
    });
    const generated = await generateVirtualProject({
      config,
      templates: EMBEDDED_TEMPLATES,
    });
    expect(generated.success).toBe(true);
    expect(generated.tree).toBeDefined();
    if (!generated.success || !generated.tree) return;
    const currentCliVersion = getLatestCLIVersion();

    const archive = await createProjectArchive(
      generated.tree.root,
      async (sourcePath) =>
        new Uint8Array(
          await readFile(
            path.join(repositoryRoot, "packages/template-generator/templates-binary", sourcePath),
          ),
        ),
      {
        config,
        cliVersion: currentCliVersion,
        createdAt: "2026-08-10T12:00:00.000Z",
      },
    );
    const projectDir = await extractArchive(archive.bytes);

    const [parsedConfig, manifest] = await Promise.all([
      readBtsConfig(projectDir),
      readScaffoldManifest(projectDir),
    ]);
    expect(parsedConfig?.ecosystem).toBe("typescript");
    expect(parsedConfig?.version).toBe(currentCliVersion);
    expect(manifest?.version).toBe("2");
    expect(manifest?.provenance.state).toBe("verified");
    expect(Object.keys(manifest?.hashes ?? {}).length).toBeGreaterThan(0);

    // ZIP download intentionally performs no install. The current CLI check
    // must report that state as non-green instead of treating recognition of
    // bts.jsonc as a successful verification.
    expect(await pathExists(path.join(projectDir, "node_modules"))).toBe(false);
    const status = await inspectProject(projectDir, { runChecks: true });
    expect(status.success).toBe(true);
    if (!status.success) return;
    expect(status.ok).toBe(false);
    expect(status.checks).toContainEqual({
      label: "node_modules",
      status: "fail",
      detail: "Dependencies are not installed. Run `bun install`.",
    });
    expect(status.verification.requested).toBe(true);
    expect(status.verification.complete).toBe(false);
    expect(status.targets.length).toBeGreaterThan(0);
    expect(status.targets.every((target) => target.executed && target.status === "fail")).toBe(
      true,
    );

    const update = await planReviewedProjectUpdate(projectDir);
    expect(update.success).toBe(true);
    if (!update.success) return;
    expect(update.applyAllowed).toBe(true);
    expect(update.plan.hasBaseline).toBe(true);
    expect(update.plan.actionable).toEqual([]);
    expect(update.reviewToken).toMatch(/^[a-f0-9]{64}$/);
    expect(update.blockers).toEqual([]);
    expect(update.guarantee).toBe("verified-manifest-v2-recoverable");

    const rawManifestBeforeNoop = await readScaffoldManifest(projectDir);
    const formatEquivalent = update.plan.files.filter((file) => file.preserveBaseline);
    expect(formatEquivalent.length).toBeGreaterThan(0);
    const noopApply = await applyScaffoldUpgrade(projectDir, {
      expectedPlanDigest: getUpgradePlanDigest(update.plan),
    });
    expect(noopApply.success).toBe(true);
    const rawManifestAfterNoop = await readScaffoldManifest(projectDir);
    await Promise.all(
      formatEquivalent.map(async (entry) => {
        expect(rawManifestAfterNoop?.hashes[entry.path]).toBe(
          rawManifestBeforeNoop?.hashes[entry.path],
        );
        expect(rawManifestAfterNoop?.hashes[entry.path]).toBe(
          hashContent(await readFile(path.join(projectDir, entry.path))),
        );
      }),
    );

    const configBeforeAdd = await readFile(path.join(projectDir, "bts.jsonc"), "utf8");
    const manifestBeforeAdd = await readFile(path.join(projectDir, "bts.lock.json"), "utf8");
    process.env.BTS_TELEMETRY_DISABLED = "1";
    const addPlan = await add({
      projectDir,
      addons: ["prettier"],
      dryRun: true,
      install: false,
    });
    expect(addPlan?.success).toBe(true);
    expect(await readFile(path.join(projectDir, "bts.jsonc"), "utf8")).toBe(configBeforeAdd);
    expect(await readFile(path.join(projectDir, "bts.lock.json"), "utf8")).toBe(manifestBeforeAdd);

    const addApply = await add({
      projectDir,
      addons: ["prettier"],
      dryRun: false,
      install: false,
    });
    expect(addApply?.success).toBe(true);
    expect(addApply?.addedAddons).toContain("prettier");
    expect((await readBtsConfig(projectDir))?.addons).toContain("prettier");
    const manifestAfterAdd = await readScaffoldManifest(projectDir);
    expect(manifestAfterAdd?.version).toBe("2");
    expect(manifestAfterAdd?.history.at(-1)?.operation).toBe("add");
    // Applying an addition advances the comparable-file baseline while
    // preserving the archive's baseline identity timestamp.
    expect(manifestAfterAdd?.createdAt).toBe(manifest?.createdAt);
    expect(manifestAfterAdd?.hashes[".prettierrc.json"]).toMatch(/^[0-9a-f]{64}$/);
    expect(await readFile(path.join(projectDir, "bts.lock.json"), "utf8")).not.toBe(
      manifestBeforeAdd,
    );
    expect(await pathExists(path.join(projectDir, "node_modules"))).toBe(false);
  }, 120_000);
});
