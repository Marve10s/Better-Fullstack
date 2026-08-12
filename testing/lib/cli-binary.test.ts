import { describe, expect, it } from "bun:test";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { buildFreshCliBinary, resolveCliBinaryPath } from "./cli-binary";

describe("resolveCliBinaryPath", () => {
  it("uses the named CLI bin entry when package.json exports a bin map", () => {
    const cliBinaryPath = resolveCliBinaryPath({
      repoRoot: "/repo",
      packageJson: {
        bin: {
          "create-better-fullstack": "dist/cli.mjs",
        },
      },
    });

    expect(cliBinaryPath).toBe("/repo/apps/cli/dist/cli.mjs");
  });

  it("supports string bin fields", () => {
    const cliBinaryPath = resolveCliBinaryPath({
      repoRoot: "/repo",
      packageJson: {
        bin: "dist/index.mjs",
      },
    });

    expect(cliBinaryPath).toBe("/repo/apps/cli/dist/index.mjs");
  });

  it("falls back to the default dist path when no bin field is present", () => {
    const cliBinaryPath = resolveCliBinaryPath({
      repoRoot: "/repo",
      packageJson: {},
    });

    expect(cliBinaryPath).toBe("/repo/apps/cli/dist/cli.mjs");
  });

  it("rebuilds evidence CLI bytes even when a stale dist binary already exists", async () => {
    const repoRoot = await mkdtemp(join(tmpdir(), "bfs-fresh-cli-"));
    const cliDir = join(repoRoot, "apps", "cli");
    const binary = join(cliDir, "dist", "cli.mjs");
    const commands: string[][] = [];
    try {
      await mkdir(join(cliDir, "dist"), { recursive: true });
      await writeFile(
        join(cliDir, "package.json"),
        JSON.stringify({ bin: { "create-better-fullstack": "dist/cli.mjs" } }),
      );
      await writeFile(binary, "stale ignored build\n");

      const result = await buildFreshCliBinary(repoRoot, async (_root, args) => {
        commands.push(args);
        if (args[1] === "apps/cli") await writeFile(binary, "fresh workspace build\n");
      });

      expect(result).toBe(binary);
      expect(commands).toEqual([
        ["--cwd", "packages/types", "build"],
        ["--cwd", "packages/template-generator", "build"],
        ["--cwd", "apps/cli", "build"],
      ]);
      expect(await readFile(binary, "utf8")).toBe("fresh workspace build\n");
    } finally {
      await rm(repoRoot, { recursive: true, force: true });
    }
  });
});
