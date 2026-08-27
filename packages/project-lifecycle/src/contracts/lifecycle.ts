export const LIFECYCLE_CONTRACT_VERSION = "2" as const;
export const SUPPORTED_LIFECYCLE_CONTRACT_VERSIONS = [LIFECYCLE_CONTRACT_VERSION] as const;

export type LifecycleOperation =
  | "create"
  | "add"
  | "remove"
  | "replace"
  | "doctor-fix"
  | "stack-update"
  | "template-update"
  | "gen"
  | "registry-add"
  | "recover";

export type LifecycleStatus =
  | "planned"
  | "applied"
  | "blocked"
  | "failed"
  | "rolled-back"
  | "recovered";

export type LifecycleVersions = {
  cli: string;
  generator: string;
  templateSet: string;
  schema: string;
};

export type LifecycleChangeSummary = {
  added: number;
  patched: number;
  merged: number;
  removed: number;
  manual: number;
};

export type LifecycleRecovery = {
  available: boolean;
  transactionId?: string;
  command?: string;
  automaticRollback?: boolean;
};

export type LifecycleAffectedFile = {
  path: string;
  action: "create" | "update" | "merge" | "remove";
  stackPartId?: string;
};

export type LifecycleDependencyChange = {
  name: string;
  action: "add" | "update" | "remove";
  version?: string;
  target?: string;
  dev?: boolean;
};

export type LifecycleCompatibilityDecision = {
  code: string;
  message: string;
  alternatives: string[];
};

export type LifecycleCheck = {
  id: string;
  status: "pass" | "warn" | "fail" | "pending";
  message?: string;
};

export type LifecycleSideEffect = {
  kind: "filesystem" | "package-manager" | "toolchain";
  status: "planned" | "applied" | "failed" | "restored" | "manual" | "not-run";
  description: string;
  compensatingAction?: string;
};

export type LifecycleAffected = {
  stackParts: string[];
  files: LifecycleAffectedFile[];
  dependencies: LifecycleDependencyChange[];
};

export type LifecycleHistory = {
  recorded: boolean;
  recoveryId?: string;
};

export type LifecycleResult = {
  contractVersion: typeof LIFECYCLE_CONTRACT_VERSION;
  operation: LifecycleOperation;
  status: LifecycleStatus;
  projectDir: string;
  changes: LifecycleChangeSummary;
  warnings: string[];
  blockers: string[];
  provenance: {
    source: LifecycleVersions | null;
    target: LifecycleVersions | null;
    verified: boolean;
  };
  recovery: LifecycleRecovery;
  affected: LifecycleAffected;
  compatibilityDecisions: LifecycleCompatibilityDecision[];
  manualReviewReasons: string[];
  checks: LifecycleCheck[];
  sideEffects: LifecycleSideEffect[];
  history: LifecycleHistory;
  nextActions: string[];
};

export type LifecyclePlan = Omit<LifecycleResult, "status" | "history"> & {
  status: "planned" | "blocked";
  review: {
    required: boolean;
    token?: string;
  };
  preconditions: LifecycleCheck[];
};

export const EMPTY_LIFECYCLE_CHANGES: LifecycleChangeSummary = {
  added: 0,
  patched: 0,
  merged: 0,
  removed: 0,
  manual: 0,
};

export const EMPTY_LIFECYCLE_AFFECTED: LifecycleAffected = {
  stackParts: [],
  files: [],
  dependencies: [],
};

export function lifecycleResult(
  input: Omit<
    LifecycleResult,
    | "contractVersion"
    | "changes"
    | "warnings"
    | "blockers"
    | "affected"
    | "compatibilityDecisions"
    | "manualReviewReasons"
    | "checks"
    | "sideEffects"
    | "history"
    | "nextActions"
  > & {
    changes?: Partial<LifecycleChangeSummary>;
    warnings?: string[];
    blockers?: string[];
    affected?: Partial<LifecycleAffected>;
    compatibilityDecisions?: LifecycleCompatibilityDecision[];
    manualReviewReasons?: string[];
    checks?: LifecycleCheck[];
    sideEffects?: LifecycleSideEffect[];
    history?: LifecycleHistory;
    nextActions?: string[];
  },
): LifecycleResult {
  return {
    contractVersion: LIFECYCLE_CONTRACT_VERSION,
    ...input,
    changes: { ...EMPTY_LIFECYCLE_CHANGES, ...input.changes },
    warnings: input.warnings ?? [],
    blockers: input.blockers ?? [],
    affected: {
      stackParts: input.affected?.stackParts ?? [],
      files: input.affected?.files ?? [],
      dependencies: input.affected?.dependencies ?? [],
    },
    compatibilityDecisions: input.compatibilityDecisions ?? [],
    manualReviewReasons: input.manualReviewReasons ?? input.blockers ?? [],
    checks: input.checks ?? [],
    sideEffects: input.sideEffects ?? [],
    history: input.history ?? { recorded: false },
    nextActions: input.nextActions ?? [],
  };
}

export function lifecyclePlan(
  input: Omit<
    LifecyclePlan,
    | "contractVersion"
    | "changes"
    | "warnings"
    | "blockers"
    | "compatibilityDecisions"
    | "manualReviewReasons"
  > & {
    changes?: Partial<LifecycleChangeSummary>;
    warnings?: string[];
    blockers?: string[];
    compatibilityDecisions?: LifecycleCompatibilityDecision[];
    manualReviewReasons?: string[];
  },
): LifecyclePlan {
  const result = lifecycleResult({
    ...input,
    history: { recorded: false },
  });
  return {
    ...result,
    status: input.status,
    review: input.review,
    preconditions: input.preconditions,
  };
}
