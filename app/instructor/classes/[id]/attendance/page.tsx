"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  getAttendanceDetails,
  getClassDetail,
} from "@/lib/instructor/mock-data/class-detail";
import { CalendarCheck, Save } from "lucide-react";

import { cn } from "@/lib/shadcn/utils";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import DateTimePicker from "@/components/ui/DateTimePicker";
import Modal from "@/components/ui/Modal";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

import AttendanceHeader from "@/components/instructor/classes/attendance/AttendanceHeader";
import AttendanceTable from "@/components/instructor/classes/attendance/AttendanceTable";

type AttendanceStatus = "present" | "absent" | "leave";

export default function TakeAttendancePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const classId = params.id as string;
  const recordId = searchParams.get("recordId");
  const classData = getClassDetail(classId);

  // Setup State
  const [isSetupOpen, setIsSetupOpen] = useState(!recordId);
  const [lectureName, setLectureName] = useState("");
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString(),
  );

  // Attendance State
  const [attendance, setAttendance] = useState<
    Record<string, AttendanceStatus>
  >(() => {
    // Initial state based on recordId or default
    if (recordId) {
      const record = getAttendanceDetails(classId, recordId);
      if (record) {
        return record.studentStatuses;
      }
    }
    return classData.students.reduce(
      (acc, student) => ({ ...acc, [student.id]: "present" }),
      {},
    );
  });

  // Load record details if editing
  useEffect(() => {
    if (recordId) {
      const record = getAttendanceDetails(classId, recordId);
      if (record) {
        setLectureName(record.topic);
        setSelectedDate(record.date);
        // Attendance map set in initial state, but could update here if needed for re-fetches
        setIsSetupOpen(false);
      }
    }
  }, [recordId, classId]);

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

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setAttendance((prev) => ({ ...prev, [studentId]: status }));
    setHasChanges(true);
  };

  const markAll = (status: AttendanceStatus) => {
    // No confirmation needed for Mark All as per request
    const newAttendance = classData.students.reduce(
      (acc, student) => ({ ...acc, [student.id]: status }),
      {},
    );
    setAttendance(newAttendance);
    setHasChanges(true);
  };

  const handleStartAttendance = () => {
    if (!lectureName.trim()) return;
    setIsSetupOpen(false);
  };

  const onSaveClick = () => {
    setIsSubmitModalOpen(true);
  };

  const handleConfirmSave = () => {
    console.log("Saving attendance:", {
      lectureName,
      date: selectedDate,
      attendance,
    });
    setHasChanges(false);
    setIsSubmitModalOpen(false);
    router.push(`/instructor/classes/${classId}`);
  };

  // Stats calculation
  const stats = Object.values(attendance).reduce(
    (acc, status) => {
      acc[status]++;
      return acc;
    },
    { present: 0, absent: 0, leave: 0 },
  );

  return (
    <div className="pb-32 animate-in fade-in duration-300">
      {/* Setup Modal */}
      <Modal
        isOpen={isSetupOpen}
        onClose={() =>
          !lectureName.trim() ? router.back() : setIsSetupOpen(false)
        }
        title="Attendance Setup"
        description="Enter lecture details to start taking attendance."
        icon={<CalendarCheck className="w-6 h-6" />}
        maxWidth="md"
      >
        <div className="space-y-6 pt-2">
          <div className="space-y-2">
            <Input
              label="Lecture Topic / Name"
              value={lectureName}
              onChange={(e) => setLectureName(e.target.value)}
              placeholder="e.g. Introduction to Calculus"
              autoFocus
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary mb-1.5">
              Date & Time
            </label>
            <DateTimePicker
              inline
              value={selectedDate}
              onChange={setSelectedDate}
              placeholder="Select Date & Time"
            />
          </div>
          <div className="flex justify-end pt-4 gap-3">
            <Button
              variant="ghost"
              onClick={() =>
                !lectureName.trim() ? router.back() : setIsSetupOpen(false)
              }
            >
              Cancel
            </Button>
            <Button
              onClick={handleStartAttendance}
              disabled={!lectureName.trim()}
              className="bg-accent hover:bg-accent-hover text-white"
            >
              Start Attendance
            </Button>
          </div>
        </div>
      </Modal>

      {/* Confirmation Modal */}
      <ConfirmDialog
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onConfirm={handleConfirmSave}
        title="Submit Attendance"
        message={`You are about to submit attendance for "${lectureName}".`}
        itemName={`${stats.present} Present, ${stats.absent} Absent`}
        confirmText="Submit Attendance"
        variant="default"
      />

      {/* Header */}
      <AttendanceHeader
        classId={classId}
        grade={classData.grade}
        section={classData.section}
        lectureName={lectureName}
        selectedDate={selectedDate}
        onEditSetup={() => setIsSetupOpen(true)}
      />

      {/* Student Table */}
      <AttendanceTable
        students={classData.students}
        attendance={attendance}
        onStatusChange={handleStatusChange}
        onMarkAll={markAll}
      />

      {/* Footer Stats & Save */}
      <div className="fixed bottom-0 left-0 right-0 md:left-[17rem] bg-background/80 backdrop-blur-xl border-t border-border z-30 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-4">
          {/* Stats Summary */}
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
              <span className="font-bold text-text-primary tabular-nums text-lg leading-none">
                {stats.present}
              </span>
              <span className="font-medium text-text-muted text-xs uppercase tracking-wider">
                Present
              </span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-error shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
              <span className="font-bold text-text-primary tabular-nums text-lg leading-none">
                {stats.absent}
              </span>
              <span className="font-medium text-text-muted text-xs uppercase tracking-wider">
                Absent
              </span>
            </div>
          </div>

          <Button
            onClick={onSaveClick}
            size={"lg"}
            className={cn(
              "min-w-[200px] shadow-lg transition-all bg-accent hover:bg-accent-hover text-white shadow-accent/25",
            )}
          >
            <Save className="w-5 h-5 mr-2" />
            Save Attendance
          </Button>
        </div>
      </div>
    </div>
  );
}
