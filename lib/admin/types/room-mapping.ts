import { SchoolLevelId } from "../constants/school-levels";

export interface RoomMapping {
  id: string;
  classId: string; // Unique identifier for the class-section pair (e.g., "class-10-A")
  grade: string; // e.g., "10"
  section: string; // e.g., "A"
  sectionLevel: SchoolLevelId;

  // Room Details
  roomId: string; // Unique identifier for the physical room
  roomName: string; // e.g., "Room 101 - Senior Block"
  floor?: string; // e.g., "Ground Floor"

  // Usage Configuration
  isClassroom: boolean; // TRUE if the daily classroom is used; FALSE if it's a special hall

  // Capacity Details
  capacity: number; // Standard seating capacity
  examCapacity?: number; // Spaced out seating capacity for exams (usually 50-60% of standard)
}
