import { describe, expect, it } from "bun:test";

import { lifecycleResult } from "@better-fullstack/project-lifecycle/contracts";
import { lifecycleResultOutputSchema } from "@/mcp/mcp-lifecycle-output-schemas";

describe("lifecycle contract v2", () => {
  it("fills every machine-readable collection without command-specific prose", () => {
    const result = lifecycleResult({
      operation: "gen",
      status: "planned",
      projectDir: "/tmp/project",
      provenance: { source: null, target: null, verified: false },
      recovery: { available: true },
    });

    expect(result).toMatchObject({
      contractVersion: "2",
      affected: { stackParts: [], files: [], dependencies: [] },
      compatibilityDecisions: [],
      manualReviewReasons: [],
      checks: [],
      sideEffects: [],
      history: { recorded: false },
    });
    expect(lifecycleResultOutputSchema.safeParse(result).success).toBe(true);
  });

  it("keeps external side effects separate from restored filesystem state", () => {
    const result = lifecycleResult({
      operation: "add",
      status: "rolled-back",
      projectDir: "/tmp/project",
      provenance: { source: null, target: null, verified: false },
      recovery: { available: true, transactionId: "recovery-1", automaticRollback: true },
      history: { recorded: true, recoveryId: "recovery-1" },
      sideEffects: [
        {
          kind: "filesystem",
          status: "restored",
          description: "Bound files restored.",
        },
        {
          kind: "package-manager",
          status: "failed",
          description: "Install failed after filesystem apply.",
          compensatingAction: "Run bun install after recovery.",
        },
      ],
    });

    expect(result.sideEffects).toEqual([
      expect.objectContaining({ kind: "filesystem", status: "restored" }),
      expect.objectContaining({ kind: "package-manager", status: "failed" }),
    ]);
    expect(lifecycleResultOutputSchema.safeParse(result).success).toBe(true);
  });
});
