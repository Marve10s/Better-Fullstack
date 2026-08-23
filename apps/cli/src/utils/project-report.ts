import type { UpdateSupportEligibility } from "@better-fullstack/types";

import { planReviewedProjectUpdate } from "./project-lifecycle";
import {
  inspectProject,
  type ProjectStatusFailure,
  type ProjectStatusResult,
} from "./project-status";
import { getProjectUpdateSupport } from "./update-support";

export type ProjectUpgradeReport =
  | {
      available: true;
      actionable: boolean;
      applyAllowed: boolean;
      guarantee: "verified-manifest-v2-recoverable" | "unverified-origin-recoverable";
      requiresFullReview: boolean;
      summary: {
        drift: number;
        merged: number;
        newFiles: number;
        localEdits: number;
        conflicts: number;
        manualReview: number;
        removedByTemplate: number;
      };
      blockers: string[];
    }
  | {
      available: false;
      actionable: false;
      applyAllowed: false;
      requiresFullReview: false;
      error: string;
      blockers: string[];
    };

export type ProjectReportResult =
  | ProjectStatusFailure
  | (ProjectStatusResult & {
      updateSupport: UpdateSupportEligibility;
      upgrade: ProjectUpgradeReport;
    });

export async function getProjectReport(projectDir: string): Promise<ProjectReportResult> {
  const status = await inspectProject(projectDir, { runChecks: false });
  if (!status.success) return status;
  const updateSupport = await getProjectUpdateSupport(
    status.projectDir,
    status.prerequisites.config.version,
    status.prerequisites.config.currentVersion,
  );

  const reviewed = await planReviewedProjectUpdate(projectDir);
  if (!reviewed.success) {
    return {
      ...status,
      updateSupport,
      upgrade: {
        available: false,
        actionable: false,
        applyAllowed: false,
        requiresFullReview: false,
        error: reviewed.error,
        blockers: reviewed.blockers ?? [],
      },
    };
  }

  const plan = reviewed.plan;
  const requiresFullReview =
    plan.actionable.length > 0 ||
    plan.userEdited.length > 0 ||
    plan.conflicts.length > 0 ||
    plan.manual.length > 0 ||
    plan.removed.length > 0;
  return {
    ...status,
    updateSupport,
    upgrade: {
      available: true,
      actionable: plan.actionable.length > 0,
      applyAllowed: reviewed.applyAllowed,
      guarantee: reviewed.guarantee,
      requiresFullReview,
      summary: {
        drift: plan.drift.length,
        merged: plan.merged.length,
        newFiles: plan.newFiles.length,
        localEdits: plan.userEdited.length,
        conflicts: plan.conflicts.length,
        manualReview: plan.manual.length,
        removedByTemplate: plan.removed.length,
      },
      blockers: [...new Set([...reviewed.blockers, ...plan.lifecycle.blockers])],
    },
  };
}
