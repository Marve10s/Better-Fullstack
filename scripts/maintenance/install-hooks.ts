import { $ } from "bun";

function normalizePath(value: string): string {
  return value.replace(/\\/g, "/").replace(/\/+$/g, "").toLowerCase();
}

async function hasCommand(command: string): Promise<boolean> {
  try {
    await $`${command} --version`.quiet();
    return true;
  } catch {
    return false;
  }
}

async function runGit(args: string[]): Promise<string | null> {
  try {
    const output = await $`git ${args}`.quiet().text();
    return output.trim();
  } catch {
    return null;
  }
}

async function main(): Promise<void> {
  if (!(await hasCommand("git"))) {
    return;
  }

  const gitDir = await runGit(["rev-parse", "--git-dir"]);
  if (!gitDir) {
    return;
  }

  if (!(await hasCommand("lefthook"))) {
    return;
  }

  const hooksPath = (await runGit(["config", "--local", "--get", "core.hooksPath"])) ?? "";
  const defaultHooksPath = (await runGit(["rev-parse", "--git-path", "hooks"])) ?? "";
  const repoRoot = (await runGit(["rev-parse", "--show-toplevel"])) ?? process.cwd();

  if (["/dev/null", "nul"].includes(hooksPath.toLowerCase())) {
    console.log("Skipping lefthook install because core.hooksPath is disabled.");
    return;
  }

  if (hooksPath) {
    const normalizedHooksPath = normalizePath(hooksPath);
    const normalizedDefaultHooksPath = normalizePath(defaultHooksPath);
    const normalizedDotGitHooks = normalizePath(".git/hooks");
    const normalizedRepoHooksPath = normalizePath(`${repoRoot}/.git/hooks`);

    if (
      normalizedHooksPath === normalizedDefaultHooksPath ||
      normalizedHooksPath === normalizedDotGitHooks ||
      normalizedHooksPath === normalizedRepoHooksPath
    ) {
      await $`lefthook install --reset-hooks-path`;
      return;
    }

    console.log(
      `Skipping lefthook install because core.hooksPath is managed locally at '${hooksPath}'.`,
    );
    return;
  }

  await $`lefthook install`;
}

void main();
