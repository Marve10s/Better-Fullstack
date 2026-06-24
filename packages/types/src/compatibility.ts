import type {
  AI,
  Addons,
  API,
  AstroIntegration,
  Auth,
  Backend,
  CSSFramework,
  Forms,
  Frontend,
  ProjectConfig,
  Runtime,
  StackPartEcosystem,
  StackPartRole,
  UILibrary,
} from "./types";

import { getCapabilityDisabledReason, normalizeCapabilitySelection } from "./capabilities";
import {
  CATEGORY_ORDER,
  getCategoryDisplayName,
  type OptionCategory,
} from "./option-metadata";
import {
  getUnsupportedWebDeployFrontend,
  hasDockerComposeCompatibleFrontend,
  hasPWACompatibleFrontend,
  hasTanStackAICompatibleFrontend,
  hasTauriCompatibleFrontend,
  isBackendUtilsCompatibleBackend,
  isExampleAIAllowed,
  isExampleChatSdkAllowed,
  requiresChatSdkVercelAIForExamples,
  UI_LIBRARY_COMPATIBILITY,
} from "./stack-compatibility-rules";
import {
  getStackPartCompatibilityIssueForPart,
  legacyProjectConfigToStackParts,
} from "./stack-graph";

export {
  BACKEND_UTILS_COMPATIBLE_BACKENDS,
  getUnsupportedWebDeployFrontend,
  hasDockerComposeCompatibleFrontend,
  hasPWACompatibleFrontend,
  hasTanStackAICompatibleFrontend,
  hasTauriCompatibleFrontend,
  isBackendUtilsCompatibleBackend,
  isExampleAIAllowed,
  isExampleChatSdkAllowed,
  requiresChatSdkVercelAIForExamples,
  UI_LIBRARY_COMPATIBILITY,
} from "./stack-compatibility-rules";

export type CompatibilityCategory = OptionCategory;

export type CompatibilityIssue = {
  code: string;
  message: string;
  category?: CompatibilityCategory;
  optionId?: string;
  provided?: Record<string, string | string[]>;
  suggestions?: string[];
};

export type CompatibilityEvaluation = {
  issues: CompatibilityIssue[];
};

export type CompatibilityAdjustment = {
  category: string;
  message: string;
};

export type CompatibilityInput = {
  ecosystem:
    | "typescript"
    | "react-native"
    | "rust"
    | "python"
    | "go"
    | "java"
    | "elixir"
    | "dotnet";
  projectName: string | null;
  webFrontend: string[];
  nativeFrontend: string[];
  astroIntegration: string;
  runtime: string;
  backend: string;
  database: string;
  orm: string;
  dbSetup: string;
  auth: string;
  payments: string;
  email: string;
  fileUpload: string;
  logging: string;
  observability: string;
  featureFlags: string;
  analytics: string;
  backendLibraries: string;
  stateManagement: string;
  forms: string;
  validation: string;
  testing: string;
  realtime: string;
  jobQueue: string;
  caching: string;
  rateLimit: string;
  animation: string;
  cssFramework: string;
  uiLibrary: string;
  shadcnBase: string;
  shadcnStyle: string;
  shadcnIconLibrary: string;
  shadcnColorTheme: string;
  shadcnBaseColor: string;
  shadcnFont: string;
  shadcnRadius: string;
  cms: string;
  i18n: string;
  search: string;
  vectorDb: string;
  fileStorage: string;
  mobileNavigation: string;
  mobileUI: string;
  mobileStorage: string;
  mobileTesting: string;
  mobilePush: string;
  mobileOTA: string;
  mobileDeepLinking: string;
  codeQuality: string[];
  documentation: string[];
  appPlatforms: string[];
  packageManager: string;
  versionChannel: string;
  examples: string[];
  aiSdk: string;
  aiDocs: string[];
  git: string;
  install: string;
  api: string;
  webDeploy: string;
  serverDeploy: string;
  yolo: string;
  rustWebFramework: string;
  rustFrontend: string;
  rustOrm: string;
  rustApi: string;
  rustCli: string;
  rustLibraries: string[];
  rustLogging: string;
  rustErrorHandling: string;
  rustCaching: string;
  rustAuth: string;
  rustRealtime: string;
  rustMessageQueue: string;
  rustObservability: string;
  rustTemplating: string;
  pythonWebFramework: string;
  pythonOrm: string;
  pythonValidation: string;
  pythonAi: string[];
  pythonAuth: string;
  pythonApi: string;
  pythonTaskQueue: string;
  pythonGraphql: string;
  pythonQuality: string;
  pythonTesting: string[];
  pythonCaching: string;
  pythonRealtime: string;
  pythonObservability: string;
  pythonCli: string[];
  goWebFramework: string;
  goOrm: string;
  goApi: string;
  goCli: string;
  goLogging: string;
  goAuth: string;
  goTesting: string[];
  goRealtime: string;
  goMessageQueue: string;
  goCaching: string;
  goConfig: string;
  goObservability: string;
  javaWebFramework: string;
  javaBuildTool: string;
  javaOrm: string;
  javaAuth: string;
  javaApi: string;
  javaLogging: string;
  javaLibraries: string[];
  javaTestingLibraries: string[];
  dotnetWebFramework: string;
  dotnetOrm: string;
  dotnetAuth: string;
  dotnetApi: string;
  dotnetTesting: string[];
  dotnetJobQueue: string;
  dotnetRealtime: string;
  dotnetObservability: string[];
  dotnetValidation: string;
  dotnetCaching: string;
  dotnetDeploy: string;
  elixirWebFramework: string;
  elixirOrm: string;
  elixirAuth: string;
  elixirApi: string;
  elixirRealtime: string;
  elixirJobs: string;
  elixirValidation: string;
  elixirHttp: string;
  elixirJson: string;
  elixirEmail: string;
  elixirCaching: string;
  elixirObservability: string;
  elixirTesting: string;
  elixirQuality: string;
  elixirDeploy: string;
  elixirLibraries: string[];
};

const DEFAULT_RUNTIME = "bun";
const PARAGLIDE_COMPATIBLE_FRONTENDS = new Set<Frontend>([
  "next",
  "nuxt",
  "vinext",
  "tanstack-router",
  "tanstack-start",
  "react-router",
  "react-vite",
  "svelte",
  "solid",
  "solid-start",
  "astro",
]);

export function validateProjectName(name: string): string | undefined {
  const INVALID_CHARS = ["<", ">", ":", '"', "|", "?", "*", "/", "\\"];
  const MAX_LENGTH = 255;

  if (name === ".") return undefined;

  if (!name) return "Project name cannot be empty";
  if (name.length > MAX_LENGTH) {
    return `Project name must be less than ${MAX_LENGTH} characters`;
  }
  if (INVALID_CHARS.some((char) => name.includes(char))) {
    return "Project name contains invalid characters";
  }
  if (name.startsWith(".") || name.startsWith("-")) {
    return "Project name cannot start with a dot or dash";
  }
  if (name.toLowerCase() === "node_modules" || name.toLowerCase() === "favicon.ico") {
    return "Project name is reserved";
  }
  return undefined;
}

const isChatSdkExampleSupported = (stack: CompatibilityInput): boolean => {
  if (stack.ecosystem !== "typescript") return false;

  if (
    stack.backend === "self-next" ||
    stack.backend === "self-vinext" ||
    stack.backend === "self-tanstack-start"
  ) {
    return true;
  }

  if (stack.backend === "self-nuxt") {
    return true;
  }

  if (stack.backend === "hono") {
    return stack.runtime === "node";
  }

  return false;
};

export const requiresChatSdkVercelAI = (stack: CompatibilityInput): boolean => {
  return requiresChatSdkVercelAIForExamples(stack.backend, stack.runtime, stack.examples);
};

export type CompatibilityAnalysisResult = {
  adjustedStack: CompatibilityInput | null;
  notes: Record<string, { notes: string[]; hasIssue: boolean }>;
  changes: CompatibilityAdjustment[];
};

/**
 * Analyzes the stack and auto-adjusts incompatible selections.
 * This follows the CLI approach: when you make a selection, dependent items adjust automatically.
 * The flow is: frontend -> backend -> runtime -> database -> orm -> api -> auth -> etc.
 */
