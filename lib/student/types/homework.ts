export type HomeworkStatus = "Not checked" | "Checked";

export interface Homework {
  id: string;
  subject: string;
  description: string; // Can be long, will wrap to multiple lines
  givenOn: string; // Human-readable: "Jan 20, 2026"
  toBeCheckedOn: string; // Human-readable: "Jan 22, 2026"
  status: HomeworkStatus;
}
