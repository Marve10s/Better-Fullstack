import { Iphone } from "@/components/ui/iphone";
import { Safari } from "@/components/ui/safari";
import { TechIcon } from "@/components/ui/tech-icon";
import { cn } from "@/lib/platform/utils";
import { TECH_OPTIONS } from "@/lib/stack/constant";

type ComposerPreviewRole = "frontend" | "mobile" | "backend" | "database";

const ALL_TECH_OPTIONS = Object.values(TECH_OPTIONS).flat();
const findTechOption = (toolId: string) => ALL_TECH_OPTIONS.find((option) => option.id === toolId);

/** Keyframe windows are defined in global.css as composer-art-stage-1..5. */
const stage = (index: 1 | 2 | 3 | 4 | 5) => `composer-art-stage composer-art-stage-${index}`;

function Dots() {
  return (
    <span className="flex gap-1" aria-hidden="true">
      <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/35" />
      <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/35" />
      <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/35" />
    </span>
  );
}

function ToolBadge({ toolId, toolName }: { toolId: string; toolName: string }) {
  return (
    <span className="absolute right-0 bottom-3 z-20 flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background shadow-md">
      <TechIcon
        techId={toolId}
        icon={findTechOption(toolId)?.icon}
        name={toolName}
        className="h-4 w-4"
      />
    </span>
  );
}

function FrontendPreview() {
  return (
    <Safari url="localhost:3000" mode="simple" className="composer-art w-full drop-shadow-xl">
      <div className="h-full w-full bg-background p-[4%]">
        <div className={cn("flex items-center gap-[2%]", stage(1))}>
          <span className="h-[6px] w-[18%] rounded bg-foreground/25" />
          <span className="ml-auto h-[6px] w-[8%] rounded bg-foreground/12" />
          <span className="h-[6px] w-[8%] rounded bg-foreground/12" />
        </div>
        <div className="mt-[4%] grid grid-cols-3 gap-[3%]">
          <span className={cn("aspect-[4/3] rounded-md bg-muted", stage(2))} />
          <span className={cn("aspect-[4/3] rounded-md bg-muted", stage(3))} />
          <span className={cn("aspect-[4/3] rounded-md bg-muted", stage(4))} />
        </div>
        <span className={cn("mt-[4%] block h-[6px] w-3/4 rounded bg-foreground/12", stage(5))} />
        <span className={cn("mt-[2.5%] block h-[6px] w-1/2 rounded bg-foreground/12", stage(5))} />
      </div>
    </Safari>
  );
}

function MobilePreview() {
  return (
    <Iphone className="composer-art w-[10rem] drop-shadow-xl sm:w-[11rem]">
      <div className="h-full w-full overflow-hidden bg-background px-[8%] pt-[14%]">
        <div className="composer-art-scroll space-y-[6%]">
          <div className="flex items-center gap-[5%]">
            <span className="h-4 w-4 rounded-md bg-foreground/15" />
            <span className="h-[5px] flex-1 rounded bg-foreground/15" />
          </div>
          <span className="block aspect-[16/10] rounded-lg bg-muted" />
          <div className="grid grid-cols-2 gap-[6%]">
            <span className="aspect-square rounded-lg bg-muted" />
            <span className="aspect-square rounded-lg bg-muted" />
          </div>
          <span className="block aspect-[16/7] rounded-lg bg-muted" />
          <span className="block aspect-[16/10] rounded-lg bg-muted" />
          <div className="grid grid-cols-2 gap-[6%]">
            <span className="aspect-square rounded-lg bg-muted" />
            <span className="aspect-square rounded-lg bg-muted" />
          </div>
          <span className="block aspect-[16/7] rounded-lg bg-muted" />
        </div>
      </div>
    </Iphone>
  );
}

function BackendPreview({ toolName }: { toolName?: string }) {
  return (
    <div
      className="composer-art w-full overflow-hidden rounded-xl border border-border bg-background font-mono text-[11px] leading-6 text-muted-foreground shadow-md"
      aria-hidden="true"
    >
      <div className="flex items-center gap-1 border-b border-border/70 bg-muted/40 px-3 py-2.5">
        <Dots />
        <span className="ml-2 truncate text-[9px] uppercase tracking-wide">
          {toolName ?? "server"}
        </span>
      </div>
      <div className="px-4 py-3">
        <div className={stage(1)}>
          <span className="text-foreground/70">$</span> dev
        </div>
        <div className={stage(2)}>
          listening on <span className="text-foreground/80">:3000</span>
        </div>
        <div className={stage(3)}>
          GET /health <span className="text-[#8fbf2a]">200</span>
        </div>
        <div className={stage(4)}>
          POST /api/items <span className="text-[#8fbf2a]">201</span>
        </div>
        <div className={stage(5)}>
          GET /api/items <span className="text-[#8fbf2a]">200</span>
          <span className="composer-art-caret ml-0.5 inline-block h-3 w-1.5 translate-y-0.5 bg-foreground/60" />
        </div>
      </div>
    </div>
  );
}

function DatabasePreview() {
  return (
    <div
      className="composer-art relative w-full overflow-hidden rounded-xl border border-border bg-background font-mono text-[10px] text-muted-foreground shadow-md [--composer-row:1.875rem]"
      aria-hidden="true"
    >
      <span className="composer-art-sweep pointer-events-none absolute inset-x-0 h-[var(--composer-row)] bg-[#C6E853]/15" />
      <div className="grid grid-cols-[1.5rem_1fr_1fr_1fr] gap-px bg-border/40">
        {["id", "name", "email", "created"].map((label) => (
          <span key={label} className="bg-muted/60 px-1.5 py-1.5 font-semibold">
            {label}
          </span>
        ))}
        {([1, 2, 3, 4, 5] as const).map((row) => {
          const cell = cn("bg-background px-1.5 py-2", stage(row));
          return (
            <div key={row} className="contents">
              <span className={cell}>{row}</span>
              <span className={cell}>
                <span className="block h-1.5 w-3/4 rounded bg-foreground/15" />
              </span>
              <span className={cell}>
                <span className="block h-1.5 w-full rounded bg-foreground/10" />
              </span>
              <span className={cell}>
                <span className="block h-1.5 w-1/2 rounded bg-foreground/10" />
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Looping mockup of what each application role becomes; sits on the preview stage below the cards. */
export function ComposerRolePreview({
  role,
  selected,
  toolId,
  toolName,
}: {
  role: ComposerPreviewRole;
  selected: boolean;
  toolId?: string;
  toolName?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex h-96 items-end justify-center transition-all duration-300",
        role === "mobile" ? "-mb-20" : "pb-6",
        !selected && "opacity-30 saturate-0",
      )}
      aria-hidden="true"
    >
      {role === "frontend" && <FrontendPreview />}
      {role === "mobile" && <MobilePreview />}
      {role === "backend" && <BackendPreview toolName={toolName} />}
      {role === "database" && <DatabasePreview />}
      {toolId && toolName && <ToolBadge toolId={toolId} toolName={toolName} />}
    </div>
  );
}
