import {
  BackendSchema,
  type BetterTStackConfig,
  CATEGORY_ORDER,
  type CompatibilityInput,
  type CreateInput,
  EcosystemSchema,
  EffectSchema,
  ExamplesSchema,
  FrontendSchema,
  OPTION_CATEGORY_METADATA,
  type OptionCategory,
  type OptionCategoryEcosystem,
  type ProjectConfig,
  TEMPLATE_VALUES,
  type Template,
  analyzeStackCompatibility,
  formatStackPartSpec,
  getCategoryOrderForEcosystem,
  getCodeQualitySelectionIssue,
  getReplacedCodeQualityTools,
  getToolingCapability,
  getToolingCategory,
  getToolingSelectionOptions,
  isToolingOverlayOnly,
  legacyProjectConfigToStackParts,
  mergeProjectConfigSettingsIntoStackParts,
  parseStackPartSpecs,
  stackPartsToLegacyProjectConfigPartial,
  validateStackParts,
} from "@better-fullstack/types";

import type { planMcpPartRemoval } from "@/mcp/mcp-project-lifecycle";

import { getStarterTrackRecommendation } from "@/commands/stack/starter-tracks";
import { applyEffectBackendDefaults } from "@/config/config-processing";
import { getEffectiveStack, getGraphSummary } from "@/config/graph-summary";
import { getCompatibilityBackend } from "@/config/stack-compatibility";
import { getTemplateConfig, getTemplateDescription } from "@/config/templates";

const MCP_ECOSYSTEMS = new Set<OptionCategoryEcosystem>(
  EcosystemSchema.options as OptionCategoryEcosystem[],
);

const MCP_SHARED_SCHEMA_KEYS = [
  "ecosystem",
  "packageManager",
  "examples",
  "webDeploy",
  "serverDeploy",
  "dbSetup",
] as const;

export const MCP_SHARED_COMPATIBILITY_KEYS = [
  ...MCP_SHARED_SCHEMA_KEYS,
  "projectName",
  "git",
  "install",
  "aiDocs",
] as const;

const MCP_LEGACY_CATEGORY_KEYS: Partial<Record<OptionCategory, readonly string[]>> = {
  webFrontend: ["frontend"],
  nativeFrontend: ["frontend"],
  backendLibraries: ["effect"],
};

const MCP_SCHEMA_EXCLUDED_CATEGORIES = new Set<OptionCategory>([
  "webFrontend",
  "nativeFrontend",
  "backendLibraries",
  "aiDocs",
  "git",
  "install",
  "versionChannel",
]);

const MCP_SCHEMA_OPTION_OVERRIDES = {
  ecosystem: EcosystemSchema.options,
  frontend: FrontendSchema.options,
  backend: BackendSchema.options,
  examples: ExamplesSchema.options,
  effect: EffectSchema.options,
} as const satisfies Record<string, readonly string[]>;

const MCP_ALL_SCHEMA_KEYS = [
  "ecosystem",
  ...CATEGORY_ORDER.flatMap((category) => MCP_LEGACY_CATEGORY_KEYS[category] ?? [category]).filter(
    (key, index, keys) => keys.indexOf(key) === index,
  ),
].filter((key) => getMcpSchemaOptionValues(key).length > 0);

export function isMcpEcosystem(ecosystem: string): ecosystem is OptionCategoryEcosystem {
  return MCP_ECOSYSTEMS.has(ecosystem as OptionCategoryEcosystem);
}

function getMcpSchemaOptionValues(key: string): string[] {
  const override = MCP_SCHEMA_OPTION_OVERRIDES[key as keyof typeof MCP_SCHEMA_OPTION_OVERRIDES];
  if (override) return [...override];

  const categories =
    key in OPTION_CATEGORY_METADATA && !MCP_SCHEMA_EXCLUDED_CATEGORIES.has(key as OptionCategory)
      ? [key as OptionCategory]
      : [];

  return [
    ...new Set(
      categories.flatMap((category) =>
        OPTION_CATEGORY_METADATA[category].options.map((option) => option.id),
      ),
    ),
  ];
}

export function getMcpCategoryKeysForEcosystem(ecosystem: OptionCategoryEcosystem): string[] {
  const keys = getCategoryOrderForEcosystem(ecosystem).flatMap(
    (category) => MCP_LEGACY_CATEGORY_KEYS[category] ?? [category],
  );
  return [...new Set(keys.filter((key) => getMcpSchemaOptionValues(key).length > 0))];
}

