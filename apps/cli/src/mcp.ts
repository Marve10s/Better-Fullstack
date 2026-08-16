import {
  type AddInput,
  AddonsSchema,
  AISchema,
  AiDocsSchema,
  AnalyticsSchema,
  AnimationSchema,
  APISchema,
  AstroIntegrationSchema,
  AuthSchema,
  BackendSchema,
  type BetterTStackConfig,
  CachingSchema,
  CMSSchema,
  type CompatibilityInput,
  type CreateInput,
  CSSFrameworkSchema,
  DatabaseSchema,
  DatabaseSetupSchema,
  DartMobileSchema,
  DotnetApiSchema,
  DotnetAuthSchema,
  DotnetCachingSchema,
  DotnetFrontendSchema,
  DotnetValidationSchema,
  DotnetDeploySchema,
  DotnetJobQueueSchema,
  DotnetLibrariesSchema,
  DotnetObservabilitySchema,
  DotnetOrmSchema,
  DotnetRealtimeSchema,
  DotnetTestingSchema,
  DotnetWebFrameworkSchema,
  EcosystemSchema,
  ElixirApiSchema,
  ElixirAuthSchema,
  ElixirCachingSchema,
  ElixirDeploySchema,
  ElixirLibrariesSchema,
  ElixirEmailSchema,
  ElixirHttpSchema,
  ElixirJobsSchema,
  ElixirJsonSchema,
  ElixirObservabilitySchema,
  ElixirOrmSchema,
  ElixirQualitySchema,
  ElixirI18nSchema,
  ElixirHttpServerSchema,
  ElixirApplicationFrameworkSchema,
  ElixirDocumentationSchema,
  ElixirClusteringSchema,
  ElixirRealtimeSchema,
  ElixirTestingSchema,
  ElixirValidationSchema,
  ElixirWebFrameworkSchema,
  EffectSchema,
  EmailSchema,
  EcommerceSchema,
  ExamplesSchema,
  FeatureFlagsSchema,
  IntegrationsSchema,
  FileStorageSchema,
  FileUploadSchema,
  formatStackPartSpec,
  FormsSchema,
  FrontendSchema,
  MobileDeepLinkingSchema,
  MobileLibrariesSchema,
  MobileNavigationSchema,
  MobileOTASchema,
  MobilePushSchema,
  MobileStorageSchema,
  MobileTestingSchema,
  MobileUISchema,
  GoApiSchema,
  GoCliSchema,
  GoAuthSchema,
  GoCachingSchema,
  GoConfigSchema,
  GoDISchema,
  GoLoggingSchema,
  GoMigrationsSchema,
  GoMessageQueueSchema,
  GoObservabilitySchema,
  GoOrmSchema,
  GoProtoToolingSchema,
  GoQualitySchema,
  GoRealtimeSchema,
  GoTemplatingSchema,
  GoTestingSchema,
  GoValidationSchema,
  GoWebFrameworkSchema,
  JavaAuthSchema,
  JavaApiSchema,
  JavaLanguageSchema,
  JavaLoggingSchema,
  JavaBuildToolSchema,
  JavaLibrariesSchema,
  JavaOrmSchema,
  JavaTestingLibrariesSchema,
  JavaWebFrameworkSchema,
  I18nSchema,
  JobQueueSchema,
  KotlinMobileLibrariesSchema,
  KotlinMobileSchema,
  legacyProjectConfigToStackParts,
  LoggingSchema,
  ObservabilitySchema,
  ORMSchema,
  OPTION_CATEGORY_METADATA,
  PackageManagerSchema,
  PaymentsSchema,
  parseStackPartSpecs,
  type OptionCategory,
  type OptionCategoryEcosystem,
  type ProjectConfig,
  PythonAiSchema,
  PythonApiSchema,
  PythonAuthSchema,
  PythonOrmSchema,
  PythonQualitySchema,
  PythonTestingSchema,
  PythonCachingSchema,
  PythonRealtimeSchema,
  PythonObservabilitySchema,
  PythonCliSchema,
  PythonCloudSdkSchema,
  PythonDataSchema,
  PythonHttpClientSchema,
  PythonMediaSchema,
  PythonMessageQueueSchema,
  PythonPackageManagerSchema,
  PythonServerSchema,
  PythonGraphqlSchema,
  PythonTaskQueueSchema,
  PythonValidationSchema,
  PythonWebFrameworkSchema,
  RateLimitSchema,
  RealtimeSchema,
  RuntimeSchema,
  RustApiSchema,
  RustCliSchema,
  RustFrontendSchema,
  RustLibrariesSchema,
  RustLoggingSchema,
  RustErrorHandlingSchema,
  RustCachingSchema,
  RustAuthSchema,
  RustRealtimeSchema,
  RustMessageQueueSchema,
  RustObservabilitySchema,
  RustTemplatingSchema,
  RustOrmSchema,
  RustWebFrameworkSchema,
  SearchSchema,
  VectorDbSchema,
  ServerDeploySchema,
  ShadcnBaseColorSchema,
  ShadcnBaseSchema,
  ShadcnColorThemeSchema,
  ShadcnFontSchema,
  ShadcnIconLibrarySchema,
  ShadcnRadiusSchema,
  ShadcnStyleSchema,
  stackPartsToLegacyProjectConfigPartial,
  StateManagementSchema,
  SwiftMobileSchema,
  TestingSchema,
  UILibrarySchema,
  ValidationSchema,
  VersionChannelSchema,
  WebDeploySchema,
  analyzeStackCompatibility,
  evaluateCompatibility,
  CATEGORY_ORDER,
  getCategoryOrderForEcosystem,
  getToolingCapability,
  TEMPLATE_VALUES,
  type Template,
} from "@better-fullstack/types";
import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";
import z from "zod";

import { applyStackUpdate, planStackUpdate } from "./helpers/core/stack-update";
import { trackEvent, trackProjectCreation, withCommandTelemetry } from "./utils/analytics";
import { readBtsConfig } from "./utils/bts-config";
import { applyEffectBackendDefaults } from "./utils/config-processing";
import { runWithContextAsync } from "./utils/context";
import { generateReproducibleCommand } from "./utils/generate-reproducible-command";
import { getLatestCLIVersion } from "./utils/get-latest-cli-version";
import { getEffectiveStack, getGraphSummary } from "./utils/graph-summary";
import {
  applyMcpPartRemoval,
  applyMcpProjectUpdate,
  checkMcpProject,
  getMcpProjectStatus,
  planMcpPartRemoval,
  planMcpProjectUpdate,
  recoverMcpProjectTransaction,
} from "./utils/mcp-project-lifecycle";
import { getCompatibilityBackend } from "./utils/stack-compatibility";
import { getTemplateConfig, getTemplateDescription } from "./utils/templates";

const OPTION_ENTRY_COUNT = Object.values(OPTION_CATEGORY_METADATA).reduce(
  (sum, metadata) => sum + metadata.options.length,
  0,
);
const ECOSYSTEM_LIST = EcosystemSchema.options.join(", ");

const INSTRUCTIONS = `Better-Fullstack scaffolds fullstack projects across ${ECOSYSTEM_LIST} ecosystems with ${OPTION_ENTRY_COUNT} configurable options.

RECOMMENDED WORKFLOW:
1. Call bfs_get_guidance to understand field semantics, required fields, and workflow rules.
2. Read the "docs://compatibility-rules" resource for valid stack combinations.
3. Call bfs_check_compatibility to validate your planned stack before creating.
4. Call bfs_plan_project to preview (dry-run) — no files are written.
5. Call bfs_create_project to scaffold the project on disk.

For existing projects:
1. Call bfs_get_project_status, then bfs_check_project for truthful target verification.
2. Call bfs_plan_project_update to review current-template drift. Manifest v1 is always unproven and plan-only by default.
3. Only after independent review and a recovery point, pass its reviewToken plus acknowledgeUnprovenManifestV1: true to bfs_apply_project_update.
4. For removal, call bfs_plan_part_removal with one exact non-primary stack part, review the result, then pass its unchanged token to bfs_apply_part_removal.
4. Use bfs_plan_stack_update / bfs_apply_stack_update for provider changes.
5. Use bfs_plan_addition / bfs_add_feature for owner-scoped tooling Stack Parts and deploy targets.

CRITICAL RULES:
- Dependency installation is ALWAYS skipped in MCP mode (timeout risk). After scaffolding, tell the user to run install manually.
- bfs_check_project executes project build tools. Those tools may write local caches, lock metadata, generated code, or build artifacts even though Better Fullstack does not edit source directly.
- Tooling is expressed with canonical "part" bindings. Use bfs_get_schema to discover dedicated toolchain, runner, quality, hooks, analysis, documentation, platform, testing, data, CI, and utility categories.
- Array fields include "part", "frontend", "examples", "aiDocs", and the ecosystem library/testing collections. Most provider fields are strings.
- "none" means "skip this feature entirely", not "use the default".
- Always specify "ecosystem" first — it determines which other fields are relevant.
- TypeScript web-specific fields (web frontend, backend, orm, etc.) are IGNORED for react-native/rust/python/go/java/dotnet/elixir ecosystems.
- The compatibility engine auto-adjusts invalid combinations — always call bfs_check_compatibility first to see adjustments.`;

function getGuidance() {
  return {
    workflow: [
      "Call bfs_get_guidance (this tool) to understand field semantics and rules.",
      "Call bfs_get_schema to see valid values for each category.",
      "Call bfs_check_compatibility to validate your planned stack before creation.",
      "Call bfs_plan_project to preview the generated project (dry-run, no files written).",
      "Call bfs_create_project to scaffold the project on disk.",
      "For existing projects: call bfs_get_project_status and bfs_check_project, then use the reviewed project-update or stack-update workflow that matches the requested change.",
      "Use bfs_plan_addition / bfs_add_feature for owner-scoped tooling Stack Parts and deploy targets.",
    ],
    ecosystems: {
      typescript:
        "Full-featured web: frontend + backend + database + ORM + auth + payments + 20+ feature categories.",
      "react-native":
        "Mobile: Expo/React Native frontend variants plus mobile navigation, UI, storage, testing, push, OTA, and deep linking.",
      rust: "Backend/CLI: web framework (axum/actix-web), ORM (sea-orm/sqlx), gRPC, GraphQL, CLI tools.",
      python:
        "Backend/AI: web framework (fastapi/django), ORM (sqlalchemy/sqlmodel), AI/ML integrations, task queues.",
      go: "Backend/CLI: web framework (gin/echo), ORM (gorm/sqlc), gRPC, CLI tools, logging.",
      java: "Backend/API: Spring Boot with Maven or Gradle Wrapper, optional Spring Data JPA, Spring Security, app libraries, and Java testing libraries.",
      dotnet:
        "Backend/API: ASP.NET Core Minimal APIs, MVC, or Blazor with EF Core/Dapper, Identity/Auth0, SignalR, xUnit, and Docker-ready output.",
      elixir:
        "Phoenix: Phoenix or Phoenix LiveView with Ecto SQL, PostgreSQL-ready config, REST or Absinthe, Channels/Presence, Oban, and Mix releases/Docker.",
    },
    fieldRules: {
      projectName: "kebab-case directory name. Required for bfs_create_project.",
      ecosystem: "Must be set first. Determines which other fields are relevant.",
      frontend:
        "ARRAY of strings. TypeScript only. Supports multiple frontends in one monorepo. Use [] for API-only.",
      arrayFields:
        'Use arrays for part, frontend, examples, aiDocs, and ecosystem library/testing collections. Use [] for "none" on multi-select fields.',
      backend:
        'String. "self" means fullstack mode (Next.js/Vinext/TanStack Start/Nuxt/Astro API routes). "none" for frontend-only.',
      runtime: '"bun" or "node". Must be "none" when backend is "self" or "convex".',
      part: "ARRAY of canonical Stack Part bindings. Tooling capabilities use dedicated roles and owner scopes, for example toolchain:universal:vite-plus or frontend.testing:typescript:storybook.",
      email:
        "String. TypeScript supports multiple providers; Rust, Python, Go, and Java currently support resend or none.",
      observability:
        "Shared service field. TypeScript supports multiple providers; Rust, Python, Go, and Java support sentry or none here. Python and Go also expose ecosystem-native pythonObservability/goObservability fields, including SigNoz.",
      search:
        "String. TypeScript supports multiple providers; Rust, Python, Go, and Java currently support meilisearch or none.",
      vectorDb:
        "String. TypeScript-only vector database for AI embeddings: pgvector, qdrant, chroma, pinecone, or none. Each provider is a standalone service (pgvector connects to a dedicated Postgres+pgvector instance via PGVECTOR_DATABASE_URL). Requires a standalone backend (not convex/none).",
    },
    ambiguityRules: [
      "If the user request leaves major stack choices unspecified, ASK the user before proceeding. Do not guess.",
      'Do not infer tooling capabilities, examples, or optional features the user did not mention. Default strings to "none" and multi-select arrays to [].',
      "When the user says 'fullstack Next.js', use backend='self', frontend=['next'], runtime='none'.\nWhen the user says 'fullstack Vinext', use backend='self', frontend=['vinext'], runtime='none'.",
      "When the user says 'React + Hono', use frontend=['tanstack-router'] (or ask which React framework), backend='hono'.",
    ],
    criticalConstraints: [
      "tRPC (api='trpc') only works with React-based frontends: next, vinext, react-router, tanstack-router, tanstack-start.",
      "Use api='orpc' for svelte, solid, nuxt.",
      "Angular: use api='none' (has built-in HttpClient).",
      "Qwik: use backend='none', api='none' (built-in server).",
      "NestJS and AdonisJS backends require runtime='node'.",
      "Elysia backend requires runtime='bun'.",
      "backend='self' only works with: next, vinext, tanstack-start, astro, nuxt, svelte, solid-start.",
      "backend='convex' overrides: runtime=none, database=none, orm=none, api=none.",
      "TypeORM + better-auth: unsupported (no adapter). Use auth='none' or orm='drizzle'.",
      "Sequelize + better-auth: unsupported (no adapter). Use auth='none' or orm='drizzle'.",
      "Non-TypeScript ecosystems only support email='resend' or email='none'.",
      "Non-TypeScript ecosystems only support observability='sentry' or observability='none'.",
      "Use pythonObservability='signoz' or goObservability='signoz' for SigNoz-native OTLP scaffolding in those ecosystems.",
      "Non-TypeScript ecosystems only support search='meilisearch' or search='none'.",
      "Java email='resend' and observability='sentry' require javaBuildTool='maven' or javaBuildTool='gradle'.",
      "Java search='meilisearch' requires javaBuildTool='maven' or javaBuildTool='gradle'.",
    ],
  };
}

