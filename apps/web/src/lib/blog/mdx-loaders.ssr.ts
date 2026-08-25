import type { ComponentType } from "react";

import type { BlogFrontmatter } from "@/lib/blog/source";
import type { TocEntry } from "@/lib/docs/remark-extract-toc";

export type BlogMdxModule = {
  default: ComponentType<{ components?: Record<string, ComponentType<unknown>> }>;
  frontmatter?: BlogFrontmatter;
  toc?: TocEntry[];
};

export const blogMdxLoaders = import.meta.glob<BlogMdxModule>([
  "@web-root/content/blog/**/*.mdx",
  "!@web-root/content/blog/**/*.{es,zh,ja,ko,zh-Hant,de,fr,uk}.mdx",
]);
