import type { CLIInput, ProjectConfig, StackPart, StackPartEcosystem, StackPartRole } from "./types";

import { analyzeStackCompatibility, type CompatibilityInput } from "./compatibility";
import { createCliDefaultProjectConfigBase, type CliDefaultProjectConfigBase } from "./defaults";
import { normalizeOptionId, type OptionCategory } from "./option-metadata";
import {
  formatStackPartSpec,
  getAddonStackPartBinding,
  legacyProjectConfigToStackParts,
  parseStackPartSpecs,
  stackPartsToLegacyProjectConfigPartial,
  validateStackParts,
} from "./stack-graph";

export type StackSelectionMode = "solo" | "multi";
export type StackSelectionInput = CompatibilityInput & {
  stackMode: StackSelectionMode;
  stackPartSpecs: string[];
};
export type StackSelectionState = StackSelectionInput;

export const DEFAULT_STACK_SELECTION: StackSelectionState = {
  stackMode: "solo",
  stackPartSpecs: [],
  ecosystem: "typescript",
  projectName: "my-app",
  webFrontend: ["tanstack-router"],
  nativeFrontend: ["none"],
  astroIntegration: "none",
  runtime: "bun",
  backend: "hono",
  database: "sqlite",
  orm: "drizzle",
  dbSetup: "none",
  auth: "better-auth",
  payments: "none",
  email: "none",
  fileUpload: "none",
  logging: "none",
  observability: "none",
  featureFlags: "none",
  analytics: "none",
  mobileNavigation: "none",
  mobileUI: "none",
  mobileStorage: "none",
  mobileTesting: "none",
  mobilePush: "none",
  mobileOTA: "none",
  mobileDeepLinking: "none",
  backendLibraries: "none",
  stateManagement: "none",
  forms: "react-hook-form",
  validation: "zod",
  testing: "vitest",
  realtime: "none",
  jobQueue: "none",
  caching: "none",
  rateLimit: "none",
  i18n: "none",
  animation: "none",
  cssFramework: "tailwind",
  uiLibrary: "shadcn-ui",
  shadcnBase: "radix",
  shadcnStyle: "nova",
  shadcnIconLibrary: "lucide",
  shadcnColorTheme: "neutral",
  shadcnBaseColor: "neutral",
  shadcnFont: "inter",
  shadcnRadius: "default",
  cms: "none",
  search: "none",
  fileStorage: "none",
  codeQuality: [],
  documentation: [],
  appPlatforms: ["turborepo"],
  packageManager: "bun",
  versionChannel: "stable",
  examples: [],
  aiSdk: "none",
  aiDocs: ["claude-md"],
  git: "true",
  install: "true",
  api: "trpc",
  webDeploy: "none",
  serverDeploy: "none",
  yolo: "false",
  rustWebFramework: "axum",
  rustFrontend: "none",
  rustOrm: "sea-orm",
  rustApi: "none",
  rustCli: "none",
  rustLibraries: [],
  rustLogging: "tracing",
  rustErrorHandling: "anyhow-thiserror",
  rustCaching: "none",
  rustAuth: "none",
  rustRealtime: "none",
  rustMessageQueue: "none",
  rustObservability: "none",
  rustTemplating: "none",
  pythonWebFramework: "fastapi",
  pythonOrm: "sqlalchemy",
  pythonValidation: "pydantic",
  pythonAi: [],
  pythonAuth: "none",
  pythonApi: "none",
  pythonTaskQueue: "none",
  pythonGraphql: "none",
  pythonQuality: "ruff",
  pythonTesting: [],
  pythonCaching: "none",
  pythonRealtime: "none",
  pythonObservability: "none",
  pythonCli: [],
  goWebFramework: "gin",
  goOrm: "gorm",
  goApi: "none",
  goCli: "none",
  goLogging: "zap",
  goAuth: "none",
  goTesting: [],
  goRealtime: "none",
  goMessageQueue: "none",
  goCaching: "none",
  goConfig: "none",
  goObservability: "none",
  javaWebFramework: "spring-boot",
  javaBuildTool: "maven",
  javaOrm: "none",
  javaAuth: "none",
  javaApi: "none",
  javaLogging: "none",
  javaLibraries: [],
  javaTestingLibraries: ["junit5"],
  dotnetWebFramework: "aspnet-minimal",
  dotnetOrm: "ef-core",
  dotnetAuth: "aspnet-identity",
  dotnetApi: "minimal-api",
  dotnetTesting: ["xunit"],
  dotnetJobQueue: "none",
  dotnetRealtime: "signalr",
  dotnetObservability: ["serilog"],
  dotnetValidation: "none",
  dotnetCaching: "none",
  dotnetDeploy: "docker",
  elixirWebFramework: "phoenix",
  elixirOrm: "ecto-sql",
  elixirAuth: "none",
  elixirApi: "rest",
  elixirRealtime: "channels",
  elixirJobs: "none",
  elixirValidation: "ecto-changesets",
  elixirHttp: "req",
  elixirJson: "jason",
  elixirEmail: "none",
  elixirCaching: "none",
  elixirObservability: "telemetry",
  elixirTesting: "ex_unit",
  elixirQuality: "credo",
  elixirDeploy: "none",
  elixirLibraries: [],
};

export type StackSelectionKey = keyof StackSelectionState;

type StackSelectionUrlValue = string | string[] | null | undefined;
type StackSelectionUrlRecord = Record<string, StackSelectionUrlValue>;

export const NON_OPTION_STACK_SELECTION_KEYS = [
  "stackMode",
  "stackPartSpecs",
  "ecosystem",
  "projectName",
  "yolo",
] as const;

export const STACK_SELECTION_OPTION_CATEGORY_BY_KEY: Record<
  Exclude<StackSelectionKey, (typeof NON_OPTION_STACK_SELECTION_KEYS)[number]>,
  OptionCategory
> = {
  webFrontend: "webFrontend",
  nativeFrontend: "nativeFrontend",
  astroIntegration: "astroIntegration",
  runtime: "runtime",
  backend: "backend",
  database: "database",
  orm: "orm",
  dbSetup: "dbSetup",
  auth: "auth",
  payments: "payments",
  email: "email",
  fileUpload: "fileUpload",
  logging: "logging",
  observability: "observability",
  featureFlags: "featureFlags",
  analytics: "analytics",
  mobileNavigation: "mobileNavigation",
  mobileUI: "mobileUI",
  mobileStorage: "mobileStorage",
  mobileTesting: "mobileTesting",
  mobilePush: "mobilePush",
  mobileOTA: "mobileOTA",
  mobileDeepLinking: "mobileDeepLinking",
  backendLibraries: "backendLibraries",
  stateManagement: "stateManagement",
  forms: "forms",
  validation: "validation",
  testing: "testing",
  realtime: "realtime",
  jobQueue: "jobQueue",
  caching: "caching",
  rateLimit: "rateLimit",
  i18n: "i18n",
  animation: "animation",
  cssFramework: "cssFramework",
  uiLibrary: "uiLibrary",
  shadcnBase: "shadcnBase",
  shadcnStyle: "shadcnStyle",
  shadcnIconLibrary: "shadcnIconLibrary",
  shadcnColorTheme: "shadcnColorTheme",
  shadcnBaseColor: "shadcnBaseColor",
  shadcnFont: "shadcnFont",
  shadcnRadius: "shadcnRadius",
  cms: "cms",
  search: "search",
  fileStorage: "fileStorage",
  codeQuality: "codeQuality",
  documentation: "documentation",
  appPlatforms: "appPlatforms",
  packageManager: "packageManager",
  versionChannel: "versionChannel",
  examples: "examples",
  aiSdk: "ai",
  aiDocs: "aiDocs",
  git: "git",
  install: "install",
  api: "api",
  webDeploy: "webDeploy",
  serverDeploy: "serverDeploy",
  rustWebFramework: "rustWebFramework",
  rustFrontend: "rustFrontend",
  rustOrm: "rustOrm",
  rustApi: "rustApi",
  rustCli: "rustCli",
  rustLibraries: "rustLibraries",
  rustLogging: "rustLogging",
  rustErrorHandling: "rustErrorHandling",
  rustCaching: "rustCaching",
  rustAuth: "rustAuth",
  rustRealtime: "rustRealtime",
  rustMessageQueue: "rustMessageQueue",
  rustObservability: "rustObservability",
  rustTemplating: "rustTemplating",
  pythonWebFramework: "pythonWebFramework",
  pythonOrm: "pythonOrm",
  pythonValidation: "pythonValidation",
  pythonAi: "pythonAi",
  pythonAuth: "pythonAuth",
  pythonApi: "pythonApi",
  pythonTaskQueue: "pythonTaskQueue",
  pythonGraphql: "pythonGraphql",
  pythonQuality: "pythonQuality",
  pythonTesting: "pythonTesting",
  pythonCaching: "pythonCaching",
  pythonRealtime: "pythonRealtime",
  pythonObservability: "pythonObservability",
  pythonCli: "pythonCli",
  goWebFramework: "goWebFramework",
  goOrm: "goOrm",
  goApi: "goApi",
  goCli: "goCli",
  goLogging: "goLogging",
  goAuth: "goAuth",
  goTesting: "goTesting",
  goRealtime: "goRealtime",
  goMessageQueue: "goMessageQueue",
  goCaching: "goCaching",
  goConfig: "goConfig",
  goObservability: "goObservability",
  javaWebFramework: "javaWebFramework",
  javaBuildTool: "javaBuildTool",
  javaOrm: "javaOrm",
  javaAuth: "javaAuth",
  javaApi: "javaApi",
  javaLogging: "javaLogging",
  javaLibraries: "javaLibraries",
  javaTestingLibraries: "javaTestingLibraries",
  dotnetWebFramework: "dotnetWebFramework",
  dotnetOrm: "dotnetOrm",
  dotnetAuth: "dotnetAuth",
  dotnetApi: "dotnetApi",
  dotnetTesting: "dotnetTesting",
  dotnetJobQueue: "dotnetJobQueue",
  dotnetRealtime: "dotnetRealtime",
  dotnetObservability: "dotnetObservability",
  dotnetValidation: "dotnetValidation",
  dotnetCaching: "dotnetCaching",
  dotnetDeploy: "dotnetDeploy",
  elixirWebFramework: "elixirWebFramework",
  elixirOrm: "elixirOrm",
  elixirAuth: "elixirAuth",
  elixirApi: "elixirApi",
  elixirRealtime: "elixirRealtime",
  elixirJobs: "elixirJobs",
  elixirValidation: "elixirValidation",
  elixirHttp: "elixirHttp",
  elixirJson: "elixirJson",
  elixirEmail: "elixirEmail",
  elixirCaching: "elixirCaching",
  elixirObservability: "elixirObservability",
  elixirTesting: "elixirTesting",
  elixirQuality: "elixirQuality",
  elixirDeploy: "elixirDeploy",
  elixirLibraries: "elixirLibraries",
};

export const VIRTUAL_NONE_MULTI_SELECT_STACK_SELECTION_KEYS = [
  "rustLibraries",
  "pythonAi",
  "javaLibraries",
  "javaTestingLibraries",
  "dotnetTesting",
  "dotnetObservability",
  "goTesting",
  "pythonTesting",
  "pythonCli",
  "elixirLibraries",
  "aiDocs",
] as const;

export function usesVirtualNoneStackSelection(
  key: StackSelectionKey,
): key is (typeof VIRTUAL_NONE_MULTI_SELECT_STACK_SELECTION_KEYS)[number] {
  return (VIRTUAL_NONE_MULTI_SELECT_STACK_SELECTION_KEYS as readonly string[]).includes(key);
}

