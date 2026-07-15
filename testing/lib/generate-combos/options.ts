import {
  ADDONS_VALUES,
  AI_VALUES,
  ANALYTICS_VALUES,
  ANIMATION_VALUES,
  API_VALUES,
  ASTRO_INTEGRATION_VALUES,
  AUTH_VALUES,
  BACKEND_VALUES,
  CACHING_VALUES,
  I18N_VALUES,
  CMS_VALUES,
  CSS_FRAMEWORK_VALUES,
  DATABASE_SETUP_VALUES,
  DATABASE_VALUES,
  EFFECT_VALUES,
  ELIXIR_API_VALUES,
  ELIXIR_LIBRARIES_VALUES,
  ELIXIR_AUTH_VALUES,
  ELIXIR_CACHING_VALUES,
  ELIXIR_DEPLOY_VALUES,
  ELIXIR_EMAIL_VALUES,
  ELIXIR_HTTP_VALUES,
  ELIXIR_JOBS_VALUES,
  ELIXIR_JSON_VALUES,
  ELIXIR_OBSERVABILITY_VALUES,
  ELIXIR_ORM_VALUES,
  ELIXIR_QUALITY_VALUES,
  ELIXIR_I18N_VALUES,
  ELIXIR_HTTP_SERVER_VALUES,
  ELIXIR_APPLICATION_FRAMEWORK_VALUES,
  ELIXIR_DOCUMENTATION_VALUES,
  ELIXIR_CLUSTERING_VALUES,
  ELIXIR_REALTIME_VALUES,
  ELIXIR_TESTING_VALUES,
  ELIXIR_VALIDATION_VALUES,
  ELIXIR_WEB_FRAMEWORK_VALUES,
  EMAIL_VALUES,
  EXAMPLES_VALUES,
  FILE_STORAGE_VALUES,
  FILE_UPLOAD_VALUES,
  FORMS_VALUES,
  GO_API_VALUES,
  GO_AUTH_VALUES,
  GO_CACHING_VALUES,
  GO_CONFIG_VALUES,
  GO_DI_VALUES,
  GO_MESSAGE_QUEUE_VALUES,
  GO_MIGRATIONS_VALUES,
  GO_OBSERVABILITY_VALUES,
  GO_PROTO_TOOLING_VALUES,
  GO_QUALITY_VALUES,
  GO_REALTIME_VALUES,
  GO_TEMPLATING_VALUES,
  GO_TESTING_VALUES,
  GO_VALIDATION_VALUES,
  GO_CLI_VALUES,
  GO_LOGGING_VALUES,
  GO_ORM_VALUES,
  GO_WEB_FRAMEWORK_VALUES,
  JAVA_AUTH_VALUES,
  JAVA_API_VALUES,
  JAVA_LOGGING_VALUES,
  JAVA_BUILD_TOOL_VALUES,
  JAVA_LIBRARIES_VALUES,
  JAVA_ORM_VALUES,
  JAVA_TESTING_LIBRARIES_VALUES,
  JAVA_WEB_FRAMEWORK_VALUES,
  JOB_QUEUE_VALUES,
  LOGGING_VALUES,
  MOBILE_DEEP_LINKING_VALUES,
  MOBILE_NAVIGATION_VALUES,
  MOBILE_OTA_VALUES,
  MOBILE_PUSH_VALUES,
  MOBILE_STORAGE_VALUES,
  MOBILE_TESTING_VALUES,
  MOBILE_UI_VALUES,
  OBSERVABILITY_VALUES,
  ORM_VALUES,
  PAYMENTS_VALUES,
  PYTHON_AI_VALUES,
  PYTHON_API_VALUES,
  PYTHON_AUTH_VALUES,
  PYTHON_ORM_VALUES,
  PYTHON_GRAPHQL_VALUES,
  PYTHON_QUALITY_VALUES,
  PYTHON_TESTING_VALUES,
  PYTHON_CACHING_VALUES,
  PYTHON_REALTIME_VALUES,
  PYTHON_OBSERVABILITY_VALUES,
  PYTHON_CLI_VALUES,
  PYTHON_TASK_QUEUE_VALUES,
  PYTHON_VALIDATION_VALUES,
  PYTHON_WEB_FRAMEWORK_VALUES,
  RATE_LIMIT_VALUES,
  REALTIME_VALUES,
  RUNTIME_VALUES,
  RUST_API_VALUES,
  RUST_CLI_VALUES,
  RUST_FRONTEND_VALUES,
  RUST_LIBRARIES_VALUES,
  RUST_LOGGING_VALUES,
  RUST_ERROR_HANDLING_VALUES,
  RUST_CACHING_VALUES,
  RUST_AUTH_VALUES,
  RUST_REALTIME_VALUES,
  RUST_MESSAGE_QUEUE_VALUES,
  RUST_OBSERVABILITY_VALUES,
  RUST_TEMPLATING_VALUES,
  RUST_ORM_VALUES,
  RUST_WEB_FRAMEWORK_VALUES,
  SEARCH_VALUES,
  SERVER_DEPLOY_VALUES,
  SHADCN_BASE_COLOR_VALUES,
  SHADCN_BASE_VALUES,
  SHADCN_COLOR_THEME_VALUES,
  SHADCN_FONT_VALUES,
  SHADCN_ICON_LIBRARY_VALUES,
  SHADCN_RADIUS_VALUES,
  SHADCN_STYLE_VALUES,
  STATE_MANAGEMENT_VALUES,
  TESTING_VALUES,
  UI_LIBRARY_VALUES,
  VALIDATION_VALUES,
  WEB_DEPLOY_VALUES,
  getCategoryOptionIds,
  type CLIInput,
  type Ecosystem,
  type ProjectConfig,
} from "@better-fullstack/types";
import { getDefaultConfig } from "@cli/constants";
import { processFlags } from "@cli/utils/config-processing";
import { validateFullConfig } from "@cli/utils/config-validation";
import { runWithContext } from "@cli/utils/context";
import { randomInt } from "node:crypto";
import * as path from "node:path";

