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

  it("adds Prisma mysql, postgres, and d1 adapter branches", () => {
    const planetscale = createSeededVFS(["packages/db/package.json"]);
    const postgres = createSeededVFS(["packages/db/package.json", "apps/web/package.json"]);
    const d1 = createSeededVFS(["packages/db/package.json", "apps/web/package.json"]);

    processDatabaseDeps(
      planetscale,
      makeConfig({
        orm: "prisma",
        database: "mysql",
        dbSetup: "planetscale",
      }),
    );
    processDatabaseDeps(
      postgres,
      makeConfig({
        orm: "prisma",
        database: "postgres",
        dbSetup: "none",
      }),
    );
    processDatabaseDeps(
      d1,
      makeConfig({
        orm: "prisma",
        database: "sqlite",
        dbSetup: "d1",
      }),
    );

    expectIncludesAll(getDeps(planetscale, "packages/db/package.json").deps, [
      "@prisma/client",
      "@prisma/adapter-planetscale",
      "@planetscale/database",
    ]);
    expect(getDeps(planetscale, "packages/db/package.json").deps).not.toContain(
      "@prisma/adapter-mariadb",
    );

    expectIncludesAll(getDeps(postgres, "packages/db/package.json").deps, [
      "@prisma/client",
      "@prisma/adapter-pg",
      "pg",
    ]);
    expect(getDeps(postgres, "packages/db/package.json").devDeps).toContain("@types/pg");
    expect(getDeps(postgres, "apps/web/package.json").deps).toEqual(["@prisma/client"]);

    expectIncludesAll(getDeps(d1, "packages/db/package.json").deps, [
      "@prisma/client",
      "@prisma/adapter-d1",
    ]);
    expect(getDeps(d1, "packages/db/package.json").deps).not.toContain("@prisma/adapter-libsql");
    expect(getDeps(d1, "apps/web/package.json").deps).toEqual(["@prisma/client"]);
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

  it("adds Drizzle postgres dependencies for neon and node drivers", () => {
    const neon = createSeededVFS(["packages/db/package.json"]);
    const local = createSeededVFS(["packages/db/package.json"]);

    processDatabaseDeps(
      neon,
      makeConfig({
        orm: "drizzle",
        database: "postgres",
        dbSetup: "neon",
      }),
    );
    processDatabaseDeps(
      local,
      makeConfig({
        orm: "drizzle",
        database: "postgres",
        dbSetup: "none",
      }),
    );

    expectIncludesAll(getDeps(neon, "packages/db/package.json").deps, [
      "drizzle-orm",
      "@neondatabase/serverless",
    ]);
    expect(getDeps(neon, "packages/db/package.json").devDeps).toEqual(["drizzle-kit"]);

    expectIncludesAll(getDeps(local, "packages/db/package.json").deps, ["drizzle-orm", "pg"]);
    expect(getDeps(local, "packages/db/package.json").devDeps).toEqual([
      "@types/pg",
      "drizzle-kit",
    ]);
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

  it("adds TypeORM, Kysely, MikroORM, and Sequelize driver branches for other databases", () => {
    const typeormSqlite = createSeededVFS(["packages/db/package.json"]);
    const kyselyMysql = createSeededVFS(["packages/db/package.json"]);
    const mikroPostgres = createSeededVFS(["packages/db/package.json"]);
    const sequelizeMysql = createSeededVFS(["packages/db/package.json"]);
    const mongoose = createSeededVFS(["packages/db/package.json"]);

    processDatabaseDeps(
      typeormSqlite,
      makeConfig({
        orm: "typeorm",
        database: "sqlite",
      }),
    );
    processDatabaseDeps(
      kyselyMysql,
      makeConfig({
        orm: "kysely",
        database: "mysql",
      }),
    );
    processDatabaseDeps(
      mikroPostgres,
      makeConfig({
        orm: "mikroorm",
        database: "postgres",
      }),
    );
    processDatabaseDeps(
      sequelizeMysql,
      makeConfig({
        orm: "sequelize",
        database: "mysql",
      }),
    );
    processDatabaseDeps(
      mongoose,
      makeConfig({
        orm: "mongoose",
        database: "mongodb",
      }),
    );

    expectIncludesAll(getDeps(typeormSqlite, "packages/db/package.json").deps, [
      "typeorm",
      "reflect-metadata",
      "better-sqlite3",
    ]);
    expect(getDeps(typeormSqlite, "packages/db/package.json").devDeps).toEqual([
      "@types/better-sqlite3",
    ]);

    expectIncludesAll(getDeps(kyselyMysql, "packages/db/package.json").deps, [
      "kysely",
      "mysql2",
    ]);
    expect(getDeps(kyselyMysql, "packages/db/package.json").devDeps).toEqual([]);

    expectIncludesAll(getDeps(mikroPostgres, "packages/db/package.json").deps, [
      "@mikro-orm/core",
      "@mikro-orm/postgresql",
    ]);

    expectIncludesAll(getDeps(sequelizeMysql, "packages/db/package.json").deps, [
      "sequelize",
      "sequelize-typescript",
      "mysql2",
    ]);

    expect(getDeps(mongoose, "packages/db/package.json").deps).toEqual(["mongoose"]);
  });

  it("adds the remaining Kysely, MikroORM, Sequelize, and TypeORM database driver branches", () => {
    const typeormMysql = createSeededVFS(["packages/db/package.json"]);
    const kyselySqlite = createSeededVFS(["packages/db/package.json"]);
    const kyselyPostgres = createSeededVFS(["packages/db/package.json"]);
    const mikroSqlite = createSeededVFS(["packages/db/package.json"]);
    const mikroMysql = createSeededVFS(["packages/db/package.json"]);
    const sequelizeSqlite = createSeededVFS(["packages/db/package.json"]);
    const sequelizePostgres = createSeededVFS(["packages/db/package.json"]);

    processDatabaseDeps(
      typeormMysql,
      makeConfig({
        orm: "typeorm",
        database: "mysql",
      }),
    );
    processDatabaseDeps(
      kyselySqlite,
      makeConfig({
        orm: "kysely",
        database: "sqlite",
      }),
    );
    processDatabaseDeps(
      kyselyPostgres,
      makeConfig({
        orm: "kysely",
        database: "postgres",
      }),
    );
    processDatabaseDeps(
      mikroSqlite,
      makeConfig({
        orm: "mikroorm",
        database: "sqlite",
      }),
    );
    processDatabaseDeps(
      mikroMysql,
      makeConfig({
        orm: "mikroorm",
        database: "mysql",
      }),
    );
    processDatabaseDeps(
      sequelizeSqlite,
      makeConfig({
        orm: "sequelize",
        database: "sqlite",
      }),
    );
    processDatabaseDeps(
      sequelizePostgres,
      makeConfig({
        orm: "sequelize",
        database: "postgres",
      }),
    );

    expectIncludesAll(getDeps(typeormMysql, "packages/db/package.json").deps, [
      "typeorm",
      "reflect-metadata",
      "mysql2",
    ]);

    expectIncludesAll(getDeps(kyselySqlite, "packages/db/package.json").deps, [
      "kysely",
      "better-sqlite3",
    ]);
    expect(getDeps(kyselySqlite, "packages/db/package.json").devDeps).toEqual([
      "@types/better-sqlite3",
    ]);

    expectIncludesAll(getDeps(kyselyPostgres, "packages/db/package.json").deps, [
      "kysely",
      "pg",
    ]);
    expect(getDeps(kyselyPostgres, "packages/db/package.json").devDeps).toEqual(["@types/pg"]);

    expectIncludesAll(getDeps(mikroSqlite, "packages/db/package.json").deps, [
      "@mikro-orm/core",
      "@mikro-orm/better-sqlite",
    ]);
    expectIncludesAll(getDeps(mikroMysql, "packages/db/package.json").deps, [
      "@mikro-orm/core",
      "@mikro-orm/mysql",
    ]);

    expectIncludesAll(getDeps(sequelizeSqlite, "packages/db/package.json").deps, [
      "sequelize",
      "sequelize-typescript",
      "sqlite3",
    ]);
    expectIncludesAll(getDeps(sequelizePostgres, "packages/db/package.json").deps, [
      "sequelize",
      "sequelize-typescript",
      "pg",
    ]);
    expect(getDeps(sequelizePostgres, "packages/db/package.json").devDeps).toEqual(["@types/pg"]);
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
