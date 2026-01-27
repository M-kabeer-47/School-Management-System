"use client";

import { useState, useEffect } from "react";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { Textarea } from "@/components/ui/Textarea";
import { Student } from "@/lib/instructor/types/class-detail";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (studentId: string, feedback: string) => void;
  student: Student | null;
  homeworkTitle: string;
  initialFeedback?: string;
}

export default function FeedbackModal({
  isOpen,
  onClose,
  onSave,
  student,
  homeworkTitle,
  initialFeedback = "",
}: FeedbackModalProps) {
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    setFeedback(initialFeedback);
  }, [initialFeedback, isOpen]);

  const handleSave = () => {
    if (!student) return;
    onSave(student.id, feedback);
    onClose();
  };

  if (!student) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Homework Feedback"
      description="Add notes or feedback for this student."
      icon={<MessageSquare className="w-6 h-6" />}
      maxWidth="md"
    >
      <div className="space-y-6 pt-4">
        {/* Read-only Info */}
        <div className="grid grid-cols-2 gap-4 p-4 bg-surface-active/50 rounded-xl border border-border/50">
          <div>
            <span className="text-xs font-bold text-text-muted uppercase tracking-wider block mb-1">
              Student
            </span>
            <p className="font-bold text-text-primary">{student.name}</p>
          </div>
          <div>
            <span className="text-xs font-bold text-text-muted uppercase tracking-wider block mb-1">
              Homework
            </span>
            <p
              className="font-medium text-text-primary line-clamp-1"
              title={homeworkTitle}
            >
              {homeworkTitle}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-text-primary">
            Feedback / Notes (Optional)
          </label>
          <Textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="e.g. Good effort but needs to show work..."
            className="min-h-[150px]"
            autoFocus
          />
        </div>

        <div className="flex justify-end pt-4 gap-3">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-accent hover:bg-accent-hover text-white"
          >
            Save Feedback
          </Button>
        </div>
      </div>
    </Modal>
  );
}
