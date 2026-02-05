"use client";

import { RefObject, useEffect, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Send,
  Sparkles,
  Eye,
  Printer,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/common/utils";
import {
  AdmitCardTemplate,
  ADMIT_CARD_TEMPLATES,
  SAMPLE_ADMIT_CARD_DATA,
  ADMIT_CARD_PRINT_STYLES,
  SAVED_INSTRUCTIONS_STORAGE_KEY,
} from "@/components/admin/exams/admit-card";
import type { SavedInstructionTemplate } from "@/components/admin/exams/admit-card";
import { InstructionsManager } from "./InstructionsManager";
import { SavedInstructionsModal } from "./SavedInstructionsModal";

interface AdmitCardsTabProps {
  seriesTitle: string;
  printRef: RefObject<HTMLDivElement | null>;
  getFilterText: () => string;
}

export function AdmitCardsTab({
  seriesTitle,
  printRef,
  getFilterText,
}: AdmitCardsTabProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<
    "standard" | "compact" | "detailed" | null
  >(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Instructions state
  const [customInstructions, setCustomInstructions] = useState<string[]>([]);
  const [newInstruction, setNewInstruction] = useState("");
  const [savedTemplates, setSavedTemplates] = useState<SavedInstructionTemplate[]>([]);
  const [templateName, setTemplateName] = useState("");
  const [showSavedTemplates, setShowSavedTemplates] = useState(false);

  // Load saved templates from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(SAVED_INSTRUCTIONS_STORAGE_KEY);
    if (saved) {
      try {
        setSavedTemplates(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load saved templates", e);
      }
    }
  }, []);

  // Save templates to localStorage
  const saveTemplatesToStorage = (templates: SavedInstructionTemplate[]) => {
    localStorage.setItem(SAVED_INSTRUCTIONS_STORAGE_KEY, JSON.stringify(templates));
    setSavedTemplates(templates);
  };

  const addInstruction = () => {
    if (newInstruction.trim()) {
      setCustomInstructions([...customInstructions, newInstruction.trim()]);
      setNewInstruction("");
    }
  };

  const removeInstruction = (index: number) => {
    setCustomInstructions(customInstructions.filter((_, i) => i !== index));
  };

  const loadSavedTemplate = (instructions: string[]) => {
    setCustomInstructions(instructions);
  };

  const saveCurrentAsTemplate = () => {
    if (templateName.trim() && customInstructions.length > 0) {
      const newTemplates = [
        ...savedTemplates,
        { name: templateName.trim(), instructions: customInstructions },
      ];
      saveTemplatesToStorage(newTemplates);
      setTemplateName("");
    }
  };

  const deleteTemplate = (index: number) => {
    const newTemplates = savedTemplates.filter((_, i) => i !== index);
    saveTemplatesToStorage(newTemplates);
  };

  const handlePrint = () => {
    if (!printRef.current || !selectedTemplate) return;

    const printContent = printRef.current.innerHTML;
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Admit Cards - ${seriesTitle}</title>
          <style>${ADMIT_CARD_PRINT_STYLES}</style>
        </head>
        <body>${printContent}</body>
      </html>
    `);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 250);
  };

  const handlePublishAdmitCards = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      setIsPublished(true);
    }, 2000);
  };

  if (isPublished) {
    return (
      <div className="bg-surface border border-border rounded-3xl p-16 shadow-sm text-center space-y-8 animate-in zoom-in-95 duration-500">
        <div className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-12 h-12 text-success" />
        </div>

        <div className="max-w-md mx-auto space-y-3">
          <h3 className="text-3xl font-bold text-text-primary">
            Admit Cards Published!
          </h3>
          <p className="text-text-secondary">
            {getFilterText()} can now view and download their admit cards from
            the student portal.
          </p>
        </div>

        <div className="flex gap-4 max-w-sm mx-auto">
          <Button
            variant="outline"
            size="lg"
            className="flex-1"
            onClick={() => {
              setIsPublished(false);
              setSelectedTemplate(null);
            }}
          >
            Change Template
          </Button>
          <Link href="/admin/exams" className="flex-1">
            <Button size="lg" className="w-full">
              Done
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Publish to Students Button */}
      {selectedTemplate && (
        <div className="flex justify-end">
          <Button
            onClick={handlePublishAdmitCards}
            disabled={isPublishing}
            size="lg"
          >
            <Send className="w-4 h-4" />
            {isPublishing ? "Publishing..." : "Publish to All Students"}
          </Button>
        </div>
      )}

      {/* Template Selection */}
      <div className="bg-surface border border-border rounded-2xl p-6">
        <h3 className="font-bold text-text-primary mb-2 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-accent" />
          Choose a Template
        </h3>
        <p className="text-sm text-text-secondary mb-6">
          Select a design for the admit cards. Click to preview.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {ADMIT_CARD_TEMPLATES.map((template) => (
            <button
              key={template.id}
              onClick={() => {
                setSelectedTemplate(template.id);
                setShowPreview(true);
              }}
              className={cn(
                "relative p-4 rounded-xl border-2 transition-all text-left group overflow-hidden",
                selectedTemplate === template.id
                  ? "border-accent ring-2 ring-accent/20"
                  : "border-border hover:border-accent/50"
              )}
            >
              {/* Thumbnail Preview */}
              <div className="h-40 w-full overflow-hidden rounded-lg bg-white mb-4 flex items-start justify-center">
                <div className="transform scale-[0.28] origin-top pointer-events-none">
                  <AdmitCardTemplate
                    data={{
                      ...SAMPLE_ADMIT_CARD_DATA,
                      instructions:
                        customInstructions.length > 0
                          ? customInstructions
                          : undefined,
                    }}
                    variant={template.id}
                  />
                </div>
              </div>

              <div>
                <h4 className="font-bold text-text-primary">{template.name}</h4>
                <p className="text-xs text-text-secondary mt-1">
                  {template.description}
                </p>
              </div>

              {/* Selection Indicator */}
              {selectedTemplate === template.id && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Instruction Management */}
      {selectedTemplate && (
        <InstructionsManager
          customInstructions={customInstructions}
          newInstruction={newInstruction}
          templateName={templateName}
          savedTemplatesCount={savedTemplates.length}
          onNewInstructionChange={setNewInstruction}
          onTemplateNameChange={setTemplateName}
          onAddInstruction={addInstruction}
          onRemoveInstruction={removeInstruction}
          onSaveAsTemplate={saveCurrentAsTemplate}
          onOpenSavedTemplates={() => setShowSavedTemplates(true)}
        />
      )}

      {/* Full Preview */}
      {showPreview && selectedTemplate && (
        <div className="bg-surface border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-text-primary flex items-center gap-2">
              <Eye className="w-5 h-5 text-accent" />
              Template Preview
            </h3>
          </div>
          <div
            ref={printRef}
            className="flex justify-center bg-slate-100 dark:bg-slate-800/50 rounded-xl p-8"
          >
            <AdmitCardTemplate
              data={{
                ...SAMPLE_ADMIT_CARD_DATA,
                instructions:
                  customInstructions.length > 0 ? customInstructions : undefined,
              }}
              variant={selectedTemplate}
            />
          </div>
        </div>
      )}

      {/* Print/Download Action */}
      {selectedTemplate && (
        <div className="flex justify-center">
          <Button variant="outline" onClick={handlePrint} size="lg">
            <Printer className="w-4 h-4" />
            Print / Download PDF
          </Button>
        </div>
      )}

      {/* Saved Instructions Modal */}
      <SavedInstructionsModal
        isOpen={showSavedTemplates}
        onClose={() => setShowSavedTemplates(false)}
        savedTemplates={savedTemplates}
        onLoadTemplate={loadSavedTemplate}
        onDeleteTemplate={deleteTemplate}
      />
    </div>
  );
}
