import { httpRouter } from "convex/server";

import { internal } from "@/_generated/api";
import { httpAction } from "@/_generated/server";
import { getTelemetryDashboardAccess } from "@/analytics_access";

import { handleTelemetryIngest } from "../src/telemetry-ingest";
import { CORS_HEADERS } from "../src/telemetry-validation";
export {
  extractStack,
  legacyStackFields,
  sanitizeIngestEnvelope,
  sanitizeTelemetryIdentifier,
  TELEMETRY_STACK_KEYS,
} from "../src/telemetry-validation";

const PRIVATE_JSON_HEADERS = {
  "Cache-Control": "private, no-store",
  "Content-Type": "application/json; charset=utf-8",
  Vary: "Authorization",
  "X-Content-Type-Options": "nosniff",
  "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet",
};

const http = httpRouter();

http.route({
  path: "/api/analytics/ingest",
  method: "OPTIONS",
  handler: httpAction(async () => new Response(null, { status: 204, headers: CORS_HEADERS })),
});

http.route({
  path: "/api/analytics/ingest",
  method: "POST",
  handler: httpAction(async (_ctx, req) =>
    handleTelemetryIngest(req, {
      token: process.env.POSTHOG_PROJECT_TOKEN,
      host: process.env.POSTHOG_HOST,
      enabled: process.env.BFS_TELEMETRY_ENABLED === "1",
    }),
  ),
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
