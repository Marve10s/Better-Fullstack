import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { cp, mkdir, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

export type CreationPath = "mcp" | "cli" | "prompt";
export type Effort = "default" | "low" | "medium" | "high" | "xhigh" | "max";
export type PromptStyle = "explicit" | "natural";
export type CommandStatus = "pass" | "fail" | "unknown" | "skipped";
export type FailureTag =
  | "claude-error"
  | "claude-timeout"
  | "command-discipline"
  | "doctor-failed"
  | "format-failed"
  | "install-failed"
  | "lint-failed"
  | "project-not-found"
  | "route-failed"
  | "stack-mismatch"
  | "test-failed"
  | "tool-violation"
  | "typecheck-failed"
  | "validation-failed"
  | "build-failed"
  | "budget-exhausted"
  | "toolchain-missing"
  | "stack-unwired"
  | "validation-deferred";

export type RunOutcome = "success" | "model-failure" | "infra-inconclusive";

export type StrictMarker = {
  id: string;
  deps?: readonly string[];
  source?: readonly string[];
  text?: readonly string[];
  files?: readonly string[];
  forbiddenDeps?: readonly string[];
  forbiddenText?: readonly string[];
};

export type BenchmarkSpec = {
  id: string;
  title: string;
  lane: "core" | "extended";
  family:
    | "typescript"
    | "rust"
    | "python"
    | "go"
    | "dotnet"
    | "java"
    | "elixir"
    | "react-native"
    | "multi-ecosystem";
  /** Whether Better-Fullstack can scaffold this stack. `false` marks a FRONTIER
   * spec (beyond BFS's option space): it defaults to prompt-only so the agent is
   * never scored as an MCP/CLI failure for a stack the tool cannot produce. */
  supportedByBetterFullstack: boolean;
  /** Creation paths this spec runs on, intersected with the run's `--paths`.
   * Defaults to all requested paths for a supported spec, or `["prompt"]` for a
   * frontier spec. Set explicitly to pin a spec to a subset. */
  paths?: readonly CreationPath[];
  requirements: readonly string[];
  naturalPrompt: string;
  rightLibraryNotes: readonly string[];
  canonicalFlags: readonly string[];
  expectedConfig?: Record<string, string | readonly string[]>;
  expectedParts?: readonly string[];
  expectedAddons?: readonly string[];
  strictMarkers: readonly StrictMarker[];
  /** Discovery-lane scoring: each capability maps to the set of libraries that
   * acceptably satisfy it (dep keys or source/text patterns). In the natural
   * prompt style a capability counts as satisfied if ANY accepted library is
   * wired, so a reasonable alternative (pgvector for semantic search) is not
   * penalised the way the strict canonical markers would. */
  acceptanceSets?: Record<string, readonly string[]>;
  validationProfile: {
    packageManager?: "bun";
    native?: readonly ("cargo" | "dotnet" | "go" | "python" | "java" | "elixir")[];
    qualityGate?: boolean;
    doctorCheck?: boolean;
    routeCheckCandidate?: boolean;
  };
};

export type StepResult = {
  command: string;
  exitCode: number | null;
  timedOut: boolean;
  /** True when the command binary itself could not be spawned (ENOENT) — an
   * environment problem, distinct from a child process that ran and exited
   * non-zero (e.g. a generated `bun run build` whose script is broken). */
  spawnError?: boolean;
  /**
   * How to read this step when scoring:
   * - "ran" (or absent): a real command executed — judge it by exitCode.
   * - "skip": a check that SHOULD have run but no tool was configured/detected.
   *   It is NOT a pass — it disqualifies a Full pass. Carries exitCode null so it
   *   can never be mistaken for a green (=== 0) run (the old `skippedStep` set
   *   exitCode 0, which silently passed missing lint/test — the Finding-1 bug).
   * - "na": the check is legitimately not applicable (e.g. a scaffold with
   *   genuinely zero tests). Excluded from scoring — neither pass nor fail.
   */
  status?: "ran" | "skip" | "na";
  durationMs: number;
  stdoutTail: string;
  stderrTail: string;
};

type CommandResult = StepResult & {
  stdout: string;
  stderr: string;
};

type CommandDisciplineCheck = {
  id: string;
  status: CommandStatus;
  detail: string;
};

type ToolCompliance = {
  score: number;
  total: number;
  checks: CommandDisciplineCheck[];
};

type ProjectValidation = {
  projectExists: boolean;
  /** Project generation finished, but validation is intentionally queued for a
   * later phase. Deferred validation is excluded from the pass-rate denominator
   * until the runner validates the archived project. */
  deferred?: boolean;
  sourceHash?: string;
  cacheKey?: string;
  cacheHit?: boolean;
  steps: Record<string, StepResult | undefined>;
  install?: StepResult;
  build?: StepResult;
  checkTypes?: StepResult;
  lint?: StepResult;
  format?: StepResult;
  test?: StepResult;
  doctor?: StepResult;
  route?: StepResult;
};

type StackScore = {
  matched: number;
  total: number;
  percent: number;
  misses: string[];
};

export type RunResult = {
  id: string;
  specId: string;
  specTitle: string;
  model: string;
  effort: Effort;
  effectiveReasoning?: string;
  path: CreationPath;
  trial: number;
  promptStyle: PromptStyle;
  runDir: string;
  projectName: string;
  projectDir: string | null;
  claude: {
    exitCode: number | null;
    timedOut: boolean;
    durationMs: number;
    resultDurationMs?: number;
    outputTokens?: number;
    totalCostUsd?: number;
    sessionId?: string;
    terminalReason?: string;
  };
  validation: ProjectValidation;
  /** Primary "right libs" signal: libraries actually wired in the generated tree. */
  stackScore: StackScore;
  /** Assisted-path diagnostic: whether bts.jsonc echoes the requested stack. */
  generatorFaithfulness?: StackScore;
  /** Discovery-lane (natural prompt) capability-satisfaction score. */
  acceptanceScore?: StackScore;
  toolCompliance: ToolCompliance;
  failureTags: FailureTag[];
};

export type ScaffbenchOptions = {
  model: string;
  efforts: Effort[];
  paths: CreationPath[];
  specs: string[];
  repeats: number;
  outDir: string;
  maxBudgetUsd: string;
  skipValidation: boolean;
  generateOnly: boolean;
  validateExisting: boolean;
  qualityGate: boolean;
  doctorCheck: boolean;
  routeCheck: boolean;
  promptStyle: PromptStyle;
  listSpecs: boolean;
  writeMatrixOnly: boolean;
};

type SummaryAggregate = {
  key: string;
  specId?: string;
  model: string;
  effort: Effort;
  effectiveReasoning?: string;
  path: CreationPath;
  runs: number;
  scoredRuns: number;
  inconclusiveCount: number;
  passCount: number;
  /** Headline pass rate = CORE pass (install/build/typecheck/native compile).
   * Advisory polish checks do not affect it. */
  passRate: number;
  /** Stricter advisory tier (core + lint/format/test/doctor/route green).
   * A separate signal — it never demotes passRate, so a formatting failure is a
   * quality metric, not a brokenness verdict. */
  qualityPassCount: number;
  qualityPassRate: number;
  passCi95: { low: number; high: number };
  /** True when scoredRuns >= MIN_CI_RUNS, so the Wilson interval is worth showing. */
  ciReportable: boolean;
  /** Distinct specs contributing to this cell. */
  specCount: number;
  /** Mean of per-spec pass rates — a macro-average that treats each spec as one
   * unit instead of pooling heterogeneous-difficulty specs into one binomial. */
  macroPassRate: number;
  /** pass@k: specs solved on at least one of their repeats. */
  passAnySpecs: number;
  /** pass^k: specs solved on every one of their repeats (consistency). */
  passAllSpecs: number;
  stackPercent: number;
  faithfulnessPercent?: number;
  acceptancePercent?: number;
  commandDisciplinePercent: number;
  /** Single 0-100 composite (the rankable headline), weighted toward the least
   * saturated signal — see SCAFFBENCH_INDEX_WEIGHTS. */
  index: number;
  avgDurationMs: number;
  medianDurationMs: number;
  p95DurationMs: number;
  avgOutputTokens?: number;
  avgCostUsd?: number;
  failureTags: Record<string, number>;
};

export type ScaffbenchSummary = {
  harnessVersion: string;
  generatedAt: string;
  options: Omit<ScaffbenchOptions, "listSpecs" | "writeMatrixOnly">;
  metadata: Record<string, unknown>;
  specs: BenchmarkSpec[];
  aggregates: {
    bySpecCell: SummaryAggregate[];
    leaderboard: SummaryAggregate[];
  };
  results: RunResult[];
};

type ProjectIndex = {
  dependencies: Set<string>;
  files: Set<string>;
  packageText: string;
  sourceText: string;
  configText: string;
  allText: string;
};

const HARNESS_VERSION = "2.0.0";
// Below this many scored runs a Wilson interval is too wide to be informative
// (e.g. at n=3, 3/3 → [44,100] overlaps 0/3 → [0,56]); the report suppresses it.
const MIN_CI_RUNS = 8;

// ScaffBench Index: one rankable 0-100 composite, weighted toward the least
// saturated signal. Validation (does it actually run?) dominates; wired-libs and
// command discipline saturate fast on assisted paths so they are weighted down.
// Weights sum to 1.
const SCAFFBENCH_INDEX_WEIGHTS = { validation: 0.6, wiredLibs: 0.25, discipline: 0.15 } as const;
const VALIDATION_CACHE_VERSION = 1;

// Resolved once at the start of a run so every assisted invocation (canonical
// command, MCP config, doctor, CLI prompt) pins the SAME generator version that
// metadata records — otherwise a publish mid-run/resume would make later runs
// exercise a different package than `bfGeneratorVersion` claims. Falls back to
// "latest" when resolution fails (offline).
let RESOLVED_BF_VERSION = "latest";

function bfSpec(pkg: "better-fullstack" | "create-better-fullstack") {
  return `${pkg}@${RESOLVED_BF_VERSION}`;
}

async function resolveBfVersion() {
  const version = await tryCommandText(
    "npm",
    ["view", "create-better-fullstack@latest", "version"],
    process.cwd(),
  );
  return version && /^\d+\.\d+\.\d+/.test(version) ? version : "latest";
}
const DEFAULT_EFFORTS: readonly Effort[] = ["default"];
const DEFAULT_PATHS: readonly CreationPath[] = ["mcp", "cli", "prompt"];

// The creation paths a spec actually runs on, always intersected with the run's
// requested `--paths`. A supported spec runs on every requested path; a frontier
// spec (supportedByBetterFullstack === false) defaults to prompt-only so it is
// never scored as an MCP/CLI failure for a stack BFS cannot produce; an explicit
// `spec.paths` pins a custom subset.
function resolveSpecPaths(
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
const CLAUDE_TIMEOUT_MS = 90 * 60_000;
const VALIDATION_TIMEOUT_MS = 10 * 60_000;
const FAST_TIMEOUT_MS = 60_000;
const QUEUE_POLL_MS = 5_000;
const STALE_LOCK_MS = 6 * 60 * 60_000;
const CORE_SPEC_IDS = [
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

const AI_SEARCH_STACK = {
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

const AI_SEARCH_ADDONS = ["turborepo", "biome", "devcontainer", "github-actions"] as const;

const AI_SEARCH_FLAGS = [
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
export const SCAFFBENCH_2_SPECS: readonly BenchmarkSpec[] = [
  {
    id: "ai-search-workbench",
    title: "AI search workbench with separate semantic and full-text search",
    lane: "core",
    family: "typescript",
    supportedByBetterFullstack: true,
    requirements: [
      "Create a TypeScript monorepo for an AI support/search workbench.",
      "Use a TanStack Router web app styled with Tailwind and shadcn/ui.",
      "Use a Hono backend on Bun.",
      "Use oRPC for the app API.",
      "Use PostgreSQL with Drizzle for relational app data.",
      "Use Better Auth for accounts.",
      "Use the Vercel AI SDK for AI features.",
      "Use Qdrant specifically for semantic vector search over embeddings.",
      "Use OpenSearch specifically for full-text document/admin search.",
      "Use Inngest for background indexing jobs.",
      "Use Pino logging and OpenTelemetry instrumentation.",
      "Use TanStack Store, TanStack Form, Valibot, Vitest + Playwright, and Paraglide.",
      "Include Turborepo, Biome, DevContainer, and GitHub Actions CI output.",
      "Do not add payments, email, realtime, CMS, file upload, file storage, feature flags, or deploy targets.",
      "Do not install dependencies, do not initialize git, and do not start a dev server.",
    ],
    naturalPrompt:
      "Build a production-grade AI support search starter. It needs account auth, relational app data, background indexing, semantic search for embeddings, full-text/admin search for documents, observability, tests, i18n, and CI. Keep it deploy-target neutral and do not include commerce/email/storage extras.",
    rightLibraryNotes: [
      "Qdrant must be used for semantic vector search.",
      "OpenSearch must be used for full-text document/admin search.",
      "Inngest must be used for background indexing jobs.",
      "oRPC must be used for the app API.",
    ],
    canonicalFlags: AI_SEARCH_FLAGS,
    expectedConfig: AI_SEARCH_STACK,
    expectedAddons: AI_SEARCH_ADDONS,
    strictMarkers: [
      { id: "frontend:tanstack-router", deps: ["@tanstack/react-router"] },
      { id: "backend:hono", deps: ["hono"] },
      { id: "api:orpc", deps: ["@orpc/server"], source: ["@orpc/"] },
      { id: "database:postgres+drizzle", deps: ["drizzle-orm"], source: ["drizzle-orm"] },
      { id: "auth:better-auth", deps: ["better-auth"], source: ["better-auth"] },
      { id: "ai:vercel-ai", deps: ["ai"] },
      {
        id: "vectorDb:qdrant",
        deps: ["@qdrant/js-client-rest"],
        source: ["@qdrant/js-client-rest"],
      },
      {
        id: "search:opensearch",
        deps: ["@opensearch-project/opensearch"],
        source: ["@opensearch-project/opensearch"],
      },
      { id: "jobQueue:inngest", deps: ["inngest"], source: ["inngest"] },
      { id: "logging:pino", deps: ["pino"], source: ["pino"] },
      { id: "observability:opentelemetry", deps: ["@opentelemetry/api"] },
      { id: "state:tanstack-store", deps: ["@tanstack/store"] },
      { id: "forms:tanstack-form", deps: ["@tanstack/react-form"] },
      { id: "validation:valibot", deps: ["valibot"] },
      { id: "testing:vitest-playwright", deps: ["vitest", "@playwright/test"] },
      {
        id: "i18n:paraglide",
        deps: ["@inlang/paraglide-js"],
        files: ["apps/web/project.inlang/settings.json"],
      },
      { id: "addon:biome", deps: ["@biomejs/biome"], files: ["biome.json"] },
      { id: "addon:devcontainer", files: [".devcontainer/devcontainer.json"] },
      { id: "addon:github-actions", files: [".github/workflows/ci.yml"] },
      { id: "forbidden:payments", forbiddenDeps: ["stripe", "@stripe/stripe-js", "polar-sh"] },
      { id: "forbidden:email", forbiddenDeps: ["resend", "nodemailer", "@react-email/components"] },
    ],
    acceptanceSets: {
      "web-framework": ["@tanstack/react-router", "next", "react-router", "@remix-run", "vite"],
      backend: ["hono", "express", "fastify", "elysia", "@nestjs/core"],
      "relational-db": ["drizzle-orm", "@prisma/client", "kysely", "typeorm", "sequelize"],
      auth: ["better-auth", "lucia", "@clerk", "next-auth", "@auth/", "@workos-inc"],
      ai: ["ai", "@ai-sdk", "openai", "@anthropic-ai", "langchain"],
      "semantic-search": [
        "@qdrant/js-client-rest",
        "pgvector",
        "weaviate-ts-client",
        "@pinecone-database/pinecone",
        "chromadb",
        "@zilliz/milvus2-sdk-node",
      ],
      "full-text-search": [
        "@opensearch-project/opensearch",
        "@elastic/elasticsearch",
        "meilisearch",
        "typesense",
        "algoliasearch",
      ],
      "background-jobs": [
        "inngest",
        "bullmq",
        "@trigger.dev",
        "graphile-worker",
        "pg-boss",
        "bee-queue",
      ],
      observability: ["@opentelemetry/api", "pino", "winston", "@sentry", "@logtail"],
      testing: ["vitest", "jest", "@playwright/test", "cypress"],
      i18n: ["@inlang/paraglide-js", "next-intl", "i18next", "react-i18next", "lingui"],
      ci: [".github/workflows", ".gitlab-ci.yml", ".circleci"],
    },
    validationProfile: {
      packageManager: "bun",
      qualityGate: true,
      doctorCheck: true,
      routeCheckCandidate: true,
    },
  },
  {
    id: "rust-leptos-axum",
    title: "Rust Axum API with a Leptos WASM frontend and typed service libraries",
    lane: "core",
    family: "rust",
    supportedByBetterFullstack: true,
    requirements: [
      "Create a Rust project with Axum as the backend web framework.",
      "Use Leptos specifically for the WASM frontend; do not replace it with Dioxus or React.",
      "Use PostgreSQL with SQLx.",
      "Use Tonic for a typed API boundary.",
      "Include Clap CLI support, tracing, anyhow/thiserror, Moka caching, OAuth2 auth, Lapin jobs, OpenTelemetry, and Askama templates.",
      "Include serde, uuid, chrono, reqwest, config, utoipa, validator, and tokio-test libraries.",
      "Do not install dependencies, do not initialize git, and do not start a dev server.",
    ],
    naturalPrompt:
      "Build a Rust starter for an internal product console. It should have an Axum server, a Rust WASM frontend, Postgres access, typed service/API boundaries, CLI/admin utilities, tracing, auth, cache, jobs, and template rendering. Choose the right Rust libraries rather than swapping in web defaults.",
    rightLibraryNotes: [
      "Leptos is required for the Rust WASM frontend.",
      "Axum is required for the server.",
      "SQLx is required for database access.",
      "Tonic is required for typed RPC/API contracts.",
    ],
    canonicalFlags: [
      "--ecosystem",
      "rust",
      "--database",
      "postgres",
      "--rust-web-framework",
      "axum",
      "--rust-frontend",
      "leptos",
      "--rust-orm",
      "sqlx",
      "--rust-api",
      "tonic",
      "--rust-cli",
      "clap",
      "--rust-libraries",
      "serde",
      "uuid",
      "chrono",
      "reqwest",
      "config",
      "utoipa",
      "validator",
      "tokio-test",
      "--rust-logging",
      "tracing",
      "--rust-error-handling",
      "anyhow-thiserror",
      "--rust-caching",
      "moka",
      "--rust-auth",
      "oauth2",
      "--rust-realtime",
      "none",
      "--rust-message-queue",
      "lapin",
      "--rust-observability",
      "opentelemetry",
      "--rust-templating",
      "askama",
      "--email",
      "none",
      "--observability",
      "none",
      "--caching",
      "none",
      "--search",
      "none",
      "--ai-docs",
      "none",
      "--no-install",
      "--no-git",
      "--disable-analytics",
    ],
    expectedConfig: {
      ecosystem: "rust",
      database: "postgres",
      rustWebFramework: "axum",
      rustFrontend: "leptos",
      rustOrm: "sqlx",
      rustApi: "tonic",
      rustCli: "clap",
      rustLibraries: [
        "serde",
        "uuid",
        "chrono",
        "reqwest",
        "config",
        "utoipa",
        "validator",
        "tokio-test",
      ],
      rustLogging: "tracing",
      rustErrorHandling: "anyhow-thiserror",
      rustCaching: "moka",
      rustAuth: "oauth2",
      rustMessageQueue: "lapin",
      rustObservability: "opentelemetry",
      rustTemplating: "askama",
    },
    strictMarkers: [
      { id: "rust:axum", text: ["axum"] },
      {
        id: "frontend:leptos",
        text: ["leptos", "leptos_router"],
        files: ["crates/client/Cargo.toml"],
      },
      { id: "orm:sqlx", text: ["sqlx"] },
      { id: "api:tonic", text: ["tonic"] },
      { id: "cli:clap", text: ["clap"] },
      { id: "logging:tracing", text: ["tracing"] },
      { id: "cache:moka", text: ["moka"] },
      { id: "auth:oauth2", text: ["oauth2"] },
      { id: "jobs:lapin", text: ["lapin"] },
      { id: "observability:opentelemetry", text: ["opentelemetry"] },
      { id: "templating:askama", text: ["askama"] },
      { id: "forbidden:dioxus", forbiddenText: ["dioxus-router", "Dioxus.toml"] },
    ],
    validationProfile: { native: ["cargo"] },
  },
  {
    id: "python-ingestion-api",
    title: "Python FastAPI ingestion API with AI, queues, realtime, and quality gates",
    lane: "core",
    family: "python",
    supportedByBetterFullstack: true,
    requirements: [
      "Create a Python API project using FastAPI.",
      "Use SQLModel for database models and Pydantic for validation.",
      "Use LangGraph and OpenAI SDK for AI workflows.",
      "Use JWT auth, Celery task queues, WebSockets realtime, Redis caching, OpenTelemetry, Typer, Rich, Ruff, Pytest, and Hypothesis.",
      "Do not choose Django REST Framework or Django Ninja because this is not a Django project.",
      "Do not install dependencies, do not initialize git, and do not start a dev server.",
    ],
    naturalPrompt:
      "Build a Python ingestion API starter for AI document processing. It needs FastAPI, SQL-backed models, strict validation, AI workflow libraries, queued workers, realtime job updates, Redis cache, tracing, CLI tools, and real test/quality tooling. Avoid Django-only API libraries.",
    rightLibraryNotes: [
      "FastAPI is required; Django-specific API packages are forbidden.",
      "SQLModel is required for the database layer.",
      "LangGraph plus OpenAI SDK are required for AI workflow scaffolding.",
      "Celery is required for background ingestion jobs.",
    ],
    canonicalFlags: [
      "--ecosystem",
      "python",
      "--database",
      "postgres",
      "--python-web-framework",
      "fastapi",
      "--python-orm",
      "sqlmodel",
      "--python-validation",
      "pydantic",
      "--python-ai",
      "langgraph",
      "openai-sdk",
      "--python-auth",
      "jwt",
      "--python-api",
      "none",
      "--python-task-queue",
      "celery",
      "--python-graphql",
      "none",
      "--python-quality",
      "ruff",
      "--python-testing",
      "pytest",
      "hypothesis",
      "--python-caching",
      "redis",
      "--python-realtime",
      "websockets",
      "--python-observability",
      "opentelemetry",
      "--python-cli",
      "typer",
      "rich",
      "--email",
      "none",
      "--observability",
      "none",
      "--caching",
      "none",
      "--search",
      "none",
      "--ai-docs",
      "none",
      "--no-install",
      "--no-git",
      "--disable-analytics",
    ],
    expectedConfig: {
      ecosystem: "python",
      database: "postgres",
      pythonWebFramework: "fastapi",
      pythonOrm: "sqlmodel",
      pythonValidation: "pydantic",
      pythonAi: ["langgraph", "openai-sdk"],
      pythonAuth: "jwt",
      pythonApi: "none",
      pythonTaskQueue: "celery",
      pythonQuality: "ruff",
      pythonTesting: ["pytest", "hypothesis"],
      pythonCaching: "redis",
      pythonRealtime: "websockets",
      pythonObservability: "opentelemetry",
      pythonCli: ["typer", "rich"],
    },
    strictMarkers: [
      { id: "backend:fastapi", text: ["fastapi"] },
      { id: "orm:sqlmodel", text: ["sqlmodel"] },
      { id: "validation:pydantic", text: ["pydantic"] },
      { id: "ai:langgraph", text: ["langgraph"] },
      { id: "ai:openai-sdk", text: ["openai"] },
      { id: "auth:jwt", text: ["jwt"] },
      { id: "jobs:celery", text: ["celery"] },
      { id: "quality:ruff", text: ["ruff"] },
      { id: "testing:pytest", text: ["pytest"] },
      { id: "testing:hypothesis", text: ["hypothesis"] },
      { id: "realtime:websockets", text: ["websockets"] },
      { id: "cli:typer+rich", text: ["typer", "rich"] },
      { id: "forbidden:django-api", forbiddenText: ["django-rest-framework", "django-ninja"] },
    ],
    validationProfile: { native: ["python"] },
  },
  {
    id: "go-realtime-api",
    title: "Go realtime API with Chi, Ent, gRPC, NATS, Redis, and OpenTelemetry",
    lane: "core",
    family: "go",
    supportedByBetterFullstack: true,
    requirements: [
      "Create a Go API project using Chi, not Gin/Echo/Fiber.",
      "Use PostgreSQL with Ent.",
      "Use gRPC for typed service contracts.",
      "Use Cobra CLI tooling, Zap logging, JWT auth, Testify + GoMock tests, Gorilla WebSocket realtime, NATS messaging, Redis caching, Viper config, and OpenTelemetry.",
      "Do not install dependencies, do not initialize git, and do not start a dev server.",
    ],
    naturalPrompt:
      "Build a Go backend starter for a realtime admin API. It needs a lightweight router, Ent/Postgres models, typed gRPC service contracts, CLI/admin commands, structured logging, auth, websocket updates, event messaging, Redis cache, configuration, tracing, and test doubles.",
    rightLibraryNotes: [
      "Chi is required as the web framework.",
      "Ent is required for the data layer.",
      "gRPC-Go is required for typed service contracts.",
      "NATS and Gorilla WebSocket are required for messaging and realtime updates.",
    ],
    canonicalFlags: [
      "--ecosystem",
      "go",
      "--database",
      "postgres",
      "--go-web-framework",
      "chi",
      "--go-orm",
      "ent",
      "--go-api",
      "grpc-go",
      "--go-cli",
      "cobra",
      "--go-logging",
      "zap",
      "--go-auth",
      "jwt",
      "--go-testing",
      "testify",
      "gomock",
      "--go-realtime",
      "gorilla-websocket",
      "--go-message-queue",
      "nats",
      "--go-caching",
      "redis",
      "--go-config",
      "viper",
      "--go-observability",
      "opentelemetry",
      "--auth",
      "none",
      "--email",
      "none",
      "--observability",
      "none",
      "--caching",
      "none",
      "--search",
      "none",
      "--ai-docs",
      "none",
      "--no-install",
      "--no-git",
      "--disable-analytics",
    ],
    expectedConfig: {
      ecosystem: "go",
      database: "postgres",
      goWebFramework: "chi",
      goOrm: "ent",
      goApi: "grpc-go",
      goCli: "cobra",
      goLogging: "zap",
      goAuth: "jwt",
      goTesting: ["testify", "gomock"],
      goRealtime: "gorilla-websocket",
      goMessageQueue: "nats",
      goCaching: "redis",
      goConfig: "viper",
      goObservability: "opentelemetry",
    },
    strictMarkers: [
      { id: "backend:chi", text: ["github.com/go-chi/chi"] },
      { id: "orm:ent", text: ["entgo.io/ent"], files: ["ent/schema/user.go"] },
      { id: "api:grpc-go", text: ["google.golang.org/grpc"] },
      { id: "cli:cobra", text: ["github.com/spf13/cobra"] },
      { id: "logging:zap", text: ["go.uber.org/zap"] },
      { id: "auth:jwt", text: ["github.com/golang-jwt/jwt"] },
      { id: "testing:testify+gomock", text: ["github.com/stretchr/testify", "go.uber.org/mock"] },
      { id: "realtime:gorilla-websocket", text: ["github.com/gorilla/websocket"] },
      { id: "queue:nats", text: ["github.com/nats-io/nats.go"] },
      { id: "caching:redis", text: ["github.com/redis/go-redis"] },
      { id: "config:viper", text: ["github.com/spf13/viper"] },
      { id: "observability:opentelemetry", text: ["go.opentelemetry.io/otel"] },
      { id: "forbidden:gin", forbiddenText: ["github.com/gin-gonic/gin"] },
    ],
    validationProfile: { native: ["go"] },
  },
  {
    id: "multi-dotnet-ops",
    title: "Multi-ecosystem ops portal with TypeScript frontend and .NET Minimal API backend",
    lane: "core",
    family: "multi-ecosystem",
    supportedByBetterFullstack: true,
    requirements: [
      "Create one multi-ecosystem project graph.",
      "Use a Next.js TypeScript frontend with Tailwind and shadcn/ui.",
      "Use an ASP.NET Minimal API backend.",
      "Use EF Core, ASP.NET Identity, Minimal API endpoints, xUnit, Testcontainers for .NET, Serilog, SignalR, FluentValidation, Hangfire, memory cache, and Docker output.",
      "Use PostgreSQL as the shared database.",
      "Include Turborepo, Biome, and GitHub Actions.",
      "Do not install dependencies, do not initialize git, and do not start a dev server.",
    ],
    naturalPrompt:
      "Build a multi-ecosystem ops portal starter: a TypeScript web frontend and a .NET backend. It needs Postgres-backed identity, API endpoints, validation, background jobs, realtime notifications, observability/logging, tests, containers, and CI. Use the project graph instead of forcing everything into one ecosystem.",
    rightLibraryNotes: [
      "The frontend must be TypeScript Next.js.",
      "The backend must be ASP.NET Minimal API.",
      "EF Core and ASP.NET Identity are required.",
      "Hangfire and SignalR are required for jobs and realtime updates.",
    ],
    canonicalFlags: [
      "--part",
      "frontend:typescript:next",
      "--part",
      "frontend.css:typescript:tailwind",
      "--part",
      "frontend.ui:typescript:shadcn-ui",
      "--part",
      "backend:dotnet:aspnet-minimal",
      "--part",
      "backend.orm:dotnet:ef-core",
      "--part",
      "backend.auth:dotnet:aspnet-identity",
      "--part",
      "backend.api:dotnet:minimal-api",
      "--part",
      "backend.testing:dotnet:xunit",
      "--part",
      "backend.testing:dotnet:testcontainers-dotnet",
      "--part",
      "backend.observability:dotnet:serilog",
      "--part",
      "backend.realtime:dotnet:signalr",
      "--part",
      "backend.validation:dotnet:fluentvalidation",
      "--part",
      "backend.jobQueue:dotnet:hangfire",
      "--part",
      "backend.caching:dotnet:memory-cache",
      "--part",
      "backend.deploy:dotnet:docker",
      "--part",
      "database:universal:postgres",
      "--addons",
      "turborepo",
      "biome",
      "github-actions",
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
    ],
    expectedParts: [
      "frontend:typescript:next",
      "frontend.css:typescript:tailwind",
      "frontend.ui:typescript:shadcn-ui",
      "backend:dotnet:aspnet-minimal",
      "backend.orm:dotnet:ef-core",
      "backend.auth:dotnet:aspnet-identity",
      "backend.api:dotnet:minimal-api",
      "backend.testing:dotnet:xunit",
      "backend.testing:dotnet:testcontainers-dotnet",
      "backend.observability:dotnet:serilog",
      "backend.realtime:dotnet:signalr",
      "backend.validation:dotnet:fluentvalidation",
      "backend.jobQueue:dotnet:hangfire",
      "backend.caching:dotnet:memory-cache",
      "backend.deploy:dotnet:docker",
      "database:universal:postgres",
    ],
    expectedAddons: ["turborepo", "biome", "github-actions"],
    strictMarkers: [
      { id: "frontend:next", deps: ["next"] },
      { id: "frontend:tailwind", deps: ["tailwindcss"] },
      { id: "frontend:shadcn", files: ["apps/web/components.json"] },
      { id: "backend:aspnet-minimal", files: ["apps/server/Program.cs"], text: ["MapGet"] },
      { id: "orm:ef-core", text: ["Microsoft.EntityFrameworkCore"] },
      { id: "auth:aspnet-identity", text: ["Microsoft.AspNetCore.Identity"] },
      { id: "testing:xunit", text: ["xunit"] },
      { id: "testing:testcontainers", text: ["Testcontainers"] },
      { id: "logging:serilog", text: ["Serilog"] },
      { id: "realtime:signalr", text: ["SignalR"] },
      { id: "validation:fluentvalidation", text: ["FluentValidation"] },
      { id: "jobs:hangfire", text: ["Hangfire"] },
      { id: "addon:github-actions", files: [".github/workflows/ci.yml"] },
    ],
    validationProfile: {
      packageManager: "bun",
      native: ["dotnet"],
      qualityGate: true,
      doctorCheck: true,
    },
  },
  {
    id: "ts-minimal-restraint",
    title: "Minimal React + Tailwind SPA with no backend, data, or auth (restraint test)",
    lane: "extended",
    family: "typescript",
    supportedByBetterFullstack: true,
    requirements: [
      "Create a minimal TypeScript React single-page app built with Vite and Tailwind.",
      "It is a static marketing/landing page only.",
      "Do NOT add a backend, database, ORM, API layer, auth, payments, email, file storage, jobs, CMS, or analytics.",
      "Include Turborepo tooling.",
      "Do not install dependencies, do not initialize git, and do not start a dev server.",
    ],
    naturalPrompt:
      "Build a small static marketing landing page as a React single-page app with Tailwind. It has no accounts, no database, and no server — just a clean front end. Keep it lean and do not add backend or data tooling.",
    rightLibraryNotes: [
      "This is a frontend-only starter: do not add a backend, database, ORM, API, auth, payments, or email.",
    ],
    canonicalFlags: [
      "--ecosystem", "typescript",
      "--frontend", "react-vite",
      "--backend", "none",
      "--runtime", "none",
      "--api", "none",
      "--database", "none",
      "--orm", "none",
      "--db-setup", "none",
      "--auth", "none",
      "--payments", "none",
      "--email", "none",
      "--file-upload", "none",
      "--logging", "none",
      "--observability", "none",
      "--feature-flags", "none",
      "--analytics", "none",
      "--effect", "none",
      "--state-management", "none",
      "--forms", "none",
      "--validation", "none",
      "--testing", "none",
      "--ai", "none",
      "--realtime", "none",
      "--job-queue", "none",
      "--animation", "none",
      "--css-framework", "tailwind",
      "--ui-library", "none",
      "--cms", "none",
      "--caching", "none",
      "--rate-limit", "none",
      "--i18n", "none",
      "--search", "none",
      "--vector-db", "none",
      "--file-storage", "none",
      "--web-deploy", "none",
      "--server-deploy", "none",
      "--addons", "turborepo",
      "--examples", "none",
      "--ai-docs", "none",
      "--package-manager", "bun",
      "--no-install", "--no-git", "--disable-analytics",
    ],
    expectedConfig: {
      ecosystem: "typescript",
      frontend: ["react-vite"],
      backend: "none",
      database: "none",
      orm: "none",
      api: "none",
      auth: "none",
      cssFramework: "tailwind",
    },
    expectedAddons: ["turborepo"],
    strictMarkers: [
      { id: "frontend:react-vite", deps: ["react", "vite"] },
      { id: "css:tailwind", deps: ["tailwindcss"] },
      {
        id: "forbidden:backend",
        forbiddenDeps: ["hono", "express", "fastify", "elysia", "@nestjs/core"],
      },
      {
        id: "forbidden:database",
        forbiddenDeps: ["drizzle-orm", "@prisma/client", "kysely", "typeorm", "mongoose"],
      },
      {
        id: "forbidden:auth",
        forbiddenDeps: ["better-auth", "lucia", "next-auth", "@clerk/clerk-react"],
      },
      { id: "forbidden:payments", forbiddenDeps: ["stripe", "@stripe/stripe-js", "polar-sh"] },
      { id: "forbidden:email", forbiddenDeps: ["resend", "nodemailer", "@react-email/components"] },
      { id: "forbidden:api", forbiddenDeps: ["@orpc/server", "@trpc/server", "graphql"] },
    ],
    validationProfile: { packageManager: "bun" },
  },
  {
    id: "ts-svelte-edge-orpc",
    title: "SvelteKit edge app on Cloudflare Workers with Hono + oRPC and D1",
    lane: "core",
    family: "typescript",
    supportedByBetterFullstack: true,
    requirements: [
      "Create a TypeScript monorepo for an edge-deployed app.",
      "Use a SvelteKit web frontend styled with Tailwind.",
      "Use a Hono backend running on the Cloudflare Workers runtime.",
      "Use oRPC for the app API (tRPC is not compatible with a Svelte frontend).",
      "Use SQLite via Cloudflare D1 with Drizzle as the ORM.",
      "Use Better Auth for accounts and Valibot for validation.",
      "Deploy both the web app and the server to Cloudflare.",
      "Do not add payments, email, realtime, search, vector DB, jobs, CMS, file storage/upload, analytics, or i18n.",
      "Do not install dependencies, do not initialize git, and do not start a dev server.",
    ],
    naturalPrompt:
      "Build an edge-first starter that runs on Cloudflare. It needs a Svelte web app, a lightweight server on the Workers runtime, a type-safe app API, an edge SQL database with a typed ORM, account auth, and validation. Pick libraries that actually run on Workers and deploy to Cloudflare.",
    rightLibraryNotes: [
      "oRPC is required for the API because tRPC does not support a Svelte frontend.",
      "The Workers runtime requires the Hono backend.",
      "Cloudflare D1 is required for the SQLite database, and Cloudflare for deploys.",
      "Better Auth must use a Workers-compatible ORM (Drizzle).",
    ],
    canonicalFlags: [
      "--ecosystem", "typescript",
      "--frontend", "svelte",
      "--backend", "hono",
      "--runtime", "workers",
      "--api", "orpc",
      "--database", "sqlite",
      "--orm", "drizzle",
      "--db-setup", "d1",
      "--auth", "better-auth",
      "--validation", "valibot",
      "--css-framework", "tailwind",
      "--ui-library", "none",
      "--web-deploy", "cloudflare",
      "--server-deploy", "cloudflare",
      "--payments", "none",
      "--email", "none",
      "--file-upload", "none",
      "--file-storage", "none",
      "--logging", "none",
      "--observability", "none",
      "--feature-flags", "none",
      "--analytics", "none",
      "--effect", "none",
      "--state-management", "none",
      "--forms", "none",
      "--testing", "none",
      "--ai", "none",
      "--realtime", "none",
      "--job-queue", "none",
      "--animation", "none",
      "--cms", "none",
      "--caching", "none",
      "--rate-limit", "none",
      "--i18n", "none",
      "--search", "none",
      "--vector-db", "none",
      "--addons", "turborepo",
      "--examples", "none",
      "--ai-docs", "none",
      "--package-manager", "bun",
      "--no-install", "--no-git", "--disable-analytics",
    ],
    expectedConfig: {
      ecosystem: "typescript",
      frontend: ["svelte"],
      backend: "hono",
      runtime: "workers",
      api: "orpc",
      database: "sqlite",
      orm: "drizzle",
      dbSetup: "d1",
      auth: "better-auth",
      validation: "valibot",
      cssFramework: "tailwind",
      webDeploy: "cloudflare",
      serverDeploy: "cloudflare",
    },
    expectedAddons: ["turborepo"],
    strictMarkers: [
      { id: "frontend:svelte", deps: ["@sveltejs/kit"] },
      { id: "backend:hono", deps: ["hono"] },
      { id: "api:orpc", deps: ["@orpc/server"], source: ["@orpc/"] },
      { id: "runtime:workers", deps: ["wrangler"] },
      { id: "orm:drizzle", deps: ["drizzle-orm"], source: ["drizzle-orm"] },
      { id: "auth:better-auth", deps: ["better-auth"], source: ["better-auth"] },
      { id: "validation:valibot", deps: ["valibot"] },
      { id: "css:tailwind", deps: ["tailwindcss"] },
      { id: "forbidden:trpc", forbiddenDeps: ["@trpc/server", "@trpc/client"] },
      { id: "forbidden:next", forbiddenDeps: ["next"] },
    ],
    validationProfile: { packageManager: "bun" },
  },
  {
    id: "dotnet-blazor-cqrs",
    title: ".NET Blazor app with Dapper, Duende IdentityServer, and HotChocolate GraphQL",
    lane: "core",
    family: "dotnet",
    supportedByBetterFullstack: true,
    requirements: [
      "Create a .NET project using ASP.NET Blazor (not Minimal API or MVC).",
      "Use Dapper for data access (not EF Core).",
      "Use Duende IdentityServer for auth (not ASP.NET Identity).",
      "Use HotChocolate for a GraphQL API (not Minimal API or gRPC).",
      "Use PostgreSQL.",
      "Use NUnit with Moq and Testcontainers for .NET (not xUnit).",
      "Use Quartz.NET for background jobs (not Hangfire).",
      "Use SignalR for realtime.",
      "Use OpenTelemetry, NLog, and health checks for observability (not Serilog).",
      "Use FluentValidation, Redis caching, and Docker deploy output.",
      "Do not install dependencies, do not initialize git, and do not start a dev server.",
    ],
    naturalPrompt:
      "Build a .NET starter for an internal operations console. It needs a C# web UI, lightweight data access, a dedicated identity server, a GraphQL API, Postgres, background scheduling, realtime updates, validation, caching, observability, and container output. Choose the right .NET libraries rather than the framework defaults.",
    rightLibraryNotes: [
      "Blazor is required for the web framework.",
      "Dapper is required for data access (not EF Core).",
      "Duende IdentityServer is required for auth (not ASP.NET Identity).",
      "HotChocolate GraphQL is required (not Minimal API), with NUnit and Quartz.NET.",
    ],
    canonicalFlags: [
      "--ecosystem", "dotnet",
      "--database", "postgres",
      "--dotnet-web-framework", "aspnet-blazor",
      "--dotnet-orm", "dapper",
      "--dotnet-auth", "duende-identityserver",
      "--dotnet-api", "graphql-hotchocolate",
      "--dotnet-testing", "nunit", "moq", "testcontainers-dotnet",
      "--dotnet-job-queue", "quartz-net",
      "--dotnet-realtime", "signalr",
      "--dotnet-observability", "opentelemetry-dotnet", "nlog", "health-checks",
      "--dotnet-validation", "fluentvalidation",
      "--dotnet-caching", "redis",
      "--dotnet-deploy", "docker",
      "--auth", "none",
      "--email", "none",
      "--observability", "none",
      "--caching", "none",
      "--search", "none",
      "--ai-docs", "claude-md",
      "--no-install", "--no-git", "--disable-analytics",
    ],
    expectedConfig: {
      ecosystem: "dotnet",
      database: "postgres",
      dotnetWebFramework: "aspnet-blazor",
      dotnetOrm: "dapper",
      dotnetAuth: "duende-identityserver",
      dotnetApi: "graphql-hotchocolate",
      dotnetTesting: ["nunit", "moq", "testcontainers-dotnet"],
      dotnetJobQueue: "quartz-net",
      dotnetRealtime: "signalr",
      dotnetObservability: ["opentelemetry-dotnet", "nlog", "health-checks"],
      dotnetValidation: "fluentvalidation",
      dotnetCaching: "redis",
      dotnetDeploy: "docker",
    },
    strictMarkers: [
      { id: "dotnet:blazor", text: ["RazorComponents"] },
      { id: "orm:dapper", text: ["Dapper"] },
      { id: "auth:duende", text: ["Duende"] },
      { id: "api:hotchocolate", text: ["HotChocolate"] },
      { id: "testing:nunit", text: ["NUnit"] },
      { id: "testing:moq", text: ["Moq"] },
      { id: "testing:testcontainers", text: ["Testcontainers"] },
      { id: "jobs:quartz", text: ["Quartz"] },
      { id: "realtime:signalr", text: ["SignalR"] },
      { id: "validation:fluentvalidation", text: ["FluentValidation"] },
      { id: "observability:nlog", text: ["NLog"] },
      { id: "forbidden:hangfire", forbiddenText: ["Hangfire"] },
      { id: "forbidden:serilog", forbiddenText: ["Serilog"] },
    ],
    validationProfile: { native: ["dotnet"] },
  },
  {
    id: "multi-ts-go-grpc",
    title: "Multi-ecosystem app: Nuxt (Vue) frontend with a Go Chi + gRPC backend",
    lane: "core",
    family: "multi-ecosystem",
    supportedByBetterFullstack: true,
    requirements: [
      "Create one multi-ecosystem project graph.",
      "Use a Nuxt (Vue) TypeScript frontend with Tailwind.",
      "Use a Go backend with the Chi router (not Gin/Echo/Fiber).",
      "Use sqlc for data access (not GORM or Ent).",
      "Use gRPC-Go for typed service contracts.",
      "Use goth for auth, Centrifuge for realtime, Watermill for messaging, Ristretto for caching, koanf for config, and zerolog for logging.",
      "Use OpenTelemetry and Testify + GoMock.",
      "Use PostgreSQL as the shared database.",
      "Do not install dependencies, do not initialize git, and do not start a dev server.",
    ],
    naturalPrompt:
      "Build a multi-ecosystem starter: a Vue/Nuxt web frontend and a Go backend. The Go side needs a lightweight router, type-safe SQL, typed gRPC contracts, social auth, scalable realtime, a messaging abstraction, an in-process cache, config management, structured logging, tracing, and test doubles. Use the project graph instead of one ecosystem.",
    rightLibraryNotes: [
      "The frontend must be TypeScript Nuxt (Vue).",
      "The Go backend must use Chi, sqlc, and gRPC-Go.",
      "Centrifuge and Watermill are required for realtime and messaging.",
      "Ristretto, koanf, and zerolog are required (not Redis, Viper, zap).",
    ],
    canonicalFlags: [
      "--part", "frontend:typescript:nuxt",
      "--part", "frontend.css:typescript:tailwind",
      "--part", "backend:go:chi",
      "--part", "backend.orm:go:sqlc",
      "--part", "backend.api:go:grpc-go",
      "--part", "backend.auth:go:goth",
      "--part", "backend.logging:go:zerolog",
      "--part", "backend.realtime:go:centrifuge",
      "--part", "backend.jobQueue:go:watermill",
      "--part", "backend.caching:go:ristretto",
      "--part", "backend.config:go:koanf",
      "--part", "backend.observability:go:opentelemetry",
      "--part", "backend.testing:go:testify",
      "--part", "backend.testing:go:gomock",
      "--part", "database:universal:postgres",
      "--addons", "turborepo",
      "--ai-docs", "none",
      "--package-manager", "bun",
      "--no-install", "--no-git", "--disable-analytics",
    ],
    expectedParts: [
      "frontend:typescript:nuxt",
      "frontend.css:typescript:tailwind",
      "backend:go:chi",
      "backend.orm:go:sqlc",
      "backend.api:go:grpc-go",
      "backend.auth:go:goth",
      "backend.logging:go:zerolog",
      "backend.realtime:go:centrifuge",
      "backend.jobQueue:go:watermill",
      "backend.caching:go:ristretto",
      "backend.config:go:koanf",
      "backend.observability:go:opentelemetry",
      "backend.testing:go:testify",
      "backend.testing:go:gomock",
      "database:universal:postgres",
    ],
    expectedAddons: ["turborepo"],
    strictMarkers: [
      { id: "frontend:nuxt", deps: ["nuxt"] },
      { id: "frontend:tailwind", deps: ["tailwindcss"] },
      { id: "backend:chi", text: ["github.com/go-chi/chi"] },
      { id: "orm:sqlc", files: ["apps/server/sqlc.yaml"] },
      { id: "api:grpc-go", text: ["google.golang.org/grpc"] },
      { id: "auth:goth", text: ["github.com/markbates/goth"] },
      { id: "realtime:centrifuge", text: ["github.com/centrifugal/centrifuge"] },
      { id: "queue:watermill", text: ["github.com/ThreeDotsLabs/watermill"] },
      { id: "caching:ristretto", text: ["github.com/dgraph-io/ristretto"] },
      { id: "config:koanf", text: ["github.com/knadh/koanf"] },
      { id: "logging:zerolog", text: ["github.com/rs/zerolog"] },
      { id: "observability:opentelemetry", text: ["go.opentelemetry.io/otel"] },
      { id: "testing:testify+gomock", text: ["github.com/stretchr/testify", "go.uber.org/mock"] },
      { id: "forbidden:gin", forbiddenText: ["github.com/gin-gonic/gin"] },
      { id: "forbidden:gorm", forbiddenText: ["gorm.io/gorm"] },
      { id: "forbidden:viper", forbiddenText: ["github.com/spf13/viper"] },
    ],
    validationProfile: { packageManager: "bun", native: ["go"] },
  },
  {
    id: "java-spring-jooq-keycloak",
    title: "Java Spring Boot API with jOOQ, Keycloak, GraphQL, and property/architecture tests",
    lane: "core",
    family: "java",
    supportedByBetterFullstack: true,
    requirements: [
      "Create a Java project using Spring Boot with the Maven build tool.",
      "Use jOOQ for data access (NOT Spring Data JPA).",
      "Use Keycloak for auth (NOT Spring Security).",
      "Use Spring for GraphQL for the API and Logback for logging.",
      "Use PostgreSQL.",
      "Include MapStruct, Resilience4j, Spring for Kafka, Spring Batch, Micrometer Prometheus, Caffeine, springdoc-openapi, OpenTelemetry, Spring Validation, and Spring Actuator.",
      "Include JUnit 5, Mockito, Testcontainers, AssertJ, REST Assured, WireMock, Awaitility, ArchUnit, and jqwik for testing.",
      "Do not install dependencies, do not initialize git, and do not start a dev server.",
    ],
    naturalPrompt:
      "Build a Java Spring Boot starter for an event-driven service. It needs Postgres data access with a type-safe SQL layer, a dedicated identity server for auth, a GraphQL API, fault tolerance, event streaming, batch jobs, metrics, mapping, API docs, and tracing — plus a serious test stack with mocks, containers, HTTP stubs, architecture rules, and property-based tests. Choose the right Java libraries rather than the Spring defaults.",
    rightLibraryNotes: [
      "jOOQ is required for data access; Spring Data JPA is not used.",
      "Keycloak is required for auth; Spring Security is not the chosen provider.",
      "Spring for GraphQL is required for the API.",
      "ArchUnit and jqwik are required (architecture + property-based testing).",
    ],
    canonicalFlags: [
      "--ecosystem", "java",
      "--database", "postgres",
      "--java-web-framework", "spring-boot",
      "--java-build-tool", "maven",
      "--java-orm", "jooq",
      "--java-auth", "keycloak",
      "--java-api", "spring-graphql",
      "--java-logging", "logback",
      "--java-libraries",
      "mapstruct", "resilience4j", "spring-kafka", "spring-batch", "micrometer-prometheus",
      "caffeine", "springdoc-openapi", "opentelemetry-java", "spring-validation", "spring-actuator",
      "--java-testing-libraries",
      "junit5", "mockito", "testcontainers", "assertj", "rest-assured", "wiremock", "awaitility",
      "archunit", "jqwik",
      "--auth", "none",
      "--email", "none",
      "--observability", "none",
      "--caching", "none",
      "--search", "none",
      "--ai-docs", "claude-md",
      "--no-install", "--no-git", "--disable-analytics",
    ],
    expectedConfig: {
      ecosystem: "java",
      database: "postgres",
      javaWebFramework: "spring-boot",
      javaBuildTool: "maven",
      javaOrm: "jooq",
      javaAuth: "keycloak",
      javaApi: "spring-graphql",
      javaLogging: "logback",
      javaLibraries: [
        "mapstruct", "resilience4j", "spring-kafka", "spring-batch", "micrometer-prometheus",
        "caffeine", "springdoc-openapi", "opentelemetry-java", "spring-validation", "spring-actuator",
      ],
      javaTestingLibraries: [
        "junit5", "mockito", "testcontainers", "assertj", "rest-assured", "wiremock", "awaitility",
        "archunit", "jqwik",
      ],
    },
    strictMarkers: [
      { id: "backend:spring-boot", text: ["spring-boot-starter-parent"] },
      { id: "build:maven", files: ["pom.xml"] },
      { id: "orm:jooq", text: ["jooq"] },
      { id: "auth:keycloak", text: ["keycloak"] },
      { id: "api:spring-graphql", text: ["spring-boot-starter-graphql"] },
      { id: "lib:mapstruct", text: ["mapstruct"] },
      { id: "lib:resilience4j", text: ["resilience4j"] },
      { id: "lib:spring-kafka", text: ["spring-kafka"] },
      { id: "lib:spring-batch", text: ["spring-boot-starter-batch"] },
      { id: "lib:micrometer-prometheus", text: ["micrometer-registry-prometheus"] },
      { id: "testing:archunit", text: ["archunit"] },
      { id: "testing:jqwik", text: ["jqwik"] },
      { id: "testing:testcontainers", text: ["testcontainers"] },
      { id: "forbidden:jpa", forbiddenText: ["spring-boot-starter-data-jpa"] },
    ],
    validationProfile: { native: ["java"] },
  },
  {
    id: "elixir-broadway-absinthe",
    title: "Elixir Phoenix LiveView app with Absinthe, Broadway, Oban, and Nx",
    lane: "core",
    family: "elixir",
    supportedByBetterFullstack: true,
    requirements: [
      "Create an Elixir project using Phoenix LiveView (not plain Phoenix).",
      "Use Ecto SQL with PostgreSQL and Ecto changesets for validation.",
      "Use Guardian for auth (not phx.gen.auth or Ueberauth).",
      "Use Absinthe for a GraphQL API.",
      "Include Broadway and Nx as libraries.",
      "Use Phoenix Presence for realtime, Oban for jobs, Finch as the HTTP client, Jason for JSON, Swoosh for email, Nebulex for caching, and PromEx for observability.",
      "Use Wallaby for testing, Dialyxir for code quality, and Fly for deploy output.",
      "Do not install dependencies, do not initialize git, and do not start a dev server.",
    ],
    naturalPrompt:
      "Build an Elixir Phoenix starter for a realtime data-ingestion app. It needs server-rendered live views, Postgres via Ecto, a dedicated JWT auth library, a GraphQL API, data pipelines, numerical/ML support, presence tracking, durable background jobs, a pooled HTTP client, caching, Prometheus metrics, browser-based tests, static analysis, and a deploy target. Pick the right BEAM libraries rather than the framework defaults.",
    rightLibraryNotes: [
      "Phoenix LiveView is required (not plain Phoenix).",
      "Guardian is required for auth; Absinthe is required for the GraphQL API.",
      "Broadway and Oban are required for pipelines and jobs.",
      "Presence, Finch, Nebulex, PromEx, Wallaby, and Dialyxir are the required choices.",
    ],
    canonicalFlags: [
      "--ecosystem", "elixir",
      "--database", "postgres",
      "--elixir-web-framework", "phoenix-live-view",
      "--elixir-orm", "ecto-sql",
      "--elixir-auth", "guardian",
      "--elixir-api", "absinthe",
      "--elixir-libraries", "broadway", "nx",
      "--elixir-realtime", "presence",
      "--elixir-jobs", "oban",
      "--elixir-validation", "ecto-changesets",
      "--elixir-http", "finch",
      "--elixir-json", "jason",
      "--elixir-email", "swoosh",
      "--elixir-caching", "nebulex",
      "--elixir-observability", "prom_ex",
      "--elixir-testing", "wallaby",
      "--elixir-quality", "dialyxir",
      "--elixir-deploy", "fly",
      "--auth", "none",
      "--email", "none",
      "--observability", "none",
      "--caching", "none",
      "--search", "none",
      "--ai-docs", "claude-md",
      "--no-install", "--no-git", "--disable-analytics",
    ],
    expectedConfig: {
      ecosystem: "elixir",
      database: "postgres",
      elixirWebFramework: "phoenix-live-view",
      elixirOrm: "ecto-sql",
      elixirAuth: "guardian",
      elixirApi: "absinthe",
      elixirLibraries: ["broadway", "nx"],
      elixirRealtime: "presence",
      elixirJobs: "oban",
      elixirValidation: "ecto-changesets",
      elixirHttp: "finch",
      elixirJson: "jason",
      elixirEmail: "swoosh",
      elixirCaching: "nebulex",
      elixirObservability: "prom_ex",
      elixirTesting: "wallaby",
      elixirQuality: "dialyxir",
      elixirDeploy: "fly",
    },
    strictMarkers: [
      { id: "web:phoenix-live-view", text: ["phoenix_live_view"] },
      { id: "orm:ecto-sql", text: ["ecto_sql"] },
      { id: "auth:guardian", text: [":guardian"] },
      { id: "api:absinthe", text: ["absinthe"] },
      { id: "lib:broadway", text: ["broadway"] },
      { id: "lib:nx", text: ["{:nx,"] },
      { id: "jobs:oban", text: [":oban"] },
      { id: "http:finch", text: [":finch"] },
      { id: "caching:nebulex", text: ["nebulex"] },
      { id: "observability:prom_ex", text: ["prom_ex"] },
      { id: "testing:wallaby", text: ["wallaby"] },
      { id: "quality:dialyxir", text: ["dialyxir"] },
      { id: "forbidden:credo", forbiddenText: [":credo"] },
    ],
    validationProfile: { native: ["elixir"] },
  },
  {
    id: "react-native-expo",
    title: "React Native Expo app with Expo Router, Uniwind, MMKV, and Maestro + RNTL",
    lane: "core",
    family: "react-native",
    supportedByBetterFullstack: true,
    requirements: [
      "Create a React Native (Expo) mobile app.",
      "Use Expo Router for navigation and Uniwind (Tailwind-style) styling.",
      "Use MMKV for on-device storage.",
      "Use Maestro plus React Native Testing Library for testing.",
      "Use Expo Notifications for push, Expo Updates for OTA, and Expo Linking for deep linking.",
      "This is a mobile-only project: no backend, database, or auth.",
      "Do not install dependencies, do not initialize git, and do not start a dev server.",
    ],
    naturalPrompt:
      "Build a React Native mobile starter on Expo. It needs file-based navigation, Tailwind-style styling, fast on-device key-value storage, push notifications, over-the-air updates, deep linking, and both end-to-end and unit testing. It is a standalone mobile app with no server, database, or accounts.",
    rightLibraryNotes: [
      "Expo Router is required for navigation.",
      "Uniwind is the required styling approach (native-uniwind frontend).",
      "MMKV is required for storage; Maestro + RNTL for testing.",
      "Expo Notifications / Updates / Linking are the required push / OTA / deep-linking choices.",
    ],
    canonicalFlags: [
      "--ecosystem", "react-native",
      "--frontend", "native-uniwind",
      "--auth", "none",
      "--mobile-navigation", "expo-router",
      "--mobile-ui", "uniwind",
      "--mobile-storage", "mmkv",
      "--mobile-testing", "maestro-react-native-testing-library",
      "--mobile-push", "expo-notifications",
      "--mobile-ota", "expo-updates",
      "--mobile-deep-linking", "expo-linking",
      "--ai-docs", "claude-md",
      "--package-manager", "bun",
      "--no-install", "--no-git", "--disable-analytics",
    ],
    expectedConfig: {
      ecosystem: "react-native",
      frontend: ["native-uniwind"],
      mobileNavigation: "expo-router",
      mobileUI: "uniwind",
      mobileStorage: "mmkv",
      mobileTesting: "maestro-react-native-testing-library",
      mobilePush: "expo-notifications",
      mobileOTA: "expo-updates",
      mobileDeepLinking: "expo-linking",
    },
    strictMarkers: [
      { id: "nav:expo-router", deps: ["expo-router"] },
      { id: "styling:uniwind", deps: ["uniwind"] },
      { id: "storage:mmkv", deps: ["react-native-mmkv"] },
      { id: "push:expo-notifications", deps: ["expo-notifications"] },
      { id: "ota:expo-updates", deps: ["expo-updates"] },
      { id: "deep-linking:expo-linking", deps: ["expo-linking"] },
      { id: "testing:rntl", deps: ["@testing-library/react-native"] },
      { id: "testing:maestro", files: ["apps/native/.maestro/home.yaml"] },
    ],
    validationProfile: { packageManager: "bun" },
  },
  {
    id: "frontier-polyglot-proto",
    title: "Frontier: polyglot monorepo — shared protobuf across a Rust gRPC service, a Go gateway, and a TS client",
    lane: "core",
    family: "multi-ecosystem",
    // Beyond Better-Fullstack's option space (its graph allows one backend), so
    // this runs prompt-only — the agent builds it from scratch with no scaffolder.
    supportedByBetterFullstack: false,
    paths: ["prompt"],
    requirements: [
      "Create one monorepo with a single shared Protocol Buffers (proto3) service contract.",
      "Implement the core service in Rust using Tonic for gRPC.",
      "Implement an edge gateway in Go that speaks gRPC to the Rust service and exposes HTTP/JSON.",
      "Implement a TypeScript web client generated from the same proto contract.",
      "Wire codegen so all three consume the one .proto definition; provide build scripts per package.",
      "Do not install dependencies, do not initialize git, and do not start a dev server.",
    ],
    naturalPrompt:
      "Build a polyglot monorepo around a single service contract: a Rust gRPC core service, a Go gateway that bridges gRPC to HTTP/JSON, and a TypeScript client — all generated from one shared Protocol Buffers definition. Set up the codegen and per-package builds so the three stay in sync.",
    rightLibraryNotes: [
      "A single shared proto3 contract must drive all three languages.",
      "Rust uses Tonic for the gRPC service; Go uses grpc-go for the gateway.",
      "The TypeScript client must be generated from the same proto.",
    ],
    canonicalFlags: [],
    strictMarkers: [
      // Frontier markers are loose, single-token diagnostics (text arrays AND
      // together, so multi-token would over-constrain a from-scratch project).
      { id: "proto:proto3", text: ["proto3"] },
      { id: "rust:tonic", text: ["tonic"] },
      { id: "go:grpc", text: ["google.golang.org/grpc"] },
      { id: "ts:protobuf", text: ["protobuf"] },
    ],
    validationProfile: { packageManager: "bun", native: ["cargo", "go"] },
  },
  {
    id: "frontier-effect-eventsourcing",
    title: "Frontier: TypeScript Effect service with event-sourcing/CQRS and tRPC-over-WebSocket subscriptions",
    lane: "core",
    family: "typescript",
    // BFS offers Effect and tRPC as options but cannot scaffold this architecture,
    // so it runs prompt-only — a pure test of the model's engineering.
    supportedByBetterFullstack: false,
    paths: ["prompt"],
    requirements: [
      "Create a TypeScript backend built on the Effect ecosystem (effect runtime, services, layers).",
      "Implement event-sourcing with CQRS: an append-only event store, write-side command handlers, and read-side projections.",
      "Expose the API via tRPC, including a subscription over WebSockets for the read model.",
      "Include an outbox pattern for reliable event publication.",
      "Provide build and type-check scripts.",
      "Do not install dependencies, do not initialize git, and do not start a dev server.",
    ],
    naturalPrompt:
      "Build a TypeScript backend on the Effect ecosystem that uses event sourcing with CQRS — an append-only event store, command handlers on the write side, projections on the read side, and an outbox for reliable publishing. Expose it through tRPC, including a WebSocket subscription that streams read-model updates.",
    rightLibraryNotes: [
      "The service layer must be built on Effect.",
      "Use event-sourcing + CQRS (event store, projections, outbox), not plain CRUD.",
      "Expose tRPC with a WebSocket subscription for the read model.",
    ],
    canonicalFlags: [],
    strictMarkers: [
      // Loose single-token diagnostics (text arrays AND together).
      { id: "runtime:effect", deps: ["effect"] },
      { id: "api:trpc", deps: ["@trpc/server"] },
      { id: "ws:subscription", text: ["subscription"] },
      { id: "pattern:event-sourcing", text: ["projection"] },
    ],
    validationProfile: { packageManager: "bun" },
  },
];

export function parseList<T extends string>(
  value: string | undefined,
  allowed: readonly T[],
  fallback: readonly T[],
) {
  if (!value) return [...fallback];
  if (value === "all") return [...allowed];
  return value
    .split(",")
    .map((item) => item.trim())
    .filter((item): item is T => allowed.includes(item as T));
}

export function parseArgs(argv: string[]): ScaffbenchOptions {
  const args = new Map<string, string>();
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith("--")) continue;
    const key = token.slice(2);
    const next = argv[i + 1];
    if (next && !next.startsWith("--")) {
      args.set(key, next);
      i += 1;
    } else {
      args.set(key, "true");
    }
  }

  const requestedOutDir = args.get("out-dir");
  const specIds = SCAFFBENCH_2_SPECS.map((spec) => spec.id);
  const specsArg = args.get("specs") ?? args.get("spec");
  const specs =
    specsArg === "core" || !specsArg
      ? [...CORE_SPEC_IDS]
      : parseList(specsArg, specIds, CORE_SPEC_IDS);
  const promptStyle = args.get("prompt-style") === "natural" ? "natural" : "explicit";
  const repeats = Math.max(1, Number.parseInt(args.get("repeats") ?? "1", 10) || 1);

  return {
    model: args.get("model") ?? "opus",
    efforts: parseList(
      args.get("efforts"),
      ["default", "low", "medium", "high", "xhigh", "max"],
      DEFAULT_EFFORTS,
    ),
    paths: parseList(args.get("paths"), ["mcp", "cli", "prompt"], DEFAULT_PATHS),
    specs,
    repeats,
    outDir: requestedOutDir
      ? path.resolve(process.cwd(), requestedOutDir)
      : path.resolve(
          process.cwd(),
          "testing/llm-benchmarks/v2",
          new Date().toISOString().replace(/[-:]/g, "").replace(/\..+$/, "Z"),
        ),
    maxBudgetUsd: args.get("max-budget-usd") ?? "12",
    skipValidation: args.has("skip-validation"),
    generateOnly: args.has("generate-only"),
    validateExisting: args.has("validate-existing"),
    qualityGate: args.has("quality-gate"),
    doctorCheck: args.has("doctor-check"),
    routeCheck: args.has("route-check"),
    promptStyle,
    listSpecs: args.has("list-specs"),
    writeMatrixOnly: args.has("write-matrix-only"),
  };
}

export function selectedSpecs(specIds: readonly string[]) {
  const requested = new Set(specIds);
  return SCAFFBENCH_2_SPECS.filter((spec) => requested.has(spec.id));
}

export function canonicalCommand(spec: BenchmarkSpec, projectName: string) {
  return ["bun", "create", bfSpec("better-fullstack"), projectName, ...spec.canonicalFlags]
    .map((part) => quoteArg(part))
    .join(" ");
}

export function promptFor(
  spec: BenchmarkSpec,
  pathMode: CreationPath,
  runDir: string,
  projectName: string,
  promptStyle: PromptStyle,
) {
  const body =
    promptStyle === "natural"
      ? spec.naturalPrompt
      : `Benchmark target: ${spec.title}
Requirements:
${spec.requirements.map((requirement) => `- ${requirement}`).join("\n")}`;

  // Discovery lane: when the spec has curated acceptance sets, the natural prompt
  // does NOT name the required libraries — the agent must infer them from the
  // described capabilities, and scoring credits any accepted alternative.
  const discoveryLane = promptStyle === "natural" && spec.acceptanceSets !== undefined;
  const libraryGuidance = discoveryLane
    ? ""
    : `

Important scoring rule: choosing the right library matters.
${spec.rightLibraryNotes.map((note) => `- ${note}`).join("\n")}`;

  const base = `You are running in an empty benchmark workspace:
${runDir}

Create exactly one project directory named \`${projectName}\`.
Do not ask questions. Do not start a dev server. Do not write outside the current working directory.
At the end, report the commands you ran and any errors you hit.

${body}${libraryGuidance}`;

  if (pathMode === "prompt") {
    return `${base}

Creation mode: prompt-only.
Do not use the Better-Fullstack MCP server, Better-Fullstack CLI, Better-Fullstack website, or files from the Better-Fullstack repository.
Create the project from scratch by writing the files and manifests needed for a runnable starter.`;
  }

  if (pathMode === "cli") {
    return `${base}

Creation mode: Better-Fullstack CLI mention.
Do not use MCP tools. Use the Better-Fullstack CLI via \`bun create ${bfSpec("better-fullstack")}\`.
Map the requirements to explicit non-interactive CLI flags yourself; inspect \`--help\` if you are unsure of a flag name or value. Run the command with \`--dry-run\` first, then run the same scaffold command for real without \`--dry-run\`.
Use \`--no-install --no-git --disable-analytics\`.`;
  }

  return `${base}

Creation mode: Better-Fullstack MCP.
Use the Better-Fullstack MCP tools. Start with bfs_get_guidance, then use schema/compatibility/plan as needed, and call bfs_create_project to create the project.
Do not use the Better-Fullstack CLI for creation.`;
}

export async function runScaffbench(options: ScaffbenchOptions, log = console.log) {
  if (options.listSpecs || options.writeMatrixOnly) {
    return runScaffbenchUnlocked(options, log);
  }
  return withScaffbenchQueue(options, log, () => runScaffbenchUnlocked(options, log));
}

async function runScaffbenchUnlocked(options: ScaffbenchOptions, log = console.log) {
  if (options.generateOnly && options.validateExisting) {
    throw new Error("--generate-only and --validate-existing cannot be used together");
  }
  const specs = selectedSpecs(options.specs);
  if (options.listSpecs) {
    for (const spec of specs.length ? specs : SCAFFBENCH_2_SPECS) {
      log(`${spec.id}\t${spec.lane}\t${spec.family}\t${spec.title}`);
    }
    return;
  }

  await mkdir(options.outDir, { recursive: true });
  // Pin the generator version up front so the canonical command, MCP config,
  // doctor lane, CLI prompt, and recorded metadata all reference the same build.
  RESOLVED_BF_VERSION = await resolveBfVersion();
  await writeHarnessFiles(options.outDir, options, specs);

  if (options.writeMatrixOnly) {
    await writeSummary(options.outDir, [], options, specs, await collectMetadata(options));
    log(`Wrote ScaffBench 2 matrix to ${options.outDir}`);
    return;
  }

  const bunx = existsSync(`${process.env.HOME}/.bun/bin/bunx`)
    ? `${process.env.HOME}/.bun/bin/bunx`
    : "bunx";
  const emptyMcpPath = path.join(options.outDir, "empty-mcp.json");
  const bfsMcpPath = path.join(options.outDir, "better-fullstack-mcp.json");
  await writeMcpConfigs(emptyMcpPath, bfsMcpPath, bunx);

  // The agent that drives this model: GPT/o-series → Codex CLI, else Claude Code.
  const provider = providerForModel(options.model);

  const metadata = await collectMetadata(options);
  const results = await readExistingResults(options.outDir);

  // Agents run in an isolated workspace tree, disjoint from the grading tree
  // (canonical-command.txt / spec.json / summary.json / sibling runs), so a
  // CLI or MCP run cannot read the answer key out of its own working directory.
  const workspaceRoot = path.join(os.tmpdir(), "scaffbench21-work", path.basename(options.outDir));
  await mkdir(workspaceRoot, { recursive: true });

  if (!options.validateExisting) {
    for (const spec of specs) {
      const specPaths = resolveSpecPaths(spec, options.paths);
      const skippedPaths = options.paths.filter((p) => !specPaths.includes(p));
      if (skippedPaths.length > 0) {
        log(
          `PATHS ${spec.id}: runs ${specPaths.join(", ") || "(none)"} — skipping ${skippedPaths.join(", ")} (frontier/prompt-only or pinned spec.paths)`,
        );
      }
      for (const effort of options.efforts) {
        for (const pathMode of specPaths) {
          for (let trial = 1; trial <= options.repeats; trial += 1) {
            const projectName = buildProjectName(spec, pathMode, effort, trial, options.repeats);
            const id = buildRunId(spec, options.model, effort, pathMode, trial, options.repeats);
            const runDir = path.join(options.outDir, "runs", id);
            const workDir = path.join(workspaceRoot, id);
            await mkdir(runDir, { recursive: true });

            if (results.some((result) => result.id === id)) {
              log(`SKIP ${id} already present`);
              continue;
            }

            await rm(workDir, { recursive: true, force: true }).catch(() => {});
            await mkdir(workDir, { recursive: true });

            const prompt = promptFor(spec, pathMode, workDir, projectName, options.promptStyle);
            await writeFile(path.join(runDir, "prompt.txt"), prompt);
            await writeFile(
              path.join(runDir, "canonical-command.txt"),
              `${canonicalCommand(spec, projectName)}\n`,
            );

            log(`RUN ${id}`);
            const started = Date.now();
            const claude =
              provider === "codex"
                ? await runCodex({
                    cwd: workDir,
                    prompt,
                    model: options.model,
                    effort,
                    useMcp: pathMode === "mcp",
                    bunx,
                  })
                : provider === "agy"
                  ? await runAgy({ cwd: workDir, prompt, model: options.model, effort })
                  : provider === "opencode" || provider === "kilo"
                  ? await runOpencode({
                      binary: provider,
                      cwd: workDir,
                      prompt,
                      model: options.model,
                      effort,
                      useMcp: pathMode === "mcp",
                      bunx,
                    })
                  : await runClaude({
                      cwd: workDir,
                      prompt,
                      model: options.model,
                      effort,
                      maxBudgetUsd: options.maxBudgetUsd,
                      mcpConfig: pathMode === "mcp" ? bfsMcpPath : emptyMcpPath,
                    });
            const durationMs = Date.now() - started;

            await writeFile(path.join(runDir, "claude.stdout.json"), claude.stdout);
            await writeFile(path.join(runDir, "claude.stderr.log"), claude.stderr);

            const parsed =
              provider === "codex"
                ? parseCodexResult(claude.stdout, options.model)
                : provider === "agy"
                  ? parseAgyResult(claude.stdout)
                  : provider === "opencode" || provider === "kilo"
                    ? parseOpencodeResult(claude.stdout)
                    : parseClaudeResult(claude.stdout);
            const generatedDir = await findProjectDir(workDir, projectName);
            const validation = options.skipValidation
              ? { projectExists: generatedDir !== null, steps: {} }
              : deferredValidation(generatedDir !== null);
            const scored = generatedDir
              ? await scoreProject(spec, generatedDir, options.promptStyle)
              : {
                  artifact: emptyArtifactScore(spec),
                  faithfulness: undefined,
                  // A no-project discovery run satisfies zero capabilities — score it
                  // 0 rather than leaving it undefined, or maybeAverage would drop it
                  // and overstate the cell's Acceptance.
                  acceptance:
                    options.promptStyle === "natural" && spec.acceptanceSets
                      ? emptyAcceptanceScore(spec)
                      : undefined,
                };
            const toolCompliance = await scoreToolCompliance(pathMode, generatedDir, claude);

            // Archive the generated source under the grading tree, then drop the
            // isolated workspace, so run artifacts stay durable without leaving
            // the answer key reachable from the agent's working directory.
            let projectDir = generatedDir;
            if (generatedDir) {
              const archivedDir = path.join(runDir, projectName);
              try {
                await archiveProjectSource(generatedDir, archivedDir);
                projectDir = archivedDir;
              } catch (error) {
                log(
                  `WARN archive failed for ${id}: ${
                    error instanceof Error ? error.message : String(error)
                  }`,
                );
              }
            }
            if (!generatedDir || projectDir !== generatedDir) {
              await rm(workDir, { recursive: true, force: true }).catch(() => {});
            }
            const result: RunResult = {
              id,
              specId: spec.id,
              specTitle: spec.title,
              model: options.model,
              effort,
              effectiveReasoning: effectiveReasoning(options.model, effort),
              path: pathMode,
              trial,
              promptStyle: options.promptStyle,
              runDir,
              projectName,
              projectDir,
              claude: {
                exitCode: claude.exitCode,
                timedOut: claude.timedOut,
                durationMs,
                resultDurationMs: parsed?.duration_ms,
                outputTokens: parsed?.usage?.output_tokens,
                // Price Claude from token usage (the CLI reports $0 on a
                // subscription / Max plan, which would make Claude look free);
                // non-Claude providers fall back to their own reported cost.
                totalCostUsd: claudeCostUsd(options.model, parsed?.usage) ?? parsed?.total_cost_usd,
                sessionId: parsed?.session_id,
                terminalReason: parsed?.terminal_reason,
              },
              validation,
              stackScore: scored.artifact,
              generatorFaithfulness: scored.faithfulness,
              acceptanceScore: scored.acceptance,
              toolCompliance,
              failureTags: [],
            };
            result.failureTags = deriveFailureTags(result);

            results.push(result);
            await writeSummary(options.outDir, results, options, specs, metadata);

            log(
              `DONE ${id} exit=${result.claude.exitCode} validation=${
                result.validation.deferred ? "deferred" : validationPassed(result)
              } stack=${result.stackScore.matched}/${result.stackScore.total}`,
            );
          }
        }
      }
    }
  }

  if (!options.skipValidation && !options.generateOnly) {
    await validatePendingResults(results, options, specs, metadata, log);
  } else if (options.generateOnly) {
    log("Generation finished; validation deferred. Re-run the same out-dir to validate.");
  }
}

async function withScaffbenchQueue<T>(
  options: ScaffbenchOptions,
  log: (message: string) => void,
  fn: () => Promise<T>,
) {
  const lockRoot = path.dirname(options.outDir);
  const lockDir = path.join(lockRoot, ".scaffbench.lock");
  await mkdir(lockRoot, { recursive: true });

  let announcedWait = false;
  while (true) {
    try {
      await mkdir(lockDir);
      await writeFile(
        path.join(lockDir, "owner.json"),
        `${JSON.stringify(
          {
            pid: process.pid,
            outDir: options.outDir,
            startedAt: new Date().toISOString(),
            command: process.argv.join(" "),
          },
          null,
          2,
        )}\n`,
      );
      break;
    } catch (error) {
      const code = error && typeof error === "object" && "code" in error ? error.code : undefined;
      if (code !== "EEXIST") throw error;
      if (await removeStaleLock(lockDir)) continue;
      if (!announcedWait) {
        log(`QUEUE waiting for active ScaffBench run (${lockDir})`);
        announcedWait = true;
      }
      await sleep(QUEUE_POLL_MS);
    }
  }

  try {
    return await fn();
  } finally {
    await rm(lockDir, { recursive: true, force: true }).catch(() => {});
  }
}

async function removeStaleLock(lockDir: string) {
  const ownerPath = path.join(lockDir, "owner.json");
  try {
    const owner = JSON.parse(await readFile(ownerPath, "utf8"));
    if (typeof owner.pid === "number" && isProcessAlive(owner.pid)) return false;
  } catch {
    try {
      const info = await stat(lockDir);
      if (Date.now() - info.mtimeMs < STALE_LOCK_MS) return false;
    } catch {
      return true;
    }
  }
  await rm(lockDir, { recursive: true, force: true }).catch(() => {});
  return true;
}

function isProcessAlive(pid: number) {
  if (pid === process.pid) return true;
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function deferredValidation(projectExists: boolean): ProjectValidation {
  return projectExists
    ? { projectExists: true, deferred: true, steps: {} }
    : { projectExists: false, steps: {} };
}

function needsValidation(result: RunResult, options: ScaffbenchOptions) {
  if (options.skipValidation) return false;
  if (!result.validation.projectExists || !result.projectDir) return false;
  if (result.validation.deferred) return true;
  return (
    options.validateExisting &&
    !result.validation.cacheKey &&
    Object.keys(result.validation.steps).length === 0
  );
}

async function validatePendingResults(
  results: RunResult[],
  options: ScaffbenchOptions,
  specs: readonly BenchmarkSpec[],
  metadata: Record<string, unknown>,
  log: (message: string) => void,
) {
  const specsById = new Map(specs.map((spec) => [spec.id, spec]));
  const pending = results
    .filter((result) => needsValidation(result, options))
    .sort(
      (a, b) =>
        validationPriority(specsById.get(a.specId)) - validationPriority(specsById.get(b.specId)),
    );

  if (pending.length === 0) {
    if (options.validateExisting) log("No existing generated runs need validation.");
    return;
  }

  log(`VALIDATE ${pending.length} generated run${pending.length === 1 ? "" : "s"}`);
  for (const result of pending) {
    const spec = specsById.get(result.specId);
    if (!spec) continue;
    if (!result.projectDir || !existsSync(result.projectDir)) {
      result.validation = { projectExists: false, steps: {} };
      result.failureTags = deriveFailureTags(result);
      await writeSummary(options.outDir, results, options, specs, metadata);
      log(`VALIDATE ${result.id} missing archived project`);
      continue;
    }

    log(`VALIDATE ${result.id}`);
    result.validation = await validateProjectCached(spec, result.projectDir, options);
    result.failureTags = deriveFailureTags(result);
    await writeSummary(options.outDir, results, options, specs, metadata);
    log(
      `DONE ${result.id} validation=${validationPassed(result)} cache=${
        result.validation.cacheHit ? "hit" : "miss"
      }`,
    );
  }
}

function validationPriority(spec?: BenchmarkSpec) {
  if (!spec) return 50;
  const native = new Set(spec.validationProfile.native ?? []);
  if (native.has("cargo") || spec.family === "rust") return 100;
  if (native.has("dotnet") || spec.family === "multi-ecosystem" || spec.family === "dotnet")
    return 80;
  return 10;
}

async function writeHarnessFiles(
  outDir: string,
  options: ScaffbenchOptions,
  specs: readonly BenchmarkSpec[],
) {
  await writeFile(
    path.join(outDir, "spec.json"),
    `${JSON.stringify(
      {
        harnessVersion: HARNESS_VERSION,
        selectedSpecs: specs.map((spec) => spec.id),
        specs: specs.map((spec) => ({
          ...spec,
          canonicalCommand: canonicalCommand(spec, "<project-name>"),
        })),
        options: { ...options, listSpecs: undefined, writeMatrixOnly: undefined },
      },
      null,
      2,
    )}\n`,
  );
}

async function writeMcpConfigs(emptyMcpPath: string, bfsMcpPath: string, bunx: string) {
  await writeFile(emptyMcpPath, `${JSON.stringify({ mcpServers: {} }, null, 2)}\n`);
  await writeFile(
    bfsMcpPath,
    `${JSON.stringify(
      {
        mcpServers: {
          "better-fullstack": {
            command: bunx,
            args: [bfSpec("create-better-fullstack"), "mcp"],
          },
        },
      },
      null,
      2,
    )}\n`,
  );
}

function buildRunId(
  spec: BenchmarkSpec,
  model: string,
  effort: Effort,
  pathMode: CreationPath,
  trial: number,
  repeats: number,
) {
  const base = `${spec.id}-${model}-${effort}-${pathMode}`;
  return repeats === 1 ? base : `${base}-r${String(trial).padStart(2, "0")}`;
}

function buildProjectName(
  spec: BenchmarkSpec,
  pathMode: CreationPath,
  effort: Effort,
  trial: number,
  repeats: number,
) {
  const base = `sb21-${spec.id}-${pathMode}-${effort}`.replace(/[^a-zA-Z0-9_-]/g, "-");
  return repeats === 1 ? base : `${base}-r${String(trial).padStart(2, "0")}`;
}

async function readExistingResults(outDir: string): Promise<RunResult[]> {
  const summaryPath = path.join(outDir, "summary.json");
  if (!existsSync(summaryPath)) return [];
  try {
    const parsed = JSON.parse(await readFile(summaryPath, "utf8"));
    if (!Array.isArray(parsed.results)) return [];
    return parsed.results.filter(isCompletedHarnessRun);
  } catch {
    return [];
  }
}

function isCompletedHarnessRun(result: RunResult) {
  return (
    result.claude.terminalReason !== undefined ||
    result.claude.timedOut ||
    result.validation.projectExists ||
    result.claude.durationMs > 10_000
  );
}

async function runClaude(input: {
  cwd: string;
  prompt: string;
  model: string;
  effort: Effort;
  maxBudgetUsd: string;
  mcpConfig: string;
}): Promise<CommandResult> {
  const effortArgs = input.effort === "default" ? [] : ["--effort", input.effort];

  return runCommand(
    "claude",
    [
      "-p",
      "--model",
      input.model,
      ...effortArgs,
      // stream-json (requires --verbose) emits the full tool_use trajectory, so
      // command discipline can be scored on actual tool calls rather than greps
      // of the final result envelope. The final {"type":"result"} line carries
      // the same cost/usage/session fields as --output-format json.
      "--output-format",
      "stream-json",
      "--verbose",
      "--permission-mode",
      "bypassPermissions",
      "--no-session-persistence",
      "--strict-mcp-config",
      "--mcp-config",
      input.mcpConfig,
      "--max-budget-usd",
      input.maxBudgetUsd,
      input.prompt,
    ],
    input.cwd,
    CLAUDE_TIMEOUT_MS,
  );
}

export type AgentProvider = "claude" | "codex" | "opencode" | "kilo" | "agy";

/** Infer the agent that drives a model id by its prefix. opencode/* and kilo/*
 *  models are driven by the opencode/Kilo Code CLIs; GPT/o-series by Codex; Gemini
 *  by Google's Antigravity `agy` CLI (the standalone gemini CLI is sunset for
 *  individual tiers). */
export function providerForModel(model: string): AgentProvider {
  if (/^opencode\//i.test(model)) return "opencode";
  if (/^kilo\//i.test(model)) return "kilo";
  if (/gemini/i.test(model)) return "agy";
  if (/^(gpt|o\d|codex)/i.test(model)) return "codex";
  return "claude";
}

// Human label for the agent that drove a model — for summary.md headers. Derived
// from the model so non-Claude runs aren't mislabeled "Claude Code".
export function agentLabelForModel(model: string): string {
  switch (providerForModel(model)) {
    case "codex":
      return "Codex";
    case "opencode":
      return "opencode";
    case "kilo":
      return "Kilo Code";
    case "agy":
      return "Antigravity";
    default:
      return "Claude Code";
  }
}

// Codex (GPT) adapter — the second agent that lets ScaffBench drive non-Claude
// models, mirroring runClaude. Runs `codex exec --json` with an ISOLATED config
// (only the Better-Fullstack MCP server when on the MCP path; --ignore-user-config
// so the host's own MCP servers/auth don't bleed in), the reasoning effort mapped
// to model_reasoning_effort, and full access (the run lives in an isolated temp
// dir, matching claude's bypassPermissions). Its stdout is the JSONL event stream
// that parseCodexResult / extractToolUses understand.
async function runCodex(input: {
  cwd: string;
  prompt: string;
  model: string;
  effort: Effort;
  useMcp: boolean;
  bunx: string;
}): Promise<CommandResult> {
  const effortArgs =
    input.effort === "default" ? [] : ["-c", `model_reasoning_effort=${input.effort}`];
  const mcpArgs = input.useMcp
    ? [
        "-c",
        `mcp_servers.bfs.command=${JSON.stringify(input.bunx)}`,
        "-c",
        `mcp_servers.bfs.args=${JSON.stringify([bfSpec("create-better-fullstack"), "mcp"])}`,
      ]
    : [];
  return runCommand(
    "codex",
    [
      "exec",
      "--json",
      "-m",
      input.model,
      ...effortArgs,
      "--dangerously-bypass-approvals-and-sandbox",
      "--skip-git-repo-check",
      "--ignore-user-config",
      "-C",
      input.cwd,
      ...mcpArgs,
      input.prompt,
    ],
    input.cwd,
    CLAUDE_TIMEOUT_MS,
  );
}

// Antigravity (Gemini) adapter. Google sunset the standalone gemini CLI for
// individual tiers ("migrate to Antigravity"), so Gemini is driven through the
// `agy` CLI. `agy -p` runs one prompt headlessly and exits cleanly; effort is
// baked into the model display name ("Gemini 3.5 Flash (High)"), not a flag;
// --add-dir puts the isolated workspace in agy's scope (it otherwise writes to
// its own scratch dir, ignoring cwd); --dangerously-skip-permissions auto-approves
// tools (no human to approve). agy prints a plain-text response with no usage/cost
// stream, so tokens/cost/steps surface as "—".
const AGY_MODEL_LABELS: Record<string, string> = {
  "gemini-3.5-flash": "Gemini 3.5 Flash",
  "gemini-3.1-pro": "Gemini 3.1 Pro",
};
function agyModelString(model: string, effort: Effort): string {
  const base = AGY_MODEL_LABELS[model] ?? model;
  // agy exposes effort as a tier suffix. Anything above "medium" maps to High.
  const tier = effort === "low" ? "Low" : effort === "medium" ? "Medium" : "High";
  return `${base} (${tier})`;
}
async function runAgy(input: {
  cwd: string;
  prompt: string;
  model: string;
  effort: Effort;
}): Promise<CommandResult> {
  return runCommand(
    "agy",
    [
      "-p",
      input.prompt,
      "--model",
      agyModelString(input.model, input.effort),
      "--dangerously-skip-permissions",
      "--add-dir",
      input.cwd,
      "--print-timeout",
      "90m",
    ],
    input.cwd,
    CLAUDE_TIMEOUT_MS,
  );
}
// agy emits a plain-text response (no JSON usage stream), so there is nothing to
// parse for tokens/cost/session/terminal-reason — return undefined and let those
// fields degrade to "—", exactly like Codex's unreported cost.
function parseAgyResult(_stdout: string): undefined {
  return undefined;
}

// opencode / Kilo Code adapter — both ship the same CLI, so one function (binary =
// "opencode" | "kilo") drives both. Runs `<bin> run --format json` in the isolated
// workdir; for the MCP path it writes a project opencode.json wiring ONLY the
// Better-Fullstack MCP server. opencode reports USD cost directly on each
// step-finish (0 for free models), so no pricing table is needed. Reasoning effort
// maps to --variant. Output is the JSONL event stream parseOpencodeResult reads.
async function runOpencode(input: {
  binary: "opencode" | "kilo";
  cwd: string;
  prompt: string;
  model: string;
  effort: Effort;
  useMcp: boolean;
  bunx: string;
}): Promise<CommandResult> {
  if (input.useMcp) {
    const config = {
      mcp: {
        "better-fullstack": {
          type: "local",
          command: [input.bunx, bfSpec("create-better-fullstack"), "mcp"],
          enabled: true,
        },
      },
    };
    await writeFile(path.join(input.cwd, "opencode.json"), `${JSON.stringify(config, null, 2)}\n`);
  }
  const effortArgs = input.effort === "default" ? [] : ["--variant", input.effort];
  return runCommand(
    input.binary,
    [
      "run",
      "--format",
      "json",
      // Non-interactive: there is no human to approve tool calls, so without this
      // opencode/Kilo auto-REJECT every bash/edit ("user rejected permission"),
      // and the agent can't scaffold anything. Matches claude's
      // --dangerously-skip-permissions and codex's --full-auto.
      "--dangerously-skip-permissions",
      "-m",
      input.model,
      ...effortArgs,
      "--dir",
      input.cwd,
      input.prompt,
    ],
    input.cwd,
    CLAUDE_TIMEOUT_MS,
  );
}

export async function runCommand(
  command: string,
  args: readonly string[],
  cwd: string,
  timeoutMs: number,
): Promise<CommandResult> {
  const started = Date.now();
  // stdin is closed (EOF), not an open pipe: `codex exec` reads stdin when it is
  // piped ("Reading additional input from stdin…") and would otherwise hang for
  // the full timeout waiting on input that never comes. Harmless for every other
  // spawned command (claude -p, cargo, bun, …) — none need interactive stdin.
  const child = spawn(command, args, { cwd, env: process.env, stdio: ["ignore", "pipe", "pipe"] });
  let stdout = "";
  let stderr = "";
  let timedOut = false;
  let spawnError = false;
  const timer = setTimeout(() => {
    timedOut = true;
    child.kill("SIGTERM");
    setTimeout(() => child.kill("SIGKILL"), 3_000).unref();
  }, timeoutMs);

  child.stdout.on("data", (chunk) => {
    stdout += chunk.toString();
  });
  child.stderr.on("data", (chunk) => {
    stderr += chunk.toString();
  });

  const exitCode = await new Promise<number | null>((resolve) => {
    let settled = false;
    const finish = (code: number | null) => {
      if (settled) return;
      settled = true;
      resolve(code);
    };

    child.on("error", (error) => {
      spawnError = true;
      stderr += `${stderr ? "\n" : ""}${error.name}: ${error.message}`;
      finish(127);
    });
    child.on("close", (code) => finish(code));
  });
  clearTimeout(timer);

  return {
    command: [command, ...args].map(quoteArg).join(" "),
    exitCode,
    timedOut,
    spawnError,
    durationMs: Date.now() - started,
    stdout,
    stderr,
    stdoutTail: tail(stdout),
    stderrTail: tail(stderr),
  };
}

function quoteArg(arg: string) {
  return /^[a-zA-Z0-9_./:=@-]+$/.test(arg) ? arg : JSON.stringify(arg);
}

function tail(value: string, max = 4_000) {
  return value.length <= max ? value : value.slice(-max);
}

type CodexUsage = {
  input_tokens?: number;
  cached_input_tokens?: number;
  output_tokens?: number;
  reasoning_output_tokens?: number;
};

// Published token pricing (USD per 1M tokens) for the models driven via Codex.
// Codex's JSONL reports token usage but no cost, so we price it ourselves.
// Update when provider pricing changes. Source: OpenAI API pricing, 2026.
const CODEX_PRICING: Record<string, { input: number; cachedInput: number; output: number }> = {
  "gpt-5.5": { input: 5, cachedInput: 0.5, output: 30 },
};

function codexPricingFor(model: string) {
  const key = model.toLowerCase();
  return (
    CODEX_PRICING[key] ??
    CODEX_PRICING[Object.keys(CODEX_PRICING).find((k) => key.startsWith(k)) ?? ""]
  );
}

/** Estimated USD cost from codex token usage; undefined if the model isn't priced. */
export function codexCostUsd(model: string, usage: CodexUsage): number | undefined {
  const price = codexPricingFor(model);
  if (!price) return undefined;
  const input = usage.input_tokens ?? 0;
  const cached = usage.cached_input_tokens ?? 0;
  const output = (usage.output_tokens ?? 0) + (usage.reasoning_output_tokens ?? 0);
  return (
    (Math.max(0, input - cached) * price.input +
      cached * price.cachedInput +
      output * price.output) /
    1_000_000
  );
}

// Published token pricing (USD per 1M tokens) for Claude models. The Claude Code
// CLI reports total_cost_usd = 0 on subscription / Max-plan usage (no per-token
// API billing), which makes Claude look like the cheapest, most "reliable" row
// on the leaderboard purely because it shows as free. So we price Claude from
// token usage ourselves — exactly as the Codex path does — to get an
// API-equivalent cost comparable across vendors. Source: Anthropic API pricing,
// 2026. Cache reads ≈ 0.1× input; cache writes (5-min TTL) ≈ 1.25× input.
const CLAUDE_PRICING: Record<string, { input: number; output: number }> = {
  "claude-fable-5": { input: 10, output: 50 },
  "claude-opus-4-8": { input: 5, output: 25 },
  "claude-opus-4-7": { input: 5, output: 25 },
  "claude-opus-4-6": { input: 5, output: 25 },
  "claude-opus-4-5": { input: 5, output: 25 },
  "claude-sonnet-5": { input: 3, output: 15 },
  "claude-sonnet-4-6": { input: 3, output: 15 },
  "claude-haiku-4-5": { input: 1, output: 5 },
  // Bare aliases the harness/CLI may pass through as the model string.
  fable: { input: 10, output: 50 },
  opus: { input: 5, output: 25 },
  sonnet: { input: 3, output: 15 },
  haiku: { input: 1, output: 5 },
};

function claudePricingFor(model: string) {
  const key = model.toLowerCase();
  if (CLAUDE_PRICING[key]) return CLAUDE_PRICING[key];
  // Fall back to the longest matching family key (e.g. "claude-opus-4-8[1m]" or
  // a dated suffix still prices as opus); prefer the most specific match.
  const match = Object.keys(CLAUDE_PRICING)
    .filter((k) => key.includes(k))
    .sort((a, b) => b.length - a.length)[0];
  return match ? CLAUDE_PRICING[match] : undefined;
}

type ClaudeUsage = {
  input_tokens?: number;
  output_tokens?: number;
  cache_creation_input_tokens?: number;
  cache_read_input_tokens?: number;
};

/** Estimated API-equivalent USD cost from Claude token usage × published
 * pricing. Returns undefined when the model isn't a priced Claude model, so
 * non-Claude providers (Codex/opencode) keep their own reported cost. Cache
 * reads are priced at 0.1× input, cache writes at 1.25× input. */
export function claudeCostUsd(model: string, usage: ClaudeUsage | undefined): number | undefined {
  if (!usage) return undefined;
  const price = claudePricingFor(model);
  if (!price) return undefined;
  const input = usage.input_tokens ?? 0;
  const output = usage.output_tokens ?? 0;
  const cacheRead = usage.cache_read_input_tokens ?? 0;
  const cacheWrite = usage.cache_creation_input_tokens ?? 0;
  return (
    (input * price.input +
      output * price.output +
      cacheRead * price.input * 0.1 +
      cacheWrite * price.input * 1.25) /
    1_000_000
  );
}

// Codex analogue of parseClaudeResult. The JSONL stream carries token usage on
// the final `turn.completed` event and the session on `thread.started`. Codex
// reports no USD cost, so we estimate it from token usage × CODEX_PRICING (pass
// the model). Output tokens = answer + reasoning, so the cost of "thinking
// harder" is visible in the token column.
export function parseCodexResult(stdout: string, model?: string): any | null {
  let usage: CodexUsage | undefined;
  let threadId: string | undefined;
  let sawTurn = false;
  for (const line of stdout.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("{")) continue;
    let event: any;
    try {
      event = JSON.parse(trimmed);
    } catch {
      continue;
    }
    if (event?.type === "thread.started" && typeof event.thread_id === "string") {
      threadId = event.thread_id;
    }
    if (event?.type === "turn.completed" && event.usage) {
      usage = event.usage;
      sawTurn = true;
    }
  }
  if (!sawTurn && !threadId) return null;
  const outputTokens =
    usage !== undefined
      ? (usage.output_tokens ?? 0) + (usage.reasoning_output_tokens ?? 0)
      : undefined;
  return {
    type: "result",
    usage: outputTokens !== undefined ? { output_tokens: outputTokens } : undefined,
    total_cost_usd:
      usage !== undefined && model !== undefined ? codexCostUsd(model, usage) : undefined,
    session_id: threadId,
    duration_ms: undefined,
    terminal_reason: undefined,
  };
}

// opencode / Kilo Code analogue. Every JSONL event carries a sessionID; each
// `step-finish` part carries per-step token usage and USD cost (0 for free
// models), summed across steps. opencode reports cost directly, so unlike codex
// no pricing table is involved.
export function parseOpencodeResult(stdout: string): any | null {
  let sessionId: string | undefined;
  let outputTokens = 0;
  let cost = 0;
  let sawStep = false;
  for (const line of stdout.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("{")) continue;
    let event: any;
    try {
      event = JSON.parse(trimmed);
    } catch {
      continue;
    }
    if (typeof event?.sessionID === "string") sessionId = event.sessionID;
    const part = event?.part;
    if (part?.type === "step-finish") {
      sawStep = true;
      outputTokens += (part.tokens?.output ?? 0) + (part.tokens?.reasoning ?? 0);
      if (typeof part.cost === "number") cost += part.cost;
    }
  }
  if (!sawStep && sessionId === undefined) return null;
  return {
    type: "result",
    usage: sawStep ? { output_tokens: outputTokens } : undefined,
    total_cost_usd: sawStep ? cost : undefined,
    session_id: sessionId,
    duration_ms: undefined,
    terminal_reason: undefined,
  };
}

export function parseClaudeResult(stdout: string): any | null {
  // stream-json: the final {"type":"result",...} line carries cost/usage/session.
  const lines = stdout.trim().split("\n");
  for (let i = lines.length - 1; i >= 0; i -= 1) {
    const candidate = lines[i]?.trim() ?? "";
    if (candidate.startsWith("{") && candidate.includes('"type":"result"')) {
      try {
        return JSON.parse(candidate);
      } catch {}
    }
  }
  // Fallback for --output-format json (single object) or noisy output.
  try {
    return JSON.parse(stdout);
  } catch {
    // Tolerate leading/trailing non-JSON (banner lines, warnings) by extracting
    // the outermost {...} span before giving up.
    const start = stdout.indexOf("{");
    const end = stdout.lastIndexOf("}");
    if (start >= 0 && end > start) {
      try {
        return JSON.parse(stdout.slice(start, end + 1));
      } catch {}
    }
    const line = stdout
      .trim()
      .split("\n")
      .reverse()
      .find((candidate) => candidate.trim().startsWith("{") && candidate.trim().endsWith("}"));
    if (!line) return null;
    try {
      return JSON.parse(line.trim());
    } catch {
      return null;
    }
  }
}

const PROJECT_MANIFESTS = ["package.json", "Cargo.toml", "go.mod", "pyproject.toml", "bts.jsonc"];

export async function findProjectDir(runDir: string, projectName: string) {
  const expected = path.join(runDir, projectName);
  if (existsSync(expected)) return expected;

  const entries = await readdir(runDir, { withFileTypes: true });
  const dirs = entries.filter(
    (entry) => entry.isDirectory() && !entry.name.startsWith(".") && entry.name !== "node_modules",
  );
  if (dirs.length === 1 && dirs[0]) return path.join(runDir, dirs[0].name);

  // Multiple (or zero) candidate dirs: disambiguate by manifest presence so a
  // stray directory the agent created does not shadow the real project, and an
  // ambiguous tree resolves to null rather than a wrong guess.
  const withManifest = dirs.filter((dir) =>
    PROJECT_MANIFESTS.some((manifest) => existsSync(path.join(runDir, dir.name, manifest))),
  );
  if (withManifest.length === 1 && withManifest[0]) {
    return path.join(runDir, withManifest[0].name);
  }
  return null;
}

/** Copy the generated project source (excluding heavy build/dependency dirs)
 * from the isolated workspace into the durable grading tree. */
async function archiveProjectSource(srcDir: string, destDir: string) {
  const skip = new Set([
    "node_modules",
    ".git",
    "dist",
    "build",
    ".next",
    ".turbo",
    "coverage",
    "target",
    ".venv",
    "bin",
    "obj",
  ]);
  await rm(destDir, { recursive: true, force: true });
  await cp(srcDir, destDir, {
    recursive: true,
    force: true,
    filter: (source) => !skip.has(path.basename(source)),
  });
}

export async function validateProject(
  spec: BenchmarkSpec,
  projectDir: string | null,
  options: ScaffbenchOptions,
): Promise<ProjectValidation> {
  if (!projectDir) return { projectExists: false, steps: {} };
  const steps: Record<string, StepResult | undefined> = {};

  if (
    spec.validationProfile.packageManager === "bun" ||
    existsSync(path.join(projectDir, "package.json"))
  ) {
    Object.assign(steps, await validateBunProject(projectDir, options));
  }

  const nativeProfiles = new Set(spec.validationProfile.native ?? []);
  if (nativeProfiles.has("cargo") || existsSync(path.join(projectDir, "Cargo.toml"))) {
    Object.assign(steps, await validateCargoProject(projectDir, options));
  }
  if (nativeProfiles.has("python") || existsSync(path.join(projectDir, "pyproject.toml"))) {
    Object.assign(steps, await validatePythonProject(projectDir, options));
  }
  if (nativeProfiles.has("go") || existsSync(path.join(projectDir, "go.mod"))) {
    Object.assign(steps, await validateGoProject(projectDir, options));
  }
  if (nativeProfiles.has("dotnet") || (await hasDotnetProject(projectDir))) {
    Object.assign(steps, await validateDotnetProject(projectDir, options));
  }
  // Java/Elixir run ONLY on an explicit native profile — NOT file autodetect.
  // A React Native app ships an Android `build.gradle` (apps/native/android), and
  // a loose gradle autodetect would wrongly run `gradlew compileJava` on a
  // TS/bun project and clobber its bun validation. Every Java/Elixir spec
  // declares validationProfile.native, so the explicit gate is sufficient.
  if (nativeProfiles.has("java")) {
    Object.assign(steps, await validateJavaProject(projectDir, options));
  }
  if (nativeProfiles.has("elixir")) {
    Object.assign(steps, await validateElixirProject(projectDir, options));
  }

  const validation: ProjectValidation = {
    projectExists: true,
    steps,
    install: steps.install,
    build: steps.build,
    checkTypes: steps.typecheck,
    lint: steps.lint,
    format: steps.format,
    test: steps.test,
    doctor: steps.doctor,
    route: steps.route,
  };
  return validation;
}

async function validateProjectCached(
  spec: BenchmarkSpec,
  projectDir: string,
  options: ScaffbenchOptions,
): Promise<ProjectValidation> {
  const sourceHash = await hashProjectSource(projectDir);
  const cacheKey = validationCacheKey(spec, options, sourceHash);
  const cacheDir = path.join(options.outDir, "validation-cache");
  const cachePath = path.join(cacheDir, `${cacheKey}.json`);

  if (existsSync(cachePath)) {
    try {
      const cached = JSON.parse(await readFile(cachePath, "utf8"));
      if (cached?.validation?.projectExists) {
        return {
          ...cached.validation,
          sourceHash,
          cacheKey,
          cacheHit: true,
          deferred: false,
        };
      }
    } catch {}
  }

  const validation = await validateProject(spec, projectDir, options);
  const withCacheMeta: ProjectValidation = {
    ...validation,
    sourceHash,
    cacheKey,
    cacheHit: false,
    deferred: false,
  };
  if (cacheableValidation(withCacheMeta)) {
    await mkdir(cacheDir, { recursive: true });
    await writeFile(
      cachePath,
      `${JSON.stringify(
        {
          version: VALIDATION_CACHE_VERSION,
          createdAt: new Date().toISOString(),
          specId: spec.id,
          validation: withCacheMeta,
        },
        null,
        2,
      )}\n`,
    );
  }
  return withCacheMeta;
}

function cacheableValidation(validation: ProjectValidation) {
  return !Object.values(validation.steps).some((step) => step?.timedOut || step?.spawnError);
}

function validationCacheKey(spec: BenchmarkSpec, options: ScaffbenchOptions, sourceHash: string) {
  const hash = createHash("sha256");
  hash.update(
    JSON.stringify({
      version: VALIDATION_CACHE_VERSION,
      harnessVersion: HARNESS_VERSION,
      specId: spec.id,
      sourceHash,
      qualityGate: options.qualityGate,
      doctorCheck: options.doctorCheck,
      routeCheck: options.routeCheck,
    }),
  );
  return hash.digest("hex");
}

async function hashProjectSource(projectDir: string) {
  const hash = createHash("sha256");
  for (const filePath of await listHashableFiles(projectDir)) {
    const relative = path.relative(projectDir, filePath).split(path.sep).join("/");
    hash.update(relative);
    hash.update("\0");
    hash.update(await readFile(filePath));
    hash.update("\0");
  }
  return hash.digest("hex");
}

async function listHashableFiles(root: string) {
  const skip = new Set([
    "node_modules",
    ".git",
    "dist",
    "build",
    ".next",
    ".turbo",
    "coverage",
    "target",
    ".venv",
    "bin",
    "obj",
  ]);
  const files: string[] = [];

  async function walk(dir: string) {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (skip.has(entry.name)) continue;
      const entryPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(entryPath);
      } else if (entry.isFile()) {
        files.push(entryPath);
      }
    }
  }

  await walk(root);
  return files.sort();
}

async function validateBunProject(projectDir: string, options: ScaffbenchOptions) {
  const steps: Record<string, StepResult | undefined> = {};
  const packageJsonPath = path.join(projectDir, "package.json");
  if (!existsSync(packageJsonPath)) return steps;

  const bun = existsSync(`${process.env.HOME}/.bun/bin/bun`)
    ? `${process.env.HOME}/.bun/bin/bun`
    : "bun";
  steps.install = toStep(await runCommand(bun, ["install"], projectDir, VALIDATION_TIMEOUT_MS));
  if (steps.install.exitCode !== 0 || steps.install.timedOut) return steps;

  const scripts = await readPackageScripts(packageJsonPath);
  if (scripts.build)
    steps.build = toStep(
      await runCommand(bun, ["run", "build"], projectDir, VALIDATION_TIMEOUT_MS),
    );
  const gate = typecheckGate(scripts, existsSync(path.join(projectDir, "tsconfig.json")));
  if (gate === "tsc") {
    // No typecheck script shipped: fall back to `tsc --build` so a TS project
    // cannot dodge type-checking by omitting the script. `--build` (unlike
    // `--noEmit`) descends into project references, so a root tsconfig with
    // `files: []` + `references` still type-checks the referenced app/packages.
    const bunx = existsSync(`${process.env.HOME}/.bun/bin/bunx`)
      ? `${process.env.HOME}/.bun/bin/bunx`
      : "bunx";
    steps.typecheck = toStep(
      await runCommand(bunx, ["tsc", "--build"], projectDir, VALIDATION_TIMEOUT_MS),
    );
  } else if (gate) {
    steps.typecheck = toStep(
      await runCommand(bun, ["run", gate], projectDir, VALIDATION_TIMEOUT_MS),
    );
  }
  // Quality gate — every check is READ-ONLY (never mutates the scaffold) and runs
  // the project-LOCAL, version-pinned tool (node_modules/.bin/*) after install, so
  // the verdict is reproducible and a step can't launder a real problem into a
  // pass by auto-fixing it. A missing tool is a `skipStep` (disqualifies Full),
  // never a silent exit-0 pass — that exit-0 skip + the `biome check --write`
  // fallback were the Finding-1 inflation that made Full == Core for TS cells.
  if (options.qualityGate || scripts.lint) {
    const biomeBin = localBin(projectDir, "biome");
    const eslintBin = localBin(projectDir, "eslint");
    steps.lint = scripts.lint
      ? toStep(await runCommand(bun, ["run", "lint"], projectDir, VALIDATION_TIMEOUT_MS))
      : biomeBin
        ? toStep(await runCommand(biomeBin, ["lint", "."], projectDir, VALIDATION_TIMEOUT_MS))
        : eslintBin
          ? toStep(await runCommand(eslintBin, ["."], projectDir, VALIDATION_TIMEOUT_MS))
          : skipStep("lint (no linter configured)");
  }
  if (options.qualityGate) {
    // Read-only format check — deliberately NOT the project's `format`/`check`
    // scripts: generated BFS projects ship `check: biome check --write .`, which
    // auto-fixes and always exits 0. `biome format` (no --write) / `prettier
    // --check` report formatting drift without writing. NOTE: Biome 2.5.1 removed
    // the `--check` flag ("--check is not expected in this context"); the default
    // `biome format` is already read-only and exits non-zero on unformatted code.
    const biomeBin = localBin(projectDir, "biome");
    const prettierBin = localBin(projectDir, "prettier");
    steps.format = biomeBin
      ? toStep(await runCommand(biomeBin, ["format", "."], projectDir, VALIDATION_TIMEOUT_MS))
      : prettierBin
        ? toStep(await runCommand(prettierBin, ["--check", "."], projectDir, VALIDATION_TIMEOUT_MS))
        : skipStep("format (no formatter configured)");
    // A scaffold with no test script is genuinely testless -> n/a (excluded from
    // Full), neither a free pass nor a failure.
    steps.test = scripts.test
      ? toStep(await runCommand(bun, ["run", "test"], projectDir, VALIDATION_TIMEOUT_MS))
      : naStep("test (no test script)");
  }
  if (options.doctorCheck) {
    const bunx = existsSync(`${process.env.HOME}/.bun/bin/bunx`)
      ? `${process.env.HOME}/.bun/bin/bunx`
      : "bunx";
    steps.doctor = toStep(
      await runCommand(
        bunx,
        [bfSpec("create-better-fullstack"), "doctor", ".", "--skip-checks", "--json"],
        projectDir,
        VALIDATION_TIMEOUT_MS,
      ),
    );
  }
  if (options.routeCheck) {
    steps.route = scripts.dev
      ? await runProjectRouteCheck(projectDir, options.outDir)
      : naStep("route-check (no dev script)");
  }

  return steps;
}

async function runProjectRouteCheck(projectDir: string, outDir: string): Promise<StepResult> {
  const config = await readRouteCheckConfig(projectDir);
  if (!config) return naStep("route-check (missing Better-Fullstack route metadata)");

  const start = Date.now();
  let handle: any = null;
  try {
    const devCheck = await import("../testing/lib/dev-check");
    const routeCheck = await import("../testing/lib/route-check");
    handle = await devCheck.startDevServer(projectDir, config);
    const result = await routeCheck.runRouteCheck(
      handle,
      path.join(outDir, "route-check", path.basename(projectDir)),
    );
    return verifyStepToHarnessStep(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      command: "route-check",
      exitCode: 1,
      timedOut: false,
      durationMs: Date.now() - start,
      stdoutTail: tail(handle?.stdoutBuf?.() ?? ""),
      stderrTail: tail(`${message}\n${handle?.stderrBuf?.() ?? ""}`),
    };
  } finally {
    if (handle) {
      try {
        const devCheck = await import("../testing/lib/dev-check");
        await devCheck.stopDevServer(handle);
      } catch {}
    }
  }
}

async function readRouteCheckConfig(projectDir: string) {
  const btsPath = path.join(projectDir, "bts.jsonc");
  if (!existsSync(btsPath)) return null;

  const parsed = parseJsonc(await readFile(btsPath, "utf8"));
  if (!parsed) return null;

  const frontend = inferFrontend(parsed);
  if (frontend.every((entry) => entry === "none")) return null;

  return {
    ...parsed,
    projectName: parsed.projectName ?? path.basename(projectDir),
    projectDir,
    relativePath: parsed.relativePath ?? ".",
    frontend,
  };
}

function inferFrontend(config: Record<string, any>): string[] {
  if (Array.isArray(config.frontend)) return config.frontend.filter(Boolean);
  if (typeof config.frontend === "string" && config.frontend) return [config.frontend];

  if (Array.isArray(config.stackParts)) {
    const frontendPart = config.stackParts.find(
      (part: Record<string, any>) => part.role === "frontend" && typeof part.toolId === "string",
    );
    if (frontendPart?.toolId) return [frontendPart.toolId];
  }

  return [];
}

function verifyStepToHarnessStep(result: any): StepResult {
  return {
    command: result.step ?? "route-check",
    exitCode: result.success || result.skipped ? 0 : (result.exitCode ?? 1),
    timedOut: Boolean(result.timedOut),
    durationMs: result.durationMs ?? 0,
    stdoutTail: tail(result.stdout ?? ""),
    stderrTail: tail(result.stderr ?? ""),
  };
}

async function validateCargoProject(projectDir: string, options: ScaffbenchOptions) {
  const steps: Record<string, StepResult | undefined> = {};
  if (!existsSync(path.join(projectDir, "Cargo.toml"))) return steps;
  steps.cargoCheck = toStep(
    await runCommand("cargo", ["check"], projectDir, VALIDATION_TIMEOUT_MS),
  );
  steps.build = steps.build ?? steps.cargoCheck;
  if (options.qualityGate) {
    steps.format = toStep(
      await runCommand("cargo", ["fmt", "--check"], projectDir, VALIDATION_TIMEOUT_MS),
    );
    steps.lint = toStep(
      await runCommand(
        "cargo",
        ["clippy", "--", "-D", "warnings"],
        projectDir,
        VALIDATION_TIMEOUT_MS,
      ),
    );
    steps.test = toStep(await runCommand("cargo", ["test"], projectDir, VALIDATION_TIMEOUT_MS));
  }
  return steps;
}

async function validatePythonProject(projectDir: string, options: ScaffbenchOptions) {
  const steps: Record<string, StepResult | undefined> = {};
  if (!existsSync(path.join(projectDir, "pyproject.toml"))) return steps;
  steps.install =
    steps.install ??
    toStep(await runCommand("uv", ["sync", "--all-extras"], projectDir, VALIDATION_TIMEOUT_MS));
  if (steps.install.exitCode !== 0 || steps.install.timedOut) return steps;
  const srcDir = existsSync(path.join(projectDir, "src")) ? "src/" : ".";
  steps.typecheck = toStep(
    await runCommand(
      "uv",
      ["run", "python", "-m", "compileall", "-q", srcDir],
      projectDir,
      VALIDATION_TIMEOUT_MS,
    ),
  );
  if (options.qualityGate) {
    steps.lint = toStep(
      await runCommand("uv", ["run", "ruff", "check", "."], projectDir, VALIDATION_TIMEOUT_MS),
    );
    // Read-only format check, for parity with the TS/Rust/Go gates (was missing).
    steps.format = toStep(
      await runCommand(
        "uv",
        ["run", "ruff", "format", "--check", "."],
        projectDir,
        VALIDATION_TIMEOUT_MS,
      ),
    );
    // pytest exit 5 = "no tests collected": a genuinely testless scaffold -> n/a
    // (excluded from Full), not a failure (the old bare pytest would fail it) and
    // not a pass. Any other non-zero stays a real test failure.
    const pytest = toStep(
      await runCommand("uv", ["run", "pytest"], projectDir, VALIDATION_TIMEOUT_MS),
    );
    steps.test = pytest.exitCode === 5 ? naStep("pytest (no tests collected)") : pytest;
  }
  return steps;
}

async function validateGoProject(projectDir: string, options: ScaffbenchOptions) {
  const steps: Record<string, StepResult | undefined> = {};
  if (!existsSync(path.join(projectDir, "go.mod"))) return steps;
  steps.install =
    steps.install ??
    toStep(await runCommand("go", ["mod", "tidy"], projectDir, VALIDATION_TIMEOUT_MS));
  if (steps.install.exitCode !== 0 || steps.install.timedOut) return steps;
  steps.build =
    steps.build ??
    toStep(await runCommand("go", ["build", "./..."], projectDir, VALIDATION_TIMEOUT_MS));
  if (options.qualityGate) {
    steps.lint = toStep(
      await runCommand("go", ["vet", "./..."], projectDir, VALIDATION_TIMEOUT_MS),
    );
    // Read-only format check, for parity with the other gates (was missing).
    // `gofmt -l .` lists unformatted files but exits 0 regardless, so treat any
    // listed file as a failure.
    const gofmt = await runCommand("gofmt", ["-l", "."], projectDir, VALIDATION_TIMEOUT_MS);
    const unformatted = gofmt.stdout.trim();
    steps.format = toStep(
      gofmt.exitCode === 0 && unformatted
        ? {
            ...gofmt,
            exitCode: 1,
            stderr: `gofmt: ${unformatted.split("\n").filter(Boolean).length} file(s) need formatting:\n${unformatted}`,
          }
        : gofmt,
    );
    // go test reports "no test files" and exits 0 for a testless scaffold, which
    // is an acceptable trivially-green test step (cf. cargo test). (TS/Python map
    // their testless idioms to n/a; the Full outcome is the same either way.)
    steps.test = toStep(
      await runCommand("go", ["test", "./..."], projectDir, VALIDATION_TIMEOUT_MS),
    );
  }
  return steps;
}

async function validateDotnetProject(projectDir: string, options: ScaffbenchOptions) {
  const steps: Record<string, StepResult | undefined> = {};
  const roots = await findDotnetRoots(projectDir);
  if (roots.length === 0) return steps;

  const serverRoot = roots.find((root) => root.endsWith(path.join("apps", "server"))) ?? roots[0];
  steps.dotnetRestore = toStep(
    await runCommand("dotnet", ["restore"], serverRoot, VALIDATION_TIMEOUT_MS),
  );
  steps.install = steps.install ?? steps.dotnetRestore;
  if (steps.dotnetRestore.exitCode !== 0 || steps.dotnetRestore.timedOut) return steps;
  steps.dotnetBuild = toStep(
    await runCommand("dotnet", ["build", "--no-restore"], serverRoot, VALIDATION_TIMEOUT_MS),
  );
  steps.build = steps.build ?? steps.dotnetBuild;
  if (options.qualityGate) {
    steps.test = toStep(
      await runCommand("dotnet", ["test", "--no-build"], serverRoot, VALIDATION_TIMEOUT_MS),
    );
  }
  return steps;
}

// Locate the build root for a non-TS ecosystem by its manifest file. Prefers a
// backend under apps/server (multi-ecosystem graph layout), else the shallowest
// match. Returns null when no manifest is present (the validator then no-ops).
async function findBuildRoot(
  projectDir: string,
  manifests: readonly string[],
): Promise<string | null> {
  const roots = new Set<string>();
  await walk(projectDir, async (filePath) => {
    if (manifests.includes(path.basename(filePath))) roots.add(path.dirname(filePath));
  });
  if (roots.size === 0) return null;
  const list = [...roots];
  return (
    list.find((root) => root.endsWith(path.join("apps", "server"))) ??
    list.sort((a, b) => a.length - b.length)[0]
  );
}

async function validateJavaProject(projectDir: string, options: ScaffbenchOptions) {
  const steps: Record<string, StepResult | undefined> = {};
  const root = await findBuildRoot(projectDir, ["pom.xml", "build.gradle", "build.gradle.kts"]);
  if (!root) return steps;
  // Prefer the project's wrapper (pins the build-tool version and works even
  // when the system binary is absent — e.g. gradle via ./gradlew); else the
  // system binary. Tests stay an advisory step under the quality gate so the
  // build verdict reflects compilation, not test outcomes.
  const hasPom = existsSync(path.join(root, "pom.xml"));
  const wrapper = hasPom ? "mvnw" : "gradlew";
  const usesWrapper = existsSync(path.join(root, wrapper));
  const [bin, buildArgs, testArgs] = hasPom
    ? ([
        usesWrapper ? "./mvnw" : "mvn",
        ["-q", "-B", "-DskipTests", "compile"],
        ["-q", "-B", "test"],
      ] as const)
    : ([
        usesWrapper ? "./gradlew" : "gradle",
        ["compileJava", "-x", "test", "--console=plain"],
        ["test", "--console=plain"],
      ] as const);
  steps.build = toStep(await runCommand(bin, [...buildArgs], root, VALIDATION_TIMEOUT_MS));
  steps.install = steps.install ?? steps.build; // deps resolve during the build
  if (steps.build.exitCode !== 0 || steps.build.timedOut) return steps;
  if (options.qualityGate) {
    steps.test = toStep(await runCommand(bin, [...testArgs], root, VALIDATION_TIMEOUT_MS));
  }
  return steps;
}

async function validateElixirProject(projectDir: string, options: ScaffbenchOptions) {
  const steps: Record<string, StepResult | undefined> = {};
  const root = await findBuildRoot(projectDir, ["mix.exs"]);
  if (!root) return steps;
  steps.install = toStep(await runCommand("mix", ["deps.get"], root, VALIDATION_TIMEOUT_MS));
  if (steps.install.exitCode !== 0 || steps.install.timedOut) return steps;
  steps.build = toStep(await runCommand("mix", ["compile"], root, VALIDATION_TIMEOUT_MS));
  if (steps.build.exitCode !== 0 || steps.build.timedOut) return steps;
  if (options.qualityGate) {
    // Read-only format check, for parity with the other ecosystem gates.
    steps.format = toStep(
      await runCommand("mix", ["format", "--check-formatted"], root, VALIDATION_TIMEOUT_MS),
    );
    steps.test = toStep(await runCommand("mix", ["test"], root, VALIDATION_TIMEOUT_MS));
  }
  return steps;
}

async function hasDotnetProject(projectDir: string) {
  return (await findDotnetRoots(projectDir)).length > 0;
}

async function findDotnetRoots(projectDir: string) {
  const roots = new Set<string>();
  await walk(projectDir, async (filePath) => {
    if (filePath.endsWith(".csproj")) roots.add(path.dirname(filePath));
  });
  return [...roots];
}

function toStep(result: CommandResult): StepResult {
  const { stdout: _stdout, stderr: _stderr, ...step } = result;
  return step;
}

// A quality-gate check that SHOULD have run but no tool was configured/detected.
// NOT a pass — it disqualifies a Full pass. exitCode null (never 0) so the
// steps.every(exitCode === 0) scoring can't read it as green (the Finding-1 bug).
function skipStep(command: string): StepResult {
  return {
    command,
    exitCode: null,
    timedOut: false,
    status: "skip",
    durationMs: 0,
    stdoutTail: "skipped (tool not configured)",
    stderrTail: "",
  };
}

// A check that is legitimately not applicable (e.g. a scaffold with genuinely no
// tests, or a route-check with no dev server). Excluded from scoring — neither
// pass nor fail. exitCode null so it can never read as a green run either.
function naStep(command: string): StepResult {
  return {
    command,
    exitCode: null,
    timedOut: false,
    status: "na",
    durationMs: 0,
    stdoutTail: "n/a",
    stderrTail: "",
  };
}

// Resolve a project-local CLI binary (node_modules/.bin/<name>) so the gate runs
// the version the project pins, not a bunx-latest download (which drifts the
// verdict run-to-run). Returns null if the tool is not installed in the project.
function localBin(projectDir: string, name: string): string | null {
  const p = path.join(projectDir, "node_modules", ".bin", name);
  return existsSync(p) ? p : null;
}

async function readPackageScripts(packageJsonPath: string) {
  try {
    const parsed = JSON.parse(await readFile(packageJsonPath, "utf8"));
    return (parsed.scripts ?? {}) as Record<string, string>;
  } catch {
    return {};
  }
}

/** Decide how a TS project is type-checked: prefer its own script, else fall
 * back to a direct `tsc --noEmit` when a tsconfig exists, so a project cannot
 * dodge type-checking by omitting the script. Returns null when there is
 * genuinely nothing to type-check (no script and no tsconfig). */
export function typecheckGate(
  scripts: Record<string, string>,
  hasTsconfig: boolean,
): "check-types" | "typecheck" | "tsc" | null {
  if (scripts["check-types"]) return "check-types";
  if (scripts.typecheck) return "typecheck";
  if (hasTsconfig) return "tsc";
  return null;
}

/**
 * Score the libraries actually wired into the generated tree (dependency
 * declarations + source imports + required files). This is the primary
 * "right libs" signal for EVERY creation path, so a broken or empty generated
 * package (e.g. a db package that declares nothing and is imported nowhere) no
 * longer earns full stack credit on the strength of bts.jsonc alone.
 */
export async function scoreArtifact(spec: BenchmarkSpec, projectDir: string): Promise<StackScore> {
  return scoreMarkers(spec, await collectProjectIndex(projectDir));
}

/**
 * Two complementary stack signals:
 * - `artifact`: what is actually wired in the emitted project (primary).
 * - `faithfulness`: assisted paths only — whether Better-Fullstack's own
 *   bts.jsonc echoes the requested stack. A generator-honesty diagnostic, not
 *   the capability metric. A high faithfulness with a low artifact score is the
 *   signature of a generator that recorded a library it never wired.
 */
export async function scoreProject(
  spec: BenchmarkSpec,
  projectDir: string,
  promptStyle: PromptStyle = "explicit",
): Promise<{ artifact: StackScore; faithfulness?: StackScore; acceptance?: StackScore }> {
  const index = await collectProjectIndex(projectDir);
  const artifact = scoreMarkers(spec, index);
  const btsPath = path.join(projectDir, "bts.jsonc");
  const faithfulness = existsSync(btsPath)
    ? scoreBts(spec, await readFile(btsPath, "utf8"))
    : undefined;
  // Discovery lane only: how many capabilities are satisfied by ANY accepted
  // library, so reasonable alternatives are credited (vs. the strict markers).
  const acceptance =
    promptStyle === "natural" && spec.acceptanceSets
      ? scoreAcceptance(spec.acceptanceSets, index)
      : undefined;
  return { artifact, faithfulness, acceptance };
}

function scoreAcceptance(
  acceptanceSets: Record<string, readonly string[]>,
  index: ProjectIndex,
): StackScore {
  const deps = [...index.dependencies];
  const files = [...index.files];
  const capabilities = Object.entries(acceptanceSets);
  const misses: string[] = [];
  let matched = 0;
  for (const [capability, accepted] of capabilities) {
    const satisfied = accepted.some((pattern) => acceptancePatternMatch(pattern, deps, files));
    if (satisfied) matched += 1;
    else misses.push(capability);
  }
  return scoreFromCounts(matched, capabilities.length, misses);
}

/**
 * Match an acceptance pattern precisely — NOT a substring over all project text,
 * which would credit `ai` from `tailwindcss` or `vite` from `vitest`. A path-like
 * pattern (starts with `.`) matches a file path; otherwise it matches a dependency
 * exactly or as a scoped-package prefix (`@ai-sdk` → `@ai-sdk/react`).
 */
function acceptancePatternMatch(
  pattern: string,
  deps: readonly string[],
  files: readonly string[],
): boolean {
  if (pattern.startsWith(".")) {
    return files.some((file) => file === pattern || file.includes(`${pattern}/`));
  }
  // A pattern already ending in "/" is an explicit scope prefix (e.g. "@auth/"
  // → "@auth/core"); don't append a second slash.
  const prefix = pattern.endsWith("/") ? pattern : `${pattern}/`;
  return deps.some((dep) => dep === pattern || dep.startsWith(prefix));
}

export function scoreBts(spec: BenchmarkSpec, raw: string): StackScore {
  const config = parseJsonc(raw);
  if (!config) return emptyScore(spec);

  if (spec.expectedParts?.length) {
    return scoreStackParts(spec, config);
  }

  const misses: string[] = [];
  let matched = 0;
  let total = 0;

  for (const [key, expected] of Object.entries(spec.expectedConfig ?? {})) {
    const expectedValues = Array.isArray(expected) ? expected : [expected];
    const actual = config[key];
    total += expectedValues.length;
    if (Array.isArray(actual)) {
      for (const expectedValue of expectedValues) {
        if (actual.includes(expectedValue)) matched += 1;
        else misses.push(`${key}: missing ${expectedValue}`);
      }
    } else {
      const expectedValue = expectedValues[0];
      if (actual === expectedValue) matched += 1;
      else misses.push(`${key}: expected ${expectedValue}, got ${String(actual)}`);
    }
  }

  for (const addon of spec.expectedAddons ?? []) {
    total += 1;
    if (Array.isArray(config.addons) && config.addons.includes(addon)) matched += 1;
    else misses.push(`addons: missing ${addon}`);
  }

  return scoreFromCounts(matched, total, misses);
}

function scoreStackParts(spec: BenchmarkSpec, config: Record<string, any>): StackScore {
  const actualParts = new Set(formatConfigStackParts(config.stackParts ?? []));
  const misses: string[] = [];
  let matched = 0;
  let total = 0;

  for (const expectedPart of spec.expectedParts ?? []) {
    total += 1;
    if (actualParts.has(expectedPart)) matched += 1;
    else misses.push(`stackParts: missing ${expectedPart}`);
  }

  for (const addon of spec.expectedAddons ?? []) {
    total += 1;
    if (Array.isArray(config.addons) && config.addons.includes(addon)) matched += 1;
    else misses.push(`addons: missing ${addon}`);
  }

  return scoreFromCounts(matched, total, misses);
}

function formatConfigStackParts(stackParts: readonly Record<string, any>[]) {
  const byId = new Map(stackParts.map((part) => [part.id, part]));
  return stackParts
    .filter((part) => part.source !== "provided")
    .map((part) => {
      if (!part.ownerPartId) return `${part.role}:${part.ecosystem}:${part.toolId}`;
      const owner = byId.get(part.ownerPartId);
      const ownerRole = owner?.role ?? part.ownerPartId.split(":")[0] ?? "backend";
      return `${ownerRole}.${part.role}:${part.ecosystem}:${part.toolId}`;
    });
}

function parseJsonc(raw: string) {
  const withoutLineComments = raw
    .split("\n")
    .filter((line) => !line.trim().startsWith("//"))
    .join("\n");
  const withoutTrailingCommas = withoutLineComments.replace(/,\s*([}\]])/g, "$1");
  try {
    return JSON.parse(withoutTrailingCommas);
  } catch {
    return null;
  }
}

