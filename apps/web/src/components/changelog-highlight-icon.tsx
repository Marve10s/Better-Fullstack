import type { IconType } from "react-icons";

import {
  TbApps,
  TbArrowsExchange,
  TbBook,
  TbCheck,
  TbDatabase,
  TbFileZip,
  TbKey,
  TbLayoutBottombar,
  TbLink,
  TbPackage,
  TbPalette,
  TbPlayerPlay,
  TbPlugConnected,
  TbPuzzle,
  TbServer,
  TbShieldCheck,
  TbStack2,
  TbTerminal2,
} from "react-icons/tb";

const releaseIcons: Record<string, IconType[]> = {
  "v2.8.1": [TbServer, TbKey, TbPlugConnected, TbPuzzle, TbTerminal2],
  "v2.8.0": [TbTerminal2, TbServer, TbDatabase, TbShieldCheck, TbBook],
  "v2.7.0": [TbStack2, TbArrowsExchange, TbServer, TbShieldCheck, TbBook],
  "v2.6.8": [TbPalette, TbLayoutBottombar, TbPackage, TbPuzzle, TbPlugConnected],
  "v2.6.5": [TbApps, TbServer, TbFileZip, TbLink, TbPlayerPlay],
};

export function ChangelogHighlightIcon({
  version,
  index,
  className,
}: {
  version: string;
  index: number;
  className?: string;
}) {
  const Icon = releaseIcons[version]?.[index] ?? TbCheck;
  return <Icon className={className} aria-hidden="true" />;
}
