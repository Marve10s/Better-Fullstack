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
  apiBasePath?: string;
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
    apiBasePath: "/api",
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
    name: "solid-start-self-orpc",
    frontend: ["solid-start"],
    backend: "self",
    runtime: "none",
    api: "orpc",
    auth: "better-auth",
    apiBasePath: "/api",
    callApi: callORPC,
  },
  {
    name: "svelte-self-orpc",
    frontend: ["svelte"],
    backend: "self",
    runtime: "none",
    api: "orpc",
    auth: "better-auth",
    apiBasePath: "/api",
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
    apiBasePath: "/api",
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
      it("scaffolds, starts, and serves its API", async () => {
        let server: ServerProcess | null = null;
        let leakedPorts: number[] = [];
        try {
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
          expect(result.success, result.error).toBe(true);

          server = await startServer(join(E2E_SMOKE_DIR, config.name), {
            port: SERVER_PORT,
            timeout: 60_000,
          });
          expect(server.baseUrl).toBe("http://localhost:" + SERVER_PORT);
          expect(await checkHealth(server.baseUrl)).toBe(true);

          const apiResult = await config.callApi(server.baseUrl, "healthCheck");
          expect(apiResult.status).toBe(200);
        } finally {
          leakedPorts = (await server?.kill()) ?? [];
        }
        expect(leakedPorts).toEqual([]);
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
      it("scaffolds, starts, serves, and type-checks the full stack", async () => {
        let devServer: DevServerProcess | null = null;
        let leakedPorts: number[] = [];
        try {
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
          expect(result.success, result.error).toBe(true);

          devServer = await startDevServer(join(E2E_SMOKE_DIR, config.name), {
            frontend: config.frontend[0],
            backend: config.backend,
            timeout: 120_000,
          });
          expect(devServer.frontendUrl).toBeTruthy();

          const page = await checkFrontendPage(devServer.frontendUrl);
          if (!page.ok) {
            console.error("[E2E] Page errors for " + config.name + ":", page.errors);
          }
          expect(page.ok).toBe(true);
          expect(page.status).toBeLessThan(500);

          const framework = validateFrameworkPage(page.html, config.frontend[0]);
          if (!framework.ok) {
            console.warn("[E2E] Missing markers for " + config.name + ":", framework.missing);
          }
          expect(framework.ok).toBe(true);
          expect(framework.markers.length).toBeGreaterThan(0);

          const assets = await checkStaticAssets(devServer.frontendUrl, page.html);
          if (!assets.ok) {
            console.error("[E2E] Failed assets for " + config.name + ":", assets.failed);
          }
          expect(assets.ok).toBe(true);
          expect(assets.checked).toBeGreaterThan(0);

          const apiBase =
            devServer.backendUrl ?? devServer.frontendUrl + (config.apiBasePath ?? "");
          const apiResult = await config.callApi(apiBase, "healthCheck");
          expect(apiResult.status).toBe(200);

          const typecheck = await typecheckProject(join(E2E_SMOKE_DIR, config.name), {
            timeout: 180_000,
            requireTarget: true,
          });
          if (!typecheck.ok) {
            console.error("[E2E] Typecheck errors for " + config.name + ":", typecheck.stderr);
          }
          expect(typecheck.ok).toBe(true);
        } finally {
          leakedPorts = (await devServer?.kill()) ?? [];
        }
        expect(leakedPorts).toEqual([]);
      }, 1_200_000);
    });
  }
});
