import { describe, expect, it } from "bun:test";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

import { STACK_SELECTION_URL_KEYS } from "@better-fullstack/types/stack-translation";

import { buildSearchSections } from "../src/lib/docs/search";
import { LOCALIZED_CONTENT_LOCALES } from "../src/lib/i18n/locales";

const WEB_ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const CONTENT_ROOT = join(WEB_ROOT, "content");
const DOCS_ROOT = join(CONTENT_ROOT, "docs");
const GUIDES_ROOT = join(CONTENT_ROOT, "guides");
const BLOG_ROOT = join(CONTENT_ROOT, "blog");
const LOCALIZED_CONTENT_ROOT = join(CONTENT_ROOT, "i18n");
const PUBLIC_ROUTE_ROOTS = new Map([
  ["/docs", DOCS_ROOT],
  ["/guides", GUIDES_ROOT],
]);
const CONTENT_SECTION_ROOTS = new Map([
  ["docs", DOCS_ROOT],
  ["guides", GUIDES_ROOT],
  ["blog", BLOG_ROOT],
] as const);
const BUILDER_URL_KEYS = new Set([
  ...Object.values(STACK_SELECTION_URL_KEYS),
  "preset",
  "view",
]);

type ContentFile = {
  path: string;
  relativePath: string;
  source: string;
};
type ContentSection = "docs" | "guides" | "blog";
type LocalizedContentEntry = {
  frontmatter?: Record<string, unknown>;
  body?: string;
};
type LocalizedContentBundle = Partial<Record<ContentSection, Record<string, LocalizedContentEntry>>>;

function walkFiles(root: string, predicate: (path: string) => boolean): string[] {
  const out: string[] = [];

  for (const name of readdirSync(root)) {
    const path = join(root, name);
    const stat = statSync(path);

    if (stat.isDirectory()) {
      out.push(...walkFiles(path, predicate));
      continue;
    }

    if (predicate(path)) out.push(path);
  }

  return out.sort();
}

function readContentFiles(): ContentFile[] {
  return walkFiles(CONTENT_ROOT, (path) => path.endsWith(".mdx")).map((path) => ({
    path,
    relativePath: relative(WEB_ROOT, path).split(sep).join("/"),
    source: readFileSync(path, "utf8"),
  }));
}

function isLocalizedMdxFile(path: string): boolean {
  return LOCALIZED_CONTENT_LOCALES.some((locale) => path.endsWith(`.${locale}.mdx`));
}

function getContentSection(filePath: string): { section: ContentSection; path: string } | undefined {
  for (const [section, root] of CONTENT_SECTION_ROOTS) {
    if (!filePath.startsWith(`${root}${sep}`)) continue;
    return {
      section,
      path: relative(root, filePath).split(sep).join("/"),
    };
  }
  return undefined;
}

function readLocalizedContent(locale: string): LocalizedContentBundle {
  return JSON.parse(readFileSync(join(LOCALIZED_CONTENT_ROOT, `${locale}.json`), "utf8"));
}

