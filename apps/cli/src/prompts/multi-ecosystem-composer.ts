import type { Database, Ecosystem, Frontend, ProjectConfig, ServerDeploy } from "../types";

import { getDefaultConfig } from "../constants";
import { parseStackPartSpecs, stackPartsToLegacyProjectConfigPartial } from "../types";
import { hasWebStyling } from "../utils/compatibility-rules";
import { exitCancelled } from "../utils/errors";
import { getAddonsChoice } from "./addons";
import { getAiDocsChoice } from "./ai-docs";
import { getAstroIntegrationChoice } from "./astro-integration";
import {
  type ConfigPromptKey,
  type ConfigScope,
  getConfigScopeChoice,
  getConfigSectionsChoice,
  getDefaultPromptValue,
  shouldAskConfigPromptKey,
} from "./config-scope";
import { getCSSFrameworkChoice } from "./css-framework";
import { getDatabaseChoice } from "./database";
import { getDBSetupChoice } from "./database-setup";
import {
  getDotnetApiChoice,
  getDotnetAuthChoice,
  getDotnetCachingChoice,
  getDotnetValidationChoice,
  getDotnetDeployChoice,
  getDotnetJobQueueChoice,
  getDotnetObservabilityChoice,
  getDotnetOrmChoice,
  getDotnetRealtimeChoice,
  getDotnetTestingChoice,
  getDotnetWebFrameworkChoice,
} from "./dotnet-ecosystem";
import {
  getElixirApiChoice,
  getElixirAuthChoice,
  getElixirCachingChoice,
  getElixirDeployChoice,
  getElixirLibrariesChoice,
  getElixirEmailChoice,
  getElixirHttpChoice,
  getElixirJobsChoice,
  getElixirJsonChoice,
  getElixirObservabilityChoice,
  getElixirOrmChoice,
  getElixirQualityChoice,
  getElixirRealtimeChoice,
  getElixirTestingChoice,
  getElixirValidationChoice,
  getElixirWebFrameworkChoice,
} from "./elixir-ecosystem";
import { WEB_FRONTEND_PROMPT_OPTIONS } from "./frontend";
import { getGitChoice } from "./git";
import {
  getGoApiChoice,
  getGoAuthChoice,
  getGoCachingChoice,
  getGoCliChoice,
  getGoConfigChoice,
  getGoLoggingChoice,
  getGoMessageQueueChoice,
  getGoObservabilityChoice,
  getGoOrmChoice,
  getGoRealtimeChoice,
  getGoTestingChoice,
  getGoWebFrameworkChoice,
} from "./go-ecosystem";
import { getinstallChoice } from "./install";
import {
  getJavaAuthChoice,
  getJavaApiChoice,
  getJavaLoggingChoice,
  getJavaLanguageChoice,
  getJavaBuildToolChoice,
  getJavaLibrariesChoice,
  getJavaOrmChoice,
  getJavaTestingLibrariesChoice,
  getJavaWebFrameworkChoice,
} from "./java-ecosystem";
import { isCancel, isGoBack, navigableSelect } from "./navigable";
import { getPackageManagerChoice } from "./package-manager";
import {
  getPythonAiChoice,
  getPythonAuthChoice,
  getPythonGraphqlChoice,
  getPythonOrmChoice,
  getPythonQualityChoice,
  getPythonTestingChoice,
  getPythonCachingChoice,
  getPythonRealtimeChoice,
  getPythonObservabilityChoice,
  getPythonCliChoice,
  getPythonTaskQueueChoice,
  getPythonValidationChoice,
  getPythonWebFrameworkChoice,
} from "./python-ecosystem";
import {
  getRustApiChoice,
  getRustAuthChoice,
  getRustRealtimeChoice,
  getRustMessageQueueChoice,
  getRustObservabilityChoice,
  getRustTemplatingChoice,
  getRustCachingChoice,
  getRustCliChoice,
  getRustErrorHandlingChoice,
  getRustFrontendChoice,
  getRustLibrariesChoice,
  getRustLoggingChoice,
  getRustOrmChoice,
  getRustWebFrameworkChoice,
} from "./rust-ecosystem";
import { getShadcnOptions, type ShadcnOptions } from "./shadcn-options";
import { getUILibraryChoice } from "./ui-library";
import { getDeploymentChoice } from "./web-deploy";

type CompositionMode = "single" | "multi";
type BackendEcosystem = Extract<Ecosystem, "go" | "rust" | "python" | "java" | "dotnet" | "elixir">;

export async function getCompositionModeChoice(): Promise<CompositionMode> {
  const response = await navigableSelect<CompositionMode>({
    message: "Select project composition",
    options: [
      {
        value: "single",
        label: "Single ecosystem",
        hint: "Use the classic guided flow",
      },
      {
        value: "multi",
        label: "Multi ecosystem",
        hint: "Compose a TypeScript frontend with another backend ecosystem",
      },
    ],
    initialValue: "single",
  });

  if (isCancel(response) || isGoBack(response)) return exitCancelled("Operation cancelled");
  return response;
}

