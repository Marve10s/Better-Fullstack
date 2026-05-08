import {
  analyzeStackCompatibility,
  type CompatibilityInput,
} from "./compatibility";
import {
  createCliDefaultProjectConfigBase,
  type CliDefaultProjectConfigBase,
} from "./defaults";
import {
  normalizeOptionId,
  type OptionCategory,
} from "./option-metadata";
import type { CLIInput, ProjectConfig } from "./types";

export type StackSelectionInput = CompatibilityInput;
export type StackSelectionState = StackSelectionInput;

export const DEFAULT_STACK_SELECTION: StackSelectionState = {
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
  backendLibraries: "none",
  stateManagement: "none",
  forms: "react-hook-form",
  validation: "zod",
  testing: "vitest",
  realtime: "none",
  jobQueue: "none",
  caching: "none",
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
  pythonWebFramework: "fastapi",
  pythonOrm: "sqlalchemy",
  pythonValidation: "pydantic",
  pythonAi: [],
  pythonAuth: "none",
  pythonTaskQueue: "none",
  pythonGraphql: "none",
  pythonQuality: "ruff",
  goWebFramework: "gin",
  goOrm: "gorm",
  goApi: "none",
  goCli: "none",
  goLogging: "zap",
  goAuth: "none",
  javaWebFramework: "spring-boot",
  javaBuildTool: "maven",
  javaOrm: "none",
  javaAuth: "none",
  javaLibraries: [],
  javaTestingLibraries: ["junit5"],
};

export type StackSelectionKey = keyof StackSelectionState;

type StackSelectionUrlValue = string | string[] | null | undefined;
type StackSelectionUrlRecord = Record<string, StackSelectionUrlValue>;

export const NON_OPTION_STACK_SELECTION_KEYS = ["ecosystem", "projectName", "yolo"] as const;

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
  backendLibraries: "backendLibraries",
  stateManagement: "stateManagement",
  forms: "forms",
  validation: "validation",
  testing: "testing",
  realtime: "realtime",
  jobQueue: "jobQueue",
  caching: "caching",
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
  pythonWebFramework: "pythonWebFramework",
  pythonOrm: "pythonOrm",
  pythonValidation: "pythonValidation",
  pythonAi: "pythonAi",
  pythonAuth: "pythonAuth",
  pythonTaskQueue: "pythonTaskQueue",
  pythonGraphql: "pythonGraphql",
  pythonQuality: "pythonQuality",
  goWebFramework: "goWebFramework",
  goOrm: "goOrm",
  goApi: "goApi",
  goCli: "goCli",
  goLogging: "goLogging",
  goAuth: "goAuth",
  javaWebFramework: "javaWebFramework",
  javaBuildTool: "javaBuildTool",
  javaOrm: "javaOrm",
  javaAuth: "javaAuth",
  javaLibraries: "javaLibraries",
  javaTestingLibraries: "javaTestingLibraries",
};

export const VIRTUAL_NONE_MULTI_SELECT_STACK_SELECTION_KEYS = [
  "rustLibraries",
  "pythonAi",
  "javaLibraries",
  "javaTestingLibraries",
  "aiDocs",
] as const;

export function usesVirtualNoneStackSelection(
  key: StackSelectionKey,
): key is (typeof VIRTUAL_NONE_MULTI_SELECT_STACK_SELECTION_KEYS)[number] {
  return (VIRTUAL_NONE_MULTI_SELECT_STACK_SELECTION_KEYS as readonly string[]).includes(key);
}

export const STACK_SELECTION_URL_KEYS = {
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
  backendLibraries: "bl",
  stateManagement: "sm",
  forms: "frm",
  validation: "val",
  testing: "tst",
  realtime: "rt2",
  jobQueue: "jq",
  caching: "cache",
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
  pythonWebFramework: "pwf",
  pythonOrm: "porm",
  pythonValidation: "pval",
  pythonAi: "pai",
  pythonAuth: "pauth",
  pythonTaskQueue: "ptq",
  pythonGraphql: "pgql",
  pythonQuality: "pq",
  goWebFramework: "gwf",
  goOrm: "gorm",
  goApi: "gapi",
  goCli: "gcli",
  goLogging: "glog",
  goAuth: "gauth",
  javaWebFramework: "jwf",
  javaBuildTool: "jbt",
  javaOrm: "jorm",
  javaAuth: "jauth",
  javaLibraries: "jlib",
  javaTestingLibraries: "jtest",
} as const satisfies Record<StackSelectionKey, string>;

