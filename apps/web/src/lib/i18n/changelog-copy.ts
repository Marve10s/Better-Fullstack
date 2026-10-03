import type { ChangelogRelease } from "@/lib/content/changelog";

import { m } from "@/paraglide/messages.js";

export function getLocalizedChangelogRelease(release: ChangelogRelease): ChangelogRelease {
  if (release.version === "v2.7.0") {
    return {
      ...release,
      title: m.changelogRelease20261001Title(),
      summary: m.changelogRelease20261001Summary(),
      highlights: [
        m.changelogRelease20261001HighlightPreset(),
        m.changelogRelease20261001HighlightFramework(),
        m.changelogRelease20261001HighlightEffect(),
        m.changelogRelease20261001HighlightSecurity(),
        m.changelogRelease20261001HighlightDocs(),
      ],
      cta: release.cta
        ? {
            ...release.cta,
            label: m.changelogRelease20261001Cta(),
          }
        : undefined,
      image: release.image
        ? {
            ...release.image,
            alt: m.changelogRelease20261001ImageAlt(),
          }
        : undefined,
    };
  }

  if (release.version !== "v2.0.2") return release;

  return {
    ...release,
    title: m.changelogRelease20260612Title(),
    summary: m.changelogRelease20260612Summary(),
    highlights: [
      m.changelogRelease20260612HighlightMcp(),
      m.changelogRelease20260612HighlightDotnet(),
      m.changelogRelease20260612HighlightInstall(),
      m.changelogRelease20260612HighlightTracks(),
      m.changelogRelease20260612HighlightStorybook(),
      m.changelogRelease20260612HighlightMulti(),
    ],
    image: release.image
      ? {
          ...release.image,
          alt: m.changelogRelease20260612ImageAlt(),
        }
      : undefined,
  };
}
