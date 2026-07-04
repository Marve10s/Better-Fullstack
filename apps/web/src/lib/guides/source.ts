import { guidesMeta } from "virtual:content-meta";
import { localizedGuideMdxLoaders } from "virtual:localized-content";

import type { TocEntry } from "@/lib/docs/remark-extract-toc";
import { guideMdxLoaders as mdxLoaders, type GuideMdxModule } from "@/lib/guides/mdx-loaders";

import {
  type LocalizedContentLocale,
  type SupportedLocale,
  toSupportedLocale,
} from "@/lib/i18n/locales";
import { createSuspenseCache } from "@/lib/mdx-suspense-cache";
import { getLocale } from "@/paraglide/runtime.js";

export type GuideFrontmatter = {
  title?: string;
  description?: string;
  updated?: string;
  image?: string;
  category?: string;
  tags?: string[];
  keywords?: string[];
};

type LocalizedFrontmatter<T> = Partial<Record<LocalizedContentLocale, T>>;

/**
 * Per-guide metadata. The compiled MDX component and toc are loaded on demand
 * via `useGuidePageContent` so guide content stays out of the app entry chunk.
 */
export type GuidePage = {
  slug: string[];
  url: string;
  path: string;
  filePath: string;
  frontmatter: GuideFrontmatter;
  localizedFrontmatter?: LocalizedFrontmatter<GuideFrontmatter>;
};

/** Heavy per-guide bundle, loaded lazily for the page being viewed. */
export type GuidePageContent = {
  toc: TocEntry[];
  Component: GuideMdxModule["default"];
};

const CONTENT_PREFIX = "/content/guides/";

function currentContentLocale(): SupportedLocale {
  return toSupportedLocale(getLocale()) ?? "en";
}

export function canRenderGuidePageContent(): boolean {
  return !import.meta.env.SSR || currentContentLocale() === "en";
}

function localizedFilePath(filePath: string, locale: SupportedLocale): string {
  if (locale === "en") return filePath;
  return filePath.replace(/\.mdx$/, `.${locale}.mdx`);
}

function localizedContentKey(filePath: string, locale: SupportedLocale): string {
  return `${locale}:${filePath}`;
}

function hasLocalizedContent(filePath: string, locale: SupportedLocale): boolean {
  return locale !== "en" && localizedContentKey(filePath, locale) in localizedGuideMdxLoaders;
}

function contentCacheKey(page: GuidePage, locale: SupportedLocale): string {
  return `${page.slug.join("/")}:${locale}`;
}

function normalizeMdxPath(filePath: string): { relativePath: string; slug: string[] } {
  const idx = filePath.indexOf(CONTENT_PREFIX);
  const relativePath = filePath.slice(idx + CONTENT_PREFIX.length);
  const noExt = relativePath.replace(/\.mdx$/, "");
  const segments = noExt.split("/");
  const slug = segments[segments.length - 1] === "index" ? segments.slice(0, -1) : segments;
  return { relativePath, slug };
}

const pagesBySlug = new Map<string, GuidePage>();

for (const { filePath, frontmatter, localizedFrontmatter } of guidesMeta) {
  const { relativePath, slug } = normalizeMdxPath(filePath);
  const url = "/guides" + (slug.length ? `/${slug.join("/")}` : "");
  pagesBySlug.set(slug.join("/"), {
    slug,
    url,
    path: relativePath,
    filePath,
    frontmatter: frontmatter ?? {},
    localizedFrontmatter: localizedFrontmatter ?? {},
  });
}

const contentCache = createSuspenseCache<GuidePageContent>();

async function loadGuideContent(page: GuidePage): Promise<GuidePageContent> {
  const locale = currentContentLocale();
  const localizedKey = localizedContentKey(page.filePath, locale);
  const hasLocalized = hasLocalizedContent(page.filePath, locale);
  const filePath = hasLocalized ? localizedFilePath(page.filePath, locale) : page.filePath;
  const loader = hasLocalized ? localizedGuideMdxLoaders[localizedKey] : mdxLoaders[filePath];
  const module = await loader?.();
  if (!module) throw new Error(`Guide content module missing for ${filePath}`);
  return {
    toc: module.toc ?? [],
    Component: module.default,
  };
}

/**
 * Suspense hook: returns the guide's MDX component/toc, suspending while the
 * chunk loads. Callers must render inside a `<Suspense>` boundary.
 */
export function useGuidePageContent(page: GuidePage): GuidePageContent {
  return contentCache.read(contentCacheKey(page, currentContentLocale()), () => loadGuideContent(page));
}

/** Start fetching a guide's content chunk early (e.g. from a route loader). */
export function preloadGuidePageContent(slug: string[] | undefined): void {
  if (!canRenderGuidePageContent()) return;
  const page = getGuidePage(slug);
  if (!page) return;
  contentCache.preload(contentCacheKey(page, currentContentLocale()), () => loadGuideContent(page));
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
