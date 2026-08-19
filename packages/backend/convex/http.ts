import { httpRouter } from "convex/server";

import { internal } from "./_generated/api";
import { httpAction } from "./_generated/server";
import { getTelemetryDashboardAccess } from "./analytics_access";

type StackValue = string | boolean | string[];

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
  "failurestage",
  "failurereason",
  "failure_stage",
  "failure_reason",
  "stage",
  "reason",
  "setupfailures",
  "durationms",
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

const MAX_STACK_KEYS = 256;
const MAX_PAYLOAD_BYTES = 64 * 1024;
const KEY_PATTERN = /^[A-Za-z0-9_.-]{1,64}$/;
const MAX_VALUE_LENGTH = 100;
const MAX_ARRAY_ITEMS = 64;
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

function sanitizeString(value: string): string | undefined {
  const trimmed = value.trim().slice(0, MAX_VALUE_LENGTH);
  return IDENTIFIER_PATTERN.test(trimmed) ? trimmed : undefined;
}

/**
 * Build the generic stack record from an arbitrary payload: every
 * non-envelope key with a string / boolean / string[] value. New CLI
 * options are captured automatically — no server change needed.
 */
function extractStack(body: Record<string, unknown>): Record<string, StackValue> {
  const stack: Record<string, StackValue> = {};
  const explicitStack =
    body.stack && typeof body.stack === "object" && !Array.isArray(body.stack)
      ? (body.stack as Record<string, unknown>)
      : {};
  for (const [key, value] of [...Object.entries(body), ...Object.entries(explicitStack)]) {
    if (Object.keys(stack).length >= MAX_STACK_KEYS) break;
    const normalizedKey = key.toLowerCase();
    if (META_KEYS.has(normalizedKey) || BLOCKED_KEYS.has(normalizedKey) || !KEY_PATTERN.test(key)) {
      continue;
    }
    if (typeof value === "boolean") {
      stack[key] = value;
    } else if (typeof value === "string") {
      const clean = sanitizeString(value);
      if (clean !== undefined) stack[key] = clean;
    } else if (Array.isArray(value) && value.every((item) => typeof item === "string")) {
      const items = value
        .slice(0, MAX_ARRAY_ITEMS)
        .map((item) => sanitizeString(item))
        .filter((item): item is string => item !== undefined);
      if (items.length > 0) stack[key] = items;
    }
  }
  return stack;
}

const str = (value: unknown): string | undefined =>
  typeof value === "string" ? sanitizeString(value) : undefined;
const oneOf = <T extends string>(value: unknown, allowed: readonly T[]): T | undefined =>
  typeof value === "string" && allowed.includes(value as T) ? (value as T) : undefined;
const bool = (value: unknown): boolean | undefined =>
  typeof value === "boolean" ? value : undefined;
const num = (value: unknown): number | undefined =>
  typeof value === "number" && Number.isFinite(value) && value >= 0
    ? Math.min(Math.round(value), 86_400_000)
    : undefined;
const strArray = (value: unknown): string[] | undefined =>
  Array.isArray(value) && value.every((item) => typeof item === "string")
    ? value
        .slice(0, MAX_ARRAY_ITEMS)
        .map((item) => sanitizeString(item))
        .filter((item): item is string => item !== undefined)
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

    const eventType = oneOf(body.eventType, EVENT_TYPES);
    const source = oneOf(body.source, EVENT_SOURCES);
    const client = oneOf(body.client, EVENT_CLIENTS);
    const status = oneOf(body.status, EVENT_STATUSES);
    if (
      invalidExplicitValue(body.eventType, eventType) ||
      invalidExplicitValue(body.source, source) ||
      invalidExplicitValue(body.client, client) ||
      invalidExplicitValue(body.status, status)
    ) {
      return new Response("Bad Request", { status: 400, headers: CORS_HEADERS });
    }

    const stack = extractStack(body);

    try {
      await ctx.runMutation(internal.analytics.ingestEvent, {
        // Envelope
        eventType,
        source,
        client,
        action: str(body.action),
        status,
        mode: str(body.mode),
        machineId: str(body.machineId),
        success: bool(body.success),
        errorName: str(body.errorName),
        failureStage: str(body.failureStage ?? body.failure_stage ?? body.stage),
        failureReason: str(body.failureReason ?? body.failure_reason ?? body.reason),
        setupFailures: strArray(body.setupFailures),
        durationMs: num(body.durationMs),
        fileCount: num(body.fileCount),
        changedFileCount: num(body.changedFileCount),
        capabilityCount: num(body.capabilityCount),
        conflictCount: num(body.conflictCount),
        manualReviewCount: num(body.manualReviewCount),
        warningCount: num(body.warningCount),
        issueCount: num(body.issueCount),
        retry: bool(body.retry),
        ci: bool(body.ci),
        ciProvider: str(body.ciProvider),
        executionRuntime: str(body.executionRuntime),
        stack: Object.keys(stack).length > 0 ? stack : undefined,
        // Legacy named fields, kept so the per-field aggregates and old
        // payload shapes keep working.
        ecosystem: str(body.ecosystem),
        database: str(body.database),
        orm: str(body.orm),
        backend: str(body.backend),
        runtime: str(body.runtime),
        frontend: strArray(body.frontend),
        api: str(body.api),
        auth: str(body.auth),
        dbSetup: str(body.dbSetup),
        webDeploy: str(body.webDeploy),
        serverDeploy: str(body.serverDeploy),
        addons: strArray(body.addons),
        examples: strArray(body.examples),
        payments: str(body.payments),
        email: str(body.email),
        fileUpload: str(body.fileUpload),
        astroIntegration: str(body.astroIntegration),
        cssFramework: str(body.cssFramework),
        uiLibrary: str(body.uiLibrary),
        stateManagement: str(body.stateManagement),
        forms: str(body.forms),
        animation: str(body.animation),
        validation: str(body.validation),
        realtime: str(body.realtime),
        jobQueue: str(body.jobQueue),
        caching: str(body.caching),
        logging: str(body.logging),
        observability: str(body.observability),
        ai: str(body.ai),
        cms: str(body.cms),
        testing: str(body.testing),
        effect: str(body.effect),
        rustWebFramework: str(body.rustWebFramework),
        rustFrontend: str(body.rustFrontend),
        rustOrm: str(body.rustOrm),
        rustApi: str(body.rustApi),
        rustCli: str(body.rustCli),
        rustLibraries: strArray(body.rustLibraries),
        git: bool(body.git),
        packageManager: str(body.packageManager),
        install: bool(body.install),
        cli_version: str(body.cli_version),
        node_version: str(body.node_version),
        platform: str(body.platform),
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
