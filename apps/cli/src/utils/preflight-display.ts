import type { PreflightResult } from "@better-fullstack/template-generator";
import consola from "consola";
import pc from "picocolors";

export function displayPreflightWarnings({ warnings }: PreflightResult): void {
  if (warnings.length === 0) return;

  const count = warnings.length;
  const lines: string[] = [
    pc.bold(pc.yellow(`${count} feature${count > 1 ? "s" : ""} will not generate templates:`)),
    "",
  ];

  warnings.forEach((w, i) => {
    const selected = Array.isArray(w.selectedValue)
      ? w.selectedValue.join(", ")
      : w.selectedValue;

    lines.push(`  ${pc.yellow(`${i + 1}.`)} ${pc.bold(w.featureDisplayName)} ${pc.dim(`(${selected})`)}`);
    lines.push(`     ${w.reason}`);
    w.suggestions.forEach((s) => lines.push(`     ${pc.green("•")} ${s}`));

    if (i < count - 1) lines.push("");
  });

  consola.box({
    title: pc.yellow("Pre-flight Check"),
    message: lines.join("\n"),
    style: { borderColor: "yellow" },
  });
}
