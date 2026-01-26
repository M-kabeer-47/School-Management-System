import { SubjectDetail } from "@/lib/student/types/subjectDetail";

export const subjectDetails: Record<string, SubjectDetail> = {
  "math-101": {
    id: "math-101",
    name: "Mathematics",
    nameUrdu: "ریاضی",
    teacher: {
      id: "t1",
      name: "Mr. Ahmed Khan",
    },
    grade: "Class 5",
    section: "A",
    term: "Term 1 (2025-26)",
    syllabusPdfUrl: "/syllabus/math-class5.pdf",
    topicUnits: [
      {
        unitName: "Unit 1: Numbers and Operations",
        topics: [
          { name: "Place Value up to Lakhs", status: "Completed" },
          { name: "Addition and Subtraction", status: "Completed" },
          { name: "Multiplication Tables (1-12)", status: "In progress" },
          { name: "Division with Remainders", status: "Not started" },
        ],
      },
      {
        unitName: "Unit 2: Fractions",
        topics: [
          { name: "Understanding Fractions", status: "Not started" },
          { name: "Adding Fractions", status: "Not started" },
          { name: "Subtracting Fractions", status: "Not started" },
        ],
      },
      {
        unitName: "Unit 3: Geometry",
        topics: [
          { name: "Lines and Angles", status: "Not started" },
          { name: "Triangles and Quadrilaterals", status: "Not started" },
          { name: "Perimeter and Area", status: "Not started" },
        ],
      },
    ],
    materials: [
      {
        id: "m1",
        name: "Chapter 1 - Place Value Notes",
        fileType: "pdf",
        downloadUrl: "/materials/math/ch1-notes.pdf",
      },
      {
        id: "m2",
        name: "Multiplication Practice Video",
        fileType: "video",
        downloadUrl: "/materials/math/multiplication.mp4",
      },
      {
        id: "m3",
        name: "Fractions Introduction Slides",
        fileType: "slides",
        downloadUrl: "/materials/math/fractions-intro.pptx",
      },
      {
        id: "m4",
        name: "Geometry Basics PDF",
        fileType: "pdf",
        downloadUrl: "/materials/math/geometry-basics.pdf",
      },
    ],
    tests: [
      {
        id: "test1",
        name: "Unit 1 Quiz",
        date: "Jan 10, 2026",
        result: "18/20",
      },
      {
        id: "test2",
        name: "Monthly Test - January",
        date: "Jan 25, 2026",
        result: "34/40",
      },
      {
        id: "test3",
        name: "Multiplication Speed Test",
        date: "Feb 5, 2026",
        result: "Pending",
      },
    ],
  },
  "eng-101": {
    id: "eng-101",
    name: "English",
    nameUrdu: "انگریزی",
    teacher: {
      id: "t2",
      name: "Ms. Sarah Ali",
    },
    grade: "Class 5",
    section: "B",
    term: "Term 1 (2025-26)",
    syllabusPdfUrl: "/syllabus/eng-class5.pdf",
    topicUnits: [
      {
        unitName: "Unit 1: Grammar Basics",
        topics: [
          { name: "Nouns and Pronouns", status: "Completed" },
          { name: "Verbs and Tenses", status: "Completed" },
          { name: "Adjectives and Adverbs", status: "In progress" },
        ],
      },
      {
        unitName: "Unit 2: Reading Comprehension",
        topics: [
          { name: "Story Reading", status: "Not started" },
          { name: "Answering Questions", status: "Not started" },
        ],
      },
    ],
    materials: [
      {
        id: "m1",
        name: "Grammar Rules Handbook",
        fileType: "pdf",
        downloadUrl: "/materials/eng/grammar-handbook.pdf",
      },
      {
        id: "m2",
        name: "Tenses Explanation Video",
        fileType: "video",
        downloadUrl: "/materials/eng/tenses.mp4",
      },
    ],
    tests: [
      {
        id: "test1",
        name: "Grammar Quiz 1",
        date: "Jan 12, 2026",
        result: "9/10",
      },
      {
        id: "test2",
        name: "Reading Test",
        date: "Jan 28, 2026",
        result: "23/25",
      },
    ],
  },
};

// Helper to get subject by ID
export const getSubjectDetail = (id: string): SubjectDetail | undefined => {
  return subjectDetails[id];
};