export const STACK_SELECTION_URL_KEYS = {
  stackMode: "mode",
  stackPartSpecs: "part",
  ecosystem: "eco",
  projectName: "name",
  webFrontend: "fe-w",
  nativeFrontend: "fe-n",
  astroIntegration: "ai",
  runtime: "rt",
  backend: "be",
  database: "db",
  orm: "orm",
  dbSetup: "dbs",
  auth: "au",
  payments: "pay",
  email: "em",
  fileUpload: "fu",
  logging: "log",
  observability: "obs",
  featureFlags: "ff",
  analytics: "an",
  mobileNavigation: "mn",
  mobileUI: "mui",
  mobileStorage: "mst",
  mobileTesting: "mte",
  mobilePush: "mpu",
  mobileOTA: "mota",
  mobileDeepLinking: "mdl",
  backendLibraries: "bl",
  stateManagement: "sm",
  forms: "frm",
  validation: "val",
  testing: "tst",
  realtime: "rt2",
  jobQueue: "jq",
  caching: "cache",
  rateLimit: "rl",
  i18n: "i18n",
  animation: "anim",
  cssFramework: "css",
  uiLibrary: "ui",
  shadcnBase: "scb",
  shadcnStyle: "scs",
  shadcnIconLibrary: "sci",
  shadcnColorTheme: "scc",
  shadcnBaseColor: "scbc",
  shadcnFont: "scf",
  shadcnRadius: "scr",
  cms: "cms",
  search: "srch",
  fileStorage: "fs",
  codeQuality: "cq",
  documentation: "doc",
  appPlatforms: "ap",
  packageManager: "pm",
  versionChannel: "vc",
  examples: "ex",
  aiSdk: "aisdk",
  aiDocs: "aid",
  git: "git",
  install: "i",
  api: "api",
  webDeploy: "wd",
  serverDeploy: "sd",
  yolo: "yolo",
  rustWebFramework: "rwf",
  rustFrontend: "rfe",
  rustOrm: "rorm",
  rustApi: "rapi",
  rustCli: "rcli",
  rustLibraries: "rlib",
  rustLogging: "rlog",
  rustErrorHandling: "reh",
  rustCaching: "rca",
  rustAuth: "rau",
  rustRealtime: "rrt",
  rustMessageQueue: "rmq",
  rustObservability: "robs",
  rustTemplating: "rtpl",
  pythonWebFramework: "pwf",
  pythonOrm: "porm",
  pythonValidation: "pval",
  pythonAi: "pai",
  pythonAuth: "pauth",
  pythonApi: "papi",
  pythonTaskQueue: "ptq",
  pythonGraphql: "pgql",
  pythonQuality: "pq",
  pythonTesting: "ptest",
  pythonCaching: "pcache",
  pythonRealtime: "prt",
  pythonObservability: "pobs",
  pythonCli: "pcli",
  goWebFramework: "gwf",
  goOrm: "gorm",
  goApi: "gapi",
  goCli: "gcli",
  goLogging: "glog",
  goAuth: "gauth",
  goTesting: "gtest",
  goRealtime: "grt",
  goMessageQueue: "gmq",
  goCaching: "gcache",
  goConfig: "gcfg",
  goObservability: "gobs",
  javaWebFramework: "jwf",
  javaBuildTool: "jbt",
  javaOrm: "jorm",
  javaAuth: "jauth",
  javaApi: "japi",
  javaLogging: "jlog",
  javaLibraries: "jlib",
  javaTestingLibraries: "jtest",
  dotnetWebFramework: "dnwf",
  dotnetOrm: "dnorm",
  dotnetAuth: "dnauth",
  dotnetApi: "dnapi",
  dotnetTesting: "dntest",
  dotnetJobQueue: "dnjob",
  dotnetRealtime: "dnrt",
  dotnetObservability: "dnobs",
  dotnetValidation: "dnval",
  dotnetCaching: "dncache",
  dotnetDeploy: "dndeploy",
  elixirWebFramework: "ewf",
  elixirOrm: "eorm",
  elixirAuth: "eauth",
  elixirApi: "eapi",
  elixirRealtime: "ert",
  elixirJobs: "ejob",
  elixirValidation: "eval",
  elixirHttp: "ehttp",
  elixirJson: "ejson",
  elixirEmail: "emailx",
  elixirCaching: "ecache",
  elixirObservability: "eobs",
  elixirTesting: "etest",
  elixirQuality: "eq",
  elixirDeploy: "edeploy",
  elixirLibraries: "elib",
} as const satisfies Record<StackSelectionKey, string>;

export const STACK_SELECTION_KEYS = Object.keys(STACK_SELECTION_URL_KEYS) as StackSelectionKey[];

const stackSelectionArrayKeySet = new Set<StackSelectionKey>(
  STACK_SELECTION_KEYS.filter((key) => Array.isArray(DEFAULT_STACK_SELECTION[key])),
);

export function isArrayStackSelectionKey(key: StackSelectionKey): boolean {
  return stackSelectionArrayKeySet.has(key);
}

export function cloneDefaultStackSelection(): StackSelectionState {
  const cloned: Partial<StackSelectionState> = {};

  for (const key of STACK_SELECTION_KEYS) {
    const defaultValue = DEFAULT_STACK_SELECTION[key];
    (cloned as Record<string, unknown>)[key] = Array.isArray(defaultValue)
      ? [...defaultValue]
      : defaultValue;
  }

  return cloned as StackSelectionState;
}

export function normalizeStackSelectionValue<K extends StackSelectionKey>(
  key: K,
  value: StackSelectionState[K],
): StackSelectionState[K] {
  const category = STACK_SELECTION_OPTION_CATEGORY_BY_KEY[
    key as keyof typeof STACK_SELECTION_OPTION_CATEGORY_BY_KEY
  ] as OptionCategory | undefined;
  if (!category) return value;

  if (Array.isArray(value)) {
    const normalizedValues = [...new Set(value.map((entry) => normalizeOptionId(category, entry)))];
    const filteredValues =
      normalizedValues.length > 1
        ? normalizedValues.filter((entry) => entry !== "none")
        : normalizedValues;

    if (usesVirtualNoneStackSelection(key)) {
      if (filteredValues.length === 0) return [] as unknown as StackSelectionState[K];
      if (filteredValues.length === 1 && filteredValues[0] === "none") {
        return [] as unknown as StackSelectionState[K];
      }
      return filteredValues.filter((entry) => entry !== "none") as StackSelectionState[K];
    }

    return filteredValues as StackSelectionState[K];
  }

  if (typeof value === "string") {
    return normalizeOptionId(category, value) as StackSelectionState[K];
  }

  return value;
}

function normalizeStackSelectionMode(value: unknown): StackSelectionMode {
  return value === "multi" || value === "graph" ? "multi" : "solo";
}

export function normalizeStackSelection(selection: StackSelectionState): StackSelectionState {
  const normalized: Record<string, unknown> = { ...selection };
  normalized.stackMode = normalizeStackSelectionMode(normalized.stackMode);

  for (const key of Object.keys(STACK_SELECTION_OPTION_CATEGORY_BY_KEY) as StackSelectionKey[]) {
    normalized[key] = normalizeStackSelectionValue(
      key,
      normalized[key] as string | string[] | null,
    );
  }

  return normalized as StackSelectionState;
}

function parseArraySelectionValue(
  value: StackSelectionUrlValue,
  defaultValue: readonly string[],
): string[] {
  if (typeof value === "string") {
    return value.split(",").filter(Boolean);
  }

  if (Array.isArray(value)) {
    return value
      .flatMap((item) => (typeof item === "string" ? item.split(",") : []))
      .filter(Boolean);
  }

  return [...defaultValue];
}

function parseScalarSelectionValue(value: StackSelectionUrlValue, defaultValue: string): string {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    const firstString = value.find((item): item is string => typeof item === "string");
    if (firstString) return firstString;
  }

  return defaultValue;
}

export function parseStackSelectionFromUrlRecord(
  params: StackSelectionUrlRecord,
): StackSelectionState {
  const parsed = cloneDefaultStackSelection() as Record<string, unknown>;

  for (const stackKey of STACK_SELECTION_KEYS) {
    const urlKey = STACK_SELECTION_URL_KEYS[stackKey];
    const rawValue = params[urlKey];
    const defaultValue = DEFAULT_STACK_SELECTION[stackKey];

    if (isArrayStackSelectionKey(stackKey)) {
      parsed[stackKey] = parseArraySelectionValue(rawValue, defaultValue as string[]);
      continue;
    }

    parsed[stackKey] = parseScalarSelectionValue(rawValue, String(defaultValue ?? ""));
  }

  return normalizeStackSelection(parsed as StackSelectionState);
}

export function parseStackSelectionFromSearch(
  search: Record<string, unknown> | undefined,
): StackSelectionState {
  if (!search) return cloneDefaultStackSelection();

  const normalized: StackSelectionUrlRecord = {};

  for (const [key, value] of Object.entries(search)) {
    if (typeof value === "string" || Array.isArray(value)) {
      normalized[key] = value as StackSelectionUrlValue;
      continue;
    }

    if (typeof value === "number" || typeof value === "boolean") {
      normalized[key] = String(value);
    }
  }

  return parseStackSelectionFromUrlRecord(normalized);
}

export function createStackSelectionSearchParams(
  selection: StackSelectionState,
  options?: { includeDefaults?: boolean },
): URLSearchParams {
  const includeDefaults = options?.includeDefaults ?? false;
  const params = new URLSearchParams();

  for (const stackKey of STACK_SELECTION_KEYS) {
    const urlKey = STACK_SELECTION_URL_KEYS[stackKey];
    const value = selection[stackKey];
    const defaultValue = DEFAULT_STACK_SELECTION[stackKey];

    if (Array.isArray(value)) {
      const serialized = value.join(",");
      const defaultSerialized = Array.isArray(defaultValue) ? defaultValue.join(",") : "";
      if (includeDefaults || serialized !== defaultSerialized) {
        params.set(urlKey, serialized);
      }
      continue;
    }

    if (value === undefined || value === null) {
      if (includeDefaults && typeof defaultValue === "string") {
        params.set(urlKey, defaultValue);
      }
      continue;
    }

    const serialized = String(value);
    const defaultSerialized = typeof defaultValue === "string" ? defaultValue : "";
    if (includeDefaults || serialized !== defaultSerialized) {
      params.set(urlKey, serialized);
    }
  }

  return params;
}

export type StackProjectConfigOptions = {
  projectDir: string;
  relativePath: string;
  install?: boolean;
};