function scoreMarkers(spec: BenchmarkSpec, index: ProjectIndex): StackScore {
  const misses: string[] = [];
  let matched = 0;

  for (const marker of spec.strictMarkers) {
    const depsMatch = !marker.deps || marker.deps.every((dep) => index.dependencies.has(dep));
    const sourceMatch =
      !marker.source || marker.source.every((pattern) => index.sourceText.includes(pattern));
    const textMatch =
      !marker.text || marker.text.every((pattern) => index.allText.includes(pattern));
    const filesMatch = !marker.files || marker.files.every((filePath) => index.files.has(filePath));
    const forbiddenDepsMatch =
      !marker.forbiddenDeps || marker.forbiddenDeps.every((dep) => !index.dependencies.has(dep));
    const forbiddenTextMatch =
      !marker.forbiddenText ||
      marker.forbiddenText.every((pattern) => !index.allText.includes(pattern));

    if (
      depsMatch &&
      sourceMatch &&
      textMatch &&
      filesMatch &&
      forbiddenDepsMatch &&
      forbiddenTextMatch
    ) {
      matched += 1;
    } else {
      misses.push(marker.id);
    }
  }

  return scoreFromCounts(matched, spec.strictMarkers.length, misses);
}

function scoreFromCounts(matched: number, total: number, misses: string[]): StackScore {
  return {
    matched,
    total,
    percent: total > 0 ? Math.round((matched / total) * 100) : 0,
    misses,
  };
}