const MCP_ECOSYSTEMS = new Set<OptionCategoryEcosystem>(
  EcosystemSchema.options as OptionCategoryEcosystem[],
);

const MCP_SHARED_SCHEMA_KEYS = [
  "ecosystem",
  "packageManager",
  "examples",
  "webDeploy",
  "serverDeploy",
  "dbSetup",
] as const;

const MCP_SHARED_COMPATIBILITY_KEYS = [
  ...MCP_SHARED_SCHEMA_KEYS,
  "projectName",
  "git",
  "install",
  "aiDocs",
] as const;

const MCP_LEGACY_CATEGORY_KEYS: Partial<Record<OptionCategory, readonly string[]>> = {
  webFrontend: ["frontend"],
  nativeFrontend: ["frontend"],
  backendLibraries: ["effect"],
};

const MCP_SCHEMA_EXCLUDED_CATEGORIES = new Set<OptionCategory>([
  "webFrontend",
  "nativeFrontend",
  "backendLibraries",
  "aiDocs",
  "git",
  "install",
  "versionChannel",
]);

const MCP_SCHEMA_OPTION_OVERRIDES = {
  ecosystem: EcosystemSchema.options,
  frontend: FrontendSchema.options,
  backend: BackendSchema.options,
  examples: ExamplesSchema.options,
  effect: EffectSchema.options,
} as const satisfies Record<string, readonly string[]>;

const MCP_ALL_SCHEMA_KEYS = [
  "ecosystem",
  ...CATEGORY_ORDER.flatMap((category) => MCP_LEGACY_CATEGORY_KEYS[category] ?? [category]).filter(
    (key, index, keys) => keys.indexOf(key) === index,
  ),
].filter((key) => getMcpSchemaOptionValues(key).length > 0);

function isMcpEcosystem(ecosystem: string): ecosystem is OptionCategoryEcosystem {
  return MCP_ECOSYSTEMS.has(ecosystem as OptionCategoryEcosystem);
}

function getMcpSchemaOptionValues(key: string): string[] {
  const override = MCP_SCHEMA_OPTION_OVERRIDES[key as keyof typeof MCP_SCHEMA_OPTION_OVERRIDES];
  if (override) return [...override];

  const categories =
    key in OPTION_CATEGORY_METADATA && !MCP_SCHEMA_EXCLUDED_CATEGORIES.has(key as OptionCategory)
      ? [key as OptionCategory]
      : [];

  return [
    ...new Set(
      categories.flatMap((category) =>
        OPTION_CATEGORY_METADATA[category].options.map((option) => option.id),
      ),
    ),
  ];
}

function getMcpCategoryKeysForEcosystem(ecosystem: OptionCategoryEcosystem): string[] {
  const keys = getCategoryOrderForEcosystem(ecosystem).flatMap(
    (category) => MCP_LEGACY_CATEGORY_KEYS[category] ?? [category],
  );
  return [...new Set(keys.filter((key) => getMcpSchemaOptionValues(key).length > 0))];
}

function getMcpSchemaKeysForEcosystem(ecosystem: OptionCategoryEcosystem): Set<string> {
  return new Set([...getMcpCategoryKeysForEcosystem(ecosystem), ...MCP_SHARED_SCHEMA_KEYS]);
}

function getSchemaOptions(category?: string, ecosystem?: string) {
  if (category) {
    const options = getMcpSchemaOptionValues(category);
    if (options.length === 0) {
      return {
        error: `Unknown category: ${category}. Available: ${MCP_ALL_SCHEMA_KEYS.join(", ")}`,
      };
    }
    return { category, options };
  }
  const allowedKeys =
    ecosystem && isMcpEcosystem(ecosystem) ? getMcpSchemaKeysForEcosystem(ecosystem) : null;
  const result: Record<string, string[]> = {};
  for (const key of MCP_ALL_SCHEMA_KEYS) {
    if (allowedKeys && !allowedKeys.has(key)) continue;
    result[key] = getMcpSchemaOptionValues(key);
  }
  return result;
}

function getInstallCommand(
  ecosystem: string,
  projectName: string,
  packageManager?: string,
  javaBuildTool?: string,
  javaWebFramework?: string,
  pythonPackageManager?: string,
): string {
  switch (ecosystem) {
    case "rust":
      return `cd ${projectName} && cargo build`;
    case "python":
      if (pythonPackageManager === "poetry")
        return `cd ${projectName} && poetry install --extras dev`;
      if (pythonPackageManager === "none") {
        const python = process.platform === "win32" ? "python" : "python3";
        const pip = process.platform === "win32" ? ".venv/Scripts/pip.exe" : ".venv/bin/pip";
        return `cd ${projectName} && ${python} -m venv .venv && ${pip} install -e ".[dev]"`;
      }
      return `cd ${projectName} && uv sync --extra dev`;
    case "go":
      return `cd ${projectName} && go mod tidy`;
    case "elixir":
      return `cd ${projectName} && mix deps.get && mix compile && mix test`;
    case "java":
      if (javaWebFramework === "quarkus") {
        return javaBuildTool === "gradle"
          ? `cd ${projectName} && ./gradlew test && ./gradlew quarkusDev`
          : `cd ${projectName} && ./mvnw test && ./mvnw quarkus:dev`;
      }
      return javaBuildTool === "gradle"
        ? `cd ${projectName} && ./gradlew test && ./gradlew bootRun`
        : `cd ${projectName} && ./mvnw test && ./mvnw spring-boot:run`;
    default:
      return `cd ${projectName} && ${packageManager ?? "bun"} install`;
  }
}

function mcpInputSchema<T extends z.ZodRawShape>(schema: T): z.ZodObject<T> {
  return z.object(schema);
}

function filterCompatibilityResult(
  result: {
    adjustedStack: CompatibilityInput | null;
    notes: Record<string, unknown>;
    changes: { category: string; message: string }[];
  },
  ecosystem: string,
) {
  const { adjustedStack, changes } = result;
  if (!adjustedStack) return { adjustedStack: null, changes };

  const relevantEcosystem = isMcpEcosystem(ecosystem) ? ecosystem : "typescript";
  const relevantKeys = new Set([
    ...getMcpCategoryKeysForEcosystem(relevantEcosystem),
    ...MCP_SHARED_COMPATIBILITY_KEYS,
  ]);
  const filtered: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(adjustedStack)) {
    if (relevantKeys.has(key)) filtered[key] = value;
  }
  return { adjustedStack: filtered, changes };
}

const MCP_CODE_QUALITY_ADDONS = new Set([
  "biome",
  "oxlint",
  "ultracite",
  "lefthook",
  "husky",
  "knip",
  "gitleaks",
  "ruler",
]);
const MCP_DOCUMENTATION_ADDONS = new Set(["starlight", "fumadocs"]);

const MCP_COMPATIBILITY_DEFAULTS = {
  astroIntegration: "none",
  runtime: "bun",
  backend: "hono",
  database: "none",
  orm: "none",
  dbSetup: "none",
  auth: "none",
  payments: "none",
  email: "none",
  fileUpload: "none",
  logging: "none",
  observability: "none",
  featureFlags: "none",
  integrations: "none",
  ecommerce: "none",
  analytics: "none",
  backendLibraries: "none",
  stateManagement: "none",
  forms: "none",
  validation: "none",
  testing: "none",
  realtime: "none",
  jobQueue: "none",
  caching: "none",
  rateLimit: "none",
  i18n: "none",
  animation: "none",
  cssFramework: "tailwind",
  uiLibrary: "none",
  shadcnBase: "radix",
  shadcnStyle: "nova",
  shadcnIconLibrary: "lucide",
  shadcnColorTheme: "neutral",
  shadcnBaseColor: "neutral",
  shadcnFont: "inter",
  shadcnRadius: "default",
  cms: "none",
  search: "none",
  vectorDb: "none",
  fileStorage: "none",
  mobileUI: "none",
  mobileStorage: "none",
  mobileTesting: "none",
  mobilePush: "none",
  mobileOTA: "none",
  mobileLibraries: [],
  packageManager: "bun",
  workspaceShape: "monorepo",
  versionChannel: "stable",
  examples: [],
  aiSdk: "none",
  aiDocs: ["claude-md", "agents-md"],
  git: "true",
  install: "false",
  api: "none",
  webDeploy: "none",
  serverDeploy: "none",
  yolo: "false",
  rustWebFramework: "none",
  rustFrontend: "none",
  rustOrm: "none",
  rustApi: "none",
  rustCli: "none",
  rustLibraries: [],
  rustLogging: "none",
  rustErrorHandling: "none",
  rustCaching: "none",
  rustAuth: "none",
  rustRealtime: "none",
  rustMessageQueue: "none",
  rustObservability: "none",
  rustTemplating: "none",
  pythonWebFramework: "none",
  pythonOrm: "none",
  pythonValidation: "none",
  pythonAi: [],
  pythonAuth: "none",
  pythonApi: "none",
  pythonTaskQueue: "none",
  pythonGraphql: "none",
  pythonQuality: "none",
  pythonTesting: [],
  pythonCaching: "none",
  pythonRealtime: "none",
  pythonObservability: "none",
  pythonCli: [],
  pythonCloudSdk: "none",
  pythonHttpClient: "none",
  pythonData: [],
  pythonMedia: "none",
  pythonServer: "none",
  pythonPackageManager: "uv",
  pythonMessageQueue: "none",
  goWebFramework: "none",
  goOrm: "none",
  goApi: "none",
  goCli: "none",
  goLogging: "none",
  goAuth: "none",
  goTesting: [],
  goRealtime: "none",
  goMessageQueue: "none",
  goCaching: "none",
  goConfig: "none",
  goObservability: "none",
  goValidation: "none",
  goQuality: "none",
  goMigrations: "none",
  goTemplating: "none",
  goProtoTooling: "none",
  goDI: "none",
  javaLanguage: "java",
  javaWebFramework: "spring-boot",
  javaBuildTool: "maven",
  javaOrm: "none",
  javaAuth: "none",
  javaApi: "none",
  javaLogging: "none",
  javaLibraries: [],
  javaTestingLibraries: ["junit5"],
  dotnetWebFramework: "aspnet-minimal",
  dotnetOrm: "ef-core",
  dotnetAuth: "aspnet-identity",
  dotnetApi: "minimal-api",
  dotnetTesting: ["xunit"],
  dotnetJobQueue: "none",
  dotnetRealtime: "signalr",
  dotnetObservability: ["serilog"],
  dotnetValidation: "none",
  dotnetCaching: "none",
  dotnetDeploy: "docker",
  dotnetLibraries: [],
  elixirWebFramework: "phoenix",
  elixirOrm: "ecto-sql",
  elixirAuth: "none",
  elixirApi: "rest",
  elixirRealtime: "channels",
  elixirJobs: "none",
  elixirValidation: "ecto-changesets",
  elixirHttp: "req",
  elixirJson: "jason",
  elixirEmail: "none",
  elixirCaching: "none",
  elixirObservability: "telemetry",
  elixirTesting: "ex_unit",
  elixirQuality: "credo",
  elixirI18n: "none",
  elixirHttpServer: "cowboy",
  elixirApplicationFramework: "none",
  elixirDocumentation: "none",
  elixirClustering: "none",
  elixirDeploy: "none",
  elixirLibraries: [],
} satisfies Partial<Record<keyof CompatibilityInput, string | string[]>>;

const {
  backendLibraries: _backendLibrariesDefault,
  aiSdk: _aiSdkDefault,
  git: _compatibilityGitDefault,
  install: _compatibilityInstallDefault,
  yolo: _yoloDefault,
  ...MCP_PROJECT_COMPATIBILITY_DEFAULTS
} = MCP_COMPATIBILITY_DEFAULTS;

