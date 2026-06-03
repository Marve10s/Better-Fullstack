import { createFileRoute, notFound } from "@tanstack/react-router";

import { StackBuilderPage } from "@/components/stack-builder/stack-builder-page";
import { canonicalUrl, SITE_NAME } from "@/lib/seo";
import { parseStackShareSlug } from "@/lib/stack-share-paths";

export const Route = createFileRoute("/$stackShare")({
  loader: ({ params }) => {
    const stack = parseStackShareSlug(params.stackShare);
    if (!stack) throw notFound();
    return { stack };
  },
  head: ({ params }) => ({
    meta: [
      { title: `${params.stackShare} Stack | ${SITE_NAME}` },
      {
        name: "description",
        content: "Open a short Better Fullstack builder configuration link.",
      },
      { property: "og:title", content: `${params.stackShare} Stack | ${SITE_NAME}` },
      {
        property: "og:description",
        content: "Open a short Better Fullstack builder configuration link.",
      },
      { property: "og:url", content: canonicalUrl(`/${params.stackShare}`) },
    ],
    links: [{ rel: "canonical", href: canonicalUrl(`/${params.stackShare}`) }],
  }),
  component: StackSharePage,
});

function StackSharePage() {
  const { stack } = Route.useLoaderData();
  return <StackBuilderPage initialStack={stack} />;
}