const CLI_SCALAR_CONFIG_FIELDS = [
  ["ecosystem", "ecosystem"],
  ["api", "api"],
  ["backend", "backend"],
  ["database", "database"],
  ["orm", "orm"],
  ["auth", "auth"],
  ["payments", "payments"],
  ["email", "email"],
  ["effect", "effect"],
  ["stateManagement", "stateManagement"],
  ["validation", "validation"],
  ["realtime", "realtime"],
  ["jobQueue", "jobQueue"],
  ["animation", "animation"],
  ["ai", "ai"],
  ["forms", "forms"],
  ["testing", "testing"],
  ["logging", "logging"],
  ["observability", "observability"],
  ["cms", "cms"],
  ["caching", "caching"],
  ["rateLimit", "rateLimit"],
  ["i18n", "i18n"],
  ["search", "search"],
  ["fileStorage", "fileStorage"],
  ["analytics", "analytics"],
  ["mobileNavigation", "mobileNavigation"],
  ["mobileUI", "mobileUI"],
  ["mobileStorage", "mobileStorage"],
  ["mobileTesting", "mobileTesting"],
  ["mobilePush", "mobilePush"],
  ["mobileOTA", "mobileOTA"],
  ["mobileDeepLinking", "mobileDeepLinking"],
  ["featureFlags", "featureFlags"],
  ["fileUpload", "fileUpload"],
  ["git", "git"],
  ["install", "install"],
  ["runtime", "runtime"],
  ["dbSetup", "dbSetup"],
  ["packageManager", "packageManager"],
  ["versionChannel", "versionChannel"],
  ["webDeploy", "webDeploy"],
  ["serverDeploy", "serverDeploy"],
  ["astroIntegration", "astroIntegration"],
  ["cssFramework", "cssFramework"],
  ["uiLibrary", "uiLibrary"],
  ["shadcnBase", "shadcnBase"],
  ["shadcnStyle", "shadcnStyle"],
  ["shadcnIconLibrary", "shadcnIconLibrary"],
  ["shadcnColorTheme", "shadcnColorTheme"],
  ["shadcnBaseColor", "shadcnBaseColor"],
  ["shadcnFont", "shadcnFont"],
  ["shadcnRadius", "shadcnRadius"],
  ["rustWebFramework", "rustWebFramework"],
  ["rustFrontend", "rustFrontend"],
  ["rustOrm", "rustOrm"],
  ["rustApi", "rustApi"],
  ["rustCli", "rustCli"],
  ["rustLogging", "rustLogging"],
  ["rustErrorHandling", "rustErrorHandling"],
  ["rustCaching", "rustCaching"],
  ["rustAuth", "rustAuth"],
  ["rustRealtime", "rustRealtime"],
  ["rustMessageQueue", "rustMessageQueue"],
  ["rustObservability", "rustObservability"],
  ["rustTemplating", "rustTemplating"],
  ["pythonWebFramework", "pythonWebFramework"],
  ["pythonOrm", "pythonOrm"],
  ["pythonValidation", "pythonValidation"],
  ["pythonAuth", "pythonAuth"],
  ["pythonApi", "pythonApi"],
  ["pythonTaskQueue", "pythonTaskQueue"],
  ["pythonGraphql", "pythonGraphql"],
  ["pythonQuality", "pythonQuality"],
  ["pythonCaching", "pythonCaching"],
  ["pythonRealtime", "pythonRealtime"],
  ["pythonObservability", "pythonObservability"],
  ["goWebFramework", "goWebFramework"],
  ["goOrm", "goOrm"],
  ["goApi", "goApi"],
  ["goCli", "goCli"],
  ["goLogging", "goLogging"],
  ["goAuth", "goAuth"],
  ["goRealtime", "goRealtime"],
  ["goMessageQueue", "goMessageQueue"],
  ["goCaching", "goCaching"],
  ["goConfig", "goConfig"],
  ["goObservability", "goObservability"],
  ["javaWebFramework", "javaWebFramework"],
  ["javaBuildTool", "javaBuildTool"],
  ["javaOrm", "javaOrm"],
  ["javaAuth", "javaAuth"],
  ["javaApi", "javaApi"],
  ["javaLogging", "javaLogging"],
  ["dotnetWebFramework", "dotnetWebFramework"],
  ["dotnetOrm", "dotnetOrm"],
  ["dotnetAuth", "dotnetAuth"],
  ["dotnetApi", "dotnetApi"],
  ["dotnetJobQueue", "dotnetJobQueue"],
  ["dotnetRealtime", "dotnetRealtime"],
  ["dotnetValidation", "dotnetValidation"],
  ["dotnetCaching", "dotnetCaching"],
  ["dotnetDeploy", "dotnetDeploy"],
  ["elixirWebFramework", "elixirWebFramework"],
  ["elixirOrm", "elixirOrm"],
  ["elixirAuth", "elixirAuth"],
  ["elixirApi", "elixirApi"],
  ["elixirRealtime", "elixirRealtime"],
  ["elixirJobs", "elixirJobs"],
  ["elixirValidation", "elixirValidation"],
  ["elixirHttp", "elixirHttp"],
  ["elixirJson", "elixirJson"],
  ["elixirEmail", "elixirEmail"],
  ["elixirCaching", "elixirCaching"],
  ["elixirObservability", "elixirObservability"],
  ["elixirTesting", "elixirTesting"],
  ["elixirQuality", "elixirQuality"],
  ["elixirDeploy", "elixirDeploy"],
] as const satisfies readonly (readonly [keyof CLIInput, keyof ProjectConfig])[];

const CLI_NON_EMPTY_ARRAY_CONFIG_FIELDS = [
  ["frontend", "frontend"],
  ["addons", "addons"],
  ["examples", "examples"],
] as const satisfies readonly (readonly [keyof CLIInput, keyof ProjectConfig])[];

const CLI_DEFINED_ARRAY_CONFIG_FIELDS = [
  ["aiDocs", "aiDocs"],
  ["rustLibraries", "rustLibraries"],
  ["pythonAi", "pythonAi"],
  ["javaLibraries", "javaLibraries"],
  ["javaTestingLibraries", "javaTestingLibraries"],
  ["dotnetTesting", "dotnetTesting"],
  ["dotnetObservability", "dotnetObservability"],
  ["goTesting", "goTesting"],
  ["pythonTesting", "pythonTesting"],
  ["pythonCli", "pythonCli"],
  ["elixirLibraries", "elixirLibraries"],
] as const satisfies readonly (readonly [keyof CLIInput, keyof ProjectConfig])[];

const PACKAGE_MANAGER_COMMANDS = {
  npm: "npx create-better-fullstack@latest",
  pnpm: "pnpm create better-fullstack@latest",
  yarn: "yarn create better-fullstack@latest",
  bun: "bun create better-fullstack@latest",
} as const;

const SELF_BACKENDS = new Set([
  "self-next",
  "self-tanstack-start",
  "self-astro",
  "self-nuxt",
  "self-svelte",
  "self-solid-start",
  "self-vinext",
]);

const RUST_CONFIG_KEYS = [
  "rustWebFramework",
  "rustFrontend",
  "rustOrm",
  "rustApi",
  "rustCli",
  "rustLibraries",
  "rustLogging",
  "rustErrorHandling",
  "rustCaching",
  "rustAuth",
  "rustRealtime",
  "rustMessageQueue",
  "rustObservability",
  "rustTemplating",
] as const satisfies readonly (keyof CliDefaultProjectConfigBase)[];

const PYTHON_CONFIG_KEYS = [
  "pythonWebFramework",
  "pythonOrm",
  "pythonValidation",
  "pythonAi",
  "pythonAuth",
  "pythonApi",
  "pythonTaskQueue",
  "pythonGraphql",
  "pythonQuality",
  "pythonTesting",
  "pythonCaching",
  "pythonRealtime",
  "pythonObservability",
  "pythonCli",
] as const satisfies readonly (keyof CliDefaultProjectConfigBase)[];

const GO_CONFIG_KEYS = [
  "goWebFramework",
  "goOrm",
  "goApi",
  "goCli",
  "goLogging",
  "goAuth",
  "goTesting",
  "goRealtime",
  "goMessageQueue",
  "goCaching",
  "goConfig",
  "goObservability",
] as const satisfies readonly (keyof CliDefaultProjectConfigBase)[];

const JAVA_CONFIG_KEYS = [
  "javaWebFramework",
  "javaBuildTool",
  "javaOrm",
  "javaAuth",
  "javaApi",
  "javaLogging",
  "javaLibraries",
  "javaTestingLibraries",
] as const satisfies readonly (keyof CliDefaultProjectConfigBase)[];

const DOTNET_CONFIG_KEYS = [
  "dotnetWebFramework",
  "dotnetOrm",
  "dotnetAuth",
  "dotnetApi",
  "dotnetTesting",
  "dotnetJobQueue",
  "dotnetRealtime",
  "dotnetObservability",
  "dotnetValidation",
  "dotnetCaching",
  "dotnetDeploy",
] as const satisfies readonly (keyof CliDefaultProjectConfigBase)[];

const ELIXIR_CONFIG_KEYS = [
  "elixirWebFramework",
  "elixirOrm",
  "elixirAuth",
  "elixirApi",
  "elixirRealtime",
  "elixirJobs",
  "elixirValidation",
  "elixirHttp",
  "elixirJson",
  "elixirEmail",
  "elixirCaching",
  "elixirObservability",
  "elixirTesting",
  "elixirQuality",
  "elixirDeploy",
  "elixirLibraries",
] as const satisfies readonly (keyof CliDefaultProjectConfigBase)[];

const REACT_NATIVE_CONFIG_KEYS = [
  "mobileNavigation",
  "mobileUI",
  "mobileStorage",
  "mobileTesting",
  "mobilePush",
  "mobileOTA",
  "mobileDeepLinking",
] as const satisfies readonly (keyof CliDefaultProjectConfigBase)[];

const COMMAND_ADDONS = new Set([
  "pwa",
  "tauri",
  "starlight",
  "biome",
  "lefthook",
  "husky",
  "turborepo",
  "nx",
  "docker-compose",
  "devcontainer",
  "ultracite",
  "fumadocs",
  "oxlint",
  "ruler",
  "opentui",
  "mcp",
  "skills",
  "wxt",
  "msw",
  "storybook",
  "swr",
  "tanstack-query",
  "tanstack-table",
  "tanstack-virtual",
  "tanstack-db",
  "tanstack-pacer",
]);

function withoutNone(values: readonly string[]): string[] {
  return values.filter((value) => value !== "none");
}

export function processCliArrayOption<T>(options: readonly (T | "none")[] | undefined) {
  if (!options || options.length === 0) return [];
  if (options.includes("none" as T | "none")) return [];
  return options.filter((item): item is T => item !== "none");
}

function toUniqueNonNoneArray(values: readonly string[]) {
  return [...new Set(withoutNone(values))];
}

function formatArrayFlag(flag: string, values: readonly string[]) {
  const filteredValues = toUniqueNonNoneArray(values);
  return `--${flag} ${filteredValues.join(" ") || "none"}`;
}

function formatTypeScriptAddonsFlag(selection: StackSelectionInput) {
  const addons = [...selection.codeQuality, ...selection.documentation, ...selection.appPlatforms];

  if (addons.length === 0) return "--addons none";

  return `--addons ${addons.filter((addon) => COMMAND_ADDONS.has(addon)).join(" ") || "none"}`;
}

type StackSelectionStringKey = {
  [K in keyof StackSelectionState]: StackSelectionState[K] extends string ? K : never;
}[keyof StackSelectionState];

const GRAPH_TYPESCRIPT_FRONTEND_FLAG_KEYS = [
  ["validation", "validation"],
  ["testing", "testing"],
] as const satisfies readonly [StackSelectionStringKey, string][];

const GRAPH_SHADCN_FLAG_KEYS = [
  ["shadcnBase", "shadcn-base"],
  ["shadcnStyle", "shadcn-style"],
  ["shadcnIconLibrary", "shadcn-icon-library"],
  ["shadcnColorTheme", "shadcn-color-theme"],
  ["shadcnBaseColor", "shadcn-base-color"],
  ["shadcnFont", "shadcn-font"],
  ["shadcnRadius", "shadcn-radius"],
] as const satisfies readonly [StackSelectionStringKey, string][];

const GRAPH_MOBILE_FLAG_KEYS = [
  ["mobilePush", "mobile-push"],
  ["mobileOTA", "mobile-ota"],
  ["mobileDeepLinking", "mobile-deep-linking"],
] as const satisfies readonly [StackSelectionStringKey, string][];

const GRAPH_TYPESCRIPT_BACKEND_FLAG_KEYS = [
  ["backendLibraries", "effect"],
] as const satisfies readonly [StackSelectionStringKey, string][];

const GRAPH_SHARED_BACKEND_FLAG_KEYS = [
  ["email", "email"],
  ["observability", "observability"],
  ["caching", "caching"],
  ["rateLimit", "rate-limit"],
  ["search", "search"],
] as const satisfies readonly [StackSelectionStringKey, string][];

const GRAPH_ELIXIR_BACKEND_FLAG_KEYS = [
  ["elixirJson", "elixir-json"],
] as const satisfies readonly [StackSelectionStringKey, string][];

function formatChangedStringFlag(
  selection: StackSelectionInput,
  key: StackSelectionStringKey,
  flag: string,
) {
  return selection[key] === DEFAULT_STACK_SELECTION[key] ? undefined : `--${flag} ${selection[key]}`;
}

