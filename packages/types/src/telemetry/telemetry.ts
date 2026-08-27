import { CAPABILITY_EVIDENCE_LEVEL_IDS } from "@/capabilities/evidence";
import { getCategoryOptionIds, type OptionCategory } from "@/catalog/option-metadata";
import { EcosystemSchema, ProjectConfigSchema, StackPartRoleSchema } from "@/config/schemas";
import { STACK_TOOL_DEFINITIONS } from "@/stack/stack-graph";
import { STARTER_TRACK_IDS } from "@/stack/starter-tracks";

export type TelemetryStackValue = string | boolean | string[];

export const TELEMETRY_ACTION_IDS = [
  "create",
  "sponsors",
  "docs",
  "builder",
  "add",
  "status",
  "remove",
  "replace",
  "history",
  "telemetry",
  "update-deps",
  "gen",
  "registry",
  "recovery",
  "recommend",
  "update",
  "adopt",
  "check",
  "doctor",
  "mcp",
  "bfs_add_feature",
  "bfs_apply_doctor_fix",
  "bfs_apply_gen",
  "bfs_apply_part_removal",
  "bfs_apply_primary_role_replacement",
  "bfs_apply_project_update",
  "bfs_apply_registry_add",
  "bfs_apply_stack_update",
  "bfs_check_compatibility",
  "bfs_check_project",
  "bfs_check_recipes",
  "bfs_confirm_project_adoption",
  "bfs_create_project",
  "bfs_get_capability_evidence",
  "bfs_get_guidance",
  "bfs_get_project_context",
  "bfs_get_project_recovery_point",
  "bfs_get_project_status",
  "bfs_get_recipe_history",
  "bfs_get_schema",
  "bfs_list_presets",
  "bfs_list_project_recovery_points",
  "bfs_list_starter_tracks",
  "bfs_plan_addition",
  "bfs_plan_doctor_fix",
  "bfs_plan_gen",
  "bfs_plan_part_removal",
  "bfs_plan_primary_role_replacement",
  "bfs_plan_project",
  "bfs_plan_project_adoption",
  "bfs_plan_project_update",
  "bfs_plan_registry_add",
  "bfs_plan_stack_update",
  "bfs_prune_project_recovery_points",
  "bfs_recommend_stack",
  "bfs_recover_project_transaction",
  "bfs_verify_project_recovery_point",
  "campaign-viewed",
  "campaign-preset-opened",
  "builder-viewed",
  "builder-view-changed",
  "builder-command-copied",
  "builder-run-started",
  "builder-run-ready",
  "builder-run-failed",
  "builder-run-stopped",
  "builder-file-edited",
  "builder-zip-started",
  "builder-zip-downloaded",
  "builder-zip-failed",
  "builder-share-prompted",
  "builder-stack-shared",
  "builder-github-clicked",
  "builder-starter-track-applied",
  "builder-incompatibility-recovered",
  "builder-plan-abandoned",
] as const;

export const TELEMETRY_MODE_IDS = [
  "dry-run",
  "defaults",
  "create",
  "apply",
  "json",
  "human",
  "clear",
  "list",
  "status",
  "enable",
  "disable",
  "check",
  "patch",
  "all",
  "update",
  "plan",
  "show",
  "verify",
  "prune",
  "prune-apply",
  "read",
  "write",
  "recover",
  "record-baseline",
  "confirm",
  "fix-apply",
  "fix-plan",
  "full",
  "config-only",
  "solo",
  "multi",
] as const;

export const TELEMETRY_ERROR_NAMES = [
  "Error",
  "TypeError",
  "RangeError",
  "ReferenceError",
  "SyntaxError",
  "URIError",
  "EvalError",
  "AggregateError",
  "AbortError",
  "TimeoutError",
  "CLIError",
  "UserCancelledError",
  "UnknownError",
  "UpdateError",
  "AdoptionError",
  "ConfigDriftRepairError",
  "ProjectStatusError",
] as const;

export const TELEMETRY_SETUP_FAILURE_IDS = [
  "install-dependencies",
  "database-setup",
  "cargo-build",
  "python-uv-sync",
  "python-pip-install",
  "python-poetry-install",
  "go-mod-tidy",
  "maven-tests",
  "gradle-tests",
  "elixir-deps-compile",
] as const;

