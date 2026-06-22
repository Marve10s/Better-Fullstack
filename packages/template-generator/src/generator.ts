import type { ProjectConfig, StackPart } from "@better-fullstack/types";

import {
  getRoleTargetPath,
  stackGraphToLegacyProjectConfigForEcosystem,
} from "@better-fullstack/types";

import type { GeneratorOptions, GeneratorResult, VirtualFileTree } from "./types";

import { VirtualFileSystem } from "./core/virtual-fs";
import { processCatalogs, processPackageConfigs, updateDbPackageJson } from "./post-process";
import {
  processDatabaseDeps,
  processDependencies,
  processReadme,
  processAuthPlugins,
  processAlchemyPlugins,
  processPwaPlugins,
  processEnvVariables,
} from "./processors";
import { processAiDocs } from "./processors/ai-docs-generator";
import { processGraphBackendConnection } from "./processors/graph-backend-connection";
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
  processFeatureFlagsTemplates,
  processAnalyticsTemplates,
  processJobQueueTemplates,
  processCMSTemplates,
  processI18nTemplates,
  processSearchTemplates,
  processFileStorageTemplates,
  processTestingTemplates,
} from "./template-handlers";

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

const ECOSYSTEM_BASE_TEMPLATE_PROCESSORS = {
  rust: processRustBaseTemplate,
  python: processPythonBaseTemplate,
  go: processGoBaseTemplate,
  java: processJavaBaseTemplate,
  dotnet: processDotnetBaseTemplate,
  elixir: processElixirBaseTemplate,
} satisfies Record<NonTypeScriptTemplateEcosystem, EcosystemBaseTemplateProcessor>;

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

async function processGraphTemplates(
  vfs: VirtualFileSystem,
  templates: TemplateData,
  config: ProjectConfig,
): Promise<void> {
  const tsConfig = stackGraphToLegacyProjectConfigForEcosystem(config, "typescript");
  await processBaseTemplate(vfs, templates, tsConfig);

  if (tsConfig.frontend.length > 0 || tsConfig.backend !== "none") {
    await processFrontendTemplates(vfs, templates, tsConfig);
    await processBackendTemplates(vfs, templates, tsConfig);
    await processApiTemplates(vfs, templates, tsConfig);
    await processConfigPackage(vfs, templates, tsConfig);
    await processEnvPackage(vfs, templates, tsConfig);
    await processAuthTemplates(vfs, templates, tsConfig);
    await processPaymentsTemplates(vfs, templates, tsConfig);
    await processEmailTemplates(vfs, templates, tsConfig);
    await processAddonTemplates(vfs, templates, tsConfig);
    await processExampleTemplates(vfs, templates, tsConfig);
    await processExtrasTemplates(vfs, templates, tsConfig);
    await processDeployTemplates(vfs, templates, tsConfig);
    await processLoggingTemplates(vfs, templates, tsConfig);
    await processObservabilityTemplates(vfs, templates, tsConfig);
    await processRateLimitTemplates(vfs, templates, tsConfig);
    await processFeatureFlagsTemplates(vfs, templates, tsConfig);
    await processAnalyticsTemplates(vfs, templates, tsConfig);
    await processJobQueueTemplates(vfs, templates, tsConfig);
    await processCMSTemplates(vfs, templates, tsConfig);
    await processI18nTemplates(vfs, templates, tsConfig);
    await processSearchTemplates(vfs, templates, tsConfig);
    await processFileStorageTemplates(vfs, templates, tsConfig);
    await processTestingTemplates(vfs, templates, tsConfig);
    processPackageConfigs(vfs, tsConfig);
    processDependencies(vfs, tsConfig);
    processEnvVariables(vfs, tsConfig);
    processGraphBackendConnection(vfs, tsConfig);
    await processAuthPlugins(vfs, tsConfig);
    await processAlchemyPlugins(vfs, tsConfig);
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

  const nonTypeScriptBackends = (config.stackParts ?? []).filter(
    (part) => part.role === "backend" && !part.ownerPartId && part.ecosystem !== "typescript",
  );

  for (const part of nonTypeScriptBackends) {
    const targetPath = part.targetPath ?? getRoleTargetPath("backend") ?? "apps/server";
    const ecosystem = part.ecosystem as NonTypeScriptTemplateEcosystem;
    await ECOSYSTEM_BASE_TEMPLATE_PROCESSORS[ecosystem](
      vfs,
      templates,
      stackGraphToLegacyProjectConfigForEcosystem(config, ecosystem),
      targetPath,
    );
  }

  processPackageConfigs(vfs, config);
  processDependencies(vfs, config);
  processCatalogs(vfs, config);
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

    const vfs = new VirtualFileSystem();

    if (config.stackParts && config.stackParts.length > 0) {
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
      await processAddonTemplates(vfs, templates, config);
      await processExampleTemplates(vfs, templates, config);
      await processExtrasTemplates(vfs, templates, config);
      await processDeployTemplates(vfs, templates, config);
      await processLoggingTemplates(vfs, templates, config);
      await processObservabilityTemplates(vfs, templates, config);
      await processRateLimitTemplates(vfs, templates, config);
      await processFeatureFlagsTemplates(vfs, templates, config);
      await processAnalyticsTemplates(vfs, templates, config);
      await processJobQueueTemplates(vfs, templates, config);
      await processCMSTemplates(vfs, templates, config);
      await processI18nTemplates(vfs, templates, config);
      await processSearchTemplates(vfs, templates, config);
      await processFileStorageTemplates(vfs, templates, config);
      await processTestingTemplates(vfs, templates, config);

      processPackageConfigs(vfs, config);
      processDependencies(vfs, config);
      processEnvVariables(vfs, config);
      await processAuthPlugins(vfs, config);
      await processAlchemyPlugins(vfs, config);
      await processPwaPlugins(vfs, config);
      processCatalogs(vfs, config);
    }

    if (config.ecosystem !== "typescript" && config.ecosystem !== "react-native") {
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
