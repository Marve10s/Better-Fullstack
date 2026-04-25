/// <reference types="vite/client" />

/**
 * Type declarations for compiled `.mdx` modules. The shape mirrors the
 * named exports our remark pipeline emits:
 *   - default: the React component rendering the MDX body
 *   - frontmatter: parsed YAML frontmatter (from remark-mdx-frontmatter)
 *   - toc: ordered heading list (from remarkExtractToc)
 */
declare module "*.mdx" {
  import type { ComponentType } from "react";
  import type { TocEntry } from "@/lib/docs/remark-extract-toc";

  export const frontmatter: {
    title?: string;
    description?: string;
    [key: string]: unknown;
  };
  export const toc: TocEntry[];
  const Component: ComponentType<{
    components?: Record<string, ComponentType<unknown>>;
  }>;
  export default Component;
}
