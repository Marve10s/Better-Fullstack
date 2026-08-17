import { describe, expect, it } from "bun:test";
import {
  ECOSYSTEM_VALUES,
  getCategoryOrderForEcosystem,
  type Ecosystem,
} from "@better-fullstack/types";

import {
  getBuilderSections,
  SECTION_EMBEDDED_CATEGORIES,
  SECTIONS_BY_ECOSYSTEM,
} from "../src/components/stack-builder/section-groups";
import { GRAPH_COMMON_CATEGORY_ORDER } from "../src/components/stack-builder/utils";
import { TECH_OPTIONS } from "../src/lib/constant";

const ecosystems = Object.keys(SECTIONS_BY_ECOSYSTEM) as Ecosystem[];

describe("builder section groups", () => {
  it("covers every ecosystem", () => {
    expect(new Set(ecosystems)).toEqual(new Set(ECOSYSTEM_VALUES));
  });

  for (const ecosystem of ecosystems) {
    const defs = SECTIONS_BY_ECOSYSTEM[ecosystem];
    const order = getCategoryOrderForEcosystem(ecosystem);

    it(`${ecosystem}: claims every category in the ecosystem order exactly once`, () => {
      const claimed = defs.flatMap((def) => def.categories);
      expect(new Set(claimed).size).toBe(claimed.length);

      const unclaimed = order.filter(
        (category) =>
          !claimed.includes(category) && !SECTION_EMBEDDED_CATEGORIES.has(category),
      );
      expect(unclaimed).toEqual([]);
    });

    it(`${ecosystem}: references only real categories with rendered options`, () => {
      for (const def of defs) {
        for (const category of def.categories) {
          expect(order).toContain(category);
          expect(TECH_OPTIONS[category as keyof typeof TECH_OPTIONS]).toBeDefined();
        }
      }
    });

    it(`${ecosystem}: uses unique section keys and non-empty names`, () => {
      const keys = defs.map((def) => def.key);
      expect(new Set(keys).size).toBe(keys.length);
      for (const def of defs) {
        expect(def.fallbackName.length).toBeGreaterThan(0);
      }
    });
  }

  it("multi-ecosystem common categories are fully claimed by the TypeScript sections", () => {
    const sections = getBuilderSections("typescript", GRAPH_COMMON_CATEGORY_ORDER);
    const knownKeys = new Set(SECTIONS_BY_ECOSYSTEM.typescript.map((def) => def.key));
    for (const section of sections) {
      expect(knownKeys.has(section.key)).toBe(true);
    }
  });

  it("falls back to a single-category section for unmapped categories", () => {
    const sections = getBuilderSections("typescript", ["webFrontend", "nativeFrontend"]);
    const fallback = sections.find((section) => section.key === "nativeFrontend");
    expect(fallback?.categories).toEqual(["nativeFrontend"]);
  });
});
