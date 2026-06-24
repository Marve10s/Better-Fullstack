import {
  EMBEDDED_TEMPLATES,
  generateVirtualProject,
  type VirtualFile,
  type VirtualFileTree,
  type VirtualNode,
} from "@better-fullstack/template-generator";
import { writeSelectedFiles } from "@better-fullstack/template-generator/fs-writer";
import fs from "fs-extra";
import { tmpdir } from "node:os";
import path from "node:path";

import { getDefaultConfig } from "../../constants";
import { CreateCommandOptionsSchema } from "../../create-command-input";
import { buildBtsConfigForPersistence, readBtsConfig, writeBtsConfig } from "../../utils/bts-config";
import { validateConfigForProgrammaticUse } from "../../utils/config-validation";
import { getEffectiveStack, getGraphSummary } from "../../utils/graph-summary";
import {
  analyzeStackCompatibility,
  getAddonStackPartBinding,
  formatStackPartSpec,
  legacyProjectConfigToStackParts,
  parseStackPartSpecs,
  requiresChatSdkVercelAI,
  stackPartsToLegacyProjectConfigPartial,
  type BetterTStackConfig,
  type CompatibilityInput,
  type ProjectConfig,
} from "../../types";

type JsonObject = Record<string, unknown>;

type StackUpdateOperation =
  | {
      kind: "add" | "replace";
      path: string;
      writeMode: "generated";
    }
  | {
      kind: "merge";
      path: string;
      writeMode: "content";
      content: string;
      summary: string[];
    };

export type StackUpdatePlan = {
  success: true;
  projectDir: string;
  requestedChanges: Record<string, unknown>;
  proposedConfig: BetterTStackConfig;
  filesToAdd: string[];
  filesToPatch: string[];
  filesUnchanged: string[];
  dependencyChanges: Record<string, Record<string, string>>;
  scriptChanges: Record<string, string[]>;
  envChanges: Record<string, string[]>;
  manualReviewBlockers: string[];
  operations: StackUpdateOperation[];
  installCommand: string;
  compatibilityAdjustments: string[];
  graphSummary?: string;
  effectiveStack?: Record<string, string>;
  stackPartSpecs: string[];
};

export type StackUpdateResult =
  | StackUpdatePlan
  | {
      success: false;
      projectDir?: string;
      error: string;
    };

const ARRAY_UPDATE_KEYS = new Set<keyof ProjectConfig>([
  "frontend",
  "addons",
  "examples",
  "aiDocs",
  "rustLibraries",
  "pythonAi",
  "pythonTesting",
  "pythonCli",
  "goTesting",
  "javaLibraries",
  "javaTestingLibraries",
  "dotnetTesting",
  "dotnetObservability",
  "elixirLibraries",
]);

const NON_STACK_UPDATE_CREATE_KEYS = new Set([
  "template",
  "fromHistory",
  "config",
  "yes",
  "yolo",
  "verbose",
  "dryRun",
  "verify",
  "git",
  "install",
  "directoryConflict",
  "renderTitle",
  "disableAnalytics",
  "manualDb",
]);

export const SUPPORTED_STACK_UPDATE_KEYS = Object.keys(CreateCommandOptionsSchema.shape)
  .filter((key) => !NON_STACK_UPDATE_CREATE_KEYS.has(key))
  .sort();

const SUPPORTED_STACK_UPDATE_KEY_SET = new Set(SUPPORTED_STACK_UPDATE_KEYS);
const IGNORED_REQUEST_KEYS = new Set(["projectDir", "projectName", "install", "git"]);
const PACKAGE_JSON_SECTIONS = ["dependencies", "devDependencies", "peerDependencies", "scripts"];
const BINARY_FILE_MARKER = "[Binary file]";

function isEnvFilePath(filePath: string): boolean {
  const name = path.basename(filePath);
  return name === ".env" || name.endsWith(".env.example");
}

function isSkippableGeneratedDoc(filePath: string): boolean {
  return path.basename(filePath).toLowerCase() === "readme.md";
}

function isGeneratedBinaryFile(file: VirtualFile | undefined): file is VirtualFile & {
  sourcePath: string;
} {
  return file?.content === BINARY_FILE_MARKER && typeof file.sourcePath === "string";
}

async function readGeneratedFileBytes(
  tree: VirtualFileTree,
  filePath: string,
  file: VirtualFile | undefined,
): Promise<Buffer | undefined> {
  if (!isGeneratedBinaryFile(file)) return undefined;
  const tempDir = await fs.mkdtemp(path.join(tmpdir(), "bfs-stack-update-binary-"));
  try {
    const writtenFiles = await writeSelectedFiles(tree, tempDir, (candidatePath) => candidatePath === filePath);
    if (!writtenFiles.includes(filePath)) return undefined;
    return await fs.readFile(path.join(tempDir, filePath));
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true });
  }
}

function buffersEqual(left: Buffer | undefined, right: Buffer | undefined): boolean {
  return Boolean(left && right && left.equals(right));
}

