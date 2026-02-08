"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { SidebarItem } from "./SidebarItem";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarFooter } from "./SidebarFooter";
import { Icons } from "@/utils/student/icons";
import { SidebarProps } from "@/lib/student/types/sidebar";
import { motion, AnimatePresence } from "framer-motion";

export const MobileSidebar = ({ items, user }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Helper to check active state
  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname?.startsWith(href)) return true;
    return false;
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  // Close menu on navigation
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className="md:hidden">
      {/* Trigger Button - Only visible on mobile, takes no width when closed */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-40 p-2 rounded-xl bg-surface hover:bg-surface-hover text-text-primary border border-border shadow-lg"
        aria-label="Open menu"
      >
        <Icons.Menu className="w-6 h-6" />
      </button>

      {/* Overlay & Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Sidebar Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[280px] bg-background border-r border-border z-50 flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between p-4 border-b border-border">
                <SidebarHeader isCollapsed={false} />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-surface-active text-text-secondary"
                >
                  <Icons.X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                {items.map((item) => (
                  <SidebarItem
                    key={item.href}
                    item={item}
                    isActive={isActive(item.href)}
                    isCollapsed={false}
                  />
                ))}
              </div>

              <SidebarFooter user={user} isCollapsed={false} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
