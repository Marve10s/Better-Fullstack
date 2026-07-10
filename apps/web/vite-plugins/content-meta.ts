import type { Plugin } from "vite";

import fs from "node:fs";
import path from "node:path";
import { parse as parseYaml, stringify as stringifyYaml } from "yaml";

import { LOCALIZED_CONTENT_LOCALES, type LocalizedContentLocale } from "../src/lib/i18n/locales";

/**
 * Build-time frontmatter extraction for docs/guides MDX content.
 *
 * Exposes `virtual:content-meta` with the frontmatter of every MDX file.
 * This is what lets the sidebar/sitemap/SEO read titles eagerly while the
 * compiled MDX modules themselves stay referenced ONLY via dynamic
 * `import.meta.glob`, each in its own lazy chunk. (Importing `frontmatter`
 * eagerly from the MDX modules would merge them into the entry chunk —
 * Rollup cannot split one module's exports across chunks.)
 *
 * Keys intentionally match the `import.meta.glob` keys used in
 * `src/lib/docs/source.ts` and `src/lib/guides/source.ts` (paths relative to
 * those files), so the two maps line up without translation.
 */
const VIRTUAL_ID = "virtual:content-meta";
const RESOLVED_ID = "\0" + VIRTUAL_ID;
// Raw blog MDX sources for the /blog/$post.md endpoint. Inlined at build
// time (content/ isn't shipped to the server bundle) and only imported
// dynamically by that route, so it stays in its own lazy server chunk.
const BLOG_RAW_ID = "virtual:blog-raw";
const RESOLVED_BLOG_RAW_ID = "\0" + BLOG_RAW_ID;
const LOCALIZED_CONTENT_ID = "virtual:localized-content";
const RESOLVED_LOCALIZED_CONTENT_ID = "\0" + LOCALIZED_CONTENT_ID;
const LOCALIZED_MDX_BUNDLE_PREFIX = "virtual:localized-content-mdx-bundle/";
const LOCALIZED_MDX_PREFIX = "virtual:localized-content-mdx/";
const LOCALIZED_RAW_PREFIX = "virtual:localized-content-raw/";

function rawImporterName(locale: LocalizedContentLocale): string {
  return `__raw_${locale.replace(/[^a-zA-Z0-9]/g, "_")}`;
}

type ContentSubdir = "docs" | "guides" | "blog";

type MetaEntry = {
  filePath: string;
  frontmatter: Record<string, unknown>;
  localizedFrontmatter: Partial<Record<LocalizedContentLocale, Record<string, unknown>>>;
  readingStats?: ReadingStats;
};
type ReadingStats = { shortMins: number; longMins: number };
type MetaBuild = { entries: MetaEntry[]; watchFiles: string[] };
type LocalizedJsonEntry = {
  frontmatter?: Record<string, unknown>;
  body?: string;
};
type LocalizedJsonBundle = Partial<Record<ContentSubdir, Record<string, LocalizedJsonEntry>>>;
type LocalizedJsonBundles = Partial<Record<LocalizedContentLocale, LocalizedJsonBundle>>;

function extractFrontmatter(source: string): Record<string, unknown> {
  if (!source.startsWith("---")) return {};
  const end = source.indexOf("\n---", 3);
  if (end === -1) return {};
  try {
    const parsed = parseYaml(source.slice(3, end + 1));
    return parsed && typeof parsed === "object" ? (parsed as Record<string, unknown>) : {};
  } catch {
    return {};
  }
}

/*
 * Reading time for blog posts. "Long version" sections (wrapped in
 * `<div data-long-version="true">` in the MDX) are excluded from the short
 * estimate; the Short/Long toggle on the post page shows both durations.
 */
const LONG_VERSION_BLOCK_RE = /<div\s[^>]*data-long-version[^>]*>[\s\S]*?<\/div>/g;
const WORDS_PER_MINUTE = 220;

function stripFrontmatterBlock(source: string): string {
  if (!source.startsWith("---")) return source;
  const end = source.indexOf("\n---", 3);
  return end === -1 ? source : source.slice(end + 4);
}

function readingMins(text: string): number {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

function computeReadingStats(source: string): ReadingStats {
  const body = stripFrontmatterBlock(source);
  return {
    shortMins: readingMins(body.replace(LONG_VERSION_BLOCK_RE, "")),
    longMins: readingMins(body),
  };
}

function collectMdxFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...collectMdxFiles(full));
    else if (entry.isFile() && entry.name.endsWith(".mdx") && !isLocalizedMdxFile(entry.name)) {
      out.push(full);
    }
  }
  return out.sort();
}

