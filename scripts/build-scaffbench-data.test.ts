import { describe, expect, it } from "bun:test";

import { corePass, fullPass, stepGreen } from "./build-scaffbench-data";

// These mirror the exact JSON shape build-scaffbench-data.ts consumes from each
// run's summary.json: result.validation.{projectExists, steps{name -> StepResult}}.
// `status` is omitted on a normal step, "skip" when a gate check could not run
// (no tool configured, exitCode null), and "na" when a step is not applicable
// (genuinely testless scaffold), which is excluded from the verdict entirely.
type Step = {
  command: string;
  exitCode: number | null;
  timedOut: boolean;
  spawnError?: boolean;
  status?: "skip" | "na";
};

const ok = (command: string): Step => ({ command, exitCode: 0, timedOut: false });
const failed = (command: string): Step => ({ command, exitCode: 1, timedOut: false });
const skip = (command: string): Step => ({ command, exitCode: null, timedOut: false, status: "skip" });
const na = (command: string): Step => ({ command, exitCode: null, timedOut: false, status: "na" });

const run = (steps: Record<string, Step>, projectExists = true) => ({
  validation: { projectExists, steps },
});

describe("stepGreen", () => {
  it("is true only when the step ran and exited 0", () => {
    expect(stepGreen(ok("bun install"))).toBe(true);
    expect(stepGreen(failed("bun run build"))).toBe(false);
    expect(stepGreen({ command: "x", exitCode: 0, timedOut: true })).toBe(false);
    expect(stepGreen({ command: "x", exitCode: 0, timedOut: false, spawnError: true })).toBe(false);
  });

  it("treats a 'skip' (no tool configured, exitCode null) as NOT green", () => {
    expect(stepGreen(skip("lint (no linter configured)"))).toBe(false);
  });
});

describe("corePass / fullPass gate logic", () => {
  it("does not pass a zero-step result (no validator fired)", () => {
    expect(corePass(run({}))).toBe(false);
    expect(fullPass(run({}))).toBe(false);
  });

  it("does not pass when the project does not exist", () => {
    expect(corePass({ validation: { projectExists: false, steps: {} } })).toBe(false);
    expect(fullPass({ validation: { projectExists: false, steps: {} } })).toBe(false);
  });

  it("passes a normal all-green run (core + gate steps)", () => {
    const r = run({
      install: ok("bun install"),
      build: ok("bun run build"),
      typecheck: ok("tsc --build"),
      lint: ok("biome lint ."),
      format: ok("biome format ."),
      test: ok("bun run test"),
    });
    expect(corePass(r)).toBe(true);
    expect(fullPass(r)).toBe(true);
  });

  it("a 'skip' gate step disqualifies Full pass (but not Core, since gate is excluded from Core)", () => {
    // Core (install/build/typecheck) is green; the linter could not run -> 'skip'.
    const r = run({
      install: ok("bun install"),
      build: ok("bun run build"),
      typecheck: ok("tsc --build"),
      lint: skip("lint (no linter configured)"),
    });
    expect(corePass(r)).toBe(true);
    expect(fullPass(r)).toBe(false);
  });

  it("a 'skip' on a CORE (non-gate) step disqualifies both Core and Full", () => {
    const r = run({
      install: ok("bun install"),
      build: skip("build (not configured)"),
    });
    expect(corePass(r)).toBe(false);
    expect(fullPass(r)).toBe(false);
  });

  it("excludes an 'na' step (genuinely testless scaffold) from the verdict", () => {
    const r = run({
      install: ok("bun install"),
      build: ok("bun run build"),
      test: na("test (no test script)"),
    });
    // The 'na' test is neither pass nor fail — every real step is green.
    expect(corePass(r)).toBe(true);
    expect(fullPass(r)).toBe(true);
  });

  it("does not pass Core when every core step is 'na' (nothing actually ran)", () => {
    const r = run({ test: na("test (no test script)") });
    expect(corePass(r)).toBe(false);
    expect(fullPass(r)).toBe(false);
  });

  it("a failed route-check only affects Full pass, not Core (route is a gate step)", () => {
    const r = run({
      install: ok("bun install"),
      build: ok("bun run build"),
      route: failed("route-check"),
    });
    expect(corePass(r)).toBe(true);
    expect(fullPass(r)).toBe(false);
  });

  it("a failed doctor step only affects Full pass, not Core", () => {
    const r = run({
      install: ok("bun install"),
      build: ok("bun run build"),
      doctor: failed("doctor"),
    });
    expect(corePass(r)).toBe(true);
    expect(fullPass(r)).toBe(false);
  });

  it("a failed core (build) step fails both Core and Full", () => {
    const r = run({ install: ok("bun install"), build: failed("bun run build") });
    expect(corePass(r)).toBe(false);
    expect(fullPass(r)).toBe(false);
  });

  it("fullPass ⊆ corePass across all gate-vs-core failure combinations", () => {
    const cases = [
      run({}),
      run({ test: na("test") }),
      run({ install: ok("i"), build: ok("b") }),
      run({ install: ok("i"), build: ok("b"), lint: skip("lint") }),
      run({ install: ok("i"), build: ok("b"), route: failed("route") }),
      run({ install: ok("i"), build: ok("b"), doctor: failed("doctor") }),
      run({ install: ok("i"), build: failed("b") }),
      run({ install: ok("i"), build: ok("b"), format: ok("fmt"), test: ok("t") }),
    ];
    for (const c of cases) {
      if (fullPass(c)) expect(corePass(c)).toBe(true);
    }
  });
});
