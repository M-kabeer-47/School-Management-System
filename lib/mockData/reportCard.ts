import { ReportCardData, GradeScale } from "@/lib/types/reportCard";

export const gradeScale: GradeScale[] = [
  { grade: "A+", minPercentage: 90, maxPercentage: 100, description: "Outstanding" },
  { grade: "A", minPercentage: 80, maxPercentage: 89, description: "Excellent" },
  { grade: "B+", minPercentage: 70, maxPercentage: 79, description: "Very Good" },
  { grade: "B", minPercentage: 60, maxPercentage: 69, description: "Good" },
  { grade: "C+", minPercentage: 50, maxPercentage: 59, description: "Satisfactory" },
  { grade: "C", minPercentage: 40, maxPercentage: 49, description: "Needs Improvement" },
  { grade: "F", minPercentage: 0, maxPercentage: 39, description: "Fail" },
];

export const mockReportCard: ReportCardData = {
  // School Info
  schoolName: "The City School",
  schoolAddress: "123 Education Avenue, Gulberg III, Lahore",
  schoolPhone: "(042) 3578-9012",
  schoolWebsite: "www.thecityschool.edu.pk",
  
  // Student Info
  studentName: "Ali Khan",
  studentId: "STU-2026-001",
  studentPhoto: "/student profile.avif",
  class: "8",
  section: "A",
  rollNo: "15",
  dateOfBirth: "May 15, 2012",
  fatherName: "Ahmed Khan",
  
  // Academic Info
  teacher: "Ms. Sarah Ahmed",
  schoolYear: "2025-2026",
  term: "Mid-Term Examination",
  examDate: "November 2025",
  
  // Results
  subjects: [
    { subject: "English", obtainedMarks: 87, totalMarks: 100, grade: "A" },
    { subject: "Mathematics", obtainedMarks: 92, totalMarks: 100, grade: "A+" },
    { subject: "Science", obtainedMarks: 78, totalMarks: 100, grade: "B+" },
    { subject: "Social Studies", obtainedMarks: 85, totalMarks: 100, grade: "A" },
    { subject: "Urdu", obtainedMarks: 90, totalMarks: 100, grade: "A+" },
    { subject: "Islamiat", obtainedMarks: 88, totalMarks: 100, grade: "A" },
    { subject: "Computer Science", obtainedMarks: 95, totalMarks: 100, grade: "A+" },
    { subject: "Art", obtainedMarks: 82, totalMarks: 100, grade: "A" },
  ],
  totalObtained: 697,
  totalMaxMarks: 800,
  percentage: 87.1,
  overallGrade: "A",
  rank: "3rd",
  remarks: "Ali is an excellent student with consistent performance. Shows great enthusiasm in Mathematics and Computer Science. He actively participates in class discussions and completes all assignments on time. Keep up the good work!",
  
  // Attendance
  attendance: {
    totalDays: 120,
    presentDays: 114,
    absentDays: 6,
    percentage: 95,
  },
};
