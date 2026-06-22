import envPaths from "env-paths";
import fs from "fs-extra";
import path from "node:path";

import type { BetterTStackConfig, ProjectConfig } from "../types";

import { buildBtsConfigForPersistence } from "./bts-config";
import { getLatestCLIVersion } from "./get-latest-cli-version";

const paths = envPaths("better-fullstack", { suffix: "" });
const HISTORY_FILE = "history.json";

export type ProjectHistoryEntry = {
  id: string;
  projectName: string;
  projectDir: string;
  createdAt: string;
  stack: {
    frontend: string[];
    backend: string;
    database: string;
    orm: string;
    runtime: string;
    auth: string;
    payments: string;
    api: string;
    addons: string[];
    examples: string[];
    dbSetup: string;
    packageManager: string;
  };
  cliVersion: string;
  reproducibleCommand: string;
  /**
   * Full project configuration snapshot (same shape as bts.jsonc). Used to
   * replay the exact stack via `create --from-history <n>`. Optional so older
   * history entries written before this field existed still load.
   */
  config?: BetterTStackConfig;
};

type HistoryData = {
  version: number;
  entries: ProjectHistoryEntry[];
};

function getHistoryPath(): string {
  return path.join(paths.data, HISTORY_FILE);
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function emptyHistory(): HistoryData {
  return { version: 1, entries: [] };
}

async function readHistory(): Promise<HistoryData> {
  const historyPath = getHistoryPath();

  if (!(await fs.pathExists(historyPath))) {
    return emptyHistory();
  }

  try {
    const data = (await fs.readJson(historyPath)) as HistoryData;
    if (!data || !Array.isArray(data.entries)) {
      return emptyHistory();
    }
    return data;
  } catch {
    return emptyHistory();
  }
}

async function writeHistory(history: HistoryData): Promise<void> {
  await fs.ensureDir(paths.data);
  await fs.writeJson(getHistoryPath(), history, { spaces: 2 });
}

export async function addToHistory(
  config: ProjectConfig,
  reproducibleCommand: string,
): Promise<void> {
  const history = await readHistory();

  let configSnapshot: BetterTStackConfig | undefined;
  try {
    configSnapshot = buildBtsConfigForPersistence(config);
  } catch {
    configSnapshot = undefined;
  }

  const entry: ProjectHistoryEntry = {
    id: generateId(),
    projectName: config.projectName,
    projectDir: config.projectDir,
    createdAt: new Date().toISOString(),
    stack: {
      frontend: config.frontend,
      backend: config.backend,
      database: config.database,
      orm: config.orm,
      runtime: config.runtime,
      auth: config.auth,
      payments: config.payments,
      api: config.api,
      addons: config.addons,
      examples: config.examples,
      dbSetup: config.dbSetup,
      packageManager: config.packageManager,
    },
    cliVersion: getLatestCLIVersion(),
    reproducibleCommand,
    ...(configSnapshot ? { config: configSnapshot } : {}),
  };

  history.entries.unshift(entry);
  if (history.entries.length > 100) {
    history.entries = history.entries.slice(0, 100);
  }

  await writeHistory(history);
}

export async function getHistory(limit = 10): Promise<ProjectHistoryEntry[]> {
  const history = await readHistory();
  return history.entries.slice(0, limit);
}

/**
 * Returns the entry at a 1-based position (1 = most recent), or null when the
 * position is out of range.
 */
export async function getHistoryEntry(position: number): Promise<ProjectHistoryEntry | null> {
  if (!Number.isInteger(position) || position < 1) {
    return null;
  }
  const history = await readHistory();
  return history.entries[position - 1] ?? null;
}

export async function getHistoryCount(): Promise<number> {
  const history = await readHistory();
  return history.entries.length;
}

export async function clearHistory(): Promise<void> {
  const historyPath = getHistoryPath();
  if (await fs.pathExists(historyPath)) {
    await fs.remove(historyPath);
  }
}
