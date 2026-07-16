import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import {
  hasSeenLaunchRadar,
  LAUNCH_RADAR_SEEN_EVENT,
  LAUNCH_RADAR_TOTAL,
  requestLaunchRadarOpen,
} from "@/lib/launch-radar";
import { cn } from "@/lib/utils";
import { m } from "@/paraglide/messages.js";

export function LaunchRadarButton({ compact = false }: { compact?: boolean }) {
  const [unread, setUnread] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const update = () => setUnread(!hasSeenLaunchRadar(window.localStorage));
    update();
    window.addEventListener(LAUNCH_RADAR_SEEN_EVENT, update);
    return () => window.removeEventListener(LAUNCH_RADAR_SEEN_EVENT, update);
  }, []);

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.15 }}
      whileHover={reduceMotion ? undefined : { y: -1 }}
      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
    >
      <Link
        to="/"
        hash="whats-new"
        onClick={requestLaunchRadarOpen}
        aria-label={
          unread ? m.launchRadarOpenUnread({ count: LAUNCH_RADAR_TOTAL }) : m.navUpdates()
        }
        className={cn(
          "group relative isolate inline-flex h-8 items-center gap-1.5 overflow-hidden rounded-full border px-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors lg:h-7 lg:gap-1 lg:px-2 lg:text-[9px] lg:tracking-[0.1em] xl:h-8 xl:gap-1.5 xl:px-2.5 xl:text-[10px] xl:tracking-[0.14em]",
          unread
            ? "border-[#18D5FF]/45 bg-[#18D5FF]/8 text-foreground shadow-[0_0_18px_rgba(24,213,255,0.12)] hover:border-[#FF5C8A]/55"
            : "border-border/60 bg-muted/25 text-muted-foreground hover:text-foreground",
          compact && "h-7 px-2",
        )}
      >
        {unread ? (
          <motion.span
            aria-hidden
            className="absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/18 to-transparent"
            animate={reduceMotion ? undefined : { x: ["0%", "420%"] }}
            transition={{ duration: 1.2, delay: 1, repeat: 1, repeatDelay: 3 }}
          />
        ) : null}
        <Sparkles className={cn("relative size-3", unread && "text-[#FF5C8A]")} aria-hidden />
        <span className="relative">{unread ? `${LAUNCH_RADAR_TOTAL} new` : m.navUpdates()}</span>
        {unread ? (
          <span className="relative flex size-1.5" aria-hidden>
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#18D5FF] opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex size-1.5 rounded-full bg-[#18D5FF]" />
          </span>
        ) : null}
      </Link>
    </motion.div>
  );
}
