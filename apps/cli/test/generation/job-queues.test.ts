import {
  dependencyVersionMap,
  EMBEDDED_TEMPLATES,
  generateVirtualProject,
} from "@better-fullstack/template-generator";
import { writeTreeToFilesystem } from "@better-fullstack/template-generator/fs-writer";
import {
  createCliDefaultProjectConfigBase,
  getDisabledReason,
  parseStackPartSpecs,
  type ProjectConfig,
} from "@better-fullstack/types";
import { createCustomConfig, expectSuccess, runTRPCTest } from "@test/support/test-utils";
import { getVirtualFileContent, readVirtualFileContent } from "@test/support/virtual-tree-utils";
import { afterAll, describe, expect, test } from "bun:test";
import { existsSync } from "node:fs";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { homedir, tmpdir } from "node:os";
import { join, resolve } from "node:path";

import { writeBtsConfig } from "@/config/bts-config";
import { validateConfigForProgrammaticUse } from "@/config/config-validation";
import { buildCompatibilityInputFromConfig } from "@/config/stack-compatibility";
import { planStackUpdate } from "@/helpers/core/stack-update";
import { createVirtual } from "@/index";
import { recordScaffoldManifest } from "@/lifecycle/scaffold-manifest";
import { buildProjectConfig } from "@/operations/stack-helpers";
import { runWithContextAsync } from "@/presentation/context";
import { resolveBackendPrompt } from "@/prompts/architecture/backend";
import { resolveRuntimePrompt } from "@/prompts/architecture/runtime";
import { resolveDatabasePrompt } from "@/prompts/data/database";
import { resolveJobQueuePrompt } from "@/prompts/services/job-queue";
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
  const root = await mkdtemp(join(tmpdir(), "bfs-job-queues-"));
  TEMP_ROOTS.push(root);
  return root;
}

type ServerPackageJson = {
  dependencies: Record<string, string>;
  scripts: Record<string, string>;
};

async function readServer(projectDir: string | undefined, path: string) {
  return readFile(`${projectDir}/apps/server/${path}`, "utf8");
}

async function readServerPackage(projectDir: string | undefined): Promise<ServerPackageJson> {
  return JSON.parse(await readServer(projectDir, "package.json"));
}

function promptValues(context: Parameters<typeof resolveJobQueuePrompt>[0]) {
  return resolveJobQueuePrompt(context).options.map((option) => option.value);
}

function graph(...specs: string[]) {
  return parseStackPartSpecs(["frontend:typescript:tanstack-router", ...specs], "selected");
}

const GRAPH_REJECTED = [
  {
    specs: [
      "backend:typescript:hono",
      "backend.runtime:typescript:workers",
      "backend.jobQueue:typescript:hatchet",
    ],
    error: "Hatchet needs a long-running Node.js or Bun worker process, not Cloudflare Workers",
  },
  {
    specs: [
      "backend:typescript:hono",
      "backend.runtime:typescript:bun",
      "backend.orm:typescript:drizzle",
      "database:universal:sqlite",
      "backend.jobQueue:typescript:pg-boss",
    ],
    error: "pg-boss requires PostgreSQL",
  },
  {
    specs: [
      "backend:typescript:nestjs",
      "backend.runtime:typescript:node",
      "backend.jobQueue:typescript:upstash-qstash",
    ],
    error: "Upstash QStash is generated for Hono, Express, Fastify, and Elysia backends",
  },
] as const;

const HATCHET_GRAPH = [
  "backend:typescript:hono",
  "backend.runtime:typescript:bun",
  "database:universal:sqlite",
  "backend.orm:typescript:drizzle",
  "backend.jobQueue:typescript:hatchet",
];

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

