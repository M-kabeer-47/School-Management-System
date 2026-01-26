export type ChallanStatus = "Pending" | "Overdue" | "Paid";

export interface Challan {
  id: string;
  title: string; // e.g., "January 2026 Fee", "Term 1 Fee"
  dueDate: string; // Human-readable: "Jan 15, 2026"
  amount: number; // In PKR
  status: ChallanStatus;
  pdfUrl: string; // For view/download
  paidDate?: string; // Only for paid challans
}