import type { CandidateDraft, ComboCandidate, GeneratorArgs, HistoricalLedger } from "./types";

import { buildHistoryFingerprint, fingerprintToKey } from "./fingerprint";
import { formatNameFromFingerprint, buildCommand } from "./render";
import { DEFAULT_ECOSYSTEM_WEIGHTS } from "./types";

function secureRandom(): number {
  return randomInt(0x1_0000_0000) / 0x1_0000_0000;
}

let _rng: () => number = secureRandom;
let _forceOptions: Record<string, string> = {};
let _forceNonNone: Set<string> = new Set();

const SELF_COMPATIBLE_FRONTENDS = new Set([
  "next",
  "tanstack-start",
  "astro",
  "nuxt",
  "svelte",
  "solid-start",
]);

const WEB_FRONTENDS = getCategoryOptionIds("webFrontend");
const NATIVE_FRONTENDS = getCategoryOptionIds("nativeFrontend");
const CROSS_ECOSYSTEM_EMAIL_VALUES = ["resend", "none"] as const;
const CROSS_ECOSYSTEM_OBSERVABILITY_VALUES = ["sentry", "none"] as const;
const CROSS_ECOSYSTEM_CACHING_VALUES = ["upstash-redis", "none"] as const;
const CROSS_ECOSYSTEM_SEARCH_VALUES = ["meilisearch", "none"] as const;

function sampleOne<T>(values: readonly T[]): T {
  return values[Math.floor(_rng() * values.length)];
}

function sampleScalar<T extends string>(values: readonly T[], noneWeight: number, key?: string): T {
  // If this key has a forced value, use it (must be a valid option)
  if (key && _forceOptions[key] && values.includes(_forceOptions[key] as T)) {
    return _forceOptions[key] as T;
  }

  const unique = Array.from(new Set(values));
  const nonNone = unique.filter((value) => value !== "none");
  if (nonNone.length === 0) return "none" as T;

  // If this key is in forceNonNone, never pick "none"
  const effectiveNoneWeight = key && _forceNonNone.has(key) ? 0 : noneWeight;
  if (unique.includes("none" as T) && _rng() < effectiveNoneWeight) return "none" as T;
  return sampleOne(nonNone);
}

function sampleArray<T extends string>(
  values: readonly T[],
  noneWeight: number,
  maxItems = 1,
  key?: string,
): T[] {
  // If this key has a forced value, use it
  if (key && _forceOptions[key] && values.includes(_forceOptions[key] as T)) {
    return [_forceOptions[key] as T];
  }

  const unique = Array.from(new Set(values)).filter((value) => value !== "none");
  const effectiveNoneWeight = key && _forceNonNone.has(key) ? 0 : noneWeight;
  if (unique.length === 0 || _rng() < effectiveNoneWeight) {
    return ["none" as T];
  }

  const picked = new Set<T>();
  const targetCount = Math.max(1, Math.min(maxItems, unique.length));
  while (picked.size < targetCount) {
    picked.add(sampleOne(unique));
    if (_rng() < 0.6) break;
  }

  return Array.from(picked);
}

function createCommonOptions(ecosystem: Ecosystem, args: GeneratorArgs): CLIInput {
  return {
    ecosystem,
    addons: ["none"],
    examples: ["none"],
    aiDocs: ["none"],
    packageManager: "bun",
    git: false,
    install: args.installMode === "install",
  };
}

function sampleTypeScriptFrontends(): CLIInput["frontend"] {
  const picked: string[] = [];
  const web = sampleScalar(WEB_FRONTENDS, 0.2);
  if (web !== "none") {
    picked.push(web);
  }

  if (picked.length === 0 && _rng() > 0.25) {
    picked.push(sampleOne(WEB_FRONTENDS.filter((value) => value !== "none")));
  }

  return picked.length === 0 ? ["none"] : Array.from(new Set(picked));
}

