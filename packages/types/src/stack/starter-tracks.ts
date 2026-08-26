import { z } from "zod";

import type { ProjectConfig, StackPart, StackPartEcosystem } from "@/config/types";

import {
  getCapabilityInventory,
  type CapabilityEvidenceReceipt,
  type CapabilityInventoryRecord,
} from "@/capabilities/capability-inventory";
import {
  CAPABILITY_EVIDENCE_LEVEL_IDS,
  capabilityEvidenceAtLeast,
  type CapabilityEvidenceLevel,
} from "@/capabilities/evidence";
import { OPTION_CATEGORY_METADATA, type OptionCategory } from "@/catalog/option-metadata";
import {
  formatStackPartSpec,
  legacyProjectConfigToStackParts,
  STACK_TOOL_DEFINITIONS,
  validateStackParts,
} from "@/stack/stack-graph";
import {
  cloneDefaultStackSelection,
  normalizeStackSelection,
  stackSelectionToProjectConfig,
  type StackSelectionState,
} from "@/stack/stack-translation";

export const STARTER_TRACK_SCHEMA_VERSION = 1 as const;

export const STARTER_TRACK_IDS = [
  "saas-app",
  "ai-agent-app",
  "rest-api",
  "java-api",
  "rust-backend",
  "mobile-app",
  "internal-tool",
] as const;
export type StarterTrackId = (typeof STARTER_TRACK_IDS)[number];

export const STARTER_TRACK_RUNTIME_IDS = [
  "node",
  "bun",
  "python",
  "jvm",
  "rust",
  "react-native",
] as const;
export const STARTER_TRACK_DEPLOYMENT_TARGET_IDS = [
  "vercel",
  "self-hosted",
  "container",
  "app-stores",
] as const;
export const STARTER_TRACK_PACKAGE_MANAGER_IDS = ["bun", "uv", "gradle", "cargo"] as const;
export const STARTER_TRACK_DATABASE_IDS = ["postgres", "sqlite", "none"] as const;
export const STARTER_TRACK_AUTH_IDS = ["better-auth", "spring-security", "none"] as const;
export const STARTER_TRACK_WORKSPACE_SHAPE_IDS = ["monorepo", "single-app"] as const;

export type StarterTrackRuntime = (typeof STARTER_TRACK_RUNTIME_IDS)[number];
export type StarterTrackDeploymentTarget = (typeof STARTER_TRACK_DEPLOYMENT_TARGET_IDS)[number];
export type StarterTrackPackageManager = (typeof STARTER_TRACK_PACKAGE_MANAGER_IDS)[number];
export type StarterTrackDatabase = (typeof STARTER_TRACK_DATABASE_IDS)[number];
export type StarterTrackAuth = (typeof STARTER_TRACK_AUTH_IDS)[number];
export type StarterTrackWorkspaceShape = (typeof STARTER_TRACK_WORKSPACE_SHAPE_IDS)[number];

export const StarterTrackFiltersSchema = z.object({
  evidence: z.enum(CAPABILITY_EVIDENCE_LEVEL_IDS).optional(),
  runtime: z.enum(STARTER_TRACK_RUNTIME_IDS).optional(),
  deploymentTarget: z.enum(STARTER_TRACK_DEPLOYMENT_TARGET_IDS).optional(),
  packageManager: z.enum(STARTER_TRACK_PACKAGE_MANAGER_IDS).optional(),
  database: z.enum(STARTER_TRACK_DATABASE_IDS).optional(),
  auth: z.enum(STARTER_TRACK_AUTH_IDS).optional(),
  workspaceShape: z.enum(STARTER_TRACK_WORKSPACE_SHAPE_IDS).optional(),
});
export type StarterTrackFilters = z.infer<typeof StarterTrackFiltersSchema>;

export const STARTER_TRACK_FILTER_URL_KEYS = {
  evidence: "te",
  runtime: "tr",
  deploymentTarget: "td",
  packageManager: "tpm",
  database: "tdb",
  auth: "ta",
  workspaceShape: "tws",
} as const satisfies Record<keyof StarterTrackFilters, string>;

