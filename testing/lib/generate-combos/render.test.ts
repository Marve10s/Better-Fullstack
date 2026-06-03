import { createCliDefaultProjectConfigBase, type ProjectConfig } from "@better-fullstack/types";
import { describe, expect, it } from "bun:test";

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

  it("includes Elixir flags for Elixir commands", () => {
    const config: ProjectConfig = {
      ...createCliDefaultProjectConfigBase("bun"),
      projectName: "elixir-smoke",
      relativePath: "elixir-smoke",
      projectDir: "/tmp/elixir-smoke",
      ecosystem: "elixir",
      elixirWebFramework: "phoenix",
      elixirOrm: "ecto-sql",
      elixirAuth: "none",
      elixirApi: "rest",
      elixirRealtime: "channels",
      elixirJobs: "none",
      elixirValidation: "ecto-changesets",
      elixirHttp: "req",
      elixirJson: "jason",
      elixirEmail: "none",
      elixirCaching: "none",
      elixirObservability: "telemetry",
      elixirTesting: "ex_unit",
      elixirQuality: "credo",
      elixirDeploy: "none",
      git: false,
      install: false,
    };

    expect(buildCommand("elixir-smoke", config)).toContain(
      "--elixir-web-framework phoenix --elixir-orm ecto-sql --elixir-auth none --elixir-api rest --elixir-realtime channels --elixir-jobs none --elixir-validation ecto-changesets --elixir-http req --elixir-json jason --elixir-email none --elixir-caching none --elixir-observability telemetry --elixir-testing ex_unit --elixir-quality credo --elixir-deploy none",
    );
  });
});
