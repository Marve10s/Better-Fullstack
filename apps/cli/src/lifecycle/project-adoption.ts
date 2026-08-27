import fs from "fs-extra";
import { parse } from "jsonc-parser";
import path from "node:path";

import type { StackPart } from "@/types";

import { renderCurrentProject } from "@/helpers/core/scaffold-upgrade";
import { formatStackPartSpec, legacyProjectConfigToStackParts } from "@/types";
import { readBtsConfig } from "@/config/bts-config";
import {
  computeScaffoldSnapshot,
  createAdoptedScaffoldManifest,
  hashContent,
  isStructuredBaselinePath,
  readScaffoldManifestResult,
  SCAFFOLD_MANIFEST_FILE,
  serializeScaffoldManifest,
  type ScaffoldManifest,
} from "@/lifecycle/scaffold-manifest";

export type AdoptionConfidence = "medium" | "low";

export type AdoptionStackPartCandidate = {
  spec: string;
  id: string;
  role: StackPart["role"];
  ecosystem: StackPart["ecosystem"];
  toolId: string;
  declaredSource: StackPart["source"];
  confidence: AdoptionConfidence;
  basis: "explicit-stack-graph" | "legacy-config-inference";
  uncertainty: string;
};

export type ProjectAdoptionPlan = {
  success: true;
  schemaVersion: 1;
  mode: "plan";
  projectDir: string;
  manifestState: "missing";
  adopted: false;
  provenanceState: "adopted-unverified";
  confirmationRequired: true;
  confirmationToken: string;
  configHash: string;
  projectStateHash: string;
  likelyStackParts: AdoptionStackPartCandidate[];
  templateEvidence: {
    expectedFiles: number;
    presentFiles: number;
    exactMatches: number;
    divergentFiles: number;
    missingFiles: number;
    extraFiles: number;
    exactMatchRatio: number;
    divergentPaths: string[];
    missingPaths: string[];
    extraPaths: string[];
  };
  uncertainty: string[];
  plannedWrites: [{ path: typeof SCAFFOLD_MANIFEST_FILE; effect: "create" }];
};

export type ProjectAdoptionFailure = {
  success: false;
  projectDir: string;
  error: string;
};

export type ProjectAdoptionResult = ProjectAdoptionPlan | ProjectAdoptionFailure;

export type ConfirmedProjectAdoption = Omit<ProjectAdoptionPlan, "mode" | "adopted"> & {
  mode: "adopted";
  adopted: true;
  manifest: {
    version: ScaffoldManifest["version"];
    provenanceState: "adopted-unverified";
    fileCount: number;
  };
};

function stateHash(hashes: Record<string, string>, modes: Record<string, number>): string {
  return hashContent(JSON.stringify({ hashes, modes }));
}

function tokenForPlan(plan: Omit<ProjectAdoptionPlan, "confirmationToken">): string {
  return hashContent(JSON.stringify(plan));
}

function projectFailure(projectDir: string, error: string): ProjectAdoptionFailure {
  return { success: false, projectDir, error };
}

function hasExplicitStackGraph(configBytes: Buffer): boolean {
  const parsed = parse(configBytes.toString("utf-8")) as unknown;
  return (
    parsed !== null &&
    typeof parsed === "object" &&
    !Array.isArray(parsed) &&
    Array.isArray((parsed as Record<string, unknown>).stackParts)
  );
}

function stackPartCandidates(
  stackParts: readonly StackPart[],
  explicitGraph: boolean,
): AdoptionStackPartCandidate[] {
  return stackParts
    .map((part) => {
      const legacyDeclaration = part.source === "legacy";
      return {
        spec: formatStackPartSpec(part, stackParts),
        id: part.id,
        role: part.role,
        ecosystem: part.ecosystem,
        toolId: part.toolId,
        declaredSource: part.source,
        confidence: explicitGraph && !legacyDeclaration ? ("medium" as const) : ("low" as const),
        basis: explicitGraph
          ? ("explicit-stack-graph" as const)
          : ("legacy-config-inference" as const),
        uncertainty: !explicitGraph
          ? "Translated from legacy flat bts.jsonc fields and not verified against the original generator release."
          : legacyDeclaration
            ? "Present in the saved graph, but its source is marked legacy and its original generator release is unverified."
            : "Declared in bts.jsonc, but the original generator release and on-disk implementation are unverified.",
      };
    })
    .sort((left, right) => left.spec.localeCompare(right.spec));
}

