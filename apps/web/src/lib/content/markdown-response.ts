import { canonicalUrl } from "@/lib/seo/seo";

/**
 * Serve a page's Markdown source. The Link header points crawlers at the HTML
 * page so the source copy is not indexed as a duplicate of it.
 */
export function markdownResponse(source: string | undefined, htmlPath: string): Response {
  if (!source) return new Response("Not found", { status: 404 });
  return new Response(source, {
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=300, stale-while-revalidate=3600",
      link: `<${canonicalUrl(htmlPath)}>; rel="canonical"`,
    },
  });
}
