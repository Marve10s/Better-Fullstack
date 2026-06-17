import type { ComponentType } from "react";

import type { TocEntry } from "@/lib/docs/remark-extract-toc";

import type { BlogFrontmatter } from "./source";

export type BlogMdxModule = {
  default: ComponentType<{ components?: Record<string, ComponentType<unknown>> }>;
  frontmatter?: BlogFrontmatter;
  toc?: TocEntry[];
};

export const blogMdxLoaders = import.meta.glob<BlogMdxModule>([
  "../../../content/blog/**/*.mdx",
  "!../../../content/blog/**/*.{es,zh,ja,ko,zh-Hant,de,fr}.mdx",
]);
