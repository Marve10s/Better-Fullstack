import { describe, expect, it } from "bun:test";

import { resolveCliBinaryPath } from "./cli-binary";

describe("resolveCliBinaryPath", () => {
  it("uses the named CLI bin entry when package.json exports a bin map", () => {
    const cliBinaryPath = resolveCliBinaryPath({
      repoRoot: "/repo",
      packageJson: {
        bin: {
          "create-better-fullstack": "dist/cli.mjs",
        },
      },
    });

    expect(cliBinaryPath).toBe("/repo/apps/cli/dist/cli.mjs");
  });

  it("supports string bin fields", () => {
    const cliBinaryPath = resolveCliBinaryPath({
      repoRoot: "/repo",
      packageJson: {
        bin: "dist/index.mjs",
      },
    });

    expect(cliBinaryPath).toBe("/repo/apps/cli/dist/index.mjs");
  });

  it("falls back to the default dist path when no bin field is present", () => {
    const cliBinaryPath = resolveCliBinaryPath({
      repoRoot: "/repo",
      packageJson: {},
    });

    expect(cliBinaryPath).toBe("/repo/apps/cli/dist/cli.mjs");
  });
});
