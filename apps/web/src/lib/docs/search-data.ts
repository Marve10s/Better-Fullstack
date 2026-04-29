import type { SearchSection } from "./search";
import { getAllSlugs, getPage } from "./source";

function getPageSections(): SearchSection[] {
  return getAllSlugs().flatMap((slug) => {
    const page = getPage(slug);
    if (!page) return [];

    const pageTitle = page.frontmatter.title ?? page.url;
    const pageBody = page.frontmatter.description ?? "";

    const sections: SearchSection[] = [
      {
        id: `${page.url}#page`,
        pageId: page.url,
        pageTitle,
        pageUrl: page.url,
        sectionTitle: pageTitle,
        sectionUrl: page.url,
        body: pageBody,
        kind: "page",
      },
    ];

    for (const entry of page.toc) {
      sections.push({
        id: `${page.url}#${entry.id}`,
        pageId: page.url,
        pageTitle,
        pageUrl: page.url,
        sectionTitle: entry.text,
        sectionUrl: `${page.url}#${entry.id}`,
        body: pageBody,
        kind: "heading",
      });
    }

    return sections;
  });
}

export const searchSections: SearchSection[] = getPageSections();
