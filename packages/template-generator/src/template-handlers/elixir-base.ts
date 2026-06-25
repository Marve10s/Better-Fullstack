import type { ProjectConfig } from "@better-fullstack/types";

import type { VirtualFileSystem } from "../core/virtual-fs";
import type { TemplateData } from "./utils";

import {
  isBinaryFile,
  normalizeElixirAppName,
  processTemplateString,
  transformFilename,
} from "../core/template-processor";

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
  const hasEctoSql = config.elixirOrm === "ecto-sql";
  const hasAuth = hasPhoenix && config.elixirAuth === "phx-gen-auth" && hasEctoSql;
  const hasGuardian = hasPhoenix && config.elixirAuth === "guardian";
  const hasUeberauth = hasPhoenix && config.elixirAuth === "ueberauth";
  const hasChannels =
    hasPhoenix && (config.elixirRealtime === "channels" || config.elixirRealtime === "presence");
  const hasPresence = config.elixirRealtime === "presence";
  const hasOban = config.elixirJobs === "oban";
  const hasQuantum = config.elixirJobs === "quantum";
  const hasAbsinthe = hasPhoenix && config.elixirApi === "absinthe" && hasEcto;
  const hasEmail = config.elixirEmail === "swoosh";
  const hasDocker = ["docker", "fly", "gigalixir", "mix-release"].includes(config.elixirDeploy);
  const hasHttpClient = config.elixirHttp !== "none";
  const hasNimbleOptions = config.elixirValidation === "nimble-options";
  const hasNebulex = config.elixirCaching === "nebulex";
  const hasPromEx = hasPhoenix && config.elixirObservability === "prom_ex";
  const hasFlyDeploy = config.elixirDeploy === "fly";
  const hasGigalixirDeploy = config.elixirDeploy === "gigalixir";
  const hasMox = config.elixirTesting === "mox";
  const hasBypass = config.elixirTesting === "bypass";
  const hasWallaby = hasPhoenix && config.elixirTesting === "wallaby";

  for (const [templatePath, content] of templates) {
    if (!templatePath.startsWith(prefix)) continue;
    if (!hasPhoenix && templatePath.includes("___web")) continue;
    if (!hasPhoenix && templatePath.includes("test/support/conn_case")) continue;
    if (!hasLiveViewStreams && templatePath.includes("/live/")) continue;
    if (
      !hasEctoSql &&
      (templatePath.includes("/repo.ex") || templatePath.includes("/migrations/"))
    )
      continue;
    if (!hasEctoSql && templatePath.includes("priv/repo/seeds.exs")) continue;
    if (
      !hasEcto &&
      (templatePath.includes("/catalog") || templatePath.includes("/item_controller"))
    )
      continue;
    if (!hasAuth && templatePath.includes("/accounts")) continue;
    if (!hasAuth && templatePath.includes("create_users")) continue;
    if (!hasAuth && templatePath.includes("/user_session_controller")) continue;
    if (!hasGuardian && templatePath.includes("/auth/guardian.ex")) continue;
    if (!hasGuardian && templatePath.includes("/token_controller")) continue;
    if (!hasUeberauth && templatePath.includes("/oauth_controller")) continue;
    if (!hasChannels && templatePath.includes("/channels/user_socket")) continue;
    if (!hasChannels && templatePath.includes("/channels/room_channel")) continue;
    if (!hasPresence && templatePath.includes("/channels/presence")) continue;
    if (!hasOban && templatePath.includes("/workers/")) continue;
    if (!hasOban && templatePath.includes("add_oban_jobs")) continue;
    if (!hasQuantum && templatePath.includes("/scheduler.ex")) continue;
    if (!hasAbsinthe && templatePath.includes("/graphql/")) continue;
    if (!hasNebulex && templatePath.includes("/cache.ex")) continue;
    if (!hasPromEx && templatePath.includes("/prom_ex.ex")) continue;
    if (!hasNimbleOptions && templatePath.includes("/item_options.ex")) continue;
    if (!hasMox && templatePath.includes("/external_service.ex")) continue;
    if (!hasMox && templatePath.includes("/mocks.ex")) continue;
    if (!hasMox && templatePath.includes("/external_service_mox_test.exs")) continue;
    if (!hasBypass && templatePath.includes("/bypass_test.exs")) continue;
    if (!hasWallaby && templatePath.includes("/features/")) continue;
    if (!hasEmail && templatePath.includes("/mailer.ex")) continue;
    if (!hasDocker && templatePath.includes("Dockerfile")) continue;
    if (!hasFlyDeploy && templatePath.includes("fly.toml")) continue;
    if (!hasGigalixirDeploy && templatePath.includes("Procfile")) continue;
    if (!hasHttpClient && templatePath.includes("/http_client.ex")) continue;

    const relativePath = templatePath.slice(prefix.length);
    const outputPath = transformFilename(relativePath).replace(
      /__elixirAppName__/g,
      normalizeElixirAppName(config.projectName),
    );
    const destPath = targetPath ? `${targetPath}/${outputPath}` : outputPath;

    let processedContent: string;
    if (isBinaryFile(templatePath)) {
      processedContent = "[Binary file]";
    } else if (templatePath.endsWith(".hbs")) {
      processedContent = processTemplateString(content, config);
    } else {
      processedContent = content;
    }

    if (processedContent.trim() === "") continue;

    const sourcePath = isBinaryFile(templatePath) ? templatePath : undefined;
    vfs.writeFile(destPath, processedContent, sourcePath);
  }
}
