import type { ProjectConfig, StackPart } from "@better-fullstack/types";

import {
  hasJavaScriptWorkspaceRoot,
  formatStackGraphIssue,
  getRoleTargetPath,
  hasVitePlusWorkspaceRoot,
  isToolingOverlayOnly,
  parseStackPartSpecs,
  stackGraphToLegacyProjectConfigForEcosystem,
  validateStackParts,
} from "@better-fullstack/types";

import type { GeneratorOptions, GeneratorResult, VirtualFileTree } from "@/types";

import { VirtualFileSystem } from "@/core/virtual-fs";
import { processNativeGraphCommands } from "@/graph/graph-project";
import {
  flattenSingleApp,
  processCatalogs,
  processPackageConfigs,
  qualifiesForSingleApp,
  updateDbPackageJson,
} from "@/post-process";
import {
  processDatabaseDeps,
  processDependencies,
  processReadme,
  processAuthPlugins,
  processAlchemyPlugins,
  processParaglidePlugins,
  processPwaPlugins,
  processEnvVariables,
} from "@/processors";
import { processAiDocs } from "@/processors/config/ai-docs-generator";
import {
  processGraphBackendConnection,
  processGraphBackendEnv,
} from "@/processors/config/graph-backend-connection";
import {
  type TemplateData,
  processBaseTemplate,
  processRustBaseTemplate,
  processPythonBaseTemplate,
  processGoBaseTemplate,
  processJavaBaseTemplate,
  processDotnetBaseTemplate,
  processElixirBaseTemplate,
  processFrontendTemplates,
  processGraphNativeAppTemplates,
  processBackendTemplates,
  processDbTemplates,
  processApiTemplates,
  processConfigPackage,
  processEnvPackage,
  processAuthTemplates,
  processPaymentsTemplates,
  processEmailTemplates,
  processAddonTemplates,
  processExampleTemplates,
  processExtrasTemplates,
  processDeployTemplates,
  processLoggingTemplates,
  processObservabilityTemplates,
  processRateLimitTemplates,
  processBotProtectionTemplates,
  processFeatureFlagsTemplates,
  processIntegrationsTemplates,
  processEcommerceTemplates,
  processAnalyticsTemplates,
  processWebMcpTemplates,
  processAITemplates,
  processRealtimeTemplates,
  processJobQueueTemplates,
  processCMSTemplates,
  processI18nTemplates,
  processSearchTemplates,
  processVectorDbTemplates,
  processFileStorageTemplates,
  processTestingTemplates,
} from "@/template-handlers";

export type { TemplateData };

type NonTypeScriptTemplateEcosystem = Exclude<
  ProjectConfig["ecosystem"],
  "typescript" | "react-native"
>;

type EcosystemBaseTemplateProcessor = (
  vfs: VirtualFileSystem,
  templates: TemplateData,
  config: ProjectConfig,
  targetPath?: string,
) => Promise<void>;

type ProjectConfigWithCiWorkingDirectory = ProjectConfig & {
  ciWorkingDirectory?: string;
  ciHasTestScript?: boolean;
  graphBackendTargetPath?: string;
};

const ECOSYSTEM_BASE_TEMPLATE_PROCESSORS = {
  rust: processRustBaseTemplate,
  python: processPythonBaseTemplate,
  go: processGoBaseTemplate,
  java: processJavaBaseTemplate,
  dotnet: processDotnetBaseTemplate,
  elixir: processElixirBaseTemplate,
} satisfies Record<NonTypeScriptTemplateEcosystem, EcosystemBaseTemplateProcessor>;

const GRAPH_CONTAINER_ADDONS = new Set(["docker-compose", "devcontainer", "kong"]);

function validateGraphContainerAddons(config: ProjectConfig): string[] {
  if (!config.stackParts || config.stackParts.length === 0) return [];

  const explicitContainerAddons = new Set(
    config.stackParts
      .filter((part) => part.role === "workspaceTooling" && GRAPH_CONTAINER_ADDONS.has(part.toolId))
      .map((part) => part.toolId),
  );
  const legacyContainerAddons = (config.addons ?? []).filter(
    (addon) => GRAPH_CONTAINER_ADDONS.has(addon) && !explicitContainerAddons.has(addon),
  );
  const effectiveParts = [
    ...config.stackParts,
    ...parseStackPartSpecs(
      legacyContainerAddons.map((addon) => `workspaceTooling:universal:${addon}`),
    ),
  ];
  const containerPartIds = new Set(
    effectiveParts
      .filter((part) => part.role === "workspaceTooling" && GRAPH_CONTAINER_ADDONS.has(part.toolId))
      .map((part) => part.id),
  );

  return validateStackParts(effectiveParts)
    .issues.filter((issue) => issue.partId !== undefined && containerPartIds.has(issue.partId))
    .map(formatStackGraphIssue);
}

