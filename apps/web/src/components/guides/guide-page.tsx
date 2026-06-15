import { MDXProvider } from "@mdx-js/react";
import { Link } from "@tanstack/react-router";
import { Suspense } from "react";

import { TableOfContents } from "@/components/docs/table-of-contents";
import { localizedContentMdxComponents } from "@/components/mdx/localized-content-components";
import { getRelatedGuidePages, type GuidePage, useGuidePageContent } from "@/lib/guides/source";
import { localizeGuidePage, localizeTocEntries } from "@/lib/i18n/content-copy";
import { getLocaleDateTag } from "@/lib/i18n/locales";
import { m } from "@/paraglide/messages.js";
import { getLocale } from "@/paraglide/runtime.js";

function formatGuideDate(date: string): string {
  const parsed = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString(getLocaleDateTag(getLocale()), {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function GuidePageContent({ page }: { page: GuidePage }) {
  // The MDX body chunk loads on demand; render nothing extra while waiting —
  // the surrounding route shell (navbar etc.) stays visible.
  return (
    <Suspense fallback={null}>
      <GuidePageBody page={page} />
    </Suspense>
  );
}

function GuidePageBody({ page }: { page: GuidePage }) {
  const content = useGuidePageContent(page);
  const Content = content.Component;
  const localizedPage = localizeGuidePage(page);
  const isIndex = localizedPage.slug.length === 0;
  const relatedGuides = getRelatedGuidePages(page).map(localizeGuidePage);

  return (
    <main className="docs-shell mx-auto grid w-full max-w-[94rem] grid-cols-1 border-[var(--docs-border-subtle)] border-t xl:grid-cols-[minmax(0,52rem)_16rem] xl:justify-center">
      <article className="mx-auto w-full max-w-[52rem] px-5 py-12 sm:px-8 lg:py-14">
        <header className="mb-10 border-[var(--docs-border-subtle)] border-b pb-8">
          <Link
            to="/guides"
            className="font-mono text-[0.72rem] text-[var(--docs-accent)] uppercase transition-colors hover:text-foreground"
          >
            {m.navGuides()}
          </Link>
          {localizedPage.frontmatter.category && !isIndex ? (
            <span className="ml-2 font-mono text-[0.72rem] text-muted-foreground uppercase">
              / {localizedPage.frontmatter.category}
            </span>
          ) : null}
          {localizedPage.frontmatter.title ? (
            <h1 className="mt-5 font-semibold text-4xl text-foreground leading-[1.08] md:text-5xl">
              {localizedPage.frontmatter.title}
            </h1>
          ) : null}
          {localizedPage.frontmatter.description ? (
            <p className="mt-4 text-base text-muted-foreground leading-7 md:text-lg">
              {localizedPage.frontmatter.description}
            </p>
          ) : null}
          {localizedPage.frontmatter.updated && !isIndex ? (
            <p className="mt-4 font-mono text-[0.72rem] text-muted-foreground uppercase">
              {m.guidesUpdated({ date: formatGuideDate(localizedPage.frontmatter.updated) })}
            </p>
          ) : null}
          {localizedPage.frontmatter.tags?.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {localizedPage.frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-[var(--docs-border-subtle)] bg-[var(--docs-surface)]/70 px-2 py-1 font-mono text-[0.68rem] text-muted-foreground uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </header>

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
      <aside className="hidden border-[var(--docs-border-subtle)] border-l bg-[var(--docs-surface)]/35 xl:block">
        <TableOfContents toc={localizeTocEntries(content.toc)} />
      </aside>
    </main>
  );
}
