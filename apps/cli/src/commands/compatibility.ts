import {
  formatCompatibilityDecision,
  getCompatibilityDecision,
  type CompatibilityCategory,
  type CompatibilityInput,
} from "@better-fullstack/types";

export function getCompatibilityExplanationResult(
  stack: CompatibilityInput,
  category: CompatibilityCategory,
  optionId: string,
) {
  const decision = getCompatibilityDecision(stack, category, optionId);

  return {
    schemaVersion: 1 as const,
    category,
    optionId,
    compatible: decision.reason === null,
    message: formatCompatibilityDecision(decision),
    explanation: decision.explanation,
  };
}
