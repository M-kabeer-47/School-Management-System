"use client";

import { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import { Textarea } from "@/components/ui/Textarea";
import DateTimePicker from "@/components/ui/DateTimePicker";
import { Button } from "@/components/ui/Button";
import { BookOpen } from "lucide-react";

interface AddHomeworkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAssign: (data: { description: string; deadline: Date }) => void;
}

export const AddHomeworkModal = ({
  isOpen,
  onClose,
  onAssign,
}: AddHomeworkModalProps) => {
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState<Date | undefined>(undefined);

  // Set default deadline to next day 5 PM when opening
  useEffect(() => {
    if (isOpen) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(17, 0, 0, 0); // Default to 5 PM
      setDeadline(tomorrow);
      setDescription("");
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (description && deadline) {
      onAssign({ description, deadline });
      onClose();
    }
  };

  const isFormValid = description.trim().length > 0 && !!deadline;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Homework"
      description="Assign a new task to the class."
      icon={<BookOpen className="w-5 h-5" />}
      maxWidth="md"
    >
      <div className="space-y-6">
        {/* Description Field */}
        <div>
          <Textarea
            label="Homework Description"
            placeholder="e.g. Solve exercise 4, page 21..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            autoFocus
            className="h-32"
          />
        </div>

        {/* Deadline Field */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1.5">
            Submission Deadline
          </label>
          <div className="w-full">
            <DateTimePicker
              value={deadline ? deadline.toISOString() : ""}
              onChange={(date) => setDeadline(new Date(date))}
              placeholder="Select deadline..."
              inline
              showTime={false}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className="w-full sm:w-auto"
          >
            Assign Homework
          </Button>
        </div>
      </div>
    </Modal>
  );
};
