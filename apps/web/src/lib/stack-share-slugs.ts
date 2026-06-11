import type { StackState } from "@/lib/stack-defaults";

/**
 * Share-slug names kept in a dependency-free module: the navbar needs to test
 * "is this path a stack share slug?" on every render, and must not drag the
 * compatibility engine / stack-translation bundle into the app entry chunk.
 */
export const ECOSYSTEM_SHARE_SLUGS = {
  typescript: "TypeScript",
  "react-native": "React-Native",
  rust: "Rust",
  python: "Python",
  go: "Go",
  java: "Java",
  elixir: "Elixir",
} as const satisfies Partial<Record<StackState["ecosystem"], string>>;

export function isStackShareSlug(slug: string): boolean {
  const normalizedSlug = slug.toLowerCase();
  if (normalizedSlug === "multi-ecosystem") return true;

  for (const [ecosystem, shareSlug] of Object.entries(ECOSYSTEM_SHARE_SLUGS)) {
    if (shareSlug.toLowerCase() === normalizedSlug || ecosystem === normalizedSlug) {
      return true;
    }
  }

  return false;
}
