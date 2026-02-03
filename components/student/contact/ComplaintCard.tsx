"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Clock,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Complaint } from "@/lib/student/types/contact";
import { cn } from "@/lib/common/utils";
import { useState } from "react";

interface ComplaintCardProps {
  complaint: Complaint;
  index?: number;
}

const statusConfig = {
  pending: {
    icon: AlertCircle,
    label: "Pending",
    color: "text-warning",
    bg: "bg-warning-light",
  },
  "in-progress": {
    icon: Clock,
    label: "In Progress",
    color: "text-info",
    bg: "bg-info-light",
  },
  resolved: {
    icon: CheckCircle,
    label: "Resolved",
    color: "text-success",
    bg: "bg-success-light",
  },
};

const categoryLabels: Record<string, string> = {
  academic: "Academic",
  facilities: "Facilities",
  transport: "Transport",
  fees: "Fees",
  staff: "Staff",
  other: "Other",
};

export const ComplaintCard = ({ complaint, index = 0 }: ComplaintCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const status = statusConfig[complaint.status];
  const StatusIcon = status.icon;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-background rounded-2xl border border-border shadow-sm overflow-hidden"
    >
      {/* Header */}
      <div
        className="px-5 py-4 flex items-start justify-between gap-3 cursor-pointer hover:bg-surface/50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            <span
              className={cn(
                "text-xs font-medium px-2 py-0.5 rounded-full",
                status.bg,
                status.color,
              )}
            >
              <StatusIcon className="w-3 h-3 inline mr-1" />
              {status.label}
            </span>
            <span className="text-xs text-text-muted bg-surface-active px-2 py-0.5 rounded-full">
              {categoryLabels[complaint.category]}
            </span>
          </div>
          <h3 className="font-semibold text-text-primary text-sm md:text-base">
            {complaint.subject}
          </h3>
          <p className="text-xs text-text-muted mt-1">
            Submitted: {formatDate(complaint.submittedAt)}
          </p>
        </div>

        <button className="p-2 rounded-lg hover:bg-surface-hover text-text-muted transition-colors flex-shrink-0">
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Expandable Content */}
      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="border-t border-border"
        >
          {/* Original Message */}
          <div className="px-5 py-4">
            <p className="text-sm text-text-secondary leading-relaxed">
              {complaint.message}
            </p>
          </div>

          {/* Response */}
          {complaint.response && (
            <div className="px-5 py-4 bg-success-light/30 border-t border-border">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-success-light flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-4 h-4 text-success" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium text-text-primary">
                      Response
                    </span>
                    <span className="text-xs text-text-muted">
                      by {complaint.response.respondedBy}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary mt-1.5 leading-relaxed">
                    {complaint.response.message}
                  </p>
                  <p className="text-xs text-text-muted mt-2">
                    {formatDate(complaint.response.respondedAt)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* No Response Yet */}
          {!complaint.response && complaint.status === "pending" && (
            <div className="px-5 py-4 bg-warning-light/30 border-t border-border">
              <p className="text-sm text-text-secondary text-center">
                ⏳ Your complaint is being reviewed. You will be notified once
                there is a response.
              </p>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};
