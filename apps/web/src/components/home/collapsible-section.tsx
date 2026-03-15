import { gsap } from "gsap";
import { ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface CollapsibleSectionProps {
  title: string;
  subtitle?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export function CollapsibleSection({
  title,
  subtitle,
  defaultOpen = false,
  children,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const sectionSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const headingId = `section-heading-${sectionSlug}`;
  const contentId = `section-content-${sectionSlug}`;

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const content = contentRef.current;
    const inner = innerRef.current;
    const arrow = arrowRef.current;
    if (!content || !inner || !arrow) return;

    if (prefersReducedMotion.current) {
      if (isOpen) {
        gsap.set(content, { height: "auto", opacity: 1 });
        gsap.set(arrow, { rotation: 90 });
      } else {
        gsap.set(content, { height: 0, opacity: 0 });
        gsap.set(arrow, { rotation: 0 });
      }
      return;
    }

    const ctx = gsap.context(() => {
      if (!hasAnimated.current) {
        hasAnimated.current = true;
        if (isOpen) {
          gsap.set(content, { height: "auto", opacity: 1 });
          gsap.set(arrow, { rotation: 90 });
        } else {
          gsap.set(content, { height: 0, opacity: 0 });
          gsap.set(arrow, { rotation: 0 });
        }
        return;
      }

      if (isOpen) {
        const targetHeight = inner.scrollHeight;
        gsap.to(content, {
          height: targetHeight,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
        });
        gsap.to(arrow, {
          rotation: 90,
          duration: 0.35,
          ease: "back.out(1.7)",
        });

        const items = inner.querySelectorAll("[data-animate]");
        if (items.length > 0) {
          gsap.fromTo(
            items,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.04,
              duration: 0.4,
              ease: "power2.out",
              delay: 0.15,
            },
          );
        }
      } else {
        gsap.to(content, {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: "power3.inOut",
        });
        gsap.to(arrow, {
          rotation: 0,
          duration: 0.35,
          ease: "back.out(1.7)",
        });
      }
    });

    return () => ctx.revert();
  }, [isOpen]);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;
    const parent = glow.parentElement;
    if (!parent) return;

    const onMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      gsap.to(glow, {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const onEnter = () => {
      gsap.to(glow, { opacity: 1, duration: 0.3 });
    };

    const onLeave = () => {
      gsap.to(glow, { opacity: 0, duration: 0.3 });
    };

    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseenter", onEnter);
    parent.addEventListener("mouseleave", onLeave);

    return () => {
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseenter", onEnter);
      parent.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-3xl px-4">
        <button
          type="button"
          onClick={toggle}
          aria-expanded={isOpen}
          aria-controls={contentId}
          className="group relative flex w-full cursor-pointer items-center gap-3 overflow-hidden py-6 text-left sm:py-8"
        >
          <div
            ref={glowRef}
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 opacity-0"
            style={{
              width: 300,
              height: 300,
              background:
                "radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 70%)",
            }}
          />

          <ChevronRight
            ref={arrowRef}
            className={cn(
              "relative z-10 h-5 w-5 shrink-0 transition-colors duration-200",
              isOpen
                ? "text-primary"
                : "text-muted-foreground/40 group-hover:text-primary",
            )}
          />
          <div className="relative z-10 min-w-0 flex-1">
            <h2
              id={headingId}
              className={cn(
                "font-pixel text-lg font-bold transition-colors duration-200 sm:text-xl",
                isOpen
                  ? "text-foreground"
                  : "text-foreground/70 group-hover:text-foreground",
              )}
            >
              {title}
            </h2>
            {subtitle && (
              <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                {subtitle}
              </p>
            )}
          </div>
        </button>

        <div
          ref={contentRef}
          id={contentId}
          role="region"
          aria-labelledby={headingId}
          aria-hidden={!isOpen}
          className="overflow-hidden"
        >
          <div ref={innerRef} className="pb-8 sm:pb-12">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
