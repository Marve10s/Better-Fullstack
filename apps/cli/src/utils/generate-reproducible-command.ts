import type { ProjectConfig, StackPartRole } from "../types";

import { formatStackPartSpec, getAddonStackPartBinding } from "../types";
import { hasGraphPart } from "./graph-summary";

function getBaseCommand(packageManager: ProjectConfig["packageManager"]) {
  switch (packageManager) {
    case "bun":
      return "bun create better-fullstack@latest";
    case "pnpm":
      return "pnpm create better-fullstack@latest";
    case "yarn":
      return "yarn create better-fullstack@latest";
    case "npm":
    default:
      return "npx create-better-fullstack@latest";
  }
}

function formatArrayFlag(flag: string, values: string[]) {
  const normalizedValues = values.filter((value) => value !== "none");

  if (normalizedValues.length === 0) {
    return `--${flag} none`;
  }

  return `--${flag} ${normalizedValues.join(" ")}`;
}

function appendCommonFlags(flags: string[], config: ProjectConfig) {
  if (config.aiDocs && config.aiDocs.length > 0) {
    flags.push(formatArrayFlag("ai-docs", config.aiDocs));
  } else {
    flags.push("--ai-docs none");
  }

  flags.push(config.git ? "--git" : "--no-git");
  flags.push(`--package-manager ${config.packageManager}`);
  if (config.versionChannel !== "stable") {
    flags.push(`--version-channel ${config.versionChannel}`);
  }
  flags.push(config.install ? "--install" : "--no-install");
}

function hasGraphPrimaryPart(
  config: ProjectConfig,
  role: "frontend" | "backend" | "mobile" | "database",
  ecosystem?: string,
) {
  return config.stackParts?.some(
    (part) =>
      part.source !== "provided" &&
      part.role === role &&
      !part.ownerPartId &&
      (!ecosystem || part.ecosystem === ecosystem),
  );
}

function hasOwnedGraphPart(
  config: ProjectConfig,
  ownerRole: "frontend" | "backend" | "mobile" | "database",
  role: StackPartRole,
  ecosystem?: string,
  toolId?: string,
) {
  const owner = config.stackParts?.find(
    (part) =>
      part.source !== "provided" &&
      part.role === ownerRole &&
      !part.ownerPartId &&
      (!ecosystem || part.ecosystem === ecosystem),
  );
  if (!owner) return false;

  return Boolean(
    config.stackParts?.some(
      (part) =>
        part.source !== "provided" &&
        part.role === role &&
        part.ownerPartId === owner.id &&
        (!ecosystem || part.ecosystem === ecosystem) &&
        (!toolId || part.toolId === toolId),
    ),
  );
}

function hasGraphAddonPart(config: ProjectConfig, addon: string) {
  const binding = getAddonStackPartBinding(addon);
  if (!binding) return false;

  if (!binding.ownerRole) {
    return Boolean(
      config.stackParts?.some(
        (part) =>
          part.source !== "provided" &&
          part.role === binding.role &&
          part.ecosystem === binding.ecosystem &&
          part.toolId === addon &&
          !part.ownerPartId,
      ),
    );
  }

  const owner = config.stackParts?.find(
    (part) =>
      part.source !== "provided" &&
      part.role === binding.ownerRole &&
      !part.ownerPartId &&
      part.ecosystem === binding.ecosystem,
  );
  if (!owner) return false;

  return Boolean(
    config.stackParts?.some(
      (part) =>
        part.source !== "provided" &&
        part.role === binding.role &&
        part.ecosystem === binding.ecosystem &&
        part.toolId === addon &&
        part.ownerPartId === owner.id,
    ),
  );
}

function hasGraphExamplePart(config: ProjectConfig, example: string) {
  return Boolean(
    config.stackParts?.some(
      (part) =>
        part.source !== "provided" &&
        part.role === "examples" &&
        part.ecosystem === "universal" &&
        part.toolId === example &&
        !part.ownerPartId,
    ),
  );
}

