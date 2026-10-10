import type { PublicVerificationReport } from "@/lib/docs/release-verification";

import { m } from "@/paraglide/messages.js";

const verificationProse: Record<string, () => string> = {
  "The latest release receipt is missing required fields.": m.docsVerificationMissingFields,
  "The latest release receipt has invalid timestamps.": m.docsVerificationInvalidTimestamps,
  "The latest release receipt has expired.": m.docsVerificationExpired,
  "The deployed commit identity is unavailable, so receipt freshness cannot be proved.":
    m.docsVerificationUnknownCommit,
  "The latest release receipt belongs to a different deployed commit.":
    m.docsVerificationDifferentCommit,
  "The latest release receipt has incomplete or mismatched runtime evidence.":
    m.docsVerificationIncompleteRuntime,
  "The latest release receipt has an incomplete proof matrix.": m.docsVerificationIncompleteMatrix,
  "The latest release receipt has mismatched package identity.":
    m.docsVerificationMismatchedPackage,
  "All eight release recipes passed clean install, build, and live boundary assertions.":
    m.docsVerificationPassedRecipes,
  "No current release receipt is available.": m.docsVerificationNoReceipt,
  "The current release receipt could not be loaded.": m.docsVerificationLoadFailed,
  "Exercises the generated Hono process and HTTP boundary, not browser rendering.":
    m.docsVerificationTypescriptBoundary,
  "Exercises the generated backend boundary. It does not launch a native device UI.":
    m.docsVerificationMobileBoundary,
  "Exercises the generated Clap info, start, and check commands with Axum and SeaORM on local SQLite, not a network database.":
    m.docsVerificationRustBoundary,
  "Exercises FastAPI through HTTP. It does not prove external service selections.":
    m.docsVerificationPythonBoundary,
  "Exercises Gin and GORM with local SQLite, not a network database.": m.docsVerificationGoBoundary,
  "Exercises Spring Boot and Actuator with the generated local H2 configuration.":
    m.docsVerificationJavaBoundary,
  "Exercises Phoenix and Ecto migrations against local SQLite.": m.docsVerificationElixirBoundary,
  "Exercises ASP.NET and EF Core with the generated local SQLite database.":
    m.docsVerificationDotnetBoundary,
};

const evidenceLabels = {
  listed: m.docsVerificationListed,
  generated: m.docsVerificationGenerated,
  "build-verified": m.docsVerificationBuildVerified,
  "runtime-verified": m.docsVerificationRuntimeVerified,
} satisfies Record<NonNullable<PublicVerificationReport["evidenceLevel"]>, () => string>;

export function localizedVerificationProse(value: string): string {
  return Object.hasOwn(verificationProse, value) ? verificationProse[value]() : value;
}

export function localizedEvidenceLevel(value: PublicVerificationReport["evidenceLevel"]): string {
  return value ? evidenceLabels[value]() : m.docsVerificationNoEvidence();
}
