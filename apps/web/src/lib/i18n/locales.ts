export const SUPPORTED_LOCALES = ["en", "es", "zh"] as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: SupportedLocale = "en";
export const LOCALE_COOKIE_NAME = "BFS_LOCALE";

export const LOCALE_LABELS: Record<SupportedLocale, string> = {
  en: "English",
  es: "Español",
  zh: "中文",
};

export const LOCALE_DATE_TAGS: Record<SupportedLocale, string> = {
  en: "en-US",
  es: "es-ES",
  zh: "zh-CN",
};

const LOCALE_SET = new Set<string>(SUPPORTED_LOCALES);

export function isSupportedLocale(value: string | null | undefined): value is SupportedLocale {
  return typeof value === "string" && LOCALE_SET.has(value);
}

export function toSupportedLocale(value: string | null | undefined): SupportedLocale | undefined {
  if (!value) return undefined;
  const normalized = value.toLowerCase().split("-")[0];
  return isSupportedLocale(normalized) ? normalized : undefined;
}

export function getLocaleDateTag(locale: string | null | undefined): string {
  const supportedLocale = toSupportedLocale(locale) ?? DEFAULT_LOCALE;
  return LOCALE_DATE_TAGS[supportedLocale];
}
