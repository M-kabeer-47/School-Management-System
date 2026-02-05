"use client";

import { Button } from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import type { SavedInstructionTemplate } from "@/components/admin/exams/admit-card";

interface SavedInstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedTemplates: SavedInstructionTemplate[];
  onLoadTemplate: (instructions: string[]) => void;
  onDeleteTemplate: (index: number) => void;
}

export function SavedInstructionsModal({
  isOpen,
  onClose,
  savedTemplates,
  onLoadTemplate,
  onDeleteTemplate,
}: SavedInstructionsModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Choose Saved Instructions"
      description="Select a saved instruction template to load"
      maxWidth="2xl"
    >
      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
        {savedTemplates.length === 0 ? (
          <p className="text-sm text-text-secondary italic py-8 text-center">
            No saved instruction templates yet
          </p>
        ) : (
          savedTemplates.map((template, index) => (
            <div
              key={index}
              className="p-4 bg-background border border-border rounded-lg hover:border-accent/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1">
                  <p className="text-base font-semibold text-text-primary mb-1">
                    {template.name}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {template.instructions.length} instruction
                    {template.instructions.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      onLoadTemplate(template.instructions);
                      onClose();
                    }}
                    size="sm"
                  >
                    Load
                  </Button>
                  <Button
                    onClick={() => onDeleteTemplate(index)}
                    variant="secondary"
                    size="sm"
                    className="text-red-500 hover:text-red-600"
                  >
                    Delete
                  </Button>
                </div>
              </div>

              {/* Instruction Preview */}
              <div className="pl-3 border-l-2 border-border space-y-1.5">
                {template.instructions.slice(0, 3).map((instruction, idx) => (
                  <div key={idx} className="flex gap-2 text-xs">
                    <span className="text-text-secondary font-medium shrink-0">
                      {idx + 1}.
                    </span>
                    <p className="text-text-primary line-clamp-1">{instruction}</p>
                  </div>
                ))}
                {template.instructions.length > 3 && (
                  <p className="text-xs text-text-secondary italic">
                    +{template.instructions.length - 3} more instruction
                    {template.instructions.length - 3 !== 1 ? "s" : ""}...
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </Modal>
  );
}
