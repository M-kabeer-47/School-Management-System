"use client";

import * as React from "react";
import { PillTabs, PillTabOption } from "./PillTabs";
import { Tabs, TabsList, TabsTrigger } from "./Tabs";
import { cn } from "@/lib/student/utils";

interface ResponsiveTabsProps {
  options: (PillTabOption & { desktopLabel?: React.ReactNode })[];
  value: string;
  onValueChange: (value: string) => void;
  variant?: "default" | "underline";
  className?: string;
}

export function ResponsiveTabs({
  options,
  value,
  onValueChange,
  variant = "default",
  className,
}: ResponsiveTabsProps) {
  return (
    <div className={cn("w-full", className)}>
      {/* Mobile / Junior Screen View: PillTabs */}
      <div className="lg:hidden">
        <PillTabs
          options={options}
          value={value}
          onValueChange={onValueChange}
        />
      </div>

      {/* Desktop / Large Screen View: Standard Tabs */}
      <div className="hidden lg:block">
        <Tabs
          value={value}
          onValueChange={onValueChange}
          variant={variant}
          className="w-full lg:w-auto"
        >
          <TabsList className="bg-background border h-12 p-1">
            {options.map((option) => (
              <TabsTrigger
                key={option.value}
                value={option.value}
                className="py-2 px-4 text-sm whitespace-nowrap flex items-center gap-2 min-w-[140px]"
              >
                {option.icon && (
                  <span className="[&>svg]:size-4">{option.icon}</span>
                )}
                {option.desktopLabel || option.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
