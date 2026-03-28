import { describe, expect, it, beforeAll, afterAll } from "bun:test";
import { mkdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { spawn } from "node:child_process";

const SMOKE_DIR = join(import.meta.dir, "..", "..", ".smoke-interaction");
const CLI_PATH = join(import.meta.dir, "..", "..", "dist", "cli.mjs");

function runCLI(
  args: string[],
  options?: { timeout?: number },
): Promise<{ exitCode: number; stdout: string; stderr: string }> {
  const timeout = options?.timeout ?? 30_000;

  // The CLI requires project path to be relative to cwd.
  // First arg should be the project dir — extract parent and name.
  const projectPath = args[0];
  const parentDir = projectPath ? join(projectPath, "..") : SMOKE_DIR;
  const projectName = projectPath?.split("/").pop() || "test";
  const restArgs = args.slice(1);

  return new Promise((resolve) => {
    let stdout = "";
    let stderr = "";
    let settled = false;

    const child = spawn("node", [CLI_PATH, projectName, ...restArgs], {
      stdio: "pipe",
      cwd: parentDir,
      env: { ...process.env, NO_COLOR: "1", TERM: "dumb" },
    });

    child.stdout?.on("data", (d: Buffer) => {
      stdout += d.toString();
    });
    child.stderr?.on("data", (d: Buffer) => {
      stderr += d.toString();
    });

    child.on("close", (code) => {
      if (!settled) {
        settled = true;
        resolve({ exitCode: code ?? 1, stdout, stderr });
      }
    });

    setTimeout(() => {
      if (!settled) {
        settled = true;
        child.kill("SIGTERM");
        resolve({ exitCode: 1, stdout, stderr: stderr + "\nTimeout" });
      }
    }, timeout);
  });
}

describe("CLI Interaction Tests", () => {
  beforeAll(async () => {
    await rm(SMOKE_DIR, { recursive: true, force: true });
    await mkdir(SMOKE_DIR, { recursive: true });
  });

  afterAll(async () => {
    await rm(SMOKE_DIR, { recursive: true, force: true });
  });

  describe("--yes mode (non-interactive)", () => {
    it("creates project without prompts", async () => {
      const dir = join(SMOKE_DIR, "yes-mode");
      const result = await runCLI([dir, "--yes", "--no-install", "--no-git"]);
      expect(result.exitCode).toBe(0);
      expect(existsSync(join(dir, "package.json"))).toBe(true);
    });

    it("outputs a reproducible command", async () => {
      const dir = join(SMOKE_DIR, "repro");
      const result = await runCLI([dir, "--yes", "--no-install", "--no-git"]);
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain("create-better-fullstack");
    });
  });

  describe("flag validation", () => {
    it("rejects incompatible database + ORM combo", async () => {
      const dir = join(SMOKE_DIR, "bad-combo");
      const result = await runCLI([
        dir,
        "--database", "mongodb",
        "--orm", "drizzle",
        "--no-install",
        "--no-git",
      ]);
      expect(result.exitCode).not.toBe(0);
    });

    it("rejects --yes with core stack flags", async () => {
      const dir = join(SMOKE_DIR, "yes-conflict");
      const result = await runCLI([
        dir,
        "--yes",
        "--frontend", "next",
        "--no-install",
        "--no-git",
      ]);
      expect(result.exitCode).not.toBe(0);
    });
  });

  describe("ecosystem selection via CLI", () => {
    it("--ecosystem rust + --yes scaffolds Rust project", async () => {
      const dir = join(SMOKE_DIR, "eco-rust");
      const result = await runCLI([dir, "--ecosystem", "rust", "--yes", "--no-install", "--no-git"]);
      expect(result.exitCode).toBe(0);
      expect(existsSync(join(dir, "Cargo.toml"))).toBe(true);
    });

    it("--ecosystem python + --yes scaffolds Python project", async () => {
      const dir = join(SMOKE_DIR, "eco-python");
      const result = await runCLI([dir, "--ecosystem", "python", "--yes", "--no-install", "--no-git"]);
      expect(result.exitCode).toBe(0);
      expect(existsSync(join(dir, "pyproject.toml"))).toBe(true);
    });

    it("--ecosystem go + --yes scaffolds Go project", async () => {
      const dir = join(SMOKE_DIR, "eco-go");
      const result = await runCLI([dir, "--ecosystem", "go", "--yes", "--no-install", "--no-git"]);
      expect(result.exitCode).toBe(0);
      expect(existsSync(join(dir, "go.mod"))).toBe(true);
    });
  });

  describe("directory conflict handling", () => {
    it("--directory-conflict overwrite replaces existing project", async () => {
      const dir = join(SMOKE_DIR, "overwrite");
      // Create first
      await runCLI([dir, "--yes", "--no-install", "--no-git"]);
      expect(existsSync(join(dir, "package.json"))).toBe(true);

      // Overwrite
      const result = await runCLI([dir, "--yes", "--no-install", "--no-git", "--directory-conflict", "overwrite"]);
      expect(result.exitCode).toBe(0);
    });
  });
});
