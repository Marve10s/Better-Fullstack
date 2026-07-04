import type { Backend, Caching, Ecosystem } from "../types";

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
    value: "redis" as const,
    label: "Redis",
    hint: "Self-hosted Redis via ioredis (TCP) — full command surface",
  },
  {
    value: "none" as const,
    label: "None",
    hint: "Skip caching layer setup",
  },
];

// Non-TypeScript ecosystems have their own native caching fields
// (goCaching/rustCaching/pythonCaching); the shared self-hosted redis client
// is TypeScript-only, so drop it from their options.
const NON_TS_CACHING_PROMPT_OPTIONS = CACHING_PROMPT_OPTIONS.filter(
  (option) => option.value !== "redis",
);

type CachingPromptContext = {
  caching?: Caching;
  backend?: Backend;
  ecosystem?: Ecosystem;
};

export function resolveCachingPrompt(
  context: CachingPromptContext = {},
): PromptSingleResolution<Caching> {
  if (context.ecosystem === "react-native" || context.ecosystem === "elixir") {
    return {
      shouldPrompt: false,
      mode: "single",
      options: [],
      autoValue: "none",
    };
  }

  if (context.ecosystem && context.ecosystem !== "typescript") {
    return context.caching !== undefined
      ? {
          shouldPrompt: false,
          mode: "single",
          options: NON_TS_CACHING_PROMPT_OPTIONS,
          autoValue: context.caching,
        }
      : {
          shouldPrompt: true,
          mode: "single",
          options: NON_TS_CACHING_PROMPT_OPTIONS,
          initialValue: "none",
        };
  }

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

export async function getCachingChoice(caching?: Caching, backend?: Backend, ecosystem?: Ecosystem) {
  const resolution = resolveCachingPrompt({ caching, backend, ecosystem });
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
