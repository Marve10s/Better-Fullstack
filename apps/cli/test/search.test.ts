import { describe, expect, test } from "bun:test";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { createCustomConfig, expectSuccess, runTRPCTest } from "./test-utils";

describe("Search Options", () => {
  describe("Meilisearch with different backends", () => {
    test("meilisearch with Hono backend", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "meilisearch-hono",
          frontend: ["tanstack-router"],
          backend: "hono",
          search: "meilisearch",
        }),
      );
      expectSuccess(result);
    });

    test("meilisearch with Express backend", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "meilisearch-express",
          frontend: ["tanstack-router"],
          backend: "express",
          runtime: "node",
          search: "meilisearch",
        }),
      );
      expectSuccess(result);
    });

    test("meilisearch with Fastify backend", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "meilisearch-fastify",
          frontend: ["tanstack-router"],
          backend: "fastify",
          runtime: "node",
          search: "meilisearch",
        }),
      );
      expectSuccess(result);
    });

    test("meilisearch with Elysia backend", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "meilisearch-elysia",
          frontend: ["tanstack-router"],
          backend: "elysia",
          runtime: "bun",
          search: "meilisearch",
        }),
      );
      expectSuccess(result);
    });

    test("meilisearch with NestJS backend", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "meilisearch-nestjs",
          frontend: ["tanstack-router"],
          backend: "nestjs",
          runtime: "node",
          search: "meilisearch",
        }),
      );
      expectSuccess(result);
    });
  });

  describe("Meilisearch with fullstack frameworks", () => {
    test("meilisearch with Next.js fullstack", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "meilisearch-nextjs",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          search: "meilisearch",
        }),
      );
      expectSuccess(result);
    });

    test("meilisearch with TanStack Start", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "meilisearch-tanstack-start",
          frontend: ["tanstack-start"],
          backend: "self",
          runtime: "none",
          search: "meilisearch",
        }),
      );
      expectSuccess(result);
    });
  });

  describe("Meilisearch with different frontends", () => {
    test("meilisearch with TanStack Router", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "meilisearch-tanstack-router",
          frontend: ["tanstack-router"],
          search: "meilisearch",
        }),
      );
      expectSuccess(result);
    });

    test("meilisearch with React Router", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "meilisearch-react-router",
          frontend: ["react-router"],
          search: "meilisearch",
        }),
      );
      expectSuccess(result);
    });

    test("meilisearch with Svelte", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "meilisearch-svelte",
          frontend: ["svelte"],
          uiLibrary: "daisyui",
          api: "orpc",
          search: "meilisearch",
        }),
      );
      expectSuccess(result);
    });

    test("meilisearch with Solid", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "meilisearch-solid",
          frontend: ["solid"],
          uiLibrary: "daisyui",
          api: "orpc",
          search: "meilisearch",
        }),
      );
      expectSuccess(result);
    });
  });

  describe("Meilisearch with database setups", () => {
    test("meilisearch with PostgreSQL and Drizzle", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "meilisearch-postgres-drizzle",
          frontend: ["tanstack-router"],
          database: "postgres",
          orm: "drizzle",
          search: "meilisearch",
        }),
      );
      expectSuccess(result);
    });

    test("meilisearch with SQLite and Prisma", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "meilisearch-sqlite-prisma",
          frontend: ["tanstack-router"],
          database: "sqlite",
          orm: "prisma",
          search: "meilisearch",
        }),
      );
      expectSuccess(result);
    });

    test("meilisearch with MySQL and TypeORM", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "meilisearch-mysql-typeorm",
          frontend: ["tanstack-router"],
          database: "mysql",
          orm: "typeorm",
          runtime: "node",
          search: "meilisearch",
        }),
      );
      expectSuccess(result);
    });
  });

  describe("Meilisearch with authentication", () => {
    test("meilisearch with Better Auth", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "meilisearch-better-auth",
          frontend: ["tanstack-router"],
          auth: "better-auth",
          search: "meilisearch",
        }),
      );
      expectSuccess(result);
    });

    test("meilisearch with Auth.js", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "meilisearch-authjs",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          auth: "nextauth",
          search: "meilisearch",
        }),
      );
      expectSuccess(result);
    });
  });

  describe("Typesense with different backends", () => {
    test("typesense with Hono backend", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "typesense-hono",
          frontend: ["tanstack-router"],
          backend: "hono",
          search: "typesense",
        }),
      );
      expectSuccess(result);
    });

    test("typesense with Express backend", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "typesense-express",
          frontend: ["tanstack-router"],
          backend: "express",
          runtime: "node",
          search: "typesense",
        }),
      );
      expectSuccess(result);
    });

    test("typesense with Fastify backend", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "typesense-fastify",
          frontend: ["tanstack-router"],
          backend: "fastify",
          runtime: "node",
          search: "typesense",
        }),
      );
      expectSuccess(result);
    });

    test("typesense with Elysia backend", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "typesense-elysia",
          frontend: ["tanstack-router"],
          backend: "elysia",
          runtime: "bun",
          search: "typesense",
        }),
      );
      expectSuccess(result);
    });

    test("typesense with NestJS backend", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "typesense-nestjs",
          frontend: ["tanstack-router"],
          backend: "nestjs",
          runtime: "node",
          search: "typesense",
        }),
      );
      expectSuccess(result);
    });
  });

  describe("Typesense with fullstack frameworks", () => {
    test("typesense with Next.js fullstack", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "typesense-nextjs",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          search: "typesense",
        }),
      );
      expectSuccess(result);
    });

    test("typesense with TanStack Start", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "typesense-tanstack-start",
          frontend: ["tanstack-start"],
          backend: "self",
          runtime: "none",
          search: "typesense",
        }),
      );
      expectSuccess(result);
    });
  });

  describe("Typesense with different frontends", () => {
    test("typesense with TanStack Router", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "typesense-tanstack-router",
          frontend: ["tanstack-router"],
          search: "typesense",
        }),
      );
      expectSuccess(result);
    });

    test("typesense with React Router", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "typesense-react-router",
          frontend: ["react-router"],
          search: "typesense",
        }),
      );
      expectSuccess(result);
    });

    test("typesense with Svelte", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "typesense-svelte",
          frontend: ["svelte"],
          uiLibrary: "daisyui",
          api: "orpc",
          search: "typesense",
        }),
      );
      expectSuccess(result);
    });

    test("typesense with Solid", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "typesense-solid",
          frontend: ["solid"],
          uiLibrary: "daisyui",
          api: "orpc",
          search: "typesense",
        }),
      );
      expectSuccess(result);
    });
  });

  describe("Typesense with database setups", () => {
    test("typesense with PostgreSQL and Drizzle", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "typesense-postgres-drizzle",
          frontend: ["tanstack-router"],
          database: "postgres",
          orm: "drizzle",
          search: "typesense",
        }),
      );
      expectSuccess(result);
    });

    test("typesense with SQLite and Prisma", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "typesense-sqlite-prisma",
          frontend: ["tanstack-router"],
          database: "sqlite",
          orm: "prisma",
          search: "typesense",
        }),
      );
      expectSuccess(result);
    });

    test("typesense with MySQL and TypeORM", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "typesense-mysql-typeorm",
          frontend: ["tanstack-router"],
          database: "mysql",
          orm: "typeorm",
          runtime: "node",
          search: "typesense",
        }),
      );
      expectSuccess(result);
    });
  });

  describe("Typesense with authentication", () => {
    test("typesense with Better Auth", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "typesense-better-auth",
          frontend: ["tanstack-router"],
          auth: "better-auth",
          search: "typesense",
        }),
      );
      expectSuccess(result);
    });

    test("typesense with Auth.js", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "typesense-authjs",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          auth: "nextauth",
          search: "typesense",
        }),
      );
      expectSuccess(result);
    });
  });

  describe("Elasticsearch with different backends", () => {
    test("elasticsearch with Hono backend", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "elasticsearch-hono",
          frontend: ["tanstack-router"],
          backend: "hono",
          search: "elasticsearch",
        }),
      );
      expectSuccess(result);
    });

    test("elasticsearch with Express backend", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "elasticsearch-express",
          frontend: ["tanstack-router"],
          backend: "express",
          runtime: "node",
          search: "elasticsearch",
        }),
      );
      expectSuccess(result);
    });

    test("elasticsearch with Fastify backend", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "elasticsearch-fastify",
          frontend: ["tanstack-router"],
          backend: "fastify",
          runtime: "node",
          search: "elasticsearch",
        }),
      );
      expectSuccess(result);
    });

    test("elasticsearch with Elysia backend", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "elasticsearch-elysia",
          frontend: ["tanstack-router"],
          backend: "elysia",
          runtime: "bun",
          search: "elasticsearch",
        }),
      );
      expectSuccess(result);
    });

    test("elasticsearch with NestJS backend", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "elasticsearch-nestjs",
          frontend: ["tanstack-router"],
          backend: "nestjs",
          runtime: "node",
          search: "elasticsearch",
        }),
      );
      expectSuccess(result);
    });
  });

  describe("Elasticsearch with fullstack frameworks", () => {
    test("elasticsearch with Next.js fullstack", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "elasticsearch-nextjs",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          search: "elasticsearch",
        }),
      );
      expectSuccess(result);
    });

    test("elasticsearch with TanStack Start", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "elasticsearch-tanstack-start",
          frontend: ["tanstack-start"],
          backend: "self",
          runtime: "none",
          search: "elasticsearch",
        }),
      );
      expectSuccess(result);
    });
  });

  describe("Elasticsearch with different frontends", () => {
    test("elasticsearch with TanStack Router", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "elasticsearch-tanstack-router",
          frontend: ["tanstack-router"],
          search: "elasticsearch",
        }),
      );
      expectSuccess(result);
    });

    test("elasticsearch with React Router", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "elasticsearch-react-router",
          frontend: ["react-router"],
          search: "elasticsearch",
        }),
      );
      expectSuccess(result);
    });

    test("elasticsearch with Svelte", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "elasticsearch-svelte",
          frontend: ["svelte"],
          uiLibrary: "daisyui",
          api: "orpc",
          search: "elasticsearch",
        }),
      );
      expectSuccess(result);
    });

    test("elasticsearch with Solid", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "elasticsearch-solid",
          frontend: ["solid"],
          uiLibrary: "daisyui",
          api: "orpc",
          search: "elasticsearch",
        }),
      );
      expectSuccess(result);
    });
  });

  describe("Elasticsearch with database setups", () => {
    test("elasticsearch with PostgreSQL and Drizzle", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "elasticsearch-postgres-drizzle",
          frontend: ["tanstack-router"],
          database: "postgres",
          orm: "drizzle",
          search: "elasticsearch",
        }),
      );
      expectSuccess(result);
    });

    test("elasticsearch with SQLite and Prisma", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "elasticsearch-sqlite-prisma",
          frontend: ["tanstack-router"],
          database: "sqlite",
          orm: "prisma",
          search: "elasticsearch",
        }),
      );
      expectSuccess(result);
    });

    test("elasticsearch with MySQL and TypeORM", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "elasticsearch-mysql-typeorm",
          frontend: ["tanstack-router"],
          database: "mysql",
          orm: "typeorm",
          runtime: "node",
          search: "elasticsearch",
        }),
      );
      expectSuccess(result);
    });
  });

  describe("Elasticsearch with authentication", () => {
    test("elasticsearch with Better Auth", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "elasticsearch-better-auth",
          frontend: ["tanstack-router"],
          auth: "better-auth",
          search: "elasticsearch",
        }),
      );
      expectSuccess(result);
    });

    test("elasticsearch with Auth.js", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "elasticsearch-authjs",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          auth: "nextauth",
          search: "elasticsearch",
        }),
      );
      expectSuccess(result);
    });
  });

  describe("Algolia with different backends", () => {
    test("algolia with Hono backend", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "algolia-hono",
          frontend: ["tanstack-router"],
          backend: "hono",
          search: "algolia",
        }),
      );
      expectSuccess(result);
    });

    test("algolia with Express backend", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "algolia-express",
          frontend: ["tanstack-router"],
          backend: "express",
          runtime: "node",
          search: "algolia",
        }),
      );
      expectSuccess(result);
    });

    test("algolia with Elysia backend", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "algolia-elysia",
          frontend: ["tanstack-router"],
          backend: "elysia",
          runtime: "bun",
          search: "algolia",
        }),
      );
      expectSuccess(result);
    });
  });

  describe("Algolia with fullstack frameworks", () => {
    test("algolia with Next.js fullstack", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "algolia-nextjs",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          search: "algolia",
        }),
      );
      expectSuccess(result);
    });
  });

  describe("Algolia generated files", () => {
    test("server backends emit search helper, dependency, and env for algolia", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "algolia-server-files",
          frontend: ["tanstack-router"],
          backend: "hono",
          search: "algolia",
        }),
      );
      expectSuccess(result);

      const projectDir = result.projectDir!;
      const helper = await readFile(join(projectDir, "apps/server/src/lib/search.ts"), "utf-8");
      const pkg = await readFile(join(projectDir, "apps/server/package.json"), "utf-8");
      const env = await readFile(join(projectDir, "apps/server/.env"), "utf-8");

      expect(helper).toContain('from "algoliasearch"');
      expect(pkg).toContain('"algoliasearch"');
      expect(env).toContain("ALGOLIA_APP_ID=");
      expect(env).toContain("ALGOLIA_API_KEY=");
    });

    test("self backends emit search helper, dependency, and env for algolia", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "algolia-self-files",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          search: "algolia",
        }),
      );
      expectSuccess(result);

      const projectDir = result.projectDir!;
      const helper = await readFile(join(projectDir, "apps/web/src/lib/search.ts"), "utf-8");
      const pkg = await readFile(join(projectDir, "apps/web/package.json"), "utf-8");
      const env = await readFile(join(projectDir, "apps/web/.env"), "utf-8");

      expect(helper).toContain("export const searchClient");
      expect(pkg).toContain('"algoliasearch"');
      expect(env).toContain("ALGOLIA_APP_ID=");
      expect(env).toContain("ALGOLIA_API_KEY=");
    });
  });

  describe("Generated search files", () => {
    test("server backends emit search helper, dependency, and env for elasticsearch", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "elasticsearch-server-files",
          frontend: ["tanstack-router"],
          backend: "hono",
          search: "elasticsearch",
        }),
      );
      expectSuccess(result);

      const projectDir = result.projectDir!;
      const helper = await readFile(join(projectDir, "apps/server/src/lib/search.ts"), "utf-8");
      const pkg = await readFile(join(projectDir, "apps/server/package.json"), "utf-8");
      const env = await readFile(join(projectDir, "apps/server/.env"), "utf-8");

      expect(helper).toContain('from "@elastic/elasticsearch"');
      expect(pkg).toContain('"@elastic/elasticsearch"');
      expect(env).toContain("ELASTICSEARCH_NODE=http://localhost:9200");
      expect(env).toContain("ELASTICSEARCH_CLOUD_ID=");
    });

    test("self backends emit search helper, dependency, and env for all search engines", async () => {
      const searches = ["meilisearch", "typesense", "elasticsearch", "algolia"] as const;

      for (const search of searches) {
        const result = await runTRPCTest(
          createCustomConfig({
            projectName: `${search}-self-files`,
            frontend: ["next"],
            backend: "self",
            runtime: "none",
            search,
          }),
        );
        expectSuccess(result);

        const projectDir = result.projectDir!;
        const helper = await readFile(join(projectDir, "apps/web/src/lib/search.ts"), "utf-8");
        const pkg = await readFile(join(projectDir, "apps/web/package.json"), "utf-8");
        const env = await readFile(join(projectDir, "apps/web/.env"), "utf-8");

        expect(helper).toContain("export const searchClient");
        if (search === "meilisearch") {
          expect(pkg).toContain('"meilisearch"');
          expect(env).toContain("MEILISEARCH_HOST=http://localhost:7700");
        } else if (search === "typesense") {
          expect(pkg).toContain('"typesense"');
          expect(env).toContain("TYPESENSE_HOST=localhost");
        } else if (search === "algolia") {
          expect(pkg).toContain('"algoliasearch"');
          expect(env).toContain("ALGOLIA_APP_ID=");
          expect(env).toContain("ALGOLIA_API_KEY=");
        } else {
          expect(pkg).toContain('"@elastic/elasticsearch"');
          expect(env).toContain("ELASTICSEARCH_NODE=http://localhost:9200");
        }
      }
    });
  });

  describe("No search option", () => {
    test("none search option", async () => {
      const result = await runTRPCTest(
        createCustomConfig({
          projectName: "no-search",
          frontend: ["tanstack-router"],
          search: "none",
        }),
      );
      expectSuccess(result);
    });
  });
});
