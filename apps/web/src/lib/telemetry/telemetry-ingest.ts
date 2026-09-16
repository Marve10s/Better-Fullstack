import { sanitizeTelemetryMachineId } from "@better-fullstack/types/telemetry";

import { createTelemetryRateLimit } from "@/lib/telemetry/telemetry-rate-limit";

export { vercelRequestKey } from "@/lib/telemetry/telemetry-rate-limit";

import { capturePosthog, posthogEvent, posthogHost } from "@/lib/telemetry/posthog";
import {
  CORS_HEADERS,
  hasInvalidEnvelopeValues,
  hasInvalidStackValues,
  MAX_PAYLOAD_BYTES,
  sanitizeIngestEnvelope,
} from "@/lib/telemetry/telemetry-validation";

type IngestOptions = {
  enabled: boolean;
  host: string | undefined;
  token: string | undefined;
  trustedRequestKey?: string;
  allowedPages?: ReadonlySet<string>;
};

const headers = {
  ...CORS_HEADERS,
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
};
const acceptsRequest = createTelemetryRateLimit();

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

const pageNumericLimits = {
  active_ms: 86_400_000,
  elapsed_ms: 86_400_000,
  scroll_percent: 100,
  max_scroll_percent: 100,
  scroll_px: 10_000_000,
  viewport_height: 20_000,
};
const pageEnums = {
  scroll_surface: ["document", "builder"],
  end_reason: ["navigation", "hidden", "pagehide"],
  device: ["mobile", "tablet", "desktop"],
};
const pageKeys = [
  "page_id",
  "page_view_id",
  ...Object.keys(pageNumericLimits),
  ...Object.keys(pageEnums),
];

function pageProperties(body: Record<string, unknown>, pages: ReadonlySet<string> | undefined) {
  if (typeof body.page_id !== "string" || !pages?.has(body.page_id)) return undefined;
  const page: Record<string, string | number> = { page_id: body.page_id };
  const viewId = sanitizeTelemetryMachineId(body.page_view_id);
  if (!viewId) return undefined;
  page.page_view_id = viewId;
  for (const [key, max] of Object.entries(pageNumericLimits)) {
    const value = body[key];
    if (value === undefined) continue;
    if (typeof value !== "number" || !Number.isFinite(value) || value < 0) return undefined;
    page[key] = Math.min(Math.round(value), max);
  }
  for (const [key, values] of Object.entries(pageEnums)) {
    const value = body[key];
    if (value === undefined) continue;
    if (typeof value !== "string" || !values.includes(value)) return undefined;
    page[key] = value;
  }
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
  if (!acceptsRequest(options.trustedRequestKey))
    return new Response(null, { status: 429, headers: { ...headers, "Retry-After": "60" } });
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
  const suppliedEventId = sanitizeTelemetryMachineId(body.eventId);
  if (
    !envelope.eventType ||
    !envelope.machineId ||
    (body.eventId !== undefined && !suppliedEventId) ||
    ((envelope.eventType === "web_action" || envelope.eventType === "command_used") &&
      !envelope.action) ||
    (envelope.eventType === "command_used" && !envelope.status) ||
    hasInvalidEnvelopeValues(body) ||
    hasInvalidStackValues(body)
  )
    return new Response(null, { status: 400, headers });
  const eventId = suppliedEventId ?? crypto.randomUUID();
  const page = pageProperties(body, options.allowedPages);
  if (
    (!page && pageKeys.some((key) => body[key] !== undefined)) ||
    ((body.action === "page-viewed" || body.action === "page-engagement") &&
      (!page || envelope.eventType !== "web_action"))
  )
    return new Response(null, { status: 400, headers });
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
