import {
  sanitizeTelemetryAction,
  sanitizeTelemetryCiProvider,
  sanitizeTelemetryCliVersion,
  sanitizeTelemetryErrorName,
  sanitizeTelemetryExecutionRuntime,
  sanitizeTelemetryFailureReason,
  sanitizeTelemetryFailureStage,
  sanitizeTelemetryMachineId,
  sanitizeTelemetryMode,
  sanitizeTelemetryNodeVersion,
  sanitizeTelemetryPlatform,
  sanitizeTelemetrySetupFailures,
  sanitizeTelemetryStackDimension,
  TELEMETRY_STACK_DIMENSION_KEYS,
  type TelemetryStackValue,
} from "@better-fullstack/types/telemetry";

// Envelope fields handled explicitly (not part of the stack config).
const META_KEYS = new Set([
  "eventtype",
  "source",
  "client",
  "action",
  "status",
  "mode",
  "machineid",
  "success",
  "errorname",
  "error_name",
  "failurestage",
  "failurereason",
  "failure_stage",
  "failure_reason",
  "stage",
  "reason",
  "setupfailures",
  "durationms",
  "duration_ms",
  "archivebytes",
  "archive_bytes",
  "filecount",
  "changedfilecount",
  "capabilitycount",
  "conflictcount",
  "manualreviewcount",
  "warningcount",
  "issuecount",
  "retry",
  "ci",
  "ciprovider",
  "executionruntime",
  "cli_version",
  "node_version",
  "platform",
  "options",
]);

// Never store these even if a client sends them (potential PII / paths).
const BLOCKED_KEYS = new Set([
  "projectname",
  "projectdir",
  "relativepath",
  "targetdir",
  "workspaceroot",
  "name",
  "brief",
  "prompt",
  "sourcecode",
  "content",
  "code",
  "message",
  "error",
  "path",
  "file",
  "filename",
  "files",
  "env",
  "environment",
  "envkey",
  "envvalue",
  "log",
  "logs",
  "secret",
  "secrets",
  "token",
  "apikey",
  "url",
]);

export const TELEMETRY_STACK_KEYS: ReadonlySet<string> = new Set(TELEMETRY_STACK_DIMENSION_KEYS);

const MAX_STACK_KEYS = 256;
export const MAX_PAYLOAD_BYTES = 64 * 1024;
const MAX_VALUE_LENGTH = 100;
const IDENTIFIER_PATTERN = /^[A-Za-z0-9][A-Za-z0-9_.:+,-]{0,99}$/;
export const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export function sanitizeTelemetryIdentifier(value: string): string | undefined {
  const trimmed = value.trim();
  if (trimmed.length > MAX_VALUE_LENGTH) return undefined;
  return IDENTIFIER_PATTERN.test(trimmed) ? trimmed : undefined;
}

function stackDimensionEntries(body: Record<string, unknown>) {
  const explicitStack =
    body.stack && typeof body.stack === "object" && !Array.isArray(body.stack)
      ? (body.stack as Record<string, unknown>)
      : {};
  return [...Object.entries(body), ...Object.entries(explicitStack)].filter(([key]) => {
    const normalizedKey = key.toLowerCase();
    return (
      !META_KEYS.has(normalizedKey) &&
      !BLOCKED_KEYS.has(normalizedKey) &&
      TELEMETRY_STACK_KEYS.has(key)
    );
  });
}

export function hasInvalidStackValues(body: Record<string, unknown>) {
  if (
    body.stack !== undefined &&
    (!body.stack || typeof body.stack !== "object" || Array.isArray(body.stack))
  )
    return true;
  return stackDimensionEntries(body).some(
    ([key, value]) => sanitizeTelemetryStackDimension(key, value) === undefined,
  );
}