function getMcpSchemaKeysForEcosystem(ecosystem: OptionCategoryEcosystem): Set<string> {
  return new Set([...getMcpCategoryKeysForEcosystem(ecosystem), ...MCP_SHARED_SCHEMA_KEYS]);
}

export function getSchemaOptions(category?: string, ecosystem?: string) {
  if (category) {
    const options = getMcpSchemaOptionValues(category);
    if (options.length === 0) {
      return {
        error: `Unknown category: ${category}. Available: ${MCP_ALL_SCHEMA_KEYS.join(", ")}`,
      };
    }
    return { category, options };
  }
  const allowedKeys =
    ecosystem && isMcpEcosystem(ecosystem) ? getMcpSchemaKeysForEcosystem(ecosystem) : null;
  const result: Record<string, string[]> = {};
  for (const key of MCP_ALL_SCHEMA_KEYS) {
    if (allowedKeys && !allowedKeys.has(key)) continue;
    result[key] = getMcpSchemaOptionValues(key);
  }
  return result;
}

export function getInstallCommand(
  ecosystem: string,
  projectName: string,
  packageManager?: string,
  javaBuildTool?: string,
  javaWebFramework?: string,
  pythonPackageManager?: string,
): string {
  switch (ecosystem) {
    case "rust":
      return `cd ${projectName} && cargo build`;
    case "python":
      if (pythonPackageManager === "poetry")
        return `cd ${projectName} && poetry install --extras dev`;
      if (pythonPackageManager === "none") {
        const python = process.platform === "win32" ? "python" : "python3";
        const pip = process.platform === "win32" ? ".venv/Scripts/pip.exe" : ".venv/bin/pip";
        return `cd ${projectName} && ${python} -m venv .venv && ${pip} install -e ".[dev]"`;
      }
      return `cd ${projectName} && uv sync --extra dev`;
    case "go":
      return `cd ${projectName} && go mod tidy`;
    case "elixir":
      return `cd ${projectName} && mix deps.get && mix compile && mix test`;
    case "java":
      if (javaWebFramework === "quarkus") {
        return javaBuildTool === "gradle"
          ? `cd ${projectName} && ./gradlew test && ./gradlew quarkusDev`
          : `cd ${projectName} && ./mvnw test && ./mvnw quarkus:dev`;
      }
      return javaBuildTool === "gradle"
        ? `cd ${projectName} && ./gradlew test && ./gradlew bootRun`
        : `cd ${projectName} && ./mvnw test && ./mvnw spring-boot:run`;
    default:
      return `cd ${projectName} && ${packageManager ?? "bun"} install`;
  }
}

export function filterCompatibilityResult(
  result: {
    adjustedStack: CompatibilityInput | null;
    notes: Record<string, unknown>;
    changes: { category: string; message: string }[];
  },
  ecosystem: string,
) {
  const { adjustedStack, changes } = result;
  if (!adjustedStack) return { adjustedStack: null, changes };

  const relevantEcosystem = isMcpEcosystem(ecosystem) ? ecosystem : "typescript";
  const relevantKeys = new Set([
    ...getMcpCategoryKeysForEcosystem(relevantEcosystem),
    ...MCP_SHARED_COMPATIBILITY_KEYS,
  ]);
  const filtered: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(adjustedStack)) {
    if (relevantKeys.has(key)) filtered[key] = value;
  }
  return { adjustedStack: filtered, changes };
}

const MCP_CODE_QUALITY_ADDONS = new Set([
  "eslint",
  "prettier",
  "shadcn-lint",
  "biome",
  "oxlint",
  "ultracite",
  "lefthook",
  "husky",
  "knip",
  "gitleaks",
  "ruler",
]);
const MCP_DOCUMENTATION_ADDONS = new Set(["starlight", "fumadocs"]);

