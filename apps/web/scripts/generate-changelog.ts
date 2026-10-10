import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const REPOSITORY = "Marve10s/Better-Fullstack";
const PAGE_SIZE = 100;
const OUTPUT_FILE = path.resolve(import.meta.dir, "../content/changelog/index.mdx");
const TITLE = "Changelog";
const DESCRIPTION =
  "Release notes for every published Better Fullstack version, newest first, with a link to each GitHub release.";

type GitHubRelease = {
  tag_name: string;
  html_url: string;
  body: string | null;
  draft: boolean;
  prerelease: boolean;
  published_at: string | null;
};

type PublishedRelease = GitHubRelease & { published_at: string };

const KNOWN_HTML_TAG = /<\/?(?:samp|details|summary)>/g;
const HTML_COMMENT = /<!--[\s\S]*?-->/g;
const NON_BREAKING_SPACES = /[ \t]*(?:&nbsp;)+[ \t]*/g;
const HEADING = /^#{1,6}\s+(.+?)\s*#*\s*$/;
const INLINE_CODE = /(`+)[\s\S]*?\1/g;
const EM_DASH = new RegExp(String.fromCodePoint(0x2014), "g");

async function fetchReleases(): Promise<GitHubRelease[]> {
  const token = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN;
  const releases: GitHubRelease[] = [];
  for (let page = 1; ; page++) {
    const response = await fetch(
      `https://api.github.com/repos/${REPOSITORY}/releases?per_page=${PAGE_SIZE}&page=${page}`,
      {
        headers: {
          accept: "application/vnd.github+json",
          ...(token ? { authorization: `Bearer ${token}` } : {}),
        },
      },
    );
    if (!response.ok) {
      throw new Error(`GitHub releases request failed: ${response.status} ${await response.text()}`);
    }
    const batch = (await response.json()) as GitHubRelease[];
    releases.push(...batch);
    if (batch.length < PAGE_SIZE) return releases;
  }
}

function escapeMdxText(text: string): string {
  return text.replace(/[<{}]/g, (character) => `\\${character}`);
}

function escapeOutsideInlineCode(line: string): string {
  let result = "";
  let last = 0;
  for (const match of line.matchAll(INLINE_CODE)) {
    result += escapeMdxText(line.slice(last, match.index)) + match[0];
    last = match.index + match[0].length;
  }
  return result + escapeMdxText(line.slice(last));
}

function headingToParagraph(line: string): string {
  const heading = HEADING.exec(line);
  if (!heading) return line;
  return `\n**${heading[1].replaceAll("**", "").trim()}**\n`;
}

export function normalizeReleaseNotes(body: string): string {
  let inFence = false;
  const lines = body
    .replace(/\r\n?/g, "\n")
    .replace(HTML_COMMENT, "")
    .replace(EM_DASH, "-")
    .split("\n")
    .map((line) => {
      if (/^\s*```/.test(line)) {
        inFence = !inFence;
        return line;
      }
      if (inFence) return line;
      const cleaned = line.replace(KNOWN_HTML_TAG, "").replace(NON_BREAKING_SPACES, " ");
      return escapeOutsideInlineCode(headingToParagraph(cleaned.trimEnd()));
    });
  return lines
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function displayDate(publishedAt: string): string {
  return new Date(publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

function releaseSection(release: PublishedRelease): string {
  const notes = normalizeReleaseNotes(release.body ?? "");
  return [
    `## ${release.tag_name}`,
    "",
    `Released ${displayDate(release.published_at)} · [GitHub release](${release.html_url})`,
    ...(notes ? ["", notes] : []),
  ].join("\n");
}

export function renderChangelog(releases: GitHubRelease[]): string {
  const published = releases
    .filter(
      (release): release is PublishedRelease =>
        !release.draft && !release.prerelease && release.published_at !== null,
    )
    .sort((a, b) => b.published_at.localeCompare(a.published_at));
  const updated = published[0]?.published_at.slice(0, 10);
  return [
    "---",
    `title: ${TITLE}`,
    `description: ${DESCRIPTION}`,
    ...(updated ? [`updated: "${updated}"`] : []),
    "---",
    "",
    published.map(releaseSection).join("\n\n"),
    "",
  ].join("\n");
}

if (import.meta.main) {
  const releases = await fetchReleases();
  await mkdir(path.dirname(OUTPUT_FILE), { recursive: true });
  await writeFile(OUTPUT_FILE, renderChangelog(releases));
  console.log(`Wrote ${path.relative(process.cwd(), OUTPUT_FILE)}`);
}
