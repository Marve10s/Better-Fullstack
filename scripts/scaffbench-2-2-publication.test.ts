import { describe, expect, it } from "bun:test";

import {
  assertBoardProtocol,
  assertCompleteSpecList,
  assertCompleteTrialMatrix,
  assertFullTierValidation,
  assertSinglePromptRow,
} from "./splice-scaffbench-2-2-row";

const specs = ["one", "two", "three"] as const;
const protocol = {
  suiteVersion: "2.1",
  harnessVersion: "2.2.1",
  validationCacheVersion: 5,
  promptVersion: "round-2",
};
const provenance = { ...protocol };

describe("ScaffBench 2.2 publication guards", () => {
  it("requires the exact benchmark spec list", () => {
    expect(() => assertCompleteSpecList(["one", "two"], specs, "run")).toThrow("missing: three");
    expect(() => assertCompleteSpecList(["one", "two", "three", "three"], specs, "run")).toThrow(
      "duplicate: three",
    );
    expect(() => assertCompleteSpecList(["one", "two", "three"], specs, "run")).not.toThrow();
  });

  it("rejects summaries containing multiple efforts or paths", () => {
    expect(() =>
      assertSinglePromptRow(
        [
          { model: "model", effort: "high", path: "prompt" },
          { model: "model", effort: "low", path: "prompt" },
        ],
        "model",
        "high",
        "run",
      ),
    ).toThrow("expected exactly one model/effort prompt row");
  });

  it("requires every result to match the board protocol", () => {
    expect(() => assertBoardProtocol([{ provenance }], protocol, "run")).not.toThrow();
    expect(() =>
      assertBoardProtocol(
        [{ provenance: { ...provenance, validationCacheVersion: 4 } }],
        protocol,
        "run",
      ),
    ).toThrow("does not match");
  });

  it("requires every configured trial for every benchmark spec", () => {
    const complete = specs.flatMap((specId) => [1, 2, 3].map((trial) => ({ specId, trial })));
    expect(() => assertCompleteTrialMatrix(complete, specs, 3, "run")).not.toThrow();
    expect(() =>
      assertCompleteTrialMatrix(
        complete.filter((result) => !(result.specId === "two" && result.trial === 2)),
        specs,
        3,
        "run",
      ),
    ).toThrow("incomplete trial set for two; missing: 2");
  });

  it("requires Full-tier validation for every published result", () => {
    expect(() =>
      assertFullTierValidation(true, [{ validation: { qualityGateRequested: true } }], "run"),
    ).not.toThrow();
    expect(() =>
      assertFullTierValidation(false, [{ validation: { qualityGateRequested: false } }], "run"),
    ).toThrow("requires Full-tier validation");
    expect(() =>
      assertFullTierValidation(
        true,
        [
          { validation: { qualityGateRequested: true } },
          { validation: { qualityGateRequested: false } },
        ],
        "run",
      ),
    ).toThrow("requires Full-tier validation");
    expect(() =>
      assertFullTierValidation(
        true,
        [{ validation: { qualityGateRequested: true, deferred: true } }],
        "run",
      ),
    ).toThrow("requires Full-tier validation");
    expect(() =>
      assertFullTierValidation(
        true,
        [{ validation: { qualityGateRequested: true, skipped: true } }],
        "run",
      ),
    ).toThrow("requires Full-tier validation");
  });
});
