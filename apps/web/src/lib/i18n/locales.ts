export const SUPPORTED_LOCALES = [
  "en",
  "es",
  "zh",
  "ja",
  "ko",
  "zh-Hant",
  "de",
  "fr",
  "uk",
] as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
export type LocalizedContentLocale = Exclude<SupportedLocale, "en">;

export const DEFAULT_LOCALE: SupportedLocale = "en";
export const LOCALE_COOKIE_NAME = "BFS_LOCALE";
export const LOCALIZED_CONTENT_LOCALES = SUPPORTED_LOCALES.filter(
  (locale) => locale !== DEFAULT_LOCALE,
) as LocalizedContentLocale[];

export const LOCALE_LABELS: Record<SupportedLocale, string> = {
  en: "English",
  es: "Español",
  zh: "中文",
  ja: "日本語",
  ko: "한국어",
  "zh-Hant": "繁體中文",
  de: "Deutsch",
  fr: "Français",
  uk: "Українська",
};

export const LOCALE_DATE_TAGS: Record<SupportedLocale, string> = {
  en: "en-US",
  es: "es-ES",
  zh: "zh-CN",
  ja: "ja-JP",
  ko: "ko-KR",
  "zh-Hant": "zh-Hant-TW",
  de: "de-DE",
  fr: "fr-FR",
  uk: "uk-UA",
};

const LOCALE_SET = new Set<string>(SUPPORTED_LOCALES);
const LOCALE_BY_LOWERCASE = new Map<Lowercase<SupportedLocale>, SupportedLocale>(
  SUPPORTED_LOCALES.map((locale) => [locale.toLowerCase() as Lowercase<SupportedLocale>, locale]),
);

export function isSupportedLocale(value: string | null | undefined): value is SupportedLocale {
  return typeof value === "string" && LOCALE_SET.has(value);
}

export function toSupportedLocale(value: string | null | undefined): SupportedLocale | undefined {
  if (!value) return undefined;
  const normalized = value.trim().toLowerCase();
  const exactLocale = LOCALE_BY_LOWERCASE.get(normalized as Lowercase<SupportedLocale>);
  if (exactLocale) return exactLocale;

  if (normalized.startsWith("zh-")) {
    return /(?:hant|tw|hk|mo)\b/.test(normalized) ? "zh-Hant" : "zh";
  }

  const language = normalized.split("-")[0] as Lowercase<SupportedLocale>;
  return LOCALE_BY_LOWERCASE.get(language);
}

export function getLocaleDateTag(locale: string | null | undefined): string {
  const supportedLocale = toSupportedLocale(locale) ?? DEFAULT_LOCALE;
  return LOCALE_DATE_TAGS[supportedLocale];
}
