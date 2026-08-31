import { confirm, intro, isCancel, log, outro } from "@clack/prompts";
import pc from "picocolors";

import { CLIError } from "@/presentation/errors";
import { renderTitle } from "@/presentation/render-title";

import type { InstallAgentInputId, InstallOnly, InstallReceipt } from "./install-core";

import { runInstall } from "./install-core";

export interface InstallCommandOptions {
  only?: InstallOnly;
  agent?: InstallAgentInputId[];
  dryRun?: boolean;
  json?: boolean;
  uninstall?: boolean;
  yes?: boolean;
}

function statusMark(target: InstallReceipt["targets"][number]) {
  if (target.status === "failed") return pc.red("✗");
  if (target.status === "unchanged") return pc.dim("-");
  if (target.status === "cancelled") return pc.yellow("-");
  if (target.status === "planned") return pc.cyan("◇");
  return pc.green("✓");
}

function printHumanReceipt(receipt: InstallReceipt) {
  renderTitle();
  intro(
    pc.magenta(
      receipt.action === "uninstall" ? "Better Fullstack uninstall" : "Better Fullstack install",
    ),
  );
  for (const target of receipt.targets) {
    const detail = target.message ? `: ${target.message}` : "";
    log.message(`${statusMark(target)} ${target.name}${detail}`);
  }
  outro(`Try: ${receipt.tryPrompt}`);
}

export async function installCommand(options: InstallCommandOptions): Promise<InstallReceipt> {
  const interactive = Boolean(process.stdin.isTTY) && !options.yes && !options.json;
  const receipt = await runInstall(
    {
      only: options.only,
      agents: options.agent,
      dryRun: options.dryRun,
      uninstall: options.uninstall,
    },
    {
      stdinIsTTY: interactive,
      confirm: interactive
        ? async (message) => {
            const answer = await confirm({ message, initialValue: true });
            return !isCancel(answer) && answer;
          }
        : undefined,
    },
  );

  if (options.json) process.stdout.write(`${JSON.stringify(receipt, null, 2)}\n`);
  else printHumanReceipt(receipt);

  if (!receipt.success) {
    throw new CLIError("Every requested Better Fullstack install target failed.");
  }
  return receipt;
}
