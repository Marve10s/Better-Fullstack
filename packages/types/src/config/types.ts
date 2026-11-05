import type { z } from "zod";

import type {
  DatabaseSchema,
  ORMSchema,
  BackendSchema,
  RuntimeSchema,
  FrontendSchema,
  AddonsSchema,
  ExamplesSchema,
  PackageManagerSchema,
  WorkspaceShapeSchema,
  VersionChannelSchema,
  DatabaseSetupSchema,
  APISchema,
  AuthSchema,
  PaymentsSchema,
  WebDeploySchema,
  ServerDeploySchema,
  DirectoryConflictSchema,
  TemplateSchema,
  ProjectShapeSchema,
  ProjectNameSchema,
  CreateInputSchema,
  AddInputSchema,
  CLIInputSchema,
  ProjectConfigSchema,
  BetterFullstackConfigSchema,
  BetterTStackConfigSchema,
  InitResultSchema,
  AstroIntegrationSchema,
  AISchema,
  EffectSchema,
  StateManagementSchema,
  FormsSchema,
  TestingSchema,
  EmailSchema,
  CSSFrameworkSchema,
  UILibrarySchema,
  ValidationSchema,
  RealtimeSchema,
  JobQueueSchema,
  AnimationSchema,
  FileUploadSchema,
  LoggingSchema,
  ObservabilitySchema,
  FeatureFlagsSchema,
  IntegrationsSchema,
  EcommerceSchema,
  AnalyticsSchema,
  WebMcpSchema,
  MobileNavigationSchema,
  MobileUISchema,
  MobileStorageSchema,
  MobileTestingSchema,
  MobilePushSchema,
  MobileOTASchema,
  MobileDeepLinkingSchema,
  MobileLibrariesSchema,
  CMSSchema,
  CachingSchema,
  RateLimitSchema,
  BotProtectionSchema,
  I18nSchema,
  SearchSchema,
  VectorDbSchema,
  FileStorageSchema,
  RubyWebFrameworkSchema,
  RubyOrmSchema,
  RubyAuthSchema,
  RubyTestingSchema,
  RubyValidationSchema,
  RubyCacheSchema,
  RubyJobQueueSchema,
  RubyEmailSchema,
  RubyLoggingSchema,
  RubyHttpClientSchema,
  EcosystemSchema,
  RustWebFrameworkSchema,
  RustFrontendSchema,
  DotnetFrontendSchema,
  KotlinMobileSchema,
  KotlinMobileLibrariesSchema,
  SwiftMobileSchema,
  DartMobileSchema,
  RustOrmSchema,
  RustApiSchema,
  RustCliSchema,
  RustLibrariesSchema,
  RustLoggingSchema,
  RustErrorHandlingSchema,
  RustCachingSchema,
  RustAuthSchema,
  RustRealtimeSchema,
  RustMessageQueueSchema,
  RustObservabilitySchema,
  RustTemplatingSchema,
  PythonWebFrameworkSchema,
  PythonOrmSchema,
  PythonValidationSchema,
  PythonAiSchema,
  PythonAuthSchema,
  PythonApiSchema,
  PythonTaskQueueSchema,
  PythonGraphqlSchema,
  PythonQualitySchema,
  PythonTestingSchema,
  PythonCachingSchema,
  PythonRealtimeSchema,
  PythonObservabilitySchema,
  PythonLoggingSchema,
  PythonCliSchema,
  PythonCloudSdkSchema,
  PythonHttpClientSchema,
  PythonDataSchema,
  PythonMediaSchema,
  PythonServerSchema,
  PythonPackageManagerSchema,
  PythonMessageQueueSchema,
  GoWebFrameworkSchema,
  GoOrmSchema,
  GoApiSchema,
  GoCliSchema,
  GoLoggingSchema,
  GoAuthSchema,
  GoTestingSchema,
  GoRealtimeSchema,
  GoMessageQueueSchema,
  GoCachingSchema,
  GoConfigSchema,
  GoObservabilitySchema,
  GoValidationSchema,
  GoQualitySchema,
  GoMigrationsSchema,
  GoTemplatingSchema,
  GoProtoToolingSchema,
  GoDISchema,
  CrystalWebFrameworkSchema,
  CrystalOrmSchema,
  CrystalAuthSchema,
  CrystalTestingSchema,
  CrystalValidationSchema,
  CrystalCacheSchema,
  CrystalJobsSchema,
  JavaLanguageSchema,
  JavaWebFrameworkSchema,
  JavaBuildToolSchema,
  JavaOrmSchema,
  JavaAuthSchema,
  JavaApiSchema,
  JavaLoggingSchema,
  JavaLibrariesSchema,
  JavaTestingLibrariesSchema,
  DotnetWebFrameworkSchema,
  DotnetOrmSchema,
  DotnetAuthSchema,
  DotnetApiSchema,
  DotnetTestingSchema,
  DotnetJobQueueSchema,
  DotnetRealtimeSchema,
  DotnetObservabilitySchema,
  DotnetValidationSchema,
  DotnetCachingSchema,
  DotnetDeploySchema,
  DotnetLibrariesSchema,
  PhpWebFrameworkSchema,
  PhpOrmSchema,
  PhpAuthSchema,
  PhpTestingSchema,
  PhpValidationSchema,
  PhpCacheSchema,
  PhpJobQueueSchema,
  PhpEmailSchema,
  PhpLoggingSchema,
  PhpHttpClientSchema,
  ElixirWebFrameworkSchema,
  ElixirOrmSchema,
  ElixirAuthSchema,
  ElixirApiSchema,
  ElixirLibrariesSchema,
  ElixirRealtimeSchema,
  ElixirJobsSchema,
  ElixirValidationSchema,
  ElixirHttpSchema,
  ElixirJsonSchema,
  ElixirEmailSchema,
  ElixirCachingSchema,
  ElixirObservabilitySchema,
  ElixirTestingSchema,
  ElixirQualitySchema,
  ElixirI18nSchema,
  ElixirHttpServerSchema,
  ElixirApplicationFrameworkSchema,
  ElixirDocumentationSchema,
  ElixirClusteringSchema,
  ElixirLoggingSchema,
  ElixirConfigSchema,
  ElixirMessageQueueSchema,
  ElixirTemplatingSchema,
  ElixirCliSchema,
  ElixirDeploySchema,
  AiDocsSchema,
  ShadcnBaseSchema,
  ShadcnStyleSchema,
  ShadcnIconLibrarySchema,
  ShadcnColorThemeSchema,
  ShadcnBaseColorSchema,
  ShadcnFontSchema,
  ShadcnRadiusSchema,
  StackPartEcosystemSchema,
  StackPartRoleSchema,
  StackPartSchema,
  StackPartSourceSchema,
} from "@/config/schemas";

