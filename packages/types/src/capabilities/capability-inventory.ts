import { z } from "zod";

import {
  CAPABILITY_EVIDENCE_SCHEMA_VERSION,
  capCapabilityEvidenceLevel,
  type CapabilityEvidenceLevel,
} from "@/capabilities/evidence";
import {
  getCategoryOrderForEcosystem,
  OPTION_CATEGORY_METADATA,
  type OptionCategory,
  type OptionCategoryEcosystem,
} from "@/catalog/option-metadata";

export const CAPABILITY_INVENTORY_SCHEMA_VERSION = 1 as const;
export const CAPABILITY_RECEIPT_SCHEMA_VERSION = 1 as const;
export const CAPABILITY_RECEIPT_MAX_AGE_DAYS = 30 as const;

export const CAPABILITY_MATURITY_IDS = ["stable", "experimental", "quarantined"] as const;
export type CapabilityMaturity = (typeof CAPABILITY_MATURITY_IDS)[number];

export const CAPABILITY_FRESHNESS_IDS = [
  "unverified",
  "current",
  "stale",
  "producer-mismatch",
  "failed",
  "quarantined",
] as const;
export type CapabilityFreshness = (typeof CAPABILITY_FRESHNESS_IDS)[number];

export type GoldenRuntimeAssertion = {
  name: string;
  processCwd: string;
  command: readonly string[];
  env?: Readonly<Record<string, string>>;
  setupCommands?: readonly (readonly string[])[];
  request: {
    url: string;
    method: "GET" | "POST";
    body?: string;
    headers?: Readonly<Record<string, string>>;
  };
  expectedStatus: number;
  bodyIncludes: readonly string[];
  followupAssertions?: readonly {
    name: string;
    request: {
      url: string;
      method: "GET" | "POST";
      body?: string;
      headers?: Readonly<Record<string, string>>;
    };
    expectedStatus: number;
    bodyIncludes: readonly string[];
  }[];
  followupCommands?: readonly {
    name: string;
    processCwd?: string;
    command: readonly string[];
    env?: Readonly<Record<string, string>>;
    outputIncludes: readonly string[];
  }[];
  timeoutMs: number;
  limitation: string;
};

export type GoldenRuntimeRecipe = {
  id: OptionCategoryEcosystem;
  name: string;
  definitionVersion: number;
  sourceBuildProofCaseId: string;
  projectName: string;
  generationInputs: { preset: string } | { flags: readonly string[] };
  requiredToolchains: readonly string[];
  buildSteps: readonly string[];
  stackParts: readonly string[];
  coveredOptions: readonly {
    ecosystem: OptionCategoryEcosystem;
    category: OptionCategory;
    optionId: string;
  }[];
  runtimeCoveredOptions?: readonly {
    ecosystem: OptionCategoryEcosystem;
    category: OptionCategory;
    optionId: string;
  }[];
  runtime: GoldenRuntimeAssertion;
  maintainer: string;
};

const MOBILE_RUNTIME_FLAGS = [
  "--part",
  "mobile:react-native:native-bare",
  "--part",
  "backend:typescript:hono",
  "--part",
  "backend.runtime:typescript:bun",
  "--part",
  "backend.api:typescript:trpc",
  "--addons",
  "none",
  "--examples",
  "none",
  "--ai-docs",
  "none",
  "--package-manager",
  "bun",
  "--no-install",
  "--no-git",
] as const;

