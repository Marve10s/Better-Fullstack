import { getCapabilityDefinitions } from "@/capabilities/capabilities";
import {
  AI_DOCS_VALUES,
  AI_VALUES,
  ANALYTICS_VALUES,
  ANIMATION_VALUES,
  API_VALUES,
  APP_PLATFORM_ADDON_VALUES,
  ASTRO_INTEGRATION_VALUES,
  AUTH_VALUES,
  CACHING_VALUES,
  DOTNET_API_VALUES,
  DOTNET_AUTH_VALUES,
  DOTNET_FRONTEND_VALUES,
  DOTNET_VALIDATION_VALUES,
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
  ELIXIR_LIBRARIES_VALUES,
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
  I18N_VALUES,
  CMS_VALUES,
  CSS_FRAMEWORK_VALUES,
  DATABASE_SETUP_VALUES,
  DATABASE_VALUES,
  EFFECT_VALUES,
  EMAIL_VALUES,
  ECOMMERCE_VALUES,
  FEATURE_FLAGS_VALUES,
  INTEGRATIONS_VALUES,
  FILE_STORAGE_VALUES,
  FILE_UPLOAD_VALUES,
  FORMS_VALUES,
  MOBILE_DEEP_LINKING_VALUES,
  MOBILE_LIBRARIES_VALUES,
  MOBILE_NAVIGATION_VALUES,
  MOBILE_OTA_VALUES,
  MOBILE_PUSH_VALUES,
  MOBILE_STORAGE_VALUES,
  MOBILE_TESTING_VALUES,
  MOBILE_UI_VALUES,
  KOTLIN_MOBILE_VALUES,
  KOTLIN_MOBILE_LIBRARIES_VALUES,
  SWIFT_MOBILE_VALUES,
  DART_MOBILE_VALUES,
  GO_API_VALUES,
  GO_CLI_VALUES,
  GO_AUTH_VALUES,
  GO_LOGGING_VALUES,
  GO_ORM_VALUES,
  GO_WEB_FRAMEWORK_VALUES,
  GO_TESTING_VALUES,
  GO_REALTIME_VALUES,
  GO_MESSAGE_QUEUE_VALUES,
  GO_CACHING_VALUES,
  GO_CONFIG_VALUES,
  GO_OBSERVABILITY_VALUES,
  GO_VALIDATION_VALUES,
  GO_QUALITY_VALUES,
  GO_MIGRATIONS_VALUES,
  GO_TEMPLATING_VALUES,
  GO_PROTO_TOOLING_VALUES,
  GO_DI_VALUES,
  JAVA_AUTH_VALUES,
  JAVA_API_VALUES,
  JAVA_LANGUAGE_VALUES,
  JAVA_LOGGING_VALUES,
  JAVA_BUILD_TOOL_VALUES,
  JAVA_LIBRARIES_VALUES,
  JAVA_ORM_VALUES,
  JAVA_TESTING_LIBRARIES_VALUES,
  JAVA_WEB_FRAMEWORK_VALUES,
  JOB_QUEUE_VALUES,
  LOGGING_VALUES,
  OBSERVABILITY_VALUES,
  ORM_VALUES,
  PACKAGE_MANAGER_VALUES,
  WORKSPACE_SHAPE_VALUES,
  PAYMENTS_VALUES,
  VERSION_CHANNEL_VALUES,
  PYTHON_AI_VALUES,
  PYTHON_API_VALUES,
  PYTHON_AUTH_VALUES,
  PYTHON_ORM_VALUES,
  PYTHON_GRAPHQL_VALUES,
  PYTHON_QUALITY_VALUES,
  PYTHON_TESTING_VALUES,
  PYTHON_CACHING_VALUES,
  PYTHON_REALTIME_VALUES,
  PYTHON_OBSERVABILITY_VALUES,
  PYTHON_CLI_VALUES,
  PYTHON_CLOUD_SDK_VALUES,
  PYTHON_DATA_VALUES,
  PYTHON_HTTP_CLIENT_VALUES,
  PYTHON_MEDIA_VALUES,
  PYTHON_MESSAGE_QUEUE_VALUES,
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
  RUST_CLI_VALUES,
  RUST_FRONTEND_VALUES,
  RUST_LIBRARIES_VALUES,
  RUST_LOGGING_VALUES,
  RUST_ERROR_HANDLING_VALUES,
  RUST_CACHING_VALUES,
  RUST_AUTH_VALUES,
  RUST_REALTIME_VALUES,
  RUST_MESSAGE_QUEUE_VALUES,
  RUST_OBSERVABILITY_VALUES,
  RUST_TEMPLATING_VALUES,
  RUST_ORM_VALUES,
  RUST_WEB_FRAMEWORK_VALUES,
  SEARCH_VALUES,
  VECTOR_DB_VALUES,
  SHADCN_BASE_COLOR_VALUES,
  SHADCN_BASE_VALUES,
  SHADCN_COLOR_THEME_VALUES,
  SHADCN_FONT_VALUES,
  SHADCN_ICON_LIBRARY_VALUES,
  SHADCN_RADIUS_VALUES,
  SHADCN_STYLE_VALUES,
  SERVER_DEPLOY_VALUES,
  STATE_MANAGEMENT_VALUES,
  TESTING_VALUES,
  UI_LIBRARY_VALUES,
  VALIDATION_VALUES,
  WEB_DEPLOY_VALUES,
} from "@/config/schemas";
import { getToolingSelectionOptions } from "@/capabilities/tooling-capabilities";

export type OptionCategory =
  | "api"
  | "webFrontend"
  | "nativeFrontend"
  | "astroIntegration"
  | "runtime"
  | "backend"
  | "database"
  | "orm"
  | "dbSetup"
  | "webDeploy"
  | "serverDeploy"
  | "auth"
  | "payments"
  | "email"
  | "fileUpload"
  | "logging"
  | "observability"
  | "backendLibraries"
  | "stateManagement"
  | "forms"
  | "validation"
  | "testing"
  | "realtime"
  | "jobQueue"
  | "caching"
  | "rateLimit"
  | "botProtection"
  | "i18n"
  | "search"
  | "vectorDb"
  | "fileStorage"
  | "animation"
  | "cssFramework"
  | "uiLibrary"
  | "cms"
  | "featureFlags"
  | "integrations"
  | "ecommerce"
  | "analytics"
  | "mobileNavigation"
  | "mobileUI"
  | "mobileStorage"
  | "mobileTesting"
  | "mobilePush"
  | "mobileOTA"
  | "mobileDeepLinking"
  | "mobileLibraries"
  | "codeQuality"
  | "documentation"
  | "appShells"
  | "appPlatforms"
  | "toolchainProfile"
  | "workspaceRunner"
  | "codeQualityProfile"
  | "gitHooks"
  | "staticAnalysis"
  | "aiTooling"
  | "testingTools"
  | "dataClient"
  | "frontendUtilities"
  | "httpClientTool"
  | "codeGeneration"
  | "developerEnvironment"
  | "containerOrchestration"
  | "apiGateway"
  | "continuousIntegration"
  | "backendUtilitiesTool"
  | "packageManager"
  | "workspaceShape"
  | "versionChannel"
  | "examples"
  | "ai"
  | "aiDocs"
  | "git"
  | "install"
  | "effect"
  | "shadcnBase"
  | "shadcnStyle"
  | "shadcnIconLibrary"
  | "shadcnColorTheme"
  | "shadcnBaseColor"
  | "shadcnFont"
  | "shadcnRadius"
  | "rustWebFramework"
  | "rustFrontend"
  | "dotnetFrontend"
  | "kotlinMobile"
  | "kotlinMobileLibraries"
  | "swiftMobile"
  | "dartMobile"
  | "rustOrm"
  | "rustApi"
  | "rustCli"
  | "rustLibraries"
  | "rustLogging"
  | "rustErrorHandling"
  | "rustCaching"
  | "rustAuth"
  | "rustRealtime"
  | "rustMessageQueue"
  | "rustObservability"
  | "rustTemplating"
  | "pythonWebFramework"
  | "pythonOrm"
  | "pythonValidation"
  | "pythonAi"
  | "pythonAuth"
  | "pythonApi"
  | "pythonTaskQueue"
  | "pythonGraphql"
  | "pythonQuality"
  | "pythonTesting"
  | "pythonCaching"
  | "pythonRealtime"
  | "pythonObservability"
  | "pythonCli"
  | "pythonCloudSdk"
  | "pythonHttpClient"
  | "pythonData"
  | "pythonMedia"
  | "pythonServer"
  | "pythonPackageManager"
  | "pythonMessageQueue"
  | "goWebFramework"
  | "goOrm"
  | "goApi"
  | "goCli"
  | "goLogging"
  | "goAuth"
  | "goTesting"
  | "goRealtime"
  | "goMessageQueue"
  | "goCaching"
  | "goConfig"
  | "goObservability"
  | "goValidation"
  | "goQuality"
  | "goMigrations"
  | "goTemplating"
  | "goProtoTooling"
  | "goDI"
  | "javaLanguage"
  | "javaWebFramework"
  | "javaBuildTool"
  | "javaOrm"
  | "javaAuth"
  | "javaApi"
  | "javaLogging"
  | "javaLibraries"
  | "javaTestingLibraries"
  | "dotnetWebFramework"
  | "dotnetOrm"
  | "dotnetAuth"
  | "dotnetApi"
  | "dotnetTesting"
  | "dotnetJobQueue"
  | "dotnetRealtime"
  | "dotnetObservability"
  | "dotnetValidation"
  | "dotnetCaching"
  | "dotnetDeploy"
  | "dotnetLibraries"
  | "elixirWebFramework"
  | "elixirOrm"
  | "elixirAuth"
  | "elixirApi"
  | "elixirRealtime"
  | "elixirJobs"
  | "elixirValidation"
  | "elixirHttp"
  | "elixirJson"
  | "elixirEmail"
  | "elixirCaching"
  | "elixirObservability"
  | "elixirTesting"
  | "elixirQuality"
  | "elixirI18n"
  | "elixirHttpServer"
  | "elixirApplicationFramework"
  | "elixirDocumentation"
  | "elixirClustering"
  | "elixirDeploy"
  | "elixirLibraries";

export type OptionSelectionMode = "single" | "multiple";

export type OptionCategoryEcosystem =
  | "typescript"
  | "react-native"
  | "rust"
  | "python"
  | "go"
  | "java"
  | "dotnet"
  | "elixir";

