import {
  AttendanceRecord,
  AttendanceStats,
  AttendanceStatus,
} from "@/lib/student/types/attendance";
import { addDays, subDays, isWeekend } from "date-fns";

// Deterministic seed-based random function for consistent server/client rendering
const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

export const generateAttendanceData = (): AttendanceRecord[] => {
  const records: AttendanceRecord[] = [];
  // FIX: Use a fixed date to prevent hydration mismatches between Server and Client
  const today = new Date("2026-01-30T12:00:00");
  const startDate = subDays(today, 120);

  let currentDate = startDate;
  let dayIndex = 0;

  while (currentDate <= today) {
    if (!isWeekend(currentDate)) {
      const rand = seededRandom(dayIndex);
      let status: AttendanceStatus = "Present";
      let reason: string | undefined = undefined;
      let checkIn: string | undefined = "07:55 AM";

      if (rand > 0.95) {
        status = "Absent";
        reason = "Fever / Sick Leave";
        checkIn = undefined;
      } else if (rand > 0.9) {
        // Was Late, now Holiday for demo purposes as per user request
        status = "Holiday";
        reason = "Public Holiday";
        checkIn = undefined;
      } else if (rand > 0.88) {
        status = "Leave";
        reason = "Family Wedding";
        checkIn = undefined;
      }

      records.push({
        id: currentDate.toISOString(),
        date: new Date(currentDate),
        status,
        reason,
        checkIn,
      });
    }
    currentDate = addDays(currentDate, 1);
    dayIndex++;
  }
  return records;
};

export const allRecords = generateAttendanceData();

export const calculateStats = (
  records: AttendanceRecord[],
): AttendanceStats => {
  const total = records.length;
  const present = records.filter((r) => r.status === "Present").length;
  const absent = records.filter((r) => r.status === "Absent").length;
  const holiday = records.filter((r) => r.status === "Holiday").length;
  const leave = records.filter((r) => r.status === "Leave").length;

  return {
    present,
    absent,
    holiday,
    leave,
    totalDays: total,
    attendancePercentage: Math.round(((present + holiday) / total) * 100), // Counting holidays as attended?? Or just ignoring? Usually present / (total - holidays). But let's keep simple logic for now: (Present / Total) * 100 or maybe (Present + Holiday) / Total. User didn't specify calc logic, just "no late". I'll stick to mostly present for the percentage.
  };
};

export const stats = calculateStats(allRecords);
