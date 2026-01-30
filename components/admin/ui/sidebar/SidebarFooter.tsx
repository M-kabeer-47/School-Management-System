"use client";

import React from "react";
import { User } from "@/lib/student/types/sidebar";
import { Icons } from "@/utils/sidebar/icons";
import { clsx } from "clsx";

interface SidebarFooterProps {
  user: User;
  isCollapsed: boolean;
}

export const AdminSidebarFooter = ({
  user,
  isCollapsed,
}: SidebarFooterProps) => {
  return (
    <div className="p-4 border-t border-border mt-auto">
      <div
        className={clsx(
          "flex items-center gap-3",
          isCollapsed ? "justify-center" : "justify-between",
        )}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-full bg-accent-light flex items-center justify-center flex-shrink-0 text-accent font-bold border-2 border-surface">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              user.name.charAt(0)
            )}
          </div>

          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm text-text-primary truncate">
                {user.name}
              </p>
              <p className="text-xs text-text-muted truncate">{user.role}</p>
            </div>
          )}
        </div>

        {!isCollapsed && (
          <div className="relative group/logout">
            <button
              className="p-2 rounded-lg text-text-muted hover:text-error hover:bg-error-light transition-colors"
              aria-label="Log Out"
            >
              <Icons.LogOut className="w-5 h-5" />
            </button>
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-foreground text-background text-xs font-medium rounded opacity-0 group-hover/logout:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
              Log Out
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
