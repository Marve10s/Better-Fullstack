import { afterAll, describe, expect, it } from "bun:test";
import fs from "fs-extra";
import * as JSONC from "jsonc-parser";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import {
  applyGen,
  genCommand,
  planGen,
  type GenApplyOptions,
  type GenCommandInput,
} from "@/commands/generation/gen";
import { checkRecipeRecords, getRecipeHistory } from "@/recipes/records";

const FIXTURES = join(import.meta.dir, "..", "fixtures", "gen-resource");
const TEMP_ROOTS: string[] = [];

async function stageFixture(variant: string): Promise<string> {
  const dir = await mkdtemp(join(tmpdir(), `bfs-gen-${variant}-`));
  TEMP_ROOTS.push(dir);
  await fs.copy(join(FIXTURES, variant), dir);
  return dir;
}

function routerIndexPath(dir: string): string {
  return join(dir, "packages", "api", "src", "routers", "index.ts");
}

function resourcePath(dir: string, name: string): string {
  return join(dir, "packages", "api", "src", "routers", `${name}.ts`);
}

async function applyReviewedGen(input: GenCommandInput, options?: GenApplyOptions) {
  const plan = await planGen(input);
  if (!plan.reviewToken) throw new Error(plan.message);
  return applyGen(input, plan.reviewToken, options);
}

afterAll(async () => {
  await Promise.all(TEMP_ROOTS.map((dir) => rm(dir, { recursive: true, force: true })));
});

