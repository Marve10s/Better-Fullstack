import { createFileRoute, notFound } from "@tanstack/react-router";

import { BlogPostPageContent } from "@/components/blog/blog-page";
import { blogPostHead } from "@/lib/blog/seo";
import { getBlogPost, preloadBlogPostContent } from "@/lib/blog/source";
import { localizeBlogFrontmatter, localizeBlogPost } from "@/lib/i18n/content-copy";
import { m } from "@/paraglide/messages.js";

export const Route = createFileRoute("/blog/$")({
  loader: ({ params }) => {
    const slug = (params._splat ?? "").split("/").filter(Boolean);
    const post = getBlogPost(slug);
    if (!post) throw notFound();
    preloadBlogPostContent(post.slug);
    return {
      slug: post.slug,
      frontmatter: post.frontmatter,
    };
  },
  head: ({ loaderData }) =>
    loaderData
      ? blogPostHead({
          url: `/blog/${loaderData.slug.join("/")}`,
          frontmatter: localizeBlogFrontmatter(loaderData.slug, loaderData.frontmatter),
        })
      : blogPostHead({ url: "/blog", frontmatter: { title: m.navBlog() } }),
  component: BlogSplatPage,
});

function BlogSplatPage() {
  const { slug } = Route.useLoaderData();
  const post = getBlogPost(slug);
  if (!post) throw notFound();
  return <BlogPostPageContent post={localizeBlogPost(post)} />;
}
