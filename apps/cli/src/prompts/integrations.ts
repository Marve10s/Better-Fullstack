import type { Backend, Ecosystem, Integrations, Runtime } from "../types";
import type { PromptSingleResolution } from "./prompt-contract";

import { isSilent } from "../utils/context";
import { exitCancelled } from "../utils/errors";
import { isCancel, navigableSelect } from "./navigable";

const INTEGRATIONS_PROMPT_OPTIONS = [
  {
    value: "nango" as const,
    label: "Nango",
    hint: "Connect your backend to third-party APIs through Nango",
  },
  {
    value: "none" as const,
    label: "None",
    hint: "Skip integrations SDK setup",
  },
];

type IntegrationsPromptContext = {
  integrations?: Integrations;
  backend?: Backend;
  ecosystem?: Ecosystem;
  runtime?: Runtime;
};

export function resolveIntegrationsPrompt(
  context: IntegrationsPromptContext = {},
): PromptSingleResolution<Integrations> {
  if (
    (context.ecosystem && context.ecosystem !== "typescript") ||
    context.backend === "none" ||
    context.backend === "convex" ||
    context.runtime === "workers"
  ) {
    return {
      shouldPrompt: false,
      mode: "single",
      options: [],
      autoValue: "none",
    };
  }

  return context.integrations !== undefined
    ? {
        shouldPrompt: false,
        mode: "single",
        options: INTEGRATIONS_PROMPT_OPTIONS,
        autoValue: context.integrations,
      }
    : {
        shouldPrompt: true,
        mode: "single",
        options: INTEGRATIONS_PROMPT_OPTIONS,
        initialValue: "none",
      };
}

export async function getIntegrationsChoice(
  integrations?: Integrations,
  backend?: Backend,
  ecosystem?: Ecosystem,
  runtime?: Runtime,
) {
  if (integrations === undefined && isSilent()) return "none";

  const resolution = resolveIntegrationsPrompt({ integrations, backend, ecosystem, runtime });
  if (!resolution.shouldPrompt) return resolution.autoValue ?? "none";

  const response = await navigableSelect<Integrations>({
    message: "Select integrations platform",
    options: resolution.options,
    initialValue: resolution.initialValue as Integrations,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");
  return response;
}
