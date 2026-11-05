import { capabilityProducerFingerprint } from "@testing/lib/capability-producer-fingerprint";
import { resolveCliBinaryPath } from "@testing/lib/cli-binary";
import { scaffoldWithCli, formatCliScaffoldFailure } from "@testing/lib/cli-scaffold";
import { verifyPhp } from "@testing/lib/verify";
import { createHash } from "node:crypto";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const repoRoot = resolve(import.meta.dir, "..");
const outputIndex = process.argv.indexOf("--output");
const requestedOutput = outputIndex < 0 ? undefined : process.argv[outputIndex + 1];
if (outputIndex >= 0 && !requestedOutput) throw new Error("Missing --output directory");
const outputDir = resolve(requestedOutput ?? join(repoRoot, "testing/.smoke-output/php-runtime-proof"));
const git = (args: string[]) => {
  const result = Bun.spawnSync(["git", ...args], { cwd: repoRoot });
  if (result.exitCode !== 0) throw new Error(result.stderr.toString());
  return result.stdout.toString().trim();
};
const revision = git(["rev-parse", "HEAD"]);
const dirty = git(["status", "--porcelain", "--untracked-files=normal"]).length > 0;
const workingDir = await mkdtemp(join(tmpdir(), "bfs-php-proof-"));
const cliPath = resolveCliBinaryPath({ repoRoot });
const flags = [
  "--ecosystem",
  "php",
  "--php-web-framework",
  "slim",
  "--database",
  "none",
  "--addons",
  "none",
  "--examples",
  "none",
  "--ai-docs",
  "agents-md",
  "--package-manager",
  "bun",
  "--no-install",
  "--no-git",
  "--disable-analytics",
];
await mkdir(outputDir, { recursive: true });
const scaffold = await scaffoldWithCli({
  cliPath,
  cwd: workingDir,
  projectName: "php-http",
  flags,
  expectedFiles: [
    "composer.json",
    "src/Application.php",
    "bin/proof-http.php",
    "PHP.md",
    "README.md",
    "bts.jsonc",
  ],
});
await writeFile(join(outputDir, "scaffold.json"), JSON.stringify(scaffold, null, 2));
if (!scaffold.ok)
  throw new Error(formatCliScaffoldFailure(scaffold, { header: "PHP recipe scaffold failed" }));
const toolchain = Object.fromEntries(
  ["php", "composer"].map((command) => {
    const result = Bun.spawnSync([command, "--version"], { cwd: scaffold.projectDir });
    if (result.exitCode !== 0) throw new Error(result.stderr.toString());
    return [command, result.stdout.toString().trim()];
  }),
);
const result = await verifyPhp("php-http", scaffold.projectDir);
const lockfile = await readFile(join(scaffold.projectDir, "composer.lock"), "utf8").catch(
  () => null,
);
const cliSha256 = createHash("sha256")
  .update(await readFile(cliPath))
  .digest("hex");
const receipt = {
  schemaVersion: 1,
  recipe: "php-slim",
  maturity: "experimental",
  evidence: "unqualified-observation",
  revision,
  dirty,
  cliSha256,
  producerFingerprint: capabilityProducerFingerprint(repoRoot),
  toolchain,
  scaffoldCommand: scaffold.command,
  projectDir: scaffold.projectDir,
  lockfile,
  result,
};
await writeFile(join(outputDir, "result.json"), JSON.stringify(receipt, null, 2));
console.log(
  JSON.stringify({
    success: result.overallSuccess,
    outputDir,
    revision,
    dirty,
    steps: result.steps.map((step) => ({ step: step.step, success: step.success })),
  }),
);
if (result.overallSuccess) await rm(workingDir, { recursive: true, force: true });
else process.exitCode = 1;
