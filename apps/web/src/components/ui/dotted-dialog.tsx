import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import * as React from "react";
import { TbX as XIcon } from "react-icons/tb";

import { cn } from "@/lib/platform/utils";
import { m } from "@/paraglide/messages.js";

function DottedDialog({ ...props }: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dotted-dialog" {...props} />;
}

function DottedDialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dotted-dialog-trigger" {...props} />;
}

function DottedDialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dotted-dialog-portal" {...props} />;
}

function DottedDialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dotted-dialog-close" {...props} />;
}

function DottedDialogOverlay({ className, ...props }: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dotted-dialog-overlay"
      className={cn(
        "data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 fixed inset-0 z-50 duration-200",
        // Motion.dev-style dotted backdrop: a near-solid sheet the color of the
        // page, punched with a fine grid of transparent pinholes. The pinholes
        // reveal a brightened + blurred slice of what's behind, so the dots read
        // as faint texture in both themes.
        "bg-[radial-gradient(transparent_1px,var(--background)_1px)] [background-size:4px_4px]",
        "[-webkit-backdrop-filter:brightness(1.15)_blur(3px)] [backdrop-filter:brightness(1.15)_blur(3px)]",
        className,
      )}
      {...props}
    />
  );
}

function DottedDialogContent({
  className,
  children,
  showCloseButton = true,
  closeButtonClassName,
  ...props
}: DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean;
  closeButtonClassName?: string;
}) {
  return (
    <DottedDialogPortal>
      <DottedDialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dotted-dialog-content"
        className={cn(
          "fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 overflow-hidden rounded-2xl border border-border/60 bg-popover p-6 text-sm text-popover-foreground shadow-2xl shadow-black/30 outline-none duration-200 sm:max-w-lg",
          "data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-closed:slide-out-to-top-[2%] data-open:slide-in-from-top-[2%]",
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dotted-dialog-close"
            className={cn(
              "absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground/60 transition-all duration-150 hover:bg-muted/60 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
              closeButtonClassName,
            )}
          >
            <XIcon className="h-4 w-4" />
            <span className="sr-only">{m.uiClose()}</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Popup>
    </DottedDialogPortal>
  );
}

function DottedDialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dotted-dialog-header"
      className={cn("flex flex-col gap-1.5", className)}
      {...props}
    />
  );
}

function DottedDialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean;
}) {
  return (
    <div
      data-slot="dotted-dialog-footer"
      className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close className="inline-flex h-8 items-center justify-center rounded-lg border border-border/60 bg-muted/30 px-4 text-xs font-medium text-muted-foreground transition-colors duration-150 hover:bg-muted/50 hover:text-foreground">
          {m.uiClose()}
        </DialogPrimitive.Close>
      )}
    </div>
  );
}

function DottedDialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dotted-dialog-title"
      className={cn("text-base font-semibold tracking-tight", className)}
      {...props}
    />
  );
}

function DottedDialogDescription({ className, ...props }: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dotted-dialog-description"
      className={cn(
        "text-muted-foreground *:[a]:hover:text-foreground text-sm/relaxed *:[a]:underline *:[a]:underline-offset-3",
        className,
      )}
      {...props}
    />
  );
}

export {
  DottedDialog as Dialog,
  DottedDialogClose as DialogClose,
  DottedDialogContent as DialogContent,
  DottedDialogDescription as DialogDescription,
  DottedDialogFooter as DialogFooter,
  DottedDialogHeader as DialogHeader,
  DottedDialogOverlay as DialogOverlay,
  DottedDialogPortal as DialogPortal,
  DottedDialogTitle as DialogTitle,
  DottedDialogTrigger as DialogTrigger,
};