function makeTypeScriptDraft(args: GeneratorArgs): CandidateDraft {
  const frontend = sampleTypeScriptFrontends();
  const cssFramework = sampleScalar(CSS_FRAMEWORK_VALUES, 0.2);
  const backend = frontend.some((value) => SELF_COMPATIBLE_FRONTENDS.has(value))
    ? sampleScalar(BACKEND_VALUES, 0.18)
    : sampleScalar(
        BACKEND_VALUES.filter((value) => value !== "self"),
        0.18,
      );

  const runtime =
    backend === "self" || backend === "none" || backend === "convex"
      ? "none"
      : backend === "nestjs" || backend === "adonisjs" || backend === "nitro"
        ? "node"
        : sampleScalar(RUNTIME_VALUES, 0.2);

  const database =
    backend === "none" || backend === "convex" ? "none" : sampleScalar(DATABASE_VALUES, 0.2);

  const orm =
    database === "none" || database === "edgedb" || database === "redis"
      ? "none"
      : database === "mongodb"
        ? sampleScalar(["mongoose", "prisma", "none"] as const, 0.1)
        : sampleScalar(
            ORM_VALUES.filter((value) => value !== "mongoose"),
            0.1,
          );

  const api =
    backend === "none" || backend === "self" || backend === "convex"
      ? "none"
      : sampleScalar(API_VALUES, 0.2);

  let auth = backend === "none" ? "none" : sampleScalar(AUTH_VALUES, 0.3);
  // better-auth requires a database connection
  if (auth === "better-auth" && database === "none") auth = "none";
  const astroIntegration = frontend.includes("astro")
    ? sampleScalar(ASTRO_INTEGRATION_VALUES, 0.15)
    : undefined;

  // Most UI libraries are React-only; non-React astro integrations need compatible ones
  const REACT_ONLY_UI = new Set([
    "radix-ui",
    "headless-ui",
    "chakra-ui",
    "nextui",
    "mantine",
    "base-ui",
    "react-aria",
  ]);
  const needsNonReactUI =
    astroIntegration && astroIntegration !== "react" && astroIntegration !== "none";
  let uiLibrary = cssFramework !== "tailwind" ? "none" : sampleScalar(UI_LIBRARY_VALUES, 0.25);
  if (needsNonReactUI && REACT_ONLY_UI.has(uiLibrary)) uiLibrary = "none";
  const usesShadcn = uiLibrary === "shadcn-ui";

  return {
    ecosystem: "typescript",
    options: {
      ...createCommonOptions("typescript", args),
      frontend,
      backend,
      runtime,
      api,
      database,
      orm,
      dbSetup: database === "none" ? "none" : sampleScalar(DATABASE_SETUP_VALUES, 0.82),
      auth,
      payments: backend === "none" ? "none" : sampleScalar(PAYMENTS_VALUES, 0.75),
      email: backend === "none" ? "none" : sampleScalar(EMAIL_VALUES, 0.75),
      fileUpload: sampleScalar(FILE_UPLOAD_VALUES, 0.82),
      logging: backend === "none" ? "none" : sampleScalar(LOGGING_VALUES, 0.65),
      observability: sampleScalar(OBSERVABILITY_VALUES, 0.85),
      featureFlags: sampleScalar(
        ["growthbook", "posthog", "launchdarkly", "flagsmith", "unleash", "none"] as const,
        0.85,
      ),
      analytics: sampleScalar(ANALYTICS_VALUES, 0.9),
      effect: sampleScalar(EFFECT_VALUES, 0.82),
      stateManagement: sampleScalar(STATE_MANAGEMENT_VALUES, 0.7),
      forms: sampleScalar(FORMS_VALUES, 0.6),
      validation: sampleScalar(VALIDATION_VALUES, 0.35),
      testing: sampleScalar(TESTING_VALUES, 0.35),
      ai: sampleScalar(AI_VALUES, 0.78),
      realtime: backend === "none" ? "none" : sampleScalar(REALTIME_VALUES, 0.84),
      jobQueue: backend === "none" ? "none" : sampleScalar(JOB_QUEUE_VALUES, 0.88),
      animation: sampleScalar(ANIMATION_VALUES, 0.74),
      cssFramework,
      uiLibrary,
      cms: sampleScalar(CMS_VALUES, 0.88),
      caching: sampleScalar(CACHING_VALUES, 0.88),
      rateLimit:
        backend === "none" || backend === "convex" ? "none" : sampleScalar(RATE_LIMIT_VALUES, 0.9),
      i18n: sampleScalar(I18N_VALUES, 0.88),
      search: sampleScalar(SEARCH_VALUES, 0.9),
      fileStorage: sampleScalar(FILE_STORAGE_VALUES, 0.84),
      webDeploy: sampleScalar(WEB_DEPLOY_VALUES, 0.92),
      serverDeploy:
        backend === "hono"
          ? sampleScalar(SERVER_DEPLOY_VALUES, 0.92)
          : sampleScalar(
              SERVER_DEPLOY_VALUES.filter((v) => v !== "sst"),
              0.92,
            ),
      addons: sampleArray(ADDONS_VALUES, 0.82, 2),
      examples:
        backend === "none"
          ? sampleArray(
              EXAMPLES_VALUES.filter((v) => v !== "ai"),
              0.9,
              1,
            )
          : sampleArray(EXAMPLES_VALUES, 0.9, 1),
      astroIntegration,
      shadcnBase: usesShadcn ? sampleScalar(SHADCN_BASE_VALUES, 0) : undefined,
      shadcnStyle: usesShadcn ? sampleScalar(SHADCN_STYLE_VALUES, 0) : undefined,
      shadcnIconLibrary: usesShadcn ? sampleScalar(SHADCN_ICON_LIBRARY_VALUES, 0) : undefined,
      shadcnColorTheme: usesShadcn ? sampleScalar(SHADCN_COLOR_THEME_VALUES, 0) : undefined,
      shadcnBaseColor: usesShadcn ? sampleScalar(SHADCN_BASE_COLOR_VALUES, 0) : undefined,
      shadcnFont: usesShadcn ? sampleScalar(SHADCN_FONT_VALUES, 0) : undefined,
      shadcnRadius: usesShadcn ? sampleScalar(SHADCN_RADIUS_VALUES, 0) : undefined,
    },
  };
}

