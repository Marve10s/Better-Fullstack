import type { ProjectConfig } from "@better-fullstack/types";

import { describe, expect, it } from "bun:test";

import { getRoutesForConfig } from "./route-check";

function makeConfig(overrides: Partial<ProjectConfig>): ProjectConfig {
  return {
    projectName: "test-project",
    frontend: ["tanstack-router"],
    ...overrides,
  } as ProjectConfig;
}

describe("route check target selection", () => {
  it("checks benchmark workbench auth routes", () => {
    expect(
      getRoutesForConfig(
        makeConfig({
          projectName: "preset-ai-search-workbench",
          frontend: ["tanstack-router"],
        }),
      ),
    ).toEqual(["/", "/login", "/dashboard"]);
  });

  it("falls back to framework root route for generic projects", () => {
    expect(
      getRoutesForConfig(
        makeConfig({
          projectName: "preset-react-hono",
          frontend: ["tanstack-router"],
        }),
      ),
    ).toEqual(["/"]);
  });
});
