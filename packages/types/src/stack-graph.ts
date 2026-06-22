import type {
  Ecosystem,
  ProjectConfig,
  StackPart,
  StackPartEcosystem,
  StackPartRole,
  StackPartSource,
} from "./types";

import {
  getUnsupportedWebDeployFrontend,
  hasDockerComposeCompatibleFrontend,
  hasPWACompatibleFrontend,
  hasTanStackAICompatibleFrontend,
  hasTauriCompatibleFrontend,
  isBackendUtilsCompatibleBackend,
  isExampleAIAllowed,
  isExampleChatSdkAllowed,
  requiresChatSdkVercelAIForExamples,
  UI_LIBRARY_COMPATIBILITY,
} from "./stack-compatibility-rules";
import {
  ADDONS_VALUES,
  API_VALUES,
  AUTH_VALUES,
  AI_VALUES,
  ANALYTICS_VALUES,
  ANIMATION_VALUES,
  BACKEND_VALUES,
  CACHING_VALUES,
  CMS_VALUES,
  CSS_FRAMEWORK_VALUES,
  DATABASE_VALUES,
  DATABASE_SETUP_VALUES,
  DOTNET_API_VALUES,
  DOTNET_AUTH_VALUES,
  DOTNET_VALIDATION_VALUES,
  DOTNET_CACHING_VALUES,
  DOTNET_DEPLOY_VALUES,
  DOTNET_JOB_QUEUE_VALUES,
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
  ELIXIR_JOBS_VALUES,
  ELIXIR_OBSERVABILITY_VALUES,
  ELIXIR_ORM_VALUES,
  ELIXIR_REALTIME_VALUES,
  ELIXIR_TESTING_VALUES,
  ELIXIR_VALIDATION_VALUES,
  ELIXIR_WEB_FRAMEWORK_VALUES,
  EFFECT_VALUES,
  EMAIL_VALUES,
  EXAMPLES_VALUES,
  FEATURE_FLAGS_VALUES,
  FILE_STORAGE_VALUES,
  FILE_UPLOAD_VALUES,
  FORMS_VALUES,
  FRONTEND_VALUES,
  GO_API_VALUES,
  GO_AUTH_VALUES,
  GO_CACHING_VALUES,
  GO_CLI_VALUES,
  GO_CONFIG_VALUES,
  GO_LOGGING_VALUES,
  GO_MESSAGE_QUEUE_VALUES,
  GO_OBSERVABILITY_VALUES,
  GO_ORM_VALUES,
  GO_REALTIME_VALUES,
  GO_TESTING_VALUES,
  GO_WEB_FRAMEWORK_VALUES,
  JAVA_AUTH_VALUES,
  JAVA_API_VALUES,
  JAVA_LOGGING_VALUES,
  JAVA_BUILD_TOOL_VALUES,
  JAVA_LIBRARIES_VALUES,
  JAVA_ORM_VALUES,
  JAVA_TESTING_LIBRARIES_VALUES,
  JAVA_WEB_FRAMEWORK_VALUES,
  JOB_QUEUE_VALUES,
  LOGGING_VALUES,
  MOBILE_NAVIGATION_VALUES,
  MOBILE_STORAGE_VALUES,
  MOBILE_TESTING_VALUES,
  MOBILE_UI_VALUES,
  OBSERVABILITY_VALUES,
  ORM_VALUES,
  PAYMENTS_VALUES,
  PYTHON_API_VALUES,
  PYTHON_AI_VALUES,
  PYTHON_AUTH_VALUES,
  PYTHON_GRAPHQL_VALUES,
  PYTHON_ORM_VALUES,
  PYTHON_QUALITY_VALUES,
  PYTHON_TESTING_VALUES,
  PYTHON_CACHING_VALUES,
  PYTHON_REALTIME_VALUES,
  PYTHON_OBSERVABILITY_VALUES,
  PYTHON_CLI_VALUES,
  PYTHON_TASK_QUEUE_VALUES,
  PYTHON_VALIDATION_VALUES,
  PYTHON_WEB_FRAMEWORK_VALUES,
  RATE_LIMIT_VALUES,
  REALTIME_VALUES,
  RUNTIME_VALUES,
  RUST_API_VALUES,
  RUST_AUTH_VALUES,
  RUST_CACHING_VALUES,
  RUST_REALTIME_VALUES,
  RUST_MESSAGE_QUEUE_VALUES,
  RUST_OBSERVABILITY_VALUES,
  RUST_TEMPLATING_VALUES,
  RUST_CLI_VALUES,
  RUST_ERROR_HANDLING_VALUES,
  RUST_FRONTEND_VALUES,
  RUST_LIBRARIES_VALUES,
  RUST_LOGGING_VALUES,
  RUST_ORM_VALUES,
  RUST_WEB_FRAMEWORK_VALUES,
  SERVER_DEPLOY_VALUES,
  SEARCH_VALUES,
  I18N_VALUES,
  ELIXIR_HTTP_VALUES,
  ELIXIR_QUALITY_VALUES,
  StackPartRoleSchema,
  STATE_MANAGEMENT_VALUES,
  UI_LIBRARY_VALUES,
  VALIDATION_VALUES,
  WEB_DEPLOY_VALUES,
} from "./schemas";

export type StackPrimaryRole = Extract<
  StackPartRole,
  "frontend" | "backend" | "mobile" | "database"
>;
type LegacyBackendEcosystem = Exclude<Ecosystem, "typescript" | "react-native">;
type LegacyCapabilityRole = Extract<StackPartRole, "orm" | "api" | "auth">;

export type ProvidedCapabilityDefinition = {
  role: StackPartRole;
  toolId: string;
  ecosystem?: StackPartEcosystem;
  overrideable?: boolean;
};

export type ToolDefinition = {
  toolId: string;
  label?: string;
  roles: readonly StackPartRole[];
  ecosystems: readonly StackPartEcosystem[];
  legacyCategory?: keyof ProjectConfig;
  selectable?: boolean;
  allowMultiple?: boolean;
  ownerless?: boolean;
  provides?: readonly ProvidedCapabilityDefinition[];
};

export type StackPartOptionContext = {
  role: StackPartRole;
  ecosystem?: StackPartEcosystem;
  ownerRole?: StackPrimaryRole;
  ownerToolId?: string;
  ownerEcosystem?: StackPartEcosystem;
  siblingToolIdsByRole?: Partial<Record<StackPartRole, string | undefined>>;
  siblingToolIdsByRoleList?: Partial<Record<StackPartRole, readonly string[] | undefined>>;
  selectedToolIdsByRole?: Partial<Record<StackPartRole, string | undefined>>;
  selectedToolIdsByRoleList?: Partial<Record<StackPartRole, readonly string[] | undefined>>;
  primaryToolIdsByRole?: Partial<Record<StackPrimaryRole, string | undefined>>;
  primaryEcosystemsByRole?: Partial<Record<StackPrimaryRole, StackPartEcosystem | undefined>>;
};

export type StackGraphIssue = {
  code: string;
  message: string;
  partId?: string;
  role?: StackPartRole;
  toolId?: string;
};

export type StackGraphValidationResult = {
  issues: StackGraphIssue[];
};

export type StackGraphDiagnostic = {
  code: string;
  message: string;
  path?: string;
};

const PRIMARY_ROLES = new Set<StackPartRole>(["frontend", "backend", "mobile", "database"]);
const NATIVE_FRONTENDS = new Set(["native-bare", "native-uniwind", "native-unistyles"]);
const WEB_FRONTENDS = FRONTEND_VALUES.filter(
  (value) => value !== "none" && !NATIVE_FRONTENDS.has(value),
);
const DJANGO_API_TOOLS = new Set(["django-rest-framework", "django-ninja"]);
const JAVA_SPRING_CAPABILITY_TOOLS = new Set(["spring-data-jpa", "spring-security"]);
const TYPESCRIPT_TRPC_INCOMPATIBLE_FRONTENDS = new Set([
  "nuxt",
  "svelte",
  "solid",
  "solid-start",
]);
const BETTER_AUTH_UNSUPPORTED_ORM_TOOLS = new Set(["typeorm", "mikroorm", "sequelize"]);
const ELIXIR_ECTO_REQUIRED_TOOLS = new Set(["absinthe", "phx-gen-auth"]);
const ELIXIR_ECTO_SQL_REQUIRED_TOOLS = new Set(["oban"]);
const ELIXIR_PHOENIX_REQUIRED_ROLE_MESSAGES: Partial<Record<StackPartRole, string>> = {
  auth: "Elixir auth scaffolds require Phoenix",
  api: "Elixir API scaffolds require Phoenix",
  realtime: "Elixir realtime scaffolds require Phoenix",
};
const ELIXIR_UNSUPPORTED_GRAPH_TOOL_MESSAGES: Record<string, string> = {
  ecto: "Use Ecto SQL for generated Repo, migrations, schemas, and PostgreSQL wiring",
  ueberauth: "Ueberauth is not generated yet; use phx.gen.auth or no auth",
  guardian: "Guardian JWT wiring is not generated yet; use phx.gen.auth or no auth",
  "nimble-options": "NimbleOptions is not generated yet; use Ecto Changesets or no extra validation",
  nebulex: "Nebulex cache modules are not generated yet; use Cachex or no cache",
  opentelemetry:
    "OpenTelemetry setup is not generated yet; use Phoenix telemetry or no extra observability",
  prom_ex: "PromEx setup is not generated yet; use Phoenix telemetry or no extra observability",
  mox: "Mox-specific test boundaries are not generated yet; use ExUnit",
  bypass: "Bypass-specific HTTP tests are not generated yet; use ExUnit",
  wallaby: "Wallaby browser tests are not generated yet; use ExUnit",
  fly: "Fly.io config is not generated yet; use Docker or mix releases",
  gigalixir: "Gigalixir config is not generated yet; use Docker or mix releases",
};
export const ELIXIR_UNSUPPORTED_GRAPH_TOOLS = new Set(
  Object.keys(ELIXIR_UNSUPPORTED_GRAPH_TOOL_MESSAGES),
);

const ROLE_TARGET_PATHS: Record<StackPrimaryRole, string> = {
  frontend: "apps/web",
  backend: "apps/server",
  mobile: "apps/native",
  database: "packages/db",
};

const LEGACY_BACKEND_CATEGORY_BY_ECOSYSTEM = {
  rust: "rustWebFramework",
  python: "pythonWebFramework",
  go: "goWebFramework",
  java: "javaWebFramework",
  dotnet: "dotnetWebFramework",
  elixir: "elixirWebFramework",
} as const satisfies Record<LegacyBackendEcosystem, keyof ProjectConfig>;

const LEGACY_CAPABILITY_CATEGORIES_BY_ECOSYSTEM = {
  rust: { orm: "rustOrm", api: "rustApi", auth: "rustAuth" },
  python: { orm: "pythonOrm", api: "pythonApi", auth: "pythonAuth" },
  go: { orm: "goOrm", api: "goApi", auth: "goAuth" },
  java: { orm: "javaOrm", api: "javaApi", auth: "javaAuth" },
  dotnet: { orm: "dotnetOrm", api: "dotnetApi", auth: "dotnetAuth" },
  elixir: { orm: "elixirOrm", api: "elixirApi", auth: "elixirAuth" },
} as const satisfies Record<
  LegacyBackendEcosystem,
  Partial<Record<LegacyCapabilityRole, keyof ProjectConfig>>
>;

const LEGACY_TYPESCRIPT_BACKEND_SINGLE_CATEGORIES = {
  logging: "logging",
  email: "email",
  search: "search",
  caching: "caching",
  observability: "observability",
  jobQueue: "jobQueue",
  rateLimit: "rateLimit",
  fileStorage: "fileStorage",
  featureFlags: "featureFlags",
  payments: "payments",
  realtime: "realtime",
  ai: "ai",
  cms: "cms",
  // Shared web+server categories collapse onto the backend owner (inventory §5 decision 3);
  // without a TypeScript backend they stay flat-only, like the rest of this map.
  validation: "validation",
  effect: "effect",
} as const satisfies Partial<Record<StackPartRole, keyof ProjectConfig>>;

const LEGACY_TYPESCRIPT_BACKEND_INFRA_CATEGORIES = {
  runtime: "runtime",
  deploy: "serverDeploy",
} as const satisfies Partial<Record<StackPartRole, keyof ProjectConfig>>;

const LEGACY_TYPESCRIPT_FRONTEND_SINGLE_CATEGORIES = {
  deploy: "webDeploy",
  css: "cssFramework",
  ui: "uiLibrary",
  forms: "forms",
  stateManagement: "stateManagement",
  animation: "animation",
  fileUpload: "fileUpload",
  i18n: "i18n",
  analytics: "analytics",
} as const satisfies Partial<Record<StackPartRole, keyof ProjectConfig>>;

const LEGACY_DATABASE_SINGLE_CATEGORIES = {
  dbSetup: "dbSetup",
} as const satisfies Partial<Record<StackPartRole, keyof ProjectConfig>>;

const LEGACY_MOBILE_SINGLE_CATEGORIES = {
  navigation: "mobileNavigation",
  ui: "mobileUI",
  storage: "mobileStorage",
  testing: "mobileTesting",
} as const satisfies Partial<Record<StackPartRole, keyof ProjectConfig>>;

