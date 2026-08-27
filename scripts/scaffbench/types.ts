export type CreationPath = "prompt" | "mcp";
export type Effort = "default" | "low" | "medium" | "high" | "xhigh" | "max";
export type PromptStyle = "explicit" | "natural";
export type CommandStatus = "pass" | "fail" | "unknown" | "skipped";
export type FailureTag =
  | "claude-error"
  | "claude-timeout"
  | "command-discipline"
  | "doctor-failed"
  | "format-failed"
  | "install-failed"
  | "lint-failed"
  | "project-not-found"
  | "route-failed"
  | "stack-mismatch"
  | "test-failed"
  | "tool-violation"
  | "typecheck-failed"
  | "validation-failed"
  | "build-failed"
  | "budget-exhausted"
  | "deadline-exhausted"
  | "timeout-progressing"
  | "timeout-stuck"
  | "provider-infra"
  | "harness-infra"
  | "validation-infra"
  | "toolchain-missing"
  | "stack-unwired"
  | "validation-deferred";

export type RunOutcome =
  | "success"
  | "skipped"
  | "model-failure"
  | "provider-infra"
  | "harness-infra"
  | "validation-infra"
  | "budget-exhausted"
  | "deadline-exhausted";

export type RunOutcomeRollup = "success" | "model-failure" | "infra-inconclusive";
export type TimeoutProgress = "timeout-progressing" | "timeout-stuck";
export type PublicationEligibility = "ranked" | "exploratory";

export type StrictMarker = {
  id: string;
  explicitOnly?: boolean;
  deps?: readonly string[];
  source?: readonly string[];
  text?: readonly string[];
  textAny?: readonly string[];
  files?: readonly string[];
  forbiddenDeps?: readonly string[];
  forbiddenText?: readonly string[];
  forbiddenFiles?: readonly string[];
};

export type PrerequisiteCommand = {
  command: readonly string[];
  whenConfigFound?: readonly string[];
};

export type SpecDifficulty = 1 | 2 | 3;

export type BenchmarkSpec = {
  id: string;
  introducedAt: string;
  title: string;
  lane: "core" | "extended";
  difficulty: SpecDifficulty;
  family:
    | "typescript"
    | "rust"
    | "python"
    | "go"
    | "dotnet"
    | "java"
    | "elixir"
    | "react-native"
    | "multi-ecosystem";
  supportedByBetterFullstack: boolean;
  paths?: readonly CreationPath[];
  requirements: readonly string[];
  naturalPrompt: string;
  rightLibraryNotes: readonly string[];
  canonicalFlags: readonly string[];
  expectedConfig?: Record<string, string | readonly string[]>;
  expectedParts?: readonly string[];
  expectedAddons?: readonly string[];
  strictMarkers: readonly StrictMarker[];
  acceptanceSets?: Record<string, readonly string[]>;
  timeoutMultiplier?: number;
  prerequisiteCommands?: readonly PrerequisiteCommand[];
  validationProfile: {
    packageManager?: "bun";
    native?: readonly ("cargo" | "dotnet" | "go" | "python" | "java" | "elixir")[];
    qualityGate?: boolean;
    doctorCheck?: boolean;
    routeCheckCandidate?: boolean;
  };
};

export type StepResult = {
  command: string;
  exitCode: number | null;
  timedOut: boolean;
  spawnError?: boolean;
  spawnErrorCode?: string;
  transientNetwork?: boolean;
  retryCount?: number;
  status?: "ran" | "skip" | "na";
  durationMs: number;
  stdoutTail: string;
  stderrTail: string;
};

export type CommandResult = StepResult & {
  stdout: string;
  stderr: string;
  timeoutKind?: "hard" | "idle";
  timeoutProgress?: TimeoutProgress;
  startedAtMs?: number;
  lastActivityAtMs?: number;
  lastStdoutActivityAtMs?: number;
  lastStderrActivityAtMs?: number;
  lastProgressActivityAtMs?: number;
};

export type CommandDisciplineCheck = {
  id: string;
  status: CommandStatus;
  detail: string;
};

export type ToolCompliance = {
  score: number;
  total: number;
  checks: CommandDisciplineCheck[];
};

export type ProjectValidation = {
  projectExists: boolean;
  qualityGateRequested?: boolean;
  deferred?: boolean;
  skipped?: boolean;
  sourceHash?: string;
  cacheKey?: string;
  cacheHit?: boolean;
  steps: Record<string, StepResult | undefined>;
  install?: StepResult;
  build?: StepResult;
  checkTypes?: StepResult;
  lint?: StepResult;
  format?: StepResult;
  test?: StepResult;
  doctor?: StepResult;
  route?: StepResult;
};

