import fs from "fs-extra";
import path from "node:path";

import type { ProjectConfig, StackPart } from "../../types";

import {
  formatStackPartSpec,
  legacyProjectConfigToStackParts,
  stackPartsToLegacyProjectConfigPartial,
} from "../../types";
import { readBtsConfig } from "../../utils/bts-config";
import { hashContent } from "../../utils/scaffold-manifest";
import {
  applyStackUpdate,
  getStackUpdatePlanDigest,
  planStackUpdate,
  type StackUpdatePlan,
  type StackUpdateResult,
} from "./stack-update";

const PRIMARY_ROLES = new Set<StackPart["role"]>(["frontend", "backend", "mobile", "database"]);

export type PartRemoval = {
  target: string;
  selectedPart: string;
  configKeys: string[];
};

export type PartRemovalPlan = StackUpdatePlan & {
  removal: PartRemoval;
  applyAllowed: boolean;
  reviewToken?: string;
};

export type PartRemovalResult = PartRemovalPlan | Extract<StackUpdateResult, { success: false }>;

type ResolvedRemoval = {
  projectDir: string;
  request: Record<string, unknown>;
  replaceArrayKeys: ReadonlySet<keyof ProjectConfig>;
  stackPartsOverride: readonly StackPart[];
  removal: PartRemoval;
};

function selectedParts(config: Awaited<ReturnType<typeof readBtsConfig>>): StackPart[] {
  if (!config) return [];
  const parts =
    config.stackParts === undefined ? legacyProjectConfigToStackParts(config) : config.stackParts;
  return parts.filter((part) => part.source !== "provided" && part.toolId !== "none");
}

function listTargets(parts: readonly StackPart[]): string {
  return parts
    .map((part) => formatStackPartSpec(part, parts))
    .sort()
    .join(", ");
}

async function resolveRemoval(projectDirInput: string, target: string): Promise<ResolvedRemoval> {
  const projectDir = await fs.realpath(path.resolve(projectDirInput));
  const config = await readBtsConfig(projectDir);
  if (!config) {
    throw new Error(`No bts.jsonc found in ${projectDir}. Is this a Better Fullstack project?`);
  }

  const parts = selectedParts(config);
  const matches = parts.filter(
    (part) => part.id === target || formatStackPartSpec(part, parts) === target,
  );
  if (matches.length !== 1) {
    const detail = matches.length > 1 ? "is ambiguous" : "is not selected";
    throw new Error(
      `Removal target '${target}' ${detail}. Use one exact selected part: ${listTargets(parts)}`,
    );
  }

  const part = matches[0];
  if (!part) throw new Error(`Removal target '${target}' is not selected.`);
  if (PRIMARY_ROLES.has(part.role) && !part.ownerPartId) {
    throw new Error(
      `Cannot remove primary ${part.role} part '${target}'. Replace the architecture through add/stack-update so compatibility and migration checks can run.`,
    );
  }

  const owner = part.ownerPartId
    ? parts.find((candidate) => candidate.id === part.ownerPartId)
    : undefined;
  const partProjection = stackPartsToLegacyProjectConfigPartial(owner ? [owner, part] : [part]);
  const remainingParts = parts.filter((candidate) => candidate.id !== part.id);
  const dependentParts = remainingParts.filter(
    (candidate) =>
      candidate.ownerPartId === part.ownerPartId &&
      part.role === "database" &&
      candidate.role === "orm",
  );
  if (dependentParts.length > 0) {
    throw new Error(
      `Cannot remove '${formatStackPartSpec(part, parts)}' while dependent part(s) remain: ${listTargets(dependentParts)}. Remove the dependent parts first.`,
    );
  }
  const remainingProjection = stackPartsToLegacyProjectConfigPartial(remainingParts);
  const request: Record<string, unknown> = {};
  const replaceArrayKeys = new Set<keyof ProjectConfig>();

  for (const [rawKey, projectedValue] of Object.entries(partProjection)) {
    const key = rawKey as keyof ProjectConfig;
    if (
      Array.isArray(projectedValue) &&
      (projectedValue as readonly unknown[]).includes(part.toolId)
    ) {
      const remainingValue = remainingProjection[key];
      const remaining = Array.isArray(remainingValue)
        ? remainingValue.filter((value) => value !== "none")
        : [];
      request[rawKey] = remaining.length > 0 ? remaining : ["none"];
      replaceArrayKeys.add(key);
      continue;
    }
    if (projectedValue === part.toolId) request[rawKey] = remainingProjection[key] ?? "none";
  }

  const configKeys = Object.keys(request).sort();
  if (configKeys.length === 0) {
    throw new Error(
      `Selected part '${formatStackPartSpec(part, parts)}' has no removable project-config projection.`,
    );
  }

  return {
    projectDir,
    request,
    replaceArrayKeys,
    stackPartsOverride: remainingParts,
    removal: {
      target,
      selectedPart: formatStackPartSpec(part, parts),
      configKeys,
    },
  };
}

