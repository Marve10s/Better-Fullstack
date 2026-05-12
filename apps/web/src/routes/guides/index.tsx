import { createFileRoute, notFound } from "@tanstack/react-router";

import { GuidePageContent } from "@/components/guides/guide-page";
import { guidePageHead } from "@/lib/guides/seo";
import { getGuidePage } from "@/lib/guides/source";

export const Route = createFileRoute("/guides/")({
  loader: () => {
    const page = getGuidePage([]);
    if (!page) throw notFound();
    return {
      frontmatter: page.frontmatter,
    };
  },
  head: ({ loaderData }) =>
    guidePageHead({
      url: "/guides",
      frontmatter: loaderData?.frontmatter ?? { title: "Guides" },
    }),
  component: GuidesIndexPage,
});

function GuidesIndexPage() {
  const page = getGuidePage([]);
  if (!page) throw notFound();
  return <GuidePageContent page={page} />;
}
