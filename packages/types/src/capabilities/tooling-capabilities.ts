import type { StackPartEcosystem, StackPartRole } from "@/config/types";

export const TOOLING_CATEGORY_IDS = [
  "toolchain",
  "workspaceRunner",
  "codeQuality",
  "gitHooks",
  "staticAnalysis",
  "aiTooling",
  "documentation",
  "appPlatforms",
  "testingTools",
  "dataClient",
  "frontendUtilities",
  "httpClient",
  "codeGeneration",
  "developerEnvironment",
  "containerOrchestration",
  "apiGateway",
  "continuousIntegration",
  "backendUtilities",
] as const;

export type ToolingCategoryId = (typeof TOOLING_CATEGORY_IDS)[number];

export type ToolingCategoryDefinition = {
  id: ToolingCategoryId;
  label: string;
  description: string;
  selectionMode: "single" | "multiple";
  ownerRole?: "frontend" | "backend";
};

export const TOOLING_CATEGORIES: readonly ToolingCategoryDefinition[] = [
  {
    id: "toolchain",
    label: "JavaScript Toolchain",
    description: "Choose the primary development toolchain for JavaScript workspaces.",
    selectionMode: "single",
  },
  {
    id: "workspaceRunner",
    label: "Workspace Runner",
    description: "Choose one task runner and cache for a modular monorepo.",
    selectionMode: "single",
  },
  {
    id: "codeQuality",
    label: "Code Quality",
    description: "Choose one coherent linting and formatting profile.",
    selectionMode: "single",
  },
  {
    id: "gitHooks",
    label: "Git Hooks",
    description: "Choose one Git hook manager.",
    selectionMode: "single",
  },
  {
    id: "staticAnalysis",
    label: "Static Analysis",
    description: "Add compatible project and secret analysis checks.",
    selectionMode: "multiple",
  },
  {
    id: "aiTooling",
    label: "AI Tooling",
    description: "Install compatible agent rules, MCP guidance, and skills.",
    selectionMode: "multiple",
  },
  {
    id: "documentation",
    label: "Documentation App",
    description: "Choose one generated documentation application.",
    selectionMode: "single",
  },
  {
    id: "appPlatforms",
    label: "App Platforms",
    description: "Add compatible desktop, mobile, extension, terminal, or PWA targets.",
    selectionMode: "multiple",
    ownerRole: "frontend",
  },
  {
    id: "testingTools",
    label: "Testing Support",
    description: "Add complementary API mocking and component-workshop tools.",
    selectionMode: "multiple",
    ownerRole: "frontend",
  },
  {
    id: "dataClient",
    label: "Data Client",
    description: "Choose one primary remote-data client for each frontend.",
    selectionMode: "single",
    ownerRole: "frontend",
  },
  {
    id: "frontendUtilities",
    label: "Frontend Utilities",
    description: "Add compatible, independent frontend libraries.",
    selectionMode: "multiple",
    ownerRole: "frontend",
  },
  {
    id: "httpClient",
    label: "HTTP Client",
    description: "Choose an explicit HTTP client or use the platform fetch API.",
    selectionMode: "single",
    ownerRole: "frontend",
  },
  {
    id: "codeGeneration",
    label: "API Code Generation",
    description: "Generate typed clients from compatible GraphQL or OpenAPI contracts.",
    selectionMode: "multiple",
  },
  {
    id: "developerEnvironment",
    label: "Developer Environment",
    description: "Generate a reproducible editor and container development environment.",
    selectionMode: "multiple",
  },
  {
    id: "containerOrchestration",
    label: "Local Containers",
    description: "Generate local container orchestration for project services.",
    selectionMode: "single",
  },
  {
    id: "apiGateway",
    label: "API Gateway",
    description: "Choose a gateway for compatible containerized APIs.",
    selectionMode: "single",
  },
  {
    id: "continuousIntegration",
    label: "Continuous Integration",
    description: "Choose generated CI automation for the repository.",
    selectionMode: "single",
  },
  {
    id: "backendUtilities",
    label: "Backend Utilities",
    description: "Add compatible server-side helper packages and generated utilities.",
    selectionMode: "multiple",
    ownerRole: "backend",
  },
];

