"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { AlertTriangle, X } from "lucide-react";

interface DeleteConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
}

export function DeleteConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
}: DeleteConfirmModalProps) {
    if (!isOpen) return null;

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
                    <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-text-primary">
                            Delete Announcement?
                        </h3>
                        <p className="text-sm text-text-muted mt-1">
                            Are you sure you want to delete &quot;{title}&quot;? This action cannot be undone.
                        </p>
                    </div>
                </div>
                <div className="flex gap-3 mt-6">
                    <Button variant="outline" className="flex-1" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                        onClick={onConfirm}
                    >
                        Delete
                    </Button>
                </div>
            </motion.div>
        </div>
    );
}
