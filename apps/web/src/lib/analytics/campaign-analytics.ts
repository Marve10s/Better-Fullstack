import {
  getStackSelectionEvidence,
  parseStackPartSpecs,
  STARTER_TRACK_DEFINITIONS,
  type CapabilityInventoryRecord,
  type Ecosystem,
} from "@better-fullstack/types";
import { stackSelectionToProjectConfig } from "@better-fullstack/types/stack-translation";
import { sanitizeTelemetryStackDimension } from "@better-fullstack/types/telemetry";

import type { CampaignProperties } from "@/lib/analytics/campaign-events";
import type { StackState } from "@/lib/stack/stack-defaults";

export {
  trackCampaignEvent,
  sanitizeCampaignProperties,
  type CampaignEvent,
} from "@/lib/analytics/campaign-events";

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

export function stackAnalyticsProperties(
  stack: StackState,
  extra?: CampaignProperties,
): CampaignProperties {
  const selections: CampaignProperties = {};
  let config: Record<string, unknown> = stack;
  let translationFailed = false;
  try {
    config = stackSelectionToProjectConfig(stack, { projectDir: "", relativePath: "" });
  } catch {
    translationFailed = true;
    // An incomplete selection must never make a product action fail for analytics.
  }
  for (const [key, value] of Object.entries(config)) {
    const safe = sanitizeTelemetryStackDimension(key, value);
    if (safe !== undefined) selections[key] = safe;
  }
  if (stack.stackMode === "multi") {
    const allParts = (() => {
      try {
        return parseStackPartSpecs(stack.stackPartSpecs, "selected").filter(
          (part) => part.source !== "provided" && part.toolId !== "none",
        );
      } catch {
        return [];
      }
    })();
    const safeParts = sanitizeTelemetryStackDimension(
      "stackPartSelections",
      allParts.map((part) => `${part.role}:${part.ecosystem}:${part.toolId}`),
    );
    const graphSelections = safeParts === undefined ? {} : { stackPartSelections: safeParts };
    const primaryParts = allParts.filter((part) => !part.ownerPartId);
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
      ...(translationFailed ? selections : {}),
      ...graphSelections,
      ecosystem: ecosystems.join(",") || stack.ecosystem,
      mode: stack.stackMode,
      frontend: partValue("frontend"),
      backend: partValue("backend"),
      database: partValue("database"),
      ...extra,
    };
  }

  return {
    ...selections,
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
  let evidence;
  try {
    evidence = getStackSelectionEvidence(stack, { inventory });
  } catch {
    // Onboarding selections may be incomplete or temporarily incompatible.
    // Analytics must not require a project that is ready for generation.
    return stackAnalyticsProperties(stack, extra);
  }

  return stackAnalyticsProperties(stack, {
    ...extra,
    selected_evidence_level: evidence.level,
    ...(track ? { starter_track: track.id } : {}),
  });
}
