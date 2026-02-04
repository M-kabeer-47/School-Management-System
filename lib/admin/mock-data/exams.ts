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
