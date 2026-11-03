import { log, spinner } from "@clack/prompts";
import fs from "node:fs";
import os from "node:os";
import { stripVTControlCharacters } from "node:util";

import type { ProjectConfig } from "@/types";

import { displayConfig } from "@/config/display-config";
import { generateReproducibleCommand } from "@/lifecycle/generate-reproducible-command";
import { setPromptDriver } from "@/presentation/context";
import { exitCancelled } from "@/presentation/errors";
import { navigableConfirm } from "@/prompts/core/navigable";
import { mountTui, type TuiApp } from "@/tui/app";
import { TuiController } from "@/tui/controller";
import {
  OPENTUI_DISK_MB,
  OPENTUI_DOWNLOAD_MB,
  OPENTUI_VERSION,
  getOpenTuiRuntimeDir,
  installOpenTui,
  isOpenTuiInstalled,
  loadOpenTui,
} from "@/tui/runtime";
import { getCurrentTuiSupport } from "@/tui/support";

export type BetaTuiSession = {
  review(config: ProjectConfig): Promise<void>;
  close(): Promise<void>;
};

type Write = typeof process.stdout.write;

function fallback(reason: string): undefined {
  log.warn(`The beta TUI is not available: ${reason}.\nContinuing in the classic CLI.`);
  return undefined;
}

function errorMessage(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error);
  return message.split("\n").filter(Boolean).slice(-3).join(" ");
}

async function withoutFfiWarning<T>(run: () => Promise<T>): Promise<T> {
  const emitWarning = process.emitWarning;
  process.emitWarning = ((warning: string | Error, ...rest: unknown[]) => {
    const message = typeof warning === "string" ? warning : warning.message;
    if (message.includes("FFI is an experimental feature")) return;
    Reflect.apply(emitWarning, process, [warning, ...rest]);
  }) as typeof process.emitWarning;
  try {
    return await run();
  } finally {
    process.emitWarning = emitWarning;
  }
}

function displayPath(dir: string): string {
  const home = os.homedir();
  return dir.startsWith(home) ? `~${dir.slice(home.length)}` : dir;
}

async function ensureRuntime(): Promise<string | undefined> {
  const dir = getOpenTuiRuntimeDir();
  if (await isOpenTuiInstalled(dir)) return dir;

  const consent = await navigableConfirm({
    message: `The beta TUI downloads OpenTUI ${OPENTUI_VERSION} once (about ${OPENTUI_DOWNLOAD_MB} MB, ${OPENTUI_DISK_MB} MB on disk) into ${displayPath(dir)}. Download it now?`,
    initialValue: true,
  });
  if (consent !== true) {
    log.info("Continuing in the classic CLI.");
    return undefined;
  }

  const progress = spinner();
  const started = Date.now();
  progress.start(`Downloading OpenTUI ${OPENTUI_VERSION}`);
  try {
    await installOpenTui(dir);
    progress.stop(`Downloaded OpenTUI in ${((Date.now() - started) / 1000).toFixed(1)}s`);
    return dir;
  } catch (error) {
    progress.error("Could not download OpenTUI");
    return fallback(errorMessage(error));
  }
}

function captureOutput(controller: TuiController) {
  const writes = { stdout: process.stdout.write, stderr: process.stderr.write };
  const captured: { fd: number; chunk: string | Uint8Array }[] = [];

  const capture = (fd: number): Write =>
    ((chunk: string | Uint8Array, encoding?: unknown, callback?: unknown) => {
      captured.push({ fd, chunk });
      controller.addNotice(
        stripVTControlCharacters(typeof chunk === "string" ? chunk : Buffer.from(chunk).toString()),
      );
      const done = typeof encoding === "function" ? encoding : callback;
      if (typeof done === "function") done();
      return true;
    }) as Write;

  process.stdout.write = capture(1);
  process.stderr.write = capture(2);

  let restored = false;
  const restore = () => {
    if (restored) return;
    restored = true;
    process.stdout.write = writes.stdout;
    process.stderr.write = writes.stderr;
  };
  const replay = () => {
    restore();
    for (const { fd, chunk } of captured.splice(0)) {
      if (typeof chunk === "string") fs.writeSync(fd, chunk);
      else fs.writeSync(fd, chunk);
    }
  };
  process.once("exit", replay);
  return {
    restore,
    replay() {
      process.off("exit", replay);
      replay();
    },
  };
}

export async function startBetaTui(
  options: { projectName?: string } = {},
): Promise<BetaTuiSession | undefined> {
  const support = await withoutFfiWarning(async () => getCurrentTuiSupport());
  if (!support.supported) return fallback(support.reason);

  const dir = await ensureRuntime();
  if (!dir) return undefined;

  const controller = new TuiController(options.projectName);
  let app: TuiApp;
  try {
    app = await withoutFfiWarning(async () => mountTui(await loadOpenTui(dir), controller));
  } catch (error) {
    return fallback(`OpenTUI failed to start (${errorMessage(error)})`);
  }

  const output = captureOutput(controller);
  setPromptDriver(controller);

  let closed: Promise<void> | undefined;
  return {
    review: (config) =>
      controller.review({
        lines: stripVTControlCharacters(displayConfig(config)).split("\n"),
        command: generateReproducibleCommand(config),
      }),
    close() {
      closed ??= (async () => {
        setPromptDriver(undefined);
        output.restore();
        await app.close();
        output.replay();
        if (controller.cancelled) exitCancelled("Operation cancelled");
      })();
      return closed;
    },
  };
}