function hasGraphArrayParts(
  config: ProjectConfig,
  values: string[],
  hasPart: (config: ProjectConfig, value: string) => boolean,
) {
  const normalizedValues = values.filter((value) => value !== "none");
  return normalizedValues.length > 0 && normalizedValues.every((value) => hasPart(config, value));
}

function appendChangedStringFlag(
  flags: string[],
  flag: string,
  value: string,
  defaultValue: string,
) {
  if (value !== defaultValue) {
    flags.push(`--${flag} ${value}`);
  }
}

function appendChangedGraphStringFlag(
  flags: string[],
  config: ProjectConfig,
  role: StackPartRole,
  ecosystem: string,
  flag: string,
  value: string,
  defaultValue: string,
) {
  if (hasGraphPart(config, role, ecosystem)) return;
  appendChangedStringFlag(flags, flag, value, defaultValue);
}

function appendChangedOwnedGraphStringFlag(
  flags: string[],
  config: ProjectConfig,
  ownerRole: "frontend" | "backend" | "mobile" | "database",
  role: StackPartRole,
  ecosystem: string,
  flag: string,
  value: string,
  defaultValue: string,
) {
  if (hasOwnedGraphPart(config, ownerRole, role, ecosystem, value)) return;
  appendChangedStringFlag(flags, flag, value, defaultValue);
}

function hasOwnedGraphArrayParts(
  config: ProjectConfig,
  ownerRole: "frontend" | "backend" | "mobile" | "database",
  role: StackPartRole,
  ecosystem: string,
  values: string[],
) {
  const normalizedValues = values.filter((value) => value !== "none");
  if (normalizedValues.length === 0) return false;
  return normalizedValues.every((value) =>
    hasOwnedGraphPart(config, ownerRole, role, ecosystem, value),
  );
}

function appendChangedOwnedGraphArrayFlag(
  flags: string[],
  config: ProjectConfig,
  ownerRole: "frontend" | "backend" | "mobile" | "database",
  role: StackPartRole,
  ecosystem: string,
  flag: string,
  values: string[],
  defaultValues: string[],
) {
  if (hasOwnedGraphArrayParts(config, ownerRole, role, ecosystem, values)) return;
  appendChangedArrayFlag(flags, flag, values, defaultValues);
}

function appendChangedArrayFlag(
  flags: string[],
  flag: string,
  values: string[],
  defaultValues: string[],
) {
  if (
    values.length !== defaultValues.length ||
    values.some((value, index) => value !== defaultValues[index])
  ) {
    flags.push(formatArrayFlag(flag, values));
  }
}

function appendAstroIntegrationFlag(flags: string[], config: ProjectConfig) {
  if (config.frontend.includes("astro") && config.astroIntegration !== "none") {
    flags.push(`--astro-integration ${config.astroIntegration}`);
  }
}

