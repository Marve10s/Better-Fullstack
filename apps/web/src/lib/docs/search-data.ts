import { buildSearchSections, type SearchSection } from "./search";
import { getAllPages } from "./source";

export const searchSections: SearchSection[] = buildSearchSections(
  getAllPages().map((page) => ({
    url: page.url,
    rawSource: page.raw,
    frontmatter: page.frontmatter,
  })),
);
