import { Student } from "@/lib/admin/types/student";
import { Mail, Phone, MapPin, Calendar, GraduationCap } from "lucide-react";
import { ProfilePhoto } from "./ProfilePhoto";

interface StudentProfileSidebarProps {
  student: Student;
}

export function StudentProfileSidebar({ student }: StudentProfileSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Profile Card looking like StudentCard */}
      <div className="bg-surface border border-border rounded-2xl shadow-sm overflow-hidden">
        {/* Header with gradient */}
        <div className="h-24 bg-accent-gradient relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />
        </div>

        <div className="px-6 pb-6 relative">
          {/* Photo - Overlapping the header */}
          <div className="-mt-12 mb-4 flex justify-center">
            <ProfilePhoto
              name={student.studentName}
              size="lg" // Adjust size as needed, lg is w-32/40
              editable={false}
            />
          </div>

          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-text-primary font-heading">
              {student.studentName}
            </h2>
            <p className="text-text-secondary text-sm">{student.admissionNo}</p>

            <div className="flex flex-wrap justify-center gap-2 mt-3">
              <span className="px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full flex items-center gap-1">
                <GraduationCap className="w-3 h-3" />
                {student.class} - {student.section}
              </span>
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full ${
                  student.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {student.status}
              </span>
            </div>
          </div>

          <div className="space-y-4 text-left border-t border-border pt-6">
            <div className="flex items-start gap-3 text-text-secondary group hover:text-text-primary transition-colors">
              <Mail className="w-4 h-4 mt-0.5 shrink-0 group-hover:text-accent" />
              <div className="overflow-hidden">
                <p className="text-xs text-text-muted mb-0.5">Email</p>
                <p className="text-sm truncate font-medium">
                  {student.studentEmail}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-text-secondary group hover:text-text-primary transition-colors">
              <Phone className="w-4 h-4 mt-0.5 shrink-0 group-hover:text-accent" />
              <div>
                <p className="text-xs text-text-muted mb-0.5">Phone</p>
                <p className="text-sm font-medium">{student.phoneNo}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-text-secondary group hover:text-text-primary transition-colors">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0 group-hover:text-accent" />
              <div>
                <p className="text-xs text-text-muted mb-0.5">Address</p>
                <p className="text-sm line-clamp-2 font-medium">
                  {student.presentAddress}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-accent" />
          Attendance Stats
        </h3>
        {/* Mock Attendance Circle */}
        <div className="flex items-center justify-center py-4">
          <div className="relative w-32 h-32 rounded-full border-8 border-accent/20 flex items-center justify-center">
            <div className="absolute inset-0 border-8 border-accent rounded-full border-l-transparent border-b-transparent rotate-45"></div>
            <div className="text-center">
              <span className="block text-2xl font-bold text-text-primary">
                92%
              </span>
              <span className="text-xs text-text-muted">Present</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
