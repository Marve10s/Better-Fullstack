import { expect, it } from "bun:test";

it("backfill removes every aggregate singleton row before rebuilding", async () => {
  const source = await Bun.file("packages/backend/convex/analytics.ts").text();

  expect(source).toContain(
    'for (const existing of await ctx.db.query("analyticsStats").collect())',
  );
  expect(source).toContain('await ctx.db.delete("analyticsStats", existing._id)');
});
