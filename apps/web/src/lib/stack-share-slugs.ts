import type { StackState } from "@/lib/stack-defaults";

/**
 * Share-slug names kept in a dependency-free module: the navbar needs to test
 * "is this path a stack share slug?" on every render, and must not drag the
 * compatibility engine / stack-translation bundle into the app entry chunk.
 */
export const ECOSYSTEM_SHARE_SLUGS = {
  typescript: "typescript",
  "react-native": "react-native",
  rust: "rust",
  python: "python",
  go: "go",
  java: "java",
  elixir: "elixir",
  dotnet: "dotnet",
} as const satisfies Record<StackState["ecosystem"], string>;

export type StackShareSlug =
  | (typeof ECOSYSTEM_SHARE_SLUGS)[keyof typeof ECOSYSTEM_SHARE_SLUGS]
  | "multi-ecosystem";

export function normalizeStackShareSlug(slug: string): StackShareSlug | null {
  const normalizedSlug = slug.toLowerCase();
  if (normalizedSlug === "multi-ecosystem") return "multi-ecosystem";

  for (const [ecosystem, shareSlug] of Object.entries(ECOSYSTEM_SHARE_SLUGS)) {
    if (shareSlug === normalizedSlug || ecosystem === normalizedSlug) {
      return shareSlug;
    }
  }

  return null;
}

export function getCanonicalStackSharePath(slug: string): string | null {
  const canonicalSlug = normalizeStackShareSlug(slug);
  return canonicalSlug ? `/${canonicalSlug}` : null;
}

export function isStackShareSlug(slug: string): boolean {
  return normalizeStackShareSlug(slug) !== null;
}
