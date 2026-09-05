import { createFileRoute, notFound } from "@tanstack/react-router";

import { StackBuilderPage } from "@/components/stack-builder/stack-builder-page";
import { buildPageHead, getEcosystemOgImage, SITE_NAME } from "@/lib/seo/seo";
import { getCanonicalStackSharePath, normalizeStackShareSlug } from "@/lib/stack/stack-share-slugs";

const STACK_SHARE_LABELS = {
  typescript: "TypeScript",
  "react-native": "React Native",
  rust: "Rust",
  python: "Python",
  go: "Go",
  java: "Java",
  elixir: "Elixir",
  dotnet: ".NET",
  "multi-ecosystem": "Multi-ecosystem",
} as const;

export const Route = createFileRoute("/$stackShare")({
  loader: async ({ params }) => {
    const { parseStackShareSlug } = await import("@/lib/stack/stack-share-paths");
    const stack = parseStackShareSlug(params.stackShare);
    if (!stack) throw notFound();
    return { stack };
  },
  head: ({ params }) => {
    const canonicalSlug = normalizeStackShareSlug(params.stackShare);
    const label = canonicalSlug ? STACK_SHARE_LABELS[canonicalSlug] : "Shared";
    const title = `${label} Stack | ${SITE_NAME}`;
    const description = `Open the Better Fullstack ${label} builder configuration.`;

    const image = getEcosystemOgImage(canonicalSlug ?? "typescript");
    return buildPageHead({
      title,
      description,
      path: getCanonicalStackSharePath(params.stackShare) ?? `/${params.stackShare.toLowerCase()}`,
      image,
      twitterImage: image,
    });
  },
  component: StackSharePage,
});

function StackSharePage() {
  const { stack } = Route.useLoaderData();
  return <StackBuilderPage initialStack={stack} />;
}
