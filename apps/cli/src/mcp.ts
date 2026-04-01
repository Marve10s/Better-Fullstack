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
  GoLoggingSchema,
  GoOrmSchema,
  GoWebFrameworkSchema,
  JobQueueSchema,
  LoggingSchema,
  ObservabilitySchema,
  ORMSchema,
  PackageManagerSchema,
  PaymentsSchema,
  type ProjectConfig,
  PythonAiSchema,
  PythonOrmSchema,
  PythonQualitySchema,
  PythonTaskQueueSchema,
  PythonValidationSchema,
  PythonWebFrameworkSchema,
  RealtimeSchema,
  RuntimeSchema,
  RustApiSchema,
  RustCliSchema,
  RustFrontendSchema,
  RustLibrariesSchema,
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
  pythonWebFramework: PythonWebFrameworkSchema,
  pythonOrm: PythonOrmSchema,
  pythonValidation: PythonValidationSchema,
  pythonAi: PythonAiSchema,
  pythonTaskQueue: PythonTaskQueueSchema,
  pythonQuality: PythonQualitySchema,
  goWebFramework: GoWebFrameworkSchema,
  goOrm: GoOrmSchema,
  goApi: GoApiSchema,
  goCli: GoCliSchema,
  goLogging: GoLoggingSchema,
};

function getSchemaOptions(category?: string) {
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
  const result: Record<string, string[]> = {};
  for (const [key, schema] of Object.entries(SCHEMA_MAP)) {
    if (schema instanceof z.ZodEnum) {
      result[key] = schema.options as string[];
    }
  }
  return result;
}

function sanitizePath(input: string): string {
  if (/[\x00-\x1f]/.test(input)) {
    throw new Error("Path contains control characters");
  }
  if (input.includes("\0")) {
    throw new Error("Path contains null byte");
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
    pythonWebFramework: (input.pythonWebFramework as string) ?? "none",
    pythonOrm: (input.pythonOrm as string) ?? "none",
    pythonValidation: (input.pythonValidation as string) ?? "none",
    pythonAi: ((input.pythonAi as string[]) ?? []).join(",") || "none",
    pythonTaskQueue: (input.pythonTaskQueue as string) ?? "none",
    pythonQuality: (input.pythonQuality as string) ?? "none",
    goWebFramework: (input.goWebFramework as string) ?? "none",
    goOrm: (input.goOrm as string) ?? "none",
    goApi: (input.goApi as string) ?? "none",
    goCli: (input.goCli as string) ?? "none",
    goLogging: (input.goLogging as string) ?? "none",
  };
}

function summarizeTree(tree: { fileCount: number; directoryCount: number; root: { children: Record<string, unknown> } }) {
  const paths: string[] = [];
  function walk(node: Record<string, unknown>, prefix: string) {
    for (const [name, child] of Object.entries(node)) {
      const current = prefix ? `${prefix}/${name}` : name;
      const c = child as { type?: string; children?: Record<string, unknown> };
      if (c.type === "directory" && c.children) {
        walk(c.children, current);
      } else {
        paths.push(current);
      }
    }
  }
  walk(tree.root.children as Record<string, unknown>, "");
  return { fileCount: tree.fileCount, directoryCount: tree.directoryCount, files: paths };
}

