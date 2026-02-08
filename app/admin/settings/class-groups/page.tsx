"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutGrid,
  Save,
  Plus,
  Trash2,
  Pencil,
  GraduationCap,
  BookOpen,
  X,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PageHeader } from "@/components/admin/PageHeader";
import { AddWingModal } from "@/components/admin/settings/AddWingModal";
import {
  classGroups as initialGroups,
  subjectDefinitions,
} from "@/lib/admin/mock-data/settings";
import { ClassGroup } from "@/lib/admin/types/settings";

const ALL_CLASSES = ["1", "2", "3", "4", "5", "6", "7", "8"];

export default function ClassGroupsPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [groups, setGroups] = useState<ClassGroup[]>(initialGroups);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = () => {
    console.log("Save Class Groups:", groups);
    setIsEditing(false);
  };

  const handleAddWing = (
    name: string,
    classes: string[],
    subjectIds: string[],
  ) => {
    setGroups([
      ...groups,
      {
        id: `group-${Date.now()}`,
        name,
        classes,
        subjectIds,
      },
    ]);
  };

  const removeGroup = (id: string) => {
    setGroups(groups.filter((g) => g.id !== id));
  };

  const toggleClass = (groupId: string, cls: string) => {
    setGroups(
      groups.map((g) => {
        if (g.id !== groupId) return g;
        const has = g.classes.includes(cls);
        return {
          ...g,
          classes: has
            ? g.classes.filter((c) => c !== cls)
            : [...g.classes, cls],
        };
      }),
    );
  };

  const toggleSubject = (groupId: string, subId: string) => {
    setGroups(
      groups.map((g) => {
        if (g.id !== groupId) return g;
        const has = g.subjectIds.includes(subId);
        return {
          ...g,
          subjectIds: has
            ? g.subjectIds.filter((s) => s !== subId)
            : [...g.subjectIds, subId],
        };
      }),
    );
  };

  // All classes assigned globally
  const allAssignedClasses = groups.flatMap((g) => g.classes);

  // Classes assigned to OTHER groups (for checking in edit mode)
  const assignedToOthers = (currentGroupId: string) => {
    return groups
      .filter((g) => g.id !== currentGroupId)
      .flatMap((g) => g.classes);
  };

  // Get subject name by ID
  const getSubjectName = (id: string) => {
    return subjectDefinitions.find((s) => s.id === id)?.name || id;
  };

  // Format class range for display (e.g. "1, 2" or "3-5")
  const formatClassRange = (classes: string[]) => {
    const sorted = [...classes].sort((a, b) => Number(a) - Number(b));
    if (sorted.length === 0) return "None";
    if (sorted.length === 1) return `Class ${sorted[0]}`;
    if (sorted.length === 2) return `Class ${sorted[0]} & ${sorted[1]}`;

    // Check if consecutive
    const nums = sorted.map(Number);
    const isConsecutive = nums.every(
      (n, i) => i === 0 || n === nums[i - 1] + 1,
    );
    if (isConsecutive) {
      return `Classes ${sorted[0]}-${sorted[sorted.length - 1]}`;
    }
    return `Classes ${sorted.join(", ")}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <PageHeader
        title="Class Groups / Sections"
        subtitle="Group classes together to assign the same subjects across them"
      >
        <div className="flex gap-2">
          {!isEditing && (
            <Button onClick={() => setIsModalOpen(true)} className="gap-2">
              <Plus className="w-4 h-4" /> Add Wing
            </Button>
          )}
          {groups.length > 0 && !isEditing && (
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
                  setGroups(initialGroups);
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

      {/* Helper Info */}
      {groups.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 p-4 rounded-xl bg-accent/5 border border-accent/20"
        >
          <Info className="w-5 h-5 text-accent shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-text-primary">
              What are Wings?
            </p>
            <p className="text-sm text-text-muted mt-1">
              Wings let you group classes that share the same curriculum. For
              example, "Junior Wing" for Classes 1-2, "Middle Wing" for Classes
              3-5. Each wing can have its own set of subjects.
            </p>
          </div>
        </motion.div>
      )}

      {/* Groups */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {groups.map((group, index) => {
          const taken = assignedToOthers(group.id);
          return (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-surface rounded-2xl border border-border overflow-hidden shadow-sm pb-7"
            >
              {/* Group Header */}
              <div className="flex items-center justify-between px-4 py-4 border-b border-border bg-gradient-to-r from-accent/5 to-transparent">
                {isEditing ? (
                  <Input
                    value={group.name}
                    onChange={(e) =>
                      setGroups(
                        groups.map((g) =>
                          g.id === group.id
                            ? { ...g, name: e.target.value }
                            : g,
                        ),
                      )
                    }
                    placeholder="Wing name"
                    className="max-w-[200px] bg-white dark:bg-background"
                  />
                ) : (
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                      <LayoutGrid className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-text-primary">
                        {group.name} Wing
                      </h3>
                      <p className="text-sm text-text-muted">
                        {formatClassRange(group.classes)}
                      </p>
                    </div>
                  </div>
                )}

                {isEditing && (
                  <button
                    onClick={() => removeGroup(group.id)}
                    className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 text-text-muted hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="p-5">
                {isEditing ? (
                  // EDIT MODE
                  <div className="space-y-5">
                    {/* Classes */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <GraduationCap className="w-4 h-4 text-accent" />
                        <span className="text-xs font-bold text-text-muted uppercase tracking-wider">
                          Classes
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {ALL_CLASSES.map((cls) => {
                          const isSelected = group.classes.includes(cls);
                          const isTaken = taken.includes(cls);
                          return (
                            <button
                              key={cls}
                              onClick={() =>
                                !isTaken && toggleClass(group.id, cls)
                              }
                              disabled={isTaken}
                              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                                isSelected
                                  ? "bg-accent text-white shadow-sm"
                                  : isTaken
                                    ? "bg-surface-active text-text-muted/40 cursor-not-allowed"
                                    : "bg-surface-active text-text-secondary hover:bg-accent/10"
                              }`}
                            >
                              {cls}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Subjects */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <BookOpen className="w-4 h-4 text-accent" />
                        <span className="text-xs font-bold text-text-muted uppercase tracking-wider">
                          Subjects
                        </span>
                        <span className="text-xs text-text-muted">
                          ({group.subjectIds.length})
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {group.subjectIds.map((subId) => (
                          <span
                            key={subId}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-accent/10 text-accent border border-accent/20"
                          >
                            {getSubjectName(subId)}
                            <button
                              onClick={() => toggleSubject(group.id, subId)}
                              className="p-0.5 hover:bg-accent/20 rounded"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </span>
                        ))}
                      </div>
                      {/* Available subjects */}
                      {subjectDefinitions.filter(
                        (s) => !group.subjectIds.includes(s.id),
                      ).length > 0 && (
                        <div className="mt-3 pt-3 border-t border-border/50">
                          <span className="text-xs text-text-muted block mb-2">
                            Add subjects:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {subjectDefinitions
                              .filter((s) => !group.subjectIds.includes(s.id))
                              .map((sub) => (
                                <button
                                  key={sub.id}
                                  onClick={() =>
                                    toggleSubject(group.id, sub.id)
                                  }
                                  className="px-2 py-1 rounded text-xs font-medium bg-surface-active text-text-secondary hover:bg-accent/10 hover:text-accent transition-colors"
                                >
                                  + {sub.name}
                                </button>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  // VIEW MODE - Compact grid list
                  <div>
                    {group.subjectIds.length > 0 ? (
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                        {group.subjectIds.map((id) => (
                          <li
                            key={id}
                            className="text-base text-text-secondary leading-relaxed flex items-center gap-2"
                          >
                            <BookOpen className="w-5 h-5 text-accent/60 shrink-0" />
                            {getSubjectName(id)}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-text-muted italic">
                        No subjects assigned
                      </p>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Empty State */}
      {groups.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <LayoutGrid className="w-12 h-12 mx-auto text-text-muted/30 mb-4" />
          <p className="text-text-muted mb-4">No wings created yet</p>
          <Button onClick={() => setIsModalOpen(true)} className="gap-2">
            <Plus className="w-4 h-4" /> Create Your First Wing
          </Button>
        </motion.div>
      )}

      {/* Add Wing Modal */}
      <AddWingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddWing}
        takenClasses={allAssignedClasses}
      />
    </motion.div>
  );
}