function makeReactNativeDraft(args: GeneratorArgs): CandidateDraft {
  const frontend = [sampleOne(NATIVE_FRONTENDS.filter((value) => value !== "none"))];
  const mobileUI = frontend.includes("native-uniwind")
    ? "uniwind"
    : frontend.includes("native-unistyles")
      ? "unistyles"
      : sampleScalar(MOBILE_UI_VALUES, 0.55, "mobileUI");

  return {
    ecosystem: "react-native",
    options: {
      ...createCommonOptions("react-native", args),
      frontend,
      backend: "none",
      runtime: "none",
      api: "none",
      database: "none",
      orm: "none",
      dbSetup: "none",
      auth: "none",
      cssFramework: "none",
      uiLibrary: "none",
      forms: "none",
      testing: "none",
      mobileNavigation: sampleScalar(MOBILE_NAVIGATION_VALUES, 0.05, "mobileNavigation"),
      mobileUI,
      mobileStorage: sampleScalar(MOBILE_STORAGE_VALUES, 0.55, "mobileStorage"),
      mobileTesting: sampleScalar(MOBILE_TESTING_VALUES, 0.45, "mobileTesting"),
      mobilePush: sampleScalar(MOBILE_PUSH_VALUES, 0.7, "mobilePush"),
      mobileOTA: sampleScalar(MOBILE_OTA_VALUES, 0.7, "mobileOTA"),
      mobileDeepLinking: sampleScalar(MOBILE_DEEP_LINKING_VALUES, 0.35, "mobileDeepLinking"),
    },
  };
}

function makeRustDraft(args: GeneratorArgs): CandidateDraft {
  return {
    ecosystem: "rust",
    options: {
      ...createCommonOptions("rust", args),
      rustWebFramework: sampleScalar(RUST_WEB_FRAMEWORK_VALUES, 0.15),
      rustFrontend: sampleScalar(RUST_FRONTEND_VALUES, 0.2),
      rustOrm: sampleScalar(RUST_ORM_VALUES, 0.15),
      rustApi: sampleScalar(RUST_API_VALUES, 0.25),
      rustCli: sampleScalar(RUST_CLI_VALUES, 0.3),
      rustLogging: sampleScalar(RUST_LOGGING_VALUES, 0.15),
      rustErrorHandling: sampleScalar(RUST_ERROR_HANDLING_VALUES, 0.15),
      rustCaching: sampleScalar(RUST_CACHING_VALUES, 0.15),
      rustAuth: sampleScalar(RUST_AUTH_VALUES, 0.15),
      rustRealtime: sampleScalar(RUST_REALTIME_VALUES, 0.5),
      rustMessageQueue: sampleScalar(RUST_MESSAGE_QUEUE_VALUES, 0.5),
      rustObservability: sampleScalar(RUST_OBSERVABILITY_VALUES, 0.5),
      rustTemplating: sampleScalar(RUST_TEMPLATING_VALUES, 0.5),
      rustLibraries: sampleArray(RUST_LIBRARIES_VALUES, 0.35, 2),
      email: sampleScalar(CROSS_ECOSYSTEM_EMAIL_VALUES, 0.75, "email"),
      observability: sampleScalar(CROSS_ECOSYSTEM_OBSERVABILITY_VALUES, 0.75, "observability"),
      caching: sampleScalar(CROSS_ECOSYSTEM_CACHING_VALUES, 0.75, "caching"),
      search: sampleScalar(CROSS_ECOSYSTEM_SEARCH_VALUES, 0.75, "search"),
    },
  };
}

function makePythonDraft(args: GeneratorArgs): CandidateDraft {
  return {
    ecosystem: "python",
    options: {
      ...createCommonOptions("python", args),
      pythonWebFramework: sampleScalar(PYTHON_WEB_FRAMEWORK_VALUES, 0.15),
      pythonOrm: sampleScalar(PYTHON_ORM_VALUES, 0.2),
      pythonValidation: sampleScalar(PYTHON_VALIDATION_VALUES, 0.35),
      pythonAi: sampleArray(PYTHON_AI_VALUES, 0.5, 1),
      pythonAuth: sampleScalar(PYTHON_AUTH_VALUES, 0.5),
      pythonApi: sampleScalar(PYTHON_API_VALUES, 0.65),
      pythonTaskQueue: sampleScalar(PYTHON_TASK_QUEUE_VALUES, 0.55),
      pythonGraphql: sampleScalar(PYTHON_GRAPHQL_VALUES, 0.5),
      pythonQuality: sampleScalar(PYTHON_QUALITY_VALUES, 0.35),
      pythonTesting: sampleArray(PYTHON_TESTING_VALUES, 0.3, 2, "pythonTesting"),
      pythonCaching: sampleScalar(PYTHON_CACHING_VALUES, 0.5),
      pythonRealtime: sampleScalar(PYTHON_REALTIME_VALUES, 0.5),
      pythonObservability: sampleScalar(PYTHON_OBSERVABILITY_VALUES, 0.5),
      pythonCli: sampleArray(PYTHON_CLI_VALUES, 0.4, 2, "pythonCli"),
      email: sampleScalar(CROSS_ECOSYSTEM_EMAIL_VALUES, 0.75, "email"),
      observability: sampleScalar(CROSS_ECOSYSTEM_OBSERVABILITY_VALUES, 0.75, "observability"),
      caching: sampleScalar(CROSS_ECOSYSTEM_CACHING_VALUES, 0.75, "caching"),
      search: sampleScalar(CROSS_ECOSYSTEM_SEARCH_VALUES, 0.75, "search"),
    },
  };
}

