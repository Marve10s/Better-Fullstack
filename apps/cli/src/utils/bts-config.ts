import fs from "fs-extra";
import * as JSONC from "jsonc-parser";
import path from "node:path";

import type { BetterTStackConfig, ProjectConfig } from "../types";

import {
  createStackPart,
  getAddonStackPartBinding,
  legacyProjectConfigToStackParts,
  stackPartsToLegacyProjectConfigPartial,
} from "../types";
import { getEffectiveStack, getGraphSummary } from "./graph-summary";
import { getLatestCLIVersion } from "./get-latest-cli-version";

const BTS_CONFIG_FILE = "bts.jsonc";

type StackPart = NonNullable<ProjectConfig["stackParts"]>[number];
type BtsConfigMetadata = Pick<BetterTStackConfig, "version" | "createdAt">;
const MOBILE_CONFIG_FIELDS = [
  "mobileNavigation",
  "mobileUI",
  "mobileStorage",
  "mobileTesting",
  "mobilePush",
  "mobileOTA",
  "mobileDeepLinking",
] as const satisfies readonly (keyof ProjectConfig)[];

function normalizeGraphConfigForPersistence(projectConfig: ProjectConfig, stackParts: ProjectConfig["stackParts"]) {
  if (!stackParts) return projectConfig;

  const legacyConfig = stackPartsToLegacyProjectConfigPartial(stackParts);
  const selectedEcosystems = new Set(
    stackParts.filter((part) => part.source !== "provided").map((part) => part.ecosystem),
  );
  selectedEcosystems.add(projectConfig.ecosystem);

  const hasSelectedEcosystemStackParts = stackParts.some(
    (part) => part.source !== "provided" && part.ecosystem !== "universal",
  );
  const normalized: ProjectConfig = {
    ...projectConfig,
    ...legacyConfig,
    ecosystem: hasSelectedEcosystemStackParts
      ? (legacyConfig.ecosystem ?? projectConfig.ecosystem)
      : projectConfig.ecosystem,
  };

  if (!selectedEcosystems.has("rust")) {
    normalized.rustWebFramework = "none";
    normalized.rustFrontend = "none";
    normalized.rustOrm = "none";
    normalized.rustApi = "none";
    normalized.rustCli = "none";
    normalized.rustLibraries = [];
    normalized.rustLogging = "none";
    normalized.rustErrorHandling = "none";
    normalized.rustCaching = "none";
    normalized.rustAuth = "none";
    normalized.rustRealtime = "none";
    normalized.rustMessageQueue = "none";
    normalized.rustObservability = "none";
    normalized.rustTemplating = "none";
  }

  if (!selectedEcosystems.has("python")) {
    normalized.pythonWebFramework = "none";
    normalized.pythonOrm = "none";
    normalized.pythonValidation = "none";
    normalized.pythonAi = [];
    normalized.pythonAuth = "none";
    normalized.pythonApi = "none";
    normalized.pythonTaskQueue = "none";
    normalized.pythonGraphql = "none";
    normalized.pythonQuality = "none";
    normalized.pythonTesting = [];
    normalized.pythonCaching = "none";
    normalized.pythonRealtime = "none";
    normalized.pythonObservability = "none";
    normalized.pythonCli = [];
  }

  if (!selectedEcosystems.has("go")) {
    normalized.goWebFramework = "none";
    normalized.goOrm = "none";
    normalized.goApi = "none";
    normalized.goCli = "none";
    normalized.goLogging = "none";
    normalized.goAuth = "none";
    normalized.goTesting = [];
    normalized.goRealtime = "none";
    normalized.goMessageQueue = "none";
    normalized.goCaching = "none";
    normalized.goConfig = "none";
    normalized.goObservability = "none";
  }

  if (
    selectedEcosystems.has("go") &&
    projectConfig.auth === "go-better-auth" &&
    legacyConfig.auth === "none"
  ) {
    normalized.auth = projectConfig.auth;
  }

  if (!selectedEcosystems.has("java")) {
    normalized.javaWebFramework = "none";
    normalized.javaBuildTool = "none";
    normalized.javaOrm = "none";
    normalized.javaAuth = "none";
    normalized.javaApi = "none";
    normalized.javaLogging = "none";
    normalized.javaLibraries = [];
    normalized.javaTestingLibraries = [];
  }

  if (!selectedEcosystems.has("dotnet")) {
    normalized.dotnetWebFramework = "none";
    normalized.dotnetOrm = "none";
    normalized.dotnetAuth = "none";
    normalized.dotnetApi = "none";
    normalized.dotnetTesting = [];
    normalized.dotnetJobQueue = "none";
    normalized.dotnetRealtime = "none";
    normalized.dotnetObservability = [];
    normalized.dotnetValidation = "none";
    normalized.dotnetCaching = "none";
    normalized.dotnetDeploy = "none";
  }

  if (!selectedEcosystems.has("elixir")) {
    normalized.elixirWebFramework = "none";
    normalized.elixirOrm = "none";
    normalized.elixirAuth = "none";
    normalized.elixirApi = "none";
    normalized.elixirRealtime = "none";
    normalized.elixirJobs = "none";
    normalized.elixirValidation = "none";
    normalized.elixirHttp = "none";
    normalized.elixirJson = "none";
    normalized.elixirEmail = "none";
    normalized.elixirCaching = "none";
    normalized.elixirObservability = "none";
    normalized.elixirTesting = "none";
    normalized.elixirQuality = "none";
    normalized.elixirDeploy = "none";
    normalized.elixirLibraries = [];
  }

  const projectHasNativeFrontend = projectConfig.frontend.some((frontend) =>
    frontend.startsWith("native-"),
  );
  const normalizedHasNativeFrontend = normalized.frontend.some((frontend) =>
    frontend.startsWith("native-"),
  );
  const hasNativeFrontend = projectHasNativeFrontend || normalizedHasNativeFrontend;

  if (hasNativeFrontend) {
    for (const field of MOBILE_CONFIG_FIELDS) {
      const projectValue = projectConfig[field];
      const legacyValue = legacyConfig[field];
      if (projectValue !== undefined && projectValue !== "none" && legacyValue === "none") {
        (normalized as Record<string, unknown>)[field] = projectValue;
      }
    }
  }

  if (!selectedEcosystems.has("react-native") && !hasNativeFrontend) {
    normalized.mobileNavigation = "none";
    normalized.mobileUI = "none";
    normalized.mobileStorage = "none";
    normalized.mobileTesting = "none";
    normalized.mobilePush = "none";
    normalized.mobileOTA = "none";
    normalized.mobileDeepLinking = "none";
  }

  return normalized;
}

