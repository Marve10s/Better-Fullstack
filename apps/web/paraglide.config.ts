import type { CompilerOptions } from "@inlang/paraglide-js";

import { LOCALE_COOKIE_NAME } from "./src/lib/i18n/locales";

export const paraglideCompilerOptions = {
  project: "./project.inlang",
  outdir: "./src/paraglide",
  strategy: ["cookie", "preferredLanguage", "globalVariable", "baseLocale"],
  cookieName: LOCALE_COOKIE_NAME,
  emitGitIgnore: false,
  emitTsDeclarations: false,
  isServer: "import.meta.env.SSR",
} satisfies CompilerOptions;
