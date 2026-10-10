import { contentMetaPlugin } from "@vite-plugins/content-meta";
import { mdxContentPlugin } from "@vite-plugins/mdx-content";
import { expect, it } from "bun:test";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "vite";

it("serves request-local Markdown without sharing cached translations", async () => {
  const webRoot = path.resolve(import.meta.dir, "../..");
  const entryId = "virtual:docs-markdown-test";
  const result = await build({
    configFile: false,
    root: webRoot,
    logLevel: "silent",
    ssr: { noExternal: ["yaml"] },
    resolve: { alias: { "@": path.join(webRoot, "src") } },
    plugins: [
      contentMetaPlugin(),
      mdxContentPlugin({}),
      {
        name: "docs-markdown-test",
        resolveId(id) {
          if (id === entryId) return id;
        },
        load(id) {
          if (id !== entryId) return;
          return `
            import { docsMarkdownResponse } from "/src/lib/docs/markdown.server.ts";
            import { paraglideMiddleware } from "/src/paraglide/server.js";
            import { docsMeta } from "virtual:content-meta";
            import { localizedDocsRawMdxLoaders } from "virtual:localized-content";
            import { parse } from "yaml";
            const cases = [
              ["ai/mcp", "de", "MCP-Server"],
              ["ai/mcp", "en", "MCP Server"],
              ["", "de", "Better Fullstack"],
              ["cli", "de", "CLI"],
            ];
            export async function verify() {
              await Promise.all(cases.map(async ([slug, locale, title]) => {
                const request = new Request("https://example.test/docs/" + slug + ".md", {
                  headers: { Cookie: "BFS_LOCALE=" + locale, "Accept-Language": "fr" },
                });
                const response = await paraglideMiddleware(request, () => docsMarkdownResponse(slug));
                const source = await response.text();
                if (response.status !== 200 || !source.includes(title)) {
                  throw new Error("Missing localized Markdown for " + slug + ": " + locale);
                }
                if (response.headers.get("content-language") !== locale ||
                    response.headers.get("cache-control") !== "private, no-store" ||
                    response.headers.get("vary") !== "Cookie, Accept-Language") {
                  throw new Error("Incorrect localized response headers");
                }
                if (locale === "de" && slug === "ai/mcp" && !source.includes("Mit einem Befehl verbinden")) {
                  throw new Error("German Markdown returned the English body");
                }
                const filePath = "/content/docs/" + (slug === "" ? "index" : slug === "cli" ? "cli/index" : slug) + ".mdx";
                const canonical = docsMeta.find(page => page.filePath === filePath).frontmatter;
                const frontmatter = parse(source.split("---")[1]);
                for (const key of ["updated", "layout"]) {
                  if (frontmatter[key] !== canonical[key]) {
                    throw new Error("Localized Markdown lost canonical " + key + " for " + slug);
                  }
                }
                if (locale !== "en" && source !== await localizedDocsRawMdxLoaders[locale + ":" + filePath]()) {
                  throw new Error("Markdown response differs from Copy MD source");
                }
              }));
              for (const slug of ["not-a-doc", "toString"]) {
                const response = await docsMarkdownResponse(slug);
                if (response.status !== 404) throw new Error("Unknown document was not rejected");
              }
              return true;
            }
          `;
        },
      },
    ],
    build: {
      write: false,
      ssr: true,
      minify: false,
      rollupOptions: {
        input: entryId,
        external: (id) =>
          id.startsWith("virtual:localized-content-mdx-bundle/") ||
          id.startsWith("virtual:localized-content-mdx/"),
        output: { inlineDynamicImports: true },
      },
    },
  });

  if (!("output" in result)) throw new Error("Expected one server bundle");
  const entry = result.output.find((output) => output.type === "chunk" && output.isEntry);
  if (entry?.type !== "chunk") throw new Error("Missing Markdown server entry");
  const directory = await mkdtemp(path.join(tmpdir(), "bf-docs-markdown-"));
  try {
    const modulePath = path.join(directory, "markdown.mjs");
    await writeFile(modulePath, entry.code);
    const module: { verify: () => Promise<boolean> } = await import(pathToFileURL(modulePath).href);
    expect(await module.verify()).toBe(true);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}, 30_000);