function makeGoDraft(args: GeneratorArgs): CandidateDraft {
  return {
    ecosystem: "go",
    options: {
      ...createCommonOptions("go", args),
      auth: sampleScalar(["go-better-auth", "none"] as const, 0.5),
      goWebFramework: sampleScalar(GO_WEB_FRAMEWORK_VALUES, 0.18),
      goOrm: sampleScalar(GO_ORM_VALUES, 0.15),
      goApi: sampleScalar(GO_API_VALUES, 0.35),
      goCli: sampleScalar(GO_CLI_VALUES, 0.35),
      goLogging: sampleScalar(GO_LOGGING_VALUES, 0.35),
      goAuth: sampleScalar(GO_AUTH_VALUES, 0.35),
      goTesting: sampleArray(GO_TESTING_VALUES, 0.3, 2, "goTesting"),
      goRealtime: sampleScalar(GO_REALTIME_VALUES, 0.5),
      goMessageQueue: sampleScalar(GO_MESSAGE_QUEUE_VALUES, 0.5),
      goCaching: sampleScalar(GO_CACHING_VALUES, 0.5),
      goConfig: sampleScalar(GO_CONFIG_VALUES, 0.5),
      goObservability: sampleScalar(GO_OBSERVABILITY_VALUES, 0.5),
      goValidation: sampleScalar(GO_VALIDATION_VALUES, 0.5),
      goQuality: sampleScalar(GO_QUALITY_VALUES, 0.5),
      goMigrations: sampleScalar(GO_MIGRATIONS_VALUES, 0.5),
      goTemplating: sampleScalar(GO_TEMPLATING_VALUES, 0.5),
      goProtoTooling: sampleScalar(GO_PROTO_TOOLING_VALUES, 0.5),
      goDI: sampleScalar(GO_DI_VALUES, 0.5),
      email: sampleScalar(CROSS_ECOSYSTEM_EMAIL_VALUES, 0.75, "email"),
      observability: sampleScalar(CROSS_ECOSYSTEM_OBSERVABILITY_VALUES, 0.75, "observability"),
      caching: sampleScalar(CROSS_ECOSYSTEM_CACHING_VALUES, 0.75, "caching"),
      search: sampleScalar(CROSS_ECOSYSTEM_SEARCH_VALUES, 0.75, "search"),
    },
  };
}

function makeJavaDraft(args: GeneratorArgs): CandidateDraft {
  const javaBuildTool = sampleScalar(JAVA_BUILD_TOOL_VALUES, 0.12, "javaBuildTool");
  const usesBuildTool = javaBuildTool !== "none";
  const javaWebFramework = usesBuildTool
    ? sampleScalar(JAVA_WEB_FRAMEWORK_VALUES, 0.2, "javaWebFramework")
    : "none";
  const usesSpringBoot = javaWebFramework === "spring-boot";
  const javaOrm = usesSpringBoot ? sampleScalar(JAVA_ORM_VALUES, 0.45, "javaOrm") : "none";
  const hasJpa = javaOrm === "spring-data-jpa";
  const javaLibraries = usesSpringBoot
    ? sampleArray(
        hasJpa
          ? JAVA_LIBRARIES_VALUES
          : JAVA_LIBRARIES_VALUES.filter((value) => value !== "flyway" && value !== "liquibase"),
        0.35,
        3,
        "javaLibraries",
      )
    : ["none" as const];

  return {
    ecosystem: "java",
    options: {
      ...createCommonOptions("java", args),
      javaWebFramework,
      javaBuildTool,
      javaOrm,
      javaAuth: usesSpringBoot ? sampleScalar(JAVA_AUTH_VALUES, 0.65, "javaAuth") : "none",
      javaApi: usesSpringBoot ? sampleScalar(JAVA_API_VALUES, 0.6, "javaApi") : "none",
      javaLogging: usesSpringBoot ? sampleScalar(JAVA_LOGGING_VALUES, 0.6, "javaLogging") : "none",
      javaLibraries,
      javaTestingLibraries: usesBuildTool
        ? sampleArray(JAVA_TESTING_LIBRARIES_VALUES, 0.2, 3, "javaTestingLibraries")
        : ["none" as const],
      email: usesBuildTool ? sampleScalar(CROSS_ECOSYSTEM_EMAIL_VALUES, 0.75, "email") : "none",
      observability: usesBuildTool
        ? sampleScalar(CROSS_ECOSYSTEM_OBSERVABILITY_VALUES, 0.75, "observability")
        : "none",
      caching: usesBuildTool
        ? sampleScalar(CROSS_ECOSYSTEM_CACHING_VALUES, 0.75, "caching")
        : "none",
      search: usesBuildTool ? sampleScalar(CROSS_ECOSYSTEM_SEARCH_VALUES, 0.75, "search") : "none",
    },
  };
}

