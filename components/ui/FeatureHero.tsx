"use client";

import React from "react";
import { cn } from "@/lib/shadcn/utils";

interface FeatureHeroProps {
  badge?: string;
  title: string;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export const FeatureHero = ({
  badge,
  title,
  subtitle,
  actions,
  className,
  children,
}: FeatureHeroProps) => {
  return (
    <div
      className={cn(
        "relative w-full rounded-[2rem] p-8 md:p-10 bg-accent-gradient text-white overflow-hidden shadow-lg",
        className,
      )}
    >
      {/* Decorative patterns or subtle gradients could go here */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full -ml-10 -mb-10 blur-2xl" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          {badge && (
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold uppercase tracking-widest border border-white/20">
              {badge}
            </span>
          )}
          <div className="space-y-1">
            <h1 className="text-4xl md:text-5xl font-bold font-heading tracking-tight leading-tight">
              {title}
            </h1>
            {subtitle && (
              <div className="text-white/80 font-medium text-base flex items-center gap-2">
                {subtitle}
              </div>
            )}
          </div>
        </div>

        {actions && (
          <div className="flex flex-wrap items-center gap-3 md:mb-1">
            {actions}
          </div>
        )}
      </div>

      {children && <div className="relative z-10 mt-8">{children}</div>}
    </div>
  );
};
