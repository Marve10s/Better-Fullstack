import { parseStackPartSpecs, type ProjectConfig } from "@better-fullstack/types";
import { afterEach, describe, expect, it } from "bun:test";
import fs from "fs-extra";
import { tmpdir } from "node:os";
import path from "node:path";
import { prettifyError, type ZodType } from "zod";

import { renderCurrentProject } from "../src/helpers/core/scaffold-upgrade";
import { treeToFileMap } from "../src/helpers/core/stack-update";
import { readBtsConfig, writeBtsConfig } from "../src/utils/bts-config";
import {
  partRemovalOutputSchema,
  projectAdoptionOutputSchema,
  projectStatusOutputSchema,
  projectUpdateOutputSchema,
  projectVerificationOutputSchema,
  recoveryManagementOutputSchema,
  recoveryOutputSchema,
} from "../src/utils/mcp-lifecycle-output-schemas";
import {
  applyMcpPartRemoval,
  applyMcpProjectUpdate,
  boundMcpUpdateReview,
  checkMcpProject,
  confirmMcpProjectAdoption,
  getMcpProjectRecoveryPoint,
  getMcpProjectStatus,
  listMcpProjectRecoveryPoints,
  planMcpPartRemoval,
  planMcpProjectAdoption,
  planMcpProjectUpdate,
  pruneMcpProjectRecoveryPoints,
  recoverMcpProjectTransaction,
  verifyMcpProjectRecoveryPoint,
  MCP_UPDATE_REVIEW_CONTENT_LIMIT_BYTES,
} from "../src/utils/mcp-project-lifecycle";
import { confirmProjectAdoption, planProjectAdoption } from "../src/utils/project-adoption";
import { planReviewedProjectUpdate } from "../src/utils/project-lifecycle";
import { inspectProject } from "../src/utils/project-status";
import {
  readScaffoldManifest,
  recordScaffoldManifest,
  writeScaffoldManifest,
} from "../src/utils/scaffold-manifest";

const historicalFixture = path.join(import.meta.dir, "fixtures/cross-version/2.4.0");
const roots: string[] = [];

function assertOutputSchema(schema: ZodType, value: unknown) {
  const parsed = schema.safeParse(value);
  if (!parsed.success) throw new Error(prettifyError(parsed.error));
}

async function adoptProject(projectDir: string) {
  const plan = await planProjectAdoption(projectDir);
  expect(plan.success).toBe(true);
  if (!plan.success) return plan;
  const result = await confirmProjectAdoption(projectDir, plan.confirmationToken);
  expect(result.success).toBe(true);
  return result;
}

afterEach(async () => {
  await Promise.all(roots.splice(0).map((root) => fs.remove(root)));
});

