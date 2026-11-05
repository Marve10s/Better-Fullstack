import type { CrystalSelection } from "@/types";
import { resolveApiPrompt } from "@/prompts/architecture/api";
import { resolveBackendPrompt } from "@/prompts/architecture/backend";
import { resolveFrontendPrompt } from "@/prompts/architecture/frontend";
import {
  resolveMobileDeepLinkingPrompt,
  resolveMobileLibrariesPrompt,
  resolveMobileNavigationPrompt,
  resolveMobileOTAPrompt,
  resolveMobilePushPrompt,
  resolveMobileStoragePrompt,
  resolveMobileTestingPrompt,
  resolveMobileUIPrompt,
} from "@/prompts/architecture/mobile";
import { resolveRuntimePrompt } from "@/prompts/architecture/runtime";
import { type PromptResolution } from "@/prompts/core/prompt-contract";
import { resolveCachingPrompt } from "@/prompts/data/caching";
import { resolveDatabasePrompt } from "@/prompts/data/database";
import { resolveDBSetupPrompt } from "@/prompts/data/database-setup";
import { resolveFileUploadPrompt } from "@/prompts/data/file-upload";
import { resolveORMPrompt } from "@/prompts/data/orm";
import { resolveAstroIntegrationPrompt } from "@/prompts/developer/astro-integration";
import { resolveCSSFrameworkPrompt } from "@/prompts/developer/css-framework";
import { resolveFormsPrompt } from "@/prompts/developer/forms";
import { resolveTestingPrompt } from "@/prompts/developer/testing";
import { resolveUILibraryPrompt } from "@/prompts/developer/ui-library";
import { resolveValidationPrompt } from "@/prompts/developer/validation";
import { resolveCrystalAuthPrompt, resolveCrystalTestingPrompt, resolveCrystalValidationPrompt, resolveCrystalCachePrompt, resolveCrystalJobsPrompt, resolveCrystalOrmPrompt, resolveCrystalWebFrameworkPrompt } from "@/prompts/ecosystems/crystal-ecosystem";
import {
  resolveDotnetApiPrompt,
  resolveDotnetAuthPrompt,
  resolveDotnetCachingPrompt,
  resolveDotnetDeployPrompt,
  resolveDotnetJobQueuePrompt,
  resolveDotnetLibrariesPrompt,
  resolveDotnetObservabilityPrompt,
  resolveDotnetOrmPrompt,
  resolveDotnetRealtimePrompt,
  resolveDotnetTestingPrompt,
  resolveDotnetWebFrameworkPrompt,
} from "@/prompts/ecosystems/dotnet-ecosystem";
import {
  resolveElixirApiPrompt,
  resolveElixirAuthPrompt,
  resolveElixirCachingPrompt,
  resolveElixirDeployPrompt,
  resolveElixirEmailPrompt,
  resolveElixirHttpPrompt,
  resolveElixirJobsPrompt,
  resolveElixirJsonPrompt,
  resolveElixirObservabilityPrompt,
  resolveElixirOrmPrompt,
  resolveElixirQualityPrompt,
  resolveElixirI18nPrompt,
  resolveElixirHttpServerPrompt,
  resolveElixirApplicationFrameworkPrompt,
  resolveElixirDocumentationPrompt,
  resolveElixirClusteringPrompt,
  resolveElixirLoggingPrompt,
  resolveElixirConfigPrompt,
  resolveElixirMessageQueuePrompt,
  resolveElixirTemplatingPrompt,
  resolveElixirCliPrompt,
  resolveElixirRealtimePrompt,
  resolveElixirTestingPrompt,
  resolveElixirValidationPrompt,
  resolveElixirWebFrameworkPrompt,
} from "@/prompts/ecosystems/elixir-ecosystem";
import {
  resolveGoApiPrompt,
  resolveGoAuthPrompt,
  resolveGoCliPrompt,
  resolveGoDIPrompt,
  resolveGoLoggingPrompt,
  resolveGoMigrationsPrompt,
  resolveGoOrmPrompt,
  resolveGoProtoToolingPrompt,
  resolveGoQualityPrompt,
  resolveGoTemplatingPrompt,
  resolveGoValidationPrompt,
  resolveGoWebFrameworkPrompt,
} from "@/prompts/ecosystems/go-ecosystem";
import {
  resolveJavaAuthPrompt,
  resolveJavaBuildToolPrompt,
  resolveJavaLibrariesPrompt,
  resolveJavaOrmPrompt,
  resolveJavaTestingLibrariesPrompt,
  resolveJavaWebFrameworkPrompt,
} from "@/prompts/ecosystems/java-ecosystem";
import {
  resolvePhpAuthPrompt,
  resolvePhpOrmPrompt,
  resolvePhpTestingPrompt,
  resolvePhpValidationPrompt,
  resolvePhpCachePrompt,
  resolvePhpJobQueuePrompt,
  resolvePhpEmailPrompt,
  resolvePhpLoggingPrompt,
  resolvePhpHttpClientPrompt,
  resolvePhpWebFrameworkPrompt,
} from "@/prompts/ecosystems/php-ecosystem";
import {
  resolvePythonAiPrompt,
  resolvePythonApiPrompt,
  resolvePythonAuthPrompt,
  resolvePythonCloudSdkPrompt,
  resolvePythonDataPrompt,
  resolvePythonGraphqlPrompt,
  resolvePythonHttpClientPrompt,
  resolvePythonMediaPrompt,
  resolvePythonMessageQueuePrompt,
  resolvePythonOrmPrompt,
  resolvePythonQualityPrompt,
  resolvePythonPackageManagerPrompt,
  resolvePythonServerPrompt,
  resolvePythonTaskQueuePrompt,
  resolvePythonValidationPrompt,
  resolvePythonWebFrameworkPrompt,
} from "@/prompts/ecosystems/python-ecosystem";
import {
  resolveRubyAuthPrompt,
  resolveRubyOrmPrompt,
  resolveRubyTestingPrompt,
  resolveRubyValidationPrompt,
  resolveRubyCachePrompt,
  resolveRubyJobQueuePrompt,
  resolveRubyEmailPrompt,
  resolveRubyLoggingPrompt,
  resolveRubyHttpClientPrompt,
  resolveRubyWebFrameworkPrompt,
} from "@/prompts/ecosystems/ruby-ecosystem";
import {
  resolveRustApiPrompt,
  resolveRustCachingPrompt,
  resolveRustCliPrompt,
  resolveRustErrorHandlingPrompt,
  resolveRustFrontendPrompt,
  resolveRustLibrariesPrompt,
  resolveRustLoggingPrompt,
  resolveRustOrmPrompt,
  resolveRustWebFrameworkPrompt,
} from "@/prompts/ecosystems/rust-ecosystem";
import { resolveAIPrompt } from "@/prompts/services/ai";
import { resolveAnimationPrompt } from "@/prompts/services/animation";
import { resolveAuthPrompt } from "@/prompts/services/auth";
import { resolveBotProtectionPrompt } from "@/prompts/services/bot-protection";
import { resolveCMSPrompt } from "@/prompts/services/cms";
import { resolveEmailPrompt } from "@/prompts/services/email";
import { resolveJobQueuePrompt } from "@/prompts/services/job-queue";
import { resolveLoggingPrompt } from "@/prompts/services/logging";
import { resolveObservabilityPrompt } from "@/prompts/services/observability";
import { resolvePaymentsPrompt } from "@/prompts/services/payments";
import { resolveRateLimitPrompt } from "@/prompts/services/rate-limit";
import { resolveRealtimePrompt } from "@/prompts/services/realtime";
import { resolveStateManagementPrompt } from "@/prompts/services/state-management";
import { resolveWebMcpPrompt } from "@/prompts/services/web-mcp";
import {
  AI_VALUES,
  ANIMATION_VALUES,
  API_VALUES,
  ASTRO_INTEGRATION_VALUES,
  AUTH_VALUES,
  BACKEND_VALUES,
  CACHING_VALUES,
  CMS_VALUES,
  CSS_FRAMEWORK_VALUES,
  DATABASE_SETUP_VALUES,
  DATABASE_VALUES,
  DOTNET_API_VALUES,
  DOTNET_AUTH_VALUES,
  DOTNET_CACHING_VALUES,
  DOTNET_DEPLOY_VALUES,
  DOTNET_JOB_QUEUE_VALUES,
  DOTNET_LIBRARIES_VALUES,
  DOTNET_OBSERVABILITY_VALUES,
  DOTNET_ORM_VALUES,
  DOTNET_REALTIME_VALUES,
  DOTNET_TESTING_VALUES,
  DOTNET_WEB_FRAMEWORK_VALUES,
  ELIXIR_API_VALUES,
  ELIXIR_AUTH_VALUES,
  ELIXIR_CACHING_VALUES,
  ELIXIR_DEPLOY_VALUES,
  ELIXIR_EMAIL_VALUES,
  ELIXIR_HTTP_VALUES,
  ELIXIR_JOBS_VALUES,
  ELIXIR_JSON_VALUES,
  ELIXIR_OBSERVABILITY_VALUES,
  ELIXIR_ORM_VALUES,
  ELIXIR_QUALITY_VALUES,
  ELIXIR_I18N_VALUES,
  ELIXIR_HTTP_SERVER_VALUES,
  ELIXIR_APPLICATION_FRAMEWORK_VALUES,
  ELIXIR_DOCUMENTATION_VALUES,
  ELIXIR_CLUSTERING_VALUES,
  ELIXIR_LOGGING_VALUES,
  ELIXIR_CONFIG_VALUES,
  ELIXIR_MESSAGE_QUEUE_VALUES,
  ELIXIR_TEMPLATING_VALUES,
  ELIXIR_CLI_VALUES,
  ELIXIR_REALTIME_VALUES,
  ELIXIR_TESTING_VALUES,
  ELIXIR_VALIDATION_VALUES,
  RUBY_WEB_FRAMEWORK_VALUES,
  RUBY_ORM_VALUES,
  RUBY_AUTH_VALUES,
  RUBY_TESTING_VALUES,
  RUBY_VALIDATION_VALUES,
  RUBY_CACHE_VALUES,
  RUBY_JOB_QUEUE_VALUES,
  RUBY_EMAIL_VALUES,
  RUBY_LOGGING_VALUES,
  RUBY_HTTP_CLIENT_VALUES,
  RubyAuthSchema,
  RubyOrmSchema,
  RubyTestingSchema,
  RubyValidationSchema,
  RubyCacheSchema,
  RubyJobQueueSchema,
  RubyEmailSchema,
  RubyLoggingSchema,
  RubyHttpClientSchema,
  RubyWebFrameworkSchema,
  ELIXIR_WEB_FRAMEWORK_VALUES,
  EMAIL_VALUES,
  FILE_UPLOAD_VALUES,
  FORMS_VALUES,
  FRONTEND_VALUES,
  MOBILE_DEEP_LINKING_VALUES,
  MOBILE_LIBRARIES_VALUES,
  MOBILE_NAVIGATION_VALUES,
  MOBILE_OTA_VALUES,
  MOBILE_PUSH_VALUES,
  MOBILE_STORAGE_VALUES,
  MOBILE_TESTING_VALUES,
  MOBILE_UI_VALUES,
  GO_API_VALUES,
  GO_AUTH_VALUES,
  GO_CLI_VALUES,
  GO_DI_VALUES,
  CRYSTAL_WEB_FRAMEWORK_VALUES,
  CRYSTAL_ORM_VALUES,
  CRYSTAL_AUTH_VALUES,
  CRYSTAL_TESTING_VALUES,
  CRYSTAL_VALIDATION_VALUES,
  CRYSTAL_CACHE_VALUES,
  CRYSTAL_JOBS_VALUES,
  GO_LOGGING_VALUES,
  GO_MIGRATIONS_VALUES,
  GO_ORM_VALUES,
  GO_PROTO_TOOLING_VALUES,
  GO_QUALITY_VALUES,
  GO_TEMPLATING_VALUES,
  GO_VALIDATION_VALUES,
  GO_WEB_FRAMEWORK_VALUES,
  JAVA_AUTH_VALUES,
  JAVA_BUILD_TOOL_VALUES,
  JAVA_LIBRARIES_VALUES,
  JAVA_ORM_VALUES,
  JAVA_TESTING_LIBRARIES_VALUES,
  JAVA_WEB_FRAMEWORK_VALUES,
  JOB_QUEUE_VALUES,
  LOGGING_VALUES,
  OBSERVABILITY_VALUES,
  ORM_VALUES,
  PAYMENTS_VALUES,
  PhpAuthSchema,
  PhpOrmSchema,
  PhpTestingSchema,
  PhpValidationSchema,
  PhpCacheSchema,
  PhpJobQueueSchema,
  PhpEmailSchema,
  PhpLoggingSchema,
  PhpHttpClientSchema,
  PhpWebFrameworkSchema,
  PYTHON_AI_VALUES,
  PYTHON_API_VALUES,
  PYTHON_AUTH_VALUES,
  PYTHON_CLOUD_SDK_VALUES,
  PYTHON_DATA_VALUES,
  PYTHON_GRAPHQL_VALUES,
  PYTHON_HTTP_CLIENT_VALUES,
  PYTHON_MEDIA_VALUES,
  PYTHON_MESSAGE_QUEUE_VALUES,
  PYTHON_ORM_VALUES,
  PYTHON_QUALITY_VALUES,
  PYTHON_PACKAGE_MANAGER_VALUES,
  PYTHON_SERVER_VALUES,
  PYTHON_TASK_QUEUE_VALUES,
  PYTHON_VALIDATION_VALUES,
  PYTHON_WEB_FRAMEWORK_VALUES,
  RATE_LIMIT_VALUES,
  BOT_PROTECTION_VALUES,
  REALTIME_VALUES,
  RUNTIME_VALUES,
  RUST_API_VALUES,
  RUST_CACHING_VALUES,
  RUST_CLI_VALUES,
  RUST_ERROR_HANDLING_VALUES,
  RUST_FRONTEND_VALUES,
  RUST_LIBRARIES_VALUES,
  RUST_LOGGING_VALUES,
  RUST_ORM_VALUES,
  RUST_WEB_FRAMEWORK_VALUES,
  STATE_MANAGEMENT_VALUES,
  TESTING_VALUES,
  UI_LIBRARY_VALUES,
  VALIDATION_VALUES,
  WEB_MCP_VALUES,
} from "@/types";

