"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { UserCog, Check } from "lucide-react";
import {
  Table,
  TableHeader,
  TableHeadRow,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/Command";
import { teachers } from "@/lib/admin/mock-data/teachers";

interface SubjectMapping {
  id: string;
  subjectName: string;
  teacherName: string;
  teacherId: string;
  classesPerWeek: number;
  syllabusUrl?: string;
}

interface ClassSubjectsTabProps {
  subjects: SubjectMapping[];
}

export const ClassSubjectsTab = ({
  subjects: initialSubjects,
}: ClassSubjectsTabProps) => {
  const [subjects, setSubjects] = useState(initialSubjects);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(
    null,
  );

  const handleOpenPalette = (subjectId: string) => {
    setSelectedSubjectId(subjectId);
    setIsPaletteOpen(true);
  };

  const handleTeacherChange = (teacherId: string) => {
    if (!selectedSubjectId) return;

    const selectedTeacher = teachers.find((t) => t.id === teacherId);
    if (!selectedTeacher) return;

    setSubjects((prev) =>
      prev.map((s) =>
        s.id === selectedSubjectId
          ? {
              ...s,
              teacherId: selectedTeacher.id,
              teacherName: selectedTeacher.name,
            }
          : s,
      ),
    );
    setIsPaletteOpen(false);
    setSelectedSubjectId(null);
  };

  const selectedSubject = subjects.find((s) => s.id === selectedSubjectId);

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Table>
          <TableHeader>
            <TableHeadRow>
              <TableHead>Subject</TableHead>
              <TableHead>Teacher</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableHeadRow>
          </TableHeader>
          <TableBody>
            {subjects.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  {item.subjectName}
                </TableCell>
                <TableCell className="text-text-secondary">
                  <div className="flex items-center gap-2">
                    {item.teacherName}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleOpenPalette(item.id)}
                    className="text-accent hover:text-accent hover:bg-accent/5 transition-colors gap-2"
                  >
                    <UserCog className="w-4 h-4" />
                    Change
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.div>

      {/* Shadcn Command Palette */}
      <CommandDialog open={isPaletteOpen} onOpenChange={setIsPaletteOpen}>
        <CommandInput placeholder="Type a name or department to search..." />
        <CommandList className="custom-scrollbar">
          <CommandEmpty>No teachers found.</CommandEmpty>
          <CommandGroup
            heading={`Teachers for ${selectedSubject?.subjectName}`}
          >
            {teachers.map((teacher) => (
              <CommandItem
                key={teacher.id}
                onSelect={() => handleTeacherChange(teacher.id)}
                className="flex items-center justify-between group"
              >
                <div className="flex items-center gap-4 py-0.5">
                  <div className="w-9 h-9 rounded-full bg-surface-active flex items-center justify-center text-accent font-bold overflow-hidden border border-border group-data-[selected=true]:border-accent/40 transition-colors shrink-0">
                    {teacher.avatar ? (
                      <img
                        src={teacher.avatar}
                        alt={teacher.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      teacher.name.charAt(0)
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-text-primary">
                      {teacher.name}
                    </span>
                    <span className="text-[10px] text-text-muted uppercase tracking-widest font-semibold">
                      {teacher.department}
                    </span>
                  </div>
                </div>

                {selectedSubject?.teacherId === teacher.id && (
                  <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center text-accent border border-accent/20">
                    <Check className="w-3 h-3" />
                  </div>
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
};
