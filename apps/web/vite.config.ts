import { paraglideVitePlugin } from "@inlang/paraglide-js";
import mdx from "@mdx-js/rollup";
import rehypeShiki from "@shikijs/rehype";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { fileURLToPath } from "node:url";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import type { ShikiTransformer } from "shiki";
import { defineConfig, type PluginOption } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import cliPackage from "../cli/package.json";
import { paraglideCompilerOptions } from "./paraglide.config";
import { remarkExtractToc } from "./src/lib/docs/remark-extract-toc";
import { remarkNpmTabs } from "./src/lib/docs/remark-npm-tabs";
import { contentMetaPlugin } from "./vite-plugins/content-meta";

const languageClassOnPre: ShikiTransformer = {
  name: "language-class-on-pre",
  pre(node) {
    this.addClassToHast(node, `language-${this.options.lang}`);
  },
};

const buildDate = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
})
  .format(new Date())
  .toLowerCase();
const deployedGitHead = process.env.VERCEL_GIT_COMMIT_SHA ?? process.env.GITHUB_SHA ?? "";

const webContainerHeaders = {
  "Cross-Origin-Embedder-Policy": "credentialless",
  "Cross-Origin-Opener-Policy": "same-origin",
};

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
]);

const ssrTemplateGeneratorStub = fileURLToPath(
  new URL("./src/lib/template-generator-browser.ssr.ts", import.meta.url),
);

function ssrMdxLoaderAliasPlugin(): PluginOption {
  return {
    name: "better-fullstack:ssr-mdx-loader-alias",
    enforce: "pre",
    resolveId(source, _importer, options) {
      const environmentName = (this as { environment?: { name?: string } }).environment?.name;
      const isServerEnvironment =
        options.ssr || environmentName === "ssr" || environmentName === "nitro";
      return isServerEnvironment ? ssrMdxLoaderAliases.get(source) : undefined;
    },
  };
}

function ssrTemplateGeneratorAliasPlugin(): PluginOption {
  return {
    name: "better-fullstack:ssr-template-generator-alias",
    enforce: "pre",
    resolveId(source, _importer, options) {
      const environmentName = (this as { environment?: { name?: string } }).environment?.name;
      const isServerEnvironment =
        options.ssr || environmentName === "ssr" || environmentName === "nitro";

      if (isServerEnvironment && source === "@better-fullstack/template-generator/browser") {
        return ssrTemplateGeneratorStub;
      }

      return undefined;
    },
  };
}

export default defineConfig({
  server: {
    port: 3333,
    headers: webContainerHeaders,
  },
  envPrefix: ["VITE_", "BFS_ENABLE_STACK_PREVIEW"],
  define: {
    __BFS_CLI_VERSION__: JSON.stringify(cliPackage.version),
    __BFS_BUILD_DATE__: JSON.stringify(buildDate),
    __BFS_DEPLOYED_GIT_HEAD__: JSON.stringify(deployedGitHead),
  },
  build: {
    sourcemap: false,
    minify: "esbuild",
    rollupOptions: {
      external: ["ts-morph"],
      output: {
        chunkFileNames(chunkInfo) {
          const id = chunkInfo.facadeModuleId;
          if (id) {
            const shikiLanguage = /\/shiki\/dist\/langs\/([^/?]+)\.mjs(?:\?|$)/.exec(id);
            if (shikiLanguage) {
              return `assets/lazy-syntax-language-${shikiLanguage[1]}-[hash].js`;
            }
            const shikiTheme = /\/shiki\/dist\/themes\/([^/?]+)\.mjs(?:\?|$)/.exec(id);
            if (shikiTheme) {
              return `assets/lazy-syntax-theme-${shikiTheme[1]}-[hash].js`;
            }
            const bundle = /virtual:localized-content-mdx-bundle\/(docs|guides|blog)\/([^/]+)/.exec(
              id,
            );
            if (bundle) {
              return `assets/localized-content-${bundle[1]}-${bundle[2]}-[hash].js`;
            }
            const mdx = /virtual:localized-content-mdx\/(?:docs|guides|blog)\/([^/]+)\//.exec(id);
            if (mdx) {
              return `assets/localized-content-${mdx[1]}-[name]-[hash].js`;
            }
            const raw = /virtual:localized-content-raw\/([^/]+)/.exec(id);
            if (raw) {
              return `assets/localized-content-raw-${raw[1]}-[hash].js`;
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
    ssrTemplateGeneratorAliasPlugin(),
    paraglideVitePlugin(paraglideCompilerOptions),
    tsconfigPaths({
      projects: ["./tsconfig.json"],
      ignoreConfigErrors: true,
    }),
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
              themes: {
                light: "github-light-default",
                dark: "github-dark-default",
              },
              defaultColor: false,
              transformers: [languageClassOnPre],
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
              ...webContainerHeaders,
            },
          },
          "/typescript": { headers: webContainerHeaders },
          "/multi-ecosystem": { headers: webContainerHeaders },
          "/stack": {
            headers: {
              "cache-control": "public, max-age=0, s-maxage=300, stale-while-revalidate=3600",
              ...webContainerHeaders,
            },
          },
          "/stack/**": {
            headers: {
              "cache-control": "public, max-age=0, s-maxage=300, stale-while-revalidate=3600",
              ...webContainerHeaders,
            },
          },
          "/benchmark": {
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
