"use client";

import { useState, useEffect } from "react";
import { Layers } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface AddSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string) => void;
}

export function AddSectionModal({
  isOpen,
  onClose,
  onAdd,
}: AddSectionModalProps) {
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
      title="Add Section"
      description="Enter the name of the new section"
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="section-name"
            className="block text-sm font-medium text-text-secondary mb-2"
          >
            Section Name
          </label>
          <Input
            id="section-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Section A, Section B, Rose, Tulip"
            autoFocus
          />
          <p className="text-xs text-text-muted mt-2">
            Sections identify parallel groups within the same class (e.g., Class
            5-A).
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!name.trim()}
            className="bg-accent hover:bg-accent-hover text-white"
          >
            Add Section
          </Button>
        </div>
      </form>
    </Modal>
  );
}
