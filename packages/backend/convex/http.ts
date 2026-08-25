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
import { httpRouter } from "convex/server";

import { internal } from "@/_generated/api";
import { httpAction } from "@/_generated/server";
import { getTelemetryDashboardAccess } from "@/analytics_access";

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
const MAX_PAYLOAD_BYTES = 64 * 1024;
const MAX_VALUE_LENGTH = 100;
const IDENTIFIER_PATTERN = /^[A-Za-z0-9][A-Za-z0-9_.:+,-]{0,99}$/;
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};
const PRIVATE_JSON_HEADERS = {
  "Cache-Control": "private, no-store",
  "Content-Type": "application/json; charset=utf-8",
  Vary: "Authorization",
  "X-Content-Type-Options": "nosniff",
  "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet",
};

export function sanitizeTelemetryIdentifier(value: string): string | undefined {
  const trimmed = value.trim();
  if (trimmed.length > MAX_VALUE_LENGTH) return undefined;
  return IDENTIFIER_PATTERN.test(trimmed) ? trimmed : undefined;
}

export function extractStack(body: Record<string, unknown>): Record<string, TelemetryStackValue> {
  const stack: Record<string, TelemetryStackValue> = {};
  const explicitStack =
    body.stack && typeof body.stack === "object" && !Array.isArray(body.stack)
      ? (body.stack as Record<string, unknown>)
      : {};
  for (const [key, value] of [...Object.entries(body), ...Object.entries(explicitStack)]) {
    if (Object.keys(stack).length >= MAX_STACK_KEYS) break;
    const normalizedKey = key.toLowerCase();
    if (
      META_KEYS.has(normalizedKey) ||
      BLOCKED_KEYS.has(normalizedKey) ||
      !TELEMETRY_STACK_KEYS.has(key)
    ) {
      continue;
    }
    const sanitized = sanitizeTelemetryStackDimension(key, value);
    if (sanitized !== undefined) stack[key] = sanitized;
  }
  return stack;
}

const stackString = (stack: Record<string, TelemetryStackValue>, key: string): string | undefined =>
  typeof stack[key] === "string" ? stack[key] : undefined;
const stackBoolean = (
  stack: Record<string, TelemetryStackValue>,
  key: string,
): boolean | undefined => (typeof stack[key] === "boolean" ? stack[key] : undefined);
const stackStringArray = (
  stack: Record<string, TelemetryStackValue>,
  key: string,
): string[] | undefined => (Array.isArray(stack[key]) ? stack[key] : undefined);

