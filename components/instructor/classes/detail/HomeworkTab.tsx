"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  BookOpen,
  Calendar,
  Clock,
  Edit2,
  PlayCircle,
  MoreVertical,
} from "lucide-react";
import { cn } from "@/lib/common/utils";
import { Homework } from "@/lib/instructor/types/class-detail";
import {
  Table,
  TableHeader,
  TableHeadRow,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/Table";
import Link from "next/link";
import { useParams } from "next/navigation";
import EditHomeworkModal from "@/components/instructor/classes/homework/EditHomeworkModal";

interface HomeworkTabProps {
  homeworks: Homework[];
}

export const HomeworkTab = ({ homeworks }: HomeworkTabProps) => {
  const params = useParams();
  const classId = params.id as string;
  const [editingHomework, setEditingHomework] = useState<Homework | null>(null);

  const handleSaveHomework = (id: string, updates: Partial<Homework>) => {
    // In a real app, this would call an API
    console.log("Saving homework updates:", id, updates);
    // Optimistic update logic would go here
  };

  return (
    <div className="space-y-6">
      <EditHomeworkModal
        isOpen={!!editingHomework}
        onClose={() => setEditingHomework(null)}
        onSave={handleSaveHomework}
        homework={editingHomework}
      />

      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="text-xl font-bold font-heading text-text-primary">
          Class Homework
        </h3>
        <span className="text-sm text-text-muted bg-surface px-3 py-1 rounded-full border border-border">
          Total: {homeworks.length}
        </span>
      </div>

      {/* Homework List Table */}
      <div className="bg-surface rounded-2xl border border-border overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableHeadRow>
              <TableHead className="w-[40%]">Description</TableHead>
              <TableHead className="w-[20%]">Deadline</TableHead>
              <TableHead className="w-[20%]">Status</TableHead>
              <TableHead className="w-[20%] text-right">Actions</TableHead>
            </TableHeadRow>
          </TableHeader>
          <TableBody>
            {homeworks.length > 0 ? (
              homeworks.map((hw) => (
                <TableRow
                  key={hw.id}
                  className="hover:bg-surface-hover/50 transition-colors"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <span
                        className="font-medium text-text-primary line-clamp-1"
                        title={hw.description}
                      >
                        {hw.description}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2 text-text-secondary text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {hw.deadline.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <span
                      className={cn(
                        "inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-bold border capitalize w-[90px]",
                        hw.status === "active"
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : "bg-green-50 text-green-700 border-green-200",
                      )}
                    >
                      {hw.status}
                    </span>
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setEditingHomework(hw)}
                        className="text-text-muted hover:text-text-primary hover:bg-surface-active"
                      >
                        Edit
                      </Button>
                      <Link
                        href={`/instructor/classes/${classId}/homework/${hw.id}`}
                      >
                        <Button
                          size="sm"
                          className="bg-accent/10 hover:bg-accent/20 text-accent border border-accent/20 shadow-none"
                        >
                          <span className="font-bold text-xs">Review</span>
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-48 text-center">
                  <div className="flex flex-col items-center justify-center text-text-muted">
                    <BookOpen className="w-10 h-10 mb-3 opacity-20" />
                    <p className="font-medium">No homework assigned yet</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