function removalReviewToken(plan: StackUpdatePlan, removal: PartRemoval): string {
  return hashContent(
    JSON.stringify({
      projectDir: plan.projectDir,
      removal,
      planDigest: getStackUpdatePlanDigest(plan),
    }),
  );
}

export async function planPartRemoval(
  projectDirInput: string,
  target: string,
): Promise<PartRemovalResult> {
  let resolved: ResolvedRemoval;
  try {
    resolved = await resolveRemoval(projectDirInput, target);
  } catch (error) {
    return {
      success: false,
      projectDir: path.resolve(projectDirInput),
      error: error instanceof Error ? error.message : String(error),
    };
  }

  const plan = await planStackUpdate(resolved.projectDir, resolved.request, {
    replaceArrayKeys: resolved.replaceArrayKeys,
    removeObsoleteGeneratedArtifacts: true,
    stackPartsOverride: resolved.stackPartsOverride,
  });
  if (!plan.success) return plan;
  const applyAllowed = plan.manualReviewBlockers.length === 0;
  return {
    ...plan,
    lifecycle: { ...plan.lifecycle, operation: "remove" },
    removal: resolved.removal,
    applyAllowed,
    reviewToken: applyAllowed ? removalReviewToken(plan, resolved.removal) : undefined,
  };
}

export async function applyPartRemoval(
  projectDirInput: string,
  target: string,
  reviewToken: string | undefined,
  acknowledgeArchitectureChange = false,
): Promise<PartRemovalResult> {
  const reviewed = await planPartRemoval(projectDirInput, target);
  if (!reviewed.success) return reviewed;
  if (!reviewed.applyAllowed || !reviewed.reviewToken) {
    return {
      success: false,
      projectDir: reviewed.projectDir,
      error: `Manual review required before applying part removal: ${reviewed.manualReviewBlockers.join("; ")}`,
    };
  }
  if (!reviewToken || reviewToken !== reviewed.reviewToken) {
    return {
      success: false,
      projectDir: reviewed.projectDir,
      error: "The removal review token is missing or stale. Re-run the removal plan first.",
    };
  }

  const resolved = await resolveRemoval(projectDirInput, target);
  const applied = await applyStackUpdate(
    resolved.projectDir,
    {
      ...resolved.request,
      acknowledgeArchitectureChange,
    },
    {
      operation: "remove",
      replaceArrayKeys: resolved.replaceArrayKeys,
      removeObsoleteGeneratedArtifacts: true,
      stackPartsOverride: resolved.stackPartsOverride,
      expectedPlanDigest: getStackUpdatePlanDigest(reviewed),
    },
  );
  if (!applied.success) return applied;
  return {
    ...applied,
    removal: resolved.removal,
    applyAllowed: true,
    reviewToken,
  };
}
