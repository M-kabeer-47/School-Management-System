"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Image,
  File,
  Download,
  Bell,
  BookOpen,
  PartyPopper,
  Sun,
  AlertTriangle,
} from "lucide-react";
import { Announcement } from "@/lib/student/types/announcements";
import { cn } from "@/lib/shadcn/utils";

interface AnnouncementCardProps {
  announcement: Announcement;
  index?: number;
}

const categoryConfig = {
  general: {
    icon: Bell,
    label: "General",
    color: "text-accent",
    bg: "bg-accent/15",
  },
  academic: {
    icon: BookOpen,
    label: "Academic",
    color: "text-info",
    bg: "bg-info-light",
  },
  event: {
    icon: PartyPopper,
    label: "Event",
    color: "text-success",
    bg: "bg-success-light",
  },
  holiday: {
    icon: Sun,
    label: "Holiday",
    color: "text-warning",
    bg: "bg-warning-light",
  },
  urgent: {
    icon: AlertTriangle,
    label: "Urgent",
    color: "text-error",
    bg: "bg-error-light",
  },
};

const attachmentIcons = {
  pdf: FileText,
  image: Image,
  document: File,
  other: File,
};

export const AnnouncementCard = ({
  announcement,
  index = 0,
}: AnnouncementCardProps) => {
  const category = categoryConfig[announcement.category];
  const CategoryIcon = category.icon;
  const AttachmentIcon = announcement.attachment
    ? attachmentIcons[announcement.attachment.type]
    : null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={cn(
        "bg-background rounded-2xl border shadow-sm overflow-hidden group hover:shadow-md transition-all duration-300",
        announcement.isPinned
          ? "border-accent/30 ring-1 ring-accent/10"
          : "border-border",
      )}
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-border flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5 flex-1 min-w-0">
          <div
            className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5",
              category.bg,
            )}
          >
            <CategoryIcon className={cn("w-4 h-4", category.color)} />
          </div>
          <div className="flex-1 min-w-0">
            <span
              className={cn(
                "text-[11px] font-medium px-1.5 py-0.5 rounded",
                category.bg,
                category.color,
              )}
            >
              {category.label}
            </span>
            <h3 className="font-semibold text-text-primary font-heading mt-1 text-base leading-tight">
              {announcement.title}
            </h3>
          </div>
        </div>

        <time className="text-text-muted text-xs flex-shrink-0 tabular-nums">
          {formatDate(announcement.date)}
        </time>
      </div>

      {/* Content */}
      <div className="px-5 py-4">
        <p className="text-text-secondary text-sm leading-relaxed">
          {announcement.content}
        </p>

        {/* Attachment */}
        {announcement.attachment && AttachmentIcon && (
          <div className="mt-4 p-3 bg-surface rounded-xl border border-border flex items-center justify-between gap-3 group/attachment hover:bg-surface-hover transition-colors cursor-pointer">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-accent-light flex items-center justify-center flex-shrink-0">
                <AttachmentIcon className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">
                  {announcement.attachment.name}
                </p>
                {announcement.attachment.size && (
                  <p className="text-xs text-text-muted">
                    {announcement.attachment.size}
                  </p>
                )}
              </div>
            </div>
            <button className="p-2 rounded-lg hover:bg-accent-light text-text-muted hover:text-accent transition-colors flex-shrink-0">
              <Download className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};
