export const MOCK_STUDENTS = Array.from({ length: 35 }).map((_, i) => ({
  id: `std-${i + 1}`,
  name: `Student ${i + 1}`,
  rollNo: `Roll-${100 + i}`,
  fatherName: `Father ${i + 1}`,
  phoneNo: "0300-1234567",
  fatherWhatsapp: "0300-1234567",
  presentAddress: "123 Street, Lahore",
  section: "A",
  registrationCode: `REG-${202400 + i}`,
  gender: i % 2 === 0 ? "Male" : "Female",
  attendancePercentage: Math.floor(Math.random() * (100 - 60) + 60), // Random 60-100%
  // Required fields for Student type
  fatherCnic: "35202-1234567-1",
  dob: "2015-01-01",
  admissionDate: "2024-01-01",
  email: "student@example.com",
}));

export const MOCK_CLASS_SUBJECTS = [
  {
    id: "1",
    subjectName: "Mathematics",
    teacherName: "Mr. Sarah Smith",
    teacherId: "t1",
    classesPerWeek: 5,
    syllabusUrl: "/mock/syllabus.pdf",
  },
  {
    id: "2",
    subjectName: "English Literature",
    teacherName: "Ms. Emily Davis",
    teacherId: "t2",
    classesPerWeek: 4,
    syllabusUrl: "/mock/syllabus.pdf",
  },
  {
    id: "3",
    subjectName: "General Science",
    teacherName: "Mr. John Doe",
    teacherId: "t3",
    classesPerWeek: 4,
  },
  {
    id: "4",
    subjectName: "History",
    teacherName: "Mrs. Wilson",
    teacherId: "t4",
    classesPerWeek: 3,
  },
  {
    id: "5",
    subjectName: "Computer Science",
    teacherName: "Mr. Tech",
    teacherId: "t5",
    classesPerWeek: 2,
    syllabusUrl: "/mock/syllabus.pdf",
  },
];

export const MOCK_CLASS_RESULTS = [
  {
    id: "term-1",
    termName: "First Term Examination",
    examName: "Annual 2024",
    date: "2024-03-15",
    totalMarks: 500,
    obtainedMarks: 420,
    percentage: 84,
    grade: "A",
    position: 1,
    subjects: [
      { subject: "Math", totalMarks: 100, obtainedMarks: 85, grade: "A" },
      { subject: "English", totalMarks: 100, obtainedMarks: 82, grade: "B+" },
    ],
  },
  {
    id: "mid-term",
    termName: "Mid Term Examination",
    examName: "Fall 2023",
    date: "2023-11-10",
    totalMarks: 500,
    obtainedMarks: 390,
    percentage: 78,
    grade: "B+",
    subjects: [],
  },
];
