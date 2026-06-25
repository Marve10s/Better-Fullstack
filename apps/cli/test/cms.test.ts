import { describe, expect, test } from "bun:test";

import { createCustomConfig, expectSuccess, runTRPCTest } from "./test-utils";

describe("CMS Options", () => {
  describe("Keystatic CMS", () => {
    test("keystatic with Next.js emits admin route, config, content, and dependencies", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "keystatic-next",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          database: "sqlite",
          cms: "keystatic",
        }),
      );

      expectSuccess(result);
      const pkg = await Bun.file(`${result.projectDir}/apps/web/package.json`).text();
      const config = await Bun.file(`${result.projectDir}/apps/web/keystatic.config.ts`).text();
      const route = await Bun.file(
        `${result.projectDir}/apps/web/src/app/api/keystatic/[...params]/route.ts`,
      ).text();
      const admin = await Bun.file(
        `${result.projectDir}/apps/web/src/app/keystatic/keystatic.ts`,
      ).text();
      const content = await Bun.file(
        `${result.projectDir}/apps/web/src/content/posts/hello-world.mdoc`,
      ).text();

      expect(pkg).toContain('"@keystatic/core"');
      expect(pkg).toContain('"@keystatic/next"');
      expect(pkg).toContain('"@markdoc/markdoc"');
      expect(config).toContain('kind: "local"');
      expect(config).toContain("fields.markdoc");
      expect(route).toContain("makeRouteHandler");
      expect(admin).toContain("makePage");
      expect(content).toContain("Keystatic-powered content collection");
    });

    test("keystatic with Astro skips unsupported Astro 7 integration", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "keystatic-astro",
          frontend: ["astro"],
          astroIntegration: "vue",
          backend: "self",
          runtime: "none",
          api: "orpc",
          database: "sqlite",
          cms: "keystatic",
        }),
      );

      expectSuccess(result);
      const pkg = await Bun.file(`${result.projectDir}/apps/web/package.json`).text();
      const astroConfig = await Bun.file(`${result.projectDir}/apps/web/astro.config.mjs`).text();

      expect(pkg).not.toContain("@keystatic/core");
      expect(pkg).not.toContain("@keystatic/astro");
      expect(pkg).not.toContain("@astrojs/markdoc");
      expect(astroConfig).not.toContain("@keystatic/astro");
      expect(astroConfig).not.toContain("markdoc()");
      expect(astroConfig).not.toContain("keystatic()");
      expect(await Bun.file(`${result.projectDir}/apps/web/keystatic.config.ts`).exists()).toBe(
        false,
      );
    });

    test("keystatic with Astro and Workers skips unsupported CMS scaffolding", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "keystatic-astro-workers-skip",
          frontend: ["astro"],
          astroIntegration: "vue",
          backend: "hono",
          runtime: "workers",
          serverDeploy: "cloudflare",
          api: "orpc",
          database: "none",
          orm: "none",
          cms: "keystatic",
        }),
      );

      expectSuccess(result);
      const pkg = await Bun.file(`${result.projectDir}/apps/web/package.json`).text();
      const astroConfig = await Bun.file(`${result.projectDir}/apps/web/astro.config.mjs`).text();

      expect(pkg).not.toContain("@keystatic/core");
      expect(pkg).not.toContain("@keystatic/astro");
      expect(astroConfig).not.toContain("@keystatic/astro");
      expect(astroConfig).not.toContain("keystatic()");
      expect(await Bun.file(`${result.projectDir}/apps/web/keystatic.config.ts`).exists()).toBe(
        false,
      );
    });
  });

  describe("Directus CMS", () => {
    test("directus with TanStack Router", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "directus-tanstack",
          frontend: ["tanstack-router"],
          backend: "hono",
          cms: "directus",
        }),
      );

      expectSuccess(result);
      const client = await Bun.file(`${result.projectDir}/apps/web/src/directus/client.ts`).text();
      const pkg = await Bun.file(`${result.projectDir}/apps/web/package.json`).text();
      const env = await Bun.file(`${result.projectDir}/apps/web/.env`).text();

      expect(client).toContain("@directus/sdk");
      expect(pkg).toContain('"@directus/sdk"');
      expect(env).toContain("VITE_DIRECTUS_URL");
    });

    test("directus with Nuxt exposes runtime config", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "directus-nuxt",
          frontend: ["nuxt"],
          backend: "hono",
          runtime: "bun",
          api: "orpc",
          cms: "directus",
        }),
      );

      expectSuccess(result);
      const client = await Bun.file(`${result.projectDir}/apps/web/src/directus/client.ts`).text();
      const nuxtConfig = await Bun.file(`${result.projectDir}/apps/web/nuxt.config.ts`).text();
      const env = await Bun.file(`${result.projectDir}/apps/web/.env`).text();

      expect(client).toContain("config.public.directusUrl");
      expect(client).toContain("config.directusStaticToken");
      expect(nuxtConfig).toContain("directusStaticToken: process.env.DIRECTUS_STATIC_TOKEN");
      expect(nuxtConfig).toContain("directusUrl: process.env.NUXT_PUBLIC_DIRECTUS_URL");
      expect(env).toContain("NUXT_PUBLIC_DIRECTUS_URL");
      expect(env).toContain("DIRECTUS_STATIC_TOKEN");
    });
  });

  describe("Payload CMS with Next.js", () => {
    test("payload with Next.js and SQLite", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "payload-nextjs-sqlite",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          database: "sqlite",
          cms: "payload",
        }),
      );
      expectSuccess(result);
    });

    test("payload with Next.js and PostgreSQL", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "payload-nextjs-postgres",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          database: "postgres",
          cms: "payload",
        }),
      );
      expectSuccess(result);
    });

    test("payload with Next.js and MongoDB", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "payload-nextjs-mongodb",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          database: "mongodb",
          orm: "mongoose",
          cms: "payload",
        }),
      );
      expectSuccess(result);
    });
  });

  describe("Payload CMS with different ORMs", () => {
    test("payload with Drizzle ORM", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "payload-drizzle",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          database: "postgres",
          orm: "drizzle",
          cms: "payload",
        }),
      );
      expectSuccess(result);
    });

    test("payload with Prisma ORM", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "payload-prisma",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          database: "postgres",
          orm: "prisma",
          cms: "payload",
        }),
      );
      expectSuccess(result);
    });
  });

  describe("Payload CMS with authentication", () => {
    test("payload with better-auth", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "payload-better-auth",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          database: "sqlite",
          auth: "better-auth",
          cms: "payload",
        }),
      );
      expectSuccess(result);
    });

    test("payload with nextauth", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "payload-nextauth",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          database: "sqlite",
          auth: "nextauth",
          cms: "payload",
        }),
      );
      expectSuccess(result);
    });
  });

  describe("Sanity CMS with Next.js", () => {
    test("sanity with Next.js and SQLite", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "sanity-nextjs-sqlite",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          database: "sqlite",
          cms: "sanity",
        }),
      );
      expectSuccess(result);
    });

    test("sanity with Next.js and PostgreSQL", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "sanity-nextjs-postgres",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          database: "postgres",
          cms: "sanity",
        }),
      );
      expectSuccess(result);
    });

    test("sanity with Next.js and MongoDB", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "sanity-nextjs-mongodb",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          database: "mongodb",
          orm: "mongoose",
          cms: "sanity",
        }),
      );
      expectSuccess(result);
    });
  });

  describe("Sanity CMS with different ORMs", () => {
    test("sanity with Drizzle ORM", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "sanity-drizzle",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          database: "postgres",
          orm: "drizzle",
          cms: "sanity",
        }),
      );
      expectSuccess(result);
    });

    test("sanity with Prisma ORM", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "sanity-prisma",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          database: "postgres",
          orm: "prisma",
          cms: "sanity",
        }),
      );
      expectSuccess(result);
    });
  });

  describe("Sanity CMS with authentication", () => {
    test("sanity with better-auth", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "sanity-better-auth",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          database: "sqlite",
          auth: "better-auth",
          cms: "sanity",
        }),
      );
      expectSuccess(result);
    });

    test("sanity with nextauth", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "sanity-nextauth",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          database: "sqlite",
          auth: "nextauth",
          cms: "sanity",
        }),
      );
      expectSuccess(result);
    });
  });

  describe("Strapi CMS with Next.js", () => {
    test("strapi with Next.js and SQLite", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "strapi-nextjs-sqlite",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          database: "sqlite",
          cms: "strapi",
        }),
      );
      expectSuccess(result);
    });

    test("strapi with Next.js and PostgreSQL", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "strapi-nextjs-postgres",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          database: "postgres",
          cms: "strapi",
        }),
      );
      expectSuccess(result);
    });

    test("strapi with Next.js and MongoDB", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "strapi-nextjs-mongodb",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          database: "mongodb",
          orm: "mongoose",
          cms: "strapi",
        }),
      );
      expectSuccess(result);
    });
  });

  describe("Strapi CMS with different ORMs", () => {
    test("strapi with Drizzle ORM", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "strapi-drizzle",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          database: "postgres",
          orm: "drizzle",
          cms: "strapi",
        }),
      );
      expectSuccess(result);
    });

    test("strapi with Prisma ORM", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "strapi-prisma",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          database: "postgres",
          orm: "prisma",
          cms: "strapi",
        }),
      );
      expectSuccess(result);
    });
  });

  describe("Strapi CMS with authentication", () => {
    test("strapi with better-auth", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "strapi-better-auth",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          database: "sqlite",
          auth: "better-auth",
          cms: "strapi",
        }),
      );
      expectSuccess(result);
    });

    test("strapi with nextauth", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "strapi-nextauth",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          database: "sqlite",
          auth: "nextauth",
          cms: "strapi",
        }),
      );
      expectSuccess(result);
    });
  });

  describe("TinaCMS with Next.js", () => {
    test("tinacms with Next.js and SQLite", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "tinacms-nextjs-sqlite",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          database: "sqlite",
          cms: "tinacms",
        }),
      );
      expectSuccess(result);
    });

    test("tinacms with Next.js and PostgreSQL", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "tinacms-nextjs-postgres",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          database: "postgres",
          cms: "tinacms",
        }),
      );
      expectSuccess(result);
    });

    test("tinacms with Next.js and MongoDB", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "tinacms-nextjs-mongodb",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          database: "mongodb",
          orm: "mongoose",
          cms: "tinacms",
        }),
      );
      expectSuccess(result);
    });
  });

  describe("TinaCMS with different ORMs", () => {
    test("tinacms with Drizzle ORM", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "tinacms-drizzle",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          database: "postgres",
          orm: "drizzle",
          cms: "tinacms",
        }),
      );
      expectSuccess(result);
    });

    test("tinacms with Prisma ORM", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "tinacms-prisma",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          database: "postgres",
          orm: "prisma",
          cms: "tinacms",
        }),
      );
      expectSuccess(result);
    });
  });

  describe("TinaCMS with authentication", () => {
    test("tinacms with better-auth", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "tinacms-better-auth",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          database: "sqlite",
          auth: "better-auth",
          cms: "tinacms",
        }),
      );
      expectSuccess(result);
    });

    test("tinacms with nextauth", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "tinacms-nextauth",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          database: "sqlite",
          auth: "nextauth",
          cms: "tinacms",
        }),
      );
      expectSuccess(result);
    });
  });

  describe("No CMS option", () => {
    test("none CMS option with Next.js", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "no-cms-nextjs",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          cms: "none",
        }),
      );
      expectSuccess(result);
    });

    test("none CMS option with TanStack Router", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "no-cms-tanstack",
          frontend: ["tanstack-router"],
          cms: "none",
        }),
      );
      expectSuccess(result);
    });
  });

  describe("Payload stays Next.js-only", () => {
    test("payload without Next.js still creates project (cms skipped)", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "payload-tanstack-skip",
          frontend: ["tanstack-router"],
          cms: "payload",
        }),
      );
      expectSuccess(result);
    });
  });

  describe("Sanity with non-Next.js frameworks", () => {
    test("sanity with TanStack Router", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "sanity-tanstack",
          frontend: ["tanstack-router"],
          cms: "sanity",
        }),
      );
      expectSuccess(result);

      const imageHelper = await Bun.file(
        `${result.projectDir}/apps/web/src/sanity/lib/image.ts`,
      ).text();
      expect(imageHelper).toContain('import type { SanityImageSource } from "@sanity/image-url";');
      expect(imageHelper).not.toContain("@sanity/image-url/lib/types/types");
    });

    test("sanity with Astro", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "sanity-astro",
          frontend: ["astro"],
          astroIntegration: "react",
          backend: "hono",
          runtime: "bun",
          api: "trpc",
          cms: "sanity",
        }),
      );
      expectSuccess(result);
    });

    test("sanity with Nuxt", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "sanity-nuxt",
          frontend: ["nuxt"],
          backend: "self",
          runtime: "none",
          api: "orpc",
          cms: "sanity",
        }),
      );
      expectSuccess(result);
    });

    test("sanity with SvelteKit", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "sanity-svelte",
          frontend: ["svelte"],
          backend: "self",
          runtime: "none",
          api: "orpc",
          cms: "sanity",
        }),
      );
      expectSuccess(result);
    });
  });

  describe("Strapi with non-Next.js frameworks", () => {
    test("strapi with TanStack Router", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "strapi-tanstack",
          frontend: ["tanstack-router"],
          cms: "strapi",
        }),
      );
      expectSuccess(result);
    });

    test("strapi with Astro", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "strapi-astro",
          frontend: ["astro"],
          astroIntegration: "react",
          backend: "hono",
          runtime: "bun",
          api: "trpc",
          cms: "strapi",
        }),
      );
      expectSuccess(result);
    });

    test("strapi with Nuxt", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "strapi-nuxt",
          frontend: ["nuxt"],
          backend: "self",
          runtime: "none",
          api: "orpc",
          cms: "strapi",
        }),
      );
      expectSuccess(result);
    });

    test("strapi with SvelteKit", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "strapi-svelte",
          frontend: ["svelte"],
          backend: "self",
          runtime: "none",
          api: "orpc",
          cms: "strapi",
        }),
      );
      expectSuccess(result);
    });
  });

  describe("TinaCMS with non-Next.js frameworks", () => {
    test("tinacms with TanStack Router", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "tinacms-tanstack",
          frontend: ["tanstack-router"],
          cms: "tinacms",
        }),
      );
      expectSuccess(result);
    });

    test("tinacms with Astro", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "tinacms-astro",
          frontend: ["astro"],
          astroIntegration: "react",
          backend: "hono",
          runtime: "bun",
          api: "trpc",
          cms: "tinacms",
        }),
      );
      expectSuccess(result);
    });

    test("tinacms with Nuxt", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "tinacms-nuxt",
          frontend: ["nuxt"],
          backend: "self",
          runtime: "none",
          api: "orpc",
          cms: "tinacms",
        }),
      );
      expectSuccess(result);
    });

    test("tinacms with SvelteKit", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "tinacms-svelte",
          frontend: ["svelte"],
          backend: "self",
          runtime: "none",
          api: "orpc",
          cms: "tinacms",
        }),
      );
      expectSuccess(result);
    });
  });

  describe("Payload CMS with Vinext", () => {
    test("payload with Vinext and SQLite", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "payload-vinext-sqlite",
          frontend: ["vinext"],
          backend: "self",
          runtime: "none",
          database: "sqlite",
          cms: "payload",
        }),
      );
      expectSuccess(result);
    });

    test("payload with Vinext and PostgreSQL", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "payload-vinext-postgres",
          frontend: ["vinext"],
          backend: "self",
          runtime: "none",
          database: "postgres",
          cms: "payload",
        }),
      );
      expectSuccess(result);
    });

    test("payload with Vinext and MongoDB", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "payload-vinext-mongodb",
          frontend: ["vinext"],
          backend: "self",
          runtime: "none",
          database: "mongodb",
          orm: "mongoose",
          cms: "payload",
        }),
      );
      expectSuccess(result);
    });
  });

  describe("Sanity CMS with Vinext", () => {
    test("sanity with Vinext and SQLite", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "sanity-vinext-sqlite",
          frontend: ["vinext"],
          backend: "self",
          runtime: "none",
          database: "sqlite",
          cms: "sanity",
        }),
      );
      expectSuccess(result);
    });

    test("sanity with Vinext and PostgreSQL", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "sanity-vinext-postgres",
          frontend: ["vinext"],
          backend: "self",
          runtime: "none",
          database: "postgres",
          cms: "sanity",
        }),
      );
      expectSuccess(result);
    });

    test("sanity with Vinext and MongoDB", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "sanity-vinext-mongodb",
          frontend: ["vinext"],
          backend: "self",
          runtime: "none",
          database: "mongodb",
          orm: "mongoose",
          cms: "sanity",
        }),
      );
      expectSuccess(result);
    });
  });

  describe("Strapi CMS with Vinext", () => {
    test("strapi with Vinext and SQLite", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "strapi-vinext-sqlite",
          frontend: ["vinext"],
          backend: "self",
          runtime: "none",
          database: "sqlite",
          cms: "strapi",
        }),
      );
      expectSuccess(result);
    });

    test("strapi with Vinext and PostgreSQL", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "strapi-vinext-postgres",
          frontend: ["vinext"],
          backend: "self",
          runtime: "none",
          database: "postgres",
          cms: "strapi",
        }),
      );
      expectSuccess(result);
    });

    test("strapi with Vinext and MongoDB", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "strapi-vinext-mongodb",
          frontend: ["vinext"],
          backend: "self",
          runtime: "none",
          database: "mongodb",
          orm: "mongoose",
          cms: "strapi",
        }),
      );
      expectSuccess(result);
    });
  });

  describe("TinaCMS with Vinext", () => {
    test("tinacms with Vinext and SQLite", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "tinacms-vinext-sqlite",
          frontend: ["vinext"],
          backend: "self",
          runtime: "none",
          database: "sqlite",
          cms: "tinacms",
        }),
      );
      expectSuccess(result);
    });

    test("tinacms with Vinext and PostgreSQL", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "tinacms-vinext-postgres",
          frontend: ["vinext"],
          backend: "self",
          runtime: "none",
          database: "postgres",
          cms: "tinacms",
        }),
      );
      expectSuccess(result);
    });

    test("tinacms with Vinext and MongoDB", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "tinacms-vinext-mongodb",
          frontend: ["vinext"],
          backend: "self",
          runtime: "none",
          database: "mongodb",
          orm: "mongoose",
          cms: "tinacms",
        }),
      );
      expectSuccess(result);
    });
  });
});
