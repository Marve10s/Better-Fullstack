import type { Ecosystem, ProjectConfig } from "@better-fullstack/types";

import * as path from "node:path";

import type { ComboCandidate } from "./generate-combos/types";

import { buildHistoryFingerprint, fingerprintToKey } from "./generate-combos/fingerprint";
import { buildCommand } from "./generate-combos/render";

export function makeBaseConfig(name: string, ecosystem: Ecosystem): ProjectConfig {
  return {
    projectName: name,
    projectDir: path.resolve(process.cwd(), name),
    relativePath: name,
    ecosystem,
    frontend: ["none"],
    backend: "none",
    runtime: "none",
    database: "none",
    orm: "none",
    dbSetup: "none",
    api: "none",
    auth: "none",
    payments: "none",
    email: "none",
    fileUpload: "none",
    logging: "none",
    observability: "none",
    featureFlags: "none",
    analytics: "none",
    effect: "none",
    stateManagement: "none",
    forms: "none",
    validation: "none",
    testing: "none",
    ai: "none",
    realtime: "none",
    jobQueue: "none",
    animation: "none",
    cssFramework: "none",
    uiLibrary: "none",
    cms: "none",
    caching: "none",
    rateLimit: "none",
    i18n: "none",
    search: "none",
    vectorDb: "none",
    fileStorage: "none",
    webDeploy: "none",
    serverDeploy: "none",
    addons: [],
    examples: [],
    aiDocs: ["claude-md"],
    packageManager: "bun",
    git: false,
    install: false,
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
    pythonTesting: [],
    pythonCaching: "none",
    pythonRealtime: "none",
    pythonObservability: "none",
    pythonCli: [],
    goWebFramework: "none",
    goOrm: "none",
    goApi: "none",
    goCli: "none",
    goLogging: "none",
    goAuth: "none",
    goTesting: [],
    goRealtime: "none",
    goMessageQueue: "none",
    goCaching: "none",
    goConfig: "none",
    goObservability: "none",
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
    elixirDeploy: "none",
    elixirLibraries: [],
    dotnetWebFramework: "none",
    dotnetOrm: "none",
    dotnetAuth: "none",
    dotnetApi: "none",
    dotnetTesting: [],
    dotnetJobQueue: "none",
    dotnetRealtime: "none",
    dotnetObservability: [],
    dotnetValidation: "none",
    dotnetCaching: "none",
    dotnetDeploy: "none",
    versionChannel: "stable",
  } as ProjectConfig;
}

type PresetDef = {
  ecosystem: Ecosystem;
  overrides: Partial<ProjectConfig>;
};

export type PresetGroupId = "pr-core" | "pr-broad" | "all";

