export type TelemetryDelivery = (controller: AbortController) => Promise<void>;

type PendingTelemetryDelivery = {
  controller: AbortController;
  promise: Promise<void>;
};

/**
 * Runs telemetry work in the background and gives callers a bounded shutdown
 * flush. Command execution never receives or awaits an individual delivery.
 */
export class TelemetryDeliveryQueue {
  private readonly pending = new Set<PendingTelemetryDelivery>();

  enqueue(deliver: TelemetryDelivery): void {
    const controller = new AbortController();
    const pending = {
      controller,
      promise: Promise.resolve(),
    } as PendingTelemetryDelivery;
    pending.promise = Promise.resolve()
      .then(() => deliver(controller))
      .catch(() => undefined)
      .finally(() => this.pending.delete(pending));
    this.pending.add(pending);
  }

  async flush(timeoutMs: number): Promise<void> {
    const deliveries = [...this.pending];
    if (deliveries.length === 0) return;

    let timer: ReturnType<typeof setTimeout> | undefined;
    const completed = Promise.allSettled(deliveries.map((delivery) => delivery.promise)).then(
      () => true,
    );
    const deadline = new Promise<boolean>((resolve) => {
      timer = setTimeout(() => resolve(false), Math.max(0, timeoutMs));
    });
    const completedWithinBudget = await Promise.race([completed, deadline]);
    if (timer) clearTimeout(timer);

    if (!completedWithinBudget) {
      for (const delivery of deliveries) {
        if (this.pending.has(delivery)) delivery.controller.abort();
      }
    }
  }
}
