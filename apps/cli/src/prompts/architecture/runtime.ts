import type { PromptOption, PromptSingleResolution } from "@/prompts/core/prompt-contract";

import { DEFAULT_CONFIG } from "@/constants";
import { exitCancelled } from "@/presentation/errors";
import { isCancel, navigableSelect } from "@/prompts/core/navigable";
import { getJobQueueIncompatibility, type Backend, type JobQueue, type Runtime } from "@/types";

const RUNTIME_PROMPT_OPTIONS: PromptOption<Runtime>[] = [
  {
    value: "bun",
    label: "Bun",
    hint: "Fast all-in-one JavaScript runtime",
  },
  {
    value: "node",
    label: "Node.js",
    hint: "Traditional Node.js runtime",
  },
  {
    value: "workers",
    label: "Cloudflare Workers",
    hint: "Edge runtime on Cloudflare's global network",
  },
];

type RuntimePromptContext = {
  runtime?: Runtime;
  backend?: Backend;
  jobQueue?: JobQueue;
};

export function resolveRuntimePrompt(
  context: RuntimePromptContext = {},
): PromptSingleResolution<Runtime> {
  if (context.backend === "convex" || context.backend === "none" || context.backend === "self") {
    return {
      shouldPrompt: false,
      mode: "single",
      options: [],
      autoValue: "none",
    };
  }

  const options = RUNTIME_PROMPT_OPTIONS.filter(
    (option) =>
      (option.value !== "workers" || context.backend === "hono") &&
      !getJobQueueIncompatibility(context.jobQueue, { runtime: option.value }, { partial: true }),
  );

  return context.runtime !== undefined
    ? {
        shouldPrompt: false,
        mode: "single",
        options,
        autoValue: context.runtime,
      }
    : {
        shouldPrompt: true,
        mode: "single",
        options,
        initialValue: DEFAULT_CONFIG.runtime,
      };
}

export async function getRuntimeChoice(runtime?: Runtime, backend?: Backend, jobQueue?: JobQueue) {
  const resolution = resolveRuntimePrompt({ runtime, backend, jobQueue });
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<Runtime>({
    message: "Select runtime",
    options: resolution.options,
    initialValue: resolution.initialValue as Runtime,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}