const COMPATIBILITY_RULES_MD = `# Better-Fullstack Compatibility Rules

## Backend Constraints
- **Convex**: Forces runtime=none, database=none, orm=none, api=none, dbSetup=none, serverDeploy=none. Removes incompatible frontends (Solid, SolidStart, Astro).
- **No backend (none)**: Clears auth, payments, database, orm, api, serverDeploy, search, fileStorage.
- **Fullstack (self-*)**: Sets runtime=none, serverDeploy=none. Only works with: next, tanstack-start, astro, nuxt, svelte, solid-start.

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
    "Returns valid options for a specific category (e.g., 'database', 'frontend', 'backend') or ALL categories if no category specified.",
    { category: z.string().optional().describe("Category name (e.g., 'database', 'orm', 'frontend'). Omit for all categories.") },
    async ({ category }) => {
      const result = getSchemaOptions(category);
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
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Compatibility check failed: ${error instanceof Error ? error.message : String(error)}` }],
          isError: true,
        };
      }
    },
  );

  server.tool(
    "bfs_plan_project",
    "Dry-run: generates a project in-memory and returns the file tree WITHOUT writing to disk. Use this to preview what would be created.",
    {
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
      addons: z.array(AddonsSchema).optional().describe("Addons"),
      examples: z.array(ExamplesSchema).optional().describe("Example templates"),
    },
    async (input) => {
      try {
        const { createVirtual } = await import("./index.js");
        const result = await createVirtual({
          projectName: input.projectName ?? "my-project",
          ecosystem: input.ecosystem,
          frontend: input.frontend,
          backend: input.backend,
          runtime: input.runtime,
          database: input.database,
          orm: input.orm,
          api: input.api,
          auth: input.auth,
          payments: input.payments,
          addons: input.addons,
          examples: input.examples,
        } as Partial<ProjectConfig>);

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
    {
      projectName: z.string().describe("Project name (kebab-case). Will be the directory name."),
      ecosystem: EcosystemSchema.optional().describe("Language ecosystem (default: typescript)"),
      frontend: z.array(FrontendSchema).optional().describe("Frontend frameworks"),
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
      pythonWebFramework: PythonWebFrameworkSchema.optional().describe("Python web framework"),
      pythonOrm: PythonOrmSchema.optional().describe("Python ORM"),
      pythonValidation: PythonValidationSchema.optional().describe("Python validation"),
      pythonAi: z.array(PythonAiSchema).optional().describe("Python AI libraries"),
      pythonTaskQueue: PythonTaskQueueSchema.optional().describe("Python task queue"),
      pythonQuality: PythonQualitySchema.optional().describe("Python code quality"),
      goWebFramework: GoWebFrameworkSchema.optional().describe("Go web framework"),
      goOrm: GoOrmSchema.optional().describe("Go ORM"),
      goApi: GoApiSchema.optional().describe("Go API layer"),
      goCli: GoCliSchema.optional().describe("Go CLI framework"),
      goLogging: GoLoggingSchema.optional().describe("Go logging library"),
    },
    async (input) => {
      try {
        const { generateVirtualProject, EMBEDDED_TEMPLATES } = await import("@better-fullstack/template-generator");
        const { writeTreeToFilesystem } = await import("@better-fullstack/template-generator/fs-writer");
        const path = await import("node:path");

        const projectName = input.projectName;
        const projectDir = path.resolve(process.cwd(), projectName);
        const config: ProjectConfig = {
          projectName,
          projectDir,
          relativePath: `./${projectName}`,
          ecosystem: input.ecosystem ?? "typescript",
          frontend: input.frontend ?? ["tanstack-router"],
          backend: input.backend ?? "hono",
          runtime: input.runtime ?? "bun",
          database: input.database ?? "none",
          orm: input.orm ?? "none",
          api: input.api ?? "none",
          auth: input.auth ?? "none",
          payments: input.payments ?? "none",
          email: input.email ?? "none",
          fileUpload: input.fileUpload ?? "none",
          effect: "none",
          ai: input.ai ?? "none",
          stateManagement: input.stateManagement ?? "none",
          forms: input.forms ?? "none",
          validation: input.validation ?? "none",
          testing: input.testing ?? "none",
          cssFramework: input.cssFramework ?? "tailwind",
          uiLibrary: input.uiLibrary ?? "none",
          shadcnBase: "radix",
          shadcnStyle: "nova",
          shadcnIconLibrary: "lucide",
          shadcnColorTheme: "neutral",
          shadcnBaseColor: "neutral",
          shadcnFont: "inter",
          shadcnRadius: "default",
          realtime: input.realtime ?? "none",
          jobQueue: input.jobQueue ?? "none",
          animation: input.animation ?? "none",
          logging: input.logging ?? "none",
          observability: input.observability ?? "none",
          featureFlags: "none",
          analytics: "none",
          cms: input.cms ?? "none",
          caching: input.caching ?? "none",
          search: input.search ?? "none",
          fileStorage: input.fileStorage ?? "none",
          addons: input.addons ?? [],
          examples: input.examples ?? [],
          packageManager: input.packageManager ?? "bun",
          versionChannel: "stable",
          webDeploy: input.webDeploy ?? "none",
          serverDeploy: input.serverDeploy ?? "none",
          dbSetup: input.dbSetup ?? "none",
          astroIntegration: "none",
          git: true,
          install: false,
          aiDocs: ["claude-md"],
          // Rust
          rustWebFramework: input.rustWebFramework ?? "none",
          rustFrontend: input.rustFrontend ?? "none",
          rustOrm: input.rustOrm ?? "none",
          rustApi: input.rustApi ?? "none",
          rustCli: input.rustCli ?? "none",
          rustLibraries: input.rustLibraries ?? [],
          // Python
          pythonWebFramework: input.pythonWebFramework ?? "none",
          pythonOrm: input.pythonOrm ?? "none",
          pythonValidation: input.pythonValidation ?? "none",
          pythonAi: input.pythonAi ?? [],
          pythonTaskQueue: input.pythonTaskQueue ?? "none",
          pythonQuality: input.pythonQuality ?? "none",
          // Go
          goWebFramework: input.goWebFramework ?? "none",
          goOrm: input.goOrm ?? "none",
          goApi: input.goApi ?? "none",
          goCli: input.goCli ?? "none",
          goLogging: input.goLogging ?? "none",
        };

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

        const pm = input.packageManager ?? "bun";
        return {
          content: [{
            type: "text",
            text: JSON.stringify({
              success: true,
              projectDirectory: projectDir,
              fileCount: result.tree.fileCount,
              message: `Project created at ${projectDir}. Tell the user to run: cd ${projectName} && ${pm} install`,
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
          return {
            content: [{
              type: "text",
              text: JSON.stringify({
                success: true,
                addedAddons: result.addedAddons,
                projectDir: result.projectDir,
                message: `Added ${result.addedAddons.join(", ")} to project. Tell the user to run install.`,
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
