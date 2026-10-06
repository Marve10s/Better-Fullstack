import { getCategoryCliValues } from "@better-fullstack/types";
import { afterAll, beforeAll, describe, expect, it } from "bun:test";
import { mkdtemp, readdir, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import z from "zod";

import {
  COMPLETION_BINARIES,
  COMPLETION_SHELLS,
  type CompletionShell,
} from "@/commands/system/completion";
import { router } from "@/run";

const CLI_ROOT = resolve(import.meta.dir, "../..");
const CLI_ENTRY = join(CLI_ROOT, "src/cli.ts");
const scripts = new Map<CompletionShell, string>();
let home: string;
let telemetryRequests = 0;
const { BTS_TELEMETRY_DISABLED: _telemetryOptOut, ...parentEnv } = process.env;

// The line in each script that lists the subcommands offered after the binary name.
const COMMAND_LIST_LINE: Record<CompletionShell, (line: string) => boolean> = {
  bash: (line) => line.includes("compgen -W '"),
  zsh: (line) => line.trimStart().startsWith("compadd -- '"),
  fish: (line) => line.includes("(commandline -opc)) -eq 1"),
  powershell: (line) => line.trimStart().startsWith("$commands = @("),
};

const tokensOf = (line: string | undefined) => (line ?? "").split(/[\s'"(),=@|;]+/);

function enumOptions(schema: z.ZodType): string[] {
  if (schema instanceof z.ZodOptional || schema instanceof z.ZodDefault) {
    return enumOptions(schema.unwrap());
  }
  return schema instanceof z.ZodEnum ? schema.options.map(String) : [];
}

// Read straight from the zod input schemas, independent of how the CLI converts them.
const positionalEnums = Object.entries(router).flatMap(([command, procedure]) => {
  const input = procedure["~orpc"].inputSchema;
  if (!(input instanceof z.ZodTuple)) return [];
  return input.def.items.flatMap((item, position) => {
    const values = enumOptions(item);
    return values.length > 0 ? [{ command, position, values }] : [];
  });
});

function positionalValues(command: string) {
  return positionalEnums.find((positional) => positional.command === command)?.values ?? [];
}

function lineFor(script: string, predicate: (line: string) => boolean) {
  return script.split("\n").find(predicate);
}

const telemetryIngest = Bun.serve({
  port: 0,
  fetch() {
    telemetryRequests++;
    return new Response(null, { status: 204 });
  },
});

beforeAll(async () => {
  home = await mkdtemp(join(tmpdir(), "bfs-completion-home-"));
  await Promise.all(
    COMPLETION_SHELLS.map(async (shell) => {
      const child = Bun.spawn([process.execPath, CLI_ENTRY, "completion", shell], {
        cwd: home,
        // Telemetry is enabled and pointed at a local ingest so any event would be counted.
        env: {
          ...parentEnv,
          HOME: home,
          BTS_TELEMETRY: "1",
          BFS_TELEMETRY_INGEST_URL: telemetryIngest.url.href,
          BUN_RUNTIME_TRANSPILER_CACHE_PATH: "0",
        },
        stdout: "pipe",
        stderr: "pipe",
      });
      const [exitCode, stdout, stderr] = await Promise.all([
        child.exited,
        new Response(child.stdout).text(),
        new Response(child.stderr).text(),
      ]);
      expect(exitCode).toBe(0);
      expect(stderr).toBe("");
      scripts.set(shell, stdout);
    }),
  );
});

afterAll(async () => {
  telemetryIngest.stop(true);
  await rm(home, { recursive: true, force: true });
});

describe("completion command", () => {
  it("prints only the script, without telemetry or settings side effects", async () => {
    expect(telemetryRequests).toBe(0);
    expect(await readdir(home)).toEqual([]);
    for (const script of scripts.values()) {
      expect(script.startsWith("#")).toBe(true);
    }
  });

  it("registers every published binary name", async () => {
    const binNames = await Promise.all(
      [
        join(CLI_ROOT, "package.json"),
        join(CLI_ROOT, "../../packages/create-bfs/package.json"),
      ].map(async (path) => Object.keys(JSON.parse(await readFile(path, "utf8")).bin)),
    );
    expect([...COMPLETION_BINARIES].sort()).toEqual(binNames.flat().sort());
    for (const script of scripts.values()) {
      for (const bin of COMPLETION_BINARIES) expect(script).toContain(bin);
    }
  });

  it.each(COMPLETION_SHELLS)("%s lists every router command", (shell) => {
    const script = scripts.get(shell) ?? "";
    const commandTokens = tokensOf(lineFor(script, COMMAND_LIST_LINE[shell]));
    expect(commandTokens).toEqual(expect.arrayContaining(Object.keys(router)));
  });

  it.each(COMPLETION_SHELLS)("%s offers schema values for --database and --frontend", (shell) => {
    const script = scripts.get(shell) ?? "";
    for (const [category, flag] of [
      ["database", "database"],
      ["webFrontend", "frontend"],
    ] as const) {
      const line = lineFor(
        script,
        (candidate) =>
          candidate.includes(`create --${flag}'`) || candidate.includes(`= create' -l ${flag} `),
      );
      expect(tokensOf(line)).toEqual(expect.arrayContaining(getCategoryCliValues(category)));
    }
  });

  it.each(COMPLETION_SHELLS)("%s offers every positional enum in the router", (shell) => {
    expect(positionalEnums.map((positional) => positional.command)).toEqual(
      expect.arrayContaining(["completion", "telemetry", "recovery"]),
    );
    const lines = (scripts.get(shell) ?? "").split("\n").map(tokensOf);
    for (const { command, position, values } of positionalEnums) {
      const line = lines.find(
        (tokens) =>
          tokens.includes(command) &&
          tokens.includes(String(position)) &&
          values.every((value) => tokens.includes(value)),
      );
      expect(line, `${command} position ${position}`).toBeDefined();
    }
  });

  it("bash script passes a syntax check", () => {
    const result = Bun.spawnSync(["bash", "-n"], { stdin: Buffer.from(scripts.get("bash") ?? "") });
    expect(result.stderr.toString()).toBe("");
    expect(result.exitCode).toBe(0);
  });

  // CI runners ship bash but not zsh.
  it.skipIf(!Bun.which("zsh"))("zsh script passes a syntax check", () => {
    const result = Bun.spawnSync(["zsh", "-n"], { stdin: Buffer.from(scripts.get("zsh") ?? "") });
    expect(result.stderr.toString()).toBe("");
    expect(result.exitCode).toBe(0);
  });

  it.skipIf(!Bun.which("fish"))("fish script passes fish -n", () => {
    const result = Bun.spawnSync(["fish", "-n"], { stdin: Buffer.from(scripts.get("fish") ?? "") });
    expect(result.exitCode).toBe(0);
  });

  it.skipIf(!Bun.which("pwsh"))("powershell script passes the parser", () => {
    const parse =
      "$tokens = $null; $errors = $null; " +
      "[void][System.Management.Automation.Language.Parser]::ParseInput($env:BFS_COMPLETION_SCRIPT, [ref]$tokens, [ref]$errors); " +
      "$errors | ForEach-Object { [Console]::Error.WriteLine($_.Message) }; exit $errors.Count";
    const result = Bun.spawnSync(["pwsh", "-NoProfile", "-NonInteractive", "-Command", parse], {
      env: { ...process.env, BFS_COMPLETION_SCRIPT: scripts.get("powershell") ?? "" },
    });
    expect(result.stderr.toString()).toBe("");
    expect(result.exitCode).toBe(0);
  });

  it("bash completes flag values, positional values, and flags after a dash", () => {
    const probe = `${scripts.get("bash")}
complete_words() {
  COMP_WORDS=("$@"); COMP_CWORD=$(( $# - 1 )); COMPREPLY=()
  _better_fullstack_completion
  echo "\${COMPREPLY[*]}"
}
complete_words create-bfs --database ''
complete_words create-better-fullstack create my-app --dat
complete_words create-bfs create my-app --database =
complete_words create-bfs create my-app --database = post
complete_words create-bfs completion ''
complete_words create-bfs recovery --project-dir ./app ''
complete_words create-bfs recovery show ''
complete_words create-bfs recovery --json false ''
`;
    const result = Bun.spawnSync(["bash", "-c", probe]);
    const [
      databaseValues,
      flags,
      attachedValues,
      attachedPrefix,
      shells,
      recoveryActions,
      afterAction,
      afterSwitchValue,
    ] = result.stdout.toString().trim().split("\n");
    expect(databaseValues?.split(" ")).toEqual(getCategoryCliValues("database"));
    expect(flags?.split(" ")).toContain("--database");
    expect(flags?.split(" ").every((flag) => flag.startsWith("--dat"))).toBe(true);
    // Bash splits --database=post into "--database" "=" "post" through COMP_WORDBREAKS.
    expect(attachedValues?.split(" ")).toEqual(getCategoryCliValues("database"));
    expect(attachedPrefix?.split(" ")).toEqual(
      getCategoryCliValues("database").filter((value) => value.startsWith("post")),
    );
    expect(shells?.split(" ")).toEqual([...COMPLETION_SHELLS]);
    // The value of --project-dir is not a positional, so the action is still the first one.
    expect(recoveryActions?.split(" ")).toEqual(positionalValues("recovery"));
    // The transaction ID that follows the action has no fixed values, so flags are offered.
    expect(afterAction?.split(" ")).toContain("--project-dir");
    // An explicit boolean after a switch is consumed by the parser, not a positional.
    expect(afterSwitchValue?.split(" ")).toEqual(positionalValues("recovery"));
  });
});
