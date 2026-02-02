"use client";

import { useState } from "react";
import { ArrowLeft, User, Eye, Upload, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { useRouter } from "next/navigation";

// Components
import { ClassKPICards } from "@/components/admin/classes/detail/ClassKPICards";
import { StudentsTab } from "@/components/instructor/classes/detail/StudentsTab";
import { ClassSubjectsTab } from "@/components/admin/classes/detail/ClassSubjectsTab";

// Mock Data
const MOCK_STUDENTS = Array.from({ length: 35 }).map((_, i) => ({
  id: `std-${i + 1}`,
  name: `Student ${i + 1}`,
  rollNo: `Roll-${100 + i}`,
  fatherName: `Father ${i + 1}`,
  phoneNo: "0300-1234567",
  fatherWhatsapp: "0300-1234567",
  presentAddress: "123 Street, Lahore",
  section: "A",
  registrationCode: `REG-${202400 + i}`,
  gender: i % 2 === 0 ? "Male" : "Female",
  attendancePercentage: Math.floor(Math.random() * (100 - 60) + 60), // Random 60-100%
  // Required fields for Student type
  fatherCnic: "35202-1234567-1",
  dob: "2015-01-01",
  admissionDate: "2024-01-01",
  email: "student@example.com",
}));

const MOCK_SUBJECTS = [
  {
    id: "1",
    subjectName: "Mathematics",
    teacherName: "Mr. Sarah Smith",
    teacherId: "t1",
    classesPerWeek: 5,
    syllabusUrl: "/mock/syllabus.pdf",
  },
  {
    id: "2",
    subjectName: "English Literature",
    teacherName: "Ms. Emily Davis",
    teacherId: "t2",
    classesPerWeek: 4,
    syllabusUrl: "/mock/syllabus.pdf",
  },
  {
    id: "3",
    subjectName: "General Science",
    teacherName: "Mr. John Doe",
    teacherId: "t3",
    classesPerWeek: 4,
  },
  {
    id: "4",
    subjectName: "History",
    teacherName: "Mrs. Wilson",
    teacherId: "t4",
    classesPerWeek: 3,
  },
  {
    id: "5",
    subjectName: "Computer Science",
    teacherName: "Mr. Tech",
    teacherId: "t5",
    classesPerWeek: 2,
    syllabusUrl: "/mock/syllabus.pdf",
  },
];

// Mocking Class-Level Results as "Term Results"
const MOCK_RESULTS = [
  {
    id: "term-1",
    termName: "First Term Examination",
    examName: "Annual 2024",
    date: "2024-03-15",
    totalMarks: 500,
    obtainedMarks: 420, // Class Average?
    percentage: 84,
    grade: "A",
    position: 1, // Avg Position?
    subjects: [
      { subject: "Math", totalMarks: 100, obtainedMarks: 85, grade: "A" },
      { subject: "English", totalMarks: 100, obtainedMarks: 82, grade: "B+" },
    ],
  },
  {
    id: "mid-term",
    termName: "Mid Term Examination",
    examName: "Fall 2023",
    date: "2023-11-10",
    totalMarks: 500,
    obtainedMarks: 390,
    percentage: 78,
    grade: "B+",
    subjects: [],
  },
];

export default function ClassDetailsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("students");

  // KPI Calculations
  const totalStudents = MOCK_STUDENTS.length;
  const totalBoys = MOCK_STUDENTS.filter((s) => s.gender === "Male").length;
  const totalGirls = MOCK_STUDENTS.filter((s) => s.gender === "Female").length;
  const avgAttendance = Math.round(
    MOCK_STUDENTS.reduce((acc, curr) => acc + curr.attendancePercentage, 0) /
      totalStudents,
  );

  // Class-wide Syllabus Data
  const classSyllabusUrl = "/mock/class-syllabus.pdf"; // Mock URL for the entire class

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="rounded-full bg-surface border border-border hover:bg-surface-hover"
          >
            <ArrowLeft className="w-5 h-5 text-text-secondary" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold font-heading text-text-primary">
              Grade 5 - Section A
            </h1>
            <p className="text-text-secondary flex items-center gap-2 mt-1">
              Class Teacher:{" "}
              <span className="font-semibold text-accent">Mrs. Anderson</span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {classSyllabusUrl ? (
            <>
              <Button
                variant="outline"
                className="gap-2 bg-surface hover:bg-surface-hover border-accent/20 text-accent font-semibold"
                onClick={() => window.open(classSyllabusUrl, "_blank")}
              >
                <Eye className="w-4 h-4" /> View Syllabus
              </Button>
              <Button
                variant="outline"
                className="gap-2 bg-surface hover:bg-surface-hover border-dashed"
              >
                <Upload className="w-4 h-4 text-text-muted" /> Update Syllabus
              </Button>
            </>
          ) : (
            <Button className="gap-2 shadow-md font-bold">
              <Plus className="w-4 h-4" /> Add Syllabus
            </Button>
          )}
          <div className="w-px h-8 bg-border mx-1 hidden md:block" />
          <Button
            variant="outline"
            className="gap-2 bg-surface hover:bg-surface-hover shadow-sm"
          >
            <User className="w-4 h-4" /> Change Class Teacher
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <ClassKPICards
        totalStudents={totalStudents}
        totalBoys={totalBoys}
        totalGirls={totalGirls}
        avgAttendance={avgAttendance}
      />

      {/* Main Content Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="bg-surface border border-border p-1 rounded-xl">
          <TabsTrigger
            value="students"
            className="rounded-lg data-[state=active]:bg-accent data-[state=active]:text-white"
          >
            Students
          </TabsTrigger>
          <TabsTrigger
            value="subjects"
            className="rounded-lg data-[state=active]:bg-accent data-[state=active]:text-white"
          >
            Subjects
          </TabsTrigger>
        </TabsList>

        <TabsContent value="students">
          <StudentsTab students={MOCK_STUDENTS as any} showAttendance={true} />
        </TabsContent>

        <TabsContent value="subjects">
          <ClassSubjectsTab subjects={MOCK_SUBJECTS} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
