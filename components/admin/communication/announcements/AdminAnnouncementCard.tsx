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
    MessageSquare,
    Check,
} from "lucide-react";
import { cn } from "@/lib/common/utils";
import { AdminAnnouncement } from "@/lib/admin/types/announcements";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

// Simple WhatsApp icon component
function WhatsAppIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
    );
}

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
    const hasWhatsappDelivery = announcement.delivery?.whatsapp.sent;

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
                {(hasSmsDelivery || hasWhatsappDelivery) && (
                    <div className="mt-4 flex items-center gap-3">
                        <span className="text-xs text-text-muted">Sent via:</span>
                        {hasSmsDelivery && (
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                                <MessageSquare className="w-3 h-3" />
                                SMS
                                <Check className="w-3 h-3" />
                            </span>
                        )}
                        {hasWhatsappDelivery && (
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                                <WhatsAppIcon className="w-3 h-3" />
                                WhatsApp
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
