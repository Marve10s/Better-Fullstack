export {
  type TemplateData,
  processTemplatesFromPrefix,
  hasTemplatesWithPrefix,
} from "@/template-handlers/core/utils";
export { processBaseTemplate } from "@/template-handlers/core/base";
export { processRustBaseTemplate } from "@/template-handlers/ecosystems/rust-base";
export { processPythonBaseTemplate } from "@/template-handlers/ecosystems/python-base";
export { processGoBaseTemplate } from "@/template-handlers/ecosystems/go-base";
export { processJavaBaseTemplate } from "@/template-handlers/ecosystems/java-base";
export { processDotnetBaseTemplate } from "@/template-handlers/ecosystems/dotnet-base";
export { processElixirBaseTemplate } from "@/template-handlers/ecosystems/elixir-base";
export {
  processFrontendTemplates,
  processGraphNativeAppTemplates,
} from "@/template-handlers/core/frontend";
export { processBackendTemplates } from "@/template-handlers/core/backend";
export { processDbTemplates } from "@/template-handlers/features/database";
export { processApiTemplates } from "@/template-handlers/features/api";
export { processConfigPackage, processEnvPackage } from "@/template-handlers/core/packages";
export { processAuthTemplates } from "@/template-handlers/features/auth";
export { processPaymentsTemplates } from "@/template-handlers/features/payments";
export { processEmailTemplates } from "@/template-handlers/features/email";
export { processAddonTemplates } from "@/template-handlers/features/addons";
export { processExampleTemplates } from "@/template-handlers/features/examples";
export { processExtrasTemplates } from "@/template-handlers/core/extras";
export { processDeployTemplates } from "@/template-handlers/features/deploy";
export { processLoggingTemplates } from "@/template-handlers/features/logging";
export { processObservabilityTemplates } from "@/template-handlers/features/observability";
export { processRateLimitTemplates } from "@/template-handlers/features/rate-limit";
export { processBotProtectionTemplates } from "@/template-handlers/features/bot-protection";
export { processFeatureFlagsTemplates } from "@/template-handlers/features/feature-flags";
export { processIntegrationsTemplates } from "@/template-handlers/features/integrations";
export { processEcommerceTemplates } from "@/template-handlers/features/ecommerce";
export { processAnalyticsTemplates } from "@/template-handlers/features/analytics";
export { processAITemplates } from "@/template-handlers/features/ai";
export { processRealtimeTemplates } from "@/template-handlers/features/realtime";
export { processJobQueueTemplates } from "@/template-handlers/features/job-queue";
export { processCMSTemplates } from "@/template-handlers/features/cms";
export { processI18nTemplates } from "@/template-handlers/features/i18n";
export { processSearchTemplates } from "@/template-handlers/features/search";
export { processVectorDbTemplates } from "@/template-handlers/features/vector-db";
export { processFileStorageTemplates } from "@/template-handlers/features/file-storage";
export { processTestingTemplates } from "@/template-handlers/features/testing";
