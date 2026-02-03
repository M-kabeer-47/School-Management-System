"use client";

import React from "react";
import { Icons } from "@/utils/student/icons";

interface SidebarHeaderProps {
  isCollapsed: boolean;
}

export const SidebarHeader = ({ isCollapsed }: SidebarHeaderProps) => {
  return (
    <div className="h-20 flex items-center px-6">
      <div className="flex items-center gap-3 text-accent transition-all duration-300">
        <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-accent-foreground flex-shrink-0 shadow-lg shadow-accent/20">
          <Icons.Logo className="w-6 h-6" />
        </div>
        {!isCollapsed && (
          <div className="overflow-hidden whitespace-nowrap">
            <h1 className="font-heading font-bold text-lg text-text-primary leading-tight">
              School
            </h1>
            <p className="text-xs text-text-muted font-medium tracking-wider">
              PORTAL
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