export type StarterTrackDefinition = {
  id: StarterTrackId;
  name: string;
  intent: string;
  description: string;
  presetId: string;
  ecosystem: ProjectConfig["ecosystem"];
  icon: string;
  guideHref: string;
  docsHref: string;
  highlights: readonly string[];
  audience: string;
  outcome: string;
  ctaLabel: string;
  selection: StackSelectionState;
  facets: {
    runtimes: readonly StarterTrackRuntime[];
    deploymentTargets: readonly StarterTrackDeploymentTarget[];
    packageManagers: readonly StarterTrackPackageManager[];
    databases: readonly StarterTrackDatabase[];
    auth: readonly StarterTrackAuth[];
    workspaceShapes: readonly StarterTrackWorkspaceShape[];
  };
  keywords: readonly string[];
  phrases: readonly string[];
};

const NON_TYPESCRIPT_SELECTION: Partial<StackSelectionState> = {
  stackMode: "solo",
  stackPartSpecs: [],
  webFrontend: ["none"],
  nativeFrontend: ["none"],
  astroIntegration: "none",
  runtime: "none",
  backend: "none",
  orm: "none",
  dbSetup: "none",
  auth: "none",
  payments: "none",
  email: "none",
  fileUpload: "none",
  logging: "none",
  observability: "none",
  featureFlags: "none",
  integrations: "none",
  ecommerce: "none",
  analytics: "none",
  backendLibraries: "none",
  stateManagement: "none",
  forms: "none",
  validation: "none",
  testing: "none",
  realtime: "none",
  jobQueue: "none",
  caching: "none",
  rateLimit: "none",
  botProtection: "none",
  i18n: "none",
  animation: "none",
  cssFramework: "none",
  uiLibrary: "none",
  cms: "none",
  search: "none",
  vectorDb: "none",
  fileStorage: "none",
  codeQuality: [],
  documentation: [],
  appPlatforms: [],
  workspaceShape: "single-app",
  examples: [],
  aiSdk: "none",
  api: "none",
  webDeploy: "none",
  serverDeploy: "none",
};

function createSelection(
  overrides: Partial<StackSelectionState>,
  stackPartSpecs: readonly string[],
): StackSelectionState {
  return normalizeStackSelection({
    ...cloneDefaultStackSelection(),
    ...overrides,
    projectName: "my-app",
    stackMode: "multi",
    stackPartSpecs: [...stackPartSpecs],
    git: "true",
    install: "true",
  });
}

