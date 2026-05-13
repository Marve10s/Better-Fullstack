import { MDXProvider } from "@mdx-js/react";
import { Link } from "@tanstack/react-router";

import { mdxComponents } from "@/components/docs/mdx";
import { TableOfContents } from "@/components/docs/table-of-contents";
import { getRelatedGuidePages, type GuidePage } from "@/lib/guides/source";

export function GuidePageContent({ page }: { page: GuidePage }) {
  const Content = page.Component;
  const isIndex = page.slug.length === 0;
  const relatedGuides = getRelatedGuidePages(page);

  return (
    <main className="mx-auto grid w-full max-w-[88rem] grid-cols-1 lg:grid-cols-[minmax(0,1fr)_14rem]">
      <article className="mx-auto w-full max-w-3xl px-6 py-10">
        <header className="mb-8 border-b border-border pb-6">
          <Link
            to="/guides"
            className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
          >
            Guides
          </Link>
          {page.frontmatter.category && !isIndex ? (
            <span className="ml-2 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-muted-foreground">
              / {page.frontmatter.category}
            </span>
          ) : null}
          {page.frontmatter.title ? (
            <h1 className="mt-4 font-semibold text-3xl tracking-tight text-foreground">
              {page.frontmatter.title}
            </h1>
          ) : null}
          {page.frontmatter.description ? (
            <p className="mt-3 text-muted-foreground">{page.frontmatter.description}</p>
          ) : null}
          {page.frontmatter.updated && !isIndex ? (
            <p className="mt-3 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-muted-foreground">
              Updated {page.frontmatter.updated}
            </p>
          ) : null}
          {page.frontmatter.tags?.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {page.frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-sm border border-border px-2 py-1 font-mono text-[0.68rem] uppercase tracking-[0.08em] text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </header>

        <div className="docs-prose">
          <MDXProvider components={mdxComponents}>
            <Content components={mdxComponents} />
          </MDXProvider>
        </div>

        {relatedGuides.length ? (
          <nav className="mt-12 border-t border-border pt-8" aria-labelledby="related-guides">
            <h2 id="related-guides" className="font-semibold text-xl tracking-tight">
              Related guides
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {relatedGuides.map((guide) => (
                <Link
                  key={guide.url}
                  to="/guides/$"
                  params={{ _splat: guide.slug.join("/") }}
                  className="rounded-md border border-border p-4 transition-colors hover:border-muted-foreground/40 hover:bg-muted/30"
                >
                  <span className="block font-medium text-sm text-foreground">
                    {guide.frontmatter.title ?? guide.url}
                  </span>
                  {guide.frontmatter.description ? (
                    <span className="mt-1 line-clamp-2 block text-muted-foreground text-xs">
                      {guide.frontmatter.description}
                    </span>
                  ) : null}
                </Link>
              ))}
            </div>
          </nav>
        ) : null}
      </article>
      <aside className="hidden lg:block">
        <TableOfContents toc={page.toc} />
      </aside>
    </main>
  );
}
