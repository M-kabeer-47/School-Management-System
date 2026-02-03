import { RoomMapping } from "../types/room-mapping";
import { SCHOOL_LEVELS } from "../constants/school-levels";

// Helper to generate a room mapping
const createRoom = (
  grade: string,
  section: string,
  level: (typeof SCHOOL_LEVELS)[number]["id"],
  roomNumber: string,
  capacity: number,
): RoomMapping => ({
  id: `map-${grade}-${section}`,
  classId: `class-${grade}-${section}`,
  grade,
  section,
  sectionLevel: level,
  roomId: `room-${roomNumber}`,
  roomName: `Room ${roomNumber}`,
  isClassroom: true,
  capacity,
  examCapacity: Math.floor(capacity * 0.6), // Default exam capacity estimation
});

export const MOCK_ROOM_MAPPINGS: RoomMapping[] = [
  // ECE Section (Ground Floor)
  createRoom("Nursery", "A", "ECE", "G-01", 25),
  createRoom("Nursery", "B", "ECE", "G-02", 25),
  createRoom("Nursery", "C", "ECE", "G-03", 25),
  createRoom("Nursery", "D", "ECE", "G-04", 25),

  createRoom("KG", "A", "ECE", "G-05", 30),
  createRoom("KG", "B", "ECE", "G-06", 30),
  createRoom("KG", "C", "ECE", "G-07", 30),
  createRoom("KG", "D", "ECE", "G-08", 30),

  createRoom("1", "A", "ECE", "G-09", 30),
  createRoom("1", "B", "ECE", "G-10", 30),
  createRoom("1", "C", "ECE", "G-11", 30),
  createRoom("1", "D", "ECE", "G-12", 30),
  createRoom("1", "E", "ECE", "G-13", 30),

  createRoom("2", "A", "ECE", "G-14", 30),
  createRoom("2", "B", "ECE", "G-15", 30),
  createRoom("2", "C", "ECE", "G-16", 30),

  // Junior Section (1st Floor)
  createRoom("3", "A", "JUNIOR", "1-01", 35),
  createRoom("3", "B", "JUNIOR", "1-02", 35),
  createRoom("3", "C", "JUNIOR", "1-03", 35),
  createRoom("3", "D", "JUNIOR", "1-04", 35),
  createRoom("3", "E", "JUNIOR", "1-05", 35),

  createRoom("4", "A", "JUNIOR", "1-06", 35),
  createRoom("4", "B", "JUNIOR", "1-07", 35),
  createRoom("4", "C", "JUNIOR", "1-08", 35),
  createRoom("4", "D", "JUNIOR", "1-09", 35),
  createRoom("4", "E", "JUNIOR", "1-10", 35),

  createRoom("5", "A", "JUNIOR", "1-11", 35),
  createRoom("5", "B", "JUNIOR", "1-12", 35),
  createRoom("5", "C", "JUNIOR", "1-13", 35),
  createRoom("5", "D", "JUNIOR", "1-14", 35),

  // Middle Section (2nd Floor)
  createRoom("6", "A", "MIDDLE", "2-01", 40),
  createRoom("6", "B", "MIDDLE", "2-02", 40),
  createRoom("6", "C", "MIDDLE", "2-03", 40),
  createRoom("6", "D", "MIDDLE", "2-04", 40),
  createRoom("6", "E", "MIDDLE", "2-05", 40),

  createRoom("7", "A", "MIDDLE", "2-06", 40),
  createRoom("7", "B", "MIDDLE", "2-07", 40),
  createRoom("7", "C", "MIDDLE", "2-08", 40),
  createRoom("7", "D", "MIDDLE", "2-09", 40),

  createRoom("8", "A", "MIDDLE", "2-10", 40),
  createRoom("8", "B", "MIDDLE", "2-11", 40),
  createRoom("8", "C", "MIDDLE", "2-12", 40),
  createRoom("8", "D", "MIDDLE", "2-13", 40),
  createRoom("8", "E", "MIDDLE", "2-14", 40),

  // Senior Section (3rd Floor)
  createRoom("9", "A", "SENIOR", "3-01", 45),
  createRoom("9", "B", "SENIOR", "3-02", 45),
  createRoom("9", "C", "SENIOR", "3-03", 45),
  createRoom("9", "D", "SENIOR", "3-04", 45),
  createRoom("9", "E", "SENIOR", "3-05", 45),
  createRoom("9", "F", "SENIOR", "3-06", 45),

  createRoom("10", "A", "SENIOR", "3-07", 45),
  createRoom("10", "B", "SENIOR", "3-08", 45),
  createRoom("10", "C", "SENIOR", "3-09", 45),
  createRoom("10", "D", "SENIOR", "3-10", 45),
  createRoom("10", "E", "SENIOR", "3-11", 45),

  createRoom("11", "A", "SENIOR", "3-12", 40),
  createRoom("11", "B", "SENIOR", "3-13", 40),
  createRoom("11", "C", "SENIOR", "3-14", 40),

  createRoom("12", "A", "SENIOR", "3-15", 40),
  createRoom("12", "B", "SENIOR", "3-16", 40),
  createRoom("12", "C", "SENIOR", "3-17", 40),
  createRoom("12", "D", "SENIOR", "3-18", 40),
];
