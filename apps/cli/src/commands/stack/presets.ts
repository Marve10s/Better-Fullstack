import {
  getPreset,
  getPresetEcosystem,
  getPresetVariants,
  PRESET_DEFINITIONS,
  validatePresetOptions,
  type PresetDefinition,
  type PresetOptionSelection,
} from "@better-fullstack/types";

import { getTemplateConfig } from "@/config/templates";

function describeOptions(preset: PresetDefinition) {
  return (preset.options ?? []).map((option) => ({
    id: option.id,
    name: option.name,
    default: option.choices[0].id,
    choices: option.choices.map(({ id, name, description }) => ({ id, name, description })),
  }));
}

export function listPresets() {
  return PRESET_DEFINITIONS.map((preset) => ({
    id: preset.id,
    name: preset.name,
    description: preset.description,
    category: preset.category,
    ecosystem: getPresetEcosystem(preset),
    options: describeOptions(preset),
    variants: getPresetVariants(preset).map((options) => ({
      options,
      stack: getTemplateConfig(preset.id, options),
    })),
  }));
}

export type PresetRequest =
  | { ok: true; preset: PresetDefinition; options: PresetOptionSelection }
  | { ok: false; message: string };

export function resolvePresetRequest(id: string, options: PresetOptionSelection): PresetRequest {
  const preset = getPreset(id);
  if (!preset) {
    const ids = PRESET_DEFINITIONS.map((candidate) => candidate.id).join(", ");
    return { ok: false, message: `Unknown preset '${id}'. Available presets: ${ids}.` };
  }
  const error = validatePresetOptions(preset, options);
  return error ? { ok: false, message: error } : { ok: true, preset, options };
}