export const TELEMETRY_FAILURE_STAGES = [
  ...TELEMETRY_SETUP_FAILURE_IDS,
  "generation",
  "browser_support",
  "runtime_boot",
  "project_mount",
  "source_sync",
  "dependency_install",
  "server_start",
  "server_timeout",
  "server_exit",
  "archive_generation",
  "browser_download",
] as const;

export const TELEMETRY_FAILURE_REASONS = [
  "network",
  "registry-not-found",
  "registry-auth",
  "peer-conflict",
  "arborist-crash",
  "lockfile-mismatch",
  "disk-space",
  "permission",
  "path-too-long",
  "missing-tool",
  "engine-mismatch",
  "build-script-failed",
  "out-of-memory",
  "timeout",
  "unknown",
  "generation_failed",
  "browser_runtime_unsupported",
  "runtime_boot_failed",
  "project_mount_failed",
  "source_sync_failed",
  "dependency_install_failed",
  "dependency_install_exit",
  "server_start_failed",
  "server_ready_timeout",
  "server_process_exit",
  "archive_generation_failed",
  "browser_download_failed",
] as const;

export const TELEMETRY_CI_PROVIDERS = [
  "github-actions",
  "gitlab-ci",
  "circleci",
  "vercel",
  "other",
] as const;
export const TELEMETRY_EXECUTION_RUNTIMES = ["bun", "node", "browser"] as const;
export const TELEMETRY_PLATFORMS = [
  "aix",
  "android",
  "darwin",
  "freebsd",
  "haiku",
  "linux",
  "openbsd",
  "sunos",
  "win32",
  "cygwin",
  "netbsd",
  "browser",
] as const;

export const TELEMETRY_PROJECT_CONFIG_KEYS = [
  "ecosystem",
  "database",
  "orm",
  "backend",
  "runtime",
  "frontend",
  "addons",
  "examples",
  "auth",
  "payments",
  "git",
  "packageManager",
  "workspaceShape",
  "versionChannel",
  "install",
  "dbSetup",
  "api",
  "webDeploy",
  "serverDeploy",
  "astroIntegration",
  "ai",
  "effect",
  "stateManagement",
  "forms",
  "testing",
  "email",
  "cssFramework",
  "uiLibrary",
  "shadcnBase",
  "shadcnStyle",
  "shadcnIconLibrary",
  "shadcnColorTheme",
  "shadcnBaseColor",
  "shadcnFont",
  "shadcnRadius",
  "validation",
  "realtime",
  "jobQueue",
  "animation",
  "fileUpload",
  "logging",
  "observability",
  "featureFlags",
  "integrations",
  "ecommerce",
  "analytics",
  "cms",
  "caching",
  "rateLimit",
  "botProtection",
  "i18n",
  "search",
  "vectorDb",
  "fileStorage",
  "mobileNavigation",
  "mobileUI",
  "mobileStorage",
  "mobileTesting",
  "mobilePush",
  "mobileOTA",
  "mobileDeepLinking",
  "mobileLibraries",
  "rustWebFramework",
  "rustFrontend",
  "dotnetFrontend",
  "kotlinMobile",
  "kotlinMobileLibraries",
  "swiftMobile",
  "dartMobile",
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
  "javaLanguage",
  "javaWebFramework",
  "javaBuildTool",
  "javaOrm",
  "javaAuth",
  "javaApi",
  "javaLogging",
  "javaLibraries",
  "javaTestingLibraries",
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
] as const satisfies readonly (keyof typeof ProjectConfigSchema.shape)[];

export const TELEMETRY_STACK_DIMENSION_KEYS = [
  ...TELEMETRY_PROJECT_CONFIG_KEYS,
  "webFrontend",
  "nativeFrontend",
  "backendLibraries",
  "codeQuality",
  "documentation",
  "appPlatforms",
  "aiSdk",
  "stackMode",
  "stackPartSelections",
  "stackPartRoles",
  "stackPartEcosystems",
  "multiEcosystem",
  "decision_stage",
  "selection_outcome",
  "selected_evidence_level",
  "selection_problem",
  "starter_track",
  "campaign",
  "moment",
  "placement",
  "preset",
  "rerun",
  "target",
  "view",
  "targetEcosystem",
  "generatorKind",
  "registryAction",
  "bun_version",
] as const;