export const TYPESCRIPT_CATEGORY_ORDER = [
  "webFrontend",
  "astroIntegration",
  "appShells",
  "cssFramework",
  "uiLibrary",
  "shadcnBase",
  "shadcnStyle",
  "shadcnIconLibrary",
  "shadcnColorTheme",
  "shadcnBaseColor",
  "shadcnFont",
  "shadcnRadius",
  "backend",
  "runtime",
  "api",
  "database",
  "orm",
  "dbSetup",
  "webDeploy",
  "serverDeploy",
  "auth",
  "payments",
  "email",
  "fileUpload",
  "logging",
  "observability",
  "featureFlags",
  "integrations",
  "ecommerce",
  "analytics",
  "ai",
  "stateManagement",
  "forms",
  "validation",
  "backendLibraries",
  "testing",
  "realtime",
  "jobQueue",
  "caching",
  "rateLimit",
  "botProtection",
  "i18n",
  "search",
  "vectorDb",
  "fileStorage",
  "animation",
  "cms",
  "toolchainProfile",
  "workspaceRunner",
  "codeQualityProfile",
  "gitHooks",
  "staticAnalysis",
  "aiTooling",
  "documentation",
  "testingTools",
  "dataClient",
  "frontendUtilities",
  "httpClientTool",
  "codeGeneration",
  "developerEnvironment",
  "containerOrchestration",
  "apiGateway",
  "continuousIntegration",
  "backendUtilitiesTool",
  "workspaceShape",
  "packageManager",
  "examples",
  "aiDocs",
  "versionChannel",
  "git",
  "install",
] as const satisfies readonly OptionCategory[];

/**
 * Kotlin, Swift and Flutter apps exist only as stack graph parts: they are
 * composed in multi-ecosystem mode or through `--shape mobile`, and the
 * `react-native` ecosystem rejects them outright. They ride along in the mobile
 * category order so their metadata stays reachable, so every surface that
 * presents the react-native ecosystem to a user must filter them out.
 */
export const MULTI_ECOSYSTEM_MOBILE_CATEGORIES: ReadonlySet<string> = new Set([
  "kotlinMobile",
  "kotlinMobileLibraries",
  "swiftMobile",
  "dartMobile",
]);

export function isMultiEcosystemMobileCategory(category: string): boolean {
  return MULTI_ECOSYSTEM_MOBILE_CATEGORIES.has(category);
}

export const REACT_NATIVE_CATEGORY_ORDER = [
  "nativeFrontend",
  "kotlinMobile",
  "kotlinMobileLibraries",
  "swiftMobile",
  "dartMobile",
  "mobileNavigation",
  "mobileUI",
  "mobileStorage",
  "mobileTesting",
  "mobilePush",
  "mobileOTA",
  "mobileDeepLinking",
  "mobileLibraries",
  "auth",
  "payments",
  "packageManager",
  "aiDocs",
  "git",
  "install",
] as const satisfies readonly OptionCategory[];

export const RUST_CATEGORY_ORDER = [
  "rustWebFramework",
  "rustFrontend",
  "rustOrm",
  "rustApi",
  "rustCli",
  "rustLibraries",
  "rustLogging",
  "rustErrorHandling",
  "rustCaching",
  "rustAuth",
  "rustRealtime",
  "rustMessageQueue",
  "rustObservability",
  "rustTemplating",
  "email",
  "observability",
  "caching",
  "search",
  "aiDocs",
  "git",
  "install",
] as const satisfies readonly OptionCategory[];

export const PYTHON_CATEGORY_ORDER = [
  "pythonWebFramework",
  "pythonOrm",
  "pythonValidation",
  "pythonAi",
  "pythonAuth",
  "pythonApi",
  "pythonTaskQueue",
  "pythonGraphql",
  "pythonQuality",
  "pythonTesting",
  "pythonCaching",
  "pythonRealtime",
  "pythonObservability",
  "pythonCli",
  "pythonCloudSdk",
  "pythonHttpClient",
  "pythonData",
  "pythonMedia",
  "pythonServer",
  "pythonPackageManager",
  "pythonMessageQueue",
  "email",
  "observability",
  "caching",
  "search",
  "aiDocs",
  "git",
  "install",
] as const satisfies readonly OptionCategory[];

export const GO_CATEGORY_ORDER = [
  "goWebFramework",
  "goOrm",
  "goApi",
  "goCli",
  "goLogging",
  "goAuth",
  "goTesting",
  "goRealtime",
  "goMessageQueue",
  "goCaching",
  "goConfig",
  "goObservability",
  "goValidation",
  "goQuality",
  "goMigrations",
  "goTemplating",
  "goProtoTooling",
  "goDI",
  "auth",
  "email",
  "observability",
  "caching",
  "search",
  "aiDocs",
  "git",
  "install",
] as const satisfies readonly OptionCategory[];

export const JAVA_CATEGORY_ORDER = [
  "javaWebFramework",
  "javaLanguage",
  "javaBuildTool",
  "javaOrm",
  "javaAuth",
  "javaApi",
  "javaLogging",
  "javaLibraries",
  "javaTestingLibraries",
  "email",
  "observability",
  "caching",
  "search",
  "aiDocs",
  "git",
  "install",
] as const satisfies readonly OptionCategory[];

export const DOTNET_CATEGORY_ORDER = [
  "dotnetFrontend",
  "dotnetWebFramework",
  "dotnetOrm",
  "dotnetAuth",
  "dotnetApi",
  "dotnetTesting",
  "dotnetJobQueue",
  "dotnetRealtime",
  "dotnetObservability",
  "dotnetValidation",
  "dotnetCaching",
  "dotnetDeploy",
  "dotnetLibraries",
  "aiDocs",
  "git",
  "install",
] as const satisfies readonly OptionCategory[];

export const ELIXIR_CATEGORY_ORDER = [
  "elixirWebFramework",
  "elixirOrm",
  "elixirAuth",
  "elixirApi",
  "elixirRealtime",
  "elixirJobs",
  "elixirValidation",
  "elixirHttp",
  "elixirJson",
  "elixirEmail",
  "elixirCaching",
  "elixirObservability",
  "elixirTesting",
  "elixirQuality",
  "elixirI18n",
  "elixirHttpServer",
  "elixirApplicationFramework",
  "elixirDocumentation",
  "elixirClustering",
  "elixirDeploy",
  "elixirLibraries",
  "aiDocs",
  "git",
  "install",
] as const satisfies readonly OptionCategory[];

export const CATEGORY_ORDER = [
  ...new Set([
    ...TYPESCRIPT_CATEGORY_ORDER,
    ...REACT_NATIVE_CATEGORY_ORDER,
    ...RUST_CATEGORY_ORDER,
    ...PYTHON_CATEGORY_ORDER,
    ...GO_CATEGORY_ORDER,
    ...JAVA_CATEGORY_ORDER,
    ...DOTNET_CATEGORY_ORDER,
    ...ELIXIR_CATEGORY_ORDER,
  ]),
] as OptionCategory[];

export function getCategoryOrderForEcosystem(
  ecosystem: OptionCategoryEcosystem,
): readonly OptionCategory[] {
  switch (ecosystem) {
    case "react-native":
      return REACT_NATIVE_CATEGORY_ORDER;
    case "rust":
      return RUST_CATEGORY_ORDER;
    case "python":
      return PYTHON_CATEGORY_ORDER;
    case "go":
      return GO_CATEGORY_ORDER;
    case "java":
      return JAVA_CATEGORY_ORDER;
    case "dotnet":
      return DOTNET_CATEGORY_ORDER;
    case "elixir":
      return ELIXIR_CATEGORY_ORDER;
    case "typescript":
      return TYPESCRIPT_CATEGORY_ORDER;
  }
}

