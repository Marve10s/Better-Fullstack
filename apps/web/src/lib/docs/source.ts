import type { ComponentType } from "react";

import type { TocEntry } from "./remark-extract-toc";

/**
 * Frontmatter shape every MDX file is expected to declare. Loosely typed so
 * a missing `description` or `title` doesn't blow up at build time — the
 * route handler renders fallbacks for those cases.
 */
export type DocFrontmatter = {
  title?: string;
  description?: string;
};

/**
 * Each compiled MDX module exposes the React component as default and the
 * named exports our remark plugins emit.
 */
type MdxModule = {
  default: ComponentType<{ components?: Record<string, ComponentType<unknown>> }>;
  frontmatter?: DocFrontmatter;
  toc?: TocEntry[];
};

type RawMdxModule = string;

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
 * Per-page bundle exposed to the docs route. `Component` is the actual MDX
 * React component; `path` is the on-disk relative path used for "Edit on
 * GitHub" links and "Copy MD" raw URLs.
 */
export type DocPage = {
  slug: string[];
  url: string;
  path: string;
  raw: string;
  frontmatter: DocFrontmatter;
  toc: TocEntry[];
  Component: MdxModule["default"];
};

const CONTENT_PREFIX = "/content/docs/";

const mdxModules = import.meta.glob<MdxModule>("../../../content/docs/**/*.mdx", {
  eager: true,
});

const rawMdxModules = import.meta.glob<RawMdxModule>("../../../content/docs/**/*.mdx", {
  eager: true,
  query: "?raw",
  import: "default",
});

const metaModules = import.meta.glob<{ default: MetaFile }>(
  "../../../content/docs/**/meta.json",
  { eager: true },
);

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
for (const [filePath, module] of Object.entries(mdxModules)) {
  const { relativePath, slug } = normalizeMdxPath(filePath);
  const url = "/docs" + (slug.length ? "/" + slug.join("/") : "");
  const key = slug.join("/");
  const raw = rawMdxModules[filePath] ?? "";
  pagesBySlug.set(key, {
    slug,
    url,
    path: relativePath,
    raw,
    frontmatter: module.frontmatter ?? {},
    toc: module.toc ?? [],
    Component: module.default,
  });
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

/**
 * Flatten the page tree into a linear list of pages in sidebar order — used
 * to compute prev/next pagination links and to render the linear list in
 * mobile menus.
 */
export function flattenPages(node: PageTreeNode = pageTree): PageNode[] {
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
  walk(node);
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
