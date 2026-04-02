import { describe, expect, it } from "bun:test";

import { DEFAULT_STACK } from "../src/lib/constant";
import {
  createStackSearchParams,
  parseStackFromUrlRecord,
} from "../src/lib/stack-url-state.shared";
import { generateStackCommand } from "../src/lib/stack-utils";

describe("generateStackCommand", () => {
  it("includes version channel flags when using non-stable releases", () => {
    const latestCommand = generateStackCommand({
      ...DEFAULT_STACK,
      projectName: "latest-app",
      versionChannel: "latest",
    });

    expect(latestCommand).toContain("--version-channel latest");
  });

  it("omits version channel for non-TypeScript ecosystems", () => {
    const betaRustCommand = generateStackCommand({
      ...DEFAULT_STACK,
      ecosystem: "rust",
      projectName: "beta-rust-app",
      versionChannel: "beta",
    });

    expect(betaRustCommand).not.toContain("--version-channel");
    expect(betaRustCommand).toContain("--ecosystem rust");
  });

  it("omits the version channel flag for the stable default", () => {
    const command = generateStackCommand({
      ...DEFAULT_STACK,
      projectName: "stable-app",
    });

    expect(command).not.toContain("--version-channel stable");
  });

  it("includes typesense in generated commands", () => {
    const command = generateStackCommand({
      ...DEFAULT_STACK,
      projectName: "typesense-app",
      search: "typesense",
    });

    expect(command).toContain("--search typesense");
  });
});

describe("stack URL state helpers", () => {
  it("round-trips version channel through shared URL helpers", () => {
    const params = createStackSearchParams({
      ...DEFAULT_STACK,
      projectName: "url-app",
      versionChannel: "beta",
    });

    expect(params.get("vc")).toBe("beta");

    const parsed = parseStackFromUrlRecord(Object.fromEntries(params.entries()));

    expect(parsed.projectName).toBe("url-app");
    expect(parsed.versionChannel).toBe("beta");
  });
});
