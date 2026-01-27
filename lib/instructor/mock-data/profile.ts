import { InstructorProfileData } from "@/lib/instructor/types/profile";

export const mockInstructorProfile: InstructorProfileData = {
    instructor: {
        id: "INS-2024-001",
        name: "Sarah Johnson",
        designation: "Senior Mathematics Teacher",
        department: "Mathematics",
        employeeCode: "EMP-1042",
        dateOfBirth: "1985-08-22",
        gender: "Female",
        bloodGroup: "B+",
        joiningDate: "2018-03-15",
        qualification: "M.Sc. Mathematics, B.Ed",
        experience: "8 Years",
        photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
    },
    contact: {
        email: "sarah.johnson@school.edu.pk",
        phone: "+92 321 1234567",
        whatsapp: "+92 321 1234567",
    },
    address: {
        address: "45 Teachers Colony, Block D",
        city: "Lahore",
        state: "Punjab",
    },
    emergencyContact: "+92 300 9876543",
};