export function getCategoryDisplayName(categoryKey: string): string {
  const categoryNames: Record<string, string> = {
    i18n: "Internationalization (i18n)",
    appShells: "App Platforms",
    appPlatforms: "Legacy Capabilities",
    toolchainProfile: "JavaScript Toolchain",
    workspaceRunner: "Workspace Runner",
    codeQualityProfile: "Code Quality",
    gitHooks: "Git Hooks",
    staticAnalysis: "Static Analysis",
    aiTooling: "AI Tooling",
    testingTools: "Testing Support",
    dataClient: "Data Client",
    frontendUtilities: "Frontend Utilities",
    httpClientTool: "HTTP Client",
    codeGeneration: "API Code Generation",
    developerEnvironment: "Developer Environment",
    containerOrchestration: "Local Containers",
    apiGateway: "API Gateway",
    continuousIntegration: "Continuous Integration",
    backendUtilitiesTool: "Backend Utilities",
    mobileNavigation: "Mobile Navigation",
    mobileUI: "Mobile UI",
    mobileStorage: "Mobile Storage",
    mobileTesting: "Mobile Testing",
    mobilePush: "Mobile Push",
    mobileOTA: "Mobile OTA",
    mobileDeepLinking: "Mobile Deep Linking",
    mobileLibraries: "Mobile Libraries",
    backendLibraries: "Effect Services",
    rustWebFramework: "Rust Web Framework",
    rustFrontend: "Rust Frontend (WASM)",
    dotnetFrontend: ".NET Frontend",
    kotlinMobile: "Kotlin Mobile",
    kotlinMobileLibraries: "Kotlin Mobile Libraries",
    swiftMobile: "Swift Mobile",
    dartMobile: "Flutter / Dart Mobile",
    rustOrm: "Rust ORM / Database",
    rustApi: "Rust API Layer",
    rustCli: "Rust CLI Tools",
    rustLibraries: "Rust Core Libraries",
    rustLogging: "Rust Logging",
    rustErrorHandling: "Rust Error Handling",
    rustCaching: "Rust Caching",
    rustAuth: "Rust Auth",
    rustRealtime: "Rust Realtime",
    rustMessageQueue: "Rust Message Queue",
    rustObservability: "Rust Observability",
    rustTemplating: "Rust Templating",
    pythonWebFramework: "Python Web Framework",
    pythonOrm: "Python ORM / Database",
    pythonValidation: "Python Validation",
    pythonAi: "Python AI / ML",
    pythonAuth: "Python Auth",
    pythonApi: "Python API Framework",
    pythonTaskQueue: "Python Task Queue",
    pythonGraphql: "Python GraphQL",
    pythonQuality: "Python Code Quality",
    pythonTesting: "Python Testing",
    pythonCaching: "Python Caching",
    pythonRealtime: "Python Realtime",
    pythonObservability: "Python Observability",
    pythonCli: "Python CLI Tooling",
    pythonCloudSdk: "Python Cloud SDK",
    pythonHttpClient: "Python HTTP Client",
    pythonData: "Python Data & Scientific Computing",
    pythonMedia: "Python Media",
    pythonServer: "Python Production Server",
    pythonPackageManager: "Python Package Manager",
    pythonMessageQueue: "Python Message Queue",
    goWebFramework: "Go Web Framework",
    goOrm: "Go ORM / Database",
    goApi: "Go API Layer",
    goCli: "Go CLI Tools",
    goLogging: "Go Logging",
    goAuth: "Go Auth",
    goTesting: "Go Testing",
    goRealtime: "Go Realtime",
    goMessageQueue: "Go Message Queue",
    goCaching: "Go Caching",
    goConfig: "Go Config",
    goObservability: "Go Observability",
    goValidation: "Go Validation",
    goQuality: "Go Code Quality",
    goMigrations: "Go Database Migrations",
    goTemplating: "Go Templating",
    goProtoTooling: "Go Protobuf Tooling",
    goDI: "Go Dependency Injection",
    javaLanguage: "Java Language",
    javaWebFramework: "Java Web Framework",
    javaBuildTool: "Java Build Tool",
    javaOrm: "Java ORM / Database",
    javaAuth: "Java Auth",
    javaApi: "Java API Layer",
    javaLogging: "Java Logging",
    javaLibraries: "Java Libraries",
    javaTestingLibraries: "Java Testing Libraries",
    dotnetWebFramework: ".NET Web Framework",
    dotnetOrm: ".NET Data Access",
    dotnetAuth: ".NET Auth",
    dotnetApi: ".NET API Style",
    dotnetTesting: ".NET Testing",
    dotnetJobQueue: ".NET Background Jobs",
    dotnetRealtime: ".NET Realtime",
    dotnetObservability: ".NET Observability",
    dotnetValidation: ".NET Validation",
    dotnetCaching: ".NET Caching",
    dotnetDeploy: ".NET Deploy",
    dotnetLibraries: ".NET Libraries",
    elixirWebFramework: "Elixir Web Framework",
    elixirOrm: "Elixir ORM / Database",
    elixirAuth: "Elixir Auth",
    elixirApi: "Elixir API Layer",
    elixirRealtime: "Elixir Realtime",
    elixirJobs: "Elixir Jobs",
    elixirValidation: "Elixir Validation",
    elixirHttp: "Elixir HTTP Client",
    elixirJson: "Elixir JSON",
    elixirEmail: "Elixir Email",
    elixirCaching: "Elixir Caching",
    elixirObservability: "Elixir Observability",
    elixirTesting: "Elixir Testing",
    elixirQuality: "Elixir Code Quality",
    elixirI18n: "Elixir Localization",
    elixirHttpServer: "Elixir HTTP Server",
    elixirApplicationFramework: "Elixir Application Framework",
    elixirDocumentation: "Elixir Documentation",
    elixirClustering: "Elixir Clustering",
    elixirDeploy: "Elixir Deploy",
    elixirLibraries: "Elixir Libraries",
  };

  const customName = categoryNames[categoryKey];
  if (customName) return customName;

  const result = categoryKey.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
}

export type OptionMetadata = {
  id: string;
  label: string;
  aliases: readonly string[];
  cliValue: string;
};

export type OptionCategoryMetadata = {
  selectionMode: OptionSelectionMode;
  options: readonly OptionMetadata[];
};

const WEB_FRONTEND_VALUES = [
  "tanstack-router",
  "react-router",
  "react-vite",
  "vanilla-vite",
  "vue",
  "tanstack-start",
  "next",
  "vinext",
  "nuxt",
  "svelte",
  "solid",
  "solid-start",
  "astro",
  "qwik",
  "angular",
  "redwood",
  "fresh",
  "none",
] as const satisfies readonly string[];

const NATIVE_FRONTEND_VALUES = [
  "native-bare",
  "native-uniwind",
  "native-unistyles",
  "none",
] as const satisfies readonly string[];

const BACKEND_BUILDER_VALUES = [
  "hono",
  "express",
  "fastify",
  "elysia",
  "fets",
  "effect",
  "nestjs",
  "adonisjs",
  "nitro",
  "encore",
  "convex",
  "self-next",
  "self-vinext",
  "self-tanstack-start",
  "self-astro",
  "self-nuxt",
  "self-svelte",
  "self-solid-start",
  "none",
] as const satisfies readonly string[];

const CODE_QUALITY_VALUES = [
  "biome",
  "eslint",
  "prettier",
  "oxlint",
  "ultracite",
  "lefthook",
  "husky",
  "knip",
  "gitleaks",
  "ruler",
] as const satisfies readonly string[];

const DOCUMENTATION_VALUES = ["starlight", "fumadocs"] as const satisfies readonly string[];

const APP_SHELL_VALUES = APP_PLATFORM_ADDON_VALUES;

const APP_PLATFORM_VALUES = [
  "turborepo",
  "nx",
  "vite-plus",
  "mcp",
  "skills",
  "msw",
  "storybook",
  "swr",
  "tanstack-query",
  "tanstack-table",
  "tanstack-virtual",
  "tanstack-db",
  "tanstack-pacer",
  "backend-utils",
  "devcontainer",
  "docker-compose",
  "kong",
  "github-actions",
  "axios",
  "firebase",
  "graphql-codegen",
  "openapi-typescript",
  "apollo-client",
] as const satisfies readonly string[];

const toolingSelectionIds = (category: Parameters<typeof getToolingSelectionOptions>[0]) =>
  getToolingSelectionOptions(category).map((selection) => selection.id);

const EXAMPLE_VALUES = ["ai", "chat-sdk"] as const satisfies readonly string[];
const BOOLEAN_OPTION_VALUES = ["true", "false"] as const satisfies readonly string[];

const MULTI_SELECT_CATEGORIES = new Set<OptionCategory>([
  "webFrontend",
  "nativeFrontend",
  "codeQuality",
  "appShells",
  "appPlatforms",
  "staticAnalysis",
  "aiTooling",
  "testingTools",
  "frontendUtilities",
  "codeGeneration",
  "developerEnvironment",
  "backendUtilitiesTool",
  "examples",
  "aiDocs",
  "rustLibraries",
  "pythonAi",
  "javaLibraries",
  "javaTestingLibraries",
  "mobileLibraries",
  "kotlinMobileLibraries",
  "dotnetLibraries",
  "dotnetTesting",
  "dotnetObservability",
  "goTesting",
  "pythonTesting",
  "pythonCli",
  "pythonData",
  "elixirLibraries",
]);

