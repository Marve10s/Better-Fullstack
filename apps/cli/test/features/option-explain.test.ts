import { createCliDefaultProjectConfigBase, type ProjectConfig } from "@better-fullstack/types";
import { afterAll, describe, expect, it } from "bun:test";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

import { generateReproducibleCommand } from "@/lifecycle/generate-reproducible-command";
import { checkCompatibilityOperation, explainOptionOperation } from "@/operations/catalog";
import { explainOptionOutputSchema } from "@/operations/output-schemas";

const CLI_ENTRY = resolve(import.meta.dir, "../../src/cli.ts");
const TEMP_ROOTS: string[] = [];

afterAll(async () => {
  await Promise.all(TEMP_ROOTS.map((root) => rm(root, { recursive: true, force: true })));
});

async function runCli(args: string[], cwd?: string) {
  const child = Bun.spawn([process.execPath, CLI_ENTRY, ...args], {
    cwd,
    env: { ...process.env, BTS_TELEMETRY_DISABLED: "1", BFS_SKIP_BUILDER_PROMPT: "1", CI: "true" },
    stdin: "ignore",
    stdout: "pipe",
    stderr: "pipe",
  });
  const [exitCode, stdout, stderr] = await Promise.all([
    child.exited,
    new Response(child.stdout).text(),
    new Response(child.stderr).text(),
  ]);
  return { exitCode, stdout, stderr };
}

async function runJson(args: string[]): Promise<unknown> {
  const result = await runCli([...args, "--json"]);
  expect(result.stderr).toBe("");
  expect(result.exitCode).toBe(0);
  return JSON.parse(result.stdout);
}

async function explain(args: string[]) {
  const json = await runJson(["explain", ...args]);
  const result = explainOptionOutputSchema.parse(json);
  expect(result).toEqual(json);
  return result;
}

async function compatibilityReason(category: string, option: string) {
  const json = await runJson([
    "compatibility",
    "--track",
    "internal-tool",
    "--category",
    category,
    "--option",
    option,
  ]);
  const { compatible, explanation } = json as {
    compatible: boolean;
    explanation: { reason: string } | null;
  };
  expect(compatible).toBe(false);
  return explanation?.reason;
}

