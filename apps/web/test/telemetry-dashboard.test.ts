import { describe, expect, it } from "bun:test";

import {
  buildTelemetryDashboard,
  type RawEngagement,
  type RawProductInsights,
  type RawTelemetryStats,
} from "../src/lib/telemetry-dashboard";

const NOW = Date.parse("2026-08-07T12:00:00.000Z");

function emptyInsights(overrides: Partial<RawProductInsights> = {}): RawProductInsights {
  return {
    totalEvents: 0,
    decisionEvents: 0,
    decisionEligibleEvents: 0,
    actions: {},
    actionStatuses: {},
    actionOutcomes: {},
    clients: {},
    sources: {},
    errorNames: {},
    failureStages: {},
    failureReasons: {},
    actionFailureStages: {},
    actionFailureReasons: {},
    setupFailureStats: {},
    setupOutcomes: {},
    installSelections: {},
    selectionOutcomes: {},
    evidenceLevels: {},
    decisionStages: {},
    starterTracks: {},
    selectionProblems: {},
    ...overrides,
  };
}

const stats: RawTelemetryStats = {
  totalProjects: 120,
  lastEventTime: NOW - 1_000,
  ecosystem: { typescript: 80, rust: 25, python: 15 },
};

const engagement: RawEngagement = {
  uniqueMachines: 70,
  returningMachines: 20,
  trackedEvents: 180,
  newMachinesLast30d: 12,
  activeMachinesLast7d: 10,
  activeMachinesLast30d: 25,
  returningMachinesLast7d: 4,
  returningMachinesLast30d: 10,
  uniqueLifecycleMachines: 30,
  returningLifecycleMachines: 9,
  lifecycleTrackedEvents: 75,
  activeLifecycleMachinesLast7d: 8,
  activeLifecycleMachinesLast30d: 20,
  returningLifecycleMachinesLast7d: 3,
  returningLifecycleMachinesLast30d: 7,
};

