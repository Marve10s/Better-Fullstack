import { log } from "@clack/prompts";
import pc from "picocolors";

import type { ProjectConfig } from "../types";

import { getLatestCLIVersion } from "./get-latest-cli-version";
import { canPromptInteractively } from "./prompt-environment";
import {
  getPersistedTelemetryPreference,
  hasTelemetryNoticeBeenShown,
  markTelemetryNoticeShown,
} from "./telemetry-settings";

const CONVEX_INGEST_URL = process.env.CONVEX_INGEST_URL;

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
      `${pc.dim("plus CLI version, Node.js version, and OS platform — never project names,")}\n` +
      `${pc.dim("file paths, or any personal data.")}\n` +
      `Opt out anytime with ${pc.cyan("create-better-fullstack telemetry disable")} ` +
      `or ${pc.cyan("BTS_TELEMETRY_DISABLED=1")}.`,
  );

  try {
    await markTelemetryNoticeShown();
  } catch {}
}

async function sendConvexEvent(payload: Record<string, unknown>) {
  if (!CONVEX_INGEST_URL) return;

  try {
    await fetch(CONVEX_INGEST_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch {}
}

export async function trackProjectCreation(config: ProjectConfig, disableAnalytics = false) {
  if (disableAnalytics || !(await isTelemetryEnabled())) return;

  const {
    projectName: _projectName,
    projectDir: _projectDir,
    relativePath: _relativePath,
    ...safeConfig
  } = config;

  try {
    await sendConvexEvent({
      ...safeConfig,
      cli_version: getLatestCLIVersion(),
      node_version: typeof process !== "undefined" ? process.version : "",
      platform: typeof process !== "undefined" ? process.platform : "",
    });
  } catch {}
}