const CATEGORY_VALUE_IDS: Record<OptionCategory, readonly string[]> = {
  api: API_VALUES,
  webFrontend: WEB_FRONTEND_VALUES,
  nativeFrontend: NATIVE_FRONTEND_VALUES,
  astroIntegration: ASTRO_INTEGRATION_VALUES,
  runtime: RUNTIME_VALUES,
  backend: BACKEND_BUILDER_VALUES,
  database: DATABASE_VALUES,
  orm: ORM_VALUES,
  dbSetup: DATABASE_SETUP_VALUES,
  webDeploy: WEB_DEPLOY_VALUES,
  serverDeploy: SERVER_DEPLOY_VALUES,
  auth: AUTH_VALUES,
  payments: PAYMENTS_VALUES,
  email: EMAIL_VALUES,
  fileUpload: FILE_UPLOAD_VALUES,
  logging: LOGGING_VALUES,
  observability: OBSERVABILITY_VALUES,
  backendLibraries: EFFECT_VALUES,
  stateManagement: STATE_MANAGEMENT_VALUES,
  forms: FORMS_VALUES,
  validation: VALIDATION_VALUES,
  testing: TESTING_VALUES,
  realtime: REALTIME_VALUES,
  jobQueue: JOB_QUEUE_VALUES,
  caching: CACHING_VALUES,
  rateLimit: RATE_LIMIT_VALUES,
  botProtection: BOT_PROTECTION_VALUES,
  i18n: I18N_VALUES,
  search: SEARCH_VALUES,
  vectorDb: VECTOR_DB_VALUES,
  fileStorage: FILE_STORAGE_VALUES,
  animation: ANIMATION_VALUES,
  cssFramework: CSS_FRAMEWORK_VALUES,
  uiLibrary: UI_LIBRARY_VALUES,
  cms: CMS_VALUES,
  featureFlags: FEATURE_FLAGS_VALUES,
  integrations: INTEGRATIONS_VALUES,
  ecommerce: ECOMMERCE_VALUES,
  analytics: ANALYTICS_VALUES,
  mobileNavigation: MOBILE_NAVIGATION_VALUES,
  mobileUI: MOBILE_UI_VALUES,
  mobileStorage: MOBILE_STORAGE_VALUES,
  mobileTesting: MOBILE_TESTING_VALUES,
  mobilePush: MOBILE_PUSH_VALUES,
  mobileOTA: MOBILE_OTA_VALUES,
  mobileDeepLinking: MOBILE_DEEP_LINKING_VALUES,
  mobileLibraries: MOBILE_LIBRARIES_VALUES,
  codeQuality: CODE_QUALITY_VALUES,
  documentation: DOCUMENTATION_VALUES,
  appShells: APP_SHELL_VALUES,
  appPlatforms: APP_PLATFORM_VALUES,
  toolchainProfile: toolingSelectionIds("toolchain"),
  workspaceRunner: toolingSelectionIds("workspaceRunner"),
  codeQualityProfile: toolingSelectionIds("codeQuality"),
  gitHooks: toolingSelectionIds("gitHooks"),
  staticAnalysis: toolingSelectionIds("staticAnalysis"),
  aiTooling: toolingSelectionIds("aiTooling"),
  testingTools: toolingSelectionIds("testingTools"),
  dataClient: toolingSelectionIds("dataClient"),
  frontendUtilities: toolingSelectionIds("frontendUtilities"),
  httpClientTool: toolingSelectionIds("httpClient"),
  codeGeneration: toolingSelectionIds("codeGeneration"),
  developerEnvironment: toolingSelectionIds("developerEnvironment"),
  containerOrchestration: toolingSelectionIds("containerOrchestration"),
  apiGateway: toolingSelectionIds("apiGateway"),
  continuousIntegration: toolingSelectionIds("continuousIntegration"),
  backendUtilitiesTool: toolingSelectionIds("backendUtilities"),
  packageManager: PACKAGE_MANAGER_VALUES,
  workspaceShape: WORKSPACE_SHAPE_VALUES,
  versionChannel: VERSION_CHANNEL_VALUES,
  examples: EXAMPLE_VALUES,
  ai: AI_VALUES,
  aiDocs: AI_DOCS_VALUES,
  git: BOOLEAN_OPTION_VALUES,
  install: BOOLEAN_OPTION_VALUES,
  effect: EFFECT_VALUES,
  shadcnBase: SHADCN_BASE_VALUES,
  shadcnStyle: SHADCN_STYLE_VALUES,
  shadcnIconLibrary: SHADCN_ICON_LIBRARY_VALUES,
  shadcnColorTheme: SHADCN_COLOR_THEME_VALUES,
  shadcnBaseColor: SHADCN_BASE_COLOR_VALUES,
  shadcnFont: SHADCN_FONT_VALUES,
  shadcnRadius: SHADCN_RADIUS_VALUES,
  rustWebFramework: RUST_WEB_FRAMEWORK_VALUES,
  rustFrontend: RUST_FRONTEND_VALUES,
  dotnetFrontend: DOTNET_FRONTEND_VALUES,
  kotlinMobile: KOTLIN_MOBILE_VALUES,
  kotlinMobileLibraries: KOTLIN_MOBILE_LIBRARIES_VALUES,
  swiftMobile: SWIFT_MOBILE_VALUES,
  dartMobile: DART_MOBILE_VALUES,
  rustOrm: RUST_ORM_VALUES,
  rustApi: RUST_API_VALUES,
  rustCli: RUST_CLI_VALUES,
  rustLibraries: RUST_LIBRARIES_VALUES,
  rustLogging: RUST_LOGGING_VALUES,
  rustErrorHandling: RUST_ERROR_HANDLING_VALUES,
  rustCaching: RUST_CACHING_VALUES,
  rustAuth: RUST_AUTH_VALUES,
  rustRealtime: RUST_REALTIME_VALUES,
  rustMessageQueue: RUST_MESSAGE_QUEUE_VALUES,
  rustObservability: RUST_OBSERVABILITY_VALUES,
  rustTemplating: RUST_TEMPLATING_VALUES,
  pythonWebFramework: PYTHON_WEB_FRAMEWORK_VALUES,
  pythonOrm: PYTHON_ORM_VALUES,
  pythonValidation: PYTHON_VALIDATION_VALUES,
  pythonAi: PYTHON_AI_VALUES,
  pythonAuth: PYTHON_AUTH_VALUES,
  pythonApi: PYTHON_API_VALUES,
  pythonTaskQueue: PYTHON_TASK_QUEUE_VALUES,
  pythonGraphql: PYTHON_GRAPHQL_VALUES,
  pythonQuality: PYTHON_QUALITY_VALUES,
  pythonTesting: PYTHON_TESTING_VALUES,
  pythonCaching: PYTHON_CACHING_VALUES,
  pythonRealtime: PYTHON_REALTIME_VALUES,
  pythonObservability: PYTHON_OBSERVABILITY_VALUES,
  pythonCli: PYTHON_CLI_VALUES,
  pythonCloudSdk: PYTHON_CLOUD_SDK_VALUES,
  pythonHttpClient: PYTHON_HTTP_CLIENT_VALUES,
  pythonData: PYTHON_DATA_VALUES,
  pythonMedia: PYTHON_MEDIA_VALUES,
  pythonServer: PYTHON_SERVER_VALUES,
  pythonPackageManager: PYTHON_PACKAGE_MANAGER_VALUES,
  pythonMessageQueue: PYTHON_MESSAGE_QUEUE_VALUES,
  goWebFramework: GO_WEB_FRAMEWORK_VALUES,
  goOrm: GO_ORM_VALUES,
  goApi: GO_API_VALUES,
  goCli: GO_CLI_VALUES,
  goLogging: GO_LOGGING_VALUES,
  goAuth: GO_AUTH_VALUES,
  goTesting: GO_TESTING_VALUES,
  goRealtime: GO_REALTIME_VALUES,
  goMessageQueue: GO_MESSAGE_QUEUE_VALUES,
  goCaching: GO_CACHING_VALUES,
  goConfig: GO_CONFIG_VALUES,
  goObservability: GO_OBSERVABILITY_VALUES,
  goValidation: GO_VALIDATION_VALUES,
  goQuality: GO_QUALITY_VALUES,
  goMigrations: GO_MIGRATIONS_VALUES,
  goTemplating: GO_TEMPLATING_VALUES,
  goProtoTooling: GO_PROTO_TOOLING_VALUES,
  goDI: GO_DI_VALUES,
  javaLanguage: JAVA_LANGUAGE_VALUES,
  javaWebFramework: JAVA_WEB_FRAMEWORK_VALUES,
  javaBuildTool: JAVA_BUILD_TOOL_VALUES,
  javaOrm: JAVA_ORM_VALUES,
  javaAuth: JAVA_AUTH_VALUES,
  javaApi: JAVA_API_VALUES,
  javaLogging: JAVA_LOGGING_VALUES,
  javaLibraries: JAVA_LIBRARIES_VALUES,
  javaTestingLibraries: JAVA_TESTING_LIBRARIES_VALUES,
  dotnetWebFramework: DOTNET_WEB_FRAMEWORK_VALUES,
  dotnetOrm: DOTNET_ORM_VALUES,
  dotnetAuth: DOTNET_AUTH_VALUES,
  dotnetApi: DOTNET_API_VALUES,
  dotnetTesting: DOTNET_TESTING_VALUES,
  dotnetJobQueue: DOTNET_JOB_QUEUE_VALUES,
  dotnetRealtime: DOTNET_REALTIME_VALUES,
  dotnetObservability: DOTNET_OBSERVABILITY_VALUES,
  dotnetValidation: DOTNET_VALIDATION_VALUES,
  dotnetCaching: DOTNET_CACHING_VALUES,
  dotnetDeploy: DOTNET_DEPLOY_VALUES,
  dotnetLibraries: DOTNET_LIBRARIES_VALUES,
  elixirWebFramework: ELIXIR_WEB_FRAMEWORK_VALUES,
  elixirOrm: ELIXIR_ORM_VALUES,
  elixirAuth: ELIXIR_AUTH_VALUES,
  elixirApi: ELIXIR_API_VALUES,
  elixirRealtime: ELIXIR_REALTIME_VALUES,
  elixirJobs: ELIXIR_JOBS_VALUES,
  elixirValidation: ELIXIR_VALIDATION_VALUES,
  elixirHttp: ELIXIR_HTTP_VALUES,
  elixirJson: ELIXIR_JSON_VALUES,
  elixirEmail: ELIXIR_EMAIL_VALUES,
  elixirCaching: ELIXIR_CACHING_VALUES,
  elixirObservability: ELIXIR_OBSERVABILITY_VALUES,
  elixirTesting: ELIXIR_TESTING_VALUES,
  elixirQuality: ELIXIR_QUALITY_VALUES,
  elixirI18n: ELIXIR_I18N_VALUES,
  elixirHttpServer: ELIXIR_HTTP_SERVER_VALUES,
  elixirApplicationFramework: ELIXIR_APPLICATION_FRAMEWORK_VALUES,
  elixirDocumentation: ELIXIR_DOCUMENTATION_VALUES,
  elixirClustering: ELIXIR_CLUSTERING_VALUES,
  elixirDeploy: ELIXIR_DEPLOY_VALUES,
  elixirLibraries: ELIXIR_LIBRARIES_VALUES,
};

