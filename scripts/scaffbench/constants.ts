import type { BenchmarkSpec, CreationPath, Effort } from "@scaffbench/types";

import { runCommand } from "@scaffbench/agents/command";
import * as Effect from "effect/Effect";

export const HARNESS_VERSION = "3.1.0";
export const SCAFFBENCH_SUITE_VERSION = "3.0";
export const PROMPT_VERSION = "2026-08-21-scaffbench-3.1";
export const MIN_RANKED_TRIALS = 1;
export const MIN_CI_RUNS = 8;

export const VALIDATION_RESOURCE_PROFILE_ID = "low-2w-v1";
export const VALIDATION_RESOURCE_ENV: Readonly<Record<string, string>> = {
  GOMAXPROCS: "2",
  CARGO_BUILD_JOBS: "2",
  UV_CONCURRENT_BUILDS: "2",
  UV_CONCURRENT_INSTALLS: "2",
  UV_CONCURRENT_DOWNLOADS: "8",
  ERL_FLAGS: "+S 2:2",
  JAVA_TOOL_OPTIONS: "-XX:ActiveProcessorCount=2",
  MSBUILDDISABLENODEREUSE: "1",
  GIT_TERMINAL_PROMPT: "0",
};
export const VALIDATION_ENV_SCRUB_PATTERN =
  /(TOKEN|SECRET|PASSWORD|CREDENTIAL|API_KEY|APIKEY|PRIVATE_KEY|AUTH|SSH_|AWS_|GCP_|GOOGLE_APPLICATION|AZURE_|OPENAI|ANTHROPIC|GEMINI|GH_|GITHUB_|NPM_|VERCEL|CLOUDFLARE|SENTRY|POSTHOG|STRIPE|SUPABASE|DATABASE_URL)/i;
export const VALIDATION_OUTPUT_LIMIT_BYTES = 16 * 1024 * 1024;

export const SCAFFBENCH_SPEC_SCORE_WEIGHTS = { core: 0.6, quality: 0.2, stack: 0.2 } as const;
export const VALIDATION_CACHE_VERSION = 9;

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

export function resolveBfVersion() {
  return Effect.gen(function* () {
    const version = yield* tryCommandText(
      "npm",
      ["view", "create-better-fullstack@latest", "version"],
      process.cwd(),
    );
    return version && /^\d+\.\d+\.\d+/.test(version) ? version : "latest";
  });
}
export const EFFORT_VALUES: readonly Effort[] = [
  "default",
  "low",
  "medium",
  "high",
  "xhigh",
  "max",
];
export const CREATION_PATH_VALUES: readonly CreationPath[] = ["prompt", "mcp"];
export const DEFAULT_EFFORTS: readonly Effort[] = ["default"];
export const DEFAULT_PATHS: readonly CreationPath[] = ["prompt"];

export function resolveSpecPaths(
  spec: BenchmarkSpec,
  requested: readonly CreationPath[],
): CreationPath[] {
  const allowed: readonly CreationPath[] =
    spec.paths ?? (spec.supportedByBetterFullstack === false ? ["prompt"] : requested);
  return requested.filter((path) => allowed.includes(path));
}

export const GEN_TIMEOUT_MS = 90 * 60_000;
/** @deprecated Use GEN_TIMEOUT_MS. */
export const CLAUDE_TIMEOUT_MS = GEN_TIMEOUT_MS;
export const GEN_IDLE_TIMEOUT_MS = 20 * 60_000;
export const TIMEOUT_PROGRESS_WINDOW_MS = 10 * 60_000;
export const VALIDATION_TIMEOUT_MS = 20 * 60_000;
export const VALIDATION_PROJECT_TIMEOUT_MS = 90 * 60_000;
export const VALIDATION_ROOT_CAP = 12;
export const ESTIMATED_BUDGET_TOLERANCE = 1.25;
export const FAST_TIMEOUT_MS = 60_000;
export const QUEUE_POLL_MS = 5_000;
export const STALE_LOCK_MS = 6 * 60 * 60_000;
export const CALIBRATION_WEAK_MODEL = "opencode/deepseek-v4-flash-free";

export function generationTimeoutMs(spec: Pick<BenchmarkSpec, "timeoutMultiplier">) {
  const multiplier = spec.timeoutMultiplier ?? 1;
  return GEN_TIMEOUT_MS * (Number.isFinite(multiplier) && multiplier > 0 ? multiplier : 1);
}
export const CORE_SPEC_IDS = [
  "ai-search-workbench",
  "rust-leptos-axum",
  "python-ingestion-api",
  "go-realtime-api",
  "multi-dotnet-ops",
  "ts-svelte-edge-orpc",
  "dotnet-blazor-cqrs",
  "multi-ts-go-grpc",
  "java-spring-jooq-keycloak",
  "elixir-broadway-absinthe",
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

export const AI_SEARCH_ADDONS = ["vite-plus", "devcontainer", "github-actions"] as const;

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
  "vite-plus",
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

export function tryCommandText(command: string, args: readonly string[], cwd: string) {
  return runCommand(command, args, cwd, FAST_TIMEOUT_MS).pipe(
    Effect.map((result) => {
      if (result.exitCode !== 0) return undefined;
      return result.stdout.trim();
    }),
    Effect.catchAll(() => Effect.succeed(undefined)),
  );
}
