import { describe, expect, it } from "bun:test";
import * as fc from "fast-check";

import {
  DATABASE_VALUES,
  SHADCN_BASE_COLOR_VALUES,
  SHADCN_BASE_VALUES,
  SHADCN_COLOR_THEME_VALUES,
  SHADCN_FONT_VALUES,
  SHADCN_ICON_LIBRARY_VALUES,
  SHADCN_RADIUS_VALUES,
  SHADCN_STYLE_VALUES,
  StackPartSchema,
} from "@/config/schemas";
import {
  formatStackPartSpec,
  legacyProjectConfigToStackParts,
  mergeProjectConfigSettingsIntoStackParts,
  parseStackPartSpecs,
  projectStackPartSettingsToProjectConfig,
  stackPartsToLegacyProjectConfigPartial,
} from "@/stack/stack-graph";
import {
  DEFAULT_STACK_SELECTION,
  cliInputToProjectConfigPartial,
  createStackSelectionSearchParams,
  generateStackSelectionCommand,
  parseStackSelectionFromUrlRecord,
  stackSelectionToProjectConfig,
} from "@/stack/stack-translation";

const shadcnSettingsArbitrary = fc.record({
  shadcnBase: fc.constantFrom(...SHADCN_BASE_VALUES),
  shadcnStyle: fc.constantFrom(...SHADCN_STYLE_VALUES),
  shadcnIconLibrary: fc.constantFrom(...SHADCN_ICON_LIBRARY_VALUES),
  shadcnColorTheme: fc.constantFrom(...SHADCN_COLOR_THEME_VALUES),
  shadcnBaseColor: fc.constantFrom(...SHADCN_BASE_COLOR_VALUES),
  shadcnFont: fc.constantFrom(...SHADCN_FONT_VALUES),
  shadcnRadius: fc.constantFrom(...SHADCN_RADIUS_VALUES),
});

const databaseArbitrary = fc.constantFrom(...DATABASE_VALUES.filter((value) => value !== "none"));

function selectedIdentity(parts: ReturnType<typeof parseStackPartSpecs>) {
  return parts
    .filter((part) => part.source !== "provided")
    .map((part) => ({
      id: part.id,
      ownerPartId: part.ownerPartId,
      role: part.role,
      ecosystem: part.ecosystem,
      toolId: part.toolId,
      settings: part.settings,
    }))
    .sort((left, right) => left.id.localeCompare(right.id));
}

describe("stack graph authority properties", () => {
  it("preserves every shadcn setting through schema and compatibility projections", () => {
    fc.assert(
      fc.property(shadcnSettingsArbitrary, (settings) => {
        const parts = legacyProjectConfigToStackParts({
          ecosystem: "typescript",
          frontend: ["next"],
          backend: "none",
          database: "none",
          orm: "none",
          api: "none",
          auth: "none",
          uiLibrary: "shadcn-ui",
          ...settings,
        });
        const schemaParts = StackPartSchema.array().parse(
          JSON.parse(JSON.stringify(parts)) as unknown,
        );
        const lowered = stackPartsToLegacyProjectConfigPartial(schemaParts);
        const reimported = legacyProjectConfigToStackParts(lowered);

        expect(projectStackPartSettingsToProjectConfig(schemaParts)).toEqual(settings);
        expect(projectStackPartSettingsToProjectConfig(reimported)).toEqual(settings);
      }),
      { numRuns: 100 },
    );
  });

  it("preserves named service ownership and service-scoped databases", () => {
    fc.assert(
      fc.property(databaseArbitrary, databaseArbitrary, (apiDatabase, adminDatabase) => {
        const parts = parseStackPartSpecs([
          "backend:go:gin:api",
          "backend:go:echo:admin",
          `api.database:universal:${apiDatabase}`,
          `admin.database:universal:${adminDatabase}`,
          "api.orm:go:gorm",
          "admin.orm:go:sqlc",
        ]);
        const schemaParts = StackPartSchema.array().parse(parts);
        const specs = schemaParts.map((part) => formatStackPartSpec(part, schemaParts));
        const reparsed = parseStackPartSpecs(specs);

        expect(selectedIdentity(reparsed)).toEqual(selectedIdentity(schemaParts));
        expect(reparsed.find((part) => part.id.startsWith("api.database"))?.ownerPartId).toBe(
          "api",
        );
        expect(reparsed.find((part) => part.id.startsWith("admin.database"))?.ownerPartId).toBe(
          "admin",
        );
      }),
      { numRuns: 100 },
    );
  });

  it("preserves web, mobile, services, settings, and replacements through URL and command replay", () => {
    fc.assert(
      fc.property(
        shadcnSettingsArbitrary,
        databaseArbitrary,
        databaseArbitrary,
        (settings, apiDatabase, adminDatabase) => {
          const selection = {
            ...DEFAULT_STACK_SELECTION,
            stackMode: "multi" as const,
            projectName: "property-app",
            database: "none" as const,
            stackPartSpecs: [
              "frontend:typescript:next",
              "frontend.ui:typescript:shadcn-ui",
              "mobile:react-native:native-bare",
              "mobile.navigation:react-native:expo-router",
              "backend:go:gin:api",
              "backend:go:echo:admin",
              `api.database:universal:${apiDatabase}`,
              `admin.database:universal:${adminDatabase}`,
            ],
            ...settings,
          };
          const params = createStackSelectionSearchParams(selection, { includeDefaults: true });
          const parsedSelection = parseStackSelectionFromUrlRecord(
            Object.fromEntries(params.entries()),
          );
          const config = stackSelectionToProjectConfig(parsedSelection, {
            projectDir: "/virtual/property-app",
            relativePath: "property-app",
          });
          const command = generateStackSelectionCommand(parsedSelection);
          const commandParts = [...command.matchAll(/--part\s+(\S+)/g)].map((match) => match[1]!);
          const replayed = cliInputToProjectConfigPartial({
            part: commandParts,
            ...settings,
          });

          expect(parsedSelection).toEqual(selection);
          expect(config.stackParts?.some((part) => part.role === "frontend")).toBe(true);
          expect(config.stackParts?.some((part) => part.role === "mobile")).toBe(true);
          expect(config.stackParts?.filter((part) => part.role === "backend")).toHaveLength(2);
          expect(projectStackPartSettingsToProjectConfig(config.stackParts ?? [])).toMatchObject(
            settings,
          );
          expect(
            replayed.stackParts
              ?.filter((part) => part.role === "database")
              .map((part) => ({
                ownerPartId: part.ownerPartId,
                toolId: part.toolId,
              })),
          ).toEqual([
            { ownerPartId: "api", toolId: apiDatabase },
            { ownerPartId: "admin", toolId: adminDatabase },
          ]);

          const replacementParts = parseStackPartSpecs(
            commandParts.map((spec) =>
              spec === "frontend.ui:typescript:shadcn-ui" ? "frontend.ui:typescript:daisyui" : spec,
            ),
          );
          const replacement = mergeProjectConfigSettingsIntoStackParts(replacementParts, settings);
          expect(replacement.find((part) => part.role === "ui")?.toolId).toBe("daisyui");
          expect(replacement.find((part) => part.role === "ui")?.settings).toBeUndefined();
        },
      ),
      { numRuns: 100 },
    );
  });
});
