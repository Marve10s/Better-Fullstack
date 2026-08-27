import { getVerifier, verifyElixir } from "@testing/lib/verify";
import { describe, expect, it } from "bun:test";

describe("smoke verifiers", () => {
  it("routes Elixir smoke combos to the Elixir verifier", () => {
    expect(getVerifier("elixir")).toBe(verifyElixir);
  });
});
