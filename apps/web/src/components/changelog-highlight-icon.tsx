import { TbApps, TbCheck, TbFileZip, TbLink, TbPlayerPlay, TbServer } from "react-icons/tb";

const multiEcosystemIcons = [TbApps, TbServer, TbFileZip, TbLink, TbPlayerPlay];

export function ChangelogHighlightIcon({
  version,
  index,
  className,
}: {
  version: string;
  index: number;
  className?: string;
}) {
  const Icon = version === "v2.6.5" ? (multiEcosystemIcons[index] ?? TbCheck) : TbCheck;
  return <Icon className={className} aria-hidden="true" />;
}
