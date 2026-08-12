import { OPTION_CATEGORY_METADATA } from "@better-fullstack/types";
import { STACK_SELECTION_URL_KEYS } from "@better-fullstack/types/stack-translation";
import { describe, expect, it } from "bun:test";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

import { buildSearchSections } from "../src/lib/docs/search";
import { LOCALIZED_CONTENT_LOCALES } from "../src/lib/i18n/locales";

const WEB_ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const CONTENT_ROOT = join(WEB_ROOT, "content");
const DOCS_ROOT = join(CONTENT_ROOT, "docs");
const GUIDES_ROOT = join(CONTENT_ROOT, "guides");
const BLOG_ROOT = join(CONTENT_ROOT, "blog");
const LOCALIZED_CONTENT_ROOT = join(CONTENT_ROOT, "i18n");
const PROJECT_BACKLOG_ROOT = join(WEB_ROOT, "../../docs/projects/backlog");
const PUBLIC_ROUTE_ROOTS = new Map([
  ["/docs", DOCS_ROOT],
  ["/guides", GUIDES_ROOT],
]);
const CONTENT_SECTION_ROOTS = new Map([
  ["docs", DOCS_ROOT],
  ["guides", GUIDES_ROOT],
  ["blog", BLOG_ROOT],
] as const);
const BUILDER_URL_KEYS = new Set([...Object.values(STACK_SELECTION_URL_KEYS), "preset", "view"]);
const PENDING_TRANSLATION_PATHS = [
  "content/docs/ai/mcp-tools.mdx",
  "content/docs/ai/mcp.mdx",
  "content/docs/ai/overview.mdx",
  "content/docs/cli/add.mdx",
  "content/docs/cli/check.mdx",
  "content/docs/cli/create.mdx",
  "content/docs/cli/gen.mdx",
  "content/docs/cli/index.mdx",
  "content/docs/cli/mcp.mdx",
  "content/docs/cli/recommend.mdx",
  "content/docs/cli/remove.mdx",
  "content/docs/cli/registry.mdx",
  "content/docs/cli/status.mdx",
  "content/docs/cli/telemetry.mdx",
  "content/docs/cli/update.mdx",
  "content/docs/cli/utilities.mdx",
  "content/docs/ecosystems/dotnet.mdx",
  "content/docs/ecosystems/elixir.mdx",
  "content/docs/ecosystems/go.mdx",
  "content/docs/ecosystems/index.mdx",
  "content/docs/ecosystems/java.mdx",
  "content/docs/ecosystems/multi-ecosystem.mdx",
  "content/docs/ecosystems/native-mobile.mdx",
  "content/docs/ecosystems/python.mdx",
  "content/docs/ecosystems/react-native.mdx",
  "content/docs/ecosystems/rust.mdx",
  "content/docs/ecosystems/typescript.mdx",
  "content/docs/getting-started/first-project.mdx",
  "content/docs/getting-started/installation.mdx",
  "content/docs/getting-started/lifecycle.mdx",
  "content/docs/index.mdx",
  "content/docs/recipes/browser-zip-workflow.mdx",
  "content/docs/recipes/default-typescript-web.mdx",
  "content/docs/recipes/dotnet-service.mdx",
  "content/docs/recipes/index.mdx",
  "content/docs/recipes/multi-ecosystem-product.mdx",
  "content/docs/recipes/nextjs-self-backend.mdx",
  "content/docs/recipes/python-api.mdx",
  "content/docs/reference/options/dotnet.mdx",
  "content/docs/reference/versioning.mdx",
  "content/docs/sections/auth-and-payments.mdx",
  "content/docs/sections/backend-and-api.mdx",
  "content/docs/web-builder/download-and-share.mdx",
  "content/docs/web-builder/edit-and-run.mdx",
  "content/docs/web-builder/index.mdx",
  "content/blog/better-auth-architecture.mdx",
  "content/blog/drizzle-vs-prisma.mdx",
  "content/blog/self-backend-vs-separate-api.mdx",
  "content/blog/tanstack-start-vs-nextjs.mdx",
  "content/guides/python/fastapi-postgres-sqlmodel.mdx",
  "content/guides/typescript/hono-better-auth.mdx",
  "content/guides/typescript/hono-openapi-drizzle.mdx",
  "content/guides/typescript/nextjs-hono-api.mdx",
  "content/guides/typescript/nextjs-prisma-better-auth.mdx",
  "content/guides/typescript/tanstack-start-postgres-drizzle.mdx",
] as const;

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
type LocalizedContentBundle = Partial<
  Record<ContentSection, Record<string, LocalizedContentEntry>>
>;

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

