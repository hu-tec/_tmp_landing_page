import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  href: string;
  variant?: "primary" | "ghost" | "light";
  children: ReactNode;
  className?: string;
}

export function CTAButton({ href, variant = "primary", children, className }: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm md:text-base font-semibold transition-all";
  const styles = {
    primary:
      "bg-burgundy-700 text-white hover:bg-burgundy-800 shadow-lg shadow-burgundy-900/20",
    ghost:
      "border border-white/30 text-white hover:bg-white/10",
    light:
      "bg-white text-navy-900 hover:bg-navy-50 border border-navy-100",
  }[variant];

  const isExternal = /^(https?:)?\/\//.test(href);
  if (href.startsWith("#") || isExternal) {
    return (
      <a href={href} className={cn(base, styles, className)}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cn(base, styles, className)}>
      {children}
    </Link>
  );
}
