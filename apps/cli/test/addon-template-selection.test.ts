import { describe, expect, it } from "bun:test";

import { shouldPromptForAddonSelection } from "../src/helpers/addons/interactive-selection";

describe("shouldPromptForAddonSelection", () => {
  it("returns false in silent mode", () => {
    expect(
      shouldPromptForAddonSelection({
        silent: true,
        stdinIsTTY: true,
        stdoutIsTTY: true,
        ci: undefined,
      }),
    ).toBe(false);
  });

  it("returns false in CI", () => {
    expect(
      shouldPromptForAddonSelection({
        silent: false,
        stdinIsTTY: true,
        stdoutIsTTY: true,
        ci: "true",
      }),
    ).toBe(false);
  });

  it("returns false for CI values like 1", () => {
    expect(
      shouldPromptForAddonSelection({
        silent: false,
        stdinIsTTY: true,
        stdoutIsTTY: true,
        ci: "1",
      }),
    ).toBe(false);
  });

  it("returns false when stdin is not a TTY", () => {
    expect(
      shouldPromptForAddonSelection({
        silent: false,
        stdinIsTTY: false,
        stdoutIsTTY: true,
        ci: undefined,
      }),
    ).toBe(false);
  });

  it("returns false when stdout is not a TTY", () => {
    expect(
      shouldPromptForAddonSelection({
        silent: false,
        stdinIsTTY: true,
        stdoutIsTTY: false,
        ci: undefined,
      }),
    ).toBe(false);
  });

  it("returns true for interactive sessions", () => {
    const originalCi = process.env.CI;

    process.env.CI = "true";
    try {
      expect(
        shouldPromptForAddonSelection({
          silent: false,
          stdinIsTTY: true,
          stdoutIsTTY: true,
          ci: undefined,
        }),
      ).toBe(true);
    } finally {
      if (originalCi === undefined) {
        delete process.env.CI;
      } else {
        process.env.CI = originalCi;
      }
    }
  });
});
