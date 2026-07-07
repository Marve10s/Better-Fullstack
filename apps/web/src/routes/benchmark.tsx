import { createFileRoute } from "@tanstack/react-router";

import Footer from "@/components/home/footer";
import LLMBenchmarkSection from "@/components/home/llm-benchmark-section";
import {
  DEFAULT_OG_IMAGE_ALT,
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_URL,
  DEFAULT_OG_IMAGE_WIDTH,
  DEFAULT_ROBOTS,
  DEFAULT_X_IMAGE_URL,
  canonicalUrl,
} from "@/lib/seo";
import { m } from "@/paraglide/messages.js";

export const Route = createFileRoute("/benchmark")({
  head: () => {
    const title = m.benchmarkSeoTitle();
    const description = m.llmBenchmarkDescription();

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: DEFAULT_ROBOTS },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: canonicalUrl("/benchmark") },
        { property: "og:image", content: DEFAULT_OG_IMAGE_URL },
        { property: "og:image:alt", content: DEFAULT_OG_IMAGE_ALT },
        { property: "og:image:width", content: String(DEFAULT_OG_IMAGE_WIDTH) },
        { property: "og:image:height", content: String(DEFAULT_OG_IMAGE_HEIGHT) },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: DEFAULT_X_IMAGE_URL },
        { name: "twitter:image:alt", content: DEFAULT_OG_IMAGE_ALT },
      ],
      links: [{ rel: "canonical", href: canonicalUrl("/benchmark") }],
    };
  },
  component: BenchmarkPage,
});

function BenchmarkPage() {
  return (
    <main className="min-h-svh">
      <div className="mx-auto max-w-[1480px] border-x border-border">
        <LLMBenchmarkSection />
        <Footer />
      </div>
    </main>
  );
}
