"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Send, CheckCircle } from "lucide-react";
import {
    RecipientSelector,
    ComposeMessageForm,
    MessageHistoryCard,
    ConfirmSendModal,
} from "@/components/admin/communication/messages";
import {
    sentMessages,
    sampleStudents,
} from "@/lib/admin/mock-data/messages";
import {
    MessageRecipient,
    MessageChannel,
    SentMessage,
} from "@/lib/admin/types/messages";

export default function MessagesPage() {
    // Form state
    const [selectedRecipients, setSelectedRecipients] = useState<MessageRecipient[]>([]);
    const [sendToAll, setSendToAll] = useState(false);
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const [channel, setChannel] = useState<MessageChannel>("sms");

    // UI state
    const [showConfirm, setShowConfirm] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [messages, setMessages] = useState(sentMessages);

    const recipientCount = sendToAll ? sampleStudents.length : selectedRecipients.length;
    const canSend = content.trim() && (sendToAll || selectedRecipients.length > 0);

    const handleSend = () => {
        if (canSend) {
            setShowConfirm(true);
        }
    };

    const confirmSend = async () => {
        setIsSending(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Add new message to history
        const newMessage: SentMessage = {
            id: `msg-${Date.now()}`,
            subject: channel === "sms" ? undefined : subject,
            content,
            channel,
            recipientType: sendToAll ? "all" : "selected",
            recipientCount,
            recipients: sendToAll ? undefined : selectedRecipients,
            sentBy: "Admin",
            sentAt: new Date().toISOString(),
            delivery: {
                sms: channel === "sms" || channel === "both" ? { sent: true, delivered: true, sentAt: new Date().toISOString() } : undefined,
                email: channel === "email" || channel === "both" ? { sent: true, delivered: true, sentAt: new Date().toISOString() } : undefined,
            },
        };

        setMessages([newMessage, ...messages]);
        setIsSending(false);
        setShowConfirm(false);
        setShowSuccess(true);

        // Reset form
        setSelectedRecipients([]);
        setSendToAll(false);
        setSubject("");
        setContent("");
        setChannel("sms");

        setTimeout(() => setShowSuccess(false), 3000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
        >
            {/* Success Toast */}
            {showSuccess && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="fixed top-20 right-4 z-50 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2"
                >
                    <CheckCircle className="w-5 h-5" />
                    Message sent successfully!
                </motion.div>
            )}

            {/* Page Header */}
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-text-primary font-heading flex items-center gap-3">
                    Messages
                    <MessageSquare className="w-7 h-7 text-accent" />
                </h1>
                <p className="text-text-secondary mt-1">
                    Send SMS and Email messages to students and guardians
                </p>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Compose Section */}
                <div className="bg-background rounded-2xl border border-border shadow-sm">
                    <div className="p-5 border-b border-border">
                        <h2 className="font-semibold text-text-primary flex items-center gap-2">
                            <Send className="w-5 h-5 text-accent" />
                            Compose Message
                        </h2>
                    </div>
                    <div className="p-5 space-y-6">
                        <RecipientSelector
                            selectedRecipients={selectedRecipients}
                            onSelectionChange={setSelectedRecipients}
                            sendToAll={sendToAll}
                            onSendToAllChange={setSendToAll}
                        />
                        <ComposeMessageForm
                            subject={subject}
                            content={content}
                            channel={channel}
                            onSubjectChange={setSubject}
                            onContentChange={setContent}
                            onChannelChange={setChannel}
                            onSend={handleSend}
                            disabled={!canSend}
                        />
                    </div>
                </div>

                {/* History Section */}
                <div className="bg-background rounded-2xl border border-border shadow-sm">
                    <div className="p-5 border-b border-border">
                        <h2 className="font-semibold text-text-primary">Recent Messages</h2>
                    </div>
                    <div className="p-5 space-y-3 max-h-[600px] overflow-y-auto">
                        {messages.length > 0 ? (
                            messages.map((message, index) => (
                                <MessageHistoryCard
                                    key={message.id}
                                    message={message}
                                    index={index}
                                />
                            ))
                        ) : (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center mx-auto mb-4">
                                    <MessageSquare className="w-8 h-8 text-text-muted" />
                                </div>
                                <h3 className="font-medium text-text-primary">No messages yet</h3>
                                <p className="text-sm text-text-muted mt-1">
                                    Compose your first message to get started
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Confirm Modal */}
            <ConfirmSendModal
                isOpen={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={confirmSend}
                recipientCount={recipientCount}
                channel={channel}
                isLoading={isSending}
            />
        </motion.div>
    );
}
