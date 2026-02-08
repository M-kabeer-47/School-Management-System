"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Save, Plus, Trash2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PageHeader } from "@/components/admin/PageHeader";
import { AddSubjectModal } from "@/components/admin/settings/AddSubjectModal";
import { subjectDefinitions as initialData } from "@/lib/admin/mock-data/settings";
import { SubjectDefinition } from "@/lib/admin/types/settings";

export default function SubjectsPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [subjects, setSubjects] = useState<SubjectDefinition[]>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = () => {
    console.log("Save Subjects:", subjects);
    setIsEditing(false);
  };

  const handleAddSubject = (name: string) => {
    setSubjects([
      ...subjects,
      {
        id: `sub-${Date.now()}`,
        name,
      },
    ]);
  };

  const removeSubject = (id: string) => {
    setSubjects(subjects.filter((s) => s.id !== id));
  };

  const updateSubject = (id: string, name: string) => {
    setSubjects(subjects.map((s) => (s.id === id ? { ...s, name } : s)));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <PageHeader
        title="Subjects"
        subtitle="Define available subjects. Assign them to class groups in the Class Groups settings."
      >
        {!isEditing ? (
          <div className="flex gap-2">
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus className="w-3.5 h-3.5" /> Add Subject
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="gap-2"
            >
              <Pencil className="w-3.5 h-3.5" /> Edit
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSubjects(initialData);
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
          </div>
        )}
      </PageHeader>

      {/* Subjects List */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface rounded-2xl border border-border shadow-sm overflow-hidden"
      >
        {subjects.map((subject, index) => (
          <motion.div
            key={subject.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.02 }}
            className={`flex items-center gap-4 px-5 py-4 ${
              index !== subjects.length - 1 ? "border-b border-border" : ""
            } hover:bg-surface-hover/30 transition-colors`}
          >
            {/* Icon */}
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 16 16"
                className="text-accent"
              >
                <path
                  fill="currentColor"
                  d="M4.5 2A1.5 1.5 0 0 0 3 3.5v9A1.5 1.5 0 0 0 4.498 14H12.5a.5.5 0 0 0 .001-1H4.5a.5.5 0 0 1-.5-.5v-.999A.5.5 0 0 1 4.499 11H12.5a.5.5 0 0 0 .5-.5V2.501A.5.5 0 0 0 12.501 2zm.999 2H10.5a.5.5 0 0 1 .001 1H5.5a.5.5 0 0 1-.001-1m0 2H8.5a.5.5 0 0 1 .001 1H5.5a.5.5 0 0 1-.001-1m0 2H9.5a.5.5 0 0 1 .001 1H5.5a.5.5 0 0 1-.001-1"
                />
              </svg>
            </div>

            {/* Name */}
            {isEditing ? (
              <Input
                value={subject.name}
                onChange={(e) => updateSubject(subject.id, e.target.value)}
                placeholder="Subject name"
                className="flex-1"
                autoFocus={!subject.name}
              />
            ) : (
              <span className="flex-1 text-base font-medium text-text-primary">
                {subject.name}
              </span>
            )}

            {/* Delete Button */}
            {isEditing && (
              <button
                onClick={() => removeSubject(subject.id)}
                className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 text-text-muted hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        ))}

        {/* Empty State */}
        {subjects.length === 0 && (
          <div className="px-5 py-12 text-center text-text-muted">
            <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p>No subjects defined yet</p>
          </div>
        )}
      </motion.div>

      {/* Add Subject Modal */}
      <AddSubjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddSubject}
      />
    </motion.div>
  );
}