export const STARTER_TRACK_DEFINITIONS = [
  {
    id: "saas-app",
    name: "SaaS App",
    intent: "Sell subscriptions",
    description:
      "Next.js with auth, relational data, payments, email, and a deployment-ready app shape.",
    presetId: "nextjs-saas",
    ecosystem: "typescript",
    icon: "stripe",
    guideHref: "/guides/packs/create-saas-app/",
    docsHref: "/docs/choosing-a-stack/#deployment",
    highlights: ["Next.js", "Better Auth", "Stripe", "Drizzle"],
    audience: "Founders validating paid products",
    outcome: "Billing, auth, email, and data wired into one app",
    ctaLabel: "Start SaaS",
    selection: createSelection(
      {
        webFrontend: ["next"],
        nativeFrontend: ["none"],
        runtime: "none",
        backend: "self-next",
        database: "postgres",
        orm: "drizzle",
        auth: "better-auth",
        payments: "stripe",
        email: "react-email",
        codeQuality: ["biome"],
        appPlatforms: ["turborepo"],
        packageManager: "bun",
        workspaceShape: "monorepo",
        api: "trpc",
      },
      [
        "frontend:typescript:next",
        "backend:typescript:self",
        "database:universal:postgres",
        "codeQuality:universal:biome",
        "workspaceRunner:universal:turborepo",
        "backend.orm:typescript:drizzle",
        "backend.api:typescript:trpc",
        "backend.auth:typescript:better-auth",
        "frontend.css:typescript:tailwind",
        "frontend.ui:typescript:shadcn-ui",
        "frontend.forms:typescript:react-hook-form",
        "backend.email:typescript:react-email",
        "backend.payments:typescript:stripe",
        "backend.validation:typescript:zod",
        "backend.testing:typescript:vitest",
      ],
    ),
    facets: {
      runtimes: ["node"],
      deploymentTargets: ["vercel", "self-hosted", "container"],
      packageManagers: ["bun"],
      databases: ["postgres"],
      auth: ["better-auth"],
      workspaceShapes: ["monorepo"],
    },
    keywords: [
      "saas",
      "subscription",
      "subscriptions",
      "billing",
      "payments",
      "stripe",
      "checkout",
      "founder",
    ],
    phrases: ["sell subscriptions", "paid product", "software as a service"],
  },
  {
    id: "ai-agent-app",
    name: "AI Agent App",
    intent: "Build with agents",
    description:
      "A Next.js workspace prepared for AI CLI flows, MCP, skills, and generated agent docs.",
    presetId: "ai-cli-agent-workbench",
    ecosystem: "typescript",
    icon: "ai-cli",
    guideHref: "/guides/packs/create-ai-agent-app/",
    docsHref: "/docs/ai/overview/",
    highlights: ["Next.js", "AI CLI", "MCP", "Skills"],
    audience: "Teams building agent-assisted products",
    outcome: "AI docs, MCP, skills, and CLI workflow ready from day one",
    ctaLabel: "Start AI",
    selection: createSelection(
      {
        webFrontend: ["next"],
        nativeFrontend: ["none"],
        runtime: "none",
        backend: "self-next",
        database: "sqlite",
        orm: "drizzle",
        auth: "better-auth",
        codeQuality: ["biome", "ruler"],
        appPlatforms: ["turborepo", "mcp", "skills"],
        packageManager: "bun",
        workspaceShape: "monorepo",
        aiSdk: "ai-cli",
        aiDocs: ["claude-md", "agents-md", "cursorrules"],
        api: "trpc",
      },
      [
        "frontend:typescript:next",
        "backend:typescript:self",
        "database:universal:sqlite",
        "codeQuality:universal:biome",
        "aiTooling:universal:ruler",
        "workspaceRunner:universal:turborepo",
        "aiTooling:universal:mcp",
        "aiTooling:universal:skills",
        "backend.orm:typescript:drizzle",
        "backend.api:typescript:trpc",
        "backend.auth:typescript:better-auth",
        "frontend.css:typescript:tailwind",
        "frontend.ui:typescript:shadcn-ui",
        "frontend.forms:typescript:react-hook-form",
        "backend.ai:typescript:ai-cli",
        "backend.validation:typescript:zod",
        "backend.testing:typescript:vitest",
      ],
    ),
    facets: {
      runtimes: ["node"],
      deploymentTargets: ["vercel", "self-hosted"],
      packageManagers: ["bun"],
      databases: ["sqlite"],
      auth: ["better-auth"],
      workspaceShapes: ["monorepo"],
    },
    keywords: [
      "ai",
      "agent",
      "agents",
      "llm",
      "chatbot",
      "assistant",
      "mcp",
      "skills",
      "copilot",
      "rag",
    ],
    phrases: ["ai agent", "agent assisted", "model context protocol"],
  },
  {
    id: "rest-api",
    name: "REST API",
    intent: "Expose a service",
    description:
      "FastAPI with SQLAlchemy, Pydantic, Ruff, and a small API-first Python project layout.",
    presetId: "python-fastapi",
    ecosystem: "python",
    icon: "fastapi",
    guideHref: "/guides/packs/create-rest-api/",
    docsHref: "/docs/choosing-a-stack/#deployment",
    highlights: ["FastAPI", "PostgreSQL", "SQLAlchemy", "Pydantic"],
    audience: "Backend teams exposing typed services",
    outcome: "FastAPI service with validation, persistence, and Ruff quality checks",
    ctaLabel: "Start API",
    selection: createSelection(
      {
        ...NON_TYPESCRIPT_SELECTION,
        ecosystem: "python",
        database: "postgres",
        pythonWebFramework: "fastapi",
        pythonOrm: "sqlalchemy",
        pythonValidation: "pydantic",
        pythonAi: [],
        pythonAuth: "none",
        pythonApi: "none",
        pythonTaskQueue: "none",
        pythonGraphql: "none",
        pythonQuality: "ruff",
        pythonPackageManager: "uv",
        aiDocs: ["claude-md"],
      },
      [
        "backend:python:fastapi",
        "database:universal:postgres",
        "backend.orm:python:sqlalchemy",
        "backend.validation:python:pydantic",
        "backend.codeQuality:python:ruff",
        "backend.packageManager:python:uv",
      ],
    ),
    facets: {
      runtimes: ["python"],
      deploymentTargets: ["self-hosted", "container"],
      packageManagers: ["uv"],
      databases: ["postgres"],
      auth: ["none"],
      workspaceShapes: ["single-app"],
    },
    keywords: ["api", "rest", "fastapi", "python", "pydantic", "sqlalchemy", "service"],
    phrases: ["rest api", "python api", "typed service", "backend service"],
  },
  {
    id: "java-api",
    name: "Java API",
    intent: "Ship Spring services",
    description: "Spring Boot with security, JPA, migrations, and test coverage for backend teams.",
    presetId: "java-secure",
    ecosystem: "java",
    icon: "java",
    guideHref: "/guides/packs/create-java-api/",
    docsHref: "/docs/ecosystems/#java-and-kotlin",
    highlights: ["Spring Boot", "Security", "JPA", "Testcontainers"],
    audience: "Java teams shipping secure APIs",
    outcome: "Spring Security, JPA, migrations, and test coverage scaffolded",
    ctaLabel: "Start Java",
    selection: createSelection(
      {
        ...NON_TYPESCRIPT_SELECTION,
        ecosystem: "java",
        database: "postgres",
        javaWebFramework: "spring-boot",
        javaBuildTool: "gradle",
        javaOrm: "spring-data-jpa",
        javaAuth: "spring-security",
        javaLibraries: ["spring-actuator", "flyway"],
        javaTestingLibraries: ["junit5", "testcontainers"],
        aiDocs: ["claude-md"],
      },
      [
        "backend:java:spring-boot",
        "database:universal:postgres",
        "backend.orm:java:spring-data-jpa",
        "backend.auth:java:spring-security",
        "backend.buildTool:java:gradle",
        "backend.libraries:java:spring-actuator",
        "backend.libraries:java:flyway",
        "backend.testing:java:junit5",
        "backend.testing:java:testcontainers",
      ],
    ),
    facets: {
      runtimes: ["jvm"],
      deploymentTargets: ["self-hosted", "container"],
      packageManagers: ["gradle"],
      databases: ["postgres"],
      auth: ["spring-security"],
      workspaceShapes: ["single-app"],
    },
    keywords: ["java", "spring", "springboot", "jpa", "jvm", "enterprise", "secure"],
    phrases: ["spring boot", "java api", "spring service", "secure api"],
  },
  {
    id: "rust-backend",
    name: "Rust Backend",
    intent: "Prefer systems-grade APIs",
    description:
      "Axum and SeaORM for a compact Rust backend with typed persistence and observability hooks.",
    presetId: "rust-api",
    ecosystem: "rust",
    icon: "rust",
    guideHref: "/guides/packs/create-rust-backend/",
    docsHref: "/docs/ecosystems/#rust",
    highlights: ["Axum", "SeaORM", "PostgreSQL", "Tracing"],
    audience: "Systems-minded backend developers",
    outcome: "Axum service with typed persistence and clean compiler checks",
    ctaLabel: "Start Rust",
    selection: createSelection(
      {
        ...NON_TYPESCRIPT_SELECTION,
        ecosystem: "rust",
        database: "postgres",
        rustWebFramework: "axum",
        rustFrontend: "none",
        rustOrm: "sea-orm",
        rustApi: "none",
        rustCli: "none",
        rustLibraries: [],
        aiDocs: ["claude-md"],
      },
      [
        "backend:rust:axum",
        "database:universal:postgres",
        "backend.orm:rust:sea-orm",
        "backend.logging:rust:tracing",
        "backend.errorHandling:rust:anyhow-thiserror",
      ],
    ),
    facets: {
      runtimes: ["rust"],
      deploymentTargets: ["self-hosted", "container"],
      packageManagers: ["cargo"],
      databases: ["postgres"],
      auth: ["none"],
      workspaceShapes: ["single-app"],
    },
    keywords: ["rust", "axum", "seaorm", "systems", "native", "performance", "safe"],
    phrases: ["rust api", "rust backend", "systems grade", "memory safe service"],
  },
  {
    id: "mobile-app",
    name: "Mobile App",
    intent: "Start native",
    description:
      "Expo with Uniwind for a native-first app shell before backend services are needed.",
    presetId: "uniwind",
    ecosystem: "react-native",
    icon: "native-uniwind",
    guideHref: "/guides/packs/create-mobile-app/",
    docsHref: "/docs/ecosystems/#typescript",
    highlights: ["Expo", "Uniwind", "React Native", "Mobile"],
    audience: "Product teams starting native first",
    outcome: "Expo app shell with Uniwind styling and mobile defaults",
    ctaLabel: "Start mobile",
    selection: createSelection(
      {
        ...NON_TYPESCRIPT_SELECTION,
        ecosystem: "react-native",
        database: "none",
        nativeFrontend: ["native-uniwind"],
        mobileNavigation: "expo-router",
        mobileUI: "uniwind",
        mobileDeepLinking: "expo-linking",
        packageManager: "bun",
        aiDocs: ["claude-md", "agents-md"],
      },
      [
        "mobile:react-native:native-uniwind",
        "mobile.navigation:react-native:expo-router",
        "mobile.ui:react-native:uniwind",
        "mobile.deepLinking:react-native:expo-linking",
      ],
    ),
    facets: {
      runtimes: ["react-native"],
      deploymentTargets: ["app-stores"],
      packageManagers: ["bun"],
      databases: ["none"],
      auth: ["none"],
      workspaceShapes: ["single-app"],
    },
    keywords: ["mobile", "ios", "android", "expo", "native", "uniwind", "phone"],
    phrases: ["react native", "mobile app", "app store", "play store"],
  },
  {
    id: "internal-tool",
    name: "Internal Tool",
    intent: "Move fast with CRUD",
    description:
      "TanStack Router, Hono, Drizzle, auth, and tRPC for product dashboards and admin tools.",
    presetId: "tanstack-hono",
    ecosystem: "typescript",
    icon: "hono",
    guideHref: "/guides/packs/create-internal-tool/",
    docsHref: "/docs/choosing-a-stack/#deployment",
    highlights: ["TanStack Router", "Hono", "Drizzle", "tRPC"],
    audience: "Teams building dashboards and admin tools",
    outcome: "Frontend, API, auth, and data layer ready for CRUD workflows",
    ctaLabel: "Start tool",
    selection: createSelection(
      {
        webFrontend: ["tanstack-router"],
        nativeFrontend: ["none"],
        runtime: "bun",
        backend: "hono",
        database: "postgres",
        orm: "drizzle",
        auth: "better-auth",
        appPlatforms: ["turborepo"],
        packageManager: "bun",
        workspaceShape: "monorepo",
        api: "trpc",
      },
      [
        "frontend:typescript:tanstack-router",
        "backend:typescript:hono",
        "database:universal:postgres",
        "workspaceRunner:universal:turborepo",
        "backend.orm:typescript:drizzle",
        "backend.api:typescript:trpc",
        "backend.auth:typescript:better-auth",
        "frontend.css:typescript:tailwind",
        "frontend.ui:typescript:shadcn-ui",
        "frontend.forms:typescript:react-hook-form",
        "backend.runtime:typescript:bun",
        "backend.validation:typescript:zod",
        "backend.testing:typescript:vitest",
      ],
    ),
    facets: {
      runtimes: ["bun"],
      deploymentTargets: ["self-hosted", "container"],
      packageManagers: ["bun"],
      databases: ["postgres"],
      auth: ["better-auth"],
      workspaceShapes: ["monorepo"],
    },
    keywords: ["internal", "admin", "dashboard", "crud", "backoffice", "portal", "operations"],
    phrases: ["internal tool", "admin panel", "operations dashboard", "crud app"],
  },
] as const satisfies readonly StarterTrackDefinition[];

