import { describe, expect, it } from "bun:test";

import { MUTATION_CONTRACT_AUDIT, validateMutationContractAudit } from "./mutation-contract-audit";

describe("existing-project mutation audit", () => {
  it("covers every writing command with live source evidence", async () => {
    await expect(validateMutationContractAudit()).resolves.toBeUndefined();
    expect(MUTATION_CONTRACT_AUDIT.map((row) => row.command)).toEqual([
      "add",
      "remove",
      "update",
      "gen",
      "registry add",
    ]);
  });

  it("keeps the two proven original safety gaps visible", () => {
    expect(MUTATION_CONTRACT_AUDIT.find((row) => row.command === "gen")?.auditedGap).not.toBeNull();
    expect(
      MUTATION_CONTRACT_AUDIT.find((row) => row.command === "registry add")?.auditedGap,
    ).not.toBeNull();
  });
});
