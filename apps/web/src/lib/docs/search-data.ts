import { getLocale } from "@/paraglide/runtime.js";

import { buildSearchSections, type SearchSection } from "./search";
import { getAllPages, getLocalizedDocFrontmatter, loadAllRawPages } from "./source";

const sectionsPromises = new Map<string, Promise<SearchSection[]>>();

export function loadSearchSections(): Promise<SearchSection[]> {
  const locale = getLocale();
  const existing = sectionsPromises.get(locale);
  if (existing) return existing;

  const promise = loadAllRawPages().then((rawByFilePath) =>
    buildSearchSections(
      getAllPages().map((page) => ({
        url: page.url,
        rawSource: rawByFilePath.get(page.filePath) ?? "",
        frontmatter: getLocalizedDocFrontmatter(page),
      })),
    ),
  );
  sectionsPromises.set(locale, promise);
  return promise;
}
