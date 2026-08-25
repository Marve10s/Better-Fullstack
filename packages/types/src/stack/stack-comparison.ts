import type { StackPart } from "@/config/types";

import { formatStackPartSpec } from "@/stack/stack-graph";

export type StackPartEvidenceSnapshot = {
  level: string;
  maturity?: string;
  freshness?: string;
};

export type StackPartComparisonSnapshot = Pick<
  StackPart,
  | "id"
  | "role"
  | "ecosystem"
  | "toolId"
  | "ownerPartId"
  | "source"
  | "providedByPartId"
  | "targetPath"
  | "settings"
> & {
  spec: string;
  ownerSpec?: string;
  evidence?: StackPartEvidenceSnapshot;
};

export type StackPartReplacement = {
  before: StackPartComparisonSnapshot;
  after: StackPartComparisonSnapshot;
};

export type StackPartOwnerChange = StackPartReplacement & {
  beforeOwnerId: string | null;
  afterOwnerId: string | null;
};

export type StackPartEvidenceChange = StackPartReplacement & {
  beforeEvidence: StackPartEvidenceSnapshot | null;
  afterEvidence: StackPartEvidenceSnapshot | null;
};

export type StackGraphComparison = {
  additions: StackPartComparisonSnapshot[];
  removals: StackPartComparisonSnapshot[];
  replacements: StackPartReplacement[];
  ownerChanges: StackPartOwnerChange[];
  evidenceChanges: StackPartEvidenceChange[];
  unchanged: number;
  hasChanges: boolean;
};

export type StackGraphComparisonOptions = {
  evidenceForPart?: (part: StackPart) => StackPartEvidenceSnapshot | null | undefined;
};

type MatchedPart = { before: StackPart; after: StackPart };

function selectedParts(parts: readonly StackPart[]): StackPart[] {
  return parts.filter((part) => part.toolId !== "none");
}

function primaryPart(part: StackPart): boolean {
  return !part.ownerPartId;
}

function ownerSpec(part: StackPart, parts: readonly StackPart[]): string | undefined {
  if (!part.ownerPartId) return undefined;
  const owner = parts.find((candidate) => candidate.id === part.ownerPartId);
  return owner ? formatStackPartSpec(owner, parts) : part.ownerPartId;
}

function snapshot(
  part: StackPart,
  parts: readonly StackPart[],
  options: StackGraphComparisonOptions,
): StackPartComparisonSnapshot {
  const evidence = options.evidenceForPart?.(part) ?? undefined;
  return {
    id: part.id,
    role: part.role,
    ecosystem: part.ecosystem,
    toolId: part.toolId,
    ownerPartId: part.ownerPartId,
    source: part.source,
    providedByPartId: part.providedByPartId,
    targetPath: part.targetPath,
    settings: part.settings,
    spec: formatStackPartSpec(part, parts),
    ownerSpec: ownerSpec(part, parts),
    evidence,
  };
}

function evidenceKey(value: StackPartEvidenceSnapshot | null | undefined): string {
  return JSON.stringify(value ?? null);
}

function canonicalValue(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalValue);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(
    Object.entries(value)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, entry]) => [key, canonicalValue(entry)]),
  );
}

function persistedPartKey(part: StackPart): string {
  return JSON.stringify(
    canonicalValue({
      id: part.id,
      role: part.role,
      ecosystem: part.ecosystem,
      toolId: part.toolId,
      source: part.source,
      providedByPartId: part.providedByPartId ?? null,
      targetPath: part.targetPath ?? null,
      settings: part.settings ?? null,
    }),
  );
}

function sortSnapshots<T extends StackPartComparisonSnapshot>(values: T[]): T[] {
  return values.sort((left, right) => left.spec.localeCompare(right.spec));
}

function pairByExactId(
  before: readonly StackPart[],
  after: readonly StackPart[],
  matches: MatchedPart[],
  consumedBefore: Set<string>,
  consumedAfter: Set<string>,
): void {
  const afterById = new Map(after.map((part) => [part.id, part] as const));
  for (const part of before) {
    const candidate = afterById.get(part.id);
    if (!candidate || consumedAfter.has(candidate.id)) continue;
    matches.push({ before: part, after: candidate });
    consumedBefore.add(part.id);
    consumedAfter.add(candidate.id);
  }
}

function pairUniquePrimaryRoles(
  before: readonly StackPart[],
  after: readonly StackPart[],
  matches: MatchedPart[],
  consumedBefore: Set<string>,
  consumedAfter: Set<string>,
): void {
  const roles = new Set([
    ...before.filter(primaryPart).map((part) => part.role),
    ...after.filter(primaryPart).map((part) => part.role),
  ]);

  for (const role of roles) {
    const beforeCandidates = before.filter(
      (part) => primaryPart(part) && part.role === role && !consumedBefore.has(part.id),
    );
    const afterCandidates = after.filter(
      (part) => primaryPart(part) && part.role === role && !consumedAfter.has(part.id),
    );
    if (beforeCandidates.length === 1 && afterCandidates.length === 1) {
      const beforePart = beforeCandidates[0];
      const afterPart = afterCandidates[0];
      if (!beforePart || !afterPart) continue;
      matches.push({ before: beforePart, after: afterPart });
      consumedBefore.add(beforePart.id);
      consumedAfter.add(afterPart.id);
      continue;
    }

    for (const beforePart of beforeCandidates) {
      const candidates = afterCandidates.filter(
        (afterPart) =>
          !consumedAfter.has(afterPart.id) &&
          ((beforePart.targetPath && beforePart.targetPath === afterPart.targetPath) ||
            (beforePart.ecosystem === afterPart.ecosystem &&
              beforePart.toolId === afterPart.toolId)),
      );
      if (candidates.length !== 1) continue;
      const afterPart = candidates[0];
      if (!afterPart) continue;
      matches.push({ before: beforePart, after: afterPart });
      consumedBefore.add(beforePart.id);
      consumedAfter.add(afterPart.id);
    }
  }
}

