"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { SidebarItem as SidebarItemType } from "@/lib/student/types/sidebar";
import { Icons } from "@/utils/sidebar/icons";

interface SidebarItemProps {
  item: SidebarItemType;
  isActive: boolean;
  isCollapsed: boolean;
}

export const AdminSidebarItem = ({
  item,
  isActive,
  isCollapsed,
}: SidebarItemProps) => {
  const pathname = usePathname();
  const hasSubItems = item.subItems && item.subItems.length > 0;
  const [isExpanded, setIsExpanded] = useState(() => {
    // Auto-expand if any sub-item is active
    if (hasSubItems) {
      return item.subItems!.some((sub) => pathname?.startsWith(sub.href));
    }
    return false;
  });

  const isSubItemActive = (href: string) => pathname?.startsWith(href);

  // For items with sub-items, clicking toggles expansion instead of navigating
  const handleClick = (e: React.MouseEvent) => {
    if (hasSubItems && !isCollapsed) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  const ItemContent = (
    <div
      className={clsx(
        "flex items-center gap-3 px-3 py-3 rounded-xl transition-colors duration-200 relative z-10",
        isActive && !hasSubItems
          ? "text-accent-foreground"
          : "text-text-secondary hover:text-text-primary",
        isCollapsed && "justify-center px-2"
      )}
    >
      {/* Active State Background */}
      {isActive && !hasSubItems && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
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
          isActive && !hasSubItems && "text-accent-foreground"
        )}
      />

      {!isCollapsed && (
        <>
          <span className="font-medium truncate flex-1 relative z-20">
            {item.label}
          </span>
          {hasSubItems && (
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <Icons.ChevronDown className="w-4 h-4 text-text-muted" />
            </motion.div>
          )}
        </>
      )}

      {/* Tooltip for collapsed state */}
      {isCollapsed && (
        <div className="absolute left-full ml-2 w-max px-3 py-1.5 bg-surface-active text-text-primary text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-lg border border-border">
          {item.label}
          <div className="absolute top-1/2 -left-1 -mt-1 border-4 border-transparent border-r-surface-active" />
        </div>
      )}
    </div>
  );

  return (
    <div>
      {hasSubItems ? (
        <button onClick={handleClick} className="block group relative w-full text-left">
          {ItemContent}
        </button>
      ) : (
        <Link href={item.href} className="block group relative">
          {ItemContent}
        </Link>
      )}

      {/* Sub Items */}
      <AnimatePresence>
        {hasSubItems && isExpanded && !isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="ml-4 pl-4 border-l border-border/50 mt-1 space-y-1">
              {item.subItems!.map((subItem) => (
                <Link
                  key={subItem.href}
                  href={subItem.href}
                  className={clsx(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-200 group/sub",
                    isSubItemActive(subItem.href)
                      ? "bg-accent/10 text-accent font-medium"
                      : "text-text-secondary hover:text-text-primary hover:bg-surface-hover"
                  )}
                >
                  <subItem.icon className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm truncate">{subItem.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

