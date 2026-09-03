/**
 * Public Fixproof board data. Everything here is safe to publish: a task is only
 * an id, a category, a difficulty tier and whether it came from a private or a
 * public repository. Statements, repositories and file paths stay sealed.
 *
 * The shape is written for N models and N tasks even though the first dry run
 * has one model and ten tasks.
 */

export type FixproofOutcome =
  | "solved"
  | "model-failure"
  | "deadline-exhausted"
  | "provider-infra"
  | "pending";

export type FixproofSource = "private" | "public";
/** Per-requirement outcome; "na" means the requirement was already green at base or untested, so it is excluded. */
export type FixproofRequirementResult = "pass" | "fail" | "na";

export type FixproofCategoryId =
  | "port"
  | "contract"
  | "library-semantics"
  | "concurrency"
  | "bug"
  | "effect-ts";

/** Category display names are dataset labels, not UI chrome, so they live here. */
export interface FixproofCategory {
  id: FixproofCategoryId;
  label: string;
}

export interface FixproofTask {
  id: string;
  category: FixproofCategoryId;
  /** Difficulty tier used to weight both indexes. */
  difficulty: number;
  source: FixproofSource;
  /** Hidden checks the task is graded on. */
  requirements: number;
  /** Weight of each requirement in the progress share: 2 core, 1 normal, 0.5 peripheral. */
  requirementWeights: readonly number[];
}

export interface FixproofRun {
  task: string;
  outcome: FixproofOutcome;
  /** Weighted share of the task's requirements that went from failing to passing, 0..1: sum of weights of "pass" over sum of weights of "pass" and "fail". */
  progress: number | null;
  /** One entry per requirement, in the task's requirement order. */
  requirementResults: readonly FixproofRequirementResult[] | null;
  /** "passed/total" over every check the harness ran. */
  checks: string | null;
  agentSeconds: number | null;
  regressions: boolean | null;
  testEditsReverted: number;
  claimedNotDone: boolean;
}

export interface FixproofModel {
  id: string;
  label: string;
  effort: string;
  provider: string;
  harness: string;
  runDate: string;
  trials: number;
  /** Tasks with a recorded, countable result. */
  graded: number;
  resolved: number;
  /** Difficulty-weighted, 0..100. */
  resolvedIndex: number;
  /** Difficulty-weighted, 0..100. */
  progressIndex: number;
  medianAgentSeconds: number;
  regressions: number;
  testEditsReverted: number;
  claimedNotDone: number;
  infraExcluded: number;
  pending: number;
  runs: readonly FixproofRun[];
}

export interface FixproofProtocol {
  agentTimeoutMinutes: number;
  trialsPerTask: number;
  historyHidden: boolean;
  spoilerDocsStripped: boolean;
  agentTestEditsReverted: boolean;
  indexWeighting: "difficulty";
}

export interface FixproofBoard {
  version: string;
  /** Which dry run this board reports. */
  dryRun: number;
  generatedAt: string;
  protocol: FixproofProtocol;
  categories: readonly FixproofCategory[];
  tasks: readonly FixproofTask[];
  models: readonly FixproofModel[];
}

