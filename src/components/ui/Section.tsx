import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
  inverted?: boolean;
  compact?: boolean;
}

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  inverted,
  compact,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full",
        inverted ? "bg-navy-900 text-white" : "bg-white text-navy-900",
        compact ? "py-14 md:py-20" : "py-20 md:py-28",
        className
      )}
    >
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        {(eyebrow || title || description) && (
          <header className="mb-10 md:mb-14 max-w-3xl">
            {eyebrow && (
              <div
                className={cn(
                  "mb-3 text-xs md:text-sm font-semibold tracking-[0.2em] uppercase",
                  inverted ? "text-burgundy-300" : "text-burgundy-700"
                )}
              >
                {eyebrow}
              </div>
            )}
            {title && (
              <h2
                className={cn(
                  "text-2xl md:text-4xl font-black leading-tight text-balance",
                  inverted ? "text-white" : "text-navy-900"
                )}
              >
                {title}
              </h2>
            )}
            {description && (
              <p
                className={cn(
                  "mt-4 text-base md:text-lg leading-relaxed",
                  inverted ? "text-navy-100/80" : "text-navy-800/75"
                )}
              >
                {description}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
