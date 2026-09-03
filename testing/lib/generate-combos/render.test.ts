import { createCliDefaultProjectConfigBase, type ProjectConfig } from "@better-fullstack/types";
import { buildCommand, formatNameFromFingerprint } from "@testing/lib/generate-combos/render";
import { describe, expect, it } from "bun:test";

describe("smoke combo command rendering", () => {
  it("keeps generated names safe for Phoenix test database identifiers", () => {
    const name = formatNameFromFingerprint({
      ecosystem: "elixir",
      elixirWebFramework: "phoenix-live-view",
      elixirOrm: "myxql",
      elixirApi: "grpc",
      elixirRealtime: "channels",
      elixirDeploy: "mix-release",
    });

    expect(name.length).toBeLessThanOrEqual(58);
    expect(`${name.replaceAll("-", "_")}_test`.length).toBeLessThanOrEqual(63);
    expect(name).toMatch(/-[a-z0-9]{6}$/);
  });

  it("preserves unique digests when long generated names are truncated", () => {
    const commonFingerprint = {
      ecosystem: "elixir",
      elixirWebFramework: "phoenix-live-view",
      elixirOrm: "myxql",
      elixirApi: "grpc",
      elixirRealtime: "channels",
      elixirDeploy: "mix-release",
    } as const;

    const first = formatNameFromFingerprint({ ...commonFingerprint, elixirJobs: "oban" });
    const second = formatNameFromFingerprint({ ...commonFingerprint, elixirJobs: "broadway" });

    expect(first).not.toBe(second);
    expect(first.length).toBeLessThanOrEqual(58);
    expect(second.length).toBeLessThanOrEqual(58);
  });

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

  it("includes integrations for non-interactive TypeScript smoke commands", () => {
    const config: ProjectConfig = {
      ...createCliDefaultProjectConfigBase("bun"),
      projectName: "nango-smoke",
      relativePath: "nango-smoke",
      projectDir: "/tmp/nango-smoke",
      ecosystem: "typescript",
      integrations: "nango",
      git: false,
      install: false,
    };

    expect(buildCommand("nango-smoke", config)).toContain("--integrations nango");
  });

  it("includes e-commerce for non-interactive TypeScript smoke commands", () => {
    const config: ProjectConfig = {
      ...createCliDefaultProjectConfigBase("bun"),
      projectName: "medusa-smoke",
      relativePath: "medusa-smoke",
      projectDir: "/tmp/medusa-smoke",
      ecosystem: "typescript",
      ecommerce: "medusa",
      git: false,
      install: false,
    };

    expect(buildCommand("medusa-smoke", config)).toContain("--ecommerce medusa");
  });

  it("includes WebMCP for non-interactive TypeScript smoke commands", () => {
    const config: ProjectConfig = {
      ...createCliDefaultProjectConfigBase("bun"),
      projectName: "webmcp-smoke",
      relativePath: "webmcp-smoke",
      projectDir: "/tmp/webmcp-smoke",
      ecosystem: "typescript",
      webMcp: "enabled",
      git: false,
      install: false,
    };

    expect(buildCommand("webmcp-smoke", config)).toContain("--web-mcp enabled");
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
      elixirI18n: "gettext",
      elixirHttpServer: "bandit",
      elixirApplicationFramework: "ash",
      elixirDocumentation: "ex_doc",
      elixirClustering: "libcluster",
      elixirDeploy: "none",
      git: false,
      install: false,
    };

    expect(buildCommand("elixir-smoke", config)).toContain(
      "--elixir-web-framework phoenix --elixir-orm ecto-sql --elixir-auth none --elixir-api rest --elixir-realtime channels --elixir-jobs none --elixir-validation ecto-changesets --elixir-http req --elixir-json jason --elixir-email none --elixir-caching none --elixir-observability telemetry --elixir-testing ex_unit --elixir-quality credo --elixir-i18n gettext --elixir-http-server bandit --elixir-application-framework ash --elixir-documentation ex_doc --elixir-clustering libcluster --elixir-deploy none",
    );
  });

  it("includes every expanded Python flag for non-interactive smoke commands", () => {
    const config: ProjectConfig = {
      ...createCliDefaultProjectConfigBase("bun"),
      projectName: "python-smoke",
      relativePath: "python-smoke",
      projectDir: "/tmp/python-smoke",
      ecosystem: "python",
      pythonCloudSdk: "boto3",
      pythonHttpClient: "requests",
      pythonData: ["numpy", "pandas"],
      pythonMedia: "pillow",
      pythonServer: "gunicorn",
      pythonPackageManager: "poetry",
      pythonMessageQueue: "confluent-kafka",
      git: false,
      install: false,
    };

    expect(buildCommand("python-smoke", config)).toContain(
      "--python-cloud-sdk boto3 --python-http-client requests --python-data numpy pandas --python-media pillow --python-server gunicorn --python-package-manager poetry --python-message-queue confluent-kafka",
    );
  });
});
