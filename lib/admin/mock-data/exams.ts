export const EXAM_SERIES = [
  {
    id: "ser-1",
    title: "Final Term 2025",
    status: "Active",
    dateRange: "Mar 15 - Mar 30, 2025",
    stats: {
      papersUploaded: 45,
      totalPapers: 60,
      timetableGenerated: true,
      invigilationComplete: false,
      seatingGenerated: false,
      resultProgress: 0,
    },
  },
  {
    id: "ser-2",
    title: "Unit Test Cycle 1 2025",
    status: "Upcoming",
    dateRange: "Apr 10 - Apr 15, 2025",
    stats: {
      papersUploaded: 0,
      totalPapers: 24,
      timetableGenerated: false,
      invigilationComplete: false,
      seatingGenerated: false,
      resultProgress: 0,
    },
  },
];

// Helper to generate papers for a class
const generateClassPapers = (
  grade: number,
  sections: string[],
  subjects: string[],
) => {
  return sections.flatMap((section) =>
    subjects.map((subject, idx) => ({
      id: `p-${grade}-${section}-${subject}`,
      grade: `Class ${grade}`,
      section: section,
      subject: subject,
      teacher: `Teacher ${subject.substring(0, 3)}`,
      isUploaded: (idx + grade) % 3 !== 0, // Deterministic status (2/3 uploaded)
      deadline: "2025-03-12",
    })),
  );
};

// Data Structure: Flat list but rich enough to group
export const PAPER_STATUS_DATA = [
  ...generateClassPapers(
    9,
    ["A", "B", "C"],
    ["Math", "English", "Physics", "Chemistry", "Bio", "Computer"],
  ),
  ...generateClassPapers(
    10,
    ["A", "B", "C", "D"],
    ["Math", "English", "Physics", "Chemistry", "Bio"],
  ),
  ...generateClassPapers(
    8,
    ["A", "B"],
    ["Math", "English", "Science", "History"],
  ),
  ...generateClassPapers(
    7,
    ["A", "B", "C"],
    ["Math", "English", "Science", "History"],
  ),
];

export const EXAM_STATS = {
  activeSeriesId: "ser-1",
  activeExamsCount: 1,
  totalCandidates: 1250,
  pendingResults: 15,
  pendingPaperUploads: PAPER_STATUS_DATA.filter((p) => !p.isUploaded).length,
};

// ==========================================
// RESULT MANAGEMENT DATA
// ==========================================

// Realistic Pakistani student names
const STUDENT_FIRST_NAMES = [
  "Ahmed", "Ali", "Hassan", "Usman", "Bilal", "Zain", "Omar", "Hamza", "Ibrahim", "Arslan",
  "Fatima", "Ayesha", "Zara", "Hira", "Mariam", "Sana", "Aliza", "Laiba", "Iqra", "Mahnoor",
  "Saad", "Fahad", "Talha", "Daniyal", "Shayan", "Owais", "Kamran", "Imran", "Junaid", "Nauman",
  "Amna", "Bushra", "Nida", "Rabia", "Samia", "Tahira", "Uzma", "Warda", "Yumna", "Zunaira",
];

const STUDENT_LAST_NAMES = [
  "Khan", "Ahmed", "Ali", "Malik", "Shah", "Raza", "Hassan", "Hussain", "Siddiqui", "Qureshi",
  "Butt", "Chaudhry", "Awan", "Mirza", "Sheikh", "Abbasi", "Bhatti", "Javed", "Khalid", "Rashid",
  "Akhtar", "Aslam", "Farooq", "Iqbal", "Mahmood", "Nawaz", "Riaz", "Saeed", "Tariq", "Yousaf",
];

// Deterministic name generator based on index
const getStudentName = (index: number): string => {
  const firstNameIndex = index % STUDENT_FIRST_NAMES.length;
  const lastNameIndex = (index * 7) % STUDENT_LAST_NAMES.length; // Use prime multiplier for variety
  return `${STUDENT_FIRST_NAMES[firstNameIndex]} ${STUDENT_LAST_NAMES[lastNameIndex]}`;
};

export interface StudentMarkStatus {
  studentId: string;
  studentName: string;
  rollNumber: string;
  status: "checked" | "unchecked" | "absent";
  marksObtained?: number;
  totalMarks?: number;
  checkedAt?: string;
}

export interface TeacherAssignment {
  id: string;
  className: string;
  section: string;
  subject: string;
  totalStudents: number;
  checkedCount: number;
  absentCount: number;
  uncheckedCount: number;
  completionPercent: number;
  students: StudentMarkStatus[];
}

export interface ResultCheckingProgress {
  id: string;
  teacherId: string;
  teacherName: string;
  examId: string;
  examName: string;
  deadline: string;
  isLocked: boolean;
  assignments: TeacherAssignment[];
}

