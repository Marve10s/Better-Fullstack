import { cn } from "@/lib/platform/utils";
import {
  getBrandInvertClass,
  getInvertClass,
  getSiUrl,
  getSiUrlInvertClass,
  ICON_REGISTRY,
} from "@/lib/stack/tech-icons";

interface TechIconProps {
  /** Preferred: look up colour-aware config from the registry */
  techId?: string;
  /** Fallback: raw icon value from constant.ts (URL, path, or emoji) */
  icon?: string;
  name: string;
  className?: string;
  loading?: "eager" | "lazy";
}

export function TechIcon({ techId, icon, name, className, loading = "lazy" }: TechIconProps) {
  if (techId) {
    const config = ICON_REGISTRY[techId];
    if (config) {
      if (config.type === "si") {
        const invertClass = config.needsInvert
          ? getInvertClass(config.needsInvert)
          : config.fixedColor
            ? ""
            : getBrandInvertClass(config.hex);
        return (
          <img
            loading={loading}
            decoding="async"
            src={getSiUrl(config.slug, config.hex)}
            alt={`${name} icon`}
            width={20}
            height={20}
            className={cn("inline-block", invertClass, className)}
          />
        );
      }
      // local
      return (
        <img
          loading={loading}
          decoding="async"
          src={config.src}
          alt={`${name} icon`}
          width={20}
          height={20}
          className={cn("inline-block", getInvertClass(config.needsInvert), className)}
        />
      );
    }
  }

  // ── Fallback: legacy icon prop ─────────────────────────────────────────────
  if (!icon) return null;

  if (icon.startsWith("https://") || icon.startsWith("/")) {
    return (
      <img
        loading={loading}
        decoding="async"
        src={icon}
        alt={`${name} icon`}
        width={20}
        height={20}
        className={cn("inline-block", getSiUrlInvertClass(icon), className)}
      />
    );
  }

  // Text / emoji
  return <span className={cn("inline-flex items-center text-lg", className)}>{icon}</span>;
}
