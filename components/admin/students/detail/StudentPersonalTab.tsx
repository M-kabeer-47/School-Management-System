import { Student } from "@/lib/admin/types/student";
import { User } from "lucide-react";

interface InfoItemProps {
  label: string;
  value: string;
}

function InfoItem({ label, value }: InfoItemProps) {
  return (
    <div>
      <span className="block text-xs uppercase text-text-muted tracking-wide font-semibold mb-1">
        {label}
      </span>
      <p className="text-text-primary font-medium">{value}</p>
    </div>
  );
}

interface StudentPersonalTabProps {
  student: Student;
}

export function StudentPersonalTab({ student }: StudentPersonalTabProps) {
  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-text-primary mb-6 flex items-center gap-2">
          <User className="w-5 h-5 text-accent" />
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
          <InfoItem label="Date of Birth" value={student.dateOfBirth} />
          <InfoItem label="Gender" value={student.gender} />
          <InfoItem label="Region" value={student.region} />
          <InfoItem label="Address" value={student.presentAddress} />
        </div>
      </div>

      {/* Parent/Guardian */}
      <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-text-primary mb-6 flex items-center gap-2">
          <User className="w-5 h-5 text-accent" />
          Parent / Guardian Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
          <InfoItem label="Father's Name" value={student.fatherName} />
          <InfoItem label="Father's Email" value={student.fatherEmail} />
          <InfoItem label="Father's CNIC" value={student.fatherNicNo} />
          <InfoItem label="WhatsApp" value={student.fatherWhatsapp} />
        </div>
      </div>
    </div>
  );
}
