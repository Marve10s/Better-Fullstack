import { OPTION_CATEGORY_METADATA } from "@better-fullstack/types";

export const OPTION_ENTRY_COUNT = Object.values(OPTION_CATEGORY_METADATA).reduce(
  (sum, metadata) => sum + metadata.options.length,
  0,
);
export const CATEGORY_COUNT = Object.keys(OPTION_CATEGORY_METADATA).length;
const ECOSYSTEM_COUNT = 7;
export const ECOSYSTEM_NAMES = [
  "TypeScript",
  "React Native",
  "Rust",
  "Python",
  "Go",
  "Java",
  "Elixir",
] as const;

export const OPTION_COUNT_LABEL = `${OPTION_ENTRY_COUNT}`;

export const ECOSYSTEM_COUNT_LABEL = `${ECOSYSTEM_COUNT}`;
