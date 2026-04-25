import { create, insertMultiple, search } from "@orama/orama";
import matter from "gray-matter";

import type { DocFrontmatter } from "./source";

/**
 * Each searchable section corresponds to one heading-anchored chunk inside a
 * doc page. Pages are split on h2/h3 boundaries so results can deep-link to
 * the specific section that matched, the same UX Fumadocs and Algolia
 * DocSearch use.
 */
export type SearchSection = {
  id: string;
  pageId: string;
  pageTitle: string;
  pageUrl: string;
  sectionTitle: string;
  sectionUrl: string;
  body: string;
  /** "page" for the title section, "heading" otherwise. */
  kind: "page" | "heading";
};

export type SearchHit = SearchSection & { score: number };

/**
 * Build the searchable-section list from raw MDX strings + their resolved
 * URL/title. Runs once at module load (build-time on the server, then
 * shipped to the client) — the docs corpus is small (~30 pages) so this
 * stays cheap.
 */
export function buildSearchSections(
  pages: Array<{ url: string; rawSource: string; frontmatter?: DocFrontmatter }>,
): SearchSection[] {
  const out: SearchSection[] = [];

  for (const page of pages) {
    // Parse frontmatter so its YAML doesn't leak into the search body.
    const { data, content } = matter(page.rawSource);
    const pageTitle = (data?.title as string) ?? page.frontmatter?.title ?? page.url;

    // Split on top-level (## / ###) headings. Anything before the first
    // heading is treated as the page-title section so the page itself is
    // searchable too.
    const headingRe = /^(#{2,4})\s+(.+)$/gm;
    let lastIndex = 0;
    let lastSectionTitle = pageTitle;
    let lastSectionUrl = page.url;
    let lastKind: SearchSection["kind"] = "page";

    const flush = (endIndex: number) => {
      const body = content
        .slice(lastIndex, endIndex)
        .replace(/```[\s\S]*?```/g, " ") // drop fenced code
        .replace(/`[^`]+`/g, " ") // drop inline code
        .replace(/!\[[^\]]*\]\([^)]*\)/g, " ") // drop images
        .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1") // unwrap links
        .replace(/[*_~]/g, " ") // strip markdown emphasis chars
        .replace(/\s+/g, " ")
        .trim();
      if (!body && lastKind !== "page") return;
      out.push({
        id: `${page.url}#${slugify(lastSectionTitle)}`,
        pageId: page.url,
        pageTitle,
        pageUrl: page.url,
        sectionTitle: lastSectionTitle,
        sectionUrl: lastSectionUrl,
        body,
        kind: lastKind,
      });
    };

    let match: RegExpExecArray | null;
    while ((match = headingRe.exec(content)) !== null) {
      flush(match.index);
      const sectionTitle = match[2].trim();
      const sectionSlug = slugify(sectionTitle);
      lastSectionTitle = sectionTitle;
      lastSectionUrl = `${page.url}#${sectionSlug}`;
      lastKind = "heading";
      lastIndex = match.index + match[0].length;
    }
    flush(content.length);
  }

  return out;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Wraps Orama with a stable, async-free `query()` returning ordered hits
 * trimmed to a fixed limit. Initialisation is async (Orama's API), but we
 * memoise the resolved instance behind a promise so callers await exactly
 * once.
 */
export type DocSearch = {
  query(input: string, limit?: number): Promise<SearchHit[]>;
};

export async function createDocSearch(sections: SearchSection[]): Promise<DocSearch> {
  const db = create({
    schema: {
      pageTitle: "string",
      sectionTitle: "string",
      body: "string",
    },
    components: {
      tokenizer: { language: "english", stemming: true },
    },
  });

  await insertMultiple(
    db,
    sections.map((section, index) => ({
      id: `${section.id}::${index}`,
      pageTitle: section.pageTitle,
      sectionTitle: section.sectionTitle,
      body: section.body,
      // Orama strips unknown fields when searching; we keep the original
      // section in a side map indexed by id so we can rehydrate on hit.
    })),
  );

  const sectionByOramaId = new Map<string, SearchSection>();
  sections.forEach((section, index) => {
    sectionByOramaId.set(`${section.id}::${index}`, section);
  });

  return {
    async query(input, limit = 16) {
      if (!input.trim()) return [];
      const result = await search(db, {
        term: input,
        properties: ["pageTitle", "sectionTitle", "body"],
        boost: { pageTitle: 2.5, sectionTitle: 2.0, body: 1.0 },
        limit,
        tolerance: 1,
      });
      return result.hits
        .map((hit) => {
          const section = sectionByOramaId.get(String(hit.id));
          if (!section) return null;
          return { ...section, score: hit.score };
        })
        .filter((hit): hit is SearchHit => hit !== null);
    },
  };
}
