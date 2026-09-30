import {
  applyPresetOptions,
  DEFAULT_STACK_SELECTION,
  getPreset,
  normalizeStackSelection,
  stackSelectionToProjectConfig,
  type PresetOptionSelection,
} from "@better-fullstack/types";

import type { CreateInput, Template } from "@/types";

import { projectConfigToCreateInput } from "@/config/config-source";

export function getTemplateConfig(
  template: Template,
  options: PresetOptionSelection = {},
): Partial<CreateInput> | null {
  if (template === "none") return null;

  const preset = getPreset(template);
  if (!preset) {
    throw new Error(`Unknown template: ${template}`);
  }

  const selection = normalizeStackSelection({
    ...DEFAULT_STACK_SELECTION,
    ...applyPresetOptions(preset, options),
  });
  const config = stackSelectionToProjectConfig(selection, {
    projectDir: `/${selection.projectName ?? "my-app"}`,
    relativePath: selection.projectName ?? "my-app",
  });
  return projectConfigToCreateInput(config);
}

export function getTemplateDescription(template: Template) {
  if (template === "none") return "No template - Full customization";
  const preset = getPreset(template);
  return preset ? `${preset.name} - ${preset.description}` : "";
}
