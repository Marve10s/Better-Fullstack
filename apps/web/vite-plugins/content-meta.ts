import fs from "node:fs";
import path from "node:path";

import type { Plugin } from "vite";
import { parse as parseYaml } from "yaml";

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

type MetaEntry = { filePath: string; frontmatter: Record<string, unknown> };

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
  return /\.(es|zh)\.mdx$/.test(fileName);
}

export function contentMetaPlugin(): Plugin {
  let rootDir = "";

  function buildMeta(contentSubdir: "docs" | "guides" | "blog", globPrefix: string): MetaEntry[] {
    const contentDir = path.join(rootDir, "content", contentSubdir);
    return collectMdxFiles(contentDir).map((file) => {
      const rel = path.relative(contentDir, file).split(path.sep).join("/");
      return {
        filePath: globPrefix + rel,
        frontmatter: extractFrontmatter(fs.readFileSync(file, "utf8")),
      };
    });
  }

  return {
    name: "better-fullstack:content-meta",
    configResolved(config) {
      rootDir = config.root;
    },
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID;
      return undefined;
    },
    load(id) {
      if (id !== RESOLVED_ID) return undefined;
      const docs = buildMeta("docs", "../../../content/docs/");
      const guides = buildMeta("guides", "../../../content/guides/");
      const blog = buildMeta("blog", "../../../content/blog/");
      for (const entry of [...docs, ...guides, ...blog]) {
        this.addWatchFile(path.join(rootDir, "content", entry.filePath.replace("../../../content/", "")));
      }
      return (
        `export const docsMeta = ${JSON.stringify(docs)};\n` +
        `export const guidesMeta = ${JSON.stringify(guides)};\n` +
        `export const blogMeta = ${JSON.stringify(blog)};\n`
      );
    },
    handleHotUpdate(ctx) {
      if (!ctx.file.endsWith(".mdx")) return;
      const mod = ctx.server.moduleGraph.getModuleById(RESOLVED_ID);
      if (mod) ctx.server.moduleGraph.invalidateModule(mod);
    },
  };
}
