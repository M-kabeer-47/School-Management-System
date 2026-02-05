"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Send, AlertTriangle, MessageSquare, Users, X } from "lucide-react";
import { MessageChannel } from "@/lib/admin/types/messages";

// Simple WhatsApp icon component
function WhatsAppIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
    );
}

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
            case "whatsapp":
                return "WhatsApp";
            case "both":
                return "SMS and WhatsApp";
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
                        {channel === "whatsapp" && <WhatsAppIcon className="w-5 h-5 text-green-600 dark:text-green-400" />}
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
