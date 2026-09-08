import { useEffect, useState, type CSSProperties } from "react";
import {
  TbCircleCheck as CircleCheckIcon,
  TbInfoCircle as InfoIcon,
  TbAlertTriangle as TriangleAlertIcon,
  TbCircleX as OctagonXIcon,
  TbLoader2 as Loader2Icon,
  TbX as XIcon,
} from "react-icons/tb";
import { Toaster as Sonner, toast, useSonner, type ToasterProps } from "sonner";

import { useTheme } from "@/lib/content/theme";
import * as m from "@/paraglide/messages";

const CLOSE_ALL_MIN_TOASTS = 3;
const CLOSE_ALL_GAP = 10;

/** Sonner exposes each toast's target offset as inline CSS variables. */
function CloseAllToasts({ position }: { position: NonNullable<ToasterProps["position"]> }) {
  const { toasts } = useSonner();
  const [placement, setPlacement] = useState<CSSProperties | null>(null);
  const toastCount = toasts.length;

  useEffect(() => {
    if (toastCount < CLOSE_ALL_MIN_TOASTS) {
      setPlacement(null);
      return;
    }
    const [vertical, horizontal] = position.split("-");
    const toaster = document.querySelector<HTMLElement>(
      `[data-sonner-toaster][data-y-position="${vertical}"][data-x-position="${horizontal}"]`,
    );
    if (!toaster) return;
    const measure = () => {
      const stackHeight = [...toaster.querySelectorAll<HTMLElement>("[data-sonner-toast]")]
        .filter((item) => item.dataset.removed !== "true")
        .reduce((max, item) => {
          const offset = Number.parseFloat(item.style.getPropertyValue("--offset")) || 0;
          const height =
            Number.parseFloat(item.style.getPropertyValue("--initial-height")) || item.offsetHeight;
          return Math.max(max, offset + height);
        }, 0);
      const style = getComputedStyle(toaster);
      setPlacement({
        [vertical]:
          (Number.parseFloat(style[vertical === "top" ? "top" : "bottom"]) || 0) +
          stackHeight +
          CLOSE_ALL_GAP,
        ...(horizontal === "center"
          ? { left: "50%", transform: "translateX(-50%)" }
          : {
              [horizontal]: Number.parseFloat(style[horizontal === "left" ? "left" : "right"]) || 0,
            }),
      });
    };
    measure();
    const observer = new MutationObserver(measure);
    observer.observe(toaster, {
      attributes: true,
      subtree: true,
      attributeFilter: ["style", "data-removed"],
    });
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [toastCount, position]);

  if (!placement) return null;
  return (
    <button
      type="button"
      onClick={() => toast.dismiss()}
      className="cn-toast-close-all"
      style={placement}
    >
      <XIcon className="size-3.5" />
      {m.uiCloseAll()}
    </button>
  );
}

const Toaster = ({ ...props }: ToasterProps) => {
  const { resolvedTheme } = useTheme();

  return (
    <>
      <Sonner
        theme={resolvedTheme}
        className="toaster group pointer-events-none"
        icons={{
          success: <CircleCheckIcon className="size-4" />,
          info: <InfoIcon className="size-4" />,
          warning: <TriangleAlertIcon className="size-4" />,
          error: <OctagonXIcon className="size-4" />,
          loading: <Loader2Icon className="size-4 animate-spin" />,
          close: <XIcon className="size-3.5" />,
        }}
        style={
          {
            "--normal-bg": "var(--popover)",
            "--normal-text": "var(--popover-foreground)",
            "--normal-border": "var(--border)",
            "--border-radius": "var(--radius)",
          } as React.CSSProperties
        }
        expand
        gap={CLOSE_ALL_GAP}
        closeButton
        toastOptions={{
          closeButtonAriaLabel: m.uiClose(),
          classNames: {
            toast: "cn-toast pointer-events-auto",
            content: "cn-toast-content",
            title: "cn-toast-title",
            description: "cn-toast-description",
            icon: "cn-toast-icon",
          },
        }}
        {...props}
      />
      <CloseAllToasts position={props.position ?? "bottom-right"} />
    </>
  );
};

export { Toaster };
