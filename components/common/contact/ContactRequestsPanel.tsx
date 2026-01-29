"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, History } from "lucide-react";
import { ComplaintForm } from "./ComplaintForm";
import { ComplaintCard } from "./ComplaintCard";
import { cn } from "@/lib/shadcn/utils";
import { Complaint } from "@/lib/student/types/contact";

interface ContactRequestsPanelProps {
  role: "student" | "instructor";
  complaints: Complaint[];
  onSubmit: (data: {
    subject: string;
    category: string;
    message: string;
  }) => void;
}

export const ContactRequestsPanel = ({
  role,
  complaints,
  onSubmit,
}: ContactRequestsPanelProps) => {
  const [activeTab, setActiveTab] = useState<"new" | "history">("new");

  const texts = {
    student: {
      newTab: "New Complaint",
      description:
        "Have a concern or feedback? Fill out the form below and we will get back to you as soon as possible.",
      emptyState: "No complaints yet",
      emptyStateSub: "Any complaints you submit will appear here",
    },
    instructor: {
      newTab: "New Request",
      description:
        "Have a concern, request, or feedback? Fill out the form below and administration will respond shortly.",
      emptyState: "No requests yet",
      emptyStateSub: "Any requests you submit will appear here",
    },
  };

  const t = texts[role];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="bg-background rounded-2xl border border-border shadow-sm overflow-hidden"
    >
      {/* Tabs */}
      <div className="flex border-b border-border">
        <button
          onClick={() => setActiveTab("new")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 px-4 py-4 text-sm font-medium transition-colors",
            activeTab === "new"
              ? "text-accent border-b-2 border-accent bg-accent/5"
              : "text-text-secondary hover:text-text-primary hover:bg-surface-hover",
          )}
        >
          <MessageSquare className="w-4 h-4" />
          {t.newTab}
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 px-4 py-4 text-sm font-medium transition-colors",
            activeTab === "history"
              ? "text-accent border-b-2 border-accent bg-accent/15/30"
              : "text-text-secondary hover:text-text-primary hover:bg-surface-hover",
          )}
        >
          <History className="w-4 h-4" />
          Previous ({complaints.length})
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-5">
        {activeTab === "new" ? (
          <div>
            <p className="text-sm text-text-secondary mb-5">{t.description}</p>
            <ComplaintForm onSubmit={onSubmit} />
          </div>
        ) : (
          <div className="space-y-3">
            {complaints.length > 0 ? (
              complaints.map((complaint, index) => (
                <ComplaintCard
                  key={complaint.id}
                  complaint={complaint}
                  index={index}
                />
              ))
            ) : (
              <div className="py-12 text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-surface-active flex items-center justify-center mb-4">
                  <MessageSquare className="w-8 h-8 text-text-muted" />
                </div>
                <p className="text-text-secondary font-medium">
                  {t.emptyState}
                </p>
                <p className="text-text-muted text-sm mt-1">
                  {t.emptyStateSub}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};
