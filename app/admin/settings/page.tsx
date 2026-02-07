"use client";

import { motion } from "framer-motion";
import {
  Settings,
  Building2,
  CalendarDays,
  Receipt,
  BadgePercent,
  BarChart3,
  Target,
  TrendingUp,
  FileCheck,
  FileImage,
  DoorOpen,
} from "lucide-react";
import Link from "next/link";
import { clsx } from "clsx";
import { LucideIcon } from "lucide-react";

interface SettingsLink {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  color: string;
}

const settingsLinks: SettingsLink[] = [
  {
    title: "School Profile",
    description: "School name, address, logo, contact info, and principal details",
    href: "/admin/settings/school-profile",
    icon: Building2,
    color: "text-blue-500 bg-blue-100 dark:bg-blue-900/30",
  },
  {
    title: "Academic Year",
    description: "Current year, term definitions and date ranges",
    href: "/admin/settings/academic-year",
    icon: CalendarDays,
    color: "text-purple-500 bg-purple-100 dark:bg-purple-900/30",
  },
  {
    title: "Fee Structure",
    description: "Define fee heads, amounts per class, and frequency",
    href: "/admin/settings/fee-structure",
    icon: Receipt,
    color: "text-green-500 bg-green-100 dark:bg-green-900/30",
  },
  {
    title: "Fee Concessions",
    description: "Sibling discount, staff child, scholarships, and waivers",
    href: "/admin/settings/fee-concessions",
    icon: BadgePercent,
    color: "text-amber-500 bg-amber-100 dark:bg-amber-900/30",
  },
  {
    title: "Grade Scale",
    description: "Configure grading thresholds (A+, A, B+, etc.)",
    href: "/admin/settings/grade-scale",
    icon: BarChart3,
    color: "text-indigo-500 bg-indigo-100 dark:bg-indigo-900/30",
  },
  {
    title: "Pass / Fail Criteria",
    description: "Minimum percentage to pass, per-subject and overall",
    href: "/admin/settings/pass-fail",
    icon: Target,
    color: "text-red-500 bg-red-100 dark:bg-red-900/30",
  },
  {
    title: "Promotion Rules",
    description: "Auto-promote, grace marks, compartment, and detention",
    href: "/admin/settings/promotion-rules",
    icon: TrendingUp,
    color: "text-teal-500 bg-teal-100 dark:bg-teal-900/30",
  },
  {
    title: "Required Documents",
    description: "Configure mandatory vs optional documents for enrollment",
    href: "/admin/settings/documents",
    icon: FileCheck,
    color: "text-orange-500 bg-orange-100 dark:bg-orange-900/30",
  },
  {
    title: "Report Card Template",
    description: "Select default template and display options",
    href: "/admin/settings/report-card",
    icon: FileImage,
    color: "text-pink-500 bg-pink-100 dark:bg-pink-900/30",
  },
  {
    title: "Room Configuration",
    description: "Map classes to physical rooms and manage capacity",
    href: "/admin/settings/rooms",
    icon: DoorOpen,
    color: "text-cyan-500 bg-cyan-100 dark:bg-cyan-900/30",
  },
];

export default function SettingsPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-heading text-text-primary flex items-center gap-3">
          Settings
          <Settings className="w-7 h-7 text-accent" />
        </h1>
        <p className="text-text-secondary mt-1 text-sm">
          Configure school-wide settings and policies.
        </p>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {settingsLinks.map((link, index) => (
          <motion.div
            key={link.href}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
          >
            <Link href={link.href} className="block group">
              <div className="bg-surface rounded-xl border border-border p-5 hover:border-accent/30 hover:shadow-md transition-all duration-200 h-full">
                <div className="flex items-start gap-4">
                  <div
                    className={clsx(
                      "w-11 h-11 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform",
                      link.color,
                    )}
                  >
                    <link.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-text-primary group-hover:text-accent transition-colors">
                      {link.title}
                    </h3>
                    <p className="text-xs text-text-muted mt-1 line-clamp-2">
                      {link.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
