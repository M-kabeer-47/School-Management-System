"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { ClassSelect } from "./ClassSelect";
import { ArrowUpCircle } from "lucide-react";
import {
  getUniqueClasses,
  getUniqueSections,
} from "@/lib/admin/mock-data/students";

interface PromoteStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCount: number;
  onPromote: (targetClass: string, targetSection: string) => void;
}

export function PromoteStudentModal({
  isOpen,
  onClose,
  selectedCount,
  onPromote,
}: PromoteStudentModalProps) {
  const [targetClass, setTargetClass] = useState("all");
  const [targetSection, setTargetSection] = useState("all");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get available options (in a real app, these might be fetched or passed in)
  // For now, using the mock helpers but filtering out "all" if needed or keeping them
  const uniqueClasses = getUniqueClasses();
  const uniqueSections = getUniqueSections();

  const handlePromote = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onPromote(targetClass, targetSection);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Promote Students"
      description={`Promote ${selectedCount} selected student${selectedCount !== 1 ? "s" : ""} to a new class.`}
      icon={<ArrowUpCircle className="w-6 h-6 text-accent" />}
      maxWidth="md"
    >
      <div className="space-y-6">
        <div className="bg-accent/5 p-4 rounded-xl border border-accent/10">
          <p className="text-sm text-text-secondary">
            You are about to promote{" "}
            <span className="font-bold text-text-primary">{selectedCount}</span>{" "}
            students. Select the target class and section below.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <ClassSelect
            label="Target Class"
            value={targetClass}
            onChange={setTargetClass}
            options={uniqueClasses}
            placeholder="Select Class"
            allLabel="Select Class"
            side="top"
          />
          <ClassSelect
            label="Target Section"
            value={targetSection}
            onChange={setTargetSection}
            options={uniqueSections}
            placeholder="Select Section"
            allLabel="Select Section"
            side="top"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            onClick={handlePromote}
            disabled={
              isSubmitting || targetClass === "all" || targetSection === "all"
            }
          >
            {isSubmitting ? "Promoting..." : "Promote Students"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