function emptyArtifactScore(spec: BenchmarkSpec): StackScore {
  return {
    matched: 0,
    total: spec.strictMarkers.length,
    percent: 0,
    misses: ["project not found or unscorable"],
  };
}

function emptyAcceptanceScore(spec: BenchmarkSpec): StackScore {
  return {
    matched: 0,
    total: Object.keys(spec.acceptanceSets ?? {}).length,
    percent: 0,
    misses: ["project not found"],
  };
}

function emptyScore(spec: BenchmarkSpec): StackScore {
  const total =
    (spec.expectedParts?.length ?? 0) +
    Object.values(spec.expectedConfig ?? {}).reduce(
      (sum, value) => sum + (Array.isArray(value) ? value.length : 1),
      0,
    ) +
    (spec.expectedAddons?.length ?? 0);
  return {
    matched: 0,
    total: total || spec.strictMarkers.length,
    percent: 0,
    misses: ["project not found or unscorable"],
  };
}

async function collectProjectIndex(projectDir: string): Promise<ProjectIndex> {
  const index: ProjectIndex = {
    dependencies: new Set(),
    files: new Set(),
    packageText: "",
    sourceText: "",
    configText: "",
    allText: "",
  };

  await walk(projectDir, async (filePath) => {
    const relativePath = path.relative(projectDir, filePath);
    index.files.add(relativePath);
    if (
      !/(package\.json|Cargo\.toml|go\.mod|pyproject\.toml|pom\.xml|mix\.exs|\.csproj|\.gradle|\.kts|\.ts|\.tsx|\.js|\.jsx|\.mjs|\.cjs|\.rs|\.go|\.py|\.cs|\.java|\.kt|\.exs|\.ex|\.heex|\.json|\.toml|\.yml|\.yaml)$/.test(
        filePath,
      )
    ) {
      return;
    }
    const info = await stat(filePath);
    if (info.size > 250_000) return;
    const content = await readFile(filePath, "utf8");
    index.allText += `\n${content}`;

    if (path.basename(filePath) === "package.json") {
      index.packageText += `\n${content}`;
      collectPackageDependencies(index.dependencies, content);
      return;
    }

    if (/\.(ts|tsx|js|jsx|mjs|cjs|rs|go|py|cs)$/.test(filePath)) {
      index.sourceText += `\n${content}`;
      return;
    }

    index.configText += `\n${content}`;
  });

  return index;
}

