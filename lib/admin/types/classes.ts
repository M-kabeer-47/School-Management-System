export type ClassSectionData = {
  id: string; // "1-a"
  grade: string; // "Grade 1"
  section: string; // "A"
  classTeacher: {
    name: string;
    avatar?: string;
    id: string;
  };
  room: string;
  stats: {
    current: number;
    capacity: number;
    boys: number;
    girls: number;
  };
  colorTheme:
    | "blue"
    | "green"
    | "purple"
    | "orange"
    | "pink"
    | "teal"
    | "red"
    | "yellow"
    | "indigo"
    | "cyan"
    | "emerald"
    | "violet";
};
