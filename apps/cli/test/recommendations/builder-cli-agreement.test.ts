import { EMBEDDED_TEMPLATES, generateVirtualProject } from "@better-fullstack/template-generator";
import {
  analyzeStackCompatibility,
  DEFAULT_STACK_SELECTION,
  getCategoryOptionIds,
  getDisabledReason,
  OPTION_CATEGORY_METADATA,
  type OptionCategory,
  STACK_SELECTION_OPTION_CATEGORY_BY_KEY,
  stackSelectionToProjectConfig,
  type StackSelectionInput,
  TYPESCRIPT_CATEGORY_ORDER,
} from "@better-fullstack/types";
import { describe, expect, it } from "bun:test";

import { validateConfigForProgrammaticUse } from "@/config/config-validation";
import { runWithContext } from "@/presentation/context";

const SELF_BACKENDS: Partial<Record<string, string>> = {
  next: "self-next",
  vinext: "self-vinext",
  "tanstack-start": "self-tanstack-start",
  nuxt: "self-nuxt",
  svelte: "self-svelte",
  "solid-start": "self-solid-start",
  astro: "self-astro",
};

const STACK_DIMENSIONS = new Set([
  "webFrontend",
  "backend",
  "runtime",
  "packageManager",
  "versionChannel",
  "git",
  "install",
  "workspaceShape",
  "examples",
]);

const OTHER_ECOSYSTEM_OPTIONS = new Set(["auth.go-better-auth", "search.bleve"]);

function normalize(selection: StackSelectionInput): StackSelectionInput {
  return analyzeStackCompatibility(selection).adjustedStack ?? selection;
}

function baseStacks(): { name: string; selection: StackSelectionInput }[] {
  const overrides: { name: string; selection: Partial<StackSelectionInput> }[] = [];
  for (const frontend of getCategoryOptionIds("webFrontend").filter((id) => id !== "none")) {
    overrides.push({
      name: `${frontend} + hono`,
      selection: { webFrontend: [frontend], backend: "hono", runtime: "bun" },
    });
    const selfBackend = SELF_BACKENDS[frontend];
    if (selfBackend) {
      overrides.push({
        name: `${frontend} fullstack`,
        selection: { webFrontend: [frontend], backend: selfBackend, runtime: "none" },
      });
    }
  }
  overrides.push(
    {
      name: "astro + react fullstack",
      selection: {
        webFrontend: ["astro"],
        astroIntegration: "react",
        backend: "self-astro",
        runtime: "none",
      },
    },
    {
      name: "tanstack-router without ui library",
      selection: { webFrontend: ["tanstack-router"], backend: "hono", uiLibrary: "none" },
    },
    {
      name: "expo + hono",
      selection: { webFrontend: ["none"], nativeFrontend: ["native-bare"], backend: "hono" },
    },
    {
      name: "express + node",
      selection: { webFrontend: ["tanstack-router"], backend: "express", runtime: "node" },
    },
    {
      name: "hono + workers",
      selection: { webFrontend: ["tanstack-router"], backend: "hono", runtime: "workers" },
    },
    {
      name: "hono + node + postgres",
      selection: {
        webFrontend: ["tanstack-router"],
        backend: "hono",
        runtime: "node",
        database: "postgres",
        orm: "drizzle",
      },
    },
    {
      name: "hono + mongodb",
      selection: {
        webFrontend: ["tanstack-router"],
        backend: "hono",
        database: "mongodb",
        orm: "mongoose",
      },
    },
    {
      name: "next fullstack + postgres + better-auth",
      selection: {
        webFrontend: ["next"],
        backend: "self-next",
        runtime: "none",
        database: "postgres",
        orm: "drizzle",
        auth: "better-auth",
      },
    },
  );
  return overrides.map(({ name, selection }) => ({
    name,
    selection: normalize({ ...DEFAULT_STACK_SELECTION, auth: "none", ...selection }),
  }));
}

const SHARED_RULE_CATEGORIES = new Set<OptionCategory>(["api", "uiLibrary"]);
const STACKS = baseStacks();
const KEY_BY_CATEGORY = Object.fromEntries(
  Object.entries(STACK_SELECTION_OPTION_CATEGORY_BY_KEY).map(([key, category]) => [category, key]),
) as Partial<Record<OptionCategory, keyof StackSelectionInput>>;
const CATEGORIES = TYPESCRIPT_CATEGORY_ORDER.filter(
  (category) => !STACK_DIMENSIONS.has(category) && KEY_BY_CATEGORY[category],
);

describe("builder and CLI agreement", () => {
  it.each(CATEGORIES)(
    "every %s option the builder offers passes CLI validation and generates",
    async (category) => {
      const key = KEY_BY_CATEGORY[category] as keyof StackSelectionInput;
      const isList = Array.isArray(DEFAULT_STACK_SELECTION[key]);
      const failures: string[] = [];
      const uncovered: string[] = [];

      for (const option of OPTION_CATEGORY_METADATA[category].options) {
        if (option.id === "none" || OTHER_ECOSYSTEM_OPTIONS.has(`${category}.${option.id}`)) {
          continue;
        }
        let offered = false;
        for (const stack of STACKS) {
          const selection = {
            ...stack.selection,
            [key]: isList ? [option.id] : option.id,
          } as StackSelectionInput;
          if (getDisabledReason(selection, category, option.id)) continue;
          const label = `${option.id} on ${stack.name}`;
          const adjusted = normalize(selection);
          const value = adjusted[key];
          const kept = Array.isArray(value) ? value.includes(option.id) : value === option.id;
          if (!kept) {
            if (SHARED_RULE_CATEGORIES.has(category)) {
              failures.push(`${label}: offered, but the analyzer replaces it`);
            }
            continue;
          }
          offered = true;

          const config = stackSelectionToProjectConfig(adjusted, {
            projectDir: "/virtual/agreement",
            relativePath: "agreement",
          });
          try {
            runWithContext({ silent: true }, () => validateConfigForProgrammaticUse(config));
          } catch (error) {
            failures.push(`${label}: CLI rejects it (${(error as Error).message.split("\n")[0]})`);
            continue;
          }
          const result = await generateVirtualProject({ config, templates: EMBEDDED_TEMPLATES });
          if (!result.success) failures.push(`${label}: generation fails (${result.error})`);
        }
        if (!offered) uncovered.push(option.id);
      }

      expect(failures).toEqual([]);
      expect(uncovered).toEqual([]);
    },
  );
});
