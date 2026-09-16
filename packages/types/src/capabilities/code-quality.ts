import type { StackPart } from "@/config/types";

import { getToolingSelectionOptions } from "@/capabilities/tooling-capabilities";

export const SHADCN_LINT_FRONTENDS = [
  "next",
  "vinext",
  "tanstack-router",
  "tanstack-start",
  "react-router",
  "react-vite",
] as const;

const BASE_PROFILES = getToolingSelectionOptions("codeQuality").filter(
  (profile) => profile.toolIds.length > 0 && profile.id !== "shadcn-lint",
);
const BASE_TOOLS = new Set(BASE_PROFILES.flatMap((profile) => profile.toolIds));

const supportsDesignLint = (toolIds: readonly string[]) =>
  toolIds.includes("oxlint") || (toolIds.includes("eslint") && toolIds.includes("prettier"));

/** Complete the first base profile when repairing a shared builder selection. */
export function normalizeCodeQualityProfiles(toolIds: readonly string[]) {
  const firstBaseTool = toolIds.find((toolId) => BASE_TOOLS.has(toolId));
  const profile = BASE_PROFILES.find((candidate) =>
    candidate.toolIds.includes(firstBaseTool ?? ""),
  );
  if (!profile) return [...toolIds];
  return [
    ...toolIds.filter((toolId) => !BASE_TOOLS.has(toolId) || profile.toolIds.includes(toolId)),
    ...profile.toolIds.filter((toolId) => !toolIds.includes(toolId)),
  ];
}

export function getCodeQualitySelectionIssue(toolIds: readonly string[]): string | undefined {
  const profiles = BASE_PROFILES.filter((profile) =>
    profile.toolIds.some((toolId) => toolIds.includes(toolId)),
  );
  if (profiles.length > 1) {
    return "Choose one Code Quality profile; only shadcn/lint can accompany ESLint or Oxlint.";
  }
  const profile = profiles[0];
  if (profile && !profile.toolIds.every((toolId) => toolIds.includes(toolId))) {
    return `Choose the complete ${profile.label} Code Quality profile.`;
  }
  if (toolIds.includes("shadcn-lint") && !supportsDesignLint(toolIds)) {
    return "shadcn/lint requires ESLint + Prettier or Oxlint + Oxfmt as the Code Quality profile.";
  }
}

/** Base requests replace the profile; requesting only the supplement is additive. */
export function getReplacedCodeQualityTools(requested: readonly string[]) {
  if (!requested.some((toolId) => BASE_TOOLS.has(toolId))) return [];
  return supportsDesignLint(requested) ? [...BASE_TOOLS] : [...BASE_TOOLS, "shadcn-lint"];
}

export function getShadcnLintFrontendIssue(frontends: readonly string[], cssFramework?: string) {
  if (
    !frontends.some((frontend) => SHADCN_LINT_FRONTENDS.some((supported) => supported === frontend))
  ) {
    return "shadcn/lint requires a React web frontend: Next.js, Vinext, TanStack Router/Start, React Router, or React + Vite.";
  }
  if (cssFramework !== "tailwind") return "shadcn/lint requires Tailwind CSS v4.";
}

/** Toggle the supplemental check while replacing, or clearing, the base profile. */
export function updateCodeQualitySelection(
  current: readonly string[],
  optionToolIds: readonly string[],
) {
  const isQualityTool = (id: string) => BASE_TOOLS.has(id) || id === "shadcn-lint";
  const unrelated = current.filter((id) => !isQualityTool(id));
  if (optionToolIds.length === 0) return unrelated;
  if (optionToolIds.includes("shadcn-lint")) {
    return current.includes("shadcn-lint")
      ? current.filter((id) => id !== "shadcn-lint")
      : [...current, "shadcn-lint"];
  }
  if (optionToolIds.every((id) => current.includes(id))) return unrelated;
  const next = [...unrelated, ...optionToolIds];
  if (current.includes("shadcn-lint") && supportsDesignLint(optionToolIds)) {
    next.push("shadcn-lint");
  }
  return next;
}

export function getShadcnLintGraphFrontendIssue(parts: readonly StackPart[]) {
  const frontends = parts.filter((part) => part.role === "frontend");
  const reactFrontends = frontends.filter((part) =>
    SHADCN_LINT_FRONTENDS.some((toolId) => toolId === part.toolId),
  );
  if (!reactFrontends.length)
    return getShadcnLintFrontendIssue(frontends.map((part) => part.toolId));
  for (const frontend of reactFrontends) {
    const css = parts.find((part) => part.role === "css" && part.ownerPartId === frontend.id);
    const issue = getShadcnLintFrontendIssue([frontend.toolId], css?.toolId);
    if (issue) return issue;
  }
}
