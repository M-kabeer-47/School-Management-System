"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Layers, Save, Plus, Trash2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PageHeader } from "@/components/admin/PageHeader";
import { AddSectionModal } from "@/components/admin/settings/AddSectionModal";
import { sectionDefinitions as initialData } from "@/lib/admin/mock-data/settings";
import { SectionDefinition } from "@/lib/admin/types/settings";

export default function SectionsPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [sections, setSections] = useState<SectionDefinition[]>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = () => {
    console.log("Save Sections:", sections);
    setIsEditing(false);
  };

  const handleAddSection = (name: string) => {
    setSections([
      ...sections,
      {
        id: `sec-${Date.now()}`,
        name,
      },
    ]);
  };

  const removeSection = (id: string) => {
    setSections(sections.filter((s) => s.id !== id));
  };

  const updateSection = (id: string, name: string) => {
    setSections(sections.map((s) => (s.id === id ? { ...s, name } : s)));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <PageHeader
        title="Sections"
        subtitle="Sections divide each class into parallel groups (e.g., Class 5-A, Class 5-B). Define section names."
      >
        <div className="flex gap-2">
          {!isEditing && (
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus className="w-3.5 h-3.5" /> Add Section
            </Button>
          )}

          {!isEditing && sections.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="gap-2"
            >
              <Pencil className="w-3.5 h-3.5" /> Edit
            </Button>
          )}

          {isEditing && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSections(initialData);
                  setIsEditing(false);
                }}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                className="bg-accent hover:bg-accent-hover text-white gap-2"
              >
                <Save className="w-3.5 h-3.5" /> Save
              </Button>
            </>
          )}
        </div>
      </PageHeader>

      {/* Sections List */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface rounded-2xl border border-border shadow-sm overflow-hidden"
      >
        {sections.map((section, index) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.02 }}
            className={`flex items-center gap-4 px-5 py-4 ${
              index !== sections.length - 1 ? "border-b border-border" : ""
            } hover:bg-surface-hover/30 transition-colors`}
          >
            {/* Icon */}
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5 text-accent" />
            </div>

            {/* Name */}
            {isEditing ? (
              <Input
                value={section.name}
                onChange={(e) => updateSection(section.id, e.target.value)}
                placeholder="Section name (e.g. A, B, Rose)"
                className="flex-1"
                autoFocus={!section.name}
              />
            ) : (
              <span className="flex-1 text-base font-medium text-text-primary">
                {section.name}
              </span>
            )}

            {/* Delete Button */}
            {isEditing && (
              <button
                onClick={() => removeSection(section.id)}
                className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 text-text-muted hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        ))}

        {/* Empty State */}
        {sections.length === 0 && (
          <div className="px-5 py-12 text-center text-text-muted">
            <Layers className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p>No sections defined yet</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsModalOpen(true)}
              className="mt-4"
            >
              <Plus className="w-3.5 h-3.5" /> Add First Section
            </Button>
          </div>
        )}
      </motion.div>

      {/* Add Section Modal */}
      <AddSectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddSection}
      />
    </motion.div>
  );
}