type StackSelectionArrayKey = {
  [K in keyof StackSelectionState]: StackSelectionState[K] extends string[] ? K : never;
}[keyof StackSelectionState];

function formatChangedStringFlags(
  selection: StackSelectionInput,
  keys: readonly [StackSelectionStringKey, string][],
) {
  return keys.flatMap(([key, flag]) => {
    const formattedFlag = formatChangedStringFlag(selection, key, flag);
    return formattedFlag ? [formattedFlag] : [];
  });
}

function hasGraphPrimaryPart(
  parts: readonly { role: string; ecosystem: string; toolId?: string; ownerPartId?: string }[],
  role: "frontend" | "backend" | "mobile" | "database",
  ecosystem?: string,
  toolId?: string,
) {
  return parts.some(
    (part) =>
      part.role === role &&
      !part.ownerPartId &&
      (!ecosystem || part.ecosystem === ecosystem) &&
      (!toolId || part.toolId === toolId),
  );
}

type ScopedStackPartRole = Exclude<
  StackPartRole,
  "frontend" | "backend" | "mobile" | "database"
>;
type ScopedStackPartField = {
  ownerRole?: "frontend" | "backend" | "mobile" | "database";
  ecosystem: StackPartEcosystem;
  role: ScopedStackPartRole;
  value: string | readonly string[] | undefined;
  allowMultiple?: boolean;
};

const GRAPH_TYPESCRIPT_FRONTEND_PART_SELECTION_KEYS = [
  ["webDeploy", "deploy"],
  ["cssFramework", "css"],
  ["uiLibrary", "ui"],
  ["forms", "forms"],
  ["stateManagement", "stateManagement"],
  ["animation", "animation"],
  ["fileUpload", "fileUpload"],
  ["i18n", "i18n"],
  ["analytics", "analytics"],
] as const satisfies readonly [StackSelectionStringKey, ScopedStackPartRole][];

const GRAPH_TYPESCRIPT_BACKEND_PART_SELECTION_KEYS = [
  ["runtime", "runtime"],
  ["serverDeploy", "deploy"],
  ["payments", "payments"],
  ["email", "email"],
  ["aiSdk", "ai"],
  ["realtime", "realtime"],
  ["jobQueue", "jobQueue"],
  ["logging", "logging"],
  ["observability", "observability"],
  ["featureFlags", "featureFlags"],
  ["caching", "caching"],
  ["rateLimit", "rateLimit"],
  ["cms", "cms"],
  ["search", "search"],
  ["fileStorage", "fileStorage"],
] as const satisfies readonly [StackSelectionStringKey, ScopedStackPartRole][];

const GRAPH_ELIXIR_BACKEND_PART_SELECTION_KEYS = [
  ["elixirRealtime", "realtime"],
  ["elixirJobs", "jobQueue"],
  ["elixirValidation", "validation"],
  ["elixirHttp", "httpClient"],
  ["elixirEmail", "email"],
  ["elixirCaching", "caching"],
  ["elixirObservability", "observability"],
  ["elixirTesting", "testing"],
  ["elixirQuality", "codeQuality"],
  ["elixirDeploy", "deploy"],
] as const satisfies readonly [StackSelectionStringKey, ScopedStackPartRole][];

const GRAPH_DATABASE_PART_SELECTION_KEYS = [
  ["dbSetup", "dbSetup"],
] as const satisfies readonly [StackSelectionStringKey, ScopedStackPartRole][];

const GRAPH_MOBILE_PART_SELECTION_KEYS = [
  ["mobileNavigation", "navigation"],
  ["mobileUI", "ui"],
  ["mobileStorage", "storage"],
  ["mobileTesting", "testing"],
] as const satisfies readonly [StackSelectionStringKey, ScopedStackPartRole][];

const GRAPH_RUST_BACKEND_PART_SELECTION_KEYS = [
  ["rustCli", "cli"],
  ["rustLogging", "logging"],
  ["rustErrorHandling", "errorHandling"],
  ["rustCaching", "caching"],
] as const satisfies readonly [StackSelectionStringKey, ScopedStackPartRole][];

const GRAPH_RUST_BACKEND_ARRAY_PART_SELECTION_KEYS = [
  ["rustLibraries", "libraries"],
] as const satisfies readonly [StackSelectionArrayKey, ScopedStackPartRole][];

const GRAPH_PYTHON_BACKEND_PART_SELECTION_KEYS = [
  ["pythonValidation", "validation"],
  ["pythonTaskQueue", "jobQueue"],
  ["pythonGraphql", "api"],
  ["pythonQuality", "codeQuality"],
] as const satisfies readonly [StackSelectionStringKey, ScopedStackPartRole][];

const GRAPH_PYTHON_BACKEND_ARRAY_PART_SELECTION_KEYS = [
  ["pythonAi", "ai"],
] as const satisfies readonly [StackSelectionArrayKey, ScopedStackPartRole][];

const GRAPH_GO_BACKEND_PART_SELECTION_KEYS = [
  ["goCli", "cli"],
  ["goLogging", "logging"],
] as const satisfies readonly [StackSelectionStringKey, ScopedStackPartRole][];

const GRAPH_JAVA_BACKEND_PART_SELECTION_KEYS = [
  ["javaBuildTool", "buildTool"],
] as const satisfies readonly [StackSelectionStringKey, ScopedStackPartRole][];

const GRAPH_JAVA_BACKEND_ARRAY_PART_SELECTION_KEYS = [
  ["javaLibraries", "libraries"],
  ["javaTestingLibraries", "testing"],
] as const satisfies readonly [StackSelectionArrayKey, ScopedStackPartRole][];

const GRAPH_DOTNET_BACKEND_PART_SELECTION_KEYS = [
  ["dotnetOrm", "orm"],
  ["dotnetAuth", "auth"],
  ["dotnetApi", "api"],
  ["dotnetJobQueue", "jobQueue"],
  ["dotnetRealtime", "realtime"],
  ["dotnetCaching", "caching"],
  ["dotnetDeploy", "deploy"],
] as const satisfies readonly [StackSelectionStringKey, ScopedStackPartRole][];

const GRAPH_DOTNET_BACKEND_ARRAY_PART_SELECTION_KEYS = [
  ["dotnetTesting", "testing"],
  ["dotnetObservability", "observability"],
] as const satisfies readonly [StackSelectionArrayKey, ScopedStackPartRole][];

const GRAPH_TYPESCRIPT_FRONTEND_PART_CLI_KEYS = [
  ["webDeploy", "deploy"],
  ["cssFramework", "css"],
  ["uiLibrary", "ui"],
  ["forms", "forms"],
  ["stateManagement", "stateManagement"],
  ["animation", "animation"],
  ["fileUpload", "fileUpload"],
  ["i18n", "i18n"],
  ["analytics", "analytics"],
] as const satisfies readonly [keyof CLIInput, ScopedStackPartRole][];

const GRAPH_TYPESCRIPT_BACKEND_PART_CLI_KEYS = [
  ["runtime", "runtime"],
  ["serverDeploy", "deploy"],
  ["payments", "payments"],
  ["email", "email"],
  ["ai", "ai"],
  ["realtime", "realtime"],
  ["jobQueue", "jobQueue"],
  ["logging", "logging"],
  ["observability", "observability"],
  ["featureFlags", "featureFlags"],
  ["caching", "caching"],
  ["rateLimit", "rateLimit"],
  ["cms", "cms"],
  ["search", "search"],
  ["fileStorage", "fileStorage"],
] as const satisfies readonly [keyof CLIInput, ScopedStackPartRole][];

const GRAPH_ELIXIR_BACKEND_PART_CLI_KEYS = [
  ["elixirRealtime", "realtime"],
  ["elixirJobs", "jobQueue"],
  ["elixirValidation", "validation"],
  ["elixirHttp", "httpClient"],
  ["elixirEmail", "email"],
  ["elixirCaching", "caching"],
  ["elixirObservability", "observability"],
  ["elixirTesting", "testing"],
  ["elixirQuality", "codeQuality"],
  ["elixirDeploy", "deploy"],
] as const satisfies readonly [keyof CLIInput, ScopedStackPartRole][];

const GRAPH_DATABASE_PART_CLI_KEYS = [
  ["dbSetup", "dbSetup"],
] as const satisfies readonly [keyof CLIInput, ScopedStackPartRole][];

const GRAPH_MOBILE_PART_CLI_KEYS = [
  ["mobileNavigation", "navigation"],
  ["mobileUI", "ui"],
  ["mobileStorage", "storage"],
  ["mobileTesting", "testing"],
] as const satisfies readonly [keyof CLIInput, ScopedStackPartRole][];

const GRAPH_RUST_BACKEND_PART_CLI_KEYS = [
  ["rustCli", "cli"],
  ["rustLogging", "logging"],
  ["rustErrorHandling", "errorHandling"],
  ["rustCaching", "caching"],
] as const satisfies readonly [keyof CLIInput, ScopedStackPartRole][];

const GRAPH_RUST_BACKEND_ARRAY_PART_CLI_KEYS = [
  ["rustLibraries", "libraries"],
] as const satisfies readonly [keyof CLIInput, ScopedStackPartRole][];

const GRAPH_PYTHON_BACKEND_PART_CLI_KEYS = [
  ["pythonValidation", "validation"],
  ["pythonTaskQueue", "jobQueue"],
  ["pythonGraphql", "api"],
  ["pythonQuality", "codeQuality"],
] as const satisfies readonly [keyof CLIInput, ScopedStackPartRole][];

const GRAPH_PYTHON_BACKEND_ARRAY_PART_CLI_KEYS = [
  ["pythonAi", "ai"],
] as const satisfies readonly [keyof CLIInput, ScopedStackPartRole][];

const GRAPH_GO_BACKEND_PART_CLI_KEYS = [
  ["goCli", "cli"],
  ["goLogging", "logging"],
] as const satisfies readonly [keyof CLIInput, ScopedStackPartRole][];

const GRAPH_JAVA_BACKEND_PART_CLI_KEYS = [
  ["javaBuildTool", "buildTool"],
] as const satisfies readonly [keyof CLIInput, ScopedStackPartRole][];

const GRAPH_JAVA_BACKEND_ARRAY_PART_CLI_KEYS = [
  ["javaLibraries", "libraries"],
  ["javaTestingLibraries", "testing"],
] as const satisfies readonly [keyof CLIInput, ScopedStackPartRole][];

const GRAPH_DOTNET_BACKEND_PART_CLI_KEYS = [
  ["dotnetOrm", "orm"],
  ["dotnetAuth", "auth"],
  ["dotnetApi", "api"],
  ["dotnetJobQueue", "jobQueue"],
  ["dotnetRealtime", "realtime"],
  ["dotnetCaching", "caching"],
  ["dotnetDeploy", "deploy"],
] as const satisfies readonly [keyof CLIInput, ScopedStackPartRole][];

const GRAPH_DOTNET_BACKEND_ARRAY_PART_CLI_KEYS = [
  ["dotnetTesting", "testing"],
  ["dotnetObservability", "observability"],
] as const satisfies readonly [keyof CLIInput, ScopedStackPartRole][];

function getAddonScopedPartFields(addons: readonly string[] | undefined): ScopedStackPartField[] {
  return toUniqueNonNoneArray(addons ?? []).flatMap((addon) => {
    const binding = getAddonStackPartBinding(addon);
    if (!binding) return [];
    return [
      {
        ownerRole: binding.ownerRole,
        ecosystem: binding.ecosystem,
        role: binding.role as ScopedStackPartRole,
        value: addon,
        allowMultiple: true,
      },
    ];
  });
}

function getExampleScopedPartFields(examples: readonly string[] | undefined): ScopedStackPartField[] {
  return toUniqueNonNoneArray(examples ?? []).map((example) => ({
    ecosystem: "universal" as const,
    role: "examples" as const,
    value: example,
    allowMultiple: true,
  }));
}

