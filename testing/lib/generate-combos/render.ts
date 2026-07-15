import type { ProjectConfig } from "@better-fullstack/types";

import type { TemplateFingerprint } from "./types";

import { fingerprintToKey } from "./fingerprint";

// Phoenix derives test database names by appending `_test`. Keep generated
// project names within PostgreSQL's 63-byte identifier limit after that suffix.
const MAX_SMOKE_PROJECT_NAME_LENGTH = 58;

function withExplicitNone(values: readonly string[]): string[] {
  return values.length === 0 ? ["none"] : [...values];
}

function renderFlag(flag: string, value: string | readonly string[]): string {
  const formatted = Array.isArray(value) ? value.join(" ") : value;
  return `--${flag} ${formatted}`;
}

function withExplicitScalar(value: string | undefined, fallback = "none"): string {
  return value ?? fallback;
}

export function formatNameFromFingerprint(fingerprint: TemplateFingerprint): string {
  const ecosystem = typeof fingerprint.ecosystem === "string" ? fingerprint.ecosystem : "combo";

  const tokensByEcosystem = {
    typescript: [
      Array.isArray(fingerprint.frontend)
        ? fingerprint.frontend.filter((value) => value !== "none").join("-")
        : undefined,
      typeof fingerprint.backend === "string" ? fingerprint.backend : undefined,
      typeof fingerprint.api === "string" ? fingerprint.api : undefined,
      typeof fingerprint.orm === "string" ? fingerprint.orm : undefined,
      typeof fingerprint.database === "string" ? fingerprint.database : undefined,
      typeof fingerprint.auth === "string" ? fingerprint.auth : undefined,
      typeof fingerprint.cssFramework === "string" ? fingerprint.cssFramework : undefined,
      typeof fingerprint.uiLibrary === "string" ? fingerprint.uiLibrary : undefined,
    ],
    "react-native": [
      Array.isArray(fingerprint.frontend)
        ? fingerprint.frontend.filter((value) => value !== "none").join("-")
        : undefined,
      typeof fingerprint.mobileNavigation === "string" ? fingerprint.mobileNavigation : undefined,
      typeof fingerprint.mobileUI === "string" ? fingerprint.mobileUI : undefined,
      typeof fingerprint.mobileStorage === "string" ? fingerprint.mobileStorage : undefined,
      typeof fingerprint.mobileTesting === "string" ? fingerprint.mobileTesting : undefined,
      typeof fingerprint.mobilePush === "string" ? fingerprint.mobilePush : undefined,
      typeof fingerprint.mobileOTA === "string" ? fingerprint.mobileOTA : undefined,
      typeof fingerprint.mobileDeepLinking === "string" ? fingerprint.mobileDeepLinking : undefined,
    ],
    rust: [
      typeof fingerprint.rustWebFramework === "string" ? fingerprint.rustWebFramework : undefined,
      typeof fingerprint.rustFrontend === "string" ? fingerprint.rustFrontend : undefined,
      typeof fingerprint.rustOrm === "string" ? fingerprint.rustOrm : undefined,
      typeof fingerprint.rustApi === "string" ? fingerprint.rustApi : undefined,
      typeof fingerprint.rustCli === "string" ? fingerprint.rustCli : undefined,
      Array.isArray(fingerprint.rustLibraries)
        ? fingerprint.rustLibraries.filter((value) => value !== "none").join("-")
        : undefined,
    ],
    python: [
      typeof fingerprint.pythonWebFramework === "string"
        ? fingerprint.pythonWebFramework
        : undefined,
      typeof fingerprint.pythonOrm === "string" ? fingerprint.pythonOrm : undefined,
      typeof fingerprint.pythonValidation === "string" ? fingerprint.pythonValidation : undefined,
      Array.isArray(fingerprint.pythonAi)
        ? fingerprint.pythonAi.filter((value) => value !== "none").join("-")
        : undefined,
      typeof fingerprint.pythonApi === "string" ? fingerprint.pythonApi : undefined,
      typeof fingerprint.pythonTaskQueue === "string" ? fingerprint.pythonTaskQueue : undefined,
      typeof fingerprint.pythonGraphql === "string" ? fingerprint.pythonGraphql : undefined,
      typeof fingerprint.pythonQuality === "string" ? fingerprint.pythonQuality : undefined,
    ],
    go: [
      typeof fingerprint.goWebFramework === "string" ? fingerprint.goWebFramework : undefined,
      typeof fingerprint.goOrm === "string" ? fingerprint.goOrm : undefined,
      typeof fingerprint.goApi === "string" ? fingerprint.goApi : undefined,
      typeof fingerprint.goCli === "string" ? fingerprint.goCli : undefined,
      typeof fingerprint.goLogging === "string" ? fingerprint.goLogging : undefined,
      typeof fingerprint.goAuth === "string" ? fingerprint.goAuth : undefined,
      typeof fingerprint.goValidation === "string" ? fingerprint.goValidation : undefined,
      typeof fingerprint.goQuality === "string" ? fingerprint.goQuality : undefined,
      typeof fingerprint.goMigrations === "string" ? fingerprint.goMigrations : undefined,
      typeof fingerprint.goTemplating === "string" ? fingerprint.goTemplating : undefined,
      typeof fingerprint.goProtoTooling === "string" ? fingerprint.goProtoTooling : undefined,
      typeof fingerprint.goDI === "string" ? fingerprint.goDI : undefined,
    ],
    java: [
      typeof fingerprint.javaWebFramework === "string" ? fingerprint.javaWebFramework : undefined,
      typeof fingerprint.javaBuildTool === "string" ? fingerprint.javaBuildTool : undefined,
      typeof fingerprint.javaOrm === "string" ? fingerprint.javaOrm : undefined,
      typeof fingerprint.javaAuth === "string" ? fingerprint.javaAuth : undefined,
      Array.isArray(fingerprint.javaLibraries)
        ? fingerprint.javaLibraries.filter((value) => value !== "none").join("-")
        : undefined,
      Array.isArray(fingerprint.javaTestingLibraries)
        ? fingerprint.javaTestingLibraries.filter((value) => value !== "none").join("-")
        : undefined,
    ],
    elixir: [
      typeof fingerprint.elixirWebFramework === "string"
        ? fingerprint.elixirWebFramework
        : undefined,
      typeof fingerprint.elixirOrm === "string" ? fingerprint.elixirOrm : undefined,
      typeof fingerprint.elixirAuth === "string" ? fingerprint.elixirAuth : undefined,
      typeof fingerprint.elixirApi === "string" ? fingerprint.elixirApi : undefined,
      typeof fingerprint.elixirRealtime === "string" ? fingerprint.elixirRealtime : undefined,
      typeof fingerprint.elixirJobs === "string" ? fingerprint.elixirJobs : undefined,
      typeof fingerprint.elixirDeploy === "string" ? fingerprint.elixirDeploy : undefined,
    ],
  } as const;

  const ecosystemTokens =
    ecosystem in tokensByEcosystem
      ? tokensByEcosystem[ecosystem as keyof typeof tokensByEcosystem]
      : [];

  const tokens = [ecosystem, ...ecosystemTokens]
    .filter((value): value is string => Boolean(value && value !== "none"))
    .map((value) => value.replace(/[^a-z0-9]+/gi, "-"));

  const digest = Bun.hash(fingerprintToKey(fingerprint)).toString(36).slice(0, 6);
  const suffix = `-${digest}`;
  const readableName = tokens.slice(0, 8).join("-").replace(/-+/g, "-");
  const truncatedName = readableName
    .slice(0, MAX_SMOKE_PROJECT_NAME_LENGTH - suffix.length)
    .replace(/-+$/g, "");

  return `${truncatedName}${suffix}`;
}

