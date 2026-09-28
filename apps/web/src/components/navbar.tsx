import { Link, useMatchRoute, useRouterState } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import {
  TbArrowRight as ArrowRight,
  TbBlocks as Blocks,
  TbBook as BookOpen,
  TbCheck as Check,
  TbChevronDown as ChevronDown,
  TbBrandGithub as Github,
  TbStack3 as Layers3,
  TbLanguage as Languages,
  TbMenu2 as Menu,
  TbMoon as Moon,
  TbPlug as Plug,
  TbSparkles as Sparkles,
  TbStar as Star,
  TbSun as Sun,
} from "react-icons/tb";

import logoDark from "@/assets/brand/bf-logo-ascii-dark.png?no-inline";
import logoLight from "@/assets/brand/bf-logo-ascii-light.png?no-inline";
import { formatCompactStat, useProjectStats } from "@/components/home/hero-stats";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/lib/content/theme";
import { LOCALE_LABELS } from "@/lib/i18n/locales";
import { cn } from "@/lib/platform/utils";
import { SITE_NAME } from "@/lib/seo/seo";
import { isStackShareSlug } from "@/lib/stack/stack-share-slugs";
import { m } from "@/paraglide/messages.js";
import { getLocale, setLocale, locales, type Locale } from "@/paraglide/runtime.js";

const BUILDER_COMMAND_SEARCH = { view: "command", file: "" } as const;
const BUILDER_PRESETS_SEARCH = { view: "presets", file: "" } as const;
const DOCS_ACTIVE_OPTIONS = { includeSearch: false } as const;
const DOCS_ACTIVE_PROPS = { className: "active" } as const;
const DOCS_SKILL_PARAMS = { _splat: "ai/overview" } as const;

const NAV_LINK_CLASS =
  "font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground [&.active]:text-foreground sm:text-[12px]";
const MOBILE_MENU_ITEM_CLASS =
  "cursor-pointer py-2.5 font-mono text-xs font-medium text-foreground/80 hover:text-foreground [&_svg]:text-muted-foreground";
const MOBILE_MENU_LABEL_CLASS =
  "px-1.5 pb-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/70";
const MOBILE_MENU_GROUP_CLASS = "rounded-lg border border-border/50 bg-muted/20 p-1";

function GithubStarButton() {
  const stats = useProjectStats();
  const stars = stats?.github.stars;
  const reduceMotion = useReducedMotion();

  return (
    <motion.a
      href="https://github.com/Marve10s/Better-Fullstack"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={m.navGithubRepository()}
      title={stars === undefined ? m.navGithubRepository() : `${stars.toLocaleString()} stars`}
      whileHover={reduceMotion ? undefined : { y: -1 }}
      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="group inline-flex h-9 items-center gap-2 rounded-full border border-ink/10 bg-surface/45 px-3 font-mono text-[11px] font-semibold text-foreground backdrop-blur-md transition-colors hover:bg-surface/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-white/15"
    >
      <Github className="size-4" aria-hidden />
      <span className="sr-only">GitHub</span>
      <span className="h-3.5 w-px bg-ink/15 dark:bg-white/20" aria-hidden />
      <Star
        className="size-3.5 fill-current text-ink transition-transform duration-200 group-hover:rotate-[-12deg] group-hover:scale-110 dark:text-brand"
        aria-hidden
      />
      <span className="tabular-nums">
        {stars === undefined ? (
          <span className="block h-2.5 w-5 animate-pulse rounded-sm bg-ink/15 dark:bg-white/20" />
        ) : (
          formatCompactStat(stars)
        )}
      </span>
    </motion.a>
  );
}

// The Docs entry points (MCP page, Skill) shared by both the full nav and the
// compact builder menu.
function DocsMenuItems() {
  return (
    <>
      <DropdownMenuItem
        render={<Link to="/mcp" />}
        className="cursor-pointer font-mono text-[11px] uppercase tracking-[0.18em]"
      >
        {m.navMcp()}
      </DropdownMenuItem>
      <DropdownMenuItem
        render={<Link to="/docs/$" params={DOCS_SKILL_PARAMS} hash="agent-skill" />}
        className="cursor-pointer font-mono text-[11px] uppercase tracking-[0.18em]"
      >
        {m.navSkill()}
      </DropdownMenuItem>
    </>
  );
}

