import { describe, expect, it, beforeAll, afterAll } from "bun:test";
import { mkdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";

import { formatCliScaffoldFailure, type CliScaffoldResult } from "../../../../testing/lib/cli-scaffold";
import { scaffoldWithCLIBinary, typecheckProject } from "./e2e-utils";

const SMOKE_DIR = join(import.meta.dir, "..", "..", ".smoke-binary");

function assertScaffoldSuccess(result: CliScaffoldResult, expectedFiles: string[] = ["bts.jsonc"]) {
  if (!result.ok) {
    throw new Error(formatCliScaffoldFailure(result, { expectedFiles }));
  }
}

describe("CLI Binary Tests", () => {
  beforeAll(async () => {
    await rm(SMOKE_DIR, { recursive: true, force: true });
    await mkdir(SMOKE_DIR, { recursive: true });
  });

  afterAll(async () => {
    await rm(SMOKE_DIR, { recursive: true, force: true });
  });

  describe("non-interactive scaffolding via --yes", () => {
    it("scaffolds default TypeScript project", async () => {
      const dir = join(SMOKE_DIR, "default");
      const result = await scaffoldWithCLIBinary(dir, ["--yes", "--no-install", "--no-git"], {
        expectedFiles: ["bts.jsonc", "package.json"],
      });
      assertScaffoldSuccess(result, ["bts.jsonc", "package.json"]);
      expect(existsSync(join(dir, "package.json"))).toBe(true);
      expect(existsSync(join(dir, "apps", "web"))).toBe(true);
    });

    it("outputs reproducible command", async () => {
      const dir = join(SMOKE_DIR, "repro");
      const result = await scaffoldWithCLIBinary(dir, ["--yes", "--no-install", "--no-git"]);
      assertScaffoldSuccess(result);
      expect(result.stdout).toContain("create-better-fullstack");
    });

    it("scaffolds Rust project", async () => {
      const dir = join(SMOKE_DIR, "rust");
      const result = await scaffoldWithCLIBinary(dir, [
        "--ecosystem", "rust", "--yes", "--no-install", "--no-git",
      ]);
      assertScaffoldSuccess(result, ["bts.jsonc", "Cargo.toml"]);
      expect(existsSync(join(dir, "Cargo.toml"))).toBe(true);
    });

    it("scaffolds Python project", async () => {
      const dir = join(SMOKE_DIR, "python");
      const result = await scaffoldWithCLIBinary(dir, [
        "--ecosystem", "python", "--yes", "--no-install", "--no-git",
      ]);
      assertScaffoldSuccess(result, ["bts.jsonc", "pyproject.toml"]);
      expect(existsSync(join(dir, "pyproject.toml"))).toBe(true);
    });

    it("scaffolds Go project", async () => {
      const dir = join(SMOKE_DIR, "go");
      const result = await scaffoldWithCLIBinary(dir, [
        "--ecosystem", "go", "--yes", "--no-install", "--no-git",
      ]);
      assertScaffoldSuccess(result, ["bts.jsonc", "go.mod"]);
      expect(existsSync(join(dir, "go.mod"))).toBe(true);
    });
  });

  describe("--yolo mode via binary", () => {
    it("generates a valid random project", async () => {
      const dir = join(SMOKE_DIR, "yolo");
      const result = await scaffoldWithCLIBinary(dir, ["--yolo", "--no-install", "--no-git"]);
      assertScaffoldSuccess(result);
      // At least one ecosystem marker should exist
      const hasMarker =
        existsSync(join(dir, "package.json")) ||
        existsSync(join(dir, "Cargo.toml")) ||
        existsSync(join(dir, "pyproject.toml")) ||
        existsSync(join(dir, "go.mod"));
      expect(hasMarker).toBe(true);
    });
  });

  describe("scaffold + install + typecheck", () => {
    it("default stack has zero TypeScript errors", async () => {
      const dir = join(SMOKE_DIR, "typecheck");
      const scaffold = await scaffoldWithCLIBinary(dir, ["--yes", "--no-git"], {
        expectedFiles: ["bts.jsonc", "package.json"],
      });
      assertScaffoldSuccess(scaffold, ["bts.jsonc", "package.json"]);

      const tc = await typecheckProject(dir, { timeout: 180_000 });
      if (!tc.ok) console.error("[Typecheck]", tc.stderr);
      expect(tc.ok).toBe(true);
    });
  });
});
