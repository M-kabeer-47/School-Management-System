"use client";

import { useState, useMemo } from "react";
import {
  X,
  Search,
  Check,
  UserPlus,
  GraduationCap,
  Briefcase,
  School,
} from "lucide-react";
import {
  Command,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/Command";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import {
  MessageRecipient,
  RecipientType,
  StaffRecipient,
  StaffTypeFilter,
} from "@/lib/admin/types/messages";
import {
  sampleStudents,
  getStaffAsRecipients,
} from "@/lib/admin/mock-data/messages";
import { teachingStaff, nonTeachingStaff } from "@/lib/admin/mock-data/staff";
import { cn } from "@/lib/common/utils";

// Section categories for teaching staff
const TEACHING_SECTIONS = ["ECE", "Junior", "Middle", "Senior"] as const;
type TeachingSection = (typeof TEACHING_SECTIONS)[number];

// Map class numbers to sections
const getClassSection = (classNum: string): TeachingSection => {
  const num = parseInt(classNum);
  if (num <= 2) return "ECE";
  if (num <= 5) return "Junior";
  if (num <= 8) return "Middle";
  return "Senior";
};

interface RecipientSelectorProps {
  recipientType: RecipientType;
  onRecipientTypeChange: (type: RecipientType) => void;
  selectedStudents: MessageRecipient[];
  onStudentSelectionChange: (recipients: MessageRecipient[]) => void;
  selectedStaff: StaffRecipient[];
  onStaffSelectionChange: (recipients: StaffRecipient[]) => void;
  sendToAll: boolean;
  onSendToAllChange: (value: boolean) => void;
}

