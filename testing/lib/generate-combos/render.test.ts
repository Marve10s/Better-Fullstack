import { describe, expect, it } from "bun:test";
import { createCliDefaultProjectConfigBase, type ProjectConfig } from "@better-fullstack/types";

import { buildCommand } from "./render";

describe("smoke combo command rendering", () => {
  it("includes mobile flags for React Native commands", () => {
    const config: ProjectConfig = {
      ...createCliDefaultProjectConfigBase("bun"),
      projectName: "mobile-smoke",
      relativePath: "mobile-smoke",
      projectDir: "/tmp/mobile-smoke",
      ecosystem: "react-native",
      frontend: ["native-unistyles"],
      mobileNavigation: "expo-router",
      mobileUI: "unistyles",
      mobileStorage: "none",
      mobileTesting: "none",
      mobilePush: "none",
      mobileOTA: "none",
      mobileDeepLinking: "none",
      git: false,
      install: false,
    };

    expect(buildCommand("mobile-smoke", config)).toContain(
      "--mobile-navigation expo-router --mobile-ui unistyles --mobile-storage none --mobile-testing none --mobile-push none --mobile-ota none --mobile-deep-linking none",
    );
  });
});
