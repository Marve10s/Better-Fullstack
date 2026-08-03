import { DEFAULT_CONFIG } from "../constants";
import {
  type Addons,
  AddonsSchema,
  type API,
  APP_PLATFORM_ADDON_VALUES,
  type Auth,
  type Backend,
  type Frontend,
  type Runtime,
} from "../types";
import { getCompatibleAddons, validateAddonCompatibility } from "../utils/compatibility-rules";
import { exitCancelled } from "../utils/errors";
import { isCancel, navigableGroupMultiselect, navigableMultiselect } from "./navigable";

type AddonOption = {
  value: Addons;
  label: string;
  hint: string;
};

function getAddonDisplay(addon: Addons): { label: string; hint: string } {
  let label: string;
  let hint: string;

  switch (addon) {
    case "turborepo":
      label = "Turborepo";
      hint = "High-performance build system";
      break;
    case "nx":
      label = "Nx";
      hint = "Smart monorepo task runner and cache";
      break;
    case "pwa":
      label = "PWA";
      hint = "Make your app installable and work offline";
      break;
    case "tauri":
      label = "Tauri";
      hint = "Build native desktop apps from your web frontend";
      break;
    case "biome":
      label = "Biome";
      hint = "Format, lint, and more";
      break;
    case "oxlint":
      label = "Oxlint";
      hint = "Oxlint + Oxfmt (linting & formatting)";
      break;
    case "ultracite":
      label = "Ultracite";
      hint = "Zero-config Biome preset with AI integration";
      break;
    case "ruler":
      label = "Ruler";
      hint = "Centralize your AI rules";
      break;
    case "mcp":
      label = "MCP";
      hint = "Install MCP server recommendations for your stack";
      break;
    case "skills":
      label = "Skills";
      hint = "Install curated AI coding skills for your stack";
      break;
    case "lefthook":
      label = "Lefthook";
      hint = "Fast and powerful Git hooks manager";
      break;
    case "husky":
      label = "Husky";
      hint = "Modern native Git hooks made easy";
      break;
    case "starlight":
      label = "Starlight";
      hint = "Build stellar docs with astro";
      break;
    case "fumadocs":
      label = "Fumadocs";
      hint = "Build excellent documentation site";
      break;
    case "opentui":
      label = "OpenTUI";
      hint = "Build terminal user interfaces";
      break;
    case "wxt":
      label = "WXT";
      hint = "Build browser extensions";
      break;
    case "msw":
      label = "MSW";
      hint = "Mock Service Worker for API mocking";
      break;
    case "storybook":
      label = "Storybook";
      hint = "Component development and testing workshop";
      break;
    case "swr":
      label = "SWR";
      hint = "React Hooks for data fetching and caching";
      break;
    case "tanstack-query":
      label = "TanStack Query";
      hint = "Powerful async state management & data fetching";
      break;
    case "tanstack-table":
      label = "TanStack Table";
      hint = "Headless table with sorting, filtering & pagination";
      break;
    case "tanstack-virtual":
      label = "TanStack Virtual";
      hint = "Virtualize large lists & grids for 60fps performance";
      break;
    case "tanstack-db":
      label = "TanStack DB";
      hint = "Reactive client-first data store with sync backends (Beta)";
      break;
    case "tanstack-pacer":
      label = "TanStack Pacer";
      hint = "Debounce, throttle, rate-limit & queue utilities (Beta)";
      break;
    case "backend-utils":
      label = "Backend Utils";
      hint = "asyncHandler, ApiResponse & global error handler for your server";
      break;
    case "devcontainer":
      label = "DevContainer";
      hint = "VS Code container config with stack-aware ports and extensions";
      break;
    case "docker-compose":
      label = "Docker Compose";
      hint = "Containerize your app for deployment";
      break;
    case "kong":
      label = "Kong Gateway";
      hint = "DB-less API gateway with declarative Docker configuration";
      break;
    case "github-actions":
      label = "GitHub Actions";
      hint = "Ship a CI workflow (install, lint, type-check, build)";
      break;
    case "eslint":
      label = "ESLint";
      hint = "Pluggable JavaScript and TypeScript linting with flat config";
      break;
    case "prettier":
      label = "Prettier";
      hint = "Opinionated formatting for code, JSON, Markdown, and styles";
      break;
    case "axios":
      label = "Axios";
      hint = "HTTP client with interceptors, cancellation, and typed responses";
      break;
    case "firebase":
      label = "Firebase JS SDK";
      hint = "Firebase app, Auth, Firestore, and Storage client setup";
      break;
    case "graphql-codegen":
      label = "GraphQL Code Generator";
      hint = "Generate typed GraphQL documents and client helpers";
      break;
    case "openapi-typescript":
      label = "openapi-typescript";
      hint = "Generate runtime-free TypeScript types from OpenAPI schemas";
      break;
    case "apollo-client":
      label = "Apollo Client";
      hint = "GraphQL client with normalized caching and framework integrations";
      break;
    case "electron":
      label = "Electron";
      hint = "Package compatible Vite frontends as desktop applications";
      break;
    case "capacitor":
      label = "Capacitor";
      hint = "Ship compatible Vite frontends to iOS and Android";
      break;
    default:
      label = addon;
      hint = `Add ${addon}`;
  }

  return { label, hint };
}

