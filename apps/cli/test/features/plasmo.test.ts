import { describe, expect, it } from "bun:test";

import { validateAddonCompatibility } from "@/config/compatibility-rules";
import { validateConfigForProgrammaticUse, validateFullConfig } from "@/config/config-validation";
import { getCompatibleAddonsForPrompt, getCompatibleSelections } from "@/prompts/developer/addons";
import { cliInputToProjectConfigPartial, type ProjectConfig } from "@/types";

const recipe = {
  ecosystem: "typescript",
  backend: "none",
  runtime: "none",
  frontend: ["react-vite"],
  addons: ["plasmo"],
  database: "none",
  orm: "none",
  api: "none",
  auth: "none",
  examples: [],
  forms: "none",
  workspaceShape: "monorepo",
} satisfies Partial<ProjectConfig>;

const context = { frontends: recipe.frontend, existing: [], config: recipe, additionsOnly: true };

describe("Plasmo CLI recipe", () => {
  it("routes app platforms using each capability's owner metadata", () => {
    expect(getCompatibleSelections("appPlatforms", { ...context, ownerRole: "root" }, []).map((option) => option.id)).toContain("plasmo");
    expect(getCompatibleSelections("appPlatforms", { ...context, ownerRole: "frontend" }, []).map((option) => option.id)).not.toContain("plasmo");
    expect(getCompatibleSelections("appPlatforms", { ...context, ownerRole: "root" }, []).map((option) => option.id)).not.toContain("pwa");
    expect(getCompatibleAddonsForPrompt(["plasmo"], recipe.frontend, ["wxt"], "none", "none", "none", "none", recipe)).toEqual([]);
    expect(getCompatibleSelections("appPlatforms", context, ["wxt"]).map((option) => option.id)).not.toContain("plasmo");
  });

  it("rejects unsupported layouts and collisions through both validation entrypoints", () => {
    for (const override of [{ workspaceShape: "single-app" }, { addons: ["wxt", "plasmo"] }] satisfies Partial<ProjectConfig>[]) {
      expect(() => validateFullConfig({ ...recipe, ...override }, new Set(["addons", "workspaceShape"]), {})).toThrow();
      expect(() => validateConfigForProgrammaticUse({ ...recipe, ...override })).toThrow();
    }
    expect(validateAddonCompatibility("plasmo", [], "none", "none", "none", "go").isCompatible).toBe(false);
  });

  it("validates a mixed graph independently of the native backend's projection", () => {
    const selected = cliInputToProjectConfigPartial({ part: ["frontend:typescript:react-vite:site", "backend:go:gin:api", "appPlatform:typescript:plasmo"] });
    expect(() => validateConfigForProgrammaticUse({ ...recipe, ...selected, addons: ["plasmo"] })).not.toThrow();
    expect(getCompatibleAddonsForPrompt(["plasmo"], ["react-vite"], [], "none", "none", "none", "none", selected)).toEqual(["plasmo"]);
  });
});
