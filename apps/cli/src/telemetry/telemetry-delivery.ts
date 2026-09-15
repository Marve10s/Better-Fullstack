export type TelemetryDelivery = (controller: AbortController) => Promise<void>;

type PendingTelemetryDelivery = {
  controller: AbortController;
  terminal: boolean;
  promise: Promise<void>;
};

/**
 * Runs telemetry work in the background and gives callers a bounded shutdown
 * flush. Command execution never receives or awaits an individual delivery.
 */
export class TelemetryDeliveryQueue {
  private readonly pending = new Set<PendingTelemetryDelivery>();

  enqueue(deliver: TelemetryDelivery, terminal = false): void {
    // Reserve half the bounded capacity for outcomes when start deliveries are slow.
    if (this.pending.size >= (terminal ? 64 : 32)) {
      if (!terminal) return;
      const start = [...this.pending].find((delivery) => !delivery.terminal);
      if (!start) return;
      start.controller.abort();
      this.pending.delete(start);
    }
    const controller = new AbortController();
    const pending = {
      controller,
      terminal,
      promise: Promise.resolve(),
    } as PendingTelemetryDelivery;
    pending.promise = Promise.resolve()
      .then(() => (controller.signal.aborted ? undefined : deliver(controller)))
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