const SMOKE_TEST_PRESETS: Record<string, PresetDef> = {
  "tanstack-fullstack": {
    ecosystem: "typescript",
    overrides: {
      frontend: ["tanstack-start"],
      backend: "self",
      runtime: "none",
      database: "postgres",
      orm: "drizzle",
      auth: "better-auth",
      api: "orpc",
      cssFramework: "tailwind",
      uiLibrary: "shadcn-ui",
      shadcnBase: "radix",
      shadcnStyle: "nova",
      shadcnIconLibrary: "lucide",
      shadcnColorTheme: "neutral",
      shadcnBaseColor: "neutral",
      shadcnFont: "inter",
      shadcnRadius: "default",
      stateManagement: "tanstack-store",
      forms: "tanstack-form",
      ai: "tanstack-ai",
      addons: [
        "turborepo",
        "tanstack-table",
        "tanstack-virtual",
        "tanstack-query",
        "tanstack-pacer",
        "biome",
      ],
      examples: ["tanstack-showcase"],
    },
  },

  t3: {
    ecosystem: "typescript",
    overrides: {
      frontend: ["next"],
      backend: "self",
      runtime: "none",
      database: "postgres",
      orm: "prisma",
      auth: "better-auth",
      api: "trpc",
      cssFramework: "tailwind",
      uiLibrary: "shadcn-ui",
      shadcnBase: "radix",
      shadcnStyle: "nova",
      shadcnIconLibrary: "lucide",
      shadcnColorTheme: "neutral",
      shadcnBaseColor: "neutral",
      shadcnFont: "inter",
      shadcnRadius: "default",
      validation: "zod",
      addons: ["turborepo"],
    },
  },

  "nextjs-minimal": {
    ecosystem: "typescript",
    overrides: {
      frontend: ["next"],
      backend: "self",
      runtime: "none",
      cssFramework: "tailwind",
      uiLibrary: "shadcn-ui",
      shadcnBase: "radix",
      shadcnStyle: "nova",
      shadcnIconLibrary: "lucide",
      shadcnColorTheme: "neutral",
      shadcnBaseColor: "neutral",
      shadcnFont: "inter",
      shadcnRadius: "default",
      addons: ["turborepo"],
    },
  },

  "vinext-minimal": {
    ecosystem: "typescript",
    overrides: {
      frontend: ["vinext"],
      backend: "self",
      runtime: "none",
      cssFramework: "tailwind",
      uiLibrary: "shadcn-ui",
      shadcnBase: "radix",
      shadcnStyle: "nova",
      shadcnIconLibrary: "lucide",
      shadcnColorTheme: "neutral",
      shadcnBaseColor: "neutral",
      shadcnFont: "inter",
      shadcnRadius: "default",
      addons: ["turborepo"],
    },
  },

  "vinext-basic": {
    ecosystem: "typescript",
    overrides: {
      frontend: ["vinext"],
      backend: "none",
      runtime: "none",
      cssFramework: "tailwind",
      uiLibrary: "none",
      addons: ["turborepo"],
    },
  },

  "react-hono": {
    ecosystem: "typescript",
    overrides: {
      frontend: ["tanstack-router"],
      backend: "hono",
      runtime: "bun",
      database: "sqlite",
      orm: "drizzle",
      auth: "better-auth",
      api: "orpc",
      cssFramework: "tailwind",
      uiLibrary: "shadcn-ui",
      shadcnBase: "radix",
      shadcnStyle: "nova",
      shadcnIconLibrary: "lucide",
      shadcnColorTheme: "neutral",
      shadcnBaseColor: "neutral",
      shadcnFont: "inter",
      shadcnRadius: "default",
      validation: "zod",
      addons: ["turborepo"],
    },
  },

  "frontend-only-react-vite": {
    ecosystem: "typescript",
    overrides: {
      frontend: ["react-vite"],
      backend: "none",
      runtime: "none",
      database: "none",
      orm: "none",
      api: "none",
      auth: "none",
      cssFramework: "tailwind",
      uiLibrary: "none",
      addons: ["turborepo"],
    },
  },

  sveltekit: {
    ecosystem: "typescript",
    overrides: {
      frontend: ["svelte"],
      backend: "self",
      runtime: "none",
      database: "sqlite",
      orm: "drizzle",
      auth: "better-auth",
      cssFramework: "tailwind",
      addons: ["turborepo"],
    },
  },

  "next-payload": {
    ecosystem: "typescript",
    overrides: {
      frontend: ["next"],
      backend: "self",
      runtime: "none",
      database: "sqlite",
      orm: "drizzle",
      cms: "payload",
      api: "trpc",
      addons: ["turborepo"],
    },
  },

  "astro-sanity": {
    ecosystem: "typescript",
    overrides: {
      frontend: ["astro"],
      backend: "hono",
      runtime: "bun",
      cms: "sanity",
      astroIntegration: "react",
      api: "trpc",
      addons: ["turborepo"],
    },
  },

  "nuxt-fullstack": {
    ecosystem: "typescript",
    overrides: {
      frontend: ["nuxt"],
      backend: "self",
      runtime: "none",
      api: "orpc",
      auth: "better-auth",
      addons: ["turborepo"],
    },
  },

  "react-router-hono": {
    ecosystem: "typescript",
    overrides: {
      frontend: ["react-router"],
      backend: "hono",
      runtime: "bun",
      api: "orpc",
      addons: ["turborepo"],
    },
  },

  "react-vite-hono": {
    ecosystem: "typescript",
    overrides: {
      frontend: ["react-vite"],
      backend: "hono",
      runtime: "bun",
      database: "sqlite",
      orm: "drizzle",
      api: "orpc",
      auth: "none",
      cssFramework: "tailwind",
      uiLibrary: "none",
      addons: ["turborepo"],
    },
  },

  "solid-start-express": {
    ecosystem: "typescript",
    overrides: {
      frontend: ["solid-start"],
      backend: "express",
      runtime: "node",
      database: "none",
      orm: "none",
      api: "orpc",
      auth: "none",
      cssFramework: "postcss-only",
      uiLibrary: "none",
      addons: ["turborepo"],
    },
  },

  "angular-fets": {
    ecosystem: "typescript",
    overrides: {
      frontend: ["angular"],
      backend: "fets",
      runtime: "node",
      database: "sqlite",
      orm: "drizzle",
      api: "none",
      auth: "none",
      cssFramework: "postcss-only",
      uiLibrary: "none",
      addons: ["turborepo"],
    },
  },

  "tanstack-start-fullstack": {
    ecosystem: "typescript",
    overrides: {
      frontend: ["tanstack-start"],
      backend: "self",
      runtime: "none",
      api: "orpc",
      auth: "better-auth",
      cssFramework: "tailwind",
      uiLibrary: "shadcn-ui",
      shadcnBase: "radix",
      shadcnStyle: "nova",
      shadcnIconLibrary: "lucide",
      shadcnColorTheme: "neutral",
      shadcnBaseColor: "neutral",
      shadcnFont: "inter",
      shadcnRadius: "default",
      addons: ["turborepo"],
    },
  },

  "version-channel-latest": {
    ecosystem: "typescript",
    overrides: {
      frontend: ["tanstack-router"],
      backend: "hono",
      runtime: "bun",
      database: "sqlite",
      orm: "drizzle",
      api: "orpc",
      cssFramework: "tailwind",
      versionChannel: "latest",
    },
  },

  "ai-search-workbench": {
    ecosystem: "typescript",
    overrides: {
      frontend: ["tanstack-router"],
      backend: "hono",
      runtime: "bun",
      api: "orpc",
      database: "postgres",
      orm: "drizzle",
      dbSetup: "none",
      auth: "better-auth",
      payments: "none",
      email: "none",
      fileUpload: "none",
      logging: "pino",
      observability: "opentelemetry",
      featureFlags: "none",
      analytics: "none",
      effect: "none",
      stateManagement: "tanstack-store",
      forms: "tanstack-form",
      validation: "valibot",
      testing: "vitest-playwright",
      ai: "vercel-ai",
      realtime: "none",
      jobQueue: "inngest",
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
      caching: "none",
      rateLimit: "none",
      i18n: "paraglide",
      search: "opensearch",
      vectorDb: "qdrant",
      fileStorage: "none",
      webDeploy: "none",
      serverDeploy: "none",
      addons: ["turborepo", "biome", "devcontainer", "github-actions"],
      examples: [],
      aiDocs: [],
      packageManager: "bun",
    },
  },

  // === RUST PRESETS ===
  "rust-axum-seaorm": {
    ecosystem: "rust",
    overrides: {
      rustWebFramework: "axum",
      rustFrontend: "leptos",
      rustOrm: "sea-orm",
      rustApi: "none",
      rustCli: "none",
      rustLibraries: ["serde", "validator", "jsonwebtoken", "argon2"],
      rustRealtime: "tokio-tungstenite",
      rustMessageQueue: "lapin",
      rustObservability: "opentelemetry",
      rustTemplating: "askama",
    },
  },
  "rust-actix-sqlx": {
    ecosystem: "rust",
    overrides: {
      rustWebFramework: "actix-web",
      rustFrontend: "dioxus",
      rustOrm: "sqlx",
      rustApi: "none",
      rustCli: "none",
      rustLibraries: ["serde", "validator"],
      rustAuth: "torii",
      rustTemplating: "tera",
      email: "resend",
      observability: "sentry",
      caching: "upstash-redis",
      search: "meilisearch",
    },
  },

  // === GO PRESETS ===
  "go-gin-gorm": {
    ecosystem: "go",
    overrides: {
      goWebFramework: "gin",
      goOrm: "gorm",
      goApi: "none",
      goCli: "none",
      goLogging: "zap",
      goTesting: ["testify", "gomock"],
      goRealtime: "gorilla-websocket",
      goMessageQueue: "nats",
      goCaching: "redis",
      goConfig: "viper",
      goObservability: "opentelemetry",
    },
  },
  "go-echo-sqlc": {
    ecosystem: "go",
    overrides: {
      goWebFramework: "echo",
      goOrm: "sqlc",
      goApi: "gqlgen",
      goCli: "none",
      goLogging: "none",
      goAuth: "goth",
      goRealtime: "centrifuge",
      goMessageQueue: "watermill",
      goCaching: "ristretto",
      goConfig: "koanf",
      email: "resend",
      observability: "sentry",
      caching: "upstash-redis",
      search: "meilisearch",
    },
  },

  // === PYTHON PRESETS ===
  "python-fastapi-sqlalchemy": {
    ecosystem: "python",
    overrides: {
      pythonWebFramework: "fastapi",
      pythonOrm: "sqlalchemy",
      pythonValidation: "pydantic",
      pythonAi: [],
      pythonAuth: "none",
      pythonApi: "none",
      pythonTaskQueue: "celery",
      pythonGraphql: "none",
      pythonQuality: "ruff",
      pythonTesting: ["pytest", "hypothesis"],
      pythonCaching: "redis",
      pythonRealtime: "python-socketio",
      pythonObservability: "opentelemetry",
      pythonCli: ["typer", "rich"],
      email: "resend",
      observability: "sentry",
      caching: "upstash-redis",
      search: "meilisearch",
    },
  },
  "python-django-langchain": {
    ecosystem: "python",
    overrides: {
      pythonWebFramework: "django",
      pythonOrm: "sqlmodel",
      pythonValidation: "pydantic",
      pythonAi: ["langchain", "pydantic-ai"],
      pythonAuth: "none",
      pythonApi: "none",
      pythonTaskQueue: "taskiq",
      pythonGraphql: "none",
      pythonQuality: "ruff",
      pythonCaching: "aiocache",
      pythonRealtime: "websockets",
      pythonCli: ["click"],
    },
  },

  // === JAVA PRESETS ===
  "java-spring-maven": {
    ecosystem: "java",
    overrides: {
      javaWebFramework: "spring-boot",
      javaBuildTool: "maven",
      javaOrm: "jooq",
      javaAuth: "keycloak",
      javaLogging: "logback",
      javaLibraries: ["spring-actuator", "springdoc-openapi", "spring-amqp", "opentelemetry-java"],
      javaTestingLibraries: ["junit5", "mockito"],
    },
  },
  "java-spring-gradle-jpa": {
    ecosystem: "java",
    overrides: {
      javaWebFramework: "spring-boot",
      javaBuildTool: "gradle",
      javaOrm: "spring-data-jpa",
      javaAuth: "spring-security",
      javaApi: "spring-graphql",
      javaLogging: "logback",
      javaLibraries: ["spring-actuator", "spring-validation", "flyway", "mapstruct", "caffeine"],
      javaTestingLibraries: ["junit5", "mockito", "testcontainers"],
      email: "resend",
      observability: "sentry",
      caching: "upstash-redis",
      search: "meilisearch",
    },
  },
  "java-plain-cli": {
    ecosystem: "java",
    overrides: {
      javaWebFramework: "none",
      javaBuildTool: "none",
      javaOrm: "none",
      javaAuth: "none",
      javaLibraries: [],
      javaTestingLibraries: [],
    },
  },

  // === ELIXIR PRESETS ===
  "elixir-phoenix-api": {
    ecosystem: "elixir",
    overrides: {
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
      elixirLibraries: ["broadway", "nx"],
      elixirTesting: "ex_unit",
      elixirQuality: "credo",
      elixirDeploy: "none",
    },
  },
  "dotnet-minimal-efcore": {
    ecosystem: "dotnet",
    overrides: {
      database: "sqlite",
      dotnetWebFramework: "aspnet-minimal",
      dotnetOrm: "ef-core",
      dotnetAuth: "none",
      dotnetApi: "minimal-api",
      dotnetTesting: ["xunit"],
      dotnetJobQueue: "hosted-services",
      dotnetRealtime: "signalr",
      dotnetObservability: ["serilog", "health-checks"],
      dotnetValidation: "fluentvalidation",
      dotnetCaching: "memory-cache",
      dotnetDeploy: "docker",
    },
  },
  "elixir-plain-worker": {
    ecosystem: "elixir",
    overrides: {
      elixirWebFramework: "none",
      elixirOrm: "none",
      elixirAuth: "none",
      elixirApi: "none",
      elixirRealtime: "none",
      elixirJobs: "quantum",
      elixirValidation: "none",
      elixirHttp: "req",
      elixirJson: "jason",
      elixirEmail: "none",
      elixirCaching: "cachex",
      elixirObservability: "none",
      elixirTesting: "ex_unit",
      elixirQuality: "credo",
      elixirDeploy: "mix-release",
    },
  },
  "native-uniwind-trpc": {
    ecosystem: "react-native",
    overrides: {
      frontend: ["native-uniwind"],
      backend: "hono",
      runtime: "bun",
      database: "sqlite",
      orm: "drizzle",
      auth: "better-auth",
      api: "trpc",
      packageManager: "bun",
      mobileNavigation: "expo-router",
      mobileUI: "none",
      mobileStorage: "none",
      mobileTesting: "none",
      mobilePush: "none",
      mobileOTA: "none",
      mobileDeepLinking: "none",
    },
  },
};

