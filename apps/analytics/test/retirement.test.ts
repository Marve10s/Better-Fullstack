import { describe, expect, test } from "bun:test";

const read = (path: string) => Bun.file(path).text();

describe("legacy analytics quarantine", () => {
  test("POST and OPTIONS remain explicit 410 tombstones without CORS or mutation access", async () => {
    const [ingest, router] = await Promise.all([
      read("apps/analytics/convex/ingest.ts"),
      read("apps/analytics/convex/http.ts"),
    ]);

    expect(ingest).toContain("status: 410");
    expect(ingest).toContain('"Cache-Control": "private, no-store"');
    expect(ingest).not.toContain("public, max-age");
    expect(ingest).not.toContain("Access-Control-Allow");
    expect(ingest).not.toContain("runMutation");
    expect(ingest).not.toContain("request.json");
    expect(router).toMatch(/path: "\/track",\s*method: "POST"/s);
    expect(router).toMatch(/path: "\/track",\s*method: "OPTIONS"/s);
  });

  test("legacy list and stats functions are internal-only", async () => {
    const events = await read("apps/analytics/convex/events.ts");

    expect(events).toContain("export const listProjectCreations = internalQuery(");
    expect(events).toContain("export const getStats = internalQuery(");
    expect(events).not.toContain("= query({");
    expect(events).not.toContain("internalMutation, query");
  });

  test("ownership docs prohibit reactivation and destructive cleanup", async () => {
    const [readme, ownership] = await Promise.all([
      read("apps/analytics/README.md"),
      read("docs/guidelines/architecture-and-ownership.md"),
    ]);

    expect(readme).toContain("retired legacy Convex source");
    expect(readme).toContain("does not prove the legacy deployment is quarantined");
    expect(readme).toContain("intentionally retained");
    expect(ownership).toContain("retired legacy Convex source");
  });

  test("owner runbook gates activation, reconciliation, and deployed legacy quarantine", async () => {
    const runbook = await read("packages/backend/README.md");

    for (const marker of [
      "VITE_CONVEX_URL",
      "VITE_CONVEX_INGEST_URL",
      "CONVEX_INGEST_URL",
      "bunx convex function-spec --prod",
      "bunx convex deploy --dry-run --typecheck enable",
      "`503`",
      "`401`",
      "`200`",
      "Cache-Control: private, no-store",
      "stats.totalEvents",
      "stats.lastEventTime",
      "Legacy export and exact deployment quarantine",
      "writes proportional to events, unique machines, machine-days, and calendar days",
    ]) {
      expect(runbook).toContain(marker);
    }
    expect(runbook).toContain("No active setting may contain `/track`");
    expect(runbook).toContain("does **not** prove the legacy deployment returns `410 Gone`");
  });
});
