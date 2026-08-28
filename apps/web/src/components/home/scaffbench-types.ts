/** Harness a run went through. Drives the harness label, not the row's brand. */
export type ScaffbenchHarness = "claude" | "codex" | "opencode" | "kilo" | "agy" | "pi";

/** Lab that trained the model. Drives the row logomark and bar color. */
export type ScaffbenchVendor =
  | "anthropic"
  | "openai"
  | "google"
  | "zai"
  | "moonshot"
  | "deepseek"
  | "qwen"
  | "xai"
  | "meta"
  | "mistral";

export type ScaffbenchModel = {
  /** "<model>|<effort>" - joins a model to its cells. */
  key: string;
  model: string;
  effort: string;
  effectiveReasoning: string;
  harness: ScaffbenchHarness;
  vendor: ScaffbenchVendor;
  label: string;
  /** overall ScaffBench Index across all scored cells - the group sort key. */
  sortIndex: number;
  /** "ranked" needs >=3 consistent trials per cell. */
  eligibility: "ranked" | "exploratory";
};

export type ScaffbenchCell = {
  modelKey: string;
  spec: string;
  /** false when the run was infra-inconclusive - excluded from every rate. */
  scored: boolean;
  /** installs, builds, type-checks, compiles. */
  corePass: boolean;
  /** core plus lint and format green; tests are reported, not scored. */
  fullPass: boolean;
  /** share of the spec's required libraries actually wired into the project. */
  wiredPct: number;
  /** graded spec score, 0-100: 0.6 core pass + 0.2 lint/format share + 0.2 wired.
   *  null when the run predates the graded index. */
  score: number | null;
  cmdPct: number;
  trials: number;
  scoredTrials: number;
  passCount: number;
  qualityPassCount: number;
  /** lines the model wrote, lockfiles and binaries excluded. */
  lines: number | null;
  costUsd: number | null;
  outTokens: number | null;
  /** tool steps in the trajectory; null when the harness did not record them. */
  steps: number | null;
  durationMs: number | null;
};

/** Free tier is decided by the model id, never by a measured $0: subscription
 *  adapters (opencode-go/*) also report zero cost for paid models. */
export function isFreeModel(model: Pick<ScaffbenchModel, "model">): boolean {
  return /(?:-free|:free)$/i.test(model.model);
}
