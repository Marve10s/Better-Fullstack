import { describe, expect, it } from "bun:test";

import { getDisabledReason } from "@/components/stack-builder/utils";
import {
  DEFAULT_STACK,
  ECOSYSTEMS,
  PRESET_CATEGORIES,
  PRESET_TEMPLATES,
  type StackState,
} from "@/lib/stack/constant";
import { generateStackCommand } from "@/lib/stack/stack-utils";

const ELIXIR_PRESET_CHECK_CATEGORIES = [
  "elixirWebFramework",
  "elixirOrm",
  "elixirAuth",
  "elixirApi",
  "elixirRealtime",
  "elixirJobs",
  "elixirValidation",
  "elixirHttp",
  "elixirJson",
  "elixirEmail",
  "elixirCaching",
  "elixirObservability",
  "elixirTesting",
  "elixirQuality",
  "elixirI18n",
  "elixirHttpServer",
  "elixirApplicationFramework",
  "elixirDocumentation",
  "elixirClustering",
  "elixirDeploy",
] as const;

describe("Elixir Ecosystem Tab", () => {
  it("exposes Elixir as a preset category", () => {
    const elixirEcosystem = ECOSYSTEMS.find((ecosystem) => ecosystem.id === "elixir");
    const elixirPresetCategory = PRESET_CATEGORIES.find((category) => category.id === "elixir");

    expect(elixirEcosystem).toBeDefined();
    expect(elixirEcosystem?.name).toBe("Elixir");
    expect(elixirPresetCategory).toBeDefined();
    expect(elixirPresetCategory?.icon).toBe("phoenix");
  });

  it("defines Elixir presets for Phoenix, LiveView, and plain Mix apps", () => {
    const elixirPresets = PRESET_TEMPLATES.filter((preset) => preset.category === "elixir");

    expect(elixirPresets.map((preset) => preset.id)).toEqual([
      "elixir-phoenix-api",
      "elixir-liveview-full",
      "elixir-plain-worker",
    ]);
  });

  it("keeps Elixir presets compatible with their selected stack options", () => {
    const elixirPresets = PRESET_TEMPLATES.filter((preset) => preset.category === "elixir");

    for (const preset of elixirPresets) {
      const stack = { ...DEFAULT_STACK, ...preset.stack } as StackState;

      for (const category of ELIXIR_PRESET_CHECK_CATEGORIES) {
        const optionId = stack[category];
        expect(getDisabledReason(stack, category, optionId)).toBeNull();
      }
    }
  });

  it("serializes Elixir presets into ecosystem-specific commands", () => {
    const plainWorker = PRESET_TEMPLATES.find((preset) => preset.id === "elixir-plain-worker");
    const stack = { ...DEFAULT_STACK, ...plainWorker?.stack } as StackState;
    const command = generateStackCommand(stack);

    expect(command).toContain("--ecosystem elixir");
    expect(command).toContain("--elixir-web-framework none");
    expect(command).toContain("--elixir-jobs quantum");
  });
});
