import { describe, expect, it } from "bun:test";
import * as fc from "fast-check";

import { analyzeStackCompatibility, evaluateCompatibility } from "../src/compatibility";
import { DEFAULT_STACK_SELECTION } from "../src/stack-translation";

/**
 * Property-based tests for the compatibility engine.
 *
 * These assert *structural* and *determinism* invariants that hold for the real
 * engine across the whole input space. They deliberately do NOT assert:
 *   - single-pass idempotence,
 *   - convergence of repeated `analyzeStackCompatibility` to a fixpoint, or
 *   - "re-evaluation reports no remaining issues" (constraint-satisfaction),
 * because the current engine genuinely violates all three for a small but
 * reachable fraction of inputs (see the file-level note at the bottom). Adding
 * those would produce flaky/failing tests rather than guarding a true invariant.
 */

type Stack = typeof DEFAULT_STACK_SELECTION;

// Value pools drawn from the real schema enums in src/schemas.ts. `backend` uses
// the expanded `self-*` runtime values the engine actually branches on (the Zod
// enum collapses these to "self"), so it is listed explicitly.
const ECOSYSTEMS = [
  "typescript",
  "react-native",
  "rust",
  "python",
  "go",
  "java",
  "elixir",
  "dotnet",
] as const;

const WEB_FRONTENDS = [
  "tanstack-router",
  "react-router",
  "react-vite",
  "tanstack-start",
  "next",
  "vinext",
  "nuxt",
  "svelte",
  "solid",
  "solid-start",
  "astro",
  "qwik",
  "angular",
  "fresh",
  "none",
] as const;

const NATIVE_FRONTENDS = ["native-bare", "native-uniwind", "native-unistyles", "none"] as const;

const BACKENDS = [
  "hono",
  "express",
  "fastify",
  "elysia",
  "nestjs",
  "adonisjs",
  "nitro",
  "convex",
  "self-next",
  "self-vinext",
  "self-tanstack-start",
  "self-astro",
  "self-nuxt",
  "self-svelte",
  "self-solid-start",
  "none",
] as const;

const RUNTIMES = ["bun", "node", "workers", "none"] as const;
const DATABASES = ["none", "sqlite", "postgres", "mysql", "mongodb", "redis"] as const;
const ORMS = [
  "drizzle",
  "prisma",
  "mongoose",
  "typeorm",
  "kysely",
  "mikroorm",
  "sequelize",
  "none",
] as const;
const DB_SETUPS = [
  "turso",
  "neon",
  "prisma-postgres",
  "planetscale",
  "mongodb-atlas",
  "supabase",
  "d1",
  "docker",
  "none",
] as const;
const APIS = ["trpc", "orpc", "ts-rest", "none"] as const;
const AUTHS = ["better-auth", "better-auth-organizations", "clerk", "nextauth", "none"] as const;
const PAYMENTS = ["polar", "stripe", "dodo", "none"] as const;
const UI_LIBRARIES = [
  "shadcn-ui",
  "shadcn-svelte",
  "daisyui",
  "radix-ui",
  "headless-ui",
  "park-ui",
  "nextui",
  "mui",
  "antd",
  "none",
] as const;
const CSS_FRAMEWORKS = ["tailwind", "none"] as const;
const EXAMPLES = ["ai", "chat-sdk", "tanstack-showcase", "none"] as const;
const AI_SDKS = ["vercel-ai", "tanstack-ai", "none"] as const;
const ASTRO_INTEGRATIONS = ["react", "vue", "svelte", "solid", "none"] as const;
const WEB_DEPLOYS = ["cloudflare", "vercel", "netlify", "render", "none"] as const;
const SERVER_DEPLOYS = ["cloudflare", "fly", "railway", "none"] as const;
const APP_PLATFORMS = ["pwa", "tauri", "turborepo", "none"] as const;

const oneOrTwo = <T>(values: readonly T[]) =>
  fc.uniqueArray(fc.constantFrom(...values), { minLength: 1, maxLength: 2 });

/**
 * A bounded, structurally-valid stack arbitrary: it starts from the CLI default
 * config and overrides a curated set of high-impact fields with values sampled
 * from the real enum pools. The structural/determinism invariants under test are
 * domain-independent, so this generator stays broad on purpose to maximise the
 * input space exercised.
 */
