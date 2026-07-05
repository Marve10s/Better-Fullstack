import { createCliDefaultProjectConfigBase } from "./defaults";
import {
  getCategoryCliValues,
  type OptionCategory,
  type OptionCategoryEcosystem,
} from "./option-metadata";
import { DIRECTORY_CONFLICT_VALUES, ECOSYSTEM_VALUES, TEMPLATE_VALUES } from "./schemas";

type CliDefaultConfig = ReturnType<typeof createCliDefaultProjectConfigBase>;
type CliConfigKey = keyof CliDefaultConfig;

/**
 * How a CLI flag's accepted values are derived. Every source resolves against
 * the shared option metadata / schema value lists in this package so the CLI
 * reference table never drifts from the real generator surface.
 */
export type CliFlagValueSource =
  | { readonly kind: "category"; readonly category: OptionCategory }
  | { readonly kind: "categories"; readonly categories: readonly OptionCategory[] }
  | { readonly kind: "literal"; readonly values: readonly string[] }
  | { readonly kind: "boolean" }
  | { readonly kind: "freeform"; readonly hint: string };

export type CliFlagDefinition = {
  /** Canonical flag name without the leading dashes, e.g. `frontend`. */
  readonly flag: string;
  readonly summary: string;
  readonly source: CliFlagValueSource;
  /** Project-config field the default value is read from, when applicable. */
  readonly configKey?: CliConfigKey;
  /** Overrides the config-derived default when the config default is ecosystem-dependent. */
  readonly defaultLiteral?: string;
  /** Whether the flag accepts multiple space-separated values. */
  readonly multiple?: boolean;
};

export type CliFlagGroupDefinition = {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly ecosystem?: OptionCategoryEcosystem;
  readonly flags: readonly CliFlagDefinition[];
};

export type ResolvedCliFlag = {
  /** Flag rendered with the leading dashes, e.g. `--frontend`. */
  readonly flag: string;
  readonly summary: string;
  readonly values: readonly string[];
  readonly valueHint: string | null;
  readonly defaultValue: string | null;
  readonly multiple: boolean;
};

export type ResolvedCliFlagGroup = {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly ecosystem?: OptionCategoryEcosystem;
  readonly flags: readonly ResolvedCliFlag[];
};

