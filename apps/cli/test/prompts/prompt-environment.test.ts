import { describe, expect, it } from "bun:test";

import { canPromptInteractively, isCiEnvironment } from "@/presentation/prompt-environment";

describe("isCiEnvironment", () => {
  it("treats common CI truthy values as CI", () => {
    expect(isCiEnvironment("true")).toBe(true);
    expect(isCiEnvironment("1")).toBe(true);
    expect(isCiEnvironment("github_actions")).toBe(true);
  });

  it("treats empty and explicit falsey values as non-CI", () => {
    expect(isCiEnvironment(undefined)).toBe(false);
    expect(isCiEnvironment("")).toBe(false);
    expect(isCiEnvironment("false")).toBe(false);
    expect(isCiEnvironment("0")).toBe(false);
  });
});

describe("canPromptInteractively", () => {
  it("returns false in silent mode", () => {
    expect(
      canPromptInteractively({
        silent: true,
        stdinIsTTY: true,
        stdoutIsTTY: true,
        ci: undefined,
      }),
    ).toBe(false);
  });

  it("returns false when CI is enabled", () => {
    expect(
      canPromptInteractively({
        silent: false,
        stdinIsTTY: true,
        stdoutIsTTY: true,
        ci: "true",
      }),
    ).toBe(false);
  });

  it("treats ci undefined as an explicit override", () => {
    const originalCi = process.env.CI;

    process.env.CI = "true";
    try {
      expect(
        canPromptInteractively({
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

  it("returns false when either TTY is missing", () => {
    expect(
      canPromptInteractively({
        silent: false,
        stdinIsTTY: false,
        stdoutIsTTY: true,
        ci: undefined,
      }),
    ).toBe(false);
    expect(
      canPromptInteractively({
        silent: false,
        stdinIsTTY: true,
        stdoutIsTTY: false,
        ci: undefined,
      }),
    ).toBe(false);
  });
});
