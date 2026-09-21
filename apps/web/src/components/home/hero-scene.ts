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

export function sceneImage(scene: Scene, time: "day" | "night") {
  return SCENE_IMAGES[`../../assets/home/hero-${scene.id}-${time}.avif`];
}

/**
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
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return { day: loaded || resolvedTheme !== "dark", night: loaded || resolvedTheme === "dark" };
}

/** Undefined until mounted: the pick reads browser storage, so the server cannot make it. */
export function useHeroScene() {
  const [scene, setScene] = useState<Scene>();

  useEffect(() => setScene(pickScene()), []);

  return scene;
}