function isLocalizedMdxFile(fileName: string): boolean {
  return LOCALIZED_CONTENT_LOCALES.some((locale) => fileName.endsWith(`.${locale}.mdx`));
}

function readLocalizedBundles(rootDir: string): {
  bundles: LocalizedJsonBundles;
  watchFiles: string[];
} {
  const contentDir = path.join(rootDir, "content", "i18n");
  const bundles: LocalizedJsonBundles = {};
  const watchFiles: string[] = [];

  for (const locale of LOCALIZED_CONTENT_LOCALES) {
    const file = path.join(contentDir, `${locale}.json`);
    if (!fs.existsSync(file)) continue;
    watchFiles.push(file);
    try {
      bundles[locale] = JSON.parse(fs.readFileSync(file, "utf8")) as LocalizedJsonBundle;
    } catch {
      bundles[locale] = {};
    }
  }

  return { bundles, watchFiles };
}

function localizedEntryToMdxSource(entry: LocalizedJsonEntry): string {
  const frontmatter = entry.frontmatter ?? {};
  const body = entry.body ?? "";
  return `---\n${stringifyYaml(frontmatter).trim()}\n---\n\n${body}`;
}

function localizedLoaderKey(
  locale: LocalizedContentLocale,
  contentSubdir: ContentSubdir,
  relativePath: string,
): string {
  return `${locale}:../../../content/${contentSubdir}/${relativePath}`;
}

function localizedMdxModuleId(
  contentSubdir: ContentSubdir,
  locale: LocalizedContentLocale,
  relativePath: string,
): string {
  return `${LOCALIZED_MDX_PREFIX}${contentSubdir}/${locale}/${relativePath}`;
}

function localizedMdxBundleModuleId(
  contentSubdir: ContentSubdir,
  locale: LocalizedContentLocale,
): string {
  return `${LOCALIZED_MDX_BUNDLE_PREFIX}${contentSubdir}/${locale}`;
}

function parseLocalizedMdxBundleId(id: string):
  | {
      contentSubdir: ContentSubdir;
      locale: LocalizedContentLocale;
    }
  | undefined {
  if (!id.startsWith(LOCALIZED_MDX_BUNDLE_PREFIX)) return undefined;
  const rest = id.slice(LOCALIZED_MDX_BUNDLE_PREFIX.length);
  const [contentSubdir, locale] = rest.split("/");
  if (contentSubdir !== "docs" && contentSubdir !== "guides" && contentSubdir !== "blog") {
    return undefined;
  }
  if (!LOCALIZED_CONTENT_LOCALES.includes(locale as LocalizedContentLocale)) {
    return undefined;
  }
  return {
    contentSubdir,
    locale: locale as LocalizedContentLocale,
  };
}

function parseLocalizedMdxId(id: string):
  | {
      contentSubdir: ContentSubdir;
      locale: LocalizedContentLocale;
      relativePath: string;
    }
  | undefined {
  if (!id.startsWith(LOCALIZED_MDX_PREFIX)) return undefined;
  const rest = id.slice(LOCALIZED_MDX_PREFIX.length);
  const [contentSubdir, locale, ...relativeParts] = rest.split("/");
  if (contentSubdir !== "docs" && contentSubdir !== "guides" && contentSubdir !== "blog") {
    return undefined;
  }
  if (!LOCALIZED_CONTENT_LOCALES.includes(locale as LocalizedContentLocale)) {
    return undefined;
  }
  const relativePath = relativeParts.join("/");
  if (!relativePath) return undefined;
  return {
    contentSubdir,
    locale: locale as LocalizedContentLocale,
    relativePath,
  };
}

