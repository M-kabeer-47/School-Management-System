export interface Teacher {
  id: string;
  name: string;
  avatarUrl?: string;
}

export interface Subject {
  id: string;
  name: string;
  nameUrdu?: string;
  teacher: Teacher;
  syllabusUrl?: string;
}
