import { createFileRoute } from "@tanstack/react-router";

import { StackBuilderPage } from "@/components/stack-builder/stack-builder-page";
import { canonicalUrl } from "@/lib/seo";
import { m } from "@/paraglide/messages.js";

export const Route = createFileRoute("/stack")({
  head: () => {
    const title = m.sharedStackSeoTitle();
    const description = m.sharedStackSeoDescription();

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
        { property: "og:url", content: canonicalUrl("/stack") },
      ],
      links: [{ rel: "canonical", href: canonicalUrl("/stack") }],
    };
  },
  component: StackBuilderPage,
});
