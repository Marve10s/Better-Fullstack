import { STACK_TOOL_DEFINITIONS } from "@better-fullstack/types/stack-graph";
import { sanitizeTelemetryMachineId } from "@better-fullstack/types/telemetry";

import { classifyProjectSetupOutcome } from "../convex/analytics_core";
import { extractStack, sanitizeIngestEnvelope } from "./telemetry-validation";

export const POSTHOG_HOSTS = ["https://eu.i.posthog.com", "https://us.i.posthog.com"] as const;

export function posthogHost(value: string | undefined) {
  return POSTHOG_HOSTS.find((host) => host === value?.replace(/\/$/, ""));
}

export function posthogEvent(
  body: Record<string, unknown>,
  options: {
    eventId: string;
    timestamp: number;
    historical?: boolean;
    page?: Record<string, string | number>;
  },
) {
  const envelope = sanitizeIngestEnvelope(body);
  const stack = extractStack(body);
  const { machineId, ...properties } = envelope;
  const eventType = envelope.eventType ?? "project_created";
  const anonymousId = sanitizeTelemetryMachineId(machineId);
  const selections = Array.isArray(stack.stackPartSelections) ? stack.stackPartSelections : [];
  const ecosystems = selections.length
    ? [
        ...new Set(
          selections
            .map((part) => part.split(":")[1])
            .filter((value) => value && value !== "universal"),
        ),
      ]
    : typeof stack.ecosystem === "string"
      ? stack.ecosystem.split(",")
      : [];

  const librarySelections = selections.length
    ? selections
    : STACK_TOOL_DEFINITIONS.flatMap((definition) => {
        const ecosystem = definition.ecosystems.find(
          (value) => value === "universal" || ecosystems.includes(value),
        );
        if (!definition.legacyCategory || !ecosystem || !definition.roles[0]) return [];
        const value = stack[definition.legacyCategory];
        const values = Array.isArray(value)
          ? value
          : typeof value === "string"
            ? value.split(",")
            : [];
        return values.includes(definition.toolId) && definition.toolId !== "none"
          ? [`${definition.roles[0]}:${ecosystem}:${definition.toolId}`]
          : [];
      });

  return {
    uuid: options.eventId,
    timestamp: new Date(options.timestamp).toISOString(),
    event:
      eventType === "web_action" && envelope.action
        ? envelope.action.replaceAll("-", "_")
        : eventType,
    properties: {
      ...stack,
      ...properties,
      ...options.page,
      eventType,
      ecosystems,
      library_selections: [...new Set(librarySelections)].slice(0, 256),
      distinct_id: anonymousId ?? `unattributed:${options.eventId}`,
      identity_quality: anonymousId ? "anonymous-device" : "unattributed",
      setup_outcome: classifyProjectSetupOutcome({
        ...envelope,
        eventType,
        install: typeof stack.install === "boolean" ? stack.install : undefined,
      }),
      telemetry_schema: 2,
      historical_import: options.historical ?? false,
      $process_person_profile: false,
      $geoip_disable: true,
      $ip: null,
    },
  };
}

export type PostHogEvent = ReturnType<typeof posthogEvent>;

export async function capturePosthog(
  events: PostHogEvent[],
  options: { host: string; token: string; historical?: boolean; signal?: AbortSignal },
) {
  const host = posthogHost(options.host);
  if (!host) throw new Error("Unsupported PostHog ingestion host");
  const response = await fetch(`${host}/batch/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: options.token,
      batch: events,
      historical_migration: options.historical ?? false,
    }),
    signal: options.signal ?? AbortSignal.timeout(5_000),
  });
  if (!response.ok) throw new Error(`PostHog capture returned HTTP ${response.status}`);
}