const LEGACY_BACKEND_ARRAY_CATEGORIES_BY_ECOSYSTEM = {
  rust: { libraries: "rustLibraries" },
  python: { ai: "pythonAi", testing: "pythonTesting", cli: "pythonCli" },
  go: { testing: "goTesting" },
  java: { libraries: "javaLibraries", testing: "javaTestingLibraries" },
  dotnet: { testing: "dotnetTesting", observability: "dotnetObservability" },
  elixir: { libraries: "elixirLibraries" },
} as const satisfies Record<
  LegacyBackendEcosystem,
  Partial<Record<StackPartRole, keyof ProjectConfig>>
>;

const CODE_QUALITY_ADDONS = new Set(["biome", "oxlint", "ultracite", "lefthook", "husky"]);
const DOCUMENTATION_ADDONS = new Set(["starlight", "fumadocs"]);
const FRONTEND_APP_PLATFORM_ADDONS = new Set(["pwa", "tauri", "wxt", "opentui"]);
const FRONTEND_DATA_FETCHING_ADDONS = new Set([
  "swr",
  "tanstack-query",
  "tanstack-table",
  "tanstack-virtual",
  "tanstack-db",
  "tanstack-pacer",
]);
const FRONTEND_TESTING_ADDONS = new Set(["msw", "storybook"]);
const WORKSPACE_TOOLING_ADDONS = new Set([
  "turborepo",
  "nx",
  "docker-compose",
  "devcontainer",
  "ruler",
  "mcp",
  "skills",
  "backend-utils",
]);
const LEGACY_ADDON_GRAPH_ROLES = new Set<StackPartRole>([
  "appPlatform",
  "codeQuality",
  "dataFetching",
  "documentation",
  "testing",
  "workspaceTooling",
]);
const LEGACY_ARRAY_CATEGORIES = new Set<keyof ProjectConfig>([
  "addons",
  "examples",
  "rustLibraries",
  "pythonAi",
  "javaLibraries",
  "javaTestingLibraries",
  "dotnetTesting",
  "dotnetObservability",
  "goTesting",
  "pythonTesting",
  "pythonCli",
  "elixirLibraries",
]);

export type AddonStackPartBinding = {
  role: StackPartRole;
  ecosystem: StackPartEcosystem;
  ownerRole?: "frontend" | "backend" | "database";
};

export function getAddonStackPartBinding(toolId: string): AddonStackPartBinding | undefined {
  if (CODE_QUALITY_ADDONS.has(toolId)) {
    return { role: "codeQuality", ecosystem: "universal" };
  }
  if (DOCUMENTATION_ADDONS.has(toolId)) {
    return { role: "documentation", ecosystem: "universal" };
  }
  if (FRONTEND_APP_PLATFORM_ADDONS.has(toolId)) {
    return { role: "appPlatform", ecosystem: "typescript", ownerRole: "frontend" };
  }
  if (FRONTEND_DATA_FETCHING_ADDONS.has(toolId)) {
    return { role: "dataFetching", ecosystem: "typescript", ownerRole: "frontend" };
  }
  if (FRONTEND_TESTING_ADDONS.has(toolId)) {
    return { role: "testing", ecosystem: "typescript", ownerRole: "frontend" };
  }
  if (WORKSPACE_TOOLING_ADDONS.has(toolId)) {
    return { role: "workspaceTooling", ecosystem: "universal" };
  }
  return undefined;
}

const OWNER_ROLES_BY_SCOPED_ROLE = {
  ...Object.fromEntries(
    [
      ...Object.keys(LEGACY_TYPESCRIPT_BACKEND_SINGLE_CATEGORIES),
      ...Object.keys(LEGACY_TYPESCRIPT_BACKEND_INFRA_CATEGORIES),
    ].map((role) => [role, ["backend"]]),
  ),
  ...Object.fromEntries(
    Object.keys(LEGACY_TYPESCRIPT_FRONTEND_SINGLE_CATEGORIES).map((role) => [role, ["frontend"]]),
  ),
  ...Object.fromEntries(
    Object.keys(LEGACY_MOBILE_SINGLE_CATEGORIES).map((role) => [role, ["mobile"]]),
  ),
  deploy: ["frontend", "backend"],
  dbSetup: ["database"],
  ui: ["frontend", "mobile"],
  appPlatform: ["frontend"],
  dataFetching: ["frontend"],
  testing: ["frontend", "mobile", "backend"],
  codeQuality: ["backend"],
  buildTool: ["backend"],
  cli: ["backend"],
  errorHandling: ["backend"],
  httpClient: ["backend"],
  libraries: ["backend"],
} as Partial<Record<StackPartRole, readonly StackPrimaryRole[]>>;

const FRESH_UNSUPPORTED_STATE_MANAGEMENT_TOOLS = new Set([
  "nanostores",
  "xstate",
  "tanstack-store",
]);
const RUNTIMELESS_TYPESCRIPT_BACKENDS = new Set([
  "convex",
  "none",
  "self",
  "self-next",
  "self-vinext",
  "self-tanstack-start",
  "self-astro",
  "self-nuxt",
  "self-svelte",
  "self-solid-start",
]);
const NO_SERVER_DEPLOY_TYPESCRIPT_BACKENDS = new Set([
  "none",
  "convex",
  "self",
  "self-next",
  "self-vinext",
  "self-tanstack-start",
  "self-astro",
  "self-nuxt",
  "self-svelte",
  "self-solid-start",
]);

type SharedNonTypeScriptBackendServiceRule = {
  allowedToolId: string;
  unsupportedToolMessage: string;
  javaNoBuildToolMessage: string;
};

const SHARED_NON_TYPESCRIPT_BACKEND_SERVICE_RULES: Partial<
  Record<StackPartRole, SharedNonTypeScriptBackendServiceRule>
> = {
  email: {
    allowedToolId: "resend",
    unsupportedToolMessage: "Only Resend email is available for non-TypeScript ecosystems",
    javaNoBuildToolMessage:
      "Resend email for Java requires Maven or Gradle to manage the SDK dependency",
  },
  observability: {
    allowedToolId: "sentry",
    unsupportedToolMessage: "Only Sentry observability is available for non-TypeScript ecosystems",
    javaNoBuildToolMessage:
      "Sentry observability for Java requires Maven or Gradle to manage the SDK dependency",
  },
  caching: {
    allowedToolId: "upstash-redis",
    unsupportedToolMessage: "Only Upstash Redis caching is available for non-TypeScript ecosystems",
    javaNoBuildToolMessage:
      "Upstash Redis caching for Java requires Maven or Gradle to manage the Redis client dependency",
  },
  search: {
    allowedToolId: "meilisearch",
    unsupportedToolMessage: "Only Meilisearch search is available for non-TypeScript ecosystems",
    javaNoBuildToolMessage:
      "Meilisearch search for Java requires Maven or Gradle to manage the SDK dependency",
  },
};

function isNativeEcosystemBackendServiceTool(
  part: Pick<StackPart, "role" | "toolId" | "ecosystem">,
) {
  if (part.role === "email" && part.ecosystem === "elixir") {
    return (ELIXIR_EMAIL_VALUES as readonly string[]).includes(part.toolId);
  }

  if (part.role === "caching") {
    if (part.ecosystem === "elixir") {
      return (ELIXIR_CACHING_VALUES as readonly string[]).includes(part.toolId);
    }
    if (part.ecosystem === "rust") {
      return (RUST_CACHING_VALUES as readonly string[]).includes(part.toolId);
    }
    if (part.ecosystem === "dotnet") {
      return (DOTNET_CACHING_VALUES as readonly string[]).includes(part.toolId);
    }
    if (part.ecosystem === "go") {
      return (GO_CACHING_VALUES as readonly string[]).includes(part.toolId);
    }
    if (part.ecosystem === "python") {
      return (PYTHON_CACHING_VALUES as readonly string[]).includes(part.toolId);
    }
  }

  if (part.role === "observability") {
    if (part.ecosystem === "elixir") {
      return (ELIXIR_OBSERVABILITY_VALUES as readonly string[]).includes(part.toolId);
    }
    if (part.ecosystem === "dotnet") {
      return (DOTNET_OBSERVABILITY_VALUES as readonly string[]).includes(part.toolId);
    }
    if (part.ecosystem === "go") {
      return (GO_OBSERVABILITY_VALUES as readonly string[]).includes(part.toolId);
    }
    if (part.ecosystem === "python") {
      return (PYTHON_OBSERVABILITY_VALUES as readonly string[]).includes(part.toolId);
    }
    if (part.ecosystem === "rust") {
      return (RUST_OBSERVABILITY_VALUES as readonly string[]).includes(part.toolId);
    }
  }

  return false;
}

// Phase 2 Batch 0/1 (docs/plans/planned/stack-graph-phase-0-library-inventory.md):
// registered backend-owned singles/extras that round-trip through the graph.
// pythonGraphql still stays flat-only in the legacy importer until the
// API/GraphQL role split is settled.
const LEGACY_EXTRA_CATEGORIES_BY_ECOSYSTEM = {
  rust: {
    caching: "rustCaching",
    cli: "rustCli",
    logging: "rustLogging",
    errorHandling: "rustErrorHandling",
    realtime: "rustRealtime",
    jobQueue: "rustMessageQueue",
    observability: "rustObservability",
    templating: "rustTemplating",
  },
  python: {
    validation: "pythonValidation",
    jobQueue: "pythonTaskQueue",
    api: "pythonGraphql",
    codeQuality: "pythonQuality",
    caching: "pythonCaching",
    realtime: "pythonRealtime",
    observability: "pythonObservability",
  },
  go: {
    cli: "goCli",
    logging: "goLogging",
    realtime: "goRealtime",
    jobQueue: "goMessageQueue",
    caching: "goCaching",
    config: "goConfig",
    observability: "goObservability",
  },
  java: { buildTool: "javaBuildTool", logging: "javaLogging" },
  dotnet: {
    jobQueue: "dotnetJobQueue",
    realtime: "dotnetRealtime",
    caching: "dotnetCaching",
    deploy: "dotnetDeploy",
    validation: "dotnetValidation",
  },
  elixir: {
    realtime: "elixirRealtime",
    jobQueue: "elixirJobs",
    validation: "elixirValidation",
    httpClient: "elixirHttp",
    email: "elixirEmail",
    caching: "elixirCaching",
    observability: "elixirObservability",
    testing: "elixirTesting",
    codeQuality: "elixirQuality",
    deploy: "elixirDeploy",
  },
} as const satisfies Record<
  LegacyBackendEcosystem,
  Partial<Record<StackPartRole, keyof ProjectConfig>>
>;

const GRAPH_PROJECTION_DEFAULT_LEGACY_CATEGORIES = [
  "backend",
  "database",
  "orm",
  "api",
  "auth",
  "rustFrontend",
  ...Object.values(LEGACY_BACKEND_CATEGORY_BY_ECOSYSTEM),
  ...Object.values(LEGACY_CAPABILITY_CATEGORIES_BY_ECOSYSTEM).flatMap((categories) =>
    Object.values(categories),
  ),
  ...Object.values(LEGACY_TYPESCRIPT_BACKEND_SINGLE_CATEGORIES),
  ...Object.values(LEGACY_TYPESCRIPT_BACKEND_INFRA_CATEGORIES),
  ...Object.values(LEGACY_TYPESCRIPT_FRONTEND_SINGLE_CATEGORIES),
  ...Object.values(LEGACY_DATABASE_SINGLE_CATEGORIES),
  ...Object.values(LEGACY_MOBILE_SINGLE_CATEGORIES),
  ...Object.values(LEGACY_EXTRA_CATEGORIES_BY_ECOSYSTEM).flatMap((categories) =>
    Object.values(categories),
  ),
] as Array<keyof ProjectConfig>;

function defineTools(
  values: readonly string[],
  role: StackPartRole,
  ecosystem: StackPartEcosystem,
  legacyCategory?: keyof ProjectConfig,
  options: Pick<ToolDefinition, "allowMultiple" | "ownerless"> = {},
): ToolDefinition[] {
  return values
    .filter((toolId) => toolId !== "none")
    .map((toolId) => {
      const definition: ToolDefinition = {
        toolId,
        roles: [role],
        ecosystems: [ecosystem],
        legacyCategory,
      };
      if (options.allowMultiple !== undefined) {
        definition.allowMultiple = options.allowMultiple;
      }
      if (options.ownerless !== undefined) {
        definition.ownerless = options.ownerless;
      }
      return definition;
    });
}

