import type {
  Addons,
  AI,
  AiDocs,
  Analytics,
  Animation,
  API,
  AstroIntegration,
  Auth,
  Backend,
  Caching,
  CMS,
  CSSFramework,
  DotnetApi,
  DotnetAuth,
  DotnetCaching,
  DotnetValidation,
  DotnetDeploy,
  DotnetJobQueue,
  DotnetObservability,
  DotnetOrm,
  DotnetRealtime,
  DotnetTesting,
  DotnetWebFramework,
  ElixirApi,
  ElixirAuth,
  ElixirCaching,
  ElixirDeploy,
  ElixirLibraries,
  ElixirEmail,
  ElixirHttp,
  ElixirJobs,
  ElixirJson,
  ElixirObservability,
  ElixirOrm,
  ElixirQuality,
  ElixirRealtime,
  ElixirTesting,
  ElixirValidation,
  ElixirWebFramework,
  I18n,
  Database,
  DatabaseSetup,
  Ecosystem,
  Effect,
  Email,
  Examples,
  FeatureFlags,
  FileUpload,
  Forms,
  Frontend,
  GoApi,
  GoAuth,
  GoCaching,
  GoCli,
  GoConfig,
  GoLogging,
  GoMessageQueue,
  GoObservability,
  GoOrm,
  GoRealtime,
  GoTesting,
  GoWebFramework,
  JavaAuth,
  JavaApi,
  JavaLogging,
  JavaBuildTool,
  JavaLibraries,
  JavaOrm,
  JavaTestingLibraries,
  JavaWebFramework,
  JobQueue,
  Logging,
  MobileDeepLinking,
  MobileNavigation,
  MobileOTA,
  MobilePush,
  MobileStorage,
  MobileTesting,
  MobileUI,
  Observability,
  ORM,
  PackageManager,
  Payments,
  ProjectConfig,
  RateLimit,
  PythonAi,
  PythonApi,
  PythonAuth,
  PythonOrm,
  PythonQuality,
  PythonTesting,
  PythonCaching,
  PythonRealtime,
  PythonObservability,
  PythonCli,
  PythonGraphql,
  PythonTaskQueue,
  PythonValidation,
  PythonWebFramework,
  Realtime,
  RustApi,
  RustCli,
  RustErrorHandling,
  RustCaching,
  RustAuth,
  RustRealtime,
  RustMessageQueue,
  RustObservability,
  RustTemplating,
  RustFrontend,
  RustLibraries,
  RustLogging,
  RustOrm,
  RustWebFramework,
  Runtime,
  Search,
  VectorDb,
  FileStorage,
  ServerDeploy,
  StateManagement,
  Testing,
  UILibrary,
  Validation,
  WebDeploy,
} from "../types";

