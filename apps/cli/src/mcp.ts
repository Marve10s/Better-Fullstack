import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  type AddInput,
  AddonsSchema,
  AISchema,
  AnalyticsSchema,
  AnimationSchema,
  APISchema,
  AstroIntegrationSchema,
  AuthSchema,
  BackendSchema,
  CachingSchema,
  CMSSchema,
  type CompatibilityInput,
  CSSFrameworkSchema,
  DatabaseSchema,
  DatabaseSetupSchema,
  EcosystemSchema,
  ElixirApiSchema,
  ElixirAuthSchema,
  ElixirCachingSchema,
  ElixirDeploySchema,
  ElixirEmailSchema,
  ElixirHttpSchema,
  ElixirJobsSchema,
  ElixirJsonSchema,
  ElixirObservabilitySchema,
  ElixirOrmSchema,
  ElixirQualitySchema,
  ElixirRealtimeSchema,
  ElixirTestingSchema,
  ElixirValidationSchema,
  ElixirWebFrameworkSchema,
  EffectSchema,
  EmailSchema,
  ExamplesSchema,
  FeatureFlagsSchema,
  FileStorageSchema,
  FileUploadSchema,
  FormsSchema,
  FrontendSchema,
  MobileDeepLinkingSchema,
  MobileNavigationSchema,
  MobileOTASchema,
  MobilePushSchema,
  MobileStorageSchema,
  MobileTestingSchema,
  MobileUISchema,
  GoApiSchema,
  GoCliSchema,
  GoAuthSchema,
  GoLoggingSchema,
  GoOrmSchema,
  GoWebFrameworkSchema,
  JavaAuthSchema,
  JavaBuildToolSchema,
  JavaLibrariesSchema,
  JavaOrmSchema,
  JavaTestingLibrariesSchema,
  JavaWebFrameworkSchema,
  I18nSchema,
  JobQueueSchema,
  LoggingSchema,
  ObservabilitySchema,
  ORMSchema,
  OPTION_CATEGORY_METADATA,
  PackageManagerSchema,
  PaymentsSchema,
  type OptionCategory,
  type OptionCategoryEcosystem,
  type ProjectConfig,
  PythonAiSchema,
  PythonApiSchema,
  PythonAuthSchema,
  PythonOrmSchema,
  PythonQualitySchema,
  PythonGraphqlSchema,
  PythonTaskQueueSchema,
  PythonValidationSchema,
  PythonWebFrameworkSchema,
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
  RustOrmSchema,
  RustWebFrameworkSchema,
  SearchSchema,
  ServerDeploySchema,
  StateManagementSchema,
  TestingSchema,
  UILibrarySchema,
  ValidationSchema,
  WebDeploySchema,
  analyzeStackCompatibility,
  CATEGORY_ORDER,
  getCategoryOrderForEcosystem,
} from "@better-fullstack/types";
import z from "zod";

import { readBtsConfig, writeBtsConfig } from "./utils/bts-config";
import { getLatestCLIVersion } from "./utils/get-latest-cli-version";

const OPTION_ENTRY_COUNT = Object.values(OPTION_CATEGORY_METADATA).reduce(
  (sum, metadata) => sum + metadata.options.length,
  0,
);

