"use client";

import { motion } from "framer-motion";
import { MessageSquare, Users, Check, Clock } from "lucide-react";
import { SentMessage } from "@/lib/admin/types/messages";
import { cn } from "@/lib/common/utils";

// Simple WhatsApp icon component
function WhatsAppIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
    );
}

interface MessageHistoryCardProps {
    message: SentMessage;
    index?: number;
}

export function MessageHistoryCard({ message, index = 0 }: MessageHistoryCardProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getChannelBadges = () => {
        const badges = [];
        if (message.channel === "sms" || message.channel === "both") {
            const smsDelivered = message.delivery.sms?.delivered;
            badges.push(
                <span
                    key="sms"
                    className={cn(
                        "inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
                        smsDelivered
                            ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                            : "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400"
                    )}
                >
                    <MessageSquare className="w-3 h-3" />
                    SMS
                    {smsDelivered ? <Check className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                </span>
            );
        }
        if (message.channel === "whatsapp" || message.channel === "both") {
            const whatsappDelivered = message.delivery.whatsapp?.delivered;
            badges.push(
                <span
                    key="whatsapp"
                    className={cn(
                        "inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
                        whatsappDelivered
                            ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                            : "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400"
                    )}
                >
                    <WhatsAppIcon className="w-3 h-3" />
                    WhatsApp
                    {whatsappDelivered ? <Check className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                </span>
            );
        }
        return badges;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            className="bg-background rounded-xl border border-border p-4 hover:shadow-sm transition-shadow"
        >
            <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-text-primary truncate">
                        {message.content.slice(0, 50)}...
                    </h4>
                </div>
                <time className="text-xs text-text-muted flex-shrink-0">
                    {formatDate(message.sentAt)}
                </time>
            </div>

            <p className="text-sm text-text-secondary line-clamp-2 mb-3">
                {message.content}
            </p>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {getChannelBadges()}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-text-muted">
                    <Users className="w-3.5 h-3.5" />
                    <span>
                        {message.recipientType === "all" ? "All" : message.recipientCount} recipients
                    </span>
                </div>
            </div>
        </motion.div>
    );
}
