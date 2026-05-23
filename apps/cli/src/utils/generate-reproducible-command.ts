import type { ProjectConfig } from "../types";

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
  flags.push(`--i18n ${config.i18n}`);
  flags.push(`--cms ${config.cms}`);
  flags.push(`--search ${config.search}`);
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
  flags.push(formatArrayFlag("java-libraries", config.javaLibraries));
  flags.push(formatArrayFlag("java-testing-libraries", config.javaTestingLibraries));
  appendSharedNonTypeScriptFlags(flags, config);

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

  appendCommonFlags(flags, config);

  return flags;
}

export function generateReproducibleCommand(config: ProjectConfig) {
  let flags: string[];

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
