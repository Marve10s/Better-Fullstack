import { describe, expect, it } from "bun:test";

import { getServerDeploymentOptions } from "../src/prompts/server-deploy";

describe("server deployment prompt", () => {
  it("does not offer Netlify unless the runtime is Node", async () => {
    expect(getServerDeploymentOptions("bun").map((option) => option.value)).not.toContain(
      "netlify",
    );

    expect(getServerDeploymentOptions("node").map((option) => option.value)).toContain("netlify");
  });
});
