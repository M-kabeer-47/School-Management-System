"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Send, AlertTriangle, MessageSquare, Mail, Users, X } from "lucide-react";
import { MessageChannel } from "@/lib/admin/types/messages";

interface ConfirmSendModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    recipientCount: number;
    channel: MessageChannel;
    isLoading?: boolean;
}

export function ConfirmSendModal({
    isOpen,
    onClose,
    onConfirm,
    recipientCount,
    channel,
    isLoading,
}: ConfirmSendModalProps) {
    if (!isOpen) return null;

    const getChannelText = () => {
        switch (channel) {
            case "sms":
                return "SMS";
            case "email":
                return "Email";
            case "both":
                return "SMS and Email";
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative bg-background border border-border rounded-2xl shadow-xl p-6 max-w-md w-full"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-text-muted hover:text-text-primary"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Send className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-text-primary">
                            Confirm Sending
                        </h3>
                        <p className="text-sm text-text-muted mt-1">
                            You are about to send a message to:
                        </p>
                    </div>
                </div>

                <div className="mt-4 space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-surface rounded-xl">
                        <Users className="w-5 h-5 text-accent" />
                        <span className="text-sm font-medium text-text-primary">
                            {recipientCount} recipient{recipientCount !== 1 ? "s" : ""}
                        </span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-surface rounded-xl">
                        {channel === "sms" && <MessageSquare className="w-5 h-5 text-green-600 dark:text-green-400" />}
                        {channel === "email" && <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                        {channel === "both" && <Send className="w-5 h-5 text-accent" />}
                        <span className="text-sm font-medium text-text-primary">
                            via {getChannelText()}
                        </span>
                    </div>
                </div>

                <div className="mt-4 p-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl">
                    <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-orange-600 dark:text-orange-400 mt-0.5" />
                        <p className="text-xs text-orange-700 dark:text-orange-400">
                            This action cannot be undone. Messages will be sent immediately.
                        </p>
                    </div>
                </div>

                <div className="flex gap-3 mt-6">
                    <Button
                        variant="outline"
                        className="flex-1"
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="flex-1"
                        onClick={onConfirm}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            "Sending..."
                        ) : (
                            <>
                                <Send className="w-4 h-4" />
                                Send Now
                            </>
                        )}
                    </Button>
                </div>
            </motion.div>
        </div>
    );
}
