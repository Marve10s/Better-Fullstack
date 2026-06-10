import { describe, expect, it } from "bun:test";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { expectError, expectSuccess, runTRPCTest, type TestConfig } from "./test-utils";

function apiForFrontend(frontend: string): TestConfig["api"] {
  if (["nuxt", "svelte", "solid"].includes(frontend)) return "orpc";
  return "trpc";
}

describe("Render Deployment", () => {
  describe("Web Deployment with Render", () => {
    const webFrontends = [
      "tanstack-router",
      "react-router",
      "react-vite",
      "tanstack-start",
      "next",
      "nuxt",
      "svelte",
      "solid",
    ] as const;

    for (const frontend of webFrontends) {
      it(`should generate Render config for ${frontend} web frontend`, async () => {
        const config: TestConfig = {
          projectName: `render-web-${frontend}`,
          webDeploy: "render",
          serverDeploy: "none",
          frontend: [frontend],
          backend: "hono",
          runtime: "bun",
          database: "sqlite",
          orm: "drizzle",
          auth: "none",
          api: apiForFrontend(frontend),
          addons: ["none"],
          examples: ["none"],
          dbSetup: "none",
          install: false,
        };

        const result = await runTRPCTest(config);
        expectSuccess(result);

        const renderYaml = join(result.projectDir!, "render.yaml");
        expect(existsSync(renderYaml)).toBe(true);
        const blueprint = readFileSync(renderYaml, "utf8");
        expect(blueprint).toContain("dockerfilePath: ./apps/web/Dockerfile");
        expect(blueprint).not.toContain("./apps/server/Dockerfile");
        expect(existsSync(join(result.projectDir!, "apps", "web", "Dockerfile"))).toBe(true);

        if (frontend === "next") {
          const nextConfig = readFileSync(
            join(result.projectDir!, "apps", "web", "next.config.ts"),
            "utf8",
          );
          expect(nextConfig).toContain('output: "standalone"');
        }
      });
    }

    const blockedFrontends = [
      "vinext",
      "solid-start",
      "astro",
      "qwik",
      "angular",
      "redwood",
      "fresh",
    ] as const;

    for (const frontend of blockedFrontends) {
      it(`should reject render for ${frontend}`, async () => {
        const result = await runTRPCTest({
          projectName: `render-blocked-${frontend}`,
          webDeploy: "render",
          serverDeploy: "none",
          frontend: [frontend],
          backend: "none",
          runtime: "none",
          database: "none",
          orm: "none",
          auth: "none",
          api: "none",
          addons: ["none"],
          examples: ["none"],
          dbSetup: "none",
          expectError: true,
        });

        expectError(result, `Render deployment is not yet wired up for the '${frontend}' frontend`);
      });
    }
  });

  describe("Server Deployment with Render", () => {
    const backends = ["hono", "express", "fastify", "elysia"] as const;

    for (const backend of backends) {
      it(`should generate Render config for ${backend} backend`, async () => {
        const result = await runTRPCTest({
          projectName: `render-server-${backend}`,
          webDeploy: "none",
          serverDeploy: "render",
          backend,
          runtime: backend === "elysia" ? "bun" : "node",
          database: "sqlite",
          orm: "drizzle",
          auth: "none",
          api: "none",
          frontend: ["tanstack-router"],
          addons: ["none"],
          examples: ["none"],
          dbSetup: "none",
          install: false,
        });

        expectSuccess(result);

        const renderYaml = join(result.projectDir!, "render.yaml");
        expect(existsSync(renderYaml)).toBe(true);
        const blueprint = readFileSync(renderYaml, "utf8");
        expect(blueprint).toContain("dockerfilePath: ./apps/server/Dockerfile");
        expect(existsSync(join(result.projectDir!, "apps", "server", "Dockerfile"))).toBe(true);
      });
    }
  });

  describe("Combined Web and Server Deployment with Render", () => {
    it("should emit a single blueprint covering both services", async () => {
      const result = await runTRPCTest({
        projectName: "render-fullstack",
        webDeploy: "render",
        serverDeploy: "render",
        backend: "hono",
        runtime: "bun",
        database: "sqlite",
        orm: "drizzle",
        auth: "none",
        api: "trpc",
        frontend: ["tanstack-router"],
        addons: ["none"],
        examples: ["none"],
        dbSetup: "none",
        install: false,
      });

      expectSuccess(result);

      const blueprint = readFileSync(join(result.projectDir!, "render.yaml"), "utf8");
      expect(blueprint).toContain("dockerfilePath: ./apps/web/Dockerfile");
      expect(blueprint).toContain("dockerfilePath: ./apps/server/Dockerfile");
      expect(existsSync(join(result.projectDir!, "apps", "web", "Dockerfile"))).toBe(true);
      expect(existsSync(join(result.projectDir!, "apps", "server", "Dockerfile"))).toBe(true);
    });
  });
});