function makeElixirDraft(args: GeneratorArgs): CandidateDraft {
  const elixirWebFramework = sampleScalar(ELIXIR_WEB_FRAMEWORK_VALUES, 0.08, "elixirWebFramework");
  const usesPhoenix = elixirWebFramework !== "none";
  const elixirOrm = usesPhoenix ? sampleScalar(ELIXIR_ORM_VALUES, 0.15, "elixirOrm") : "none";
  const hasEcto = elixirOrm !== "none";

  return {
    ecosystem: "elixir",
    options: {
      ...createCommonOptions("elixir", args),
      elixirWebFramework,
      elixirOrm,
      elixirAuth: hasEcto ? sampleScalar(ELIXIR_AUTH_VALUES, 0.55, "elixirAuth") : "none",
      elixirApi: usesPhoenix ? sampleScalar(ELIXIR_API_VALUES, 0.2, "elixirApi") : "none",
      elixirRealtime: usesPhoenix
        ? sampleScalar(ELIXIR_REALTIME_VALUES, 0.25, "elixirRealtime")
        : "none",
      elixirJobs:
        elixirOrm === "ecto-sql" ? sampleScalar(ELIXIR_JOBS_VALUES, 0.55, "elixirJobs") : "none",
      elixirValidation: hasEcto
        ? sampleScalar(ELIXIR_VALIDATION_VALUES, 0.2, "elixirValidation")
        : "none",
      elixirHttp: usesPhoenix ? sampleScalar(ELIXIR_HTTP_VALUES, 0.25, "elixirHttp") : "none",
      elixirJson: usesPhoenix ? sampleScalar(ELIXIR_JSON_VALUES, 0.05, "elixirJson") : "none",
      elixirEmail: usesPhoenix ? sampleScalar(ELIXIR_EMAIL_VALUES, 0.7, "elixirEmail") : "none",
      elixirCaching: usesPhoenix
        ? sampleScalar(ELIXIR_CACHING_VALUES, 0.75, "elixirCaching")
        : "none",
      elixirObservability: usesPhoenix
        ? sampleScalar(ELIXIR_OBSERVABILITY_VALUES, 0.35, "elixirObservability")
        : "none",
      elixirTesting: usesPhoenix
        ? sampleScalar(ELIXIR_TESTING_VALUES, 0.15, "elixirTesting")
        : "none",
      elixirQuality: usesPhoenix
        ? sampleScalar(ELIXIR_QUALITY_VALUES, 0.25, "elixirQuality")
        : "none",
      elixirI18n: usesPhoenix ? sampleScalar(ELIXIR_I18N_VALUES, 0.4, "elixirI18n") : "none",
      elixirHttpServer: usesPhoenix
        ? sampleScalar(ELIXIR_HTTP_SERVER_VALUES, 0.25, "elixirHttpServer")
        : "none",
      elixirApplicationFramework: usesPhoenix
        ? sampleScalar(ELIXIR_APPLICATION_FRAMEWORK_VALUES, 0.7, "elixirApplicationFramework")
        : "none",
      elixirDocumentation: usesPhoenix
        ? sampleScalar(ELIXIR_DOCUMENTATION_VALUES, 0.5, "elixirDocumentation")
        : "none",
      elixirClustering: usesPhoenix
        ? sampleScalar(ELIXIR_CLUSTERING_VALUES, 0.6, "elixirClustering")
        : "none",
      elixirDeploy: usesPhoenix ? sampleScalar(ELIXIR_DEPLOY_VALUES, 0.65, "elixirDeploy") : "none",
      elixirLibraries: usesPhoenix
        ? sampleArray(ELIXIR_LIBRARIES_VALUES, 0.5, 2, "elixirLibraries")
        : [],
    },
  };
}

function makeDotnetDraft(args: GeneratorArgs): CandidateDraft {
  // .NET template coverage is currently a stub: only the API style
  // (minimal-api / graphql-hotchocolate / grpc-dotnet) and validation
  // (fluentvalidation / data-annotations) actually drive generation, and the
  // generated test project only compiles with xunit. Restrict the pools to
  // values that produce a buildable project: avoid aspnet-mvc/blazor, dapper,
  // linq2db, and the auth/extra values that have no template yet.
  return {
    ecosystem: "dotnet",
    options: {
      ...createCommonOptions("dotnet", args),
      dotnetWebFramework: "aspnet-minimal",
      dotnetOrm: sampleScalar(["ef-core", "none"] as const, 0.3, "dotnetOrm"),
      dotnetAuth: "none",
      dotnetApi: sampleScalar(
        ["minimal-api", "graphql-hotchocolate", "grpc-dotnet"] as const,
        0,
        "dotnetApi",
      ),
      dotnetTesting: ["xunit"],
      dotnetJobQueue: sampleScalar(["hosted-services", "none"] as const, 0.5, "dotnetJobQueue"),
      dotnetRealtime: sampleScalar(["signalr", "none"] as const, 0.5, "dotnetRealtime"),
      dotnetObservability: sampleArray(
        ["serilog", "health-checks"] as const,
        0.4,
        2,
        "dotnetObservability",
      ),
      dotnetValidation: sampleScalar(
        ["fluentvalidation", "data-annotations", "none"] as const,
        0.3,
        "dotnetValidation",
      ),
      dotnetCaching: sampleScalar(["memory-cache", "none"] as const, 0.5, "dotnetCaching"),
      dotnetDeploy: sampleScalar(["docker", "none"] as const, 0.4, "dotnetDeploy"),
    },
  };
}

function buildProvidedFlags(options: CLIInput): Set<string> {
  const providedFlags = new Set<string>();

  for (const [key, value] of Object.entries(options)) {
    if (key === "projectDirectory" || key === "projectName") continue;
    if (value === undefined) continue;

    if (Array.isArray(value)) {
      if (value.length > 0) {
        providedFlags.add(key);
      }
      continue;
    }

    providedFlags.add(key);
  }

  return providedFlags;
}

