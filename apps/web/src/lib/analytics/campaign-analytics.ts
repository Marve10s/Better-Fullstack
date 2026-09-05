import {
  getStackSelectionEvidence,
  parseStackPartSpecs,
  STARTER_TRACK_DEFINITIONS,
  type CapabilityInventoryRecord,
  type Ecosystem,
} from "@better-fullstack/types";
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
