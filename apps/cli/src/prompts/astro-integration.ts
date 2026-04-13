import type { AstroIntegration } from "../types";

import { exitCancelled } from "../utils/errors";
import {
  createStaticSinglePromptResolution,
  type PromptOption,
} from "./prompt-contract";
import { isCancel, navigableSelect } from "./navigable";

const ASTRO_INTEGRATION_PROMPT_OPTIONS: PromptOption<AstroIntegration>[] = [
  {
    value: "react",
    label: "React",
    hint: "Full React component support (required for tRPC)",
  },
  {
    value: "vue",
    label: "Vue",
    hint: "Vue 3 component support",
  },
  {
    value: "svelte",
    label: "Svelte",
    hint: "Svelte component support",
  },
  {
    value: "solid",
    label: "Solid",
    hint: "SolidJS component support",
  },
  {
    value: "none",
    label: "None",
    hint: "Astro components only (no client-side JS framework)",
  },
];

export function resolveAstroIntegrationPrompt(astroIntegration?: AstroIntegration) {
  return createStaticSinglePromptResolution(
    ASTRO_INTEGRATION_PROMPT_OPTIONS,
    "react",
    astroIntegration,
  );
}

export async function getAstroIntegrationChoice(
  astroIntegration?: AstroIntegration,
): Promise<AstroIntegration | symbol> {
  const resolution = resolveAstroIntegrationPrompt(astroIntegration);
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<AstroIntegration>({
    message: "Choose Astro UI framework integration",
    options: resolution.options,
    initialValue: resolution.initialValue as AstroIntegration,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}
