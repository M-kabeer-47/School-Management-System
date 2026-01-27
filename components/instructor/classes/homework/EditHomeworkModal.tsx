"use client";

import { useState, useEffect } from "react";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { Textarea } from "@/components/ui/Textarea";
import DateTimePicker from "@/components/ui/DateTimePicker";
import { Homework } from "@/lib/instructor/types/class-detail";

interface EditHomeworkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, updates: Partial<Homework>) => void;
  homework: Homework | null;
}

export default function EditHomeworkModal({
  isOpen,
  onClose,
  onSave,
  homework,
}: EditHomeworkModalProps) {
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState<string>("");

  useEffect(() => {
    if (homework) {
      setDescription(homework.description);
      setDeadline(homework.deadline.toISOString());
    }
  }, [homework]);

  const handleSave = () => {
    if (!homework) return;
    onSave(homework.id, {
      description,
      deadline: new Date(deadline),
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Homework"
      description="Update homework details and deadline."
      icon={<BookOpen className="w-6 h-6" />}
      maxWidth="md"
    >
      <div className="space-y-6 pt-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-primary">
            Homework Description
          </label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter homework details..."
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-text-primary mb-1.5 block">
            Deadline
          </label>
          <div className="relative z-50">
            <DateTimePicker
              value={deadline}
              onChange={setDeadline}
              placeholder="Select deadline..."
              inline
              showTime={false}
            />
          </div>
        </div>

        <div className="flex justify-end pt-4 gap-3">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!description.trim() || !deadline}
            className="bg-accent hover:bg-accent-hover text-white"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </Modal>
  );
}
