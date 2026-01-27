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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import {
  Users,
  CalendarCheck,
  FileText,
  ArrowLeft,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { Homework } from "@/lib/instructor/types/class-detail";
import { AddHomeworkModal } from "@/components/instructor/classes/detail";
import { mockHomeworks } from "@/lib/instructor/mock-data/class-detail";
export default function ClassDetailPage() {
  const params = useParams();
  const classId = params.id as string;
  const classData = getClassDetail(classId);

  // Homework State
  const [isHomeworkModalOpen, setIsHomeworkModalOpen] = useState(false);
  const [homeworks, setHomeworks] = useState<Homework[]>(mockHomeworks);

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
      />

      {/* Tabs */}
      <Tabs defaultValue="students" className="w-full">
        <div className="mb-6">
          <TabsList className="w-full sm:w-auto overflow-x-auto p-1 bg-surface border border-border rounded-xl">
            <TabsTrigger
              value="students"
              className="flex items-center gap-2 px-4 py-2"
            >
              <Users className="w-4 h-4" />
              <span>Students</span>
            </TabsTrigger>
            <TabsTrigger
              value="homework"
              className="flex items-center gap-2 px-4 py-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Homework</span>
            </TabsTrigger>
            <TabsTrigger
              value="attendance"
              className="flex items-center gap-2 px-4 py-2"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Attendance</span>
            </TabsTrigger>
            <TabsTrigger
              value="tests"
              className="flex items-center gap-2 px-4 py-2"
            >
              <FileText className="w-4 h-4" />
              <span>Tests & Results</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="bg-transparent">
          <TabsContent value="students" className="mt-0">
            <StudentsTab students={classData.students} />
          </TabsContent>

          <TabsContent value="homework" className="mt-0">
            <HomeworkTab homeworks={homeworks} />
          </TabsContent>

          <TabsContent value="attendance" className="mt-0">
            <AttendanceTab attendanceHistory={classData.attendance} />
          </TabsContent>

          <TabsContent value="tests" className="mt-0">
            <TestsTab tests={classData.tests} />
          </TabsContent>
        </div>
      </Tabs>

      {/* Homework Modal */}
      <AddHomeworkModal
        isOpen={isHomeworkModalOpen}
        onClose={() => setIsHomeworkModalOpen(false)}
        onAssign={handleAssignHomework}
      />
    </div>
  );
}
