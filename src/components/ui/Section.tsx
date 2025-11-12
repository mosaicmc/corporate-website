import * as React from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  padding?: "sm" | "md" | "lg";
  overlay?: boolean;
  overlayClassName?: string;
};

const paddingMap = {
  sm: "py-12",
  md: "py-20 md:py-24",
  lg: "py-24 md:py-32",
} as const;

export function Section({
  children,
  className,
  containerClassName,
  padding = "md",
  overlay = false,
  overlayClassName,
}: SectionProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-background transition-colors duration-300",
        paddingMap[padding],
        className
      )}
    >
      {overlay && (
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent dark:from-white/5",
            overlayClassName
          )}
        />
      )}
      <div className={cn("container", containerClassName)}>{children}</div>
    </section>
  );
}

export default Section;