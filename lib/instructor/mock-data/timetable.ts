export interface TimetableDocument {
  id: string;
  title: string;
  description: string;
  pdfUrl: string;
  uploadDate: string;
  type: "class-timetable" | "teacher-timetable" | "exam-timetable";
}

export const timetableDocuments: TimetableDocument[] = [
  {
    id: "tt-1",
    title: "My Teaching Schedule - Spring 2026",
    description:
      "Your personal teaching timetable for the Spring 2026 semester, including all class assignments and free periods.",
    pdfUrl: "/sample.pdf",
    uploadDate: "2026-01-10",
    type: "teacher-timetable",
  },
  {
    id: "tt-2",
    title: "Class 6 Red - Weekly Timetable",
    description:
      "Complete weekly timetable for Class 6 Red including all subjects, break times, and special activities.",
    pdfUrl: "/sample.pdf",
    uploadDate: "2026-01-10",
    type: "class-timetable",
  },
  {
    id: "tt-3",
    title: "Class 7 Blue - Weekly Timetable",
    description:
      "Complete weekly timetable for Class 7 Blue including all subjects, break times, and special activities.",
    pdfUrl: "/sample.pdf",
    uploadDate: "2026-01-10",
    type: "class-timetable",
  },
  {
    id: "tt-4",
    title: "Class 8 Green - Weekly Timetable",
    description:
      "Complete weekly timetable for Class 8 Green including all subjects, break times, and special activities.",
    pdfUrl: "/sample.pdf",
    uploadDate: "2026-01-10",
    type: "class-timetable",
  },
];
