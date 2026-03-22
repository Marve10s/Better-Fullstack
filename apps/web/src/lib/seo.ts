export const SITE_NAME = "Better Fullstack";
export const SITE_URL = "https://better-fullstack.dev";
export const DEFAULT_OG_IMAGE_URL = `${SITE_URL}/og/better-fullstack-terminal-preview-1200x630.png`;
export const DEFAULT_X_IMAGE_URL = `${SITE_URL}/og/better-fullstack-terminal-preview-x-1200x630.png`;
export const DEFAULT_OG_IMAGE_ALT =
  "Better Fullstack terminal-style preview showing CLI scaffolding output";
export const DEFAULT_OG_IMAGE_WIDTH = 1200;
export const DEFAULT_OG_IMAGE_HEIGHT = 630;

export const DEFAULT_DESCRIPTION =
  "Scaffold production-ready fullstack apps in seconds. Pick your stack from 270+ options across TypeScript, Rust, Python, and Go — frameworks, databases, auth, payments, AI, and deployment — all wired together by one CLI.";

export const DEFAULT_ROBOTS =
  "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1";

export function canonicalUrl(path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalized, SITE_URL).toString();
}

export const siteJsonLd = {
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
      description: DEFAULT_DESCRIPTION,
      programmingLanguage: ["TypeScript", "Rust", "Python", "Go"],
      featureList: [
        "15 frontend frameworks",
        "17 backend frameworks",
        "6 databases",
        "13 ORMs",
        "7 auth providers",
        "5 payment integrations",
        "12 AI integrations",
        "7 type-safe API options",
        "Visual web stack builder",
        "Monorepo support via Turborepo",
        "Desktop apps via Tauri",
        "Mobile apps via Expo / React Native",
        "PWA support",
        "5 deployment targets",
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
