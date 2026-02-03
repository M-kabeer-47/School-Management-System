"use client";

import { Student } from "@/lib/admin/types/class-detail";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { User, Phone, MessageCircle, MapPin, X } from "lucide-react";

interface StudentDetailDrawerProps {
  student: Student | null;
  open: boolean;
  onClose: () => void;
}

export const StudentDetailDrawer = ({
  student,
  open,
  onClose,
}: StudentDetailDrawerProps) => {
  return (
    <Drawer
      direction="right"
      open={open}
      onOpenChange={(isOpen) => !isOpen && onClose()}
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
              className="text-text-secondary hover:text-text-primary max-w-[40px]"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <DrawerDescription className="sr-only">
            Detailed information for {student?.name}
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-border hover:scrollbar-thumb-text-muted">
          {student && (
            <div className="space-y-6">
              {/* Profile Header */}
              <div className="flex items-center gap-4 pb-6 border-b border-border">
                <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center text-accent text-3xl font-bold">
                  {student.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary">
                    {student.name}
                  </h3>
                  <p className="text-text-secondary">
                    {student.rollNo} • {student.section}
                  </p>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded bg-surface border border-border text-xs text-text-muted">
                    {student.registrationCode}
                  </span>
                </div>
              </div>

              {/* Info Blocks */}
              <div className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider">
                    Personal Information
                  </h4>
                  <div className="grid grid-cols-1 gap-4">
                    <InfoBlock
                      icon={User}
                      label="Father Name"
                      value={student.fatherName}
                    />
                    <InfoBlock
                      icon={User}
                      label="Gender"
                      value={student.gender}
                    />
                  </div>
                </div>

                {/* Contact Details */}
                <div className="space-y-4 pt-4 border-t border-border">
                  <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider">
                    Contact Details
                  </h4>
                  <div className="space-y-4">
                    <InfoBlock
                      icon={Phone}
                      label="Phone No"
                      value={student.phoneNo}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <InfoBlock
                        icon={MessageCircle}
                        label="Father WhatsApp"
                        value={student.fatherWhatsapp}
                      />
                      {student.studentWhatsapp && (
                        <InfoBlock
                          icon={MessageCircle}
                          label="Student WhatsApp"
                          value={student.studentWhatsapp}
                        />
                      )}
                    </div>
                    {(student.studentEmail || student.fatherEmail) && (
                      <div className="grid grid-cols-1 gap-4">
                        {student.studentEmail && (
                          <InfoBlock
                            icon={User}
                            label="Student Email"
                            value={student.studentEmail}
                          />
                        )}
                        {student.fatherEmail && (
                          <InfoBlock
                            icon={User}
                            label="Father Email"
                            value={student.fatherEmail}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-4 pt-4 border-t border-border">
                  <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider">
                    Address
                  </h4>
                  <div className="space-y-4">
                    <InfoBlock
                      icon={MapPin}
                      label="Current Address"
                      value={student.presentAddress}
                    />
                    <InfoBlock
                      icon={MapPin}
                      label="Region"
                      value={student.region}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
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
