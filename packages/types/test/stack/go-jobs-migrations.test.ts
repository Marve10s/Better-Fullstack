import { describe, expect, it } from "bun:test";

import { analyzeStackCompatibility, getDisabledReason } from "@/stack/compatibility";
import {
  getGoMessageQueueIncompatibility,
  getGoMigrationsIncompatibility,
  parseStackPartSpecs,
  validateStackParts,
} from "@/stack/stack-graph";
import {
  DEFAULT_STACK_SELECTION,
  createStackSelectionSearchParams,
  generateStackSelectionCommand,
  parseStackSelectionFromUrlRecord,
} from "@/stack/stack-translation";

const GO_STACK = {
  ...DEFAULT_STACK_SELECTION,
  ecosystem: "go" as const,
  goWebFramework: "gin",
  goOrm: "gorm",
  database: "postgres",
};

const RIVER_REASON = "River requires PostgreSQL";
const ATLAS_SQLC_REASON = "Atlas loads the sqlc schema, which is PostgreSQL-only";

function graphIssues(specs: string[]) {
  return validateStackParts(parseStackPartSpecs(specs)).issues.map((issue) => issue.message);
}

describe("Go background jobs and migrations compatibility", () => {
  it("restricts River to PostgreSQL and both job options to wired HTTP servers", () => {
    expect(getGoMessageQueueIncompatibility("river", GO_STACK)).toBeNull();
    expect(getGoMessageQueueIncompatibility("river", { ...GO_STACK, database: "sqlite" })).toBe(
      RIVER_REASON,
    );
    expect(getGoMessageQueueIncompatibility("gocron", { ...GO_STACK, database: "mysql" })).toBeNull();
    for (const goWebFramework of ["go-zero", "kratos", "httprouter", "none"]) {
      expect(getGoMessageQueueIncompatibility("gocron", { ...GO_STACK, goWebFramework })).toBe(
        "gocron is wired for Gin, Echo, Fiber, Chi, and net/http servers",
      );
    }
    expect(getGoMessageQueueIncompatibility("asynq", { database: "none" })).toBeNull();
  });

  it("restricts Go migrations to relational databases and Atlas with sqlc to PostgreSQL", () => {
    for (const goMigrations of ["golang-migrate", "goose", "atlas"]) {
      expect(getGoMigrationsIncompatibility(goMigrations, { database: "mongodb" })).toBe(
        "Go migrations require SQLite, PostgreSQL, or MySQL",
      );
    }
    expect(getGoMigrationsIncompatibility("atlas", { database: "mysql", goOrm: "sqlc" })).toBe(
      ATLAS_SQLC_REASON,
    );
    for (const goOrm of ["gorm", "ent", "bun", "sqlx", "none"]) {
      expect(getGoMigrationsIncompatibility("atlas", { database: "mysql", goOrm })).toBeNull();
    }
    expect(getGoMigrationsIncompatibility("goose", { database: "sqlite", goOrm: "sqlc" })).toBeNull();
  });

  it("gives the builder the same reasons in both selection directions", () => {
    expect(getDisabledReason({ ...GO_STACK, database: "sqlite" }, "goMessageQueue", "river")).toBe(
      RIVER_REASON,
    );
    expect(getDisabledReason({ ...GO_STACK, goMessageQueue: "river" }, "database", "sqlite")).toBe(
      RIVER_REASON,
    );
    expect(
      getDisabledReason({ ...GO_STACK, goMessageQueue: "gocron" }, "goWebFramework", "kratos"),
    ).toBe("gocron is wired for Gin, Echo, Fiber, Chi, and net/http servers");
    expect(
      getDisabledReason({ ...GO_STACK, goOrm: "sqlc", database: "mysql" }, "goMigrations", "atlas"),
    ).toBe(ATLAS_SQLC_REASON);
    expect(
      getDisabledReason({ ...GO_STACK, goMigrations: "atlas", database: "mysql" }, "goOrm", "sqlc"),
    ).toBe(ATLAS_SQLC_REASON);
    expect(getDisabledReason(GO_STACK, "goMessageQueue", "river")).toBeNull();
    expect(getDisabledReason(GO_STACK, "goMigrations", "goose")).toBeNull();
  });

  it("clears an unsupported job or migration choice when another selection changes", () => {
    const result = analyzeStackCompatibility({
      ...GO_STACK,
      database: "sqlite",
      goOrm: "sqlc",
      goMessageQueue: "river",
      goMigrations: "atlas",
    });
    expect(result.adjustedStack?.goMessageQueue).toBe("none");
    expect(result.adjustedStack?.goMigrations).toBe("none");
    expect(result.changes.map((change) => change.message)).toEqual(
      expect.arrayContaining([
        `Go message queue set to 'None' (${RIVER_REASON})`,
        `Go migrations set to 'None' (${ATLAS_SQLC_REASON})`,
      ]),
    );
  });

  it("rejects the same combinations in the stack graph", () => {
    expect(
      graphIssues(["backend:go:gin", "backend.jobQueue:go:river", "database:universal:sqlite"]),
    ).toContain(RIVER_REASON);
    expect(
      graphIssues(["backend:go:kratos", "backend.jobQueue:go:gocron", "database:universal:sqlite"]),
    ).toContain("gocron is wired for Gin, Echo, Fiber, Chi, and net/http servers");
    expect(
      graphIssues([
        "backend:go:gin",
        "backend.orm:go:sqlc",
        "backend.migrations:go:atlas",
        "database:universal:mysql",
      ]),
    ).toContain(ATLAS_SQLC_REASON);
    expect(graphIssues(["backend:go:chi", "backend.migrations:go:goose"])).toContain(
      "Go migrations require SQLite, PostgreSQL, or MySQL",
    );
    expect(
      graphIssues([
        "backend:go:echo",
        "backend.orm:go:sqlc",
        "backend.jobQueue:go:river",
        "backend.migrations:go:atlas",
        "database:universal:postgres",
      ]),
    ).toEqual([]);
  });

  it("round-trips the new values through builder URLs and the reproducible command", () => {
    const selection = { ...GO_STACK, goMessageQueue: "river", goMigrations: "goose" };
    const params = Object.fromEntries(createStackSelectionSearchParams(selection));
    const parsed = parseStackSelectionFromUrlRecord(params);
    expect(parsed.goMessageQueue).toBe("river");
    expect(parsed.goMigrations).toBe("goose");

    const command = generateStackSelectionCommand({
      ...parsed,
      projectName: "go-jobs",
      goMessageQueue: "gocron",
      goMigrations: "atlas",
    });
    expect(command).toContain("--go-message-queue gocron");
    expect(command).toContain("--go-migrations atlas");
  });
});
