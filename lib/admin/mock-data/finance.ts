import {
  FeeChallan,
  FeeDefaulter,
  DiscountedStudent,
  ClassFeeCollection,
  FeeStructure,
  FeeDiscount,
  FeePayment,
  Expense,
  StudentFeeRecord,
  ChallanData,
  BulkGenerationConfig,
  BulkGenerationPreview,
} from "@/lib/admin/types/finance";
import { allStudents } from "./students";
import { feeHeads, feeConcessions, classGroups } from "./settings";

// Fee Structures by Class (aligned with feeHeads + group-based amounts)
export const feeStructures: FeeStructure[] = [
  {
    id: "fs-1",
    className: "1",
    academicYear: "2025-2026",
    items: [
      { id: "f1", name: "Tuition Fee", amount: 3000 },
      { id: "f2", name: "Sports Fee", amount: 1000 },
    ],
    totalAmount: 4000,
  },
  {
    id: "fs-2",
    className: "5",
    academicYear: "2025-2026",
    items: [
      { id: "f1", name: "Tuition Fee", amount: 4000 },
      { id: "f2", name: "Computer Lab Fee", amount: 400 },
      { id: "f3", name: "Sports Fee", amount: 1000 },
    ],
    totalAmount: 5400,
  },
  {
    id: "fs-3",
    className: "8",
    academicYear: "2025-2026",
    items: [
      { id: "f1", name: "Tuition Fee", amount: 5000 },
      { id: "f2", name: "Computer Lab Fee", amount: 600 },
      { id: "f3", name: "Science Lab Fee", amount: 500 },
      { id: "f4", name: "Sports Fee", amount: 1000 },
    ],
    totalAmount: 7100,
  },
];

// Available Discounts
export const feeDiscounts: FeeDiscount[] = [
  {
    id: "d1",
    name: "Sibling Discount",
    type: "percentage",
    value: 10,
    description: "10% off for siblings",
  },
  {
    id: "d2",
    name: "Staff Child",
    type: "percentage",
    value: 50,
    description: "50% off for staff children",
  },
  {
    id: "d3",
    name: "Merit Scholarship",
    type: "percentage",
    value: 25,
    description: "25% for merit students",
  },
  {
    id: "d4",
    name: "Need-based",
    type: "percentage",
    value: 30,
    description: "30% for financially weak",
  },
  {
    id: "d5",
    name: "Early Payment",
    type: "fixed",
    value: 200,
    description: "Rs. 200 off for early payment",
  },
];