export const STACK_TOOL_DEFINITIONS: readonly ToolDefinition[] = [
  ...defineTools(WEB_FRONTENDS, "frontend", "typescript", "frontend"),
  ...defineTools([...NATIVE_FRONTENDS], "mobile", "react-native", "frontend"),
  ...defineTools(
    BACKEND_VALUES.filter((value) => value !== "convex"),
    "backend",
    "typescript",
    "backend",
  ),
  ...defineTools(DATABASE_VALUES, "database", "universal", "database"),
  ...defineTools(DATABASE_VALUES, "database", "typescript", "database"),
  ...defineTools(DATABASE_SETUP_VALUES, "dbSetup", "universal", "dbSetup"),
  ...defineTools(RUNTIME_VALUES, "runtime", "typescript", "runtime"),
  ...defineTools(WEB_DEPLOY_VALUES, "deploy", "typescript"),
  ...defineTools(SERVER_DEPLOY_VALUES, "deploy", "typescript"),
  ...defineTools(ORM_VALUES, "orm", "typescript", "orm"),
  ...defineTools(API_VALUES, "api", "typescript", "api"),
  ...defineTools(AUTH_VALUES, "auth", "typescript", "auth"),
  ...defineTools(CSS_FRAMEWORK_VALUES, "css", "typescript", "cssFramework"),
  ...defineTools(UI_LIBRARY_VALUES, "ui", "typescript", "uiLibrary"),
  ...defineTools(FORMS_VALUES, "forms", "typescript", "forms"),
  ...defineTools(STATE_MANAGEMENT_VALUES, "stateManagement", "typescript", "stateManagement"),
  ...defineTools(ANIMATION_VALUES, "animation", "typescript", "animation"),
  ...defineTools(FILE_UPLOAD_VALUES, "fileUpload", "typescript", "fileUpload"),
  ...defineTools(I18N_VALUES, "i18n", "typescript", "i18n"),
  ...defineTools(ANALYTICS_VALUES, "analytics", "typescript", "analytics"),
  ...defineTools(
    ADDONS_VALUES.filter((value) => CODE_QUALITY_ADDONS.has(value)),
    "codeQuality",
    "universal",
    undefined,
    { allowMultiple: true, ownerless: true },
  ),
  ...defineTools(
    ADDONS_VALUES.filter((value) => DOCUMENTATION_ADDONS.has(value)),
    "documentation",
    "universal",
    undefined,
    { allowMultiple: true, ownerless: true },
  ),
  ...defineTools(
    ADDONS_VALUES.filter((value) => FRONTEND_APP_PLATFORM_ADDONS.has(value)),
    "appPlatform",
    "typescript",
    undefined,
    { allowMultiple: true },
  ),
  ...defineTools(
    ADDONS_VALUES.filter((value) => FRONTEND_DATA_FETCHING_ADDONS.has(value)),
    "dataFetching",
    "typescript",
    undefined,
    { allowMultiple: true },
  ),
  ...defineTools(
    ADDONS_VALUES.filter((value) => FRONTEND_TESTING_ADDONS.has(value)),
    "testing",
    "typescript",
    undefined,
    { allowMultiple: true },
  ),
  ...defineTools(
    ADDONS_VALUES.filter((value) => WORKSPACE_TOOLING_ADDONS.has(value)),
    "workspaceTooling",
    "universal",
    undefined,
    { allowMultiple: true, ownerless: true },
  ),
  ...defineTools(EXAMPLES_VALUES, "examples", "universal", undefined, {
    allowMultiple: true,
    ownerless: true,
  }),
  ...defineTools(LOGGING_VALUES, "logging", "typescript", "logging"),
  ...defineTools(EMAIL_VALUES, "email", "typescript", "email"),
  ...defineTools(SEARCH_VALUES, "search", "typescript", "search"),
  ...defineTools(CACHING_VALUES, "caching", "typescript", "caching"),
  ...defineTools(OBSERVABILITY_VALUES, "observability", "typescript", "observability"),
  ...defineTools(JOB_QUEUE_VALUES, "jobQueue", "typescript", "jobQueue"),
  ...defineTools(RATE_LIMIT_VALUES, "rateLimit", "typescript", "rateLimit"),
  ...defineTools(FILE_STORAGE_VALUES, "fileStorage", "typescript", "fileStorage"),
  ...defineTools(FEATURE_FLAGS_VALUES, "featureFlags", "typescript", "featureFlags"),
  ...defineTools(PAYMENTS_VALUES, "payments", "typescript", "payments"),
  ...defineTools(REALTIME_VALUES, "realtime", "typescript", "realtime"),
  ...defineTools(AI_VALUES, "ai", "typescript", "ai"),
  ...defineTools(CMS_VALUES, "cms", "typescript", "cms"),
  ...defineTools(VALIDATION_VALUES, "validation", "typescript", "validation"),
  ...defineTools(EFFECT_VALUES, "effect", "typescript", "effect"),
  ...defineTools(AUTH_VALUES, "auth", "react-native", "auth"),
  ...defineTools(MOBILE_NAVIGATION_VALUES, "navigation", "react-native", "mobileNavigation"),
  ...defineTools(MOBILE_UI_VALUES, "ui", "react-native", "mobileUI"),
  ...defineTools(MOBILE_STORAGE_VALUES, "storage", "react-native", "mobileStorage"),
  ...defineTools(MOBILE_TESTING_VALUES, "testing", "react-native", "mobileTesting"),
  ...defineTools(RUST_WEB_FRAMEWORK_VALUES, "backend", "rust", "rustWebFramework"),
  ...defineTools(RUST_FRONTEND_VALUES, "frontend", "rust", "rustFrontend"),
  ...defineTools(RUST_ORM_VALUES, "orm", "rust", "rustOrm"),
  ...defineTools(RUST_API_VALUES, "api", "rust", "rustApi"),
  ...defineTools(RUST_AUTH_VALUES, "auth", "rust", "rustAuth"),
  ...defineTools(RUST_REALTIME_VALUES, "realtime", "rust", "rustRealtime"),
  ...defineTools(RUST_MESSAGE_QUEUE_VALUES, "jobQueue", "rust", "rustMessageQueue"),
  ...defineTools(RUST_OBSERVABILITY_VALUES, "observability", "rust", "rustObservability"),
  ...defineTools(RUST_TEMPLATING_VALUES, "templating", "rust", "rustTemplating"),
  ...defineTools(RUST_CLI_VALUES, "cli", "rust", "rustCli"),
  ...defineTools(RUST_LIBRARIES_VALUES, "libraries", "rust", "rustLibraries", {
    allowMultiple: true,
  }),
  ...defineTools(RUST_LOGGING_VALUES, "logging", "rust", "rustLogging"),
  ...defineTools(RUST_ERROR_HANDLING_VALUES, "errorHandling", "rust", "rustErrorHandling"),
  ...defineTools(RUST_CACHING_VALUES, "caching", "rust", "rustCaching"),
  ...defineTools(PYTHON_WEB_FRAMEWORK_VALUES, "backend", "python", "pythonWebFramework"),
  ...defineTools(PYTHON_ORM_VALUES, "orm", "python", "pythonOrm"),
  ...defineTools(PYTHON_VALIDATION_VALUES, "validation", "python", "pythonValidation"),
  ...defineTools(PYTHON_AI_VALUES, "ai", "python", "pythonAi", { allowMultiple: true }),
  ...defineTools(PYTHON_API_VALUES, "api", "python", "pythonApi"),
  ...defineTools(PYTHON_AUTH_VALUES, "auth", "python", "pythonAuth"),
  ...defineTools(PYTHON_TASK_QUEUE_VALUES, "jobQueue", "python", "pythonTaskQueue"),
  ...defineTools(PYTHON_GRAPHQL_VALUES, "api", "python", "pythonGraphql"),
  ...defineTools(PYTHON_QUALITY_VALUES, "codeQuality", "python", "pythonQuality"),
  ...defineTools(PYTHON_TESTING_VALUES, "testing", "python", "pythonTesting", {
    allowMultiple: true,
  }),
  ...defineTools(PYTHON_CACHING_VALUES, "caching", "python", "pythonCaching"),
  ...defineTools(PYTHON_REALTIME_VALUES, "realtime", "python", "pythonRealtime"),
  ...defineTools(PYTHON_OBSERVABILITY_VALUES, "observability", "python", "pythonObservability"),
  ...defineTools(PYTHON_CLI_VALUES, "cli", "python", "pythonCli", {
    allowMultiple: true,
  }),
  ...defineTools(GO_WEB_FRAMEWORK_VALUES, "backend", "go", "goWebFramework"),
  ...defineTools(GO_ORM_VALUES, "orm", "go", "goOrm"),
  ...defineTools(GO_API_VALUES, "api", "go", "goApi"),
  ...defineTools(GO_AUTH_VALUES, "auth", "go", "goAuth"),
  ...defineTools(GO_CLI_VALUES, "cli", "go", "goCli"),
  ...defineTools(GO_LOGGING_VALUES, "logging", "go", "goLogging"),
  ...defineTools(GO_TESTING_VALUES, "testing", "go", "goTesting", {
    allowMultiple: true,
  }),
  ...defineTools(GO_REALTIME_VALUES, "realtime", "go", "goRealtime"),
  ...defineTools(GO_MESSAGE_QUEUE_VALUES, "jobQueue", "go", "goMessageQueue"),
  ...defineTools(GO_CACHING_VALUES, "caching", "go", "goCaching"),
  ...defineTools(GO_CONFIG_VALUES, "config", "go", "goConfig"),
  ...defineTools(GO_OBSERVABILITY_VALUES, "observability", "go", "goObservability"),
  ...defineTools(JAVA_WEB_FRAMEWORK_VALUES, "backend", "java", "javaWebFramework"),
  ...defineTools(JAVA_BUILD_TOOL_VALUES, "buildTool", "java", "javaBuildTool"),
  ...defineTools(JAVA_ORM_VALUES, "orm", "java", "javaOrm"),
  ...defineTools(JAVA_AUTH_VALUES, "auth", "java", "javaAuth"),
  ...defineTools(JAVA_API_VALUES, "api", "java", "javaApi"),
  ...defineTools(JAVA_LOGGING_VALUES, "logging", "java", "javaLogging"),
  ...defineTools(JAVA_LIBRARIES_VALUES, "libraries", "java", "javaLibraries", {
    allowMultiple: true,
  }),
  ...defineTools(JAVA_TESTING_LIBRARIES_VALUES, "testing", "java", "javaTestingLibraries", {
    allowMultiple: true,
  }),
  ...defineTools(DOTNET_WEB_FRAMEWORK_VALUES, "backend", "dotnet", "dotnetWebFramework"),
  ...defineTools(DOTNET_ORM_VALUES, "orm", "dotnet", "dotnetOrm"),
  ...defineTools(DOTNET_AUTH_VALUES, "auth", "dotnet", "dotnetAuth"),
  ...defineTools(DOTNET_API_VALUES, "api", "dotnet", "dotnetApi"),
  ...defineTools(DOTNET_TESTING_VALUES, "testing", "dotnet", "dotnetTesting", {
    allowMultiple: true,
  }),
  ...defineTools(DOTNET_JOB_QUEUE_VALUES, "jobQueue", "dotnet", "dotnetJobQueue"),
  ...defineTools(DOTNET_REALTIME_VALUES, "realtime", "dotnet", "dotnetRealtime"),
  ...defineTools(DOTNET_OBSERVABILITY_VALUES, "observability", "dotnet", "dotnetObservability", {
    allowMultiple: true,
  }),
  ...defineTools(DOTNET_VALIDATION_VALUES, "validation", "dotnet", "dotnetValidation"),
  ...defineTools(DOTNET_CACHING_VALUES, "caching", "dotnet", "dotnetCaching"),
  ...defineTools(DOTNET_DEPLOY_VALUES, "deploy", "dotnet", "dotnetDeploy"),
  ...defineTools(ELIXIR_WEB_FRAMEWORK_VALUES, "backend", "elixir", "elixirWebFramework"),
  ...defineTools(ELIXIR_ORM_VALUES, "orm", "elixir", "elixirOrm"),
  ...defineTools(ELIXIR_AUTH_VALUES, "auth", "elixir", "elixirAuth"),
  ...defineTools(ELIXIR_API_VALUES, "api", "elixir", "elixirApi"),
  ...defineTools(ELIXIR_LIBRARIES_VALUES, "libraries", "elixir", "elixirLibraries", {
    allowMultiple: true,
  }),
  ...defineTools(ELIXIR_REALTIME_VALUES, "realtime", "elixir", "elixirRealtime"),
  ...defineTools(ELIXIR_JOBS_VALUES, "jobQueue", "elixir", "elixirJobs"),
  ...defineTools(ELIXIR_VALIDATION_VALUES, "validation", "elixir", "elixirValidation"),
  ...defineTools(ELIXIR_HTTP_VALUES, "httpClient", "elixir", "elixirHttp"),
  ...defineTools(ELIXIR_EMAIL_VALUES, "email", "elixir", "elixirEmail"),
  ...defineTools(ELIXIR_CACHING_VALUES, "caching", "elixir", "elixirCaching"),
  ...defineTools(ELIXIR_OBSERVABILITY_VALUES, "observability", "elixir", "elixirObservability"),
  ...defineTools(ELIXIR_TESTING_VALUES, "testing", "elixir", "elixirTesting"),
  ...defineTools(ELIXIR_QUALITY_VALUES, "codeQuality", "elixir", "elixirQuality"),
  ...defineTools(ELIXIR_DEPLOY_VALUES, "deploy", "elixir", "elixirDeploy"),
  {
    toolId: "convex",
    roles: ["backend"],
    ecosystems: ["typescript"],
    legacyCategory: "backend",
    provides: [
      { role: "database", toolId: "convex", ecosystem: "typescript", overrideable: false },
      { role: "api", toolId: "convex", ecosystem: "typescript", overrideable: false },
    ],
  },
  {
    toolId: "convex",
    roles: ["database", "api"],
    ecosystems: ["typescript"],
    selectable: false,
  },
];