export const analyzeStackCompatibility = (
  stack: CompatibilityInput,
): CompatibilityAnalysisResult => {
  // Skip all validation if YOLO mode is enabled
  if (stack.yolo === "true") {
    return {
      adjustedStack: null,
      notes: {},
      changes: [],
    };
  }

  const nextStack = { ...stack };
  // vectorDb is a newer optional field; callers and fixtures that predate it omit
  // it entirely. Treat a missing value as "none" up front so that defaulting it is
  // not reported as an adjustment (e.g. by the no-backend service override below).
  if (nextStack.vectorDb === undefined) {
    nextStack.vectorDb = "none";
  }
  let changed = false;
  const notes: CompatibilityAnalysisResult["notes"] = {};
  const changes: CompatibilityAdjustment[] = [];

  for (const cat of CATEGORY_ORDER) {
    notes[cat] = { notes: [], hasIssue: false };
  }

  // ============================================
  // BACKEND CONSTRAINTS
  // ============================================

  if (nextStack.backend === "convex") {
    // Convex handles its own runtime, database, orm, api, dbSetup
    const convexOverrides: Partial<CompatibilityInput> = {
      runtime: "none",
      database: "none",
      orm: "none",
      api: "none",
      dbSetup: "none",
      serverDeploy: "none",
      search: "none",
      vectorDb: "none",
      rateLimit: "none",
      fileStorage: "none",
    };

    for (const [key, value] of Object.entries(convexOverrides)) {
      const catKey = key as keyof CompatibilityInput;
      if (nextStack[catKey] !== value) {
        nextStack[catKey] = value as never;
        changed = true;
        changes.push({
          category: "backend",
          message: `${getCategoryDisplayName(catKey)} set to '${value}' (Convex provides this)`,
        });
      }
    }

    // Remove incompatible frontends
    if (nextStack.webFrontend.includes("solid")) {
      nextStack.webFrontend = nextStack.webFrontend.filter((f) => f !== "solid");
      if (nextStack.webFrontend.length === 0) nextStack.webFrontend = ["none"];
      changed = true;
      changes.push({ category: "backend", message: "Removed Solid (incompatible with Convex)" });
    }
    if (nextStack.webFrontend.includes("solid-start")) {
      nextStack.webFrontend = nextStack.webFrontend.filter((f) => f !== "solid-start");
      if (nextStack.webFrontend.length === 0) nextStack.webFrontend = ["none"];
      changed = true;
      changes.push({
        category: "backend",
        message: "Removed SolidStart (incompatible with Convex)",
      });
    }
    if (nextStack.webFrontend.includes("astro")) {
      nextStack.webFrontend = nextStack.webFrontend.filter((f) => f !== "astro");
      if (nextStack.webFrontend.length === 0) nextStack.webFrontend = ["none"];
      nextStack.astroIntegration = "none";
      changed = true;
      changes.push({ category: "backend", message: "Removed Astro (incompatible with Convex)" });
    }

    // Remove AI example if incompatible frontends are selected (Convex AI supports React-based frontends, including React + Vite)
    if (nextStack.examples.includes("ai")) {
      const hasIncompatibleFrontend = nextStack.webFrontend.some((f) =>
        ["solid", "svelte", "nuxt"].includes(f),
      );
      if (hasIncompatibleFrontend) {
        nextStack.examples = nextStack.examples.filter((e) => e !== "ai");
        if (nextStack.examples.length === 0) nextStack.examples = ["none"];
        changed = true;
        changes.push({
          category: "examples",
          message:
            "AI example removed (Convex AI only supports React-based frontends including React + Vite)",
        });
      }
    }
  }

  if (nextStack.backend === "none") {
    // No backend means no runtime, database, orm, api, auth, dbSetup, serverDeploy
    const noneOverrides: Partial<CompatibilityInput> = {
      runtime: "none",
      database: "none",
      orm: "none",
      api: "none",
      dbSetup: "none",
      serverDeploy: "none",
      payments: "none",
      search: "none",
      vectorDb: "none",
      rateLimit: "none",
      fileStorage: "none",
    };

    if (nextStack.ecosystem !== "go") {
      noneOverrides.auth = "none";
    }

    for (const [key, value] of Object.entries(noneOverrides)) {
      const catKey = key as keyof CompatibilityInput;
      if (nextStack[catKey] !== value) {
        nextStack[catKey] = value as never;
        changed = true;
        changes.push({
          category: "backend",
          message: `${getCategoryDisplayName(catKey)} set to '${value}' (no backend)`,
        });
      }
    }

    // Clear examples
    if (
      nextStack.examples.length > 0 &&
      !(nextStack.examples.length === 1 && nextStack.examples[0] === "none")
    ) {
      nextStack.examples = ["none"];
      changed = true;
      changes.push({ category: "backend", message: "Examples cleared (no backend)" });
    }
  }

  // Self (fullstack) backend constraints
  if (
    nextStack.backend === "self-next" ||
    nextStack.backend === "self-vinext" ||
    nextStack.backend === "self-tanstack-start" ||
    nextStack.backend === "self-astro" ||
    nextStack.backend === "self-nuxt" ||
    nextStack.backend === "self-svelte" ||
    nextStack.backend === "self-solid-start"
  ) {
    // Fullstack uses frontend's API routes, no separate runtime needed
    if (nextStack.runtime !== "none") {
      nextStack.runtime = "none";
      changed = true;
      changes.push({
        category: "backend",
        message: "Runtime set to 'None' (fullstack uses frontend's API routes)",
      });
    }
    if (nextStack.serverDeploy !== "none") {
      nextStack.serverDeploy = "none";
      changed = true;
      changes.push({
        category: "backend",
        message: "Server deploy set to 'None' (fullstack uses frontend deployment)",
      });
    }

    // Ensure correct frontend is selected
    if (nextStack.backend === "self-next" && !nextStack.webFrontend.includes("next")) {
      nextStack.webFrontend = ["next"];
      changed = true;
      changes.push({
        category: "backend",
        message: "Frontend set to 'Next.js' (required for Next.js fullstack)",
      });
    }
    if (nextStack.backend === "self-vinext" && !nextStack.webFrontend.includes("vinext")) {
      nextStack.webFrontend = ["vinext"];
      changed = true;
      changes.push({
        category: "backend",
        message: "Frontend set to 'Vinext' (required for Vinext fullstack)",
      });
    }
    if (
      nextStack.backend === "self-tanstack-start" &&
      !nextStack.webFrontend.includes("tanstack-start")
    ) {
      nextStack.webFrontend = ["tanstack-start"];
      changed = true;
      changes.push({
        category: "backend",
        message: "Frontend set to 'TanStack Start' (required for TanStack Start fullstack)",
      });
    }
    if (nextStack.backend === "self-astro" && !nextStack.webFrontend.includes("astro")) {
      nextStack.webFrontend = ["astro"];
      if (nextStack.astroIntegration === "none") {
        nextStack.astroIntegration = "react";
      }
      changed = true;
      changes.push({
        category: "backend",
        message: "Frontend set to 'Astro' (required for Astro fullstack)",
      });
    }
    if (nextStack.backend === "self-nuxt" && !nextStack.webFrontend.includes("nuxt")) {
      nextStack.webFrontend = ["nuxt"];
      changed = true;
      changes.push({
        category: "backend",
        message: "Frontend set to 'Nuxt' (required for Nuxt fullstack)",
      });
    }
    if (nextStack.backend === "self-svelte" && !nextStack.webFrontend.includes("svelte")) {
      nextStack.webFrontend = ["svelte"];
      changed = true;
      changes.push({
        category: "backend",
        message: "Frontend set to 'SvelteKit' (required for SvelteKit fullstack)",
      });
    }
    if (
      nextStack.backend === "self-solid-start" &&
      !nextStack.webFrontend.includes("solid-start")
    ) {
      nextStack.webFrontend = ["solid-start"];
      changed = true;
      changes.push({
        category: "backend",
        message: "Frontend set to 'SolidStart' (required for SolidStart fullstack)",
      });
    }
  }

  // ============================================
  // RUNTIME CONSTRAINTS
  // ============================================

  // Workers runtime requires Hono backend
  if (nextStack.runtime === "workers" && nextStack.backend !== "hono") {
    nextStack.backend = "hono";
    changed = true;
    changes.push({ category: "runtime", message: "Backend set to 'Hono' (required for Workers)" });
  }

  // Workers runtime requires server deployment
  if (nextStack.runtime === "workers" && nextStack.serverDeploy === "none") {
    nextStack.serverDeploy = "cloudflare";
    changed = true;
    changes.push({
      category: "runtime",
      message: "Server deploy set to 'Cloudflare' (required for Workers)",
    });
  }

  // Workers runtime is incompatible with MongoDB
  if (nextStack.runtime === "workers" && nextStack.database === "mongodb") {
    nextStack.database = "sqlite";
    nextStack.orm = "drizzle";
    nextStack.dbSetup = "d1";
    changed = true;
    changes.push({
      category: "runtime",
      message:
        "Database changed to SQLite with D1 (Better-Fullstack doesn't support MongoDB with Workers)",
    });
  }

  // Runtime "none" only for convex and fullstack backends
  if (
    nextStack.runtime === "none" &&
    nextStack.backend !== "convex" &&
    nextStack.backend !== "none" &&
    nextStack.backend !== "self-next" &&
    nextStack.backend !== "self-vinext" &&
    nextStack.backend !== "self-tanstack-start" &&
    nextStack.backend !== "self-astro" &&
    nextStack.backend !== "self-nuxt" &&
    nextStack.backend !== "self-svelte" &&
    nextStack.backend !== "self-solid-start"
  ) {
    nextStack.runtime = DEFAULT_RUNTIME;
    changed = true;
    changes.push({
      category: "runtime",
      message: `Runtime set to '${DEFAULT_RUNTIME}' (required for this backend)`,
    });
  }

  // ============================================
  // DATABASE & ORM CONSTRAINTS (CLI-like flow)
  // ============================================

  // Skip if backend doesn't use database
  if (nextStack.backend !== "convex" && nextStack.backend !== "none") {
    // If database is none, ORM and dbSetup must be none
    if (nextStack.database === "none") {
      if (nextStack.orm !== "none") {
        nextStack.orm = "none";
        changed = true;
        changes.push({ category: "database", message: "ORM set to 'None' (no database selected)" });
      }
      if (nextStack.dbSetup !== "none") {
        nextStack.dbSetup = "none";
        changed = true;
        changes.push({
          category: "database",
          message: "DB Setup set to 'None' (no database selected)",
        });
      }
    }

    // MongoDB requires Prisma or Mongoose
    if (nextStack.database === "mongodb") {
      if (nextStack.orm !== "prisma" && nextStack.orm !== "mongoose") {
        nextStack.orm = "prisma";
        changed = true;
        changes.push({
          category: "database",
          message: "ORM set to 'Prisma' (required for MongoDB)",
        });
      }
      // MongoDB only works with mongodb-atlas or none for dbSetup
      if (
        nextStack.dbSetup !== "mongodb-atlas" &&
        nextStack.dbSetup !== "none" &&
        nextStack.dbSetup !== "docker"
      ) {
        nextStack.dbSetup = "none";
        changed = true;
        changes.push({
          category: "database",
          message: "DB Setup set to 'None' (incompatible with MongoDB)",
        });
      }
    }

    // Relational databases (sqlite, postgres, mysql) need Drizzle or Prisma
    if (["sqlite", "postgres", "mysql"].includes(nextStack.database)) {
      if (nextStack.orm === "none") {
        nextStack.orm = "drizzle";
        changed = true;
        changes.push({
          category: "database",
          message: "ORM set to 'Drizzle' (required for database)",
        });
      }
      if (nextStack.orm === "mongoose") {
        nextStack.orm = "drizzle";
        changed = true;
        changes.push({
          category: "database",
          message: "ORM set to 'Drizzle' (Mongoose only works with MongoDB)",
        });
      }
    }

    // ORM selected but no database - select appropriate database
    if (nextStack.orm !== "none" && nextStack.database === "none") {
      if (nextStack.orm === "mongoose") {
        nextStack.database = "mongodb";
        changed = true;
        changes.push({
          category: "orm",
          message: "Database set to 'MongoDB' (required for Mongoose)",
        });
      } else {
        nextStack.database = "sqlite";
        changed = true;
        changes.push({ category: "orm", message: "Database set to 'SQLite' (required for ORM)" });
      }
    }

    // DB Setup constraints
    if (nextStack.dbSetup === "turso" && nextStack.database !== "sqlite") {
      nextStack.database = "sqlite";
      changed = true;
      changes.push({
        category: "dbSetup",
        message: "Database set to 'SQLite' (required for Turso)",
      });
    }
    if (nextStack.dbSetup === "d1") {
      if (nextStack.database !== "sqlite") {
        nextStack.database = "sqlite";
        changed = true;
        changes.push({
          category: "dbSetup",
          message: "Database set to 'SQLite' (required for D1)",
        });
      }
      if (nextStack.runtime !== "workers") {
        nextStack.runtime = "workers";
        nextStack.backend = "hono";
        changed = true;
        changes.push({
          category: "dbSetup",
          message: "Runtime set to 'Workers' with 'Hono' (required for D1)",
        });
      }
    }
    if (nextStack.dbSetup === "neon" && nextStack.database !== "postgres") {
      nextStack.database = "postgres";
      changed = true;
      changes.push({
        category: "dbSetup",
        message: "Database set to 'PostgreSQL' (required for Neon)",
      });
    }
    if (nextStack.dbSetup === "supabase" && nextStack.database !== "postgres") {
      nextStack.database = "postgres";
      changed = true;
      changes.push({
        category: "dbSetup",
        message: "Database set to 'PostgreSQL' (required for Supabase)",
      });
    }
    if (nextStack.dbSetup === "prisma-postgres" && nextStack.database !== "postgres") {
      nextStack.database = "postgres";
      changed = true;
      changes.push({
        category: "dbSetup",
        message: "Database set to 'PostgreSQL' (required for Prisma Postgres)",
      });
    }
    if (nextStack.dbSetup === "mongodb-atlas" && nextStack.database !== "mongodb") {
      nextStack.database = "mongodb";
      if (nextStack.orm !== "prisma" && nextStack.orm !== "mongoose") {
        nextStack.orm = "prisma";
      }
      changed = true;
      changes.push({
        category: "dbSetup",
        message: "Database set to 'MongoDB' (required for MongoDB Atlas)",
      });
    }
    if (
      nextStack.dbSetup === "planetscale" &&
      nextStack.database !== "postgres" &&
      nextStack.database !== "mysql"
    ) {
      nextStack.database = "postgres";
      changed = true;
      changes.push({
        category: "dbSetup",
        message: "Database set to 'PostgreSQL' (required for PlanetScale)",
      });
    }
    if (nextStack.dbSetup === "docker") {
      if (nextStack.database === "sqlite") {
        nextStack.dbSetup = "none";
        changed = true;
        changes.push({
          category: "dbSetup",
          message: "DB Setup set to 'None' (SQLite doesn't need Docker)",
        });
      }
      if (nextStack.runtime === "workers") {
        nextStack.dbSetup = "d1";
        changed = true;
        changes.push({
          category: "dbSetup",
          message:
            "DB Setup set to 'D1' (Better-Fullstack doesn't support Docker setup with Workers)",
        });
      }
    }
  }

  // ============================================
  // API CONSTRAINTS
  // ============================================

  if (nextStack.backend !== "convex" && nextStack.backend !== "none") {
    // Nuxt, Svelte, Solid, SolidStart require oRPC for React-only API clients.
    const needsOrpc = nextStack.webFrontend.some((f) =>
      ["nuxt", "svelte", "solid", "solid-start"].includes(f),
    );
    if (needsOrpc && (nextStack.api === "trpc" || nextStack.api === "apollo-server")) {
      nextStack.api = "orpc";
      changed = true;
      changes.push({ category: "api", message: "API set to 'oRPC' (required for this frontend)" });
    }

    // Astro with non-React integration requires oRPC for React-only API clients.
    if (
      nextStack.webFrontend.includes("astro") &&
      nextStack.astroIntegration !== "react" &&
      (nextStack.api === "trpc" || nextStack.api === "apollo-server")
    ) {
      const apiName = nextStack.api === "apollo-server" ? "Apollo Server" : "tRPC";
      nextStack.api = "orpc";
      changed = true;
      changes.push({
        category: "api",
        message: `API set to 'oRPC' (${apiName} requires React integration with Astro)`,
      });
    }
  }

  // ============================================
  // ASTRO INTEGRATION CONSTRAINTS
  // ============================================

  // If Astro is not selected, reset astroIntegration
  if (!nextStack.webFrontend.includes("astro") && nextStack.astroIntegration !== "none") {
    nextStack.astroIntegration = "none";
    changed = true;
    changes.push({
      category: "astroIntegration",
      message: "Astro integration reset (Astro not selected)",
    });
  }

  // If Astro is selected but no integration is set, default to react
  if (nextStack.webFrontend.includes("astro") && nextStack.astroIntegration === "none") {
    // Only set default if api is trpc (which requires react)
    if (nextStack.api === "trpc") {
      nextStack.astroIntegration = "react";
      changed = true;
      changes.push({
        category: "astroIntegration",
        message: "Astro integration set to 'React' (required for tRPC)",
      });
    }
  }

  // ============================================
  // AUTH CONSTRAINTS
  // ============================================

  // Redis is a key-value store without SQL support — better-auth requires SQL tables
  const isBetterAuthSelection =
    nextStack.auth === "better-auth" || nextStack.auth === "better-auth-organizations";

  if (isBetterAuthSelection && nextStack.database === "redis") {
    nextStack.auth = "none";
    changed = true;
    changes.push({
      category: "auth",
      message: "Auth set to 'None' (Better Auth requires a SQL database, not Redis)",
    });
  }

  const ormsWithoutBetterAuth = ["typeorm", "sequelize", "mikroorm"];
  if (isBetterAuthSelection && ormsWithoutBetterAuth.includes(nextStack.orm)) {
    nextStack.auth = "none";
    changed = true;
    changes.push({
      category: "auth",
      message: `Auth set to 'None' (${nextStack.orm} has no Better Auth adapter)`,
    });
  }

  const normalizedAuth = normalizeCapabilitySelection(
    "auth",
    {
      ecosystem: nextStack.ecosystem,
      backend: nextStack.backend,
      webFrontend: nextStack.webFrontend,
      nativeFrontend: nextStack.nativeFrontend,
    },
    nextStack.auth as Auth,
  );

  if (normalizedAuth.normalized && nextStack.auth !== normalizedAuth.value) {
    nextStack.auth = normalizedAuth.value;
    changed = true;
    changes.push({
      category: "auth",
      message: normalizedAuth.message ?? "Auth set to 'None'",
    });
  }

  // ============================================
  // PAYMENTS CONSTRAINTS
  // ============================================

  if (nextStack.payments === "dodo" && nextStack.webFrontend.includes("react-vite")) {
    nextStack.payments = "none";
    changed = true;
    changes.push({
      category: "payments",
      message:
        "Payments set to 'None' (Dodo Payments support is not available for React + Vite yet)",
    });
  }

  if (nextStack.payments === "polar") {
    if (nextStack.auth !== "better-auth" && nextStack.auth !== "better-auth-organizations") {
      nextStack.payments = "none";
      changed = true;
      changes.push({
        category: "payments",
        message: "Payments set to 'None' (Polar requires Better Auth)",
      });
    }
    const hasWebFrontend = nextStack.webFrontend.some((f) => f !== "none");
    if (!hasWebFrontend) {
      nextStack.payments = "none";
      changed = true;
      changes.push({
        category: "payments",
        message: "Payments set to 'None' (Polar requires web frontend)",
      });
    }
  }

  // ============================================
  // EMAIL CONSTRAINTS
  // ============================================

  if (nextStack.email !== "none") {
    if (nextStack.backend === "convex") {
      nextStack.email = "none";
      changed = true;
      changes.push({
        category: "email",
        message: "Email set to 'None' (incompatible with Convex)",
      });
    }
    if (nextStack.backend === "none") {
      nextStack.email = "none";
      changed = true;
      changes.push({
        category: "email",
        message: "Email set to 'None' (requires backend)",
      });
    }
  }

  // ============================================
  // CSS FRAMEWORK & UI LIBRARY CONSTRAINTS
  // ============================================

  // If no web frontend, reset CSS framework and UI library to none
  if (!nextStack.webFrontend.some((f) => f !== "none")) {
    if (nextStack.cssFramework !== "none") {
      nextStack.cssFramework = "none";
      changed = true;
      changes.push({
        category: "cssFramework",
        message: "CSS framework set to 'None' (no web frontend)",
      });
    }
    if (nextStack.uiLibrary !== "none") {
      nextStack.uiLibrary = "none";
      changed = true;
      changes.push({
        category: "uiLibrary",
        message: "UI library set to 'None' (no web frontend)",
      });
    }
  }

  let hasNativeFrontend = nextStack.nativeFrontend.some((f) => f !== "none");

  if (nextStack.ecosystem === "react-native") {
    const reactNativeOnlyCategories = [
      ["webFrontend", ["none"], "Web frontend set to 'None' (React Native ecosystem)"],
      ["backend", "none", "Backend set to 'None' (React Native ecosystem)"],
      ["runtime", "none", "Runtime set to 'None' (React Native ecosystem)"],
      ["api", "none", "API set to 'None' (React Native ecosystem)"],
      ["database", "none", "Database set to 'None' (React Native ecosystem)"],
      ["orm", "none", "ORM set to 'None' (React Native ecosystem)"],
      ["dbSetup", "none", "Database setup set to 'None' (React Native ecosystem)"],
      ["webDeploy", "none", "Web deployment set to 'None' (React Native ecosystem)"],
      ["serverDeploy", "none", "Server deployment set to 'None' (React Native ecosystem)"],
      ["cssFramework", "none", "CSS framework set to 'None' (React Native ecosystem)"],
      ["uiLibrary", "none", "UI library set to 'None' (React Native ecosystem)"],
      ["testing", "none", "Web testing set to 'None' (React Native ecosystem)"],
      ["forms", "none", "Web forms set to 'None' (React Native ecosystem)"],
      ["stateManagement", "none", "Web state management set to 'None' (React Native ecosystem)"],
      ["animation", "none", "Web animation set to 'None' (React Native ecosystem)"],
      ["realtime", "none", "Realtime set to 'None' (React Native ecosystem)"],
      ["jobQueue", "none", "Job queue set to 'None' (React Native ecosystem)"],
      ["fileUpload", "none", "File upload set to 'None' (React Native ecosystem)"],
      ["payments", "none", "Payments set to 'None' (React Native ecosystem)"],
      ["email", "none", "Email set to 'None' (React Native ecosystem)"],
      ["search", "none", "Search set to 'None' (React Native ecosystem)"],
      ["vectorDb", "none", "Vector database set to 'None' (React Native ecosystem)"],
      ["rateLimit", "none", "Rate limiting set to 'None' (React Native ecosystem)"],
      ["fileStorage", "none", "File storage set to 'None' (React Native ecosystem)"],
      ["cms", "none", "CMS set to 'None' (React Native ecosystem)"],
      ["caching", "none", "Caching set to 'None' (React Native ecosystem)"],
      ["i18n", "none", "i18n set to 'None' (React Native ecosystem)"],
      ["featureFlags", "none", "Feature flags set to 'None' (React Native ecosystem)"],
      ["analytics", "none", "Analytics set to 'None' (React Native ecosystem)"],
      ["aiSdk", "none", "AI SDK set to 'None' (React Native ecosystem)"],
      ["backendLibraries", "none", "Backend libraries set to 'None' (React Native ecosystem)"],
      ["examples", [], "Examples cleared (React Native ecosystem)"],
    ] as const;

    for (const [category, value, message] of reactNativeOnlyCategories) {
      const currentValue = nextStack[category];
      const isSameArray =
        Array.isArray(currentValue) &&
        Array.isArray(value) &&
        currentValue.length === value.length &&
        currentValue.every((entry, index) => entry === value[index]);
      if (Array.isArray(value) ? !isSameArray : currentValue !== value) {
        (nextStack as Record<string, unknown>)[category] = Array.isArray(value)
          ? [...value]
          : value;
        changed = true;
        changes.push({ category, message });
      }
    }

    if (!hasNativeFrontend) {
      nextStack.nativeFrontend = ["native-bare"];
      hasNativeFrontend = true;
      changed = true;
      changes.push({
        category: "nativeFrontend",
        message: "Native frontend set to 'Expo + StyleSheet' (React Native ecosystem)",
      });
    }
  }

  if (!hasNativeFrontend) {
    const nativeOnlyCategories = [
      ["mobileNavigation", "none", "Mobile navigation set to 'None' (no native frontend)"],
      ["mobileUI", "none", "Mobile UI set to 'None' (no native frontend)"],
      ["mobileStorage", "none", "Mobile storage set to 'None' (no native frontend)"],
      ["mobileTesting", "none", "Mobile testing set to 'None' (no native frontend)"],
      ["mobilePush", "none", "Mobile push set to 'None' (no native frontend)"],
      ["mobileOTA", "none", "Mobile OTA set to 'None' (no native frontend)"],
      ["mobileDeepLinking", "none", "Mobile deep linking set to 'None' (no native frontend)"],
    ] as const;

    for (const [category, value, message] of nativeOnlyCategories) {
      if (nextStack[category] !== value) {
        nextStack[category] = value;
        changed = true;
        changes.push({ category, message });
      }
    }
  } else {
    if (nextStack.mobileNavigation === "none") {
      nextStack.mobileNavigation = "expo-router";
      changed = true;
      changes.push({
        category: "mobileNavigation",
        message: "Mobile navigation set to 'Expo Router' (native frontend selected)",
      });
    }

    if (nextStack.mobileDeepLinking === "none" && nextStack.auth !== "none") {
      nextStack.mobileDeepLinking = "expo-linking";
      changed = true;
      changes.push({
        category: "mobileDeepLinking",
        message: "Mobile deep linking set to 'Expo Linking' (required for mobile auth redirects)",
      });
    }

    if (nextStack.nativeFrontend.includes("native-uniwind") && nextStack.mobileUI !== "uniwind") {
      nextStack.mobileUI = "uniwind";
      changed = true;
      changes.push({
        category: "mobileUI",
        message: "Mobile UI set to 'Uniwind' (required by Expo + Uniwind)",
      });
    }

    if (
      nextStack.nativeFrontend.includes("native-unistyles") &&
      nextStack.mobileUI !== "unistyles"
    ) {
      nextStack.mobileUI = "unistyles";
      changed = true;
      changes.push({
        category: "mobileUI",
        message: "Mobile UI set to 'Unistyles' (required by Expo + Unistyles)",
      });
    }
  }

  // UI libraries requiring Tailwind - auto-adjust CSS framework or clear UI library
  const requiresTailwind = ["shadcn-ui", "shadcn-svelte", "daisyui", "nextui"].includes(nextStack.uiLibrary);
  if (requiresTailwind && nextStack.cssFramework !== "tailwind") {
    // Auto-set Tailwind when selecting a Tailwind-dependent UI library
    nextStack.cssFramework = "tailwind";
    changed = true;
    changes.push({
      category: "cssFramework",
      message: `CSS framework set to 'Tailwind' (required by ${nextStack.uiLibrary})`,
    });
  }

  // React-only UI libraries - check frontend compatibility
  const reactOnlyLibraries = ["shadcn-ui", "radix-ui", "chakra-ui", "nextui", "mui", "antd"];
  const reactFrontends = [
    "tanstack-router",
    "react-router",
    "react-vite",
    "tanstack-start",
    "next",
    "vinext",
  ];
  if (reactOnlyLibraries.includes(nextStack.uiLibrary)) {
    const hasReactFrontend = nextStack.webFrontend.some((f) => reactFrontends.includes(f));
    const hasAstroReact =
      nextStack.webFrontend.includes("astro") && nextStack.astroIntegration === "react";
    if (!hasReactFrontend && !hasAstroReact && nextStack.webFrontend.some((f) => f !== "none")) {
      // Reset to a compatible UI library (daisyui works with all frontends)
      nextStack.uiLibrary = "daisyui";
      changed = true;
      changes.push({
        category: "uiLibrary",
        message:
          "UI library changed to 'daisyUI' (React-only library incompatible with this frontend)",
      });
    }
  }

  if (nextStack.uiLibrary === "shadcn-svelte") {
    const hasSvelteFrontend = nextStack.webFrontend.includes("svelte");
    const hasAstroSvelte =
      nextStack.webFrontend.includes("astro") && nextStack.astroIntegration === "svelte";
    if (!hasSvelteFrontend && !hasAstroSvelte && nextStack.webFrontend.some((f) => f !== "none")) {
      nextStack.uiLibrary = "daisyui";
      changed = true;
      changes.push({
        category: "uiLibrary",
        message: "UI library changed to 'daisyUI' (shadcn-svelte requires SvelteKit or Astro + Svelte)",
      });
    }
  }

  // Headless UI requires React or Vue
  if (nextStack.uiLibrary === "headless-ui") {
    const hasReactFrontend = nextStack.webFrontend.some((f) => reactFrontends.includes(f));
    const hasVueFrontend = nextStack.webFrontend.includes("nuxt");
    const hasAstroReactOrVue =
      nextStack.webFrontend.includes("astro") &&
      ["react", "vue"].includes(nextStack.astroIntegration);
    if (!hasReactFrontend && !hasVueFrontend && !hasAstroReactOrVue) {
      nextStack.uiLibrary = "daisyui";
      changed = true;
      changes.push({
        category: "uiLibrary",
        message: "UI library changed to 'daisyUI' (Headless UI requires React or Vue)",
      });
    }
  }

  // Park UI requires React, Vue, or Solid
  if (nextStack.uiLibrary === "park-ui") {
    const hasReactFrontend = nextStack.webFrontend.some((f) => reactFrontends.includes(f));
    const hasVueFrontend = nextStack.webFrontend.includes("nuxt");
    const hasSolidFrontend = nextStack.webFrontend.includes("solid");
    const hasAstroCompatible =
      nextStack.webFrontend.includes("astro") &&
      ["react", "vue", "solid"].includes(nextStack.astroIntegration);
    if (
      !hasReactFrontend &&
      !hasVueFrontend &&
      !hasSolidFrontend &&
      !hasAstroCompatible &&
      nextStack.webFrontend.some((f) => f !== "none")
    ) {
      nextStack.uiLibrary = "daisyui";
      changed = true;
      changes.push({
        category: "uiLibrary",
        message: "UI library changed to 'daisyUI' (Park UI requires React, Vue, or Solid)",
      });
    }
  }

  // ============================================
  // APP PLATFORMS CONSTRAINTS
  // ============================================

  const pwaCompat = hasPWACompatibleFrontend(nextStack.webFrontend);
  const tauriCompat = hasTauriCompatibleFrontend(nextStack.webFrontend);

  if (!pwaCompat && nextStack.appPlatforms.includes("pwa")) {
    nextStack.appPlatforms = nextStack.appPlatforms.filter((a) => a !== "pwa");
    changed = true;
    changes.push({
      category: "appPlatforms",
      message: "PWA removed (requires compatible frontend)",
    });
  }
  if (!tauriCompat && nextStack.appPlatforms.includes("tauri")) {
    nextStack.appPlatforms = nextStack.appPlatforms.filter((a) => a !== "tauri");
    changed = true;
    changes.push({
      category: "appPlatforms",
      message: "Tauri removed (requires compatible frontend)",
    });
  }

  // ============================================
  // EXAMPLES CONSTRAINTS
  // ============================================

  // AI example constraints
  if (nextStack.examples.includes("ai")) {
    // Solid/SolidStart frontend is incompatible with AI example
    if (nextStack.webFrontend.includes("solid") || nextStack.webFrontend.includes("solid-start")) {
      nextStack.examples = nextStack.examples.filter((e) => e !== "ai");
      if (nextStack.examples.length === 0) nextStack.examples = ["none"];
      changed = true;
      changes.push({
        category: "examples",
        message: "AI removed (not compatible with Solid frontend)",
      });
    }
    // Convex AI only supports React-based frontends (not Svelte/Nuxt)
    if (nextStack.backend === "convex") {
      const hasIncompatibleFrontend = nextStack.webFrontend.some((f) =>
        ["svelte", "nuxt"].includes(f),
      );
      if (hasIncompatibleFrontend) {
        nextStack.examples = nextStack.examples.filter((e) => e !== "ai");
        if (nextStack.examples.length === 0) nextStack.examples = ["none"];
        changed = true;
        changes.push({
          category: "examples",
          message:
            "AI removed (Convex AI only supports React-based frontends including React + Vite)",
        });
      }
    }
  }

  // Chat SDK example constraints (framework-specific profiles in v1)
  if (nextStack.examples.includes("chat-sdk")) {
    const hasReactVite = nextStack.webFrontend.includes("react-vite");

    if (hasReactVite || !isChatSdkExampleSupported(nextStack)) {
      nextStack.examples = nextStack.examples.filter((e) => e !== "chat-sdk");
      if (nextStack.examples.length === 0) nextStack.examples = ["none"];
      changed = true;

      let reason = "unsupported stack";
      if (hasReactVite) {
        reason = "React + Vite support is not available yet";
      } else if (nextStack.ecosystem !== "typescript") {
        reason = "TypeScript ecosystem only";
      } else if (nextStack.backend === "convex") {
        reason = "Convex backend not supported in v1";
      } else if (nextStack.backend === "none") {
        reason = "requires a backend";
      } else if (nextStack.backend === "hono" && nextStack.runtime !== "node") {
        reason = "Hono profile requires Node runtime";
      } else if (nextStack.backend.startsWith("self-")) {
        reason = "self backend only supports Next.js, TanStack Start, or Nuxt in v1";
      }

      changes.push({
        category: "examples",
        message: `Chat SDK removed (${reason})`,
      });
    } else if (requiresChatSdkVercelAI(nextStack) && nextStack.aiSdk !== "vercel-ai") {
      nextStack.aiSdk = "vercel-ai";
      changed = true;
      changes.push({
        category: "ai",
        message: "AI SDK set to 'Vercel AI SDK' (required by Chat SDK Nuxt/Hono profile in v1)",
      });
    }
  }

  // ============================================
  // FRESH FRONTEND CONSTRAINTS
  // Fresh is Preact-based and incompatible with React-specific packages
  // ============================================

  const isFresh = nextStack.webFrontend.includes("fresh");

  if (isFresh) {
    // TanStack Form has no Preact adapter
    if (nextStack.forms === "tanstack-form") {
      nextStack.forms = "none";
      changed = true;
      changes.push({
        category: "forms",
        message: "Forms set to 'None' (TanStack Form has no Preact adapter)",
      });
    }

    // State management libraries that require React bindings
    const reactOnlyStateManagement = ["nanostores", "xstate", "tanstack-store"];
    if (reactOnlyStateManagement.includes(nextStack.stateManagement)) {
      const oldValue = nextStack.stateManagement;
      nextStack.stateManagement = "none";
      changed = true;
      changes.push({
        category: "stateManagement",
        message: `State management set to 'None' (${oldValue} requires React bindings)`,
      });
    }

    // Lottie uses lottie-react which requires React
    if (nextStack.animation === "lottie") {
      nextStack.animation = "none";
      changed = true;
      changes.push({
        category: "animation",
        message: "Animation set to 'None' (Lottie requires lottie-react)",
      });
    }
  }

  // ============================================
  // PYTHON ECOSYSTEM CONSTRAINTS
  // ============================================

  if (nextStack.ecosystem === "python") {
    if (nextStack.pythonWebFramework !== "django" && nextStack.pythonApi !== "none") {
      nextStack.pythonApi = "none";
      changed = true;
      changes.push({
        category: "pythonWebFramework",
        message: "Python API framework set to 'None' (DRF and Django Ninja require Django)",
      });
    }
  }

  // ============================================
  // JAVA ECOSYSTEM CONSTRAINTS
  // ============================================

  if (nextStack.ecosystem === "java") {
    if (nextStack.javaBuildTool === "none") {
      if (nextStack.javaWebFramework !== "none") {
        nextStack.javaWebFramework = "none";
        changed = true;
        changes.push({
          category: "javaBuildTool",
          message: "Java web framework set to 'None' (source-only Java does not use a framework)",
        });
      }

      if (nextStack.javaTestingLibraries.some((library) => library !== "none")) {
        nextStack.javaTestingLibraries = [];
        changed = true;
        changes.push({
          category: "javaBuildTool",
          message:
            "Java testing libraries cleared (a build tool is required for test dependencies)",
        });
      }
    }

    if (nextStack.javaWebFramework !== "spring-boot" || nextStack.javaBuildTool === "none") {
      if (nextStack.javaOrm !== "none") {
        nextStack.javaOrm = "none";
        changed = true;
        changes.push({
          category: "javaWebFramework",
          message: "Java ORM set to 'None' (current scaffold only supports it with Spring Boot)",
        });
      }

      if (nextStack.javaAuth !== "none") {
        nextStack.javaAuth = "none";
        changed = true;
        changes.push({
          category: "javaWebFramework",
          message: "Java auth set to 'None' (current scaffold only supports it with Spring Boot)",
        });
      }

      if (nextStack.javaLibraries.some((library) => library !== "none")) {
        nextStack.javaLibraries = [];
        changed = true;
        changes.push({
          category: "javaWebFramework",
          message: "Java libraries cleared (Spring libraries require Spring Boot)",
        });
      }
    }

    if (nextStack.javaWebFramework === "spring-boot" && nextStack.javaBuildTool !== "none") {
      if (nextStack.javaOrm !== "spring-data-jpa") {
        const filteredLibraries = nextStack.javaLibraries.filter(
          (library) => library !== "flyway" && library !== "liquibase",
        );
        if (filteredLibraries.length !== nextStack.javaLibraries.length) {
          nextStack.javaLibraries = filteredLibraries;
          changed = true;
          changes.push({
            category: "javaOrm",
            message:
              "Java migration libraries cleared (Flyway and Liquibase require Spring Data JPA)",
          });
        }
      }

      if (
        nextStack.javaLibraries.includes("flyway") &&
        nextStack.javaLibraries.includes("liquibase")
      ) {
        nextStack.javaLibraries = nextStack.javaLibraries.filter(
          (library) => library !== "liquibase",
        );
        changed = true;
        changes.push({
          category: "javaLibraries",
          message: "Liquibase cleared (Flyway and Liquibase cannot be combined)",
        });
      }
    }
  }

  // ============================================
  // ELIXIR ECOSYSTEM CONSTRAINTS
  // ============================================

  if (nextStack.ecosystem === "elixir") {
    if (nextStack.elixirWebFramework === "none") {
      const dependentKeys: Array<keyof CompatibilityInput> = [
        "elixirAuth",
        "elixirApi",
        "elixirRealtime",
        "elixirObservability",
      ];

      for (const key of dependentKeys) {
        const value = nextStack[key];
        const shouldClear =
          key !== "elixirObservability" ? value !== "none" : value === "phoenix-telemetry";

        if (shouldClear) {
          nextStack[key] = "none" as never;
          changed = true;
          changes.push({
            category: "elixirWebFramework",
            message: `${getCategoryDisplayName(key)} set to 'None' (requires Phoenix)`,
          });
        }
      }
    }

    if (nextStack.elixirWebFramework === "phoenix-live-view" && nextStack.elixirApi === "none") {
      nextStack.elixirRealtime = "live-view-streams";
      changed = true;
      changes.push({
        category: "elixirRealtime",
        message: "Elixir realtime set to 'LiveView Streams' (Phoenix LiveView selected)",
      });
    }

    if (nextStack.elixirOrm === "none") {
      if (nextStack.elixirJobs === "oban") {
        nextStack.elixirJobs = "none";
        changed = true;
        changes.push({
          category: "elixirOrm",
          message: "Elixir jobs set to 'None' (Oban requires Ecto SQL with PostgreSQL)",
        });
      }
      if (nextStack.elixirAuth === "phx-gen-auth") {
        nextStack.elixirAuth = "none";
        changed = true;
        changes.push({
          category: "elixirOrm",
          message: "Elixir auth set to 'None' (phx.gen.auth requires Ecto)",
        });
      }
      if (nextStack.elixirApi === "absinthe") {
        nextStack.elixirApi = "rest";
        changed = true;
        changes.push({
          category: "elixirOrm",
          message: "Elixir API set to 'REST' (the generated Absinthe resolver needs Ecto)",
        });
      }
    }

    if (nextStack.elixirJobs === "oban" && nextStack.elixirOrm !== "ecto-sql") {
      nextStack.elixirJobs = "none";
      changed = true;
      changes.push({
        category: "elixirJobs",
        message: "Elixir jobs set to 'None' (Oban requires Ecto SQL with PostgreSQL)",
      });
    }

    if (nextStack.elixirAuth === "phx-gen-auth" && nextStack.elixirOrm !== "ecto-sql") {
      nextStack.elixirAuth = "none";
      changed = true;
      changes.push({
        category: "elixirAuth",
        message: "Elixir auth set to 'None' (phx.gen.auth requires Ecto SQL with PostgreSQL)",
      });
    }
  }

  // ============================================
  // DEPLOYMENT CONSTRAINTS
  // ============================================

  // Web deploy requires web frontend
  if (nextStack.webDeploy !== "none" && !nextStack.webFrontend.some((f) => f !== "none")) {
    nextStack.webDeploy = "none";
    changed = true;
    changes.push({ category: "webDeploy", message: "Web deploy set to 'None' (no web frontend)" });
  }

  // Server deploy constraints
  if (nextStack.serverDeploy === "cloudflare") {
    if (nextStack.runtime !== "workers" || nextStack.backend !== "hono") {
      nextStack.serverDeploy = "none";
      changed = true;
      changes.push({
        category: "serverDeploy",
        message: "Server deploy set to 'None' (Cloudflare requires Workers + Hono)",
      });
    }
  }

  if (
    nextStack.serverDeploy !== "none" &&
    [
      "none",
      "convex",
      "self-next",
      "self-vinext",
      "self-tanstack-start",
      "self-astro",
      "self-nuxt",
      "self-svelte",
      "self-solid-start",
    ].includes(nextStack.backend)
  ) {
    nextStack.serverDeploy = "none";
    changed = true;
    changes.push({
      category: "serverDeploy",
      message: "Server deploy set to 'None' (not needed for this backend)",
    });
  }

  return {
    adjustedStack: changed ? nextStack : null,
    notes,
    changes,
  };
};