// Inferred types from Zod schemas
export type Database = z.infer<typeof DatabaseSchema>;
export type ORM = z.infer<typeof ORMSchema>;
export type Backend = z.infer<typeof BackendSchema>;
export type Runtime = z.infer<typeof RuntimeSchema>;
export type Frontend = z.infer<typeof FrontendSchema>;
export type Addons = z.infer<typeof AddonsSchema>;
export type Examples = z.infer<typeof ExamplesSchema>;
export type PackageManager = z.infer<typeof PackageManagerSchema>;
export type WorkspaceShape = z.infer<typeof WorkspaceShapeSchema>;
export type VersionChannel = z.infer<typeof VersionChannelSchema>;
export type DatabaseSetup = z.infer<typeof DatabaseSetupSchema>;
export type API = z.infer<typeof APISchema>;
export type Auth = z.infer<typeof AuthSchema>;
export type Payments = z.infer<typeof PaymentsSchema>;
export type WebDeploy = z.infer<typeof WebDeploySchema>;
export type ServerDeploy = z.infer<typeof ServerDeploySchema>;
export type DirectoryConflict = z.infer<typeof DirectoryConflictSchema>;
export type Template = z.infer<typeof TemplateSchema>;
export type ProjectShape = z.infer<typeof ProjectShapeSchema>;
export type ProjectName = z.infer<typeof ProjectNameSchema>;
export type AstroIntegration = z.infer<typeof AstroIntegrationSchema>;
export type AI = z.infer<typeof AISchema>;
export type Effect = z.infer<typeof EffectSchema>;
export type StateManagement = z.infer<typeof StateManagementSchema>;
export type Forms = z.infer<typeof FormsSchema>;
export type Testing = z.infer<typeof TestingSchema>;
export type Email = z.infer<typeof EmailSchema>;
export type CSSFramework = z.infer<typeof CSSFrameworkSchema>;
export type UILibrary = z.infer<typeof UILibrarySchema>;
export type Validation = z.infer<typeof ValidationSchema>;
export type Realtime = z.infer<typeof RealtimeSchema>;
export type JobQueue = z.infer<typeof JobQueueSchema>;
export type Animation = z.infer<typeof AnimationSchema>;
export type FileUpload = z.infer<typeof FileUploadSchema>;
export type Logging = z.infer<typeof LoggingSchema>;
export type Observability = z.infer<typeof ObservabilitySchema>;
export type FeatureFlags = z.infer<typeof FeatureFlagsSchema>;
export type Integrations = z.infer<typeof IntegrationsSchema>;
export type Ecommerce = z.infer<typeof EcommerceSchema>;
export type Analytics = z.infer<typeof AnalyticsSchema>;
export type WebMcp = z.infer<typeof WebMcpSchema>;
export type MobileNavigation = z.infer<typeof MobileNavigationSchema>;
export type MobileUI = z.infer<typeof MobileUISchema>;
export type MobileStorage = z.infer<typeof MobileStorageSchema>;
export type MobileTesting = z.infer<typeof MobileTestingSchema>;
export type MobilePush = z.infer<typeof MobilePushSchema>;
export type MobileOTA = z.infer<typeof MobileOTASchema>;
export type MobileDeepLinking = z.infer<typeof MobileDeepLinkingSchema>;
export type MobileLibraries = z.infer<typeof MobileLibrariesSchema>;
export type CMS = z.infer<typeof CMSSchema>;
export type Caching = z.infer<typeof CachingSchema>;
export type RateLimit = z.infer<typeof RateLimitSchema>;
export type BotProtection = z.infer<typeof BotProtectionSchema>;
export type I18n = z.infer<typeof I18nSchema>;
export type Search = z.infer<typeof SearchSchema>;
export type VectorDb = z.infer<typeof VectorDbSchema>;
export type FileStorage = z.infer<typeof FileStorageSchema>;
export type Ecosystem = z.infer<typeof EcosystemSchema>;
export type RustWebFramework = z.infer<typeof RustWebFrameworkSchema>;
export type RustFrontend = z.infer<typeof RustFrontendSchema>;
export type DotnetFrontend = z.infer<typeof DotnetFrontendSchema>;
export type KotlinMobile = z.infer<typeof KotlinMobileSchema>;
export type KotlinMobileLibraries = z.infer<typeof KotlinMobileLibrariesSchema>;
export type SwiftMobile = z.infer<typeof SwiftMobileSchema>;
export type DartMobile = z.infer<typeof DartMobileSchema>;
export type RustOrm = z.infer<typeof RustOrmSchema>;
export type RustApi = z.infer<typeof RustApiSchema>;
export type RustCli = z.infer<typeof RustCliSchema>;
export type RustLibraries = z.infer<typeof RustLibrariesSchema>;
export type RustLogging = z.infer<typeof RustLoggingSchema>;
export type RustErrorHandling = z.infer<typeof RustErrorHandlingSchema>;
export type RustCaching = z.infer<typeof RustCachingSchema>;
export type RustAuth = z.infer<typeof RustAuthSchema>;
export type RustRealtime = z.infer<typeof RustRealtimeSchema>;
export type RustMessageQueue = z.infer<typeof RustMessageQueueSchema>;
export type RustObservability = z.infer<typeof RustObservabilitySchema>;
export type RustTemplating = z.infer<typeof RustTemplatingSchema>;
export type PythonWebFramework = z.infer<typeof PythonWebFrameworkSchema>;
export type PythonOrm = z.infer<typeof PythonOrmSchema>;
export type PythonValidation = z.infer<typeof PythonValidationSchema>;
export type PythonAi = z.infer<typeof PythonAiSchema>;
export type PythonAuth = z.infer<typeof PythonAuthSchema>;
export type PythonApi = z.infer<typeof PythonApiSchema>;
export type PythonTaskQueue = z.infer<typeof PythonTaskQueueSchema>;
export type PythonGraphql = z.infer<typeof PythonGraphqlSchema>;
export type PythonQuality = z.infer<typeof PythonQualitySchema>;
export type PythonTesting = z.infer<typeof PythonTestingSchema>;
export type PythonCaching = z.infer<typeof PythonCachingSchema>;
export type PythonRealtime = z.infer<typeof PythonRealtimeSchema>;
export type PythonObservability = z.infer<typeof PythonObservabilitySchema>;
export type PythonLogging = z.infer<typeof PythonLoggingSchema>;
export type PythonCli = z.infer<typeof PythonCliSchema>;
export type PythonCloudSdk = z.infer<typeof PythonCloudSdkSchema>;
export type PythonHttpClient = z.infer<typeof PythonHttpClientSchema>;
export type PythonData = z.infer<typeof PythonDataSchema>;
export type PythonMedia = z.infer<typeof PythonMediaSchema>;
export type PythonServer = z.infer<typeof PythonServerSchema>;
export type PythonPackageManager = z.infer<typeof PythonPackageManagerSchema>;
export type PythonMessageQueue = z.infer<typeof PythonMessageQueueSchema>;
export type GoWebFramework = z.infer<typeof GoWebFrameworkSchema>;
export type GoOrm = z.infer<typeof GoOrmSchema>;
export type GoApi = z.infer<typeof GoApiSchema>;
export type GoCli = z.infer<typeof GoCliSchema>;
export type GoLogging = z.infer<typeof GoLoggingSchema>;
export type GoAuth = z.infer<typeof GoAuthSchema>;
export type GoTesting = z.infer<typeof GoTestingSchema>;
export type GoRealtime = z.infer<typeof GoRealtimeSchema>;
export type GoMessageQueue = z.infer<typeof GoMessageQueueSchema>;
export type GoCaching = z.infer<typeof GoCachingSchema>;
export type GoConfig = z.infer<typeof GoConfigSchema>;
export type GoObservability = z.infer<typeof GoObservabilitySchema>;
export type GoValidation = z.infer<typeof GoValidationSchema>;
export type GoQuality = z.infer<typeof GoQualitySchema>;
export type GoMigrations = z.infer<typeof GoMigrationsSchema>;
export type GoTemplating = z.infer<typeof GoTemplatingSchema>;
export type GoProtoTooling = z.infer<typeof GoProtoToolingSchema>;
export type GoDI = z.infer<typeof GoDISchema>;
export type CrystalWebFramework = z.infer<typeof CrystalWebFrameworkSchema>;
export type CrystalOrm = z.infer<typeof CrystalOrmSchema>;
export type CrystalAuth = z.infer<typeof CrystalAuthSchema>;
export type CrystalTesting = z.infer<typeof CrystalTestingSchema>;
export type CrystalValidation = z.infer<typeof CrystalValidationSchema>;
export type CrystalCache = z.infer<typeof CrystalCacheSchema>;
export type CrystalJobs = z.infer<typeof CrystalJobsSchema>;
export type JavaLanguage = z.infer<typeof JavaLanguageSchema>;
export type JavaWebFramework = z.infer<typeof JavaWebFrameworkSchema>;
export type JavaBuildTool = z.infer<typeof JavaBuildToolSchema>;
export type JavaOrm = z.infer<typeof JavaOrmSchema>;
export type JavaAuth = z.infer<typeof JavaAuthSchema>;
export type JavaApi = z.infer<typeof JavaApiSchema>;
export type JavaLogging = z.infer<typeof JavaLoggingSchema>;
export type JavaLibraries = z.infer<typeof JavaLibrariesSchema>;
export type JavaTestingLibraries = z.infer<typeof JavaTestingLibrariesSchema>;
export type DotnetWebFramework = z.infer<typeof DotnetWebFrameworkSchema>;
export type DotnetOrm = z.infer<typeof DotnetOrmSchema>;
export type DotnetAuth = z.infer<typeof DotnetAuthSchema>;
export type DotnetApi = z.infer<typeof DotnetApiSchema>;
export type DotnetTesting = z.infer<typeof DotnetTestingSchema>;
export type DotnetJobQueue = z.infer<typeof DotnetJobQueueSchema>;
export type DotnetRealtime = z.infer<typeof DotnetRealtimeSchema>;
export type DotnetObservability = z.infer<typeof DotnetObservabilitySchema>;
export type DotnetValidation = z.infer<typeof DotnetValidationSchema>;
export type DotnetCaching = z.infer<typeof DotnetCachingSchema>;
export type DotnetDeploy = z.infer<typeof DotnetDeploySchema>;
export type DotnetLibraries = z.infer<typeof DotnetLibrariesSchema>;
export type PhpWebFramework = z.infer<typeof PhpWebFrameworkSchema>;
export type PhpOrm = z.infer<typeof PhpOrmSchema>;
export type PhpAuth = z.infer<typeof PhpAuthSchema>;
export type PhpTesting = z.infer<typeof PhpTestingSchema>;
export type PhpValidation = z.infer<typeof PhpValidationSchema>;
export type PhpCache = z.infer<typeof PhpCacheSchema>;
export type PhpJobQueue = z.infer<typeof PhpJobQueueSchema>;
export type PhpEmail = z.infer<typeof PhpEmailSchema>;
export type PhpLogging = z.infer<typeof PhpLoggingSchema>;
export type PhpHttpClient = z.infer<typeof PhpHttpClientSchema>;
export type ElixirWebFramework = z.infer<typeof ElixirWebFrameworkSchema>;
export type ElixirOrm = z.infer<typeof ElixirOrmSchema>;
export type ElixirAuth = z.infer<typeof ElixirAuthSchema>;
export type ElixirApi = z.infer<typeof ElixirApiSchema>;
export type ElixirLibraries = z.infer<typeof ElixirLibrariesSchema>;
export type ElixirRealtime = z.infer<typeof ElixirRealtimeSchema>;
export type ElixirJobs = z.infer<typeof ElixirJobsSchema>;
export type ElixirValidation = z.infer<typeof ElixirValidationSchema>;
export type ElixirHttp = z.infer<typeof ElixirHttpSchema>;
export type ElixirJson = z.infer<typeof ElixirJsonSchema>;
export type ElixirEmail = z.infer<typeof ElixirEmailSchema>;
export type ElixirCaching = z.infer<typeof ElixirCachingSchema>;
export type ElixirObservability = z.infer<typeof ElixirObservabilitySchema>;
export type ElixirTesting = z.infer<typeof ElixirTestingSchema>;
export type ElixirQuality = z.infer<typeof ElixirQualitySchema>;
export type ElixirI18n = z.infer<typeof ElixirI18nSchema>;
export type ElixirHttpServer = z.infer<typeof ElixirHttpServerSchema>;
export type ElixirApplicationFramework = z.infer<typeof ElixirApplicationFrameworkSchema>;
export type ElixirDocumentation = z.infer<typeof ElixirDocumentationSchema>;
export type ElixirClustering = z.infer<typeof ElixirClusteringSchema>;
export type ElixirLogging = z.infer<typeof ElixirLoggingSchema>;
export type ElixirConfig = z.infer<typeof ElixirConfigSchema>;
export type ElixirMessageQueue = z.infer<typeof ElixirMessageQueueSchema>;
export type ElixirTemplating = z.infer<typeof ElixirTemplatingSchema>;
export type ElixirCli = z.infer<typeof ElixirCliSchema>;
export type ElixirDeploy = z.infer<typeof ElixirDeploySchema>;
export type AiDocs = z.infer<typeof AiDocsSchema>;
export type ShadcnBase = z.infer<typeof ShadcnBaseSchema>;
export type ShadcnStyle = z.infer<typeof ShadcnStyleSchema>;
export type ShadcnIconLibrary = z.infer<typeof ShadcnIconLibrarySchema>;
export type ShadcnColorTheme = z.infer<typeof ShadcnColorThemeSchema>;
export type ShadcnBaseColor = z.infer<typeof ShadcnBaseColorSchema>;
export type ShadcnFont = z.infer<typeof ShadcnFontSchema>;
export type ShadcnRadius = z.infer<typeof ShadcnRadiusSchema>;
export type StackPartEcosystem = z.infer<typeof StackPartEcosystemSchema>;
export type StackPartRole = z.infer<typeof StackPartRoleSchema>;
export type StackPartSource = z.infer<typeof StackPartSourceSchema>;
export type StackPart = z.infer<typeof StackPartSchema>;

