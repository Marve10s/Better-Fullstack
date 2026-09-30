import { createFileRoute } from "@tanstack/solid-router";

import ShowcasePage from "@/components/showcase/showcase-page";

export const Route = createFileRoute("/showcase")({
  component: ShowcasePage,
});
