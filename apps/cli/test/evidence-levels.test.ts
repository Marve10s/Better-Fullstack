import {
  CAPABILITY_EVIDENCE_LEVEL_IDS,
  CAPABILITY_EVIDENCE_SCHEMA_VERSION,
} from "@better-fullstack/types";
import { $ } from "bun";
import { expect, it } from "bun:test";
import { resolve } from "node:path";

import { getCapabilityEvidenceReport } from "../src/utils/capability-evidence";

it("shares the evidence contract with CLI JSON", async () => {
  const report = getCapabilityEvidenceReport();
  expect(report.schemaVersion).toBe(CAPABILITY_EVIDENCE_SCHEMA_VERSION);
  expect(report.levels.map((level) => level.id)).toEqual(CAPABILITY_EVIDENCE_LEVEL_IDS);
  expect(report.recipes).toHaveLength(8);
  expect(report.summary.totalOptions).toBeGreaterThan(900);
  expect(report.inventory.every((record) => record.maintenanceOwner.length > 0)).toBe(true);

  const child = Bun.spawn(
    [process.execPath, resolve(import.meta.dir, "../src/cli.ts"), "evidence", "--json"],
    {
      env: { ...processEnv(), BTS_TELEMETRY: "0", NO_COLOR: "1" },
      stdout: "pipe",
      stderr: "pipe",
    },
  );
  const [stdout, stderr, exitCode] = await Promise.all([
    new Response(child.stdout).text(),
    new Response(child.stderr).text(),
    child.exited,
  ]);
  expect(exitCode, stderr).toBe(0);
  const output = JSON.parse(stdout) as typeof report;
  expect(output).toEqual(report);
});

it("drains large CLI JSON before exiting through a pipe", async () => {
  const result = await $`${process.execPath} ${resolve(
    import.meta.dir,
    "../src/cli.ts",
  )} evidence --json | ${process.execPath} -e ${"JSON.parse(await Bun.stdin.text())"}`
    .env({ ...processEnv(), BTS_TELEMETRY: "0", NO_COLOR: "1" })
    .quiet()
    .nothrow();

  expect(result.exitCode, result.stderr.toString()).toBe(0);
});

function processEnv(): Record<string, string | undefined> {
  return process.env;
}
