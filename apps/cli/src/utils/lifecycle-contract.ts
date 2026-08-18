export type LifecycleOperation =
  | "create"
  | "add"
  | "remove"
  | "stack-update"
  | "template-update"
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

export type LifecycleResult = {
  contractVersion: "1";
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
  nextActions: string[];
};

export const EMPTY_LIFECYCLE_CHANGES: LifecycleChangeSummary = {
  added: 0,
  patched: 0,
  merged: 0,
  removed: 0,
  manual: 0,
};

export function lifecycleResult(
  input: Omit<
    LifecycleResult,
    "contractVersion" | "changes" | "warnings" | "blockers" | "nextActions"
  > & {
    changes?: Partial<LifecycleChangeSummary>;
    warnings?: string[];
    blockers?: string[];
    nextActions?: string[];
  },
): LifecycleResult {
  return {
    contractVersion: "1",
    ...input,
    changes: { ...EMPTY_LIFECYCLE_CHANGES, ...input.changes },
    warnings: input.warnings ?? [],
    blockers: input.blockers ?? [],
    nextActions: input.nextActions ?? [],
  };
}
