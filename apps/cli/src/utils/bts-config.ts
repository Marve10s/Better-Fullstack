import fs from "fs-extra";
import * as JSONC from "jsonc-parser";
import path from "node:path";

import type { BetterTStackConfig, ProjectConfig } from "../types";

import {
  compareLegacyConfigToStackParts,
  createStackPart,
  getAddonStackPartBinding,
  legacyProjectConfigToStackParts,
  stackPartsToLegacyProjectConfigPartial,
} from "../types";
import { getEffectiveStack, getGraphSummary } from "./graph-summary";
import { getLatestCLIVersion } from "./get-latest-cli-version";

const BTS_CONFIG_FILE = "bts.jsonc";

type StackPart = NonNullable<ProjectConfig["stackParts"]>[number];

function normalizeGraphConfigForPersistence(projectConfig: ProjectConfig, stackParts: ProjectConfig["stackParts"]) {
  if (!stackParts) return projectConfig;

  const legacyConfig = stackPartsToLegacyProjectConfigPartial(stackParts);
  const selectedEcosystems = new Set(
    stackParts.filter((part) => part.source !== "provided").map((part) => part.ecosystem),
  );

  const normalized: ProjectConfig = { ...projectConfig, ...legacyConfig };

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
  }

  if (!selectedEcosystems.has("go")) {
    normalized.goWebFramework = "none";
    normalized.goOrm = "none";
    normalized.goApi = "none";
    normalized.goCli = "none";
    normalized.goLogging = "none";
    normalized.goAuth = "none";
  }

  if (!selectedEcosystems.has("java")) {
    normalized.javaWebFramework = "none";
    normalized.javaBuildTool = "none";
    normalized.javaOrm = "none";
    normalized.javaAuth = "none";
    normalized.javaLibraries = [];
    normalized.javaTestingLibraries = [];
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
  }

  if (!selectedEcosystems.has("react-native")) {
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

export async function writeBtsConfig(projectConfig: ProjectConfig) {
  const stackParts = projectConfig.stackParts ?? legacyProjectConfigToStackParts(projectConfig);
  const persistedConfig = normalizeGraphConfigForPersistence(projectConfig, projectConfig.stackParts);
  const graphSummary = projectConfig.stackParts ? getGraphSummary({ stackParts }) : null;
  const effectiveStack = projectConfig.stackParts ? getEffectiveStack({ stackParts }) : undefined;
  const btsConfig: BetterTStackConfig = {
    version: getLatestCLIVersion(),
    createdAt: new Date().toISOString(),
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
    cssFramework: persistedConfig.cssFramework,
    uiLibrary: persistedConfig.uiLibrary,
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
    i18n: persistedConfig.i18n,
    search: persistedConfig.search,
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
    pythonWebFramework: persistedConfig.pythonWebFramework,
    pythonOrm: persistedConfig.pythonOrm,
    pythonValidation: persistedConfig.pythonValidation,
    pythonAi: persistedConfig.pythonAi,
    pythonAuth: persistedConfig.pythonAuth,
    pythonApi: persistedConfig.pythonApi,
    pythonTaskQueue: persistedConfig.pythonTaskQueue,
    pythonGraphql: persistedConfig.pythonGraphql,
    pythonQuality: persistedConfig.pythonQuality,
    goWebFramework: persistedConfig.goWebFramework,
    goOrm: persistedConfig.goOrm,
    goApi: persistedConfig.goApi,
    goCli: persistedConfig.goCli,
    goLogging: persistedConfig.goLogging,
    goAuth: persistedConfig.goAuth,
    javaWebFramework: persistedConfig.javaWebFramework,
    javaBuildTool: persistedConfig.javaBuildTool,
    javaOrm: persistedConfig.javaOrm,
    javaAuth: persistedConfig.javaAuth,
    javaLibraries: persistedConfig.javaLibraries,
    javaTestingLibraries: persistedConfig.javaTestingLibraries,
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
    aiDocs: persistedConfig.aiDocs,
    stackParts,
  };

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
    cssFramework: btsConfig.cssFramework,
    uiLibrary: btsConfig.uiLibrary,
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
    i18n: btsConfig.i18n,
    search: btsConfig.search,
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
    pythonWebFramework: btsConfig.pythonWebFramework,
    pythonOrm: btsConfig.pythonOrm,
    pythonValidation: btsConfig.pythonValidation,
    pythonAi: btsConfig.pythonAi,
    pythonAuth: btsConfig.pythonAuth,
    pythonApi: btsConfig.pythonApi ?? "none",
    pythonTaskQueue: btsConfig.pythonTaskQueue,
    pythonGraphql: btsConfig.pythonGraphql,
    pythonQuality: btsConfig.pythonQuality,
    goWebFramework: btsConfig.goWebFramework,
    goOrm: btsConfig.goOrm,
    goApi: btsConfig.goApi,
    goCli: btsConfig.goCli,
    goLogging: btsConfig.goLogging,
    goAuth: btsConfig.goAuth,
    javaWebFramework: btsConfig.javaWebFramework,
    javaBuildTool: btsConfig.javaBuildTool,
    javaOrm: btsConfig.javaOrm,
    javaAuth: btsConfig.javaAuth,
    javaLibraries: btsConfig.javaLibraries,
    javaTestingLibraries: btsConfig.javaTestingLibraries,
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

  const graphNote = graphSummary
    ? "// For multi-ecosystem projects, graphSummary/effectiveStack and stackParts are the source of truth.\n// Legacy fields such as backend/orm may stay as compatibility fallbacks.\n"
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

    if (config.stackParts && config.stackParts.length > 0) {
      const diagnostics = compareLegacyConfigToStackParts(config, config.stackParts);
      if (diagnostics.length > 0) {
        console.warn(
          `Warning: bts.jsonc legacy fields differ from stackParts; using stackParts for ${diagnostics
            .map((diagnostic) => diagnostic.path)
            .filter(Boolean)
            .join(", ")}.`,
        );
      }
      return {
        ...config,
        ...stackPartsToLegacyProjectConfigPartial(config.stackParts),
        stackParts: config.stackParts,
      } as BetterTStackConfig;
    }

    return {
      ...config,
      stackParts: legacyProjectConfigToStackParts(config),
    } as BetterTStackConfig;
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
    const updatedStackParts = errors.length === 0
      ? syncUpdatedStackParts(currentConfig.stackParts, updates)
      : undefined;
    const persistedUpdates = {
      ...updates,
      ...(updatedStackParts ? { stackParts: updatedStackParts } : {}),
    };

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
