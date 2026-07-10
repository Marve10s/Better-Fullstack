import type { BenchmarkSpec, CreationPath, Effort } from "./types";
import { runCommand } from "./agents/command";

export const HARNESS_VERSION = "2.0.0";
// Below this many scored runs a Wilson interval is too wide to be informative
// (e.g. at n=3, 3/3 → [44,100] overlaps 0/3 → [0,56]); the report suppresses it.
export const MIN_CI_RUNS = 8;

// ScaffBench Index: one rankable 0-100 composite, weighted toward the least
// saturated signal. Validation (does it actually run?) dominates; wired-libs and
// command discipline saturate fast on assisted paths so they are weighted down.
// Weights sum to 1.
export const SCAFFBENCH_INDEX_WEIGHTS = { validation: 0.6, wiredLibs: 0.25, discipline: 0.15 } as const;
export const VALIDATION_CACHE_VERSION = 3;

// Resolved once at the start of a run so every assisted invocation (canonical
// command, MCP config, doctor, CLI prompt) pins the SAME generator version that
// metadata records — otherwise a publish mid-run/resume would make later runs
// exercise a different package than `bfGeneratorVersion` claims. Falls back to
// "latest" when resolution fails (offline).
let RESOLVED_BF_VERSION = "latest";

export function setResolvedBfVersion(version: string) {
  RESOLVED_BF_VERSION = version;
}

export function resolvedBfVersion() {
  return RESOLVED_BF_VERSION;
}

export function bfSpec(pkg: "better-fullstack" | "create-better-fullstack") {
  return `${pkg}@${RESOLVED_BF_VERSION}`;
}

export async function resolveBfVersion() {
  const version = await tryCommandText(
    "npm",
    ["view", "create-better-fullstack@latest", "version"],
    process.cwd(),
  );
  return version && /^\d+\.\d+\.\d+/.test(version) ? version : "latest";
}
export const DEFAULT_EFFORTS: readonly Effort[] = ["default"];
// Prompt-only is the current methodology (V2.1+): the committed leaderboard is
// all `prompt`. The assisted paths (mcp opt-in, cli legacy) still work when passed
// explicitly via `--paths`, but are no longer part of a default run.
export const DEFAULT_PATHS: readonly CreationPath[] = ["prompt"];

// The creation paths a spec actually runs on, always intersected with the run's
// requested `--paths`. A supported spec runs on every requested path; a frontier
// spec (supportedByBetterFullstack === false) defaults to prompt-only so it is
// never scored as an MCP/CLI failure for a stack BFS cannot produce; an explicit
// `spec.paths` pins a custom subset.
export function resolveSpecPaths(
  spec: BenchmarkSpec,
  requested: readonly CreationPath[],
): CreationPath[] {
  const allowed: readonly CreationPath[] =
    spec.paths ?? (spec.supportedByBetterFullstack === false ? ["prompt"] : requested);
  return requested.filter((path) => allowed.includes(path));
}

// Generous generation budget: Opus 4.8 and other long-horizon agents can run
// many minutes on a hard scaffold task. A tight timeout cuts thorough runs off
// mid-work AND loses their cost/token accounting (the result JSON only lands on
// a clean exit) — so a longer-working agent must not be silently penalised.
// 90 min: at MAX reasoning effort the heaviest specs blow past even 60 min while
// still actively reasoning — ts-svelte-edge-orpc (a constraint-cascade spec) was
// SIGTERM'd at exactly 60 min mid-thinking (10/10 wired, not stuck). classifyOutcome
// scores a gen timeout as a real model-failure, so the ceiling must be generous
// enough that only a genuinely stuck agent ever hits it. The $25/spec budget cap
// is the real cost backstop. Note: this only takes effect for NEWLY spawned runs;
// a run already in flight keeps the value it started with.
export const CLAUDE_TIMEOUT_MS = 90 * 60_000;
export const VALIDATION_TIMEOUT_MS = 10 * 60_000;
export const FAST_TIMEOUT_MS = 60_000;
export const QUEUE_POLL_MS = 5_000;
export const STALE_LOCK_MS = 6 * 60 * 60_000;
export const CORE_SPEC_IDS = [
  "ai-search-workbench",
  "rust-leptos-axum",
  "python-ingestion-api",
  "go-realtime-api",
  "multi-dotnet-ops",
  // Expansion batch 1 (supported, all paths).
  "ts-svelte-edge-orpc",
  "dotnet-blazor-cqrs",
  "multi-ts-go-grpc",
  // Expansion batch 2 (new ecosystems, supported, all paths).
  "java-spring-jooq-keycloak",
  "elixir-broadway-absinthe",
  // Expansion batch 3 (mobile + frontier). Frontier specs run prompt-only via
  // spec.paths, but still live in the core suite.
  "react-native-expo",
  "frontier-polyglot-proto",
  "frontier-effect-eventsourcing",
] as const;

export const AI_SEARCH_STACK = {
  frontend: "tanstack-router",
  backend: "hono",
  runtime: "bun",
  api: "orpc",
  database: "postgres",
  orm: "drizzle",
  auth: "better-auth",
  ai: "vercel-ai",
  vectorDb: "qdrant",
  search: "opensearch",
  jobQueue: "inngest",
  logging: "pino",
  observability: "opentelemetry",
  stateManagement: "tanstack-store",
  forms: "tanstack-form",
  validation: "valibot",
  testing: "vitest-playwright",
  i18n: "paraglide",
  cssFramework: "tailwind",
  uiLibrary: "shadcn-ui",
} as const;

export const AI_SEARCH_ADDONS = ["turborepo", "biome", "devcontainer", "github-actions"] as const;