export type TelemetryStackDimensionKey = (typeof TELEMETRY_STACK_DIMENSION_KEYS)[number];

export const TELEMETRY_DECISION_STAGES = ["discover", "evaluate", "plan", "create"] as const;
export const TELEMETRY_SELECTION_OUTCOMES = [
  "track-applied",
  "incompatibility-recovered",
  "plan-abandoned",
  "create-completed",
  "create-failed",
  "handoff-completed",
] as const;
export const TELEMETRY_SELECTION_PROBLEMS = [
  "none",
  "discoverability",
  "missing-capability",
  "compatibility",
  "reliability",
] as const;

const MAX_ARRAY_ITEMS = 64;
const MAX_VALUE_LENGTH = 100;
const VERSION_PATTERN = /^\d{1,3}\.\d{1,3}\.\d{1,5}$/;
const NODE_VERSION_PATTERN = /^v?\d{1,3}\.\d{1,3}\.\d{1,5}$/;
const UUID_V4_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const actionIdSet = new Set<string>(TELEMETRY_ACTION_IDS);
const modeIdSet = new Set<string>(TELEMETRY_MODE_IDS);
const errorNameSet = new Set<string>(TELEMETRY_ERROR_NAMES);
const failureStageSet = new Set<string>(TELEMETRY_FAILURE_STAGES);
const failureReasonSet = new Set<string>(TELEMETRY_FAILURE_REASONS);
const setupFailureIdSet = new Set<string>(TELEMETRY_SETUP_FAILURE_IDS);
const ciProviderSet = new Set<string>(TELEMETRY_CI_PROVIDERS);
const executionRuntimeSet = new Set<string>(TELEMETRY_EXECUTION_RUNTIMES);
const platformSet = new Set<string>(TELEMETRY_PLATFORMS);
const telemetryProjectConfigKeySet = new Set<string>(TELEMETRY_PROJECT_CONFIG_KEYS);
const telemetryStackDimensionKeySet = new Set<string>(TELEMETRY_STACK_DIMENSION_KEYS);
const stackPartSelectionSet = new Set(
  STACK_TOOL_DEFINITIONS.flatMap((definition) =>
    definition.roles.flatMap((role) =>
      definition.ecosystems.map((ecosystem) => `${role}:${ecosystem}:${definition.toolId}`),
    ),
  ),
);
const frontendToolIds = new Set(
  STACK_TOOL_DEFINITIONS.filter(
    (definition) => definition.roles.includes("frontend") || definition.roles.includes("mobile"),
  ).map((definition) => definition.toolId),
);
const backendToolIds = new Set(
  STACK_TOOL_DEFINITIONS.filter((definition) => definition.roles.includes("backend")).map(
    (definition) => definition.toolId,
  ),
);
const databaseToolIds = new Set(
  STACK_TOOL_DEFINITIONS.filter((definition) => definition.roles.includes("database")).map(
    (definition) => definition.toolId,
  ),
);
const stackPartEcosystemIds = new Set([
  ...EcosystemSchema.options,
  "kotlin",
  "swift",
  "dart",
  "universal",
]);

const SELECTION_ONLY_CATEGORIES = {
  webFrontend: "webFrontend",
  nativeFrontend: "nativeFrontend",
  backendLibraries: "backendLibraries",
  codeQuality: "codeQuality",
  documentation: "documentation",
  appPlatforms: "appPlatforms",
  aiSdk: "ai",
} as const satisfies Record<string, OptionCategory>;
const SELECTION_ONLY_ARRAY_KEYS: ReadonlySet<keyof typeof SELECTION_ONLY_CATEGORIES> = new Set([
  "webFrontend",
  "nativeFrontend",
  "codeQuality",
  "documentation",
  "appPlatforms",
]);

const FIXED_DIMENSION_VALUES: Readonly<
  Partial<Record<TelemetryStackDimensionKey, ReadonlySet<string>>>
