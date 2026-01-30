"use client";

import { Button } from "@/components/ui/Button";
import { ClassDetailData } from "@/lib/instructor/types/class-detail";
import {
  Users,
  BookOpen,
  Clock,
  CalendarCheck,
  PlusCircle,
  Printer,
} from "lucide-react";
import Link from "next/link";

interface ClassHeaderProps {
  classData: ClassDetailData;
  onAddHomework: () => void;
  onPrintAttendance: () => void;
}

export const ClassHeader = ({
  classData,
  onAddHomework,
  onPrintAttendance,
}: ClassHeaderProps) => {
  return (
    <div className="relative overflow-hidden rounded-3xl mb-6">
      {/* Premium Gradient Background - Static */}
      <div className="absolute inset-0 bg-accent-gradient" />

      {/* Content Container */}
      <div className="relative px-4 py-6 md:px-6 z-10">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          {/* Title & Info */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/20 text-white border border-white/20 text-sm font-medium uppercase tracking-wider backdrop-blur-md">
                {classData.name} {/* Subject Name as Badge/Subtitle */}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold font-heading text-white tracking-tight leading-tight mb-2">
              {classData.grade} - {classData.section}{" "}
              {/* Class Info as Main Title */}
            </h1>
            <p className="text-white/80 text-base md:text-lg">
              Total Students:{" "}
              <span className="font-bold text-white">
                {classData.totalStudents}
              </span>
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/instructor/classes/${classData.id}/attendance`}
              className="flex items-center"
            >
              <Button
                variant={"secondary"}
                size={"lg"}
                className="font-semibold rounded-xl min-w-[180px]"
              >
                <CalendarCheck className="w-5 h-5" />
                <span>Take Attendance</span>
              </Button>
            </Link>
            <Button
              onClick={onAddHomework}
              className="flex items-center min-w-[180px] bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 active:scale-95 transition-all backdrop-blur-md"
              size={"lg"}
            >
              <PlusCircle className="w-5 h-5" />
              <span>Add Homework</span>
            </Button>
            <Button
              onClick={onPrintAttendance}
              className="flex items-center min-w-[180px] bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 active:scale-95 transition-all backdrop-blur-md"
              size={"lg"}
            >
              <Printer className="w-5 h-5" />
              <span>Print Attendance</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
