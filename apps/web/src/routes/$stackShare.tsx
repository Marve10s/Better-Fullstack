import { createFileRoute, notFound } from "@tanstack/react-router";

import { StackBuilderPage } from "@/components/stack-builder/stack-builder-page";
import { canonicalUrl, SITE_NAME } from "@/lib/seo";
import { parseStackShareSlug } from "@/lib/stack-share-paths";
import { m } from "@/paraglide/messages.js";

export const Route = createFileRoute("/$stackShare")({
  loader: ({ params }) => {
    const stack = parseStackShareSlug(params.stackShare);
    if (!stack) throw notFound();
    return { stack };
  },
  head: ({ params }) => {
    const title = `${params.stackShare} Stack | ${SITE_NAME}`;
    const description = m.shortStackSeoDescription();

    return {
      meta: [
        { title },
        {
          name: "description",
          content: description,
        },
        { property: "og:title", content: title },
        {
          property: "og:description",
          content: description,
        },
        { property: "og:url", content: canonicalUrl(`/${params.stackShare}`) },
      ],
      links: [{ rel: "canonical", href: canonicalUrl(`/${params.stackShare}`) }],
    };
  },
  component: StackSharePage,
});

function StackSharePage() {
  const { stack } = Route.useLoaderData();
  return <StackBuilderPage initialStack={stack} />;
}
