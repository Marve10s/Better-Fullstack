import type { ComponentType } from "react";

import type { TocEntry } from "./remark-extract-toc";
import type { DocFrontmatter } from "./source";

export type DocMdxModule = {
  default: ComponentType<{ components?: Record<string, ComponentType<unknown>> }>;
  frontmatter?: DocFrontmatter;
  toc?: TocEntry[];
};

export type RawMdxModule = string;

export const docsMdxLoaders = import.meta.glob<DocMdxModule>([
  "../../../content/docs/**/*.mdx",
  "!../../../content/docs/**/*.{es,zh,ja,ko,zh-Hant,de,fr}.mdx",
]);

export const docsRawMdxLoaders = import.meta.glob<RawMdxModule>(
  [
    "../../../content/docs/**/*.mdx",
    "!../../../content/docs/**/*.{es,zh,ja,ko,zh-Hant,de,fr}.mdx",
  ],
  {
    query: "?raw",
    import: "default",
  },
);