describe("gen resource", () => {
  it("scaffolds a protected trpc router and registers it", async () => {
    const dir = await stageFixture("trpc");

    const result = await applyReviewedGen({ kind: "resource", name: "post", dir });

    expect(result.status).toBe("created");
    expect(result.registered).toBe(true);
    expect(result.persistent).toBe(true);
    expect(result.adapterId).toBe("typescript-trpc-drizzle-sqlite-resource");

    const resource = await readFile(resourcePath(dir, "post"), "utf-8");
    expect(resource).toContain("export const postRouter = router({");
    expect(resource).toContain('from "@fixture/db/queries/post";');
    expect(resource).toContain('import { protectedProcedure, router } from "../index";');
    expect(resource).not.toContain("publicProcedure");
    expect(resource).toContain("list: protectedProcedure.query(");
    expect(resource).toContain("byId: protectedProcedure");
    expect(resource).toContain(".mutation(");
    expect(resource).toContain("create: protectedProcedure");
    expect(resource).toContain("update: protectedProcedure");
    expect(resource).toContain("remove: protectedProcedure");

    const schema = await readFile(join(dir, "packages/db/src/schema/post.ts"), "utf-8");
    expect(schema).toContain('sqliteTable("post"');
    expect(schema).toContain("export type Post");
    const service = await readFile(join(dir, "packages/db/src/queries/post.ts"), "utf-8");
    expect(service).toContain("export async function createPostRecord");
    expect(service).toContain("export async function removePostRecord");

    const index = await readFile(routerIndexPath(dir), "utf-8");
    expect(index).toContain('import { postRouter } from "./post";');
    expect(index).toContain("post: postRouter,");
    expect(index).toContain("<better-fullstack:recipe-registrations");
    expect(await checkRecipeRecords(dir)).toEqual([
      expect.objectContaining({ recipeId: "typescript-resource:post", ok: true }),
    ]);
    expect((await getRecipeHistory(dir))[0]?.recoveryPoints).toHaveLength(1);
  });

  it("scaffolds a public orpc router and registers it", async () => {
    const dir = await stageFixture("orpc");

    const result = await applyReviewedGen({ kind: "route", name: "comment", dir });

    expect(result.status).toBe("created");
    expect(result.registered).toBe(true);

    const resource = await readFile(resourcePath(dir, "comment"), "utf-8");
    expect(resource).toContain("export const commentRouter = {");
    expect(resource).toContain("const commentProcedure = publicProcedure;");
    expect(resource).toContain('import { publicProcedure } from "../index";');
    expect(resource).not.toContain("protectedProcedure");
    expect(resource).toContain(".handler(");
    expect(resource).not.toContain(".query(");
    expect(resource).not.toContain(".mutation(");
    expect(resource).toContain("list: commentProcedure.handler(");

    const index = await readFile(routerIndexPath(dir), "utf-8");
    expect(index).toContain('import { commentRouter } from "./comment";');
    expect(index).toContain("comment: commentRouter,");
    expect(index).toContain("<better-fullstack:recipe-registrations");
  });

  it("protects organization-auth memory resources", async () => {
    const dir = await stageFixture("trpc");
    const configPath = join(dir, "bts.jsonc");
    const content = await fs.readFile(configPath, "utf-8");
    await fs.writeFile(
      configPath,
      content
        .replace('"auth": "better-auth"', '"auth": "better-auth-organizations"')
        .replace('"toolId": "better-auth"', '"toolId": "better-auth-organizations"'),
    );

    const result = await applyReviewedGen({ kind: "resource", name: "team", dir });

    expect(result.persistent).toBe(false);
    const resource = await readFile(resourcePath(dir, "team"), "utf-8");
    expect(resource).toContain("protectedProcedure");
    expect(resource).not.toContain("publicProcedure");
  });

  it("imports the declared database workspace package name", async () => {
    const dir = await stageFixture("trpc");
    await fs.writeJson(join(dir, "packages/db/package.json"), {
      name: "@company/database",
      type: "module",
    });

    await applyReviewedGen({ kind: "resource", name: "post", dir });

    expect(await readFile(resourcePath(dir, "post"), "utf-8")).toContain(
      'from "@company/database/queries/post";',
    );
  });

  it("is idempotent: re-running for an existing resource throws and does not clobber", async () => {
    const dir = await stageFixture("trpc");

    await applyReviewedGen({ kind: "resource", name: "post", dir });
    const indexAfterFirst = await readFile(routerIndexPath(dir), "utf-8");

    await expect(genCommand({ kind: "resource", name: "post", dir })).rejects.toThrow(
      /already exists/,
    );

    const indexAfterSecond = await readFile(routerIndexPath(dir), "utf-8");
    expect(indexAfterSecond).toBe(indexAfterFirst);
    expect(indexAfterSecond.match(/post: postRouter,/g)?.length).toBe(1);
  });

  it("keeps earlier recipe ownership valid after adding another shared-region entry", async () => {
    const dir = await stageFixture("trpc");

    await applyReviewedGen({ kind: "resource", name: "post", dir });
    await applyReviewedGen({ kind: "resource", name: "comment", dir });

    const checks = await checkRecipeRecords(dir);
    expect(checks).toEqual([
      expect.objectContaining({ recipeId: "typescript-resource:comment", ok: true }),
      expect.objectContaining({ recipeId: "typescript-resource:post", ok: true }),
    ]);

    const index = await readFile(routerIndexPath(dir), "utf-8");
    expect(index.match(/post: postRouter,/g)).toHaveLength(1);
    expect(index.match(/comment: commentRouter,/g)).toHaveLength(1);
  });

  it("normalizes a kebab/space resource name into camelCase identifiers", async () => {
    const dir = await stageFixture("trpc");

    const result = await applyReviewedGen({ kind: "resource", name: "blog-post", dir });
    expect(result.status).toBe("created");

    const resource = await readFile(resourcePath(dir, "blogPost"), "utf-8");
    expect(resource).toContain("export const blogPostRouter = router({");
    const schema = await readFile(join(dir, "packages/db/src/schema/blogPost.ts"), "utf-8");
    expect(schema).toContain("export type BlogPost =");

    const index = await readFile(routerIndexPath(dir), "utf-8");
    expect(index).toContain('import { blogPostRouter } from "./blogPost";');
    expect(index).toContain("blogPost: blogPostRouter,");
  });

  it("gracefully refuses an unsupported (non-typescript) stack and writes nothing", async () => {
    const dir = await stageFixture("unsupported");

    const before = await fs.readdir(join(dir, "packages", "api", "src", "routers")).catch(() => []);

    const result = await genCommand({ kind: "resource", name: "post", dir });

    expect(result.status).toBe("unsupported");
    expect(result.message).toContain("not yet supported");

    expect(await fs.pathExists(resourcePath(dir, "post"))).toBe(false);
    const after = await fs.readdir(join(dir, "packages", "api", "src", "routers")).catch(() => []);
    expect(after).toEqual(before);
  });

  it("supports --dry-run without touching the filesystem", async () => {
    const dir = await stageFixture("trpc");
    const indexBefore = await readFile(routerIndexPath(dir), "utf-8");

    const result = await genCommand({ kind: "resource", name: "post", dir, dryRun: true });
    expect(result.status).toBe("planned");
    expect(result.reviewToken).toHaveLength(64);

    expect(await fs.pathExists(resourcePath(dir, "post"))).toBe(false);
    const indexAfter = await readFile(routerIndexPath(dir), "utf-8");
    expect(indexAfter).toBe(indexBefore);
  });

  it("blocks a plan when any persistent create target already exists", async () => {
    const dir = await stageFixture("trpc");
    await fs.outputFile(join(dir, "packages/db/src/queries/post.ts"), "user-owned query\n");

    await expect(planGen({ kind: "resource", name: "post", dir })).rejects.toThrow(
      "packages/db/src/queries/post.ts",
    );
  });

  it("blocks ambiguous multi-router projects instead of choosing an arbitrary owner", async () => {
    const dir = await stageFixture("trpc");
    const configPath = join(dir, "bts.jsonc");
    const config = JSONC.parse(await fs.readFile(configPath, "utf-8")) as {
      stackParts: Array<Record<string, unknown>>;
    };
    config.stackParts.push(
      {
        id: "admin",
        role: "backend",
        toolId: "hono",
        ecosystem: "typescript",
        source: "selected",
        targetPath: "apps/admin",
      },
      {
        id: "admin.api:typescript:trpc",
        role: "api",
        toolId: "trpc",
        ecosystem: "typescript",
        ownerPartId: "admin",
        source: "selected",
      },
    );
    await fs.writeJson(configPath, config, { spaces: 2 });
    await fs.outputFile(
      join(dir, "apps/admin/src/routers/index.ts"),
      await fs.readFile(routerIndexPath(dir), "utf-8"),
    );

    const result = await planGen({ kind: "resource", name: "post", dir });

    expect(result).toMatchObject({ success: false, status: "blocked" });
    expect(result.message).toContain("Multiple TypeScript API owners");
  });

  it("returns the complete versioned plan in JSON mode", async () => {
    const dir = await stageFixture("trpc");
    const originalLog = console.log;
    let output = "";
    console.log = (...args: unknown[]) => {
      output += args.map(String).join(" ");
    };
    try {
      await genCommand({ kind: "resource", name: "post", dir, json: true });
    } finally {
      console.log = originalLog;
    }

    const parsed = JSON.parse(output) as {
      status?: string;
      files?: unknown[];
      lifecycle?: { contractVersion?: string };
    };
    expect(parsed.status).toBe("planned");
    expect(parsed.files).toHaveLength(8);
    expect(parsed.lifecycle?.contractVersion).toBe("2");
  });

  it("rejects a stale review token before any write", async () => {
    const dir = await stageFixture("trpc");
    const plan = await planGen({ kind: "resource", name: "post", dir });
    expect(plan.reviewToken).toBeDefined();
    await fs.appendFile(routerIndexPath(dir), "\n// concurrent edit\n");

    const result = await applyGen({ kind: "resource", name: "post", dir }, plan.reviewToken);
    expect(result.status).toBe("blocked");
    expect(await fs.pathExists(resourcePath(dir, "post"))).toBe(false);
  });

  it("rolls back after a failure at every gen write boundary", async () => {
    const plannedDir = await stageFixture("trpc");
    const planned = await planGen({ kind: "resource", name: "post", dir: plannedDir });
    const writeBoundaries = planned.files?.map((_, index) => index) ?? [];
    for (const failureIndex of writeBoundaries) {
      const dir = await stageFixture("trpc");
      const indexBefore = await readFile(routerIndexPath(dir), "utf-8");

      const result = await applyReviewedGen(
        { kind: "resource", name: "post", dir },
        {
          afterWrite: (_file, index) => {
            if (index === failureIndex) throw new Error("injected write failure");
          },
        },
      );

      expect(result.status).toBe("rolled-back");
      expect(await fs.pathExists(resourcePath(dir, "post"))).toBe(false);
      expect(await readFile(routerIndexPath(dir), "utf-8")).toBe(indexBefore);
    }
  });

  it("restores the first output when the second disk write fails", async () => {
    const dir = await stageFixture("trpc");
    const indexBefore = await readFile(routerIndexPath(dir), "utf-8");
    let writes = 0;
    const result = await applyReviewedGen(
      { kind: "resource", name: "post", dir },
      {
        writeFile: async (target, content) => {
          writes += 1;
          if (writes === 2) throw new Error("injected disk write failure");
          await fs.writeFile(target, content, "utf-8");
        },
      },
    );

    expect(result.status).toBe("rolled-back");
    expect(await fs.pathExists(resourcePath(dir, "post"))).toBe(false);
    expect(await readFile(routerIndexPath(dir), "utf-8")).toBe(indexBefore);
  });

  it("reports failed when an automatic rollback cannot restore a concurrent edit", async () => {
    const dir = await stageFixture("trpc");
    const result = await applyReviewedGen(
      { kind: "resource", name: "post", dir },
      {
        afterWrite: async (file, index) => {
          if (index !== 0) return;
          await fs.writeFile(join(dir, file.path), "concurrent edit\n", "utf-8");
          throw new Error("injected write failure");
        },
      },
    );

    expect(result.status).toBe("failed");
    expect(result.lifecycle?.status).toBe("failed");
    expect(result.lifecycle?.recovery.available).toBe(true);
    expect(await fs.readFile(join(dir, result.files?.[0]?.path ?? ""), "utf-8")).toBe(
      "concurrent edit\n",
    );
  });

  it("keeps transaction targets intact when a disk write stops after partial bytes", async () => {
    const dir = await stageFixture("trpc");
    const indexBefore = await readFile(routerIndexPath(dir), "utf-8");
    let writes = 0;
    const result = await applyReviewedGen(
      { kind: "resource", name: "post", dir },
      {
        writeFile: async (target, content) => {
          writes += 1;
          if (writes === 2) {
            await fs.writeFile(target, content.slice(0, 8), "utf-8");
            throw new Error("injected partial disk write");
          }
          await fs.writeFile(target, content, "utf-8");
        },
      },
    );

    expect(result.lifecycle?.status).toBe("rolled-back");
    expect(await fs.pathExists(resourcePath(dir, "post"))).toBe(false);
    expect(await readFile(routerIndexPath(dir), "utf-8")).toBe(indexBefore);
  });

  it("writes nothing when the recovery snapshot cannot be created", async () => {
    const dir = await stageFixture("trpc");
    const result = await applyReviewedGen(
      { kind: "resource", name: "post", dir },
      {
        beforeTransactionSnapshot: () => {
          throw new Error("injected snapshot failure");
        },
      },
    );

    expect(result.status).toBe("failed");
    expect(await fs.pathExists(resourcePath(dir, "post"))).toBe(false);
  });

  it("blocks stale router anchors before creating the resource", async () => {
    const dir = await stageFixture("trpc");
    await fs.writeFile(routerIndexPath(dir), "export const unrelated = {};\n");

    const result = await planGen({ kind: "resource", name: "post", dir });
    expect(result.status).toBe("blocked");
    expect(result.reviewToken).toBeUndefined();
    expect(await fs.pathExists(resourcePath(dir, "post"))).toBe(false);
  });

  it("returns a nonzero CLI exit for a rejected gen result", async () => {
    const dir = await stageFixture("unsupported");
    const child = Bun.spawn(
      [
        process.execPath,
        join(import.meta.dir, "../../src/cli.ts"),
        "gen",
        "resource",
        "post",
        "--dir",
        dir,
        "--json",
      ],
      {
        env: { ...process.env, BTS_TELEMETRY_DISABLED: "1" },
        stdout: "pipe",
        stderr: "pipe",
      },
    );
    const [exitCode, stdout] = await Promise.all([
      child.exited,
      new Response(child.stdout).text(),
      new Response(child.stderr).text(),
    ]);

    expect(exitCode).toBe(1);
    expect(JSON.parse(stdout)).toMatchObject({ success: false, status: "unsupported" });
  });

  it("returns a nonzero CLI exit when recipe verification fails", async () => {
    const dir = await stageFixture("trpc");
    await applyReviewedGen({ kind: "resource", name: "post", dir });
    await fs.writeFile(resourcePath(dir, "post"), "drifted\n");
    const child = Bun.spawn(
      [
        process.execPath,
        join(import.meta.dir, "../../src/cli.ts"),
        "recipes",
        "check",
        "post",
        "--dir",
        dir,
        "--json",
      ],
      {
        env: { ...process.env, BTS_TELEMETRY_DISABLED: "1" },
        stdout: "pipe",
        stderr: "pipe",
      },
    );
    const [exitCode, stdout] = await Promise.all([
      child.exited,
      new Response(child.stdout).text(),
      new Response(child.stderr).text(),
    ]);

    expect(exitCode).toBe(1);
    expect(JSON.parse(stdout)).toMatchObject({ success: false, action: "check" });
  });
});
