import {
  CAPABILITY_EVIDENCE_LEVEL_IDS,
  STARTER_TRACK_IDS,
  TELEMETRY_STACK_DIMENSION_KEYS,
} from "@better-fullstack/types";
import { describe, expect, it } from "bun:test";

import {
  applyFailureClassifications,
  classifySelectionDecision,
  classifyProjectSetupOutcome,
  countReturningMachinesFromActivity,
  isLifecycleTerminalEvent,
  type FailureAggregates,
} from "@/analytics_core";
import {
  extractStack,
  legacyStackFields,
  sanitizeIngestEnvelope,
  sanitizeTelemetryIdentifier,
  TELEMETRY_STACK_KEYS,
} from "@/http";

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

  it("uses project creation as the single source for create decisions", () => {
    for (const status of ["failed", "cancelled"] as const) {
      expect(
        classifySelectionDecision({
          eventType: "command_used",
          action: "create",
          status,
          stack: {
            decision_stage: "create",
            selected_evidence_level: "listed",
            selection_problem: "reliability",
          },
        }),
      ).toEqual({ eligible: false, covered: false });
    }

    expect(
      classifySelectionDecision({
        eventType: "project_created",
        status: "failed",
        success: false,
        stack: {
          decision_stage: "create",
          selection_outcome: "create-failed",
          selected_evidence_level: "listed",
          selection_problem: "reliability",
        },
      }),
    ).toMatchObject({ eligible: true, covered: true, selectionOutcome: "create-failed" });
  });

  it("accepts every canonical capability evidence level", () => {
    for (const evidenceLevel of CAPABILITY_EVIDENCE_LEVEL_IDS) {
      expect(
        classifySelectionDecision({
          eventType: "project_created",
          status: "succeeded",
          success: true,
          stack: {
            decision_stage: "create",
            selection_outcome: "create-completed",
            selected_evidence_level: evidenceLevel,
          },
        }),
      ).toMatchObject({
        covered: true,
        evidenceLevel,
      });
    }
  });

  it("accepts only canonical starter-track IDs", () => {
    for (const starterTrack of STARTER_TRACK_IDS) {
      expect(
        classifySelectionDecision({
          eventType: "project_created",
          status: "succeeded",
          success: true,
          stack: { starter_track: starterTrack },
        }).starterTrack,
      ).toBe(starterTrack);
    }

    expect(
      classifySelectionDecision({
        eventType: "project_created",
        status: "succeeded",
        success: true,
        stack: { starter_track: "customer-private-project" },
      }).starterTrack,
    ).toBeUndefined();

    expect(
      extractStack({
        stack: {
          starter_track: "customer-private-project",
          backend: "hono",
        },
      }),
    ).toEqual({ backend: "hono" });
    expect(extractStack({ starter_track: STARTER_TRACK_IDS[0] })).toEqual({
      starter_track: STARTER_TRACK_IDS[0],
    });
  });

  it("persists only allowlisted stack dimensions", () => {
    expect(
      extractStack({
        stack: {
          customer_private_label: "acme-secret",
          arbitraryFlag: true,
          backend: "hono",
        },
      }),
    ).toEqual({ backend: "hono" });

    expect([...TELEMETRY_STACK_KEYS]).toEqual([...TELEMETRY_STACK_DIMENSION_KEYS]);
    expect([...TELEMETRY_STACK_KEYS]).not.toContain("command");
    expect([...TELEMETRY_STACK_KEYS]).not.toContain("mcpTool");
    expect([...TELEMETRY_STACK_KEYS]).toContain("campaign");
  });

  it("persists only canonical values for every allowed dimension", () => {
    expect(
      extractStack({
        backend: "customer-private-backend",
        selected_evidence_level: "customer-private-evidence",
        targetEcosystem: "go",
        generatorKind: "resource",
        registryAction: "list",
      }),
    ).toEqual({
      targetEcosystem: "go",
      generatorKind: "resource",
      registryAction: "list",
    });
  });

  it("normalizes canonical browser stack summaries without accepting free form values", () => {
    expect(
      extractStack({
        ecosystem: "typescript,go",
        frontend: "next",
        backend: "hono,gin",
        database: "postgres",
      }),
    ).toEqual({
      ecosystem: "typescript,go",
      frontend: ["next"],
      backend: "hono,gin",
      database: "postgres",
    });
    expect(extractStack({ frontend: "next,customer-private-ui" })).toEqual({});
  });

  it("retains active browser properties only when their values are canonical", () => {
    expect(
      extractStack({
        campaign: "run-before-you-clone",
        moment: "run",
        placement: "hero",
        preset: "t3",
        rerun: false,
        target: "clipboard",
        view: "preview",
      }),
    ).toEqual({
      campaign: "run-before-you-clone",
      moment: "run",
      placement: "hero",
      preset: "t3",
      rerun: false,
      target: "clipboard",
      view: "preview",
    });
    expect(
      extractStack({
        campaign: "customer-private-secret",
        moment: "customer-private-secret",
        placement: "customer-private-secret",
        preset: "customer-private-secret",
        rerun: "customer-private-secret",
        target: "customer-private-secret",
        view: "customer-private-secret",
      }),
    ).toEqual({});
  });

  it("drops arbitrary identifier-shaped envelope values at public ingest", () => {
    expect(
      sanitizeIngestEnvelope({
        action: "private-customer",
        mode: "secret-mode",
        machineId: "customer-private-machine",
        errorName: "PrivateCustomerError",
        failureStage: "secret-stage",
        failureReason: "secret-reason",
        setupFailures: ["secret-step"],
        ciProvider: "secret-ci",
        executionRuntime: "secret-runtime",
        cli_version: "secret-version",
        node_version: "secret-version",
        platform: "secret-platform",
      }),
    ).toMatchObject({
      action: undefined,
      mode: undefined,
      machineId: undefined,
      errorName: undefined,
      failureStage: undefined,
      failureReason: undefined,
      setupFailures: undefined,
      ciProvider: undefined,
      executionRuntime: undefined,
      cli_version: undefined,
      node_version: undefined,
      platform: undefined,
    });
  });

  it("retains canonical CLI, MCP, and browser envelope values and numeric aliases", () => {
    expect(
      sanitizeIngestEnvelope({
        eventType: "command_used",
        source: "mcp",
        client: "cli",
        action: "bfs_get_guidance",
        status: "succeeded",
        mode: "read",
        machineId: "550e8400-e29b-41d4-a716-446655440000",
        errorName: "CLIError",
        failure_stage: "install-dependencies",
        failure_reason: "peer-conflict",
        setupFailures: ["install-dependencies"],
        duration_ms: 123.6,
        archive_bytes: 456.4,
        ciProvider: "github-actions",
        executionRuntime: "bun",
        cli_version: "2.52.0",
        node_version: "v24.5.0",
        platform: "darwin",
      }),
    ).toMatchObject({
      eventType: "command_used",
      source: "mcp",
      client: "cli",
      action: "bfs_get_guidance",
      status: "succeeded",
      mode: "read",
      machineId: "550e8400-e29b-41d4-a716-446655440000",
      errorName: "CLIError",
      failureStage: "install-dependencies",
      failureReason: "peer-conflict",
      setupFailures: ["install-dependencies"],
      durationMs: 124,
      archiveBytes: 456,
      ciProvider: "github-actions",
      executionRuntime: "bun",
      cli_version: "2.52.0",
      node_version: "v24.5.0",
      platform: "darwin",
    });

    expect(
      sanitizeIngestEnvelope({
        eventType: "web_action",
        source: "web-builder",
        client: "web",
        action: "builder-run-ready",
        status: "succeeded",
        mode: "solo",
        machineId: "550e8400-e29b-41d4-a716-446655440000",
        executionRuntime: "browser",
        platform: "browser",
      }),
    ).toMatchObject({
      eventType: "web_action",
      source: "web-builder",
      client: "web",
      action: "builder-run-ready",
      status: "succeeded",
      mode: "solo",
      executionRuntime: "browser",
      platform: "browser",
    });
  });

  it("rejects oversized values instead of truncating them into valid identifiers", () => {
    expect(extractStack({ backend: `hono${"x".repeat(100)}` })).toEqual({});
    expect(sanitizeTelemetryIdentifier(`valid${"x".repeat(100)}`)).toBeUndefined();
  });

  it("derives legacy aggregate fields only from the validated stack", () => {
    const rejected = extractStack({ backend: "customer-private-backend" });
    expect(legacyStackFields(rejected).backend).toBeUndefined();

    const stack = extractStack({
      backend: "customer-private-backend",
      stack: {
        backend: "hono",
        frontend: ["next"],
        git: true,
      },
    });
    expect(legacyStackFields(stack)).toMatchObject({
      backend: "hono",
      frontend: ["next"],
      git: true,
    });
  });

  it("classifies only terminal existing-project commands as lifecycle use", () => {
    expect(isLifecycleTerminalEvent({ action: "update", status: "succeeded" })).toBe(true);
    expect(isLifecycleTerminalEvent({ action: "recovery", status: "succeeded" })).toBe(true);
    expect(isLifecycleTerminalEvent({ action: "replace", status: "succeeded" })).toBe(true);
    expect(isLifecycleTerminalEvent({ action: "registry", status: "succeeded" })).toBe(true);
    expect(isLifecycleTerminalEvent({ action: "adopt", status: "succeeded" })).toBe(true);
    expect(isLifecycleTerminalEvent({ action: "bfs_apply_project_update", status: "failed" })).toBe(
      true,
    );
    expect(isLifecycleTerminalEvent({ action: "update", status: "started" })).toBe(false);
    expect(isLifecycleTerminalEvent({ action: "create", status: "succeeded" })).toBe(false);
    expect(isLifecycleTerminalEvent({ action: "recover", status: "succeeded" })).toBe(false);
    expect(isLifecycleTerminalEvent({ action: "bfs_recommend_stack", status: "succeeded" })).toBe(
      false,
    );
  });
});
