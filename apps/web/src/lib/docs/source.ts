import { docsMeta } from "virtual:content-meta";
import {
  localizedDocsMdxLoaders,
  localizedDocsRawMdxLoaders,
} from "virtual:localized-content";

import {
  type LocalizedContentLocale,
  type SupportedLocale,
  toSupportedLocale,
} from "@/lib/i18n/locales";
import { createSuspenseCache } from "@/lib/mdx-suspense-cache";
import { getLocale } from "@/paraglide/runtime.js";

import {
  docsMdxLoaders as mdxLoaders,
  docsRawMdxLoaders as rawMdxLoaders,
  type DocMdxModule,
} from "@/lib/docs/mdx-loaders";
import type { TocEntry } from "./remark-extract-toc";

/**
 * Frontmatter shape every MDX file is expected to declare. Loosely typed so
 * a missing `description` or `title` doesn't blow up at build time — the
 * route handler renders fallbacks for those cases.
 */
export type DocFrontmatter = {
  title?: string;
  description?: string;
  updated?: string;
  image?: string;
};

/**
 * Each compiled MDX module exposes the React component as default and the
 * named exports our remark plugins emit.
 */
type ContentLocale = SupportedLocale;
type LocalizedFrontmatter<T> = Partial<Record<LocalizedContentLocale, T>>;

/**
 * Sidebar config per directory (mirrors Fumadocs `meta.json` shape so we can
 * keep the existing files). `pages` is an ordered list of names: bare
 * filenames (without `.mdx`), subdirectory names, or `---Label---` separators.
 */
export type MetaFile = {
  title?: string;
  defaultOpen?: boolean;
  pages?: string[];
};

export type PageNode = {
  type: "page";
  name: string;
  slug: string[];
  url: string;
  frontmatter: DocFrontmatter;
};

export type FolderNode = {
  type: "folder";
  name: string;
  defaultOpen: boolean;
  /**
   * Reference to this folder's index page (the `index.mdx` inside it). The
   * sidebar uses the index page's URL when the folder header itself is
   * clicked.
   */
  index?: DocPage;
  children: PageTreeNode[];
};

export type SeparatorNode = {
  type: "separator";
  name: string;
};

export type PageTreeNode = PageNode | FolderNode | SeparatorNode;

/**
 * Per-page metadata exposed to routes, the sidebar, sitemap, etc. The actual
 * MDX component, table of contents, and raw markdown are intentionally NOT
 * here — they live in `DocPageContent` and are loaded on demand via
 * `useDocPageContent` so the full docs content never lands in the app entry
 * chunk. `path` is the on-disk relative path used for "Edit on GitHub" links.
 */
export type DocPage = {
  slug: string[];
  url: string;
  path: string;
  filePath: string;
  frontmatter: DocFrontmatter;
  localizedFrontmatter?: LocalizedFrontmatter<DocFrontmatter>;
};

/** Heavy per-page bundle, loaded lazily for the page being viewed. */
export type DocPageContent = {
  raw: string;
  toc: TocEntry[];
  Component: DocMdxModule["default"];
};

