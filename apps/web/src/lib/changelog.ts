export type ChangelogRelease = {
  version: string;
  publishedAt: string;
  displayDate: string;
  isLatest?: boolean;
  href: string;
  title?: string;
  summary?: string;
  highlights?: string[];
  image?: {
    src: string;
    alt: string;
    credit: string;
    creditHref: string;
  };
};

const RELEASE_BASE_URL = "https://github.com/Marve10s/Better-Fullstack/releases/tag";

export const changelogReleases: ChangelogRelease[] = [
  {
    version: "v1.6.3",
    publishedAt: "2026-05-01T23:00:49Z",
    displayDate: "May 1, 2026",
    isLatest: true,
    href: `${RELEASE_BASE_URL}/v1.6.3`,
    title: "AI CLI joins the TypeScript stack",
    summary:
      "This release adds ai-cli as a first-class TypeScript AI tooling option, wires it through generated app scripts and docs, and ships curated presets that prove the integration across common web stacks.",
    highlights: [
      "Added the ai-cli option across the TypeScript schema, CLI prompts, web builder, dependency generation, root package scripts, README output, and API key guidance.",
      "Introduced ready-to-run ai-cli presets for a Next.js agent workbench, a React Router plus Hono stack, and a frontend-only React Vite lab.",
      "Hardened generated TypeScript templates around Better Auth dashboards, env typing, Drizzle imports, React Router metadata, and Biome/shadcn lint behavior.",
    ],
    image: {
      src: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=900&auto=format&fit=crop",
      alt: "A developer workstation with code on a monitor",
      credit: "Unsplash",
      creditHref:
        "https://unsplash.com/photos/turned-on-monitor-displaying-programming-codes-2EJCSULRwC8",
    },
  },
  {
    version: "v1.6.2",
    publishedAt: "2026-04-29T18:24:21Z",
    displayDate: "Apr 29, 2026",
    href: `${RELEASE_BASE_URL}/v1.6.2`,
    title: "Docs shipped, Java leveled up",
    summary:
      "The latest release adds the new docs experience, expands Java into a fuller Spring Boot generation path, and hardens generator, smoke, and release coverage around the larger stack surface.",
    highlights: [
      "New documentation pages for getting started, CLI usage, MCP, AI-agent docs, ecosystem guides, and option references.",
      "Expanded Java support with Liquibase, Springdoc OpenAPI, Lombok, MapStruct, Caffeine, AssertJ, REST Assured, WireMock, Awaitility, ArchUnit, jqwik, and broader Testcontainers coverage.",
      "More release safety through broader Java tests, smoke fixes, dependency refreshes, and a hardened npm publish path.",
    ],
    image: {
      src: "https://images.unsplash.com/photo-1777026050794-a5e4ef7cd254?q=80&w=900&auto=format&fit=crop",
      alt: "A white bullet train passing a mountain",
      credit: "Unsplash",
      creditHref:
        "https://unsplash.com/photos/a-white-bullet-train-speeds-past-a-mountain-9H6ZPRr7j6Q",
    },
  },
  {
    version: "v1.6.1",
    publishedAt: "2026-04-21T18:25:26Z",
    displayDate: "Apr 21, 2026",
    href: `${RELEASE_BASE_URL}/v1.6.1`,
  },
  {
    version: "v1.6.0",
    publishedAt: "2026-04-11T14:47:51Z",
    displayDate: "Apr 11, 2026",
    href: `${RELEASE_BASE_URL}/v1.6.0`,
  },
  {
    version: "v1.5.4",
    publishedAt: "2026-04-11T14:45:03Z",
    displayDate: "Apr 11, 2026",
    href: `${RELEASE_BASE_URL}/v1.5.4`,
  },
  {
    version: "v1.5.3",
    publishedAt: "2026-04-07T14:02:10Z",
    displayDate: "Apr 7, 2026",
    href: `${RELEASE_BASE_URL}/v1.5.3`,
  },
  {
    version: "v1.5.2",
    publishedAt: "2026-04-02T18:06:53Z",
    displayDate: "Apr 2, 2026",
    href: `${RELEASE_BASE_URL}/v1.5.2`,
  },
  {
    version: "v1.5.1",
    publishedAt: "2026-04-02T11:17:51Z",
    displayDate: "Apr 2, 2026",
    href: `${RELEASE_BASE_URL}/v1.5.1`,
  },
  {
    version: "v1.5.0",
    publishedAt: "2026-03-28T19:40:09Z",
    displayDate: "Mar 28, 2026",
    href: `${RELEASE_BASE_URL}/v1.5.0`,
  },
  {
    version: "v1.4.16",
    publishedAt: "2026-03-28T17:42:01Z",
    displayDate: "Mar 28, 2026",
    href: `${RELEASE_BASE_URL}/v1.4.16`,
  },
  {
    version: "v1.4.15",
    publishedAt: "2026-03-17T20:15:44Z",
    displayDate: "Mar 17, 2026",
    href: `${RELEASE_BASE_URL}/v1.4.15`,
  },
  {
    version: "v1.4.14",
    publishedAt: "2026-03-17T12:21:28Z",
    displayDate: "Mar 17, 2026",
    href: `${RELEASE_BASE_URL}/v1.4.14`,
  },
  {
    version: "v1.4.13",
    publishedAt: "2026-03-15T16:00:19Z",
    displayDate: "Mar 15, 2026",
    href: `${RELEASE_BASE_URL}/v1.4.13`,
  },
  {
    version: "v1.4.12",
    publishedAt: "2026-03-15T14:53:33Z",
    displayDate: "Mar 15, 2026",
    href: `${RELEASE_BASE_URL}/v1.4.12`,
  },
  {
    version: "v1.4.11",
    publishedAt: "2026-03-13T08:17:28Z",
    displayDate: "Mar 13, 2026",
    href: `${RELEASE_BASE_URL}/v1.4.11`,
  },
  {
    version: "v1.4.10",
    publishedAt: "2026-03-12T16:32:59Z",
    displayDate: "Mar 12, 2026",
    href: `${RELEASE_BASE_URL}/v1.4.10`,
  },
  {
    version: "v1.4.9",
    publishedAt: "2026-03-12T10:24:04Z",
    displayDate: "Mar 12, 2026",
    href: `${RELEASE_BASE_URL}/v1.4.9`,
  },
  {
    version: "v1.4.8",
    publishedAt: "2026-03-09T13:35:33Z",
    displayDate: "Mar 9, 2026",
    href: `${RELEASE_BASE_URL}/v1.4.8`,
  },
  {
    version: "v1.4.7",
    publishedAt: "2026-03-08T12:20:00Z",
    displayDate: "Mar 8, 2026",
    href: `${RELEASE_BASE_URL}/v1.4.7`,
  },
  {
    version: "v1.3.18",
    publishedAt: "2026-03-08T11:50:19Z",
    displayDate: "Mar 8, 2026",
    href: `${RELEASE_BASE_URL}/v1.3.18`,
  },
  {
    version: "v1.4.6",
    publishedAt: "2026-03-04T16:33:31Z",
    displayDate: "Mar 4, 2026",
    href: `${RELEASE_BASE_URL}/v1.4.6`,
  },
  {
    version: "v1.4.5",
    publishedAt: "2026-03-04T14:54:23Z",
    displayDate: "Mar 4, 2026",
    href: `${RELEASE_BASE_URL}/v1.4.5`,
  },
  {
    version: "v1.4.4",
    publishedAt: "2026-03-04T13:48:38Z",
    displayDate: "Mar 4, 2026",
    href: `${RELEASE_BASE_URL}/v1.4.4`,
  },
  {
    version: "v1.4.3",
    publishedAt: "2026-03-03T16:37:15Z",
    displayDate: "Mar 3, 2026",
    href: `${RELEASE_BASE_URL}/v1.4.3`,
  },
  {
    version: "v1.4.2",
    publishedAt: "2026-03-03T16:18:52Z",
    displayDate: "Mar 3, 2026",
    href: `${RELEASE_BASE_URL}/v1.4.2`,
  },
  {
    version: "v1.4.1",
    publishedAt: "2026-03-02T21:28:21Z",
    displayDate: "Mar 2, 2026",
    href: `${RELEASE_BASE_URL}/v1.4.1`,
  },
  {
    version: "v1.4.0",
    publishedAt: "2026-02-25T00:13:34Z",
    displayDate: "Feb 25, 2026",
    href: `${RELEASE_BASE_URL}/v1.4.0`,
  },
  {
    version: "v1.3.17",
    publishedAt: "2026-02-24T01:09:47Z",
    displayDate: "Feb 24, 2026",
    href: `${RELEASE_BASE_URL}/v1.3.17`,
  },
  {
    version: "v1.3.16",
    publishedAt: "2026-02-21T12:54:29Z",
    displayDate: "Feb 21, 2026",
    href: `${RELEASE_BASE_URL}/v1.3.16`,
  },
  {
    version: "v1.3.15",
    publishedAt: "2026-02-20T13:04:54Z",
    displayDate: "Feb 20, 2026",
    href: `${RELEASE_BASE_URL}/v1.3.15`,
  },
  {
    version: "v1.3.14",
    publishedAt: "2026-02-18T20:03:26Z",
    displayDate: "Feb 18, 2026",
    href: `${RELEASE_BASE_URL}/v1.3.14`,
  },
  {
    version: "v1.3.13",
    publishedAt: "2026-02-17T21:57:42Z",
    displayDate: "Feb 17, 2026",
    href: `${RELEASE_BASE_URL}/v1.3.13`,
  },
  {
    version: "v1.3.12",
    publishedAt: "2026-02-17T21:37:31Z",
    displayDate: "Feb 17, 2026",
    href: `${RELEASE_BASE_URL}/v1.3.12`,
  },
  {
    version: "v1.3.11",
    publishedAt: "2026-02-17T21:22:52Z",
    displayDate: "Feb 17, 2026",
    href: `${RELEASE_BASE_URL}/v1.3.11`,
  },
  {
    version: "v1.3.10",
    publishedAt: "2026-02-17T21:08:55Z",
    displayDate: "Feb 17, 2026",
    href: `${RELEASE_BASE_URL}/v1.3.10`,
  },
  {
    version: "v1.3.9",
    publishedAt: "2026-02-17T20:53:40Z",
    displayDate: "Feb 17, 2026",
    href: `${RELEASE_BASE_URL}/v1.3.9`,
  },
  {
    version: "v1.3.8",
    publishedAt: "2026-02-17T14:12:38Z",
    displayDate: "Feb 17, 2026",
    href: `${RELEASE_BASE_URL}/v1.3.8`,
  },
  {
    version: "v1.3.7",
    publishedAt: "2026-02-17T13:34:52Z",
    displayDate: "Feb 17, 2026",
    href: `${RELEASE_BASE_URL}/v1.3.7`,
  },
  {
    version: "v1.3.6",
    publishedAt: "2026-02-17T13:30:56Z",
    displayDate: "Feb 17, 2026",
    href: `${RELEASE_BASE_URL}/v1.3.6`,
  },
  {
    version: "v1.3.5",
    publishedAt: "2026-02-17T12:56:46Z",
    displayDate: "Feb 17, 2026",
    href: `${RELEASE_BASE_URL}/v1.3.5`,
  },
  {
    version: "v1.3.4",
    publishedAt: "2026-02-16T23:45:41Z",
    displayDate: "Feb 16, 2026",
    href: `${RELEASE_BASE_URL}/v1.3.4`,
  },
  {
    version: "v1.3.3",
    publishedAt: "2026-02-15T10:40:06Z",
    displayDate: "Feb 15, 2026",
    href: `${RELEASE_BASE_URL}/v1.3.3`,
  },
  {
    version: "v1.3.2",
    publishedAt: "2026-01-29T01:02:59Z",
    displayDate: "Jan 29, 2026",
    href: `${RELEASE_BASE_URL}/v1.3.2`,
  },
  {
    version: "v1.3.1",
    publishedAt: "2026-01-28T23:25:42Z",
    displayDate: "Jan 28, 2026",
    href: `${RELEASE_BASE_URL}/v1.3.1`,
  },
  {
    version: "v1.3.0",
    publishedAt: "2026-01-28T11:10:28Z",
    displayDate: "Jan 28, 2026",
    href: `${RELEASE_BASE_URL}/v1.3.0`,
  },
  {
    version: "v1.2.0",
    publishedAt: "2026-01-28T10:25:26Z",
    displayDate: "Jan 28, 2026",
    href: `${RELEASE_BASE_URL}/v1.2.0`,
  },
  {
    version: "v1.1.15",
    publishedAt: "2026-01-24T21:24:29Z",
    displayDate: "Jan 24, 2026",
    href: `${RELEASE_BASE_URL}/v1.1.15`,
  },
  {
    version: "v1.1.16",
    publishedAt: "2026-01-24T21:10:43Z",
    displayDate: "Jan 24, 2026",
    href: `${RELEASE_BASE_URL}/v1.1.16`,
  },
  {
    version: "v1.1.14",
    publishedAt: "2026-01-24T17:42:00Z",
    displayDate: "Jan 24, 2026",
    href: `${RELEASE_BASE_URL}/v1.1.14`,
  },
  {
    version: "v1.1.12",
    publishedAt: "2026-01-23T15:16:11Z",
    displayDate: "Jan 23, 2026",
    href: `${RELEASE_BASE_URL}/v1.1.12`,
  },
  {
    version: "v1.1.11",
    publishedAt: "2026-01-23T13:53:50Z",
    displayDate: "Jan 23, 2026",
    href: `${RELEASE_BASE_URL}/v1.1.11`,
  },
  {
    version: "v1.1.10",
    publishedAt: "2026-01-22T20:59:11Z",
    displayDate: "Jan 22, 2026",
    href: `${RELEASE_BASE_URL}/v1.1.10`,
  },
  {
    version: "v1.1.9",
    publishedAt: "2026-01-22T16:47:10Z",
    displayDate: "Jan 22, 2026",
    href: `${RELEASE_BASE_URL}/v1.1.9`,
  },
  {
    version: "v1.1.8",
    publishedAt: "2026-01-21T20:26:31Z",
    displayDate: "Jan 21, 2026",
    href: `${RELEASE_BASE_URL}/v1.1.8`,
  },
  {
    version: "v1.1.7",
    publishedAt: "2026-01-21T19:47:34Z",
    displayDate: "Jan 21, 2026",
    href: `${RELEASE_BASE_URL}/v1.1.7`,
  },
  {
    version: "v1.1.6",
    publishedAt: "2026-01-21T18:40:27Z",
    displayDate: "Jan 21, 2026",
    href: `${RELEASE_BASE_URL}/v1.1.6`,
  },
  {
    version: "v1.1.5",
    publishedAt: "2026-01-21T18:35:39Z",
    displayDate: "Jan 21, 2026",
    href: `${RELEASE_BASE_URL}/v1.1.5`,
  },
  {
    version: "v1.1.4",
    publishedAt: "2026-01-21T18:12:45Z",
    displayDate: "Jan 21, 2026",
    href: `${RELEASE_BASE_URL}/v1.1.4`,
  },
  {
    version: "v1.1.3",
    publishedAt: "2026-01-21T17:44:59Z",
    displayDate: "Jan 21, 2026",
    href: `${RELEASE_BASE_URL}/v1.1.3`,
  },
  {
    version: "v1.1.2",
    publishedAt: "2026-01-21T16:55:49Z",
    displayDate: "Jan 21, 2026",
    href: `${RELEASE_BASE_URL}/v1.1.2`,
  },
  {
    version: "v1.1.1",
    publishedAt: "2026-01-21T16:50:53Z",
    displayDate: "Jan 21, 2026",
    href: `${RELEASE_BASE_URL}/v1.1.1`,
  },
  {
    version: "v1.1.0",
    publishedAt: "2026-01-21T16:28:39Z",
    displayDate: "Jan 21, 2026",
    href: `${RELEASE_BASE_URL}/v1.1.0`,
  },
  {
    version: "v1.0.5",
    publishedAt: "2026-01-21T15:44:38Z",
    displayDate: "Jan 21, 2026",
    href: `${RELEASE_BASE_URL}/v1.0.5`,
  },
  {
    version: "v1.0.3",
    publishedAt: "2026-01-21T15:25:04Z",
    displayDate: "Jan 21, 2026",
    href: `${RELEASE_BASE_URL}/v1.0.3`,
  },
];

export const latestChangelogRelease = changelogReleases[0];
