export type AttendanceStatus = "Present" | "Absent" | "Leave" | "Holiday";

export interface AttendanceRecord {
  id: string;
  date: Date;
  status: AttendanceStatus;
  reason?: string; // For absent/leave
  checkIn?: string; // Optional time eg "07:55 AM"
}

export interface AttendanceStats {
  present: number;
  absent: number;
  holiday: number;
  leave: number;
  totalDays: number;
  attendancePercentage: number;
}