async function selectBackendEcosystem(): Promise<BackendEcosystem> {
  const response = await navigableSelect<BackendEcosystem>({
    message: "Select backend ecosystem",
    options: [
      { value: "go", label: "Go", hint: "Gin, Echo, Fiber, Chi" },
      { value: "rust", label: "Rust", hint: "Axum, Actix Web, Rocket" },
      { value: "python", label: "Python", hint: "FastAPI, Django, Flask" },
      { value: "java", label: "Java", hint: "Spring Boot, Quarkus" },
      { value: "dotnet", label: ".NET", hint: "ASP.NET Core, EF Core, SignalR" },
      { value: "elixir", label: "Elixir", hint: "Phoenix, LiveView" },
    ],
    initialValue: "go",
  });

  if (isCancel(response) || isGoBack(response)) return exitCancelled("Operation cancelled");
  return response;
}

async function selectServerDeployment(deployment?: ServerDeploy): Promise<ServerDeploy> {
  if (deployment !== undefined) return deployment;

  const response = await navigableSelect<ServerDeploy>({
    message: "Select server deployment",
    options: [
      { value: "none", label: "None", hint: "Skip server deployment setup" },
      { value: "railway", label: "Railway", hint: "Deploy a standalone backend service" },
      { value: "docker", label: "Docker", hint: "Containerize the backend service" },
      { value: "fly", label: "Fly", hint: "Deploy close to users" },
      { value: "vercel", label: "Vercel", hint: "Deploy from the backend workspace" },
    ],
    initialValue: "none",
  });

  if (isCancel(response) || isGoBack(response)) return exitCancelled("Operation cancelled");
  return response;
}

function promptValue<T>(value: T | symbol): T {
  if (isCancel(value) || isGoBack(value)) return exitCancelled("Operation cancelled");
  return value;
}

function hasMultiStackPromptFlags(flags: Partial<ProjectConfig>) {
  return Object.keys(flags).some(
    (key) => key !== "projectName" && key !== "projectDir" && key !== "relativePath",
  );
}

async function scopedPromptValue<T>(
  ecosystem: Ecosystem,
  key: ConfigPromptKey,
  scope: ConfigScope,
  selectedSectionIds: string[],
  prompt: () => Promise<T | symbol>,
): Promise<T> {
  if (!shouldAskConfigPromptKey(ecosystem, key, scope, selectedSectionIds)) {
    return getDefaultPromptValue(key) as T;
  }

  return promptValue(await prompt());
}

async function selectDatabaseConfig(flags: Partial<ProjectConfig>) {
  const database = promptValue(await getDatabaseChoice(flags.database, "hono", "bun"));
  const dbSetup = promptValue(
    await getDBSetupChoice(database, flags.dbSetup, "none", "none", "none"),
  );

  return { database, dbSetup };
}

