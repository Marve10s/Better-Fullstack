import type { Backend, Frontend } from "../types";

import { DEFAULT_CONFIG } from "../constants";
import { exitCancelled } from "../utils/errors";
import type { PromptOption, PromptSingleResolution } from "./prompt-contract";
import { isCancel, navigableSelect } from "./navigable";

// Frontends with built-in server capabilities for backend="self"
const FULLSTACK_FRONTENDS: readonly Frontend[] = [
  "next",
  "tanstack-start",
  "astro",
  "nuxt",
  "svelte",
  "solid-start",
] as const;

const BACKEND_PROMPT_OPTIONS: PromptOption<Backend>[] = [
  {
    value: "self",
    label: "Self (Fullstack)",
    hint: "Use frontend's built-in api routes",
  },
  {
    value: "hono",
    label: "Hono",
    hint: "Lightweight, ultrafast web framework",
  },
  {
    value: "express",
    label: "Express",
    hint: "Fast, unopinionated, minimalist web framework for Node.js",
  },
  {
    value: "fastify",
    label: "Fastify",
    hint: "Fast, low-overhead web framework for Node.js",
  },
  {
    value: "elysia",
    label: "Elysia",
    hint: "Ergonomic web framework for building backend servers",
  },
  {
    value: "fets",
    label: "feTS",
    hint: "TypeScript HTTP Framework with e2e type-safety",
  },
  {
    value: "nestjs",
    label: "NestJS",
    hint: "Progressive Node.js framework for scalable applications",
  },
  {
    value: "adonisjs",
    label: "AdonisJS",
    hint: "Full-featured MVC framework for Node.js",
  },
  {
    value: "nitro",
    label: "Nitro",
    hint: "Universal server framework from UnJS",
  },
  {
    value: "encore",
    label: "Encore",
    hint: "Backend development platform with built-in infrastructure",
  },
  {
    value: "convex",
    label: "Convex",
    hint: "Reactive backend-as-a-service platform",
  },
  {
    value: "none",
    label: "None",
    hint: "No backend server",
  },
];

type BackendPromptContext = {
  backendFramework?: Backend;
  frontends?: Frontend[];
};

export function resolveBackendPrompt(
  context: BackendPromptContext = {},
): PromptSingleResolution<Backend> {
  const hasIncompatibleFrontend = context.frontends?.some(
    (frontend) => frontend === "solid" || frontend === "solid-start",
  );
  const hasFullstackFrontend = context.frontends?.some((frontend) =>
    FULLSTACK_FRONTENDS.includes(frontend),
  );
  const availableValues = new Set<Backend>([
    ...(hasFullstackFrontend ? (["self"] as const) : []),
    "hono",
    "express",
    "fastify",
    "elysia",
    "fets",
    "nestjs",
    "adonisjs",
    "nitro",
    "encore",
    ...(!hasIncompatibleFrontend ? (["convex"] as const) : []),
    "none",
  ]);
  const options = BACKEND_PROMPT_OPTIONS.filter((option) => availableValues.has(option.value));

  return context.backendFramework !== undefined
    ? {
        shouldPrompt: false,
        mode: "single",
        options,
        autoValue: context.backendFramework,
      }
    : {
        shouldPrompt: true,
        mode: "single",
        options,
        initialValue: hasFullstackFrontend ? "self" : DEFAULT_CONFIG.backend,
      };
}

export async function getBackendFrameworkChoice(
  backendFramework?: Backend,
  frontends?: Frontend[],
) {
  const resolution = resolveBackendPrompt({ backendFramework, frontends });
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<Backend>({
    message: "Select backend",
    options: resolution.options,
    initialValue: resolution.initialValue as Backend,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}
