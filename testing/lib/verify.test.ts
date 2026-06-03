import { describe, expect, it } from "bun:test";

import { getVerifier, verifyElixir } from "./verify";

describe("smoke verifiers", () => {
  it("routes Elixir smoke combos to the Elixir verifier", () => {
    expect(getVerifier("elixir")).toBe(verifyElixir);
  });
});
