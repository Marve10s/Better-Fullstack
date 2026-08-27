import type { ComponentType } from "react";

import type { TocEntry } from "@/lib/docs/remark-extract-toc";
import type { DocFrontmatter } from "@/lib/docs/source";

export type DocMdxModule = {
  default: ComponentType<{ components?: Record<string, ComponentType<unknown>> }>;
  frontmatter?: DocFrontmatter;
  toc?: TocEntry[];
};

export type RawMdxModule = string;

export const docsMdxLoaders = import.meta.glob<DocMdxModule>([
  "@web-root/content/docs/**/*.mdx",
  "!@web-root/content/docs/**/*.{es,zh,ja,ko,zh-Hant,de,fr,uk}.mdx",
]);

export const docsRawMdxLoaders = import.meta.glob<RawMdxModule>(
  [
    "@web-root/content/docs/**/*.mdx",
    "!@web-root/content/docs/**/*.{es,zh,ja,ko,zh-Hant,de,fr,uk}.mdx",
  ],
  {
    query: "?raw",
    import: "default",
  },
);
