import { createBuild } from "devframe/adapters/build";
import { createDevServer } from "devframe/adapters/dev";
import { readdir } from "node:fs/promises";
import path from "node:path";

import { createDevtoolsDefinition } from "@/devtools/definition";

export type DevtoolsServerOptions = {
  projectDir?: string;
  port?: number;
  host?: string;
  open?: boolean;
  /** Trust every browser on the port. Localhost-only, single-user opt out. */
  auth?: boolean;
  onReady?: (info: { origin: string; port: number }) => void;
};

export type DevtoolsServer = {
  origin: string;
  port: number;
  close: () => Promise<void>;
};

export async function startDevtoolsServer(
  options: DevtoolsServerOptions = {},
): Promise<DevtoolsServer> {
  const projectDir = path.resolve(options.projectDir ?? process.cwd());
  const server = await createDevServer(createDevtoolsDefinition({ projectDir }), {
    host: options.host,
    port: options.port,
    openBrowser: options.open ?? false,
    auth: options.auth ?? true,
    // The route trusts same-machine callers; see docs/guidelines for the
    // hardening story once the panel is reachable beyond loopback.
    mcp: "auto",
    onReady: options.onReady,
  });
  return { origin: server.origin, port: server.port, close: () => server.close() };
}

export type DevtoolsBuildOptions = {
  projectDir?: string;
  outDir: string;
};

/** Bake the panel plus the project's non-plan reads into a static directory. */
export async function buildDevtoolsReport(options: DevtoolsBuildOptions): Promise<string> {
  const projectDir = path.resolve(options.projectDir ?? process.cwd());
  const outDir = path.resolve(options.outDir);
  await assertReplaceableReportDir(outDir);
  await createBuild(createDevtoolsDefinition({ projectDir }), { outDir });
  return outDir;
}

/**
 * Devframe's createBuild deletes the output directory before writing, so
 * `--report .` would erase the project. Only a missing, empty, or previously
 * generated report directory may be replaced.
 */
async function assertReplaceableReportDir(outDir: string) {
  const entries: string[] = await readdir(outDir).catch((error: NodeJS.ErrnoException) => {
    if (error.code === "ENOENT") return [];
    throw error;
  });
  if (entries.length > 0 && !entries.includes("__connection.json")) {
    throw new Error(
      `Refusing to write the report to ${outDir}: the directory is not empty and is not a previous report. Choose an empty or new directory.`,
    );
  }
}

/** Resolve when the process receives SIGINT or SIGTERM. */
export function waitForShutdownSignal(): Promise<void> {
  return new Promise((resolve) => {
    const finish = () => {
      process.off("SIGINT", finish);
      process.off("SIGTERM", finish);
      resolve();
    };
    process.once("SIGINT", finish);
    process.once("SIGTERM", finish);
  });
}
