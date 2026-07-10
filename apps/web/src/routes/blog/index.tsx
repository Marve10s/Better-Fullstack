import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";

import { formatPostDate } from "@/components/blog/blog-page";
import type { BlogPost } from "@/lib/blog/source";

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

const featuredTitleStyle: CSSProperties = {
  fontSize: "clamp(1.6rem, 4vw, 2.6rem)",
  lineHeight: 1.12,
};

type IndexEntry = { post: BlogPost; params: { _splat: string } };

function ordinal(index: number): string {
  return String(index + 1).padStart(2, "0");
}

function PostMeta({ post }: { post: BlogPost }) {
  const date = formatPostDate(post.frontmatter.date);
  const minutes = post.readingStats?.longMins;

  return (
    <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[0.7rem] text-muted-foreground uppercase tracking-[0.16em]">
      {date ? <span>{date}</span> : null}
      {date && minutes ? <span aria-hidden>·</span> : null}
      {minutes ? <span>{m.blogMinRead({ minutes })}</span> : null}
    </p>
  );
}

function TagChips({ tags }: { tags: string[] | undefined }) {
  if (!tags?.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-md border border-border px-2 py-1 font-mono text-[0.65rem] uppercase text-muted-foreground"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function FeaturedPost({ entry }: { entry: IndexEntry }) {
  const { post, params } = entry;

  return (
    <Link
      to="/blog/$"
      params={params}
      className="group block border-y border-border py-10 sm:py-12"
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <span className="font-pixel text-sm text-lime-700 dark:text-[#C6E853]" aria-hidden>
          01
        </span>
        <span className="rounded-full border border-lime-700/40 px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-lime-700 dark:border-[#C6E853]/40 dark:text-[#C6E853]">
          {m.blogLatestPost()}
        </span>
        <PostMeta post={post} />
      </div>
      <h2
        className="mt-5 max-w-[28ch] text-balance font-semibold tracking-[-0.03em] underline-offset-4 transition-colors group-hover:underline group-hover:decoration-lime-700/60 dark:group-hover:decoration-[#C6E853]/60"
        style={featuredTitleStyle}
      >
        {post.frontmatter.title ?? post.url}
      </h2>
      {post.frontmatter.description ? (
        <p className="mt-4 max-w-2xl text-pretty text-base text-muted-foreground leading-7">
          {post.frontmatter.description}
        </p>
      ) : null}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <TagChips tags={post.frontmatter.tags} />
        <span className="inline-flex items-center gap-1.5 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-lime-700 transition-all group-hover:gap-2.5 dark:text-[#C6E853]">
          {m.blogReadPost()}
          <ArrowRight className="size-3.5" />
        </span>
      </div>
    </Link>
  );
}

function PostRow({ entry, index }: { entry: IndexEntry; index: number }) {
  const { post, params } = entry;

  return (
    <Link
      to="/blog/$"
      params={params}
      className="group grid grid-cols-[2.75rem_minmax(0,1fr)_auto] items-baseline gap-x-4 border-border border-b py-7 sm:gap-x-6"
    >
      <span
        className="font-pixel text-sm text-muted-foreground/60 transition-colors group-hover:text-lime-700 dark:group-hover:text-[#C6E853]"
        aria-hidden
      >
        {ordinal(index)}
      </span>
      <div className="min-w-0">
        <PostMeta post={post} />
        <h2 className="mt-2 text-balance font-semibold text-xl tracking-[-0.02em] sm:text-2xl">
          {post.frontmatter.title ?? post.url}
        </h2>
        {post.frontmatter.description ? (
          <p className="mt-2 max-w-2xl text-pretty text-sm text-muted-foreground leading-6 sm:text-[0.95rem]">
            {post.frontmatter.description}
          </p>
        ) : null}
        <div className="mt-3">
          <TagChips tags={post.frontmatter.tags} />
        </div>
      </div>
      <ArrowUpRight className="size-5 self-start text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-lime-700 dark:group-hover:text-[#C6E853]" />
    </Link>
  );
}

function BlogIndexPage() {
  const posts: IndexEntry[] = getAllBlogPosts().map((post) => ({
    post: localizeBlogPost(post),
    params: { _splat: post.slug.join("/") },
  }));
  const [featured, ...rest] = posts;

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

      {featured ? (
        <div className="mt-14">
          <FeaturedPost entry={featured} />
        </div>
      ) : null}

      {rest.length ? (
        <section className="mt-10">
          <p className="mb-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
            {m.blogAllPosts()}
          </p>
          <div>
            {rest.map((entry, index) => (
              <PostRow key={entry.post.url} entry={entry} index={index + 1} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
