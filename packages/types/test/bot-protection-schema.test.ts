import { describe, expect, it } from "bun:test";

import { BetterTStackConfigSchema, ProjectConfigSchema } from "../src/schemas";

describe("bot protection schema compatibility", () => {
  it("defaults old project and bts configs to no bot protection", () => {
    expect(ProjectConfigSchema.shape.botProtection.parse(undefined)).toBe("none");
    expect(BetterTStackConfigSchema.shape.botProtection.parse(undefined)).toBe("none");
  });
});
