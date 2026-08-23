import { describe, expect, it } from "bun:test";

import {
  loadPublicEvidenceContractInputs,
  validatePublicEvidenceContracts,
} from "./validate-public-evidence-claims";

describe("public evidence contract", () => {
  it("accepts the repository public claims and receipt projection", async () => {
    expect(validatePublicEvidenceContracts(await loadPublicEvidenceContractInputs())).toEqual([]);
  });

  it("rejects unqualified maturity and production claims", async () => {
    const inputs = await loadPublicEvidenceContractInputs();
    inputs.promotionalFiles["README.md"] += "\nProduction-ready and runtime-verified.\n";
    inputs.verificationSource = inputs.verificationSource.replaceAll(
      'maximumEvidenceLevel: "runtime-verified"',
      'maximumEvidenceLevel: "build-verified"',
    );

    expect(validatePublicEvidenceContracts(inputs)).toEqual(
      expect.arrayContaining([
        "README.md makes an unqualified production-ready claim",
        "README.md makes a runtime-verified claim without runtime receipt evidence",
        "public verification must require current runtime receipt evidence",
      ]),
    );
  });

  it("rejects a badge detached from the deployed receipt", async () => {
    const inputs = await loadPublicEvidenceContractInputs();
    inputs.routeSource = inputs.routeSource.replace(
      "fetchPublicVerificationReport(__BFS_DEPLOYED_GIT_HEAD__)",
      "verifiedCombinationsSummary",
    );

    expect(validatePublicEvidenceContracts(inputs)).toContain(
      "the public badge must evaluate the release receipt for the deployed commit",
    );
  });
});