function getContentSection(
  filePath: string,
): { section: ContentSection; path: string } | undefined {
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
    if (routePath === "llms.txt") return [];

    const contentPath = routePath.endsWith(".md") ? routePath.slice(0, -3) : routePath;

    return [join(contentRoot, `${contentPath}.mdx`), join(contentRoot, contentPath, "index.mdx")];
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
      .filter((file) => parseFrontmatter(file.source).get("translationStatus") !== "pending")
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

  it("keeps localized guide indexes in sync with base navigation links", () => {
    const baseIndex = readFileSync(join(GUIDES_ROOT, "index.mdx"), "utf8");
    const expectedLinks = new Set(
      collectLinks(baseIndex).filter(
        (link) => link.startsWith("/guides/") || link === "/templates",
      ),
    );
    const missingLinks = LOCALIZED_CONTENT_LOCALES.flatMap((locale) => {
      const localizedBody = readLocalizedContent(locale).guides?.["index.mdx"]?.body ?? "";
      const localizedLinks = new Set(collectLinks(localizedBody));
      return [...expectedLinks]
        .filter((link) => !localizedLinks.has(link))
        .map((link) => `${locale}: ${link}`);
    });

    expect(missingLinks).toEqual([]);
  });

  it("keeps translation fallbacks explicit and limited to the reviewed pending list", () => {
    const pendingPaths: string[] = [];
    const invalidStatuses: string[] = [];

    for (const file of contentFiles.filter((candidate) => !isLocalizedMdxFile(candidate.path))) {
      const status = parseFrontmatter(file.source).get("translationStatus");
      if (!status) continue;
      if (status !== "pending") {
        invalidStatuses.push(`${file.relativePath}: ${status}`);
        continue;
      }
      pendingPaths.push(file.relativePath);
    }

    expect(invalidStatuses).toEqual([]);
    expect(pendingPaths.sort()).toEqual([...PENDING_TRANSLATION_PATHS].sort());
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

  it("documents the exact live MCP tool surface", () => {
    const mcpSource = readFileSync(join(WEB_ROOT, "../cli/src/mcp.ts"), "utf8");
    const reference = readFileSync(join(DOCS_ROOT, "ai/mcp-tools.mdx"), "utf8");
    const registeredTools = new Set(
      [...mcpSource.matchAll(/registerTool\(\s*"(bfs_[a-z_]+)"/g)].map((match) => match[1]),
    );
    const documentedTools = new Set(
      [...reference.matchAll(/`(bfs_[a-z_]+)`/g)].map((match) => match[1]),
    );

    expect([...documentedTools].sort()).toEqual([...registeredTools].sort());
  });

  it("keeps mutating CLI workflows explicit about their operational contract", () => {
    for (const relativePath of [
      "cli/create.mdx",
      "cli/add.mdx",
      "cli/update.mdx",
      "cli/check.mdx",
      "cli/gen.mdx",
      "cli/registry.mdx",
    ]) {
      const source = readFileSync(join(DOCS_ROOT, relativePath), "utf8");
      expect(source, relativePath).toContain("## Operational contract");
    }
  });

  it("keeps option inventories schema-derived and agent filenames correctly cased", () => {
    const ecosystemFiles = walkFiles(DOCS_ROOT + `${sep}ecosystems`, (path) =>
      path.endsWith(".mdx"),
    );
    const manualInventories = ecosystemFiles
      .filter((path) => readFileSync(path, "utf8").includes("| Category | Values |"))
      .map((path) => relative(WEB_ROOT, path));
    const misCasedAgentFiles = contentFiles
      .filter((file) => /`Agents\.md`|\bAgents\.md\b/.test(file.source))
      .map((file) => file.relativePath);

    expect(manualInventories).toEqual([]);
    expect(misCasedAgentFiles).toEqual([]);
    expect(readFileSync(join(DOCS_ROOT, "getting-started/installation.mdx"), "utf8")).toContain(
      ".NET SDK 10",
    );
  });

  it("does not leave already-registered options as unchecked add work", () => {
    const registeredOptions = new Set(
      Object.values(OPTION_CATEGORY_METADATA).flatMap((metadata) =>
        metadata.options.flatMap((option) => [option.id, option.cliValue]),
      ),
    );
    const staleRows = walkFiles(PROJECT_BACKLOG_ROOT, (path) => path.endsWith(".md")).flatMap(
      (path) => {
        const source = readFileSync(path, "utf8");
        return [...source.matchAll(/^- \[ \] Add `([^`]+)`/gm)]
          .filter((match) => registeredOptions.has(match[1]))
          .map(
            (match) =>
              `${relative(WEB_ROOT, path)}:${lineNumberForIndex(source, match.index)} ${match[1]}`,
          );
      },
    );

    expect(staleRows).toEqual([]);
  });

  it("makes pending translations fall back to current English content", () => {
    const sources = [
      readFileSync(join(WEB_ROOT, "src/lib/docs/source.ts"), "utf8"),
      readFileSync(join(WEB_ROOT, "src/lib/guides/source.ts"), "utf8"),
      readFileSync(join(WEB_ROOT, "src/lib/blog/source.ts"), "utf8"),
    ];

    for (const source of sources) {
      expect(source).toContain('frontmatter.translationStatus !== "pending"');
    }
  });
});
