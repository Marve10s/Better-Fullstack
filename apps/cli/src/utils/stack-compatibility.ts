import {
  analyzeStackCompatibility,
  getAddonStackPartBinding,
  type CompatibilityInput,
  type ProjectConfig,
} from "../types";

export function asString(value: unknown, fallback = "none"): string {
  return typeof value === "string" ? value : fallback;
}

export function asStringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

export function getCompatibilityBackend(
  config: Partial<ProjectConfig>,
  webFrontend: string[],
): string {
  if (config.backend !== "self") return asString(config.backend, "hono");
  if (webFrontend.includes("next")) return "self-next";
  if (webFrontend.includes("vinext")) return "self-vinext";
  if (webFrontend.includes("tanstack-start")) return "self-tanstack-start";
  if (webFrontend.includes("astro")) return "self-astro";
  if (webFrontend.includes("nuxt")) return "self-nuxt";
  if (webFrontend.includes("svelte")) return "self-svelte";
  if (webFrontend.includes("solid-start")) return "self-solid-start";
  return "self";
}

function getProjectBackendFromCompatibility(backend: string): string {
  return backend.startsWith("self-") ? "self" : backend;
}

function hasSelectedTypeScriptBackendPart(config: Partial<ProjectConfig>): boolean {
  return (
    config.stackParts?.some(
      (part) =>
        part.source !== "provided" &&
        !part.ownerPartId &&
        part.role === "backend" &&
        part.ecosystem === "typescript" &&
        part.toolId !== "none",
    ) ?? false
  );
}

function getCompatibilityEcosystem(config: Partial<ProjectConfig>): ProjectConfig["ecosystem"] {
  if (config.ecosystem === "react-native" && hasSelectedTypeScriptBackendPart(config)) {
    return "typescript";
  }
  return config.ecosystem ?? "typescript";
}

