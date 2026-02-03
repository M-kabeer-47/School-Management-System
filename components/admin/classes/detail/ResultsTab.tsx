"use client";

import { useState } from "react";
import { KPIIcons } from "@/utils/navigation/icons";

import {
  AnalyticsKPICards,
  AnalyticsKPICardProps,
} from "./analytics/AnalyticsKPICards";
import { SubjectSelector } from "./analytics/SubjectSelector";
import { GradebookMatrix } from "./analytics/GradebookMatrix";
import {
  MOCK_SUBJECTS,
  MOCK_GRADEBOOKS,
} from "@/lib/admin/mock-data/analytics";

export const ResultsTab = () => {
  const [selectedSubjectId, setSelectedSubjectId] = useState(
    MOCK_SUBJECTS[0].id,
  );
  const [searchQuery, setSearchQuery] = useState("");

  const gradebook = MOCK_GRADEBOOKS[
    selectedSubjectId as keyof typeof MOCK_GRADEBOOKS
  ] || {
    subjectId: selectedSubjectId,
    subjectName:
      MOCK_SUBJECTS.find((s) => s.id === selectedSubjectId)?.name || "",
    tests: [],
    students: [],
  };

  // Calculate Metrics
  const totalPossible = gradebook.tests.reduce(
    (acc, t) => acc + t.totalMarks,
    0,
  );
  const classAvgObtained =
    gradebook.students.reduce((acc, s) => {
      const studentTotal = Object.values(s.marks).reduce(
        (sum, m) => sum + (m || 0),
        0,
      );
      return acc + studentTotal;
    }, 0) / (gradebook.students.length || 1);

  const classAvgPerc =
    totalPossible > 0 ? (classAvgObtained / totalPossible) * 100 : 0;

  const kpiCards: AnalyticsKPICardProps[] = [
    {
      label: "Class Avg",
      value: `${classAvgPerc.toFixed(1)}%`,
      icon: KPIIcons.ClassAvg,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      idx: 0,
    },
    {
      label: "Completed Tests",
      value: gradebook.tests.length,
      icon: KPIIcons.Tests,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      idx: 1,
    },
    {
      label: "Top Score",
      value: "92%",
      icon: KPIIcons.TopScore,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      idx: 2,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Subject Filter Bar */}
      <SubjectSelector
        subjects={MOCK_SUBJECTS}
        selectedSubjectId={selectedSubjectId}
        onSelect={setSelectedSubjectId}
      />

      {/* KPI Section */}
      <AnalyticsKPICards cards={kpiCards} />

      {/* Gradebook Matrix */}
      <GradebookMatrix
        subjectName={gradebook.subjectName}
        tests={gradebook.tests}
        students={gradebook.students}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        // Passing setter as well if we want search inside Matrix
      />
    </div>
  );
};
