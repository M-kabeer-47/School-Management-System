import { Subject } from "./subjects";

// Topic status - only these three states
export type TopicStatus = "Not started" | "In progress" | "Completed";

// Topic with only name and status (as per requirements)
export interface Topic {
  name: string;
  status: TopicStatus;
}

// Unit grouping for topics (optional grouping)
export interface TopicUnit {
  unitName: string;
  topics: Topic[];
}

// Material file types
export type MaterialFileType = "pdf" | "video" | "slides";

// Learning material
export interface Material {
  id: string;
  name: string;
  fileType: MaterialFileType;
  downloadUrl: string;
}

// Test record
export interface Test {
  id: string;
  name: string;
  date: string;
  result: string;
}

// Subject detail extending base Subject
export interface SubjectDetail extends Subject {
  grade: string;
  section?: string; // Optional section (e.g., "A", "B", "C")
  term: string;
  syllabusPdfUrl: string;
  topicUnits: TopicUnit[];
  materials: Material[];
  tests: Test[];
}

// Tab types for navigation
export type SubjectDetailTab = "topics" | "materials" | "tests";
