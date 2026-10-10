import { createFileRoute } from "@tanstack/react-router";

import { StackBuilderPage } from "@/components/stack-builder/stack-builder-page";
import { NOINDEX_ROBOTS } from "@/lib/seo/robots";
import { buildPageHead, EDIT_AND_RUN_OG_IMAGE_URL } from "@/lib/seo/seo";
import { m } from "@/paraglide/messages.js";

export const Route = createFileRoute("/stack")({
  head: () => {
    const title = m.sharedStackSeoTitle();
    const description = m.sharedStackSeoDescription();

    return buildPageHead({
      title,
      description,
      path: "/stack",
      image: EDIT_AND_RUN_OG_IMAGE_URL,
      twitterImage: EDIT_AND_RUN_OG_IMAGE_URL,
      // Shared links render the /new builder, so only /new is indexable.
      robots: NOINDEX_ROBOTS,
    });
  },
  component: StackBuilderPage,
});
