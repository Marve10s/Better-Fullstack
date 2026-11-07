import type * as OpenTui from "@opentui/core";

import envPaths from "env-paths";
import { execa } from "execa";
import fs from "fs-extra";
import path from "node:path";
import { pathToFileURL } from "node:url";

export type OpenTuiModule = typeof OpenTui;

export const OPENTUI_VERSION = "0.8.1";
export const OPENTUI_DOWNLOAD_MB = 7;
export const OPENTUI_DISK_MB = 26;

const ENTRY_FILE = "entry.mjs";

export function getOpenTuiRuntimeDir(
  cacheRoot = envPaths("better-fullstack", { suffix: "" }).cache,
) {
  return path.join(
    cacheRoot,
    "tui",
    `opentui-${OPENTUI_VERSION}-${process.platform}-${process.arch}`,
  );
}

async function readInstalledVersion(dir: string): Promise<string | undefined> {
  try {
    const manifest: unknown = await fs.readJson(
      path.join(dir, "node_modules", "@opentui", "core", "package.json"),
    );
    if (typeof manifest !== "object" || manifest === null || !("version" in manifest)) return;
    return typeof manifest.version === "string" ? manifest.version : undefined;
  } catch {
    return undefined;
  }
}

export async function isOpenTuiInstalled(dir = getOpenTuiRuntimeDir()): Promise<boolean> {
  return (
    (await fs.pathExists(path.join(dir, ENTRY_FILE))) &&
    (await readInstalledVersion(dir)) === OPENTUI_VERSION
  );
}

function installerCommand(): { file: string; args: string[] } {
  if (process.versions.bun) {
    return {
      file: process.execPath,
      args: ["install", "--omit", "peer", "--ignore-scripts", "--no-progress", "--no-summary"],
    };
  }
  const npmArgs = [
    "install",
    "--omit=peer",
    "--omit=dev",
    "--ignore-scripts",
    "--no-audit",
    "--no-fund",
    "--no-package-lock",
    "--loglevel=error",
  ];
  const npmCli = process.env.npm_execpath;
  if (npmCli && /npm-cli\.(c?js)$/.test(npmCli)) {
    return { file: process.execPath, args: [npmCli, ...npmArgs] };
  }
  return { file: process.platform === "win32" ? "npm.cmd" : "npm", args: npmArgs };
}

export async function installOpenTui(dir = getOpenTuiRuntimeDir()): Promise<void> {
  const staging = `${dir}.staging-${process.pid}-${Date.now()}`;
  await fs.ensureDir(staging);
  try {
    await fs.writeJson(path.join(staging, "package.json"), {
      name: "better-fullstack-tui-runtime",
      private: true,
      type: "module",
      dependencies: { "@opentui/core": OPENTUI_VERSION },
    });
    const { file, args } = installerCommand();
    await execa(file, args, { cwd: staging, stdin: "ignore", timeout: 180_000 });
    const installed = await readInstalledVersion(staging);
    if (installed !== OPENTUI_VERSION) {
      throw new Error(`expected @opentui/core ${OPENTUI_VERSION}, found ${installed ?? "nothing"}`);
    }
    await fs.writeFile(path.join(staging, ENTRY_FILE), 'export * from "@opentui/core";\n');
    if (await isOpenTuiInstalled(dir)) return;
    try {
      await fs.move(staging, dir, { overwrite: false });
      return;
    } catch {
      if (await isOpenTuiInstalled(dir)) return;
      await fs.remove(dir);
      await fs.move(staging, dir, { overwrite: false });
    }
  } finally {
    await fs.remove(staging);
  }
}

export async function loadOpenTui(dir = getOpenTuiRuntimeDir()): Promise<OpenTuiModule> {
  const module: OpenTuiModule = await import(pathToFileURL(path.join(dir, ENTRY_FILE)).href);
  return module;
}