/**
 * Returns a reason why an option is disabled, or null if it's enabled.
 *
 * PHILOSOPHY: Only disable options that are TRULY incompatible.
 * - Don't create circular dependencies
 * - Allow users to select options that will trigger auto-adjustments
 * - Follow CLI behavior: filter options based on UPSTREAM selections only
 */
export const getDisabledReason = (
  currentStack: CompatibilityInput,
  category: CompatibilityCategory,
  optionId: string,
): string | null => {
  // ============================================
  // CONVEX BACKEND - locks down many options
  // ============================================
  if (currentStack.backend === "convex") {
    if (category === "runtime" && optionId !== "none") {
      return "Convex provides its own runtime";
    }
    if (category === "database" && optionId !== "none") {
      return "Convex provides its own database";
    }
    if (category === "orm" && optionId !== "none") {
      return "Convex has built-in data access";
    }
    if (category === "api" && optionId !== "none") {
      return "Convex provides its own API layer";
    }
    if (category === "dbSetup" && optionId !== "none") {
      return "Convex handles database setup";
    }
    if (category === "serverDeploy" && optionId !== "none") {
      return "Convex has its own deployment";
    }
    if (category === "search" && optionId !== "none") {
      return "Search requires a standalone backend";
    }
    if (category === "vectorDb" && optionId !== "none") {
      return "Vector database requires a standalone backend (Convex has built-in vector search)";
    }
    if (category === "rateLimit" && optionId !== "none") {
      return "Rate limiting requires a standalone backend";
    }
    if (category === "fileStorage" && optionId !== "none") {
      return "File storage requires a standalone backend";
    }
    if (category === "webFrontend" && optionId === "solid") {
      return "In Better-Fullstack, the Convex backend is currently not available with Solid";
    }
    if (category === "webFrontend" && optionId === "astro") {
      return "In Better-Fullstack, the Convex backend is currently not available with Astro";
    }
    if (category === "examples" && optionId === "ai") {
      const hasIncompatibleFrontend = currentStack.webFrontend.some((f) =>
        ["solid", "svelte", "nuxt"].includes(f),
      );
      if (hasIncompatibleFrontend) {
        const frontendName = currentStack.webFrontend.find((f) =>
          ["solid", "svelte", "nuxt"].includes(f),
        );
        return `Convex AI example only supports React-based frontends including React + Vite (not ${frontendName})`;
      }
    }
  }

  if (currentStack.ecosystem === "react-native") {
    const reactNativeCategories = new Set([
      "nativeFrontend",
      "mobileNavigation",
      "mobileUI",
      "mobileStorage",
      "mobileTesting",
      "mobilePush",
      "mobileOTA",
      "mobileDeepLinking",
      "auth",
      "packageManager",
      "aiDocs",
      "git",
      "install",
    ]);

    if (!reactNativeCategories.has(category) && optionId !== "none" && optionId !== "false") {
      return "React Native ecosystem only supports native mobile options";
    }
  }

  // ============================================
  // NO BACKEND - locks down backend-dependent options
  // ============================================
  if (currentStack.backend === "none") {
    if (category === "runtime" && optionId !== "none") {
      return "No backend selected";
    }
    if (category === "database" && optionId !== "none") {
      return "No backend selected";
    }
    if (category === "orm" && optionId !== "none") {
      return "No backend selected";
    }
    if (category === "api" && optionId !== "none") {
      return "No backend selected";
    }
    if (category === "dbSetup" && optionId !== "none") {
      return "No backend selected";
    }
    if (category === "serverDeploy" && optionId !== "none") {
      return "No backend selected";
    }
    if (category === "payments" && optionId !== "none") {
      return "No backend selected";
    }
    if (category === "search" && optionId !== "none") {
      return "No backend selected";
    }
    if (category === "vectorDb" && optionId !== "none") {
      return "No backend selected";
    }
    if (category === "rateLimit" && optionId !== "none") {
      return "No backend selected";
    }
    if (category === "fileStorage" && optionId !== "none") {
      return "No backend selected";
    }
    if (category === "examples" && optionId !== "none") {
      return "No backend selected";
    }
  }

  const graphDisabledReason = getGraphDisabledReason(currentStack, category, optionId);
  if (graphDisabledReason) {
    return graphDisabledReason;
  }

  // ============================================
  // FULLSTACK BACKEND CONSTRAINTS
  // ============================================
  if (currentStack.backend === "self-next") {
    if (category === "runtime" && optionId !== "none") {
      return "Next.js fullstack uses built-in API routes";
    }
    if (category === "webFrontend" && optionId !== "next" && optionId !== "none") {
      return "Next.js fullstack requires Next.js frontend";
    }
    if (category === "serverDeploy" && optionId !== "none") {
      return "Fullstack uses frontend deployment";
    }
  }

  if (currentStack.backend === "self-vinext") {
    if (category === "runtime" && optionId !== "none") {
      return "Vinext fullstack uses built-in API routes";
    }
    if (category === "webFrontend" && optionId !== "vinext" && optionId !== "none") {
      return "Vinext fullstack requires Vinext frontend";
    }
    if (category === "serverDeploy" && optionId !== "none") {
      return "Fullstack uses frontend deployment";
    }
  }

  if (currentStack.backend === "self-tanstack-start") {
    if (category === "runtime" && optionId !== "none") {
      return "TanStack Start fullstack uses built-in API routes";
    }
    if (category === "webFrontend" && optionId !== "tanstack-start" && optionId !== "none") {
      return "TanStack Start fullstack requires TanStack Start frontend";
    }
    if (category === "serverDeploy" && optionId !== "none") {
      return "Fullstack uses frontend deployment";
    }
  }

  if (currentStack.backend === "self-astro") {
    if (category === "runtime" && optionId !== "none") {
      return "Astro fullstack uses built-in API routes";
    }
    if (category === "webFrontend" && optionId !== "astro" && optionId !== "none") {
      return "Astro fullstack requires Astro frontend";
    }
    if (category === "serverDeploy" && optionId !== "none") {
      return "Fullstack uses frontend deployment";
    }
  }

  if (currentStack.backend === "self-nuxt") {
    if (category === "runtime" && optionId !== "none") {
      return "Nuxt fullstack uses built-in API routes";
    }
    if (category === "webFrontend" && optionId !== "nuxt" && optionId !== "none") {
      return "Nuxt fullstack requires Nuxt frontend";
    }
    if (category === "serverDeploy" && optionId !== "none") {
      return "Fullstack uses frontend deployment";
    }
  }

  if (currentStack.backend === "self-svelte") {
    if (category === "runtime" && optionId !== "none") {
      return "SvelteKit fullstack uses built-in API routes";
    }
    if (category === "webFrontend" && optionId !== "svelte" && optionId !== "none") {
      return "SvelteKit fullstack requires SvelteKit frontend";
    }
    if (category === "serverDeploy" && optionId !== "none") {
      return "Fullstack uses frontend deployment";
    }
  }

  if (currentStack.backend === "self-solid-start") {
    if (category === "runtime" && optionId !== "none") {
      return "SolidStart fullstack uses built-in API routes";
    }
    if (category === "webFrontend" && optionId !== "solid-start" && optionId !== "none") {
      return "SolidStart fullstack requires SolidStart frontend";
    }
    if (category === "serverDeploy" && optionId !== "none") {
      return "Fullstack uses frontend deployment";
    }
  }

  // ============================================
  // BACKEND SELECTION CONSTRAINTS
  // ============================================
  if (category === "backend") {
    if (optionId === "self-next" && !currentStack.webFrontend.includes("next")) {
      return "Requires Next.js frontend";
    }
    if (optionId === "self-vinext" && !currentStack.webFrontend.includes("vinext")) {
      return "Requires Vinext frontend";
    }
    if (
      optionId === "self-tanstack-start" &&
      !currentStack.webFrontend.includes("tanstack-start")
    ) {
      return "Requires TanStack Start frontend";
    }
    if (optionId === "self-astro" && !currentStack.webFrontend.includes("astro")) {
      return "Requires Astro frontend";
    }
    if (optionId === "self-nuxt" && !currentStack.webFrontend.includes("nuxt")) {
      return "Requires Nuxt frontend";
    }
    if (optionId === "self-svelte" && !currentStack.webFrontend.includes("svelte")) {
      return "Requires SvelteKit frontend";
    }
    if (optionId === "self-solid-start" && !currentStack.webFrontend.includes("solid-start")) {
      return "Requires SolidStart frontend";
    }
    if (optionId === "convex" && currentStack.webFrontend.includes("solid")) {
      return "In Better-Fullstack, Convex is currently not available with Solid";
    }
    if (optionId === "convex" && currentStack.webFrontend.includes("solid-start")) {
      return "In Better-Fullstack, Convex is currently not available with SolidStart";
    }
    if (optionId === "convex" && currentStack.webFrontend.includes("astro")) {
      return "In Better-Fullstack, Convex is currently not available with Astro";
    }
    // Workers runtime only works with Hono backend
    if (currentStack.runtime === "workers" && optionId !== "hono" && optionId !== "none") {
      return "In Better-Fullstack, Workers runtime is currently supported only with Hono";
    }
  }

  // ============================================
  // RUNTIME CONSTRAINTS
  // ============================================
  if (category === "runtime") {
    if (optionId === "workers" && currentStack.backend !== "hono") {
      return "In Better-Fullstack, Workers runtime currently requires the Hono backend";
    }
    if (
      optionId === "workers" &&
      currentStack.cms === "keystatic" &&
      currentStack.webFrontend.includes("astro") &&
      !currentStack.webFrontend.includes("next")
    ) {
      return "Keystatic's Astro integration is not Astro 7-compatible yet.";
    }
    if (optionId === "none") {
      const allowedBackends = [
        "convex",
        "none",
        "self-next",
        "self-vinext",
        "self-tanstack-start",
        "self-astro",
        "self-nuxt",
        "self-svelte",
        "self-solid-start",
      ];
      if (!allowedBackends.includes(currentStack.backend)) {
        return "Runtime 'None' only for Convex or fullstack backends";
      }
    }
  }

  // ============================================
  // DATABASE CONSTRAINTS
  // ============================================
  if (category === "database") {
    if (optionId === "mongodb" && currentStack.runtime === "workers") {
      return "In Better-Fullstack, MongoDB is currently not available with Workers runtime";
    }
    // Allow all databases when ORM is none - system will auto-select ORM
  }

  // ============================================
  // ORM CONSTRAINTS
  // ============================================
  if (category === "orm") {
    if (optionId === "mongoose") {
      if (currentStack.runtime === "workers") {
        return "Mongoose requires MongoDB, and Better-Fullstack currently doesn't support MongoDB with Workers runtime";
      }
      // Only block if a non-MongoDB database is EXPLICITLY selected
      if (currentStack.database !== "none" && currentStack.database !== "mongodb") {
        return "Mongoose only works with MongoDB";
      }
      // Allow when database is "none" - system will auto-select MongoDB
    }
    if (optionId === "drizzle" && currentStack.database === "mongodb") {
      return "Drizzle does not support MongoDB";
    }
    if (optionId === "none" && currentStack.database !== "none") {
      return "Database requires an ORM";
    }
  }

  // ============================================
  // DB SETUP CONSTRAINTS
  // ============================================
  if (category === "dbSetup" && optionId !== "none") {
    if (currentStack.database === "none") {
      return "Select a database first";
    }

    // Database-specific setups
    if (optionId === "turso" && currentStack.database !== "sqlite") {
      return "Turso requires SQLite";
    }
    if (optionId === "d1") {
      if (currentStack.database !== "sqlite") return "D1 requires SQLite";
      if (currentStack.runtime !== "workers") return "D1 requires Workers runtime";
    }
    if (optionId === "neon" && currentStack.database !== "postgres") {
      return "Neon requires PostgreSQL";
    }
    if (optionId === "supabase" && currentStack.database !== "postgres") {
      return "Supabase requires PostgreSQL";
    }
    if (optionId === "prisma-postgres" && currentStack.database !== "postgres") {
      return "Prisma Postgres requires PostgreSQL";
    }
    if (optionId === "mongodb-atlas" && currentStack.database !== "mongodb") {
      return "MongoDB Atlas requires MongoDB";
    }
    if (
      optionId === "planetscale" &&
      currentStack.database !== "postgres" &&
      currentStack.database !== "mysql"
    ) {
      return "PlanetScale requires PostgreSQL or MySQL";
    }
    if (optionId === "docker") {
      if (currentStack.database === "sqlite") return "SQLite doesn't need Docker";
      if (currentStack.runtime === "workers") return "Docker is incompatible with Workers";
    }
  }

  // ============================================
  // API CONSTRAINTS
  // ============================================
  if (category === "api" && optionId === "trpc") {
    const needsOrpc = currentStack.webFrontend.some((f) =>
      ["nuxt", "svelte", "solid", "solid-start"].includes(f),
    );
    if (needsOrpc) {
      const frontendName = currentStack.webFrontend.find((f) =>
        ["nuxt", "svelte", "solid", "solid-start"].includes(f),
      );
      return `${frontendName} requires oRPC, not tRPC`;
    }
    // Astro with non-React integration requires oRPC
    if (
      currentStack.webFrontend.includes("astro") &&
      currentStack.astroIntegration !== "react" &&
      currentStack.astroIntegration !== "none"
    ) {
      return `Astro with ${currentStack.astroIntegration} integration requires oRPC, not tRPC`;
    }
  }

  if (category === "api" && optionId === "openapi") {
    if (currentStack.backend === "self") {
      return "OpenAPI server scaffolding currently requires a standalone TypeScript backend";
    }
    if (currentStack.nativeFrontend.length > 0) {
      return "OpenAPI is currently available for web frontends, not React Native";
    }
    if (!["hono", "express", "fastify", "elysia"].includes(currentStack.backend)) {
      return "OpenAPI currently supports Hono, Express, Fastify, and Elysia backends";
    }
  }

  if (category === "api" && optionId === "apollo-server") {
    const needsReactFrontend = currentStack.webFrontend.some((f) =>
      ["nuxt", "svelte", "solid", "solid-start"].includes(f),
    );
    if (needsReactFrontend) {
      const frontendName = currentStack.webFrontend.find((f) =>
        ["nuxt", "svelte", "solid", "solid-start"].includes(f),
      );
      return `${frontendName} requires oRPC, not Apollo Server`;
    }
    if (currentStack.webFrontend.includes("astro") && currentStack.astroIntegration !== "react") {
      return "Apollo Server requires React integration with Astro";
    }
    if (currentStack.backend === "self") {
      return "Apollo Server scaffolding currently requires a standalone TypeScript backend";
    }
    if (currentStack.nativeFrontend.length > 0) {
      return "Apollo Server is currently available for web frontends, not React Native";
    }
    if (!["hono", "express", "fastify", "elysia"].includes(currentStack.backend)) {
      return "Apollo Server currently supports Hono, Express, Fastify, and Elysia backends";
    }
  }

  if (category === "appPlatforms" && optionId === "nx" && currentStack.appPlatforms.includes("turborepo")) {
    return "Choose either Nx or Turborepo, not both";
  }

  if (category === "appPlatforms" && optionId === "turborepo" && currentStack.appPlatforms.includes("nx")) {
    return "Choose either Turborepo or Nx, not both";
  }

  // ============================================
  // ASTRO INTEGRATION CONSTRAINTS
  // ============================================
  if (category === "astroIntegration") {
    if (!currentStack.webFrontend.includes("astro") && optionId !== "none") {
      return "Astro integration requires Astro frontend";
    }
    // React-only APIs require React integration
    if (
      currentStack.webFrontend.includes("astro") &&
      currentStack.api === "apollo-server" &&
      optionId !== "react"
    ) {
      return "Apollo Server requires React integration with Astro";
    }
    if (
      currentStack.webFrontend.includes("astro") &&
      currentStack.api === "trpc" &&
      optionId !== "react" &&
      optionId !== "none"
    ) {
      return "tRPC requires React integration with Astro";
    }
  }

  // ============================================
  // AUTH CONSTRAINTS
  // ============================================
  if (category === "auth") {
    const isBetterAuthOption =
      optionId === "better-auth" || optionId === "better-auth-organizations";
    if (isBetterAuthOption && currentStack.database === "redis") {
      return "Better Auth requires a SQL database (not Redis)";
    }
    const ormsWithoutBetterAuth = ["typeorm", "sequelize", "mikroorm"];
    if (isBetterAuthOption && ormsWithoutBetterAuth.includes(currentStack.orm)) {
      return `Better Auth has no ${currentStack.orm} adapter`;
    }
    return getCapabilityDisabledReason(
      "auth",
      {
        ecosystem: currentStack.ecosystem,
        backend: currentStack.backend,
        webFrontend: currentStack.webFrontend,
        nativeFrontend: currentStack.nativeFrontend,
      },
      optionId as Auth,
    );
  }

  // ============================================
  // PAYMENTS CONSTRAINTS
  // ============================================
  if (category === "payments" && optionId === "polar") {
    if (currentStack.auth !== "better-auth" && currentStack.auth !== "better-auth-organizations") {
      return "Polar requires Better Auth";
    }
    if (!currentStack.webFrontend.some((f) => f !== "none")) {
      return "Polar requires a web frontend";
    }
  }

  if (
    category === "payments" &&
    optionId !== "none" &&
    currentStack.webFrontend.includes("react-vite") &&
    optionId === "dodo"
  ) {
    return "Dodo Payments are not yet supported for React + Vite projects";
  }

  // ============================================
  // CMS CONSTRAINTS
  // ============================================
  if (category === "cms" && optionId === "payload") {
    if (!currentStack.webFrontend.includes("next")) {
      return "Payload CMS v3 requires Next.js";
    }
  }
  if (category === "cms" && optionId === "keystatic") {
    if (!currentStack.webFrontend.includes("next")) {
      return "Keystatic is currently scaffolded for Next.js only because @keystatic/astro is not Astro 7-compatible yet.";
    }
  }

  // ============================================
  // EMAIL CONSTRAINTS
  // ============================================
  if (category === "email" && optionId !== "none") {
    if (currentStack.ecosystem !== "typescript") {
      return null;
    }
    if (currentStack.backend === "convex") {
      return "Email integration is not available with Convex backend";
    }
    if (currentStack.backend === "none") {
      return "Email integration requires a backend";
    }
  }

  // ============================================
  // OBSERVABILITY CONSTRAINTS
  // ============================================
  if (category === "observability" && optionId !== "none") {
    if (currentStack.ecosystem !== "typescript") {
      return null;
    }
  }

  // ============================================
  // CACHING CONSTRAINTS
  // ============================================
  if (category === "caching" && optionId !== "none") {
    if (currentStack.ecosystem !== "typescript") {
      return null;
    }
  }

  // ============================================
  // RATE LIMITING CONSTRAINTS
  // ============================================
  if (category === "rateLimit" && optionId !== "none") {
    if (currentStack.ecosystem !== "typescript") {
      return null;
    }
    if (currentStack.backend === "convex") {
      return "Rate limiting helpers are not generated with Convex backend";
    }
    if (currentStack.backend === "none") {
      return "Rate limiting requires a backend";
    }
  }

  // ============================================
  // SEARCH CONSTRAINTS
  // ============================================
  if (category === "search" && optionId !== "none") {
    if (currentStack.ecosystem !== "typescript") {
      return null;
    }
  }

  // ============================================
  // VECTOR DATABASE CONSTRAINTS
  // ============================================
  if (category === "vectorDb" && optionId !== "none") {
    // Vector DB is a TypeScript-ecosystem feature only.
    if (currentStack.ecosystem !== "typescript") {
      return "Vector database is only available for the TypeScript ecosystem";
    }
  }

  // ============================================
  // AI CONSTRAINTS
  // ============================================
  if (category === "ai" && requiresChatSdkVercelAI(currentStack) && optionId !== "vercel-ai") {
    return "Chat SDK example (Nuxt/Hono profile) requires Vercel AI SDK in v1";
  }

  // TanStack AI: React and Solid only (client adapter). Server-side core works anywhere.
  if (category === "ai" && optionId === "tanstack-ai") {
    const compatibleFrontends = [
      "tanstack-router",
      "react-router",
      "react-vite",
      "tanstack-start",
      "next",
      "redwood",
      "solid",
      "solid-start",
    ];
    const hasCompatible = currentStack.webFrontend.some((f) => compatibleFrontends.includes(f));

    if (!hasCompatible) {
      return "TanStack AI requires React or Solid frontend (no Vue/Svelte/Angular adapter yet)";
    }
  }

  // ============================================
  // APP PLATFORMS CONSTRAINTS
  // ============================================
  if (category === "appPlatforms") {
    if (optionId === "pwa" && !hasPWACompatibleFrontend(currentStack.webFrontend)) {
      return "PWA requires TanStack Router, React Router, Solid, Next.js, Vinext, or Astro";
    }
    if (optionId === "tauri" && !hasTauriCompatibleFrontend(currentStack.webFrontend)) {
      return "Tauri requires TanStack Router, React Router, Nuxt, Svelte, Solid, Next.js, or Astro";
    }
    if (optionId === "docker-compose" || optionId === "devcontainer") {
      const title = optionId === "devcontainer" ? "DevContainer" : "Docker Compose";

      if (currentStack.backend === "convex") {
        return `${title} is not compatible with Convex backend (managed service)`;
      }
      if (currentStack.runtime === "workers") {
        return `${title} is not compatible with Cloudflare Workers runtime`;
      }
      if (!["typescript", "python", "go", "rust", "java"].includes(currentStack.ecosystem)) {
        return `${title} currently supports TypeScript, Python, Go, Rust, or Java projects`;
      }
      if (
        currentStack.ecosystem === "typescript" &&
        !hasDockerComposeCompatibleFrontend(currentStack.webFrontend)
      ) {
        return `${title} currently supports Next.js, TanStack Router, React Router, React Vite, Solid, or Astro`;
      }
      if (
        currentStack.ecosystem === "typescript" &&
        currentStack.backend === "self" &&
        !currentStack.webFrontend.includes("next")
      ) {
        return `${title} self-backend support currently requires Next.js`;
      }
      if (currentStack.ecosystem === "rust" && currentStack.rustFrontend !== "none") {
        return `${title} for Rust currently supports server-only projects`;
      }
      if (currentStack.ecosystem === "java" && currentStack.javaWebFramework !== "spring-boot") {
        return `${title} for Java currently requires Spring Boot`;
      }
      if (
        currentStack.ecosystem === "python" &&
        currentStack.database !== "none" &&
        currentStack.database !== "sqlite" &&
        currentStack.database !== "postgres"
      ) {
        return `${title} for Python ORM projects currently supports SQLite defaults or Postgres`;
      }
    }
    if (optionId === "backend-utils") {
      if (currentStack.ecosystem !== "typescript") {
        return "Backend Utils requires a TypeScript server stack";
      }
      if (!isBackendUtilsCompatibleBackend(currentStack.backend)) {
        return "Backend Utils requires a Hono, Express, Fastify, Elysia, feTS, or NestJS backend";
      }
    }
    if (optionId === "tanstack-query" && currentStack.api !== "none") {
      return "TanStack Query is already included via your API layer";
    }
    // TanStack addons with Astro require a UI framework integration
    const tanstackAddons = [
      "tanstack-query",
      "tanstack-table",
      "tanstack-virtual",
      "tanstack-db",
      "tanstack-pacer",
    ];
    if (
      tanstackAddons.includes(optionId) &&
      currentStack.webFrontend.length === 1 &&
      currentStack.webFrontend[0] === "astro" &&
      (!currentStack.astroIntegration || currentStack.astroIntegration === "none")
    ) {
      return "TanStack libraries with Astro require a UI framework integration (React, Vue, Svelte, or Solid)";
    }
  }

  // ============================================
  // EXAMPLES CONSTRAINTS
  // ============================================
  if (category === "examples") {
    if (optionId === "ai") {
      if (
        currentStack.webFrontend.includes("solid") ||
        currentStack.webFrontend.includes("solid-start")
      ) {
        return "AI example not compatible with Solid frontend";
      }
      if (currentStack.backend === "convex") {
        const hasIncompatibleFrontend = currentStack.webFrontend.some((f) =>
          ["svelte", "nuxt"].includes(f),
        );
        if (hasIncompatibleFrontend) {
          const frontendName = currentStack.webFrontend.find((f) => ["svelte", "nuxt"].includes(f));
          return `Convex AI example only supports React-based frontends including React + Vite (not ${frontendName})`;
        }
      }
    }

    if (optionId === "chat-sdk") {
      if (currentStack.webFrontend.includes("react-vite")) {
        return "Chat SDK example is not yet supported for React + Vite projects";
      }
      if (currentStack.ecosystem !== "typescript") {
        return "Chat SDK example is currently available only for TypeScript stacks";
      }
      if (currentStack.backend === "convex") {
        return "Chat SDK example is not supported with Convex backend in v1";
      }
      if (
        currentStack.backend === "self-astro" ||
        currentStack.backend === "self-svelte" ||
        currentStack.backend === "self-solid-start"
      ) {
        return "Chat SDK self backend profile supports Next.js, TanStack Start, or Nuxt in v1";
      }
      if (
        currentStack.backend === "self-next" ||
        currentStack.backend === "self-vinext" ||
        currentStack.backend === "self-tanstack-start"
      ) {
        return null;
      }
      if (currentStack.backend === "self-nuxt") {
        return null;
      }
      if (currentStack.backend === "hono") {
        if (currentStack.runtime !== "node") {
          return "Chat SDK Hono profile requires Node runtime in v1";
        }
        return null;
      }
      if (currentStack.backend.startsWith("self-")) {
        return "Chat SDK self backend profile supports Next.js, TanStack Start, or Nuxt in v1";
      }
      if (currentStack.backend !== "none") {
        return "Chat SDK example is only supported for self (Next/TanStack Start/Nuxt) or Hono+Node in v1";
      }
    }
  }

  // ============================================
  // FRESH FRONTEND CONSTRAINTS
  // Fresh is Preact-based and incompatible with React-specific packages
  // ============================================
  const isFresh = currentStack.webFrontend.includes("fresh");

  // Forms: TanStack Form has no Preact adapter
  if (category === "forms" && optionId === "tanstack-form" && isFresh) {
    return "TanStack Form has no Preact adapter (Fresh uses Preact)";
  }

  // State Management: These all require React bindings
  if (category === "stateManagement" && isFresh) {
    if (optionId === "nanostores") {
      return "Nanostores requires @nanostores/react (no Preact support)";
    }
    if (optionId === "xstate") {
      return "XState requires @xstate/react (no Preact support)";
    }
    if (optionId === "tanstack-store") {
      return "TanStack Store requires @tanstack/react-store (no Preact support)";
    }
  }

  // Animation: Lottie uses lottie-react which requires React
  if (category === "animation" && optionId === "lottie" && isFresh) {
    return "Lottie uses lottie-react which requires React (not Preact)";
  }

  // ============================================
  // CSS FRAMEWORK CONSTRAINTS
  // ============================================
  if (category === "cssFramework") {
    // CSS frameworks only apply to web frontends
    if (!currentStack.webFrontend.some((f) => f !== "none")) {
      if (optionId !== "none") {
        return "CSS framework requires a web frontend";
      }
    }
    // Some UI libraries require Tailwind
    const requiresTailwind = ["shadcn-ui", "shadcn-svelte", "daisyui", "nextui"].includes(currentStack.uiLibrary);
    if (requiresTailwind && optionId !== "tailwind") {
      const libraryName =
        currentStack.uiLibrary === "shadcn-ui"
          ? "shadcn/ui"
          : currentStack.uiLibrary === "shadcn-svelte"
            ? "shadcn-svelte"
            : currentStack.uiLibrary === "daisyui"
              ? "daisyUI"
              : "NextUI";
      return `${libraryName} requires Tailwind CSS`;
    }
  }

  const mobileCategories = new Set([
    "mobileNavigation",
    "mobileUI",
    "mobileStorage",
    "mobileTesting",
    "mobilePush",
    "mobileOTA",
    "mobileDeepLinking",
  ]);

  if (mobileCategories.has(category)) {
    const hasNativeFrontend = currentStack.nativeFrontend.some((f) => f !== "none");
    if (!hasNativeFrontend && optionId !== "none") {
      return `${getCategoryDisplayName(category)} requires a native Expo frontend`;
    }

    if (category === "mobileNavigation" && optionId === "react-navigation") {
      return null;
    }

    if (category === "mobileUI") {
      if (optionId === "uniwind" && !currentStack.nativeFrontend.includes("native-uniwind")) {
        return "Uniwind mobile UI requires Expo + Uniwind frontend";
      }
      if (optionId === "unistyles" && !currentStack.nativeFrontend.includes("native-unistyles")) {
        return "Unistyles mobile UI requires Expo + Unistyles frontend";
      }
      if (
        ["tamagui", "gluestack-ui"].includes(optionId) &&
        currentStack.nativeFrontend.some((f) => ["native-uniwind", "native-unistyles"].includes(f))
      ) {
        return "Tamagui and Gluestack UI require Expo + StyleSheet to avoid conflicting styling setup";
      }
    }

    if (
      (category === "mobilePush" && optionId === "expo-notifications") ||
      (category === "mobileOTA" && optionId === "expo-updates") ||
      (category === "mobileDeepLinking" && optionId === "expo-linking")
    ) {
      return null;
    }
  }

  // ============================================
  // UI LIBRARY CONSTRAINTS
  // ============================================
  if (category === "uiLibrary") {
    // UI libraries only apply to web frontends
    if (!currentStack.webFrontend.some((f) => f !== "none")) {
      if (optionId !== "none") {
        return "UI library requires a web frontend";
      }
    }

    // React-only UI libraries
    const reactOnlyLibraries = ["shadcn-ui", "radix-ui", "chakra-ui", "nextui", "mui", "antd"];
    const reactFrontends = [
      "tanstack-router",
      "react-router",
      "react-vite",
      "tanstack-start",
      "next",
    ];

    if (reactOnlyLibraries.includes(optionId)) {
      const hasReactFrontend = currentStack.webFrontend.some((f) => reactFrontends.includes(f));
      // Astro with React integration also works
      const hasAstroReact =
        currentStack.webFrontend.includes("astro") && currentStack.astroIntegration === "react";
      if (!hasReactFrontend && !hasAstroReact) {
        const libraryName =
          optionId === "shadcn-ui"
            ? "shadcn/ui"
            : optionId === "radix-ui"
              ? "Radix UI"
              : optionId === "chakra-ui"
                ? "Chakra UI"
                : optionId === "mui"
                  ? "MUI"
                  : optionId === "antd"
                    ? "Ant Design"
                    : "NextUI";
        return `${libraryName} requires a React-based frontend`;
      }
    }

    if (optionId === "shadcn-svelte") {
      const hasSvelteFrontend = currentStack.webFrontend.includes("svelte");
      const hasAstroSvelte =
        currentStack.webFrontend.includes("astro") &&
        currentStack.astroIntegration === "svelte";
      if (!hasSvelteFrontend && !hasAstroSvelte) {
        return "shadcn-svelte requires SvelteKit or Astro with Svelte integration";
      }
    }

    // Headless UI works with React and Vue
    if (optionId === "headless-ui") {
      const hasReactFrontend = currentStack.webFrontend.some((f) => reactFrontends.includes(f));
      const hasVueFrontend = currentStack.webFrontend.includes("nuxt");
      const hasAstroReactOrVue =
        currentStack.webFrontend.includes("astro") &&
        ["react", "vue"].includes(currentStack.astroIntegration);
      if (!hasReactFrontend && !hasVueFrontend && !hasAstroReactOrVue) {
        return "Headless UI requires React or Vue frontend";
      }
    }

    // Park UI works with React, Vue, and Solid
    if (optionId === "park-ui") {
      const hasReactFrontend = currentStack.webFrontend.some((f) => reactFrontends.includes(f));
      const hasVueFrontend = currentStack.webFrontend.includes("nuxt");
      const hasSolidFrontend =
        currentStack.webFrontend.includes("solid") ||
        currentStack.webFrontend.includes("solid-start");
      const hasAstroCompatible =
        currentStack.webFrontend.includes("astro") &&
        ["react", "vue", "solid"].includes(currentStack.astroIntegration);
      if (!hasReactFrontend && !hasVueFrontend && !hasSolidFrontend && !hasAstroCompatible) {
        return "Park UI requires React, Vue, or Solid frontend";
      }
      // Park UI requires a CSS framework (not "none")
      if (currentStack.cssFramework === "none") {
        return "Park UI requires a CSS framework";
      }
    }

    // UI libraries requiring Tailwind
    if (["shadcn-ui", "shadcn-svelte", "daisyui", "nextui"].includes(optionId)) {
      if (currentStack.cssFramework !== "tailwind") {
        const libraryName =
          optionId === "shadcn-ui"
            ? "shadcn/ui"
            : optionId === "shadcn-svelte"
              ? "shadcn-svelte"
              : optionId === "daisyui"
                ? "daisyUI"
                : "NextUI";
        return `${libraryName} requires Tailwind CSS`;
      }
    }
  }

  // ============================================
  // DEPLOYMENT CONSTRAINTS
  // ============================================
  if (category === "webDeploy" && optionId !== "none") {
    if (!currentStack.webFrontend.some((f) => f !== "none")) {
      return "Web deployment requires a web frontend";
    }
    if (optionId === "vercel") {
      // These frontends don't have Vercel templates
      if (currentStack.webFrontend.some((f) => ["redwood", "fresh"].includes(f))) {
        return "Vercel deployment is not available for Redwood/Fresh (they have their own deploy systems)";
      }
    }
    if (optionId === "render" || optionId === "netlify") {
      const blocked = getUnsupportedWebDeployFrontend(optionId, currentStack.webFrontend);
      if (blocked) {
        const deployName = optionId === "render" ? "Render" : "Netlify";
        return `${deployName} deployment is not yet wired up for the '${blocked}' frontend`;
      }
    }
  }

  if (category === "serverDeploy") {
    if (optionId === "cloudflare") {
      if (currentStack.runtime !== "workers") {
        return "In Better-Fullstack, Cloudflare server deploy currently requires Workers runtime";
      }
      if (currentStack.backend !== "hono") {
        return "In Better-Fullstack, Cloudflare server deploy is currently supported only with Hono";
      }
    }
    if (optionId === "vercel") {
      // Vercel serverless can't host persistent-process backends
      if (["nestjs", "adonisjs"].includes(currentStack.backend)) {
        return "Vercel serverless functions are incompatible with persistent-process backends like NestJS/AdonisJS. Use Fly.io or Railway instead.";
      }
      // Encore has its own deployment
      if (currentStack.backend === "encore") {
        return "Encore manages its own deployment infrastructure";
      }
    }
    if (optionId === "netlify") {
      if (currentStack.backend !== "hono") {
        return "Netlify Functions server deploy is currently supported only with Hono";
      }
      if (currentStack.runtime !== "node") {
        return "Netlify Functions server deploy requires Node.js runtime";
      }
    }
    if (optionId !== "none") {
      const noServerDeploy = [
        "none",
        "convex",
        "self-next",
        "self-tanstack-start",
        "self-astro",
        "self-nuxt",
        "self-svelte",
        "self-solid-start",
      ];
      if (noServerDeploy.includes(currentStack.backend)) {
        return "Server deployment not needed for this backend";
      }
    }
    if (optionId === "none" && currentStack.runtime === "workers") {
      return "Workers requires server deployment";
    }
  }

  // ============================================
  // I18N RULES
  // ============================================
  if (category === "i18n") {
    if (optionId !== "none" && !currentStack.webFrontend.some((f) => f !== "none")) {
      return "i18n requires a web frontend";
    }

    if (optionId === "paraglide") {
      const unsupportedFrontend = currentStack.webFrontend.find(
        (frontend) =>
          frontend !== "none" && !PARAGLIDE_COMPATIBLE_FRONTENDS.has(frontend as Frontend),
      );

      if (unsupportedFrontend) {
        return `Paraglide is not yet wired for the '${unsupportedFrontend}' frontend`;
      }
    }

    if (optionId === "next-intl") {
      if (!currentStack.webFrontend.includes("next")) {
        return "next-intl requires Next.js";
      }
    }
  }

  // ============================================
  // PYTHON ECOSYSTEM RULES
  // ============================================
  if (category === "pythonApi") {
    if (optionId !== "none" && currentStack.pythonWebFramework !== "django") {
      return "Python API frameworks currently require Django";
    }
  }

  // ============================================
  // JAVA ECOSYSTEM RULES
  // ============================================
  if (category === "javaWebFramework") {
    if (optionId !== "none" && currentStack.javaBuildTool === "none") {
      return "Java web frameworks require Maven or Gradle";
    }
  }

  if (category === "javaBuildTool") {
    if (optionId === "none") {
      if (currentStack.javaWebFramework !== "none") {
        return "Java web frameworks require Maven or Gradle";
      }
      if (currentStack.javaOrm !== "none") {
        return "Java ORM support requires Maven or Gradle";
      }
      if (currentStack.javaAuth !== "none") {
        return "Java auth support requires Maven or Gradle";
      }
      if (currentStack.javaLibraries.some((library) => library !== "none")) {
        return "Java libraries require Maven or Gradle";
      }
      if (currentStack.javaTestingLibraries.some((library) => library !== "none")) {
        return "Java testing libraries require Maven or Gradle";
      }
    }
  }

  if (category === "javaOrm") {
    if (optionId !== "none" && currentStack.javaWebFramework !== "spring-boot") {
      return "Java ORM support currently requires Spring Boot";
    }
    if (optionId !== "none" && currentStack.javaBuildTool === "none") {
      return "Java ORM support requires Maven or Gradle";
    }
  }

  if (category === "javaAuth") {
    if (optionId !== "none" && currentStack.javaWebFramework !== "spring-boot") {
      return "Java auth support currently requires Spring Boot";
    }
    if (optionId !== "none" && currentStack.javaBuildTool === "none") {
      return "Java auth support requires Maven or Gradle";
    }
  }

  if (category === "javaLibraries") {
    if (optionId !== "none" && currentStack.javaWebFramework !== "spring-boot") {
      return "Spring libraries currently require Spring Boot in the Java scaffold";
    }
    if (optionId !== "none" && currentStack.javaBuildTool === "none") {
      return "Java libraries require Maven or Gradle";
    }
    if (optionId === "flyway" && currentStack.javaOrm !== "spring-data-jpa") {
      return "Flyway currently requires Spring Data JPA in the Java scaffold";
    }
    if (optionId === "liquibase" && currentStack.javaOrm !== "spring-data-jpa") {
      return "Liquibase currently requires Spring Data JPA in the Java scaffold";
    }
    if (optionId === "flyway" && currentStack.javaLibraries.includes("liquibase")) {
      return "Flyway cannot be combined with Liquibase in the current Java scaffold";
    }
    if (optionId === "liquibase" && currentStack.javaLibraries.includes("flyway")) {
      return "Liquibase cannot be combined with Flyway in the current Java scaffold";
    }
  }

  if (category === "javaTestingLibraries") {
    if (optionId !== "none" && currentStack.javaBuildTool === "none") {
      return "Java testing libraries require Maven or Gradle";
    }
  }

  // ============================================
  // ELIXIR ECOSYSTEM RULES
  // ============================================
  const elixirCategories = new Set<CompatibilityCategory>([
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
  ]);

  if (elixirCategories.has(category) && optionId !== "none") {
    if (currentStack.ecosystem !== "elixir") {
      return "Elixir options only apply when the Elixir ecosystem is selected";
    }
  }

  if (
    category === "elixirTesting" &&
    optionId === "wallaby" &&
    currentStack.ecosystem === "elixir" &&
    currentStack.elixirWebFramework === "none"
  ) {
    return "Wallaby browser tests require Phoenix";
  }

  if (
    category === "elixirWebFramework" &&
    optionId !== "none" &&
    currentStack.ecosystem !== "elixir"
  ) {
    return "Elixir web frameworks are available only in the Elixir ecosystem";
  }

  if (
    category === "elixirJson" &&
    optionId === "none" &&
    currentStack.ecosystem === "elixir" &&
    currentStack.elixirWebFramework !== "none"
  ) {
    return "Phoenix JSON scaffolds require Jason";
  }

  return null;
};

