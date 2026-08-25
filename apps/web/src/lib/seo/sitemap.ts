import { getAllBlogPosts } from "@/lib/blog/source";
import { getAllPages } from "@/lib/docs/source";
import { getAllGuidePages } from "@/lib/guides/source";
import { generateSitemapXmlFromEntries, getSitemapEntriesFromPages } from "@/lib/seo/sitemap-core";
import { getPublishedStackPageSummaries } from "@/lib/stack-pages/source";

export function generateSitemapXml() {
  return generateSitemapXmlFromEntries(
    getSitemapEntriesFromPages({
      docsPages: getAllPages(),
      guidePages: getAllGuidePages(),
      blogPages: getAllBlogPosts().map((post) => ({
        slug: post.slug,
        frontmatter: { updated: post.frontmatter.date },
      })),
      stackPages: getPublishedStackPageSummaries(),
    }),
  );
}