// Helper to generate student marks status
const generateStudentMarks = (
  classGrade: string,
  section: string,
  subject: string,
  count: number,
  checkedCount: number,
  absentCount: number,
): StudentMarkStatus[] => {
  const students: StudentMarkStatus[] = [];
  const totalMarks = 100;

  for (let i = 1; i <= count; i++) {
    let status: "checked" | "unchecked" | "absent";
    let marksObtained: number | undefined;
    let checkedAt: string | undefined;

    if (i <= absentCount) {
      status = "absent";
    } else if (i <= absentCount + checkedCount) {
      status = "checked";
      marksObtained = Math.floor(Math.random() * 30) + 70; // 70-100
      checkedAt = "2026-03-01T10:30:00Z";
    } else {
      status = "unchecked";
    }

    students.push({
      studentId: `stu-${classGrade}-${section}-${i}`,
      studentName: getStudentName(i + classGrade.charCodeAt(6) + section.charCodeAt(0)),
      rollNumber: `${classGrade.replace("Class ", "")}-${section}-${String(i).padStart(3, "0")}`,
      status,
      marksObtained,
      totalMarks: status !== "absent" ? totalMarks : undefined,
      checkedAt,
    });
  }

  return students;
};

// Generate result checking progress for all teachers
export const RESULT_CHECKING_PROGRESS: ResultCheckingProgress[] = [
  // Mathematics Teacher
  {
    id: "rcp-1",
    teacherId: "t-001",
    teacherName: "Dr. Sarah Ahmed",
    examId: "ser-1",
    examName: "Final Term 2025",
    deadline: "2026-03-10",
    isLocked: false,
    assignments: [
      {
        id: "assign-1",
        className: "Class 9",
        section: "A",
        subject: "Mathematics",
        totalStudents: 35,
        checkedCount: 33,
        absentCount: 2,
        uncheckedCount: 0,
        completionPercent: 100,
        students: generateStudentMarks("Class 9", "A", "Mathematics", 35, 33, 2),
      },
      {
        id: "assign-2",
        className: "Class 9",
        section: "B",
        subject: "Mathematics",
        totalStudents: 32,
        checkedCount: 20,
        absentCount: 1,
        uncheckedCount: 11,
        completionPercent: 64.5,
        students: generateStudentMarks("Class 9", "B", "Mathematics", 32, 20, 1),
      },
      {
        id: "assign-3",
        className: "Class 10",
        section: "A",
        subject: "Mathematics",
        totalStudents: 30,
        checkedCount: 30,
        absentCount: 0,
        uncheckedCount: 0,
        completionPercent: 100,
        students: generateStudentMarks("Class 10", "A", "Mathematics", 30, 30, 0),
      },
      {
        id: "assign-20",
        className: "Class 10",
        section: "B",
        subject: "Mathematics",
        totalStudents: 28,
        checkedCount: 28,
        absentCount: 1,
        uncheckedCount: 0,
        completionPercent: 100,
        students: generateStudentMarks("Class 10", "B", "Mathematics", 28, 27, 1),
      },
    ],
  },
  // Physics Teacher
  {
    id: "rcp-2",
    teacherId: "t-002",
    teacherName: "Prof. Michael Khan",
    examId: "ser-1",
    examName: "Final Term 2025",
    deadline: "2026-03-10",
    isLocked: false,
    assignments: [
      {
        id: "assign-4",
        className: "Class 9",
        section: "A",
        subject: "Physics",
        totalStudents: 35,
        checkedCount: 28,
        absentCount: 2,
        uncheckedCount: 5,
        completionPercent: 84.8,
        students: generateStudentMarks("Class 9", "A", "Physics", 35, 28, 2),
      },
      {
        id: "assign-5",
        className: "Class 9",
        section: "B",
        subject: "Physics",
        totalStudents: 32,
        checkedCount: 0,
        absentCount: 1,
        uncheckedCount: 31,
        completionPercent: 0,
        students: generateStudentMarks("Class 9", "B", "Physics", 32, 0, 1),
      },
      {
        id: "assign-6",
        className: "Class 10",
        section: "A",
        subject: "Physics",
        totalStudents: 30,
        checkedCount: 30,
        absentCount: 0,
        uncheckedCount: 0,
        completionPercent: 100,
        students: generateStudentMarks("Class 10", "A", "Physics", 30, 30, 0),
      },
      {
        id: "assign-7",
        className: "Class 10",
        section: "B",
        subject: "Physics",
        totalStudents: 28,
        checkedCount: 27,
        absentCount: 1,
        uncheckedCount: 0,
        completionPercent: 100,
        students: generateStudentMarks("Class 10", "B", "Physics", 28, 27, 1),
      },
    ],
  },
  // English Teacher
  {
    id: "rcp-3",
    teacherId: "t-003",
    teacherName: "Ms. Fatima Ali",
    examId: "ser-1",
    examName: "Final Term 2025",
    deadline: "2026-03-10",
    isLocked: false,
    assignments: [
      {
        id: "assign-8",
        className: "Class 9",
        section: "A",
        subject: "English",
        totalStudents: 35,
        checkedCount: 33,
        absentCount: 2,
        uncheckedCount: 0,
        completionPercent: 100,
        students: generateStudentMarks("Class 9", "A", "English", 35, 33, 2),
      },
      {
        id: "assign-9",
        className: "Class 9",
        section: "B",
        subject: "English",
        totalStudents: 32,
        checkedCount: 15,
        absentCount: 1,
        uncheckedCount: 16,
        completionPercent: 48.4,
        students: generateStudentMarks("Class 9", "B", "English", 32, 15, 1),
      },
      {
        id: "assign-10",
        className: "Class 10",
        section: "A",
        subject: "English",
        totalStudents: 30,
        checkedCount: 20,
        absentCount: 0,
        uncheckedCount: 10,
        completionPercent: 66.7,
        students: generateStudentMarks("Class 10", "A", "English", 30, 20, 0),
      },
      {
        id: "assign-11",
        className: "Class 10",
        section: "B",
        subject: "English",
        totalStudents: 28,
        checkedCount: 0,
        absentCount: 1,
        uncheckedCount: 27,
        completionPercent: 0,
        students: generateStudentMarks("Class 10", "B", "English", 28, 0, 1),
      },
    ],
  },
  // Chemistry Teacher
  {
    id: "rcp-4",
    teacherId: "t-004",
    teacherName: "Dr. Aisha Malik",
    examId: "ser-1",
    examName: "Final Term 2025",
    deadline: "2026-03-10",
    isLocked: false,
    assignments: [
      {
        id: "assign-12",
        className: "Class 9",
        section: "A",
        subject: "Chemistry",
        totalStudents: 35,
        checkedCount: 10,
        absentCount: 2,
        uncheckedCount: 23,
        completionPercent: 30.3,
        students: generateStudentMarks("Class 9", "A", "Chemistry", 35, 10, 2),
      },
      {
        id: "assign-13",
        className: "Class 9",
        section: "B",
        subject: "Chemistry",
        totalStudents: 32,
        checkedCount: 31,
        absentCount: 1,
        uncheckedCount: 0,
        completionPercent: 100,
        students: generateStudentMarks("Class 9", "B", "Chemistry", 32, 31, 1),
      },
      {
        id: "assign-14",
        className: "Class 10",
        section: "A",
        subject: "Chemistry",
        totalStudents: 30,
        checkedCount: 5,
        absentCount: 0,
        uncheckedCount: 25,
        completionPercent: 16.7,
        students: generateStudentMarks("Class 10", "A", "Chemistry", 30, 5, 0),
      },
      {
        id: "assign-15",
        className: "Class 10",
        section: "B",
        subject: "Chemistry",
        totalStudents: 28,
        checkedCount: 27,
        absentCount: 1,
        uncheckedCount: 0,
        completionPercent: 100,
        students: generateStudentMarks("Class 10", "B", "Chemistry", 28, 27, 1),
      },
    ],
  },
  // Biology Teacher
  {
    id: "rcp-5",
    teacherId: "t-005",
    teacherName: "Mr. Hassan Raza",
    examId: "ser-1",
    examName: "Final Term 2025",
    deadline: "2026-03-10",
    isLocked: false,
    assignments: [
      {
        id: "assign-16",
        className: "Class 9",
        section: "A",
        subject: "Biology",
        totalStudents: 35,
        checkedCount: 33,
        absentCount: 2,
        uncheckedCount: 0,
        completionPercent: 100,
        students: generateStudentMarks("Class 9", "A", "Biology", 35, 33, 2),
      },
      {
        id: "assign-17",
        className: "Class 9",
        section: "B",
        subject: "Biology",
        totalStudents: 32,
        checkedCount: 25,
        absentCount: 1,
        uncheckedCount: 6,
        completionPercent: 80.6,
        students: generateStudentMarks("Class 9", "B", "Biology", 32, 25, 1),
      },
      {
        id: "assign-18",
        className: "Class 10",
        section: "A",
        subject: "Biology",
        totalStudents: 30,
        checkedCount: 0,
        absentCount: 0,
        uncheckedCount: 30,
        completionPercent: 0,
        students: generateStudentMarks("Class 10", "A", "Biology", 30, 0, 0),
      },
      {
        id: "assign-19",
        className: "Class 10",
        section: "B",
        subject: "Biology",
        totalStudents: 28,
        checkedCount: 15,
        absentCount: 1,
        uncheckedCount: 12,
        completionPercent: 55.6,
        students: generateStudentMarks("Class 10", "B", "Biology", 28, 15, 1),
      },
    ],
  },
];
