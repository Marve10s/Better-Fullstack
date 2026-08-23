import {
  getStackSelectionEvidence,
  parseStackPartSpecs,
  STARTER_TRACK_DEFINITIONS,
  type CapabilityInventoryRecord,
  type Ecosystem,
} from "@better-fullstack/types";
import { track } from "@vercel/analytics";

import type { StackState } from "@/lib/stack-defaults";

import { normalizeCampaignSlug } from "@/lib/campaign";
import {
  isBrowserTelemetryEnabled,
  sanitizeProductProperties,
  trackProductEvent,
} from "@/lib/product-analytics";

export type CampaignEvent =
  | "campaign_viewed"
  | "campaign_preset_opened"
  | "builder_viewed"
  | "builder_view_changed"
  | "builder_command_copied"
  | "builder_run_started"
  | "builder_run_ready"
  | "builder_run_failed"
  | "builder_run_stopped"
  | "builder_file_edited"
  | "builder_zip_started"
  | "builder_zip_downloaded"
  | "builder_zip_failed"
  | "builder_share_prompted"
  | "builder_stack_shared"
  | "builder_github_clicked"
  | "builder_starter_track_applied"
  | "builder_incompatibility_recovered"
  | "builder_plan_abandoned";

type CampaignProperties = Record<string, string | number | boolean | null | undefined>;

const BACKEND_KEY_BY_ECOSYSTEM = {
  typescript: "backend",
  "react-native": null,
  rust: "rustWebFramework",
  python: "pythonWebFramework",
  go: "goWebFramework",
  java: "javaWebFramework",
  elixir: "elixirWebFramework",
  dotnet: "dotnetWebFramework",
} as const satisfies Record<Ecosystem, keyof StackState | null>;

function soloFrontend(stack: StackState) {
  if (stack.ecosystem === "typescript") {
    return stack.webFrontend.filter((frontend) => frontend !== "none").join(",") || "none";
  }
  if (stack.ecosystem === "react-native") {
    return stack.nativeFrontend.filter((frontend) => frontend !== "none").join(",") || "none";
  }
  if (stack.ecosystem === "rust") return stack.rustFrontend;
  return "none";
}

function soloBackend(stack: StackState) {
  const key = BACKEND_KEY_BY_ECOSYSTEM[stack.ecosystem];
  if (!key) return "none";
  const value = stack[key];
  return typeof value === "string" ? value : "none";
}

export function trackCampaignEvent(event: CampaignEvent, properties?: CampaignProperties) {
  if (!isBrowserTelemetryEnabled()) return;
  const safeProperties = sanitizeCampaignProperties(properties);
  track(event, safeProperties);
  const status = event.endsWith("_failed")
    ? "failed"
    : event.endsWith("_abandoned")
      ? "cancelled"
      : event.endsWith("_started") || event.endsWith("_viewed") || event.endsWith("_opened")
        ? "started"
        : "succeeded";
  const productProperties = { ...safeProperties };
  if (status === "failed") {
    productProperties.failure_stage = productProperties.stage;
    productProperties.failure_reason = productProperties.reason;
    delete productProperties.stage;
    delete productProperties.reason;
  }
  trackProductEvent(event.replaceAll("_", "-"), status, productProperties);
}

export function sanitizeCampaignProperties(
  properties: CampaignProperties = {},
): CampaignProperties {
  const safe = sanitizeProductProperties(properties);
  if (safe.campaign !== undefined) {
    const campaign = normalizeCampaignSlug(safe.campaign);
    if (campaign) safe.campaign = campaign;
    else delete safe.campaign;
  }
  return safe;
}

export function stackAnalyticsProperties(
  stack: StackState,
  extra?: CampaignProperties,
): CampaignProperties {
  if (stack.stackMode === "multi") {
    const primaryParts = parseStackPartSpecs(stack.stackPartSpecs, "selected").filter(
      (part) => !part.ownerPartId,
    );
    const partValue = (role: "frontend" | "backend" | "database") =>
      primaryParts
        .filter((part) => part.role === role && part.toolId !== "none")
        .map((part) => part.toolId)
        .join(",") || "none";
    const ecosystems = [
      ...new Set(
        primaryParts.map((part) => part.ecosystem).filter((ecosystem) => ecosystem !== "universal"),
      ),
    ];
    return {
      ecosystem: ecosystems.join(",") || stack.ecosystem,
      mode: stack.stackMode,
      frontend: partValue("frontend"),
      backend: partValue("backend"),
      database: partValue("database"),
      ...extra,
    };
  }

  return {
    ecosystem: stack.ecosystem,
    mode: stack.stackMode,
    frontend: soloFrontend(stack),
    backend: soloBackend(stack),
    database: stack.database,
    ...extra,
  };
}

export function selectionAnalyticsProperties(
  stack: StackState,
  inventory: readonly CapabilityInventoryRecord[],
  extra?: CampaignProperties,
): CampaignProperties {
  const selectionSignature = [...stack.stackPartSpecs].sort().join("|");
  const track = STARTER_TRACK_DEFINITIONS.find(
    (candidate) => [...candidate.selection.stackPartSpecs].sort().join("|") === selectionSignature,
  );
  const evidence = getStackSelectionEvidence(stack, { inventory });

  return stackAnalyticsProperties(stack, {
    ...extra,
    selected_evidence_level: evidence.level,
    ...(track ? { starter_track: track.id } : {}),
  });
}