function expandScopedStackPartSpecs(
  specs: readonly string[],
  fields: readonly ScopedStackPartField[],
) {
  const stackParts = parseStackPartSpecs(specs, "selected");
  const stackPartSpecs = stackParts.map((part) => formatStackPartSpec(part, stackParts));
  const stackPartSpecSet = new Set(stackPartSpecs);

  const getPrimary = (
    role: "frontend" | "backend" | "mobile" | "database",
    ecosystem: StackPartEcosystem,
  ) =>
    stackParts.find(
      (part) =>
        part.role === role &&
        part.ecosystem === ecosystem &&
        !part.ownerPartId &&
        part.source !== "provided",
    );
  const hasScoped = (
    ownerId: string,
    role: StackPartRole,
    ecosystem: StackPartEcosystem,
    toolId: string,
    allowMultiple = false,
  ) =>
    stackParts.some(
      (part) =>
        part.role === role &&
        part.ecosystem === ecosystem &&
        part.ownerPartId === ownerId &&
        part.source !== "provided" &&
        (allowMultiple ? part.toolId === toolId : true),
    );

  for (const { ownerRole, ecosystem, role, value, allowMultiple } of fields) {
    const values = Array.isArray(value) ? value : [value];
    for (const toolId of values) {
      if (!toolId || toolId === "none") continue;

      if (!ownerRole) {
        const spec = `${role}:${ecosystem}:${toolId}`;
        if (!stackPartSpecSet.has(spec)) {
          stackPartSpecs.push(spec);
          stackPartSpecSet.add(spec);
        }
        continue;
      }

      const owner = getPrimary(ownerRole, ecosystem);
      if (!owner || hasScoped(owner.id, role, ecosystem, toolId, allowMultiple)) {
        continue;
      }
      const spec = `${ownerRole}.${role}:${ecosystem}:${toolId}`;
      if (!stackPartSpecSet.has(spec)) {
        stackPartSpecs.push(spec);
        stackPartSpecSet.add(spec);
      }
    }
  }

  return stackPartSpecs;
}

function getSelectionScopedPartFields(
  selection: StackSelectionInput,
): ScopedStackPartField[] {
  return [
    ...GRAPH_TYPESCRIPT_FRONTEND_PART_SELECTION_KEYS.map(([key, role]) => ({
      ownerRole: "frontend" as const,
      ecosystem: "typescript" as const,
      role,
      value: selection[key],
    })),
    ...GRAPH_TYPESCRIPT_BACKEND_PART_SELECTION_KEYS.map(([key, role]) => ({
      ownerRole: "backend" as const,
      ecosystem: "typescript" as const,
      role,
      value: selection[key],
    })),
    ...GRAPH_ELIXIR_BACKEND_PART_SELECTION_KEYS.map(([key, role]) => ({
      ownerRole: "backend" as const,
      ecosystem: "elixir" as const,
      role,
      value: selection[key],
    })),
    ...GRAPH_MOBILE_PART_SELECTION_KEYS.map(([key, role]) => ({
      ownerRole: "mobile" as const,
      ecosystem: "react-native" as const,
      role,
      value: selection[key],
    })),
    ...GRAPH_RUST_BACKEND_PART_SELECTION_KEYS.map(([key, role]) => ({
      ownerRole: "backend" as const,
      ecosystem: "rust" as const,
      role,
      value: selection[key],
    })),
    ...GRAPH_RUST_BACKEND_ARRAY_PART_SELECTION_KEYS.map(([key, role]) => ({
      ownerRole: "backend" as const,
      ecosystem: "rust" as const,
      role,
      value: selection[key],
      allowMultiple: true,
    })),
    ...GRAPH_PYTHON_BACKEND_PART_SELECTION_KEYS.map(([key, role]) => ({
      ownerRole: "backend" as const,
      ecosystem: "python" as const,
      role,
      value: selection[key],
    })),
    ...GRAPH_PYTHON_BACKEND_ARRAY_PART_SELECTION_KEYS.map(([key, role]) => ({
      ownerRole: "backend" as const,
      ecosystem: "python" as const,
      role,
      value: selection[key],
      allowMultiple: true,
    })),
    ...GRAPH_GO_BACKEND_PART_SELECTION_KEYS.map(([key, role]) => ({
      ownerRole: "backend" as const,
      ecosystem: "go" as const,
      role,
      value: selection[key],
    })),
    ...GRAPH_JAVA_BACKEND_PART_SELECTION_KEYS.map(([key, role]) => ({
      ownerRole: "backend" as const,
      ecosystem: "java" as const,
      role,
      value: selection[key],
    })),
    ...GRAPH_JAVA_BACKEND_ARRAY_PART_SELECTION_KEYS.map(([key, role]) => ({
      ownerRole: "backend" as const,
      ecosystem: "java" as const,
      role,
      value: selection[key],
      allowMultiple: true,
    })),
    ...GRAPH_DOTNET_BACKEND_PART_SELECTION_KEYS.map(([key, role]) => ({
      ownerRole: "backend" as const,
      ecosystem: "dotnet" as const,
      role,
      value: selection[key],
    })),
    ...GRAPH_DOTNET_BACKEND_ARRAY_PART_SELECTION_KEYS.map(([key, role]) => ({
      ownerRole: "backend" as const,
      ecosystem: "dotnet" as const,
      role,
      value: selection[key],
      allowMultiple: true,
    })),
    ...GRAPH_DATABASE_PART_SELECTION_KEYS.map(([key, role]) => ({
      ownerRole: "database" as const,
      ecosystem: "universal" as const,
      role,
      value: selection[key],
    })),
    ...getAddonScopedPartFields([
      ...selection.codeQuality,
      ...selection.documentation,
      ...selection.appPlatforms,
    ]),
    ...getExampleScopedPartFields(selection.examples),
  ];
}

function getCliScopedPartFields(input: CLIInput): ScopedStackPartField[] {
  const getValue = (key: keyof CLIInput) => {
    const value = input[key];
    return typeof value === "string" ? value : undefined;
  };
  const getArrayValue = (key: keyof CLIInput) => {
    const value = input[key];
    return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : undefined;
  };

  return [
    ...GRAPH_TYPESCRIPT_FRONTEND_PART_CLI_KEYS.map(([key, role]) => ({
      ownerRole: "frontend" as const,
      ecosystem: "typescript" as const,
      role,
      value: getValue(key),
    })),
    ...GRAPH_TYPESCRIPT_BACKEND_PART_CLI_KEYS.map(([key, role]) => ({
      ownerRole: "backend" as const,
      ecosystem: "typescript" as const,
      role,
      value: getValue(key),
    })),
    ...GRAPH_ELIXIR_BACKEND_PART_CLI_KEYS.map(([key, role]) => ({
      ownerRole: "backend" as const,
      ecosystem: "elixir" as const,
      role,
      value: getValue(key),
    })),
    ...GRAPH_MOBILE_PART_CLI_KEYS.map(([key, role]) => ({
      ownerRole: "mobile" as const,
      ecosystem: "react-native" as const,
      role,
      value: getValue(key),
    })),
    ...GRAPH_RUST_BACKEND_PART_CLI_KEYS.map(([key, role]) => ({
      ownerRole: "backend" as const,
      ecosystem: "rust" as const,
      role,
      value: getValue(key),
    })),
    ...GRAPH_RUST_BACKEND_ARRAY_PART_CLI_KEYS.map(([key, role]) => ({
      ownerRole: "backend" as const,
      ecosystem: "rust" as const,
      role,
      value: getArrayValue(key),
      allowMultiple: true,
    })),
    ...GRAPH_PYTHON_BACKEND_PART_CLI_KEYS.map(([key, role]) => ({
      ownerRole: "backend" as const,
      ecosystem: "python" as const,
      role,
      value: getValue(key),
    })),
    ...GRAPH_PYTHON_BACKEND_ARRAY_PART_CLI_KEYS.map(([key, role]) => ({
      ownerRole: "backend" as const,
      ecosystem: "python" as const,
      role,
      value: getArrayValue(key),
      allowMultiple: true,
    })),
    ...GRAPH_GO_BACKEND_PART_CLI_KEYS.map(([key, role]) => ({
      ownerRole: "backend" as const,
      ecosystem: "go" as const,
      role,
      value: getValue(key),
    })),
    ...GRAPH_JAVA_BACKEND_PART_CLI_KEYS.map(([key, role]) => ({
      ownerRole: "backend" as const,
      ecosystem: "java" as const,
      role,
      value: getValue(key),
    })),
    ...GRAPH_JAVA_BACKEND_ARRAY_PART_CLI_KEYS.map(([key, role]) => ({
      ownerRole: "backend" as const,
      ecosystem: "java" as const,
      role,
      value: getArrayValue(key),
      allowMultiple: true,
    })),
    ...GRAPH_DOTNET_BACKEND_PART_CLI_KEYS.map(([key, role]) => ({
      ownerRole: "backend" as const,
      ecosystem: "dotnet" as const,
      role,
      value: getValue(key),
    })),
    ...GRAPH_DOTNET_BACKEND_ARRAY_PART_CLI_KEYS.map(([key, role]) => ({
      ownerRole: "backend" as const,
      ecosystem: "dotnet" as const,
      role,
      value: getArrayValue(key),
      allowMultiple: true,
    })),
    ...GRAPH_DATABASE_PART_CLI_KEYS.map(([key, role]) => ({
      ownerRole: "database" as const,
      ecosystem: "universal" as const,
      role,
      value: getValue(key),
    })),
    ...getAddonScopedPartFields(input.addons),
    ...getExampleScopedPartFields(input.examples),
  ];
}

function mapBackendToCli(backend: string) {
  return SELF_BACKENDS.has(backend) ? "self" : backend;
}

export function isGraphStackSelection(
  selection: Pick<StackSelectionInput, "stackMode" | "stackPartSpecs">,
): boolean {
  return (
    (selection.stackMode === "multi" || String(selection.stackMode) === "graph") &&
    selection.stackPartSpecs.length > 0
  );
}

function getGraphStackParts(selection: StackSelectionInput) {
  const stackPartSpecs = expandScopedStackPartSpecs(
    selection.stackPartSpecs,
    getSelectionScopedPartFields(selection),
  );
  const stackParts = parseStackPartSpecs(stackPartSpecs, "selected");
  const validation = validateStackParts(stackParts);
  if (validation.issues.length > 0) {
    throw new Error(validation.issues.map((issue) => issue.message).join("\n"));
  }
  return stackParts;
}

function getAdjustedSelection(selection: StackSelectionInput): StackSelectionInput {
  const compatibility = analyzeStackCompatibility(selection);
  if (!compatibility.adjustedStack) return selection;
  return { ...selection, ...compatibility.adjustedStack };
}

function getProjectName(selection: StackSelectionInput, projectName?: string) {
  return projectName?.trim() || selection.projectName?.trim() || "my-app";
}

function areStringArraysEqual(left: readonly string[], right: readonly string[]) {
  const sortedLeft = [...left].sort();
  const sortedRight = [...right].sort();

  return (
    sortedLeft.length === sortedRight.length &&
    sortedLeft.every((value, index) => value === sortedRight[index])
  );
}

function isStringArray(value: readonly unknown[]): value is readonly string[] {
  return value.every((item) => typeof item === "string");
}

export function isStackSelectionDefault<K extends keyof StackSelectionState>(
  selection: StackSelectionState,
  key: K,
  value: StackSelectionState[K],
): boolean {
  const defaultValue = DEFAULT_STACK_SELECTION[key];

  if (selection.backend === "convex") {
    if (key === "runtime" && value === "none") return true;
    if (key === "database" && value === "none") return true;
    if (key === "orm" && value === "none") return true;
    if (key === "api" && value === "none") return true;
    if (key === "auth" && value === "none") return true;
    if (key === "dbSetup" && value === "none") return true;
  }

  if (Array.isArray(defaultValue) && Array.isArray(value)) {
    return areStringArraysEqual(defaultValue, value);
  }

  return defaultValue === value;
}

