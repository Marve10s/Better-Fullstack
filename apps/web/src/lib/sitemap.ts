import { getAllBlogPosts } from "@/lib/blog/source";
import { getAllPages } from "@/lib/docs/source";
import { getAllGuidePages } from "@/lib/guides/source";
import { generateSitemapXmlFromEntries, getSitemapEntriesFromPages } from "@/lib/sitemap-core";

export function generateSitemapXml() {
  return generateSitemapXmlFromEntries(
    getSitemapEntriesFromPages({
      docsPages: getAllPages(),
      guidePages: getAllGuidePages(),
      blogPages: getAllBlogPosts().map((post) => ({
        slug: post.slug,
        frontmatter: { updated: post.frontmatter.date },
      })),
    }),
  );
}
