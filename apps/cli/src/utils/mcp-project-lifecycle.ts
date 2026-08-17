import type { GeneratedCheckDependencies } from "./generated-checks";

import { applyPartRemoval, planPartRemoval } from "../helpers/core/remove-handler";
import { lifecycleResult } from "./lifecycle-contract";
import {
  applyReviewedProjectUpdate,
  planReviewedProjectUpdate,
  type ReviewedProjectUpdatePlan,
} from "./project-lifecycle";
import { getProjectReport } from "./project-report";
import { inspectProject } from "./project-status";
import { recoverProjectTransaction } from "./project-transaction";
import { hashContent } from "./scaffold-manifest";

export const MCP_UPDATE_REVIEW_CONTENT_LIMIT_BYTES = 32 * 1024;

export function boundMcpUpdateReview(result: ReviewedProjectUpdatePlan) {
  let hasWithheldContent = false;
  const files = result.plan.files.map((file) => {
    if (file.mergedContent === undefined) {
      if (!result.plan.actionable.includes(file.path)) return file;
      hasWithheldContent = true;
      return {
        ...file,
        reviewContent: { status: "withheld-unavailable" as const },
      };
    }
    const contentBytes = Buffer.byteLength(file.mergedContent, "utf-8");
    const contentSha256 = hashContent(file.mergedContent);
    if (contentBytes <= MCP_UPDATE_REVIEW_CONTENT_LIMIT_BYTES) {
      return {
        ...file,
        reviewContent: { status: "complete" as const, contentBytes, contentSha256 },
      };
    }
    hasWithheldContent = true;
    const { mergedContent: _withheld, ...bounded } = file;
    return {
      ...bounded,
      reviewContent: {
        status: "withheld-oversize" as const,
        contentBytes,
        contentSha256,
        contentLimitBytes: MCP_UPDATE_REVIEW_CONTENT_LIMIT_BYTES,
      },
    };
  });
  if (!hasWithheldContent) return { ...result, plan: { ...result.plan, files } };
  return {
    ...result,
    reviewToken: undefined,
    blockers: [
      ...result.blockers,
      `At least one actionable file's exact intended bytes were unavailable or exceeded the ${MCP_UPDATE_REVIEW_CONTENT_LIMIT_BYTES}-byte MCP review limit. No review token is issued because the exact intended bytes were withheld.`,
    ],
    plan: { ...result.plan, files },
  };
}

export async function getMcpProjectStatus(projectDir: string) {
  return getProjectReport(projectDir);
}

export async function checkMcpProject(
  projectDir: string,
  generatedChecks: GeneratedCheckDependencies = { output: "ignore" },
) {
  return inspectProject(projectDir, { runChecks: true, generatedChecks });
}

export async function planMcpProjectUpdate(projectDir: string) {
  const result = await planReviewedProjectUpdate(projectDir);
  return result.success ? boundMcpUpdateReview(result) : result;
}

export async function planMcpPartRemoval(projectDir: string, target: string) {
  return planPartRemoval(projectDir, target);
}

export async function applyMcpPartRemoval(
  projectDir: string,
  target: string,
  reviewToken: string | undefined,
  acknowledgeArchitectureChange: boolean | undefined,
) {
  return applyPartRemoval(projectDir, target, reviewToken, acknowledgeArchitectureChange === true);
}

export async function applyMcpProjectUpdate(
  projectDir: string,
  reviewToken: string | undefined,
  acknowledgeUnprovenManifestV1: boolean | undefined,
) {
  const bounded = await planMcpProjectUpdate(projectDir);
  if (!bounded.success) return bounded;
  if (!bounded.reviewToken) {
    return {
      success: false as const,
      projectDir: bounded.projectDir,
      error:
        bounded.blockers.join(" ") ||
        "MCP apply is unavailable because the complete bounded review content was not returned.",
      blockers: bounded.blockers,
    };
  }
  if (reviewToken !== bounded.reviewToken) {
    return {
      success: false as const,
      projectDir: bounded.projectDir,
      error: "The MCP review token is missing, stale, or was not issued by the bounded MCP plan.",
    };
  }
  return applyReviewedProjectUpdate(projectDir, reviewToken, acknowledgeUnprovenManifestV1);
}

export async function recoverMcpProjectTransaction(projectDir: string, transactionId: string) {
  try {
    const transaction = await recoverProjectTransaction(projectDir, transactionId);
    return {
      success: true as const,
      projectDir,
      transaction,
      lifecycle: lifecycleResult({
        operation: "recover",
        status: "recovered",
        projectDir,
        changes: { patched: transaction.files.length },
        provenance: { source: null, target: null, verified: false },
        recovery: { available: false, transactionId },
        nextActions: ["Run `bfs_check_project` to verify every generated target."],
      }),
    };
  } catch (error) {
    return {
      success: false as const,
      projectDir,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
