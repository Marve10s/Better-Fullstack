import { ECOSYSTEM_VALUES, OPTION_CATEGORY_METADATA } from "@better-fullstack/types";

export const OPTION_ENTRY_COUNT = Object.values(OPTION_CATEGORY_METADATA).reduce(
  (sum, metadata) => sum + metadata.options.length,
  0,
);
export const CATEGORY_COUNT = Object.keys(OPTION_CATEGORY_METADATA).length;

// Display names keyed by the canonical EcosystemSchema values. Using a typed
// Record means adding an ecosystem to the schema fails the build here until a
// label is provided, so the count and names can never silently drift again
// (previously this was a hardcoded `7` that omitted .NET).
const ECOSYSTEM_DISPLAY_NAMES: Record<(typeof ECOSYSTEM_VALUES)[number], string> = {
  typescript: "TypeScript",
  "react-native": "React Native",
  rust: "Rust",
  python: "Python",
  go: "Go",
  java: "Java",
  elixir: "Elixir",
  dotnet: ".NET",
};

export const ECOSYSTEM_NAMES = ECOSYSTEM_VALUES.map((value) => ECOSYSTEM_DISPLAY_NAMES[value]);

export const OPTION_COUNT_LABEL = `${OPTION_ENTRY_COUNT}`;

export const ECOSYSTEM_COUNT_LABEL = `${ECOSYSTEM_NAMES.length}`;
