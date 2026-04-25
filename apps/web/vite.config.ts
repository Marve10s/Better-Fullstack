import mdx from "@mdx-js/rollup";
import rehypeShiki from "@shikijs/rehype";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { defineConfig, type PluginOption } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import { remarkExtractToc } from "./src/lib/docs/remark-extract-toc";
import { remarkNpmTabs } from "./src/lib/docs/remark-npm-tabs";

export default defineConfig({
  server: {
    port: 3333,
  },
  envPrefix: ["VITE_", "BFS_ENABLE_STACK_PREVIEW"],
  build: {
    sourcemap: false,
    minify: "esbuild",
    rollupOptions: {
      // ts-morph is only used by template-generator processors in Node.js (CLI).
      // The browser dynamic imports gracefully catch the failure, so exclude it
      // from the client bundle entirely (~1.4MB gzip savings).
      external: ["ts-morph"],
    },
  },
  plugins: [
    tsconfigPaths({
      projects: ["./tsconfig.json"],
      ignoreConfigErrors: true,
    }),
    // MDX must come BEFORE react/start plugins so .mdx files are compiled to
    // JSX before downstream plugins try to transform them. The pipeline is:
    //   1. remark-frontmatter      — recognise YAML frontmatter blocks
    //   2. remark-mdx-frontmatter  — re-export it as `export const frontmatter`
    //   3. remark-gfm              — GitHub-flavoured markdown (tables, etc.)
    //   4. remark-extract-toc      — emit `export const toc` + heading ids
    //   5. rehype-shiki            — syntax highlighting using existing shiki dep
    {
      enforce: "pre",
      ...mdx({
        providerImportSource: "@mdx-js/react",
        remarkPlugins: [
          remarkFrontmatter,
          [remarkMdxFrontmatter, { name: "frontmatter" }],
          remarkGfm,
          remarkNpmTabs,
          remarkExtractToc,
        ],
        rehypePlugins: [
          [
            rehypeShiki,
            {
              theme: "github-dark-default",
            },
          ],
        ],
      }),
    },
    tanstackStart({
      srcDirectory: "src",
    }),
    nitro({
      config: {
        preset: "vercel",
        minify: true,
        sourceMap: false,
        routeRules: {
          "/": {
            headers: {
              "cache-control": "public, max-age=0, s-maxage=300, stale-while-revalidate=3600",
            },
          },
          "/new": {
            headers: {
              "cache-control": "public, max-age=0, s-maxage=300, stale-while-revalidate=3600",
            },
          },
          "/compare": {
            headers: {
              "cache-control": "public, max-age=0, s-maxage=300, stale-while-revalidate=3600",
            },
          },
          "/docs/**": {
            headers: {
              "cache-control": "public, max-age=0, s-maxage=300, stale-while-revalidate=3600",
            },
          },
        },
      },
    }) as PluginOption,
    // React's vite plugin must come after TanStack Start's plugin
    viteReact(),
    tailwindcss(),
  ],
});
