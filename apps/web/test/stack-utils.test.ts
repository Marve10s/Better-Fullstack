import { describe, expect, it } from "bun:test";
import {
  createStackSelectionSearchParams as createStackSearchParams,
  parseStackSelectionFromUrlRecord as parseStackFromUrlRecord,
} from "@better-fullstack/types/stack-translation";

import { DEFAULT_STACK } from "../src/lib/constant";
import { generateStackCommand, generateStackSummary } from "../src/lib/stack-utils";

describe("generateStackCommand", () => {
  it("includes version channel flags when using non-stable releases", () => {
    const latestCommand = generateStackCommand({
      ...DEFAULT_STACK,
      projectName: "latest-app",
      versionChannel: "latest",
    });

    expect(latestCommand).toContain("--version-channel latest");
  });

  it("omits version channel for non-TypeScript ecosystems", () => {
    const betaRustCommand = generateStackCommand({
      ...DEFAULT_STACK,
      ecosystem: "rust",
      projectName: "beta-rust-app",
      versionChannel: "beta",
    });

    expect(betaRustCommand).not.toContain("--version-channel");
    expect(betaRustCommand).toContain("--ecosystem rust");
  });

  it("omits the version channel flag for the stable default", () => {
    const command = generateStackCommand({
      ...DEFAULT_STACK,
      projectName: "stable-app",
    });

    expect(command).not.toContain("--version-channel stable");
  });

  it("includes elasticsearch in generated commands", () => {
    const command = generateStackCommand({
      ...DEFAULT_STACK,
      projectName: "elastic-app",
      search: "elasticsearch",
    });

    expect(command).toContain("--search elasticsearch");
  });

  it("summarizes AI selections through the aiSdk stack field", () => {
    const summary = generateStackSummary({
      ...DEFAULT_STACK,
      aiSdk: "vercel-ai",
    });

    expect(summary).toContain("Vercel AI SDK");
  });

  it("uses --part flags when the builder is in multi-ecosystem mode", () => {
    const command = generateStackCommand({
      ...DEFAULT_STACK,
      projectName: "mixed-stack",
      stackMode: "multi",
      stackPartSpecs: [
        "frontend:typescript:next",
        "backend:go:gin",
        "backend.orm:go:gorm",
        "database:universal:postgres",
      ],
    });

    expect(command).toContain("--part frontend:typescript:next");
    expect(command).toContain("--part backend:go:gin");
    expect(command).toContain("--part backend.orm:go:gorm");
    expect(command).toContain("--part database:universal:postgres");
    expect(command).not.toContain("--frontend");
  });

  it("keeps section libraries in multi-ecosystem commands without leaking primary flags", () => {
    const command = generateStackCommand({
      ...DEFAULT_STACK,
      projectName: "section-libs",
      stackMode: "multi",
      stackPartSpecs: ["frontend:typescript:next", "mobile:react-native:native-bare"],
      cssFramework: "scss",
      uiLibrary: "none",
      mobileNavigation: "react-navigation",
      mobileTesting: "maestro",
    });

    expect(command).toContain("--part frontend:typescript:next");
    expect(command).toContain("--part mobile:react-native:native-bare");
    expect(command).toContain("--part frontend.css:typescript:scss");
    expect(command).toContain("--part mobile.navigation:react-native:react-navigation");
    expect(command).toContain("--part mobile.testing:react-native:maestro");
    expect(command).not.toContain("--frontend");
    expect(command).not.toContain("--ecosystem typescript");
  });

  it("keeps backend advanced options in multi-ecosystem commands", () => {
    const command = generateStackCommand({
      ...DEFAULT_STACK,
      projectName: "advanced-mixed-stack",
      stackMode: "multi",
      stackPartSpecs: [
        "frontend:typescript:next",
        "backend:python:fastapi",
        "backend.orm:python:sqlalchemy",
      ],
      pythonAi: ["langchain"],
      pythonQuality: "mypy",
      appPlatforms: ["turborepo", "docker-compose"],
      examples: ["ai"],
    });

    expect(command).toContain("--part backend:python:fastapi");
    expect(command).toContain("--part backend.ai:python:langchain");
    expect(command).toContain("--part backend.codeQuality:python:mypy");
    expect(command).toContain("--part workspaceTooling:universal:turborepo");
    expect(command).toContain("--part workspaceTooling:universal:docker-compose");
    expect(command).toContain("--part examples:universal:ai");
    expect(command).not.toContain("--ecosystem python");
  });

  it("keeps dotnet backend capabilities in multi-ecosystem commands", () => {
    const command = generateStackCommand({
      ...DEFAULT_STACK,
      projectName: "dotnet-mixed-stack",
      stackMode: "multi",
      stackPartSpecs: [
        "frontend:typescript:next",
        "backend:dotnet:aspnet-minimal",
        "backend.orm:dotnet:ef-core",
        "database:universal:postgres",
      ],
      dotnetTesting: ["xunit"],
      dotnetRealtime: "signalr",
      dotnetCaching: "redis",
      dotnetObservability: ["serilog"],
    });

    expect(command).toContain("--part backend:dotnet:aspnet-minimal");
    expect(command).toContain("--part backend.orm:dotnet:ef-core");
    expect(command).toContain("--part backend.testing:dotnet:xunit");
    expect(command).toContain("--part backend.realtime:dotnet:signalr");
    expect(command).toContain("--part backend.caching:dotnet:redis");
    expect(command).toContain("--part backend.observability:dotnet:serilog");
    expect(command).not.toContain("--ecosystem dotnet");
  });

  it("keeps TypeScript frontend sub-options in multi-ecosystem commands", () => {
    const command = generateStackCommand({
      ...DEFAULT_STACK,
      projectName: "styled-mixed-stack",
      stackMode: "multi",
      stackPartSpecs: ["frontend:typescript:astro", "backend:go:gin"],
      astroIntegration: "react",
      shadcnStyle: "luma",
      shadcnFont: "geist",
    });

    expect(command).toContain("--part frontend:typescript:astro");
    expect(command).toContain("--astro-integration react");
    expect(command).toContain("--shadcn-style luma");
    expect(command).toContain("--shadcn-font geist");
  });
});

