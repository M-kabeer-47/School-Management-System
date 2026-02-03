export const SCHOOL_LEVELS = [
  {
    id: "ECE",
    label: "Early Childhood Education (ECE)",
    grades: ["Nursery", "KG", "1", "2"],
    description: "Foundation years focusing on developmental milestones.",
  },
  {
    id: "JUNIOR",
    label: "Junior Section",
    grades: ["3", "4", "5"],
    description: "Primary education focusing on core literacy and numeracy.",
  },
  {
    id: "MIDDLE",
    label: "Middle Section",
    grades: ["6", "7", "8"],
    description: "Subject-specialized learning and transition to secondary.",
  },
  {
    id: "SENIOR",
    label: "Senior Section",
    grades: ["9", "10", "11", "12"],
    description: "Higher education preparation and board exams.",
  },
] as const;

export type SchoolLevelId = (typeof SCHOOL_LEVELS)[number]["id"];

export const ALL_SECTIONS = ["A", "B", "C", "D", "E"] as const;