const MCP_PROJECT_CONFIG_DEFAULTS = {
  ...MCP_PROJECT_COMPATIBILITY_DEFAULTS,
  addons: [],
  effect: "none",
  ai: "none",
} satisfies Partial<Record<keyof ProjectConfig, string | string[]>>;

function cloneMcpInputDefault<T extends string | string[]>(value: T): T {
  return (Array.isArray(value) ? [...value] : value) as T;
}

function applyMcpInputDefaults<TDefaults extends Record<string, string | string[]>>(
  defaults: TDefaults,
  input: Record<string, unknown>,
) {
  return Object.fromEntries(
    Object.entries(defaults).map(([key, fallback]) => [
      key,
      input[key] ?? cloneMcpInputDefault(fallback),
    ]),
  );
}

function getMcpCompatibilityDefaults(input: Record<string, unknown>) {
  return applyMcpInputDefaults(MCP_COMPATIBILITY_DEFAULTS, input) as Pick<
    CompatibilityInput,
    keyof typeof MCP_COMPATIBILITY_DEFAULTS
  >;
}

function getMcpProjectConfigDefaults(input: Record<string, unknown>) {
  return applyMcpInputDefaults(MCP_PROJECT_CONFIG_DEFAULTS, input) as Pick<
    ProjectConfig,
    keyof typeof MCP_PROJECT_CONFIG_DEFAULTS
  >;
}

export function validateMcpProjectConfigCompatibility(
  config: Pick<ProjectConfig, "ecosystem" | "integrations"> &
    Partial<Pick<ProjectConfig, "backend" | "runtime" | "webDeploy" | "stackParts">>,
): void {
  if (config.integrations !== "nango") return;

  const nangoPart = config.stackParts?.find(
    (part) => part.role === "integrations" && part.toolId === "nango",
  );
  const nangoOwner = nangoPart?.ownerPartId
    ? config.stackParts?.find((part) => part.id === nangoPart.ownerPartId)
    : undefined;
  const hasTypeScriptNangoOwner =
    nangoOwner?.role === "backend" && nangoOwner.ecosystem === "typescript";

  if (config.ecosystem !== "typescript" && !hasTypeScriptNangoOwner) {
    throw new Error("Nango integrations are supported only for TypeScript projects");
  }
  if (config.backend === "none") {
    throw new Error("Nango integrations require a generated backend");
  }
  if (config.backend === "convex") {
    throw new Error("Nango integrations are not available with the Convex backend");
  }
  if (
    config.runtime === "workers" ||
    (config.backend === "self" && config.webDeploy === "cloudflare")
  ) {
    throw new Error("Nango's Node SDK is not available on Cloudflare Workers");
  }
}

function buildProjectConfig(
  input: Record<string, unknown>,
  overrides?: { projectDir: string },
): ProjectConfig {
  const projectName = (input.projectName as string) ?? "my-project";
  const ecosystem = (input.ecosystem as ProjectConfig["ecosystem"]) ?? "typescript";
  const frontend =
    (input.frontend as ProjectConfig["frontend"]) ??
    (ecosystem === "react-native"
      ? ["native-bare"]
      : ecosystem === "typescript"
        ? ["tanstack-router"]
        : ["none"]);
  const hasNativeFrontend = frontend.some((item) => item.startsWith("native-"));
  const hasMobileProject = ecosystem === "react-native" || hasNativeFrontend;
  const defaults = getMcpProjectConfigDefaults(input);

  const config: ProjectConfig = {
    projectName,
    projectDir: overrides?.projectDir ?? "/virtual",
    relativePath: overrides ? `./${projectName}` : "./virtual",
    ecosystem,
    frontend,
    ...defaults,
    backend:
      (input.backend as ProjectConfig["backend"]) ??
      (ecosystem === "react-native" ? "none" : defaults.backend),
    runtime:
      (input.runtime as ProjectConfig["runtime"]) ??
      (ecosystem === "react-native" ? "none" : defaults.runtime),
    cssFramework:
      (input.cssFramework as ProjectConfig["cssFramework"]) ??
      (ecosystem === "react-native" ? "none" : defaults.cssFramework),
    mobileNavigation:
      (input.mobileNavigation as ProjectConfig["mobileNavigation"]) ??
      (hasMobileProject ? "expo-router" : "none"),
    mobileDeepLinking:
      (input.mobileDeepLinking as ProjectConfig["mobileDeepLinking"]) ??
      (hasMobileProject ? "expo-linking" : "none"),
    shadcnBase: (input.shadcnBase as ProjectConfig["shadcnBase"]) ?? "radix",
    shadcnStyle: (input.shadcnStyle as ProjectConfig["shadcnStyle"]) ?? "nova",
    shadcnIconLibrary: (input.shadcnIconLibrary as ProjectConfig["shadcnIconLibrary"]) ?? "lucide",
    shadcnColorTheme: (input.shadcnColorTheme as ProjectConfig["shadcnColorTheme"]) ?? "neutral",
    shadcnBaseColor: (input.shadcnBaseColor as ProjectConfig["shadcnBaseColor"]) ?? "neutral",
    shadcnFont: (input.shadcnFont as ProjectConfig["shadcnFont"]) ?? "inter",
    shadcnRadius: (input.shadcnRadius as ProjectConfig["shadcnRadius"]) ?? "default",
    aiDocs: (input.aiDocs as ProjectConfig["aiDocs"]) ?? ["claude-md", "agents-md"],
    git: false,
    install: false,
  };

  if (Array.isArray(input.addons) && input.addons.length > 0) {
    config.addons = [
      ...new Set([
        ...config.addons,
        ...input.addons.filter(
          (addon): addon is Exclude<ProjectConfig["addons"][number], "none"> =>
            typeof addon === "string" && addon !== "none",
        ),
      ]),
    ];
  }

  if (Array.isArray(input.part) && input.part.length > 0) {
    const stackParts = parseStackPartSpecs(
      input.part.filter((part): part is string => typeof part === "string"),
      "selected",
    );
    Object.assign(config, stackPartsToLegacyProjectConfigPartial(stackParts), { stackParts });
  }

  applyEffectBackendDefaults(config, new Set(Object.keys(input)));
  validateMcpProjectConfigCompatibility(config);

  return config;
}

function mergeLegacyAddonParts(part?: string[], addons?: string[]): string[] | undefined {
  const addonSpecs = (addons ?? [])
    .filter((addon) => addon !== "none")
    .map((addon) => {
      const capability = getToolingCapability(addon);
      if (!capability) throw new Error(`Unknown addon '${addon}'`);
      const owner = capability.ownerRole ? `${capability.ownerRole}.` : "";
      return `${owner}${capability.role}:${capability.ecosystem}:${addon}`;
    });
  const merged = [...new Set([...(part ?? []), ...addonSpecs])];
  return merged.length > 0 ? merged : undefined;
}

function sanitizePath(input: string): string {
  for (const ch of input) {
    if (ch.charCodeAt(0) < 0x20) {
      throw new Error("Path contains control characters");
    }
  }
  if (input.split(/[/\\]/).includes("..")) {
    throw new Error("Path must not contain '..' components");
  }
  return input;
}

function sanitizeProjectName(input: string): string {
  const projectName = sanitizePath(input);
  if (!/^[a-zA-Z0-9][a-zA-Z0-9._-]*$/.test(projectName) || projectName === ".") {
    throw new Error("Project name must be one portable directory name");
  }
  return projectName;
}

export function buildMcpCompatibilityInput(input: Record<string, unknown>): CompatibilityInput {
  const frontend = input.frontend as string[] | undefined;
  const webFrontend = (frontend ?? []).filter((item) => !item.startsWith("native-"));
  const nativeFrontend = (frontend ?? []).filter((item) => item.startsWith("native-"));
  const addons = (input.addons as string[] | undefined) ?? [];
  const ecosystem = (input.ecosystem as CompatibilityInput["ecosystem"]) ?? "typescript";
  const hasMobileProject = ecosystem === "react-native" || nativeFrontend.length > 0;
  const defaults = getMcpCompatibilityDefaults(input);

  const codeQuality = addons.filter((a) => MCP_CODE_QUALITY_ADDONS.has(a));
  const documentation = addons.filter((a) => MCP_DOCUMENTATION_ADDONS.has(a));
  const appPlatforms = addons.filter(
    (a) => ![...codeQuality, ...documentation, "none"].includes(a),
  );

  const result: CompatibilityInput = {
    ecosystem,
    projectName: (input.projectName as string) ?? null,
    webFrontend,
    nativeFrontend,
    ...defaults,
    dotnetFrontend: (input.dotnetFrontend as string) ?? "none",
    kotlinMobile: (input.kotlinMobile as string) ?? "none",
    kotlinMobileLibraries: Array.isArray(input.kotlinMobileLibraries)
      ? (input.kotlinMobileLibraries as string[])
      : [],
    swiftMobile: (input.swiftMobile as string) ?? "none",
    dartMobile: (input.dartMobile as string) ?? "none",
    mobileNavigation:
      (input.mobileNavigation as string) ?? (hasMobileProject ? "expo-router" : "none"),
    mobileDeepLinking:
      (input.mobileDeepLinking as string) ?? (hasMobileProject ? "expo-linking" : "none"),
    codeQuality,
    documentation,
    appPlatforms,
    aiSdk: (input.ai as string) ?? defaults.aiSdk,
  };

  result.backend = getCompatibilityBackend(
    { backend: result.backend as ProjectConfig["backend"] },
    webFrontend,
  );

  if (result.backend === "effect") {
    if (input.effect === undefined) {
      result.backendLibraries = "effect-full";
    }
    if (input.validation === undefined) {
      result.validation = "effect-schema";
    }
  }

  return result;
}

function summarizeTree(tree: {
  fileCount: number;
  directoryCount: number;
  root: { children: { type: string; name: string; children?: unknown[] }[] };
}) {
  const paths: string[] = [];
  function walk(nodes: { type: string; name: string; children?: unknown[] }[], prefix: string) {
    for (const node of nodes) {
      const current = prefix ? `${prefix}/${node.name}` : node.name;
      if (node.type === "directory" && node.children) {
        walk(node.children as typeof nodes, current);
      } else {
        paths.push(current);
      }
    }
  }
  walk(tree.root.children, "");
  return { fileCount: tree.fileCount, directoryCount: tree.directoryCount, files: paths };
}

type McpGraphPreview = {
  graphSummary?: string;
  effectiveStack?: Record<string, string>;
  stackPartSpecs: string[];
};

export function getMcpGraphPreview(
  config: Partial<ProjectConfig> | BetterTStackConfig,
): McpGraphPreview {
  const stackParts = config.stackParts?.length
    ? config.stackParts
    : legacyProjectConfigToStackParts(config);
  const graphSummary = stackParts.length > 0 ? getGraphSummary({ stackParts }) : undefined;
  const effectiveStack = stackParts.length > 0 ? getEffectiveStack({ stackParts }) : undefined;
  const stackPartSpecs = stackParts
    .filter((part) => part.source !== "provided" && part.toolId !== "none")
    .map((part) => formatStackPartSpec(part, stackParts));

  return {
    ...(graphSummary ? { graphSummary, effectiveStack } : {}),
    stackPartSpecs,
  };
}

const COMPATIBILITY_RULES_MD = `# Better-Fullstack Compatibility Rules

## Backend Constraints
- **Convex**: Forces runtime=none, database=none, orm=none, api=none, dbSetup=none, serverDeploy=none. Removes incompatible frontends (Solid, SolidStart, Astro).
- **Effect backend**: Requires effect=effect-full and validation=effect-schema. Other compatible frontend/backend-adjacent tools can still be selected.
- **No backend (none)**: Clears auth, payments, database, orm, api, serverDeploy, search, fileStorage.
- **Fullstack (backend='self')**: Sets runtime=none, serverDeploy=none. Only works with: next, vinext, tanstack-start, astro, nuxt, svelte, solid-start.

## Runtime Constraints
- NestJS and AdonisJS require runtime=node.
- Elysia requires runtime=bun.
- Cloudflare Workers runtime only works with Hono backend.
- backend=self or backend=convex requires runtime=none.

## API Constraints
- tRPC only works with React-based frontends: next, vinext, react-router, tanstack-router, tanstack-start.
- Use oRPC for svelte, solid, nuxt.
- Angular: use api=none (has built-in HttpClient).
- Qwik: use backend=none, api=none (built-in server, no external APIs).

## Database / ORM Constraints
- TypeORM + better-auth: unsupported (no adapter). Use auth=none or switch ORM.
- Sequelize + better-auth: unsupported (no adapter). Use auth=none or switch ORM.
- MongoDB requires mongoose ORM.
- EdgeDB has its own ORM (edgedb).

## UI Constraints
- shadcn-ui is incompatible with svelte and solid frontends.
- Redwood requires api=none and only supports daisyui or none for uiLibrary.

## Payments
- Polar requires better-auth and a web frontend.

## Email
- Rust, Python, Go, and Java currently support only Resend for email (\`email=resend\`) or no email (\`email=none\`).
- Java Resend requires Maven or Gradle so the generated project can manage the SDK dependency.

## Observability
- Rust, Python, Go, and Java currently support only Sentry for observability (\`observability=sentry\`) or no observability (\`observability=none\`).
- Python and Go additionally support SigNoz through their native fields (\`pythonObservability=signoz\` and \`goObservability=signoz\`).
- Java Sentry requires Maven or Gradle so the generated project can manage the SDK dependency.

## Ecosystem Isolation
- Rust, Python, Go, Java, and Elixir ecosystems are independent — TypeScript fields are ignored.
- Each ecosystem generates a standalone project with its own build system.
`;