export function buildCommand(name: string, config: ProjectConfig): string {
  const parts = [`bun create better-fullstack@latest ${name}`];

  const commonFlags: Array<[string, string | readonly string[]]> = [
    ["ecosystem", config.ecosystem],
    ["addons", withExplicitNone(config.addons)],
    ["examples", withExplicitNone(config.examples)],
    ["ai-docs", withExplicitNone(config.aiDocs)],
    ["package-manager", config.packageManager],
  ];

  const typeScriptFlags: Array<[string, string | readonly string[]]> = [
    ["frontend", withExplicitNone(config.frontend)],
    ["backend", config.backend],
    ["runtime", config.runtime],
    ["api", config.api],
    ["database", config.database],
    ["orm", config.orm],
    ["db-setup", config.dbSetup],
    ["auth", config.auth],
    ["payments", config.payments],
    ["email", config.email],
    ["file-upload", config.fileUpload],
    ["logging", config.logging],
    ["observability", config.observability],
    ["feature-flags", config.featureFlags],
    ["analytics", config.analytics],
    ["effect", config.effect],
    ["state-management", config.stateManagement],
    ["forms", config.forms],
    ["validation", config.validation],
    ["testing", config.testing],
    ["ai", config.ai],
    ["realtime", config.realtime],
    ["job-queue", config.jobQueue],
    ["animation", config.animation],
    ["css-framework", config.cssFramework],
    ["ui-library", config.uiLibrary],
    ["cms", config.cms],
    ["caching", config.caching],
    ["rate-limit", config.rateLimit],
    ["i18n", config.i18n],
    ["search", config.search],
    ["vector-db", withExplicitScalar(config.vectorDb)],
    ["file-storage", config.fileStorage],
    ["mobile-navigation", withExplicitScalar(config.mobileNavigation)],
    ["mobile-ui", withExplicitScalar(config.mobileUI)],
    ["mobile-storage", withExplicitScalar(config.mobileStorage)],
    ["mobile-testing", withExplicitScalar(config.mobileTesting)],
    ["mobile-push", withExplicitScalar(config.mobilePush)],
    ["mobile-ota", withExplicitScalar(config.mobileOTA)],
    ["mobile-deep-linking", withExplicitScalar(config.mobileDeepLinking)],
    ["web-deploy", config.webDeploy],
    ["server-deploy", config.serverDeploy],
  ];

  const sharedServiceFlags: Array<[string, string | readonly string[]]> = [
    ["email", config.email],
    ["observability", config.observability],
    ["caching", config.caching],
    ["search", config.search],
  ];

  const reactNativeFlags: Array<[string, string | readonly string[]]> = [
    ["frontend", withExplicitNone(config.frontend)],
    ["auth", config.auth],
    // Payments (RevenueCat) is native-applicable, so it must be passed explicitly
    // or the CLI prompts for it and non-interactive scaffolds hang.
    ["payments", config.payments],
    ["mobile-navigation", withExplicitScalar(config.mobileNavigation)],
    ["mobile-ui", withExplicitScalar(config.mobileUI)],
    ["mobile-storage", withExplicitScalar(config.mobileStorage)],
    ["mobile-testing", withExplicitScalar(config.mobileTesting)],
    ["mobile-push", withExplicitScalar(config.mobilePush)],
    ["mobile-ota", withExplicitScalar(config.mobileOTA)],
    ["mobile-deep-linking", withExplicitScalar(config.mobileDeepLinking)],
  ];

  const rustFlags: Array<[string, string | readonly string[]]> = [
    ["rust-web-framework", config.rustWebFramework],
    ["rust-frontend", config.rustFrontend],
    ["rust-orm", config.rustOrm],
    ["rust-api", config.rustApi],
    ["rust-cli", config.rustCli],
    ["rust-logging", config.rustLogging],
    ["rust-error-handling", config.rustErrorHandling],
    ["rust-caching", config.rustCaching],
    ["rust-auth", config.rustAuth],
    ["rust-realtime", config.rustRealtime],
    ["rust-message-queue", config.rustMessageQueue],
    ["rust-observability", config.rustObservability],
    ["rust-templating", config.rustTemplating],
    ["rust-libraries", withExplicitNone(config.rustLibraries)],
  ];

  const pythonFlags: Array<[string, string | readonly string[]]> = [
    ["python-web-framework", config.pythonWebFramework],
    ["python-orm", config.pythonOrm],
    ["python-validation", config.pythonValidation],
    ["python-ai", withExplicitNone(config.pythonAi)],
    ["python-auth", config.pythonAuth],
    ["python-api", config.pythonApi],
    ["python-task-queue", config.pythonTaskQueue],
    ["python-graphql", config.pythonGraphql],
    ["python-quality", config.pythonQuality],
    ["python-testing", withExplicitNone(config.pythonTesting)],
    ["python-caching", config.pythonCaching],
    ["python-realtime", config.pythonRealtime],
    ["python-observability", config.pythonObservability],
    ["python-cli", withExplicitNone(config.pythonCli)],
  ];

  const goFlags: Array<[string, string | readonly string[]]> = [
    ["auth", config.auth],
    ["go-web-framework", config.goWebFramework],
    ["go-orm", config.goOrm],
    ["go-api", config.goApi],
    ["go-cli", config.goCli],
    ["go-logging", config.goLogging],
    ["go-auth", config.goAuth],
    ["go-testing", withExplicitNone(config.goTesting)],
    ["go-realtime", config.goRealtime],
    ["go-message-queue", config.goMessageQueue],
    ["go-caching", config.goCaching],
    ["go-config", config.goConfig],
    ["go-observability", config.goObservability],
    ["go-validation", config.goValidation],
    ["go-quality", config.goQuality],
    ["go-migrations", config.goMigrations],
    ["go-templating", config.goTemplating],
    ["go-proto-tooling", config.goProtoTooling],
    ["go-di", config.goDI],
  ];

  const javaFlags: Array<[string, string | readonly string[]]> = [
    ["java-web-framework", config.javaWebFramework],
    ["java-build-tool", config.javaBuildTool],
    ["java-orm", config.javaOrm],
    ["java-auth", config.javaAuth],
    ["java-api", config.javaApi],
    ["java-logging", config.javaLogging],
    ["java-libraries", withExplicitNone(config.javaLibraries)],
    ["java-testing-libraries", withExplicitNone(config.javaTestingLibraries)],
  ];

  const elixirFlags: Array<[string, string | readonly string[]]> = [
    ["elixir-web-framework", config.elixirWebFramework],
    ["elixir-orm", config.elixirOrm],
    ["elixir-auth", config.elixirAuth],
    ["elixir-api", config.elixirApi],
    ["elixir-realtime", config.elixirRealtime],
    ["elixir-jobs", config.elixirJobs],
    ["elixir-validation", config.elixirValidation],
    ["elixir-http", config.elixirHttp],
    ["elixir-json", config.elixirJson],
    ["elixir-email", config.elixirEmail],
    ["elixir-caching", config.elixirCaching],
    ["elixir-observability", config.elixirObservability],
    ["elixir-testing", config.elixirTesting],
    ["elixir-quality", config.elixirQuality],
    ["elixir-i18n", config.elixirI18n],
    ["elixir-http-server", config.elixirHttpServer],
    ["elixir-application-framework", config.elixirApplicationFramework],
    ["elixir-documentation", config.elixirDocumentation],
    ["elixir-clustering", config.elixirClustering],
    ["elixir-deploy", config.elixirDeploy],
    ["elixir-libraries", withExplicitNone(config.elixirLibraries)],
  ];

  const dotnetFlags: Array<[string, string | readonly string[]]> = [
    ["database", config.database],
    ["dotnet-web-framework", config.dotnetWebFramework],
    ["dotnet-orm", config.dotnetOrm],
    ["dotnet-auth", config.dotnetAuth],
    ["dotnet-api", config.dotnetApi],
    ["dotnet-testing", withExplicitNone(config.dotnetTesting)],
    ["dotnet-job-queue", config.dotnetJobQueue],
    ["dotnet-realtime", config.dotnetRealtime],
    ["dotnet-observability", withExplicitNone(config.dotnetObservability)],
    ["dotnet-validation", config.dotnetValidation],
    ["dotnet-caching", config.dotnetCaching],
    ["dotnet-deploy", config.dotnetDeploy],
  ];

  const orderedFlags = [...commonFlags];
  switch (config.ecosystem) {
    case "typescript":
      orderedFlags.push(...typeScriptFlags);
      if (config.astroIntegration) {
        orderedFlags.push(["astro-integration", config.astroIntegration]);
      }
      if (config.shadcnBase) orderedFlags.push(["shadcn-base", config.shadcnBase]);
      if (config.shadcnStyle) orderedFlags.push(["shadcn-style", config.shadcnStyle]);
      if (config.shadcnIconLibrary) {
        orderedFlags.push(["shadcn-icon-library", config.shadcnIconLibrary]);
      }
      if (config.shadcnColorTheme) {
        orderedFlags.push(["shadcn-color-theme", config.shadcnColorTheme]);
      }
      if (config.shadcnBaseColor) {
        orderedFlags.push(["shadcn-base-color", config.shadcnBaseColor]);
      }
      if (config.shadcnFont) orderedFlags.push(["shadcn-font", config.shadcnFont]);
      if (config.shadcnRadius) orderedFlags.push(["shadcn-radius", config.shadcnRadius]);
      break;
    case "react-native":
      orderedFlags.push(...reactNativeFlags);
      break;
    case "rust":
      orderedFlags.push(...sharedServiceFlags, ...rustFlags);
      break;
    case "python":
      orderedFlags.push(...sharedServiceFlags, ...pythonFlags);
      break;
    case "go":
      orderedFlags.push(...sharedServiceFlags, ...goFlags);
      break;
    case "java":
      orderedFlags.push(...sharedServiceFlags, ...javaFlags);
      break;
    case "elixir":
      orderedFlags.push(...elixirFlags);
      break;
    case "dotnet":
      orderedFlags.push(...sharedServiceFlags, ...dotnetFlags);
      break;
  }

  for (const [flag, value] of orderedFlags) {
    parts.push(renderFlag(flag, value));
  }

  if (config.versionChannel && config.versionChannel !== "stable") {
    parts.push(renderFlag("version-channel", config.versionChannel));
  }

  parts.push(config.git ? "--git" : "--no-git");
  parts.push(config.install ? "--install" : "--no-install");

  return parts.join(" ");
}
