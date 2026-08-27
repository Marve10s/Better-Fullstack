import { describe, expect, it } from "bun:test";

import {
  appendManagedRegionLine,
  ensureRouterManagedRegions,
  ensureSchemaManagedRegion,
  getManagedRegionBody,
  replaceMarkdownManagedRegion,
} from "@/recipes/managed-region";

describe("recipe managed regions", () => {
  it("discovers a tRPC router through the syntax tree and preserves user code", () => {
    const source = `import { router } from "../index";

const userValue = "keep me";
export const appRouter = router({ health: userValue });
`;
    const ensured = ensureRouterManagedRegions(source);
    expect(ensured.success).toBe(true);
    if (!ensured.success) return;

    const imported = appendManagedRegionLine(
      ensured.content,
      "recipe-imports",
      'import { postRouter } from "./post";',
    );
    expect(imported.success).toBe(true);
    if (!imported.success) return;
    const registered = appendManagedRegionLine(
      imported.content,
      "recipe-registrations",
      "  post: postRouter,",
    );
    expect(registered.success).toBe(true);
    if (!registered.success) return;

    expect(registered.content).toContain('const userValue = "keep me";');
    expect(registered.content).toContain('import { postRouter } from "./post";');
    expect(registered.content).toContain("post: postRouter,");
    expect(
      registered.content.replace(/<better-fullstack:[\s\S]*?<\/better-fullstack:[^>]+>/g, ""),
    ).toContain('const userValue = "keep me";');
  });

  it("supports an oRPC object and remains idempotent", () => {
    const source = "export const appRouter = { health: true };\n";
    const first = ensureRouterManagedRegions(source);
    expect(first.success).toBe(true);
    if (!first.success) return;
    const second = ensureRouterManagedRegions(first.content);
    expect(second).toEqual({
      success: true,
      content: first.content,
      changed: false,
      bodyHash: expect.any(String),
    });
  });

  it("fails closed when a managed entry changes", () => {
    const ensured = ensureRouterManagedRegions("export const appRouter = {};\n");
    expect(ensured.success).toBe(true);
    if (!ensured.success) return;
    const populated = appendManagedRegionLine(
      ensured.content,
      "recipe-imports",
      'import { postRouter } from "./post";',
    );
    expect(populated.success).toBe(true);
    if (!populated.success) return;

    const edited = populated.content.replace("postRouter", "editedRouter");
    expect(appendManagedRegionLine(edited, "recipe-imports", "next")).toEqual({
      success: false,
      reason: expect.stringContaining("edited outside Better Fullstack"),
    });
  });

  it("adds schema exports and agent context through validated regions", () => {
    const schema = ensureSchemaManagedRegion('export * from "./example";\n');
    expect(schema.success).toBe(true);
    if (!schema.success) return;
    const exported = appendManagedRegionLine(
      schema.content,
      "recipe-schema-exports",
      'export * from "./post";',
    );
    expect(exported.success).toBe(true);
    if (!exported.success) return;
    expect(getManagedRegionBody(exported.content, "recipe-schema-exports")).toBe(
      'export * from "./post";',
    );

    const docs = replaceMarkdownManagedRegion(
      "# Instructions\n",
      "recipes",
      "Run `bfs recipes check`.",
    );
    expect(docs.success).toBe(true);
    if (!docs.success) return;
    expect(getManagedRegionBody(docs.content, "recipes")).toBe("Run `bfs recipes check`.");
  });
});
