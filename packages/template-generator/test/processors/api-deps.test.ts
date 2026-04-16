import { describe, expect, it } from "bun:test";

import { processApiDeps } from "../../src/processors/api-deps";
import { makeConfig } from "../_fixtures/config-factory";
import { createSeededVFS, getDeps } from "../_fixtures/vfs-factory";

function expectIncludesAll(actual: string[], expected: string[]): void {
  for (const item of expected) {
    expect(actual).toContain(item);
  }
}

describe("processApiDeps", () => {
  it("adds convex dependencies for supported web and native frontends", () => {
    const vfs = createSeededVFS(["apps/web/package.json", "apps/native/package.json"]);

    processApiDeps(
      vfs,
      makeConfig({
        backend: "convex",
        frontend: ["tanstack-start", "svelte", "nuxt", "native-bare"],
      }),
    );

    const web = getDeps(vfs, "apps/web/package.json");
    const native = getDeps(vfs, "apps/native/package.json");

    expectIncludesAll(web.deps, [
      "convex",
      "@convex-dev/react-query",
      "@tanstack/react-router-ssr-query",
      "convex-svelte",
      "convex-nuxt",
      "convex-vue",
    ]);
    expect(native.deps).toEqual(["convex"]);
  });

  it("adds solid router devtools even when api is none", () => {
    const vfs = createSeededVFS(["apps/web/package.json"]);

    processApiDeps(
      vfs,
      makeConfig({
        api: "none",
        frontend: ["solid"],
      }),
    );

    const web = getDeps(vfs, "apps/web/package.json");
    expect(web.devDeps).toContain("@tanstack/solid-router-devtools");
    expect(web.deps).toEqual([]);
  });

  it("adds trpc dependencies across api, server, web, and native packages", () => {
    const vfs = createSeededVFS([
      "apps/web/package.json",
      "apps/server/package.json",
      "apps/native/package.json",
      "packages/api/package.json",
    ]);

    processApiDeps(
      vfs,
      makeConfig({
        backend: "express",
        api: "trpc",
        auth: "better-auth",
        frontend: ["react-router", "native-bare"],
      }),
    );

    const api = getDeps(vfs, "packages/api/package.json");
    const server = getDeps(vfs, "apps/server/package.json");
    const web = getDeps(vfs, "apps/web/package.json");
    const native = getDeps(vfs, "apps/native/package.json");

    expectIncludesAll(api.deps, ["@trpc/server", "@trpc/client", "zod", "better-auth"]);
    expect(api.devDeps).toContain("@types/express");
    expectIncludesAll(server.deps, ["@trpc/server", "@hono/trpc-server"]);
    expectIncludesAll(web.deps, [
      "@trpc/tanstack-react-query",
      "@trpc/client",
      "@trpc/server",
      "@tanstack/react-query",
    ]);
    expect(web.devDeps).toContain("@tanstack/react-query-devtools");
    expectIncludesAll(native.deps, [
      "@trpc/tanstack-react-query",
      "@trpc/client",
      "@trpc/server",
      "@tanstack/react-query",
    ]);
  });

  it("adds self-backend ts-rest web dependencies without touching a missing server package", () => {
    const vfs = createSeededVFS(["apps/web/package.json", "packages/api/package.json"]);

    processApiDeps(
      vfs,
      makeConfig({
        backend: "self",
        api: "ts-rest",
        frontend: ["next"],
      }),
    );

    const api = getDeps(vfs, "packages/api/package.json");
    const web = getDeps(vfs, "apps/web/package.json");

    expectIncludesAll(api.deps, ["@ts-rest/core", "zod", "next"]);
    expectIncludesAll(web.deps, [
      "@ts-rest/core",
      "@ts-rest/serverless",
      "@ts-rest/next",
      "@ts-rest/react-query",
      "@tanstack/react-query",
    ]);
    expect(web.devDeps).toContain("@tanstack/react-query-devtools");
  });

  it("adds oRPC solid query dependencies and devtools", () => {
    const vfs = createSeededVFS(["apps/web/package.json", "apps/server/package.json"]);

    processApiDeps(
      vfs,
      makeConfig({
        api: "orpc",
        frontend: ["solid"],
      }),
    );

    const web = getDeps(vfs, "apps/web/package.json");

    expectIncludesAll(web.deps, [
      "@orpc/tanstack-query",
      "@orpc/client",
      "@orpc/server",
      "@tanstack/solid-query",
    ]);
    expectIncludesAll(web.devDeps, [
      "@tanstack/solid-query-devtools",
      "@tanstack/solid-router-devtools",
    ]);
  });
});
