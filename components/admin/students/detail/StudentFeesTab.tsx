import { Student } from "@/lib/admin/types/student";
import { CreditCard } from "lucide-react";

interface StudentFeesTabProps {
  student: Student;
}

export function StudentFeesTab({ student }: StudentFeesTabProps) {
  return (
    <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-bold text-text-primary mb-6 flex items-center gap-2">
        <CreditCard className="w-5 h-5 text-accent" />
        Fee Status
      </h3>
      <div className="flex items-center justify-between p-4 bg-surface-hover rounded-xl border border-border">
        <div>
          <p className="text-xs text-text-muted uppercase font-bold">
            Monthly Fee
          </p>
          <p className="text-xl font-bold text-text-primary">
            PKR {student.monthlyFee.toLocaleString()}
          </p>
        </div>
        <div className="text-right">
          <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-bold rounded-full">
            Paid
          </span>
          <p className="text-xs text-text-muted mt-1">
            Last payment: 12 Aug 2025
          </p>
        </div>
      </div>
    </div>
  );
}
