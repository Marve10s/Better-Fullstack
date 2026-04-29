import { describe, it, expect } from "bun:test";
import { existsSync, readFileSync } from "node:fs";
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

    describe("Docker Compose Addon", () => {
      it("should work with docker-compose + Hono + postgres + drizzle", async () => {
        const result = await runTRPCTest({
          projectName: "docker-compose-hono-postgres",
          addons: ["docker-compose"],
          frontend: ["tanstack-router"],
          backend: "hono",
          runtime: "bun",
          database: "postgres",
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

      it("should work with docker-compose + Next.js + self backend", async () => {
        const result = await runTRPCTest({
          projectName: "docker-compose-nextjs-self",
          addons: ["docker-compose"],
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          database: "postgres",
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

      it("should fail with docker-compose + Convex backend", async () => {
        const result = await runTRPCTest({
          projectName: "docker-compose-convex-fail",
          addons: ["docker-compose"],
          frontend: ["tanstack-router"],
          backend: "convex",
          runtime: "none",
          database: "none",
          orm: "none",
          auth: "none",
          api: "none", // Convex requires api: "none"
          examples: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "none",
          expectError: true,
        });

        expectError(result, "docker-compose is not compatible with Convex backend");
      });

      it("should fail with docker-compose + Workers runtime", async () => {
        const result = await runTRPCTest({
          projectName: "docker-compose-workers-fail",
          addons: ["docker-compose"],
          frontend: ["tanstack-router"],
          backend: "hono",
          runtime: "workers",
          database: "sqlite",
          orm: "drizzle",
          auth: "none",
          api: "trpc",
          examples: ["none"],
          dbSetup: "none",
          serverDeploy: "cloudflare",
          expectError: true,
        });

        expectError(result, "docker-compose is not compatible with Cloudflare Workers runtime");
      });

      it("should work with docker-compose + mysql + prisma", async () => {
        const result = await runTRPCTest({
          projectName: "docker-compose-mysql-prisma",
          addons: ["docker-compose"],
          frontend: ["react-router"],
          backend: "hono",
          runtime: "bun",
          database: "mysql",
          orm: "prisma",
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

      it("should work with docker-compose + Nuxt + oRPC", async () => {
        const result = await runTRPCTest({
          projectName: "docker-compose-nuxt",
          addons: ["docker-compose"],
          frontend: ["nuxt"],
          backend: "hono",
          runtime: "bun",
          database: "postgres",
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

      it("should work with docker-compose + Svelte", async () => {
        const result = await runTRPCTest({
          projectName: "docker-compose-svelte",
          addons: ["docker-compose"],
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

      it("should work with docker-compose + React Vite", async () => {
        const result = await runTRPCTest({
          projectName: "docker-compose-react-vite",
          addons: ["docker-compose"],
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

      it("should generate docker-compose for Python projects", async () => {
        const result = await runTRPCTest({
          projectName: "docker-compose-python",
          ecosystem: "python",
          addons: ["docker-compose"],
          pythonWebFramework: "fastapi",
          pythonOrm: "none",
          pythonValidation: "pydantic",
          pythonAi: [],
          pythonAuth: "none",
          pythonTaskQueue: "none",
          pythonGraphql: "none",
          pythonQuality: "ruff",
          install: false,
        });

        expectSuccess(result);
        expect(result.projectDir).toBeDefined();

        const dockerfile = readFileSync(join(result.projectDir!, "Dockerfile"), "utf8");
        const compose = readFileSync(join(result.projectDir!, "docker-compose.yml"), "utf8");

        expect(dockerfile).toContain("FROM python:3.12-slim");
        expect(dockerfile).toContain('CMD ["python", "-m", "app.main"]');
        expect(compose).toContain('      - "8000:8000"');
        expect(compose).toContain("PORT=8000");
      });

      it("should generate docker-compose for Go projects", async () => {
        const result = await runTRPCTest({
          projectName: "docker-compose-go",
          ecosystem: "go",
          addons: ["docker-compose"],
          goWebFramework: "gin",
          goOrm: "gorm",
          goApi: "none",
          goCli: "none",
          goLogging: "slog",
          goAuth: "none",
          install: false,
        });

        expectSuccess(result);
        expect(result.projectDir).toBeDefined();

        const dockerfile = readFileSync(join(result.projectDir!, "Dockerfile"), "utf8");
        const compose = readFileSync(join(result.projectDir!, "docker-compose.yml"), "utf8");

        expect(dockerfile).toContain("FROM golang:1.22-alpine AS builder");
        expect(dockerfile).toContain("go build -o /out/server ./cmd/server");
        expect(compose).toContain('      - "8080:8080"');
        expect(compose).toContain("DATABASE_URL=postgres://postgres:postgres@db:5432/docker-compose-go?sslmode=disable");
        expect(compose).toContain("image: postgres:16-alpine");
      });

      it("should generate docker-compose for Rust projects", async () => {
        const result = await runTRPCTest({
          projectName: "docker-compose-rust",
          ecosystem: "rust",
          addons: ["docker-compose"],
          rustWebFramework: "axum",
          rustFrontend: "none",
          rustOrm: "sqlx",
          rustApi: "none",
          rustCli: "none",
          rustLibraries: [],
          rustLogging: "tracing",
          rustErrorHandling: "anyhow-thiserror",
          rustCaching: "none",
          rustAuth: "none",
          install: false,
        });

        expectSuccess(result);
        expect(result.projectDir).toBeDefined();

        const dockerfile = readFileSync(join(result.projectDir!, "Dockerfile"), "utf8");
        const compose = readFileSync(join(result.projectDir!, "docker-compose.yml"), "utf8");

        expect(dockerfile).toContain("FROM rust:1-slim AS builder");
        expect(dockerfile).toContain("cargo build --release --bin server");
        expect(compose).toContain('      - "3000:3000"');
        expect(compose).toContain("DATABASE_URL=postgres://postgres:postgres@db:5432/docker-compose-rust");
        expect(compose).toContain("image: postgres:16-alpine");
      });

      it("should generate docker-compose for Java projects", async () => {
        const result = await runTRPCTest({
          projectName: "docker-compose-java",
          ecosystem: "java",
          addons: ["docker-compose"],
          javaWebFramework: "spring-boot",
          javaBuildTool: "maven",
          javaOrm: "none",
          javaAuth: "none",
          javaLibraries: [],
          javaTestingLibraries: ["junit5"],
          install: false,
        });

        expectSuccess(result);
        expect(result.projectDir).toBeDefined();

        const dockerfile = readFileSync(join(result.projectDir!, "Dockerfile"), "utf8");
        const compose = readFileSync(join(result.projectDir!, "docker-compose.yml"), "utf8");

        expect(dockerfile).toContain("FROM eclipse-temurin:21-jdk AS builder");
        expect(dockerfile).toContain("./mvnw -DskipTests package");
        expect(compose).toContain('      - "8080:8080"');
        expect(compose).toContain("SPRING_PROFILES_ACTIVE=prod");
      });

      describe("Docker Compose File Generation", () => {
        it("should generate docker-compose.yml at project root", async () => {
          const result = await runTRPCTest({
            projectName: "docker-compose-files-root",
            addons: ["docker-compose"],
            frontend: ["tanstack-router"],
            backend: "hono",
            runtime: "bun",
            database: "postgres",
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
          expect(result.projectDir).toBeDefined();

          const dockerComposeYml = join(result.projectDir!, "docker-compose.yml");
          expect(existsSync(dockerComposeYml)).toBe(true);
          const compose = readFileSync(dockerComposeYml, "utf8");
          expect(compose).toContain("context: .");
          expect(compose).toContain("dockerfile: apps/web/Dockerfile.vite");
          expect(compose).toContain('      - "3001:3000"');
          expect(compose).toContain("dockerfile: apps/server/Dockerfile");
          expect(compose).toContain('      - "3000:3000"');
          expect(compose).toContain("DATABASE_URL=postgresql://postgres:postgres@db:5432/docker-compose-files-root");
        });

        it("should generate Dockerfile in apps/server when backend exists", async () => {
          const result = await runTRPCTest({
            projectName: "docker-compose-files-server",
            addons: ["docker-compose"],
            frontend: ["tanstack-router"],
            backend: "hono",
            runtime: "bun",
            database: "postgres",
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
          expect(result.projectDir).toBeDefined();

          const serverDockerfile = join(result.projectDir!, "apps", "server", "Dockerfile");
          expect(existsSync(serverDockerfile)).toBe(true);
          const dockerfile = readFileSync(serverDockerfile, "utf8");
          expect(dockerfile).toContain("COPY . .");
          expect(dockerfile).toContain("bun run --filter server build");
          expect(dockerfile).toContain("WORKDIR /app/apps/server");
        });

        it("should generate Dockerfile in apps/web for Vite-based frontend", async () => {
          const result = await runTRPCTest({
            projectName: "docker-compose-files-web",
            addons: ["docker-compose"],
            frontend: ["tanstack-router"],
            backend: "hono",
            runtime: "bun",
            database: "postgres",
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
          expect(result.projectDir).toBeDefined();

          // Vite-based frontends get Dockerfile.vite
          const webDockerfile = join(result.projectDir!, "apps", "web", "Dockerfile.vite");
          expect(existsSync(webDockerfile)).toBe(true);
          const dockerfile = readFileSync(webDockerfile, "utf8");
          expect(dockerfile).toContain("COPY . .");
          expect(dockerfile).toContain("ARG VITE_SERVER_URL=http://localhost:3000");
          expect(dockerfile).toContain("bun run --filter web build");
          expect(dockerfile).toContain("/app/apps/web/dist");
        });

        it("should generate Dockerfile in apps/web for Next.js + self backend", async () => {
          const result = await runTRPCTest({
            projectName: "docker-compose-files-nextjs",
            addons: ["docker-compose"],
            frontend: ["next"],
            backend: "self",
            runtime: "none",
            database: "postgres",
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
          expect(result.projectDir).toBeDefined();

          // With self backend, there should be no server directory but web Dockerfile should exist
          const dockerComposeYml = join(result.projectDir!, "docker-compose.yml");
          // Next.js frontend gets Dockerfile.next
          const webDockerfile = join(result.projectDir!, "apps", "web", "Dockerfile.next");

          expect(existsSync(dockerComposeYml)).toBe(true);
          expect(existsSync(webDockerfile)).toBe(true);
          expect(readFileSync(dockerComposeYml, "utf8")).toContain("dockerfile: apps/web/Dockerfile.next");
        });

        it("should generate .dockerignore files", async () => {
          const result = await runTRPCTest({
            projectName: "docker-compose-files-ignore",
            addons: ["docker-compose"],
            frontend: ["tanstack-router"],
            backend: "hono",
            runtime: "bun",
            database: "postgres",
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
          expect(result.projectDir).toBeDefined();

          const rootDockerignore = join(result.projectDir!, ".dockerignore");
          expect(existsSync(rootDockerignore)).toBe(true);
        });
      });
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

        const webPackageJson = (result as any).result?.tree?.root?.children
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

        const serverPackageJson = (result as any).result?.tree?.root?.children
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
        const webPackageJson = (result as any).result?.tree?.root?.children
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

        const webPackageJson = (result as any).result?.tree?.root?.children
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

        const webPackageJson = (result as any).result?.tree?.root?.children
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

        const webPackageJson = (result as any).result?.tree?.root?.children
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

        const webPackageJson = (result as any).result?.tree?.root?.children
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

        const webPackageJson = (result as any).result?.tree?.root?.children
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
      // Note: starlight, ruler, fumadocs are prompt-controlled only
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

  describe("Prompt-Controlled Addons", () => {
    it("should scaffold mcp without interactive prompts in silent mode", async () => {
      const previousSkipExternalCommands = process.env.BFS_SKIP_EXTERNAL_COMMANDS;
      process.env.BFS_SKIP_EXTERNAL_COMMANDS = "1";

      try {
        const result = await runTRPCTest({
          projectName: "mcp-silent-defaults",
          addons: ["mcp"],
          frontend: ["tanstack-start"],
          backend: "none",
          runtime: "none",
          api: "none",
          database: "none",
          orm: "none",
          auth: "none",
          examples: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "none",
          cssFramework: "none",
          uiLibrary: "none",
          stateManagement: "mobx",
          forms: "conform",
          validation: "valibot",
          testing: "none",
          install: false,
        });

        expectSuccess(result);

        const projectDir = result.result?.projectDirectory ?? result.projectDir;
        const btsConfigPath = join(projectDir!, "bts.jsonc");

        expect(existsSync(btsConfigPath)).toBe(true);
        expect(readFileSync(btsConfigPath, "utf-8")).toContain('"addons": ["mcp"]');
      } finally {
        if (previousSkipExternalCommands === undefined) {
          delete process.env.BFS_SKIP_EXTERNAL_COMMANDS;
        } else {
          process.env.BFS_SKIP_EXTERNAL_COMMANDS = previousSkipExternalCommands;
        }
      }
    });

    it("should scaffold ultracite without interactive prompts in silent mode", async () => {
      const previousSkipExternalCommands = process.env.BFS_SKIP_EXTERNAL_COMMANDS;
      process.env.BFS_SKIP_EXTERNAL_COMMANDS = "1";

      try {
        const result = await runTRPCTest({
          projectName: "ultracite-silent-defaults",
          addons: ["ultracite"],
          frontend: ["tanstack-router"],
          backend: "hono",
          runtime: "bun",
          api: "trpc",
          database: "sqlite",
          orm: "drizzle",
          auth: "none",
          examples: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "none",
          install: false,
        });

        expectSuccess(result);

        const projectDir = result.result?.projectDirectory ?? result.projectDir;
        const btsConfigPath = join(projectDir!, "bts.jsonc");

        expect(existsSync(btsConfigPath)).toBe(true);
        expect(readFileSync(btsConfigPath, "utf-8")).toContain('"addons": ["ultracite"]');
      } finally {
        if (previousSkipExternalCommands === undefined) {
          delete process.env.BFS_SKIP_EXTERNAL_COMMANDS;
        } else {
          process.env.BFS_SKIP_EXTERNAL_COMMANDS = previousSkipExternalCommands;
        }
      }
    });
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
