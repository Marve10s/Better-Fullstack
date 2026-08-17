import { describe, expect, it } from "bun:test";

import {
  EVIDENCE_SCHEMA_VERSION,
  evaluatePublishedPackageEvidence,
  evaluateReleaseGuardEvidence,
  evaluateScaffbenchEvidence,
  evaluateSmokeEvidence,
  type EvidenceReason,
} from "./verified-combinations/evidence";

const HEAD = "a".repeat(40);
const NOW = new Date("2026-08-09T12:00:00.000Z");
const context = {
  currentGitHead: HEAD,
  currentWorkspaceClean: true,
  currentPackageVersion: "2.5.0",
  now: NOW,
};
const source = {
  schemaVersion: EVIDENCE_SCHEMA_VERSION,
  generatedAt: "2026-08-09T11:00:00.000Z",
  gitHead: HEAD,
  workspaceClean: true,
  overallSuccess: true,
};

describe("source-bound evidence", () => {
  it("accepts a complete current smoke envelope", () => {
    expect(
      evaluateSmokeEvidence(
        {
          ...source,
          evidenceType: "better-fullstack/smoke",
          expectedRows: ["a", "b"],
          results: [
            {
              comboName: "a",
              overallSuccess: true,
              steps: [{ success: true }],
            },
            {
              comboName: "b",
              overallSuccess: true,
              steps: [{ success: true }],
            },
          ],
        },
        ["a", "b"],
        context,
      ),
    ).toEqual({ current: true, pass: 2, total: 2, reasons: [] });
  });

  it.each([
    ["legacy arrays", [{ comboName: "a", overallSuccess: true }], "unrecognized-version"],
    [
      "short SHAs",
      {
        ...source,
        gitHead: "abc",
        evidenceType: "better-fullstack/smoke",
        expectedRows: ["a"],
        results: [{ comboName: "a", overallSuccess: true }],
      },
      "invalid-git-head",
    ],
    [
      "dirty evidence",
      {
        ...source,
        workspaceClean: false,
        evidenceType: "better-fullstack/smoke",
        expectedRows: ["a"],
        results: [{ comboName: "a", overallSuccess: true }],
      },
      "workspace-dirty",
    ],
    [
      "stale timestamps",
      {
        ...source,
        generatedAt: "2026-08-01T00:00:00.000Z",
        evidenceType: "better-fullstack/smoke",
        expectedRows: ["a"],
        results: [{ comboName: "a", overallSuccess: true }],
      },
      "stale-timestamp",
    ],
    [
      "future timestamps",
      {
        ...source,
        generatedAt: "2026-08-10T00:00:00.000Z",
        evidenceType: "better-fullstack/smoke",
        expectedRows: ["a"],
        results: [{ comboName: "a", overallSuccess: true }],
      },
      "future-timestamp",
    ],
    [
      "incomplete rows",
      {
        ...source,
        evidenceType: "better-fullstack/smoke",
        expectedRows: ["a", "b"],
        results: [{ comboName: "a", overallSuccess: true }],
      },
      "incomplete-rows",
    ],
  ])("fails closed for %s", (_, input, reason) => {
    const result = evaluateSmokeEvidence(input, ["a"], context);
    expect(result.current).toBe(false);
    expect(result.pass).toBe(0);
    expect(result.reasons).toContain(reason as EvidenceReason);
  });

  it("keeps a lane current when one combo fails, counting only the passing rows", () => {
    const result = evaluateSmokeEvidence(
      {
        ...source,
        overallSuccess: false,
        evidenceType: "better-fullstack/smoke",
        expectedRows: ["a", "b", "c"],
        results: [
          { comboName: "a", overallSuccess: true, steps: [{ success: true }] },
          { comboName: "b", overallSuccess: false, steps: [{ success: false }] },
          { comboName: "c", overallSuccess: true, steps: [{ success: true }] },
        ],
      },
      ["a", "b", "c"],
      context,
    );

    expect(result.current).toBe(true);
    expect(result.pass).toBe(2);
    expect(result.total).toBe(3);
    expect(result.reasons).toContain("failed-validation");
    expect(result.reasons).toContain("unsuccessful");
  });

  it("rejects smoke rows with no executed gating step", () => {
    const result = evaluateSmokeEvidence(
      {
        ...source,
        evidenceType: "better-fullstack/smoke",
        expectedRows: ["a"],
        results: [{ comboName: "a", overallSuccess: true, steps: [] }],
      },
      ["a"],
      context,
    );

    expect(result.pass).toBe(0);
    expect(result.reasons).toContain("no-executed-steps");
  });

  it("rejects duplicate or extra smoke rows", () => {
    const result = evaluateSmokeEvidence(
      {
        ...source,
        evidenceType: "better-fullstack/smoke",
        expectedRows: ["a"],
        results: [
          { comboName: "a", overallSuccess: true, steps: [{ success: true }] },
          { comboName: "a", overallSuccess: true, steps: [{ success: true }] },
        ],
      },
      ["a"],
      context,
    );

    expect(result.pass).toBe(0);
    expect(result.reasons).toContain("incomplete-rows");
  });

  it("keeps advisory failures current without counting them as Pass", () => {
    const result = evaluateSmokeEvidence(
      {
        ...source,
        evidenceType: "better-fullstack/smoke",
        expectedRows: ["a"],
        results: [
          {
            comboName: "a",
            overallSuccess: true,
            steps: [{ success: true }, { success: false, advisory: true }],
          },
        ],
      },
      ["a"],
      context,
    );

    expect(result).toEqual({ current: true, pass: 0, total: 1, reasons: [] });
  });

  it("requires a complete successful release guard", () => {
    const result = evaluateReleaseGuardEvidence(
      { ...source, steps: [{ command: "one", status: "pass" }] },
      ["one", "two"],
      context,
    );
    expect(result.pass).toBe(0);
    expect(result.reasons).toContain("incomplete-rows");
  });
});

