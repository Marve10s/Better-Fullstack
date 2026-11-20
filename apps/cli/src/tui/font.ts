import type { Canvas } from "@/tui/canvas";

const GLYPHS: Record<string, string> = {
  A: ".###. #...# ##### #...# #...#",
  B: "####. #...# ####. #...# ####.",
  C: ".#### #.... #.... #.... .####",
  D: "####. #...# #...# #...# ####.",
  E: "##### #.... ####. #.... #####",
  F: "##### #.... ####. #.... #....",
  G: ".#### #.... #..## #...# .###.",
  H: "#...# #...# ##### #...# #...#",
  I: "##### ..#.. ..#.. ..#.. #####",
  J: "..### ...#. ...#. #..#. .##..",
  K: "#...# #..#. ###.. #..#. #...#",
  L: "#.... #.... #.... #.... #####",
  M: "#...# ##.## #.#.# #...# #...#",
  N: "#...# ##..# #.#.# #..## #...#",
  O: ".###. #...# #...# #...# .###.",
  P: "####. #...# ####. #.... #....",
  Q: ".###. #...# #.#.# #..#. .##.#",
  R: "####. #...# ####. #..#. #...#",
  S: ".#### #.... .###. ....# ####.",
  T: "##### ..#.. ..#.. ..#.. ..#..",
  U: "#...# #...# #...# #...# .###.",
  V: "#...# #...# #...# .#.#. ..#..",
  W: "#...# #...# #.#.# ##.## #...#",
  X: "#...# .#.#. ..#.. .#.#. #...#",
  Y: "#...# .#.#. ..#.. ..#.. ..#..",
  Z: "##### ...#. ..#.. .#... #####",
  "0": ".###. #..## #.#.# ##..# .###.",
  "1": "..#.. .##.. ..#.. ..#.. .###.",
  "2": "####. ....# .###. #.... #####",
  "3": "####. ....# .###. ....# ####.",
  "4": "#...# #...# ##### ....# ....#",
  "5": "##### #.... ####. ....# ####.",
  "6": ".###. #.... ####. #...# .###.",
  "7": "##### ....# ...#. ..#.. ..#..",
  "8": ".###. #...# .###. #...# .###.",
  "9": ".###. #...# .#### ....# .###.",
  "-": "..... ..... .###. ..... .....",
  ".": "..... ..... ..... ..... ..#..",
  "/": "....# ...#. ..#.. .#... #....",
  "+": "..... ..#.. .###. ..#.. .....",
  "&": ".##.. #..#. .##.# #..#. .##.#",
  "?": ".###. #...# ..##. ..... ..#..",
  " ": "..... ..... ..... ..... .....",
};

const ROWS = Object.fromEntries(
  Object.entries(GLYPHS).map(([char, rows]) => [char, rows.split(" ")]),
);

export const BIG_CHAR_WIDTH = 6;
export const BIG_TEXT_HEIGHT = 3;

export function hash(x: number, y: number, seed = 0): number {
  let value = (x * 374761393 + y * 668265263 + seed * 1274126177) | 0;
  value = Math.imul(value ^ (value >>> 13), 1274126177);
  return ((value ^ (value >>> 16)) >>> 0) / 4294967296;
}

export function bigTextFits(text: string, width: number): boolean {
  return text.length * BIG_CHAR_WIDTH - 1 <= width;
}

export function bigText(
  canvas: Canvas,
  x: number,
  y: number,
  text: string,
  colors: readonly [number, number, number],
  resolve: number,
  noise: { frame: number; color: number },
): void {
  [...text.toUpperCase()].forEach((char, index) => {
    const glyph = ROWS[char] ?? ROWS[" "];
    if (!glyph) return;
    for (let column = 0; column < 5; column++) {
      for (let row = 0; row < BIG_TEXT_HEIGHT; row++) {
        const top = glyph[row * 2]?.[column] === "#";
        const bottom = row < 2 && glyph[row * 2 + 1]?.[column] === "#";
        const cx = x + index * BIG_CHAR_WIDTH + column;
        const cy = y + row;
        if (resolve >= 1 || hash(cx, cy, 7) < resolve) {
          const char = top && bottom ? "█" : top ? "▀" : bottom ? "▄" : "";
          if (char) canvas.put(cx, cy, char, colors[row] ?? colors[0]);
        } else {
          const flicker = hash(cx, cy, noise.frame >> 1);
          if (flicker < 0.5)
            canvas.put(cx, cy, "░▒▓▀▄"[Math.floor(flicker * 10) % 5] ?? "░", noise.color);
        }
      }
    }
  });
}
