import { describe, expect, it } from "bun:test";

import { getDisabledReason } from "../src/components/stack-builder/utils";
import {
  DEFAULT_STACK,
  ECOSYSTEMS,
  PRESET_CATEGORIES,
  PRESET_TEMPLATES,
  type StackState,
} from "../src/lib/constant";
import { generateStackCommand } from "../src/lib/stack-utils";

const DOTNET_PRESET_CHECK_CATEGORIES = [
  "dotnetWebFramework",
  "dotnetOrm",
  "dotnetAuth",
  "dotnetApi",
  "dotnetTesting",
  "dotnetJobQueue",
  "dotnetRealtime",
  "dotnetObservability",
  "dotnetCaching",
  "dotnetDeploy",
] as const;

describe(".NET Ecosystem Tab", () => {
  it("exposes .NET as a preset category", () => {
    const dotnetEcosystem = ECOSYSTEMS.find((ecosystem) => ecosystem.id === "dotnet");
    const dotnetPresetCategory = PRESET_CATEGORIES.find((category) => category.id === "dotnet");

    expect(dotnetEcosystem).toBeDefined();
    expect(dotnetEcosystem?.name).toBe(".NET");
    expect(dotnetPresetCategory).toBeDefined();
    expect(dotnetPresetCategory?.icon).toBe("dotnet");
  });

  it("defines .NET presets for minimal API, GraphQL, and worker apps", () => {
    const dotnetPresets = PRESET_TEMPLATES.filter((preset) => preset.category === "dotnet");

    expect(dotnetPresets.map((preset) => preset.id)).toEqual([
      "dotnet-minimal-api",
      "dotnet-graphql",
      "dotnet-worker",
    ]);
  });

  it("keeps .NET presets compatible with their selected stack options", () => {
    const dotnetPresets = PRESET_TEMPLATES.filter((preset) => preset.category === "dotnet");

    for (const preset of dotnetPresets) {
      const stack = { ...DEFAULT_STACK, ...preset.stack } as StackState;

      for (const category of DOTNET_PRESET_CHECK_CATEGORIES) {
        const selection = stack[category];
        const optionIds = Array.isArray(selection) ? selection : [selection];

        for (const optionId of optionIds) {
          expect(getDisabledReason(stack, category, optionId)).toBeNull();
        }
      }
    }
  });

  it("serializes .NET presets into ecosystem-specific commands", () => {
    const minimalApi = PRESET_TEMPLATES.find((preset) => preset.id === "dotnet-minimal-api");
    const stack = { ...DEFAULT_STACK, ...minimalApi?.stack } as StackState;
    const command = generateStackCommand(stack);

    expect(command).toContain("--ecosystem dotnet");
    expect(command).toContain("--dotnet-web-framework aspnet-minimal");
    expect(command).toContain("--dotnet-realtime signalr");
  });
});
