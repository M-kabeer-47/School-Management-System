export type Section = {
  id: string;
  name: string;
  studentCount: number;
  capacity: number;
  classTeacher: string;
  classTeacherId: string;
};

export type ClassGrade = {
  id: string;
  name: string;
  order: number;
  sections: Section[];
};

export const allClasses: ClassGrade[] = [
  {
    id: "grade-1",
    name: "Grade 1",
    order: 1,
    sections: [
      {
        id: "g1-a",
        name: "A",
        studentCount: 28,
        capacity: 30,
        classTeacher: "Sarah Johnson",
        classTeacherId: "ins-1",
      },
      {
        id: "g1-b",
        name: "B",
        studentCount: 25,
        capacity: 30,
        classTeacher: "Michael Chen",
        classTeacherId: "ins-2",
      },
    ],
  },
  {
    id: "grade-2",
    name: "Grade 2",
    order: 2,
    sections: [
      {
        id: "g2-a",
        name: "A",
        studentCount: 30,
        capacity: 30,
        classTeacher: "Emily Davis",
        classTeacherId: "ins-3",
      },
      {
        id: "g2-b",
        name: "B",
        studentCount: 29,
        capacity: 30,
        classTeacher: "Robert Wilson",
        classTeacherId: "ins-4",
      },
      {
        id: "g2-c",
        name: "C",
        studentCount: 20,
        capacity: 30,
        classTeacher: "Jennifer Brown",
        classTeacherId: "ins-5",
      },
    ],
  },
  {
    id: "grade-3",
    name: "Grade 3",
    order: 3,
    sections: [
      {
        id: "g3-a",
        name: "A",
        studentCount: 27,
        capacity: 30,
        classTeacher: "David Miller",
        classTeacherId: "ins-6",
      },
    ],
  },
  {
    id: "grade-4",
    name: "Grade 4",
    order: 4,
    sections: [
      {
        id: "g4-a",
        name: "A",
        studentCount: 31,
        capacity: 35,
        classTeacher: "Jessica Taylor",
        classTeacherId: "ins-7",
      },
      {
        id: "g4-b",
        name: "B",
        studentCount: 33,
        capacity: 35,
        classTeacher: "Thomas Anderson",
        classTeacherId: "ins-8",
      },
    ],
  },
  {
    id: "grade-5",
    name: "Grade 5",
    order: 5,
    sections: [
      {
        id: "g5-a",
        name: "A",
        studentCount: 25,
        capacity: 35,
        classTeacher: "Lisa Thomas",
        classTeacherId: "ins-9",
      },
    ],
  },
];
