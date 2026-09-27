import { mdxContentPlugin } from "@vite-plugins/mdx-content";
import { expect, it } from "bun:test";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "vite";

import { buildSearchSections, createDocSearch } from "@/lib/docs/search";

it("indexes the body of raw MDX imports through the real MDX plugin", async () => {
  const entryId = "virtual:raw-search-test";
  const result = await build({
    configFile: false,
    root: path.resolve(import.meta.dir, "../.."),
    logLevel: "silent",
    ssr: { noExternal: true },
    plugins: [
      mdxContentPlugin({}),
      {
        name: "raw-search-test",
        resolveId(id) {
          if (id === entryId) return id;
        },
        load(id) {
          if (id === entryId)
            return 'export { default as rawSource } from "/content/docs/cli/create.mdx?raw";';
        },
      },
    ],
    build: {
      write: false,
      ssr: true,
      rollupOptions: { input: entryId, preserveEntrySignatures: "strict" },
    },
  });
  if (!("output" in result)) throw new Error("Expected a single Vite build output");
  const entry = result.output.find((output) => output.type === "chunk" && output.isEntry);
  if (entry?.type !== "chunk") throw new Error("Missing raw search entry");
  const directory = await mkdtemp(path.join(tmpdir(), "bf-raw-search-"));
  try {
    const file = path.join(directory, "raw.mjs");
    await writeFile(file, entry.code);
    const { rawSource }: { rawSource: unknown } = await import(pathToFileURL(file).href);
    expect(typeof rawSource).toBe("string");
    const search = await createDocSearch(
      buildSearchSections([{ url: "/docs/cli/create", rawSource }]),
    );
    const hits = await search.query("auth");
    expect(hits.length).toBeGreaterThan(0);
    expect(hits[0].pageTitle).toBe("Create Command");
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
