"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { AdminSidebarHeader } from "./SidebarHeader";
import { AdminSidebarItem } from "./SidebarItem";
import { AdminSidebarFooter } from "./SidebarFooter";
import { AdminMobileSidebar } from "./MobileSidebar";
import { Icons } from "@/utils/admin/icons";
import { clsx } from "clsx";
import { usePathname } from "next/navigation";
import { adminMenuItems, currentAdmin } from "@/lib/admin/constants";

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

interface SidebarComponentProps {
  className?: string;
}

export const AdminSidebar = ({ className }: SidebarComponentProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  // Helper to check active state
  const isActive = (href: string) => {
    if (href === "/admin" && pathname === "/admin") return true;
    if (href !== "/admin" && pathname?.startsWith(href)) return true;
    return false;
  };

  return (
    <>
      {/* Mobile Sidebar (Handles its own visibility) */}
      <AdminMobileSidebar items={adminMenuItems} user={currentAdmin} />

      {/* Desktop Sidebar - Single animated container */}
      <motion.div
        initial={false}
        animate={isCollapsed ? "collapsed" : "expanded"}
        variants={sidebarVariants}
        className="hidden md:flex relative h-[100dvh] sticky top-0 flex-shrink-0 group/sidebar"
      >
        {/* Sidebar Content */}
        <aside
          className={clsx(
            "flex flex-col h-full w-full bg-background border-r border-border overflow-hidden",
            className,
          )}
        >
          <AdminSidebarHeader isCollapsed={isCollapsed} />

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-3 space-y-1 custom-scrollbar">
            {adminMenuItems.map((item) => (
              <AdminSidebarItem
                key={item.href}
                item={item}
                isActive={isActive(item.href)}
                isCollapsed={isCollapsed}
              />
            ))}
          </div>

          {/* Footer & User Profile */}
          <AdminSidebarFooter user={currentAdmin} isCollapsed={isCollapsed} />
        </aside>

        {/* Collapse Toggle Button - Always visible, perfectly centered */}
        <div className="absolute -right-4 inset-y-0 flex items-center z-50 pointer-events-none">
          <div className="relative group/collapse pointer-events-auto">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="w-8 h-8 rounded-full bg-background border border-border shadow-lg flex items-center justify-center text-text-muted hover:text-accent hover:border-accent transition-colors duration-200 focus:outline-none hover:scale-110"
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