function findSelectedPrimaryPart(
  stackParts: readonly StackPart[],
  role: "frontend" | "backend" | "database" | "mobile",
  ecosystem?: string,
) {
  return stackParts.find(
    (part) =>
      part.source !== "provided" &&
      part.role === role &&
      !part.ownerPartId &&
      (!ecosystem || part.ecosystem === ecosystem),
  );
}

function isAddonGraphPart(part: StackPart) {
  const binding = getAddonStackPartBinding(part.toolId);
  return (
    binding !== undefined &&
    part.role === binding.role &&
    part.ecosystem === binding.ecosystem
  );
}

function hasMatchingStackPart(stackParts: readonly StackPart[], part: StackPart) {
  return stackParts.some(
    (candidate) =>
      candidate.source !== "provided" &&
      candidate.role === part.role &&
      candidate.ecosystem === part.ecosystem &&
      candidate.toolId === part.toolId &&
      candidate.ownerPartId === part.ownerPartId,
  );
}

function syncAddonStackParts(stackParts: readonly StackPart[], addons: readonly string[]) {
  const addonSet = new Set(addons.filter((addon) => addon !== "none"));
  const frontend = findSelectedPrimaryPart(stackParts, "frontend", "typescript");
  const next = stackParts.filter(
    (part) => part.source === "provided" || !isAddonGraphPart(part) || addonSet.has(part.toolId),
  );

  for (const addon of addonSet) {
    const binding = getAddonStackPartBinding(addon);
    if (!binding) continue;
    const ownerPartId = binding.ownerRole === "frontend" ? frontend?.id : undefined;
    if (binding.ownerRole === "frontend" && !ownerPartId) continue;
    const part = createStackPart({
      role: binding.role,
      ecosystem: binding.ecosystem,
      toolId: addon,
      ownerPartId,
      source: "selected",
    });
    if (!hasMatchingStackPart(next, part)) {
      next.push(part);
    }
  }

  return next;
}

