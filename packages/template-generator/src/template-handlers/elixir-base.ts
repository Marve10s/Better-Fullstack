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
  const hasEcto = config.elixirOrm !== "none";
  const hasAuth = hasPhoenix && config.elixirAuth === "phx-gen-auth" && hasEcto;
  const hasChannels =
    hasPhoenix && (config.elixirRealtime === "channels" || config.elixirRealtime === "presence");
  const hasPresence = config.elixirRealtime === "presence";
  const hasOban = config.elixirJobs === "oban";
  const hasQuantum = config.elixirJobs === "quantum";
  const hasAbsinthe = hasPhoenix && config.elixirApi === "absinthe" && hasEcto;
  const hasEmail = config.elixirEmail === "swoosh";
  const hasDocker = ["docker", "fly", "gigalixir", "mix-release"].includes(config.elixirDeploy);
  const hasHttpClient = config.elixirHttp !== "none";

  for (const [templatePath, content] of templates) {
    if (!templatePath.startsWith(prefix)) continue;
    if (!hasPhoenix && templatePath.includes("___web")) continue;
    if (!hasPhoenix && templatePath.includes("test/support/conn_case")) continue;
    if (!hasLiveView && templatePath.includes("/live/")) continue;
    if (!hasEcto && (templatePath.includes("/repo.ex") || templatePath.includes("/migrations/")))
      continue;
    if (!hasEcto && templatePath.includes("priv/repo/seeds.exs")) continue;
    if (
      !hasEcto &&
      (templatePath.includes("/catalog") || templatePath.includes("/item_controller"))
    )
      continue;
    if (!hasAuth && templatePath.includes("/accounts")) continue;
    if (!hasAuth && templatePath.includes("create_users")) continue;
    if (!hasAuth && templatePath.includes("/user_session_controller")) continue;
    if (!hasChannels && templatePath.includes("/channels/user_socket")) continue;
    if (!hasChannels && templatePath.includes("/channels/room_channel")) continue;
    if (!hasPresence && templatePath.includes("/channels/presence")) continue;
    if (!hasOban && templatePath.includes("/workers/")) continue;
    if (!hasOban && templatePath.includes("add_oban_jobs")) continue;
    if (!hasQuantum && templatePath.includes("/scheduler.ex")) continue;
    if (!hasAbsinthe && templatePath.includes("/graphql/")) continue;
    if (!hasEmail && templatePath.includes("/mailer.ex")) continue;
    if (!hasDocker && templatePath.includes("Dockerfile")) continue;
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
