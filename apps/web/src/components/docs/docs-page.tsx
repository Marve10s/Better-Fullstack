import { MDXProvider } from "@mdx-js/react";
import { Link } from "@tanstack/react-router";

import { DocsLayout } from "@/components/docs/docs-layout";
import { mdxComponents } from "@/components/docs/mdx";
import type { DocPage, PageNode } from "@/lib/docs/source";

/**
 * Shared docs page renderer used by both the splat route (`/docs/$`) and
 * the exact `/docs/` index route. Routes are responsible for resolving the
 * `DocPage` and `neighbors` via their loaders; this component just renders
 * them inside the standard chrome.
 */
export type DocsPageContentProps = {
  page: DocPage;
  neighbors: { previous: PageNode | null; next: PageNode | null };
};

export function DocsPageContent({ page, neighbors }: DocsPageContentProps) {
  const Content = page.Component;

  return (
    <DocsLayout toc={page.toc}>
      <article className="mx-auto w-full max-w-3xl px-6 py-10">
        <header className="mb-8 border-b border-border pb-6">
          {page.frontmatter.title ? (
            <h1 className="font-semibold text-3xl tracking-tight text-foreground">
              {page.frontmatter.title}
            </h1>
          ) : null}
          {page.frontmatter.description ? (
            <p className="mt-2 text-muted-foreground">{page.frontmatter.description}</p>
          ) : null}
        </header>

        <div className="docs-prose">
          <MDXProvider components={mdxComponents}>
            <Content components={mdxComponents} />
          </MDXProvider>
        </div>

        {(neighbors.previous || neighbors.next) && (
          <nav
            aria-label="Page navigation"
            className="mt-12 grid grid-cols-1 gap-3 border-t border-border pt-6 sm:grid-cols-2"
          >
            {neighbors.previous ? (
              <Link
                to={neighbors.previous.url}
                className="group flex flex-col gap-1 rounded-md border border-border p-4 transition-colors hover:border-foreground/40"
              >
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.08em] text-muted-foreground">
                  ← Previous
                </span>
                <span className="text-sm font-medium text-foreground">
                  {neighbors.previous.name}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {neighbors.next ? (
              <Link
                to={neighbors.next.url}
                className="group flex flex-col items-end gap-1 rounded-md border border-border p-4 transition-colors hover:border-foreground/40 sm:text-right"
              >
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.08em] text-muted-foreground">
                  Next →
                </span>
                <span className="text-sm font-medium text-foreground">
                  {neighbors.next.name}
                </span>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        )}
      </article>
    </DocsLayout>
  );
}
