import { describe, expect, it } from "bun:test";

import {
  beginBuilderZipAttempt,
  classifyBuilderRunFailure,
  classifyBuilderZipFailure,
  failureDurationMs,
  shouldReportBuilderRunFailure,
  type BuilderRunFailureReason,
  type BuilderRunFailureStage,
} from "../src/lib/builder-failure-analytics";
import { BrowserRuntimeError } from "../src/lib/webcontainer-runtime";

describe("builder failure analytics", () => {
  it("maps each operation to a stable, low-cardinality reason", () => {
    const cases: [BuilderRunFailureStage, BuilderRunFailureReason][] = [
      ["generation", "generation_failed"],
      ["browser_support", "browser_runtime_unsupported"],
      ["runtime_boot", "runtime_boot_failed"],
      ["project_mount", "project_mount_failed"],
      ["source_sync", "source_sync_failed"],
      ["dependency_install", "dependency_install_failed"],
      ["server_start", "server_start_failed"],
      ["server_timeout", "server_ready_timeout"],
      ["server_exit", "server_process_exit"],
    ];

    for (const [stage, reason] of cases) {
      expect(classifyBuilderRunFailure(stage)).toEqual({ stage, reason });
    }
  });

  it("uses typed runtime codes to separate install exits, timeouts, and server exits", () => {
    expect(
      classifyBuilderRunFailure(
        "dependency_install",
        new BrowserRuntimeError("dependency_install_exit", "npm exited with private output"),
      ),
    ).toEqual({ stage: "dependency_install", reason: "dependency_install_exit" });
    expect(classifyBuilderRunFailure("server_start", { code: "server_ready_timeout" })).toEqual({
      stage: "server_timeout",
      reason: "server_ready_timeout",
    });
    expect(classifyBuilderRunFailure("server_start", { code: "server_process_exit" })).toEqual({
      stage: "server_exit",
      reason: "server_process_exit",
    });
  });

  it("never exposes exception messages or other unrecognized fields", () => {
    const classified = classifyBuilderRunFailure("runtime_boot", {
      message: "secret environment value",
      stack: "/private/project/source.ts",
      code: "unrecognized_internal_code",
    });

    expect(classified).toEqual({ stage: "runtime_boot", reason: "runtime_boot_failed" });
    expect(JSON.stringify(classified)).not.toContain("secret");
    expect(JSON.stringify(classified)).not.toContain("/private");
  });

  it("classifies archive and browser download failures separately", () => {
    expect(classifyBuilderZipFailure("archive_generation")).toEqual({
      stage: "archive_generation",
      reason: "archive_generation_failed",
    });
    expect(classifyBuilderZipFailure("browser_download")).toEqual({
      stage: "browser_download",
      reason: "browser_download_failed",
    });
  });

  it("tracks ZIP retries independently for each effective stack", () => {
    const firstAlpha = beginBuilderZipAttempt(
      { stackSignature: "", attemptCount: 0 },
      "stack-alpha",
    );
    expect(firstAlpha.isRetry).toBe(false);

    const retryAlpha = beginBuilderZipAttempt(firstAlpha.nextState, "stack-alpha");
    expect(retryAlpha.isRetry).toBe(true);

    const firstBeta = beginBuilderZipAttempt(retryAlpha.nextState, "stack-beta");
    expect(firstBeta.isRetry).toBe(false);
    expect(firstBeta.nextState).toEqual({ stackSignature: "stack-beta", attemptCount: 1 });
  });

  it("normalizes duration and rejects stale or duplicate run failures", () => {
    expect(failureDurationMs(100.2, 142.8)).toBe(43);
    expect(failureDurationMs(200, 100)).toBe(0);
    expect(failureDurationMs(Number.NaN, 100)).toBe(0);

    expect(shouldReportBuilderRunFailure(7, 7, 6)).toBe(true);
    expect(shouldReportBuilderRunFailure(8, 7, 6)).toBe(false);
    expect(shouldReportBuilderRunFailure(7, 7, 7)).toBe(false);
  });
});
