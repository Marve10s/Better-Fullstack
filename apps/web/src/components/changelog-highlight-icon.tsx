import type { IconType } from "react-icons";
import {
  TbApps,
  TbCheck,
  TbFileZip,
  TbLayoutBottombar,
  TbLink,
  TbPackage,
  TbPalette,
  TbPlayerPlay,
  TbPlugConnected,
  TbPuzzle,
  TbServer,
} from "react-icons/tb";

const releaseIcons: Record<string, IconType[]> = {
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
