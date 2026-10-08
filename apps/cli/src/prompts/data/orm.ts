import type { PromptSingleResolution } from "@/prompts/core/prompt-contract";

import { DEFAULT_CONFIG } from "@/constants";
import { exitCancelled } from "@/presentation/errors";
import { isCancel, navigableSelect } from "@/prompts/core/navigable";
import {
  getAuthIncompatibility,
  getDatabaseOrmIncompatibility,
  type Auth,
  type Backend,
  type Database,
  type ORM,
  type Runtime,
} from "@/types";

const ormOptions = {
  drizzle: {
    value: "drizzle" as const,
    label: "Drizzle",
    hint: "Lightweight and performant TypeScript ORM",
  },
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
  auth?: Auth;
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

  if (context.orm !== undefined) {
    return {
      shouldPrompt: false,
      mode: "single",
      options: [],
      autoValue: context.orm,
    };
  }

  const options = Object.values(ormOptions).filter(
    (option) =>
      !getDatabaseOrmIncompatibility(context.database, option.value) &&
      !getAuthIncompatibility(
        context.auth,
        { ecosystem: "typescript", database: context.database, orm: option.value },
        { partial: true },
      ),
  );
  // EdgeDB and Redis bring their own client, so no ORM can pair with them.
  if (options.length === 0) {
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
  auth?: Auth,
) {
  const resolution = resolveORMPrompt({ orm, hasDatabase, database, backend, runtime, auth });
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
