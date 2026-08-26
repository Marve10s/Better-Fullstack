import {
  lifecycleResult,
  type LifecycleResult,
} from "@better-fullstack/project-lifecycle/contracts";
import { createReviewToken } from "@better-fullstack/project-lifecycle/review-token";
import {
  beginProjectTransaction,
  commitProjectTransaction,
  rollbackProjectTransaction,
  type ProjectTransaction,
  writeProjectTransactionFile,
} from "@better-fullstack/project-lifecycle/transaction";
import fs from "fs-extra";
import * as JSONC from "jsonc-parser";
import path from "node:path";

import type { ProjectConfig } from "@/types";

import { readBtsConfig, serializeBtsConfig } from "@/config/bts-config";
import { getProjectRecoveryCommand } from "@/lifecycle/lifecycle-command";
import { getCurrentLifecycleVersions, hashContent } from "@/lifecycle/scaffold-manifest";

const CONFIG_PATH = "bts.jsonc";

export type ConfigDriftChange = {
  path: string;
  action: "add" | "update" | "remove";
  reason: string;
};

export type ConfigDriftRepairPlan = {
  success: true;
  mode: "plan" | "applied";
  projectDir: string;
  packageManager: ProjectConfig["packageManager"];
  changed: boolean;
  changes: ConfigDriftChange[];
  reviewToken?: string;
  recoveryId?: string;
  lifecycle: LifecycleResult;
};

export type ConfigDriftRepairResult =
  | ConfigDriftRepairPlan
  | {
      success: false;
      projectDir: string;
      error: string;
      lifecycle?: LifecycleResult;
    };

type InternalPlan = ConfigDriftRepairPlan & {
  proposedContent: string;
  preimage: { sha256: string; mode: number };
};

function parseObject(content: string): Record<string, unknown> | null {
  const errors: JSONC.ParseError[] = [];
  const value = JSONC.parse(content, errors, {
    allowTrailingComma: true,
    disallowComments: false,
  });
  return errors.length === 0 && value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function changeReason(pathName: string, hasGraph: boolean): string {
  if (pathName === "stackParts") return "Add the authoritative Stack Graph projection.";
  if (pathName === "graphSummary" || pathName === "effectiveStack") {
    return "Refresh the human-readable projection derived from stackParts.";
  }
  if (hasGraph) return "Align the compatibility cache with authoritative stackParts.";
  return "Normalize the legacy configuration to the current config contract.";
}

function getChanges(
  current: Record<string, unknown>,
  proposed: Record<string, unknown>,
): ConfigDriftChange[] {
  const hasGraph = Array.isArray(proposed.stackParts) && proposed.stackParts.length > 0;
  const keys = new Set([...Object.keys(current), ...Object.keys(proposed)]);
  return [...keys]
    .filter((key) => JSON.stringify(current[key]) !== JSON.stringify(proposed[key]))
    .sort()
    .map((key) => ({
      path: key,
      action: !(key in current) ? "add" : !(key in proposed) ? "remove" : "update",
      reason: changeReason(key, hasGraph),
    }));
}

function applyConfigChanges(
  currentContent: string,
  proposed: Record<string, unknown>,
  changes: readonly ConfigDriftChange[],
): string {
  return changes.reduce(
    (content, change) =>
      JSONC.applyEdits(
        content,
        JSONC.modify(content, [change.path], proposed[change.path], {
          formattingOptions: { tabSize: 2, insertSpaces: true, eol: "\n" },
        }),
      ),
    currentContent,
  );
}

function repairToken(plan: Pick<InternalPlan, "projectDir" | "changes" | "preimage">): string {
  return createReviewToken("doctor-config-drift", {
    projectDir: plan.projectDir,
    changes: plan.changes,
    preimage: plan.preimage,
  });
}

function repairLifecycle(
  projectDir: string,
  status: "planned" | "applied" | "failed" | "rolled-back",
  changes: ConfigDriftChange[],
  recoveryId?: string,
  error?: string,
): LifecycleResult {
  return lifecycleResult({
    operation: "doctor-fix",
    status,
    projectDir,
    changes: { patched: changes.length > 0 ? 1 : 0 },
    warnings: [],
    blockers: error ? [error] : [],
    provenance: {
      source: null,
      target: getCurrentLifecycleVersions(),
      verified: false,
    },
    recovery: {
      available: changes.length > 0,
      automaticRollback: true,
      ...(recoveryId
        ? {
            transactionId: recoveryId,
            command: getProjectRecoveryCommand(projectDir, recoveryId, process.platform, undefined),
          }
        : {}),
    },
    affected: {
      stackParts: [],
      files: changes.length > 0 ? [{ path: CONFIG_PATH, action: "update" }] : [],
      dependencies: [],
    },
    checks: changes.map((change) => ({
      id: `config-drift:${change.path}`,
      status: status === "applied" ? "pass" : "pending",
      message: change.reason,
    })),
    sideEffects:
      changes.length > 0
        ? [
            {
              kind: "filesystem",
              status:
                status === "applied"
                  ? "applied"
                  : status === "planned"
                    ? "planned"
                    : status === "failed"
                      ? "failed"
                      : "restored",
              description: "Rewrite bts.jsonc inside one recovery transaction.",
            },
          ]
        : [],
    nextActions:
      changes.length > 0 && status === "planned"
        ? ["Review every changed config field, then apply with the exact review token."]
        : ["Run `doctor` again to verify project health."],
  });
}

async function buildInternalPlan(projectDirInput: string): Promise<InternalPlan> {
  const projectDir = await fs.realpath(path.resolve(projectDirInput));
  const configPath = path.join(projectDir, CONFIG_PATH);
  const stats = await fs.lstat(configPath).catch(() => null);
  if (!stats?.isFile() || stats.isSymbolicLink()) {
    throw new Error("bts.jsonc is missing, not a regular file, or is a symbolic link.");
  }
  const currentContent = await fs.readFile(configPath, "utf-8");
  const currentObject = parseObject(currentContent);
  if (!currentObject) {
    throw new Error("bts.jsonc is malformed. Doctor cannot create a safe repair plan.");
  }
  const normalized = await readBtsConfig(projectDir);
  if (!normalized) {
    throw new Error("bts.jsonc cannot be normalized to the current configuration contract.");
  }
  const canonicalContent = serializeBtsConfig(
    { ...normalized, projectDir } as unknown as ProjectConfig,
    { version: normalized.version, createdAt: normalized.createdAt },
  );
  const proposedObject = parseObject(canonicalContent);
  if (!proposedObject) throw new Error("The canonical config producer returned invalid JSONC.");
  const changes = getChanges(currentObject, proposedObject);
  const proposedContent = applyConfigChanges(currentContent, proposedObject, changes);
  const preimage = { sha256: hashContent(currentContent), mode: stats.mode & 0o7777 };
  const base: InternalPlan = {
    success: true,
    mode: "plan",
    projectDir,
    packageManager: normalized.packageManager,
    changed: changes.length > 0,
    changes,
    proposedContent,
    preimage,
    lifecycle: repairLifecycle(projectDir, "planned", changes),
  };
  return changes.length > 0 ? { ...base, reviewToken: repairToken(base) } : base;
}

export async function planConfigDriftRepair(
  projectDirInput: string,
): Promise<ConfigDriftRepairResult> {
  try {
    const {
      proposedContent: _proposedContent,
      preimage: _preimage,
      ...plan
    } = await buildInternalPlan(projectDirInput);
    return plan;
  } catch (error) {
    const projectDir = path.resolve(projectDirInput);
    const message = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      projectDir,
      error: message,
      lifecycle: repairLifecycle(projectDir, "failed", [], undefined, message),
    };
  }
}

