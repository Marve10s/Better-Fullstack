import { log } from "@clack/prompts";
import pc from "picocolors";

import type { ProjectConfig } from "../types";

import { getLatestCLIVersion } from "./get-latest-cli-version";
import { canPromptInteractively } from "./prompt-environment";
import { TelemetryDeliveryQueue } from "./telemetry-delivery";
import {
  getOrCreateMachineId,
  getPersistedTelemetryPreference,
  hasTelemetryNoticeBeenShown,
  markTelemetryNoticeShown,
} from "./telemetry-settings";

const TELEMETRY_DELIVERY_TIMEOUT_MS = 1_000;
const TELEMETRY_FLUSH_TIMEOUT_MS = 250;
const telemetryDeliveryQueue = new TelemetryDeliveryQueue();
let machineIdPromise: Promise<string | undefined> | undefined;

/**
 * Whether telemetry is explicitly overridden at runtime.
 *
 * Only `BTS_TELEMETRY_DISABLED` is a runtime override: `BTS_TELEMETRY` is inlined
 * by the bundler at build time (see tsdown.config.ts) and therefore acts as a
 * build-time default, not a runtime switch.
 */
export function hasTelemetryEnvOverride(): boolean {
  return process.env.BTS_TELEMETRY_DISABLED !== undefined;
}

/**
 * Resolve whether telemetry is enabled.
 *
 * Precedence: runtime env override (`BTS_TELEMETRY_DISABLED`) > persisted
 * preference > default. The default honors the build-time `BTS_TELEMETRY` flag
 * (inlined by the bundler, "0" by default) and falls back to enabled when the
 * flag is unset (e.g. running from source).
 *
 * `BTS_TELEMETRY` is intentionally evaluated last: the bundler replaces it with
 * a literal, so an early `!== undefined` check would always short-circuit and
 * make the persisted preference unreachable in the shipped CLI.
 */
export async function isTelemetryEnabled(): Promise<boolean> {
  const disabled = process.env.BTS_TELEMETRY_DISABLED;
  if (disabled !== undefined) {
    return disabled !== "1";
  }

  const persisted = await getPersistedTelemetryPreference();
  if (persisted !== undefined) {
    return persisted;
  }

  const buildDefault = process.env.BTS_TELEMETRY;
  return buildDefault === undefined ? true : buildDefault === "1";
}

/**
 * Print a one-time notice describing the anonymous telemetry the CLI collects
 * and how to opt out, then remember that it was shown so it never repeats.
 *
 * No-ops when telemetry is explicitly configured via env var, when a persisted
 * preference already exists, when the notice was already shown, when telemetry
 * is disabled by the build default, or when the CLI is not running interactively
 * (CI / silent / non-TTY).
 */
export async function maybeShowTelemetryNotice(): Promise<void> {
  if (hasTelemetryEnvOverride()) return;
  if (!canPromptInteractively()) return;

  const persisted = await getPersistedTelemetryPreference();
  if (persisted !== undefined) return;

  if (await hasTelemetryNoticeBeenShown()) return;

  // Nothing to disclose if telemetry is off by default for this build.
  if (!(await isTelemetryEnabled())) return;

  log.info(
    `${pc.bold("Anonymous usage telemetry is enabled.")}\n` +
      `${pc.dim("We collect your selected stack options (e.g. frontend, backend, database),")}\n` +
      `${pc.dim("command outcomes and bounded quality counts, CLI/runtime version, OS")}\n` +
      `${pc.dim("platform, and a random anonymous install ID — never project names, file")}\n` +
      `${pc.dim("paths, prompts, source code, env values, secrets, or raw error messages.")}\n` +
      `Opt out anytime with ${pc.cyan("create-better-fullstack telemetry disable")} ` +
      `or ${pc.cyan("BTS_TELEMETRY_DISABLED=1")}.`,
  );

  try {
    await markTelemetryNoticeShown();
  } catch {}
}

