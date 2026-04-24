import { createFileRoute, notFound } from "@tanstack/react-router";

import { DocsPageContent } from "@/components/docs/docs-page";
import { getNeighbors, getPage } from "@/lib/docs/source";

/**
 * Catch-all for nested docs paths (`/docs/cli/create`, `/docs/ecosystems/go`,
 * etc.). The exact `/docs` URL is handled by `routes/docs/index.tsx` because
 * TanStack Router splats don't match the empty case (unlike Next.js
 * `[[...slug]]`). Both routes render the same component below.
 */
export const Route = createFileRoute("/docs/$")({
  loader: ({ params }) => {
    const splat = params._splat ?? "";
    const slug = splat.split("/").filter(Boolean);
    const page = getPage(slug);
    if (!page) throw notFound();
    return { page, neighbors: getNeighbors(page.slug) };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.page.frontmatter.title ?? "Docs" },
      ...(loaderData?.page.frontmatter.description
        ? [{ name: "description", content: loaderData.page.frontmatter.description }]
        : []),
    ],
  }),
  component: DocsSplatPage,
});

function DocsSplatPage() {
  const { page, neighbors } = Route.useLoaderData();
  return <DocsPageContent page={page} neighbors={neighbors} />;
}