export type ToolingCapabilityDefinition = {
  toolId: string;
  category: ToolingCategoryId;
  role: StackPartRole;
  ecosystem: StackPartEcosystem;
  ownerRole?: "frontend" | "backend";
};

export type ToolingSelectionOption = {
  id: string;
  category: ToolingCategoryId;
  label: string;
  description: string;
  toolIds: readonly string[];
};

const option = (
  category: ToolingCategoryId,
  id: string,
  label: string,
  description: string,
  toolIds: readonly string[] = id === "none" ? [] : [id],
): ToolingSelectionOption => ({ category, id, label, description, toolIds });

export const TOOLING_SELECTION_OPTIONS: readonly ToolingSelectionOption[] = [
  option("toolchain", "modular", "Modular", "Choose each JavaScript tool independently.", []),
  option(
    "toolchain",
    "vite-plus",
    "Vite+",
    "Unified Vite, Vitest, Oxlint, Oxfmt, Rolldown, tsdown, and workspace runner (Beta).",
  ),
  option("workspaceRunner", "none", "None", "Use package-manager workspace scripts only."),
  option("workspaceRunner", "turborepo", "Turborepo", "Task runner with remote caching."),
  option("workspaceRunner", "nx", "Nx", "Task runner with a project graph and caching."),
  option("codeQuality", "none", "None", "Do not generate a linting and formatting profile."),
  option("codeQuality", "biome", "Biome", "Biome linting and formatting."),
  option(
    "codeQuality",
    "eslint-prettier",
    "ESLint + Prettier",
    "ESLint flat config with Prettier formatting.",
    ["eslint", "prettier"],
  ),
  option("codeQuality", "oxlint", "Oxlint + Oxfmt", "Oxc linting and formatting.", ["oxlint"]),
  option("codeQuality", "ultracite", "Ultracite", "Opinionated Biome profile with AI support."),
  option("gitHooks", "none", "None", "Do not generate a Git hook manager."),
  option("gitHooks", "lefthook", "Lefthook", "Fast language-independent Git hooks."),
  option("gitHooks", "husky", "Husky", "JavaScript-native Git hooks."),
  option("staticAnalysis", "knip", "Knip", "Find unused files, exports, and dependencies."),
  option("staticAnalysis", "gitleaks", "Gitleaks", "Detect secrets in Git history and changes."),
  option("aiTooling", "ruler", "Ruler", "Centralize and distribute AI coding rules."),
  option("aiTooling", "mcp", "MCP Guidance", "Generate stack-aware MCP recommendations."),
  option("aiTooling", "skills", "Agent Skills", "Install curated stack-aware agent skills."),
  option("documentation", "none", "None", "Do not generate a documentation application."),
  option("documentation", "starlight", "Starlight", "Astro-powered documentation application."),
  option("documentation", "fumadocs", "Fumadocs", "Next.js-powered documentation application."),
  option("appPlatforms", "pwa", "PWA", "Installable and offline-capable web application."),
  option("appPlatforms", "tauri", "Tauri", "Rust-powered desktop shell."),
  option("appPlatforms", "electron", "Electron", "JavaScript-powered desktop shell."),
  option("appPlatforms", "capacitor", "Capacitor", "iOS and Android shell for a web application."),
  option("appPlatforms", "wxt", "WXT", "Browser extension application."),
  option("appPlatforms", "opentui", "OpenTUI", "Terminal user interface application."),
  option("testingTools", "msw", "MSW", "Network-level API mocking."),
  option("testingTools", "storybook", "Storybook", "Component workshop and visual testing."),
  option("dataClient", "none", "None", "Use framework-native data loading."),
  option("dataClient", "swr", "SWR", "React Hooks for remote data."),
  option("dataClient", "tanstack-query", "TanStack Query", "Async server-state management."),
  option("dataClient", "apollo-client", "Apollo Client", "GraphQL client and normalized cache."),
  option("frontendUtilities", "tanstack-table", "TanStack Table", "Headless tables."),
  option(
    "frontendUtilities",
    "tanstack-virtual",
    "TanStack Virtual",
    "Virtualized lists and grids.",
  ),
  option("frontendUtilities", "tanstack-db", "TanStack DB", "Reactive client data store (Beta)."),
  option(
    "frontendUtilities",
    "tanstack-pacer",
    "TanStack Pacer",
    "Rate and queue utilities (Beta).",
  ),
  option("frontendUtilities", "firebase", "Firebase JS SDK", "Firebase client services."),
  option("httpClient", "none", "Platform Fetch", "Use the platform fetch API."),
  option("httpClient", "axios", "Axios", "HTTP client with interceptors and cancellation."),
  option(
    "codeGeneration",
    "graphql-codegen",
    "GraphQL Code Generator",
    "Generate typed GraphQL operations.",
  ),
  option(
    "codeGeneration",
    "openapi-typescript",
    "openapi-typescript",
    "Generate types from OpenAPI.",
  ),
  option(
    "developerEnvironment",
    "devcontainer",
    "Dev Container",
    "Generate a containerized editor environment.",
  ),
  option(
    "containerOrchestration",
    "none",
    "None",
    "Do not generate local container orchestration.",
  ),
  option(
    "containerOrchestration",
    "docker-compose",
    "Docker Compose",
    "Run project services in local containers.",
  ),
  option("apiGateway", "none", "None", "Do not generate an API gateway."),
  option("apiGateway", "kong", "Kong Gateway", "DB-less gateway for containerized APIs."),
  option("continuousIntegration", "none", "None", "Do not generate CI automation."),
  option(
    "continuousIntegration",
    "github-actions",
    "GitHub Actions",
    "Repository CI for install, check, and build.",
  ),
  option(
    "backendUtilities",
    "backend-utils",
    "Backend Utilities",
    "Generated handlers, responses, and error helpers.",
  ),
];