export function buildCompatibilityInputFromConfig(
  config: Partial<ProjectConfig>,
): CompatibilityInput {
  const frontend = asStringArray(config.frontend);
  const addons = asStringArray(config.addons);
  const webFrontend = frontend.filter((item) => !item.startsWith("native-") && item !== "none");
  const nativeFrontend = frontend.filter((item) => item.startsWith("native-"));
  const codeQuality: string[] = [];
  const documentation: string[] = [];
  const appPlatforms: string[] = [];

  for (const addon of addons) {
    const binding = getAddonStackPartBinding(addon);
    if (binding?.role === "codeQuality") {
      codeQuality.push(addon);
    } else if (binding?.role === "documentation") {
      documentation.push(addon);
    } else if (addon !== "none") {
      appPlatforms.push(addon);
    }
  }

  return {
    ecosystem: getCompatibilityEcosystem(config),
    projectName: config.projectName ?? null,
    webFrontend,
    nativeFrontend,
    astroIntegration: asString(config.astroIntegration),
    runtime: asString(config.runtime, "bun"),
    backend: getCompatibilityBackend(config, webFrontend),
    database: asString(config.database),
    orm: asString(config.orm),
    dbSetup: asString(config.dbSetup),
    auth: asString(config.auth),
    payments: asString(config.payments),
    email: asString(config.email),
    fileUpload: asString(config.fileUpload),
    logging: asString(config.logging),
    observability: asString(config.observability),
    featureFlags: asString(config.featureFlags),
    analytics: asString(config.analytics),
    backendLibraries: asString(config.effect),
    stateManagement: asString(config.stateManagement),
    forms: asString(config.forms),
    validation: asString(config.validation),
    testing: asString(config.testing),
    realtime: asString(config.realtime),
    jobQueue: asString(config.jobQueue),
    caching: asString(config.caching),
    rateLimit: asString(config.rateLimit),
    animation: asString(config.animation),
    cssFramework: asString(config.cssFramework),
    uiLibrary: asString(config.uiLibrary),
    shadcnBase: asString(config.shadcnBase, "radix"),
    shadcnStyle: asString(config.shadcnStyle, "nova"),
    shadcnIconLibrary: asString(config.shadcnIconLibrary, "lucide"),
    shadcnColorTheme: asString(config.shadcnColorTheme, "neutral"),
    shadcnBaseColor: asString(config.shadcnBaseColor, "neutral"),
    shadcnFont: asString(config.shadcnFont, "inter"),
    shadcnRadius: asString(config.shadcnRadius, "default"),
    cms: asString(config.cms),
    i18n: asString(config.i18n),
    search: asString(config.search),
    vectorDb: asString(config.vectorDb),
    fileStorage: asString(config.fileStorage),
    mobileNavigation: asString(config.mobileNavigation),
    mobileUI: asString(config.mobileUI),
    mobileStorage: asString(config.mobileStorage),
    mobileTesting: asString(config.mobileTesting),
    mobilePush: asString(config.mobilePush),
    mobileOTA: asString(config.mobileOTA),
    mobileDeepLinking: asString(config.mobileDeepLinking),
    mobileLibraries: asStringArray(config.mobileLibraries),
    codeQuality,
    documentation,
    appPlatforms,
    packageManager: asString(config.packageManager, "bun"),
    workspaceShape: asString(config.workspaceShape, "monorepo"),
    versionChannel: asString(config.versionChannel, "stable"),
    examples: asStringArray(config.examples),
    aiSdk: asString(config.ai),
    aiDocs: asStringArray(config.aiDocs),
    git: "false",
    install: "false",
    api: asString(config.api),
    webDeploy: asString(config.webDeploy),
    serverDeploy: asString(config.serverDeploy),
    yolo: "false",
    rustWebFramework: asString(config.rustWebFramework),
    rustFrontend: asString(config.rustFrontend),
    rustOrm: asString(config.rustOrm),
    rustApi: asString(config.rustApi),
    rustCli: asString(config.rustCli),
    rustLibraries: asStringArray(config.rustLibraries),
    rustLogging: asString(config.rustLogging),
    rustErrorHandling: asString(config.rustErrorHandling),
    rustCaching: asString(config.rustCaching),
    rustAuth: asString(config.rustAuth),
    rustRealtime: asString(config.rustRealtime),
    rustMessageQueue: asString(config.rustMessageQueue),
    rustObservability: asString(config.rustObservability),
    rustTemplating: asString(config.rustTemplating),
    pythonWebFramework: asString(config.pythonWebFramework),
    pythonOrm: asString(config.pythonOrm),
    pythonValidation: asString(config.pythonValidation),
    pythonAi: asStringArray(config.pythonAi),
    pythonAuth: asString(config.pythonAuth),
    pythonApi: asString(config.pythonApi),
    pythonTaskQueue: asString(config.pythonTaskQueue),
    pythonGraphql: asString(config.pythonGraphql),
    pythonQuality: asString(config.pythonQuality),
    pythonTesting: asStringArray(config.pythonTesting),
    pythonCaching: asString(config.pythonCaching),
    pythonRealtime: asString(config.pythonRealtime),
    pythonObservability: asString(config.pythonObservability),
    pythonCli: asStringArray(config.pythonCli),
    pythonCloudSdk: asString(config.pythonCloudSdk),
    pythonHttpClient: asString(config.pythonHttpClient),
    pythonData: asStringArray(config.pythonData),
    pythonMedia: asString(config.pythonMedia),
    pythonServer: asString(config.pythonServer),
    pythonPackageManager: asString(config.pythonPackageManager),
    pythonMessageQueue: asString(config.pythonMessageQueue),
    goWebFramework: asString(config.goWebFramework),
    goOrm: asString(config.goOrm),
    goApi: asString(config.goApi),
    goCli: asString(config.goCli),
    goLogging: asString(config.goLogging),
    goAuth: asString(config.goAuth),
    goTesting: asStringArray(config.goTesting),
    goRealtime: asString(config.goRealtime),
    goMessageQueue: asString(config.goMessageQueue),
    goCaching: asString(config.goCaching),
    goConfig: asString(config.goConfig),
    goObservability: asString(config.goObservability),
    goValidation: asString(config.goValidation),
    goQuality: asString(config.goQuality),
    goMigrations: asString(config.goMigrations),
    goTemplating: asString(config.goTemplating),
    goProtoTooling: asString(config.goProtoTooling),
    goDI: asString(config.goDI),
    javaLanguage: asString(config.javaLanguage, "java"),
    javaWebFramework: asString(config.javaWebFramework),
    javaBuildTool: asString(config.javaBuildTool),
    javaOrm: asString(config.javaOrm),
    javaAuth: asString(config.javaAuth),
    javaApi: asString(config.javaApi),
    javaLogging: asString(config.javaLogging),
    javaLibraries: asStringArray(config.javaLibraries),
    javaTestingLibraries: asStringArray(config.javaTestingLibraries),
    dotnetWebFramework: asString(config.dotnetWebFramework),
    dotnetOrm: asString(config.dotnetOrm),
    dotnetAuth: asString(config.dotnetAuth),
    dotnetApi: asString(config.dotnetApi),
    dotnetTesting: asStringArray(config.dotnetTesting),
    dotnetJobQueue: asString(config.dotnetJobQueue),
    dotnetRealtime: asString(config.dotnetRealtime),
    dotnetObservability: asStringArray(config.dotnetObservability),
    dotnetValidation: asString(config.dotnetValidation),
    dotnetCaching: asString(config.dotnetCaching),
    dotnetDeploy: asString(config.dotnetDeploy),
    dotnetLibraries: asStringArray(config.dotnetLibraries),
    elixirWebFramework: asString(config.elixirWebFramework),
    elixirOrm: asString(config.elixirOrm),
    elixirAuth: asString(config.elixirAuth),
    elixirApi: asString(config.elixirApi),
    elixirRealtime: asString(config.elixirRealtime),
    elixirJobs: asString(config.elixirJobs),
    elixirValidation: asString(config.elixirValidation),
    elixirHttp: asString(config.elixirHttp),
    elixirJson: asString(config.elixirJson),
    elixirEmail: asString(config.elixirEmail),
    elixirCaching: asString(config.elixirCaching),
    elixirObservability: asString(config.elixirObservability),
    elixirTesting: asString(config.elixirTesting),
    elixirQuality: asString(config.elixirQuality),
    elixirI18n: asString(config.elixirI18n),
    elixirHttpServer: asString(config.elixirHttpServer),
    elixirApplicationFramework: asString(config.elixirApplicationFramework),
    elixirDocumentation: asString(config.elixirDocumentation),
    elixirClustering: asString(config.elixirClustering),
    elixirDeploy: asString(config.elixirDeploy),
    elixirLibraries: asStringArray(config.elixirLibraries),
  };
}

