"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import {
  ArrowLeft,
  User,
  Phone,
  MapPin,
  Calendar,
  Users,
  Map,
  Building,
  Hash,
  Mail,
  Globe,
  BookHeart,
  FileText,
  ArrowRightLeft,
  School,
} from "lucide-react";
import { allStudents } from "@/lib/admin/mock-data/students";
import { ParentCard } from "@/components/admin/students/detail/ParentCard";
import { ParentInfo } from "@/lib/admin/types/student-detail";
import { InfoGridCard } from "@/components/admin/students/detail/InfoGridCard";
import { StudentOverviewCard } from "@/components/admin/students/detail/StudentOverviewCard";
import { SiblingsCard } from "@/components/admin/students/detail/SiblingsCard";

export default function StudentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  // Find student by ID (using mock data for now)
  const student = allStudents.find((s) => s.id === id) || allStudents[0];

  // Find siblings by matching father's CNIC
  const siblings = useMemo(() => {
    if (!student) return [];
    return allStudents.filter(
      (s) =>
        s.id !== student.id &&
        s.fatherNicNo === student.fatherNicNo,
    );
  }, [student]);

  if (!student) {
    return <div>Student not found</div>;
  }

  // Calculate Age
  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Parent Data Mapping
  const fatherInfo: ParentInfo = {
    name: student.fatherName,
    cnic: student.fatherNicNo,
    email: student.fatherEmail,
    phone: student.fatherWhatsapp,
    occupation: "Business",
  };

  const motherInfo: ParentInfo = {
    name: "Mrs. " + student.fatherName.split(" ")[0],
    cnic: "00000-0000000-0",
    email: "mother@example.com",
    phone: "0000-0000000",
    occupation: "Housewife",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 max-w-7xl mx-auto pb-10"
    >
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center w-full sm:w-auto gap-3">
          <Button
            variant="ghost"
            className="p-1 min-w-[30px] h-auto w-auto hover:bg-accent/10 text-text-secondary hover:text-text-primary -ml-1 sm:ml-0"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-text-primary font-heading">
              Student Profile
            </h1>
            <p className="text-text-secondary text-sm">
              View and manage student information
            </p>
          </div>
        </div>
      </div>

      {/* Row 1: Student Overview (Identity + Academic) */}
      <StudentOverviewCard
        student={student}
        onEdit={() => console.log("Edit Overview")}
        onSave={(data) => console.log("Save Overview", data)}
      />

      {/* Row 2: Personal + Identity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InfoGridCard
          title="PERSONAL INFORMATION"
          icon={User}
          data={student}
          fields={[
            {
              key: "dateOfBirth",
              label: "Date of Birth",
              icon: Calendar,
              type: "date",
            },
            {
              key: "age",
              label: "Age",
              icon: Users,
              editable: false,
              format: () => `${calculateAge(student.dateOfBirth)} years`,
            },
            {
              key: "gender",
              label: "Gender",
              icon: User,
              type: "select",
              options: [
                { label: "Male", value: "Male" },
                { label: "Female", value: "Female" },
              ],
            },
          ]}
          onSave={(data) => console.log("Save Personal", data)}
        />

        <InfoGridCard
          title="IDENTITY & BACKGROUND"
          icon={FileText}
          data={student}
          fields={[
            {
              key: "bFormNo",
              label: "B-Form (NADRA)",
              icon: FileText,
            },
            {
              key: "nationality",
              label: "Nationality",
              icon: Globe,
            },
            {
              key: "religion",
              label: "Religion",
              icon: BookHeart,
            },
          ]}
          onSave={(data) => console.log("Save Identity", data)}
        />
      </div>

      {/* Row 3: Contact + Transfer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InfoGridCard
          title="CONTACT INFORMATION"
          icon={Phone}
          data={student}
          fields={[
            { key: "studentEmail", label: "Student Email", icon: Mail },
            {
              key: "studentWhatsapp",
              label: "Student WhatsApp",
              icon: Phone,
              type: "number",
            },
            {
              key: "phoneNo",
              label: "Phone Number",
              icon: Phone,
              type: "number",
            },
          ]}
          onSave={(data) => console.log("Save Contact", data)}
        />

        {student.isTransfer && (
          <InfoGridCard
            title="TRANSFER DETAILS"
            icon={ArrowRightLeft}
            data={student}
            fields={[
              {
                key: "previousSchool",
                label: "Previous School",
                icon: School,
                editable: false,
              },
              {
                key: "previousClass",
                label: "Previous Class",
                icon: Hash,
                editable: false,
                format: () => student.previousClass ? `Class ${student.previousClass}` : "N/A",
              },
              {
                key: "reasonForLeaving",
                label: "Reason for Leaving",
                icon: FileText,
                editable: false,
              },
            ]}
            onSave={(data) => console.log("Save Transfer", data)}
          />
        )}
      </div>

      {/* Siblings */}
      <SiblingsCard
        currentStudent={student}
        siblings={siblings}
      />

      {/* Parent / Guardian */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-text-primary font-heading uppercase tracking-wider">
            Parent / Guardian Information
          </h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent rounded-l-2xl z-10"></div>
            <ParentCard
              title="Father"
              parent={fatherInfo}
              isPrimary={true}
              onSave={(data) => console.log("Save Father", data)}
            />
          </div>
          <div className="relative">
            <ParentCard
              title="Mother"
              parent={motherInfo}
              isPrimary={false}
              onSave={(data) => console.log("Save Mother", data)}
            />
          </div>
        </div>
      </section>

      {/* Address */}
      <div className="grid grid-cols-1 gap-6">
        <InfoGridCard
          title="ADDRESS"
          icon={MapPin}
          data={student}
          fields={[
            { key: "presentAddress", label: "Address", icon: MapPin },
            {
              key: "city",
              label: "City",
              icon: Building,
              format: () => "Lahore",
              editable: true,
            },
            { key: "region", label: "State / Province", icon: Map },
            {
              key: "postalCode",
              label: "Postal Code",
              icon: Hash,
              format: () => "54000",
              editable: true,
            },
          ]}
          onSave={(data) => console.log("Save Address", data)}
        />
      </div>
    </motion.div>
  );
}
