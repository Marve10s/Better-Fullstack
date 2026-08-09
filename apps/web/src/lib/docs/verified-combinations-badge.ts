export type VerifiedEvidenceLane = {
  pass: number;
  total: number;
  current?: boolean;
};

export type VerifiedBadgeSummary = {
  smoke: VerifiedEvidenceLane[];
  scaffbench: VerifiedEvidenceLane[];
  releaseGuard: VerifiedEvidenceLane | null;
  publishedPackage: VerifiedEvidenceLane | null;
};

export type VerifiedCombinationsBadgePayload = {
  schemaVersion: 1;
  label: string;
  message: string;
  color: "brightgreen" | "yellow" | "red";
  namedLogo: string;
};

export function verifiedCombinationsBadgePayload(
  summary: VerifiedBadgeSummary,
): VerifiedCombinationsBadgePayload {
  const required = [
    ...summary.smoke,
    ...summary.scaffbench,
    summary.releaseGuard ?? { pass: 0, total: 1, current: false },
    summary.publishedPackage ?? { pass: 0, total: 3, current: false },
  ];
  const pass = required.reduce((total, lane) => total + (lane.current === true ? lane.pass : 0), 0);
  const total = required.reduce((sum, lane) => sum + lane.total, 0);
  const allCurrent = required.every((lane) => lane.current === true);
  const allPassing = allCurrent && total > 0 && pass === total;

  return {
    schemaVersion: 1,
    label: "verified combinations",
    message: `${pass}/${total} passing`,
    color: allPassing ? "brightgreen" : allCurrent && pass > 0 ? "yellow" : "red",
    namedLogo: "githubactions",
  };
}
