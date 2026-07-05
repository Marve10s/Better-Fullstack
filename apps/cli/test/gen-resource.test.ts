import { afterAll, describe, expect, it } from "bun:test";
import fs from "fs-extra";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { genCommand } from "../src/commands/gen";

const FIXTURES = join(import.meta.dir, "fixtures", "gen-resource");
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

afterAll(async () => {
  await Promise.all(TEMP_ROOTS.map((dir) => rm(dir, { recursive: true, force: true })));
});

describe("gen resource", () => {
  it("scaffolds a protected trpc router and registers it", async () => {
    const dir = await stageFixture("trpc");

    const result = await genCommand({ kind: "resource", name: "post", dir });

    expect(result.status).toBe("created");
    expect(result.registered).toBe(true);

    const resource = await readFile(resourcePath(dir, "post"), "utf-8");
    // trpc shape + auth-gated procedure
    expect(resource).toContain("export const postRouter = router({");
    expect(resource).toContain("const postProcedure = protectedProcedure;");
    expect(resource).toContain('import { protectedProcedure, router } from "../index";');
    expect(resource).not.toContain("publicProcedure");
    // CRUD procedures with trpc query/mutation verbs
    expect(resource).toContain("list: postProcedure.query(");
    expect(resource).toContain("byId: postProcedure");
    expect(resource).toContain(".mutation(");
    expect(resource).toContain("create: postProcedure");
    expect(resource).toContain("update: postProcedure");
    expect(resource).toContain("remove: postProcedure");

    const index = await readFile(routerIndexPath(dir), "utf-8");
    expect(index).toContain('import { postRouter } from "./post";');
    expect(index).toContain("post: postRouter,");
    // registration lands inside appRouter, right after the anchor
    expect(index).toMatch(/export const appRouter = router\(\{\n\s+post: postRouter,/);
  });

  it("scaffolds a public orpc router and registers it", async () => {
    const dir = await stageFixture("orpc");

    const result = await genCommand({ kind: "route", name: "comment", dir });

    expect(result.status).toBe("created");
    expect(result.registered).toBe(true);

    const resource = await readFile(resourcePath(dir, "comment"), "utf-8");
    // orpc shape (plain object) + public procedure (no auth in this fixture)
    expect(resource).toContain("export const commentRouter = {");
    expect(resource).toContain("const commentProcedure = publicProcedure;");
    expect(resource).toContain('import { publicProcedure } from "../index";');
    expect(resource).not.toContain("protectedProcedure");
    // orpc uses .handler, never trpc verbs
    expect(resource).toContain(".handler(");
    expect(resource).not.toContain(".query(");
    expect(resource).not.toContain(".mutation(");
    expect(resource).toContain("list: commentProcedure.handler(");

    const index = await readFile(routerIndexPath(dir), "utf-8");
    expect(index).toContain('import { commentRouter } from "./comment";');
    expect(index).toContain("comment: commentRouter,");
    expect(index).toMatch(/export const appRouter = \{\n\s+comment: commentRouter,/);
  });

  it("is idempotent: re-running for an existing resource throws and does not clobber", async () => {
    const dir = await stageFixture("trpc");

    await genCommand({ kind: "resource", name: "post", dir });
    const indexAfterFirst = await readFile(routerIndexPath(dir), "utf-8");

    await expect(genCommand({ kind: "resource", name: "post", dir })).rejects.toThrow(
      /already exists/,
    );

    // The router index is untouched by the failed second run (no duplicate entry).
    const indexAfterSecond = await readFile(routerIndexPath(dir), "utf-8");
    expect(indexAfterSecond).toBe(indexAfterFirst);
    expect(indexAfterSecond.match(/post: postRouter,/g)?.length).toBe(1);
  });

  it("normalizes a kebab/space resource name into camelCase identifiers", async () => {
    const dir = await stageFixture("trpc");

    const result = await genCommand({ kind: "resource", name: "blog-post", dir });
    expect(result.status).toBe("created");

    const resource = await readFile(resourcePath(dir, "blogPost"), "utf-8");
    expect(resource).toContain("export const blogPostRouter = router({");
    expect(resource).toContain("export type BlogPost = {");

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

    // No resource file was written.
    expect(await fs.pathExists(resourcePath(dir, "post"))).toBe(false);
    const after = await fs.readdir(join(dir, "packages", "api", "src", "routers")).catch(() => []);
    expect(after).toEqual(before);
  });

  it("supports --dry-run without touching the filesystem", async () => {
    const dir = await stageFixture("trpc");
    const indexBefore = await readFile(routerIndexPath(dir), "utf-8");

    const result = await genCommand({ kind: "resource", name: "post", dir, dryRun: true });
    expect(result.status).toBe("created");

    // Nothing is written in dry-run mode.
    expect(await fs.pathExists(resourcePath(dir, "post"))).toBe(false);
    const indexAfter = await readFile(routerIndexPath(dir), "utf-8");
    expect(indexAfter).toBe(indexBefore);
  });
});
