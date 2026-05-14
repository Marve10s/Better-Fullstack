import type { ComponentType } from "react";

import type { TocEntry } from "@/lib/docs/remark-extract-toc";

export type GuideFrontmatter = {
  title?: string;
  description?: string;
  updated?: string;
  image?: string;
  category?: string;
  tags?: string[];
  keywords?: string[];
};

type MdxModule = {
  default: ComponentType<{ components?: Record<string, ComponentType<unknown>> }>;
  frontmatter?: GuideFrontmatter;
  toc?: TocEntry[];
};

export type GuidePage = {
  slug: string[];
  url: string;
  path: string;
  frontmatter: GuideFrontmatter;
  toc: TocEntry[];
  Component: MdxModule["default"];
};

const CONTENT_PREFIX = "/content/guides/";

const mdxModules = import.meta.glob<MdxModule>("../../../content/guides/**/*.mdx", {
  eager: true,
});

function normalizeMdxPath(filePath: string): { relativePath: string; slug: string[] } {
  const idx = filePath.indexOf(CONTENT_PREFIX);
  const relativePath = filePath.slice(idx + CONTENT_PREFIX.length);
  const noExt = relativePath.replace(/\.mdx$/, "");
  const segments = noExt.split("/");
  const slug = segments[segments.length - 1] === "index" ? segments.slice(0, -1) : segments;
  return { relativePath, slug };
}

const pagesBySlug = new Map<string, GuidePage>();

for (const [filePath, module] of Object.entries(mdxModules)) {
  const { relativePath, slug } = normalizeMdxPath(filePath);
  const url = "/guides" + (slug.length ? `/${slug.join("/")}` : "");
  pagesBySlug.set(slug.join("/"), {
    slug,
    url,
    path: relativePath,
    frontmatter: module.frontmatter ?? {},
    toc: module.toc ?? [],
    Component: module.default,
  });
}

export function getGuidePage(slug: string[] | undefined): GuidePage | undefined {
  return pagesBySlug.get((slug ?? []).join("/"));
}

export function getAllGuidePages(): GuidePage[] {
  return Array.from(pagesBySlug.values()).sort((a, b) => {
    if (a.slug.length === 0) return -1;
    if (b.slug.length === 0) return 1;
    return (a.frontmatter.title ?? a.url).localeCompare(b.frontmatter.title ?? b.url);
  });
}

export function getGuideListPages(): GuidePage[] {
  return getAllGuidePages().filter((page) => page.slug.length > 0);
}

export function getRelatedGuidePages(page: GuidePage, limit = 4): GuidePage[] {
  if (page.slug.length === 0) return [];

  const currentTags = new Set(page.frontmatter.tags ?? []);
  const currentKeywords = new Set(page.frontmatter.keywords ?? []);
  const currentCategory = page.frontmatter.category;

  return getGuideListPages()
    .filter((candidate) => candidate.url !== page.url)
    .map((candidate) => {
      let score = 0;

      if (currentCategory && candidate.frontmatter.category === currentCategory) {
        score += 3;
      }

      for (const tag of candidate.frontmatter.tags ?? []) {
        if (currentTags.has(tag)) score += 2;
      }

      for (const keyword of candidate.frontmatter.keywords ?? []) {
        if (currentKeywords.has(keyword)) score += 1;
      }

      return { candidate, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return (a.candidate.frontmatter.title ?? a.candidate.url).localeCompare(
        b.candidate.frontmatter.title ?? b.candidate.url,
      );
    })
    .slice(0, limit)
    .map((entry) => entry.candidate);
}