function collectPackageDependencies(target: Set<string>, rawPackageJson: string) {
  try {
    const parsed = JSON.parse(rawPackageJson);
    for (const section of [
      "dependencies",
      "devDependencies",
      "peerDependencies",
      "optionalDependencies",
    ]) {
      for (const dep of Object.keys(parsed[section] ?? {})) {
        target.add(dep);
      }
    }
  } catch {}
}

async function walk(dir: string, visit: (filePath: string) => Promise<void>) {
  const skip = new Set([
    "node_modules",
    ".git",
    "dist",
    "build",
    ".next",
    ".turbo",
    "coverage",
    "target",
    ".venv",
    "bin",
    "obj",
  ]);
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    if (skip.has(entry.name)) continue;
    const next = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(next, visit);
    } else if (entry.isFile()) {
      await visit(next);
    }
  }
}

/** Extract the agent's tool calls from a stream-json transcript (assistant
 * `tool_use` blocks). Returns [] for non-stream output, so callers degrade to
 * the bts.jsonc safety net rather than crashing. */
export function extractToolUses(stdout: string): { name: string; command?: string }[] {
  const uses: { name: string; command?: string }[] = [];
  for (const line of stdout.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("{")) continue;
    let event: any;
    try {
      event = JSON.parse(trimmed);
    } catch {
      continue;
    }
    // Claude stream-json: message.content[] blocks of type "tool_use".
    const content = event?.message?.content;
    if (Array.isArray(content)) {
      for (const block of content) {
        if (block?.type === "tool_use" && typeof block.name === "string") {
          const command =
            typeof block.input?.command === "string" ? block.input.command : undefined;
          uses.push({ name: block.name, command });
        }
      }
    }
    // Codex JSONL: item.completed events carry mcp_tool_call (name in `tool`) and
    // command_execution (shell string in `command`) items.
    if (event?.type === "item.completed" && event.item) {
      const item = event.item;
      if (item.type === "mcp_tool_call" && typeof item.tool === "string") {
        uses.push({ name: item.tool });
      } else if (item.type === "command_execution" && typeof item.command === "string") {
        uses.push({ name: "bash", command: item.command });
      }
    }
    // opencode / Kilo Code JSONL: a part of type "tool" carries the tool name
    // (part.tool, e.g. "bash" or "better-fullstack_bfs_create_project") and, for
    // the bash tool, the shell command in state.input.command.
    if (event?.part?.type === "tool" && typeof event.part.tool === "string") {
      const command =
        typeof event.part.state?.input?.command === "string"
          ? event.part.state.input.command
          : undefined;
      uses.push({ name: event.part.tool, command });
    }
  }
  return uses;
}

