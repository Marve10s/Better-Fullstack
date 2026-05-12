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

type RawMdxModule = string;

export type GuidePage = {
  slug: string[];
  url: string;
  path: string;
  raw: string;
  frontmatter: GuideFrontmatter;
  toc: TocEntry[];
  Component: MdxModule["default"];
};

const CONTENT_PREFIX = "/content/guides/";

const mdxModules = import.meta.glob<MdxModule>("../../../content/guides/**/*.mdx", {
  eager: true,
});

const rawMdxModules = import.meta.glob<RawMdxModule>("../../../content/guides/**/*.mdx", {
  eager: true,
  query: "?raw",
  import: "default",
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
    raw: rawMdxModules[filePath] ?? "",
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
