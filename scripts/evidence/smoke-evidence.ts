export const EVIDENCE_SCHEMA_VERSION = 1 as const;

export type SmokeEvidenceEnvelope<Result = unknown> = {
  schemaVersion: typeof EVIDENCE_SCHEMA_VERSION;
  evidenceType: "better-fullstack/smoke";
  generatedAt: string;
  gitHead: string;
  workspaceClean: boolean;
  preset?: string;
  expectedRows: string[];
  overallSuccess: boolean;
  results: Result[];
};
