"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { X, Layers, Users, GraduationCap, CheckCircle } from "lucide-react";
import { cn } from "@/lib/common/utils";
import { ExtraCharge } from "@/lib/admin/types/finance";

interface ClassFeeDetails {
  baseFees: { items: { name: string; amount: number }[]; total: number };
  classWideCharges: ExtraCharge[];
  sectionCharges: ExtraCharge[];
  studentCharges: ExtraCharge[];
}

interface ClassFeeDetailsDrawerProps {
  className: string | null;
  details: ClassFeeDetails | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ClassFeeDetailsDrawer({
  className,
  details,
  isOpen,
  onClose,
}: ClassFeeDetailsDrawerProps) {
  const handleOpen = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const totalBaseFee = details?.baseFees.total || 0;

  // Calculate potential total collection for one student in this class (excluding student-specific extras)
  // This is a bit complex because section charges vary. We'll show the base structure.

  return (
    <Drawer direction="right" open={isOpen} onOpenChange={handleOpen}>
      <DrawerContent className="h-full sm:max-w-md">
        <DrawerHeader className="border-b border-border bg-surface px-6 py-5">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-xl font-bold font-heading text-text-primary">
              Fee Structure Details
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
            Fee breakdown for Class {className || ""}
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-border hover:scrollbar-thumb-text-muted">
          {details && className && (
            <div className="space-y-6">
              {/* Class Header */}
              <div className="flex items-center gap-4 pb-6 border-b border-border">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent text-2xl font-bold">
                  {className}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-primary">
                    Class {className}
                  </h3>
                  <p className="text-text-secondary">
                    Monthly Fee Structure Breakdown
                  </p>
                </div>
              </div>

              {/* Base Monthly Fees */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-text-primary font-semibold">
                  <Layers className="w-4 h-4 text-accent" />
                  <h4>Standard Monthly Fees</h4>
                </div>
                <div className="bg-surface rounded-xl border border-border overflow-hidden">
                  {details.baseFees.items.length > 0 ? (
                    <div className="divide-y divide-border">
                      {details.baseFees.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between p-3 text-sm"
                        >
                          <span className="text-text-secondary">
                            {item.name}
                          </span>
                          <span className="font-medium text-text-primary">
                            Rs. {item.amount.toLocaleString()}
                          </span>
                        </div>
                      ))}
                      <div className="flex justify-between p-3 bg-surface-secondary/30 text-sm font-semibold">
                        <span>Subtotal</span>
                        <span className="text-accent">
                          Rs. {totalBaseFee.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 text-center text-text-muted text-sm">
                      No standard monthly fees configured.
                    </div>
                  )}
                </div>
              </div>

              {/* Class-Wide Extra Charges */}
              {details.classWideCharges.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-text-primary font-semibold">
                    <GraduationCap className="w-4 h-4 text-purple-600" />
                    <h4>Class-Wide Charges</h4>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-950/20 rounded-xl border border-purple-100 dark:border-purple-800/30 overflow-hidden">
                    <div className="divide-y divide-purple-100 dark:divide-purple-800/30">
                      {details.classWideCharges.map((charge) => (
                        <div
                          key={charge.id}
                          className="flex justify-between p-3 text-sm"
                        >
                          <div>
                            <span className="block text-purple-900 dark:text-purple-100 font-medium">
                              {charge.name}
                            </span>
                            <span className="text-xs text-purple-600 dark:text-purple-300">
                              Applied to all students in class
                            </span>
                          </div>
                          <span className="font-semibold text-purple-700 dark:text-purple-300">
                            + Rs. {charge.amount.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Section-Specific Charges */}
              {details.sectionCharges.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-text-primary font-semibold">
                    <Users className="w-4 h-4 text-blue-600" />
                    <h4>Section-Specific Charges</h4>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-950/20 rounded-xl border border-blue-100 dark:border-blue-800/30 overflow-hidden">
                    <div className="divide-y divide-blue-100 dark:divide-blue-800/30">
                      {details.sectionCharges.map((charge) => (
                        <div
                          key={charge.id}
                          className="flex justify-between p-3 text-sm"
                        >
                          <div>
                            <span className="block text-blue-900 dark:text-blue-100 font-medium">
                              {charge.name}
                            </span>
                            <span className="text-xs text-blue-600 dark:text-blue-300">
                              Sections:{" "}
                              {charge.targetSections
                                .map((s) => s.split("-")[1])
                                .join(", ")}
                            </span>
                          </div>
                          <span className="font-semibold text-blue-700 dark:text-blue-300">
                            + Rs. {charge.amount.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Student-Specific Charges */}
              {details.studentCharges.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-text-primary font-semibold">
                    <Users className="w-4 h-4 text-orange-600" />
                    <h4>Student-Specific Charges</h4>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-950/20 rounded-xl border border-orange-100 dark:border-orange-800/30 overflow-hidden">
                    <div className="divide-y divide-orange-100 dark:divide-orange-800/30">
                      {details.studentCharges.map((charge) => (
                        <div
                          key={charge.id}
                          className="flex justify-between p-3 text-sm"
                        >
                          <div>
                            <span className="block text-orange-900 dark:text-orange-100 font-medium">
                              {charge.name}
                            </span>
                            <span className="text-xs text-orange-600 dark:text-orange-300">
                              {charge.targetStudentIds.length} specific student
                              {charge.targetStudentIds.length !== 1 ? "s" : ""}
                            </span>
                          </div>
                          <span className="font-semibold text-orange-700 dark:text-orange-300">
                            + Rs. {charge.amount.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Summary Note */}
              <div className="bg-surface-secondary/30 rounded-lg p-4 text-xs text-text-secondary leading-relaxed">
                <span className="font-semibold text-text-primary">Note:</span>{" "}
                This breakdown shows the potential charges for Class {className}
                . Actual challan amounts for individual students may vary based
                on fee concessions, scholarships, or arrears.
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-border p-4 bg-surface">
          <Button className="w-full" onClick={onClose}>
            <CheckCircle className="w-4 h-4 mr-2" />
            Done
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