describe("telemetry decision dashboard", () => {
  it("uses sufficiently covered window aggregates for lifecycle decisions", () => {
    const data = buildTelemetryDashboard(
      {
        stats,
        insights: emptyInsights({
          totalEvents: 500,
          decisionEvents: 18,
          decisionEligibleEvents: 20,
          setupFailureStats: { "install-dependencies": 3 },
        }),
        engagement,
        daily: [
          {
            date: "2026-08-06",
            count: 7,
            totalEvents: 30,
            successfulEvents: 12,
            failedEvents: 2,
            decisionEvents: 8,
            decisionEligibleEvents: 10,
            selectionOutcomes: { "create-completed": 5, "plan-abandoned": 3 },
            evidenceLevels: { listed: 6, "build-verified": 2 },
            decisionStages: { create: 5, plan: 3 },
            starterTracks: { "saas-app": 4 },
            selectionProblems: { none: 5, "missing-capability": 3 },
            actions: {
              "builder-run-started": 5,
              "builder-run-ready": 4,
              "builder-run-failed": 1,
              "builder-zip-started": 4,
              "builder-zip-downloaded": 3,
              "builder-zip-failed": 1,
              "builder-file-edited": 2,
            },
            actionStatuses: {
              "create:started": 6,
              "create:succeeded": 5,
              "create:failed": 1,
              "doctor:started": 2,
              "doctor:succeeded": 2,
              "remove:started": 1,
              "remove:succeeded": 1,
              "bfs_plan_part_removal:started": 1,
              "bfs_plan_part_removal:succeeded": 1,
              "bfs_apply_part_removal:started": 1,
              "bfs_apply_part_removal:failed": 1,
              "status:started": 1,
              "status:succeeded": 1,
              "bfs_get_project_status:started": 2,
              "bfs_get_project_status:succeeded": 2,
            },
            actionOutcomes: {},
            clients: { cli: 20, web: 10 },
            sources: { "cli-flags": 12, "web-builder": 10, "cli-interactive": 8 },
            ecosystems: { typescript: 5, rust: 2 },
            setupOutcomes: { complete: 4, incomplete: 1, "not-requested": 2 },
            installSelections: { requested: 5, skipped: 2 },
            failureReasons: { install: 2, network: 1 },
            actionFailureReasons: { "create:install": 1 },
            failureStages: { setup: 1 },
            actionFailureStages: { "create:setup": 1 },
          },
          {
            date: "2026-08-07",
            count: 3,
            totalEvents: 10,
            successfulEvents: 5,
            failedEvents: 0,
            decisionEvents: 5,
            decisionEligibleEvents: 5,
            selectionOutcomes: { "handoff-completed": 5 },
            evidenceLevels: { listed: 3, "runtime-verified": 2 },
            decisionStages: { plan: 5 },
            starterTracks: { "rest-api": 2 },
            selectionProblems: { none: 5 },
            actions: { "builder-command-copied": 2 },
            actionStatuses: {
              "create:started": 2,
              "create:succeeded": 2,
              "check:started": 1,
              "check:succeeded": 1,
            },
            actionOutcomes: {},
            clients: { cli: 8, web: 2 },
            sources: { "cli-flags": 8, "web-builder": 2 },
            ecosystems: { typescript: 2, python: 1 },
            setupOutcomes: { complete: 3 },
            installSelections: { requested: 3 },
          },
        ],
      },
      { now: NOW, windowDays: 2 },
    );

    expect(data.operationScope).toBe("window");
    expect(data.decisionCoverage).toBe(13 / 15);
    expect(data.decisionEligibleEvents).toBe(15);
    expect(data.totalProjectsInWindow).toBe(10);
    expect(data.setup.completionRate).toBe(7 / 8);
    expect(data.installs.requestRate).toBe(8 / 10);
    expect(data.browser.runReadyRate).toBe(4 / 5);
    expect(data.browser.zipSuccessRate).toBe(3 / 4);
    expect(data.operations.find((operation) => operation.id === "create")).toEqual({
      id: "create",
      label: "Create",
      attempts: 8,
      succeeded: 7,
      failed: 1,
      cancelled: 0,
      successRate: 7 / 8,
    });
    expect(data.operations.find((operation) => operation.id === "check")?.succeeded).toBe(3);
    expect(data.operations.find((operation) => operation.id === "remove")).toMatchObject({
      attempts: 3,
      succeeded: 2,
      failed: 1,
      successRate: 2 / 3,
    });
    expect(data.operations.find((operation) => operation.id === "status")?.successRate).toBe(1);
    expect(data.operations.find((operation) => operation.id === "status")?.attempts).toBe(3);
    expect(data.adoption.map((item) => item.name)).toEqual(["TypeScript", "Rust", "Python"]);
    expect(data.repeatUse.repeat7dRate).toBe(0.4);
    expect(data.repeatUse.lifecycleRepeat7dRate).toBe(3 / 8);
    expect(data.selection.problems.map((item) => item.name)).toEqual([
      "None",
      "Missing Capability",
    ]);
    expect(data.selection.evidenceLevels.map((item) => item.name)).toEqual([
      "Listed",
      "Build Verified",
      "Runtime Verified",
    ]);
    expect(data.failureReasons[0]?.name).toBe("Create / Install");
    expect(data.failureReasons.map((item) => item.name)).toContain("Unattributed / Install");
    expect(data.failureReasons.map((item) => item.name)).toContain("Unattributed / Network");
    expect(data.activity).toHaveLength(2);
  });

  it("falls back to all-time aggregates when decision-window coverage is partial", () => {
    const data = buildTelemetryDashboard(
      {
        stats,
        insights: emptyInsights({
          totalEvents: 100,
          decisionEvents: 90,
          decisionEligibleEvents: 100,
          actionStatuses: {
            "update:started": 12,
            "update:succeeded": 9,
            "update:failed": 3,
          },
          sources: { mcp: 8, "cli-flags": 4 },
          setupOutcomes: { complete: 6, incomplete: 2 },
          installSelections: { requested: 7, skipped: 1 },
        }),
        engagement,
        daily: [
          {
            date: "2026-08-07",
            count: 2,
            totalEvents: 10,
            decisionEvents: 2,
            decisionEligibleEvents: 10,
            actionStatuses: { "update:succeeded": 1 },
          },
        ],
      },
      { now: NOW, windowDays: 1 },
    );

    expect(data.operationScope).toBe("all-time");
    expect(data.decisionCoverage).toBe(0.9);
    expect(data.operations.find((operation) => operation.id === "update")?.successRate).toBe(0.75);
    expect(data.setup.completionRate).toBe(0.75);
    expect(data.adoption[0]?.name).toBe("TypeScript");
  });
});