export const FIXPROOF_BOARD: FixproofBoard = {
  version: "0.1-dryrun",
  dryRun: 1,
  generatedAt: "2026-09-03",
  protocol: {
    agentTimeoutMinutes: 30,
    trialsPerTask: 1,
    historyHidden: true,
    spoilerDocsStripped: true,
    agentTestEditsReverted: true,
    indexWeighting: "difficulty",
  },
  categories: [
    { id: "port", label: "Port" },
    { id: "contract", label: "Contract" },
    { id: "library-semantics", label: "Library semantics" },
    { id: "concurrency", label: "Concurrency" },
    { id: "bug", label: "Bug" },
    { id: "effect-ts", label: "Effect TS" },
  ],
  tasks: [
    { id: "T01", category: "port", difficulty: 9, source: "private", requirements: 3, requirementWeights: [2, 1, 0.5] },
    { id: "T02", category: "contract", difficulty: 9, source: "private", requirements: 2, requirementWeights: [2, 1] },
    { id: "T03", category: "library-semantics", difficulty: 9, source: "private", requirements: 6, requirementWeights: [2, 2, 2, 2, 1, 1] },
    { id: "T04", category: "concurrency", difficulty: 9, source: "private", requirements: 4, requirementWeights: [2, 1, 1, 0.5] },
    { id: "T05", category: "bug", difficulty: 9, source: "private", requirements: 3, requirementWeights: [2, 0.5, 1] },
    { id: "T06", category: "concurrency", difficulty: 9, source: "private", requirements: 4, requirementWeights: [2, 1, 1, 1] },
    { id: "T07", category: "effect-ts", difficulty: 9, source: "private", requirements: 3, requirementWeights: [2, 2, 2] },
    { id: "T08", category: "concurrency", difficulty: 9, source: "private", requirements: 6, requirementWeights: [2, 2, 1, 1, 2, 1] },
    { id: "T09", category: "effect-ts", difficulty: 8, source: "private", requirements: 3, requirementWeights: [2, 1, 0.5] },
    { id: "T10", category: "concurrency", difficulty: 9, source: "public", requirements: 5, requirementWeights: [1, 2, 0.5, 1, 1] },
  ],
  models: [
    {
      id: "gemini-3.8-flash|low",
      label: "Gemini 3.8 Flash",
      effort: "Low",
      provider: "Google",
      harness: "Antigravity CLI",
      runDate: "2026-09-03",
      trials: 1,
      graded: 6,
      resolved: 1,
      resolvedIndex: 17,
      progressIndex: 35,
      medianAgentSeconds: 1652,
      regressions: 0,
      testEditsReverted: 5,
      claimedNotDone: 2,
      infraExcluded: 1,
      pending: 3,
      runs: [
        {
          task: "T01",
          requirementResults: ["pass", "fail", "pass"],
          outcome: "model-failure",
          progress: 0.71,
          checks: "151/152",
          agentSeconds: 1442,
          regressions: false,
          testEditsReverted: 2,
          claimedNotDone: true,
        },
        {
          task: "T02",
          requirementResults: ["pass", "pass"],
          outcome: "solved",
          progress: 1,
          checks: "1/1",
          agentSeconds: 1736,
          regressions: false,
          testEditsReverted: 1,
          claimedNotDone: false,
        },
        {
          task: "T03",
          requirementResults: ["fail", "fail", "fail", "pass", "pass", "pass"],
          outcome: "model-failure",
          progress: 0.4,
          checks: "24/28",
          agentSeconds: 1228,
          regressions: false,
          testEditsReverted: 2,
          claimedNotDone: false,
        },
        {
          task: "T04",
          requirementResults: ["fail", "fail", "na", "na"],
          outcome: "model-failure",
          progress: 0,
          checks: "1/2",
          agentSeconds: 1661,
          regressions: false,
          testEditsReverted: 0,
          claimedNotDone: false,
        },
        {
          task: "T05",
          requirementResults: ["fail", "fail", "na"],
          outcome: "deadline-exhausted",
          progress: 0,
          checks: "1/2",
          agentSeconds: 1804,
          regressions: null,
          testEditsReverted: 0,
          claimedNotDone: false,
        },
        {
          task: "T06",
          requirementResults: ["fail", "na", "fail", "na"],
          outcome: "provider-infra",
          progress: 0,
          checks: "1/3",
          agentSeconds: 439,
          regressions: false,
          testEditsReverted: 0,
          claimedNotDone: false,
        },
        {
          task: "T07",
          requirementResults: null,
          outcome: "pending",
          progress: null,
          checks: null,
          agentSeconds: null,
          regressions: false,
          testEditsReverted: 0,
          claimedNotDone: false,
        },
        {
          task: "T08",
          requirementResults: null,
          outcome: "pending",
          progress: null,
          checks: null,
          agentSeconds: null,
          regressions: false,
          testEditsReverted: 0,
          claimedNotDone: false,
        },
        {
          task: "T09",
          requirementResults: null,
          outcome: "pending",
          progress: null,
          checks: null,
          agentSeconds: null,
          regressions: false,
          testEditsReverted: 0,
          claimedNotDone: false,
        },
        {
          task: "T10",
          requirementResults: ["fail", "fail", "fail", "fail", "fail"],
          outcome: "model-failure",
          progress: 0,
          checks: "0/7",
          agentSeconds: 1642,
          regressions: false,
          testEditsReverted: 0,
          claimedNotDone: true,
        },
      ],
    },
  ],
};
