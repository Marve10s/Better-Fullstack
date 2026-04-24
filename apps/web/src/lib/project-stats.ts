import { ECOSYSTEM_VALUES, OPTION_CATEGORY_METADATA } from "@better-fullstack/types";

const ECOSYSTEM_LABELS: Record<(typeof ECOSYSTEM_VALUES)[number], string> = {
  typescript: "TypeScript",
  rust: "Rust",
  python: "Python",
  go: "Go",
  java: "Java",
};

export const OPTION_ENTRY_COUNT = Object.values(OPTION_CATEGORY_METADATA).reduce(
  (sum, metadata) => sum + metadata.options.length,
  0,
);

export const ECOSYSTEM_COUNT = ECOSYSTEM_VALUES.length;

export const ECOSYSTEM_NAMES = ECOSYSTEM_VALUES.map((ecosystem) => ECOSYSTEM_LABELS[ecosystem]);

export const OPTION_COUNT_LABEL = `${OPTION_ENTRY_COUNT}`;

export const ECOSYSTEM_COUNT_LABEL = `${ECOSYSTEM_COUNT}`;
