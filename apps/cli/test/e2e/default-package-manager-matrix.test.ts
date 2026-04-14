import { afterAll, beforeAll, describe, expect, it } from "bun:test";
import { parse } from "jsonc-parser";
import { existsSync, readFileSync } from "node:fs";
import { mkdir, rm } from "node:fs/promises";
import { join } from "node:path";

import { formatCliScaffoldFailure } from "../../../../testing/lib/cli-scaffold";
import { scaffoldWithCLIBinary } from "./e2e-utils";

const SMOKE_DIR = join(import.meta.dir, "..", "..", ".smoke-default-package-managers");
const CLI_BINARY_PATH = join(import.meta.dir, "..", "..", "dist", "cli.mjs");
const CLEANUP_TIMEOUT_MS = 180_000;
const INFERRED_TIMEOUT_MS = 180_000;

type PackageManagerCase = {
  manager: "npm" | "pnpm" | "bun" | "yarn";
};

type InferredManagerCase = PackageManagerCase & {
  userAgent: string;
};

const EXPLICIT_TIMEOUT_MS: Record<PackageManagerCase["manager"], number> = {
  npm: 480_000,
  pnpm: 420_000,
  bun: 360_000,
  yarn: 480_000,
};

const LOCKFILE_BY_MANAGER: Record<PackageManagerCase["manager"], string> = {
  npm: "package-lock.json",
  pnpm: "pnpm-lock.yaml",
  bun: "bun.lock",
  yarn: "yarn.lock",
};

const EXPLICIT_CASES: PackageManagerCase[] = [
  { manager: "npm" },
  { manager: "pnpm" },
  { manager: "bun" },
  { manager: "yarn" },
];

const INFERRED_CASES: InferredManagerCase[] = [
  {
    manager: "npm",
    userAgent: "npm/10.9.0 node/v22.0.0 darwin arm64 workspaces/false",
  },
  {
    manager: "pnpm",
    userAgent: "pnpm/9.15.1 npm/? node/v22.0.0 darwin arm64",
  },
  {
    manager: "bun",
    userAgent: "bun/1.3.9 npm/? node/v24.0.0 darwin arm64",
  },
  {
    manager: "yarn",
    userAgent: "yarn/4.6.0 npm/? node/v22.0.0 darwin arm64",
  },
];

function readJson(path: string) {
  return JSON.parse(readFileSync(path, "utf8")) as Record<string, unknown>;
}

function readJsonc(path: string) {
  return parse(readFileSync(path, "utf8")) as Record<string, unknown>;
}

function assertScaffoldSucceeded(
  result: Awaited<ReturnType<typeof scaffoldWithCLIBinary>>,
  header: string,
  expectedFiles: string[],
) {
  if (!result.ok) {
    throw new Error(formatCliScaffoldFailure(result, { header, expectedFiles }));
  }
}

describe("Default package manager matrix", () => {
  beforeAll(async () => {
    await rm(SMOKE_DIR, { recursive: true, force: true });
    await mkdir(SMOKE_DIR, { recursive: true });
  }, CLEANUP_TIMEOUT_MS);

  afterAll(async () => {
    if (!process.env.CI) {
      await rm(SMOKE_DIR, { recursive: true, force: true });
    }
  }, CLEANUP_TIMEOUT_MS);

  describe("explicit package manager installs", () => {
    for (const testCase of EXPLICIT_CASES) {
      it(`scaffolds the default --yes path with ${testCase.manager}`, async () => {
        const projectDir = join(SMOKE_DIR, `explicit-${testCase.manager}`);
        const expectedFiles = ["bts.jsonc", "package.json", LOCKFILE_BY_MANAGER[testCase.manager]];

        const result = await scaffoldWithCLIBinary(
          projectDir,
          ["--yes", "--package-manager", testCase.manager, "--no-git"],
          {
            cliPath: CLI_BINARY_PATH,
            timeout: EXPLICIT_TIMEOUT_MS[testCase.manager],
            expectedFiles,
          },
        );

        assertScaffoldSucceeded(
          result,
          `Explicit package-manager scaffold failed for ${testCase.manager}`,
          expectedFiles,
        );
        expect(result.stderr).not.toContain("ValidationError");
        expect(result.stderr).not.toContain("Installation error");
        expect(result.stdout).not.toContain("Failed to install dependencies");

        const btsConfig = readJsonc(join(projectDir, "bts.jsonc"));
        const packageJson = readJson(join(projectDir, "package.json"));

        expect(btsConfig.packageManager).toBe(testCase.manager);
        expect(typeof packageJson.packageManager).toBe("string");
        expect((packageJson.packageManager as string).startsWith(`${testCase.manager}@`)).toBe(true);
        expect(existsSync(join(projectDir, LOCKFILE_BY_MANAGER[testCase.manager]))).toBe(true);
        expect(existsSync(join(projectDir, "apps", "web"))).toBe(true);
        expect(existsSync(join(projectDir, "package.json"))).toBe(true);
        expect(existsSync(join(projectDir, "bts.jsonc"))).toBe(true);
      }, EXPLICIT_TIMEOUT_MS[testCase.manager] + 60_000);
    }
  });

  describe("inferred user-agent defaults", () => {
    for (const testCase of INFERRED_CASES) {
      it(`infers ${testCase.manager} from npm_config_user_agent`, async () => {
        const projectDir = join(SMOKE_DIR, `inferred-${testCase.manager}`);
        const expectedFiles = ["bts.jsonc", "package.json"];

        const result = await scaffoldWithCLIBinary(projectDir, ["--yes", "--no-install", "--no-git"], {
          cliPath: CLI_BINARY_PATH,
          timeout: INFERRED_TIMEOUT_MS,
          env: {
            ...process.env,
            npm_config_user_agent: testCase.userAgent,
          },
          expectedFiles,
        });

        assertScaffoldSucceeded(
          result,
          `Inferred package-manager scaffold failed for ${testCase.manager}`,
          expectedFiles,
        );
        expect(result.stderr).not.toContain("ValidationError");

        const btsConfig = readJsonc(join(projectDir, "bts.jsonc"));
        const packageJson = readJson(join(projectDir, "package.json"));

        expect(btsConfig.packageManager).toBe(testCase.manager);
        expect(typeof packageJson.packageManager).toBe("string");
        expect((packageJson.packageManager as string).startsWith(`${testCase.manager}@`)).toBe(true);
      }, INFERRED_TIMEOUT_MS + 60_000);
    }
  });
});
