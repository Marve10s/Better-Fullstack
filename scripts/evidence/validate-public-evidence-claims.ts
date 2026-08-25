import { readFile } from "node:fs/promises";

import { PUBLIC_VERIFICATION_CASE_IDS } from "@web/lib/docs/release-verification-cases";
import { GENERATED_PROJECT_PROOF_CASES } from "@testing/lib/generated-project-proof-matrix";
import { REQUIRED_BUILD_PROOF_CASE_IDS } from "@scripts/release/release-receipt";

export type PublicEvidenceContractInputs = {
  promotionalFiles: Record<string, string>;
  badgeSource: string;
  pageSource: string;
  routeSource: string;
  verificationSource: string;
};

export function validatePublicEvidenceContracts(inputs: PublicEvidenceContractInputs): string[] {
  const errors: string[] = [];
  for (const [path, content] of Object.entries(inputs.promotionalFiles)) {
    if (/production[- ]ready/i.test(content)) {
      errors.push(`${path} makes an unqualified production-ready claim`);
    }
    if (/runtime[- ]verified/i.test(content)) {
      errors.push(`${path} makes a runtime-verified claim without runtime receipt evidence`);
    }
  }

  const expectedIds = GENERATED_PROJECT_PROOF_CASES.map((entry) => entry.id);
  if (
    JSON.stringify(expectedIds) !== JSON.stringify(REQUIRED_BUILD_PROOF_CASE_IDS) ||
    JSON.stringify(expectedIds) !== JSON.stringify(PUBLIC_VERIFICATION_CASE_IDS)
  ) {
    errors.push("release, generated-project, and public verification case IDs do not match");
  }
  if (
    !inputs.verificationSource.includes('maximumEvidenceLevel: "runtime-verified"') ||
    !inputs.verificationSource.includes(
      'capCapabilityEvidenceLevel("runtime-verified", "runtime-verified")',
    ) ||
    !inputs.verificationSource.includes("CapabilityEvidenceReceiptSchema") ||
    !inputs.verificationSource.includes("receipt.capabilityEvidence")
  ) {
    errors.push("public verification must require current runtime receipt evidence");
  }
  if (
    !inputs.routeSource.includes("fetchPublicVerificationReport(__BFS_DEPLOYED_GIT_HEAD__)") ||
    inputs.routeSource.includes("verifiedCombinationsSummary")
  ) {
    errors.push("the public badge must evaluate the release receipt for the deployed commit");
  }
  if (
    !inputs.badgeSource.includes('verification.status === "verified"') ||
    !inputs.badgeSource.includes('color: verification.status === "verified"')
  ) {
    errors.push("the public badge must fail closed unless the receipt is verified");
  }
  if (!inputs.pageSource.includes("ScaffBench") || !inputs.pageSource.includes("does not raise")) {
    errors.push("the public verification page must keep ScaffBench separate from product evidence");
  }
  return errors;
}

export async function loadPublicEvidenceContractInputs(): Promise<PublicEvidenceContractInputs> {
  const promotionalPaths = [
    "README.md",
    "apps/cli/package.json",
    "apps/web/src/lib/content/llms.ts",
    "apps/web/src/lib/seo/seo.ts",
  ];
  const promotionalFiles = Object.fromEntries(
    await Promise.all(
      promotionalPaths.map(async (path) => [path, await readFile(path, "utf8")] as const),
    ),
  );
  const [badgeSource, pageSource, routeSource, verificationSource] = await Promise.all([
    readFile("apps/web/src/lib/docs/verified-combinations-badge.ts", "utf8"),
    readFile("apps/web/content/docs/verification.mdx", "utf8"),
    readFile("apps/web/src/routes/api/verified-combinations.ts", "utf8"),
    readFile("apps/web/src/lib/docs/release-verification.ts", "utf8"),
  ]);
  return { promotionalFiles, badgeSource, pageSource, routeSource, verificationSource };
}

if (import.meta.main) {
  const errors = validatePublicEvidenceContracts(await loadPublicEvidenceContractInputs());
  if (errors.length > 0) {
    console.error(errors.map((error) => `- ${error}`).join("\n"));
    process.exit(1);
  }
  console.log("Public evidence contract validation passed.");
}
