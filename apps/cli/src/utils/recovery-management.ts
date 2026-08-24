import path from "node:path";

import { lifecycleResult, type LifecycleResult } from "./lifecycle-contract";
import {
  getProjectRecoveryPoint,
  listProjectRecoveryPoints,
  pruneProjectRecoveryPoints,
  recoverProjectTransaction,
  verifyProjectRecoveryPoint,
  type PruneRecoveryPointsResult,
  type RecoveryMetadata,
  type RecoveryPointSummary,
  type RecoveryPointVerification,
} from "./project-transaction";

export type RecoveryManagementAction = "list" | "show" | "verify" | "apply" | "prune";

export type RecoveryManagementInput = {
  action: RecoveryManagementAction;
  projectDir: string;
  transactionId?: string;
  olderThanDays?: number;
  keep?: number;
  applyPrune?: boolean;
};

export type RecoveryManagementResult = {
  success: boolean;
  action: RecoveryManagementAction;
  projectDir: string;
  error?: string;
  points?: RecoveryPointSummary[];
  verification?: RecoveryPointVerification;
  prune?: PruneRecoveryPointsResult;
  transaction?: RecoveryMetadata;
  lifecycle?: LifecycleResult;
};

function requiredTransactionId(input: RecoveryManagementInput): string {
  if (!input.transactionId) {
    throw new Error(`A recovery transaction ID is required for ${input.action}.`);
  }
  return input.transactionId;
}

export async function manageProjectRecovery(
  input: RecoveryManagementInput,
): Promise<RecoveryManagementResult> {
  const projectDir = path.resolve(input.projectDir);
  try {
    if (input.action === "list") {
      return {
        success: true,
        action: input.action,
        projectDir,
        points: await listProjectRecoveryPoints(projectDir),
      };
    }
    if (input.action === "show" || input.action === "verify") {
      const transactionId = requiredTransactionId(input);
      const verification =
        input.action === "show"
          ? await getProjectRecoveryPoint(projectDir, transactionId)
          : await verifyProjectRecoveryPoint(projectDir, transactionId);
      if (input.action === "verify" && !verification.valid) {
        return {
          success: false,
          action: input.action,
          projectDir,
          verification,
          error: verification.errors.join(" ") || "Recovery point failed integrity verification.",
        };
      }
      return { success: true, action: input.action, projectDir, verification };
    }
    if (input.action === "prune") {
      return {
        success: true,
        action: input.action,
        projectDir,
        prune: await pruneProjectRecoveryPoints(projectDir, {
          olderThanDays: input.olderThanDays ?? 30,
          keep: input.keep ?? 5,
          apply: input.applyPrune === true,
        }),
      };
    }

    const transactionId = requiredTransactionId(input);
    const transaction = await recoverProjectTransaction(projectDir, transactionId);
    return {
      success: true,
      action: input.action,
      projectDir,
      transaction,
      lifecycle: lifecycleResult({
        operation: "recover",
        status: "recovered",
        projectDir,
        changes: { patched: transaction.files.length },
        provenance: { source: null, target: null, verified: false },
        recovery: { available: false, transactionId },
        nextActions: ["Run `check` to verify every generated target."],
      }),
    };
  } catch (error) {
    return {
      success: false,
      action: input.action,
      projectDir,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
