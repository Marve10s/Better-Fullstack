import { httpAction } from "@/_generated/server";

const RETIRED_RESPONSE_HEADERS = {
  "Cache-Control": "private, no-store",
  "Content-Type": "application/json; charset=utf-8",
  "X-Content-Type-Options": "nosniff",
} as const;

function retiredTrackResponse(): Response {
  return new Response(
    JSON.stringify({
      error: "Gone",
      message: "This legacy analytics endpoint is retired.",
    }),
    { status: 410, headers: RETIRED_RESPONSE_HEADERS },
  );
}

/**
 * Permanent tombstone for clients that still know the legacy endpoint.
 * Do not add CORS headers or mutations: active telemetry is owned by
 * packages/backend/convex/http.ts.
 */
export const trackProjectCreation = httpAction(async () => retiredTrackResponse());

/** OPTIONS is also an explicit tombstone, not a permissive CORS preflight. */
export const options = httpAction(async () => retiredTrackResponse());