function optionCategory(value: string | undefined): OptionCategory | undefined {
  return value && value in OPTION_CATEGORY_METADATA ? (value as OptionCategory) : undefined;
}

function partEvidenceCategory(part: StackPart): OptionCategory | undefined {
  if (part.role === "frontend") return "webFrontend";
  if (part.role === "mobile") return "nativeFrontend";
  const definition = STACK_TOOL_DEFINITIONS.find(
    (candidate) =>
      candidate.toolId === part.toolId &&
      candidate.roles.includes(part.role) &&
      candidate.ecosystems.includes(part.ecosystem),
  );
  return optionCategory(definition?.legacyCategory);
}

function partOptionId(
  part: StackPart,
  category: OptionCategory | undefined,
  config: ProjectConfig,
) {
  if (!category) return part.toolId;
  if (category === "webFrontend") return part.toolId;
  if (category === "backend" && part.toolId === "self") {
    const frontend = config.frontend.find((value) => value !== "none");
    if (frontend) return `self-${frontend}`;
  }
  const value = config[category as keyof ProjectConfig];
  if (typeof value === "string") return value;
  if (Array.isArray(value) && (value as readonly unknown[]).includes(part.toolId))
    return part.toolId;
  return part.toolId;
}

function evidenceEcosystem(part: StackPart, trackEcosystem: ProjectConfig["ecosystem"]) {
  return (part.ecosystem === "universal" ? trackEcosystem : part.ecosystem) as Exclude<
    StackPartEcosystem,
    "universal"
  >;
}

