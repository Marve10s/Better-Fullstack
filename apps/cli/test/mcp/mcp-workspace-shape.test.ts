import { describe, expect, it } from "bun:test";

import { planProjectOperation } from "@/operations/project-create";
import { buildProjectConfig } from "@/operations/stack-helpers";
import { MCP_STACK_UPDATE_SCHEMA } from "@/operations/stack-input";

const fullstackNext = {
  projectName: "shape-app",
  frontend: ["next"],
  backend: "self",
  runtime: "none",
  database: "none",
  orm: "none",
  api: "none",
  auth: "none",
};

async function plannedPaths(input: Record<string, unknown>): Promise<string[]> {
  const { output, failed } = await planProjectOperation.invoke(input);
  expect(failed).toBe(false);
  return JSON.stringify(output).match(/"[^"]*next\.config[^"]*"/g) ?? [];
}

describe("MCP workspace shape", () => {
  it("plans a flat single-app project when asked", async () => {
    const paths = await plannedPaths({ ...fullstackNext, workspaceShape: "single-app" });
    expect(paths.some((path) => path.includes("apps/web/"))).toBe(false);
    expect(paths.length).toBeGreaterThan(0);
  });

  it("keeps the monorepo layout by default", async () => {
    const paths = await plannedPaths(fullstackNext);
    expect(paths.some((path) => path.includes("apps/web/"))).toBe(true);
  });

  it("keeps the monorepo layout for stacks that cannot be flattened", () => {
    const config = buildProjectConfig({
      ...fullstackNext,
      frontend: ["tanstack-router"],
      backend: "hono",
      runtime: "bun",
      workspaceShape: "single-app",
    });
    expect(config.workspaceShape).toBe("monorepo");
  });

  it("does not offer layout conversion through stack updates", () => {
    expect("workspaceShape" in MCP_STACK_UPDATE_SCHEMA).toBe(false);
  });
});
