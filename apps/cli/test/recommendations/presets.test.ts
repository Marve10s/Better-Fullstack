import {
  getPresetEcosystem,
  getPresetVariants,
  PRESET_DEFINITIONS,
  type PresetOptionSelection,
} from "@better-fullstack/types";
import { SMOKE_DIR } from "@test/support/setup";
import { describe, expect, it } from "bun:test";
import { join } from "node:path";

import { getTemplateConfig } from "@/config/templates";
import { createProjectHandler } from "@/helpers/core/command-handlers";

const PRESET_VARIANTS = PRESET_DEFINITIONS.flatMap((preset) =>
  getPresetVariants(preset).map((options) => ({ preset, options })),
);

function variantName(presetId: string, options: PresetOptionSelection) {
  return [presetId, ...Object.values(options)].join("-");
}

describe("preset catalog", () => {
  it.each(PRESET_VARIANTS)("creates $preset.id $options in its own ecosystem", async (variant) => {
    const result = await createProjectHandler(
      {
        projectName: join(SMOKE_DIR, `preset-${variantName(variant.preset.id, variant.options)}`),
        template: variant.preset.id,
        presetOptions: variant.options,
        install: false,
        git: false,
        dryRun: true,
        directoryConflict: "overwrite",
        disableAnalytics: true,
      },
      { silent: true },
    );

    expect(result?.success ? "" : result?.error).toBe("");
    expect(result?.projectConfig.ecosystem).toBe(getPresetEcosystem(variant.preset));
  });

  it("resolves retired preset ids to their replacement", () => {
    expect(getTemplateConfig("solidstart-fullstack")).toEqual(getTemplateConfig("future-stack"));
    expect(getTemplateConfig("saas")).toEqual(getTemplateConfig("nextjs-saas"));
  });
});