export async function planProjectAdoption(projectDirInput: string): Promise<ProjectAdoptionResult> {
  const requestedProjectDir = path.resolve(projectDirInput);
  const projectDir = await fs.realpath(requestedProjectDir).catch(() => requestedProjectDir);
  const manifestResult = await readScaffoldManifestResult(projectDir);
  if (manifestResult.status === "valid") {
    return projectFailure(
      projectDir,
      `A valid ${SCAFFOLD_MANIFEST_FILE} already exists. Adoption is only for projects without a baseline.`,
    );
  }
  if (manifestResult.status === "invalid") {
    return projectFailure(
      projectDir,
      `Refusing to replace malformed ${SCAFFOLD_MANIFEST_FILE}: ${manifestResult.error}`,
    );
  }

  const configPath = path.join(projectDir, "bts.jsonc");
  const configBytesBefore = await fs.readFile(configPath).catch(() => null);
  const config = await readBtsConfig(projectDir);
  if (!configBytesBefore || !config) {
    return projectFailure(
      projectDir,
      "No readable Better Fullstack config was found. Adoption requires a valid bts.jsonc.",
    );
  }

  const rendered = await renderCurrentProject(projectDir);
  if ("error" in rendered) return projectFailure(projectDir, rendered.error);

  const { hashes: projectHashes, modes: projectModes } = await computeScaffoldSnapshot(projectDir);
  const configBytesAfter = await fs.readFile(configPath).catch(() => null);
  if (!configBytesAfter || !configBytesBefore.equals(configBytesAfter)) {
    return projectFailure(projectDir, "bts.jsonc changed while the adoption plan was being built.");
  }

  const expectedPaths = [...rendered.renderHashes.keys()].sort();
  const presentPaths = expectedPaths.filter((filePath) => projectHashes[filePath] !== undefined);
  const exactPaths = presentPaths.filter(
    (filePath) => projectHashes[filePath] === rendered.renderHashes.get(filePath),
  );
  const divergentPaths = presentPaths.filter(
    (filePath) => projectHashes[filePath] !== rendered.renderHashes.get(filePath),
  );
  const missingPaths = expectedPaths.filter((filePath) => projectHashes[filePath] === undefined);
  const expectedPathSet = new Set(expectedPaths);
  const extraPaths = Object.keys(projectHashes)
    .filter((filePath) => !expectedPathSet.has(filePath))
    .sort();
  const explicitGraph = hasExplicitStackGraph(configBytesAfter);
  const stackParts = explicitGraph ? config.stackParts! : legacyProjectConfigToStackParts(config);
  const planWithoutToken: Omit<ProjectAdoptionPlan, "confirmationToken"> = {
    success: true,
    schemaVersion: 1,
    mode: "plan",
    projectDir,
    manifestState: "missing",
    adopted: false,
    provenanceState: "adopted-unverified",
    confirmationRequired: true,
    configHash: hashContent(configBytesAfter),
    projectStateHash: stateHash(projectHashes, projectModes),
    likelyStackParts: stackPartCandidates(stackParts, explicitGraph),
    templateEvidence: {
      expectedFiles: expectedPaths.length,
      presentFiles: presentPaths.length,
      exactMatches: exactPaths.length,
      divergentFiles: divergentPaths.length,
      missingFiles: missingPaths.length,
      extraFiles: extraPaths.length,
      exactMatchRatio: expectedPaths.length === 0 ? 0 : exactPaths.length / expectedPaths.length,
      divergentPaths,
      missingPaths,
      extraPaths,
    },
    uncertainty: [
      "The original CLI, generator, template set, and schema versions cannot be proven from this project.",
      explicitGraph
        ? "Stack Parts come from the saved graph, but adoption does not prove that every declared part still exists on disk."
        : "Stack Parts were inferred from legacy flat config fields and may not describe later manual architecture changes.",
      "Comparing with current templates can find matching paths and bytes, but cannot reconstruct historical generator lineage.",
    ],
    plannedWrites: [{ path: SCAFFOLD_MANIFEST_FILE, effect: "create" }],
  };
  return { ...planWithoutToken, confirmationToken: tokenForPlan(planWithoutToken) };
}

