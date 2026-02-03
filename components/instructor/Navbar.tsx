"use client";

import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { clsx } from "clsx";

// Inline Icons
const SunIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

const MoonIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

const NotificationsIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);

const LogoutIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" x2="9" y1="12" y2="12" />
  </svg>
);

const ProfileIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="10" r="3" />
    <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
  </svg>
);

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
          icon={theme === "dark" ? SunIcon : MoonIcon}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          label="Toggle theme"
          active={false}
        />

        {/* Notifications */}
        <NavItem
          index={1}
          icon={NotificationsIcon}
          badge
          label="Notifications"
        />

        {/* Logout */}
        <NavItem index={2} icon={LogoutIcon} label="Log out" />

        {/* Separator */}
        <div className="w-px h-5 bg-border mx-1" />

        {/* Profile Avatar - Premium Accent Border */}
        <div className="pl-1 pr-1 cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-accent-gradient p-[2px] shadow-sm group-hover:shadow-md transition-all group-hover:scale-105">
            <div className="w-full h-full rounded-full bg-surface flex items-center justify-center overflow-hidden">
              <ProfileIcon className="w-4 h-4 text-text-secondary group-hover:text-accent transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