const CONTENT_PREFIX = "/content/docs/";
const DOC_FOLDER_TITLE_TRANSLATIONS: Record<string, LocalizedFrontmatter<{ title: string }>> = {
  "AI Agents": {
    es: { title: "Agentes de IA" },
    zh: { title: "AI 代理" },
    ja: { title: "AI エージェント" },
    ko: { title: "AI 에이전트" },
    "zh-Hant": { title: "AI 代理" },
    de: { title: "KI-Agenten" },
    fr: { title: "Agents IA" },
    uk: { title: "AI-агенти" },
  },
  "Better Fullstack": {
    es: { title: "Better Fullstack" },
    zh: { title: "Better Fullstack" },
    ja: { title: "Better Fullstack" },
    ko: { title: "Better Fullstack" },
    "zh-Hant": { title: "Better Fullstack" },
    de: { title: "Better Fullstack" },
    fr: { title: "Better Fullstack" },
    uk: { title: "Better Fullstack" },
  },
  CLI: {
    es: { title: "CLI" },
    zh: { title: "CLI" },
    ja: { title: "CLI" },
    ko: { title: "CLI" },
    "zh-Hant": { title: "CLI" },
    de: { title: "CLI" },
    fr: { title: "CLI" },
    uk: { title: "CLI" },
  },
  Ecosystems: {
    es: { title: "Ecosistemas" },
    zh: { title: "生态系统" },
    ja: { title: "エコシステム" },
    ko: { title: "생태계" },
    "zh-Hant": { title: "生態系統" },
    de: { title: "Ökosysteme" },
    fr: { title: "Écosystèmes" },
    uk: { title: "Екосистеми" },
  },
  "Getting Started": {
    es: { title: "Primeros pasos" },
    zh: { title: "入门" },
    ja: { title: "はじめに" },
    ko: { title: "시작하기" },
    "zh-Hant": { title: "入門" },
    de: { title: "Erste Schritte" },
    fr: { title: "Bien démarrer" },
    uk: { title: "Початок роботи" },
  },
  Options: {
    es: { title: "Opciones" },
    zh: { title: "选项" },
    ja: { title: "オプション" },
    ko: { title: "옵션" },
    "zh-Hant": { title: "選項" },
    de: { title: "Optionen" },
    fr: { title: "Options" },
    uk: { title: "Опції" },
  },
  "Stack Guides": {
    es: { title: "Guías de stack" },
    zh: { title: "技术栈指南" },
    ja: { title: "スタックガイド" },
    ko: { title: "스택 가이드" },
    "zh-Hant": { title: "技術棧指南" },
    de: { title: "Stack-Guides" },
    fr: { title: "Guides de stack" },
    uk: { title: "Посібники зі стеку" },
  },
  "Provider Setup": {
    es: { title: "Configuración de proveedores" },
    zh: { title: "服务商配置" },
    ja: { title: "プロバイダー設定" },
    ko: { title: "공급자 설정" },
    "zh-Hant": { title: "服務商設定" },
    de: { title: "Provider-Einrichtung" },
    fr: { title: "Configuration des fournisseurs" },
    uk: { title: "Налаштування провайдерів" },
  },
  Reference: {
    es: { title: "Referencia" },
    zh: { title: "参考" },
    ja: { title: "リファレンス" },
    ko: { title: "참조" },
    "zh-Hant": { title: "參考" },
    de: { title: "Referenz" },
    fr: { title: "Référence" },
    uk: { title: "Довідник" },
  },
  Sections: {
    es: { title: "Secciones" },
    zh: { title: "功能分区" },
    ja: { title: "セクション" },
    ko: { title: "섹션" },
    "zh-Hant": { title: "功能分區" },
    de: { title: "Abschnitte" },
    fr: { title: "Sections" },
    uk: { title: "Розділи" },
  },
};

const metaModules = import.meta.glob<{ default: MetaFile }>(
  "../../../content/docs/**/meta.json",
  { eager: true },
);

function currentContentLocale(): ContentLocale {
  return toSupportedLocale(getLocale()) ?? "en";
}

export function canRenderDocPageContent(): boolean {
  return !import.meta.env.SSR || currentContentLocale() === "en";
}

function localizedFilePath(filePath: string, locale: ContentLocale): string {
  if (locale === "en") return filePath;
  return filePath.replace(/\.mdx$/, `.${locale}.mdx`);
}

function localizedContentKey(filePath: string, locale: ContentLocale): string {
  return `${locale}:${filePath}`;
}

function hasLocalizedContent(filePath: string, locale: ContentLocale): boolean {
  return locale !== "en" && localizedContentKey(filePath, locale) in localizedDocsMdxLoaders;
}

function contentCacheKey(page: DocPage, locale: ContentLocale): string {
  return `${page.slug.join("/")}:${locale}`;
}

function localizedFolderName(name: string, locale = currentContentLocale()): string {
  if (locale === "en") return name;
  return DOC_FOLDER_TITLE_TRANSLATIONS[name]?.[locale]?.title ?? name;
}

export function getLocalizedDocFrontmatter(
  page: Pick<DocPage, "frontmatter" | "localizedFrontmatter">,
  locale = currentContentLocale(),
): DocFrontmatter {
  if (locale === "en") return page.frontmatter;
  return page.localizedFrontmatter?.[locale] ?? page.frontmatter;
}

export function localizeDocPage(page: DocPage): DocPage {
  return {
    ...page,
    frontmatter: getLocalizedDocFrontmatter(page),
  };
}

/**
 * Convert a Vite glob path like `../../../content/docs/cli/create.mdx` into a
 * canonical relative path `cli/create.mdx` and the matching slug array.
 */
function normalizeMdxPath(filePath: string): { relativePath: string; slug: string[] } {
  const idx = filePath.indexOf(CONTENT_PREFIX);
  const relativePath = filePath.slice(idx + CONTENT_PREFIX.length);
  const noExt = relativePath.replace(/\.mdx$/, "");
  const segments = noExt.split("/");
  // `index` collapses into the parent (root or section index page).
  const slug = segments[segments.length - 1] === "index" ? segments.slice(0, -1) : segments;
  return { relativePath, slug };
}