export function cliInputToProjectConfigPartial(
  input: CLIInput,
  projectName?: string,
): Partial<ProjectConfig> {
  const config: Partial<ProjectConfig> = {};
  const assignableConfig = config as Partial<Record<keyof ProjectConfig, unknown>>;

  for (const [inputKey, configKey] of CLI_SCALAR_CONFIG_FIELDS) {
    const value = input[inputKey];
    if (value !== undefined) {
      assignableConfig[configKey] = value;
    }
  }

  if (projectName) {
    config.projectName = projectName;
  }

  for (const [inputKey, configKey] of CLI_NON_EMPTY_ARRAY_CONFIG_FIELDS) {
    const value = input[inputKey];
    if (Array.isArray(value) && value.length > 0) {
      assignableConfig[configKey] = processCliArrayOption(value);
    }
  }

  for (const [inputKey, configKey] of CLI_DEFINED_ARRAY_CONFIG_FIELDS) {
    const value = input[inputKey];
    if (Array.isArray(value)) {
      assignableConfig[configKey] = processCliArrayOption(value);
    }
  }

  if (Array.isArray(input.part) && input.part.length > 0) {
    const stackParts = getCliGraphStackParts(input);
    Object.assign(config, stackPartsToLegacyProjectConfigPartial(stackParts), { stackParts });
  }

  return config;
}

function getCliGraphStackParts(input: CLIInput): StackPart[] {
  const inputSpecs = [...(input.part ?? [])];
  const stackParts = parseStackPartSpecs(inputSpecs, "selected");
  const stackPartSpecs = stackParts.map((part) => formatStackPartSpec(part, stackParts));
  const stackPartSpecSet = new Set(stackPartSpecs);

  const hasPrimary = (role: StackPartRole, ecosystem: StackPartEcosystem) =>
    stackParts.some(
      (part) =>
        part.role === role &&
        part.ecosystem === ecosystem &&
        !part.ownerPartId &&
        part.source !== "provided",
    );
  const hasScoped = (role: StackPartRole, ecosystem: StackPartEcosystem) =>
    stackParts.some(
      (part) => part.role === role && part.ecosystem === ecosystem && part.source !== "provided",
    );
  const addScopedBackendPart = (
    ecosystem: Exclude<StackPartEcosystem, "universal" | "react-native">,
    role: Exclude<StackPartRole, "frontend" | "backend" | "mobile" | "database">,
    value: string | undefined,
  ) => {
    if (!value || value === "none" || !hasPrimary("backend", ecosystem) || hasScoped(role, ecosystem)) {
      return;
    }
    const spec = `backend.${role}:${ecosystem}:${value}`;
    if (!stackPartSpecSet.has(spec)) {
      stackPartSpecs.push(spec);
      stackPartSpecSet.add(spec);
    }
  };

  if (input.database && input.database !== "none" && !hasPrimary("database", "universal")) {
    const spec = `database:universal:${input.database}`;
    if (!stackPartSpecSet.has(spec)) {
      stackPartSpecs.push(spec);
      stackPartSpecSet.add(spec);
    }
  }

  addScopedBackendPart("typescript", "orm", input.orm);
  addScopedBackendPart("typescript", "api", input.api);
  addScopedBackendPart("typescript", "auth", input.auth);
  addScopedBackendPart("rust", "orm", input.rustOrm);
  addScopedBackendPart("rust", "api", input.rustApi);
  addScopedBackendPart("rust", "auth", input.rustAuth);
  addScopedBackendPart("python", "orm", input.pythonOrm);
  addScopedBackendPart("python", "api", input.pythonApi);
  addScopedBackendPart("python", "api", input.pythonGraphql);
  addScopedBackendPart("python", "auth", input.pythonAuth);
  addScopedBackendPart("go", "orm", input.goOrm);
  addScopedBackendPart("go", "api", input.goApi);
  addScopedBackendPart("go", "auth", input.goAuth);
  addScopedBackendPart("java", "orm", input.javaOrm);
  addScopedBackendPart("java", "auth", input.javaAuth);
  addScopedBackendPart("dotnet", "orm", input.dotnetOrm);
  addScopedBackendPart("dotnet", "api", input.dotnetApi);
  addScopedBackendPart("dotnet", "auth", input.dotnetAuth);
  addScopedBackendPart("elixir", "orm", input.elixirOrm);
  addScopedBackendPart("elixir", "api", input.elixirApi);
  addScopedBackendPart("elixir", "auth", input.elixirAuth);

  return parseStackPartSpecs(
    expandScopedStackPartSpecs(stackPartSpecs, getCliScopedPartFields(input)),
    "selected",
  );
}

function buildProjectConfigBase(
  selection: StackSelectionInput,
  projectName: string,
  relativePath: string,
  install: boolean,
): CliDefaultProjectConfigBase {
  const stack = getAdjustedSelection(selection);
  const frontend = [
    ...toUniqueNonNoneArray(stack.webFrontend),
    ...toUniqueNonNoneArray(stack.nativeFrontend),
  ] as ProjectConfig["frontend"];
  const baseConfig: CliDefaultProjectConfigBase = {
    projectName,
    relativePath,
    ecosystem: stack.ecosystem as ProjectConfig["ecosystem"],
    database: stack.database as ProjectConfig["database"],
    orm: stack.orm as ProjectConfig["orm"],
    backend: mapBackendToCli(stack.backend) as ProjectConfig["backend"],
    runtime: stack.runtime as ProjectConfig["runtime"],
    frontend: frontend.length > 0 ? frontend : ["tanstack-router"],
    addons: [
      ...toUniqueNonNoneArray(stack.codeQuality),
      ...toUniqueNonNoneArray(stack.documentation),
      ...toUniqueNonNoneArray(stack.appPlatforms),
    ] as ProjectConfig["addons"],
    examples: toUniqueNonNoneArray(stack.examples) as ProjectConfig["examples"],
    auth: stack.auth as ProjectConfig["auth"],
    payments: stack.payments as ProjectConfig["payments"],
    email: stack.email as ProjectConfig["email"],
    fileUpload: stack.fileUpload as ProjectConfig["fileUpload"],
    effect: stack.backendLibraries as ProjectConfig["effect"],
    ai: stack.aiSdk as ProjectConfig["ai"],
    stateManagement: stack.stateManagement as ProjectConfig["stateManagement"],
    forms: stack.forms as ProjectConfig["forms"],
    testing: stack.testing as ProjectConfig["testing"],
    git: stack.git === "true",
    packageManager: stack.packageManager as ProjectConfig["packageManager"],
    versionChannel: stack.versionChannel as ProjectConfig["versionChannel"],
    install,
    dbSetup: stack.dbSetup as ProjectConfig["dbSetup"],
    api: stack.api as ProjectConfig["api"],
    webDeploy: stack.webDeploy as ProjectConfig["webDeploy"],
    serverDeploy: stack.serverDeploy as ProjectConfig["serverDeploy"],
    astroIntegration: stack.astroIntegration as ProjectConfig["astroIntegration"],
    cssFramework: stack.cssFramework as ProjectConfig["cssFramework"],
    uiLibrary: stack.uiLibrary as ProjectConfig["uiLibrary"],
    shadcnBase: stack.shadcnBase as ProjectConfig["shadcnBase"],
    shadcnStyle: stack.shadcnStyle as ProjectConfig["shadcnStyle"],
    shadcnIconLibrary: stack.shadcnIconLibrary as ProjectConfig["shadcnIconLibrary"],
    shadcnColorTheme: stack.shadcnColorTheme as ProjectConfig["shadcnColorTheme"],
    shadcnBaseColor: stack.shadcnBaseColor as ProjectConfig["shadcnBaseColor"],
    shadcnFont: stack.shadcnFont as ProjectConfig["shadcnFont"],
    shadcnRadius: stack.shadcnRadius as ProjectConfig["shadcnRadius"],
    validation: stack.validation as ProjectConfig["validation"],
    realtime: stack.realtime as ProjectConfig["realtime"],
    jobQueue: stack.jobQueue as ProjectConfig["jobQueue"],
    animation: stack.animation as ProjectConfig["animation"],
    logging: stack.logging as ProjectConfig["logging"],
    observability: stack.observability as ProjectConfig["observability"],
    featureFlags: stack.featureFlags as ProjectConfig["featureFlags"],
    analytics: stack.analytics as ProjectConfig["analytics"],
    mobileNavigation: stack.mobileNavigation as ProjectConfig["mobileNavigation"],
    mobileUI: stack.mobileUI as ProjectConfig["mobileUI"],
    mobileStorage: stack.mobileStorage as ProjectConfig["mobileStorage"],
    mobileTesting: stack.mobileTesting as ProjectConfig["mobileTesting"],
    mobilePush: stack.mobilePush as ProjectConfig["mobilePush"],
    mobileOTA: stack.mobileOTA as ProjectConfig["mobileOTA"],
    mobileDeepLinking: stack.mobileDeepLinking as ProjectConfig["mobileDeepLinking"],
    cms: stack.cms as ProjectConfig["cms"],
    caching: stack.caching as ProjectConfig["caching"],
    rateLimit: stack.rateLimit as ProjectConfig["rateLimit"],
    i18n: stack.i18n as ProjectConfig["i18n"],
    search: stack.search as ProjectConfig["search"],
    fileStorage: stack.fileStorage as ProjectConfig["fileStorage"],
    rustWebFramework: stack.rustWebFramework as ProjectConfig["rustWebFramework"],
    rustFrontend: stack.rustFrontend as ProjectConfig["rustFrontend"],
    rustOrm: stack.rustOrm as ProjectConfig["rustOrm"],
    rustApi: stack.rustApi as ProjectConfig["rustApi"],
    rustCli: stack.rustCli as ProjectConfig["rustCli"],
    rustLogging: stack.rustLogging as ProjectConfig["rustLogging"],
    rustErrorHandling: stack.rustErrorHandling as ProjectConfig["rustErrorHandling"],
    rustCaching: stack.rustCaching as ProjectConfig["rustCaching"],
    rustAuth: stack.rustAuth as ProjectConfig["rustAuth"],
    rustRealtime: stack.rustRealtime as ProjectConfig["rustRealtime"],
    rustMessageQueue: stack.rustMessageQueue as ProjectConfig["rustMessageQueue"],
    rustObservability: stack.rustObservability as ProjectConfig["rustObservability"],
    rustTemplating: stack.rustTemplating as ProjectConfig["rustTemplating"],
    rustLibraries: toUniqueNonNoneArray(stack.rustLibraries) as ProjectConfig["rustLibraries"],
    pythonWebFramework: stack.pythonWebFramework as ProjectConfig["pythonWebFramework"],
    pythonOrm: stack.pythonOrm as ProjectConfig["pythonOrm"],
    pythonValidation: stack.pythonValidation as ProjectConfig["pythonValidation"],
    pythonAi: toUniqueNonNoneArray(stack.pythonAi) as ProjectConfig["pythonAi"],
    pythonAuth: stack.pythonAuth as ProjectConfig["pythonAuth"],
    pythonApi: stack.pythonApi as ProjectConfig["pythonApi"],
    pythonTaskQueue: stack.pythonTaskQueue as ProjectConfig["pythonTaskQueue"],
    pythonGraphql: stack.pythonGraphql as ProjectConfig["pythonGraphql"],
    pythonQuality: stack.pythonQuality as ProjectConfig["pythonQuality"],
    pythonTesting: toUniqueNonNoneArray(stack.pythonTesting) as ProjectConfig["pythonTesting"],
    pythonCaching: stack.pythonCaching as ProjectConfig["pythonCaching"],
    pythonRealtime: stack.pythonRealtime as ProjectConfig["pythonRealtime"],
    pythonObservability: stack.pythonObservability as ProjectConfig["pythonObservability"],
    pythonCli: toUniqueNonNoneArray(stack.pythonCli) as ProjectConfig["pythonCli"],
    goWebFramework: stack.goWebFramework as ProjectConfig["goWebFramework"],
    goOrm: stack.goOrm as ProjectConfig["goOrm"],
    goApi: stack.goApi as ProjectConfig["goApi"],
    goCli: stack.goCli as ProjectConfig["goCli"],
    goLogging: stack.goLogging as ProjectConfig["goLogging"],
    goAuth: stack.goAuth as ProjectConfig["goAuth"],
    goTesting: toUniqueNonNoneArray(stack.goTesting) as ProjectConfig["goTesting"],
    goRealtime: stack.goRealtime as ProjectConfig["goRealtime"],
    goMessageQueue: stack.goMessageQueue as ProjectConfig["goMessageQueue"],
    goCaching: stack.goCaching as ProjectConfig["goCaching"],
    goConfig: stack.goConfig as ProjectConfig["goConfig"],
    goObservability: stack.goObservability as ProjectConfig["goObservability"],
    javaWebFramework: stack.javaWebFramework as ProjectConfig["javaWebFramework"],
    javaBuildTool: stack.javaBuildTool as ProjectConfig["javaBuildTool"],
    javaOrm: stack.javaOrm as ProjectConfig["javaOrm"],
    javaAuth: stack.javaAuth as ProjectConfig["javaAuth"],
    javaApi: stack.javaApi as ProjectConfig["javaApi"],
    javaLogging: stack.javaLogging as ProjectConfig["javaLogging"],
    javaLibraries: toUniqueNonNoneArray(stack.javaLibraries) as ProjectConfig["javaLibraries"],
    javaTestingLibraries: toUniqueNonNoneArray(
      stack.javaTestingLibraries,
    ) as ProjectConfig["javaTestingLibraries"],
    dotnetWebFramework: stack.dotnetWebFramework as ProjectConfig["dotnetWebFramework"],
    dotnetOrm: stack.dotnetOrm as ProjectConfig["dotnetOrm"],
    dotnetAuth: stack.dotnetAuth as ProjectConfig["dotnetAuth"],
    dotnetApi: stack.dotnetApi as ProjectConfig["dotnetApi"],
    dotnetTesting: toUniqueNonNoneArray(stack.dotnetTesting) as ProjectConfig["dotnetTesting"],
    dotnetJobQueue: stack.dotnetJobQueue as ProjectConfig["dotnetJobQueue"],
    dotnetRealtime: stack.dotnetRealtime as ProjectConfig["dotnetRealtime"],
    dotnetObservability: toUniqueNonNoneArray(
      stack.dotnetObservability,
    ) as ProjectConfig["dotnetObservability"],
    dotnetValidation: stack.dotnetValidation as ProjectConfig["dotnetValidation"],
    dotnetCaching: stack.dotnetCaching as ProjectConfig["dotnetCaching"],
    dotnetDeploy: stack.dotnetDeploy as ProjectConfig["dotnetDeploy"],
    elixirWebFramework: stack.elixirWebFramework as ProjectConfig["elixirWebFramework"],
    elixirOrm: stack.elixirOrm as ProjectConfig["elixirOrm"],
    elixirAuth: stack.elixirAuth as ProjectConfig["elixirAuth"],
    elixirApi: stack.elixirApi as ProjectConfig["elixirApi"],
    elixirRealtime: stack.elixirRealtime as ProjectConfig["elixirRealtime"],
    elixirJobs: stack.elixirJobs as ProjectConfig["elixirJobs"],
    elixirValidation: stack.elixirValidation as ProjectConfig["elixirValidation"],
    elixirHttp: stack.elixirHttp as ProjectConfig["elixirHttp"],
    elixirJson: stack.elixirJson as ProjectConfig["elixirJson"],
    elixirEmail: stack.elixirEmail as ProjectConfig["elixirEmail"],
    elixirCaching: stack.elixirCaching as ProjectConfig["elixirCaching"],
    elixirObservability: stack.elixirObservability as ProjectConfig["elixirObservability"],
    elixirTesting: stack.elixirTesting as ProjectConfig["elixirTesting"],
    elixirQuality: stack.elixirQuality as ProjectConfig["elixirQuality"],
    elixirDeploy: stack.elixirDeploy as ProjectConfig["elixirDeploy"],
    elixirLibraries: toUniqueNonNoneArray(
      stack.elixirLibraries,
    ) as ProjectConfig["elixirLibraries"],
    aiDocs: toUniqueNonNoneArray(stack.aiDocs) as ProjectConfig["aiDocs"],
  };

  if (!isGraphStackSelection(stack)) {
    return baseConfig;
  }

  const stackParts = getGraphStackParts(stack);
  const loweredGraphConfig = stackPartsToLegacyProjectConfigPartial(stackParts);

  return {
    ...baseConfig,
    ...loweredGraphConfig,
    projectName,
    relativePath,
    git: stack.git === "true",
    packageManager: stack.packageManager as ProjectConfig["packageManager"],
    versionChannel: stack.versionChannel as ProjectConfig["versionChannel"],
    install,
    aiDocs: toUniqueNonNoneArray(stack.aiDocs) as ProjectConfig["aiDocs"],
    stackParts,
  };
}