export const STACK_SELECTION_KEYS = Object.keys(
  STACK_SELECTION_URL_KEYS,
) as StackSelectionKey[];

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

export function normalizeStackSelection(selection: StackSelectionState): StackSelectionState {
  const normalized: Record<string, unknown> = { ...selection };

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
  ["i18n", "i18n"],
  ["search", "search"],
  ["fileStorage", "fileStorage"],
  ["analytics", "analytics"],
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
  ["pythonWebFramework", "pythonWebFramework"],
  ["pythonOrm", "pythonOrm"],
  ["pythonValidation", "pythonValidation"],
  ["pythonAuth", "pythonAuth"],
  ["pythonTaskQueue", "pythonTaskQueue"],
  ["pythonGraphql", "pythonGraphql"],
  ["pythonQuality", "pythonQuality"],
  ["goWebFramework", "goWebFramework"],
  ["goOrm", "goOrm"],
  ["goApi", "goApi"],
  ["goCli", "goCli"],
  ["goLogging", "goLogging"],
  ["goAuth", "goAuth"],
  ["javaWebFramework", "javaWebFramework"],
  ["javaBuildTool", "javaBuildTool"],
  ["javaOrm", "javaOrm"],
  ["javaAuth", "javaAuth"],
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
] as const satisfies readonly (keyof CliDefaultProjectConfigBase)[];

const PYTHON_CONFIG_KEYS = [
  "pythonWebFramework",
  "pythonOrm",
  "pythonValidation",
  "pythonAi",
  "pythonAuth",
  "pythonTaskQueue",
  "pythonGraphql",
  "pythonQuality",
] as const satisfies readonly (keyof CliDefaultProjectConfigBase)[];

const GO_CONFIG_KEYS = [
  "goWebFramework",
  "goOrm",
  "goApi",
  "goCli",
  "goLogging",
  "goAuth",
] as const satisfies readonly (keyof CliDefaultProjectConfigBase)[];

const JAVA_CONFIG_KEYS = [
  "javaWebFramework",
  "javaBuildTool",
  "javaOrm",
  "javaAuth",
  "javaLibraries",
  "javaTestingLibraries",
] as const satisfies readonly (keyof CliDefaultProjectConfigBase)[];

