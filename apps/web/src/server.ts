import { handleTelemetryIngest } from "@better-fullstack/backend/telemetry-ingest";
import handler, { createServerEntry } from "@tanstack/react-start/server-entry";

import { TELEMETRY_PAGES } from "@/lib/analytics/telemetry-pages";
import {
  resolveCountryLocale,
  requestWithLocaleCookie,
  withLocaleResponseHeaders,
} from "@/lib/i18n/country-locale";
import {
  getTelemetryPageAccess,
  isTelemetryPageRequest,
  telemetryAuthFailureResponse,
  withPrivateTelemetryHeaders,
} from "@/lib/telemetry/telemetry-auth.server";
import { paraglideMiddleware } from "@/paraglide/server.js";

export default createServerEntry({
  async fetch(request) {
    if (new URL(request.url).pathname === "/api/analytics/ingest") {
      return handleTelemetryIngest(request, {
        enabled: process.env.BFS_TELEMETRY_ENABLED === "1" && process.env.VERCEL_ENV !== "preview",
        token: process.env.POSTHOG_PROJECT_TOKEN,
        host: process.env.POSTHOG_HOST,
        allowedPages: TELEMETRY_PAGES,
      });
    }
    const telemetryRequest = isTelemetryPageRequest(request);
    if (telemetryRequest) {
      const access = getTelemetryPageAccess(request, process.env.TELEMETRY_DASHBOARD_SECRET);
      if (access !== "authorized") return telemetryAuthFailureResponse(access);
    }

    const countryLocale = resolveCountryLocale(request);
    const requestWithLocale = countryLocale
      ? requestWithLocaleCookie(request, countryLocale)
      : request;
    const response = await paraglideMiddleware(requestWithLocale, ({ request: localizedRequest }) =>
      handler.fetch(localizedRequest),
    );

    const localizedResponse = withLocaleResponseHeaders(response, request, countryLocale);
    return telemetryRequest ? withPrivateTelemetryHeaders(localizedResponse) : localizedResponse;
  },
});
