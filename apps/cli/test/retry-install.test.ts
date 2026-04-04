import { describe, expect, it } from "bun:test";

import { runInstallWithRetries } from "../src/helpers/addons/retry-install";

describe("runInstallWithRetries", () => {
  it("retries transient failures and eventually succeeds", async () => {
    let attempts = 0;
    const sleeps: number[] = [];

    const result = await runInstallWithRetries({
      description: "install test dependency",
      maxAttempts: 3,
      initialDelayMs: 100,
      sleep: async (ms) => {
        sleeps.push(ms);
      },
      run: async () => {
        attempts++;
        if (attempts < 3) {
          throw new Error(`temporary failure ${attempts}`);
        }
      },
    });

    expect(result).toBe(true);
    expect(attempts).toBe(3);
    expect(sleeps).toEqual([100, 200]);
  });

  it("stops after the final failed attempt", async () => {
    let attempts = 0;
    const sleeps: number[] = [];

    const result = await runInstallWithRetries({
      description: "install test dependency",
      maxAttempts: 3,
      initialDelayMs: 50,
      sleep: async (ms) => {
        sleeps.push(ms);
      },
      run: async () => {
        attempts++;
        throw new Error("still failing");
      },
    });

    expect(result).toBe(false);
    expect(attempts).toBe(3);
    expect(sleeps).toEqual([50, 100]);
  });
});
