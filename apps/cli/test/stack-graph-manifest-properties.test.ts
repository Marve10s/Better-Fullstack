import {
  BetterTStackConfigSchema,
  DATABASE_VALUES,
  SHADCN_BASE_COLOR_VALUES,
  SHADCN_BASE_VALUES,
  SHADCN_COLOR_THEME_VALUES,
  SHADCN_FONT_VALUES,
  SHADCN_ICON_LIBRARY_VALUES,
  SHADCN_RADIUS_VALUES,
  SHADCN_STYLE_VALUES,
  createCliDefaultProjectConfigBase,
  mergeProjectConfigSettingsIntoStackParts,
  parseStackPartSpecs,
  projectStackPartSettingsToProjectConfig,
  type ProjectConfig,
} from "@better-fullstack/types";
import { describe, expect, it } from "bun:test";

import { buildBtsConfigForPersistence } from "../src/utils/bts-config";

const DATABASE_OPTIONS = DATABASE_VALUES.filter((value) => value !== "none");

function projectConfig(overrides: Partial<ProjectConfig>): ProjectConfig {
  return {
    ...createCliDefaultProjectConfigBase("bun"),
    projectName: "manifest-property-app",
    projectDir: "/virtual/manifest-property-app",
    relativePath: "manifest-property-app",
    ...overrides,
  };
}

describe("stack graph manifest properties", () => {
  it("keeps graph settings and multi-owner bindings authoritative after manifest schema reload", () => {
    for (let index = 0; index < 100; index += 1) {
      const settings = {
        shadcnBase: SHADCN_BASE_VALUES[index % SHADCN_BASE_VALUES.length]!,
        shadcnStyle: SHADCN_STYLE_VALUES[index % SHADCN_STYLE_VALUES.length]!,
        shadcnIconLibrary: SHADCN_ICON_LIBRARY_VALUES[index % SHADCN_ICON_LIBRARY_VALUES.length]!,
        shadcnColorTheme: SHADCN_COLOR_THEME_VALUES[index % SHADCN_COLOR_THEME_VALUES.length]!,
        shadcnBaseColor: SHADCN_BASE_COLOR_VALUES[index % SHADCN_BASE_COLOR_VALUES.length]!,
        shadcnFont: SHADCN_FONT_VALUES[index % SHADCN_FONT_VALUES.length]!,
        shadcnRadius: SHADCN_RADIUS_VALUES[index % SHADCN_RADIUS_VALUES.length]!,
      };
      const apiDatabase = DATABASE_OPTIONS[index % DATABASE_OPTIONS.length]!;
      const adminDatabase = DATABASE_OPTIONS[(index + 1) % DATABASE_OPTIONS.length]!;
      const stackParts = mergeProjectConfigSettingsIntoStackParts(
        parseStackPartSpecs([
          "frontend:typescript:next",
          "frontend.ui:typescript:shadcn-ui",
          "mobile:react-native:native-bare",
          "backend:go:gin:api",
          "backend:go:echo:admin",
          `api.database:universal:${apiDatabase}`,
          `admin.database:universal:${adminDatabase}`,
        ]),
        settings,
      );
      const manifest = buildBtsConfigForPersistence(
        projectConfig({
          stackParts,
          shadcnBase: "radix",
          shadcnStyle: "nova",
          shadcnIconLibrary: "lucide",
          shadcnColorTheme: "neutral",
          shadcnBaseColor: "neutral",
          shadcnFont: "inter",
          shadcnRadius: "default",
        }),
        { version: "2.6.1", createdAt: "2026-08-23T00:00:00.000Z" },
      );
      const reloaded = BetterTStackConfigSchema.parse(
        JSON.parse(JSON.stringify(manifest)) as unknown,
      );
      const selectedParts = reloaded.stackParts?.filter((part) => part.source !== "provided");

      expect(projectStackPartSettingsToProjectConfig(selectedParts ?? [])).toMatchObject(settings);
      expect(reloaded).toMatchObject(settings);
      expect(
        selectedParts
          ?.filter((part) => part.role === "database")
          .map((part) => ({ ownerPartId: part.ownerPartId, toolId: part.toolId })),
      ).toEqual([
        { ownerPartId: "api", toolId: apiDatabase },
        { ownerPartId: "admin", toolId: adminDatabase },
      ]);
      expect(selectedParts?.some((part) => part.role === "frontend")).toBe(true);
      expect(selectedParts?.some((part) => part.role === "mobile")).toBe(true);
      expect(selectedParts?.filter((part) => part.role === "backend")).toHaveLength(2);
    }
  });
});
