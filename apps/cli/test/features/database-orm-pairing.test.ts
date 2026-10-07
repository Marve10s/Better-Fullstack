import { EMBEDDED_TEMPLATES, generateVirtualProject } from "@better-fullstack/template-generator";
import { writeTreeToFilesystem } from "@better-fullstack/template-generator/fs-writer";
import {
  createCliDefaultProjectConfigBase,
  formatStackPartSpec,
  legacyProjectConfigToStackParts,
  parseStackPartSpecs,
  type ProjectConfig,
} from "@better-fullstack/types";
import { createCustomConfig, expectError, runTRPCTest } from "@test/support/test-utils";
import { hasVirtualFile } from "@test/support/virtual-tree-utils";
import { afterAll, describe, expect, test } from "bun:test";
import { existsSync } from "node:fs";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { homedir, tmpdir } from "node:os";
import { join, resolve } from "node:path";

import { writeBtsConfig } from "@/config/bts-config";
import { planStackUpdate } from "@/helpers/core/stack-update";
import { createVirtual } from "@/index";
import { recordScaffoldManifest } from "@/lifecycle/scaffold-manifest";
import { planProjectOperation } from "@/operations/project-create";
import { planAdditionOperation, planStackUpdateOperation } from "@/operations/project-mutate";
import { buildProjectConfig } from "@/operations/stack-helpers";
import { resolveDatabasePrompt } from "@/prompts/data/database";
import { resolveORMPrompt } from "@/prompts/data/orm";

const CLI_ENTRY = resolve(import.meta.dir, "../../src/cli.ts");
const NATIVE_BUN = resolve(homedir(), ".bun", "bin", "bun");
const BUN_EXECUTABLE =
  process.env.BFS_TEST_BUN_BIN || (existsSync(NATIVE_BUN) ? NATIVE_BUN : "bun");
const TEMP_ROOTS: string[] = [];

afterAll(async () => {
  await Promise.all(TEMP_ROOTS.map((root) => rm(root, { recursive: true, force: true })));
});

const STACKS = {
  fullstack: { frontend: ["svelte"], backend: "self", runtime: "none", api: "orpc" },
  standalone: { frontend: ["tanstack-router"], backend: "hono", runtime: "bun", api: "trpc" },
} as const;

const REJECTED = [
  { database: "mongodb", orm: "drizzle", reason: "Drizzle ORM does not support MongoDB" },
  {
    database: "mongodb",
    orm: "typeorm",
    reason: "TypeORM does not support MongoDB in Better Fullstack",
  },
  { database: "mongodb", orm: "kysely", reason: "Kysely does not support MongoDB" },
  {
    database: "mongodb",
    orm: "mikroorm",
    reason: "MikroORM does not support MongoDB in Better Fullstack",
  },
  { database: "mongodb", orm: "sequelize", reason: "Sequelize does not support MongoDB" },
  { database: "postgres", orm: "mongoose", reason: "Mongoose ORM requires MongoDB database" },
  { database: "redis", orm: "mongoose", reason: "Mongoose ORM requires MongoDB database" },
  {
    database: "edgedb",
    orm: "prisma",
    reason: "EdgeDB has its own built-in query builder and does not require an ORM",
  },
  {
    database: "redis",
    orm: "drizzle",
    reason: "Redis is a key-value store and does not require an ORM",
  },
] as const;

function graphParts(stack: (typeof STACKS)[keyof typeof STACKS], database: string, orm: string) {
  return legacyProjectConfigToStackParts({
    ...createCliDefaultProjectConfigBase(),
    projectName: "pair",
    ...stack,
    frontend: [...stack.frontend],
    addons: [],
    database,
    orm,
    auth: "none",
  } as ProjectConfig);
}

