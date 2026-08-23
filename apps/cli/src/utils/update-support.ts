import { evaluateUpdateSupport, type UpdateSupportEligibility } from "@better-fullstack/types";

import { readScaffoldManifestResult } from "./scaffold-manifest";

export async function getProjectUpdateSupport(
  projectDir: string,
  configVersion: string | undefined,
  targetVersion: string,
): Promise<UpdateSupportEligibility> {
  const manifestResult = await readScaffoldManifestResult(projectDir);
  const manifest = manifestResult.status === "valid" ? manifestResult.manifest : null;
  const provenanceVerified =
    manifest?.provenance.state === "verified" && manifest.provenance.current !== null;

  return evaluateUpdateSupport({
    sourceVersion: manifest?.provenance.current?.cli ?? configVersion ?? null,
    targetVersion,
    manifestVersion: manifest?.version ?? null,
    provenanceVerified,
  });
}
