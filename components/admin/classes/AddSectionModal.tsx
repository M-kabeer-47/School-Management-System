"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { Users, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Combobox } from "@/components/ui/Combobox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { teachers } from "@/lib/admin/mock-data/teachers";

interface AddSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  grade: string;
}

const SECTION_OPTIONS = [
  "Section A",
  "Section B",
  "Section C",
  "Section D",
  "Section E",
  "Red",
  "Blue",
  "Green",
  "Yellow",
];

export default function AddSectionModal({
  isOpen,
  onClose,
  grade,
}: AddSectionModalProps) {
  const [formData, setFormData] = useState({
    sectionName: "",
    room: "",
    classTeacherId: "",
  });
  const [loading, setLoading] = useState(false);

  const teacherOptions = teachers.map((t) => ({
    value: t.id,
    label: t.name,
    avatar: t.avatar,
    subtitle: t.department,
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Submitting new section:", { ...formData, grade });
    setLoading(false);
    onClose();
    // Reset form
    setFormData({
      sectionName: "",
      room: "",
      classTeacherId: "",
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Add Section to ${grade}`}
      description="Create a new section and assign a class teacher."
      maxWidth="2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-secondary flex items-center gap-2">
                <LayoutGrid className="w-4 h-4" />
                Section Name <span className="text-red-500">*</span>
              </label>
              <Select
                value={formData.sectionName}
                onValueChange={(val) =>
                  setFormData({ ...formData, sectionName: val })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a section" />
                </SelectTrigger>
                <SelectContent>
                  {SECTION_OPTIONS.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-secondary flex items-center gap-2">
                <Users className="w-4 h-4" />
                Class Teacher <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Combobox
                  options={teacherOptions}
                  value={formData.classTeacherId}
                  onChange={(val) =>
                    setFormData({ ...formData, classTeacherId: val })
                  }
                  placeholder="Select a class teacher..."
                  searchPlaceholder="Search by name or department..."
                  dropdownClassName="max-h-80"
                />
              </div>
              <p className="text-xs text-text-muted mt-2">
                Assigning a class teacher will give them admin rights for this
                section.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-secondary">
                Room Number <span className="text-red-500">*</span>
              </label>
              <Input
                value={formData.room}
                onChange={(e) =>
                  setFormData({ ...formData, room: e.target.value })
                }
                placeholder="e.g. 101"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t border-border">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={
              loading || !formData.sectionName || !formData.classTeacherId
            }
            className="bg-accent hover:bg-accent-hover text-white min-w-[120px]"
          >
            {loading ? "Creating..." : "Create Section"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
