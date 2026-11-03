export const TUI_BACKGROUND = "0d1117";
export const ICON_BADGE = "e6edf3";
export const MIN_ICON_CONTRAST = 3;

function channel(value: number): number {
  const srgb = value / 255;
  return srgb <= 0.03928 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4;
}

export function parseHex(hex: string): [number, number, number] {
  const value = hex.replace(/^#/, "");
  return [0, 2, 4].map((offset) => Number.parseInt(value.slice(offset, offset + 2), 16)) as [
    number,
    number,
    number,
  ];
}

export function toHex([red, green, blue]: readonly number[]): string {
  return [red, green, blue]
    .map((value) =>
      Math.round(Math.min(255, Math.max(0, value ?? 0)))
        .toString(16)
        .padStart(2, "0"),
    )
    .join("");
}

export function relativeLuminance(hex: string): number {
  const [red, green, blue] = parseHex(hex).map(channel);
  return 0.2126 * (red ?? 0) + 0.7152 * (green ?? 0) + 0.0722 * (blue ?? 0);
}

export function contrastRatio(first: string, second: string): number {
  const a = relativeLuminance(first);
  const b = relativeLuminance(second);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

export function needsBadge(inkHex: string): boolean {
  return contrastRatio(inkHex, TUI_BACKGROUND) < MIN_ICON_CONTRAST;
}

export function iconBackdrop(badge: boolean): string {
  return badge ? ICON_BADGE : TUI_BACKGROUND;
}

export function inkColor(rgba: Uint8Array | readonly number[]): string {
  let weight = 0;
  const linear = [0, 0, 0];
  for (let index = 0; index + 3 < rgba.length; index += 4) {
    const alpha = (rgba[index + 3] ?? 0) / 255;
    if (alpha === 0) continue;
    weight += alpha;
    for (let offset = 0; offset < 3; offset++) {
      linear[offset] = (linear[offset] ?? 0) + channel(rgba[index + offset] ?? 0) * alpha;
    }
  }
  if (weight === 0) return TUI_BACKGROUND;
  return toHex(
    linear.map((value) => {
      const average = value / weight;
      const srgb = average <= 0.0031308 ? average * 12.92 : 1.055 * average ** (1 / 2.4) - 0.055;
      return srgb * 255;
    }),
  );
}
