import z from "zod";

import {
  AddonsSchema,
  AISchema,
  APISchema,
  AnalyticsSchema,
  AnimationSchema,
  AiDocsSchema,
  AstroIntegrationSchema,
  AuthSchema,
  BackendSchema,
  CachingSchema,
  CMSSchema,
  CSSFrameworkSchema,
  DatabaseSchema,
  DatabaseSetupSchema,
  DirectoryConflictSchema,
  DotnetApiSchema,
  DotnetAuthSchema,
  DotnetCachingSchema,
  DotnetValidationSchema,
  DotnetDeploySchema,
  DotnetJobQueueSchema,
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
  MobileDeepLinkingSchema,
  MobileNavigationSchema,
  MobileOTASchema,
  MobilePushSchema,
  MobileStorageSchema,
  MobileTestingSchema,
  MobileUISchema,
  FrontendSchema,
  GoApiSchema,
  GoAuthSchema,
  GoCachingSchema,
  GoCliSchema,
  GoConfigSchema,
  GoLoggingSchema,
  GoMessageQueueSchema,
  GoObservabilitySchema,
  GoOrmSchema,
  GoRealtimeSchema,
  GoTestingSchema,
  GoWebFrameworkSchema,
  JavaAuthSchema,
  JavaApiSchema,
  JavaLoggingSchema,
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
  PackageManagerSchema,
  PaymentsSchema,
  ProjectNameSchema,
  PythonAiSchema,
  PythonApiSchema,
  PythonAuthSchema,
  PythonGraphqlSchema,
  PythonOrmSchema,
  PythonQualitySchema,
  PythonTestingSchema,
  PythonCachingSchema,
  PythonRealtimeSchema,
  PythonObservabilitySchema,
  PythonCliSchema,
  PythonTaskQueueSchema,
  PythonValidationSchema,
  PythonWebFrameworkSchema,
  RateLimitSchema,
  RealtimeSchema,
  RuntimeSchema,
  RustApiSchema,
  RustAuthSchema,
  RustRealtimeSchema,
  RustMessageQueueSchema,
  RustObservabilitySchema,
  RustTemplatingSchema,
  RustCachingSchema,
  RustCliSchema,
  RustErrorHandlingSchema,
  RustFrontendSchema,
  RustLibrariesSchema,
  RustLoggingSchema,
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
  StateManagementSchema,
  TemplateSchema,
  TestingSchema,
  UILibrarySchema,
  ValidationSchema,
  VersionChannelSchema,
  WebDeploySchema,
} from "./types";

