import { useEffect, useState } from "react";

import { useTheme } from "@/lib/content/theme";

/**
 * Each scene is one public-domain painting graded twice, so the theme toggle
 * reads as dusk falling instead of an image swap. `focus` is the horizontal
 * point kept in view when narrow screens crop the sides.
 */
const SCENES = [
  { id: "owlshead", focus: "43%" },
  { id: "wilderness", focus: "50%" },
  { id: "bostonharbor", focus: "30%" },
  { id: "harbor", focus: "62%" },
] as const;

/** Hashed URLs, so the paintings cache forever and a re-grade ships under a new name. */
const SCENE_IMAGES = import.meta.glob<string>("../../assets/home/hero-*.avif", {
  eager: true,
  query: "?url",
  import: "default",
});

export type Scene = (typeof SCENES)[number];

const SCENE_VISIT_KEY = "bfs-hero-scene";
const SCENE_LAST_KEY = "bfs-hero-scene-last";

/**
 * One scene per visit: it survives reloads and navigation in the same tab,
 * and the next visit draws a different one.
 */
function pickScene() {
  const current = SCENES.find((entry) => entry.id === sessionStorage.getItem(SCENE_VISIT_KEY));
  if (current) return current;

  const last = localStorage.getItem(SCENE_LAST_KEY);
  const pool = SCENES.filter((entry) => entry.id !== last);
  const next = pool[Math.floor(Math.random() * pool.length)] ?? SCENES[0];
  sessionStorage.setItem(SCENE_VISIT_KEY, next.id);
  localStorage.setItem(SCENE_LAST_KEY, next.id);
  return next;
}

type SceneTime = "day" | "night";

const SCENE_WIDTHS = [
  [1280, "-1280"],
  [1920, "-1920"],
  [2560, ""],
] as const;

export const SCENE_SIZES = "(max-width: 832px) 560px, 100vw";

function sceneFile(scene: Scene, time: SceneTime, suffix: string) {
  return SCENE_IMAGES[`../../assets/home/hero-${scene.id}-${time}${suffix}.avif`];
}

export function sceneImage(scene: Scene, time: SceneTime) {
  return sceneFile(scene, time, "");
}

export function sceneSrcSet(scene: Scene, time: SceneTime) {
  return SCENE_WIDTHS.map(([width, suffix]) => `${sceneFile(scene, time, suffix)} ${width}w`).join(
    ", ",
  );
}

const SCENE_SRCSETS = Object.fromEntries(
  SCENES.map((scene) => [
    scene.id,
    { day: sceneSrcSet(scene, "day"), night: sceneSrcSet(scene, "night") },
  ]),
);

export const HERO_SCENE_PRELOAD_SCRIPT = `(() => {
  try {
    const srcsets = ${JSON.stringify(SCENE_SRCSETS)};
    const ids = Object.keys(srcsets);
    let id = sessionStorage.getItem("${SCENE_VISIT_KEY}");
    if (!srcsets[id]) {
      const last = localStorage.getItem("${SCENE_LAST_KEY}");
      const pool = ids.filter((entry) => entry !== last);
      id = pool[Math.floor(Math.random() * pool.length)] ?? ids[0];
      sessionStorage.setItem("${SCENE_VISIT_KEY}", id);
      localStorage.setItem("${SCENE_LAST_KEY}", id);
    }
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.setAttribute("fetchpriority", "high");
    link.setAttribute("imagesrcset", srcsets[id][document.documentElement.classList.contains("dark") ? "night" : "day"]);
    link.setAttribute("imagesizes", "${SCENE_SIZES}");
    document.head.appendChild(link);
  } catch {}
})();`;

const LOAD_FALLBACK_MS = 4000;

/**
 * Only for backdrops that first render in the browser, like the hero: on the server the theme is
 * unknown, so choosing an image by theme there disagrees with the browser on hydration.
 *
 * A day and night pair only needs the current theme's image up front. The other
 * one waits for the page to finish loading, so it never competes with first paint.
 */
export function useThemePair() {
  const { resolvedTheme } = useTheme();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (document.readyState === "complete") {
      setLoaded(true);
      return;
    }
    const onLoad = () => setLoaded(true);
    window.addEventListener("load", onLoad, { once: true });
    // One stalled request can hold the load event back for a long time, or for good.
    const fallback = window.setTimeout(onLoad, LOAD_FALLBACK_MS);
    return () => {
      window.removeEventListener("load", onLoad);
      window.clearTimeout(fallback);
    };
  }, []);

  return { day: loaded || resolvedTheme !== "dark", night: loaded || resolvedTheme === "dark" };
}

/** Undefined until mounted: the pick reads browser storage, so the server cannot make it. */
export function useHeroScene() {
  const [scene, setScene] = useState<Scene>();

  useEffect(() => setScene(pickScene()), []);

  return scene;
}
