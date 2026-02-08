"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Save, Plus, Trash2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PageHeader } from "@/components/admin/PageHeader";
import { AddTermDefinitionModal } from "@/components/admin/settings/AddTermDefinitionModal";
import { termDefinitions as initialData } from "@/lib/admin/mock-data/settings";
import { TermDefinition } from "@/lib/admin/types/settings";

export default function TermDefinitionsPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [terms, setTerms] = useState<TermDefinition[]>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = () => {
    console.log("Save Term Definitions:", terms);
    setIsEditing(false);
  };

  const handleAddTerm = (name: string) => {
    setTerms([
      ...terms,
      {
        id: `tdef-${Date.now()}`,
        name,
      },
    ]);
  };

  const removeTerm = (id: string) => {
    setTerms(terms.filter((t) => t.id !== id));
  };

  const updateTerm = (id: string, name: string) => {
    setTerms(terms.map((t) => (t.id === id ? { ...t, name } : t)));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <PageHeader
        title="Term Definitions"
        subtitle="Define reusable term names for your academic calendar (e.g., First Term, Mid Term, Final Term)"
      >
        <div className="flex gap-2">
          {!isEditing && (
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus className="w-3.5 h-3.5" /> Add Term
            </Button>
          )}

          {!isEditing && terms.length > 0 && (
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
                  setTerms(initialData);
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

      {/* Terms List */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface rounded-2xl border border-border shadow-sm overflow-hidden"
      >
        {terms.map((term, index) => (
          <motion.div
            key={term.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.02 }}
            className={`flex items-center gap-4 px-5 py-4 ${
              index !== terms.length - 1 ? "border-b border-border" : ""
            } hover:bg-surface-hover/30 transition-colors`}
          >
            {/* Icon */}
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-accent" />
            </div>

            {/* Name */}
            {isEditing ? (
              <Input
                value={term.name}
                onChange={(e) => updateTerm(term.id, e.target.value)}
                placeholder="Term name (e.g. First Term)"
                className="flex-1"
                autoFocus={!term.name}
              />
            ) : (
              <span className="flex-1 text-base font-medium text-text-primary">
                {term.name}
              </span>
            )}

            {/* Delete Button */}
            {isEditing && (
              <button
                onClick={() => removeTerm(term.id)}
                className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 text-text-muted hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        ))}

        {/* Empty State */}
        {terms.length === 0 && (
          <div className="px-5 py-12 text-center text-text-muted">
            <Calendar className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p>No terms defined yet</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsModalOpen(true)}
              className="mt-4"
            >
              <Plus className="w-3.5 h-3.5" /> Add First Term
            </Button>
          </div>
        )}
      </motion.div>

      {/* Add Term Modal */}
      <AddTermDefinitionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddTerm}
      />
    </motion.div>
  );
}
