type ProductValue = string | string[] | number | boolean | null | undefined;

export type ProductAnalyticsProperties = Record<string, ProductValue>;

let pageContext: { page_id: string; page_view_id: string } | undefined;

export function setTelemetryPageContext(context: typeof pageContext) {
  pageContext = context;
}

const ID_KEY = "better-fullstack-anonymous-id";
export const BROWSER_TELEMETRY_DISABLED_KEY = "better-fullstack-telemetry-disabled";
const BROWSER_TELEMETRY_CHANGE_EVENT = "better-fullstack:telemetry-change";
const IDENTIFIER = /^[A-Za-z0-9][A-Za-z0-9_.:+,-]{0,99}$/;
const KEY = /^[A-Za-z][A-Za-z0-9_.-]{0,63}$/;
const PAGE_ID = /^[a-zA-Z0-9][a-zA-Z0-9_.:-]{0,255}$/;
const ALLOWED_PROPERTY_KEYS = new Set([
  "page_id",
  "page_view_id",
  "active_ms",
  "elapsed_ms",
  "scroll_percent",
  "max_scroll_percent",
  "scroll_px",
  "viewport_height",
  "scroll_surface",
  "end_reason",
  "device",
  "archive_bytes",
  "backend",
  "campaign",
  "database",
  "decision_stage",
  "duration_ms",
  "ecosystem",
  "frontend",
  "failure_reason",
  "failure_stage",
  "mode",
  "moment",
  "placement",
  "preset",
  "reason",
  "rerun",
  "selected_evidence_level",
  "selection_outcome",
  "selection_problem",
  "stage",
  "starter_track",
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
  return import.meta.env.VITE_BFS_TELEMETRY_ENABLED === "1" ? "/api/analytics/ingest" : null;
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

export const PAGE_PROPERTY_KEYS = new Set([
  "page_id",
  "page_view_id",
  "device",
  "active_ms",
  "elapsed_ms",
  "scroll_px",
  "scroll_percent",
  "max_scroll_percent",
  "viewport_height",
  "scroll_surface",
  "end_reason",
]);

export function isProductPropertyKey(key: string): boolean {
  return KEY.test(key) && !BLOCKED_KEYS.has(key.toLowerCase());
}

export function sanitizeAllowedProperty(key: string, value: ProductValue): ProductValue {
  if (key === "page_id" && typeof value === "string" && PAGE_ID.test(value)) return value;
  if (!ALLOWED_PROPERTY_KEYS.has(key)) return undefined;
  if (typeof value === "boolean") return value;
  if (typeof value === "number" && Number.isFinite(value) && value >= 0) {
    return Math.min(Math.round(value), 86_400_000);
  }
  if (typeof value === "string" && IDENTIFIER.test(value)) return value;
  return undefined;
}

function sanitizePageProperties(
  properties: ProductAnalyticsProperties,
): ProductAnalyticsProperties {
  const safe: ProductAnalyticsProperties = {};
  for (const [key, value] of Object.entries(properties)) {
    const allowed = sanitizeAllowedProperty(key, value);
    if (allowed !== undefined) safe[key] = allowed;
  }
  return safe;
}

export function trackProductEvent(
  action: string,
  status: "started" | "succeeded" | "failed" | "cancelled",
  input: ProductAnalyticsProperties = {},
): void {
  const endpoint = ingestUrl();
  if (!endpoint || !isBrowserTelemetryEnabled() || !IDENTIFIER.test(action)) return;
  const machineId = anonymousId();
  if (!machineId) return;

  const success = status === "succeeded" ? true : status === "failed" ? false : undefined;
  const properties = { ...pageContext, ...input };

  const send = (safe: ProductAnalyticsProperties) => {
    if (!isBrowserTelemetryEnabled()) return;
    const payload = JSON.stringify({
      ...safe,
      eventId: crypto.randomUUID(),
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
      credentials: "omit",
    }).catch(() => undefined);
  };

  if (Object.keys(properties).every((key) => PAGE_PROPERTY_KEYS.has(key))) {
    send(sanitizePageProperties(properties));
    return;
  }
  void import("@/lib/analytics/product-properties").then(
    ({ sanitizeProductProperties }) => send(sanitizeProductProperties(properties)),
    () => undefined,
  );
}
