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

type BtsConfigShape = {
  ecosystem?: string;
  frontend?: string[];
  backend?: string;
  database?: string;
  orm?: string;
};

const NON_INSTALL_FLAGS = ["--no-install", "--no-git", "--disable-analytics"] as const;

afterAll(async () => {
  await Promise.all(TEMP_ROOTS.map((dir) => rm(dir, { recursive: true, force: true })));
}, 30_000);

describe("create --from-history", () => {
  it(
    "replays the stack of the selected history entry and errors on a bad index",
    async () => {
      const root = await makeTempRoot("bfs-from-history-test-");
      const homeDir = join(root, "home");
      await mkdir(homeDir, { recursive: true });

      const sharedEnv = {
        HOME: homeDir,
        XDG_CONFIG_HOME: join(homeDir, ".config"),
        XDG_DATA_HOME: join(homeDir, ".local", "share"),
      };

      // Oldest entry: a TypeScript default project.
      const tsCreate = await runCli(["create", "ts-app", "--yes", ...NON_INSTALL_FLAGS], {
        cwd: root,
        env: sharedEnv,
      });
      expect(
        tsCreate.exitCode,
        `ts create failed\n${cliOutput(tsCreate)}`,
      ).toBe(0);

      // Newest entry: a React Native project (a clearly different ecosystem).
      const nativeCreate = await runCli(
        ["create", "native-app", "--yes", "--ecosystem", "react-native", ...NON_INSTALL_FLAGS],
        { cwd: root, env: sharedEnv },
      );
      expect(
        nativeCreate.exitCode,
        `native create failed\n${cliOutput(nativeCreate)}`,
      ).toBe(0);

      // History is now [native-app, ts-app]. Use --dry-run to probe index
      // resolution without mutating history (dry runs are not recorded).
      const probeRecent = await runCli(
        ["create", "probe-1", "--from-history", "1", "--dry-run", "--disable-analytics"],
        { cwd: root, env: sharedEnv },
      );
      expect(
        probeRecent.exitCode,
        `probe 1 failed\n${cliOutput(probeRecent)}`,
      ).toBe(0);
      // Position 1 (most recent) is the React Native project.
      expect(cliOutput(probeRecent)).toContain("react-native");

      const probeOlder = await runCli(
        ["create", "probe-2", "--from-history", "2", "--dry-run", "--disable-analytics"],
        { cwd: root, env: sharedEnv },
      );
      expect(
        probeOlder.exitCode,
        `probe 2 failed\n${cliOutput(probeOlder)}`,
      ).toBe(0);
      // Position 2 is the older TypeScript project (a distinct entry).
      expect(cliOutput(probeOlder)).not.toContain("react-native");

      // A real replay of the most recent entry actually scaffolds it.
      const replayRecent = await runCli(
        ["create", "replay-recent", "--from-history", "1", ...NON_INSTALL_FLAGS],
        { cwd: root, env: sharedEnv },
      );
      expect(
        replayRecent.exitCode,
        `replay 1 failed\n${cliOutput(replayRecent)}`,
      ).toBe(0);
      const recentConfig = (await readJsoncFile(
        join(root, "replay-recent", "bts.jsonc"),
      )) as BtsConfigShape;
      expect(recentConfig.ecosystem).toBe("react-native");
      expect(recentConfig.frontend).toContain("native-bare");

      // Out-of-range index errors clearly without scaffolding.
      const outOfRange = await runCli(
        ["create", "replay-bad", "--from-history", "99", ...NON_INSTALL_FLAGS],
        { cwd: root, env: sharedEnv },
      );
      expect(outOfRange.exitCode).not.toBe(0);
      expect(cliOutput(outOfRange)).toContain("No project history entry at position 99");
      expect(existsSync(join(root, "replay-bad", "bts.jsonc"))).toBe(false);
    },
    180_000,
  );
});

describe("create --config", () => {
  it(
    "loads a bts.jsonc file as the base stack and errors on a missing file",
    async () => {
      const root = await makeTempRoot("bfs-from-config-test-");

      const srcCreate = await runCli(["create", "cfg-src", "--yes", ...NON_INSTALL_FLAGS], {
        cwd: root,
      });
      expect(
        srcCreate.exitCode,
        `source create failed\n${cliOutput(srcCreate)}`,
      ).toBe(0);

      const configPath = join(root, "cfg-src", "bts.jsonc");
      const sourceConfig = (await readJsoncFile(configPath)) as BtsConfigShape;

      const cfgReplay = await runCli(
        ["create", "cfg-replay", "--config", configPath, ...NON_INSTALL_FLAGS],
        { cwd: root },
      );
      expect(
        cfgReplay.exitCode,
        `config replay failed\n${cliOutput(cfgReplay)}`,
      ).toBe(0);

      const replayConfig = (await readJsoncFile(
        join(root, "cfg-replay", "bts.jsonc"),
      )) as BtsConfigShape;
      expect(replayConfig.ecosystem).toBe(sourceConfig.ecosystem);
      expect(replayConfig.frontend).toEqual(sourceConfig.frontend);
      expect(replayConfig.backend).toBe(sourceConfig.backend);
      expect(replayConfig.database).toBe(sourceConfig.database);
      expect(replayConfig.orm).toBe(sourceConfig.orm);

      const missing = await runCli(
        ["create", "cfg-missing", "--config", join(root, "does-not-exist.jsonc"), ...NON_INSTALL_FLAGS],
        { cwd: root },
      );
      expect(missing.exitCode).not.toBe(0);
      expect(cliOutput(missing)).toContain("Could not load config file");
    },
    180_000,
  );

  it(
    "rejects combining --from-history with --config",
    async () => {
      const root = await makeTempRoot("bfs-config-conflict-test-");
      const result = await runCli(
        ["create", "conflict", "--from-history", "1", "--config", "bts.jsonc", ...NON_INSTALL_FLAGS],
        { cwd: root },
      );
      expect(result.exitCode).not.toBe(0);
      expect(cliOutput(result)).toContain("Cannot combine --from-history with --config");
    },
    60_000,
  );
});
