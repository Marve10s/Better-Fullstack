import zlib from "node:zlib";

function chunk(type: string, data: Uint8Array): Buffer {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(zlib.crc32(body));
  return Buffer.concat([length, body, crc]);
}

export function encodePng(width: number, height: number, rgba: Uint8Array): Buffer {
  const header = Buffer.alloc(13);
  header.writeUInt32BE(width, 0);
  header.writeUInt32BE(height, 4);
  header.set([8, 6, 0, 0, 0], 8);
  const rows = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y++) {
    rows.set(rgba.subarray(y * width * 4, (y + 1) * width * 4), y * (width * 4 + 1) + 1);
  }
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", header),
    chunk("IDAT", zlib.deflateSync(rows)),
    chunk("IEND", new Uint8Array()),
  ]);
}

function decodeDib(
  view: DataView,
  offset: number,
): { width: number; height: number; rgba: Uint8Array } {
  const headerSize = view.getUint32(offset, true);
  const width = view.getInt32(offset + 4, true);
  const height = Math.abs(view.getInt32(offset + 8, true)) / 2;
  const bitCount = view.getUint16(offset + 14, true);
  const colorsUsed = view.getUint32(offset + 32, true);
  const paletteSize = bitCount <= 8 ? colorsUsed || 1 << bitCount : 0;
  const paletteStart = offset + headerSize;
  const pixelStart = paletteStart + paletteSize * 4;
  const xorStride = Math.ceil((width * bitCount) / 32) * 4;
  const maskStart = pixelStart + xorStride * height;
  const maskStride = Math.ceil(width / 32) * 4;
  const rgba = new Uint8Array(width * height * 4);
  let hasAlpha = false;

  for (let y = 0; y < height; y++) {
    const row = pixelStart + (height - 1 - y) * xorStride;
    for (let x = 0; x < width; x++) {
      const target = (y * width + x) * 4;
      let blue: number;
      let green: number;
      let red: number;
      let alpha = 255;
      if (bitCount === 32 || bitCount === 24) {
        const source = row + x * (bitCount / 8);
        blue = view.getUint8(source);
        green = view.getUint8(source + 1);
        red = view.getUint8(source + 2);
        if (bitCount === 32) {
          alpha = view.getUint8(source + 3);
          if (alpha > 0) hasAlpha = true;
        }
      } else {
        const bitOffset = x * bitCount;
        const byte = view.getUint8(row + (bitOffset >> 3));
        const index = (byte >> (8 - bitCount - (bitOffset & 7))) & ((1 << bitCount) - 1);
        const entry = paletteStart + index * 4;
        blue = view.getUint8(entry);
        green = view.getUint8(entry + 1);
        red = view.getUint8(entry + 2);
      }
      rgba.set([red, green, blue, alpha], target);
    }
  }

  if (!hasAlpha && maskStart + maskStride * height <= view.byteLength) {
    for (let y = 0; y < height; y++) {
      const row = maskStart + (height - 1 - y) * maskStride;
      for (let x = 0; x < width; x++) {
        const masked = (view.getUint8(row + (x >> 3)) >> (7 - (x & 7))) & 1;
        rgba[(y * width + x) * 4 + 3] = masked ? 0 : 255;
      }
    }
  }
  return { width, height, rgba };
}

export function icoToPng(bytes: Uint8Array): Uint8Array {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const count = view.getUint16(4, true);
  let best = { size: -1, offset: 0, length: 0 };
  for (let index = 0; index < count; index++) {
    const entry = 6 + index * 16;
    const size = view.getUint8(entry) || 256;
    if (size > best.size) {
      best = {
        size,
        length: view.getUint32(entry + 8, true),
        offset: view.getUint32(entry + 12, true),
      };
    }
  }
  const image = bytes.subarray(best.offset, best.offset + best.length);
  if (image[0] === 0x89 && image[1] === 0x50) return image;
  const { width, height, rgba } = decodeDib(view, best.offset);
  return encodePng(width, height, rgba);
}
