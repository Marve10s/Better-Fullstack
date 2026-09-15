import { sanitizeTelemetryMachineId } from "@better-fullstack/types/telemetry";

import { capturePosthog, posthogEvent, posthogHost } from "./posthog";
import {
  CORS_HEADERS,
  invalidExplicitValue,
  MAX_PAYLOAD_BYTES,
  sanitizeIngestEnvelope,
} from "./telemetry-validation";

type IngestOptions = {
  enabled: boolean;
  host: string | undefined;
  token: string | undefined;
  allowedPages?: ReadonlySet<string>;
};

const headers = {
  ...CORS_HEADERS,
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
};
const buckets = new Map<string, { start: number; count: number }>();

// Per-instance protection complements the hosting platform's ingress rate limit.
function acceptsEvent(id: string, now: number) {
  for (const [key, bucket] of buckets) if (now - bucket.start >= 60_000) buckets.delete(key);
  const bucket = buckets.get(id);
  if (bucket) return ++bucket.count <= 120;
  if (buckets.size >= 2_000) return false;
  buckets.set(id, { start: now, count: 1 });
  return true;
}

async function readBody(request: Request): Promise<Record<string, unknown> | undefined> {
  const reader = request.body?.getReader();
  if (!reader) return undefined;
  let size = 0;
  let text = "";
  const decoder = new TextDecoder();
  // oxlint-disable no-await-in-loop -- Bound streaming input before parsing it.
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_PAYLOAD_BYTES) {
      await reader.cancel();
      throw new Error("payload-too-large");
    }
    text += decoder.decode(value, { stream: true });
  }
  text += decoder.decode();
  const parsed: unknown = JSON.parse(text);
  return parsed && typeof parsed === "object" && !Array.isArray(parsed)
    ? (parsed as Record<string, unknown>)
    : undefined;
}

function pageProperties(body: Record<string, unknown>, pages: ReadonlySet<string> | undefined) {
  if (typeof body.page_id !== "string" || !pages?.has(body.page_id)) return undefined;
  const page: Record<string, string | number> = { page_id: body.page_id };
  const viewId = sanitizeTelemetryMachineId(body.page_view_id);
  if (!viewId) return undefined;
  page.page_view_id = viewId;
  for (const [key, max] of Object.entries({
    active_ms: 86_400_000,
    elapsed_ms: 86_400_000,
    scroll_percent: 100,
    max_scroll_percent: 100,
    scroll_px: 10_000_000,
    viewport_height: 20_000,
  })) {
    const value = body[key];
    if (typeof value === "number" && Number.isFinite(value) && value >= 0)
      page[key] = Math.min(Math.round(value), max);
  }
  if (body.scroll_surface === "document" || body.scroll_surface === "builder")
    page.scroll_surface = body.scroll_surface;
  if (
    body.end_reason === "navigation" ||
    body.end_reason === "hidden" ||
    body.end_reason === "pagehide"
  )
    page.end_reason = body.end_reason;
  if (body.device === "mobile" || body.device === "tablet" || body.device === "desktop")
    page.device = body.device;
  return page;
}

export async function handleTelemetryIngest(
  request: Request,
  options: IngestOptions,
): Promise<Response> {
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers });
  if (request.method !== "POST")
    return new Response(null, { status: 405, headers: { ...headers, Allow: "POST, OPTIONS" } });
  const host = posthogHost(options.host);
  if (!options.enabled || !options.token || !host)
    return new Response(null, { status: 503, headers });
  if (request.headers.get("Content-Type")?.split(";")[0]?.trim() !== "application/json")
    return new Response(null, { status: 415, headers });
  if (Number(request.headers.get("Content-Length")) > MAX_PAYLOAD_BYTES)
    return new Response(null, { status: 413, headers });
  let body: Record<string, unknown> | undefined;
  try {
    body = await readBody(request);
  } catch (error) {
    return new Response(null, {
      status: error instanceof Error && error.message === "payload-too-large" ? 413 : 400,
      headers,
    });
  }
  if (!body) return new Response(null, { status: 400, headers });
  const envelope = sanitizeIngestEnvelope(body);
  if (
    ["eventType", "source", "client", "status", "action", "machineId"].some((key) =>
      invalidExplicitValue(body[key], envelope[key as keyof typeof envelope]),
    )
  )
    return new Response(null, { status: 400, headers });
  const eventId = sanitizeTelemetryMachineId(body.eventId) ?? crypto.randomUUID();
  const page = pageProperties(body, options.allowedPages);
  if (
    (body.action === "page-viewed" || body.action === "page-engagement") &&
    (!page || envelope.eventType !== "web_action")
  )
    return new Response(null, { status: 400, headers });
  if (!acceptsEvent(envelope.machineId ?? "legacy-unattributed", Date.now()))
    return new Response(null, { status: 429, headers: { ...headers, "Retry-After": "60" } });
  try {
    await capturePosthog([posthogEvent(body, { eventId, timestamp: Date.now(), page })], {
      host,
      token: options.token,
    });
    return new Response(null, { status: 204, headers });
  } catch {
    return new Response(null, { status: 502, headers });
  }
}