function normalizeMetaPath(filePath: string): { dirSlug: string[] } {
  const idx = filePath.indexOf(CONTENT_PREFIX);
  const relativePath = filePath.slice(idx + CONTENT_PREFIX.length).replace(/\/?meta\.json$/, "");
  const dirSlug = relativePath ? relativePath.split("/") : [];
  return { dirSlug };
}

/**
 * Build a stable lookup keyed by joined slug ("" for root, "cli/create" for
 * leaf pages). Lookups happen at module init time so route handlers run in
 * O(1).
 */
const pagesBySlug = new Map<string, DocPage>();
for (const { filePath, frontmatter, localizedFrontmatter } of docsMeta) {
  const { relativePath, slug } = normalizeMdxPath(filePath);
  const url = "/docs" + (slug.length ? "/" + slug.join("/") : "");
  const key = slug.join("/");
  pagesBySlug.set(key, {
    slug,
    url,
    path: relativePath,
    filePath,
    frontmatter: frontmatter ?? {},
    localizedFrontmatter: localizedFrontmatter ?? {},
  });
}

const contentCache = createSuspenseCache<DocPageContent>();

async function loadPageContent(page: DocPage): Promise<DocPageContent> {
  const locale = currentContentLocale();
  const localizedKey = localizedContentKey(page.filePath, locale);
  const hasLocalized = hasLocalizedContent(page.filePath, locale);
  const filePath = hasLocalized ? localizedFilePath(page.filePath, locale) : page.filePath;
  const moduleLoader = hasLocalized ? localizedDocsMdxLoaders[localizedKey] : mdxLoaders[filePath];
  const rawLoader = hasLocalized
    ? localizedDocsRawMdxLoaders[localizedKey]
    : rawMdxLoaders[filePath];
  const [module, raw] = await Promise.all([
    moduleLoader?.(),
    rawLoader?.(),
  ]);
  if (!module) throw new Error(`Docs content module missing for ${filePath}`);
  return {
    raw: raw ?? "",
    toc: module.toc ?? [],
    Component: module.default,
  };
}

/**
 * Suspense hook: returns the page's MDX component/toc/raw, suspending while
 * the chunk loads. Callers must render inside a `<Suspense>` boundary.
 */
export function useDocPageContent(page: DocPage): DocPageContent {
  return contentCache.read(contentCacheKey(page, currentContentLocale()), () =>
    loadPageContent(page),
  );
}

/** Start fetching a page's content chunk early (e.g. from a route loader). */
export function preloadDocPageContent(slug: string[] | undefined): void {
  if (!canRenderDocPageContent()) return;
  const page = getPage(slug);
  if (!page) return;
  contentCache.preload(contentCacheKey(page, currentContentLocale()), () => loadPageContent(page));
}

/**
 * Load the raw markdown of every docs page, keyed by glob file path. Used by
 * the search index — heavy, so callers must be lazy (e.g. on dialog open).
 */
export async function loadAllRawPages(): Promise<Map<string, string>> {
  const locale = currentContentLocale();
  const entries = await Promise.all(
    getAllPages().map(async (page) => {
      const localizedKey = localizedContentKey(page.filePath, locale);
      const hasLocalized = hasLocalizedContent(page.filePath, locale);
      const filePath = hasLocalized ? localizedFilePath(page.filePath, locale) : page.filePath;
      const rawLoader = hasLocalized
        ? localizedDocsRawMdxLoaders[localizedKey]
        : rawMdxLoaders[filePath];
      return [page.filePath, (await rawLoader?.()) ?? ""] as const;
    }),
  );
  return new Map(entries);
}

const metaByDir = new Map<string, MetaFile>();
for (const [filePath, module] of Object.entries(metaModules)) {
  const { dirSlug } = normalizeMetaPath(filePath);
  metaByDir.set(dirSlug.join("/"), module.default);
}

