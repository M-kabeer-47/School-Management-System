"use client";

import {
  Table,
  TableHeader,
  TableHeadRow,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/Table";
import { ClassGrade, Section } from "@/lib/admin/mock-data/classes";
import { Edit2, Trash2, Plus, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ClassesTableProps {
  classes: ClassGrade[];
  onEditClass: (cls: ClassGrade) => void;
  onEditSection: (cls: ClassGrade, section: Section) => void;
  onAddSection: (cls: ClassGrade) => void;
  onDeleteClass: (cls: ClassGrade) => void;
}

export function ClassesTable({
  classes,
  onEditClass,
  onEditSection,
  onAddSection,
  onDeleteClass,
}: ClassesTableProps) {
  return (
    <div className="bg-surface border border-border rounded-2xl shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableHeadRow>
            <TableHead>Class Name</TableHead>
            <TableHead>Sections</TableHead>
            <TableHead>Total Students</TableHead>
            <TableHead>Class Teachers</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableHeadRow>
        </TableHeader>
        <TableBody>
          {classes.map((cls) => {
            const totalStudents = cls.sections.reduce(
              (acc, sec) => acc + sec.studentCount,
              0,
            );

            return (
              <TableRow key={cls.id} isClickable={false}>
                <TableCell>
                  <div className="font-medium text-text-primary text-lg">
                    {cls.name}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    {cls.sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => onEditSection(cls, section)}
                        className="px-2.5 py-1 rounded-md bg-accent/10 border border-accent/20 text-accent text-sm font-medium hover:bg-accent/20 transition-colors flex items-center gap-1.5"
                        title={`Teacher: ${section.classTeacher}, Students: ${section.studentCount}`}
                      >
                        {section.name}
                        <span className="text-xs opacity-70 border-l border-accent/30 pl-1.5 ml-0.5">
                          {section.studentCount}
                        </span>
                      </button>
                    ))}
                    <button
                      onClick={() => onAddSection(cls)}
                      className="px-2 py-1 rounded-md border border-dashed border-border text-text-secondary hover:border-accent hover:text-accent hover:bg-accent/5 transition-colors"
                      title="Add Section"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Users className="w-4 h-4" />
                    <span className="font-medium text-text-primary">
                      {totalStudents}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    {cls.sections.map((sec) => (
                      <div key={sec.id} className="text-xs text-text-secondary">
                        <span className="font-medium text-text-primary w-4 inline-block">
                          {sec.name}:
                        </span>{" "}
                        {sec.classTeacher}
                      </div>
                    ))}
                    {cls.sections.length === 0 && (
                      <span className="text-xs text-text-muted italic">
                        No sections
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditClass(cls)}
                      className="h-8 w-8 p-0 text-text-secondary hover:text-accent"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeleteClass(cls)}
                      className="h-8 w-8 p-0 text-text-secondary hover:text-error hover:bg-error/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