const MCP_COMPATIBILITY_DEFAULTS = {
  astroIntegration: "none",
  runtime: "bun",
  backend: "hono",
  database: "none",
  orm: "none",
  dbSetup: "none",
  auth: "none",
  payments: "none",
  email: "none",
  fileUpload: "none",
  logging: "none",
  observability: "none",
  featureFlags: "none",
  integrations: "none",
  ecommerce: "none",
  analytics: "none",
  webMcp: "none",
  backendLibraries: "none",
  stateManagement: "none",
  forms: "none",
  validation: "none",
  testing: "none",
  realtime: "none",
  jobQueue: "none",
  caching: "none",
  rateLimit: "none",
  botProtection: "none",
  i18n: "none",
  animation: "none",
  cssFramework: "tailwind",
  uiLibrary: "none",
  shadcnBase: "radix",
  shadcnStyle: "nova",
  shadcnIconLibrary: "lucide",
  shadcnColorTheme: "neutral",
  shadcnBaseColor: "neutral",
  shadcnFont: "inter",
  shadcnRadius: "default",
  cms: "none",
  search: "none",
  vectorDb: "none",
  fileStorage: "none",
  mobileUI: "none",
  mobileStorage: "none",
  mobileTesting: "none",
  mobilePush: "none",
  mobileOTA: "none",
  mobileLibraries: [],
  packageManager: "bun",
  workspaceShape: "monorepo",
  versionChannel: "stable",
  examples: [],
  aiSdk: "none",
  aiDocs: ["claude-md", "agents-md"],
  git: "true",
  install: "false",
  api: "none",
  webDeploy: "none",
  serverDeploy: "none",
  yolo: "false",
  rustWebFramework: "none",
  rustFrontend: "none",
  rustOrm: "none",
  rustApi: "none",
  rustCli: "none",
  rustLibraries: [],
  rustLogging: "none",
  rustErrorHandling: "none",
  rustCaching: "none",
  rustAuth: "none",
  rustRealtime: "none",
  rustMessageQueue: "none",
  rustObservability: "none",
  rustTemplating: "none",
  pythonWebFramework: "none",
  pythonOrm: "none",
  pythonValidation: "none",
  pythonAi: [],
  pythonAuth: "none",
  pythonApi: "none",
  pythonTaskQueue: "none",
  pythonGraphql: "none",
  pythonQuality: "none",
  pythonTesting: [],
  pythonCaching: "none",
  pythonRealtime: "none",
  pythonObservability: "none",
  pythonCli: [],
  pythonCloudSdk: "none",
  pythonHttpClient: "none",
  pythonData: [],
  pythonMedia: "none",
  pythonServer: "none",
  pythonPackageManager: "uv",
  pythonMessageQueue: "none",
  goWebFramework: "none",
  goOrm: "none",
  goApi: "none",
  goCli: "none",
  goLogging: "none",
  goAuth: "none",
  goTesting: [],
  goRealtime: "none",
  goMessageQueue: "none",
  goCaching: "none",
  goConfig: "none",
  goObservability: "none",
  goValidation: "none",
  goQuality: "none",
  goMigrations: "none",
  goTemplating: "none",
  goProtoTooling: "none",
  goDI: "none",
  javaLanguage: "java",
  javaWebFramework: "spring-boot",
  javaBuildTool: "maven",
  javaOrm: "none",
  javaAuth: "none",
  javaApi: "none",
  javaLogging: "none",
  javaLibraries: [],
  javaTestingLibraries: ["junit5"],
  dotnetWebFramework: "aspnet-minimal",
  dotnetOrm: "ef-core",
  dotnetAuth: "aspnet-identity",
  dotnetApi: "minimal-api",
  dotnetTesting: ["xunit"],
  dotnetJobQueue: "none",
  dotnetRealtime: "signalr",
  dotnetObservability: ["serilog"],
  dotnetValidation: "none",
  dotnetCaching: "none",
  dotnetDeploy: "docker",
  dotnetLibraries: [],
  elixirWebFramework: "phoenix",
  elixirOrm: "ecto-sql",
  elixirAuth: "none",
  elixirApi: "rest",
  elixirRealtime: "channels",
  elixirJobs: "none",
  elixirValidation: "ecto-changesets",
  elixirHttp: "req",
  elixirJson: "jason",
  elixirEmail: "none",
  elixirCaching: "none",
  elixirObservability: "telemetry",
  elixirTesting: "ex_unit",
  elixirQuality: "credo",
  elixirI18n: "none",
  elixirHttpServer: "cowboy",
  elixirApplicationFramework: "none",
  elixirDocumentation: "none",
  elixirClustering: "none",
  elixirDeploy: "none",
  elixirLibraries: [],
} satisfies Partial<Record<keyof CompatibilityInput, string | string[]>>;

