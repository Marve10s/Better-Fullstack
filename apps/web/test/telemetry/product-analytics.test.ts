import { TELEMETRY_STACK_DIMENSION_KEYS } from "@better-fullstack/types/telemetry";
import { describe, expect, it } from "bun:test";

import {
  BROWSER_TELEMETRY_DISABLED_KEY,
  PAGE_PROPERTY_KEYS,
  resolveBrowserTelemetryStatus,
  trackProductEvent,
} from "@/lib/analytics/product-analytics";
import { sanitizeProductProperties } from "@/lib/analytics/product-properties";

describe("browser product analytics", () => {
  it("accepts bounded product signals and rejects browser/user content", () => {
    expect(
      sanitizeProductProperties({
        ecosystem: "typescript",
        mode: "multi",
        backend: "hono,gin",
        failure_stage: "dependency_install",
        failure_reason: "dependency_install_exit",
        duration_ms: 1200.4,
        rerun: true,
        decision_stage: "plan",
        selection_outcome: "plan-abandoned",
        selected_evidence_level: "runtime-verified",
        selection_problem: "missing-capability",
        starter_track: "rest-api",
        brief: "private prompt content",
        status: "failed",
        machineId: "caller-controlled-id",
        projectName: "private-client",
        path: "apps/web/src/private.tsx",
        filename: "private.ts",
        content: "export const secret = true",
        logs: "token-leaked-here",
        apiKey: "sk-private",
        contact: "person@example.com",
        account: "ibrahim",
        error: "request failed for https://private.example",
      }),
    ).toEqual({
      ecosystem: "typescript",
      mode: "multi",
      backend: "hono,gin",
      failure_stage: "dependency_install",
      failure_reason: "dependency_install_exit",
      duration_ms: 1200,
      rerun: true,
      decision_stage: "plan",
      selection_outcome: "plan-abandoned",
      selected_evidence_level: "runtime-verified",
      selection_problem: "missing-capability",
      starter_track: "rest-api",
    });
  });

  it("sends page events without the stack sanitizer only for non-stack keys", () => {
    for (const key of PAGE_PROPERTY_KEYS) {
      expect(TELEMETRY_STACK_DIMENSION_KEYS as readonly string[]).not.toContain(key);
    }
  });

  it("drops a stack event when telemetry is disabled while the sanitizer loads", async () => {
    const store = new Map<string, string>();
    const requests: unknown[] = [];
    const previous = {
      window: globalThis.window,
      fetch: globalThis.fetch,
      enabled: process.env.VITE_BFS_TELEMETRY_ENABLED,
    };
    const fakeWindow = {
      localStorage: {
        getItem: (key: string) => store.get(key) ?? null,
        setItem: (key: string, value: string) => store.set(key, value),
        removeItem: (key: string) => store.delete(key),
      },
      navigator: {},
      dispatchEvent: () => true,
    };
    Object.assign(globalThis, {
      window: fakeWindow,
      fetch: (...args: unknown[]) => {
        requests.push(args);
        return Promise.resolve(new Response());
      },
    });
    process.env.VITE_BFS_TELEMETRY_ENABLED = "1";
    const settled = () => new Promise((resolve) => setTimeout(resolve, 50));
    try {
      trackProductEvent("builder_generate", "started", { ecosystem: "typescript" });
      store.set(BROWSER_TELEMETRY_DISABLED_KEY, "1");
      await settled();
      expect(requests).toHaveLength(0);

      store.delete(BROWSER_TELEMETRY_DISABLED_KEY);
      trackProductEvent("builder_generate", "started", { ecosystem: "typescript" });
      await settled();
      expect(requests).toHaveLength(1);
    } finally {
      Object.assign(globalThis, { window: previous.window, fetch: previous.fetch });
      process.env.VITE_BFS_TELEMETRY_ENABLED = previous.enabled;
    }
  });

  it("uses one explicit preference and Do Not Track decision", () => {
    expect(resolveBrowserTelemetryStatus("1", null)).toEqual({
      enabled: false,
      reason: "local-opt-out",
    });
    expect(resolveBrowserTelemetryStatus(null, "1")).toEqual({
      enabled: false,
      reason: "do-not-track",
    });
    expect(resolveBrowserTelemetryStatus(null, "yes")).toEqual({
      enabled: false,
      reason: "do-not-track",
    });
    expect(resolveBrowserTelemetryStatus(null, null, true)).toEqual({
      enabled: false,
      reason: "global-privacy-control",
    });
    expect(resolveBrowserTelemetryStatus(null, null)).toEqual({
      enabled: true,
      reason: "enabled",
    });
  });
});
