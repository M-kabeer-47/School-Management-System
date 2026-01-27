"use client";

import { X, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  itemName?: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  variant?: "danger" | "warning" | "default";
}

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  itemName,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isLoading = false,
  variant = "danger",
}: ConfirmDialogProps) {
  // if (!isOpen) return null; // Handled by AnimatePresence for exit animation

  const handleConfirm = () => {
    onConfirm();
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "danger":
        return {
          icon: "text-error",
          iconBg: "bg-error/10",
          button: "bg-error hover:bg-error-hover text-white",
        };
      case "warning":
        return {
          icon: "text-warning",
          iconBg: "bg-warning/10",
          button: "bg-warning hover:bg-warning-hover text-white",
        };
      default:
        return {
          icon: "text-accent",
          iconBg: "bg-accent/10",
          button: "bg-accent hover:bg-accent-hover text-white",
        };
    }
  };

  const styles = getVariantStyles();
  const isDeleteFolder = title.toLowerCase() === "delete folder"; // Keeping valid logic from snippet

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.16 }}
            className="bg-surface rounded-2xl shadow-xl w-full max-w-md border border-border overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-surface-hover/30">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full ${styles.iconBg} flex items-center justify-center flex-shrink-0`}
                >
                  <AlertTriangle className={`w-5 h-5 ${styles.icon}`} />
                </div>
                <h2 className="text-lg font-bold text-text-primary font-heading">
                  {title}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-surface-active transition-colors text-text-muted hover:text-text-primary"
                disabled={isLoading}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-6">
              <p className="text-text-secondary text-sm leading-relaxed">
                {message}
                {itemName && (
                  <span className="font-bold text-text-primary">
                    {" " + itemName + "?"}
                  </span>
                )}
                {isDeleteFolder &&
                  " All content inside this folder will also be deleted."}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 p-4 border-t border-border bg-surface-hover/30">
              <Button
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
                className="min-w-[100px]"
              >
                {cancelText}
              </Button>
              <Button
                onClick={handleConfirm}
                disabled={isLoading}
                className={`${styles.button} min-w-[100px] shadow-sm`}
              >
                {isLoading ? (
                  <LoadingSpinner size="sm" text="Please wait..." />
                ) : (
                  confirmText
                )}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