function evidenceForPart(
  part: StackPart,
  config: ProjectConfig,
  inventory: readonly CapabilityInventoryRecord[],
) {
  const category = partEvidenceCategory(part);
  const optionId = partOptionId(part, category, config);
  const ecosystem = evidenceEcosystem(part, config.ecosystem);
  const candidates = inventory.filter(
    (record) => record.optionId === optionId || record.optionId === part.toolId,
  );
  return (
    candidates.find(
      (record) => record.ecosystem === ecosystem && (!category || record.category === category),
    ) ??
    candidates.find((record) => record.ecosystem === ecosystem) ??
    candidates.find((record) => !category || record.category === category) ??
    candidates[0]
  );
}

const FRESHNESS_ORDER = [
  "current",
  "unverified",
  "stale",
  "producer-mismatch",
  "failed",
  "quarantined",
] as const;

function minimumEvidenceLevel(levels: readonly CapabilityEvidenceLevel[]) {
  return (
    [...levels].sort(
      (left, right) =>
        CAPABILITY_EVIDENCE_LEVEL_IDS.indexOf(left) - CAPABILITY_EVIDENCE_LEVEL_IDS.indexOf(right),
    )[0] ?? "listed"
  );
}

export type StarterTrackEvidence = ReturnType<typeof getProjectConfigEvidence>;

