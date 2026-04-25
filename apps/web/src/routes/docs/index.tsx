import { createFileRoute, notFound } from "@tanstack/react-router";

import { DocsPageContent } from "@/components/docs/docs-page";
import { getNeighbors, getPage } from "@/lib/docs/source";

/**
 * Exact match for `/docs` — renders the docs index page (`content/docs/index.mdx`).
 *
 * TanStack Router's splat route (`docs/$`) only matches non-empty splats, so
 * this index file is required to handle the bare `/docs` URL. Both routes
 * delegate to `<DocsPageContent>` so the rendered chrome is identical.
 */
export const Route = createFileRoute("/docs/")({
  loader: () => {
    const page = getPage([]);
    if (!page) throw notFound();
    return {
      slug: page.slug,
      frontmatter: page.frontmatter,
      neighbors: getNeighbors([]),
    };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.frontmatter.title ?? "Docs" },
      ...(loaderData?.frontmatter.description
        ? [{ name: "description", content: loaderData.frontmatter.description }]
        : []),
    ],
  }),
  component: DocsIndexPage,
});

function DocsIndexPage() {
  const { slug, neighbors } = Route.useLoaderData();
  const page = getPage(slug);
  if (!page) throw notFound();
  return <DocsPageContent page={page} neighbors={neighbors} />;
}
