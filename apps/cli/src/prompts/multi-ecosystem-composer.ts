import type {
  Database,
  Ecosystem,
  Frontend,
  ProjectConfig,
  ServerDeploy,
} from "../types";

import { getDefaultConfig } from "../constants";
import {
  parseStackPartSpecs,
  stackPartsToLegacyProjectConfigPartial,
} from "../types";
import { hasWebStyling } from "../utils/compatibility-rules";
import { exitCancelled } from "../utils/errors";
import { getAddonsChoice } from "./addons";
import { getAiDocsChoice } from "./ai-docs";
import { getAstroIntegrationChoice } from "./astro-integration";
import { getCSSFrameworkChoice } from "./css-framework";
import { getDatabaseChoice } from "./database";
import { getDBSetupChoice } from "./database-setup";
import {
  getElixirApiChoice,
  getElixirAuthChoice,
  getElixirCachingChoice,
  getElixirDeployChoice,
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
  getGoCliChoice,
  getGoLoggingChoice,
  getGoOrmChoice,
  getGoWebFrameworkChoice,
} from "./go-ecosystem";
import { getinstallChoice } from "./install";
import {
  getJavaAuthChoice,
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
  getPythonTaskQueueChoice,
  getPythonValidationChoice,
  getPythonWebFrameworkChoice,
} from "./python-ecosystem";
import {
  getRustApiChoice,
  getRustAuthChoice,
  getRustCachingChoice,
  getRustCliChoice,
  getRustErrorHandlingChoice,
  getRustFrontendChoice,
  getRustLibrariesChoice,
  getRustLoggingChoice,
  getRustOrmChoice,
  getRustWebFrameworkChoice,
} from "./rust-ecosystem";
import { getShadcnOptions } from "./shadcn-options";
import { getUILibraryChoice } from "./ui-library";
import { getDeploymentChoice } from "./web-deploy";

