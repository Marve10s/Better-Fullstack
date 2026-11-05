import type { ProjectConfig } from "@better-fullstack/types";

import { transformFilename } from "@/core/template-processor";
import type { VirtualFileSystem } from "@/core/virtual-fs";
import { renderTemplateTree, type TemplateData } from "@/template-handlers/core/utils";

export async function processRustBaseTemplate(
  vfs: VirtualFileSystem,
  templates: TemplateData,
  config: ProjectConfig,
  targetPath = "",
): Promise<void> {
  // Only process Rust templates if ecosystem is "rust"
  if (config.ecosystem !== "rust") return;

  const prefix = "rust-base/";
  const hasLeptos = config.rustFrontend === "leptos";
  const hasDioxus = config.rustFrontend === "dioxus";
  const hasYew = config.rustFrontend === "yew";
  const hasTonic = config.rustApi === "tonic";
  const hasAsyncGraphql = config.rustApi === "async-graphql";
  const hasClap = config.rustCli === "clap";
  const hasRatatui = config.rustCli === "ratatui";
  const isGraphClientOnly =
    (config.stackParts?.length ?? 0) > 0 &&
    config.stackParts?.some(
      (part) =>
        part.role === "frontend" &&
        part.ecosystem === "rust" &&
        !part.ownerPartId &&
        part.source !== "provided",
    ) &&
    !config.stackParts?.some(
      (part) =>
        part.role === "backend" &&
        part.ecosystem === "rust" &&
        !part.ownerPartId &&
        part.source !== "provided",
    );
  const hasServer = !isGraphClientOnly;
  const renderConfig = { ...config, graphRustClientOnly: isGraphClientOnly };
  // `loco` is added to RustWebFrameworkSchema separately; the cast keeps this
  // handler self-contained so it type-checks before that schema change lands.
  const hasLoco = config.rustWebFramework === "loco";

  const serverEntryDir = "crates/server/src/main/";
  const serverEntry = `${prefix}${serverEntryDir}${config.rustWebFramework ?? "none"}.rs.hbs`;
  const selectedServerEntry = templates.has(serverEntry)
    ? serverEntry
    : `${prefix}${serverEntryDir}none.rs.hbs`;

  renderTemplateTree(vfs, templates, {
    prefix,
    targetPath,
    context: renderConfig,
    outputPath: (relativePath) =>
      relativePath.startsWith(serverEntryDir)
        ? "crates/server/src/main.rs"
        : transformFilename(relativePath),
    skip: (templatePath) => {
      if (templatePath.includes(serverEntryDir) && templatePath !== selectedServerEntry) {
        return true;
      }

      // A Rust frontend can be paired with a backend from another ecosystem. In
      // that shape this workspace is a client-only app and must not contain an
      // empty, unbuildable server crate.
      if (!hasServer && templatePath.includes("crates/server/")) return true;

      // Skip client crate templates if Leptos is not selected
      if (!hasLeptos && templatePath.includes("crates/client/")) return true;

      // Skip dioxus-client crate templates if Dioxus is not selected
      if (!hasDioxus && templatePath.includes("crates/dioxus-client/")) return true;

      // Skip yew-client crate templates if Yew is not selected
      if (!hasYew && templatePath.includes("crates/yew-client/")) return true;

      // Skip proto crate templates if Tonic is not selected
      if (!hasTonic && templatePath.includes("crates/proto/")) return true;

      // Skip grpc.rs if Tonic is not selected
      if (!hasTonic && templatePath.includes("crates/server/src/grpc.rs")) return true;

      // Skip graphql.rs if async-graphql is not selected
      if (!hasAsyncGraphql && templatePath.includes("crates/server/src/graphql.rs")) return true;

      // Skip Loco-only files (app module, controllers, config) unless Loco is the
      // selected web framework. Loco is an opinionated framework with its own
      // Hooks/AppRoutes structure, so these files only make sense for it.
      if (!hasLoco && templatePath.includes("crates/server/src/app.rs")) return true;
      if (!hasLoco && templatePath.includes("crates/server/src/controllers/")) return true;
      if (!hasLoco && templatePath.includes("crates/server/config/")) return true;

      // Skip optional capability modules when their option is not selected
      if (
        config.rustRealtime === "none" &&
        templatePath.includes("crates/server/src/realtime.rs")
      ) {
        return true;
      }
      if (
        config.rustMessageQueue === "none" &&
        templatePath.includes("crates/server/src/messaging.rs")
      ) {
        return true;
      }
      if (
        config.rustObservability === "none" &&
        templatePath.includes("crates/server/src/otel.rs")
      ) {
        return true;
      }
      if (
        config.rustTemplating === "none" &&
        templatePath.includes("crates/server/src/templating.rs")
      ) {
        return true;
      }
      if (
        config.rustTemplating !== "askama" &&
        templatePath.includes("crates/server/templates/hello.html")
      ) {
        return true;
      }

      // Skip cli crate templates if Clap is not selected
      if (!hasClap && templatePath.includes("crates/cli/")) return true;

      // Skip tui crate templates if Ratatui is not selected
      if (!hasRatatui && templatePath.includes("crates/tui/")) return true;
      return false;
    },
  });
}