// Sample Fee Challans
export const feeChallans: FeeChallan[] = [
  {
    id: "ch-001",
    challanNo: "CH-2026-001",
    studentId: "s1",
    studentName: "Ahmed Ali Khan",
    fatherName: "Imran Khan",
    class: "5",
    section: "A",
    admissionNo: "ADM-2024-0045",
    month: "January 2026",
    academicYear: "2025-2026",
    issueDate: "2026-01-01",
    dueDate: "2026-01-10",
    lineItems: [
      { id: "l1", name: "Tuition Fee", amount: 4000 },
      { id: "l2", name: "Computer Lab", amount: 600 },
      { id: "l3", name: "Library Fee", amount: 300 },
      { id: "l4", name: "Sports Fee", amount: 300 },
    ],
    totalAmount: 5200,
    discountAmount: 520,
    netAmount: 4680,
    status: "paid",
    paidAmount: 4680,
    paidDate: "2026-01-08",
    paymentMethod: "bank",
    receiptNo: "RCP-2026-001",
  },
  {
    id: "ch-002",
    challanNo: "CH-2026-002",
    studentId: "s2",
    studentName: "Fatima Zahra",
    fatherName: "Hassan Ahmed",
    class: "8",
    section: "B",
    admissionNo: "ADM-2023-0112",
    month: "January 2026",
    academicYear: "2025-2026",
    issueDate: "2026-01-01",
    dueDate: "2026-01-10",
    lineItems: [
      { id: "l1", name: "Tuition Fee", amount: 5000 },
      { id: "l2", name: "Computer Lab", amount: 700 },
      { id: "l3", name: "Science Lab", amount: 500 },
      { id: "l4", name: "Library Fee", amount: 350 },
    ],
    totalAmount: 6550,
    discountAmount: 0,
    netAmount: 6550,
    status: "pending",
  },
  {
    id: "ch-003",
    challanNo: "CH-2026-003",
    studentId: "s3",
    studentName: "Mohammad Bilal",
    fatherName: "Tariq Mahmood",
    class: "10",
    section: "A",
    admissionNo: "ADM-2022-0078",
    month: "December 2025",
    academicYear: "2025-2026",
    issueDate: "2025-12-01",
    dueDate: "2025-12-10",
    lineItems: [
      { id: "l1", name: "Tuition Fee", amount: 5500 },
      { id: "l2", name: "Computer Lab", amount: 800 },
      { id: "l3", name: "Science Lab", amount: 600 },
      { id: "l4", name: "Board Exam Fee", amount: 2000 },
    ],
    totalAmount: 8900,
    discountAmount: 0,
    netAmount: 8900,
    status: "overdue",
  },
  {
    id: "ch-004",
    challanNo: "CH-2026-004",
    studentId: "s4",
    studentName: "Ayesha Siddiqui",
    fatherName: "Kamran Siddiqui",
    class: "3",
    section: "C",
    admissionNo: "ADM-2024-0201",
    month: "January 2026",
    academicYear: "2025-2026",
    issueDate: "2026-01-01",
    dueDate: "2026-01-10",
    lineItems: [
      { id: "l1", name: "Tuition Fee", amount: 3500 },
      { id: "l2", name: "Computer Lab", amount: 500 },
      { id: "l3", name: "Library Fee", amount: 250 },
    ],
    totalAmount: 4250,
    discountAmount: 1062,
    netAmount: 3188,
    status: "paid",
    paidAmount: 3188,
    paidDate: "2026-01-05",
    paymentMethod: "cash",
    receiptNo: "RCP-2026-004",
    remarks: "Staff child - 25% discount applied",
  },
];

// Fee Defaulters
export const feeDefaulters: FeeDefaulter[] = [
  {
    id: "def-001",
    studentId: "s3",
    studentName: "Mohammad Bilal",
    fatherName: "Tariq Mahmood",
    class: "10",
    section: "A",
    admissionNo: "ADM-2022-0078",
    phone: "0300-1234567",
    email: "tariq.mahmood@email.com",
    totalDue: 8900,
    daysOverdue: 52,
    lastPaymentDate: "2025-11-05",
    pendingChallans: 1,
  },
  {
    id: "def-002",
    studentId: "s5",
    studentName: "Usman Ghani",
    fatherName: "Abdul Ghani",
    class: "7",
    section: "B",
    admissionNo: "ADM-2023-0156",
    phone: "0321-9876543",
    totalDue: 12500,
    daysOverdue: 45,
    lastPaymentDate: "2025-10-15",
    pendingChallans: 2,
  },
  {
    id: "def-003",
    studentId: "s6",
    studentName: "Zainab Noor",
    fatherName: "Noor Ahmed",
    class: "5",
    section: "A",
    admissionNo: "ADM-2024-0089",
    phone: "0333-4567890",
    email: "noor.ahmed@email.com",
    totalDue: 5200,
    daysOverdue: 22,
    pendingChallans: 1,
  },
];

// Discounted Students
export const discountedStudents: DiscountedStudent[] = [
  {
    id: "disc-001",
    studentId: "s1",
    studentName: "Ahmed Ali Khan",
    class: "5",
    section: "A",
    admissionNo: "ADM-2024-0045",
    discountType: "Sibling Discount",
    discountPercentage: 10,
    monthlyDiscount: 520,
    reason: "Elder sibling in Class 8",
    approvedBy: "Principal Anderson",
    validFrom: "2025-04-01",
  },
  {
    id: "disc-002",
    studentId: "s4",
    studentName: "Ayesha Siddiqui",
    class: "3",
    section: "C",
    admissionNo: "ADM-2024-0201",
    discountType: "Staff Child",
    discountPercentage: 25,
    monthlyDiscount: 1062,
    reason: "Father is school staff (Admin Officer)",
    approvedBy: "Principal Anderson",
    validFrom: "2024-08-01",
  },
  {
    id: "disc-003",
    studentId: "s7",
    studentName: "Hamza Raza",
    class: "9",
    section: "A",
    admissionNo: "ADM-2022-0034",
    discountType: "Merit Scholarship",
    discountPercentage: 50,
    monthlyDiscount: 3500,
    reason: "Board topper - 95% marks in Class 8",
    approvedBy: "Chairman Board",
    validFrom: "2025-04-01",
    validTo: "2026-03-31",
  },
];

