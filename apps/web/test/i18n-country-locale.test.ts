import { describe, expect, test } from "bun:test";

import {
  getRequestLocaleCookie,
  localeFromCountry,
  requestWithLocaleCookie,
  resolveCountryLocale,
  shouldDetectCountryLocale,
  withLocaleResponseHeaders,
} from "@/lib/i18n/country-locale";
import { LOCALE_COOKIE_NAME } from "@/lib/i18n/locales";

function request(path: string, headers?: HeadersInit) {
  return new Request(`https://better-fullstack.dev${path}`, { headers });
}

describe("country locale detection", () => {
  test("maps supported country codes to website locales", () => {
    expect(localeFromCountry("ES")).toBe("es");
    expect(localeFromCountry("mx")).toBe("es");
    expect(localeFromCountry("CN")).toBe("zh");
    expect(localeFromCountry("TW")).toBe("zh-Hant");
    expect(localeFromCountry("HK")).toBe("zh-Hant");
    expect(localeFromCountry("JP")).toBe("ja");
    expect(localeFromCountry("KR")).toBe("ko");
    expect(localeFromCountry("DE")).toBe("de");
    expect(localeFromCountry("FR")).toBe("fr");
    expect(localeFromCountry("UA")).toBe("uk");
    expect(localeFromCountry("sg")).toBeUndefined();
    expect(localeFromCountry("US")).toBeUndefined();
  });

  test("resolves country headers only when no locale cookie is already present", () => {
    expect(resolveCountryLocale(request("/new", { "x-vercel-ip-country": "ES" }))).toBe("es");
    expect(
      resolveCountryLocale(
        request("/new", {
          Cookie: `${LOCALE_COOKIE_NAME}=en`,
          "x-vercel-ip-country": "ES",
        }),
      ),
    ).toBeUndefined();
  });

  test("skips API, machine-readable, and asset requests", () => {
    expect(shouldDetectCountryLocale(request("/new"))).toBe(true);
    expect(shouldDetectCountryLocale(request("/api/preview"))).toBe(false);
    expect(shouldDetectCountryLocale(request("/llms.txt"))).toBe(false);
    expect(shouldDetectCountryLocale(request("/favicon/favicon.svg"))).toBe(false);
  });

  test("injects and reads the Paraglide locale cookie", () => {
    const nextRequest = requestWithLocaleCookie(request("/new", { Cookie: "theme=dark" }), "zh");

    expect(nextRequest.headers.get("Cookie")).toContain("theme=dark");
    expect(nextRequest.headers.get("Cookie")).toContain(`${LOCALE_COOKIE_NAME}=zh`);
    expect(getRequestLocaleCookie(nextRequest)).toBe("zh");
  });

  test("ignores malformed cookie encoding while reading locale cookies", () => {
    const malformedCookieRequest = request("/new", {
      Cookie: `broken=%E0%A4%A; ${LOCALE_COOKIE_NAME}=es`,
    });

    expect(getRequestLocaleCookie(malformedCookieRequest)).toBe("es");
  });

  test("sets vary headers and persists non-default detected locales", async () => {
    const response = withLocaleResponseHeaders(new Response("ok"), request("/new"), "es");

    expect(response.headers.get("Vary")).toContain("Accept-Language");
    expect(response.headers.get("Vary")).toContain("Cookie");
    expect(response.headers.get("Vary")).toContain("x-vercel-ip-country");
    expect(response.headers.get("Set-Cookie")).toContain(`${LOCALE_COOKIE_NAME}=es`);
    expect(await response.text()).toBe("ok");
  });
});
