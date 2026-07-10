// Creation path = HOW the agent is asked to build each project.
// - "prompt": hand-write from scratch, no Better-Fullstack tooling. THE DEFAULT —
//   the only path we run by default (raw model capability).
// - "mcp": drive the Better-Fullstack MCP server. Opt-in via `--paths mcp`.
// - "cli": map requirements to CLI flags. LEGACY — kept working, not default.
export type CreationPath = "prompt" | "mcp" | "cli";
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
  | "toolchain-missing"
  | "stack-unwired"
  | "validation-deferred";

export type RunOutcome = "success" | "model-failure" | "infra-inconclusive";

export type StrictMarker = {
  id: string;
  deps?: readonly string[];
  source?: readonly string[];
  text?: readonly string[];
  files?: readonly string[];
  forbiddenDeps?: readonly string[];
  forbiddenText?: readonly string[];
};

export type BenchmarkSpec = {
  id: string;
  title: string;
  lane: "core" | "extended";
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
  /** Whether Better-Fullstack can scaffold this stack. `false` marks a FRONTIER
   * spec (beyond BFS's option space): it defaults to prompt-only so the agent is
   * never scored as an MCP/CLI failure for a stack the tool cannot produce. */
  supportedByBetterFullstack: boolean;
  /** Creation paths this spec runs on, intersected with the run's `--paths`.
   * Defaults to all requested paths for a supported spec, or `["prompt"]` for a
   * frontier spec. Set explicitly to pin a spec to a subset. */
  paths?: readonly CreationPath[];
  requirements: readonly string[];
  naturalPrompt: string;
  rightLibraryNotes: readonly string[];
  canonicalFlags: readonly string[];
  expectedConfig?: Record<string, string | readonly string[]>;
  expectedParts?: readonly string[];
  expectedAddons?: readonly string[];
  strictMarkers: readonly StrictMarker[];
  /** Discovery-lane scoring: each capability maps to the set of libraries that
   * acceptably satisfy it (dep keys or source/text patterns). In the natural
   * prompt style a capability counts as satisfied if ANY accepted library is
   * wired, so a reasonable alternative (pgvector for semantic search) is not
   * penalised the way the strict canonical markers would. */
  acceptanceSets?: Record<string, readonly string[]>;
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
  /** True when the command binary itself could not be spawned (ENOENT) — an
   * environment problem, distinct from a child process that ran and exited
   * non-zero (e.g. a generated `bun run build` whose script is broken). */
  spawnError?: boolean;
  /**
   * How to read this step when scoring:
   * - "ran" (or absent): a real command executed — judge it by exitCode.
   * - "skip": a check that SHOULD have run but no tool was configured/detected.
   *   It is NOT a pass — it disqualifies a Full pass. Carries exitCode null so it
   *   can never be mistaken for a green (=== 0) run (the old `skippedStep` set
   *   exitCode 0, which silently passed missing lint/test — the Finding-1 bug).
   * - "na": the check is legitimately not applicable (e.g. a scaffold with
   *   genuinely zero tests). Excluded from scoring — neither pass nor fail.
   */
  status?: "ran" | "skip" | "na";
  durationMs: number;
  stdoutTail: string;
  stderrTail: string;
};

export type CommandResult = StepResult & {
  stdout: string;
  stderr: string;
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
  /** Project generation finished, but validation is intentionally queued for a
   * later phase. Deferred validation is excluded from the pass-rate denominator
   * until the runner validates the archived project. */
  deferred?: boolean;
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

export type StackScore = {
  matched: number;
  total: number;
  percent: number;
  misses: string[];
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
  claude: {
    exitCode: number | null;
    timedOut: boolean;
    durationMs: number;
    resultDurationMs?: number;
    outputTokens?: number;
    totalCostUsd?: number;
    sessionId?: string;
    terminalReason?: string;
  };
  validation: ProjectValidation;
  /** Primary "right libs" signal: libraries actually wired in the generated tree. */
  stackScore: StackScore;
  /** Assisted-path diagnostic: whether bts.jsonc echoes the requested stack. */
  generatorFaithfulness?: StackScore;
  /** Discovery-lane (natural prompt) capability-satisfaction score. */
  acceptanceScore?: StackScore;
  toolCompliance: ToolCompliance;
  failureTags: FailureTag[];
};

export type ScaffbenchOptions = {
  model: string;
  efforts: Effort[];
  paths: CreationPath[];
  specs: string[];
  repeats: number;
  outDir: string;
  maxBudgetUsd: string;
  skipValidation: boolean;
  generateOnly: boolean;
  validateExisting: boolean;
  forceRevalidate: boolean;
  qualityGate: boolean;
  doctorCheck: boolean;
  routeCheck: boolean;
  promptStyle: PromptStyle;
  listSpecs: boolean;
  writeMatrixOnly: boolean;
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
  /** Headline pass rate = CORE pass (install/build/typecheck/native compile).
   * Advisory polish checks do not affect it. */
  passRate: number;
  /** Stricter advisory tier (core + lint/format/test/doctor/route green).
   * A separate signal — it never demotes passRate, so a formatting failure is a
   * quality metric, not a brokenness verdict. */
  qualityPassCount: number;
  qualityPassRate: number;
  passCi95: { low: number; high: number };
  /** True when scoredRuns >= MIN_CI_RUNS, so the Wilson interval is worth showing. */
  ciReportable: boolean;
  /** Distinct specs contributing to this cell. */
  specCount: number;
  /** Mean of per-spec pass rates — a macro-average that treats each spec as one
   * unit instead of pooling heterogeneous-difficulty specs into one binomial. */
  macroPassRate: number;
  /** pass@k: specs solved on at least one of their repeats. */
  passAnySpecs: number;
  /** pass^k: specs solved on every one of their repeats (consistency). */
  passAllSpecs: number;
  stackPercent: number;
  faithfulnessPercent?: number;
  acceptancePercent?: number;
  commandDisciplinePercent: number;
  /** Single 0-100 composite (the rankable headline), weighted toward the least
   * saturated signal — see SCAFFBENCH_INDEX_WEIGHTS. */
  index: number;
  avgDurationMs: number;
  medianDurationMs: number;
  p95DurationMs: number;
  avgOutputTokens?: number;
  avgCostUsd?: number;
  failureTags: Record<string, number>;
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
