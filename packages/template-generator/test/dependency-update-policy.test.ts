import { describe, expect, it } from "bun:test";

import { dependencyVersionMap } from "../src/utils/add-deps";
import {
  getUpdateType,
  selectAutomatedUpdates,
  type VersionInfo,
} from "../src/utils/dependency-checker";
import {
  DEPENDENCY_UPDATE_POLICIES,
  getLatestChannelPinnedVersion,
  getPinnedDependencyVersion,
} from "../src/utils/dependency-update-policy";

const candidate = (name: string, updateType: VersionInfo["updateType"]): VersionInfo => ({
  name,
  current: "^1.0.0",
  latest: "^2.0.0",
  updateType,
});

describe("dependency update policy", () => {
  it("keeps every policy pin synchronized with the canonical version map", () => {
    for (const [name, policy] of Object.entries(DEPENDENCY_UPDATE_POLICIES)) {
      if (policy.holdLatestChannel) {
        expect(policy.pinnedVersion).toBeDefined();
      }
      if (policy.pinnedVersion === undefined) continue;

      const canonicalVersion: string | undefined =
        dependencyVersionMap[name as keyof typeof dependencyVersionMap];

      expect(canonicalVersion).toBe(policy.pinnedVersion);
      expect(getPinnedDependencyVersion(name)).toBe(policy.pinnedVersion);
      if (policy.holdLatestChannel) {
        expect(getLatestChannelPinnedVersion(name)).toBe(policy.pinnedVersion);
      }
    }
  });

  it("keeps incomplete TanStack Router release trains out of the latest channel", () => {
    expect(getLatestChannelPinnedVersion("@tanstack/react-router")).toBe("1.170.18");
    expect(getLatestChannelPinnedVersion("@tanstack/router-plugin")).toBe("1.168.23");
    expect(getLatestChannelPinnedVersion("@tanstack/solid-router-devtools")).toBe("1.167.0");
    expect(getLatestChannelPinnedVersion("react")).toBeUndefined();
  });

  it("keeps the coupled OpenTelemetry packages on one exact release train", () => {
    expect(dependencyVersionMap).toMatchObject({
      "@opentelemetry/sdk-node": "0.220.0",
      "@opentelemetry/auto-instrumentations-node": "0.78.0",
      "@opentelemetry/exporter-trace-otlp-http": "0.220.0",
      "@opentelemetry/exporter-metrics-otlp-http": "0.220.0",
      "@opentelemetry/resources": "2.9.0",
      "@opentelemetry/sdk-metrics": "2.9.0",
    });
  });

  it("holds Expo 56 static exports on the verified Reanimated pair", () => {
    expect(dependencyVersionMap).toMatchObject({
      "react-native-reanimated": "^4.5.3",
      "react-native-worklets": "^0.11.4",
    });
    expect(getLatestChannelPinnedVersion("react-native-reanimated")).toBe("^4.5.3");
    expect(getLatestChannelPinnedVersion("react-native-worklets")).toBe("^0.11.4");
  });

  it("never automates downgrades", () => {
    const downgrade = candidate("example", "downgrade");

    expect(selectAutomatedUpdates([downgrade], "patch-minor")).toEqual([]);
    expect(selectAutomatedUpdates([downgrade], "all")).toEqual([]);
  });

  it("applies patch and minor updates in both modes", () => {
    const patch = candidate("patch-package", "patch");
    const minor = candidate("minor-package", "minor");

    expect(selectAutomatedUpdates([patch, minor], "patch-minor")).toEqual([patch, minor]);
    expect(selectAutomatedUpdates([patch, minor], "all")).toEqual([patch, minor]);
  });

  it("blocks majors unless the package is explicitly allowlisted", () => {
    const major = candidate("typescript", "major");

    expect(selectAutomatedUpdates([major], "patch-minor")).toEqual([]);
    expect(selectAutomatedUpdates([major], "all")).toEqual([]);
  });

  it("treats incompatible pre-1.0 range changes as breaking-equivalent", () => {
    expect(getUpdateType("^0.3.1", "^0.4.0")).toBe("major");
    expect(getUpdateType("^0.0.3", "^0.0.4")).toBe("major");
    expect(getUpdateType("^0.3.1", "^0.3.2")).toBe("patch");
    expect(getUpdateType("^3.0.260610-beta", "^3.0.0")).toBe("none");
    expect(getUpdateType("^1.1.0", "^1.0.0")).toBe("downgrade");
  });
});