export async function scoreToolCompliance(
  pathMode: CreationPath,
  projectDir: string | null,
  claude: CommandResult,
): Promise<ToolCompliance> {
  const toolUses = extractToolUses(claude.stdout);
  const hasBtsConfig = projectDir ? existsSync(path.join(projectDir, "bts.jsonc")) : false;

  // Grounded in the actual tool trajectory, not a grep of the result envelope.
  const usedBfsCreate = toolUses.some((use) => /bfs_create_project/i.test(use.name));
  const usedAnyBfsTool = toolUses.some((use) => /bfs_/i.test(use.name));
  const bashCommands = toolUses
    .filter((use) => /(^|_)bash$/i.test(use.name))
    .map((use) => (use.command ?? "").toLowerCase());
  const isBfsCli = (cmd: string) => /create\s+better-fullstack|create-better-fullstack/.test(cmd);
  const ranBfsCli = bashCommands.some(isBfsCli);
  // Order matters: the FIRST real scaffold invocation must be the dry-run, so a
  // transcript that writes for real and only dry-runs afterward fails the check.
  // --help/--version probes inspect flags without scaffolding, so they don't count.
  const bfsScaffoldCommands = bashCommands.filter(
    (cmd) => isBfsCli(cmd) && !/--help|--version/.test(cmd),
  );
  const dryRanFirst =
    bfsScaffoldCommands.length > 0 && bfsScaffoldCommands[0].includes("--dry-run");

  const checks: CommandDisciplineCheck[] = [];
  if (pathMode === "prompt") {
    checks.push({
      id: "no-bf-config",
      status: hasBtsConfig ? "fail" : "pass",
      detail: "prompt-only must not produce bts.jsonc",
    });
    checks.push({
      id: "no-bf-tool",
      status: usedAnyBfsTool || ranBfsCli ? "fail" : "pass",
      detail: "prompt-only must not call a Better-Fullstack MCP tool or CLI",
    });
  } else if (pathMode === "cli") {
    checks.push({
      id: "used-cli",
      status: ranBfsCli || hasBtsConfig ? "pass" : "fail",
      detail: "CLI path must run bun create better-fullstack",
    });
    checks.push({
      id: "dry-run-first",
      status: dryRanFirst ? "pass" : "fail",
      detail: "CLI path must dry-run before writing",
    });
    checks.push({
      id: "no-mcp",
      status: usedBfsCreate ? "fail" : "pass",
      detail: "CLI path must not use MCP creation",
    });
  } else {
    checks.push({
      id: "used-mcp",
      status: usedBfsCreate || hasBtsConfig ? "pass" : "fail",
      detail: "MCP path must call bfs_create_project",
    });
    checks.push({
      id: "no-cli-create",
      status: ranBfsCli ? "fail" : "pass",
      detail: "MCP path must not run bun create better-fullstack",
    });
  }

  // Every check is now definitive (pass/fail) — none are dropped from the score.
  const score = checks.filter((check) => check.status === "pass").length;
  return { score, total: checks.length, checks };
}

