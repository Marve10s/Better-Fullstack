import type { Backend, Caching } from "../types";

import { exitCancelled } from "../utils/errors";
import type { PromptSingleResolution } from "./prompt-contract";
import { isCancel, navigableSelect } from "./navigable";

const CACHING_PROMPT_OPTIONS = [
  {
    value: "upstash-redis" as const,
    label: "Upstash Redis",
    hint: "Serverless Redis with REST API for edge and serverless",
  },
  {
    value: "none" as const,
    label: "None",
    hint: "Skip caching layer setup",
  },
];

type CachingPromptContext = {
  caching?: Caching;
  backend?: Backend;
};

export function resolveCachingPrompt(
  context: CachingPromptContext = {},
): PromptSingleResolution<Caching> {
  if (context.backend === "none" || context.backend === "convex") {
    return {
      shouldPrompt: false,
      mode: "single",
      options: [],
      autoValue: "none",
    };
  }

  return context.caching !== undefined
    ? {
        shouldPrompt: false,
        mode: "single",
        options: CACHING_PROMPT_OPTIONS,
        autoValue: context.caching,
      }
    : {
        shouldPrompt: true,
        mode: "single",
        options: CACHING_PROMPT_OPTIONS,
        initialValue: "none",
      };
}

export async function getCachingChoice(caching?: Caching, backend?: Backend) {
  const resolution = resolveCachingPrompt({ caching, backend });
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<Caching>({
    message: "Select caching solution",
    options: resolution.options,
    initialValue: resolution.initialValue as Caching,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}
