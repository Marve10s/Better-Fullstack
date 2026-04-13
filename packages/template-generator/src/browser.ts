export type * from "./types";
export { generateVirtualProject, type TemplateData } from "./generator";
export { EMBEDDED_TEMPLATES, TEMPLATE_COUNT } from "./templates.generated";
export {
  validatePreflightConfig,
  type PreflightWarning,
  type PreflightResult,
} from "./preflight-validation";
