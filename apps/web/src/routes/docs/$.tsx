import { createFileRoute, notFound } from "@tanstack/react-router";

import { DocsPageContent } from "@/components/docs/docs-page";
import { docsPageHead } from "@/lib/docs/seo";
import { getNeighbors, getPage, preloadDocPageContent } from "@/lib/docs/source";

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
    preloadDocPageContent(page.slug);
    return {
      slug: page.slug,
      frontmatter: page.frontmatter,
      neighbors: getNeighbors(page.slug),
    };
  },
  head: ({ loaderData }) =>
    loaderData
      ? docsPageHead({
          url: `/docs/${loaderData.slug.join("/")}`,
          frontmatter: loaderData.frontmatter,
        })
      : docsPageHead({ url: "/docs", frontmatter: { title: "Docs" } }),
  component: DocsSplatPage,
});

function DocsSplatPage() {
  const { slug, neighbors } = Route.useLoaderData();
  const page = getPage(slug);
  if (!page) throw notFound();
  return <DocsPageContent page={page} neighbors={neighbors} />;
}
