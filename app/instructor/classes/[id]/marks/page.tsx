"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { getClassDetail } from "@/lib/instructor/mock-data/class-detail";
import { marksEntryStatus } from "@/lib/instructor/mock-data/exams"; // [NEW] Import mock exams
import { FileText, Save } from "lucide-react";

import { cn } from "@/lib/common/utils";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

import MarksHeader from "@/components/instructor/classes/marks/MarksHeader";
import MarksEntryTable from "@/components/instructor/classes/marks/MarksEntryTable";
import { ActionFooter } from "@/components/instructor/classes/common/ActionFooter";

export default function EnterMarksPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const classId = params.id as string;
  const testId = searchParams.get("testId");
  const examId = searchParams.get("examId"); // [NEW] Get examId
  const classData = getClassDetail(classId);

  // Setup State
  const [isSetupOpen, setIsSetupOpen] = useState(!testId && !examId); // [NEW] Check examId
  const [testTitle, setTestTitle] = useState("");
  const [totalMarks, setTotalMarks] = useState<number>(100);
  const [testDate, setTestDate] = useState<string>(new Date().toISOString());

  // Marks State
  const [marks, setMarks] = useState<Record<string, number | null>>(() => {
    return classData.students.reduce(
      (acc, student) => ({ ...acc, [student.id]: null }),
      {},
    );
  });

  // Load test/exam details if editing
  useEffect(() => {
    if (testId) {
      const test = classData.tests.find((t) => t.id === testId);
      if (test) {
        setTestTitle(test.title);
        setTotalMarks(test.totalMarks);
        setTestDate(test.date);
        setIsSetupOpen(false);
      }
    } else if (examId) {
      // [NEW] Load exam details
      const exam = marksEntryStatus.find((e) => e.id === examId);
      if (exam) {
        setTestTitle(exam.examName);
        // Mock total marks for exams as it's not in the type, default to 100
        setTotalMarks(100);
        // Use deadline or today as default date
        setTestDate(exam.deadline);
        setIsSetupOpen(false);
      }
    }
  }, [testId, examId, classData.tests]);

  const [hasChanges, setHasChanges] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // Prevent accidental navigation
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasChanges]);

  const handleMarksChange = (studentId: string, value: number | null) => {
    setMarks((prev) => ({ ...prev, [studentId]: value }));
    setHasChanges(true);
  };

  const fillAll = (value: number | null) => {
    const newMarks = classData.students.reduce(
      (acc, student) => ({ ...acc, [student.id]: value }),
      {},
    );
    setMarks(newMarks);
    setHasChanges(true);
  };

  const handleStartMarksEntry = () => {
    if (!testTitle.trim() || totalMarks <= 0) return;
    setIsSetupOpen(false);
  };

  const onSaveClick = () => {
    setIsSubmitModalOpen(true);
  };

  const handleConfirmSave = () => {
    console.log("Saving marks:", {
      testTitle,
      totalMarks,
      date: testDate,
      marks,
    });
    setHasChanges(false);
    setIsSubmitModalOpen(false);
    router.push(`/instructor/classes/${classId}`);
  };

  // Stats calculation
  const enteredCount = Object.values(marks).filter((m) => m !== null).length;
  const pendingCount = classData.students.length - enteredCount;
  const averageScore =
    enteredCount > 0
      ? Math.round(
          (Object.values(marks)
            .filter((m) => m !== null)
            .reduce((sum, m) => sum + (m || 0), 0) /
            enteredCount /
            totalMarks) *
            100,
        )
      : 0;

  return (
    <div className="pb-32 animate-in fade-in duration-300">
      {/* Setup Modal */}
      <Modal
        isOpen={isSetupOpen}
        onClose={() =>
          !testTitle.trim() ? router.back() : setIsSetupOpen(false)
        }
        title="Create New Test"
        description="Enter test details to start entering marks."
        icon={<FileText className="w-6 h-6" />}
        maxWidth="md"
      >
        <div className="space-y-6 pt-2">
          <div className="space-y-2">
            <Input
              label="Test Title"
              value={testTitle}
              onChange={(e) => setTestTitle(e.target.value)}
              placeholder="e.g. Chapter 5 Quiz"
              autoFocus
            />
          </div>
          <div className="space-y-2">
            <Input
              label="Total Marks"
              type="number"
              min={1}
              value={totalMarks.toString()}
              onChange={(e) =>
                setTotalMarks(Math.max(1, parseInt(e.target.value) || 1))
              }
              placeholder="e.g. 100"
            />
          </div>
          <div className="flex justify-end pt-4 gap-3">
            <Button
              variant="ghost"
              onClick={() =>
                !testTitle.trim() ? router.back() : setIsSetupOpen(false)
              }
            >
              Cancel
            </Button>
            <Button
              onClick={handleStartMarksEntry}
              disabled={!testTitle.trim() || totalMarks <= 0}
              className="bg-accent hover:bg-accent-hover text-white"
            >
              Start Entering Marks
            </Button>
          </div>
        </div>
      </Modal>

      {/* Confirmation Modal */}
      <ConfirmDialog
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onConfirm={handleConfirmSave}
        title="Save Marks"
        message={`You are about to save marks for "${testTitle}".`}
        itemName={`${enteredCount} entered, ${pendingCount} pending`}
        confirmText="Save Marks"
        variant="default"
      />

      {/* Header */}
      <MarksHeader
        classId={classId}
        grade={classData.grade}
        section={classData.section}
        testTitle={testTitle}
        totalMarks={totalMarks}
        testDate={testDate}
        onEditSetup={() => setIsSetupOpen(true)}
      />

      {/* Marks Entry Table */}
      <MarksEntryTable
        students={classData.students}
        marks={marks}
        totalMarks={totalMarks}
        onMarksChange={handleMarksChange}
        onFillAll={fillAll}
      />

      {/* Footer Stats & Save */}
      <ActionFooter
        action={
          <Button
            onClick={onSaveClick}
            size={"lg"}
            className={cn(
              "min-w-[200px] shadow-lg transition-all bg-accent hover:bg-accent-hover text-white shadow-accent/25",
            )}
          >
            <Save className="w-5 h-5 mr-2" />
            Save Marks
          </Button>
        }
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-success shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
          <span className="font-bold text-text-primary tabular-nums text-lg leading-none">
            {enteredCount}
          </span>
          <span className="font-medium text-text-muted text-xs uppercase tracking-wider">
            Entered
          </span>
        </div>
        <div className="h-4 w-px bg-border" />
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
          <span className="font-bold text-text-primary tabular-nums text-lg leading-none">
            {pendingCount}
          </span>
          <span className="font-medium text-text-muted text-xs uppercase tracking-wider">
            Pending
          </span>
        </div>
        <div className="h-4 w-px bg-border" />
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
          <span className="font-bold text-text-primary tabular-nums text-lg leading-none">
            {averageScore}%
          </span>
          <span className="font-medium text-text-muted text-xs uppercase tracking-wider">
            Average
          </span>
        </div>
      </ActionFooter>
    </div>
  );
}
