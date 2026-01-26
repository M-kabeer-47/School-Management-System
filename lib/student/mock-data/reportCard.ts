import { ReportCardData, GradeScale } from "@/lib/student/types/reportCard";

export const gradeScale: GradeScale[] = [
  {
    grade: "A+",
    minPercentage: 90,
    maxPercentage: 100,
    description: "Outstanding",
  },
  {
    grade: "A",
    minPercentage: 80,
    maxPercentage: 89,
    description: "Excellent",
  },
  {
    grade: "B+",
    minPercentage: 70,
    maxPercentage: 79,
    description: "Very Good",
  },
  { grade: "B", minPercentage: 60, maxPercentage: 69, description: "Good" },
  {
    grade: "C+",
    minPercentage: 50,
    maxPercentage: 59,
    description: "Satisfactory",
  },
  {
    grade: "C",
    minPercentage: 40,
    maxPercentage: 49,
    description: "Needs Improvement",
  },
  { grade: "F", minPercentage: 0, maxPercentage: 39, description: "Fail" },
];

// Shared student information (same student across all classes)
const studentInfo = {
  studentName: "Ali Khan",
  studentId: "STU-2026-001",
  studentPhoto: "/student profile.avif",
  dateOfBirth: "May 15, 2015",
  fatherName: "Ahmed Khan",
};

// Shared school information
const schoolInfo = {
  schoolName: "The City School",
  schoolAddress: "123 Education Avenue, Gulberg III, Lahore",
  schoolPhone: "(042) 3578-9012",
  schoolWebsite: "www.thecityschool.edu.pk",
};

