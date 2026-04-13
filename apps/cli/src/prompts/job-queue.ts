import type { Backend, JobQueue } from "../types";

import { exitCancelled } from "../utils/errors";
import type { PromptSingleResolution } from "./prompt-contract";
import { isCancel, navigableSelect } from "./navigable";

const JOB_QUEUE_PROMPT_OPTIONS = [
  {
    value: "bullmq" as const,
    label: "BullMQ",
    hint: "Redis-backed job queue for background tasks and scheduling",
  },
  {
    value: "trigger-dev" as const,
    label: "Trigger.dev",
    hint: "Background jobs as code with serverless execution",
  },
  {
    value: "inngest" as const,
    label: "Inngest",
    hint: "Event-driven functions with built-in queuing and scheduling",
  },
  {
    value: "temporal" as const,
    label: "Temporal",
    hint: "Durable workflow orchestration for reliable distributed systems",
  },
  {
    value: "none" as const,
    label: "None",
    hint: "Skip job queue/background worker setup",
  },
];

type JobQueuePromptContext = {
  jobQueue?: JobQueue;
  backend?: Backend;
};

export function resolveJobQueuePrompt(
  context: JobQueuePromptContext = {},
): PromptSingleResolution<JobQueue> {
  if (context.backend === "none" || context.backend === "convex") {
    return {
      shouldPrompt: false,
      mode: "single",
      options: [],
      autoValue: "none",
    };
  }

  return context.jobQueue !== undefined
    ? {
        shouldPrompt: false,
        mode: "single",
        options: JOB_QUEUE_PROMPT_OPTIONS,
        autoValue: context.jobQueue,
      }
    : {
        shouldPrompt: true,
        mode: "single",
        options: JOB_QUEUE_PROMPT_OPTIONS,
        initialValue: "none",
      };
}

export async function getJobQueueChoice(jobQueue?: JobQueue, backend?: Backend) {
  const resolution = resolveJobQueuePrompt({ jobQueue, backend });
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<JobQueue>({
    message: "Select job queue solution",
    options: resolution.options,
    initialValue: resolution.initialValue as JobQueue,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}
