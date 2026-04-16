import { describe, expect, it } from "bun:test";

import { processDatabaseDeps } from "../../src/processors/db-deps";
import { makeConfig } from "../_fixtures/config-factory";
import { createSeededVFS, getDeps } from "../_fixtures/vfs-factory";

function expectIncludesAll(actual: string[], expected: string[]): void {
  for (const item of expected) {
    expect(actual).toContain(item);
  }
}

describe("processDatabaseDeps", () => {
  it("does nothing for convex backends", () => {
    const vfs = createSeededVFS(["packages/db/package.json", "apps/web/package.json"]);

    processDatabaseDeps(
      vfs,
      makeConfig({
        backend: "convex",
      }),
    );

    expect(getDeps(vfs, "packages/db/package.json")).toEqual({ deps: [], devDeps: [] });
    expect(getDeps(vfs, "apps/web/package.json")).toEqual({ deps: [], devDeps: [] });
  });

  it("adds Prisma postgres neon dependencies and a web Prisma client", () => {
    const vfs = createSeededVFS(["packages/db/package.json", "apps/web/package.json"]);

    processDatabaseDeps(
      vfs,
      makeConfig({
        orm: "prisma",
        database: "postgres",
        dbSetup: "neon",
      }),
    );

    expectIncludesAll(getDeps(vfs, "packages/db/package.json").deps, [
      "@prisma/client",
      "@prisma/adapter-neon",
      "@neondatabase/serverless",
    ]);
    expect(getDeps(vfs, "packages/db/package.json").devDeps).toContain("prisma");
    expect(getDeps(vfs, "apps/web/package.json").deps).toEqual(["@prisma/client"]);
  });

  it("adds Prisma sqlite self-backend web driver dependencies", () => {
    const vfs = createSeededVFS(["packages/db/package.json", "apps/web/package.json"]);

    processDatabaseDeps(
      vfs,
      makeConfig({
        backend: "self",
        orm: "prisma",
        database: "sqlite",
      }),
    );

    expectIncludesAll(getDeps(vfs, "packages/db/package.json").deps, [
      "@prisma/client",
      "@prisma/adapter-libsql",
    ]);
    expectIncludesAll(getDeps(vfs, "apps/web/package.json").deps, [
      "@prisma/client",
      "@libsql/client",
    ]);
  });

  it("adds Prisma mongodb custom dependency entries", () => {
    const vfs = createSeededVFS(["packages/db/package.json", "apps/web/package.json"]);

    processDatabaseDeps(
      vfs,
      makeConfig({
        orm: "prisma",
        database: "mongodb",
      }),
    );

    expect(getDeps(vfs, "packages/db/package.json").deps).toContain("@prisma/client");
    expect(getDeps(vfs, "packages/db/package.json").devDeps).toContain("prisma");
    expect(getDeps(vfs, "apps/web/package.json").deps).toContain("@prisma/client");
  });

  it("adds Drizzle sqlite dependencies for db and web packages", () => {
    const vfs = createSeededVFS(["packages/db/package.json", "apps/web/package.json"]);

    processDatabaseDeps(
      vfs,
      makeConfig({
        orm: "drizzle",
        database: "sqlite",
      }),
    );

    expectIncludesAll(getDeps(vfs, "packages/db/package.json").deps, [
      "drizzle-orm",
      "@libsql/client",
      "libsql",
    ]);
    expect(getDeps(vfs, "packages/db/package.json").devDeps).toEqual(["drizzle-kit"]);
    expectIncludesAll(getDeps(vfs, "apps/web/package.json").deps, ["@libsql/client", "libsql"]);
  });

  it("adds Drizzle PlanetScale dependencies without mysql2", () => {
    const vfs = createSeededVFS(["packages/db/package.json"]);

    processDatabaseDeps(
      vfs,
      makeConfig({
        orm: "drizzle",
        database: "mysql",
        dbSetup: "planetscale",
      }),
    );

    const db = getDeps(vfs, "packages/db/package.json");
    expectIncludesAll(db.deps, ["drizzle-orm", "@planetscale/database"]);
    expect(db.deps).not.toContain("mysql2");
  });

  it("adds TypeORM postgres dependencies and typing support", () => {
    const vfs = createSeededVFS(["packages/db/package.json"]);

    processDatabaseDeps(
      vfs,
      makeConfig({
        orm: "typeorm",
        database: "postgres",
      }),
    );

    expectIncludesAll(getDeps(vfs, "packages/db/package.json").deps, [
      "typeorm",
      "reflect-metadata",
      "pg",
    ]);
    expect(getDeps(vfs, "packages/db/package.json").devDeps).toContain("@types/pg");
  });

  it("adds EdgeDB generator tooling", () => {
    const vfs = createSeededVFS(["packages/db/package.json"]);

    processDatabaseDeps(
      vfs,
      makeConfig({
        orm: "none",
        database: "edgedb",
      }),
    );

    expect(getDeps(vfs, "packages/db/package.json")).toEqual({
      deps: ["edgedb"],
      devDeps: ["@edgedb/generate"],
    });
  });

  it("switches Redis dependencies based on dbSetup", () => {
    const local = createSeededVFS(["packages/db/package.json"]);
    const upstash = createSeededVFS(["packages/db/package.json"]);

    processDatabaseDeps(
      local,
      makeConfig({
        orm: "none",
        database: "redis",
        dbSetup: "none",
      }),
    );
    processDatabaseDeps(
      upstash,
      makeConfig({
        orm: "none",
        database: "redis",
        dbSetup: "upstash",
      }),
    );

    expect(getDeps(local, "packages/db/package.json").deps).toEqual(["ioredis"]);
    expect(getDeps(upstash, "packages/db/package.json").deps).toEqual(["@upstash/redis"]);
  });
});
