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
  ELIXIR_REALTIME_VALUES,
  ELIXIR_TESTING_VALUES,
  ELIXIR_VALIDATION_VALUES,
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
} from "../types";
import { resolveAIPrompt } from "./ai";
import { resolveAnimationPrompt } from "./animation";
import { resolveApiPrompt } from "./api";
import { resolveAstroIntegrationPrompt } from "./astro-integration";
import { resolveAuthPrompt } from "./auth";
import { resolveBackendPrompt } from "./backend";
import { resolveBotProtectionPrompt } from "./bot-protection";
import { resolveCachingPrompt } from "./caching";
import { resolveCMSPrompt } from "./cms";
import { resolveCSSFrameworkPrompt } from "./css-framework";
import { resolveDatabasePrompt } from "./database";
import { resolveDBSetupPrompt } from "./database-setup";
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
} from "./dotnet-ecosystem";
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
  resolveElixirRealtimePrompt,
  resolveElixirTestingPrompt,
  resolveElixirValidationPrompt,
  resolveElixirWebFrameworkPrompt,
} from "./elixir-ecosystem";
import { resolveEmailPrompt } from "./email";
import { resolveFileUploadPrompt } from "./file-upload";
import { resolveFormsPrompt } from "./forms";
import { resolveFrontendPrompt } from "./frontend";
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
} from "./go-ecosystem";
import {
  resolveJavaAuthPrompt,
  resolveJavaBuildToolPrompt,
  resolveJavaLibrariesPrompt,
  resolveJavaOrmPrompt,
  resolveJavaTestingLibrariesPrompt,
  resolveJavaWebFrameworkPrompt,
} from "./java-ecosystem";
import { resolveJobQueuePrompt } from "./job-queue";
import { resolveLoggingPrompt } from "./logging";
import {
  resolveMobileDeepLinkingPrompt,
  resolveMobileLibrariesPrompt,
  resolveMobileNavigationPrompt,
  resolveMobileOTAPrompt,
  resolveMobilePushPrompt,
  resolveMobileStoragePrompt,
  resolveMobileTestingPrompt,
  resolveMobileUIPrompt,
} from "./mobile";
import { resolveObservabilityPrompt } from "./observability";
import { resolveORMPrompt } from "./orm";
import { resolvePaymentsPrompt } from "./payments";
import { type PromptResolution } from "./prompt-contract";
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
} from "./python-ecosystem";
import { resolveRateLimitPrompt } from "./rate-limit";
import { resolveRealtimePrompt } from "./realtime";
import { resolveRuntimePrompt } from "./runtime";
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
} from "./rust-ecosystem";
import { resolveStateManagementPrompt } from "./state-management";
import { resolveTestingPrompt } from "./testing";
import { resolveUILibraryPrompt } from "./ui-library";
import { resolveValidationPrompt } from "./validation";

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
    coverageContexts: [{ backend: "hono" }, { backend: "none" }],
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
  elixirDeploy: {
    schemaValues: ELIXIR_DEPLOY_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolveElixirDeployPrompt(value as any),
    coverageContexts: [{}],
  },
};
