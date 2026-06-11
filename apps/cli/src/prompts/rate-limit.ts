import type { Backend, RateLimit } from "../types";

import { exitCancelled } from "../utils/errors";
import type { PromptSingleResolution } from "./prompt-contract";
import { isCancel, navigableSelect } from "./navigable";

const RATE_LIMIT_PROMPT_OPTIONS = [
  {
    value: "arcjet" as const,
    label: "Arcjet",
    hint: "Bot detection, shield, and rate limiting for API routes",
  },
  {
    value: "upstash-ratelimit" as const,
    label: "Upstash Ratelimit",
    hint: "Redis-backed sliding-window rate limiting",
  },
  {
    value: "none" as const,
    label: "None",
    hint: "Skip rate limiting setup",
  },
];

type RateLimitPromptContext = {
  rateLimit?: RateLimit;
  backend?: Backend;
};

export function resolveRateLimitPrompt(
  context: RateLimitPromptContext = {},
): PromptSingleResolution<RateLimit> {
  if (context.backend === "none" || context.backend === "convex") {
    return {
      shouldPrompt: false,
      mode: "single",
      options: [],
      autoValue: "none",
    };
  }

  return context.rateLimit !== undefined
    ? {
        shouldPrompt: false,
        mode: "single",
        options: RATE_LIMIT_PROMPT_OPTIONS,
        autoValue: context.rateLimit,
      }
    : {
        shouldPrompt: true,
        mode: "single",
        options: RATE_LIMIT_PROMPT_OPTIONS,
        initialValue: "none",
      };
}

export async function getRateLimitChoice(rateLimit?: RateLimit, backend?: Backend) {
  const resolution = resolveRateLimitPrompt({ rateLimit, backend });
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<RateLimit>({
    message: "Select rate limiting solution",
    options: resolution.options,
    initialValue: resolution.initialValue as RateLimit,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}
