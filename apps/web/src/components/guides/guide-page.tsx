import { MDXProvider } from "@mdx-js/react";
import { Link } from "@tanstack/react-router";
import { type ReactNode, Suspense } from "react";

import { articleClassName, DocsLayout, DocsToc } from "@/components/docs/docs-layout";
import { DocsCard, DocsCardGrid, DocsLinkItem, DocsLinkList } from "@/components/docs/mdx/docs-landing";
import { getGuideCategories, guideIcon, GuidesSidebar } from "@/components/guides/guides-nav";
import { localizedContentMdxComponents } from "@/components/mdx/localized-content-components";
import { formatContentDate } from "@/lib/content/content-date";
import {
  canRenderGuidePageContent,
  getRelatedGuidePages,
  type GuidePage,
  useGuidePageContent,
} from "@/lib/guides/source";
import { localizeGuidePage, localizeTocEntries } from "@/lib/i18n/content-copy";
import { m } from "@/paraglide/messages.js";

const GUIDES_SIDEBAR = <GuidesSidebar />;

export function GuidePageContent({ page }: { page: GuidePage }) {
  const localizedPage = localizeGuidePage(page);
  if (page.slug.length === 0) return <GuidesLanding page={localizedPage} />;
  const canRender = canRenderGuidePageContent();
  const header = <GuidePageHeader page={localizedPage} />;
  // The layout stays mounted while the MDX chunk loads; only the article
  // body and the "On this page" rail suspend.
  return (
    <DocsLayout
      sidebar={GUIDES_SIDEBAR}
      navLabel={m.navGuides()}
      toc={
        canRender ? (
          <Suspense fallback={null}>
            <GuidePageToc page={page} />
          </Suspense>
        ) : null
      }
    >
      <article className={articleClassName(false)}>
        {canRender ? (
          <Suspense fallback={header}>
            <GuidePageBody page={page} header={header} />
          </Suspense>
        ) : (
          header
        )}
      </article>
    </DocsLayout>
  );
}

function GuidePageToc({ page }: { page: GuidePage }) {
  return <DocsToc entries={localizeTocEntries(useGuidePageContent(page).toc)} />;
}

function GuidePageBody({ page, header }: { page: GuidePage; header: ReactNode }) {
  const content = useGuidePageContent(page);
  const Content = content.Component;
  const relatedGuides = getRelatedGuidePages(page).map(localizeGuidePage);

  return (
    <>
      {header}

        <div className="docs-prose">
          <MDXProvider components={localizedContentMdxComponents}>
            <Content components={localizedContentMdxComponents} />
          </MDXProvider>
        </div>

        {relatedGuides.length ? (
          <nav
            className="mt-14 border-[var(--docs-panel-border)] border-t pt-8"
            aria-labelledby="related-guides"
          >
            <h2
              id="related-guides"
              className="font-semibold text-[1.0625rem] text-foreground tracking-[-0.01em]"
            >
              {m.guidesRelated()}
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {relatedGuides.map((guide) => (
                <Link
                  key={guide.url}
                  to="/guides/$"
                  params={{ _splat: guide.slug.join("/") }}
                  className="rounded-xl border border-[var(--docs-panel-border)] p-4 transition-colors hover:border-[var(--docs-border-strong)] hover:bg-[var(--docs-panel)]"
                >
                  <span className="block font-medium text-sm text-foreground">
                    {guide.frontmatter.title ?? guide.url}
                  </span>
                  {guide.frontmatter.description ? (
                    <span className="mt-1 line-clamp-2 block text-muted-foreground text-xs leading-5">
                      {guide.frontmatter.description}
                    </span>
                  ) : null}
                </Link>
              ))}
            </div>
          </nav>
        ) : null}
    </>
  );
}

function GuidePageHeader({ page }: { page: GuidePage }) {
  const { category, title, description, updated, tags } = page.frontmatter;
  return (
    <header className="mb-10">
      <p className="mb-3 flex items-center gap-1.5 font-medium text-[0.8125rem] text-muted-foreground">
        <Link to="/guides" className="transition-colors hover:text-foreground">
          {m.navGuides()}
        </Link>
        {category ? (
          <>
            <span aria-hidden>/</span>
            <span>{category}</span>
          </>
        ) : null}
      </p>
      {title ? (
        <h1 className="font-medium text-[2.25rem] text-foreground leading-[1.08] tracking-[-0.035em] md:text-[2.75rem]">
          {title}
        </h1>
      ) : null}
      {description ? (
        <p className="mt-4 text-base text-muted-foreground leading-7 md:text-[1.0625rem]">
          {description}
        </p>
      ) : null}
      {updated || tags?.length ? (
        <div className="mt-5 flex flex-wrap items-center gap-2 text-[0.75rem] text-muted-foreground">
          {updated ? (
            <span className="mr-1">{m.guidesUpdated({ date: formatContentDate(updated) })}</span>
          ) : null}
          {tags?.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[var(--docs-panel-border)] bg-[var(--docs-panel)] px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
    </header>
  );
}

/**
 * `/guides` index: starter packs as cards, then one two-column list per
 * language category, built from guide frontmatter so it never drifts from
 * the guides that exist.
 */
function GuidesLanding({ page }: { page: GuidePage }) {
  const categories = getGuideCategories();
  const packs = categories.find((category) => category.key === "Packs");
  const languages = categories.filter((category) => category !== packs);
  return (
    <DocsLayout variant="landing" sidebar={GUIDES_SIDEBAR} navLabel={m.navGuides()}>
      <article className={articleClassName(true)}>
        <header className="mb-10">
          <p className="mb-3 font-medium text-[0.8125rem] text-muted-foreground">
            {m.navGuides()}
          </p>
          {page.frontmatter.title ? (
            <h1 className="font-medium text-[2.25rem] text-foreground leading-[1.08] tracking-[-0.035em] md:text-[2.75rem]">
              {page.frontmatter.title}
            </h1>
          ) : null}
          {page.frontmatter.description ? (
            <p className="mt-4 max-w-2xl text-base text-muted-foreground leading-7 md:text-[1.0625rem]">
              {page.frontmatter.description}
            </p>
          ) : null}
        </header>

        {packs ? (
          <section>
            <h2 className="mb-4 font-semibold text-[1.0625rem] text-foreground tracking-[-0.01em]">
              {packs.index?.frontmatter.title ?? packs.label}
            </h2>
            <DocsCardGrid>
              {packs.pages.map((guide) => (
                <DocsCard
                  key={guide.url}
                  title={guide.frontmatter.title ?? guide.url}
                  href={guide.url}
                  icon={guideIcon(guide, packs)}
                >
                  {guide.frontmatter.description}
                </DocsCard>
              ))}
            </DocsCardGrid>
          </section>
        ) : null}

        {languages.map((category) => (
          <DocsLinkList key={category.key} title={category.label}>
            {category.pages.map((guide) => (
              <DocsLinkItem
                key={guide.url}
                title={guide.frontmatter.title ?? guide.url}
                href={guide.url}
                icon={guideIcon(guide, category)}
              >
                {guide.frontmatter.description}
              </DocsLinkItem>
            ))}
          </DocsLinkList>
        ))}
      </article>
    </DocsLayout>
  );
}
