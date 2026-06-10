import { buildSearchSections, type SearchSection } from "./search";
import { getAllPages, loadAllRawPages } from "./source";

let sectionsPromise: Promise<SearchSection[]> | null = null;

/**
 * Build the search index data on demand: the raw markdown of every docs page
 * is loaded lazily (one fetch per page chunk, memoized) instead of being
 * bundled into the client eagerly.
 */
export function loadSearchSections(): Promise<SearchSection[]> {
  sectionsPromise ??= loadAllRawPages().then((rawByFilePath) =>
    buildSearchSections(
      getAllPages().map((page) => ({
        url: page.url,
        rawSource: rawByFilePath.get(page.filePath) ?? "",
        frontmatter: page.frontmatter,
      })),
    ),
  );
  return sectionsPromise;
}
