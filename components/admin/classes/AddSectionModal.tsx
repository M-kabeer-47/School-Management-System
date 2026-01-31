"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { Plus, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Combobox } from "@/components/ui/Combobox";
import { teachers } from "@/lib/admin/mock-data/teachers";

interface AddSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  grade: string;
}

export default function AddSectionModal({
  isOpen,
  onClose,
  grade,
}: AddSectionModalProps) {
  const [formData, setFormData] = useState({
    sectionName: "",
    room: "",
    classTeacherId: "",
    capacity: "30",
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
      capacity: "30",
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Add Section to ${grade}`}
      description="Create a new section and assign a class teacher."
      maxWidth="md"
      icon={<Users className="w-6 h-6 text-accent" />}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-secondary">
              Section Name <span className="text-red-500">*</span>
            </label>
            <Input
              value={formData.sectionName}
              onChange={(e) =>
                setFormData({ ...formData, sectionName: e.target.value })
              }
              placeholder="e.g. A, Rose, Blue"
              required
              autoFocus
            />
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

        <div className="space-y-2">
          <label className="text-sm font-medium text-text-secondary">
            Class Teacher <span className="text-red-500">*</span>
          </label>
          <Combobox
            options={teacherOptions}
            value={formData.classTeacherId}
            onChange={(val) =>
              setFormData({ ...formData, classTeacherId: val })
            }
            placeholder="Select a teacher..."
            searchPlaceholder="Search by name or department..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-text-secondary">
            Student Capacity
          </label>
          <Input
            type="number"
            value={formData.capacity}
            onChange={(e) =>
              setFormData({ ...formData, capacity: e.target.value })
            }
            placeholder="Max students"
            min={1}
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-border mt-6">
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
          >
            {loading ? "Creating..." : "Create Section"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
