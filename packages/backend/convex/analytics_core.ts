export type Distribution = Record<string, number>;

export type ProjectSetupOutcome =
  | "complete"
  | "incomplete"
  | "generation-only"
  | "not-requested"
  | "unknown";

type ProjectSetupEvent = {
  eventType?: string;
  success?: boolean;
  source?: string;
  install?: boolean;
  setupFailures?: readonly string[];
};

/**
 * Classify successful project-generation events without pretending that MCP
 * generation or an explicit `--no-install` ran the local setup pipeline.
 */
export function classifyProjectSetupOutcome(
  event: ProjectSetupEvent,
): ProjectSetupOutcome | undefined {
  const isProjectCreation = event.eventType === undefined || event.eventType === "project_created";
  if (!isProjectCreation || event.success === false) return undefined;
  if (event.source === "mcp") return "generation-only";
  if (event.setupFailures && event.setupFailures.length > 0) return "incomplete";
  if (event.install === false) return "not-requested";
  if (event.setupFailures === undefined) return "unknown";
  return "complete";
}

export type FailureAggregates = {
  failureStages: Distribution;
  failureReasons: Distribution;
  actionFailureStages: Distribution;
  actionFailureReasons: Distribution;
};

type FailureEvent = {
  action?: string;
  success?: boolean;
  failureStage?: string;
  failureReason?: string;
};

function increment(distribution: Distribution, key: string | undefined): void {
  if (!key) return;
  distribution[key] = (distribution[key] ?? 0) + 1;
}

export function applyFailureClassifications(stats: FailureAggregates, event: FailureEvent): void {
  if (event.success !== false) return;

  increment(stats.failureStages, event.failureStage);
  increment(stats.failureReasons, event.failureReason);
  if (event.action && event.failureStage) {
    increment(stats.actionFailureStages, `${event.action}:${event.failureStage}`);
  }
  if (event.action && event.failureReason) {
    increment(stats.actionFailureReasons, `${event.action}:${event.failureReason}`);
  }
}

export function countReturningMachinesFromActivity(
  activity: readonly { date: string; machineId: string }[],
): number {
  const datesByMachine = new Map<string, Set<string>>();
  for (const event of activity) {
    const dates = datesByMachine.get(event.machineId) ?? new Set<string>();
    dates.add(event.date);
    datesByMachine.set(event.machineId, dates);
  }
  return [...datesByMachine.values()].filter((dates) => dates.size > 1).length;
}

const DECISION_STAGES = new Set(["discover", "evaluate", "plan", "create"]);
const SELECTION_OUTCOMES = new Set([
  "track-applied",
  "incompatibility-recovered",
  "plan-abandoned",
  "create-completed",
  "create-failed",
  "handoff-completed",
]);
const EVIDENCE_LEVELS = new Set(["listed", "generated", "build-verified", "runtime-verified"]);
export const TELEMETRY_STARTER_TRACKS: ReadonlySet<string> = new Set([
  "saas-app",
  "ai-agent-app",
  "rest-api",
  "java-api",
  "rust-backend",
  "mobile-app",
  "internal-tool",
]);
const SELECTION_PROBLEMS = new Set([
  "none",
  "discoverability",
  "missing-capability",
  "compatibility",
  "reliability",
]);
const SELECTION_ACTIONS = new Set([
  "builder-starter-track-applied",
  "builder-incompatibility-recovered",
  "builder-plan-abandoned",
  "builder-command-copied",
  "builder-zip-downloaded",
  "builder-run-ready",
]);

type SelectionDecisionEvent = {
  eventType?: string;
  action?: string;
  status?: string;
  success?: boolean;
  stack?: Record<string, string | boolean | string[]>;
};

function boundedStackValue(
  event: SelectionDecisionEvent,
  key: string,
  allowed: ReadonlySet<string>,
) {
  const value = event.stack?.[key];
  return typeof value === "string" && allowed.has(value) ? value : undefined;
}

export type SelectionDecisionClassification = {
  eligible: boolean;
  covered: boolean;
  decisionStage?: string;
  selectionOutcome?: string;
  evidenceLevel?: string;
  starterTrack?: string;
  selectionProblem?: string;
};

export function classifySelectionDecision(
  event: SelectionDecisionEvent,
): SelectionDecisionClassification {
  const isTerminal = event.status !== "started";
  const isProjectCompletion =
    (event.eventType === undefined || event.eventType === "project_created") && isTerminal;
  const isFailedCreateCommand =
    (event.action === "create" || event.action === "bfs_create_project") &&
    isTerminal &&
    event.status !== "succeeded";
  const eligible =
    isProjectCompletion ||
    isFailedCreateCommand ||
    (isTerminal && SELECTION_ACTIONS.has(event.action ?? ""));
  if (!eligible) return { eligible: false, covered: false };

  const decisionStage = boundedStackValue(event, "decision_stage", DECISION_STAGES);
  const explicitOutcome = boundedStackValue(event, "selection_outcome", SELECTION_OUTCOMES);
  const selectionOutcome =
    explicitOutcome ??
    (isProjectCompletion
      ? event.success === false
        ? "create-failed"
        : "create-completed"
      : isFailedCreateCommand
        ? "create-failed"
        : undefined);
  const evidenceLevel = boundedStackValue(event, "selected_evidence_level", EVIDENCE_LEVELS);
  const selectionProblem = boundedStackValue(event, "selection_problem", SELECTION_PROBLEMS);
  const starterTrack = boundedStackValue(event, "starter_track", TELEMETRY_STARTER_TRACKS);
  const needsProblem =
    selectionOutcome === "plan-abandoned" || selectionOutcome === "create-failed";
  const covered = Boolean(
    decisionStage && selectionOutcome && evidenceLevel && (!needsProblem || selectionProblem),
  );

  return {
    eligible,
    covered,
    decisionStage,
    selectionOutcome,
    evidenceLevel,
    starterTrack,
    selectionProblem,
  };
}

const CLI_LIFECYCLE_ACTIONS = new Set([
  "add",
  "adopt",
  "check",
  "doctor",
  "gen",
  "history",
  "recovery",
  "registry",
  "remove",
  "replace",
  "status",
  "update",
]);
const MCP_DISCOVERY_OR_CREATE_ACTIONS = new Set([
  "bfs_get_guidance",
  "bfs_get_schema",
  "bfs_list_presets",
  "bfs_list_starter_tracks",
  "bfs_recommend_stack",
  "bfs_check_compatibility",
  "bfs_get_capability_evidence",
  "bfs_plan_project",
  "bfs_create_project",
]);

export function isLifecycleTerminalEvent(event: { action?: string; status?: string }): boolean {
  if (!event.action || !["succeeded", "failed", "cancelled"].includes(event.status ?? "")) {
    return false;
  }
  if (CLI_LIFECYCLE_ACTIONS.has(event.action)) return true;
  return event.action.startsWith("bfs_") && !MCP_DISCOVERY_OR_CREATE_ACTIONS.has(event.action);
}
