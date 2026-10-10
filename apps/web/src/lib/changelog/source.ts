import { changelogMeta } from "virtual:content-meta";

import { createSuspenseCache } from "@/lib/content/mdx-suspense-cache";

export type ChangelogFrontmatter = {
  title?: string;
  description?: string;
  updated?: string;
};

export type ChangelogPage = {
  url: string;
  slug: string[];
  frontmatter: ChangelogFrontmatter;
};

export const changelogPage: ChangelogPage = {
  url: "/changelog",
  slug: [],
  frontmatter: changelogMeta[0]?.frontmatter ?? {},
};

const contentCache = createSuspenseCache<Awaited<ReturnType<typeof loadChangelogContent>>>();

async function loadChangelogContent() {
  const module = await import("@web-root/content/changelog/index.mdx");
  return { toc: module.toc ?? [], Component: module.default };
}

export function useChangelogContent() {
  return contentCache.read("changelog", loadChangelogContent);
}

export function preloadChangelogContent(): void {
  contentCache.preload("changelog", loadChangelogContent);
}
