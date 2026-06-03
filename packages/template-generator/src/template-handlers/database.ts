import type { ProjectConfig } from "@better-fullstack/types";

import type { VirtualFileSystem } from "../core/virtual-fs";

import { type TemplateData, processTemplatesFromPrefix } from "./utils";

export async function processDbTemplates(
  vfs: VirtualFileSystem,
  templates: TemplateData,
  config: ProjectConfig,
  targetPath = "packages/db",
): Promise<void> {
  if (config.database === "none") return;
  if (config.backend === "convex") return;

  // EdgeDB has its own query builder, no ORM needed
  if (config.database === "edgedb") {
    processTemplatesFromPrefix(vfs, templates, "db/base", targetPath, config);
    processTemplatesFromPrefix(vfs, templates, "db/edgedb/base", targetPath, config);
    return;
  }

  // Redis uses its own client, no ORM needed
  if (config.database === "redis") {
    processTemplatesFromPrefix(vfs, templates, "db/base", targetPath, config);
    // Use Upstash REST client for Upstash setup, ioredis for local/docker
    if (config.dbSetup === "upstash") {
      processTemplatesFromPrefix(vfs, templates, "db/redis/upstash", targetPath, config);
    } else {
      processTemplatesFromPrefix(vfs, templates, "db/redis/base", targetPath, config);
    }
    if (config.dbSetup === "docker") {
      processTemplatesFromPrefix(
        vfs,
        templates,
        "db-setup/docker-compose/redis",
        targetPath,
        config,
      );
    }
    return;
  }

  // Other databases require an ORM
  if (config.orm === "none") return;

  processTemplatesFromPrefix(vfs, templates, "db/base", targetPath, config);
  processTemplatesFromPrefix(vfs, templates, `db/${config.orm}/base`, targetPath, config);
  processTemplatesFromPrefix(
    vfs,
    templates,
    `db/${config.orm}/${config.database}`,
    targetPath,
    config,
  );

  if (config.dbSetup === "docker") {
    processTemplatesFromPrefix(
      vfs,
      templates,
      `db-setup/docker-compose/${config.database}`,
      targetPath,
      config,
    );
  }
}
