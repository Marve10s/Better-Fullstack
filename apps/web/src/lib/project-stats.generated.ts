// Auto-computed from @better-fullstack/types — keep in sync with option-metadata.ts
import { OPTION_CATEGORY_METADATA } from "@better-fullstack/types";

export const OPTION_ENTRY_COUNT = Object.values(OPTION_CATEGORY_METADATA).reduce(
  (sum, metadata) => sum + metadata.options.length,
  0,
);
export const CATEGORY_COUNT = Object.keys(OPTION_CATEGORY_METADATA).length;
export const ECOSYSTEM_COUNT = 5;
export const ECOSYSTEM_NAMES = ["TypeScript", "Rust", "Python", "Go", "Java"] as const;
