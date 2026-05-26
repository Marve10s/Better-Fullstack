import { afterAll, beforeAll, describe, expect, it } from "bun:test";
import { parse } from "jsonc-parser";
import { existsSync, readFileSync } from "node:fs";
import { mkdir, readFile, rm } from "node:fs/promises";
import { join } from "node:path";

import { DEFAULT_STACK } from "../../../web/src/lib/stack-defaults";
import { generateStackCommand } from "../../../web/src/lib/stack-utils";
import { formatCliScaffoldFailure } from "../../../../testing/lib/cli-scaffold";
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
  {
    name: "requested-typescript-options",
    stack: {
      ...DEFAULT_STACK,
      projectName: "roundtrip-requested-options",
      webFrontend: ["tanstack-router"],
      backend: "hono",
      runtime: "bun",
      auth: "none",
      uiLibrary: "none",
      forms: "none",
      logging: "evlog",
      cms: "directus",
      fileStorage: "cloudinary",
      appPlatforms: ["swr"],
      aiDocs: [],
      git: "false",
      install: "false",
    },
    assertConfig: (config) => {
      expect(config.frontend).toEqual(["tanstack-router"]);
      expect(config.logging).toBe("evlog");
      expect(config.cms).toBe("directus");
      expect(config.fileStorage).toBe("cloudinary");
      expect(config.addons).toEqual(["swr"]);
    },
    assertMarkers: (projectDir) => {
      const serverPackageJson = JSON.parse(
        readFileSync(join(projectDir, "apps", "server", "package.json"), "utf8"),
      ) as {
        dependencies: Record<string, string>;
      };
      const webPackageJson = JSON.parse(
        readFileSync(join(projectDir, "apps", "web", "package.json"), "utf8"),
      ) as {
        dependencies: Record<string, string>;
      };
      const serverEnv = readFileSync(join(projectDir, "apps", "server", ".env"), "utf8");
      const webEnv = readFileSync(join(projectDir, "apps", "web", ".env"), "utf8");

      expect(serverPackageJson.dependencies.evlog).toBeDefined();
      expect(serverPackageJson.dependencies.cloudinary).toBeDefined();
      expect(webPackageJson.dependencies["@directus/sdk"]).toBeDefined();
      expect(webPackageJson.dependencies.swr).toBeDefined();
      expect(existsSync(join(projectDir, "apps", "server", "src", "lib", "logger.ts"))).toBe(true);
      expect(existsSync(join(projectDir, "apps", "server", "src", "lib", "storage.ts"))).toBe(true);
      expect(existsSync(join(projectDir, "apps", "web", "src", "directus", "client.ts"))).toBe(true);
      expect(webEnv).toContain("VITE_DIRECTUS_URL");
      expect(serverEnv).toContain("CLOUDINARY_CLOUD_NAME");
    },
  },
  {
    name: "svelte-shadcn-svelte",
    stack: {
      ...DEFAULT_STACK,
      projectName: "roundtrip-shadcn-svelte",
      webFrontend: ["svelte"],
      backend: "hono",
      runtime: "bun",
      auth: "none",
      api: "orpc",
      uiLibrary: "shadcn-svelte",
      forms: "none",
      appPlatforms: [],
      aiDocs: [],
      git: "false",
      install: "false",
    },
    assertConfig: (config) => {
      expect(config.frontend).toEqual(["svelte"]);
      expect(config.uiLibrary).toBe("shadcn-svelte");
      expect(config.cssFramework).toBe("tailwind");
    },
    assertMarkers: (projectDir) => {
      const webPackageJson = JSON.parse(
        readFileSync(join(projectDir, "apps", "web", "package.json"), "utf8"),
      ) as {
        dependencies: Record<string, string>;
        devDependencies: Record<string, string>;
      };
      const componentsJson = readFileSync(join(projectDir, "apps", "web", "components.json"), "utf8");
      const appCss = readFileSync(join(projectDir, "apps", "web", "src", "app.css"), "utf8");
      const utils = readFileSync(join(projectDir, "apps", "web", "src", "lib", "utils.ts"), "utf8");

      expect(webPackageJson.dependencies["bits-ui"]).toBeDefined();
      expect(webPackageJson.dependencies["lucide-svelte"]).toBeDefined();
      expect(webPackageJson.dependencies.clsx).toBeDefined();
      expect(webPackageJson.dependencies["tailwind-merge"]).toBeDefined();
      expect(webPackageJson.dependencies["shadcn-svelte"]).toBeDefined();
      expect(componentsJson).toContain("\"aliases\"");
      expect(appCss).toContain("@import \"tw-animate-css\"");
      expect(utils).toContain("export function cn");
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
        expectedFiles: ["bts.jsonc"],
      });

      const failureDetails = formatCliScaffoldFailure(result, {
        header: `Web command roundtrip failed for ${testCase.name}`,
        expectedFiles: ["bts.jsonc"],
      });

      if (!result.ok || result.stderr.includes("ValidationError") || !existsSync(join(projectDir, "bts.jsonc"))) {
        throw new Error(failureDetails);
      }

      const config = await readJsoncFile(join(projectDir, "bts.jsonc"));
      testCase.assertConfig(config);
      await testCase.assertMarkers?.(projectDir);
    }, (testCase.timeoutMs ?? DEFAULT_CASE_TIMEOUT_MS) + 60_000);
  }
});
