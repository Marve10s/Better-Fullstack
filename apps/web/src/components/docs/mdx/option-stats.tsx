import { CATEGORY_COUNT, OPTION_ENTRY_COUNT } from "@/lib/project-stats";

/**
 * Renders the total option entry count, computed from OPTION_CATEGORY_METADATA
 * at build time so it stays in sync as new options are added.
 *
 * Usage in MDX:
 *   <OptionCount /> option entries across <CategoryCount /> categories
 */
export function OptionCount() {
  return <>{OPTION_ENTRY_COUNT}</>;
}

/**
 * Renders the total category count, computed from OPTION_CATEGORY_METADATA.
 */
export function CategoryCount() {
  return <>{CATEGORY_COUNT}</>;
}