export function stackSelectionToProjectConfig(
  selection: StackSelectionInput,
  options: StackProjectConfigOptions,
): ProjectConfig {
  const projectName = getProjectName(selection);
  const install = options.install ?? selection.install === "true";

  return {
    ...buildProjectConfigBase(selection, projectName, options.relativePath, install),
    projectDir: options.projectDir,
  };
}

export function stackSelectionToCliComparableConfig(
  selection: StackSelectionInput,
  projectName = getProjectName(selection),
): CliDefaultProjectConfigBase {
  return buildProjectConfigBase(selection, projectName, projectName, selection.install === "true");
}

export function isCliDefaultStackSelection(
  selection: StackSelectionInput,
  projectName = getProjectName(selection),
): boolean {
  if (isGraphStackSelection(selection)) return false;

  const comparableConfig = stackSelectionToCliComparableConfig(selection, projectName);
  const cliDefaults = {
    ...createCliDefaultProjectConfigBase(
      selection.packageManager as CliDefaultProjectConfigBase["packageManager"],
    ),
    projectName,
    relativePath: projectName,
  };
  const ignoredKeys =
    selection.ecosystem === "typescript" || selection.ecosystem === "react-native"
      ? new Set<keyof CliDefaultProjectConfigBase>([
          ...RUST_CONFIG_KEYS,
          ...PYTHON_CONFIG_KEYS,
          ...GO_CONFIG_KEYS,
          ...JAVA_CONFIG_KEYS,
          ...DOTNET_CONFIG_KEYS,
          ...ELIXIR_CONFIG_KEYS,
          ...(selection.ecosystem === "typescript" ? REACT_NATIVE_CONFIG_KEYS : []),
        ])
      : new Set<keyof CliDefaultProjectConfigBase>();

  return (Object.keys(cliDefaults) as Array<keyof CliDefaultProjectConfigBase>).every((key) => {
    if (ignoredKeys.has(key)) return true;

    const currentValue = comparableConfig[key];
    const defaultValue = cliDefaults[key];

    if (Array.isArray(currentValue) && Array.isArray(defaultValue)) {
      const currentArray: readonly unknown[] = currentValue;
      const defaultArray: readonly unknown[] = defaultValue;
      if (isStringArray(currentArray) && isStringArray(defaultArray)) {
        return areStringArraysEqual(currentArray, defaultArray);
      }
      return JSON.stringify(currentValue) === JSON.stringify(defaultValue);
    }

    return currentValue === defaultValue;
  });
}

function getBaseCommand(selection: StackSelectionInput) {
  return (
    PACKAGE_MANAGER_COMMANDS[selection.packageManager as keyof typeof PACKAGE_MANAGER_COMMANDS] ??
    PACKAGE_MANAGER_COMMANDS.bun
  );
}

function generateGraphCommand(selection: StackSelectionInput, projectName: string) {
  const stackParts = getGraphStackParts(selection);
  const hasTypeScriptFrontend = hasGraphPrimaryPart(stackParts, "frontend", "typescript");
  const hasAstroFrontend = hasGraphPrimaryPart(stackParts, "frontend", "typescript", "astro");
  const hasTypeScriptBackend = hasGraphPrimaryPart(stackParts, "backend", "typescript");
  const hasRustBackend = hasGraphPrimaryPart(stackParts, "backend", "rust");
  const hasPythonBackend = hasGraphPrimaryPart(stackParts, "backend", "python");
  const hasGoBackend = hasGraphPrimaryPart(stackParts, "backend", "go");
  const hasJavaBackend = hasGraphPrimaryPart(stackParts, "backend", "java");
  const hasDotnetBackend = hasGraphPrimaryPart(stackParts, "backend", "dotnet");
  const hasElixirBackend = hasGraphPrimaryPart(stackParts, "backend", "elixir");
  const hasNonTypeScriptBackend =
    hasRustBackend ||
    hasPythonBackend ||
    hasGoBackend ||
    hasJavaBackend ||
    hasDotnetBackend ||
    hasElixirBackend;
  const hasMobile = hasGraphPrimaryPart(stackParts, "mobile");
  const flags = [
    ...stackParts
      .filter((part) => part.source !== "provided")
      .map((part) => `--part ${formatStackPartSpec(part, stackParts)}`),
    ...(hasTypeScriptFrontend
      ? formatChangedStringFlags(selection, GRAPH_TYPESCRIPT_FRONTEND_FLAG_KEYS)
      : []),
    ...(hasAstroFrontend && selection.astroIntegration !== "none"
      ? [`--astro-integration ${selection.astroIntegration}`]
      : []),
    ...(hasTypeScriptFrontend && selection.uiLibrary === "shadcn-ui"
      ? formatChangedStringFlags(selection, GRAPH_SHADCN_FLAG_KEYS)
      : []),
    ...(hasTypeScriptBackend
      ? formatChangedStringFlags(selection, GRAPH_TYPESCRIPT_BACKEND_FLAG_KEYS)
      : []),
    ...(hasNonTypeScriptBackend
      ? formatChangedStringFlags(selection, GRAPH_SHARED_BACKEND_FLAG_KEYS)
      : []),
    ...(hasElixirBackend
      ? formatChangedStringFlags(selection, GRAPH_ELIXIR_BACKEND_FLAG_KEYS)
      : []),
    ...(hasMobile
      ? formatChangedStringFlags(selection, GRAPH_MOBILE_FLAG_KEYS)
      : []),
    `--package-manager ${selection.packageManager}`,
    ...(selection.versionChannel !== "stable"
      ? [`--version-channel ${selection.versionChannel}`]
      : []),
    selection.git === "false" ? "--no-git" : "--git",
    selection.install === "false" ? "--no-install" : "--install",
    formatArrayFlag("ai-docs", selection.aiDocs),
  ];

  if (selection.yolo === "true") {
    flags.push("--yolo");
  }

  return `${getBaseCommand(selection)} ${projectName} ${flags.join(" ")}`;
}

