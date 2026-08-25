import { log } from "@clack/prompts";
import path from "node:path";
import pc from "picocolors";

import {
  checkRecipeRecords,
  getRecipeHistory,
  type RecipeCheck,
  type RecipeHistoryEntry,
} from "@/recipes/records";

export type RecipesCommandInput = {
  action: "check" | "history";
  name?: string;
  dir?: string;
  json?: boolean;
};

export type RecipesCommandResult =
  | {
      schemaVersion: 1;
      action: "check";
      success: boolean;
      recipes: RecipeCheck[];
    }
  | {
      schemaVersion: 1;
      action: "history";
      success: true;
      recipes: RecipeHistoryEntry[];
    };

export async function getRecipesResult(input: RecipesCommandInput): Promise<RecipesCommandResult> {
  const projectDir = path.resolve(input.dir || process.cwd());
  if (input.action === "check") {
    const recipes = await checkRecipeRecords(projectDir, input.name);
    return {
      schemaVersion: 1,
      action: "check",
      success: recipes.length > 0 && recipes.every((recipe) => recipe.ok),
      recipes,
    };
  }
  return {
    schemaVersion: 1,
    action: "history",
    success: true,
    recipes: await getRecipeHistory(projectDir),
  };
}

function reportRecipes(result: RecipesCommandResult): void {
  if (result.recipes.length === 0) {
    log.warn(pc.yellow("No recipe records found."));
    return;
  }
  if (result.action === "check") {
    for (const recipe of result.recipes) {
      log.message(`${recipe.ok ? pc.green("pass") : pc.red("fail")} ${recipe.recipeId}`);
      for (const check of recipe.checks.filter((entry) => entry.status === "fail")) {
        log.warn(pc.yellow(`  ${check.path ?? check.id}: ${check.message}`));
      }
    }
    return;
  }
  for (const recipe of result.recipes) {
    log.message(`${pc.cyan(recipe.recipeId)}: ${recipe.recoveryPoints.length} recovery point(s)`);
    for (const point of recipe.recoveryPoints) {
      log.message(pc.dim(`  ${point.id} ${point.status ?? "unknown"}`));
    }
  }
}

export async function recipesCommand(input: RecipesCommandInput): Promise<RecipesCommandResult> {
  const result = await getRecipesResult(input);
  if (input.json) console.log(JSON.stringify(result, null, 2));
  else reportRecipes(result);
  return result;
}