function appendGraphExtraFlags(flags: string[], config: ProjectConfig) {
  if (!hasGraphArrayParts(config, config.addons, hasGraphAddonPart)) {
    appendChangedArrayFlag(flags, "addons", config.addons, ["turborepo"]);
  }
  if (!hasGraphArrayParts(config, config.examples, hasGraphExamplePart)) {
    appendChangedArrayFlag(flags, "examples", config.examples, []);
  }

  if (hasGraphPrimaryPart(config, "database")) {
    appendChangedOwnedGraphStringFlag(
      flags,
      config,
      "database",
      "dbSetup",
      "universal",
      "db-setup",
      config.dbSetup,
      "none",
    );
  } else {
    appendChangedStringFlag(flags, "db-setup", config.dbSetup, "none");
  }

  if (hasGraphPrimaryPart(config, "frontend", "typescript")) {
    appendAstroIntegrationFlag(flags, config);
    appendChangedOwnedGraphStringFlag(
      flags,
      config,
      "frontend",
      "deploy",
      "typescript",
      "web-deploy",
      config.webDeploy,
      "none",
    );
    appendChangedGraphStringFlag(
      flags,
      config,
      "css",
      "typescript",
      "css-framework",
      config.cssFramework,
      "tailwind",
    );
    appendChangedGraphStringFlag(
      flags,
      config,
      "ui",
      "typescript",
      "ui-library",
      config.uiLibrary,
      "shadcn-ui",
    );
    if (config.uiLibrary === "shadcn-ui") {
      appendChangedStringFlag(flags, "shadcn-base", config.shadcnBase ?? "radix", "radix");
      appendChangedStringFlag(flags, "shadcn-style", config.shadcnStyle ?? "nova", "nova");
      appendChangedStringFlag(
        flags,
        "shadcn-icon-library",
        config.shadcnIconLibrary ?? "lucide",
        "lucide",
      );
      appendChangedStringFlag(
        flags,
        "shadcn-color-theme",
        config.shadcnColorTheme ?? "neutral",
        "neutral",
      );
      appendChangedStringFlag(
        flags,
        "shadcn-base-color",
        config.shadcnBaseColor ?? "neutral",
        "neutral",
      );
      appendChangedStringFlag(flags, "shadcn-font", config.shadcnFont ?? "inter", "inter");
      appendChangedStringFlag(
        flags,
        "shadcn-radius",
        config.shadcnRadius ?? "default",
        "default",
      );
    }
    appendChangedGraphStringFlag(
      flags,
      config,
      "stateManagement",
      "typescript",
      "state-management",
      config.stateManagement,
      "none",
    );
    appendChangedGraphStringFlag(
      flags,
      config,
      "forms",
      "typescript",
      "forms",
      config.forms,
      "react-hook-form",
    );
    appendChangedStringFlag(flags, "validation", config.validation, "zod");
    appendChangedStringFlag(flags, "testing", config.testing, "vitest");
    appendChangedGraphStringFlag(
      flags,
      config,
      "animation",
      "typescript",
      "animation",
      config.animation,
      "none",
    );
    appendChangedGraphStringFlag(
      flags,
      config,
      "fileUpload",
      "typescript",
      "file-upload",
      config.fileUpload,
      "none",
    );
    appendChangedGraphStringFlag(flags, config, "i18n", "typescript", "i18n", config.i18n, "none");
    appendChangedGraphStringFlag(
      flags,
      config,
      "analytics",
      "typescript",
      "analytics",
      config.analytics,
      "none",
    );
  }

  if (
    hasGraphPrimaryPart(config, "frontend", "typescript") ||
    hasGraphPrimaryPart(config, "backend", "typescript")
  ) {
    if (hasGraphPrimaryPart(config, "backend", "typescript")) {
      appendChangedOwnedGraphStringFlag(
        flags,
        config,
        "backend",
        "runtime",
        "typescript",
        "runtime",
        config.runtime,
        "bun",
      );
      appendChangedOwnedGraphStringFlag(
        flags,
        config,
        "backend",
        "deploy",
        "typescript",
        "server-deploy",
        config.serverDeploy,
        "none",
      );
    } else {
      appendChangedStringFlag(flags, "server-deploy", config.serverDeploy, "none");
    }

    appendChangedGraphStringFlag(
      flags,
      config,
      "payments",
      "typescript",
      "payments",
      config.payments,
      "none",
    );
    appendChangedGraphStringFlag(
      flags,
      config,
      "email",
      "typescript",
      "email",
      config.email,
      "none",
    );
    appendChangedStringFlag(flags, "effect", config.effect, "none");
    appendChangedGraphStringFlag(flags, config, "ai", "typescript", "ai", config.ai, "none");
    appendChangedGraphStringFlag(
      flags,
      config,
      "realtime",
      "typescript",
      "realtime",
      config.realtime,
      "none",
    );
    appendChangedGraphStringFlag(
      flags,
      config,
      "jobQueue",
      "typescript",
      "job-queue",
      config.jobQueue,
      "none",
    );
    appendChangedGraphStringFlag(
      flags,
      config,
      "logging",
      "typescript",
      "logging",
      config.logging,
      "none",
    );
    appendChangedGraphStringFlag(
      flags,
      config,
      "observability",
      "typescript",
      "observability",
      config.observability,
      "none",
    );
    appendChangedGraphStringFlag(
      flags,
      config,
      "featureFlags",
      "typescript",
      "feature-flags",
      config.featureFlags,
      "none",
    );
    appendChangedGraphStringFlag(
      flags,
      config,
      "caching",
      "typescript",
      "caching",
      config.caching,
      "none",
    );
    appendChangedGraphStringFlag(
      flags,
      config,
      "rateLimit",
      "typescript",
      "rate-limit",
      config.rateLimit,
      "none",
    );
    appendChangedGraphStringFlag(flags, config, "cms", "typescript", "cms", config.cms, "none");
    appendChangedGraphStringFlag(flags, config, "search", "typescript", "search", config.search, "none");
    appendChangedGraphStringFlag(
      flags,
      config,
      "vectorDb",
      "typescript",
      "vectorDb",
      config.vectorDb,
      "none",
    );
    appendChangedGraphStringFlag(
      flags,
      config,
      "fileStorage",
      "typescript",
      "file-storage",
      config.fileStorage,
      "none",
    );
  }

  if (hasGraphPrimaryPart(config, "mobile")) {
    appendChangedOwnedGraphStringFlag(
      flags,
      config,
      "mobile",
      "navigation",
      "react-native",
      "mobile-navigation",
      config.mobileNavigation,
      "expo-router",
    );
    appendChangedOwnedGraphStringFlag(
      flags,
      config,
      "mobile",
      "ui",
      "react-native",
      "mobile-ui",
      config.mobileUI,
      "none",
    );
    appendChangedOwnedGraphStringFlag(
      flags,
      config,
      "mobile",
      "storage",
      "react-native",
      "mobile-storage",
      config.mobileStorage,
      "none",
    );
    appendChangedOwnedGraphStringFlag(
      flags,
      config,
      "mobile",
      "testing",
      "react-native",
      "mobile-testing",
      config.mobileTesting,
      "none",
    );
    appendChangedStringFlag(flags, "mobile-push", config.mobilePush, "none");
    appendChangedStringFlag(flags, "mobile-ota", config.mobileOTA, "none");
    appendChangedStringFlag(flags, "mobile-deep-linking", config.mobileDeepLinking, "none");
  }

  if (hasGraphPrimaryPart(config, "frontend", "rust")) {
    appendChangedStringFlag(flags, "rust-frontend", config.rustFrontend, "none");
  }
  if (hasGraphPrimaryPart(config, "backend", "rust")) {
    appendChangedOwnedGraphStringFlag(
      flags,
      config,
      "backend",
      "cli",
      "rust",
      "rust-cli",
      config.rustCli,
      "none",
    );
    appendChangedOwnedGraphArrayFlag(
      flags,
      config,
      "backend",
      "libraries",
      "rust",
      "rust-libraries",
      config.rustLibraries,
      [],
    );
    appendChangedOwnedGraphStringFlag(
      flags,
      config,
      "backend",
      "logging",
      "rust",
      "rust-logging",
      config.rustLogging,
      "tracing",
    );
    appendChangedOwnedGraphStringFlag(
      flags,
      config,
      "backend",
      "errorHandling",
      "rust",
      "rust-error-handling",
      config.rustErrorHandling,
      "anyhow-thiserror",
    );
    appendChangedOwnedGraphStringFlag(
      flags,
      config,
      "backend",
      "caching",
      "rust",
      "rust-caching",
      config.rustCaching,
      "none",
    );
  }
  if (hasGraphPrimaryPart(config, "backend", "python")) {
    appendChangedOwnedGraphStringFlag(
      flags,
      config,
      "backend",
      "validation",
      "python",
      "python-validation",
      config.pythonValidation,
      "none",
    );
    appendChangedOwnedGraphArrayFlag(
      flags,
      config,
      "backend",
      "ai",
      "python",
      "python-ai",
      config.pythonAi,
      [],
    );
    appendChangedOwnedGraphStringFlag(
      flags,
      config,
      "backend",
      "jobQueue",
      "python",
      "python-task-queue",
      config.pythonTaskQueue,
      "none",
    );
    appendChangedOwnedGraphStringFlag(
      flags,
      config,
      "backend",
      "api",
      "python",
      "python-graphql",
      config.pythonGraphql,
      "none",
    );
    appendChangedOwnedGraphStringFlag(
      flags,
      config,
      "backend",
      "codeQuality",
      "python",
      "python-quality",
      config.pythonQuality,
      "none",
    );
  }
  if (hasGraphPrimaryPart(config, "backend", "go")) {
    appendChangedOwnedGraphStringFlag(
      flags,
      config,
      "backend",
      "cli",
      "go",
      "go-cli",
      config.goCli,
      "none",
    );
    appendChangedOwnedGraphStringFlag(
      flags,
      config,
      "backend",
      "logging",
      "go",
      "go-logging",
      config.goLogging,
      "none",
    );
  }
  if (hasGraphPrimaryPart(config, "backend", "java")) {
    appendChangedOwnedGraphStringFlag(
      flags,
      config,
      "backend",
      "buildTool",
      "java",
      "java-build-tool",
      config.javaBuildTool,
      "maven",
    );
    appendChangedOwnedGraphArrayFlag(
      flags,
      config,
      "backend",
      "libraries",
      "java",
      "java-libraries",
      config.javaLibraries,
      [],
    );
    appendChangedOwnedGraphArrayFlag(
      flags,
      config,
      "backend",
      "testing",
      "java",
      "java-testing-libraries",
      config.javaTestingLibraries,
      ["junit5"],
    );
  }
  if (hasGraphPrimaryPart(config, "backend", "elixir")) {
    appendChangedGraphStringFlag(
      flags,
      config,
      "realtime",
      "elixir",
      "elixir-realtime",
      config.elixirRealtime,
      "channels",
    );
    appendChangedGraphStringFlag(
      flags,
      config,
      "jobQueue",
      "elixir",
      "elixir-jobs",
      config.elixirJobs,
      "none",
    );
    appendChangedGraphStringFlag(
      flags,
      config,
      "validation",
      "elixir",
      "elixir-validation",
      config.elixirValidation,
      "ecto-changesets",
    );
    appendChangedOwnedGraphStringFlag(
      flags,
      config,
      "backend",
      "httpClient",
      "elixir",
      "elixir-http",
      config.elixirHttp,
      "req",
    );
    appendChangedStringFlag(flags, "elixir-json", config.elixirJson, "jason");
    appendChangedGraphStringFlag(
      flags,
      config,
      "email",
      "elixir",
      "elixir-email",
      config.elixirEmail,
      "none",
    );
    appendChangedGraphStringFlag(
      flags,
      config,
      "caching",
      "elixir",
      "elixir-caching",
      config.elixirCaching,
      "none",
    );
    appendChangedGraphStringFlag(
      flags,
      config,
      "observability",
      "elixir",
      "elixir-observability",
      config.elixirObservability,
      "telemetry",
    );
    appendChangedGraphStringFlag(
      flags,
      config,
      "testing",
      "elixir",
      "elixir-testing",
      config.elixirTesting,
      "ex_unit",
    );
    appendChangedOwnedGraphStringFlag(
      flags,
      config,
      "backend",
      "codeQuality",
      "elixir",
      "elixir-quality",
      config.elixirQuality,
      "credo",
    );
    appendChangedGraphStringFlag(
      flags,
      config,
      "deploy",
      "elixir",
      "elixir-deploy",
      config.elixirDeploy,
      "none",
    );
  }
}