const INSTRUCTIONS = `Better-Fullstack scaffolds fullstack projects across TypeScript, React Native, Rust, Go, Python, Java, and Elixir ecosystems with ${OPTION_ENTRY_COUNT} configurable options.

RECOMMENDED WORKFLOW:
1. Call bfs_get_guidance to understand field semantics, required fields, and workflow rules.
2. Read the "docs://compatibility-rules" resource for valid stack combinations.
3. Call bfs_check_compatibility to validate your planned stack before creating.
4. Call bfs_plan_project to preview (dry-run) — no files are written.
5. Call bfs_create_project to scaffold the project on disk.

For existing projects:
1. Call bfs_plan_addition to validate proposed changes.
2. Call bfs_add_feature to apply changes.

CRITICAL RULES:
- Dependency installation is ALWAYS skipped in MCP mode (timeout risk). After scaffolding, tell the user to run install manually.
- Array fields: "frontend", "addons", "examples", "aiDocs", "rustLibraries", "pythonAi", "javaLibraries", and "javaTestingLibraries". Most other option fields are strings.
- "none" means "skip this feature entirely", not "use the default".
- Always specify "ecosystem" first — it determines which other fields are relevant.
- TypeScript web-specific fields (web frontend, backend, orm, etc.) are IGNORED for react-native/rust/python/go/java/elixir ecosystems.
- The compatibility engine auto-adjusts invalid combinations — always call bfs_check_compatibility first to see adjustments.`;

function getGuidance() {
  return {
    workflow: [
      "Call bfs_get_guidance (this tool) to understand field semantics and rules.",
      "Call bfs_get_schema to see valid values for each category.",
      "Call bfs_check_compatibility to validate your planned stack before creation.",
      "Call bfs_plan_project to preview the generated project (dry-run, no files written).",
      "Call bfs_create_project to scaffold the project on disk.",
      "For existing projects: call bfs_plan_addition, then bfs_add_feature.",
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
      java:
        "Backend/API: Spring Boot with Maven or Gradle Wrapper, optional Spring Data JPA, Spring Security, app libraries, and Java testing libraries.",
      elixir:
        "Phoenix: Phoenix or Phoenix LiveView with Ecto SQL, PostgreSQL-ready config, REST or Absinthe, Channels/Presence, Oban, and Mix releases/Docker.",
    },
    fieldRules: {
      projectName:
        "kebab-case directory name. Required for bfs_create_project.",
      ecosystem:
        "Must be set first. Determines which other fields are relevant.",
      frontend:
        "ARRAY of strings. TypeScript only. Supports multiple frontends in one monorepo. Use [] for API-only.",
      arrayFields:
        'Use arrays for frontend, addons, examples, aiDocs, rustLibraries, pythonAi, javaLibraries, and javaTestingLibraries. Use [] for "none" on multi-select fields.',
      backend:
        'String. "self" means fullstack mode (Next.js/Vinext/TanStack Start/Nuxt/Astro API routes). "none" for frontend-only.',
      runtime:
        '"bun" or "node". Must be "none" when backend is "self" or "convex".',
      addons:
        "ARRAY of strings. Monorepo tools, code quality, desktop (tauri), browser extensions (wxt), etc.",
      email:
        "String. TypeScript supports multiple providers; Rust, Python, Go, and Java currently support resend or none.",
      observability:
        "String. TypeScript supports multiple providers; Rust, Python, Go, and Java currently support sentry or none.",
      search:
        "String. TypeScript supports multiple providers; Rust, Python, Go, and Java currently support meilisearch or none.",
    },
    ambiguityRules: [
      "If the user request leaves major stack choices unspecified, ASK the user before proceeding. Do not guess.",
      'Do not infer addons, examples, or optional features the user did not mention. Default strings to "none" and multi-select arrays to [].',
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
  "addons",
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
  codeQuality: ["addons"],
  documentation: ["addons"],
  appPlatforms: ["addons"],
};

const MCP_SCHEMA_EXCLUDED_CATEGORIES = new Set<OptionCategory>([
  "webFrontend",
  "nativeFrontend",
  "backendLibraries",
  "codeQuality",
  "documentation",
  "appPlatforms",
  "aiDocs",
  "git",
  "install",
  "versionChannel",
  "shadcnBase",
  "shadcnStyle",
  "shadcnIconLibrary",
  "shadcnColorTheme",
  "shadcnBaseColor",
  "shadcnFont",
  "shadcnRadius",
]);

const MCP_SCHEMA_OPTION_OVERRIDES = {
  ecosystem: EcosystemSchema.options,
  frontend: FrontendSchema.options,
  backend: BackendSchema.options,
  addons: AddonsSchema.options,
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
      return { error: `Unknown category: ${category}. Available: ${MCP_ALL_SCHEMA_KEYS.join(", ")}` };
    }
    return { category, options };
  }
  const allowedKeys = ecosystem && isMcpEcosystem(ecosystem)
    ? getMcpSchemaKeysForEcosystem(ecosystem)
    : null;
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
): string {
  switch (ecosystem) {
    case "rust": return `cd ${projectName} && cargo build`;
    case "python": return `cd ${projectName} && uv sync`;
    case "go": return `cd ${projectName} && go mod tidy`;
    case "elixir": return `cd ${projectName} && mix deps.get && mix compile && mix test`;
    case "java":
      if (javaWebFramework === "quarkus") {
        return javaBuildTool === "gradle"
          ? `cd ${projectName} && ./gradlew test && ./gradlew quarkusDev`
          : `cd ${projectName} && ./mvnw test && ./mvnw quarkus:dev`;
      }
      return javaBuildTool === "gradle"
        ? `cd ${projectName} && ./gradlew test && ./gradlew bootRun`
        : `cd ${projectName} && ./mvnw test && ./mvnw spring-boot:run`;
    default: return `cd ${projectName} && ${packageManager ?? "bun"} install`;
  }
}


