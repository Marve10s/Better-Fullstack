import { EMBEDDED_TEMPLATES, generateVirtualProject } from "@better-fullstack/template-generator";
import { writeTreeToFilesystem } from "@better-fullstack/template-generator/fs-writer";
import {
  createCliDefaultProjectConfigBase,
  formatStackPartSpec,
  getDisabledReason,
  legacyProjectConfigToStackParts,
  parseStackPartSpecs,
  type ProjectConfig,
} from "@better-fullstack/types";
import { createCustomConfig, expectError, runTRPCTest } from "@test/support/test-utils";
import { getVirtualFileContent } from "@test/support/virtual-tree-utils";
import { afterAll, describe, expect, test } from "bun:test";
import { existsSync } from "node:fs";
import { mkdtemp, rm } from "node:fs/promises";
import { homedir, tmpdir } from "node:os";
import { join, resolve } from "node:path";

import { writeBtsConfig } from "@/config/bts-config";
import { validateEcosystemAuthCompatibility } from "@/config/config-validation";
import { buildCompatibilityInputFromConfig } from "@/config/stack-compatibility";
import { planStackUpdate } from "@/helpers/core/stack-update";
import { createVirtual } from "@/index";
import { recordScaffoldManifest } from "@/lifecycle/scaffold-manifest";
import { planProjectOperation } from "@/operations/project-create";
import { buildProjectConfig } from "@/operations/stack-helpers";
import { runWithContextAsync } from "@/presentation/context";
import { resolveDatabasePrompt } from "@/prompts/data/database";
import { resolveORMPrompt } from "@/prompts/data/orm";
import { resolveAuthPrompt } from "@/prompts/services/auth";
import { processAndValidateFlags } from "@/validation";

const CLI_ENTRY = resolve(import.meta.dir, "../../src/cli.ts");
const NATIVE_BUN = resolve(homedir(), ".bun", "bin", "bun");
const BUN_EXECUTABLE =
  process.env.BFS_TEST_BUN_BIN || (existsSync(NATIVE_BUN) ? NATIVE_BUN : "bun");
const TEMP_ROOTS: string[] = [];

afterAll(async () => {
  await Promise.all(TEMP_ROOTS.map((root) => rm(root, { recursive: true, force: true })));
});

async function makeTempRoot() {
  const root = await mkdtemp(join(tmpdir(), "bfs-better-auth-db-"));
  TEMP_ROOTS.push(root);
  return root;
}

async function runCreate(args: string[]) {
  const cwd = await makeTempRoot();
  const child = Bun.spawn(
    [
      BUN_EXECUTABLE,
      CLI_ENTRY,
      "create",
      ...args,
      "--dry-run",
      "--no-install",
      "--no-git",
      "--disable-analytics",
    ],
    {
      cwd,
      env: { ...Bun.env, BFS_SKIP_BUILDER_PROMPT: "1", CI: "true" },
      stdout: "pipe",
      stderr: "pipe",
    },
  );
  const [exitCode, stdout, stderr] = await Promise.all([
    child.exited,
    new Response(child.stdout).text(),
    new Response(child.stderr).text(),
  ]);
  return { exitCode, output: `${stdout}${stderr}` };
}

const STACKS = {
  fullstack: { frontend: ["svelte"], backend: "self", runtime: "none", api: "orpc" },
  standalone: { frontend: ["tanstack-router"], backend: "hono", runtime: "bun", api: "trpc" },
} as const;

const REJECTED = [
  { database: "edgedb", orm: "none", reason: "Better Auth has no EdgeDB adapter" },
  { database: "redis", orm: "none", reason: "Better Auth has no Redis adapter" },
  { database: "postgres", orm: "typeorm", reason: "Better Auth has no TypeORM adapter" },
  { database: "mysql", orm: "sequelize", reason: "Better Auth has no Sequelize adapter" },
  { database: "sqlite", orm: "mikroorm", reason: "Better Auth has no MikroORM adapter" },
  {
    database: "sqlite",
    orm: "none",
    reason: "Better Auth needs a Drizzle, Prisma, Kysely, or Mongoose adapter for SQLite",
  },
] as const;

