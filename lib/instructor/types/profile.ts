export interface InstructorInfo {
    id: string;
    name: string;
    designation: string;
    department: string;
    employeeCode: string;
    dateOfBirth: string;
    gender: string;
    bloodGroup: string;
    joiningDate: string;
    qualification: string;
    experience: string;
    photoUrl?: string;
}

export interface InstructorProfileData {
    instructor: InstructorInfo;
    contact: {
        email: string;
        phone: string;
        whatsapp?: string;
    };
    address: {
        address: string;
        city: string;
        state: string;
    };
    emergencyContact?: string;
}
