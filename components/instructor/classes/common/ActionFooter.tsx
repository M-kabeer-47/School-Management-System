"use client";

import { cn } from "@/lib/shadcn/utils";

interface ActionFooterProps {
  children?: React.ReactNode; // Left side content (stats)
  action: React.ReactNode; // Right side button
  className?: string;
}

export const ActionFooter = ({
  children,
  action,
  className,
}: ActionFooterProps) => {
  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-2 md:left-[18rem] bg-background/80 backdrop-blur-xl border-t border-border z-30 transition-all duration-300",
        className,
      )}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-4">
        {/* Left Side (Stats) */}
        <div className="flex items-center gap-6 text-sm">{children}</div>

        {/* Right Side (Action) */}
        <div>{action}</div>
      </div>
    </div>
  );
};