export function getProjectConfigEvidence(
  config: ProjectConfig,
  options: {
    inventory?: readonly CapabilityInventoryRecord[];
    receipt?: CapabilityEvidenceReceipt | unknown;
    catalogVersion?: string;
    producerFingerprint?: string;
  } = {},
) {
  const inventory =
    options.inventory ??
    getCapabilityInventory({
      receipt: options.receipt,
      catalogVersion: options.catalogVersion,
      producerFingerprint: options.producerFingerprint,
    });
  const parts = (config.stackParts ?? legacyProjectConfigToStackParts(config)).filter(
    (part) => part.toolId !== "none" && part.source !== "provided",
  );
  const records = parts.map((part) => {
    const evidence = evidenceForPart(part, config, inventory);
    return {
      partSpec: formatStackPartSpec(part, parts),
      role: part.role,
      toolId: part.toolId,
      category: evidence?.category ?? null,
      optionId: evidence?.optionId ?? part.toolId,
      level: evidence?.evidenceLevel ?? ("listed" as const),
      declaredLevel: evidence?.declaredEvidenceLevel ?? ("listed" as const),
      maturity: evidence?.maturity ?? ("experimental" as const),
      freshness: evidence?.freshness ?? ("unverified" as const),
      maintenanceOwner: evidence?.maintenanceOwner ?? "@Marve10s",
      limitation: evidence?.limitation ?? "No capability inventory record matches this Stack Part.",
      recipeIds: evidence ? [...evidence.recipeIds] : [],
    };
  });
  const level = minimumEvidenceLevel(records.map((record) => record.level));
  const declaredLevel = minimumEvidenceLevel(records.map((record) => record.declaredLevel));
  const freshness =
    [...records].sort(
      (left, right) =>
        FRESHNESS_ORDER.indexOf(right.freshness) - FRESHNESS_ORDER.indexOf(left.freshness),
    )[0]?.freshness ?? "unverified";
  return {
    level,
    declaredLevel,
    freshness,
    partCount: parts.length,
    records,
    limitations: [...new Set(records.map((record) => record.limitation))],
  };
}

