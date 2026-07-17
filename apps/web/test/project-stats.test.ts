import { describe, expect, it } from "bun:test";
import { readdir } from "node:fs/promises";
import path from "node:path";

import { ECOSYSTEM_VALUES, OPTION_CATEGORY_METADATA } from "@better-fullstack/types";

import { COMPETITOR_COMPARISONS } from "../src/lib/compare-tools";
import {
  COMPARISON_COUNTS,
  ECOSYSTEM_COUNT_LABEL,
  ECOSYSTEM_NAMES,
  OPTION_ENTRY_COUNT,
  PROJECT_ECOSYSTEM_COPY,
  SOFTWARE_APPLICATION_COUNTS,
} from "../src/lib/project-stats";

function countUniqueOptions(categoryMatches: (category: string) => boolean) {
  const optionIds = new Set<string>();

  for (const [category, metadata] of Object.entries(OPTION_CATEGORY_METADATA)) {
    if (!categoryMatches(category)) continue;
    for (const option of metadata.options) {
      if (option.id !== "none") optionIds.add(option.id);
    }
  }

  return optionIds.size;
}

describe("dynamic project statistics", () => {
  it("derives ecosystem and option totals from canonical metadata", () => {
    const expectedOptionCount = Object.values(OPTION_CATEGORY_METADATA).reduce(
      (sum, metadata) => sum + metadata.options.length,
      0,
    );

    expect(OPTION_ENTRY_COUNT).toBe(expectedOptionCount);
    expect(ECOSYSTEM_NAMES).toHaveLength(ECOSYSTEM_VALUES.length);
    expect(ECOSYSTEM_COUNT_LABEL).toBe(String(ECOSYSTEM_VALUES.length));
    expect(PROJECT_ECOSYSTEM_COPY.ecosystemCount).toBe(String(ECOSYSTEM_VALUES.length));
    expect(PROJECT_ECOSYSTEM_COPY.ecosystemSlugs.split(" · ")).toEqual(ECOSYSTEM_VALUES);
  });

  it("keeps comparison counts populated from selectable options", () => {
    expect(Object.values(COMPARISON_COUNTS).every((count) => count > 0)).toBe(true);
    expect(COMPARISON_COUNTS.databases).toBe(
      OPTION_CATEGORY_METADATA.database.options.filter((option) => option.id !== "none").length,
    );
  });

  it("does not describe supported Polar and Workers options as missing", () => {
    const betterTStack = COMPETITOR_COMPARISONS.find(
      (comparison) => comparison.slug === "better-t-stack",
    );
    const copy = JSON.stringify(betterTStack);

    expect(copy).not.toContain("Better Fullstack currently lacks, such as Polar payments");
    expect(copy).not.toContain("Better Fullstack currently lacks, such as Cloudflare Workers");
  });

  it("derives application frontend and backend counts across every ecosystem", () => {
    expect(SOFTWARE_APPLICATION_COUNTS.frontendFrameworks).toBe(
      countUniqueOptions((category) => category.endsWith("Frontend")),
    );
    expect(SOFTWARE_APPLICATION_COUNTS.backendFrameworks).toBe(
      countUniqueOptions(
        (category) => category === "backend" || category.endsWith("WebFramework"),
      ),
    );
  });

  it("requires every homepage locale to interpolate current ecosystem data", async () => {
    const messagesDir = path.resolve(import.meta.dir, "../messages");
    const messageFiles = (await readdir(messagesDir)).filter((file) => file.endsWith(".json"));

    await Promise.all(
      messageFiles.map(async (messageFile) => {
        const messages = (await Bun.file(path.join(messagesDir, messageFile)).json()) as Record<
          string,
          string
        >;

        expect(messages.homeHeroDescription).toContain("{ecosystemCount}");
        expect(messages.homeEcosystemCount).toContain("{ecosystemCount}");
        expect(messages.homeFeaturesDescription).toContain("{ecosystemCount}");
        expect(messages.homeFeaturesDescription).toContain("{ecosystemNames}");
        expect(messages.homeTotalOptions).toContain("{ecosystemCount}");
        expect(messages.homeTotalOptions).toContain("{ecosystemSlugs}");
        expect(messages.homeFactEcosystems).toContain("{ecosystemNames}");
        expect(messages.homeSevenEcosystems).toBeUndefined();
      }),
    );
  });
});
