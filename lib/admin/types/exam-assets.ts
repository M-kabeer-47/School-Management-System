/**
 * Type definitions for Exam Assets (Admit Cards & Attendance Sheets)
 */

export type TabType = "admit-cards" | "attendance";

export interface ClassOption {
  id: string;
  name: string;
}

export interface SectionOption {
  id: string;
  name: string;
}

export interface ExamDay {
  date: string;
  day: string;
  subject: string;
  time: string;
  venue?: string;
}

export interface InstructionsState {
  customInstructions: string[];
  newInstruction: string;
  templateName: string;
}

// Exam Attendance Sheet Types
export interface ExamAttendanceStudent {
  id: string;
  rollNo: string;
  name: string;
  fatherName: string;
  seatNo?: string;
}

export interface ClassExamSchedule {
  classId: string;
  className: string;
  section: string;
  students: ExamAttendanceStudent[];
  examDays: ExamDay[];
}
