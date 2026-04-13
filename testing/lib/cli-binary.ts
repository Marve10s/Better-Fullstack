import { existsSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";

const CLI_PACKAGE_NAME = "create-better-fullstack";

type PackageJsonBin = string | Record<string, string> | undefined;

interface CliBinaryResolutionOptions {
  repoRoot?: string;
  packageJson?: { bin?: PackageJsonBin };
}

function getCliBinaryRelativePath(bin: PackageJsonBin): string {
  if (typeof bin === "string" && bin.length > 0) {
    return bin;
  }

  if (bin && typeof bin === "object" && typeof bin[CLI_PACKAGE_NAME] === "string" && bin[CLI_PACKAGE_NAME].length > 0) {
    return bin[CLI_PACKAGE_NAME];
  }

  return "dist/cli.mjs";
}

export function resolveCliBinaryPath(options: CliBinaryResolutionOptions = {}): string {
  const repoRoot = options.repoRoot ?? resolve(import.meta.dir, "../..");
  const packageJson =
    options.packageJson ??
    JSON.parse(readFileSync(join(repoRoot, "apps/cli/package.json"), "utf8")) as { bin?: PackageJsonBin };

  return join(repoRoot, "apps/cli", getCliBinaryRelativePath(packageJson.bin));
}

async function runBuildCommand(repoRoot: string, args: string[]): Promise<void> {
  const proc = Bun.spawn([process.execPath, "run", ...args], {
    cwd: repoRoot,
    stdout: "pipe",
    stderr: "pipe",
    env: {
      ...process.env,
      NO_COLOR: "1",
    },
  });

  const [stdout, stderr] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
  ]);
  const exitCode = await proc.exited;

  if (exitCode !== 0) {
    const output = [stdout.trim(), stderr.trim()].filter(Boolean).join("\n");
    throw new Error(`Build command failed: ${process.execPath} run ${args.join(" ")}\n${output}`.trim());
  }
}

export async function ensureBuiltCliBinary(repoRoot = resolve(import.meta.dir, "../..")): Promise<string> {
  const cliBinaryPath = resolveCliBinaryPath({ repoRoot });
  if (existsSync(cliBinaryPath)) {
    return cliBinaryPath;
  }

  await runBuildCommand(repoRoot, ["--cwd", "packages/types", "build"]);
  await runBuildCommand(repoRoot, ["--cwd", "packages/template-generator", "build"]);
  await runBuildCommand(repoRoot, ["--cwd", "apps/cli", "build"]);

  if (!existsSync(cliBinaryPath)) {
    throw new Error(`CLI binary was not produced at ${cliBinaryPath}`);
  }

  return cliBinaryPath;
}
