import type { Backend, DatabaseSetup, ORM, Runtime } from "../types";

import { exitCancelled } from "../utils/errors";
import type { PromptSingleResolution } from "./prompt-contract";
import { isCancel, navigableSelect } from "./navigable";

type DBSetupPromptContext = {
  databaseType: string;
  dbSetup?: DatabaseSetup;
  orm?: ORM;
  backend?: Backend;
  runtime?: Runtime;
};

export function resolveDBSetupPrompt(
  context: DBSetupPromptContext,
): PromptSingleResolution<DatabaseSetup> {
  if (context.backend === "convex") {
    return {
      shouldPrompt: false,
      mode: "single",
      options: [],
      autoValue: "none",
    };
  }

  if (context.dbSetup !== undefined) {
    return {
      shouldPrompt: false,
      mode: "single",
      options: [],
      autoValue: context.dbSetup,
    };
  }

  if (context.databaseType === "none") {
    return {
      shouldPrompt: false,
      mode: "single",
      options: [],
      autoValue: "none",
    };
  }

  let options: Array<{ value: DatabaseSetup; label: string; hint: string }> = [];

  if (context.databaseType === "sqlite") {
    options = [
      {
        value: "turso" as const,
        label: "Turso",
        hint: "SQLite for Production. Powered by libSQL",
      },
      ...(context.runtime === "workers"
        ? [
            {
              value: "d1" as const,
              label: "Cloudflare D1",
              hint: "Cloudflare's managed, serverless database with SQLite's SQL semantics",
            },
          ]
        : []),
      { value: "none" as const, label: "None", hint: "Manual setup" },
    ];
  } else if (context.databaseType === "postgres") {
    options = [
      {
        value: "neon" as const,
        label: "Neon Postgres",
        hint: "Serverless Postgres with branching capability",
      },
      {
        value: "planetscale" as const,
        label: "PlanetScale",
        hint: "Postgres & Vitess (MySQL) on NVMe",
      },
      {
        value: "supabase" as const,
        label: "Supabase",
        hint: "Local Supabase stack (requires Docker)",
      },
      {
        value: "prisma-postgres" as const,
        label: "Prisma Postgres",
        hint: "Instant Postgres for Global Applications",
      },
      {
        value: "docker" as const,
        label: "Docker",
        hint: "Run locally with docker compose",
      },
      { value: "none" as const, label: "None", hint: "Manual setup" },
    ];
  } else if (context.databaseType === "mysql") {
    options = [
      {
        value: "planetscale" as const,
        label: "PlanetScale",
        hint: "MySQL on Vitess (NVMe, HA)",
      },
      {
        value: "docker" as const,
        label: "Docker",
        hint: "Run locally with docker compose",
      },
      { value: "none" as const, label: "None", hint: "Manual setup" },
    ];
  } else if (context.databaseType === "mongodb") {
    options = [
      {
        value: "mongodb-atlas" as const,
        label: "MongoDB Atlas",
        hint: "The most effective way to deploy MongoDB",
      },
      {
        value: "docker" as const,
        label: "Docker",
        hint: "Run locally with docker compose",
      },
      { value: "none" as const, label: "None", hint: "Manual setup" },
    ];
  } else if (context.databaseType === "redis") {
    options = [
      {
        value: "upstash" as const,
        label: "Upstash",
        hint: "Serverless Redis with REST API",
      },
      {
        value: "docker" as const,
        label: "Docker",
        hint: "Run locally with docker compose",
      },
      { value: "none" as const, label: "None", hint: "Manual setup" },
    ];
  } else {
    return {
      shouldPrompt: false,
      mode: "single",
      options: [],
      autoValue: "none",
    };
  }

  return {
    shouldPrompt: true,
    mode: "single",
    options,
    initialValue: "none",
  };
}

export async function getDBSetupChoice(
  databaseType: string,
  dbSetup: DatabaseSetup | undefined,
  _orm?: ORM,
  backend?: Backend,
  runtime?: Runtime,
) {
  const resolution = resolveDBSetupPrompt({
    databaseType,
    dbSetup,
    orm: _orm,
    backend,
    runtime,
  });
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<DatabaseSetup>({
    message: `Select ${databaseType} setup option`,
    options: resolution.options,
    initialValue: resolution.initialValue as DatabaseSetup,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}
