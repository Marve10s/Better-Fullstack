import type {
  Database,
  Ecosystem,
  Frontend,
  KotlinMobileLibraries,
  ProjectConfig,
  ServerDeploy,
} from "@/types";

import { getDefaultConfig } from "@/constants";
import {
  getAddonStackPartBinding,
  parseStackPartSpecs,
  stackPartsToLegacyProjectConfigPartial,
} from "@/types";
import { hasWebStyling } from "@/config/compatibility-rules";
import { exitCancelled } from "@/presentation/errors";
import { getAddonsChoice, getAppPlatformsChoice } from "@/prompts/developer/addons";
import { getAnalyticsChoice } from "@/prompts/services/analytics";
import { getWebMcpChoice } from "@/prompts/services/web-mcp";
import { getAiDocsChoice } from "@/prompts/developer/ai-docs";
import { getAstroIntegrationChoice } from "@/prompts/developer/astro-integration";
import { getBackendFrameworkChoice } from "@/prompts/architecture/backend";
import { getBotProtectionChoice } from "@/prompts/services/bot-protection";
import { getApiChoice } from "@/prompts/architecture/api";
import { getAuthChoice } from "@/prompts/services/auth";
import { getORMChoice } from "@/prompts/data/orm";
import { getRuntimeChoice } from "@/prompts/architecture/runtime";
import { getPaymentsChoice } from "@/prompts/services/payments";
import { getEmailChoice } from "@/prompts/services/email";
import { getFileUploadChoice } from "@/prompts/data/file-upload";
import { getLoggingChoice } from "@/prompts/services/logging";
import { getObservabilityChoice } from "@/prompts/services/observability";
import { getAIChoice } from "@/prompts/services/ai";
import { getRealtimeChoice } from "@/prompts/services/realtime";
import { getJobQueueChoice } from "@/prompts/services/job-queue";
import { getCachingChoice } from "@/prompts/data/caching";
import { getRateLimitChoice } from "@/prompts/services/rate-limit";
import { getCMSChoice } from "@/prompts/services/cms";
import { getSearchChoice } from "@/prompts/data/search";
import { getVectorDbChoice } from "@/prompts/data/vector-db";
import { getFileStorageChoice } from "@/prompts/data/file-storage";
import { getIntegrationsChoice } from "@/prompts/services/integrations";
import { getEcommerceChoice } from "@/prompts/services/ecommerce";
import {
  type ConfigPromptKey,
  type ConfigScope,
  getConfigScopeChoice,
  getConfigSectionsChoice,
  getDefaultPromptValue,
  shouldAskConfigPromptKey,
} from "@/prompts/core/config-scope";
import { getCSSFrameworkChoice } from "@/prompts/developer/css-framework";
import { getDatabaseChoice } from "@/prompts/data/database";
import { getDBSetupChoice } from "@/prompts/data/database-setup";
import {
  getDotnetApiChoice,
  getDotnetAuthChoice,
  getDotnetCachingChoice,
  getDotnetValidationChoice,
  getDotnetDeployChoice,
  getDotnetJobQueueChoice,
  getDotnetLibrariesChoice,
  getDotnetObservabilityChoice,
  getDotnetOrmChoice,
  getDotnetRealtimeChoice,
  getDotnetTestingChoice,
  getDotnetWebFrameworkChoice,
} from "@/prompts/ecosystems/dotnet-ecosystem";
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
  getElixirI18nChoice,
  getElixirHttpServerChoice,
  getElixirApplicationFrameworkChoice,
  getElixirDocumentationChoice,
  getElixirClusteringChoice,
  getElixirRealtimeChoice,
  getElixirTestingChoice,
  getElixirValidationChoice,
  getElixirWebFrameworkChoice,
} from "@/prompts/ecosystems/elixir-ecosystem";
import { NATIVE_FRONTEND_PROMPT_OPTIONS, WEB_FRONTEND_PROMPT_OPTIONS } from "@/prompts/architecture/frontend";
import { getGitChoice } from "@/prompts/project/git";
import {
  getGoApiChoice,
  getGoAuthChoice,
  getGoCachingChoice,
  getGoCliChoice,
  getGoConfigChoice,
  getGoDIChoice,
  getGoLoggingChoice,
  getGoMigrationsChoice,
  getGoMessageQueueChoice,
  getGoObservabilityChoice,
  getGoOrmChoice,
  getGoProtoToolingChoice,
  getGoQualityChoice,
  getGoRealtimeChoice,
  getGoTemplatingChoice,
  getGoTestingChoice,
  getGoValidationChoice,
  getGoWebFrameworkChoice,
} from "@/prompts/ecosystems/go-ecosystem";
import { getinstallChoice } from "@/prompts/project/install";
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
} from "@/prompts/ecosystems/java-ecosystem";
import { isCancel, isGoBack, navigableMultiselect, navigableSelect } from "@/prompts/core/navigable";
import { getPackageManagerChoice } from "@/prompts/project/package-manager";
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
  getPythonCloudSdkChoice,
  getPythonDataChoice,
  getPythonHttpClientChoice,
  getPythonMediaChoice,
  getPythonMessageQueueChoice,
  getPythonPackageManagerChoice,
  getPythonServerChoice,
  getPythonTaskQueueChoice,
  getPythonValidationChoice,
  getPythonWebFrameworkChoice,
} from "@/prompts/ecosystems/python-ecosystem";
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
} from "@/prompts/ecosystems/rust-ecosystem";
import { getShadcnOptions, type ShadcnOptions } from "@/prompts/developer/shadcn-options";
import { getUILibraryChoice } from "@/prompts/developer/ui-library";
import { getDeploymentChoice } from "@/prompts/services/web-deploy";