function validateGraphRenderingSupport(config: ProjectConfig): string[] {
  return validateStackParts(config.stackParts ?? [])
    .issues.filter((issue) => issue.code === "UNSUPPORTED_REPEATED_PRIMARY")
    .map(formatStackGraphIssue);
}

function hasGeneratedJavascriptTestScript(config: ProjectConfig): boolean {
  return (
    config.testing === "vitest" ||
    config.testing === "jest" ||
    config.testing === "mocha" ||
    config.testing === "vitest-playwright" ||
    config.mobileTesting === "react-native-testing-library" ||
    config.mobileTesting === "maestro-react-native-testing-library"
  );
}

function withCiTemplateFlags(config: ProjectConfig): ProjectConfigWithCiWorkingDirectory {
  return {
    ...config,
    ciHasTestScript: hasGeneratedJavascriptTestScript(config),
  };
}

function mergeGraphAddonSelections(
  config: ProjectConfig,
  projectedConfig: ProjectConfig,
): ProjectConfig["addons"] {
  const uniqueAddons = [...new Set([...(config.addons ?? []), ...(projectedConfig.addons ?? [])])];
  const realAddons = uniqueAddons.filter((addon) => addon !== "none");
  return (realAddons.length > 0 ? realAddons : uniqueAddons) as ProjectConfig["addons"];
}

function withGraphAddonSelections(
  config: ProjectConfig,
  projectedConfig: ProjectConfig,
): ProjectConfig {
  return {
    ...projectedConfig,
    addons: mergeGraphAddonSelections(config, projectedConfig),
  };
}

function isPrimaryPart(part: StackPart, role: StackPart["role"]) {
  return part.role === role && !part.ownerPartId && part.source !== "provided";
}

function getPrimaryPart(config: ProjectConfig, role: StackPart["role"]) {
  return config.stackParts?.find((part) => isPrimaryPart(part, role));
}

function getScopedPart(
  config: ProjectConfig,
  owner: StackPart | undefined,
  role: StackPart["role"],
) {
  if (!owner) return undefined;
  return config.stackParts?.find(
    (part) => part.role === role && part.ownerPartId === owner.id && part.source !== "provided",
  );
}

function focusGraphOnPrimaryBackend(config: ProjectConfig, backend: StackPart): ProjectConfig {
  const otherBackendIds = new Set(
    (config.stackParts ?? [])
      .filter(
        (part) =>
          part.role === "backend" &&
          !part.ownerPartId &&
          part.source !== "provided" &&
          part.id !== backend.id,
      )
      .map((part) => part.id),
  );
  return {
    ...config,
    stackParts: (config.stackParts ?? []).filter(
      (part) =>
        !otherBackendIds.has(part.id) &&
        !otherBackendIds.has(part.ownerPartId ?? "") &&
        !otherBackendIds.has(part.providedByPartId ?? ""),
    ),
  };
}

