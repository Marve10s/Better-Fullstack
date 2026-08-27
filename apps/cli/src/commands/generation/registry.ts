import { intro, log, outro } from "@clack/prompts";
import path from "node:path";
import pc from "picocolors";

import type { RegistryAddResult } from "@/helpers/core/registry-handler";

import { addPack, listInstalledPacks } from "@/helpers/core/registry-handler";
import { CLIError } from "@/presentation/errors";
import { renderTitle } from "@/presentation/render-title";

export type RegistryAction = "add" | "list";

export type RegistryCommandInput = {
  action: RegistryAction;
  source?: string;
  projectDir?: string;
  json?: boolean;
  dryRun?: boolean;
  apply?: boolean;
  reviewToken?: string;
};

function formatCount(count: number, noun: string): string {
  return `${count} ${noun}${count === 1 ? "" : "s"}`;
}

function reportAddResult(result: RegistryAddResult): void {
  const label = result.mode === "plan" ? "Would install" : "Installed";
  log.info(pc.cyan(`${label} ${result.pack.name}@${result.pack.version}`));

  const fileLabel = result.mode === "plan" ? "would write" : "wrote";
  log.message(
    pc.dim(
      `Files: ${fileLabel} ${formatCount(result.filesWritten.length, "file")}` +
        (result.filesSkipped.length > 0
          ? `, skipped ${formatCount(result.filesSkipped.length, "existing file")}`
          : ""),
    ),
  );
  for (const file of result.filesWritten) log.message(pc.dim(`  + ${file}`));
  for (const file of result.filesSkipped)
    log.message(pc.dim(`  = ${file} (exists, not overwritten)`));

  if (result.dependencies.length > 0) {
    log.message(pc.dim(`Dependencies: ${formatCount(result.dependencies.length, "change")}`));
    for (const dep of result.dependencies) {
      log.message(pc.dim(`  + ${dep.dir}: ${dep.name}@${dep.version}${dep.dev ? " (dev)" : ""}`));
    }
  }

  if (result.envKeys.length > 0 && result.envFile) {
    log.message(pc.dim(`Env: ${formatCount(result.envKeys.length, "var")} -> ${result.envFile}`));
    for (const key of result.envKeys) log.message(pc.dim(`  + ${key}`));
  }
  if (result.mode === "plan" && result.reviewToken) {
    log.info(`Review token: ${pc.cyan(result.reviewToken)}`);
  }
  if (result.mode === "applied" && result.lifecycle.recovery.command) {
    log.info(pc.dim(`Recovery: ${result.lifecycle.recovery.command}`));
  }
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function reportJsonError(error: unknown): never {
  console.log(JSON.stringify({ ok: false, error: errorMessage(error) }, null, 2));
  // trpc-cli exits 0 after a successful handler return, so JSON failures must
  // terminate synchronously instead of relying on process.exitCode.
  process.exit(1);
}

export async function registryHandler(input: RegistryCommandInput): Promise<void> {
  const projectDir = path.resolve(input.projectDir || process.cwd());

  if (input.action === "list") {
    const packs = await listInstalledPacks(projectDir);
    if (input.json) {
      console.log(JSON.stringify(packs, null, 2));
      return;
    }

    renderTitle();
    intro(pc.magenta("Installed capability packs"));
    if (packs.length === 0) {
      log.info(pc.dim("No capability packs installed. Add one with `registry add <source>`."));
      outro(pc.magenta("Nothing installed."));
      return;
    }
    for (const pack of packs) {
      log.message(
        `${pc.bold(pack.name)}@${pack.version} ${pc.dim(
          `(${formatCount(pack.files.length, "file")}, from ${pack.source})`,
        )}`,
      );
    }
    outro(pc.magenta(`${formatCount(packs.length, "pack")} installed.`));
    return;
  }

  // action === "add"
  if (!input.source) {
    const error = new CLIError(
      "registry add requires a <source> (a local path or file:// URL to a capability pack).",
    );
    if (input.json) {
      reportJsonError(error);
    }
    throw error;
  }

  if (input.dryRun && input.apply) {
    const error = new CLIError("--dry-run and --apply cannot be used together.");
    if (input.json) reportJsonError(error);
    throw error;
  }
  if (input.apply && !input.reviewToken) {
    const error = new CLIError("--review-token is required with --apply.");
    if (input.json) reportJsonError(error);
    throw error;
  }
  let result: RegistryAddResult;
  try {
    result = await addPack({
      projectDir,
      source: input.source,
      dryRun: input.dryRun,
      reviewToken: input.apply ? input.reviewToken : undefined,
    });
  } catch (error) {
    if (input.json) {
      reportJsonError(error);
    }
    throw error;
  }

  if (!result.success) {
    const error = new CLIError(result.error ?? "Capability pack apply failed.");
    if (input.json) reportJsonError(error);
    throw error;
  }

  if (input.json) {
    console.log(JSON.stringify(result, null, 2));
    return;
  }

  renderTitle();
  intro(
    pc.magenta(
      result.mode === "plan" ? "Preview capability pack install" : "Install capability pack",
    ),
  );
  reportAddResult(result);
  outro(
    pc.magenta(
      result.mode === "plan"
        ? "Plan complete. No files were written."
        : "Capability pack installed.",
    ),
  );
}
