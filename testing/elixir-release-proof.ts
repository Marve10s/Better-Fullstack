import { rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, dirname, resolve } from "node:path";

const repoRoot = resolve(import.meta.dir, "..");
const environment = { ...process.env, MIX_ENV: "prod", ERL_FLAGS: "+S 2:2 +A 1" };

async function run(args: string[], cwd = repoRoot) {
  console.log(`Running ${args.join(" ")}`);
  const child = Bun.spawn(args, {
    cwd,
    env: environment,
    stdin: "ignore",
    stdout: "pipe",
    stderr: "inherit",
  });
  const stdout = await new Response(child.stdout).text();
  const exitCode = await child.exited;
  if (stdout) process.stdout.write(stdout);
  if (exitCode !== 0) throw new Error(`${args.join(" ")} exited with ${exitCode}`);
  return stdout;
}

const staged = await run([
  process.execPath,
  "run",
  "packages/template-generator/test/_fixtures/stage-elixir-release-proof.ts",
  "mix-release",
]);
const projectDir = staged.trim();
if (
  dirname(projectDir) !== resolve(tmpdir()) ||
  !basename(projectDir).startsWith("bfs-elixir-release-mix-release-")
) {
  throw new Error("Expected one generated release directory");
}

try {
  await run(["mix", "deps.get", "--only", "prod"], projectDir);
  await run(["mix", "release"], projectDir);
  await run([
    process.execPath,
    "run",
    "packages/template-generator/test/_fixtures/elixir-release-cluster-proof.ts",
    projectDir,
  ]);
} finally {
  await rm(projectDir, { recursive: true, force: true });
}
