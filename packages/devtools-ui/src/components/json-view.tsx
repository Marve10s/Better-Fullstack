export function JsonView({ value, label = "Raw payload" }: { value: unknown; label?: string }) {
  return (
    <details className="group border border-border">
      <summary className="cursor-pointer select-none px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground">
        {label}
      </summary>
      <pre className="max-h-96 overflow-auto border-t border-border bg-muted/40 p-3 font-mono text-[11px] leading-snug">
        {JSON.stringify(value, null, 2)}
      </pre>
    </details>
  );
}