const {
  backendLibraries: _backendLibrariesDefault,
  aiSdk: _aiSdkDefault,
  git: _compatibilityGitDefault,
  install: _compatibilityInstallDefault,
  yolo: _yoloDefault,
  ...MCP_PROJECT_COMPATIBILITY_DEFAULTS
} = MCP_COMPATIBILITY_DEFAULTS;

const MCP_PROJECT_CONFIG_DEFAULTS = {
  ...MCP_PROJECT_COMPATIBILITY_DEFAULTS,
  addons: [],
  effect: "none",
  ai: "none",
} satisfies Partial<Record<keyof ProjectConfig, string | string[]>>;

function cloneMcpInputDefault<T extends string | string[]>(value: T): T {
  return (Array.isArray(value) ? [...value] : value) as T;
}

function applyMcpInputDefaults<TDefaults extends Record<string, string | string[]>>(
  defaults: TDefaults,
  input: Record<string, unknown>,
) {
  return Object.fromEntries(
    Object.entries(defaults).map(([key, fallback]) => [
      key,
      input[key] ?? cloneMcpInputDefault(fallback),
    ]),
  );
}

function getMcpCompatibilityDefaults(input: Record<string, unknown>) {
  return applyMcpInputDefaults(MCP_COMPATIBILITY_DEFAULTS, input) as Pick<
    CompatibilityInput,
    keyof typeof MCP_COMPATIBILITY_DEFAULTS
  >;
}

function getMcpProjectConfigDefaults(input: Record<string, unknown>) {
  return applyMcpInputDefaults(MCP_PROJECT_CONFIG_DEFAULTS, input) as Pick<
    ProjectConfig,
    keyof typeof MCP_PROJECT_CONFIG_DEFAULTS
  >;
}

export function validateMcpProjectConfigCompatibility(
  config: Pick<ProjectConfig, "ecosystem" | "integrations"> &
    Partial<Pick<ProjectConfig, "backend" | "runtime" | "webDeploy" | "stackParts" | "addons">>,
): void {
  const qualityIssue = getCodeQualitySelectionIssue(config.addons ?? []);
  if (qualityIssue) throw new Error(qualityIssue);
  if (config.stackParts?.length && !isToolingOverlayOnly(config.stackParts)) {
    const qualityIssues = validateStackParts(config.stackParts).issues.filter(
      (issue) => issue.role === "codeQuality",
    );
    if (qualityIssues.length)
      throw new Error(qualityIssues.map((issue) => issue.message).join("\n"));
  }
  if (config.integrations !== "nango") return;

  const nangoPart = config.stackParts?.find(
    (part) => part.role === "integrations" && part.toolId === "nango",
  );
  const nangoOwner = nangoPart?.ownerPartId
    ? config.stackParts?.find((part) => part.id === nangoPart.ownerPartId)
    : undefined;
  const hasTypeScriptNangoOwner =
    nangoOwner?.role === "backend" && nangoOwner.ecosystem === "typescript";

  if (config.ecosystem !== "typescript" && !hasTypeScriptNangoOwner) {
    throw new Error("Nango integrations are supported only for TypeScript projects");
  }
  if (config.backend === "none") {
    throw new Error("Nango integrations require a generated backend");
  }
  if (config.backend === "convex") {
    throw new Error("Nango integrations are not available with the Convex backend");
  }
  if (
    config.runtime === "workers" ||
    (config.backend === "self" && config.webDeploy === "cloudflare")
  ) {
    throw new Error("Nango's Node SDK is not available on Cloudflare Workers");
  }
}

