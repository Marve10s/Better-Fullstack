import { GOLDEN_RUNTIME_RECIPES, type GoldenRuntimeAssertion } from "@better-fullstack/types";

export type GeneratedProjectProofCase = {
  id: string;
  ecosystem:
    | "typescript"
    | "react-native"
    | "rust"
    | "python"
    | "go"
    | "java"
    | "elixir"
    | "dotnet";
  claim: string;
  preset?: string;
  projectName: string;
  flags?: readonly string[];
  requiredToolchains: string[];
  requiredSteps: string[];
  stackParts: string[];
  runtime: GoldenRuntimeAssertion;
  definitionVersion: number;
  maintainer: string;
};

export const GENERATED_PROJECT_PROOF_CASES: readonly GeneratedProjectProofCase[] =
  GOLDEN_RUNTIME_RECIPES.map((recipe) => ({
    id: recipe.id,
    ecosystem: recipe.id,
    claim: `${recipe.name} installs, builds, and passes ${recipe.runtime.name}`,
    ...("preset" in recipe.generationInputs
      ? { preset: recipe.generationInputs.preset }
      : { flags: recipe.generationInputs.flags }),
    projectName: recipe.projectName,
    requiredToolchains: [...recipe.requiredToolchains],
    requiredSteps: [...recipe.buildSteps, "runtime"],
    stackParts: [...recipe.stackParts],
    runtime: recipe.runtime,
    definitionVersion: recipe.definitionVersion,
    maintainer: recipe.maintainer,
  }));

export type GeneratedProjectProofStep = {
  step: string;
  success: boolean;
  skipped?: boolean;
};

export function missingRequiredSteps(
  expected: readonly string[],
  actual: readonly GeneratedProjectProofStep[],
): string[] {
  const byName = new Map(actual.map((step) => [step.step, step]));
  return expected.filter((name) => {
    const step = byName.get(name);
    return !step || step.skipped === true || step.success !== true;
  });
}

export function hasEligibleEvidenceIdentity(
  gitHead: string,
  workspaceCleanAtStart: boolean,
  workspaceCleanAfter: boolean,
): boolean {
  return (
    /^[0-9a-f]{40}$/i.test(gitHead) &&
    workspaceCleanAtStart === true &&
    workspaceCleanAfter === true
  );
}