describe("MCP project lifecycle parity", () => {
  it("plans and confirms pre-manifest adoption through one declared schema", async () => {
    const projectDir = await fs.mkdtemp(path.join(tmpdir(), "bfs-mcp-adoption-"));
    roots.push(projectDir);
    await fs.copy(historicalFixture, projectDir);

    const plan = await planMcpProjectAdoption(projectDir);
    assertOutputSchema(projectAdoptionOutputSchema, plan);
    expect(plan.success).toBe(true);
    if (!plan.success) return;
    expect(plan).toMatchObject({
      mode: "plan",
      adopted: false,
      provenanceState: "adopted-unverified",
      confirmationRequired: true,
    });
    expect(plan.likelyStackParts.length).toBeGreaterThan(0);

    const refused = await confirmMcpProjectAdoption(projectDir, "0".repeat(64));
    assertOutputSchema(projectAdoptionOutputSchema, refused);
    expect(refused.success).toBe(false);

    const confirmed = await confirmMcpProjectAdoption(projectDir, plan.confirmationToken);
    assertOutputSchema(projectAdoptionOutputSchema, confirmed);
    expect(confirmed).toMatchObject({
      success: true,
      mode: "adopted",
      adopted: true,
      manifest: { provenanceState: "adopted-unverified" },
    });
  });

  it("validates current lifecycle success and failure payloads against declared schemas", async () => {
    const missingProject = path.join(tmpdir(), "bfs-missing-project-output-contract");
    assertOutputSchema(projectStatusOutputSchema, await getMcpProjectStatus(missingProject));
    assertOutputSchema(projectVerificationOutputSchema, await checkMcpProject(missingProject));
    assertOutputSchema(
      partRemovalOutputSchema,
      await planMcpPartRemoval(missingProject, "backend.validation:typescript:zod"),
    );
    assertOutputSchema(projectUpdateOutputSchema, await planMcpProjectUpdate(missingProject));
    assertOutputSchema(
      recoveryOutputSchema,
      await recoverMcpProjectTransaction(missingProject, "00000000-0000-4000-8000-000000000000"),
    );
    assertOutputSchema(
      recoveryManagementOutputSchema,
      await listMcpProjectRecoveryPoints(missingProject),
    );
    assertOutputSchema(
      recoveryManagementOutputSchema,
      await getMcpProjectRecoveryPoint(missingProject, "00000000-0000-4000-8000-000000000000"),
    );

    const projectDir = await fs.mkdtemp(path.join(tmpdir(), "bfs-mcp-output-contract-"));
    roots.push(projectDir);
    await fs.copy(historicalFixture, projectDir);

    assertOutputSchema(projectStatusOutputSchema, await getMcpProjectStatus(projectDir));
    assertOutputSchema(
      projectVerificationOutputSchema,
      await checkMcpProject(projectDir, {
        commandExists: async () => true,
        execute: async () => ({ exitCode: 0 }),
      }),
    );

    const target = "backend:typescript:hono.validation:typescript:zod";
    const removalPlan = await planMcpPartRemoval(projectDir, target);
    assertOutputSchema(partRemovalOutputSchema, removalPlan);
    expect(removalPlan.success).toBe(true);
    if (!removalPlan.success || !removalPlan.reviewToken) return;
    const removal = await applyMcpPartRemoval(projectDir, target, removalPlan.reviewToken, false);
    assertOutputSchema(partRemovalOutputSchema, removal);
    expect(removal.success).toBe(true);
    if (!removal.success || !removal.recoveryId) return;
    const listedRecovery = await listMcpProjectRecoveryPoints(projectDir);
    assertOutputSchema(recoveryManagementOutputSchema, listedRecovery);
    expect(listedRecovery).toMatchObject({
      success: true,
      action: "list",
      points: [expect.objectContaining({ id: removal.recoveryId, recoverable: true })],
    });
    const shownRecovery = await getMcpProjectRecoveryPoint(projectDir, removal.recoveryId);
    assertOutputSchema(recoveryManagementOutputSchema, shownRecovery);
    expect(shownRecovery).toMatchObject({
      success: true,
      action: "show",
      verification: { id: removal.recoveryId, valid: true, recoverable: true },
    });
    const verifiedRecovery = await verifyMcpProjectRecoveryPoint(projectDir, removal.recoveryId);
    assertOutputSchema(recoveryManagementOutputSchema, verifiedRecovery);
    expect(verifiedRecovery).toMatchObject({ success: true, action: "verify" });
    const prunePreview = await pruneMcpProjectRecoveryPoints(projectDir, 0, 5, false);
    assertOutputSchema(recoveryManagementOutputSchema, prunePreview);
    expect(prunePreview).toMatchObject({
      success: true,
      action: "prune",
      prune: { applied: false, candidates: [] },
    });
    const recoveredRemoval = await recoverMcpProjectTransaction(projectDir, removal.recoveryId);
    assertOutputSchema(recoveryOutputSchema, recoveredRemoval);
    expect(recoveredRemoval.success).toBe(true);

    await adoptProject(projectDir);
    const updatePlan = await planMcpProjectUpdate(projectDir);
    assertOutputSchema(projectUpdateOutputSchema, updatePlan);
    expect(updatePlan.success).toBe(true);
    if (!updatePlan.success || !updatePlan.reviewToken) return;
    const refusedUpdate = await applyMcpProjectUpdate(projectDir, "0".repeat(64), true);
    assertOutputSchema(projectUpdateOutputSchema, refusedUpdate);
    expect(refusedUpdate.success).toBe(false);
    const appliedUpdate = await applyMcpProjectUpdate(projectDir, updatePlan.reviewToken, true);
    assertOutputSchema(projectUpdateOutputSchema, appliedUpdate);
    expect(appliedUpdate.success).toBe(true);
  });

  it("truthfully annotates executable checks and recoverable apply", async () => {
    const source = await Bun.file(path.join(import.meta.dir, "../src/mcp.ts")).text();
    const structuredToolBlocks = source
      .split("\n  registerTool(")
      .slice(1)
      .filter((block) => block.includes("structuredContent"));
    expect(structuredToolBlocks.length).toBeGreaterThan(0);
    for (const block of structuredToolBlocks) {
      const outputSchemaIndex = block.indexOf("outputSchema:");
      expect(outputSchemaIndex).toBeGreaterThan(-1);
      expect(outputSchemaIndex).toBeLessThan(block.indexOf("structuredContent"));
    }
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
      recovery: "unavailable",
    });
    expect(result.prerequisites.wave1.blockers).toContain(
      "A versioned scaffold manifest is required for lifecycle apply and recovery.",
    );
    expect(result.stackPartSpecs).toContain("backend.validation:typescript:zod");
    expect(result.upgrade).toMatchObject({
      available: true,
      actionable: true,
      applyAllowed: false,
      guarantee: "unverified-origin-recoverable",
    });
    expect(result.updateSupport).toMatchObject({
      supportedFrom: null,
      supportedTo: null,
      sourceVersion: "2.4.0",
      eligibility: "manual-review-required",
      reasonCode: "manifest-v2-required",
      requiresManualReview: true,
    });
  });

  it("reports same-release reconciliation without inventing a historical window", async () => {
    const projectDir = await fs.mkdtemp(path.join(tmpdir(), "bfs-current-update-support-"));
    roots.push(projectDir);
    await fs.copy(historicalFixture, projectDir);
    expect(await recordScaffoldManifest(projectDir)).not.toBeNull();

    const result = await getMcpProjectStatus(projectDir);
    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.updateSupport).toMatchObject({
      policyStatus: "qualification",
      supportedFrom: null,
      supportedTo: null,
      eligibility: "same-release",
      eligible: true,
      historicalUpgrade: false,
      requiresManualReview: false,
      reasonCode: "same-release",
    });
    assertOutputSchema(projectStatusOutputSchema, result);
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

  it("excludes retained recovery snapshots from environment checks", async () => {
    const projectDir = await fs.mkdtemp(path.join(tmpdir(), "bfs-status-recovery-env-"));
    roots.push(projectDir);
    await fs.copy(historicalFixture, projectDir);
    await fs.outputFile(
      path.join(projectDir, ".bts/recovery/transaction/files/apps/web/.env.example"),
      "RECOVERY_ONLY_SECRET=required\n",
    );

    const result = await inspectProject(projectDir, { runChecks: false });
    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.checks.some((check) => check.label.includes(".bts/recovery"))).toBe(false);
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

    await writeBtsConfig(
      { ...zeroTarget, frontend: ["tanstack-router"], stackParts: [] } as ProjectConfig,
      { version: config!.version, createdAt: config!.createdAt },
    );
    const emptyGraph = await inspectProject(projectDir, { runChecks: false });
    expect(emptyGraph.success).toBe(true);
    if (!emptyGraph.success) return;
    expect(emptyGraph.stackPartSpecs).toEqual([]);

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

    const mcp = await getMcpProjectStatus(projectDir);
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
    expect(mcp.upgrade.available).toBe(true);
  });

  it("plans exact non-primary removal and applies only with its bound token", async () => {
    const projectDir = await fs.mkdtemp(path.join(tmpdir(), "bfs-part-removal-"));
    roots.push(projectDir);
    await fs.copy(historicalFixture, projectDir);
    const target = "backend:typescript:hono.validation:typescript:zod";

    const plan = await planMcpPartRemoval(projectDir, target);
    expect(plan.success).toBe(true);
    if (!plan.success) return;
    expect(plan.removal).toMatchObject({ selectedPart: "backend.validation:typescript:zod" });
    expect(plan.reviewToken).toMatch(/^[a-f0-9]{64}$/);
    expect((await readBtsConfig(projectDir))?.validation).toBe("zod");

    const stale = await applyMcpPartRemoval(projectDir, target, "0".repeat(64), false);
    expect(stale.success).toBe(false);
    expect((await readBtsConfig(projectDir))?.validation).toBe("zod");

    const applied = await applyMcpPartRemoval(projectDir, target, plan.reviewToken, false);
    expect(applied.success).toBe(true);
    const updated = await readBtsConfig(projectDir);
    expect(updated?.validation).toBe("none");
    expect(updated?.stackParts?.some((part) => part.id === target)).toBe(false);
    if (applied.success) expect(applied.lifecycle.recovery.available).toBe(true);
  });

  it("refuses removal of primary architecture roles", async () => {
    const result = await planMcpPartRemoval(historicalFixture, "backend:typescript:hono");
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error).toContain("Cannot remove primary backend part");
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
    await adoptProject(projectDir);

    const status = await getMcpProjectStatus(projectDir);
    expect(status.success).toBe(true);
    if (!status.success) return;
    expect(status.prerequisites.wave1).toMatchObject({
      generatorProvenance: "unverified",
      recovery: "available",
    });

    const plan = await planMcpProjectUpdate(projectDir);
    expect(plan.success).toBe(true);
    if (!plan.success) return;
    expect(plan.applyAllowed).toBe(false);
    expect(plan.reviewToken).toMatch(/^[a-f0-9]{64}$/);
    expect(plan.guarantee).toBe("unverified-origin-recoverable");
    expect(plan.blockers.join(" ")).toContain("original generator lineage is unverified");
    const actionableFiles = plan.plan.files.filter((file) =>
      plan.plan.actionable.includes(file.path),
    );
    expect(actionableFiles.length).toBeGreaterThan(0);
    expect(
      actionableFiles.every(
        (file) =>
          typeof file.mergedContent === "string" && file.reviewContent?.status === "complete",
      ),
    ).toBe(true);
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
    await adoptProject(projectDir);
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

  it("withholds the review token when an actionable file has no reviewable bytes", async () => {
    const projectDir = await fs.mkdtemp(path.join(tmpdir(), "bfs-unavailable-review-"));
    roots.push(projectDir);
    await fs.copy(historicalFixture, projectDir);
    await adoptProject(projectDir);
    const planned = await planMcpProjectUpdate(projectDir);
    expect(planned.success).toBe(true);
    if (!planned.success) return;

    const unavailableReview = boundMcpUpdateReview({
      ...planned,
      reviewToken: "a".repeat(64),
      plan: {
        ...planned.plan,
        actionable: ["new-file.ts"],
        files: [{ path: "new-file.ts", category: "new-file" }],
      },
    });

    expect(unavailableReview.reviewToken).toBeUndefined();
    expect(unavailableReview.blockers.join(" ")).toContain("exact intended bytes were withheld");
    expect(unavailableReview.plan.files[0]).toMatchObject({
      path: "new-file.ts",
      reviewContent: { status: "withheld-unavailable" },
    });
  });

  it("refuses MCP apply when oversized merged bytes were withheld", async () => {
    const projectDir = await fs.mkdtemp(path.join(tmpdir(), "bfs-oversized-apply-"));
    roots.push(projectDir);
    await fs.copy(historicalFixture, projectDir);
    const rendered = await renderCurrentProject(projectDir);
    if ("error" in rendered) throw new Error(rendered.error);
    const packageJson = treeToFileMap(rendered.tree).get("package.json");
    if (!packageJson || packageJson.content === "[Binary file]") {
      throw new Error("Current fixture render has no text package.json");
    }
    await fs.writeFile(path.join(projectDir, "package.json"), packageJson.content);
    await adoptProject(projectDir);
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
