import { describe, expect, it } from "bun:test";

import { TelemetryDeliveryQueue } from "../src/utils/telemetry-delivery";

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
