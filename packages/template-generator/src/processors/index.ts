import type { ProjectConfig } from "@better-fullstack/types";

import type { VirtualFileSystem } from "@/core/virtual-fs";

import { processEnvVariables } from "@/processors/config/env-vars";
import { processReadme } from "@/processors/config/readme-generator";
import { processAddonsDeps } from "@/processors/dependencies/addons-deps";
import { processAIDeps } from "@/processors/dependencies/ai-deps";
import { processAnalyticsDeps } from "@/processors/dependencies/analytics-deps";
import { processAnimationDeps } from "@/processors/dependencies/animation-deps";
import { processApiDeps } from "@/processors/dependencies/api-deps";
import { processAuthDeps } from "@/processors/dependencies/auth-deps";
import { processBackendDeps } from "@/processors/dependencies/backend-deps";
import { processBotProtectionDeps } from "@/processors/dependencies/bot-protection-deps";
import { processCachingDeps } from "@/processors/dependencies/caching-deps";
import { processCMSDeps } from "@/processors/dependencies/cms-deps";
import { processCSSAndUILibraryDeps } from "@/processors/dependencies/css-ui-deps";
import { processDatabaseDeps } from "@/processors/dependencies/db-deps";
import { processDeployDeps } from "@/processors/dependencies/deploy-deps";
import { processEcommerceDeps } from "@/processors/dependencies/ecommerce-deps";
import { processEffectDeps } from "@/processors/dependencies/effect-deps";
import { processEmailDeps } from "@/processors/dependencies/email-deps";
import { processEnvDeps } from "@/processors/dependencies/env-deps";
import { processExamplesDeps } from "@/processors/dependencies/examples-deps";
import { processFeatureFlagsDeps } from "@/processors/dependencies/feature-flags-deps";
import { processFileStorageDeps } from "@/processors/dependencies/file-storage-deps";
import { processFileUploadDeps } from "@/processors/dependencies/file-upload-deps";
import { processFormsDeps } from "@/processors/dependencies/forms-deps";
import { processI18nDeps } from "@/processors/dependencies/i18n-deps";
import { processInfraDeps } from "@/processors/dependencies/infra-deps";
import { processIntegrationsDeps } from "@/processors/dependencies/integrations-deps";
import { processJobQueueDeps } from "@/processors/dependencies/job-queue-deps";
import { processLoggingDeps } from "@/processors/dependencies/logging-deps";
import { processObservabilityDeps } from "@/processors/dependencies/observability-deps";
import { processPaymentsDeps } from "@/processors/dependencies/payments-deps";
import { processRateLimitDeps } from "@/processors/dependencies/rate-limit-deps";
import { processRealtimeDeps } from "@/processors/dependencies/realtime-deps";
import { processRuntimeDeps } from "@/processors/dependencies/runtime-deps";
import { processSearchDeps } from "@/processors/dependencies/search-deps";
import { processStateManagementDeps } from "@/processors/dependencies/state-management-deps";
import { processTestingDeps } from "@/processors/dependencies/testing-deps";
import { processValidationDeps } from "@/processors/dependencies/validation-deps";
import { processVectorDbDeps } from "@/processors/dependencies/vector-db-deps";
import { processWorkspaceDeps } from "@/processors/dependencies/workspace-deps";
import { processAlchemyPlugins } from "@/processors/plugins/alchemy-plugins";
import { processAuthPlugins } from "@/processors/plugins/auth-plugins";
import { processParaglidePlugins } from "@/processors/plugins/paraglide-plugins";
import { processPwaPlugins } from "@/processors/plugins/pwa-plugins";
import { processNxConfig } from "@/processors/workspace/nx-generator";
import { processTurboConfig } from "@/processors/workspace/turbo-generator";

export function processDependencies(vfs: VirtualFileSystem, config: ProjectConfig): void {
  processWorkspaceDeps(vfs, config);
  processEnvDeps(vfs, config);
  processInfraDeps(vfs, config);
  processDatabaseDeps(vfs, config);
  processBackendDeps(vfs, config);
  processRuntimeDeps(vfs, config);
  processApiDeps(vfs, config);
  processAuthDeps(vfs, config);
  processPaymentsDeps(vfs, config);
  processEmailDeps(vfs, config);
  processFileUploadDeps(vfs, config);
  processDeployDeps(vfs, config);
  processAddonsDeps(vfs, config);
  processExamplesDeps(vfs, config);
  processAIDeps(vfs, config);
  processEffectDeps(vfs, config);
  processStateManagementDeps(vfs, config);
  processFormsDeps(vfs, config);
  processValidationDeps(vfs, config);
  processRealtimeDeps(vfs, config);
  processJobQueueDeps(vfs, config);
  processAnimationDeps(vfs, config);
  processTestingDeps(vfs, config);
  processLoggingDeps(vfs, config);
  processObservabilityDeps(vfs, config);
  processRateLimitDeps(vfs, config);
  processBotProtectionDeps(vfs, config);
  processFeatureFlagsDeps(vfs, config);
  processIntegrationsDeps(vfs, config);
  processEcommerceDeps(vfs, config);
  processAnalyticsDeps(vfs, config);
  processCSSAndUILibraryDeps(vfs, config);
  processCMSDeps(vfs, config);
  processCachingDeps(vfs, config);
  processI18nDeps(vfs, config);
  processSearchDeps(vfs, config);
  processVectorDbDeps(vfs, config);
  processFileStorageDeps(vfs, config);
  processNxConfig(vfs, config);
  processTurboConfig(vfs, config);
}

export {
  processAddonsDeps,
  processAIDeps,
  processAnalyticsDeps,
  processAnimationDeps,
  processApiDeps,
  processAuthDeps,
  processBackendDeps,
  processCachingDeps,
  processI18nDeps,
  processSearchDeps,
  processVectorDbDeps,
  processFileStorageDeps,
  processCMSDeps,
  processCSSAndUILibraryDeps,
  processDatabaseDeps,
  processDeployDeps,
  processEffectDeps,
  processEmailDeps,
  processEnvDeps,
  processFileUploadDeps,
  processExamplesDeps,
  processFormsDeps,
  processInfraDeps,
  processJobQueueDeps,
  processLoggingDeps,
  processObservabilityDeps,
  processFeatureFlagsDeps,
  processIntegrationsDeps,
  processEcommerceDeps,
  processPaymentsDeps,
  processRateLimitDeps,
  processBotProtectionDeps,
  processReadme,
  processRealtimeDeps,
  processRuntimeDeps,
  processStateManagementDeps,
  processTestingDeps,
  processValidationDeps,
  processNxConfig,
  processTurboConfig,
  processWorkspaceDeps,
  processAuthPlugins,
  processAlchemyPlugins,
  processParaglidePlugins,
  processPwaPlugins,
  processEnvVariables,
};
