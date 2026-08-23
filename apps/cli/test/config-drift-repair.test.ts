import { createCliDefaultProjectConfigBase, type ProjectConfig } from "@better-fullstack/types";
import { afterAll, describe, expect, it } from "bun:test";
import fs from "fs-extra";
import * as JSONC from "jsonc-parser";
import { tmpdir } from "node:os";
import path from "node:path";

import { getDoctorFixApplyCommand } from "../src/commands/doctor";
import { writeBtsConfig } from "../src/utils/bts-config";
import { applyConfigDriftRepair, planConfigDriftRepair } from "../src/utils/config-drift-repair";
import { RECOVERY_ROOT, recoverProjectTransaction } from "../src/utils/project-transaction";
import { hashContent } from "../src/utils/scaffold-manifest";

const roots: string[] = [];

afterAll(async () => {
  await Promise.all(roots.map((root) => fs.remove(root)));
});

async function makeProject(): Promise<string> {
  const projectDir = await fs.mkdtemp(path.join(tmpdir(), "bfs-doctor-fix-"));
  roots.push(projectDir);
  const config = {
    ...createCliDefaultProjectConfigBase(),
    projectName: "doctor-fix",
    projectDir,
    relativePath: ".",
    git: false,
    install: false,
  } as ProjectConfig;
  await writeBtsConfig(config);
  return projectDir;
}

async function writeStaleGraphCache(projectDir: string): Promise<string> {
  const configPath = path.join(projectDir, "bts.jsonc");
  let content = await fs.readFile(configPath, "utf-8");
  for (const [key, value] of Object.entries({
    graphSummary: "stale summary",
    effectiveStack: { backend: "go:gin" },
    backend: "express",
  })) {
    content = JSONC.applyEdits(
      content,
      JSONC.modify(content, [key], value, {
        formattingOptions: { tabSize: 2, insertSpaces: true, eol: "\n" },
      }),
    );
  }
  await fs.writeFile(configPath, content, "utf-8");
  return content;
}

describe("doctor config drift repair", () => {
  it("plans graph and compatibility-cache repair without writing", async () => {
    const projectDir = await makeProject();
    const before = await writeStaleGraphCache(projectDir);

    const plan = await planConfigDriftRepair(projectDir);

    expect(plan.success).toBe(true);
    if (!plan.success) return;
    expect(plan).toMatchObject({ mode: "plan", changed: true });
    expect(plan.reviewToken).toMatch(/^[0-9a-f]{64}$/);
    expect(plan.changes.map((change) => change.path)).toEqual(
      expect.arrayContaining(["backend", "effectiveStack", "graphSummary"]),
    );
    expect(plan.lifecycle).toMatchObject({
      operation: "doctor-fix",
      status: "planned",
      recovery: { available: true, automaticRollback: true },
    });
    expect(getDoctorFixApplyCommand(plan, "linux")).toContain(
      `doctor '${plan.projectDir}' --fix --apply --review-token ${plan.reviewToken}`,
    );
    expect(await fs.readFile(path.join(projectDir, "bts.jsonc"), "utf-8")).toBe(before);
  });

  it("requires an exact current-state token and produces a recoverable config write", async () => {
    const projectDir = await makeProject();
    const before = await writeStaleGraphCache(projectDir);
    const plan = await planConfigDriftRepair(projectDir);
    expect(plan.success).toBe(true);
    if (!plan.success) return;

    const missing = await applyConfigDriftRepair(projectDir, undefined);
    expect(missing).toMatchObject({
      success: false,
      error: expect.stringContaining("missing or stale"),
    });
    expect(await fs.readFile(path.join(projectDir, "bts.jsonc"), "utf-8")).toBe(before);

    const applied = await applyConfigDriftRepair(projectDir, plan.reviewToken);
    expect(applied.success).toBe(true);
    if (!applied.success) return;
    expect(applied).toMatchObject({ mode: "applied", changed: true });
    expect(applied.recoveryId).toMatch(/[0-9a-f-]{36}/);
    const repaired = await fs.readFile(path.join(projectDir, "bts.jsonc"), "utf-8");
    expect(repaired).not.toBe(before);
    expect(repaired).not.toContain("stale summary");
    expect(repaired).not.toContain('"backend": "express"');

    expect(applied.recoveryId).toBeDefined();
    if (!applied.recoveryId) return;
    await recoverProjectTransaction(projectDir, applied.recoveryId);
    expect(await fs.readFile(path.join(projectDir, "bts.jsonc"), "utf-8")).toBe(before);
  });

  it("keeps a crashed config repair recoverable from its durable postimage", async () => {
    const projectDir = await makeProject();
    const crashRoot = await fs.mkdtemp(path.join(tmpdir(), "bfs-doctor-fix-crash-"));
    roots.push(crashRoot);
    const crashedDir = path.join(crashRoot, "project");
    const before = await writeStaleGraphCache(projectDir);
    const plan = await planConfigDriftRepair(projectDir);
    expect(plan.success).toBe(true);
    if (!plan.success || !plan.reviewToken) return;

    const result = await applyConfigDriftRepair(projectDir, plan.reviewToken, {
      afterWrite: async () => {
        await fs.copy(projectDir, crashedDir);
        throw new Error("injected process stop");
      },
    });
    expect(result.success).toBe(false);

    const [transactionId] = await fs.readdir(path.join(crashedDir, RECOVERY_ROOT));
    const metadata = (await fs.readJson(
      path.join(crashedDir, RECOVERY_ROOT, transactionId, "transaction.json"),
    )) as { outputs?: Record<string, string | null> };
    const crashedContent = await fs.readFile(path.join(crashedDir, "bts.jsonc"), "utf-8");
    expect(metadata.outputs?.["bts.jsonc"]).toBe(hashContent(crashedContent));
    await recoverProjectTransaction(crashedDir, transactionId);
    expect(await fs.readFile(path.join(crashedDir, "bts.jsonc"), "utf-8")).toBe(before);
  });

  it("rejects a stale plan after bts.jsonc changes", async () => {
    const projectDir = await makeProject();
    await writeStaleGraphCache(projectDir);
    const plan = await planConfigDriftRepair(projectDir);
    expect(plan.success).toBe(true);
    if (!plan.success) return;
    await fs.appendFile(path.join(projectDir, "bts.jsonc"), "\n// changed after review\n");

    const result = await applyConfigDriftRepair(projectDir, plan.reviewToken);

    expect(result).toMatchObject({
      success: false,
      error: expect.stringContaining("missing or stale"),
    });
  });

  it("reports a no-op for a canonical config", async () => {
    const projectDir = await makeProject();
    const plan = await planConfigDriftRepair(projectDir);
    expect(plan).toMatchObject({
      success: true,
      mode: "plan",
      changed: false,
      changes: [],
    });
  });
});