export const TOOLING_CAPABILITIES: readonly ToolingCapabilityDefinition[] = [
  { toolId: "vite-plus", category: "toolchain", role: "toolchain", ecosystem: "universal" },
  {
    toolId: "turborepo",
    category: "workspaceRunner",
    role: "workspaceRunner",
    ecosystem: "universal",
  },
  { toolId: "nx", category: "workspaceRunner", role: "workspaceRunner", ecosystem: "universal" },
  { toolId: "biome", category: "codeQuality", role: "codeQuality", ecosystem: "universal" },
  { toolId: "eslint", category: "codeQuality", role: "codeQuality", ecosystem: "universal" },
  { toolId: "prettier", category: "codeQuality", role: "codeQuality", ecosystem: "universal" },
  { toolId: "oxlint", category: "codeQuality", role: "codeQuality", ecosystem: "universal" },
  { toolId: "ultracite", category: "codeQuality", role: "codeQuality", ecosystem: "universal" },
  { toolId: "lefthook", category: "gitHooks", role: "gitHooks", ecosystem: "universal" },
  { toolId: "husky", category: "gitHooks", role: "gitHooks", ecosystem: "universal" },
  { toolId: "knip", category: "staticAnalysis", role: "staticAnalysis", ecosystem: "typescript" },
  {
    toolId: "gitleaks",
    category: "staticAnalysis",
    role: "staticAnalysis",
    ecosystem: "universal",
  },
  { toolId: "ruler", category: "aiTooling", role: "aiTooling", ecosystem: "universal" },
  { toolId: "mcp", category: "aiTooling", role: "aiTooling", ecosystem: "universal" },
  { toolId: "skills", category: "aiTooling", role: "aiTooling", ecosystem: "universal" },
  {
    toolId: "starlight",
    category: "documentation",
    role: "documentation",
    ecosystem: "universal",
  },
  {
    toolId: "fumadocs",
    category: "documentation",
    role: "documentation",
    ecosystem: "universal",
  },
  ...(["pwa", "tauri", "electron", "capacitor"] as const).map((toolId) => ({
    toolId,
    category: "appPlatforms" as const,
    role: "appPlatform" as const,
    ecosystem: "typescript" as const,
    ownerRole: "frontend" as const,
  })),
  ...(["wxt", "opentui"] as const).map((toolId) => ({
    toolId,
    category: "appPlatforms" as const,
    role: "appPlatform" as const,
    ecosystem: "typescript" as const,
  })),
  { toolId: "msw", category: "testingTools", role: "testing", ecosystem: "typescript" },
  {
    toolId: "storybook",
    category: "testingTools",
    role: "testing",
    ecosystem: "typescript",
    ownerRole: "frontend",
  },
  ...(["swr", "tanstack-query", "apollo-client"] as const).map((toolId) => ({
    toolId,
    category: "dataClient" as const,
    role: "dataFetching" as const,
    ecosystem: "typescript" as const,
    ownerRole: "frontend" as const,
  })),
  ...(
    ["tanstack-table", "tanstack-virtual", "tanstack-db", "tanstack-pacer", "firebase"] as const
  ).map((toolId) => ({
    toolId,
    category: "frontendUtilities" as const,
    role: "libraries" as const,
    ecosystem: "typescript" as const,
    ownerRole: "frontend" as const,
  })),
  {
    toolId: "axios",
    category: "httpClient",
    role: "httpClient",
    ecosystem: "typescript",
    ownerRole: "frontend",
  },
  ...(["graphql-codegen", "openapi-typescript"] as const).map((toolId) => ({
    toolId,
    category: "codeGeneration" as const,
    role: "codeGeneration" as const,
    ecosystem: "universal" as const,
  })),
  {
    toolId: "devcontainer",
    category: "developerEnvironment",
    role: "developerEnvironment",
    ecosystem: "universal",
  },
  {
    toolId: "docker-compose",
    category: "containerOrchestration",
    role: "containerOrchestration",
    ecosystem: "universal",
  },
  { toolId: "kong", category: "apiGateway", role: "apiGateway", ecosystem: "universal" },
  {
    toolId: "github-actions",
    category: "continuousIntegration",
    role: "continuousIntegration",
    ecosystem: "universal",
  },
  {
    toolId: "backend-utils",
    category: "backendUtilities",
    role: "backendUtilities",
    ecosystem: "typescript",
    ownerRole: "backend",
  },
];

