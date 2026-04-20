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
  EMAIL_VALUES,
  FILE_UPLOAD_VALUES,
  FORMS_VALUES,
  FRONTEND_VALUES,
  GO_API_VALUES,
  GO_AUTH_VALUES,
  GO_CLI_VALUES,
  GO_LOGGING_VALUES,
  GO_ORM_VALUES,
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
  PYTHON_AUTH_VALUES,
  PYTHON_GRAPHQL_VALUES,
  PYTHON_ORM_VALUES,
  PYTHON_QUALITY_VALUES,
  PYTHON_TASK_QUEUE_VALUES,
  PYTHON_VALIDATION_VALUES,
  PYTHON_WEB_FRAMEWORK_VALUES,
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
import { resolveCachingPrompt } from "./caching";
import { resolveCMSPrompt } from "./cms";
import { resolveCSSFrameworkPrompt } from "./css-framework";
import { resolveDatabasePrompt } from "./database";
import { resolveDBSetupPrompt } from "./database-setup";
import { resolveEmailPrompt } from "./email";
import { resolveFileUploadPrompt } from "./file-upload";
import { resolveFrontendPrompt } from "./frontend";
import { resolveFormsPrompt } from "./forms";
import {
  resolveGoApiPrompt,
  resolveGoAuthPrompt,
  resolveGoCliPrompt,
  resolveGoLoggingPrompt,
  resolveGoOrmPrompt,
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
import { resolveObservabilityPrompt } from "./observability";
import { resolveORMPrompt } from "./orm";
import { resolvePaymentsPrompt } from "./payments";
import { type PromptResolution } from "./prompt-contract";
import {
  resolvePythonAiPrompt,
  resolvePythonAuthPrompt,
  resolvePythonGraphqlPrompt,
  resolvePythonOrmPrompt,
  resolvePythonQualityPrompt,
  resolvePythonTaskQueuePrompt,
  resolvePythonValidationPrompt,
  resolvePythonWebFrameworkPrompt,
} from "./python-ecosystem";
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
    resolve: ({ value }: { value?: string } = {}) => resolveAIPrompt(value as any),
    coverageContexts: [{}],
  },
  animation: {
    schemaValues: ANIMATION_VALUES,
    resolve: resolveAnimationPrompt,
    coverageContexts: [{ frontends: ["react-vite"] }],
  },
  api: {
    schemaValues: API_VALUES,
    resolve: resolveApiPrompt,
    coverageContexts: [
      { frontend: ["next"], backend: "hono" },
      { backend: "convex" },
    ],
  },
  auth: {
    schemaValues: AUTH_VALUES,
    resolve: resolveAuthPrompt,
    coverageContexts: [
      { ecosystem: "typescript", backend: "self", frontend: ["next"] },
      { ecosystem: "go", backend: "none", frontend: [] },
    ],
  },
  caching: {
    schemaValues: CACHING_VALUES,
    resolve: resolveCachingPrompt,
    coverageContexts: [{ backend: "hono" }, { backend: "none" }],
  },
  cms: {
    schemaValues: CMS_VALUES,
    resolve: resolveCMSPrompt,
    coverageContexts: [{ backend: "hono" }, { backend: "none" }],
  },
  cssFramework: {
    schemaValues: CSS_FRAMEWORK_VALUES,
    resolve: resolveCSSFrameworkPrompt,
    coverageContexts: [{}, { uiLibrary: "radix-ui" }],
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
    coverageContexts: [{ auth: "better-auth", backend: "hono", frontends: ["next"] }],
  },
  realtime: {
    schemaValues: REALTIME_VALUES,
    resolve: resolveRealtimePrompt,
    coverageContexts: [{ backend: "hono" }, { backend: "none" }],
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
  uiLibrary: {
    schemaValues: UI_LIBRARY_VALUES,
    resolve: resolveUILibraryPrompt,
    coverageContexts: [
      { frontends: ["react-vite"] },
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
    resolve: ({ value }: { value?: string } = {}) =>
      resolveAstroIntegrationPrompt(value as any),
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
    resolve: ({ value }: { value?: string } = {}) =>
      resolveRustErrorHandlingPrompt(value as any),
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
    resolve: ({ value }: { value?: string } = {}) =>
      resolvePythonWebFrameworkPrompt(value as any),
    coverageContexts: [{}],
  },
  pythonOrm: {
    schemaValues: PYTHON_ORM_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolvePythonOrmPrompt(value as any),
    coverageContexts: [{}],
  },
  pythonValidation: {
    schemaValues: PYTHON_VALIDATION_VALUES,
    resolve: ({ value }: { value?: string } = {}) =>
      resolvePythonValidationPrompt(value as any),
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
  pythonTaskQueue: {
    schemaValues: PYTHON_TASK_QUEUE_VALUES,
    resolve: ({ value }: { value?: string } = {}) =>
      resolvePythonTaskQueuePrompt(value as any),
    coverageContexts: [{}],
  },
  pythonGraphql: {
    schemaValues: PYTHON_GRAPHQL_VALUES,
    resolve: ({ value }: { value?: string } = {}) =>
      resolvePythonGraphqlPrompt(value as any),
    coverageContexts: [{}],
  },
  pythonQuality: {
    schemaValues: PYTHON_QUALITY_VALUES,
    resolve: ({ value }: { value?: string } = {}) => resolvePythonQualityPrompt(value as any),
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
};
