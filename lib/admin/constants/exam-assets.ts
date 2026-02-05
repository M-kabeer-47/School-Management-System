/**
 * Constants for Exam Assets (Admit Cards & Attendance Sheets)
 */

import type {
  ClassOption,
  SectionOption,
  ClassExamSchedule,
  ExamAttendanceStudent,
} from "@/lib/admin/types/exam-assets";

export const CLASSES: ClassOption[] = [
  { id: "9", name: "Class 9" },
  { id: "10", name: "Class 10" },
  { id: "11", name: "Class 11" },
  { id: "12", name: "Class 12" },
];

export const SECTIONS: SectionOption[] = [
  { id: "A", name: "Section A" },
  { id: "B", name: "Section B" },
  { id: "C", name: "Section C" },
];

// Generate students for a class
const generateStudents = (
  classId: string,
  section: string,
  count: number
): ExamAttendanceStudent[] => {
  const firstNames = [
    "Ahmed",
    "Muhammad",
    "Ali",
    "Hassan",
    "Usman",
    "Bilal",
    "Zain",
    "Hamza",
    "Ibrahim",
    "Omar",
    "Fatima",
    "Ayesha",
    "Zainab",
    "Maryam",
    "Khadija",
    "Sara",
    "Hira",
    "Amina",
    "Noor",
    "Sana",
    "Asad",
    "Farhan",
    "Kamran",
    "Rizwan",
    "Shahid",
    "Nasir",
    "Waqas",
    "Imran",
    "Tariq",
    "Adnan",
  ];
  const lastNames = [
    "Khan",
    "Ahmed",
    "Ali",
    "Hussain",
    "Malik",
    "Sheikh",
    "Qureshi",
    "Siddiqui",
    "Butt",
    "Chaudhry",
  ];
  const fatherFirstNames = [
    "Muhammad",
    "Abdul",
    "Syed",
    "Hafiz",
    "Maulana",
    "Haji",
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `${classId}-${section}-${i + 1}`,
    rollNo: `${classId}${section}${String(i + 1).padStart(3, "0")}`,
    name: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
    fatherName: `${fatherFirstNames[i % fatherFirstNames.length]} ${lastNames[(i + 3) % lastNames.length]}`,
    seatNo: `${section}-${String(i + 1).padStart(2, "0")}`,
  }));
};

