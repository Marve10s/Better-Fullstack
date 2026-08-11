export type VerifiedEvidenceLane = {
  pass: number;
  total: number;
  current?: boolean;
};

export type VerifiedBadgeSummary = {
  expiresAt?: string;
  expectedTotals?: {
    releaseGuard: number;
    publishedPackage: number;
  };
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

export function verifiedEvidenceExpired(summary: VerifiedBadgeSummary, now: Date): boolean {
  const expiry = summary.expiresAt ? Date.parse(summary.expiresAt) : Number.NaN;
  return !Number.isFinite(expiry) || now.getTime() > expiry;
}

export function verifiedCombinationsBadgePayload(
  summary: VerifiedBadgeSummary,
  now: Date = new Date(),
): VerifiedCombinationsBadgePayload {
  const expired = verifiedEvidenceExpired(summary, now);
  const required = [
    ...summary.smoke,
    ...summary.scaffbench,
    summary.releaseGuard ?? {
      pass: 0,
      total: summary.expectedTotals?.releaseGuard ?? 1,
      current: false,
    },
    summary.publishedPackage ?? {
      pass: 0,
      total: summary.expectedTotals?.publishedPackage ?? 3,
      current: false,
    },
  ];
  const laneCurrent = (lane: VerifiedEvidenceLane) => !expired && lane.current === true;
  const pass = required.reduce((total, lane) => total + (laneCurrent(lane) ? lane.pass : 0), 0);
  const total = required.reduce((sum, lane) => sum + lane.total, 0);
  const allCurrent = required.every((lane) => laneCurrent(lane));
  const allPassing = allCurrent && total > 0 && pass === total;

  return {
    schemaVersion: 1,
    label: "verified combinations",
    message: `${pass}/${total} passing`,
    color: allPassing ? "brightgreen" : allCurrent && pass > 0 ? "yellow" : "red",
    namedLogo: "githubactions",
  };
}
