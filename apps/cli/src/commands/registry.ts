import { intro, log, outro } from "@clack/prompts";
import path from "node:path";
import pc from "picocolors";

import type { RegistryAddResult } from "../helpers/core/registry-handler";

import { addPack, listInstalledPacks } from "../helpers/core/registry-handler";
import { CLIError } from "../utils/errors";
import { renderTitle } from "../utils/render-title";

export type RegistryAction = "add" | "list";

export type RegistryCommandInput = {
  action: RegistryAction;
  source?: string;
  projectDir?: string;
  json?: boolean;
  dryRun?: boolean;
};

function formatCount(count: number, noun: string): string {
  return `${count} ${noun}${count === 1 ? "" : "s"}`;
}

function reportAddResult(result: RegistryAddResult): void {
  const label = result.dryRun ? "[dry run] Would install" : "Installed";
  log.info(pc.cyan(`${label} ${result.pack.name}@${result.pack.version}`));

  const fileLabel = result.dryRun ? "would write" : "wrote";
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
    throw new CLIError(
      "registry add requires a <source> (a local path or file:// URL to a capability pack).",
    );
  }

  const dryRun = input.dryRun ?? false;
  const result = await addPack({ projectDir, source: input.source, dryRun });

  if (input.json) {
    console.log(JSON.stringify(result, null, 2));
    return;
  }

  renderTitle();
  intro(pc.magenta(dryRun ? "Preview capability pack install" : "Install capability pack"));
  reportAddResult(result);
  outro(
    pc.magenta(dryRun ? "Dry run complete. No files were written." : "Capability pack installed."),
  );
}