function parseFrontmatter(source: string): Map<string, string> {
  const match = source.match(/^---\n([\s\S]*?)\n---/);
  const fields = new Map<string, string>();
  if (!match) return fields;

  for (const line of match[1].split("\n")) {
    const field = line.match(/^([A-Za-z][\w-]*):\s*(.+)$/);
    if (!field) continue;
    fields.set(field[1], field[2].replace(/^["']|["']$/g, "").trim());
  }

  return fields;
}

function lineNumberForIndex(source: string, index: number): number {
  return source.slice(0, index).split("\n").length;
}

function stripCode(source: string): string {
  return source.replace(/```[\s\S]*?```/g, "");
}

function collectLinks(source: string): string[] {
  const withoutCode = stripCode(source);
  const links: string[] = [];
  const markdownLinkPattern = /\[[^\]]+\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
  const hrefPattern = /\bhref=["']([^"']+)["']/g;

  for (const pattern of [markdownLinkPattern, hrefPattern]) {
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(withoutCode)) !== null) {
      links.push(match[1]);
    }
  }

  return links;
}

function normalizeInternalRoute(link: string): URL | null {
  try {
    const url = new URL(link, "https://better-fullstack.dev");
    const isProjectUrl =
      url.origin === "https://better-fullstack.dev" || !/^https?:\/\//.test(link);
    return isProjectUrl ? url : null;
  } catch {
    return null;
  }
}

function resolveContentRoute(pathname: string): string[] {
  const normalizedPathname = pathname.replace(/\/$/, "") || "/";

  for (const [routeRoot, contentRoot] of PUBLIC_ROUTE_ROOTS) {
    if (normalizedPathname !== routeRoot && !normalizedPathname.startsWith(`${routeRoot}/`)) {
      continue;
    }

    const routePath = normalizedPathname.slice(routeRoot.length).replace(/^\//, "");
    if (!routePath) return [join(contentRoot, "index.mdx")];

    return [join(contentRoot, `${routePath}.mdx`), join(contentRoot, routePath, "index.mdx")];
  }

  return [];
}

describe("docs content contract", () => {
  const contentFiles = readContentFiles();

  it("keeps docs and guides frontmatter useful", () => {
    const invalid = contentFiles.flatMap((file) => {
      const frontmatter = parseFrontmatter(file.source);
      const title = frontmatter.get("title");
      const description = frontmatter.get("description");
      const problems: string[] = [];

      if (!title) problems.push("missing title");
      if (!description) problems.push("missing description");
      if (description && description.length > 170) {
        problems.push(`description is ${description.length} characters`);
      }

      return problems.map((problem) => `${file.relativePath}: ${problem}`);
    });

    expect(invalid).toEqual([]);
  });

  it("keeps localized docs, guides, and blog coverage complete", () => {
    const baseContentFiles = contentFiles.filter((file) => !isLocalizedMdxFile(file.path));
    const localizedBundles = new Map(
      LOCALIZED_CONTENT_LOCALES.map((locale) => [locale, readLocalizedContent(locale)]),
    );
    const missingLocalizedContent = baseContentFiles
      .filter((file) => !isLocalizedMdxFile(file.path))
      .flatMap((file) =>
        LOCALIZED_CONTENT_LOCALES.flatMap((locale) => {
          const section = getContentSection(file.path);
          if (!section) return [];
          const entry = localizedBundles.get(locale)?.[section.section]?.[section.path];
          const problems: string[] = [];
          if (!entry) problems.push(`missing ${locale} translation`);
          if (entry && !entry.body?.trim()) problems.push(`missing ${locale} body`);
          if (entry && !entry.frontmatter?.title) {
            problems.push(`missing ${locale} title`);
          }
          if (entry && !entry.frontmatter?.description) {
            problems.push(`missing ${locale} description`);
          }
          return problems.map((problem) => `${file.relativePath}: ${problem}`);
        }),
      );

    expect(missingLocalizedContent).toEqual([]);
  });

  it("keeps docs sidebar metadata complete", () => {
    const metaFiles = walkFiles(DOCS_ROOT, (path) => path.endsWith("meta.json"));
    const missingEntries: string[] = [];
    const orphanPages: string[] = [];

    for (const metaPath of metaFiles) {
      const meta = JSON.parse(readFileSync(metaPath, "utf8")) as { pages?: string[] };
      const dir = dirname(metaPath);

      for (const entry of meta.pages ?? []) {
        if (/^---.+---$/.test(entry)) continue;

        const candidates = [
          join(dir, `${entry}.mdx`),
          join(dir, entry, "index.mdx"),
          join(dir, entry, "meta.json"),
        ];

        if (!candidates.some((candidate) => existsSync(candidate))) {
          missingEntries.push(`${relative(WEB_ROOT, metaPath)} -> ${entry}`);
        }
      }
    }

    for (const pagePath of walkFiles(
      DOCS_ROOT,
      (path) => path.endsWith(".mdx") && !isLocalizedMdxFile(path),
    )) {
      const dir = dirname(pagePath);
      const localMetaPath = join(dir, "meta.json");
      const pageName = pagePath.endsWith(`${sep}index.mdx`)
        ? "index"
        : pagePath.slice(dir.length + 1, -".mdx".length);

      if (!existsSync(localMetaPath)) {
        orphanPages.push(`${relative(WEB_ROOT, pagePath)}: missing local meta.json`);
        continue;
      }

      const meta = JSON.parse(readFileSync(localMetaPath, "utf8")) as { pages?: string[] };
      if (!meta.pages?.includes(pageName)) {
        orphanPages.push(`${relative(WEB_ROOT, pagePath)}: not listed in local meta.json`);
      }
    }

    expect(missingEntries).toEqual([]);
    expect(orphanPages).toEqual([]);
  });

  it("keeps docs and guides internal links backed by content files", () => {
    const brokenLinks = contentFiles.flatMap((file) =>
      collectLinks(file.source).flatMap((link) => {
        const url = normalizeInternalRoute(link);
        if (!url) return [];
        const candidates = resolveContentRoute(url.pathname);
        if (candidates.length === 0) return [];
        if (candidates.some((candidate) => existsSync(candidate))) return [];
        return [`${file.relativePath}: ${link}`];
      }),
    );

    expect(brokenLinks).toEqual([]);
  });

  it("uses only supported Stack Builder URL keys", () => {
    const invalidBuilderLinks = contentFiles.flatMap((file) =>
      collectLinks(file.source).flatMap((link) => {
        const url = normalizeInternalRoute(link);
        if (!url || url.pathname !== "/new") return [];

        const invalidKeys = [...url.searchParams.keys()].filter(
          (key) => !BUILDER_URL_KEYS.has(key),
        );
        const usesNativeFrontendOutsideReactNative =
          url.searchParams.has("fe-n") && url.searchParams.get("eco") !== "react-native";
        const invalidForLink = invalidKeys.map(
          (key) => `${file.relativePath}: ${link} uses unknown key ${key}`,
        );

        if (usesNativeFrontendOutsideReactNative) {
          invalidForLink.push(
            `${file.relativePath}: ${link} uses native frontend outside react-native`,
          );
        }

        return invalidForLink;
      }),
    );

    expect(invalidBuilderLinks).toEqual([]);
  });

  it("keeps npm fences limited to package-manager commands", () => {
    const invalidFences = contentFiles.flatMap((file) => {
      const invalid: string[] = [];
      const npmFencePattern = /```npm[^\n]*\n([\s\S]*?)```/g;
      let match: RegExpExecArray | null;

      while ((match = npmFencePattern.exec(file.source)) !== null) {
        const command = match[1];
        const firstMeaningfulLine = command
          .split("\n")
          .map((line) => line.trim())
          .find(Boolean);

        if (!firstMeaningfulLine?.startsWith("npm ")) {
          invalid.push(
            `${file.relativePath}:${lineNumberForIndex(file.source, match.index)} starts with ${firstMeaningfulLine ?? "empty fence"}`,
          );
        }
      }

      return invalid;
    });

    expect(invalidFences).toEqual([]);
  });

  it("indexes markdown body sections for docs search", () => {
    const sections = buildSearchSections([
      {
        url: "/docs/example",
        rawSource:
          "---\ntitle: Example\ndescription: Search fixture\n---\n\nIntro paragraph.\n\n## Install\n\nBody-only needle text lives here.",
        frontmatter: {
          title: "Example",
          description: "Search fixture",
        },
      },
    ]);

    expect(sections).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          sectionTitle: "Install",
          sectionUrl: "/docs/example#install",
          body: "Body-only needle text lives here.",
        }),
      ]),
    );

    const searchDataSource = readFileSync(join(WEB_ROOT, "src/lib/docs/search-data.ts"), "utf8");
    expect(searchDataSource).toContain("buildSearchSections");
    expect(searchDataSource).toContain("loadAllRawPages");
    expect(searchDataSource).toContain("rawSource: rawByFilePath.get(page.filePath)");
  });

  it("does not crash docs search when raw MDX text is unavailable", () => {
    const sections = buildSearchSections([
      {
        url: "/docs/missing-raw",
        rawSource: undefined,
        frontmatter: {
          title: "Missing Raw",
          description: "Fallback metadata still keeps the page searchable.",
        },
      },
    ]);

    expect(sections).toEqual([
      expect.objectContaining({
        pageTitle: "Missing Raw",
        pageUrl: "/docs/missing-raw",
        sectionTitle: "Missing Raw",
        body: "",
      }),
    ]);
  });
});
