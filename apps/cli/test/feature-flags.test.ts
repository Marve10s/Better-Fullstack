import { describe, it, expect } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { expectSuccess, runTRPCTest } from "./test-utils";

function findNode(node: unknown, path: string): any {
  if (!node) return undefined;

  const typedNode = node as { path?: string; children?: unknown[] };
  const normalizedNodePath = typedNode.path?.replace(/^\/+/, "");
  const normalizedPath = path.replace(/^\/+/, "");
  if (normalizedNodePath === normalizedPath || normalizedNodePath?.endsWith(`/${normalizedPath}`)) {
    return typedNode;
  }

  for (const child of typedNode.children ?? []) {
    const found = findNode(child, path);
    if (found) return found;
  }

  return undefined;
}

function packageJson(
  result: Awaited<ReturnType<typeof runTRPCTest>>,
  path: "apps/server" | "apps/web",
) {
  const packageNode = findNode(result.result?.tree?.root, `${path}/package.json`);
  if (packageNode?.content) return JSON.parse(packageNode.content);
  if (!result.projectDir) return {};

  return JSON.parse(readFileSync(join(result.projectDir, path, "package.json"), "utf8"));
}

function fileContent(result: Awaited<ReturnType<typeof runTRPCTest>>, path: string): string {
  const fileNode = findNode(result.result?.tree?.root, path);
  if (fileNode?.content) return fileNode.content;
  if (!result.projectDir) return "";

  return readFileSync(join(result.projectDir, path), "utf8");
}