export const GOLDEN_RUNTIME_RECIPES = [
  {
    id: "typescript",
    name: "React and Hono local service",
    definitionVersion: 1,
    sourceBuildProofCaseId: "typescript",
    projectName: "proof-typescript",
    generationInputs: { preset: "react-hono" },
    requiredToolchains: ["node", "bun"],
    buildSteps: ["scaffold", "install", "build", "typecheck"],
    stackParts: [
      "frontend:typescript:tanstack-router",
      "backend:typescript:hono",
      "backend.runtime:typescript:bun",
    ],
    coveredOptions: [
      { ecosystem: "typescript", category: "webFrontend", optionId: "tanstack-router" },
      { ecosystem: "typescript", category: "backend", optionId: "hono" },
      { ecosystem: "typescript", category: "runtime", optionId: "bun" },
      { ecosystem: "typescript", category: "api", optionId: "graphql-yoga" },
      { ecosystem: "typescript", category: "database", optionId: "sqlite" },
      { ecosystem: "typescript", category: "orm", optionId: "drizzle" },
      { ecosystem: "typescript", category: "auth", optionId: "better-auth" },
    ],
    runtime: {
      name: "Hono GraphQL and Better Auth boundaries",
      processCwd: ".",
      setupCommands: [["bun", "run", "db:push"]],
      command: ["bun", "run", "--cwd", "apps/server", "dev"],
      request: {
        url: "http://127.0.0.1:3000/graphql",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: '{"query":"{ health }"}',
      },
      expectedStatus: 200,
      bodyIncludes: ['"health":"OK"'],
      followupAssertions: [
        {
          name: "Better Auth email sign-up",
          request: {
            url: "http://127.0.0.1:3000/api/auth/sign-up/email",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: '{"name":"Runtime Proof","email":"runtime-proof@example.test","password":"runtime-proof-password"}',
          },
          expectedStatus: 200,
          bodyIncludes: ["runtime-proof@example.test"],
        },
      ],
      timeoutMs: 120_000,
      limitation: "Exercises the generated Hono process and HTTP boundary, not browser rendering.",
    },
    maintainer: "@Marve10s",
  },
  {
    id: "react-native",
    name: "React Native with a Hono service",
    definitionVersion: 1,
    sourceBuildProofCaseId: "react-native",
    projectName: "proof-react-native",
    generationInputs: { flags: MOBILE_RUNTIME_FLAGS },
    requiredToolchains: ["node", "bun", "bunx"],
    buildSteps: ["scaffold", "install", "typecheck", "build", "backend-build"],
    stackParts: ["mobile:react-native:native-bare", "backend:typescript:hono"],
    coveredOptions: [
      { ecosystem: "react-native", category: "nativeFrontend", optionId: "native-bare" },
      { ecosystem: "react-native", category: "mobileNavigation", optionId: "expo-router" },
      { ecosystem: "typescript", category: "backend", optionId: "hono" },
    ],
    runtimeCoveredOptions: [{ ecosystem: "typescript", category: "backend", optionId: "hono" }],
    runtime: {
      name: "Generated mobile backend response",
      processCwd: "apps/server",
      command: ["bun", "run", "dev"],
      request: { url: "http://127.0.0.1:3000/", method: "GET" },
      expectedStatus: 200,
      bodyIncludes: ["OK"],
      timeoutMs: 120_000,
      limitation:
        "Exercises the generated backend boundary. It does not launch a native device UI.",
    },
    maintainer: "@Marve10s",
  },
  {
    id: "rust",
    name: "Axum and SeaORM on local SQLite",
    definitionVersion: 1,
    sourceBuildProofCaseId: "rust",
    projectName: "proof-rust",
    generationInputs: { preset: "rust-axum-seaorm" },
    requiredToolchains: ["node", "cargo"],
    buildSteps: ["scaffold", "fetch", "build"],
    stackParts: ["backend:rust:axum", "backend.orm:rust:sea-orm"],
    coveredOptions: [
      { ecosystem: "rust", category: "rustWebFramework", optionId: "axum" },
      { ecosystem: "rust", category: "rustOrm", optionId: "sea-orm" },
      { ecosystem: "rust", category: "rustCli", optionId: "clap" },
    ],
    runtime: {
      name: "Clap start and check commands against an Axum database health response",
      processCwd: ".",
      setupCommands: [["./target/debug/cli", "info"]],
      command: ["./target/debug/cli", "start", "--host", "127.0.0.1", "--port", "3000"],
      env: { DATABASE_URL: "sqlite://runtime-proof.db?mode=rwc", PORT: "3000" },
      request: { url: "http://127.0.0.1:3000/health", method: "GET" },
      expectedStatus: 200,
      bodyIncludes: ['"status":"ok"', '"database":"connected"'],
      followupCommands: [
        {
          name: "Clap health check command",
          command: ["./target/debug/cli", "check", "--url", "http://127.0.0.1:3000/health"],
          outputIncludes: ['"status":"ok"', '"database":"connected"'],
        },
      ],
      timeoutMs: 180_000,
      limitation:
        "Exercises the generated Clap info, start, and check commands with Axum and SeaORM on local SQLite, not a network database.",
    },
    maintainer: "@Marve10s",
  },
  {
    id: "python",
    name: "FastAPI and SQLAlchemy local service",
    definitionVersion: 1,
    sourceBuildProofCaseId: "python",
    projectName: "proof-python",
    generationInputs: { preset: "python-fastapi-sqlalchemy" },
    requiredToolchains: ["node", "uv"],
    buildSteps: ["scaffold", "install", "compile-check"],
    stackParts: ["backend:python:fastapi", "backend.orm:python:sqlalchemy"],
    coveredOptions: [
      { ecosystem: "python", category: "pythonWebFramework", optionId: "fastapi" },
      { ecosystem: "python", category: "pythonOrm", optionId: "sqlalchemy" },
      { ecosystem: "python", category: "pythonValidation", optionId: "pydantic" },
    ],
    runtime: {
      name: "FastAPI health response",
      processCwd: ".",
      command: ["uv", "run", "uvicorn", "app.main:app", "--host", "127.0.0.1", "--port", "8000"],
      request: { url: "http://127.0.0.1:8000/health", method: "GET" },
      expectedStatus: 200,
      bodyIncludes: ['"status":"healthy"'],
      timeoutMs: 120_000,
      limitation: "Exercises FastAPI through HTTP. It does not prove external service selections.",
    },
    maintainer: "@Marve10s",
  },
  {
    id: "go",
    name: "Gin and GORM local service",
    definitionVersion: 1,
    sourceBuildProofCaseId: "go",
    projectName: "proof-go",
    generationInputs: { preset: "go-gin-gorm" },
    requiredToolchains: ["node", "go"],
    buildSteps: ["scaffold", "mod-tidy", "build"],
    stackParts: ["backend:go:gin", "backend.orm:go:gorm"],
    coveredOptions: [
      { ecosystem: "go", category: "goWebFramework", optionId: "gin" },
      { ecosystem: "go", category: "goOrm", optionId: "gorm" },
      { ecosystem: "go", category: "goLogging", optionId: "zap" },
      { ecosystem: "go", category: "goApi", optionId: "grpc-go" },
    ],
    runtime: {
      name: "Gin health response with local GORM storage",
      processCwd: ".",
      setupCommands: [["go", "test", "./proto", "-run", "TestGreeterRPC"]],
      command: ["go", "run", "cmd/server/main.go"],
      env: { PORT: "8080" },
      request: { url: "http://127.0.0.1:8080/health", method: "GET" },
      expectedStatus: 200,
      bodyIncludes: ['"status":"ok"', "Server is running"],
      timeoutMs: 120_000,
      limitation: "Exercises Gin and GORM with local SQLite, not a network database.",
    },
    maintainer: "@Marve10s",
  },
  {
    id: "java",
    name: "Spring Boot and jOOQ local service",
    definitionVersion: 1,
    sourceBuildProofCaseId: "java",
    projectName: "proof-java",
    generationInputs: { preset: "java-spring-maven" },
    requiredToolchains: ["node", "java"],
    buildSteps: ["scaffold", "test"],
    stackParts: ["backend:java:spring-boot", "backend.buildTool:java:maven"],
    coveredOptions: [
      { ecosystem: "java", category: "javaWebFramework", optionId: "spring-boot" },
      { ecosystem: "java", category: "javaBuildTool", optionId: "maven" },
      { ecosystem: "java", category: "javaOrm", optionId: "jooq" },
      { ecosystem: "java", category: "javaLibraries", optionId: "spring-actuator" },
    ],
    runtime: {
      name: "Spring health and Actuator boundary",
      processCwd: ".",
      command: ["./mvnw", "spring-boot:run"],
      env: { PORT: "8080" },
      request: { url: "http://127.0.0.1:8080/actuator/health", method: "GET" },
      expectedStatus: 200,
      bodyIncludes: ['"status":"UP"'],
      timeoutMs: 180_000,
      limitation: "Exercises Spring Boot and Actuator with the generated local H2 configuration.",
    },
    maintainer: "@Marve10s",
  },
  {
    id: "elixir",
    name: "Phoenix API on local SQLite",
    definitionVersion: 1,
    sourceBuildProofCaseId: "elixir",
    projectName: "proof-elixir",
    generationInputs: { preset: "elixir-phoenix-api" },
    requiredToolchains: ["node", "mix"],
    buildSteps: ["scaffold", "setup-hex", "setup-rebar", "install", "compile", "test"],
    stackParts: ["backend:elixir:phoenix", "backend.orm:elixir:ecto_sqlite3"],
    coveredOptions: [
      { ecosystem: "elixir", category: "elixirWebFramework", optionId: "phoenix" },
      { ecosystem: "elixir", category: "elixirOrm", optionId: "ecto_sqlite3" },
      { ecosystem: "elixir", category: "elixirApi", optionId: "rest" },
    ],
    runtime: {
      name: "Phoenix health response after migrations",
      processCwd: ".",
      setupCommands: [
        ["mix", "ecto.create"],
        ["mix", "ecto.migrate"],
      ],
      command: ["mix", "phx.server"],
      env: { PORT: "4000", DATABASE_PATH: "runtime-proof.db" },
      request: { url: "http://127.0.0.1:4000/api/health", method: "GET" },
      expectedStatus: 200,
      bodyIncludes: ['"status":"ok"'],
      timeoutMs: 180_000,
      limitation: "Exercises Phoenix and Ecto migrations against local SQLite.",
    },
    maintainer: "@Marve10s",
  },
  {
    id: "dotnet",
    name: "ASP.NET Minimal API and EF Core local service",
    definitionVersion: 1,
    sourceBuildProofCaseId: "dotnet",
    projectName: "proof-dotnet",
    generationInputs: { preset: "dotnet-minimal-efcore" },
    requiredToolchains: ["node", "dotnet"],
    buildSteps: ["scaffold", "restore", "build", "test"],
    stackParts: ["backend:dotnet:aspnet-minimal", "backend.orm:dotnet:ef-core"],
    coveredOptions: [
      { ecosystem: "dotnet", category: "dotnetWebFramework", optionId: "aspnet-minimal" },
      { ecosystem: "dotnet", category: "dotnetOrm", optionId: "ef-core" },
      { ecosystem: "dotnet", category: "dotnetApi", optionId: "minimal-api" },
      { ecosystem: "dotnet", category: "dotnetObservability", optionId: "health-checks" },
    ],
    runtime: {
      name: "ASP.NET health response",
      processCwd: ".",
      command: ["dotnet", "run", "--no-build"],
      env: { ASPNETCORE_URLS: "http://127.0.0.1:5000" },
      request: { url: "http://127.0.0.1:5000/health", method: "GET" },
      expectedStatus: 200,
      bodyIncludes: ["Healthy"],
      timeoutMs: 180_000,
      limitation: "Exercises ASP.NET and EF Core with the generated local SQLite database.",
    },
    maintainer: "@Marve10s",
  },
] as const satisfies readonly GoldenRuntimeRecipe[];

