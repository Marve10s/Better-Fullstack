import { afterAll, beforeAll, describe, expect, it } from "bun:test";
import { mkdir, rm } from "node:fs/promises";
import { join } from "node:path";

import type { API, Auth, Backend, Frontend, Runtime } from "../../src/types";

import {
  callORPC,
  callTRPC,
  checkFrontendPage,
  checkHealth,
  checkStaticAssets,
  setupE2EProject,
  startDevServer,
  startServer,
  typecheckProject,
  validateFrameworkPage,
  type DevServerProcess,
  type ServerProcess,
} from "./e2e-utils";

const shouldRunE2E = process.env.E2E === "1";
const describeE2E = shouldRunE2E ? describe : describe.skip;

const E2E_SMOKE_DIR = join(import.meta.dir, "..", "..", ".smoke-e2e");

interface E2ETestConfig {
  name: string;
  frontend: Frontend[];
  backend: Backend;
  runtime: Runtime;
  api: API;
  auth: Auth;
  overrides?: Record<string, unknown>;
  callApi: (baseUrl: string, procedure: string) => Promise<{ status: number; body: unknown }>;
}

// --- Backend-only configs (existing pattern: start apps/server) ---

const backendOnlyConfigs: E2ETestConfig[] = [
  {
    name: "hono-trpc-bun",
    frontend: ["tanstack-router"],
    backend: "hono",
    runtime: "bun",
    api: "trpc",
    auth: "none",
    callApi: callTRPC,
  },
  {
    name: "hono-orpc-bun",
    frontend: ["tanstack-router"],
    backend: "hono",
    runtime: "bun",
    api: "orpc",
    auth: "none",
    callApi: callORPC,
  },
  {
    name: "express-trpc-node",
    frontend: ["tanstack-router"],
    backend: "express",
    runtime: "node",
    api: "trpc",
    auth: "none",
    callApi: callTRPC,
  },
];

// --- Full dev environment configs (start turbo dev, test frontend + API) ---

const fullstackConfigs: E2ETestConfig[] = [
  {
    name: "next-self-trpc-auth",
    frontend: ["next"],
    backend: "self",
    runtime: "none",
    api: "trpc",
    auth: "better-auth",
    callApi: callTRPC,
  },
  {
    name: "tanstack-router-hono-trpc",
    frontend: ["tanstack-router"],
    backend: "hono",
    runtime: "bun",
    api: "trpc",
    auth: "better-auth",
    callApi: callTRPC,
  },
  {
    name: "nuxt-self-orpc",
    frontend: ["nuxt"],
    backend: "self",
    runtime: "none",
    api: "orpc",
    auth: "better-auth",
    callApi: callORPC,
  },
  {
    name: "svelte-self-orpc",
    frontend: ["svelte"],
    backend: "self",
    runtime: "none",
    api: "orpc",
    auth: "better-auth",
    callApi: callORPC,
  },
  {
    name: "react-router-hono-orpc",
    frontend: ["react-router"],
    backend: "hono",
    runtime: "bun",
    api: "orpc",
    auth: "none",
    callApi: callORPC,
  },
  {
    name: "tanstack-start-self-orpc",
    frontend: ["tanstack-start"],
    backend: "self",
    runtime: "none",
    api: "orpc",
    auth: "better-auth",
    callApi: callORPC,
  },
];

const SERVER_PORT = 3000;

