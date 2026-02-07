"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import {
  CheckCircle,
  Loader2,
  MessageSquare,
  Send,
  Users,
  Paperclip,
  X,
  FileText,
  Image,
  File,
} from "lucide-react";
import {
  AnnouncementCategory,
  AnnouncementFormData,
  AdminAnnouncement,
} from "@/lib/admin/types/announcements";
import { cn } from "@/lib/common/utils";

// Simple WhatsApp icon component
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

interface CreateAnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: AnnouncementFormData) => void;
  editingAnnouncement?: AdminAnnouncement | null;
}

const categoryOptions: { value: AnnouncementCategory; label: string }[] = [
  { value: "general", label: "General" },
  { value: "academic", label: "Academic" },
  { value: "event", label: "Event" },
  { value: "holiday", label: "Holiday" },
  { value: "urgent", label: "Urgent" },
];

export function CreateAnnouncementModal({
  isOpen,
  onClose,
  onSubmit,
  editingAnnouncement,
}: CreateAnnouncementModalProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showConfirmSend, setShowConfirmSend] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<AnnouncementFormData>({
    title: editingAnnouncement?.title || "",
    content: editingAnnouncement?.content || "",
    category: editingAnnouncement?.category || "general",
    audience: editingAnnouncement?.audience || "all",
    isPinned: editingAnnouncement?.isPinned || false,
    sendSms: false,
    sendWhatsapp: false,
    attachment: editingAnnouncement?.attachment
      ? {
          name: editingAnnouncement.attachment.name,
          type: editingAnnouncement.attachment.type,
          size: editingAnnouncement.attachment.size || "",
        }
      : undefined,
  });

  const isEditing = !!editingAnnouncement;
  const hasDeliveryOptions = formData.sendSms || formData.sendWhatsapp;

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      category: "general",
      audience: "all",
      isPinned: false,
      sendSms: false,
      sendWhatsapp: false,
      attachment: undefined,
    });
    setSaveSuccess(false);
    setShowConfirmSend(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handlePublish = () => {
    if (hasDeliveryOptions) {
      setShowConfirmSend(true);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.content) return;

    setIsSaving(true);
    setShowConfirmSend(false);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSaving(false);
    setSaveSuccess(true);

    if (onSubmit) {
      onSubmit(formData);
    }

    setTimeout(() => {
      handleClose();
    }, 1500);
  };

  const updateField = <K extends keyof AnnouncementFormData>(
    field: K,
    value: AnnouncementFormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const getFileType = (
    fileName: string,
  ): "pdf" | "image" | "document" | "other" => {
    const ext = fileName.split(".").pop()?.toLowerCase();
    if (ext === "pdf") return "pdf";
    if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext || ""))
      return "image";
    if (["doc", "docx", "xls", "xlsx", "ppt", "pptx"].includes(ext || ""))
      return "document";
    return "other";
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateField("attachment", {
        name: file.name,
        type: getFileType(file.name),
        size: formatFileSize(file.size),
      });
    }
    // Reset input so same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeAttachment = () => {
    updateField("attachment", undefined);
  };

  const getAttachmentIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return FileText;
      case "image":
        return Image;
      default:
        return File;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditing ? "Edit Announcement" : "Create Announcement"}
      maxWidth="xl"
    >
      <div className="space-y-5">
        <AnimatePresence mode="wait">
          {saveSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-8"
            >
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary">
                {isEditing
                  ? "Announcement Updated!"
                  : "Announcement Published!"}
              </h3>
              {hasDeliveryOptions && (
                <p className="text-sm text-text-muted mt-1">
                  Sent to guardians via{" "}
                  {[
                    formData.sendSms && "SMS",
                    formData.sendWhatsapp && "WhatsApp",
                  ]
                    .filter(Boolean)
                    .join(" and ")}
                </p>
              )}
            </motion.div>
          ) : showConfirmSend ? (
            <motion.div
              key="confirm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Send className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-orange-800 dark:text-orange-300">
                      Confirm Sending
                    </h4>
                    <p className="text-sm text-orange-700 dark:text-orange-400 mt-1">
                      This announcement will be sent to approximately 450
                      guardians via:
                    </p>
                    <ul className="mt-2 space-y-1">
                      {formData.sendSms && (
                        <li className="flex items-center gap-2 text-sm text-orange-700 dark:text-orange-400">
                          <MessageSquare className="w-4 h-4" />
                          SMS
                        </li>
                      )}
                      {formData.sendWhatsapp && (
                        <li className="flex items-center gap-2 text-sm text-orange-700 dark:text-orange-400">
                          <WhatsAppIcon className="w-4 h-4" />
                          WhatsApp
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowConfirmSend(false)}
                >
                  Back
                </Button>
                <Button className="flex-1" onClick={handleSubmit}>
                  <Send className="w-4 h-4" />
                  Confirm & Send
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-5"
            >
              {/* Title */}
              <Input
                value={formData.title}
                onChange={(e) => updateField("title", e.target.value)}
                placeholder="Enter announcement title"
                className="text-lg"
                label="Title"
              />

              {/* Content */}
              <Textarea
                value={formData.content}
                onChange={(e) => updateField("content", e.target.value)}
                placeholder="Write your announcement here..."
                rows={6}
                className="resize-none"
                label="Content"
              />

              {/* Type and Pin */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-text-secondary mb-2 block">
                    Type
                  </label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      updateField("category", value as AnnouncementCategory)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {categoryOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-text-secondary mb-2 block">
                    Audience
                  </label>
                  <Select
                    value={formData.audience}
                    onValueChange={(value: any) =>
                      updateField("audience", value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="student">Students Only</SelectItem>
                      <SelectItem value="instructor">Staff Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Pin Toggle */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isPinned}
                  onChange={(e) => updateField("isPinned", e.target.checked)}
                  className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
                />
                <span className="text-sm text-text-primary">
                  Pin this announcement
                </span>
              </label>

              {/* Attachment Section */}
              <div>
                <label className="text-sm font-medium text-text-secondary mb-2 block">
                  Attachment (optional)
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileSelect}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.webp"
                />
                {formData.attachment ? (
                  <div className="flex items-center gap-3 p-3 bg-surface rounded-xl border border-border">
                    {(() => {
                      const AttIcon = getAttachmentIcon(
                        formData.attachment.type,
                      );
                      return (
                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <AttIcon className="w-5 h-5 text-accent" />
                        </div>
                      );
                    })()}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text-primary truncate">
                        {formData.attachment.name}
                      </p>
                      <p className="text-xs text-text-muted">
                        {formData.attachment.size}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={removeAttachment}
                      className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-text-muted hover:text-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full p-4 border-2 border-dashed border-border rounded-xl hover:border-accent/50 hover:bg-surface/50 transition-colors flex items-center justify-center gap-2 text-text-muted hover:text-accent"
                  >
                    <Paperclip className="w-5 h-5" />
                    <span className="text-sm font-medium">Add attachment</span>
                  </button>
                )}
              </div>

              {/* Send to Guardians Section */}
              <div className="border-t border-border pt-5">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-4 h-4 text-text-muted" />
                  <h4 className="font-medium text-text-primary">
                    Send to Guardians
                  </h4>
                </div>
                <div className="bg-surface rounded-xl p-4 space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.sendSms}
                      onChange={(e) => updateField("sendSms", e.target.checked)}
                      className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
                    />
                    <MessageSquare className="w-4 h-4 text-text-muted" />
                    <span className="text-sm text-text-primary">
                      Send via SMS
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.sendWhatsapp}
                      onChange={(e) =>
                        updateField("sendWhatsapp", e.target.checked)
                      }
                      className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
                    />
                    <WhatsAppIcon className="w-4 h-4 text-text-muted" />
                    <span className="text-sm text-text-primary">
                      Send via WhatsApp
                    </span>
                  </label>
                  {hasDeliveryOptions && (
                    <p className="text-xs text-text-muted mt-2 pl-7">
                      Will be sent to all student guardians (~450 contacts)
                    </p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleClose}
                  disabled={isSaving}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  onClick={handlePublish}
                  disabled={isSaving || !formData.title || !formData.content}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Publishing...
                    </>
                  ) : (
                    <>
                      {hasDeliveryOptions && <Send className="w-4 h-4" />}
                      {isEditing ? "Update" : "Publish"}
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Modal>
  );
}
