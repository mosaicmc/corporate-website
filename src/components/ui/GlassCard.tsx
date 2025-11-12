import * as React from "react";
import { cn } from "@/lib/utils";

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
  bordered?: boolean;
};

const paddingMap = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
} as const;

export function GlassCard({
  children,
  className,
  as = "div",
  padding = "md",
  hover = true,
  bordered = true,
}: GlassCardProps) {
  const Comp = as as any;
  return (
    <Comp
      className={cn(
        // Glass morphism using theme tokens; subtle in dark
        "relative isolate bg-card/80 dark:bg-card/40 backdrop-blur-md",
        bordered && "border border-border",
        hover && "transition-colors",
        // soft inner separator for layered look
        "shadow-sm",
        paddingMap[padding],
        className
      )}
    >
      {/* optional highlight overlay for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-white/10 via-transparent to-transparent dark:from-white/5"
      />
      {children}
    </Comp>
  );
}

export default GlassCard;