async function collectAdoptedBaselines(
  projectDir: string,
  hashes: Record<string, string>,
): Promise<{ success: true; baselines: Record<string, string> } | ProjectAdoptionFailure> {
  const baselines: Record<string, string> = {};
  for (const filePath of Object.keys(hashes).filter(isStructuredBaselinePath).sort()) {
    const bytes = await fs.readFile(path.join(projectDir, filePath)).catch(() => null);
    if (!bytes || hashContent(bytes) !== hashes[filePath]) {
      return projectFailure(
        projectDir,
        `${filePath} changed after the adoption plan. Build and confirm a new plan.`,
      );
    }
    baselines[filePath] = bytes.toString("utf-8");
  }
  return { success: true, baselines };
}

export async function confirmProjectAdoption(
  projectDirInput: string,
  confirmationToken: string | undefined,
): Promise<ConfirmedProjectAdoption | ProjectAdoptionFailure> {
  const plan = await planProjectAdoption(projectDirInput);
  if (!plan.success) return plan;
  if (!confirmationToken) {
    return projectFailure(
      plan.projectDir,
      "A confirmation token is required. Run the read-only adoption plan first.",
    );
  }
  if (confirmationToken !== plan.confirmationToken) {
    return projectFailure(
      plan.projectDir,
      "The adoption confirmation token is stale or belongs to another project state. Re-plan first.",
    );
  }

  const { hashes: projectHashes, modes: projectModes } = await computeScaffoldSnapshot(
    plan.projectDir,
  );
  const configBytes = await fs.readFile(path.join(plan.projectDir, "bts.jsonc")).catch(() => null);
  if (
    !configBytes ||
    hashContent(configBytes) !== plan.configHash ||
    stateHash(projectHashes, projectModes) !== plan.projectStateHash
  ) {
    return projectFailure(
      plan.projectDir,
      "The project changed after the adoption plan. Build and confirm a new plan.",
    );
  }
  const nonTemplatePaths = new Set([
    ...plan.templateEvidence.divergentPaths,
    ...plan.templateEvidence.extraPaths,
  ]);
  const adoptedHashes = Object.fromEntries(
    Object.entries(projectHashes).filter(([filePath]) => !nonTemplatePaths.has(filePath)),
  );
  const adoptedModes = Object.fromEntries(
    Object.entries(projectModes).filter(([filePath]) => !nonTemplatePaths.has(filePath)),
  );
  const baselines = await collectAdoptedBaselines(plan.projectDir, adoptedHashes);
  if (!baselines.success) return baselines;

  let manifest: ScaffoldManifest;
  try {
    manifest = await createAdoptedScaffoldManifest(plan.projectDir, {
      hashes: adoptedHashes,
      modes: adoptedModes,
      baselines: baselines.baselines,
    });
  } catch (error) {
    return projectFailure(
      plan.projectDir,
      `Could not create ${SCAFFOLD_MANIFEST_FILE}: ${error instanceof Error ? error.message : String(error)}`,
    );
  }

  const [configAfter, snapshotAfter] = await Promise.all([
    fs.readFile(path.join(plan.projectDir, "bts.jsonc")).catch(() => null),
    computeScaffoldSnapshot(plan.projectDir),
  ]);
  if (
    !configAfter ||
    hashContent(configAfter) !== plan.configHash ||
    stateHash(snapshotAfter.hashes, snapshotAfter.modes) !== plan.projectStateHash
  ) {
    const manifestPath = path.join(plan.projectDir, SCAFFOLD_MANIFEST_FILE);
    const currentManifest = await fs.readFile(manifestPath, "utf-8").catch(() => null);
    if (currentManifest === serializeScaffoldManifest(manifest)) {
      await fs.rm(manifestPath, { force: true });
    }
    return projectFailure(
      plan.projectDir,
      "The project changed while the baseline was being written. The new manifest was removed.",
    );
  }

  return {
    ...plan,
    mode: "adopted",
    adopted: true,
    manifest: {
      version: manifest.version,
      provenanceState: "adopted-unverified",
      fileCount: Object.keys(manifest.hashes).length,
    },
  };
}