export function extractStack(body: Record<string, unknown>): Record<string, TelemetryStackValue> {
  const stack: Record<string, TelemetryStackValue> = {};
  for (const [key, value] of stackDimensionEntries(body)) {
    if (Object.keys(stack).length >= MAX_STACK_KEYS) break;
    const sanitized = sanitizeTelemetryStackDimension(key, value);
    if (sanitized !== undefined) stack[key] = sanitized;
  }
  return stack;
}

const oneOf = <T extends string>(value: unknown, allowed: readonly T[]): T | undefined =>
  typeof value === "string" && allowed.includes(value as T) ? (value as T) : undefined;
const bool = (value: unknown): boolean | undefined =>
  typeof value === "boolean" ? value : undefined;
const num = (value: unknown): number | undefined =>
  typeof value === "number" && Number.isFinite(value) && value >= 0
    ? Math.min(Math.round(value), 86_400_000)
    : undefined;
const EVENT_TYPES = [
  "project_created",
  "feature_added",
  "stack_updated",
  "command_used",
  "web_action",
] as const;
const EVENT_STATUSES = ["started", "succeeded", "failed", "cancelled"] as const;
const EVENT_CLIENTS = ["cli", "web"] as const;
const EVENT_SOURCES = [
  "cli-interactive",
  "cli-flags",
  "mcp",
  "programmatic",
  "web-builder",
] as const;

export function sanitizeIngestEnvelope(body: Record<string, unknown>) {
  return {
    eventType: oneOf(body.eventType, EVENT_TYPES),
    source: oneOf(body.source, EVENT_SOURCES),
    client: oneOf(body.client, EVENT_CLIENTS),
    action: sanitizeTelemetryAction(body.action),
    status: oneOf(body.status, EVENT_STATUSES),
    mode: sanitizeTelemetryMode(body.mode),
    machineId: sanitizeTelemetryMachineId(body.machineId),
    success: bool(body.success),
    errorName: sanitizeTelemetryErrorName(body.errorName ?? body.error_name),
    failureStage: sanitizeTelemetryFailureStage(
      body.failureStage ?? body.failure_stage ?? body.stage,
    ),
    failureReason: sanitizeTelemetryFailureReason(
      body.failureReason ?? body.failure_reason ?? body.reason,
    ),
    setupFailures: sanitizeTelemetrySetupFailures(body.setupFailures),
    durationMs: num(body.durationMs ?? body.duration_ms),
    archiveBytes: num(body.archiveBytes ?? body.archive_bytes),
    fileCount: num(body.fileCount),
    changedFileCount: num(body.changedFileCount),
    capabilityCount: num(body.capabilityCount),
    conflictCount: num(body.conflictCount),
    manualReviewCount: num(body.manualReviewCount),
    warningCount: num(body.warningCount),
    issueCount: num(body.issueCount),
    retry: bool(body.retry),
    ci: bool(body.ci),
    ciProvider: sanitizeTelemetryCiProvider(body.ciProvider),
    executionRuntime: sanitizeTelemetryExecutionRuntime(body.executionRuntime),
    cli_version: sanitizeTelemetryCliVersion(body.cli_version),
    node_version: sanitizeTelemetryNodeVersion(body.node_version),
    platform: sanitizeTelemetryPlatform(body.platform),
  };
}

export function invalidExplicitValue(value: unknown, sanitized: unknown): boolean {
  return value !== undefined && sanitized === undefined;
}

export function hasInvalidEnvelopeValues(body: Record<string, unknown>) {
  const envelope = sanitizeIngestEnvelope(body);
  if (Object.entries(envelope).some(([key, value]) => invalidExplicitValue(body[key], value)))
    return true;
  const aliases = {
    error_name: "errorName",
    failure_stage: "failureStage",
    stage: "failureStage",
    failure_reason: "failureReason",
    reason: "failureReason",
    duration_ms: "durationMs",
    archive_bytes: "archiveBytes",
  } as const;
  return Object.entries(aliases).some(
    ([alias, canonical]) =>
      body[alias] !== undefined &&
      sanitizeIngestEnvelope({ [alias]: body[alias] })[canonical] === undefined,
  );
}
