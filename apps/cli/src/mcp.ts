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
  EffectSchema,
  EmailSchema,
  ExamplesSchema,
  FeatureFlagsSchema,
  FileStorageSchema,
  FileUploadSchema,
  FormsSchema,
  FrontendSchema,
  GoApiSchema,
  GoCliSchema,
  GoAuthSchema,
  GoLoggingSchema,
  GoOrmSchema,
  GoWebFrameworkSchema,
  I18nSchema,
  JobQueueSchema,
  LoggingSchema,
  ObservabilitySchema,
  ORMSchema,
  PackageManagerSchema,
  PaymentsSchema,
  type ProjectConfig,
  PythonAiSchema,
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
} from "@better-fullstack/types";
import z from "zod";

import { readBtsConfig, writeBtsConfig } from "./utils/bts-config";
import { getLatestCLIVersion } from "./utils/get-latest-cli-version";

const INSTRUCTIONS = `Better-Fullstack scaffolds fullstack projects across TypeScript, Rust, Go, and Python ecosystems with 270+ configurable options.

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
- "frontend" is an ARRAY (multiple frontends in one monorepo). All other fields are strings.
- "none" means "skip this feature entirely", not "use the default".
- Always specify "ecosystem" first — it determines which other fields are relevant.
- TypeScript-specific fields (frontend, backend, orm, etc.) are IGNORED for rust/python/go ecosystems.
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
        "Full-featured: frontend + backend + database + ORM + auth + payments + 20+ feature categories.",
      rust: "Backend/CLI: web framework (axum/actix-web), ORM (sea-orm/sqlx), gRPC, GraphQL, CLI tools.",
      python:
        "Backend/AI: web framework (fastapi/django), ORM (sqlalchemy/sqlmodel), AI/ML integrations, task queues.",
      go: "Backend/CLI: web framework (gin/echo), ORM (gorm/sqlc), gRPC, CLI tools, logging.",
    },
    fieldRules: {
      projectName:
        "kebab-case directory name. Required for bfs_create_project.",
      ecosystem:
        "Must be set first. Determines which other fields are relevant.",
      frontend:
        "ARRAY of strings. TypeScript only. Supports multiple frontends in one monorepo. Use [] for API-only.",
      backend:
        'String. "self" means fullstack mode (Next.js/TanStack Start/Nuxt/Astro API routes). "none" for frontend-only.',
      runtime:
        '"bun" or "node". Must be "none" when backend is "self" or "convex".',
      addons:
        "ARRAY of strings. Monorepo tools, code quality, desktop (tauri), browser extensions (wxt), etc.",
    },
    ambiguityRules: [
      "If the user request leaves major stack choices unspecified, ASK the user before proceeding. Do not guess.",
      'Do not infer addons, examples, or optional features the user did not mention. Default to "none".',
      "When the user says 'fullstack Next.js', use backend='self', frontend=['next'], runtime='none'.",
      "When the user says 'React + Hono', use frontend=['tanstack-router'] (or ask which React framework), backend='hono'.",
    ],
    criticalConstraints: [
      "tRPC (api='trpc') only works with React-based frontends: next, react-router, tanstack-router, tanstack-start.",
      "Use api='orpc' for svelte, solid, nuxt.",
      "Angular: use api='none' (has built-in HttpClient).",
      "Qwik: use backend='none', api='none' (built-in server).",
      "NestJS and AdonisJS backends require runtime='node'.",
      "Elysia backend requires runtime='bun'.",
      "backend='self' only works with: next, tanstack-start, astro, nuxt, svelte, solid-start.",
      "backend='convex' overrides: runtime=none, database=none, orm=none, api=none.",
      "TypeORM + better-auth: unsupported (no adapter). Use auth='none' or orm='drizzle'.",
      "Sequelize + better-auth: unsupported (no adapter). Use auth='none' or orm='drizzle'.",
    ],
  };
}

const SCHEMA_MAP: Record<string, z.ZodType> = {
  ecosystem: EcosystemSchema,
  database: DatabaseSchema,
  orm: ORMSchema,
  backend: BackendSchema,
  runtime: RuntimeSchema,
  frontend: FrontendSchema,
  api: APISchema,
  auth: AuthSchema,
  payments: PaymentsSchema,
  email: EmailSchema,
  fileUpload: FileUploadSchema,
  effect: EffectSchema,
  ai: AISchema,
  stateManagement: StateManagementSchema,
  forms: FormsSchema,
  validation: ValidationSchema,
  testing: TestingSchema,
  cssFramework: CSSFrameworkSchema,
  uiLibrary: UILibrarySchema,
  realtime: RealtimeSchema,
  jobQueue: JobQueueSchema,
  animation: AnimationSchema,
  logging: LoggingSchema,
  observability: ObservabilitySchema,
  featureFlags: FeatureFlagsSchema,
  analytics: AnalyticsSchema,
  cms: CMSSchema,
  caching: CachingSchema,
  i18n: I18nSchema,
  search: SearchSchema,
  fileStorage: FileStorageSchema,
  addons: AddonsSchema,
  examples: ExamplesSchema,
  packageManager: PackageManagerSchema,
  dbSetup: DatabaseSetupSchema,
  webDeploy: WebDeploySchema,
  serverDeploy: ServerDeploySchema,
  astroIntegration: AstroIntegrationSchema,
  rustWebFramework: RustWebFrameworkSchema,
  rustFrontend: RustFrontendSchema,
  rustOrm: RustOrmSchema,
  rustApi: RustApiSchema,
  rustCli: RustCliSchema,
  rustLibraries: RustLibrariesSchema,
  rustLogging: RustLoggingSchema,
  rustErrorHandling: RustErrorHandlingSchema,
  rustCaching: RustCachingSchema,
  pythonWebFramework: PythonWebFrameworkSchema,
  pythonOrm: PythonOrmSchema,
  pythonValidation: PythonValidationSchema,
  pythonAi: PythonAiSchema,
  pythonAuth: PythonAuthSchema,
  pythonTaskQueue: PythonTaskQueueSchema,
  pythonGraphql: PythonGraphqlSchema,
  pythonQuality: PythonQualitySchema,
  goWebFramework: GoWebFrameworkSchema,
  goOrm: GoOrmSchema,
  goApi: GoApiSchema,
  goCli: GoCliSchema,
  goLogging: GoLoggingSchema,
  goAuth: GoAuthSchema,
};

const ECOSYSTEM_CATEGORIES: Record<string, string[]> = {
  typescript: [
    "database", "orm", "backend", "runtime", "frontend", "api", "auth", "payments",
    "email", "fileUpload", "effect", "ai", "stateManagement", "forms", "validation",
    "testing", "cssFramework", "uiLibrary", "realtime", "jobQueue", "animation",
    "logging", "observability", "featureFlags", "analytics", "cms", "caching",
    "i18n", "search", "fileStorage", "astroIntegration",
  ],
  rust: ["rustWebFramework", "rustFrontend", "rustOrm", "rustApi", "rustCli", "rustLibraries", "rustLogging", "rustErrorHandling", "rustCaching"],
  python: ["pythonWebFramework", "pythonOrm", "pythonValidation", "pythonAi", "pythonAuth", "pythonTaskQueue", "pythonGraphql", "pythonQuality"],
  go: ["goWebFramework", "goOrm", "goApi", "goCli", "goLogging", "goAuth"],
  shared: ["ecosystem", "packageManager", "addons", "examples", "webDeploy", "serverDeploy", "dbSetup"],
};

function getSchemaOptions(category?: string, ecosystem?: string) {
  if (category) {
    const schema = SCHEMA_MAP[category];
    if (!schema) {
      return { error: `Unknown category: ${category}. Available: ${Object.keys(SCHEMA_MAP).join(", ")}` };
    }
    if (schema instanceof z.ZodEnum) {
      return { category, options: schema.options };
    }
    return { category, description: "Schema exists but is not a simple enum." };
  }
  const allowedKeys = ecosystem && ECOSYSTEM_CATEGORIES[ecosystem]
    ? new Set([...ECOSYSTEM_CATEGORIES[ecosystem], ...ECOSYSTEM_CATEGORIES.shared])
    : null;
  const result: Record<string, string[]> = {};
  for (const [key, schema] of Object.entries(SCHEMA_MAP)) {
    if (allowedKeys && !allowedKeys.has(key)) continue;
    if (schema instanceof z.ZodEnum) {
      result[key] = schema.options as string[];
    }
  }
  return result;
}

function getInstallCommand(ecosystem: string, projectName: string, packageManager?: string): string {
  switch (ecosystem) {
    case "rust": return `cd ${projectName} && cargo build`;
    case "python": return `cd ${projectName} && uv sync`;
    case "go": return `cd ${projectName} && go mod tidy`;
    default: return `cd ${projectName} && ${packageManager ?? "bun"} install`;
  }
}

function filterCompatibilityResult(result: { adjustedStack: CompatibilityInput | null; notes: Record<string, unknown>; changes: { category: string; message: string }[] }, ecosystem: string) {
  const { adjustedStack, changes } = result;
  if (!adjustedStack) return { adjustedStack: null, changes };

  const relevantKeys = new Set([
    ...(ECOSYSTEM_CATEGORIES[ecosystem] ?? ECOSYSTEM_CATEGORIES.typescript),
    ...ECOSYSTEM_CATEGORIES.shared,
    "projectName", "git", "install", "aiDocs",
  ]);
  const filtered: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(adjustedStack)) {
    if (relevantKeys.has(key)) filtered[key] = value;
  }
  return { adjustedStack: filtered, changes };
}

function buildProjectConfig(
  input: Record<string, unknown>,
  overrides?: { projectDir: string },
): ProjectConfig {
  const projectName = (input.projectName as string) ?? "my-project";
  return {
    projectName,
    projectDir: overrides?.projectDir ?? "/virtual",
    relativePath: overrides ? `./${projectName}` : "./virtual",
    ecosystem: (input.ecosystem as ProjectConfig["ecosystem"]) ?? "typescript",
    frontend: (input.frontend as ProjectConfig["frontend"]) ?? ["tanstack-router"],
    backend: (input.backend as ProjectConfig["backend"]) ?? "hono",
    runtime: (input.runtime as ProjectConfig["runtime"]) ?? "bun",
    database: (input.database as ProjectConfig["database"]) ?? "none",
    orm: (input.orm as ProjectConfig["orm"]) ?? "none",
    api: (input.api as ProjectConfig["api"]) ?? "none",
    auth: (input.auth as ProjectConfig["auth"]) ?? "none",
    payments: (input.payments as ProjectConfig["payments"]) ?? "none",
    email: (input.email as ProjectConfig["email"]) ?? "none",
    fileUpload: (input.fileUpload as ProjectConfig["fileUpload"]) ?? "none",
    effect: "none",
    ai: (input.ai as ProjectConfig["ai"]) ?? "none",
    stateManagement: (input.stateManagement as ProjectConfig["stateManagement"]) ?? "none",
    forms: (input.forms as ProjectConfig["forms"]) ?? "none",
    validation: (input.validation as ProjectConfig["validation"]) ?? "none",
    testing: (input.testing as ProjectConfig["testing"]) ?? "none",
    cssFramework: (input.cssFramework as ProjectConfig["cssFramework"]) ?? "tailwind",
    uiLibrary: (input.uiLibrary as ProjectConfig["uiLibrary"]) ?? "none",
    shadcnBase: "radix",
    shadcnStyle: "nova",
    shadcnIconLibrary: "lucide",
    shadcnColorTheme: "neutral",
    shadcnBaseColor: "neutral",
    shadcnFont: "inter",
    shadcnRadius: "default",
    realtime: (input.realtime as ProjectConfig["realtime"]) ?? "none",
    jobQueue: (input.jobQueue as ProjectConfig["jobQueue"]) ?? "none",
    animation: (input.animation as ProjectConfig["animation"]) ?? "none",
    logging: (input.logging as ProjectConfig["logging"]) ?? "none",
    observability: (input.observability as ProjectConfig["observability"]) ?? "none",
    featureFlags: "none",
    analytics: "none",
    cms: (input.cms as ProjectConfig["cms"]) ?? "none",
    caching: (input.caching as ProjectConfig["caching"]) ?? "none",
    i18n: (input.i18n as ProjectConfig["i18n"]) ?? "none",
    search: (input.search as ProjectConfig["search"]) ?? "none",
    fileStorage: (input.fileStorage as ProjectConfig["fileStorage"]) ?? "none",
    addons: (input.addons as ProjectConfig["addons"]) ?? [],
    examples: (input.examples as ProjectConfig["examples"]) ?? [],
    packageManager: (input.packageManager as ProjectConfig["packageManager"]) ?? "bun",
    versionChannel: "stable",
    webDeploy: (input.webDeploy as ProjectConfig["webDeploy"]) ?? "none",
    serverDeploy: (input.serverDeploy as ProjectConfig["serverDeploy"]) ?? "none",
    dbSetup: (input.dbSetup as ProjectConfig["dbSetup"]) ?? "none",
    astroIntegration: "none",
    git: !!overrides,
    install: false,
    aiDocs: ["claude-md"],
    rustWebFramework: (input.rustWebFramework as ProjectConfig["rustWebFramework"]) ?? "none",
    rustFrontend: (input.rustFrontend as ProjectConfig["rustFrontend"]) ?? "none",
    rustOrm: (input.rustOrm as ProjectConfig["rustOrm"]) ?? "none",
    rustApi: (input.rustApi as ProjectConfig["rustApi"]) ?? "none",
    rustCli: (input.rustCli as ProjectConfig["rustCli"]) ?? "none",
    rustLibraries: (input.rustLibraries as ProjectConfig["rustLibraries"]) ?? [],
    rustLogging: (input.rustLogging as ProjectConfig["rustLogging"]) ?? "none",
    rustErrorHandling: (input.rustErrorHandling as ProjectConfig["rustErrorHandling"]) ?? "none",
    rustCaching: (input.rustCaching as ProjectConfig["rustCaching"]) ?? "none",
    pythonWebFramework: (input.pythonWebFramework as ProjectConfig["pythonWebFramework"]) ?? "none",
    pythonOrm: (input.pythonOrm as ProjectConfig["pythonOrm"]) ?? "none",
    pythonValidation: (input.pythonValidation as ProjectConfig["pythonValidation"]) ?? "none",
    pythonAi: (input.pythonAi as ProjectConfig["pythonAi"]) ?? [],
    pythonAuth: (input.pythonAuth as ProjectConfig["pythonAuth"]) ?? "none",
    pythonTaskQueue: (input.pythonTaskQueue as ProjectConfig["pythonTaskQueue"]) ?? "none",
    pythonGraphql: (input.pythonGraphql as ProjectConfig["pythonGraphql"]) ?? "none",
    pythonQuality: (input.pythonQuality as ProjectConfig["pythonQuality"]) ?? "none",
    goWebFramework: (input.goWebFramework as ProjectConfig["goWebFramework"]) ?? "none",
    goOrm: (input.goOrm as ProjectConfig["goOrm"]) ?? "none",
    goApi: (input.goApi as ProjectConfig["goApi"]) ?? "none",
    goCli: (input.goCli as ProjectConfig["goCli"]) ?? "none",
    goLogging: (input.goLogging as ProjectConfig["goLogging"]) ?? "none",
    goAuth: (input.goAuth as ProjectConfig["goAuth"]) ?? "none",
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
  const addons = (input.addons as string[] | undefined) ?? [];

  const codeQuality = addons.filter((a) =>
    ["biome", "oxlint", "ultracite", "lefthook", "husky", "ruler"].includes(a),
  );
  const documentation = addons.filter((a) => ["starlight", "fumadocs"].includes(a));
  const appPlatforms = addons.filter(
    (a) =>
      ![...codeQuality, ...documentation, "none"].includes(a),
  );

  return {
    ecosystem: (input.ecosystem as CompatibilityInput["ecosystem"]) ?? "typescript",
    projectName: (input.projectName as string) ?? null,
    webFrontend: frontend ?? [],
    nativeFrontend: [],
    astroIntegration: (input.astroIntegration as string) ?? "none",
    runtime: (input.runtime as string) ?? "bun",
    backend: (input.backend as string) ?? "hono",
    database: (input.database as string) ?? "none",
    orm: (input.orm as string) ?? "none",
    dbSetup: (input.dbSetup as string) ?? "none",
    auth: (input.auth as string) ?? "none",
    payments: (input.payments as string) ?? "none",
    email: (input.email as string) ?? "none",
    fileUpload: (input.fileUpload as string) ?? "none",
    logging: (input.logging as string) ?? "none",
    observability: (input.observability as string) ?? "none",
    featureFlags: (input.featureFlags as string) ?? "none",
    analytics: (input.analytics as string) ?? "none",
    backendLibraries: "none",
    stateManagement: (input.stateManagement as string) ?? "none",
    forms: (input.forms as string) ?? "none",
    validation: (input.validation as string) ?? "none",
    testing: (input.testing as string) ?? "none",
    realtime: (input.realtime as string) ?? "none",
    jobQueue: (input.jobQueue as string) ?? "none",
    caching: (input.caching as string) ?? "none",
    i18n: (input.i18n as string) ?? "none",
    animation: (input.animation as string) ?? "none",
    cssFramework: (input.cssFramework as string) ?? "tailwind",
    uiLibrary: (input.uiLibrary as string) ?? "none",
    cms: (input.cms as string) ?? "none",
    search: (input.search as string) ?? "none",
    fileStorage: (input.fileStorage as string) ?? "none",
    codeQuality,
    documentation,
    appPlatforms,
    packageManager: (input.packageManager as string) ?? "bun",
    versionChannel: "stable",
    examples: (input.examples as string[]) ?? [],
    aiSdk: (input.ai as string) ?? "none",
    aiDocs: (input.aiDocs as string[]) ?? ["claude-md"],
    git: "true",
    install: "false",
    api: (input.api as string) ?? "none",
    webDeploy: (input.webDeploy as string) ?? "none",
    serverDeploy: (input.serverDeploy as string) ?? "none",
    yolo: "false",
    rustWebFramework: (input.rustWebFramework as string) ?? "none",
    rustFrontend: (input.rustFrontend as string) ?? "none",
    rustOrm: (input.rustOrm as string) ?? "none",
    rustApi: (input.rustApi as string) ?? "none",
    rustCli: (input.rustCli as string) ?? "none",
    rustLibraries: ((input.rustLibraries as string[]) ?? []).join(",") || "none",
    rustLogging: (input.rustLogging as string) ?? "none",
    rustErrorHandling: (input.rustErrorHandling as string) ?? "none",
    rustCaching: (input.rustCaching as string) ?? "none",
    pythonWebFramework: (input.pythonWebFramework as string) ?? "none",
    pythonOrm: (input.pythonOrm as string) ?? "none",
    pythonValidation: (input.pythonValidation as string) ?? "none",
    pythonAi: ((input.pythonAi as string[]) ?? []).join(",") || "none",
    pythonAuth: (input.pythonAuth as string) ?? "none",
    pythonTaskQueue: (input.pythonTaskQueue as string) ?? "none",
    pythonGraphql: (input.pythonGraphql as string) ?? "none",
    pythonQuality: (input.pythonQuality as string) ?? "none",
    goWebFramework: (input.goWebFramework as string) ?? "none",
    goOrm: (input.goOrm as string) ?? "none",
    goApi: (input.goApi as string) ?? "none",
    goCli: (input.goCli as string) ?? "none",
    goLogging: (input.goLogging as string) ?? "none",
    goAuth: (input.goAuth as string) ?? "none",
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
- **Fullstack (backend='self')**: Sets runtime=none, serverDeploy=none. Only works with: next, tanstack-start, astro, nuxt, svelte, solid-start.

## Runtime Constraints
- NestJS and AdonisJS require runtime=node.
- Elysia requires runtime=bun.
- Cloudflare Workers runtime only works with Hono backend.
- backend=self or backend=convex requires runtime=none.

## API Constraints
- tRPC only works with React-based frontends: next, react-router, tanstack-router, tanstack-start.
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

## Ecosystem Isolation
- Rust, Python, Go ecosystems are independent — TypeScript fields are ignored.
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
2. Tell the user to run: cd my-rust-app && cargo build

## Quick Start — Python Project
1. Call bfs_create_project with:
   - projectName: "my-python-app"
   - ecosystem: "python"
   - pythonWebFramework: "fastapi"
   - pythonOrm: "sqlalchemy"
2. Tell the user to run: cd my-python-app && uv sync

## Quick Start — Go Project
1. Call bfs_create_project with:
   - projectName: "my-go-app"
   - ecosystem: "go"
   - goWebFramework: "gin"
   - goOrm: "gorm"
2. Tell the user to run: cd my-go-app && go mod tidy && go run cmd/server/main.go

## Adding Features to Existing Projects
1. Call bfs_add_feature with projectDir pointing to the project root.
2. Provide addons array with features to add (e.g., ["biome", "turborepo"]).
`;

