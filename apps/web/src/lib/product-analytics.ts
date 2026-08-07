type ProductValue = string | number | boolean | null | undefined;

export type ProductAnalyticsProperties = Record<string, ProductValue>;

const ID_KEY = "better-fullstack-anonymous-id";
export const BROWSER_TELEMETRY_DISABLED_KEY = "better-fullstack-telemetry-disabled";
const BROWSER_TELEMETRY_CHANGE_EVENT = "better-fullstack:telemetry-change";
const IDENTIFIER = /^[A-Za-z0-9][A-Za-z0-9_.:+,-]{0,99}$/;
const KEY = /^[A-Za-z][A-Za-z0-9_.-]{0,63}$/;
const ALLOWED_PROPERTY_KEYS = new Set([
  "archive_bytes",
  "backend",
  "campaign",
  "database",
  "duration_ms",
  "ecosystem",
  "frontend",
  "mode",
  "moment",
  "placement",
  "preset",
  "reason",
  "rerun",
  "stage",
  "target",
  "view",
]);

const BLOCKED_KEYS = new Set([
  "eventtype",
  "source",
  "client",
  "action",
  "status",
  "success",
  "machineid",
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
  "url",
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
]);

function ingestUrl(): string | null {
  const explicit = import.meta.env.VITE_CONVEX_INGEST_URL;
  if (typeof explicit === "string" && explicit.startsWith("https://")) return explicit;

  const deployment = import.meta.env.VITE_CONVEX_URL;
  if (typeof deployment !== "string" || !deployment.startsWith("https://")) return null;
  return `${deployment.replace(/\.convex\.cloud\/?$/, ".convex.site")}/api/analytics/ingest`;
}

export type BrowserTelemetryStatus = {
  enabled: boolean;
  reason: "enabled" | "local-opt-out" | "do-not-track" | "global-privacy-control" | "unavailable";
};

export function resolveBrowserTelemetryStatus(
  disabledPreference: string | null | undefined,
  doNotTrack: string | null | undefined,
  globalPrivacyControl = false,
): BrowserTelemetryStatus {
  if (disabledPreference === "1") return { enabled: false, reason: "local-opt-out" };
  if (globalPrivacyControl) return { enabled: false, reason: "global-privacy-control" };
  if (doNotTrack === "1" || doNotTrack === "yes") {
    return { enabled: false, reason: "do-not-track" };
  }
  return { enabled: true, reason: "enabled" };
}

export function getBrowserTelemetryStatus(): BrowserTelemetryStatus {
  if (typeof window === "undefined") return { enabled: false, reason: "unavailable" };
  try {
    return resolveBrowserTelemetryStatus(
      window.localStorage.getItem(BROWSER_TELEMETRY_DISABLED_KEY),
      window.navigator.doNotTrack,
      (window.navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl,
    );
  } catch {
    return { enabled: false, reason: "unavailable" };
  }
}

export function isBrowserTelemetryEnabled(): boolean {
  return getBrowserTelemetryStatus().enabled;
}

export function setBrowserTelemetryEnabled(enabled: boolean): BrowserTelemetryStatus {
  if (typeof window === "undefined") return { enabled: false, reason: "unavailable" };
  try {
    if (enabled) window.localStorage.removeItem(BROWSER_TELEMETRY_DISABLED_KEY);
    else window.localStorage.setItem(BROWSER_TELEMETRY_DISABLED_KEY, "1");
    window.dispatchEvent(new Event(BROWSER_TELEMETRY_CHANGE_EVENT));
  } catch {
    return { enabled: false, reason: "unavailable" };
  }
  return getBrowserTelemetryStatus();
}

export function subscribeBrowserTelemetry(listener: () => void): () => void {
  if (typeof window === "undefined") return () => undefined;
  const onStorage = (event: StorageEvent) => {
    if (event.key === BROWSER_TELEMETRY_DISABLED_KEY) listener();
  };
  window.addEventListener(BROWSER_TELEMETRY_CHANGE_EVENT, listener);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(BROWSER_TELEMETRY_CHANGE_EVENT, listener);
    window.removeEventListener("storage", onStorage);
  };
}

function anonymousId(): string | null {
  try {
    const current = window.localStorage.getItem(ID_KEY);
    if (current && IDENTIFIER.test(current)) return current;
    const created = crypto.randomUUID();
    window.localStorage.setItem(ID_KEY, created);
    return created;
  } catch {
    return null;
  }
}

/**
 * Retain only bounded product identifiers and numeric counters. This browser
 * path never sends project names, filenames, source edits, runtime output,
 * prompts, URLs, env values, or raw errors.
 */
export function sanitizeProductProperties(
  properties: ProductAnalyticsProperties = {},
): ProductAnalyticsProperties {
  const safe: ProductAnalyticsProperties = {};
  for (const [key, value] of Object.entries(properties)) {
    if (!KEY.test(key) || !ALLOWED_PROPERTY_KEYS.has(key) || BLOCKED_KEYS.has(key.toLowerCase())) {
      continue;
    }
    if (typeof value === "boolean") safe[key] = value;
    else if (typeof value === "number" && Number.isFinite(value) && value >= 0) {
      safe[key] = Math.min(Math.round(value), 86_400_000);
    } else if (typeof value === "string" && IDENTIFIER.test(value)) {
      safe[key] = value;
    }
  }
  return safe;
}

export function trackProductEvent(
  action: string,
  status: "started" | "succeeded" | "failed" | "cancelled",
  properties: ProductAnalyticsProperties = {},
): void {
  const endpoint = ingestUrl();
  if (!endpoint || !isBrowserTelemetryEnabled() || !IDENTIFIER.test(action)) return;
  const machineId = anonymousId();
  if (!machineId) return;

  const success = status === "succeeded" ? true : status === "failed" ? false : undefined;

  const payload = JSON.stringify({
    ...sanitizeProductProperties(properties),
    eventType: "web_action",
    source: "web-builder",
    client: "web",
    action,
    status,
    success,
    machineId,
    platform: "browser",
    executionRuntime: "browser",
  });

  // Fire-and-forget by design: analytics must never block builder behavior.
  void fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
    keepalive: true,
  }).catch(() => undefined);
}
