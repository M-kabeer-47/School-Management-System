"use client";

import { useState, useEffect } from "react";
import {
  LayoutGrid,
  GraduationCap,
  BookOpen,
  ChevronRight,
  Check,
} from "lucide-react";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { subjectDefinitions } from "@/lib/admin/mock-data/settings";

interface AddWingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string, classes: string[], subjectIds: string[]) => void;
  takenClasses: string[];
}

const ALL_CLASSES = ["1", "2", "3", "4", "5", "6", "7", "8"];

type Step = "name" | "classes" | "subjects";

export function AddWingModal({
  isOpen,
  onClose,
  onAdd,
  takenClasses,
}: AddWingModalProps) {
  const [step, setStep] = useState<Step>("name");
  const [name, setName] = useState("");
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep("name");
      setName("");
      setSelectedClasses([]);
      setSelectedSubjects([]);
    }
  }, [isOpen]);

  const toggleClass = (cls: string) => {
    setSelectedClasses((prev) =>
      prev.includes(cls) ? prev.filter((c) => c !== cls) : [...prev, cls],
    );
  };

  const toggleSubject = (id: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const handleNext = () => {
    if (step === "name" && name.trim()) {
      setStep("classes");
    } else if (step === "classes" && selectedClasses.length > 0) {
      setStep("subjects");
    }
  };

  const handleBack = () => {
    if (step === "classes") setStep("name");
    else if (step === "subjects") setStep("classes");
  };

  const handleSubmit = () => {
    if (name.trim() && selectedClasses.length > 0) {
      onAdd(name.trim(), selectedClasses, selectedSubjects);
      onClose();
    }
  };

  const availableClasses = ALL_CLASSES.filter((c) => !takenClasses.includes(c));

  const stepNumber = step === "name" ? 1 : step === "classes" ? 2 : 3;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Wing"
      description={
        step === "name"
          ? "Step 1: Give your wing a name"
          : step === "classes"
            ? "Step 2: Select classes for this wing"
            : "Step 3: Choose subjects taught in this wing"
      }
      maxWidth="md"
    >
      <div className="space-y-6">
        {/* Progress Indicator */}
        <div className="flex items-center justify-between gap-2">
          {[1, 2, 3].map((n) => (
            <div key={n} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  n < stepNumber
                    ? "bg-accent text-white"
                    : n === stepNumber
                      ? "bg-accent/10 text-accent border-2 border-accent"
                      : "bg-surface-active text-text-muted"
                }`}
              >
                {n < stepNumber ? <Check className="w-4 h-4" /> : n}
              </div>
              {n < 3 && (
                <div
                  className={`min-[500px]:w-34 w-22 h-0.5 ${
                    n < stepNumber ? "bg-accent" : "bg-border"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Name */}
        {step === "name" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Wing Name
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Junior, Middle, Senior"
                autoFocus
              />
              <p className="text-xs text-text-muted mt-2">
                Wings help you group similar classes together (e.g., Primary
                1-2, Middle 3-5)
              </p>
            </div>
          </div>
        )}

        {/* Step 2: Classes */}
        {step === "classes" && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-text-muted">
              <GraduationCap className="w-4 h-4" />
              <span>Select one or more classes</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {ALL_CLASSES.map((cls) => {
                const isSelected = selectedClasses.includes(cls);
                const isTaken = takenClasses.includes(cls);
                return (
                  <button
                    key={cls}
                    onClick={() => !isTaken && toggleClass(cls)}
                    disabled={isTaken}
                    className={`p-3 rounded-xl text-center font-semibold transition-all ${
                      isSelected
                        ? "bg-accent text-white shadow-md shadow-accent/25"
                        : isTaken
                          ? "bg-surface-active text-text-muted/40 cursor-not-allowed"
                          : "bg-surface-active text-text-secondary hover:bg-accent/10 hover:text-accent"
                    }`}
                  >
                    <div className="text-lg">{cls}</div>
                    <div className="text-xs opacity-70">Class</div>
                  </button>
                );
              })}
            </div>
            {availableClasses.length === 0 && (
              <p className="text-sm text-amber-600 dark:text-amber-400">
                All classes are already assigned to other wings
              </p>
            )}
          </div>
        )}

        {/* Step 3: Subjects */}
        {step === "subjects" && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-text-muted">
              <BookOpen className="w-4 h-4" />
              <span>Select subjects for {name} Wing (optional)</span>
            </div>
            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
              {subjectDefinitions.map((sub) => {
                const isSelected = selectedSubjects.includes(sub.id);
                return (
                  <button
                    key={sub.id}
                    onClick={() => toggleSubject(sub.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      isSelected
                        ? "bg-accent/10 text-accent border border-accent/30"
                        : "bg-surface-active text-text-secondary hover:bg-accent/5 hover:text-accent"
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 inline mr-1" />}
                    {sub.name}
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-text-muted">
              Selected: {selectedSubjects.length} subjects
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-between pt-4 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={step === "name" ? onClose : handleBack}
          >
            {step === "name" ? "Cancel" : "Back"}
          </Button>

          {step === "subjects" ? (
            <Button
              onClick={handleSubmit}
              disabled={!name.trim() || selectedClasses.length === 0}
              className="bg-accent hover:bg-accent-hover text-white gap-2"
            >
              <Check className="w-4 h-4" /> Create Wing
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={
                (step === "name" && !name.trim()) ||
                (step === "classes" && selectedClasses.length === 0)
              }
              className="bg-accent hover:bg-accent-hover text-white gap-2"
            >
              Continue <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}
