import { describe, expect, it } from "bun:test";

import {
  createCliDefaultProjectConfigBase,
  parseStackPartSpecs,
  type ProjectConfig,
} from "@better-fullstack/types";

import { getMcpGraphPreview, validateMcpProjectConfigCompatibility } from "../src/mcp";

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
  it("rejects Nango for non-TypeScript MCP project input", () => {
    expect(() =>
      validateMcpProjectConfigCompatibility({ ecosystem: "python", integrations: "nango" }),
    ).toThrow("Nango integrations are supported only for TypeScript projects");
  });

  it("accepts Nango for TypeScript MCP project input", () => {
    expect(() =>
      validateMcpProjectConfigCompatibility({ ecosystem: "typescript", integrations: "nango" }),
    ).not.toThrow();
  });

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

  it("uses stackParts instead of stale flat cache fields for MCP previews", () => {
    const stackParts = parseStackPartSpecs([
      "backend:typescript:hono",
      "backend.database:typescript:sqlite",
      "backend.orm:typescript:drizzle",
      "backend.runtime:typescript:bun",
    ]);
    const preview = getMcpGraphPreview(
      makeProjectConfig({
        stackParts,
        backend: "elysia",
        database: "postgres",
        orm: "prisma",
        runtime: "node",
      }),
    );

    expect(preview.effectiveStack).toMatchObject({
      backend: "typescript:hono",
      "backend.database": "typescript:sqlite",
      "backend.orm": "typescript:drizzle",
      "backend.runtime": "typescript:bun",
    });
    expect(preview.stackPartSpecs).toEqual(
      expect.arrayContaining([
        "backend:typescript:hono",
        "backend.database:typescript:sqlite",
        "backend.orm:typescript:drizzle",
        "backend.runtime:typescript:bun",
      ]),
    );
    expect(preview.stackPartSpecs).not.toContain("backend:typescript:elysia");
    expect(preview.stackPartSpecs).not.toContain("database:universal:postgres");
  });

  it("uses mobile stackParts instead of stale flat cache fields for MCP previews", () => {
    const stackParts = parseStackPartSpecs([
      "mobile:react-native:native-bare",
      "mobile.push:react-native:expo-notifications",
      "mobile.ota:react-native:expo-updates",
      "mobile.deepLinking:react-native:expo-linking",
    ]);
    const preview = getMcpGraphPreview(
      makeProjectConfig({
        stackParts,
        frontend: ["native-uniwind"],
        mobilePush: "none",
        mobileOTA: "none",
        mobileDeepLinking: "none",
      }),
    );

    expect(preview.effectiveStack).toMatchObject({
      mobile: "react-native:native-bare",
      "mobile.push": "react-native:expo-notifications",
      "mobile.ota": "react-native:expo-updates",
      "mobile.deepLinking": "react-native:expo-linking",
    });
    expect(preview.stackPartSpecs).toEqual(
      expect.arrayContaining([
        "mobile:react-native:native-bare",
        "mobile.push:react-native:expo-notifications",
        "mobile.ota:react-native:expo-updates",
        "mobile.deepLinking:react-native:expo-linking",
      ]),
    );
    expect(preview.stackPartSpecs).not.toContain("mobile:react-native:native-uniwind");
    expect(preview.stackPartSpecs).not.toContain("mobile.push:react-native:none");
    expect(preview.stackPartSpecs).not.toContain("mobile.ota:react-native:none");
    expect(preview.stackPartSpecs).not.toContain("mobile.deepLinking:react-native:none");
  });

  it("omits disabled none graph parts from MCP preview metadata", () => {
    const stackParts = parseStackPartSpecs([
      "frontend:typescript:next",
      "frontend.css:typescript:scss",
      "frontend.ui:typescript:none",
      "backend:typescript:hono",
    ]);
    const preview = getMcpGraphPreview(makeProjectConfig({ stackParts }));

    expect(preview.effectiveStack).toMatchObject({
      frontend: "typescript:next",
      "frontend.css": "typescript:scss",
      backend: "typescript:hono",
    });
    expect(preview.effectiveStack).not.toHaveProperty("frontend.ui");
    expect(preview.stackPartSpecs).toEqual(
      expect.arrayContaining([
        "frontend:typescript:next",
        "frontend.css:typescript:scss",
        "backend:typescript:hono",
      ]),
    );
    expect(preview.stackPartSpecs).not.toContain("frontend.ui:typescript:none");
  });
});
