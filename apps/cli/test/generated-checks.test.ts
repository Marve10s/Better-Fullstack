import { EMBEDDED_TEMPLATES, generateVirtualProject } from "@better-fullstack/template-generator";
import { writeTreeToFilesystem } from "@better-fullstack/template-generator/fs-writer";
import {
  createCliDefaultProjectConfigBase,
  parseStackPartSpecs,
  type ProjectConfig,
} from "@better-fullstack/types";
import { afterEach, describe, expect, it } from "bun:test";
import fs from "fs-extra";
import { tmpdir } from "node:os";
import path from "node:path";

import { createProjectHandler } from "../src/helpers/core/command-handlers";
import {
  assertGeneratedVerificationComplete,
  discoverGeneratedCheckTargets,
  runGeneratedChecks,
  type GeneratedCheckResult,
} from "../src/utils/generated-checks";

const roots: string[] = [];
afterEach(async () => {
  await Promise.all(roots.splice(0).map((root) => fs.remove(root)));
});

async function graphProject(): Promise<ProjectConfig> {
  const projectDir = await fs.mkdtemp(path.join(tmpdir(), "bfs-checks-"));
  roots.push(projectDir);
  await fs.outputJson(path.join(projectDir, "apps/web/package.json"), {
    scripts: { "check-types": "tsc --noEmit" },
  });
  await fs.ensureDir(path.join(projectDir, "services/go-fiber"));
  await fs.outputJson(path.join(projectDir, "packages/db/package.json"), {
    scripts: { "check-types": "tsc --noEmit" },
  });
  return {
    ...createCliDefaultProjectConfigBase(),
    projectName: "checks",
    projectDir,
    relativePath: ".",
    workspaceShape: "multi-app",
    packageManager: "bun",
    stackParts: [
      {
        id: "frontend:typescript:react-vite",
        role: "frontend",
        ecosystem: "typescript",
        toolId: "react-vite",
        source: "selected",
        targetPath: "apps/web",
      },
      {
        id: "backend:go:fiber",
        role: "backend",
        ecosystem: "go",
        toolId: "fiber",
        source: "selected",
        targetPath: "services/go-fiber",
      },
      {
        id: "database:universal:sqlite",
        role: "database",
        ecosystem: "universal",
        toolId: "sqlite",
        source: "selected",
        targetPath: "packages/db",
      },
      {
        id: "backend:go:fiber.orm:typescript:drizzle",
        role: "orm",
        ecosystem: "typescript",
        toolId: "drizzle",
        source: "selected",
        ownerPartId: "backend:go:fiber",
      },
    ],
  } as ProjectConfig;
}

async function materializeGraph(
  parts: string[],
  overrides: Partial<ProjectConfig> = {},
): Promise<ProjectConfig> {
  const projectDir = await fs.mkdtemp(path.join(tmpdir(), "bfs-real-checks-"));
  roots.push(projectDir);
  const config = {
    ...createCliDefaultProjectConfigBase(),
    projectName: "real-checks",
    projectDir,
    relativePath: ".",
    install: false,
    git: false,
    ...overrides,
    stackParts: parseStackPartSpecs(parts),
  } as ProjectConfig;
  const generated = await generateVirtualProject({ config, templates: EMBEDDED_TEMPLATES });
  if (!generated.success || !generated.tree) throw new Error(generated.error);
  await writeTreeToFilesystem(generated.tree, projectDir);
  return config;
}

