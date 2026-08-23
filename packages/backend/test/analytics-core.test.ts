import { describe, expect, it } from "bun:test";

import {
  applyFailureClassifications,
  classifySelectionDecision,
  classifyProjectSetupOutcome,
  countReturningMachinesFromActivity,
  isLifecycleTerminalEvent,
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

  it("counts decision coverage only when the bounded selection fields are complete", () => {
    expect(
      classifySelectionDecision({
        eventType: "web_action",
        action: "builder-plan-abandoned",
        status: "cancelled",
        stack: {
          decision_stage: "plan",
          selection_outcome: "plan-abandoned",
          selected_evidence_level: "listed",
          selection_problem: "missing-capability",
        },
      }),
    ).toMatchObject({
      eligible: true,
      covered: true,
      decisionStage: "plan",
      selectionOutcome: "plan-abandoned",
      evidenceLevel: "listed",
      selectionProblem: "missing-capability",
    });
    expect(
      classifySelectionDecision({
        eventType: "web_action",
        action: "builder-plan-abandoned",
        status: "cancelled",
        stack: { selection_outcome: "plan-abandoned" },
      }),
    ).toMatchObject({ eligible: true, covered: false });
    expect(
      classifySelectionDecision({
        eventType: "web_action",
        action: "builder-viewed",
        status: "started",
      }),
    ).toEqual({ eligible: false, covered: false });
  });

  it("classifies only terminal existing-project commands as lifecycle use", () => {
    expect(isLifecycleTerminalEvent({ action: "update", status: "succeeded" })).toBe(true);
    expect(isLifecycleTerminalEvent({ action: "bfs_apply_project_update", status: "failed" })).toBe(
      true,
    );
    expect(isLifecycleTerminalEvent({ action: "update", status: "started" })).toBe(false);
    expect(isLifecycleTerminalEvent({ action: "create", status: "succeeded" })).toBe(false);
    expect(isLifecycleTerminalEvent({ action: "bfs_recommend_stack", status: "succeeded" })).toBe(
      false,
    );
  });
});