const GETTING_STARTED_MD = `# Getting Started with Better-Fullstack MCP

## Quick Start — TypeScript Project
1. Call bfs_create_project with:
   - projectName: "my-app"
   - ecosystem: "typescript"
   - frontend: ["tanstack-router"]
   - backend: "hono"
   - runtime: "bun"
   - database: "sqlite"
   - orm: "drizzle"
2. Tell the user to run: cd my-app && bun install && bun run dev

## Quick Start — Rust Project
1. Call bfs_create_project with:
   - projectName: "my-rust-app"
   - ecosystem: "rust"
   - rustWebFramework: "axum"
   - rustOrm: "sqlx"
   - email: "resend" (optional)
   - observability: "sentry" (optional)
2. Tell the user to run: cd my-rust-app && cargo build

## Quick Start — Python Project
1. Call bfs_create_project with:
   - projectName: "my-python-app"
   - ecosystem: "python"
   - pythonWebFramework: "fastapi"
   - pythonOrm: "sqlalchemy"
   - pythonObservability: "signoz" (optional)
   - email: "resend" (optional)
   - observability: "sentry" (optional)
2. Tell the user to run: cd my-python-app && uv sync --extra dev

## Quick Start — Go Project
1. Call bfs_create_project with:
   - projectName: "my-go-app"
   - ecosystem: "go"
   - goWebFramework: "gin"
   - goOrm: "gorm"
   - goObservability: "signoz" (optional)
   - email: "resend" (optional)
   - observability: "sentry" (optional)
2. Tell the user to run: cd my-go-app && go mod tidy && go run cmd/server/main.go

## Quick Start — Java Project
1. Call bfs_create_project with:
   - projectName: "my-java-app"
   - ecosystem: "java"
   - javaWebFramework: "spring-boot"
   - javaBuildTool: "maven"
   - email: "resend" (optional)
   - observability: "sentry" (optional)
2. Tell the user to run: cd my-java-app && ./mvnw test && ./mvnw spring-boot:run

## Quick Start — Elixir Project
1. Call bfs_create_project with:
   - projectName: "my-elixir-app"
   - ecosystem: "elixir"
   - elixirWebFramework: "phoenix"
   - elixirOrm: "ecto-sql"
   - elixirApi: "rest"
   - elixirRealtime: "channels"
2. Tell the user to run: cd my-elixir-app && mix deps.get && mix phx.server

## Adding Features to Existing Projects
1. Call bfs_plan_stack_update with projectDir and any stack fields to add or change.
2. Review filesToAdd, filesToPatch, dependencyChanges, envChanges, and manualReviewBlockers.
3. If there are no blockers, call bfs_apply_stack_update with the same arguments.
4. Use bfs_plan_addition / bfs_add_feature for owner-scoped tooling Stack Parts and deploy targets.
`;

type McpToolAnnotations = {
  title?: string;
  readOnlyHint?: boolean;
  destructiveHint?: boolean;
  idempotentHint?: boolean;
  openWorldHint?: boolean;
};

const guidanceOutputSchema = z.object({
  workflow: z.array(z.string()),
  ecosystems: z.record(z.string(), z.string()),
  fieldRules: z.record(z.string(), z.string()),
  ambiguityRules: z.array(z.string()),
  criticalConstraints: z.array(z.string()),
});

const schemaOutputSchema = z.object({
  category: z.string().optional(),
  options: z.array(z.string()).optional(),
  categories: z.record(z.string(), z.array(z.string())).optional(),
  error: z.string().optional(),
});

const compatibilityIssueOutputSchema = z.object({
  code: z.string(),
  message: z.string(),
  category: z.string().optional(),
  optionId: z.string().optional(),
  provided: z.record(z.string(), z.union([z.string(), z.array(z.string())])).optional(),
  suggestions: z.array(z.string()).optional(),
});

const compatibilityOutputSchema = z.object({
  adjustedStack: z.record(z.string(), z.unknown()).nullable(),
  changes: z.array(z.object({ category: z.string(), message: z.string() })),
  issues: z.array(compatibilityIssueOutputSchema),
  hasIssues: z.boolean(),
});

const graphPreviewOutputShape = {
  graphSummary: z.string().optional(),
  effectiveStack: z.record(z.string(), z.string()).optional(),
  stackPartSpecs: z.array(z.string()).optional(),
};

const lifecycleVersionsOutputSchema = z.object({
  cli: z.string(),
  generator: z.string(),
  templateSet: z.string(),
  schema: z.string(),
});

const lifecycleResultOutputSchema = z.object({
  contractVersion: z.literal("1"),
  operation: z.enum(["create", "add", "remove", "stack-update", "template-update", "recover"]),
  status: z.enum(["planned", "applied", "blocked", "failed", "rolled-back", "recovered"]),
  projectDir: z.string(),
  changes: z.object({
    added: z.number(),
    patched: z.number(),
    merged: z.number(),
    removed: z.number(),
    manual: z.number(),
  }),
  warnings: z.array(z.string()),
  blockers: z.array(z.string()),
  provenance: z.object({
    source: lifecycleVersionsOutputSchema.nullable(),
    target: lifecycleVersionsOutputSchema.nullable(),
    verified: z.boolean(),
  }),
  recovery: z.object({
    available: z.boolean(),
    transactionId: z.string().optional(),
    command: z.string().optional(),
    automaticRollback: z.boolean().optional(),
  }),
  nextActions: z.array(z.string()),
});

const planProjectOutputSchema = z.object({
  success: z.boolean(),
  fileCount: z.number().optional(),
  directoryCount: z.number().optional(),
  files: z.array(z.string()).optional(),
  ...graphPreviewOutputShape,
});

const createProjectOutputSchema = z.object({
  success: z.boolean(),
  projectDirectory: z.string().optional(),
  fileCount: z.number().optional(),
  capabilityWarnings: z.array(z.string()).optional(),
  message: z.string().optional(),
  lifecycle: lifecycleResultOutputSchema.optional(),
  ...graphPreviewOutputShape,
});

const planAdditionOutputSchema = z.object({
  success: z.boolean(),
  projectDir: z.string().optional(),
  requestedParts: z.array(z.string()).optional(),
  requestedChanges: z.record(z.string(), z.unknown()).optional(),
  proposedConfig: z.record(z.string(), z.unknown()).optional(),
  graphSummary: z.string().optional(),
  filesToAdd: z.array(z.string()).optional(),
  filesToPatch: z.array(z.string()).optional(),
  filesToRemove: z.array(z.string()).optional(),
  compatibilityWarnings: z.array(z.string()).optional(),
});

const addFeatureOutputSchema = z.object({
  success: z.boolean(),
  addedCapabilities: z.array(z.string()).optional(),
  projectDir: z.string().optional(),
  error: z.string().optional(),
  message: z.string().optional(),
  lifecycle: lifecycleResultOutputSchema.optional(),
  recoveryId: z.string().optional(),
  ...graphPreviewOutputShape,
});

const stackUpdateOutputSchema = z.object({
  success: z.boolean(),
  projectDir: z.string().optional(),
  error: z.string().optional(),
  requestedChanges: z.record(z.string(), z.unknown()).optional(),
  proposedConfig: z.record(z.string(), z.unknown()).optional(),
  filesToAdd: z.array(z.string()).optional(),
  filesToPatch: z.array(z.string()).optional(),
  filesToRemove: z.array(z.string()).optional(),
  dependencyChanges: z.record(z.string(), z.record(z.string(), z.string())).optional(),
  scriptChanges: z.record(z.string(), z.array(z.string())).optional(),
  envChanges: z.record(z.string(), z.array(z.string())).optional(),
  manualReviewBlockers: z.array(z.string()).optional(),
  architectureChanges: z
    .array(z.object({ key: z.string(), from: z.string(), to: z.string() }))
    .optional(),
  migrationSteps: z.array(z.string()).optional(),
  requiresArchitectureAck: z.boolean().optional(),
  compatibilityAdjustments: z.array(z.string()).optional(),
  compatibilityWarnings: z.array(z.string()).optional(),
  installCommand: z.string().optional(),
  message: z.string().optional(),
  lifecycle: lifecycleResultOutputSchema.optional(),
  recoveryId: z.string().optional(),
  ...graphPreviewOutputShape,
});

function buildPresetStackSummary(config: CreateInput): string {
  const parts: string[] = [];
  const frontend = (config.frontend ?? []).filter((item) => item !== "none");
  if (frontend.length > 0) parts.push(`frontend: ${frontend.join("+")}`);
  if (config.backend && config.backend !== "none") parts.push(`backend: ${config.backend}`);
  if (config.runtime && config.runtime !== "none") parts.push(`runtime: ${config.runtime}`);
  if (config.database && config.database !== "none") parts.push(`database: ${config.database}`);
  if (config.orm && config.orm !== "none") parts.push(`orm: ${config.orm}`);
  if (config.api && config.api !== "none") parts.push(`api: ${config.api}`);
  if (config.auth && config.auth !== "none") parts.push(`auth: ${config.auth}`);
  if (config.payments && config.payments !== "none") parts.push(`payments: ${config.payments}`);
  const graph = getMcpGraphPreview(config);
  if (graph.stackPartSpecs.length > 0) parts.push(`parts: ${graph.stackPartSpecs.join("+")}`);
  return parts.join(", ");
}

function listMcpPresets() {
  const presets: {
    id: Template;
    name: string;
    description: string;
    ecosystem: "typescript" | "react-native";
    stackSummary: string;
    stack: CreateInput;
  }[] = [];
  for (const id of TEMPLATE_VALUES) {
    if (id === "none") continue;
    const config = getTemplateConfig(id);
    if (!config) continue;
    const frontend = (config.frontend ?? []) as string[];
    const ecosystem = frontend.some((item) => item.startsWith("native-"))
      ? "react-native"
      : "typescript";
    presets.push({
      id,
      name: id.toUpperCase(),
      description: getTemplateDescription(id),
      ecosystem,
      stackSummary: buildPresetStackSummary(config),
      stack: config,
    });
  }
  return presets;
}

function briefMatches(text: string, keywords: string[]): boolean {
  const tokens = new Set(text.split(/[^a-z0-9]+/i).filter(Boolean));
  return keywords.some((keyword) =>
    keyword.includes(" ") ? text.includes(keyword) : tokens.has(keyword),
  );
}

function matchNearestPreset(input: Record<string, unknown>): Template | null {
  const signatureKeys = ["database", "backend", "api", "auth"] as const;
  const inputFrontend = (input.frontend as string[] | undefined)?.[0];
  let best: { id: Template; score: number } | null = null;
  for (const id of TEMPLATE_VALUES) {
    if (id === "none") continue;
    const config = getTemplateConfig(id);
    if (!config) continue;
    let score = 0;
    for (const key of signatureKeys) {
      const value = config[key];
      if (value !== undefined && value === input[key]) score += 1;
    }
    const presetFrontend = (config.frontend ?? [])[0];
    if (presetFrontend && presetFrontend === inputFrontend) score += 1;
    if (!best || score > best.score) best = { id, score };
  }
  return best && best.score >= 3 ? best.id : null;
}

