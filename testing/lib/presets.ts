import * as path from "node:path";
import type { Ecosystem, ProjectConfig } from "@better-fullstack/types";

import { buildHistoryFingerprint, fingerprintToKey } from "./generate-combos/fingerprint";
import { buildCommand } from "./generate-combos/render";
import type { ComboCandidate } from "./generate-combos/types";

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
    search: "none",
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
    rustLibraries: [],
    pythonWebFramework: "none",
    pythonOrm: "none",
    pythonValidation: "none",
    pythonAi: [],
    pythonTaskQueue: "none",
    pythonQuality: "none",
    goWebFramework: "none",
    goOrm: "none",
    goApi: "none",
    goCli: "none",
    goLogging: "none",
  } as ProjectConfig;
}

type PresetDef = {
  ecosystem: Ecosystem;
  overrides: Partial<ProjectConfig>;
};

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
      addons: ["turborepo", "tanstack-table", "tanstack-virtual", "tanstack-query", "tanstack-pacer", "biome"],
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
};

export function listPresetIds(): string[] {
  return Object.keys(SMOKE_TEST_PRESETS);
}

function buildPresetConfig(presetId: string, def: PresetDef): ProjectConfig {
  const name = `preset-${presetId}`;
  const base = makeBaseConfig(name, def.ecosystem);
  return { ...base, ...def.overrides, projectName: name, relativePath: name } as ProjectConfig;
}

export function getPresetCombos(presetId: string): ComboCandidate[] {
  if (presetId === "all") {
    return listPresetIds().map((id) => buildSinglePresetCombo(id));
  }

  const def = SMOKE_TEST_PRESETS[presetId];
  if (!def) {
    const available = listPresetIds().join(", ");
    throw new Error(
      `Unknown preset "${presetId}". Available: ${available}`,
    );
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
