import { describe, expect, it } from "bun:test";

import {
  applyFailureClassifications,
  classifyProjectSetupOutcome,
  countReturningMachinesFromActivity,
  type FailureAggregates,
} from "../convex/analytics_core";

function emptyFailureAggregates(): FailureAggregates {
  return {
    failureStages: {},
    failureReasons: {},
    actionFailureStages: {},
    actionFailureReasons: {},
  };
}

describe("analytics aggregate helpers", () => {
  it("counts a machine as returning only after activity on a second date", () => {
    expect(
      countReturningMachinesFromActivity([
        { machineId: "first", date: "2026-08-01" },
        { machineId: "first", date: "2026-08-01" },
        { machineId: "first", date: "2026-08-02" },
        { machineId: "second", date: "2026-08-03" },
      ]),
    ).toBe(1);
  });

  it("aggregates safe builder failure stage and reason by action", () => {
    const stats = emptyFailureAggregates();
    applyFailureClassifications(stats, {
      action: "builder-generate",
      success: false,
      failureStage: "request",
      failureReason: "network",
    });
    applyFailureClassifications(stats, {
      action: "builder-generate",
      success: true,
      failureStage: "request",
      failureReason: "network",
    });

    expect(stats).toEqual({
      failureStages: { request: 1 },
      failureReasons: { network: 1 },
      actionFailureStages: { "builder-generate:request": 1 },
      actionFailureReasons: { "builder-generate:network": 1 },
    });
  });

  it("separates completed setup from skipped and generation-only creation", () => {
    expect(
      classifyProjectSetupOutcome({
        eventType: "project_created",
        success: true,
        install: true,
        setupFailures: [],
      }),
    ).toBe("complete");
    expect(
      classifyProjectSetupOutcome({
        eventType: "project_created",
        success: true,
        install: true,
        setupFailures: ["install-dependencies"],
      }),
    ).toBe("incomplete");
    expect(
      classifyProjectSetupOutcome({
        eventType: "project_created",
        success: true,
        install: false,
        setupFailures: [],
      }),
    ).toBe("not-requested");
    expect(
      classifyProjectSetupOutcome({
        eventType: "project_created",
        success: true,
        source: "mcp",
        install: true,
      }),
    ).toBe("generation-only");
    expect(
      classifyProjectSetupOutcome({
        eventType: "project_created",
        success: true,
        install: true,
      }),
    ).toBe("unknown");
    expect(
      classifyProjectSetupOutcome({
        eventType: "project_created",
        success: false,
        install: true,
        setupFailures: [],
      }),
    ).toBeUndefined();
    expect(
      classifyProjectSetupOutcome({
        eventType: "command_used",
        success: true,
        setupFailures: [],
      }),
    ).toBeUndefined();
  });
});
