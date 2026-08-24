import { describe, expect, it } from "bun:test";

import { createCliDefaultProjectConfigBase } from "../src/defaults";
import { ProjectConfigSchema } from "../src/schemas";
import {
  sanitizeTelemetryAction,
  sanitizeTelemetryCiProvider,
  sanitizeTelemetryCliVersion,
  sanitizeTelemetryErrorName,
  sanitizeTelemetryExecutionRuntime,
  sanitizeTelemetryFailureReason,
  sanitizeTelemetryFailureStage,
  sanitizeTelemetryMachineId,
  sanitizeTelemetryMode,
  sanitizeTelemetryNodeVersion,
  sanitizeTelemetryPlatform,
  sanitizeTelemetrySetupFailures,
  sanitizeTelemetryStackDimension,
  TELEMETRY_PROJECT_CONFIG_KEYS,
  TELEMETRY_STACK_DIMENSION_KEYS,
} from "../src/telemetry";

describe("telemetry contract", () => {
  it("requires an intentional decision for every project config field", () => {
    const allowed = new Set(TELEMETRY_PROJECT_CONFIG_KEYS);
    expect(Object.keys(ProjectConfigSchema.shape).filter((key) => !allowed.has(key))).toEqual([
      "projectName",
      "projectDir",
      "relativePath",
      "stackParts",
    ]);
    expect(new Set(TELEMETRY_STACK_DIMENSION_KEYS).size).toBe(
      TELEMETRY_STACK_DIMENSION_KEYS.length,
    );
  });

  it("validates canonical values rather than identifier syntax", () => {
    expect(sanitizeTelemetryStackDimension("backend", "hono")).toBe("hono");
    expect(sanitizeTelemetryStackDimension("backend", "customer-private-backend")).toBeUndefined();
    expect(sanitizeTelemetryStackDimension("targetEcosystem", "go")).toBe("go");
    expect(sanitizeTelemetryStackDimension("targetEcosystem", "effect")).toBeUndefined();
    expect(sanitizeTelemetryStackDimension("generatorKind", "resource")).toBe("resource");
    expect(sanitizeTelemetryStackDimension("registryAction", "list")).toBe("list");
    expect(sanitizeTelemetryStackDimension("documentation", ["starlight", "fumadocs"])).toEqual([
      "starlight",
      "fumadocs",
    ]);
    expect(sanitizeTelemetryStackDimension("mcpTool", "bfs_get_guidance")).toBeUndefined();
  });

  it("retains active browser dimensions through exact value contracts", () => {
    expect(sanitizeTelemetryStackDimension("campaign", "run-before-you-clone")).toBe(
      "run-before-you-clone",
    );
    expect(sanitizeTelemetryStackDimension("moment", "download")).toBe("download");
    expect(sanitizeTelemetryStackDimension("placement", "preset_grid")).toBe("preset_grid");
    expect(sanitizeTelemetryStackDimension("preset", "go-gin")).toBe("go-gin");
    expect(sanitizeTelemetryStackDimension("rerun", true)).toBe(true);
    expect(sanitizeTelemetryStackDimension("target", "native")).toBe("native");
    expect(sanitizeTelemetryStackDimension("view", "saved")).toBe("saved");

    for (const key of ["campaign", "moment", "placement", "preset", "target", "view"]) {
      expect(sanitizeTelemetryStackDimension(key, "customer-private-secret")).toBeUndefined();
    }
    expect(sanitizeTelemetryStackDimension("rerun", "customer-private-secret")).toBeUndefined();
  });

  it("validates every telemetry envelope identifier against a bounded vocabulary", () => {
    expect(sanitizeTelemetryAction("bfs_get_guidance")).toBe("bfs_get_guidance");
    expect(sanitizeTelemetryAction("builder-run-ready")).toBe("builder-run-ready");
    expect(sanitizeTelemetryAction("private-customer")).toBeUndefined();
    expect(sanitizeTelemetryMode("dry-run")).toBe("dry-run");
    expect(sanitizeTelemetryMode("secret-mode")).toBeUndefined();
    expect(sanitizeTelemetryErrorName("CLIError")).toBe("CLIError");
    expect(sanitizeTelemetryErrorName("PrivateCustomerError")).toBeUndefined();
    expect(sanitizeTelemetryFailureStage("dependency_install")).toBe("dependency_install");
    expect(sanitizeTelemetryFailureStage("secret-stage")).toBeUndefined();
    expect(sanitizeTelemetryFailureReason("peer-conflict")).toBe("peer-conflict");
    expect(sanitizeTelemetryFailureReason("secret-reason")).toBeUndefined();
    expect(sanitizeTelemetrySetupFailures(["install-dependencies"])).toEqual([
      "install-dependencies",
    ]);
    expect(sanitizeTelemetrySetupFailures(["secret-step"])).toBeUndefined();
    expect(sanitizeTelemetryCiProvider("github-actions")).toBe("github-actions");
    expect(sanitizeTelemetryCiProvider("private-ci")).toBeUndefined();
    expect(sanitizeTelemetryExecutionRuntime("bun")).toBe("bun");
    expect(sanitizeTelemetryExecutionRuntime("private-runtime")).toBeUndefined();
    expect(sanitizeTelemetryPlatform("darwin")).toBe("darwin");
    expect(sanitizeTelemetryPlatform("private-platform")).toBeUndefined();
  });

  it("accepts only anonymous UUIDv4 machine IDs and stable numeric versions", () => {
    expect(sanitizeTelemetryMachineId("550e8400-e29b-41d4-a716-446655440000")).toBe(
      "550e8400-e29b-41d4-a716-446655440000",
    );
    expect(sanitizeTelemetryMachineId("customer-private-machine")).toBeUndefined();
    expect(sanitizeTelemetryCliVersion("2.52.0")).toBe("2.52.0");
    expect(sanitizeTelemetryCliVersion("2.52.0-private")).toBeUndefined();
    expect(sanitizeTelemetryNodeVersion("v24.5.0")).toBe("v24.5.0");
    expect(sanitizeTelemetryNodeVersion("private-version")).toBeUndefined();
  });

  it("retains every safe field in the canonical CLI default config", () => {
    const rejectedKeys = Object.entries(createCliDefaultProjectConfigBase())
      .filter(([key]) => key !== "projectName" && key !== "relativePath")
      .filter(([key, value]) => sanitizeTelemetryStackDimension(key, value) === undefined)
      .map(([key]) => key);
    expect(rejectedKeys).toEqual([]);
  });

  it("accepts only registered graph triples and bounded canonical arrays", () => {
    expect(
      sanitizeTelemetryStackDimension("stackPartSelections", [
        "backend:go:gin",
        "frontend:typescript:next",
      ]),
    ).toEqual(["backend:go:gin", "frontend:typescript:next"]);
    expect(
      sanitizeTelemetryStackDimension("stackPartSelections", [
        "backend:go:gin",
        "backend:go:customer-private-tool",
      ]),
    ).toBeUndefined();
    expect(
      sanitizeTelemetryStackDimension(
        "stackPartRoles",
        Array.from({ length: 65 }, () => "backend"),
      ),
    ).toBeUndefined();
  });
});
