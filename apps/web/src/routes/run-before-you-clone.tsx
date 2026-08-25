import { createFileRoute } from "@tanstack/react-router";

import { RunBeforeClonePage } from "@/components/campaign/run-before-clone-page";
import { CAMPAIGN_PATH } from "@/lib/campaign/campaign";
import { buildPageHead, RUN_BEFORE_CLONE_OG_IMAGE_URL } from "@/lib/seo/seo";
import { m } from "@/paraglide/messages.js";

export const Route = createFileRoute("/run-before-you-clone")({
  head: () =>
    buildPageHead({
      title: m.campaignSeoTitle(),
      description: m.campaignSeoDescription(),
      path: CAMPAIGN_PATH,
      image: RUN_BEFORE_CLONE_OG_IMAGE_URL,
      twitterImage: RUN_BEFORE_CLONE_OG_IMAGE_URL,
      imageAlt: m.campaignOgAlt(),
    }),
  component: RunBeforeClonePage,
});