export async function startMcpServer() {
  const server = new McpServer(
    { name: "better-fullstack", version: getLatestCLIVersion() },
    { instructions: INSTRUCTIONS, capabilities: { logging: {} } },
  );

  server.tool(
    "bfs_get_guidance",
    "Returns workflow rules, field semantics, ambiguity rules, and critical constraints. Call this FIRST before using other tools.",
    {},
    async () => {
      const guidance = getGuidance();
      return {
        content: [{ type: "text", text: JSON.stringify(guidance, null, 2) }],
      };
    },
  );

  server.tool(
    "bfs_get_schema",
    "Returns valid options for a specific category (e.g., 'database', 'frontend', 'backend') or ALL categories. Use ecosystem to filter to relevant categories only.",
    {
      category: z.string().optional().describe("Category name (e.g., 'database', 'orm', 'frontend'). Omit for all categories."),
      ecosystem: EcosystemSchema.optional().describe("Filter categories to this ecosystem (e.g., 'rust' returns only Rust + shared categories)."),
    },
    async ({ category, ecosystem }) => {
      const result = getSchemaOptions(category, ecosystem);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.tool(
    "bfs_check_compatibility",
    "Validates a stack combination and returns auto-adjusted selections with warnings. Call BEFORE creating a project to avoid invalid combinations.",
    {
      ecosystem: EcosystemSchema.describe("Language ecosystem"),
      frontend: z.array(z.string()).optional().describe("Web frontend frameworks (TypeScript only)"),
      backend: z.string().optional().describe("Backend framework"),
      runtime: z.string().optional().describe("JavaScript runtime"),
      database: z.string().optional().describe("Database type"),
      orm: z.string().optional().describe("ORM"),
      api: z.string().optional().describe("API layer"),
      auth: z.string().optional().describe("Auth provider"),
      payments: z.string().optional().describe("Payments provider"),
      uiLibrary: z.string().optional().describe("UI component library"),
      cssFramework: z.string().optional().describe("CSS framework"),
      addons: z.array(z.string()).optional().describe("Addon list"),
    },
    async (input) => {
      try {
        const compatInput = buildCompatibilityInput(input);
        const result = analyzeStackCompatibility(compatInput);
        const filtered = filterCompatibilityResult(result, input.ecosystem);
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
    search: SearchSchema.optional().describe("Search engine"),
    caching: CachingSchema.optional().describe("Caching solution"),
    i18n: I18nSchema.optional().describe("Internationalization (i18n) library"),
    cms: CMSSchema.optional().describe("CMS"),
    fileStorage: FileStorageSchema.optional().describe("File storage"),
    fileUpload: FileUploadSchema.optional().describe("File upload"),
    webDeploy: WebDeploySchema.optional().describe("Web deployment target"),
    serverDeploy: ServerDeploySchema.optional().describe("Server deployment target"),
    dbSetup: DatabaseSetupSchema.optional().describe("Database hosting provider"),
    rustWebFramework: RustWebFrameworkSchema.optional().describe("Rust web framework"),
    rustFrontend: RustFrontendSchema.optional().describe("Rust frontend (WASM)"),
    rustOrm: RustOrmSchema.optional().describe("Rust ORM"),
    rustApi: RustApiSchema.optional().describe("Rust API layer"),
    rustCli: RustCliSchema.optional().describe("Rust CLI framework"),
    rustLibraries: z.array(RustLibrariesSchema).optional().describe("Rust libraries"),
    rustLogging: RustLoggingSchema.optional().describe("Rust logging library"),
    rustErrorHandling: RustErrorHandlingSchema.optional().describe("Rust error handling library"),
    rustCaching: RustCachingSchema.optional().describe("Rust caching library"),
    pythonWebFramework: PythonWebFrameworkSchema.optional().describe("Python web framework"),
    pythonOrm: PythonOrmSchema.optional().describe("Python ORM"),
    pythonValidation: PythonValidationSchema.optional().describe("Python validation"),
    pythonAi: z.array(PythonAiSchema).optional().describe("Python AI libraries"),
    pythonAuth: PythonAuthSchema.optional().describe("Python auth library"),
    pythonTaskQueue: PythonTaskQueueSchema.optional().describe("Python task queue"),
    pythonQuality: PythonQualitySchema.optional().describe("Python code quality"),
    goWebFramework: GoWebFrameworkSchema.optional().describe("Go web framework"),
    goOrm: GoOrmSchema.optional().describe("Go ORM"),
    goApi: GoApiSchema.optional().describe("Go API layer"),
    goCli: GoCliSchema.optional().describe("Go CLI framework"),
    goLogging: GoLoggingSchema.optional().describe("Go logging library"),
    goAuth: GoAuthSchema.optional().describe("Go authentication library"),
  };

  server.tool(
    "bfs_plan_project",
    "Dry-run: generates a project in-memory and returns the file tree WITHOUT writing to disk. Use this to preview what would be created.",
    planCreateSchema,
    async (input) => {
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

  server.tool(
    "bfs_create_project",
    "Creates a new fullstack project on disk. Dependencies are NOT installed (agent must tell user to install manually). Call bfs_plan_project first to preview.",
    { ...planCreateSchema, projectName: z.string().describe("Project name (kebab-case). Will be the directory name.") },
    async (input) => {
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
        const installCmd = getInstallCommand(ecosystem, projectName, input.packageManager);
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

  server.tool(
    "bfs_plan_addition",
    "Validates what would be added to an existing project. Reads the project config (bts.jsonc) and checks which addons are new.",
    {
      projectDir: z.string().describe("Absolute path to the existing project directory"),
      addons: z.array(AddonsSchema).optional().describe("Addons to add"),
      webDeploy: WebDeploySchema.optional().describe("Web deployment option"),
      serverDeploy: ServerDeploySchema.optional().describe("Server deployment option"),
    },
    async ({ projectDir, addons, webDeploy, serverDeploy }) => {
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

  server.tool(
    "bfs_add_feature",
    "Adds addons/features to an existing Better-Fullstack project. Dependencies are NOT installed. Call bfs_plan_addition first to validate.",
    {
      projectDir: z.string().describe("Absolute path to the existing project directory"),
      addons: z.array(AddonsSchema).optional().describe("Addons to add"),
      webDeploy: WebDeploySchema.optional().describe("Web deployment option"),
      serverDeploy: ServerDeploySchema.optional().describe("Server deployment option"),
      packageManager: PackageManagerSchema.optional().describe("Package manager to use"),
    },
    async (input) => {
      try {
        const safePath = sanitizePath(input.projectDir);
        const { add } = await import("./index.js");

        const addInput: AddInput = {
          addons: input.addons,
          webDeploy: input.webDeploy,
          serverDeploy: input.serverDeploy,
          projectDir: safePath,
          install: false,
          packageManager: input.packageManager,
        };

        const result = await add(addInput);
        if (result?.success) {
          const existingConfig = await readBtsConfig(safePath);
          const ecosystem = existingConfig?.ecosystem ?? "typescript";
          const dirName = safePath.split("/").pop() ?? "project";
          const installCmd = getInstallCommand(ecosystem, dirName, input.packageManager);
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
