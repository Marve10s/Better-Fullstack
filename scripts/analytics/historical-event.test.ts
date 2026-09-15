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

it("recovers historical nested envelopes and options without bypassing privacy filters", () => {
  const event = historicalEvent(
    {
      _id: "old-command",
      _creationTime: Date.UTC(2026, 7, 8),
      stack: {
        eventType: "command_used",
        source: "mcp",
        action: "add",
        status: "failed",
        failure_reason: "network",
        projectName: "private-name",
      },
      options: { ecosystem: "go", goWebFramework: "gin", secret: "private-token" },
    },
    "source:project:prod",
  );
  expect(event.event).toBe("command_used");
  expect(event.properties).toMatchObject({
    source: "mcp",
    action: "add",
    status: "failed",
    failureReason: "network",
    goWebFramework: "gin",
  });
  expect(event.properties.library_selections).toContain("backend:go:gin");
  expect(JSON.stringify(event)).not.toContain("private-name");
  expect(JSON.stringify(event)).not.toContain("private-token");
  const current = historicalEvent(
    {
      _id: "new-command",
      _creationTime: 1,
      eventType: "web_action",
      action: "builder-viewed",
      stack: { eventType: "project_created", action: "add" },
    },
    "source",
  );
  expect(current.event).toBe("builder_viewed");
});
