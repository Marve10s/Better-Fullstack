import { describe, expect, it } from "bun:test";

import type { CompatibilityInput } from "@/stack/compatibility";

import { createCliDefaultProjectConfigBase } from "@/config/defaults";
import { DATABASE_VALUES, ORM_VALUES } from "@/config/schemas";
import {
  analyzeStackCompatibility,
  getDatabaseOrmIncompatibility,
  getDisabledReason,
} from "@/stack/compatibility";
import {
  legacyProjectConfigToStackParts,
  parseStackPartSpecs,
  stackGraphToLegacyProjectConfigForEcosystem,
  validateStackParts,
} from "@/stack/stack-graph";
import { DEFAULT_STACK_SELECTION } from "@/stack/stack-translation";

const DRIZZLE = "Drizzle ORM does not support MongoDB";
const TYPEORM = "TypeORM does not support MongoDB in Better Fullstack";
const KYSELY = "Kysely does not support MongoDB";
const MIKROORM = "MikroORM does not support MongoDB in Better Fullstack";
const SEQUELIZE = "Sequelize does not support MongoDB";
const MONGOOSE = "Mongoose ORM requires MongoDB database";
const EDGEDB = "EdgeDB has its own built-in query builder and does not require an ORM";
const REDIS = "Redis is a key-value store and does not require an ORM";

// Every selected TypeScript database and ORM pair; `null` means the pair generates a data layer.
const PAIRS: Record<string, Record<string, string | null>> = {
  sqlite: {
    drizzle: null,
    prisma: null,
    mongoose: MONGOOSE,
    typeorm: null,
    kysely: null,
    mikroorm: null,
    sequelize: null,
  },
  postgres: {
    drizzle: null,
    prisma: null,
    mongoose: MONGOOSE,
    typeorm: null,
    kysely: null,
    mikroorm: null,
    sequelize: null,
  },
  mysql: {
    drizzle: null,
    prisma: null,
    mongoose: MONGOOSE,
    typeorm: null,
    kysely: null,
    mikroorm: null,
    sequelize: null,
  },
  mongodb: {
    drizzle: DRIZZLE,
    prisma: null,
    mongoose: null,
    typeorm: TYPEORM,
    kysely: KYSELY,
    mikroorm: MIKROORM,
    sequelize: SEQUELIZE,
  },
  edgedb: {
    drizzle: EDGEDB,
    prisma: EDGEDB,
    mongoose: MONGOOSE,
    typeorm: EDGEDB,
    kysely: EDGEDB,
    mikroorm: EDGEDB,
    sequelize: EDGEDB,
  },
  redis: {
    drizzle: REDIS,
    prisma: REDIS,
    mongoose: MONGOOSE,
    typeorm: REDIS,
    kysely: REDIS,
    mikroorm: REDIS,
    sequelize: REDIS,
  },
};

const REPLACEMENT_ORM: Record<string, { orm: string; label: string }> = {
  mongodb: { orm: "prisma", label: "Prisma" },
  edgedb: { orm: "none", label: "None" },
  redis: { orm: "none", label: "None" },
};

const REJECTED = Object.entries(PAIRS).flatMap(([database, orms]) =>
  Object.entries(orms).flatMap(([orm, reason]) => (reason ? [{ database, orm, reason }] : [])),
);

const graphIssues = (database: string, orm: string) =>
  validateStackParts(
    parseStackPartSpecs([
      "frontend:typescript:tanstack-router",
      "backend:typescript:hono",
      "backend.runtime:typescript:bun",
      `database:universal:${database}`,
      `backend.orm:typescript:${orm}`,
    ]),
  ).issues.map((issue) => issue.message);