async function inferProjectName(projectDir: string): Promise<string> {
  const packageJsonPath = path.join(projectDir, "package.json");
  const packageJson = await fs.readJson(packageJsonPath).catch(() => null);
  if (packageJson && typeof packageJson.name === "string" && packageJson.name.trim()) {
    return packageJson.name.trim();
  }

  return path.basename(projectDir);
}

function configFromBtsConfig(
  config: BetterTStackConfig,
  projectDir: string,
  projectName: string,
): ProjectConfig {
  return {
    ...getDefaultConfig(),
    ...config,
    projectName,
    projectDir,
    relativePath: ".",
    git: false,
    install: false,
  } as ProjectConfig;
}

function buildRequestedChanges(input: Record<string, unknown>): {
  changes: Partial<ProjectConfig>;
  stackPartSpecs: string[];
  unsupportedKeys: string[];
} {
  const changes: Record<string, unknown> = {};
  const stackPartSpecs: string[] = [];
  const unsupportedKeys: string[] = [];

  for (const [key, value] of Object.entries(input)) {
    if (value === undefined || IGNORED_REQUEST_KEYS.has(key)) continue;
    if (!SUPPORTED_STACK_UPDATE_KEY_SET.has(key)) {
      unsupportedKeys.push(key);
      continue;
    }
    if (key === "part") {
      if (Array.isArray(value)) {
        stackPartSpecs.push(...value.filter((item): item is string => typeof item === "string"));
      }
      continue;
    }
    changes[key] = value;
  }

  return { changes: changes as Partial<ProjectConfig>, stackPartSpecs, unsupportedKeys };
}

function mergeProjectConfig(
  currentConfig: ProjectConfig,
  requestedChanges: Partial<ProjectConfig>,
): ProjectConfig {
  const next: ProjectConfig = { ...currentConfig };
  for (const [key, value] of Object.entries(requestedChanges) as [
    keyof ProjectConfig,
    ProjectConfig[keyof ProjectConfig],
  ][]) {
    if (value === undefined) continue;
    if (ARRAY_UPDATE_KEYS.has(key) && Array.isArray(value)) {
      const arrayValue = value as unknown[];
      const requested = arrayValue.filter(
        (item): item is string => typeof item === "string" && item !== "none",
      );
      if (requested.length === 0 && arrayValue.includes("none")) {
        (next as Record<string, unknown>)[key] = [];
      } else {
        const existing = Array.isArray(next[key])
          ? (next[key] as string[]).filter((item) => item !== "none")
          : [];
        (next as Record<string, unknown>)[key] = [...new Set([...existing, ...requested])];
      }
      continue;
    }
    (next as Record<string, unknown>)[key] = value;
  }
  return next;
}

function mergeStackPartSpecs(currentConfig: ProjectConfig, specs: string[]): Partial<ProjectConfig> {
  if (specs.length === 0) return {};
  const currentStackParts = currentConfig.stackParts?.length
    ? currentConfig.stackParts
    : legacyProjectConfigToStackParts(currentConfig);
  const currentSpecs = currentStackParts
    .filter((part) => part.source !== "provided")
    .map((part) => formatStackPartSpec(part, currentStackParts));
  const stackParts = parseStackPartSpecs([...new Set([...currentSpecs, ...specs])], "selected");
  return {
    ...stackPartsToLegacyProjectConfigPartial(stackParts),
    stackParts,
  };
}

