import { Outlet, HeadContent, Scripts, createRootRoute, Link } from "@tanstack/react-router";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { lazy, Suspense, type ReactNode, useSyncExternalStore } from "react";

import { Navbar } from "@/components/navbar";
import Providers from "@/components/providers";
import { isBrowserTelemetryEnabled, subscribeBrowserTelemetry } from "@/lib/product-analytics";
import { NOINDEX_ROBOTS } from "@/lib/robots";
import {
  DEFAULT_OG_IMAGE_ALT,
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_URL,
  DEFAULT_OG_IMAGE_WIDTH,
  DEFAULT_ROBOTS,
  DEFAULT_X_IMAGE_URL,
  SITE_NAME,
  canonicalUrl,
  getDefaultDescription,
  getSiteJsonLd,
  ogLocale,
} from "@/lib/seo";
import { THEME_STORAGE_KEY } from "@/lib/theme";
import { m } from "@/paraglide/messages.js";
import { getLocale, getTextDirection } from "@/paraglide/runtime.js";
import "@/styles/global.css";

const DARK_THEME_COLOR = "#050505";
const LIGHT_THEME_COLOR = "#ffffff";
const THEME_INIT_SCRIPT = `
(() => {
  try {
    const stored = window.localStorage.getItem("${THEME_STORAGE_KEY}");
    const theme = stored === "light" || stored === "dark" || stored === "system" ? stored : "system";
    const resolved =
      theme === "system"
        ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
        : theme;
    const root = document.documentElement;
    root.classList.toggle("dark", resolved === "dark");
    root.dataset.theme = resolved;
    root.style.colorScheme = resolved;
    root.style.backgroundColor = resolved === "dark" ? "${DARK_THEME_COLOR}" : "${LIGHT_THEME_COLOR}";
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        "content",
        resolved === "dark" ? "${DARK_THEME_COLOR}" : "${LIGHT_THEME_COLOR}",
      );
    }
  } catch {}
})();
`;
const themeInitMarkup = { __html: THEME_INIT_SCRIPT };
const ERROR_PAGE_TITLE = `Temporarily Unavailable | ${SITE_NAME}`;
const ERROR_PAGE_DESCRIPTION =
  "Better Fullstack could not load this page. Please try again or return to the homepage.";

const SponsorButton = lazy(async () => {
  const mod = await import("@/components/sponsor-button");
  return { default: mod.SponsorButton };
});

const ChangelogWidget = lazy(async () => {
  const mod = await import("@/components/changelog-widget");
  return { default: mod.ChangelogWidget };
});

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="font-bold text-4xl text-foreground">404</h1>
      <p className="text-muted-foreground">{m.notFoundText()}</p>
      <Link
        to="/"
        className="rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
      >
        {m.goHome()}
      </Link>
    </div>
  );
}

function RootErrorComponent() {
  return (
    <html lang="en" className="font-sans">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{ERROR_PAGE_TITLE}</title>
        <meta name="description" content={ERROR_PAGE_DESCRIPTION} />
        <meta name="robots" content={NOINDEX_ROBOTS} />
        <meta name="googlebot" content={NOINDEX_ROBOTS} />
        <meta name="theme-color" content={DARK_THEME_COLOR} />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
      </head>
      <body className="bg-background text-foreground">
        <main className="flex min-h-svh items-center justify-center p-6">
          <section className="w-full max-w-lg rounded-xl border border-border bg-card p-8 shadow-sm">
            <p className="mb-3 font-mono text-muted-foreground text-sm">{SITE_NAME}</p>
            <h1 className="font-semibold text-3xl tracking-tight">This page failed to load.</h1>
            <p className="mt-3 text-muted-foreground">
              The failure is temporary. Try the page again or return to the homepage.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <form method="get">
                <button
                  type="submit"
                  className="rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
                >
                  Try again
                </button>
              </form>
              <a
                href="/"
                className="rounded-md border border-border px-4 py-2 font-medium text-sm transition-colors hover:bg-muted"
              >
                Go home
              </a>
            </div>
          </section>
        </main>
        <Scripts />
      </body>
    </html>
  );
}