export function recommendStackFromBrief(
  brief: string,
  ecosystemHint?: ProjectConfig["ecosystem"],
): { input: Record<string, unknown>; rationale: string[]; matchedPreset: Template | null } {
  const text = brief.toLowerCase();
  const has = (...keywords: string[]) => briefMatches(text, keywords);
  const rationale: string[] = [];
  const input: Record<string, unknown> = {};

  if (ecosystemHint && ecosystemHint !== "typescript") {
    input.ecosystem = ecosystemHint;
    rationale.push(
      `Ecosystem forced to ${ecosystemHint} from the provided hint; using ${ecosystemHint} defaults.`,
    );
    rationale.push(
      `Brief keyword analysis (database/auth/payments/AI feature detection) currently applies to the TypeScript ecosystem only — configure those features explicitly for ${ecosystemHint} via bfs_check_compatibility.`,
    );
    return { input, rationale, matchedPreset: null };
  }

  const wantsMobile =
    has("mobile", "ios", "android", "expo") ||
    text.includes("react native") ||
    text.includes("react-native") ||
    text.includes("app store") ||
    text.includes("play store");
  if (wantsMobile) {
    input.ecosystem = "react-native";
    input.frontend = ["native-uniwind"];
    input.backend = "none";
    input.runtime = "none";
    input.api = "none";
    input.database = "none";
    input.orm = "none";
    rationale.push(
      "Mobile app detected: React Native (Expo) with the native-uniwind styling preset and no bundled backend.",
    );
    return { input, rationale, matchedPreset: "uniwind" };
  }

  input.ecosystem = "typescript";
  input.frontend = ["tanstack-router"];
  input.backend = "hono";
  input.runtime = "bun";
  input.database = "sqlite";
  input.orm = "drizzle";
  input.api = "trpc";
  rationale.push(
    "Default TypeScript fullstack baseline: TanStack Router + Hono + tRPC on SQLite/Drizzle (Bun).",
  );

  if (has("postgres", "postgresql", "supabase", "neon")) {
    input.database = "postgres";
    input.orm = "drizzle";
    rationale.push("Postgres requested: database=postgres, orm=drizzle.");
  } else if (has("mysql", "planetscale")) {
    input.database = "mysql";
    input.orm = "drizzle";
    rationale.push("MySQL requested: database=mysql, orm=drizzle.");
  } else if (has("mongo", "mongodb")) {
    input.database = "mongodb";
    input.orm = "mongoose";
    rationale.push("MongoDB requested: database=mongodb, orm=mongoose.");
  }

  const wantsSaas = has(
    "saas",
    "payment",
    "payments",
    "billing",
    "subscription",
    "subscriptions",
    "checkout",
    "stripe",
    "ecommerce",
  );
  if (wantsSaas) {
    input.payments = "stripe";
    input.auth = "better-auth";
    if (input.database === "sqlite") {
      input.database = "postgres";
      input.orm = "drizzle";
    }
    rationale.push(
      "SaaS/payments detected: Stripe + better-auth, upgraded to Postgres/Drizzle for production data.",
    );
  } else if (
    has(
      "auth",
      "login",
      "signin",
      "signup",
      "account",
      "accounts",
      "user",
      "users",
      "authentication",
      "admin",
      "dashboard",
      "portal",
      "members",
      "rbac",
      "permissions",
      "roles",
    )
  ) {
    input.auth = "better-auth";
    rationale.push("Authentication requested: auth=better-auth.");
  }

  if (
    has("ai", "chatbot", "llm", "gpt", "rag", "agent", "agents", "openai", "assistant", "copilot")
  ) {
    input.ai = "vercel-ai";
    input.examples = ["ai"];
    rationale.push("AI/chatbot detected: Vercel AI SDK with the bundled AI example.");
  }

  if (has("blog", "content", "cms", "marketing", "landing", "publishing")) {
    input.cms = "sanity";
    rationale.push("Content/marketing site detected: Sanity CMS.");
  }

  if (
    has("realtime", "collaborative", "collaboration", "multiplayer", "presence") ||
    text.includes("real-time") ||
    text.includes("real time")
  ) {
    input.realtime = "socket-io";
    rationale.push("Realtime/collaboration detected: Socket.IO.");
  }

  let matchedPreset: Template | null = null;
  if (has("t3")) matchedPreset = "t3";
  else if (has("mern")) matchedPreset = "mern";
  else if (has("pern")) matchedPreset = "pern";
  else matchedPreset = matchNearestPreset(input);
  if (matchedPreset) {
    rationale.push(`Closest ready-made preset: ${matchedPreset}.`);
  }

  return { input, rationale, matchedPreset };
}

function normalizeAdjustedToInput(
  adjusted: Record<string, unknown>,
  base: Record<string, unknown>,
): Record<string, unknown> {
  const webFrontend = (adjusted.webFrontend as string[] | undefined) ?? [];
  const nativeFrontend = (adjusted.nativeFrontend as string[] | undefined) ?? [];
  const frontend = [...webFrontend, ...nativeFrontend];
  const codeQuality = (adjusted.codeQuality as string[] | undefined) ?? [];
  const documentation = (adjusted.documentation as string[] | undefined) ?? [];
  const appPlatforms = (adjusted.appPlatforms as string[] | undefined) ?? [];
  return {
    ...adjusted,
    projectName: base.projectName,
    ecosystem: adjusted.ecosystem ?? base.ecosystem,
    frontend: frontend.length > 0 ? frontend : (base.frontend as string[] | undefined),
    addons: [...codeQuality, ...documentation, ...appPlatforms],
    ai: adjusted.aiSdk ?? base.ai,
  };
}

function summarizeRecommendedConfig(config: ProjectConfig) {
  const isTsWeb = config.ecosystem === "typescript" || config.ecosystem === "react-native";
  return {
    projectName: config.projectName,
    ecosystem: config.ecosystem,
    ...(isTsWeb
      ? {
          frontend: config.frontend,
          backend: config.backend,
          runtime: config.runtime,
          api: config.api,
        }
      : {}),
    database: config.database,
    orm: config.orm,
    auth: config.auth,
    payments: config.payments,
    ai: config.ai,
    cms: config.cms,
    realtime: config.realtime,
    examples: config.examples,
    stackPartSpecs: getMcpGraphPreview(config).stackPartSpecs,
  };
}

const mobileInputSchema = {
  mobileNavigation: MobileNavigationSchema.optional().describe("Mobile navigation"),
  mobileUI: MobileUISchema.optional().describe("Mobile UI"),
  mobileStorage: MobileStorageSchema.optional().describe("Mobile storage"),
  mobileTesting: MobileTestingSchema.optional().describe("Mobile testing"),
  mobilePush: MobilePushSchema.optional().describe("Mobile push notifications"),
  mobileOTA: MobileOTASchema.optional().describe("Mobile OTA updates"),
  mobileDeepLinking: MobileDeepLinkingSchema.optional().describe("Mobile deep linking"),
  mobileLibraries: z
    .array(MobileLibrariesSchema)
    .optional()
    .describe("Mobile application libraries"),
};

const deploymentInputSchema = {
  dbSetup: DatabaseSetupSchema.optional().describe("Database hosting provider"),
  webDeploy: WebDeploySchema.optional().describe("Web deployment target"),
  serverDeploy: ServerDeploySchema.optional().describe("Server deployment target"),
};

const crossEcosystemInputSchema = {
  rustWebFramework: RustWebFrameworkSchema.optional().describe("Rust web framework"),
  rustFrontend: RustFrontendSchema.optional().describe("Rust frontend (WASM)"),
  dotnetFrontend: DotnetFrontendSchema.optional().describe(".NET frontend (Blazor WebAssembly)"),
  kotlinMobile: KotlinMobileSchema.optional().describe("Kotlin mobile app"),
  kotlinMobileLibraries: z
    .array(KotlinMobileLibrariesSchema)
    .optional()
    .describe("Kotlin mobile libraries"),
  swiftMobile: SwiftMobileSchema.optional().describe("Swift mobile app"),
  dartMobile: DartMobileSchema.optional().describe("Dart mobile app"),
  rustOrm: RustOrmSchema.optional().describe("Rust ORM"),
  rustApi: RustApiSchema.optional().describe("Rust API layer"),
  rustCli: RustCliSchema.optional().describe("Rust CLI framework"),
  rustLibraries: z.array(RustLibrariesSchema).optional().describe("Rust libraries"),
  rustLogging: RustLoggingSchema.optional().describe("Rust logging library"),
  rustErrorHandling: RustErrorHandlingSchema.optional().describe("Rust error handling library"),
  rustCaching: RustCachingSchema.optional().describe("Rust caching library"),
  rustAuth: RustAuthSchema.optional().describe("Rust authentication library"),
  rustRealtime: RustRealtimeSchema.optional().describe("Rust realtime library"),
  rustMessageQueue: RustMessageQueueSchema.optional().describe("Rust message queue"),
  rustObservability: RustObservabilitySchema.optional().describe("Rust observability"),
  rustTemplating: RustTemplatingSchema.optional().describe("Rust template engine"),
  pythonWebFramework: PythonWebFrameworkSchema.optional().describe("Python web framework"),
  pythonOrm: PythonOrmSchema.optional().describe("Python ORM"),
  pythonValidation: PythonValidationSchema.optional().describe("Python validation"),
  pythonAi: z.array(PythonAiSchema).optional().describe("Python AI libraries"),
  pythonAuth: PythonAuthSchema.optional().describe("Python auth library"),
  pythonApi: PythonApiSchema.optional().describe("Python API framework"),
  pythonTaskQueue: PythonTaskQueueSchema.optional().describe("Python task queue"),
  pythonGraphql: PythonGraphqlSchema.optional().describe("Python GraphQL framework"),
  pythonQuality: PythonQualitySchema.optional().describe("Python code quality"),
  pythonTesting: z.array(PythonTestingSchema).optional().describe("Python testing libraries"),
  pythonCaching: PythonCachingSchema.optional().describe("Python caching library"),
  pythonRealtime: PythonRealtimeSchema.optional().describe("Python realtime library"),
  pythonObservability: PythonObservabilitySchema.optional().describe(
    "Python observability (OpenTelemetry, SigNoz, or Prometheus)",
  ),
  pythonCli: z.array(PythonCliSchema).optional().describe("Python CLI tooling"),
  pythonCloudSdk: PythonCloudSdkSchema.optional().describe("Python cloud SDK"),
  pythonHttpClient: PythonHttpClientSchema.optional().describe("Python HTTP client"),
  pythonData: z.array(PythonDataSchema).optional().describe("Python data/scientific libraries"),
  pythonMedia: PythonMediaSchema.optional().describe("Python media library"),
  pythonServer: PythonServerSchema.optional().describe("Python production server"),
  pythonPackageManager: PythonPackageManagerSchema.optional().describe("Python package manager"),
  pythonMessageQueue: PythonMessageQueueSchema.optional().describe("Python message queue client"),
  goWebFramework: GoWebFrameworkSchema.optional().describe("Go web framework"),
  goOrm: GoOrmSchema.optional().describe("Go ORM"),
  goApi: GoApiSchema.optional().describe("Go API layer"),
  goCli: GoCliSchema.optional().describe("Go CLI framework"),
  goLogging: GoLoggingSchema.optional().describe("Go logging library"),
  goAuth: GoAuthSchema.optional().describe("Go authentication library"),
  goTesting: z.array(GoTestingSchema).optional().describe("Go testing libraries"),
  goRealtime: GoRealtimeSchema.optional().describe("Go realtime/WebSocket library"),
  goMessageQueue: GoMessageQueueSchema.optional().describe("Go message queue"),
  goCaching: GoCachingSchema.optional().describe("Go caching library"),
  goConfig: GoConfigSchema.optional().describe("Go config management"),
  goObservability: GoObservabilitySchema.optional().describe(
    "Go observability (OpenTelemetry, SigNoz, or Prometheus)",
  ),
  goValidation: GoValidationSchema.optional().describe("Go validation"),
  goQuality: GoQualitySchema.optional().describe("Go code quality"),
  goMigrations: GoMigrationsSchema.optional().describe("Go database migrations"),
  goTemplating: GoTemplatingSchema.optional().describe("Go templating"),
  goProtoTooling: GoProtoToolingSchema.optional().describe("Go protobuf tooling"),
  goDI: GoDISchema.optional().describe("Go dependency injection"),
  javaLanguage: JavaLanguageSchema.optional().describe("JVM language (java, kotlin)"),
  javaWebFramework: JavaWebFrameworkSchema.optional().describe("Java web framework"),
  javaBuildTool: JavaBuildToolSchema.optional().describe("Java build tool"),
  javaOrm: JavaOrmSchema.optional().describe("Java ORM"),
  javaAuth: JavaAuthSchema.optional().describe("Java authentication library"),
  javaApi: JavaApiSchema.optional().describe("Java API layer"),
  javaLogging: JavaLoggingSchema.optional().describe("Java logging configuration"),
  javaLibraries: z.array(JavaLibrariesSchema).optional().describe("Java application libraries"),
  javaTestingLibraries: z
    .array(JavaTestingLibrariesSchema)
    .optional()
    .describe("Java testing libraries"),
  dotnetWebFramework: DotnetWebFrameworkSchema.optional().describe(".NET web framework"),
  dotnetOrm: DotnetOrmSchema.optional().describe(".NET ORM/data access"),
  dotnetAuth: DotnetAuthSchema.optional().describe(".NET authentication library"),
  dotnetApi: DotnetApiSchema.optional().describe(".NET API style"),
  dotnetTesting: z.array(DotnetTestingSchema).optional().describe(".NET testing libraries"),
  dotnetJobQueue: DotnetJobQueueSchema.optional().describe(".NET jobs and scheduling"),
  dotnetRealtime: DotnetRealtimeSchema.optional().describe(".NET realtime feature"),
  dotnetObservability: z
    .array(DotnetObservabilitySchema)
    .optional()
    .describe(".NET observability/logging libraries"),
  dotnetValidation: DotnetValidationSchema.optional().describe(".NET validation"),
  dotnetCaching: DotnetCachingSchema.optional().describe(".NET caching library"),
  dotnetDeploy: DotnetDeploySchema.optional().describe(".NET deployment target"),
  dotnetLibraries: z.array(DotnetLibrariesSchema).optional().describe(".NET application libraries"),
  elixirWebFramework: ElixirWebFrameworkSchema.optional().describe("Elixir web framework"),
  elixirOrm: ElixirOrmSchema.optional().describe("Elixir persistence layer"),
  elixirAuth: ElixirAuthSchema.optional().describe("Elixir authentication"),
  elixirApi: ElixirApiSchema.optional().describe("Elixir API layer"),
  elixirRealtime: ElixirRealtimeSchema.optional().describe("Elixir realtime feature"),
  elixirJobs: ElixirJobsSchema.optional().describe("Elixir jobs and scheduling"),
  elixirValidation: ElixirValidationSchema.optional().describe("Elixir validation/data"),
  elixirHttp: ElixirHttpSchema.optional().describe("Elixir HTTP client"),
  elixirJson: ElixirJsonSchema.optional().describe("Elixir JSON library"),
  elixirEmail: ElixirEmailSchema.optional().describe("Elixir email library"),
  elixirCaching: ElixirCachingSchema.optional().describe("Elixir caching library"),
  elixirObservability: ElixirObservabilitySchema.optional().describe("Elixir observability"),
  elixirTesting: ElixirTestingSchema.optional().describe("Elixir testing library"),
  elixirQuality: ElixirQualitySchema.optional().describe("Elixir code quality/security"),
  elixirI18n: ElixirI18nSchema.optional().describe("Elixir localization"),
  elixirHttpServer: ElixirHttpServerSchema.optional().describe("Elixir HTTP server"),
  elixirApplicationFramework: ElixirApplicationFrameworkSchema.optional().describe(
    "Elixir application framework",
  ),
  elixirDocumentation: ElixirDocumentationSchema.optional().describe(
    "Elixir documentation tooling",
  ),
  elixirClustering: ElixirClusteringSchema.optional().describe("Elixir clustering"),
  elixirDeploy: ElixirDeploySchema.optional().describe("Elixir deployment target"),
  elixirLibraries: z.array(ElixirLibrariesSchema).optional().describe("Elixir libraries"),
};