const PRESET_GROUPS = {
  "pr-core": [
    "tanstack-fullstack",
    "t3",
    "react-hono",
    "astro-sanity",
    "version-channel-latest",
    "rust-axum-seaorm",
    "python-fastapi-sqlalchemy",
    "go-gin-gorm",
    "java-spring-maven",
    "elixir-plain-worker",
    "native-uniwind-trpc",
    "frontend-only-react-vite",
  ],
  "pr-broad": [
    "nextjs-minimal",
    "next-payload",
    "sveltekit",
    "nuxt-fullstack",
    "react-router-hono",
    "tanstack-start-fullstack",
    "ai-search-workbench",
    "rust-actix-sqlx",
    "python-django-langchain",
    "go-echo-sqlc",
    "java-spring-gradle-jpa",
    "java-plain-cli",
    "elixir-phoenix-api",
    "dotnet-minimal-efcore",
    "react-vite-hono",
    "solid-start-express",
    "angular-fets",
    "vinext-minimal",
    "vinext-basic",
  ],
} as const satisfies Record<Exclude<PresetGroupId, "all">, readonly string[]>;

export function listPresetIds(): string[] {
  return Object.keys(SMOKE_TEST_PRESETS);
}

export function listPresetGroupIds(): PresetGroupId[] {
  return ["pr-core", "pr-broad", "all"];
}

