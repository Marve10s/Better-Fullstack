import { describe, expect, it } from "bun:test";

import { auditCapabilityEvidence } from "@scripts/evidence/capability-evidence-audit";

describe("capability evidence audit", () => {
  it("inventories public options and detects evidence risks", async () => {
    const report = await auditCapabilityEvidence();
    expect(report.schemaVersion).toBe(1);
    expect(report.publicOptionRecords).toBeGreaterThan(900);
    expect(report.scannedFiles).toBeGreaterThan(100);
    expect(report.findings.some((finding) => finding.kind === "placeholder")).toBe(true);
    expect(report.findings.some((finding) => finding.kind === "manual-setup")).toBe(true);
    expect(
      report.findings.every(
        (finding) =>
          finding.path.length > 0 &&
          finding.excerpt.length > 0 &&
          finding.maintenanceOwner.length > 0,
      ),
    ).toBe(true);
  });
});