async function scaffoldDefaultProject() {
  const projectDir = join(await makeTempRoot(), "app");
  const config = {
    ...createCliDefaultProjectConfigBase(),
    addons: [],
    projectName: "app",
    projectDir,
    relativePath: ".",
    git: false,
    install: false,
  } as ProjectConfig;
  const result = await generateVirtualProject({ config, templates: EMBEDDED_TEMPLATES });
  if (!result.success || !result.tree) throw new Error(result.error ?? "Failed to generate");
  await writeTreeToFilesystem(result.tree, projectDir);
  await writeBtsConfig(config);
  await recordScaffoldManifest(projectDir);
  return projectDir;
}

describe("generated job queues", () => {
  test("pg-boss generates a Postgres queue, producer, and long-running worker", async () => {
    const result = await runTRPCTest(
      createCustomConfig({
        projectName: "jobs-pg-boss",
        frontend: ["tanstack-router"],
        backend: "hono",
        runtime: "bun",
        database: "postgres",
        orm: "drizzle",
        jobQueue: "pg-boss",
      }),
    );
    expectSuccess(result);

    const queue = await readServer(result.projectDir, "src/jobs/queue.ts");
    const worker = await readServer(result.projectDir, "src/jobs/worker.ts");
    const enqueue = await readServer(result.projectDir, "src/jobs/enqueue.ts");
    const pkg = await readServerPackage(result.projectDir);
    const readme = await readFile(`${result.projectDir}/README.md`, "utf8");

    expect(queue).toContain("new PgBoss(env.DATABASE_URL)");
    expect(queue).toContain("instance.send(WELCOME_EMAIL_QUEUE, job");
    expect(worker).toContain("await boss.work<WelcomeEmailJob>(WELCOME_EMAIL_QUEUE");
    expect(enqueue).toContain("enqueueWelcomeEmail(");
    expect(pkg.dependencies["pg-boss"]).toBe(dependencyVersionMap["pg-boss"]);
    expect(pkg.scripts["jobs:worker"]).toBe("bun run src/jobs/worker.ts");
    expect(pkg.scripts["jobs:enqueue"]).toBe("bun run src/jobs/enqueue.ts");
    expect(readme).toContain("## Background jobs (pg-boss)");
  });

  test("Hatchet generates a task, producer, worker process, and token env", async () => {
    const result = await runTRPCTest(
      createCustomConfig({
        projectName: "jobs-hatchet",
        frontend: ["tanstack-router"],
        backend: "express",
        runtime: "node",
        jobQueue: "hatchet",
      }),
    );
    expectSuccess(result);

    const client = await readServer(result.projectDir, "src/jobs/hatchet.ts");
    const worker = await readServer(result.projectDir, "src/jobs/worker.ts");
    const pkg = await readServerPackage(result.projectDir);
    const env = await readServer(result.projectDir, ".env");
    const envSchema = await readFile(`${result.projectDir}/packages/env/src/server.ts`, "utf8");

    expect(client).toContain("HatchetClient.init({ token: env.HATCHET_CLIENT_TOKEN })");
    expect(client).toContain("welcomeEmail.runNoWait(input)");
    expect(worker).toContain("workflows: [welcomeEmail]");
    expect(worker).toContain("await worker.start()");
    expect(pkg.dependencies["@hatchet-dev/typescript-sdk"]).toBe(
      dependencyVersionMap["@hatchet-dev/typescript-sdk"],
    );
    expect(pkg.dependencies.zod).toBeDefined();
    expect(pkg.scripts["jobs:worker"]).toBe("tsx src/jobs/worker.ts");
    expect(env).toContain("HATCHET_CLIENT_TOKEN=");
    expect(envSchema).toContain("HATCHET_CLIENT_TOKEN: z.string().min(1)");
  });

  const qstashRoutes = [
    { backend: "hono", runtime: "bun", route: "app.post(WELCOME_EMAIL_PATH" },
    { backend: "express", runtime: "node", route: 'express.text({ type: "*/*" })' },
    {
      backend: "fastify",
      runtime: "node",
      route: 'addContentTypeParser("*", { parseAs: "string" }',
    },
    { backend: "elysia", runtime: "bun", route: ".post(WELCOME_EMAIL_PATH" },
  ] as const;

  for (const { backend, runtime, route } of qstashRoutes) {
    test(`Upstash QStash mounts the verified receiver route in ${backend}`, async () => {
      const result = await createVirtual({
        projectName: `jobs-qstash-${backend}`,
        backend,
        runtime,
        jobQueue: "upstash-qstash",
      });
      expect(result.success).toBe(true);
      const root = result.tree!.root;

      const server = readVirtualFileContent(root, "apps/server/src/index.ts");
      const jobs = readVirtualFileContent(root, "apps/server/src/jobs/qstash.ts");
      const envSchema = readVirtualFileContent(root, "packages/env/src/server.ts");
      const pkg: ServerPackageJson = JSON.parse(
        readVirtualFileContent(root, "apps/server/package.json"),
      );

      expect(server).toContain('from "./jobs/qstash"');
      expect(server).toContain(route);
      expect(jobs).toContain("receiver");
      expect(jobs).toContain("url: env.QSTASH_WEBHOOK_URL");
      expect(jobs).toContain("client.publishJSON(");
      expect(envSchema).toContain("QSTASH_CURRENT_SIGNING_KEY: z.string().min(1)");
      expect(pkg.dependencies["@upstash/qstash"]).toBe(dependencyVersionMap["@upstash/qstash"]);
      expect(pkg.scripts["jobs:enqueue"]).toContain("src/jobs/enqueue.ts");
    });
  }

  test("Upstash QStash on Workers binds its secrets and skips the Node enqueue script", async () => {
    const result = await createVirtual({
      projectName: "jobs-qstash-workers",
      backend: "hono",
      runtime: "workers",
      serverDeploy: "cloudflare",
      jobQueue: "upstash-qstash",
    });
    expect(result.success).toBe(true);
    const root = result.tree!.root;

    const alchemy = readVirtualFileContent(root, "packages/infra/alchemy.run.ts");
    const pkg: ServerPackageJson = JSON.parse(
      readVirtualFileContent(root, "apps/server/package.json"),
    );

    expect(readVirtualFileContent(root, "apps/server/src/index.ts")).toContain(
      "handleWelcomeEmailJob(c.req.raw)",
    );
    expect(alchemy).toContain(
      "QSTASH_CURRENT_SIGNING_KEY: alchemy.secret.env.QSTASH_CURRENT_SIGNING_KEY!",
    );
    expect(alchemy).toContain("QSTASH_WEBHOOK_URL: alchemy.env.QSTASH_WEBHOOK_URL!");
    expect(getVirtualFileContent(root, "apps/server/src/jobs/enqueue.ts")).toBeUndefined();
    expect(pkg.scripts["jobs:enqueue"]).toBeUndefined();
  });

  const rejected = [
    {
      options: { backend: "hono", database: "sqlite", orm: "drizzle", jobQueue: "pg-boss" },
      error: "pg-boss requires PostgreSQL",
    },
    {
      options: {
        backend: "hono",
        runtime: "workers",
        serverDeploy: "cloudflare",
        database: "postgres",
        orm: "drizzle",
        jobQueue: "pg-boss",
      },
      error: "pg-boss needs a long-running Node.js or Bun worker process, not Cloudflare Workers",
    },
    {
      options: {
        backend: "hono",
        runtime: "workers",
        serverDeploy: "cloudflare",
        jobQueue: "hatchet",
      },
      error: "Hatchet needs a long-running Node.js or Bun worker process, not Cloudflare Workers",
    },
    {
      options: { backend: "nestjs", runtime: "node", jobQueue: "upstash-qstash" },
      error: "Upstash QStash is generated for Hono, Express, Fastify, and Elysia backends",
    },
  ] as const;

  test("createVirtual rejects unsupported stacks with the shared reason", async () => {
    const results = await Promise.all(rejected.map(({ options }) => createVirtual(options)));

    for (const [index, { options, error }] of rejected.entries()) {
      expect(results[index]?.success).toBe(false);
      expect(results[index]?.error).toContain(error);

      const reason = getDisabledReason(
        buildCompatibilityInputFromConfig(createCustomConfig(options)),
        "jobQueue",
        options.jobQueue,
      );
      expect(reason).toBe(error);
    }
  });

  test("MCP project input rejects unsupported stacks with the shared reason", () => {
    for (const { options, error } of rejected) {
      expect(() => buildProjectConfig(options)).toThrow(error);
    }

    expect(() =>
      buildProjectConfig({
        part: [
          "frontend:typescript:tanstack-router",
          "backend:typescript:hono",
          "backend.runtime:typescript:bun",
          "backend.orm:typescript:drizzle",
          "database:universal:sqlite",
          "backend.jobQueue:typescript:pg-boss",
        ],
      }),
    ).toThrow("pg-boss requires PostgreSQL.");
    expect(
      buildProjectConfig({
        backend: "hono",
        runtime: "bun",
        database: "postgres",
        orm: "drizzle",
        jobQueue: "pg-boss",
      }).jobQueue,
    ).toBe("pg-boss");
  });

  test("the public create API rejects Hatchet on a fullstack backend", async () => {
    const result = await runTRPCTest(
      createCustomConfig({
        projectName: "jobs-hatchet-self",
        frontend: ["next"],
        backend: "self",
        runtime: "none",
        jobQueue: "hatchet",
      }),
    );

    expect(result.success).toBe(false);
    expect(result.error).toContain(
      "Hatchet is generated for Hono, Express, Fastify, and Elysia backends",
    );
  });

  test("interactive selection only offers the job queues the stack can generate", () => {
    expect(promptValues({ backend: "hono", runtime: "bun", database: "postgres" })).toEqual(
      expect.arrayContaining(["pg-boss", "upstash-qstash", "hatchet"]),
    );
    expect(promptValues({ backend: "hono", runtime: "bun", database: "sqlite" })).not.toContain(
      "pg-boss",
    );
    expect(promptValues({ backend: "hono", runtime: "workers", database: "sqlite" })).toEqual(
      expect.arrayContaining(["upstash-qstash"]),
    );
    expect(promptValues({ backend: "hono", runtime: "workers", database: "sqlite" })).not.toContain(
      "hatchet",
    );
    expect(
      promptValues({ backend: "nestjs", runtime: "node", database: "postgres" }),
    ).not.toContain("upstash-qstash");
  });

  test("graph-only input is validated against the job queue the generator uses", async () => {
    const results = await Promise.all(
      GRAPH_REJECTED.map(({ specs }) => createVirtual({ stackParts: graph(...specs) })),
    );

    for (const [index, { specs, error }] of GRAPH_REJECTED.entries()) {
      expect(results[index]?.success).toBe(false);
      expect(results[index]?.error).toContain(error);
      expect(() =>
        buildProjectConfig({ part: ["frontend:typescript:tanstack-router", ...specs] }),
      ).toThrow(error);
    }
  });

  test("the graph job queue wins over a stale flat jobQueue", async () => {
    const result = await createVirtual({
      jobQueue: "pg-boss",
      stackParts: graph(...HATCHET_GRAPH),
    });
    expect(result.error).toBeUndefined();
    expect(result.success).toBe(true);
    expect(
      getVirtualFileContent(result.tree!.root, "apps/server/src/jobs/hatchet.ts"),
    ).toBeDefined();

    expect(() =>
      validateConfigForProgrammaticUse({
        ...createCliDefaultProjectConfigBase(),
        jobQueue: "pg-boss",
        stackParts: graph(...HATCHET_GRAPH),
      }),
    ).not.toThrow();
    expect(
      buildProjectConfig({
        jobQueue: "pg-boss",
        part: ["frontend:typescript:tanstack-router", ...HATCHET_GRAPH],
      }).stackParts?.find((part) => part.role === "jobQueue")?.toolId,
    ).toBe("hatchet");
  });

  test("non-interactive create rejects an explicit incompatible job queue flag", async () => {
    const { exitCode, output } = await runCreate(["jobs", "--yes", "--job-queue", "pg-boss"]);

    expect(exitCode).not.toBe(0);
    expect(output).toContain("pg-boss requires PostgreSQL");
    expect(output).not.toContain("Adjusted incompatible options");
  });

  test("update planning rejects an explicit incompatible job queue instead of dropping it", async () => {
    const projectDir = await scaffoldDefaultProject();

    const plan = await planStackUpdate(projectDir, { jobQueue: "pg-boss" });

    expect(plan.success).toBe(false);
    if (plan.success) return;
    expect(plan.error).toBe("Invalid stack update: pg-boss requires PostgreSQL");
  });

  test("partial flags defer the job queue rule until the stack is chosen", async () => {
    await runWithContextAsync({ silent: true }, async () => {
      expect(() =>
        processAndValidateFlags({ jobQueue: "pg-boss" }, new Set(["jobQueue"]), "jobs"),
      ).not.toThrow();
      expect(() =>
        processAndValidateFlags(
          { jobQueue: "pg-boss", database: "sqlite" },
          new Set(["jobQueue", "database"]),
          "jobs",
        ),
      ).toThrow("pg-boss requires PostgreSQL");
    });

    const backends = resolveBackendPrompt({ frontends: ["next"], jobQueue: "pg-boss" });
    expect(backends.options.map((option) => option.value)).toEqual([
      "hono",
      "express",
      "fastify",
      "elysia",
    ]);
    expect(backends.initialValue).toBe("hono");

    const runtimes = resolveRuntimePrompt({ backend: "hono", jobQueue: "pg-boss" });
    expect(runtimes.options.map((option) => option.value)).toEqual(["bun", "node"]);

    const databases = resolveDatabasePrompt({
      backend: "hono",
      runtime: "bun",
      jobQueue: "pg-boss",
    });
    expect(databases.options.map((option) => option.value)).toEqual(["postgres"]);
    expect(databases.initialValue).toBe("postgres");
  });

  const builtWorkers = [
    { jobQueue: "pg-boss", runtime: "bun", command: ["bun", "run", "dist/jobs/worker.mjs"] },
    { jobQueue: "hatchet", runtime: "node", command: ["node", "dist/jobs/worker.mjs"] },
  ] as const;

  for (const { jobQueue, runtime, command } of builtWorkers) {
    test(`${jobQueue} builds its worker into the server image and runs it from there`, async () => {
      const result = await createVirtual({
        projectName: `jobs-built-${jobQueue}`,
        backend: "hono",
        runtime,
        database: "postgres",
        orm: "drizzle",
        jobQueue,
        addons: ["docker-compose"],
      });
      expect(result.error).toBeUndefined();
      const root = result.tree!.root;
      const tsdown = readVirtualFileContent(root, "apps/server/tsdown.config.ts");
      const dockerfile = readVirtualFileContent(root, "apps/server/Dockerfile");
      const compose = readVirtualFileContent(root, "docker-compose.yml");
      const readme = readVirtualFileContent(root, "README.md");
      const pkg: ServerPackageJson = JSON.parse(
        readVirtualFileContent(root, "apps/server/package.json"),
      );

      // tsdown emits each entry key under outDir, so this entry builds dist/jobs/worker.mjs.
      expect(tsdown).toMatch(/['"]jobs\/worker['"]: ['"]\.\/src\/jobs\/worker\.ts['"]/);
      expect(tsdown).toContain("outDir: './dist'");
      // The image keeps the built dist next to package.json and runs from apps/server.
      expect(dockerfile).toContain("COPY --from=builder /app/apps/server/dist ./apps/server/dist");
      expect(dockerfile).toContain("WORKDIR /app/apps/server");
      expect(pkg.scripts["jobs:worker:start"]).toBe(command.join(" "));
      expect(compose).toContain("  worker:\n");
      expect(compose).toContain(`command: ${JSON.stringify(command).replaceAll(",", ", ")}`);
      expect(readme).toContain("jobs:worker:start");
    });
  }
});
