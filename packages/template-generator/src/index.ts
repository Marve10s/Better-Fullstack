export * from "@/types";
export * from "@/core/virtual-fs";
export * from "@/core/template-processor";
export * from "@/generator";
export { processAddonTemplates } from "@/template-handlers";
export { processAddonsDeps } from "@/processors";

export { EMBEDDED_TEMPLATES, TEMPLATE_COUNT } from "@/templates.generated";
export { dependencyVersionMap, type AvailableDependencies } from "@/dependencies/add-deps";
export * from "@/dependencies/dependency-checker";
export * from "@/dependencies/dependency-update-policy";
export {
  validatePreflightConfig,
  type PreflightWarning,
  type PreflightResult,
} from "@/preflight-validation";

export { getGraphProjectTasks, type GraphProjectTask } from "@/graph/graph-project";
