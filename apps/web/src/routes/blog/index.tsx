import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";

import { formatPostDate } from "@/components/blog/blog-page";
import { blogIndexHead } from "@/lib/blog/seo";
import { getAllBlogPosts } from "@/lib/blog/source";
import { localizeBlogPost } from "@/lib/i18n/content-copy";
import { m } from "@/paraglide/messages.js";

export const Route = createFileRoute("/blog/")({
  head: () => blogIndexHead(),
  component: BlogIndexPage,
});

const headingStyle: CSSProperties = {
  fontSize: "clamp(2rem, 6vw, 3.6rem)",
  lineHeight: 0.98,
};

function BlogIndexPage() {
  const posts = getAllBlogPosts().map((post) => ({
    post: localizeBlogPost(post),
    params: { _splat: post.slug.join("/") },
  }));

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-8 sm:py-20">
      <header>
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-lime-700 dark:text-[#C6E853]">
          ✦ {m.navBlog()}
        </p>
        <h1
          className="mt-4 max-w-[18ch] text-balance font-mono font-bold tracking-[-0.04em]"
          style={headingStyle}
        >
          {m.blogTitle()}
        </h1>
        <p className="mt-5 max-w-xl text-pretty text-sm text-muted-foreground sm:text-base">
          {m.blogDescription()}
        </p>
      </header>

      <div className="mt-12 grid gap-4">
        {posts.map(({ post, params }) => (
          <Link
            key={post.url}
            to="/blog/$"
            params={params}
            className="group rounded-2xl border border-border bg-card p-6 transition-colors hover:border-lime-700/40 dark:hover:border-[#C6E853]/40 sm:p-8"
          >
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-muted-foreground">
              {formatPostDate(post.frontmatter.date)}
            </p>
            <h2 className="mt-3 flex items-start justify-between gap-4 text-balance font-mono text-xl font-bold tracking-[-0.02em] sm:text-2xl">
              {post.frontmatter.title ?? post.url}
              <ArrowUpRight className="mt-1 size-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-lime-700 dark:group-hover:text-[#C6E853]" />
            </h2>
            {post.frontmatter.description ? (
              <p className="mt-3 max-w-2xl text-pretty text-sm text-muted-foreground sm:text-base">
                {post.frontmatter.description}
              </p>
            ) : null}
            {post.frontmatter.tags?.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {post.frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-border px-2 py-1 font-mono text-[0.68rem] uppercase text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </Link>
        ))}
      </div>
    </main>
  );
}
