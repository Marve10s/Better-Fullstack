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
import {
  getVirtualTreeFileContent,
  hasVirtualFile,
  listVirtualTreeFilePaths,
  listVirtualTreeFiles,
} from "@test/support/virtual-tree-utils";
import { describe, expect, it } from "bun:test";

import { validateFullConfig } from "@/config/config-validation";
import { createVirtual } from "@/index";
import { runWithContext } from "@/presentation/context";

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
  it("routes Fly gRPC over TLS and HTTP/2 without replacing Phoenix", async () => {
    const result = await createVirtual({
      ...base,
      projectName: "elixir-fly-grpc",
      elixirApi: "grpc",
      elixirDeploy: "fly",
      elixirOrm: "none",
      elixirAuth: "none",
    });
    expect(result.success).toBe(true);
    const tree = result.tree!;
    const fly = Bun.TOML.parse(getVirtualTreeFileContent(tree, "fly.toml") ?? "");
    expect(fly.http_service).toMatchObject({ internal_port: 4000 });
    expect(fly.env).toMatchObject({ GRPC_PORT: "50051" });
    expect(fly.services).toEqual([
      expect.objectContaining({
        internal_port: 50051,
        protocol: "tcp",
        ports: [{ port: 50051, handlers: ["tls", "http"], http_options: { h2_backend: true } }],
      }),
    ]);
    expect(getVirtualTreeFileContent(tree, "config/runtime.exs")).toContain(
      "adapter_opts: [ip: {0, 0, 0, 0, 0, 0, 0, 0}, ipv6_v6only: false]",
    );
    expect(getVirtualTreeFileContent(tree, "README.md")).toContain(".fly.dev:50051");
  });

  it.each(["none", "docker", "fly", "gigalixir", "mix-release"] as const)(
    "documents Docker only when the %s clustered release generates it",
    async (elixirDeploy) => {
      const result = await createVirtual({
        ...base,
        projectName: "elixir-cluster-docs",
        elixirWebFramework: "none",
        elixirApi: "none",
        elixirRealtime: "none",
        elixirOrm: "none",
        elixirClustering: "libcluster",
        elixirDeploy,
      });
      expect(result.success).toBe(true);
      const tree = result.tree!;
      expect((getVirtualTreeFileContent(tree, "README.md") ?? "").includes("docker build -t")).toBe(
        hasVirtualFile(tree.root, "Dockerfile"),
      );
    },
  );

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
      "plug OpenApiSpex.Plug.PutApiSpec,\n      module: ElixirRoadmapFullWeb.ApiSpec",
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
    expect(application).toContain("OpentelemetryPhoenix.setup(adapter: :cowboy2)");

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
    expect(banditApplication).toContain("OpentelemetryPhoenix.setup(adapter: :bandit)");
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
    expect(fly).toContain("[mounts]");
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
    expect(mix).toContain('{:stream_data, "~> 1.3", only: [:dev, :test]}');
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

  it("keeps phx-gen-auth register and login JSON-only and accepts bodyless logout", async () => {
    const withAuth = await createVirtual({
      ...base,
      projectName: "elixir-session-json",
      elixirOrm: "ecto-sql",
      elixirAuth: "phx-gen-auth",
      elixirApi: "rest",
    });

    expect(withAuth.success).toBe(true);
    const router = getVirtualTreeFileContent(
      withAuth.tree!,
      "lib/elixir_session_json_web/router.ex",
    );
    const sessionActions = [...(router ?? "").matchAll(/UserSessionController, :(\w+)/g)].map(
      (match) => match[1],
    );
    expect(sessionActions).toEqual(["register", "login", "logout"]);
    const controller = getVirtualTreeFileContent(
      withAuth.tree!,
      "lib/elixir_session_json_web/controllers/user_session_controller.ex",
    );
    const jsonOnlyActions = controller
      ?.match(/plug :require_json_body when action in \[([^\]]*)\]/)?.[1]
      ?.split(",")
      .map((action) => action.trim().replace(/^:/, ""));
    expect(jsonOnlyActions).toEqual(["register", "login"]);
    expect(controller).toContain(
      "plug :require_json_body, :allow_missing when action in [:logout]",
    );
    expect(controller).toContain("[] when opts == :allow_missing -> conn");
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
        ...(getVirtualTreeFileContent(tree, "Dockerfile") ?? "").matchAll(
          /^COPY (?!--)(.+) \S+$/gm,
        ),
      ].flatMap((match) => match[1].split(" "));
      expect(sources).toContain("lib");
      expect(sources).toContain("rel");
      const missing = sources.filter(
        (source) =>
          !paths.some((path) => new Bun.Glob(source).match(path) || path.startsWith(`${source}/`)),
      );
      expect(missing).toEqual([]);
    },
  );

  it("configures host discovery in a headless release without a database or observability provider", async () => {
    const result = await createVirtual({
      ...base,
      projectName: "cluster-worker",
      elixirWebFramework: "none",
      elixirOrm: "none",
      elixirApi: "none",
      elixirRealtime: "none",
      elixirClustering: "libcluster",
      elixirDeploy: "mix-release",
      elixirObservability: "none",
    });
    expect(result.success).toBe(true);
    const runtime = getVirtualTreeFileContent(result.tree!, "config/runtime.exs");
    expect(runtime).toContain('System.get_env("CLUSTER_HOSTS", "")');
    expect(runtime).toContain(":cluster_topologies, cluster_topologies");
    expect(runtime).not.toContain("Web.Endpoint");
    const environment = getVirtualTreeFileContent(result.tree!, "rel/env.sh.eex");
    expect(environment).toContain("Set RELEASE_COOKIE");
    expect(environment).toContain("RELEASE_DISTRIBUTION");
  });

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
    expect(layout).toContain(
      '<script defer src={~p"/assets/phoenix/phoenix.min.js"}>\n    </script>',
    );
    expect(layout).toContain(
      '<script defer src={~p"/assets/phoenix_live_view/phoenix_live_view.min.js"}>\n    </script>',
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
    expect(mix).not.toContain('{:stream_data, "~> 1.3", only: [:dev, :test]}');
    expect(mix).toContain('{:ash, "~> 3.29"}');
  });

  it("reads the Guardian secret from the runtime environment in production", async () => {
    const result = await createVirtual({
      ...base,
      projectName: "elixir-guardian-secret",
      elixirOrm: "none",
      elixirAuth: "guardian",
      elixirApi: "rest",
      elixirDeploy: "mix-release",
    });

    expect(result.success).toBe(true);
    const tree = result.tree!;
    expect(getVirtualTreeFileContent(tree, "config/config.exs")).not.toContain("secret_key");
    const runtime = getVirtualTreeFileContent(tree, "config/runtime.exs") ?? "";
    const prodBlock = runtime.slice(runtime.indexOf("if config_env() == :prod do"));
    expect(prodBlock).toContain(
      'System.get_env("GUARDIAN_SECRET_KEY") ||\n      raise "GUARDIAN_SECRET_KEY is missing.',
    );
    for (const env of ["dev", "test"]) {
      expect(getVirtualTreeFileContent(tree, `config/${env}.exs`)).toContain(
        `secret_key: "${env}-only-guardian-secret-placeholder`,
      );
    }
  });

  it("upgrades Oban in a separate migration that runs after the original one", async () => {
    const result = await createVirtual({
      ...base,
      projectName: "elixir-oban-jobs",
      elixirOrm: "ecto-sql",
      elixirAuth: "none",
      elixirApi: "rest",
      elixirJobs: "oban",
      elixirDeploy: "fly",
    });
    const withoutOban = await createVirtual({
      ...base,
      projectName: "elixir-no-oban",
      elixirOrm: "ecto-sql",
      elixirAuth: "none",
      elixirApi: "rest",
    });

    expect(result.success).toBe(true);
    const tree = result.tree!;
    const migrations = listVirtualTreeFilePaths(tree)
      .map((path) => path.replace(/^\/+/, ""))
      .filter((path) => path.startsWith("priv/repo/migrations/"))
      .sort();
    const original = "priv/repo/migrations/20260101000002_add_oban_jobs.exs";
    const upgrade = "priv/repo/migrations/20261007000000_upgrade_oban_jobs_to_v14.exs";
    expect(migrations.slice(-2)).toEqual([original, upgrade]);
    const originalContent = getVirtualTreeFileContent(tree, original);
    expect(originalContent).toContain("Oban.Migration.up(version: 12)");
    expect(originalContent).toContain("Oban.Migration.down(version: 1)");
    const upgradeContent = getVirtualTreeFileContent(tree, upgrade);
    expect(upgradeContent).toContain("Oban.Migration.up(version: 14)");
    expect(upgradeContent).toContain("Oban.Migration.down(version: 13)");
    expect(getVirtualTreeFileContent(tree, "mix.exs")).toContain('{:oban, "~> 2.24.0"}');
    expect(getVirtualTreeFileContent(tree, "config/test.exs")).toContain(
      "config :elixir_oban_jobs, Oban, testing: :manual",
    );

    expect(withoutOban.success).toBe(true);
    expect(
      listVirtualTreeFilePaths(withoutOban.tree!).filter((path) => path.includes("oban_jobs")),
    ).toEqual([]);
  });

  it("supervises Exq outside tests and enqueues through Exq.Mock in tests", async () => {
    const result = await createVirtual({
      ...base,
      projectName: "elixir-exq-jobs",
      elixirWebFramework: "none",
      elixirRealtime: "none",
      elixirOrm: "none",
      elixirAuth: "none",
      elixirApi: "none",
      elixirHttpServer: "none",
      elixirI18n: "none",
      elixirJobs: "exq",
      elixirDeploy: "fly",
    });
    const withOban = await createVirtual({
      ...base,
      projectName: "elixir-oban-worker",
      elixirOrm: "ecto-sql",
      elixirAuth: "none",
      elixirJobs: "oban",
    });

    expect(result.success).toBe(true);
    const tree = result.tree!;
    expect(getVirtualTreeFileContent(tree, "mix.exs")).toContain('{:exq, "~> 0.25"}');
    expect(getVirtualTreeFileContent(tree, "lib/elixir_exq_jobs/application.ex")).toContain(
      "Supervisor.start_link(children ++ exq_children, opts)",
    );
    expect(getVirtualTreeFileContent(tree, "config/runtime.exs")).toContain(
      'config :exq, url: System.get_env("REDIS_URL", "redis://localhost:6379")',
    );
    const testConfig = getVirtualTreeFileContent(tree, "config/test.exs");
    expect(testConfig).toContain("config :elixir_exq_jobs, :start_exq, false");
    expect(testConfig).toContain("config :exq, queue_adapter: Exq.Adapters.Queue.Mock");
    expect(getVirtualTreeFileContent(tree, "test/test_helper.exs")).toContain(
      "Exq.Mock.start_link(mode: :fake)",
    );
    expect(
      getVirtualTreeFileContent(tree, "lib/elixir_exq_jobs/workers/sample_worker.ex"),
    ).toContain('Exq.enqueue(Exq, "default", __MODULE__, [name])');
    expect(hasVirtualFile(tree.root, "test/elixir_exq_jobs/workers/sample_worker_test.exs")).toBe(
      true,
    );
    expect(getVirtualTreeFileContent(tree, ".env.example")).toContain("REDIS_URL=");

    expect(withOban.success).toBe(true);
    expect(
      hasVirtualFile(withOban.tree!.root, "test/elixir_oban_worker/workers/sample_worker_test.exs"),
    ).toBe(false);
    expect(
      getVirtualTreeFileContent(withOban.tree!, "lib/elixir_oban_worker/workers/sample_worker.ex"),
    ).toContain("use Oban.Worker");
  });

  it.each([
    ["peri", "{:peri,", "defschema :item"],
    ["tarams", "{:tarams,", "Tarams.cast(attrs, @schema)"],
  ] as const)(
    "validates item input with %s before the catalog writes it",
    async (elixirValidation, dependency, validation) => {
      const result = await createVirtual({
        ...base,
        projectName: "elixir-item-params",
        elixirOrm: "ecto_sqlite3",
        elixirAuth: "none",
        elixirValidation,
      });

      expect(result.success).toBe(true);
      const tree = result.tree!;
      expect(getVirtualTreeFileContent(tree, "mix.exs")).toContain(dependency);
      expect(
        getVirtualTreeFileContent(tree, "lib/elixir_item_params/catalog/item_params.ex"),
      ).toContain(validation);
      expect(getVirtualTreeFileContent(tree, "lib/elixir_item_params/catalog.ex")).toContain(
        "with {:ok, attrs} <- ItemParams.validate(attrs) do",
      );
      expect(
        getVirtualTreeFileContent(
          tree,
          "lib/elixir_item_params_web/controllers/item_controller.ex",
        ),
      ).toContain("|> put_status(:unprocessable_entity)");
      expect(hasVirtualFile(tree.root, "lib/elixir_item_params/catalog/item_options.ex")).toBe(
        false,
      );
    },
  );

  it.each([
    ["jason", "Jason", false],
    ["elixir-json", "JSON", false],
    ["jiffy", "ElixirJsonLib.JSON", true],
  ] as const)(
    "routes Phoenix encoding and request parsing through %s",
    async (elixirJson, module, hasAdapter) => {
      const result = await createVirtual({
        ...base,
        projectName: "elixir-json-lib",
        elixirOrm: "none",
        elixirAuth: "none",
        elixirJson,
      });

      expect(result.success).toBe(true);
      const tree = result.tree!;
      expect(getVirtualTreeFileContent(tree, "config/config.exs")).toContain(
        `config :phoenix, :json_library, ${module}\n`,
      );
      expect(getVirtualTreeFileContent(tree, "lib/elixir_json_lib_web/endpoint.ex")).toContain(
        `json_decoder: ${module}\n`,
      );
      expect(hasVirtualFile(tree.root, "lib/elixir_json_lib/json.ex")).toBe(hasAdapter);
      expect(hasVirtualFile(tree.root, "test/elixir_json_lib/json_test.exs")).toBe(hasAdapter);
      const mix = getVirtualTreeFileContent(tree, "mix.exs");
      expect(mix?.includes("{:jiffy,")).toBe(hasAdapter);
      expect(mix).toContain(
        elixirJson === "elixir-json" ? 'elixir: "~> 1.18"' : 'elixir: "~> 1.17"',
      );
    },
  );

  it.each([
    ["linguist", "{:linguist,", "use Linguist.Vocabulary"],
    [
      "ex-cldr-messages",
      "{:ex_cldr_messages,",
      "providers: [Cldr.Number, Cldr.List, Cldr.Message]",
    ],
  ] as const)(
    "generates a %s translation module for plain Elixir apps",
    async (elixirI18n, dependency, setup) => {
      const result = await createVirtual({
        ...base,
        projectName: "elixir-i18n-lib",
        elixirWebFramework: "none",
        elixirRealtime: "none",
        elixirOrm: "none",
        elixirAuth: "none",
        elixirApi: "none",
        elixirHttpServer: "none",
        elixirI18n,
      });

      expect(result.success).toBe(true);
      const tree = result.tree!;
      expect(getVirtualTreeFileContent(tree, "mix.exs")).toContain(dependency);
      expect(getVirtualTreeFileContent(tree, "lib/elixir_i18n_lib/i18n.ex")).toContain(setup);
      expect(getVirtualTreeFileContent(tree, "test/elixir_i18n_lib/i18n_test.exs")).toContain(
        'I18n.t!("fr", "greeting", name: "Ada") == "Bonjour, Ada !"',
      );
      expect(hasVirtualFile(tree.root, "lib/elixir_i18n_lib_web/gettext.ex")).toBe(false);
    },
  );

  it.each([
    ["dns-cluster", "DNSCluster,", "DNS_CLUSTER_QUERY=", "CLUSTER_HOSTS="],
    ["distributed-erlang", "ElixirClusterLib.Cluster", "CLUSTER_HOSTS=", "DNS_CLUSTER_QUERY="],
  ] as const)(
    "supervises %s discovery with a release cookie guard",
    async (elixirClustering, child, presentEnv, absentEnv) => {
      const result = await createVirtual({
        ...base,
        projectName: "elixir-cluster-lib",
        elixirWebFramework: "none",
        elixirRealtime: "none",
        elixirOrm: "none",
        elixirAuth: "none",
        elixirApi: "none",
        elixirHttpServer: "none",
        elixirI18n: "none",
        elixirClustering,
      });

      expect(result.success).toBe(true);
      const tree = result.tree!;
      expect(getVirtualTreeFileContent(tree, "lib/elixir_cluster_lib/application.ex")).toContain(
        child,
      );
      expect(getVirtualTreeFileContent(tree, "rel/env.sh.eex")).toContain(
        'if [ -z "${RELEASE_COOKIE:-}" ]; then',
      );
      const env = getVirtualTreeFileContent(tree, ".env.example");
      expect(env).toContain(presentEnv);
      expect(env).not.toContain(absentEnv);
      expect(hasVirtualFile(tree.root, "lib/elixir_cluster_lib/cluster.ex")).toBe(
        elixirClustering === "distributed-erlang",
      );
      expect(getVirtualTreeFileContent(tree, "mix.exs")?.includes("{:dns_cluster,")).toBe(
        elixirClustering === "dns-cluster",
      );
    },
  );

  it("keeps one Fly machine running only when Oban runs inside the app", async () => {
    const withOban = await createVirtual({
      ...base,
      projectName: "elixir-fly-oban",
      elixirOrm: "ecto-sql",
      elixirAuth: "none",
      elixirApi: "rest",
      elixirJobs: "oban",
      elixirDeploy: "fly",
    });
    const withoutOban = await createVirtual({
      ...base,
      projectName: "elixir-fly-plain",
      elixirOrm: "ecto-sql",
      elixirAuth: "none",
      elixirApi: "rest",
      elixirDeploy: "fly",
    });

    expect(withOban.success).toBe(true);
    expect(withoutOban.success).toBe(true);
    expect(getVirtualTreeFileContent(withOban.tree!, "fly.toml")).toContain(
      "min_machines_running = 1",
    );
    expect(getVirtualTreeFileContent(withoutOban.tree!, "fly.toml")).toContain(
      "min_machines_running = 0",
    );
  });

  it("converts Ecto changesets into LiveView forms that render their errors", async () => {
    const result = await createVirtual({
      ...base,
      projectName: "elixir-liveview-errors",
      elixirWebFramework: "phoenix-live-view",
      elixirRealtime: "live-view-streams",
      elixirOrm: "ecto-sql",
      elixirAuth: "none",
      elixirApi: "none",
    });

    expect(result.success).toBe(true);
    const tree = result.tree!;
    expect(getVirtualTreeFileContent(tree, "mix.exs")).toContain('{:phoenix_ecto, "~> 4.6"}');
    const live = getVirtualTreeFileContent(
      tree,
      "lib/elixir_liveview_errors_web/live/item_live/index.ex",
    );
    expect(live).toContain('to_form(changeset, as: "item")');
    expect(live).toContain("<p :for={message <- error_messages(@form[:name])}");
  });

  it("emits a formatter config that imports the selected libraries", async () => {
    const liveView = await createVirtual({
      ...base,
      projectName: "elixir-format-live",
      elixirWebFramework: "phoenix-live-view",
      elixirRealtime: "live-view-streams",
      elixirOrm: "ecto-sql",
      elixirAuth: "none",
      elixirApi: "none",
      elixirJobs: "oban",
    });
    const plain = await createVirtual({
      ...base,
      projectName: "elixir-format-plain",
      elixirWebFramework: "none",
      elixirRealtime: "none",
      elixirOrm: "none",
      elixirAuth: "none",
      elixirApi: "none",
      elixirHttpServer: "none",
      elixirI18n: "none",
    });

    expect(liveView.success).toBe(true);
    expect(getVirtualTreeFileContent(liveView.tree!, ".formatter.exs")).toBe(`[
  import_deps: [
    :ecto,
    :ecto_sql,
    :oban,
    :phoenix
  ],
  plugins: [Phoenix.LiveView.HTMLFormatter],
  inputs: ["*.{heex,ex,exs}", "{config,lib,test}/**/*.{heex,ex,exs}", "priv/*/**/*.exs"]
]
`);
    expect(plain.success).toBe(true);
    expect(getVirtualTreeFileContent(plain.tree!, ".formatter.exs")).toBe(`[
  inputs: ["*.{ex,exs}", "{config,lib,test}/**/*.{ex,exs}", "priv/*/**/*.exs"]
]
`);
  });

  it.each(["phoenix", "phoenix-live-view", "none"] as const)(
    "formats HEEx files whenever %s generates them",
    async (elixirWebFramework) => {
      const result = await createVirtual({
        ...base,
        projectName: "elixir-format-heex",
        elixirWebFramework,
        elixirRealtime: "none",
        elixirOrm: "none",
        elixirAuth: "none",
        elixirApi: elixirWebFramework === "none" ? "none" : "rest",
        elixirHttpServer: elixirWebFramework === "none" ? "none" : "bandit",
        elixirI18n: "none",
      });

      expect(result.success).toBe(true);
      const tree = result.tree!;
      const hasHeex = listVirtualTreeFilePaths(tree).some((path) => path.endsWith(".heex"));
      expect(hasHeex).toBe(elixirWebFramework !== "none");
      const formatter = getVirtualTreeFileContent(tree, ".formatter.exs") ?? "";
      const mix = getVirtualTreeFileContent(tree, "mix.exs") ?? "";
      expect(formatter.includes("plugins: [Phoenix.LiveView.HTMLFormatter]")).toBe(hasHeex);
      expect(formatter.includes('"{config,lib,test}/**/*.{heex,ex,exs}"')).toBe(hasHeex);
      expect(mix.includes('{:phoenix_live_view, "~> 1.0"}')).toBe(hasHeex);
    },
  );

  it.each([
    ["logger-json", "none", '{:logger_json, "~> 7.0"}', "LoggerJSON.Formatters.Basic"],
    [
      "logger-file-backend",
      "none",
      '{:logger_file_backend, "~> 0.1"}',
      "config :logger, :file_log",
    ],
    ["logster", "phoenix", '{:logster, "~> 1.1"}', "config :phoenix, :logger, false"],
  ] as const)(
    "wires %s logging into config with a generated test",
    async (elixirLogging, elixirWebFramework, dependency, configLine) => {
      const hasPhoenix = elixirWebFramework !== "none";
      const result = await createVirtual({
        ...base,
        projectName: "elixir-logging",
        elixirWebFramework,
        elixirRealtime: "none",
        elixirOrm: "none",
        elixirAuth: "none",
        elixirApi: hasPhoenix ? "rest" : "none",
        elixirHttpServer: hasPhoenix ? "bandit" : "none",
        elixirI18n: "none",
        elixirLogging,
      });

      expect(result.success).toBe(true);
      const tree = result.tree!;
      expect(getVirtualTreeFileContent(tree, "mix.exs")).toContain(dependency);
      expect(getVirtualTreeFileContent(tree, "config/config.exs")).toContain(configLine);
      expect(hasVirtualFile(tree.root, "test/elixir_logging/logging_test.exs")).toBe(true);
      expect(
        getVirtualTreeFileContent(tree, "lib/elixir_logging/application.ex")?.includes(
          "LoggerBackends.add({LoggerFileBackend, :file_log})",
        ),
      ).toBe(elixirLogging === "logger-file-backend");
      expect(
        getVirtualTreeFileContent(tree, "lib/elixir_logging_web/endpoint.ex")?.includes(
          "plug Logster.Plugs.Logger",
        ) ?? false,
      ).toBe(elixirLogging === "logster");
    },
  );

  it.each(["peri", "tarams"] as const)("rejects %s without Ecto", (elixirValidation) => {
    const input = {
      ecosystem: "elixir" as const,
      elixirWebFramework: "none" as const,
      elixirOrm: "none" as const,
      elixirValidation,
    };
    expect(() =>
      runWithContext({ silent: true }, () =>
        validateFullConfig(input, new Set(Object.keys(input)), {} as never),
      ),
    ).toThrow("Peri and Tarams require Ecto");
  });

  it.each(["eex", "solid-liquid", "bbmustache"] as const)(
    "copies %s templates into release images without a SQL ORM",
    async (elixirTemplating) => {
      for (const elixirOrm of ["none", "ecto"] as const) {
        const result = await createVirtual({
          ...base,
          projectName: "elixir-docker-templates",
          elixirWebFramework: "none",
          elixirRealtime: "none",
          elixirHttpServer: "none",
          elixirOrm,
          elixirAuth: "none",
          elixirApi: "none",
          elixirTemplating,
          elixirDeploy: "docker",
        });
        expect(result.success).toBe(true);
        expect(getVirtualTreeFileContent(result.tree!, "Dockerfile")).toContain("COPY priv priv");
        expect(
          getVirtualTreeFileContent(result.tree!, "mix.exs")?.includes(":runtime_tools, :eex"),
        ).toBe(elixirTemplating === "eex");
        expect(
          listVirtualTreeFilePaths(result.tree!).some((path) => path.startsWith("priv/templates/")),
        ).toBe(true);
      }
    },
  );

  it("rejects Logster without Phoenix", () => {
    const input = {
      ecosystem: "elixir" as const,
      elixirWebFramework: "none" as const,
      elixirLogging: "logster" as const,
    };
    expect(() =>
      runWithContext({ silent: true }, () =>
        validateFullConfig(
          input,
          new Set(["ecosystem", "elixirWebFramework", "elixirLogging"]),
          {} as never,
        ),
      ),
    ).toThrow("Logster request logging requires Phoenix");
  });

  it.each([
    [
      "dotenvy",
      '{:dotenvy, "~> 1.2"}',
      "config/runtime.exs",
      'env!("APP_MAX_CONNECTIONS", :integer, 10)',
    ],
    [
      "skogsra",
      '{:skogsra, "~> 2.5"}',
      "lib/elixir_config/settings.ex",
      "app_env(:max_connections",
    ],
    [
      "confex",
      '{:confex, "~> 3.5"}',
      "config/config.exs",
      '{:system, :integer, "APP_MAX_CONNECTIONS", 10}',
    ],
  ] as const)(
    "reads typed settings through %s",
    async (elixirConfig, dependency, path, snippet) => {
      const result = await createVirtual({
        ...base,
        projectName: "elixir-config",
        elixirWebFramework: "none",
        elixirRealtime: "none",
        elixirOrm: "none",
        elixirAuth: "none",
        elixirApi: "none",
        elixirHttpServer: "none",
        elixirI18n: "none",
        elixirConfig,
      });

      expect(result.success).toBe(true);
      const tree = result.tree!;
      expect(getVirtualTreeFileContent(tree, "mix.exs")).toContain(dependency);
      expect(getVirtualTreeFileContent(tree, path)).toContain(snippet);
      expect(hasVirtualFile(tree.root, "lib/elixir_config/settings.ex")).toBe(true);
      expect(hasVirtualFile(tree.root, "test/elixir_config/settings_test.exs")).toBe(true);
      expect(getVirtualTreeFileContent(tree, ".env.example")).toContain("APP_MAX_CONNECTIONS=10");
    },
  );

  it.each([
    [
      "amqp",
      '{:amqp, "~> 4.3"}',
      "AMQP.Queue.declare(channel, @queue, durable: true)",
      "RABBITMQ_URL=",
    ],
    ["gnat", '{:gnat, "~> 1.18"}', "Gnat.sub(gnat, self(), @subject)", "NATS_URL="],
    ["brod", '{:brod, "~> 4.7"}', ":brod.produce_sync_offset(@client, @topic, 0", "KAFKA_BROKERS="],
  ] as const)(
    "round-trips a message through %s behind a tagged broker test",
    async (elixirMessageQueue, dependency, snippet, envLine) => {
      const result = await createVirtual({
        ...base,
        projectName: "elixir-mq",
        elixirWebFramework: "none",
        elixirRealtime: "none",
        elixirOrm: "none",
        elixirAuth: "none",
        elixirApi: "none",
        elixirHttpServer: "none",
        elixirI18n: "none",
        elixirMessageQueue,
      });

      expect(result.success).toBe(true);
      const tree = result.tree!;
      expect(getVirtualTreeFileContent(tree, "mix.exs")).toContain(dependency);
      expect(getVirtualTreeFileContent(tree, "lib/elixir_mq/message_queue.ex")).toContain(snippet);
      expect(getVirtualTreeFileContent(tree, "test/elixir_mq/message_queue_test.exs")).toContain(
        "@moduletag :message_queue",
      );
      expect(getVirtualTreeFileContent(tree, "test/test_helper.exs")).toContain(
        "ExUnit.start(exclude: [:message_queue])",
      );
      expect(getVirtualTreeFileContent(tree, ".env.example")).toContain(envLine);
    },
  );

  it.each([
    ["eex", "priv/templates/welcome.eex", "EEx.function_from_file", null],
    ["solid-liquid", "priv/templates/welcome.liquid", "Solid.render", '{:solid, "~> 1.3"}'],
    [
      "bbmustache",
      "priv/templates/welcome.mustache",
      ":bbmustache.render",
      '{:bbmustache, "~> 1.12"}',
    ],
  ] as const)(
    "renders the welcome template with %s",
    async (elixirTemplating, templateFile, renderCall, dependency) => {
      const result = await createVirtual({
        ...base,
        projectName: "elixir-templates",
        elixirWebFramework: "none",
        elixirRealtime: "none",
        elixirOrm: "none",
        elixirAuth: "none",
        elixirApi: "none",
        elixirHttpServer: "none",
        elixirI18n: "none",
        elixirTemplating,
      });

      expect(result.success).toBe(true);
      const tree = result.tree!;
      const templateFiles = listVirtualTreeFilePaths(tree).filter((path) =>
        path.startsWith("priv/templates/"),
      );
      expect(templateFiles).toEqual([templateFile]);
      expect(getVirtualTreeFileContent(tree, "lib/elixir_templates/templates.ex")).toContain(
        renderCall,
      );
      expect(hasVirtualFile(tree.root, "test/elixir_templates/templates_test.exs")).toBe(true);
      const mix = getVirtualTreeFileContent(tree, "mix.exs") ?? "";
      if (dependency) expect(mix).toContain(dependency);
      expect(mix.includes("{:solid,") || mix.includes("{:bbmustache,")).toBe(dependency !== null);
    },
  );

  it.each([
    ["option-parser", "OptionParser.parse(argv", null],
    ["optimus", "Optimus.parse(spec(), argv)", '{:optimus, "~> 0.6"}'],
    ["owl", "Owl.Box.new(", '{:owl, "~> 0.13"}'],
  ] as const)("adds a greet Mix task backed by %s", async (elixirCli, parser, dependency) => {
    const result = await createVirtual({
      ...base,
      projectName: "elixir-cli",
      elixirWebFramework: "none",
      elixirRealtime: "none",
      elixirOrm: "none",
      elixirAuth: "none",
      elixirApi: "none",
      elixirHttpServer: "none",
      elixirI18n: "none",
      elixirCli,
    });

    expect(result.success).toBe(true);
    const tree = result.tree!;
    expect(getVirtualTreeFileContent(tree, "lib/elixir_cli/cli.ex")).toContain(parser);
    expect(getVirtualTreeFileContent(tree, "lib/mix/tasks/elixir_cli.greet.ex")).toContain(
      "defmodule Mix.Tasks.ElixirCli.Greet do",
    );
    expect(hasVirtualFile(tree.root, "test/elixir_cli/cli_test.exs")).toBe(true);
    const mix = getVirtualTreeFileContent(tree, "mix.exs") ?? "";
    expect(mix.includes("{:optimus,") || mix.includes("{:owl,")).toBe(dependency !== null);
    if (dependency) expect(mix).toContain(dependency);
  });

  it("omits the greet task when no CLI is selected", async () => {
    const result = await createVirtual({
      ...base,
      projectName: "elixir-no-cli",
      elixirCli: "none",
    });

    expect(result.success).toBe(true);
    expect(hasVirtualFile(result.tree!.root, "lib/mix/tasks/elixir_no_cli.greet.ex")).toBe(false);
    expect(hasVirtualFile(result.tree!.root, "lib/elixir_no_cli/cli.ex")).toBe(false);
  });
});
