import type { Backend, Ecommerce, Ecosystem } from "@/types";
import type { PromptSingleResolution } from "@/prompts/core/prompt-contract";

import { isSilent } from "@/presentation/context";
import { exitCancelled } from "@/presentation/errors";
import { isCancel, navigableSelect } from "@/prompts/core/navigable";

const ECOMMERCE_PROMPT_OPTIONS = [
  {
    value: "medusa" as const,
    label: "MedusaJS",
    hint: "Connect your app to an existing Medusa commerce backend",
  },
  {
    value: "none" as const,
    label: "None",
    hint: "Skip e-commerce SDK setup",
  },
];

type EcommercePromptContext = {
  ecommerce?: Ecommerce;
  backend?: Backend;
  ecosystem?: Ecosystem;
};

export function resolveEcommercePrompt(
  context: EcommercePromptContext = {},
): PromptSingleResolution<Ecommerce> {
  if (
    (context.ecosystem && context.ecosystem !== "typescript") ||
    context.backend === "none" ||
    context.backend === "convex"
  ) {
    return {
      shouldPrompt: false,
      mode: "single",
      options: [],
      autoValue: "none",
    };
  }

  return context.ecommerce !== undefined
    ? {
        shouldPrompt: false,
        mode: "single",
        options: ECOMMERCE_PROMPT_OPTIONS,
        autoValue: context.ecommerce,
      }
    : {
        shouldPrompt: true,
        mode: "single",
        options: ECOMMERCE_PROMPT_OPTIONS,
        initialValue: "none",
      };
}

export async function getEcommerceChoice(
  ecommerce?: Ecommerce,
  backend?: Backend,
  ecosystem?: Ecosystem,
) {
  if (ecommerce === undefined && isSilent()) return "none";

  const resolution = resolveEcommercePrompt({ ecommerce, backend, ecosystem });
  if (!resolution.shouldPrompt) return resolution.autoValue ?? "none";

  const response = await navigableSelect<Ecommerce>({
    message: "Select e-commerce platform",
    options: resolution.options,
    initialValue: resolution.initialValue as Ecommerce,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");
  return response;
}
