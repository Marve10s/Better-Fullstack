import { getVerifier, runWithRegistryPropagationRetry, verifyElixir } from "@testing/lib/verify";
import { describe, expect, it } from "bun:test";

describe("smoke verifiers", () => {
  it("routes Elixir smoke combos to the Elixir verifier", () => {
    expect(getVerifier("elixir")).toBe(verifyElixir);
  });

  it("retries short npm publication races before treating an install as broken", async () => {
    const sleeps: number[] = [];
    let attempts = 0;

    const result = await runWithRegistryPropagationRetry(
      async () => {
        attempts++;
        return attempts === 1
          ? {
              step: "install",
              success: false,
              durationMs: 5,
              stderr:
                'error: No version matching "7.0.88" found for specifier "ai" (but package exists)',
              classification: "template",
            }
          : { step: "install", success: true, durationMs: 7, stdout: "x".repeat(4000) };
      },
      {
        delaysMs: [20, 40],
        sleep: async (durationMs) => {
          sleeps.push(durationMs);
        },
      },
    );

    expect(result.success).toBe(true);
    expect(result.durationMs).toBe(32);
    expect(result.stdout).toContain("Registry propagation attempts: 2.");
    expect(result.stdout?.length).toBeLessThanOrEqual(4000);
    expect(attempts).toBe(2);
    expect(sleeps).toEqual([20]);
  });

  it("keeps a missing dependency version gating after bounded retries", async () => {
    let attempts = 0;
    const result = await runWithRegistryPropagationRetry(
      async () => {
        attempts++;
        return {
          step: "install",
          success: false,
          durationMs: 1,
          stderr:
            'error: No version matching "99.0.0" found for specifier "ai" (but package exists)',
          classification: "template",
        };
      },
      { delaysMs: [0, 0], sleep: async () => {} },
    );

    expect(result.success).toBe(false);
    expect(result.classification).toBe("template");
    expect(attempts).toBe(3);
  });
});
