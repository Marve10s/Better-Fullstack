import type { ProjectConfig } from "@better-fullstack/types";

import { makeConfig } from "@test/_fixtures/config-factory";
import { describe, expect, it } from "bun:test";
import path from "node:path";

import type { VirtualFile, VirtualNode } from "@/types";

import { dependencyVersionMap } from "@/dependencies/add-deps";
import {
  getUpdateType,
  scanTemplateVersions,
  selectAutomatedUpdates,
  type VersionInfo,
} from "@/dependencies/dependency-checker";
import {
  DEPENDENCY_UPDATE_POLICIES,
  getLatestChannelPinnedVersion,
  getGeneratedPackageJsonPins,
  getPinnedDependencyVersion,
  getTemplatePinnedVersion,
  NATIVE_DEPENDENCY_VERSIONS,
  NATIVE_PEER_DEPENDENCIES,
  TEMPLATE_DEPENDENCY_PINS,
} from "@/dependencies/dependency-update-policy";
import { generateVirtualProject } from "@/generator";
import { EMBEDDED_TEMPLATES } from "@/templates.generated";

const TEMPLATES_DIR = path.resolve(import.meta.dir, "../../templates");

const UNBOUNDED = "999999";

/** Lowest and highest versions an exact, tilde, or caret range lets an installer pick. */
function rangeBounds(range: string): [string, string] {
  const match = /^([~^]?)(\d+)\.(\d+)\.(\d+)$/.exec(range);
  if (!match) throw new Error(`Unsupported dependency range: ${range}`);
  const [, operator, major, minor, patch] = match;
  const lowest = `${major}.${minor}.${patch}`;
  if (operator === "") return [lowest, lowest];
  if (operator === "~" || major === "0") return [lowest, `${major}.${minor}.${UNBOUNDED}`];
  return [lowest, `${major}.${UNBOUNDED}.${UNBOUNDED}`];
}

/** Peer ranges from the policy that the declared dependency ranges can violate. */
function findPeerViolations(dependencies: Readonly<Record<string, string>>): string[] {
  const violations: string[] = [];
  for (const [name, peers] of Object.entries(NATIVE_PEER_DEPENDENCIES)) {
    const range = dependencies[name];
    if (range === undefined) continue;
    if (!/^~?\d/.test(range)) violations.push(`${name}@${range} can float to different peers`);
    for (const [peer, peerRange] of Object.entries(peers)) {
      const declared = dependencies[peer];
      if (declared === undefined) continue;
      if (!rangeBounds(declared).every((version) => Bun.semver.satisfies(version, peerRange))) {
        violations.push(`${name} needs ${peer}@${peerRange}, got ${declared}`);
      }
    }
  }
  return violations;
}

function listFiles(node: VirtualNode): VirtualFile[] {
  return node.type === "file" ? [node] : node.children.flatMap(listFiles);
}

type PackageJson = {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
};

async function generateNativePackageJson(config: ProjectConfig): Promise<Record<string, string>> {
  const result = await generateVirtualProject({ config, templates: EMBEDDED_TEMPLATES });
  expect(result.success).toBe(true);
  const file = result.tree
    ? listFiles(result.tree.root).find(({ path }) => path.endsWith("apps/native/package.json"))
    : undefined;
  if (!file) throw new Error("Generated project has no apps/native/package.json");
  const packageJson = JSON.parse(file.content) as PackageJson;
  return { ...packageJson.dependencies, ...packageJson.devDependencies };
}

const NATIVE_FRONTEND_UIS = [
  ["native-bare", "none"],
  ["native-bare", "tamagui"],
  ["native-bare", "gluestack-ui"],
  ["native-uniwind", "uniwind"],
  ["native-unistyles", "unistyles"],
] as const;

