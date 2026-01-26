export interface StudentInfo {
    id: string;
    name: string;
    class: string;
    section: string;
    rollNo: string;
    dateOfBirth: string;
    gender: string;
    bloodGroup: string;
    photoUrl?: string;
}

export interface ParentInfo {
    name: string;
    cnic: string;
    email: string;
    phone: string;
    occupation?: string;
}

export interface ProfileData {
    student: StudentInfo;
    father: ParentInfo;
    mother: ParentInfo;
    primaryContact: "father" | "mother";
    address: {
        address: string;
        city: string;
        state: string;
    };
    emergencyContact?: string;
}