export const TOOLING_TOOL_IDS = TOOLING_CAPABILITIES.map((capability) => capability.toolId);

export function getToolingCategory(category: ToolingCategoryId) {
  return TOOLING_CATEGORIES.find((definition) => definition.id === category);
}

export function getToolingCapability(toolId: string) {
  return TOOLING_CAPABILITIES.find((definition) => definition.toolId === toolId);
}

export function getToolingCapabilities(category: ToolingCategoryId) {
  return TOOLING_CAPABILITIES.filter((definition) => definition.category === category);
}

export function getToolingSelectionOptions(category: ToolingCategoryId) {
  return TOOLING_SELECTION_OPTIONS.filter((definition) => definition.category === category);
}

export function isToolingOverlayPart(part: {
  readonly toolId: string;
  readonly role: StackPartRole;
  readonly ecosystem?: StackPartEcosystem;
  readonly source?: string;
}) {
  const capability = getToolingCapability(part.toolId);
  if (!capability || part.source === "provided") return false;
  return (
    capability.role === part.role &&
    (part.ecosystem === undefined || capability.ecosystem === part.ecosystem)
  );
}

export function isToolingOverlayOnly(
  parts:
    | readonly {
        toolId: string;
        role: StackPartRole;
        ecosystem?: StackPartEcosystem;
        source?: string;
      }[]
    | undefined,
) {
  return (parts ?? []).every((part) => isToolingOverlayPart(part));
}

export function getSelectedToolingOption(
  category: ToolingCategoryId,
  selectedToolIds: readonly string[],
) {
  return getToolingSelectionOptions(category).find((selection) =>
    selection.toolIds.length === 0
      ? getToolingCapabilities(category).every(
          (capability) => !selectedToolIds.includes(capability.toolId),
        )
      : selection.toolIds.every((toolId) => selectedToolIds.includes(toolId)),
  );
}

export function toolingRequiresJavaScriptWorkspace(toolId: string): boolean {
  const capability = getToolingCapability(toolId);
  if (!capability) return false;
  return (
    ["toolchain", "workspaceRunner", "codeQuality", "documentation", "codeGeneration"].includes(
      capability.category,
    ) || ["husky", "lefthook", "knip", "ruler"].includes(toolId)
  );
}
