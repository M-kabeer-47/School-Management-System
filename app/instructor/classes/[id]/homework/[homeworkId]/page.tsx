"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getClassDetail } from "@/lib/instructor/mock-data/class-detail";
import { ArrowLeft, Save, BookOpen, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import HomeworkReviewTable from "@/components/instructor/classes/homework/HomeworkReviewTable";
import FeedbackModal from "@/components/instructor/classes/homework/FeedbackModal";
import { Student } from "@/lib/instructor/types/class-detail";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { ActionFooter } from "@/components/instructor/classes/common/ActionFooter";

type HomeworkStatus = "checked" | "pending";

export default function HomeworkReviewPage() {
  const params = useParams();
  const router = useRouter();
  const classId = params.id as string;
  const homeworkId = params.homeworkId as string;
  const classData = getClassDetail(classId);

  // Mock fetching homework details based on ID
  const homework = classData.homeworks?.find((h) => h.id === homeworkId);

  // State
  // Initialize all as 'pending'
  const [statusMap, setStatusMap] = useState<Record<string, HomeworkStatus>>(
    () => {
      return classData.students.reduce(
        (acc, student) => ({
          ...acc,
          [student.id]: "pending",
        }),
        {},
      );
    },
  );

  const [feedbacks, setFeedbacks] = useState<Record<string, string>>({});
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Handlers
  const handleStatusChange = (studentId: string, status: HomeworkStatus) => {
    setStatusMap((prev) => ({ ...prev, [studentId]: status }));
    setHasChanges(true);
  };

  const handleMarkAll = (status: HomeworkStatus) => {
    const newStatusMap = classData.students.reduce(
      (acc, student) => ({
        ...acc,
        [student.id]: status,
      }),
      {},
    );
    setStatusMap(newStatusMap);
    setHasChanges(true);
  };

  const handleOpenFeedback = (student: Student) => {
    setSelectedStudent(student);
    setIsFeedbackModalOpen(true);
  };

  const handleSaveFeedback = (studentId: string, feedback: string) => {
    setFeedbacks((prev) => ({ ...prev, [studentId]: feedback }));
    setHasChanges(true);
  };

  const handleSave = () => {
    setIsSubmitDialogOpen(true);
  };

  const confirmSave = () => {
    console.log("Saving homework review:", {
      homeworkId,
      statusMap,
      feedbacks,
    });
    setHasChanges(false);
    setIsSubmitDialogOpen(false);
    router.push(`/instructor/classes/${classId}`);
  };

  // Stats
  const stats = Object.values(statusMap).reduce(
    (acc, status) => {
      acc[status]++;
      return acc;
    },
    { checked: 0, pending: 0 },
  );

  if (!homework) {
    return (
      <div className="p-8 text-center text-text-muted">Homework not found</div>
    );
  }

  return (
    <div className="pb-32 animate-in fade-in duration-300">
      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        student={selectedStudent}
        homeworkTitle={homework.description}
        onSave={handleSaveFeedback}
        initialFeedback={selectedStudent ? feedbacks[selectedStudent.id] : ""}
      />

      <ConfirmDialog
        isOpen={isSubmitDialogOpen}
        onClose={() => setIsSubmitDialogOpen(false)}
        onConfirm={confirmSave}
        title="Save Homework Review"
        message="You are about to save the review status for this homework."
        itemName={`${stats.checked} Checked, ${stats.pending} Pending`}
        variant="default"
        confirmText="Save Review"
      />

      {/* Header */}
      <div className="mb-8">
        <Link
          href={`/instructor/classes/${classId}`}
          className="inline-flex items-center text-sm font-bold text-text-secondary hover:text-accent mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back to Class
        </Link>

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-accent mb-2">
              <BookOpen className="w-5 h-5" />
              <span className="text-sm font-bold uppercase tracking-wider">
                Homework Review
              </span>
            </div>
            <h1 className="text-3xl font-bold font-heading text-text-primary">
              {homework.description}
            </h1>
            <p className="text-text-secondary">
              Mark students whose homework has been checked physically in class.
            </p>
            <div className="flex items-center gap-6 pt-2 text-sm text-text-muted">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>
                  Available: {homework.assignedDate?.toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Due: {homework.deadline?.toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <HomeworkReviewTable
        students={classData.students}
        homeworkStatus={statusMap}
        feedbacks={feedbacks}
        onStatusChange={handleStatusChange}
        onFeedbackClick={handleOpenFeedback}
        onMarkAll={handleMarkAll}
      />

      {/* Footer Stats & Save */}
      {/* Footer Stats & Save */}
      <ActionFooter
        action={
          <Button
            onClick={handleSave}
            size={"lg"}
            className="min-w-[200px] shadow-lg transition-all bg-accent hover:bg-accent-hover text-white shadow-accent/25"
          >
            <Save className="w-5 h-5 mr-2" />
            Save Review
          </Button>
        }
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-success shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
          <span className="font-bold text-text-primary tabular-nums text-lg leading-none">
            {stats.checked}
          </span>
          <span className="font-medium text-text-muted text-xs uppercase tracking-wider">
            Checked
          </span>
        </div>
        <div className="h-4 w-px bg-border" />
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-surface-active border border-text-muted/20" />
          <span className="font-bold text-text-primary tabular-nums text-lg leading-none">
            {stats.pending}
          </span>
          <span className="font-medium text-text-muted text-xs uppercase tracking-wider">
            Pending
          </span>
        </div>
      </ActionFooter>
    </div>
  );
}