// Runs the CLI with a temporary HOME so history reads and writes never touch the user's store.
async function runCli(args: string[], root: string) {
  const child = Bun.spawn([BUN_EXECUTABLE, CLI_ENTRY, ...args, "--disable-analytics"], {
    cwd: root,
    env: { ...Bun.env, HOME: root, BFS_SKIP_BUILDER_PROMPT: "1", CI: "true" },
    stdin: "ignore",
    stdout: "pipe",
    stderr: "pipe",
  });
  const [exitCode, stdout, stderr] = await Promise.all([
    child.exited,
    new Response(child.stdout).text(),
    new Response(child.stderr).text(),
  ]);
  return { exitCode, output: `${stdout}${stderr}` };
}

async function scaffoldProject(overrides: Partial<ProjectConfig>) {
  const root = await mkdtemp(join(tmpdir(), "bfs-db-orm-"));
  TEMP_ROOTS.push(root);
  const projectDir = join(root, "app");
  const config = {
    ...createCliDefaultProjectConfigBase(),
    ...STACKS.standalone,
    frontend: [...STACKS.standalone.frontend],
    addons: [],
    auth: "none",
    projectName: "app",
    projectDir,
    relativePath: ".",
    git: false,
    install: false,
    ...overrides,
  } as ProjectConfig;
  const result = await generateVirtualProject({ config, templates: EMBEDDED_TEMPLATES });
  if (!result.success || !result.tree) throw new Error(result.error ?? "Failed to generate");
  await writeTreeToFilesystem(result.tree, projectDir);
  await writeBtsConfig(config);
  await recordScaffoldManifest(projectDir);
  return projectDir;
}

const CASES = Object.entries(STACKS).flatMap(([stackName, stack]) =>
  REJECTED.map(({ database, orm, reason }) => ({
    label: `${stackName} ${database}/${orm}`,
    stack,
    options: { ...stack, frontend: [...stack.frontend], database, orm, auth: "none" },
    reason,
  })),
);

const databasesFor = (orm: "kysely" | "mongoose") =>
  resolveDatabasePrompt({ backend: "hono", runtime: "bun", orm }).options.map(
    (option) => option.value,
  );

const ormsFor = (database: "mongodb" | "postgres" | "redis") =>
  resolveORMPrompt({ hasDatabase: true, database });

