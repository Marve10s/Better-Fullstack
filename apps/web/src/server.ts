import handler, { createServerEntry } from "@tanstack/react-start/server-entry";

import {
  resolveCountryLocale,
  requestWithLocaleCookie,
  withLocaleResponseHeaders,
} from "@/lib/i18n/country-locale";
import { paraglideMiddleware } from "@/paraglide/server.js";

export default createServerEntry({
  async fetch(request) {
    const countryLocale = resolveCountryLocale(request);
    const requestWithLocale = countryLocale ? requestWithLocaleCookie(request, countryLocale) : request;
    const response = await paraglideMiddleware(requestWithLocale, ({ request: localizedRequest }) =>
      handler.fetch(localizedRequest),
    );

    return withLocaleResponseHeaders(response, request, countryLocale);
  },
});