// Class-wise Fee Collection Summary
export const classFeeCollection: ClassFeeCollection[] = [
  {
    id: "cfc-1",
    className: "1",
    section: "A",
    totalStudents: 35,
    totalCollectable: 140000,
    totalCollected: 126000,
    totalPending: 14000,
    collectionPercentage: 90,
    defaultersCount: 2,
  },
  {
    id: "cfc-2",
    className: "1",
    section: "B",
    totalStudents: 32,
    totalCollectable: 128000,
    totalCollected: 121600,
    totalPending: 6400,
    collectionPercentage: 95,
    defaultersCount: 1,
  },
  {
    id: "cfc-3",
    className: "5",
    section: "A",
    totalStudents: 40,
    totalCollectable: 208000,
    totalCollected: 187200,
    totalPending: 20800,
    collectionPercentage: 90,
    defaultersCount: 3,
  },
  {
    id: "cfc-4",
    className: "5",
    section: "B",
    totalStudents: 38,
    totalCollectable: 197600,
    totalCollected: 177840,
    totalPending: 19760,
    collectionPercentage: 90,
    defaultersCount: 2,
  },
  {
    id: "cfc-5",
    className: "8",
    section: "A",
    totalStudents: 42,
    totalCollectable: 275100,
    totalCollected: 261345,
    totalPending: 13755,
    collectionPercentage: 95,
    defaultersCount: 1,
  },
  {
    id: "cfc-6",
    className: "8",
    section: "B",
    totalStudents: 40,
    totalCollectable: 262000,
    totalCollected: 235800,
    totalPending: 26200,
    collectionPercentage: 90,
    defaultersCount: 3,
  },
  {
    id: "cfc-7",
    className: "10",
    section: "A",
    totalStudents: 45,
    totalCollectable: 400500,
    totalCollected: 360450,
    totalPending: 40050,
    collectionPercentage: 90,
    defaultersCount: 4,
  },
  {
    id: "cfc-8",
    className: "10",
    section: "B",
    totalStudents: 43,
    totalCollectable: 382700,
    totalCollected: 363565,
    totalPending: 19135,
    collectionPercentage: 95,
    defaultersCount: 2,
  },
];

// Recent Payments
export const recentPayments: FeePayment[] = [
  {
    id: "pay-001",
    challanId: "ch-001",
    challanNo: "CH-2026-001",
    studentId: "s1",
    studentName: "Ahmed Ali Khan",
    class: "5",
    section: "A",
    amount: 4680,
    paymentDate: "2026-01-08",
    paymentMethod: "bank",
    receiptNo: "RCP-2026-001",
    receivedBy: "Admin Office",
  },
  {
    id: "pay-002",
    challanId: "ch-004",
    challanNo: "CH-2026-004",
    studentId: "s4",
    studentName: "Ayesha Siddiqui",
    class: "3",
    section: "C",
    amount: 3188,
    paymentDate: "2026-01-05",
    paymentMethod: "cash",
    receiptNo: "RCP-2026-004",
    receivedBy: "Fee Counter",
  },
  {
    id: "pay-003",
    challanId: "ch-010",
    challanNo: "CH-2026-010",
    studentId: "s8",
    studentName: "Sara Malik",
    class: "7",
    section: "A",
    amount: 5800,
    paymentDate: "2026-01-04",
    paymentMethod: "online",
    receiptNo: "RCP-2026-010",
    receivedBy: "Online Portal",
  },
];

