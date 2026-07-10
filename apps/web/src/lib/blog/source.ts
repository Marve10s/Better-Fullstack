import { blogMeta } from "virtual:content-meta";
import { localizedBlogMdxLoaders } from "virtual:localized-content";

import type { TocEntry } from "@/lib/docs/remark-extract-toc";

import { blogMdxLoaders as mdxLoaders, type BlogMdxModule } from "@/lib/blog/mdx-loaders";
import {
  type LocalizedContentLocale,
  type SupportedLocale,
  toSupportedLocale,
} from "@/lib/i18n/locales";
import { createSuspenseCache } from "@/lib/mdx-suspense-cache";
import { getLocale } from "@/paraglide/runtime.js";

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

type LocalizedFrontmatter<T> = Partial<Record<LocalizedContentLocale, T>>;

/**
 * Per-post metadata. The compiled MDX component and toc are loaded on demand
 * via `useBlogPostContent` so post content stays out of the app entry chunk.
 * Mirrors `src/lib/guides/source.ts`.
 */
export type BlogReadingStats = { shortMins: number; longMins: number };

export type BlogPost = {
  slug: string[];
  url: string;
  path: string;
  filePath: string;
  frontmatter: BlogFrontmatter;
  localizedFrontmatter?: LocalizedFrontmatter<BlogFrontmatter>;
  /** Build-time reading time; short excludes `data-long-version` sections. */
  readingStats?: BlogReadingStats;
};

/** Heavy per-post bundle, loaded lazily for the post being viewed. */
export type BlogPostContent = {
  toc: TocEntry[];
  Component: BlogMdxModule["default"];
};

const CONTENT_PREFIX = "/content/blog/";

function currentContentLocale(): SupportedLocale {
  return toSupportedLocale(getLocale()) ?? "en";
}

export function canRenderBlogPostContent(): boolean {
  return true;
}

function localizedFilePath(filePath: string, locale: SupportedLocale): string {
  if (locale === "en") return filePath;
  return filePath.replace(/\.mdx$/, `.${locale}.mdx`);
}

function localizedContentKey(filePath: string, locale: SupportedLocale): string {
  return `${locale}:${filePath}`;
}

function hasLocalizedContent(filePath: string, locale: SupportedLocale): boolean {
  return locale !== "en" && localizedContentKey(filePath, locale) in localizedBlogMdxLoaders;
}

function contentCacheKey(post: BlogPost, locale: SupportedLocale): string {
  return `${post.slug.join("/")}:${locale}`;
}

function normalizeMdxPath(filePath: string): { relativePath: string; slug: string[] } {
  const idx = filePath.indexOf(CONTENT_PREFIX);
  const relativePath = filePath.slice(idx + CONTENT_PREFIX.length);
  const noExt = relativePath.replace(/\.mdx$/, "");
  const segments = noExt.split("/");
  const slug = segments[segments.length - 1] === "index" ? segments.slice(0, -1) : segments;
  return { relativePath, slug };
}

const postsBySlug = new Map<string, BlogPost>();

for (const { filePath, frontmatter, localizedFrontmatter, readingStats } of blogMeta) {
  const { relativePath, slug } = normalizeMdxPath(filePath);
  const url = "/blog" + (slug.length ? `/${slug.join("/")}` : "");
  postsBySlug.set(slug.join("/"), {
    slug,
    url,
    path: relativePath,
    filePath,
    frontmatter: frontmatter ?? {},
    localizedFrontmatter: localizedFrontmatter ?? {},
    readingStats,
  });
}

const contentCache = createSuspenseCache<BlogPostContent>();

async function loadBlogContent(post: BlogPost): Promise<BlogPostContent> {
  const locale = currentContentLocale();
  const localizedKey = localizedContentKey(post.filePath, locale);
  const hasLocalized = hasLocalizedContent(post.filePath, locale);
  const filePath = hasLocalized ? localizedFilePath(post.filePath, locale) : post.filePath;
  const loader = hasLocalized ? localizedBlogMdxLoaders[localizedKey] : mdxLoaders[filePath];
  const module = await loader?.();
  if (!module) throw new Error(`Blog content module missing for ${filePath}`);
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
  return contentCache.read(contentCacheKey(post, currentContentLocale()), () =>
    loadBlogContent(post),
  );
}

/** Start fetching a post's content chunk early (e.g. from a route loader). */
export function preloadBlogPostContent(slug: string[] | undefined): void {
  if (!canRenderBlogPostContent()) return;
  const post = getBlogPost(slug);
  if (!post) return;
  contentCache.preload(contentCacheKey(post, currentContentLocale()), () => loadBlogContent(post));
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