export function buildProjectConfig(
  input: Record<string, unknown>,
  overrides?: { projectDir: string },
): ProjectConfig {
  const projectName = (input.projectName as string) ?? "my-project";
  const ecosystem = (input.ecosystem as ProjectConfig["ecosystem"]) ?? "typescript";
  const frontend =
    (input.frontend as ProjectConfig["frontend"]) ??
    (ecosystem === "react-native"
      ? ["native-bare"]
      : ecosystem === "typescript"
        ? ["tanstack-router"]
        : ["none"]);
  const hasNativeFrontend = frontend.some((item) => item.startsWith("native-"));
  const hasMobileProject = ecosystem === "react-native" || hasNativeFrontend;
  const defaults = getMcpProjectConfigDefaults(input);

  const config: ProjectConfig = {
    projectName,
    projectDir: overrides?.projectDir ?? "/virtual",
    relativePath: overrides ? `./${projectName}` : "./virtual",
    ecosystem,
    frontend,
    ...defaults,
    backend:
      (input.backend as ProjectConfig["backend"]) ??
      (ecosystem === "react-native" ? "none" : defaults.backend),
    runtime:
      (input.runtime as ProjectConfig["runtime"]) ??
      (ecosystem === "react-native" ? "none" : defaults.runtime),
    cssFramework:
      (input.cssFramework as ProjectConfig["cssFramework"]) ??
      (ecosystem === "react-native" ? "none" : defaults.cssFramework),
    mobileNavigation:
      (input.mobileNavigation as ProjectConfig["mobileNavigation"]) ??
      (hasMobileProject ? "expo-router" : "none"),
    mobileDeepLinking:
      (input.mobileDeepLinking as ProjectConfig["mobileDeepLinking"]) ??
      (hasMobileProject ? "expo-linking" : "none"),
    shadcnBase: (input.shadcnBase as ProjectConfig["shadcnBase"]) ?? "radix",
    shadcnStyle: (input.shadcnStyle as ProjectConfig["shadcnStyle"]) ?? "nova",
    shadcnIconLibrary: (input.shadcnIconLibrary as ProjectConfig["shadcnIconLibrary"]) ?? "lucide",
    shadcnColorTheme: (input.shadcnColorTheme as ProjectConfig["shadcnColorTheme"]) ?? "neutral",
    shadcnBaseColor: (input.shadcnBaseColor as ProjectConfig["shadcnBaseColor"]) ?? "neutral",
    shadcnFont: (input.shadcnFont as ProjectConfig["shadcnFont"]) ?? "inter",
    shadcnRadius: (input.shadcnRadius as ProjectConfig["shadcnRadius"]) ?? "default",
    aiDocs: (input.aiDocs as ProjectConfig["aiDocs"]) ?? ["claude-md", "agents-md"],
    git: false,
    install: false,
  };

  if (Array.isArray(input.addons) && input.addons.length > 0) {
    config.addons = [
      ...new Set([
        ...config.addons,
        ...input.addons.filter(
          (addon): addon is Exclude<ProjectConfig["addons"][number], "none"> =>
            typeof addon === "string" && addon !== "none",
        ),
      ]),
    ];
  }

  if (Array.isArray(input.part) && input.part.length > 0) {
    let stackParts = mergeProjectConfigSettingsIntoStackParts(
      parseStackPartSpecs(
        input.part.filter((part): part is string => typeof part === "string"),
        "selected",
      ),
      config,
    );
    if (isToolingOverlayOnly(stackParts)) {
      config.stackParts = stackParts;
      config.addons = [
        ...new Set([...config.addons, ...stackParts.map((part) => part.toolId)]),
      ] as ProjectConfig["addons"];
    } else {
      const graphTools = stackParts.flatMap((part) =>
        getToolingCapability(part.toolId) ? [part.toolId] : [],
      );
      const replacedCategories = new Set(
        graphTools.flatMap((toolId) => {
          const category = getToolingCapability(toolId)?.category;
          return category && getToolingCategory(category)?.selectionMode === "single"
            ? [category]
            : [];
        }),
      );
      if (graphTools.includes("vite-plus")) {
        replacedCategories.add("workspaceRunner");
        replacedCategories.add("codeQuality");
        replacedCategories.add("gitHooks");
      }
      const replacedQualityTools = getReplacedCodeQualityTools(graphTools);
      const retainedAddons = config.addons.filter((toolId) => {
        if (toolId === "none" || replacedQualityTools.includes(toolId)) return false;
        const capability = getToolingCapability(toolId);
        return !capability || !replacedCategories.has(capability.category);
      });
      if (retainedAddons.length) {
        const specs = mergeLegacyAddonParts(
          input.part.filter((part): part is string => typeof part === "string"),
          retainedAddons,
          { completeProfiles: false },
        );
        stackParts = mergeProjectConfigSettingsIntoStackParts(
          parseStackPartSpecs(specs ?? [], "selected"),
          config,
        );
      }
      Object.assign(config, stackPartsToLegacyProjectConfigPartial(stackParts), { stackParts });
    }
  }

  applyEffectBackendDefaults(config, new Set(Object.keys(input)));
  validateMcpProjectConfigCompatibility(config);

  return config;
}