> = {
  stackMode: new Set(["solo", "multi"]),
  decision_stage: new Set(TELEMETRY_DECISION_STAGES),
  selection_outcome: new Set(TELEMETRY_SELECTION_OUTCOMES),
  selected_evidence_level: new Set(CAPABILITY_EVIDENCE_LEVEL_IDS),
  selection_problem: new Set(TELEMETRY_SELECTION_PROBLEMS),
  starter_track: new Set(STARTER_TRACK_IDS),
  campaign: new Set(["run-before-you-clone"]),
  moment: new Set(["run", "download"]),
  placement: new Set(["hero", "preset_grid", "footer"]),
  preset: new Set([
    "t3",
    "nextjs-saas",
    "nextjs-minimal",
    "mern",
    "pern",
    "react-hono",
    "tanstack-start",
    "tanstack-hono",
    "sveltekit-fullstack",
    "sveltekit-hono",
    "nuxt-fullstack",
    "nuxt-hono",
    "astro-react",
    "astro-fullstack",
    "tanstack-fullstack",
    "solidstart-fullstack",
    "solid-hono",
    "angular-express",
    "qwik-city",
    "uniwind",
    "expo-bare",
    "ai-cli-agent-workbench",
    "ai-cli-react-hono",
    "ai-cli-frontend-lab",
    "rust-fullstack",
    "rust-api",
    "rust-grpc",
    "rust-cli",
    "python-fastapi",
    "python-django",
    "python-ai-agent",
    "python-ai-anthropic",
    "go-gin",
    "go-echo",
    "go-grpc",
    "go-cli",
    "java-spring",
    "java-jpa",
    "java-secure",
    "dotnet-minimal-api",
    "dotnet-graphql",
    "dotnet-worker",
    "elixir-phoenix-api",
    "elixir-liveview-full",
    "elixir-plain-worker",
  ]),
  target: new Set(["clipboard", "native", "x"]),
  view: new Set(["command", "preview", "run", "presets", "saved"]),
  targetEcosystem: new Set(EcosystemSchema.options),
  generatorKind: new Set(["resource", "route"]),
  registryAction: new Set(["add", "list"]),
};

function isTelemetryStackValue(value: unknown): value is TelemetryStackValue {
  return (
    typeof value === "string" ||
    typeof value === "boolean" ||
    (Array.isArray(value) && value.every((item) => typeof item === "string"))
  );
}

function sanitizeCanonicalList(
  value: unknown,
  allowed: ReadonlySet<string>,
  output: "array" | "comma-list",
  maxItems = MAX_ARRAY_ITEMS,
): string | string[] | undefined {
  if (typeof value === "string" && value.length > MAX_VALUE_LENGTH) return undefined;
  const entries =
    typeof value === "string"
      ? value.split(",").map((entry) => entry.trim())
      : Array.isArray(value) && value.every((entry) => typeof entry === "string")
        ? value
        : undefined;
  if (!entries || entries.length === 0 || entries.length > maxItems) return undefined;
  if (entries.some((entry) => !allowed.has(entry))) return undefined;
  const canonical = [...new Set(entries)];
  return output === "array" ? canonical : canonical.join(",");
}

function sanitizeProjectConfigValue(
  key: (typeof TELEMETRY_PROJECT_CONFIG_KEYS)[number],
  value: unknown,
): TelemetryStackValue | undefined {
  if (value === undefined) return undefined;
  if (key === "frontend") {
    const allowed = new Set(frontendToolIds).add("none");
    return sanitizeCanonicalList(value, allowed, "array");
  }
  if (key === "backend") {
    const allowed = new Set(backendToolIds).add("none");
    return sanitizeCanonicalList(value, allowed, "comma-list");
  }
  if (key === "database") {
    const allowed = new Set(databaseToolIds).add("none");
    return sanitizeCanonicalList(value, allowed, "comma-list");
  }
  if (key === "ecosystem") {
    const allowed = new Set(stackPartEcosystemIds);
    allowed.delete("universal");
    return sanitizeCanonicalList(value, allowed, "comma-list");
  }

  if (Array.isArray(value) && value.length > MAX_ARRAY_ITEMS) return undefined;
  const result = ProjectConfigSchema.shape[key].safeParse(value);
  return result.success && isTelemetryStackValue(result.data) ? result.data : undefined;
}

export function isTelemetryStackDimensionKey(key: string): key is TelemetryStackDimensionKey {
  return telemetryStackDimensionKeySet.has(key);
}

export function isRegisteredTelemetryStackPartSelection(value: string): boolean {
  return stackPartSelectionSet.has(value);
}