const stackArb: fc.Arbitrary<Stack> = fc
  .record({
    ecosystem: fc.constantFrom(...ECOSYSTEMS),
    webFrontend: oneOrTwo(WEB_FRONTENDS),
    nativeFrontend: oneOrTwo(NATIVE_FRONTENDS),
    astroIntegration: fc.constantFrom(...ASTRO_INTEGRATIONS),
    backend: fc.constantFrom(...BACKENDS),
    runtime: fc.constantFrom(...RUNTIMES),
    database: fc.constantFrom(...DATABASES),
    orm: fc.constantFrom(...ORMS),
    dbSetup: fc.constantFrom(...DB_SETUPS),
    api: fc.constantFrom(...APIS),
    auth: fc.constantFrom(...AUTHS),
    payments: fc.constantFrom(...PAYMENTS),
    uiLibrary: fc.constantFrom(...UI_LIBRARIES),
    cssFramework: fc.constantFrom(...CSS_FRAMEWORKS),
    examples: oneOrTwo(EXAMPLES),
    aiSdk: fc.constantFrom(...AI_SDKS),
    webDeploy: fc.constantFrom(...WEB_DEPLOYS),
    serverDeploy: fc.constantFrom(...SERVER_DEPLOYS),
    appPlatforms: oneOrTwo(APP_PLATFORMS),
  })
  .map((overrides) => ({ ...DEFAULT_STACK_SELECTION, ...overrides, yolo: "false" }));

const RUNS = { numRuns: 500 } as const;

describe("compatibility engine — property invariants", () => {
  it("is deterministic: analyzeStackCompatibility(x) === analyzeStackCompatibility(x)", () => {
    fc.assert(
      fc.property(stackArb, (stack) => {
        expect(analyzeStackCompatibility(stack)).toEqual(analyzeStackCompatibility(stack));
      }),
      RUNS,
    );
  });

  it("is deterministic: evaluateCompatibility(x) === evaluateCompatibility(x)", () => {
    fc.assert(
      fc.property(stackArb, (stack) => {
        expect(evaluateCompatibility(stack)).toEqual(evaluateCompatibility(stack));
      }),
      RUNS,
    );
  });

  it("reports changes iff it produced an adjusted stack", () => {
    fc.assert(
      fc.property(stackArb, (stack) => {
        const result = analyzeStackCompatibility(stack);
        expect(result.adjustedStack === null).toBe(result.changes.length === 0);
      }),
      RUNS,
    );
  });

  it("never adds or drops keys and never mutates ecosystem or projectName", () => {
    fc.assert(
      fc.property(stackArb, (stack) => {
        const { adjustedStack } = analyzeStackCompatibility(stack);
        if (adjustedStack === null) return;
        expect(Object.keys(adjustedStack).sort()).toEqual(Object.keys(stack).sort());
        expect(adjustedStack.ecosystem).toBe(stack.ecosystem);
        expect(adjustedStack.projectName).toBe(stack.projectName);
      }),
      RUNS,
    );
  });

  it("emits only well-formed change entries (non-empty category and message)", () => {
    fc.assert(
      fc.property(stackArb, (stack) => {
        for (const change of analyzeStackCompatibility(stack).changes) {
          expect(typeof change.category).toBe("string");
          expect(change.category.length).toBeGreaterThan(0);
          expect(typeof change.message).toBe("string");
          expect(change.message.length).toBeGreaterThan(0);
        }
      }),
      RUNS,
    );
  });

  it("emits only well-formed evaluation issues (code, message, category present)", () => {
    fc.assert(
      fc.property(stackArb, (stack) => {
        for (const issue of evaluateCompatibility(stack).issues) {
          expect(typeof issue.code).toBe("string");
          expect(issue.code.length).toBeGreaterThan(0);
          expect(typeof issue.message).toBe("string");
          expect(issue.message.length).toBeGreaterThan(0);
          expect(issue.category).toBeDefined();
        }
      }),
      RUNS,
    );
  });

  it("short-circuits entirely in YOLO mode (no adjustments, no changes, no notes)", () => {
    fc.assert(
      fc.property(stackArb, (stack) => {
        const result = analyzeStackCompatibility({ ...stack, yolo: "true" });
        expect(result.adjustedStack).toBeNull();
        expect(result.changes).toEqual([]);
        expect(result.notes).toEqual({});
      }),
      RUNS,
    );
  });
});

/**
 * NOTE — invariants intentionally NOT asserted, with evidence:
 *
 * 1. Single-pass idempotence (`apply(apply(x)) deepEquals apply(x)`) is FALSE.
 *    Example: dbSetup="d1" sets runtime="workers"+backend="hono" in the database
 *    phase, but the runtime phase (which fixes serverDeploy for Workers) already
 *    ran, so a second pass flips serverDeploy "none" -> "cloudflare".
 *
 * 2. Convergence to a fixpoint is FALSE for a small (~1-2%) but reachable set of
 *    inputs. Some rules set `changed = true` while re-assigning an
 *    already-correct value (e.g. the Elixir phoenix-live-view ->
 *    elixirRealtime="live-view-streams" rule fires on every pass), so
 *    `adjustedStack` is perpetually non-null even though the value is stable.
 *
 * 3. Constraint-satisfaction ("adjusted output re-evaluates clean") is FALSE.
 *    analyzeStackCompatibility does not scrub cross-ecosystem leftover fields,
 *    while evaluateCompatibility checks every ecosystem's fields unconditionally,
 *    so the adjusted output still reports issues the analyzer never touches.
 *
 * Only determinism, from the original candidate list, holds; it is covered above.
 */
