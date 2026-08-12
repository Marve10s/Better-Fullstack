import { afterAll, describe, expect, it } from "bun:test";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { mkdtemp, rm } from "node:fs/promises";
import { homedir, tmpdir } from "node:os";
import { join, relative, resolve } from "node:path";

const REPO_ROOT = resolve(import.meta.dir, "../../..");
const CLI_ENTRY = resolve(import.meta.dir, "../src/cli.ts");
const NATIVE_BUN = resolve(homedir(), ".bun", "bin", "bun");
const BUN_EXECUTABLE =
  process.env.BFS_TEST_BUN_BIN || (existsSync(NATIVE_BUN) ? NATIVE_BUN : "bun");
const CONTENT_ROOT = join(REPO_ROOT, "apps/web/content");
const TEMP_ROOTS: string[] = [];
const NON_SCAFFOLD_COMMANDS = new Set([
  "add",
  "builder",
  "check",
  "docs",
  "doctor",
  "gen",
  "history",
  "mcp",
  "recommend",
  "remove",
  "registry",
  "sponsors",
  "status",
  "telemetry",
  "update",
]);
const LAUNCHERS = [
  ["npm", "create", "better-fullstack@latest"],
  ["bun", "create", "better-fullstack@latest"],
  ["pnpm", "create", "better-fullstack@latest"],
  ["yarn", "create", "better-fullstack@latest"],
  ["npx", "-y", "create-better-fullstack@latest"],
  ["npx", "create-better-fullstack@latest"],
] as const;

type DocumentedCommand = {
  source: string;
  command: string;
  payload: string[];
};

function walkContentFiles(root: string): string[] {
  return readdirSync(root)
    .flatMap((name) => {
      const path = join(root, name);
      return statSync(path).isDirectory() ? walkContentFiles(path) : [path];
    })
    .filter((path) => path.endsWith(".md") || path.endsWith(".mdx"));
}

function tokenize(command: string): string[] {
  const tokens: string[] = [];
  const tokenPattern = /"([^"]*)"|'([^']*)'|[^\s"']+/g;
  let match: RegExpExecArray | null;

  while ((match = tokenPattern.exec(command)) !== null) {
    tokens.push(match[1] ?? match[2] ?? match[0]);
  }

  return tokens;
}

function commandPayload(command: string): string[] | undefined {
  const tokens = tokenize(command);
  const launcher = LAUNCHERS.find((candidate) =>
    candidate.every((part, index) => tokens[index] === part),
  );
  if (!launcher) return undefined;

  return tokens.slice(launcher.length).filter((token) => token !== "--");
}

function extractDocumentedCommands(): DocumentedCommand[] {
  const files = [join(REPO_ROOT, "README.md"), ...walkContentFiles(CONTENT_ROOT)];
  const commandPattern =
    /(?:npm|bun|pnpm|yarn) create better-fullstack@latest\b[^\n"<`]*|npx(?: -y)? create-better-fullstack@latest\b[^\n"<`]*/g;
  const commands = files.flatMap((path) => {
    const source = readFileSync(path, "utf8").replace(/\\\r?\n\s*/g, " ");
    return [...source.matchAll(commandPattern)].flatMap((match) => {
      const command = match[0].trim().replace(/[.,;:]$/, "");
      const payload = commandPayload(command);
      if (!payload || payload.length === 0) return [];
      if (payload[0].startsWith("[") || NON_SCAFFOLD_COMMANDS.has(payload[0])) return [];
      if (!payload.some((token) => token.startsWith("--"))) return [];
      return [{ source: relative(REPO_ROOT, path), command, payload }];
    });
  });

  return [...new Map(commands.map((command) => [command.payload.join("\0"), command])).values()];
}

async function runDocumentedCommand({ payload }: DocumentedCommand) {
  const cwd = await mkdtemp(join(tmpdir(), "bfs-docs-command-"));
  TEMP_ROOTS.push(cwd);
  const enforcedFlags = ["--dry-run", "--no-install", "--no-git", "--disable-analytics"];
  const args = [
    CLI_ENTRY,
    "create",
    ...payload,
    ...enforcedFlags.filter((flag) => !payload.includes(flag)),
  ];
  const process = Bun.spawn([BUN_EXECUTABLE, ...args], {
    cwd,
    env: { ...Bun.env, BFS_SKIP_BUILDER_PROMPT: "1", CI: "true" },
    stdout: "pipe",
    stderr: "pipe",
  });
  const [exitCode, stdout, stderr] = await Promise.all([
    process.exited,
    new Response(process.stdout).text(),
    new Response(process.stderr).text(),
  ]);

  return { exitCode, output: `${stdout}${stderr}` };
}

async function mapWithConcurrency<T, R>(
  items: T[],
  concurrency: number,
  worker: (item: T) => Promise<R>,
): Promise<R[]> {
  const results = Array.from({ length: items.length }) as R[];
  let nextIndex = 0;

  async function consume(): Promise<void> {
    const index = nextIndex++;
    if (index >= items.length) return;
    results[index] = await worker(items[index]!);
    await consume();
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, consume));

  return results;
}

afterAll(async () => {
  await Promise.all(TEMP_ROOTS.map((path) => rm(path, { recursive: true, force: true })));
}, 30_000);

describe("documented scaffold commands", () => {
  it(
    "dry-runs every unique public scaffold command through the local CLI",
    async () => {
      const commands = extractDocumentedCommands();
      expect(commands.length).toBeGreaterThan(0);
      const results = await mapWithConcurrency(commands, 4, runDocumentedCommand);

      for (const [index, result] of results.entries()) {
        const documented = commands[index];
        expect(
          result.exitCode,
          `${documented.source} failed\nCommand: ${documented.command}\n\n${result.output}`,
        ).toBe(0);
        expect(result.output).toContain("Dry run complete");
      }
    },
    { timeout: 180_000 },
  );
});
