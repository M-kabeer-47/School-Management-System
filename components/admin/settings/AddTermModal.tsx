"use client";

import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import DateTimePicker from "@/components/ui/DateTimePicker";
import { termDefinitions } from "@/lib/admin/mock-data/settings";

interface AddTermModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (term: { name: string; startDate: string; endDate: string }) => void;
}

export function AddTermModal({ isOpen, onClose, onAdd }: AddTermModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    startDate: "",
    endDate: "",
  });

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({ name: "", startDate: "", endDate: "" });
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.startDate && formData.endDate) {
      onAdd(formData);
      onClose();
    }
  };

  const isFormValid = formData.name && formData.startDate && formData.endDate;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Term"
      description="Add a new term to the academic year schedule"
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Term Name
            </label>
            <Select
              value={formData.name}
              onValueChange={(value) =>
                setFormData({ ...formData, name: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select term name" />
              </SelectTrigger>
              <SelectContent>
                {termDefinitions.map((term) => (
                  <SelectItem key={term.id} value={term.name}>
                    {term.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Start Date
              </label>
              <DateTimePicker
                value={formData.startDate}
                onChange={(value) =>
                  setFormData({ ...formData, startDate: value })
                }
                showTime={false}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                End Date
              </label>
              <DateTimePicker
                value={formData.endDate}
                onChange={(value) =>
                  setFormData({ ...formData, endDate: value })
                }
                showTime={false}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!isFormValid}
            className="bg-accent hover:bg-accent-hover text-white"
          >
            Add Term
          </Button>
        </div>
      </form>
    </Modal>
  );
}