export const CreateCommandOptionsSchema = z.object({
  template: TemplateSchema.optional().describe("Use a predefined template"),
  fromHistory: z
    .number()
    .optional()
    .describe(
      "Replay the stack of the Nth most-recent project from history (1 = most recent)",
    ),
  config: z
    .string()
    .optional()
    .describe("Path to a bts.jsonc/JSON config file to use as the base stack"),
  yes: z.boolean().optional().default(false).describe("Use default configuration"),
  yolo: z
    .boolean()
    .optional()
    .default(false)
    .describe("(WARNING - NOT RECOMMENDED) Bypass validations and compatibility checks"),
  part: z
    .array(z.string())
    .optional()
    .describe("Stack graph part binding, e.g. frontend:typescript:next or backend.orm:go:gorm"),
  verbose: z.boolean().optional().default(false).describe("Show detailed result information"),
  dryRun: z
    .boolean()
    .optional()
    .default(false)
    .describe("Preview generated file tree without writing to disk"),
  verify: z
    .boolean()
    .optional()
    .default(false)
    .describe("Run generated project checks after scaffolding without starting dev servers"),
  ecosystem: EcosystemSchema.optional().describe(
    "Language ecosystem (typescript, react-native, rust, python, go, java, or elixir)",
  ),
  database: DatabaseSchema.optional(),
  orm: ORMSchema.optional(),
  auth: AuthSchema.optional(),
  payments: PaymentsSchema.optional(),
  email: EmailSchema.optional(),
  fileUpload: FileUploadSchema.optional(),
  effect: EffectSchema.optional(),
  stateManagement: StateManagementSchema.optional(),
  validation: ValidationSchema.optional(),
  forms: FormsSchema.optional(),
  testing: TestingSchema.optional(),
  ai: AISchema.optional(),
  realtime: RealtimeSchema.optional(),
  jobQueue: JobQueueSchema.optional(),
  animation: AnimationSchema.optional(),
  logging: LoggingSchema.optional(),
  observability: ObservabilitySchema.optional(),
  featureFlags: FeatureFlagsSchema.optional().describe("Feature flags provider"),
  analytics: AnalyticsSchema.optional().describe("Privacy-focused analytics"),
  cms: CMSSchema.optional().describe("Headless CMS solution"),
  caching: CachingSchema.optional().describe("Caching solution"),
  rateLimit: RateLimitSchema.optional().describe("Rate limiting solution"),
  i18n: I18nSchema.optional().describe("Internationalization (i18n) library"),
  search: SearchSchema.optional().describe("Search engine solution"),
  vectorDb: VectorDbSchema.optional().describe(
    "Vector database for AI embeddings (pgvector, qdrant, chroma, pinecone)",
  ),
  fileStorage: FileStorageSchema.optional().describe("File storage solution (S3, R2)"),
  mobileNavigation: MobileNavigationSchema.optional().describe(
    "Mobile navigation (expo-router, react-navigation)",
  ),
  mobileUI: MobileUISchema.optional().describe(
    "Mobile UI (tamagui, gluestack-ui, uniwind, unistyles)",
  ),
  mobileStorage: MobileStorageSchema.optional().describe("Mobile storage (mmkv)"),
  mobileTesting: MobileTestingSchema.optional().describe(
    "Mobile testing (maestro, react-native-testing-library)",
  ),
  mobilePush: MobilePushSchema.optional().describe(
    "Mobile push notifications (expo-notifications)",
  ),
  mobileOTA: MobileOTASchema.optional().describe("Mobile OTA updates (expo-updates)"),
  mobileDeepLinking: MobileDeepLinkingSchema.optional().describe(
    "Mobile deep linking (expo-linking)",
  ),
  frontend: z.array(FrontendSchema).optional(),
  astroIntegration: AstroIntegrationSchema.optional().describe(
    "Astro UI framework integration (react, vue, svelte, solid)",
  ),
  addons: z.array(AddonsSchema).optional(),
  examples: z.array(ExamplesSchema).optional(),
  git: z.boolean().optional(),
  packageManager: PackageManagerSchema.optional(),
  install: z.boolean().optional(),
  versionChannel: VersionChannelSchema.optional().describe(
    "Dependency version channel (stable, latest, beta)",
  ),
  dbSetup: DatabaseSetupSchema.optional(),
  backend: BackendSchema.optional(),
  runtime: RuntimeSchema.optional(),
  api: APISchema.optional(),
  cssFramework: CSSFrameworkSchema.optional(),
  uiLibrary: UILibrarySchema.optional(),
  shadcnBase: ShadcnBaseSchema.optional().describe("shadcn/ui headless library (radix, base)"),
  shadcnStyle: ShadcnStyleSchema.optional().describe(
    "shadcn/ui visual style (vega, nova, maia, lyra, mira)",
  ),
  shadcnIconLibrary: ShadcnIconLibrarySchema.optional().describe(
    "shadcn/ui icon library (lucide, tabler, hugeicons, phosphor, remixicon)",
  ),
  shadcnColorTheme: ShadcnColorThemeSchema.optional().describe(
    "shadcn/ui color theme (neutral, blue, violet, etc.)",
  ),
  shadcnBaseColor: ShadcnBaseColorSchema.optional().describe(
    "shadcn/ui base neutral color (neutral, stone, zinc, gray)",
  ),
  shadcnFont: ShadcnFontSchema.optional().describe("shadcn/ui font (inter, geist, figtree, etc.)"),
  shadcnRadius: ShadcnRadiusSchema.optional().describe(
    "shadcn/ui border radius (default, none, small, medium, large)",
  ),
  webDeploy: WebDeploySchema.optional(),
  serverDeploy: ServerDeploySchema.optional(),
  directoryConflict: DirectoryConflictSchema.optional(),
  renderTitle: z.boolean().optional(),
  disableAnalytics: z.boolean().optional().default(false).describe("Disable analytics"),
  manualDb: z
    .boolean()
    .optional()
    .default(false)
    .describe("Skip automatic/manual database setup prompt and use manual setup"),
  rustWebFramework: RustWebFrameworkSchema.optional().describe(
    "Rust web framework (axum, actix-web)",
  ),
  rustFrontend: RustFrontendSchema.optional().describe("Rust WASM frontend (leptos, dioxus)"),
  rustOrm: RustOrmSchema.optional().describe("Rust ORM/database (sea-orm, sqlx)"),
  rustApi: RustApiSchema.optional().describe("Rust API layer (tonic, async-graphql)"),
  rustCli: RustCliSchema.optional().describe("Rust CLI tools (clap, ratatui)"),
  rustLibraries: z.array(RustLibrariesSchema).optional().describe("Rust core libraries"),
  rustLogging: RustLoggingSchema.optional().describe("Rust logging (tracing, env-logger)"),
  rustErrorHandling: RustErrorHandlingSchema.optional().describe(
    "Rust error handling (anyhow-thiserror, eyre)",
  ),
  rustCaching: RustCachingSchema.optional().describe("Rust caching (moka, redis)"),
  rustAuth: RustAuthSchema.optional().describe("Rust auth (oauth2)"),
  rustRealtime: RustRealtimeSchema.optional().describe("Rust realtime (tokio-tungstenite)"),
  rustMessageQueue: RustMessageQueueSchema.optional().describe("Rust message queue (lapin)"),
  rustObservability: RustObservabilitySchema.optional().describe(
    "Rust observability (opentelemetry)",
  ),
  rustTemplating: RustTemplatingSchema.optional().describe("Rust templating (askama, tera)"),
  pythonWebFramework: PythonWebFrameworkSchema.optional().describe(
    "Python web framework (fastapi, django)",
  ),
  pythonOrm: PythonOrmSchema.optional().describe("Python ORM/database (sqlalchemy, sqlmodel)"),
  pythonValidation: PythonValidationSchema.optional().describe("Python validation (pydantic)"),
  pythonAi: z.array(PythonAiSchema).optional().describe("Python AI/ML frameworks"),
  pythonAuth: PythonAuthSchema.optional().describe("Python auth library (authlib, jwt)"),
  pythonApi: PythonApiSchema.optional().describe(
    "Python API framework (django-rest-framework, django-ninja)",
  ),
  pythonTaskQueue: PythonTaskQueueSchema.optional().describe("Python task queue (celery)"),
  pythonGraphql: PythonGraphqlSchema.optional().describe("Python GraphQL framework (strawberry)"),
  pythonQuality: PythonQualitySchema.optional().describe(
    "Python code quality (ruff, mypy, pyright)",
  ),
  pythonTesting: z
    .array(PythonTestingSchema)
    .optional()
    .describe("Python testing libraries (pytest, hypothesis)"),
  pythonCaching: PythonCachingSchema.optional().describe("Python caching (redis, aiocache)"),
  pythonRealtime: PythonRealtimeSchema.optional().describe(
    "Python realtime (python-socketio, websockets)",
  ),
  pythonObservability: PythonObservabilitySchema.optional().describe(
    "Python observability (opentelemetry)",
  ),
  pythonCli: z
    .array(PythonCliSchema)
    .optional()
    .describe("Python CLI tooling (typer, click, rich)"),
  goWebFramework: GoWebFrameworkSchema.optional().describe("Go web framework (gin, echo, fiber)"),
  goOrm: GoOrmSchema.optional().describe("Go ORM/database (gorm, sqlc)"),
  goApi: GoApiSchema.optional().describe("Go API layer (grpc-go)"),
  goCli: GoCliSchema.optional().describe("Go CLI tools (cobra, bubbletea, urfave-cli)"),
  goLogging: GoLoggingSchema.optional().describe("Go logging (zap, zerolog, slog)"),
  goAuth: GoAuthSchema.optional().describe("Go auth (casbin, jwt, goth)"),
  goTesting: z
    .array(GoTestingSchema)
    .optional()
    .describe("Go testing libraries (testify, gomock)"),
  goRealtime: GoRealtimeSchema.optional().describe(
    "Go realtime library (gorilla-websocket, centrifuge)",
  ),
  goMessageQueue: GoMessageQueueSchema.optional().describe("Go message queue (nats, watermill)"),
  goCaching: GoCachingSchema.optional().describe("Go caching library (redis, ristretto)"),
  goConfig: GoConfigSchema.optional().describe("Go config management (viper, koanf)"),
  goObservability: GoObservabilitySchema.optional().describe(
    "Go observability (opentelemetry)",
  ),
  javaWebFramework: JavaWebFrameworkSchema.optional().describe(
    "Java web framework (spring-boot, quarkus, none)",
  ),
  javaBuildTool: JavaBuildToolSchema.optional().describe("Java build tool (maven, gradle, none)"),
  javaOrm: JavaOrmSchema.optional().describe("Java ORM/database (spring-data-jpa)"),
  javaAuth: JavaAuthSchema.optional().describe("Java auth (spring-security)"),
  javaApi: JavaApiSchema.optional().describe("Java API layer (spring-graphql)"),
  javaLogging: JavaLoggingSchema.optional().describe("Java logging (logback, log4j2)"),
  javaLibraries: z.array(JavaLibrariesSchema).optional().describe("Java application libraries"),
  javaTestingLibraries: z
    .array(JavaTestingLibrariesSchema)
    .optional()
    .describe("Java testing libraries"),
  dotnetWebFramework: DotnetWebFrameworkSchema.optional().describe(
    ".NET web framework (aspnet-minimal, aspnet-mvc, aspnet-blazor, none)",
  ),
  dotnetOrm: DotnetOrmSchema.optional().describe(".NET data access (ef-core, dapper, linq2db)"),
  dotnetAuth: DotnetAuthSchema.optional().describe(
    ".NET auth (aspnet-identity, duende-identityserver, auth0-aspnet, none)",
  ),
  dotnetApi: DotnetApiSchema.optional().describe(
    ".NET API style (minimal-api, graphql-hotchocolate, grpc-dotnet, none)",
  ),
  dotnetTesting: z.array(DotnetTestingSchema).optional().describe(".NET testing libraries"),
  dotnetJobQueue: DotnetJobQueueSchema.optional().describe(
    ".NET jobs (hangfire, quartz-net, hosted-services, none)",
  ),
  dotnetRealtime: DotnetRealtimeSchema.optional().describe(".NET realtime (signalr, none)"),
  dotnetObservability: z
    .array(DotnetObservabilitySchema)
    .optional()
    .describe(".NET observability/logging libraries"),
  dotnetValidation: DotnetValidationSchema.optional().describe(
    ".NET validation (fluentvalidation, data-annotations)",
  ),
  dotnetCaching: DotnetCachingSchema.optional().describe(".NET caching (redis, memory-cache, none)"),
  dotnetDeploy: DotnetDeploySchema.optional().describe(".NET deploy target (docker, azure, aws, none)"),
  elixirWebFramework: ElixirWebFrameworkSchema.optional().describe(
    "Elixir web framework (phoenix, phoenix-live-view, none)",
  ),
  elixirOrm: ElixirOrmSchema.optional().describe("Elixir ORM/database (ecto, ecto-sql, none)"),
  elixirAuth: ElixirAuthSchema.optional().describe(
    "Elixir auth (phx-gen-auth, ueberauth, guardian, none)",
  ),
  elixirApi: ElixirApiSchema.optional().describe("Elixir API layer (rest, absinthe, none)"),
  elixirRealtime: ElixirRealtimeSchema.optional().describe(
    "Elixir realtime (channels, presence, pubsub, live-view-streams, none)",
  ),
  elixirJobs: ElixirJobsSchema.optional().describe("Elixir jobs (oban, quantum, none)"),
  elixirValidation: ElixirValidationSchema.optional().describe(
    "Elixir validation (ecto-changesets, nimble-options, none)",
  ),
  elixirHttp: ElixirHttpSchema.optional().describe("Elixir HTTP client (req, finch, none)"),
  elixirJson: ElixirJsonSchema.optional().describe("Elixir JSON library (jason, none)"),
  elixirEmail: ElixirEmailSchema.optional().describe("Elixir email library (swoosh, none)"),
  elixirCaching: ElixirCachingSchema.optional().describe("Elixir caching (cachex, nebulex, none)"),
  elixirObservability: ElixirObservabilitySchema.optional().describe(
    "Elixir observability (telemetry, opentelemetry, prom_ex, none)",
  ),
  elixirTesting: ElixirTestingSchema.optional().describe(
    "Elixir testing (ex_unit, mox, bypass, wallaby, none)",
  ),
  elixirQuality: ElixirQualitySchema.optional().describe(
    "Elixir code quality (credo, dialyxir, sobelow, none)",
  ),
  elixirDeploy: ElixirDeploySchema.optional().describe(
    "Elixir deploy target (docker, fly, gigalixir, mix-release, none)",
  ),
  elixirLibraries: z
    .array(ElixirLibrariesSchema)
    .optional()
    .describe("Elixir libraries (broadway, nx)"),
  aiDocs: z
    .array(AiDocsSchema)
    .optional()
    .describe("AI documentation files (claude-md, agents-md, cursorrules)"),
});

export const CreateCommandInputSchema = z.tuple([
  ProjectNameSchema.optional(),
  CreateCommandOptionsSchema,
]);
