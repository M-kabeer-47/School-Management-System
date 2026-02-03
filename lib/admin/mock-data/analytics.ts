export const MOCK_SUBJECTS = [
  { id: "sub-1", name: "Mathematics" },
  { id: "sub-2", name: "English" },
  { id: "sub-3", name: "General Science" },
  { id: "sub-4", name: "History" },
  { id: "sub-5", name: "Computer Science" },
];

export const MOCK_GRADEBOOKS = {
  "sub-1": {
    subjectId: "sub-1",
    subjectName: "Mathematics",
    tests: [
      { id: "t1", name: "Quiz 1", totalMarks: 20, date: "2024-01-15" },
      { id: "t2", name: "Class Test 1", totalMarks: 50, date: "2024-02-10" },
      { id: "t3", name: "Quiz 2", totalMarks: 20, date: "2024-03-05" },
      {
        id: "t4",
        name: "Monthly Assessment",
        totalMarks: 100,
        date: "2024-03-20",
      },
    ],
    students: [
      {
        studentId: "s1",
        studentName: "Ahmed Khan",
        rollNo: "Roll-101",
        marks: { t1: 18, t2: 45, t3: 19, t4: 88 },
      },
      {
        studentId: "s2",
        studentName: "Sara Ali",
        rollNo: "Roll-102",
        marks: { t1: 15, t2: 38, t3: 14, t4: 72 },
      },
      {
        studentId: "s3",
        studentName: "Zainab Bibi",
        rollNo: "Roll-103",
        marks: { t1: 20, t2: 48, t3: 18, t4: 92 },
      },
      {
        studentId: "s4",
        studentName: "Bilal Rasheed",
        rollNo: "Roll-104",
        marks: { t1: 12, t2: 30, t3: 10, t4: 45 },
      },
      {
        studentId: "s5",
        studentName: "Fatima Noor",
        rollNo: "Roll-105",
        marks: { t1: 17, t2: 42, t3: 16, t4: 78 },
      },
    ],
  },
  "sub-2": {
    subjectId: "sub-2",
    subjectName: "English",
    tests: [
      { id: "e1", name: "Grammar Quiz", totalMarks: 25, date: "2024-01-20" },
      { id: "e2", name: "Essay Test", totalMarks: 50, date: "2024-02-15" },
    ],
    students: [
      {
        studentId: "s1",
        studentName: "Ahmed Khan",
        rollNo: "Roll-101",
        marks: { e1: 22, e2: 42 },
      },
      {
        studentId: "s2",
        studentName: "Sara Ali",
        rollNo: "Roll-102",
        marks: { e1: 24, e2: 48 },
      },
      {
        studentId: "s3",
        studentName: "Zainab Bibi",
        rollNo: "Roll-103",
        marks: { e1: 20, e2: 40 },
      },
      {
        studentId: "s4",
        studentName: "Bilal Rasheed",
        rollNo: "Roll-104",
        marks: { e1: 18, e2: 35 },
      },
      {
        studentId: "s5",
        studentName: "Fatima Noor",
        rollNo: "Roll-105",
        marks: { e1: 21, e2: 39 },
      },
    ],
  },
};
