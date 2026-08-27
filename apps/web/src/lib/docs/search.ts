import { create, insertMultiple, search } from "@orama/orama";
import matter from "gray-matter";

import type { DocFrontmatter } from "@/lib/docs/source";

export type SearchSection = {
  id: string;
  pageId: string;
  pageTitle: string;
  pageUrl: string;
  sectionTitle: string;
  sectionUrl: string;
  body: string;
  kind: "page" | "heading";
};

export type SearchHit = SearchSection & { score: number };

export function buildSearchSections(
  pages: Array<{ url: string; rawSource?: unknown; frontmatter?: DocFrontmatter }>,
): SearchSection[] {
  const out: SearchSection[] = [];

  for (const page of pages) {
    const rawSource = typeof page.rawSource === "string" ? page.rawSource : "";
    const { data, content } = matter(rawSource);
    const pageTitle = (data?.title as string) ?? page.frontmatter?.title ?? page.url;

    const headingRe = /^(#{2,4})\s+(.+)$/gm;
    let lastIndex = 0;
    let lastSectionTitle = pageTitle;
    let lastSectionUrl = page.url;
    let lastKind: SearchSection["kind"] = "page";

    const flush = (endIndex: number) => {
      const body = content
        .slice(lastIndex, endIndex)
        .replace(/```[\s\S]*?```/g, " ")
        .replace(/`[^`]+`/g, " ")
        .replace(/<\/?[A-Z]\w*(\s[^<>]*)?\/?>/g, " ")
        .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
        .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
        .replace(/[*_~]/g, " ")
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
