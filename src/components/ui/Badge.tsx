import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export function Badge({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-wood-500/40 bg-wood-100/60 px-3 py-1 text-xs font-medium tracking-wide text-wood-900",
        className,
      )}
      {...props}
    />
  );
}
