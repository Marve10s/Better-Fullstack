import { afterAll, afterEach, describe, expect, it, mock } from "bun:test";
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { homedir, tmpdir } from "node:os";
import { join, resolve } from "node:path";
import fs from "fs-extra";

import { dependencyVersionMap } from "@better-fullstack/template-generator";
import {
  DEFAULT_STACK_SELECTION,
  generateStackSelectionCommand,
  type StackSelectionInput,
} from "@better-fullstack/types/stack-translation";

import { CreateCommandOptionsSchema } from "../src/create-command-input";
import { runTRPCTest, expectSuccess } from "./test-utils";

const CLI_ENTRY = resolve(import.meta.dir, "..", "src", "cli.ts");
const NATIVE_BUN = resolve(homedir(), ".bun", "bin", "bun");
const BUN_EXECUTABLE = process.env.BFS_TEST_BUN_BIN || (existsSync(NATIVE_BUN) ? NATIVE_BUN : "bun");
const TEMP_ROOTS: string[] = [];
const originalFetch = global.fetch;

const COMMAND_LAUNCHERS = [
  ["bun", "create", "better-fullstack@latest"],
  ["pnpm", "create", "better-fullstack@latest"],
  ["yarn", "create", "better-fullstack@latest"],
  ["npx", "create-better-fullstack@latest"],
] as const;

function shellQuote(value: string): string {
  return `'${value.replaceAll("'", "'\\''")}'`;
}

function splitCommand(command: string): string[] {
  return command.trim().split(/\s+/).filter(Boolean);
}

function commandPayload(command: string): string[] {
  const tokens = splitCommand(command);
  const launcher = COMMAND_LAUNCHERS.find((candidate) =>
    candidate.every((part, index) => tokens[index] === part),
  );

  if (!launcher) {
    throw new Error(`Unsupported generated launcher: ${command}`);
  }

  const payload = tokens.slice(launcher.length);
  return payload[0] === "--" ? payload.slice(1) : payload;
}

function extractFlags(command: string): string[] {
  const flags: string[] = [];
  const flagPattern = /(?:^|\s)--([a-z0-9-]+)/g;
  let match: RegExpExecArray | null;

  while ((match = flagPattern.exec(command)) !== null) {
    flags.push(match[1]!);
  }

  return flags;
}

