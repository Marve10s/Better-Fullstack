import { MDXProvider } from "@mdx-js/react";
import { Link } from "@tanstack/react-router";

import type { DocPage, PageNode } from "@/lib/docs/source";

import { DocsLayout } from "@/components/docs/docs-layout";
import { DocsPageActions } from "@/components/docs/docs-page-actions";
import { mdxComponents } from "@/components/docs/mdx";

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
  const sectionLabel = formatSectionLabel(page.slug[0]);

  return (
    <DocsLayout toc={page.toc}>
      <article className="mx-auto w-full max-w-[52rem] px-5 py-12 sm:px-8 lg:py-14">
        <header className="mb-10 border-[var(--docs-border-subtle)] border-b pb-8">
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-[0.72rem] text-[var(--docs-accent)] uppercase">
              Docs / {sectionLabel}
            </p>
            <DocsPageActions path={page.path} markdown={page.raw} />
          </div>
          <div className="max-w-3xl">
            {page.frontmatter.title ? (
              <h1 className="font-semibold text-4xl text-foreground leading-[1.08] md:text-5xl">
                {page.frontmatter.title}
              </h1>
            ) : null}
            {page.frontmatter.description ? (
              <p className="mt-4 text-base text-muted-foreground leading-7 md:text-lg">
                {page.frontmatter.description}
              </p>
            ) : null}
          </div>
        </header>

        <div className="docs-prose">
          <MDXProvider components={mdxComponents}>
            <Content components={mdxComponents} />
          </MDXProvider>
        </div>

        {(neighbors.previous || neighbors.next) && (
          <nav
            aria-label="Page navigation"
            className="mt-14 grid grid-cols-1 gap-3 border-[var(--docs-border-subtle)] border-t pt-8 sm:grid-cols-2"
          >
            {neighbors.previous ? (
              <Link
                to={neighbors.previous.url}
                className="group flex flex-col gap-1 rounded-lg border border-[var(--docs-border-subtle)] bg-[var(--docs-surface)]/70 p-4 transition-colors hover:border-[var(--docs-accent)] hover:bg-[var(--docs-surface-elevated)]"
              >
                <span className="font-mono text-[0.7rem] text-muted-foreground uppercase">
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
                className="group flex flex-col items-end gap-1 rounded-lg border border-[var(--docs-border-subtle)] bg-[var(--docs-surface)]/70 p-4 transition-colors hover:border-[var(--docs-accent)] hover:bg-[var(--docs-surface-elevated)] sm:text-right"
              >
                <span className="font-mono text-[0.7rem] text-muted-foreground uppercase">
                  Next →
                </span>
                <span className="text-sm font-medium text-foreground">{neighbors.next.name}</span>
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

function formatSectionLabel(segment: string | undefined) {
  if (!segment) return "Overview";
  return segment
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