export function getStackSelectionEvidence(
  selection: StackSelectionState,
  options: {
    inventory?: readonly CapabilityInventoryRecord[];
    receipt?: CapabilityEvidenceReceipt | unknown;
    catalogVersion?: string;
    producerFingerprint?: string;
  } = {},
) {
  return getProjectConfigEvidence(
    stackSelectionToProjectConfig(selection, {
      projectDir: "/starter-track",
      relativePath: "starter-track",
      install: false,
    }),
    options,
  );
}

export type StarterTrackCatalogEntry = ReturnType<typeof materializeStarterTrack>;

function materializeStarterTrack(
  definition: StarterTrackDefinition,
  inventory: readonly CapabilityInventoryRecord[],
) {
  const selection = normalizeStackSelection({
    ...definition.selection,
    stackPartSpecs: [...definition.selection.stackPartSpecs],
  });
  const config = stackSelectionToProjectConfig(selection, {
    projectDir: "/starter-track",
    relativePath: "starter-track",
    install: false,
  });
  const parts = legacyProjectConfigToStackParts(config);
  const validation = validateStackParts(parts);
  const stackPartSpecs = parts.map((part) => formatStackPartSpec(part, parts));
  return {
    id: definition.id,
    name: definition.name,
    intent: definition.intent,
    description: definition.description,
    presetId: definition.presetId,
    ecosystem: definition.ecosystem,
    icon: definition.icon,
    guideHref: definition.guideHref,
    docsHref: definition.docsHref,
    highlights: [...definition.highlights],
    audience: definition.audience,
    outcome: definition.outcome,
    ctaLabel: definition.ctaLabel,
    selection,
    stackPartSpecs,
    compatibility: {
      valid: validation.issues.length === 0,
      issues: validation.issues.map((issue) => ({
        code: issue.code,
        message: issue.message,
        partId: issue.partId ?? null,
        role: issue.role ?? null,
        toolId: issue.toolId ?? null,
        alternatives: issue.alternatives ?? [],
      })),
    },
    evidence: getStackSelectionEvidence(selection, { inventory }),
    facets: {
      runtimes: [...definition.facets.runtimes],
      deploymentTargets: [...definition.facets.deploymentTargets],
      packageManagers: [...definition.facets.packageManagers],
      databases: [...definition.facets.databases],
      auth: [...definition.facets.auth],
      workspaceShapes: [...definition.facets.workspaceShapes],
    },
  };
}

function matchesFilters(track: StarterTrackCatalogEntry, filters: StarterTrackFilters) {
  if (filters.evidence && !capabilityEvidenceAtLeast(track.evidence.level, filters.evidence)) {
    return false;
  }
  if (filters.runtime && !track.facets.runtimes.includes(filters.runtime)) return false;
  if (
    filters.deploymentTarget &&
    !track.facets.deploymentTargets.includes(filters.deploymentTarget)
  ) {
    return false;
  }
  if (filters.packageManager && !track.facets.packageManagers.includes(filters.packageManager)) {
    return false;
  }
  if (filters.database && !track.facets.databases.includes(filters.database)) return false;
  if (filters.auth && !track.facets.auth.includes(filters.auth)) return false;
  if (filters.workspaceShape && !track.facets.workspaceShapes.includes(filters.workspaceShape)) {
    return false;
  }
  return true;
}

export function getStarterTrackCatalog(
  options: {
    filters?: StarterTrackFilters;
    inventory?: readonly CapabilityInventoryRecord[];
    receipt?: CapabilityEvidenceReceipt | unknown;
    catalogVersion?: string;
    producerFingerprint?: string;
  } = {},
) {
  const filters = StarterTrackFiltersSchema.parse(options.filters ?? {});
  const inventory =
    options.inventory ??
    getCapabilityInventory({
      receipt: options.receipt,
      catalogVersion: options.catalogVersion,
      producerFingerprint: options.producerFingerprint,
    });
  const tracks = STARTER_TRACK_DEFINITIONS.map((definition) =>
    materializeStarterTrack(definition, inventory),
  ).filter((track) => track.compatibility.valid && matchesFilters(track, filters));
  return {
    schemaVersion: STARTER_TRACK_SCHEMA_VERSION,
    filters,
    total: tracks.length,
    tracks,
  };
}