export const isOptionCompatible = (
  currentStack: CompatibilityInput,
  category: CompatibilityCategory,
  optionId: string,
): boolean => {
  if (currentStack.yolo === "true") {
    return true;
  }
  return getDisabledReason(currentStack, category, optionId) === null;
};

type GraphDisabledReasonOwnerRole = "frontend" | "backend" | "mobile" | "database";

type GraphDisabledReasonBinding = {
  role: StackPartRole;
  ecosystem: StackPartEcosystem;
  ownerRole: GraphDisabledReasonOwnerRole;
  ownerEcosystem?: StackPartEcosystem;
  currentEcosystem?: StackPartEcosystem;
  allowNoneCandidate?: boolean;
  allowOwnerlessCandidate?: boolean;
  candidateIdPrefix?: string;
  missingOwnerReason?: string;
};

const SHARED_BACKEND_SERVICE_CATEGORIES = new Set<CompatibilityCategory>([
  "email",
  "observability",
  "caching",
  "rateLimit",
  "search",
]);

function getSharedBackendServiceGraphBinding(
  currentStack: CompatibilityInput,
  category: CompatibilityCategory,
): GraphDisabledReasonBinding | undefined {
  if (!SHARED_BACKEND_SERVICE_CATEGORIES.has(category)) return undefined;
  if (currentStack.ecosystem === "react-native") return undefined;

  return {
    role: category as StackPartRole,
    ecosystem: currentStack.ecosystem,
    ownerRole: "backend",
    ownerEcosystem: currentStack.ecosystem,
  };
}

