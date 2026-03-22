import { createFileRoute } from "@tanstack/react-router";

import CombinationsSection from "@/components/home/combinations-section";
import ContributorsSection from "@/components/home/contributors-section";
import FeaturesSection from "@/components/home/features-section";
import Footer from "@/components/home/footer";
import HeroSection from "@/components/home/hero-section";
import TestimonialsSection from "@/components/home/testimonials-section";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE_ALT,
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_URL,
  DEFAULT_OG_IMAGE_WIDTH,
  DEFAULT_ROBOTS,
  DEFAULT_X_IMAGE_URL,
  SITE_NAME,
  canonicalUrl,
} from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${SITE_NAME} — Scaffold Production-Ready Fullstack Apps in Seconds` },
      { name: "description", content: DEFAULT_DESCRIPTION },
      { name: "robots", content: DEFAULT_ROBOTS },
      { property: "og:title", content: `${SITE_NAME} — Scaffold Production-Ready Fullstack Apps in Seconds` },
      { property: "og:description", content: DEFAULT_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonicalUrl("/") },
      { property: "og:image", content: DEFAULT_OG_IMAGE_URL },
      { property: "og:image:alt", content: DEFAULT_OG_IMAGE_ALT },
      { property: "og:image:width", content: String(DEFAULT_OG_IMAGE_WIDTH) },
      { property: "og:image:height", content: String(DEFAULT_OG_IMAGE_HEIGHT) },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `${SITE_NAME} — Scaffold Production-Ready Fullstack Apps in Seconds` },
      { name: "twitter:description", content: DEFAULT_DESCRIPTION },
      { name: "twitter:image", content: DEFAULT_X_IMAGE_URL },
      { name: "twitter:image:alt", content: DEFAULT_OG_IMAGE_ALT },
    ],
    links: [{ rel: "canonical", href: canonicalUrl("/") }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <main className="min-h-svh">
      <div className="mx-auto max-w-5xl border-x border-border">
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <CombinationsSection />
        <ContributorsSection />
        <Footer />
      </div>
    </main>
  );
}
