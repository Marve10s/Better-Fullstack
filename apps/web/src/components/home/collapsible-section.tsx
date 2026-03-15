import { ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
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
  const glowRef = useRef<HTMLDivElement>(null);
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
    const glow = glowRef.current;
    if (!glow) return;
    const parent = glow.parentElement;
    if (!parent) return;

    const onMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      glow.style.transform = `translate(${e.clientX - rect.left - 150}px, ${e.clientY - rect.top - 150}px)`;
    };

    const onEnter = () => {
      glow.style.opacity = "1";
    };

    const onLeave = () => {
      glow.style.opacity = "0";
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

  const reduced = prefersReducedMotion.current;

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
            className="pointer-events-none absolute opacity-0 transition-opacity duration-300"
            style={{
              width: 300,
              height: 300,
              background:
                "radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 70%)",
            }}
          />

          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 20 }}
            className="relative z-10"
          >
            <ChevronRight
              className={cn(
                "h-5 w-5 shrink-0 transition-colors duration-200",
                isOpen
                  ? "text-primary"
                  : "text-muted-foreground/40 group-hover:text-primary",
              )}
            />
          </motion.div>
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

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id={contentId}
              role="region"
              aria-labelledby={headingId}
              initial={reduced ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={reduced ? { duration: 0 } : { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden"
            >
              <div className="pb-8 sm:pb-12">
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
