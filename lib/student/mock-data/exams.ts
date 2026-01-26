import { ExamDocument, TermResult } from "@/lib/student/types/exams";

export const examDocuments: ExamDocument[] = [
  {
    id: "doc-001",
    title: "Mid-Term Exam Slip",
    type: "exam-slip",
    pdfUrl:
      "https://mahesararslan-merge-bucket.s3.eu-north-1.amazonaws.com/room-files/77f26d1c-26cb-418c-b98c-3c7391dcef8b/1765735147127-e3bb11be-f6af-48e8-870a-688d243d34f3.pdf",
    examName: "Mid-Term Examination 2026",
    date: "2026-02-20",
  },
  {
    id: "doc-002",
    title: "Mid-Term Date Sheet",
    type: "datesheet",
    pdfUrl:
      "https://mahesararslan-merge-bucket.s3.eu-north-1.amazonaws.com/room-files/77f26d1c-26cb-418c-b98c-3c7391dcef8b/1765735147127-e3bb11be-f6af-48e8-870a-688d243d34f3.pdf",
    examName: "Mid-Term Examination 2026",
    date: "2026-02-20",
  },
];

export const previousResults: TermResult[] = [
  {
    id: "result-001",
    termName: "First Term",
    examName: "First Term Examination",
    date: "2025-10-15",
    totalMarks: 550,
    obtainedMarks: 478,
    percentage: 86.9,
    grade: "A",
    position: 5,
    subjects: [
      { subject: "English", totalMarks: 100, obtainedMarks: 85, grade: "A" },
      {
        subject: "Mathematics",
        totalMarks: 100,
        obtainedMarks: 92,
        grade: "A+",
      },
      { subject: "Science", totalMarks: 100, obtainedMarks: 88, grade: "A" },
      { subject: "Urdu", totalMarks: 100, obtainedMarks: 78, grade: "B+" },
      { subject: "Islamiat", totalMarks: 50, obtainedMarks: 45, grade: "A" },
      { subject: "Computer", totalMarks: 100, obtainedMarks: 90, grade: "A+" },
    ],
  },
  {
    id: "result-002",
    termName: "Final Term",
    examName: "Final Term Examination",
    date: "2025-03-20",
    totalMarks: 550,
    obtainedMarks: 465,
    percentage: 84.5,
    grade: "A",
    position: 7,
    subjects: [
      { subject: "English", totalMarks: 100, obtainedMarks: 82, grade: "A" },
      {
        subject: "Mathematics",
        totalMarks: 100,
        obtainedMarks: 88,
        grade: "A",
      },
      { subject: "Science", totalMarks: 100, obtainedMarks: 85, grade: "A" },
      { subject: "Urdu", totalMarks: 100, obtainedMarks: 75, grade: "B+" },
      { subject: "Islamiat", totalMarks: 50, obtainedMarks: 42, grade: "A" },
      { subject: "Computer", totalMarks: 100, obtainedMarks: 93, grade: "A+" },
    ],
  },
  {
    id: "result-003",
    termName: "Mid Term",
    examName: "Mid Term Examination",
    date: "2024-12-10",
    totalMarks: 550,
    obtainedMarks: 490,
    percentage: 89.1,
    grade: "A+",
    position: 3,
    subjects: [
      { subject: "English", totalMarks: 100, obtainedMarks: 90, grade: "A+" },
      {
        subject: "Mathematics",
        totalMarks: 100,
        obtainedMarks: 95,
        grade: "A+",
      },
      { subject: "Science", totalMarks: 100, obtainedMarks: 88, grade: "A" },
      { subject: "Urdu", totalMarks: 100, obtainedMarks: 80, grade: "A" },
      { subject: "Islamiat", totalMarks: 50, obtainedMarks: 47, grade: "A+" },
      { subject: "Computer", totalMarks: 100, obtainedMarks: 90, grade: "A+" },
    ],
  },
];
