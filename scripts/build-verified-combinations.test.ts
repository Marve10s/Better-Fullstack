import { expect, it } from "bun:test";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import {
  readSmokeResults,
  releaseGuardEvidenceStatus,
  releaseGuardResultText,
} from "./build-verified-combinations";
import { EVIDENCE_SCHEMA_VERSION } from "./verified-combinations/evidence";

it("consumes the versioned smoke evidence envelope", async () => {
  const directory = await mkdtemp(join(tmpdir(), "verified-combinations-"));
  const evidencePath = join(directory, "smoke-results.json");
  try {
    await writeFile(
      evidencePath,
      JSON.stringify({
        schemaVersion: EVIDENCE_SCHEMA_VERSION,
        evidenceType: "better-fullstack/smoke",
        generatedAt: new Date().toISOString(),
        gitHead: "a".repeat(40),
        workspaceClean: true,
        expectedRows: ["fixture"],
        overallSuccess: true,
        results: [
          { ecosystem: "typescript", comboName: "fixture", overallSuccess: true, steps: [] },
        ],
      }),
    );

    const evidence = await readSmokeResults({ label: "fixture", path: evidencePath });
    expect(evidence?.results.map((result) => result.comboName)).toEqual(["fixture"]);
    expect(evidence?.sources).toEqual([evidencePath]);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

it("does not render stale release evidence as passing", () => {
  expect(releaseGuardEvidenceStatus("pass", false)).toBe("fail");
  expect(releaseGuardEvidenceStatus("pass", true)).toBe("pass");
  expect(releaseGuardResultText(19, 19, false)).toBe("Result: 0/19 gates passing.");
  expect(releaseGuardResultText(19, 19, true)).toBe("Result: 19/19 gates passing.");
});
