import { describe, expect, it } from "bun:test";

import {
  createCliDefaultProjectConfigBase,
  parseStackPartSpecs,
  type ProjectConfig,
} from "@better-fullstack/types";

import { getMcpGraphPreview } from "../src/mcp";

function makeProjectConfig(overrides: Partial<ProjectConfig> = {}): ProjectConfig {
  return {
    ...createCliDefaultProjectConfigBase(),
    projectName: "mcp-graph-app",
    projectDir: "/virtual/mcp-graph-app",
    relativePath: "./mcp-graph-app",
    ...overrides,
  } as ProjectConfig;
}

describe("MCP graph preview", () => {
  it("exposes graph metadata for flat MCP project input", () => {
    const preview = getMcpGraphPreview(
      makeProjectConfig({
        frontend: ["next"],
        backend: "self",
        runtime: "none",
        webDeploy: "render",
        addons: ["mcp", "pwa"],
      }),
    );

    expect(preview.graphSummary).toContain("Next.js");
    expect(preview.effectiveStack).toMatchObject({
      frontend: "typescript:next",
      "frontend.deploy": "typescript:render",
      "frontend.appPlatform": "typescript:pwa",
      workspaceTooling: "universal:mcp",
    });
    expect(preview.stackPartSpecs).toEqual(
      expect.arrayContaining([
        "frontend:typescript:next",
        "frontend.deploy:typescript:render",
        "frontend.appPlatform:typescript:pwa",
        "workspaceTooling:universal:mcp",
      ]),
    );
  });

  it("formats existing stackParts without leaking provided parts", () => {
    const stackParts = parseStackPartSpecs([
      "frontend:typescript:next",
      "frontend.css:typescript:tailwind",
      "backend:typescript:hono",
      "backend.orm:typescript:drizzle",
    ]);
    const preview = getMcpGraphPreview(makeProjectConfig({ stackParts }));

    expect(preview.effectiveStack).toMatchObject({
      frontend: "typescript:next",
      "frontend.css": "typescript:tailwind",
      backend: "typescript:hono",
      "backend.orm": "typescript:drizzle",
    });
    expect(preview.stackPartSpecs).toEqual(
      expect.arrayContaining([
        "frontend:typescript:next",
        "frontend.css:typescript:tailwind",
        "backend:typescript:hono",
        "backend.orm:typescript:drizzle",
      ]),
    );
    expect(preview.stackPartSpecs.every((spec) => !spec.includes(":provided"))).toBe(true);
  });
});
