import { describe, expect, it } from "bun:test";

import type { CompatibilityInput } from "@/stack/compatibility";

import { createCliDefaultProjectConfigBase } from "@/config/defaults";
import {
  analyzeStackCompatibility,
  getBetterAuthDatabaseIncompatibility,
  getDisabledReason,
} from "@/stack/compatibility";
import {
  legacyProjectConfigToStackParts,
  parseStackPartSpecs,
  validateStackParts,
} from "@/stack/stack-graph";
import { DEFAULT_STACK_SELECTION } from "@/stack/stack-translation";

const BACKENDS = [
  { backend: "self-svelte", webFrontend: ["svelte"], runtime: "none", projectBackend: "self" },
  { backend: "hono", webFrontend: ["tanstack-router"], runtime: "bun", projectBackend: "hono" },
] as const;

// Pairs the builder resets because Better Auth has no adapter for them, with the shared reason.
const RESET = [
  { database: "edgedb", orm: "none", reason: "Better Auth has no EdgeDB adapter" },
  { database: "redis", orm: "none", reason: "Better Auth has no Redis adapter" },
  { database: "postgres", orm: "typeorm", reason: "Better Auth has no TypeORM adapter" },
  { database: "mysql", orm: "sequelize", reason: "Better Auth has no Sequelize adapter" },
  { database: "sqlite", orm: "mikroorm", reason: "Better Auth has no MikroORM adapter" },
] as const;

function graphIssues(overrides: Record<string, unknown>) {
  const config = {
    ...createCliDefaultProjectConfigBase("bun"),
    projectName: "auth",
    ...overrides,
  } as Parameters<typeof legacyProjectConfigToStackParts>[0];
  return validateStackParts(legacyProjectConfigToStackParts(config)).issues.map(
    (issue) => issue.message,
  );
}

function partIssues(specs: string[]) {
  return validateStackParts(parseStackPartSpecs(specs)).issues.map((issue) => issue.message);
}

describe("Better Auth database compatibility", () => {
  for (const { backend, webFrontend, runtime, projectBackend } of BACKENDS) {
    for (const { database, orm, reason } of RESET) {
      for (const auth of ["better-auth", "better-auth-organizations"] as const) {
        it(`rejects ${auth} with ${database}/${orm} on ${backend} everywhere with one reason`, () => {
          const input: CompatibilityInput = {
            ...DEFAULT_STACK_SELECTION,
            webFrontend: [...webFrontend],
            backend,
            runtime,
            database,
            orm,
            dbSetup: "none",
            auth,
          };

          expect(getDisabledReason(input, "auth", auth)).toBe(reason);

          const analysis = analyzeStackCompatibility(input);
          expect(analysis.adjustedStack?.auth).toBe("none");
          expect(analysis.changes).toContainEqual({
            category: "auth",
            message: `Auth set to 'None' (${reason})`,
          });

          expect(
            graphIssues({
              frontend: [...webFrontend],
              backend: projectBackend,
              runtime,
              database,
              orm,
              auth,
            }),
          ).toContain(reason);
        });
      }
    }
  }

  it("rejects a database Better Auth would only reach through a connection string", () => {
    for (const [database, label] of [
      ["sqlite", "SQLite"],
      ["postgres", "PostgreSQL"],
      ["mysql", "MySQL"],
      ["mongodb", "MongoDB"],
    ] as const) {
      const reason = `Better Auth needs a Drizzle, Prisma, Kysely, or Mongoose adapter for ${label}`;
      expect(getBetterAuthDatabaseIncompatibility("better-auth", { database, orm: "none" })).toBe(
        reason,
      );
      expect(
        graphIssues({
          backend: "hono",
          runtime: "bun",
          database,
          orm: "none",
          auth: "better-auth",
        }),
      ).toContain(reason);
    }
  });

  it("accepts every pair with a Better Auth adapter and the database-less mode", () => {
    const accepted = [
      { database: "sqlite", orm: "drizzle" },
      { database: "postgres", orm: "prisma" },
      { database: "mysql", orm: "kysely" },
      { database: "mongodb", orm: "mongoose" },
      { database: "mongodb", orm: "prisma" },
      { database: "none", orm: "none" },
    ] as const;

    for (const stack of accepted) {
      expect(getBetterAuthDatabaseIncompatibility("better-auth", stack)).toBeNull();
      expect(
        graphIssues({ backend: "hono", runtime: "bun", ...stack, auth: "better-auth" }).filter(
          (message) => message.startsWith("Better Auth"),
        ),
      ).toEqual([]);
    }
    expect(getBetterAuthDatabaseIncompatibility("clerk", { database: "edgedb" })).toBeNull();
  });

  it("judges only answered selections for partial input", () => {
    const partial = { partial: true };

    expect(getBetterAuthDatabaseIncompatibility("better-auth", {}, partial)).toBeNull();
    expect(
      getBetterAuthDatabaseIncompatibility("better-auth", { database: "sqlite" }, partial),
    ).toBeNull();
    expect(
      getBetterAuthDatabaseIncompatibility("better-auth", { orm: "none" }, partial),
    ).toBeNull();
    expect(
      getBetterAuthDatabaseIncompatibility("better-auth", { database: "edgedb" }, partial),
    ).toBe("Better Auth has no EdgeDB adapter");
    expect(getBetterAuthDatabaseIncompatibility("better-auth", { orm: "typeorm" }, partial)).toBe(
      "Better Auth has no TypeORM adapter",
    );
  });

  it("judges frontend- and mobile-owned Better Auth by the database and ORM the stack generates with", () => {
    const hono = ["backend:typescript:hono", "backend.runtime:typescript:bun"];
    const web = ["frontend:typescript:next", ...hono];

    expect(
      partIssues([...web, "database:universal:edgedb", "frontend.auth:typescript:better-auth"]),
    ).toContain("Better Auth has no EdgeDB adapter");
    expect(
      partIssues([...web, "database:universal:edgedb", "backend.auth:typescript:better-auth"]),
    ).toContain("Better Auth has no EdgeDB adapter");
    expect(
      partIssues([
        ...web,
        "database:universal:postgres",
        "backend.orm:typescript:typeorm",
        "frontend.auth:typescript:better-auth",
      ]),
    ).toContain("Better Auth has no TypeORM adapter");
    expect(
      partIssues([
        ...web,
        "database:universal:postgres",
        "backend.orm:typescript:drizzle",
        "frontend.auth:typescript:better-auth",
      ]),
    ).toEqual([]);

    const mobile = ["mobile:react-native:native-bare", ...hono, "backend.orm:typescript:drizzle"];
    expect(
      partIssues([...mobile, "database:universal:edgedb", "mobile.auth:react-native:better-auth"]),
    ).toContain("Better Auth has no EdgeDB adapter");
    expect(
      partIssues([...mobile, "database:universal:sqlite", "mobile.auth:react-native:better-auth"]),
    ).toEqual([]);
    // Without a TypeScript backend only auth clients are generated.
    expect(
      partIssues([
        "mobile:react-native:native-bare",
        "backend:go:gin",
        "database:universal:postgres",
        "mobile.auth:react-native:better-auth",
      ]),
    ).toEqual([]);
  });
});
