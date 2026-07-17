import type {
  OptionCategory,
  StackPart,
  StackSelectionKey,
  StackSelectionState,
} from "@better-fullstack/types";
import {
  getCategoryDisplayName,
  getOptionMetadata,
  STACK_SELECTION_OPTION_CATEGORY_BY_KEY,
} from "@better-fullstack/types";

import { TECH_OPTIONS } from "@/lib/constant";

import type { GeneratedStackPage, GeneratedStackPart, PublishedStackSeed } from "./types";

const CORE_KEYS_BY_ECOSYSTEM: Record<string, StackSelectionKey[]> = {
  typescript: [
    "webFrontend",
    "astroIntegration",
    "backend",
    "runtime",
    "database",
    "orm",
    "api",
    "auth",
    "cssFramework",
    "uiLibrary",
    "codeQuality",
  ],
  rust: [
    "rustFrontend",
    "rustWebFramework",
    "database",
    "rustOrm",
    "rustLogging",
    "rustErrorHandling",
  ],
  python: [
    "pythonWebFramework",
    "database",
    "pythonOrm",
    "pythonValidation",
    "pythonQuality",
  ],
  go: ["goWebFramework", "database", "goOrm", "goLogging"],
};

const ROLE_LABELS: Partial<Record<OptionCategory, string>> = {
  webFrontend: "Frontend",
  astroIntegration: "Frontend integration",
  backend: "Backend",
  runtime: "Runtime",
  database: "Database",
  orm: "ORM",
  api: "API",
  auth: "Authentication",
  cssFramework: "CSS",
  uiLibrary: "UI library",
  codeQuality: "Code quality",
  rustFrontend: "Frontend",
  rustWebFramework: "Backend",
  rustOrm: "ORM",
  rustLogging: "Logging",
  rustErrorHandling: "Error handling",
  pythonWebFramework: "Backend",
  pythonOrm: "ORM",
  pythonValidation: "Validation",
  pythonQuality: "Code quality",
  goWebFramework: "Backend",
  goOrm: "ORM",
  goLogging: "Logging",
};

function categoryForKey(key: StackSelectionKey): OptionCategory | undefined {
  return (
    STACK_SELECTION_OPTION_CATEGORY_BY_KEY as Partial<Record<StackSelectionKey, OptionCategory>>
  )[key];
}

function repositoryDescription(category: OptionCategory, id: string): string | undefined {
  return TECH_OPTIONS[category]?.find((option) => option.id === id)?.description;
}

function ownershipForPart(part: StackPart | undefined, parts: readonly StackPart[]): string {
  if (!part) return "Project-wide";
  if (!part.ownerPartId) {
    if (part.role === "frontend") return "Primary frontend";
    if (part.role === "backend") return "Primary backend";
    return part.ecosystem === "universal" ? "Project-wide" : `${part.ecosystem} stack`;
  }

  const owner = parts.find((candidate) => candidate.id === part.ownerPartId);
  if (!owner) return "Owner-scoped";
  const ownerLabel = getOptionMetadata(
    owner.role === "frontend" ? "webFrontend" : "backend",
    owner.toolId,
  )?.label;
  return ownerLabel ? `Scoped to ${ownerLabel}` : `Scoped to the ${owner.role}`;
}

export function deriveCanonicalParts(
  selection: StackSelectionState,
  parts: readonly StackPart[],
  seed: PublishedStackSeed,
): GeneratedStackPart[] {
  const explicitKeys = new Set(Object.keys(seed.selection) as StackSelectionKey[]);
  const keys = CORE_KEYS_BY_ECOSYSTEM[selection.ecosystem] ?? [];
  const result: GeneratedStackPart[] = [];

  for (const key of keys) {
    const category = categoryForKey(key);
    if (!category) continue;
    const rawValue = selection[key];
    const values = Array.isArray(rawValue) ? rawValue : [rawValue];

    for (const value of values) {
      if (typeof value !== "string" || value.length === 0) continue;
      if (value === "none" && !explicitKeys.has(key)) continue;
      const metadata = getOptionMetadata(category, value);
      if (!metadata) continue;
      const graphPart = parts.find(
        (part) => part.toolId === value && part.ecosystem !== "universal",
      ) ?? parts.find((part) => part.toolId === value);

      result.push({
        role: ROLE_LABELS[category] ?? getCategoryDisplayName(category),
        category,
        id: value,
        label: metadata.label,
        description: repositoryDescription(category, value),
        ownership: ownershipForPart(graphPart, parts),
      });
    }
  }

  return result;
}

