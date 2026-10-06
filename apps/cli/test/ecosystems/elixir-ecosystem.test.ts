import {
  ELIXIR_API_VALUES,
  ELIXIR_APPLICATION_FRAMEWORK_VALUES,
  ELIXIR_AUTH_VALUES,
  ELIXIR_CACHING_VALUES,
  ELIXIR_CLUSTERING_VALUES,
  ELIXIR_DOCUMENTATION_VALUES,
  ELIXIR_EMAIL_VALUES,
  ELIXIR_HTTP_SERVER_VALUES,
  ELIXIR_HTTP_VALUES,
  ELIXIR_I18N_VALUES,
  ELIXIR_LIBRARIES_VALUES,
  ELIXIR_OBSERVABILITY_VALUES,
  ELIXIR_ORM_VALUES,
  ELIXIR_QUALITY_VALUES,
  ELIXIR_TESTING_VALUES,
} from "@better-fullstack/types";
import { describe, expect, it } from "bun:test";

import { createVirtual } from "@/index";
import {
  getVirtualTreeFileContent,
  hasVirtualFile,
  listVirtualTreeFilePaths,
  listVirtualTreeFiles,
} from "@test/support/virtual-tree-utils";

const base = {
  ecosystem: "elixir" as const,
  elixirWebFramework: "phoenix" as const,
  elixirRealtime: "channels" as const,
  elixirJobs: "none" as const,
  elixirValidation: "ecto-changesets" as const,
  elixirJson: "jason" as const,
  elixirDeploy: "none" as const,
};

