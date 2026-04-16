import { describe, expect, it } from "bun:test";

import { processAuthDeps } from "../../src/processors/auth-deps";
import { makeConfig } from "../_fixtures/config-factory";
import { createSeededVFS, getDeps } from "../_fixtures/vfs-factory";

function expectIncludesAll(actual: readonly string[], expected: readonly string[]): void {
  for (const item of expected) {
    expect(actual).toContain(item);
  }
}

describe("processAuthDeps", () => {
  it("does nothing when auth is none", () => {
    const vfs = createSeededVFS([
      "apps/web/package.json",
      "apps/native/package.json",
      "packages/auth/package.json",
    ]);

    processAuthDeps(vfs, makeConfig({ auth: "none" }));

    expect(getDeps(vfs, "apps/web/package.json")).toEqual({ deps: [], devDeps: [] });
    expect(getDeps(vfs, "apps/native/package.json")).toEqual({ deps: [], devDeps: [] });
    expect(getDeps(vfs, "packages/auth/package.json")).toEqual({ deps: [], devDeps: [] });
  });

  it("adds Clerk dependencies for convex next web and native apps", () => {
    const vfs = createSeededVFS([
      "apps/web/package.json",
      "apps/native/package.json",
      "packages/backend/package.json",
    ]);

    processAuthDeps(
      vfs,
      makeConfig({
        backend: "convex",
        auth: "clerk",
        frontend: ["next", "native-bare"],
      }),
    );

    expect(getDeps(vfs, "apps/web/package.json").deps).toEqual(["@clerk/nextjs"]);
    expect(getDeps(vfs, "apps/native/package.json").deps).toEqual(["@clerk/clerk-expo"]);
    expect(getDeps(vfs, "packages/backend/package.json")).toEqual({ deps: [], devDeps: [] });
  });

  it("adds Better Auth dependencies for convex React and native frontends", () => {
    const vfs = createSeededVFS([
      "apps/web/package.json",
      "apps/native/package.json",
      "packages/backend/package.json",
    ]);

    processAuthDeps(
      vfs,
      makeConfig({
        backend: "convex",
        auth: "better-auth",
        frontend: ["react-router", "native-bare"],
      }),
    );

    expectIncludesAll(getDeps(vfs, "packages/backend/package.json").deps, [
      "better-auth",
      "@convex-dev/better-auth",
      "@better-auth/expo",
    ]);
    expectIncludesAll(getDeps(vfs, "apps/web/package.json").deps, [
      "better-auth",
      "@convex-dev/better-auth",
      "@tanstack/react-form",
    ]);
    expectIncludesAll(getDeps(vfs, "apps/native/package.json").deps, [
      "better-auth",
      "@better-auth/expo",
      "@convex-dev/better-auth",
    ]);
  });

  it("adds standard Better Auth dependencies, adapters, and React form support", () => {
    const vfs = createSeededVFS([
      "apps/web/package.json",
      "apps/native/package.json",
      "packages/auth/package.json",
    ]);

    processAuthDeps(
      vfs,
      makeConfig({
        auth: "better-auth",
        orm: "drizzle",
        frontend: ["react-router", "native-bare"],
      }),
    );

    expectIncludesAll(getDeps(vfs, "packages/auth/package.json").deps, [
      "better-auth",
      "@better-auth/drizzle-adapter",
      "@better-auth/expo",
    ]);
    expectIncludesAll(getDeps(vfs, "apps/web/package.json").deps, [
      "better-auth",
      "@tanstack/react-form",
    ]);
    expectIncludesAll(getDeps(vfs, "apps/native/package.json").deps, [
      "better-auth",
      "@better-auth/expo",
    ]);
  });

  it("adds Clerk dependencies for TanStack Start in standard mode", () => {
    const vfs = createSeededVFS(["apps/web/package.json"]);

    processAuthDeps(
      vfs,
      makeConfig({
        auth: "clerk",
        frontend: ["tanstack-start"],
      }),
    );

    expectIncludesAll(getDeps(vfs, "apps/web/package.json").deps, [
      "@clerk/tanstack-react-start",
      "srvx",
    ]);
  });

  it("adds NextAuth and the configured ORM adapter for Next.js", () => {
    const vfs = createSeededVFS(["apps/web/package.json"]);

    processAuthDeps(
      vfs,
      makeConfig({
        auth: "nextauth",
        orm: "prisma",
        frontend: ["next"],
      }),
    );

    expectIncludesAll(getDeps(vfs, "apps/web/package.json").deps, [
      "next-auth",
      "@auth/core",
      "@auth/prisma-adapter",
    ]);
  });

  for (const [auth, expected] of [
    ["stack-auth", ["@stackframe/stack"]],
    ["supabase-auth", ["@supabase/supabase-js", "@supabase/ssr"]],
    ["auth0", ["@auth0/nextjs-auth0"]],
  ] as const) {
    it(`adds ${auth} only for Next.js`, () => {
      const vfs = createSeededVFS(["apps/web/package.json"]);

      processAuthDeps(
        vfs,
        makeConfig({
          auth,
          frontend: ["next"],
        }),
      );

      expectIncludesAll(getDeps(vfs, "apps/web/package.json").deps, expected);
    });
  }
});