function generateTypeScriptCommand(selection: StackSelectionInput, projectName: string) {
  const base = getBaseCommand(selection);

  if (isCliDefaultStackSelection(selection, projectName)) {
    return `${base} ${projectName} --yes`;
  }

  const cliBackend = mapBackendToCli(selection.backend);
  const flags = [
    "--ecosystem typescript",
    `--frontend ${
      [...selection.webFrontend, ...selection.nativeFrontend]
        .filter((value, _, values) => value !== "none" || values.length === 1)
        .join(" ") || "none"
    }`,
    ...(selection.webFrontend.includes("astro") && selection.astroIntegration !== "none"
      ? [`--astro-integration ${selection.astroIntegration}`]
      : []),
    `--css-framework ${selection.cssFramework}`,
    `--ui-library ${selection.uiLibrary}`,
    ...(selection.uiLibrary === "shadcn-ui"
      ? [
          `--shadcn-base ${selection.shadcnBase}`,
          `--shadcn-style ${selection.shadcnStyle}`,
          `--shadcn-icon-library ${selection.shadcnIconLibrary}`,
          `--shadcn-color-theme ${selection.shadcnColorTheme}`,
          `--shadcn-base-color ${selection.shadcnBaseColor}`,
          `--shadcn-font ${selection.shadcnFont}`,
          `--shadcn-radius ${selection.shadcnRadius}`,
        ]
      : []),
    `--backend ${cliBackend}`,
    `--runtime ${
      cliBackend === "self" || selection.backend === "convex" || selection.backend === "none"
        ? "none"
        : selection.runtime
    }`,
    `--api ${selection.api}`,
    `--auth ${selection.auth}`,
    `--payments ${selection.payments}`,
    `--email ${selection.email}`,
    `--file-upload ${selection.fileUpload}`,
    `--logging ${selection.logging}`,
    `--observability ${selection.observability}`,
    `--feature-flags ${selection.featureFlags}`,
    `--realtime ${selection.realtime}`,
    `--job-queue ${selection.jobQueue}`,
    `--caching ${selection.caching}`,
    `--rate-limit ${selection.rateLimit}`,
    `--i18n ${selection.i18n}`,
    `--search ${selection.search}`,
    `--file-storage ${selection.fileStorage}`,
    `--cms ${selection.cms}`,
    `--effect ${selection.backendLibraries}`,
    `--ai ${selection.aiSdk}`,
    `--state-management ${selection.stateManagement}`,
    `--forms ${selection.forms}`,
    `--validation ${selection.validation}`,
    `--testing ${selection.testing}`,
    `--animation ${selection.animation}`,
    `--database ${selection.database}`,
    `--orm ${selection.orm}`,
    `--db-setup ${selection.dbSetup}`,
    `--package-manager ${selection.packageManager}`,
    ...(selection.versionChannel !== "stable"
      ? [`--version-channel ${selection.versionChannel}`]
      : []),
    selection.git === "false" ? "--no-git" : "--git",
    `--web-deploy ${selection.webDeploy}`,
    `--server-deploy ${selection.serverDeploy}`,
    selection.install === "false" ? "--no-install" : "--install",
    formatTypeScriptAddonsFlag(selection),
    formatArrayFlag("examples", selection.examples),
    formatArrayFlag("ai-docs", selection.aiDocs),
  ];

  if (selection.yolo === "true") {
    flags.push("--yolo");
  }

  return `${base} ${projectName} ${flags.join(" ")}`;
}

function generateReactNativeCommand(selection: StackSelectionInput, projectName: string) {
  const flags = [
    "--ecosystem react-native",
    `--frontend ${
      selection.nativeFrontend
        .filter((value, _, values) => value !== "none" || values.length === 1)
        .join(" ") || "native-bare"
    }`,
    `--auth ${selection.auth}`,
    `--mobile-navigation ${selection.mobileNavigation}`,
    `--mobile-ui ${selection.mobileUI}`,
    `--mobile-storage ${selection.mobileStorage}`,
    `--mobile-testing ${selection.mobileTesting}`,
    `--mobile-push ${selection.mobilePush}`,
    `--mobile-ota ${selection.mobileOTA}`,
    `--mobile-deep-linking ${selection.mobileDeepLinking}`,
    `--package-manager ${selection.packageManager}`,
    selection.git === "false" ? "--no-git" : "--git",
    selection.install === "false" ? "--no-install" : "--install",
    formatArrayFlag("ai-docs", selection.aiDocs),
  ];

  if (selection.yolo === "true") {
    flags.push("--yolo");
  }

  return `${getBaseCommand(selection)} ${projectName} ${flags.join(" ")}`;
}

function generateRustCommand(selection: StackSelectionInput, projectName: string) {
  const flags: string[] = [
    "--ecosystem rust",
    `--rust-web-framework ${selection.rustWebFramework}`,
    `--rust-frontend ${selection.rustFrontend}`,
    `--rust-orm ${selection.rustOrm}`,
    `--rust-api ${selection.rustApi}`,
    `--rust-cli ${selection.rustCli}`,
    formatArrayFlag("rust-libraries", selection.rustLibraries),
    `--rust-logging ${selection.rustLogging}`,
    `--rust-error-handling ${selection.rustErrorHandling}`,
    `--rust-caching ${selection.rustCaching}`,
    `--rust-auth ${selection.rustAuth}`,
    `--rust-realtime ${selection.rustRealtime}`,
    `--rust-message-queue ${selection.rustMessageQueue}`,
    `--rust-observability ${selection.rustObservability}`,
    `--rust-templating ${selection.rustTemplating}`,
    `--email ${selection.email}`,
    `--observability ${selection.observability}`,
    `--caching ${selection.caching}`,
    `--search ${selection.search}`,
    formatArrayFlag("ai-docs", selection.aiDocs),
  ];

  if (selection.git === "false") flags.push("--no-git");
  if (selection.install === "false") flags.push("--no-install");

  return `${getBaseCommand(selection)} ${projectName} ${flags.join(" ")}`;
}

function generatePythonCommand(selection: StackSelectionInput, projectName: string) {
  const flags: string[] = [
    "--ecosystem python",
    `--python-web-framework ${selection.pythonWebFramework}`,
    `--python-orm ${selection.pythonOrm}`,
    `--python-validation ${selection.pythonValidation}`,
    formatArrayFlag("python-ai", selection.pythonAi),
    `--python-auth ${selection.pythonAuth}`,
    `--python-api ${selection.pythonApi}`,
    `--python-task-queue ${selection.pythonTaskQueue}`,
    `--python-graphql ${selection.pythonGraphql}`,
    `--python-quality ${selection.pythonQuality}`,
    formatArrayFlag("python-testing", selection.pythonTesting),
    `--python-caching ${selection.pythonCaching}`,
    `--python-realtime ${selection.pythonRealtime}`,
    `--python-observability ${selection.pythonObservability}`,
    formatArrayFlag("python-cli", selection.pythonCli),
    `--email ${selection.email}`,
    `--observability ${selection.observability}`,
    `--caching ${selection.caching}`,
    `--search ${selection.search}`,
    formatArrayFlag("ai-docs", selection.aiDocs),
  ];

  if (selection.git === "false") flags.push("--no-git");
  if (selection.install === "false") flags.push("--no-install");

  return `${getBaseCommand(selection)} ${projectName} ${flags.join(" ")}`;
}

function generateGoCommand(selection: StackSelectionInput, projectName: string) {
  const flags: string[] = [
    "--ecosystem go",
    `--go-web-framework ${selection.goWebFramework}`,
    `--go-orm ${selection.goOrm}`,
    `--go-api ${selection.goApi}`,
    `--go-cli ${selection.goCli}`,
    `--go-logging ${selection.goLogging}`,
    `--go-auth ${selection.goAuth}`,
    formatArrayFlag("go-testing", selection.goTesting),
    `--go-realtime ${selection.goRealtime}`,
    `--go-message-queue ${selection.goMessageQueue}`,
    `--go-caching ${selection.goCaching}`,
    `--go-config ${selection.goConfig}`,
    `--go-observability ${selection.goObservability}`,
    `--auth ${selection.auth}`,
    `--email ${selection.email}`,
    `--observability ${selection.observability}`,
    `--caching ${selection.caching}`,
    `--search ${selection.search}`,
    formatArrayFlag("ai-docs", selection.aiDocs),
  ];

  if (selection.git === "false") flags.push("--no-git");
  if (selection.install === "false") flags.push("--no-install");

  return `${getBaseCommand(selection)} ${projectName} ${flags.join(" ")}`;
}

function generateJavaCommand(selection: StackSelectionInput, projectName: string) {
  const flags: string[] = [
    "--ecosystem java",
    `--java-web-framework ${selection.javaWebFramework}`,
    `--java-build-tool ${selection.javaBuildTool}`,
    `--java-orm ${selection.javaOrm}`,
    `--java-auth ${selection.javaAuth}`,
    `--java-api ${selection.javaApi}`,
    `--java-logging ${selection.javaLogging}`,
    formatArrayFlag("java-libraries", selection.javaLibraries),
    formatArrayFlag("java-testing-libraries", selection.javaTestingLibraries),
    `--email ${selection.email}`,
    `--observability ${selection.observability}`,
    `--caching ${selection.caching}`,
    `--search ${selection.search}`,
    formatArrayFlag("ai-docs", selection.aiDocs),
  ];

  if (selection.git === "false") flags.push("--no-git");
  if (selection.install === "false") flags.push("--no-install");

  return `${getBaseCommand(selection)} ${projectName} ${flags.join(" ")}`;
}

function generateDotnetCommand(selection: StackSelectionInput, projectName: string) {
  const flags: string[] = [
    "--ecosystem dotnet",
    `--dotnet-web-framework ${selection.dotnetWebFramework}`,
    `--dotnet-orm ${selection.dotnetOrm}`,
    `--dotnet-auth ${selection.dotnetAuth}`,
    `--dotnet-api ${selection.dotnetApi}`,
    formatArrayFlag("dotnet-testing", selection.dotnetTesting),
    `--dotnet-job-queue ${selection.dotnetJobQueue}`,
    `--dotnet-realtime ${selection.dotnetRealtime}`,
    formatArrayFlag("dotnet-observability", selection.dotnetObservability),
    `--dotnet-validation ${selection.dotnetValidation}`,
    `--dotnet-caching ${selection.dotnetCaching}`,
    `--dotnet-deploy ${selection.dotnetDeploy}`,
    formatArrayFlag("ai-docs", selection.aiDocs),
  ];

  if (selection.git === "false") flags.push("--no-git");
  if (selection.install === "false") flags.push("--no-install");

  return `${getBaseCommand(selection)} ${projectName} ${flags.join(" ")}`;
}

function generateElixirCommand(selection: StackSelectionInput, projectName: string) {
  const flags: string[] = [
    "--ecosystem elixir",
    `--elixir-web-framework ${selection.elixirWebFramework}`,
    `--elixir-orm ${selection.elixirOrm}`,
    `--elixir-auth ${selection.elixirAuth}`,
    `--elixir-api ${selection.elixirApi}`,
    `--elixir-realtime ${selection.elixirRealtime}`,
    `--elixir-jobs ${selection.elixirJobs}`,
    `--elixir-validation ${selection.elixirValidation}`,
    `--elixir-http ${selection.elixirHttp}`,
    `--elixir-json ${selection.elixirJson}`,
    `--elixir-email ${selection.elixirEmail}`,
    `--elixir-caching ${selection.elixirCaching}`,
    `--elixir-observability ${selection.elixirObservability}`,
    `--elixir-testing ${selection.elixirTesting}`,
    `--elixir-quality ${selection.elixirQuality}`,
    `--elixir-deploy ${selection.elixirDeploy}`,
    formatArrayFlag("elixir-libraries", selection.elixirLibraries),
    formatArrayFlag("ai-docs", selection.aiDocs),
  ];

  if (selection.git === "false") flags.push("--no-git");
  if (selection.install === "false") flags.push("--no-install");

  return `${getBaseCommand(selection)} ${projectName} ${flags.join(" ")}`;
}

export function generateStackSelectionCommand(selection: StackSelectionInput): string {
  const projectName = getProjectName(selection);

  if (isGraphStackSelection(selection)) {
    return generateGraphCommand(selection, projectName);
  }

  switch (selection.ecosystem) {
    case "react-native":
      return generateReactNativeCommand(selection, projectName);
    case "rust":
      return generateRustCommand(selection, projectName);
    case "python":
      return generatePythonCommand(selection, projectName);
    case "go":
      return generateGoCommand(selection, projectName);
    case "java":
      return generateJavaCommand(selection, projectName);
    case "dotnet":
      return generateDotnetCommand(selection, projectName);
    case "elixir":
      return generateElixirCommand(selection, projectName);
    case "typescript":
    default:
      return generateTypeScriptCommand(selection, projectName);
  }
}
