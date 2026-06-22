import { describe, expect, test } from "bun:test";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { createCustomConfig, expectSuccess, runTRPCTest } from "./test-utils";

async function readWebFile(projectDir: string, path: string) {
  return readFile(join(projectDir, "apps/web", path), "utf-8");
}

async function readWebPackage(projectDir: string) {
  return JSON.parse(await readWebFile(projectDir, "package.json")) as {
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
  };
}

describe("i18n Options", () => {
  describe("Paraglide", () => {
    test("generates Paraglide setup for TanStack Router", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "paraglide-tanstack-router",
          frontend: ["tanstack-router"],
          backend: "hono",
          i18n: "paraglide",
        }),
      );
      expectSuccess(result);

      const projectDir = result.projectDir!;
      const pkgJson = await readWebPackage(projectDir);
      const viteConfig = await readWebFile(projectDir, "vite.config.ts");
      const settings = await readWebFile(projectDir, "project.inlang/settings.json");
      const englishMessages = await readWebFile(projectDir, "messages/en.json");

      expect(pkgJson.devDependencies?.["@inlang/paraglide-js"]).toBeDefined();
      expect(viteConfig).toContain('import { paraglideVitePlugin } from "@inlang/paraglide-js"');
      expect(viteConfig).toContain("paraglideVitePlugin({");
      expect(viteConfig).toContain('outdir: "./src/paraglide"');
      expect(settings).toContain('"baseLocale": "en"');
      expect(settings).toContain('"locales": ["en", "fr"]');
      expect(englishMessages).toContain('"hello_world": "Hello {name}!"');
    });

    test("uses SvelteKit's src/lib outdir", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "paraglide-svelte",
          frontend: ["svelte"],
          backend: "self",
          runtime: "none",
          api: "orpc",
          i18n: "paraglide",
        }),
      );
      expectSuccess(result);

      const viteConfig = await readWebFile(result.projectDir!, "vite.config.ts");
      expect(viteConfig).toContain("paraglideVitePlugin({");
      expect(viteConfig).toContain('outdir: "./src/lib/paraglide"');
    });

    test("generates nested Vite setup for Nuxt", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "paraglide-nuxt",
          frontend: ["nuxt"],
          backend: "self",
          runtime: "none",
          api: "orpc",
          i18n: "paraglide",
        }),
      );
      expectSuccess(result);

      const nuxtConfig = await readWebFile(result.projectDir!, "nuxt.config.ts");
      expect(nuxtConfig).toContain('import { paraglideVitePlugin } from "@inlang/paraglide-js"');
      expect(nuxtConfig).toContain("vite:");
      expect(nuxtConfig).toContain("paraglideVitePlugin({");
      expect(nuxtConfig).toContain('outdir: "./app/paraglide"');
    });

    test("generates Webpack setup for Next.js", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "paraglide-next",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          api: "trpc",
          i18n: "paraglide",
        }),
      );
      expectSuccess(result);

      const nextConfig = await readWebFile(result.projectDir!, "next.config.ts");
      expect(nextConfig).toContain(
        'import { paraglideWebpackPlugin } from "@inlang/paraglide-js"',
      );
      expect(nextConfig).toContain("webpackConfig.plugins.push(");
      expect(nextConfig).toContain("paraglideWebpackPlugin({");
      expect(nextConfig).toContain('outdir: "./src/paraglide"');
    });
  });
});
