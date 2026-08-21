import { MDXProvider } from "@mdx-js/react";
import { Link } from "@tanstack/react-router";
import { Suspense } from "react";

import { TableOfContents } from "@/components/docs/table-of-contents";
import { localizedContentMdxComponents } from "@/components/mdx/localized-content-components";
import { formatContentDate } from "@/lib/content-date";
import {
  canRenderGuidePageContent,
  getRelatedGuidePages,
  type GuidePage,
  useGuidePageContent,
} from "@/lib/guides/source";
import { localizeGuidePage, localizeTocEntries } from "@/lib/i18n/content-copy";
import { m } from "@/paraglide/messages.js";

export function GuidePageContent({ page }: { page: GuidePage }) {
  // The MDX body chunk loads on demand; render nothing extra while waiting —
  // the surrounding route shell (navbar etc.) stays visible.
  if (!canRenderGuidePageContent()) return <GuidePageShell page={localizeGuidePage(page)} />;
  return (
    <Suspense fallback={null}>
      <GuidePageBody page={page} />
    </Suspense>
  );
}

function GuidePageShell({ page }: { page: GuidePage }) {
  return (
    <main className="docs-shell mx-auto grid w-full max-w-[94rem] grid-cols-1 border-[var(--docs-border-subtle)] border-t xl:grid-cols-[minmax(0,52rem)_17rem] xl:justify-center">
      <article className="mx-auto w-full max-w-[52rem] px-5 py-12 sm:px-8 lg:py-14">
        <GuidePageHeader page={page} isIndex={page.slug.length === 0} />
      </article>
    </main>
  );
}

function GuidePageBody({ page }: { page: GuidePage }) {
  const content = useGuidePageContent(page);
  const Content = content.Component;
  const localizedPage = localizeGuidePage(page);
  const isIndex = localizedPage.slug.length === 0;
  const relatedGuides = getRelatedGuidePages(page).map(localizeGuidePage);

  return (
    <main className="docs-shell mx-auto grid w-full max-w-[94rem] grid-cols-1 border-[var(--docs-border-subtle)] border-t xl:grid-cols-[minmax(0,52rem)_17rem] xl:justify-center">
      <article className="mx-auto w-full max-w-[52rem] px-5 py-12 sm:px-8 lg:py-14">
        <GuidePageHeader page={localizedPage} isIndex={isIndex} />

        <div className="docs-prose">
          <MDXProvider components={localizedContentMdxComponents}>
            <Content components={localizedContentMdxComponents} />
          </MDXProvider>
        </div>

        {relatedGuides.length ? (
          <nav
            className="mt-14 border-[var(--docs-border-subtle)] border-t pt-8"
            aria-labelledby="related-guides"
          >
            <h2 id="related-guides" className="font-semibold text-xl">
              {m.guidesRelated()}
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {relatedGuides.map((guide) => (
                <Link
                  key={guide.url}
                  to="/guides/$"
                  params={{ _splat: guide.slug.join("/") }}
                  className="rounded-lg border border-[var(--docs-border-subtle)] bg-[var(--docs-surface)]/70 p-4 transition-colors hover:border-[var(--docs-accent)] hover:bg-[var(--docs-surface-elevated)]"
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
      <aside className="hidden xl:block">
        <TableOfContents toc={localizeTocEntries(content.toc)} />
      </aside>
    </main>
  );
}

function GuidePageHeader({ page, isIndex }: { page: GuidePage; isIndex: boolean }) {
  return (
    <header className="mb-10">
      <p className="flex items-center gap-1.5 text-[0.8125rem] text-muted-foreground">
        <Link to="/guides" className="transition-colors hover:text-foreground">
          {m.navGuides()}
        </Link>
        {page.frontmatter.category && !isIndex ? (
          <>
            <span aria-hidden>›</span>
            <span className="text-foreground">{page.frontmatter.category}</span>
          </>
        ) : null}
      </p>
      {page.frontmatter.title ? (
        <h1 className="mt-5 font-semibold text-[2.5rem] text-foreground leading-[1.05] tracking-[-0.03em] md:text-5xl">
          {page.frontmatter.title}
        </h1>
      ) : null}
      {page.frontmatter.description ? (
        <p className="mt-4 text-base text-muted-foreground leading-7 md:text-lg">
          {page.frontmatter.description}
        </p>
      ) : null}
      {page.frontmatter.updated && !isIndex ? (
        <p className="mt-4 text-[0.8125rem] text-muted-foreground">
          {m.guidesUpdated({ date: formatContentDate(page.frontmatter.updated) })}
        </p>
      ) : null}
      {page.frontmatter.tags?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {page.frontmatter.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-[var(--docs-border-subtle)] bg-[var(--docs-surface)]/70 px-2 py-0.5 text-[0.75rem] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
    </header>
  );
}
