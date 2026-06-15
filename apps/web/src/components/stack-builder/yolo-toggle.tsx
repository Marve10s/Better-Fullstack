
import { AlertTriangle } from "lucide-react";

import type { StackState } from "@/lib/constant";

import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { m } from "@/paraglide/messages.js";

interface YoloToggleProps {
  stack: StackState;
  onToggle: (yolo: string) => void;
}

export function YoloToggle({ stack, onToggle }: YoloToggleProps) {
  const isYoloEnabled = stack.yolo === "true";

  return (
    <Tooltip delay={100}>
      <TooltipTrigger render={<div className="flex w-full items-center gap-3 p-3" />}>
        <AlertTriangle className="h-4 w-4 shrink-0" />
        <div className="flex flex-1 flex-col items-start">
          <div className="font-medium text-sm">{m.builderYoloMode()}</div>
          <div className="text-muted-foreground text-xs">
            {isYoloEnabled ? m.builderEnabled() : m.builderDisabled()}
          </div>
        </div>
        <Switch
          checked={isYoloEnabled}
          onCheckedChange={(checked) => onToggle(checked ? "true" : "false")}
          className={cn(isYoloEnabled && "data-[state=checked]:bg-destructive")}
        />
      </TooltipTrigger>
      <TooltipContent side="top" align="start" className="max-w-xs">
        <p className="text-xs">
          {m.builderYoloTooltip()}
        </p>
      </TooltipContent>
    </Tooltip>
  );
}
