import { buildSearchSections, type SearchSection } from "./search";

const CONTENT_PREFIX = "/content/docs/";

/**
 * Eagerly import every MDX file as raw text. `?raw` returns the source
 * verbatim, which we then strip of frontmatter + markdown chrome inside
 * `buildSearchSections`. The eager glob inlines ~30 small text strings into
 * the bundle (~50KB total, gzipped much less), so the search index ships
 * with the page bundle. No runtime fetch required.
 */
const rawMdx = import.meta.glob<string>("../../content/docs/**/*.mdx", {
  eager: true,
  query: "?raw",
  import: "default",
});

function slugFromPath(filePath: string): string[] {
  const idx = filePath.indexOf(CONTENT_PREFIX);
  const relative = filePath.slice(idx + CONTENT_PREFIX.length).replace(/\.mdx$/, "");
  const segments = relative.split("/");
  return segments[segments.length - 1] === "index" ? segments.slice(0, -1) : segments;
}

const pages = Object.entries(rawMdx).map(([filePath, rawSource]) => {
  const slug = slugFromPath(filePath);
  const url = "/docs" + (slug.length ? "/" + slug.join("/") : "");
  return { url, rawSource };
});

export const searchSections: SearchSection[] = buildSearchSections(pages);