function mcpInputSchema<T extends Record<string, unknown>>(schema: T): Record<string, unknown> {
  return schema;
}

function filterCompatibilityResult(result: { adjustedStack: CompatibilityInput | null; notes: Record<string, unknown>; changes: { category: string; message: string }[] }, ecosystem: string) {
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

const MCP_CODE_QUALITY_ADDONS = new Set(["biome", "oxlint", "ultracite", "lefthook", "husky", "ruler"]);
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
  analytics: "none",
  backendLibraries: "none",
  stateManagement: "none",
  forms: "none",
  validation: "none",
  testing: "none",
  realtime: "none",
  jobQueue: "none",
  caching: "none",
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
  fileStorage: "none",
  mobileUI: "none",
  mobileStorage: "none",
  mobileTesting: "none",
  mobilePush: "none",
  mobileOTA: "none",
  packageManager: "bun",
  versionChannel: "stable",
  examples: [],
  aiSdk: "none",
  aiDocs: ["claude-md"],
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
  pythonWebFramework: "none",
  pythonOrm: "none",
  pythonValidation: "none",
  pythonAi: [],
  pythonAuth: "none",
  pythonApi: "none",
  pythonTaskQueue: "none",
  pythonGraphql: "none",
  pythonQuality: "none",
  goWebFramework: "none",
  goOrm: "none",
  goApi: "none",
  goCli: "none",
  goLogging: "none",
  goAuth: "none",
  javaWebFramework: "spring-boot",
  javaBuildTool: "maven",
  javaOrm: "none",
  javaAuth: "none",
  javaLibraries: [],
  javaTestingLibraries: ["junit5"],
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
  elixirDeploy: "none",
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
  return applyMcpInputDefaults(
    MCP_COMPATIBILITY_DEFAULTS,
    input,
  ) as Pick<CompatibilityInput, keyof typeof MCP_COMPATIBILITY_DEFAULTS>;
}

function getMcpProjectConfigDefaults(input: Record<string, unknown>) {
  return applyMcpInputDefaults(
    MCP_PROJECT_CONFIG_DEFAULTS,
    input,
  ) as Pick<ProjectConfig, keyof typeof MCP_PROJECT_CONFIG_DEFAULTS>;
}

