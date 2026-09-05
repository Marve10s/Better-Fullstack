import type { Plugin } from "vite";

import { fileURLToPath } from "node:url";

import * as homeFeatures from "#web/lib/project/home-display-data";
import * as projectStats from "#web/lib/project/project-stats";

const staticModules = new Map(
  (
    [
      ["project-stats", projectStats],
      ["home-display-data", homeFeatures],
    ] as const
  ).map(
    ([name, values]) =>
      [fileURLToPath(new URL(`../src/lib/project/${name}.ts`, import.meta.url)), values] as const,
  ),
);

// Marketing pages need display data, not the catalogs and results used to calculate it.
export function projectStatsPlugin(): Plugin {
  return {
    name: "better-fullstack:project-stats",
    load(id) {
      const values = staticModules.get(id);
      if (!values) return;
      return Object.entries(values)
        .map(([name, value]) => `export const ${name} = ${JSON.stringify(value)};`)
        .join("\n");
    },
  };
}
