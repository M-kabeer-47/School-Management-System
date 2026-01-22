export interface SubjectResult {
  subject: string;
  obtainedMarks: number;
  totalMarks: number;
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
  term: string;
  examDate?: string;
  
  // Results
  subjects: SubjectResult[];
  totalObtained: number;
  totalMaxMarks: number;
  percentage: number;
  overallGrade: string;
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
