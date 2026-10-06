import { dependencyVersionMap } from "@better-fullstack/template-generator";
import { getDisabledReason } from "@better-fullstack/types";
import { createCustomConfig, expectSuccess, runTRPCTest } from "@test/support/test-utils";
import { getVirtualFileContent, readVirtualFileContent } from "@test/support/virtual-tree-utils";
import { describe, expect, test } from "bun:test";
import { readFile } from "node:fs/promises";

import { buildCompatibilityInputFromConfig } from "@/config/stack-compatibility";
import { createVirtual } from "@/index";
import { buildProjectConfig } from "@/operations/stack-helpers";
import { resolveJobQueuePrompt } from "@/prompts/services/job-queue";

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
});