export function RecipientSelector({
  recipientType,
  onRecipientTypeChange,
  selectedStudents,
  onStudentSelectionChange,
  selectedStaff,
  onStaffSelectionChange,
  sendToAll,
  onSendToAllChange,
}: RecipientSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Student filters
  const [classFilter, setClassFilter] = useState("all");
  const [sectionFilter, setSectionFilter] = useState("all");

  // Staff filters
  const [staffTypeFilter, setStaffTypeFilter] =
    useState<StaffTypeFilter>("all");
  const [teachingSectionFilter, setTeachingSectionFilter] = useState("all"); // ECE, Junior, Middle, Senior
  const [roleFilter, setRoleFilter] = useState("all"); // For non-teaching staff

  // Student: unique classes and sections
  const uniqueClasses = useMemo(() => {
    return [...new Set(sampleStudents.map((s) => s.class))].sort(
      (a, b) => parseInt(a) - parseInt(b),
    );
  }, []);

  const uniqueSections = useMemo(() => {
    const filtered =
      classFilter === "all"
        ? sampleStudents
        : sampleStudents.filter((s) => s.class === classFilter);
    return [...new Set(filtered.map((s) => s.section))].sort();
  }, [classFilter]);

  // Non-teaching roles
  const uniqueRoles = useMemo(() => {
    const roles = nonTeachingStaff
      .filter((s) => s.status === "active")
      .map((s) => s.role);
    return [...new Set(roles)].sort();
  }, []);

  // Filter students
  const filteredStudents = useMemo(() => {
    let students = sampleStudents;
    if (classFilter !== "all") {
      students = students.filter((s) => s.class === classFilter);
    }
    if (sectionFilter !== "all") {
      students = students.filter((s) => s.section === sectionFilter);
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      students = students.filter((s) => s.name.toLowerCase().includes(query));
    }
    return students;
  }, [searchQuery, classFilter, sectionFilter]);

  // Filter staff
  const filteredStaff = useMemo(() => {
    let staff: StaffRecipient[] = [];

    if (staffTypeFilter === "all" || staffTypeFilter === "teaching") {
      let teachers = teachingStaff.filter((s) => s.status === "active");

      // Apply section filter for teaching staff
      if (teachingSectionFilter !== "all" && staffTypeFilter === "teaching") {
        teachers = teachers.filter((s) => {
          // Check if teacher teaches in any class of the selected section
          return s.classes.some(
            (cls) => getClassSection(cls) === teachingSectionFilter,
          );
        });
      }

      staff = [
        ...staff,
        ...teachers.map((s) => ({
          id: s.id,
          name: s.name,
          staffType: s.staffType,
          designation: s.designation,
          subjects: s.subjects,
          classes: s.classes,
          phone: s.phone,
          whatsapp: s.whatsapp,
        })),
      ];
    }

    if (staffTypeFilter === "all" || staffTypeFilter === "non-teaching") {
      let nonTeachers = nonTeachingStaff.filter((s) => s.status === "active");

      // Apply role filter
      if (roleFilter !== "all" && staffTypeFilter === "non-teaching") {
        nonTeachers = nonTeachers.filter((s) => s.role === roleFilter);
      }

      staff = [
        ...staff,
        ...nonTeachers.map((s) => ({
          id: s.id,
          name: s.name,
          staffType: s.staffType,
          designation: s.designation,
          role: s.role,
          phone: s.phone,
          whatsapp: s.whatsapp,
        })),
      ];
    }

    // Apply search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      staff = staff.filter(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          s.designation.toLowerCase().includes(query),
      );
    }

    return staff;
  }, [staffTypeFilter, teachingSectionFilter, roleFilter, searchQuery]);

  // Handlers
  const handleSelectStudent = (student: MessageRecipient) => {
    onSendToAllChange(false);
    if (selectedStudents.some((r) => r.id === student.id)) {
      onStudentSelectionChange(
        selectedStudents.filter((r) => r.id !== student.id),
      );
    } else {
      onStudentSelectionChange([...selectedStudents, student]);
    }
  };

  const handleSelectStaff = (staff: StaffRecipient) => {
    onSendToAllChange(false);
    if (selectedStaff.some((r) => r.id === staff.id)) {
      onStaffSelectionChange(selectedStaff.filter((r) => r.id !== staff.id));
    } else {
      onStaffSelectionChange([...selectedStaff, staff]);
    }
  };

  const handleRemoveStudent = (studentId: string) => {
    onStudentSelectionChange(
      selectedStudents.filter((r) => r.id !== studentId),
    );
  };

  const handleRemoveStaff = (staffId: string) => {
    onStaffSelectionChange(selectedStaff.filter((r) => r.id !== staffId));
  };

  const handleClassChange = (value: string) => {
    setClassFilter(value);
    setSectionFilter("all");
    // When filter changes and not selecting specific, send to filtered group
    if (!isOpen && selectedStudents.length === 0) {
      onSendToAllChange(true);
    }
  };

  const handleSectionChange = (value: string) => {
    setSectionFilter(value);
    if (!isOpen && selectedStudents.length === 0) {
      onSendToAllChange(true);
    }
  };

  const handleStaffTypeChange = (value: StaffTypeFilter) => {
    setStaffTypeFilter(value);
    setTeachingSectionFilter("all");
    setRoleFilter("all");
    if (!isOpen && selectedStaff.length === 0) {
      onSendToAllChange(true);
    }
  };

  const handleTeachingSectionChange = (value: string) => {
    setTeachingSectionFilter(value);
    if (!isOpen && selectedStaff.length === 0) {
      onSendToAllChange(true);
    }
  };

  const handleRoleChange = (value: string) => {
    setRoleFilter(value);
    if (!isOpen && selectedStaff.length === 0) {
      onSendToAllChange(true);
    }
  };

  const handleRecipientTypeChange = (type: RecipientType) => {
    onRecipientTypeChange(type);
    if (type === "everyone") {
      onSendToAllChange(true);
    } else {
      onSendToAllChange(true); // Default to sending to all filtered
    }
    onStudentSelectionChange([]);
    onStaffSelectionChange([]);
    setSearchQuery("");
  };

  const handleOpenSelectSpecific = () => {
    setIsOpen(true);
    onSendToAllChange(false);
  };

  const isStudentSelected = (id: string) =>
    selectedStudents.some((r) => r.id === id);
  const isStaffSelected = (id: string) =>
    selectedStaff.some((r) => r.id === id);

  // Get filter description
  const getFilterDescription = () => {
    if (recipientType === "everyone") {
      return "Everyone (Students & Staff)";
    }
    if (recipientType === "students") {
      if (classFilter !== "all" && sectionFilter !== "all") {
        return `Class ${classFilter}-${sectionFilter}`;
      }
      if (classFilter !== "all") {
        return `Class ${classFilter} (all sections)`;
      }
      return "All Students";
    } else {
      if (staffTypeFilter === "teaching") {
        if (teachingSectionFilter !== "all") {
          return `${teachingSectionFilter} Section Teachers`;
        }
        return "All Teaching Staff";
      }
      if (staffTypeFilter === "non-teaching") {
        if (roleFilter !== "all") {
          return `${roleFilter}`;
        }
        return "All Non-Teaching Staff";
      }
      return "All Staff";
    }
  };

  const currentCount = useMemo(() => {
    if (recipientType === "everyone") {
      return sampleStudents.length + getStaffAsRecipients().length;
    }
    return recipientType === "students"
      ? filteredStudents.length
      : filteredStaff.length;
  }, [recipientType, filteredStudents.length, filteredStaff.length]);

  const currentSelectionCount =
    recipientType === "students"
      ? selectedStudents.length
      : selectedStaff.length;

  return (
    <div className="space-y-4">
      {/* Recipient Type Toggle */}
      <div>
        <label className="text-sm font-medium text-text-secondary mb-2 block">
          Send to
        </label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => handleRecipientTypeChange("everyone")}
            className={cn(
              "flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2",
              recipientType === "everyone"
                ? "bg-accent text-white shadow-lg shadow-accent/25"
                : "bg-surface border border-border text-text-secondary hover:border-accent/50 hover:text-accent",
            )}
          >
            <School className="w-5 h-5" />
            Everyone
          </button>
          <button
            type="button"
            onClick={() => handleRecipientTypeChange("students")}
            className={cn(
              "flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2",
              recipientType === "students"
                ? "bg-accent text-white shadow-lg shadow-accent/25"
                : "bg-surface border border-border text-text-secondary hover:border-accent/50 hover:text-accent",
            )}
          >
            <GraduationCap className="w-5 h-5" />
            Students
          </button>
          <button
            type="button"
            onClick={() => handleRecipientTypeChange("staff")}
            className={cn(
              "flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2",
              recipientType === "staff"
                ? "bg-accent text-white shadow-lg shadow-accent/25"
                : "bg-surface border border-border text-text-secondary hover:border-accent/50 hover:text-accent",
            )}
          >
            <Briefcase className="w-5 h-5" />
            Staff
          </button>
        </div>
      </div>

      {/* Everyone View */}
      {recipientType === "everyone" && (
        <div className="bg-accent/5 rounded-xl border border-accent/10 p-4 flex gap-3 items-start">
          <div className="bg-accent/10 p-2 rounded-lg shrink-0">
            <School className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h4 className="font-medium text-text-primary text-sm">
              Sending to Everyone
            </h4>
            <p className="text-sm text-text-secondary mt-1">
              This message will be sent to all{" "}
              <strong>{sampleStudents.length} students</strong> and{" "}
              <strong>{getStaffAsRecipients().length} staff members</strong>.
            </p>
          </div>
        </div>
      )}

      {/* Student Filters */}
      {recipientType === "students" && (
        <div className="flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-[100px]">
            <label className="text-xs text-text-muted mb-1 block">Class</label>
            <Select value={classFilter} onValueChange={handleClassChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Classes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                {uniqueClasses.map((cls) => (
                  <SelectItem key={cls} value={cls}>
                    Class {cls}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1 min-w-[100px]">
            <label className="text-xs text-text-muted mb-1 block">
              Section
            </label>
            <Select
              value={sectionFilter}
              onValueChange={handleSectionChange}
              disabled={classFilter === "all"}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Sections" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sections</SelectItem>
                {uniqueSections.map((sec) => (
                  <SelectItem key={sec} value={sec}>
                    Section {sec}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <button
            type="button"
            onClick={handleOpenSelectSpecific}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 h-10",
              currentSelectionCount > 0
                ? "bg-accent text-white"
                : "bg-surface border border-border text-text-secondary hover:border-accent/50 hover:text-accent",
            )}
          >
            <UserPlus className="w-4 h-4" />
            Select Specific
          </button>
        </div>
      )}

      {/* Staff Filters */}
      {recipientType === "staff" && (
        <div className="flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-[120px]">
            <label className="text-xs text-text-muted mb-1 block">
              Staff Type
            </label>
            <Select
              value={staffTypeFilter}
              onValueChange={(v) => handleStaffTypeChange(v as StaffTypeFilter)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Staff" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Staff</SelectItem>
                <SelectItem value="teaching">Teaching Staff</SelectItem>
                <SelectItem value="non-teaching">Non-Teaching Staff</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Teaching Staff Section Filter */}
          {staffTypeFilter === "teaching" && (
            <div className="flex-1 min-w-[120px]">
              <label className="text-xs text-text-muted mb-1 block">
                Section
              </label>
              <Select
                value={teachingSectionFilter}
                onValueChange={handleTeachingSectionChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Sections" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sections</SelectItem>
                  {TEACHING_SECTIONS.map((section) => (
                    <SelectItem key={section} value={section}>
                      {section}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Non-Teaching Staff Role Filter */}
          {staffTypeFilter === "non-teaching" && (
            <div className="flex-1 min-w-[120px]">
              <label className="text-xs text-text-muted mb-1 block">Role</label>
              <Select value={roleFilter} onValueChange={handleRoleChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  {uniqueRoles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <button
            type="button"
            onClick={handleOpenSelectSpecific}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 h-10",
              currentSelectionCount > 0
                ? "bg-accent text-white"
                : "bg-surface border border-border text-text-secondary hover:border-accent/50 hover:text-accent",
            )}
          >
            <UserPlus className="w-4 h-4" />
            Select Specific
          </button>
        </div>
      )}

      {/* Status Indicator */}
      {sendToAll &&
        currentSelectionCount === 0 &&
        recipientType !== "everyone" && (
          <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
            <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-sm text-green-700 dark:text-green-300">
              Sending to {currentCount} {recipientType} (
              {getFilterDescription()})
            </span>
          </div>
        )}

      {/* Selected Tags */}
      {currentSelectionCount > 0 && (
        <div className="flex flex-wrap gap-2 p-3 bg-surface rounded-xl border border-border">
          {recipientType === "students" &&
            selectedStudents.map((r) => (
              <span
                key={r.id}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium"
              >
                {r.name}
                <span className="text-accent/60 text-xs">
                  ({r.class}-{r.section})
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveStudent(r.id)}
                  className="ml-1 p-0.5 rounded-full hover:bg-accent/20"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          {recipientType === "staff" &&
            selectedStaff.map((r) => (
              <span
                key={r.id}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium",
                  r.staffType === "teaching"
                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                    : "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
                )}
              >
                {r.name}
                <span className="opacity-60 text-xs">({r.designation})</span>
                <button
                  type="button"
                  onClick={() => handleRemoveStaff(r.id)}
                  className="ml-1 p-0.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
        </div>
      )}

      {/* Search Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => {
              setIsOpen(false);
              setSearchQuery("");
            }}
          />
          <div className="relative w-full max-w-lg mx-4">
            <Command className="border border-border shadow-2xl">
              <div className="flex items-center px-4 py-3 border-b border-border">
                <Search className="w-4 h-4 text-text-muted mr-2" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name..."
                  className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-muted outline-none"
                  autoFocus
                />
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setSearchQuery("");
                  }}
                  className="p-1.5 rounded-lg hover:bg-surface text-text-muted hover:text-text-primary"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <CommandList className="max-h-[300px]">
                <CommandEmpty>No results found.</CommandEmpty>

                {recipientType === "students" && (
                  <CommandGroup
                    heading={`Students (${filteredStudents.length})`}
                  >
                    {filteredStudents.map((student) => (
                      <CommandItem
                        key={student.id}
                        onSelect={() => handleSelectStudent(student)}
                        className="cursor-pointer"
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent font-medium text-sm">
                              {student.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium text-text-primary">
                                {student.name}
                              </p>
                              <p className="text-xs text-text-muted">
                                Class {student.class}-{student.section}
                              </p>
                            </div>
                          </div>
                          {isStudentSelected(student.id) && (
                            <Check className="w-4 h-4 text-accent" />
                          )}
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}

                {recipientType === "staff" && (
                  <CommandGroup heading={`Staff (${filteredStaff.length})`}>
                    {filteredStaff.map((staff) => (
                      <CommandItem
                        key={staff.id}
                        onSelect={() => handleSelectStaff(staff)}
                        className="cursor-pointer"
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm",
                                staff.staffType === "teaching"
                                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600"
                                  : "bg-purple-100 dark:bg-purple-900/30 text-purple-600",
                              )}
                            >
                              {staff.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium text-text-primary">
                                {staff.name}
                              </p>
                              <p className="text-xs text-text-muted">
                                {staff.designation}
                                {staff.subjects &&
                                  ` • ${staff.subjects.join(", ")}`}
                                {staff.role && ` • ${staff.role}`}
                              </p>
                            </div>
                          </div>
                          {isStaffSelected(staff.id) && (
                            <Check className="w-4 h-4 text-accent" />
                          )}
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </CommandList>

              {currentSelectionCount > 0 && (
                <div className="p-3 border-t border-border bg-surface/50 flex items-center justify-between">
                  <span className="text-sm text-text-muted">
                    {currentSelectionCount} selected
                  </span>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setSearchQuery("");
                    }}
                    className="px-4 py-1.5 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-dark"
                  >
                    Done
                  </button>
                </div>
              )}
            </Command>
          </div>
        </div>
      )}
    </div>
  );
}