export const CapabilityRecipeResultSchema = z.object({
  id: z.enum(["typescript", "react-native", "rust", "python", "go", "java", "elixir", "dotnet"]),
  definitionVersion: z.number().int().positive(),
  success: z.boolean(),
  startedAt: z.string(),
  completedAt: z.string(),
  flakyRuns: z.number().int().nonnegative(),
  repairMinutes: z.number().nonnegative(),
  dependencyChanges: z.number().int().nonnegative(),
  maintainerPresent: z.boolean(),
});

export const CapabilityEvidenceReceiptSchema = z.object({
  schemaVersion: z.literal(CAPABILITY_RECEIPT_SCHEMA_VERSION),
  evidenceSchemaVersion: z.literal(CAPABILITY_EVIDENCE_SCHEMA_VERSION),
  receiptType: z.literal("better-fullstack/capability-runtime"),
  sourceSha: z.string().regex(/^[0-9a-f]{40}$/i),
  catalogVersion: z.string().min(1),
  producerFingerprint: z.string().regex(/^[0-9a-f]{64}$/i),
  createdAt: z.string(),
  toolchains: z.record(z.string(), z.string()),
  recipes: z.array(CapabilityRecipeResultSchema),
});

export type CapabilityEvidenceReceipt = z.infer<typeof CapabilityEvidenceReceiptSchema>;