// Mock data for different classes - Same student, different class records
export const mockReportCards: Record<string, ReportCardData> = {
  "class-5": {
    ...schoolInfo,
    ...studentInfo,

    class: "5",
    section: "A",
    rollNo: "15",
    teacher: "Ms. Sarah Ahmed",
    schoolYear: "2022-2023",
    terms: ["Term 1", "Term 2"],
    examDate: "March 2023",

    subjects: [
      {
        subject: "English",
        termMarks: [
          { term: "Term 1", obtainedMarks: 85, totalMarks: 100, grade: "A" },
          { term: "Term 2", obtainedMarks: 88, totalMarks: 100, grade: "A" },
        ],
        finalObtained: 173,
        finalTotal: 200,
        finalGrade: "A",
      },
      {
        subject: "Mathematics",
        termMarks: [
          { term: "Term 1", obtainedMarks: 92, totalMarks: 100, grade: "A+" },
          { term: "Term 2", obtainedMarks: 94, totalMarks: 100, grade: "A+" },
        ],
        finalObtained: 186,
        finalTotal: 200,
        finalGrade: "A+",
      },
      {
        subject: "Science",
        termMarks: [
          { term: "Term 1", obtainedMarks: 78, totalMarks: 100, grade: "B+" },
          { term: "Term 2", obtainedMarks: 82, totalMarks: 100, grade: "A" },
        ],
        finalObtained: 160,
        finalTotal: 200,
        finalGrade: "A",
      },
      {
        subject: "Social Studies",
        termMarks: [
          { term: "Term 1", obtainedMarks: 80, totalMarks: 100, grade: "A" },
          { term: "Term 2", obtainedMarks: 85, totalMarks: 100, grade: "A" },
        ],
        finalObtained: 165,
        finalTotal: 200,
        finalGrade: "A",
      },
      {
        subject: "Urdu",
        termMarks: [
          { term: "Term 1", obtainedMarks: 88, totalMarks: 100, grade: "A" },
          { term: "Term 2", obtainedMarks: 90, totalMarks: 100, grade: "A+" },
        ],
        finalObtained: 178,
        finalTotal: 200,
        finalGrade: "A",
      },
      {
        subject: "Islamiat",
        termMarks: [
          { term: "Term 1", obtainedMarks: 90, totalMarks: 100, grade: "A+" },
          { term: "Term 2", obtainedMarks: 92, totalMarks: 100, grade: "A+" },
        ],
        finalObtained: 182,
        finalTotal: 200,
        finalGrade: "A+",
      },
      {
        subject: "Computer",
        termMarks: [
          { term: "Term 1", obtainedMarks: 95, totalMarks: 100, grade: "A+" },
          { term: "Term 2", obtainedMarks: 96, totalMarks: 100, grade: "A+" },
        ],
        finalObtained: 191,
        finalTotal: 200,
        finalGrade: "A+",
      },
      {
        subject: "Art",
        termMarks: [
          { term: "Term 1", obtainedMarks: 82, totalMarks: 100, grade: "A" },
          { term: "Term 2", obtainedMarks: 85, totalMarks: 100, grade: "A" },
        ],
        finalObtained: 167,
        finalTotal: 200,
        finalGrade: "A",
      },
    ],
    termSummaries: [
      {
        term: "Term 1",
        totalObtained: 690,
        totalMaxMarks: 800,
        percentage: 86.25,
        grade: "A",
      },
      {
        term: "Term 2",
        totalObtained: 712,
        totalMaxMarks: 800,
        percentage: 89.0,
        grade: "A",
      },
    ],
    finalTotalObtained: 1402,
    finalTotalMaxMarks: 1600,
    finalPercentage: 87.6,
    finalGrade: "A",
    rank: "3rd",
    remarks:
      "Ali shows excellent performance in Class 5. He has a strong foundation in Mathematics and Computer Science. His improvement in Science from Term 1 to Term 2 is commendable. Keep up the good work!",

    attendance: {
      totalDays: 220,
      presentDays: 210,
      absentDays: 10,
      percentage: 95,
    },
  },

  "class-6": {
    ...schoolInfo,
    ...studentInfo,

    class: "6",
    section: "A",
    rollNo: "12",
    teacher: "Mr. Hassan Ali",
    schoolYear: "2023-2024",
    terms: ["Term 1", "Term 2"],
    examDate: "March 2024",

    subjects: [
      {
        subject: "English",
        termMarks: [
          { term: "Term 1", obtainedMarks: 88, totalMarks: 100, grade: "A" },
          { term: "Term 2", obtainedMarks: 91, totalMarks: 100, grade: "A+" },
        ],
        finalObtained: 179,
        finalTotal: 200,
        finalGrade: "A",
      },
      {
        subject: "Mathematics",
        termMarks: [
          { term: "Term 1", obtainedMarks: 94, totalMarks: 100, grade: "A+" },
          { term: "Term 2", obtainedMarks: 96, totalMarks: 100, grade: "A+" },
        ],
        finalObtained: 190,
        finalTotal: 200,
        finalGrade: "A+",
      },
      {
        subject: "Science",
        termMarks: [
          { term: "Term 1", obtainedMarks: 88, totalMarks: 100, grade: "A" },
          { term: "Term 2", obtainedMarks: 90, totalMarks: 100, grade: "A+" },
        ],
        finalObtained: 178,
        finalTotal: 200,
        finalGrade: "A",
      },
      {
        subject: "Social Studies",
        termMarks: [
          { term: "Term 1", obtainedMarks: 85, totalMarks: 100, grade: "A" },
          { term: "Term 2", obtainedMarks: 88, totalMarks: 100, grade: "A" },
        ],
        finalObtained: 173,
        finalTotal: 200,
        finalGrade: "A",
      },
      {
        subject: "Urdu",
        termMarks: [
          { term: "Term 1", obtainedMarks: 90, totalMarks: 100, grade: "A+" },
          { term: "Term 2", obtainedMarks: 92, totalMarks: 100, grade: "A+" },
        ],
        finalObtained: 182,
        finalTotal: 200,
        finalGrade: "A+",
      },
      {
        subject: "Islamiat",
        termMarks: [
          { term: "Term 1", obtainedMarks: 95, totalMarks: 100, grade: "A+" },
          { term: "Term 2", obtainedMarks: 96, totalMarks: 100, grade: "A+" },
        ],
        finalObtained: 191,
        finalTotal: 200,
        finalGrade: "A+",
      },
      {
        subject: "Computer",
        termMarks: [
          { term: "Term 1", obtainedMarks: 82, totalMarks: 100, grade: "A" },
          { term: "Term 2", obtainedMarks: 85, totalMarks: 100, grade: "A" },
        ],
        finalObtained: 167,
        finalTotal: 200,
        finalGrade: "A",
      },
      {
        subject: "Art",
        termMarks: [
          { term: "Term 1", obtainedMarks: 88, totalMarks: 100, grade: "A" },
          { term: "Term 2", obtainedMarks: 90, totalMarks: 100, grade: "A+" },
        ],
        finalObtained: 178,
        finalTotal: 200,
        finalGrade: "A",
      },
    ],
    termSummaries: [
      {
        term: "Term 1",
        totalObtained: 710,
        totalMaxMarks: 800,
        percentage: 88.75,
        grade: "A",
      },
      {
        term: "Term 2",
        totalObtained: 728,
        totalMaxMarks: 800,
        percentage: 91.0,
        grade: "A+",
      },
    ],
    finalTotalObtained: 1438,
    finalTotalMaxMarks: 1600,
    finalPercentage: 89.9,
    finalGrade: "A",
    rank: "2nd",
    remarks:
      "Ali continues to excel in Class 6. His performance in Mathematics and Islamiat is outstanding. He shows consistent improvement across all subjects. Keep up the excellent work!",

    attendance: {
      totalDays: 220,
      presentDays: 215,
      absentDays: 5,
      percentage: 98,
    },
  },

  "class-7": {
    ...schoolInfo,
    ...studentInfo,

    class: "7",
    section: "B",
    rollNo: "08",
    teacher: "Mrs. Ayesha Malik",
    schoolYear: "2024-2025",
    terms: ["Term 1", "Term 2"],
    examDate: "March 2025",

    subjects: [
      {
        subject: "English",
        termMarks: [
          { term: "Term 1", obtainedMarks: 72, totalMarks: 100, grade: "B+" },
          { term: "Term 2", obtainedMarks: 78, totalMarks: 100, grade: "B+" },
        ],
        finalObtained: 150,
        finalTotal: 200,
        finalGrade: "B+",
      },
      {
        subject: "Mathematics",
        termMarks: [
          { term: "Term 1", obtainedMarks: 85, totalMarks: 100, grade: "A" },
          { term: "Term 2", obtainedMarks: 88, totalMarks: 100, grade: "A" },
        ],
        finalObtained: 173,
        finalTotal: 200,
        finalGrade: "A",
      },
      {
        subject: "Science",
        termMarks: [
          { term: "Term 1", obtainedMarks: 80, totalMarks: 100, grade: "A" },
          { term: "Term 2", obtainedMarks: 82, totalMarks: 100, grade: "A" },
        ],
        finalObtained: 162,
        finalTotal: 200,
        finalGrade: "A",
      },
      {
        subject: "Social Studies",
        termMarks: [
          { term: "Term 1", obtainedMarks: 68, totalMarks: 100, grade: "B" },
          { term: "Term 2", obtainedMarks: 72, totalMarks: 100, grade: "B+" },
        ],
        finalObtained: 140,
        finalTotal: 200,
        finalGrade: "B+",
      },
      {
        subject: "Urdu",
        termMarks: [
          { term: "Term 1", obtainedMarks: 75, totalMarks: 100, grade: "B+" },
          { term: "Term 2", obtainedMarks: 78, totalMarks: 100, grade: "B+" },
        ],
        finalObtained: 153,
        finalTotal: 200,
        finalGrade: "B+",
      },
      {
        subject: "Islamiat",
        termMarks: [
          { term: "Term 1", obtainedMarks: 82, totalMarks: 100, grade: "A" },
          { term: "Term 2", obtainedMarks: 85, totalMarks: 100, grade: "A" },
        ],
        finalObtained: 167,
        finalTotal: 200,
        finalGrade: "A",
      },
      {
        subject: "Computer",
        termMarks: [
          { term: "Term 1", obtainedMarks: 90, totalMarks: 100, grade: "A+" },
          { term: "Term 2", obtainedMarks: 92, totalMarks: 100, grade: "A+" },
        ],
        finalObtained: 182,
        finalTotal: 200,
        finalGrade: "A+",
      },
      {
        subject: "P.E.",
        termMarks: [
          { term: "Term 1", obtainedMarks: 88, totalMarks: 100, grade: "A" },
          { term: "Term 2", obtainedMarks: 90, totalMarks: 100, grade: "A+" },
        ],
        finalObtained: 178,
        finalTotal: 200,
        finalGrade: "A",
      },
    ],
    termSummaries: [
      {
        term: "Term 1",
        totalObtained: 640,
        totalMaxMarks: 800,
        percentage: 80.0,
        grade: "A",
      },
      {
        term: "Term 2",
        totalObtained: 665,
        totalMaxMarks: 800,
        percentage: 83.1,
        grade: "A",
      },
    ],
    finalTotalObtained: 1305,
    finalTotalMaxMarks: 1600,
    finalPercentage: 81.6,
    finalGrade: "A",
    rank: "8th",
    remarks:
      "Ali shows good improvement from Term 1 to Term 2. He excels in Computer Science and Physical Education. Needs to focus more on English and Social Studies. Regular revision will help improve his performance.",

    attendance: {
      totalDays: 220,
      presentDays: 200,
      absentDays: 20,
      percentage: 91,
    },
  },

  "class-8": {
    ...schoolInfo,
    ...studentInfo,

    class: "8",
    section: "A",
    rollNo: "05",
    teacher: "Mr. Khalid Hussain",
    schoolYear: "2025-2026",
    terms: ["Term 1", "Term 2"],
    examDate: "March 2026",

    subjects: [
      {
        subject: "English",
        termMarks: [
          { term: "Term 1", obtainedMarks: 88, totalMarks: 100, grade: "A" },
          { term: "Term 2", obtainedMarks: 91, totalMarks: 100, grade: "A+" },
        ],
        finalObtained: 179,
        finalTotal: 200,
        finalGrade: "A",
      },
      {
        subject: "Mathematics",
        termMarks: [
          { term: "Term 1", obtainedMarks: 95, totalMarks: 100, grade: "A+" },
          { term: "Term 2", obtainedMarks: 97, totalMarks: 100, grade: "A+" },
        ],
        finalObtained: 192,
        finalTotal: 200,
        finalGrade: "A+",
      },
      {
        subject: "Physics",
        termMarks: [
          { term: "Term 1", obtainedMarks: 90, totalMarks: 100, grade: "A+" },
          { term: "Term 2", obtainedMarks: 92, totalMarks: 100, grade: "A+" },
        ],
        finalObtained: 182,
        finalTotal: 200,
        finalGrade: "A+",
      },
      {
        subject: "Chemistry",
        termMarks: [
          { term: "Term 1", obtainedMarks: 86, totalMarks: 100, grade: "A" },
          { term: "Term 2", obtainedMarks: 89, totalMarks: 100, grade: "A" },
        ],
        finalObtained: 175,
        finalTotal: 200,
        finalGrade: "A",
      },
      {
        subject: "Biology",
        termMarks: [
          { term: "Term 1", obtainedMarks: 92, totalMarks: 100, grade: "A+" },
          { term: "Term 2", obtainedMarks: 94, totalMarks: 100, grade: "A+" },
        ],
        finalObtained: 186,
        finalTotal: 200,
        finalGrade: "A+",
      },
      {
        subject: "Urdu",
        termMarks: [
          { term: "Term 1", obtainedMarks: 85, totalMarks: 100, grade: "A" },
          { term: "Term 2", obtainedMarks: 88, totalMarks: 100, grade: "A" },
        ],
        finalObtained: 173,
        finalTotal: 200,
        finalGrade: "A",
      },
      {
        subject: "Islamiat",
        termMarks: [
          { term: "Term 1", obtainedMarks: 94, totalMarks: 100, grade: "A+" },
          { term: "Term 2", obtainedMarks: 96, totalMarks: 100, grade: "A+" },
        ],
        finalObtained: 190,
        finalTotal: 200,
        finalGrade: "A+",
      },
      {
        subject: "Computer",
        termMarks: [
          { term: "Term 1", obtainedMarks: 98, totalMarks: 100, grade: "A+" },
          { term: "Term 2", obtainedMarks: 99, totalMarks: 100, grade: "A+" },
        ],
        finalObtained: 197,
        finalTotal: 200,
        finalGrade: "A+",
      },
    ],
    termSummaries: [
      {
        term: "Term 1",
        totalObtained: 728,
        totalMaxMarks: 800,
        percentage: 91.0,
        grade: "A+",
      },
      {
        term: "Term 2",
        totalObtained: 746,
        totalMaxMarks: 800,
        percentage: 93.25,
        grade: "A+",
      },
    ],
    finalTotalObtained: 1474,
    finalTotalMaxMarks: 1600,
    finalPercentage: 92.1,
    finalGrade: "A+",
    rank: "1st",
    remarks:
      "Ali is an exceptional student with outstanding academic performance. He consistently ranks first in class and shows remarkable aptitude in Mathematics and Computer Science. His disciplined approach and curiosity make him an ideal student. Highly recommended for advanced studies.",

    attendance: {
      totalDays: 220,
      presentDays: 220,
      absentDays: 0,
      percentage: 100,
    },
  },
};

// Default export for backward compatibility
export const mockReportCard = mockReportCards["class-5"];