function getTelemetryMachineId(): Promise<string | undefined> {
  machineIdPromise ??= getOrCreateMachineId().catch(() => {
    machineIdPromise = undefined;
    return undefined;
  });
  return machineIdPromise;
}

async function sendConvexEvent(
  payload: Record<string, unknown>,
  controller: AbortController,
): Promise<void> {
  const ingestUrl = process.env.CONVEX_INGEST_URL;
  if (!ingestUrl) return;

  const timeout = setTimeout(() => controller.abort(), TELEMETRY_DELIVERY_TIMEOUT_MS);
  timeout.unref?.();

  try {
    await fetch(ingestUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
  } catch {
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Give background telemetry one short chance to finish when the CLI exits.
 * Command and MCP operations never wait for network delivery themselves.
 */
export async function flushTelemetry(timeoutMs = TELEMETRY_FLUSH_TIMEOUT_MS): Promise<void> {
  await telemetryDeliveryQueue.flush(timeoutMs);
}

export type TelemetryEventType =
  | "project_created"
  | "feature_added"
  | "stack_updated"
  | "command_used";

export type TelemetrySource = "cli-interactive" | "cli-flags" | "mcp" | "programmatic";

export type TelemetryOutcome = {
  source?: TelemetrySource;
  action?: string;
  status?: "started" | "succeeded" | "failed" | "cancelled";
  mode?: string;
  success?: boolean;
  errorName?: string;
  setupFailures?: string[];
  durationMs?: number;
  fileCount?: number;
  changedFileCount?: number;
  capabilityCount?: number;
  conflictCount?: number;
  manualReviewCount?: number;
  warningCount?: number;
  issueCount?: number;
  retry?: boolean;
};

const TELEMETRY_STATUSES = new Set(["started", "succeeded", "failed", "cancelled"]);
const TELEMETRY_SOURCES = new Set(["cli-interactive", "cli-flags", "mcp", "programmatic"]);

const BLOCKED_TELEMETRY_KEYS = new Set([
  "projectname",
  "projectdir",
  "relativepath",
  "targetdir",
  "workspaceroot",
  "name",
  "brief",
  "prompt",
  "source",
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

const TELEMETRY_KEY = /^[A-Za-z][A-Za-z0-9_.-]{0,63}$/;
const TELEMETRY_IDENTIFIER = /^[A-Za-z0-9][A-Za-z0-9_.:+-]{0,99}$/;

function sanitizeIdentifier(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return TELEMETRY_IDENTIFIER.test(trimmed) ? trimmed : undefined;
}

const SETUP_FAILURE_IDENTIFIERS: Readonly<Record<string, string>> = {
  "Install dependencies": "install-dependencies",
  "Database setup": "database-setup",
  "Cargo build": "cargo-build",
  "uv sync --extra dev (Python dependencies)": "python-uv-sync",
  "go mod tidy": "go-mod-tidy",
  "Maven tests": "maven-tests",
  "Gradle tests": "gradle-tests",
  "mix deps.get / compile": "elixir-deps-compile",
};

function sanitizeSetupFailure(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  const known = SETUP_FAILURE_IDENTIFIERS[trimmed];
  if (known) return known;

  const pythonInstall = /^(pip|poetry) install \(Python dependencies\)$/.exec(trimmed);
  if (pythonInstall?.[1]) return `python-${pythonInstall[1]}-install`;

  // Preserve already-normalized identifiers emitted by older callers.
  return sanitizeIdentifier(trimmed);
}

/**
 * Keep telemetry values inside the product's identifier vocabulary. This is a
 * second privacy boundary in addition to the Convex ingest sanitizer: paths,
 * prose, prompts, source code, env values, and other user content are dropped.
 */
export function sanitizeTelemetryConfig(
  config: Partial<ProjectConfig> | Record<string, unknown>,
): Record<string, string | boolean | string[]> {
  const safe: Record<string, string | boolean | string[]> = {};
  for (const [key, value] of Object.entries(config)) {
    if (BLOCKED_TELEMETRY_KEYS.has(key.toLowerCase()) || !TELEMETRY_KEY.test(key)) continue;
    if (key === "stackParts" && Array.isArray(value)) {
      const selections: string[] = [];
      const ecosystems = new Set<string>();
      const roles = new Set<string>();
      for (const rawPart of value.slice(0, 64)) {
        if (!rawPart || typeof rawPart !== "object" || Array.isArray(rawPart)) continue;
        const part = rawPart as Record<string, unknown>;
        if (part.source === "provided" || part.toolId === "none") continue;
        const role = sanitizeIdentifier(part.role);
        const ecosystem = sanitizeIdentifier(part.ecosystem);
        const toolId = sanitizeIdentifier(part.toolId);
        if (!role || !ecosystem || !toolId) continue;
        selections.push(`${role}:${ecosystem}:${toolId}`);
        roles.add(role);
        if (ecosystem !== "universal") ecosystems.add(ecosystem);
      }
      if (selections.length > 0) safe.stackPartSelections = [...new Set(selections)];
      if (roles.size > 0) safe.stackPartRoles = [...roles];
      if (ecosystems.size > 0) safe.stackPartEcosystems = [...ecosystems];
      safe.multiEcosystem = ecosystems.size > 1;
      continue;
    }
    if (typeof value === "boolean") {
      safe[key] = value;
      continue;
    }
    const identifier = sanitizeIdentifier(value);
    if (identifier !== undefined) {
      safe[key] = identifier;
      continue;
    }
    if (Array.isArray(value)) {
      const identifiers = value
        .slice(0, 64)
        .map(sanitizeIdentifier)
        .filter((item): item is string => item !== undefined);
      if (identifiers.length > 0) safe[key] = identifiers;
    }
  }
  return safe;
}

function runtimeContext() {
  const env = typeof process === "undefined" ? undefined : process.env;
  const bunVersion =
    typeof process === "undefined"
      ? undefined
      : (process.versions as NodeJS.ProcessVersions & { bun?: string }).bun;
  const ciProvider = env?.GITHUB_ACTIONS
    ? "github-actions"
    : env?.GITLAB_CI
      ? "gitlab-ci"
      : env?.CIRCLECI
        ? "circleci"
        : env?.VERCEL
          ? "vercel"
          : env?.CI
            ? "other"
            : undefined;
  return {
    client: "cli",
    executionRuntime: bunVersion ? "bun" : "node",
    bun_version: bunVersion,
    ci: Boolean(env?.CI),
    ciProvider,
  };
}

function boundedCount(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) && value >= 0
    ? Math.min(Math.round(value), 86_400_000)
    : undefined;
}

export function sanitizeTelemetryOutcome(outcome: TelemetryOutcome): TelemetryOutcome {
  const source = TELEMETRY_SOURCES.has(outcome.source ?? "") ? outcome.source : undefined;
  const status = TELEMETRY_STATUSES.has(outcome.status ?? "") ? outcome.status : undefined;
  const setupFailures = outcome.setupFailures
    ?.slice(0, 32)
    .map(sanitizeSetupFailure)
    .filter((item): item is string => item !== undefined);
  return {
    source,
    action: sanitizeIdentifier(outcome.action),
    status,
    mode: sanitizeIdentifier(outcome.mode),
    success: typeof outcome.success === "boolean" ? outcome.success : undefined,
    errorName: sanitizeIdentifier(outcome.errorName),
    setupFailures: setupFailures ? [...new Set(setupFailures)] : undefined,
    durationMs: boundedCount(outcome.durationMs),
    fileCount: boundedCount(outcome.fileCount),
    changedFileCount: boundedCount(outcome.changedFileCount),
    capabilityCount: boundedCount(outcome.capabilityCount),
    conflictCount: boundedCount(outcome.conflictCount),
    manualReviewCount: boundedCount(outcome.manualReviewCount),
    warningCount: boundedCount(outcome.warningCount),
    issueCount: boundedCount(outcome.issueCount),
    retry: typeof outcome.retry === "boolean" ? outcome.retry : undefined,
  };
}

/**
 * Send one telemetry event. `config` may be a full ProjectConfig or any
 * partial stack snapshot (e.g. the parts added by `add`); PII-ish fields
 * are always stripped before sending.
 */
export async function trackEvent(
  eventType: TelemetryEventType,
  config: Partial<ProjectConfig> | Record<string, unknown>,
  outcome: TelemetryOutcome = {},
  disableAnalytics = false,
) {
  if (disableAnalytics || !process.env.CONVEX_INGEST_URL) return;

  const safeConfig = sanitizeTelemetryConfig(config);
  const safeOutcome = sanitizeTelemetryOutcome(outcome);
  if (eventType === "project_created" && safeOutcome.capabilityCount === undefined) {
    const graphSelections = safeConfig.stackPartSelections;
    safeOutcome.capabilityCount = Array.isArray(graphSelections)
      ? graphSelections.length
      : Object.entries(safeConfig).filter(([key, value]) => {
          if (["ecosystem", "packageManager", "versionChannel"].includes(key)) return false;
          if (value === false || value === "none") return false;
          return !Array.isArray(value) || value.some((item) => item !== "none");
        }).length;
  }

  telemetryDeliveryQueue.enqueue(async (controller) => {
    if (!(await isTelemetryEnabled())) return;
    await sendConvexEvent(
      {
        ...safeConfig,
        eventType,
        ...safeOutcome,
        ...runtimeContext(),
        machineId: await getTelemetryMachineId(),
        cli_version: getLatestCLIVersion(),
        node_version: typeof process !== "undefined" ? process.version : "",
        platform: typeof process !== "undefined" ? process.platform : "",
      },
      controller,
    );
  });
}

export function statusFromCommandResult(
  result: { success: boolean } | undefined,
): "succeeded" | "failed" | "cancelled" {
  if (result === undefined) return "cancelled";
  return result.success ? "succeeded" : "failed";
}

/** Track a CLI command without sending positional arguments or free-form input. */
export async function trackCommand(
  action: string,
  status: NonNullable<TelemetryOutcome["status"]>,
  details: Omit<TelemetryOutcome, "action" | "status"> = {},
  dimensions: Record<string, unknown> = {},
  disableAnalytics = false,
) {
  await trackEvent(
    "command_used",
    { command: action, ...dimensions },
    {
      ...details,
      action,
      status,
      success: status === "succeeded" ? true : status === "failed" ? false : undefined,
    },
    disableAnalytics,
  );
}

export async function withCommandTelemetry<T>(
  action: string,
  operation: () => Promise<T>,
  options: {
    source?: TelemetrySource;
    mode?: string;
    dimensions?: Record<string, unknown>;
    disableAnalytics?: boolean;
    resultStatus?: (result: T) => "succeeded" | "failed" | "cancelled";
    resultDetails?: (result: T) => Omit<TelemetryOutcome, "action" | "status">;
  } = {},
): Promise<T> {
  const startedAt = Date.now();
  const common = { source: options.source, mode: options.mode };
  await trackCommand(action, "started", common, options.dimensions, options.disableAnalytics);
  try {
    const result = await operation();
    const resultStatus = options.resultStatus?.(result) ?? "succeeded";
    await trackCommand(
      action,
      resultStatus,
      {
        ...common,
        ...options.resultDetails?.(result),
        durationMs: Date.now() - startedAt,
      },
      options.dimensions,
      options.disableAnalytics,
    );
    return result;
  } catch (error) {
    const cancelled = error instanceof Error && error.name === "UserCancelledError";
    await trackCommand(
      action,
      cancelled ? "cancelled" : "failed",
      {
        ...common,
        durationMs: Date.now() - startedAt,
        errorName: error instanceof Error ? error.name : "UnknownError",
      },
      options.dimensions,
      options.disableAnalytics,
    );
    throw error;
  }
}

export async function trackProjectCreation(
  config: ProjectConfig,
  disableAnalytics = false,
  outcome: TelemetryOutcome = {},
) {
  await trackEvent("project_created", config, outcome, disableAnalytics);
}
