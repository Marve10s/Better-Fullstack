import { describe, expect, test } from "bun:test";

import { shouldStartBetaTui } from "@/helpers/core/command-handlers";
import { getTuiSupport, type TuiSupportInput } from "@/tui/support";

const interactiveBun: TuiSupportInput = {
  bunVersion: "1.3.14",
  nodeVersion: "24.3.0",
  nodeFfiAvailable: true,
  platform: "darwin",
  arch: "arm64",
  stdinIsTTY: true,
  stdoutIsTTY: true,
  columns: 120,
  rows: 36,
};

const interactiveNode: TuiSupportInput = {
  ...interactiveBun,
  bunVersion: undefined,
  nodeVersion: "26.4.0",
};

function reasonFor(input: Partial<TuiSupportInput>, base = interactiveBun): string | undefined {
  const support = getTuiSupport({ ...base, ...input });
  return support.supported ? undefined : support.reason;
}

describe("beta TUI support check", () => {
  test("accepts the minimum Bun and Node.js versions in a large interactive terminal", () => {
    expect(getTuiSupport(interactiveBun)).toEqual({ supported: true });
    expect(getTuiSupport(interactiveNode)).toEqual({ supported: true });
  });

  test("rejects runtimes older than OpenTUI supports", () => {
    expect(reasonFor({ bunVersion: "1.3.13" })).toContain("Bun 1.3.14");
    expect(reasonFor({ nodeVersion: "v26.3.9" }, interactiveNode)).toContain("Node.js 26.4.0");
    expect(reasonFor({ nodeVersion: "v22.12.0" }, interactiveNode)).toContain(
      "you have Node.js 22.12.0",
    );
  });

  test("asks Node.js users to enable FFI when node:ffi is missing", () => {
    expect(reasonFor({ nodeFfiAvailable: false }, interactiveNode)).toContain(
      "NODE_OPTIONS=--experimental-ffi",
    );
  });

  test("rejects non-interactive, CI, dumb, small, and unsupported terminals", () => {
    expect(reasonFor({ stdinIsTTY: false })).toContain("interactive terminal");
    expect(reasonFor({ ci: "true" })).toContain("interactive terminal");
    expect(reasonFor({ term: "dumb" })).toContain("TERM=dumb");
    expect(reasonFor({ columns: 59 })).toContain("at least 60x16");
    expect(reasonFor({ rows: 15 })).toContain("at least 60x16");
    expect(reasonFor({ platform: "freebsd", arch: "x64" })).toContain("freebsd-x64");
  });
});

describe("beta TUI entry", () => {
  test("never starts for --yes, --part, a config base, or a non-interactive terminal", () => {
    expect(shouldStartBetaTui({ tui: true, yes: true }, false, undefined)).toBe(false);
    expect(
      shouldStartBetaTui({ tui: true, part: ["backend:typescript:hono"] }, false, undefined),
    ).toBe(false);
    expect(shouldStartBetaTui({ tui: true }, true, undefined)).toBe(false);
    expect(
      shouldStartBetaTui({ tui: true }, false, "tui", { stdinIsTTY: false, stdoutIsTTY: true }),
    ).toBe(false);
    expect(
      shouldStartBetaTui({ tui: true }, false, undefined, {
        silent: false,
        stdinIsTTY: true,
        stdoutIsTTY: true,
        ci: "",
      }),
    ).toBe(true);
    expect(shouldStartBetaTui({}, false, "continue")).toBe(false);
  });

  test("falls back to the classic flow without downloading when the terminal is unsupported", async () => {
    const { startBetaTui } = await import("@/tui/start");
    const previous = process.env.CI;
    process.env.CI = "true";
    try {
      expect(await startBetaTui()).toBeUndefined();
    } finally {
      if (previous === undefined) delete process.env.CI;
      else process.env.CI = previous;
    }
  });
});
