import { Challan } from "@/lib/types/fees";

export const challans: Challan[] = [
  // Overdue challan
  {
    id: "c-001",
    title: "December 2025 Fee",
    dueDate: "Dec 10, 2025",
    amount: 5000,
    status: "Overdue",
    pdfUrl: "/challans/dec-2025.pdf",
  },
  // Pending challans
  {
    id: "c-002",
    title: "January 2026 Fee",
    dueDate: "Jan 10, 2026",
    amount: 5000,
    status: "Pending",
    pdfUrl: "/challans/jan-2026.pdf",
  },
  {
    id: "c-003",
    title: "February 2026 Fee",
    dueDate: "Feb 10, 2026",
    amount: 5000,
    status: "Pending",
    pdfUrl: "/challans/feb-2026.pdf",
  },
  // Paid challans (shown when "View All" is clicked)
  {
    id: "c-004",
    title: "November 2025 Fee",
    dueDate: "Nov 10, 2025",
    amount: 5000,
    status: "Paid",
    pdfUrl: "/challans/nov-2025.pdf",
    paidDate: "Nov 8, 2025",
  },
  {
    id: "c-005",
    title: "October 2025 Fee",
    dueDate: "Oct 10, 2025",
    amount: 5000,
    status: "Paid",
    pdfUrl: "/challans/oct-2025.pdf",
    paidDate: "Oct 9, 2025",
  },
  {
    id: "c-006",
    title: "September 2025 Fee",
    dueDate: "Sep 10, 2025",
    amount: 4800,
    status: "Paid",
    pdfUrl: "/challans/sep-2025.pdf",
    paidDate: "Sep 7, 2025",
  },
  {
    id: "c-007",
    title: "August 2025 Fee",
    dueDate: "Aug 10, 2025",
    amount: 4800,
    status: "Paid",
    pdfUrl: "/challans/aug-2025.pdf",
    paidDate: "Aug 9, 2025",
  },
  {
    id: "c-008",
    title: "Term 1 Fee (2025-26)",
    dueDate: "Jul 15, 2025",
    amount: 15000,
    status: "Paid",
    pdfUrl: "/challans/term1-2025.pdf",
    paidDate: "Jul 12, 2025",
  },
];

// Helper to get pending and overdue challans
export const getPendingChallans = () => {
  return challans.filter(
    (c) => c.status === "Pending" || c.status === "Overdue",
  );
};

// Helper to get paid challans
export const getPaidChallans = () => {
  return challans.filter((c) => c.status === "Paid");
};
