import type { CLIInput, Ecosystem, ProjectConfig } from "@better-fullstack/types";

export type InstallMode = "install" | "no-install";

export type GeneratorArgs = {
  count: number;
  ecosystems: readonly Ecosystem[];
  installMode: InstallMode;
  rng?: () => number;
  noDedup?: boolean;
  /** Force specific option values (e.g., { search: "algolia" }) */
  forceOptions?: Record<string, string>;
  /** Force these categories to never be "none" (e.g., ["search", "auth"]) */
  forceNonNone?: string[];
  /** Partition index for parallel runs (0-based) */
  partitionIndex?: number;
  /** Total number of partitions */
  partitionTotal?: number;
};

export const DEFAULT_ARGS: GeneratorArgs = {
  count: 10,
  ecosystems: ["typescript", "react-native", "rust", "python", "go", "java", "elixir"],
  installMode: "install",
};

export const DEFAULT_ECOSYSTEM_WEIGHTS: Record<Ecosystem, number> = {
  typescript: 4,
  "react-native": 2,
  rust: 2,
  python: 2,
  go: 2,
  java: 2,
  elixir: 2,
  dotnet: 2,
};

export const TEMPLATE_FINGERPRINT_KEYS = [
  "ecosystem",
  "frontend",
  "backend",
  "runtime",
  "api",
  "database",
  "orm",
  "dbSetup",
  "auth",
  "payments",
  "email",
  "fileUpload",
  "logging",
  "observability",
  "featureFlags",
  "analytics",
  "effect",
  "stateManagement",
  "forms",
  "validation",
  "testing",
  "ai",
  "realtime",
  "jobQueue",
  "animation",
  "cssFramework",
  "uiLibrary",
  "shadcnBase",
  "shadcnStyle",
  "shadcnIconLibrary",
  "shadcnColorTheme",
  "shadcnBaseColor",
  "shadcnFont",
  "shadcnRadius",
  "cms",
  "caching",
  "search",
  "fileStorage",
  "mobileNavigation",
  "mobileUI",
  "mobileStorage",
  "mobileTesting",
  "mobilePush",
  "mobileOTA",
  "mobileDeepLinking",
  "addons",
  "examples",
  "aiDocs",
  "packageManager",
  "webDeploy",
  "serverDeploy",
  "astroIntegration",
  "rustWebFramework",
  "rustFrontend",
  "rustOrm",
  "rustApi",
  "rustCli",
  "rustLibraries",
  "pythonWebFramework",
  "pythonOrm",
  "pythonValidation",
  "pythonAi",
  "pythonAuth",
  "pythonApi",
  "pythonTaskQueue",
  "pythonGraphql",
  "pythonQuality",
  "goWebFramework",
  "goOrm",
  "goApi",
  "goCli",
  "goLogging",
  "goAuth",
  "goValidation",
  "goQuality",
  "goMigrations",
  "goTemplating",
  "goProtoTooling",
  "goDI",
  "javaWebFramework",
  "javaBuildTool",
  "javaOrm",
  "javaAuth",
  "javaLibraries",
  "javaTestingLibraries",
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
  "elixirI18n",
  "elixirHttpServer",
  "elixirApplicationFramework",
  "elixirDocumentation",
  "elixirClustering",
  "elixirDeploy",
] as const;

export type TemplateFingerprintKey = (typeof TEMPLATE_FINGERPRINT_KEYS)[number];
export type FingerprintValue = string | readonly string[];
export type TemplateFingerprint = Partial<Record<TemplateFingerprintKey, FingerprintValue>>;

export type HistoricalLedger = {
  fingerprintKeys: Set<string>;
  legacyNames: Set<string>;
  historyCount: number;
};

export type ComboCandidate = {
  ecosystem: Ecosystem;
  name: string;
  config: ProjectConfig;
  fingerprint: TemplateFingerprint;
  fingerprintKey: string;
  command: string;
};

export type LedgerRowDoc = {
  cb?: string;
  rows?: unknown[];
  schema?: {
    flagsOrder?: Record<string, string[]>;
  };
};

export type CandidateDraft = {
  ecosystem: Ecosystem;
  options: CLIInput;
};
