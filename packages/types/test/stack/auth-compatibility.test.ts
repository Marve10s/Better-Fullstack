import { describe, expect, it } from "bun:test";

import type { CompatibilityInput } from "@/stack/compatibility";

import { getAuthIncompatibility } from "@/capabilities/capabilities";
import { createCliDefaultProjectConfigBase } from "@/config/defaults";
import { analyzeStackCompatibility, getDisabledReason } from "@/stack/compatibility";
import { legacyProjectConfigToStackParts, validateStackParts } from "@/stack/stack-graph";
import { DEFAULT_STACK_SELECTION } from "@/stack/stack-translation";

type AuthCase = {
  auth: string;
  backend: string;
  frontend: string[];
  database?: string;
  orm?: string;
  reason: string;
};

const SQLITE = { database: "sqlite", orm: "drizzle" };
const CONVEX = { backend: "convex", database: "none", orm: "none" };

// One rejected pair per rule, with the reason every path must report.
const REJECTED: AuthCase[] = [
  {
    auth: "clerk",
    backend: "hono",
    frontend: ["tanstack-router"],
    ...SQLITE,
    reason: "Clerk needs Convex, fullstack Next.js, or fullstack TanStack Start",
  },
  {
    auth: "clerk",
    backend: "self",
    frontend: ["nuxt"],
    ...SQLITE,
    reason: "Clerk isn't available for fullstack Nuxt yet",
  },
  {
    auth: "clerk",
    backend: "self",
    frontend: ["astro"],
    ...SQLITE,
    reason: "Clerk isn't available for fullstack Astro yet",
  },
  {
    auth: "clerk",
    backend: "self",
    frontend: ["next", "native-bare"],
    ...SQLITE,
    reason:
      "Clerk with a fullstack backend needs a web-only Next.js or TanStack Start project (no mobile app)",
  },
  {
    auth: "clerk",
    ...CONVEX,
    frontend: ["svelte"],
    reason:
      "Clerk with Convex requires React Router, React + Vite, TanStack Router, TanStack Start, Next.js, or React Native",
  },
  {
    auth: "nextauth",
    backend: "express",
    frontend: ["tanstack-router"],
    ...SQLITE,
    reason: "Auth.js (NextAuth) needs fullstack Next.js",
  },
  {
    auth: "kinde",
    ...CONVEX,
    frontend: ["react-vite"],
    reason: "Kinde needs fullstack Next.js",
  },
  {
    auth: "stack-auth",
    backend: "self",
    frontend: ["tanstack-start"],
    ...SQLITE,
    reason: "Stack Auth needs the Next.js frontend",
  },
  {
    auth: "supabase-auth",
    backend: "fastify",
    frontend: ["tanstack-router"],
    ...SQLITE,
    reason: "Supabase Auth needs fullstack Next.js or fullstack TanStack Start",
  },
  {
    auth: "supabase-auth",
    backend: "self",
    frontend: ["svelte"],
    ...SQLITE,
    reason: "Supabase Auth isn't available for fullstack SvelteKit yet",
  },
  {
    auth: "passport",
    backend: "self",
    frontend: ["next"],
    ...SQLITE,
    reason: "Passport.js is currently scaffolded for the Express backend",
  },
  {
    auth: "better-auth-organizations",
    ...CONVEX,
    frontend: ["react-vite"],
    reason: "Better Auth organizations is currently generated for non-Convex Better Auth stacks",
  },
  {
    auth: "better-auth",
    ...CONVEX,
    frontend: ["svelte"],
    reason:
      "Better-Auth with Convex requires React + Vite, TanStack Router, TanStack Start, Next.js, or React Native",
  },
  {
    auth: "clerk",
    backend: "self",
    frontend: ["tanstack-start-solid"],
    ...SQLITE,
    reason: "TanStack Start (Solid) supports Better Auth only for now",
  },
  {
    auth: "better-auth",
    backend: "hono",
    frontend: ["tanstack-router"],
    database: "postgres",
    orm: "typeorm",
    reason: "Better Auth has no TypeORM adapter",
  },
  {
    auth: "better-auth-organizations",
    backend: "hono",
    frontend: ["tanstack-router"],
    database: "postgres",
    orm: "mikroorm",
    reason: "Better Auth has no MikroORM adapter",
  },
  {
    auth: "better-auth",
    backend: "hono",
    frontend: ["tanstack-router"],
    database: "redis",
    orm: "none",
    reason: "Better Auth has no Redis adapter",
  },
  {
    auth: "better-auth",
    backend: "hono",
    frontend: ["vue"],
    ...SQLITE,
    reason:
      "Auth client integrations are not yet wired for standalone Vue or Vanilla Vite frontends",
  },
  {
    auth: "go-better-auth",
    backend: "hono",
    frontend: ["tanstack-router"],
    ...SQLITE,
    reason: "GoBetterAuth is available only for Go stacks",
  },
];

function isNative(frontend: string) {
  return frontend.startsWith("native-");
}

function compatibilityInput(testCase: AuthCase): CompatibilityInput {
  const webFrontend = testCase.frontend.filter((frontend) => !isNative(frontend));
  return {
    ...DEFAULT_STACK_SELECTION,
    ecosystem: "typescript",
    webFrontend,
    nativeFrontend: testCase.frontend.filter(isNative),
    backend: testCase.backend === "self" ? `self-${webFrontend[0]}` : testCase.backend,
    runtime: testCase.backend === "self" || testCase.backend === "convex" ? "none" : "bun",
    database: testCase.database ?? "none",
    orm: testCase.orm ?? "none",
    api: "none",
    uiLibrary: "none",
    forms: "none",
    auth: testCase.auth,
  };
}

