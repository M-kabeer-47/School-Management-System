"use client";

import { useState, useEffect } from "react";
import { BookOpen } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface AddSubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string) => void;
}

export function AddSubjectModal({
  isOpen,
  onClose,
  onAdd,
}: AddSubjectModalProps) {
  const [name, setName] = useState("");

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setName("");
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name.trim());
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Subject"
      description="Enter the name of the new subject"
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="subject-name"
            className="block text-sm font-medium text-text-secondary mb-2"
          >
            Subject Name
          </label>
          <Input
            id="subject-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Mathematics, English, Science"
            autoFocus
          />
        </div>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            // type="default"
            disabled={!name.trim()}
            className="bg-accent hover:bg-accent-hover text-white"
          >
            Add Subject
          </Button>
        </div>
      </form>
    </Modal>
  );
}
