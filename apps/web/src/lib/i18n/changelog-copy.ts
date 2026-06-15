import type { ChangelogRelease } from "@/lib/changelog";
import { m } from "@/paraglide/messages.js";

export function getLocalizedChangelogRelease(release: ChangelogRelease): ChangelogRelease {
  if (release.version !== "v2.0.2") return release;

  return {
    ...release,
    title: m.changelogRelease20260612Title(),
    summary: m.changelogRelease20260612Summary(),
    highlights: [
      m.changelogRelease20260612HighlightBenchmark(),
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
