"use client";

import { RefreshCw, Shuffle } from "lucide-react";

interface ActionButtonsProps {
  onReset: () => void;
  onRandom: () => void;
}

const btnBase =
  "flex flex-col items-center justify-center gap-1 rounded-md border border-border bg-fd-background py-2 text-muted-foreground transition-all hover:border-muted-foreground/30 hover:bg-muted hover:text-foreground";

export function ActionButtons({ onReset, onRandom }: ActionButtonsProps) {
  return (
    <div className="grid grid-cols-2 gap-1">
      <button type="button" onClick={onReset} title="Reset to defaults" className={btnBase}>
        <RefreshCw className="h-3.5 w-3.5" />
        <span className="font-pixel text-[9px] leading-none">Reset</span>
      </button>

      <button type="button" onClick={onRandom} title="Generate a random stack" className={btnBase}>
        <Shuffle className="h-3.5 w-3.5" />
        <span className="font-pixel text-[9px] leading-none">Random</span>
      </button>
    </div>
  );
}
