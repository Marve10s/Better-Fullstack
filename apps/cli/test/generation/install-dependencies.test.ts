import { describe, expect, it } from "bun:test";
import os from "node:os";
import path from "node:path";

import type { ProjectConfig } from "@/types";

import { setupDatabase } from "@/helpers/core/db-setup";
import {
  getInstallArgs,
  getInstallEnvironment,
  getInstallRetryArgs,
  installDependencies,
} from "@/helpers/core/install-dependencies";

describe("getInstallEnvironment", () => {
  it("disables immutable Yarn CI defaults for fresh scaffolds", () => {
    expect(getInstallEnvironment("yarn")).toEqual({
      YARN_ENABLE_HARDENED_MODE: "0",
      YARN_ENABLE_IMMUTABLE_INSTALLS: "false",
    });
  });

  it("leaves non-Yarn installs unchanged", () => {
    expect(getInstallEnvironment("npm")).toBeUndefined();
    expect(getInstallEnvironment("pnpm")).toBeUndefined();
    expect(getInstallEnvironment("bun")).toBeUndefined();
  });
});

describe("getInstallArgs", () => {
  it("allows pnpm dependency builds for fresh scaffolds", () => {
    expect(getInstallArgs("pnpm")).toEqual(["install", "--dangerously-allow-all-builds"]);
  });

  it("uses the default install command for other package managers", () => {
    expect(getInstallArgs("npm")).toEqual(["install"]);
    expect(getInstallArgs("bun")).toEqual(["install"]);
    expect(getInstallArgs("yarn")).toEqual(["install"]);
  });
});

describe("getInstallRetryArgs", () => {
  it("refreshes Bun metadata after a registry propagation miss", () => {
    const error = {
      stderr:
        'error: No version matching "4.0.71" found for specifier "@ai-sdk/gateway" (but package exists)',
    };

    expect(getInstallRetryArgs("bun", error)).toEqual(["install", "--force"]);
    expect(getInstallRetryArgs("npm", error)).toBeNull();
  });

  it("does not retry unrelated Bun install failures", () => {
    expect(getInstallRetryArgs("bun", new Error("network unavailable"))).toBeNull();
  });
});

describe("installDependencies", () => {
  it("returns a failure result instead of swallowing the error when install fails", async () => {
    // A non-existent cwd makes the install command fail fast (ENOENT) without
    // running a real install. The function must report the failure to its
    // caller rather than silently logging it (the old behavior).
    const missingDir = path.join(os.tmpdir(), `bfs-nonexistent-${process.pid}-${Date.now()}`);

    const result = await installDependencies({
      projectDir: missingDir,
      packageManager: "bun",
    });

    expect(result.success).toBe(false);
    expect(result.step).toBe("Install dependencies");
    expect(result.errorMessage).toBeTruthy();
  });
});

describe("setupDatabase", () => {
  it("returns null when there is no external database to provision", async () => {
    const config = {
      backend: "convex",
      database: "none",
      dbSetup: "none",
      projectDir: os.tmpdir(),
    } as unknown as ProjectConfig;

    expect(await setupDatabase(config)).toBeNull();
  });
});
