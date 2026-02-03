"use client";

import { useState } from "react";
import {
  Pin,
  FileText,
  Image as ImageIcon,
  File,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Announcement } from "@/lib/student/types/announcements";
import { cn } from "@/lib/common/utils";

interface NoticeItemProps {
  announcement: Announcement;
  showDivider?: boolean;
}

// Badge configuration - muted, subtle styles
const badgeConfig: Record<string, { label: string; className: string } | null> =
  {
    urgent: {
      label: "Urgent",
      className: "bg-error/10 text-error",
    },
    holiday: {
      label: "Holiday",
      className: "bg-warning/10 text-warning",
    },
    event: {
      label: "Event",
      className: "bg-success/10 text-success",
    },
    academic: null,
    general: null,
  };

const attachmentIcons = {
  pdf: FileText,
  image: ImageIcon,
  document: File,
  other: File,
};

export function NoticeItem({
  announcement,
  showDivider = false,
}: NoticeItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const badge = badgeConfig[announcement.category];
  const AttachmentIcon = announcement.attachment
    ? attachmentIcons[announcement.attachment.type]
    : null;

  // Format date: "12 Sep 2026"
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Check if content needs truncation (more than ~150 chars)
  const contentNeedsTruncation = announcement.content.length > 150;
  const truncatedContent = contentNeedsTruncation
    ? announcement.content.slice(0, 150) + "..."
    : announcement.content;

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (announcement.attachment?.url) {
      window.open(announcement.attachment.url, "_blank");
    }
  };

  const handleView = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (announcement.attachment?.url) {
      window.open(announcement.attachment.url, "_blank");
    }
  };

  return (
    <article
      className={cn(
        "px-4 md:px-6 py-4",
        showDivider && "border-b border-border",
      )}
    >
      {/* Main Content */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
        {/* Date */}
        <time
          dateTime={announcement.date}
          className="text-sm text-text-muted tabular-nums sm:w-24 sm:flex-shrink-0"
        >
          {formatDate(announcement.date)}
        </time>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title Row */}
          <div className="flex flex-wrap items-center gap-2">
            {announcement.isPinned && (
              <Pin className="w-3.5 h-3.5 text-text-muted flex-shrink-0" />
            )}
            <h3 className="font-medium text-text-primary">
              {announcement.title}
            </h3>
            {badge && (
              <span
                className={cn("text-xs px-1.5 py-0.5 rounded", badge.className)}
              >
                {badge.label}
              </span>
            )}
          </div>

          {/* Content Preview */}
          <p className="text-sm text-text-secondary mt-1 leading-relaxed">
            {isExpanded ? announcement.content : truncatedContent}
          </p>

          {/* Read More */}
          {contentNeedsTruncation && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-1 text-sm text-accent flex items-center gap-1 hover:underline focus:outline-none min-h-[44px] sm:min-h-0 py-2 sm:py-1"
              aria-expanded={isExpanded}
            >
              {isExpanded ? (
                <>
                  Show less
                  <ChevronUp className="w-3.5 h-3.5" />
                </>
              ) : (
                <>
                  Read more
                  <ChevronDown className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          )}

          {/* Attachment - Simple row */}
          {announcement.attachment && AttachmentIcon && (
            <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
              <div className="flex items-center gap-2 text-text-secondary min-w-0">
                <AttachmentIcon className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{announcement.attachment.name}</span>
                {announcement.attachment.size && (
                  <span className="text-text-muted text-xs">
                    ({announcement.attachment.size})
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 text-sm">
                <button
                  onClick={handleView}
                  className="text-accent hover:underline focus:outline-none min-h-[44px] sm:min-h-0"
                  aria-label={`View ${announcement.attachment.name}`}
                >
                  View
                </button>
                <span className="text-border">|</span>
                <button
                  onClick={handleDownload}
                  className="text-accent hover:underline focus:outline-none min-h-[44px] sm:min-h-0"
                  aria-label={`Download ${announcement.attachment.name}`}
                >
                  Download
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
