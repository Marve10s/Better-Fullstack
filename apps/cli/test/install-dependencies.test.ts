import { describe, expect, it } from "bun:test";

import { getInstallArgs, getInstallEnvironment } from "../src/helpers/core/install-dependencies";

describe("getInstallEnvironment", () => {
  it("disables immutable Yarn CI defaults for fresh scaffolds", () => {
    expect(getInstallEnvironment("yarn")).toEqual({
      YARN_ENABLE_HARDENED_MODE: "0",
      YARN_ENABLE_IMMUTABLE_INSTALLS: "false",
    });
  });

  it("leaves non-Yarn installs unchanged", () => {
    expect(getInstallEnvironment("npm")).toBeUndefined();
    expect(getInstallEnvironment("pnpm")).toBeUndefined();
    expect(getInstallEnvironment("bun")).toBeUndefined();
  });
});

describe("getInstallArgs", () => {
  it("allows pnpm dependency builds for fresh scaffolds", () => {
    expect(getInstallArgs("pnpm")).toEqual(["install", "--dangerously-allow-all-builds"]);
  });

  it("uses the default install command for other package managers", () => {
    expect(getInstallArgs("npm")).toEqual(["install"]);
    expect(getInstallArgs("bun")).toEqual(["install"]);
    expect(getInstallArgs("yarn")).toEqual(["install"]);
  });
});