const ELIXIR_GRAPH_DISABLED_REASON_ROLES: Partial<Record<CompatibilityCategory, StackPartRole>> = {
  elixirOrm: "orm",
  elixirAuth: "auth",
  elixirApi: "api",
  elixirRealtime: "realtime",
  elixirJobs: "jobQueue",
  elixirValidation: "validation",
  elixirHttp: "httpClient",
  elixirEmail: "email",
  elixirCaching: "caching",
  elixirObservability: "observability",
  elixirTesting: "testing",
  elixirQuality: "codeQuality",
  elixirDeploy: "deploy",
};

function getElixirGraphBinding(
  currentStack: CompatibilityInput,
  category: CompatibilityCategory,
): GraphDisabledReasonBinding | undefined {
  const role = ELIXIR_GRAPH_DISABLED_REASON_ROLES[category];
  if (!role || currentStack.ecosystem !== "elixir") return undefined;

  return {
    role,
    ecosystem: "elixir",
    ownerRole: "backend",
    ownerEcosystem: "elixir",
    currentEcosystem: "elixir",
    allowOwnerlessCandidate: true,
    candidateIdPrefix: "candidate:native",
  };
}

const GRAPH_DISABLED_REASON_BINDINGS: Partial<
  Record<CompatibilityCategory, GraphDisabledReasonBinding>