function stringSearchValue(value: unknown): string | undefined {
  if (typeof value === "string") return value;
  if (Array.isArray(value))
    return value.find((entry): entry is string => typeof entry === "string");
  return undefined;
}

export function parseStarterTrackFilters(search: Record<string, unknown>): StarterTrackFilters {
  const candidate: Record<string, string> = {};
  for (const [key, urlKey] of Object.entries(STARTER_TRACK_FILTER_URL_KEYS)) {
    const value = stringSearchValue(search[urlKey]);
    if (value) candidate[key] = value;
  }
  const parsed = StarterTrackFiltersSchema.safeParse(candidate);
  return parsed.success ? parsed.data : {};
}

export function createStarterTrackFilterSearchParams(filters: StarterTrackFilters) {
  const parsed = StarterTrackFiltersSchema.parse(filters);
  const params = new URLSearchParams();
  for (const [key, urlKey] of Object.entries(STARTER_TRACK_FILTER_URL_KEYS)) {
    const value = parsed[key as keyof StarterTrackFilters];
    if (value) params.set(urlKey, value);
  }
  return params;
}

export type StarterTrackRecommendation = ReturnType<typeof recommendStarterTrack>;

function briefTokens(brief: string) {
  return brief
    .toLowerCase()
    .split(/[^a-z0-9+#.-]+/)
    .filter((token) => token.length >= 2);
}

export function recommendStarterTrack(
  brief: string,
  options: {
    ecosystem?: ProjectConfig["ecosystem"];
    trackIds?: readonly StarterTrackId[];
    inventory?: readonly CapabilityInventoryRecord[];
    receipt?: CapabilityEvidenceReceipt | unknown;
    catalogVersion?: string;
    producerFingerprint?: string;
  } = {},
) {
  const catalog = getStarterTrackCatalog({
    inventory: options.inventory,
    receipt: options.receipt,
    catalogVersion: options.catalogVersion,
    producerFingerprint: options.producerFingerprint,
  });
  const allowedTracks = options.trackIds
    ? catalog.tracks.filter((track) => options.trackIds?.includes(track.id))
    : catalog.tracks;
  const pool = options.ecosystem
    ? allowedTracks.filter((track) => track.ecosystem === options.ecosystem)
    : allowedTracks;
  if (pool.length === 0) {
    const constraint = options.ecosystem
      ? ` for ecosystem '${options.ecosystem}'`
      : options.trackIds
        ? " in the requested track set"
        : "";
    throw new Error(`No schema-valid starter track is available${constraint}.`);
  }
  const normalized = brief.trim().toLowerCase();
  const tokens = new Set(briefTokens(brief));
  let best = pool[0];
  let bestScore = -1;
  let bestTerms: string[] = [];

  for (const track of pool) {
    const definition = STARTER_TRACK_DEFINITIONS.find((entry) => entry.id === track.id);
    if (!definition) continue;
    let score = 0;
    const matched = new Set<string>();
    for (const phrase of definition.phrases) {
      if (normalized.includes(phrase)) {
        score += 8;
        matched.add(phrase);
      }
    }
    for (const keyword of definition.keywords) {
      if (tokens.has(keyword)) {
        score += 3;
        matched.add(keyword);
      }
    }
    if (tokens.has(track.ecosystem)) {
      score += 4;
      matched.add(track.ecosystem);
    }
    if (score > bestScore) {
      best = track;
      bestScore = score;
      bestTerms = [...matched];
    }
  }

  if (!best) throw new Error("No schema-valid starter track is available.");
  const fallback = bestScore <= 0;
  return {
    schemaVersion: STARTER_TRACK_SCHEMA_VERSION,
    recommendationMode: "deterministic" as const,
    modelUsed: false,
    track: best,
    matchedTerms: bestTerms.sort(),
    score: Math.max(bestScore, 0),
    rationale: fallback
      ? `No strong signal matched. Start with ${best.name}, then review every editable Stack Part.`
      : `${best.name} matched ${bestTerms.sort().join(", ")}.`,
    constraints: [
      `The proposed graph has ${best.stackPartSpecs.length} schema-valid Stack Parts.`,
      `Current fail-closed evidence is ${best.evidence.level}; declared evidence is ${best.evidence.declaredLevel}.`,
      "Review the normal project plan before creation.",
    ],
  };
}
