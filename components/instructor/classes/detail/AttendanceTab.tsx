import DateTimePicker from "@/components/ui/DateTimePicker";
import { AttendanceHistoryTable } from "./AttendanceHistoryTable";
import { useState } from "react";
import { AttendanceRecord } from "@/lib/instructor/types/class-detail";

interface AttendanceTabProps {
  attendanceHistory: AttendanceRecord[];
}
export const AttendanceTab = ({ attendanceHistory }: AttendanceTabProps) => {
  const [selectedDate, setSelectedDate] = useState<string>("");

  const filteredHistory = attendanceHistory.filter((record) => {
    if (!selectedDate) return true;
    const recordDate = new Date(record.date).toDateString();
    const filterDate = new Date(selectedDate).toDateString();
    return recordDate === filterDate;
  });

  return (
    <div className="space-y-6">
      {/* Filters & Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <h3 className="text-lg font-bold font-heading text-text-primary mb-2 sm:mb-0">
          Attendance History
        </h3>
        <div className="w-full sm:w-72">
          <label className="text-sm font-medium text-text-secondary mb-1.5 block">
            Filter by Date
          </label>
          <DateTimePicker
            value={selectedDate}
            onChange={setSelectedDate}
            placeholder="All Dates"
            showTime={false}
          />
        </div>
      </div>

      {/* Modular History Table */}
      <AttendanceHistoryTable history={filteredHistory} />
    </div>
  );
};
