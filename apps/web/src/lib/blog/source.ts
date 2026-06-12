import type { ComponentType } from "react";

import { blogMeta } from "virtual:content-meta";

import type { TocEntry } from "@/lib/docs/remark-extract-toc";

import { createSuspenseCache } from "@/lib/mdx-suspense-cache";

export type BlogFrontmatter = {
  title?: string;
  description?: string;
  /** ISO date, e.g. 2026-06-12 */
  date?: string;
  authors?: string[];
  image?: string;
  tags?: string[];
  keywords?: string[];
};

type MdxModule = {
  default: ComponentType<{ components?: Record<string, ComponentType<unknown>> }>;
  frontmatter?: BlogFrontmatter;
  toc?: TocEntry[];
};

/**
 * Per-post metadata. The compiled MDX component and toc are loaded on demand
 * via `useBlogPostContent` so post content stays out of the app entry chunk.
 * Mirrors `src/lib/guides/source.ts`.
 */
export type BlogPost = {
  slug: string[];
  url: string;
  path: string;
  filePath: string;
  frontmatter: BlogFrontmatter;
};

/** Heavy per-post bundle, loaded lazily for the post being viewed. */
export type BlogPostContent = {
  toc: TocEntry[];
  Component: MdxModule["default"];
};

const CONTENT_PREFIX = "/content/blog/";

// Lazy: each post's compiled MDX module is its own chunk. Frontmatter comes
// from `virtual:content-meta` (see vite-plugins/content-meta) — importing it
// from the MDX modules here would fuse them into this chunk.
const mdxLoaders = import.meta.glob<MdxModule>("../../../content/blog/**/*.mdx");

function normalizeMdxPath(filePath: string): { relativePath: string; slug: string[] } {
  const idx = filePath.indexOf(CONTENT_PREFIX);
  const relativePath = filePath.slice(idx + CONTENT_PREFIX.length);
  const noExt = relativePath.replace(/\.mdx$/, "");
  const segments = noExt.split("/");
  const slug = segments[segments.length - 1] === "index" ? segments.slice(0, -1) : segments;
  return { relativePath, slug };
}

const postsBySlug = new Map<string, BlogPost>();

for (const { filePath, frontmatter } of blogMeta) {
  const { relativePath, slug } = normalizeMdxPath(filePath);
  const url = "/blog" + (slug.length ? `/${slug.join("/")}` : "");
  postsBySlug.set(slug.join("/"), {
    slug,
    url,
    path: relativePath,
    filePath,
    frontmatter: frontmatter ?? {},
  });
}

const contentCache = createSuspenseCache<BlogPostContent>();

async function loadBlogContent(post: BlogPost): Promise<BlogPostContent> {
  const module = await mdxLoaders[post.filePath]?.();
  if (!module) throw new Error(`Blog content module missing for ${post.filePath}`);
  return {
    toc: module.toc ?? [],
    Component: module.default,
  };
}

/**
 * Suspense hook: returns the post's MDX component/toc, suspending while the
 * chunk loads. Callers must render inside a `<Suspense>` boundary.
 */
export function useBlogPostContent(post: BlogPost): BlogPostContent {
  return contentCache.read(post.slug.join("/"), () => loadBlogContent(post));
}

/** Start fetching a post's content chunk early (e.g. from a route loader). */
export function preloadBlogPostContent(slug: string[] | undefined): void {
  const post = getBlogPost(slug);
  if (!post) return;
  contentCache.preload(post.slug.join("/"), () => loadBlogContent(post));
}

export function getBlogPost(slug: string[] | undefined): BlogPost | undefined {
  return postsBySlug.get((slug ?? []).join("/"));
}

/** All posts, newest first. */
export function getAllBlogPosts(): BlogPost[] {
  return Array.from(postsBySlug.values()).sort((a, b) =>
    (b.frontmatter.date ?? "").localeCompare(a.frontmatter.date ?? ""),
  );
}
