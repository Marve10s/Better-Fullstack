import { afterAll, beforeAll, describe, expect, it } from "bun:test";
import { parse } from "jsonc-parser";
import { existsSync, readFileSync } from "node:fs";
import { mkdir, readFile, rm } from "node:fs/promises";
import { join } from "node:path";

import { DEFAULT_STACK } from "../../../web/src/lib/stack-defaults";
import { generateStackCommand } from "../../../web/src/lib/stack-utils";
import { scaffoldWithCLIBinary } from "./e2e-utils";

const SMOKE_DIR = join(import.meta.dir, "..", "..", ".smoke-web-command-roundtrip");
const CLI_BINARY_PATH = join(import.meta.dir, "..", "..", "dist", "cli.mjs");

type RoundtripCase = {
  name: string;
  stack: typeof DEFAULT_STACK;
  assertConfig: (config: Record<string, unknown>) => void;
  assertMarkers?: (projectDir: string) => void | Promise<void>;
  timeoutMs?: number;
};

const DEFAULT_CASE_TIMEOUT_MS = 180_000;
const CLEANUP_TIMEOUT_MS = 120_000;

function stripLauncherPrefix(command: string) {
  const prefixes = [
    /^bun create better-fullstack@latest\s+/,
    /^npx create-better-fullstack@latest\s+/,
    /^pnpm create better-fullstack@latest\s+/,
    /^yarn create better-fullstack@latest\s+/,
  ];

  for (const prefix of prefixes) {
    if (prefix.test(command)) {
      return command.replace(prefix, "");
    }
  }

  throw new Error(`Unsupported launcher prefix in command: ${command}`);
}

function parseCommand(command: string) {
  const stripped = stripLauncherPrefix(command);
  const [projectName, ...flags] = stripped.trim().split(/\s+/);

  if (!projectName) {
    throw new Error(`Could not parse project name from command: ${command}`);
  }

  return { projectName, flags };
}

async function readJsoncFile(path: string) {
  const content = await readFile(path, "utf8");
  return parse(content) as Record<string, unknown>;
}

const CASES: RoundtripCase[] = [
  {
    name: "typescript-default",
    stack: {
      ...DEFAULT_STACK,
      projectName: "roundtrip-default",
    },
    timeoutMs: 360_000,
    assertConfig: (config) => {
      expect(config.ecosystem).toBe("typescript");
      expect(config.backend).toBe("hono");
      expect(config.frontend).toEqual(["tanstack-router"]);
    },
    assertMarkers: (projectDir) => {
      expect(existsSync(join(projectDir, "package.json"))).toBe(true);
    },
  },
  {
    name: "typescript-astro",
    stack: {
      ...DEFAULT_STACK,
      projectName: "roundtrip-astro",
      webFrontend: ["astro"],
      astroIntegration: "react",
      git: "false",
      install: "false",
    },
    assertConfig: (config) => {
      expect(config.frontend).toEqual(["astro"]);
    },
    assertMarkers: (projectDir) => {
      const webPackageJson = JSON.parse(
        readFileSync(join(projectDir, "apps", "web", "package.json"), "utf8"),
      ) as {
        dependencies: Record<string, string>;
      };
      expect(webPackageJson.dependencies["@astrojs/react"]).toBeDefined();
      expect(webPackageJson.dependencies.react).toBeDefined();
    },
  },
  {
    name: "typescript-addons",
    stack: {
      ...DEFAULT_STACK,
      projectName: "roundtrip-addons",
      codeQuality: ["biome"],
      documentation: [],
      appPlatforms: ["pwa"],
      git: "false",
      install: "false",
    },
    assertConfig: (config) => {
      expect(config.addons).toEqual(
        expect.arrayContaining(["biome", "pwa"]),
      );
    },
  },
  {
    name: "python-ai",
    stack: {
      ...DEFAULT_STACK,
      ecosystem: "python",
      projectName: "roundtrip-python",
      pythonAi: ["langchain", "openai-sdk"],
      git: "false",
      install: "false",
    },
    assertConfig: (config) => {
      expect(config.ecosystem).toBe("python");
      expect(config.pythonAi).toEqual(["langchain", "openai-sdk"]);
    },
    assertMarkers: (projectDir) => {
      expect(existsSync(join(projectDir, "pyproject.toml"))).toBe(true);
    },
  },
  {
    name: "rust-libraries",
    stack: {
      ...DEFAULT_STACK,
      ecosystem: "rust",
      projectName: "roundtrip-rust",
      rustLibraries: ["validator", "mockall"],
      git: "false",
      install: "false",
    },
    assertConfig: (config) => {
      expect(config.ecosystem).toBe("rust");
      expect(config.rustLibraries).toEqual(["validator", "mockall"]);
    },
    assertMarkers: (projectDir) => {
      expect(existsSync(join(projectDir, "Cargo.toml"))).toBe(true);
    },
  },
  {
    name: "go-auth",
    stack: {
      ...DEFAULT_STACK,
      ecosystem: "go",
      projectName: "roundtrip-go",
      goAuth: "casbin",
      aiDocs: [],
      git: "false",
      install: "false",
    },
    assertConfig: (config) => {
      expect(config.ecosystem).toBe("go");
      expect(config.goAuth).toBe("casbin");
      expect(config.aiDocs).toEqual([]);
    },
    assertMarkers: (projectDir) => {
      expect(existsSync(join(projectDir, "go.mod"))).toBe(true);
    },
  },
  {
    name: "self-backend",
    stack: {
      ...DEFAULT_STACK,
      projectName: "roundtrip-self",
      webFrontend: ["next"],
      backend: "self-next",
      git: "false",
      install: "false",
    },
    assertConfig: (config) => {
      expect(config.backend).toBe("self");
      expect(config.frontend).toEqual(["next"]);
    },
  },
];

describe("Web command roundtrip", () => {
  beforeAll(async () => {
    await rm(SMOKE_DIR, { recursive: true, force: true });
    await mkdir(SMOKE_DIR, { recursive: true });
  }, CLEANUP_TIMEOUT_MS);

  afterAll(async () => {
    if (!process.env.CI) {
      await rm(SMOKE_DIR, { recursive: true, force: true });
    }
  }, CLEANUP_TIMEOUT_MS);

  for (const testCase of CASES) {
    it(`executes the built CLI for ${testCase.name}`, async () => {
      const generatedCommand = generateStackCommand(testCase.stack);
      const { projectName, flags } = parseCommand(generatedCommand);
      const projectDir = join(SMOKE_DIR, projectName);
      const timeoutMs = testCase.timeoutMs ?? DEFAULT_CASE_TIMEOUT_MS;

      const result = await scaffoldWithCLIBinary(projectDir, flags, {
        cliPath: CLI_BINARY_PATH,
        timeout: timeoutMs,
      });

      if (!result.ok) {
        console.error(result.stderr);
      }

      expect(result.ok).toBe(true);
      expect(result.stderr).not.toContain("ValidationError");
      expect(existsSync(join(projectDir, "bts.jsonc"))).toBe(true);

      const config = await readJsoncFile(join(projectDir, "bts.jsonc"));
      testCase.assertConfig(config);
      await testCase.assertMarkers?.(projectDir);
    }, (testCase.timeoutMs ?? DEFAULT_CASE_TIMEOUT_MS) + 60_000);
  }
});