export function contentMetaPlugin(): Plugin {
  let rootDir = "";

  function buildMeta(
    contentSubdir: ContentSubdir,
    globPrefix: string,
    bundles: LocalizedJsonBundles,
  ): MetaBuild {
    const contentDir = path.join(rootDir, "content", contentSubdir);
    const watchFiles: string[] = [];
    const entries = collectMdxFiles(contentDir).map((file) => {
      const rel = path.relative(contentDir, file).split(path.sep).join("/");
      const localizedFrontmatter: MetaEntry["localizedFrontmatter"] = {};
      for (const locale of LOCALIZED_CONTENT_LOCALES) {
        const localizedEntry = bundles[locale]?.[contentSubdir]?.[rel];
        if (localizedEntry?.frontmatter) {
          localizedFrontmatter[locale] = localizedEntry.frontmatter;
        }
      }
      const source = fs.readFileSync(file, "utf8");
      const entry: MetaEntry = {
        filePath: globPrefix + rel,
        frontmatter: extractFrontmatter(source),
        localizedFrontmatter,
      };
      if (contentSubdir === "blog") entry.readingStats = computeReadingStats(source);
      return entry;
    });
    return { entries, watchFiles };
  }

  function buildLocalizedContentModule(bundles: LocalizedJsonBundles): string {
    const maps: Record<
      ContentSubdir,
      {
        mdxLoaders: string[];
        rawLoaders: string[];
      }
    > = {
      docs: { mdxLoaders: [], rawLoaders: [] },
      guides: { mdxLoaders: [], rawLoaders: [] },
      blog: { mdxLoaders: [], rawLoaders: [] },
    };

    const rawLocales = new Set<LocalizedContentLocale>();

    for (const locale of LOCALIZED_CONTENT_LOCALES) {
      const bundle = bundles[locale];
      if (!bundle) continue;

      for (const contentSubdir of ["docs", "guides", "blog"] as const) {
        const entries = bundle[contentSubdir] ?? {};
        for (const [relativePath, entry] of Object.entries(entries).sort(([a], [b]) =>
          a.localeCompare(b),
        )) {
          if (!entry.body) continue;
          const key = localizedLoaderKey(locale, contentSubdir, relativePath);
          const bundleId = localizedMdxBundleModuleId(contentSubdir, locale);
          maps[contentSubdir].mdxLoaders.push(
            `${JSON.stringify(key)}: () => import(${JSON.stringify(bundleId)}).then((m) => m.default[${JSON.stringify(key)}])`,
          );
          // Raw MDX source is only consumed by the search index (opened on
          // demand). Load it lazily from a per-locale bundle so the source text
          // stays OUT of the initial-load chunk instead of being inlined here.
          rawLocales.add(locale);
          maps[contentSubdir].rawLoaders.push(
            `${JSON.stringify(key)}: () => ${rawImporterName(locale)}().then((m) => m.default[${JSON.stringify(key)}] ?? "")`,
          );
        }
      }
    }

    const rawImporters = [...rawLocales].map(
      (locale) =>
        `const ${rawImporterName(locale)} = () => import(${JSON.stringify(
          LOCALIZED_RAW_PREFIX + locale,
        )});`,
    );

    return [
      ...rawImporters,
      `export const localizedDocsMdxLoaders = {${maps.docs.mdxLoaders.join(",")}};`,
      `export const localizedDocsRawMdxLoaders = {${maps.docs.rawLoaders.join(",")}};`,
      `export const localizedGuideMdxLoaders = {${maps.guides.mdxLoaders.join(",")}};`,
      `export const localizedBlogMdxLoaders = {${maps.blog.mdxLoaders.join(",")}};`,
    ].join("\n");
  }

  function buildLocalizedRawModule(
    bundles: LocalizedJsonBundles,
    locale: LocalizedContentLocale,
  ): string {
    const bundle = bundles[locale];
    const entriesOut: string[] = [];
    if (bundle) {
      // Only docs raw source is referenced (localizedDocsRawMdxLoaders); keep the
      // per-locale bundle to exactly that set.
      const docs = bundle.docs ?? {};
      for (const [relativePath, entry] of Object.entries(docs).sort(([a], [b]) =>
        a.localeCompare(b),
      )) {
        if (!entry.body) continue;
        const key = localizedLoaderKey(locale, "docs", relativePath);
        entriesOut.push(
          `${JSON.stringify(key)}: ${JSON.stringify(localizedEntryToMdxSource(entry))}`,
        );
      }
    }
    return `export default {${entriesOut.join(",")}};`;
  }

  function buildLocalizedMdxBundleModule(
    bundles: LocalizedJsonBundles,
    contentSubdir: ContentSubdir,
    locale: LocalizedContentLocale,
  ): string {
    const entries = bundles[locale]?.[contentSubdir] ?? {};
    const imports: string[] = [];
    const exports: string[] = [];
    let index = 0;

    for (const [relativePath, entry] of Object.entries(entries).sort(([a], [b]) =>
      a.localeCompare(b),
    )) {
      if (!entry.body) continue;
      const key = localizedLoaderKey(locale, contentSubdir, relativePath);
      const moduleId = localizedMdxModuleId(contentSubdir, locale, relativePath);
      const binding = `__localized_mdx_${index++}`;
      imports.push(`import * as ${binding} from ${JSON.stringify(moduleId)};`);
      exports.push(`${JSON.stringify(key)}: ${binding}`);
    }

    return `${imports.join("\n")}\nexport default {${exports.join(",")}};`;
  }

  return {
    name: "better-fullstack:content-meta",
    configResolved(config) {
      rootDir = config.root;
    },
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID;
      if (id === BLOG_RAW_ID) return RESOLVED_BLOG_RAW_ID;
      if (id === LOCALIZED_CONTENT_ID) return RESOLVED_LOCALIZED_CONTENT_ID;
      if (id.startsWith(LOCALIZED_MDX_BUNDLE_PREFIX)) {
        return id;
      }
      if (id.startsWith(LOCALIZED_MDX_PREFIX)) {
        return id;
      }
      if (id.startsWith(LOCALIZED_RAW_PREFIX)) {
        return id;
      }
      return undefined;
    },
    load(id) {
      if (id === RESOLVED_BLOG_RAW_ID) {
        const contentDir = path.join(rootDir, "content", "blog");
        const entries = collectMdxFiles(contentDir).map((file) => {
          this.addWatchFile(file);
          const slug = path
            .relative(contentDir, file)
            .split(path.sep)
            .join("/")
            .replace(/\.mdx$/, "");
          return `${JSON.stringify(slug)}: ${JSON.stringify(fs.readFileSync(file, "utf8"))}`;
        });
        return `export const rawBlogPosts = {${entries.join(",")}};`;
      }

      const { bundles, watchFiles: localizedWatchFiles } = readLocalizedBundles(rootDir);

      if (id === RESOLVED_LOCALIZED_CONTENT_ID) {
        for (const filePath of localizedWatchFiles) this.addWatchFile(filePath);
        return buildLocalizedContentModule(bundles);
      }

      const localizedMdx = parseLocalizedMdxId(id);
      if (localizedMdx) {
        const entry =
          bundles[localizedMdx.locale]?.[localizedMdx.contentSubdir]?.[localizedMdx.relativePath];
        if (!entry) return undefined;
        return localizedEntryToMdxSource(entry);
      }

      const localizedMdxBundle = parseLocalizedMdxBundleId(id);
      if (localizedMdxBundle) {
        for (const filePath of localizedWatchFiles) this.addWatchFile(filePath);
        return buildLocalizedMdxBundleModule(
          bundles,
          localizedMdxBundle.contentSubdir,
          localizedMdxBundle.locale,
        );
      }

      if (id.startsWith(LOCALIZED_RAW_PREFIX)) {
        const locale = id.slice(LOCALIZED_RAW_PREFIX.length);
        if (!LOCALIZED_CONTENT_LOCALES.includes(locale as LocalizedContentLocale)) {
          return undefined;
        }
        for (const filePath of localizedWatchFiles) this.addWatchFile(filePath);
        return buildLocalizedRawModule(bundles, locale as LocalizedContentLocale);
      }

      if (id !== RESOLVED_ID) return undefined;
      const docs = buildMeta("docs", "../../../content/docs/", bundles);
      const guides = buildMeta("guides", "../../../content/guides/", bundles);
      const blog = buildMeta("blog", "../../../content/blog/", bundles);
      for (const entry of [...docs.entries, ...guides.entries, ...blog.entries]) {
        this.addWatchFile(
          path.join(rootDir, "content", entry.filePath.replace("../../../content/", "")),
        );
      }
      for (const filePath of [
        ...docs.watchFiles,
        ...guides.watchFiles,
        ...blog.watchFiles,
        ...localizedWatchFiles,
      ]) {
        this.addWatchFile(filePath);
      }
      return (
        `export const docsMeta = ${JSON.stringify(docs.entries)};\n` +
        `export const guidesMeta = ${JSON.stringify(guides.entries)};\n` +
        `export const blogMeta = ${JSON.stringify(blog.entries)};\n`
      );
    },
    handleHotUpdate(ctx) {
      if (!ctx.file.endsWith(".mdx") && !ctx.file.endsWith(".json")) return;
      for (const id of [RESOLVED_ID, RESOLVED_LOCALIZED_CONTENT_ID, RESOLVED_BLOG_RAW_ID]) {
        const mod = ctx.server.moduleGraph.getModuleById(id);
        if (mod) ctx.server.moduleGraph.invalidateModule(mod);
      }
    },
  };
}
