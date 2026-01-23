export interface TermMarks {
  term: string;
  obtainedMarks: number;
  totalMarks: number;
  grade: string;
}

export interface SubjectResult {
  subject: string;
  termMarks: TermMarks[];
  finalObtained: number;
  finalTotal: number;
  finalGrade: string;
}

export interface TermSummary {
  term: string;
  totalObtained: number;
  totalMaxMarks: number;
  percentage: number;
  grade: string;
}

export interface ReportCardData {
  // School Info
  schoolName: string;
  schoolAddress: string;
  schoolPhone: string;
  schoolWebsite: string;
  schoolLogo?: string;
  
  // Student Info
  studentName: string;
  studentId: string;
  studentPhoto?: string;
  class: string;
  section: string;
  rollNo: string;
  dateOfBirth?: string;
  fatherName: string;
  
  // Academic Info
  teacher: string;
  schoolYear: string;
  terms: string[]; // e.g., ["Term 1", "Term 2"]
  examDate?: string;
  
  // Results
  subjects: SubjectResult[];
  termSummaries: TermSummary[];
  finalTotalObtained: number;
  finalTotalMaxMarks: number;
  finalPercentage: number;
  finalGrade: string;
  rank?: string;
  remarks: string;
  
  // Attendance
  attendance: {
    totalDays: number;
    presentDays: number;
    absentDays: number;
    percentage: number;
  };
}

export interface GradeScale {
  grade: string;
  minPercentage: number;
  maxPercentage: number;
  description: string;
}