export async function gatherMultiEcosystemConfig(
  flags: Partial<ProjectConfig>,
  projectName: string,
  projectDir: string,
  relativePath: string,
): Promise<ProjectConfig> {
  const baseConfig = getDefaultConfig();
  const shouldPromptForScope = !hasMultiStackPromptFlags(flags);
  const configScope = shouldPromptForScope ? promptValue(await getConfigScopeChoice()) : "full";
  // Offer only the TypeScript sections whose prompts this composer actually asks.
  const typeScriptSections =
    configScope === "custom"
      ? promptValue(
          await getConfigSectionsChoice(
            "typescript",
            [],
            ["ui-styling", "deploy", "addons-examples"],
          ),
        )
      : [];

  const frontend = promptValue(
    await navigableSelect<Frontend>({
      message: "Select TypeScript web frontend",
      options: WEB_FRONTEND_PROMPT_OPTIONS,
      initialValue: flags.frontend?.[0] ?? "next",
    }),
  );
  const frontendList = [frontend];
  const astroIntegration =
    frontend === "astro"
      ? promptValue(await getAstroIntegrationChoice(flags.astroIntegration))
      : undefined;
  const uiLibrary = hasWebStyling(frontendList)
    ? await scopedPromptValue("typescript", "uiLibrary", configScope, typeScriptSections, () =>
        getUILibraryChoice(flags.uiLibrary, frontendList, astroIntegration),
      )
    : "none";
  const shadcnOptions =
    uiLibrary === "shadcn-ui"
      ? shouldAskConfigPromptKey("typescript", "shadcnOptions", configScope, typeScriptSections)
        ? promptValue(
            await getShadcnOptions({
              shadcnBase: flags.shadcnBase,
              shadcnStyle: flags.shadcnStyle,
              shadcnIconLibrary: flags.shadcnIconLibrary,
              shadcnColorTheme: flags.shadcnColorTheme,
              shadcnBaseColor: flags.shadcnBaseColor,
              shadcnFont: flags.shadcnFont,
              shadcnRadius: flags.shadcnRadius,
            }),
          )
        : (getDefaultPromptValue("shadcnOptions") as ShadcnOptions)
      : undefined;
  const cssFramework = hasWebStyling(frontendList)
    ? await scopedPromptValue("typescript", "cssFramework", configScope, typeScriptSections, () =>
        getCSSFrameworkChoice(flags.cssFramework, uiLibrary),
      )
    : "none";

  const backendEcosystem = await selectBackendEcosystem();
  const backendSections =
    configScope === "custom" ? promptValue(await getConfigSectionsChoice(backendEcosystem)) : [];
  const stackPartSpecs = [`frontend:typescript:${frontend}`];
  const backendChoices: Partial<ProjectConfig> = {};
  let database: Database = "none";
  let dbSetup: ProjectConfig["dbSetup"] = "none";

  if (backendEcosystem === "go") {
    const goWebFramework = promptValue(await getGoWebFrameworkChoice(flags.goWebFramework));
    if (goWebFramework !== "none") {
      const databaseConfig = await selectDatabaseConfig(flags);
      database = databaseConfig.database;
      dbSetup = databaseConfig.dbSetup;
    }
    const goOrm =
      database === "none" || goWebFramework === "none"
        ? "none"
        : promptValue(await getGoOrmChoice(flags.goOrm));
    const goApi =
      goWebFramework === "none" ? "none" : promptValue(await getGoApiChoice(flags.goApi));
    const goAuth =
      goWebFramework === "none" ? "none" : promptValue(await getGoAuthChoice(flags.goAuth));
    const goCli =
      goWebFramework === "none"
        ? "none"
        : await scopedPromptValue("go", "goCli", configScope, backendSections, () =>
            getGoCliChoice(flags.goCli),
          );
    const goLogging =
      goWebFramework === "none"
        ? "none"
        : await scopedPromptValue("go", "goLogging", configScope, backendSections, () =>
            getGoLoggingChoice(flags.goLogging),
          );
    const goTesting =
      goWebFramework === "none"
        ? []
        : await scopedPromptValue("go", "goTesting", configScope, backendSections, () =>
            getGoTestingChoice(flags.goTesting),
          );
    const goRealtime =
      goWebFramework === "none"
        ? "none"
        : await scopedPromptValue("go", "goRealtime", configScope, backendSections, () =>
            getGoRealtimeChoice(flags.goRealtime),
          );
    const goMessageQueue =
      goWebFramework === "none"
        ? "none"
        : await scopedPromptValue("go", "goMessageQueue", configScope, backendSections, () =>
            getGoMessageQueueChoice(flags.goMessageQueue),
          );
    const goCaching =
      goWebFramework === "none"
        ? "none"
        : await scopedPromptValue("go", "goCaching", configScope, backendSections, () =>
            getGoCachingChoice(flags.goCaching),
          );
    const goConfig =
      goWebFramework === "none"
        ? "none"
        : await scopedPromptValue("go", "goConfig", configScope, backendSections, () =>
            getGoConfigChoice(flags.goConfig),
          );
    const goObservability =
      goWebFramework === "none"
        ? "none"
        : await scopedPromptValue("go", "goObservability", configScope, backendSections, () =>
            getGoObservabilityChoice(flags.goObservability),
          );
    Object.assign(backendChoices, {
      goWebFramework,
      goOrm,
      goApi,
      goAuth,
      goCli,
      goLogging,
      goTesting,
      goRealtime,
      goMessageQueue,
      goCaching,
      goConfig,
      goObservability,
    });
    if (goWebFramework !== "none") stackPartSpecs.push(`backend:go:${goWebFramework}`);
    if (goOrm !== "none") stackPartSpecs.push(`backend.orm:go:${goOrm}`);
    if (goApi !== "none") stackPartSpecs.push(`backend.api:go:${goApi}`);
    if (goAuth !== "none") stackPartSpecs.push(`backend.auth:go:${goAuth}`);
    for (const testing of goTesting) {
      if (testing !== "none") stackPartSpecs.push(`backend.testing:go:${testing}`);
    }
    if (goRealtime !== "none") stackPartSpecs.push(`backend.realtime:go:${goRealtime}`);
    if (goMessageQueue !== "none") {
      stackPartSpecs.push(`backend.jobQueue:go:${goMessageQueue}`);
    }
    if (goCaching !== "none") stackPartSpecs.push(`backend.caching:go:${goCaching}`);
    if (goConfig !== "none") stackPartSpecs.push(`backend.config:go:${goConfig}`);
    if (goObservability !== "none") {
      stackPartSpecs.push(`backend.observability:go:${goObservability}`);
    }
  }

  if (backendEcosystem === "rust") {
    const rustWebFramework = promptValue(await getRustWebFrameworkChoice(flags.rustWebFramework));
    if (rustWebFramework !== "none") {
      const databaseConfig = await selectDatabaseConfig(flags);
      database = databaseConfig.database;
      dbSetup = databaseConfig.dbSetup;
    }
    const rustOrm =
      database === "none" || rustWebFramework === "none"
        ? "none"
        : promptValue(await getRustOrmChoice(flags.rustOrm));
    const rustApi =
      rustWebFramework === "none" ? "none" : promptValue(await getRustApiChoice(flags.rustApi));
    const rustAuth =
      rustWebFramework === "none" ? "none" : promptValue(await getRustAuthChoice(flags.rustAuth));
    const rustFrontend = "none";
    const rustCli =
      rustWebFramework === "none"
        ? "none"
        : await scopedPromptValue("rust", "rustCli", configScope, backendSections, () =>
            getRustCliChoice(flags.rustCli),
          );
    const rustLibraries =
      rustWebFramework === "none"
        ? []
        : await scopedPromptValue("rust", "rustLibraries", configScope, backendSections, () =>
            getRustLibrariesChoice(flags.rustLibraries),
          );
    const rustLogging =
      rustWebFramework === "none"
        ? "none"
        : await scopedPromptValue("rust", "rustLogging", configScope, backendSections, () =>
            getRustLoggingChoice(flags.rustLogging),
          );
    const rustErrorHandling = await scopedPromptValue(
      "rust",
      "rustErrorHandling",
      configScope,
      backendSections,
      () => getRustErrorHandlingChoice(flags.rustErrorHandling),
    );
    const rustCaching =
      rustWebFramework === "none"
        ? "none"
        : await scopedPromptValue("rust", "rustCaching", configScope, backendSections, () =>
            getRustCachingChoice(flags.rustCaching),
          );
    const rustRealtime =
      rustWebFramework === "none"
        ? "none"
        : await scopedPromptValue("rust", "rustRealtime", configScope, backendSections, () =>
            getRustRealtimeChoice(flags.rustRealtime),
          );
    const rustMessageQueue =
      rustWebFramework === "none"
        ? "none"
        : await scopedPromptValue("rust", "rustMessageQueue", configScope, backendSections, () =>
            getRustMessageQueueChoice(flags.rustMessageQueue),
          );
    const rustObservability =
      rustWebFramework === "none"
        ? "none"
        : await scopedPromptValue("rust", "rustObservability", configScope, backendSections, () =>
            getRustObservabilityChoice(flags.rustObservability),
          );
    const rustTemplating =
      rustWebFramework === "none"
        ? "none"
        : await scopedPromptValue("rust", "rustTemplating", configScope, backendSections, () =>
            getRustTemplatingChoice(flags.rustTemplating),
          );
    Object.assign(backendChoices, {
      rustWebFramework,
      rustOrm,
      rustApi,
      rustAuth,
      rustFrontend,
      rustCli,
      rustLibraries,
      rustLogging,
      rustErrorHandling,
      rustCaching,
      rustRealtime,
      rustMessageQueue,
      rustObservability,
      rustTemplating,
    });
    if (rustWebFramework !== "none") stackPartSpecs.push(`backend:rust:${rustWebFramework}`);
    if (rustOrm !== "none") stackPartSpecs.push(`backend.orm:rust:${rustOrm}`);
    if (rustApi !== "none") stackPartSpecs.push(`backend.api:rust:${rustApi}`);
    if (rustAuth !== "none") stackPartSpecs.push(`backend.auth:rust:${rustAuth}`);
    if (rustRealtime !== "none") stackPartSpecs.push(`backend.realtime:rust:${rustRealtime}`);
    if (rustMessageQueue !== "none") {
      stackPartSpecs.push(`backend.jobQueue:rust:${rustMessageQueue}`);
    }
    if (rustObservability !== "none") {
      stackPartSpecs.push(`backend.observability:rust:${rustObservability}`);
    }
    if (rustTemplating !== "none") {
      stackPartSpecs.push(`backend.templating:rust:${rustTemplating}`);
    }
  }

  if (backendEcosystem === "python") {
    const pythonWebFramework = promptValue(
      await getPythonWebFrameworkChoice(flags.pythonWebFramework),
    );
    if (pythonWebFramework !== "none") {
      const databaseConfig = await selectDatabaseConfig(flags);
      database = databaseConfig.database;
      dbSetup = databaseConfig.dbSetup;
    }
    const pythonOrm =
      database === "none" || pythonWebFramework === "none"
        ? "none"
        : promptValue(await getPythonOrmChoice(flags.pythonOrm));
    const pythonValidation =
      pythonWebFramework === "none"
        ? "none"
        : await scopedPromptValue("python", "pythonValidation", configScope, backendSections, () =>
            getPythonValidationChoice(flags.pythonValidation),
          );
    const pythonAi =
      pythonWebFramework === "none"
        ? []
        : await scopedPromptValue("python", "pythonAi", configScope, backendSections, () =>
            getPythonAiChoice(flags.pythonAi),
          );
    const pythonAuth =
      pythonWebFramework === "none"
        ? "none"
        : promptValue(await getPythonAuthChoice(flags.pythonAuth));
    const pythonTaskQueue =
      pythonWebFramework === "none"
        ? "none"
        : await scopedPromptValue("python", "pythonTaskQueue", configScope, backendSections, () =>
            getPythonTaskQueueChoice(flags.pythonTaskQueue),
          );
    const pythonGraphql =
      pythonWebFramework === "none"
        ? "none"
        : await scopedPromptValue("python", "pythonGraphql", configScope, backendSections, () =>
            getPythonGraphqlChoice(flags.pythonGraphql),
          );
    const pythonQuality =
      pythonWebFramework === "none"
        ? "none"
        : await scopedPromptValue("python", "pythonQuality", configScope, backendSections, () =>
            getPythonQualityChoice(flags.pythonQuality),
          );
    const pythonTesting =
      pythonWebFramework === "none"
        ? []
        : await scopedPromptValue("python", "pythonTesting", configScope, backendSections, () =>
            getPythonTestingChoice(flags.pythonTesting),
          );
    const pythonCaching =
      pythonWebFramework === "none"
        ? "none"
        : await scopedPromptValue("python", "pythonCaching", configScope, backendSections, () =>
            getPythonCachingChoice(flags.pythonCaching),
          );
    const pythonRealtime =
      pythonWebFramework === "none"
        ? "none"
        : await scopedPromptValue("python", "pythonRealtime", configScope, backendSections, () =>
            getPythonRealtimeChoice(flags.pythonRealtime),
          );
    const pythonObservability =
      pythonWebFramework === "none"
        ? "none"
        : await scopedPromptValue(
            "python",
            "pythonObservability",
            configScope,
            backendSections,
            () => getPythonObservabilityChoice(flags.pythonObservability),
          );
    const pythonCli =
      pythonWebFramework === "none"
        ? []
        : await scopedPromptValue("python", "pythonCli", configScope, backendSections, () =>
            getPythonCliChoice(flags.pythonCli),
          );
    Object.assign(backendChoices, {
      pythonWebFramework,
      pythonOrm,
      pythonValidation,
      pythonAi,
      pythonAuth,
      pythonTaskQueue,
      pythonGraphql,
      pythonQuality,
      pythonTesting,
      pythonCaching,
      pythonRealtime,
      pythonObservability,
      pythonCli,
    });
    if (pythonWebFramework !== "none") stackPartSpecs.push(`backend:python:${pythonWebFramework}`);
    if (pythonOrm !== "none") stackPartSpecs.push(`backend.orm:python:${pythonOrm}`);
    if (pythonAuth !== "none") stackPartSpecs.push(`backend.auth:python:${pythonAuth}`);
    if (pythonTaskQueue !== "none")
      stackPartSpecs.push(`backend.jobQueue:python:${pythonTaskQueue}`);
    if (pythonGraphql !== "none") stackPartSpecs.push(`backend.graphql:python:${pythonGraphql}`);
    for (const testing of pythonTesting) {
      if (testing !== "none") stackPartSpecs.push(`backend.testing:python:${testing}`);
    }
    if (pythonCaching !== "none") stackPartSpecs.push(`backend.caching:python:${pythonCaching}`);
    if (pythonRealtime !== "none") {
      stackPartSpecs.push(`backend.realtime:python:${pythonRealtime}`);
    }
    if (pythonObservability !== "none") {
      stackPartSpecs.push(`backend.observability:python:${pythonObservability}`);
    }
    for (const cli of pythonCli) {
      if (cli !== "none") stackPartSpecs.push(`backend.cli:python:${cli}`);
    }
  }

  if (backendEcosystem === "java") {
    const javaWebFramework = promptValue(await getJavaWebFrameworkChoice(flags.javaWebFramework));
    const javaLanguage =
      javaWebFramework !== "spring-boot"
        ? "java"
        : flags.javaLanguage !== undefined
          ? promptValue(await getJavaLanguageChoice(flags.javaLanguage))
          : flags.javaWebFramework !== undefined
            ? "java"
            : promptValue(await getJavaLanguageChoice(flags.javaLanguage));
    const javaBuildTool = promptValue(
      await getJavaBuildToolChoice(flags.javaBuildTool, javaLanguage),
    );
    if (javaWebFramework !== "none" && javaBuildTool !== "none") {
      const databaseConfig = await selectDatabaseConfig(flags);
      database = databaseConfig.database;
      dbSetup = databaseConfig.dbSetup;
    }
    const javaOrm =
      database === "none" || javaWebFramework !== "spring-boot" || javaBuildTool === "none"
        ? "none"
        : promptValue(await getJavaOrmChoice(flags.javaOrm, javaLanguage));
    const javaAuth =
      javaWebFramework !== "spring-boot" || javaBuildTool === "none"
        ? "none"
        : promptValue(await getJavaAuthChoice(flags.javaAuth));
    const javaLibraries =
      javaWebFramework !== "spring-boot" || javaBuildTool === "none"
        ? []
        : await scopedPromptValue("java", "javaLibraries", configScope, backendSections, () =>
            getJavaLibrariesChoice(flags.javaLibraries, javaLanguage),
          );
    const javaTestingLibraries = await scopedPromptValue(
      "java",
      "javaTestingLibraries",
      configScope,
      backendSections,
      () => getJavaTestingLibrariesChoice(flags.javaTestingLibraries, javaLanguage),
    );
    const javaApi =
      javaWebFramework !== "spring-boot" || javaBuildTool === "none"
        ? "none"
        : promptValue(await getJavaApiChoice(flags.javaApi, javaLanguage));
    const javaLogging =
      javaWebFramework !== "spring-boot" || javaBuildTool === "none"
        ? "none"
        : await scopedPromptValue("java", "javaLogging", configScope, backendSections, () =>
            getJavaLoggingChoice(flags.javaLogging),
          );
    Object.assign(backendChoices, {
      javaLanguage,
      javaWebFramework,
      javaBuildTool,
      javaOrm,
      javaAuth,
      javaApi,
      javaLogging,
      javaLibraries,
      javaTestingLibraries,
    });
    if (javaWebFramework !== "none") stackPartSpecs.push(`backend:java:${javaWebFramework}`);
    if (javaWebFramework !== "none") stackPartSpecs.push(`backend.language:java:${javaLanguage}`);
    if (javaOrm !== "none") stackPartSpecs.push(`backend.orm:java:${javaOrm}`);
    if (javaAuth !== "none") stackPartSpecs.push(`backend.auth:java:${javaAuth}`);
    if (javaApi !== "none") stackPartSpecs.push(`backend.api:java:${javaApi}`);
    if (javaLogging !== "none") stackPartSpecs.push(`backend.logging:java:${javaLogging}`);
  }

  if (backendEcosystem === "dotnet") {
    const dotnetWebFramework = promptValue(
      await getDotnetWebFrameworkChoice(flags.dotnetWebFramework),
    );
    if (dotnetWebFramework !== "none") {
      const databaseConfig = await selectDatabaseConfig(flags);
      database = databaseConfig.database;
      dbSetup = databaseConfig.dbSetup;
    }
    const dotnetOrm =
      database === "none" || dotnetWebFramework === "none"
        ? "none"
        : promptValue(await getDotnetOrmChoice(flags.dotnetOrm));
    const dotnetAuth =
      dotnetWebFramework === "none"
        ? "none"
        : promptValue(await getDotnetAuthChoice(flags.dotnetAuth));
    const dotnetApi =
      dotnetWebFramework === "none"
        ? "none"
        : promptValue(await getDotnetApiChoice(flags.dotnetApi));
    const dotnetTesting =
      dotnetWebFramework === "none"
        ? []
        : await scopedPromptValue("dotnet", "dotnetTesting", configScope, backendSections, () =>
            getDotnetTestingChoice(flags.dotnetTesting),
          );
    const dotnetJobQueue =
      dotnetWebFramework === "none"
        ? "none"
        : await scopedPromptValue("dotnet", "dotnetJobQueue", configScope, backendSections, () =>
            getDotnetJobQueueChoice(flags.dotnetJobQueue),
          );
    const dotnetRealtime =
      dotnetWebFramework === "none"
        ? "none"
        : await scopedPromptValue("dotnet", "dotnetRealtime", configScope, backendSections, () =>
            getDotnetRealtimeChoice(flags.dotnetRealtime),
          );
    const dotnetObservability =
      dotnetWebFramework === "none"
        ? []
        : await scopedPromptValue(
            "dotnet",
            "dotnetObservability",
            configScope,
            backendSections,
            () => getDotnetObservabilityChoice(flags.dotnetObservability),
          );
    const dotnetValidation =
      dotnetWebFramework === "none"
        ? "none"
        : await scopedPromptValue("dotnet", "dotnetValidation", configScope, backendSections, () =>
            getDotnetValidationChoice(flags.dotnetValidation),
          );
    const dotnetCaching =
      dotnetWebFramework === "none"
        ? "none"
        : await scopedPromptValue("dotnet", "dotnetCaching", configScope, backendSections, () =>
            getDotnetCachingChoice(flags.dotnetCaching),
          );
    const dotnetDeploy =
      dotnetWebFramework === "none"
        ? "none"
        : await scopedPromptValue("dotnet", "dotnetDeploy", configScope, backendSections, () =>
            getDotnetDeployChoice(flags.dotnetDeploy),
          );
    Object.assign(backendChoices, {
      dotnetWebFramework,
      dotnetOrm,
      dotnetAuth,
      dotnetApi,
      dotnetTesting,
      dotnetJobQueue,
      dotnetRealtime,
      dotnetObservability,
      dotnetValidation,
      dotnetCaching,
      dotnetDeploy,
    });
    if (dotnetWebFramework !== "none") {
      stackPartSpecs.push(`backend:dotnet:${dotnetWebFramework}`);
    }
    if (dotnetOrm !== "none") stackPartSpecs.push(`backend.orm:dotnet:${dotnetOrm}`);
    if (dotnetAuth !== "none") stackPartSpecs.push(`backend.auth:dotnet:${dotnetAuth}`);
    if (dotnetApi !== "none") stackPartSpecs.push(`backend.api:dotnet:${dotnetApi}`);
    for (const testing of dotnetTesting) {
      if (testing !== "none") stackPartSpecs.push(`backend.testing:dotnet:${testing}`);
    }
    if (dotnetJobQueue !== "none") {
      stackPartSpecs.push(`backend.jobQueue:dotnet:${dotnetJobQueue}`);
    }
    if (dotnetRealtime !== "none") {
      stackPartSpecs.push(`backend.realtime:dotnet:${dotnetRealtime}`);
    }
    for (const observability of dotnetObservability) {
      if (observability !== "none") {
        stackPartSpecs.push(`backend.observability:dotnet:${observability}`);
      }
    }
    if (dotnetValidation !== "none") {
      stackPartSpecs.push(`backend.validation:dotnet:${dotnetValidation}`);
    }
    if (dotnetCaching !== "none") {
      stackPartSpecs.push(`backend.caching:dotnet:${dotnetCaching}`);
    }
    if (dotnetDeploy !== "none") stackPartSpecs.push(`backend.deploy:dotnet:${dotnetDeploy}`);
  }

  if (backendEcosystem === "elixir") {
    const elixirWebFramework = promptValue(
      await getElixirWebFrameworkChoice(flags.elixirWebFramework),
    );
    if (elixirWebFramework !== "none") {
      const databaseConfig = await selectDatabaseConfig(flags);
      database = databaseConfig.database;
      dbSetup = databaseConfig.dbSetup;
    }
    const elixirOrm =
      database === "none" || elixirWebFramework === "none"
        ? "none"
        : promptValue(await getElixirOrmChoice(flags.elixirOrm));
    const elixirAuth =
      elixirWebFramework === "none"
        ? "none"
        : promptValue(await getElixirAuthChoice(flags.elixirAuth));
    const elixirApi =
      elixirWebFramework === "none"
        ? "none"
        : promptValue(await getElixirApiChoice(flags.elixirApi));
    const elixirRealtime =
      elixirWebFramework === "none"
        ? "none"
        : await scopedPromptValue("elixir", "elixirRealtime", configScope, backendSections, () =>
            getElixirRealtimeChoice(flags.elixirRealtime),
          );
    const elixirJobs =
      elixirWebFramework === "none"
        ? "none"
        : await scopedPromptValue("elixir", "elixirJobs", configScope, backendSections, () =>
            getElixirJobsChoice(flags.elixirJobs),
          );
    const elixirValidation =
      elixirWebFramework === "none"
        ? "none"
        : await scopedPromptValue("elixir", "elixirValidation", configScope, backendSections, () =>
            getElixirValidationChoice(flags.elixirValidation),
          );
    const elixirHttp =
      elixirWebFramework === "none"
        ? "none"
        : await scopedPromptValue("elixir", "elixirHttp", configScope, backendSections, () =>
            getElixirHttpChoice(flags.elixirHttp),
          );
    const elixirJson =
      elixirWebFramework === "none"
        ? "none"
        : await scopedPromptValue("elixir", "elixirJson", configScope, backendSections, () =>
            getElixirJsonChoice(flags.elixirJson),
          );
    const elixirEmail =
      elixirWebFramework === "none"
        ? "none"
        : await scopedPromptValue("elixir", "elixirEmail", configScope, backendSections, () =>
            getElixirEmailChoice(flags.elixirEmail),
          );
    const elixirCaching =
      elixirWebFramework === "none"
        ? "none"
        : await scopedPromptValue("elixir", "elixirCaching", configScope, backendSections, () =>
            getElixirCachingChoice(flags.elixirCaching),
          );
    const elixirObservability =
      elixirWebFramework === "none"
        ? "none"
        : await scopedPromptValue(
            "elixir",
            "elixirObservability",
            configScope,
            backendSections,
            () => getElixirObservabilityChoice(flags.elixirObservability),
          );
    const elixirTesting =
      elixirWebFramework === "none"
        ? "none"
        : await scopedPromptValue("elixir", "elixirTesting", configScope, backendSections, () =>
            getElixirTestingChoice(flags.elixirTesting),
          );
    const elixirQuality =
      elixirWebFramework === "none"
        ? "none"
        : await scopedPromptValue("elixir", "elixirQuality", configScope, backendSections, () =>
            getElixirQualityChoice(flags.elixirQuality),
          );
    const elixirDeploy =
      elixirWebFramework === "none"
        ? "none"
        : await scopedPromptValue("elixir", "elixirDeploy", configScope, backendSections, () =>
            getElixirDeployChoice(flags.elixirDeploy),
          );
    const elixirLibraries =
      elixirWebFramework === "none"
        ? []
        : await scopedPromptValue("elixir", "elixirLibraries", configScope, backendSections, () =>
            getElixirLibrariesChoice(flags.elixirLibraries),
          );
    Object.assign(backendChoices, {
      elixirWebFramework,
      elixirOrm,
      elixirAuth,
      elixirApi,
      elixirRealtime,
      elixirJobs,
      elixirValidation,
      elixirHttp,
      elixirJson,
      elixirEmail,
      elixirCaching,
      elixirObservability,
      elixirTesting,
      elixirQuality,
      elixirDeploy,
      elixirLibraries,
    });
    if (elixirWebFramework !== "none") {
      stackPartSpecs.push(`backend:elixir:${elixirWebFramework}`);
    }
    if (elixirOrm !== "none") stackPartSpecs.push(`backend.orm:elixir:${elixirOrm}`);
    if (elixirAuth !== "none") stackPartSpecs.push(`backend.auth:elixir:${elixirAuth}`);
    if (elixirApi !== "none") stackPartSpecs.push(`backend.api:elixir:${elixirApi}`);
    if (elixirRealtime !== "none") {
      stackPartSpecs.push(`backend.realtime:elixir:${elixirRealtime}`);
    }
    if (elixirJobs !== "none") stackPartSpecs.push(`backend.jobQueue:elixir:${elixirJobs}`);
    if (elixirEmail !== "none") stackPartSpecs.push(`backend.email:elixir:${elixirEmail}`);
    if (elixirCaching !== "none") stackPartSpecs.push(`backend.caching:elixir:${elixirCaching}`);
    if (elixirObservability !== "none") {
      stackPartSpecs.push(`backend.observability:elixir:${elixirObservability}`);
    }
    if (elixirTesting !== "none") stackPartSpecs.push(`backend.testing:elixir:${elixirTesting}`);
    if (elixirDeploy !== "none") stackPartSpecs.push(`backend.deploy:elixir:${elixirDeploy}`);
    for (const library of elixirLibraries) {
      if (library !== "none") stackPartSpecs.push(`backend.libraries:elixir:${library}`);
    }
  }

  if (database !== "none") stackPartSpecs.push(`database:universal:${database}`);

  const stackParts = parseStackPartSpecs(stackPartSpecs, "selected");
  const graphPartial = stackPartsToLegacyProjectConfigPartial(stackParts);
  const addons = await scopedPromptValue(
    "typescript",
    "addons",
    configScope,
    typeScriptSections,
    () => getAddonsChoice(flags.addons, frontendList, "none", "none", "bun"),
  );
  const webDeploy = await scopedPromptValue(
    "typescript",
    "webDeploy",
    configScope,
    typeScriptSections,
    () => getDeploymentChoice(flags.webDeploy, "bun", "none", frontendList),
  );
  const serverDeploy = shouldAskConfigPromptKey(
    "typescript",
    "serverDeploy",
    configScope,
    typeScriptSections,
  )
    ? await selectServerDeployment(flags.serverDeploy)
    : (getDefaultPromptValue("serverDeploy") as ServerDeploy);
  const aiDocs = promptValue(await getAiDocsChoice(flags.aiDocs));
  const git = promptValue(await getGitChoice(flags.git));
  const packageManager = promptValue(await getPackageManagerChoice(flags.packageManager));
  const install = promptValue(await getinstallChoice(flags.install, "typescript", "none"));

  return {
    ...baseConfig,
    ...flags,
    ...graphPartial,
    ...backendChoices,
    projectName,
    projectDir,
    relativePath,
    ecosystem: "typescript",
    frontend: frontendList,
    backend: "none",
    runtime: "none",
    database,
    orm: "none",
    api: "none",
    auth: "none",
    astroIntegration,
    uiLibrary,
    ...shadcnOptions,
    cssFramework,
    addons,
    examples: [],
    dbSetup,
    webDeploy,
    serverDeploy,
    aiDocs,
    git,
    packageManager,
    install,
    stackParts,
  };
}