describe("Netlify Deployment", () => {
  const netlifyCases = [
    { frontend: "tanstack-router", api: "trpc", publish: 'publish = "dist"' },
    { frontend: "react-router", api: "trpc", publish: 'publish = "build/client"' },
    { frontend: "react-vite", api: "trpc", publish: 'publish = "dist"' },
    { frontend: "tanstack-start", api: "trpc", publish: 'publish = "dist/client"' },
    { frontend: "next", api: "trpc", publish: 'publish = ".next"' },
    { frontend: "nuxt", api: "orpc", publish: 'publish = "dist"' },
    { frontend: "svelte", api: "orpc", publish: 'publish = "build"' },
    { frontend: "solid", api: "orpc", publish: 'publish = "dist"' },
    { frontend: "solid-start", api: "orpc", publish: 'publish = "dist"' },
  ] as const;

  for (const { frontend, api, publish } of netlifyCases) {
    it(`should generate netlify.toml for ${frontend}`, async () => {
      const result = await runTRPCTest({
        projectName: `netlify-web-${frontend}`,
        webDeploy: "netlify",
        serverDeploy: "none",
        frontend: [frontend],
        backend: "hono",
        runtime: "bun",
        database: "sqlite",
        orm: "drizzle",
        auth: "none",
        api,
        addons: ["none"],
        examples: ["none"],
        dbSetup: "none",
        install: false,
      });

      expectSuccess(result);

      const netlifyToml = join(result.projectDir!, "apps", "web", "netlify.toml");
      expect(existsSync(netlifyToml)).toBe(true);
      const toml = readFileSync(netlifyToml, "utf8");
      expect(toml).toContain(publish);
      expect(toml).toContain("bun run build");

      if (frontend === "react-router") {
        const viteConfig = readFileSync(
          join(result.projectDir!, "apps", "web", "vite.config.ts"),
          "utf8",
        );
        const packageJson = readFileSync(
          join(result.projectDir!, "apps", "web", "package.json"),
          "utf8",
        );

        expect(viteConfig).toContain("@netlify/vite-plugin-react-router");
        expect(viteConfig).toContain("netlifyReactRouter()");
        expect(packageJson).toContain("@netlify/vite-plugin-react-router");
      }

      if (frontend === "tanstack-start") {
        const viteConfig = readFileSync(
          join(result.projectDir!, "apps", "web", "vite.config.ts"),
          "utf8",
        );
        const packageJson = readFileSync(
          join(result.projectDir!, "apps", "web", "package.json"),
          "utf8",
        );

        expect(viteConfig).toContain("@netlify/vite-plugin-tanstack-start");
        expect(viteConfig).toContain("netlify()");
        expect(packageJson).toContain("@netlify/vite-plugin-tanstack-start");
      }

      if (frontend === "solid-start") {
        const appConfig = readFileSync(
          join(result.projectDir!, "apps", "web", "app.config.ts"),
          "utf8",
        );

        expect(appConfig).toContain('preset: "netlify"');
      }
    });
  }

  it("should include the Next.js runtime plugin for next", async () => {
    const result = await runTRPCTest({
      projectName: "netlify-next-plugin",
      webDeploy: "netlify",
      serverDeploy: "none",
      frontend: ["next"],
      backend: "hono",
      runtime: "bun",
      database: "sqlite",
      orm: "drizzle",
      auth: "none",
      api: "trpc",
      addons: ["none"],
      examples: ["none"],
      dbSetup: "none",
      install: false,
    });

    expectSuccess(result);
    const toml = readFileSync(
      join(result.projectDir!, "apps", "web", "netlify.toml"),
      "utf8",
    );
    expect(toml).toContain("@netlify/plugin-nextjs");
  });

  describe("Server Deployment with Netlify Functions", () => {
    it("should generate a Netlify function wrapper for Hono on Node", async () => {
      const result = await runTRPCTest({
        projectName: "netlify-server-hono",
        webDeploy: "none",
        serverDeploy: "netlify",
        frontend: ["tanstack-router"],
        backend: "hono",
        runtime: "node",
        database: "sqlite",
        orm: "drizzle",
        auth: "none",
        api: "trpc",
        addons: ["none"],
        examples: ["none"],
        dbSetup: "none",
        install: false,
      });

      expectSuccess(result);

      const serverDir = join(result.projectDir!, "apps", "server");
      const toml = readFileSync(join(serverDir, "netlify.toml"), "utf8");
      const functionFile = readFileSync(join(serverDir, "netlify", "functions", "api.mts"), "utf8");
      const serverIndex = readFileSync(join(serverDir, "src", "index.ts"), "utf8");
      const packageJson = readFileSync(join(serverDir, "package.json"), "utf8");

      expect(toml).toContain('functions = "netlify/functions"');
      expect(toml).toContain('node_bundler = "esbuild"');
      expect(functionFile).toContain('import app from "../../dist/index.js"');
      expect(functionFile).toContain('path: "/*"');
      expect(serverIndex).toContain("export default app");
      expect(serverIndex).not.toContain("@hono/node-server");
      expect(packageJson).toContain("@netlify/functions");
      expect(packageJson).not.toContain("@hono/node-server");
    });

    it("should reject Netlify server deploy for unsupported backend/runtime pairs", async () => {
      const expressResult = await runTRPCTest({
        projectName: "netlify-server-express",
        webDeploy: "none",
        serverDeploy: "netlify",
        frontend: ["tanstack-router"],
        backend: "express",
        runtime: "node",
        database: "sqlite",
        orm: "drizzle",
        auth: "none",
        api: "none",
        addons: ["none"],
        examples: ["none"],
        dbSetup: "none",
        expectError: true,
      });
      expectError(
        expressResult,
        "Netlify Functions server deploy is currently supported only with Hono",
      );

      const bunRuntimeResult = await runTRPCTest({
        projectName: "netlify-server-bun-runtime",
        webDeploy: "none",
        serverDeploy: "netlify",
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
        expectError: true,
      });
      expectError(bunRuntimeResult, "Netlify Functions server deploy requires Node.js runtime");
    });
  });

  const blockedFrontends = [
    "vinext",
    "astro",
    "qwik",
    "angular",
    "redwood",
    "fresh",
  ] as const;

  for (const frontend of blockedFrontends) {
    it(`should reject netlify for ${frontend}`, async () => {
      const result = await runTRPCTest({
        projectName: `netlify-blocked-${frontend}`,
        webDeploy: "netlify",
        serverDeploy: "none",
        frontend: [frontend],
        backend: "none",
        runtime: "none",
        database: "none",
        orm: "none",
        auth: "none",
        api: "none",
        addons: ["none"],
        examples: ["none"],
        dbSetup: "none",
        expectError: true,
      });

      expectError(result, `Netlify deployment is not yet wired up for the '${frontend}' frontend`);
    });
  }
});
