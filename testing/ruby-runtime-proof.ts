import { capabilityProducerFingerprint } from "@testing/lib/capability-producer-fingerprint";
import { resolveCliBinaryPath } from "@testing/lib/cli-binary";
import { scaffoldWithCli, formatCliScaffoldFailure } from "@testing/lib/cli-scaffold";
import { verifyRuby } from "@testing/lib/verify";
import { createHash } from "node:crypto";
import { mkdtemp, mkdir, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const repoRoot = resolve(import.meta.dir, "..");
const outputArgument = process.argv.indexOf("--output");
const requestedOutput = outputArgument >= 0 ? process.argv[outputArgument + 1] : undefined;
if (outputArgument >= 0 && (!requestedOutput || requestedOutput.startsWith("--"))) {
  throw new Error("--output requires a directory");
}
const outputDir = resolve(
  requestedOutput ?? join(repoRoot, "testing/.smoke-output/ruby-runtime-proof"),
);
const git = (args: string[]) => {
  const result = Bun.spawnSync(["git", ...args], { cwd: repoRoot });
  if (result.exitCode !== 0) throw new Error(result.stderr.toString());
  return result.stdout.toString().trim();
};
const revision = git(["rev-parse", "HEAD"]);
const dirty = git(["status", "--porcelain", "--untracked-files=normal"]).length > 0;
const workingDir = await mkdtemp(join(tmpdir(), "bfs-ruby-proof-"));
const flags = [
  "--ecosystem",
  "ruby",
  "--ruby-web-framework",
  "sinatra",
  "--database",
  "none",
  "--addons",
  "none",
  "--examples",
  "none",
  "--ai-docs",
  "agents-md",
  "--no-install",
  "--no-git",
];
await mkdir(outputDir, { recursive: true });
const scaffold = await scaffoldWithCli({
  cliPath: resolveCliBinaryPath({ repoRoot }),
  cwd: workingDir,
  projectName: "ruby-http",
  flags,
  expectedFiles: [
    "Gemfile",
    "app.rb",
    "request_body_limit.rb",
    "config.ru",
    "Rakefile",
    "bin/server",
    "bin/proof",
    "test/app_test.rb",
    "README.md",
    "AGENTS.md",
    "bts.jsonc",
  ],
});
await writeFile(join(outputDir, "scaffold.json"), JSON.stringify(scaffold, null, 2));
if (!scaffold.ok)
  throw new Error(formatCliScaffoldFailure(scaffold, { header: "Ruby recipe scaffold failed" }));
const toolchain = Object.fromEntries(
  ["ruby", "bundle"].map((command) => {
    const result = Bun.spawnSync([command, "--version"], { cwd: scaffold.projectDir });
    if (result.exitCode !== 0) throw new Error(result.stderr.toString());
    return [command, result.stdout.toString().trim()];
  }),
);
const result = await verifyRuby("ruby-http", scaffold.projectDir);
const lockfile = await readFile(join(scaffold.projectDir, "Gemfile.lock"), "utf8").catch(
  () => null,
);
const cliSha256 = createHash("sha256")
  .update(await readFile(resolveCliBinaryPath({ repoRoot })))
  .digest("hex");
const producerFingerprint = capabilityProducerFingerprint(repoRoot);
const receipt = {
  schemaVersion: 1,
  recipe: "ruby-sinatra",
  maturity: "experimental",
  evidence: "unqualified-observation",
  revision,
  dirty,
  cliSha256,
  producerFingerprint,
  toolchain,
  scaffoldCommand: scaffold.command,
  projectDir: scaffold.projectDir,
  generatedLockfile: lockfile,
  result,
};
await writeFile(join(outputDir, "result.json"), JSON.stringify(receipt, null, 2));
console.log(JSON.stringify(receipt, null, 2));
if (!result.overallSuccess) process.exitCode = 1;