export const Route = createRootRoute({
  errorComponent: RootErrorComponent,
  notFoundComponent: NotFoundComponent,
  head: () => {
    const description = getDefaultDescription();
    const locale = getLocale();

    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: SITE_NAME },
        {
          name: "description",
          content: description,
        },
        { name: "robots", content: DEFAULT_ROBOTS },
        { name: "googlebot", content: DEFAULT_ROBOTS },
        { name: "theme-color", content: "#050505" },
        { name: "application-name", content: SITE_NAME },
        {
          name: "keywords",
          content:
            "fullstack, CLI, scaffolding, boilerplate, starter kit, project generator, TypeScript, Rust, Python, Go, Next.js, Nuxt, SvelteKit, Astro, Angular, Solid, React, Vite, Hono, Elysia, Express, FastAPI, Django, Axum, Actix, Gin, Drizzle, Prisma, tRPC, oRPC, Better-Auth, Convex, Turborepo, monorepo, auth, payments, AI, deploy, Docker, Tauri, Expo, React Native, create-t3-app alternative",
        },
        { property: "og:title", content: SITE_NAME },
        {
          property: "og:description",
          content: description,
        },
        { property: "og:url", content: canonicalUrl("/") },
        { property: "og:image", content: DEFAULT_OG_IMAGE_URL },
        { property: "og:image:alt", content: DEFAULT_OG_IMAGE_ALT },
        { property: "og:image:width", content: String(DEFAULT_OG_IMAGE_WIDTH) },
        { property: "og:image:height", content: String(DEFAULT_OG_IMAGE_HEIGHT) },
        { property: "og:site_name", content: SITE_NAME },
        { property: "og:locale", content: ogLocale(locale) },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: SITE_NAME },
        {
          name: "twitter:description",
          content: description,
        },
        { name: "twitter:image", content: DEFAULT_X_IMAGE_URL },
        { name: "twitter:image:alt", content: DEFAULT_OG_IMAGE_ALT },
      ],
      links: [
        { rel: "icon", href: "/favicon.ico", sizes: "32x32" },
        { rel: "icon", href: "/favicon/favicon.svg", type: "image/svg+xml" },
        { rel: "icon", href: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { rel: "icon", href: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { rel: "icon", href: "/favicon/favicon-48x48.png", sizes: "48x48", type: "image/png" },
        { rel: "icon", href: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
        { rel: "apple-touch-icon", href: "/favicon/apple-touch-icon.png", sizes: "180x180" },
        { rel: "manifest", href: "/favicon/site.webmanifest" },
        {
          rel: "preload",
          href: "/fonts/Geist-Variable.woff2",
          as: "font",
          type: "font/woff2",
          crossOrigin: "anonymous",
        },
        {
          rel: "preload",
          href: "/fonts/GeistMono-Variable.woff2",
          as: "font",
          type: "font/woff2",
          crossOrigin: "anonymous",
        },
        // Caveat is loaded as a head link (not a CSS @import) so it doesn't
        // block the main stylesheet from applying.
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Figtree:wght@600;700&display=swap",
        },
      ],
    };
  },
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Navbar />
      <Outlet />
      <Suspense fallback={null}>
        <ChangelogWidget />
        <SponsorButton />
      </Suspense>
    </RootDocument>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  const locale = getLocale();
  const textDirection = getTextDirection(locale);
  const siteJsonLdMarkup = { __html: JSON.stringify(getSiteJsonLd()) };

  return (
    <html lang={locale} dir={textDirection} className="font-sans" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={themeInitMarkup} />
        <HeadContent />
        <script type="application/ld+json" dangerouslySetInnerHTML={siteJsonLdMarkup} />
      </head>
      <body className="bg-background text-foreground">
        <Providers>{children}</Providers>
        <BrowserAnalytics />
        <Scripts />
      </body>
    </html>
  );
}

function BrowserAnalytics() {
  const enabled = useSyncExternalStore(
    subscribeBrowserTelemetry,
    isBrowserTelemetryEnabled,
    () => false,
  );
  return enabled ? (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  ) : null;
}