const NATIVE_STACKS = {
  "mobile only": {
    ecosystem: "react-native",
    backend: "none",
    runtime: "none",
    database: "none",
    orm: "none",
    api: "none",
    auth: "none",
  },
  "Hono, tRPC, and Better Auth": {
    ecosystem: "typescript",
    backend: "hono",
    runtime: "bun",
    database: "sqlite",
    orm: "drizzle",
    api: "trpc",
    auth: "better-auth",
    mobileDeepLinking: "expo-linking",
  },
  "every mobile option": {
    ecosystem: "react-native",
    backend: "none",
    runtime: "none",
    database: "none",
    orm: "none",
    api: "none",
    auth: "none",
    mobileStorage: "mmkv",
    mobilePush: "expo-notifications",
    mobileOTA: "expo-updates",
    mobileDeepLinking: "expo-linking",
    mobileLibraries: [
      "expo-sqlite",
      "expo-camera",
      "expo-image-picker",
      "expo-location",
      "expo-sensors",
      "expo-file-system",
      "expo-image",
      "expo-audio",
      "expo-video",
      "expo-contacts",
      "expo-calendar",
      "expo-local-authentication",
      "expo-sharing",
      "expo-clipboard",
      "expo-task-manager",
      "expo-background-task",
      "expo-maps",
      "expo-brightness",
      "expo-battery",
      "expo-screen-capture",
    ],
  },
} satisfies Record<string, Partial<ProjectConfig>>;

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

  it("keeps Redwood on the React 18 peers its framework packages require", () => {
    expect(getTemplatePinnedVersion("frontend/redwood/web/package.json.hbs", "react")).toBe(
      "18.3.1",
    );
    expect(
      getTemplatePinnedVersion("frontend/react/next/package.json.hbs", "react"),
    ).toBeUndefined();
    expect(getGeneratedPackageJsonPins(new Set(["@redwoodjs/web", "react"])).get("react")).toBe(
      "18.3.1",
    );
    expect(getGeneratedPackageJsonPins(new Set(["react"])).size).toBe(0);
    for (const pin of TEMPLATE_DEPENDENCY_PINS.filter(
      ({ marker }) => marker === "@redwoodjs/web",
    )) {
      for (const [name, version] of Object.entries(pin.versions)) {
        expect(version).not.toBe(dependencyVersionMap[name as keyof typeof dependencyVersionMap]);
      }
    }
  });

  it("keeps every template in sync with the version map or an explicit template pin", () => {
    expect(scanTemplateVersions(TEMPLATES_DIR).versionMismatches).toEqual([]);
  });

  it("keeps incomplete TanStack Router release trains out of the latest channel", () => {
    expect(getLatestChannelPinnedVersion("@tanstack/react-router")).toBe("1.170.41");
    expect(getLatestChannelPinnedVersion("@tanstack/router-plugin")).toBe("1.168.42");
    expect(getLatestChannelPinnedVersion("@tanstack/solid-router-devtools")).toBe("1.167.0");
    expect(getLatestChannelPinnedVersion("react")).toBeUndefined();
  });

  it("holds Auth.js on the v5 prerelease the generated code targets", () => {
    expect(dependencyVersionMap["next-auth"]).toBe("5.0.0-beta.32");
    expect(getLatestChannelPinnedVersion("next-auth")).toBe("5.0.0-beta.32");
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

  it("keeps React-coupled packages on the same release as react", () => {
    const { react } = dependencyVersionMap;
    expect(dependencyVersionMap).toMatchObject({
      "react-dom": react,
      "react-server-dom-webpack": react,
      "react-test-renderer": react,
    });
  });

  it("keeps the Better Auth family on the reviewed exact release", () => {
    expect(dependencyVersionMap).toMatchObject({
      "better-auth": "1.6.22",
      "@better-auth/expo": "1.6.22",
      "@better-auth/drizzle-adapter": "1.6.22",
      "@better-auth/prisma-adapter": "1.6.22",
      "@better-auth/mongo-adapter": "1.6.22",
    });
  });

  it("keeps native apps on the Expo SDK set in every channel and template sync", () => {
    expect(NATIVE_DEPENDENCY_VERSIONS).toMatchObject({
      react: "19.2.3",
      "react-native": "0.85.3",
      "react-native-reanimated": "4.3.1",
      "react-native-worklets": "0.8.3",
    });
    for (const variant of ["bare", "unistyles", "uniwind"]) {
      const template = `frontend/native/${variant}/package.json.hbs`;
      expect(getTemplatePinnedVersion(template, "react-native")).toBe("0.85.3");
    }
    const latestChannelPins = getGeneratedPackageJsonPins(new Set(["expo", "react"]));
    expect(latestChannelPins.get("react")).toBe("19.2.3");
    expect(latestChannelPins.get("react-native-worklets")).toBe("0.8.3");
    for (const [name, version] of Object.entries(dependencyVersionMap)) {
      if (name in NATIVE_DEPENDENCY_VERSIONS && name.startsWith("expo-")) {
        expect(getPinnedDependencyVersion(name)).toBe(version);
      }
    }
  });

  it("keeps the native dependency set inside its own peer ranges", () => {
    expect(findPeerViolations(NATIVE_DEPENDENCY_VERSIONS)).toEqual([]);
    expect(
      findPeerViolations({
        ...NATIVE_DEPENDENCY_VERSIONS,
        "react-native-reanimated": "^4.3.1",
        "react-native-worklets": "^0.11.4",
      }),
    ).toEqual([
      "react-native-reanimated@^4.3.1 can float to different peers",
      "react-native-reanimated needs react-native-worklets@0.8.x, got ^0.11.4",
      "react-native-worklets@^0.11.4 can float to different peers",
    ]);
  });

  for (const [stackName, stack] of Object.entries(NATIVE_STACKS)) {
    for (const [frontend, mobileUI] of NATIVE_FRONTEND_UIS) {
      for (const mobileNavigation of ["expo-router", "react-navigation"] as const) {
        it(`generates coupled native dependencies for ${frontend} with ${mobileUI} and ${mobileNavigation}, ${stackName}`, async () => {
          const dependencies = await generateNativePackageJson(
            makeConfig({
              ...stack,
              frontend: [frontend],
              mobileUI,
              mobileNavigation,
              mobileTesting: "react-native-testing-library",
              packageManager: "npm",
            }),
          );

          for (const [name, version] of Object.entries(dependencies)) {
            if (name in NATIVE_DEPENDENCY_VERSIONS) {
              expect(`${name}@${version}`).toBe(`${name}@${NATIVE_DEPENDENCY_VERSIONS[name]}`);
            }
          }
          expect(findPeerViolations(dependencies)).toEqual([]);
        });
      }
    }
  }

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
