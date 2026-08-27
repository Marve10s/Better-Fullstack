import { afterEach, describe, expect, it } from "bun:test";

import { flushTelemetry, trackEvent } from "@/telemetry/analytics";
import { TelemetryDeliveryQueue } from "@/telemetry/telemetry-delivery";

describe("telemetry delivery queue", () => {
  it("keeps delivery off the command path and aborts at the flush deadline", async () => {
    const queue = new TelemetryDeliveryQueue();
    let deliveryStarted = false;
    let deliveryAborted = false;

    queue.enqueue(async (controller) => {
      deliveryStarted = true;
      await new Promise<void>((resolve) => {
        controller.signal.addEventListener(
          "abort",
          () => {
            deliveryAborted = true;
            resolve();
          },
          { once: true },
        );
      });
    });

    expect(deliveryStarted).toBe(false);
    await Promise.resolve();
    expect(deliveryStarted).toBe(true);

    await queue.flush(0);
    expect(deliveryAborted).toBe(true);
  });

  it("flushes completed deliveries without waiting for the deadline", async () => {
    const queue = new TelemetryDeliveryQueue();
    let delivered = false;
    queue.enqueue(async () => {
      delivered = true;
    });

    await queue.flush(1_000);
    expect(delivered).toBe(true);
  });
});

describe("shutdown flush budget", () => {
  const originalFetch = global.fetch;
  const originalIngestUrl = process.env.CONVEX_INGEST_URL;
  const originalDisabled = process.env.BTS_TELEMETRY_DISABLED;

  afterEach(() => {
    global.fetch = originalFetch;
    if (originalIngestUrl === undefined) delete process.env.CONVEX_INGEST_URL;
    else process.env.CONVEX_INGEST_URL = originalIngestUrl;
    if (originalDisabled === undefined) delete process.env.BTS_TELEMETRY_DISABLED;
    else process.env.BTS_TELEMETRY_DISABLED = originalDisabled;
  });

  it("delivers an event enqueued immediately before shutdown", async () => {
    process.env.CONVEX_INGEST_URL = "https://telemetry.invalid/api/analytics/ingest";
    process.env.BTS_TELEMETRY_DISABLED = "0";

    let aborted = false;
    let completed = false;
    global.fetch = (async (_input: string | URL | Request, init?: RequestInit) => {
      const abortSignalled = new Promise<void>((resolve) => {
        init?.signal?.addEventListener("abort", () => resolve(), { once: true });
      });
      await Promise.race([Bun.sleep(400), abortSignalled]);
      aborted = init?.signal?.aborted ?? false;
      if (aborted) throw new Error("aborted");
      completed = true;
      return new Response(null, { status: 200 });
    }) as typeof fetch;

    await trackEvent("project_created", { ecosystem: "typescript" }, { success: true });
    await flushTelemetry();

    expect(aborted).toBe(false);
    expect(completed).toBe(true);
  });
});