export type AgentRunAccounting = {
  exitCode: number | null;
  timedOut: boolean;
  durationMs: number;
  resultDurationMs?: number;
  outputTokens?: number;
  totalCostUsd?: number;
  sessionId?: string;
  terminalReason?: string;
  spawnError?: boolean;
  spawnErrorCode?: string;
  timeoutKind?: "hard" | "idle";
  timeoutProgress?: TimeoutProgress;
  stderrTail?: string;
};

export type BudgetPolicy = {
  budgetEnforced: boolean;
  maxBudgetUsd: number;
};

export type RunProvenance = {
  suiteVersion: string;
  harnessVersion: string;
  validationCacheVersion: number;
  promptVersion: string;
  resourceProfileId?: string;
  agentAdapter: string;
  configuredTrials: number;
  specOrderSeed: number;
};

export type TopUpRecord = {
  trials: number;
  specs: string[];
  recordedAt: string;
};

export type RunProtocol = {
  repeats: number;
  seed: number;
  topUps?: TopUpRecord[];
};

export type OutcomeEvidence = {
  budgetEstimated?: true;
};

export type RepairResult = {
  attemptedAt: string;
  failingStep: string;
  prompt: string;
  claude: AgentRunAccounting;
  validation: ProjectValidation;
  stackScore: StackScore;
  outcome: RunOutcome;
  outcomeEvidence?: OutcomeEvidence;
  failureTags: FailureTag[];
};

export type StackScore = {
  matched: number;
  total: number;
  percent: number;
  misses: string[];
};

export type CodeMetrics = {
  files: number;
  lines: number;
  bytes: number;
};

export type RunResult = {
  id: string;
  specId: string;
  specTitle: string;
  model: string;
  effort: Effort;
  effectiveReasoning?: string;
  path: CreationPath;
  trial: number;
  promptStyle: PromptStyle;
  runDir: string;
  projectName: string;
  projectDir: string | null;
  codeMetrics?: CodeMetrics;
  claude: AgentRunAccounting;
  outcome?: RunOutcome;
  outcomeEvidence?: OutcomeEvidence;
  budgetPolicy?: BudgetPolicy;
  provenance?: RunProvenance;
  validation: ProjectValidation;
  stackScore: StackScore;
  generatorFaithfulness?: StackScore;
  acceptanceScore?: StackScore;
  toolCompliance: ToolCompliance;
  failureTags: FailureTag[];
  repair?: RepairResult;
};

export type ScaffbenchOptions = {
  command?: "run" | "calibrate";
  model: string;
  efforts: Effort[];
  paths: CreationPath[];
  specs: string[];
  repeats: number;
  topUp?: number;
  outDir: string;
  maxBudgetUsd: string;
  skipValidation: boolean;
  generateOnly: boolean;
  validateExisting: boolean;
  forceRevalidate: boolean;
  qualityGate: boolean;
  noQualityGate?: boolean;
  doctorCheck: boolean;
  routeCheck: boolean;
  promptStyle: PromptStyle;
  listSpecs: boolean;
  writeMatrixOnly: boolean;
  repair?: boolean;
};

export type SummaryAggregate = {
  key: string;
  specId?: string;
  model: string;
  effort: Effort;
  effectiveReasoning?: string;
  path: CreationPath;
  runs: number;
  scoredRuns: number;
  inconclusiveCount: number;
  passCount: number;
  passRate: number;
  qualityPassCount: number;
  qualityScoredRuns: number;
  qualityPassRate: number;
  passCi95: { low: number; high: number };
  ciReportable: boolean;
  specCount: number;
  macroPassRate: number;
  passAnySpecs: number;
  passAllSpecs: number;
  stackPercent: number;
  faithfulnessPercent?: number;
  acceptancePercent?: number;
  commandDisciplinePercent: number;
  index: number;
  specScore: number;
  avgDurationMs: number;
  medianDurationMs: number;
  p95DurationMs: number;
  avgOutputTokens?: number;
  avgCostUsd?: number;
  avgLines: number | null;
  failureTags: Record<string, number>;
  outcomeCounts: Partial<Record<RunOutcome, number>>;
  publicationEligibility: PublicationEligibility;
};

export type ScaffbenchSummary = {
  harnessVersion: string;
  generatedAt: string;
  options: Omit<ScaffbenchOptions, "listSpecs" | "writeMatrixOnly">;
  metadata: Record<string, unknown>;
  specs: BenchmarkSpec[];
  aggregates: {
    bySpecCell: SummaryAggregate[];
    leaderboard: SummaryAggregate[];
  };
  results: RunResult[];
};

export type ProjectIndex = {
  dependencies: Set<string>;
  files: Set<string>;
  packageText: string;
  sourceText: string;
  configText: string;
  allText: string;
};
