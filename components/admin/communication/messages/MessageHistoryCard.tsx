"use client";

import { motion } from "framer-motion";
import { MessageSquare, Mail, Users, Check, Clock } from "lucide-react";
import { SentMessage } from "@/lib/admin/types/messages";
import { cn } from "@/lib/common/utils";

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
        if (message.channel === "email" || message.channel === "both") {
            const emailDelivered = message.delivery.email?.delivered;
            badges.push(
                <span
                    key="email"
                    className={cn(
                        "inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
                        emailDelivered
                            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                            : "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400"
                    )}
                >
                    <Mail className="w-3 h-3" />
                    Email
                    {emailDelivered ? <Check className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
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
                    {message.subject ? (
                        <h4 className="font-semibold text-text-primary truncate">
                            {message.subject}
                        </h4>
                    ) : (
                        <h4 className="font-medium text-text-primary truncate">
                            {message.content.slice(0, 50)}...
                        </h4>
                    )}
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
