import type { RecipeAdapter, RecipeAdapterContext } from "@/recipes/types";

import {
  typescriptMemoryResourceAdapter,
  typescriptPersistentResourceAdapter,
} from "@/recipes/typescript-api-resource";

export const RECIPE_ADAPTERS: readonly RecipeAdapter[] = [
  typescriptPersistentResourceAdapter,
  typescriptMemoryResourceAdapter,
];

export function validateRecipeAdapterRegistry(
  adapters: readonly RecipeAdapter[] = RECIPE_ADAPTERS,
): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  for (const adapter of adapters) {
    if (ids.has(adapter.id)) errors.push(`Recipe adapter ID '${adapter.id}' is duplicated.`);
    ids.add(adapter.id);
    if (!adapter.maintenanceOwner.trim()) {
      errors.push(`Recipe adapter '${adapter.id}' has no verification maintainer.`);
    }
    if (!adapter.verificationRecipe.trim()) {
      errors.push(`Recipe adapter '${adapter.id}' has no golden verification recipe.`);
    }
    if (!adapter.demandEvidence.trim()) {
      errors.push(`Recipe adapter '${adapter.id}' has no demand evidence.`);
    }
  }
  return errors;
}

export function resolveRecipeAdapter(context: RecipeAdapterContext): {
  adapter: RecipeAdapter | null;
  reasons: string[];
} {
  const reasons: string[] = [];
  for (const adapter of RECIPE_ADAPTERS) {
    const support = adapter.supports(context);
    if (support.supported) return { adapter, reasons };
    reasons.push(`${adapter.id}: ${support.reason}`);
  }
  return { adapter: null, reasons };
}
