import { contentMetaPlugin } from "@vite-plugins/content-meta";
import { mdxContentPlugin } from "@vite-plugins/mdx-content";
import { expect, it } from "bun:test";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { build } from "vite";

for (const ssr of [false, true]) {
  it(`keeps localized docs in separate lazy ${ssr ? "server" : "browser"} chunks`, async () => {
    const root = await mkdtemp(path.join(tmpdir(), "bf-localized-chunks-"));
    const entryId = "virtual:localized-chunks-test";
    try {
      await mkdir(path.join(root, "content/i18n"), { recursive: true });
      await mkdir(path.join(root, "content/docs"), { recursive: true });
      await writeFile(path.join(root, "content/docs/first.mdx"), "# First page");
      await writeFile(path.join(root, "content/docs/second.mdx"), "# Second page");
      await writeFile(
        path.join(root, "content/i18n/de.json"),
        JSON.stringify({
          docs: {
            "first.mdx": { frontmatter: { title: "Erste Seite" }, body: "# Erste Seite" },
            "second.mdx": { frontmatter: { title: "Zweite Seite" }, body: "# Zweite Seite" },
            "removed.mdx": { frontmatter: { title: "Entfernte Seite" }, body: "# Entfernte Seite" },
          },
        }),
      );
      const result = await build({
        configFile: false,
        root,
        logLevel: "silent",
        plugins: [
          contentMetaPlugin(),
          mdxContentPlugin({ remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter] }),
          {
            name: "localized-chunks-test",
            resolveId(id) {
              if (id === entryId) return id;
            },
            load(id) {
              if (id === entryId)
                return 'export { localizedDocsMdxLoaders, localizedDocsRawMdxLoaders } from "virtual:localized-content";';
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
            external: ["react/jsx-runtime"],
            preserveEntrySignatures: "strict",
          },
        },
      });
      if (!("output" in result)) throw new Error("Expected a single Vite build output");
      const chunks = result.output.filter((output) => output.type === "chunk");
      for (const prefix of [
        "virtual:localized-content-mdx/docs/de/",
        "\0virtual:localized-content-raw/de/",
      ]) {
        const pageChunks = chunks.filter((chunk) =>
          Object.keys(chunk.modules).some((id) => id.startsWith(prefix)),
        );
        expect(pageChunks).toHaveLength(2);
        for (const chunk of pageChunks) {
          expect(chunk.isDynamicEntry).toBe(true);
          expect(Object.keys(chunk.modules).filter((id) => id.startsWith(prefix))).toHaveLength(1);
          expect(
            chunk.imports.some((file) => pageChunks.some((page) => page.fileName === file)),
          ).toBe(false);
        }
      }
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });
}