function syncOwnedDeployStackPart(
  stackParts: readonly StackPart[],
  ownerRole: "frontend" | "backend",
  deployValue: string | undefined,
) {
  if (deployValue === undefined) return [...stackParts];
  const owner = findSelectedPrimaryPart(stackParts, ownerRole, "typescript");
  const next = stackParts.filter(
    (part) =>
      part.source === "provided" ||
      part.role !== "deploy" ||
      part.ecosystem !== "typescript" ||
      part.ownerPartId !== owner?.id,
  );

  if (!owner || deployValue === "none") return next;

  next.push(
    createStackPart({
      role: "deploy",
      ecosystem: "typescript",
      toolId: deployValue,
      ownerPartId: owner.id,
      source: "selected",
    }),
  );
  return next;
}

function syncUpdatedStackParts(
  stackParts: readonly StackPart[] | undefined,
  updates: Partial<Pick<BetterTStackConfig, "addons" | "webDeploy" | "serverDeploy">>,
) {
  if (!stackParts) return undefined;
  let next = [...stackParts];

  if (updates.addons) {
    next = syncAddonStackParts(next, updates.addons);
  }
  next = syncOwnedDeployStackPart(next, "frontend", updates.webDeploy);
  next = syncOwnedDeployStackPart(next, "backend", updates.serverDeploy);

  return next;
}