export function compatibilityChangesToProjectConfig(
  adjusted: CompatibilityInput,
): Partial<ProjectConfig> {
  const frontend = [...adjusted.webFrontend, ...adjusted.nativeFrontend];
  const ignoredCompatibilityKeys = new Set([
    "webFrontend",
    "nativeFrontend",
    "codeQuality",
    "documentation",
    "appPlatforms",
    "aiSdk",
    "backendLibraries",
    "projectName",
    "git",
    "install",
    "yolo",
  ]);
  const changes: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(adjusted)) {
    if (!ignoredCompatibilityKeys.has(key)) {
      changes[key] = value;
    }
  }

  changes.frontend = frontend;
  changes.addons = [...adjusted.codeQuality, ...adjusted.documentation, ...adjusted.appPlatforms];
  changes.ai = adjusted.aiSdk;
  changes.effect = adjusted.backendLibraries;
  changes.backend = getProjectBackendFromCompatibility(adjusted.backend);

  return changes as Partial<ProjectConfig>;
}

export type CompatibilityAdjustmentResult = {
  /** Config keys whose values must change, already mapped back to ProjectConfig shape. */
  changes: Partial<ProjectConfig>;
  /** User-facing `option: <from> → <to> — <reason>` lines. */
  adjustments: string[];
};

const EMPTY_ADJUSTMENT_RESULT: CompatibilityAdjustmentResult = { changes: {}, adjustments: [] };

