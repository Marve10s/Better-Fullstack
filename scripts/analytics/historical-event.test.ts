import { expect, it } from "bun:test";

import { historicalEvent, historicalEventId } from "./historical-event";

it("preserves old event time and stable UUIDs across resumed imports without forwarding row IDs or private data", () => {
  const row = {
    _id: "convex-row",
    _creationTime: Date.UTC(2026, 1, 20),
    stack: { backend: "hono" },
    projectName: "private-name",
    machineId: "not-a-uuid",
  };
  const event = historicalEvent(row, "source:project:prod");
  expect(event.timestamp).toBe("2026-02-20T00:00:00.000Z");
  expect(event.uuid).toBe(historicalEventId("source:project:prod", row._id));
  expect(event.uuid).toMatch(
    /^[a-f0-9]{8}-[a-f0-9]{4}-5[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/,
  );
  expect(event.uuid).not.toBe(historicalEventId("other:project:prod", row._id));
  expect(event.properties.historical_import).toBe(true);
  expect(event.properties.identity_quality).toBe("unattributed");
  expect(JSON.stringify(event)).not.toContain("private-name");
  expect(JSON.stringify(event)).not.toContain("convex-row");
  expect(() => historicalEvent({ _id: "row" }, "source")).toThrow("Invalid source event metadata");
});
