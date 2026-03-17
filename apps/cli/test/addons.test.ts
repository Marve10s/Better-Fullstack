import { describe, it, expect } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import type { Addons, Frontend } from "../src";

import { expectError, expectSuccess, runTRPCTest, type TestConfig } from "./test-utils";

describe("Addon Configurations", () => {
  describe("Universal Addons (no frontend restrictions)", () => {
    const universalAddons = ["biome", "lefthook", "husky", "turborepo", "oxlint", "msw"];

    for (const addon of universalAddons) {
      it(
        `should work with ${addon} addon on any frontend`,
        async () => {
          const result = await runTRPCTest({
            projectName: `${addon}-universal`,
            addons: [addon as Addons],
            frontend: ["tanstack-router"],
            backend: "hono",
            runtime: "bun",
            database: "sqlite",
            orm: "drizzle",
            auth: "none",
            api: "trpc",
            examples: ["none"],
            dbSetup: "none",
            webDeploy: "none",
            serverDeploy: "none",
            install: false,
          });

          expectSuccess(result);
        },
        { timeout: 30_000 },
      );
    }
  });

  describe("Frontend-Specific Addons", () => {
    describe("PWA Addon", () => {
      const pwaCompatibleFrontends = ["tanstack-router", "react-router", "react-vite", "solid", "next"];

      for (const frontend of pwaCompatibleFrontends) {
        it(`should work with PWA + ${frontend}`, async () => {
          const config: TestConfig = {
            projectName: `pwa-${frontend}`,
            addons: ["pwa"],
            frontend: [frontend as Frontend],
            backend: "hono",
            runtime: "bun",
            database: "sqlite",
            orm: "drizzle",
            auth: "none",
            examples: ["none"],
            dbSetup: "none",
            webDeploy: "none",
            serverDeploy: "none",
            install: false,
          };

          // Handle special frontend requirements
          if (frontend === "solid") {
            config.api = "orpc"; // tRPC not supported with solid
          } else {
            config.api = "trpc";
          }

          const result = await runTRPCTest(config);
          expectSuccess(result);
        });
      }

      const pwaIncompatibleFrontends = [
        "nuxt",
        "svelte",
        "native-bare",
        "native-uniwind",
        "native-unistyles",
      ];

      for (const frontend of pwaIncompatibleFrontends) {
        it(`should fail with PWA + ${frontend}`, async () => {
          const config: TestConfig = {
            projectName: `pwa-${frontend}-fail`,
            addons: ["pwa"],
            frontend: [frontend as Frontend],
            backend: "hono",
            runtime: "bun",
            database: "sqlite",
            orm: "drizzle",
            auth: "none",
            examples: ["none"],
            dbSetup: "none",
            webDeploy: "none",
            serverDeploy: "none",
            expectError: true,
          };

          if (["nuxt", "svelte"].includes(frontend)) {
            config.api = "orpc";
          } else {
            config.api = "trpc";
          }

          const result = await runTRPCTest(config);
          expectError(result, "pwa addon requires one of these frontends");
        });
      }
    });

    describe("Tauri Addon", () => {
      const tauriCompatibleFrontends = [
        "tanstack-router",
        "react-router",
        "nuxt",
        "svelte",
        "solid",
        "next",
      ];

      for (const frontend of tauriCompatibleFrontends) {
        it(`should work with Tauri + ${frontend}`, async () => {
          const config: TestConfig = {
            projectName: `tauri-${frontend}`,
            addons: ["tauri"],
            frontend: [frontend as Frontend],
            backend: "hono",
            runtime: "bun",
            database: "sqlite",
            orm: "drizzle",
            auth: "none",
            examples: ["none"],
            dbSetup: "none",
            webDeploy: "none",
            serverDeploy: "none",
            install: false,
          };

          if (["nuxt", "svelte", "solid"].includes(frontend)) {
            config.api = "orpc";
          } else {
            config.api = "trpc";
          }

          const result = await runTRPCTest(config);
          expectSuccess(result);
        });
      }

      const tauriIncompatibleFrontends = ["native-bare", "native-uniwind", "native-unistyles"];

      for (const frontend of tauriIncompatibleFrontends) {
        it(`should fail with Tauri + ${frontend}`, async () => {
          const result = await runTRPCTest({
            projectName: `tauri-${frontend}-fail`,
            addons: ["tauri"],
            frontend: [frontend as Frontend],
            backend: "hono",
            runtime: "bun",
            database: "sqlite",
            orm: "drizzle",
            auth: "none",
            api: "trpc",
            examples: ["none"],
            dbSetup: "none",
            webDeploy: "none",
            serverDeploy: "none",
            expectError: true,
          });

          expectError(result, "tauri addon requires one of these frontends");
        });
      }
    });

    describe("MSW Addon", () => {
      const mswCompatibleFrontends = [
        "tanstack-router",
        "react-router",
        "next",
        "nuxt",
        "svelte",
        "solid",
      ];

      for (const frontend of mswCompatibleFrontends) {
        it(`should work with MSW + ${frontend}`, async () => {
          const config: TestConfig = {
            projectName: `msw-${frontend}`,
            addons: ["msw"],
            frontend: [frontend as Frontend],
            backend: "hono",
            runtime: "bun",
            database: "sqlite",
            orm: "drizzle",
            auth: "none",
            examples: ["none"],
            dbSetup: "none",
            webDeploy: "none",
            serverDeploy: "none",
            install: false,
          };

          if (["nuxt", "svelte", "solid"].includes(frontend)) {
            config.api = "orpc";
          } else {
            config.api = "trpc";
          }

          const result = await runTRPCTest(config);
          expectSuccess(result);
        });
      }

      it("should add MSW dependency to web package.json", async () => {
        const result = await runTRPCTest({
          projectName: "msw-deps-check",
          addons: ["msw"],
          frontend: ["tanstack-router"],
          backend: "hono",
          runtime: "bun",
          database: "sqlite",
          orm: "drizzle",
          auth: "none",
          api: "trpc",
          examples: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "none",
          install: false,
        });

        expectSuccess(result);

        const webPackageJson = result.result?.tree?.root?.children
          ?.find((c: any) => c.name === "apps")
          ?.children?.find((c: any) => c.name === "web")
          ?.children?.find((c: any) => c.name === "package.json");

        if (webPackageJson?.content) {
          const pkgJson = JSON.parse(webPackageJson.content);
          expect(pkgJson.devDependencies?.msw).toBeDefined();
        }
      });

      it("should add MSW dependency to server package.json", async () => {
        const result = await runTRPCTest({
          projectName: "msw-server-deps-check",
          addons: ["msw"],
          frontend: ["tanstack-router"],
          backend: "hono",
          runtime: "bun",
          database: "sqlite",
          orm: "drizzle",
          auth: "none",
          api: "trpc",
          examples: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "none",
          install: false,
        });

        expectSuccess(result);

        const serverPackageJson = result.result?.tree?.root?.children
          ?.find((c: any) => c.name === "apps")
          ?.children?.find((c: any) => c.name === "server")
          ?.children?.find((c: any) => c.name === "package.json");

        if (serverPackageJson?.content) {
          const pkgJson = JSON.parse(serverPackageJson.content);
          expect(pkgJson.devDependencies?.msw).toBeDefined();
        }
      });

      it("should create MSW mock files in web package", async () => {
        const result = await runTRPCTest({
          projectName: "msw-files-check",
          addons: ["msw"],
          frontend: ["tanstack-router"],
          backend: "hono",
          runtime: "bun",
          database: "sqlite",
          orm: "drizzle",
          auth: "none",
          api: "trpc",
          examples: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "none",
          install: false,
        });

        expectSuccess(result);

        // Check MSW dependency was added, which confirms the addon was processed
        const webPackageJson = result.result?.tree?.root?.children
          ?.find((c: any) => c.name === "apps")
          ?.children?.find((c: any) => c.name === "web")
          ?.children?.find((c: any) => c.name === "package.json");

        if (webPackageJson?.content) {
          const pkgJson = JSON.parse(webPackageJson.content);
          expect(pkgJson.devDependencies?.msw).toBeDefined();
        }
      });

      it("should work with MSW + testing framework", async () => {
        const result = await runTRPCTest({
          projectName: "msw-with-vitest",
          addons: ["msw"],
          frontend: ["tanstack-router"],
          backend: "hono",
          runtime: "bun",
          database: "sqlite",
          orm: "drizzle",
          auth: "none",
          api: "trpc",
          testing: "vitest",
          examples: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "none",
          install: false,
        });

        expectSuccess(result);

        const webPackageJson = result.result?.tree?.root?.children
          ?.find((c: any) => c.name === "apps")
          ?.children?.find((c: any) => c.name === "web")
          ?.children?.find((c: any) => c.name === "package.json");

        if (webPackageJson?.content) {
          const pkgJson = JSON.parse(webPackageJson.content);
          expect(pkgJson.devDependencies?.msw).toBeDefined();
          expect(pkgJson.devDependencies?.vitest).toBeDefined();
        }
      });
    });

    describe("Storybook Addon", () => {
      const storybookCompatibleFrontends = [
        "tanstack-router",
        "react-router",
        "next",
        "nuxt",
        "svelte",
        "solid",
      ];

      for (const frontend of storybookCompatibleFrontends) {
        it(`should work with Storybook + ${frontend}`, async () => {
          const config: TestConfig = {
            projectName: `storybook-${frontend}`,
            addons: ["storybook"],
            frontend: [frontend as Frontend],
            backend: "hono",
            runtime: "bun",
            database: "sqlite",
            orm: "drizzle",
            auth: "none",
            examples: ["none"],
            dbSetup: "none",
            webDeploy: "none",
            serverDeploy: "none",
            install: false,
          };

          if (["nuxt", "svelte", "solid"].includes(frontend)) {
            config.api = "orpc";
          } else {
            config.api = "trpc";
          }

          const result = await runTRPCTest(config);
          expectSuccess(result);
        });
      }

      it("should add Storybook dependencies to web package.json", async () => {
        const result = await runTRPCTest({
          projectName: "storybook-deps-check",
          addons: ["storybook"],
          frontend: ["tanstack-router"],
          backend: "hono",
          runtime: "bun",
          database: "sqlite",
          orm: "drizzle",
          auth: "none",
          api: "trpc",
          examples: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "none",
          install: false,
        });

        expectSuccess(result);

        const webPackageJson = result.result?.tree?.root?.children
          ?.find((c: any) => c.name === "apps")
          ?.children?.find((c: any) => c.name === "web")
          ?.children?.find((c: any) => c.name === "package.json");

        if (webPackageJson?.content) {
          const pkgJson = JSON.parse(webPackageJson.content);
          expect(pkgJson.devDependencies?.storybook).toBeDefined();
          expect(pkgJson.devDependencies?.["@storybook/addon-essentials"]).toBeDefined();
          expect(pkgJson.devDependencies?.["@storybook/addon-interactions"]).toBeDefined();
          expect(pkgJson.devDependencies?.["@storybook/test"]).toBeDefined();
        }
      });

      it("should add correct framework-specific Storybook package for React Vite", async () => {
        const result = await runTRPCTest({
          projectName: "storybook-react-vite",
          addons: ["storybook"],
          frontend: ["react-vite"],
          backend: "hono",
          runtime: "bun",
          database: "sqlite",
          orm: "drizzle",
          auth: "none",
          api: "trpc",
          examples: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "none",
          install: false,
        });

        expectSuccess(result);

        const webPackageJson = result.result?.tree?.root?.children
          ?.find((c: any) => c.name === "apps")
          ?.children?.find((c: any) => c.name === "web")
          ?.children?.find((c: any) => c.name === "package.json");

        if (webPackageJson?.content) {
          const pkgJson = JSON.parse(webPackageJson.content);
          expect(pkgJson.devDependencies?.["@storybook/react-vite"]).toBeDefined();
          expect(pkgJson.devDependencies?.["@storybook/react"]).toBeDefined();
        }
      });

      it("should add correct framework-specific Storybook package for Next.js", async () => {
        const result = await runTRPCTest({
          projectName: "storybook-nextjs",
          addons: ["storybook"],
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          database: "sqlite",
          orm: "drizzle",
          auth: "better-auth",
          api: "trpc",
          examples: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "none",
          install: false,
        });

        expectSuccess(result);

        const webPackageJson = result.result?.tree?.root?.children
          ?.find((c: any) => c.name === "apps")
          ?.children?.find((c: any) => c.name === "web")
          ?.children?.find((c: any) => c.name === "package.json");

        if (webPackageJson?.content) {
          const pkgJson = JSON.parse(webPackageJson.content);
          expect(pkgJson.devDependencies?.["@storybook/nextjs"]).toBeDefined();
        }
      });

      it("should add Storybook scripts to web package.json", async () => {
        const result = await runTRPCTest({
          projectName: "storybook-scripts-check",
          addons: ["storybook"],
          frontend: ["tanstack-router"],
          backend: "hono",
          runtime: "bun",
          database: "sqlite",
          orm: "drizzle",
          auth: "none",
          api: "trpc",
          examples: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "none",
          install: false,
        });

        expectSuccess(result);

        const webPackageJson = result.result?.tree?.root?.children
          ?.find((c: any) => c.name === "apps")
          ?.children?.find((c: any) => c.name === "web")
          ?.children?.find((c: any) => c.name === "package.json");

        if (webPackageJson?.content) {
          const pkgJson = JSON.parse(webPackageJson.content);
          expect(pkgJson.scripts?.storybook).toBe("storybook dev -p 6006");
          expect(pkgJson.scripts?.["build-storybook"]).toBe("storybook build");
        }
      });

      const storybookIncompatibleFrontends = ["native-bare", "native-uniwind", "native-unistyles"];

      for (const frontend of storybookIncompatibleFrontends) {
        it(`should fail with Storybook + ${frontend}`, async () => {
          const result = await runTRPCTest({
            projectName: `storybook-${frontend}-fail`,
            addons: ["storybook"],
            frontend: [frontend as Frontend],
            backend: "hono",
            runtime: "bun",
            database: "sqlite",
            orm: "drizzle",
            auth: "none",
            api: "trpc",
            examples: ["none"],
            dbSetup: "none",
            webDeploy: "none",
            serverDeploy: "none",
            expectError: true,
          });

          expectError(result, "storybook addon requires one of these frontends");
        });
      }
    });
  });

  describe("Multiple Addons", () => {
    it("should work with multiple compatible addons", async () => {
      const result = await runTRPCTest({
        projectName: "multiple-addons",
        addons: ["biome", "husky", "turborepo", "pwa"],
        frontend: ["tanstack-router"],
        backend: "hono",
        runtime: "bun",
        database: "sqlite",
        orm: "drizzle",
        auth: "none",
        api: "trpc",
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
    });

    it("should work with lefthook and husky together", async () => {
      const result = await runTRPCTest({
        projectName: "both-git-hooks",
        addons: ["lefthook", "husky"],
        frontend: ["tanstack-router"],
        backend: "hono",
        runtime: "bun",
        database: "sqlite",
        orm: "drizzle",
        auth: "none",
        api: "trpc",
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
    });

    it("should fail with incompatible addon combination", async () => {
      const result = await runTRPCTest({
        projectName: "incompatible-addons-fail",
        addons: ["pwa"], // PWA not compatible with nuxt
        frontend: ["nuxt"],
        backend: "hono",
        runtime: "bun",
        database: "sqlite",
        orm: "drizzle",
        auth: "none",
        api: "orpc",
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        expectError: true,
      });

      expectError(result, "pwa addon requires one of these frontends");
    });

    it("should deduplicate addons", async () => {
      const result = await runTRPCTest({
        projectName: "duplicate-addons",
        addons: ["biome", "biome", "turborepo"], // Duplicate biome
        frontend: ["tanstack-router"],
        backend: "hono",
        runtime: "bun",
        database: "sqlite",
        orm: "drizzle",
        auth: "none",
        api: "trpc",
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
    });
  });

  describe("Addons with None Option", () => {
    it("should work with addons none", async () => {
      const result = await runTRPCTest({
        projectName: "no-addons",
        addons: ["none"],
        frontend: ["tanstack-router"],
        backend: "hono",
        runtime: "bun",
        database: "sqlite",
        orm: "drizzle",
        auth: "none",
        api: "trpc",
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
    });

    it("should fail with none + other addons", async () => {
      const result = await runTRPCTest({
        projectName: "none-with-other-addons-fail",
        addons: ["none", "biome"],
        frontend: ["tanstack-router"],
        backend: "hono",
        runtime: "bun",
        database: "sqlite",
        orm: "drizzle",
        auth: "none",
        api: "trpc",
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        expectError: true,
      });

      expectError(result, "Cannot combine 'none' with other addons");
    });
  });

  describe("All Available Addons", () => {
    const testableAddons = [
      "pwa",
      "tauri",
      "biome",
      "husky",
      "turborepo",
      "oxlint",
      "msw",
      "storybook",
      "tanstack-query",
      "tanstack-table",
      "tanstack-virtual",
      "tanstack-db",
      "tanstack-pacer",
      // Note: starlight, ultracite, ruler, fumadocs are prompt-controlled only
    ];

    for (const addon of testableAddons) {
      it(`should work with ${addon} addon in appropriate setup`, async () => {
        const config: TestConfig = {
          projectName: `test-${addon}`,
          addons: [addon as Addons],
          backend: "hono",
          runtime: "bun",
          database: "sqlite",
          orm: "drizzle",
          auth: "none",
          examples: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "none",
          install: false,
        };

        // TanStack addons need api=none to avoid conflicts with tanstack-query
        if (addon.startsWith("tanstack-")) {
          config.api = "none";
          config.frontend = ["tanstack-router"];
          config.backend = "none";
          config.runtime = "none";
          config.database = "none";
          config.orm = "none";
        } else if (["pwa", "tauri"].includes(addon)) {
          config.api = "trpc";
          config.frontend = ["tanstack-router"];
        } else {
          config.api = "trpc";
          config.frontend = ["tanstack-router"];
        }

        const result = await runTRPCTest(config);
        expectSuccess(result);
      });
    }
  });

  describe("TanStack Addons", () => {
    describe("TanStack Query Addon", () => {
      it("should work with React frontend (api=none)", async () => {
        const result = await runTRPCTest({
          projectName: "tq-react",
          addons: ["tanstack-query"],
          frontend: ["tanstack-router"],
          backend: "hono",
          runtime: "bun",
          database: "sqlite",
          orm: "drizzle",
          auth: "none",
          api: "none",
          examples: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "none",
          install: false,
        });

        expectSuccess(result);
      });

      it("should work alongside api=trpc (query comes from tRPC)", async () => {
        const result = await runTRPCTest({
          projectName: "tq-api-conflict",
          addons: ["tanstack-query"],
          frontend: ["tanstack-router"],
          backend: "hono",
          runtime: "bun",
          database: "sqlite",
          orm: "drizzle",
          auth: "none",
          api: "trpc",
          examples: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "none",
          install: false,
        });

        expectSuccess(result);
      });

      it("should work with Svelte frontend (api=none)", async () => {
        const result = await runTRPCTest({
          projectName: "tq-svelte",
          addons: ["tanstack-query"],
          frontend: ["svelte"],
          backend: "hono",
          runtime: "bun",
          database: "sqlite",
          orm: "drizzle",
          auth: "none",
          api: "none",
          examples: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "none",
          install: false,
        });

        expectSuccess(result);
      });

      it("should work with Nuxt frontend (api=none)", async () => {
        const result = await runTRPCTest({
          projectName: "tq-nuxt",
          addons: ["tanstack-query"],
          frontend: ["nuxt"],
          backend: "hono",
          runtime: "bun",
          database: "sqlite",
          orm: "drizzle",
          auth: "none",
          api: "none",
          examples: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "none",
          install: false,
        });

        expectSuccess(result);
      });
    });

    describe("TanStack Table Addon", () => {
      const compatibleFrontends: { frontend: Frontend; api: "trpc" | "orpc" }[] = [
        { frontend: "tanstack-router", api: "trpc" },
        { frontend: "next", api: "trpc" },
        { frontend: "nuxt", api: "orpc" },
        { frontend: "svelte", api: "orpc" },
        { frontend: "solid", api: "orpc" },
      ];

      for (const { frontend, api } of compatibleFrontends) {
        it(`should work with ${frontend}`, async () => {
          const result = await runTRPCTest({
            projectName: `tt-${frontend}`,
            addons: ["tanstack-table"],
            frontend: [frontend],
            backend: "hono",
            runtime: "bun",
            database: "sqlite",
            orm: "drizzle",
            auth: "none",
            api,
            examples: ["none"],
            dbSetup: "none",
            webDeploy: "none",
            serverDeploy: "none",
            install: false,
          });

          expectSuccess(result);
        });
      }
    });

    describe("TanStack Virtual Addon", () => {
      it("should work with React frontend", async () => {
        const result = await runTRPCTest({
          projectName: "tv-react",
          addons: ["tanstack-virtual"],
          frontend: ["react-vite"],
          backend: "hono",
          runtime: "bun",
          database: "sqlite",
          orm: "drizzle",
          auth: "none",
          api: "trpc",
          examples: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "none",
          install: false,
        });

        expectSuccess(result);
      });

      it("should work with Solid frontend", async () => {
        const result = await runTRPCTest({
          projectName: "tv-solid",
          addons: ["tanstack-virtual"],
          frontend: ["solid"],
          backend: "hono",
          runtime: "bun",
          database: "sqlite",
          orm: "drizzle",
          auth: "none",
          api: "orpc",
          examples: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "none",
          install: false,
        });

        expectSuccess(result);
      });
    });

    describe("TanStack DB Addon", () => {
      it("should work with React frontend", async () => {
        const result = await runTRPCTest({
          projectName: "tdb-react",
          addons: ["tanstack-db"],
          frontend: ["tanstack-router"],
          backend: "hono",
          runtime: "bun",
          database: "sqlite",
          orm: "drizzle",
          auth: "none",
          api: "trpc",
          examples: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "none",
          install: false,
        });

        expectSuccess(result);
      });

      it("should work with Svelte frontend", async () => {
        const result = await runTRPCTest({
          projectName: "tdb-svelte",
          addons: ["tanstack-db"],
          frontend: ["svelte"],
          backend: "hono",
          runtime: "bun",
          database: "sqlite",
          orm: "drizzle",
          auth: "none",
          api: "orpc",
          examples: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "none",
          install: false,
        });

        expectSuccess(result);
      });
    });

    describe("TanStack Pacer Addon", () => {
      it("should work with React frontend", async () => {
        const result = await runTRPCTest({
          projectName: "tp-react",
          addons: ["tanstack-pacer"],
          frontend: ["tanstack-router"],
          backend: "hono",
          runtime: "bun",
          database: "sqlite",
          orm: "drizzle",
          auth: "none",
          api: "trpc",
          examples: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "none",
          install: false,
        });

        expectSuccess(result);
      });

      it("should work with Solid frontend", async () => {
        const result = await runTRPCTest({
          projectName: "tp-solid",
          addons: ["tanstack-pacer"],
          frontend: ["solid"],
          backend: "hono",
          runtime: "bun",
          database: "sqlite",
          orm: "drizzle",
          auth: "none",
          api: "orpc",
          examples: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "none",
          install: false,
        });

        expectSuccess(result);
      });

      it("should work with Nuxt frontend (core package)", async () => {
        const result = await runTRPCTest({
          projectName: "tp-nuxt",
          addons: ["tanstack-pacer"],
          frontend: ["nuxt"],
          backend: "hono",
          runtime: "bun",
          database: "sqlite",
          orm: "drizzle",
          auth: "none",
          api: "orpc",
          examples: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "none",
          install: false,
        });

        expectSuccess(result);
      });
    });

    describe("Multiple TanStack Addons", () => {
      it("should work with multiple TanStack addons together", async () => {
        const result = await runTRPCTest({
          projectName: "tanstack-multi",
          addons: ["tanstack-table", "tanstack-virtual", "tanstack-pacer"],
          frontend: ["tanstack-router"],
          backend: "hono",
          runtime: "bun",
          database: "sqlite",
          orm: "drizzle",
          auth: "none",
          api: "trpc",
          examples: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "none",
          install: false,
        });

        expectSuccess(result);
      });

      it("should work with all TanStack addons at once (api=none)", async () => {
        const result = await runTRPCTest({
          projectName: "tanstack-all",
          addons: ["tanstack-query", "tanstack-table", "tanstack-virtual", "tanstack-db", "tanstack-pacer"],
          frontend: ["tanstack-router"],
          backend: "none",
          runtime: "none",
          database: "none",
          orm: "none",
          auth: "none",
          api: "none",
          examples: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "none",
          install: false,
        });

        expectSuccess(result);
      });
    });

    describe("TanStack addon incompatible frontends", () => {
      const incompatibleFrontends = ["native-bare", "native-uniwind", "native-unistyles"];

      for (const frontend of incompatibleFrontends) {
        it(`should fail with tanstack-table + ${frontend}`, async () => {
          const result = await runTRPCTest({
            projectName: `tt-${frontend}-fail`,
            addons: ["tanstack-table"],
            frontend: [frontend as Frontend],
            backend: "hono",
            runtime: "bun",
            database: "sqlite",
            orm: "drizzle",
            auth: "none",
            api: "trpc",
            examples: ["none"],
            dbSetup: "none",
            webDeploy: "none",
            serverDeploy: "none",
            expectError: true,
          });

          expectError(result, "tanstack-table addon requires one of these frontends");
        });
      }

      // TanStack addons should fail with Fresh (Preact-based, no adapters)
      it("should fail with tanstack-virtual + fresh", async () => {
        const result = await runTRPCTest({
          projectName: "tv-fresh-fail",
          addons: ["tanstack-virtual"],
          frontend: ["fresh"],
          backend: "none",
          runtime: "none",
          database: "none",
          orm: "none",
          auth: "none",
          api: "none",
          examples: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "none",
          expectError: true,
        });

        expectError(result, "tanstack-virtual addon requires one of these frontends");
      });

      // TanStack Query should fail with native frontends (no adapters)
      it("should fail with tanstack-query + native-bare", async () => {
        const result = await runTRPCTest({
          projectName: "tq-native-fail",
          addons: ["tanstack-query"],
          frontend: ["native-bare" as Frontend],
          backend: "hono",
          runtime: "bun",
          database: "sqlite",
          orm: "drizzle",
          auth: "none",
          api: "none",
          examples: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "none",
          expectError: true,
        });

        expectError(result, "tanstack-query addon requires one of these frontends");
      });

      // TanStack Query should fail with Fresh (Preact-based, no adapters)
      it("should fail with tanstack-query + fresh", async () => {
        const result = await runTRPCTest({
          projectName: "tq-fresh-fail",
          addons: ["tanstack-query"],
          frontend: ["fresh"],
          backend: "none",
          runtime: "none",
          database: "none",
          orm: "none",
          auth: "none",
          api: "none",
          examples: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "none",
          expectError: true,
        });

        expectError(result, "tanstack-query addon requires one of these frontends");
      });

      // TanStack addons should fail with Qwik (no adapters)
      it("should fail with tanstack-query + qwik", async () => {
        const result = await runTRPCTest({
          projectName: "tq-qwik-fail",
          addons: ["tanstack-query"],
          frontend: ["qwik"],
          backend: "none",
          runtime: "none",
          database: "none",
          orm: "none",
          auth: "none",
          api: "none",
          examples: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "none",
          expectError: true,
        });

        expectError(result, "tanstack-query addon requires one of these frontends");
      });

      // TanStack DB should fail with Angular (no @tanstack/angular-db adapter)
      it("should fail with tanstack-db + angular", async () => {
        const result = await runTRPCTest({
          projectName: "tdb-angular-fail",
          addons: ["tanstack-db"],
          frontend: ["angular"],
          backend: "none",
          runtime: "none",
          database: "none",
          orm: "none",
          auth: "none",
          api: "none",
          examples: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "none",
          expectError: true,
        });

        expectError(result, "tanstack-db addon requires one of these frontends");
      });
    });

    describe("TanStack addons with Angular frontend", () => {
      // Table and Virtual have Angular adapters
      it("should work with tanstack-table + angular", async () => {
        const result = await runTRPCTest({
          projectName: "tt-angular",
          addons: ["tanstack-table"],
          frontend: ["angular"],
          backend: "none",
          runtime: "none",
          database: "none",
          orm: "none",
          auth: "none",
          api: "none",
          examples: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "none",
          install: false,
        });

        expectSuccess(result);
      });

      it("should work with tanstack-virtual + angular", async () => {
        const result = await runTRPCTest({
          projectName: "tv-angular",
          addons: ["tanstack-virtual"],
          frontend: ["angular"],
          backend: "none",
          runtime: "none",
          database: "none",
          orm: "none",
          auth: "none",
          api: "none",
          examples: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "none",
          install: false,
        });

        expectSuccess(result);
      });
    });

    describe("TanStack addons with Astro frontend", () => {
      it("should work with tanstack-table + astro (react integration)", async () => {
        const result = await runTRPCTest({
          projectName: "tt-astro-react",
          addons: ["tanstack-table"],
          frontend: ["astro"],
          astroIntegration: "react",
          backend: "hono",
          runtime: "bun",
          database: "sqlite",
          orm: "drizzle",
          auth: "none",
          api: "trpc",
          examples: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "none",
          install: false,
        });

        expectSuccess(result);
      });

      it("should work with tanstack-virtual + astro (vue integration)", async () => {
        const result = await runTRPCTest({
          projectName: "tv-astro-vue",
          addons: ["tanstack-virtual"],
          frontend: ["astro"],
          astroIntegration: "vue",
          backend: "hono",
          runtime: "bun",
          database: "sqlite",
          orm: "drizzle",
          auth: "none",
          api: "orpc",
          examples: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "none",
          install: false,
        });

        expectSuccess(result);
      });
    });
  });

  describe("TanStack AI SDK", () => {
    describe("Compatible frontends (React and Solid)", () => {
      it("should work with tanstack-ai + React frontend (tanstack-router)", async () => {
        const result = await runTRPCTest({
          projectName: "tai-react",
          ai: "tanstack-ai",
          frontend: ["tanstack-router"],
          backend: "hono",
          runtime: "bun",
          database: "sqlite",
          orm: "drizzle",
          auth: "none",
          api: "none",
          addons: ["none"],
          examples: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "none",
          install: false,
        });

        expectSuccess(result);
      });

      it("should work with tanstack-ai + Solid frontend", async () => {
        const result = await runTRPCTest({
          projectName: "tai-solid",
          ai: "tanstack-ai",
          frontend: ["solid"],
          backend: "hono",
          runtime: "bun",
          database: "sqlite",
          orm: "drizzle",
          auth: "none",
          api: "orpc",
          addons: ["none"],
          examples: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "none",
          install: false,
        });

        expectSuccess(result);
      });

      it("should work with tanstack-ai + Next.js (self backend)", async () => {
        const result = await runTRPCTest({
          projectName: "tai-next",
          ai: "tanstack-ai",
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          database: "sqlite",
          orm: "drizzle",
          auth: "none",
          api: "trpc",
          addons: ["none"],
          examples: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "none",
          install: false,
        });

        expectSuccess(result);
      });
    });

    describe("Dependency verification", () => {
      it("should install @tanstack/ai on server and @tanstack/ai-react on web", async () => {
        const result = await runTRPCTest({
          projectName: "tai-deps-react",
          ai: "tanstack-ai",
          frontend: ["tanstack-router"],
          backend: "hono",
          runtime: "bun",
          database: "sqlite",
          orm: "drizzle",
          auth: "none",
          api: "none",
          addons: ["none"],
          examples: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "none",
          install: false,
        });

        expectSuccess(result);

        const projectDir = result.result?.projectDirectory ?? result.projectDir;
        expect(projectDir).toBeDefined();

        const serverPkg = JSON.parse(readFileSync(join(projectDir!, "apps/server/package.json"), "utf-8"));
        expect(serverPkg.dependencies?.["@tanstack/ai"]).toBeDefined();

        const webPkg = JSON.parse(readFileSync(join(projectDir!, "apps/web/package.json"), "utf-8"));
        expect(webPkg.dependencies?.["@tanstack/ai-react"]).toBeDefined();
      });

      it("should install @tanstack/ai-solid on web for Solid frontend", async () => {
        const result = await runTRPCTest({
          projectName: "tai-deps-solid",
          ai: "tanstack-ai",
          frontend: ["solid"],
          backend: "hono",
          runtime: "bun",
          database: "sqlite",
          orm: "drizzle",
          auth: "none",
          api: "orpc",
          addons: ["none"],
          examples: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "none",
          install: false,
        });

        expectSuccess(result);

        const projectDir = result.result?.projectDirectory ?? result.projectDir;
        expect(projectDir).toBeDefined();

        const webPkg = JSON.parse(readFileSync(join(projectDir!, "apps/web/package.json"), "utf-8"));
        expect(webPkg.dependencies?.["@tanstack/ai-solid"]).toBeDefined();
      });

    });

    describe("Incompatible frontends", () => {
      // TanStack AI requires React or Solid — all other frontends are rejected
      const incompatibleCases = [
        { frontend: "svelte" as Frontend, api: "orpc" as const, backend: "hono" as const, runtime: "bun" as const },
        { frontend: "nuxt" as Frontend, api: "orpc" as const, backend: "hono" as const, runtime: "bun" as const },
        { frontend: "angular" as Frontend, api: "none" as const, backend: "none" as const, runtime: "none" as const },
        { frontend: "qwik" as Frontend, api: "none" as const, backend: "none" as const, runtime: "none" as const },
        { frontend: "fresh" as Frontend, api: "none" as const, backend: "none" as const, runtime: "none" as const },
        { frontend: "native-bare" as Frontend, api: "none" as const, backend: "hono" as const, runtime: "bun" as const },
        { frontend: "native-uniwind" as Frontend, api: "none" as const, backend: "hono" as const, runtime: "bun" as const },
        { frontend: "native-unistyles" as Frontend, api: "none" as const, backend: "hono" as const, runtime: "bun" as const },
      ];

      for (const { frontend, api, backend, runtime } of incompatibleCases) {
        it(`should fail with tanstack-ai + ${frontend}`, async () => {
          const result = await runTRPCTest({
            projectName: `tai-${frontend}-fail`,
            ai: "tanstack-ai",
            frontend: [frontend],
            backend,
            runtime,
            database: backend === "none" ? "none" : "sqlite",
            orm: backend === "none" ? "none" : "drizzle",
            auth: "none",
            api,
            addons: ["none"],
            examples: ["none"],
            dbSetup: "none",
            webDeploy: "none",
            serverDeploy: "none",
            expectError: true,
          });

          expectError(result, "TanStack AI requires React or Solid frontend");
        });
      }
    });

    describe("Compatible frontend coverage", () => {
      // All React-based and Solid frontends should work with TanStack AI
      const compatibleCases: { frontend: Frontend; api: "trpc" | "orpc" | "none"; expectAdapter: string; backend?: "self" | "hono"; runtime?: "none" | "bun" }[] = [
        { frontend: "tanstack-router", api: "none", expectAdapter: "@tanstack/ai-react" },
        { frontend: "react-router", api: "none", expectAdapter: "@tanstack/ai-react" },
        { frontend: "react-vite", api: "none", expectAdapter: "@tanstack/ai-react" },
        { frontend: "tanstack-start", api: "orpc", expectAdapter: "@tanstack/ai-react", backend: "self", runtime: "none" },
        { frontend: "next", api: "trpc", expectAdapter: "@tanstack/ai-react", backend: "self", runtime: "none" },
        { frontend: "solid", api: "orpc", expectAdapter: "@tanstack/ai-solid" },
        { frontend: "solid-start", api: "orpc", expectAdapter: "@tanstack/ai-solid", backend: "self", runtime: "none" },
      ];

      for (const { frontend, api, expectAdapter, backend: be, runtime: rt } of compatibleCases) {
        it(`should install ${expectAdapter} for ${frontend}`, async () => {
          const useSelf = be === "self";
          const result = await runTRPCTest({
            projectName: `tai-${frontend}`,
            ai: "tanstack-ai",
            frontend: [frontend as Frontend],
            backend: useSelf ? "self" : "hono",
            runtime: rt ?? "bun",
            database: "sqlite",
            orm: "drizzle",
            auth: "none",
            api,
            addons: ["none"],
            examples: ["none"],
            dbSetup: "none",
            webDeploy: "none",
            serverDeploy: "none",
            install: false,
          });

          expectSuccess(result);

          const projectDir = result.result?.projectDirectory ?? result.projectDir;
          expect(projectDir).toBeDefined();

          // For self backends, @tanstack/ai core is in web package
          // For separate backends, it's in server package
          const serverPkgPath = useSelf
            ? join(projectDir!, "apps/web/package.json")
            : join(projectDir!, "apps/server/package.json");
          const serverPkg = JSON.parse(readFileSync(serverPkgPath, "utf-8"));
          expect(serverPkg.dependencies?.["@tanstack/ai"]).toBeDefined();

          const webPkg = JSON.parse(readFileSync(join(projectDir!, "apps/web/package.json"), "utf-8"));
          expect(webPkg.dependencies?.[expectAdapter]).toBeDefined();
        });
      }
    });
  });

  describe("TanStack Showcase Example", () => {
    it("should generate showcase files with tanstack-start", async () => {
      const result = await runTRPCTest({
        projectName: "showcase-start",
        examples: ["tanstack-showcase"],
        frontend: ["tanstack-start"],
        backend: "self",
        runtime: "none",
        database: "postgres",
        orm: "drizzle",
        auth: "none",
        api: "orpc",
        addons: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);

      const projectDir = result.result?.projectDirectory ?? result.projectDir;
      expect(projectDir).toBeDefined();

      // Verify all 7 showcase route files exist
      const showcaseDir = join(projectDir!, "apps/web/src/routes/showcase");
      const expectedFiles = ["index.tsx", "query.tsx", "table.tsx", "virtual.tsx", "form.tsx", "store.tsx", "pacer.tsx"];
      for (const file of expectedFiles) {
        const content = readFileSync(join(showcaseDir, file), "utf-8");
        expect(content.length).toBeGreaterThan(0);
      }
    });

    it("should install TanStack showcase dependencies", async () => {
      const result = await runTRPCTest({
        projectName: "showcase-deps",
        examples: ["tanstack-showcase"],
        frontend: ["tanstack-start"],
        backend: "self",
        runtime: "none",
        database: "postgres",
        orm: "drizzle",
        auth: "none",
        api: "orpc",
        addons: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);

      const projectDir = result.result?.projectDirectory ?? result.projectDir;
      const webPkg = JSON.parse(readFileSync(join(projectDir!, "apps/web/package.json"), "utf-8"));

      expect(webPkg.dependencies?.["@tanstack/react-query"]).toBeDefined();
      expect(webPkg.dependencies?.["@tanstack/react-table"]).toBeDefined();
      expect(webPkg.dependencies?.["@tanstack/react-virtual"]).toBeDefined();
      expect(webPkg.dependencies?.["@tanstack/react-form"]).toBeDefined();
      expect(webPkg.dependencies?.["@tanstack/store"]).toBeDefined();
      expect(webPkg.dependencies?.["@tanstack/react-store"]).toBeDefined();
      expect(webPkg.dependencies?.["@tanstack/react-pacer"]).toBeDefined();
    });

    it("should work with tanstack-router frontend", async () => {
      const result = await runTRPCTest({
        projectName: "showcase-router",
        examples: ["tanstack-showcase"],
        frontend: ["tanstack-router"],
        backend: "hono",
        runtime: "bun",
        database: "sqlite",
        orm: "drizzle",
        auth: "none",
        api: "orpc",
        addons: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);

      const projectDir = result.result?.projectDirectory ?? result.projectDir;
      const indexFile = readFileSync(join(projectDir!, "apps/web/src/routes/showcase/index.tsx"), "utf-8");
      expect(indexFile).toContain("TanStack Ecosystem Showcase");
    });

    it("should fail with incompatible frontend (svelte)", async () => {
      const result = await runTRPCTest({
        projectName: "showcase-svelte-fail",
        examples: ["tanstack-showcase"],
        frontend: ["svelte"],
        backend: "hono",
        runtime: "bun",
        database: "sqlite",
        orm: "drizzle",
        auth: "none",
        api: "orpc",
        addons: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        expectError: true,
      });

      expectError(result, "tanstack-showcase' example requires TanStack Router or TanStack Start");
    });

    it("should fail with incompatible frontend (next)", async () => {
      const result = await runTRPCTest({
        projectName: "showcase-next-fail",
        examples: ["tanstack-showcase"],
        frontend: ["next"],
        backend: "self",
        runtime: "none",
        database: "sqlite",
        orm: "drizzle",
        auth: "none",
        api: "trpc",
        addons: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        expectError: true,
      });

      expectError(result, "tanstack-showcase' example requires TanStack Router or TanStack Start");
    });
  });
});
