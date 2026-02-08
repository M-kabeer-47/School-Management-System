"use client";

import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface AddTermDefinitionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string) => void;
}

export function AddTermDefinitionModal({
  isOpen,
  onClose,
  onAdd,
}: AddTermDefinitionModalProps) {
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
      title="Add Term"
      description="Define a new term name for your academic calendar"
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="term-name"
            className="block text-sm font-medium text-text-secondary mb-2"
          >
            Term Name
          </label>
          <Input
            id="term-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. First Term, Mid Term, Final Term"
            autoFocus
          />
          <p className="text-xs text-text-muted mt-2">
            This name will be available when configuring your academic year
            schedule.
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
            Add Term
          </Button>
        </div>
      </form>
    </Modal>
  );
}
