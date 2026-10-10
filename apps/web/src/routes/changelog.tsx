import { MDXProvider } from "@mdx-js/react";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

import { TableOfContents } from "@/components/docs/table-of-contents";
import { localizedContentMdxComponents } from "@/components/mdx/localized-content-components";
import { changelogHead } from "@/lib/changelog/seo";
import { changelogPage, preloadChangelogContent, useChangelogContent } from "@/lib/changelog/source";

export const Route = createFileRoute("/changelog")({
  loader: () => preloadChangelogContent(),
  head: () => changelogHead(changelogPage),
  component: ChangelogPage,
});

function ChangelogPage() {
  return (
    <Suspense fallback={null}>
      <ChangelogBody />
    </Suspense>
  );
}

function ChangelogBody() {
  const { toc, Component } = useChangelogContent();
  const { title, description } = changelogPage.frontmatter;

  return (
    <main className="docs-shell mx-auto grid w-full max-w-[94rem] grid-cols-1 border-[var(--docs-border-subtle)] border-t xl:grid-cols-[minmax(0,52rem)_17rem] xl:justify-center">
      <article className="blog-article mx-auto w-full max-w-[52rem] px-5 py-12 pb-24 sm:px-8 lg:py-14">
        <header className="mb-10 border-[var(--docs-border-subtle)] border-b pb-8">
          <h1 className="text-balance font-semibold text-4xl text-foreground leading-[1.06] tracking-[-0.03em] md:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-5 max-w-[58ch] text-pretty text-lg text-muted-foreground leading-8">
              {description}
            </p>
          ) : null}
        </header>

        <div className="docs-prose blog-prose">
          <MDXProvider components={localizedContentMdxComponents}>
            <Component components={localizedContentMdxComponents} />
          </MDXProvider>
        </div>
      </article>
      <aside className="hidden xl:block">
        <TableOfContents toc={toc} />
      </aside>
    </main>
  );
}
