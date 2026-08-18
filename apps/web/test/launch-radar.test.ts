import { describe, expect, test } from "bun:test";

import { TECH_OPTIONS } from "../src/lib/constant";
import {
  hasSeenLaunchRadar,
  isLaunchRadarNewOption,
  LAUNCH_RADAR_GROUPS,
  LAUNCH_RADAR_TOTAL,
  markLaunchRadarSeen,
  NEW_OPTION_IDS_BY_CATEGORY,
} from "../src/lib/launch-radar";

function createStorage(initial: Record<string, string> = {}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => values.set(key, value),
  };
}

describe("launch radar release manifest", () => {
  test("tracks all 164 additions without count drift", () => {
    expect(LAUNCH_RADAR_TOTAL).toBe(164);
    expect(LAUNCH_RADAR_GROUPS.map((group) => [group.id, group.count])).toEqual([
      ["typescript", 43],
      ["rust", 20],
      ["python", 20],
      ["go", 20],
      ["java", 20],
      ["elixir", 21],
      ["dotnet", 20],
    ]);
  });

  test("only references options that exist in the builder", () => {
    const options = TECH_OPTIONS as Record<string, ReadonlyArray<{ id: string }>>;

    for (const [category, optionIds] of Object.entries(NEW_OPTION_IDS_BY_CATEGORY)) {
      const availableIds = new Set(options[category]?.map((option) => option.id) ?? []);
      for (const optionId of optionIds) {
        expect(availableIds.has(optionId), `${category}:${optionId}`).toBe(true);
        expect(isLaunchRadarNewOption(category, optionId)).toBe(true);
      }
    }

    expect(isLaunchRadarNewOption("webFrontend", "next")).toBe(false);
  });

  test("persists seen state per release", () => {
    const storage = createStorage();

    expect(hasSeenLaunchRadar(storage)).toBe(false);
    markLaunchRadarSeen(storage);
    expect(hasSeenLaunchRadar(storage)).toBe(true);
  });
});
