import { buildSearchSections, type SearchSection } from "./search";
import { getAllPages, getLocalizedDocFrontmatter, loadAllRawPages } from "./source";
import { getLocale } from "@/paraglide/runtime.js";

const sectionsPromises = new Map<string, Promise<SearchSection[]>>();

/**
 * Build the search index data on demand: the raw markdown of every docs page
 * is loaded lazily (one fetch per page chunk, memoized) instead of being
 * bundled into the client eagerly.
 */
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