async function processGraphTemplates(
  vfs: VirtualFileSystem,
  templates: TemplateData,
  config: ProjectConfig,
): Promise<void> {
  const nonTypeScriptBackends = (config.stackParts ?? []).filter(
    (part) => part.role === "backend" && !part.ownerPartId && part.ecosystem !== "typescript",
  );
  const rustFrontend = (config.stackParts ?? []).find(
    (part) =>
      part.role === "frontend" &&
      !part.ownerPartId &&
      part.source !== "provided" &&
      part.ecosystem === "rust",
  );
  const hasRustBackend = nonTypeScriptBackends.some((part) => part.ecosystem === "rust");
  const hasCrossEcosystemWebBackend =
    nonTypeScriptBackends.length > 0 &&
    (config.stackParts ?? []).some(
      (part) => part.role === "frontend" && !part.ownerPartId && part.ecosystem === "typescript",
    );
  const crossEcosystemInfrastructureAddons = new Set(["docker-compose", "devcontainer", "kong"]);
  const tsConfig = withGraphAddonSelections(
    config,
    stackGraphToLegacyProjectConfigForEcosystem(config, "typescript"),
  );
  await processBaseTemplate(vfs, templates, tsConfig);
  if (!hasJavaScriptWorkspaceRoot(config.stackParts)) {
    for (const path of ["package.json", "tsconfig.json", "deno.json"]) vfs.deleteFile(path);
  }
  await processGraphNativeAppTemplates(vfs, templates, config);

  if (rustFrontend && !hasRustBackend) {
    const rustFrontendConfig = stackGraphToLegacyProjectConfigForEcosystem(config, "rust");
    await processRustBaseTemplate(
      vfs,
      templates,
      rustFrontendConfig,
      rustFrontend.targetPath ?? getRoleTargetPath("frontend") ?? "apps/web",
    );
  }

  if (hasJavaScriptWorkspaceRoot(config.stackParts)) {
    await processFrontendTemplates(vfs, templates, tsConfig);
    await processBackendTemplates(vfs, templates, tsConfig);
    await processApiTemplates(vfs, templates, tsConfig);
    await processConfigPackage(vfs, templates, tsConfig);
    await processEnvPackage(vfs, templates, tsConfig);
    await processAuthTemplates(vfs, templates, tsConfig);
    await processPaymentsTemplates(vfs, templates, tsConfig);
    await processEmailTemplates(vfs, templates, tsConfig);
    const initialTsAddonConfig = hasCrossEcosystemWebBackend
      ? {
          ...tsConfig,
          // Compose-backed infrastructure must be rendered from the non-TypeScript
          // backend projection so every selected service shares one graph-aware
          // Compose file and DevContainer configuration.
          addons: tsConfig.addons.filter((addon) => !crossEcosystemInfrastructureAddons.has(addon)),
        }
      : tsConfig;
    await processAddonTemplates(vfs, templates, withCiTemplateFlags(initialTsAddonConfig));
    await processExampleTemplates(vfs, templates, tsConfig);
    await processExtrasTemplates(vfs, templates, tsConfig);
    await processDeployTemplates(vfs, templates, tsConfig);
    await processLoggingTemplates(vfs, templates, tsConfig);
    await processObservabilityTemplates(vfs, templates, tsConfig);
    await processRateLimitTemplates(vfs, templates, tsConfig);
    await processBotProtectionTemplates(vfs, templates, tsConfig);
    await processFeatureFlagsTemplates(vfs, templates, tsConfig);
    await processIntegrationsTemplates(vfs, templates, tsConfig);
    await processEcommerceTemplates(vfs, templates, tsConfig);
    await processAnalyticsTemplates(vfs, templates, tsConfig);
    await processWebMcpTemplates(vfs, templates, tsConfig);
    await processAITemplates(vfs, templates, tsConfig);
    await processRealtimeTemplates(vfs, templates, tsConfig);
    await processJobQueueTemplates(vfs, templates, tsConfig);
    await processCMSTemplates(vfs, templates, tsConfig);
    await processI18nTemplates(vfs, templates, tsConfig);
    await processSearchTemplates(vfs, templates, tsConfig);
    await processVectorDbTemplates(vfs, templates, tsConfig);
    await processFileStorageTemplates(vfs, templates, tsConfig);
    await processTestingTemplates(vfs, templates, tsConfig);
    processPackageConfigs(vfs, tsConfig);
    processDependencies(vfs, tsConfig);
    processEnvVariables(vfs, tsConfig);
    await processAuthPlugins(vfs, tsConfig);
    await processAlchemyPlugins(vfs, tsConfig);
    await processParaglidePlugins(vfs, tsConfig);
    await processPwaPlugins(vfs, tsConfig);
    processCatalogs(vfs, tsConfig);
  }

  const databasePart =
    getPrimaryPart(config, "database") ??
    getScopedPart(config, getPrimaryPart(config, "backend"), "database");
  if (databasePart) {
    const dbConfig = {
      ...tsConfig,
      database: databasePart.toolId as ProjectConfig["database"],
    };
    const databaseTargetPath =
      databasePart.targetPath ?? getRoleTargetPath("database") ?? "packages/db";
    if (
      dbConfig.orm !== "none" ||
      dbConfig.database === "edgedb" ||
      dbConfig.database === "redis"
    ) {
      await processDbTemplates(vfs, templates, dbConfig, databaseTargetPath);
      // The shared post-process pass below runs against the raw graph config,
      // where database/orm live in stackParts instead of the legacy fields, so it
      // skips the database package. Populate its deps + scripts here using the
      // resolved dbConfig so part-mode matches solo mode.
      processDatabaseDeps(vfs, dbConfig, databaseTargetPath);
      updateDbPackageJson(vfs, dbConfig, databaseTargetPath);
    }
    if (!vfs.directoryExists(databaseTargetPath)) {
      vfs.writeFile(
        `${databaseTargetPath}/README.md`,
        `# ${databasePart.toolId}\n\nStandalone database stack part generated by Better Fullstack.\n`,
      );
    }
  }

  for (const part of nonTypeScriptBackends) {
    const targetPath = part.targetPath ?? getRoleTargetPath("backend") ?? "apps/server";
    const ecosystem = part.ecosystem as NonTypeScriptTemplateEcosystem;
    const projectedConfig = stackGraphToLegacyProjectConfigForEcosystem(
      focusGraphOnPrimaryBackend(config, part),
      ecosystem,
    );
    const backendConfig =
      ecosystem === "python" && !getScopedPart(config, part, "packageManager")
        ? {
            ...projectedConfig,
            // Manual and legacy graphs may not contain the newer package-manager
            // part. Preserve the flat selection so generated files agree with
            // graph-level setup and run commands.
            pythonPackageManager: config.pythonPackageManager ?? "uv",
          }
        : projectedConfig;
    await ECOSYSTEM_BASE_TEMPLATE_PROCESSORS[ecosystem](vfs, templates, backendConfig, targetPath);
  }

  // Pin the backend's CORS to the web frontend's dev origin (must run after the
  // backend templates above so the backend .env.example exists).
  processGraphBackendEnv(vfs, config);
  processGraphBackendConnection(vfs, config);

  const selectedCrossEcosystemInfrastructureAddons = tsConfig.addons.filter((addon) =>
    crossEcosystemInfrastructureAddons.has(addon),
  );
  if (hasCrossEcosystemWebBackend && selectedCrossEcosystemInfrastructureAddons.length > 0) {
    const backendPart = nonTypeScriptBackends[0];
    if (backendPart) {
      const targetPath = backendPart.targetPath ?? getRoleTargetPath("backend") ?? "apps/server";
      const backendConfig = withGraphAddonSelections(
        config,
        stackGraphToLegacyProjectConfigForEcosystem(
          config,
          backendPart.ecosystem as NonTypeScriptTemplateEcosystem,
        ),
      );
      await processAddonTemplates(vfs, templates, {
        ...backendConfig,
        addons: selectedCrossEcosystemInfrastructureAddons,
        frontend: tsConfig.frontend,
        packageManager: tsConfig.packageManager,
        graphWebFrontend: true,
        graphBackendTargetPath: targetPath,
      } as ProjectConfig);
    }
  }

  if (
    tsConfig.frontend.length === 0 &&
    tsConfig.backend === "none" &&
    nonTypeScriptBackends.length > 0
  ) {
    const backendPart = nonTypeScriptBackends[0];
    if (backendPart) {
      const targetPath = backendPart.targetPath ?? getRoleTargetPath("backend") ?? "apps/server";
      const addonConfig = {
        ...withGraphAddonSelections(
          config,
          stackGraphToLegacyProjectConfigForEcosystem(
            config,
            backendPart.ecosystem as NonTypeScriptTemplateEcosystem,
          ),
        ),
      } as ProjectConfigWithCiWorkingDirectory;
      if (addonConfig.addons.some((addon) => addon !== "none")) {
        addonConfig.ciWorkingDirectory = targetPath;
        addonConfig.graphBackendTargetPath = targetPath;
        await processAddonTemplates(vfs, templates, addonConfig);
      }
    }
  }

  processPackageConfigs(vfs, config);
  processDependencies(vfs, config);
  processCatalogs(vfs, config);
  processNativeGraphCommands(vfs, config);
}