// A step is "advisory" (quality tier) when it measures polish rather than
// whether the project works: lint/format/test/doctor/route. These mirror the
// solvability gate's ADVISORY_STEPS. CORE steps (install/build/typecheck/native
// compile) decide whether a scaffold actually builds and runs — a formatting
// nit or a style-lint warning must never read as a broken project.
const ADVISORY_STEP_KEYS = new Set(["lint", "format", "test", "doctor", "route"]);
function isAdvisoryStep(name: string) {
  return ADVISORY_STEP_KEYS.has(name);
}

// Applicable steps (a real check that should be judged) whose key matches the
// predicate. "na" steps (e.g. a genuinely testless scaffold) are excluded —
// neither pass nor fail.
function applicableSteps(result: RunResult, predicate: (name: string) => boolean): StepResult[] {
  return Object.entries(result.validation.steps)
    .filter((entry): entry is [string, StepResult] => Boolean(entry[1]))
    .filter(([name, step]) => step.status !== "na" && predicate(name))
    .map(([, step]) => step);
}

// A "skip" (a check that should have run but no tool was configured) is NOT a
// pass — it disqualifies the tier. (Pre-fix, skips carried exitCode 0 and passed
// silently: the Finding-1 inflation.)
function stepsAllGreen(steps: readonly StepResult[]) {
  return steps.every(
    (step) => step.status !== "skip" && step.exitCode === 0 && !step.timedOut && !step.spawnError,
  );
}