function pairOwnedParts(
  before: readonly StackPart[],
  after: readonly StackPart[],
  matches: MatchedPart[],
  consumedBefore: Set<string>,
  consumedAfter: Set<string>,
): void {
  const ownerReplacements = new Map(
    matches
      .filter((match) => primaryPart(match.before) && primaryPart(match.after))
      .map((match) => [match.before.id, match.after.id] as const),
  );

  const expectedOwner = (part: StackPart) =>
    part.ownerPartId ? (ownerReplacements.get(part.ownerPartId) ?? part.ownerPartId) : undefined;

  for (const beforePart of before) {
    if (!beforePart.ownerPartId || consumedBefore.has(beforePart.id)) continue;
    const candidates = after.filter(
      (afterPart) =>
        !consumedAfter.has(afterPart.id) &&
        afterPart.ownerPartId === expectedOwner(beforePart) &&
        afterPart.role === beforePart.role &&
        afterPart.ecosystem === beforePart.ecosystem &&
        afterPart.toolId === beforePart.toolId &&
        afterPart.source === beforePart.source,
    );
    if (candidates.length !== 1) continue;
    const afterPart = candidates[0];
    if (!afterPart) continue;
    matches.push({ before: beforePart, after: afterPart });
    consumedBefore.add(beforePart.id);
    consumedAfter.add(afterPart.id);
  }

  const slotKeys = new Set(
    before
      .filter((part) => part.ownerPartId && !consumedBefore.has(part.id))
      .map((part) => `${expectedOwner(part)}:${part.role}:${part.source}`),
  );
  for (const slotKey of slotKeys) {
    const beforeCandidates = before.filter(
      (part) =>
        part.ownerPartId !== undefined &&
        !consumedBefore.has(part.id) &&
        `${expectedOwner(part)}:${part.role}:${part.source}` === slotKey,
    );
    const afterCandidates = after.filter(
      (part) =>
        part.ownerPartId !== undefined &&
        !consumedAfter.has(part.id) &&
        `${part.ownerPartId}:${part.role}:${part.source}` === slotKey,
    );
    if (beforeCandidates.length !== 1 || afterCandidates.length !== 1) continue;
    const beforePart = beforeCandidates[0];
    const afterPart = afterCandidates[0];
    if (!beforePart || !afterPart) continue;
    matches.push({ before: beforePart, after: afterPart });
    consumedBefore.add(beforePart.id);
    consumedAfter.add(afterPart.id);
  }
}

export function compareStackGraphs(
  beforeInput: readonly StackPart[],
  afterInput: readonly StackPart[],
  options: StackGraphComparisonOptions = {},
): StackGraphComparison {
  const before = selectedParts(beforeInput);
  const after = selectedParts(afterInput);
  const matches: MatchedPart[] = [];
  const consumedBefore = new Set<string>();
  const consumedAfter = new Set<string>();

  pairByExactId(before, after, matches, consumedBefore, consumedAfter);
  pairUniquePrimaryRoles(before, after, matches, consumedBefore, consumedAfter);
  pairOwnedParts(before, after, matches, consumedBefore, consumedAfter);

  const replacements: StackPartReplacement[] = [];
  const ownerChanges: StackPartOwnerChange[] = [];
  const evidenceChanges: StackPartEvidenceChange[] = [];
  let unchanged = 0;

  for (const match of matches) {
    const beforeSnapshot = snapshot(match.before, before, options);
    const afterSnapshot = snapshot(match.after, after, options);
    const pair = { before: beforeSnapshot, after: afterSnapshot };
    const replaced = persistedPartKey(match.before) !== persistedPartKey(match.after);
    const ownerChanged = (match.before.ownerPartId ?? null) !== (match.after.ownerPartId ?? null);
    const beforeEvidence = options.evidenceForPart?.(match.before) ?? null;
    const afterEvidence = options.evidenceForPart?.(match.after) ?? null;
    const evidenceChanged = evidenceKey(beforeEvidence) !== evidenceKey(afterEvidence);

    if (replaced) replacements.push(pair);
    if (ownerChanged) {
      ownerChanges.push({
        ...pair,
        beforeOwnerId: match.before.ownerPartId ?? null,
        afterOwnerId: match.after.ownerPartId ?? null,
      });
    }
    if (evidenceChanged) {
      evidenceChanges.push({ ...pair, beforeEvidence, afterEvidence });
    }
    if (!replaced && !ownerChanged && !evidenceChanged) unchanged += 1;
  }

  const additions = sortSnapshots(
    after
      .filter((part) => !consumedAfter.has(part.id))
      .map((part) => snapshot(part, after, options)),
  );
  const removals = sortSnapshots(
    before
      .filter((part) => !consumedBefore.has(part.id))
      .map((part) => snapshot(part, before, options)),
  );
  replacements.sort((left, right) => left.before.spec.localeCompare(right.before.spec));
  ownerChanges.sort((left, right) => left.before.spec.localeCompare(right.before.spec));
  evidenceChanges.sort((left, right) => left.before.spec.localeCompare(right.before.spec));

  return {
    additions,
    removals,
    replacements,
    ownerChanges,
    evidenceChanges,
    unchanged,
    hasChanges:
      additions.length > 0 ||
      removals.length > 0 ||
      replacements.length > 0 ||
      ownerChanges.length > 0 ||
      evidenceChanges.length > 0,
  };
}
