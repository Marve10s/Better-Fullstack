import { parseStackPartSpecs, type ProjectConfig } from "@better-fullstack/types";
import { afterEach, describe, expect, it } from "bun:test";
import fs from "fs-extra";
import { tmpdir } from "node:os";
import path from "node:path";

import { recordUpgradeBaseline } from "../src/helpers/core/scaffold-upgrade";
import { readBtsConfig, writeBtsConfig } from "../src/utils/bts-config";
import {
  applyMcpProjectUpdate,
  boundMcpUpdateReview,
  checkMcpProject,
  getMcpProjectStatus,
  planMcpProjectUpdate,
  MCP_UPDATE_REVIEW_CONTENT_LIMIT_BYTES,
} from "../src/utils/mcp-project-lifecycle";
import { planReviewedProjectUpdate } from "../src/utils/project-lifecycle";
import { inspectProject } from "../src/utils/project-status";
import { readScaffoldManifest, writeScaffoldManifest } from "../src/utils/scaffold-manifest";

const historicalFixture = path.join(import.meta.dir, "fixtures/cross-version/2.4.0");
const roots: string[] = [];
afterEach(async () => {
  await Promise.all(roots.splice(0).map((root) => fs.remove(root)));
});

describe("MCP project lifecycle parity", () => {
  it("truthfully annotates executable checks and recoverable apply", async () => {
    const source = await Bun.file(path.join(import.meta.dir, "../src/mcp.ts")).text();
    const checkBlock = source.slice(
      source.indexOf('registerTool(\n    "bfs_check_project"'),
      source.indexOf('registerTool(\n    "bfs_plan_project_update"'),
    );
    expect(checkBlock).toContain("readOnlyHint: false");
    expect(checkBlock).toContain("openWorldHint: true");
    expect(checkBlock).toContain("fetch dependencies");
    const applyBlock = source.slice(
      source.indexOf('registerTool(\n    "bfs_apply_project_update"'),
      source.indexOf('registerTool(\n    "bfs_plan_stack_update"'),
    );
    expect(applyBlock).toContain("destructiveHint: true");
    expect(applyBlock).toContain("recoverable transaction");
    expect(applyBlock).toContain("bfs_recover_project_transaction");
    expect(applyBlock).toContain("acknowledgeUnprovenManifestV1");
  });

  it("reports status with explicit Wave 1 prerequisites", async () => {
    const result = await getMcpProjectStatus(historicalFixture);
    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.prerequisites.wave1).toMatchObject({
      ready: false,
      generatorProvenance: "unverified",
      recovery: "available",
    });
    expect(result.prerequisites.wave1.blockers).toContain(
      "A versioned scaffold manifest is required for lifecycle apply and recovery.",
    );
  });

  it("runs the shared check service and fails absent generated targets", async () => {
    const result = await checkMcpProject(historicalFixture, {
      commandExists: async () => true,
      execute: async () => ({ exitCode: 0 }),
    });
    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.ok).toBe(false);
    expect(result.verification.expectedTargets).toBe(3);
    expect(result.targets.every((target) => target.status === "fail")).toBe(true);
    expect(result.targets.every((target) => target.executed === false)).toBe(true);
  });

  it("fails explicit zero-target graphs and injected incomplete matrices", async () => {
    const projectDir = await fs.mkdtemp(path.join(tmpdir(), "bfs-zero-target-"));
    roots.push(projectDir);
    await fs.copy(historicalFixture, projectDir);
    const config = await readBtsConfig(projectDir);
    expect(config).not.toBeNull();
    const zeroTarget = {
      ...config,
      projectDir,
      stackParts: [
        {
          id: "database:universal:sqlite",
          role: "database",
          ecosystem: "universal",
          toolId: "sqlite",
          source: "selected",
          targetPath: "packages/db",
        },
      ],
    } as ProjectConfig;
    await writeBtsConfig(zeroTarget, { version: config!.version, createdAt: config!.createdAt });

    const zero = await checkMcpProject(projectDir, {
      commandExists: async () => true,
      execute: async () => ({ exitCode: 0 }),
    });
    expect(zero.success).toBe(true);
    if (!zero.success) return;
    expect(zero).toMatchObject({
      ok: false,
      verification: { expectedTargets: 0, complete: false },
    });
    expect(zero.checks).toContainEqual({
      label: "generated verification",
      status: "fail",
      detail: "The explicit stack graph has no executable generated target contract.",
    });

    const restoredDir = await fs.mkdtemp(path.join(tmpdir(), "bfs-incomplete-matrix-"));
    roots.push(restoredDir);
    await fs.copy(historicalFixture, restoredDir);
    const incomplete = await inspectProject(restoredDir, {
      runChecks: true,
      generatedCheckRunner: async () => [],
    });
    expect(incomplete.success).toBe(true);
    if (!incomplete.success) return;
    expect(incomplete.ok).toBe(false);
    expect(incomplete.verification).toMatchObject({ expectedTargets: 3, complete: false });
    expect(
      incomplete.checks.some(
        (check) => check.label === "generated verification" && check.status === "fail",
      ),
    ).toBe(true);
  });

  it("reports native dependency and lock state at every target path with status parity", async () => {
    const projectDir = await fs.mkdtemp(path.join(tmpdir(), "bfs-native-status-"));
    roots.push(projectDir);
    await fs.copy(historicalFixture, projectDir);
    const persisted = await readBtsConfig(projectDir);
    expect(persisted).not.toBeNull();
    const stackParts = parseStackPartSpecs([
      "backend:python:fastapi:catalog",
      "backend:python:django:admin",
      "catalog.packageManager:python:uv",
      "admin.packageManager:python:poetry",
    ]);
    const config = { ...persisted, projectDir, stackParts } as ProjectConfig;
    await writeBtsConfig(config, {
      version: persisted!.version,
      createdAt: persisted!.createdAt,
    });
    for (const part of stackParts.filter((part) => part.role === "backend" && !part.ownerPartId)) {
      await fs.outputFile(path.join(projectDir, part.targetPath!, "pyproject.toml"), "[project]\n");
    }
    await fs.outputFile(path.join(projectDir, "services/catalog/uv.lock"), "version = 1\n");
    await fs.outputFile(path.join(projectDir, "services/admin/poetry.lock"), "# lock\n");

    const direct = await inspectProject(projectDir, { runChecks: false });
    const mcp = await getMcpProjectStatus(projectDir);
    expect(mcp).toEqual(direct);
    expect(mcp.success).toBe(true);
    if (!mcp.success) return;
    expect(mcp.checks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          targetId: "catalog",
          label: "catalog: pyproject.toml",
          status: "pass",
        }),
        expect.objectContaining({ targetId: "catalog", label: "catalog: uv.lock", status: "pass" }),
        expect.objectContaining({
          targetId: "admin",
          label: "admin: pyproject.toml",
          status: "pass",
        }),
        expect.objectContaining({ targetId: "admin", label: "admin: poetry.lock", status: "pass" }),
      ]),
    );
  });

  it("keeps historical fixtures plan-only and refuses unbound apply", async () => {
    expect(await fs.pathExists(path.join(historicalFixture, "bts.lock.json"))).toBe(false);
    const plan = await planMcpProjectUpdate(historicalFixture);
    expect(plan.success).toBe(true);
    if (!plan.success) return;
    expect(plan.applyAllowed).toBe(false);
    expect(plan.reviewToken).toBeUndefined();

    const applied = await applyMcpProjectUpdate(historicalFixture, undefined, false);
    expect(applied.success).toBe(false);
    if (!applied.success) expect(applied.error).toContain("versioned bts.lock.json baseline");
  });

  it("keeps adopted projects unverified and requires token plus acknowledgement", async () => {
    const projectDir = await fs.mkdtemp(path.join(tmpdir(), "bfs-current-lifecycle-"));
    roots.push(projectDir);
    await fs.copy(historicalFixture, projectDir);
    expect(await recordUpgradeBaseline(projectDir)).not.toBeNull();

    const plan = await planMcpProjectUpdate(projectDir);
    expect(plan.success).toBe(true);
    if (!plan.success) return;
    expect(plan.applyAllowed).toBe(false);
    expect(plan.reviewToken).toMatch(/^[a-f0-9]{64}$/);
    expect(plan.guarantee).toBe("unverified-origin-recoverable");
    expect(plan.blockers.join(" ")).toContain("original generator lineage is unverified");

    const refused = await applyMcpProjectUpdate(projectDir, plan.reviewToken, false);
    expect(refused.success).toBe(false);
    if (!refused.success) expect(refused.error).toContain("acknowledgeUnprovenManifestV1");

    const acknowledged = await applyMcpProjectUpdate(projectDir, plan.reviewToken, true);
    expect(acknowledged.success).toBe(true);
  });

  it("reports malformed manifests as structured unsupported blockers", async () => {
    const projectDir = await fs.mkdtemp(path.join(tmpdir(), "bfs-malformed-lifecycle-"));
    roots.push(projectDir);
    await fs.copy(historicalFixture, projectDir);
    await fs.writeJson(path.join(projectDir, "bts.lock.json"), {
      version: "1",
      createdAt: new Date().toISOString(),
      hashes: null,
    });

    const status = await getMcpProjectStatus(projectDir);
    expect(status.success).toBe(true);
    if (!status.success) return;
    expect(status.prerequisites.manifest).toMatchObject({
      present: true,
      state: "invalid",
      currentContractSupported: false,
    });
    expect(status.prerequisites.manifest.error).toContain("hashes");
    expect(status.prerequisites.wave1.blockers).toContain(status.prerequisites.manifest.error);

    const plan = await planMcpProjectUpdate(projectDir);
    expect(plan.success).toBe(false);
    if (!plan.success) {
      expect(plan.error).toContain("Unsupported malformed bts.lock.json");
      expect(plan.blockers).toEqual([plan.error]);
    }
  });

  it("returns exact bounded merge bytes and withholds tokens for oversized content", async () => {
    const projectDir = await fs.mkdtemp(path.join(tmpdir(), "bfs-bounded-review-"));
    roots.push(projectDir);
    await fs.copy(historicalFixture, projectDir);
    expect(await recordUpgradeBaseline(projectDir)).not.toBeNull();
    const planned = await planMcpProjectUpdate(projectDir);
    expect(planned.success).toBe(true);
    if (!planned.success || !planned.reviewToken) return;

    const exact = '{\n  "scripts": {"check": "tsc"}\n}\n';
    const exactReview = boundMcpUpdateReview({
      ...planned,
      plan: {
        ...planned.plan,
        files: [{ path: "package.json", category: "merged", mergedContent: exact }],
      },
    });
    expect(exactReview.reviewToken).toBe(planned.reviewToken);
    expect(exactReview.plan.files[0]).toMatchObject({
      mergedContent: exact,
      reviewContent: { status: "complete", contentBytes: Buffer.byteLength(exact) },
    });

    const oversized = "x".repeat(MCP_UPDATE_REVIEW_CONTENT_LIMIT_BYTES + 1);
    const oversizedReview = boundMcpUpdateReview({
      ...planned,
      plan: {
        ...planned.plan,
        files: [{ path: "package.json", category: "merged", mergedContent: oversized }],
      },
    });
    expect(oversizedReview.reviewToken).toBeUndefined();
    expect(oversizedReview.blockers.join(" ")).toContain("exact intended bytes were withheld");
    expect(oversizedReview.plan.files[0]).toMatchObject({
      path: "package.json",
      reviewContent: {
        status: "withheld-oversize",
        contentBytes: MCP_UPDATE_REVIEW_CONTENT_LIMIT_BYTES + 1,
        contentLimitBytes: MCP_UPDATE_REVIEW_CONTENT_LIMIT_BYTES,
      },
    });
    expect("mergedContent" in oversizedReview.plan.files[0]!).toBe(false);
  });

  it("refuses MCP apply when oversized merged bytes were withheld", async () => {
    const projectDir = await fs.mkdtemp(path.join(tmpdir(), "bfs-oversized-apply-"));
    roots.push(projectDir);
    await fs.copy(historicalFixture, projectDir);
    expect(await recordUpgradeBaseline(projectDir)).not.toBeNull();
    const manifest = await readScaffoldManifest(projectDir);
    expect(manifest?.baselines?.["package.json"]).toBeDefined();
    const proposed = JSON.parse(manifest!.baselines!["package.json"]!) as Record<
      string,
      unknown
    > & {
      scripts?: Record<string, string>;
    };
    const prior = structuredClone(proposed);
    const changedScript = Object.keys(prior.scripts ?? {})[0];
    expect(changedScript).toBeDefined();
    delete prior.scripts![changedScript!];
    manifest!.baselines!["package.json"] = `${JSON.stringify(prior, null, 2)}\n`;
    await writeScaffoldManifest(projectDir, manifest!);
    const disk = {
      ...prior,
      localReviewPayload: "x".repeat(MCP_UPDATE_REVIEW_CONTENT_LIMIT_BYTES + 1024),
    };
    const diskBytes = `${JSON.stringify(disk, null, 2)}\n`;
    await fs.writeFile(path.join(projectDir, "package.json"), diskBytes);

    const underlying = await planReviewedProjectUpdate(projectDir);
    expect(underlying.success).toBe(true);
    if (!underlying.success) return;
    expect(underlying.reviewToken).toMatch(/^[a-f0-9]{64}$/);
    expect(
      underlying.plan.files.some(
        (file) =>
          file.category === "merged" &&
          Buffer.byteLength(file.mergedContent ?? "") > MCP_UPDATE_REVIEW_CONTENT_LIMIT_BYTES,
      ),
    ).toBe(true);

    const bounded = await planMcpProjectUpdate(projectDir);
    expect(bounded.success).toBe(true);
    if (!bounded.success) return;
    expect(bounded.reviewToken).toBeUndefined();

    const refused = await applyMcpProjectUpdate(projectDir, underlying.reviewToken, true);
    expect(refused.success).toBe(false);
    if (!refused.success) expect(refused.error).toContain("exact intended bytes were withheld");
    expect(await fs.readFile(path.join(projectDir, "package.json"), "utf-8")).toBe(diskBytes);
  });
});
