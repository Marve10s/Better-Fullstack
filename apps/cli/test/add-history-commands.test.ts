import { afterAll, describe, expect, it } from "bun:test";
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdtemp, mkdir, readFile, rm } from "node:fs/promises";
import { homedir, tmpdir } from "node:os";
import { join, resolve } from "node:path";
import * as JSONC from "jsonc-parser";

const CLI_ENTRY = resolve(import.meta.dir, "..", "src", "cli.ts");
const NATIVE_BUN = resolve(homedir(), ".bun", "bin", "bun");
const BUN_EXECUTABLE = process.env.BFS_TEST_BUN_BIN || (existsSync(NATIVE_BUN) ? NATIVE_BUN : "bun");
const CLI_COMMAND_TEST_TIMEOUT_MS = 30_000;
const TEMP_ROOTS: string[] = [];

function shellQuote(value: string): string {
  return `'${value.replaceAll("'", "'\\''")}'`;
}

async function makeTempRoot(prefix: string): Promise<string> {
  const root = await mkdtemp(join(tmpdir(), prefix));
  TEMP_ROOTS.push(root);
  return root;
}

async function runCli(
  args: string[],
  options: {
    cwd: string;
    env?: Record<string, string>;
  },
) {
  const maxAttempts = 5;
  let attempt = 0;
  let lastResult:
    | {
        exitCode: number;
        stdout: string;
        stderr: string;
        all: string;
      }
    | undefined;

  while (attempt < maxAttempts) {
    const outputDir = await mkdtemp(join(tmpdir(), "bfs-cli-output-"));
    TEMP_ROOTS.push(outputDir);
    const stdoutPath = join(outputDir, "stdout.log");
    const stderrPath = join(outputDir, "stderr.log");
    const command = [
      shellQuote(BUN_EXECUTABLE),
      shellQuote(CLI_ENTRY),
      ...args.map(shellQuote),
      ">",
      shellQuote(stdoutPath),
      "2>",
      shellQuote(stderrPath),
    ].join(" ");
    const result = await new Promise<{
      exitCode: number;
      stdout: string;
      stderr: string;
      all: string;
    }>((resolvePromise) => {
      const subprocess = spawn("/bin/sh", ["-c", command], {
        cwd: options.cwd,
        env: {
          ...process.env,
          CI: "true",
          ...options.env,
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

    lastResult = result;
    const transientModuleRace =
      result.exitCode !== 0 &&
      (result.stderr.includes("Cannot find module '@better-fullstack/types'") ||
        result.stderr.includes("Cannot find module '@better-fullstack/template-generator'"));

    if (!transientModuleRace) {
      return result;
    }

    attempt++;
    if (attempt < maxAttempts) {
      await Bun.sleep(150 * attempt);
    }
  }

  return lastResult!;
}

function cliOutput(result: Awaited<ReturnType<typeof runCli>>): string {
  return result.all || result.stdout || result.stderr;
}

async function readJsoncFile(path: string): Promise<unknown> {
  const raw = await readFile(path, "utf8");
  const errors: JSONC.ParseError[] = [];
  const parsed = JSONC.parse(raw, errors, {
    allowTrailingComma: true,
    disallowComments: false,
  });
  if (errors.length > 0) {
    throw new Error(`Failed to parse JSONC: ${path}`);
  }
  return parsed;
}

afterAll(async () => {
  await Promise.all(TEMP_ROOTS.map((dir) => rm(dir, { recursive: true, force: true })));
}, 30_000);

describe("CLI add command", () => {
  it("adds addon via --addons and is idempotent for already-installed addon", async () => {
    const root = await makeTempRoot("bfs-add-test-");
    const projectName = "app";
    const projectDir = join(root, projectName);

    const createResult = await runCli(
      ["create", projectName, "--yes", "--no-install", "--no-git", "--disable-analytics"],
      { cwd: root },
    );

    expect(createResult.exitCode).toBe(0);

    const addResult = await runCli(
      ["add", "--project-dir", projectDir, "--addons", "mcp"],
      {
        cwd: root,
        env: {
          BFS_SKIP_EXTERNAL_COMMANDS: "1",
        },
      },
    );

    expect(
      addResult.exitCode,
      `add failed\nstdout:\n${addResult.stdout}\nstderr:\n${addResult.stderr}`,
    ).toBe(0);
    expect(cliOutput(addResult)).toContain("Successfully added: mcp");

    const config = (await readJsoncFile(join(projectDir, "bts.jsonc"))) as {
      addons?: string[];
    };

    expect(config.addons).toBeDefined();
    expect(config.addons).toContain("mcp");

    const secondAddResult = await runCli(
      ["add", "--project-dir", projectDir, "--addons", "mcp"],
      {
        cwd: root,
        env: {
          BFS_SKIP_EXTERNAL_COMMANDS: "1",
        },
      },
    );

    expect(secondAddResult.exitCode).toBe(0);
    expect(cliOutput(secondAddResult)).toContain("No new addons selected.");
  }, CLI_COMMAND_TEST_TIMEOUT_MS);
});

describe("CLI history command", () => {
  it("prints JSON history and supports clear", async () => {
    const root = await makeTempRoot("bfs-history-test-");
    const homeDir = join(root, "home");
    await mkdir(homeDir, { recursive: true });

    const sharedEnv = {
      HOME: homeDir,
      XDG_CONFIG_HOME: join(homeDir, ".config"),
      XDG_DATA_HOME: join(homeDir, ".local", "share"),
    };

    const createResult = await runCli(
      ["create", "history-app", "--yes", "--no-install", "--no-git", "--disable-analytics"],
      { cwd: root, env: sharedEnv },
    );
    expect(
      createResult.exitCode,
      `create failed\nstdout:\n${createResult.stdout}\nstderr:\n${createResult.stderr}`,
    ).toBe(0);

    const historyJson = await runCli(["history", "--json", "--limit", "1"], {
      cwd: root,
      env: sharedEnv,
    });
    expect(historyJson.exitCode).toBe(0);

    const parsedHistory = JSON.parse(cliOutput(historyJson)) as Array<{
      projectName: string;
      projectDir: string;
      reproducibleCommand: string;
    }>;

    expect(parsedHistory.length).toBe(1);
    expect(parsedHistory[0]?.projectName).toBe("history-app");
    expect(parsedHistory[0]?.projectDir).toContain("history-app");
    expect(parsedHistory[0]?.reproducibleCommand).toMatch(
      /(create-better-fullstack|bun create better-fullstack@latest)/,
    );

    const clearResult = await runCli(["history", "--clear"], {
      cwd: root,
      env: sharedEnv,
    });
    expect(clearResult.exitCode).toBe(0);

    const historyAfterClear = await runCli(["history", "--json", "--limit", "1"], {
      cwd: root,
      env: sharedEnv,
    });
    expect(historyAfterClear.exitCode).toBe(0);

    const parsedAfterClear = JSON.parse(cliOutput(historyAfterClear)) as unknown[];
    expect(parsedAfterClear).toEqual([]);
  }, CLI_COMMAND_TEST_TIMEOUT_MS);

  it("stores the ecosystem-specific reproducible command for Python projects", async () => {
    const root = await makeTempRoot("bfs-history-python-test-");
    const homeDir = join(root, "home");
    await mkdir(homeDir, { recursive: true });

    const sharedEnv = {
      HOME: homeDir,
      XDG_CONFIG_HOME: join(homeDir, ".config"),
      XDG_DATA_HOME: join(homeDir, ".local", "share"),
    };

    const expectedCommand =
      "bun create better-fullstack@latest python-history-app " +
      "--ecosystem python " +
      "--python-web-framework django " +
      "--python-orm sqlalchemy " +
      "--python-validation pydantic " +
      "--python-ai none " +
      "--python-auth none " +
      "--python-api none " +
      "--python-task-queue celery " +
      "--python-graphql none " +
      "--python-quality ruff " +
      "--python-testing none " +
      "--python-caching none " +
      "--python-realtime none " +
      "--python-observability none " +
      "--python-cli none " +
      "--email none " +
      "--observability none " +
      "--caching none " +
      "--search none " +
      "--addons none " +
      "--examples none " +
      "--db-setup none " +
      "--web-deploy none " +
      "--server-deploy none " +
      "--ai-docs claude-md " +
      "--no-git " +
      "--package-manager bun " +
      "--no-install";

    const createResult = await runCli(
      [
        "create",
        "python-history-app",
        "--ecosystem",
        "python",
        "--python-web-framework",
        "django",
        "--python-orm",
        "sqlalchemy",
        "--python-validation",
        "pydantic",
        "--python-ai",
        "none",
        "--python-auth",
        "none",
        "--python-api",
        "none",
        "--python-task-queue",
        "celery",
        "--python-graphql",
        "none",
        "--python-quality",
        "ruff",
        "--python-testing",
        "none",
        "--python-caching",
        "none",
        "--python-realtime",
        "none",
        "--python-observability",
        "none",
        "--python-cli",
        "none",
        "--email",
        "none",
        "--observability",
        "none",
        "--caching",
        "none",
        "--search",
        "none",
        "--addons",
        "none",
        "--examples",
        "none",
        "--ai-docs",
        "claude-md",
        "--package-manager",
        "bun",
        "--no-install",
        "--no-git",
        "--disable-analytics",
      ],
      { cwd: root, env: sharedEnv },
    );

    expect(
      createResult.exitCode,
      `create failed\nstdout:\n${createResult.stdout}\nstderr:\n${createResult.stderr}`,
    ).toBe(0);
    expect(cliOutput(createResult)).toContain(expectedCommand);
    expect(cliOutput(createResult)).not.toContain("--frontend none");

    const historyJson = await runCli(["history", "--json", "--limit", "1"], {
      cwd: root,
      env: sharedEnv,
    });
    expect(historyJson.exitCode).toBe(0);

    const parsedHistory = JSON.parse(cliOutput(historyJson)) as Array<{
      reproducibleCommand: string;
    }>;

    expect(parsedHistory[0]?.reproducibleCommand).toBe(expectedCommand);
  }, CLI_COMMAND_TEST_TIMEOUT_MS);
});

function telemetrySettingsPath(homeDir: string): string {
  if (process.platform === "darwin") {
    return join(homeDir, "Library", "Application Support", "better-fullstack", "telemetry.json");
  }
  // Linux/others: XDG_DATA_HOME is set to <homeDir>/.local/share below.
  return join(homeDir, ".local", "share", "better-fullstack", "telemetry.json");
}

describe("CLI telemetry command", () => {
  it("reports status, persists enable/disable, and honors env override precedence", async () => {
    const root = await makeTempRoot("bfs-telemetry-test-");
    const homeDir = join(root, "home");
    await mkdir(homeDir, { recursive: true });

    const sharedEnv = {
      HOME: homeDir,
      XDG_CONFIG_HOME: join(homeDir, ".config"),
      XDG_DATA_HOME: join(homeDir, ".local", "share"),
    };

    // Default (no preference, no env override): enabled, source "default".
    const statusDefault = await runCli(["telemetry", "status", "--json"], {
      cwd: root,
      env: sharedEnv,
    });
    expect(statusDefault.exitCode).toBe(0);
    const parsedDefault = JSON.parse(cliOutput(statusDefault)) as {
      enabled: boolean;
      source: string;
      persisted: boolean | null;
    };
    expect(parsedDefault.enabled).toBe(true);
    expect(parsedDefault.source).toBe("default");
    expect(parsedDefault.persisted).toBeNull();

    // Disable persists the preference to disk.
    const disableResult = await runCli(["telemetry", "disable"], { cwd: root, env: sharedEnv });
    expect(disableResult.exitCode).toBe(0);
    expect(cliOutput(disableResult)).toContain("Telemetry disabled");

    const settingsPath = telemetrySettingsPath(homeDir);
    const persisted = JSON.parse(await readFile(settingsPath, "utf8")) as {
      enabled?: boolean;
      noticeShown?: boolean;
    };
    expect(persisted.enabled).toBe(false);
    expect(persisted.noticeShown).toBe(true);

    // A fresh process reads the persisted preference.
    const statusDisabled = await runCli(["telemetry", "status", "--json"], {
      cwd: root,
      env: sharedEnv,
    });
    const parsedDisabled = JSON.parse(cliOutput(statusDisabled)) as {
      enabled: boolean;
      source: string;
      persisted: boolean | null;
    };
    expect(parsedDisabled.enabled).toBe(false);
    expect(parsedDisabled.source).toBe("preference");
    expect(parsedDisabled.persisted).toBe(false);

    // Re-enable.
    const enableResult = await runCli(["telemetry", "enable"], { cwd: root, env: sharedEnv });
    expect(enableResult.exitCode).toBe(0);
    expect(cliOutput(enableResult)).toContain("Telemetry enabled");

    const statusEnabled = await runCli(["telemetry", "status", "--json"], {
      cwd: root,
      env: sharedEnv,
    });
    const parsedEnabled = JSON.parse(cliOutput(statusEnabled)) as {
      enabled: boolean;
      source: string;
    };
    expect(parsedEnabled.enabled).toBe(true);
    expect(parsedEnabled.source).toBe("preference");

    // Env override beats the persisted (enabled) preference.
    const statusEnvOverride = await runCli(["telemetry", "status", "--json"], {
      cwd: root,
      env: { ...sharedEnv, BTS_TELEMETRY_DISABLED: "1" },
    });
    const parsedEnvOverride = JSON.parse(cliOutput(statusEnvOverride)) as {
      enabled: boolean;
      source: string;
    };
    expect(parsedEnvOverride.enabled).toBe(false);
    expect(parsedEnvOverride.source).toBe("env");
  }, CLI_COMMAND_TEST_TIMEOUT_MS);
});
