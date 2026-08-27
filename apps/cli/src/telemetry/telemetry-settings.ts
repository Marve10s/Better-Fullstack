import envPaths from "env-paths";
import fs from "fs-extra";
import { randomUUID } from "node:crypto";
import path from "node:path";

// Reuses the same config dir as project-history.ts so all CLI state lives together.
const paths = envPaths("better-fullstack", { suffix: "" });
const SETTINGS_FILE = "telemetry.json";

export type TelemetrySettings = {
  version: number;
  // Explicit persisted opt-in/opt-out. `undefined` means the user never chose.
  enabled?: boolean;
  // Whether the one-time first-run notice has already been displayed.
  noticeShown: boolean;
  // Random anonymous ID used to count unique installs. Carries no PII and is
  // never derived from the machine; deleting this file rotates it.
  machineId?: string;
};

function getSettingsPath(): string {
  return path.join(paths.data, SETTINGS_FILE);
}

function emptySettings(): TelemetrySettings {
  return { version: 1, noticeShown: false };
}

export async function readTelemetrySettings(): Promise<TelemetrySettings> {
  const settingsPath = getSettingsPath();

  if (!(await fs.pathExists(settingsPath))) {
    return emptySettings();
  }

  try {
    const data = (await fs.readJson(settingsPath)) as Partial<TelemetrySettings> | null;
    if (!data || typeof data !== "object") {
      return emptySettings();
    }
    return {
      version: typeof data.version === "number" ? data.version : 1,
      enabled: typeof data.enabled === "boolean" ? data.enabled : undefined,
      noticeShown: data.noticeShown === true,
      machineId: typeof data.machineId === "string" ? data.machineId : undefined,
    };
  } catch {
    return emptySettings();
  }
}

async function writeTelemetrySettings(settings: TelemetrySettings): Promise<void> {
  await fs.ensureDir(paths.data);
  await fs.writeJson(getSettingsPath(), settings, { spaces: 2 });
}

/**
 * The user's explicit persisted preference, or `undefined` when they never chose.
 */
export async function getPersistedTelemetryPreference(): Promise<boolean | undefined> {
  const settings = await readTelemetrySettings();
  return settings.enabled;
}

/**
 * Persist an explicit opt-in/opt-out. Choosing a preference also marks the
 * first-run notice as shown so it never appears afterwards.
 */
export async function setTelemetryPreference(enabled: boolean): Promise<void> {
  const settings = await readTelemetrySettings();
  settings.enabled = enabled;
  settings.noticeShown = true;
  await writeTelemetrySettings(settings);
}

export async function hasTelemetryNoticeBeenShown(): Promise<boolean> {
  const settings = await readTelemetrySettings();
  return settings.noticeShown;
}

export async function markTelemetryNoticeShown(): Promise<void> {
  const settings = await readTelemetrySettings();
  settings.noticeShown = true;
  await writeTelemetrySettings(settings);
}

/**
 * The persisted anonymous machine ID, created on first use. Returns
 * `undefined` if it cannot be persisted (telemetry then simply omits it).
 */
export async function getOrCreateMachineId(): Promise<string | undefined> {
  try {
    const settings = await readTelemetrySettings();
    if (settings.machineId) return settings.machineId;
    settings.machineId = randomUUID();
    await writeTelemetrySettings(settings);
    return settings.machineId;
  } catch {
    return undefined;
  }
}
