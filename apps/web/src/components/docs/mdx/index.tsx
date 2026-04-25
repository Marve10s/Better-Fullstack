import type { ComponentType } from "react";

import { Callout } from "./callout";
import { CodeBlock } from "./code-block";
import { CategoryCount, OptionCount } from "./option-stats";
import { PMTabs } from "./pm-tabs";

/**
 * Registry of components passed to `<MDXProvider>` (or directly via the
 * `components` prop on each MDX module). Maps both:
 *   - HTML element overrides (e.g. `<pre>` → CodeBlock chrome)
 *   - Custom MDX-only components used inside docs (e.g. `<Callout>`)
 *
 * Keys are case-sensitive; markdown elements use lowercase names while
 * JSX-imported components keep their PascalCase names.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mdxComponents: Record<string, ComponentType<any>> = {
  // HTML overrides
  pre: CodeBlock,

  // MDX-only components — referenced by name from .mdx files
  Callout,
  CategoryCount,
  OptionCount,
  PMTabs,
};
