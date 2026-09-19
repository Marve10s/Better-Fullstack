import {
  LIFECYCLE_CONTRACT_VERSION,
  SUPPORTED_LIFECYCLE_CONTRACT_VERSIONS,
} from "@better-fullstack/project-lifecycle/contracts";
import {
  AISchema,
  AddonsSchema,
  AnalyticsSchema,
  AnimationSchema,
  AstroIntegrationSchema,
  BotProtectionSchema,
  CAPABILITY_EVIDENCE_LEVEL_IDS,
  CMSSchema,
  CachingSchema,
  EcommerceSchema,
  EcosystemSchema,
  EmailSchema,
  ExamplesSchema,
  FeatureFlagsSchema,
  FileStorageSchema,
  FileUploadSchema,
  FormsSchema,
  I18nSchema,
  IntegrationsSchema,
  JobQueueSchema,
  LoggingSchema,
  OPTION_CATEGORY_METADATA,
  ObservabilitySchema,
  type OptionCategory,
  PackageManagerSchema,
  RateLimitSchema,
  RealtimeSchema,
  STARTER_TRACK_AUTH_IDS,
  STARTER_TRACK_DATABASE_IDS,
  STARTER_TRACK_DEPLOYMENT_TARGET_IDS,
  STARTER_TRACK_IDS,
  STARTER_TRACK_PACKAGE_MANAGER_IDS,
  STARTER_TRACK_RUNTIME_IDS,
  STARTER_TRACK_WORKSPACE_SHAPE_IDS,
  SearchSchema,
  ShadcnBaseColorSchema,
  ShadcnBaseSchema,
  ShadcnColorThemeSchema,
  ShadcnFontSchema,
  ShadcnIconLibrarySchema,
  ShadcnRadiusSchema,
  ShadcnStyleSchema,
  StateManagementSchema,
  TestingSchema,
  ValidationSchema,
  VectorDbSchema,
  WebMcpSchema,
  analyzeStackCompatibility,
  evaluateCompatibility,
} from "@better-fullstack/types";
import z from "zod";

import {
  getStarterTrackRecommendation,
  getStarterTracksResult,
} from "@/commands/stack/starter-tracks";
import { defineOperation } from "@/operations/operation";
import {
  capabilityEvidenceOutputSchema,
  compatibilityOutputSchema,
  guidanceOutputSchema,
  schemaOutputSchema,
  starterTrackCatalogOutputSchema,
  starterTrackRecommendationOutputSchema,
} from "@/operations/output-schemas";
import {
  MCP_SHARED_COMPATIBILITY_KEYS,
  buildMcpCompatibilityInput,
  buildProjectConfig,
  filterCompatibilityResult,
  getMcpCategoryKeysForEcosystem,
  getSchemaOptions,
  isMcpEcosystem,
  listMcpPresets,
} from "@/operations/stack-helpers";
import {
  crossEcosystemInputSchema,
  deploymentInputSchema,
  mobileInputSchema,
} from "@/operations/stack-input";
import { getLatestCLIVersion } from "@/platform/get-latest-cli-version";
import { getCapabilityEvidenceReport } from "@/project/capability-evidence";
import { getExpectedCapabilityProducerFingerprint } from "@/project/capability-producer";

