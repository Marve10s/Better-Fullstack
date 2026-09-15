import { afterAll, afterEach, describe, expect, it, spyOn } from "bun:test";

import { posthogEvent } from "../src/posthog";
import { handleTelemetryIngest } from "../src/telemetry-ingest";

const options = {
  enabled: true,
  host: "https://eu.i.posthog.com",
  token: "test-token",
  allowedPages: new Set(["builder"]),
};
const fetchSpy = spyOn(globalThis, "fetch");
afterEach(() => fetchSpy.mockClear());
afterAll(() => fetchSpy.mockRestore());

function request(body: unknown) {
  return new Request("https://better-fullstack.dev/api/analytics/ingest", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

function collectEvents() {
  const batches: Array<Record<string, unknown>> = [];
  fetchSpy.mockImplementation(async (_url, init) => {
    const payload: unknown = JSON.parse(String(init?.body));
    if (payload && typeof payload === "object") batches.push(payload as Record<string, unknown>);
    return new Response("{}", { status: 200 });
  });
  return batches;
}

describe("PostHog ingestion boundary", () => {
  it("preserves canonical project choices and identity while dropping private data on the wire", async () => {
    const batches = collectEvents();
    const machineId = crypto.randomUUID();
    const eventId = crypto.randomUUID();
    const response = await handleTelemetryIngest(
      request({
        eventId,
        machineId,
        eventType: "project_created",
        status: "succeeded",
        source: "cli-flags",
        client: "cli",
        success: true,
        install: true,
        setupFailures: [],
        stack: {
          ecosystem: "typescript",
          backend: "hono",
          stackPartSelections: ["backend:typescript:hono"],
          projectName: "private-project",
          settings: { token: "private-token" },
        },
        projectName: "private-project",
        error: "private-token",
        url: "https://private.test",
        contactEmail: "private@example.com",
        $ip: "192.0.2.1",
        $set: { email: "private@example.com" },
      }),
      options,
    );
    expect(response.status).toBe(204);
    expect(batches).toMatchObject([
      {
        api_key: "test-token",
        batch: [
          {
            uuid: eventId,
            event: "project_created",
            properties: {
              distinct_id: machineId,
              backend: "hono",
              ecosystems: ["typescript"],
              library_selections: ["backend:typescript:hono"],
              setup_outcome: "complete",
              $process_person_profile: false,
              $ip: null,
            },
          },
        ],
      },
    ]);
    const wire = JSON.stringify(batches);
    for (const forbidden of [
      "private-project",
      "private-token",
      "private.test",
      "private@example.com",
      "192.0.2.1",
      "$set",
    ])
      expect(wire).not.toContain(forbidden);
  });

  it("links bounded cumulative engagement and builder outcomes to a published page view", async () => {
    const batches = collectEvents();
    const page_view_id = crypto.randomUUID();
    for (const action of ["page-engagement", "builder-zip-downloaded"]) {
      expect(
        (
          await handleTelemetryIngest(
            request({
              machineId: crypto.randomUUID(),
              eventType: "web_action",
              action,
              page_id: "builder",
              page_view_id,
              active_ms: 1500.8,
              scroll_percent: 999,
              end_reason: "pagehide",
            }),
            options,
          )
        ).status,
      ).toBe(204);
    }
    expect(batches).toMatchObject([
      {
        batch: [
          {
            event: "page_engagement",
            properties: { page_id: "builder", page_view_id, active_ms: 1501, scroll_percent: 100 },
          },
        ],
      },
      { batch: [{ event: "builder_zip_downloaded", properties: { page_view_id } }] },
    ]);
    expect(JSON.stringify(batches)).not.toContain("viewport_height");
  });

  it("rejects malformed and oversized input without accepting an event", async () => {
    const batches = collectEvents();
    for (const body of [
      [],
      {},
      { eventType: "project_created" },
      { eventType: "web_action", machineId: crypto.randomUUID() },
      { eventType: "command_used", machineId: crypto.randomUUID(), action: "create" },
      { eventType: "private-event" },
      { machineId: "person@example.com" },
      {
        eventType: "web_action",
        action: "page-viewed",
        page_id: "private-project",
        page_view_id: crypto.randomUUID(),
      },
    ]) {
      expect((await handleTelemetryIngest(request(body), options)).status).toBe(400);
    }
    expect(
      (await handleTelemetryIngest(request({ extra: "x".repeat(70_000) }), options)).status,
    ).toBe(413);
    expect(
      (
        await handleTelemetryIngest(
          new Request("https://x.test", { method: "POST", body: "{}" }),
          options,
        )
      ).status,
    ).toBe(415);
    expect(batches).toEqual([]);
  });

  it("fails closed when unconfigured and reports an upstream rejection", async () => {
    const batches = collectEvents();
    expect((await handleTelemetryIngest(request({}), { ...options, enabled: false })).status).toBe(
      503,
    );
    expect(
      (await handleTelemetryIngest(request({}), { ...options, host: "https://private.test" }))
        .status,
    ).toBe(503);
    expect(batches).toEqual([]);
    fetchSpy.mockImplementation(async () => new Response(null, { status: 429 }));
    expect(
      (
        await handleTelemetryIngest(
          request({ eventType: "project_created", machineId: crypto.randomUUID() }),
          options,
        )
      ).status,
    ).toBe(502);
  });
});

it("derives flat library choices only from the active ecosystem and honors graph authority", () => {
  const options = { eventId: crypto.randomUUID(), timestamp: Date.now() };
  const solo = posthogEvent(
    {
      eventType: "project_created",
      ecosystem: "python",
      pythonWebFramework: "fastapi",
      backend: "hono",
    },
    options,
  );
  expect(solo.properties.library_selections).toContain("backend:python:fastapi");
  expect(solo.properties.library_selections).not.toContain("backend:typescript:hono");
  const graph = posthogEvent(
    { stackPartSelections: ["backend:go:gin"], backend: "hono", ecosystem: "typescript" },
    options,
  );
  expect(graph.properties.library_selections).toEqual(["backend:go:gin"]);
  expect(graph.properties.ecosystems).toEqual(["go"]);
});

it("counts a legacy database once using the universal graph identity", () => {
  const event = posthogEvent(
    { ecosystem: "typescript", database: "postgres" },
    { eventId: crypto.randomUUID(), timestamp: Date.now() },
  );
  expect(
    event.properties.library_selections.filter((value) => value.endsWith(":postgres")),
  ).toEqual(["database:universal:postgres"]);
});

it("bounds requests independently of rotating caller machine IDs", async () => {
  const batches = collectEvents();
  const limited = { ...options, trustedRequestKey: "trusted-origin-one" };
  // oxlint-disable-next-line no-await-in-loop -- Exercise the sequential admission boundary.
  for (let index = 0; index < 120; index++)
    expect(
      (
        await handleTelemetryIngest(
          request({ eventType: "project_created", machineId: crypto.randomUUID() }),
          limited,
        )
      ).status,
    ).toBe(204);
  expect(
    (
      await handleTelemetryIngest(
        request({ eventType: "project_created", machineId: crypto.randomUUID() }),
        limited,
      )
    ).status,
  ).toBe(429);
  expect(
    (
      await handleTelemetryIngest(
        request({ eventType: "project_created", machineId: crypto.randomUUID() }),
        { ...options, trustedRequestKey: "trusted-origin-two" },
      )
    ).status,
  ).toBe(204);
  expect(batches.length).toBe(121);
});

it("rejects malformed explicit outcomes, measurements and aliases before capture", async () => {
  const batches = collectEvents();
  for (const invalid of [
    { success: "false" },
    { durationMs: -1 },
    { duration_ms: -1 },
    { fileCount: -1 },
    { ci: "false" },
    { retry: 1 },
    { durationMs: 12, duration_ms: "wrong" },
  ]) {
    // oxlint-disable-next-line no-await-in-loop -- Every input must be rejected separately.
    expect(
      (
        await handleTelemetryIngest(
          request({ eventType: "project_created", machineId: crypto.randomUUID(), ...invalid }),
          options,
        )
      ).status,
    ).toBe(400);
  }
  expect(batches).toEqual([]);
});

it("rejects explicitly malformed page properties without recording partial engagement", async () => {
  const batches = collectEvents();
  for (const invalid of [
    { active_ms: -1 },
    { elapsed_ms: null },
    { scroll_percent: -1 },
    { max_scroll_percent: "100" },
    { scroll_px: -1 },
    { viewport_height: "800" },
    { end_reason: "other" },
    { scroll_surface: "private-pane" },
    { device: false },
    { page_id: "unknown-page" },
    { page_view_id: "not-a-uuid" },
  ]) {
    const response = await handleTelemetryIngest(
      request({
        eventType: "web_action",
        action: "page-engagement",
        machineId: crypto.randomUUID(),
        page_id: "builder",
        page_view_id: crypto.randomUUID(),
        ...invalid,
      }),
      options,
    );
    expect(response.status).toBe(400);
  }
  expect(batches).toEqual([]);
  const response = await handleTelemetryIngest(
    request({
      eventType: "web_action",
      action: "page-viewed",
      machineId: crypto.randomUUID(),
      page_id: "builder",
      page_view_id: crypto.randomUUID(),
    }),
    options,
  );
  expect(response.status).toBe(204);
});

it("rejects malformed known stack choices at either location before capture", async () => {
  const batches = collectEvents();
  const invalidDimensions = [
    { ecosystem: 123 },
    { stackPartSelections: Array(65).fill("backend:typescript:hono") },
    { stackPartSelections: ["backend:typescript:hono", "backend:typescript:private-project"] },
    { frontend: ["next", "private-frontend"] },
    { frontend: ["next", 123] },
    { backend: null },
    { multiEcosystem: "true" },
    { email: "private@example.com" },
  ];
  const invalidBodies = [
    ...invalidDimensions,
    ...invalidDimensions.map((stack) => ({ stack })),
    { ecosystem: 123, stack: { ecosystem: "typescript" } },
    { ecosystem: "typescript", stack: { ecosystem: 123 } },
    { stack: [] },
    { stack: null },
    { stack: "typescript" },
  ];
  for (const invalid of invalidBodies) {
    const response = await handleTelemetryIngest(
      request({ eventType: "project_created", machineId: crypto.randomUUID(), ...invalid }),
      { ...options, trustedRequestKey: "invalid-stack-choices" },
    );
    expect(response.status).toBe(400);
  }
  expect(batches).toEqual([]);
});