const COMMAND_ADDONS = new Set([
  "pwa",
  "tauri",
  "starlight",
  "biome",
  "lefthook",
  "husky",
  "turborepo",
  "docker-compose",
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
  const addons = [
    ...selection.codeQuality,
    ...selection.documentation,
    ...selection.appPlatforms,
  ];

  if (addons.length === 0) return "--addons none";

  return `--addons ${addons.filter((addon) => COMMAND_ADDONS.has(addon)).join(" ") || "none"}`;
}

function mapBackendToCli(backend: string) {
  return SELF_BACKENDS.has(backend) ? "self" : backend;
}

function getAdjustedSelection(selection: StackSelectionInput): StackSelectionInput {
  const compatibility = analyzeStackCompatibility(selection);
  return compatibility.adjustedStack ?? selection;
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

  return config;
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

  return {
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
    cms: stack.cms as ProjectConfig["cms"],
    caching: stack.caching as ProjectConfig["caching"],
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
    rustLibraries: toUniqueNonNoneArray(stack.rustLibraries) as ProjectConfig["rustLibraries"],
    pythonWebFramework: stack.pythonWebFramework as ProjectConfig["pythonWebFramework"],
    pythonOrm: stack.pythonOrm as ProjectConfig["pythonOrm"],
    pythonValidation: stack.pythonValidation as ProjectConfig["pythonValidation"],
    pythonAi: toUniqueNonNoneArray(stack.pythonAi) as ProjectConfig["pythonAi"],
    pythonAuth: stack.pythonAuth as ProjectConfig["pythonAuth"],
    pythonTaskQueue: stack.pythonTaskQueue as ProjectConfig["pythonTaskQueue"],
    pythonGraphql: stack.pythonGraphql as ProjectConfig["pythonGraphql"],
    pythonQuality: stack.pythonQuality as ProjectConfig["pythonQuality"],
    goWebFramework: stack.goWebFramework as ProjectConfig["goWebFramework"],
    goOrm: stack.goOrm as ProjectConfig["goOrm"],
    goApi: stack.goApi as ProjectConfig["goApi"],
    goCli: stack.goCli as ProjectConfig["goCli"],
    goLogging: stack.goLogging as ProjectConfig["goLogging"],
    goAuth: stack.goAuth as ProjectConfig["goAuth"],
    javaWebFramework: stack.javaWebFramework as ProjectConfig["javaWebFramework"],
    javaBuildTool: stack.javaBuildTool as ProjectConfig["javaBuildTool"],
    javaOrm: stack.javaOrm as ProjectConfig["javaOrm"],
    javaAuth: stack.javaAuth as ProjectConfig["javaAuth"],
    javaLibraries: toUniqueNonNoneArray(stack.javaLibraries) as ProjectConfig["javaLibraries"],
    javaTestingLibraries: toUniqueNonNoneArray(
      stack.javaTestingLibraries,
    ) as ProjectConfig["javaTestingLibraries"],
    aiDocs: toUniqueNonNoneArray(stack.aiDocs) as ProjectConfig["aiDocs"],
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
  return buildProjectConfigBase(
    selection,
    projectName,
    projectName,
    selection.install === "true",
  );
}

export function isCliDefaultStackSelection(
  selection: StackSelectionInput,
  projectName = getProjectName(selection),
): boolean {
  const comparableConfig = stackSelectionToCliComparableConfig(selection, projectName);
  const cliDefaults = {
    ...createCliDefaultProjectConfigBase(
      selection.packageManager as CliDefaultProjectConfigBase["packageManager"],
    ),
    projectName,
    relativePath: projectName,
  };
  const ignoredKeys =
    selection.ecosystem === "typescript"
      ? new Set<keyof CliDefaultProjectConfigBase>([
          ...RUST_CONFIG_KEYS,
          ...PYTHON_CONFIG_KEYS,
          ...GO_CONFIG_KEYS,
          ...JAVA_CONFIG_KEYS,
        ])
      : new Set<keyof CliDefaultProjectConfigBase>();

  return (Object.keys(cliDefaults) as Array<keyof CliDefaultProjectConfigBase>).every((key) => {
    if (ignoredKeys.has(key)) return true;

    const currentValue = comparableConfig[key];
    const defaultValue = cliDefaults[key];

    if (Array.isArray(currentValue) && Array.isArray(defaultValue)) {
      return areStringArraysEqual(currentValue, defaultValue);
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
    `--realtime ${selection.realtime}`,
    `--job-queue ${selection.jobQueue}`,
    `--caching ${selection.caching}`,
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
    `--python-task-queue ${selection.pythonTaskQueue}`,
    `--python-graphql ${selection.pythonGraphql}`,
    `--python-quality ${selection.pythonQuality}`,
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
    `--auth ${selection.auth}`,
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
    formatArrayFlag("java-libraries", selection.javaLibraries),
    formatArrayFlag("java-testing-libraries", selection.javaTestingLibraries),
    formatArrayFlag("ai-docs", selection.aiDocs),
  ];

  if (selection.git === "false") flags.push("--no-git");
  if (selection.install === "false") flags.push("--no-install");

  return `${getBaseCommand(selection)} ${projectName} ${flags.join(" ")}`;
}

export function generateStackSelectionCommand(selection: StackSelectionInput): string {
  const projectName = getProjectName(selection);

  switch (selection.ecosystem) {
    case "rust":
      return generateRustCommand(selection, projectName);
    case "python":
      return generatePythonCommand(selection, projectName);
    case "go":
      return generateGoCommand(selection, projectName);
    case "java":
      return generateJavaCommand(selection, projectName);
    case "typescript":
    default:
      return generateTypeScriptCommand(selection, projectName);
  }
}