export const AI_SEARCH_FLAGS = [
  "--ecosystem",
  "typescript",
  "--frontend",
  "tanstack-router",
  "--backend",
  "hono",
  "--runtime",
  "bun",
  "--api",
  "orpc",
  "--database",
  "postgres",
  "--orm",
  "drizzle",
  "--db-setup",
  "none",
  "--auth",
  "better-auth",
  "--payments",
  "none",
  "--email",
  "none",
  "--file-upload",
  "none",
  "--logging",
  "pino",
  "--observability",
  "opentelemetry",
  "--feature-flags",
  "none",
  "--analytics",
  "none",
  "--effect",
  "none",
  "--state-management",
  "tanstack-store",
  "--forms",
  "tanstack-form",
  "--validation",
  "valibot",
  "--testing",
  "vitest-playwright",
  "--ai",
  "vercel-ai",
  "--realtime",
  "none",
  "--job-queue",
  "inngest",
  "--animation",
  "none",
  "--css-framework",
  "tailwind",
  "--ui-library",
  "shadcn-ui",
  "--cms",
  "none",
  "--caching",
  "none",
  "--rate-limit",
  "none",
  "--i18n",
  "paraglide",
  "--search",
  "opensearch",
  "--vector-db",
  "qdrant",
  "--file-storage",
  "none",
  "--web-deploy",
  "none",
  "--server-deploy",
  "none",
  "--addons",
  "turborepo",
  "biome",
  "devcontainer",
  "github-actions",
  "--examples",
  "none",
  "--ai-docs",
  "none",
  "--package-manager",
  "bun",
  "--shadcn-base",
  "radix",
  "--shadcn-style",
  "nova",
  "--shadcn-icon-library",
  "lucide",
  "--shadcn-color-theme",
  "neutral",
  "--shadcn-base-color",
  "neutral",
  "--shadcn-font",
  "inter",
  "--shadcn-radius",
  "default",
  "--no-install",
  "--no-git",
  "--disable-analytics",
] as const;

/*
 * ─────────────────────────────────────────────────────────────────────────────
 * FUTURE CANDIDATE SPECS — parked for later runs, NOT yet implemented.
 * ─────────────────────────────────────────────────────────────────────────────
 * Design rule learned from the 2026-07-04 DeepSeek MCP sweep: a *free* model
 * wired 100% of libs on 11/11 supported specs via MCP, so "supported + fancy
 * framework" SATURATES and does not separate models. Difficulty must come from
 * traps, restraint, build-correctness, or pure engineering — not from picking a
 * trendier stack. Calibration rule before adding any of these: run it on a WEAK
 * model (opencode/deepseek-v4-flash-free) AND a STRONG model (claude-opus-4-8);
 * keep it only if the weak model fails while the strong one passes. Both pass =
 * saturated, cut it.
 *
 * A) SUPPORTED + TRAPS (all paths mcp/cli/prompt). Value is the right-vs-plausible
 *    fork, NOT the app being fancy. Each needs canonicalFlags + expectedConfig +
 *    loose strictMarkers, and must be verified weak-fails/strong-passes.
 *    - calcom-scheduling   → like Cal.com. Next + tRPC + Prisma + Postgres +
 *      better-auth + Stripe. TRAPS: tRPC not oRPC; Prisma not Drizzle; `self`
 *      backend; payments faithfulness (don't over-add email/realtime).
 *    - twenty-crm          → like Twenty. React + NestJS + TypeORM + Postgres +
 *      GraphQL. TRAPS: TypeORM+better-auth has NO adapter → must pick auth:none;
 *      NestJS not Hono; GraphQL not REST.
 *    - novu-notifications  → like Novu. React + NestJS + MongoDB/Mongoose + Redis
 *      + job-queue. TRAPS: Mongo not Postgres; Mongoose not Drizzle/Prisma.
 *
 * B) FRONTIER / PROMPT-ONLY (supportedByBetterFullstack:false, paths:["prompt"]).
 *    Pure engineering, no scaffolder — the only lane that cleanly separates raw
 *    model capability. Loose single-token strictMarkers only.
 *    - frontier-vite-bundler       → replicate a Vite-like tool: pnpm-workspace
 *      monorepo, plugin API, HMR-over-WS dev server, Rollup-based build. (A build
 *      TOOL, not an app — BFS can never scaffold this.)
 *    - frontier-redis-clone        → in-memory store in Rust or Go, RESP protocol.
 *    - frontier-crdt-collab        → Excalidraw-like canvas SPA with CRDT/WS collab.
 *    - frontier-clickhouse-analytics → PostHog-like polyglot ingestion + ClickHouse
 *      (BFS has no ClickHouse → inherently frontier).
 *
 * REJECTED as saturating (do NOT re-propose): convex-collab, astro-docs-site,
 * qwik-storefront, umami-analytics — trivial to author, every model passes, zero
 * discrimination. "Fancy framework" is not "hard spec".
 *
 * Also worth exploring as difficulty multipliers on existing/new specs, not new
 * specs themselves: RESTRAINT (penalize over-scaffolding) and the DISCOVERY lane
 * (naturalPrompt + acceptanceSets — same combo, vague brief, model must infer).
 * ─────────────────────────────────────────────────────────────────────────────
 */

export async function tryCommandText(command: string, args: readonly string[], cwd: string) {
  try {
    const result = await runCommand(command, args, cwd, FAST_TIMEOUT_MS);
    if (result.exitCode !== 0) return undefined;
    return result.stdout.trim();
  } catch {
    return undefined;
  }
}