export const MCP_PLAN_CREATE_SCHEMA = {
  projectName: z.string().optional().describe("Project name (kebab-case)"),
  part: z
    .array(z.string())
    .optional()
    .describe("Stack graph part binding, e.g. frontend:typescript:next or backend.orm:go:gorm"),
  addons: z.array(AddonsSchema).optional().describe("Deprecated alias for tooling part bindings"),
  ecosystem: EcosystemSchema.optional().describe("Language ecosystem (default: typescript)"),
  frontend: z.array(FrontendSchema).optional().describe("Frontend frameworks (TypeScript only)"),
  backend: BackendSchema.optional().describe("Backend framework"),
  runtime: RuntimeSchema.optional().describe("JavaScript runtime"),
  database: DatabaseSchema.optional().describe("Database type"),
  orm: ORMSchema.optional().describe("ORM"),
  api: APISchema.optional().describe("API layer"),
  auth: AuthSchema.optional().describe("Auth provider"),
  payments: PaymentsSchema.optional().describe("Payments provider"),
  email: EmailSchema.optional().describe("Email provider"),
  examples: z.array(ExamplesSchema).optional().describe("Example templates"),
  packageManager: PackageManagerSchema.optional().describe("Package manager (default: bun)"),
  cssFramework: CSSFrameworkSchema.optional().describe("CSS framework"),
  uiLibrary: UILibrarySchema.optional().describe("UI component library"),
  shadcnBase: ShadcnBaseSchema.optional().describe("shadcn/ui headless library"),
  shadcnStyle: ShadcnStyleSchema.optional().describe("shadcn/ui visual style"),
  shadcnIconLibrary: ShadcnIconLibrarySchema.optional().describe("shadcn/ui icon library"),
  shadcnColorTheme: ShadcnColorThemeSchema.optional().describe("shadcn/ui color theme"),
  shadcnBaseColor: ShadcnBaseColorSchema.optional().describe("shadcn/ui base neutral color"),
  shadcnFont: ShadcnFontSchema.optional().describe("shadcn/ui font"),
  shadcnRadius: ShadcnRadiusSchema.optional().describe("shadcn/ui border radius"),
  ai: AISchema.optional().describe("AI SDK"),
  stateManagement: StateManagementSchema.optional().describe("State management"),
  forms: FormsSchema.optional().describe("Forms library"),
  validation: ValidationSchema.optional().describe("Validation library"),
  testing: TestingSchema.optional().describe("Testing framework"),
  realtime: RealtimeSchema.optional().describe("Realtime library"),
  jobQueue: JobQueueSchema.optional().describe("Job queue"),
  animation: AnimationSchema.optional().describe("Animation library"),
  logging: LoggingSchema.optional().describe("Logging library"),
  observability: ObservabilitySchema.optional().describe("Observability"),
  featureFlags: FeatureFlagsSchema.optional().describe("Feature flag provider"),
  integrations: IntegrationsSchema.optional().describe("Third-party integrations SDK"),
  ecommerce: EcommerceSchema.optional().describe("E-commerce platform SDK"),
  search: SearchSchema.optional().describe("Search engine"),
  vectorDb: VectorDbSchema.optional().describe("Vector database (TypeScript only)"),
  caching: CachingSchema.optional().describe("Caching solution"),
  rateLimit: RateLimitSchema.optional().describe("Rate limiting solution"),
  i18n: I18nSchema.optional().describe("Internationalization (i18n) library"),
  cms: CMSSchema.optional().describe("CMS"),
  fileStorage: FileStorageSchema.optional().describe("File storage"),
  ...mobileInputSchema,
  fileUpload: FileUploadSchema.optional().describe("File upload"),
  ...deploymentInputSchema,
  effect: EffectSchema.optional().describe("Effect services (effect, effect-full)"),
  analytics: AnalyticsSchema.optional().describe("Privacy-focused analytics provider"),
  astroIntegration: AstroIntegrationSchema.optional().describe(
    "Astro UI framework integration (react, vue, svelte, solid)",
  ),
  aiDocs: z
    .array(AiDocsSchema)
    .optional()
    .describe("AI documentation files (claude-md, agents-md, cursorrules)"),
  versionChannel: VersionChannelSchema.optional().describe(
    "Dependency version channel (stable, latest, beta)",
  ),
  ...crossEcosystemInputSchema,
};

const { addons: _createOnlyAddonsAlias, ...MCP_STACK_UPDATE_BASE_SCHEMA } = MCP_PLAN_CREATE_SCHEMA;

export const MCP_STACK_UPDATE_SCHEMA = {
  ...MCP_STACK_UPDATE_BASE_SCHEMA,
  projectDir: z.string().describe("Absolute path to the existing Better-Fullstack project"),
  acknowledgeArchitectureChange: z
    .boolean()
    .optional()
    .describe(
      "Acknowledge that this update replaces an existing database/orm/auth/api/backend/runtime choice. Required to apply architecture-changing updates; data and schema are NOT migrated automatically.",
    ),
};