function getGuidance() {
  return {
    lifecycleContract: {
      currentVersion: LIFECYCLE_CONTRACT_VERSION,
      supportedVersions: [...SUPPORTED_LIFECYCLE_CONTRACT_VERSIONS],
      unknownVersionBehavior:
        "Do not apply. Treat the structured mutation result as unsupported and require a compatible client.",
    },
    workflow: [
      "Call bfs_get_guidance (this tool) to understand field semantics and rules.",
      "Call bfs_get_schema to see valid values for each category.",
      "Call bfs_check_compatibility to validate your planned stack before creation.",
      "Call bfs_plan_project to preview the generated project (dry-run, no files written).",
      "Call bfs_create_project to scaffold the project on disk.",
      "For existing projects: call bfs_get_project_status and bfs_check_project, then use the reviewed project-update or stack-update workflow that matches the requested change.",
      "Use bfs_plan_addition / bfs_add_feature for owner-scoped tooling Stack Parts and deploy targets.",
      "Use bfs_list_project_recovery_points to discover recovery IDs, then show or verify one before restore. Preview pruning before setting apply to true.",
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

export const getGuidanceOperation = defineOperation({
  name: "get_guidance",
  title: "Get guidance",
  description:
    "Returns workflow rules, field semantics, ambiguity rules, and critical constraints. Call this FIRST before using other tools.",
  input: z.object({}),
  output: guidanceOutputSchema,
  safety: "read",
  idempotent: true,
  openWorld: false,
  run: async () => getGuidance(),
});

export const getSchemaOperation = defineOperation({
  name: "get_schema",
  title: "Get schema options",
  description:
    "Returns valid options for a specific category (e.g., 'database', 'frontend', 'backend') or ALL categories. Use ecosystem to filter to relevant categories only.",
  input: z.object({
    category: z
      .string()
      .optional()
      .describe("Category name (e.g., 'database', 'orm', 'frontend'). Omit for all categories."),
    ecosystem: EcosystemSchema.optional().describe(
      "Filter categories to this ecosystem (e.g., 'rust' returns only Rust + shared categories).",
    ),
  }),
  output: schemaOutputSchema,
  safety: "read",
  idempotent: true,
  openWorld: false,
  run: async ({ category, ecosystem }) => {
    const result = getSchemaOptions(category, ecosystem);
    return "error" in result
      ? { error: result.error }
      : "category" in result
        ? { category: result.category, options: result.options }
        : { categories: result };
  },
});

export const listPresetsOperation = defineOperation({
  name: "list_presets",
  title: "List presets",
  description:
    "Lists the ready-made stack presets available to the CLI (mern, pern, t3, uniwind) with id, name, description, ecosystem, and a stack summary. Use to discover a starting point before bfs_recommend_stack, bfs_plan_project, or bfs_create_project.",
  input: z.object({}),
  safety: "read",
  idempotent: true,
  openWorld: false,
  run: async () => ({ presets: listMcpPresets() }),
});

export const listStarterTracksOperation = defineOperation({
  name: "list_starter_tracks",
  title: "List starter tracks",
  description:
    "Lists the canonical schema-valid starter tracks with their exact editable Stack Parts, compatibility result, evidence breakdown, and bounded filters. Returns the same catalog used by the web builder and CLI.",
  input: z.object({
    id: z.enum(STARTER_TRACK_IDS).optional().describe("Return one exact starter track"),
    ecosystem: EcosystemSchema.optional().describe("Filter by language ecosystem"),
    evidence: z.enum(CAPABILITY_EVIDENCE_LEVEL_IDS).optional(),
    runtime: z.enum(STARTER_TRACK_RUNTIME_IDS).optional(),
    deploymentTarget: z.enum(STARTER_TRACK_DEPLOYMENT_TARGET_IDS).optional(),
    packageManager: z.enum(STARTER_TRACK_PACKAGE_MANAGER_IDS).optional(),
    database: z.enum(STARTER_TRACK_DATABASE_IDS).optional(),
    auth: z.enum(STARTER_TRACK_AUTH_IDS).optional(),
    workspaceShape: z.enum(STARTER_TRACK_WORKSPACE_SHAPE_IDS).optional(),
    receipt: z
      .record(z.string(), z.unknown())
      .optional()
      .describe("Optional capability evidence receipt JSON"),
  }),
  output: starterTrackCatalogOutputSchema,
  safety: "read",
  idempotent: true,
  openWorld: false,
  isFailure: () => false,
  run: async ({ id, ecosystem, receipt, ...filters }) =>
    getStarterTracksResult({
      ecosystem,
      filters,
      receipt,
      catalogVersion: getLatestCLIVersion(),
      producerFingerprint: getExpectedCapabilityProducerFingerprint(receipt),
      trackId: id,
    }),
});

export const recommendStackOperation = defineOperation({
  name: "recommend_stack",
  title: "Recommend stack",
  description:
    "Recommends a compatibility-validated stack from a natural-language brief using deterministic keyword rules (no LLM). Returns the config, rationale, any auto-applied compatibility adjustments, the nearest matching preset, and a reproducible CLI command.",
  input: z.object({
    brief: z
      .string()
      .describe(
        "Natural-language description of the app to build (e.g., 'a SaaS with payments and auth').",
      ),
    ecosystem: EcosystemSchema.optional().describe(
      "Force a language ecosystem. Omit to let the brief decide (defaults to TypeScript).",
    ),
    projectName: z.string().optional().describe("Project name (kebab-case). Default: 'my-app'."),
    receipt: z
      .record(z.string(), z.unknown())
      .optional()
      .describe("Optional capability evidence receipt JSON"),
  }),
  output: starterTrackRecommendationOutputSchema,
  safety: "read",
  idempotent: false,
  openWorld: false,
  failurePrefix: "Recommend stack failed",
  run: async ({ brief, ecosystem, projectName, receipt }) =>
    getStarterTrackRecommendation({
      brief,
      ecosystem,
      projectName,
      receipt,
      catalogVersion: getLatestCLIVersion(),
      producerFingerprint: getExpectedCapabilityProducerFingerprint(receipt),
    }),
});

export const checkCompatibilityOperation = defineOperation({
  name: "check_compatibility",
  title: "Check stack compatibility",
  description:
    "Validates a stack combination and returns auto-adjusted selections with warnings. Call BEFORE creating a project to avoid invalid combinations.",
  input: z.object({
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
    integrations: IntegrationsSchema.optional().describe("Third-party integrations SDK"),
    ecommerce: EcommerceSchema.optional().describe("E-commerce platform SDK"),
    analytics: AnalyticsSchema.optional().describe("Analytics provider"),
    webMcp: WebMcpSchema.optional().describe("Experimental browser-native WebMCP tools"),
    cms: CMSSchema.optional().describe("CMS"),
    caching: CachingSchema.optional().describe("Caching solution"),
    rateLimit: RateLimitSchema.optional().describe("Rate limiting solution"),
    botProtection: BotProtectionSchema.optional().describe("Bot verification provider"),
    i18n: I18nSchema.optional().describe("Internationalization library"),
    search: SearchSchema.optional().describe("Search engine"),
    vectorDb: VectorDbSchema.optional().describe("Vector database (TypeScript only)"),
    fileStorage: FileStorageSchema.optional().describe("File storage"),
    ...mobileInputSchema,
    ...deploymentInputSchema,
    astroIntegration: AstroIntegrationSchema.optional().describe("Astro UI framework integration"),
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
    addons: z.array(AddonsSchema).optional().describe("Deprecated alias for tooling part bindings"),
    examples: z.array(ExamplesSchema).optional().describe("Example templates"),
    packageManager: PackageManagerSchema.optional().describe("Package manager"),
    ...crossEcosystemInputSchema,
  }),
  output: compatibilityOutputSchema,
  safety: "read",
  idempotent: true,
  openWorld: false,
  failurePrefix: "Compatibility check failed",
  run: async (input) => {
    const compatibilitySource = Array.isArray(input.part) ? buildProjectConfig(input) : input;
    const compatInput = buildMcpCompatibilityInput(compatibilitySource);
    const result = analyzeStackCompatibility(compatInput);
    const filtered = filterCompatibilityResult(result, input.ecosystem);
    const evaluation = evaluateCompatibility(compatInput);
    const relevantEcosystem = isMcpEcosystem(input.ecosystem) ? input.ecosystem : "typescript";
    const relevantIssueKeys = new Set<string>([
      ...getMcpCategoryKeysForEcosystem(relevantEcosystem),
      ...MCP_SHARED_COMPATIBILITY_KEYS,
    ]);
    const issues = evaluation.issues.filter(
      (issue) => !issue.category || relevantIssueKeys.has(issue.category),
    );
    return {
      adjustedStack: filtered.adjustedStack,
      changes: filtered.changes,
      issues,
      hasIssues: issues.length > 0,
    };
  },
});

export const getCapabilityEvidenceOperation = defineOperation({
  name: "get_capability_evidence",
  title: "Inspect capability evidence",
  description:
    "Returns per-option evidence, maturity, freshness, maintenance ownership, golden runtime recipes, and structured limitations. Without a current matching receipt, evidence fails closed to listed.",
  input: z.object({
    ecosystem: EcosystemSchema.optional().describe("Optional ecosystem filter"),
    category: z.string().optional().describe("Optional canonical option-category filter"),
    optionId: z.string().optional().describe("Optional exact option ID filter"),
    receiptJson: z
      .string()
      .optional()
      .describe("Optional capability-runtime receipt JSON from a trusted release artifact"),
  }),
  output: capabilityEvidenceOutputSchema,
  safety: "read",
  idempotent: true,
  openWorld: false,
  isFailure: () => false,
  run: async (input) => {
    if (input.category && !(input.category in OPTION_CATEGORY_METADATA)) {
      throw new Error(`Unknown option category: ${input.category}`);
    }
    const receipt = input.receiptJson ? (JSON.parse(input.receiptJson) as unknown) : undefined;
    return getCapabilityEvidenceReport({
      receipt,
      catalogVersion: getLatestCLIVersion(),
      producerFingerprint: getExpectedCapabilityProducerFingerprint(receipt),
      ecosystem: input.ecosystem,
      category: input.category as OptionCategory | undefined,
      optionId: input.optionId,
    });
  },
});