export async function applyConfigDriftRepair(
  projectDirInput: string,
  reviewToken: string | undefined,
  options: {
    beforeMutation?: () => void | Promise<void>;
    afterWrite?: () => void | Promise<void>;
  } = {},
): Promise<ConfigDriftRepairResult> {
  let plan: InternalPlan;
  try {
    plan = await buildInternalPlan(projectDirInput);
  } catch (error) {
    const projectDir = path.resolve(projectDirInput);
    const message = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      projectDir,
      error: message,
      lifecycle: repairLifecycle(projectDir, "failed", [], undefined, message),
    };
  }
  if (!plan.changed) {
    const { proposedContent: _proposedContent, preimage: _preimage, ...publicPlan } = plan;
    return { ...publicPlan, mode: "applied" };
  }
  if (!reviewToken || reviewToken !== plan.reviewToken) {
    return {
      success: false,
      projectDir: plan.projectDir,
      error: "The doctor fix review token is missing or stale. Re-run `doctor --fix` first.",
      lifecycle: repairLifecycle(
        plan.projectDir,
        "failed",
        plan.changes,
        undefined,
        "Missing or stale review token.",
      ),
    };
  }

  let transaction: ProjectTransaction;
  try {
    transaction = await beginProjectTransaction(plan.projectDir, "doctor-fix", [CONFIG_PATH]);
  } catch (error) {
    const message = `Could not create the recovery snapshot: ${error instanceof Error ? error.message : String(error)}`;
    return {
      success: false,
      projectDir: plan.projectDir,
      error: message,
      lifecycle: repairLifecycle(plan.projectDir, "failed", plan.changes, undefined, message),
    };
  }

  try {
    const snapshot = transaction.metadata.files[0];
    if (
      !snapshot ||
      snapshot.state !== "file" ||
      snapshot.sha256 !== plan.preimage.sha256 ||
      snapshot.mode !== plan.preimage.mode
    ) {
      throw new Error("bts.jsonc changed after review. Re-run `doctor --fix`.");
    }
    await options.beforeMutation?.();
    const live = await fs.readFile(path.join(plan.projectDir, CONFIG_PATH));
    if (hashContent(live) !== plan.preimage.sha256) {
      throw new Error("bts.jsonc changed after the recovery snapshot. Re-run `doctor --fix`.");
    }
    await writeProjectTransactionFile(transaction, CONFIG_PATH, plan.proposedContent, {
      expectedSha256: hashContent(plan.proposedContent),
    });
    await options.afterWrite?.();
    await commitProjectTransaction(transaction);
    return {
      success: true,
      mode: "applied",
      projectDir: plan.projectDir,
      packageManager: plan.packageManager,
      changed: true,
      changes: plan.changes,
      reviewToken,
      recoveryId: transaction.id,
      lifecycle: repairLifecycle(plan.projectDir, "applied", plan.changes, transaction.id),
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    try {
      await rollbackProjectTransaction(transaction);
    } catch (rollbackError) {
      const rollbackMessage =
        rollbackError instanceof Error ? rollbackError.message : String(rollbackError);
      const failure = `${message}. Automatic rollback failed: ${rollbackMessage}. Recovery transaction: ${transaction.id}.`;
      return {
        success: false,
        projectDir: plan.projectDir,
        error: failure,
        lifecycle: repairLifecycle(
          plan.projectDir,
          "failed",
          plan.changes,
          transaction.id,
          failure,
        ),
      };
    }
    return {
      success: false,
      projectDir: plan.projectDir,
      error: `Doctor fix failed and the bounded config write was rolled back: ${message}`,
      lifecycle: repairLifecycle(
        plan.projectDir,
        "rolled-back",
        plan.changes,
        transaction.id,
        message,
      ),
    };
  }
}