function createValidationBase(projectName: string, draft: CandidateDraft): ProjectConfig {
  return {
    ...getDefaultConfig(),
    projectName,
    projectDir: path.resolve(process.cwd(), projectName),
    relativePath: projectName,
    ecosystem: draft.ecosystem,
    frontend:
      draft.ecosystem === "typescript"
        ? getDefaultConfig().frontend
        : draft.ecosystem === "react-native"
          ? ["native-bare"]
          : [],
    backend: "none",
    runtime: "none",
    database: "none",
    orm: "none",
    auth: "none",
    payments: "none",
    email: "none",
    fileUpload: "none",
    effect: "none",
    stateManagement: "none",
    validation: "none",
    forms: "none",
    testing: "none",
    ai: "none",
    realtime: "none",
    jobQueue: "none",
    caching: "none",
    rateLimit: "none",
    i18n: "none",
    search: "none",
    fileStorage: "none",
    animation: "none",
    logging: "none",
    observability: "none",
    featureFlags: "none",
    analytics: "none",
    cms: "none",
    addons: [],
    examples: [],
    dbSetup: "none",
    api: "none",
    webDeploy: "none",
    serverDeploy: "none",
    cssFramework: draft.ecosystem === "typescript" ? getDefaultConfig().cssFramework : "none",
    uiLibrary: draft.ecosystem === "typescript" ? getDefaultConfig().uiLibrary : "none",
    shadcnBase: undefined,
    shadcnStyle: undefined,
    shadcnIconLibrary: undefined,
    shadcnColorTheme: undefined,
    shadcnBaseColor: undefined,
    shadcnFont: undefined,
    shadcnRadius: undefined,
    astroIntegration: undefined,
    rustWebFramework: "none",
    rustFrontend: "none",
    rustOrm: "none",
    rustApi: "none",
    rustCli: "none",
    rustLogging: "tracing",
    rustErrorHandling: "anyhow-thiserror",
    rustCaching: "none",
    rustAuth: "none",
    rustRealtime: "none",
    rustMessageQueue: "none",
    rustObservability: "none",
    rustTemplating: "none",
    rustLibraries: [],
    pythonWebFramework: "none",
    pythonOrm: "none",
    pythonValidation: "none",
    pythonAi: [],
    pythonAuth: "none",
    pythonApi: "none",
    pythonTaskQueue: "none",
    pythonGraphql: "none",
    pythonQuality: "none",
    goWebFramework: "none",
    goOrm: "none",
    goApi: "none",
    goCli: "none",
    goLogging: "none",
    goAuth: "none",
    goValidation: "none",
    goQuality: "none",
    goMigrations: "none",
    goTemplating: "none",
    goProtoTooling: "none",
    goDI: "none",
    javaWebFramework: "none",
    javaBuildTool: "none",
    javaOrm: "none",
    javaAuth: "none",
    javaApi: "none",
    javaLogging: "none",
    javaLibraries: [],
    javaTestingLibraries: [],
    elixirWebFramework: "none",
    elixirOrm: "none",
    elixirAuth: "none",
    elixirApi: "none",
    elixirRealtime: "none",
    elixirJobs: "none",
    elixirValidation: "none",
    elixirHttp: "none",
    elixirJson: "none",
    elixirEmail: "none",
    elixirCaching: "none",
    elixirObservability: "none",
    elixirTesting: "none",
    elixirQuality: "none",
    elixirI18n: "none",
    elixirHttpServer: "none",
    elixirApplicationFramework: "none",
    elixirDocumentation: "none",
    elixirClustering: "none",
    elixirDeploy: "none",
    elixirLibraries: [],
    aiDocs: [],
    packageManager: "bun",
    git: false,
    install: draft.options.install ?? true,
  };
}

function applyDerivedMobileDefaults(config: ProjectConfig, providedFlags: Set<string>) {
  if (config.ecosystem !== "typescript" && config.ecosystem !== "react-native") return;

  const hasNativeFrontend = config.frontend.some((frontend) => frontend.startsWith("native-"));
  if (!hasNativeFrontend) {
    config.mobileNavigation = "none";
    config.mobileUI = "none";
    config.mobileStorage = "none";
    config.mobileTesting = "none";
    config.mobilePush = "none";
    config.mobileOTA = "none";
    config.mobileDeepLinking = "none";
    return;
  }

  if (!providedFlags.has("mobileNavigation") && config.mobileNavigation === "none") {
    config.mobileNavigation = "expo-router";
  }

  if (!providedFlags.has("mobileUI")) {
    if (config.frontend.includes("native-uniwind")) {
      config.mobileUI = "uniwind";
    } else if (config.frontend.includes("native-unistyles")) {
      config.mobileUI = "unistyles";
    }
  }

  if (
    !providedFlags.has("mobileDeepLinking") &&
    config.mobileDeepLinking === "none" &&
    config.auth !== "none"
  ) {
    config.mobileDeepLinking = "expo-linking";
  }
}

function validateDraft(draft: CandidateDraft, projectName: string): ProjectConfig {
  const providedFlags = buildProvidedFlags(draft.options);
  const processed = processFlags({ ...draft.options, projectName } as CLIInput, projectName);
  const config = {
    ...createValidationBase(projectName, draft),
    ...processed,
    projectName,
    relativePath: projectName,
    projectDir: path.resolve(process.cwd(), projectName),
  } as ProjectConfig;

  applyDerivedMobileDefaults(config, providedFlags);

  runWithContext({ silent: true }, () => {
    validateFullConfig(config, providedFlags, { ...draft.options, projectName } as CLIInput);
  });

  return config;
}

