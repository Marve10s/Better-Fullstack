import { analyzeStackCompatibility } from "@better-fullstack/types";
import {
  createStackSelectionSearchParams as createStackSearchParams,
} from "@better-fullstack/types/stack-translation";

import { DEFAULT_STACK, type StackState } from "@/lib/stack-defaults";

const ECOSYSTEM_SHARE_SLUGS = {
  typescript: "TypeScript",
  "react-native": "React-Native",
  rust: "Rust",
  python: "Python",
  go: "Go",
  java: "Java",
  elixir: "Elixir",
} as const satisfies Partial<Record<StackState["ecosystem"], string>>;

const DEFAULT_MULTI_STACK_PARTS = [
  "frontend:typescript:tanstack-router",
  "backend:typescript:hono",
  "backend.orm:typescript:drizzle",
  "backend.api:typescript:trpc",
  "backend.auth:typescript:better-auth",
  "database:universal:sqlite",
] as const;

function withCompatibility(stack: StackState): StackState {
  const compatibility = analyzeStackCompatibility(stack);
  return compatibility.adjustedStack ? { ...stack, ...compatibility.adjustedStack } : stack;
}

function createEcosystemShareStack(ecosystem: StackState["ecosystem"]): StackState {
  return withCompatibility({
    ...DEFAULT_STACK,
    ecosystem,
    stackMode: "solo",
    stackPartSpecs: [],
  });
}

export function createDefaultMultiEcosystemShareStack(): StackState {
  return {
    ...DEFAULT_STACK,
    stackMode: "multi",
    stackPartSpecs: [...DEFAULT_MULTI_STACK_PARTS],
    cssFramework: "none",
    uiLibrary: "none",
    backend: "hono",
    orm: "drizzle",
    api: "trpc",
    auth: "better-auth",
    database: "sqlite",
    rustWebFramework: "none",
    rustOrm: "none",
    rustApi: "none",
    rustAuth: "none",
    pythonWebFramework: "none",
    pythonOrm: "none",
    pythonApi: "none",
    pythonAuth: "none",
    goWebFramework: "none",
    goOrm: "none",
    goApi: "none",
    goAuth: "none",
    javaWebFramework: "none",
    javaOrm: "none",
    javaAuth: "none",
    elixirWebFramework: "none",
    elixirOrm: "none",
    elixirApi: "none",
    elixirAuth: "none",
  };
}

function stackFingerprint(stack: StackState): string {
  return createStackSearchParams(stack, { includeDefaults: true }).toString();
}

function stacksMatch(left: StackState, right: StackState): boolean {
  return stackFingerprint(left) === stackFingerprint(right);
}

export function getStackSharePath(stack: StackState): string | null {
  const multiStack = createDefaultMultiEcosystemShareStack();
  if (stacksMatch(stack, multiStack)) return "/multi-ecosystem";

  for (const [ecosystem, slug] of Object.entries(ECOSYSTEM_SHARE_SLUGS)) {
    if (stacksMatch(stack, createEcosystemShareStack(ecosystem as StackState["ecosystem"]))) {
      return `/${slug}`;
    }
  }

  return null;
}

export function parseStackShareSlug(slug: string): StackState | null {
  const normalizedSlug = slug.toLowerCase();
  if (normalizedSlug === "multi-ecosystem") {
    return createDefaultMultiEcosystemShareStack();
  }

  for (const [ecosystem, shareSlug] of Object.entries(ECOSYSTEM_SHARE_SLUGS)) {
    if (shareSlug.toLowerCase() === normalizedSlug || ecosystem === normalizedSlug) {
      return createEcosystemShareStack(ecosystem as StackState["ecosystem"]);
    }
  }

  return null;
}