function sanitizePartId(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9:._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getRoleTargetPath(role: StackPartRole): string | undefined {
  return PRIMARY_ROLES.has(role) ? ROLE_TARGET_PATHS[role as StackPrimaryRole] : undefined;
}

export function createStackPart(input: {
  role: StackPartRole;
  toolId: string;
  ecosystem: StackPartEcosystem;
  ownerPartId?: string;
  source?: StackPartSource;
  providedByPartId?: string;
  id?: string;
  targetPath?: string;
  settings?: Record<string, unknown>;
}): StackPart {
  const roleKey = input.ownerPartId ? `${input.ownerPartId}.${input.role}` : input.role;
  return {
    id: input.id ?? sanitizePartId(`${roleKey}:${input.ecosystem}:${input.toolId}`),
    role: input.role,
    toolId: input.toolId,
    ecosystem: input.ecosystem,
    ownerPartId: input.ownerPartId,
    source: input.source ?? "selected",
    providedByPartId: input.providedByPartId,
    targetPath: input.targetPath ?? getRoleTargetPath(input.role),
    settings: input.settings,
  };
}

function isNoneTool(toolId: string | undefined) {
  return !toolId || toolId === "none";
}

function isLegacyBackendEcosystem(
  ecosystem: StackPartEcosystem | undefined,
): ecosystem is LegacyBackendEcosystem {
  return ecosystem !== undefined && ecosystem in LEGACY_BACKEND_CATEGORY_BY_ECOSYSTEM;
}

function allowsCrossEcosystemOwner(
  part: Pick<StackPart, "role" | "ecosystem">,
  context: StackPartOptionContext,
) {
  if (part.ecosystem === "universal") return true;
  if (
    part.role === "auth" &&
    context.ownerRole === "mobile" &&
    part.ecosystem === "react-native"
  ) {
    return true;
  }
  return false;
}

function createStackGraphIssue(input: {
  code: string;
  message: string;
  partId?: string;
  role: StackPartRole;
  toolId: string;
}): StackGraphIssue {
  return {
    code: input.code,
    message: input.message,
    partId: input.partId,
    role: input.role,
    toolId: input.toolId,
  };
}

function createTypeScriptFrontendCompatibilityIssue(
  part: Pick<StackPart, "id" | "role" | "toolId" | "ecosystem">,
  context: StackPartOptionContext,
): StackGraphIssue | undefined {
  if (part.ecosystem !== "typescript" || context.ownerRole !== "frontend") return undefined;

  if (context.ownerToolId === "fresh") {
    if (part.role === "forms" && part.toolId === "tanstack-form") {
      return createStackGraphIssue({
        code: "INCOMPATIBLE_OWNER_TOOL",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: "'tanstack-form' has no Preact adapter for the Fresh frontend.",
      });
    }

    if (
      part.role === "stateManagement" &&
      FRESH_UNSUPPORTED_STATE_MANAGEMENT_TOOLS.has(part.toolId)
    ) {
      return createStackGraphIssue({
        code: "INCOMPATIBLE_OWNER_TOOL",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: `'${part.toolId}' requires React bindings and is not compatible with Fresh.`,
      });
    }

    if (part.role === "animation" && part.toolId === "lottie") {
      return createStackGraphIssue({
        code: "INCOMPATIBLE_OWNER_TOOL",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: "'lottie' uses lottie-react and is not compatible with Fresh.",
      });
    }
  }

  if (part.role === "i18n" && part.toolId === "next-intl" && context.ownerToolId !== "next") {
    return createStackGraphIssue({
      code: "INCOMPATIBLE_OWNER_TOOL",
      partId: part.id,
      role: part.role,
      toolId: part.toolId,
      message: "'next-intl' can only be selected for a Next.js frontend.",
    });
  }

  if (part.role === "ui") {
    const compatibility =
      UI_LIBRARY_COMPATIBILITY[part.toolId as keyof typeof UI_LIBRARY_COMPATIBILITY];
    if (
      compatibility &&
      context.ownerToolId &&
      !(compatibility.frontends as readonly string[]).includes(context.ownerToolId)
    ) {
      return createStackGraphIssue({
        code: "INCOMPATIBLE_OWNER_TOOL",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: `'${part.toolId}' is not compatible with the '${context.ownerToolId}' frontend.`,
      });
    }

    const cssTool = context.siblingToolIdsByRole?.css ?? "tailwind";
    if (compatibility && !(compatibility.cssFrameworks as readonly string[]).includes(cssTool)) {
      return createStackGraphIssue({
        code: "INCOMPATIBLE_GRAPH_SELECTION",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: `'${part.toolId}' is not compatible with the '${cssTool}' CSS framework.`,
      });
    }
  }

  if (part.role === "css") {
    const uiTool = context.siblingToolIdsByRole?.ui;
    const compatibility = uiTool
      ? UI_LIBRARY_COMPATIBILITY[uiTool as keyof typeof UI_LIBRARY_COMPATIBILITY]
      : undefined;
    if (
      compatibility &&
      !(compatibility.cssFrameworks as readonly string[]).includes(part.toolId)
    ) {
      return createStackGraphIssue({
        code: "INCOMPATIBLE_GRAPH_SELECTION",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: `'${uiTool}' is not compatible with the '${part.toolId}' CSS framework.`,
      });
    }
  }

  return undefined;
}

function createTypeScriptBackendCompatibilityIssue(
  part: Pick<StackPart, "id" | "role" | "toolId" | "ecosystem">,
  context: StackPartOptionContext,
): StackGraphIssue | undefined {
  if (part.ecosystem !== "typescript" || context.ownerRole !== "backend") return undefined;

  if (part.role === "payments" && part.toolId === "polar") {
    const authTool = context.siblingToolIdsByRole?.auth;
    if (authTool !== "better-auth" && authTool !== "better-auth-organizations") {
      return createStackGraphIssue({
        code: "INCOMPATIBLE_GRAPH_SELECTION",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: "Polar requires Better Auth.",
      });
    }

    const frontendTool = context.primaryToolIdsByRole?.frontend;
    if (!frontendTool || frontendTool === "none") {
      return createStackGraphIssue({
        code: "INCOMPATIBLE_GRAPH_SELECTION",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: "Polar requires a web frontend.",
      });
    }
  }

  if (part.role === "payments" && part.toolId === "dodo") {
    const frontendTool = context.primaryToolIdsByRole?.frontend;
    if (frontendTool === "react-vite") {
      return createStackGraphIssue({
        code: "INCOMPATIBLE_GRAPH_SELECTION",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: "Dodo Payments are not yet supported for React + Vite projects.",
      });
    }
  }

  if (part.role === "cms" && part.toolId === "payload") {
    const frontendTool = context.primaryToolIdsByRole?.frontend;
    if (frontendTool !== "next") {
      return createStackGraphIssue({
        code: "INCOMPATIBLE_GRAPH_SELECTION",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: "Payload CMS v3 requires a Next.js frontend.",
      });
    }
  }

  if (part.role === "ai") {
    const frontendTool = context.primaryToolIdsByRole?.frontend;
    const frontendTools = frontendTool ? [frontendTool] : [];
    const examples = context.selectedToolIdsByRoleList?.examples ?? [];
    const runtimeTool = context.siblingToolIdsByRole?.runtime ?? "bun";

    if (
      part.toolId !== "vercel-ai" &&
      requiresChatSdkVercelAIForExamples(context.ownerToolId, runtimeTool, examples)
    ) {
      return createStackGraphIssue({
        code: "INCOMPATIBLE_GRAPH_SELECTION",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: "Chat SDK example (Nuxt/Hono profile) requires Vercel AI SDK in v1.",
      });
    }

    if (part.toolId === "tanstack-ai" && !hasTanStackAICompatibleFrontend(frontendTools)) {
      return createStackGraphIssue({
        code: "INCOMPATIBLE_GRAPH_SELECTION",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: "TanStack AI requires React or Solid frontend (no Vue/Svelte/Angular adapter yet).",
      });
    }
  }

  return undefined;
}

function createSharedBackendServiceCompatibilityIssue(
  part: Pick<StackPart, "id" | "role" | "toolId" | "ecosystem">,
  context: StackPartOptionContext,
): StackGraphIssue | undefined {
  if (
    part.ecosystem === "typescript" ||
    part.ecosystem === "react-native" ||
    context.ownerRole !== "backend" ||
    part.toolId === "none"
  ) {
    return undefined;
  }

  const rule = SHARED_NON_TYPESCRIPT_BACKEND_SERVICE_RULES[part.role];
  if (!rule) return undefined;
  if (
    (!part.id.startsWith("candidate:") || part.id.startsWith("candidate:native:")) &&
    isNativeEcosystemBackendServiceTool(part)
  ) {
    return undefined;
  }

  if (part.toolId !== rule.allowedToolId) {
    return createStackGraphIssue({
      code: "INCOMPATIBLE_ECOSYSTEM_TOOL",
      partId: part.id,
      role: part.role,
      toolId: part.toolId,
      message: rule.unsupportedToolMessage,
    });
  }

  if (part.ecosystem === "java" && isNoneTool(context.siblingToolIdsByRole?.buildTool)) {
    return createStackGraphIssue({
      code: "INCOMPATIBLE_GRAPH_SELECTION",
      partId: part.id,
      role: part.role,
      toolId: part.toolId,
      message: rule.javaNoBuildToolMessage,
    });
  }

  return undefined;
}

function createMobileCompatibilityIssue(
  part: Pick<StackPart, "id" | "role" | "toolId" | "ecosystem">,
  context: StackPartOptionContext,
): StackGraphIssue | undefined {
  if (part.ecosystem !== "react-native" || context.ownerRole !== "mobile") return undefined;

  if (part.role === "ui") {
    if (part.toolId === "uniwind" && context.ownerToolId !== "native-uniwind") {
      return createStackGraphIssue({
        code: "INCOMPATIBLE_OWNER_TOOL",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: "Uniwind mobile UI requires the Expo + Uniwind frontend.",
      });
    }

    if (part.toolId === "unistyles" && context.ownerToolId !== "native-unistyles") {
      return createStackGraphIssue({
        code: "INCOMPATIBLE_OWNER_TOOL",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: "Unistyles mobile UI requires the Expo + Unistyles frontend.",
      });
    }

    if (
      ["tamagui", "gluestack-ui"].includes(part.toolId) &&
      ["native-uniwind", "native-unistyles"].includes(context.ownerToolId ?? "")
    ) {
      return createStackGraphIssue({
        code: "INCOMPATIBLE_OWNER_TOOL",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message:
          "Tamagui and Gluestack UI require the base Expo frontend to avoid conflicting styling setup.",
      });
    }
  }

  return undefined;
}

function createInfrastructureCompatibilityIssue(
  part: Pick<StackPart, "id" | "role" | "toolId" | "ecosystem">,
  context: StackPartOptionContext,
): StackGraphIssue | undefined {
  if (part.role === "runtime" && part.ecosystem === "typescript") {
    if (context.ownerRole !== "backend") return undefined;

    if (RUNTIMELESS_TYPESCRIPT_BACKENDS.has(context.ownerToolId ?? "none")) {
      return createStackGraphIssue({
        code: "INCOMPATIBLE_OWNER_TOOL",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: `'${context.ownerToolId}' does not use a separate backend runtime.`,
      });
    }

    if (part.toolId === "workers" && context.ownerToolId !== "hono") {
      return createStackGraphIssue({
        code: "INCOMPATIBLE_OWNER_TOOL",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: "Workers runtime currently requires the Hono backend.",
      });
    }
  }

  if (part.role === "deploy" && part.ecosystem === "typescript") {
    if (context.ownerRole === "frontend") {
      if (!(WEB_DEPLOY_VALUES as readonly string[]).includes(part.toolId)) {
        return createStackGraphIssue({
          code: "INCOMPATIBLE_OWNER_TOOL",
          partId: part.id,
          role: part.role,
          toolId: part.toolId,
          message: `'${part.toolId}' is not a web deployment target.`,
        });
      }

      if (part.toolId === "vercel" && ["redwood", "fresh"].includes(context.ownerToolId ?? "")) {
        return createStackGraphIssue({
          code: "INCOMPATIBLE_OWNER_TOOL",
          partId: part.id,
          role: part.role,
          toolId: part.toolId,
          message: `Vercel deployment is not available for the '${context.ownerToolId}' frontend.`,
        });
      }

      const unsupportedFrontend = getUnsupportedWebDeployFrontend(part.toolId, [
        context.ownerToolId ?? "none",
      ]);
      if (unsupportedFrontend) {
        return createStackGraphIssue({
          code: "INCOMPATIBLE_OWNER_TOOL",
          partId: part.id,
          role: part.role,
          toolId: part.toolId,
          message: `'${part.toolId}' web deployment is not wired for the '${unsupportedFrontend}' frontend.`,
        });
      }
    }

    if (context.ownerRole === "backend") {
      if (!(SERVER_DEPLOY_VALUES as readonly string[]).includes(part.toolId)) {
        return createStackGraphIssue({
          code: "INCOMPATIBLE_OWNER_TOOL",
          partId: part.id,
          role: part.role,
          toolId: part.toolId,
          message: `'${part.toolId}' is not a server deployment target.`,
        });
      }

      const backendTool = context.ownerToolId ?? "none";
      const runtimeTool = context.siblingToolIdsByRole?.runtime ?? "bun";

      if (part.toolId === "cloudflare") {
        if (runtimeTool !== "workers" || backendTool !== "hono") {
          return createStackGraphIssue({
            code: "INCOMPATIBLE_GRAPH_SELECTION",
            partId: part.id,
            role: part.role,
            toolId: part.toolId,
            message: "Cloudflare server deploy requires Workers runtime with the Hono backend.",
          });
        }
      }

      if (part.toolId === "vercel") {
        if (["nestjs", "adonisjs"].includes(backendTool)) {
          return createStackGraphIssue({
            code: "INCOMPATIBLE_OWNER_TOOL",
            partId: part.id,
            role: part.role,
            toolId: part.toolId,
            message: "Vercel serverless functions are incompatible with NestJS and AdonisJS.",
          });
        }
        if (backendTool === "encore") {
          return createStackGraphIssue({
            code: "INCOMPATIBLE_OWNER_TOOL",
            partId: part.id,
            role: part.role,
            toolId: part.toolId,
            message: "Encore manages its own deployment infrastructure.",
          });
        }
      }

      if (part.toolId === "netlify") {
        if (backendTool !== "hono") {
          return createStackGraphIssue({
            code: "INCOMPATIBLE_OWNER_TOOL",
            partId: part.id,
            role: part.role,
            toolId: part.toolId,
            message: "Netlify Functions server deploy is currently supported only with Hono.",
          });
        }
        if (runtimeTool !== "node") {
          return createStackGraphIssue({
            code: "INCOMPATIBLE_GRAPH_SELECTION",
            partId: part.id,
            role: part.role,
            toolId: part.toolId,
            message: "Netlify Functions server deploy requires Node.js runtime.",
          });
        }
      }

      if (NO_SERVER_DEPLOY_TYPESCRIPT_BACKENDS.has(backendTool)) {
        return createStackGraphIssue({
          code: "INCOMPATIBLE_OWNER_TOOL",
          partId: part.id,
          role: part.role,
          toolId: part.toolId,
          message: `'${backendTool}' does not use a separate server deployment target.`,
        });
      }
    }
  }

  if (part.role === "dbSetup") {
    const databaseTool = context.ownerToolId ?? "none";
    const runtimeTool = context.selectedToolIdsByRole?.runtime ?? "bun";

    if (part.toolId === "turso" && databaseTool !== "sqlite") {
      return createStackGraphIssue({
        code: "INCOMPATIBLE_OWNER_TOOL",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: "Turso database setup requires SQLite.",
      });
    }

    if (part.toolId === "d1") {
      if (databaseTool !== "sqlite") {
        return createStackGraphIssue({
          code: "INCOMPATIBLE_OWNER_TOOL",
          partId: part.id,
          role: part.role,
          toolId: part.toolId,
          message: "D1 database setup requires SQLite.",
        });
      }
      if (runtimeTool !== "workers") {
        return createStackGraphIssue({
          code: "INCOMPATIBLE_GRAPH_SELECTION",
          partId: part.id,
          role: part.role,
          toolId: part.toolId,
          message: "D1 database setup requires Workers runtime.",
        });
      }
    }

    if (
      (part.toolId === "neon" ||
        part.toolId === "supabase" ||
        part.toolId === "prisma-postgres") &&
      databaseTool !== "postgres"
    ) {
      return createStackGraphIssue({
        code: "INCOMPATIBLE_OWNER_TOOL",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: `'${part.toolId}' database setup requires PostgreSQL.`,
      });
    }

    if (part.toolId === "mongodb-atlas" && databaseTool !== "mongodb") {
      return createStackGraphIssue({
        code: "INCOMPATIBLE_OWNER_TOOL",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: "MongoDB Atlas setup requires MongoDB.",
      });
    }

    if (
      part.toolId === "planetscale" &&
      databaseTool !== "postgres" &&
      databaseTool !== "mysql"
    ) {
      return createStackGraphIssue({
        code: "INCOMPATIBLE_OWNER_TOOL",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: "PlanetScale setup requires PostgreSQL or MySQL.",
      });
    }

    if (part.toolId === "docker") {
      if (databaseTool === "sqlite") {
        return createStackGraphIssue({
          code: "INCOMPATIBLE_OWNER_TOOL",
          partId: part.id,
          role: part.role,
          toolId: part.toolId,
          message: "SQLite does not need Docker database setup.",
        });
      }
      if (runtimeTool === "workers") {
        return createStackGraphIssue({
          code: "INCOMPATIBLE_GRAPH_SELECTION",
          partId: part.id,
          role: part.role,
          toolId: part.toolId,
          message: "Docker database setup is incompatible with Workers runtime.",
        });
      }
    }
  }

  return undefined;
}

function createAddonCompatibilityIssue(
  part: Pick<StackPart, "id" | "role" | "toolId" | "ecosystem">,
  context: StackPartOptionContext,
): StackGraphIssue | undefined {
  const frontendTool = context.primaryToolIdsByRole?.frontend;
  const frontendTools = frontendTool ? [frontendTool] : [];
  const frontendEcosystem = context.primaryEcosystemsByRole?.frontend;
  const backendTool = context.primaryToolIdsByRole?.backend;
  const backendEcosystem = context.primaryEcosystemsByRole?.backend;
  const runtimeTool = context.selectedToolIdsByRole?.runtime ?? "bun";
  const apiTool = context.selectedToolIdsByRole?.api;

  if (part.role === "appPlatform") {
    if (part.toolId === "pwa" && !hasPWACompatibleFrontend(frontendTools)) {
      return createStackGraphIssue({
        code: "INCOMPATIBLE_OWNER_TOOL",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: "PWA requires a compatible web frontend.",
      });
    }
    if (part.toolId === "tauri" && !hasTauriCompatibleFrontend(frontendTools)) {
      return createStackGraphIssue({
        code: "INCOMPATIBLE_OWNER_TOOL",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: "Tauri requires a compatible web frontend.",
      });
    }
  }

  if (part.role === "dataFetching") {
    if (part.toolId === "tanstack-query" && apiTool && apiTool !== "none") {
      return createStackGraphIssue({
        code: "INCOMPATIBLE_GRAPH_SELECTION",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: "TanStack Query is already included via the selected API layer.",
      });
    }
  }

  if (part.role === "workspaceTooling") {
    if (part.toolId === "docker-compose" || part.toolId === "devcontainer") {
      const title = part.toolId === "devcontainer" ? "DevContainer" : "Docker Compose";

      if (backendTool === "convex") {
        return createStackGraphIssue({
          code: "INCOMPATIBLE_GRAPH_SELECTION",
          partId: part.id,
          role: part.role,
          toolId: part.toolId,
          message: `${title} is not compatible with Convex backend.`,
        });
      }
      if (runtimeTool === "workers") {
        return createStackGraphIssue({
          code: "INCOMPATIBLE_GRAPH_SELECTION",
          partId: part.id,
          role: part.role,
          toolId: part.toolId,
          message: `${title} is not compatible with Cloudflare Workers runtime.`,
        });
      }
      if (
        frontendEcosystem === "typescript" &&
        frontendTool &&
        !hasDockerComposeCompatibleFrontend(frontendTools)
      ) {
        return createStackGraphIssue({
          code: "INCOMPATIBLE_GRAPH_SELECTION",
          partId: part.id,
          role: part.role,
          toolId: part.toolId,
          message: `${title} is not wired for the selected web frontend.`,
        });
      }
      if (backendEcosystem === "typescript" && backendTool === "self" && frontendTool !== "next") {
        return createStackGraphIssue({
          code: "INCOMPATIBLE_GRAPH_SELECTION",
          partId: part.id,
          role: part.role,
          toolId: part.toolId,
          message: `${title} self-backend support currently requires Next.js.`,
        });
      }
    }

    if (part.toolId === "backend-utils") {
      if (
        backendEcosystem !== "typescript" ||
        !isBackendUtilsCompatibleBackend(backendTool)
      ) {
        return createStackGraphIssue({
          code: "INCOMPATIBLE_GRAPH_SELECTION",
          partId: part.id,
          role: part.role,
          toolId: part.toolId,
          message: "Backend Utils requires a compatible TypeScript server stack.",
        });
      }
    }
  }

  if (part.role === "examples") {
    if (
      part.toolId === "ai" &&
      !isExampleAIAllowed(
        backendTool as ProjectConfig["backend"] | undefined,
        frontendTools as ProjectConfig["frontend"],
      )
    ) {
      return createStackGraphIssue({
        code: "INCOMPATIBLE_GRAPH_SELECTION",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: "AI example is not compatible with the selected graph stack.",
      });
    }

    if (part.toolId === "chat-sdk") {
      if (
        backendEcosystem !== "typescript" ||
        !isExampleChatSdkAllowed(
          backendTool,
          frontendTools as ProjectConfig["frontend"],
          runtimeTool,
        )
      ) {
        return createStackGraphIssue({
          code: "INCOMPATIBLE_GRAPH_SELECTION",
          partId: part.id,
          role: part.role,
          toolId: part.toolId,
          message: "Chat SDK example is not compatible with the selected graph stack.",
        });
      }
    }
  }

  return undefined;
}

function createJavaCompatibilityIssue(
  part: Pick<StackPart, "id" | "role" | "toolId" | "ecosystem">,
  context: StackPartOptionContext,
): StackGraphIssue | undefined {
  if (part.ecosystem !== "java") return undefined;

  const buildTool = context.siblingToolIdsByRole?.buildTool;
  const hasBuildTool = !isNoneTool(buildTool);
  const javaLibraries = context.siblingToolIdsByRoleList?.libraries ?? [];

  if (part.role === "buildTool" && part.toolId === "none") {
    if (context.ownerToolId && context.ownerToolId !== "none") {
      return createStackGraphIssue({
        code: "INCOMPATIBLE_GRAPH_SELECTION",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: "Java web frameworks require Maven or Gradle",
      });
    }

    if (!isNoneTool(context.siblingToolIdsByRole?.orm)) {
      return createStackGraphIssue({
        code: "INCOMPATIBLE_GRAPH_SELECTION",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: "Java ORM support requires Maven or Gradle",
      });
    }

    if (!isNoneTool(context.siblingToolIdsByRole?.auth)) {
      return createStackGraphIssue({
        code: "INCOMPATIBLE_GRAPH_SELECTION",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: "Java auth support requires Maven or Gradle",
      });
    }

    if (javaLibraries.some((library) => library !== "none")) {
      return createStackGraphIssue({
        code: "INCOMPATIBLE_GRAPH_SELECTION",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: "Java libraries require Maven or Gradle",
      });
    }

    if ((context.siblingToolIdsByRoleList?.testing ?? []).some((library) => library !== "none")) {
      return createStackGraphIssue({
        code: "INCOMPATIBLE_GRAPH_SELECTION",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: "Java testing libraries require Maven or Gradle",
      });
    }
  }

  if ((part.role === "orm" || part.role === "auth") && part.toolId !== "none") {
    if (context.ownerToolId !== "spring-boot") {
      return createStackGraphIssue({
        code: "INCOMPATIBLE_OWNER_TOOL",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message:
          part.role === "orm"
            ? "Java ORM support currently requires Spring Boot"
            : "Java auth support currently requires Spring Boot",
      });
    }

    if (!hasBuildTool) {
      return createStackGraphIssue({
        code: "INCOMPATIBLE_GRAPH_SELECTION",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message:
          part.role === "orm"
            ? "Java ORM support requires Maven or Gradle"
            : "Java auth support requires Maven or Gradle",
      });
    }
  }

  if (part.role === "libraries" && part.toolId !== "none") {
    if (context.ownerToolId !== "spring-boot") {
      return createStackGraphIssue({
        code: "INCOMPATIBLE_OWNER_TOOL",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: "Spring libraries currently require Spring Boot in the Java scaffold",
      });
    }

    if (!hasBuildTool) {
      return createStackGraphIssue({
        code: "INCOMPATIBLE_GRAPH_SELECTION",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: "Java libraries require Maven or Gradle",
      });
    }

    if (part.toolId === "flyway" && context.siblingToolIdsByRole?.orm !== "spring-data-jpa") {
      return createStackGraphIssue({
        code: "INCOMPATIBLE_GRAPH_SELECTION",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: "Flyway currently requires Spring Data JPA in the Java scaffold",
      });
    }

    if (part.toolId === "liquibase" && context.siblingToolIdsByRole?.orm !== "spring-data-jpa") {
      return createStackGraphIssue({
        code: "INCOMPATIBLE_GRAPH_SELECTION",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: "Liquibase currently requires Spring Data JPA in the Java scaffold",
      });
    }

    if (part.toolId === "flyway" && javaLibraries.includes("liquibase")) {
      return createStackGraphIssue({
        code: "INCOMPATIBLE_GRAPH_SELECTION",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: "Flyway cannot be combined with Liquibase in the current Java scaffold",
      });
    }

    if (part.toolId === "liquibase" && javaLibraries.includes("flyway")) {
      return createStackGraphIssue({
        code: "INCOMPATIBLE_GRAPH_SELECTION",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: "Liquibase cannot be combined with Flyway in the current Java scaffold",
      });
    }
  }

  if (part.role === "testing" && part.toolId !== "none" && !hasBuildTool) {
    return createStackGraphIssue({
      code: "INCOMPATIBLE_GRAPH_SELECTION",
      partId: part.id,
      role: part.role,
      toolId: part.toolId,
      message: "Java testing libraries require Maven or Gradle",
    });
  }

  return undefined;
}

function getStackPartCompatibilityIssue(
  part: Pick<StackPart, "id" | "role" | "toolId" | "ecosystem">,
  context: StackPartOptionContext,
): StackGraphIssue | undefined {
  if (
    context.ownerEcosystem &&
    part.ecosystem !== context.ownerEcosystem &&
    !allowsCrossEcosystemOwner(part, context)
  ) {
    return createStackGraphIssue({
      code: "INCOMPATIBLE_OWNER_ECOSYSTEM",
      partId: part.id,
      role: part.role,
      toolId: part.toolId,
      message: `'${part.toolId}' uses the ${part.ecosystem} adapter but its owner uses ${context.ownerEcosystem}.`,
    });
  }

  const expectedOwnerRoles =
    part.ecosystem === "typescript" || part.role === "dbSetup"
      ? OWNER_ROLES_BY_SCOPED_ROLE[part.role]
      : undefined;
  if (
    expectedOwnerRoles &&
    context.ownerRole &&
    !expectedOwnerRoles.includes(context.ownerRole)
  ) {
    return createStackGraphIssue({
      code: "INCOMPATIBLE_OWNER_ROLE",
      partId: part.id,
      role: part.role,
      toolId: part.toolId,
      message: `'${part.toolId}' must be owned by one of: ${expectedOwnerRoles.join(", ")}.`,
    });
  }

  const frontendCompatibilityIssue = createTypeScriptFrontendCompatibilityIssue(part, context);
  if (frontendCompatibilityIssue) return frontendCompatibilityIssue;

  const backendCompatibilityIssue = createTypeScriptBackendCompatibilityIssue(part, context);
  if (backendCompatibilityIssue) return backendCompatibilityIssue;

  const sharedBackendServiceCompatibilityIssue = createSharedBackendServiceCompatibilityIssue(
    part,
    context,
  );
  if (sharedBackendServiceCompatibilityIssue) return sharedBackendServiceCompatibilityIssue;

  const mobileCompatibilityIssue = createMobileCompatibilityIssue(part, context);
  if (mobileCompatibilityIssue) return mobileCompatibilityIssue;

  const infrastructureCompatibilityIssue = createInfrastructureCompatibilityIssue(part, context);
  if (infrastructureCompatibilityIssue) return infrastructureCompatibilityIssue;

  const addonCompatibilityIssue = createAddonCompatibilityIssue(part, context);
  if (addonCompatibilityIssue) return addonCompatibilityIssue;

  const javaCompatibilityIssue = createJavaCompatibilityIssue(part, context);
  if (javaCompatibilityIssue) return javaCompatibilityIssue;

  if (part.ecosystem === "python" && part.role === "api" && DJANGO_API_TOOLS.has(part.toolId)) {
    if (context.ownerToolId !== "django") {
      return createStackGraphIssue({
        code: "INCOMPATIBLE_OWNER_TOOL",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: `'${part.toolId}' can only be selected for a Django backend.`,
      });
    }
  }

  if (
    part.ecosystem === "java" &&
    (part.role === "orm" || part.role === "auth") &&
    JAVA_SPRING_CAPABILITY_TOOLS.has(part.toolId)
  ) {
    if (context.ownerToolId !== "spring-boot") {
      return createStackGraphIssue({
        code: "INCOMPATIBLE_OWNER_TOOL",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: `'${part.toolId}' can only be selected for a Spring Boot backend.`,
      });
    }
  }

  if (part.ecosystem === "typescript" && part.role === "api" && part.toolId === "trpc") {
    const frontendTool = context.primaryToolIdsByRole?.frontend;
    if (frontendTool && TYPESCRIPT_TRPC_INCOMPATIBLE_FRONTENDS.has(frontendTool)) {
      return createStackGraphIssue({
        code: "INCOMPATIBLE_GRAPH_SELECTION",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: `'trpc' cannot be selected with the '${frontendTool}' frontend.`,
      });
    }
  }

  if (
    part.ecosystem === "typescript" &&
    part.role === "auth" &&
    (part.toolId === "better-auth" || part.toolId === "better-auth-organizations")
  ) {
    const databaseTool = context.primaryToolIdsByRole?.database;
    if (databaseTool === "redis") {
      return createStackGraphIssue({
        code: "INCOMPATIBLE_GRAPH_SELECTION",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: "'better-auth' cannot use Redis as the primary database.",
      });
    }

    const ormTool = context.siblingToolIdsByRole?.orm;
    if (ormTool && BETTER_AUTH_UNSUPPORTED_ORM_TOOLS.has(ormTool)) {
      return createStackGraphIssue({
        code: "INCOMPATIBLE_GRAPH_SELECTION",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: `'better-auth' is not compatible with the '${ormTool}' ORM selection.`,
      });
    }
  }

  if (
    part.ecosystem === "elixir" &&
    ELIXIR_ECTO_REQUIRED_TOOLS.has(part.toolId) &&
    (part.role === "api" || part.role === "auth") &&
    context.ownerRole === "backend"
  ) {
    const ormTool = context.siblingToolIdsByRole?.orm;
    if (isNoneTool(ormTool)) {
      return createStackGraphIssue({
        code: "INCOMPATIBLE_GRAPH_SELECTION",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message:
          part.toolId === "phx-gen-auth"
            ? "phx.gen.auth requires Ecto"
            : "Absinthe GraphQL requires Ecto in the current Phoenix scaffold",
      });
    }
  }

  if (
    part.ecosystem === "elixir" &&
    ELIXIR_ECTO_SQL_REQUIRED_TOOLS.has(part.toolId) &&
    (!context.ownerRole || context.ownerRole === "backend")
  ) {
    const ormTool = context.siblingToolIdsByRole?.orm ?? context.selectedToolIdsByRole?.orm;
    if (ormTool !== "ecto-sql") {
      return createStackGraphIssue({
        code: "INCOMPATIBLE_GRAPH_SELECTION",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: "Oban requires Ecto SQL with PostgreSQL in the current Phoenix scaffold",
      });
    }
  }

  if (
    part.ecosystem === "elixir" &&
    part.toolId === "live-view-streams" &&
    context.ownerRole === "backend"
  ) {
    if (context.ownerToolId !== "phoenix-live-view") {
      return createStackGraphIssue({
        code: "INCOMPATIBLE_OWNER_TOOL",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: "LiveView Streams require Phoenix LiveView",
      });
    }
  }

  const unsupportedElixirGraphToolMessage =
    part.ecosystem === "elixir" ? ELIXIR_UNSUPPORTED_GRAPH_TOOL_MESSAGES[part.toolId] : undefined;
  if (unsupportedElixirGraphToolMessage) {
    return createStackGraphIssue({
      code: "UNSUPPORTED_GRAPH_TOOL",
      partId: part.id,
      role: part.role,
      toolId: part.toolId,
      message: unsupportedElixirGraphToolMessage,
    });
  }

  if (part.ecosystem === "elixir" && !context.ownerRole) {
    const phoenixRequiredMessage = ELIXIR_PHOENIX_REQUIRED_ROLE_MESSAGES[part.role];
    if (phoenixRequiredMessage && part.toolId !== "none") {
      return createStackGraphIssue({
        code: "MISSING_OWNER_PART",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: phoenixRequiredMessage,
      });
    }

    if (part.role === "observability" && part.toolId === "phoenix-telemetry") {
      return createStackGraphIssue({
        code: "MISSING_OWNER_PART",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: "Phoenix telemetry requires Phoenix",
      });
    }
  }

  return undefined;
}

export function getStackPartCompatibilityIssueForPart(
  part: Pick<StackPart, "id" | "role" | "toolId" | "ecosystem" | "ownerPartId">,
  parts: readonly StackPart[],
): StackGraphIssue | undefined {
  return getStackPartCompatibilityIssue(part, getStackPartOptionContextForPart(part, parts));
}

export function getStackToolDefinitions(context?: StackPartOptionContext): ToolDefinition[] {
  if (!context) return [...STACK_TOOL_DEFINITIONS];
  return STACK_TOOL_DEFINITIONS.filter((definition) => {
    if (!definition.roles.includes(context.role)) return false;
    if (context.ecosystem && !definition.ecosystems.includes(context.ecosystem)) return false;
    if (definition.selectable === false) return false;
    const ecosystem = context.ecosystem ?? definition.ecosystems[0];
    if (
      getStackPartCompatibilityIssue(
        {
          id: `${context.ownerRole ?? "root"}:${context.role}:${definition.toolId}`,
          role: context.role,
          toolId: definition.toolId,
          ecosystem,
        },
        context,
      )
    ) {
      return false;
    }
    return true;
  });
}

export function getStackPartOptions(context: StackPartOptionContext): string[] {
  return [...new Set(getStackToolDefinitions(context).map((definition) => definition.toolId))];
}

function findDefinition(part: Pick<StackPart, "role" | "toolId" | "ecosystem">) {
  return STACK_TOOL_DEFINITIONS.find(
    (definition) =>
      definition.toolId === part.toolId &&
      definition.roles.includes(part.role) &&
      definition.ecosystems.includes(part.ecosystem),
  );
}

function isOwnerlessDefinition(definition: ToolDefinition | undefined) {
  return definition?.ownerless === true;
}

function allowsMultipleSelectedParts(parts: readonly StackPart[]) {
  const selectedParts = parts.filter((part) => part.source !== "provided");
  return selectedParts.every((part) => findDefinition(part)?.allowMultiple === true);
}

function parseRolePath(rolePath: string): { role: StackPartRole; ownerRole?: StackPrimaryRole } {
  const segments = rolePath.split(".");
  const rawRole = segments.length === 1 ? segments[0] : segments[segments.length - 1];
  const rawOwnerRole = segments.length > 1 ? segments[0] : undefined;
  const role = StackPartRoleSchema.parse(rawRole);
  const ownerRole = rawOwnerRole ? StackPartRoleSchema.parse(rawOwnerRole) : undefined;

  if (ownerRole && !PRIMARY_ROLES.has(ownerRole)) {
    throw new Error(`Stack part owner role '${ownerRole}' must be a primary role.`);
  }

  return { role, ownerRole: ownerRole as StackPrimaryRole | undefined };
}

export function parseStackPartSpecs(
  specs: readonly string[],
  source: StackPartSource = "selected",
): StackPart[] {
  const unresolved = specs.map((spec) => {
    const [rolePath, ecosystem, toolId, customId] = spec.split(":");
    if (!rolePath || !ecosystem || !toolId || spec.split(":").length > 4) {
      throw new Error(
        `Invalid --part '${spec}'. Use role:ecosystem:tool or owner.role:ecosystem:tool.`,
      );
    }
    const { role, ownerRole } = parseRolePath(rolePath);
    return {
      role,
      ownerRole,
      ecosystem: ecosystem as StackPartEcosystem,
      toolId,
      customId,
    };
  });

  const primaryParts = unresolved
    .filter((part) => !part.ownerRole)
    .map((part) =>
      createStackPart({
        role: part.role,
        ecosystem: part.ecosystem,
        toolId: part.toolId,
        source,
        id: part.customId,
      }),
    );

  const primaryByRole = new Map(primaryParts.map((part) => [part.role, part]));
  const primaryByRoleAndEcosystem = new Map(
    primaryParts.map((part) => [`${part.role}:${part.ecosystem}`, part]),
  );
  const scopedParts = unresolved
    .filter(
      (part): part is typeof part & { ownerRole: StackPrimaryRole } =>
        part.ownerRole !== undefined,
    )
    .map((part) =>
      createStackPart({
        role: part.role,
        ecosystem: part.ecosystem,
        toolId: part.toolId,
        ownerPartId:
          primaryByRoleAndEcosystem.get(`${part.ownerRole}:${part.ecosystem}`)?.id ??
          primaryByRole.get(part.ownerRole)?.id,
        source,
        id: part.customId,
      }),
    );

  return materializeProvidedStackParts([...primaryParts, ...scopedParts]);
}

export function formatStackPartSpec(part: StackPart, parts: readonly StackPart[] = []): string {
  const owner = part.ownerPartId
    ? parts.find((candidate) => candidate.id === part.ownerPartId)
    : undefined;
  const rolePath = owner ? `${owner.role}.${part.role}` : part.role;
  return `${rolePath}:${part.ecosystem}:${part.toolId}`;
}

export function materializeProvidedStackParts(parts: readonly StackPart[]): StackPart[] {
  const next = [...parts];

  for (const part of parts) {
    const definition = findDefinition(part);
    for (const provided of definition?.provides ?? []) {
      next.push(
        createStackPart({
          role: provided.role,
          toolId: provided.toolId,
          ecosystem: provided.ecosystem ?? part.ecosystem,
          ownerPartId: part.id,
          source: "provided",
          providedByPartId: part.id,
        }),
      );
    }
  }

  return next;
}

function getPrimaryPart(parts: readonly StackPart[], role: StackPrimaryRole) {
  return parts.find((part) => part.role === role && !part.ownerPartId);
}

function getSelectedToolIdsByRole(parts: readonly StackPart[]) {
  const selectedToolIdsByRole: Partial<Record<StackPartRole, string>> = {};
  for (const part of parts) {
    if (part.source !== "provided") selectedToolIdsByRole[part.role] = part.toolId;
  }
  return selectedToolIdsByRole;
}

function getSelectedToolIdsByRoleList(parts: readonly StackPart[]) {
  const selectedToolIdsByRoleList: Partial<Record<StackPartRole, string[]>> = {};
  for (const part of parts) {
    if (part.source === "provided") continue;
    selectedToolIdsByRoleList[part.role] ??= [];
    selectedToolIdsByRoleList[part.role]?.push(part.toolId);
  }
  return selectedToolIdsByRoleList;
}

function getPrimaryToolContext(parts: readonly StackPart[]) {
  const primaryToolIdsByRole: Partial<Record<StackPrimaryRole, string>> = {};
  const primaryEcosystemsByRole: Partial<Record<StackPrimaryRole, StackPartEcosystem>> = {};

  for (const role of PRIMARY_ROLES) {
    const primaryPart = getPrimaryPart(parts, role as StackPrimaryRole);
    if (primaryPart) {
      primaryToolIdsByRole[role as StackPrimaryRole] = primaryPart.toolId;
      primaryEcosystemsByRole[role as StackPrimaryRole] = primaryPart.ecosystem;
    }
  }

  return { primaryToolIdsByRole, primaryEcosystemsByRole };
}

function getSiblingToolIdsByRole(
  part: Pick<StackPart, "ownerPartId">,
  parts: readonly StackPart[],
) {
  const siblingToolIdsByRole: Partial<Record<StackPartRole, string>> = {};
  for (const sibling of parts) {
    if (sibling.ownerPartId !== part.ownerPartId || sibling.source === "provided") continue;
    siblingToolIdsByRole[sibling.role] = sibling.toolId;
  }
  return siblingToolIdsByRole;
}

function getSiblingToolIdsByRoleList(
  part: Pick<StackPart, "ownerPartId">,
  parts: readonly StackPart[],
) {
  const siblingToolIdsByRoleList: Partial<Record<StackPartRole, string[]>> = {};
  for (const sibling of parts) {
    if (sibling.ownerPartId !== part.ownerPartId || sibling.source === "provided") continue;
    siblingToolIdsByRoleList[sibling.role] ??= [];
    siblingToolIdsByRoleList[sibling.role]?.push(sibling.toolId);
  }
  return siblingToolIdsByRoleList;
}

function getStackPartOptionContextForPart(
  part: Pick<StackPart, "role" | "ecosystem" | "ownerPartId">,
  parts: readonly StackPart[],
): StackPartOptionContext {
  const partsById = new Map(parts.map((candidate) => [candidate.id, candidate]));
  const owner = part.ownerPartId ? partsById.get(part.ownerPartId) : undefined;
  const { primaryToolIdsByRole, primaryEcosystemsByRole } = getPrimaryToolContext(parts);

  return {
    role: part.role,
    ecosystem: part.ecosystem,
    ownerRole:
      owner && PRIMARY_ROLES.has(owner.role) ? (owner.role as StackPrimaryRole) : undefined,
    ownerToolId: owner?.toolId,
    ownerEcosystem: owner?.ecosystem,
    siblingToolIdsByRole: getSiblingToolIdsByRole(part, parts),
    siblingToolIdsByRoleList: getSiblingToolIdsByRoleList(part, parts),
    selectedToolIdsByRole: getSelectedToolIdsByRole(parts),
    selectedToolIdsByRoleList: getSelectedToolIdsByRoleList(parts),
    primaryToolIdsByRole,
    primaryEcosystemsByRole,
  };
}

function addLegacyPart(
  parts: StackPart[],
  role: StackPartRole,
  ecosystem: StackPartEcosystem,
  toolId: string | undefined,
  source: StackPartSource,
  ownerPartId?: string,
) {
  if (!toolId || toolId === "none") return undefined;
  const part = createStackPart({ role, ecosystem, toolId, source, ownerPartId });
  parts.push(part);
  return part;
}

function addLegacyAddonPart(
  parts: StackPart[],
  toolId: string,
  source: StackPartSource,
  frontendPart: StackPart | undefined,
) {
  if (!toolId || toolId === "none") return;
  const binding = getAddonStackPartBinding(toolId);
  if (!binding) return;
  const ownerPartId = binding.ownerRole === "frontend" ? frontendPart?.id : undefined;
  if (binding.ownerRole === "frontend" && !ownerPartId) return;
  addLegacyPart(parts, binding.role, binding.ecosystem, toolId, source, ownerPartId);
}

function appendUniqueLegacyArrayValue(
  config: Partial<ProjectConfig>,
  category: keyof ProjectConfig,
  value: string,
) {
  if (!LEGACY_ARRAY_CATEGORIES.has(category)) return;
  const current = (config[category] ?? []) as string[];
  if (!current.includes(value)) {
    (config as Record<string, unknown>)[category] = [...current, value];
  }
}

function getLegacyArrayCategoryForPart(part: StackPart): keyof ProjectConfig | undefined {
  if (part.role === "examples") return "examples";
  if (LEGACY_ADDON_GRAPH_ROLES.has(part.role) && getAddonStackPartBinding(part.toolId)) {
    return "addons";
  }
  const legacyCategory = findDefinition(part)?.legacyCategory;
  if (legacyCategory && LEGACY_ARRAY_CATEGORIES.has(legacyCategory)) return legacyCategory;
  return undefined;
}

export function legacyProjectConfigToStackParts(
  config: Partial<ProjectConfig>,
  source: StackPartSource = "legacy",
): StackPart[] {
  const parts: StackPart[] = [];
  const frontends = config.frontend ?? [];
  const webFrontends = frontends.filter(
    (frontend) => frontend !== "none" && !NATIVE_FRONTENDS.has(frontend),
  );
  const nativeFrontends = frontends.filter((frontend) => NATIVE_FRONTENDS.has(frontend));

  if (webFrontends.length > 1) {
    throw new Error("Multiple primary web frontends are not supported in the stack graph.");
  }
  if (nativeFrontends.length > 1) {
    throw new Error("Multiple primary mobile frontends are not supported in the stack graph.");
  }

  const webFrontend = webFrontends[0];
  const nativeFrontend = nativeFrontends[0];
  const frontendPart = addLegacyPart(parts, "frontend", "typescript", webFrontend, source);
  const mobilePart = addLegacyPart(parts, "mobile", "react-native", nativeFrontend, source);

  let backendPart: StackPart | undefined;
  if (
    (config.ecosystem === undefined || config.ecosystem === "typescript") &&
    config.backend &&
    config.backend !== "none"
  ) {
    backendPart = addLegacyPart(parts, "backend", "typescript", config.backend, source);
  }

  if (config.ecosystem === "rust" && config.rustFrontend && config.rustFrontend !== "none") {
    addLegacyPart(parts, "frontend", "rust", config.rustFrontend, source);
  }

  if (isLegacyBackendEcosystem(config.ecosystem)) {
    const category = LEGACY_BACKEND_CATEGORY_BY_ECOSYSTEM[config.ecosystem];
    backendPart = addLegacyPart(
      parts,
      "backend",
      config.ecosystem,
      config[category] as string | undefined,
      source,
    );
  }

  const databasePart = addLegacyPart(parts, "database", "universal", config.database, source);
  const capabilityOwner = backendPart?.id ?? frontendPart?.id ?? mobilePart?.id ?? databasePart?.id;
  if (databasePart) {
    addLegacyPart(parts, "dbSetup", "universal", config.dbSetup, source, databasePart.id);
  }

  for (const addon of config.addons ?? []) {
    addLegacyAddonPart(parts, addon, source, frontendPart);
  }
  for (const example of config.examples ?? []) {
    addLegacyPart(parts, "examples", "universal", example, source);
  }

  // The generic `orm`/`api`/`auth` fields only describe TypeScript and React Native
  // stacks. For other ecosystems these are inert TS defaults and the ecosystem-specific
  // blocks below own the real bindings — mapping the generic fields there would emit
  // invalid or duplicate capability parts (e.g. `auth:go:better-auth` alongside `goAuth`).
  if (
    config.ecosystem === undefined ||
    config.ecosystem === "typescript" ||
    config.ecosystem === "react-native"
  ) {
    addLegacyPart(parts, "orm", "typescript", config.orm, source, capabilityOwner);
    addLegacyPart(parts, "api", "typescript", config.api, source, capabilityOwner);
    addLegacyPart(
      parts,
      "auth",
      config.ecosystem ?? "typescript",
      config.auth,
      source,
      capabilityOwner,
    );

      if (frontendPart?.ecosystem === "typescript") {
        for (const [role, category] of Object.entries(
          LEGACY_TYPESCRIPT_FRONTEND_SINGLE_CATEGORIES,
      ) as Array<[StackPartRole, keyof ProjectConfig]>) {
        addLegacyPart(
          parts,
          role,
          "typescript",
          config[category] as string | undefined,
          source,
          frontendPart.id,
        );
        }
      }

      if (mobilePart?.ecosystem === "react-native") {
        for (const [role, category] of Object.entries(LEGACY_MOBILE_SINGLE_CATEGORIES) as Array<
          [StackPartRole, keyof ProjectConfig]
        >) {
          addLegacyPart(
            parts,
            role,
            "react-native",
            config[category] as string | undefined,
            source,
            mobilePart.id,
          );
        }
      }

      if (backendPart?.ecosystem === "typescript") {
        for (const [role, category] of Object.entries(
          LEGACY_TYPESCRIPT_BACKEND_INFRA_CATEGORIES,
      ) as Array<[StackPartRole, keyof ProjectConfig]>) {
        addLegacyPart(
          parts,
          role,
          "typescript",
          config[category] as string | undefined,
          source,
          backendPart.id,
        );
      }

      for (const [role, category] of Object.entries(
        LEGACY_TYPESCRIPT_BACKEND_SINGLE_CATEGORIES,
      ) as Array<[StackPartRole, keyof ProjectConfig]>) {
        addLegacyPart(
          parts,
          role,
          "typescript",
          config[category] as string | undefined,
          source,
          backendPart.id,
        );
      }
    }
  }
  if (isLegacyBackendEcosystem(config.ecosystem)) {
    for (const [role, category] of Object.entries(
      LEGACY_CAPABILITY_CATEGORIES_BY_ECOSYSTEM[config.ecosystem],
    ) as Array<[LegacyCapabilityRole, keyof ProjectConfig]>) {
      addLegacyPart(
        parts,
        role,
        config.ecosystem,
        config[category] as string | undefined,
        source,
        backendPart?.id,
      );
    }

    // Extras require an owning backend part, and tools the current scaffold
    // cannot generate stay flat-only so importing a valid legacy config never
    // produces a graph that validateStackParts rejects.
    if (backendPart) {
      for (const [role, category] of Object.entries(
        LEGACY_EXTRA_CATEGORIES_BY_ECOSYSTEM[config.ecosystem],
      ) as Array<[StackPartRole, keyof ProjectConfig]>) {
        const toolId = config[category] as string | undefined;
        if (config.ecosystem === "elixir" && toolId && ELIXIR_UNSUPPORTED_GRAPH_TOOLS.has(toolId)) {
          continue;
        }
        if (
          parts.some(
            (part) =>
              part.ownerPartId === backendPart.id &&
              part.role === role &&
              part.ecosystem === config.ecosystem &&
              part.source !== "provided",
          )
        ) {
          continue;
        }
        addLegacyPart(parts, role, config.ecosystem, toolId, source, backendPart.id);
      }

      for (const [role, category] of Object.entries(
        LEGACY_BACKEND_ARRAY_CATEGORIES_BY_ECOSYSTEM[config.ecosystem],
      ) as Array<[StackPartRole, keyof ProjectConfig]>) {
        const values = config[category];
        if (!Array.isArray(values)) continue;
        for (const toolId of values) {
          if (typeof toolId !== "string") continue;
          addLegacyPart(parts, role, config.ecosystem, toolId, source, backendPart.id);
        }
      }
    }
  }

  return materializeProvidedStackParts(parts);
}

function ecosystemForLegacy(parts: readonly StackPart[]): Ecosystem {
  const frontend = getPrimaryPart(parts, "frontend");
  if (frontend?.ecosystem && frontend.ecosystem !== "universal") return frontend.ecosystem;
  const mobile = getPrimaryPart(parts, "mobile");
  if (mobile) return "react-native";
  const backend = getPrimaryPart(parts, "backend");
  if (backend?.ecosystem && backend.ecosystem !== "universal") return backend.ecosystem;
  return "typescript";
}

export function stackPartsToLegacyProjectConfigPartial(
  parts: readonly StackPart[],
): Partial<ProjectConfig> {
  const config: Partial<ProjectConfig> = {
    stackParts: [...parts],
    ecosystem: ecosystemForLegacy(parts),
    frontend: [],
    backend: "none",
    database: "none",
    orm: "none",
    api: "none",
    auth: "none",
  };
  const hasTypeScriptBackend = parts.some(
    (part) =>
      part.role === "backend" &&
      part.ecosystem === "typescript" &&
      !part.ownerPartId &&
      part.source !== "provided",
  );
  const hasTypeScriptFrontend = parts.some(
    (part) =>
      part.role === "frontend" &&
      part.ecosystem === "typescript" &&
      !part.ownerPartId &&
      part.source !== "provided",
  );
  const hasMobileFrontend = parts.some(
    (part) =>
      part.role === "mobile" &&
      part.ecosystem === "react-native" &&
      !part.ownerPartId &&
      part.source !== "provided",
  );
  if (hasTypeScriptBackend) {
    for (const category of [
      ...Object.values(LEGACY_TYPESCRIPT_BACKEND_SINGLE_CATEGORIES),
      ...Object.values(LEGACY_TYPESCRIPT_BACKEND_INFRA_CATEGORIES),
    ]) {
      (config as Record<string, unknown>)[category] = "none";
    }
  }
  if (hasTypeScriptFrontend) {
    for (const category of Object.values(LEGACY_TYPESCRIPT_FRONTEND_SINGLE_CATEGORIES)) {
      (config as Record<string, unknown>)[category] = "none";
    }
  }
  if (hasMobileFrontend) {
    for (const category of Object.values(LEGACY_MOBILE_SINGLE_CATEGORIES)) {
      (config as Record<string, unknown>)[category] = "none";
    }
  }

  for (const part of parts) {
    if (part.source === "provided") continue;
    if (!part.ownerPartId) {
      if (part.role === "frontend" && part.ecosystem === "typescript") {
        config.frontend = [
          ...(config.frontend ?? []),
          part.toolId as ProjectConfig["frontend"][number],
        ];
      } else if (part.role === "frontend" && part.ecosystem === "rust") {
        config.rustFrontend = part.toolId as ProjectConfig["rustFrontend"];
      } else if (part.role === "mobile") {
        config.frontend = [
          ...(config.frontend ?? []),
          part.toolId as ProjectConfig["frontend"][number],
        ];
      } else {
        const legacyArrayCategory = getLegacyArrayCategoryForPart(part);
        if (legacyArrayCategory) {
          appendUniqueLegacyArrayValue(config, legacyArrayCategory, part.toolId);
          continue;
        }

        const legacyCategory = getLegacyCategoryForPart(part, parts);
        if (legacyCategory) {
          (config as Record<string, unknown>)[legacyCategory] = part.toolId;
        }
      }
      continue;
    }

    const legacyArrayCategory = getLegacyArrayCategoryForPart(part);
    if (legacyArrayCategory) {
      appendUniqueLegacyArrayValue(config, legacyArrayCategory, part.toolId);
      continue;
    }

    const legacyCategory = getLegacyCategoryForPart(part, parts);
    if (legacyCategory) {
      (config as Record<string, unknown>)[legacyCategory] = part.toolId;
      continue;
    }

  }

  return config;
}

type GraphProjectionEcosystem = Exclude<StackPartEcosystem, "universal">;

function getSelectedPrimaryPart(parts: readonly StackPart[], role: StackPartRole) {
  return parts.find(
    (part) => part.role === role && !part.ownerPartId && part.source !== "provided",
  );
}

function getSelectedScopedPart(
  parts: readonly StackPart[],
  owner: StackPart | undefined,
  role: StackPartRole,
) {
  if (!owner) return undefined;
  return parts.find(
    (part) => part.role === role && part.ownerPartId === owner.id && part.source !== "provided",
  );
}

function getLegacyCategoryForPart(
  part: StackPart,
  parts: readonly StackPart[],
): keyof ProjectConfig | undefined {
  const owner = part.ownerPartId
    ? parts.find((candidate) => candidate.id === part.ownerPartId)
    : undefined;

  if (
    owner?.role === "frontend" &&
    owner.ecosystem === "typescript" &&
    part.ecosystem === "typescript"
  ) {
    if (part.role === "auth") return "auth";

    const legacyCategory = LEGACY_TYPESCRIPT_FRONTEND_SINGLE_CATEGORIES[
      part.role as keyof typeof LEGACY_TYPESCRIPT_FRONTEND_SINGLE_CATEGORIES
    ];
    if (legacyCategory) return legacyCategory;
  }

  if (
    owner?.role === "backend" &&
    owner.ecosystem === "typescript" &&
    part.ecosystem === "typescript"
  ) {
    if (part.role === "orm" || part.role === "api" || part.role === "auth") {
      return part.role;
    }

    const legacyCategory =
      LEGACY_TYPESCRIPT_BACKEND_SINGLE_CATEGORIES[
        part.role as keyof typeof LEGACY_TYPESCRIPT_BACKEND_SINGLE_CATEGORIES
      ] ??
      LEGACY_TYPESCRIPT_BACKEND_INFRA_CATEGORIES[
        part.role as keyof typeof LEGACY_TYPESCRIPT_BACKEND_INFRA_CATEGORIES
      ];
    if (legacyCategory) return legacyCategory;
  }

  if (owner?.role === "mobile" && part.ecosystem === "react-native" && part.role === "auth") {
    return "auth";
  }

  if (owner?.role === "database" && part.ecosystem === "universal") {
    const legacyCategory = LEGACY_DATABASE_SINGLE_CATEGORIES[
      part.role as keyof typeof LEGACY_DATABASE_SINGLE_CATEGORIES
    ];
    if (legacyCategory) return legacyCategory;
  }

  return findDefinition(part)?.legacyCategory;
}

function projectLegacyCategoryFromPart(
  config: ProjectConfig,
  part: StackPart | undefined,
  ecosystem: GraphProjectionEcosystem,
  parts: readonly StackPart[],
) {
  if (!part) return;
  const legacyArrayCategory = getLegacyArrayCategoryForPart(part);
  if (legacyArrayCategory) {
    appendUniqueLegacyArrayValue(config, legacyArrayCategory, part.toolId);
    return;
  }

  const legacyCategory = getLegacyCategoryForPart(part, parts);
  if (!legacyCategory || legacyCategory === "frontend") return;

  const canProject =
    legacyCategory === "database" ||
    legacyCategory === "dbSetup" ||
    part.ecosystem === ecosystem ||
    (legacyCategory === "auth" &&
      (ecosystem === "typescript" || ecosystem === "react-native") &&
      (part.ecosystem === "typescript" || part.ecosystem === "react-native"));

  if (canProject) {
    (config as Record<string, unknown>)[legacyCategory] = part.toolId;
  }
}

export function stackGraphToLegacyProjectConfigForEcosystem(
  config: ProjectConfig,
  ecosystem: GraphProjectionEcosystem,
): ProjectConfig {
  const parts = config.stackParts ?? [];
  const backend = parts.find(
    (part) => part.role === "backend" && part.ecosystem === ecosystem && !part.ownerPartId,
  );
  const frontend = parts.find(
    (part) => part.role === "frontend" && part.ecosystem === ecosystem && !part.ownerPartId,
  );
  const mobile = parts.find(
    (part) => part.role === "mobile" && part.ecosystem === "react-native" && !part.ownerPartId,
  );
  const database =
    getSelectedPrimaryPart(parts, "database") ?? getSelectedScopedPart(parts, backend, "database");
  const orm = getSelectedScopedPart(parts, backend, "orm");
  const api = getSelectedScopedPart(parts, backend, "api");
  const auth =
    getSelectedScopedPart(parts, backend, "auth") ??
    getSelectedScopedPart(parts, frontend, "auth") ??
    getSelectedScopedPart(parts, mobile, "auth");

  const projected: ProjectConfig = {
    ...config,
    ecosystem,
    frontend: [
      ...(frontend && frontend.ecosystem === "typescript" ? [frontend.toolId] : []),
      ...(mobile && ["typescript", "react-native"].includes(ecosystem) ? [mobile.toolId] : []),
    ] as ProjectConfig["frontend"],
  };

  for (const category of GRAPH_PROJECTION_DEFAULT_LEGACY_CATEGORIES) {
    (projected as Record<string, unknown>)[category] = "none";
  }
  projected.addons = [];
  projected.examples = [];

  projectLegacyCategoryFromPart(projected, backend, ecosystem, parts);
  projectLegacyCategoryFromPart(projected, frontend, ecosystem, parts);
  projectLegacyCategoryFromPart(projected, database, ecosystem, parts);
  projectLegacyCategoryFromPart(projected, orm, ecosystem, parts);
  projectLegacyCategoryFromPart(projected, api, ecosystem, parts);
  projectLegacyCategoryFromPart(projected, auth, ecosystem, parts);

  const backendScopedPartRoles = new Set<StackPartRole>(["database", "orm", "api", "auth"]);
  for (const part of parts) {
    if (
      part.source === "provided" ||
      part.ownerPartId !== backend?.id ||
      backendScopedPartRoles.has(part.role)
    ) {
      continue;
    }
    projectLegacyCategoryFromPart(projected, part, ecosystem, parts);
  }

  const frontendScopedPartRoles = new Set<StackPartRole>(["auth"]);
  for (const part of parts) {
    if (
      part.source === "provided" ||
      part.ownerPartId !== frontend?.id ||
      frontendScopedPartRoles.has(part.role)
    ) {
      continue;
    }
    projectLegacyCategoryFromPart(projected, part, ecosystem, parts);
  }

  const mobileScopedPartRoles = new Set<StackPartRole>(["auth"]);
  for (const part of parts) {
    if (
      part.source === "provided" ||
      part.ownerPartId !== mobile?.id ||
      mobileScopedPartRoles.has(part.role)
    ) {
      continue;
    }
    projectLegacyCategoryFromPart(projected, part, ecosystem, parts);
  }

  for (const part of parts) {
    if (part.source === "provided" || part.ownerPartId !== database?.id) {
      continue;
    }
    projectLegacyCategoryFromPart(projected, part, ecosystem, parts);
  }

  for (const part of parts) {
    if (part.source === "provided" || part.ownerPartId) {
      continue;
    }
    projectLegacyCategoryFromPart(projected, part, ecosystem, parts);
  }

  return projected;
}

export function validateStackParts(parts: readonly StackPart[]): StackGraphValidationResult {
  const issues: StackGraphIssue[] = [];
  const partsById = new Map(parts.map((part) => [part.id, part]));

  for (const role of PRIMARY_ROLES) {
    const matching = parts.filter((part) => part.role === role && !part.ownerPartId);
    if (matching.length > 1) {
      issues.push({
        code: "DUPLICATE_PRIMARY_ROLE",
        role,
        message: `Only one primary '${role}' stack part is supported in v1.`,
      });
    }
  }

  for (const part of parts) {
    const definition = findDefinition(part);
    if (!definition) {
      issues.push({
        code: "UNSUPPORTED_ROLE_BINDING",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: `'${part.toolId}' is not a valid ${part.ecosystem} tool for role '${part.role}'.`,
      });
    }

    if (
      !PRIMARY_ROLES.has(part.role) &&
      !part.ownerPartId &&
      !isOwnerlessDefinition(definition)
    ) {
      issues.push({
        code: "MISSING_OWNER_PART",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: `Capability stack part '${part.id}' must reference an owning primary part.`,
      });
    }

    if (part.ownerPartId && !partsById.has(part.ownerPartId)) {
      issues.push({
        code: "MISSING_OWNER_PART",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: `Stack part '${part.id}' references missing owner '${part.ownerPartId}'.`,
      });
    }

    const owner = part.ownerPartId ? partsById.get(part.ownerPartId) : undefined;
    if (definition && (PRIMARY_ROLES.has(part.role) || owner || isOwnerlessDefinition(definition))) {
      const compatibilityIssue = getStackPartCompatibilityIssueForPart(part, parts);

      if (compatibilityIssue) {
        issues.push(compatibilityIssue);
      }
    }
  }

  const byScope = new Map<string, StackPart[]>();
  for (const part of parts) {
    const key = `${part.ownerPartId ?? "root"}:${part.role}`;
    byScope.set(key, [...(byScope.get(key) ?? []), part]);
  }

  for (const scopedParts of byScope.values()) {
    const selectedParts = scopedParts.filter((part) => part.source !== "provided");
    if (selectedParts.length > 1 && !allowsMultipleSelectedParts(scopedParts)) {
      const [first] = selectedParts;
      issues.push({
        code: "DUPLICATE_ROLE_SCOPE",
        partId: first?.id,
        role: first?.role,
        toolId: first?.toolId,
        message: `Only one selected '${first?.role}' stack part is supported per owner scope.`,
      });
    }

    const selected = scopedParts.find((part) => part.source !== "provided");
    const provided = scopedParts.find((part) => part.source === "provided");
    if (!selected || !provided || selected.toolId === provided.toolId) continue;

    const provider = provided.providedByPartId
      ? partsById.get(provided.providedByPartId)
      : undefined;
    const providerDefinition = provider ? findDefinition(provider) : undefined;
    const providedDefinition = providerDefinition?.provides?.find(
      (capability) => capability.role === provided.role && capability.toolId === provided.toolId,
    );

    if (!providedDefinition?.overrideable) {
      issues.push({
        code: "PROVIDED_CAPABILITY_CONFLICT",
        partId: selected.id,
        role: selected.role,
        toolId: selected.toolId,
        message: `'${selected.toolId}' conflicts with '${provided.toolId}' provided by '${provider?.toolId ?? "another part"}'.`,
      });
    }
  }

  return { issues };
}