function buildProjectConfig(
  input: Record<string, unknown>,
  overrides?: { projectDir: string },
): ProjectConfig {
  const projectName = (input.projectName as string) ?? "my-project";
  const ecosystem = (input.ecosystem as ProjectConfig["ecosystem"]) ?? "typescript";
  const frontend =
    (input.frontend as ProjectConfig["frontend"]) ??
    (ecosystem === "react-native" ? ["native-bare"] : ["tanstack-router"]);
  const hasNativeFrontend = frontend.some((item) => item.startsWith("native-"));
  const hasMobileProject = ecosystem === "react-native" || hasNativeFrontend;
  const defaults = getMcpProjectConfigDefaults(input);

  return {
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
    astroIntegration: "none",
    versionChannel: "stable",
    shadcnBase: "radix",
    shadcnStyle: "nova",
    shadcnIconLibrary: "lucide",
    shadcnColorTheme: "neutral",
    shadcnBaseColor: "neutral",
    shadcnFont: "inter",
    shadcnRadius: "default",
    aiDocs: ["claude-md"],
    git: !!overrides,
    install: false,
  };
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

function buildCompatibilityInput(input: Record<string, unknown>): CompatibilityInput {
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
    (a) =>
      ![...codeQuality, ...documentation, "none"].includes(a),
  );

  return {
    ecosystem,
    projectName: (input.projectName as string) ?? null,
    webFrontend,
    nativeFrontend,
    ...defaults,
    mobileNavigation:
      (input.mobileNavigation as string) ?? (hasMobileProject ? "expo-router" : "none"),
    mobileDeepLinking:
      (input.mobileDeepLinking as string) ?? (hasMobileProject ? "expo-linking" : "none"),
    codeQuality,
    documentation,
    appPlatforms,
    aiSdk: (input.ai as string) ?? defaults.aiSdk,
  };
}

