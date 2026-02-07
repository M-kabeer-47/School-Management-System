"use client";

import { Plus, X, List, Save } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { SavedInstructionTemplate } from "@/components/admin/exams/admit-card";

interface InstructionsManagerProps {
  customInstructions: string[];
  newInstruction: string;
  templateName: string;
  savedTemplatesCount: number;
  onNewInstructionChange: (value: string) => void;
  onTemplateNameChange: (value: string) => void;
  onAddInstruction: () => void;
  onRemoveInstruction: (index: number) => void;
  onSaveAsTemplate: () => void;
  onOpenSavedTemplates: () => void;
}

export function InstructionsManager({
  customInstructions,
  newInstruction,
  templateName,
  savedTemplatesCount,
  onNewInstructionChange,
  onTemplateNameChange,
  onAddInstruction,
  onRemoveInstruction,
  onSaveAsTemplate,
  onOpenSavedTemplates,
}: InstructionsManagerProps) {
  return (
    <div className="bg-surface border border-border rounded-2xl p-6">
      <h3 className="font-bold text-text-primary mb-2 flex items-center gap-2">
        <List className="w-5 h-5 text-accent" />
        Candidate Instructions
      </h3>
      <p className="text-sm text-text-secondary mb-6">
        Customize instructions that appear on the admit card.
      </p>

      {/* Choose from Saved Instructions Button */}
      {savedTemplatesCount > 0 && (
        <div className="mb-6 flex justify-end">
          <Button
            onClick={onOpenSavedTemplates}
            variant="outline"
            className="min-w-fit"
          >
            <List className="w-4 h-4" />
            Choose from Saved Instructions ({savedTemplatesCount})
          </Button>
        </div>
      )}

      {/* Add New Instruction */}

      <div className="flex gap-2 mb-6 items-end">
        <Input
          type="text"
          label="Add Instruction"
          value={newInstruction}
          onChange={(e) => onNewInstructionChange(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && onAddInstruction()}
          placeholder="Enter instruction text..."
        />
        <Button
          onClick={onAddInstruction}
          disabled={!newInstruction.trim()}
          className="relative top-[-3px]"
        >
          <Plus className="w-4 h-4" />
          Add
        </Button>
      </div>

      {/* Current Instructions List */}
      <div className="mb-6">
        <label className="text-sm font-medium text-text-primary mb-2 block">
          Current Instructions ({customInstructions.length})
        </label>
        <div className="space-y-2 max-h-[300px] overflow-y-auto">
          {customInstructions.length === 0 ? (
            <p className="text-sm text-text-secondary italic py-4 text-center">
              No instructions added yet
            </p>
          ) : (
            customInstructions.map((instruction, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-background border border-border rounded-lg group"
              >
                <span className="text-sm font-medium text-text-secondary shrink-0">
                  {index + 1}.
                </span>
                <p className="flex-1 text-sm text-text-primary">
                  {instruction}
                </p>
                <button
                  onClick={() => onRemoveInstruction(index)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-600 p-1"
                  title="Remove instruction"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Save Template Section */}
      <div className="border-t border-border pt-6">
        <label className="text-sm font-medium text-text-primary mb-2 block">
          Save Current Instructions
        </label>
        <p className="text-xs text-text-secondary mb-3">
          Save your current instruction set to reuse later
        </p>
        <div className="flex gap-2">
          <Input
            type="text"
            value={templateName}
            onChange={(e) => onTemplateNameChange(e.target.value)}
            placeholder="Enter template name..."
            className="flex-1"
          />
          <Button
            onClick={onSaveAsTemplate}
            disabled={!templateName.trim() || customInstructions.length === 0}
            className="relative top-[2px]"
          >
            <Save className="w-4 h-4" />
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
