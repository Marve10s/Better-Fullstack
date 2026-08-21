import { MDXProvider } from "@mdx-js/react";
import { Link } from "@tanstack/react-router";
import { TbArrowLeft as ArrowLeft, TbArrowRight as ArrowRight } from "react-icons/tb";
import { Suspense } from "react";

import type { TocEntry } from "@/lib/docs/remark-extract-toc";
import type { DocPage, PageNode } from "@/lib/docs/source";

import { DocsLayout } from "@/components/docs/docs-layout";
import { DocsPageActions } from "@/components/docs/docs-page-actions";
import { mdxComponents } from "@/components/docs/mdx";
import { canRenderDocPageContent, localizeDocPage, useDocPageContent } from "@/lib/docs/source";
import { cn } from "@/lib/utils";
import { m } from "@/paraglide/messages.js";

/**
 * Shared docs page renderer used by both the splat route (`/docs/$`) and
 * the exact `/docs/` index route. Routes are responsible for resolving the
 * `DocPage` and `neighbors` via their loaders; the MDX body is loaded on
 * demand (suspending) so docs content stays out of the app entry chunk.
 */
export type DocsPageContentProps = {
  page: DocPage;
  neighbors: { previous: PageNode | null; next: PageNode | null };
};

export function DocsPageContent(props: DocsPageContentProps) {
  const localizedPage = localizeDocPage(props.page);
  const localizedNeighbors = {
    previous: props.neighbors.previous,
    next: props.neighbors.next,
  };
  if (!canRenderDocPageContent()) return <DocsPageShell page={localizedPage} />;
  return (
    <Suspense fallback={<DocsPageShell page={localizedPage} />}>
      <DocsPageBody page={localizedPage} neighbors={localizedNeighbors} />
    </Suspense>
  );
}

const EMPTY_TOC: TocEntry[] = [];

function isLandingPage(page: DocPage) {
  return page.frontmatter.layout === "landing";
}

function articleClassName(landing: boolean) {
  return cn(
    "mx-auto w-full px-5 py-12 sm:px-8",
    landing ? "max-w-[78rem] lg:py-16" : "max-w-[52rem] lg:py-14",
  );
}

/** Header-only shell shown while the page's MDX chunk loads. */
function DocsPageShell({ page }: { page: DocPage }) {
  const landing = isLandingPage(page);
  return (
    <DocsLayout toc={EMPTY_TOC} variant={landing ? "landing" : "default"}>
      <article className={articleClassName(landing)}>
        {landing ? null : <DocsPageHeader page={page} />}
      </article>
    </DocsLayout>
  );
}

function DocsPageHeader({ page, markdown }: { page: DocPage; markdown?: string }) {
  const sectionLabel = formatSectionLabel(page.slug[0]);
  return (
    <header className="mb-10">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-1.5 text-[0.8125rem] text-muted-foreground">
          <span>{m.navDocs()}</span>
          <span aria-hidden>›</span>
          <span className="text-foreground">{sectionLabel}</span>
        </p>
        {markdown !== undefined ? <DocsPageActions path={page.path} markdown={markdown} /> : null}
      </div>
      <div className="max-w-3xl">
        {page.frontmatter.title ? (
          <h1 className="font-semibold text-[2.5rem] text-foreground leading-[1.05] tracking-[-0.03em] md:text-5xl">
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
  );
}

function DocsPageBody({ page, neighbors }: DocsPageContentProps) {
  const content = useDocPageContent(page);
  const Content = content.Component;
  const landing = isLandingPage(page);

  return (
    <DocsLayout toc={landing ? EMPTY_TOC : content.toc} variant={landing ? "landing" : "default"}>
      <article className={articleClassName(landing)}>
        {landing ? null : <DocsPageHeader page={page} markdown={content.raw} />}

        <div className={cn("docs-prose", landing && "docs-landing")}>
          <MDXProvider components={mdxComponents}>
            <Content components={mdxComponents} />
          </MDXProvider>
        </div>

        {!landing && (neighbors.previous || neighbors.next) && (
          <nav
            aria-label={m.docsPageNavigation()}
            className="mt-14 grid grid-cols-1 gap-3 border-[var(--docs-border-subtle)] border-t pt-8 sm:grid-cols-2"
          >
            {neighbors.previous ? (
              <Link
                to={neighbors.previous.url}
                className="flex flex-col gap-1 rounded-lg border border-[var(--docs-border-subtle)] p-4 transition-colors hover:border-[var(--docs-border-strong)] hover:bg-[var(--docs-surface-elevated)]"
              >
                <span className="flex items-center gap-1.5 text-[0.8125rem] text-muted-foreground">
                  <ArrowLeft className="size-3.5" />
                  {m.docsPrevious()}
                </span>
                <span className="font-medium text-sm text-foreground">
                  {neighbors.previous.name}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {neighbors.next ? (
              <Link
                to={neighbors.next.url}
                className="flex flex-col items-end gap-1 rounded-lg border border-[var(--docs-border-subtle)] p-4 transition-colors hover:border-[var(--docs-border-strong)] hover:bg-[var(--docs-surface-elevated)] sm:text-right"
              >
                <span className="flex items-center gap-1.5 text-[0.8125rem] text-muted-foreground">
                  {m.docsNext()}
                  <ArrowRight className="size-3.5" />
                </span>
                <span className="font-medium text-sm text-foreground">{neighbors.next.name}</span>
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
  switch (segment) {
    case undefined:
      return m.docsSectionOverview();
    case "ai":
      return m.docsSectionAi();
    case "cli":
      return m.docsSectionCli();
    case "ecosystems":
      return m.docsSectionEcosystems();
    case "getting-started":
      return m.docsSectionGettingStarted();
    case "reference":
      return m.docsSectionReference();
    default:
      return segment
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
  }
}
