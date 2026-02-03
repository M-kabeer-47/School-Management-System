import { Calendar, Users, FileCheck, AlertCircle } from "lucide-react";

export const EXAM_STATS = {
  activeExams: 2,
  totalCandidates: 1250,
  pendingResults: 15,
  avgAttendance: 96,
};

export const ACTIVE_EXAM_SERIES = [
  {
    id: "ser-1",
    name: "Final Term 2025",
    status: "Ongoing",
    startDate: "2025-03-15",
    endDate: "2025-03-30",
    classes: [
      "Class 5",
      "Class 6",
      "Class 7",
      "Class 8",
      "Class 9",
      "Class 10",
    ],
  },
  {
    id: "ser-2",
    name: "Unit Test Cycle 2",
    status: "Upcoming",
    startDate: "2025-04-10",
    endDate: "2025-04-15",
    classes: ["Class 1", "Class 2", "Class 3", "Class 4"],
  },
];

export const PENDING_MARKS_SUBMISSIONS = [
  {
    id: "sub-1",
    subject: "Mathematics",
    class: "Class 9-A",
    teacher: "Mr. Sarah Wilson",
    dueDate: "2025-03-20",
    status: "Overdue",
  },
  {
    id: "sub-2",
    subject: "Physics",
    class: "Class 10-B",
    teacher: "Mr. James Anderson",
    dueDate: "2025-03-21",
    status: "In Progress",
  },
];
