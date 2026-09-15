import { expect, it } from "bun:test";

import { createEngagementClock, scrollPosition } from "@/lib/analytics/page-engagement";

it("counts foreground time across tab switches without charging hidden time", () => {
  const clock = createEngagementClock(100, true);
  clock.visibility(1100, false);
  expect(clock.snapshot(6100)).toEqual({ active_ms: 1000, elapsed_ms: 6000 });
  clock.visibility(10100, true);
  expect(clock.snapshot(11100)).toEqual({ active_ms: 2000, elapsed_ms: 11000 });
});

it("measures the builder's scrollable range and clamps overscroll", () => {
  expect(scrollPosition(500, 2000, 1000)).toEqual({
    scroll_px: 500,
    scroll_percent: 50,
    viewport_height: 1000,
  });
  expect(scrollPosition(-20, 2000, 1000).scroll_percent).toBe(0);
  expect(scrollPosition(1300, 2000, 1000).scroll_percent).toBe(100);
  expect(scrollPosition(0, 500, 1000).scroll_percent).toBe(100);
});
