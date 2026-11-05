import type { ProjectConfig } from "@better-fullstack/types";

import type { VirtualFileSystem } from "@/core/virtual-fs";

import { getGraphBackendConnections } from "@/graph/graph-backend";
import { getGraphFrontendPorts } from "@/graph/graph-frontend";
import { renderTemplateTree, type TemplateData } from "@/template-handlers/core/utils";

const RUBY_VARIANT_DIRECTORIES = ["web", "orm", "auth", "testing", "validation", "cache", "jobs", "email", "logging", "http-client"] as const;

export async function processRubyBaseTemplate(
  vfs: VirtualFileSystem,
  templates: TemplateData,
  config: ProjectConfig,
  targetPath = "",
): Promise<void> {
  if (config.ecosystem !== "ruby") return;
  const connection = getGraphBackendConnections(config).find(
    (entry) =>
      entry.ecosystem === "ruby" &&
      (entry.targetPath === targetPath || (targetPath === "" && entry.targetPath === ".")),
  );
  const graphOrigins = [...new Set(getGraphFrontendPorts(config).values())].map(
    (port) => `http://localhost:${port}`,
  );
  const rubyWebOrigin =
    graphOrigins.length > 0
      ? graphOrigins.join(",")
      : (connection?.webOrigin ?? "http://localhost:3001");
  const context = {
    ...config,
    rubyOrm: config.rubyOrm ?? "none",
    rubyAuth: config.rubyAuth ?? "none",
    rubyTesting: config.rubyTesting ?? "minitest",
    rubyValidation: config.rubyValidation ?? "none",
    rubyCache: config.rubyCache ?? "none",
    rubyJobQueue: config.rubyJobQueue ?? "none",
    rubyEmail: config.rubyEmail ?? "none",
    rubyLogging: config.rubyLogging ?? "logger",
    rubyHttpClient: config.rubyHttpClient ?? "none",
    rubyPort: connection ? new URL(connection.serverUrl).port : "4567",
    rubyWebOrigin,
  };
  renderTemplateTree(vfs, templates, {
    prefix: "ruby-base/",
    targetPath,
    context,
    skip: (templatePath) =>
      RUBY_VARIANT_DIRECTORIES.some((directory) =>
        templatePath.startsWith(`ruby-base/${directory}/`),
      ),
  });
  const variants = {
    web: config.rubyWebFramework,
    orm: context.rubyOrm,
    auth: context.rubyAuth,
    testing: context.rubyTesting,
    validation: context.rubyValidation,
    cache: context.rubyCache,
    jobs: context.rubyJobQueue,
    email: context.rubyEmail,
    logging: context.rubyLogging,
    "http-client": context.rubyHttpClient,
  };
  for (const [directory, option] of Object.entries(variants)) {
    if (!option || option === "none") continue;
    renderTemplateTree(vfs, templates, {
      prefix: `ruby-base/${directory}/${option}/`,
      targetPath,
      context,
    });
  }
}
