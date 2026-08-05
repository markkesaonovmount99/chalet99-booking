import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";

export function Label({
  className,
  ...props
}: ComponentProps<"label">) {
  return (
    <label
      className={cn(
        "block text-xs font-medium uppercase tracking-wider text-forest-700 mb-1.5",
        className,
      )}
      {...props}
    />
  );
}

const inputBase =
  "w-full rounded-lg border border-forest-900/15 bg-paper px-4 py-2.5 text-sm text-ink placeholder:text-ink/40 outline-none transition-colors focus:border-forest-700 disabled:opacity-50";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(inputBase, className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea className={cn(inputBase, "resize-none", className)} {...props} />;
}

export function Select({ className, ...props }: ComponentProps<"select">) {
  return <select className={cn(inputBase, "cursor-pointer", className)} {...props} />;
}

export function FieldError({ children }: { children?: ReactNode }) {
  if (!children) return null;
  return <p className="mt-1.5 text-xs text-red-700">{children}</p>;
}
