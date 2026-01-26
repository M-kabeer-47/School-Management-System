import { ProfileData } from "@/lib/student/types/profile";

export const mockProfile: ProfileData = {
  student: {
    id: "STU-2026-001",
    name: "Ali Khan",
    class: "8",
    section: "A",
    rollNo: "15",
    dateOfBirth: "2012-05-15",
    gender: "Male",
    bloodGroup: "A+",
    photoUrl: "/student profile.avif",
  },
  father: {
    name: "Ahmed Khan",
    cnic: "35201-1234567-1",
    email: "ahmed.khan@email.com",
    phone: "+92 300 1234567",
    occupation: "Software Engineer",
  },
  mother: {
    name: "Fatima Khan",
    cnic: "35201-7654321-2",
    email: "fatima.khan@email.com",
    phone: "+92 301 7654321",
    occupation: "Teacher",
  },
  primaryContact: "father",
  address: {
    address: "123 Main Boulevard, Block C",
    city: "Lahore",
    state: "Punjab",
  },
  emergencyContact: "+92 300 1234567",
};
