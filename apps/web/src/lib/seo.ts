import { m } from "@/paraglide/messages.js";

import {
  ECOSYSTEM_NAMES,
  OPTION_COUNT_LABEL,
  SOFTWARE_APPLICATION_COUNTS,
} from "./project-stats";

export const SITE_NAME = "Better Fullstack";
export const SITE_URL = "https://better-fullstack.dev";
export const DEFAULT_OG_IMAGE_URL = `${SITE_URL}/og/better-fullstack-terminal-preview-1200x630.png`;
export const DEFAULT_X_IMAGE_URL = `${SITE_URL}/og/better-fullstack-terminal-preview-x-1200x630.png`;
export const EDIT_AND_RUN_OG_IMAGE_URL = `${SITE_URL}/og/edit-and-run-1200x630.png`;
export const DOWNLOAD_ZIP_OG_IMAGE_URL = `${SITE_URL}/og/download-zip-1200x630.png`;
export const RUN_BEFORE_CLONE_OG_IMAGE_URL = `${SITE_URL}/og/run-before-you-clone-1200x630.png`;
export const DEFAULT_OG_IMAGE_ALT =
  "Better Fullstack terminal-style preview showing CLI scaffolding output";
export const DEFAULT_OG_IMAGE_WIDTH = 1200;
export const DEFAULT_OG_IMAGE_HEIGHT = 630;

const ECOSYSTEM_OG_IMAGES: Record<string, string> = {
  typescript: `${SITE_URL}/og/stack-typescript-1200x630.png`,
  "react-native": `${SITE_URL}/og/stack-react-native-1200x630.png`,
  rust: `${SITE_URL}/og/stack-rust-1200x630.png`,
  python: `${SITE_URL}/og/stack-python-1200x630.png`,
  go: `${SITE_URL}/og/stack-go-1200x630.png`,
  java: `${SITE_URL}/og/stack-java-1200x630.png`,
  elixir: `${SITE_URL}/og/stack-elixir-1200x630.png`,
  dotnet: `${SITE_URL}/og/stack-dotnet-1200x630.png`,
  "multi-ecosystem": `${SITE_URL}/og/stack-multi-ecosystem-1200x630.png`,
};

export function getEcosystemOgImage(ecosystem: string) {
  return ECOSYSTEM_OG_IMAGES[ecosystem] ?? DEFAULT_OG_IMAGE_URL;
}

export const DEFAULT_DESCRIPTION =
  `Scaffold production-ready fullstack apps in seconds. Pick your stack from ${OPTION_COUNT_LABEL} options across ${ECOSYSTEM_NAMES.join(", ")} — frameworks, databases, auth, payments, AI, and deployment — all wired together by one CLI.`;

export const DEFAULT_ROBOTS =
  "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1";

export function canonicalUrl(path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalized, SITE_URL).toString();
}

type PageHeadOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  twitterImage?: string;
  imageAlt?: string;
  ogType?: "article" | "website";
  robots?: string;
};

export function buildPageHead({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE_URL,
  twitterImage = DEFAULT_X_IMAGE_URL,
  imageAlt = DEFAULT_OG_IMAGE_ALT,
  ogType = "website",
  robots = DEFAULT_ROBOTS,
}: PageHeadOptions) {
  const url = canonicalUrl(path);

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: robots },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: ogType },
      { property: "og:url", content: url },
      { property: "og:image", content: image },
      { property: "og:image:alt", content: imageAlt },
      { property: "og:image:width", content: String(DEFAULT_OG_IMAGE_WIDTH) },
      { property: "og:image:height", content: String(DEFAULT_OG_IMAGE_HEIGHT) },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: twitterImage },
      { name: "twitter:image:alt", content: imageAlt },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export function getDefaultDescription() {
  return m.siteDefaultDescription({
    optionCount: OPTION_COUNT_LABEL,
    ecosystems: ECOSYSTEM_NAMES.join(", "),
  });
}

export function ogLocale(locale: string) {
  const locales: Record<string, string> = {
    en: "en_US",
    es: "es_ES",
    zh: "zh_CN",
    ja: "ja_JP",
    ko: "ko_KR",
    "zh-Hant": "zh_TW",
    de: "de_DE",
    fr: "fr_FR",
    uk: "uk_UA",
  };
  return locales[locale] ?? "en_US";
}

export function getSiteJsonLd() {
  const description = getDefaultDescription();

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/favicon/favicon-96x96.png`,
          width: 96,
          height: 96,
        },
        founder: {
          "@type": "Person",
          name: "Ibrahim Elkamali",
          url: "https://elkamali.dev",
        },
        sameAs: [
          "https://github.com/Marve10s/Better-Fullstack",
          "https://www.npmjs.com/package/create-better-fullstack",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        alternateName: "Better-Fullstack",
        url: SITE_URL,
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}/#software`,
        name: SITE_NAME,
        alternateName: "create-better-fullstack",
        applicationCategory: "DeveloperApplication",
        applicationSubCategory: "CLI Scaffolding Tool",
        operatingSystem: "macOS, Windows, Linux",
        url: SITE_URL,
        downloadUrl: "https://www.npmjs.com/package/create-better-fullstack",
        installUrl: "https://www.npmjs.com/package/create-better-fullstack",
        license: "https://opensource.org/licenses/MIT",
        isAccessibleForFree: true,
        description,
        programmingLanguage: ECOSYSTEM_NAMES,
        featureList: [
          `${SOFTWARE_APPLICATION_COUNTS.frontendFrameworks} frontend frameworks`,
          `${SOFTWARE_APPLICATION_COUNTS.backendFrameworks} backend frameworks`,
          `${SOFTWARE_APPLICATION_COUNTS.databases} databases`,
          `${SOFTWARE_APPLICATION_COUNTS.orms} ORMs`,
          `${SOFTWARE_APPLICATION_COUNTS.authProviders} auth providers`,
          `${SOFTWARE_APPLICATION_COUNTS.paymentIntegrations} payment integrations`,
          `${SOFTWARE_APPLICATION_COUNTS.aiIntegrations} AI integrations`,
          `${SOFTWARE_APPLICATION_COUNTS.apiOptions} type-safe API options`,
          "Visual web stack builder",
          "Monorepo support via Turborepo",
          "Desktop apps via Tauri",
          "Mobile apps via Expo / React Native",
          "PWA support",
          `${SOFTWARE_APPLICATION_COUNTS.deploymentTargets} deployment targets`,
        ],
        image: DEFAULT_OG_IMAGE_URL,
        screenshot: DEFAULT_OG_IMAGE_URL,
        author: { "@id": `${SITE_URL}/#organization` },
        sourceOrganization: { "@id": `${SITE_URL}/#organization` },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: "https://www.npmjs.com/package/create-better-fullstack",
        },
        sameAs: [
          "https://github.com/Marve10s/Better-Fullstack",
          "https://www.npmjs.com/package/create-better-fullstack",
        ],
      },
    ],
  };
}