export function buildBtsConfigForPersistence(
  projectConfig: ProjectConfig,
  metadata: Partial<BtsConfigMetadata> = {},
): BetterTStackConfig {
  const stackParts = projectConfig.stackParts ?? legacyProjectConfigToStackParts(projectConfig);
  const persistedConfig = normalizeGraphConfigForPersistence(projectConfig, stackParts);
  const graphSummary = stackParts.length > 0 ? getGraphSummary({ stackParts }) : null;
  const effectiveStack = stackParts.length > 0 ? getEffectiveStack({ stackParts }) : undefined;

  return {
    version: metadata.version ?? getLatestCLIVersion(),
    createdAt: metadata.createdAt ?? new Date().toISOString(),
    ...(graphSummary ? { graphSummary, effectiveStack } : {}),
    ecosystem: persistedConfig.ecosystem,
    database: persistedConfig.database,
    orm: persistedConfig.orm,
    backend: persistedConfig.backend,
    runtime: persistedConfig.runtime,
    frontend: persistedConfig.frontend,
    addons: persistedConfig.addons,
    examples: persistedConfig.examples,
    auth: persistedConfig.auth,
    payments: persistedConfig.payments,
    email: persistedConfig.email,
    fileUpload: persistedConfig.fileUpload,
    effect: persistedConfig.effect,
    ai: persistedConfig.ai,
    stateManagement: persistedConfig.stateManagement,
    validation: persistedConfig.validation,
    forms: persistedConfig.forms,
    testing: persistedConfig.testing,
    packageManager: persistedConfig.packageManager,
    versionChannel: persistedConfig.versionChannel,
    dbSetup: persistedConfig.dbSetup,
    api: persistedConfig.api,
    webDeploy: persistedConfig.webDeploy,
    serverDeploy: persistedConfig.serverDeploy,
    astroIntegration: persistedConfig.astroIntegration,
    cssFramework: persistedConfig.cssFramework,
    uiLibrary: persistedConfig.uiLibrary,
    shadcnBase: persistedConfig.shadcnBase,
    shadcnStyle: persistedConfig.shadcnStyle,
    shadcnIconLibrary: persistedConfig.shadcnIconLibrary,
    shadcnColorTheme: persistedConfig.shadcnColorTheme,
    shadcnBaseColor: persistedConfig.shadcnBaseColor,
    shadcnFont: persistedConfig.shadcnFont,
    shadcnRadius: persistedConfig.shadcnRadius,
    realtime: persistedConfig.realtime,
    jobQueue: persistedConfig.jobQueue,
    animation: persistedConfig.animation,
    logging: persistedConfig.logging,
    observability: persistedConfig.observability,
    featureFlags: persistedConfig.featureFlags,
    analytics: persistedConfig.analytics,
    mobileNavigation: persistedConfig.mobileNavigation,
    mobileUI: persistedConfig.mobileUI,
    mobileStorage: persistedConfig.mobileStorage,
    mobileTesting: persistedConfig.mobileTesting,
    mobilePush: persistedConfig.mobilePush,
    mobileOTA: persistedConfig.mobileOTA,
    mobileDeepLinking: persistedConfig.mobileDeepLinking,
    cms: persistedConfig.cms,
    caching: persistedConfig.caching,
    rateLimit: persistedConfig.rateLimit,
    i18n: persistedConfig.i18n,
    search: persistedConfig.search,
    vectorDb: persistedConfig.vectorDb,
    fileStorage: persistedConfig.fileStorage,
    rustWebFramework: persistedConfig.rustWebFramework,
    rustFrontend: persistedConfig.rustFrontend,
    rustOrm: persistedConfig.rustOrm,
    rustApi: persistedConfig.rustApi,
    rustCli: persistedConfig.rustCli,
    rustLibraries: persistedConfig.rustLibraries,
    rustLogging: persistedConfig.rustLogging,
    rustErrorHandling: persistedConfig.rustErrorHandling,
    rustCaching: persistedConfig.rustCaching,
    rustAuth: persistedConfig.rustAuth,
    rustRealtime: persistedConfig.rustRealtime,
    rustMessageQueue: persistedConfig.rustMessageQueue,
    rustObservability: persistedConfig.rustObservability,
    rustTemplating: persistedConfig.rustTemplating,
    pythonWebFramework: persistedConfig.pythonWebFramework,
    pythonOrm: persistedConfig.pythonOrm,
    pythonValidation: persistedConfig.pythonValidation,
    pythonAi: persistedConfig.pythonAi,
    pythonAuth: persistedConfig.pythonAuth,
    pythonApi: persistedConfig.pythonApi,
    pythonTaskQueue: persistedConfig.pythonTaskQueue,
    pythonGraphql: persistedConfig.pythonGraphql,
    pythonQuality: persistedConfig.pythonQuality,
    pythonTesting: persistedConfig.pythonTesting,
    pythonCaching: persistedConfig.pythonCaching,
    pythonRealtime: persistedConfig.pythonRealtime,
    pythonObservability: persistedConfig.pythonObservability,
    pythonCli: persistedConfig.pythonCli,
    goWebFramework: persistedConfig.goWebFramework,
    goOrm: persistedConfig.goOrm,
    goApi: persistedConfig.goApi,
    goCli: persistedConfig.goCli,
    goLogging: persistedConfig.goLogging,
    goAuth: persistedConfig.goAuth,
    goTesting: persistedConfig.goTesting,
    goRealtime: persistedConfig.goRealtime,
    goMessageQueue: persistedConfig.goMessageQueue,
    goCaching: persistedConfig.goCaching,
    goConfig: persistedConfig.goConfig,
    goObservability: persistedConfig.goObservability,
    javaWebFramework: persistedConfig.javaWebFramework,
    javaBuildTool: persistedConfig.javaBuildTool,
    javaOrm: persistedConfig.javaOrm,
    javaAuth: persistedConfig.javaAuth,
    javaApi: persistedConfig.javaApi,
    javaLogging: persistedConfig.javaLogging,
    javaLibraries: persistedConfig.javaLibraries,
    javaTestingLibraries: persistedConfig.javaTestingLibraries,
    dotnetWebFramework: persistedConfig.dotnetWebFramework,
    dotnetOrm: persistedConfig.dotnetOrm,
    dotnetAuth: persistedConfig.dotnetAuth,
    dotnetApi: persistedConfig.dotnetApi,
    dotnetTesting: persistedConfig.dotnetTesting,
    dotnetJobQueue: persistedConfig.dotnetJobQueue,
    dotnetRealtime: persistedConfig.dotnetRealtime,
    dotnetObservability: persistedConfig.dotnetObservability,
    dotnetValidation: persistedConfig.dotnetValidation,
    dotnetCaching: persistedConfig.dotnetCaching,
    dotnetDeploy: persistedConfig.dotnetDeploy,
    elixirWebFramework: persistedConfig.elixirWebFramework,
    elixirOrm: persistedConfig.elixirOrm,
    elixirAuth: persistedConfig.elixirAuth,
    elixirApi: persistedConfig.elixirApi,
    elixirRealtime: persistedConfig.elixirRealtime,
    elixirJobs: persistedConfig.elixirJobs,
    elixirValidation: persistedConfig.elixirValidation,
    elixirHttp: persistedConfig.elixirHttp,
    elixirJson: persistedConfig.elixirJson,
    elixirEmail: persistedConfig.elixirEmail,
    elixirCaching: persistedConfig.elixirCaching,
    elixirObservability: persistedConfig.elixirObservability,
    elixirTesting: persistedConfig.elixirTesting,
    elixirQuality: persistedConfig.elixirQuality,
    elixirDeploy: persistedConfig.elixirDeploy,
    elixirLibraries: persistedConfig.elixirLibraries,
    aiDocs: persistedConfig.aiDocs,
    stackParts,
  };
}