function buildPresetConfig(presetId: string, def: PresetDef): ProjectConfig {
  const name = `preset-${presetId}`;
  const base = makeBaseConfig(name, def.ecosystem);
  return { ...base, ...def.overrides, projectName: name, relativePath: name } as ProjectConfig;
}

function getAllGroupedPresetIds(): string[] {
  return [...new Set([...PRESET_GROUPS["pr-core"], ...PRESET_GROUPS["pr-broad"]])];
}

function resolvePresetIds(presetId: string): string[] | null {
  if (presetId === "all") {
    return getAllGroupedPresetIds();
  }

  if (presetId in PRESET_GROUPS) {
    return [...PRESET_GROUPS[presetId as Exclude<PresetGroupId, "all">]];
  }

  return null;
}

export function getPresetCombos(presetId: string): ComboCandidate[] {
  const resolvedPresetIds = resolvePresetIds(presetId);
  if (resolvedPresetIds) {
    return resolvedPresetIds.map((id) => buildSinglePresetCombo(id));
  }

  const def = SMOKE_TEST_PRESETS[presetId];
  if (!def) {
    const available = [...listPresetIds(), ...listPresetGroupIds()].join(", ");
    throw new Error(`Unknown preset "${presetId}". Available: ${available}`);
  }

  return [buildSinglePresetCombo(presetId)];
}

function buildSinglePresetCombo(presetId: string): ComboCandidate {
  const def = SMOKE_TEST_PRESETS[presetId]!;
  const config = buildPresetConfig(presetId, def);
  const fingerprint = buildHistoryFingerprint(config);
  const fingerprintKey = fingerprintToKey(fingerprint);

  return {
    ecosystem: def.ecosystem,
    name: config.projectName,
    config,
    fingerprint,
    fingerprintKey,
    command: buildCommand(config.projectName, config),
  };
}

const presetIds = new Set(listPresetIds());
const groupedPresetIds = getAllGroupedPresetIds();

for (const presetId of groupedPresetIds) {
  if (!presetIds.has(presetId)) {
    throw new Error(`Preset group references unknown preset "${presetId}"`);
  }
}

if (groupedPresetIds.length !== presetIds.size) {
  const missingPresetIds = [...presetIds].filter(
    (presetId) => !groupedPresetIds.includes(presetId),
  );
  if (missingPresetIds.length > 0) {
    throw new Error(
      `Preset groups must cover every preset. Missing from groups: ${missingPresetIds.join(", ")}`,
    );
  }
}
