import { createFileRoute, notFound } from "@tanstack/react-router";

import { GuidePageContent } from "@/components/guides/guide-page";
import { guidePageHead } from "@/lib/guides/seo";
import { getGuidePage, preloadGuidePageContent } from "@/lib/guides/source";
import { localizeGuideFrontmatter } from "@/lib/i18n/content-copy";
import { m } from "@/paraglide/messages.js";

export const Route = createFileRoute("/guides/$")({
  loader: ({ params }) => {
    const slug = (params._splat ?? "").split("/").filter(Boolean);
    const page = getGuidePage(slug);
    if (!page) throw notFound();
    preloadGuidePageContent(page.slug);
    return {
      slug: page.slug,
      frontmatter: page.frontmatter,
    };
  },
  head: ({ loaderData }) =>
    loaderData
      ? guidePageHead({
          url: `/guides/${loaderData.slug.join("/")}`,
          frontmatter: localizeGuideFrontmatter(loaderData.slug, loaderData.frontmatter),
        })
      : guidePageHead({ url: "/guides", frontmatter: { title: m.navGuides() } }),
  component: GuidesSplatPage,
});

function GuidesSplatPage() {
  const { slug } = Route.useLoaderData();
  const page = getGuidePage(slug);
  if (!page) throw notFound();
  return <GuidePageContent page={page} />;
}