// Other Expenses
export const expenses: Expense[] = [
  {
    id: "exp-001",
    date: "2026-01-15",
    category: "Utilities",
    description: "Electricity bill for December",
    amount: 45000,
    paymentMethod: "bank",
    vendor: "K-Electric",
    receiptNo: "KE-DEC-2025",
    addedBy: "Admin Office",
    status: "approved",
  },
  {
    id: "exp-002",
    date: "2026-01-12",
    category: "Maintenance",
    description: "Plumbing repair - washrooms",
    amount: 8500,
    paymentMethod: "cash",
    vendor: "Ali Plumber",
    addedBy: "Maintenance Dept",
    status: "approved",
  },
  {
    id: "exp-003",
    date: "2026-01-10",
    category: "Stationery",
    description: "Office supplies and paper",
    amount: 12000,
    paymentMethod: "cash",
    vendor: "ABC Stationery",
    receiptNo: "ABC-1234",
    addedBy: "Admin Office",
    status: "approved",
  },
  {
    id: "exp-004",
    date: "2026-01-08",
    category: "Transport",
    description: "Bus fuel and maintenance",
    amount: 35000,
    paymentMethod: "bank",
    vendor: "PSO Fuel Station",
    addedBy: "Transport Dept",
    status: "approved",
  },
];

// Summary Statistics
export const getFinanceStats = () => {
  const totalCollected = recentPayments.reduce((sum, p) => sum + p.amount, 0);
  const totalPending = feeChallans
    .filter((c) => c.status === "pending" || c.status === "overdue")
    .reduce((sum, c) => sum + c.netAmount, 0);
  const totalDefaulters = feeDefaulters.length;
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  return {
    totalCollected,
    totalPending,
    totalDefaulters,
    totalExpenses,
    thisMonthCollected: totalCollected, // Simplified for mock
    lastMonthCollected: totalCollected * 0.9,
  };
};

// Generate Student Fee Records from allStudents
export const generateFeeRecords = (): StudentFeeRecord[] => {
  return allStudents.map((student, index) => {
    const challan = feeChallans.find(
      (c) => c.studentName === student.studentName,
    );
    const statuses: ("paid" | "pending" | "overdue")[] = [
      "paid",
      "pending",
      "overdue",
    ];
    const status =
      (challan?.status as "paid" | "pending" | "overdue") ||
      statuses[index % 3];
    const feeCalc = calculateStudentFee(student.class);
    const totalDue = feeCalc.total;
    const paidAmount = status === "paid" ? totalDue : 0;

    return {
      id: student.id,
      studentId: student.id,
      studentName: student.studentName,
      fatherName: student.fatherName,
      admissionNo: student.admissionNo,
      class: student.class,
      section: student.section,
      phone: student.phoneNo || "0300-1234567",
      totalDue,
      paidAmount,
      pendingAmount: totalDue - paidAmount,
      status,
      lastPaymentDate: status === "paid" ? "2026-01-15" : undefined,
      challanNo: `CH-2026-${String(index + 1).padStart(3, "0")}`,
      dueDate: "2026-02-10",
      feeItems: feeCalc.items,
    };
  });
};

// Generate Challan Data for Print Challan page
export const generateChallans = (): ChallanData[] => {
  return allStudents.map((student, index) => {
    const feeCalc = calculateStudentFee(student.class);

    return {
      id: student.id,
      studentName: student.studentName,
      fatherName: student.fatherName,
      admissionNo: student.admissionNo,
      class: student.class,
      section: student.section,
      challanNo: `CH-2026-${String(index + 1).padStart(3, "0")}`,
      month: "February 2026",
      dueDate: "2026-02-10",
      items: feeCalc.items,
      total: feeCalc.total,
    };
  });
};

// Pre-generated data for pages to use
export const studentFeeRecords = generateFeeRecords();
export const challanData = generateChallans();

// ─── Bulk Challan Generation Helpers ────────────────────────

/** Find the class group for a given class number */
function getClassGroup(studentClass: string): string | undefined {
  const group = classGroups.find((g) => g.classes.includes(studentClass));
  return group?.id;
}

/** Calculate monthly fee for a student based on their class using feeHeads from settings */
export function calculateStudentFee(studentClass: string): {
  items: { name: string; amount: number }[];
  total: number;
} {
  const groupId = getClassGroup(studentClass);

  const applicableFees = feeHeads.filter((fh) => {
    if (!fh.isActive) return false;
    if (fh.frequency !== "monthly") return false;

    // Check Wing/Group Restrictions
    if (fh.wingId && fh.wingId !== groupId) {
      return false;
    }

    // Check Class/Grade Restrictions (ApplicableTo)
    if (fh.applicableTo === "all") return true;
    return (fh.applicableTo as string[]).some(
      (c) =>
        c.includes(studentClass) ||
        c.toLowerCase().includes(`grade ${studentClass}`),
    );
  });

  const items = applicableFees.map((fh) => ({
    name: fh.name,
    amount: fh.amount,
  }));
  const total = items.reduce((sum, i) => sum + i.amount, 0);

  return { items, total };
}

