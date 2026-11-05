import { capabilityProducerFingerprint } from "@testing/lib/capability-producer-fingerprint";
import { resolveCliBinaryPath } from "@testing/lib/cli-binary";
import { formatCliScaffoldFailure, scaffoldWithCli } from "@testing/lib/cli-scaffold";
import { verifyCrystal } from "@testing/lib/verify";
import { createHash } from "node:crypto";
import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";

const repoRoot = resolve(import.meta.dir, "..");
const frameworkIndex = process.argv.indexOf("--framework");
const framework = frameworkIndex < 0 ? "kemal" : process.argv[frameworkIndex + 1];
if (!framework || !["kemal", "lucky", "athena", "marten"].includes(framework)) {
  throw new Error("--framework must be kemal, lucky, athena, or marten");
}
const optionValue = (name: string, fallback: string) => {
  const index = process.argv.indexOf(name);
  return index < 0 ? fallback : (process.argv[index + 1] ?? fallback);
};
const orm = optionValue("--orm", "none");
const auth = optionValue("--auth", "none");
const testing = optionValue("--testing", "spec");
const validation = optionValue("--validation", "none");
const cache = optionValue("--cache", "none");
const jobs = optionValue("--jobs", "none");
const outputIndex = process.argv.indexOf("--output");
const requestedOutput = outputIndex < 0 ? undefined : process.argv[outputIndex + 1];
if (outputIndex >= 0 && (!requestedOutput || requestedOutput.startsWith("--"))) {
  throw new Error("--output requires a directory");
}
const outputDir = resolve(
  requestedOutput ?? join(repoRoot, `testing/.smoke-output/crystal-runtime-proof-${framework}-${orm}-${auth}-${testing}-${validation}-${cache}-${jobs}`),
);
const git = (args: string[]) => {
  const result = Bun.spawnSync(["git", ...args], { cwd: repoRoot });
  if (result.exitCode !== 0) throw new Error(result.stderr.toString());
  return result.stdout.toString().trim();
};
const revision = git(["rev-parse", "HEAD"]);
const dirty = git(["status", "--porcelain", "--untracked-files=normal"]).length > 0;
const toolchain = Object.fromEntries(
  ["crystal", "shards"].map((command) => {
    const result = Bun.spawnSync([command, "--version"], { cwd: repoRoot });
    if (result.exitCode !== 0) throw new Error(result.stderr.toString());
    return [command, result.stdout.toString().trim()];
  }),
);
if (
  !toolchain.crystal?.startsWith("Crystal 1.22.1 ") ||
  !toolchain.shards?.startsWith("Shards 0.20.0 ")
) {
  throw new Error("The Crystal proof requires Crystal 1.22.1 and Shards 0.20.0");
}
await mkdir(outputDir, { recursive: true });
const workingDir = await mkdtemp(join(outputDir, "projects-"));
const cliPath = resolveCliBinaryPath({ repoRoot });
const flags = [
  "--ecosystem",
  "crystal",
  "--crystal-web-framework",
  framework,
  "--crystal-orm",
  orm,
  "--crystal-auth",
  auth,
  "--crystal-testing",
  testing,
  "--crystal-validation",
  validation,
  "--crystal-cache",
  cache,
  "--crystal-jobs",
  jobs,
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
const scaffold = await scaffoldWithCli({
  cliPath,
  cwd: workingDir,
  projectName: "crystal-http",
  flags,
  expectedFiles: [
    "shard.yml",
    "src/server.cr",
    "src/greeting.cr",
    "scripts/http_proof.cr",
    ...(testing === "none" ? [] : ["spec/greeting_spec.cr"]),
    "README.md",
    "AGENTS.md",
    "bts.jsonc",
  ],
});
await writeFile(join(outputDir, "scaffold.json"), JSON.stringify(scaffold, null, 2));
if (!scaffold.ok)
  throw new Error(formatCliScaffoldFailure(scaffold, { header: "Crystal recipe scaffold failed" }));
const result = await verifyCrystal("crystal-http", scaffold.projectDir);
const lockfile = await readFile(join(scaffold.projectDir, "shard.lock"), "utf8");
const cliSha256 = createHash("sha256")
  .update(await readFile(cliPath))
  .digest("hex");
const receipt = {
  schemaVersion: 1,
  recipe: ["crystal", framework, orm, auth, testing, validation, cache, jobs].filter((part) => !["none", "spec"].includes(part)).join("-"),
  maturity: "experimental",
  evidence: "unqualified-observation",
  revision,
  dirty,
  cliSha256,
  producerFingerprint: capabilityProducerFingerprint(repoRoot),
  toolchain,
  scaffoldCommand: scaffold.command,
  projectDir: scaffold.projectDir,
  generatedLockfile: lockfile,
  result,
};
await writeFile(join(outputDir, "result.json"), JSON.stringify(receipt, null, 2));
console.log(JSON.stringify(receipt, null, 2));
if (!result.overallSuccess) process.exitCode = 1;