function buildFolder(
  dirSlug: string[],
  meta: MetaFile | undefined,
  visited: Set<string>,
): FolderNode {
  const key = dirSlug.join("/");
  if (visited.has(key)) {
    // Defensive guard against accidental meta.json self-references.
    return {
      type: "folder",
      name: meta?.title ?? key,
      defaultOpen: meta?.defaultOpen ?? false,
      children: [],
    };
  }
  visited.add(key);

  const indexPage = pagesBySlug.get(key);
  const children: PageTreeNode[] = [];

  // If meta.json declares `pages`, use it as the ordering. Otherwise fall
  // back to alphabetical leaf pages in this directory.
  const declared = meta?.pages;
  if (declared && declared.length > 0) {
    for (const entry of declared) {
      // Separator: ---Label---
      const separator = entry.match(/^---(.+)---$/);
      if (separator) {
        children.push({ type: "separator", name: separator[1].trim() });
        continue;
      }

      const childKey = key ? `${key}/${entry}` : entry;
      const page = pagesBySlug.get(childKey);
      const childMeta = metaByDir.get(childKey);

      if (page && !childMeta) {
        // Leaf page in current directory.
        if (entry === "index" && page.slug.join("/") === key) {
          // Skip — the folder's index is rendered as the folder header link.
          continue;
        }
        children.push({
          type: "page",
          name: page.frontmatter.title ?? entry,
          slug: page.slug,
          url: page.url,
          frontmatter: page.frontmatter,
        });
        continue;
      }

      if (childMeta || hasPagesUnder(childKey)) {
        // Subdirectory; recurse.
        const childDirSlug = childKey.split("/");
        const folder = buildFolder(childDirSlug, childMeta, visited);
        children.push(folder);
        continue;
      }
    }
  } else {
    // No meta.json: emit pages from this directory alphabetically.
    for (const [childKey, page] of pagesBySlug.entries()) {
      const parent = childKey.includes("/")
        ? childKey.slice(0, childKey.lastIndexOf("/"))
        : "";
      if (parent !== key) continue;
      if (page.slug.join("/") === key) continue; // index handled above
      children.push({
        type: "page",
        name: page.frontmatter.title ?? page.slug[page.slug.length - 1],
        slug: page.slug,
        url: page.url,
        frontmatter: page.frontmatter,
      });
    }
    children.sort((a, b) => a.name.localeCompare(b.name));
  }

  return {
    type: "folder",
    name: meta?.title ?? indexPage?.frontmatter.title ?? key,
    defaultOpen: meta?.defaultOpen ?? true,
    index: indexPage,
    children,
  };
}

function hasPagesUnder(prefix: string): boolean {
  const needle = prefix ? prefix + "/" : "";
  for (const key of pagesBySlug.keys()) {
    if (!needle) return true;
    if (key === prefix) return true;
    if (key.startsWith(needle)) return true;
  }
  return false;
}

export const pageTree: FolderNode = buildFolder([], metaByDir.get(""), new Set());

export function getPage(slug: string[] | undefined): DocPage | undefined {
  return pagesBySlug.get((slug ?? []).join("/"));
}

export function getAllSlugs(): string[][] {
  return Array.from(pagesBySlug.values()).map((page) => page.slug);
}

export function getAllPages(): DocPage[] {
  return Array.from(pagesBySlug.values());
}

function localizePageNode(node: PageNode): PageNode {
  const page = pagesBySlug.get(node.slug.join("/"));
  const frontmatter = page ? getLocalizedDocFrontmatter(page) : node.frontmatter;
  return {
    ...node,
    name: frontmatter.title ?? node.name,
    frontmatter,
  };
}

function localizePageTreeNode(node: PageTreeNode): PageTreeNode {
  if (node.type === "separator") return node;
  if (node.type === "page") return localizePageNode(node);
  return {
    ...node,
    name: localizedFolderName(node.name),
    index: node.index ? localizeDocPage(node.index) : undefined,
    children: node.children.map(localizePageTreeNode),
  };
}

export function getLocalizedPageTree(): FolderNode {
  return localizePageTreeNode(pageTree) as FolderNode;
}

/**
 * Flatten the page tree into a linear list of pages in sidebar order — used
 * to compute prev/next pagination links and to render the linear list in
 * mobile menus.
 */
export function flattenPages(node: PageTreeNode = pageTree): PageNode[] {
  const localizedRoot = node === pageTree ? getLocalizedPageTree() : node;
  const out: PageNode[] = [];
  const walk = (n: PageTreeNode) => {
    if (n.type === "separator") return;
    if (n.type === "page") {
      out.push(n);
      return;
    }
    if (n.index) {
      out.push({
        type: "page",
        name: n.index.frontmatter.title ?? n.name,
        slug: n.index.slug,
        url: n.index.url,
        frontmatter: n.index.frontmatter,
      });
    }
    for (const child of n.children) walk(child);
  };
  walk(localizedRoot);
  return out;
}

export function getNeighbors(slug: string[]): {
  previous: PageNode | null;
  next: PageNode | null;
} {
  const linear = flattenPages();
  const target = slug.join("/");
  const idx = linear.findIndex((page) => page.slug.join("/") === target);
  if (idx === -1) return { previous: null, next: null };
  return {
    previous: idx > 0 ? linear[idx - 1] : null,
    next: idx < linear.length - 1 ? linear[idx + 1] : null,
  };
}