function appendSharedNonTypeScriptFlags(flags: string[], config: ProjectConfig) {
  flags.push(`--email ${config.email}`);
  flags.push(`--observability ${config.observability}`);
  flags.push(`--caching ${config.caching}`);
  flags.push(`--search ${config.search}`);
  flags.push(formatArrayFlag("addons", config.addons));
  flags.push(formatArrayFlag("examples", config.examples));
  flags.push(`--db-setup ${config.dbSetup}`);
  flags.push(`--web-deploy ${config.webDeploy}`);
  flags.push(`--server-deploy ${config.serverDeploy}`);
}

function getTypeScriptFlags(config: ProjectConfig) {
  const flags: string[] = [];

  if (config.frontend && config.frontend.length > 0) {
    flags.push(`--frontend ${config.frontend.join(" ")}`);
  } else {
    flags.push("--frontend none");
  }
  appendAstroIntegrationFlag(flags, config);

  flags.push(`--backend ${config.backend}`);
  flags.push(`--runtime ${config.runtime}`);
  flags.push(`--database ${config.database}`);
  flags.push(`--orm ${config.orm}`);
  flags.push(`--api ${config.api}`);
  flags.push(`--auth ${config.auth}`);
  flags.push(`--payments ${config.payments}`);
  flags.push(`--email ${config.email}`);
  flags.push(`--file-upload ${config.fileUpload}`);
  flags.push(`--effect ${config.effect}`);
  flags.push(`--css-framework ${config.cssFramework}`);
  flags.push(`--ui-library ${config.uiLibrary}`);
  if (config.uiLibrary === "shadcn-ui") {
    flags.push(`--shadcn-base ${config.shadcnBase}`);
    flags.push(`--shadcn-style ${config.shadcnStyle}`);
    flags.push(`--shadcn-icon-library ${config.shadcnIconLibrary}`);
    flags.push(`--shadcn-color-theme ${config.shadcnColorTheme}`);
    flags.push(`--shadcn-base-color ${config.shadcnBaseColor}`);
    flags.push(`--shadcn-font ${config.shadcnFont}`);
    flags.push(`--shadcn-radius ${config.shadcnRadius}`);
  }
  flags.push(`--ai ${config.ai}`);
  flags.push(`--state-management ${config.stateManagement}`);
  flags.push(`--forms ${config.forms}`);
  flags.push(`--validation ${config.validation}`);
  flags.push(`--testing ${config.testing}`);
  flags.push(`--animation ${config.animation}`);
  flags.push(`--realtime ${config.realtime}`);
  flags.push(`--job-queue ${config.jobQueue}`);
  flags.push(`--logging ${config.logging}`);
  flags.push(`--observability ${config.observability}`);
  flags.push(`--feature-flags ${config.featureFlags}`);
  flags.push(`--caching ${config.caching}`);
  flags.push(`--rate-limit ${config.rateLimit}`);
  flags.push(`--i18n ${config.i18n}`);
  flags.push(`--cms ${config.cms}`);
  flags.push(`--search ${config.search}`);
  flags.push(`--vector-db ${config.vectorDb}`);
  flags.push(`--file-storage ${config.fileStorage}`);
  flags.push(`--mobile-navigation ${config.mobileNavigation}`);
  flags.push(`--mobile-ui ${config.mobileUI}`);
  flags.push(`--mobile-storage ${config.mobileStorage}`);
  flags.push(`--mobile-testing ${config.mobileTesting}`);
  flags.push(`--mobile-push ${config.mobilePush}`);
  flags.push(`--mobile-ota ${config.mobileOTA}`);
  flags.push(`--mobile-deep-linking ${config.mobileDeepLinking}`);

  if (config.addons && config.addons.length > 0) {
    flags.push(`--addons ${config.addons.join(" ")}`);
  } else {
    flags.push("--addons none");
  }

  if (config.examples && config.examples.length > 0) {
    flags.push(`--examples ${config.examples.join(" ")}`);
  } else {
    flags.push("--examples none");
  }

  flags.push(`--db-setup ${config.dbSetup}`);
  flags.push(`--web-deploy ${config.webDeploy}`);
  flags.push(`--server-deploy ${config.serverDeploy}`);

  appendCommonFlags(flags, config);

  return flags;
}

