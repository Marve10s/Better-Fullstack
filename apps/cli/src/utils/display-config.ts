import pc from "picocolors";
import { formatStackPartSpec } from "@better-fullstack/types";

import type { ProjectConfig } from "../types";

function getSelectedGraphPart(
  config: Partial<ProjectConfig>,
  role: string,
  ownerPartId?: string,
) {
  return config.stackParts?.find(
    (part) =>
      part.role === role &&
      part.ownerPartId === ownerPartId &&
      part.source !== "provided",
  );
}

function getGraphDisplayValue(config: Partial<ProjectConfig>, role: string): string | null {
  const primaryBackend = getSelectedGraphPart(config, "backend");
  const part =
    role === "backend"
      ? primaryBackend
      : getSelectedGraphPart(config, role, primaryBackend?.id) ??
        getSelectedGraphPart(config, role);

  if (!part) return null;
  return `${part.ecosystem}:${part.toolId}`;
}

export function displayConfig(config: Partial<ProjectConfig>) {
  const configDisplay: string[] = [];

  if (config.projectName) {
    configDisplay.push(`${pc.blue("Project Name:")} ${config.projectName}`);
  }

  if (config.frontend !== undefined) {
    const frontend = Array.isArray(config.frontend) ? config.frontend : [config.frontend];
    const frontendText =
      frontend.length > 0 && frontend[0] !== undefined ? frontend.join(", ") : "none";
    configDisplay.push(`${pc.blue("Frontend:")} ${frontendText}`);
  }

  if (config.uiLibrary !== undefined) {
    configDisplay.push(`${pc.blue("UI Library:")} ${String(config.uiLibrary)}`);
  }

  if (config.cssFramework !== undefined) {
    configDisplay.push(`${pc.blue("CSS Framework:")} ${String(config.cssFramework)}`);
  }

  if (config.backend !== undefined) {
    const graphBackend =
      config.backend === "none" ? getGraphDisplayValue(config, "backend") : null;
    configDisplay.push(`${pc.blue("Backend:")} ${graphBackend ?? String(config.backend)}`);
  }

  if (config.runtime !== undefined) {
    configDisplay.push(`${pc.blue("Runtime:")} ${String(config.runtime)}`);
  }

  if (config.api !== undefined) {
    const graphApi = config.api === "none" ? getGraphDisplayValue(config, "api") : null;
    configDisplay.push(`${pc.blue("API:")} ${graphApi ?? String(config.api)}`);
  }

  if (config.database !== undefined) {
    configDisplay.push(`${pc.blue("Database:")} ${String(config.database)}`);
  }

  if (config.orm !== undefined) {
    const graphOrm = config.orm === "none" ? getGraphDisplayValue(config, "orm") : null;
    configDisplay.push(`${pc.blue("ORM:")} ${graphOrm ?? String(config.orm)}`);
  }

  if (config.auth !== undefined) {
    configDisplay.push(`${pc.blue("Auth:")} ${String(config.auth)}`);
  }

  if (config.payments !== undefined) {
    configDisplay.push(`${pc.blue("Payments:")} ${String(config.payments)}`);
  }

  if (config.email !== undefined) {
    const graphEmail = config.email === "none" ? getGraphDisplayValue(config, "email") : null;
    configDisplay.push(`${pc.blue("Email:")} ${graphEmail ?? String(config.email)}`);
  }

  if (config.fileUpload !== undefined) {
    configDisplay.push(`${pc.blue("File Upload:")} ${String(config.fileUpload)}`);
  }

  if (config.effect !== undefined) {
    configDisplay.push(`${pc.blue("Effect:")} ${String(config.effect)}`);
  }

  if (config.ai !== undefined) {
    configDisplay.push(`${pc.blue("AI:")} ${String(config.ai)}`);
  }

  if (config.stateManagement !== undefined) {
    configDisplay.push(`${pc.blue("State Management:")} ${String(config.stateManagement)}`);
  }

  if (config.forms !== undefined) {
    configDisplay.push(`${pc.blue("Forms:")} ${String(config.forms)}`);
  }

  if (config.validation !== undefined) {
    configDisplay.push(`${pc.blue("Validation:")} ${String(config.validation)}`);
  }

  if (config.testing !== undefined) {
    configDisplay.push(`${pc.blue("Testing:")} ${String(config.testing)}`);
  }

  if (config.animation !== undefined) {
    configDisplay.push(`${pc.blue("Animation:")} ${String(config.animation)}`);
  }

  if (config.realtime !== undefined) {
    configDisplay.push(`${pc.blue("Realtime:")} ${String(config.realtime)}`);
  }

  if (config.jobQueue !== undefined) {
    configDisplay.push(`${pc.blue("Job Queue:")} ${String(config.jobQueue)}`);
  }

  if (config.logging !== undefined) {
    configDisplay.push(`${pc.blue("Logging:")} ${String(config.logging)}`);
  }

  const graphBackendPart = getSelectedGraphPart(config, "backend");
  if (graphBackendPart?.ecosystem === "go") {
    if (config.goCli && config.goCli !== "none") {
      configDisplay.push(`${pc.blue("Go CLI:")} ${String(config.goCli)}`);
    }
    if (config.goLogging && config.goLogging !== "none") {
      configDisplay.push(`${pc.blue("Go Logging:")} ${String(config.goLogging)}`);
    }
  }

  if (graphBackendPart?.ecosystem === "rust") {
    if (config.rustCli && config.rustCli !== "none") {
      configDisplay.push(`${pc.blue("Rust CLI:")} ${String(config.rustCli)}`);
    }
    if (config.rustLibraries && config.rustLibraries.length > 0) {
      configDisplay.push(`${pc.blue("Rust Libraries:")} ${config.rustLibraries.join(", ")}`);
    }
    if (config.rustLogging && config.rustLogging !== "none") {
      configDisplay.push(`${pc.blue("Rust Logging:")} ${String(config.rustLogging)}`);
    }
    if (config.rustErrorHandling && config.rustErrorHandling !== "none") {
      configDisplay.push(`${pc.blue("Rust Error Handling:")} ${String(config.rustErrorHandling)}`);
    }
    if (config.rustCaching && config.rustCaching !== "none") {
      configDisplay.push(`${pc.blue("Rust Caching:")} ${String(config.rustCaching)}`);
    }
  }

  if (graphBackendPart?.ecosystem === "python") {
    if (config.pythonValidation && config.pythonValidation !== "none") {
      configDisplay.push(`${pc.blue("Python Validation:")} ${String(config.pythonValidation)}`);
    }
    if (config.pythonAi && config.pythonAi.length > 0) {
      configDisplay.push(`${pc.blue("Python AI:")} ${config.pythonAi.join(", ")}`);
    }
    if (config.pythonTaskQueue && config.pythonTaskQueue !== "none") {
      configDisplay.push(`${pc.blue("Python Task Queue:")} ${String(config.pythonTaskQueue)}`);
    }
    if (config.pythonGraphql && config.pythonGraphql !== "none") {
      configDisplay.push(`${pc.blue("Python GraphQL:")} ${String(config.pythonGraphql)}`);
    }
    if (config.pythonQuality && config.pythonQuality !== "none") {
      configDisplay.push(`${pc.blue("Python Quality:")} ${String(config.pythonQuality)}`);
    }
  }

  if (graphBackendPart?.ecosystem === "java") {
    if (config.javaBuildTool && config.javaBuildTool !== "none") {
      configDisplay.push(`${pc.blue("Java Build Tool:")} ${String(config.javaBuildTool)}`);
    }
    if (config.javaLibraries && config.javaLibraries.length > 0) {
      configDisplay.push(`${pc.blue("Java Libraries:")} ${config.javaLibraries.join(", ")}`);
    }
    if (config.javaTestingLibraries && config.javaTestingLibraries.length > 0) {
      configDisplay.push(
        `${pc.blue("Java Testing Libraries:")} ${config.javaTestingLibraries.join(", ")}`,
      );
    }
  }

  if (graphBackendPart?.ecosystem === "elixir") {
    if (config.elixirRealtime && config.elixirRealtime !== "none") {
      configDisplay.push(`${pc.blue("Elixir Realtime:")} ${String(config.elixirRealtime)}`);
    }
    if (config.elixirJobs && config.elixirJobs !== "none") {
      configDisplay.push(`${pc.blue("Elixir Jobs:")} ${String(config.elixirJobs)}`);
    }
    if (config.elixirValidation && config.elixirValidation !== "none") {
      configDisplay.push(`${pc.blue("Elixir Validation:")} ${String(config.elixirValidation)}`);
    }
    if (config.elixirHttp && config.elixirHttp !== "none") {
      configDisplay.push(`${pc.blue("Elixir HTTP:")} ${String(config.elixirHttp)}`);
    }
    if (config.elixirJson && config.elixirJson !== "none") {
      configDisplay.push(`${pc.blue("Elixir JSON:")} ${String(config.elixirJson)}`);
    }
    if (config.elixirCaching && config.elixirCaching !== "none") {
      configDisplay.push(`${pc.blue("Elixir Caching:")} ${String(config.elixirCaching)}`);
    }
    if (config.elixirObservability && config.elixirObservability !== "none") {
      configDisplay.push(
        `${pc.blue("Elixir Observability:")} ${String(config.elixirObservability)}`,
      );
    }
    if (config.elixirTesting && config.elixirTesting !== "none") {
      configDisplay.push(`${pc.blue("Elixir Testing:")} ${String(config.elixirTesting)}`);
    }
    if (config.elixirQuality && config.elixirQuality !== "none") {
      configDisplay.push(`${pc.blue("Elixir Quality:")} ${String(config.elixirQuality)}`);
    }
    if (config.elixirDeploy && config.elixirDeploy !== "none") {
      configDisplay.push(`${pc.blue("Elixir Deploy:")} ${String(config.elixirDeploy)}`);
    }
  }

  if (config.observability !== undefined) {
    configDisplay.push(`${pc.blue("Observability:")} ${String(config.observability)}`);
  }

  if (config.featureFlags !== undefined) {
    configDisplay.push(`${pc.blue("Feature Flags:")} ${String(config.featureFlags)}`);
  }

  if (config.analytics !== undefined) {
    configDisplay.push(`${pc.blue("Analytics:")} ${String(config.analytics)}`);
  }

  if (config.mobileNavigation !== undefined) {
    configDisplay.push(`${pc.blue("Mobile Navigation:")} ${String(config.mobileNavigation)}`);
  }

  if (config.mobileUI !== undefined) {
    configDisplay.push(`${pc.blue("Mobile UI:")} ${String(config.mobileUI)}`);
  }

  if (config.mobileStorage !== undefined) {
    configDisplay.push(`${pc.blue("Mobile Storage:")} ${String(config.mobileStorage)}`);
  }

  if (config.mobileTesting !== undefined) {
    configDisplay.push(`${pc.blue("Mobile Testing:")} ${String(config.mobileTesting)}`);
  }

  if (config.mobilePush !== undefined) {
    configDisplay.push(`${pc.blue("Mobile Push:")} ${String(config.mobilePush)}`);
  }

  if (config.mobileOTA !== undefined) {
    configDisplay.push(`${pc.blue("Mobile OTA:")} ${String(config.mobileOTA)}`);
  }

  if (config.mobileDeepLinking !== undefined) {
    configDisplay.push(`${pc.blue("Mobile Deep Linking:")} ${String(config.mobileDeepLinking)}`);
  }

  if (config.caching !== undefined) {
    configDisplay.push(`${pc.blue("Caching:")} ${String(config.caching)}`);
  }

  if (config.i18n !== undefined) {
    configDisplay.push(`${pc.blue("i18n:")} ${String(config.i18n)}`);
  }

  if (config.cms !== undefined) {
    configDisplay.push(`${pc.blue("CMS:")} ${String(config.cms)}`);
  }

  if (config.search !== undefined) {
    configDisplay.push(`${pc.blue("Search:")} ${String(config.search)}`);
  }

  if (config.fileStorage !== undefined) {
    configDisplay.push(`${pc.blue("File Storage:")} ${String(config.fileStorage)}`);
  }

  if (config.addons !== undefined) {
    const addons = Array.isArray(config.addons) ? config.addons : [config.addons];
    const addonsText = addons.length > 0 && addons[0] !== undefined ? addons.join(", ") : "none";
    configDisplay.push(`${pc.blue("Addons:")} ${addonsText}`);
  }

  if (config.examples !== undefined) {
    const examples = Array.isArray(config.examples) ? config.examples : [config.examples];
    const examplesText =
      examples.length > 0 && examples[0] !== undefined ? examples.join(", ") : "none";
    configDisplay.push(`${pc.blue("Examples:")} ${examplesText}`);
  }

  if (config.aiDocs !== undefined) {
    const aiDocs = Array.isArray(config.aiDocs) ? config.aiDocs : [config.aiDocs];
    const aiDocsText = aiDocs.length > 0 && aiDocs[0] !== undefined ? aiDocs.join(", ") : "none";
    configDisplay.push(`${pc.blue("AI Docs:")} ${aiDocsText}`);
  }

  if (config.git !== undefined) {
    const gitText =
      typeof config.git === "boolean" ? (config.git ? "Yes" : "No") : String(config.git);
    configDisplay.push(`${pc.blue("Git Init:")} ${gitText}`);
  }

  if (config.packageManager !== undefined) {
    configDisplay.push(`${pc.blue("Package Manager:")} ${String(config.packageManager)}`);
  }

  if (config.versionChannel !== undefined) {
    configDisplay.push(`${pc.blue("Version Channel:")} ${String(config.versionChannel)}`);
  }

  if (config.install !== undefined) {
    const installText =
      typeof config.install === "boolean"
        ? config.install
          ? "Yes"
          : "No"
        : String(config.install);
    configDisplay.push(`${pc.blue("Install Dependencies:")} ${installText}`);
  }

  if (config.dbSetup !== undefined) {
    configDisplay.push(`${pc.blue("Database Setup:")} ${String(config.dbSetup)}`);
  }

  if (config.webDeploy !== undefined) {
    configDisplay.push(`${pc.blue("Web Deployment:")} ${String(config.webDeploy)}`);
  }

  if (config.serverDeploy !== undefined) {
    configDisplay.push(`${pc.blue("Server Deployment:")} ${String(config.serverDeploy)}`);
  }

  if (config.stackParts?.length) {
    const stackParts = config.stackParts
      .filter((part) => part.source !== "provided")
      .map((part) => formatStackPartSpec(part, config.stackParts ?? []));
    if (stackParts.length > 0) {
      configDisplay.push(`${pc.blue("Stack Parts:")} ${stackParts.join(", ")}`);
    }
  }

  if (configDisplay.length === 0) {
    return pc.yellow("No configuration selected.");
  }

  return configDisplay.join("\n");
}
