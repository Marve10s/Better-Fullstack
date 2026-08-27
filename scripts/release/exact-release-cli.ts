import { readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";

import { loadAndVerifyManifest, type CommandRunner, type ReleaseManifest } from "@scripts/release/release-state";

const defaultRunner: CommandRunner = async (command, cwd) => {
  const subprocess = Bun.spawn(command, {
    cwd,
    env: { ...process.env, BTS_TELEMETRY: "0", CI: "true", NO_COLOR: "1" },
    stderr: "pipe",
    stdout: "pipe",
  });
  const [stdout, stderr, exitCode] = await Promise.all([
    new Response(subprocess.stdout).text(),
    new Response(subprocess.stderr).text(),
    subprocess.exited,
  ]);
  return { exitCode, stderr, stdout };
};

async function requireSuccess(
  command: string[],
  cwd: string,
  runner: CommandRunner,
): Promise<void> {
  const result = await runner(command, cwd);
  if (result.exitCode !== 0) {
    throw new Error(`Command failed (${command.join(" ")}):\n${result.stderr || result.stdout}`);
  }
}

export async function installExactReleaseCli(options: {
  installRoot: string;
  manifestPath: string;
  runner?: CommandRunner;
}): Promise<{ cliPath: string; manifest: ReleaseManifest }> {
  const installRoot = resolve(options.installRoot);
  const manifestPath = resolve(options.manifestPath);
  const manifest = await loadAndVerifyManifest(manifestPath);
  await writeFile(
    join(installRoot, "package.json"),
    `${JSON.stringify({ name: "better-fullstack-exact-release-runner", private: true })}\n`,
  );
  const archives = manifest.packages.map((pkg) => resolve(dirname(manifestPath), pkg.filename));
  await requireSuccess(
    [
      "npm",
      "install",
      "--ignore-scripts",
      "--no-package-lock",
      "--no-audit",
      "--fund=false",
      ...archives,
    ],
    installRoot,
    options.runner ?? defaultRunner,
  );
  for (const pkg of manifest.packages) {
    const packageJsonPath = join(
      installRoot,
      "node_modules",
      ...pkg.name.split("/"),
      "package.json",
    );
    // oxlint-disable-next-line no-await-in-loop -- every packed identity is verified before execution
    const packageJson = JSON.parse(await readFile(packageJsonPath, "utf8")) as {
      name?: string;
      version?: string;
    };
    if (packageJson.name !== pkg.name || packageJson.version !== pkg.version) {
      throw new Error(`Installed package identity mismatch for ${pkg.name}@${pkg.version}`);
    }
  }
  return {
    cliPath: join(installRoot, "node_modules", "create-better-fullstack", "dist", "cli.mjs"),
    manifest,
  };
}