/** Generate preview data for bulk challan generation */
export function generateBulkPreview(
  config: BulkGenerationConfig,
): BulkGenerationPreview {
  const targetStudents = allStudents.filter((s) => {
    if (s.status !== "Active") return false;
    if (config.scope === "entire-school") return true;
    return config.selectedClasses.includes(s.class);
  });

  const classSet = [...new Set(targetStudents.map((s) => s.class))].sort(
    (a, b) => parseInt(a) - parseInt(b),
  );

  const byClass = classSet.map((cls) => {
    const classStudents = targetStudents.filter((s) => s.class === cls);
    const feeCalc = calculateStudentFee(cls);
    return {
      className: cls,
      studentCount: classStudents.length,
      amountPerStudent: feeCalc.total,
      totalAmount: feeCalc.total * classStudents.length,
    };
  });

  const concessionsApplied = Math.floor(targetStudents.length * 0.12);
  const avgFee =
    byClass.length > 0
      ? byClass.reduce((s, c) => s + c.amountPerStudent, 0) / byClass.length
      : 0;
  const siblingDiscount = feeConcessions.find(
    (c) => c.isActive && c.autoApply && c.type === "percentage",
  );
  const discountPct = siblingDiscount ? siblingDiscount.value / 100 : 0.1;

  return {
    totalStudents: targetStudents.length,
    totalAmount: byClass.reduce((sum, c) => sum + c.totalAmount, 0),
    byClass,
    concessionsApplied,
    totalConcessionAmount: Math.round(
      concessionsApplied * avgFee * discountPct,
    ),
    arrearsStudents: config.includeArrears ? feeDefaulters.length : 0,
    arrearsAmount: config.includeArrears
      ? feeDefaulters.reduce((sum, d) => sum + d.totalDue, 0)
      : 0,
  };
}

/** Check if an extra charge applies to a given student */
function doesExtraChargeApply(
  charge: import("@/lib/admin/types/finance").ExtraCharge,
  student: { id: string; class: string; section: string },
): boolean {
  switch (charge.targetType) {
    case "all":
      return true;
    case "class":
      return charge.targetClasses.includes(student.class);
    case "section":
      return charge.targetSections.includes(
        `${student.class}-${student.section}`,
      );
    case "student":
      return charge.targetStudentIds.includes(student.id);
    default:
      return false;
  }
}

/** Generate bulk challans for all target students */
export function generateBulkChallans(
  config: BulkGenerationConfig,
): FeeChallan[] {
  const targetStudents = allStudents.filter((s) => {
    if (s.status !== "Active") return false;
    if (config.scope === "entire-school") return true;
    return config.selectedClasses.includes(s.class);
  });

  const extraCharges = config.extraCharges || [];

  return targetStudents.map((student, index) => {
    const feeCalc = calculateStudentFee(student.class);
    const challanNo = `CH-2026-B${String(index + 1).padStart(4, "0")}`;

    // Build line items from default fees
    const lineItems = feeCalc.items.map((item, i) => ({
      id: `li-${index}-${i}`,
      name: item.name,
      amount: item.amount,
    }));

    // Add applicable extra charges
    extraCharges.forEach((charge, ci) => {
      if (doesExtraChargeApply(charge, student)) {
        lineItems.push({
          id: `li-${index}-extra-${ci}`,
          name: charge.name,
          amount: charge.amount,
        });
      }
    });

    const totalAmount = lineItems.reduce((sum, li) => sum + li.amount, 0);

    return {
      id: `bulk-${Date.now()}-${index}`,
      challanNo,
      studentId: student.id,
      studentName: student.studentName,
      fatherName: student.fatherName,
      class: student.class,
      section: student.section,
      admissionNo: student.admissionNo,
      month: config.month,
      academicYear: "2025-2026",
      issueDate: new Date().toISOString().split("T")[0],
      dueDate: config.dueDate,
      lineItems,
      totalAmount,
      discountAmount: 0,
      netAmount: totalAmount,
      status: "pending" as const,
    };
  });
}
