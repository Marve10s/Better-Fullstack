import type { ComponentType } from "react";

import type { TocEntry } from "@/lib/docs/remark-extract-toc";

import type { GuideFrontmatter } from "./source";

export type GuideMdxModule = {
  default: ComponentType<{ components?: Record<string, ComponentType<unknown>> }>;
  frontmatter?: GuideFrontmatter;
  toc?: TocEntry[];
};

export const guideMdxLoaders = import.meta.glob<GuideMdxModule>([
  "../../../content/guides/**/*.mdx",
  "!../../../content/guides/**/*.{es,zh,ja,ko,zh-Hant,de,fr,uk}.mdx",
]);