export function diffAddedCapabilities(
  before: Partial<ProjectConfig> | null | undefined,
  after: Partial<ProjectConfig> | null | undefined,
): string[] {
  const beforeAddons = new Set(before?.addons ?? []);
  const added: string[] = [];
  for (const addon of after?.addons ?? []) {
    if (addon === "none" || beforeAddons.has(addon)) continue;
    const capability = getToolingCapability(addon);
    const owner = capability?.ownerRole ? `${capability.ownerRole}.` : "";
    added.push(capability ? `${owner}${capability.role}:${capability.ecosystem}:${addon}` : addon);
  }
  for (const key of ["webDeploy", "serverDeploy"] as const) {
    const next = after?.[key];
    if (next && next !== "none" && next !== before?.[key]) added.push(`${key}:${next}`);
  }
  return added;
}

export const WORKSPACE_RUNNERS: ReadonlySet<string> = new Set(["turborepo", "nx", "vite-plus"]);

export function mergeLegacyAddonParts(
  part?: string[],
  addons?: string[],
  options = { completeProfiles: true },
): string[] | undefined {
  const addonSpecs = (addons ?? [])
    .filter((addon) => addon !== "none")
    .flatMap((addon) => {
      const capability = getToolingCapability(addon);
      if (!capability) throw new Error(`Unknown addon '${addon}'`);
      const profile = getToolingSelectionOptions(capability.category).find((option) =>
        option.toolIds.includes(addon),
      );
      return (
        options.completeProfiles && profile?.toolIds.length ? [...profile.toolIds] : [addon]
      ).map((toolId) => {
        const toolCapability = getToolingCapability(toolId);
        if (!toolCapability) throw new Error(`Unknown addon '${toolId}'`);
        const owner = toolCapability.ownerRole ? `${toolCapability.ownerRole}.` : "";
        return `${owner}${toolCapability.role}:${toolCapability.ecosystem}:${toolId}`;
      });
    });
  const merged = [...new Set([...(part ?? []), ...addonSpecs])];
  return merged.length > 0 ? merged : undefined;
}

export function buildMcpCompatibilityInput(input: Record<string, unknown>): CompatibilityInput {
  const frontend = input.frontend as string[] | undefined;
  const webFrontend = (frontend ?? []).filter((item) => !item.startsWith("native-"));
  const nativeFrontend = (frontend ?? []).filter((item) => item.startsWith("native-"));
  const addons = (input.addons as string[] | undefined) ?? [];
  const ecosystem = (input.ecosystem as CompatibilityInput["ecosystem"]) ?? "typescript";
  const hasMobileProject = ecosystem === "react-native" || nativeFrontend.length > 0;
  const defaults = getMcpCompatibilityDefaults(input);

  const codeQuality = addons.filter((a) => MCP_CODE_QUALITY_ADDONS.has(a));
  const documentation = addons.filter((a) => MCP_DOCUMENTATION_ADDONS.has(a));
  const appPlatforms = addons.filter(
    (a) => ![...codeQuality, ...documentation, "none"].includes(a),
  );

  const result: CompatibilityInput = {
    ecosystem,
    projectName: (input.projectName as string) ?? null,
    webFrontend,
    nativeFrontend,
    ...defaults,
    dotnetFrontend: (input.dotnetFrontend as string) ?? "none",
    kotlinMobile: (input.kotlinMobile as string) ?? "none",
    kotlinMobileLibraries: Array.isArray(input.kotlinMobileLibraries)
      ? (input.kotlinMobileLibraries as string[])
      : [],
    swiftMobile: (input.swiftMobile as string) ?? "none",
    dartMobile: (input.dartMobile as string) ?? "none",
    mobileNavigation:
      (input.mobileNavigation as string) ?? (hasMobileProject ? "expo-router" : "none"),
    mobileDeepLinking:
      (input.mobileDeepLinking as string) ?? (hasMobileProject ? "expo-linking" : "none"),
    codeQuality,
    documentation,
    appPlatforms,
    aiSdk: (input.ai as string) ?? defaults.aiSdk,
  };

  result.backend = getCompatibilityBackend(
    { backend: result.backend as ProjectConfig["backend"] },
    webFrontend,
  );

  if (result.backend === "effect") {
    if (input.effect === undefined) {
      result.backendLibraries = "effect-full";
    }
    if (input.validation === undefined) {
      result.validation = "effect-schema";
    }
  }

  return result;
}

