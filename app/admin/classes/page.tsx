"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import { ClassCard } from "@/components/admin/classes/ClassCard";
import { classSections } from "@/lib/admin/mock-data/classes-flat";
import { ClassSectionData } from "@/lib/admin/types/classes";
import { clsx } from "clsx";

import AddSectionModal from "@/components/admin/classes/AddSectionModal";
import { PillTabs } from "@/components/ui/PillTabs";

export default function ClassesPage() {
  const router = useRouter();
  const [activeGrade, setActiveGrade] = useState("All");
  const [isAddSectionOpen, setIsAddSectionOpen] = useState(false);

  const grades = [
    "All",
    ...Array.from(new Set(classSections.map((c) => c.grade))),
  ];

  // Group logic
  const getGroupedSections = () => {
    if (activeGrade !== "All") {
      return {
        [activeGrade]: classSections.filter((c) => c.grade === activeGrade),
      };
    }
    // Group by grade
    return classSections.reduce(
      (acc, section) => {
        if (!acc[section.grade]) acc[section.grade] = [];
        acc[section.grade].push(section);
        return acc;
      },
      {} as Record<string, ClassSectionData[]>,
    );
  };

  const groupedSections = getGroupedSections();
  const sortedGrades = Object.keys(groupedSections).sort((a, b) => {
    // Extract numbers from "Grade 1", "Grade 10" etc
    const numA = parseInt(a.replace(/\D/g, "")) || 0;
    const numB = parseInt(b.replace(/\D/g, "")) || 0;

    // If numbers match (or strictly alphabetic), use string compare
    if (numA === numB) return a.localeCompare(b);

    return numA - numB;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 pb-10"
    >
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary font-heading">
            Classes & Sections
          </h1>
          <p className="text-text-secondary mt-1 text-lg">
            Manage academic structure and class teachers
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Header actions can be added here if needed */}
        </div>
      </div>

      {/* Grade Filters (Responsive Tabs) */}
      <PillTabs
        value={activeGrade}
        onValueChange={setActiveGrade}
        options={grades.map((grade) => ({
          value: grade,
          label: grade,
        }))}
      />

      {/* Grouped Grid */}
      <div className="space-y-16">
        {sortedGrades.map((grade) => (
          <div key={grade} className="space-y-6">
            {/* Section Heading only visible in 'All' mode to separate groups */}
            {activeGrade === "All" && (
              <div className="flex items-center gap-4 pt-4">
                <div className="h-8 w-1 bg-accent rounded-full" />
                <h2 className="text-2xl font-bold text-text-primary font-heading">
                  {grade}
                </h2>
                <div className="h-px bg-border flex-1 ml-2" />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {groupedSections[grade].map((section) => (
                <ClassCard
                  key={section.id}
                  data={section}
                  onClick={() => router.push(`/admin/classes/${section.id}`)}
                />
              ))}

              {/* Add New Section Card - Only show this in specific grade tabs */}
              {activeGrade !== "All" && (
                <button
                  onClick={() => setIsAddSectionOpen(true)}
                  className="group border border-dashed border-border rounded-xl flex flex-col items-center justify-center p-8 text-text-muted hover:border-accent hover:text-accent hover:bg-accent/5 transition-all min-h-[200px]"
                >
                  <div className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm">
                    <Plus className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-sm">
                    Add Section to {grade}
                  </span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <AddSectionModal
        isOpen={isAddSectionOpen}
        onClose={() => setIsAddSectionOpen(false)}
        grade={activeGrade}
      />
    </motion.div>
  );
}
