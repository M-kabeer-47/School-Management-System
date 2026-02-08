import { FeeChallan } from "@/lib/admin/types/finance";
import { Challan } from "@/lib/student/types/fees";
import { challans as staticChallans } from "@/lib/student/mock-data/fees";

// Module-level store of published challans (bridges admin → student portal)
let publishedChallans: Challan[] = [...staticChallans];

/** Convert admin FeeChallan to student-facing Challan */
function adminToStudentChallan(challan: FeeChallan): Challan {
  const statusMap: Record<string, "Pending" | "Overdue" | "Paid"> = {
    pending: "Pending",
    overdue: "Overdue",
    paid: "Paid",
    cancelled: "Pending",
  };

  const due = new Date(challan.dueDate);
  const dueStr = due.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return {
    id: challan.id,
    title: `${challan.month} Fee`,
    dueDate: dueStr,
    amount: challan.netAmount,
    status: statusMap[challan.status] || "Pending",
    pdfUrl: `/challans/${challan.challanNo.toLowerCase()}.pdf`,
    paidDate: challan.paidDate
      ? new Date(challan.paidDate).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : undefined,
  };
}

/** Publish challans from admin side so they appear in student portal */
export function publishChallans(challans: FeeChallan[]): void {
  const newStudentChallans = challans.map(adminToStudentChallan);
  const existingIds = new Set(publishedChallans.map((c) => c.id));
  const toAdd = newStudentChallans.filter((c) => !existingIds.has(c.id));
  publishedChallans = [...publishedChallans, ...toAdd];
}

/** Get all published challans (for student portal) */
export function getPublishedChallans(): Challan[] {
  return publishedChallans;
}

/** Get pending/overdue challans */
export function getPendingChallans(): Challan[] {
  return publishedChallans.filter(
    (c) => c.status === "Pending" || c.status === "Overdue"
  );
}

/** Get paid challans */
export function getPaidChallans(): Challan[] {
  return publishedChallans.filter((c) => c.status === "Paid");
}
