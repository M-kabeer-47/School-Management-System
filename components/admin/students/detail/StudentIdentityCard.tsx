"use client";

import { ProfilePhoto } from "./ProfilePhoto";
import { Student } from "@/lib/admin/types/student";

interface StudentIdentityCardProps {
  student: Student;
}

export function StudentIdentityCard({ student }: StudentIdentityCardProps) {
  return (
    <div className="bg-background border border-border rounded-2xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5 shadow-sm h-full">
      <div className="flex-shrink-0">
        <ProfilePhoto
          name={student.studentName}
          size="lg" // w-32 h-32
          editable={false}
        />
      </div>

      <div className="flex-1 text-center sm:text-left pt-2 min-w-0">
        <div className="flex flex-col gap-2 mb-1">
          <h2 className="text-2xl font-bold text-text-primary font-heading truncate leading-tight">
            {student.studentName}
          </h2>
          <span className="text-text-secondary text-sm font-medium block">
            Admission No:{" "}
            <span className="text-text-primary font-semibold">
              {student.admissionNo}
            </span>
          </span>
        </div>

        <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-2">
          <span
            className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg ${
              student.status === "Active"
                ? "bg-green-100 text-green-700 border border-green-200"
                : "bg-gray-100 text-gray-700 border border-gray-200"
            }`}
          >
            {student.status}
          </span>
        </div>
      </div>
    </div>
  );
}