function weightedDistribution(count: number, ecosystems: readonly Ecosystem[]): Ecosystem[] {
  const selected = Array.from(new Set(ecosystems));
  const totalWeight = selected.reduce(
    (sum, ecosystem) => sum + DEFAULT_ECOSYSTEM_WEIGHTS[ecosystem],
    0,
  );

  const allocations = selected.map((ecosystem) => {
    const exact = (count * DEFAULT_ECOSYSTEM_WEIGHTS[ecosystem]) / totalWeight;
    return {
      ecosystem,
      count: Math.floor(exact),
      remainder: exact - Math.floor(exact),
    };
  });

  let assigned = allocations.reduce((sum, entry) => sum + entry.count, 0);
  const sorted = [...allocations].sort((left, right) => right.remainder - left.remainder);
  let cursor = 0;

  while (assigned < count) {
    sorted[cursor % sorted.length].count += 1;
    assigned += 1;
    cursor += 1;
  }

  return allocations.flatMap((entry) => Array.from({ length: entry.count }, () => entry.ecosystem));
}

function createDraft(ecosystem: Ecosystem, args: GeneratorArgs): CandidateDraft {
  switch (ecosystem) {
    case "typescript":
      return makeTypeScriptDraft(args);
    case "react-native":
      return makeReactNativeDraft(args);
    case "rust":
      return makeRustDraft(args);
    case "python":
      return makePythonDraft(args);
    case "go":
      return makeGoDraft(args);
    case "java":
      return makeJavaDraft(args);
    case "elixir":
      return makeElixirDraft(args);
    case "dotnet":
      return makeDotnetDraft(args);
  }
}

/**
 * Apply forced options to a draft's options object.
 * forceOptions: override specific key=value pairs (e.g., { search: "algolia" })
 * forceNonNone: re-sample keys that landed on "none" until they're non-none
 */
function applyForcedOptions(draft: CandidateDraft, args: GeneratorArgs): CandidateDraft {
  const forceOptions = args.forceOptions ?? {};
  const forceNonNone = new Set(args.forceNonNone ?? []);

  if (Object.keys(forceOptions).length === 0 && forceNonNone.size === 0) {
    return draft;
  }

  const options = { ...draft.options };

  // Apply forced values
  for (const [key, value] of Object.entries(forceOptions)) {
    if (key in options) {
      (options as Record<string, unknown>)[key] = value;
    }
  }

  // Re-sample non-none for forced categories (simple: if value is "none", pick first non-none)
  for (const key of forceNonNone) {
    const val = (options as Record<string, unknown>)[key];
    if (val === "none" || (Array.isArray(val) && val.length === 1 && val[0] === "none")) {
      // We can't re-sample here without knowing the valid values,
      // so we leave it — the sampleScalar/sampleArray key-aware version handles this
    }
  }

  return { ...draft, options };
}

export function generateBatch(args: GeneratorArgs, history: HistoricalLedger): ComboCandidate[] {
  _rng = args.rng ?? secureRandom;
  _forceOptions = args.forceOptions ?? {};
  _forceNonNone = new Set(args.forceNonNone ?? []);
  try {
    // For partitioned runs, generate enough combos to cover all partitions
    const totalNeeded = args.partitionTotal ? args.count * args.partitionTotal : args.count;

    const requestedEcosystems = weightedDistribution(totalNeeded, args.ecosystems);
    const combos: ComboCandidate[] = [];
    const currentBatchKeys = new Set<string>();
    let attempts = 0;
    const maxAttempts = Math.max(totalNeeded * 600, 3000);

    while (combos.length < totalNeeded && attempts < maxAttempts) {
      const ecosystem = requestedEcosystems[combos.length] ?? sampleOne(args.ecosystems);
      attempts += 1;

      try {
        const draft = applyForcedOptions(createDraft(ecosystem, args), args);
        const provisionalConfig = validateDraft(draft, "candidate");
        const provisionalFingerprint = buildHistoryFingerprint(provisionalConfig);
        const provisionalKey = fingerprintToKey(provisionalFingerprint);

        if (history.fingerprintKeys.has(provisionalKey) || currentBatchKeys.has(provisionalKey)) {
          continue;
        }

        const name = formatNameFromFingerprint(provisionalFingerprint);
        if (history.legacyNames.has(name) || combos.some((combo) => combo.name === name)) {
          continue;
        }

        const config = validateDraft(draft, name);
        const fingerprint = buildHistoryFingerprint(config);
        const fingerprintKey = fingerprintToKey(fingerprint);

        if (history.fingerprintKeys.has(fingerprintKey) || currentBatchKeys.has(fingerprintKey)) {
          continue;
        }

        combos.push({
          ecosystem,
          name,
          config,
          fingerprint,
          fingerprintKey,
          command: buildCommand(name, config),
        });
        currentBatchKeys.add(fingerprintKey);
      } catch {
        continue;
      }
    }

    // Partition: slice to this runner's portion
    if (args.partitionIndex !== undefined && args.partitionTotal && args.partitionTotal > 1) {
      const perPartition = Math.ceil(combos.length / args.partitionTotal);
      const start = args.partitionIndex * perPartition;
      return combos.slice(start, start + perPartition);
    }

    return combos;
  } finally {
    _rng = secureRandom;
    _forceOptions = {};
    _forceNonNone = new Set();
  }
}
