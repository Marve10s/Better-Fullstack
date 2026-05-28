import { afterAll, beforeAll } from "bun:test";
import { mkdir, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";

// Isolate environment paths for tests to avoid writing to the user's real configuration/history directory.
// This is critical on Windows where env-paths checks LOCALAPPDATA/APPDATA.
const isolatedHome = join(tmpdir(), `bfs-test-home-${Math.random().toString(36).slice(2, 9)}`);

const envToOverride = {
  HOME: isolatedHome,
  XDG_CONFIG_HOME: join(isolatedHome, ".config"),
  XDG_DATA_HOME: join(isolatedHome, ".local", "share"),
  APPDATA: join(isolatedHome, "AppData", "Roaming"),
  LOCALAPPDATA: join(isolatedHome, "AppData", "Local"),
};

for (const [key, value] of Object.entries(envToOverride)) {
  const upperKey = key.toUpperCase();
  for (const envKey of Object.keys(process.env)) {
    if (envKey.toUpperCase() === upperKey) {
      delete process.env[envKey];
    }
  }
  process.env[key] = value;
}

const TEST_RUN_ID = process.env.BFS_TEST_RUN_ID ?? `${process.pid}`;
export const SMOKE_DIR = process.env.BFS_SMOKE_DIR ?? join(import.meta.dir, "..", ".smoke", TEST_RUN_ID);

export async function ensureSmokeDirectory() {
  await mkdir(SMOKE_DIR, { recursive: true });
}

export async function cleanupSmokeDirectory() {
  await rm(SMOKE_DIR, { recursive: true, force: true });
}

// Global setup - runs once before all tests
beforeAll(
  async () => {
  try {
    // Isolated per-run smoke directory keeps cleanup fast and avoids cross-run contention.
    await cleanupSmokeDirectory();
    await ensureSmokeDirectory();
  } catch (error) {
    console.error("Failed to setup smoke directory:", error);
    throw error;
  }
  },
  120000,
);

// Global teardown - runs once after all tests
afterAll(
  async () => {
  try {
    await cleanupSmokeDirectory();
  } catch {
    // Ignore cleanup errors on teardown
  }
  },
  120000,
);
