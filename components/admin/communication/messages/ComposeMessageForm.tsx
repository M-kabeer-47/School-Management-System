"use client";

import { MessageSquare, Mail, Send } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { MessageChannel } from "@/lib/admin/types/messages";
import { cn } from "@/lib/common/utils";

interface ComposeMessageFormProps {
    subject: string;
    content: string;
    channel: MessageChannel;
    onSubjectChange: (value: string) => void;
    onContentChange: (value: string) => void;
    onChannelChange: (channel: MessageChannel) => void;
    onSend: () => void;
    disabled?: boolean;
}

const SMS_CHAR_LIMIT = 160;

export function ComposeMessageForm({
    subject,
    content,
    channel,
    onSubjectChange,
    onContentChange,
    onChannelChange,
    onSend,
    disabled,
}: ComposeMessageFormProps) {
    const smsSegments = Math.ceil(content.length / SMS_CHAR_LIMIT);
    const showSmsWarning = (channel === "sms" || channel === "both") && content.length > SMS_CHAR_LIMIT;

    const channelOptions: { value: MessageChannel; label: string; icon: any }[] = [
        { value: "sms", label: "SMS Only", icon: MessageSquare },
        { value: "email", label: "Email Only", icon: Mail },
        { value: "both", label: "SMS & Email", icon: Send },
    ];

    return (
        <div className="space-y-5">
            {/* Channel Selection */}
            <div>
                <label className="text-sm font-medium text-text-secondary mb-2 block">
                    Send via
                </label>
                <div className="flex gap-2 flex-wrap">
                    {channelOptions.map((opt) => (
                        <button
                            key={opt.value}
                            type="button"
                            onClick={() => onChannelChange(opt.value)}
                            className={cn(
                                "px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2",
                                channel === opt.value
                                    ? "bg-accent text-white"
                                    : "bg-surface border border-border text-text-secondary hover:border-accent/50 hover:text-accent"
                            )}
                        >
                            <opt.icon className="w-4 h-4" />
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Subject (for email) */}
            {(channel === "email" || channel === "both") && (
                <div>
                    <label className="text-sm font-medium text-text-secondary mb-2 block">
                        Subject
                    </label>
                    <Input
                        value={subject}
                        onChange={(e) => onSubjectChange(e.target.value)}
                        placeholder="Enter message subject"
                    />
                </div>
            )}

            {/* Message Content */}
            <div>
                <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-text-secondary">
                        Message
                    </label>
                    {(channel === "sms" || channel === "both") && (
                        <span
                            className={cn(
                                "text-xs font-medium",
                                showSmsWarning ? "text-orange-600 dark:text-orange-400" : "text-text-muted"
                            )}
                        >
                            {content.length} / {SMS_CHAR_LIMIT} chars
                            {showSmsWarning && ` (${smsSegments} SMS)`}
                        </span>
                    )}
                </div>
                <Textarea
                    value={content}
                    onChange={(e) => onContentChange(e.target.value)}
                    placeholder="Type your message here..."
                    rows={6}
                    className="resize-none"
                />
                {showSmsWarning && (
                    <p className="text-xs text-orange-600 dark:text-orange-400 mt-2">
                        Message exceeds 160 characters and will be sent as {smsSegments} SMS segments.
                    </p>
                )}
            </div>

            {/* Send Button */}
            <Button
                onClick={onSend}
                disabled={disabled || !content.trim()}
                className="w-full"
                size="lg"
            >
                <Send className="w-4 h-4" />
                Send Message
            </Button>
        </div>
    );
}
