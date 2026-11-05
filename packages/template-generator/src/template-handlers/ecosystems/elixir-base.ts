import type { ProjectConfig } from "@better-fullstack/types";

import type { VirtualFileSystem } from "@/core/virtual-fs";

import { normalizeElixirAppName, transformFilename } from "@/core/template-processor";
import { renderTemplateTree, type TemplateData } from "@/template-handlers/core/utils";

export async function processElixirBaseTemplate(
  vfs: VirtualFileSystem,
  templates: TemplateData,
  config: ProjectConfig,
  targetPath = "",
): Promise<void> {
  if (config.ecosystem !== "elixir") return;

  const prefix = "elixir-base/";
  const hasPhoenix = config.elixirWebFramework !== "none";
  const hasLiveView = config.elixirWebFramework === "phoenix-live-view";
  const hasLiveViewStreams = hasLiveView && config.elixirRealtime === "live-view-streams";
  const hasEcto = config.elixirOrm !== "none";
  const hasEctoSql = ["ecto-sql", "myxql", "ecto_sqlite3"].includes(config.elixirOrm);
  const hasAuth = hasPhoenix && config.elixirAuth === "phx-gen-auth" && hasEctoSql;
  const hasGuardian = hasPhoenix && config.elixirAuth === "guardian";
  const hasUeberauth = hasPhoenix && config.elixirAuth === "ueberauth";
  const hasChannels =
    hasPhoenix && (config.elixirRealtime === "channels" || config.elixirRealtime === "presence");
  const hasPresence = config.elixirRealtime === "presence";
  const hasOban = config.elixirJobs === "oban";
  const hasQuantum = config.elixirJobs === "quantum";
  const hasExq = config.elixirJobs === "exq";
  const hasAbsinthe = hasPhoenix && config.elixirApi === "absinthe" && hasEcto;
  const hasEmail = config.elixirEmail !== "none";
  const hasDocker = ["docker", "fly", "gigalixir", "mix-release"].includes(config.elixirDeploy);
  const hasReleaseEnvironment = hasDocker || config.elixirClustering !== "none";
  const hasClusterModule = config.elixirClustering === "distributed-erlang";
  const hasHttpClient = config.elixirHttp !== "none";
  const hasJiffy = config.elixirJson === "jiffy";
  const hasI18nModule =
    config.elixirI18n === "linguist" || config.elixirI18n === "ex-cldr-messages";
  const hasNimbleOptions = config.elixirValidation === "nimble-options";
  const hasItemParams = config.elixirValidation === "peri" || config.elixirValidation === "tarams";
  const hasCacheModule = config.elixirCaching === "nebulex" || config.elixirCaching === "redix";
  const hasPromEx = hasPhoenix && config.elixirObservability === "prom_ex";
  const hasFlyDeploy = config.elixirDeploy === "fly";
  const hasGigalixirDeploy = config.elixirDeploy === "gigalixir";
  const hasMox = config.elixirTesting === "mox";
  const hasBypass = config.elixirTesting === "bypass";
  const hasWallaby = hasPhoenix && config.elixirTesting === "wallaby";
  const hasLogging = config.elixirLogging !== "none";
  const hasSettings = config.elixirConfig !== "none";
  const hasMessageQueue = config.elixirMessageQueue !== "none";
  const hasTemplates = config.elixirTemplating !== "none";
  const hasCli = config.elixirCli !== "none";
  const templateExtension = {
    eex: ".eex",
    "solid-liquid": ".liquid",
    bbmustache: ".mustache",
    none: "",
  }[config.elixirTemplating];

  renderTemplateTree(vfs, templates, {
    prefix,
    targetPath,
    context: config,
    skip: (templatePath) => {
      if (!hasPhoenix && templatePath.includes("___web")) return true;
      if (!hasPhoenix && templatePath.includes("test/support/conn_case")) return true;
      if (!hasLiveViewStreams && templatePath.includes("/live/")) return true;
      if (
        !hasEctoSql &&
        (templatePath.includes("/repo.ex") || templatePath.includes("/migrations/"))
      )
        return true;
      if (!hasEctoSql && templatePath.includes("priv/repo/seeds.exs")) return true;
      const isEctoCatalogTemplate =
        templatePath.includes("/catalog.ex") || templatePath.includes("/catalog/");
      if (!hasEcto && (isEctoCatalogTemplate || templatePath.includes("/item_controller")))
        return true;
      if (!hasAuth && templatePath.includes("/accounts")) return true;
      if (!hasAuth && templatePath.includes("create_users")) return true;
      if (!hasAuth && templatePath.includes("/user_session_controller")) return true;
      if (!hasGuardian && templatePath.includes("/auth/guardian.ex")) return true;
      if (!hasGuardian && templatePath.includes("/token_controller")) return true;
      if (!hasUeberauth && templatePath.includes("/oauth_controller")) return true;
      if (!hasChannels && templatePath.includes("/channels/user_socket")) return true;
      if (!hasChannels && templatePath.includes("/channels/room_channel")) return true;
      if (!hasPresence && templatePath.includes("/channels/presence")) return true;
      if (!hasOban && !hasExq && templatePath.includes("/workers/")) return true;
      if (!hasExq && templatePath.includes("/sample_worker_test.exs")) return true;
      if (!hasOban && templatePath.includes("_oban_jobs")) return true;
      if (!hasQuantum && templatePath.includes("/scheduler.ex")) return true;
      if (!hasAbsinthe && templatePath.includes("/graphql/")) return true;
      if (!hasCacheModule && templatePath.includes("/cache.ex")) return true;
      if (!hasPromEx && templatePath.includes("/prom_ex.ex")) return true;
      if (!hasNimbleOptions && templatePath.includes("/item_options.ex")) return true;
      if (!hasItemParams && templatePath.includes("/item_params.ex")) return true;
      if (!hasMox && templatePath.includes("/external_service.ex")) return true;
      if (!hasMox && templatePath.includes("/mocks.ex")) return true;
      if (!hasMox && templatePath.includes("/external_service_mox_test.exs")) return true;
      if (!hasBypass && templatePath.includes("/bypass_test.exs")) return true;
      if (!hasWallaby && templatePath.includes("/features/")) return true;
      if (!hasEmail && templatePath.includes("/mailer.ex")) return true;
      if (!hasDocker && templatePath.includes("Dockerfile")) return true;
      if (!hasReleaseEnvironment && templatePath.startsWith(`${prefix}rel/`)) return true;
      if (!hasFlyDeploy && templatePath.includes("fly.toml")) return true;
      if (!hasGigalixirDeploy && templatePath.includes("Procfile")) return true;
      if (!hasHttpClient && templatePath.includes("/http_client.ex")) return true;
      if (!hasClusterModule && /\/cluster(_test)?\.exs?(\.hbs)?$/.test(templatePath)) return true;
      if (!hasI18nModule && /\/i18n(_test)?\.exs?(\.hbs)?$/.test(templatePath)) return true;
      if (!hasJiffy && /\/json(_test)?\.exs?(\.hbs)?$/.test(templatePath)) return true;
      if (!hasLogging && templatePath.includes("/logging_test.exs")) return true;
      if (!hasSettings && /\/settings(_test)?\.exs?(\.hbs)?$/.test(templatePath)) return true;
      if (!hasMessageQueue && /\/message_queue(_test)?\.exs?(\.hbs)?$/.test(templatePath))
        return true;
      if (!hasTemplates && /\/templates(_test)?\.exs?(\.hbs)?$/.test(templatePath)) return true;
      if (!hasCli && /\/cli(_test)?\.exs?(\.hbs)?$/.test(templatePath)) return true;
      if (!hasCli && templatePath.includes("lib/mix/tasks/")) return true;
      if (
        templatePath.includes("priv/templates/welcome.") &&
        !templatePath.endsWith(`welcome${templateExtension}`)
      )
        return true;
      return false;
    },
    outputPath: (relativePath) =>
      transformFilename(relativePath).replace(
        /__elixirAppName__/g,
        normalizeElixirAppName(config.projectName),
      ),
  });
}