function asString(value: unknown, fallback = "none"): string {
  return typeof value === "string" ? value : fallback;
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function getCompatibilityBackend(config: ProjectConfig, webFrontend: string[]): string {
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

function getDefaultDatabaseForDbSetup(dbSetup: ProjectConfig["dbSetup"]): ProjectConfig["database"] | undefined {
  switch (dbSetup) {
    case "turso":
    case "d1":
      return "sqlite";
    case "neon":
    case "prisma-postgres":
    case "planetscale":
    case "supabase":
    case "docker":
      return "postgres";
    case "mongodb-atlas":
      return "mongodb";
    case "upstash":
      return "redis";
    default:
      return undefined;
  }
}

function getDefaultOrmForDatabase(database: ProjectConfig["database"]): ProjectConfig["orm"] | undefined {
  switch (database) {
    case "sqlite":
    case "postgres":
    case "mysql":
      return "drizzle";
    case "mongodb":
      return "prisma";
    default:
      return undefined;
  }
}

function getRequiredCssFrameworkForUiLibrary(
  uiLibrary: ProjectConfig["uiLibrary"],
): ProjectConfig["cssFramework"] | undefined {
  switch (uiLibrary) {
    case "shadcn-ui":
    case "shadcn-svelte":
    case "daisyui":
    case "nextui":
    case "park-ui":
      return "tailwind";
    default:
      return undefined;
  }
}

function isBetterAuth(auth: ProjectConfig["auth"] | undefined): boolean {
  return auth === "better-auth" || auth === "better-auth-organizations";
}

function withNativeFrontendVariant(
  frontend: ProjectConfig["frontend"],
  nativeFrontend: string,
): ProjectConfig["frontend"] {
  const current = Array.isArray(frontend) ? frontend : [];
  const withoutNative = current.filter((item) => !item.startsWith("native-") && item !== "none");
  return [...withoutNative, nativeFrontend] as ProjectConfig["frontend"];
}

function withWebFrontendVariant(
  frontend: ProjectConfig["frontend"],
  webFrontend: string,
): ProjectConfig["frontend"] {
  const current = Array.isArray(frontend) ? frontend : [];
  const native = current.filter((item) => item.startsWith("native-"));
  return [webFrontend, ...native] as ProjectConfig["frontend"];
}

function hasRequestedNonNoneValue<T extends keyof ProjectConfig>(
  requestedChanges: Partial<ProjectConfig>,
  key: T,
): boolean {
  const value = requestedChanges[key];
  if (Array.isArray(value)) return value.some((item) => item !== "none");
  return value !== undefined && value !== "none";
}

function needsStandaloneBackendForRequestedUpdate(
  requestedChanges: Partial<ProjectConfig>,
): boolean {
  return (
    hasRequestedNonNoneValue(requestedChanges, "database") ||
    hasRequestedNonNoneValue(requestedChanges, "orm") ||
    hasRequestedNonNoneValue(requestedChanges, "dbSetup") ||
    hasRequestedNonNoneValue(requestedChanges, "api") ||
    isBetterAuth(requestedChanges.auth) ||
    hasRequestedNonNoneValue(requestedChanges, "payments") ||
    hasRequestedNonNoneValue(requestedChanges, "email") ||
    hasRequestedNonNoneValue(requestedChanges, "logging") ||
    hasRequestedNonNoneValue(requestedChanges, "observability") ||
    hasRequestedNonNoneValue(requestedChanges, "caching") ||
    hasRequestedNonNoneValue(requestedChanges, "rateLimit") ||
    hasRequestedNonNoneValue(requestedChanges, "jobQueue") ||
    hasRequestedNonNoneValue(requestedChanges, "realtime") ||
    hasRequestedNonNoneValue(requestedChanges, "search") ||
    hasRequestedNonNoneValue(requestedChanges, "vectorDb") ||
    hasRequestedNonNoneValue(requestedChanges, "fileStorage") ||
    hasRequestedNonNoneValue(requestedChanges, "serverDeploy")
  );
}

function getDefaultWebFrontendForRequestedUpdate(
  requestedChanges: Partial<ProjectConfig>,
): ProjectConfig["frontend"][number] | undefined {
  if (hasRequestedNonNoneValue(requestedChanges, "payments")) return "next";
  if (requestedChanges.i18n === "next-intl") return "next";
  if (requestedChanges.cms === "payload" || requestedChanges.cms === "keystatic") return "next";
  if (requestedChanges.uiLibrary === "shadcn-svelte") return "svelte";
  const requestedAddons = asStringArray(requestedChanges.addons);
  if (requestedAddons.some((addon) => addon === "pwa" || addon === "tauri")) return "react-vite";

  const needsWebFrontend =
    hasRequestedNonNoneValue(requestedChanges, "cssFramework") ||
    hasRequestedNonNoneValue(requestedChanges, "uiLibrary") ||
    hasRequestedNonNoneValue(requestedChanges, "forms") ||
    hasRequestedNonNoneValue(requestedChanges, "stateManagement") ||
    hasRequestedNonNoneValue(requestedChanges, "animation") ||
    hasRequestedNonNoneValue(requestedChanges, "fileUpload") ||
    hasRequestedNonNoneValue(requestedChanges, "i18n") ||
    hasRequestedNonNoneValue(requestedChanges, "cms") ||
    hasRequestedNonNoneValue(requestedChanges, "analytics") ||
    hasRequestedNonNoneValue(requestedChanges, "webDeploy") ||
    requestedChanges.ai === "tanstack-ai";

  return needsWebFrontend ? "react-vite" : undefined;
}

function getDefaultNativeFrontendForRequestedUpdate(
  requestedChanges: Partial<ProjectConfig>,
): ProjectConfig["frontend"][number] | undefined {
  if (requestedChanges.mobileUI === "uniwind" || requestedChanges.mobileUI === "unistyles") {
    return undefined;
  }

  const needsNativeFrontend =
    hasRequestedNonNoneValue(requestedChanges, "mobileNavigation") ||
    hasRequestedNonNoneValue(requestedChanges, "mobileUI") ||
    hasRequestedNonNoneValue(requestedChanges, "mobileStorage") ||
    hasRequestedNonNoneValue(requestedChanges, "mobileTesting") ||
    hasRequestedNonNoneValue(requestedChanges, "mobilePush") ||
    hasRequestedNonNoneValue(requestedChanges, "mobileOTA") ||
    hasRequestedNonNoneValue(requestedChanges, "mobileDeepLinking");

  return needsNativeFrontend ? "native-bare" : undefined;
}

function buildCompatibilityInputFromConfig(config: ProjectConfig): CompatibilityInput {
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
    ecosystem: config.ecosystem,
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
    backendLibraries: "none",
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
    codeQuality,
    documentation,
    appPlatforms,
    packageManager: asString(config.packageManager, "bun"),
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
    elixirDeploy: asString(config.elixirDeploy),
    elixirLibraries: asStringArray(config.elixirLibraries),
  };
}

function compatibilityChangesToProjectConfig(
  adjusted: CompatibilityInput,
  baseConfig: ProjectConfig,
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

  changes.frontend = frontend.length > 0 ? frontend : baseConfig.frontend;
  changes.addons = [...adjusted.codeQuality, ...adjusted.documentation, ...adjusted.appPlatforms];
  changes.ai = adjusted.aiSdk;
  changes.backend = getProjectBackendFromCompatibility(adjusted.backend);

  return changes as Partial<ProjectConfig>;
}

function applyKnownDependencyExpansions(
  config: ProjectConfig,
  requestedChanges: Partial<ProjectConfig>,
): { config: ProjectConfig; adjustments: string[] } {
  const next = { ...config };
  const adjustments: string[] = [];
  const requestedKeys = new Set(Object.keys(requestedChanges));
  const currentFrontend = asStringArray(next.frontend);
  const hasWebFrontend = currentFrontend.some(
    (item) => !item.startsWith("native-") && item !== "none",
  );

  if (next.ecosystem === "typescript" && !hasWebFrontend && !requestedKeys.has("frontend")) {
    const defaultWebFrontend = getDefaultWebFrontendForRequestedUpdate(requestedChanges);
    if (defaultWebFrontend) {
      next.frontend = withWebFrontendVariant(next.frontend, defaultWebFrontend);
      adjustments.push(
        `frontend: Web frontend set to '${defaultWebFrontend}' (requested feature requires a web app)`,
      );
    }
  }

  if (next.ecosystem === "typescript" && !requestedKeys.has("frontend")) {
    const frontend = asStringArray(next.frontend);
    const hasNativeFrontend = frontend.some((item) => item.startsWith("native-"));
    const defaultNativeFrontend = getDefaultNativeFrontendForRequestedUpdate(requestedChanges);
    if (defaultNativeFrontend && !hasNativeFrontend) {
      next.frontend = withNativeFrontendVariant(next.frontend, defaultNativeFrontend);
      adjustments.push(
        `mobile: Native frontend set to '${defaultNativeFrontend}' (requested feature requires a native app)`,
      );
    }
  }

  if (
    next.ecosystem === "typescript" &&
    next.backend === "none" &&
    needsStandaloneBackendForRequestedUpdate(requestedChanges)
  ) {
    if (!requestedKeys.has("backend")) {
      next.backend = "hono";
      adjustments.push("backend: Backend set to 'hono' (requested feature requires a server)");
    }
    if (next.backend !== "none" && next.runtime === "none" && !requestedKeys.has("runtime")) {
      next.runtime = "bun";
      adjustments.push("backend: Runtime set to 'bun' (Hono server default)");
    }
  }

  if (
    hasRequestedNonNoneValue(requestedChanges, "orm") &&
    next.database === "none" &&
    !requestedKeys.has("database")
  ) {
    next.database = "sqlite";
    adjustments.push("orm: Database set to 'sqlite' (ORM requires a database)");
  }

  if (isBetterAuth(requestedChanges.auth) || requestedChanges.payments === "polar") {
    if (requestedChanges.payments === "polar" && !isBetterAuth(next.auth) && !requestedKeys.has("auth")) {
      next.auth = "better-auth";
      adjustments.push("payments: Auth set to 'better-auth' (Polar requires Better Auth)");
    }
    if (next.database === "none" && !requestedKeys.has("database")) {
      next.database = "sqlite";
      const reason =
        requestedChanges.payments === "polar"
          ? "payments: Database set to 'sqlite' (Better Auth requires a SQL database)"
          : "auth: Database set to 'sqlite' (Better Auth requires a SQL database)";
      adjustments.push(reason);
    }
    if (next.orm === "none" && !requestedKeys.has("orm")) {
      next.orm = "drizzle";
      const reason =
        requestedChanges.payments === "polar"
          ? "payments: ORM set to 'drizzle' (Better Auth requires an adapter)"
          : "auth: ORM set to 'drizzle' (Better Auth requires an adapter)";
      adjustments.push(reason);
    }
  }

  if (requestedChanges.uiLibrary && requestedChanges.uiLibrary !== "none") {
    const requiredCssFramework = getRequiredCssFrameworkForUiLibrary(requestedChanges.uiLibrary);
    if (
      requiredCssFramework &&
      next.cssFramework !== requiredCssFramework &&
      !requestedKeys.has("cssFramework")
    ) {
      next.cssFramework = requiredCssFramework;
      adjustments.push(
        `uiLibrary: CSS framework set to '${requiredCssFramework}' (${requestedChanges.uiLibrary} requires Tailwind CSS)`,
      );
    }
  }

  if (requestedChanges.mobileUI === "uniwind" && !requestedKeys.has("frontend")) {
    const frontend = asStringArray(next.frontend);
    if (!frontend.includes("native-uniwind")) {
      next.frontend = withNativeFrontendVariant(next.frontend, "native-uniwind");
      adjustments.push(
        "mobileUI: Native frontend set to 'native-uniwind' (Uniwind mobile UI requires Expo + Uniwind)",
      );
    }
  }

  if (requestedChanges.mobileUI === "unistyles" && !requestedKeys.has("frontend")) {
    const frontend = asStringArray(next.frontend);
    if (!frontend.includes("native-unistyles")) {
      next.frontend = withNativeFrontendVariant(next.frontend, "native-unistyles");
      adjustments.push(
        "mobileUI: Native frontend set to 'native-unistyles' (Unistyles mobile UI requires Expo + Unistyles)",
      );
    }
  }

  if (requestedChanges.dbSetup && requestedChanges.dbSetup !== "none") {
    const defaultDatabase = getDefaultDatabaseForDbSetup(requestedChanges.dbSetup);
    if (defaultDatabase && next.database !== defaultDatabase && !requestedKeys.has("database")) {
      next.database = defaultDatabase;
      adjustments.push(
        `dbSetup: Database set to '${defaultDatabase}' (${requestedChanges.dbSetup} requires ${defaultDatabase})`,
      );
    }

    const defaultOrm = getDefaultOrmForDatabase(next.database);
    if (defaultOrm && next.orm === "none" && !requestedKeys.has("orm")) {
      next.orm = defaultOrm;
      adjustments.push(
        `dbSetup: ORM set to '${defaultOrm}' (${requestedChanges.dbSetup} requires a database adapter)`,
      );
    }
  }

  if (requestedChanges.dbSetup === "d1") {
    if (next.runtime !== "workers" && !requestedKeys.has("runtime")) {
      next.runtime = "workers";
      adjustments.push("dbSetup: Runtime set to 'workers' (D1 requires Workers)");
    }
    if (next.backend !== "hono" && !requestedKeys.has("backend")) {
      next.backend = "hono";
      adjustments.push("dbSetup: Backend set to 'hono' (Workers requires Hono)");
    }
  }

  if (requestedChanges.serverDeploy === "cloudflare") {
    if (next.backend === "hono" && next.runtime !== "workers" && !requestedKeys.has("runtime")) {
      next.runtime = "workers";
      adjustments.push("serverDeploy: Runtime set to 'workers' (Cloudflare requires Workers)");
    }
  }

  if (requestedChanges.serverDeploy === "netlify") {
    if (next.backend === "hono" && next.runtime !== "node" && !requestedKeys.has("runtime")) {
      next.runtime = "node";
      adjustments.push("serverDeploy: Runtime set to 'node' (Netlify Functions requires Node)");
    }
  }

  if (asStringArray(next.examples).includes("chat-sdk")) {
    const webFrontend = asStringArray(next.frontend).filter(
      (item) => !item.startsWith("native-") && item !== "none",
    );
    const compatibilityBackend = getCompatibilityBackend(next, webFrontend);
    if (compatibilityBackend === "hono" && next.runtime !== "node" && !requestedKeys.has("runtime")) {
      next.runtime = "node";
      adjustments.push("examples: Runtime set to 'node' (Chat SDK Hono profile requires Node)");
    }
    if (
      requiresChatSdkVercelAI(buildCompatibilityInputFromConfig(next)) &&
      next.ai !== "vercel-ai" &&
      !requestedKeys.has("ai")
    ) {
      next.ai = "vercel-ai";
      adjustments.push("examples: AI SDK set to 'vercel-ai' (Chat SDK profile requires Vercel AI)");
    }
  }

  return { config: next, adjustments };
}

async function generateTree(config: ProjectConfig): Promise<VirtualFileTree> {
  const result = await generateVirtualProject({ config, templates: EMBEDDED_TEMPLATES });
  if (!result.success || !result.tree) {
    throw new Error(result.error ?? "Failed to generate virtual project");
  }
  return result.tree;
}

function treeToFileMap(tree: VirtualFileTree): Map<string, VirtualFile> {
  const files = new Map<string, VirtualFile>();

  function walk(nodes: VirtualNode[]) {
    for (const node of nodes) {
      if (node.type === "file") {
        files.set(node.path, node);
      } else {
        walk(node.children);
      }
    }
  }

  walk(tree.root.children);
  return files;
}

function parseJson(content: string | undefined): JsonObject | null {
  if (!content) return null;
  try {
    const parsed = JSON.parse(content);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? (parsed as JsonObject)
      : null;
  } catch {
    return null;
  }
}

function stringifyJson(data: JsonObject): string {
  return `${JSON.stringify(data, null, 2)}\n`;
}

function isPlainObject(value: unknown): value is JsonObject {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function diffJsonSection(
  current: JsonObject,
  previous: JsonObject,
  proposed: JsonObject,
  section: string,
): { values: Record<string, string>; blockers: string[] } {
  const previousSection = isPlainObject(previous[section]) ? previous[section] : {};
  const proposedSection = isPlainObject(proposed[section]) ? proposed[section] : {};
  const currentSection = isPlainObject(current[section]) ? current[section] : {};
  const values: Record<string, string> = {};
  const blockers: string[] = [];

  for (const [name, proposedValue] of Object.entries(proposedSection)) {
    if (previousSection[name] === proposedValue) continue;
    const currentValue = currentSection[name];
    if (currentValue !== undefined && currentValue !== previousSection[name]) {
      blockers.push(`${section}.${name}`);
      continue;
    }
    values[name] = String(proposedValue);
  }

  return { values, blockers };
}

function mergePackageJson(
  existingContent: string,
  previousContent: string | undefined,
  proposedContent: string,
): { content?: string; summary: string[]; blockers: string[]; dependencyChanges: Record<string, Record<string, string>>; scriptChanges: string[] } {
  const existing = parseJson(existingContent);
  const previous = parseJson(previousContent);
  const proposed = parseJson(proposedContent);
  if (!existing || !previous || !proposed) {
    return {
      summary: [],
      blockers: ["package.json is not valid JSON or has no generated baseline"],
      dependencyChanges: {},
      scriptChanges: [],
    };
  }

  const next = structuredClone(existing) as JsonObject;
  const summary: string[] = [];
  const blockers: string[] = [];
  const dependencyChanges: Record<string, Record<string, string>> = {};
  const scriptChanges: string[] = [];

  for (const section of PACKAGE_JSON_SECTIONS) {
    const diff = diffJsonSection(existing, previous, proposed, section);
    blockers.push(...diff.blockers);
    if (Object.keys(diff.values).length === 0) continue;

    const target = isPlainObject(next[section]) ? { ...next[section] } : {};
    for (const [name, value] of Object.entries(diff.values)) {
      target[name] = value;
    }
    next[section] = Object.fromEntries(Object.entries(target).sort(([a], [b]) => a.localeCompare(b)));
    summary.push(`${section}: ${Object.keys(diff.values).join(", ")}`);
    if (section === "scripts") {
      scriptChanges.push(...Object.keys(diff.values));
    } else {
      dependencyChanges[section] = diff.values;
    }
  }

  return {
    content: blockers.length === 0 && summary.length > 0 ? stringifyJson(next) : undefined,
    summary,
    blockers,
    dependencyChanges,
    scriptChanges,
  };
}

function parseEnvKeys(content: string): Set<string> {
  const keys = new Set<string>();
  for (const rawLine of content.split("\n")) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    if (key) keys.add(key);
  }
  return keys;
}

function mergeEnvExample(
  existingContent: string,
  previousContent: string | undefined,
  proposedContent: string,
): { content?: string; keys: string[] } {
  const existingKeys = parseEnvKeys(existingContent);
  const previousKeys = previousContent ? parseEnvKeys(previousContent) : new Set<string>();
  const nextLines: string[] = [];
  const keys: string[] = [];

  for (const line of proposedContent.split("\n")) {
    const trimmed = line.trim();
    const eq = trimmed.indexOf("=");
    if (!trimmed || trimmed.startsWith("#") || eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    if (!key || previousKeys.has(key) || existingKeys.has(key)) continue;
    nextLines.push(line);
    keys.push(key);
  }

  if (nextLines.length === 0) return { keys };
  const separator = existingContent.endsWith("\n") ? "" : "\n";
  return { content: `${existingContent}${separator}${nextLines.join("\n")}\n`, keys };
}

function collectEnvReferences(content: string | undefined): Set<string> {
  const keys = new Set<string>();
  if (!content) return keys;

  const patterns = [
    /\bprocess\.env\.([A-Z][A-Z0-9_]*)/g,
    /\bDeno\.env\.get\(\s*["']([A-Z][A-Z0-9_]*)["']/g,
    /\bSystem\.getenv\(\s*["']([A-Z][A-Z0-9_]*)["']/g,
    /\bstd::env::var\(\s*["']([A-Z][A-Z0-9_]*)["']/g,
    /\bos\.Getenv\(\s*["']([A-Z][A-Z0-9_]*)["']/g,
    /\bos\.environ\[\s*["']([A-Z][A-Z0-9_]*)["']\s*\]/g,
    /\bos\.getenv\(\s*["']([A-Z][A-Z0-9_]*)["']/g,
    /^([A-Z][A-Z0-9_]*)=/gm,
  ];

  for (const pattern of patterns) {
    for (const match of content.matchAll(pattern)) {
      if (match[1]) keys.add(match[1]);
    }
  }

  return keys;
}

function recordEnvReferenceChanges(
  envChanges: Record<string, string[]>,
  filePath: string,
  previousContent: string | undefined,
  proposedContent: string,
) {
  const previous = collectEnvReferences(previousContent);
  const proposed = collectEnvReferences(proposedContent);
  const added = [...proposed].filter((key) => !previous.has(key)).sort();
  if (added.length > 0) {
    envChanges[filePath] = [...new Set([...(envChanges[filePath] ?? []), ...added])].sort();
  }
}

function getInstallCommand(config: ProjectConfig): string {
  switch (config.ecosystem) {
    case "rust":
      return "cargo build";
    case "python":
      return "uv sync";
    case "go":
      return "go mod tidy";
    case "java":
      return config.javaBuildTool === "gradle" ? "./gradlew test" : "./mvnw test";
    case "elixir":
      return "mix deps.get && mix compile";
    default:
      return config.packageManager === "npm" ? "npm install" : `${config.packageManager} install`;
  }
}

function getGraphPreview(config: BetterTStackConfig) {
  const stackParts = config.stackParts?.length
    ? config.stackParts
    : legacyProjectConfigToStackParts(config);
  const graphSummary = stackParts.length > 0 ? getGraphSummary({ stackParts }) : undefined;
  const effectiveStack = stackParts.length > 0 ? getEffectiveStack({ stackParts }) : undefined;
  const stackPartSpecs = stackParts
    .filter((part) => part.source !== "provided")
    .map((part) => formatStackPartSpec(part, stackParts));

  return {
    ...(graphSummary ? { graphSummary, effectiveStack } : {}),
    stackPartSpecs,
  };
}

export async function planStackUpdate(
  projectDirInput: string,
  input: Record<string, unknown>,
): Promise<StackUpdateResult> {
  const projectDir = path.resolve(projectDirInput);
  const currentBtsConfig = await readBtsConfig(projectDir);
  if (!currentBtsConfig) {
    return {
      success: false,
      projectDir,
      error: `No bts.jsonc found in ${projectDir}. Is this a Better-Fullstack project?`,
    };
  }

  const projectName = await inferProjectName(projectDir);
  const currentConfig = configFromBtsConfig(currentBtsConfig, projectDir, projectName);
  const { changes: requestedChanges, stackPartSpecs, unsupportedKeys } = buildRequestedChanges(input);
  if (unsupportedKeys.length > 0) {
    return {
      success: false,
      projectDir,
      error: `Unsupported stack update field(s): ${unsupportedKeys.sort().join(", ")}`,
    };
  }

  let proposedConfig = mergeProjectConfig(currentConfig, requestedChanges);
  const dependencyExpansion = applyKnownDependencyExpansions(proposedConfig, requestedChanges);
  proposedConfig = dependencyExpansion.config;
  const shouldApplyCompatibilityAdjustments =
    proposedConfig.ecosystem === "typescript" || proposedConfig.ecosystem === "react-native";
  const compatibilityResult = shouldApplyCompatibilityAdjustments
    ? analyzeStackCompatibility(buildCompatibilityInputFromConfig(proposedConfig))
    : { adjustedStack: null, changes: [] };
  const compatibilityAdjustments = [
    ...dependencyExpansion.adjustments,
    ...compatibilityResult.changes.map((change) => `${change.category}: ${change.message}`),
  ];
  if (compatibilityResult.adjustedStack) {
    proposedConfig = mergeProjectConfig(
      proposedConfig,
      compatibilityChangesToProjectConfig(compatibilityResult.adjustedStack, proposedConfig),
    );
  }
  proposedConfig.stackParts = legacyProjectConfigToStackParts(proposedConfig);
  Object.assign(proposedConfig, mergeStackPartSpecs(proposedConfig, stackPartSpecs));
  try {
    validateConfigForProgrammaticUse(proposedConfig);
  } catch (error) {
    return {
      success: false,
      projectDir,
      error: `Invalid stack update: ${error instanceof Error ? error.message : String(error)}`,
    };
  }

  const persistedProposedConfig = buildBtsConfigForPersistence(proposedConfig, {
    version: currentBtsConfig.version,
    createdAt: currentBtsConfig.createdAt,
  });
  const normalizedProposedConfig = configFromBtsConfig(
    persistedProposedConfig,
    projectDir,
    projectName,
  );

  let currentTree: VirtualFileTree;
  let proposedTree: VirtualFileTree;
  try {
    [currentTree, proposedTree] = await Promise.all([
      generateTree(currentConfig),
      generateTree(normalizedProposedConfig),
    ]);
  } catch (error) {
    return {
      success: false,
      projectDir,
      error: `Failed to generate stack update plan: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
  const currentGeneratedFiles = treeToFileMap(currentTree);
  const proposedGeneratedFiles = treeToFileMap(proposedTree);

  const operations: StackUpdateOperation[] = [];
  const filesToAdd: string[] = [];
  const filesToPatch: string[] = [];
  const filesUnchanged: string[] = [];
  const manualReviewBlockers: string[] = [];
  const dependencyChanges: Record<string, Record<string, string>> = {};
  const scriptChanges: Record<string, string[]> = {};
  const envChanges: Record<string, string[]> = {};

  const proposedFileEntries = await Promise.all(
    [...proposedGeneratedFiles].map(async ([filePath, proposedFile]) => {
      const existingPath = path.join(projectDir, filePath);
      const exists = await fs.pathExists(existingPath);
      const existingBuffer = exists ? await fs.readFile(existingPath).catch(() => undefined) : undefined;
      return { filePath, proposedFile, exists, existingBuffer };
    }),
  );

  for (const { filePath, proposedFile, exists, existingBuffer } of proposedFileEntries) {
    const previousFile = currentGeneratedFiles.get(filePath);
    const proposedContent = proposedFile.content;
    const previousContent = previousFile?.content;
    const isBinaryFile =
      isGeneratedBinaryFile(proposedFile) || isGeneratedBinaryFile(previousFile);
    const existingContent =
      exists && existingBuffer && !isBinaryFile ? existingBuffer.toString("utf-8") : undefined;

    if (!exists) {
      filesToAdd.push(filePath);
      operations.push({ kind: "add", path: filePath, writeMode: "generated" });
      if (isEnvFilePath(filePath)) {
        envChanges[filePath] = [...parseEnvKeys(proposedContent)].sort();
      }
      recordEnvReferenceChanges(envChanges, filePath, undefined, proposedContent);
      continue;
    }

    if (isBinaryFile) {
      const [previousBinaryContent, proposedBinaryContent] = await Promise.all([
        readGeneratedFileBytes(currentTree, filePath, previousFile),
        readGeneratedFileBytes(proposedTree, filePath, proposedFile),
      ]);

      if (buffersEqual(existingBuffer, proposedBinaryContent)) {
        filesUnchanged.push(filePath);
        continue;
      }

      if (buffersEqual(existingBuffer, previousBinaryContent)) {
        filesToPatch.push(filePath);
        operations.push({ kind: "replace", path: filePath, writeMode: "generated" });
        continue;
      }

      manualReviewBlockers.push(`${filePath}: existing binary file differs from the generated baseline`);
      continue;
    }

    if (existingContent === undefined || existingContent === proposedContent) {
      filesUnchanged.push(filePath);
      continue;
    }

    if (filePath.endsWith("package.json")) {
      const merged = mergePackageJson(existingContent, previousContent, proposedContent);
      for (const blocker of merged.blockers) {
        manualReviewBlockers.push(`${filePath}: ${blocker}`);
      }
      if (merged.content) {
        filesToPatch.push(filePath);
        operations.push({
          kind: "merge",
          path: filePath,
          writeMode: "content",
          content: merged.content,
          summary: merged.summary,
        });
        for (const [section, values] of Object.entries(merged.dependencyChanges)) {
          dependencyChanges[`${filePath}:${section}`] = values;
        }
        if (merged.scriptChanges.length > 0) {
          scriptChanges[filePath] = merged.scriptChanges;
        }
      }
      continue;
    }

    if (isEnvFilePath(filePath)) {
      const merged = mergeEnvExample(existingContent, previousContent, proposedContent);
      if (merged.content) {
        filesToPatch.push(filePath);
        operations.push({
          kind: "merge",
          path: filePath,
          writeMode: "content",
          content: merged.content,
          summary: [`env: ${merged.keys.join(", ")}`],
        });
        envChanges[filePath] = merged.keys;
      }
      continue;
    }

    if (previousContent !== undefined && existingContent === previousContent) {
      filesToPatch.push(filePath);
      operations.push({ kind: "replace", path: filePath, writeMode: "generated" });
      recordEnvReferenceChanges(envChanges, filePath, previousContent, proposedContent);
      continue;
    }

    if (isSkippableGeneratedDoc(filePath)) {
      continue;
    }

    manualReviewBlockers.push(`${filePath}: existing file differs from the generated baseline`);
  }

  const graphPreview = getGraphPreview(persistedProposedConfig);
  return {
    success: true,
    projectDir,
    requestedChanges: requestedChanges as Record<string, unknown>,
    proposedConfig: persistedProposedConfig,
    filesToAdd: [...new Set(filesToAdd)].sort(),
    filesToPatch: [...new Set(filesToPatch)].sort(),
    filesUnchanged: [...new Set(filesUnchanged)].sort(),
    dependencyChanges,
    scriptChanges,
    envChanges,
    manualReviewBlockers,
    operations,
    installCommand: getInstallCommand(normalizedProposedConfig),
    compatibilityAdjustments,
    ...graphPreview,
  };
}

export async function applyStackUpdate(
  projectDirInput: string,
  input: Record<string, unknown>,
): Promise<StackUpdateResult> {
  const plan = await planStackUpdate(projectDirInput, input);
  if (!plan.success) return plan;
  if (plan.manualReviewBlockers.length > 0) {
    return {
      success: false,
      projectDir: plan.projectDir,
      error: `Manual review required before applying stack update: ${plan.manualReviewBlockers.join("; ")}`,
    };
  }

  const projectName = await inferProjectName(plan.projectDir);
  const proposedConfig = configFromBtsConfig(plan.proposedConfig, plan.projectDir, projectName);
  const proposedTree = await generateTree(proposedConfig);
  const generatedPaths = new Set(
    plan.operations
      .filter((operation) => operation.writeMode === "generated")
      .map((operation) => operation.path),
  );

  if (generatedPaths.size > 0) {
    await writeSelectedFiles(proposedTree, plan.projectDir, (filePath) =>
      generatedPaths.has(filePath),
    );
  }

  await Promise.all(
    plan.operations
      .filter((operation) => operation.writeMode === "content")
      .map(async (operation) => {
        const targetPath = path.join(plan.projectDir, operation.path);
        await fs.ensureDir(path.dirname(targetPath));
        await fs.writeFile(targetPath, operation.content, "utf-8");
      }),
  );

  await writeBtsConfig(proposedConfig, {
    version: plan.proposedConfig.version,
    createdAt: plan.proposedConfig.createdAt,
  });

  return plan;
}
