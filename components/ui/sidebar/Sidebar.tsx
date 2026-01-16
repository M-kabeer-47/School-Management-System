"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarItem } from "./SidebarItem";
import { SidebarFooter } from "./SidebarFooter";
import { MobileSidebar } from "./MobileSidebar";
import { Icons } from "@/utils/sidebar/icons";
import { SidebarProps } from "@/lib/types/sidebar";
import { clsx } from "clsx";
import { usePathname } from "next/navigation";

// Animation variants for the sidebar wrapper
const sidebarVariants = {
  expanded: {
    width: 280,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 30,
    },
  },
  collapsed: {
    width: 80,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 30,
    },
  },
};

export const Sidebar = ({ className, items, user }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  // Helper to check active state
  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname?.startsWith(href)) return true;
    return false;
  };

  return (
    <>
      {/* Mobile Sidebar (Handles its own visibility) */}
      <MobileSidebar items={items} user={user} />

      {/* Desktop Sidebar - Single animated container */}
      <motion.div
        initial={false}
        animate={isCollapsed ? "collapsed" : "expanded"}
        variants={sidebarVariants}
        className="hidden md:flex relative h-screen sticky top-0 flex-shrink-0 group/sidebar"
      >
        {/* Sidebar Content */}
        <aside
          className={clsx(
            "flex flex-col h-full w-full bg-background border-r border-border overflow-hidden",
            className
          )}
        >
          <SidebarHeader isCollapsed={isCollapsed} />

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-3 space-y-1 custom-scrollbar">
            {items.map((item, index) => {
              const isSettings = item.label === "Settings";

              return (
                <React.Fragment key={item.href}>
                  {isSettings && index > 0 && (
                    <div className="my-4 border-t border-border mx-2" />
                  )}

                  <SidebarItem
                    item={item}
                    isActive={isActive(item.href)}
                    isCollapsed={isCollapsed}
                  />
                </React.Fragment>
              );
            })}
          </div>

          {/* Footer & User Profile */}
          <SidebarFooter user={user} isCollapsed={isCollapsed} />
        </aside>

        {/* Collapse Toggle Button - Only visible on hover */}
        <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-50 opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-200">
          <div className="relative group/collapse">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="w-8 h-8 rounded-full bg-background border border-border shadow-lg flex items-center justify-center text-text-muted hover:text-accent hover:border-accent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring hover:scale-110"
              aria-label={isCollapsed ? "Expand menu" : "Collapse menu"}
            >
              <motion.div
                animate={{ rotate: isCollapsed ? 0 : 180 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <Icons.ChevronRight className="w-4 h-4" />
              </motion.div>
            </button>
            {/* Tooltip */}
            <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-foreground text-background text-xs font-medium rounded opacity-0 group-hover/collapse:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
              {isCollapsed ? "Expand menu" : "Collapse menu"}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};
