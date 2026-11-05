import type { ProjectConfig } from "@better-fullstack/types";
import type { VirtualFileSystem } from "@/core/virtual-fs";
import { renderTemplateTree, type TemplateData } from "@/template-handlers/core/utils";

const FRAMEWORK_TEMPLATE_DIRECTORIES: Record<ProjectConfig["crystalWebFramework"], string[]> = {
  kemal: ["kemal"],
  lucky: ["http", "request", "http-guard", "lucky"],
  athena: ["http", "request", "http-guard", "athena"],
  marten: ["http", "request", "marten"],
  none: [],
};

export async function processCrystalBaseTemplate(vfs: VirtualFileSystem, templates: TemplateData, config: ProjectConfig, targetPath = "") {
  const shardName = `app_${config.projectName.toLowerCase().replace(/[^a-z0-9_]/g, "_")}`;
  const context = { ...config, shardName };
  const frameworkDirectories = FRAMEWORK_TEMPLATE_DIRECTORIES[config.crystalWebFramework];
  const directories = [
    ...frameworkDirectories.map((directory) => `frameworks/${directory}`),
    ...(config.crystalOrm === "none" ? [] : [`orm/${config.crystalOrm}`]),
    ...(config.crystalAuth === "none" ? [] : [`auth/${config.crystalAuth}`]),
    ...(["spectator", "spec-kemal"].includes(config.crystalTesting) ? [`testing/${config.crystalTesting}`] : []),
    ...(config.crystalValidation === "none" ? [] : [`validation/${config.crystalValidation}`]),
    ...(config.crystalCache === "none" ? [] : ["cache/shared"]),
    ...(config.crystalJobs === "none" ? [] : ["jobs/shared", `jobs/${config.crystalJobs}`]),
    ...(["jwt", "kemal-session"].includes(config.crystalAuth) ? ["auth/credentials"] : []),
    ...((config.crystalOrm !== "none" || config.crystalAuth === "jwt" || config.crystalCache !== "none" || config.crystalJobs !== "none") && !frameworkDirectories.includes("request")
      ? ["frameworks/request"]
      : []),
  ];
  const skipSpec = (templatePath: string) => config.crystalTesting === "none" && templatePath.includes("/spec/");
  renderTemplateTree(vfs, templates, {
    prefix: "crystal-base/",
    targetPath,
    context,
    skip: (templatePath) =>
      skipSpec(templatePath) ||
      ["frameworks/", "orm/", "auth/", "testing/", "validation/", "cache/", "jobs/"].some((directory) => templatePath.startsWith(`crystal-base/${directory}`)),
  });
  for (const directory of directories) {
    renderTemplateTree(vfs, templates, { prefix: `crystal-base/${directory}/`, targetPath, context, skip: skipSpec });
  }
}
