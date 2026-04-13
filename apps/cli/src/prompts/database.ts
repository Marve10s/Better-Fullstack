import type { Backend, Database, Runtime } from "../types";

import { DEFAULT_CONFIG } from "../constants";
import { exitCancelled } from "../utils/errors";
import type { PromptSingleResolution } from "./prompt-contract";
import { isCancel, navigableSelect } from "./navigable";

type DatabasePromptContext = {
  database?: Database;
  backend?: Backend;
  runtime?: Runtime;
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

  return {
    shouldPrompt: true,
    mode: "single",
    options: databaseOptions,
    initialValue: DEFAULT_CONFIG.database,
  };
}

export async function getDatabaseChoice(database?: Database, backend?: Backend, runtime?: Runtime) {
  const resolution = resolveDatabasePrompt({ database, backend, runtime });
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