> = {
  cssFramework: {
    role: "css",
    ecosystem: "typescript",
    ownerRole: "frontend",
    ownerEcosystem: "typescript",
    missingOwnerReason: "CSS framework requires a web frontend",
  },
  uiLibrary: {
    role: "ui",
    ecosystem: "typescript",
    ownerRole: "frontend",
    ownerEcosystem: "typescript",
    missingOwnerReason: "UI library requires a web frontend",
  },
  forms: {
    role: "forms",
    ecosystem: "typescript",
    ownerRole: "frontend",
    ownerEcosystem: "typescript",
    missingOwnerReason: "Forms requires a web frontend",
  },
  stateManagement: {
    role: "stateManagement",
    ecosystem: "typescript",
    ownerRole: "frontend",
    ownerEcosystem: "typescript",
    missingOwnerReason: "State management requires a web frontend",
  },
  animation: {
    role: "animation",
    ecosystem: "typescript",
    ownerRole: "frontend",
    ownerEcosystem: "typescript",
    missingOwnerReason: "Animation requires a web frontend",
  },
  fileUpload: {
    role: "fileUpload",
    ecosystem: "typescript",
    ownerRole: "frontend",
    ownerEcosystem: "typescript",
    missingOwnerReason: "File upload requires a web frontend",
  },
  i18n: {
    role: "i18n",
    ecosystem: "typescript",
    ownerRole: "frontend",
    ownerEcosystem: "typescript",
    missingOwnerReason: "i18n requires a web frontend",
  },
  analytics: {
    role: "analytics",
    ecosystem: "typescript",
    ownerRole: "frontend",
    ownerEcosystem: "typescript",
    missingOwnerReason: "Analytics requires a web frontend",
  },
  payments: {
    role: "payments",
    ecosystem: "typescript",
    ownerRole: "backend",
    ownerEcosystem: "typescript",
    missingOwnerReason: "Payments requires a backend",
  },
  cms: {
    role: "cms",
    ecosystem: "typescript",
    ownerRole: "backend",
    ownerEcosystem: "typescript",
    missingOwnerReason: "CMS requires a backend",
  },
  ai: {
    role: "ai",
    ecosystem: "typescript",
    ownerRole: "backend",
    ownerEcosystem: "typescript",
  },
  mobileNavigation: {
    role: "navigation",
    ecosystem: "react-native",
    ownerRole: "mobile",
    ownerEcosystem: "react-native",
    missingOwnerReason: "Mobile navigation requires a native Expo frontend",
  },
  mobileUI: {
    role: "ui",
    ecosystem: "react-native",
    ownerRole: "mobile",
    ownerEcosystem: "react-native",
    missingOwnerReason: "Mobile UI requires a native Expo frontend",
  },
  mobileStorage: {
    role: "storage",
    ecosystem: "react-native",
    ownerRole: "mobile",
    ownerEcosystem: "react-native",
    missingOwnerReason: "Mobile storage requires a native Expo frontend",
  },
  mobileTesting: {
    role: "testing",
    ecosystem: "react-native",
    ownerRole: "mobile",
    ownerEcosystem: "react-native",
    missingOwnerReason: "Mobile testing requires a native Expo frontend",
  },
  javaBuildTool: {
    role: "buildTool",
    ecosystem: "java",
    ownerRole: "backend",
    ownerEcosystem: "java",
    currentEcosystem: "java",
    allowNoneCandidate: true,
  },
  javaOrm: {
    role: "orm",
    ecosystem: "java",
    ownerRole: "backend",
    ownerEcosystem: "java",
    currentEcosystem: "java",
    missingOwnerReason: "Java ORM support currently requires Spring Boot",
  },
  javaAuth: {
    role: "auth",
    ecosystem: "java",
    ownerRole: "backend",
    ownerEcosystem: "java",
    currentEcosystem: "java",
    missingOwnerReason: "Java auth support currently requires Spring Boot",
  },
  javaLibraries: {
    role: "libraries",
    ecosystem: "java",
    ownerRole: "backend",
    ownerEcosystem: "java",
    currentEcosystem: "java",
    missingOwnerReason: "Spring libraries currently require Spring Boot in the Java scaffold",
  },
  javaTestingLibraries: {
    role: "testing",
    ecosystem: "java",
    ownerRole: "backend",
    ownerEcosystem: "java",
    currentEcosystem: "java",
  },
  rustRealtime: {
    role: "realtime",
    ecosystem: "rust",
    ownerRole: "backend",
    ownerEcosystem: "rust",
    currentEcosystem: "rust",
  },
  rustMessageQueue: {
    role: "jobQueue",
    ecosystem: "rust",
    ownerRole: "backend",
    ownerEcosystem: "rust",
    currentEcosystem: "rust",
  },
  rustObservability: {
    role: "observability",
    ecosystem: "rust",
    ownerRole: "backend",
    ownerEcosystem: "rust",
    currentEcosystem: "rust",
    candidateIdPrefix: "candidate:native",
  },
  rustTemplating: {
    role: "templating",
    ecosystem: "rust",
    ownerRole: "backend",
    ownerEcosystem: "rust",
    currentEcosystem: "rust",
  },
  pythonTesting: {
    role: "testing",
    ecosystem: "python",
    ownerRole: "backend",
    ownerEcosystem: "python",
    currentEcosystem: "python",
  },
  pythonCaching: {
    role: "caching",
    ecosystem: "python",
    ownerRole: "backend",
    ownerEcosystem: "python",
    currentEcosystem: "python",
    candidateIdPrefix: "candidate:native",
  },
  pythonRealtime: {
    role: "realtime",
    ecosystem: "python",
    ownerRole: "backend",
    ownerEcosystem: "python",
    currentEcosystem: "python",
  },
  pythonObservability: {
    role: "observability",
    ecosystem: "python",
    ownerRole: "backend",
    ownerEcosystem: "python",
    currentEcosystem: "python",
    candidateIdPrefix: "candidate:native",
  },
  pythonCli: {
    role: "cli",
    ecosystem: "python",
    ownerRole: "backend",
    ownerEcosystem: "python",
    currentEcosystem: "python",
  },
  goTesting: {
    role: "testing",
    ecosystem: "go",
    ownerRole: "backend",
    ownerEcosystem: "go",
    currentEcosystem: "go",
  },
  goRealtime: {
    role: "realtime",
    ecosystem: "go",
    ownerRole: "backend",
    ownerEcosystem: "go",
    currentEcosystem: "go",
  },
  goMessageQueue: {
    role: "jobQueue",
    ecosystem: "go",
    ownerRole: "backend",
    ownerEcosystem: "go",
    currentEcosystem: "go",
  },
  goCaching: {
    role: "caching",
    ecosystem: "go",
    ownerRole: "backend",
    ownerEcosystem: "go",
    currentEcosystem: "go",
    candidateIdPrefix: "candidate:native",
  },
  goConfig: {
    role: "config",
    ecosystem: "go",
    ownerRole: "backend",
    ownerEcosystem: "go",
    currentEcosystem: "go",
  },
  goObservability: {
    role: "observability",
    ecosystem: "go",
    ownerRole: "backend",
    ownerEcosystem: "go",
    currentEcosystem: "go",
    candidateIdPrefix: "candidate:native",
  },
  dotnetOrm: {
    role: "orm",
    ecosystem: "dotnet",
    ownerRole: "backend",
    ownerEcosystem: "dotnet",
    currentEcosystem: "dotnet",
    missingOwnerReason: ".NET data access requires an ASP.NET backend",
  },
  dotnetAuth: {
    role: "auth",
    ecosystem: "dotnet",
    ownerRole: "backend",
    ownerEcosystem: "dotnet",
    currentEcosystem: "dotnet",
    missingOwnerReason: ".NET auth requires an ASP.NET backend",
  },
  dotnetApi: {
    role: "api",
    ecosystem: "dotnet",
    ownerRole: "backend",
    ownerEcosystem: "dotnet",
    currentEcosystem: "dotnet",
  },
  dotnetTesting: {
    role: "testing",
    ecosystem: "dotnet",
    ownerRole: "backend",
    ownerEcosystem: "dotnet",
    currentEcosystem: "dotnet",
  },
  dotnetJobQueue: {
    role: "jobQueue",
    ecosystem: "dotnet",
    ownerRole: "backend",
    ownerEcosystem: "dotnet",
    currentEcosystem: "dotnet",
  },
  dotnetRealtime: {
    role: "realtime",
    ecosystem: "dotnet",
    ownerRole: "backend",
    ownerEcosystem: "dotnet",
    currentEcosystem: "dotnet",
  },
  dotnetObservability: {
    role: "observability",
    ecosystem: "dotnet",
    ownerRole: "backend",
    ownerEcosystem: "dotnet",
    currentEcosystem: "dotnet",
    candidateIdPrefix: "candidate:native",
  },
  dotnetCaching: {
    role: "caching",
    ecosystem: "dotnet",
    ownerRole: "backend",
    ownerEcosystem: "dotnet",
    currentEcosystem: "dotnet",
    candidateIdPrefix: "candidate:native",
  },
  dotnetDeploy: {
    role: "deploy",
    ecosystem: "dotnet",
    ownerRole: "backend",
    ownerEcosystem: "dotnet",
    currentEcosystem: "dotnet",
  },
};

