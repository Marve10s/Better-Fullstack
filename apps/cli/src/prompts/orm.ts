import type { Backend, Database, ORM, Runtime } from "../types";

import { DEFAULT_CONFIG } from "../constants";
import { exitCancelled } from "../utils/errors";
import type { PromptSingleResolution } from "./prompt-contract";
import { isCancel, navigableSelect } from "./navigable";

const ormOptions = {
  prisma: {
    value: "prisma" as const,
    label: "Prisma",
    hint: "Powerful, feature-rich ORM",
  },
  mongoose: {
    value: "mongoose" as const,
    label: "Mongoose",
    hint: "Elegant object modeling tool",
  },
  drizzle: {
    value: "drizzle" as const,
    label: "Drizzle",
    hint: "Lightweight and performant TypeScript ORM",
  },
  typeorm: {
    value: "typeorm" as const,
    label: "TypeORM",
    hint: "Traditional ORM with Active Record/Data Mapper",
  },
  kysely: {
    value: "kysely" as const,
    label: "Kysely",
    hint: "Type-safe SQL query builder",
  },
  mikroorm: {
    value: "mikroorm" as const,
    label: "MikroORM",
    hint: "Data Mapper ORM for DDD",
  },
  sequelize: {
    value: "sequelize" as const,
    label: "Sequelize",
    hint: "Mature ORM with wide adoption",
  },
};

type ORMPromptContext = {
  orm?: ORM;
  hasDatabase: boolean;
  database?: Database;
  backend?: Backend;
  runtime?: Runtime;
};

export function resolveORMPrompt(context: ORMPromptContext): PromptSingleResolution<ORM> {
  if (context.backend === "convex" || !context.hasDatabase) {
    return {
      shouldPrompt: false,
      mode: "single",
      options: [],
      autoValue: "none",
    };
  }

  if (context.database === "edgedb" || context.database === "redis") {
    return {
      shouldPrompt: false,
      mode: "single",
      options: [],
      autoValue: "none",
    };
  }

  if (context.orm !== undefined) {
    return {
      shouldPrompt: false,
      mode: "single",
      options: [],
      autoValue: context.orm,
    };
  }

  const options =
    context.database === "mongodb"
      ? [ormOptions.prisma, ormOptions.mongoose]
      : [
          ormOptions.drizzle,
          ormOptions.prisma,
          ormOptions.typeorm,
          ormOptions.kysely,
          ormOptions.mikroorm,
          ormOptions.sequelize,
        ];

  return {
    shouldPrompt: true,
    mode: "single",
    options,
    initialValue:
      context.database === "mongodb"
        ? "prisma"
        : context.runtime === "workers"
          ? "drizzle"
          : DEFAULT_CONFIG.orm,
  };
}

export async function getORMChoice(
  orm: ORM | undefined,
  hasDatabase: boolean,
  database?: Database,
  backend?: Backend,
  runtime?: Runtime,
) {
  const resolution = resolveORMPrompt({ orm, hasDatabase, database, backend, runtime });
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<ORM>({
    message: "Select ORM",
    options: resolution.options,
    initialValue: resolution.initialValue as ORM,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}
