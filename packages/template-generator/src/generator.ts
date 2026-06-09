import type { ProjectConfig, StackPart, StackPartEcosystem } from "@better-fullstack/types";

import { getRoleTargetPath } from "@better-fullstack/types";

import type { GeneratorOptions, GeneratorResult, VirtualFileTree } from "./types";

import { VirtualFileSystem } from "./core/virtual-fs";
import { processCatalogs, processPackageConfigs } from "./post-process";
import {
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

function getGraphConfigForEcosystem(
  config: ProjectConfig,
  ecosystem: Exclude<StackPartEcosystem, "universal">,
): ProjectConfig {
  const backend = config.stackParts?.find(
    (part) => part.role === "backend" && part.ecosystem === ecosystem && !part.ownerPartId,
  );
  const frontend = config.stackParts?.find(
    (part) => part.role === "frontend" && part.ecosystem === ecosystem && !part.ownerPartId,
  );
  const mobile = config.stackParts?.find(
    (part) => part.role === "mobile" && part.ecosystem === "react-native" && !part.ownerPartId,
  );
  const database = getPrimaryPart(config, "database") ?? getScopedPart(config, backend, "database");
  const orm = getScopedPart(config, backend, "orm");
  const api = getScopedPart(config, backend, "api");
  const auth =
    getScopedPart(config, backend, "auth") ??
    getScopedPart(config, frontend, "auth") ??
    getScopedPart(config, mobile, "auth");

  return {
    ...config,
    ecosystem,
    frontend: [
      ...(frontend && frontend.ecosystem === "typescript" ? [frontend.toolId] : []),
      ...(mobile && ["typescript", "react-native"].includes(ecosystem) ? [mobile.toolId] : []),
    ] as ProjectConfig["frontend"],
    backend:
      backend?.ecosystem === "typescript" ? (backend.toolId as ProjectConfig["backend"]) : "none",
    database: (database?.toolId as ProjectConfig["database"]) ?? "none",
    orm: orm?.ecosystem === "typescript" ? (orm.toolId as ProjectConfig["orm"]) : "none",
    api: api?.ecosystem === "typescript" ? (api.toolId as ProjectConfig["api"]) : "none",
    auth:
      auth && (auth.ecosystem === "typescript" || auth.ecosystem === "react-native")
        ? (auth.toolId as ProjectConfig["auth"])
        : "none",
    rustWebFramework:
      backend?.ecosystem === "rust"
        ? (backend.toolId as ProjectConfig["rustWebFramework"])
        : "none",
    rustFrontend:
      frontend?.ecosystem === "rust" ? (frontend.toolId as ProjectConfig["rustFrontend"]) : "none",
    rustOrm: orm?.ecosystem === "rust" ? (orm.toolId as ProjectConfig["rustOrm"]) : "none",
    rustApi: api?.ecosystem === "rust" ? (api.toolId as ProjectConfig["rustApi"]) : "none",
    rustAuth: auth?.ecosystem === "rust" ? (auth.toolId as ProjectConfig["rustAuth"]) : "none",
    pythonWebFramework:
      backend?.ecosystem === "python"
        ? (backend.toolId as ProjectConfig["pythonWebFramework"])
        : "none",
    pythonOrm: orm?.ecosystem === "python" ? (orm.toolId as ProjectConfig["pythonOrm"]) : "none",
    pythonApi: api?.ecosystem === "python" ? (api.toolId as ProjectConfig["pythonApi"]) : "none",
    pythonAuth:
      auth?.ecosystem === "python" ? (auth.toolId as ProjectConfig["pythonAuth"]) : "none",
    goWebFramework:
      backend?.ecosystem === "go" ? (backend.toolId as ProjectConfig["goWebFramework"]) : "none",
    goOrm: orm?.ecosystem === "go" ? (orm.toolId as ProjectConfig["goOrm"]) : "none",
    goApi: api?.ecosystem === "go" ? (api.toolId as ProjectConfig["goApi"]) : "none",
    goAuth: auth?.ecosystem === "go" ? (auth.toolId as ProjectConfig["goAuth"]) : "none",
    javaWebFramework:
      backend?.ecosystem === "java"
        ? (backend.toolId as ProjectConfig["javaWebFramework"])
        : "none",
    javaOrm: orm?.ecosystem === "java" ? (orm.toolId as ProjectConfig["javaOrm"]) : "none",
    javaAuth: auth?.ecosystem === "java" ? (auth.toolId as ProjectConfig["javaAuth"]) : "none",
    elixirWebFramework:
      backend?.ecosystem === "elixir"
        ? (backend.toolId as ProjectConfig["elixirWebFramework"])
        : "none",
    elixirOrm: orm?.ecosystem === "elixir" ? (orm.toolId as ProjectConfig["elixirOrm"]) : "none",
    elixirApi: api?.ecosystem === "elixir" ? (api.toolId as ProjectConfig["elixirApi"]) : "none",
    elixirAuth:
      auth?.ecosystem === "elixir" ? (auth.toolId as ProjectConfig["elixirAuth"]) : "none",
  };
}

async function processGraphTemplates(
  vfs: VirtualFileSystem,
  templates: TemplateData,
  config: ProjectConfig,
): Promise<void> {
  await processBaseTemplate(vfs, templates, getGraphConfigForEcosystem(config, "typescript"));

  const tsConfig = getGraphConfigForEcosystem(config, "typescript");
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
      databasePart.targetPath ?? getRoleTargetPath("database") ?? "packages/database";
    if (
      dbConfig.orm !== "none" ||
      dbConfig.database === "edgedb" ||
      dbConfig.database === "redis"
    ) {
      await processDbTemplates(vfs, templates, dbConfig, databaseTargetPath);
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
    if (part.ecosystem === "rust") {
      await processRustBaseTemplate(
        vfs,
        templates,
        getGraphConfigForEcosystem(config, "rust"),
        targetPath,
      );
    }
    if (part.ecosystem === "python") {
      await processPythonBaseTemplate(
        vfs,
        templates,
        getGraphConfigForEcosystem(config, "python"),
        targetPath,
      );
    }
    if (part.ecosystem === "go") {
      await processGoBaseTemplate(
        vfs,
        templates,
        getGraphConfigForEcosystem(config, "go"),
        targetPath,
      );
    }
    if (part.ecosystem === "java") {
      await processJavaBaseTemplate(
        vfs,
        templates,
        getGraphConfigForEcosystem(config, "java"),
        targetPath,
      );
    }
    if (part.ecosystem === "elixir") {
      await processElixirBaseTemplate(
        vfs,
        templates,
        getGraphConfigForEcosystem(config, "elixir"),
        targetPath,
      );
    }
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
    } else if (config.ecosystem === "rust") {
      // Process base templates based on ecosystem
      // Rust ecosystem - use Cargo.toml and Rust project structure
      await processRustBaseTemplate(vfs, templates, config);
    } else if (config.ecosystem === "python") {
      // Python ecosystem - use pyproject.toml and Python project structure
      await processPythonBaseTemplate(vfs, templates, config);
    } else if (config.ecosystem === "go") {
      // Go ecosystem - use go.mod and Go project structure
      await processGoBaseTemplate(vfs, templates, config);
    } else if (config.ecosystem === "java") {
      // Java ecosystem - use Maven project structure
      await processJavaBaseTemplate(vfs, templates, config);
    } else if (config.ecosystem === "elixir") {
      // Elixir ecosystem - use Mix and Phoenix project structure
      await processElixirBaseTemplate(vfs, templates, config);
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