import { hasWebStyling, requiresChatSdkVercelAI } from "../utils/compatibility-rules";
import { exitCancelled } from "../utils/errors";
import { getUserPkgManager } from "../utils/get-package-manager";
import { getAddonsChoice } from "./addons";
import { getAIChoice } from "./ai";
import { getAiDocsChoice } from "./ai-docs";
import { getAnimationChoice } from "./animation";
import { getApiChoice } from "./api";
import { getAstroIntegrationChoice } from "./astro-integration";
import { getAuthChoice } from "./auth";
import { getBackendFrameworkChoice } from "./backend";
import { getCachingChoice } from "./caching";
import { getCMSChoice } from "./cms";
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
import { getEcosystemChoice } from "./ecosystem";
import { getEffectChoice } from "./effect";
import { getEmailChoice } from "./email";
import { getExamplesChoice } from "./examples";
import { getFileStorageChoice } from "./file-storage";
import { getFileUploadChoice } from "./file-upload";
import { getFormsChoice } from "./forms";
import { getFrontendChoice, getNativeFrontendChoice } from "./frontend";
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
import { getI18nChoice } from "./i18n";
import { getinstallChoice } from "./install";
import {
  getJavaAuthChoice,
  getJavaApiChoice,
  getJavaLoggingChoice,
  getJavaBuildToolChoice,
  getJavaLibrariesChoice,
  getJavaOrmChoice,
  getJavaTestingLibrariesChoice,
  getJavaWebFrameworkChoice,
} from "./java-ecosystem";
import { getJobQueueChoice } from "./job-queue";
import { getLoggingChoice } from "./logging";
import {
  getMobileDeepLinkingChoice,
  getMobileNavigationChoice,
  getMobileOTAChoice,
  getMobilePushChoice,
  getMobileStorageChoice,
  getMobileTestingChoice,
  getMobileUIChoice,
} from "./mobile";
import {
  gatherMultiEcosystemConfig,
  getCompositionModeChoice,
} from "./multi-ecosystem-composer";
import { navigableGroup } from "./navigable-group";
import { getObservabilityChoice } from "./observability";
import { getORMChoice } from "./orm";
import { getPackageManagerChoice } from "./package-manager";
import { getPaymentsChoice } from "./payments";
import { getRateLimitChoice } from "./rate-limit";
import {
  getPythonAiChoice,
  getPythonApiChoice,
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
import { getRealtimeChoice } from "./realtime";
import { getRuntimeChoice } from "./runtime";
import {
  getRustApiChoice,
  getRustCliChoice,
  getRustFrontendChoice,
  getRustLibrariesChoice,
  getRustLoggingChoice,
  getRustErrorHandlingChoice,
  getRustCachingChoice,
  getRustAuthChoice,
  getRustRealtimeChoice,
  getRustMessageQueueChoice,
  getRustObservabilityChoice,
  getRustTemplatingChoice,
  getRustOrmChoice,
  getRustWebFrameworkChoice,
} from "./rust-ecosystem";
import { getSearchChoice } from "./search";
import { getVectorDbChoice } from "./vector-db";
import { getServerDeploymentChoice } from "./server-deploy";
import { getShadcnOptions, type ShadcnOptions } from "./shadcn-options";
import { getStateManagementChoice } from "./state-management";
import { getTestingChoice } from "./testing";
import { getUILibraryChoice } from "./ui-library";
import { getValidationChoice } from "./validation";
import { getDeploymentChoice } from "./web-deploy";

type PromptGroupResults = {
  // Ecosystem choice first
  ecosystem: Ecosystem;
  // TypeScript ecosystem
  frontend: Frontend[];
  astroIntegration: AstroIntegration | undefined;
  uiLibrary: UILibrary;
  shadcnOptions: ShadcnOptions | undefined;
  cssFramework: CSSFramework;
  backend: Backend;
  runtime: Runtime;
  database: Database;
  orm: ORM;
  api: API;
  auth: Auth;
  payments: Payments;
  email: Email;
  effect: Effect;
  addons: Addons[];
  examples: Examples[];
  dbSetup: DatabaseSetup;
  webDeploy: WebDeploy;
  serverDeploy: ServerDeploy;
  ai: AI;
  validation: Validation;
  forms: Forms;
  stateManagement: StateManagement;
  animation: Animation;
  testing: Testing;
  realtime: Realtime;
  jobQueue: JobQueue;
  fileUpload: FileUpload;
  logging: Logging;
  observability: Observability;
  featureFlags: FeatureFlags;
  analytics: Analytics;
  cms: CMS;
  caching: Caching;
  rateLimit: RateLimit;
  i18n: I18n;
  search: Search;
  vectorDb: VectorDb;
  fileStorage: FileStorage;
  mobileNavigation: MobileNavigation;
  mobileUI: MobileUI;
  mobileStorage: MobileStorage;
  mobileTesting: MobileTesting;
  mobilePush: MobilePush;
  mobileOTA: MobileOTA;
  mobileDeepLinking: MobileDeepLinking;
  // Rust ecosystem
  rustWebFramework: RustWebFramework;
  rustFrontend: RustFrontend;
  rustOrm: RustOrm;
  rustApi: RustApi;
  rustCli: RustCli;
  rustLibraries: RustLibraries[];
  rustLogging: RustLogging;
  rustErrorHandling: RustErrorHandling;
  rustCaching: RustCaching;
  rustAuth: RustAuth;
  rustRealtime: RustRealtime;
  rustMessageQueue: RustMessageQueue;
  rustObservability: RustObservability;
  rustTemplating: RustTemplating;
  // Python ecosystem
  pythonWebFramework: PythonWebFramework;
  pythonOrm: PythonOrm;
  pythonValidation: PythonValidation;
  pythonAi: PythonAi[];
  pythonAuth: PythonAuth;
  pythonApi: PythonApi;
  pythonTaskQueue: PythonTaskQueue;
  pythonGraphql: PythonGraphql;
  pythonQuality: PythonQuality;
  pythonTesting: PythonTesting[];
  pythonCaching: PythonCaching;
  pythonRealtime: PythonRealtime;
  pythonObservability: PythonObservability;
  pythonCli: PythonCli[];
  // Go ecosystem
  goWebFramework: GoWebFramework;
  goOrm: GoOrm;
  goApi: GoApi;
  goCli: GoCli;
  goLogging: GoLogging;
  goAuth: GoAuth;
  goTesting: GoTesting[];
  goRealtime: GoRealtime;
  goMessageQueue: GoMessageQueue;
  goCaching: GoCaching;
  goConfig: GoConfig;
  goObservability: GoObservability;
  // Java ecosystem
  javaWebFramework: JavaWebFramework;
  javaBuildTool: JavaBuildTool;
  javaOrm: JavaOrm;
  javaAuth: JavaAuth;
  javaApi: JavaApi;
  javaLogging: JavaLogging;
  javaLibraries: JavaLibraries[];
  javaTestingLibraries: JavaTestingLibraries[];
  // .NET ecosystem
  dotnetWebFramework: DotnetWebFramework;
  dotnetOrm: DotnetOrm;
  dotnetAuth: DotnetAuth;
  dotnetApi: DotnetApi;
  dotnetTesting: DotnetTesting[];
  dotnetJobQueue: DotnetJobQueue;
  dotnetRealtime: DotnetRealtime;
  dotnetObservability: DotnetObservability[];
  dotnetValidation: DotnetValidation;
  dotnetCaching: DotnetCaching;
  dotnetDeploy: DotnetDeploy;
  // Elixir ecosystem
  elixirWebFramework: ElixirWebFramework;
  elixirOrm: ElixirOrm;
  elixirAuth: ElixirAuth;
  elixirApi: ElixirApi;
  elixirRealtime: ElixirRealtime;
  elixirJobs: ElixirJobs;
  elixirValidation: ElixirValidation;
  elixirHttp: ElixirHttp;
  elixirJson: ElixirJson;
  elixirEmail: ElixirEmail;
  elixirCaching: ElixirCaching;
  elixirObservability: ElixirObservability;
  elixirTesting: ElixirTesting;
  elixirQuality: ElixirQuality;
  elixirDeploy: ElixirDeploy;
  elixirLibraries: ElixirLibraries[];
  // Keep at end
  aiDocs: AiDocs[];
  git: boolean;
  packageManager: PackageManager;
  install: boolean;
};

export async function gatherConfig(
  flags: Partial<ProjectConfig>,
  projectName: string,
  projectDir: string,
  relativePath: string,
) {
  if (flags.ecosystem === undefined && flags.stackParts === undefined) {
    const compositionMode = await getCompositionModeChoice();
    if (compositionMode === "multi") {
      return gatherMultiEcosystemConfig(flags, projectName, projectDir, relativePath);
    }
  }

  const result = await navigableGroup<PromptGroupResults>(
    {
      // Ecosystem choice first
      ecosystem: () => getEcosystemChoice(flags.ecosystem),
      // TypeScript ecosystem prompts (skip if Rust or Python)
      frontend: ({ results }) => {
        if (results.ecosystem === "react-native") {
          return getNativeFrontendChoice(flags.frontend);
        }
        if (results.ecosystem !== "typescript") return Promise.resolve([] as Frontend[]);
        return getFrontendChoice(flags.frontend, flags.backend, flags.auth);
      },
      astroIntegration: ({ results }) => {
        if (results.ecosystem !== "typescript") return Promise.resolve(undefined);
        if (results.frontend?.includes("astro")) {
          return getAstroIntegrationChoice(flags.astroIntegration);
        }
        return Promise.resolve(undefined);
      },
      uiLibrary: ({ results }) => {
        if (results.ecosystem !== "typescript") return Promise.resolve("none" as UILibrary);
        if (hasWebStyling(results.frontend)) {
          return getUILibraryChoice(flags.uiLibrary, results.frontend, results.astroIntegration);
        }
        return Promise.resolve("none" as UILibrary);
      },
      shadcnOptions: ({ results }) => {
        if (results.uiLibrary !== "shadcn-ui") return Promise.resolve(undefined);
        return getShadcnOptions({
          shadcnBase: flags.shadcnBase,
          shadcnStyle: flags.shadcnStyle,
          shadcnIconLibrary: flags.shadcnIconLibrary,
          shadcnColorTheme: flags.shadcnColorTheme,
          shadcnBaseColor: flags.shadcnBaseColor,
          shadcnFont: flags.shadcnFont,
          shadcnRadius: flags.shadcnRadius,
        });
      },
      cssFramework: ({ results }) => {
        if (results.ecosystem !== "typescript") return Promise.resolve("none" as CSSFramework);
        if (hasWebStyling(results.frontend)) {
          return getCSSFrameworkChoice(flags.cssFramework, results.uiLibrary);
        }
        return Promise.resolve("none" as CSSFramework);
      },
      backend: ({ results }) => {
        if (results.ecosystem !== "typescript") return Promise.resolve("none" as Backend);
        return getBackendFrameworkChoice(flags.backend, results.frontend);
      },
      runtime: ({ results }) => {
        if (results.ecosystem !== "typescript") return Promise.resolve("none" as Runtime);
        return getRuntimeChoice(flags.runtime, results.backend);
      },
      database: ({ results }) => {
        if (results.ecosystem !== "typescript") {
          if (results.ecosystem === "python" || results.ecosystem === "dotnet") {
            return Promise.resolve((flags.database ?? "none") as Database);
          }
          return Promise.resolve("none" as Database);
        }
        return getDatabaseChoice(flags.database, results.backend, results.runtime);
      },
      orm: ({ results }) => {
        if (results.ecosystem !== "typescript") return Promise.resolve("none" as ORM);
        return getORMChoice(
          flags.orm,
          results.database !== "none",
          results.database,
          results.backend,
          results.runtime,
        );
      },
      api: ({ results }) => {
        if (results.ecosystem !== "typescript") return Promise.resolve("none" as API);
        return getApiChoice(
          flags.api,
          results.frontend,
          results.backend,
          results.astroIntegration,
        ) as Promise<API>;
      },
      auth: ({ results }) => {
        if (results.ecosystem === "typescript") {
          return getAuthChoice(flags.auth, results.backend, results.frontend, "typescript");
        }
        if (results.ecosystem === "react-native") {
          return Promise.resolve((flags.auth ?? "none") as Auth);
        }
        if (results.ecosystem === "go") {
          return getAuthChoice(flags.auth, undefined, undefined, "go");
        }
        return Promise.resolve("none" as Auth);
      },
      payments: ({ results }) => {
        if (results.ecosystem !== "typescript") return Promise.resolve("none" as Payments);
        return getPaymentsChoice(flags.payments, results.auth, results.backend, results.frontend);
      },
      email: ({ results }) => {
        if (results.ecosystem === "react-native" || results.ecosystem === "elixir") {
          return Promise.resolve("none" as Email);
        }
        return getEmailChoice(flags.email, results.backend, results.ecosystem);
      },
      effect: ({ results }) => {
        if (results.ecosystem !== "typescript") return Promise.resolve("none" as Effect);
        return getEffectChoice(flags.effect);
      },
        addons: ({ results }) => {
          if (results.ecosystem !== "typescript") {
            const nonTypeScriptAddons = (flags.addons ?? []).filter(
              (addon): addon is Addons =>
                addon === "docker-compose" ||
                addon === "devcontainer" ||
                addon === "github-actions",
            );
            return Promise.resolve(nonTypeScriptAddons);
          }
        return getAddonsChoice(
          flags.addons,
          results.frontend,
          results.auth,
          results.backend,
          results.runtime,
        );
      },
      examples: ({ results }) => {
        if (results.ecosystem !== "typescript") return Promise.resolve([] as Examples[]);
        return getExamplesChoice(
          flags.examples,
          results.frontend,
          results.backend,
          results.runtime,
        ) as Promise<Examples[]>;
      },
      dbSetup: ({ results }) => {
        if (results.ecosystem !== "typescript") return Promise.resolve("none" as DatabaseSetup);
        return getDBSetupChoice(
          results.database ?? "none",
          flags.dbSetup,
          results.orm,
          results.backend,
          results.runtime,
        );
      },
      webDeploy: ({ results }) => {
        if (results.ecosystem !== "typescript") return Promise.resolve("none" as WebDeploy);
        return getDeploymentChoice(
          flags.webDeploy,
          results.runtime,
          results.backend,
          results.frontend,
        );
      },
      serverDeploy: ({ results }) => {
        if (results.ecosystem !== "typescript") return Promise.resolve("none" as ServerDeploy);
        return getServerDeploymentChoice(
          flags.serverDeploy,
          results.runtime,
          results.backend,
          results.webDeploy,
        );
      },
      // TypeScript-specific prompts
      ai: ({ results }) => {
        if (results.ecosystem !== "typescript") return Promise.resolve("none" as AI);
        if (
          flags.ai === undefined &&
          results.examples?.includes("chat-sdk") &&
          requiresChatSdkVercelAI(results.backend, results.frontend, results.runtime)
        ) {
          return Promise.resolve("vercel-ai" as AI);
        }
        return getAIChoice(flags.ai);
      },
      validation: ({ results }) => {
        if (results.ecosystem !== "typescript") return Promise.resolve("none" as Validation);
        return getValidationChoice(flags.validation);
      },
      forms: ({ results }) => {
        if (results.ecosystem !== "typescript") return Promise.resolve("none" as Forms);
        return getFormsChoice(flags.forms, results.frontend);
      },
      stateManagement: ({ results }) => {
        if (results.ecosystem !== "typescript") return Promise.resolve("none" as StateManagement);
        return getStateManagementChoice(flags.stateManagement, results.frontend);
      },
      animation: ({ results }) => {
        if (results.ecosystem !== "typescript") return Promise.resolve("none" as Animation);
        return getAnimationChoice(flags.animation, results.frontend);
      },
      testing: ({ results }) => {
        if (results.ecosystem !== "typescript") return Promise.resolve("none" as Testing);
        return getTestingChoice(flags.testing);
      },
      realtime: ({ results }) => {
        if (results.ecosystem !== "typescript") return Promise.resolve("none" as Realtime);
        return getRealtimeChoice(flags.realtime, results.backend);
      },
      jobQueue: ({ results }) => {
        if (results.ecosystem !== "typescript") return Promise.resolve("none" as JobQueue);
        return getJobQueueChoice(flags.jobQueue, results.backend);
      },
      fileUpload: ({ results }) => {
        if (results.ecosystem !== "typescript") return Promise.resolve("none" as FileUpload);
        return getFileUploadChoice(flags.fileUpload, results.backend);
      },
      logging: ({ results }) => {
        if (results.ecosystem !== "typescript") return Promise.resolve("none" as Logging);
        return getLoggingChoice(flags.logging, results.backend);
      },
      observability: ({ results }) => {
        if (results.ecosystem === "react-native" || results.ecosystem === "elixir") {
          return Promise.resolve("none" as Observability);
        }
        return getObservabilityChoice(
          flags.observability,
          results.backend,
          results.ecosystem,
        );
      },
      featureFlags: ({ results }) => {
        if (results.ecosystem !== "typescript") return Promise.resolve("none" as FeatureFlags);
        return Promise.resolve(flags.featureFlags || "none") as Promise<FeatureFlags>;
      },
      analytics: ({ results }) => {
        if (results.ecosystem !== "typescript") return Promise.resolve("none" as Analytics);
        return Promise.resolve(flags.analytics || "none") as Promise<Analytics>;
      },
      cms: ({ results }) => {
        if (results.ecosystem !== "typescript") return Promise.resolve("none" as CMS);
        return getCMSChoice(flags.cms, results.backend);
      },
      caching: ({ results }) => {
        if (results.ecosystem === "react-native" || results.ecosystem === "elixir") {
          return Promise.resolve("none" as Caching);
        }
        return getCachingChoice(flags.caching, results.backend, results.ecosystem);
      },
      rateLimit: ({ results }) => {
        if (results.ecosystem !== "typescript") return Promise.resolve("none" as RateLimit);
        return getRateLimitChoice(flags.rateLimit, results.backend);
      },
      i18n: ({ results }) => {
        if (results.ecosystem !== "typescript") return Promise.resolve("none" as I18n);
        return getI18nChoice(flags.i18n, results.frontend);
      },
      search: ({ results }) => {
        if (results.ecosystem === "react-native" || results.ecosystem === "elixir") {
          return Promise.resolve("none" as Search);
        }
        return getSearchChoice(flags.search, results.backend, results.ecosystem);
      },
      vectorDb: ({ results }) => {
        if (results.ecosystem !== "typescript") {
          return Promise.resolve("none" as VectorDb);
        }
        return getVectorDbChoice(flags.vectorDb, results.backend, results.ecosystem);
      },
      fileStorage: ({ results }) => {
        if (results.ecosystem !== "typescript") return Promise.resolve("none" as FileStorage);
        return getFileStorageChoice(flags.fileStorage, results.backend);
      },
      mobileNavigation: ({ results }) => {
        if (results.ecosystem !== "typescript" && results.ecosystem !== "react-native") {
          return Promise.resolve("none" as MobileNavigation);
        }
        if (!results.frontend?.some((frontend) => frontend.startsWith("native-"))) {
          return Promise.resolve("none" as MobileNavigation);
        }
        return getMobileNavigationChoice(flags.mobileNavigation);
      },
      mobileUI: ({ results }) => {
        if (results.ecosystem !== "typescript" && results.ecosystem !== "react-native") {
          return Promise.resolve("none" as MobileUI);
        }
        if (!results.frontend?.some((frontend) => frontend.startsWith("native-"))) {
          return Promise.resolve("none" as MobileUI);
        }
        if (results.frontend.includes("native-uniwind")) return Promise.resolve("uniwind" as MobileUI);
        if (results.frontend.includes("native-unistyles")) {
          return Promise.resolve("unistyles" as MobileUI);
        }
        return getMobileUIChoice(flags.mobileUI);
      },
      mobileStorage: ({ results }) => {
        if (results.ecosystem !== "typescript" && results.ecosystem !== "react-native") {
          return Promise.resolve("none" as MobileStorage);
        }
        if (!results.frontend?.some((frontend) => frontend.startsWith("native-"))) {
          return Promise.resolve("none" as MobileStorage);
        }
        return getMobileStorageChoice(flags.mobileStorage);
      },
      mobileTesting: ({ results }) => {
        if (results.ecosystem !== "typescript" && results.ecosystem !== "react-native") {
          return Promise.resolve("none" as MobileTesting);
        }
        if (!results.frontend?.some((frontend) => frontend.startsWith("native-"))) {
          return Promise.resolve("none" as MobileTesting);
        }
        return getMobileTestingChoice(flags.mobileTesting);
      },
      mobilePush: ({ results }) => {
        if (results.ecosystem !== "typescript" && results.ecosystem !== "react-native") {
          return Promise.resolve("none" as MobilePush);
        }
        if (!results.frontend?.some((frontend) => frontend.startsWith("native-"))) {
          return Promise.resolve("none" as MobilePush);
        }
        return getMobilePushChoice(flags.mobilePush);
      },
      mobileOTA: ({ results }) => {
        if (results.ecosystem !== "typescript" && results.ecosystem !== "react-native") {
          return Promise.resolve("none" as MobileOTA);
        }
        if (!results.frontend?.some((frontend) => frontend.startsWith("native-"))) {
          return Promise.resolve("none" as MobileOTA);
        }
        return getMobileOTAChoice(flags.mobileOTA);
      },
      mobileDeepLinking: ({ results }) => {
        if (results.ecosystem !== "typescript" && results.ecosystem !== "react-native") {
          return Promise.resolve("none" as MobileDeepLinking);
        }
        if (!results.frontend?.some((frontend) => frontend.startsWith("native-"))) {
          return Promise.resolve("none" as MobileDeepLinking);
        }
        return getMobileDeepLinkingChoice(flags.mobileDeepLinking);
      },
      // Rust ecosystem prompts (skip if TypeScript or Python)
      rustWebFramework: ({ results }) => {
        if (results.ecosystem !== "rust") return Promise.resolve("none" as RustWebFramework);
        return getRustWebFrameworkChoice(flags.rustWebFramework);
      },
      rustFrontend: ({ results }) => {
        if (results.ecosystem !== "rust") return Promise.resolve("none" as RustFrontend);
        return getRustFrontendChoice(flags.rustFrontend);
      },
      rustOrm: ({ results }) => {
        if (results.ecosystem !== "rust") return Promise.resolve("none" as RustOrm);
        return getRustOrmChoice(flags.rustOrm);
      },
      rustApi: ({ results }) => {
        if (results.ecosystem !== "rust") return Promise.resolve("none" as RustApi);
        return getRustApiChoice(flags.rustApi);
      },
      rustCli: ({ results }) => {
        if (results.ecosystem !== "rust") return Promise.resolve("none" as RustCli);
        return getRustCliChoice(flags.rustCli);
      },
      rustLibraries: ({ results }) => {
        if (results.ecosystem !== "rust") return Promise.resolve([] as RustLibraries[]);
        return getRustLibrariesChoice(flags.rustLibraries);
      },
      rustLogging: ({ results }) => {
        if (results.ecosystem !== "rust") return Promise.resolve("none" as RustLogging);
        return getRustLoggingChoice(flags.rustLogging);
      },
      rustErrorHandling: ({ results }) => {
        if (results.ecosystem !== "rust") return Promise.resolve("none" as RustErrorHandling);
        return getRustErrorHandlingChoice(flags.rustErrorHandling);
      },
      rustCaching: ({ results }) => {
        if (results.ecosystem !== "rust") return Promise.resolve("none" as RustCaching);
        return getRustCachingChoice(flags.rustCaching);
      },
      rustAuth: ({ results }) => {
        if (results.ecosystem !== "rust") return Promise.resolve("none" as RustAuth);
        return getRustAuthChoice(flags.rustAuth);
      },
      rustRealtime: ({ results }) => {
        if (results.ecosystem !== "rust") return Promise.resolve("none" as RustRealtime);
        return getRustRealtimeChoice(flags.rustRealtime);
      },
      rustMessageQueue: ({ results }) => {
        if (results.ecosystem !== "rust") return Promise.resolve("none" as RustMessageQueue);
        return getRustMessageQueueChoice(flags.rustMessageQueue);
      },
      rustObservability: ({ results }) => {
        if (results.ecosystem !== "rust") return Promise.resolve("none" as RustObservability);
        return getRustObservabilityChoice(flags.rustObservability);
      },
      rustTemplating: ({ results }) => {
        if (results.ecosystem !== "rust") return Promise.resolve("none" as RustTemplating);
        return getRustTemplatingChoice(flags.rustTemplating);
      },
      // Python ecosystem prompts (skip if TypeScript or Rust)
      pythonWebFramework: ({ results }) => {
        if (results.ecosystem !== "python") return Promise.resolve("none" as PythonWebFramework);
        return getPythonWebFrameworkChoice(flags.pythonWebFramework);
      },
      pythonOrm: ({ results }) => {
        if (results.ecosystem !== "python") return Promise.resolve("none" as PythonOrm);
        return getPythonOrmChoice(flags.pythonOrm);
      },
      pythonValidation: ({ results }) => {
        if (results.ecosystem !== "python") return Promise.resolve("none" as PythonValidation);
        return getPythonValidationChoice(flags.pythonValidation);
      },
      pythonAi: ({ results }) => {
        if (results.ecosystem !== "python") return Promise.resolve([] as PythonAi[]);
        return getPythonAiChoice(flags.pythonAi);
      },
      pythonAuth: ({ results }) => {
        if (results.ecosystem !== "python") return Promise.resolve("none" as PythonAuth);
        return getPythonAuthChoice(flags.pythonAuth);
      },
      pythonApi: ({ results }) => {
        if (results.ecosystem !== "python") return Promise.resolve("none" as PythonApi);
        if (results.pythonWebFramework !== "django") {
          return Promise.resolve("none" as PythonApi);
        }
        return getPythonApiChoice(flags.pythonApi);
      },
      pythonTaskQueue: ({ results }) => {
        if (results.ecosystem !== "python") return Promise.resolve("none" as PythonTaskQueue);
        return getPythonTaskQueueChoice(flags.pythonTaskQueue);
      },
      pythonGraphql: ({ results }) => {
        if (results.ecosystem !== "python") return Promise.resolve("none" as PythonGraphql);
        return getPythonGraphqlChoice(flags.pythonGraphql);
      },
      pythonQuality: ({ results }) => {
        if (results.ecosystem !== "python") return Promise.resolve("none" as PythonQuality);
        return getPythonQualityChoice(flags.pythonQuality);
      },
      pythonTesting: ({ results }) => {
        if (results.ecosystem !== "python") return Promise.resolve([] as PythonTesting[]);
        return getPythonTestingChoice(flags.pythonTesting);
      },
      pythonCaching: ({ results }) => {
        if (results.ecosystem !== "python") return Promise.resolve("none" as PythonCaching);
        return getPythonCachingChoice(flags.pythonCaching);
      },
      pythonRealtime: ({ results }) => {
        if (results.ecosystem !== "python") return Promise.resolve("none" as PythonRealtime);
        return getPythonRealtimeChoice(flags.pythonRealtime);
      },
      pythonObservability: ({ results }) => {
        if (results.ecosystem !== "python") {
          return Promise.resolve("none" as PythonObservability);
        }
        return getPythonObservabilityChoice(flags.pythonObservability);
      },
      pythonCli: ({ results }) => {
        if (results.ecosystem !== "python") return Promise.resolve([] as PythonCli[]);
        return getPythonCliChoice(flags.pythonCli);
      },
      // Go ecosystem prompts (skip if not Go)
      goWebFramework: ({ results }) => {
        if (results.ecosystem !== "go") return Promise.resolve("none" as GoWebFramework);
        return getGoWebFrameworkChoice(flags.goWebFramework);
      },
      goOrm: ({ results }) => {
        if (results.ecosystem !== "go") return Promise.resolve("none" as GoOrm);
        return getGoOrmChoice(flags.goOrm);
      },
      goApi: ({ results }) => {
        if (results.ecosystem !== "go") return Promise.resolve("none" as GoApi);
        return getGoApiChoice(flags.goApi);
      },
      goCli: ({ results }) => {
        if (results.ecosystem !== "go") return Promise.resolve("none" as GoCli);
        return getGoCliChoice(flags.goCli);
      },
      goLogging: ({ results }) => {
        if (results.ecosystem !== "go") return Promise.resolve("none" as GoLogging);
        return getGoLoggingChoice(flags.goLogging);
      },
      goAuth: ({ results }) => {
        if (results.ecosystem !== "go") return Promise.resolve("none" as GoAuth);
        return getGoAuthChoice(flags.goAuth);
      },
      goTesting: ({ results }) => {
        if (results.ecosystem !== "go") return Promise.resolve([] as GoTesting[]);
        return getGoTestingChoice(flags.goTesting);
      },
      goRealtime: ({ results }) => {
        if (results.ecosystem !== "go") return Promise.resolve("none" as GoRealtime);
        return getGoRealtimeChoice(flags.goRealtime);
      },
      goMessageQueue: ({ results }) => {
        if (results.ecosystem !== "go") return Promise.resolve("none" as GoMessageQueue);
        return getGoMessageQueueChoice(flags.goMessageQueue);
      },
      goCaching: ({ results }) => {
        if (results.ecosystem !== "go") return Promise.resolve("none" as GoCaching);
        return getGoCachingChoice(flags.goCaching);
      },
      goConfig: ({ results }) => {
        if (results.ecosystem !== "go") return Promise.resolve("none" as GoConfig);
        return getGoConfigChoice(flags.goConfig);
      },
      goObservability: ({ results }) => {
        if (results.ecosystem !== "go") return Promise.resolve("none" as GoObservability);
        return getGoObservabilityChoice(flags.goObservability);
      },
      // Java ecosystem prompts (skip if not Java)
      javaWebFramework: ({ results }) => {
        if (results.ecosystem !== "java") return Promise.resolve("none" as JavaWebFramework);
        return getJavaWebFrameworkChoice(flags.javaWebFramework);
      },
      javaBuildTool: ({ results }) => {
        if (results.ecosystem !== "java") return Promise.resolve("none" as JavaBuildTool);
        return getJavaBuildToolChoice(flags.javaBuildTool);
      },
      javaOrm: ({ results }) => {
        if (results.ecosystem !== "java") return Promise.resolve("none" as JavaOrm);
        if (results.javaWebFramework !== "spring-boot" || results.javaBuildTool === "none") {
          return Promise.resolve("none" as JavaOrm);
        }
        return getJavaOrmChoice(flags.javaOrm);
      },
      javaAuth: ({ results }) => {
        if (results.ecosystem !== "java") return Promise.resolve("none" as JavaAuth);
        if (results.javaWebFramework !== "spring-boot" || results.javaBuildTool === "none") {
          return Promise.resolve("none" as JavaAuth);
        }
        return getJavaAuthChoice(flags.javaAuth);
      },
      javaApi: ({ results }) => {
        if (results.ecosystem !== "java") return Promise.resolve("none" as JavaApi);
        if (results.javaWebFramework !== "spring-boot") {
          return Promise.resolve("none" as JavaApi);
        }
        return getJavaApiChoice(flags.javaApi);
      },
      javaLogging: ({ results }) => {
        if (results.ecosystem !== "java") return Promise.resolve("none" as JavaLogging);
        if (results.javaWebFramework !== "spring-boot") {
          return Promise.resolve("none" as JavaLogging);
        }
        return getJavaLoggingChoice(flags.javaLogging);
      },
      javaLibraries: ({ results }) => {
        if (results.ecosystem !== "java") return Promise.resolve([] as JavaLibraries[]);
        if (results.javaWebFramework !== "spring-boot" || results.javaBuildTool === "none") {
          return Promise.resolve([] as JavaLibraries[]);
        }
        return getJavaLibrariesChoice(flags.javaLibraries);
      },
      javaTestingLibraries: ({ results }) => {
        if (results.ecosystem !== "java") return Promise.resolve([] as JavaTestingLibraries[]);
        if (results.javaBuildTool === "none") {
          return Promise.resolve([] as JavaTestingLibraries[]);
        }
        return getJavaTestingLibrariesChoice(flags.javaTestingLibraries);
      },
      // .NET ecosystem prompts (skip if not .NET)
      dotnetWebFramework: ({ results }) => {
        if (results.ecosystem !== "dotnet") {
          return Promise.resolve("none" as DotnetWebFramework);
        }
        return getDotnetWebFrameworkChoice(flags.dotnetWebFramework);
      },
      dotnetOrm: ({ results }) => {
        if (results.ecosystem !== "dotnet") return Promise.resolve("none" as DotnetOrm);
        if (results.dotnetWebFramework === "none") return Promise.resolve("none" as DotnetOrm);
        return getDotnetOrmChoice(flags.dotnetOrm);
      },
      dotnetAuth: ({ results }) => {
        if (results.ecosystem !== "dotnet") return Promise.resolve("none" as DotnetAuth);
        if (results.dotnetWebFramework === "none") return Promise.resolve("none" as DotnetAuth);
        return getDotnetAuthChoice(flags.dotnetAuth);
      },
      dotnetApi: ({ results }) => {
        if (results.ecosystem !== "dotnet") return Promise.resolve("none" as DotnetApi);
        if (results.dotnetWebFramework === "none") return Promise.resolve("none" as DotnetApi);
        return getDotnetApiChoice(flags.dotnetApi);
      },
      dotnetTesting: ({ results }) => {
        if (results.ecosystem !== "dotnet") return Promise.resolve([] as DotnetTesting[]);
        return getDotnetTestingChoice(flags.dotnetTesting);
      },
      dotnetJobQueue: ({ results }) => {
        if (results.ecosystem !== "dotnet") return Promise.resolve("none" as DotnetJobQueue);
        if (results.dotnetWebFramework === "none") return Promise.resolve("none" as DotnetJobQueue);
        return getDotnetJobQueueChoice(flags.dotnetJobQueue);
      },
      dotnetRealtime: ({ results }) => {
        if (results.ecosystem !== "dotnet") return Promise.resolve("none" as DotnetRealtime);
        if (results.dotnetWebFramework === "none") return Promise.resolve("none" as DotnetRealtime);
        return getDotnetRealtimeChoice(flags.dotnetRealtime);
      },
      dotnetObservability: ({ results }) => {
        if (results.ecosystem !== "dotnet") return Promise.resolve([] as DotnetObservability[]);
        return getDotnetObservabilityChoice(flags.dotnetObservability);
      },
      dotnetValidation: ({ results }) => {
        if (results.ecosystem !== "dotnet") return Promise.resolve("none" as DotnetValidation);
        return getDotnetValidationChoice(flags.dotnetValidation);
      },
      dotnetCaching: ({ results }) => {
        if (results.ecosystem !== "dotnet") return Promise.resolve("none" as DotnetCaching);
        if (results.dotnetWebFramework === "none") return Promise.resolve("none" as DotnetCaching);
        return getDotnetCachingChoice(flags.dotnetCaching);
      },
      dotnetDeploy: ({ results }) => {
        if (results.ecosystem !== "dotnet") return Promise.resolve("none" as DotnetDeploy);
        if (results.dotnetWebFramework === "none") return Promise.resolve("none" as DotnetDeploy);
        return getDotnetDeployChoice(flags.dotnetDeploy);
      },
      // Elixir ecosystem prompts (skip if not Elixir)
      elixirWebFramework: ({ results }) => {
        if (results.ecosystem !== "elixir") return Promise.resolve("none" as ElixirWebFramework);
        return getElixirWebFrameworkChoice(flags.elixirWebFramework);
      },
      elixirOrm: ({ results }) => {
        if (results.ecosystem !== "elixir") return Promise.resolve("none" as ElixirOrm);
        return getElixirOrmChoice(flags.elixirOrm);
      },
      elixirAuth: ({ results }) => {
        if (results.ecosystem !== "elixir") return Promise.resolve("none" as ElixirAuth);
        return getElixirAuthChoice(flags.elixirAuth);
      },
      elixirApi: ({ results }) => {
        if (results.ecosystem !== "elixir") return Promise.resolve("none" as ElixirApi);
        return getElixirApiChoice(flags.elixirApi);
      },
      elixirRealtime: ({ results }) => {
        if (results.ecosystem !== "elixir") return Promise.resolve("none" as ElixirRealtime);
        return getElixirRealtimeChoice(flags.elixirRealtime);
      },
      elixirJobs: ({ results }) => {
        if (results.ecosystem !== "elixir") return Promise.resolve("none" as ElixirJobs);
        return getElixirJobsChoice(flags.elixirJobs);
      },
      elixirValidation: ({ results }) => {
        if (results.ecosystem !== "elixir") return Promise.resolve("none" as ElixirValidation);
        return getElixirValidationChoice(flags.elixirValidation);
      },
      elixirHttp: ({ results }) => {
        if (results.ecosystem !== "elixir") return Promise.resolve("none" as ElixirHttp);
        return getElixirHttpChoice(flags.elixirHttp);
      },
      elixirJson: ({ results }) => {
        if (results.ecosystem !== "elixir") return Promise.resolve("none" as ElixirJson);
        return getElixirJsonChoice(flags.elixirJson);
      },
      elixirEmail: ({ results }) => {
        if (results.ecosystem !== "elixir") return Promise.resolve("none" as ElixirEmail);
        return getElixirEmailChoice(flags.elixirEmail);
      },
      elixirCaching: ({ results }) => {
        if (results.ecosystem !== "elixir") return Promise.resolve("none" as ElixirCaching);
        return getElixirCachingChoice(flags.elixirCaching);
      },
      elixirObservability: ({ results }) => {
        if (results.ecosystem !== "elixir") return Promise.resolve("none" as ElixirObservability);
        return getElixirObservabilityChoice(flags.elixirObservability);
      },
      elixirTesting: ({ results }) => {
        if (results.ecosystem !== "elixir") return Promise.resolve("none" as ElixirTesting);
        return getElixirTestingChoice(flags.elixirTesting);
      },
      elixirQuality: ({ results }) => {
        if (results.ecosystem !== "elixir") return Promise.resolve("none" as ElixirQuality);
        return getElixirQualityChoice(flags.elixirQuality);
      },
      elixirDeploy: ({ results }) => {
        if (results.ecosystem !== "elixir") return Promise.resolve("none" as ElixirDeploy);
        return getElixirDeployChoice(flags.elixirDeploy);
      },
      elixirLibraries: ({ results }) => {
        if (results.ecosystem !== "elixir") return Promise.resolve([] as ElixirLibraries[]);
        return getElixirLibrariesChoice(flags.elixirLibraries);
      },
      // Keep at end
      aiDocs: () => getAiDocsChoice(flags.aiDocs),
      git: () => getGitChoice(flags.git),
      packageManager: ({ results }) => {
        // Skip package manager prompt for non-JS ecosystems.
        if (
          results.ecosystem === "rust" ||
          results.ecosystem === "python" ||
          results.ecosystem === "go" ||
          results.ecosystem === "java" ||
          results.ecosystem === "dotnet" ||
          results.ecosystem === "elixir"
        )
          return Promise.resolve(flags.packageManager ?? getUserPkgManager());
        return getPackageManagerChoice(flags.packageManager);
      },
      install: ({ results }) =>
        getinstallChoice(flags.install, results.ecosystem, results.javaBuildTool),
    },
    {
      onCancel: () => exitCancelled("Operation cancelled"),
    },
  );

  return {
    projectName: projectName,
    projectDir: projectDir,
    relativePath: relativePath,
    frontend: result.frontend,
    astroIntegration: result.astroIntegration,
    uiLibrary: result.uiLibrary,
    ...result.shadcnOptions,
    cssFramework: result.cssFramework,
    backend: result.backend,
    runtime: result.runtime,
    database: result.database,
    orm: result.orm,
    auth: result.auth,
    payments: result.payments,
    email: result.email,
    effect: result.effect,
    addons: result.addons,
    examples: result.examples,
    git: result.git,
    packageManager: result.packageManager,
    install: result.install,
    dbSetup: result.dbSetup,
    api: result.api,
    webDeploy: result.webDeploy,
    serverDeploy: result.serverDeploy,
    // New prompts
    ai: result.ai,
    stateManagement: result.stateManagement,
    validation: result.validation,
    forms: result.forms,
    testing: result.testing,
    realtime: result.realtime,
    jobQueue: result.jobQueue,
    animation: result.animation,
    fileUpload: result.fileUpload,
    logging: result.logging,
    observability: result.observability,
    featureFlags: result.featureFlags,
    analytics: result.analytics,
    cms: result.cms,
    caching: result.caching,
    rateLimit: result.rateLimit,
    i18n: result.i18n,
    search: result.search,
    vectorDb: result.vectorDb,
    fileStorage: result.fileStorage,
    mobileNavigation: result.mobileNavigation,
    mobileUI: result.mobileUI,
    mobileStorage: result.mobileStorage,
    mobileTesting: result.mobileTesting,
    mobilePush: result.mobilePush,
    mobileOTA: result.mobileOTA,
    mobileDeepLinking: result.mobileDeepLinking,
    // Ecosystem
    ecosystem: result.ecosystem,
    // Rust ecosystem options
    rustWebFramework: result.rustWebFramework,
    rustFrontend: result.rustFrontend,
    rustOrm: result.rustOrm,
    rustApi: result.rustApi,
    rustCli: result.rustCli,
    rustLibraries: result.rustLibraries,
    rustLogging: result.rustLogging,
    rustErrorHandling: result.rustErrorHandling,
    rustCaching: result.rustCaching,
    rustAuth: result.rustAuth,
    rustRealtime: result.rustRealtime,
    rustMessageQueue: result.rustMessageQueue,
    rustObservability: result.rustObservability,
    rustTemplating: result.rustTemplating,
    // Python ecosystem options
    pythonWebFramework: result.pythonWebFramework,
    pythonOrm: result.pythonOrm,
    pythonValidation: result.pythonValidation,
    pythonAi: result.pythonAi,
    pythonAuth: result.pythonAuth,
    pythonApi: result.pythonApi,
    pythonTaskQueue: result.pythonTaskQueue,
    pythonGraphql: result.pythonGraphql,
    pythonQuality: result.pythonQuality,
    pythonTesting: result.pythonTesting,
    pythonCaching: result.pythonCaching,
    pythonRealtime: result.pythonRealtime,
    pythonObservability: result.pythonObservability,
    pythonCli: result.pythonCli,
    // Go ecosystem options
    goWebFramework: result.goWebFramework,
    goOrm: result.goOrm,
    goApi: result.goApi,
    goCli: result.goCli,
    goLogging: result.goLogging,
    goAuth: result.goAuth,
    goTesting: result.goTesting,
    goRealtime: result.goRealtime,
    goMessageQueue: result.goMessageQueue,
    goCaching: result.goCaching,
    goConfig: result.goConfig,
    goObservability: result.goObservability,
    // Java ecosystem options
    javaWebFramework: result.javaWebFramework,
    javaBuildTool: result.javaBuildTool,
    javaOrm: result.javaOrm,
    javaAuth: result.javaAuth,
    javaApi: result.javaApi,
    javaLogging: result.javaLogging,
    javaLibraries: result.javaLibraries,
    javaTestingLibraries: result.javaTestingLibraries,
    // .NET ecosystem options
    dotnetWebFramework: result.dotnetWebFramework,
    dotnetOrm: result.dotnetOrm,
    dotnetAuth: result.dotnetAuth,
    dotnetApi: result.dotnetApi,
    dotnetTesting: result.dotnetTesting,
    dotnetJobQueue: result.dotnetJobQueue,
    dotnetRealtime: result.dotnetRealtime,
    dotnetObservability: result.dotnetObservability,
    dotnetValidation: result.dotnetValidation,
    dotnetCaching: result.dotnetCaching,
    dotnetDeploy: result.dotnetDeploy,
    // Elixir ecosystem options
    elixirWebFramework: result.elixirWebFramework,
    elixirOrm: result.elixirOrm,
    elixirAuth: result.elixirAuth,
    elixirApi: result.elixirApi,
    elixirRealtime: result.elixirRealtime,
    elixirJobs: result.elixirJobs,
    elixirValidation: result.elixirValidation,
    elixirHttp: result.elixirHttp,
    elixirJson: result.elixirJson,
    elixirEmail: result.elixirEmail,
    elixirCaching: result.elixirCaching,
    elixirObservability: result.elixirObservability,
    elixirTesting: result.elixirTesting,
    elixirQuality: result.elixirQuality,
    elixirDeploy: result.elixirDeploy,
    elixirLibraries: result.elixirLibraries,
    // AI documentation files
    aiDocs: result.aiDocs,
  };
}