export const CLI_FLAG_GROUP_DEFINITIONS: readonly CliFlagGroupDefinition[] = [
  {
    id: "common",
    title: "Common flags",
    description: "Flags that apply to every ecosystem and control workflow behavior.",
    flags: [
      {
        flag: "ecosystem",
        summary: "Language/runtime ecosystem to scaffold.",
        source: { kind: "literal", values: ECOSYSTEM_VALUES },
        configKey: "ecosystem",
      },
      {
        flag: "template",
        summary: "Start from a curated stack preset instead of individual flags.",
        source: { kind: "literal", values: TEMPLATE_VALUES },
      },
      {
        flag: "part",
        summary: "Add a multi-ecosystem stack part. Repeat once per part.",
        source: { kind: "freeform", hint: "role:ecosystem:tool (e.g. frontend:typescript:next)" },
      },
      {
        flag: "addons",
        summary: "Repo tooling and platform addons.",
        source: { kind: "categories", categories: ["appPlatforms", "codeQuality", "documentation"] },
        configKey: "addons",
        multiple: true,
      },
      {
        flag: "examples",
        summary: "Optional example features to include.",
        source: { kind: "category", category: "examples" },
        configKey: "examples",
        multiple: true,
      },
      {
        flag: "ai-docs",
        summary: "Agent instruction files to generate.",
        source: { kind: "category", category: "aiDocs" },
        configKey: "aiDocs",
        multiple: true,
      },
      {
        flag: "package-manager",
        summary: "Package manager for the generated workspace.",
        source: { kind: "category", category: "packageManager" },
        configKey: "packageManager",
      },
      {
        flag: "workspace-shape",
        summary: "Monorepo or single-app workspace layout.",
        source: { kind: "category", category: "workspaceShape" },
        configKey: "workspaceShape",
      },
      {
        flag: "version-channel",
        summary: "Dependency version channel.",
        source: { kind: "category", category: "versionChannel" },
        configKey: "versionChannel",
      },
      {
        flag: "web-deploy",
        summary: "Deployment target config for the web app.",
        source: { kind: "category", category: "webDeploy" },
        configKey: "webDeploy",
      },
      {
        flag: "server-deploy",
        summary: "Deployment target config for the server.",
        source: { kind: "category", category: "serverDeploy" },
        configKey: "serverDeploy",
      },
      {
        flag: "directory-conflict",
        summary: "Strategy when the target directory already exists.",
        source: { kind: "literal", values: DIRECTORY_CONFLICT_VALUES },
      },
      {
        flag: "install",
        summary: "Install dependencies after scaffolding.",
        source: { kind: "boolean" },
        configKey: "install",
      },
      {
        flag: "git",
        summary: "Initialize a Git repository.",
        source: { kind: "boolean" },
        configKey: "git",
      },
      {
        flag: "dry-run",
        summary: "Preview generated files without writing them.",
        source: { kind: "freeform", hint: "boolean flag" },
      },
      {
        flag: "verify",
        summary: "Run generated checks after scaffolding where supported.",
        source: { kind: "freeform", hint: "boolean flag" },
      },
      {
        flag: "yes",
        summary: "Accept defaults. Conflicts with core stack flags.",
        source: { kind: "freeform", hint: "boolean flag" },
      },
      {
        flag: "yolo",
        summary: "Skip safety confirmations where supported.",
        source: { kind: "freeform", hint: "boolean flag" },
      },
      {
        flag: "verbose",
        summary: "Print detailed scaffold output.",
        source: { kind: "freeform", hint: "boolean flag" },
      },
      {
        flag: "disable-analytics",
        summary: "Opt out of anonymous CLI analytics.",
        source: { kind: "freeform", hint: "boolean flag" },
      },
    ],
  },
  {
    id: "typescript-stack",
    title: "TypeScript stack",
    description: "Core stack flags for `--ecosystem typescript`.",
    ecosystem: "typescript",
    flags: [
      {
        flag: "frontend",
        summary: "Web frontend framework(s).",
        source: { kind: "category", category: "webFrontend" },
        configKey: "frontend",
        multiple: true,
      },
      {
        flag: "backend",
        summary: "Backend framework. `self` pairs with fullstack frontends.",
        source: { kind: "category", category: "backend" },
        configKey: "backend",
      },
      {
        flag: "runtime",
        summary: "Server runtime.",
        source: { kind: "category", category: "runtime" },
        configKey: "runtime",
      },
      {
        flag: "database",
        summary: "Database engine.",
        source: { kind: "category", category: "database" },
        configKey: "database",
      },
      {
        flag: "orm",
        summary: "ORM / query layer.",
        source: { kind: "category", category: "orm" },
        configKey: "orm",
      },
      {
        flag: "db-setup",
        summary: "Hosted database provider setup.",
        source: { kind: "category", category: "dbSetup" },
        configKey: "dbSetup",
      },
      {
        flag: "auth",
        summary: "Authentication provider.",
        source: { kind: "category", category: "auth" },
        configKey: "auth",
      },
      {
        flag: "api",
        summary: "API layer. tRPC is React-oriented.",
        source: { kind: "category", category: "api" },
        configKey: "api",
      },
      {
        flag: "astro-integration",
        summary: "Astro UI framework integration (Astro frontends).",
        source: { kind: "category", category: "astroIntegration" },
        configKey: "astroIntegration",
      },
      {
        flag: "manual-db",
        summary: "Skip provider-specific database setup prompts.",
        source: { kind: "freeform", hint: "boolean flag" },
      },
    ],
  },
  {
    id: "typescript-services",
    title: "TypeScript services",
    description: "Optional service integrations for TypeScript stacks.",
    ecosystem: "typescript",
    flags: [
      { flag: "ai", summary: "AI SDK / agent framework.", source: { kind: "category", category: "ai" }, configKey: "ai" },
      { flag: "payments", summary: "Payments provider.", source: { kind: "category", category: "payments" }, configKey: "payments" },
      { flag: "email", summary: "Email provider.", source: { kind: "category", category: "email" }, configKey: "email" },
      { flag: "realtime", summary: "Realtime transport.", source: { kind: "category", category: "realtime" }, configKey: "realtime" },
      { flag: "job-queue", summary: "Background job / queue system.", source: { kind: "category", category: "jobQueue" }, configKey: "jobQueue" },
      { flag: "cms", summary: "Content management system.", source: { kind: "category", category: "cms" }, configKey: "cms" },
      { flag: "caching", summary: "Cache layer.", source: { kind: "category", category: "caching" }, configKey: "caching" },
      { flag: "search", summary: "Search engine.", source: { kind: "category", category: "search" }, configKey: "search" },
      { flag: "file-storage", summary: "Object storage provider.", source: { kind: "category", category: "fileStorage" }, configKey: "fileStorage" },
      { flag: "file-upload", summary: "File upload helper.", source: { kind: "category", category: "fileUpload" }, configKey: "fileUpload" },
      { flag: "analytics", summary: "Web analytics provider.", source: { kind: "category", category: "analytics" }, configKey: "analytics" },
      { flag: "feature-flags", summary: "Feature flag platform.", source: { kind: "category", category: "featureFlags" }, configKey: "featureFlags" },
      { flag: "vector-db", summary: "Vector database.", source: { kind: "category", category: "vectorDb" }, configKey: "vectorDb" },
      { flag: "rate-limit", summary: "Rate limiting helper.", source: { kind: "category", category: "rateLimit" }, configKey: "rateLimit" },
      { flag: "i18n", summary: "Internationalization library.", source: { kind: "category", category: "i18n" }, configKey: "i18n" },
      { flag: "effect", summary: "Effect capability level.", source: { kind: "category", category: "effect" }, configKey: "effect" },
      { flag: "logging", summary: "Logging library.", source: { kind: "category", category: "logging" }, configKey: "logging" },
      { flag: "observability", summary: "Observability provider.", source: { kind: "category", category: "observability" }, configKey: "observability" },
    ],
  },
  {
    id: "typescript-ui",
    title: "TypeScript UI and app behavior",
    description: "Frontend styling, state, forms, validation, and testing flags.",
    ecosystem: "typescript",
    flags: [
      { flag: "css-framework", summary: "CSS framework.", source: { kind: "category", category: "cssFramework" }, configKey: "cssFramework" },
      { flag: "ui-library", summary: "Component library.", source: { kind: "category", category: "uiLibrary" }, configKey: "uiLibrary" },
      { flag: "state-management", summary: "Client state manager.", source: { kind: "category", category: "stateManagement" }, configKey: "stateManagement" },
      { flag: "forms", summary: "Form library.", source: { kind: "category", category: "forms" }, configKey: "forms" },
      { flag: "validation", summary: "Schema validation library.", source: { kind: "category", category: "validation" }, configKey: "validation" },
      { flag: "testing", summary: "Testing setup.", source: { kind: "category", category: "testing" }, configKey: "testing" },
      { flag: "animation", summary: "Animation library.", source: { kind: "category", category: "animation" }, configKey: "animation" },
    ],
  },
  {
    id: "shadcn",
    title: "shadcn/ui flags",
    description: "Only apply when `--ui-library shadcn-ui` is selected.",
    ecosystem: "typescript",
    flags: [
      { flag: "shadcn-base", summary: "shadcn primitive base.", source: { kind: "category", category: "shadcnBase" }, configKey: "shadcnBase" },
      { flag: "shadcn-style", summary: "shadcn style preset.", source: { kind: "category", category: "shadcnStyle" }, configKey: "shadcnStyle" },
      { flag: "shadcn-icon-library", summary: "Icon library.", source: { kind: "category", category: "shadcnIconLibrary" }, configKey: "shadcnIconLibrary" },
      { flag: "shadcn-color-theme", summary: "Color theme.", source: { kind: "category", category: "shadcnColorTheme" }, configKey: "shadcnColorTheme" },
      { flag: "shadcn-base-color", summary: "Base neutral color.", source: { kind: "category", category: "shadcnBaseColor" }, configKey: "shadcnBaseColor" },
      { flag: "shadcn-font", summary: "Default font.", source: { kind: "category", category: "shadcnFont" }, configKey: "shadcnFont" },
      { flag: "shadcn-radius", summary: "Corner radius scale.", source: { kind: "category", category: "shadcnRadius" }, configKey: "shadcnRadius" },
    ],
  },
  {
    id: "react-native",
    title: "React Native flags",
    description: "Flags for `--ecosystem react-native`.",
    ecosystem: "react-native",
    flags: [
      {
        flag: "frontend",
        summary: "Expo native frontend styling.",
        source: { kind: "category", category: "nativeFrontend" },
        defaultLiteral: "native-bare",
        multiple: true,
      },
      { flag: "mobile-navigation", summary: "Navigation library.", source: { kind: "category", category: "mobileNavigation" }, configKey: "mobileNavigation" },
      { flag: "mobile-ui", summary: "Mobile UI kit.", source: { kind: "category", category: "mobileUI" }, configKey: "mobileUI" },
      { flag: "mobile-storage", summary: "On-device storage.", source: { kind: "category", category: "mobileStorage" }, configKey: "mobileStorage" },
      { flag: "mobile-testing", summary: "Mobile testing setup.", source: { kind: "category", category: "mobileTesting" }, configKey: "mobileTesting" },
      { flag: "mobile-push", summary: "Push notifications.", source: { kind: "category", category: "mobilePush" }, configKey: "mobilePush" },
      { flag: "mobile-ota", summary: "Over-the-air updates.", source: { kind: "category", category: "mobileOTA" }, configKey: "mobileOTA" },
      { flag: "mobile-deep-linking", summary: "Deep linking.", source: { kind: "category", category: "mobileDeepLinking" }, configKey: "mobileDeepLinking" },
    ],
  },
  {
    id: "rust",
    title: "Rust flags",
    description: "Flags for `--ecosystem rust`.",
    ecosystem: "rust",
    flags: [
      { flag: "rust-web-framework", summary: "Rust web framework.", source: { kind: "category", category: "rustWebFramework" }, configKey: "rustWebFramework" },
      { flag: "rust-frontend", summary: "WASM frontend.", source: { kind: "category", category: "rustFrontend" }, configKey: "rustFrontend" },
      { flag: "rust-orm", summary: "Rust ORM / database.", source: { kind: "category", category: "rustOrm" }, configKey: "rustOrm" },
      { flag: "rust-api", summary: "Rust API layer.", source: { kind: "category", category: "rustApi" }, configKey: "rustApi" },
      { flag: "rust-cli", summary: "Rust CLI tooling.", source: { kind: "category", category: "rustCli" }, configKey: "rustCli" },
      { flag: "rust-libraries", summary: "Rust core libraries.", source: { kind: "category", category: "rustLibraries" }, configKey: "rustLibraries", multiple: true },
      { flag: "rust-logging", summary: "Rust logging.", source: { kind: "category", category: "rustLogging" }, configKey: "rustLogging" },
      { flag: "rust-error-handling", summary: "Rust error handling.", source: { kind: "category", category: "rustErrorHandling" }, configKey: "rustErrorHandling" },
      { flag: "rust-caching", summary: "Rust caching.", source: { kind: "category", category: "rustCaching" }, configKey: "rustCaching" },
      { flag: "rust-auth", summary: "Rust auth.", source: { kind: "category", category: "rustAuth" }, configKey: "rustAuth" },
      { flag: "rust-realtime", summary: "Rust realtime.", source: { kind: "category", category: "rustRealtime" }, configKey: "rustRealtime" },
      { flag: "rust-message-queue", summary: "Rust message queue.", source: { kind: "category", category: "rustMessageQueue" }, configKey: "rustMessageQueue" },
      { flag: "rust-observability", summary: "Rust observability.", source: { kind: "category", category: "rustObservability" }, configKey: "rustObservability" },
      { flag: "rust-templating", summary: "Rust templating.", source: { kind: "category", category: "rustTemplating" }, configKey: "rustTemplating" },
    ],
  },
  {
    id: "python",
    title: "Python flags",
    description: "Flags for `--ecosystem python`.",
    ecosystem: "python",
    flags: [
      { flag: "python-web-framework", summary: "Python web framework.", source: { kind: "category", category: "pythonWebFramework" }, configKey: "pythonWebFramework" },
      { flag: "python-orm", summary: "Python ORM / database.", source: { kind: "category", category: "pythonOrm" }, configKey: "pythonOrm" },
      { flag: "python-validation", summary: "Validation library.", source: { kind: "category", category: "pythonValidation" }, configKey: "pythonValidation" },
      { flag: "python-ai", summary: "Python AI / ML libraries.", source: { kind: "category", category: "pythonAi" }, configKey: "pythonAi", multiple: true },
      { flag: "python-auth", summary: "Python auth.", source: { kind: "category", category: "pythonAuth" }, configKey: "pythonAuth" },
      { flag: "python-api", summary: "Python API framework.", source: { kind: "category", category: "pythonApi" }, configKey: "pythonApi" },
      { flag: "python-task-queue", summary: "Python task queue.", source: { kind: "category", category: "pythonTaskQueue" }, configKey: "pythonTaskQueue" },
      { flag: "python-graphql", summary: "Python GraphQL.", source: { kind: "category", category: "pythonGraphql" }, configKey: "pythonGraphql" },
      { flag: "python-quality", summary: "Python code quality tool.", source: { kind: "category", category: "pythonQuality" }, configKey: "pythonQuality" },
      { flag: "python-testing", summary: "Python testing libraries.", source: { kind: "category", category: "pythonTesting" }, configKey: "pythonTesting", multiple: true },
      { flag: "python-caching", summary: "Python caching.", source: { kind: "category", category: "pythonCaching" }, configKey: "pythonCaching" },
      { flag: "python-realtime", summary: "Python realtime.", source: { kind: "category", category: "pythonRealtime" }, configKey: "pythonRealtime" },
      { flag: "python-observability", summary: "Python observability.", source: { kind: "category", category: "pythonObservability" }, configKey: "pythonObservability" },
      { flag: "python-cli", summary: "Python CLI tooling.", source: { kind: "category", category: "pythonCli" }, configKey: "pythonCli", multiple: true },
    ],
  },
  {
    id: "go",
    title: "Go flags",
    description: "Flags for `--ecosystem go`. Global `--auth` also applies.",
    ecosystem: "go",
    flags: [
      { flag: "go-web-framework", summary: "Go web framework.", source: { kind: "category", category: "goWebFramework" }, configKey: "goWebFramework" },
      { flag: "go-orm", summary: "Go ORM / database.", source: { kind: "category", category: "goOrm" }, configKey: "goOrm" },
      { flag: "go-api", summary: "Go API layer.", source: { kind: "category", category: "goApi" }, configKey: "goApi" },
      { flag: "go-cli", summary: "Go CLI tooling.", source: { kind: "category", category: "goCli" }, configKey: "goCli" },
      { flag: "go-logging", summary: "Go logging.", source: { kind: "category", category: "goLogging" }, configKey: "goLogging" },
      { flag: "go-auth", summary: "Go-native auth helpers.", source: { kind: "category", category: "goAuth" }, configKey: "goAuth" },
      { flag: "go-testing", summary: "Go testing libraries.", source: { kind: "category", category: "goTesting" }, configKey: "goTesting", multiple: true },
      { flag: "go-realtime", summary: "Go realtime.", source: { kind: "category", category: "goRealtime" }, configKey: "goRealtime" },
      { flag: "go-message-queue", summary: "Go message queue.", source: { kind: "category", category: "goMessageQueue" }, configKey: "goMessageQueue" },
      { flag: "go-caching", summary: "Go caching.", source: { kind: "category", category: "goCaching" }, configKey: "goCaching" },
      { flag: "go-config", summary: "Go config loader.", source: { kind: "category", category: "goConfig" }, configKey: "goConfig" },
      { flag: "go-observability", summary: "Go observability.", source: { kind: "category", category: "goObservability" }, configKey: "goObservability" },
    ],
  },
  {
    id: "java",
    title: "Java flags",
    description: "Flags for `--ecosystem java`.",
    ecosystem: "java",
    flags: [
      { flag: "java-web-framework", summary: "Java web framework.", source: { kind: "category", category: "javaWebFramework" }, configKey: "javaWebFramework" },
      { flag: "java-language", summary: "JVM language (java or kotlin).", source: { kind: "category", category: "javaLanguage" }, configKey: "javaLanguage" },
      { flag: "java-build-tool", summary: "Build tool.", source: { kind: "category", category: "javaBuildTool" }, configKey: "javaBuildTool" },
      { flag: "java-orm", summary: "Java ORM / database.", source: { kind: "category", category: "javaOrm" }, configKey: "javaOrm" },
      { flag: "java-auth", summary: "Java auth.", source: { kind: "category", category: "javaAuth" }, configKey: "javaAuth" },
      { flag: "java-api", summary: "Java API layer.", source: { kind: "category", category: "javaApi" }, configKey: "javaApi" },
      { flag: "java-logging", summary: "Java logging.", source: { kind: "category", category: "javaLogging" }, configKey: "javaLogging" },
      { flag: "java-libraries", summary: "Java libraries.", source: { kind: "category", category: "javaLibraries" }, configKey: "javaLibraries", multiple: true },
      { flag: "java-testing-libraries", summary: "Java testing libraries.", source: { kind: "category", category: "javaTestingLibraries" }, configKey: "javaTestingLibraries", multiple: true },
    ],
  },
  {
    id: "dotnet",
    title: ".NET flags",
    description: "Flags for `--ecosystem dotnet`.",
    ecosystem: "dotnet",
    flags: [
      { flag: "dotnet-web-framework", summary: ".NET web framework.", source: { kind: "category", category: "dotnetWebFramework" }, configKey: "dotnetWebFramework" },
      { flag: "dotnet-orm", summary: ".NET data access.", source: { kind: "category", category: "dotnetOrm" }, configKey: "dotnetOrm" },
      { flag: "dotnet-auth", summary: ".NET auth.", source: { kind: "category", category: "dotnetAuth" }, configKey: "dotnetAuth" },
      { flag: "dotnet-api", summary: ".NET API style.", source: { kind: "category", category: "dotnetApi" }, configKey: "dotnetApi" },
      { flag: "dotnet-testing", summary: ".NET testing libraries.", source: { kind: "category", category: "dotnetTesting" }, configKey: "dotnetTesting", multiple: true },
      { flag: "dotnet-job-queue", summary: ".NET background jobs.", source: { kind: "category", category: "dotnetJobQueue" }, configKey: "dotnetJobQueue" },
      { flag: "dotnet-realtime", summary: ".NET realtime.", source: { kind: "category", category: "dotnetRealtime" }, configKey: "dotnetRealtime" },
      { flag: "dotnet-observability", summary: ".NET observability.", source: { kind: "category", category: "dotnetObservability" }, configKey: "dotnetObservability", multiple: true },
      { flag: "dotnet-validation", summary: ".NET validation.", source: { kind: "category", category: "dotnetValidation" }, configKey: "dotnetValidation" },
      { flag: "dotnet-caching", summary: ".NET caching.", source: { kind: "category", category: "dotnetCaching" }, configKey: "dotnetCaching" },
      { flag: "dotnet-deploy", summary: ".NET deploy target.", source: { kind: "category", category: "dotnetDeploy" }, configKey: "dotnetDeploy" },
    ],
  },
  {
    id: "elixir",
    title: "Elixir flags",
    description: "Flags for `--ecosystem elixir`.",
    ecosystem: "elixir",
    flags: [
      { flag: "elixir-web-framework", summary: "Elixir web framework.", source: { kind: "category", category: "elixirWebFramework" }, configKey: "elixirWebFramework" },
      { flag: "elixir-orm", summary: "Elixir ORM / database.", source: { kind: "category", category: "elixirOrm" }, configKey: "elixirOrm" },
      { flag: "elixir-auth", summary: "Elixir auth.", source: { kind: "category", category: "elixirAuth" }, configKey: "elixirAuth" },
      { flag: "elixir-api", summary: "Elixir API layer.", source: { kind: "category", category: "elixirApi" }, configKey: "elixirApi" },
      { flag: "elixir-realtime", summary: "Elixir realtime.", source: { kind: "category", category: "elixirRealtime" }, configKey: "elixirRealtime" },
      { flag: "elixir-jobs", summary: "Elixir jobs.", source: { kind: "category", category: "elixirJobs" }, configKey: "elixirJobs" },
      { flag: "elixir-validation", summary: "Elixir validation.", source: { kind: "category", category: "elixirValidation" }, configKey: "elixirValidation" },
      { flag: "elixir-http", summary: "Elixir HTTP client.", source: { kind: "category", category: "elixirHttp" }, configKey: "elixirHttp" },
      { flag: "elixir-json", summary: "Elixir JSON library.", source: { kind: "category", category: "elixirJson" }, configKey: "elixirJson" },
      { flag: "elixir-email", summary: "Elixir email.", source: { kind: "category", category: "elixirEmail" }, configKey: "elixirEmail" },
      { flag: "elixir-caching", summary: "Elixir caching.", source: { kind: "category", category: "elixirCaching" }, configKey: "elixirCaching" },
      { flag: "elixir-observability", summary: "Elixir observability.", source: { kind: "category", category: "elixirObservability" }, configKey: "elixirObservability" },
      { flag: "elixir-testing", summary: "Elixir testing.", source: { kind: "category", category: "elixirTesting" }, configKey: "elixirTesting" },
      { flag: "elixir-quality", summary: "Elixir code quality.", source: { kind: "category", category: "elixirQuality" }, configKey: "elixirQuality" },
      { flag: "elixir-deploy", summary: "Elixir deploy target.", source: { kind: "category", category: "elixirDeploy" }, configKey: "elixirDeploy" },
      { flag: "elixir-libraries", summary: "Elixir libraries.", source: { kind: "category", category: "elixirLibraries" }, configKey: "elixirLibraries", multiple: true },
    ],
  },
];