function sanitizeKnownValue(value: unknown, allowed: ReadonlySet<string>): string | undefined {
  return typeof value === "string" && allowed.has(value) ? value : undefined;
}

export function sanitizeTelemetryAction(value: unknown): string | undefined {
  return sanitizeKnownValue(value, actionIdSet);
}

export function sanitizeTelemetryMode(value: unknown): string | undefined {
  return sanitizeKnownValue(value, modeIdSet);
}

export function sanitizeTelemetryMachineId(value: unknown): string | undefined {
  return typeof value === "string" && UUID_V4_PATTERN.test(value) ? value.toLowerCase() : undefined;
}

export function sanitizeTelemetryErrorName(value: unknown): string | undefined {
  return sanitizeKnownValue(value, errorNameSet);
}

export function sanitizeTelemetryFailureStage(value: unknown): string | undefined {
  return sanitizeKnownValue(value, failureStageSet);
}

export function sanitizeTelemetryFailureReason(value: unknown): string | undefined {
  return sanitizeKnownValue(value, failureReasonSet);
}

export function sanitizeTelemetrySetupFailure(value: unknown): string | undefined {
  return sanitizeKnownValue(value, setupFailureIdSet);
}

export function sanitizeTelemetrySetupFailures(value: unknown): string[] | undefined {
  if (!Array.isArray(value) || value.length > 32) return undefined;
  const sanitized = value.map(sanitizeTelemetrySetupFailure);
  if (!sanitized.every((item): item is string => item !== undefined)) return undefined;
  return [...new Set(sanitized)];
}

export function sanitizeTelemetryCiProvider(value: unknown): string | undefined {
  return sanitizeKnownValue(value, ciProviderSet);
}

export function sanitizeTelemetryExecutionRuntime(value: unknown): string | undefined {
  return sanitizeKnownValue(value, executionRuntimeSet);
}

export function sanitizeTelemetryCliVersion(value: unknown): string | undefined {
  return typeof value === "string" && VERSION_PATTERN.test(value) ? value : undefined;
}

export function sanitizeTelemetryNodeVersion(value: unknown): string | undefined {
  return typeof value === "string" && NODE_VERSION_PATTERN.test(value) ? value : undefined;
}

export function sanitizeTelemetryPlatform(value: unknown): string | undefined {
  return sanitizeKnownValue(value, platformSet);
}

export function sanitizeTelemetryStackDimension(
  key: string,
  value: unknown,
): TelemetryStackValue | undefined {
  if (!isTelemetryStackDimensionKey(key)) return undefined;

  if (telemetryProjectConfigKeySet.has(key)) {
    return sanitizeProjectConfigValue(key as (typeof TELEMETRY_PROJECT_CONFIG_KEYS)[number], value);
  }

  const selectionCategory =
    SELECTION_ONLY_CATEGORIES[key as keyof typeof SELECTION_ONLY_CATEGORIES];
  if (selectionCategory) {
    const allowed = new Set(getCategoryOptionIds(selectionCategory));
    const isArray = SELECTION_ONLY_ARRAY_KEYS.has(key as keyof typeof SELECTION_ONLY_CATEGORIES);
    return sanitizeCanonicalList(
      value,
      allowed,
      isArray ? "array" : "comma-list",
      isArray ? MAX_ARRAY_ITEMS : 1,
    );
  }

  if (key === "stackPartSelections") {
    return sanitizeCanonicalList(value, stackPartSelectionSet, "array");
  }
  if (key === "stackPartRoles") {
    const roles = new Set(StackPartRoleSchema.options);
    return sanitizeCanonicalList(value, roles, "array");
  }
  if (key === "stackPartEcosystems") {
    return sanitizeCanonicalList(value, stackPartEcosystemIds, "array");
  }
  if (key === "multiEcosystem") return typeof value === "boolean" ? value : undefined;
  if (key === "rerun") return typeof value === "boolean" ? value : undefined;
  if (key === "bun_version") {
    return typeof value === "string" &&
      value.length <= MAX_VALUE_LENGTH &&
      VERSION_PATTERN.test(value)
      ? value
      : undefined;
  }

  const allowed = FIXED_DIMENSION_VALUES[key];
  return typeof value === "string" && allowed?.has(value) ? value : undefined;
}
