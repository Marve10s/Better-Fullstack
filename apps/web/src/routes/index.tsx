import { createFileRoute } from "@tanstack/react-router";

import CombinationsSection from "@/components/home/combinations-section";
import ContributorsSection from "@/components/home/contributors-section";
import FeaturesSection from "@/components/home/features-section";
import Footer from "@/components/home/footer";
import HeroSection from "@/components/home/hero-section";
import TestimonialsSection from "@/components/home/testimonials-section";

export const Route = createFileRoute("/")({
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