function compatibilityInputToGraphProjectConfig(
  currentStack: CompatibilityInput,
): Partial<ProjectConfig> {
  const frontend = [
    ...currentStack.webFrontend.filter((frontend) => frontend !== "none"),
    ...currentStack.nativeFrontend.filter((frontend) => frontend !== "none"),
  ];

  return {
    ...currentStack,
    frontend: (frontend.length > 0 ? frontend : ["none"]) as ProjectConfig["frontend"],
    addons: [
      ...currentStack.codeQuality,
      ...currentStack.documentation,
      ...currentStack.appPlatforms,
    ] as ProjectConfig["addons"],
    ai: currentStack.aiSdk as ProjectConfig["ai"],
  } as unknown as Partial<ProjectConfig>;
}

function getGraphDisabledReason(
  currentStack: CompatibilityInput,
  category: CompatibilityCategory,
  optionId: string,
): string | null {
  if (optionId === "false") return null;

  const binding =
    getSharedBackendServiceGraphBinding(currentStack, category) ??
    getElixirGraphBinding(currentStack, category) ??
    GRAPH_DISABLED_REASON_BINDINGS[category];
  if (!binding) return null;
  if (binding.currentEcosystem && currentStack.ecosystem !== binding.currentEcosystem) return null;
  if (optionId === "none" && category !== "cssFramework" && !binding.allowNoneCandidate) {
    return null;
  }

  let parts;
  try {
    parts = legacyProjectConfigToStackParts(compatibilityInputToGraphProjectConfig(currentStack));
  } catch {
    return null;
  }

  const owner = parts.find(
    (part) =>
      part.role === binding.ownerRole &&
      !part.ownerPartId &&
      (!binding.ownerEcosystem || part.ecosystem === binding.ownerEcosystem),
  );
  if (!owner && optionId === "none") return null;
  if (!owner && !binding.allowOwnerlessCandidate) return binding.missingOwnerReason ?? null;

  const issue = getStackPartCompatibilityIssueForPart(
    {
      id: `${binding.candidateIdPrefix ?? "candidate"}:${binding.ownerRole}.${binding.role}:${binding.ecosystem}:${optionId}`,
      role: binding.role,
      toolId: optionId,
      ecosystem: binding.ecosystem,
      ownerPartId: owner?.id,
    },
    parts,
  );

  return issue?.message ?? (!owner ? (binding.missingOwnerReason ?? null) : null);
}

const WEB_FRAMEWORKS: readonly Frontend[] = [
  "tanstack-router",
  "react-router",
  "react-vite",
  "tanstack-start",
  "next",
  "vinext",
  "nuxt",
  "svelte",
  "solid",
  "solid-start",
  "astro",
  "qwik",
  "angular",
  "redwood",
  "fresh",
  "none",
] as const;

const ADDON_COMPATIBILITY: Record<Addons, readonly Frontend[]> = {
  pwa: [
    "tanstack-router",
    "react-router",
    "react-vite",
    "solid",
    "next",
    "vinext",
    "astro",
    "qwik",
    "angular",
    "redwood",
    "fresh",
  ],
  tauri: [
    "tanstack-router",
    "react-router",
    "react-vite",
    "nuxt",
    "svelte",
    "solid",
    "next",
    "astro",
    "qwik",
    "angular",
    "redwood",
    "fresh",
  ],
  biome: [],
  husky: [],
  lefthook: [],
  turborepo: [],
  nx: [],
  starlight: [],
  ultracite: [],
  ruler: [],
  mcp: [],
  skills: [],
  oxlint: [],
  fumadocs: [],
  opentui: [],
  wxt: [],
  msw: [],
  storybook: ["tanstack-router", "react-router", "react-vite", "next", "nuxt", "svelte", "solid"],
  swr: ["tanstack-router", "react-router", "react-vite", "tanstack-start", "next", "vinext", "astro", "redwood"],
  "tanstack-query": [
    "tanstack-router",
    "react-router",
    "react-vite",
    "tanstack-start",
    "next",
    "nuxt",
    "svelte",
    "solid",
    "solid-start",
    "angular",
    "astro",
    "redwood",
  ],
  "tanstack-table": [
    "tanstack-router",
    "react-router",
    "react-vite",
    "tanstack-start",
    "next",
    "nuxt",
    "svelte",
    "solid",
    "solid-start",
    "angular",
    "astro",
    "redwood",
  ],
  "tanstack-virtual": [
    "tanstack-router",
    "react-router",
    "react-vite",
    "tanstack-start",
    "next",
    "nuxt",
    "svelte",
    "solid",
    "solid-start",
    "angular",
    "astro",
    "redwood",
  ],
  "tanstack-db": [
    "tanstack-router",
    "react-router",
    "react-vite",
    "tanstack-start",
    "next",
    "nuxt",
    "svelte",
    "solid",
    "solid-start",
    "astro",
    "redwood",
  ],
  "tanstack-pacer": [
    "tanstack-router",
    "react-router",
    "react-vite",
    "tanstack-start",
    "next",
    "nuxt",
    "svelte",
    "solid",
    "solid-start",
    "angular",
    "astro",
    "redwood",
  ],
  "backend-utils": [],
  "docker-compose": [],
  devcontainer: [],
  "github-actions": [],
  none: [],
};

export function isWebFrontend(value: Frontend) {
  return WEB_FRAMEWORKS.includes(value);
}

export function splitFrontends(values: Frontend[] = []): {
  web: Frontend[];
  native: Frontend[];
} {
  const web = values.filter((f) => isWebFrontend(f));
  const native = values.filter(
    (f) => f === "native-bare" || f === "native-uniwind" || f === "native-unistyles",
  );
  return { web, native };
}

