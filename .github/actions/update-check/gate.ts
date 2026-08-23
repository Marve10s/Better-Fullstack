import { createHash } from "node:crypto";
import path from "node:path";

export type JsonRecord = Record<string, unknown>;

export type UpdateGateEvaluation = {
  eligible: boolean;
  hasChanges: boolean;
  reviewToken: string | null;
  actionablePaths: string[];
  reasons: string[];
  planSha256: string;
  verification: {
    complete: boolean;
    expectedTargets: number;
    executedTargets: number;
    failedTargets: number;
  };
};

export function asRecord(value: unknown): JsonRecord {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as JsonRecord)
    : {};
}

function sortedJsonValue(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortedJsonValue);
  const valueRecord = asRecord(value);
  if (Object.keys(valueRecord).length === 0) return value;
  return Object.fromEntries(
    Object.entries(valueRecord)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, entry]) => [key, sortedJsonValue(entry)]),
  );
}

export function canonicalJson(value: unknown): string {
  return JSON.stringify(sortedJsonValue(value));
}

export function sha256(value: string | Buffer): string {
  return createHash("sha256").update(value).digest("hex");
}

function stringArray(value: unknown): string[] {
  return Array.isArray(value) && value.every((entry) => typeof entry === "string") ? value : [];
}

function verificationSummary(check: JsonRecord) {
  const verification = asRecord(check.verification);
  return {
    complete: verification.complete === true,
    expectedTargets:
      typeof verification.expectedTargets === "number" ? verification.expectedTargets : 0,
    executedTargets:
      typeof verification.executedTargets === "number" ? verification.executedTargets : 0,
    failedTargets: typeof verification.failedTargets === "number" ? verification.failedTargets : 0,
  };
}

function validateActionablePaths(paths: string[]): string[] {
  return paths.filter(
    (filePath) =>
      filePath.length === 0 ||
      path.posix.isAbsolute(filePath) ||
      path.win32.isAbsolute(filePath) ||
      filePath.split(/[\\/]/).includes(".."),
  );
}

export function evaluateUpdateGate(input: {
  status: JsonRecord;
  firstPlan: JsonRecord;
  check: JsonRecord;
  secondPlan: JsonRecord;
  worktreeCleanAfterCheck: boolean;
}): UpdateGateEvaluation {
  const reasons: string[] = [];
  const support = asRecord(input.status.updateSupport);
  const upgrade = asRecord(input.status.upgrade);
  const verification = verificationSummary(input.check);
  const conflicts = stringArray(input.secondPlan.conflicts);
  const manual = Array.isArray(input.secondPlan.manual) ? input.secondPlan.manual : [];
  const removed = stringArray(input.secondPlan.removed);
  const actionablePaths = stringArray(input.secondPlan.actionable);
  const reviewToken =
    typeof input.secondPlan.reviewToken === "string" &&
    /^[0-9a-f]{64}$/.test(input.secondPlan.reviewToken)
      ? input.secondPlan.reviewToken
      : null;
  const firstCanonical = canonicalJson(input.firstPlan);
  const secondCanonical = canonicalJson(input.secondPlan);

  if (input.status.success !== true || input.status.ok !== true) {
    reasons.push("Project status is not healthy.");
  }
  if (support.eligible !== true || support.requiresManualReview !== false) {
    reasons.push("The shared update policy requires manual review.");
  }
  if (upgrade.applyAllowed !== true) {
    reasons.push("The shared project report does not allow automatic apply.");
  }
  if (
    input.firstPlan.ok !== true ||
    input.secondPlan.ok !== true ||
    input.secondPlan.guarantee !== "verified-manifest-v2-recoverable"
  ) {
    reasons.push("The update plan lacks verified manifest-v2 recovery guarantees.");
  }
  if (!reviewToken) reasons.push("The update plan did not issue a valid review token.");
  if (conflicts.length > 0) reasons.push("The update plan contains conflicts.");
  if (manual.length > 0) reasons.push("The update plan contains manual-review files.");
  if (removed.length > 0) reasons.push("The update plan contains retained template removals.");
  if (firstCanonical !== secondCanonical) {
    reasons.push("The plan changed across the executable project check.");
  }
  if (
    input.check.success !== true ||
    input.check.ok !== true ||
    !verification.complete ||
    verification.expectedTargets === 0 ||
    verification.executedTargets !== verification.expectedTargets ||
    verification.failedTargets !== 0
  ) {
    reasons.push("The executable project check did not complete every target successfully.");
  }
  if (!input.worktreeCleanAfterCheck) {
    reasons.push("The executable project check changed tracked or untracked project files.");
  }
  const unsafePaths = validateActionablePaths(actionablePaths);
  if (unsafePaths.length > 0) {
    reasons.push(`The plan contains unsafe actionable paths: ${unsafePaths.join(", ")}.`);
  }

  return {
    eligible: reasons.length === 0,
    hasChanges: actionablePaths.length > 0,
    reviewToken,
    actionablePaths,
    reasons,
    planSha256: sha256(secondCanonical),
    verification,
  };
}

export function expectedChangedPaths(
  projectDirectory: string,
  actionablePaths: string[],
): string[] {
  const prefix = projectDirectory === "." ? "" : `${projectDirectory.replace(/\\/g, "/")}/`;
  return [
    ...actionablePaths.map((filePath) => `${prefix}${filePath}`),
    `${prefix}bts.lock.json`,
  ].sort();
}

export function unexpectedChangedPaths(actualPaths: string[], expectedPaths: string[]): string[] {
  const expected = new Set(expectedPaths);
  return actualPaths.filter(
    (filePath) =>
      !expected.has(filePath) &&
      !filePath.includes("/.bts/recovery/") &&
      !filePath.startsWith(".bts/recovery/"),
  );
}