export function deriveArchitecture(
  selection: StackSelectionState,
  canonicalParts: readonly GeneratedStackPart[],
  graphParts: readonly StackPart[],
): GeneratedStackPage["architecture"] {
  const primaryFrontends = graphParts.filter(
    (part) => part.role === "frontend" && !part.ownerPartId && part.source !== "provided",
  );
  const primaryBackends = graphParts.filter(
    (part) => part.role === "backend" && !part.ownerPartId && part.source !== "provided",
  );
  const facts: string[] = [];

  if (selection.ecosystem === "rust" && primaryFrontends.length && primaryBackends.length) {
    facts.push("The generated stack has Rust frontend and backend primary parts.");
  } else if (primaryFrontends.length && primaryBackends.length) {
    facts.push("The frontend and backend are separate primary stack parts.");
  } else if (primaryBackends.length) {
    facts.push("The generated stack is centered on a backend service with no browser frontend.");
  }

  if (selection.backend.startsWith("self-")) {
    facts.push("The selected frontend framework owns the server boundary through its self backend.");
  }

  for (const part of canonicalParts) {
    if (part.ownership.startsWith("Scoped to ")) {
      facts.push(`${part.label} is ${part.ownership.replace("Scoped", "scoped")}.`);
    }
  }

  if (
    selection.webFrontend.includes("astro") &&
    selection.astroIntegration === "react" &&
    selection.api === "trpc"
  ) {
    facts.push("Astro's React integration and tRPC are selected together.");
  }
  if (
    selection.ecosystem === "typescript" &&
    selection.uiLibrary === "shadcn-ui" &&
    selection.cssFramework === "tailwind"
  ) {
    facts.push("Tailwind CSS and shadcn/ui are selected together.");
  }

  const shape: GeneratedStackPage["architecture"]["shape"] =
    selection.ecosystem === "rust" && selection.rustFrontend !== "none"
      ? "rust-fullstack"
      : selection.ecosystem !== "typescript" && selection.ecosystem !== "react-native"
        ? "backend-service"
        : selection.backend.startsWith("self-")
          ? "single-app"
          : "split-app";

  return { shape, facts: [...new Set(facts)] };
}

export function deriveCompatibilityConstraints(
  selection: StackSelectionState,
  seed: PublishedStackSeed,
): string[] {
  const constraints: string[] = [];
  for (const key of Object.keys(seed.selection) as StackSelectionKey[]) {
    const category = categoryForKey(key);
    const value = selection[key];
    if (category && value === "none") {
      constraints.push(`${getCategoryDisplayName(category)} is intentionally set to none.`);
    }
  }

  if (
    selection.webFrontend.includes("astro") &&
    selection.astroIntegration === "react" &&
    selection.api === "trpc"
  ) {
    constraints.push("The selection includes Astro's React integration alongside tRPC.");
  }
  if (selection.webFrontend.includes("angular") && selection.api === "none") {
    constraints.push("The Angular selection keeps the external API integration set to none.");
  }
  if (
    selection.ecosystem === "typescript" &&
    selection.uiLibrary === "shadcn-ui" &&
    selection.cssFramework === "tailwind"
  ) {
    constraints.push("The selected shadcn/ui setup is paired with Tailwind CSS.");
  }

  return constraints;
}

export function architectureLabel(shape: GeneratedStackPage["architecture"]["shape"]): string {
  switch (shape) {
    case "single-app":
      return "framework-owned server stack";
    case "split-app":
      return "separate frontend and backend stack";
    case "backend-service":
      return "backend service";
    case "rust-fullstack":
      return "Rust frontend and backend stack";
  }
}