/**
 * Core pass — the headline "does it actually build and run?" signal, and the
 * basis of the reported pass rate / classifyOutcome. Requires every applicable
 * CORE step (install/build/typecheck/native compile) to be a real green run;
 * advisory polish checks (lint/format/test/doctor/route) are excluded, so a
 * project that builds and runs but is mis-formatted is NOT scored as broken.
 * This matches the solvability gate's contract exactly.
 */
export function validationPassed(result: RunResult) {
  if (result.validation.deferred) return false;
  if (!result.validation.projectExists) return false;
  const core = applicableSteps(result, (name) => !isAdvisoryStep(name));
  // A run with zero applicable CORE steps must NOT pass vacuously (`[].every(...)`
  // is true): the agent left a directory but no recognizable manifest, so no
  // build/typecheck validator fired — an unbuildable project, not a success.
  if (core.length === 0) return false;
  return stepsAllGreen(core);
}

/**
 * Quality pass — the stricter, advisory tier: core passed AND every applicable
 * lint/format/test/doctor/route check is green. Reported as a SEPARATE signal
 * (qualityPassRate); it never demotes the core pass rate, so formatting is a
 * quality metric rather than a brokenness verdict.
 */
export function qualityPassed(result: RunResult) {
  if (!validationPassed(result)) return false;
  return stepsAllGreen(applicableSteps(result, isAdvisoryStep));
}