type SingleOrMultiValue = string | string[];

type PromptContractEntry<TValue extends SingleOrMultiValue, TContext = Record<string, never>> = {
  schemaValues: readonly string[];
  resolve: (context?: TContext) => PromptResolution<any>;
  coverageContexts: TContext[];
};

type ResolverRegistry = {
  [key: string]: PromptContractEntry<any, any>;
};

export const PROMPT_RESOLVER_REGISTRY: ResolverRegistry = {
  frontend: {
    schemaValues: FRONTEND_VALUES,
    resolve: resolveFrontendPrompt,
    coverageContexts: [{ backend: "hono" }, { frontendOptions: ["none"] }],
  },
  backend: {
    schemaValues: BACKEND_VALUES,
    resolve: resolveBackendPrompt,
    coverageContexts: [{ frontends: ["next"] }],
  },
  ai: {
    schemaValues: AI_VALUES,
    resolve: ({ value, backend }: { value?: string; backend?: string } = {}) =>
      resolveAIPrompt({ ai: value as any, backend: backend as any }),
    coverageContexts: [{ backend: "hono" }, { backend: "none" }],
  },
  animation: {
    schemaValues: ANIMATION_VALUES,
    resolve: resolveAnimationPrompt,
    coverageContexts: [{ frontends: ["react-vite"] }],
  },
  webMcp: {
    schemaValues: WEB_MCP_VALUES,
    resolve: resolveWebMcpPrompt,
    coverageContexts: [{ frontends: ["react-vite"] }, { frontends: ["none"] }],
  },
  api: {
    schemaValues: API_VALUES,
    resolve: resolveApiPrompt,
    coverageContexts: [{ frontend: ["next"], backend: "hono" }, { backend: "convex" }],
  },
  auth: {
    schemaValues: AUTH_VALUES,
    resolve: resolveAuthPrompt,
    coverageContexts: [
      { ecosystem: "typescript", backend: "self", frontend: ["next"] },
      { ecosystem: "typescript", backend: "express", frontend: ["react-vite"] },
      { ecosystem: "go", backend: "none", frontend: [] },
    ],
  },
  caching: {
    schemaValues: CACHING_VALUES,
    resolve: resolveCachingPrompt,
    coverageContexts: [{ backend: "hono" }, { backend: "none" }],
  },
  rateLimit: {
    schemaValues: RATE_LIMIT_VALUES,
    resolve: resolveRateLimitPrompt,
    coverageContexts: [{ backend: "hono" }, { backend: "none" }],
  },
  botProtection: {
    schemaValues: BOT_PROTECTION_VALUES,
    resolve: resolveBotProtectionPrompt,
    coverageContexts: [
      {
        frontends: ["next"],
        auth: "better-auth",
        backend: "self",
        webDeploy: "vercel",
      },
      {
        frontends: ["react-vite"],
        auth: "better-auth",
        backend: "hono",
        webDeploy: "none",
      },
      { frontends: [] },
    ],
  },
  cms: {
    schemaValues: CMS_VALUES,
    resolve: resolveCMSPrompt,
    coverageContexts: [
      { backend: "hono" },
      { backend: "none", frontends: ["vue"] },
      { backend: "none", frontends: [] },
    ],
  },
  cssFramework: {
    schemaValues: CSS_FRAMEWORK_VALUES,
    resolve: resolveCSSFrameworkPrompt,
    coverageContexts: [
      { frontends: ["react-vite"] },
      { uiLibrary: "none", frontends: ["vue"] },
      { uiLibrary: "radix-ui", frontends: ["react-vite"] },
    ],
  },
  database: {
    schemaValues: DATABASE_VALUES,
    resolve: resolveDatabasePrompt,
    coverageContexts: [{ backend: "hono", runtime: "node" }, { backend: "none" }],
  },
  dbSetup: {
    schemaValues: DATABASE_SETUP_VALUES,
    resolve: resolveDBSetupPrompt,
    coverageContexts: [
      { databaseType: "sqlite", runtime: "workers" },
      { databaseType: "postgres" },
      { databaseType: "mongodb" },
      { databaseType: "redis" },
    ],
  },
  email: {
    schemaValues: EMAIL_VALUES,
    resolve: resolveEmailPrompt,
    coverageContexts: [{ backend: "hono" }, { backend: "none" }],
  },
  fileUpload: {
    schemaValues: FILE_UPLOAD_VALUES,
    resolve: resolveFileUploadPrompt,
    coverageContexts: [{ backend: "hono" }, { backend: "none" }],
  },
  forms: {
    schemaValues: FORMS_VALUES,
    resolve: resolveFormsPrompt,
    coverageContexts: [{ frontends: ["react-vite"] }, { frontends: ["solid"] }],
  },
  jobQueue: {
    schemaValues: JOB_QUEUE_VALUES,
    resolve: resolveJobQueuePrompt,
    coverageContexts: [
      { backend: "hono", runtime: "bun", database: "postgres" },
      { backend: "none" },
    ],
  },
  logging: {
    schemaValues: LOGGING_VALUES,
    resolve: resolveLoggingPrompt,
    coverageContexts: [{ backend: "hono" }, { backend: "none" }],
  },
  observability: {
    schemaValues: OBSERVABILITY_VALUES,
    resolve: resolveObservabilityPrompt,
    coverageContexts: [{ backend: "hono" }, { backend: "none" }],
  },
  orm: {
    schemaValues: ORM_VALUES,
    resolve: resolveORMPrompt,
    coverageContexts: [
      { hasDatabase: true, database: "postgres", runtime: "node" },
      { hasDatabase: true, database: "mongodb" },
      { hasDatabase: false },
    ],
  },
  payments: {
    schemaValues: PAYMENTS_VALUES,
    resolve: resolvePaymentsPrompt,
    coverageContexts: [
      { auth: "better-auth", backend: "hono", frontends: ["next"] },
      { auth: "better-auth", backend: "hono", frontends: ["native-bare"] },
    ],
  },
  realtime: {
    schemaValues: REALTIME_VALUES,
    resolve: resolveRealtimePrompt,
    coverageContexts: [{ backend: "express" }, { backend: "hono" }, { backend: "none" }],
  },
  runtime: {
    schemaValues: RUNTIME_VALUES,
    resolve: resolveRuntimePrompt,
    coverageContexts: [{ backend: "hono" }, { backend: "self" }],
  },
  stateManagement: {
    schemaValues: STATE_MANAGEMENT_VALUES,
    resolve: resolveStateManagementPrompt,
    coverageContexts: [{ frontends: ["react-vite"] }],
  },
  testing: {
    schemaValues: TESTING_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveTestingPrompt(value as any),
    coverageContexts: [{}],
  },
  mobileNavigation: {
    schemaValues: MOBILE_NAVIGATION_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveMobileNavigationPrompt(value as any),
    coverageContexts: [{}],
  },
  mobileUI: {
    schemaValues: MOBILE_UI_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveMobileUIPrompt(value as any),
    coverageContexts: [{}],
  },
  mobileStorage: {
    schemaValues: MOBILE_STORAGE_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveMobileStoragePrompt(value as any),
    coverageContexts: [{}],
  },
  mobileTesting: {
    schemaValues: MOBILE_TESTING_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveMobileTestingPrompt(value as any),
    coverageContexts: [{}],
  },
  mobilePush: {
    schemaValues: MOBILE_PUSH_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveMobilePushPrompt(value as any),
    coverageContexts: [{}],
  },
  mobileOTA: {
    schemaValues: MOBILE_OTA_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveMobileOTAPrompt(value as any),
    coverageContexts: [{}],
  },
  mobileDeepLinking: {
    schemaValues: MOBILE_DEEP_LINKING_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveMobileDeepLinkingPrompt(value as any),
    coverageContexts: [{}],
  },
  mobileLibraries: {
    schemaValues: MOBILE_LIBRARIES_VALUES,
    resolve: ({ value }: { value?: string[] } = {}) => resolveMobileLibrariesPrompt(value as any),
    coverageContexts: [{}, { value: ["none"] }],
  },
  uiLibrary: {
    schemaValues: UI_LIBRARY_VALUES,
    resolve: resolveUILibraryPrompt,
    coverageContexts: [
      { frontends: ["react-vite"] },
      { frontends: ["svelte"] },
      { frontends: ["solid"] },
      { frontends: ["vue"] },
    ],
  },
  validation: {
    schemaValues: VALIDATION_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveValidationPrompt(value as any),
    coverageContexts: [{}],
  },
  astroIntegration: {
    schemaValues: ASTRO_INTEGRATION_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveAstroIntegrationPrompt(value as any),
    coverageContexts: [{}],
  },
  rustWebFramework: {
    schemaValues: RUST_WEB_FRAMEWORK_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveRustWebFrameworkPrompt(value as any),
    coverageContexts: [{}],
  },
  rustFrontend: {
    schemaValues: RUST_FRONTEND_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveRustFrontendPrompt(value as any),
    coverageContexts: [{}],
  },
  rustOrm: {
    schemaValues: RUST_ORM_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveRustOrmPrompt(value as any),
    coverageContexts: [{}],
  },
  rustApi: {
    schemaValues: RUST_API_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveRustApiPrompt(value as any),
    coverageContexts: [{}],
  },
  rustCli: {
    schemaValues: RUST_CLI_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveRustCliPrompt(value as any),
    coverageContexts: [{}],
  },
  rustLogging: {
    schemaValues: RUST_LOGGING_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveRustLoggingPrompt(value as any),
    coverageContexts: [{}],
  },
  rustErrorHandling: {
    schemaValues: RUST_ERROR_HANDLING_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveRustErrorHandlingPrompt(value as any),
    coverageContexts: [{}],
  },
  rustLibraries: {
    schemaValues: RUST_LIBRARIES_VALUES,
    resolve: ({ value }: { value?: string[] } = {}) => resolveRustLibrariesPrompt(value as any),
    coverageContexts: [{}, { value: ["none"] }],
  },
  rustCaching: {
    schemaValues: RUST_CACHING_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveRustCachingPrompt(value as any),
    coverageContexts: [{}],
  },
  pythonWebFramework: {
    schemaValues: PYTHON_WEB_FRAMEWORK_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolvePythonWebFrameworkPrompt(value as any),
    coverageContexts: [{}],
  },
  pythonOrm: {
    schemaValues: PYTHON_ORM_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolvePythonOrmPrompt(value as any),
    coverageContexts: [{}],
  },
  pythonValidation: {
    schemaValues: PYTHON_VALIDATION_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolvePythonValidationPrompt(value as any),
    coverageContexts: [{}],
  },
  pythonAi: {
    schemaValues: PYTHON_AI_VALUES,
    resolve: ({ value }: { value?: string[] } = {}) => resolvePythonAiPrompt(value as any),
    coverageContexts: [{}, { value: ["none"] }],
  },
  pythonAuth: {
    schemaValues: PYTHON_AUTH_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolvePythonAuthPrompt(value as any),
    coverageContexts: [{}],
  },
  pythonApi: {
    schemaValues: PYTHON_API_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolvePythonApiPrompt(value as any),
    coverageContexts: [{}],
  },
  pythonTaskQueue: {
    schemaValues: PYTHON_TASK_QUEUE_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolvePythonTaskQueuePrompt(value as any),
    coverageContexts: [{}],
  },
  pythonGraphql: {
    schemaValues: PYTHON_GRAPHQL_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolvePythonGraphqlPrompt(value as any),
    coverageContexts: [{}],
  },
  pythonQuality: {
    schemaValues: PYTHON_QUALITY_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolvePythonQualityPrompt(value as any),
    coverageContexts: [{}],
  },
  pythonCloudSdk: {
    schemaValues: PYTHON_CLOUD_SDK_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolvePythonCloudSdkPrompt(value as any),
    coverageContexts: [{}],
  },
  pythonHttpClient: {
    schemaValues: PYTHON_HTTP_CLIENT_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolvePythonHttpClientPrompt(value as any),
    coverageContexts: [{}],
  },
  pythonData: {
    schemaValues: PYTHON_DATA_VALUES,
    resolve: ({ value }: { value?: string[] } = {}) => resolvePythonDataPrompt(value as any),
    coverageContexts: [{}, { value: ["none"] }],
  },
  pythonMedia: {
    schemaValues: PYTHON_MEDIA_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolvePythonMediaPrompt(value as any),
    coverageContexts: [{}],
  },
  pythonServer: {
    schemaValues: PYTHON_SERVER_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolvePythonServerPrompt(value as any),
    coverageContexts: [{}],
  },
  pythonPackageManager: {
    schemaValues: PYTHON_PACKAGE_MANAGER_VALUES,
    resolve: ({ value }: { value?: string } = {}) =>
      resolvePythonPackageManagerPrompt(value as any),
    coverageContexts: [{}],
  },
  pythonMessageQueue: {
    schemaValues: PYTHON_MESSAGE_QUEUE_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolvePythonMessageQueuePrompt(value as any),
    coverageContexts: [{}],
  },
  goWebFramework: {
    schemaValues: GO_WEB_FRAMEWORK_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveGoWebFrameworkPrompt(value as any),
    coverageContexts: [{}],
  },
  goOrm: {
    schemaValues: GO_ORM_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveGoOrmPrompt(value as any),
    coverageContexts: [{}],
  },
  goApi: {
    schemaValues: GO_API_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveGoApiPrompt(value as any),
    coverageContexts: [{}],
  },
  goCli: {
    schemaValues: GO_CLI_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveGoCliPrompt(value as any),
    coverageContexts: [{}],
  },
  goLogging: {
    schemaValues: GO_LOGGING_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveGoLoggingPrompt(value as any),
    coverageContexts: [{}],
  },
  goAuth: {
    schemaValues: GO_AUTH_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveGoAuthPrompt(value as any),
    coverageContexts: [{}],
  },
  goValidation: {
    schemaValues: GO_VALIDATION_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveGoValidationPrompt(value as any),
    coverageContexts: [{}],
  },
  goQuality: {
    schemaValues: GO_QUALITY_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveGoQualityPrompt(value as any),
    coverageContexts: [{}],
  },
  goMigrations: {
    schemaValues: GO_MIGRATIONS_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveGoMigrationsPrompt(value as any),
    coverageContexts: [{}],
  },
  goTemplating: {
    schemaValues: GO_TEMPLATING_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveGoTemplatingPrompt(value as any),
    coverageContexts: [{}],
  },
  goProtoTooling: {
    schemaValues: GO_PROTO_TOOLING_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveGoProtoToolingPrompt(value as any),
    coverageContexts: [{}],
  },
  goDI: {
    schemaValues: GO_DI_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveGoDIPrompt(value as any),
    coverageContexts: [{}],
  },
  crystalWebFramework: {
    schemaValues: CRYSTAL_WEB_FRAMEWORK_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveCrystalWebFrameworkPrompt(value),
    coverageContexts: [{}],
  },
  crystalOrm: {
    schemaValues: CRYSTAL_ORM_VALUES,
    resolve: ({ value, ...selection }: { value?: string } & CrystalSelection = {}) =>
      resolveCrystalOrmPrompt(value, selection),
    coverageContexts: [{ crystalWebFramework: "kemal" }, { crystalWebFramework: "lucky" }, { crystalWebFramework: "marten" }],
  },
  crystalAuth: {
    schemaValues: CRYSTAL_AUTH_VALUES,
    resolve: ({ value, ...selection }: { value?: string } & CrystalSelection = {}) =>
      resolveCrystalAuthPrompt(value, selection),
    coverageContexts: [{ crystalWebFramework: "kemal" }, { crystalWebFramework: "lucky" }, { crystalWebFramework: "marten", crystalOrm: "marten-orm" }],
  },
  crystalTesting: {
    schemaValues: CRYSTAL_TESTING_VALUES,
    resolve: ({ value, ...selection }: { value?: string } & CrystalSelection = {}) =>
      resolveCrystalTestingPrompt(value, selection),
    coverageContexts: [{ crystalWebFramework: "kemal" }, { crystalWebFramework: "lucky" }],
  },
  crystalValidation: {
    schemaValues: CRYSTAL_VALIDATION_VALUES,
    resolve: ({ value, ...selection }: { value?: string } & CrystalSelection = {}) =>
      resolveCrystalValidationPrompt(value, selection),
    coverageContexts: [{ crystalWebFramework: "kemal" }, { crystalWebFramework: "marten" }],
  },
  crystalCache: {
    schemaValues: CRYSTAL_CACHE_VALUES,
    resolve: ({ value, ...selection }: { value?: string } & CrystalSelection = {}) =>
      resolveCrystalCachePrompt(value, selection),
    coverageContexts: [{ crystalWebFramework: "kemal" }],
  },
  crystalJobs: {
    schemaValues: CRYSTAL_JOBS_VALUES,
    resolve: ({ value, ...selection }: { value?: string } & CrystalSelection = {}) =>
      resolveCrystalJobsPrompt(value, selection),
    coverageContexts: [{ crystalWebFramework: "kemal" }],
  },
  javaWebFramework: {
    schemaValues: JAVA_WEB_FRAMEWORK_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveJavaWebFrameworkPrompt(value as any),
    coverageContexts: [{}],
  },
  javaBuildTool: {
    schemaValues: JAVA_BUILD_TOOL_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveJavaBuildToolPrompt(value as any),
    coverageContexts: [{}],
  },
  javaOrm: {
    schemaValues: JAVA_ORM_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveJavaOrmPrompt(value as any),
    coverageContexts: [{}],
  },
  javaAuth: {
    schemaValues: JAVA_AUTH_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveJavaAuthPrompt(value as any),
    coverageContexts: [{}],
  },
  javaLibraries: {
    schemaValues: JAVA_LIBRARIES_VALUES,
    resolve: ({ value }: { value?: string[] } = {}) => resolveJavaLibrariesPrompt(value as any),
    coverageContexts: [{}, { value: ["none"] }],
  },
  javaTestingLibraries: {
    schemaValues: JAVA_TESTING_LIBRARIES_VALUES,
    resolve: ({ value }: { value?: string[] } = {}) =>
      resolveJavaTestingLibrariesPrompt(value as any),
    coverageContexts: [{}, { value: ["none"] }],
  },
  dotnetWebFramework: {
    schemaValues: DOTNET_WEB_FRAMEWORK_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveDotnetWebFrameworkPrompt(value as any),
    coverageContexts: [{}],
  },
  dotnetOrm: {
    schemaValues: DOTNET_ORM_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveDotnetOrmPrompt(value as any),
    coverageContexts: [{}],
  },
  dotnetAuth: {
    schemaValues: DOTNET_AUTH_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveDotnetAuthPrompt(value as any),
    coverageContexts: [{}],
  },
  dotnetApi: {
    schemaValues: DOTNET_API_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveDotnetApiPrompt(value as any),
    coverageContexts: [{}],
  },
  dotnetTesting: {
    schemaValues: DOTNET_TESTING_VALUES,
    resolve: ({ value }: { value?: string[] } = {}) => resolveDotnetTestingPrompt(value as any),
    coverageContexts: [{}, { value: ["none"] }],
  },
  dotnetJobQueue: {
    schemaValues: DOTNET_JOB_QUEUE_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveDotnetJobQueuePrompt(value as any),
    coverageContexts: [{}],
  },
  dotnetRealtime: {
    schemaValues: DOTNET_REALTIME_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveDotnetRealtimePrompt(value as any),
    coverageContexts: [{}],
  },
  dotnetObservability: {
    schemaValues: DOTNET_OBSERVABILITY_VALUES,
    resolve: ({ value }: { value?: string[] } = {}) =>
      resolveDotnetObservabilityPrompt(value as any),
    coverageContexts: [{}, { value: ["none"] }],
  },
  dotnetCaching: {
    schemaValues: DOTNET_CACHING_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveDotnetCachingPrompt(value as any),
    coverageContexts: [{}],
  },
  dotnetDeploy: {
    schemaValues: DOTNET_DEPLOY_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveDotnetDeployPrompt(value as any),
    coverageContexts: [{}],
  },
  dotnetLibraries: {
    schemaValues: DOTNET_LIBRARIES_VALUES,
    resolve: ({ value }: { value?: string[] } = {}) => resolveDotnetLibrariesPrompt(value as any),
    coverageContexts: [{}, { value: ["none"] }],
  },
  rubyWebFramework: {
    schemaValues: RUBY_WEB_FRAMEWORK_VALUES,
    resolve: ({ value, allowNone }: { value?: string; allowNone?: boolean } = {}) =>
      resolveRubyWebFrameworkPrompt(
        value === undefined ? undefined : RubyWebFrameworkSchema.parse(value),
        allowNone,
      ),
    coverageContexts: [{}, { allowNone: true }],
  },
  rubyOrm: {
    schemaValues: RUBY_ORM_VALUES,
    resolve: ({ value }: { value?: string } = {}) =>
      resolveRubyOrmPrompt(value === undefined ? undefined : RubyOrmSchema.parse(value)),
    coverageContexts: [{}],
  },
  rubyAuth: {
    schemaValues: RUBY_AUTH_VALUES,
    resolve: ({ value }: { value?: string } = {}) =>
      resolveRubyAuthPrompt(value === undefined ? undefined : RubyAuthSchema.parse(value)),
    coverageContexts: [{}],
  },
  rubyTesting: {
    schemaValues: RUBY_TESTING_VALUES,
    resolve: ({ value }: { value?: string } = {}) =>
      resolveRubyTestingPrompt(value === undefined ? undefined : RubyTestingSchema.parse(value)),
    coverageContexts: [{}],
  },
  rubyValidation: {
    schemaValues: RUBY_VALIDATION_VALUES,
    resolve: ({ value }: { value?: string } = {}) =>
      resolveRubyValidationPrompt(
        value === undefined ? undefined : RubyValidationSchema.parse(value),
      ),
    coverageContexts: [{}],
  },
  rubyCache: {
    schemaValues: RUBY_CACHE_VALUES,
    resolve: ({ value }: { value?: string } = {}) =>
      resolveRubyCachePrompt(value === undefined ? undefined : RubyCacheSchema.parse(value)),
    coverageContexts: [{}],
  },
  rubyJobQueue: {
    schemaValues: RUBY_JOB_QUEUE_VALUES,
    coverageContexts: [{}, { rubyWebFramework: "rails", rubyOrm: "active-record" }],
    resolve: ({
      value,
      rubyWebFramework,
      rubyOrm,
    }: { value?: string; rubyWebFramework?: string; rubyOrm?: string } = {}) =>
      resolveRubyJobQueuePrompt(
        value === undefined ? undefined : RubyJobQueueSchema.parse(value),
        rubyWebFramework === undefined ? undefined : RubyWebFrameworkSchema.parse(rubyWebFramework),
        rubyOrm === undefined ? undefined : RubyOrmSchema.parse(rubyOrm),
      ),
  },
  rubyEmail: {
    schemaValues: RUBY_EMAIL_VALUES,
    coverageContexts: [{}, { rubyWebFramework: "rails" }],
    resolve: ({ value, rubyWebFramework }: { value?: string; rubyWebFramework?: string } = {}) =>
      resolveRubyEmailPrompt(
        value === undefined ? undefined : RubyEmailSchema.parse(value),
        rubyWebFramework === undefined ? undefined : RubyWebFrameworkSchema.parse(rubyWebFramework),
      ),
  },
  rubyLogging: {
    schemaValues: RUBY_LOGGING_VALUES,
    coverageContexts: [{}, { rubyWebFramework: "rails" }],
    resolve: ({ value, rubyWebFramework }: { value?: string; rubyWebFramework?: string } = {}) =>
      resolveRubyLoggingPrompt(
        value === undefined ? undefined : RubyLoggingSchema.parse(value),
        rubyWebFramework === undefined ? undefined : RubyWebFrameworkSchema.parse(rubyWebFramework),
      ),
  },
  rubyHttpClient: {
    schemaValues: RUBY_HTTP_CLIENT_VALUES,
    resolve: ({ value }: { value?: string } = {}) =>
      resolveRubyHttpClientPrompt(value === undefined ? undefined : RubyHttpClientSchema.parse(value)),
    coverageContexts: [{}],
  },
  phpWebFramework: {
    schemaValues: PhpWebFrameworkSchema.options,
    coverageContexts: [{}],
    resolve: ({ value }: { value?: string } = {}) =>
      resolvePhpWebFrameworkPrompt(
        value === undefined ? undefined : PhpWebFrameworkSchema.parse(value),
      ),
  },
  phpOrm: {
    schemaValues: PhpOrmSchema.options,
    coverageContexts: [{}, { phpWebFramework: "laravel" }, { phpWebFramework: "symfony" }],
    resolve: ({ value, phpWebFramework }: { value?: string; phpWebFramework?: string } = {}) =>
      resolvePhpOrmPrompt(
        value === undefined ? undefined : PhpOrmSchema.parse(value),
        phpWebFramework === undefined ? undefined : PhpWebFrameworkSchema.parse(phpWebFramework),
      ),
  },
  phpTesting: {
    schemaValues: PhpTestingSchema.options,
    coverageContexts: [{}],
    resolve: ({ value }: { value?: string } = {}) =>
      resolvePhpTestingPrompt(value === undefined ? undefined : PhpTestingSchema.parse(value)),
  },
  phpAuth: {
    schemaValues: PhpAuthSchema.options,
    coverageContexts: [{}, { phpWebFramework: "slim" }, { phpWebFramework: "symfony" }],
    resolve: ({ value, phpWebFramework }: { value?: string; phpWebFramework?: string } = {}) =>
      resolvePhpAuthPrompt(
        value === undefined ? undefined : PhpAuthSchema.parse(value),
        phpWebFramework === undefined ? undefined : PhpWebFrameworkSchema.parse(phpWebFramework),
      ),
  },
  phpValidation: {
    schemaValues: PhpValidationSchema.options,
    coverageContexts: [
      {},
      { phpWebFramework: "slim" },
      { phpWebFramework: "laravel" },
      { phpWebFramework: "symfony" },
    ],
    resolve: ({ value, phpWebFramework }: { value?: string; phpWebFramework?: string } = {}) =>
      resolvePhpValidationPrompt(
        value === undefined ? undefined : PhpValidationSchema.parse(value),
        phpWebFramework === undefined ? undefined : PhpWebFrameworkSchema.parse(phpWebFramework),
      ),
  },
  phpCache: {
    schemaValues: PhpCacheSchema.options,
    coverageContexts: [
      {},
      { phpWebFramework: "slim" },
      { phpWebFramework: "laravel" },
      { phpWebFramework: "symfony" },
    ],
    resolve: ({ value, phpWebFramework }: { value?: string; phpWebFramework?: string } = {}) =>
      resolvePhpCachePrompt(
        value === undefined ? undefined : PhpCacheSchema.parse(value),
        phpWebFramework === undefined ? undefined : PhpWebFrameworkSchema.parse(phpWebFramework),
      ),
  },
  phpJobQueue: {
    schemaValues: PhpJobQueueSchema.options,
    coverageContexts: [
      {},
      { phpWebFramework: "slim" },
      { phpWebFramework: "laravel" },
      { phpWebFramework: "symfony" },
    ],
    resolve: ({ value, phpWebFramework }: { value?: string; phpWebFramework?: string } = {}) =>
      resolvePhpJobQueuePrompt(
        value === undefined ? undefined : PhpJobQueueSchema.parse(value),
        phpWebFramework === undefined ? undefined : PhpWebFrameworkSchema.parse(phpWebFramework),
      ),
  },
  phpEmail: {
    schemaValues: PhpEmailSchema.options,
    coverageContexts: [
      {},
      { phpWebFramework: "slim" },
      { phpWebFramework: "laravel" },
      { phpWebFramework: "symfony" },
    ],
    resolve: ({ value, phpWebFramework }: { value?: string; phpWebFramework?: string } = {}) =>
      resolvePhpEmailPrompt(
        value === undefined ? undefined : PhpEmailSchema.parse(value),
        phpWebFramework === undefined ? undefined : PhpWebFrameworkSchema.parse(phpWebFramework),
      ),
  },
  phpLogging: {
    schemaValues: PhpLoggingSchema.options,
    coverageContexts: [
      {},
      { phpWebFramework: "slim" },
      { phpWebFramework: "laravel" },
      { phpWebFramework: "symfony" },
    ],
    resolve: ({ value, phpWebFramework }: { value?: string; phpWebFramework?: string } = {}) =>
      resolvePhpLoggingPrompt(
        value === undefined ? undefined : PhpLoggingSchema.parse(value),
        phpWebFramework === undefined ? undefined : PhpWebFrameworkSchema.parse(phpWebFramework),
      ),
  },
  phpHttpClient: {
    schemaValues: PhpHttpClientSchema.options,
    coverageContexts: [
      {},
      { phpWebFramework: "slim" },
      { phpWebFramework: "laravel" },
      { phpWebFramework: "symfony" },
    ],
    resolve: ({ value, phpWebFramework }: { value?: string; phpWebFramework?: string } = {}) =>
      resolvePhpHttpClientPrompt(
        value === undefined ? undefined : PhpHttpClientSchema.parse(value),
        phpWebFramework === undefined ? undefined : PhpWebFrameworkSchema.parse(phpWebFramework),
      ),
  },
  elixirWebFramework: {
    schemaValues: ELIXIR_WEB_FRAMEWORK_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveElixirWebFrameworkPrompt(value as any),
    coverageContexts: [{}],
  },
  elixirOrm: {
    schemaValues: ELIXIR_ORM_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveElixirOrmPrompt(value as any),
    coverageContexts: [{}],
  },
  elixirAuth: {
    schemaValues: ELIXIR_AUTH_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveElixirAuthPrompt(value as any),
    coverageContexts: [{}],
  },
  elixirApi: {
    schemaValues: ELIXIR_API_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveElixirApiPrompt(value as any),
    coverageContexts: [{}],
  },
  elixirRealtime: {
    schemaValues: ELIXIR_REALTIME_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveElixirRealtimePrompt(value as any),
    coverageContexts: [{}],
  },
  elixirJobs: {
    schemaValues: ELIXIR_JOBS_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveElixirJobsPrompt(value as any),
    coverageContexts: [{}],
  },
  elixirValidation: {
    schemaValues: ELIXIR_VALIDATION_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveElixirValidationPrompt(value as any),
    coverageContexts: [{}],
  },
  elixirHttp: {
    schemaValues: ELIXIR_HTTP_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveElixirHttpPrompt(value as any),
    coverageContexts: [{}],
  },
  elixirJson: {
    schemaValues: ELIXIR_JSON_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveElixirJsonPrompt(value as any),
    coverageContexts: [{}],
  },
  elixirEmail: {
    schemaValues: ELIXIR_EMAIL_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveElixirEmailPrompt(value as any),
    coverageContexts: [{}],
  },
  elixirCaching: {
    schemaValues: ELIXIR_CACHING_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveElixirCachingPrompt(value as any),
    coverageContexts: [{}],
  },
  elixirObservability: {
    schemaValues: ELIXIR_OBSERVABILITY_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveElixirObservabilityPrompt(value as any),
    coverageContexts: [{}],
  },
  elixirTesting: {
    schemaValues: ELIXIR_TESTING_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveElixirTestingPrompt(value as any),
    coverageContexts: [{}],
  },
  elixirQuality: {
    schemaValues: ELIXIR_QUALITY_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveElixirQualityPrompt(value as any),
    coverageContexts: [{}],
  },
  elixirI18n: {
    schemaValues: ELIXIR_I18N_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveElixirI18nPrompt(value as any),
    coverageContexts: [{}],
  },
  elixirHttpServer: {
    schemaValues: ELIXIR_HTTP_SERVER_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveElixirHttpServerPrompt(value as any),
    coverageContexts: [{}],
  },
  elixirApplicationFramework: {
    schemaValues: ELIXIR_APPLICATION_FRAMEWORK_VALUES,
    resolve: ({ value }: { value?: string } = {}) =>
      resolveElixirApplicationFrameworkPrompt(value as any),
    coverageContexts: [{}],
  },
  elixirDocumentation: {
    schemaValues: ELIXIR_DOCUMENTATION_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveElixirDocumentationPrompt(value as any),
    coverageContexts: [{}],
  },
  elixirClustering: {
    schemaValues: ELIXIR_CLUSTERING_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveElixirClusteringPrompt(value as any),
    coverageContexts: [{}],
  },
  elixirLogging: {
    schemaValues: ELIXIR_LOGGING_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveElixirLoggingPrompt(value),
    coverageContexts: [{}],
  },
  elixirConfig: {
    schemaValues: ELIXIR_CONFIG_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveElixirConfigPrompt(value),
    coverageContexts: [{}],
  },
  elixirMessageQueue: {
    schemaValues: ELIXIR_MESSAGE_QUEUE_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveElixirMessageQueuePrompt(value),
    coverageContexts: [{}],
  },
  elixirTemplating: {
    schemaValues: ELIXIR_TEMPLATING_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveElixirTemplatingPrompt(value),
    coverageContexts: [{}],
  },
  elixirCli: {
    schemaValues: ELIXIR_CLI_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveElixirCliPrompt(value),
    coverageContexts: [{}],
  },
  elixirDeploy: {
    schemaValues: ELIXIR_DEPLOY_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveElixirDeployPrompt(value as any),
    coverageContexts: [{}],
  },
};