function summarizeTree(tree: { fileCount: number; directoryCount: number; root: { children: { type: string; name: string; children?: unknown[] }[] } }) {
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

const COMPATIBILITY_RULES_MD = `# Better-Fullstack Compatibility Rules

## Backend Constraints
- **Convex**: Forces runtime=none, database=none, orm=none, api=none, dbSetup=none, serverDeploy=none. Removes incompatible frontends (Solid, SolidStart, Astro).
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
   - email: "resend" (optional)
   - observability: "sentry" (optional)
2. Tell the user to run: cd my-python-app && uv sync

## Quick Start — Go Project
1. Call bfs_create_project with:
   - projectName: "my-go-app"
   - ecosystem: "go"
   - goWebFramework: "gin"
   - goOrm: "gorm"
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
1. Call bfs_add_feature with projectDir pointing to the project root.
2. Provide addons array with features to add (e.g., ["biome", "turborepo"]).
3. Service categories such as email and observability are scaffold-time options. To add those to an existing app, inspect the generated templates from bfs_plan_project and apply the equivalent dependency, env var, and initialization changes manually.
`;

export async function startMcpServer() {
  const server = new McpServer(
    { name: "better-fullstack", version: getLatestCLIVersion() },
    { instructions: INSTRUCTIONS, capabilities: { logging: {} } },
  );

  const registerTool = server.tool.bind(server) as unknown as <Input extends Record<string, unknown>>(
    name: string,
    description: string,
    inputSchema: Record<string, unknown>,
    cb: (input: Input) => unknown,
  ) => void;

  registerTool(
    "bfs_get_guidance",
    "Returns workflow rules, field semantics, ambiguity rules, and critical constraints. Call this FIRST before using other tools.",
    mcpInputSchema({}),
    async () => {
      const guidance = getGuidance();
      return {
        content: [{ type: "text", text: JSON.stringify(guidance, null, 2) }],
      };
    },
  );

  registerTool(
    "bfs_get_schema",
    "Returns valid options for a specific category (e.g., 'database', 'frontend', 'backend') or ALL categories. Use ecosystem to filter to relevant categories only.",
    mcpInputSchema({
      category: z.string().optional().describe("Category name (e.g., 'database', 'orm', 'frontend'). Omit for all categories."),
      ecosystem: EcosystemSchema.optional().describe("Filter categories to this ecosystem (e.g., 'rust' returns only Rust + shared categories)."),
    }),
    async ({ category, ecosystem }: { category?: string; ecosystem?: ProjectConfig["ecosystem"] }) => {
      const result = getSchemaOptions(category, ecosystem);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  const mobileInputSchema = {
    mobileNavigation: MobileNavigationSchema.optional().describe("Mobile navigation"),
    mobileUI: MobileUISchema.optional().describe("Mobile UI"),
    mobileStorage: MobileStorageSchema.optional().describe("Mobile storage"),
    mobileTesting: MobileTestingSchema.optional().describe("Mobile testing"),
    mobilePush: MobilePushSchema.optional().describe("Mobile push notifications"),
    mobileOTA: MobileOTASchema.optional().describe("Mobile OTA updates"),
    mobileDeepLinking: MobileDeepLinkingSchema.optional().describe("Mobile deep linking"),
  };

  const deploymentInputSchema = {
    dbSetup: DatabaseSetupSchema.optional().describe("Database hosting provider"),
    webDeploy: WebDeploySchema.optional().describe("Web deployment target"),
    serverDeploy: ServerDeploySchema.optional().describe("Server deployment target"),
  };

  const crossEcosystemInputSchema = {
    rustWebFramework: RustWebFrameworkSchema.optional().describe("Rust web framework"),
    rustFrontend: RustFrontendSchema.optional().describe("Rust frontend (WASM)"),
    rustOrm: RustOrmSchema.optional().describe("Rust ORM"),
    rustApi: RustApiSchema.optional().describe("Rust API layer"),
    rustCli: RustCliSchema.optional().describe("Rust CLI framework"),
    rustLibraries: z.array(RustLibrariesSchema).optional().describe("Rust libraries"),
    rustLogging: RustLoggingSchema.optional().describe("Rust logging library"),
    rustErrorHandling: RustErrorHandlingSchema.optional().describe("Rust error handling library"),
    rustCaching: RustCachingSchema.optional().describe("Rust caching library"),
    rustAuth: RustAuthSchema.optional().describe("Rust authentication library"),
    pythonWebFramework: PythonWebFrameworkSchema.optional().describe("Python web framework"),
    pythonOrm: PythonOrmSchema.optional().describe("Python ORM"),
    pythonValidation: PythonValidationSchema.optional().describe("Python validation"),
    pythonAi: z.array(PythonAiSchema).optional().describe("Python AI libraries"),
    pythonAuth: PythonAuthSchema.optional().describe("Python auth library"),
    pythonApi: PythonApiSchema.optional().describe("Python API framework"),
    pythonTaskQueue: PythonTaskQueueSchema.optional().describe("Python task queue"),
    pythonGraphql: PythonGraphqlSchema.optional().describe("Python GraphQL framework"),
    pythonQuality: PythonQualitySchema.optional().describe("Python code quality"),
    goWebFramework: GoWebFrameworkSchema.optional().describe("Go web framework"),
    goOrm: GoOrmSchema.optional().describe("Go ORM"),
    goApi: GoApiSchema.optional().describe("Go API layer"),
    goCli: GoCliSchema.optional().describe("Go CLI framework"),
    goLogging: GoLoggingSchema.optional().describe("Go logging library"),
    goAuth: GoAuthSchema.optional().describe("Go authentication library"),
    javaWebFramework: JavaWebFrameworkSchema.optional().describe("Java web framework"),
    javaBuildTool: JavaBuildToolSchema.optional().describe("Java build tool"),
    javaOrm: JavaOrmSchema.optional().describe("Java ORM"),
    javaAuth: JavaAuthSchema.optional().describe("Java authentication library"),
    javaLibraries: z.array(JavaLibrariesSchema).optional().describe("Java application libraries"),
    javaTestingLibraries: z
      .array(JavaTestingLibrariesSchema)
      .optional()
      .describe("Java testing libraries"),
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
    elixirDeploy: ElixirDeploySchema.optional().describe("Elixir deployment target"),
  };

  registerTool(
    "bfs_check_compatibility",
    "Validates a stack combination and returns auto-adjusted selections with warnings. Call BEFORE creating a project to avoid invalid combinations.",
    mcpInputSchema({
      ecosystem: EcosystemSchema.describe("Language ecosystem"),
      frontend: z.array(z.string()).optional().describe("Web frontend frameworks (TypeScript only)"),
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
      analytics: AnalyticsSchema.optional().describe("Analytics provider"),
      cms: CMSSchema.optional().describe("CMS"),
      caching: CachingSchema.optional().describe("Caching solution"),
      i18n: I18nSchema.optional().describe("Internationalization library"),
      search: SearchSchema.optional().describe("Search engine"),
      fileStorage: FileStorageSchema.optional().describe("File storage"),
      ...mobileInputSchema,
      ...deploymentInputSchema,
      astroIntegration: AstroIntegrationSchema.optional().describe("Astro UI framework integration"),
      uiLibrary: z.string().optional().describe("UI component library"),
      cssFramework: z.string().optional().describe("CSS framework"),
      addons: z.array(AddonsSchema).optional().describe("Addon list"),
      examples: z.array(ExamplesSchema).optional().describe("Example templates"),
      packageManager: PackageManagerSchema.optional().describe("Package manager"),
      ...crossEcosystemInputSchema,
    }),
    async (input: Record<string, unknown>) => {
      try {
        const compatInput = buildCompatibilityInput(input);
        const result = analyzeStackCompatibility(compatInput);
        const filtered = filterCompatibilityResult(result, input.ecosystem as string);
        return {
          content: [{ type: "text", text: JSON.stringify(filtered, null, 2) }],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Compatibility check failed: ${error instanceof Error ? error.message : String(error)}` }],
          isError: true,
        };
      }
    },
  );

  const planCreateSchema = {
    projectName: z.string().optional().describe("Project name (kebab-case)"),
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
    addons: z.array(AddonsSchema).optional().describe("Addons"),
    examples: z.array(ExamplesSchema).optional().describe("Example templates"),
    packageManager: PackageManagerSchema.optional().describe("Package manager (default: bun)"),
    cssFramework: CSSFrameworkSchema.optional().describe("CSS framework"),
    uiLibrary: UILibrarySchema.optional().describe("UI component library"),
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
    search: SearchSchema.optional().describe("Search engine"),
    caching: CachingSchema.optional().describe("Caching solution"),
    i18n: I18nSchema.optional().describe("Internationalization (i18n) library"),
    cms: CMSSchema.optional().describe("CMS"),
    fileStorage: FileStorageSchema.optional().describe("File storage"),
    ...mobileInputSchema,
    fileUpload: FileUploadSchema.optional().describe("File upload"),
    ...deploymentInputSchema,
    ...crossEcosystemInputSchema,
  };

  registerTool(
    "bfs_plan_project",
    "Dry-run: generates a project in-memory and returns the file tree WITHOUT writing to disk. Use this to preview what would be created.",
    mcpInputSchema(planCreateSchema),
    async (input: Record<string, unknown>) => {
      try {
        const { generateVirtualProject, EMBEDDED_TEMPLATES } = await import("@better-fullstack/template-generator");
        const config = buildProjectConfig(input);
        const result = await generateVirtualProject({ config, templates: EMBEDDED_TEMPLATES });

        if (result.success && result.tree) {
          const summary = summarizeTree(result.tree);
          return {
            content: [{ type: "text", text: JSON.stringify({ success: true, ...summary }, null, 2) }],
          };
        }
        return {
          content: [{ type: "text", text: JSON.stringify({ success: false, error: result.error ?? "Unknown error" }) }],
          isError: true,
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Plan failed: ${error instanceof Error ? error.message : String(error)}` }],
          isError: true,
        };
      }
    },
  );

  registerTool(
    "bfs_create_project",
    "Creates a new fullstack project on disk. Dependencies are NOT installed (agent must tell user to install manually). Call bfs_plan_project first to preview.",
    mcpInputSchema({ ...planCreateSchema, projectName: z.string().describe("Project name (kebab-case). Will be the directory name.") }),
    async (input: Record<string, unknown> & { projectName: string }) => {
      try {
        const { generateVirtualProject, EMBEDDED_TEMPLATES } = await import("@better-fullstack/template-generator");
        const { writeTreeToFilesystem } = await import("@better-fullstack/template-generator/fs-writer");
        const path = await import("node:path");

        const projectName = sanitizePath(input.projectName);
        const projectDir = path.resolve(process.cwd(), projectName);
        const config = buildProjectConfig(input, { projectDir });

        const fs = await import("node:fs/promises");
        await fs.mkdir(projectDir, { recursive: true });

        const result = await generateVirtualProject({ config, templates: EMBEDDED_TEMPLATES });
        if (!result.success || !result.tree) {
          return {
            content: [{ type: "text", text: JSON.stringify({ success: false, error: result.error ?? "Generation failed" }) }],
            isError: true,
          };
        }

        await writeTreeToFilesystem(result.tree, projectDir);

        await writeBtsConfig(config);

        let addonWarnings: string[] = [];
        if (config.addons.length > 0 && config.addons[0] !== "none") {
          const { setupAddons } = await import("./helpers/addons/addons-setup.js");
          addonWarnings = await setupAddons(config);
        }

        const ecosystem = (input.ecosystem as string) ?? "typescript";
        const installCmd = getInstallCommand(
          ecosystem,
          projectName,
          input.packageManager as string | undefined,
          input.javaBuildTool as string | undefined,
          input.javaWebFramework as string | undefined,
        );
        return {
          content: [{
            type: "text",
            text: JSON.stringify({
              success: true,
              projectDirectory: projectDir,
              fileCount: result.tree.fileCount,
              ...(addonWarnings.length > 0 ? { addonWarnings } : {}),
              message: `Project created at ${projectDir}. Tell the user to run: ${installCmd}`,
            }, null, 2),
          }],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Project creation failed: ${error instanceof Error ? error.message : String(error)}` }],
          isError: true,
        };
      }
    },
  );

  registerTool(
    "bfs_plan_addition",
    "Validates what would be added to an existing project. Reads the project config (bts.jsonc) and checks which addons are new.",
    mcpInputSchema({
      projectDir: z.string().describe("Absolute path to the existing project directory"),
      addons: z.array(AddonsSchema).optional().describe("Addons to add"),
      webDeploy: WebDeploySchema.optional().describe("Web deployment option"),
      serverDeploy: ServerDeploySchema.optional().describe("Server deployment option"),
    }),
    async ({ projectDir, addons, webDeploy, serverDeploy }: { projectDir: string; addons?: ProjectConfig["addons"]; webDeploy?: ProjectConfig["webDeploy"]; serverDeploy?: ProjectConfig["serverDeploy"] }) => {
      try {
        const safePath = sanitizePath(projectDir);
        const config = await readBtsConfig(safePath);
        if (!config) {
          return {
            content: [{ type: "text", text: JSON.stringify({ success: false, error: `No bts.jsonc found in ${safePath}. Is this a Better-Fullstack project?` }) }],
            isError: true,
          };
        }

        const existingAddons = new Set(config.addons ?? []);
        const newAddons = (addons ?? []).filter((a) => a !== "none" && !existingAddons.has(a));

        const mergedAddons = [...new Set([...(config.addons ?? []), ...newAddons])];
        const compatInput = buildCompatibilityInput({
          ...config,
          addons: mergedAddons,
          webDeploy: webDeploy ?? config.webDeploy,
          serverDeploy: serverDeploy ?? config.serverDeploy,
        });
        const compatResult = analyzeStackCompatibility(compatInput);
        const compatibilityWarnings = compatResult.changes.length > 0
          ? compatResult.changes.map((c) => c.message)
          : undefined;

        return {
          content: [{
            type: "text",
            text: JSON.stringify({
              success: true,
              existingConfig: {
                ecosystem: config.ecosystem,
                frontend: config.frontend,
                backend: config.backend,
                addons: config.addons,
              },
              proposedAdditions: {
                newAddons,
                webDeploy: webDeploy ?? null,
                serverDeploy: serverDeploy ?? null,
              },
              alreadyPresent: (addons ?? []).filter((a) => existingAddons.has(a)),
              ...(compatibilityWarnings ? { compatibilityWarnings } : {}),
            }, null, 2),
          }],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Plan addition failed: ${error instanceof Error ? error.message : String(error)}` }],
          isError: true,
        };
      }
    },
  );

  registerTool(
    "bfs_add_feature",
    "Adds addons/features to an existing Better-Fullstack project. Dependencies are NOT installed. Call bfs_plan_addition first to validate.",
    mcpInputSchema({
      projectDir: z.string().describe("Absolute path to the existing project directory"),
      addons: z.array(AddonsSchema).optional().describe("Addons to add"),
      webDeploy: WebDeploySchema.optional().describe("Web deployment option"),
      serverDeploy: ServerDeploySchema.optional().describe("Server deployment option"),
      packageManager: PackageManagerSchema.optional().describe("Package manager to use"),
    }),
    async (input: Record<string, unknown> & { projectDir: string }) => {
      try {
        const safePath = sanitizePath(input.projectDir);
        const { add } = await import("./index.js");

        const addInput: AddInput = {
          addons: input.addons as ProjectConfig["addons"] | undefined,
          webDeploy: input.webDeploy as ProjectConfig["webDeploy"] | undefined,
          serverDeploy: input.serverDeploy as ProjectConfig["serverDeploy"] | undefined,
          projectDir: safePath,
          install: false,
          packageManager: input.packageManager as ProjectConfig["packageManager"] | undefined,
        };

        const result = await add(addInput);
        if (result?.success) {
          const existingConfig = await readBtsConfig(safePath);
          const ecosystem = existingConfig?.ecosystem ?? "typescript";
          const dirName = safePath.split("/").pop() ?? "project";
          const installCmd = getInstallCommand(
            ecosystem,
            dirName,
            input.packageManager as string | undefined,
            existingConfig?.javaBuildTool,
            existingConfig?.javaWebFramework,
          );
          return {
            content: [{
              type: "text",
              text: JSON.stringify({
                success: true,
                addedAddons: result.addedAddons,
                projectDir: result.projectDir,
                message: `Added ${result.addedAddons.join(", ")} to project. Tell the user to run: ${installCmd}`,
              }, null, 2),
            }],
          };
        }
        return {
          content: [{ type: "text", text: JSON.stringify({ success: false, error: result?.error ?? "Add command returned no result" }) }],
          isError: true,
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Add feature failed: ${error instanceof Error ? error.message : String(error)}` }],
          isError: true,
        };
      }
    },
  );

  server.resource(
    "compatibility-rules",
    "docs://compatibility-rules",
    { description: "Stack compatibility rules — which frontend/backend/API/ORM combinations are valid. Read this BEFORE scaffolding.", mimeType: "text/markdown" },
    async () => ({
      contents: [{ uri: "docs://compatibility-rules", text: COMPATIBILITY_RULES_MD }],
    }),
  );

  server.resource(
    "stack-options",
    "docs://stack-options",
    { description: "All available technology options per category for every ecosystem.", mimeType: "application/json" },
    async () => ({
      contents: [{ uri: "docs://stack-options", text: JSON.stringify(getSchemaOptions(), null, 2) }],
    }),
  );

  server.resource(
    "getting-started",
    "docs://getting-started",
    { description: "Quick start guide for scaffolding projects with Better-Fullstack MCP.", mimeType: "text/markdown" },
    async () => ({
      contents: [{ uri: "docs://getting-started", text: GETTING_STARTED_MD }],
    }),
  );

  const transport = new StdioServerTransport();
  await server.connect(transport);
}
