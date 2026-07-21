import { TbLoader2 as Loader2Icon } from "react-icons/tb";

import { cn } from "@/lib/utils";
import { m } from "@/paraglide/messages.js";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon
      aria-label={m.uiLoading()}
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
}

export { Spinner };