const EXACT_LABEL_OVERRIDES: Partial<Record<OptionCategory, Partial<Record<string, string>>>> = {
  api: {
    trpc: "tRPC",
    orpc: "oRPC",
    "graphql-yoga": "GraphQL Yoga",
    "apollo-server": "Apollo Server",
    openapi: "OpenAPI",
  },
  webFrontend: {
    next: "Next.js",
    vinext: "Vinext",
    "react-vite": "React + Vite",
    "vanilla-vite": "Vite (Vanilla TypeScript)",
    vue: "Vue 3 + Vite",
    svelte: "SvelteKit",
    redwood: "RedwoodJS",
  },
  nativeFrontend: {
    "native-bare": "Expo + StyleSheet",
    "native-uniwind": "Expo + Uniwind",
    "native-unistyles": "Expo + Unistyles",
  },
  runtime: { node: "Node.js", workers: "Cloudflare Workers" },
  backend: {
    effect: "Effect",
    fets: "feTS",
    nestjs: "NestJS",
    encore: "Encore.ts",
    "self-next": "Fullstack Next.js",
    "self-vinext": "Fullstack Vinext",
    "self-tanstack-start": "Fullstack TanStack Start",
    "self-astro": "Fullstack Astro",
    "self-nuxt": "Fullstack Nuxt",
    "self-svelte": "Fullstack SvelteKit",
    "self-solid-start": "Fullstack SolidStart",
  },
  database: { sqlite: "SQLite", postgres: "PostgreSQL", mongodb: "MongoDB", edgedb: "EdgeDB" },
  orm: {
    typeorm: "TypeORM",
    mikroorm: "MikroORM",
  },
  dbSetup: {
    d1: "Cloudflare D1",
    neon: "Neon Postgres",
    "prisma-postgres": "Prisma PostgreSQL",
    "mongodb-atlas": "MongoDB Atlas",
    planetscale: "PlanetScale",
  },
  webDeploy: {
    cloudflare: "Cloudflare",
    fly: "Fly.io",
    railway: "Railway",
    render: "Render",
    netlify: "Netlify",
    docker: "Docker",
    sst: "SST",
    vercel: "Vercel",
  },
  serverDeploy: {
    cloudflare: "Cloudflare",
    fly: "Fly.io",
    railway: "Railway",
    render: "Render",
    netlify: "Netlify",
    docker: "Docker",
    sst: "SST",
    vercel: "Vercel",
  },
  cms: {
    tinacms: "TinaCMS",
    directus: "Directus",
    keystatic: "Keystatic",
    contentful: "Contentful",
  },
  auth: {
    "better-auth-organizations": "Better Auth + Organizations",
    auth0: "Auth0",
    workos: "WorkOS AuthKit",
    kinde: "Kinde",
    passport: "Passport.js",
  },
  payments: {
    "lemon-squeezy": "Lemon Squeezy",
    dodo: "Dodo Payments",
    paypal: "PayPal",
    xendit: "Xendit",
  },
  email: {
    "react-email": "React Email",
    sendgrid: "SendGrid",
    "aws-ses": "AWS SES",
  },
  fileUpload: {
    uploadthing: "UploadThing",
    filepond: "FilePond",
    uppy: "Uppy",
  },
  observability: {
    opentelemetry: "OpenTelemetry",
    signoz: "SigNoz",
    datadog: "Datadog",
    axiom: "Axiom",
    betterstack: "Better Stack",
  },
  rateLimit: {
    arcjet: "Arcjet",
    "upstash-ratelimit": "Upstash Ratelimit",
  },
  botProtection: {
    botid: "Vercel BotID",
    turnstile: "Cloudflare Turnstile",
  },
  backendLibraries: {
    effect: "Effect Core",
    "effect-full": "Effect Platform + SQL",
  },
  stateManagement: {
    "redux-toolkit": "Redux Toolkit",
    xstate: "XState",
  },
  forms: {
    "react-hook-form": "React Hook Form",
    "tanstack-form": "TanStack Form",
    "final-form": "Final Form",
    "modular-forms": "Modular Forms",
  },
  validation: {
    zod: "Zod",
    arktype: "ArkType",
    typebox: "TypeBox",
    "effect-schema": "Effect Schema",
  },
  testing: {
    "vitest-playwright": "Vitest + Playwright",
    mocha: "Mocha",
  },
  realtime: {
    "socket-io": "Socket.IO",
    ws: "ws",
    yjs: "Y.js",
  },
  jobQueue: {
    bullmq: "BullMQ",
    "trigger-dev": "Trigger.dev",
  },
  i18n: {
    paraglide: "Paraglide",
    i18next: "i18next",
    "next-intl": "next-intl",
  },
  search: {
    meilisearch: "Meilisearch",
    typesense: "Typesense",
    elasticsearch: "Elasticsearch",
    opensearch: "OpenSearch",
    algolia: "Algolia",
    bleve: "Bleve",
  },
  vectorDb: {
    pgvector: "pgvector",
    qdrant: "Qdrant",
    chroma: "Chroma",
    pinecone: "Pinecone",
  },
  fileStorage: {
    s3: "AWS S3",
    r2: "Cloudflare R2",
    cloudinary: "Cloudinary",
  },
  logging: {
    evlog: "evlog",
  },
  cssFramework: {
    tailwind: "Tailwind CSS",
    scss: "SCSS",
    "postcss-only": "PostCSS Only",
    "styled-components": "styled-components",
  },
  uiLibrary: {
    "shadcn-ui": "shadcn/ui",
    "shadcn-svelte": "shadcn-svelte",
    daisyui: "daisyUI",
    "radix-ui": "Radix UI",
    "headless-ui": "Headless UI",
    "park-ui": "Park UI",
    "chakra-ui": "Chakra UI",
    nextui: "NextUI",
    mui: "MUI",
    antd: "Ant Design",
    "base-ui": "Base UI",
    "ark-ui": "Ark UI",
    "react-aria": "React Aria",
  },
  featureFlags: {
    growthbook: "GrowthBook",
    posthog: "PostHog",
    launchdarkly: "LaunchDarkly",
    flagsmith: "Flagsmith",
    unleash: "Unleash",
  },
  integrations: {
    nango: "Nango",
  },
  ecommerce: {
    medusa: "MedusaJS",
  },
  analytics: {
    plausible: "Plausible",
    umami: "Umami",
    ga4: "Google Analytics 4",
    "vercel-analytics": "Vercel Analytics",
  },
  mobileNavigation: {
    "expo-router": "Expo Router",
    "react-navigation": "React Navigation",
  },
  mobileUI: {
    tamagui: "Tamagui",
    "gluestack-ui": "Gluestack UI",
    uniwind: "Uniwind",
    unistyles: "Unistyles",
  },
  mobileStorage: {
    mmkv: "MMKV",
  },
  mobileTesting: {
    maestro: "Maestro",
    "react-native-testing-library": "React Native Testing Library",
    "maestro-react-native-testing-library": "Maestro + RN Testing Library",
  },
  mobilePush: {
    "expo-notifications": "Expo Notifications",
  },
  mobileOTA: {
    "expo-updates": "Expo Updates",
  },
  mobileDeepLinking: {
    "expo-linking": "Expo Linking",
  },
  mobileLibraries: {
    "expo-sqlite": "Expo SQLite",
    "expo-camera": "Expo Camera",
    "expo-image-picker": "Expo Image Picker",
    "expo-location": "Expo Location",
    "expo-sensors": "Expo Sensors",
    "expo-file-system": "Expo File System",
    "expo-image": "Expo Image",
    "expo-audio": "Expo Audio",
    "expo-video": "Expo Video",
    "expo-contacts": "Expo Contacts",
    "expo-calendar": "Expo Calendar",
    "expo-local-authentication": "Expo Local Authentication",
    "expo-sharing": "Expo Sharing",
    "expo-clipboard": "Expo Clipboard",
    "expo-task-manager": "Expo Task Manager",
    "expo-background-task": "Expo Background Task",
    "expo-maps": "Expo Maps",
    "expo-brightness": "Expo Brightness",
    "expo-battery": "Expo Battery",
    "expo-screen-capture": "Expo Screen Capture",
  },
  codeQuality: {
    biome: "Biome",
    eslint: "ESLint",
    prettier: "Prettier",
    oxlint: "Oxlint",
    ultracite: "Ultracite",
    lefthook: "Lefthook",
    husky: "Husky",
    knip: "Knip",
    gitleaks: "Gitleaks",
    ruler: "Ruler",
  },
  documentation: {
    starlight: "Starlight",
    fumadocs: "Fumadocs",
  },
  appShells: {
    pwa: "PWA",
    tauri: "Tauri",
    electron: "Electron",
    capacitor: "Capacitor",
    wxt: "WXT",
    opentui: "OpenTUI",
  },
  appPlatforms: {
    turborepo: "Turborepo",
    nx: "Nx",
    "vite-plus": "Vite+",
    mcp: "MCP",
    msw: "MSW",
    swr: "SWR",
    "tanstack-query": "TanStack Query",
    "tanstack-table": "TanStack Table",
    "tanstack-virtual": "TanStack Virtual",
    "tanstack-db": "TanStack DB",
    "tanstack-pacer": "TanStack Pacer",
    devcontainer: "DevContainer",
    "docker-compose": "Docker Compose",
    kong: "Kong Gateway",
    "github-actions": "GitHub Actions",
    axios: "Axios",
    firebase: "Firebase JS SDK",
    "graphql-codegen": "GraphQL Code Generator",
    "openapi-typescript": "openapi-typescript",
    "apollo-client": "Apollo Client",
  },
  versionChannel: {
    stable: "Stable",
    latest: "Latest",
    beta: "Beta",
  },
  examples: {
    ai: "AI Example",
    "chat-sdk": "Chat SDK Bots",
  },
  ai: {
    "vercel-ai": "Vercel AI SDK",
    voltagent: "VoltAgent",
    langgraph: "LangGraph.js",
    "openai-agents": "OpenAI Agents SDK",
    "openai-sdk": "OpenAI SDK",
    "anthropic-sdk": "Anthropic SDK",
    "google-adk": "Google ADK",
    modelfusion: "ModelFusion",
    langchain: "LangChain",
    llamaindex: "LlamaIndex",
    "tanstack-ai": "TanStack AI",
    "ai-cli": "AI CLI",
  },
  aiDocs: {
    "claude-md": "CLAUDE.md",
    "agents-md": "AGENTS.md",
    cursorrules: ".cursorrules",
  },
  git: { true: "Git", false: "No Git" },
  install: { true: "Install Dependencies", false: "Skip Install" },
  effect: {
    effect: "Effect Core",
    "effect-full": "Effect Platform + SQL",
  },
  shadcnBase: {
    radix: "Radix UI",
    base: "Base UI",
  },
  shadcnStyle: {
    vega: "Vega",
    nova: "Nova",
    maia: "Maia",
    lyra: "Lyra",
    mira: "Mira",
    luma: "Luma",
    sera: "Sera",
  },
  shadcnIconLibrary: {
    lucide: "Lucide",
    tabler: "Tabler Icons",
    hugeicons: "HugeIcons",
    phosphor: "Phosphor Icons",
    remixicon: "Remix Icon",
    heroicons: "Heroicons",
    "react-icons": "React Icons",
  },
  shadcnColorTheme: {
    neutral: "Neutral",
  },
  shadcnBaseColor: {
    neutral: "Neutral",
  },
  shadcnFont: {
    inter: "Inter",
    geist: "Geist",
    figtree: "Figtree",
    "noto-sans": "Noto Sans",
    "nunito-sans": "Nunito Sans",
    roboto: "Roboto",
    raleway: "Raleway",
    "dm-sans": "DM Sans",
    "public-sans": "Public Sans",
    outfit: "Outfit",
    "jetbrains-mono": "JetBrains Mono",
    "geist-mono": "Geist Mono",
  },
  shadcnRadius: {
    default: "Default",
  },
  rustWebFramework: {
    axum: "Axum",
    "actix-web": "Actix-web",
    rocket: "Rocket",
    poem: "Poem",
    loco: "Loco",
    warp: "Warp",
    salvo: "Salvo",
  },
  rustFrontend: {
    leptos: "Leptos",
    dioxus: "Dioxus",
    yew: "Yew",
  },
  dotnetFrontend: {
    "blazor-webassembly": "Blazor WebAssembly",
    "blazor-web-app": "Blazor Web App",
  },
  kotlinMobile: {
    "jetpack-compose": "Jetpack Compose",
    "compose-multiplatform": "Compose Multiplatform",
  },
  kotlinMobileLibraries: {
    "navigation-compose": "Navigation Compose",
    voyager: "Voyager",
    koin: "Koin",
    "ktor-client": "Ktor Client",
    "kotlinx-serialization-json": "Kotlinx Serialization JSON",
    datastore: "DataStore",
    coil: "Coil",
    mockk: "MockK",
    turbine: "Turbine",
    junit5: "JUnit 5",
  },
  swiftMobile: {
    swiftui: "SwiftUI",
  },
  dartMobile: {
    flutter: "Flutter",
  },
  rustOrm: {
    "sea-orm": "SeaORM",
    sqlx: "SQLx",
    diesel: "Diesel",
    mongodb: "MongoDB Rust Driver",
    rusqlite: "rusqlite",
    "tokio-postgres": "tokio-postgres",
  },
  rustApi: {
    "async-graphql": "async-graphql",
    tonic: "Tonic",
    jsonrpsee: "jsonrpsee",
  },
  rustCli: {
    clap: "Clap",
    ratatui: "Ratatui",
  },
  rustLibraries: {
    serde: "Serde",
    uuid: "uuid",
    chrono: "Chrono",
    reqwest: "Reqwest",
    config: "config",
    dashmap: "DashMap",
    "parking-lot": "parking_lot",
    secrecy: "Secrecy",
    "tokio-util": "Tokio Util",
    utoipa: "utoipa",
    validator: "Validator",
    jsonwebtoken: "jsonwebtoken",
    argon2: "Argon2",
    "tokio-test": "Tokio Test",
    mockall: "Mockall",
    proptest: "Proptest",
    insta: "Insta",
    rand: "rand",
    regex: "regex",
    rayon: "Rayon",
    itertools: "Itertools",
    rstest: "rstest",
    "cargo-nextest": "cargo-nextest",
    "cargo-audit": "cargo-audit",
  },
  rustLogging: {
    tracing: "Tracing",
    "env-logger": "env_logger",
  },
  rustErrorHandling: {
    "anyhow-thiserror": "anyhow + thiserror",
    eyre: "eyre + color-eyre",
  },
  rustCaching: {
    moka: "Moka",
    redis: "Redis",
  },
  rustAuth: {
    oauth2: "OAuth2",
    torii: "Torii",
    openidconnect: "OpenID Connect",
    "tower-sessions": "tower-sessions",
  },
  rustRealtime: {
    "tokio-tungstenite": "tokio-tungstenite",
  },
  rustMessageQueue: {
    lapin: "Lapin (RabbitMQ)",
    rdkafka: "rdkafka (Kafka)",
    "async-nats": "async-nats",
  },
  rustObservability: {
    opentelemetry: "OpenTelemetry",
    metrics: "metrics",
  },
  rustTemplating: {
    askama: "Askama",
    tera: "Tera",
    minijinja: "MiniJinja",
  },
  pythonWebFramework: {
    fastapi: "FastAPI",
    django: "Django",
    flask: "Flask",
    litestar: "Litestar",
    starlette: "Starlette",
    aiohttp: "aiohttp",
    streamlit: "Streamlit",
  },
  pythonOrm: {
    sqlalchemy: "SQLAlchemy",
    sqlmodel: "SQLModel",
    "tortoise-orm": "Tortoise ORM",
    peewee: "Peewee",
    pymongo: "PyMongo",
  },
  pythonValidation: {
    pydantic: "Pydantic",
  },
  pythonAi: {
    langchain: "LangChain",
    llamaindex: "LlamaIndex",
    "openai-sdk": "OpenAI SDK",
    "anthropic-sdk": "Anthropic SDK",
    langgraph: "LangGraph",
    crewai: "CrewAI",
    haystack: "Haystack",
    "pydantic-ai": "Pydantic AI",
    "google-adk": "Google ADK",
    smolagents: "smolagents",
    pytorch: "PyTorch",
    transformers: "Transformers",
    "scikit-learn": "scikit-learn",
    tensorflow: "TensorFlow",
    mcp: "MCP Python SDK",
  },
  pythonAuth: {
    authlib: "Authlib",
    jwt: "JWT (python-jose)",
    pyjwt: "PyJWT",
    "fastapi-users": "FastAPI Users",
  },
  pythonApi: {
    "django-rest-framework": "Django REST Framework",
    "django-ninja": "Django Ninja",
  },
  pythonTaskQueue: {
    celery: "Celery",
    rq: "RQ",
    dramatiq: "Dramatiq",
    huey: "Huey",
    taskiq: "Taskiq",
  },
  pythonGraphql: {
    strawberry: "Strawberry",
    ariadne: "Ariadne",
  },
  pythonQuality: {
    ruff: "Ruff",
    mypy: "mypy",
    pyright: "Pyright",
  },
  pythonTesting: {
    pytest: "pytest",
    hypothesis: "Hypothesis",
    "pytest-cov": "pytest-cov",
  },
  pythonCaching: {
    redis: "redis-py",
    aiocache: "aiocache",
  },
  pythonRealtime: {
    "python-socketio": "python-socketio",
    websockets: "websockets",
  },
  pythonObservability: {
    opentelemetry: "OpenTelemetry",
    signoz: "SigNoz",
    "prometheus-client": "Prometheus Client",
  },
  pythonCli: {
    typer: "Typer",
    click: "Click",
    rich: "Rich",
  },
  pythonCloudSdk: {
    boto3: "Boto3",
  },
  pythonHttpClient: {
    requests: "Requests",
  },
  pythonData: {
    numpy: "NumPy",
    pandas: "pandas",
    scipy: "SciPy",
  },
  pythonMedia: {
    pillow: "Pillow",
  },
  pythonServer: {
    gunicorn: "Gunicorn",
  },
  pythonPackageManager: {
    uv: "uv",
    poetry: "Poetry",
  },
  pythonMessageQueue: {
    "confluent-kafka": "Confluent Kafka",
  },
  goWebFramework: {
    gin: "Gin",
    echo: "Echo",
    fiber: "Fiber",
    chi: "Chi",
    stdlib: "net/http",
    "go-zero": "go-zero",
    kratos: "Kratos",
    httprouter: "HttpRouter",
  },
  goOrm: {
    gorm: "GORM",
    sqlc: "sqlc",
    ent: "Ent",
    bun: "Bun",
    sqlx: "sqlx",
  },
  goApi: {
    "grpc-go": "gRPC-Go",
    gqlgen: "gqlgen",
    "grpc-gateway": "grpc-gateway",
    "connect-go": "Connect-Go",
    "oapi-codegen": "oapi-codegen",
  },
  goCli: {
    cobra: "Cobra",
    bubbletea: "Bubble Tea",
    "urfave-cli": "urfave/cli",
  },
  goLogging: {
    zap: "Zap",
    zerolog: "Zerolog",
    slog: "slog",
    logrus: "Logrus",
  },
  goAuth: {
    casbin: "Casbin",
    jwt: "golang-jwt",
    goth: "Goth",
    oauth2: "golang.org/x/oauth2",
  },
  goTesting: {
    testify: "Testify",
    gomock: "GoMock",
    testcontainers: "Testcontainers for Go",
    "ginkgo-gomega": "Ginkgo + Gomega",
    mockery: "mockery",
  },
  goRealtime: {
    "gorilla-websocket": "Gorilla WebSocket",
    centrifuge: "Centrifuge",
  },
  goMessageQueue: {
    nats: "NATS",
    watermill: "Watermill",
    "kafka-go": "kafka-go",
    asynq: "Asynq",
  },
  goCaching: {
    redis: "go-redis",
    ristretto: "Ristretto",
  },
  goConfig: {
    viper: "Viper",
    koanf: "Koanf",
  },
  goObservability: {
    opentelemetry: "OpenTelemetry",
    signoz: "SigNoz",
    prometheus: "Prometheus",
  },
  goValidation: {
    validator: "go-playground/validator",
  },
  goQuality: {
    "golangci-lint": "golangci-lint",
  },
  goMigrations: {
    "golang-migrate": "golang-migrate",
  },
  goTemplating: {
    templ: "templ",
  },
  goProtoTooling: {
    buf: "Buf",
  },
  goDI: {
    fx: "Uber Fx",
  },
  javaLanguage: {
    java: "Java",
    kotlin: "Kotlin",
  },
  javaWebFramework: {
    "spring-boot": "Spring Boot",
    ktor: "Ktor",
    quarkus: "Quarkus",
    micronaut: "Micronaut",
  },
  javaBuildTool: {
    maven: "Maven",
  },
  javaOrm: {
    "spring-data-jpa": "Spring Data JPA",
    jooq: "jOOQ",
    mybatis: "MyBatis",
  },
  javaAuth: {
    "spring-security": "Spring Security",
    keycloak: "Keycloak (OAuth2 Resource Server)",
  },
  javaApi: {
    "spring-graphql": "Spring for GraphQL",
    "openapi-generator": "OpenAPI Generator",
    grpc: "gRPC",
  },
  javaLogging: {
    logback: "Logback",
    log4j2: "Log4j2",
  },
  javaLibraries: {
    "spring-actuator": "Spring Boot Actuator",
    "spring-validation": "Spring Validation",
    flyway: "Flyway",
    liquibase: "Liquibase",
    "springdoc-openapi": "Springdoc OpenAPI",
    lombok: "Lombok",
    mapstruct: "MapStruct",
    caffeine: "Caffeine",
    resilience4j: "Resilience4j",
    "spring-webflux": "Spring WebFlux",
    "spring-batch": "Spring Batch",
    "spring-kafka": "Spring for Apache Kafka",
    "spring-mail": "Spring Mail",
    "spring-devtools": "Spring Boot DevTools",
    "micrometer-prometheus": "Micrometer Prometheus",
    thymeleaf: "Thymeleaf",
    "spring-amqp": "Spring AMQP (RabbitMQ)",
    "opentelemetry-java": "OpenTelemetry",
    "spring-data-redis": "Spring Data Redis",
    "spring-data-mongodb": "Spring Data MongoDB",
    "spring-data-elasticsearch": "Spring Data Elasticsearch",
    "spring-data-neo4j": "Spring Data Neo4j",
    "spring-data-cassandra": "Spring Data Cassandra",
    "spring-data-couchbase": "Spring Data Couchbase",
    "spring-data-jdbc": "Spring Data JDBC",
    "spring-data-rest": "Spring Data REST",
    "spring-quartz": "Quartz Scheduler",
    "spring-pulsar": "Spring for Apache Pulsar",
    "spring-integration": "Spring Integration",
    "spring-websocket": "Spring WebSocket",
    "spring-rsocket": "Spring RSocket",
    "spring-hateoas": "Spring HATEOAS",
    "spring-session-redis": "Spring Session Redis",
    "spring-session-jdbc": "Spring Session JDBC",
    "spring-ldap": "Spring LDAP",
    "spring-oauth2-client": "Spring Security OAuth2 Client",
    "spring-saml2": "Spring Security SAML2",
    "spring-restclient": "Spring REST Client",
  },
  javaTestingLibraries: {
    junit5: "JUnit 5",
    mockito: "Mockito",
    testcontainers: "Testcontainers",
    assertj: "AssertJ",
    "rest-assured": "REST Assured",
    wiremock: "WireMock",
    awaitility: "Awaitility",
    archunit: "ArchUnit",
    jqwik: "jqwik",
  },
  dotnetWebFramework: {
    "aspnet-minimal": "ASP.NET Core Minimal APIs",
    "aspnet-mvc": "ASP.NET Core MVC",
    "aspnet-blazor": "ASP.NET Core Blazor",
  },
  dotnetOrm: {
    "ef-core": "Entity Framework Core",
    dapper: "Dapper",
    linq2db: "linq2db",
  },
  dotnetAuth: {
    "aspnet-identity": "ASP.NET Core Identity",
    "duende-identityserver": "Duende IdentityServer",
    "auth0-aspnet": "Auth0 ASP.NET Core",
  },
  dotnetApi: {
    "minimal-api": "Minimal APIs",
    "graphql-hotchocolate": "Hot Chocolate GraphQL",
    "grpc-dotnet": "gRPC for .NET",
  },
  dotnetTesting: {
    xunit: "xUnit",
    nunit: "NUnit",
    moq: "Moq",
    "testcontainers-dotnet": "Testcontainers for .NET",
  },
  dotnetJobQueue: {
    hangfire: "Hangfire",
    "quartz-net": "Quartz.NET",
    "hosted-services": "Hosted Services",
  },
  dotnetRealtime: {
    signalr: "SignalR",
  },
  dotnetObservability: {
    "opentelemetry-dotnet": "OpenTelemetry .NET",
    serilog: "Serilog",
    nlog: "NLog",
    "health-checks": "Health Checks",
  },
  dotnetValidation: {
    fluentvalidation: "FluentValidation",
    "data-annotations": "Data Annotations",
  },
  dotnetCaching: {
    redis: "StackExchange.Redis",
    "memory-cache": "IMemoryCache",
  },
  dotnetDeploy: {
    docker: "Docker",
    azure: "Azure",
    aws: "AWS",
  },
  dotnetLibraries: {
    automapper: "AutoMapper",
    mediatr: "MediatR",
    fastendpoints: "FastEndpoints",
    "api-versioning": "ASP.NET API Versioning",
    scalar: "Scalar",
    polly: "Polly",
    masstransit: "MassTransit",
    rebus: "Rebus",
    coravel: "Coravel",
    "magic-onion": "MagicOnion",
    "prometheus-net": "prometheus-net",
    seq: "Seq",
    "application-insights": "Application Insights",
    sentry: "Sentry",
    "mongodb-driver": "MongoDB Driver",
    nhibernate: "NHibernate",
    mapster: "Mapster",
    scrutor: "Scrutor",
    refit: "Refit",
    "fluent-email": "FluentEmail",
  },
  elixirWebFramework: {
    phoenix: "Phoenix",
    "phoenix-live-view": "Phoenix LiveView",
  },
  elixirOrm: {
    ecto: "Ecto",
    "ecto-sql": "Ecto SQL",
    myxql: "MyXQL",
    ecto_sqlite3: "ecto_sqlite3",
  },
  elixirAuth: {
    "phx-gen-auth": "phx.gen.auth",
    ueberauth: "Ueberauth",
    guardian: "Guardian",
    pow: "Pow",
  },
  elixirApi: {
    rest: "Phoenix REST",
    absinthe: "Absinthe GraphQL",
    grpc: "gRPC (grpc-elixir)",
    open_api_spex: "OpenApiSpex",
  },
  elixirLibraries: {
    broadway: "Broadway",
    nx: "Nx (Numerical Elixir)",
    ex_aws: "ExAws",
    floki: "Floki",
    rustler: "Rustler",
  },
  elixirRealtime: {
    channels: "Phoenix Channels",
    presence: "Phoenix Presence",
    pubsub: "Phoenix PubSub",
    "live-view-streams": "LiveView Streams",
  },
  elixirJobs: {
    oban: "Oban",
    quantum: "Quantum",
  },
  elixirValidation: {
    "ecto-changesets": "Ecto Changesets",
    "nimble-options": "NimbleOptions",
  },
  elixirHttp: {
    req: "Req",
    finch: "Finch",
    tesla: "Tesla",
  },
  elixirJson: {
    jason: "Jason",
  },
  elixirEmail: {
    swoosh: "Swoosh",
    bamboo: "Bamboo",
  },
  elixirCaching: {
    cachex: "Cachex",
    nebulex: "Nebulex",
    redix: "Redix",
  },
  elixirObservability: {
    telemetry: "Telemetry",
    opentelemetry: "OpenTelemetry",
    prom_ex: "PromEx",
    sentry: "Sentry",
  },
  elixirTesting: {
    ex_unit: "ExUnit",
    mox: "Mox",
    bypass: "Bypass",
    wallaby: "Wallaby",
    stream_data: "StreamData",
    ex_machina: "ExMachina",
  },
  elixirQuality: {
    credo: "Credo",
    dialyxir: "Dialyxir",
    sobelow: "Sobelow",
    excoveralls: "ExCoveralls",
    mix_audit: "MixAudit",
  },
  elixirI18n: {
    gettext: "Gettext",
  },
  elixirHttpServer: {
    bandit: "Bandit",
    cowboy: "Cowboy",
  },
  elixirApplicationFramework: {
    ash: "Ash Framework",
  },
  elixirDocumentation: {
    ex_doc: "ExDoc",
  },
  elixirClustering: {
    libcluster: "libcluster",
  },
  elixirDeploy: {
    docker: "Docker",
    fly: "Fly.io",
    gigalixir: "Gigalixir",
    "mix-release": "Mix Release",
  },
};

