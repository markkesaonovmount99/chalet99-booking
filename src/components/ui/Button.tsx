import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-forest-900 text-cream hover:bg-forest-800 disabled:bg-forest-100 disabled:text-forest-600/50",
  secondary:
    "bg-transparent text-forest-900 border border-forest-900/30 hover:border-forest-900 hover:bg-forest-50",
  ghost: "bg-transparent text-forest-900 hover:bg-forest-50",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-colors duration-200 disabled:cursor-not-allowed cursor-pointer";

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ComponentProps<"button"> & { variant?: Variant; size?: Size }) {
  return (
    <button
      className={cn(base, variantClasses[variant], sizeClasses[size], className)}
      {...props}
    />
  );
}

export function LinkButton({
  variant = "primary",
  size = "md",
  className,
  href,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; size?: Size }) {
  return (
    <Link
      href={href}
      className={cn(base, variantClasses[variant], sizeClasses[size], className)}
      {...props}
    />
  );
}
