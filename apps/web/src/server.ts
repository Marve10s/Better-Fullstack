import handler, { createServerEntry } from "@tanstack/react-start/server-entry";

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
} from "@/lib/telemetry-auth.server";
import { paraglideMiddleware } from "@/paraglide/server.js";

export default createServerEntry({
  async fetch(request) {
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
