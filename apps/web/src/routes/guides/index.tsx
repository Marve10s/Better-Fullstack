import { createFileRoute, notFound } from "@tanstack/react-router";

import { GuidePageContent } from "@/components/guides/guide-page";
import { guidePageHead } from "@/lib/guides/seo";
import { getGuidePage, preloadGuidePageContent } from "@/lib/guides/source";
import { localizeGuideFrontmatter } from "@/lib/i18n/content-copy";
import { m } from "@/paraglide/messages.js";

export const Route = createFileRoute("/guides/")({
  loader: () => {
    const page = getGuidePage([]);
    if (!page) throw notFound();
    preloadGuidePageContent(page.slug);
    return {
      frontmatter: page.frontmatter,
      localizedFrontmatter: page.localizedFrontmatter,
    };
  },
  head: ({ loaderData }) =>
    guidePageHead({
      url: "/guides",
      frontmatter: loaderData
        ? localizeGuideFrontmatter([], loaderData.frontmatter, loaderData.localizedFrontmatter)
        : { title: m.navGuides() },
    }),
  component: GuidesIndexPage,
});

function GuidesIndexPage() {
  const page = getGuidePage([]);
  if (!page) throw notFound();
  return <GuidePageContent page={page} />;
}