export function legacyStackFields(stack: Record<string, TelemetryStackValue>) {
  return {
    ecosystem: stackString(stack, "ecosystem"),
    database: stackString(stack, "database"),
    orm: stackString(stack, "orm"),
    backend: stackString(stack, "backend"),
    runtime: stackString(stack, "runtime"),
    frontend: stackStringArray(stack, "frontend"),
    api: stackString(stack, "api"),
    auth: stackString(stack, "auth"),
    dbSetup: stackString(stack, "dbSetup"),
    webDeploy: stackString(stack, "webDeploy"),
    serverDeploy: stackString(stack, "serverDeploy"),
    addons: stackStringArray(stack, "addons"),
    examples: stackStringArray(stack, "examples"),
    payments: stackString(stack, "payments"),
    email: stackString(stack, "email"),
    fileUpload: stackString(stack, "fileUpload"),
    astroIntegration: stackString(stack, "astroIntegration"),
    cssFramework: stackString(stack, "cssFramework"),
    uiLibrary: stackString(stack, "uiLibrary"),
    stateManagement: stackString(stack, "stateManagement"),
    forms: stackString(stack, "forms"),
    animation: stackString(stack, "animation"),
    validation: stackString(stack, "validation"),
    realtime: stackString(stack, "realtime"),
    jobQueue: stackString(stack, "jobQueue"),
    caching: stackString(stack, "caching"),
    logging: stackString(stack, "logging"),
    observability: stackString(stack, "observability"),
    ai: stackString(stack, "ai"),
    cms: stackString(stack, "cms"),
    testing: stackString(stack, "testing"),
    effect: stackString(stack, "effect"),
    rustWebFramework: stackString(stack, "rustWebFramework"),
    rustFrontend: stackString(stack, "rustFrontend"),
    rustOrm: stackString(stack, "rustOrm"),
    rustApi: stackString(stack, "rustApi"),
    rustCli: stackString(stack, "rustCli"),
    rustLibraries: stackStringArray(stack, "rustLibraries"),
    git: stackBoolean(stack, "git"),
    packageManager: stackString(stack, "packageManager"),
    install: stackBoolean(stack, "install"),
  };
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

function invalidExplicitValue(value: unknown, sanitized: unknown): boolean {
  return value !== undefined && sanitized === undefined;
}

const http = httpRouter();

http.route({
  path: "/api/analytics/ingest",
  method: "OPTIONS",
  handler: httpAction(async () => new Response(null, { status: 204, headers: CORS_HEADERS })),
});

http.route({
  path: "/api/analytics/ingest",
  method: "POST",
  handler: httpAction(async (ctx, req) => {
    let body: Record<string, unknown>;
    try {
      const declaredLength = Number(req.headers.get("content-length"));
      if (Number.isFinite(declaredLength) && declaredLength > MAX_PAYLOAD_BYTES) {
        return new Response("Payload Too Large", { status: 413, headers: CORS_HEADERS });
      }

      const rawBody = await req.text();
      if (new TextEncoder().encode(rawBody).byteLength > MAX_PAYLOAD_BYTES) {
        return new Response("Payload Too Large", { status: 413, headers: CORS_HEADERS });
      }
      body = JSON.parse(rawBody) as Record<string, unknown>;
    } catch {
      return new Response("Bad Request", { status: 400, headers: CORS_HEADERS });
    }
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return new Response("Bad Request", { status: 400, headers: CORS_HEADERS });
    }

    const envelope = sanitizeIngestEnvelope(body);
    if (
      invalidExplicitValue(body.eventType, envelope.eventType) ||
      invalidExplicitValue(body.source, envelope.source) ||
      invalidExplicitValue(body.client, envelope.client) ||
      invalidExplicitValue(body.status, envelope.status)
    ) {
      return new Response("Bad Request", { status: 400, headers: CORS_HEADERS });
    }

    const stack = extractStack(body);

    try {
      await ctx.runMutation(internal.analytics.ingestEvent, {
        ...envelope,
        stack: Object.keys(stack).length > 0 ? stack : undefined,
        ...legacyStackFields(stack),
      });
    } catch (error) {
      console.error("Failed to ingest analytics:", error);
      return new Response("Internal Server Error", { status: 500, headers: CORS_HEADERS });
    }
    return new Response("ok", { headers: CORS_HEADERS });
  }),
});

http.route({
  path: "/api/analytics/dashboard",
  method: "GET",
  handler: httpAction(async (ctx, req) => {
    const access = getTelemetryDashboardAccess(
      req.headers.get("Authorization"),
      process.env.TELEMETRY_DASHBOARD_SECRET,
    );
    if (access === "unconfigured") {
      return new Response(JSON.stringify({ error: "Telemetry dashboard is not configured" }), {
        status: 503,
        headers: PRIVATE_JSON_HEADERS,
      });
    }
    if (access === "unauthorized") {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: PRIVATE_JSON_HEADERS,
      });
    }

    try {
      const [stats, daily, engagement, insights] = await Promise.all([
        ctx.runQuery(internal.analytics.getStats, {}),
        ctx.runQuery(internal.analytics.getDailyStats, { days: 30 }),
        ctx.runQuery(internal.analytics.getEngagement, {}),
        ctx.runQuery(internal.analytics.getProductInsights, {}),
      ]);

      return new Response(JSON.stringify({ stats, daily, engagement, insights }), {
        headers: PRIVATE_JSON_HEADERS,
      });
    } catch (error) {
      console.error("Failed to load aggregate telemetry dashboard:", error);
      return new Response(JSON.stringify({ error: "Internal Server Error" }), {
        status: 500,
        headers: PRIVATE_JSON_HEADERS,
      });
    }
  }),
});

export default http;