export type CreateInput = z.infer<typeof CreateInputSchema>;
export type AddInput = z.infer<typeof AddInputSchema>;
export type CLIInput = z.infer<typeof CLIInputSchema>;
export type ProjectConfig = z.infer<typeof ProjectConfigSchema>;
export type BetterFullstackConfig = z.infer<typeof BetterFullstackConfigSchema>;
export type BetterTStackConfig = z.infer<typeof BetterTStackConfigSchema>;
export type InitResult = z.infer<typeof InitResultSchema>;

export type WebFrontend = Extract<
  Frontend,
  | "tanstack-router"
  | "react-router"
  | "react-vite"
  | "tanstack-start"
  | "next"
  | "vinext"
  | "nuxt"
  | "svelte"
  | "solid"
  | "solid-start"
  | "tanstack-start-solid"
  | "astro"
  | "none"
>;

export type NativeFrontend = Extract<
  Frontend,
  "native-bare" | "native-uniwind" | "native-unistyles" | "none"
>;

export type RubyWebFramework = z.infer<typeof RubyWebFrameworkSchema>;
export type RubyOrm = z.infer<typeof RubyOrmSchema>;
export type RubyAuth = z.infer<typeof RubyAuthSchema>;
export type RubyTesting = z.infer<typeof RubyTestingSchema>;
export type RubyValidation = z.infer<typeof RubyValidationSchema>;
export type RubyCache = z.infer<typeof RubyCacheSchema>;
export type RubyJobQueue = z.infer<typeof RubyJobQueueSchema>;
export type RubyEmail = z.infer<typeof RubyEmailSchema>;
export type RubyLogging = z.infer<typeof RubyLoggingSchema>;
export type RubyHttpClient = z.infer<typeof RubyHttpClientSchema>;