function isBudgetExhausted(terminalReason: string | undefined) {
  return terminalReason ? /budget|cost[_-]?limit|max[_-]?cost|spend/i.test(terminalReason) : false;
}

/**
 * Three-way run outcome so the headline pass rate reflects model capability,
 * not the test machine. An "infra-inconclusive" run is one where the harness or
 * environment — not the model — prevented a clean measurement (a missing
 * toolchain binary, a validation step that timed out, an exhausted token
 * budget, or a generation that crashed without producing anything). These are
 * excluded from the pass-rate denominator by `aggregateBy`.
 */
export function classifyOutcome(result: RunResult): RunOutcome {
  if (result.validation.deferred) return "infra-inconclusive";
  if (isInfraInconclusive(result)) return "infra-inconclusive";
  return validationPassed(result) ? "success" : "model-failure";
}

function isInfraInconclusive(result: RunResult): boolean {
  // NOTE: a generation timeout (claude.timedOut) is intentionally NOT here — an
  // agent that cannot finish within the generous gen budget is a real failure
  // (cf. SWE-bench, which scores agent-loop timeouts as unresolved). Only
  // environment/harness problems below are excluded from the pass denominator.
  if (isBudgetExhausted(result.claude.terminalReason)) return true;
  // claude crashed/blipped (e.g. MCP startup failure) without producing anything
  if (
    result.claude.exitCode !== 0 &&
    !result.validation.projectExists &&
    !result.claude.outputTokens
  ) {
    return true;
  }
  for (const step of Object.values(result.validation.steps)) {
    if (!step) continue;
    if (step.timedOut) return true;
    if (step.spawnError) return true; // validator binary itself could not be spawned
  }
  return false;
}

export function deriveFailureTags(result: RunResult): FailureTag[] {
  const tags = new Set<FailureTag>();
  if (result.validation.deferred) tags.add("validation-deferred");
  if (result.claude.timedOut) tags.add("claude-timeout");
  if (result.claude.exitCode !== 0) tags.add("claude-error");
  if (isBudgetExhausted(result.claude.terminalReason)) tags.add("budget-exhausted");
  if (!result.validation.projectExists) tags.add("project-not-found");
  if (result.stackScore.matched < result.stackScore.total) tags.add("stack-mismatch");
  // bts.jsonc records the full stack but the artifact does not wire it (e.g. an
  // empty generated package): the generator claimed more than it produced.
  if (
    result.generatorFaithfulness &&
    result.generatorFaithfulness.percent === 100 &&
    result.stackScore.percent < 100
  ) {
    tags.add("stack-unwired");
  }
  if (result.toolCompliance.checks.some((check) => check.status === "fail")) {
    tags.add("tool-violation");
    tags.add("command-discipline");
  }

  for (const [name, step] of Object.entries(result.validation.steps)) {
    if (!step || (step.exitCode === 0 && !step.timedOut)) continue;
    // Each failing step gets its specific tag below (lint-failed/format-failed/…)
    // for visibility, but the generic "validation-failed" (= broken) is added
    // ONCE, at the end, keyed strictly to a CORE failure — so a cosmetic
    // lint/format failure is surfaced without flagging the project as broken.
    if (step.spawnError) {
      // The validator binary itself could not be spawned (e.g. cargo/uv/go/dotnet
      // not on PATH): an environment problem, not a model-authored break. A child
      // process that ran and exited 127 (e.g. a generated `bun run build` whose
      // script references a missing bin) is NOT this — it falls through below.
      tags.add("toolchain-missing");
      continue;
    }
    if (name.includes("install") || name.includes("restore")) tags.add("install-failed");
    if (name.includes("build") || name.includes("cargoCheck")) tags.add("build-failed");
    if (name.includes("typecheck")) tags.add("typecheck-failed");
    if (name.includes("lint")) tags.add("lint-failed");
    if (name.includes("format")) tags.add("format-failed");
    if (name.includes("test")) tags.add("test-failed");
    if (name.includes("doctor")) tags.add("doctor-failed");
    if (name.includes("route")) tags.add("route-failed");
  }

  if (!result.validation.deferred && !validationPassed(result)) tags.add("validation-failed");
  return [...tags].sort();
}

export function aggregateResults(results: readonly RunResult[]) {
  return {
    bySpecCell: aggregateBy(results, (result) =>
      [result.specId, result.model, result.effort, result.path].join("|"),
    ),
    leaderboard: aggregateBy(results, (result) =>
      [result.model, result.effort, result.path].join("|"),
    ),
  };
}

function aggregateBy(
  results: readonly RunResult[],
  keyFor: (result: RunResult) => string,
): SummaryAggregate[] {
  const groups = new Map<string, RunResult[]>();
  for (const result of results) {
    const key = keyFor(result);
    groups.set(key, [...(groups.get(key) ?? []), result]);
  }
  return [...groups.entries()]
    .map(([key, group]) => {
      const first = group[0];
      const scored = group.filter((result) => classifyOutcome(result) !== "infra-inconclusive");
      const inconclusiveCount = group.length - scored.length;
      const passCount = scored.filter(validationPassed).length;
      const qualityPassCount = scored.filter(qualityPassed).length;
      const ci = wilsonInterval(passCount, scored.length);

      // Per-spec macro statistics: treat each spec as a unit rather than pooling
      // heterogeneous-difficulty specs into one binomial (which understates
      // variance). pass@k / pass^k summarise reliability across repeats.
      // Track total repeats (from the full group) alongside scored/pass so that
      // pass^k cannot be overstated: a spec with one passing scored repeat and
      // the rest infra-inconclusive must NOT count as "passed every repeat".
      const bySpec = new Map<string, { total: number; scored: number; pass: number }>();
      for (const result of group) {
        const entry = bySpec.get(result.specId) ?? { total: 0, scored: 0, pass: 0 };
        entry.total += 1;
        if (classifyOutcome(result) !== "infra-inconclusive") {
          entry.scored += 1;
          if (validationPassed(result)) entry.pass += 1;
        }
        bySpec.set(result.specId, entry);
      }
      const specEntries = [...bySpec.values()];
      // Macro pass rate averages only specs that were actually measured.
      const measuredSpecs = specEntries.filter((entry) => entry.scored > 0);
      const macroPassRate = average(
        measuredSpecs.map((entry) => (entry.pass / entry.scored) * 100),
      );
      // pass^k: passed on EVERY repeat (all repeats measured and passing).
      const passAllSpecs = specEntries.filter((entry) => entry.pass === entry.total).length;
      // pass@k: passed on at least one repeat.
      const passAnySpecs = specEntries.filter((entry) => entry.pass > 0).length;

      const stackPercent = average(group.map((result) => result.stackScore.percent));
      const commandDisciplinePercent = average(
        group.map((result) =>
          result.toolCompliance.total > 0
            ? Math.round((result.toolCompliance.score / result.toolCompliance.total) * 100)
            : 0,
        ),
      );
      const index = Math.round(
        SCAFFBENCH_INDEX_WEIGHTS.validation * macroPassRate +
          SCAFFBENCH_INDEX_WEIGHTS.wiredLibs * stackPercent +
          SCAFFBENCH_INDEX_WEIGHTS.discipline * commandDisciplinePercent,
      );
      const durations = group.map((result) => result.claude.durationMs);

      return {
        key,
        specId: key.startsWith(first.specId) ? first.specId : undefined,
        model: first.model,
        effort: first.effort,
        effectiveReasoning: first.effectiveReasoning,
        path: first.path,
        runs: group.length,
        scoredRuns: scored.length,
        inconclusiveCount,
        passCount,
        passRate: scored.length > 0 ? Math.round((passCount / scored.length) * 100) : 0,
        qualityPassCount,
        qualityPassRate:
          scored.length > 0 ? Math.round((qualityPassCount / scored.length) * 100) : 0,
        passCi95: ci,
        ciReportable: scored.length >= MIN_CI_RUNS,
        specCount: specEntries.length,
        macroPassRate,
        passAnySpecs,
        passAllSpecs,
        stackPercent,
        faithfulnessPercent: maybeAverage(
          group.map((result) => result.generatorFaithfulness?.percent),
        ),
        acceptancePercent: maybeAverage(group.map((result) => result.acceptanceScore?.percent)),
        commandDisciplinePercent,
        index,
        avgDurationMs: average(durations),
        medianDurationMs: percentile(durations, 50),
        p95DurationMs: percentile(durations, 95),
        avgOutputTokens: maybeAverage(group.map((result) => result.claude.outputTokens)),
        avgCostUsd: maybeAveragePrecise(group.map((result) => result.claude.totalCostUsd)),
        failureTags: countFailureTags(group),
      };
    })
    .sort(
      (a, b) =>
        b.index - a.index || b.macroPassRate - a.macroPassRate || a.avgDurationMs - b.avgDurationMs,
    );
}

function wilsonInterval(successes: number, total: number) {
  if (total === 0) return { low: 0, high: 0 };
  const z = 1.96;
  const p = successes / total;
  const denom = 1 + (z * z) / total;
  const center = p + (z * z) / (2 * total);
  const margin = z * Math.sqrt((p * (1 - p) + (z * z) / (4 * total)) / total);
  return {
    low: Math.max(0, Math.round(((center - margin) / denom) * 100)),
    high: Math.min(100, Math.round(((center + margin) / denom) * 100)),
  };
}

function average(values: readonly number[]) {
  if (values.length === 0) return 0;
  return Math.round(averagePrecise(values));
}

/** Unrounded mean — used for sub-unit quantities like USD cost, where rounding
 * to a whole number before formatting would print a $0.40 mean as `0.000`. */
function averagePrecise(values: readonly number[]) {
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

/** Nearest-rank percentile (p in 0..100), rounded. Wall-clock and cost move with
 * provider load, so median/p95 are reported alongside the mean. */
function percentile(values: readonly number[], p: number) {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const rank = Math.ceil((p / 100) * sorted.length);
  const index = Math.min(sorted.length - 1, Math.max(0, rank - 1));
  return Math.round(sorted[index] ?? 0);
}

function maybeAverage(values: readonly (number | undefined)[]) {
  const present = values.filter((value): value is number => typeof value === "number");
  return present.length > 0 ? average(present) : undefined;
}

function maybeAveragePrecise(values: readonly (number | undefined)[]) {
  const present = values.filter((value): value is number => typeof value === "number");
  return present.length > 0 ? averagePrecise(present) : undefined;
}

function countFailureTags(group: readonly RunResult[]) {
  const counts: Record<string, number> = {};
  for (const result of group) {
    for (const tag of result.failureTags) {
      counts[tag] = (counts[tag] ?? 0) + 1;
    }
  }
  return counts;
}

export async function writeSummary(
  outDir: string,
  results: readonly RunResult[],
  options: ScaffbenchOptions,
  specs: readonly BenchmarkSpec[],
  metadata: Record<string, unknown>,
) {
  const { listSpecs, writeMatrixOnly, ...summaryOptions } = options;
  void listSpecs;
  void writeMatrixOnly;
  const summary: ScaffbenchSummary = {
    harnessVersion: HARNESS_VERSION,
    generatedAt: new Date().toISOString(),
    options: summaryOptions,
    metadata,
    specs: [...specs],
    aggregates: aggregateResults(results),
    results: [...results],
  };
  await writeFile(path.join(outDir, "summary.json"), `${JSON.stringify(summary, null, 2)}\n`);
  await writeFile(path.join(outDir, "summary.md"), renderMarkdown(summary));
}

export function renderMarkdown(summary: ScaffbenchSummary) {
  const rows = summary.results
    .map((result) =>
      [
        result.specId,
        result.trial,
        result.effort,
        result.effectiveReasoning ?? "",
        result.model,
        result.path,
        formatOutcome(classifyOutcome(result)),
        result.failureTags.join(", "),
        result.claude.exitCode ?? "null",
        formatSeconds(result.claude.durationMs),
        result.claude.outputTokens ?? "",
        result.claude.totalCostUsd?.toFixed(3) ?? "",
        result.stackScore.percent,
        `${result.stackScore.matched}/${result.stackScore.total}`,
        result.generatorFaithfulness
          ? `${result.generatorFaithfulness.matched}/${result.generatorFaithfulness.total}`
          : "—",
        result.acceptanceScore
          ? `${result.acceptanceScore.matched}/${result.acceptanceScore.total}`
          : "—",
        result.validation.install?.exitCode ?? "",
        result.validation.build?.exitCode ?? "",
        result.validation.checkTypes?.exitCode ?? "",
        result.validation.lint?.exitCode ?? "",
        result.validation.test?.exitCode ?? "",
        result.validation.deferred
          ? "deferred"
          : result.validation.cacheHit
            ? "hit"
            : result.validation.cacheKey
              ? "miss"
              : "",
      ].join(" | "),
    )
    .join("\n");

  const aggregateRows = summary.aggregates.leaderboard
    .map((aggregate) =>
      [
        aggregate.model,
        aggregate.effort,
        aggregate.effectiveReasoning ?? "",
        aggregate.path,
        aggregate.index,
        `${aggregate.passCount}/${aggregate.scoredRuns}`,
        `${aggregate.qualityPassRate}%`,
        aggregate.inconclusiveCount > 0 ? `${aggregate.inconclusiveCount}/${aggregate.runs}` : "0",
        `${aggregate.macroPassRate}%`,
        `${aggregate.passAnySpecs}/${aggregate.specCount}`,
        `${aggregate.passAllSpecs}/${aggregate.specCount}`,
        aggregate.ciReportable
          ? `${aggregate.passRate}% (${aggregate.passCi95.low}-${aggregate.passCi95.high})`
          : `n<${MIN_CI_RUNS}`,
        `${aggregate.stackPercent}%`,
        aggregate.faithfulnessPercent !== undefined ? `${aggregate.faithfulnessPercent}%` : "—",
        aggregate.acceptancePercent !== undefined ? `${aggregate.acceptancePercent}%` : "—",
        `${aggregate.commandDisciplinePercent}%`,
        `${formatSeconds(aggregate.medianDurationMs)} / ${formatSeconds(aggregate.p95DurationMs)}`,
        aggregate.avgOutputTokens ?? "",
        aggregate.avgCostUsd?.toFixed(3) ?? "",
        formatFailureTags(aggregate.failureTags),
      ].join(" | "),
    )
    .join("\n");

  return `# ScaffBench 2 Run

Harness: ${summary.harnessVersion}
Agent: ${agentLabelForModel(summary.options.model)} (single agent; single model family per row)
Specs: ${summary.specs.map((spec) => spec.id).join(", ")}
Repeats: ${summary.options.repeats}
Prompt style: ${summary.options.promptStyle}

## Path × effort summary

This is an ablation across creation paths and reasoning effort for one agent
(${agentLabelForModel(summary.options.model)}), not a cross-vendor leaderboard. Pass rate is over *scored* runs:
infra-inconclusive runs (missing toolchain, validation timeout, exhausted token
budget, or a crash with no output) are excluded from the denominator.

"Pass@1" is the CORE pass rate — install + build + typecheck + native compile,
i.e. does the project actually build and run. "Quality" is the stricter advisory
tier (core + lint/format/test/doctor/route): a project can be Pass@1-green but
Quality-red because it is mis-formatted or a style-lint warns. Formatting is a
quality metric, never a brokenness verdict, so it does not move Pass@1. "Wired
libs" is scored from the generated artifact (deps + imports + files);
"Faithful" is the assisted-path bts.jsonc-vs-requested diagnostic.

Reliability is reported per spec, not pooled: "Macro" is the mean of per-spec
pass rates; "pass@k" counts specs solved on at least one repeat and "pass^k"
specs solved on every repeat. The Wilson "CI95" is shown only when a cell has
≥ ${MIN_CI_RUNS} scored runs (below that it reads \`n<${MIN_CI_RUNS}\`, since e.g. 3/3 and 0/3
intervals overlap and the interval is not informative).

"Index" is the single rankable 0-100 composite the table is sorted by:
${Math.round(SCAFFBENCH_INDEX_WEIGHTS.validation * 100)}% macro validation + ${Math.round(SCAFFBENCH_INDEX_WEIGHTS.wiredLibs * 100)}% wired-libs + ${Math.round(SCAFFBENCH_INDEX_WEIGHTS.discipline * 100)}% command discipline,
weighted toward the least saturated signal. Latency is median / p95 (wall-clock
moves with provider load, so the mean alone is misleading over small samples).

| Model | Effort | Effective reasoning | Path | Index | Pass@1 | Quality | Inconclusive | Macro | pass@k | pass^k | CI95 | Wired libs | Faithful | Acceptance | Command discipline | Median / p95 | Avg output tokens | Avg cost | Failure tags |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
${aggregateRows}

## Runs

| Spec | Trial | Effort | Effective reasoning | Model | Path | Validation | Failure tags | Claude exit | Time | Output tokens | Cost | Wired % | Wired | Faithful | Acceptance | Install | Build | Typecheck | Lint | Test | Validation cache |
| --- | ---: | --- | --- | --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
${rows}
`;
}

function formatOutcome(outcome: RunOutcome) {
  if (outcome === "success") return "pass";
  if (outcome === "infra-inconclusive") return "inconclusive";
  return "fail";
}

function formatFailureTags(tags: Record<string, number>) {
  const entries = Object.entries(tags);
  if (entries.length === 0) return "";
  return entries.map(([tag, count]) => `${tag}:${count}`).join(", ");
}

function formatSeconds(ms: number) {
  return `${(ms / 1000).toFixed(1)}s`;
}

async function collectMetadata(options: ScaffbenchOptions) {
  const gitHead = await tryCommandText("git", ["rev-parse", "HEAD"], process.cwd());
  const gitBranch = await tryCommandText("git", ["branch", "--show-current"], process.cwd());
  const bunVersion = await tryCommandText(
    existsSync(`${process.env.HOME}/.bun/bin/bun`) ? `${process.env.HOME}/.bun/bin/bun` : "bun",
    ["--version"],
    process.cwd(),
  );
  // The assisted paths exercise the PUBLISHED generator (pinned at run start via
  // RESOLVED_BF_VERSION and used by every assisted invocation), not repo HEAD, so
  // record the exact version under test; gitHead only describes the local checkout.
  const bfGeneratorVersion = RESOLVED_BF_VERSION === "latest" ? undefined : RESOLVED_BF_VERSION;
  const toolchains = await collectToolchainVersions();
  return {
    cwd: process.cwd(),
    gitHead,
    gitBranch,
    bunVersion,
    nodeVersion: process.version,
    platform: process.platform,
    arch: process.arch,
    // Validation runs non-frozen network installs on the host toolchains below,
    // so a published pass/fail is qualified by this environment.
    environmentQualified: true,
    toolchains,
    bfGeneratorVersion,
    model: options.model,
    effectiveReasoning: options.efforts.map((effort) => ({
      effort,
      effectiveReasoning: effectiveReasoning(options.model, effort),
    })),
  };
}

async function collectToolchainVersions() {
  const probes: Record<string, readonly [string, readonly string[]]> = {
    rustc: ["rustc", ["--version"]],
    cargo: ["cargo", ["--version"]],
    go: ["go", ["version"]],
    dotnet: ["dotnet", ["--version"]],
    python: ["python3", ["--version"]],
    uv: ["uv", ["--version"]],
    protoc: ["protoc", ["--version"]],
    psql: ["psql", ["--version"]],
  };
  const entries = await Promise.all(
    Object.entries(probes).map(async ([name, [command, args]]) => {
      const version = await tryCommandText(command, [...args], process.cwd());
      return [name, version] as const;
    }),
  );
  return Object.fromEntries(entries);
}

async function tryCommandText(command: string, args: readonly string[], cwd: string) {
  try {
    const result = await runCommand(command, args, cwd, FAST_TIMEOUT_MS);
    if (result.exitCode !== 0) return undefined;
    return result.stdout.trim();
  } catch {
    return undefined;
  }
}

function effectiveReasoning(model: string, effort: Effort) {
  if (effort !== "default") return effort;
  const normalized = model.toLowerCase();
  if (normalized.includes("4-7") || normalized.includes("4.7")) return "xhigh";
  if (normalized.includes("4-6") || normalized.includes("4.6")) return "high";
  return undefined;
}
