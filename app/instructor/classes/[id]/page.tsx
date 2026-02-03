"use client";

import { useParams } from "next/navigation";
import { getClassDetail } from "@/lib/instructor/mock-data/class-detail";
import {
  ClassHeader,
  StudentsTab,
  AttendanceTab,
  TestsTab,
  HomeworkTab,
} from "@/components/instructor/classes/detail";
import { ResponsiveTabs } from "@/components/ui/ResponsiveTabs";
import {
  Users,
  CalendarCheck,
  FileText,
  ArrowLeft,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { Homework } from "@/lib/instructor/types/class-detail";
import { AddHomeworkModal } from "@/components/instructor/classes/detail";
import { mockHomeworks } from "@/lib/instructor/mock-data/class-detail";
import { PrintableAttendanceSheet } from "@/components/instructor/classes/attendance/PrintableAttendanceSheet";

export default function ClassDetailPage() {
  const params = useParams();
  const classId = params.id as string;
  const classData = getClassDetail(classId);

  const [activeTab, setActiveTab] = useState("students");

  // Homework State
  const [isHomeworkModalOpen, setIsHomeworkModalOpen] = useState(false);
  const [homeworks, setHomeworks] = useState<Homework[]>(mockHomeworks);

  // Print Attendance Sheet
  const [showPrintSheet, setShowPrintSheet] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrintAttendance = () => {
    setShowPrintSheet(true);
    // Wait for the component to render before printing
    setTimeout(() => {
      window.print();
      // Hide after print dialog closes
      setTimeout(() => setShowPrintSheet(false), 500);
    }, 100);
  };

  const handleAssignHomework = (data: {
    description: string;
    deadline: Date;
  }) => {
    const newHomework: Homework = {
      id: Math.random().toString(36).substr(2, 9),
      description: data.description,
      deadline: data.deadline,
      assignedDate: new Date(),
      status: "active",
    };
    setHomeworks([newHomework, ...homeworks]);
  };

  const tabOptions = [
    {
      value: "students",
      label: "Students",
      icon: <Users className="w-4 h-4" />,
    },
    {
      value: "homework",
      label: "Homework",
      icon: <BookOpen className="w-4 h-4" />,
    },
    {
      value: "attendance",
      label: "Attendance",
      icon: <CalendarCheck className="w-4 h-4" />,
    },
    {
      value: "tests",
      label: "Tests & Results",
      icon: <FileText className="w-4 h-4" />,
    },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      {/* Back Navigation */}
      <div className="mb-6">
        <Link
          href="/instructor/classes"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors text-sm font-medium group"
        >
          <div className="p-1.5 rounded-lg bg-surface border border-border group-hover:bg-surface-hover transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span>Back to Classes</span>
        </Link>
      </div>

      {/* Header */}
      <ClassHeader
        classData={classData}
        onAddHomework={() => setIsHomeworkModalOpen(true)}
        onPrintAttendance={handlePrintAttendance}
      />

      {/* Tabs */}
      <ResponsiveTabs
        value={activeTab}
        onValueChange={setActiveTab}
        options={tabOptions}
        className="mb-8"
      />

      <div className="bg-transparent">
        {activeTab === "students" && (
          <StudentsTab students={classData.students} />
        )}
        {activeTab === "homework" && <HomeworkTab homeworks={homeworks} />}
        {activeTab === "attendance" && (
          <AttendanceTab attendanceHistory={classData.attendance} />
        )}
        {activeTab === "tests" && <TestsTab tests={classData.tests} />}
      </div>

      {/* Homework Modal */}
      <AddHomeworkModal
        isOpen={isHomeworkModalOpen}
        onClose={() => setIsHomeworkModalOpen(false)}
        onAssign={handleAssignHomework}
      />

      {/* Printable Attendance Sheet - Hidden until print */}
      {showPrintSheet && (
        <div className="fixed inset-0 bg-white z-[9999] overflow-auto print:block hidden print:visible">
          <PrintableAttendanceSheet
            ref={printRef}
            students={classData.students}
            subject={classData.name}
            grade={classData.grade}
            section={classData.section}
          />
        </div>
      )}
    </div>
  );
}