describe("stack URL state helpers", () => {
  it("round-trips version channel through shared URL helpers", () => {
    const params = createStackSearchParams({
      ...DEFAULT_STACK,
      projectName: "url-app",
      versionChannel: "beta",
    });

    expect(params.get("vc")).toBe("beta");

    const parsed = parseStackFromUrlRecord(Object.fromEntries(params.entries()));

    expect(parsed.projectName).toBe("url-app");
    expect(parsed.versionChannel).toBe("beta");
  });

  it("round-trips multi-ecosystem mode and part specs through URL helpers", () => {
    const params = createStackSearchParams({
      ...DEFAULT_STACK,
      stackMode: "multi",
      stackPartSpecs: ["frontend:typescript:next", "backend:go:gin"],
    });

    expect(params.get("mode")).toBe("multi");
    expect(params.get("part")).toBe("frontend:typescript:next,backend:go:gin");

    const parsed = parseStackFromUrlRecord(Object.fromEntries(params.entries()));

    expect(parsed.stackMode).toBe("multi");
    expect(parsed.stackPartSpecs).toEqual(["frontend:typescript:next", "backend:go:gin"]);
  });

  it("accepts old graph URLs as multi-ecosystem mode", () => {
    const parsed = parseStackFromUrlRecord({
      mode: "graph",
      part: "frontend:typescript:next,backend:go:gin",
    });

    expect(parsed.stackMode).toBe("multi");
    expect(parsed.stackPartSpecs).toEqual(["frontend:typescript:next", "backend:go:gin"]);
  });
});