export type CapabilityInventoryRecord = {
  id: string;
  ecosystem: OptionCategoryEcosystem;
  category: OptionCategory;
  optionId: string;
  label: string;
  maintenanceOwner: string;
  maturity: CapabilityMaturity;
  public: boolean;
  declaredEvidenceLevel: CapabilityEvidenceLevel;
  evidenceLevel: CapabilityEvidenceLevel;
  freshness: CapabilityFreshness;
  lastVerifiedVersion: string | null;
  lastVerifiedAt: string | null;
  limitation: string;
  recipeIds: readonly string[];
};

export type CapabilityQuarantineEntry = {
  ecosystem: OptionCategoryEcosystem;
  category: OptionCategory;
  optionId: string;
  reason: string;
  maintenanceOwner: string;
  restorationRecipeId: string;
  visibility: "experimental" | "hidden";
};

export const CAPABILITY_QUARANTINE: readonly CapabilityQuarantineEntry[] = [];

const CONTROL_CATEGORIES = new Set<OptionCategory>([
  "packageManager",
  "workspaceShape",
  "versionChannel",
  "git",
  "install",
  "aiDocs",
]);

function recordId(
  ecosystem: OptionCategoryEcosystem,
  category: OptionCategory,
  optionId: string,
): string {
  return `${ecosystem}:${category}:${optionId}`;
}