function getReactNativeFlags(config: ProjectConfig) {
  const flags = ["--ecosystem react-native"];

  if (config.frontend && config.frontend.length > 0) {
    flags.push(`--frontend ${config.frontend.join(" ")}`);
  } else {
    flags.push("--frontend native-bare");
  }

  flags.push(`--auth ${config.auth}`);
  flags.push(`--mobile-navigation ${config.mobileNavigation}`);
  flags.push(`--mobile-ui ${config.mobileUI}`);
  flags.push(`--mobile-storage ${config.mobileStorage}`);
  flags.push(`--mobile-testing ${config.mobileTesting}`);
  flags.push(`--mobile-push ${config.mobilePush}`);
  flags.push(`--mobile-ota ${config.mobileOTA}`);
  flags.push(`--mobile-deep-linking ${config.mobileDeepLinking}`);

  appendCommonFlags(flags, config);

  return flags;
}

function getRustFlags(config: ProjectConfig) {
  const flags = ["--ecosystem rust"];

  flags.push(`--rust-web-framework ${config.rustWebFramework}`);
  flags.push(`--rust-frontend ${config.rustFrontend}`);
  flags.push(`--rust-orm ${config.rustOrm}`);
  flags.push(`--rust-api ${config.rustApi}`);
  flags.push(`--rust-cli ${config.rustCli}`);
  flags.push(formatArrayFlag("rust-libraries", config.rustLibraries));
  flags.push(`--rust-logging ${config.rustLogging}`);
  flags.push(`--rust-error-handling ${config.rustErrorHandling}`);
  flags.push(`--rust-caching ${config.rustCaching}`);
  flags.push(`--rust-auth ${config.rustAuth}`);
  flags.push(`--rust-realtime ${config.rustRealtime}`);
  flags.push(`--rust-message-queue ${config.rustMessageQueue}`);
  flags.push(`--rust-observability ${config.rustObservability}`);
  flags.push(`--rust-templating ${config.rustTemplating}`);
  appendSharedNonTypeScriptFlags(flags, config);

  appendCommonFlags(flags, config);

  return flags;
}

