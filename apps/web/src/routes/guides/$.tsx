import { createFileRoute, notFound } from "@tanstack/react-router";

import { GuidePageContent } from "@/components/guides/guide-page";
import { guidePageHead } from "@/lib/guides/seo";
import { getGuidePage, preloadGuidePageContent } from "@/lib/guides/source";

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
          frontmatter: loaderData.frontmatter,
        })
      : guidePageHead({ url: "/guides", frontmatter: { title: "Guides" } }),
  component: GuidesSplatPage,
});

function GuidesSplatPage() {
  const { slug } = Route.useLoaderData();
  const page = getGuidePage(slug);
  if (!page) throw notFound();
  return <GuidePageContent page={page} />;
}
