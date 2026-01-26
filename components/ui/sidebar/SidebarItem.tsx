"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { SidebarItem as SidebarItemType } from "@/lib/student/types/sidebar";

interface SidebarItemProps {
  item: SidebarItemType;
  isActive: boolean;
  isCollapsed: boolean;
}

export const SidebarItem = ({
  item,
  isActive,
  isCollapsed,
}: SidebarItemProps) => {
  return (
    <Link href={item.href} className="block group relative">
      <div
        className={clsx(
          "flex items-center gap-3 px-3 py-3 rounded-xl transition-colors duration-200 relative z-10",
          isActive
            ? "text-accent-foreground"
            : "text-text-secondary hover:text-text-primary",
          isCollapsed && "justify-center px-2",
        )}
      >
        {isActive && (
          <motion.div
            layoutId="sidebar-active"
            className="absolute inset-0 bg-accent-gradient rounded-xl -z-10"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}

        {!isActive && (
          <div className="absolute inset-0 bg-surface-hover rounded-xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        )}

        <item.icon
          className={clsx(
            "w-6 h-6 flex-shrink-0 relative z-20",
            isActive && "text-accent-foreground",
          )}
        />

        {!isCollapsed && (
          <span className="font-medium truncate flex-1 relative z-20">
            {item.label}
          </span>
        )}

        {/* Badge - Using neutral colors for secondary emphasis */}
        {!isCollapsed && item.badge && (
          <span
            className={clsx(
              "px-2 py-0.5 rounded-full text-[11px] font-semibold relative z-20",
              isActive
                ? "bg-accent-foreground/20 text-accent-foreground"
                : "bg-surface-active text-text-secondary",
            )}
          >
            {item.badge}
          </span>
        )}

        {/* Tooltip for collapsed state */}
        {isCollapsed && (
          <div className="absolute left-full ml-2 w-max px-3 py-1.5 bg-surface-active text-text-primary text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-lg border border-border">
            {item.label}
            {/* Arrow */}
            <div className="absolute top-1/2 -left-1 -mt-1 border-4 border-transparent border-r-surface-active" />
          </div>
        )}
      </div>
    </Link>
  );
};