describe("generated target checks", () => {
  it("enumerates and executes every generated graph target", async () => {
    const config = await graphProject();
    const executed: string[] = [];
    const results = await runGeneratedChecks(config, {
      commandExists: async () => true,
      execute: async ({ display, cwd }) => {
        executed.push(`${path.relative(config.projectDir, cwd)}:${display}`);
        return { exitCode: 0 };
      },
    });

    expect(results.map((result) => result.id)).toEqual([
      "backend:go:fiber",
      "database:universal:sqlite",
      "frontend:typescript:react-vite",
    ]);
    expect(results.every((result) => result.status === "pass" && result.executed)).toBe(true);
    expect(executed).toEqual([
      "services/go-fiber:go mod tidy",
      "services/go-fiber:go test ./...",
      "packages/db:bun run check-types",
      "apps/web:bun run check-types",
    ]);
  });

  it("keeps the readonly Go verification when go.sum is present", async () => {
    const config = await graphProject();
    await fs.writeFile(path.join(config.projectDir, "services/go-fiber/go.sum"), "");
    const executed: string[] = [];
    await runGeneratedChecks(config, {
      commandExists: async () => true,
      execute: async ({ display, cwd }) => {
        executed.push(`${path.relative(config.projectDir, cwd)}:${display}`);
        return { exitCode: 0 };
      },
    });
    expect(executed).toContain("services/go-fiber:go test -mod=readonly ./...");
    expect(executed).not.toContain("services/go-fiber:go mod tidy");
  });

  it("fails closed for a missing expected target", async () => {
    const config = await graphProject();
    await fs.remove(path.join(config.projectDir, "services/go-fiber"));
    const results = await runGeneratedChecks(config, {
      commandExists: async () => true,
      execute: async () => ({ exitCode: 0 }),
    });
    const go = results.find((result) => result.ecosystem === "go");
    expect(go?.status).toBe("fail");
    expect(go?.executed).toBe(false);
    expect(go?.reason).toContain("directory is missing");
  });

  it("fails closed when a required toolchain is unavailable", async () => {
    const config = await graphProject();
    const results = await runGeneratedChecks(config, {
      commandExists: async (command) => command !== "go",
      execute: async () => ({ exitCode: 0 }),
    });
    const go = results.find((result) => result.ecosystem === "go");
    expect(go).toMatchObject({ status: "fail", executed: false, toolchain: "go" });
    expect(go?.reason).toContain("go");
  });

  it("records the exact failed command and reason", async () => {
    const config = await graphProject();
    const results = await runGeneratedChecks(config, {
      commandExists: async () => true,
      execute: async ({ command }) => ({ exitCode: command === "go" ? 2 : 0 }),
    });
    const go = results.find((result) => result.ecosystem === "go");
    expect(go?.status).toBe("fail");
    expect(go?.executedCommands).toEqual(["go mod tidy"]);
    expect(go?.reason).toContain("exited with code 2");
  });

  it("turns a thrown process-start error into a target-scoped failure", async () => {
    const config = await graphProject();
    const results = await runGeneratedChecks(config, {
      commandExists: async () => true,
      execute: async ({ command }) => {
        if (command === "go") throw new Error("spawn EACCES");
        return { exitCode: 0 };
      },
    });
    expect(results.find((result) => result.id === "backend:go:fiber")).toMatchObject({
      status: "fail",
      executed: true,
      reason: "go mod tidy could not start: spawn EACCES",
    });
    expect(results.find((result) => result.id === "frontend:typescript:react-vite")?.status).toBe(
      "pass",
    );
  });

  it("projects scoped tools independently for named repeated Python services", async () => {
    const projectDir = await fs.mkdtemp(path.join(tmpdir(), "bfs-repeated-python-"));
    roots.push(projectDir);
    const stackParts = parseStackPartSpecs([
      "backend:python:fastapi:catalog",
      "backend:python:django:admin",
      "catalog.packageManager:python:uv",
      "catalog.codeQuality:python:ruff",
      "admin.packageManager:python:poetry",
      "admin.codeQuality:python:mypy",
    ]);
    for (const part of stackParts.filter((part) => !part.ownerPartId && part.role === "backend")) {
      await fs.ensureDir(path.join(projectDir, part.targetPath ?? "."));
    }
    const config = {
      ...createCliDefaultProjectConfigBase(),
      projectName: "repeated-python",
      projectDir,
      relativePath: ".",
      workspaceShape: "multi-app",
      stackParts,
    } as ProjectConfig;
    const executed: string[] = [];
    const results = await runGeneratedChecks(config, {
      commandExists: async () => true,
      execute: async ({ display, cwd }) => {
        executed.push(`${path.basename(cwd)}:${display}`);
        return { exitCode: 0 };
      },
    });
    expect(results.map((result) => [result.id, result.toolchain])).toEqual([
      ["admin", "poetry"],
      ["catalog", "uv"],
    ]);
    expect(executed).toEqual([
      "admin:poetry install --extras dev",
      "admin:poetry run python -m compileall src",
      "admin:poetry run mypy",
      "catalog:uv run --extra dev python -m compileall src",
      "catalog:uv run --extra dev ruff check .",
    ]);
  });

  it("projects scoped build tools independently for named repeated Java services", async () => {
    const projectDir = await fs.mkdtemp(path.join(tmpdir(), "bfs-repeated-java-"));
    roots.push(projectDir);
    const stackParts = parseStackPartSpecs([
      "backend:java:spring-boot:billing",
      "backend:java:spring-boot:reports",
      "billing.buildTool:java:maven",
      "reports.buildTool:java:gradle",
    ]);
    for (const part of stackParts.filter((part) => !part.ownerPartId && part.role === "backend")) {
      await fs.ensureDir(path.join(projectDir, part.targetPath ?? "."));
    }
    await fs.writeFile(path.join(projectDir, "services/reports/gradlew"), "#!/bin/sh\n");
    const config = {
      ...createCliDefaultProjectConfigBase(),
      projectName: "repeated-java",
      projectDir,
      relativePath: ".",
      workspaceShape: "multi-app",
      stackParts,
    } as ProjectConfig;
    const executed: string[] = [];
    const results = await runGeneratedChecks(config, {
      commandExists: async () => true,
      execute: async ({ display, cwd }) => {
        executed.push(`${path.basename(cwd)}:${display}`);
        return { exitCode: 0 };
      },
    });
    expect(results.every((result) => result.status === "pass")).toBe(true);
    expect(executed).toEqual(["billing:mvn test", "reports:./gradlew test"]);
  });

  it("uses only the bundled Gradle wrapper for Kotlin targets", async () => {
    const projectDir = await fs.mkdtemp(path.join(tmpdir(), "bfs-kotlin-check-"));
    roots.push(projectDir);
    await fs.ensureDir(path.join(projectDir, "apps/android"));
    const config = {
      ...createCliDefaultProjectConfigBase(),
      projectName: "kotlin-check",
      projectDir,
      relativePath: ".",
      workspaceShape: "multi-app",
      stackParts: [
        {
          id: "mobile:kotlin:android",
          role: "mobile",
          ecosystem: "kotlin",
          toolId: "android",
          source: "selected",
          targetPath: "apps/android",
        },
      ],
    } as ProjectConfig;
    let checks = await runGeneratedChecks(config, {
      commandExists: async () => true,
      execute: async () => ({ exitCode: 0 }),
    });
    expect(checks[0]).toMatchObject({ status: "fail", executed: false });
    expect(checks[0]?.reason).toContain("missing its Gradle wrapper");

    await fs.writeFile(path.join(projectDir, "apps/android/gradlew"), "#!/bin/sh\n");
    checks = await runGeneratedChecks(config, {
      commandExists: async (command) => command === "java",
      execute: async ({ display }) => ({ exitCode: display === "./gradlew check" ? 0 : 1 }),
    });
    expect(checks[0]).toMatchObject({
      status: "pass",
      commands: [{ command: "./gradlew", args: ["check"], display: "./gradlew check" }],
    });
  });

  it("makes create --verify fail for failed or incomplete results", () => {
    const base = {
      id: "frontend:typescript:react-vite",
      role: "frontend",
      ecosystem: "typescript",
      toolId: "react-vite",
      projectDir: "/tmp/project/apps/web",
      toolchain: "bun",
      commands: [{ command: "bun", args: ["run", "check-types"], display: "bun run check-types" }],
      reason: "not executed",
    } as const;
    const incomplete = {
      ...base,
      status: "pass",
      executed: false,
      executedCommands: [],
    } as GeneratedCheckResult;
    expect(() => assertGeneratedVerificationComplete([incomplete])).toThrow(
      "Generated project verification failed",
    );
    expect(() =>
      assertGeneratedVerificationComplete([
        { ...incomplete, status: "fail", reason: "toolchain unavailable" },
      ]),
    ).toThrow("toolchain unavailable");
    expect(() => assertGeneratedVerificationComplete([])).toThrow("no generated targets");
  });

  it("propagates incomplete verification through the create command handler", async () => {
    const projectName = `.smoke/verify-handler-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    roots.push(path.resolve(projectName));
    const result = await createProjectHandler(
      {
        projectName,
        yes: true,
        install: false,
        git: false,
        verify: true,
        disableAnalytics: true,
        directoryConflict: "overwrite",
      },
      {
        silent: true,
        generatedCheckRunner: async (config) => [
          {
            id: "frontend:typescript:next",
            role: "frontend",
            ecosystem: "typescript",
            toolId: "next",
            projectDir: path.join(config.projectDir, "apps/web"),
            status: "pass",
            executed: false,
            toolchain: "bun",
            commands: [
              { command: "bun", args: ["run", "check-types"], display: "bun run check-types" },
            ],
            executedCommands: [],
            reason: "verification did not execute",
          },
        ],
      },
    );
    expect(result?.success).toBe(false);
    expect(result?.error).toContain("Generated project verification failed");
  });

  it("uses real self-backend output only through its owning frontend", async () => {
    const config = await materializeGraph(
      ["frontend:typescript:next", "backend:typescript:self-next"],
      { frontend: ["next"], backend: "self-next", runtime: "none", database: "none", orm: "none" },
    );
    expect(await fs.pathExists(path.join(config.projectDir, "apps/web/package.json"))).toBe(true);
    expect(await fs.pathExists(path.join(config.projectDir, "apps/server"))).toBe(false);
    expect((await discoverGeneratedCheckTargets(config)).map((target) => target.id)).toEqual([
      "workspace:typescript",
    ]);
    const executed: string[] = [];
    const checks = await runGeneratedChecks(config, {
      commandExists: async () => true,
      execute: async ({ display, cwd }) => {
        executed.push(`${path.relative(config.projectDir, cwd) || "."}:${display}`);
        return { exitCode: 0 };
      },
    });
    expect(checks).toHaveLength(1);
    expect(checks[0]).toMatchObject({ role: "workspace", status: "pass", executed: true });
    expect(executed).toEqual([".:bun run check-types"]);
  });

  it("checks the real Convex package at packages/backend", async () => {
    const config = await materializeGraph(["backend:typescript:convex"], {
      frontend: [],
      backend: "convex",
      runtime: "none",
      database: "none",
      orm: "none",
    });
    expect(await fs.pathExists(path.join(config.projectDir, "packages/backend/package.json"))).toBe(
      true,
    );
    expect(await discoverGeneratedCheckTargets(config)).toMatchObject([
      {
        id: "backend:typescript:convex",
        projectDir: path.join(config.projectDir, "packages/backend"),
      },
      { id: "workspace:typescript", projectDir: config.projectDir },
    ]);
    const checks = await runGeneratedChecks(config, {
      commandExists: async () => true,
      execute: async () => ({ exitCode: 0 }),
    });
    expect(checks).toMatchObject([
      { id: "backend:typescript:convex", status: "pass", executed: true },
      { id: "workspace:typescript", status: "pass", executed: true },
    ]);
  });

  it("skips real README-only database output but checks a generated database package", async () => {
    const readmeOnly = await materializeGraph(["database:universal:sqlite"], {
      frontend: [],
      backend: "none",
      runtime: "none",
      database: "sqlite",
      orm: "none",
    });
    expect(await fs.pathExists(path.join(readmeOnly.projectDir, "packages/db/README.md"))).toBe(
      true,
    );
    expect(await fs.pathExists(path.join(readmeOnly.projectDir, "packages/db/package.json"))).toBe(
      false,
    );
    expect((await discoverGeneratedCheckTargets(readmeOnly)).map((target) => target.id)).toEqual([
      "workspace:typescript",
    ]);

    const packaged = await materializeGraph(
      ["backend:typescript:hono", "database:universal:sqlite", "backend.orm:typescript:drizzle"],
      { frontend: [], backend: "hono", runtime: "bun", database: "sqlite", orm: "drizzle" },
    );
    expect(await fs.pathExists(path.join(packaged.projectDir, "packages/db/package.json"))).toBe(
      true,
    );
    expect((await discoverGeneratedCheckTargets(packaged)).map((target) => target.id)).toEqual([
      "workspace:typescript",
    ]);
    const packagedChecks = await runGeneratedChecks(packaged, {
      commandExists: async () => true,
      execute: async () => ({ exitCode: 0 }),
    });
    expect(packagedChecks).toMatchObject([{ role: "workspace", status: "pass", executed: true }]);

    const redis = await materializeGraph(["database:universal:redis"], {
      frontend: [],
      backend: "none",
      runtime: "none",
      database: "redis",
      orm: "none",
    });
    expect(await fs.pathExists(path.join(redis.projectDir, "packages/db/package.json"))).toBe(true);
    expect((await discoverGeneratedCheckTargets(redis)).map((target) => target.id)).toEqual([
      "workspace:typescript",
    ]);
    const redisChecks = await runGeneratedChecks(redis, {
      commandExists: async () => true,
      execute: async () => ({ exitCode: 0 }),
    });
    expect(redisChecks).toMatchObject([{ role: "workspace", status: "pass", executed: true }]);
  });
});