function getPythonFlags(config: ProjectConfig) {
  const flags = ["--ecosystem python"];

  flags.push(`--python-web-framework ${config.pythonWebFramework}`);
  flags.push(`--python-orm ${config.pythonOrm}`);
  flags.push(`--python-validation ${config.pythonValidation}`);
  flags.push(formatArrayFlag("python-ai", config.pythonAi));
  flags.push(`--python-auth ${config.pythonAuth}`);
  flags.push(`--python-api ${config.pythonApi}`);
  flags.push(`--python-task-queue ${config.pythonTaskQueue}`);
  flags.push(`--python-graphql ${config.pythonGraphql}`);
  flags.push(`--python-quality ${config.pythonQuality}`);
  flags.push(formatArrayFlag("python-testing", config.pythonTesting));
  flags.push(`--python-caching ${config.pythonCaching}`);
  flags.push(`--python-realtime ${config.pythonRealtime}`);
  flags.push(`--python-observability ${config.pythonObservability}`);
  flags.push(formatArrayFlag("python-cli", config.pythonCli));
  appendSharedNonTypeScriptFlags(flags, config);

  appendCommonFlags(flags, config);

  return flags;
}

function getGoFlags(config: ProjectConfig) {
  const flags = ["--ecosystem go"];

  flags.push(`--go-web-framework ${config.goWebFramework}`);
  flags.push(`--go-orm ${config.goOrm}`);
  flags.push(`--go-api ${config.goApi}`);
  flags.push(`--go-cli ${config.goCli}`);
  flags.push(`--go-logging ${config.goLogging}`);
  flags.push(`--go-auth ${config.goAuth}`);
  flags.push(formatArrayFlag("go-testing", config.goTesting));
  flags.push(`--go-realtime ${config.goRealtime}`);
  flags.push(`--go-message-queue ${config.goMessageQueue}`);
  flags.push(`--go-caching ${config.goCaching}`);
  flags.push(`--go-config ${config.goConfig}`);
  flags.push(`--go-observability ${config.goObservability}`);
  flags.push(`--auth ${config.auth}`);
  appendSharedNonTypeScriptFlags(flags, config);

  appendCommonFlags(flags, config);

  return flags;
}

