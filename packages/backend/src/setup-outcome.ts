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
