import { afterAll, beforeAll, describe, expect, it } from "bun:test";
import { execa } from "execa";
import { existsSync, readFileSync } from "node:fs";
import { mkdir, rm } from "node:fs/promises";
import { join } from "node:path";

import { formatCliScaffoldFailure } from "../../../../testing/lib/cli-scaffold";
import { getPresetCombos } from "../../../../testing/lib/presets";
import { scaffoldWithCLIBinary } from "./e2e-utils";

const SMOKE_DIR = join(import.meta.dir, "..", "..", ".smoke-benchmark-install-path");
const CLI_BINARY_PATH = join(import.meta.dir, "..", "..", "dist", "cli.mjs");
const TEST_TIMEOUT_MS = 900_000;
const COMMAND_TIMEOUT_MS = 300_000;

function readJson(path: string) {
  return JSON.parse(readFileSync(path, "utf8")) as Record<string, unknown>;
}

function getInstallFlagsFromPreset(presetId: string): string[] {
  const combo = getPresetCombos(presetId)[0];
  if (!combo) {
    throw new Error(`Missing smoke preset: ${presetId}`);
  }

  const parts = combo.command.trim().split(/\s+/);
  const nameIndex = parts.indexOf(combo.name);
  if (nameIndex === -1) {
    throw new Error(`Could not find project name "${combo.name}" in command: ${combo.command}`);
  }

  const flags = parts
    .slice(nameIndex + 1)
    .filter((flag) => !["--install", "--no-install", "--git", "--no-git"].includes(flag));

  return [...flags, "--install", "--no-git"];
}

async function runProjectScript(projectDir: string, script: string) {
  const result = await execa("bun", ["run", script], {
    cwd: projectDir,
    timeout: COMMAND_TIMEOUT_MS,
    reject: false,
    env: { ...process.env, NODE_ENV: "development" },
  });

  if (result.exitCode !== 0) {
    throw new Error(
      [
        `bun run ${script} failed with exit ${result.exitCode}`,
        "stdout:",
        result.stdout.slice(-2000) || "<empty>",
        "stderr:",
        result.stderr.slice(-2000) || "<empty>",
      ].join("\n"),
    );
  }
}

describe("Benchmark install path", () => {
  beforeAll(async () => {
    await rm(SMOKE_DIR, { recursive: true, force: true });
    await mkdir(SMOKE_DIR, { recursive: true });
  });

  afterAll(async () => {
    if (!process.env.CI) {
      await rm(SMOKE_DIR, { recursive: true, force: true });
    }
  });

  it(
    "installs, builds, and typechecks the AI search workbench stack through the CLI",
    async () => {
      const projectDir = join(SMOKE_DIR, "benchmark-install-ai-search-workbench");
      const expectedFiles = ["bts.jsonc", "package.json", "bun.lock", "node_modules"];

      const result = await scaffoldWithCLIBinary(
        projectDir,
        getInstallFlagsFromPreset("ai-search-workbench"),
        {
          cliPath: CLI_BINARY_PATH,
          timeout: TEST_TIMEOUT_MS,
          expectedFiles,
        },
      );

      if (!result.ok) {
        throw new Error(
          formatCliScaffoldFailure(result, {
            header: "Benchmark install-path scaffold failed",
            expectedFiles,
          }),
        );
      }

      const packageJson = readJson(join(projectDir, "package.json"));
      expect(packageJson.packageManager).toEqual(expect.stringMatching(/^bun@/));
      expect(existsSync(join(projectDir, "bun.lock"))).toBe(true);
      expect(existsSync(join(projectDir, "node_modules"))).toBe(true);

      await runProjectScript(projectDir, "build");
      await runProjectScript(projectDir, "check-types");
    },
    TEST_TIMEOUT_MS,
  );
});
