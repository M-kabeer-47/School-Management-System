"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Download, Plus, Receipt } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/admin/PageHeader";
import { Pagination } from "@/components/admin/students/Pagination";
import {
  ExpenseFilters,
  ExpenseFiltersState,
  ExpenseTable,
  ExpenseDrawer,
  AddExpenseModal,
} from "@/components/admin/finance/expenses";
import { expenses } from "@/lib/admin/mock-data/expenses";
import { Expense } from "@/lib/admin/types/finance";

const ITEMS_PER_PAGE = 10;

export default function AllExpensesPage() {
  const [filters, setFilters] = useState<ExpenseFiltersState>({
    search: "",
    category: "all",
    status: "all",
    paymentMethod: "all",
    month: "all",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const searchMatch =
        filters.search === "" ||
        expense.description
          .toLowerCase()
          .includes(filters.search.toLowerCase()) ||
        (expense.vendor?.toLowerCase().includes(filters.search.toLowerCase()) ??
          false) ||
        (expense.receiptNo
          ?.toLowerCase()
          .includes(filters.search.toLowerCase()) ??
          false);

      const categoryMatch =
        filters.category === "all" || expense.category === filters.category;

      const statusMatch =
        filters.status === "all" || expense.status === filters.status;

      const paymentMatch =
        filters.paymentMethod === "all" ||
        expense.paymentMethod === filters.paymentMethod;

      const monthMatch =
        filters.month === "all" ||
        (() => {
          if (!expense.date) return false;
          const recordDate = new Date(expense.date);
          const [year, month] = filters.month.split("-");
          return (
            recordDate.getFullYear() === parseInt(year) &&
            recordDate.getMonth() + 1 === parseInt(month)
          );
        })();

      return (
        searchMatch &&
        categoryMatch &&
        statusMatch &&
        paymentMatch &&
        monthMatch
      );
    });
  }, [filters]);

  // Sort by date (newest first)
  const sortedExpenses = [...filteredExpenses].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const totalPages = Math.ceil(sortedExpenses.length / ITEMS_PER_PAGE);
  const paginatedExpenses = sortedExpenses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  // Stats
  const totalAmount = filteredExpenses
    .filter((e) => e.status === "approved")
    .reduce((sum, e) => sum + e.amount, 0);

  const handleFilterChange = (
    key: keyof ExpenseFiltersState,
    value: string,
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      category: "all",
      status: "all",
      paymentMethod: "all",
      month: "all",
    });
    setCurrentPage(1);
  };

  const handleSelectExpense = (expense: Expense) => {
    setSelectedExpense(expense);
    setIsDrawerOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <PageHeader
        title="All Expenses"
        subtitle="View and manage all expense records"
      >
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="w-4 h-4" />
            Add Expense
          </Button>
        </div>
      </PageHeader>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-background rounded-2xl border border-border p-5 shadow-sm">
          <p className="text-sm text-text-muted font-medium">Total Records</p>
          <p className="text-2xl font-bold text-text-primary mt-1">
            {filteredExpenses.length}
          </p>
        </div>
        <div className="bg-background rounded-2xl border border-border p-5 shadow-sm">
          <p className="text-sm text-text-muted font-medium">Approved Amount</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
            Rs. {totalAmount.toLocaleString()}
          </p>
        </div>
        <div className="bg-background rounded-2xl border border-border p-5 shadow-sm">
          <p className="text-sm text-text-muted font-medium">
            Pending Approval
          </p>
          <p className="text-2xl font-bold text-orange-600 dark:text-orange-400 mt-1">
            {filteredExpenses.filter((e) => e.status === "pending").length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <ExpenseFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={clearFilters}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
      />

      {/* Table */}
      {paginatedExpenses.length > 0 ? (
        <ExpenseTable
          expenses={paginatedExpenses}
          onSelectExpense={handleSelectExpense}
        />
      ) : (
        <div className="bg-surface border border-border rounded-2xl p-12 text-center">
          <Receipt className="w-12 h-12 text-text-muted mx-auto mb-3" />
          <p className="text-text-secondary font-medium">No expenses found</p>
          <p className="text-sm text-text-muted mt-1">
            Try adjusting your filters or add a new expense
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus className="w-4 h-4" />
            Add Expense
          </Button>
        </div>
      )}

      {/* Pagination */}
      {paginatedExpenses.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredExpenses.length}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={setCurrentPage}
        />
      )}

      {/* Expense Details Drawer */}
      <ExpenseDrawer
        expense={selectedExpense}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

      {/* Add Expense Modal */}
      <AddExpenseModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </motion.div>
  );
}