export function createMcpServer(): McpServer {
  const server = new McpServer(
    { name: "better-fullstack", version: getLatestCLIVersion() },
    {
      instructions: INSTRUCTIONS,
      cacheHints: {
        "tools/list": { ttlMs: 300_000, cacheScope: "public" },
        "resources/list": { ttlMs: 300_000, cacheScope: "public" },
      },
    },
  );

  const registerTool = <Input extends Record<string, unknown> = Record<string, unknown>>(
    name: string,
    config: {
      description: string;
      inputSchema?: z.ZodType;
      outputSchema?: z.ZodType;
      annotations?: McpToolAnnotations;
    },
    cb: (input: Input) => unknown,
  ): void => {
    (
      server.registerTool as unknown as (
        toolName: string,
        toolConfig: Record<string, unknown>,
        toolCb: (input: Input) => unknown,
      ) => void
    )(name, config, async (input) =>
      withCommandTelemetry(name, async () => cb(input), {
        source: "mcp",
        mode: config.annotations?.readOnlyHint ? "read" : "write",
        dimensions: { mcpTool: name },
        resultStatus: (result) =>
          result &&
          typeof result === "object" &&
          "isError" in result &&
          (result as { isError?: unknown }).isError === true
            ? "failed"
            : "succeeded",
      }),
    );
  };

  registerTool(
    "bfs_get_guidance",
    {
      description:
        "Returns workflow rules, field semantics, ambiguity rules, and critical constraints. Call this FIRST before using other tools.",
      inputSchema: mcpInputSchema({}),
      outputSchema: guidanceOutputSchema,
      annotations: {
        title: "Get guidance",
        readOnlyHint: true,
        idempotentHint: true,
        openWorldHint: false,
      },
    },
    async () => {
      const guidance = getGuidance();
      return {
        content: [{ type: "text", text: JSON.stringify(guidance, null, 2) }],
        structuredContent: guidance,
      };
    },
  );

  registerTool(
    "bfs_get_schema",
    {
      description:
        "Returns valid options for a specific category (e.g., 'database', 'frontend', 'backend') or ALL categories. Use ecosystem to filter to relevant categories only.",
      inputSchema: mcpInputSchema({
        category: z
          .string()
          .optional()
          .describe(
            "Category name (e.g., 'database', 'orm', 'frontend'). Omit for all categories.",
          ),
        ecosystem: EcosystemSchema.optional().describe(
          "Filter categories to this ecosystem (e.g., 'rust' returns only Rust + shared categories).",
        ),
      }),
      outputSchema: schemaOutputSchema,
      annotations: {
        title: "Get schema options",
        readOnlyHint: true,
        idempotentHint: true,
        openWorldHint: false,
      },
    },
    async ({
      category,
      ecosystem,
    }: {
      category?: string;
      ecosystem?: ProjectConfig["ecosystem"];
    }) => {
      const result = getSchemaOptions(category, ecosystem);
      const structuredContent =
        "error" in result
          ? { error: result.error }
          : "category" in result
            ? { category: result.category, options: result.options }
            : { categories: result };
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        structuredContent,
      };
    },
  );

  registerTool(
    "bfs_list_presets",
    {
      description:
        "Lists the ready-made stack presets available to the CLI (mern, pern, t3, uniwind) with id, name, description, ecosystem, and a stack summary. Use to discover a starting point before bfs_recommend_stack, bfs_plan_project, or bfs_create_project.",
      inputSchema: mcpInputSchema({}),
      annotations: {
        title: "List presets",
        readOnlyHint: true,
        idempotentHint: true,
        openWorldHint: false,
      },
    },
    async () => {
      const presets = listMcpPresets();
      return {
        content: [{ type: "text", text: JSON.stringify({ presets }, null, 2) }],
      };
    },
  );

  registerTool(
    "bfs_recommend_stack",
    {
      description:
        "Recommends a compatibility-validated stack from a natural-language brief using deterministic keyword rules (no LLM). Returns the config, rationale, any auto-applied compatibility adjustments, the nearest matching preset, and a reproducible CLI command.",
      inputSchema: mcpInputSchema({
        brief: z
          .string()
          .describe(
            "Natural-language description of the app to build (e.g., 'a SaaS with payments and auth').",
          ),
        ecosystem: EcosystemSchema.optional().describe(
          "Force a language ecosystem. Omit to let the brief decide (defaults to TypeScript).",
        ),
        projectName: z
          .string()
          .optional()
          .describe("Project name (kebab-case). Default: 'my-app'."),
      }),
      annotations: {
        title: "Recommend stack",
        readOnlyHint: true,
        idempotentHint: false,
        openWorldHint: false,
      },
    },
    async ({
      brief,
      ecosystem,
      projectName,
    }: {
      brief: string;
      ecosystem?: ProjectConfig["ecosystem"];
      projectName?: string;
    }) => {
      try {
        const {
          input: recommended,
          rationale,
          matchedPreset,
        } = recommendStackFromBrief(brief, ecosystem);
        const baseInput: Record<string, unknown> = {
          projectName: projectName ?? "my-app",
          ...recommended,
        };
        const compatResult = analyzeStackCompatibility(buildMcpCompatibilityInput(baseInput));
        const normalizedInput = compatResult.adjustedStack
          ? normalizeAdjustedToInput(
              compatResult.adjustedStack as unknown as Record<string, unknown>,
              baseInput,
            )
          : baseInput;
        const finalConfig = buildProjectConfig(normalizedInput, {
          projectDir: `/${baseInput.projectName as string}`,
        });
        const adjustments = compatResult.changes.map(
          (change) => `${change.category}: ${change.message}`,
        );
        const graphPreview = getMcpGraphPreview(finalConfig);
        const reproducibleCommand = generateReproducibleCommand(finalConfig);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  brief,
                  config: summarizeRecommendedConfig(finalConfig),
                  rationale,
                  adjustments,
                  matchedPreset,
                  reproducibleCommand,
                  ...graphPreview,
                  nextSteps:
                    "Call bfs_plan_project with this config to preview the files, then bfs_create_project to scaffold it.",
                },
                null,
                2,
              ),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Recommend stack failed: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        };
      }
    },
  );

  registerTool(
    "bfs_check_compatibility",
    {
      description:
        "Validates a stack combination and returns auto-adjusted selections with warnings. Call BEFORE creating a project to avoid invalid combinations.",
      outputSchema: compatibilityOutputSchema,
      annotations: {
        title: "Check stack compatibility",
        readOnlyHint: true,
        idempotentHint: true,
        openWorldHint: false,
      },
      inputSchema: mcpInputSchema({
        ecosystem: EcosystemSchema.describe("Language ecosystem"),
        frontend: z
          .array(z.string())
          .optional()
          .describe("Web frontend frameworks (TypeScript only)"),
        backend: z.string().optional().describe("Backend framework"),
        runtime: z.string().optional().describe("JavaScript runtime"),
        database: z.string().optional().describe("Database type"),
        orm: z.string().optional().describe("ORM"),
        api: z.string().optional().describe("API layer"),
        auth: z.string().optional().describe("Auth provider"),
        payments: z.string().optional().describe("Payments provider"),
        email: EmailSchema.optional().describe("Email provider"),
        fileUpload: FileUploadSchema.optional().describe("File upload provider"),
        ai: AISchema.optional().describe("AI SDK"),
        stateManagement: StateManagementSchema.optional().describe("State management"),
        forms: FormsSchema.optional().describe("Forms library"),
        validation: ValidationSchema.optional().describe("Validation library"),
        testing: TestingSchema.optional().describe("Testing framework"),
        realtime: RealtimeSchema.optional().describe("Realtime library"),
        jobQueue: JobQueueSchema.optional().describe("Job queue"),
        animation: AnimationSchema.optional().describe("Animation library"),
        logging: LoggingSchema.optional().describe("Logging library"),
        observability: ObservabilitySchema.optional().describe("Observability provider"),
        featureFlags: FeatureFlagsSchema.optional().describe("Feature flags provider"),
        integrations: IntegrationsSchema.optional().describe("Third-party integrations SDK"),
        ecommerce: EcommerceSchema.optional().describe("E-commerce platform SDK"),
        analytics: AnalyticsSchema.optional().describe("Analytics provider"),
        cms: CMSSchema.optional().describe("CMS"),
        caching: CachingSchema.optional().describe("Caching solution"),
        rateLimit: RateLimitSchema.optional().describe("Rate limiting solution"),
        i18n: I18nSchema.optional().describe("Internationalization library"),
        search: SearchSchema.optional().describe("Search engine"),
        vectorDb: VectorDbSchema.optional().describe("Vector database (TypeScript only)"),
        fileStorage: FileStorageSchema.optional().describe("File storage"),
        ...mobileInputSchema,
        ...deploymentInputSchema,
        astroIntegration: AstroIntegrationSchema.optional().describe(
          "Astro UI framework integration",
        ),
        uiLibrary: z.string().optional().describe("UI component library"),
        cssFramework: z.string().optional().describe("CSS framework"),
        shadcnBase: ShadcnBaseSchema.optional().describe("shadcn/ui headless library"),
        shadcnStyle: ShadcnStyleSchema.optional().describe("shadcn/ui visual style"),
        shadcnIconLibrary: ShadcnIconLibrarySchema.optional().describe("shadcn/ui icon library"),
        shadcnColorTheme: ShadcnColorThemeSchema.optional().describe("shadcn/ui color theme"),
        shadcnBaseColor: ShadcnBaseColorSchema.optional().describe("shadcn/ui base neutral color"),
        shadcnFont: ShadcnFontSchema.optional().describe("shadcn/ui font"),
        shadcnRadius: ShadcnRadiusSchema.optional().describe("shadcn/ui border radius"),
        part: z.array(z.string()).optional().describe("Canonical Stack Part bindings"),
        addons: z
          .array(AddonsSchema)
          .optional()
          .describe("Deprecated alias for tooling part bindings"),
        examples: z.array(ExamplesSchema).optional().describe("Example templates"),
        packageManager: PackageManagerSchema.optional().describe("Package manager"),
        ...crossEcosystemInputSchema,
      }),
    },
    async (input: Record<string, unknown>) => {
      try {
        const compatibilitySource = Array.isArray(input.part) ? buildProjectConfig(input) : input;
        const compatInput = buildMcpCompatibilityInput(compatibilitySource);
        const result = analyzeStackCompatibility(compatInput);
        const filtered = filterCompatibilityResult(result, input.ecosystem as string);
        const evaluation = evaluateCompatibility(compatInput);
        const relevantEcosystem = isMcpEcosystem(input.ecosystem as string)
          ? (input.ecosystem as OptionCategoryEcosystem)
          : "typescript";
        const relevantIssueKeys = new Set<string>([
          ...getMcpCategoryKeysForEcosystem(relevantEcosystem),
          ...MCP_SHARED_COMPATIBILITY_KEYS,
        ]);
        const issues = evaluation.issues.filter(
          (issue) => !issue.category || relevantIssueKeys.has(issue.category),
        );
        const structuredContent = {
          adjustedStack: filtered.adjustedStack,
          changes: filtered.changes,
          issues,
          hasIssues: issues.length > 0,
        };
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ ...filtered, issues }, null, 2),
            },
          ],
          structuredContent,
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Compatibility check failed: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        };
      }
    },
  );

  registerTool(
    "bfs_plan_project",
    {
      description:
        "Dry-run: generates a project in-memory and returns the file tree WITHOUT writing to disk. Use this to preview what would be created.",
      inputSchema: mcpInputSchema(MCP_PLAN_CREATE_SCHEMA),
      outputSchema: planProjectOutputSchema,
      annotations: {
        title: "Plan project (dry run)",
        readOnlyHint: true,
        idempotentHint: true,
        openWorldHint: false,
      },
    },
    async (input: Record<string, unknown>) => {
      try {
        const { generateVirtualProject, EMBEDDED_TEMPLATES } =
          await import("@better-fullstack/template-generator");
        const config = buildProjectConfig(input);
        const result = await generateVirtualProject({ config, templates: EMBEDDED_TEMPLATES });

        if (result.success && result.tree) {
          const summary = summarizeTree(result.tree);
          const graphPreview = getMcpGraphPreview(config);
          const payload = { success: true as const, ...summary, ...graphPreview };
          return {
            content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
            structuredContent: payload,
          };
        }
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ success: false, error: result.error ?? "Unknown error" }),
            },
          ],
          isError: true,
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Plan failed: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        };
      }
    },
  );

  registerTool(
    "bfs_create_project",
    {
      description:
        "Creates a new fullstack project on disk. Dependencies are NOT installed (agent must tell user to install manually). Call bfs_plan_project first to preview.",
      inputSchema: mcpInputSchema({
        ...MCP_PLAN_CREATE_SCHEMA,
        projectName: z
          .string()
          .regex(/^[a-zA-Z0-9][a-zA-Z0-9._-]*$/)
          .refine((value) => value !== ".")
          .describe("Project name (kebab-case). Will be the directory name."),
        targetDir: z
          .string()
          .optional()
          .describe(
            "Absolute path to the parent directory in which to create the project folder (default: current working directory).",
          ),
      }),
      outputSchema: createProjectOutputSchema,
      annotations: {
        title: "Create project",
        readOnlyHint: false,
        destructiveHint: false,
        idempotentHint: false,
        openWorldHint: false,
      },
    },
    async (input: Record<string, unknown> & { projectName: string }) => {
      const startTime = Date.now();
      try {
        const path = await import("node:path");

        const projectName = sanitizeProjectName(input.projectName);
        const targetDir = input.targetDir ? sanitizePath(input.targetDir as string) : undefined;
        const projectDir = path.resolve(targetDir ?? process.cwd(), projectName);
        const config = buildProjectConfig(input, { projectDir });
        const { createProject } = await import("./helpers/core/create-project.js");
        const result = await runWithContextAsync({ silent: true }, () =>
          createProject(config, { allowExistingDirectory: false }),
        );
        const graphPreview = getMcpGraphPreview(config);

        const ecosystem = (input.ecosystem as string) ?? "typescript";
        const installCmd = getInstallCommand(
          ecosystem,
          projectName,
          input.packageManager as string | undefined,
          input.javaBuildTool as string | undefined,
          input.javaWebFramework as string | undefined,
          input.pythonPackageManager as string | undefined,
        );
        await trackProjectCreation(config, false, {
          source: "mcp",
          success: true,
          fileCount: result.fileCount,
          durationMs: Date.now() - startTime,
        });
        const payload = {
          success: true as const,
          projectDirectory: projectDir,
          fileCount: result.fileCount,
          ...graphPreview,
          ...(result.addonWarnings.length > 0 ? { capabilityWarnings: result.addonWarnings } : {}),
          lifecycle: result.lifecycle,
          message: `Project created at ${projectDir}. Tell the user to run: ${installCmd}`,
        };
        return {
          content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
          structuredContent: payload,
        };
      } catch (error) {
        await trackEvent(
          "project_created",
          {},
          {
            source: "mcp",
            success: false,
            errorName: error instanceof Error ? error.name : "UnknownError",
            durationMs: Date.now() - startTime,
          },
        );
        return {
          content: [
            {
              type: "text",
              text: `Project creation failed: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        };
      }
    },
  );

  function compatibilityWarningsForStackUpdate(
    proposedConfig: BetterTStackConfig,
  ): string[] | undefined {
    const compatResult = analyzeStackCompatibility(buildMcpCompatibilityInput(proposedConfig));
    return compatResult.changes.length > 0
      ? compatResult.changes.map((change) => change.message)
      : undefined;
  }

  registerTool(
    "bfs_get_project_status",
    {
      description:
        "Returns Better Fullstack project status and explicit lifecycle prerequisites without executing generated toolchains.",
      inputSchema: mcpInputSchema({
        projectDir: z.string().describe("Path to the existing Better Fullstack project"),
      }),
      annotations: {
        title: "Get project status",
        readOnlyHint: true,
        idempotentHint: true,
        openWorldHint: false,
      },
    },
    async (input: { projectDir: string }) => {
      const payload = await getMcpProjectStatus(sanitizePath(input.projectDir));
      return {
        content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
        structuredContent: payload,
        ...(!payload.success ? { isError: true } : {}),
      };
    },
  );

  registerTool(
    "bfs_check_project",
    {
      description:
        "Executes the same complete multi-target checks as CLI check and reports every expected target, command/toolchain, status, and reason. Missing targets or toolchains fail. Build tools may fetch dependencies and write local caches, locks, generated code, or build artifacts.",
      inputSchema: mcpInputSchema({
        projectDir: z.string().describe("Path to the existing Better Fullstack project"),
      }),
      annotations: {
        title: "Check project",
        readOnlyHint: false,
        idempotentHint: true,
        openWorldHint: true,
      },
    },
    async (input: { projectDir: string }) => {
      const payload = await checkMcpProject(sanitizePath(input.projectDir));
      return {
        content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
        structuredContent: payload,
        ...(!payload.success || !payload.ok ? { isError: true } : {}),
      };
    },
  );

  registerTool(
    "bfs_plan_part_removal",
    {
      description:
        "Plans removal of one exact non-primary stack part and returns a review token bound to the resulting config and generated-file operations.",
      inputSchema: mcpInputSchema({
        projectDir: z.string().describe("Path to the existing Better Fullstack project"),
        target: z
          .string()
          .describe("Exact stack part spec or ID, for example backend.auth:typescript:better-auth"),
      }),
      annotations: {
        title: "Plan stack part removal",
        readOnlyHint: true,
        idempotentHint: true,
        openWorldHint: false,
      },
    },
    async (input: { projectDir: string; target: string }) => {
      const payload = await planMcpPartRemoval(sanitizePath(input.projectDir), input.target);
      return {
        content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
        structuredContent: payload,
        ...(!payload.success ? { isError: true } : {}),
      };
    },
  );

  registerTool(
    "bfs_apply_part_removal",
    {
      description:
        "Applies an exact reviewed stack-part removal in a recoverable transaction. Architecture-sensitive removals require explicit acknowledgement.",
      inputSchema: mcpInputSchema({
        projectDir: z.string().describe("Path to the existing Better Fullstack project"),
        target: z.string().describe("Exact stack part spec or ID returned by the removal plan"),
        reviewToken: z
          .string()
          .min(64)
          .max(64)
          .describe("Exact reviewToken returned by bfs_plan_part_removal"),
        acknowledgeArchitectureChange: z
          .boolean()
          .optional()
          .default(false)
          .describe(
            "Required when the plan reports an architecture-sensitive removal; data and schema are not migrated automatically.",
          ),
      }),
      annotations: {
        title: "Apply reviewed stack part removal",
        readOnlyHint: false,
        destructiveHint: true,
        idempotentHint: false,
        openWorldHint: false,
      },
    },
    async (input: {
      projectDir: string;
      target: string;
      reviewToken: string;
      acknowledgeArchitectureChange: boolean;
    }) => {
      const payload = await applyMcpPartRemoval(
        sanitizePath(input.projectDir),
        input.target,
        input.reviewToken,
        input.acknowledgeArchitectureChange,
      );
      return {
        content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
        structuredContent: payload,
        ...(!payload.success ? { isError: true } : {}),
      };
    },
  );

  registerTool(
    "bfs_plan_project_update",
    {
      description:
        "Plans current-template drift. Exact structured-merge content is returned up to 32 KiB per file; oversized content is withheld with size/hash metadata and no token. Manifest v2 provenance and transactional recovery eligibility are returned in the lifecycle contract.",
      inputSchema: mcpInputSchema({
        projectDir: z.string().describe("Path to the existing Better Fullstack project"),
      }),
      annotations: {
        title: "Plan project update",
        readOnlyHint: true,
        idempotentHint: true,
        openWorldHint: false,
      },
    },
    async (input: { projectDir: string }) => {
      const payload = await planMcpProjectUpdate(sanitizePath(input.projectDir));
      return {
        content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
        structuredContent: payload,
        ...(!payload.success ? { isError: true } : {}),
      };
    },
  );

  registerTool(
    "bfs_apply_project_update",
    {
      description:
        "Applies actionable template files bound to a reviewed token in a recoverable transaction. Verified manifest-v2 projects need no lineage acknowledgement; migrated/adopted projects do.",
      inputSchema: mcpInputSchema({
        projectDir: z.string().describe("Path to the existing Better Fullstack project"),
        reviewToken: z
          .string()
          .min(64)
          .max(64)
          .describe("Exact reviewToken returned by bfs_plan_project_update"),
        acknowledgeUnprovenManifestV1: z
          .boolean()
          .optional()
          .default(false)
          .describe("Required only when the plan reports unverified migrated/adopted lineage"),
      }),
      annotations: {
        title: "Apply reviewed project update",
        readOnlyHint: false,
        destructiveHint: true,
        idempotentHint: false,
        openWorldHint: false,
      },
    },
    async (input: {
      projectDir: string;
      reviewToken: string;
      acknowledgeUnprovenManifestV1: boolean;
    }) => {
      const payload = await applyMcpProjectUpdate(
        sanitizePath(input.projectDir),
        input.reviewToken,
        input.acknowledgeUnprovenManifestV1,
      );
      return {
        content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
        structuredContent: payload,
        ...(!payload.success ? { isError: true } : {}),
      };
    },
  );

  registerTool(
    "bfs_recover_project_transaction",
    {
      description:
        "Restores every file bound to a successful or interrupted Better Fullstack lifecycle transaction. The transaction can be recovered once, then project checks should be rerun.",
      inputSchema: mcpInputSchema({
        projectDir: z.string().describe("Path to the existing Better Fullstack project"),
        transactionId: z.string().uuid().describe("Recovery transaction ID returned by apply"),
      }),
      annotations: {
        title: "Recover project transaction",
        readOnlyHint: false,
        destructiveHint: true,
        idempotentHint: false,
        openWorldHint: false,
      },
    },
    async (input: { projectDir: string; transactionId: string }) => {
      const payload = await recoverMcpProjectTransaction(
        sanitizePath(input.projectDir),
        input.transactionId,
      );
      return {
        content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
        structuredContent: payload,
        ...(!payload.success ? { isError: true } : {}),
      };
    },
  );

  registerTool(
    "bfs_plan_stack_update",
    {
      description:
        "Plans scaffold-time Stack Part and provider updates for an existing Better-Fullstack project. Supports the same fields as project creation and does not write files.",
      inputSchema: mcpInputSchema(MCP_STACK_UPDATE_SCHEMA),
      outputSchema: stackUpdateOutputSchema,
      annotations: {
        title: "Plan stack update",
        readOnlyHint: true,
        idempotentHint: true,
        openWorldHint: false,
      },
    },
    async (input: Record<string, unknown> & { projectDir: string }) => {
      try {
        const safePath = sanitizePath(input.projectDir);
        const { projectDir: _projectDir, projectName: _projectName, ...requestedChanges } = input;
        const plan = await planStackUpdate(safePath, requestedChanges);
        if (!plan.success) {
          return {
            content: [{ type: "text", text: JSON.stringify(plan, null, 2) }],
            structuredContent: plan,
            isError: true,
          };
        }
        const compatibilityWarnings = compatibilityWarningsForStackUpdate(plan.proposedConfig);
        const { operations: _operations, filesUnchanged: _filesUnchanged, ...safePlan } = plan;
        const payload = {
          ...safePlan,
          ...(plan.compatibilityAdjustments.length > 0
            ? { compatibilityAdjustments: plan.compatibilityAdjustments }
            : {}),
          ...(compatibilityWarnings ? { compatibilityWarnings } : {}),
          message:
            plan.manualReviewBlockers.length > 0
              ? "Plan created, but manual review is required before applying."
              : plan.requiresArchitectureAck
                ? `Plan created. This is an architecture change (${plan.architectureChanges
                    .map((change) => `${change.key}: ${change.from} -> ${change.to}`)
                    .join(
                      "; ",
                    )}); data and schema are NOT migrated automatically. Review migrationSteps, then call bfs_apply_stack_update with acknowledgeArchitectureChange: true, then run: ${plan.installCommand}`
                : `Plan created. If approved, call bfs_apply_stack_update, then run: ${plan.installCommand}`,
        };
        return {
          content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
          structuredContent: payload,
        };
      } catch (error) {
        const payload = {
          success: false as const,
          projectDir: input.projectDir,
          error: `Plan stack update failed: ${error instanceof Error ? error.message : String(error)}`,
        };
        return {
          content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
          structuredContent: payload,
          isError: true,
        };
      }
    },
  );

  registerTool(
    "bfs_apply_stack_update",
    {
      description:
        "Applies a previously reviewed scaffold-time stack update to an existing Better-Fullstack project. Refuses to overwrite user-edited generated files and does not install dependencies.",
      inputSchema: mcpInputSchema(MCP_STACK_UPDATE_SCHEMA),
      outputSchema: stackUpdateOutputSchema,
      annotations: {
        title: "Apply stack update",
        readOnlyHint: false,
        destructiveHint: false,
        idempotentHint: false,
        openWorldHint: false,
      },
    },
    async (input: Record<string, unknown> & { projectDir: string }) => {
      const startTime = Date.now();
      const { projectDir: _projectDir, projectName: _projectName, ...requestedChanges } = input;
      try {
        const safePath = sanitizePath(input.projectDir);
        const result = await applyStackUpdate(safePath, requestedChanges);
        await trackEvent("stack_updated", requestedChanges, {
          source: "mcp",
          success: result.success,
          durationMs: Date.now() - startTime,
        });
        if (!result.success) {
          return {
            content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
            structuredContent: result,
            isError: true,
          };
        }
        const compatibilityWarnings = compatibilityWarningsForStackUpdate(result.proposedConfig);
        const { operations: _operations, filesUnchanged: _filesUnchanged, ...safeResult } = result;
        const payload = {
          ...safeResult,
          ...(result.compatibilityAdjustments.length > 0
            ? { compatibilityAdjustments: result.compatibilityAdjustments }
            : {}),
          ...(compatibilityWarnings ? { compatibilityWarnings } : {}),
          message: `Stack update applied. Dependencies were not installed; run: ${result.installCommand}`,
        };
        return {
          content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
          structuredContent: payload,
        };
      } catch (error) {
        await trackEvent("stack_updated", requestedChanges, {
          source: "mcp",
          success: false,
          errorName: error instanceof Error ? error.name : "UnknownError",
          durationMs: Date.now() - startTime,
        });
        const payload = {
          success: false as const,
          projectDir: input.projectDir,
          error: `Apply stack update failed: ${error instanceof Error ? error.message : String(error)}`,
        };
        return {
          content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
          structuredContent: payload,
          isError: true,
        };
      }
    },
  );

  registerTool(
    "bfs_plan_addition",
    {
      description:
        "Plans owner-scoped tooling capabilities and deployment changes for an existing project without writing files.",
      inputSchema: mcpInputSchema({
        projectDir: z.string().describe("Absolute path to the existing project directory"),
        part: z.array(z.string()).optional().describe("Canonical Stack Part bindings to add"),
        addons: z
          .array(AddonsSchema)
          .optional()
          .describe("Deprecated alias for tooling part bindings"),
        webDeploy: WebDeploySchema.optional().describe("Web deployment option"),
        serverDeploy: ServerDeploySchema.optional().describe("Server deployment option"),
      }),
      outputSchema: planAdditionOutputSchema,
      annotations: {
        title: "Plan feature addition",
        readOnlyHint: true,
        idempotentHint: true,
        openWorldHint: false,
      },
    },
    async ({
      projectDir,
      part,
      addons,
      webDeploy,
      serverDeploy,
    }: {
      projectDir: string;
      part?: string[];
      addons?: string[];
      webDeploy?: ProjectConfig["webDeploy"];
      serverDeploy?: ProjectConfig["serverDeploy"];
    }) => {
      try {
        const safePath = sanitizePath(projectDir);
        const requestedParts = mergeLegacyAddonParts(part, addons);
        const plan = await planStackUpdate(safePath, {
          part: requestedParts,
          webDeploy,
          serverDeploy,
        });
        if (!plan.success) {
          return {
            content: [{ type: "text", text: JSON.stringify(plan, null, 2) }],
            structuredContent: plan,
            isError: true,
          };
        }
        const { operations: _operations, filesUnchanged: _filesUnchanged, ...safePlan } = plan;
        const payload = {
          ...safePlan,
          requestedParts: requestedParts ?? [],
          compatibilityWarnings: compatibilityWarningsForStackUpdate(plan.proposedConfig),
        };
        return {
          content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
          structuredContent: payload,
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Plan addition failed: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        };
      }
    },
  );

  registerTool(
    "bfs_add_feature",
    {
      description:
        "Adds owner-scoped tooling capabilities or deployment targets to an existing Better-Fullstack project. Dependencies are not installed. Call bfs_plan_addition first.",
      inputSchema: mcpInputSchema({
        projectDir: z.string().describe("Absolute path to the existing project directory"),
        part: z.array(z.string()).optional().describe("Canonical Stack Part bindings to add"),
        addons: z
          .array(AddonsSchema)
          .optional()
          .describe("Deprecated alias for tooling part bindings"),
        webDeploy: WebDeploySchema.optional().describe("Web deployment option"),
        serverDeploy: ServerDeploySchema.optional().describe("Server deployment option"),
        packageManager: PackageManagerSchema.optional().describe("Package manager to use"),
      }),
      outputSchema: addFeatureOutputSchema,
      annotations: {
        title: "Add feature",
        readOnlyHint: false,
        destructiveHint: false,
        idempotentHint: false,
        openWorldHint: false,
      },
    },
    async (input: Record<string, unknown> & { projectDir: string }) => {
      try {
        const safePath = sanitizePath(input.projectDir);
        const { add } = await import("./index.js");

        const requestedParts = mergeLegacyAddonParts(
          input.part as string[] | undefined,
          input.addons as string[] | undefined,
        );
        const addInput: AddInput = {
          part: requestedParts,
          webDeploy: input.webDeploy as ProjectConfig["webDeploy"] | undefined,
          serverDeploy: input.serverDeploy as ProjectConfig["serverDeploy"] | undefined,
          projectDir: safePath,
          install: false,
          packageManager: input.packageManager as ProjectConfig["packageManager"] | undefined,
        };

        const result = await add(addInput, { telemetrySource: "mcp" });
        if (result?.success) {
          const existingConfig = await readBtsConfig(safePath);
          const graphPreview = existingConfig ? getMcpGraphPreview(existingConfig) : undefined;
          const ecosystem = existingConfig?.ecosystem ?? "typescript";
          const dirName = safePath.split("/").pop() ?? "project";
          const installCmd = getInstallCommand(
            ecosystem,
            dirName,
            input.packageManager as string | undefined,
            existingConfig?.javaBuildTool,
            existingConfig?.javaWebFramework,
            existingConfig?.pythonPackageManager,
          );
          const payload = {
            success: true as const,
            addedCapabilities: requestedParts ?? [],
            projectDir: result.projectDir,
            lifecycle: result.lifecycle,
            recoveryId: result.recoveryId,
            ...graphPreview,
            message: `Applied the requested tooling capabilities. Tell the user to run: ${installCmd}`,
          };
          return {
            content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
            structuredContent: payload,
          };
        }
        const payload = {
          success: false as const,
          error: result?.error ?? "Add command returned no result",
          lifecycle: result?.lifecycle,
          recoveryId: result?.recoveryId,
        };
        return {
          content: [{ type: "text", text: JSON.stringify(payload) }],
          structuredContent: payload,
          isError: true,
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Add feature failed: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        };
      }
    },
  );

  server.registerResource(
    "compatibility-rules",
    "docs://compatibility-rules",
    {
      description:
        "Stack compatibility rules — which frontend/backend/API/ORM combinations are valid. Read this BEFORE scaffolding.",
      mimeType: "text/markdown",
      cacheHint: { ttlMs: 300_000, cacheScope: "public" },
    },
    async () => ({
      contents: [{ uri: "docs://compatibility-rules", text: COMPATIBILITY_RULES_MD }],
    }),
  );

  server.registerResource(
    "stack-options",
    "docs://stack-options",
    {
      description: "All available technology options per category for every ecosystem.",
      mimeType: "application/json",
      cacheHint: { ttlMs: 300_000, cacheScope: "public" },
    },
    async () => ({
      contents: [
        { uri: "docs://stack-options", text: JSON.stringify(getSchemaOptions(), null, 2) },
      ],
    }),
  );

  server.registerResource(
    "getting-started",
    "docs://getting-started",
    {
      description: "Quick start guide for scaffolding projects with Better-Fullstack MCP.",
      mimeType: "text/markdown",
      cacheHint: { ttlMs: 300_000, cacheScope: "public" },
    },
    async () => ({
      contents: [{ uri: "docs://getting-started", text: GETTING_STARTED_MD }],
    }),
  );

  return server;
}

export async function startMcpServer() {
  await serveStdio(createMcpServer);
}
