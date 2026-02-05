"use client";

import { useState, useRef, useMemo } from "react";
import {
  Calendar,
  CheckCircle2,
  Printer,
  Filter,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/common/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import {
  CLASSES,
  SECTIONS,
  getClassSchedule,
  EXAM_ATTENDANCE_PRINT_STYLES,
} from "@/lib/admin/constants/exam-assets";
import { PrintableExamAttendanceSheet } from "./PrintableExamAttendanceSheet";

interface AttendanceSheetsTabProps {
  examTitle: string;
}

export function AttendanceSheetsTab({ examTitle }: AttendanceSheetsTabProps) {
  const [selectedClass, setSelectedClass] = useState(CLASSES[0].id);
  const [selectedSection, setSelectedSection] = useState(SECTIONS[0].id);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  const printRef = useRef<HTMLDivElement>(null);

  // Get class schedule based on selection
  const classSchedule = useMemo(() => {
    return getClassSchedule(selectedClass, selectedSection);
  }, [selectedClass, selectedSection]);

  // Reset selection when class/section changes
  const handleClassChange = (value: string) => {
    setSelectedClass(value);
    setSelectedDays([]);
    setShowPreview(false);
  };

  const handleSectionChange = (value: string) => {
    setSelectedSection(value);
    setSelectedDays([]);
    setShowPreview(false);
  };

  const toggleDaySelection = (date: string) => {
    setSelectedDays((prev) =>
      prev.includes(date) ? prev.filter((d) => d !== date) : [...prev, date]
    );
  };

  const selectAllDays = () => {
    if (!classSchedule) return;
    if (selectedDays.length === classSchedule.examDays.length) {
      setSelectedDays([]);
    } else {
      setSelectedDays(classSchedule.examDays.map((d) => d.date));
    }
  };

  const handlePrint = () => {
    if (!printRef.current || selectedDays.length === 0) return;

    const printContent = printRef.current.innerHTML;
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Attendance Sheets - ${classSchedule?.className} ${classSchedule?.section}</title>
          <style>${EXAM_ATTENDANCE_PRINT_STYLES}</style>
        </head>
        <body>${printContent}</body>
      </html>
    `);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 250);
  };

  return (
    <div className="space-y-6 pb-32">
      {/* Class/Section Filter */}
      <div className="bg-surface border border-border rounded-2xl p-6">
        <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
          <Filter className="w-5 h-5 text-accent" />
          Select Class & Section
        </h3>
        <div className="flex flex-wrap gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-secondary">
              Class
            </label>
            <Select value={selectedClass} onValueChange={handleClassChange}>
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent>
                {CLASSES.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-secondary">
              Section
            </label>
            <Select value={selectedSection} onValueChange={handleSectionChange}>
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Select Section" />
              </SelectTrigger>
              <SelectContent>
                {SECTIONS.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {classSchedule && (
          <div className="mt-4 text-sm text-text-secondary">
            <span className="font-medium text-text-primary">
              {classSchedule.students.length}
            </span>{" "}
            students •{" "}
            <span className="font-medium text-text-primary">
              {classSchedule.examDays.length}
            </span>{" "}
            exam days scheduled
          </div>
        )}
      </div>

      {/* Exam Days Selection */}
      {classSchedule && (
        <div className="bg-surface border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-text-primary mb-1 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-accent" />
                Exam Schedule for {classSchedule.className} -{" "}
                {classSchedule.section}
              </h3>
              <p className="text-sm text-text-secondary">
                Select exam days to generate attendance sheets
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={selectAllDays}>
              {selectedDays.length === classSchedule.examDays.length
                ? "Deselect All"
                : "Select All"}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {classSchedule.examDays.map((day) => (
              <button
                key={day.date}
                onClick={() => toggleDaySelection(day.date)}
                className={cn(
                  "w-full flex items-start gap-4 p-4 rounded-xl border-2 transition-all text-left",
                  selectedDays.includes(day.date)
                    ? "border-accent bg-accent/5"
                    : "border-border hover:border-accent/50"
                )}
              >
                <div
                  className={cn(
                    "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all mt-0.5 shrink-0",
                    selectedDays.includes(day.date)
                      ? "border-accent bg-accent"
                      : "border-border"
                  )}
                >
                  {selectedDays.includes(day.date) && (
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-text-primary">
                      {day.subject}
                    </p>
                  </div>
                  <p className="text-sm text-text-secondary">
                    {day.day},{" "}
                    {new Date(day.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-xs text-text-muted">
                    <span>{day.time}</span>
                    {day.venue && <span>• {day.venue}</span>}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Preview */}
      {showPreview && selectedDays.length > 0 && classSchedule && (
        <div className="bg-surface border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-text-primary flex items-center gap-2">
              <Eye className="w-5 h-5 text-accent" />
              Preview
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPreview(false)}
            >
              Hide Preview
            </Button>
          </div>
          <div className="bg-white rounded-xl p-6 border border-border overflow-auto max-h-[600px]">
            <div ref={printRef}>
              <PrintableExamAttendanceSheet
                students={classSchedule.students}
                examDays={classSchedule.examDays}
                selectedDays={selectedDays}
                className={classSchedule.className}
                section={classSchedule.section}
                examTitle={examTitle}
              />
            </div>
          </div>
        </div>
      )}

      {/* Hidden print content when preview is not shown */}
      {!showPreview && selectedDays.length > 0 && classSchedule && (
        <div className="hidden">
          <div ref={printRef}>
            <PrintableExamAttendanceSheet
              students={classSchedule.students}
              examDays={classSchedule.examDays}
              selectedDays={selectedDays}
              className={classSchedule.className}
              section={classSchedule.section}
              examTitle={examTitle}
            />
          </div>
        </div>
      )}

      {/* Sticky Action Bar */}
      {selectedDays.length > 0 && classSchedule && (
        <div className="fixed bottom-0 left-0 right-0 bg-surface/95 backdrop-blur-md border-t border-border shadow-lg z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="text-sm">
                  <span className="font-semibold text-text-primary">
                    {selectedDays.length}
                  </span>{" "}
                  <span className="text-text-secondary">
                    day{selectedDays.length > 1 ? "s" : ""} selected
                  </span>
                </div>
                <div className="h-4 w-px bg-border hidden sm:block" />
                <div className="text-sm text-text-secondary">
                  <span className="font-semibold text-text-primary">
                    {classSchedule.className} - {classSchedule.section}
                  </span>{" "}
                  • {classSchedule.students.length} students
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowPreview(!showPreview)}
                >
                  <Eye className="w-4 h-4" />
                  {showPreview ? "Hide Preview" : "Preview"}
                </Button>
                <Button onClick={handlePrint}>
                  <Printer className="w-4 h-4" />
                  Print Attendance Sheets
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
