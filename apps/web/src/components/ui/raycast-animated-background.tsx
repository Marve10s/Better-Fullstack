"use client";

import { useEffect, useState } from "react";
import UnicornScene from "unicornstudio-react";

import { cn } from "@/lib/utils";

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

type RaycastAnimatedBackgroundProps = {
  className?: string;
  width?: number | string;
  height?: number | string;
  projectId?: string;
  production?: boolean;
  lazyLoad?: boolean;
  paused?: boolean;
  scale?: number;
  /** Shift the embedded Raycast scene toward Better-Fullstack lime. */
  colorTint?: "none" | "lime";
};

export function RaycastAnimatedBackground({
  className,
  width = "100%",
  height = "100%",
  projectId = "cbmTT38A0CcuYxeiyj5H",
  production = true,
  lazyLoad = true,
  paused = false,
  scale = 0.75,
  colorTint = "none",
}: RaycastAnimatedBackgroundProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
  }, [projectId, width, height]);

  return (
    <div className={cn("relative size-full overflow-hidden", className)}>
      <div
        className={cn(
          "size-full transition-opacity duration-700 ease-out",
          isLoaded ? "opacity-100" : "opacity-0",
        )}
      >
        <div
          className={cn(
            "size-full",
            colorTint === "lime" &&
              isLoaded &&
              "[filter:hue-rotate(72deg)_saturate(1.7)_brightness(1.12)_contrast(1.06)]",
          )}
        >
          <UnicornScene
            production={production}
            projectId={projectId}
            width={width}
            height={height}
            lazyLoad={lazyLoad}
            paused={paused}
            scale={scale}
            ariaLabel="Animated background"
            altText=""
            className="size-full"
            showPlaceholderWhileLoading={false}
            onLoad={() => setIsLoaded(true)}
          />
        </div>
        {colorTint === "lime" && isLoaded ? (
          <div
            className="pointer-events-none absolute inset-0 opacity-40 mix-blend-color dark:opacity-45"
            style={{ backgroundColor: "#C6E853" }}
            aria-hidden
          />
        ) : null}
      </div>
    </div>
  );
}

export function RaycastAnimatedBackgroundViewport() {
  const { width, height } = useWindowSize();

  if (width === 0 || height === 0) return null;

  return (
    <div className={cn("flex flex-col items-center")}>
      <RaycastAnimatedBackground width={width} height={height} lazyLoad={false} />
    </div>
  );
}