export async function generateVirtualProject(options: GeneratorOptions): Promise<GeneratorResult> {
  try {
    const { config, templates } = options;

    if (!templates || templates.size === 0) {
      return {
        success: false,
        error: "No templates provided. Templates must be passed via the templates option.",
      };
    }

    const usesGraphParts =
      Boolean(config.stackParts?.length) && !isToolingOverlayOnly(config.stackParts);

    const hasVitePlusRoot = usesGraphParts
      ? hasVitePlusWorkspaceRoot(config.stackParts)
      : config.ecosystem === "typescript" &&
        config.frontend.some(
          (frontend) =>
            frontend !== "none" &&
            frontend !== "native-bare" &&
            frontend !== "native-uniwind" &&
            frontend !== "native-unistyles",
        );
    if (config.addons.includes("vite-plus") && !hasVitePlusRoot) {
      return {
        success: false,
        error: "Vite+ requires a generated TypeScript web frontend",
      };
    }

    if (
      usesGraphParts &&
      !hasJavaScriptWorkspaceRoot(config.stackParts) &&
      (config.addons.includes("lefthook") ||
        config.stackParts?.some((part) => part.toolId === "lefthook" && part.source !== "provided"))
    ) {
      return {
        success: false,
        error: "Lefthook requires a generated JavaScript application for its package-based setup.",
      };
    }

    if (usesGraphParts) {
      const graphIssues = [
        ...validateGraphContainerAddons(config),
        ...validateGraphRenderingSupport(config),
      ];
      if (graphIssues.length > 0) {
        return {
          success: false,
          error: graphIssues.join("\n"),
        };
      }
    }

    const vfs = new VirtualFileSystem();

    if (usesGraphParts) {
      await processGraphTemplates(vfs, templates, config);
    } else if (config.ecosystem in ECOSYSTEM_BASE_TEMPLATE_PROCESSORS) {
      await ECOSYSTEM_BASE_TEMPLATE_PROCESSORS[config.ecosystem as NonTypeScriptTemplateEcosystem](
        vfs,
        templates,
        config,
      );
    } else {
      // TypeScript and React Native ecosystems use package.json and TS project structure.
      await processBaseTemplate(vfs, templates, config);
      await processFrontendTemplates(vfs, templates, config);
      await processBackendTemplates(vfs, templates, config);
      await processDbTemplates(vfs, templates, config);
      await processApiTemplates(vfs, templates, config);
      await processConfigPackage(vfs, templates, config);
      await processEnvPackage(vfs, templates, config);
      await processAuthTemplates(vfs, templates, config);
      await processPaymentsTemplates(vfs, templates, config);
      await processEmailTemplates(vfs, templates, config);
      await processAddonTemplates(vfs, templates, withCiTemplateFlags(config));
      await processExampleTemplates(vfs, templates, config);
      await processExtrasTemplates(vfs, templates, config);
      await processDeployTemplates(vfs, templates, config);
      await processLoggingTemplates(vfs, templates, config);
      await processObservabilityTemplates(vfs, templates, config);
      await processRateLimitTemplates(vfs, templates, config);
      await processBotProtectionTemplates(vfs, templates, config);
      await processFeatureFlagsTemplates(vfs, templates, config);
      await processIntegrationsTemplates(vfs, templates, config);
      await processEcommerceTemplates(vfs, templates, config);
      await processAnalyticsTemplates(vfs, templates, config);
      await processWebMcpTemplates(vfs, templates, config);
      await processAITemplates(vfs, templates, config);
      await processRealtimeTemplates(vfs, templates, config);
      await processJobQueueTemplates(vfs, templates, config);
      await processCMSTemplates(vfs, templates, config);
      await processI18nTemplates(vfs, templates, config);
      await processSearchTemplates(vfs, templates, config);
      await processVectorDbTemplates(vfs, templates, config);
      await processFileStorageTemplates(vfs, templates, config);
      await processTestingTemplates(vfs, templates, config);

      processPackageConfigs(vfs, config);
      processDependencies(vfs, config);
      processEnvVariables(vfs, config);
      await processAuthPlugins(vfs, config);
      await processAlchemyPlugins(vfs, config);
      await processParaglidePlugins(vfs, config);
      await processPwaPlugins(vfs, config);
      processCatalogs(vfs, config);

      // Collapse the monorepo layout into a flat single-app repo when the stack
      // qualifies (thin self app). Runs last so it operates on the complete,
      // valid monorepo tree; a no-op for the default monorepo shape.
      if (qualifiesForSingleApp(config)) {
        flattenSingleApp(vfs, config);
      }
    }

    if (
      !usesGraphParts &&
      config.ecosystem !== "typescript" &&
      config.ecosystem !== "react-native"
    ) {
      await processAddonTemplates(vfs, templates, config);
      processEnvVariables(vfs, config);
    }

    processReadme(vfs, config);
    processAiDocs(vfs, config);

    const tree: VirtualFileTree = {
      root: vfs.toTree(config.projectName),
      fileCount: vfs.getFileCount(),
      directoryCount: vfs.getDirectoryCount(),
      config,
    };

    return { success: true, tree };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
}
