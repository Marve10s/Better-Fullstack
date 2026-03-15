
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, Quote } from "lucide-react";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

import { LIKED_BY, ROW_1, ROW_2, ROW_3 } from "./testimonials-data";
import type { Testimonial } from "./testimonials-data";

gsap.registerPlugin(ScrollTrigger);

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="group relative flex w-[320px] shrink-0 flex-col gap-3 rounded-xl border border-border bg-background p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.15)]">
      <Quote className="absolute top-4 right-4 h-5 w-5 text-muted-foreground/10 transition-colors duration-300 group-hover:text-primary/20" />
      <p className="text-sm leading-relaxed text-muted-foreground">
        &ldquo;{testimonial.comment}&rdquo;
      </p>
      {testimonial.gif && (
        <img
          src={testimonial.gif}
          alt="Rick Sanchez reaction GIF"
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full rounded-md border border-border"
        />
      )}
      <div className="mt-auto flex items-center gap-3 border-t border-border/50 pt-3">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="h-8 w-8 rounded-full border border-border transition-all duration-300 group-hover:border-primary/30"
        />
        <div className="flex flex-col">
          <span className="font-mono text-xs font-medium text-foreground">
            {testimonial.name}
          </span>
          <span className="font-mono text-[10px] text-muted-foreground/60">
            via daily.dev
          </span>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({
  testimonials,
  direction = "left",
  speed = 40,
}: {
  testimonials: Testimonial[];
  direction?: "left" | "right";
  speed?: number;
}) {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = row.children;
    const totalWidth = Array.from(items)
      .slice(0, testimonials.length)
      .reduce((acc, el) => acc + (el as HTMLElement).offsetWidth + 16, 0);

    const duration = totalWidth / speed;
    const xPercent = direction === "left" ? -50 : 0;
    const xPercentEnd = direction === "left" ? 0 : -50;

    gsap.set(row, { xPercent });

    const tween = gsap.to(row, {
      xPercent: xPercentEnd,
      duration,
      ease: "none",
      repeat: -1,
    });

    const onEnter = () => tween.timeScale(0.2);
    const onLeave = () => tween.timeScale(1);
    row.addEventListener("mouseenter", onEnter);
    row.addEventListener("mouseleave", onLeave);

    return () => {
      tween.kill();
      row.removeEventListener("mouseenter", onEnter);
      row.removeEventListener("mouseleave", onLeave);
    };
  }, [testimonials.length, direction, speed]);

  const doubled = [...testimonials, ...testimonials];

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
      <div ref={rowRef} className="flex gap-4 py-2">
        {doubled.map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} testimonial={t} />
        ))}
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    if (!section || !header) return;

    const ctx = gsap.context(() => {
      gsap.from(header.children, {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: header,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      const likedBy = section.querySelector(".liked-by");
      if (likedBy) {
        gsap.from(likedBy.children, {
          y: 30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: likedBy,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden border-t border-border py-16"
    >
      {/* Header */}
      <div ref={headerRef} className="mx-auto mb-10 max-w-3xl px-4">
        <h2 className="font-pixel text-xl font-bold">
          People almost love it!
        </h2>
        <p className="mt-2 text-muted-foreground">
          What the community is saying on{" "}
          <a
            href="https://app.daily.dev/posts/a42eCYoJk"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 transition-colors hover:text-foreground"
          >
            daily.dev
          </a>
        </p>
      </div>

      {/* Marquee rows */}
      <div className="space-y-4">
        <MarqueeRow testimonials={ROW_1} direction="left" speed={30} />
        <MarqueeRow testimonials={ROW_2} direction="right" speed={25} />
        <MarqueeRow testimonials={ROW_3} direction="left" speed={35} />
      </div>

      {/* Liked by */}
      <div className="liked-by mx-auto mt-14 max-w-3xl px-4">
        <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
          <Heart className="h-4 w-4 fill-red-500 text-red-500" />
          <span className="font-mono uppercase tracking-wide">
            Liked on X by
          </span>
        </div>
        <div className="mt-5 flex flex-wrap gap-4">
          {LIKED_BY.map((person) => (
            <a
              key={person.handle}
              href={`https://x.com/${person.handle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_20px_-5px_hsl(var(--primary)/0.1)]"
            >
              <img
                src={person.avatar}
                alt={person.name}
                loading="lazy"
                referrerPolicy="no-referrer"
                className={cn(
                  "h-9 w-9 rounded-full border border-border transition-all duration-300 group-hover:border-primary/30",
                  person.invertDark && "dark:bg-white dark:p-0.5",
                )}
              />
              <div className="flex flex-col">
                <span className="font-mono text-sm font-medium text-foreground">
                  {person.name}
                </span>
                <span className="font-mono text-[11px] text-muted-foreground/60">
                  {person.role}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
