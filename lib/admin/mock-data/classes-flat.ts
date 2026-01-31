import { ClassSectionData } from "@/lib/admin/types/classes";

export const classSections: ClassSectionData[] = [
  // Primary (1-5)
  {
    id: "g1-a",
    grade: "Grade 1",
    section: "A",
    classTeacher: {
      name: "Sarah Johnson",
      id: "ins-1",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    },
    room: "101",
    stats: { current: 28, capacity: 30, boys: 14, girls: 14 },
    colorTheme: "blue",
  },
  {
    id: "g1-b",
    grade: "Grade 1",
    section: "B",
    classTeacher: {
      name: "Michael Chen",
      id: "ins-2",
      avatar:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150",
    },
    room: "102",
    stats: { current: 25, capacity: 30, boys: 13, girls: 12 },
    colorTheme: "blue",
  },
  {
    id: "g2-a",
    grade: "Grade 2",
    section: "A",
    classTeacher: {
      name: "Emily Davis",
      id: "ins-3",
      avatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150",
    },
    room: "103",
    stats: { current: 30, capacity: 30, boys: 15, girls: 15 },
    colorTheme: "green",
  },
  {
    id: "g2-b",
    grade: "Grade 2",
    section: "B",
    classTeacher: {
      name: "Robert Wilson",
      id: "ins-4",
    },
    room: "104",
    stats: { current: 29, capacity: 30, boys: 14, girls: 15 },
    colorTheme: "green",
  },
  {
    id: "g3-a",
    grade: "Grade 3",
    section: "A",
    classTeacher: {
      name: "David Miller",
      id: "ins-6",
    },
    room: "201",
    stats: { current: 27, capacity: 30, boys: 13, girls: 14 },
    colorTheme: "purple",
  },
  {
    id: "g4-a",
    grade: "Grade 4",
    section: "A",
    classTeacher: {
      name: "Jessica Taylor",
      id: "ins-7",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150",
    },
    room: "202",
    stats: { current: 31, capacity: 35, boys: 16, girls: 15 },
    colorTheme: "orange",
  },
  {
    id: "g5-a",
    grade: "Grade 5",
    section: "A",
    classTeacher: {
      name: "Lisa Thomas",
      id: "ins-9",
    },
    room: "204",
    stats: { current: 25, capacity: 35, boys: 12, girls: 13 },
    colorTheme: "pink",
  },

  // Middle (6-8)
  {
    id: "g6-a",
    grade: "Grade 6",
    section: "A",
    classTeacher: {
      name: "James Wilson",
      id: "ins-10",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    },
    room: "301",
    stats: { current: 32, capacity: 35, boys: 16, girls: 16 },
    colorTheme: "teal",
  },
  {
    id: "g6-b",
    grade: "Grade 6",
    section: "B",
    classTeacher: {
      name: "Maria Garcia",
      id: "ins-11",
    },
    room: "302",
    stats: { current: 30, capacity: 35, boys: 15, girls: 15 },
    colorTheme: "teal",
  },
  {
    id: "g7-a",
    grade: "Grade 7",
    section: "A",
    classTeacher: {
      name: "Robert Martinez",
      id: "ins-12",
    },
    room: "303",
    stats: { current: 28, capacity: 35, boys: 14, girls: 14 },
    colorTheme: "indigo",
  },
  {
    id: "g8-a",
    grade: "Grade 8",
    section: "A",
    classTeacher: {
      name: "Patricia Brown",
      id: "ins-13",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
    },
    room: "304",
    stats: { current: 33, capacity: 35, boys: 17, girls: 16 },
    colorTheme: "cyan",
  },

  // Senior (9-10)
  {
    id: "g9-a",
    grade: "Grade 9",
    section: "A",
    classTeacher: {
      name: "Jennifer Lee",
      id: "ins-14",
    },
    room: "401",
    stats: { current: 20, capacity: 40, boys: 10, girls: 10 },
    colorTheme: "red",
  },
  {
    id: "g9-b",
    grade: "Grade 9",
    section: "B",
    classTeacher: {
      name: "William Turner",
      id: "ins-15",
    },
    room: "402",
    stats: { current: 22, capacity: 40, boys: 11, girls: 11 },
    colorTheme: "red",
  },
  {
    id: "g10-a",
    grade: "Grade 10",
    section: "A",
    classTeacher: {
      name: "Elizabeth Scott",
      id: "ins-16",
      avatar:
        "https://images.unsplash.com/photo-1554151228-14d9def656ec?auto=format&fit=crop&q=80&w=150",
    },
    room: "403",
    stats: { current: 35, capacity: 40, boys: 18, girls: 17 },
    colorTheme: "yellow",
  },

  // Higher Secondary (11-12)
  {
    id: "g11-sci",
    grade: "Grade 11",
    section: "Pre-Med",
    classTeacher: {
      name: "Dr. Alan Grant",
      id: "ins-17",
    },
    room: "501",
    stats: { current: 40, capacity: 50, boys: 20, girls: 20 },
    colorTheme: "emerald",
  },
  {
    id: "g11-eng",
    grade: "Grade 11",
    section: "Pre-Eng",
    classTeacher: {
      name: "Sarah Connor",
      id: "ins-18",
    },
    room: "502",
    stats: { current: 42, capacity: 50, boys: 30, girls: 12 },
    colorTheme: "emerald",
  },
  {
    id: "g12-sci",
    grade: "Grade 12",
    section: "Pre-Med",
    classTeacher: {
      name: "Ian Malcolm",
      id: "ins-19",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150",
    },
    room: "503",
    stats: { current: 38, capacity: 50, boys: 18, girls: 20 },
    colorTheme: "violet",
  },
  {
    id: "g12-eng",
    grade: "Grade 12",
    section: "Pre-Eng",
    classTeacher: {
      name: "Ellen Ripley",
      id: "ins-20",
    },
    room: "504",
    stats: { current: 45, capacity: 50, boys: 25, girls: 20 },
    colorTheme: "violet",
  },
];
