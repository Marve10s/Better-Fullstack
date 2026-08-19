import { expect, it } from "bun:test";

/**
 * The backfill replays the whole event log. Doing that inside one mutation hits
 * Convex's per-mutation read limit once `analyticsEvents` grows past a few
 * thousand rows, so the orchestration has to stay an action over bounded pages.
 */
it("backfill rebuilds aggregates across bounded pages rather than one mutation", async () => {
  const source = await Bun.file("packages/backend/convex/analytics.ts").text();

  expect(source).toContain("export const backfillStats = internalAction(");
  expect(source).toContain("export const backfillPage = internalMutation(");
  expect(source).toContain("export const sealAggregates = internalMutation(");
  expect(source).not.toContain("export const backfillStats = internalMutation(");
});
