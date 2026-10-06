import type { PromptSingleResolution } from "@/prompts/core/prompt-contract";

import { DEFAULT_CONFIG } from "@/constants";
import { exitCancelled } from "@/presentation/errors";
import { isCancel, navigableSelect } from "@/prompts/core/navigable";
import {
  getAuthIncompatibility,
  getJobQueueIncompatibility,
  type Auth,
  type Backend,
  type Database,
  type JobQueue,
  type Runtime,
} from "@/types";

type DatabasePromptContext = {
  database?: Database;
  backend?: Backend;
  runtime?: Runtime;
  jobQueue?: JobQueue;
  auth?: Auth;
};

export function resolveDatabasePrompt(
  context: DatabasePromptContext = {},
): PromptSingleResolution<Database> {
  if (context.backend === "convex" || context.backend === "none") {
    return {
      shouldPrompt: false,
      mode: "single",
      options: [],
      autoValue: "none",
    };
  }

  if (context.database !== undefined) {
    return {
      shouldPrompt: false,
      mode: "single",
      options: [],
      autoValue: context.database,
    };
  }

  const databaseOptions: Array<{
    value: Database;
    label: string;
    hint: string;
  }> = [
    {
      value: "none",
      label: "None",
      hint: "No database setup",
    },
    {
      value: "sqlite",
      label: "SQLite",
      hint: "lightweight, server-less, embedded relational database",
    },
    {
      value: "postgres",
      label: "PostgreSQL",
      hint: "powerful, open source object-relational database system",
    },
    {
      value: "mysql",
      label: "MySQL",
      hint: "popular open-source relational database system",
    },
  ];

  if (context.runtime !== "workers") {
    databaseOptions.push({
      value: "mongodb",
      label: "MongoDB",
      hint: "open-source NoSQL database that stores data in JSON-like documents called BSON",
    });
    databaseOptions.push({
      value: "edgedb",
      label: "EdgeDB",
      hint: "graph-relational database with built-in query builder (no ORM needed)",
    });
    databaseOptions.push({
      value: "redis",
      label: "Redis",
      hint: "in-memory data store for caching, sessions, and real-time features",
    });
  }

  const options = databaseOptions.filter(
    (option) =>
      !getJobQueueIncompatibility(
        context.jobQueue,
        { database: option.value },
        { partial: true },
      ) &&
      !getAuthIncompatibility(
        context.auth,
        { ecosystem: "typescript", database: option.value },
        { partial: true },
      ),
  );

  return {
    shouldPrompt: true,
    mode: "single",
    options,
    initialValue: options.some((option) => option.value === DEFAULT_CONFIG.database)
      ? DEFAULT_CONFIG.database
      : options[0]?.value,
  };
}

export async function getDatabaseChoice(
  database?: Database,
  backend?: Backend,
  runtime?: Runtime,
  jobQueue?: JobQueue,
  auth?: Auth,
) {
  const resolution = resolveDatabasePrompt({ database, backend, runtime, jobQueue, auth });
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<Database>({
    message: "Select database",
    options: resolution.options,
    initialValue: resolution.initialValue as Database,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}