// Split control: the "Docs" label navigates to /docs, while the adjacent chevron
// opens a dropdown with the related entry points (MCP, Skill).
function DocsMenu() {
  return (
    <div className="inline-flex items-center">
      <Link
        to="/docs"
        activeOptions={DOCS_ACTIVE_OPTIONS}
        className={cn(NAV_LINK_CLASS, "cursor-pointer")}
        activeProps={DOCS_ACTIVE_PROPS}
      >
        {m.navDocs()}
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <button
              type="button"
              aria-label={m.navOpenDocsMenu()}
              className="group ml-1 inline-flex cursor-pointer items-center text-muted-foreground transition-colors hover:text-foreground"
            />
          }
        >
          <ChevronDown
            className="h-3 w-3 transition-transform duration-200 ease-out group-data-[popup-open]:rotate-180"
            aria-hidden
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="min-w-36">
          <DocsMenuItems />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export function LocaleMenu() {
  const locale = getLocale();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            aria-label={m.navLanguage()}
            className="flex h-8 w-8 cursor-pointer items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
          />
        }
      >
        <Languages className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-36">
        {locales.map((availableLocale) => (
          <DropdownMenuItem
            key={availableLocale}
            onClick={() => setLocale(availableLocale as Locale)}
            className={MOBILE_MENU_ITEM_CLASS}
          >
            <span className="flex-1">
              {LOCALE_LABELS[availableLocale as keyof typeof LOCALE_LABELS]}
            </span>
            {locale === availableLocale ? <Check className="h-3.5 w-3.5" /> : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function MobileThemeMenuItem() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const switchToLight = mounted && resolvedTheme === "dark";
  const label = mounted
    ? switchToLight
      ? m.themeSwitchToLight()
      : m.themeSwitchToDark()
    : m.themeToggle();

  return (
    <DropdownMenuItem
      onClick={() => {
        if (!mounted) return;
        setTheme(switchToLight ? "light" : "dark");
      }}
      className={MOBILE_MENU_ITEM_CLASS}
    >
      {switchToLight ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
      <span>{label}</span>
    </DropdownMenuItem>
  );
}

function MobileLocaleMenu() {
  const locale = getLocale();

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className={cn(MOBILE_MENU_ITEM_CLASS, "cursor-pointer")}>
        <Languages className="size-4" />
        <span>{m.navLanguage()}</span>
        <span className="ml-auto max-w-20 truncate text-[10px] text-muted-foreground">
          {LOCALE_LABELS[locale as keyof typeof LOCALE_LABELS]}
        </span>
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent side="left" align="start" className="w-44 p-1.5">
        {locales.map((availableLocale) => (
          <DropdownMenuItem
            key={availableLocale}
            onClick={() => setLocale(availableLocale as Locale)}
            className={cn(
              MOBILE_MENU_ITEM_CLASS,
              "justify-between",
              locale === availableLocale && "bg-amber-400/10 text-foreground",
            )}
          >
            <span>{LOCALE_LABELS[availableLocale as keyof typeof LOCALE_LABELS]}</span>
            {locale === availableLocale ? (
              <Check className="size-3.5 text-amber-600 dark:text-amber-300" />
            ) : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
}

function MobileNavMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            aria-label={m.navOpenMenu()}
            className="flex h-8 w-8 cursor-pointer items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
          />
        }
      >
        <Menu className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-72 max-w-[calc(100vw-1rem)] space-y-2 rounded-2xl border-border/70 bg-background/95 p-2 shadow-2xl shadow-black/15 backdrop-blur-xl"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className={MOBILE_MENU_LABEL_CLASS}>
            {m.navSectionCreate()}
          </DropdownMenuLabel>
          <div className={MOBILE_MENU_GROUP_CLASS}>
            <DropdownMenuItem
              render={<Link to="/new" search={BUILDER_COMMAND_SEARCH} />}
              className={MOBILE_MENU_ITEM_CLASS}
            >
              <Blocks className="size-4" />
              {m.navBuilder()}
            </DropdownMenuItem>
            <DropdownMenuItem
              render={<Link to="/new" search={BUILDER_PRESETS_SEARCH} />}
              className={MOBILE_MENU_ITEM_CLASS}
            >
              <Layers3 className="size-4" />
              {m.navPresets()}
            </DropdownMenuItem>
          </div>
        </DropdownMenuGroup>

        <DropdownMenuGroup>
          <DropdownMenuLabel className={MOBILE_MENU_LABEL_CLASS}>
            {m.navSectionResources()}
          </DropdownMenuLabel>
          <div className={MOBILE_MENU_GROUP_CLASS}>
            <DropdownMenuItem render={<Link to="/docs" />} className={MOBILE_MENU_ITEM_CLASS}>
              <BookOpen className="size-4" />
              {m.navDocs()}
            </DropdownMenuItem>
            <DropdownMenuItem render={<Link to="/mcp" />} className={MOBILE_MENU_ITEM_CLASS}>
              <Plug className="size-4" />
              {m.navMcp()}
            </DropdownMenuItem>
            <DropdownMenuItem
              render={<Link to="/docs/$" params={DOCS_SKILL_PARAMS} hash="agent-skill" />}
              className={MOBILE_MENU_ITEM_CLASS}
            >
              <Sparkles className="size-4" />
              {m.navSkill()}
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-1" />
            <DropdownMenuItem
              onClick={() => {
                window.open(
                  "https://github.com/Marve10s/Better-Fullstack",
                  "_blank",
                  "noopener,noreferrer",
                );
              }}
              className={MOBILE_MENU_ITEM_CLASS}
            >
              <Github className="size-4" />
              <span>{m.navGithubRepository()}</span>
            </DropdownMenuItem>
          </div>
        </DropdownMenuGroup>

        <DropdownMenuGroup>
          <DropdownMenuLabel className={MOBILE_MENU_LABEL_CLASS}>
            {m.navSectionPreferences()}
          </DropdownMenuLabel>
          <div className={MOBILE_MENU_GROUP_CLASS}>
            <MobileThemeMenuItem />
            <MobileLocaleMenu />
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/** True on every route that renders the stack builder, including shared stack slugs. */
export function useOnBuilderRoute() {
  const matchRoute = useMatchRoute();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const pathSegments = pathname.split("/").filter(Boolean);
  const shareSlug = pathSegments[0] ?? "";
  return (
    Boolean(matchRoute({ to: "/new" })) ||
    pathname === "/stack" ||
    (pathSegments.length === 1 && isStackShareSlug(shareSlug))
  );
}

// On the docs grain the lime button needs an edge to separate it from the lime backdrop.
const TRY_NOW_ON_GRAIN = "shadow-[0_0_0_1px_rgb(27_26_23/0.22)] dark:shadow-none";

export function Navbar() {
  const onDocs = useRouterState({
    select: (state) => /^\/(docs|guides)(\/|$)/.test(state.location.pathname),
  });
  // The builder folds the brand, languages and preferences into its own bar.
  if (useOnBuilderRoute()) return null;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b",
        // Docs and guides extend their grain frame behind this bar, so it is frosted
        // glass there: the panel slides under it blurred instead of being cut off.
        onDocs
          ? "border-ink/10 bg-surface/15 backdrop-blur-xl backdrop-saturate-150 dark:border-white/10 dark:bg-black/20"
          : "border-border bg-background/85 backdrop-blur-md",
      )}
    >
      <nav className="container relative mx-auto flex h-14 items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-5 sm:gap-7">
          <Link
            to="/"
            className="flex shrink-0 items-center"
            aria-label={`${SITE_NAME}, ${m.navHome()}`}
          >
            <img
              src={logoLight}
              alt=""
              width={32}
              height={32}
              fetchPriority="high"
              className="size-8 dark:hidden"
            />
            <img
              src={logoDark}
              alt=""
              width={32}
              height={32}
              fetchPriority="high"
              className="hidden size-8 dark:block"
            />
          </Link>
          <span className="hidden h-4 w-px bg-border lg:block" aria-hidden />
          <div className="hidden items-center gap-7 lg:flex">
            <Link
              to="/new"
              search={BUILDER_COMMAND_SEARCH}
              className={NAV_LINK_CLASS}
              activeProps={DOCS_ACTIVE_PROPS}
            >
              {m.navBuilder()}
            </Link>
            <Link
              to="/new"
              search={BUILDER_PRESETS_SEARCH}
              className={NAV_LINK_CLASS}
              activeProps={DOCS_ACTIVE_PROPS}
            >
              {m.navPresets()}
            </Link>
            <DocsMenu />
          </div>
        </div>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <GithubStarButton />
          <ThemeToggle />
          <LocaleMenu />
          <span className="hidden h-4 w-px bg-border sm:block" aria-hidden />
          <Link
            to="/new"
            search={BUILDER_COMMAND_SEARCH}
            className={cn(
              "group inline-flex items-center gap-1.5 rounded-md bg-[#C6E853] px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-black transition-all hover:gap-2 hover:bg-[#d2ee72] sm:px-4 sm:py-2 sm:text-[12px]",
              onDocs && TRY_NOW_ON_GRAIN,
            )}
          >
            {m.navTryNow()}
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 sm:h-3.5 sm:w-3.5" />
          </Link>
        </div>
        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          <Link
            to="/new"
            search={BUILDER_COMMAND_SEARCH}
            className={cn(
              "group inline-flex items-center gap-1.5 rounded-md bg-[#C6E853] px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-black transition-all hover:gap-2 hover:bg-[#d2ee72]",
              onDocs && TRY_NOW_ON_GRAIN,
            )}
          >
            {m.navTryNow()}
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <MobileNavMenu />
        </div>
      </nav>
    </header>
  );
}