function graphIssues(testCase: AuthCase) {
  const config = {
    ...createCliDefaultProjectConfigBase("bun"),
    projectName: "auth",
    api: "none",
    uiLibrary: "none",
    forms: "none",
    runtime: testCase.backend === "self" || testCase.backend === "convex" ? "none" : "bun",
    ...testCase,
  } as Parameters<typeof legacyProjectConfigToStackParts>[0];
  return validateStackParts(legacyProjectConfigToStackParts(config))
    .issues.filter((issue) => issue.role === "auth")
    .map((issue) => issue.message);
}

describe("auth compatibility has one reason per rule", () => {
  for (const testCase of REJECTED) {
    it(`rejects ${testCase.auth} on ${testCase.backend}/${testCase.frontend.join("+")}/${testCase.orm ?? "-"}/${testCase.database ?? "-"}`, () => {
      const input = compatibilityInput(testCase);

      expect(getAuthIncompatibility(testCase.auth, testCase)).toBe(testCase.reason);
      expect(getDisabledReason(input, "auth", testCase.auth)).toBe(testCase.reason);
      expect(graphIssues(testCase)).toEqual([testCase.reason]);

      // The builder and every compatibility adjustment reset with the same reason.
      const analysis = analyzeStackCompatibility(input);
      const resetTo = testCase.frontend.includes("tanstack-start-solid") ? "Better Auth" : "None";
      expect(analysis.changes).toContainEqual({
        category: "auth",
        message: `Auth set to '${resetTo}' (${testCase.reason})`,
      });
      expect(analysis.adjustedStack?.auth).toBe(resetTo === "None" ? "none" : "better-auth");
    });
  }

  it("accepts the pairs the generator wires", () => {
    const accepted: Omit<AuthCase, "reason">[] = [
      { auth: "better-auth", backend: "hono", frontend: ["tanstack-router"], ...SQLITE },
      { auth: "clerk", backend: "self", frontend: ["next"], ...SQLITE },
      { auth: "clerk", ...CONVEX, frontend: ["react-router"] },
      { auth: "nextauth", backend: "self", frontend: ["next"], ...SQLITE },
      { auth: "supabase-auth", backend: "self", frontend: ["tanstack-start"], ...SQLITE },
      { auth: "passport", backend: "express", frontend: ["tanstack-router"], ...SQLITE },
      { auth: "better-auth", ...CONVEX, frontend: ["tanstack-router"] },
      { auth: "better-auth", backend: "self", frontend: ["tanstack-start-solid"], ...SQLITE },
    ];

    for (const testCase of accepted) {
      const pair = { ...testCase, reason: "" };
      expect(getAuthIncompatibility(testCase.auth, testCase)).toBeNull();
      expect(getDisabledReason(compatibilityInput(pair), "auth", testCase.auth)).toBeNull();
      expect(graphIssues(pair)).toEqual([]);
    }
  });

  it("the builder resets auth with the reason when a dependent choice changes", () => {
    const fullstackNext = compatibilityInput({
      auth: "clerk",
      backend: "self",
      frontend: ["next"],
      ...SQLITE,
      reason: "",
    });
    expect(analyzeStackCompatibility(fullstackNext).changes).not.toContainEqual(
      expect.objectContaining({ category: "auth" }),
    );

    const switchedToNuxt = { ...fullstackNext, webFrontend: ["nuxt"], backend: "self-nuxt" };
    const analysis = analyzeStackCompatibility(switchedToNuxt);
    expect(analysis.adjustedStack?.auth).toBe("none");
    expect(analysis.changes).toContainEqual({
      category: "auth",
      message: "Auth set to 'None' (Clerk isn't available for fullstack Nuxt yet)",
    });
  });

  it("judges only answered selections for partial input", () => {
    const partial = { partial: true };

    expect(getAuthIncompatibility("clerk", {}, partial)).toBeNull();
    expect(getAuthIncompatibility("go-better-auth", {}, partial)).toBeNull();
    expect(getAuthIncompatibility("clerk", { frontend: ["next"] }, partial)).toBeNull();
    expect(getAuthIncompatibility("clerk", { backend: "convex" }, partial)).toBeNull();
    expect(getAuthIncompatibility("clerk", { backend: "hono" }, partial)).toBe(
      "Clerk needs Convex, fullstack Next.js, or fullstack TanStack Start",
    );
    expect(getAuthIncompatibility("nextauth", { frontend: ["nuxt"] }, partial)).toBe(
      "Auth.js (NextAuth) needs fullstack Next.js",
    );
    expect(getAuthIncompatibility("better-auth", { frontend: ["vue"] }, partial)).toBe(
      "Auth client integrations are not yet wired for standalone Vue or Vanilla Vite frontends",
    );
    expect(getAuthIncompatibility("better-auth", { orm: "sequelize" }, partial)).toBe(
      "Better Auth has no Sequelize adapter",
    );
    // A complete stack treats a missing backend as not supporting the provider.
    expect(getAuthIncompatibility("clerk", { frontend: ["next"] })).toBe(
      "Clerk needs Convex, fullstack Next.js, or fullstack TanStack Start",
    );
  });
});