type CompositionMode = "single" | "multi";
export type BackendEcosystem = Extract<
  Ecosystem,
  "typescript" | "go" | "rust" | "python" | "java" | "dotnet" | "elixir"
>;
export type FrontendEcosystem = "typescript" | "rust" | "dotnet";
export type MobileEcosystem = "none" | "react-native" | "kotlin" | "swift" | "dart";

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
        hint: "Compose web, backend, database, and mobile parts across ecosystems",
      },
    ],
    initialValue: "single",
  });

  if (isCancel(response) || isGoBack(response)) return exitCancelled("Operation cancelled");
  return response;
}

export async function selectBackendEcosystem(
  initialValue: BackendEcosystem = "go",
): Promise<BackendEcosystem> {
  const response = await navigableSelect<BackendEcosystem>({
    message: "Select backend ecosystem",
    options: [
      { value: "typescript", label: "TypeScript", hint: "Hono, Elysia, Fastify, and more" },
      { value: "go", label: "Go", hint: "Gin, Echo, Fiber, Chi" },
      { value: "rust", label: "Rust", hint: "Axum, Actix Web, Rocket" },
      { value: "python", label: "Python", hint: "FastAPI, Django, Flask" },
      { value: "java", label: "Java / Kotlin", hint: "Spring Boot, Ktor, Quarkus" },
      { value: "dotnet", label: ".NET", hint: "ASP.NET Core, EF Core, SignalR" },
      { value: "elixir", label: "Elixir", hint: "Phoenix, LiveView" },
    ],
    initialValue,
  });

  if (isCancel(response) || isGoBack(response)) return exitCancelled("Operation cancelled");
  return response;
}

export async function selectFrontendEcosystem(
  allowed: readonly FrontendEcosystem[] = ["typescript", "rust", "dotnet"],
): Promise<FrontendEcosystem> {
  const response = await navigableSelect<FrontendEcosystem>({
    message: "Select frontend ecosystem",
    options: (
      [
        { value: "typescript", label: "TypeScript", hint: "React, Vue, Svelte, Astro, and more" },
        { value: "rust", label: "Rust", hint: "Leptos, Dioxus, or Yew" },
        { value: "dotnet", label: ".NET", hint: "Blazor Web App or WebAssembly" },
      ] satisfies { value: FrontendEcosystem; label: string; hint: string }[]
    ).filter((option) => allowed.includes(option.value)),
    initialValue: "typescript",
  });

  if (isCancel(response) || isGoBack(response)) return exitCancelled("Operation cancelled");
  return response;
}

