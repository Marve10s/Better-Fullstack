import { contentMetaPlugin } from "@vite-plugins/content-meta";
import { mdxContentPlugin } from "@vite-plugins/mdx-content";
import { expect, it } from "bun:test";
import path from "node:path";
import { runInNewContext } from "node:vm";
import { build } from "vite";

it("indexes raw MDX bodies in a browser bundle without Node globals", async () => {
  const entryId = "virtual:raw-search-test";
  const webRoot = path.resolve(import.meta.dir, "../..");
  const result = await build({
    configFile: false,
    root: webRoot,
    logLevel: "silent",
    resolve: { alias: { "@": path.join(webRoot, "src") } },
    plugins: [
      contentMetaPlugin(),
      mdxContentPlugin({}),
      {
        name: "raw-search-test",
        resolveId(id) {
          if (id === entryId) return id;
        },
        load(id) {
          if (id === entryId)
            return `
            import rawSource from "/content/docs/cli/create.mdx?raw";
            import { docsMeta } from "virtual:content-meta";
            import { buildSearchSections, createDocSearch } from "/src/lib/docs/search.ts";
            export async function query() {
              const frontmatter = docsMeta.find(page => page.filePath === "/content/docs/cli/create.mdx").frontmatter;
              const sections = buildSearchSections([{ url: "/docs/cli/create", rawSource, frontmatter }]);
              const search = await createDocSearch(sections);
              return {
                rawType: typeof rawSource,
                titles: (await search.query("auth")).map(hit => hit.pageTitle),
                hasFrontmatterInBody: sections.some(section => section.body.includes("translationStatus")),
              };
            }
          `;
        },
      },
    ],
    build: {
      write: false,
      minify: false,
      rollupOptions: {
        input: entryId,
        preserveEntrySignatures: "strict",
        output: { format: "iife", name: "docsSearchProbe", inlineDynamicImports: true },
      },
    },
  });
  if (!("output" in result)) throw new Error("Expected a single Vite build output");
  const entry = result.output.find((output) => output.type === "chunk" && output.isEntry);
  if (entry?.type !== "chunk") throw new Error("Missing raw search entry");
  const resultInBrowser: unknown = await runInNewContext(`${entry.code}\ndocsSearchProbe.query()`, {
    console,
    crypto: globalThis.crypto,
    setTimeout,
    clearTimeout,
  });
  expect(resultInBrowser).toMatchObject({
    rawType: "string",
    titles: expect.arrayContaining(["Create Command"]),
    hasFrontmatterInBody: false,
  });
});