function getJavaFlags(config: ProjectConfig) {
  const flags = ["--ecosystem java"];

  flags.push(`--java-web-framework ${config.javaWebFramework}`);
  flags.push(`--java-build-tool ${config.javaBuildTool}`);
  flags.push(`--java-orm ${config.javaOrm}`);
  flags.push(`--java-auth ${config.javaAuth}`);
  flags.push(`--java-api ${config.javaApi}`);
  flags.push(`--java-logging ${config.javaLogging}`);
  flags.push(formatArrayFlag("java-libraries", config.javaLibraries));
  flags.push(formatArrayFlag("java-testing-libraries", config.javaTestingLibraries));
  appendSharedNonTypeScriptFlags(flags, config);

  appendCommonFlags(flags, config);

  return flags;
}

function getDotnetFlags(config: ProjectConfig) {
  const flags = ["--ecosystem dotnet"];

  flags.push(`--dotnet-web-framework ${config.dotnetWebFramework}`);
  flags.push(`--dotnet-orm ${config.dotnetOrm}`);
  flags.push(`--dotnet-auth ${config.dotnetAuth}`);
  flags.push(`--dotnet-api ${config.dotnetApi}`);
  flags.push(formatArrayFlag("dotnet-testing", config.dotnetTesting));
  flags.push(`--dotnet-job-queue ${config.dotnetJobQueue}`);
  flags.push(`--dotnet-realtime ${config.dotnetRealtime}`);
  flags.push(formatArrayFlag("dotnet-observability", config.dotnetObservability));
  flags.push(`--dotnet-validation ${config.dotnetValidation}`);
  flags.push(`--dotnet-caching ${config.dotnetCaching}`);
  flags.push(`--dotnet-deploy ${config.dotnetDeploy}`);

  appendCommonFlags(flags, config);

  return flags;
}

