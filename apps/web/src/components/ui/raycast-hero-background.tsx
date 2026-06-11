"use client";

import { lazy, Suspense, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const RaycastAnimatedBackground = lazy(async () => {
  const m = await import("@/components/ui/raycast-animated-background");
  return { default: m.RaycastAnimatedBackground };
});

type RaycastHeroBackgroundProps = {
  className?: string;
};

function useContainerSize<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const update = () => {
      setSize({
        width: node.clientWidth,
        height: node.clientHeight,
      });
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, size };
}

export function RaycastHeroBackground({ className }: RaycastHeroBackgroundProps) {
  const { ref, size } = useContainerSize<HTMLDivElement>();
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPaused(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "absolute inset-0 overflow-hidden bg-[#0a0a0a] [filter:invert(1)_hue-rotate(180deg)]",
        "dark:bg-[#0a0a0a] dark:[filter:none]",
        className,
      )}
      aria-hidden
    >
      {size.width > 0 && size.height > 0 ? (
        <Suspense fallback={null}>
          <RaycastAnimatedBackground
            width={size.width}
            height={size.height}
            lazyLoad={false}
            paused={paused}
            colorTint="lime"
          />
        </Suspense>
      ) : null}
    </div>
  );
}
