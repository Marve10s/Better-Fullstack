import { parseStackSelectionFromUrlRecord } from "@better-fullstack/types/stack-translation";
import { describe, expect, it } from "bun:test";

import { analyzeStackCompatibility, getDisabledReason } from "@/components/stack-builder/utils";
import { DEFAULT_STACK } from "@/lib/stack/constant";
import { generateStackCommand } from "@/lib/stack/stack-utils";

const RESET = [
  { database: "mongodb", orm: "kysely", to: "prisma", reason: "Kysely does not support MongoDB" },
  {
    database: "mongodb",
    orm: "drizzle",
    to: "prisma",
    reason: "Drizzle ORM does not support MongoDB",
  },
  {
    database: "postgres",
    orm: "mongoose",
    to: "drizzle",
    reason: "Mongoose ORM requires MongoDB database",
  },
  {
    database: "redis",
    orm: "drizzle",
    to: "none",
    reason: "Redis is a key-value store and does not require an ORM",
  },
  {
    database: "edgedb",
    orm: "prisma",
    to: "none",
    reason: "EdgeDB has its own built-in query builder and does not require an ORM",
  },
] as const;

describe("builder database and ORM pairing", () => {
  for (const { database, orm, to, reason } of RESET) {
    it(`disables ${orm} for ${database} and resets a shared ${database}/${orm} URL with the same reason`, () => {
      const base = { ...DEFAULT_STACK, auth: "none", database, orm: to };
      expect(getDisabledReason(base, "orm", orm)).toBe(reason);
      expect(getDisabledReason(base, "orm", to)).toBeNull();

      const shared = {
        ...DEFAULT_STACK,
        ...parseStackSelectionFromUrlRecord({ db: database, orm, au: "none" }),
      };
      expect(shared.database).toBe(database);
      expect(shared.orm).toBe(orm);

      const analysis = analyzeStackCompatibility(shared);
      expect(analysis.adjustedStack?.orm).toBe(to);
      expect(analysis.changes).toContainEqual({
        category: "database",
        message: `ORM set to '${to === "none" ? "None" : to === "prisma" ? "Prisma" : "Drizzle"}' (${reason})`,
      });
      expect(generateStackCommand({ ...shared, ...analysis.adjustedStack })).toContain(
        `--orm ${to}`,
      );
    });
  }
});
