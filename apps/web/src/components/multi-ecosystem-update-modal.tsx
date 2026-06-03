import { ArrowRight } from "lucide-react";
import { type CSSProperties, useCallback, useEffect, useState } from "react";

import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

const MULTI_ECOSYSTEM_UPDATE_STORAGE_KEY =
  "better-fullstack.update-modal.multi-ecosystem.v1";

const RELEASE_DATE = "Jun 3, 2026";

// Aurora mesh for the hero panel — magenta top-left → purple core → warm
// ember bottom-right over a near-black base.
const heroGradientStyle: CSSProperties = {
  backgroundImage: [
    "radial-gradient(135% 120% at 6% 0%, rgba(206,71,123,0.92) 0%, rgba(206,71,123,0) 42%)",
    "radial-gradient(130% 125% at 100% 100%, rgba(216,98,55,0.85) 0%, rgba(216,98,55,0) 48%)",
    "radial-gradient(120% 140% at 72% 26%, rgba(78,46,128,0.55) 0%, rgba(78,46,128,0) 72%)",
    "linear-gradient(135deg, #241036 0%, #150e22 55%, #0d0a13 100%)",
  ].join(","),
};

export function MultiEcosystemUpdateModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (window.navigator.webdriver) {
      return;
    }

    try {
      if (window.localStorage.getItem(MULTI_ECOSYSTEM_UPDATE_STORAGE_KEY) === null) {
        setOpen(true);
      }
    } catch {
      setOpen(false);
    }
  }, []);

  const markSeen = useCallback(() => {
    try {
      window.localStorage.setItem(MULTI_ECOSYSTEM_UPDATE_STORAGE_KEY, "seen");
    } catch {}
  }, []);

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (!nextOpen) {
        markSeen();
      }
      setOpen(nextOpen);
    },
    [markSeen],
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="block gap-0 overflow-visible border-0 bg-transparent p-0 shadow-none sm:max-w-md"
      >
        <Card className="max-h-screen w-full gap-0 overflow-y-auto rounded-3xl p-4 text-left sm:p-5">
          {/* Hero panel */}
          <div
            className="aspect-video w-full overflow-hidden rounded-2xl ring-1 ring-white/5 ring-inset"
            style={heroGradientStyle}
            aria-hidden="true"
          />

          <div className="flex flex-col pt-5">
            <span className="text-muted-foreground text-sm">{RELEASE_DATE}</span>

            <DialogTitle className="mt-3 text-balance font-bold font-mono text-3xl text-foreground leading-tight sm:text-4xl">
              Multi-ecosystem support is here
            </DialogTitle>

            <DialogDescription className="mt-2 text-base text-muted-foreground leading-relaxed">
              Build one project from multiple language ecosystems — choose a frontend, backend,
              database, and mobile layer independently, then generate the stack locally through the
              CLI.
            </DialogDescription>

            <a
              href="/new?mode=multi"
              onClick={markSeen}
              className="border-beam group relative mt-5 inline-flex w-fit items-center rounded-lg border border-transparent bg-[linear-gradient(90deg,#C6E853,#2f7df4,#C6E853)] bg-[length:200%_100%] px-5 py-2.5 font-medium text-[#0c0c0e] text-sm shadow-[0_0_24px_rgba(198,232,83,0.22)] transition-transform"
            >
              <span className="relative z-[2] inline-flex items-center gap-2">
                Try multi mode
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </a>
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