describe("Feature Flags Configurations", () => {
  describe("PostHog", () => {
    it("should work with posthog + hono backend", async () => {
      const result = await runTRPCTest({
        projectName: "posthog-hono",
        featureFlags: "posthog",
        backend: "hono",
        runtime: "bun",
        database: "sqlite",
        orm: "drizzle",
        api: "trpc",
        auth: "better-auth",
        frontend: ["tanstack-router"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);

      // Check that PostHog dependencies were added to server
      const appsServer = result.result?.tree?.root?.children
        ?.find((c: any) => c.name === "apps")
        ?.children?.find((c: any) => c.name === "server");

      const serverPackageJson = appsServer?.children?.find((c: any) => c.name === "package.json");

      if (serverPackageJson?.content) {
        const pkgJson = JSON.parse(serverPackageJson.content);
        expect(pkgJson.dependencies?.["posthog-node"]).toBeDefined();
      }

      // Check that PostHog dependencies were added to web
      const appsWeb = result.result?.tree?.root?.children
        ?.find((c: any) => c.name === "apps")
        ?.children?.find((c: any) => c.name === "web");

      const webPackageJson = appsWeb?.children?.find((c: any) => c.name === "package.json");

      if (webPackageJson?.content) {
        const pkgJson = JSON.parse(webPackageJson.content);
        expect(pkgJson.dependencies?.["posthog-js"]).toBeDefined();
      }
    });

    it("should work with posthog + express backend", async () => {
      const result = await runTRPCTest({
        projectName: "posthog-express",
        featureFlags: "posthog",
        backend: "express",
        runtime: "node",
        database: "sqlite",
        orm: "drizzle",
        api: "trpc",
        auth: "better-auth",
        frontend: ["tanstack-router"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
    });

    it("should work with posthog + fastify backend", async () => {
      const result = await runTRPCTest({
        projectName: "posthog-fastify",
        featureFlags: "posthog",
        backend: "fastify",
        runtime: "node",
        database: "sqlite",
        orm: "drizzle",
        api: "trpc",
        auth: "better-auth",
        frontend: ["tanstack-router"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
    });

    it("should work with posthog + elysia backend", async () => {
      const result = await runTRPCTest({
        projectName: "posthog-elysia",
        featureFlags: "posthog",
        backend: "elysia",
        runtime: "bun",
        database: "sqlite",
        orm: "drizzle",
        api: "trpc",
        auth: "better-auth",
        frontend: ["tanstack-router"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
    });

    it("should work with posthog + Next.js fullstack", async () => {
      const result = await runTRPCTest({
        projectName: "posthog-next",
        featureFlags: "posthog",
        backend: "self",
        runtime: "none",
        database: "sqlite",
        orm: "drizzle",
        api: "trpc",
        auth: "better-auth",
        frontend: ["next"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);

      // For fullstack apps, both SDKs should be in web package
      const appsWeb = result.result?.tree?.root?.children
        ?.find((c: any) => c.name === "apps")
        ?.children?.find((c: any) => c.name === "web");

      const webPackageJson = appsWeb?.children?.find((c: any) => c.name === "package.json");

      if (webPackageJson?.content) {
        const pkgJson = JSON.parse(webPackageJson.content);
        expect(pkgJson.dependencies?.["posthog-js"]).toBeDefined();
        expect(pkgJson.dependencies?.["posthog-node"]).toBeDefined();
      }
    });

    it("should work with posthog + nestjs backend", async () => {
      const result = await runTRPCTest({
        projectName: "posthog-nestjs",
        featureFlags: "posthog",
        backend: "nestjs",
        runtime: "node",
        database: "sqlite",
        orm: "drizzle",
        api: "trpc",
        auth: "better-auth",
        frontend: ["tanstack-router"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
    });

    it("should work with posthog + react-router frontend", async () => {
      const result = await runTRPCTest({
        projectName: "posthog-react-router",
        featureFlags: "posthog",
        backend: "hono",
        runtime: "bun",
        database: "sqlite",
        orm: "drizzle",
        api: "trpc",
        auth: "better-auth",
        frontend: ["react-router"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
    });
  });

  describe("GrowthBook", () => {
    it("should work with growthbook + hono backend", async () => {
      const result = await runTRPCTest({
        projectName: "growthbook-hono",
        featureFlags: "growthbook",
        backend: "hono",
        runtime: "bun",
        database: "sqlite",
        orm: "drizzle",
        api: "trpc",
        auth: "better-auth",
        frontend: ["tanstack-router"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);

      // Check that GrowthBook dependencies were added to server
      const appsServer = result.result?.tree?.root?.children
        ?.find((c: any) => c.name === "apps")
        ?.children?.find((c: any) => c.name === "server");

      const serverPackageJson = appsServer?.children?.find((c: any) => c.name === "package.json");

      if (serverPackageJson?.content) {
        const pkgJson = JSON.parse(serverPackageJson.content);
        expect(pkgJson.dependencies?.["@growthbook/growthbook"]).toBeDefined();
      }

      // Check that GrowthBook dependencies were added to web
      const appsWeb = result.result?.tree?.root?.children
        ?.find((c: any) => c.name === "apps")
        ?.children?.find((c: any) => c.name === "web");

      const webPackageJson = appsWeb?.children?.find((c: any) => c.name === "package.json");

      if (webPackageJson?.content) {
        const pkgJson = JSON.parse(webPackageJson.content);
        expect(pkgJson.dependencies?.["@growthbook/growthbook-react"]).toBeDefined();
      }
    });

    it("should work with growthbook + express backend", async () => {
      const result = await runTRPCTest({
        projectName: "growthbook-express",
        featureFlags: "growthbook",
        backend: "express",
        runtime: "node",
        database: "sqlite",
        orm: "drizzle",
        api: "trpc",
        auth: "better-auth",
        frontend: ["tanstack-router"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
    });

    it("should work with growthbook + fastify backend", async () => {
      const result = await runTRPCTest({
        projectName: "growthbook-fastify",
        featureFlags: "growthbook",
        backend: "fastify",
        runtime: "node",
        database: "sqlite",
        orm: "drizzle",
        api: "trpc",
        auth: "better-auth",
        frontend: ["tanstack-router"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
    });

    it("should work with growthbook + elysia backend", async () => {
      const result = await runTRPCTest({
        projectName: "growthbook-elysia",
        featureFlags: "growthbook",
        backend: "elysia",
        runtime: "bun",
        database: "sqlite",
        orm: "drizzle",
        api: "trpc",
        auth: "better-auth",
        frontend: ["tanstack-router"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
    });

    it("should work with growthbook + Next.js fullstack", async () => {
      const result = await runTRPCTest({
        projectName: "growthbook-next",
        featureFlags: "growthbook",
        backend: "self",
        runtime: "none",
        database: "sqlite",
        orm: "drizzle",
        api: "trpc",
        auth: "better-auth",
        frontend: ["next"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);

      // For fullstack apps, both SDKs should be in web package
      const appsWeb = result.result?.tree?.root?.children
        ?.find((c: any) => c.name === "apps")
        ?.children?.find((c: any) => c.name === "web");

      const webPackageJson = appsWeb?.children?.find((c: any) => c.name === "package.json");

      if (webPackageJson?.content) {
        const pkgJson = JSON.parse(webPackageJson.content);
        expect(pkgJson.dependencies?.["@growthbook/growthbook-react"]).toBeDefined();
        expect(pkgJson.dependencies?.["@growthbook/growthbook"]).toBeDefined();
      }
    });

    it("should work with growthbook + nestjs backend", async () => {
      const result = await runTRPCTest({
        projectName: "growthbook-nestjs",
        featureFlags: "growthbook",
        backend: "nestjs",
        runtime: "node",
        database: "sqlite",
        orm: "drizzle",
        api: "trpc",
        auth: "better-auth",
        frontend: ["tanstack-router"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
    });

    it("should work with growthbook + react-router frontend", async () => {
      const result = await runTRPCTest({
        projectName: "growthbook-react-router",
        featureFlags: "growthbook",
        backend: "hono",
        runtime: "bun",
        database: "sqlite",
        orm: "drizzle",
        api: "trpc",
        auth: "better-auth",
        frontend: ["react-router"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
    });
  });

  describe("Additional providers", () => {
    const providers = [
      {
        id: "launchdarkly",
        serverPackage: "@launchdarkly/node-server-sdk",
        webPackage: "@launchdarkly/js-client-sdk",
        serverFile: "apps/server/src/lib/launchdarkly.ts",
        webFile: "apps/web/src/lib/launchdarkly.tsx",
        envKey: "LAUNCHDARKLY_SDK_KEY",
        webEnvKey: "VITE_LAUNCHDARKLY_CLIENT_SIDE_ID",
      },
      {
        id: "flagsmith",
        serverPackage: "flagsmith-nodejs",
        webPackage: "@flagsmith/flagsmith",
        serverFile: "apps/server/src/lib/flagsmith.ts",
        webFile: "apps/web/src/lib/flagsmith.tsx",
        envKey: "FLAGSMITH_SERVER_SIDE_ENVIRONMENT_KEY",
        webEnvKey: "VITE_FLAGSMITH_ENVIRONMENT_ID",
      },
      {
        id: "unleash",
        serverPackage: "unleash-client",
        webPackage: "@unleash/proxy-client-react",
        serverFile: "apps/server/src/lib/unleash.ts",
        webFile: "apps/web/src/lib/unleash.tsx",
        envKey: "UNLEASH_SERVER_API_TOKEN",
        webEnvKey: "VITE_UNLEASH_FRONTEND_API_URL",
      },
    ] as const;

    for (const provider of providers) {
      it(`should scaffold ${provider.id} for split web/server apps`, async () => {
        const result = await runTRPCTest({
          projectName: `${provider.id}-hono`,
          featureFlags: provider.id,
          backend: "hono",
          runtime: "bun",
          database: "sqlite",
          orm: "drizzle",
          api: "trpc",
          auth: "better-auth",
          frontend: ["tanstack-router"],
          addons: ["turborepo"],
          examples: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "none",
          install: false,
        });

        expectSuccess(result);

        expect(
          packageJson(result, "apps/server").dependencies?.[provider.serverPackage],
        ).toBeDefined();
        expect(packageJson(result, "apps/web").dependencies?.[provider.webPackage]).toBeDefined();
        if (provider.id === "unleash") {
          expect(packageJson(result, "apps/web").dependencies?.["unleash-proxy-client"]).toBe(
            "^3.8.0",
          );
        }
        expect(fileContent(result, provider.serverFile)).toContain(provider.serverPackage);
        expect(fileContent(result, provider.webFile)).toContain(provider.webPackage);
        expect(fileContent(result, "apps/server/.env")).toContain(provider.envKey);
        expect(fileContent(result, "apps/web/.env")).toContain(provider.webEnvKey);
      });
    }
  });

  describe("No Feature Flags (none)", () => {
    it("should not add feature flag dependencies when featureFlags is none", async () => {
      const result = await runTRPCTest({
        projectName: "no-feature-flags",
        featureFlags: "none",
        backend: "hono",
        runtime: "bun",
        database: "sqlite",
        orm: "drizzle",
        api: "trpc",
        auth: "better-auth",
        frontend: ["tanstack-router"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);

      // Check that GrowthBook dependencies were NOT added
      const appsServer = result.result?.tree?.root?.children
        ?.find((c: any) => c.name === "apps")
        ?.children?.find((c: any) => c.name === "server");

      const serverPackageJson = appsServer?.children?.find((c: any) => c.name === "package.json");

      if (serverPackageJson?.content) {
        const pkgJson = JSON.parse(serverPackageJson.content);
        expect(pkgJson.dependencies?.["@growthbook/growthbook"]).toBeUndefined();
        expect(pkgJson.dependencies?.["posthog-node"]).toBeUndefined();
      }

      const appsWeb = result.result?.tree?.root?.children
        ?.find((c: any) => c.name === "apps")
        ?.children?.find((c: any) => c.name === "web");

      const webPackageJson = appsWeb?.children?.find((c: any) => c.name === "package.json");

      if (webPackageJson?.content) {
        const pkgJson = JSON.parse(webPackageJson.content);
        expect(pkgJson.dependencies?.["@growthbook/growthbook-react"]).toBeUndefined();
        expect(pkgJson.dependencies?.["posthog-js"]).toBeUndefined();
      }
    });
  });
});
