import type { Backend, Logging } from "../types";

import { exitCancelled } from "../utils/errors";
import type { PromptSingleResolution } from "./prompt-contract";
import { isCancel, navigableSelect } from "./navigable";

const LOGGING_PROMPT_OPTIONS = [
  {
    value: "pino" as const,
    label: "Pino",
    hint: "Fast JSON logger with minimal overhead",
  },
  {
    value: "winston" as const,
    label: "Winston",
    hint: "Flexible logging library with multiple transports",
  },
  {
    value: "none" as const,
    label: "None",
    hint: "Skip logging framework setup",
  },
];

type LoggingPromptContext = {
  logging?: Logging;
  backend?: Backend;
};

export function resolveLoggingPrompt(
  context: LoggingPromptContext = {},
): PromptSingleResolution<Logging> {
  if (context.backend === "none" || context.backend === "convex") {
    return {
      shouldPrompt: false,
      mode: "single",
      options: [],
      autoValue: "none",
    };
  }

  return context.logging !== undefined
    ? {
        shouldPrompt: false,
        mode: "single",
        options: LOGGING_PROMPT_OPTIONS,
        autoValue: context.logging,
      }
    : {
        shouldPrompt: true,
        mode: "single",
        options: LOGGING_PROMPT_OPTIONS,
        initialValue: "none",
      };
}

export async function getLoggingChoice(logging?: Logging, backend?: Backend) {
  const resolution = resolveLoggingPrompt({ logging, backend });
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<Logging>({
    message: "Select logging framework",
    options: resolution.options,
    initialValue: resolution.initialValue as Logging,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}
