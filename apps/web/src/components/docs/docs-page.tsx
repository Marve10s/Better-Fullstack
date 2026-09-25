import { MDXProvider } from "@mdx-js/react";
import { Link } from "@tanstack/react-router";
import { Suspense } from "react";
import { TbArrowLeft as ArrowLeft, TbArrowRight as ArrowRight } from "react-icons/tb";

import type { DocPage, PageNode } from "@/lib/docs/source";

import { articleClassName, DocsLayout, DocsToc } from "@/components/docs/docs-layout";
import { DocsPageActions } from "@/components/docs/docs-page-actions";
import { mdxComponents } from "@/components/docs/mdx";
import { canRenderDocPageContent, localizeDocPage, useDocPageContent } from "@/lib/docs/source";
import { cn } from "@/lib/platform/utils";
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
  const page = localizeDocPage(props.page);
  const landing = isLandingPage(page);
  const canRender = canRenderDocPageContent();
  const header = landing ? null : <DocsPageHeader page={page} />;
  // The layout stays mounted while the MDX chunk loads so the content card,
  // which is the desktop scroll container, is never swapped for a fallback copy.
  return (
    <DocsLayout
      variant={landing ? "landing" : "default"}
      toc={
        canRender && !landing ? (
          <Suspense fallback={null}>
            <DocsPageToc page={page} />
          </Suspense>
        ) : null
      }
    >
      <article className={articleClassName(landing)}>
        {canRender ? (
          <Suspense fallback={header}>
            <DocsPageBody page={page} neighbors={props.neighbors} />
          </Suspense>
        ) : (
          header
        )}
      </article>
    </DocsLayout>
  );
}

function isLandingPage(page: DocPage) {
  return page.frontmatter.layout === "landing";
}

function DocsPageToc({ page }: { page: DocPage }) {
  return <DocsToc entries={useDocPageContent(page).toc} />;
}

function DocsPageHeader({ page, markdown }: { page: DocPage; markdown?: string }) {
  const sectionLabel = formatSectionLabel(page.slug[0]);
  return (
    <header className="mb-10">
      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-medium text-[0.8125rem] text-muted-foreground">{sectionLabel}</p>
        {markdown !== undefined ? <DocsPageActions path={page.path} markdown={markdown} /> : null}
      </div>
      <div className="max-w-3xl">
        {page.frontmatter.title ? (
          <h1 className="font-medium text-[2.25rem] text-foreground leading-[1.08] tracking-[-0.035em] md:text-[2.75rem]">
            {page.frontmatter.title}
          </h1>
        ) : null}
        {page.frontmatter.description ? (
          <p className="mt-4 text-base text-muted-foreground leading-7 md:text-[1.0625rem]">
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
    <>
      {landing ? null : <DocsPageHeader page={page} markdown={content.raw} />}

        <div className={cn("docs-prose", landing && "docs-landing")}>
          <MDXProvider components={mdxComponents}>
            <Content components={mdxComponents} />
          </MDXProvider>
        </div>

        {!landing && (neighbors.previous || neighbors.next) && (
          <nav
            aria-label={m.docsPageNavigation()}
            className="mt-14 grid grid-cols-1 gap-3 border-[var(--docs-panel-border)] border-t pt-8 sm:grid-cols-2"
          >
            {neighbors.previous ? (
              <Link
                to={neighbors.previous.url}
                className="flex flex-col gap-1 rounded-xl border border-[var(--docs-panel-border)] p-4 transition-colors hover:border-[var(--docs-border-strong)] hover:bg-[var(--docs-panel)]"
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
                className="flex flex-col items-end gap-1 rounded-xl border border-[var(--docs-panel-border)] p-4 transition-colors hover:border-[var(--docs-border-strong)] hover:bg-[var(--docs-panel)] sm:text-right"
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
    </>
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
