import { Student } from "@/lib/admin/types/student";

// Deterministic seed-based random function for consistent server/client rendering
const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const firstNames = [
  "Ahmed",
  "Fatima",
  "Muhammad",
  "Aisha",
  "Omar",
  "Khadija",
  "Ali",
  "Zainab",
  "Hassan",
  "Mariam",
  "Bilal",
  "Sakina",
  "Umar",
  "Hajar",
  "Abdullah",
  "Amina",
  "Yusuf",
  "Zahra",
  "Ibrahim",
  "Ruqayyah",
  "Khalid",
  "Asma",
  "Talha",
  "Hafsa",
  "Zubair",
  "Sumayyah",
  "Saad",
  "Khansa",
  "Abu Bakr",
  "Sawda",
];

const lastNames = [
  "Khan",
  "Ali",
  "Ahmed",
  "Mohammad",
  "Hussain",
  "Hasan",
  "Malik",
  "Siddiqui",
  "Farooq",
  "Usmani",
  "Qureshi",
  "Butt",
  "Raza",
  "Gilani",
  "Bukhari",
  "Naqvi",
  "Zaidi",
  "Rizvi",
  "Abidi",
  "Haider",
  "Jafri",
  "Taqui",
  "Naqvi",
  "Kazmi",
  "Zaidi",
  "Rizvi",
  "Abidi",
  "Haider",
  "Jafri",
  "Taqui",
];

const classes = ["1", "2", "3", "4", "5", "6", "7", "8"];
const sections = ["A", "B", "C"];
const regions = ["North", "South", "East", "West", "Central"];
const statuses = ["Active", "Inactive", "Graduated", "Transferred"] as const;
const nationalities = ["Pakistani", "Pakistani", "Pakistani", "Pakistani", "Afghan", "Pakistani", "Pakistani", "Pakistani"];
const religions = ["Islam", "Islam", "Islam", "Islam", "Islam", "Christianity", "Islam", "Hinduism"];

const generateStudent = (index: number): Student => {
  const firstName = firstNames[(seededRandom(index) * firstNames.length) | 0];
  const lastName =
    lastNames[(seededRandom(index + 100) * lastNames.length) | 0];
  const studentName = `${firstName} ${lastName}`;
  const fatherName = `${firstNames[(seededRandom(index + 200) * firstNames.length) | 0]} ${lastName}`;

  const admissionDate = new Date(
    2020 + seededRandom(index) * 4,
    seededRandom(index + 1) * 12,
    seededRandom(index + 2) * 28 + 1,
  );
  const birthDate = new Date(
    2012 + seededRandom(index + 3) * 8,
    seededRandom(index + 4) * 12,
    seededRandom(index + 5) * 28 + 1,
  );

  const isTransfer = seededRandom(index + 30) > 0.8;
  const fatherCnic = `${String((seededRandom(index + 8) * 99999 + 10000) | 0)}-${String((seededRandom(index + 9) * 9999999 + 1000000) | 0)}-${seededRandom(index + 10) > 0.5 ? "1" : "2"}`;

  return {
    id: `student-${index + 1}`,
    admissionNo: `ADM${String(index + 1).padStart(6, "0")}`,
    registrationCode: `REG${String(index + 1000).padStart(6, "0")}`,
    registrationDate: admissionDate.toISOString().split("T")[0],
    studentName,
    fatherName,
    dateOfBirth: birthDate.toISOString().split("T")[0],
    phoneNo: `0${(300 + seededRandom(index + 6) * 100) | 0}${String((seededRandom(index + 7) * 10000000) | 0).padStart(7, "0")}`,
    fatherNicNo: fatherCnic,
    monthlyFee: (2000 + seededRandom(index + 11) * 8000) | 0,
    gender: seededRandom(index + 12) > 0.5 ? "Male" : "Female",
    region: regions[(seededRandom(index + 13) * regions.length) | 0],
    fatherWhatsapp: `0${(300 + seededRandom(index + 14) * 100) | 0}${String((seededRandom(index + 15) * 10000000) | 0).padStart(7, "0")}`,
    studentWhatsapp: `0${(300 + seededRandom(index + 16) * 100) | 0}${String((seededRandom(index + 17) * 10000000) | 0).padStart(7, "0")}`,
    presentAddress: `House ${(seededRandom(index + 18) * 999 + 1) | 0}, Street ${(seededRandom(index + 19) * 50 + 1) | 0}, ${regions[(seededRandom(index + 20) * regions.length) | 0]} Zone`,
    reference: `Parent Ref: ${firstNames[(seededRandom(index + 21) * firstNames.length) | 0]} ${lastNames[(seededRandom(index + 22) * lastNames.length) | 0]}`,
    studentEmail: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${index + 1}@school.edu`,
    fatherEmail: `father.${firstName.toLowerCase()}.${index + 1}@school.edu`,
    class: classes[(seededRandom(index + 23) * classes.length) | 0],
    section: sections[(seededRandom(index + 24) * sections.length) | 0],
    status:
      index < 150
        ? "Active"
        : (statuses[
            (seededRandom(index + 25) * statuses.length) | 0
          ] as Student["status"]),

    // New fields
    nationality: nationalities[(seededRandom(index + 26) * nationalities.length) | 0],
    religion: religions[(seededRandom(index + 27) * religions.length) | 0],
    bFormNo: `${String((seededRandom(index + 28) * 99999 + 10000) | 0)}-${String((seededRandom(index + 29) * 9999999 + 1000000) | 0)}-${seededRandom(index + 10) > 0.5 ? "1" : "2"}`,
    isTransfer,
    previousSchool: isTransfer
      ? ["City Grammar School", "Al-Huda Academy", "Pak Model School", "Green Valley School", "Scholars Academy"][
          (seededRandom(index + 31) * 5) | 0
        ]
      : undefined,
    previousClass: isTransfer
      ? classes[(seededRandom(index + 32) * classes.length) | 0]
      : undefined,
    reasonForLeaving: isTransfer
      ? ["Family relocation", "Seeking better education", "Transfer of father's job", "Financial reasons", "Closer to home"][
          (seededRandom(index + 33) * 5) | 0
        ]
      : undefined,
    documents: [],
    siblingIds: [],
    hasSiblingDiscount: false,
  };
};

export const generateStudentsData = (count: number = 200): Student[] => {
  return Array.from({ length: count }, (_, index) => generateStudent(index));
};

export const allStudents = generateStudentsData(200);

export const getUniqueClasses = (): string[] => {
  return [...new Set(allStudents.map((student) => student.class))].sort(
    (a, b) => parseInt(a) - parseInt(b),
  );
};

export const getUniqueSections = (): string[] => {
  return [...new Set(allStudents.map((student) => student.section))].sort();
};
