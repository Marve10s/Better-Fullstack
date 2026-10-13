import { docsMeta } from "virtual:content-meta";
import { rawDocsPages } from "virtual:docs-raw";
import { localizedDocsRawMdxLoaders } from "virtual:localized-content";

import { getLocale } from "@/paraglide/runtime.js";

export async function docsMarkdownResponse(slug: string): Promise<Response> {
  const page = docsMeta.find(({ filePath }) => {
    const pageSlug = filePath
      .replace(/^\/content\/docs\//, "")
      .replace(/\.mdx$/, "")
      .replace(/(^|\/)index$/, "");
    return pageSlug === slug;
  });
  if (!page) return new Response("Not found", { status: 404 });

  const locale = getLocale();
  const localizedLoader =
    page.frontmatter.translationStatus !== "pending" && locale !== "en"
      ? localizedDocsRawMdxLoaders[`${locale}:${page.filePath}`]
      : undefined;
  const source = localizedLoader ? await localizedLoader() : rawDocsPages[slug];
  if (!source) return new Response("Not found", { status: 404 });

  return new Response(source, {
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      "content-language": localizedLoader ? locale : "en",
      "cache-control": "private, no-store",
      vary: "Cookie, Accept-Language",
    },
  });
}
