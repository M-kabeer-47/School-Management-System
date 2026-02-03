"use client";

import { useState } from "react";
import { ArrowLeft, Users, UserCircle, Eye, Upload, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ResponsiveTabs } from "@/components/ui/ResponsiveTabs";
import { useRouter } from "next/navigation";

// Components
import { StudentsTab } from "@/components/admin/classes/detail/StudentsTab";
import { ClassSubjectsTab } from "@/components/admin/classes/detail/ClassSubjectsTab";
import { ResultsTab } from "@/components/admin/classes/detail/ResultsTab";
import { FeatureHero } from "@/components/ui/FeatureHero";

// Mock Data
import {
  MOCK_STUDENTS,
  MOCK_CLASS_SUBJECTS,
} from "@/lib/admin/mock-data/class-detail";

export default function ClassDetailsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("students");

  const tabOptions = [
    { value: "students", label: "Students" },
    { value: "subjects", label: "Subjects" },
    { value: "results", label: "Assessments" },
  ];

  // Class-wide Syllabus Data
  const classSyllabusUrl = "/mock/class-syllabus.pdf"; // Mock URL for the entire class

  return (
    <div className="space-y-8 pb-10">
      {/* Hero Header & Stats */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-1">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="min-w-[40px] hover:bg-surface-active rounded-full"
            >
              <ArrowLeft className="w-5 h-5 text-text-secondary" />
            </Button>
            <span className="text-sm font-medium text-text-muted">
              Back to Classes
            </span>
          </div>

          <div className="flex items-center gap-2">
            {classSyllabusUrl ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 bg-surface hover:bg-surface-hover border-border text-text-secondary font-semibold"
                  onClick={() => window.open(classSyllabusUrl, "_blank")}
                >
                  <Eye className="w-4 h-4" /> View Syllabus
                </Button>
                <Button size="sm" className="gap-2">
                  <Upload className="w-4 h-4 text-white" /> Update Syllabus
                </Button>
              </>
            ) : (
              <Button size="sm" className="gap-2">
                <Plus className="w-4 h-4" /> Add Syllabus
              </Button>
            )}
          </div>
        </div>

        <FeatureHero
          badge="Mathematics"
          title="10th - A"
          subtitle={
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                <UserCircle className="w-4 h-4 text-white" />
              </div>
              <span className="text-white/80 font-medium">
                Class Teacher: <span className="text-white">Mrs. Anderson</span>
              </span>
            </div>
          }
        />
      </div>

      {/* Main Content Navigation */}
      <ResponsiveTabs
        value={activeTab}
        onValueChange={setActiveTab}
        options={tabOptions}
        className="w-full lg:w-auto"
      />

      {/* Content Panels */}
      <div className="space-y-6">
        {activeTab === "students" && (
          <StudentsTab students={MOCK_STUDENTS as any} showAttendance={true} />
        )}
        {activeTab === "subjects" && (
          <ClassSubjectsTab subjects={MOCK_CLASS_SUBJECTS} />
        )}
        {activeTab === "results" && <ResultsTab />}
      </div>
    </div>
  );
}
