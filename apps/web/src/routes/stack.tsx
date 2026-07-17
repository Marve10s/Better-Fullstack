import { createFileRoute } from "@tanstack/react-router";

import { StackBuilderPage } from "@/components/stack-builder/stack-builder-page";
import { buildPageHead } from "@/lib/seo";
import { m } from "@/paraglide/messages.js";

export const Route = createFileRoute("/stack")({
  head: () => {
    const title = m.sharedStackSeoTitle();
    const description = m.sharedStackSeoDescription();

    return buildPageHead({ title, description, path: "/stack" });
  },
  component: StackBuilderPage,
});