const ADDON_GROUPS: Record<string, Addons[]> = {
  Tooling: [
    "turborepo",
    "nx",
    "github-actions",
    "biome",
    "eslint",
    "prettier",
    "oxlint",
    "ultracite",
    "husky",
    "lefthook",
  ],
  Documentation: ["starlight", "fumadocs"],
  Extensions: ["ruler", "devcontainer", "docker-compose", "kong"],
  Integrations: ["msw", "storybook", "backend-utils", "axios", "firebase"],
  "API Tooling": ["graphql-codegen", "openapi-typescript"],
  "AI Agents": ["mcp", "skills"],
  "App Platforms": [...APP_PLATFORM_ADDON_VALUES],
  "Data Fetching": ["swr", "apollo-client"],
  TanStack: ["tanstack-query", "tanstack-table", "tanstack-virtual", "tanstack-db", "tanstack-pacer"],
};

function createGroupedAddonOptions() {
  return Object.fromEntries(
    Object.keys(ADDON_GROUPS).map((group) => [group, [] as AddonOption[]]),
  ) as Record<string, AddonOption[]>;
}

export function getAddonGroup(addon: Addons) {
  return Object.entries(ADDON_GROUPS).find(([, addons]) => addons.includes(addon))?.[0];
}

function validateAddonCompatibilityForPrompt(
  addon: Addons,
  frontends: Frontend[],
  auth?: Auth,
  backend?: Backend,
  runtime?: Runtime,
  api?: API,
) {
  return validateAddonCompatibility(
    addon,
    frontends,
    auth,
    backend,
    runtime,
    undefined,
    undefined,
    undefined,
    undefined,
    api,
  );
}

function getCompatibleAddonsForPrompt(
  allAddons: Addons[],
  frontends: Frontend[],
  existingAddons: Addons[] = [],
  auth?: Auth,
  backend?: Backend,
  runtime?: Runtime,
  api?: API,
) {
  return getCompatibleAddons(allAddons, frontends, existingAddons, auth, backend, runtime, api);
}

const APP_PLATFORM_ADDONS = new Set<Addons>(APP_PLATFORM_ADDON_VALUES);

/**
 * Dedicated multiselect for app platforms (Electron, Tauri, Capacitor, PWA,
 * WXT, OpenTUI). Selections merge into `config.addons`; when `--addons` is
 * passed the flag already carries any platforms, so this returns [] to avoid
 * double-collecting.
 */
