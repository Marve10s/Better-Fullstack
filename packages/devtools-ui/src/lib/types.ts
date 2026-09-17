// Minimal views of the lifecycle payloads the panel renders. The full shapes
// live in apps/cli/src/mcp/mcp-lifecycle-output-schemas.ts; the raw payload is
// always available through the JSON view.

export type Check = { label: string; status: "pass" | "warn" | "fail"; detail?: string };

export type Target = {
  id: string;
  role: string;
  toolId: string;
  status: "pass" | "fail";
  executed: boolean;
  toolchain: string;
  executedCommands: string[];
  reason: string;
};

export type StatusReport = {
  success: boolean;
  projectDir: string;
  ok: boolean;
  error?: string;
  ecosystem?: string;
  graphSummary?: string;
  stackPartSpecs?: string[];
  summary?: Record<string, number>;
  checks?: Check[];
  targets?: Target[];
  verification?: {
    complete: boolean;
    expectedTargets: number;
    executedTargets: number;
    failedTargets: number;
  };
  prerequisites?: {
    manifest: { present: boolean; state: string; version?: string };
    wave1: { ready: boolean; generatorProvenance: string; recovery: string; blockers: string[] };
  };
  updateSupport?: {
    eligibility: string;
    reason: string;
    supportedFrom: string | null;
    supportedTo: string | null;
  };
  upgrade?: {
    available: boolean;
    actionable: boolean;
    applyAllowed: boolean;
    summary?: Record<string, number>;
    blockers: string[];
    error?: string;
  };
};

export type UpdatePlan = {
  success: boolean;
  error?: string;
  blockers?: string[];
  reviewToken?: string;
  applyAllowed?: boolean;
  requiresUnprovenManifestV1Acknowledgement?: boolean;
  guarantee?: string;
  plan?: {
    files: { path: string; classification?: string; action?: string }[];
    drift: string[];
    userEdited: string[];
    conflicts: string[];
    merged: string[];
    newFiles: string[];
    removed: string[];
    actionable: string[];
    manual: { path: string }[];
  };
  applied?: { patched: string[]; added: string[]; merged: string[] };
  recoveryId?: string;
};

export type ConfigRepair = {
  success: boolean;
  mode?: "plan" | "applied";
  changed?: boolean;
  changes?: { path: string; action: string; reason: string }[];
  reviewToken?: string;
  recoveryId?: string;
  error?: string;
};

export type RecoveryPoint = {
  id: string;
  valid: boolean;
  recoverable: boolean;
  operation?: string;
  status?: string;
  createdAt?: string;
  fileCount?: number;
  errors: string[];
};

export type RecoveryManagement = {
  success: boolean;
  action: string;
  error?: string;
  points?: RecoveryPoint[];
  verification?: { id: string; valid: boolean; recoverable: boolean; errors: string[] };
  prune?: {
    applied: boolean;
    candidates: string[];
    pruned: string[];
    retained: string[];
    reviewToken?: string;
  };
};

export type RecoveryResult = {
  success: boolean;
  error?: string;
  transaction?: { id: string; status: string };
};

export type RecipeHistory = {
  success: boolean;
  recipes: {
    recipeId: string;
    name: string;
    adapterId: string;
    persistent: boolean;
    recoveryPoints: { id: string; valid: boolean; operation?: string; createdAt?: string }[];
  }[];
};

export type ContextPart = {
  id: string;
  spec: string;
  role: string;
  toolId: string;
  evidence: { level: string; maturity: string; freshness: string; limitation: string } | null;
};

export type ProjectContext = {
  project: {
    ecosystem: string;
    packageManager: string;
    workspaceShape: string;
    currentCliVersion: string;
  };
  roles: ContextPart[];
  capabilities: ContextPart[];
  compatibility: { valid: boolean; issues: { code: string; message: string }[] };
  commands?: { id: string; command: string }[];
  safeNextActions?: { id: string; command: string; reason: string }[];
};