export function previewBtsConfigUpdate(
  currentConfig: BetterTStackConfig,
  updates: Partial<Pick<BetterTStackConfig, "addons" | "webDeploy" | "serverDeploy">>,
) {
  const updatedStackParts = syncUpdatedStackParts(currentConfig.stackParts, updates);

  return buildBtsConfigForPersistence(
    {
      ...currentConfig,
      ...updates,
      ...(updatedStackParts ? { stackParts: updatedStackParts } : {}),
    } as unknown as ProjectConfig,
    {
      version: currentConfig.version,
      createdAt: currentConfig.createdAt,
    },
  );
}

export async function writeBtsConfig(
  projectConfig: ProjectConfig,
  metadata: Partial<BtsConfigMetadata> = {},
) {
  const btsConfig = buildBtsConfigForPersistence(projectConfig, metadata);
  const baseContent = {
    $schema: "https://better-fullstack-web.vercel.app/schema.json",
    version: btsConfig.version,
    createdAt: btsConfig.createdAt,
    ...(btsConfig.graphSummary
      ? {
          graphSummary: btsConfig.graphSummary,
          effectiveStack: btsConfig.effectiveStack,
        }
      : {}),
    ecosystem: btsConfig.ecosystem,
    database: btsConfig.database,
    orm: btsConfig.orm,
    backend: btsConfig.backend,
    runtime: btsConfig.runtime,
    frontend: btsConfig.frontend,
    addons: btsConfig.addons,
    examples: btsConfig.examples,
    auth: btsConfig.auth,
    payments: btsConfig.payments,
    email: btsConfig.email,
    fileUpload: btsConfig.fileUpload,
    effect: btsConfig.effect,
    ai: btsConfig.ai,
    stateManagement: btsConfig.stateManagement,
    validation: btsConfig.validation,
    forms: btsConfig.forms,
    testing: btsConfig.testing,
    packageManager: btsConfig.packageManager,
    versionChannel: btsConfig.versionChannel,
    dbSetup: btsConfig.dbSetup,
    api: btsConfig.api,
    webDeploy: btsConfig.webDeploy,
    serverDeploy: btsConfig.serverDeploy,
    astroIntegration: btsConfig.astroIntegration,
    cssFramework: btsConfig.cssFramework,
    uiLibrary: btsConfig.uiLibrary,
    shadcnBase: btsConfig.shadcnBase,
    shadcnStyle: btsConfig.shadcnStyle,
    shadcnIconLibrary: btsConfig.shadcnIconLibrary,
    shadcnColorTheme: btsConfig.shadcnColorTheme,
    shadcnBaseColor: btsConfig.shadcnBaseColor,
    shadcnFont: btsConfig.shadcnFont,
    shadcnRadius: btsConfig.shadcnRadius,
    realtime: btsConfig.realtime,
    jobQueue: btsConfig.jobQueue,
    animation: btsConfig.animation,
    logging: btsConfig.logging,
    observability: btsConfig.observability,
    featureFlags: btsConfig.featureFlags,
    analytics: btsConfig.analytics,
    mobileNavigation: btsConfig.mobileNavigation,
    mobileUI: btsConfig.mobileUI,
    mobileStorage: btsConfig.mobileStorage,
    mobileTesting: btsConfig.mobileTesting,
    mobilePush: btsConfig.mobilePush,
    mobileOTA: btsConfig.mobileOTA,
    mobileDeepLinking: btsConfig.mobileDeepLinking,
    cms: btsConfig.cms,
    caching: btsConfig.caching,
    rateLimit: btsConfig.rateLimit,
    i18n: btsConfig.i18n,
    search: btsConfig.search,
    vectorDb: btsConfig.vectorDb,
    fileStorage: btsConfig.fileStorage,
    rustWebFramework: btsConfig.rustWebFramework,
    rustFrontend: btsConfig.rustFrontend,
    rustOrm: btsConfig.rustOrm,
    rustApi: btsConfig.rustApi,
    rustCli: btsConfig.rustCli,
    rustLibraries: btsConfig.rustLibraries,
    rustLogging: btsConfig.rustLogging,
    rustErrorHandling: btsConfig.rustErrorHandling,
    rustCaching: btsConfig.rustCaching,
    rustAuth: btsConfig.rustAuth,
    rustRealtime: btsConfig.rustRealtime,
    rustMessageQueue: btsConfig.rustMessageQueue,
    rustObservability: btsConfig.rustObservability,
    rustTemplating: btsConfig.rustTemplating,
    pythonWebFramework: btsConfig.pythonWebFramework,
    pythonOrm: btsConfig.pythonOrm,
    pythonValidation: btsConfig.pythonValidation,
    pythonAi: btsConfig.pythonAi,
    pythonAuth: btsConfig.pythonAuth,
    pythonApi: btsConfig.pythonApi ?? "none",
    pythonTaskQueue: btsConfig.pythonTaskQueue,
    pythonGraphql: btsConfig.pythonGraphql,
    pythonQuality: btsConfig.pythonQuality,
    pythonTesting: btsConfig.pythonTesting,
    pythonCaching: btsConfig.pythonCaching,
    pythonRealtime: btsConfig.pythonRealtime,
    pythonObservability: btsConfig.pythonObservability,
    pythonCli: btsConfig.pythonCli,
    goWebFramework: btsConfig.goWebFramework,
    goOrm: btsConfig.goOrm,
    goApi: btsConfig.goApi,
    goCli: btsConfig.goCli,
    goLogging: btsConfig.goLogging,
    goAuth: btsConfig.goAuth,
    goTesting: btsConfig.goTesting,
    goRealtime: btsConfig.goRealtime,
    goMessageQueue: btsConfig.goMessageQueue,
    goCaching: btsConfig.goCaching,
    goConfig: btsConfig.goConfig,
    goObservability: btsConfig.goObservability,
    javaWebFramework: btsConfig.javaWebFramework,
    javaBuildTool: btsConfig.javaBuildTool,
    javaOrm: btsConfig.javaOrm,
    javaAuth: btsConfig.javaAuth,
    javaApi: btsConfig.javaApi,
    javaLogging: btsConfig.javaLogging,
    javaLibraries: btsConfig.javaLibraries,
    javaTestingLibraries: btsConfig.javaTestingLibraries,
    dotnetWebFramework: btsConfig.dotnetWebFramework,
    dotnetOrm: btsConfig.dotnetOrm,
    dotnetAuth: btsConfig.dotnetAuth,
    dotnetApi: btsConfig.dotnetApi,
    dotnetTesting: btsConfig.dotnetTesting,
    dotnetJobQueue: btsConfig.dotnetJobQueue,
    dotnetRealtime: btsConfig.dotnetRealtime,
    dotnetObservability: btsConfig.dotnetObservability,
    dotnetValidation: btsConfig.dotnetValidation,
    dotnetCaching: btsConfig.dotnetCaching,
    dotnetDeploy: btsConfig.dotnetDeploy,
    elixirWebFramework: btsConfig.elixirWebFramework,
    elixirOrm: btsConfig.elixirOrm,
    elixirAuth: btsConfig.elixirAuth,
    elixirApi: btsConfig.elixirApi,
    elixirRealtime: btsConfig.elixirRealtime,
    elixirJobs: btsConfig.elixirJobs,
    elixirValidation: btsConfig.elixirValidation,
    elixirHttp: btsConfig.elixirHttp,
    elixirJson: btsConfig.elixirJson,
    elixirEmail: btsConfig.elixirEmail,
    elixirCaching: btsConfig.elixirCaching,
    elixirObservability: btsConfig.elixirObservability,
    elixirTesting: btsConfig.elixirTesting,
    elixirQuality: btsConfig.elixirQuality,
    elixirDeploy: btsConfig.elixirDeploy,
    elixirLibraries: btsConfig.elixirLibraries,
    aiDocs: btsConfig.aiDocs,
    stackParts: btsConfig.stackParts,
  };

  let configContent = JSON.stringify(baseContent);

  const formatResult = JSONC.format(configContent, undefined, {
    tabSize: 2,
    insertSpaces: true,
    eol: "\n",
  });

  configContent = JSONC.applyEdits(configContent, formatResult);

  const graphNote = btsConfig.stackParts?.length
    ? "// stackParts is the source of truth; graphSummary/effectiveStack summarize it for humans and tools.\n// Top-level option fields are a derived compatibility cache for older integrations.\n"
    : "";
  const finalContent = `// Better Fullstack configuration file
// safe to delete
${graphNote}

${configContent}`;
  const configPath = path.join(projectConfig.projectDir, BTS_CONFIG_FILE);
  await fs.writeFile(configPath, finalContent, "utf-8");
}

