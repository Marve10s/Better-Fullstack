import fs from "fs-extra";
import path from "node:path";

import type { ProjectConfig, StackPart } from "../../types";

import {
  createStackPart,
  formatStackPartSpec,
  legacyProjectConfigToStackParts,
  parseStackPartSpecs,
  stackPartsToLegacyProjectConfigPartial,
} from "../../types";
import { readBtsConfig } from "../../utils/bts-config";
import { createReviewToken } from "../../utils/review-token";
import {
  applyStackUpdate,
  getStackUpdatePlanDigest,
  planStackUpdate,
  type StackUpdatePlan,
  type StackUpdateResult,
} from "./stack-update";

const PRIMARY_ROLES = new Set<StackPart["role"]>(["frontend", "backend", "mobile", "database"]);

export type PrimaryRoleReplacement = {
  target: string;
  replacement: string;
  before: string;
  after: string;
  rewiredDependentParts: string[];
  configKeys: string[];
};

export type PrimaryRoleReplacementPlan = StackUpdatePlan & {
  primaryReplacement: PrimaryRoleReplacement;
  applyAllowed: boolean;
  reviewToken?: string;
};

export type PrimaryRoleReplacementResult =
  | PrimaryRoleReplacementPlan
  | Extract<StackUpdateResult, { success: false }>;

type ResolvedReplacement = {
  projectDir: string;
  request: Record<string, unknown>;
  replaceArrayKeys: ReadonlySet<keyof ProjectConfig>;
  stackPartsOverride: readonly StackPart[];
  primaryReplacement: PrimaryRoleReplacement;
};

function selectedParts(config: Awaited<ReturnType<typeof readBtsConfig>>): StackPart[] {
  if (!config) return [];
  const parts = config.stackParts ?? legacyProjectConfigToStackParts(config);
  return parts.filter((part) => part.source !== "provided" && part.toolId !== "none");
}

function listTargets(parts: readonly StackPart[]): string {
  return parts
    .filter((part) => !part.ownerPartId && PRIMARY_ROLES.has(part.role))
    .map((part) => formatStackPartSpec(part, parts))
    .sort()
    .join(", ");
}

function replacementRequest(
  before: readonly StackPart[],
  after: readonly StackPart[],
): { request: Record<string, unknown>; replaceArrayKeys: Set<keyof ProjectConfig> } {
  const beforeProjection = stackPartsToLegacyProjectConfigPartial(before);
  const afterProjection = stackPartsToLegacyProjectConfigPartial(after);
  const request: Record<string, unknown> = {};
  const replaceArrayKeys = new Set<keyof ProjectConfig>();
  const keys = new Set([...Object.keys(beforeProjection), ...Object.keys(afterProjection)]);

  for (const rawKey of keys) {
    if (rawKey === "stackParts") continue;
    const key = rawKey as keyof ProjectConfig;
    const beforeValue = beforeProjection[key];
    const afterValue = afterProjection[key];
    if (JSON.stringify(beforeValue) === JSON.stringify(afterValue)) continue;
    if (Array.isArray(beforeValue) || Array.isArray(afterValue)) {
      request[rawKey] = Array.isArray(afterValue) && afterValue.length > 0 ? afterValue : ["none"];
      replaceArrayKeys.add(key);
    } else {
      request[rawKey] = afterValue ?? "none";
    }
  }

  return { request, replaceArrayKeys };
}

