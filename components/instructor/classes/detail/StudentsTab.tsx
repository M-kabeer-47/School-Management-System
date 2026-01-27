"use client";

import { useState } from "react";
import { Student } from "@/lib/instructor/types/class-detail";
import {
  Table,
  TableHeader,
  TableHeadRow,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/Table";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { User, Phone, MessageCircle, Eye, MapPin, X } from "lucide-react";

interface StudentsTabProps {
  students: Student[];
}

export const StudentsTab = ({ students }: StudentsTabProps) => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold font-heading text-text-primary">
          Students List
        </h2>
        <span className="text-sm text-text-muted bg-surface px-3 py-1 rounded-full border border-border">
          Total: {students.length}
        </span>
      </div>

      <div className="rounded-2xl border border-border overflow-hidden bg-surface">
        <Table>
          <TableHeader>
            <TableHeadRow>
              <TableHead className="w-[80px]">Roll No</TableHead>
              <TableHead>Student Name</TableHead>
              <TableHead>Father Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableHeadRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow
                key={student.id}
                className="group hover:bg-surface-hover"
              >
                <TableCell className="font-bold text-text-primary">
                  {student.rollNo}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                      <User className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-text-primary">
                      {student.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-text-secondary">
                  {student.fatherName}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{student.fatherWhatsapp || student.phoneNo}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => setSelectedStudent(student)}
                      className="p-2 rounded-lg bg-surface hover:bg-surface-active transition-colors border border-border text-text-secondary hover:text-text-primary"
                      title="View Full Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors border border-green-200"
                      title="WhatsApp Father"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Student Details Drawer */}
      <Drawer
        direction="right"
        open={!!selectedStudent}
        onOpenChange={(open) => !open && setSelectedStudent(null)}
      >
        <DrawerContent className="h-full sm:max-w-md">
          <DrawerHeader className="border-b border-border bg-surface px-6 py-5">
            <div className="flex items-center justify-between">
              <DrawerTitle className="text-xl font-bold font-heading text-text-primary">
                Student Information
              </DrawerTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-text-secondary hover:text-text-primary"
                onClick={() => setSelectedStudent(null)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <DrawerDescription className="sr-only">
              Detailed information for {selectedStudent?.name}
            </DrawerDescription>
          </DrawerHeader>

          <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-border hover:scrollbar-thumb-text-muted">
            {selectedStudent && (
              <div className="space-y-6">
                {/* Profile Header */}
                <div className="flex items-center gap-4 pb-6 border-b border-border">
                  <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center text-accent text-3xl font-bold">
                    {selectedStudent.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text-primary">
                      {selectedStudent.name}
                    </h3>
                    <p className="text-text-secondary">
                      {selectedStudent.rollNo} • {selectedStudent.section}
                    </p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded bg-surface border border-border text-xs text-text-muted">
                      {selectedStudent.registrationCode}
                    </span>
                  </div>
                </div>

                {/* Info Blocks */}
                <div className="space-y-6">
                  {/* Primary Info */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider">
                      Personal Information
                    </h4>
                    <div className="grid grid-cols-1 gap-4">
                      <InfoBlock
                        icon={User}
                        label="Father Name"
                        value={selectedStudent.fatherName}
                      />
                      <InfoBlock
                        icon={User}
                        label="Gender"
                        value={selectedStudent.gender}
                      />
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-4 pt-4 border-t border-border">
                    <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider">
                      Contact Details
                    </h4>
                    <div className="space-y-4">
                      <InfoBlock
                        icon={Phone}
                        label="Phone No"
                        value={selectedStudent.phoneNo}
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InfoBlock
                          icon={MessageCircle}
                          label="Father WhatsApp"
                          value={selectedStudent.fatherWhatsapp}
                        />
                        {selectedStudent.studentWhatsapp && (
                          <InfoBlock
                            icon={MessageCircle}
                            label="Student WhatsApp"
                            value={selectedStudent.studentWhatsapp}
                          />
                        )}
                      </div>
                      {(selectedStudent.studentEmail ||
                        selectedStudent.fatherEmail) && (
                        <div className="grid grid-cols-1 gap-4">
                          {selectedStudent.studentEmail && (
                            <InfoBlock
                              icon={User}
                              label="Student Email"
                              value={selectedStudent.studentEmail}
                            />
                          )}
                          {selectedStudent.fatherEmail && (
                            <InfoBlock
                              icon={User}
                              label="Father Email"
                              value={selectedStudent.fatherEmail}
                            />
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Address Info */}
                  <div className="space-y-4 pt-4 border-t border-border">
                    <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider">
                      Address
                    </h4>
                    <div className="space-y-4">
                      <InfoBlock
                        icon={MapPin}
                        label="Current Address"
                        value={selectedStudent.presentAddress}
                      />
                      <InfoBlock
                        icon={MapPin}
                        label="Region"
                        value={selectedStudent.region}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

// Helper for detail rows
const InfoBlock = ({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string | number;
}) => (
  <div className="flex items-start gap-3">
    <div className="mt-0.5 text-text-muted">
      <Icon className="w-4 h-4" />
    </div>
    <div>
      <p className="text-xs font-semibold text-text-muted uppercase tracking-wide">
        {label}
      </p>
      <p className="text-sm font-medium text-text-primary mt-0.5">
        {value || "N/A"}
      </p>
    </div>
  </div>
);