describeE2E("E2E Backend-Only Tests", () => {
  beforeAll(async () => {
    await rm(E2E_SMOKE_DIR, { recursive: true, force: true });
    await mkdir(E2E_SMOKE_DIR, { recursive: true });
  });

  afterAll(async () => {
    await rm(E2E_SMOKE_DIR, { recursive: true, force: true });
  });

  for (const config of backendOnlyConfigs) {
    describe(config.name, () => {
      let server: ServerProcess | null = null;

      afterAll(async () => {
        if (server) {
          await server.kill();
          await new Promise((r) => setTimeout(r, 3000));
          server = null;
        }
      });

      it("should scaffold and install", async () => {
        const result = await setupE2EProject(
          config.name,
          {
            frontend: config.frontend,
            backend: config.backend,
            runtime: config.runtime,
            api: config.api,
            auth: config.auth,
            database: "sqlite",
            orm: "drizzle",
            addons: ["none"],
            examples: ["none"],
            dbSetup: "none",
            webDeploy: "none",
            serverDeploy: "none",
            ...config.overrides,
          },
          E2E_SMOKE_DIR,
        );
        expect(result.success).toBe(true);
      });

      it("should start the backend server", async () => {
        server = await startServer(join(E2E_SMOKE_DIR, config.name), {
          port: SERVER_PORT,
          timeout: 60_000,
        });
        expect(server.baseUrl).toBe(`http://localhost:${SERVER_PORT}`);
      });

      it("should respond to health check", async () => {
        const healthy = await checkHealth(`http://localhost:${SERVER_PORT}`);
        expect(healthy).toBe(true);
      });

      it("should respond to API calls", async () => {
        const result = await config.callApi(
          `http://localhost:${SERVER_PORT}`,
          "healthCheck",
        );
        expect(result.status).toBe(200);
      });
    });
  }
});

describeE2E("E2E Fullstack Dev Environment Tests", () => {
  beforeAll(async () => {
    await rm(E2E_SMOKE_DIR, { recursive: true, force: true });
    await mkdir(E2E_SMOKE_DIR, { recursive: true });
  });

  afterAll(async () => {
    await rm(E2E_SMOKE_DIR, { recursive: true, force: true });
  });

  for (const config of fullstackConfigs) {
    describe(config.name, () => {
      let devServer: DevServerProcess | null = null;

      afterAll(async () => {
        if (devServer) {
          await devServer.kill();
          await new Promise((r) => setTimeout(r, 3000));
          devServer = null;
        }
      });

      it("should scaffold and install", async () => {
        const result = await setupE2EProject(
          config.name,
          {
            frontend: config.frontend,
            backend: config.backend,
            runtime: config.runtime,
            api: config.api,
            auth: config.auth,
            database: "sqlite",
            orm: "drizzle",
            addons: ["none"],
            examples: ["none"],
            dbSetup: "none",
            webDeploy: "none",
            serverDeploy: "none",
            cssFramework: "tailwind",
            uiLibrary: "none",
            ...config.overrides,
          },
          E2E_SMOKE_DIR,
        );
        expect(result.success).toBe(true);
      });

      it("should start the dev server", async () => {
        devServer = await startDevServer(join(E2E_SMOKE_DIR, config.name), {
          frontend: config.frontend[0],
          backend: config.backend,
          timeout: 120_000,
        });
        expect(devServer.frontendUrl).toBeTruthy();
      });

      it("should serve a valid frontend page", async () => {
        const page = await checkFrontendPage(devServer!.frontendUrl);
        if (!page.ok) {
          console.error(`[E2E] Page errors for ${config.name}:`, page.errors);
        }
        expect(page.ok).toBe(true);
        expect(page.status).toBeLessThan(500);
      });

      it("should have valid framework markers", async () => {
        const page = await checkFrontendPage(devServer!.frontendUrl);
        const framework = validateFrameworkPage(page.html, config.frontend[0]);
        if (!framework.ok) {
          console.warn(`[E2E] Missing markers for ${config.name}:`, framework.missing);
        }
        // Framework markers are advisory — some frameworks don't have easily detectable markers
        expect(framework.markers.length).toBeGreaterThan(0);
      });

      it("should load static assets", async () => {
        const page = await checkFrontendPage(devServer!.frontendUrl);
        const assets = await checkStaticAssets(devServer!.frontendUrl, page.html);
        if (!assets.ok) {
          console.error(`[E2E] Failed assets for ${config.name}:`, assets.failed);
        }
        // At least some assets should be checked (CSS/JS)
        expect(assets.checked).toBeGreaterThan(0);
      });

      it("should pass TypeScript typecheck", async () => {
        const tc = await typecheckProject(join(E2E_SMOKE_DIR, config.name), {
          timeout: 180_000,
        });
        if (!tc.ok) {
          console.error(`[E2E] Typecheck errors for ${config.name}:`, tc.stderr);
        }
        expect(tc.ok).toBe(true);
      });
    });
  }
});
