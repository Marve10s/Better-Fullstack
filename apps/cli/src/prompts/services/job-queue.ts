import type { PromptSingleResolution } from "@/prompts/core/prompt-contract";

import { exitCancelled } from "@/presentation/errors";
import { isCancel, navigableSelect } from "@/prompts/core/navigable";
import {
  getJobQueueIncompatibility,
  type Backend,
  type Database,
  type JobQueue,
  type Runtime,
} from "@/types";

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
    value: "pg-boss" as const,
    label: "pg-boss",
    hint: "PostgreSQL-backed job queue with a long-running worker",
  },
  {
    value: "upstash-qstash" as const,
    label: "Upstash QStash",
    hint: "Serverless HTTP job delivery with signed requests",
  },
  {
    value: "hatchet" as const,
    label: "Hatchet",
    hint: "Durable task orchestration with a hosted or self-hosted engine",
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
  runtime?: Runtime;
  database?: Database;
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

  const options = JOB_QUEUE_PROMPT_OPTIONS.filter(
    (option) => !getJobQueueIncompatibility(option.value, context),
  );

  return context.jobQueue !== undefined
    ? {
        shouldPrompt: false,
        mode: "single",
        options,
        autoValue: context.jobQueue,
      }
    : {
        shouldPrompt: true,
        mode: "single",
        options,
        initialValue: "none",
      };
}

export async function getJobQueueChoice(
  jobQueue?: JobQueue,
  backend?: Backend,
  runtime?: Runtime,
  database?: Database,
) {
  const resolution = resolveJobQueuePrompt({ jobQueue, backend, runtime, database });
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
