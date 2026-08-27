import { EMBEDDED_TEMPLATES, generateVirtualProject } from "@better-fullstack/template-generator";
import { writeTreeToFilesystem } from "@better-fullstack/template-generator/fs-writer";
import { createCliDefaultProjectConfigBase, type ProjectConfig } from "@better-fullstack/types";
import {
  applyGen,
  buildBtsConfigForPersistence,
  checkRecipeRecords,
  planGen,
  writeBtsConfig,
} from "create-better-fullstack/testing";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

export async function runRecipeGenerationProof(): Promise<void> {
  const proofRoot = await mkdtemp(path.join(os.tmpdir(), "better-fullstack-recipe-proof-"));
  const projectDir = path.join(proofRoot, "recipe-proof");
  try {
    const config = {
      ...createCliDefaultProjectConfigBase(),
      projectName: "recipe-proof",
      projectDir,
      relativePath: ".",
      ecosystem: "typescript",
      frontend: ["tanstack-router"],
      backend: "hono",
      runtime: "bun",
      database: "sqlite",
      orm: "drizzle",
      api: "trpc",
      auth: "none",
      testing: "vitest",
      packageManager: "bun",
      aiDocs: ["agents-md", "claude-md"],
      install: false,
      git: false,
    } as ProjectConfig;
    const persisted = buildBtsConfigForPersistence(config);
    const normalized = { ...config, ...persisted, projectDir, relativePath: "." } as ProjectConfig;
    const generated = await generateVirtualProject({
      config: normalized,
      templates: EMBEDDED_TEMPLATES,
    });
    if (!generated.success || !generated.tree) {
      throw new Error(generated.error ?? "Could not generate the runtime proof project.");
    }
    await writeTreeToFilesystem(generated.tree, projectDir);
    await writeBtsConfig(normalized, {
      version: persisted.version,
      createdAt: persisted.createdAt,
    });

    const plan = await planGen({ kind: "resource", name: "post", dir: projectDir });
    if (!plan.success || !plan.reviewToken || !plan.persistent) {
      throw new Error(`Persistent recipe planning failed: ${plan.message}`);
    }
    const applied = await applyGen(
      { kind: "resource", name: "post", dir: projectDir },
      plan.reviewToken,
    );
    if (!applied.success || applied.status !== "created") {
      throw new Error(`Persistent recipe apply failed: ${applied.message}`);
    }

    const databaseUrl = pathToFileURL(path.join(proofRoot, "recipe-proof.sqlite")).href;
    await writeFile(
      path.join(projectDir, "apps/server/.env"),
      `CORS_ORIGIN=http://localhost:3001\nDATABASE_URL=${databaseUrl}\n`,
      "utf-8",
    );
    const bun = Bun.which("bun") ?? process.execPath;
    await runCommand([bun, "install"], projectDir);
    await runCommand([bun, "run", "db:push"], projectDir, {
      DATABASE_URL: databaseUrl,
    });
    await runCommand(
      [bun, "test", "packages/api/src/routers/post.integration.test.ts"],
      projectDir,
      {
        CORS_ORIGIN: "http://localhost:3001",
        DATABASE_URL: databaseUrl,
      },
    );
    const checks = await checkRecipeRecords(projectDir, "post");
    if (checks.length !== 1 || !checks[0]?.ok) {
      throw new Error("Recipe ownership checks failed after the runtime assertion.");
    }
  } finally {
    await rm(proofRoot, { recursive: true, force: true });
  }
}

async function runCommand(
  command: string[],
  cwd: string,
  env: Record<string, string> = {},
): Promise<void> {
  const child = Bun.spawn(command, {
    cwd,
    env: { ...process.env, ...env },
    stdin: "ignore",
    stdout: "inherit",
    stderr: "inherit",
  });
  const exitCode = await child.exited;
  if (exitCode !== 0) throw new Error(`${command.join(" ")} exited with ${exitCode}.`);
}

if (import.meta.main) {
  await runRecipeGenerationProof();
  console.log("Persistent TypeScript recipe proof passed.");
}
