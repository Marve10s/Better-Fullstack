import { expect, it } from "bun:test";
import path from "node:path";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { pathToFileURL } from "node:url";
import { build } from "vite";

import { contentMetaPlugin } from "@vite-plugins/content-meta";

const webRoot = path.resolve(import.meta.dir, "../..");
const entryId = "virtual:mdx-loader-paths-test";

for (const ssr of [false, true]) {
  it(`resolves content metadata through the ${ssr ? "server" : "browser"} MDX loaders`, async () => {
    const suffix = ssr ? ".ssr.ts" : ".ts";
    const result = await build({
      configFile: false,
      root: webRoot,
      logLevel: "silent",
      resolve: { alias: { "@web-root": webRoot } },
      plugins: [
        contentMetaPlugin(),
        {
          name: "mdx-loader-paths-test",
          resolveId(id) {
            if (id === entryId) return id;
          },
          load(id) {
            if (id !== entryId) return;
            return `
              import { docsMeta, guidesMeta, blogMeta } from "virtual:content-meta";
              import * as localized from "virtual:localized-content";
              import { docsMdxLoaders, docsRawMdxLoaders } from "/src/lib/docs/mdx-loaders${suffix}";
              import { guideMdxLoaders } from "/src/lib/guides/mdx-loaders${suffix}";
              import { blogMdxLoaders } from "/src/lib/blog/mdx-loaders${suffix}";

              const collections = [
                [docsMeta, docsMdxLoaders, localized.localizedDocsMdxLoaders],
                [docsMeta, docsRawMdxLoaders, localized.localizedDocsRawMdxLoaders],
                [guidesMeta, guideMdxLoaders, localized.localizedGuideMdxLoaders],
                [blogMeta, blogMdxLoaders, localized.localizedBlogMdxLoaders],
              ];
              for (const [pages, loaders, translations] of collections) {
                if (!pages.length) throw new Error("No content metadata");
                for (const page of pages) {
                  if (typeof loaders[page.filePath] !== "function") {
                    throw new Error("Content loader missing for " + page.filePath);
                  }
                  for (const locale of Object.keys(page.localizedFrontmatter)) {
                    const key = locale + ":" + page.filePath;
                    if (typeof translations[key] !== "function") {
                      throw new Error("Localized content loader missing for " + key);
                    }
                  }
                }
              }
              const landing = docsMeta.find((page) => page.filePath.endsWith("/docs/index.mdx"));
              if (landing?.frontmatter.translationStatus !== "pending") {
                throw new Error("Expected the docs landing page to exercise English fallback");
              }
              export const verified = true;
            `;
          },
        },
      ],
      build: {
        write: false,
        ssr,
        minify: false,
        modulePreload: false,
        rollupOptions: {
          input: entryId,
          // Exercise Vite's real glob keys without compiling the entire MDX corpus.
          external: (id) =>
            (!id.includes("*") && /\.mdx(?:\?raw)?$/.test(id)) ||
            id.startsWith("virtual:localized-content-mdx-bundle/") ||
            id.startsWith("virtual:localized-content-raw/"),
          preserveEntrySignatures: "strict",
        },
      },
    });

    if (!("output" in result)) throw new Error("Expected a single Vite build output");
    const entry = result.output.find((output) => output.type === "chunk" && output.isEntry);
    if (entry?.type !== "chunk") throw new Error("Missing compiled loader contract");
    const directory = await mkdtemp(path.join(tmpdir(), "bf-mdx-contract-"));
    try {
      const modulePath = path.join(directory, "contract.mjs");
      await writeFile(modulePath, entry.code);
      const contract: unknown = await import(pathToFileURL(modulePath).href);
      expect(contract).toMatchObject({ verified: true });
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });
}