// Empty arrays are ignored by the CLI flag translator. Preserve an explicit
// "none" value when compatibility removes the final selected item so the
// adjustment survives the second flag-processing pass.
const EXPLICIT_NONE_ARRAY_KEYS = new Set(["frontend", "addons", "examples", "aiDocs"]);

// Compatibility-input keys whose CLI flag/config key has a different name.
const COMPAT_KEY_DISPLAY: Record<string, string> = {
  webFrontend: "frontend",
  nativeFrontend: "frontend",
  aiSdk: "ai",
  backendLibraries: "effect",
};

function formatCompatValue(value: unknown): string {
  if (Array.isArray(value)) {
    const items = value.filter((item) => item !== "none");
    return items.length > 0 ? items.join(", ") : "none";
  }
  return String(value);
}

/**
 * Runs the same auto-adjust engine the web builder and MCP flows use over a
 * (possibly partial) ProjectConfig and maps the result back to config keys.
 *
 * - Only TypeScript/React Native configs are analyzed (mirrors stack-update).
 * - Graph-driven configs (`--part`) are skipped; the stack graph owns those.
 * - With `onlyDefinedKeys`, adjustments are applied only to keys the caller
 *   actually set (used for the flag path, where unset keys are resolved by
 *   prompts/defaults later and must not be pinned by the engine's defaults).
 */
export function resolveCompatibilityAdjustments(
  config: Partial<ProjectConfig>,
  options: { onlyDefinedKeys?: boolean } = {},
): CompatibilityAdjustmentResult {
  // The CLI defaults to the TypeScript ecosystem when --ecosystem is omitted,
  // so an undefined ecosystem must not skip the pass (it matches the fallback
  // in buildCompatibilityInputFromConfig / getCompatibilityEcosystem).
  const ecosystem = config.ecosystem ?? "typescript";
  if (ecosystem !== "typescript" && ecosystem !== "react-native") {
    return EMPTY_ADJUSTMENT_RESULT;
  }
  if (config.stackParts?.length) {
    return EMPTY_ADJUSTMENT_RESULT;
  }

  const input = buildCompatibilityInputFromConfig(config);
  const result = analyzeStackCompatibility(input);
  if (!result.adjustedStack) {
    return EMPTY_ADJUSTMENT_RESULT;
  }

  // Diff in config-key space against the engine INPUT (not the raw config) so
  // defaults injected by the input mapper (e.g. javaLanguage) never count as
  // adjustments — only values the engine actually changed do.
  const mapped = compatibilityChangesToProjectConfig(result.adjustedStack);
  const mappedInput = compatibilityChangesToProjectConfig(input);
  const changes: Partial<ProjectConfig> = {};
  for (const [key, value] of Object.entries(mapped)) {
    if (value === undefined) continue;
    if (options.onlyDefinedKeys && config[key as keyof ProjectConfig] === undefined) continue;
    const next = Array.isArray(value) ? value.filter((item) => item !== "none") : value;
    const before = mappedInput[key as keyof ProjectConfig];
    const previous = Array.isArray(before) ? before.filter((item) => item !== "none") : before;
    if (JSON.stringify(next) !== JSON.stringify(previous)) {
      (changes as Record<string, unknown>)[key] =
        Array.isArray(next) && next.length === 0 && EXPLICIT_NONE_ARRAY_KEYS.has(key)
          ? ["none"]
          : next;
    }
  }
  if (Object.keys(changes).length === 0) {
    return EMPTY_ADJUSTMENT_RESULT;
  }

  const adjustedStack = result.adjustedStack as unknown as Record<string, unknown>;
  const inputRecord = input as unknown as Record<string, unknown>;
  const adjustments = result.changes.map((change) => {
    const label = COMPAT_KEY_DISPLAY[change.category] ?? change.category;
    const from = inputRecord[change.category];
    const to = adjustedStack[change.category];
    const fromLabel = formatCompatValue(from);
    const toLabel = formatCompatValue(to);
    return from !== undefined && fromLabel !== toLabel
      ? `${label}: ${fromLabel} → ${toLabel} — ${change.message}`
      : `${label}: ${change.message}`;
  });

  return { changes, adjustments };
}
