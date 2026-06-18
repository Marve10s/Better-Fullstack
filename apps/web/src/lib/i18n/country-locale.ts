import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE_NAME,
  type SupportedLocale,
  isSupportedLocale,
} from "./locales";

const COUNTRY_HEADER_NAMES = [
  "x-vercel-ip-country",
  "cf-ipcountry",
  "x-country-code",
  "x-ip-country",
  "x-geo-country",
] as const;

const SPANISH_COUNTRIES = [
  "ES",
  "MX",
  "AR",
  "CO",
  "CL",
  "PE",
  "VE",
  "EC",
  "GT",
  "CU",
  "BO",
  "DO",
  "HN",
  "PY",
  "SV",
  "NI",
  "CR",
  "PA",
  "UY",
  "PR",
] as const;

const SIMPLIFIED_CHINESE_COUNTRIES = ["CN"] as const;
const TRADITIONAL_CHINESE_COUNTRIES = ["HK", "MO", "TW"] as const;
const JAPANESE_COUNTRIES = ["JP"] as const;
const KOREAN_COUNTRIES = ["KR"] as const;
const GERMAN_COUNTRIES = ["DE"] as const;
const FRENCH_COUNTRIES = ["FR"] as const;

const COUNTRY_LOCALE_ENTRIES: Array<[readonly string[], SupportedLocale]> = [
  [SPANISH_COUNTRIES, "es"],
  [SIMPLIFIED_CHINESE_COUNTRIES, "zh"],
  [TRADITIONAL_CHINESE_COUNTRIES, "zh-Hant"],
  [JAPANESE_COUNTRIES, "ja"],
  [KOREAN_COUNTRIES, "ko"],
  [GERMAN_COUNTRIES, "de"],
  [FRENCH_COUNTRIES, "fr"],
];

const COUNTRY_LOCALE_MAP = new Map<string, SupportedLocale>();
for (const [countries, locale] of COUNTRY_LOCALE_ENTRIES) {
  for (const country of countries) {
    COUNTRY_LOCALE_MAP.set(country, locale);
  }
}

function parseCookieHeader(cookieHeader: string | null): Map<string, string> {
  const cookies = new Map<string, string>();
  if (!cookieHeader) return cookies;

  for (const part of cookieHeader.split(";")) {
    const [rawName, ...rawValue] = part.trim().split("=");
    if (!rawName) continue;
    const value = rawValue.join("=");
    try {
      cookies.set(rawName, decodeURIComponent(value));
    } catch {
      cookies.set(rawName, value);
    }
  }

  return cookies;
}

function appendCookieHeader(cookieHeader: string | null, name: string, value: string): string {
  const nextCookie = `${name}=${encodeURIComponent(value)}`;
  return cookieHeader && cookieHeader.trim().length > 0 ? `${cookieHeader}; ${nextCookie}` : nextCookie;
}

function appendVary(headers: Headers, values: readonly string[]) {
  const existing = headers.get("Vary");
  const varyValues = new Set(
    existing
      ?.split(",")
      .map((value) => value.trim())
      .filter(Boolean) ?? [],
  );

  for (const value of values) {
    varyValues.add(value);
  }

  headers.set("Vary", [...varyValues].join(", "));
}

export function localeFromCountry(country: string | null | undefined): SupportedLocale | undefined {
  if (!country) return undefined;
  return COUNTRY_LOCALE_MAP.get(country.trim().toUpperCase());
}

export function localeFromRequestCountry(request: Request): SupportedLocale | undefined {
  for (const header of COUNTRY_HEADER_NAMES) {
    const locale = localeFromCountry(request.headers.get(header));
    if (locale) return locale;
  }

  return undefined;
}

export function getRequestLocaleCookie(request: Request): SupportedLocale | undefined {
  const value = parseCookieHeader(request.headers.get("Cookie")).get(LOCALE_COOKIE_NAME);
  return isSupportedLocale(value) ? value : undefined;
}

export function shouldDetectCountryLocale(request: Request): boolean {
  const url = new URL(request.url);
  if (url.pathname.startsWith("/api/")) return false;
  if (url.pathname === "/sitemap.xml" || url.pathname === "/robots.txt" || url.pathname === "/llms.txt") {
    return false;
  }
  if (/\.[a-z0-9]+$/i.test(url.pathname)) return false;
  return getRequestLocaleCookie(request) === undefined;
}

export function requestWithLocaleCookie(request: Request, locale: SupportedLocale): Request {
  const headers = new Headers(request.headers);
  headers.set("Cookie", appendCookieHeader(headers.get("Cookie"), LOCALE_COOKIE_NAME, locale));
  return new Request(request, { headers });
}

export function resolveCountryLocale(request: Request): SupportedLocale | undefined {
  if (!shouldDetectCountryLocale(request)) return undefined;
  return localeFromRequestCountry(request);
}

export function withLocaleResponseHeaders(
  response: Response,
  request: Request,
  locale?: SupportedLocale,
): Response {
  const headers = new Headers(response.headers);
  appendVary(headers, ["Accept-Language", "Cookie", ...COUNTRY_HEADER_NAMES]);

  if (locale && locale !== DEFAULT_LOCALE) {
    const secure = new URL(request.url).protocol === "https:" ? "; Secure" : "";
    headers.append(
      "Set-Cookie",
      `${LOCALE_COOKIE_NAME}=${encodeURIComponent(locale)}; Path=/; Max-Age=34560000; SameSite=Lax${secure}`,
    );
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
