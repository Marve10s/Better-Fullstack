import fs from "fs-extra";
import path from "node:path";

import type { UpgradePlan } from "../helpers/core/scaffold-upgrade";

import {
  applyScaffoldUpgrade,
  getUpgradePlanDigest,
  planScaffoldUpgrade,
} from "../helpers/core/scaffold-upgrade";
import { getLifecyclePrerequisites } from "./project-status";
import { hashContent } from "./scaffold-manifest";

export type ReviewedProjectUpdatePlan = {
  success: true;
  projectDir: string;
  plan: UpgradePlan;
  reviewToken?: string;
  applyAllowed: boolean;
  blockers: string[];
  requiresUnprovenManifestV1Acknowledgement: true;
  guarantee: "unproven-manifest-v1-plan-only";
};

export async function planReviewedProjectUpdate(
  projectDirInput: string,
): Promise<
  | ReviewedProjectUpdatePlan
  | { success: false; projectDir: string; error: string; blockers?: string[] }
> {
  const requestedProjectDir = path.resolve(projectDirInput);
  const prerequisites = await getLifecyclePrerequisites(requestedProjectDir);
  if (prerequisites.manifest.state === "invalid") {
    const blocker = `Unsupported malformed bts.lock.json: ${prerequisites.manifest.error ?? "validation failed"}`;
    return { success: false, projectDir: requestedProjectDir, error: blocker, blockers: [blocker] };
  }
  const plan = await planScaffoldUpgrade(requestedProjectDir);
  if (!plan.success) return { ...plan, projectDir: requestedProjectDir };
  const projectDir = plan.projectRealpath;

  const blockers: string[] = [];
  if (!prerequisites.manifest.present) {
    blockers.push("A bts.lock.json manifest v1 baseline is required before MCP apply.");
  } else if (!prerequisites.manifest.currentContractSupported) {
    blockers.push(
      `Manifest version ${prerequisites.manifest.version ?? "unknown"} is not supported by the current update engine.`,
    );
  }
  const currentConfig = await fs.readFile(path.join(projectDir, "bts.jsonc")).catch(() => null);
  if (!currentConfig || hashContent(currentConfig) !== plan.configHash) {
    blockers.push("bts.jsonc changed while update eligibility was evaluated; re-plan first.");
  }

  const canReview = prerequisites.manifest.currentContractSupported && blockers.length === 0;
  blockers.push(
    "Manifest v1 cannot prove generator release lineage. Apply is destructive and has no transactional backup/recovery; explicit acknowledgement is required.",
  );
  return {
    success: true,
    projectDir,
    plan,
    reviewToken: canReview ? getUpgradePlanDigest(plan) : undefined,
    applyAllowed: false,
    blockers,
    requiresUnprovenManifestV1Acknowledgement: true,
    guarantee: "unproven-manifest-v1-plan-only",
  };
}

export async function applyReviewedProjectUpdate(
  projectDirInput: string,
  reviewToken: string | undefined,
  acknowledgeUnprovenManifestV1: boolean | undefined,
) {
  const reviewed = await planReviewedProjectUpdate(projectDirInput);
  if (!reviewed.success) return reviewed;
  if (!reviewed.reviewToken) {
    return {
      success: false as const,
      projectDir: reviewed.projectDir,
      error: reviewed.blockers.join(" ") || "This project update cannot be applied.",
      blockers: reviewed.blockers,
    };
  }
  if (!reviewToken) {
    return {
      success: false as const,
      projectDir: reviewed.projectDir,
      error: "reviewToken is required. Call and review bfs_plan_project_update first.",
    };
  }
  if (reviewToken !== reviewed.reviewToken) {
    return {
      success: false as const,
      projectDir: reviewed.projectDir,
      error: "The reviewed update plan is stale or does not belong to this project. Re-plan first.",
    };
  }
  if (acknowledgeUnprovenManifestV1 !== true) {
    return {
      success: false as const,
      projectDir: reviewed.projectDir,
      error:
        "acknowledgeUnprovenManifestV1: true is required: manifest v1 has unproven release lineage, apply is destructive, and no backup/recovery exists.",
    };
  }

  return applyScaffoldUpgrade(reviewed.projectDir, {
    expectedPlanDigest: reviewToken,
    acknowledgeUnprovenManifestV1: true,
  });
}
