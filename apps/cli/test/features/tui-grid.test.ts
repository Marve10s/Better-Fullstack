import { describe, expect, test } from "bun:test";

import { firstVisibleOption, planOptionGrid } from "@/tui/grid";

const roomy = {
  labelWidth: 20,
  iconStyle: "image",
  multi: false,
  panelWidth: 49,
  fullWidth: 95,
  height: 21,
  hub: true,
} as const;

describe("option grid planning", () => {
  test("short lists stay a described list beside the hub", () => {
    const grid = planOptionGrid({ ...roomy, count: 5 });
    expect(grid).toMatchObject({ columns: 1, descriptions: true, hub: true, gap: 1 });
  });

  test("a list that fits two columns keeps the hub", () => {
    const grid = planOptionGrid({ ...roomy, count: 11, labelWidth: 12 });
    expect(grid).toMatchObject({ columns: 2, hub: true, gap: 1, descriptions: false });
  });

  test("18 frontends all show at once by taking the full width", () => {
    const grid = planOptionGrid({ ...roomy, count: 18, labelWidth: 25 });
    expect(grid.rows * grid.columns).toBeGreaterThanOrEqual(18);
    expect(grid).toMatchObject({ hub: false, itemHeight: 2, gap: 1 });
  });

  test("a short terminal drops to small icons before it drops the gap", () => {
    const small = planOptionGrid({ ...roomy, count: 12, height: 12, fullWidth: 75, hub: false });
    expect(small).toMatchObject({ itemHeight: 1, iconColumns: 2, gap: 1 });
    expect(small.rows * small.columns).toBeGreaterThanOrEqual(12);
  });

  test("the smallest supported terminal still shows all 18 by shortening labels", () => {
    const grid = planOptionGrid({
      ...roomy,
      count: 18,
      labelWidth: 25,
      iconStyle: "glyph",
      height: 10,
      fullWidth: 55,
      hub: false,
    });
    expect(grid.rows * grid.columns).toBeGreaterThanOrEqual(18);
  });

  test("when nothing fits it pages by column and keeps the cursor on screen", () => {
    const grid = planOptionGrid({ ...roomy, count: 60, height: 8, fullWidth: 55, hub: false });
    const visible = grid.rows * grid.columns;
    expect(visible).toBeLessThan(60);
    for (const cursor of [0, 17, 42, 59]) {
      const start = firstVisibleOption(grid, cursor, 60);
      expect(cursor).toBeGreaterThanOrEqual(start);
      expect(cursor).toBeLessThan(start + visible);
    }
  });
});
