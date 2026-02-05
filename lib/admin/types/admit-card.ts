// Types for Admit Card functionality

export interface ExamScheduleItem {
  date: string;
  day: string;
  subject: string;
  time: string;
}

export interface AdmitCardData {
  schoolName: string;
  examName: string;
  studentName: string;
  fatherName: string;
  className: string;
  section: string;
  rollNo: string;
  room: string;
  photoUrl?: string;
  examSchedule: ExamScheduleItem[];
  instructions?: string[];
}

export type AdmitCardVariant = "standard" | "compact" | "detailed";

export interface AdmitCardTemplateProps {
  data: AdmitCardData;
  variant: AdmitCardVariant;
  className?: string;
}

export interface AdmitCardTemplateInfo {
  id: AdmitCardVariant;
  name: string;
  description: string;
}

export interface SavedInstructionTemplate {
  name: string;
  instructions: string[];
}
