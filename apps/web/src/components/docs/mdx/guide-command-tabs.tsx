import type { ReactNode } from "react";

type GuideCommand = {
  label: ReactNode;
  command: string;
  description?: ReactNode;
};

const EMPTY_COMMANDS: GuideCommand[] = [];

export function GuideCommandTabs({
  title,
  commands = EMPTY_COMMANDS,
  children,
}: {
  title?: ReactNode;
  commands?: GuideCommand[];
  children?: ReactNode;
}) {
  return (
    <section className="not-prose my-5 overflow-hidden rounded-md border bg-[var(--code-bg)] border-[var(--code-border)]">
      {title ? (
        <div className="border-b border-[var(--code-border)] px-4 py-2 font-mono text-[0.68rem] text-[#8b949e] uppercase tracking-[0.06em]">
          {title}
        </div>
      ) : null}
      {commands.length > 0 ? (
        <div className="divide-y divide-[var(--code-border)]">
          {commands.map((entry) => (
            <div key={`${String(entry.label)}-${entry.command}`}>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 px-4 pt-3">
                <span className="font-mono text-[#e6edf3] text-xs">{entry.label}</span>
                {entry.description ? <span className="text-[#8b949e] text-xs">{entry.description}</span> : null}
              </div>
              <pre className="overflow-x-auto px-4 py-3 text-[0.82rem] leading-relaxed">
                <code className="font-mono text-[#e6edf3]">{entry.command}</code>
              </pre>
            </div>
          ))}
        </div>
      ) : null}
      {children ? <div className="px-4 py-3 text-[#e6edf3] text-sm">{children}</div> : null}
    </section>
  );
}