export function allowedApisForFrontends(
  frontends: Frontend[] = [],
  astroIntegration?: AstroIntegration,
) {
  const includesNuxt = frontends.includes("nuxt");
  const includesSvelte = frontends.includes("svelte");
  const includesSolid = frontends.includes("solid");
  const includesAstro = frontends.includes("astro");
  const includesQwik = frontends.includes("qwik");
  const includesAngular = frontends.includes("angular");
  const includesRedwood = frontends.includes("redwood");
  const includesFresh = frontends.includes("fresh");
  const includesNative = frontends.some((frontend) =>
    ["native-bare", "native-uniwind", "native-unistyles"].includes(frontend),
  );
  const base: API[] = [
    "trpc",
    "orpc",
    "ts-rest",
    "garph",
    "graphql-yoga",
    "apollo-server",
    "openapi",
    "none",
  ];

  if (includesNative) {
    return ["trpc", "orpc", "ts-rest", "garph", "none"] as API[];
  }

  if (includesQwik || includesAngular || includesRedwood || includesFresh) {
    return ["graphql-yoga", "none"] as API[];
  }

  const includesSolidStartApi = frontends.includes("solid-start");
  if (includesNuxt || includesSvelte || includesSolid || includesSolidStartApi) {
    return ["orpc", "graphql-yoga", "openapi", "none"] as API[];
  }

  if (includesAstro && astroIntegration !== "react") {
    return ["orpc", "graphql-yoga", "openapi", "none"] as API[];
  }

  return base;
}

function getReactOnlyApiDisplayName(api: API) {
  if (api === "trpc") return "tRPC";
  if (api === "ts-rest") return "ts-rest";
  if (api === "openapi") return "OpenAPI";
  if (api === "apollo-server") return "Apollo Server";
  return "garph";
}

export function getApiFrontendCompatibilityIssue(
  api: API | undefined,
  frontends: Frontend[] = [],
  astroIntegration?: AstroIntegration,
): CompatibilityIssue | undefined {
  if (!api || api === "none") return undefined;

  const includesNuxt = frontends.includes("nuxt");
  const includesSvelte = frontends.includes("svelte");
  const includesSolid = frontends.includes("solid");
  const includesAstro = frontends.includes("astro");
  const includesQwik = frontends.includes("qwik");
  const includesAngular = frontends.includes("angular");
  const includesRedwood = frontends.includes("redwood");
  const includesFresh = frontends.includes("fresh");
  const includesSolidStart = frontends.includes("solid-start");
  const isReactOnlyApi =
    api === "trpc" || api === "ts-rest" || api === "garph" || api === "apollo-server";

  if ((includesNuxt || includesSvelte || includesSolid || includesSolidStart) && isReactOnlyApi) {
    const incompatibleFrontend = includesNuxt
      ? "nuxt"
      : includesSvelte
        ? "svelte"
        : includesSolid
          ? "solid"
          : "solid-start";

    return {
      code: "API_REQUIRES_REACT_FRONTEND",
      message: `${getReactOnlyApiDisplayName(api)} API requires React-based frontends.`,
      category: "api",
      optionId: api,
      provided: { api, frontend: incompatibleFrontend },
      suggestions: [
        "Use --api orpc (works with all frontends)",
        "Use --api none",
        "Choose next, react-router, react-vite, or tanstack-start",
      ],
    };
  }

  if (includesQwik) {
    return {
      code: "QWIK_REJECTS_EXTERNAL_API",
      message: "Qwik has built-in server capabilities and doesn't support external APIs.",
      category: "api",
      optionId: api,
      provided: { api, frontend: "qwik" },
      suggestions: ["Use --api none with Qwik"],
    };
  }

  if (includesAngular) {
    return {
      code: "ANGULAR_REJECTS_EXTERNAL_API",
      message: "Angular has built-in HttpClient and doesn't support external APIs.",
      category: "api",
      optionId: api,
      provided: { api, frontend: "angular" },
      suggestions: ["Use --api none with Angular"],
    };
  }

  if (includesRedwood) {
    return {
      code: "REDWOOD_REJECTS_EXTERNAL_API",
      message: "RedwoodJS has built-in GraphQL API and doesn't support external APIs.",
      category: "api",
      optionId: api,
      provided: { api, frontend: "redwood" },
      suggestions: ["Use --api none with RedwoodJS"],
    };
  }

  if (includesFresh) {
    return {
      code: "FRESH_REJECTS_EXTERNAL_API",
      message: "Fresh has built-in server capabilities and doesn't support external APIs.",
      category: "api",
      optionId: api,
      provided: { api, frontend: "fresh" },
      suggestions: ["Use --api none with Fresh"],
    };
  }

  if (includesAstro && astroIntegration !== "react" && isReactOnlyApi) {
    return {
      code: "ASTRO_API_REQUIRES_REACT_INTEGRATION",
      message: `${getReactOnlyApiDisplayName(api)} API requires React integration with Astro.`,
      category: "api",
      optionId: api,
      provided: { api, "astro-integration": astroIntegration ?? "none" },
      suggestions: [
        "Use --api orpc (works with all Astro integrations)",
        "Use --api none",
        "Use --astro-integration react",
      ],
    };
  }

  return undefined;
}

export function getAIFrontendCompatibilityIssue(
  ai: AI | undefined,
  frontends: Frontend[] = [],
): CompatibilityIssue | undefined {
  if (!ai || ai !== "tanstack-ai") return undefined;

  if (hasTanStackAICompatibleFrontend(frontends)) return undefined;

  return {
    code: "TANSTACK_AI_REQUIRES_REACT_OR_SOLID_FRONTEND",
    message:
      "TanStack AI requires React or Solid frontend (no Vue/Svelte/Angular adapter yet). " +
      "Please use a React-based frontend (Next.js, TanStack Router, React Router, etc.) or Solid.",
    category: "ai",
    optionId: ai,
    provided: { ai, frontend: frontends.length > 0 ? frontends : "none" },
    suggestions: [
      "Use a React-based frontend such as Next.js, TanStack Router, or React Router",
      "Use Solid or SolidStart",
      "Choose a different AI SDK",
    ],
  };
}

export function isFrontendAllowedWithBackend(frontend: Frontend, backend?: Backend, auth?: string) {
  if (backend === "convex" && frontend === "solid") return false;
  if (backend === "convex" && frontend === "solid-start") return false;
  if (backend === "convex" && frontend === "astro") return false;
  if (backend === "convex" && frontend === "qwik") return false;
  if (backend === "convex" && frontend === "angular") return false;
  if (backend === "convex" && frontend === "redwood") return false;
  if (backend === "convex" && frontend === "fresh") return false;

  if (frontend === "qwik" && backend && backend !== "none") return false;
  if (frontend === "angular" && backend === "self") {
    return false;
  }
  if (frontend === "redwood" && backend && backend !== "none") return false;
  if (frontend === "fresh" && backend && backend !== "none") return false;

  if (auth && auth !== "none") {
    return (
      getCapabilityDisabledReason(
        "auth",
        {
          ecosystem: "typescript",
          backend,
          webFrontend: [frontend],
        },
        auth as Auth,
      ) === null
    );
  }

  return true;
}

export function requiresChatSdkVercelAIForSelection(
  backend?: Backend | string,
  frontends: Frontend[] = [],
  runtime?: Runtime | string,
) {
  if (backend === "self" && frontends.includes("nuxt")) return true;
  if (backend === "self-nuxt") return true;
  if (backend === "hono" && runtime === "node") return true;
  return false;
}

export function validateAddonCompatibility(
  addon: Addons,
  frontend: Frontend[],
  _auth?: Auth,
): { isCompatible: boolean; reason?: string } {
  const compatibleFrontends = ADDON_COMPATIBILITY[addon];

  if (compatibleFrontends.length > 0) {
    const hasCompatibleFrontend = frontend.some((f) =>
      (compatibleFrontends as readonly string[]).includes(f),
    );

    if (!hasCompatibleFrontend) {
      const frontendList = compatibleFrontends.join(", ");
      return {
        isCompatible: false,
        reason: `${addon} addon requires one of these frontends: ${frontendList}`,
      };
    }
  }

  return { isCompatible: true };
}

export function getCompatibleAddons(
  allAddons: Addons[],
  frontend: Frontend[],
  existingAddons: Addons[] = [],
  auth?: Auth,
) {
  return allAddons.filter((addon) => {
    if (existingAddons.includes(addon)) return false;
    if (addon === "none") return false;
    const { isCompatible } = validateAddonCompatibility(addon, frontend, auth);
    return isCompatible;
  });
}

export function getCompatibleUILibraries(
  frontends: Frontend[] = [],
  astroIntegration?: AstroIntegration,
): UILibrary[] {
  const { web } = splitFrontends(frontends);
  if (web.length === 0) return ["none"];

  const webFrontend = web[0];
  const allUILibraries = Object.keys(UI_LIBRARY_COMPATIBILITY) as UILibrary[];

  return allUILibraries.filter((lib) => {
    if (lib === "none") return true;

    const compatibility = UI_LIBRARY_COMPATIBILITY[lib];
    if (webFrontend === "astro") {
      if (astroIntegration === "react") {
        return compatibility.frontends.some((f) =>
          [
            "tanstack-router",
            "react-router",
            "react-vite",
            "tanstack-start",
            "next",
            "astro",
          ].includes(f),
        );
      }
      return compatibility.frontends.some((f) =>
        ["nuxt", "svelte", "solid", "qwik", "angular"].includes(f),
      );
    }

    return compatibility.frontends.includes(webFrontend);
  });
}

export function getCompatibleCSSFrameworks(uiLibrary: UILibrary | undefined): CSSFramework[] {
  if (!uiLibrary || uiLibrary === "none") {
    return ["tailwind", "scss", "less", "postcss-only", "none"];
  }

  const compatibility = UI_LIBRARY_COMPATIBILITY[uiLibrary];
  return compatibility.cssFrameworks as CSSFramework[];
}

export function hasWebStyling(frontends: Frontend[] = []): boolean {
  const { web } = splitFrontends(frontends);
  return web.length > 0;
}

export function getCompatibleFormLibraries(frontends: Frontend[] = []): Forms[] {
  const hasSolid = frontends.includes("solid");
  const hasSolidStart = frontends.includes("solid-start");
  const hasQwik = frontends.includes("qwik");
  const hasFresh = frontends.includes("fresh");

  const all: Forms[] = [
    "tanstack-form",
    "react-hook-form",
    "formik",
    "final-form",
    "conform",
    "modular-forms",
    "none",
  ];

  if (hasFresh) {
    return all.filter((f) => f !== "tanstack-form" && f !== "react-hook-form" && f !== "formik");
  }

  if (hasSolid || hasSolidStart || hasQwik) {
    return all.filter((f) => f !== "react-hook-form" && f !== "formik" && f !== "final-form");
  }

  return all;
}

export function evaluateCompatibility(input: CompatibilityInput): CompatibilityEvaluation {
  const issues: CompatibilityIssue[] = [];

  const scalarChecks: Array<[CompatibilityCategory, string]> = [
    ["runtime", input.runtime],
    ["backend", input.backend],
    ["database", input.database],
    ["orm", input.orm],
    ["dbSetup", input.dbSetup],
    ["auth", input.auth],
    ["payments", input.payments],
    ["email", input.email],
    ["cssFramework", input.cssFramework],
    ["uiLibrary", input.uiLibrary],
    ["webDeploy", input.webDeploy],
    ["serverDeploy", input.serverDeploy],
    ["forms", input.forms],
    ["stateManagement", input.stateManagement],
    ["animation", input.animation],
    ["pythonApi", input.pythonApi],
    ["javaWebFramework", input.javaWebFramework],
    ["javaBuildTool", input.javaBuildTool],
    ["javaOrm", input.javaOrm],
    ["javaAuth", input.javaAuth],
    ["dotnetWebFramework", input.dotnetWebFramework],
    ["dotnetOrm", input.dotnetOrm],
    ["dotnetAuth", input.dotnetAuth],
    ["dotnetApi", input.dotnetApi],
    ["dotnetJobQueue", input.dotnetJobQueue],
    ["dotnetRealtime", input.dotnetRealtime],
    ["dotnetCaching", input.dotnetCaching],
    ["dotnetDeploy", input.dotnetDeploy],
    ["elixirWebFramework", input.elixirWebFramework],
    ["elixirOrm", input.elixirOrm],
    ["elixirAuth", input.elixirAuth],
    ["elixirApi", input.elixirApi],
    ["elixirRealtime", input.elixirRealtime],
    ["elixirJobs", input.elixirJobs],
    ["elixirValidation", input.elixirValidation],
    ["elixirHttp", input.elixirHttp],
    ["elixirJson", input.elixirJson],
    ["elixirEmail", input.elixirEmail],
    ["elixirCaching", input.elixirCaching],
    ["elixirObservability", input.elixirObservability],
    ["elixirTesting", input.elixirTesting],
    ["elixirQuality", input.elixirQuality],
    ["elixirDeploy", input.elixirDeploy],
  ];

  for (const [category, optionId] of scalarChecks) {
    const reason = getDisabledReason(input, category, optionId);
    if (reason) {
      issues.push({
        code: `INCOMPATIBLE_${category.toUpperCase()}`,
        message: reason,
        category,
        optionId,
      });
    }
  }

  const apiFrontendIssue = getApiFrontendCompatibilityIssue(
    input.api as API | undefined,
    [...input.webFrontend, ...input.nativeFrontend] as Frontend[],
    input.astroIntegration as AstroIntegration | undefined,
  );
  if (apiFrontendIssue) {
    issues.push(apiFrontendIssue);
  }

  const aiFrontendIssue = getAIFrontendCompatibilityIssue(
    input.aiSdk as AI | undefined,
    [...input.webFrontend, ...input.nativeFrontend] as Frontend[],
  );
  if (aiFrontendIssue) {
    issues.push(aiFrontendIssue);
  }

  for (const frontend of input.webFrontend) {
    const reason = getDisabledReason(input, "webFrontend", frontend);
    if (reason) {
      issues.push({
        code: "INCOMPATIBLE_FRONTEND",
        message: reason,
        category: "webFrontend",
        optionId: frontend,
      });
    }
  }

  for (const addon of [...input.codeQuality, ...input.documentation, ...input.appPlatforms]) {
    const reason = getDisabledReason(input, "appPlatforms", addon);
    if (reason) {
      issues.push({
        code: "INCOMPATIBLE_ADDON",
        message: reason,
        category: "appPlatforms",
        optionId: addon,
      });
    }
  }

  for (const addon of input.examples) {
    const reason = getDisabledReason(input, "examples", addon);
    if (reason) {
      issues.push({
        code: "INCOMPATIBLE_ADDON",
        message: reason,
        category: "examples",
        optionId: addon,
      });
    }
  }

  for (const javaLibrary of input.javaLibraries) {
    const reason = getDisabledReason(input, "javaLibraries", javaLibrary);
    if (reason) {
      issues.push({
        code: "INCOMPATIBLE_JAVA_LIBRARY",
        message: reason,
        category: "javaLibraries",
        optionId: javaLibrary,
      });
    }
  }

  for (const testingLibrary of input.javaTestingLibraries) {
    const reason = getDisabledReason(input, "javaTestingLibraries", testingLibrary);
    if (reason) {
      issues.push({
        code: "INCOMPATIBLE_JAVA_TESTING_LIBRARY",
        message: reason,
        category: "javaTestingLibraries",
        optionId: testingLibrary,
      });
    }
  }

  for (const testingLibrary of input.dotnetTesting) {
    const reason = getDisabledReason(input, "dotnetTesting", testingLibrary);
    if (reason) {
      issues.push({
        code: "INCOMPATIBLE_DOTNET_TESTING_LIBRARY",
        message: reason,
        category: "dotnetTesting",
        optionId: testingLibrary,
      });
    }
  }

  for (const observabilityLibrary of input.dotnetObservability) {
    const reason = getDisabledReason(input, "dotnetObservability", observabilityLibrary);
    if (reason) {
      issues.push({
        code: "INCOMPATIBLE_DOTNET_OBSERVABILITY",
        message: reason,
        category: "dotnetObservability",
        optionId: observabilityLibrary,
      });
    }
  }

  return { issues };
}
