import { describe, expect, test } from "bun:test";

import { getLocalizedCategoryDisplayName } from "@/lib/i18n/builder-copy";
import { getLocale, setLocale } from "@/paraglide/runtime.js";

describe("expanded builder category translations", () => {
  test("translates Crystal and Elixir categories in every supported non-English locale", () => {
    const originalLocale = getLocale();
    const categories = [
      "crystalOrm",
      "crystalAuth",
      "crystalTesting",
      "crystalValidation",
      "crystalCache",
      "crystalJobs",
      "elixirLogging",
      "elixirConfig",
      "elixirMessageQueue",
      "elixirTemplating",
      "elixirCli",
    ];

    try {
      for (const locale of ["es", "zh", "ja", "ko", "zh-Hant", "de", "fr", "uk"] as const) {
        setLocale(locale, { reload: false });
        for (const category of categories) {
          expect(
            getLocalizedCategoryDisplayName(category, "untranslated"),
            `${locale}:${category}`,
          ).not.toBe("untranslated");
        }
      }
    } finally {
      setLocale(originalLocale, { reload: false });
    }
  });
});
