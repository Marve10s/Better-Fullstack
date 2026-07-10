import "@fontsource/opendyslexic/400.css";
import "@fontsource/opendyslexic/700.css";

import { MDXProvider } from "@mdx-js/react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Fragment, Suspense } from "react";

import { ReadingControls } from "@/components/blog/reading-controls";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { ShareActions } from "@/components/blog/share-actions";
import { TableOfContents } from "@/components/docs/table-of-contents";
import { localizedContentMdxComponents } from "@/components/mdx/localized-content-components";
import { type BlogPost, canRenderBlogPostContent, useBlogPostContent } from "@/lib/blog/source";
import { localizeTocEntries } from "@/lib/i18n/content-copy";
import { getLocaleDateTag } from "@/lib/i18n/locales";
import { m } from "@/paraglide/messages.js";
import { getLocale } from "@/paraglide/runtime.js";

export function formatPostDate(date: string | undefined): string | null {
  if (!date) return null;
  const parsed = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString(getLocaleDateTag(getLocale()), {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

const AUTHOR_LINKS: Record<string, string> = {
  "Ibrahim Elkamali": "https://x.com/IbrahimElkamali",
};

const EMPTY_AUTHORS: string[] = [];

export function BlogPostPageContent({ post }: { post: BlogPost }) {
  // The MDX body chunk loads on demand; render nothing extra while waiting —
  // the surrounding route shell (navbar etc.) stays visible.
  if (!canRenderBlogPostContent()) return <BlogPostShell post={post} />;
  return (
    <Suspense fallback={null}>
      <BlogPostBody post={post} />
    </Suspense>
  );
}

function BlogPostShell({ post }: { post: BlogPost }) {
  return (
    <main className="docs-shell mx-auto grid w-full max-w-[94rem] grid-cols-1 border-[var(--docs-border-subtle)] border-t xl:grid-cols-[minmax(0,52rem)_16rem] xl:justify-center">
      <article className="blog-article mx-auto w-full max-w-[52rem] px-5 py-12 sm:px-8 lg:py-14">
        <BlogPostHeader post={post} />
      </article>
    </main>
  );
}

function BlogPostBody({ post }: { post: BlogPost }) {
  const content = useBlogPostContent(post);
  const Content = content.Component;

  return (
    <>
      <ReadingProgress />
      <main className="docs-shell mx-auto grid w-full max-w-[94rem] grid-cols-1 border-[var(--docs-border-subtle)] border-t xl:grid-cols-[minmax(0,52rem)_16rem] xl:justify-center">
        <article className="blog-article mx-auto w-full max-w-[52rem] px-5 py-12 pb-24 sm:px-8 lg:py-14">
          <BlogPostHeader post={post} />

          <div className="docs-prose blog-prose">
            <MDXProvider components={localizedContentMdxComponents}>
              <Content components={localizedContentMdxComponents} />
            </MDXProvider>
          </div>
        </article>
        <aside className="hidden border-[var(--docs-border-subtle)] border-l bg-[var(--docs-surface)]/35 xl:block">
          <TableOfContents toc={localizeTocEntries(content.toc)} />
        </aside>
      </main>
      <ReadingControls readingStats={post.readingStats} />
    </>
  );
}

function BlogPostHeader({ post }: { post: BlogPost }) {
  const date = formatPostDate(post.frontmatter.date);
  const minutes = post.readingStats?.longMins;

  return (
    <header className="mb-10 border-[var(--docs-border-subtle)] border-b pb-8">
      <Link
        to="/blog"
        className="group inline-flex items-center gap-1.5 font-mono text-[0.72rem] text-[var(--docs-accent)] uppercase tracking-[0.16em] transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3 transition-transform group-hover:-translate-x-0.5" />
        {m.navBlog()}
      </Link>

      <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.72rem] text-muted-foreground uppercase tracking-[0.14em]">
        {date ? <span>{date}</span> : null}
        {date && minutes ? <span aria-hidden>·</span> : null}
        {minutes ? <span>{m.blogMinRead({ minutes })}</span> : null}
        {post.frontmatter.authors?.length ? (
          <>
            <span aria-hidden>·</span>
            <AuthorByline authors={post.frontmatter.authors ?? EMPTY_AUTHORS} />
          </>
        ) : null}
      </div>

      {post.frontmatter.title ? (
        <h1 className="mt-4 text-balance font-semibold text-4xl text-foreground leading-[1.06] tracking-[-0.03em] md:text-5xl">
          {post.frontmatter.title}
        </h1>
      ) : null}
      {post.frontmatter.description ? (
        <p className="mt-5 max-w-[58ch] text-pretty text-lg text-muted-foreground leading-8">
          {post.frontmatter.description}
        </p>
      ) : null}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        {post.frontmatter.tags?.length ? (
          <div className="flex flex-wrap gap-2">
            {post.frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-[var(--docs-border-subtle)] bg-[var(--docs-surface)]/70 px-2 py-1 font-mono text-[0.68rem] text-muted-foreground uppercase"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : (
          <span />
        )}
        <ShareActions title={post.frontmatter.title ?? ""} slug={post.slug} />
      </div>
    </header>
  );
}

function AuthorByline({ authors }: { authors: string[] }) {
  return authors.map((author, index) => {
    const href = AUTHOR_LINKS[author];

    return (
      <Fragment key={author}>
        {index > 0 ? <span aria-hidden>,</span> : null}
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            {author}
          </a>
        ) : (
          <span>{author}</span>
        )}
      </Fragment>
    );
  });
}
