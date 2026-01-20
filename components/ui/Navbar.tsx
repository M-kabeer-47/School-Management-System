"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, Bell, LogOut, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { clsx } from "clsx";

export const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const NavItem = ({
    icon: Icon,
    onClick,
    index,
    badge,
    label,
    active,
  }: {
    icon: any;
    onClick?: () => void;
    index: number;
    badge?: boolean;
    label: string;
    active?: boolean;
  }) => (
    <button
      onClick={onClick}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      className={clsx(
        "relative w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-accent/50",
        active
          ? "bg-accent-gradient shadow-md shadow-accent/20"
          : "hover:text-text-primary",
      )}
      aria-label={label}
    >
      <AnimatePresence>
        {hoveredIndex === index && !active && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-surface-hover rounded-xl -z-10"
          />
        )}
      </AnimatePresence>
      <Icon
        className={clsx(
          "w-[18px] h-[18px] transition-colors relative z-10",
          active
            ? "text-white"
            : "text-text-secondary group-hover:text-text-primary",
        )}
      />
      {badge && (
        <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-error rounded-full ring-2 ring-surface z-20 animate-pulse"></span>
      )}
    </button>
  );

  if (!mounted) return null;

  return (
    <header className="flex items-center justify-end px-6 py-2.5 bg-surface backdrop-blur-xl sticky top-0 z-30 border-b border-border md:border-transparent h-14">
      {/* Theme Toggle */}

      <div className="flex items-center gap-3">
        <NavItem
          index={0}
          icon={theme === "dark" ? Sun : Moon}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          label="Toggle theme"
          active={false} // Subtle toggle better than big active state here for sleekness
        />

        {/* Notifications */}
        <NavItem index={1} icon={Bell} badge label="Notifications" />

        {/* Logout */}
        <NavItem index={2} icon={LogOut} label="Log out" />

        {/* Separator */}
        <div className="w-px h-5 bg-border mx-1" />

        {/* Profile Avatar - Premium Accent Border */}
        <div className="pl-1 pr-1 cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-accent-gradient p-[2px] shadow-sm group-hover:shadow-md transition-all group-hover:scale-105">
            <div className="w-full h-full rounded-full bg-surface flex items-center justify-center overflow-hidden">
              <User className="w-4 h-4 text-text-secondary group-hover:text-accent transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