type CompositionMode = "single" | "multi";
type BackendEcosystem = Extract<Ecosystem, "go" | "rust" | "python" | "java" | "elixir">;

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
    ? promptValue(await getUILibraryChoice(flags.uiLibrary, frontendList, astroIntegration))
    : "none";
  const shadcnOptions =
    uiLibrary === "shadcn-ui"
      ? await getShadcnOptions({
          shadcnBase: flags.shadcnBase,
          shadcnStyle: flags.shadcnStyle,
          shadcnIconLibrary: flags.shadcnIconLibrary,
          shadcnColorTheme: flags.shadcnColorTheme,
          shadcnBaseColor: flags.shadcnBaseColor,
          shadcnFont: flags.shadcnFont,
          shadcnRadius: flags.shadcnRadius,
        })
      : undefined;
  const cssFramework = hasWebStyling(frontendList)
    ? promptValue(await getCSSFrameworkChoice(flags.cssFramework, uiLibrary))
    : "none";

  const backendEcosystem = await selectBackendEcosystem();
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
      goWebFramework === "none" ? "none" : promptValue(await getGoCliChoice(flags.goCli));
    const goLogging =
      goWebFramework === "none" ? "none" : promptValue(await getGoLoggingChoice(flags.goLogging));
    Object.assign(backendChoices, { goWebFramework, goOrm, goApi, goAuth, goCli, goLogging });
    if (goWebFramework !== "none") stackPartSpecs.push(`backend:go:${goWebFramework}`);
    if (goOrm !== "none") stackPartSpecs.push(`backend.orm:go:${goOrm}`);
    if (goApi !== "none") stackPartSpecs.push(`backend.api:go:${goApi}`);
    if (goAuth !== "none") stackPartSpecs.push(`backend.auth:go:${goAuth}`);
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
      rustWebFramework === "none" ? "none" : promptValue(await getRustCliChoice(flags.rustCli));
    const rustLibraries =
      rustWebFramework === "none" ? [] : promptValue(await getRustLibrariesChoice(flags.rustLibraries));
    const rustLogging =
      rustWebFramework === "none"
        ? "none"
        : promptValue(await getRustLoggingChoice(flags.rustLogging));
    const rustErrorHandling = promptValue(
      await getRustErrorHandlingChoice(flags.rustErrorHandling),
    );
    const rustCaching =
      rustWebFramework === "none"
        ? "none"
        : promptValue(await getRustCachingChoice(flags.rustCaching));
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
    });
    if (rustWebFramework !== "none") stackPartSpecs.push(`backend:rust:${rustWebFramework}`);
    if (rustOrm !== "none") stackPartSpecs.push(`backend.orm:rust:${rustOrm}`);
    if (rustApi !== "none") stackPartSpecs.push(`backend.api:rust:${rustApi}`);
    if (rustAuth !== "none") stackPartSpecs.push(`backend.auth:rust:${rustAuth}`);
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
        : promptValue(await getPythonValidationChoice(flags.pythonValidation));
    const pythonAi =
      pythonWebFramework === "none" ? [] : promptValue(await getPythonAiChoice(flags.pythonAi));
    const pythonAuth =
      pythonWebFramework === "none"
        ? "none"
        : promptValue(await getPythonAuthChoice(flags.pythonAuth));
    const pythonTaskQueue =
      pythonWebFramework === "none"
        ? "none"
        : promptValue(await getPythonTaskQueueChoice(flags.pythonTaskQueue));
    const pythonGraphql =
      pythonWebFramework === "none"
        ? "none"
        : promptValue(await getPythonGraphqlChoice(flags.pythonGraphql));
    const pythonQuality =
      pythonWebFramework === "none"
        ? "none"
        : promptValue(await getPythonQualityChoice(flags.pythonQuality));
    Object.assign(backendChoices, {
      pythonWebFramework,
      pythonOrm,
      pythonValidation,
      pythonAi,
      pythonAuth,
      pythonTaskQueue,
      pythonGraphql,
      pythonQuality,
    });
    if (pythonWebFramework !== "none") stackPartSpecs.push(`backend:python:${pythonWebFramework}`);
    if (pythonOrm !== "none") stackPartSpecs.push(`backend.orm:python:${pythonOrm}`);
    if (pythonAuth !== "none") stackPartSpecs.push(`backend.auth:python:${pythonAuth}`);
    if (pythonTaskQueue !== "none") stackPartSpecs.push(`backend.jobQueue:python:${pythonTaskQueue}`);
    if (pythonGraphql !== "none") stackPartSpecs.push(`backend.api:python:${pythonGraphql}`);
  }

  if (backendEcosystem === "java") {
    const javaWebFramework = promptValue(await getJavaWebFrameworkChoice(flags.javaWebFramework));
    const javaBuildTool = promptValue(await getJavaBuildToolChoice(flags.javaBuildTool));
    if (javaWebFramework !== "none" && javaBuildTool !== "none") {
      const databaseConfig = await selectDatabaseConfig(flags);
      database = databaseConfig.database;
      dbSetup = databaseConfig.dbSetup;
    }
    const javaOrm =
      database === "none" || javaWebFramework !== "spring-boot" || javaBuildTool === "none"
        ? "none"
        : promptValue(await getJavaOrmChoice(flags.javaOrm));
    const javaAuth =
      javaWebFramework !== "spring-boot" || javaBuildTool === "none"
        ? "none"
        : promptValue(await getJavaAuthChoice(flags.javaAuth));
    const javaLibraries =
      javaWebFramework !== "spring-boot" || javaBuildTool === "none"
        ? []
        : promptValue(await getJavaLibrariesChoice(flags.javaLibraries));
    const javaTestingLibraries = promptValue(
      await getJavaTestingLibrariesChoice(flags.javaTestingLibraries),
    );
    Object.assign(backendChoices, {
      javaWebFramework,
      javaBuildTool,
      javaOrm,
      javaAuth,
      javaLibraries,
      javaTestingLibraries,
    });
    if (javaWebFramework !== "none") stackPartSpecs.push(`backend:java:${javaWebFramework}`);
    if (javaOrm !== "none") stackPartSpecs.push(`backend.orm:java:${javaOrm}`);
    if (javaAuth !== "none") stackPartSpecs.push(`backend.auth:java:${javaAuth}`);
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
        : promptValue(await getElixirRealtimeChoice(flags.elixirRealtime));
    const elixirJobs =
      elixirWebFramework === "none"
        ? "none"
        : promptValue(await getElixirJobsChoice(flags.elixirJobs));
    const elixirValidation =
      elixirWebFramework === "none"
        ? "none"
        : promptValue(await getElixirValidationChoice(flags.elixirValidation));
    const elixirHttp =
      elixirWebFramework === "none"
        ? "none"
        : promptValue(await getElixirHttpChoice(flags.elixirHttp));
    const elixirJson =
      elixirWebFramework === "none"
        ? "none"
        : promptValue(await getElixirJsonChoice(flags.elixirJson));
    const elixirEmail =
      elixirWebFramework === "none"
        ? "none"
        : promptValue(await getElixirEmailChoice(flags.elixirEmail));
    const elixirCaching =
      elixirWebFramework === "none"
        ? "none"
        : promptValue(await getElixirCachingChoice(flags.elixirCaching));
    const elixirObservability =
      elixirWebFramework === "none"
        ? "none"
        : promptValue(await getElixirObservabilityChoice(flags.elixirObservability));
    const elixirTesting =
      elixirWebFramework === "none"
        ? "none"
        : promptValue(await getElixirTestingChoice(flags.elixirTesting));
    const elixirQuality =
      elixirWebFramework === "none"
        ? "none"
        : promptValue(await getElixirQualityChoice(flags.elixirQuality));
    const elixirDeploy =
      elixirWebFramework === "none"
        ? "none"
        : promptValue(await getElixirDeployChoice(flags.elixirDeploy));
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
    });
    if (elixirWebFramework !== "none") {
      stackPartSpecs.push(`backend:elixir:${elixirWebFramework}`);
    }
    if (elixirOrm !== "none") stackPartSpecs.push(`backend.orm:elixir:${elixirOrm}`);
    if (elixirAuth !== "none") stackPartSpecs.push(`backend.auth:elixir:${elixirAuth}`);
    if (elixirApi !== "none") stackPartSpecs.push(`backend.api:elixir:${elixirApi}`);
    if (elixirRealtime !== "none") stackPartSpecs.push(`backend.api:elixir:${elixirRealtime}`);
    if (elixirJobs !== "none") stackPartSpecs.push(`backend.jobQueue:elixir:${elixirJobs}`);
    if (elixirEmail !== "none") stackPartSpecs.push(`backend.email:elixir:${elixirEmail}`);
    if (elixirCaching !== "none") stackPartSpecs.push(`backend.caching:elixir:${elixirCaching}`);
    if (elixirObservability !== "none") {
      stackPartSpecs.push(`backend.observability:elixir:${elixirObservability}`);
    }
    if (elixirTesting !== "none") stackPartSpecs.push(`backend.testing:elixir:${elixirTesting}`);
    if (elixirDeploy !== "none") stackPartSpecs.push(`backend.deploy:elixir:${elixirDeploy}`);
  }

  if (database !== "none") stackPartSpecs.push(`database:universal:${database}`);

  const stackParts = parseStackPartSpecs(stackPartSpecs, "selected");
  const graphPartial = stackPartsToLegacyProjectConfigPartial(stackParts);
  const addons = promptValue(
    await getAddonsChoice(flags.addons, frontendList, "none", "none", "bun"),
  );
  const webDeploy = promptValue(
    await getDeploymentChoice(flags.webDeploy, "bun", "none", frontendList),
  );
  const serverDeploy = await selectServerDeployment(flags.serverDeploy);
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
