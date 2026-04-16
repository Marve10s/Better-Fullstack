import { describe, expect, it } from "bun:test";

import { processBackendDeps } from "../../src/processors/backend-deps";
import { makeConfig } from "../_fixtures/config-factory";
import { createSeededVFS, getDeps } from "../_fixtures/vfs-factory";

function expectIncludesAll(actual: readonly string[], expected: readonly string[]): void {
  for (const item of expected) {
    expect(actual).toContain(item);
  }
}

describe("processBackendDeps", () => {
  it("adds convex to the backend package for convex projects", () => {
    const vfs = createSeededVFS(["packages/backend/package.json"]);

    processBackendDeps(
      vfs,
      makeConfig({
        backend: "convex",
      }),
    );

    expect(getDeps(vfs, "packages/backend/package.json").deps).toEqual(["convex"]);
  });

  it("adds hono, trpc, node runtime, and better-auth dependencies", () => {
    const vfs = createSeededVFS(["apps/server/package.json"]);

    processBackendDeps(
      vfs,
      makeConfig({
        backend: "hono",
        runtime: "node",
        api: "trpc",
        auth: "better-auth",
      }),
    );

    expectIncludesAll(getDeps(vfs, "apps/server/package.json").deps, [
      "hono",
      "@hono/node-server",
      "@trpc/server",
      "@hono/trpc-server",
      "better-auth",
    ]);
    expectIncludesAll(getDeps(vfs, "apps/server/package.json").devDeps, ["tsx", "@types/node"]);
  });

  it("adds elysia and oRPC dependencies", () => {
    const vfs = createSeededVFS(["apps/server/package.json"]);

    processBackendDeps(
      vfs,
      makeConfig({
        backend: "elysia",
        runtime: "node",
        api: "orpc",
      }),
    );

    expectIncludesAll(getDeps(vfs, "apps/server/package.json").deps, [
      "elysia",
      "@elysiajs/cors",
      "@elysiajs/node",
      "@orpc/server",
      "@orpc/openapi",
      "@orpc/zod",
    ]);
  });

  it("adds Express and Fastify dependencies with correct typings", () => {
    const expressVfs = createSeededVFS(["apps/server/package.json"]);
    const fastifyVfs = createSeededVFS(["apps/server/package.json"]);

    processBackendDeps(
      expressVfs,
      makeConfig({
        backend: "express",
      }),
    );
    processBackendDeps(
      fastifyVfs,
      makeConfig({
        backend: "fastify",
      }),
    );

    expectIncludesAll(getDeps(expressVfs, "apps/server/package.json").deps, ["express", "cors"]);
    expectIncludesAll(getDeps(expressVfs, "apps/server/package.json").devDeps, [
      "@types/express",
      "@types/cors",
      "@types/bun",
    ]);
    expectIncludesAll(getDeps(fastifyVfs, "apps/server/package.json").deps, [
      "fastify",
      "@fastify/cors",
    ]);
  });

  it("adds NestJS, AdonisJS, Nitro, Encore, and feTS dependencies", () => {
    const nestVfs = createSeededVFS(["apps/server/package.json"]);
    const adonisVfs = createSeededVFS(["apps/server/package.json"]);
    const nitroVfs = createSeededVFS(["apps/server/package.json"]);
    const encoreVfs = createSeededVFS(["apps/server/package.json"]);
    const fetsVfs = createSeededVFS(["apps/server/package.json"]);

    processBackendDeps(
      nestVfs,
      makeConfig({
        backend: "nestjs",
      }),
    );
    processBackendDeps(
      adonisVfs,
      makeConfig({
        backend: "adonisjs",
      }),
    );
    processBackendDeps(
      nitroVfs,
      makeConfig({
        backend: "nitro",
      }),
    );
    processBackendDeps(
      encoreVfs,
      makeConfig({
        backend: "encore",
      }),
    );
    processBackendDeps(
      fetsVfs,
      makeConfig({
        backend: "fets",
      }),
    );

    expectIncludesAll(getDeps(nestVfs, "apps/server/package.json").deps, [
      "@nestjs/core",
      "@nestjs/common",
      "@nestjs/platform-express",
      "reflect-metadata",
      "rxjs",
      "express",
    ]);
    expect(getDeps(nestVfs, "apps/server/package.json").devDeps).toContain("@types/express");
    expectIncludesAll(getDeps(adonisVfs, "apps/server/package.json").deps, [
      "@adonisjs/core",
      "@adonisjs/cors",
      "reflect-metadata",
    ]);
    expectIncludesAll(getDeps(adonisVfs, "apps/server/package.json").devDeps, [
      "@adonisjs/assembler",
      "@adonisjs/tsconfig",
      "@types/node",
      "@types/bun",
    ]);
    expectIncludesAll(getDeps(nitroVfs, "apps/server/package.json").deps, ["nitropack", "h3"]);
    expect(getDeps(encoreVfs, "apps/server/package.json").deps).toContain("encore.dev");
    expect(getDeps(fetsVfs, "apps/server/package.json").deps).toContain("fets");
  });

  it("returns early for self and none backends", () => {
    const selfVfs = createSeededVFS(["apps/server/package.json"]);
    const noneVfs = createSeededVFS(["apps/server/package.json"]);

    processBackendDeps(selfVfs, makeConfig({ backend: "self" }));
    processBackendDeps(noneVfs, makeConfig({ backend: "none" }));

    expect(getDeps(selfVfs, "apps/server/package.json")).toEqual({ deps: [], devDeps: [] });
    expect(getDeps(noneVfs, "apps/server/package.json")).toEqual({ deps: [], devDeps: [] });
  });
});