function camelToKebab(value: string): string {
  const acronymFlags: Record<string, string> = {
    mobileUI: "mobile-ui",
    mobileOTA: "mobile-ota",
  };
  if (acronymFlags[value]) return acronymFlags[value];

  return value.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

function getAcceptedCreateFlags(): Set<string> {
  const shape = CreateCommandOptionsSchema.shape;
  const flags = new Set<string>();

  for (const key of Object.keys(shape)) {
    const flag = camelToKebab(key);
    flags.add(flag);
    flags.add(`no-${flag}`);
  }

  return flags;
}

function makeSelection(
  projectName: string,
  overrides: Partial<StackSelectionInput> = {},
): StackSelectionInput {
  return {
    ...DEFAULT_STACK_SELECTION,
    projectName,
    install: "false",
    git: "false",
    aiDocs: [],
    ...overrides,
  };
}

function buildRepresentativeCommands(): Array<{ name: string; command: string }> {
  return [
    {
      name: "typescript beta turborepo command copied for pnpm",
      command: generateStackSelectionCommand(
        makeSelection("ci-typescript-beta", {
          packageManager: "pnpm",
          versionChannel: "beta",
          codeQuality: ["biome", "oxlint"],
          appPlatforms: ["turborepo"],
        }),
      ),
    },
    {
      name: "typescript single-app command",
      command: generateStackSelectionCommand(
        makeSelection("ci-single-app", {
          workspaceShape: "single-app",
          webFrontend: ["next"],
          backend: "self-next",
          runtime: "node",
          database: "none",
          orm: "none",
          auth: "none",
          api: "none",
        }),
      ),
    },
    {
      name: "react native command",
      command: generateStackSelectionCommand(
        makeSelection("ci-native", {
          ecosystem: "react-native",
          webFrontend: ["none"],
          nativeFrontend: ["native-bare"],
          auth: "none",
          mobileNavigation: "expo-router",
        }),
      ),
    },
    {
      name: "rust command",
      command: generateStackSelectionCommand(
        makeSelection("ci-rust", {
          ecosystem: "rust",
          rustWebFramework: "axum",
          rustFrontend: "leptos",
          rustOrm: "sqlx",
          rustApi: "tonic",
          rustLibraries: ["serde", "validator"],
        }),
      ),
    },
    {
      name: "python command",
      command: generateStackSelectionCommand(
        makeSelection("ci-python", {
          ecosystem: "python",
          pythonWebFramework: "fastapi",
          pythonOrm: "sqlalchemy",
          pythonValidation: "pydantic",
          pythonTesting: ["pytest"],
        }),
      ),
    },
    {
      name: "go command",
      command: generateStackSelectionCommand(
        makeSelection("ci-go", {
          ecosystem: "go",
          goWebFramework: "gin",
          goOrm: "gorm",
          goApi: "grpc-go",
          auth: "go-better-auth",
        }),
      ),
    },
    {
      name: "java command",
      command: generateStackSelectionCommand(
        makeSelection("ci-java", {
          ecosystem: "java",
          javaWebFramework: "spring-boot",
          javaBuildTool: "maven",
          javaOrm: "spring-data-jpa",
          javaTestingLibraries: ["junit5", "mockito"],
        }),
      ),
    },
    {
      name: "dotnet command",
      command: generateStackSelectionCommand(
        makeSelection("ci-dotnet", {
          ecosystem: "dotnet",
          dotnetWebFramework: "aspnet-minimal",
          dotnetOrm: "ef-core",
          dotnetAuth: "aspnet-identity",
          dotnetTesting: ["xunit", "testcontainers-dotnet"],
          dotnetObservability: ["serilog", "health-checks"],
        }),
      ),
    },
    {
      name: "elixir command",
      command: generateStackSelectionCommand(
        makeSelection("ci-elixir", {
          ecosystem: "elixir",
          elixirWebFramework: "phoenix",
          elixirOrm: "ecto-sql",
          elixirTesting: "ex_unit",
        }),
      ),
    },
    {
      name: "multi-ecosystem graph command",
      command: generateStackSelectionCommand(
        makeSelection("ci-graph", {
          stackMode: "multi",
          stackPartSpecs: [
            "frontend:typescript:next",
            "backend:typescript:hono",
            "backend.runtime:typescript:bun",
            "database:universal:sqlite",
            "backend.orm:typescript:drizzle",
            "workspaceTooling:universal:turborepo",
            "codeQuality:universal:biome",
          ],
          webFrontend: ["next"],
          backend: "hono",
          runtime: "bun",
          database: "sqlite",
          orm: "drizzle",
          codeQuality: ["biome"],
          appPlatforms: ["turborepo"],
        }),
      ),
    },
  ];
}

function buildDefaultLauncherCommands(): Array<{ name: string; command: string }> {
  const launcherByPackageManager = {
    bun: "bun create better-fullstack@latest",
    pnpm: "pnpm create better-fullstack@latest",
    yarn: "yarn create better-fullstack@latest",
    npm: "npx create-better-fullstack@latest",
  } as const;

  return (["bun", "pnpm", "yarn", "npm"] as const).map((packageManager) => {
    const payload = commandPayload(
      generateStackSelectionCommand({
        ...DEFAULT_STACK_SELECTION,
        projectName: `ci-${packageManager}-default`,
      }),
    );

    return {
      name: `${packageManager} default command`,
      command: `${launcherByPackageManager[packageManager]} ${payload.join(" ")}`,
    };
  });
}

async function makeTempRoot(prefix: string): Promise<string> {
  const root = await mkdtemp(join(tmpdir(), prefix));
  TEMP_ROOTS.push(root);
  return root;
}

async function runLocalDryRunFromGeneratedCommand(command: string) {
  const root = await makeTempRoot("bfs-generated-command-");
  const outputDir = await makeTempRoot("bfs-generated-command-output-");
  const stdoutPath = join(outputDir, "stdout.log");
  const stderrPath = join(outputDir, "stderr.log");
  const args = [
    "create",
    ...commandPayload(command),
    "--dry-run",
    "--disable-analytics",
  ];
  const shellCommand = [
    shellQuote(BUN_EXECUTABLE),
    shellQuote(CLI_ENTRY),
    ...args.map(shellQuote),
    ">",
    shellQuote(stdoutPath),
    "2>",
    shellQuote(stderrPath),
  ].join(" ");

  return new Promise<{
    exitCode: number;
    stdout: string;
    stderr: string;
    all: string;
  }>((resolvePromise) => {
    const subprocess = spawn("/bin/sh", ["-c", shellCommand], {
      cwd: root,
      env: {
        ...process.env,
        BFS_SKIP_BUILDER_PROMPT: "1",
        CI: "true",
      },
      stdio: "ignore",
    });

    subprocess.on("close", async (code) => {
      const [stdout, stderr] = await Promise.all([
        readFile(stdoutPath, "utf8"),
        readFile(stderrPath, "utf8"),
      ]);
      resolvePromise({
        exitCode: code ?? 1,
        stdout,
        stderr,
        all: `${stdout}${stderr}`,
      });
    });

    subprocess.on("error", (error) => {
      resolvePromise({
        exitCode: 1,
        stdout: "",
        stderr: error.message,
        all: error.message,
      });
    });
  });
}

afterEach(() => {
  global.fetch = originalFetch;
  mock.restore();
});

afterAll(async () => {
  await Promise.all(TEMP_ROOTS.map((dir) => rm(dir, { recursive: true, force: true })));
}, 30_000);

describe("generated command contract", () => {
  it("emits package-manager launchers with the same CLI payload shape", () => {
    const launchersByPackageManager = new Map(
      (["bun", "pnpm", "yarn", "npm"] as const).map((packageManager) => {
        const command = generateStackSelectionCommand(
          makeSelection(`ci-${packageManager}`, { packageManager }),
        );
        return [packageManager, splitCommand(command).slice(0, -commandPayload(command).length)];
      }),
    );

    expect(launchersByPackageManager.get("bun")).toEqual([
      "bun",
      "create",
      "better-fullstack@latest",
    ]);
    expect(launchersByPackageManager.get("pnpm")).toEqual([
      "pnpm",
      "create",
      "better-fullstack@latest",
    ]);
    expect(launchersByPackageManager.get("yarn")).toEqual([
      "yarn",
      "create",
      "better-fullstack@latest",
    ]);
    expect(launchersByPackageManager.get("npm")).toEqual([
      "npx",
      "create-better-fullstack@latest",
    ]);
  });

  it("only emits flags accepted by the local create command schema", () => {
    const acceptedFlags = getAcceptedCreateFlags();
    const unknownFlags = buildRepresentativeCommands().flatMap(({ name, command }) =>
      extractFlags(command)
        .filter((flag) => !acceptedFlags.has(flag))
        .map((flag) => `${name}: --${flag}`),
    );

    expect(unknownFlags).toEqual([]);
  });

  it(
    "dry-runs generated default launcher commands through the local CLI",
    async () => {
      const results = await Promise.all(
        buildDefaultLauncherCommands().map(async ({ name, command }) => ({
          name,
          command,
          result: await runLocalDryRunFromGeneratedCommand(command),
        })),
      );

      for (const { name, command, result } of results) {
        expect(
          result.exitCode,
          `${name} failed\nCommand: ${command}\n\n${result.all}`,
        ).toBe(0);
        expect(result.all).toContain("Dry run complete");
      }
    },
    { timeout: 120_000 },
  );
});

describe("generated beta dependency invariants", () => {
  it(
    "keeps Turborepo at the stable template floor for beta scaffolds",
    async () => {
      const turboTemplateFloor = dependencyVersionMap.turbo;
      const turboStableVersion = turboTemplateFloor.replace(/^[~^]/, "");

      global.fetch = mock(async (input: string | URL | Request) => {
        const url = String(input);
        const packageName = decodeURIComponent(url.split("/").pop() ?? "");

        if (packageName === "turbo") {
          return new Response(
            JSON.stringify({
              "dist-tags": {
                latest: turboStableVersion,
                next: "0.9.0-next.22",
              },
              versions: {
                "0.9.0-next.22": {},
                [turboStableVersion]: {},
              },
            }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            },
          );
        }

        return new Response(
          JSON.stringify({
            "dist-tags": {
              latest: "1.0.0",
            },
            versions: {
              "1.0.0": {},
            },
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          },
        );
      }) as unknown as typeof fetch;

      const result = await runTRPCTest({
        projectName: "beta-turbo-floor",
        yes: false,
        ecosystem: "typescript",
        frontend: ["tanstack-router"],
        backend: "hono",
        runtime: "bun",
        api: "trpc",
        database: "sqlite",
        orm: "drizzle",
        auth: "better-auth",
        addons: ["turborepo"],
        examples: ["none"],
        packageManager: "bun",
        versionChannel: "beta",
        install: false,
        git: false,
      });

      expectSuccess(result);

      const packageJson = await fs.readJson(join(result.projectDir!, "package.json"));
      expect(packageJson.devDependencies.turbo).toBe(turboTemplateFloor);
      expect(packageJson.scripts["db:generate"]).toContain("turbo");
    },
    { timeout: 60_000 },
  );
});