function resolveValues(def: CliFlagDefinition): { values: string[]; valueHint: string | null } {
  const source = def.source;
  switch (source.kind) {
    case "boolean":
      return { values: [], valueHint: `--${def.flag} / --no-${def.flag}` };
    case "freeform":
      return { values: [], valueHint: source.hint };
    case "literal":
      return { values: [...source.values], valueHint: null };
    case "category":
    case "categories": {
      const categories = source.kind === "category" ? [source.category] : source.categories;
      let values = [...new Set(categories.flatMap((category) => getCategoryCliValues(category)))];
      if (def.multiple && !values.includes("none")) values = [...values, "none"];
      return { values, valueHint: null };
    }
  }
}

function formatDefault(def: CliFlagDefinition): string | null {
  if (def.defaultLiteral !== undefined) return def.defaultLiteral;
  if (!def.configKey) return null;

  const value = createCliDefaultProjectConfigBase()[def.configKey];
  if (Array.isArray(value)) return value.length > 0 ? value.join(" ") : "none";
  if (typeof value === "boolean") return value ? `--${def.flag}` : `--no-${def.flag}`;
  if (value === undefined || value === null) return null;
  return String(value);
}

/**
 * Resolve the declarative flag registry into fully-populated rows (accepted
 * values + defaults) sourced from the shared option metadata and CLI defaults.
 * The docs CLI-flag data module and any tooling should call this rather than
 * hand-maintaining flag tables.
 */
export function getCliFlagReference(): ResolvedCliFlagGroup[] {
  return CLI_FLAG_GROUP_DEFINITIONS.map((group) => ({
    id: group.id,
    title: group.title,
    description: group.description,
    ecosystem: group.ecosystem,
    flags: group.flags.map((def) => {
      const { values, valueHint } = resolveValues(def);
      return {
        flag: `--${def.flag}`,
        summary: def.summary,
        values,
        valueHint,
        defaultValue: formatDefault(def),
        multiple: def.multiple ?? false,
      } satisfies ResolvedCliFlag;
    }),
  }));
}
