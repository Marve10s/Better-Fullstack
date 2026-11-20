import { describe, expect, it } from "bun:test";
import { execa } from "execa";
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
import { childStderr, runWithContextAsync, setOutputCaptured } from "@/presentation/context";

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
  it.each([0, 1])("captures and retains child stderr when the child exits %i", async (exitCode) => {
    const notice = "setup command stderr";
    const writes: string[] = [];
    const originalWrite = process.stderr.write;
    process.stderr.write = ((chunk, encoding, callback) => {
      writes.push(typeof chunk === "string" ? chunk : Buffer.from(chunk).toString());
      const done = typeof encoding === "function" ? encoding : callback;
      if (typeof done === "function") done();
      return true;
    }) as typeof process.stderr.write;

    try {
      const result = await runWithContextAsync({}, () => {
        setOutputCaptured(true);
        const script = `console.error(${JSON.stringify(notice)}); process.exit(${exitCode})`;
        return execa(process.execPath, ["-e", script], { stderr: childStderr(), reject: false });
      });
      expect(result.exitCode).toBe(exitCode);
      expect(result.stderr).toBe(notice);
      expect(writes.join("")).toBe(`${notice}\n`);
    } finally {
      process.stderr.write = originalWrite;
    }
  });

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