async function selectMobileEcosystem(): Promise<MobileEcosystem> {
  const response = await navigableSelect<MobileEcosystem>({
    message: "Add a mobile app?",
    options: [
      { value: "none", label: "None", hint: "Skip mobile app generation" },
      { value: "react-native", label: "React Native", hint: "Expo and React Native" },
      { value: "kotlin", label: "Kotlin", hint: "Jetpack Compose or Compose Multiplatform" },
      { value: "swift", label: "Swift", hint: "Native iOS with SwiftUI" },
      { value: "dart", label: "Flutter", hint: "Cross-platform iOS and Android with Dart" },
    ],
    initialValue: "none",
  });

  if (isCancel(response) || isGoBack(response)) return exitCancelled("Operation cancelled");
  return response;
}

export async function selectKotlinMobileLibraries(
  selected?: KotlinMobileLibraries[],
): Promise<KotlinMobileLibraries[]> {
  if (selected !== undefined) return selected.filter((library) => library !== "none");
  const response = await navigableMultiselect<KotlinMobileLibraries>({
    message: "Select Kotlin mobile libraries",
    required: false,
    initialValues: [],
    options: [
      { value: "navigation-compose", label: "Navigation Compose", hint: "Official Android navigation" },
      { value: "voyager", label: "Voyager", hint: "Multiplatform navigation" },
      { value: "koin", label: "Koin", hint: "Dependency injection" },
      { value: "ktor-client", label: "Ktor Client", hint: "Multiplatform HTTP client" },
      {
        value: "kotlinx-serialization-json",
        label: "Kotlinx Serialization JSON",
        hint: "Kotlin-first JSON serialization",
      },
      { value: "datastore", label: "DataStore", hint: "Local preferences storage" },
      { value: "coil", label: "Coil", hint: "Compose image loading" },
      { value: "mockk", label: "MockK", hint: "Kotlin mocking" },
      { value: "turbine", label: "Turbine", hint: "Flow testing" },
      { value: "junit5", label: "JUnit 5", hint: "JVM test engine" },
    ],
  });
  if (isCancel(response) || isGoBack(response)) return exitCancelled("Operation cancelled");
  return response.filter((library) => library !== "none");
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

export const MULTI_ECOSYSTEM_TYPESCRIPT_SECTION_IDS = [
  "app-platforms",
  "ui-styling",
  "frontend-security",
  "content",
  "deploy",
  "addons-examples",
] as const;

export async function gatherMultiEcosystemConfig(
  flags: Partial<ProjectConfig>,
  projectName: string,
  projectDir: string,
  relativePath: string,
): Promise<ProjectConfig> {
  const baseConfig = getDefaultConfig();
  const shouldPromptForScope = !hasMultiStackPromptFlags(flags);
  const configScope = shouldPromptForScope ? promptValue(await getConfigScopeChoice()) : "full";
  const typeScriptSections =
    configScope === "custom"
      ? promptValue(
          await getConfigSectionsChoice(
            "typescript",
            [],
            [...MULTI_ECOSYSTEM_TYPESCRIPT_SECTION_IDS],
          ),
        )
      : [];

  const frontendEcosystem = await selectFrontendEcosystem();
  const frontend =
    frontendEcosystem === "typescript"
      ? promptValue(
          await navigableSelect<Frontend>({
            message: "Select TypeScript web frontend",
            options: WEB_FRONTEND_PROMPT_OPTIONS,
            initialValue: flags.frontend?.[0] ?? "next",
          }),
        )
      : "none";
  const selectedRustFrontend =
    frontendEcosystem === "rust"
      ? promptValue(await getRustFrontendChoice(flags.rustFrontend))
      : "none";
  const selectedDotnetFrontend =
    frontendEcosystem === "dotnet"
      ? promptValue(
          await navigableSelect<"blazor-webassembly" | "blazor-web-app" | "none">({
            message: "Select .NET web frontend",
            options: [
              {
                value: "blazor-web-app",
                label: "Blazor Web App",
                hint: "Interactive server rendering on .NET 10",
              },
              {
                value: "blazor-webassembly",
                label: "Blazor WebAssembly",
                hint: "Client-side Razor components on .NET 10",
              },
              { value: "none", label: "None", hint: "Skip web frontend generation" },
            ],
            initialValue: flags.dotnetFrontend ?? "blazor-webassembly",
          }),
        )
      : "none";
  const frontendList = [frontend];
  const astroIntegration =
    frontend === "astro"
      ? promptValue(await getAstroIntegrationChoice(flags.astroIntegration))
      : undefined;
  const mobileEcosystem = await selectMobileEcosystem();
  const nativeFrontend =
    mobileEcosystem === "react-native"
      ? promptValue(
          await navigableSelect<Frontend>({
            message: "Select React Native app",
            options: NATIVE_FRONTEND_PROMPT_OPTIONS,
            initialValue: "native-bare",
          }),
        )
      : "none";
  const kotlinMobile =
    mobileEcosystem === "kotlin"
      ? promptValue(
          await navigableSelect<"jetpack-compose" | "compose-multiplatform" | "none">({
            message: "Select Kotlin app",
            options: [
              {
                value: "compose-multiplatform",
                label: "Compose Multiplatform",
                hint: "Shared UI for Android, iOS, and desktop",
              },
              {
                value: "jetpack-compose",
                label: "Jetpack Compose",
                hint: "Native Android application",
              },
              { value: "none", label: "None", hint: "Skip Kotlin app generation" },
            ],
            initialValue: flags.kotlinMobile ?? "jetpack-compose",
          }),
        )
      : "none";
  const swiftMobile = mobileEcosystem === "swift" ? "swiftui" : "none";
  const dartMobile = mobileEcosystem === "dart" ? "flutter" : "none";
  const kotlinMobileLibraries =
    kotlinMobile !== "none"
      ? await selectKotlinMobileLibraries(flags.kotlinMobileLibraries)
      : [];
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
        getCSSFrameworkChoice(flags.cssFramework, uiLibrary, frontendList),
      )
    : "none";
  const analytics =
    frontendEcosystem === "typescript"
      ? await scopedPromptValue("typescript", "analytics", configScope, typeScriptSections, () =>
          getAnalyticsChoice(flags.analytics, frontendList),
        )
      : "none";
  const webMcp =
    frontendEcosystem === "typescript"
      ? await scopedPromptValue("typescript", "webMcp", configScope, typeScriptSections, () =>
          getWebMcpChoice(flags.webMcp, frontendList),
        )
      : "none";
  const webDeploy = await scopedPromptValue(
    "typescript",
    "webDeploy",
    configScope,
    typeScriptSections,
    () => getDeploymentChoice(flags.webDeploy, "bun", "none", frontendList),
  );

  const backendEcosystem = await selectBackendEcosystem();
  const backendSections =
    configScope === "custom" ? promptValue(await getConfigSectionsChoice(backendEcosystem)) : [];
  const stackPartSpecs: string[] = [];
  if (frontendEcosystem === "rust" && selectedRustFrontend !== "none") {
    stackPartSpecs.push(`frontend:rust:${selectedRustFrontend}`);
  }
  if (frontendEcosystem === "typescript" && frontend !== "none") {
    stackPartSpecs.push(`frontend:typescript:${frontend}`);
    if (analytics !== "none") {
      stackPartSpecs.push(`frontend.analytics:typescript:${analytics}`);
    }
    if (webMcp !== "none") {
      stackPartSpecs.push(`frontend.webMcp:typescript:${webMcp}`);
    }
  }
  if (frontendEcosystem === "dotnet" && selectedDotnetFrontend !== "none") {
    stackPartSpecs.push(`frontend:dotnet:${selectedDotnetFrontend}`);
  }
  if (nativeFrontend !== "none") {
    stackPartSpecs.push(`mobile:react-native:${nativeFrontend}`);
    stackPartSpecs.push("mobile.navigation:react-native:expo-router");
    if (nativeFrontend === "native-uniwind") {
      stackPartSpecs.push("mobile.ui:react-native:uniwind");
    }
    if (nativeFrontend === "native-unistyles") {
      stackPartSpecs.push("mobile.ui:react-native:unistyles");
    }
  }
  if (kotlinMobile !== "none") {
    stackPartSpecs.push(`mobile:kotlin:${kotlinMobile}`);
    for (const library of kotlinMobileLibraries) {
      stackPartSpecs.push(`mobile.libraries:kotlin:${library}`);
    }
  }
  if (swiftMobile !== "none") {
    stackPartSpecs.push(`mobile:swift:${swiftMobile}`);
  }
  if (dartMobile !== "none") {
    stackPartSpecs.push(`mobile:dart:${dartMobile}`);
  }
  const backendChoices: Partial<ProjectConfig> = {};
  let database: Database = "none";
  let dbSetup: ProjectConfig["dbSetup"] = "none";

  if (backendEcosystem === "typescript") {
    const backend = promptValue(await getBackendFrameworkChoice(flags.backend, frontendList));
    const runtime =
      backend === "none" ? "none" : promptValue(await getRuntimeChoice(flags.runtime, backend));
    if (backend !== "none") {
      database = promptValue(await getDatabaseChoice(flags.database, backend, runtime));
      dbSetup = promptValue(
        await getDBSetupChoice(database, flags.dbSetup, flags.orm, backend, runtime),
      );
    }
    const orm =
      backend === "none" || database === "none"
        ? "none"
        : promptValue(await getORMChoice(flags.orm, true, database, backend, runtime));
    const api =
      backend === "none"
        ? "none"
        : promptValue(await getApiChoice(flags.api, frontendList, backend, astroIntegration));
    const auth =
      backend === "none"
        ? "none"
        : promptValue(await getAuthChoice(flags.auth, backend, frontendList));
    const payments =
      backend === "none"
        ? "none"
        : await scopedPromptValue("typescript", "payments", configScope, backendSections, () =>
            getPaymentsChoice(flags.payments, auth, backend, frontendList),
          );
    const email =
      backend === "none"
        ? "none"
        : await scopedPromptValue("typescript", "email", configScope, backendSections, () =>
            getEmailChoice(flags.email, backend, "typescript"),
          );
    const fileUpload =
      backend === "none"
        ? "none"
        : await scopedPromptValue("typescript", "fileUpload", configScope, backendSections, () =>
            getFileUploadChoice(flags.fileUpload, backend),
          );
    const logging =
      backend === "none"
        ? "none"
        : await scopedPromptValue("typescript", "logging", configScope, backendSections, () =>
            getLoggingChoice(flags.logging, backend),
          );
    const observability =
      backend === "none"
        ? "none"
        : await scopedPromptValue(
            "typescript",
            "observability",
            configScope,
            backendSections,
            () => getObservabilityChoice(flags.observability, backend, "typescript"),
          );
    const ai =
      backend === "none"
        ? "none"
        : await scopedPromptValue("typescript", "ai", configScope, backendSections, () =>
            getAIChoice(flags.ai, backend),
          );
    const realtime =
      backend === "none"
        ? "none"
        : await scopedPromptValue("typescript", "realtime", configScope, backendSections, () =>
            getRealtimeChoice(flags.realtime, backend),
          );
    const jobQueue =
      backend === "none"
        ? "none"
        : await scopedPromptValue("typescript", "jobQueue", configScope, backendSections, () =>
            getJobQueueChoice(flags.jobQueue, backend),
          );
    const caching =
      backend === "none"
        ? "none"
        : await scopedPromptValue("typescript", "caching", configScope, backendSections, () =>
            getCachingChoice(flags.caching, backend, "typescript"),
          );
    const rateLimit =
      backend === "none"
        ? "none"
        : await scopedPromptValue("typescript", "rateLimit", configScope, backendSections, () =>
            getRateLimitChoice(flags.rateLimit, backend),
          );
    const botProtection = await scopedPromptValue(
      "typescript",
      "botProtection",
      configScope,
      typeScriptSections,
      () => getBotProtectionChoice(flags.botProtection, frontendList, auth, backend, webDeploy),
    );
    const cms =
      backend === "none"
        ? "none"
        : await scopedPromptValue("typescript", "cms", configScope, backendSections, () =>
            getCMSChoice(flags.cms, backend, frontendList),
          );
    const search =
      backend === "none"
        ? "none"
        : await scopedPromptValue("typescript", "search", configScope, backendSections, () =>
            getSearchChoice(flags.search, backend, "typescript"),
          );
    const vectorDb =
      backend === "none"
        ? "none"
        : await scopedPromptValue("typescript", "vectorDb", configScope, backendSections, () =>
            getVectorDbChoice(flags.vectorDb, backend),
          );
    const fileStorage =
      backend === "none"
        ? "none"
        : await scopedPromptValue("typescript", "fileStorage", configScope, backendSections, () =>
            getFileStorageChoice(flags.fileStorage, backend),
          );
    const integrations =
      backend === "none"
        ? "none"
        : await scopedPromptValue(
            "typescript",
            "integrations",
            configScope,
            backendSections,
            () => getIntegrationsChoice(flags.integrations, backend, "typescript", runtime),
          );
    const ecommerce =
      backend === "none"
        ? "none"
        : await scopedPromptValue("typescript", "ecommerce", configScope, backendSections, () =>
            getEcommerceChoice(flags.ecommerce, backend, "typescript"),
          );

    Object.assign(backendChoices, {
      backend,
      runtime,
      orm,
      api,
      auth,
      payments,
      email,
      fileUpload,
      logging,
      observability,
      ai,
      realtime,
      jobQueue,
      caching,
      rateLimit,
      botProtection,
      cms,
      search,
      vectorDb,
      fileStorage,
      integrations,
      ecommerce,
    });
    if (backend !== "none") stackPartSpecs.push(`backend:typescript:${backend}`);
    if (orm !== "none") stackPartSpecs.push(`backend.orm:typescript:${orm}`);
    if (api !== "none") stackPartSpecs.push(`backend.api:typescript:${api}`);
    if (auth !== "none") stackPartSpecs.push(`backend.auth:typescript:${auth}`);
    for (const [role, value] of [
      ["runtime", runtime],
      ["payments", payments],
      ["email", email],
      ["fileUpload", fileUpload],
      ["logging", logging],
      ["observability", observability],
      ["ai", ai],
      ["realtime", realtime],
      ["jobQueue", jobQueue],
      ["caching", caching],
      ["rateLimit", rateLimit],
      ["cms", cms],
      ["search", search],
      ["vectorDb", vectorDb],
      ["fileStorage", fileStorage],
      ["integrations", integrations],
      ["ecommerce", ecommerce],
    ] as const) {
      if (value !== "none") stackPartSpecs.push(`backend.${role}:typescript:${value}`);
    }
    if (botProtection !== "none") {
      stackPartSpecs.push(`frontend.botProtection:typescript:${botProtection}`);
    }
  } else if (backendEcosystem === "go") {
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
    const goValidation =
      goWebFramework === "none"
        ? "none"
        : await scopedPromptValue("go", "goValidation", configScope, backendSections, () =>
            getGoValidationChoice(flags.goValidation),
          );
    const goQuality =
      goWebFramework === "none"
        ? "none"
        : await scopedPromptValue("go", "goQuality", configScope, backendSections, () =>
            getGoQualityChoice(flags.goQuality),
          );
    const goMigrations =
      goWebFramework === "none" || !["sqlite", "postgres", "mysql"].includes(database)
        ? "none"
        : await scopedPromptValue("go", "goMigrations", configScope, backendSections, () =>
            getGoMigrationsChoice(flags.goMigrations),
          );
    const goTemplating =
      goWebFramework === "none"
        ? "none"
        : await scopedPromptValue("go", "goTemplating", configScope, backendSections, () =>
            getGoTemplatingChoice(flags.goTemplating),
          );
    const goProtoTooling =
      goWebFramework === "none"
        ? "none"
        : await scopedPromptValue("go", "goProtoTooling", configScope, backendSections, () =>
            getGoProtoToolingChoice(flags.goProtoTooling),
          );
    const goDI =
      goWebFramework === "none"
        ? "none"
        : await scopedPromptValue("go", "goDI", configScope, backendSections, () =>
            getGoDIChoice(flags.goDI),
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
      goValidation,
      goQuality,
      goMigrations,
      goTemplating,
      goProtoTooling,
      goDI,
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
    if (goValidation !== "none") stackPartSpecs.push(`backend.validation:go:${goValidation}`);
    if (goQuality !== "none") stackPartSpecs.push(`backend.codeQuality:go:${goQuality}`);
    if (goMigrations !== "none") stackPartSpecs.push(`backend.migrations:go:${goMigrations}`);
    if (goTemplating !== "none") stackPartSpecs.push(`backend.templating:go:${goTemplating}`);
    if (goProtoTooling !== "none") stackPartSpecs.push(`backend.buildTool:go:${goProtoTooling}`);
    if (goDI !== "none") stackPartSpecs.push(`backend.libraries:go:${goDI}`);
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
    const pythonCloudSdk =
      pythonWebFramework === "none"
        ? "none"
        : await scopedPromptValue("python", "pythonCloudSdk", configScope, backendSections, () =>
            getPythonCloudSdkChoice(flags.pythonCloudSdk),
          );
    const pythonHttpClient =
      pythonWebFramework === "none"
        ? "none"
        : await scopedPromptValue("python", "pythonHttpClient", configScope, backendSections, () =>
            getPythonHttpClientChoice(flags.pythonHttpClient),
          );
    const pythonData =
      pythonWebFramework === "none"
        ? []
        : await scopedPromptValue("python", "pythonData", configScope, backendSections, () =>
            getPythonDataChoice(flags.pythonData),
          );
    const pythonMedia =
      pythonWebFramework === "none"
        ? "none"
        : await scopedPromptValue("python", "pythonMedia", configScope, backendSections, () =>
            getPythonMediaChoice(flags.pythonMedia),
          );
    const pythonServer =
      pythonWebFramework === "none"
        ? "none"
        : await scopedPromptValue("python", "pythonServer", configScope, backendSections, () =>
            getPythonServerChoice(flags.pythonServer),
          );
    const pythonPackageManager =
      pythonWebFramework === "none"
        ? "uv"
        : await scopedPromptValue(
            "python",
            "pythonPackageManager",
            configScope,
            backendSections,
            () => getPythonPackageManagerChoice(flags.pythonPackageManager),
          );
    const pythonMessageQueue =
      pythonWebFramework === "none"
        ? "none"
        : await scopedPromptValue(
            "python",
            "pythonMessageQueue",
            configScope,
            backendSections,
            () => getPythonMessageQueueChoice(flags.pythonMessageQueue),
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
      pythonCloudSdk,
      pythonHttpClient,
      pythonData,
      pythonMedia,
      pythonServer,
      pythonPackageManager,
      pythonMessageQueue,
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
    if (pythonCloudSdk !== "none") stackPartSpecs.push(`backend.cloudSdk:python:${pythonCloudSdk}`);
    if (pythonHttpClient !== "none")
      stackPartSpecs.push(`backend.httpClient:python:${pythonHttpClient}`);
    for (const data of pythonData) {
      if (data !== "none") stackPartSpecs.push(`backend.data:python:${data}`);
    }
    if (pythonMedia !== "none") stackPartSpecs.push(`backend.media:python:${pythonMedia}`);
    if (pythonServer !== "none") stackPartSpecs.push(`backend.server:python:${pythonServer}`);
    if (pythonPackageManager !== "none")
      stackPartSpecs.push(`backend.packageManager:python:${pythonPackageManager}`);
    if (pythonMessageQueue !== "none")
      stackPartSpecs.push(`backend.messageQueue:python:${pythonMessageQueue}`);
  }

  if (backendEcosystem === "java") {
    const javaWebFramework = promptValue(await getJavaWebFrameworkChoice(flags.javaWebFramework));
    const javaLanguage =
      javaWebFramework === "ktor"
        ? "kotlin"
        : javaWebFramework !== "spring-boot"
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
    const dotnetLibraries =
      dotnetWebFramework === "none"
        ? []
        : await scopedPromptValue("dotnet", "dotnetLibraries", configScope, backendSections, () =>
            getDotnetLibrariesChoice(flags.dotnetLibraries),
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
      dotnetLibraries,
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
    for (const library of dotnetLibraries) {
      if (library !== "none") stackPartSpecs.push(`backend.libraries:dotnet:${library}`);
    }
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
    const elixirI18n =
      elixirWebFramework === "none"
        ? "none"
        : await scopedPromptValue("elixir", "elixirI18n", configScope, backendSections, () =>
            getElixirI18nChoice(flags.elixirI18n),
          );
    const elixirHttpServer =
      elixirWebFramework === "none"
        ? "none"
        : await scopedPromptValue("elixir", "elixirHttpServer", configScope, backendSections, () =>
            getElixirHttpServerChoice(flags.elixirHttpServer),
          );
    const elixirApplicationFramework = await scopedPromptValue(
      "elixir",
      "elixirApplicationFramework",
      configScope,
      backendSections,
      () => getElixirApplicationFrameworkChoice(flags.elixirApplicationFramework),
    );
    const elixirDocumentation = await scopedPromptValue(
      "elixir",
      "elixirDocumentation",
      configScope,
      backendSections,
      () => getElixirDocumentationChoice(flags.elixirDocumentation),
    );
    const elixirClustering =
      elixirWebFramework === "none"
        ? "none"
        : await scopedPromptValue("elixir", "elixirClustering", configScope, backendSections, () =>
            getElixirClusteringChoice(flags.elixirClustering),
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
      elixirI18n,
      elixirHttpServer,
      elixirApplicationFramework,
      elixirDocumentation,
      elixirClustering,
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
    if (elixirI18n !== "none") stackPartSpecs.push(`backend.i18n:elixir:${elixirI18n}`);
    if (elixirHttpServer !== "none") {
      stackPartSpecs.push(`backend.runtime:elixir:${elixirHttpServer}`);
    }
    if (elixirApplicationFramework !== "none") {
      stackPartSpecs.push(`backend.libraries:elixir:${elixirApplicationFramework}`);
    }
    if (elixirDocumentation !== "none") {
      stackPartSpecs.push(`backend.documentation:elixir:${elixirDocumentation}`);
    }
    if (elixirClustering !== "none") {
      stackPartSpecs.push(`backend.config:elixir:${elixirClustering}`);
    }
    if (elixirDeploy !== "none") stackPartSpecs.push(`backend.deploy:elixir:${elixirDeploy}`);
    for (const library of elixirLibraries) {
      if (library !== "none") stackPartSpecs.push(`backend.libraries:elixir:${library}`);
    }
  }

  if (database !== "none") stackPartSpecs.push(`database:universal:${database}`);

  const baseStackParts = parseStackPartSpecs(stackPartSpecs, "selected");
  const graphPartial = stackPartsToLegacyProjectConfigPartial(baseStackParts);
  const appPlatforms = await scopedPromptValue(
    "typescript",
    "appPlatforms",
    configScope,
    typeScriptSections,
    () => getAppPlatformsChoice(flags.addons, frontendList),
  );
  const addons = await scopedPromptValue(
    "typescript",
    "addons",
    configScope,
    typeScriptSections,
    () =>
      getAddonsChoice(
        flags.addons,
        frontendList,
        "none",
        undefined,
        undefined,
        undefined,
        { ...graphPartial, ecosystem: backendEcosystem },
      ),
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
  const selectedAddons = Array.from(new Set([...appPlatforms, ...addons]));

  if (frontendEcosystem === "typescript" && frontendList[0] !== "none" && webDeploy !== "none") {
    stackPartSpecs.push(`frontend.deploy:typescript:${webDeploy}`);
  }
  if (
    backendEcosystem === "typescript" &&
    backendChoices.backend !== "none" &&
    serverDeploy !== "none"
  ) {
    stackPartSpecs.push(`backend.deploy:typescript:${serverDeploy}`);
  }
  for (const addon of selectedAddons) {
    const binding = getAddonStackPartBinding(addon);
    if (!binding) continue;
    const rolePath = binding.ownerRole ? `${binding.ownerRole}.${binding.role}` : binding.role;
    stackPartSpecs.push(`${rolePath}:${binding.ecosystem}:${addon}`);
  }
  const stackParts = parseStackPartSpecs(Array.from(new Set(stackPartSpecs)), "selected");

  return {
    ...baseConfig,
    ...flags,
    ...graphPartial,
    ...backendChoices,
    projectName,
    projectDir,
    relativePath,
    ecosystem: "typescript",
    frontend:
      frontendEcosystem === "typescript"
        ? nativeFrontend === "none"
          ? frontendList
          : [...frontendList, nativeFrontend]
        : nativeFrontend === "none"
          ? ["none"]
          : [nativeFrontend],
    backend: backendEcosystem === "typescript" ? (backendChoices.backend ?? "none") : "none",
    runtime: backendEcosystem === "typescript" ? (backendChoices.runtime ?? "none") : "none",
    database,
    orm: backendEcosystem === "typescript" ? (backendChoices.orm ?? "none") : "none",
    api: backendEcosystem === "typescript" ? (backendChoices.api ?? "none") : "none",
    auth: backendEcosystem === "typescript" ? (backendChoices.auth ?? "none") : "none",
    rustFrontend: selectedRustFrontend,
    dotnetFrontend: selectedDotnetFrontend,
    kotlinMobile,
    kotlinMobileLibraries,
    swiftMobile,
    dartMobile,
    astroIntegration,
    uiLibrary,
    ...shadcnOptions,
    cssFramework,
    analytics,
    webMcp,
    addons: selectedAddons,
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