const OPTION_ALIASES: Partial<Record<OptionCategory, Partial<Record<string, readonly string[]>>>> =
  {
    webFrontend: {
      svelte: ["sveltekit"],
    },
    backend: {
      "self-svelte": ["self-sveltekit"],
    },
  };

const CLI_VALUE_OVERRIDES: Partial<Record<OptionCategory, Partial<Record<string, string>>>> = {
  backend: {
    "self-next": "self",
    "self-vinext": "self",
    "self-tanstack-start": "self",
    "self-astro": "self",
    "self-nuxt": "self",
    "self-svelte": "self",
    "self-solid-start": "self",
  },
};

const TOKEN_LABELS: Record<string, string> = {
  ai: "AI",
  api: "API",
  auth: "Auth",
  css: "CSS",
  db: "DB",
  graphql: "GraphQL",
  grpc: "gRPC",
  js: "JS",
  md: "MD",
  orm: "ORM",
  sdk: "SDK",
  ses: "SES",
  sql: "SQL",
  ui: "UI",
};

function toStartCaseToken(token: string): string {
  const lower = token.toLowerCase();
  if (TOKEN_LABELS[lower]) return TOKEN_LABELS[lower];
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

function humanizeOptionId(id: string): string {
  return id.split("-").filter(Boolean).map(toStartCaseToken).join(" ");
}

function getOptionLabel(category: OptionCategory, id: string): string {
  if (category === "auth") {
    return (
      getCapabilityDefinitions("auth").find((option) => option.id === id)?.label ??
      humanizeOptionId(id)
    );
  }
  return EXACT_LABEL_OVERRIDES[category]?.[id] ?? humanizeOptionId(id);
}

function getOptionAliases(category: OptionCategory, id: string): readonly string[] {
  return OPTION_ALIASES[category]?.[id] ?? [];
}

function getCliValue(category: OptionCategory, id: string): string {
  return CLI_VALUE_OVERRIDES[category]?.[id] ?? id;
}

function buildCategoryMetadata(category: OptionCategory): OptionCategoryMetadata {
  return {
    selectionMode: MULTI_SELECT_CATEGORIES.has(category) ? "multiple" : "single",
    options: CATEGORY_VALUE_IDS[category].map((id) => ({
      id,
      label: getOptionLabel(category, id),
      aliases: getOptionAliases(category, id),
      cliValue: getCliValue(category, id),
    })),
  };
}

export const OPTION_CATEGORY_METADATA: Record<OptionCategory, OptionCategoryMetadata> = {
  api: buildCategoryMetadata("api"),
  webFrontend: buildCategoryMetadata("webFrontend"),
  nativeFrontend: buildCategoryMetadata("nativeFrontend"),
  astroIntegration: buildCategoryMetadata("astroIntegration"),
  runtime: buildCategoryMetadata("runtime"),
  backend: buildCategoryMetadata("backend"),
  database: buildCategoryMetadata("database"),
  orm: buildCategoryMetadata("orm"),
  dbSetup: buildCategoryMetadata("dbSetup"),
  webDeploy: buildCategoryMetadata("webDeploy"),
  serverDeploy: buildCategoryMetadata("serverDeploy"),
  auth: buildCategoryMetadata("auth"),
  payments: buildCategoryMetadata("payments"),
  email: buildCategoryMetadata("email"),
  fileUpload: buildCategoryMetadata("fileUpload"),
  logging: buildCategoryMetadata("logging"),
  observability: buildCategoryMetadata("observability"),
  backendLibraries: buildCategoryMetadata("backendLibraries"),
  stateManagement: buildCategoryMetadata("stateManagement"),
  forms: buildCategoryMetadata("forms"),
  validation: buildCategoryMetadata("validation"),
  testing: buildCategoryMetadata("testing"),
  realtime: buildCategoryMetadata("realtime"),
  jobQueue: buildCategoryMetadata("jobQueue"),
  caching: buildCategoryMetadata("caching"),
  rateLimit: buildCategoryMetadata("rateLimit"),
  botProtection: buildCategoryMetadata("botProtection"),
  i18n: buildCategoryMetadata("i18n"),
  search: buildCategoryMetadata("search"),
  vectorDb: buildCategoryMetadata("vectorDb"),
  fileStorage: buildCategoryMetadata("fileStorage"),
  animation: buildCategoryMetadata("animation"),
  cssFramework: buildCategoryMetadata("cssFramework"),
  uiLibrary: buildCategoryMetadata("uiLibrary"),
  cms: buildCategoryMetadata("cms"),
  featureFlags: buildCategoryMetadata("featureFlags"),
  integrations: buildCategoryMetadata("integrations"),
  ecommerce: buildCategoryMetadata("ecommerce"),
  analytics: buildCategoryMetadata("analytics"),
  mobileNavigation: buildCategoryMetadata("mobileNavigation"),
  mobileUI: buildCategoryMetadata("mobileUI"),
  mobileStorage: buildCategoryMetadata("mobileStorage"),
  mobileTesting: buildCategoryMetadata("mobileTesting"),
  mobilePush: buildCategoryMetadata("mobilePush"),
  mobileOTA: buildCategoryMetadata("mobileOTA"),
  mobileDeepLinking: buildCategoryMetadata("mobileDeepLinking"),
  mobileLibraries: buildCategoryMetadata("mobileLibraries"),
  codeQuality: buildCategoryMetadata("codeQuality"),
  documentation: buildCategoryMetadata("documentation"),
  appShells: buildCategoryMetadata("appShells"),
  appPlatforms: buildCategoryMetadata("appPlatforms"),
  toolchainProfile: buildCategoryMetadata("toolchainProfile"),
  workspaceRunner: buildCategoryMetadata("workspaceRunner"),
  codeQualityProfile: buildCategoryMetadata("codeQualityProfile"),
  gitHooks: buildCategoryMetadata("gitHooks"),
  staticAnalysis: buildCategoryMetadata("staticAnalysis"),
  aiTooling: buildCategoryMetadata("aiTooling"),
  testingTools: buildCategoryMetadata("testingTools"),
  dataClient: buildCategoryMetadata("dataClient"),
  frontendUtilities: buildCategoryMetadata("frontendUtilities"),
  httpClientTool: buildCategoryMetadata("httpClientTool"),
  codeGeneration: buildCategoryMetadata("codeGeneration"),
  developerEnvironment: buildCategoryMetadata("developerEnvironment"),
  containerOrchestration: buildCategoryMetadata("containerOrchestration"),
  apiGateway: buildCategoryMetadata("apiGateway"),
  continuousIntegration: buildCategoryMetadata("continuousIntegration"),
  backendUtilitiesTool: buildCategoryMetadata("backendUtilitiesTool"),
  packageManager: buildCategoryMetadata("packageManager"),
  workspaceShape: buildCategoryMetadata("workspaceShape"),
  versionChannel: buildCategoryMetadata("versionChannel"),
  examples: buildCategoryMetadata("examples"),
  ai: buildCategoryMetadata("ai"),
  aiDocs: buildCategoryMetadata("aiDocs"),
  git: buildCategoryMetadata("git"),
  install: buildCategoryMetadata("install"),
  effect: buildCategoryMetadata("effect"),
  shadcnBase: buildCategoryMetadata("shadcnBase"),
  shadcnStyle: buildCategoryMetadata("shadcnStyle"),
  shadcnIconLibrary: buildCategoryMetadata("shadcnIconLibrary"),
  shadcnColorTheme: buildCategoryMetadata("shadcnColorTheme"),
  shadcnBaseColor: buildCategoryMetadata("shadcnBaseColor"),
  shadcnFont: buildCategoryMetadata("shadcnFont"),
  shadcnRadius: buildCategoryMetadata("shadcnRadius"),
  rustWebFramework: buildCategoryMetadata("rustWebFramework"),
  rustFrontend: buildCategoryMetadata("rustFrontend"),
  dotnetFrontend: buildCategoryMetadata("dotnetFrontend"),
  kotlinMobile: buildCategoryMetadata("kotlinMobile"),
  kotlinMobileLibraries: buildCategoryMetadata("kotlinMobileLibraries"),
  swiftMobile: buildCategoryMetadata("swiftMobile"),
  dartMobile: buildCategoryMetadata("dartMobile"),
  rustOrm: buildCategoryMetadata("rustOrm"),
  rustApi: buildCategoryMetadata("rustApi"),
  rustCli: buildCategoryMetadata("rustCli"),
  rustLibraries: buildCategoryMetadata("rustLibraries"),
  rustLogging: buildCategoryMetadata("rustLogging"),
  rustErrorHandling: buildCategoryMetadata("rustErrorHandling"),
  rustCaching: buildCategoryMetadata("rustCaching"),
  rustAuth: buildCategoryMetadata("rustAuth"),
  rustRealtime: buildCategoryMetadata("rustRealtime"),
  rustMessageQueue: buildCategoryMetadata("rustMessageQueue"),
  rustObservability: buildCategoryMetadata("rustObservability"),
  rustTemplating: buildCategoryMetadata("rustTemplating"),
  pythonWebFramework: buildCategoryMetadata("pythonWebFramework"),
  pythonOrm: buildCategoryMetadata("pythonOrm"),
  pythonValidation: buildCategoryMetadata("pythonValidation"),
  pythonAi: buildCategoryMetadata("pythonAi"),
  pythonAuth: buildCategoryMetadata("pythonAuth"),
  pythonApi: buildCategoryMetadata("pythonApi"),
  pythonTaskQueue: buildCategoryMetadata("pythonTaskQueue"),
  pythonGraphql: buildCategoryMetadata("pythonGraphql"),
  pythonQuality: buildCategoryMetadata("pythonQuality"),
  pythonTesting: buildCategoryMetadata("pythonTesting"),
  pythonCaching: buildCategoryMetadata("pythonCaching"),
  pythonRealtime: buildCategoryMetadata("pythonRealtime"),
  pythonObservability: buildCategoryMetadata("pythonObservability"),
  pythonCli: buildCategoryMetadata("pythonCli"),
  pythonCloudSdk: buildCategoryMetadata("pythonCloudSdk"),
  pythonHttpClient: buildCategoryMetadata("pythonHttpClient"),
  pythonData: buildCategoryMetadata("pythonData"),
  pythonMedia: buildCategoryMetadata("pythonMedia"),
  pythonServer: buildCategoryMetadata("pythonServer"),
  pythonPackageManager: buildCategoryMetadata("pythonPackageManager"),
  pythonMessageQueue: buildCategoryMetadata("pythonMessageQueue"),
  goWebFramework: buildCategoryMetadata("goWebFramework"),
  goOrm: buildCategoryMetadata("goOrm"),
  goApi: buildCategoryMetadata("goApi"),
  goCli: buildCategoryMetadata("goCli"),
  goLogging: buildCategoryMetadata("goLogging"),
  goAuth: buildCategoryMetadata("goAuth"),
  goTesting: buildCategoryMetadata("goTesting"),
  goRealtime: buildCategoryMetadata("goRealtime"),
  goMessageQueue: buildCategoryMetadata("goMessageQueue"),
  goCaching: buildCategoryMetadata("goCaching"),
  goConfig: buildCategoryMetadata("goConfig"),
  goObservability: buildCategoryMetadata("goObservability"),
  goValidation: buildCategoryMetadata("goValidation"),
  goQuality: buildCategoryMetadata("goQuality"),
  goMigrations: buildCategoryMetadata("goMigrations"),
  goTemplating: buildCategoryMetadata("goTemplating"),
  goProtoTooling: buildCategoryMetadata("goProtoTooling"),
  goDI: buildCategoryMetadata("goDI"),
  javaLanguage: buildCategoryMetadata("javaLanguage"),
  javaWebFramework: buildCategoryMetadata("javaWebFramework"),
  javaBuildTool: buildCategoryMetadata("javaBuildTool"),
  javaOrm: buildCategoryMetadata("javaOrm"),
  javaAuth: buildCategoryMetadata("javaAuth"),
  javaApi: buildCategoryMetadata("javaApi"),
  javaLogging: buildCategoryMetadata("javaLogging"),
  javaLibraries: buildCategoryMetadata("javaLibraries"),
  javaTestingLibraries: buildCategoryMetadata("javaTestingLibraries"),
  dotnetWebFramework: buildCategoryMetadata("dotnetWebFramework"),
  dotnetOrm: buildCategoryMetadata("dotnetOrm"),
  dotnetAuth: buildCategoryMetadata("dotnetAuth"),
  dotnetApi: buildCategoryMetadata("dotnetApi"),
  dotnetTesting: buildCategoryMetadata("dotnetTesting"),
  dotnetJobQueue: buildCategoryMetadata("dotnetJobQueue"),
  dotnetRealtime: buildCategoryMetadata("dotnetRealtime"),
  dotnetObservability: buildCategoryMetadata("dotnetObservability"),
  dotnetValidation: buildCategoryMetadata("dotnetValidation"),
  dotnetCaching: buildCategoryMetadata("dotnetCaching"),
  dotnetDeploy: buildCategoryMetadata("dotnetDeploy"),
  dotnetLibraries: buildCategoryMetadata("dotnetLibraries"),
  elixirWebFramework: buildCategoryMetadata("elixirWebFramework"),
  elixirOrm: buildCategoryMetadata("elixirOrm"),
  elixirAuth: buildCategoryMetadata("elixirAuth"),
  elixirApi: buildCategoryMetadata("elixirApi"),
  elixirRealtime: buildCategoryMetadata("elixirRealtime"),
  elixirJobs: buildCategoryMetadata("elixirJobs"),
  elixirValidation: buildCategoryMetadata("elixirValidation"),
  elixirHttp: buildCategoryMetadata("elixirHttp"),
  elixirJson: buildCategoryMetadata("elixirJson"),
  elixirEmail: buildCategoryMetadata("elixirEmail"),
  elixirCaching: buildCategoryMetadata("elixirCaching"),
  elixirObservability: buildCategoryMetadata("elixirObservability"),
  elixirTesting: buildCategoryMetadata("elixirTesting"),
  elixirQuality: buildCategoryMetadata("elixirQuality"),
  elixirI18n: buildCategoryMetadata("elixirI18n"),
  elixirHttpServer: buildCategoryMetadata("elixirHttpServer"),
  elixirApplicationFramework: buildCategoryMetadata("elixirApplicationFramework"),
  elixirDocumentation: buildCategoryMetadata("elixirDocumentation"),
  elixirClustering: buildCategoryMetadata("elixirClustering"),
  elixirDeploy: buildCategoryMetadata("elixirDeploy"),
  elixirLibraries: buildCategoryMetadata("elixirLibraries"),
};

const OPTION_LOOKUP = Object.fromEntries(
  (Object.entries(OPTION_CATEGORY_METADATA) as Array<[OptionCategory, OptionCategoryMetadata]>).map(
    ([category, metadata]) => [
      category,
      new Map(
        metadata.options.flatMap((option) => [
          [option.id.toLowerCase(), option.id],
          ...option.aliases.map((alias) => [alias.toLowerCase(), option.id] as const),
        ]),
      ),
    ],
  ),
) as Record<OptionCategory, Map<string, string>>;

export function isMultiSelectCategory(category: OptionCategory): boolean {
  return OPTION_CATEGORY_METADATA[category].selectionMode === "multiple";
}

export function getOptionMetadata(
  category: OptionCategory,
  optionId: string,
): OptionMetadata | undefined {
  return OPTION_CATEGORY_METADATA[category].options.find((option) => option.id === optionId);
}

export function getCategoryOptionIds(category: OptionCategory): string[] {
  return OPTION_CATEGORY_METADATA[category].options.map((option) => option.id);
}

export function getCategoryCliValues(category: OptionCategory): string[] {
  return [...new Set(OPTION_CATEGORY_METADATA[category].options.map((option) => option.cliValue))];
}

export function normalizeOptionId(category: OptionCategory, value: string): string {
  const normalized = OPTION_LOOKUP[category].get(value.toLowerCase());
  return normalized ?? value;
}
