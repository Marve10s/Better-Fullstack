import mdx from "@mdx-js/rollup";
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import rehypeShiki from "@shikijs/rehype";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { nitro } from "nitro/vite";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { defineConfig, type PluginOption } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import cliPackage from "../cli/package.json";

import { paraglideCompilerOptions } from "./paraglide.config";
import { remarkExtractToc } from "./src/lib/docs/remark-extract-toc";
import { remarkNpmTabs } from "./src/lib/docs/remark-npm-tabs";
import { contentMetaPlugin } from "./vite-plugins/content-meta";

const buildDate = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
}).format(new Date()).toLowerCase();

const ssrMdxLoaderAliases = new Map([
  [
    "@/lib/docs/mdx-loaders",
    fileURLToPath(new URL("./src/lib/docs/mdx-loaders.ssr.ts", import.meta.url)),
  ],
  [
    "@/lib/guides/mdx-loaders",
    fileURLToPath(new URL("./src/lib/guides/mdx-loaders.ssr.ts", import.meta.url)),
  ],
  [
    "@/lib/blog/mdx-loaders",
    fileURLToPath(new URL("./src/lib/blog/mdx-loaders.ssr.ts", import.meta.url)),
  ],
  [
    "virtual:localized-content",
    fileURLToPath(new URL("./src/lib/i18n/localized-content.ssr.ts", import.meta.url)),
  ],
]);

function ssrMdxLoaderAliasPlugin(): PluginOption {
  return {
    name: "better-fullstack:ssr-mdx-loader-alias",
    enforce: "pre",
    resolveId(source, _importer, options) {
      return options.ssr ? ssrMdxLoaderAliases.get(source) : undefined;
    },
  };
}

export default defineConfig({
  server: {
    port: 3333,
  },
  envPrefix: ["VITE_", "BFS_ENABLE_STACK_PREVIEW"],
  define: {
    __BFS_CLI_VERSION__: JSON.stringify(cliPackage.version),
    __BFS_BUILD_DATE__: JSON.stringify(buildDate),
  },
  build: {
    sourcemap: false,
    minify: "esbuild",
    rollupOptions: {
      // ts-morph is only used by template-generator processors in Node.js (CLI).
      // The browser dynamic imports gracefully catch the failure, so exclude it
      // from the client bundle entirely (~1.4MB gzip savings).
      external: ["ts-morph"],
      output: {
        // Localized MDX bodies are lazy-loaded per (page, locale) via dynamic
        // imports of `virtual:localized-content-mdx/<subdir>/<locale>/<path>`.
        // Rollup's default name keeps only the page slug, so the locale is lost
        // and every locale's chunk is indistinguishable from the English one.
        // Stamp the locale into the filename (`<page>.<locale>-<hash>.js`) so the
        // performance-budget check can recognise and exclude this lazy,
        // non-critical-path content from the initial-load JS budget.
        chunkFileNames(chunkInfo) {
          const id = chunkInfo.facadeModuleId;
          if (id) {
            const mdx =
              /virtual:localized-content-mdx\/(?:docs|guides|blog)\/([^/]+)\//.exec(id);
            if (mdx) {
              return `assets/[name].${mdx[1]}-[hash].js`;
            }
            const raw = /virtual:localized-content-raw\/([^/]+)/.exec(id);
            if (raw) {
              return `assets/[name].${raw[1]}-[hash].js`;
            }
          }
          return "assets/[name]-[hash].js";
        },
      },
    },
  },
  plugins: [
    contentMetaPlugin(),
    ssrMdxLoaderAliasPlugin(),
    paraglideVitePlugin(paraglideCompilerOptions),
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
        // The client bundles remain minified by Vite. Keeping the final Nitro
        // server bundle unminified avoids a large heap spike when many MDX
        // chunks are present for localized content.
        minify: false,
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
          "/guides/**": {
            headers: {
              "cache-control": "public, max-age=0, s-maxage=300, stale-while-revalidate=3600",
            },
          },
          "/sitemap.xml": {
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
