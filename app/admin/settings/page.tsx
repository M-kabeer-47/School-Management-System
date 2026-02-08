"use client";

import { motion } from "framer-motion";
import {
  Settings,
  Building2,
  CalendarDays,
  Receipt,
  BadgePercent,
  Clock,
  BarChart3,
  Target,
  TrendingUp,
  FileCheck,
  FileImage,
  DoorOpen,
  Layers,
  BookOpen,
  LayoutGrid,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface SettingsLink {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

interface SettingsCategory {
  label: string;
  items: SettingsLink[];
}

const settingsCategories: SettingsCategory[] = [
  {
    label: "School",
    items: [
      {
        title: "School Profile",
        description: "Name, address, logo, contact info, principal details",
        href: "/admin/settings/school-profile",
        icon: Building2,
      },
      {
        title: "Academic Year",
        description: "Current year, terms and their date ranges",
        href: "/admin/settings/academic-year",
        icon: CalendarDays,
      },
    ],
  },
  {
    label: "Academic Structure",
    items: [
      {
        title: "Class Groups / Wings",
        description: "Define wings like Junior, Middle, Senior and map classes",
        href: "/admin/settings/class-groups",
        icon: LayoutGrid,
      },
      {
        title: "Sections",
        description: "List available sections (A, B, C...) for classes",
        href: "/admin/settings/sections",
        icon: Layers,
      },
      {
        title: "Subjects",
        description: "Define subjects and assign them to class groups",
        href: "/admin/settings/subjects",
        icon: BookOpen,
      },
      {
        title: "Term Definitions",
        description: "Define reusable term names for your academic calendar",
        href: "/admin/settings/term-definitions",
        icon: CalendarDays,
      },
    ],
  },
  {
    label: "Finance",
    items: [
      {
        title: "Fee Structure",
        description: "Fee heads, amounts per class, and billing frequency",
        href: "/admin/settings/fee-structure",
        icon: Receipt,
      },
      {
        title: "Fee Discounts",
        description:
          "Sibling discount, staff child, scholarships, auto-apply rules",
        href: "/admin/settings/fee-concessions",
        icon: BadgePercent,
      },
      {
        title: "Late Fee Rules",
        description: "Due dates, grace periods, and late fee penalties",
        href: "/admin/settings/late-fee",
        icon: Clock,
      },
    ],
  },
  {
    label: "Assessment & Grading",
    items: [
      {
        title: "Grade Scale",
        description: "Grade thresholds — A+, A, B+, etc.",
        href: "/admin/settings/grade-scale",
        icon: BarChart3,
      },
      {
        title: "Pass / Fail Criteria",
        description: "Minimum percentage to pass, per-subject and overall",
        href: "/admin/settings/pass-fail",
        icon: Target,
      },
      {
        title: "Promotion Rules",
        description: "Auto-promote, grace marks, compartment, detention",
        href: "/admin/settings/promotion-rules",
        icon: TrendingUp,
      },
    ],
  },
  {
    label: "Enrollment & Reports",
    items: [
      {
        title: "Required Documents",
        description: "Mandatory vs optional documents for student enrollment",
        href: "/admin/settings/documents",
        icon: FileCheck,
      },
      {
        title: "Report Card Template",
        description: "Select default template and display options",
        href: "/admin/settings/report-card",
        icon: FileImage,
      },
    ],
  },
  {
    label: "Infrastructure",
    items: [
      {
        title: "Room Configuration",
        description: "Map classes to physical rooms and manage capacity",
        href: "/admin/settings/rooms",
        icon: DoorOpen,
      },
    ],
  },
];

export default function SettingsPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-heading text-text-primary flex items-center gap-3">
          Settings
          <Settings className="w-7 h-7 text-text-muted" />
        </h1>
        <p className="text-text-secondary mt-1 text-sm">
          Configure school-wide settings and policies.
        </p>
      </div>

      {/* Settings Categories */}
      {settingsCategories.map((category, catIndex) => (
        <motion.section
          key={category.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: catIndex * 0.05 }}
        >
          <h2 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3 px-1">
            {category.label}
          </h2>
          <div className="bg-surface rounded-xl border border-border divide-y divide-border">
            {category.items.map((link) => (
              <Link key={link.href} href={link.href} className="block group">
                <div className="flex items-center gap-4 px-5 py-4 hover:bg-surface-active/50 transition-colors first:rounded-t-xl last:rounded-b-xl">
                  <div className="w-9 h-9 rounded-lg bg-surface-active flex items-center justify-center shrink-0 group-hover:bg-accent/10 transition-colors">
                    <link.icon className="w-[18px] h-[18px] text-text-muted group-hover:text-accent transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">
                      {link.title}
                    </h3>
                    <p className="text-xs text-text-muted mt-0.5 line-clamp-1">
                      {link.description}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-muted/40 group-hover:text-accent transition-colors shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </motion.section>
      ))}
    </motion.div>
  );
}