export async function readBtsConfig(projectDir: string) {
  try {
    const configPath = path.join(projectDir, BTS_CONFIG_FILE);

    if (!(await fs.pathExists(configPath))) {
      return null;
    }

    const configContent = await fs.readFile(configPath, "utf-8");

    const errors: JSONC.ParseError[] = [];
    const config = JSONC.parse(configContent, errors, {
      allowTrailingComma: true,
      disallowComments: false,
    }) as BetterTStackConfig;

    if (errors.length > 0) {
      console.warn("Warning: Found errors parsing bts.jsonc:", errors);
      return null;
    }

    return buildBtsConfigForPersistence(config as unknown as ProjectConfig, {
      version: config.version,
      createdAt: config.createdAt,
    });
  } catch {
    return null;
  }
}

export async function readBtsConfigFromFile(filePath: string) {
  try {
    const resolved = path.resolve(process.cwd(), filePath);

    if (!(await fs.pathExists(resolved))) {
      return null;
    }

    const stats = await fs.stat(resolved);
    const configPath = stats.isDirectory() ? path.join(resolved, BTS_CONFIG_FILE) : resolved;

    if (!(await fs.pathExists(configPath))) {
      return null;
    }

    const configContent = await fs.readFile(configPath, "utf-8");

    const errors: JSONC.ParseError[] = [];
    const config = JSONC.parse(configContent, errors, {
      allowTrailingComma: true,
      disallowComments: false,
    }) as BetterTStackConfig;

    if (errors.length > 0 || config === undefined || typeof config !== "object") {
      return null;
    }

    return buildBtsConfigForPersistence(config as unknown as ProjectConfig, {
      version: config.version,
      createdAt: config.createdAt,
    });
  } catch {
    return null;
  }
}