async function resolvePrimaryRoleReplacement(
  projectDirInput: string,
  target: string,
  replacementSpec: string,
): Promise<ResolvedReplacement> {
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
      `Replacement target '${target}' ${detail}. Use one exact selected Primary Role part: ${listTargets(parts)}`,
    );
  }
  const current = matches[0];
  if (!current || current.ownerPartId || !PRIMARY_ROLES.has(current.role)) {
    throw new Error(
      `Replacement target '${target}' is not a Primary Role. Use add/remove for Capability Roles.`,
    );
  }

  let parsedReplacement: StackPart[];
  try {
    parsedReplacement = parseStackPartSpecs([replacementSpec], "selected");
  } catch (error) {
    throw new Error(
      `Invalid replacement '${replacementSpec}': ${error instanceof Error ? error.message : String(error)}`,
      { cause: error },
    );
  }
  const replacement = parsedReplacement.find((part) => part.source === "selected");
  if (
    !replacement ||
    replacement.ownerPartId ||
    !PRIMARY_ROLES.has(replacement.role) ||
    parsedReplacement.filter((part) => part.source === "selected").length !== 1
  ) {
    throw new Error("The replacement must contain exactly one Primary Role Stack Part.");
  }
  if (replacement.role !== current.role) {
    throw new Error(
      `Cannot replace Primary Role '${current.role}' with '${replacement.role}'. Replace it with another ${current.role} part.`,
    );
  }
  if (replacement.ecosystem === current.ecosystem && replacement.toolId === current.toolId) {
    throw new Error(`Primary Role '${formatStackPartSpec(current, parts)}' is already selected.`);
  }

  const currentCanonicalId = createStackPart({
    role: current.role,
    ecosystem: current.ecosystem,
    toolId: current.toolId,
  }).id;
  const explicitReplacementId = replacementSpec.split(":")[3];
  const nextCanonicalId = createStackPart({
    role: current.role,
    ecosystem: replacement.ecosystem,
    toolId: replacement.toolId,
  }).id;
  const expectedReplacementId = current.id === currentCanonicalId ? nextCanonicalId : current.id;
  if (explicitReplacementId && explicitReplacementId !== expectedReplacementId) {
    throw new Error(
      current.id === currentCanonicalId
        ? `Replacement ID '${explicitReplacementId}' does not match the canonical ID '${nextCanonicalId}'. Omit the ID or use the canonical value.`
        : `Replacement must preserve the existing stable ID '${current.id}', not '${explicitReplacementId}'.`,
    );
  }
  const replacementId = expectedReplacementId;
  if (parts.some((part) => part.id === replacementId && part.id !== current.id)) {
    throw new Error(`Replacement would duplicate the existing Stack Part ID '${replacementId}'.`);
  }

  const dependents = parts.filter((part) => part.ownerPartId === current.id);
  const incompatibleDependents = dependents.filter(
    (part) => part.ecosystem !== "universal" && part.ecosystem !== replacement.ecosystem,
  );
  if (incompatibleDependents.length > 0) {
    throw new Error(
      `Automatic cross-ecosystem replacement stops at owner-scoped capabilities: ${incompatibleDependents
        .map((part) => formatStackPartSpec(part, parts))
        .sort()
        .join(
          ", ",
        )}. Remove or replace those capabilities first so their code and data migration can be reviewed explicitly.`,
    );
  }

  const nextPrimary: StackPart = {
    ...current,
    id: replacementId,
    ecosystem: replacement.ecosystem,
    toolId: replacement.toolId,
    source: "selected",
  };
  const nextParts = parts.map((part) => {
    if (part.id === current.id) return nextPrimary;
    if (part.ownerPartId === current.id) return { ...part, ownerPartId: replacementId };
    return part;
  });
  const { request, replaceArrayKeys } = replacementRequest(parts, nextParts);
  const before = formatStackPartSpec(current, parts);
  const after = formatStackPartSpec(nextPrimary, nextParts);
  return {
    projectDir,
    request,
    replaceArrayKeys,
    stackPartsOverride: nextParts,
    primaryReplacement: {
      target,
      replacement: replacementSpec,
      before,
      after,
      rewiredDependentParts: dependents.map((part) => formatStackPartSpec(part, parts)).sort(),
      configKeys: Object.keys(request).sort(),
    },
  };
}

function replacementReviewToken(
  plan: StackUpdatePlan,
  replacement: PrimaryRoleReplacement,
): string {
  return createReviewToken("primary-role-replacement", {
    projectDir: plan.projectDir,
    replacement,
    planDigest: getStackUpdatePlanDigest(plan),
  });
}

export async function planPrimaryRoleReplacement(
  projectDirInput: string,
  target: string,
  replacementSpec: string,
): Promise<PrimaryRoleReplacementResult> {
  let resolved: ResolvedReplacement;
  try {
    resolved = await resolvePrimaryRoleReplacement(projectDirInput, target, replacementSpec);
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
    lifecycle: { ...plan.lifecycle, operation: "replace" },
    primaryReplacement: resolved.primaryReplacement,
    applyAllowed,
    reviewToken: applyAllowed
      ? replacementReviewToken(plan, resolved.primaryReplacement)
      : undefined,
  };
}

export async function applyPrimaryRoleReplacement(
  projectDirInput: string,
  target: string,
  replacementSpec: string,
  reviewToken: string | undefined,
  acknowledgeArchitectureChange = false,
): Promise<PrimaryRoleReplacementResult> {
  const reviewed = await planPrimaryRoleReplacement(projectDirInput, target, replacementSpec);
  if (!reviewed.success) return reviewed;
  if (!reviewed.applyAllowed || !reviewed.reviewToken) {
    return {
      success: false,
      projectDir: reviewed.projectDir,
      error: `Manual review required before applying Primary Role replacement: ${reviewed.manualReviewBlockers.join("; ")}`,
    };
  }
  if (!reviewToken || reviewToken !== reviewed.reviewToken) {
    return {
      success: false,
      projectDir: reviewed.projectDir,
      error:
        "The Primary Role replacement review token is missing or stale. Re-run the replacement plan first.",
    };
  }

  const resolved = await resolvePrimaryRoleReplacement(projectDirInput, target, replacementSpec);
  const applied = await applyStackUpdate(
    resolved.projectDir,
    { ...resolved.request, acknowledgeArchitectureChange },
    {
      operation: "replace",
      replaceArrayKeys: resolved.replaceArrayKeys,
      removeObsoleteGeneratedArtifacts: true,
      stackPartsOverride: resolved.stackPartsOverride,
      expectedPlanDigest: getStackUpdatePlanDigest(reviewed),
    },
  );
  if (!applied.success) return applied;
  return {
    ...applied,
    lifecycle: { ...applied.lifecycle, operation: "replace" },
    primaryReplacement: resolved.primaryReplacement,
    applyAllowed: true,
    reviewToken,
  };
}