describe("database and ORM pair compatibility", () => {
  it("judges every selected pair and leaves none or an unanswered side to other rules", () => {
    for (const database of DATABASE_VALUES) {
      for (const orm of ORM_VALUES) {
        const expected = database === "none" || orm === "none" ? null : PAIRS[database]![orm];
        expect(getDatabaseOrmIncompatibility(database, orm)).toBe(expected ?? null);
      }
      expect(getDatabaseOrmIncompatibility(database, undefined)).toBeNull();
    }
    expect(getDatabaseOrmIncompatibility(undefined, "mongoose")).toBeNull();
  });

  for (const { database, orm, reason } of REJECTED) {
    it(`resets, disables, and rejects ${database}/${orm} with one reason`, () => {
      const input: CompatibilityInput = {
        ...DEFAULT_STACK_SELECTION,
        webFrontend: ["tanstack-router"],
        backend: "hono",
        runtime: "bun",
        database,
        orm,
        dbSetup: "none",
        auth: "none",
      };
      expect(getDisabledReason(input, "orm", orm)).toBe(reason);

      const replacement = REPLACEMENT_ORM[database] ?? { orm: "drizzle", label: "Drizzle" };
      const analysis = analyzeStackCompatibility(input);
      expect(analysis.adjustedStack?.orm).toBe(replacement.orm);
      expect(analysis.changes).toContainEqual({
        category: "database",
        message: `ORM set to '${replacement.label}' (${reason})`,
      });

      const parts = legacyProjectConfigToStackParts({
        ...createCliDefaultProjectConfigBase("bun"),
        projectName: "pair",
        addons: [],
        database,
        orm,
        auth: "none",
      } as Parameters<typeof legacyProjectConfigToStackParts>[0]);
      expect(validateStackParts(parts).issues).toContainEqual(
        expect.objectContaining({ role: "orm", toolId: orm, message: reason }),
      );
    });
  }

  it("judges a backend-owned ORM against the primary database part", () => {
    expect(graphIssues("mongodb", "kysely")).toEqual([KYSELY]);
    expect(graphIssues("mongodb", "mongoose")).toEqual([]);
    expect(graphIssues("postgres", "kysely")).toEqual([]);
  });

  it("judges the ORM against the standalone database generation uses over a backend-owned one", () => {
    for (const [standalone, owned, issues] of [
      ["mongodb", "postgres", [KYSELY]],
      ["postgres", "mongodb", []],
    ] as const) {
      const parts = parseStackPartSpecs([
        "frontend:typescript:tanstack-router",
        "backend:typescript:hono",
        "backend.runtime:typescript:bun",
        `database:universal:${standalone}`,
        `backend.database:universal:${owned}`,
        "backend.orm:typescript:kysely",
      ]);
      const projected = stackGraphToLegacyProjectConfigForEcosystem(
        { ...createCliDefaultProjectConfigBase("bun"), projectName: "pair", stackParts: parts },
        "typescript",
      );
      expect(projected.database).toBe(standalone);
      expect(validateStackParts(parts).issues.map((issue) => issue.message)).toEqual([...issues]);
    }
  });

  it("judges the ORM against a mobile-owned database when generation uses it", () => {
    for (const [database, orm, issues] of [
      ["mongodb", "kysely", [KYSELY]],
      ["sqlite", "drizzle", []],
    ] as const) {
      const parts = parseStackPartSpecs([
        "backend:typescript:hono",
        "backend.runtime:typescript:bun",
        "mobile:react-native:native-bare",
        `mobile.database:universal:${database}`,
        `backend.orm:typescript:${orm}`,
      ]);
      const projected = stackGraphToLegacyProjectConfigForEcosystem(
        { ...createCliDefaultProjectConfigBase("bun"), projectName: "pair", stackParts: parts },
        "typescript",
      );
      expect(projected.database).toBe(database);
      expect(validateStackParts(parts).issues.map((issue) => issue.message)).toEqual([...issues]);
    }
  });

  it("requires a database for a backend-owned ORM in the graph", () => {
    const parts = parseStackPartSpecs([
      "frontend:typescript:tanstack-router",
      "backend:typescript:hono",
      "backend.runtime:typescript:bun",
      "backend.orm:typescript:mongoose",
    ]);
    expect(validateStackParts(parts).issues).toContainEqual(
      expect.objectContaining({ role: "orm", message: "ORM selection requires a database" }),
    );
  });

  it("keeps the ORM-free choice available for EdgeDB and Redis", () => {
    for (const database of ["edgedb", "redis"]) {
      const input: CompatibilityInput = {
        ...DEFAULT_STACK_SELECTION,
        database,
        orm: "none",
        dbSetup: "none",
        auth: "none",
      };
      expect(getDisabledReason(input, "orm", "none")).toBeNull();
      expect(analyzeStackCompatibility(input).adjustedStack?.orm ?? "none").toBe("none");
    }
    expect(
      getDisabledReason({ ...DEFAULT_STACK_SELECTION, database: "postgres" }, "orm", "none"),
    ).toBe("Database selection requires an ORM");
  });
});
