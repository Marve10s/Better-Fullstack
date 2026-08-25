import { createFileRoute } from "@tanstack/react-router";

import { StackBuilderPage } from "@/components/stack-builder/stack-builder-page";
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
    });
  },
  component: StackBuilderPage,
});
