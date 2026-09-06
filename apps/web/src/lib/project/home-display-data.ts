import { combinationsMetrics } from "#web/lib/builder/combinations-count";
import { ECOSYSTEMS, TECH_OPTIONS } from "#web/lib/stack/constant";

import type { TechCategory } from "@/lib/stack/types";

export { PACKAGE_MANAGER_COMMANDS } from "@better-fullstack/types";

export const HOME_COMBINATIONS_METRICS = {
  totalScientific: combinationsMetrics.totalScientific,
  yearsAtOneMillisecondScientific: combinationsMetrics.yearsAtOneMillisecondScientific,
  universeLifetimesScientific: combinationsMetrics.universeLifetimesScientific,
  universeSandRatioScientific: combinationsMetrics.universeSandRatioScientific,
};

function getOptions(categories: TechCategory[]) {
  const seen = new Set<string>();
  const results: { id: string; name: string }[] = [];

  for (const cat of categories) {
    for (const opt of TECH_OPTIONS[cat] ?? []) {
      if (!opt.legacy && opt.id !== "none" && !seen.has(opt.id)) {
        seen.add(opt.id);
        results.push({ id: opt.id, name: opt.name });
      }
    }
  }

  return results;
}

export const HOME_FEATURE_OPTIONS = {
  ecosystems: ECOSYSTEMS.map(({ id, name }) => ({ id, name })),
  frontend: getOptions(["webFrontend", "rustFrontend"]),
  backend: getOptions([
    "backend",
    "rustWebFramework",
    "pythonWebFramework",
    "goWebFramework",
    "javaWebFramework",
    "elixirWebFramework",
    "dotnetWebFramework",
  ]),
  orm: getOptions(["orm", "rustOrm", "pythonOrm", "goOrm", "javaOrm", "elixirOrm", "dotnetOrm"]),
  auth: getOptions([
    "auth",
    "rustAuth",
    "pythonAuth",
    "goAuth",
    "javaAuth",
    "elixirAuth",
    "dotnetAuth",
  ]),
  ai: getOptions(["ai", "pythonAi"]),
};