describe("ScaffBench evidence", () => {
  const validResult = {
    specId: "spec",
    failureTags: [],
    validation: {
      projectExists: true,
      deferred: false,
      steps: { build: { status: "ran", exitCode: 0, timedOut: false } },
    },
  };
  const valid = {
    generatedAt: source.generatedAt,
    metadata: {
      evidenceSchemaVersion: EVIDENCE_SCHEMA_VERSION,
      gitHead: HEAD,
      workspaceClean: true,
      environmentQualified: true,
      generatorSource: "workspace-local",
      generatorGitHead: HEAD,
      bfGeneratorVersion: "2.5.0",
    },
    results: [validResult],
  };

  it("accepts qualified execution with real passing steps", () => {
    expect(evaluateScaffbenchEvidence(valid, ["spec"], context)).toEqual({
      current: true,
      pass: 1,
      total: 1,
      reasons: [],
    });
  });

  it.each([
    ["unqualified", { metadata: { environmentQualified: false } }, "environment-unqualified"],
    ["an unbound generator", { metadata: { generatorSource: "registry" } }, "generator-unbound"],
    [
      "the wrong generator version",
      { metadata: { bfGeneratorVersion: "2.4.0" } },
      "wrong-package-version",
    ],
    [
      "empty",
      { results: [{ ...validResult, validation: { projectExists: true, steps: {} } }] },
      "no-executed-steps",
    ],
    [
      "deferred",
      {
        results: [
          {
            ...validResult,
            validation: { deferred: true, steps: validResult.validation.steps },
          },
        ],
      },
      "deferred-validation",
    ],
    [
      "skipped",
      {
        results: [
          {
            ...validResult,
            validation: { steps: { build: { status: "skip", exitCode: null } } },
          },
        ],
      },
      "skipped-validation",
    ],
    [
      "failed",
      {
        results: [
          { ...validResult, validation: { steps: { build: { status: "ran", exitCode: 1 } } } },
        ],
      },
      "failed-validation",
    ],
    [
      "unknown step status",
      {
        results: [{ ...validResult, validation: { steps: { build: { exitCode: 0 } } } }],
      },
      "failed-validation",
    ],
    [
      "timed out",
      {
        results: [
          {
            ...validResult,
            validation: { steps: { build: { status: "ran", exitCode: 0, timedOut: true } } },
          },
        ],
      },
      "failed-validation",
    ],
  ])("rejects %s validation", (_, override, reason) => {
    const result = evaluateScaffbenchEvidence(
      { ...valid, ...override, metadata: { ...valid.metadata, ...(override as any).metadata } },
      ["spec"],
      context,
    );
    expect(result.pass).toBe(0);
    expect(result.reasons).toContain(reason as EvidenceReason);
  });
});

describe("published-package evidence", () => {
  const results = ["bun", "npm", "pnpm"].map((manager) => ({ manager, status: "pass" }));
  const publishedContext = { now: NOW, expectedVersion: "2.5.0" };
  const valid = {
    schemaVersion: EVIDENCE_SCHEMA_VERSION,
    generatedAt: source.generatedAt,
    packageName: "create-better-fullstack",
    specifier: "2.5.0",
    packageSpec: "create-better-fullstack@2.5.0",
    registry: "https://registry.npmjs.org",
    overallSuccess: true,
    managers: ["bun", "npm", "pnpm"],
    results,
  };

  it("accepts fresh evidence for the exact current version", () => {
    expect(evaluatePublishedPackageEvidence(valid, publishedContext)).toEqual({
      current: true,
      pass: 3,
      total: 3,
      reasons: [],
    });
  });

  it.each([
    ["a tag", { specifier: "latest" }, "non-exact-semver"],
    ["the wrong version", { specifier: "2.4.0" }, "wrong-package-version"],
    [
      "another package",
      { packageName: "other", packageSpec: "other@2.5.0" },
      "wrong-package-identity",
    ],
    ["another registry", { registry: "https://example.invalid" }, "wrong-registry"],
    ["stale evidence", { generatedAt: "2026-08-01T00:00:00.000Z" }, "stale-timestamp"],
    [
      "duplicate managers",
      { results: [results[0], results[0], results[2]] },
      "incomplete-package-managers",
    ],
  ])("rejects %s", (_, override, reason) => {
    const verdict = evaluatePublishedPackageEvidence({ ...valid, ...override }, publishedContext);
    expect(verdict.pass).toBe(0);
    expect(verdict.reasons).toContain(reason as EvidenceReason);
  });
});
