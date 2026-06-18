import { MDXProvider } from "@mdx-js/react";
import { Link } from "@tanstack/react-router";
import { Fragment, Suspense } from "react";

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
      <article className="mx-auto w-full max-w-[52rem] px-5 py-12 sm:px-8 lg:py-14">
        <BlogPostHeader post={post} />
      </article>
    </main>
  );
}

function BlogPostBody({ post }: { post: BlogPost }) {
  const content = useBlogPostContent(post);
  const Content = content.Component;

  return (
    <main className="docs-shell mx-auto grid w-full max-w-[94rem] grid-cols-1 border-[var(--docs-border-subtle)] border-t xl:grid-cols-[minmax(0,52rem)_16rem] xl:justify-center">
      <article className="mx-auto w-full max-w-[52rem] px-5 py-12 sm:px-8 lg:py-14">
        <BlogPostHeader post={post} />

        <div className="docs-prose">
          <MDXProvider components={localizedContentMdxComponents}>
            <Content components={localizedContentMdxComponents} />
          </MDXProvider>
        </div>
      </article>
      <aside className="hidden border-[var(--docs-border-subtle)] border-l bg-[var(--docs-surface)]/35 xl:block">
        <TableOfContents toc={localizeTocEntries(content.toc)} />
      </aside>
    </main>
  );
}

function BlogPostHeader({ post }: { post: BlogPost }) {
  const date = formatPostDate(post.frontmatter.date);

  return (
    <header className="mb-10 border-[var(--docs-border-subtle)] border-b pb-8">
      <Link
        to="/blog"
        className="font-mono text-[0.72rem] text-[var(--docs-accent)] uppercase transition-colors hover:text-foreground"
      >
        {m.navBlog()}
      </Link>
      {post.frontmatter.title ? (
        <h1 className="mt-5 font-semibold text-4xl text-foreground leading-[1.08] md:text-5xl">
          {post.frontmatter.title}
        </h1>
      ) : null}
      {post.frontmatter.description ? (
        <p className="mt-4 text-base text-muted-foreground leading-7 md:text-lg">
          {post.frontmatter.description}
        </p>
      ) : null}
      {date || post.frontmatter.authors?.length ? (
        <p className="mt-4 font-mono text-[0.72rem] text-muted-foreground uppercase">
          {date}
          {date && post.frontmatter.authors?.length ? " · " : null}
          <AuthorByline authors={post.frontmatter.authors ?? EMPTY_AUTHORS} />
        </p>
      ) : null}
      {post.frontmatter.tags?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {post.frontmatter.tags.map((tag) => (
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
  );
}

function AuthorByline({ authors }: { authors: string[] }) {
  return authors.map((author, index) => {
    const href = AUTHOR_LINKS[author];

    return (
      <Fragment key={author}>
        {index > 0 ? ", " : null}
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
          author
        )}
      </Fragment>
    );
  });
}
