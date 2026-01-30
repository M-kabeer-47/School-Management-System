import { Student } from "@/lib/admin/types/student";
import { FileText } from "lucide-react";

interface StudentAcademicTabProps {
  student: Student;
}

export function StudentAcademicTab({ student }: StudentAcademicTabProps) {
  return (
    <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-bold text-text-primary mb-6 flex items-center gap-2">
        <FileText className="w-5 h-5 text-accent" />
        Academic History
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
        <div>
          <span className="block text-xs uppercase text-text-muted tracking-wide font-semibold mb-1">
            Registration Date
          </span>
          <p className="text-text-primary font-medium">
            {student.registrationDate}
          </p>
        </div>
        <div>
          <span className="block text-xs uppercase text-text-muted tracking-wide font-semibold mb-1">
            Registration Code
          </span>
          <p className="text-text-primary font-medium">
            {student.registrationCode}
          </p>
        </div>
        <div>
          <span className="block text-xs uppercase text-text-muted tracking-wide font-semibold mb-1">
            Previous School
          </span>
          <p className="text-text-primary font-medium">-</p>
        </div>
      </div>
    </div>
  );
}
