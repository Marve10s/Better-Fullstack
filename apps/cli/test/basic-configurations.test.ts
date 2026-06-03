import { describe, expect, it } from "bun:test";

import { ECOSYSTEM_PROMPT_OPTIONS } from "../src/prompts/ecosystem";
import { expectError, expectSuccess, PACKAGE_MANAGERS, runTRPCTest } from "./test-utils";

describe("Basic Configurations", () => {
  it("lists every supported ecosystem in the interactive CLI picker", () => {
    expect(ECOSYSTEM_PROMPT_OPTIONS.map((option) => option.value)).toEqual([
      "typescript",
      "react-native",
      "rust",
      "python",
      "go",
      "java",
      "elixir",
    ]);
  });

  describe("Default Configuration", () => {
    it("should create project with --yes flag (default config)", async () => {
      const result = await runTRPCTest({
        projectName: "default-app",
        yes: true,
        install: false,
      });

      expectSuccess(result);
      expect(result.result?.projectConfig.projectName).toBe("default-app");
    });

    it("should create project with explicit default values", async () => {
      const result = await runTRPCTest({
        projectName: "explicit-defaults",
        database: "sqlite",
        orm: "drizzle",
        backend: "hono",
        runtime: "bun",
        frontend: ["tanstack-router"],
        auth: "better-auth",
        api: "trpc",
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false, // Skip installation for faster tests
      });

      expectSuccess(result);
      expect(result.result?.projectConfig.projectName).toBe("explicit-defaults");
    });

    it("should create Next.js fullstack project with self backend", async () => {
      const result = await runTRPCTest({
        projectName: "nextjs-fullstack-defaults",
        database: "sqlite",
        orm: "drizzle",
        backend: "self",
        runtime: "none",
        frontend: ["next"],
        auth: "better-auth",
        api: "trpc",
        addons: ["turborepo"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false, // Skip installation for faster tests
      });

      expectSuccess(result);
      expect(result.result?.projectConfig.projectName).toBe("nextjs-fullstack-defaults");
      expect(result.result?.projectConfig.backend).toBe("self");
      expect(result.result?.projectConfig.runtime).toBe("none");
      expect(result.result?.projectConfig.frontend).toEqual(["next"]);
    });

    it("should accept graph part bindings without prompting", async () => {
      const result = await runTRPCTest({
        projectName: "graph-parts",
        part: [
          "frontend:typescript:next",
          "mobile:react-native:native-bare",
          "backend:go:gin",
          "backend.orm:go:gorm",
          "database:universal:postgres",
        ],
        dryRun: true,
        dbSetup: "docker",
        serverDeploy: "railway",
        install: false,
      });

      expectSuccess(result);
      expect(result.result?.projectConfig.stackParts?.map((part) => part.role)).toContain(
        "backend",
      );
      expect(result.result?.projectConfig.goWebFramework).toBe("gin");
      expect(result.result?.projectConfig.database).toBe("postgres");
      expect(result.result?.projectConfig.dbSetup).toBe("docker");
      expect(result.result?.projectConfig.serverDeploy).toBe("railway");
      expect(result.result?.files).toContain("apps/native/package.json");
      expect(result.result?.files).toContain("apps/server/go.mod");
      expect(result.result?.files).toContain("packages/database/README.md");
    });

    it("should reject invalid graph part role bindings", async () => {
      const result = await runTRPCTest({
        projectName: "bad-graph-parts",
        part: ["frontend:typescript:hono"],
        dryRun: true,
        install: false,
        expectError: true,
      });

      expectError(result, "not a valid typescript tool for role 'frontend'");
    });

    it("should reject graph capabilities from a different owner ecosystem", async () => {
      const result = await runTRPCTest({
        projectName: "bad-graph-owner-ecosystem",
        part: ["backend:go:gin", "backend.orm:typescript:drizzle"],
        dryRun: true,
        install: false,
        expectError: true,
      });

      expectError(result, "uses the typescript adapter but its owner uses go");
    });

    it("should reject graph capabilities that do not support the owning framework", async () => {
      const result = await runTRPCTest({
        projectName: "bad-graph-owner-tool",
        part: ["backend:python:fastapi", "backend.api:python:django-rest-framework"],
        dryRun: true,
        install: false,
        expectError: true,
      });

      expectError(result, "can only be selected for a Django backend");
    });

    it("should reject graph capabilities that the selected framework cannot generate", async () => {
      const result = await runTRPCTest({
        projectName: "bad-graph-elixir-live-view",
        part: ["backend:elixir:phoenix", "backend.api:elixir:live-view-streams"],
        dryRun: true,
        install: false,
        expectError: true,
      });

      expectError(result, "can only be selected for a Phoenix LiveView backend");
    });

    it("should validate array flag exclusivity when graph part bindings skip prompts", async () => {
      const result = await runTRPCTest({
        projectName: "bad-graph-python-ai",
        part: ["backend:python:fastapi"],
        pythonAi: ["none", "langchain"],
        dryRun: true,
        install: false,
        expectError: true,
      });

      expectError(result, "Cannot combine 'none' with other python ai libraries");
    });
  });

  describe("Package Managers", () => {
    for (const packageManager of PACKAGE_MANAGERS) {
      it(`should work with ${packageManager}`, async () => {
        const result = await runTRPCTest({
          projectName: `${packageManager}-app`,
          packageManager,
          yes: true,
          install: false,
        });

        expectSuccess(result);
        expect(result.result?.projectConfig.packageManager).toBe(packageManager);
      });
    }
  });

  describe("Git Options", () => {
    it("should work with git enabled", async () => {
      const result = await runTRPCTest({
        projectName: "git-enabled",
        yes: true,
        git: true,
        install: false,
      });

      expectSuccess(result);
      expect(result.result?.projectConfig.git).toBe(true);
    });

    it("should work with git disabled", async () => {
      const result = await runTRPCTest({
        projectName: "git-disabled",
        yes: true,
        git: false,
        install: false,
      });

      expectSuccess(result);
      expect(result.result?.projectConfig.git).toBe(false);
    });
  });

  describe("Installation Options", () => {
    // Real dependency installation is slow and flaky in shared environments.
    // Run only when explicitly requested.
    const runInstallTest = process.env.RUN_INSTALL_TESTS === "1" ? it : it.skip;

    runInstallTest(
      "should work with install enabled",
      async () => {
        const result = await runTRPCTest({
          projectName: "install-enabled",
          yes: true,
          install: true,
        });

        expectSuccess(result);
        expect(result.result?.projectConfig.install).toBe(true);
      },
      300000,
    ); // 5 minute timeout for install test

    it("should work with install disabled", async () => {
      const result = await runTRPCTest({
        projectName: "install-disabled",
        yes: true,
        install: false,
      });

      expectSuccess(result);
      expect(result.result?.projectConfig.install).toBe(false);
    });
  });

  describe("YOLO Mode", () => {
    it("should bypass validations with --yolo flag", async () => {
      // This would normally fail validation but should pass with yolo
      const result = await runTRPCTest({
        projectName: "yolo-app",
        yolo: true,
        frontend: ["tanstack-router"],
        backend: "hono",
        runtime: "bun",
        api: "trpc",
        database: "mongodb",
        orm: "drizzle", // Incompatible combination
        auth: "better-auth",
        addons: ["none"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        install: false,
      });

      expectSuccess(result);
      expect(result.result?.projectConfig.projectName).toBe("yolo-app");
    });
  });

  describe("Error Handling", () => {
    it("should fail with invalid project name", async () => {
      const result = await runTRPCTest({
        projectName: "<invalid>",
        expectError: true,
      });

      expectError(result, "Invalid project name");
    });

    it("should fail when combining --yes with configuration flags", async () => {
      const result = await runTRPCTest({
        projectName: "yes-with-flags",
        yes: true, // Explicitly set yes flag
        database: "postgres",
        orm: "drizzle",
        backend: "hono",
        runtime: "bun",
        frontend: ["tanstack-router"],
        auth: "better-auth",
        api: "trpc",
        addons: ["none"],
        examples: ["none"],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
        expectError: true,
      });

      expectError(result, "Cannot combine --yes with core stack configuration flags");
    });
  });
});
