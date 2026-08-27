import type { PublicVerificationReport } from "@/lib/docs/release-verification";

export type VerifiedCombinationsBadgePayload = {
  schemaVersion: 1;
  label: string;
  message: string;
  color: "brightgreen" | "red";
  namedLogo: string;
  verification: PublicVerificationReport;
};

export function verifiedCombinationsBadgePayload(
  verification: PublicVerificationReport,
): VerifiedCombinationsBadgePayload {
  const passed = verification.cases.filter((entry) => entry.result === "pass").length;
  const total = verification.cases.length;
  return {
    schemaVersion: 1,
    label: "Better Fullstack proof",
    message:
      verification.status === "verified"
        ? `${passed}/${total} runtime verified`
        : `0/${total} ${verification.status}`,
    color: verification.status === "verified" ? "brightgreen" : "red",
    namedLogo: "githubactions",
    verification,
  };
}