function getElixirFlags(config: ProjectConfig) {
  const flags = ["--ecosystem elixir"];

  flags.push(`--elixir-web-framework ${config.elixirWebFramework}`);
  flags.push(`--elixir-orm ${config.elixirOrm}`);
  flags.push(`--elixir-auth ${config.elixirAuth}`);
  flags.push(`--elixir-api ${config.elixirApi}`);
  flags.push(`--elixir-realtime ${config.elixirRealtime}`);
  flags.push(`--elixir-jobs ${config.elixirJobs}`);
  flags.push(`--elixir-validation ${config.elixirValidation}`);
  flags.push(`--elixir-http ${config.elixirHttp}`);
  flags.push(`--elixir-json ${config.elixirJson}`);
  flags.push(`--elixir-email ${config.elixirEmail}`);
  flags.push(`--elixir-caching ${config.elixirCaching}`);
  flags.push(`--elixir-observability ${config.elixirObservability}`);
  flags.push(`--elixir-testing ${config.elixirTesting}`);
  flags.push(`--elixir-quality ${config.elixirQuality}`);
  flags.push(`--elixir-deploy ${config.elixirDeploy}`);
  flags.push(formatArrayFlag("elixir-libraries", config.elixirLibraries));

  appendCommonFlags(flags, config);

  return flags;
}

export function generateReproducibleCommand(config: ProjectConfig) {
  let flags: string[];

  if (config.stackParts && config.stackParts.length > 0) {
    flags = config.stackParts
      .filter((part) => part.source !== "provided")
      .map((part) => `--part ${formatStackPartSpec(part, config.stackParts ?? [])}`);
    appendGraphExtraFlags(flags, config);
    appendCommonFlags(flags, config);
    const baseCommand = getBaseCommand(config.packageManager);
    const projectPathArg = config.relativePath ? ` ${config.relativePath}` : "";
    return `${baseCommand}${projectPathArg} ${flags.join(" ")}`;
  }

  switch (config.ecosystem) {
    case "react-native":
      flags = getReactNativeFlags(config);
      break;
    case "rust":
      flags = getRustFlags(config);
      break;
    case "python":
      flags = getPythonFlags(config);
      break;
    case "go":
      flags = getGoFlags(config);
      break;
    case "java":
      flags = getJavaFlags(config);
      break;
    case "dotnet":
      flags = getDotnetFlags(config);
      break;
    case "elixir":
      flags = getElixirFlags(config);
      break;
    case "typescript":
    default:
      flags = getTypeScriptFlags(config);
      break;
  }

  const baseCommand = getBaseCommand(config.packageManager);
  const projectPathArg = config.relativePath ? ` ${config.relativePath}` : "";

  return `${baseCommand}${projectPathArg} ${flags.join(" ")}`;
}
