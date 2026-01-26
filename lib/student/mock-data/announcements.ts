import { Announcement } from "@/lib/student/types/announcements";

export const mockAnnouncements: Announcement[] = [
  {
    id: "ann-001",
    title: "School Reopening After Winter Break",
    content:
      "Dear Parents and Students, we are pleased to announce that school will reopen on January 6th, 2026 after the winter break. Please ensure all students arrive on time at 8:00 AM. We look forward to welcoming everyone back!",
    date: "2026-01-02",
    category: "general",
    isPinned: true,
  },
  {
    id: "ann-002",
    title: "Annual Sports Day 2026",
    content:
      "Get ready for our Annual Sports Day scheduled for February 15th, 2026! All students are encouraged to participate. Registration forms are available at the sports department. Parents are cordially invited to attend and cheer for our young athletes.",
    date: "2026-01-18",
    category: "event",
    isPinned: true,
    attachment: {
      id: "att-001",
      name: "Sports_Day_Schedule.pdf",
      type: "pdf",
      url: "/attachments/sports-day-schedule.pdf",
      size: "245 KB",
    },
  },
  {
    id: "ann-003",
    title: "Mid-Term Examination Schedule",
    content:
      "The Mid-Term Examinations for all classes will be held from February 20th to February 28th, 2026. The detailed subject-wise schedule has been attached. Students are advised to prepare well and follow the exam guidelines.",
    date: "2026-01-20",
    category: "academic",
    attachment: {
      id: "att-002",
      name: "Exam_Schedule_2026.pdf",
      type: "pdf",
      url: "/attachments/exam-schedule.pdf",
      size: "180 KB",
    },
  },
  {
    id: "ann-004",
    title: "Kashmir Day Holiday",
    content:
      "Please be informed that the school will remain closed on February 5th, 2026 in observance of Kashmir Day. Regular classes will resume on February 6th, 2026.",
    date: "2026-01-19",
    category: "holiday",
  },
  {
    id: "ann-005",
    title: "Fee Submission Reminder",
    content:
      "This is a reminder that the last date for fee submission for the current semester is January 31st, 2026. Please ensure timely payment to avoid late fee charges. Payment can be made online or at the school office.",
    date: "2026-01-15",
    category: "urgent",
    isPinned: true,
  },
  {
    id: "ann-006",
    title: "Parent-Teacher Meeting",
    content:
      "A Parent-Teacher Meeting is scheduled for January 25th, 2026 from 9:00 AM to 1:00 PM. Parents are requested to attend to discuss their child's academic progress and address any concerns with the teachers.",
    date: "2026-01-12",
    category: "event",
    attachment: {
      id: "att-003",
      name: "PTM_Invite.jpg",
      type: "image",
      url: "/attachments/ptm-invite.jpg",
      size: "520 KB",
    },
  },
  {
    id: "ann-007",
    title: "Science Fair Announcement",
    content:
      "We are excited to announce our Annual Science Fair on March 10th, 2026. Students from classes 6-10 can participate with their innovative projects. Registration deadline is February 15th. Let's explore the wonders of science together!",
    date: "2026-01-10",
    category: "academic",
  },
  {
    id: "ann-008",
    title: "New Library Books Arrival",
    content:
      "Great news! Our school library has received a new collection of 500+ books covering various subjects including fiction, science, history, and reference materials. Students are encouraged to visit the library and explore the new additions.",
    date: "2026-01-08",
    category: "general",
  },
];
