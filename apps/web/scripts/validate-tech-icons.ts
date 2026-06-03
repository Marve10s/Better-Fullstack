import { ECOSYSTEMS, PRESET_CATEGORIES, TECH_OPTIONS } from "../src/lib/constant";
import { computeSiUrl, ICON_REGISTRY, type IconConfig } from "../src/lib/tech-icons";

type IconTarget = {
  owner: string;
  src: string;
};

const REQUEST_TIMEOUT_MS = 15_000;

function addTarget(targets: Map<string, Set<string>>, owner: string, src: string) {
  const value = src.trim();
  if (!value) return;

  const owners = targets.get(value) ?? new Set<string>();
  owners.add(owner);
  targets.set(value, owners);
}

function addConfigTarget(targets: Map<string, Set<string>>, owner: string, config?: IconConfig) {
  if (!config) return;

  if (config.type === "si") {
    addTarget(targets, owner, computeSiUrl(config.slug, config.hex, false));
    return;
  }

  addTarget(targets, owner, config.src);
}

function addRenderedTechIconTarget(
  targets: Map<string, Set<string>>,
  owner: string,
  techId: string,
  fallbackIcon: string,
) {
  const config = ICON_REGISTRY[techId];
  if (config) {
    addConfigTarget(targets, `${owner} via ICON_REGISTRY:${techId}`, config);
    return;
  }

  addTarget(targets, owner, fallbackIcon);
}

function getFetchErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

async function fetchStatus(url: string): Promise<number> {
  const signal = AbortSignal.timeout(REQUEST_TIMEOUT_MS);
  const head = await fetch(url, {
    method: "HEAD",
    redirect: "follow",
    signal,
  });

  if (head.ok) return head.status;
  if (head.status === 403 || head.status === 405) {
    const get = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal,
    });
    return get.status;
  }

  return head.status;
}

function isLocalIconPath(src: string): boolean {
  return src.startsWith("/icon/");
}

function isRemoteIconUrl(src: string): boolean {
  try {
    const url = new URL(src);
    return url.protocol === "https:";
  } catch {
    return false;
  }
}

function collectIconTargets(): IconTarget[] {
  const targets = new Map<string, Set<string>>();

  for (const [category, options] of Object.entries(TECH_OPTIONS)) {
    for (const option of options) {
      const owner = `${category}:${option.id}`;
      addRenderedTechIconTarget(targets, owner, option.id, option.icon);
    }
  }

  for (const ecosystem of ECOSYSTEMS) {
    addRenderedTechIconTarget(targets, `ECOSYSTEMS:${ecosystem.id}`, ecosystem.id, ecosystem.icon);
  }

  for (const category of PRESET_CATEGORIES) {
    addRenderedTechIconTarget(targets, `PRESET_CATEGORIES:${category.id}`, category.icon, "");
  }

  for (const [id, config] of Object.entries(ICON_REGISTRY)) {
    addConfigTarget(targets, `ICON_REGISTRY:${id}`, config);
  }

  return [...targets.entries()].map(([src, owners]) => ({
    src,
    owner: [...owners].sort().join(", "),
  }));
}

async function run() {
  const errors: string[] = [];
  const warnings: string[] = [];
  const targets = collectIconTargets();

  for (const target of targets) {
    if (isLocalIconPath(target.src)) {
      const path = `public${target.src}`;
      if (!(await Bun.file(path).exists())) {
        errors.push(`${target.owner} uses missing local icon ${target.src}`);
      }
      continue;
    }

    if (!isRemoteIconUrl(target.src)) {
      warnings.push(`${target.owner} uses a non-loadable icon token "${target.src}"`);
      continue;
    }

    try {
      const status = await fetchStatus(target.src);
      if (status >= 400) {
        errors.push(`${target.owner} icon returned ${status}: ${target.src}`);
      }
    } catch (error) {
      errors.push(
        `${target.owner} icon request failed for ${target.src}: ${getFetchErrorMessage(error)}`,
      );
    }
  }

  console.log(`[tech-icons] validated ${targets.length} configured icon sources`);

  if (warnings.length > 0) {
    console.log(`[tech-icons] warnings (${warnings.length})`);
    for (const warning of warnings) {
      console.log(`  - ${warning}`);
    }
  }

  if (errors.length > 0) {
    console.error(`[tech-icons] errors (${errors.length})`);
    for (const error of errors) {
      console.error(`  - ${error}`);
    }
    process.exit(1);
  }
}

await run();