describe("explain command", () => {
  it("lists a requirement and an exclusion with the reasons the compatibility command gives", async () => {
    const result = await explain(["postgres"]);

    expect(result.option).toMatchObject({
      id: "postgres",
      category: "database",
      flag: "--database postgres",
      ecosystems: expect.arrayContaining(["typescript"]),
    });
    expect(result.evidence?.level).toBeString();
    expect(result.requires).toContainEqual({
      category: "orm",
      categoryLabel: "ORM",
      reason: await compatibilityReason("orm", "none"),
    });
    expect(result.excludes).toContainEqual(
      expect.objectContaining({
        category: "orm",
        optionId: "mongoose",
        reason: await compatibilityReason("orm", "mongoose"),
      }),
    );
    expect(result).toEqual(
      explainOptionOutputSchema.parse(
        (await explainOptionOperation.invoke({ option: "postgres" })).output,
      ),
    );
  });

  it("reports the reason create gives for a rejected pair", async () => {
    const result = await explain(["better-auth", "--with", "typeorm", "postgres"]);
    const stack = {
      auth: "better-auth",
      frontend: ["tanstack-router"],
      backend: "hono",
      runtime: "bun",
      database: "postgres",
      orm: "typeorm",
      api: "none",
      uiLibrary: "none",
      forms: "none",
    } as const;
    const config = {
      ...createCliDefaultProjectConfigBase("bun"),
      projectName: "explain-app",
      projectDir: "/virtual",
      relativePath: "./virtual",
      addons: [],
      git: false,
      install: false,
      ...stack,
    } as ProjectConfig;
    const args = generateReproducibleCommand(config)
      .split(" ")
      .slice(4)
      .map((arg) => (arg === "--git" ? "--no-git" : arg === "--install" ? "--no-install" : arg));
    const root = await mkdtemp(join(tmpdir(), "bfs-explain-"));
    TEMP_ROOTS.push(root);
    const created = await runCli(
      ["create", "explain-app", ...args, "--dry-run", "--disable-analytics"],
      root,
    );

    expect(result.with.map((entry) => `${entry.category}:${entry.id}`)).toEqual([
      "orm:typeorm",
      "database:postgres",
    ]);
    expect(result.evaluation.allowed).toBe(false);
    expect(result.evaluation.failures).toContainEqual({
      category: "auth",
      optionId: "better-auth",
      reason: "Better Auth has no TypeORM adapter",
    });
    expect(created.exitCode).not.toBe(0);
    expect(`${created.stdout}${created.stderr}`).toContain("Better Auth has no TypeORM adapter");
  });

  it("lists only alternatives the compatibility check accepts for that stack", async () => {
    const stack = {
      ecosystem: "typescript",
      frontend: ["tanstack-router"],
      backend: "hono",
      runtime: "bun",
      database: "postgres",
      auth: "none",
      api: "none",
    } as const;
    const result = await explain([
      "orm:mongoose",
      "--with",
      "tanstack-router",
      "hono",
      "runtime:bun",
      "postgres",
      "auth:none",
      "api:none",
    ]);
    const check = async (orm: string) =>
      (await checkCompatibilityOperation.invoke({ ...stack, orm })).output as {
        hasIssues: boolean;
        issues: { message: string }[];
      };

    expect(result.evaluation.allowed).toBe(false);
    expect((await check("mongoose")).issues.map((issue) => issue.message)).toEqual(
      result.evaluation.failures.map((failure) => failure.reason),
    );
    const alternatives = result.evaluation.alternatives.map((alternative) => alternative.id);
    expect(alternatives).toContain("drizzle");
    const checked = await Promise.all(
      alternatives.map(async (orm) => ({ orm, hasIssues: (await check(orm)).hasIssues })),
    );
    expect(checked).toEqual(alternatives.map((orm) => ({ orm, hasIssues: false })));
  });

  it("reports a shared rule that the stack-wide check does not cover", async () => {
    const result = await explain([
      "pythonServer:gunicorn",
      "--with",
      "pythonWebFramework:streamlit",
    ]);

    expect(result.evaluation.allowed).toBe(false);
    expect(result.evaluation.failures).toContainEqual({
      category: "pythonServer",
      optionId: "gunicorn",
      reason: "Gunicorn requires a WSGI, ASGI, or aiohttp application",
    });
    expect(result.evaluation.alternatives.map((alternative) => alternative.id)).not.toContain(
      "gunicorn",
    );
  });

  it("judges the candidate on the stack it would produce, not the stack it replaces", async () => {
    const result = await explain([
      "observability:none",
      "--with",
      "observability:signoz",
      "backend:self-next",
      "webDeploy:cloudflare",
    ]);

    expect(result.evaluation.failures).toEqual([]);
    expect(result.evaluation.allowed).toBe(true);
  });

  it.each([
    [["explain", "drizle"], 'Unknown option "drizle"'],
    [
      ["explain", "dataClient:apollo-client"],
      "dataClient:apollo-client is selected through a Stack Part binding, which explain cannot evaluate",
    ],
    [
      ["explain", "drizzle", "--with", "dataClient:apollo-client"],
      "dataClient:apollo-client is selected through a Stack Part binding",
    ],
    [["explain", "dri"], "Did you mean orm:drizzle"],
    [["explain", "sentry"], "Prefix it with its category: observability:sentry"],
    [["explain", "drizzle", "--with", "nope:postgres"], 'Unknown option category "nope"'],
  ])("rejects %j with a non-zero exit", async (args, message) => {
    const result = await runCli([...args, "--json"]);

    expect(result.exitCode).not.toBe(0);
    expect(result.stdout).toBe("");
    expect(result.stderr).toContain(message);
  });
});
