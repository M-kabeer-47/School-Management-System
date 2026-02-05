import { Expense, ExpenseCategory, PaymentMethod } from "@/lib/admin/types/finance";

// Expense Categories
export const expenseCategories: ExpenseCategory[] = [
    {
        id: "cat-1",
        name: "Utilities",
        icon: "Lightbulb",
        color: "bg-yellow-500",
        description: "Electricity, water, gas, internet bills",
    },
    {
        id: "cat-2",
        name: "Maintenance",
        icon: "Wrench",
        color: "bg-orange-500",
        description: "Building repairs, equipment maintenance",
    },
    {
        id: "cat-3",
        name: "Supplies",
        icon: "Package",
        color: "bg-blue-500",
        description: "Office supplies, stationery, cleaning materials",
    },
    {
        id: "cat-4",
        name: "Transportation",
        icon: "Bus",
        color: "bg-green-500",
        description: "Fuel, vehicle maintenance, transport costs",
    },
    {
        id: "cat-5",
        name: "Events",
        icon: "Calendar",
        color: "bg-purple-500",
        description: "School events, functions, celebrations",
    },
    {
        id: "cat-6",
        name: "Food & Cafeteria",
        icon: "UtensilsCrossed",
        color: "bg-red-500",
        description: "Cafeteria supplies, food items",
    },
    {
        id: "cat-7",
        name: "IT & Equipment",
        icon: "Monitor",
        color: "bg-indigo-500",
        description: "Computers, software, IT infrastructure",
    },
    {
        id: "cat-8",
        name: "Miscellaneous",
        icon: "MoreHorizontal",
        color: "bg-gray-500",
        description: "Other miscellaneous expenses",
    },
];

