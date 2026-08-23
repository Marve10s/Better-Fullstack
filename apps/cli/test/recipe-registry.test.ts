import { describe, expect, it } from "bun:test";

import type { RecipeAdapter } from "../src/recipes/types";

import { RECIPE_ADAPTERS, validateRecipeAdapterRegistry } from "../src/recipes/registry";

describe("recipe adapter registry", () => {
  it("requires unique adapters with a maintainer, demand evidence, and a golden recipe", () => {
    expect(validateRecipeAdapterRegistry()).toEqual([]);
    const invalid: RecipeAdapter = {
      ...RECIPE_ADAPTERS[0]!,
      maintenanceOwner: "",
      demandEvidence: "",
      verificationRecipe: "",
    };
    expect(validateRecipeAdapterRegistry([invalid, invalid])).toEqual([
      expect.stringContaining("no verification maintainer"),
      expect.stringContaining("no golden verification recipe"),
      expect.stringContaining("no demand evidence"),
      expect.stringContaining("duplicated"),
      expect.stringContaining("no verification maintainer"),
      expect.stringContaining("no golden verification recipe"),
      expect.stringContaining("no demand evidence"),
    ]);
  });
});