export async function updateBtsConfig(
  projectDir: string,
  updates: Partial<Pick<BetterTStackConfig, "addons" | "webDeploy" | "serverDeploy">>,
) {
  try {
    const configPath = path.join(projectDir, BTS_CONFIG_FILE);

    if (!(await fs.pathExists(configPath))) {
      return;
    }

    const configContent = await fs.readFile(configPath, "utf-8");
    const errors: JSONC.ParseError[] = [];
    const currentConfig = JSONC.parse(configContent, errors, {
      allowTrailingComma: true,
      disallowComments: false,
    }) as BetterTStackConfig;

    let modifiedContent = configContent;
    const nextConfig = errors.length === 0
      ? previewBtsConfigUpdate(currentConfig, updates)
      : undefined;
    const persistedUpdates = nextConfig
      ? Object.fromEntries(
          Object.entries(nextConfig).filter(([key]) => key !== "version" && key !== "createdAt"),
        )
      : updates;

    for (const [key, value] of Object.entries(persistedUpdates)) {
      const editResult = JSONC.modify(modifiedContent, [key], value, {
        formattingOptions: {
          tabSize: 2,
          insertSpaces: true,
          eol: "\n",
        },
      });
      modifiedContent = JSONC.applyEdits(modifiedContent, editResult);
    }

    await fs.writeFile(configPath, modifiedContent, "utf-8");
  } catch {}
}