describe("Elixir library expansion", () => {
  it("exposes all twenty roadmap additions through canonical schemas", () => {
    expect(ELIXIR_I18N_VALUES).toContain("gettext");
    expect(ELIXIR_HTTP_SERVER_VALUES).toContain("bandit");
    expect(ELIXIR_OBSERVABILITY_VALUES).toContain("sentry");
    expect(ELIXIR_HTTP_VALUES).toContain("tesla");
    expect(ELIXIR_LIBRARIES_VALUES).toEqual(expect.arrayContaining(["ex_aws", "floki", "rustler"]));
    expect(ELIXIR_CACHING_VALUES).toContain("redix");
    expect(ELIXIR_APPLICATION_FRAMEWORK_VALUES).toContain("ash");
    expect(ELIXIR_EMAIL_VALUES).toContain("bamboo");
    expect(ELIXIR_API_VALUES).toContain("open_api_spex");
    expect(ELIXIR_DOCUMENTATION_VALUES).toContain("ex_doc");
    expect(ELIXIR_QUALITY_VALUES).toEqual(expect.arrayContaining(["excoveralls", "mix_audit"]));
    expect(ELIXIR_CLUSTERING_VALUES).toContain("libcluster");
    expect(ELIXIR_TESTING_VALUES).toEqual(expect.arrayContaining(["stream_data", "ex_machina"]));
    expect(ELIXIR_ORM_VALUES).toEqual(expect.arrayContaining(["myxql", "ecto_sqlite3"]));
    expect(ELIXIR_AUTH_VALUES).toContain("pow");
  });

  it("generates the integrated Phoenix, MySQL, tooling, and native-extension stack", async () => {
    const result = await createVirtual({
      ...base,
      projectName: "elixir-roadmap-full",
      elixirOrm: "myxql",
      elixirAuth: "pow",
      elixirApi: "open_api_spex",
      elixirHttp: "tesla",
      elixirEmail: "bamboo",
      elixirCaching: "redix",
      elixirObservability: "sentry",
      elixirTesting: "ex_machina",
      elixirQuality: "mix_audit",
      elixirI18n: "gettext",
      elixirHttpServer: "bandit",
      elixirApplicationFramework: "ash",
      elixirDocumentation: "ex_doc",
      elixirClustering: "libcluster",
      elixirLibraries: ["ex_aws", "floki", "rustler"],
    });

    expect(result.success).toBe(true);
    const tree = result.tree!;
    const mix = getVirtualTreeFileContent(tree, "mix.exs");
    expect(mix).toContain('{:myxql, "~> 0.9"}');
    expect(mix).toContain('{:bandit, "~> 1.12"}');
    expect(mix).toContain('{:ash, "~> 3.29"}');
    expect(mix).toContain('{:rustler, "~> 0.38"}');
    expect(mix).toContain('{:hackney, "~> 4.0 and >= 4.0.2"}');
    expect(mix).not.toContain(":plug_cowboy");
    expect(getVirtualTreeFileContent(tree, "config/config.exs")).toContain(
      "client: Sentry.HackneyClient",
    );
    expect(getVirtualTreeFileContent(tree, "lib/elixir_roadmap_full/repo.ex")).toContain(
      "Ecto.Adapters.MyXQL",
    );
    expect(getVirtualTreeFileContent(tree, "lib/elixir_roadmap_full/http_client.ex")).toContain(
      "Tesla.Adapter.Hackney",
    );
    expect(getVirtualTreeFileContent(tree, "lib/elixir_roadmap_full/cache.ex")).toContain(
      "Redix.command",
    );
    const router = getVirtualTreeFileContent(tree, "lib/elixir_roadmap_full_web/router.ex");
    expect(router).toContain("pow_routes()");
    expect(router).toContain(
      "plug OpenApiSpex.Plug.PutApiSpec, module: ElixirRoadmapFullWeb.ApiSpec",
    );
    expect(router).toContain('forward "/openapi", OpenApiSpex.Plug.RenderSpec, []');
    expect(hasVirtualFile(tree.root, "lib/elixir_roadmap_full_web/api_spec.ex")).toBe(true);
    expect(hasVirtualFile(tree.root, "lib/elixir_roadmap_full/catalog_domain.ex")).toBe(true);
    expect(hasVirtualFile(tree.root, "native/string_ops/Cargo.toml")).toBe(true);
    expect(hasVirtualFile(tree.root, "test/support/factory.ex")).toBe(true);
  });

  it("keeps Ash domains independent of Ecto", async () => {
    const result = await createVirtual({
      ...base,
      projectName: "elixir-ash-ets",
      elixirOrm: "none",
      elixirAuth: "none",
      elixirApi: "rest",
      elixirHttp: "req",
      elixirEmail: "none",
      elixirCaching: "none",
      elixirObservability: "telemetry",
      elixirTesting: "ex_unit",
      elixirQuality: "none",
      elixirI18n: "none",
      elixirHttpServer: "bandit",
      elixirApplicationFramework: "ash",
      elixirDocumentation: "none",
      elixirClustering: "none",
      elixirLibraries: [],
    });

    expect(result.success).toBe(true);
    const tree = result.tree!;
    expect(hasVirtualFile(tree.root, "lib/elixir_ash_ets/catalog_domain.ex")).toBe(true);
    expect(hasVirtualFile(tree.root, "lib/elixir_ash_ets/resources/item.ex")).toBe(true);
    expect(hasVirtualFile(tree.root, "lib/elixir_ash_ets/catalog.ex")).toBe(false);
    expect(getVirtualTreeFileContent(tree, "config/config.exs")).toContain(
      "config :ash, default_string_length_count: :codepoints",
    );
  });

  it("keeps Tesla and Phoenix OpenTelemetry on compatible semantic conventions", async () => {
    const result = await createVirtual({
      ...base,
      projectName: "elixir-tesla-opentelemetry",
      elixirOrm: "none",
      elixirAuth: "none",
      elixirApi: "rest",
      elixirHttp: "tesla",
      elixirEmail: "none",
      elixirCaching: "none",
      elixirObservability: "opentelemetry",
      elixirTesting: "ex_unit",
      elixirQuality: "none",
      elixirI18n: "gettext",
      elixirHttpServer: "cowboy",
      elixirApplicationFramework: "none",
      elixirDocumentation: "none",
      elixirClustering: "none",
      elixirLibraries: [],
    });

    expect(result.success).toBe(true);
    const mix = getVirtualTreeFileContent(result.tree!, "mix.exs");
    expect(mix).toContain('{:tesla, "~> 1.20"}');
    expect(mix).toContain('{:opentelemetry_phoenix, "~> 2.0"}');
    expect(mix).toContain('{:opentelemetry_cowboy, "~> 1.0"}');
    expect(mix).not.toContain('{:opentelemetry_phoenix, "~> 1.2"}');
    const application = getVirtualTreeFileContent(
      result.tree!,
      "lib/elixir_tesla_opentelemetry/application.ex",
    );
    expect(application).toContain(":opentelemetry_cowboy.setup()");
    expect(application).toContain(
      "OpentelemetryPhoenix.setup(adapter: :cowboy2)",
    );

    const banditResult = await createVirtual({
      ...base,
      projectName: "elixir-bandit-opentelemetry",
      elixirOrm: "none",
      elixirAuth: "none",
      elixirApi: "rest",
      elixirHttp: "req",
      elixirEmail: "none",
      elixirCaching: "none",
      elixirObservability: "opentelemetry",
      elixirTesting: "ex_unit",
      elixirQuality: "none",
      elixirI18n: "gettext",
      elixirHttpServer: "bandit",
      elixirApplicationFramework: "none",
      elixirDocumentation: "none",
      elixirClustering: "none",
      elixirLibraries: [],
    });

    expect(banditResult.success).toBe(true);
    const banditMix = getVirtualTreeFileContent(banditResult.tree!, "mix.exs");
    expect(banditMix).toContain('{:opentelemetry_bandit, "~> 0.3"}');
    const banditApplication = getVirtualTreeFileContent(
      banditResult.tree!,
      "lib/elixir_bandit_opentelemetry/application.ex",
    );
    expect(banditApplication).toContain("OpentelemetryBandit.setup()");
    expect(banditApplication).toContain(
      "OpentelemetryPhoenix.setup(adapter: :bandit)",
    );
  });

  it("includes Rustler sources and toolchains in deploy images", async () => {
    const result = await createVirtual({
      ...base,
      projectName: "elixir-rustler-deploy",
      elixirOrm: "ecto-sql",
      elixirAuth: "none",
      elixirApi: "rest",
      elixirHttp: "req",
      elixirEmail: "none",
      elixirCaching: "none",
      elixirObservability: "telemetry",
      elixirTesting: "ex_unit",
      elixirQuality: "none",
      elixirI18n: "none",
      elixirHttpServer: "bandit",
      elixirApplicationFramework: "none",
      elixirDocumentation: "none",
      elixirClustering: "none",
      elixirDeploy: "docker",
      elixirLibraries: ["rustler"],
    });

    expect(result.success).toBe(true);
    const dockerfile = getVirtualTreeFileContent(result.tree!, "Dockerfile");
    expect(dockerfile).toContain("build-essential git cargo rustc");
    expect(dockerfile).toContain("COPY native native");
  });

  it("supports ExDoc for plain Elixir projects", async () => {
    const result = await createVirtual({
      ...base,
      projectName: "elixir-plain-docs",
      elixirWebFramework: "none",
      elixirOrm: "none",
      elixirAuth: "none",
      elixirApi: "none",
      elixirRealtime: "none",
      elixirHttp: "none",
      elixirEmail: "none",
      elixirCaching: "none",
      elixirObservability: "none",
      elixirTesting: "none",
      elixirQuality: "none",
      elixirI18n: "none",
      elixirHttpServer: "none",
      elixirApplicationFramework: "none",
      elixirDocumentation: "ex_doc",
      elixirClustering: "none",
      elixirLibraries: [],
    });

    expect(result.success).toBe(true);
    expect(getVirtualTreeFileContent(result.tree!, "mix.exs")).toContain(
      '{:ex_doc, "~> 0.40", only: :dev, runtime: false}',
    );
  });

  it("creates persistent SQLite paths for release deployments", async () => {
    const result = await createVirtual({
      ...base,
      projectName: "elixir-sqlite-release",
      elixirOrm: "ecto_sqlite3",
      elixirAuth: "none",
      elixirApi: "rest",
      elixirHttp: "req",
      elixirEmail: "none",
      elixirCaching: "none",
      elixirObservability: "telemetry",
      elixirTesting: "ex_unit",
      elixirQuality: "none",
      elixirI18n: "none",
      elixirHttpServer: "bandit",
      elixirApplicationFramework: "none",
      elixirDocumentation: "none",
      elixirClustering: "none",
      elixirDeploy: "fly",
      elixirLibraries: [],
    });

    expect(result.success).toBe(true);
    const tree = result.tree!;
    const runtime = getVirtualTreeFileContent(tree, "config/runtime.exs");
    expect(runtime).toContain('System.get_env("RELEASE_ROOT") || File.cwd!()');
    expect(runtime).toContain("File.mkdir_p!(Path.dirname(database_path))");
    const dockerfile = getVirtualTreeFileContent(tree, "Dockerfile");
    expect(dockerfile).toContain("ENV DATABASE_PATH=/data/elixir_sqlite_release.db");
    expect(dockerfile).toContain('VOLUME ["/data"]');
    const fly = getVirtualTreeFileContent(tree, "fly.toml");
    expect(fly).toContain('[mounts]');
    expect(fly).toContain('destination = "/data"');
  });

  it("generates SQLite, property testing, and ExCoveralls without PostgreSQL wiring", async () => {
    const result = await createVirtual({
      ...base,
      projectName: "elixir-sqlite-quality",
      elixirOrm: "ecto_sqlite3",
      elixirAuth: "none",
      elixirApi: "rest",
      elixirHttp: "req",
      elixirEmail: "none",
      elixirCaching: "none",
      elixirObservability: "telemetry",
      elixirTesting: "stream_data",
      elixirQuality: "excoveralls",
      elixirI18n: "none",
      elixirHttpServer: "cowboy",
      elixirApplicationFramework: "none",
      elixirDocumentation: "none",
      elixirClustering: "none",
      elixirLibraries: [],
    });

    expect(result.success).toBe(true);
    const tree = result.tree!;
    const mix = getVirtualTreeFileContent(tree, "mix.exs");
    expect(mix).toContain('{:ecto_sqlite3, "~> 0.24"}');
    expect(mix).toContain('{:stream_data, "~> 1.3", only: :test}');
    expect(mix).toContain("test_coverage: [tool: ExCoveralls]");
    expect(mix).not.toContain(":postgrex");
    expect(getVirtualTreeFileContent(tree, "lib/elixir_sqlite_quality/repo.ex")).toContain(
      "Ecto.Adapters.SQLite3",
    );
    expect(hasVirtualFile(tree.root, "test/elixir_sqlite_quality/property_test.exs")).toBe(true);
  });

  it("emits Phoenix dev, test, and prod config and a session-aware API pipeline", async () => {
    const result = await createVirtual({
      ...base,
      projectName: "elixir-phoenix-runtime",
      elixirOrm: "ecto-sql",
      elixirAuth: "phx-gen-auth",
      elixirApi: "rest",
      elixirDeploy: "docker",
    });

    expect(result.success).toBe(true);
    const tree = result.tree!;
    for (const env of ["dev", "test"]) {
      const config = getVirtualTreeFileContent(tree, `config/${env}.exs`);
      const secret = config?.match(/secret_key_base: "([^"]+)"/)?.[1] ?? "";
      expect(secret.length).toBeGreaterThanOrEqual(64);
    }
    expect(getVirtualTreeFileContent(tree, "config/config.exs")).toContain(
      'import_config "#{config_env()}.exs"',
    );
    expect(hasVirtualFile(tree.root, "config/prod.exs")).toBe(true);
    expect(getVirtualTreeFileContent(tree, "config/dev.exs")).toContain(
      "config :elixir_phoenix_runtime, dev_routes: true",
    );
    const router = getVirtualTreeFileContent(tree, "lib/elixir_phoenix_runtime_web/router.ex");
    const apiPipeline = router?.match(/pipeline :api do[\s\S]*?\n  end/)?.[0];
    expect(apiPipeline).toContain("plug :fetch_session");
  });

  it("only lets JSON requests reach the phx-gen-auth session actions", async () => {
    const withAuth = await createVirtual({
      ...base,
      projectName: "elixir-session-json",
      elixirOrm: "ecto-sql",
      elixirAuth: "phx-gen-auth",
      elixirApi: "rest",
    });

    expect(withAuth.success).toBe(true);
    const router = getVirtualTreeFileContent(withAuth.tree!, "lib/elixir_session_json_web/router.ex");
    const sessionActions = [...(router ?? "").matchAll(/UserSessionController, :(\w+)/g)].map(
      (match) => match[1],
    );
    expect(sessionActions).toEqual(["register", "login", "logout"]);
    const controller = getVirtualTreeFileContent(
      withAuth.tree!,
      "lib/elixir_session_json_web/controllers/user_session_controller.ex",
    );
    const guardedActions = controller
      ?.match(/plug :require_json_body when action in \[([^\]]*)\]/)?.[1]
      ?.split(",")
      .map((action) => action.trim().replace(/^:/, ""));
    expect(guardedActions).toEqual(expect.arrayContaining(sessionActions));
    expect(controller).toContain("put_status(:unsupported_media_type)");

    const withoutAuth = await createVirtual({
      ...base,
      projectName: "elixir-session-none",
      elixirOrm: "ecto-sql",
      elixirAuth: "none",
      elixirApi: "rest",
    });

    expect(withoutAuth.success).toBe(true);
    const filesWithPlug = listVirtualTreeFiles(withoutAuth.tree!).filter((file) =>
      file.content.includes("require_json_body"),
    );
    expect(filesWithPlug).toEqual([]);
  });

  it.each(["phoenix", "phoenix-live-view"] as const)(
    "copies only generated paths into the %s release image without an ORM",
    async (elixirWebFramework) => {
      const result = await createVirtual({
        ...base,
        projectName: "elixir-docker-no-orm",
        elixirWebFramework,
        elixirOrm: "none",
        elixirAuth: "none",
        elixirApi: "rest",
        elixirDeploy: "docker",
      });

      expect(result.success).toBe(true);
      const tree = result.tree!;
      const paths = listVirtualTreeFilePaths(tree).map((path) => path.replace(/^\/+/, ""));
      const sources = [
        ...(getVirtualTreeFileContent(tree, "Dockerfile") ?? "").matchAll(/^COPY (?!--)(.+) \S+$/gm),
      ].flatMap((match) => match[1].split(" "));
      expect(sources).toContain("lib");
      const missing = sources.filter(
        (source) => !paths.some((path) => path === source || path.startsWith(`${source}/`)),
      );
      expect(missing).toEqual([]);
    },
  );


  it("serves and boots the LiveView client only for LiveView projects", async () => {
    const liveView = await createVirtual({
      ...base,
      projectName: "elixir-liveview-client",
      elixirWebFramework: "phoenix-live-view",
      elixirRealtime: "live-view-streams",
      elixirOrm: "ecto_sqlite3",
    });
    const phoenix = await createVirtual({ ...base, projectName: "elixir-phoenix-client" });

    expect(liveView.success).toBe(true);
    const layout = getVirtualTreeFileContent(
      liveView.tree!,
      "lib/elixir_liveview_client_web/components/layouts/root.html.heex",
    );
    expect(layout).toContain('<script defer src={~p"/assets/phoenix/phoenix.min.js"}></script>');
    expect(layout).toContain(
      '<script defer src={~p"/assets/phoenix_live_view/phoenix_live_view.min.js"}></script>',
    );
    expect(layout).toContain('new LiveView.LiveSocket("/live", Phoenix.Socket');
    expect(layout).toContain("_csrf_token: csrfToken");
    const endpoint = getVirtualTreeFileContent(
      liveView.tree!,
      "lib/elixir_liveview_client_web/endpoint.ex",
    );
    expect(endpoint).toContain('socket "/live", Phoenix.LiveView.Socket');
    expect(endpoint).toContain(
      'at: "/assets/phoenix",\n    from: {:phoenix, "priv/static"},\n    only: ~w(phoenix.min.js)',
    );
    expect(endpoint).toContain(
      'at: "/assets/phoenix_live_view",\n    from: {:phoenix_live_view, "priv/static"},\n    only: ~w(phoenix_live_view.min.js)',
    );

    expect(phoenix.success).toBe(true);
    expect(
      getVirtualTreeFileContent(
        phoenix.tree!,
        "lib/elixir_phoenix_client_web/components/layouts/root.html.heex",
      ),
    ).not.toContain("<script");
    expect(
      getVirtualTreeFileContent(phoenix.tree!, "lib/elixir_phoenix_client_web/endpoint.ex"),
    ).not.toContain('"priv/static"');
  });

  it("keeps StreamData available to Ash outside the test environment", async () => {
    const result = await createVirtual({
      ...base,
      projectName: "elixir-ash-stream-data",
      elixirOrm: "ecto_sqlite3",
      elixirTesting: "stream_data",
      elixirApplicationFramework: "ash",
    });

    expect(result.success).toBe(true);
    const mix = getVirtualTreeFileContent(result.tree!, "mix.exs");
    expect(mix).toContain('{:stream_data, "~> 1.3"}');
    expect(mix).not.toContain('{:stream_data, "~> 1.3", only: :test}');
    expect(mix).toContain('{:ash, "~> 3.29"}');
  });
});
