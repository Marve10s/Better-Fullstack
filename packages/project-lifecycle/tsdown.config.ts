import { defineConfig } from "tsdown";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/contracts/lifecycle.ts",
    "src/crypto/hash.ts",
    "src/recovery/management.ts",
    "src/recovery/transaction.ts",
    "src/review/token.ts",
  ],
  format: ["esm"],
  clean: true,
  shims: true,
  outDir: "dist",
  dts: true,
});