describe("database and ORM pairing", () => {
  test("CLI flags reject every impossible pair with the shared reason", async () => {
    const results = await Promise.all(
      CASES.map(({ options }, index) =>
        runTRPCTest(createCustomConfig({ projectName: `pair-${index}`, ...options })),
      ),
    );
    for (const [index, { label, reason }] of CASES.entries()) {
      expectError(results[index]!, reason);
      expect(results[index]!.error, label).not.toContain(`${reason}.`);
    }
  });

  test("createVirtual rejects every impossible flat pair with the shared reason", async () => {
    const results = await Promise.all(CASES.map(({ options }) => createVirtual(options)));
    for (const [index, { label, reason }] of CASES.entries()) {
      expect(results[index], label).toEqual({ success: false, error: reason });
    }
  });

  test("createVirtual rejects every impossible pair in graph input with the shared reason", async () => {
    const results = await Promise.all(
      CASES.map(({ stack, options }) =>
        createVirtual({ stackParts: graphParts(stack, options.database, options.orm) }),
      ),
    );
    for (const [index, { label, reason }] of CASES.entries()) {
      expect(results[index], label).toEqual({ success: false, error: reason });
    }
  });

  test("MCP config construction and planning reject every impossible pair", async () => {
    for (const { stack, options, reason } of CASES) {
      expect(() => buildProjectConfig(options)).toThrow(reason);
      const parts = graphParts(stack, options.database, options.orm);
      const part = parts.map((candidate) => formatStackPartSpec(candidate, parts));
      expect(() => buildProjectConfig({ part })).toThrow(reason);
    }
    await Promise.all(
      CASES.map(({ options, reason }) =>
        expect(planProjectOperation.invoke(options)).rejects.toThrow(reason),
      ),
    );
  });

  test("graph input judges the ORM against the database generation uses", async () => {
    const createWithDatabases = (standalone: string, owned: string) =>
      createVirtual({
        stackParts: parseStackPartSpecs([
          "frontend:typescript:tanstack-router",
          "backend:typescript:hono",
          "backend.runtime:typescript:bun",
          "backend.api:typescript:trpc",
          `database:universal:${standalone}`,
          `backend.database:universal:${owned}`,
          "backend.orm:typescript:kysely",
        ]),
      });

    expect(await createWithDatabases("mongodb", "postgres")).toEqual({
      success: false,
      error: "Kysely does not support MongoDB",
    });
    const postgres = await createWithDatabases("postgres", "mongodb");
    expect(postgres.error).toBeUndefined();
    expect(hasVirtualFile(postgres.tree!.root, "packages/db/src/index.ts")).toBe(true);
  });

  test("native ecosystems ignore the inherited TypeScript ORM default", async () => {
    const native = [
      { ecosystem: "python", pythonWebFramework: "fastapi", pythonOrm: "pymongo" },
      { ecosystem: "rust", rustWebFramework: "axum", rustOrm: "mongodb" },
    ] as const;
    for (const selection of native) {
      const config = {
        ...createCliDefaultProjectConfigBase(),
        projectName: "native",
        frontend: [],
        backend: "none",
        runtime: "none",
        api: "none",
        auth: "none",
        addons: [],
        database: "mongodb",
        ...selection,
      } as ProjectConfig;
      const stackParts = legacyProjectConfigToStackParts(config);
      const part = stackParts.map((candidate) => formatStackPartSpec(candidate, stackParts));

      expect(config.orm, selection.ecosystem).toBe("drizzle");
      expect((await createVirtual(config)).error, selection.ecosystem).toBeUndefined();
      expect((await createVirtual({ stackParts })).error, selection.ecosystem).toBeUndefined();
      expect(() => buildProjectConfig(config)).not.toThrow();
      expect(() => buildProjectConfig({ part })).not.toThrow();
    }
  });

  test("a replayed pair is rejected before compatibility repair", async () => {
    const root = await mkdtemp(join(tmpdir(), "bfs-db-orm-replay-"));
    TEMP_ROOTS.push(root);
    const config = {
      ...createCliDefaultProjectConfigBase(),
      ...STACKS.standalone,
      frontend: [...STACKS.standalone.frontend],
      addons: [],
      auth: "none",
      projectName: "replayed",
      projectDir: root,
      relativePath: ".",
      database: "mongodb",
      orm: "kysely",
    } as ProjectConfig;
    await writeBtsConfig(config);
    const historyDir = join(root, "Library", "Application Support", "better-fullstack");
    await mkdir(historyDir, { recursive: true });
    await writeFile(
      join(historyDir, "history.json"),
      JSON.stringify({
        version: 1,
        entries: [
          {
            id: "replayed",
            projectName: "replayed",
            projectDir: root,
            createdAt: new Date(0).toISOString(),
            stack: { ...config, frontend: config.frontend },
            cliVersion: "0.0.0",
            reproducibleCommand: "",
            config: { ...config, version: "0.0.0", createdAt: new Date(0).toISOString() },
          },
        ],
      }),
    );

    const configArgs = ["--config", join(root, "bts.jsonc")];
    for (const args of [
      configArgs,
      ["--from-history", "1"],
      [...configArgs, "--database", "mongodb", "--orm", "kysely", "--runtime", "workers"],
    ]) {
      const { exitCode, output } = await runCli(
        ["create", "app", ...args, "--dry-run", "--no-install", "--no-git"],
        root,
      );
      expect({ args, exitCode }).toEqual({ args, exitCode: 1 });
      expect(output).toContain("Kysely does not support MongoDB");
      expect(output).not.toContain("ORM set to");
    }
  });

  test("programmatic and graph input require both sides of a TypeScript data layer", async () => {
    const missing = [
      { database: "none", orm: "mongoose", reason: "ORM selection requires a database" },
      { database: "postgres", orm: "none", reason: "Database selection requires an ORM" },
    ];
    for (const { database, orm, reason } of missing) {
      const options = {
        ...STACKS.standalone,
        frontend: [...STACKS.standalone.frontend],
        database,
        orm,
        auth: "none",
      };
      expect(await createVirtual(options)).toEqual({ success: false, error: reason });
      expect(() => buildProjectConfig(options)).toThrow(reason);
      await expect(planProjectOperation.invoke(options)).rejects.toThrow(reason);
    }

    const ormWithoutDatabase = parseStackPartSpecs([
      "frontend:typescript:tanstack-router",
      "backend:typescript:hono",
      "backend.runtime:typescript:bun",
      "backend.orm:typescript:mongoose",
    ]);
    const part = ormWithoutDatabase.map((candidate) =>
      formatStackPartSpec(candidate, ormWithoutDatabase),
    );
    expect(await createVirtual({ stackParts: ormWithoutDatabase })).toEqual({
      success: false,
      error: "ORM selection requires a database",
    });
    expect(() => buildProjectConfig({ part })).toThrow("ORM selection requires a database");

    // Other ecosystems keep their own data layer rules and ignore the TypeScript requirement.
    const python = {
      ecosystem: "python",
      database: "postgres",
      pythonWebFramework: "fastapi",
      pythonOrm: "sqlalchemy",
    } as const;
    expect((await createVirtual(python)).error).toBeUndefined();
    expect(() => buildProjectConfig(python)).not.toThrow();
  });

  test("valid pairs still generate", async () => {
    const results = await Promise.all(
      [
        { database: "mongodb", orm: "prisma" },
        { database: "mongodb", orm: "mongoose" },
        { database: "postgres", orm: "kysely" },
        { database: "redis", orm: "none" },
        { database: "edgedb", orm: "none" },
      ].map((data) => createVirtual({ ...STACKS.standalone, ...data, auth: "none" })),
    );
    for (const result of results) expect(result.error).toBeUndefined();
  });

  test("prompts only offer databases and ORMs that pair with the other choice", () => {
    expect(databasesFor("kysely")).toEqual(["none", "sqlite", "postgres", "mysql"]);
    expect(databasesFor("mongoose")).toEqual(["none", "mongodb"]);

    expect(ormsFor("mongodb").options.map((option) => option.value)).toEqual([
      "prisma",
      "mongoose",
    ]);
    expect(ormsFor("postgres").options.map((option) => option.value)).toEqual([
      "drizzle",
      "prisma",
      "typeorm",
      "kysely",
      "mikroorm",
      "sequelize",
    ]);
    expect(ormsFor("redis")).toMatchObject({ shouldPrompt: false, autoValue: "none" });
  });

  test("update and add planning reject a database or ORM the project's data layer cannot use", async () => {
    const mongoProject = await scaffoldProject({ database: "mongodb", orm: "prisma" });
    const ormPlan = await planStackUpdate(mongoProject, { orm: "kysely" });
    expect(ormPlan).toMatchObject({
      success: false,
      error: "Invalid stack update: Kysely does not support MongoDB",
    });
    const mcpPlan = await planStackUpdateOperation.invoke({
      projectDir: mongoProject,
      orm: "kysely",
    });
    expect(mcpPlan.output).toEqual(ormPlan);

    const postgresProject = await scaffoldProject({ database: "postgres", orm: "drizzle" });
    expect(await planStackUpdate(postgresProject, { database: "mongodb" })).toMatchObject({
      success: false,
      error: "Invalid stack update: Drizzle ORM does not support MongoDB",
    });
    const switched = await planStackUpdate(postgresProject, { database: "mongodb", orm: "prisma" });
    expect(switched.success).toBe(true);

    const redisProject = await scaffoldProject({ database: "redis", orm: "none" });
    const addition = await planAdditionOperation.invoke({
      projectDir: redisProject,
      part: ["backend.orm:typescript:drizzle"],
    });
    expect(addition.output).toMatchObject({
      success: false,
      error: "Invalid stack update: Redis is a key-value store and does not require an ORM",
    });
  });
});
