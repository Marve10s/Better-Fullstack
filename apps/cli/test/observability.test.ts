import { describe, it, expect } from "bun:test";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { expectError, expectSuccess, runTRPCTest } from "./test-utils";

describe("Observability Configurations", () => {
  describe("SigNoz", () => {
    it("generates an OTLP setup with SigNoz endpoint and ingestion headers", async () => {
      const result = await runTRPCTest({
        projectName: "signoz-hono",
        observability: "signoz",
        backend: "hono",
        runtime: "bun",
        database: "sqlite",
        orm: "drizzle",
        api: "trpc",
        auth: "none",
        frontend: ["tanstack-router"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
      const pkg = await readFile(join(result.projectDir!, "apps/server/package.json"), "utf-8");
      const tracing = await readFile(
        join(result.projectDir!, "apps/server/src/lib/tracing.ts"),
        "utf-8",
      );
      const serverEntry = await readFile(
        join(result.projectDir!, "apps/server/src/index.ts"),
        "utf-8",
      );
      const env = await readFile(join(result.projectDir!, "apps/server/.env"), "utf-8");

      expect(pkg).toContain("@opentelemetry/sdk-node");
      expect(tracing.startsWith('import "dotenv/config";')).toBe(true);
      expect(tracing).toContain("OTEL_EXPORTER_OTLP_HEADERS");
      expect(tracing).toContain("signoz");
      expect(tracing).toContain("startTracing();");
      expect(tracing).toContain("export function withTracing");
      expect(tracing).toContain("const reader = response.body.getReader()");
      expect(tracing).toContain("async pull(controller)");
      expect(tracing).toContain("recordStreamError(error)");
      expect(tracing).toContain("async cancel(reason)");
      expect(tracing).toContain("process.once(signal");
      expect(tracing).toContain("hasApplicationShutdownHandler");
      expect(tracing).toContain("if (!hasApplicationShutdownHandler)");
      expect(tracing).toContain("process.kill(process.pid, signal)");
      expect(tracing).not.toContain("process.exit(0)");
      expect(serverEntry.startsWith('import "./lib/tracing";')).toBe(true);
      expect(serverEntry).toContain('import { withTracing } from "./lib/tracing";');
      expect(serverEntry).toContain("export default { fetch: withTracing(app.fetch) };");
      expect(env).toContain("OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318");
      expect(env).toContain("OTEL_EXPORTER_OTLP_HEADERS=");
      expect(env).toContain("SigNoz Cloud: signoz-ingestion-key=<your-key>");
    });

    it("rejects the Node SDK scaffold on Cloudflare Workers", async () => {
      const result = await runTRPCTest({
        projectName: "signoz-workers",
        observability: "signoz",
        backend: "hono",
        runtime: "workers",
        database: "sqlite",
        orm: "drizzle",
        api: "trpc",
        auth: "none",
        frontend: ["tanstack-router"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "d1",
        webDeploy: "none",
        serverDeploy: "cloudflare",
        install: false,
        expectError: true,
      });

      expectError(result, "SigNoz tracing currently requires");
    });

    it("rejects self backends without a SigNoz bootstrap", async () => {
      for (const frontend of ["tanstack-start", "astro"] as const) {
        const result = await runTRPCTest({
          projectName: `signoz-${frontend}`,
          observability: "signoz",
          frontend: [frontend],
          backend: "self",
          runtime: "none",
          database: "none",
          orm: "none",
          api: "none",
          auth: "none",
          addons: ["none"],
          examples: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "none",
          install: false,
          expectError: true,
        });

        expectError(result, "SigNoz tracing is not yet bootstrapped");
      }
    });

    it("rejects SigNoz for Cloudflare-hosted Next.js fullstack apps", async () => {
      const result = await runTRPCTest({
        projectName: "signoz-next-cloudflare",
        observability: "signoz",
        frontend: ["next"],
        backend: "self",
        runtime: "none",
        database: "none",
        orm: "none",
        api: "none",
        auth: "none",
        addons: ["none"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "cloudflare",
        serverDeploy: "none",
        install: false,
        expectError: true,
      });

      expectError(result, "Cloudflare-hosted fullstack apps");
    });

    it("loads Next.js tracing only in the Node runtime", async () => {
      const result = await runTRPCTest({
        projectName: "signoz-next",
        observability: "signoz",
        frontend: ["next"],
        backend: "self",
        runtime: "none",
        database: "sqlite",
        orm: "drizzle",
        api: "trpc",
        auth: "none",
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
      const instrumentation = await readFile(
        join(result.projectDir!, "apps/web/src/instrumentation.ts"),
        "utf-8",
      );
      expect(instrumentation).toContain('process.env.NEXT_RUNTIME === "nodejs"');
      expect(instrumentation).toContain('await import("./lib/tracing")');
    });

    it("wraps the SvelteKit request lifecycle explicitly", async () => {
      const result = await runTRPCTest({
        projectName: "signoz-svelte",
        observability: "signoz",
        frontend: ["svelte"],
        backend: "self",
        runtime: "none",
        database: "none",
        orm: "none",
        api: "none",
        auth: "none",
        addons: ["none"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
      const hooks = await readFile(
        join(result.projectDir!, "apps/web/src/hooks.server.ts"),
        "utf-8",
      );
      expect(hooks).toContain('import { withTracing } from "./lib/tracing";');
      expect(hooks).toContain("export const handle: Handle");
      expect(hooks).toContain("withTracing(() => resolve(event))(event.request)");
    });

    it("creates propagated request lifecycle spans for Nitro and Nuxt", async () => {
      for (const target of [
        { projectName: "signoz-nitro", frontend: ["react-vite"] as const, backend: "nitro" as const },
        { projectName: "signoz-nuxt", frontend: ["nuxt"] as const, backend: "self" as const },
      ]) {
        const result = await runTRPCTest({
          projectName: target.projectName,
          observability: "signoz",
          frontend: [...target.frontend],
          backend: target.backend,
          runtime: target.backend === "nitro" ? "node" : "none",
          database: "sqlite",
          orm: "drizzle",
          api: "none",
          auth: "none",
          addons: ["turborepo"],
          examples: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "none",
          install: false,
        });

        expectSuccess(result);
        const pluginPath =
          target.backend === "nitro"
            ? "apps/server/plugins/signoz.ts"
            : "apps/web/server/plugins/signoz.ts";
        const plugin = await readFile(join(result.projectDir!, pluginPath), "utf-8");
        expect(plugin).toContain("const handleRequest = nitroApp.h3App.handler");
        expect(plugin).toContain("nitroApp.h3App.handler = async (event)");
        expect(plugin).toContain("propagation.extract");
        expect(plugin).toContain("SpanKind.SERVER");
        expect(plugin).toContain("trace.setSpan(parentContext, span)");
        expect(plugin).toContain("context.with(requestContext");
        expect(plugin).toContain("await handleRequest(event)");
        expect(plugin).toContain('event.node.res.once("finish", endRequestSpan)');
        expect(plugin).toContain('event.node.res.once("close", endAbortedRequestSpan)');
        expect(plugin).toContain("if (event.node.res.writableFinished) return");
        expect(plugin).toContain('new Error("Response closed before completion")');
        expect(plugin).toContain("finishSpan(event, 499, error)");
        expect(plugin).toContain('for (const key of ["statusCode", "status"] as const)');
        expect(plugin).toContain("getErrorStatusCode(requestError)");
        expect(plugin).toContain("requestSpans.delete(event)");
      }
    });

    it("rejects SigNoz when no generated server target exists", async () => {
      for (const backend of ["none", "convex"] as const) {
        const result = await runTRPCTest({
          projectName: `signoz-${backend}`,
          observability: "signoz",
          frontend: ["react-vite"],
          backend,
          runtime: "none",
          database: "none",
          orm: "none",
          api: "none",
          auth: "none",
          addons: ["none"],
          examples: ["none"],
          dbSetup: "none",
          webDeploy: "none",
          serverDeploy: "none",
          install: false,
          expectError: true,
        });

        expectError(result, "SigNoz tracing requires a generated server target");
      }
    });

    it("wraps Elysia's Bun fetch handler with request tracing", async () => {
      const result = await runTRPCTest({
        projectName: "signoz-elysia",
        observability: "signoz",
        backend: "elysia",
        runtime: "bun",
        database: "sqlite",
        orm: "drizzle",
        api: "trpc",
        auth: "none",
        frontend: ["tanstack-router"],
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
      const serverEntry = await readFile(
        join(result.projectDir!, "apps/server/src/index.ts"),
        "utf-8",
      );
      expect(serverEntry.startsWith('import "./lib/tracing";')).toBe(true);
      expect(serverEntry).toContain('import { withTracing } from "./lib/tracing";');
      expect(serverEntry).toContain("fetch: withTracing(app.fetch)");
      expect(serverEntry).not.toContain(".listen(3000");
    });
  });

  describe("OpenTelemetry", () => {
    it("should work with opentelemetry + hono backend", async () => {
      const result = await runTRPCTest({
        projectName: "otel-hono",
        observability: "opentelemetry",
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

      // Check that OpenTelemetry dependencies were added
      const packagesServer = result.result?.tree?.root?.children
        ?.find((c: any) => c.name === "packages")
        ?.children?.find((c: any) => c.name === "server");

      const appsServer = result.result?.tree?.root?.children
        ?.find((c: any) => c.name === "apps")
        ?.children?.find((c: any) => c.name === "server");

      const serverDir = packagesServer || appsServer;
      const serverPackageJson = serverDir?.children?.find((c: any) => c.name === "package.json");

      if (serverPackageJson?.content) {
        const pkgJson = JSON.parse(serverPackageJson.content);
        expect(pkgJson.dependencies?.["@opentelemetry/api"]).toBeDefined();
        expect(pkgJson.dependencies?.["@opentelemetry/sdk-node"]).toBeDefined();
        expect(pkgJson.dependencies?.["@opentelemetry/auto-instrumentations-node"]).toBeDefined();
        expect(pkgJson.dependencies?.["@opentelemetry/exporter-trace-otlp-http"]).toBeDefined();
      }
    });

    it("should work with opentelemetry + express backend", async () => {
      const result = await runTRPCTest({
        projectName: "otel-express",
        observability: "opentelemetry",
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

    it("should work with opentelemetry + fastify backend", async () => {
      const result = await runTRPCTest({
        projectName: "otel-fastify",
        observability: "opentelemetry",
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

    it("should work with opentelemetry + elysia backend", async () => {
      const result = await runTRPCTest({
        projectName: "otel-elysia",
        observability: "opentelemetry",
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

    it("should work with opentelemetry + nitro backend", async () => {
      const result = await runTRPCTest({
        projectName: "otel-nitro",
        observability: "opentelemetry",
        backend: "nitro",
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

    it("should work with opentelemetry + nestjs backend", async () => {
      const result = await runTRPCTest({
        projectName: "otel-nestjs",
        observability: "opentelemetry",
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

    it("should work with opentelemetry + fets backend", async () => {
      const result = await runTRPCTest({
        projectName: "otel-fets",
        observability: "opentelemetry",
        backend: "fets",
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

    it("should work with opentelemetry + Next.js fullstack", async () => {
      const result = await runTRPCTest({
        projectName: "otel-next",
        observability: "opentelemetry",
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
    });
  });

  describe("Sentry", () => {
    it("should work with sentry + hono backend", async () => {
      const result = await runTRPCTest({
        projectName: "sentry-hono",
        observability: "sentry",
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

      // Check that Sentry dependencies were added
      const packagesServer = result.result?.tree?.root?.children
        ?.find((c: any) => c.name === "packages")
        ?.children?.find((c: any) => c.name === "server");

      const appsServer = result.result?.tree?.root?.children
        ?.find((c: any) => c.name === "apps")
        ?.children?.find((c: any) => c.name === "server");

      const serverDir = packagesServer || appsServer;
      const serverPackageJson = serverDir?.children?.find((c: any) => c.name === "package.json");

      if (serverPackageJson?.content) {
        const pkgJson = JSON.parse(serverPackageJson.content);
        expect(pkgJson.dependencies?.["@sentry/node"]).toBeDefined();
        expect(pkgJson.dependencies?.["@sentry/profiling-node"]).toBeDefined();
      }
    });

    it("should work with sentry + express backend", async () => {
      const result = await runTRPCTest({
        projectName: "sentry-express",
        observability: "sentry",
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

    it("should work with sentry + fastify backend", async () => {
      const result = await runTRPCTest({
        projectName: "sentry-fastify",
        observability: "sentry",
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

    it("should work with sentry + elysia backend", async () => {
      const result = await runTRPCTest({
        projectName: "sentry-elysia",
        observability: "sentry",
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

    it("should work with sentry + nitro backend", async () => {
      const result = await runTRPCTest({
        projectName: "sentry-nitro",
        observability: "sentry",
        backend: "nitro",
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

    it("should work with sentry + nestjs backend", async () => {
      const result = await runTRPCTest({
        projectName: "sentry-nestjs",
        observability: "sentry",
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

    it("should work with sentry + fets backend", async () => {
      const result = await runTRPCTest({
        projectName: "sentry-fets",
        observability: "sentry",
        backend: "fets",
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

    it("should work with sentry + Next.js fullstack", async () => {
      const result = await runTRPCTest({
        projectName: "sentry-next",
        observability: "sentry",
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
    });
  });

  describe("Grafana", () => {
    it("should work with grafana + hono backend", async () => {
      const result = await runTRPCTest({
        projectName: "grafana-hono",
        observability: "grafana",
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

      // Check that Grafana (prom-client) dependencies were added
      const packagesServer = result.result?.tree?.root?.children
        ?.find((c: any) => c.name === "packages")
        ?.children?.find((c: any) => c.name === "server");

      const appsServer = result.result?.tree?.root?.children
        ?.find((c: any) => c.name === "apps")
        ?.children?.find((c: any) => c.name === "server");

      const serverDir = packagesServer || appsServer;
      const serverPackageJson = serverDir?.children?.find((c: any) => c.name === "package.json");

      if (serverPackageJson?.content) {
        const pkgJson = JSON.parse(serverPackageJson.content);
        expect(pkgJson.dependencies?.["prom-client"]).toBeDefined();
      }
    });

    it("should work with grafana + express backend", async () => {
      const result = await runTRPCTest({
        projectName: "grafana-express",
        observability: "grafana",
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

    it("should work with grafana + fastify backend", async () => {
      const result = await runTRPCTest({
        projectName: "grafana-fastify",
        observability: "grafana",
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

    it("should work with grafana + elysia backend", async () => {
      const result = await runTRPCTest({
        projectName: "grafana-elysia",
        observability: "grafana",
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

    it("should work with grafana + nitro backend", async () => {
      const result = await runTRPCTest({
        projectName: "grafana-nitro",
        observability: "grafana",
        backend: "nitro",
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

    it("should work with grafana + nestjs backend", async () => {
      const result = await runTRPCTest({
        projectName: "grafana-nestjs",
        observability: "grafana",
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

    it("should work with grafana + fets backend", async () => {
      const result = await runTRPCTest({
        projectName: "grafana-fets",
        observability: "grafana",
        backend: "fets",
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

    it("should work with grafana + Next.js fullstack", async () => {
      const result = await runTRPCTest({
        projectName: "grafana-next",
        observability: "grafana",
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
    });
  });

  describe("No Observability (none)", () => {
    it("should not add observability dependencies when observability is none", async () => {
      const result = await runTRPCTest({
        projectName: "no-observability",
        observability: "none",
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

      // Check that OpenTelemetry dependencies were NOT added
      const packagesServer = result.result?.tree?.root?.children
        ?.find((c: any) => c.name === "packages")
        ?.children?.find((c: any) => c.name === "server");

      const appsServer = result.result?.tree?.root?.children
        ?.find((c: any) => c.name === "apps")
        ?.children?.find((c: any) => c.name === "server");

      const serverDir = packagesServer || appsServer;
      const serverPackageJson = serverDir?.children?.find((c: any) => c.name === "package.json");

      if (serverPackageJson?.content) {
        const pkgJson = JSON.parse(serverPackageJson.content);
        expect(pkgJson.dependencies?.["@opentelemetry/api"]).toBeUndefined();
        expect(pkgJson.dependencies?.["@opentelemetry/sdk-node"]).toBeUndefined();
        expect(pkgJson.dependencies?.["@opentelemetry/auto-instrumentations-node"]).toBeUndefined();
      }
    });
  });
});
