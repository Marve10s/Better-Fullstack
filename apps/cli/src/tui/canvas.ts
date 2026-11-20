export type Rgb = readonly [number, number, number];

export const NO_COLOR = -1;
const SPACE = 32;

export function pack([red, green, blue]: Rgb): number {
  return (
    (Math.round(Math.min(255, Math.max(0, red))) << 16) |
    (Math.round(Math.min(255, Math.max(0, green))) << 8) |
    Math.round(Math.min(255, Math.max(0, blue)))
  );
}

export function unpack(color: number): Rgb {
  return [(color >> 16) & 255, (color >> 8) & 255, color & 255];
}

export function hexColor(hex: string): number {
  return Number.parseInt(hex.replace(/^#/, ""), 16);
}

export function mix(from: Rgb, to: Rgb, amount: number): Rgb {
  return [
    from[0] + (to[0] - from[0]) * amount,
    from[1] + (to[1] - from[1]) * amount,
    from[2] + (to[2] - from[2]) * amount,
  ];
}

export function displayWidth(text: string): number {
  return [...text].length;
}

export function clip(text: string, width: number): string {
  const chars = [...text];
  if (width <= 0) return "";
  return chars.length > width ? `${chars.slice(0, Math.max(0, width - 1)).join("")}…` : text;
}

export class Canvas {
  width = 0;
  height = 0;
  chars = new Uint32Array(0);
  fg = new Int32Array(0);
  bg = new Int32Array(0);

  resize(width: number, height: number): void {
    if (width === this.width && height === this.height) return;
    this.width = width;
    this.height = height;
    this.chars = new Uint32Array(width * height);
    this.fg = new Int32Array(width * height);
    this.bg = new Int32Array(width * height);
    this.clear();
  }

  clear(): void {
    this.chars.fill(SPACE);
    this.fg.fill(NO_COLOR);
    this.bg.fill(NO_COLOR);
  }

  put(x: number, y: number, char: string, fg: number, bg?: number): void {
    const column = Math.round(x);
    const row = Math.round(y);
    if (column < 0 || row < 0 || column >= this.width || row >= this.height) return;
    const index = row * this.width + column;
    this.chars[index] = char.codePointAt(0) ?? SPACE;
    this.fg[index] = fg;
    if (bg !== undefined) this.bg[index] = bg;
  }

  text(x: number, y: number, text: string, fg: number, bg?: number): number {
    let column = Math.round(x);
    for (const char of text) {
      this.put(column, y, char, fg, bg);
      column++;
    }
    return column;
  }

  fill(x: number, y: number, width: number, height: number, bg: number): void {
    for (let row = y; row < y + height; row++) {
      for (let column = x; column < x + width; column++) this.put(column, row, " ", NO_COLOR, bg);
    }
  }

  box(
    x: number,
    y: number,
    width: number,
    height: number,
    color: number,
    title?: string,
    bg?: number,
  ): void {
    this.fill(x, y, width, height, bg ?? NO_COLOR);
    for (let column = x + 1; column < x + width - 1; column++) {
      this.put(column, y, "─", color);
      this.put(column, y + height - 1, "─", color);
    }
    for (let row = y + 1; row < y + height - 1; row++) {
      this.put(x, row, "│", color);
      this.put(x + width - 1, row, "│", color);
    }
    this.put(x, y, "╭", color);
    this.put(x + width - 1, y, "╮", color);
    this.put(x, y + height - 1, "╰", color);
    this.put(x + width - 1, y + height - 1, "╯", color);
    if (title) this.text(x + 2, y, ` ${clip(title, width - 6)} `, color);
  }
}
