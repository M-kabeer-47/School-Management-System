"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Save,
  Plus,
  Trash2,
  Pencil,
  X,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { PageHeader } from "@/components/admin/PageHeader";
import { AddTermModal } from "@/components/admin/settings/AddTermModal";
import {
  academicYearConfig as initialData,
  termDefinitions,
} from "@/lib/admin/mock-data/settings";
import { AcademicYearConfig, Term } from "@/lib/admin/types/settings";

export default function AcademicYearPage() {
  const [isEditingYear, setIsEditingYear] = useState(false);
  const [data, setData] = useState<AcademicYearConfig>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTermId, setEditingTermId] = useState<string | null>(null);

  const handleSaveYear = () => {
    console.log("Save Academic Year:", data);
    setIsEditingYear(false);
  };

  const handleAddTerm = (newTermData: {
    name: string;
    startDate: string;
    endDate: string;
  }) => {
    const newTerm: Term = {
      id: `term-${Date.now()}`,
      ...newTermData,
    };
    setData({ ...data, terms: [...data.terms, newTerm] });
  };

  const removeTerm = (id: string) => {
    setData({ ...data, terms: data.terms.filter((t) => t.id !== id) });
  };

  const updateTerm = (id: string, field: keyof Term, value: string) => {
    setData({
      ...data,
      terms: data.terms.map((t) =>
        t.id === id ? { ...t, [field]: value } : t,
      ),
    });
  };

  const toggleTermEdit = (id: string) => {
    if (editingTermId === id) {
      setEditingTermId(null); // Save (locally)
    } else {
      setEditingTermId(id); // Edit
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <PageHeader
        title="Academic Year"
        subtitle="Define the current academic year and term schedule"
      >
        {!isEditingYear ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditingYear(true)}
            className="gap-2"
          >
            <Pencil className="w-3.5 h-3.5" /> Edit Year Info
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setData(initialData); // Reset changes
                setIsEditingYear(false);
              }}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSaveYear}
              className="bg-accent hover:bg-accent-hover text-white gap-2"
            >
              <Save className="w-3.5 h-3.5" /> Save Changes
            </Button>
          </div>
        )}
      </PageHeader>

      {/* Year Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="bg-surface rounded-2xl border border-border divide-y divide-border shadow-sm overflow-hidden"
      >
        <div className="flex items-center gap-4 px-6 py-4">
          <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
            <CalendarDays className="w-4 h-4 text-accent" />
          </div>
          <span className="text-sm text-text-secondary w-40 shrink-0 font-medium">
            Academic Year
          </span>
          {isEditingYear ? (
            <Input
              value={data.currentYear}
              onChange={(e) =>
                setData({ ...data, currentYear: e.target.value })
              }
              placeholder="e.g. 2025-2026"
              className="flex-1"
            />
          ) : (
            <span className="text-lg font-bold text-text-primary">
              {data.currentYear}
            </span>
          )}
        </div>
        <div className="flex items-center gap-4 px-6 py-4">
          <div className="w-9 h-9 rounded-xl bg-surface-active flex items-center justify-center shrink-0">
            <CalendarDays className="w-4 h-4 text-text-muted" />
          </div>
          <span className="text-sm text-text-secondary w-40 shrink-0 font-medium">
            Start Date
          </span>
          {isEditingYear ? (
            <Input
              type="date"
              value={data.startDate}
              onChange={(e) => setData({ ...data, startDate: e.target.value })}
              className="flex-1"
            />
          ) : (
            <span className="text-sm text-text-primary font-medium">
              {new Date(data.startDate).toLocaleDateString("en-PK", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          )}
        </div>
        <div className="flex items-center gap-4 px-6 py-4">
          <div className="w-9 h-9 rounded-xl bg-surface-active flex items-center justify-center shrink-0">
            <CalendarDays className="w-4 h-4 text-text-muted" />
          </div>
          <span className="text-sm text-text-secondary w-40 shrink-0 font-medium">
            End Date
          </span>
          {isEditingYear ? (
            <Input
              type="date"
              value={data.endDate}
              onChange={(e) => setData({ ...data, endDate: e.target.value })}
              className="flex-1"
            />
          ) : (
            <span className="text-sm text-text-primary font-medium">
              {new Date(data.endDate).toLocaleDateString("en-PK", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          )}
        </div>
      </motion.div>

      {/* Terms Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-bold text-text-muted uppercase tracking-wider px-1">
            Terms ({data.terms.length})
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsModalOpen(true)}
            className="gap-1.5 text-xs"
          >
            <Plus className="w-3.5 h-3.5" /> Add Term
          </Button>
        </div>
        <div className="space-y-3">
          {data.terms.map((term, index) => {
            const isEditingTerm = editingTermId === term.id;

            return (
              <motion.div
                key={term.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-surface rounded-2xl border border-border p-5 shadow-sm relative group"
              >
                {isEditingTerm ? (
                  <div className="space-y-4 pr-10">
                    {" "}
                    {/* pr-10 for absolute edit button */}
                    <div className="flex items-center justify-between">
                      <Select
                        value={term.name}
                        onValueChange={(value) =>
                          updateTerm(term.id, "name", value)
                        }
                      >
                        <SelectTrigger className="flex-1 max-w-xs">
                          <SelectValue placeholder="Select term" />
                        </SelectTrigger>
                        <SelectContent>
                          {termDefinitions.map((td) => (
                            <SelectItem key={td.id} value={td.name}>
                              {td.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-text-muted mb-1.5 block font-medium">
                          Start Date
                        </label>
                        <Input
                          type="date"
                          value={term.startDate}
                          onChange={(e) =>
                            updateTerm(term.id, "startDate", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label className="text-xs text-text-muted mb-1.5 block font-medium">
                          End Date
                        </label>
                        <Input
                          type="date"
                          value={term.endDate}
                          onChange={(e) =>
                            updateTerm(term.id, "endDate", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between pr-10">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shadow-sm">
                        <span className="text-sm font-bold text-accent">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-text-primary">
                          {term.name}
                        </h3>
                        <p className="text-sm text-text-muted mt-0.5">
                          {new Date(term.startDate).toLocaleDateString(
                            "en-PK",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            },
                          )}{" "}
                          —{" "}
                          {new Date(term.endDate).toLocaleDateString("en-PK", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="absolute top-5 right-5 flex gap-2">
                  <button
                    onClick={() => toggleTermEdit(term.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      isEditingTerm
                        ? "bg-accent text-white hover:bg-accent-hover"
                        : "text-text-muted hover:text-accent hover:bg-accent/10"
                    }`}
                    title={isEditingTerm ? "Save" : "Edit"}
                  >
                    {isEditingTerm ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Pencil className="w-4 h-4" />
                    )}
                  </button>

                  {/* Delete only visible when editing or hovering in view mode */}
                  <button
                    onClick={() => removeTerm(term.id)}
                    className={`p-2 rounded-lg text-text-muted hover:text-red-500 hover:bg-red-500/10 transition-colors ${
                      !isEditingTerm ? "opacity-0 group-hover:opacity-100" : ""
                    }`}
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AddTermModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddTerm}
      />
    </motion.div>
  );
}