export async function getAppPlatformsChoice(addons?: Addons[], frontends?: Frontend[]) {
  if (addons !== undefined) return [] as Addons[];

  const options: AddonOption[] = [];
  for (const platform of APP_PLATFORM_ADDON_VALUES) {
    const { isCompatible } = validateAddonCompatibilityForPrompt(platform, frontends || []);
    if (!isCompatible) continue;
    const { label, hint } = getAddonDisplay(platform);
    options.push({ value: platform, label, hint });
  }
  if (options.length === 0) return [] as Addons[];

  const response = await navigableMultiselect<Addons>({
    message: "Select app platforms (desktop, mobile, extension)",
    options,
    initialValues: [],
    required: false,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}

export async function getAddonsChoice(
  addons?: Addons[],
  frontends?: Frontend[],
  auth?: Auth,
  backend?: Backend,
  runtime?: Runtime,
  api?: API,
) {
  if (addons !== undefined) return addons;

  const allAddons = AddonsSchema.options.filter(
    (addon) => addon !== "none" && !APP_PLATFORM_ADDONS.has(addon),
  );
  const groupedOptions: Record<string, AddonOption[]> = createGroupedAddonOptions();

  const frontendsArray = frontends || [];

  for (const addon of allAddons) {
    const { isCompatible } = validateAddonCompatibilityForPrompt(
      addon,
      frontendsArray,
      auth,
      backend,
      runtime,
      api,
    );
    if (!isCompatible) continue;

    const { label, hint } = getAddonDisplay(addon);
    const option = { value: addon, label, hint };

    const group = getAddonGroup(addon);
    if (group) groupedOptions[group].push(option);
  }

  Object.keys(groupedOptions).forEach((group) => {
    if (groupedOptions[group].length === 0) {
      delete groupedOptions[group];
    } else {
      const groupOrder = ADDON_GROUPS[group as keyof typeof ADDON_GROUPS] || [];
      groupedOptions[group].sort((a, b) => {
        const indexA = groupOrder.indexOf(a.value);
        const indexB = groupOrder.indexOf(b.value);
        return indexA - indexB;
      });
    }
  });

  const initialValues = DEFAULT_CONFIG.addons.filter((addonValue) =>
    Object.values(groupedOptions).some((options) =>
      options.some((opt) => opt.value === addonValue),
    ),
  );

  const response = await navigableGroupMultiselect<Addons>({
    message: "Select addons",
    options: groupedOptions,
    initialValues: initialValues,
    required: false,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}

export async function getAddonsToAdd(
  frontend: Frontend[],
  existingAddons: Addons[] = [],
  auth?: Auth,
  backend?: Backend,
  runtime?: Runtime,
  api?: API,
) {
  const groupedOptions: Record<string, AddonOption[]> = createGroupedAddonOptions();

  const frontendArray = frontend || [];

  const compatibleAddons = getCompatibleAddonsForPrompt(
    AddonsSchema.options.filter((addon) => addon !== "none"),
    frontendArray,
    existingAddons,
    auth,
    backend,
    runtime,
    api,
  );

  for (const addon of compatibleAddons) {
    const { label, hint } = getAddonDisplay(addon);
    const option = { value: addon, label, hint };

    const group = getAddonGroup(addon);
    if (group) groupedOptions[group].push(option);
  }

  Object.keys(groupedOptions).forEach((group) => {
    if (groupedOptions[group].length === 0) {
      delete groupedOptions[group];
    } else {
      const groupOrder = ADDON_GROUPS[group as keyof typeof ADDON_GROUPS] || [];
      groupedOptions[group].sort((a, b) => {
        const indexA = groupOrder.indexOf(a.value);
        const indexB = groupOrder.indexOf(b.value);
        return indexA - indexB;
      });
    }
  });

  if (Object.keys(groupedOptions).length === 0) {
    return [];
  }

  const response = await navigableGroupMultiselect<Addons>({
    message: "Select addons to add",
    options: groupedOptions,
    required: false,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}