export function summarizeTree(tree: {
  fileCount: number;
  directoryCount: number;
  root: { children: { type: string; name: string; children?: unknown[] }[] };
}) {
  const paths: string[] = [];
  function walk(nodes: { type: string; name: string; children?: unknown[] }[], prefix: string) {
    for (const node of nodes) {
      const current = prefix ? `${prefix}/${node.name}` : node.name;
      if (node.type === "directory" && node.children) {
        walk(node.children as typeof nodes, current);
      } else {
        paths.push(current);
      }
    }
  }
  walk(tree.root.children, "");
  return { fileCount: tree.fileCount, directoryCount: tree.directoryCount, files: paths };
}

type McpGraphPreview = {
  graphSummary?: string;
  effectiveStack?: Record<string, string>;
  stackPartSpecs: string[];
};

export function getMcpGraphPreview(
  config: Partial<ProjectConfig> | BetterTStackConfig,
): McpGraphPreview {
  const stackParts = config.stackParts?.length
    ? config.stackParts
    : legacyProjectConfigToStackParts(config);
  const graphSummary = stackParts.length > 0 ? getGraphSummary({ stackParts }) : undefined;
  const effectiveStack = stackParts.length > 0 ? getEffectiveStack({ stackParts }) : undefined;
  const stackPartSpecs = stackParts
    .filter((part) => part.source !== "provided" && part.toolId !== "none")
    .map((part) => formatStackPartSpec(part, stackParts));

  return {
    ...(graphSummary ? { graphSummary, effectiveStack } : {}),
    stackPartSpecs,
  };
}

export function projectPartRemovalPayload(payload: Awaited<ReturnType<typeof planMcpPartRemoval>>) {
  if (!payload.success) return payload;
  const {
    filesUnchanged: _filesUnchanged,
    operations: _operations,
    preimages: _preimages,
    versionChannelRewrites: _versionChannelRewrites,
    ...projected
  } = payload;
  return projected;
}

function buildPresetStackSummary(config: CreateInput): string {
  const parts: string[] = [];
  const frontend = (config.frontend ?? []).filter((item) => item !== "none");
  if (frontend.length > 0) parts.push(`frontend: ${frontend.join("+")}`);
  if (config.backend && config.backend !== "none") parts.push(`backend: ${config.backend}`);
  if (config.runtime && config.runtime !== "none") parts.push(`runtime: ${config.runtime}`);
  if (config.database && config.database !== "none") parts.push(`database: ${config.database}`);
  if (config.orm && config.orm !== "none") parts.push(`orm: ${config.orm}`);
  if (config.api && config.api !== "none") parts.push(`api: ${config.api}`);
  if (config.auth && config.auth !== "none") parts.push(`auth: ${config.auth}`);
  if (config.payments && config.payments !== "none") parts.push(`payments: ${config.payments}`);
  const graph = getMcpGraphPreview(config);
  if (graph.stackPartSpecs.length > 0) parts.push(`parts: ${graph.stackPartSpecs.join("+")}`);
  return parts.join(", ");
}

export function listMcpPresets() {
  const presets: {
    id: Template;
    name: string;
    description: string;
    ecosystem: "typescript" | "react-native";
    stackSummary: string;
    stack: CreateInput;
  }[] = [];
  for (const id of TEMPLATE_VALUES) {
    if (id === "none") continue;
    const config = getTemplateConfig(id);
    if (!config) continue;
    const frontend = (config.frontend ?? []) as string[];
    const ecosystem = frontend.some((item) => item.startsWith("native-"))
      ? "react-native"
      : "typescript";
    presets.push({
      id,
      name: id.toUpperCase(),
      description: getTemplateDescription(id),
      ecosystem,
      stackSummary: buildPresetStackSummary(config),
      stack: config,
    });
  }
  return presets;
}

export function recommendStackFromBrief(brief: string, ecosystemHint?: ProjectConfig["ecosystem"]) {
  return getStarterTrackRecommendation({ brief, ecosystem: ecosystemHint });
}

export function compatibilityWarningsForStackUpdate(
  proposedConfig: BetterTStackConfig,
): string[] | undefined {
  const compatResult = analyzeStackCompatibility(buildMcpCompatibilityInput(proposedConfig), {
    normalizeCodeQualityProfiles: false,
  });
  return compatResult.changes.length > 0
    ? compatResult.changes.map((change) => change.message)
    : undefined;
}
