import { afterEach, describe, expect, it } from "bun:test";

import { getUserPkgManager } from "../src/utils/get-package-manager";

const ORIGINAL_USER_AGENT = process.env.npm_config_user_agent;

afterEach(() => {
  if (ORIGINAL_USER_AGENT === undefined) {
    delete process.env.npm_config_user_agent;
    return;
  }

  process.env.npm_config_user_agent = ORIGINAL_USER_AGENT;
});

describe("getUserPkgManager", () => {
  it("detects npm user agents", () => {
    process.env.npm_config_user_agent = "npm/10.9.0 node/v22.0.0 darwin arm64 workspaces/false";
    expect(getUserPkgManager()).toBe("npm");
  });

  it("detects pnpm user agents", () => {
    process.env.npm_config_user_agent = "pnpm/9.15.1 npm/? node/v22.0.0 darwin arm64";
    expect(getUserPkgManager()).toBe("pnpm");
  });

  it("detects bun user agents", () => {
    process.env.npm_config_user_agent = "bun/1.3.9 npm/? node/v24.0.0 darwin arm64";
    expect(getUserPkgManager()).toBe("bun");
  });

  it("detects yarn user agents", () => {
    process.env.npm_config_user_agent = "yarn/4.6.0 npm/? node/v22.0.0 darwin arm64";
    expect(getUserPkgManager()).toBe("yarn");
  });

  it("falls back to npm when the user agent is missing", () => {
    delete process.env.npm_config_user_agent;
    expect(getUserPkgManager()).toBe("npm");
  });
});