function receiptState(options: {
  receipt?: unknown;
  catalogVersion?: string;
  producerFingerprint?: string;
  now?: Date;
}): {
  freshness: Exclude<CapabilityFreshness, "failed" | "quarantined">;
  receipt: CapabilityEvidenceReceipt | null;
} {
  if (options.receipt === undefined) return { freshness: "unverified", receipt: null };
  const parsed = CapabilityEvidenceReceiptSchema.safeParse(options.receipt);
  if (!parsed.success) return { freshness: "producer-mismatch", receipt: null };
  const receipt = parsed.data;
  if (
    (options.catalogVersion && receipt.catalogVersion !== options.catalogVersion) ||
    (options.producerFingerprint &&
      receipt.producerFingerprint !== options.producerFingerprint.toLowerCase())
  ) {
    return { freshness: "producer-mismatch", receipt: null };
  }
  const createdAt = Date.parse(receipt.createdAt);
  const now = (options.now ?? new Date()).getTime();
  if (
    !Number.isFinite(createdAt) ||
    createdAt > now + 5 * 60_000 ||
    now - createdAt > CAPABILITY_RECEIPT_MAX_AGE_DAYS * 24 * 60 * 60 * 1_000
  ) {
    return { freshness: "stale", receipt: null };
  }
  return { freshness: "current", receipt };
}

function recipeCoverage() {
  const coverage = new Map<
    string,
    Array<{ evidenceLevel: "build-verified" | "runtime-verified"; recipeId: string }>
  >();
  for (const recipe of GOLDEN_RUNTIME_RECIPES as readonly GoldenRuntimeRecipe[]) {
    const runtimeCoveredOptionIds = new Set(
      (recipe.runtimeCoveredOptions ?? recipe.coveredOptions).map((option) =>
        recordId(option.ecosystem, option.category, option.optionId),
      ),
    );
    for (const option of recipe.coveredOptions) {
      const id = recordId(option.ecosystem, option.category, option.optionId);
      coverage.set(id, [
        ...(coverage.get(id) ?? []),
        {
          evidenceLevel: runtimeCoveredOptionIds.has(id) ? "runtime-verified" : "build-verified",
          recipeId: recipe.id,
        },
      ]);
    }
  }
  return coverage;
}

