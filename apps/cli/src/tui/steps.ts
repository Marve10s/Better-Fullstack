import type { Ecosystem } from "@/types";

import {
  CONFIG_SCOPE_ALWAYS_KEYS,
  CONFIG_SCOPE_REGISTRY,
  type ConfigScope,
} from "@/prompts/core/config-scope";

export type StepStatus = "decided" | "current" | "remaining" | "defaults";

export type RailStep = {
  id: string;
  label: string;
  status: StepStatus;
};

type StepDefinition = {
  id: string;
  label: string;
  keys: readonly string[];
  sectionId?: string;
};

export type StepContext = {
  ecosystem?: Ecosystem;
  scope?: ConfigScope;
  selectedSectionIds?: readonly string[];
  stepKey?: string;
  lastStepId?: string;
  reviewing?: boolean;
};

function stepDefinitions(ecosystem: Ecosystem): StepDefinition[] {
  const registry = CONFIG_SCOPE_REGISTRY[ecosystem];
  return [
    { id: "project", label: "Project", keys: ["projectName", "versionChannel"] },
    { id: "ecosystem", label: "Ecosystem", keys: ["compositionMode", "ecosystem"] },
    { id: "scope", label: "Scope", keys: ["configScope", "configSections"] },
    { id: "core", label: "Core stack", keys: registry.core },
    ...registry.sections.map((section) => ({
      id: section.id,
      label: section.label,
      keys: section.promptKeys,
      sectionId: section.id,
    })),
    { id: "finish", label: "Project setup", keys: CONFIG_SCOPE_ALWAYS_KEYS },
    { id: "review", label: "Review", keys: [] },
  ];
}

export function findStepId(context: StepContext): string {
  if (context.reviewing) return "review";
  const definitions = stepDefinitions(context.ecosystem ?? "typescript");
  const match = definitions.find((step) => context.stepKey && step.keys.includes(context.stepKey));
  return match?.id ?? context.lastStepId ?? "project";
}

function isSkippedSection(step: StepDefinition, context: StepContext): boolean {
  if (!step.sectionId || !context.scope || context.scope === "full") return false;
  if (context.scope === "core") return true;
  return !context.selectedSectionIds?.includes(step.sectionId);
}

export function buildRail(context: StepContext): RailStep[] {
  const definitions = stepDefinitions(context.ecosystem ?? "typescript");
  const currentId = findStepId(context);
  const currentIndex = definitions.findIndex((step) => step.id === currentId);
  return definitions.map((step, index) => ({
    id: step.id,
    label: step.label,
    status:
      index === currentIndex
        ? "current"
        : isSkippedSection(step, context)
          ? "defaults"
          : index < currentIndex
            ? "decided"
            : "remaining",
  }));
}
