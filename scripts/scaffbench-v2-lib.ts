import { spawn } from "node:child_process";
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
  | "stack-unwired";

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
  family: "typescript" | "rust" | "python" | "go" | "dotnet" | "multi-ecosystem";
  supportedByBetterFullstack: true;
  requirements: readonly string[];
  naturalPrompt: string;
  rightLibraryNotes: readonly string[];
  canonicalFlags: readonly string[];
  expectedConfig?: Record<string, string | readonly string[]>;
  expectedParts?: readonly string[];
  expectedAddons?: readonly string[];
  strictMarkers: readonly StrictMarker[];
  validationProfile: {
    packageManager?: "bun";
    native?: readonly ("cargo" | "dotnet" | "go" | "python")[];
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
  passRate: number;
  passCi95: { low: number; high: number };
  stackPercent: number;
  faithfulnessPercent?: number;
  commandDisciplinePercent: number;
  avgDurationMs: number;
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

const HARNESS_VERSION = "2.1.0";
const DEFAULT_EFFORTS: readonly Effort[] = ["low", "medium", "high"];
const DEFAULT_PATHS: readonly CreationPath[] = ["mcp", "cli", "prompt"];
const CLAUDE_TIMEOUT_MS = 15 * 60_000;
const VALIDATION_TIMEOUT_MS = 10 * 60_000;
const FAST_TIMEOUT_MS = 60_000;
const CORE_SPEC_IDS = [
  "ai-search-workbench",
  "rust-leptos-axum",
  "python-ingestion-api",
  "go-realtime-api",
  "multi-dotnet-ops",
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

export const SCAFFBENCH_2_1_SPECS: readonly BenchmarkSpec[] = [
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
  const specIds = SCAFFBENCH_2_1_SPECS.map((spec) => spec.id);
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
          "testing/llm-benchmarks/v2.1",
          new Date().toISOString().replace(/[-:]/g, "").replace(/\..+$/, "Z"),
        ),
    maxBudgetUsd: args.get("max-budget-usd") ?? "12",
    skipValidation: args.has("skip-validation"),
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
  return SCAFFBENCH_2_1_SPECS.filter((spec) => requested.has(spec.id));
}

export function canonicalCommand(spec: BenchmarkSpec, projectName: string) {
  return ["bun", "create", "better-fullstack@latest", projectName, ...spec.canonicalFlags]
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

  const base = `You are running in an empty benchmark workspace:
${runDir}

Create exactly one project directory named \`${projectName}\`.
Do not ask questions. Do not start a dev server. Do not write outside the current working directory.
At the end, report the commands you ran and any errors you hit.

${body}

Important scoring rule: choosing the right library matters.
${spec.rightLibraryNotes.map((note) => `- ${note}`).join("\n")}`;

  if (pathMode === "prompt") {
    return `${base}

Creation mode: prompt-only.
Do not use the Better-Fullstack MCP server, Better-Fullstack CLI, Better-Fullstack website, or files from the Better-Fullstack repository.
Create the project from scratch by writing the files and manifests needed for a runnable starter.`;
  }

  if (pathMode === "cli") {
    return `${base}

Creation mode: Better-Fullstack CLI mention.
Do not use MCP tools. Use the Better-Fullstack CLI via \`bun create better-fullstack@latest\`.
Map the requirements to explicit non-interactive CLI flags yourself; inspect \`--help\` if you are unsure of a flag name or value. Run the command with \`--dry-run\` first, then run the same scaffold command for real without \`--dry-run\`.
Use \`--no-install --no-git --disable-analytics\`.`;
  }

  return `${base}

Creation mode: Better-Fullstack MCP.
Use the Better-Fullstack MCP tools. Start with bfs_get_guidance, then use schema/compatibility/plan as needed, and call bfs_create_project to create the project.
Do not use the Better-Fullstack CLI for creation.`;
}

export async function runScaffbench(options: ScaffbenchOptions, log = console.log) {
  const specs = selectedSpecs(options.specs);
  if (options.listSpecs) {
    for (const spec of specs.length ? specs : SCAFFBENCH_2_1_SPECS) {
      log(`${spec.id}\t${spec.lane}\t${spec.family}\t${spec.title}`);
    }
    return;
  }

  await mkdir(options.outDir, { recursive: true });
  await writeHarnessFiles(options.outDir, options, specs);

  if (options.writeMatrixOnly) {
    await writeSummary(options.outDir, [], options, specs, await collectMetadata(options));
    log(`Wrote ScaffBench 2.1 matrix to ${options.outDir}`);
    return;
  }

  const bunx = existsSync(`${process.env.HOME}/.bun/bin/bunx`)
    ? `${process.env.HOME}/.bun/bin/bunx`
    : "bunx";
  const emptyMcpPath = path.join(options.outDir, "empty-mcp.json");
  const bfsMcpPath = path.join(options.outDir, "better-fullstack-mcp.json");
  await writeMcpConfigs(emptyMcpPath, bfsMcpPath, bunx);

  const metadata = await collectMetadata(options);
  const results = await readExistingResults(options.outDir);

  // Agents run in an isolated workspace tree, disjoint from the grading tree
  // (canonical-command.txt / spec.json / summary.json / sibling runs), so a
  // CLI or MCP run cannot read the answer key out of its own working directory.
  const workspaceRoot = path.join(os.tmpdir(), "scaffbench21-work", path.basename(options.outDir));
  await mkdir(workspaceRoot, { recursive: true });

  for (const spec of specs) {
    for (const effort of options.efforts) {
      for (const pathMode of options.paths) {
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
          const claude = await runClaude({
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

          const parsed = parseClaudeResult(claude.stdout);
          const generatedDir = await findProjectDir(workDir, projectName);
          const validation = options.skipValidation
            ? { projectExists: generatedDir !== null, steps: {} }
            : await validateProject(spec, generatedDir, options);
          const scored = generatedDir
            ? await scoreProject(spec, generatedDir)
            : { artifact: emptyArtifactScore(spec), faithfulness: undefined };
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
              totalCostUsd: parsed?.total_cost_usd,
              sessionId: parsed?.session_id,
              terminalReason: parsed?.terminal_reason,
            },
            validation,
            stackScore: scored.artifact,
            generatorFaithfulness: scored.faithfulness,
            toolCompliance,
            failureTags: [],
          };
          result.failureTags = deriveFailureTags(result);

          results.push(result);
          await writeSummary(options.outDir, results, options, specs, metadata);

          log(
            `DONE ${id} exit=${result.claude.exitCode} pass=${validationPassed(result)} stack=${result.stackScore.matched}/${result.stackScore.total}`,
          );
        }
      }
    }
  }
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
            args: ["create-better-fullstack@latest", "mcp"],
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
      "--output-format",
      "json",
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

export async function runCommand(
  command: string,
  args: readonly string[],
  cwd: string,
  timeoutMs: number,
): Promise<CommandResult> {
  const started = Date.now();
  const child = spawn(command, args, { cwd, env: process.env });
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

function parseClaudeResult(stdout: string): any | null {
  try {
    return JSON.parse(stdout);
  } catch {
    const line = stdout
      .trim()
      .split("\n")
      .reverse()
      .find((candidate) => candidate.startsWith("{") && candidate.endsWith("}"));
    if (!line) return null;
    try {
      return JSON.parse(line);
    } catch {
      return null;
    }
  }
}

async function findProjectDir(runDir: string, projectName: string) {
  const expected = path.join(runDir, projectName);
  if (existsSync(expected)) return expected;

  const entries = await readdir(runDir, { withFileTypes: true });
  const dirs = entries.filter((entry) => entry.isDirectory() && !entry.name.startsWith("."));
  if (dirs.length === 1) return path.join(runDir, dirs[0].name);
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
  const typeScriptScript = scripts["check-types"]
    ? "check-types"
    : scripts.typecheck
      ? "typecheck"
      : null;
  if (typeScriptScript) {
    steps.typecheck = toStep(
      await runCommand(bun, ["run", typeScriptScript], projectDir, VALIDATION_TIMEOUT_MS),
    );
  }
  if (options.qualityGate || scripts.lint) {
    steps.lint = scripts.lint
      ? toStep(await runCommand(bun, ["run", "lint"], projectDir, VALIDATION_TIMEOUT_MS))
      : skippedStep("bun run lint");
  }
  if (options.qualityGate) {
    if (scripts.format) {
      steps.format = toStep(
        await runCommand(bun, ["run", "format"], projectDir, VALIDATION_TIMEOUT_MS),
      );
    } else if (scripts.check) {
      steps.format = toStep(
        await runCommand(bun, ["run", "check"], projectDir, VALIDATION_TIMEOUT_MS),
      );
    } else {
      steps.format = skippedStep("format/check");
    }
    steps.test = scripts.test
      ? toStep(await runCommand(bun, ["run", "test"], projectDir, VALIDATION_TIMEOUT_MS))
      : skippedStep("bun run test");
  }
  if (options.doctorCheck) {
    const bunx = existsSync(`${process.env.HOME}/.bun/bin/bunx`)
      ? `${process.env.HOME}/.bun/bin/bunx`
      : "bunx";
    steps.doctor = toStep(
      await runCommand(
        bunx,
        ["create-better-fullstack@latest", "doctor", ".", "--skip-checks", "--json"],
        projectDir,
        VALIDATION_TIMEOUT_MS,
      ),
    );
  }
  if (options.routeCheck) {
    steps.route = scripts.dev
      ? await runProjectRouteCheck(projectDir, options.outDir)
      : skippedStep("route-check (no dev script)");
  }

  return steps;
}

async function runProjectRouteCheck(projectDir: string, outDir: string): Promise<StepResult> {
  const config = await readRouteCheckConfig(projectDir);
  if (!config) return skippedStep("route-check (missing Better-Fullstack route metadata)");

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
  if (frontend.length === 0 || frontend.every((entry) => entry === "none")) return null;

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
    steps.test = toStep(
      await runCommand("uv", ["run", "pytest"], projectDir, VALIDATION_TIMEOUT_MS),
    );
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

function skippedStep(command: string): StepResult {
  return {
    command,
    exitCode: 0,
    timedOut: false,
    durationMs: 0,
    stdoutTail: "skipped",
    stderrTail: "",
  };
}

async function readPackageScripts(packageJsonPath: string) {
  try {
    const parsed = JSON.parse(await readFile(packageJsonPath, "utf8"));
    return (parsed.scripts ?? {}) as Record<string, string>;
  } catch {
    return {};
  }
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
): Promise<{ artifact: StackScore; faithfulness?: StackScore }> {
  const artifact = await scoreArtifact(spec, projectDir);
  const btsPath = path.join(projectDir, "bts.jsonc");
  const faithfulness = existsSync(btsPath)
    ? scoreBts(spec, await readFile(btsPath, "utf8"))
    : undefined;
  return { artifact, faithfulness };
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
      !/(package\.json|Cargo\.toml|go\.mod|pyproject\.toml|\.csproj|\.ts|\.tsx|\.js|\.jsx|\.mjs|\.cjs|\.rs|\.go|\.py|\.cs|\.json|\.toml|\.yml|\.yaml)$/.test(
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

async function scoreToolCompliance(
  pathMode: CreationPath,
  projectDir: string | null,
  claude: CommandResult,
): Promise<ToolCompliance> {
  const transcript = `${claude.stdout}\n${claude.stderr}`.toLowerCase();
  const checks: CommandDisciplineCheck[] = [];
  const hasBtsConfig = projectDir ? existsSync(path.join(projectDir, "bts.jsonc")) : false;

  if (pathMode === "prompt") {
    checks.push({
      id: "no-bf-config",
      status: hasBtsConfig ? "fail" : "pass",
      detail: hasBtsConfig
        ? "prompt-only produced bts.jsonc"
        : "prompt-only did not produce bts.jsonc",
    });
    checks.push({
      id: "no-bf-tool-reference",
      status:
        transcript.includes("bfs_create_project") ||
        transcript.includes("bun create better-fullstack") ||
        transcript.includes("create-better-fullstack")
          ? "fail"
          : "pass",
      detail: "prompt-only transcript should not show Better-Fullstack tool usage",
    });
  } else if (pathMode === "cli") {
    checks.push({
      id: "used-cli",
      status:
        transcript.includes("bun create better-fullstack") || hasBtsConfig ? "pass" : "unknown",
      detail: "CLI path should use bun create better-fullstack@latest",
    });
    checks.push({
      id: "dry-run-first",
      status: transcript.includes("--dry-run") ? "pass" : "unknown",
      detail: "CLI path should dry-run before writing",
    });
    checks.push({
      id: "no-mcp",
      status: transcript.includes("bfs_create_project") ? "fail" : "pass",
      detail: "CLI path should not use MCP tools",
    });
  } else {
    checks.push({
      id: "used-mcp",
      status: transcript.includes("bfs_create_project") || hasBtsConfig ? "pass" : "unknown",
      detail: "MCP path should use Better-Fullstack MCP creation",
    });
    checks.push({
      id: "no-cli-create",
      status: transcript.includes("bun create better-fullstack") ? "fail" : "pass",
      detail: "MCP path should not use CLI creation",
    });
  }

  const scored = checks.filter((check) => check.status !== "unknown" && check.status !== "skipped");
  const score = scored.filter((check) => check.status === "pass").length;
  return { score, total: scored.length || checks.length, checks };
}

export function validationPassed(result: RunResult) {
  if (!result.validation.projectExists) return false;
  const steps = Object.values(result.validation.steps).filter((step): step is StepResult =>
    Boolean(step),
  );
  return steps.every((step) => step.exitCode === 0 && !step.timedOut);
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
    tags.add("validation-failed");
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

  if (!validationPassed(result)) tags.add("validation-failed");
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
      const ci = wilsonInterval(passCount, scored.length);
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
        passCi95: ci,
        stackPercent: average(group.map((result) => result.stackScore.percent)),
        faithfulnessPercent: maybeAverage(
          group.map((result) => result.generatorFaithfulness?.percent),
        ),
        commandDisciplinePercent: average(
          group.map((result) =>
            result.toolCompliance.total > 0
              ? Math.round((result.toolCompliance.score / result.toolCompliance.total) * 100)
              : 0,
          ),
        ),
        avgDurationMs: average(group.map((result) => result.claude.durationMs)),
        avgOutputTokens: maybeAverage(group.map((result) => result.claude.outputTokens)),
        avgCostUsd: maybeAverage(group.map((result) => result.claude.totalCostUsd)),
        failureTags: countFailureTags(group),
      };
    })
    .sort((a, b) => b.passRate - a.passRate || a.avgDurationMs - b.avgDurationMs);
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
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function maybeAverage(values: readonly (number | undefined)[]) {
  const present = values.filter((value): value is number => typeof value === "number");
  return present.length > 0 ? average(present) : undefined;
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
  const summary: ScaffbenchSummary = {
    harnessVersion: HARNESS_VERSION,
    generatedAt: new Date().toISOString(),
    options: {
      ...options,
      listSpecs: undefined as never,
      writeMatrixOnly: undefined as never,
    },
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
        result.validation.install?.exitCode ?? "",
        result.validation.build?.exitCode ?? "",
        result.validation.checkTypes?.exitCode ?? "",
        result.validation.lint?.exitCode ?? "",
        result.validation.test?.exitCode ?? "",
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
        `${aggregate.passCount}/${aggregate.scoredRuns}`,
        aggregate.inconclusiveCount > 0 ? `${aggregate.inconclusiveCount}/${aggregate.runs}` : "0",
        `${aggregate.passRate}% (${aggregate.passCi95.low}-${aggregate.passCi95.high})`,
        `${aggregate.stackPercent}%`,
        aggregate.faithfulnessPercent != null ? `${aggregate.faithfulnessPercent}%` : "—",
        `${aggregate.commandDisciplinePercent}%`,
        formatSeconds(aggregate.avgDurationMs),
        aggregate.avgOutputTokens ?? "",
        aggregate.avgCostUsd?.toFixed(3) ?? "",
        formatFailureTags(aggregate.failureTags),
      ].join(" | "),
    )
    .join("\n");

  return `# ScaffBench 2.1 Run

Harness: ${summary.harnessVersion}
Agent: Claude Code (single agent; single model family per row)
Specs: ${summary.specs.map((spec) => spec.id).join(", ")}
Repeats: ${summary.options.repeats}
Prompt style: ${summary.options.promptStyle}

## Path × effort summary

This is an ablation across creation paths and reasoning effort for one agent
(Claude Code), not a cross-vendor leaderboard. Pass rate is over *scored* runs:
infra-inconclusive runs (missing toolchain, validation timeout, exhausted token
budget, or a crash with no output) are excluded from the denominator. "Wired
libs" is scored from the generated artifact (deps + imports + files);
"Faithful" is the assisted-path bts.jsonc-vs-requested diagnostic.

| Model | Effort | Effective reasoning | Path | Pass@1 | Inconclusive | Pass rate CI95 | Wired libs | Faithful | Command discipline | Avg time | Avg output tokens | Avg cost | Failure tags |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
${aggregateRows}

## Runs

| Spec | Trial | Effort | Effective reasoning | Model | Path | Validation | Failure tags | Claude exit | Time | Output tokens | Cost | Wired % | Wired | Faithful | Install | Build | Typecheck | Lint | Test |
| --- | ---: | --- | --- | --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
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
  return {
    cwd: process.cwd(),
    gitHead,
    gitBranch,
    bunVersion,
    nodeVersion: process.version,
    platform: process.platform,
    arch: process.arch,
    model: options.model,
    effectiveReasoning: options.efforts.map((effort) => ({
      effort,
      effectiveReasoning: effectiveReasoning(options.model, effort),
    })),
  };
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
