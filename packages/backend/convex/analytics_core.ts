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
