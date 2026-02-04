"use client";

import { motion } from "framer-motion";
import {
    Bell,
    BookOpen,
    PartyPopper,
    Sun,
    AlertTriangle,
    MoreVertical,
    Pin,
    PinOff,
    Pencil,
    Trash2,
    Mail,
    MessageSquare,
    Check,
} from "lucide-react";
import { cn } from "@/lib/common/utils";
import { AdminAnnouncement } from "@/lib/admin/types/announcements";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

interface AdminAnnouncementCardProps {
    announcement: AdminAnnouncement;
    index?: number;
    onEdit?: (announcement: AdminAnnouncement) => void;
    onDelete?: (announcement: AdminAnnouncement) => void;
    onTogglePin?: (announcement: AdminAnnouncement) => void;
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
        color: "text-blue-600 dark:text-blue-400",
        bg: "bg-blue-100 dark:bg-blue-900/30",
    },
    event: {
        icon: PartyPopper,
        label: "Event",
        color: "text-green-600 dark:text-green-400",
        bg: "bg-green-100 dark:bg-green-900/30",
    },
    holiday: {
        icon: Sun,
        label: "Holiday",
        color: "text-orange-600 dark:text-orange-400",
        bg: "bg-orange-100 dark:bg-orange-900/30",
    },
    urgent: {
        icon: AlertTriangle,
        label: "Urgent",
        color: "text-red-600 dark:text-red-400",
        bg: "bg-red-100 dark:bg-red-900/30",
    },
};

export function AdminAnnouncementCard({
    announcement,
    index = 0,
    onEdit,
    onDelete,
    onTogglePin,
}: AdminAnnouncementCardProps) {
    const [showMenu, setShowMenu] = useState(false);
    const category = categoryConfig[announcement.category];
    const CategoryIcon = category.icon;

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    const hasSmsDelivery = announcement.delivery?.sms.sent;
    const hasEmailDelivery = announcement.delivery?.email.sent;

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={cn(
                "bg-background rounded-2xl border shadow-sm overflow-hidden group hover:shadow-md transition-all duration-300",
                announcement.isPinned
                    ? "border-accent/30 ring-1 ring-accent/10"
                    : "border-border"
            )}
        >
            {/* Header */}
            <div className="px-5 py-4 border-b border-border flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5 flex-1 min-w-0">
                    <div
                        className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5",
                            category.bg
                        )}
                    >
                        <CategoryIcon className={cn("w-4 h-4", category.color)} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                            <span
                                className={cn(
                                    "text-[11px] font-medium px-1.5 py-0.5 rounded",
                                    category.bg,
                                    category.color
                                )}
                            >
                                {category.label}
                            </span>
                            {announcement.isPinned && (
                                <span className="text-[11px] font-medium px-1.5 py-0.5 rounded bg-accent/10 text-accent flex items-center gap-1">
                                    <Pin className="w-3 h-3" />
                                    Pinned
                                </span>
                            )}
                        </div>
                        <h3 className="font-semibold text-text-primary font-heading mt-1 text-base leading-tight">
                            {announcement.title}
                        </h3>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <time className="text-text-muted text-xs flex-shrink-0 tabular-nums">
                        {formatDate(announcement.date)}
                    </time>
                    {/* Actions Menu */}
                    <div className="relative">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="max-w-[32px] h-8 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => setShowMenu(!showMenu)}
                        >
                            <MoreVertical className="w-4 h-4" />
                        </Button>
                        {showMenu && (
                            <>
                                <div
                                    className="fixed inset-0 z-10"
                                    onClick={() => setShowMenu(false)}
                                />
                                <div className="absolute right-0 top-full mt-1 bg-background border border-border rounded-xl shadow-lg py-1 z-20 min-w-[160px]">
                                    <button
                                        className="w-full px-4 py-2 text-left text-sm hover:bg-surface flex items-center gap-2 text-text-primary"
                                        onClick={() => {
                                            onEdit?.(announcement);
                                            setShowMenu(false);
                                        }}
                                    >
                                        <Pencil className="w-4 h-4" />
                                        Edit
                                    </button>
                                    <button
                                        className="w-full px-4 py-2 text-left text-sm hover:bg-surface flex items-center gap-2 text-text-primary"
                                        onClick={() => {
                                            onTogglePin?.(announcement);
                                            setShowMenu(false);
                                        }}
                                    >
                                        {announcement.isPinned ? (
                                            <>
                                                <PinOff className="w-4 h-4" />
                                                Unpin
                                            </>
                                        ) : (
                                            <>
                                                <Pin className="w-4 h-4" />
                                                Pin
                                            </>
                                        )}
                                    </button>
                                    <button
                                        className="w-full px-4 py-2 text-left text-sm hover:bg-surface flex items-center gap-2 text-red-600"
                                        onClick={() => {
                                            onDelete?.(announcement);
                                            setShowMenu(false);
                                        }}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="px-5 py-4">
                <p className="text-text-secondary text-sm leading-relaxed line-clamp-3">
                    {announcement.content}
                </p>

                {/* Delivery Status */}
                {(hasSmsDelivery || hasEmailDelivery) && (
                    <div className="mt-4 flex items-center gap-3">
                        <span className="text-xs text-text-muted">Sent via:</span>
                        {hasSmsDelivery && (
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                                <MessageSquare className="w-3 h-3" />
                                SMS
                                <Check className="w-3 h-3" />
                            </span>
                        )}
                        {hasEmailDelivery && (
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-full">
                                <Mail className="w-3 h-3" />
                                Email
                                <Check className="w-3 h-3" />
                            </span>
                        )}
                    </div>
                )}
            </div>

            {/* Footer - Created by */}
            <div className="px-5 py-3 bg-surface/50 border-t border-border flex items-center justify-between text-xs text-text-muted">
                <span>By {announcement.createdBy}</span>
                {announcement.audience !== "all" && (
                    <span className="capitalize">
                        {announcement.audience === "student" ? "Students only" : "Staff only"}
                    </span>
                )}
            </div>
        </motion.div>
    );
}