export function getCapabilityInventory(
  options: {
    receipt?: unknown;
    catalogVersion?: string;
    producerFingerprint?: string;
    now?: Date;
    includeHidden?: boolean;
    quarantine?: readonly CapabilityQuarantineEntry[];
  } = {},
): CapabilityInventoryRecord[] {
  const state = receiptState(options);
  const coverage = recipeCoverage();
  const quarantine = new Map(
    (options.quarantine ?? CAPABILITY_QUARANTINE).map((entry) => [
      recordId(entry.ecosystem, entry.category, entry.optionId),
      entry,
    ]),
  );
  const records: CapabilityInventoryRecord[] = [];

  for (const ecosystem of [
    "typescript",
    "react-native",
    "rust",
    "python",
    "go",
    "java",
    "dotnet",
    "elixir",
  ] as const) {
    for (const category of getCategoryOrderForEcosystem(ecosystem)) {
      for (const option of OPTION_CATEGORY_METADATA[category].options) {
        if (option.id === "none") continue;
        const id = recordId(ecosystem, category, option.id);
        const quarantineEntry = quarantine.get(id);
        const recipeCoverage = coverage.get(id) ?? [];
        const recipeIds = [...new Set(recipeCoverage.map((entry) => entry.recipeId))];
        const passingCoverage = recipeCoverage.filter((coverageEntry) => {
          const recipe = GOLDEN_RUNTIME_RECIPES.find(
            (entry) => entry.id === coverageEntry.recipeId,
          );
          const result = state.receipt?.recipes.find(
            (entry) => entry.id === coverageEntry.recipeId,
          );
          return (
            recipe &&
            result?.success === true &&
            result.definitionVersion === recipe.definitionVersion
          );
        });
        const failedRecipe = recipeCoverage.some((coverageEntry) => {
          const result = state.receipt?.recipes.find(
            (entry) => entry.id === coverageEntry.recipeId,
          );
          return result?.success === false;
        });
        const publicOption = quarantineEntry?.visibility !== "hidden";
        if (!publicOption && !options.includeHidden) continue;
        const declaredEvidenceLevel = recipeCoverage.some(
          (entry) => entry.evidenceLevel === "runtime-verified",
        )
          ? "runtime-verified"
          : recipeCoverage.length > 0
            ? "build-verified"
            : "listed";
        const passingEvidenceLevel = passingCoverage.some(
          (entry) => entry.evidenceLevel === "runtime-verified",
        )
          ? "runtime-verified"
          : passingCoverage.length > 0
            ? "build-verified"
            : "listed";
        const evidenceLevel = capCapabilityEvidenceLevel(
          passingEvidenceLevel,
          quarantineEntry ? "listed" : "runtime-verified",
        );
        const maturity: CapabilityMaturity = quarantineEntry
          ? quarantineEntry.visibility === "hidden"
            ? "quarantined"
            : "experimental"
          : recipeIds.length > 0 || CONTROL_CATEGORIES.has(category)
            ? "stable"
            : "experimental";
        const freshness: CapabilityFreshness = quarantineEntry
          ? "quarantined"
          : failedRecipe
            ? "failed"
            : state.freshness;
        const verified =
          (evidenceLevel === "build-verified" || evidenceLevel === "runtime-verified") &&
          state.receipt;
        const strongestPassingCoverage =
          passingCoverage.find((entry) => entry.evidenceLevel === "runtime-verified") ??
          passingCoverage[0];
        const evidenceRecipe = GOLDEN_RUNTIME_RECIPES.find(
          (recipe) => recipe.id === strongestPassingCoverage?.recipeId,
        );

        records.push({
          id,
          ecosystem,
          category,
          optionId: option.id,
          label: option.label,
          maintenanceOwner: quarantineEntry?.maintenanceOwner ?? "@Marve10s",
          maturity,
          public: publicOption,
          declaredEvidenceLevel,
          evidenceLevel: evidenceLevel ?? "listed",
          freshness,
          lastVerifiedVersion: verified ? (state.receipt?.catalogVersion ?? null) : null,
          lastVerifiedAt: verified ? (state.receipt?.createdAt ?? null) : null,
          limitation: quarantineEntry
            ? quarantineEntry.reason
            : recipeIds.length === 0
              ? CONTROL_CATEGORIES.has(category)
                ? "Schema-listed project control. No runtime recipe is declared for this control."
                : "No current golden runtime recipe covers this option."
              : passingCoverage.length === 0
                ? "A golden runtime recipe exists, but no current matching receipt proves it."
                : strongestPassingCoverage?.evidenceLevel === "build-verified"
                  ? `Build evidence covers this option, but the recipe's live assertion does not. ${evidenceRecipe?.runtime.limitation ?? "Runtime evidence is limited to the recorded recipe."}`
                  : (evidenceRecipe?.runtime.limitation ??
                    "Runtime evidence is limited to the recorded recipe."),
          recipeIds,
        });
      }
    }
  }

  return records;
}

export function getCapabilityMaintenanceCosts(receipt: unknown) {
  const parsed = CapabilityEvidenceReceiptSchema.safeParse(receipt);
  if (!parsed.success) return [];
  return parsed.data.recipes.map((recipe) => ({
    recipeId: recipe.id,
    flakyRuns: recipe.flakyRuns,
    repairMinutes: recipe.repairMinutes,
    dependencyChanges: recipe.dependencyChanges,
    maintainerPresent: recipe.maintainerPresent,
    recurringCostScore:
      recipe.flakyRuns * 3 +
      recipe.repairMinutes +
      recipe.dependencyChanges * 2 +
      (recipe.maintainerPresent ? 0 : 20),
  }));
}
