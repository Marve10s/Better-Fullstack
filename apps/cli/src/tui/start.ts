import { log, spinner } from "@clack/prompts";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { stripVTControlCharacters } from "node:util";

import type { ProjectConfig } from "@/types";

import { displayConfig } from "@/config/display-config";
import { generateReproducibleCommand } from "@/lifecycle/generate-reproducible-command";
import { setOutputCaptured, setPromptDriver } from "@/presentation/context";
import { exitCancelled } from "@/presentation/errors";
import { navigableConfirm } from "@/prompts/core/navigable";
import { mountTui, type TuiApp } from "@/tui/app";
import { TuiController } from "@/tui/controller";
import { extractNextSteps } from "@/tui/progress";
import {
  OPENTUI_DISK_MB,
  OPENTUI_DOWNLOAD_MB,
  OPENTUI_VERSION,
  getOpenTuiRuntimeDir,
  installOpenTui,
  isOpenTuiInstalled,
  loadOpenTui,
} from "@/tui/runtime";
import { constellationNodes } from "@/tui/summary";
import { getCurrentTuiSupport } from "@/tui/support";

export type BetaTuiLanding = {
  config: ProjectConfig;
  elapsedMs: number;
  reproducibleCommand: string;
  setupFailures: string[];
};

export type BetaTuiSession = {
  review(config: ProjectConfig): Promise<void>;
  hostsScaffold(config: ProjectConfig, options: { manualDb?: boolean; dryRun?: boolean }): boolean;
  launch(config: ProjectConfig): void;
  land(landing: BetaTuiLanding): Promise<void>;
  close(): Promise<void>;
};

const MIN_WARP_MS = 2400;
const INTERACTIVE_ADDONS = new Set(["mcp", "skills", "fumadocs", "opentui", "wxt", "ruler", "ultracite"]);

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
  let text = "";

  const capture = (fd: number): Write =>
    ((chunk: string | Uint8Array, encoding?: unknown, callback?: unknown) => {
      captured.push({ fd, chunk });
      const plain = stripVTControlCharacters(
        typeof chunk === "string" ? chunk : Buffer.from(chunk).toString(),
      );
      text = `${text}${plain}`.slice(-200_000);
      controller.addNotice(plain);
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
    text: () => text,
    restore,
    replay() {
      process.off("exit", replay);
      replay();
    },
  };
}

function topLevelEntries(dir: string): string[] {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const nested = entries
      .filter(
        (entry) => entry.isDirectory() && (entry.name === "apps" || entry.name === "packages"),
      )
      .flatMap((entry) =>
        fs
          .readdirSync(path.join(dir, entry.name), { withFileTypes: true })
          .filter((child) => child.isDirectory())
          .map((child) => `${entry.name}/${child.name}`),
      );
    if (nested.length > 0) return nested.slice(0, 8);
    return entries
      .filter((entry) => !entry.name.startsWith(".") && entry.name !== "node_modules")
      .map((entry) => (entry.isDirectory() ? `${entry.name}/` : entry.name))
      .slice(0, 8);
  } catch {
    return [];
  }
}

function motionAllowed(motion: boolean | undefined): boolean {
  if (motion === false) return false;
  const env = process.env.BFS_NO_MOTION?.trim().toLowerCase();
  return !env || env === "0" || env === "false";
}

export async function startBetaTui(
  options: { projectName?: string; motion?: boolean } = {},
): Promise<BetaTuiSession | undefined> {
  const support = await withoutFfiWarning(async () => getCurrentTuiSupport());
  if (!support.supported) return fallback(support.reason);

  const dir = await ensureRuntime();
  if (!dir) return undefined;

  const controller = new TuiController(options.projectName);
  let app: TuiApp;
  const motion = motionAllowed(options.motion);
  try {
    app = await withoutFfiWarning(async () =>
      mountTui(await loadOpenTui(dir), controller, { motion }),
    );
  } catch (error) {
    return fallback(`OpenTUI failed to start (${errorMessage(error)})`);
  }

  const output = captureOutput(controller);
  setPromptDriver(controller);
  setOutputCaptured(true);

  let closed: Promise<void> | undefined;
  let hosting = false;
  let launchedAt = 0;
  const session: BetaTuiSession = {
    review: (config) =>
      controller.review({
        lines: stripVTControlCharacters(displayConfig(config))
          .split("\n")
          .filter((line) => {
            const value = line.slice(line.indexOf(":") + 1).trim();
            return value !== "" && value !== "none";
          }),
        command: generateReproducibleCommand(config),
      }),
    hostsScaffold: (config, flags) =>
      !flags.dryRun &&
      (flags.manualDb || config.dbSetup === "none") &&
      !config.addons.some((addon) => INTERACTIVE_ADDONS.has(addon)),
    launch(config) {
      hosting = true;
      launchedAt = Date.now();
      controller.launch(`scaffolding ${config.projectName}`);
    },
    async land({ config, elapsedMs, reproducibleCommand, setupFailures }) {
      if (!hosting || closed) return;
      const warpLeft = launchedAt + MIN_WARP_MS - Date.now();
      if (motion && warpLeft > 0) await new Promise((done) => setTimeout(done, warpLeft));
      if (closed) return;
      const stack = [
        config.ecosystem,
        ...constellationNodes(controller.decisions).map((node) => node.label),
      ];
      return controller.land({
        projectName: config.projectName,
        stack: [...new Set(stack)].slice(0, 12),
        nextSteps: extractNextSteps(output.text()),
        command: reproducibleCommand,
        tree: topLevelEntries(config.projectDir),
        elapsedMs,
        failures: setupFailures,
      });
    },
    close() {
      closed ??= (async () => {
        setPromptDriver(undefined);
        setOutputCaptured(false);
        output.restore();
        await app.close();
        output.replay();
        if (controller.cancelled) exitCancelled("Operation cancelled");
      })();
      return closed;
    },
  };
  controller.onAbort = () => void session.close();
  return session;
}
