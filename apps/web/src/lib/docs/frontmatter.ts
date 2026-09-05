import type { DocPage, DocFrontmatter } from "@/lib/docs/source";

import { toSupportedLocale } from "@/lib/i18n/locales";
import { getLocale } from "@/paraglide/runtime.js";

export function getLocalizedDocFrontmatter(
  page: Pick<DocPage, "frontmatter" | "localizedFrontmatter">,
  locale = toSupportedLocale(getLocale()) ?? "en",
): DocFrontmatter {
  if (locale === "en" || page.frontmatter.translationStatus === "pending") {
    return page.frontmatter;
  }
  return {
    ...page.frontmatter,
    ...page.localizedFrontmatter?.[locale],
  };
}