// The stack CI's random smoke sample generated before its build failed inside Better Auth.
const SMOKE_SAMPLE = {
  frontend: ["svelte"],
  backend: "self",
  runtime: "none",
  database: "edgedb",
  orm: "none",
  auth: "better-auth-organizations",
  fileUpload: "uploadthing",
  logging: "pino",
  stateManagement: "mobx",
  i18n: "next-intl",
  webDeploy: "sst",
} as const;

function graphSpecs(stack: (typeof STACKS)[keyof typeof STACKS], database: string, orm: string) {
  const config = {
    ...createCliDefaultProjectConfigBase(),
    projectName: "auth",
    ...stack,
    frontend: [...stack.frontend],
    database,
    orm,
    auth: "better-auth",
  } as ProjectConfig;
  return legacyProjectConfigToStackParts(config);
}

function authFile(tree: Awaited<ReturnType<typeof createVirtual>>["tree"]) {
  return getVirtualFileContent(tree!.root, "packages/auth/src/index.ts") ?? "";
}

async function scaffoldProject(overrides: Partial<ProjectConfig>) {
  const projectDir = join(await makeTempRoot(), "app");
  const config = {
    ...createCliDefaultProjectConfigBase(),
    addons: [],
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

describe("Better Auth database adapters", () => {
  for (const [stackName, stack] of Object.entries(STACKS)) {
    for (const { database, orm, reason } of REJECTED) {
      test(`${stackName} ${database}/${orm} is rejected with one reason on every path`, async () => {
        const options = { ...stack, frontend: [...stack.frontend], database, orm };
        const auth = "better-auth" as const;

        const cli = await runTRPCTest(
          createCustomConfig({ projectName: `ba-${database}-${orm}`, ...options, auth }),
        );
        expectError(cli, reason);

        const flat = await createVirtual({ ...options, auth });
        expect(flat).toEqual({ success: false, error: reason });

        const graph = await createVirtual({ stackParts: graphSpecs(stack, database, orm) });
        expect(graph.success).toBe(false);
        expect(graph.error).toBe(reason);

        expect(() => buildProjectConfig({ ...options, auth })).toThrow(reason);
        const graphParts = graphSpecs(stack, database, orm);
        const specs = graphParts.map((part) => formatStackPartSpec(part, graphParts));
        expect(() => buildProjectConfig({ part: specs })).toThrow(reason);

        const builderInput = buildCompatibilityInputFromConfig({ ...options, auth });
        if (orm !== "none" || database === "edgedb" || database === "redis") {
          expect(getDisabledReason(builderInput, "auth", auth)).toBe(reason);
        }
      });
    }
  }

  test("an explicit --auth flag is rejected, while the default Better Auth gives way", async () => {
    const rejected = await runCreate([
      "explicit",
      "--frontend",
      "svelte",
      "--backend",
      "self",
      "--runtime",
      "none",
      "--database",
      "edgedb",
      "--auth",
      "better-auth",
    ]);
    expect(rejected.exitCode).not.toBe(0);
    expect(rejected.output).toContain("Better Auth has no EdgeDB adapter");

    const config: Partial<ProjectConfig> = {
      ecosystem: "typescript",
      frontend: ["svelte"],
      backend: "self",
      database: "edgedb",
      orm: "none",
      auth: "better-auth",
    };
    await runWithContextAsync({ silent: true }, async () => {
      validateEcosystemAuthCompatibility(config, new Set(["database", "orm"]));
    });
    expect(config.auth).toBe("none");
  });

  test("partial flags and prompts only offer choices Better Auth can use", async () => {
    await runWithContextAsync({ silent: true }, async () => {
      expect(() =>
        processAndValidateFlags(
          { auth: "better-auth", database: "sqlite" },
          new Set(["auth", "database"]),
          "app",
        ),
      ).not.toThrow();
      expect(() =>
        processAndValidateFlags(
          { auth: "better-auth", database: "edgedb" },
          new Set(["auth", "database"]),
          "app",
        ),
      ).toThrow("Better Auth has no EdgeDB adapter");
    });

    const databases = resolveDatabasePrompt({
      backend: "hono",
      runtime: "bun",
      auth: "better-auth",
    }).options.map((option) => option.value);
    expect(databases).not.toContain("edgedb");
    expect(databases).not.toContain("redis");
    expect(databases).toEqual(expect.arrayContaining(["none", "sqlite", "postgres", "mongodb"]));

    const orms = resolveORMPrompt({
      hasDatabase: true,
      database: "postgres",
      auth: "better-auth",
    }).options.map((option) => option.value);
    expect(orms).toEqual(["drizzle", "prisma", "kysely"]);

    const auths = resolveAuthPrompt({
      backend: "self",
      frontend: ["svelte"],
      database: "edgedb",
      orm: "none",
    }).options.map((option) => option.value);
    expect(auths).not.toContain("better-auth");
    expect(auths).not.toContain("better-auth-organizations");
    expect(
      resolveAuthPrompt({
        backend: "self",
        frontend: ["svelte"],
        database: "sqlite",
        orm: "drizzle",
      }).options.map((option) => option.value),
    ).toContain("better-auth");
  });

  test("update planning rejects Better Auth for a database it has no adapter for", async () => {
    const projectDir = await scaffoldProject({
      frontend: ["tanstack-router"],
      backend: "hono",
      runtime: "bun",
      database: "edgedb",
      orm: "none",
      auth: "none",
    });

    const plan = await planStackUpdate(projectDir, { auth: "better-auth" });

    expect(plan.success).toBe(false);
    if (plan.success) return;
    expect(plan.error).toBe("Invalid stack update: Better Auth has no EdgeDB adapter");
  });

  test("the CI smoke-sample stack is rejected with the shared reason", async () => {
    const reason = "Better Auth has no EdgeDB adapter";
    expect(await createVirtual(SMOKE_SAMPLE)).toEqual({ success: false, error: reason });
    expect(() => buildProjectConfig(SMOKE_SAMPLE)).toThrow(reason);
    expectError(
      await runTRPCTest(createCustomConfig({ projectName: "smoke-sample", ...SMOKE_SAMPLE })),
      reason,
    );
  });

  const ADAPTERS = [
    { database: "sqlite", orm: "drizzle", dbSetup: "none", adapter: "drizzleAdapter(db" },
    { database: "sqlite", orm: "drizzle", dbSetup: "turso", adapter: "drizzleAdapter(db" },
    { database: "postgres", orm: "drizzle", dbSetup: "neon", adapter: "drizzleAdapter(db" },
    { database: "postgres", orm: "drizzle", dbSetup: "supabase", adapter: "drizzleAdapter(db" },
    { database: "mysql", orm: "drizzle", dbSetup: "planetscale", adapter: "drizzleAdapter(db" },
    { database: "sqlite", orm: "prisma", dbSetup: "none", adapter: "prismaAdapter(prisma" },
    {
      database: "postgres",
      orm: "prisma",
      dbSetup: "prisma-postgres",
      adapter: "prismaAdapter(prisma",
    },
    { database: "mysql", orm: "prisma", dbSetup: "docker", adapter: "prismaAdapter(prisma" },
    {
      database: "mongodb",
      orm: "prisma",
      dbSetup: "mongodb-atlas",
      adapter: "prismaAdapter(prisma",
    },
    { database: "mongodb", orm: "mongoose", dbSetup: "none", adapter: "mongodbAdapter(client" },
    { database: "sqlite", orm: "kysely", dbSetup: "none", adapter: 'type: "sqlite"' },
    { database: "postgres", orm: "kysely", dbSetup: "docker", adapter: 'type: "postgres"' },
    { database: "mysql", orm: "kysely", dbSetup: "none", adapter: 'type: "mysql"' },
  ] as const;

  for (const [stackName, stack] of Object.entries(STACKS)) {
    test(`${stackName} adapter pairs pass Better Auth an adapter, never a connection string`, async () => {
      const results = await Promise.all(
        ADAPTERS.map(({ adapter: _adapter, ...data }) =>
          createVirtual({ ...stack, ...data, auth: "better-auth" }),
        ),
      );
      for (const [index, { adapter }] of ADAPTERS.entries()) {
        const result = results[index]!;
        expect(result.error).toBeUndefined();
        const content = authFile(result.tree);
        expect(content).toContain(adapter);
        expect(content).not.toMatch(/database:\s*(env\.|process\.env|["'`])/);
      }

      const memory = await createVirtual({
        ...stack,
        database: "none",
        orm: "none",
        auth: "better-auth",
      });
      expect(memory.error).toBeUndefined();
      const content = authFile(memory.tree);
      expect(content).toContain("betterAuth({");
      expect(content).not.toContain("database:");
    });
  }

  test("Cloudflare D1 passes Better Auth the Drizzle adapter", async () => {
    const result = await createVirtual({
      frontend: ["tanstack-router"],
      backend: "hono",
      runtime: "workers",
      serverDeploy: "cloudflare",
      database: "sqlite",
      orm: "drizzle",
      dbSetup: "d1",
      auth: "better-auth",
    });
    expect(result.error).toBeUndefined();
    expect(authFile(result.tree)).toContain("drizzleAdapter(db");
  });

  const HONO_PARTS = ["backend:typescript:hono", "backend.runtime:typescript:bun"];
  const WEB_PARTS = ["frontend:typescript:next", ...HONO_PARTS];

  test("frontend- and mobile-owned Better Auth are judged like backend-owned Better Auth", async () => {
    const reason = "Better Auth has no EdgeDB adapter";
    const owned = (owner: string) => [
      ...WEB_PARTS,
      "database:universal:edgedb",
      `${owner}.auth:typescript:better-auth`,
    ];
    const graphs = [
      owned("frontend"),
      owned("backend"),
      [
        "mobile:react-native:native-bare",
        ...HONO_PARTS,
        "database:universal:edgedb",
        "mobile.auth:react-native:better-auth",
      ],
    ];

    const results = await Promise.all(
      graphs.map((part) => createVirtual({ stackParts: parseStackPartSpecs(part) })),
    );
    for (const result of results) expect(result).toEqual({ success: false, error: reason });
    for (const part of [owned("frontend"), owned("backend")]) {
      expect(() => buildProjectConfig({ part })).toThrow(reason);
    }
    await expect(planProjectOperation.invoke({ part: owned("frontend") })).rejects.toThrow(reason);
    await expect(planProjectOperation.invoke({ part: owned("backend") })).rejects.toThrow(reason);

    const valid = await createVirtual({
      stackParts: parseStackPartSpecs([
        ...WEB_PARTS,
        "database:universal:postgres",
        "backend.orm:typescript:drizzle",
        "frontend.auth:typescript:better-auth",
      ]),
    });
    expect(valid.error).toBeUndefined();
    expect(authFile(valid.tree)).toContain("drizzleAdapter(db");
  });

  test("graph input is judged by its own selections, not stale flat fields", async () => {
    const stackParts = parseStackPartSpecs([
      "frontend:typescript:tanstack-router",
      "backend:typescript:hono",
      "backend.runtime:typescript:bun",
      "database:universal:postgres",
      "backend.orm:typescript:drizzle",
      "backend.auth:typescript:better-auth",
      "backend.jobQueue:typescript:pg-boss",
    ]);

    const fresh = await createVirtual({ stackParts });
    expect(fresh.error).toBeUndefined();

    const stale = await createVirtual({
      stackParts,
      database: "edgedb",
      orm: "none",
      auth: "better-auth",
    });
    expect(stale.error).toBeUndefined();
    expect(authFile(stale.tree)).toContain("drizzleAdapter(db");

    // Without a TypeScript backend only auth clients are generated, so there is no adapter to judge.
    const clientsOnly = parseStackPartSpecs([
      "mobile:react-native:native-bare",
      "backend:go:gin",
      "database:universal:postgres",
      "mobile.auth:react-native:better-auth",
    ]);
    expect(() =>
      validateEcosystemAuthCompatibility({ stackParts: clientsOnly, auth: "better-auth" }),
    ).not.toThrow();
  });
});