// Mock Expenses Data
export const expenses: Expense[] = [
    {
        id: "exp-001",
        date: "2026-02-01",
        category: "Utilities",
        description: "Electricity bill - January 2026",
        amount: 45000,
        paymentMethod: "bank",
        vendor: "K-Electric",
        receiptNo: "KE-2026-0145",
        addedBy: "Admin Office",
        approvedBy: "Principal Anderson",
        status: "approved",
        remarks: "Monthly electricity consumption",
    },
    {
        id: "exp-002",
        date: "2026-02-01",
        category: "Utilities",
        description: "Water bill - January 2026",
        amount: 12000,
        paymentMethod: "bank",
        vendor: "KWSB",
        receiptNo: "KWSB-2026-0089",
        addedBy: "Admin Office",
        approvedBy: "Principal Anderson",
        status: "approved",
    },
    {
        id: "exp-003",
        date: "2026-02-02",
        category: "Maintenance",
        description: "AC servicing - Block A",
        amount: 15000,
        paymentMethod: "cash",
        vendor: "Cool Tech Services",
        receiptNo: "CTS-456",
        addedBy: "Maintenance Dept",
        approvedBy: "Principal Anderson",
        status: "approved",
        remarks: "Annual AC maintenance for 10 units",
    },
    {
        id: "exp-004",
        date: "2026-02-02",
        category: "Supplies",
        description: "Stationery and office supplies",
        amount: 8500,
        paymentMethod: "cash",
        vendor: "Office Mart",
        receiptNo: "OM-2026-112",
        addedBy: "Admin Office",
        approvedBy: "Vice Principal",
        status: "approved",
    },
    {
        id: "exp-005",
        date: "2026-02-03",
        category: "Transportation",
        description: "School bus fuel",
        amount: 35000,
        paymentMethod: "cash",
        vendor: "PSO Fuel Station",
        receiptNo: "PSO-78542",
        addedBy: "Transport Dept",
        status: "pending",
        remarks: "Weekly fuel for 5 school buses",
    },
    {
        id: "exp-006",
        date: "2026-02-03",
        category: "Events",
        description: "Annual Sports Day preparations",
        amount: 25000,
        paymentMethod: "bank",
        vendor: "Event Solutions",
        receiptNo: "ES-2026-045",
        addedBy: "Sports Dept",
        status: "pending",
        remarks: "Decorations, trophies, and refreshments",
    },
    {
        id: "exp-007",
        date: "2026-02-03",
        category: "Food & Cafeteria",
        description: "Monthly cafeteria supplies",
        amount: 42000,
        paymentMethod: "bank",
        vendor: "Metro Cash & Carry",
        receiptNo: "MCC-567890",
        addedBy: "Cafeteria Manager",
        approvedBy: "Principal Anderson",
        status: "approved",
    },
    {
        id: "exp-008",
        date: "2026-02-04",
        category: "IT & Equipment",
        description: "Printer cartridges and paper",
        amount: 18000,
        paymentMethod: "cash",
        vendor: "Tech Zone",
        receiptNo: "TZ-2026-089",
        addedBy: "IT Dept",
        approvedBy: "Vice Principal",
        status: "approved",
    },
    {
        id: "exp-009",
        date: "2026-02-04",
        category: "Maintenance",
        description: "Plumbing repairs - Washrooms",
        amount: 7500,
        paymentMethod: "cash",
        vendor: "Quick Fix Plumbers",
        addedBy: "Maintenance Dept",
        status: "pending",
    },
    {
        id: "exp-010",
        date: "2026-02-04",
        category: "Miscellaneous",
        description: "Guest speaker honorarium",
        amount: 10000,
        paymentMethod: "bank",
        vendor: "Dr. Ahmed Khan",
        receiptNo: "HON-2026-015",
        addedBy: "Admin Office",
        approvedBy: "Principal Anderson",
        status: "approved",
        remarks: "Career guidance session for Grade 10",
    },
    {
        id: "exp-011",
        date: "2026-01-28",
        category: "Utilities",
        description: "Internet bill - January 2026",
        amount: 15000,
        paymentMethod: "bank",
        vendor: "PTCL",
        receiptNo: "PTCL-2026-0456",
        addedBy: "IT Dept",
        approvedBy: "Principal Anderson",
        status: "approved",
    },
    {
        id: "exp-012",
        date: "2026-01-25",
        category: "Supplies",
        description: "Cleaning materials",
        amount: 6500,
        paymentMethod: "cash",
        vendor: "CleanPro Supplies",
        receiptNo: "CP-789",
        addedBy: "Admin Office",
        approvedBy: "Vice Principal",
        status: "approved",
    },
    {
        id: "exp-013",
        date: "2026-01-20",
        category: "IT & Equipment",
        description: "2 new projectors for classrooms",
        amount: 95000,
        paymentMethod: "bank",
        vendor: "Tech Solutions Ltd",
        receiptNo: "TSL-2026-023",
        addedBy: "IT Dept",
        approvedBy: "Principal Anderson",
        status: "approved",
        remarks: "For Science and Computer labs",
    },
    {
        id: "exp-014",
        date: "2026-01-15",
        category: "Events",
        description: "Republic Day celebration",
        amount: 18000,
        paymentMethod: "cash",
        vendor: "Various",
        addedBy: "Admin Office",
        approvedBy: "Principal Anderson",
        status: "approved",
    },
    {
        id: "exp-015",
        date: "2026-01-10",
        category: "Transportation",
        description: "Bus tire replacement",
        amount: 28000,
        paymentMethod: "bank",
        vendor: "General Tyre",
        receiptNo: "GT-2026-078",
        addedBy: "Transport Dept",
        approvedBy: "Principal Anderson",
        status: "approved",
        remarks: "4 new tires for Bus #3",
    },
];

// Helper functions
export function getExpenseStats() {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const thisMonthExpenses = expenses.filter((exp) => {
        const expDate = new Date(exp.date);
        return expDate.getMonth() === currentMonth && expDate.getFullYear() === currentYear;
    });

    const approvedExpenses = expenses.filter((exp) => exp.status === "approved");
    const pendingExpenses = expenses.filter((exp) => exp.status === "pending");

    const totalAmount = approvedExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    const thisMonthAmount = thisMonthExpenses
        .filter((exp) => exp.status === "approved")
        .reduce((sum, exp) => sum + exp.amount, 0);
    const pendingAmount = pendingExpenses.reduce((sum, exp) => sum + exp.amount, 0);

    // Category breakdown
    const byCategory = expenseCategories.map((cat) => {
        const categoryExpenses = approvedExpenses.filter((exp) => exp.category === cat.name);
        return {
            ...cat,
            totalAmount: categoryExpenses.reduce((sum, exp) => sum + exp.amount, 0),
            count: categoryExpenses.length,
        };
    });

    return {
        totalExpenses: totalAmount,
        thisMonthExpenses: thisMonthAmount,
        pendingApproval: pendingExpenses.length,
        pendingAmount,
        totalTransactions: approvedExpenses.length,
        byCategory,
    };
}

export function getCategoryByName(name: string): ExpenseCategory | undefined {
    return expenseCategories.find((cat) => cat.name === name);
}

export function getRecentExpenses(limit: number = 5): Expense[] {
    return [...expenses]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, limit);
}