// Class-specific exam schedules with different subjects and dates
export const CLASS_EXAM_SCHEDULES: ClassExamSchedule[] = [
  // Class 9
  {
    classId: "9",
    className: "Class 9",
    section: "A",
    students: generateStudents("9", "A", 28),
    examDays: [
      { date: "2026-02-15", day: "Sunday", subject: "Mathematics", time: "09:00 AM - 12:00 PM", venue: "Block A - Room 101" },
      { date: "2026-02-17", day: "Tuesday", subject: "English", time: "09:00 AM - 12:00 PM", venue: "Block A - Room 101" },
      { date: "2026-02-19", day: "Thursday", subject: "Physics", time: "09:00 AM - 12:00 PM", venue: "Block A - Room 102" },
      { date: "2026-02-21", day: "Saturday", subject: "Chemistry", time: "09:00 AM - 12:00 PM", venue: "Block A - Room 102" },
      { date: "2026-02-23", day: "Monday", subject: "Biology", time: "09:00 AM - 12:00 PM", venue: "Block A - Room 103" },
      { date: "2026-02-25", day: "Wednesday", subject: "Computer Science", time: "09:00 AM - 11:00 AM", venue: "Lab 1" },
    ],
  },
  {
    classId: "9",
    className: "Class 9",
    section: "B",
    students: generateStudents("9", "B", 30),
    examDays: [
      { date: "2026-02-15", day: "Sunday", subject: "Mathematics", time: "09:00 AM - 12:00 PM", venue: "Block A - Room 104" },
      { date: "2026-02-17", day: "Tuesday", subject: "English", time: "09:00 AM - 12:00 PM", venue: "Block A - Room 104" },
      { date: "2026-02-19", day: "Thursday", subject: "Physics", time: "09:00 AM - 12:00 PM", venue: "Block A - Room 105" },
      { date: "2026-02-21", day: "Saturday", subject: "Chemistry", time: "09:00 AM - 12:00 PM", venue: "Block A - Room 105" },
      { date: "2026-02-23", day: "Monday", subject: "Biology", time: "09:00 AM - 12:00 PM", venue: "Block A - Room 106" },
      { date: "2026-02-25", day: "Wednesday", subject: "Computer Science", time: "09:00 AM - 11:00 AM", venue: "Lab 2" },
    ],
  },
  {
    classId: "9",
    className: "Class 9",
    section: "C",
    students: generateStudents("9", "C", 25),
    examDays: [
      { date: "2026-02-15", day: "Sunday", subject: "Mathematics", time: "09:00 AM - 12:00 PM", venue: "Block B - Room 201" },
      { date: "2026-02-17", day: "Tuesday", subject: "English", time: "09:00 AM - 12:00 PM", venue: "Block B - Room 201" },
      { date: "2026-02-19", day: "Thursday", subject: "Physics", time: "09:00 AM - 12:00 PM", venue: "Block B - Room 202" },
      { date: "2026-02-21", day: "Saturday", subject: "Chemistry", time: "09:00 AM - 12:00 PM", venue: "Block B - Room 202" },
      { date: "2026-02-23", day: "Monday", subject: "Biology", time: "09:00 AM - 12:00 PM", venue: "Block B - Room 203" },
      { date: "2026-02-25", day: "Wednesday", subject: "Computer Science", time: "09:00 AM - 11:00 AM", venue: "Lab 3" },
    ],
  },
  // Class 10
  {
    classId: "10",
    className: "Class 10",
    section: "A",
    students: generateStudents("10", "A", 32),
    examDays: [
      { date: "2026-02-16", day: "Monday", subject: "Mathematics", time: "09:00 AM - 12:00 PM", venue: "Block C - Room 301" },
      { date: "2026-02-18", day: "Wednesday", subject: "English", time: "09:00 AM - 12:00 PM", venue: "Block C - Room 301" },
      { date: "2026-02-20", day: "Friday", subject: "Physics", time: "09:00 AM - 12:00 PM", venue: "Block C - Room 302" },
      { date: "2026-02-22", day: "Sunday", subject: "Chemistry", time: "09:00 AM - 12:00 PM", venue: "Block C - Room 302" },
      { date: "2026-02-24", day: "Tuesday", subject: "Biology", time: "09:00 AM - 12:00 PM", venue: "Block C - Room 303" },
      { date: "2026-02-26", day: "Thursday", subject: "Urdu", time: "09:00 AM - 12:00 PM", venue: "Block C - Room 303" },
      { date: "2026-02-28", day: "Saturday", subject: "Islamiat", time: "09:00 AM - 11:00 AM", venue: "Block C - Room 304" },
    ],
  },
  {
    classId: "10",
    className: "Class 10",
    section: "B",
    students: generateStudents("10", "B", 30),
    examDays: [
      { date: "2026-02-16", day: "Monday", subject: "Mathematics", time: "09:00 AM - 12:00 PM", venue: "Block C - Room 305" },
      { date: "2026-02-18", day: "Wednesday", subject: "English", time: "09:00 AM - 12:00 PM", venue: "Block C - Room 305" },
      { date: "2026-02-20", day: "Friday", subject: "Physics", time: "09:00 AM - 12:00 PM", venue: "Block C - Room 306" },
      { date: "2026-02-22", day: "Sunday", subject: "Chemistry", time: "09:00 AM - 12:00 PM", venue: "Block C - Room 306" },
      { date: "2026-02-24", day: "Tuesday", subject: "Biology", time: "09:00 AM - 12:00 PM", venue: "Block C - Room 307" },
      { date: "2026-02-26", day: "Thursday", subject: "Urdu", time: "09:00 AM - 12:00 PM", venue: "Block C - Room 307" },
      { date: "2026-02-28", day: "Saturday", subject: "Islamiat", time: "09:00 AM - 11:00 AM", venue: "Block C - Room 308" },
    ],
  },
  {
    classId: "10",
    className: "Class 10",
    section: "C",
    students: generateStudents("10", "C", 28),
    examDays: [
      { date: "2026-02-16", day: "Monday", subject: "Mathematics", time: "09:00 AM - 12:00 PM", venue: "Block D - Room 401" },
      { date: "2026-02-18", day: "Wednesday", subject: "English", time: "09:00 AM - 12:00 PM", venue: "Block D - Room 401" },
      { date: "2026-02-20", day: "Friday", subject: "Physics", time: "09:00 AM - 12:00 PM", venue: "Block D - Room 402" },
      { date: "2026-02-22", day: "Sunday", subject: "Chemistry", time: "09:00 AM - 12:00 PM", venue: "Block D - Room 402" },
      { date: "2026-02-24", day: "Tuesday", subject: "Biology", time: "09:00 AM - 12:00 PM", venue: "Block D - Room 403" },
      { date: "2026-02-26", day: "Thursday", subject: "Urdu", time: "09:00 AM - 12:00 PM", venue: "Block D - Room 403" },
      { date: "2026-02-28", day: "Saturday", subject: "Islamiat", time: "09:00 AM - 11:00 AM", venue: "Block D - Room 404" },
    ],
  },
  // Class 11 - Science
  {
    classId: "11",
    className: "Class 11",
    section: "A",
    students: generateStudents("11", "A", 35),
    examDays: [
      { date: "2026-02-15", day: "Sunday", subject: "Physics", time: "09:00 AM - 12:00 PM", venue: "Science Block - S101" },
      { date: "2026-02-17", day: "Tuesday", subject: "Chemistry", time: "09:00 AM - 12:00 PM", venue: "Science Block - S101" },
      { date: "2026-02-19", day: "Thursday", subject: "Biology", time: "09:00 AM - 12:00 PM", venue: "Science Block - S102" },
      { date: "2026-02-21", day: "Saturday", subject: "Mathematics", time: "09:00 AM - 12:00 PM", venue: "Science Block - S102" },
      { date: "2026-02-23", day: "Monday", subject: "English", time: "09:00 AM - 12:00 PM", venue: "Science Block - S103" },
    ],
  },
  {
    classId: "11",
    className: "Class 11",
    section: "B",
    students: generateStudents("11", "B", 33),
    examDays: [
      { date: "2026-02-15", day: "Sunday", subject: "Physics", time: "09:00 AM - 12:00 PM", venue: "Science Block - S104" },
      { date: "2026-02-17", day: "Tuesday", subject: "Chemistry", time: "09:00 AM - 12:00 PM", venue: "Science Block - S104" },
      { date: "2026-02-19", day: "Thursday", subject: "Biology", time: "09:00 AM - 12:00 PM", venue: "Science Block - S105" },
      { date: "2026-02-21", day: "Saturday", subject: "Mathematics", time: "09:00 AM - 12:00 PM", venue: "Science Block - S105" },
      { date: "2026-02-23", day: "Monday", subject: "English", time: "09:00 AM - 12:00 PM", venue: "Science Block - S106" },
    ],
  },
  {
    classId: "11",
    className: "Class 11",
    section: "C",
    students: generateStudents("11", "C", 30),
    examDays: [
      { date: "2026-02-15", day: "Sunday", subject: "Physics", time: "09:00 AM - 12:00 PM", venue: "Science Block - S107" },
      { date: "2026-02-17", day: "Tuesday", subject: "Chemistry", time: "09:00 AM - 12:00 PM", venue: "Science Block - S107" },
      { date: "2026-02-19", day: "Thursday", subject: "Biology", time: "09:00 AM - 12:00 PM", venue: "Science Block - S108" },
      { date: "2026-02-21", day: "Saturday", subject: "Mathematics", time: "09:00 AM - 12:00 PM", venue: "Science Block - S108" },
      { date: "2026-02-23", day: "Monday", subject: "English", time: "09:00 AM - 12:00 PM", venue: "Science Block - S109" },
    ],
  },
  // Class 12 - Science
  {
    classId: "12",
    className: "Class 12",
    section: "A",
    students: generateStudents("12", "A", 30),
    examDays: [
      { date: "2026-02-14", day: "Saturday", subject: "Physics", time: "09:00 AM - 12:00 PM", venue: "Exam Hall 1" },
      { date: "2026-02-16", day: "Monday", subject: "Chemistry", time: "09:00 AM - 12:00 PM", venue: "Exam Hall 1" },
      { date: "2026-02-18", day: "Wednesday", subject: "Biology", time: "09:00 AM - 12:00 PM", venue: "Exam Hall 2" },
      { date: "2026-02-20", day: "Friday", subject: "Mathematics", time: "09:00 AM - 12:00 PM", venue: "Exam Hall 2" },
      { date: "2026-02-22", day: "Sunday", subject: "English", time: "09:00 AM - 12:00 PM", venue: "Exam Hall 3" },
      { date: "2026-02-24", day: "Tuesday", subject: "Urdu", time: "09:00 AM - 12:00 PM", venue: "Exam Hall 3" },
    ],
  },
  {
    classId: "12",
    className: "Class 12",
    section: "B",
    students: generateStudents("12", "B", 28),
    examDays: [
      { date: "2026-02-14", day: "Saturday", subject: "Physics", time: "09:00 AM - 12:00 PM", venue: "Exam Hall 4" },
      { date: "2026-02-16", day: "Monday", subject: "Chemistry", time: "09:00 AM - 12:00 PM", venue: "Exam Hall 4" },
      { date: "2026-02-18", day: "Wednesday", subject: "Biology", time: "09:00 AM - 12:00 PM", venue: "Exam Hall 5" },
      { date: "2026-02-20", day: "Friday", subject: "Mathematics", time: "09:00 AM - 12:00 PM", venue: "Exam Hall 5" },
      { date: "2026-02-22", day: "Sunday", subject: "English", time: "09:00 AM - 12:00 PM", venue: "Exam Hall 6" },
      { date: "2026-02-24", day: "Tuesday", subject: "Urdu", time: "09:00 AM - 12:00 PM", venue: "Exam Hall 6" },
    ],
  },
  {
    classId: "12",
    className: "Class 12",
    section: "C",
    students: generateStudents("12", "C", 26),
    examDays: [
      { date: "2026-02-14", day: "Saturday", subject: "Physics", time: "09:00 AM - 12:00 PM", venue: "Exam Hall 7" },
      { date: "2026-02-16", day: "Monday", subject: "Chemistry", time: "09:00 AM - 12:00 PM", venue: "Exam Hall 7" },
      { date: "2026-02-18", day: "Wednesday", subject: "Biology", time: "09:00 AM - 12:00 PM", venue: "Exam Hall 8" },
      { date: "2026-02-20", day: "Friday", subject: "Mathematics", time: "09:00 AM - 12:00 PM", venue: "Exam Hall 8" },
      { date: "2026-02-22", day: "Sunday", subject: "English", time: "09:00 AM - 12:00 PM", venue: "Exam Hall 9" },
      { date: "2026-02-24", day: "Tuesday", subject: "Urdu", time: "09:00 AM - 12:00 PM", venue: "Exam Hall 9" },
    ],
  },
];

// Helper to get class schedule by class and section
export const getClassSchedule = (
  classId: string,
  section: string
): ClassExamSchedule | undefined => {
  return CLASS_EXAM_SCHEDULES.find(
    (s) => s.classId === classId && s.section === section
  );
};

// Print styles for exam attendance sheet
export const EXAM_ATTENDANCE_PRINT_STYLES = `
  * { margin: 0; padding: 0; box-sizing: border-box; color: #000000 !important; }
  @page {
    margin: 10mm;
    size: A4 portrait;
  }
  body { 
    font-family: Arial, sans-serif; 
    background: white;
    padding: 0;
    margin: 0;
    width: 100%;
    color: #000000;
  }
  table {
    border-collapse: collapse;
  }
  th, td {
    border: 1px solid #000000 !important;
  }
  .attendance-sheet {
    page-break-after: always;
    color: #000000;
  }
  .attendance-sheet:last-child {
    page-break-after: avoid;
  }
  @media print {
    body {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    * {
      color: #000000 !important;
    }
    th, td {
      border: 1px solid #000000 !important;
    }
  }
`;
