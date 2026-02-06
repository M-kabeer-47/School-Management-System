"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    Mail,
    User,
    Building2,
    Calendar,
    MessageSquare,
    Send,
    AlertCircle,
    Clock,
    CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/Select";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import {
    AdminComplaint,
    ComplaintStatus,
    statusConfig,
    categoryLabels,
    sourceConfig,
} from "@/lib/admin/types/complaints";
import { cn } from "@/lib/common/utils";

interface ComplaintDetailDrawerProps {
    complaint: AdminComplaint | null;
    isOpen: boolean;
    onClose: () => void;
    onStatusChange: (complaint: AdminComplaint, newStatus: ComplaintStatus) => void;
    onSendResponse: (complaint: AdminComplaint, message: string) => void;
}

const StatusIcon = {
    pending: AlertCircle,
    "in-progress": Clock,
    resolved: CheckCircle,
};

export default function ComplaintDetailDrawer({
    complaint,
    isOpen,
    onClose,
    onStatusChange,
    onSendResponse,
}: ComplaintDetailDrawerProps) {
    const [responseText, setResponseText] = useState("");
    const [pendingStatus, setPendingStatus] = useState<ComplaintStatus | null>(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isSending, setIsSending] = useState(false);

    if (!complaint) return null;

    const status = statusConfig[complaint.status];
    const source = sourceConfig[complaint.source];
    const Icon = StatusIcon[complaint.status];

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

    const handleStatusChange = (newStatus: ComplaintStatus) => {
        if (newStatus !== complaint.status) {
            setPendingStatus(newStatus);
            setIsConfirmOpen(true);
        }
    };

    const confirmStatusChange = () => {
        if (pendingStatus) {
            onStatusChange(complaint, pendingStatus);
            setPendingStatus(null);
        }
        setIsConfirmOpen(false);
    };

    const handleSendResponse = async () => {
        if (!responseText.trim()) return;
        setIsSending(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        onSendResponse(complaint, responseText);
        setResponseText("");
        setIsSending(false);
    };

    return (
        <>
            {/* Backdrop */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                        onClick={onClose}
                    />
                )}
            </AnimatePresence>

            {/* Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full md:w-[500px] bg-background border-l border-border shadow-2xl z-50 flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between p-6 border-b border-border bg-surface/50">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span
                                        className={cn(
                                            "text-xs font-medium px-2.5 py-1 rounded-full inline-flex items-center gap-1",
                                            status.bg,
                                            status.color
                                        )}
                                    >
                                        <Icon className="w-3 h-3" />
                                        {status.label}
                                    </span>
                                    <span className="text-xs text-text-muted bg-surface-active px-2 py-0.5 rounded-full">
                                        {categoryLabels[complaint.category]}
                                    </span>
                                    <span
                                        className={cn(
                                            "text-xs font-medium px-2.5 py-1 rounded-full",
                                            source.bg,
                                            source.color
                                        )}
                                    >
                                        {source.label}
                                    </span>
                                </div>
                                <h2 className="text-lg font-bold text-text-primary font-heading">
                                    {complaint.subject}
                                </h2>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="rounded-full w-9 h-9 p-0"
                                onClick={onClose}
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto">
                            {/* Submitter Info */}
                            <div className="p-6 border-b border-border">
                                <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
                                    Submitted By
                                </h3>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                                            <User className="w-5 h-5 text-accent" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-text-primary">
                                                {complaint.submittedBy.name}
                                            </p>
                                            <p className="text-xs text-text-muted flex items-center gap-1">
                                                <Mail className="w-3 h-3" />
                                                {complaint.submittedBy.email}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-text-secondary mt-2">
                                        {complaint.submittedBy.class && (
                                            <span className="flex items-center gap-1">
                                                <Building2 className="w-3.5 h-3.5" />
                                                Class {complaint.submittedBy.class}
                                            </span>
                                        )}
                                        {complaint.submittedBy.department && (
                                            <span className="flex items-center gap-1">
                                                <Building2 className="w-3.5 h-3.5" />
                                                {complaint.submittedBy.department}
                                            </span>
                                        )}
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {formatDate(complaint.submittedAt)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Original Message */}
                            <div className="p-6 border-b border-border">
                                <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
                                    Original Complaint
                                </h3>
                                <p className="text-sm text-text-secondary leading-relaxed">
                                    {complaint.message}
                                </p>
                            </div>

                            {/* Responses */}
                            <div className="p-6 border-b border-border">
                                <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-4">
                                    Responses ({complaint.responses.length})
                                </h3>
                                {complaint.responses.length === 0 ? (
                                    <div className="bg-warning-light/30 rounded-xl p-4 text-center">
                                        <p className="text-sm text-text-secondary">
                                            ⏳ No responses yet. Be the first to respond.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {complaint.responses.map((response) => (
                                            <div
                                                key={response.id}
                                                className="bg-success-light/20 rounded-xl p-4"
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-success-light flex items-center justify-center flex-shrink-0">
                                                        <MessageSquare className="w-4 h-4 text-success" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 flex-wrap">
                                                            <span className="text-sm font-medium text-text-primary">
                                                                {response.respondedBy}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-text-secondary mt-1.5 leading-relaxed">
                                                            {response.message}
                                                        </p>
                                                        <p className="text-xs text-text-muted mt-2">
                                                            {formatDate(response.respondedAt)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Admin Actions */}
                            <div className="p-6 space-y-6">
                                {/* Status Change */}
                                <div>
                                    <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
                                        Update Status
                                    </h3>
                                    <Select
                                        value={complaint.status}
                                        onValueChange={(v) =>
                                            handleStatusChange(v as ComplaintStatus)
                                        }
                                    >
                                        <SelectTrigger className="h-11">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="pending">Pending</SelectItem>
                                            <SelectItem value="in-progress">In Progress</SelectItem>
                                            <SelectItem value="resolved">Resolved</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Send Response */}
                                <div>
                                    <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
                                        Add Response
                                    </h3>
                                    <Textarea
                                        placeholder="Type your response here..."
                                        value={responseText}
                                        onChange={(e) => setResponseText(e.target.value)}
                                        rows={4}
                                        className="mb-3"
                                    />
                                    <Button
                                        onClick={handleSendResponse}
                                        disabled={!responseText.trim() || isSending}
                                        className="w-full bg-accent hover:bg-accent-hover text-white gap-2"
                                    >
                                        <Send className="w-4 h-4" />
                                        {isSending ? "Sending..." : "Send Response"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Confirm Dialog */}
            <ConfirmDialog
                isOpen={isConfirmOpen}
                onClose={() => {
                    setIsConfirmOpen(false);
                    setPendingStatus(null);
                }}
                onConfirm={confirmStatusChange}
                title="Change Status"
                message={`Are you sure you want to change the status to "${pendingStatus ? statusConfig[pendingStatus].label : ""}"?`}
                confirmText="Change Status"
                variant="default"
            />
        </>
    );
}
