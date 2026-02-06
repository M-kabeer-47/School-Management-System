"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  Mail,
  MessageSquare,
  Send,
  X,
  CheckCircle,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/admin/PageHeader";
import { Pagination } from "@/components/admin/students/Pagination";
import { SearchBar } from "@/components/ui/SearchBar";
import { ClassSelect } from "@/components/admin/students/ClassSelect";
import MonthFilter from "@/components/ui/MonthFilter";
import { DefaultersTable } from "@/components/admin/finance";
import Modal from "@/components/ui/Modal";
import { feeDefaulters } from "@/lib/admin/mock-data/finance";
import { getUniqueClasses } from "@/lib/admin/mock-data/students";
import { FeeDefaulter } from "@/lib/admin/types/finance";

const ITEMS_PER_PAGE = 10;

export default function DefaultersPage() {
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("all");
  const [monthFilter, setMonthFilter] = useState("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Reminder Modal
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [reminderType, setReminderType] = useState<"sms" | "email">("sms");
  const [reminderMessage, setReminderMessage] = useState(
    "Dear Parent, this is a reminder that your child's school fee is overdue. Please clear the dues at the earliest. Thank you.",
  );
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  const uniqueClasses = getUniqueClasses();

  const filteredDefaulters = useMemo(() => {
    return feeDefaulters.filter((defaulter) => {
      const matchesSearch =
        search === "" ||
        defaulter.studentName.toLowerCase().includes(search.toLowerCase()) ||
        defaulter.admissionNo.toLowerCase().includes(search.toLowerCase()) ||
        defaulter.fatherName.toLowerCase().includes(search.toLowerCase());
      const matchesClass =
        classFilter === "all" || defaulter.class === classFilter;

      const matchesMonth =
        monthFilter === "all" ||
        (() => {
          if (!defaulter.lastPaymentDate) return false;
          const recordDate = new Date(defaulter.lastPaymentDate);
          const [year, month] = monthFilter.split("-");
          return (
            recordDate.getFullYear() === parseInt(year) &&
            recordDate.getMonth() + 1 === parseInt(month)
          );
        })();

      return matchesSearch && matchesClass && matchesMonth;
    });
  }, [search, classFilter, monthFilter]);

  // Pagination
  const paginatedDefaulters = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredDefaulters.slice(startIndex, endIndex);
  }, [filteredDefaulters, currentPage]);

  const totalPages = Math.ceil(filteredDefaulters.length / ITEMS_PER_PAGE);

  const totalDue = filteredDefaulters.reduce((sum, d) => sum + d.totalDue, 0);
  const selectedDefaulters = filteredDefaulters.filter((d) =>
    selectedIds.includes(d.id),
  );

  const handleSelectAll = () => {
    if (selectedIds.length === filteredDefaulters.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredDefaulters.map((d) => d.id));
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const openReminderModal = (type: "sms" | "email") => {
    setReminderType(type);
    setSendSuccess(false);
    setIsReminderModalOpen(true);
  };

  const handleSendReminder = (defaulter: FeeDefaulter) => {
    setSelectedIds([defaulter.id]);
    openReminderModal("sms");
  };

  const handleSendReminders = async () => {
    setIsSending(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSending(false);
    setSendSuccess(true);
  };

  const clearFilters = () => {
    setSearch("");
    setClassFilter("all");
    setMonthFilter("all");
    setCurrentPage(1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Page Header */}
      <PageHeader
        title="Fee Defaulters"
        subtitle="Students with overdue fee payments"
      >
        <Button variant="outline" size="sm">
          <Download className="w-4 h-4" />
          Export List
        </Button>
      </PageHeader>

      {/* Summary Card */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
        <div className="flex flex-wrap items-center gap-6">
          <div>
            <p className="text-sm text-red-600 font-medium">Total Defaulters</p>
            <p className="text-3xl font-bold text-red-700">
              {filteredDefaulters.length}
            </p>
          </div>
          <div className="h-12 w-px bg-red-200" />
          <div>
            <p className="text-sm text-red-600 font-medium">
              Total Outstanding
            </p>
            <p className="text-3xl font-bold text-red-700">
              Rs. {totalDue.toLocaleString()}
            </p>
          </div>
          {selectedIds.length > 0 && (
            <>
              <div className="h-12 w-px bg-red-200" />
              <div>
                <p className="text-sm text-red-600 font-medium">Selected</p>
                <p className="text-3xl font-bold text-red-700">
                  {selectedIds.length}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              placeholder="Search by name, admission no, or father name..."
              value={search}
              onChange={setSearch}
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="lg:w-auto"
          >
            <Filter className="w-4 h-4" />
            Filters
            {(classFilter !== "all" || monthFilter !== "all") && (
              <span className="ml-2 px-2 py-0.5 bg-accent text-white text-xs rounded-full">
                {
                  [classFilter !== "all", monthFilter !== "all"].filter(Boolean)
                    .length
                }
              </span>
            )}
          </Button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-border grid grid-cols-1 md:grid-cols-3 gap-4">
                <ClassSelect
                  label="Class"
                  value={classFilter}
                  onChange={setClassFilter}
                  options={uniqueClasses}
                  placeholder="All Classes"
                  allLabel="All Classes"
                />
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Month
                  </label>
                  <MonthFilter value={monthFilter} onChange={setMonthFilter} />
                </div>
                <div className="flex items-end">
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="w-full"
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bulk Actions */}
      <AnimatePresence>
        {selectedIds.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-red-100 border border-red-200 rounded-xl px-4 py-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="text-sm font-medium text-red-700">
                {selectedIds.length} students selected • Total: Rs.{" "}
                {selectedDefaulters
                  .reduce((sum, d) => sum + d.totalDue, 0)
                  .toLocaleString()}
              </span>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-red-300 text-red-700 hover:bg-red-100"
                  onClick={() => openReminderModal("sms")}
                >
                  <MessageSquare className="w-4 h-4" />
                  Send SMS ({selectedIds.length})
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-red-300 text-red-700 hover:bg-red-100"
                  onClick={() => openReminderModal("email")}
                >
                  <Mail className="w-4 h-4" />
                  Send Email ({selectedIds.length})
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setSelectedIds([])}
                >
                  <X className="w-4 h-4" />
                  Clear
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Defaulters Table with Pagination */}
      <div className="bg-surface border border-border rounded-2xl shadow-sm overflow-hidden">
        <DefaultersTable
          defaulters={paginatedDefaulters}
          selectedIds={selectedIds}
          onToggleSelect={handleToggleSelect}
          onToggleSelectAll={handleSelectAll}
          onSendReminder={handleSendReminder}
        />
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredDefaulters.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
      />

      {/* Empty State */}
      {filteredDefaulters.length === 0 && (
        <div className="text-center py-12">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
          <p className="text-text-secondary">
            No defaulters found - All fees are paid!
          </p>
        </div>
      )}

      {/* Reminder Modal */}
      <Modal
        isOpen={isReminderModalOpen}
        onClose={() => {
          setIsReminderModalOpen(false);
          setSendSuccess(false);
        }}
        title={
          sendSuccess
            ? "Reminders Sent!"
            : `Send ${reminderType.toUpperCase()} Reminder`
        }
        description={
          sendSuccess
            ? `Successfully sent to ${selectedIds.length} parent(s)`
            : `Sending to ${selectedIds.length} defaulter parent(s)`
        }
        icon={
          sendSuccess ? (
            <CheckCircle className="w-6 h-6 text-green-500" />
          ) : reminderType === "sms" ? (
            <MessageSquare className="w-6 h-6" />
          ) : (
            <Mail className="w-6 h-6" />
          )
        }
        maxWidth="md"
      >
        {sendSuccess ? (
          <div className="text-center py-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4"
            >
              <CheckCircle className="w-10 h-10 text-green-600" />
            </motion.div>
            <p className="text-text-secondary">
              {reminderType === "sms" ? "SMS" : "Email"} reminders have been
              sent to all selected parents.
            </p>
            <Button
              className="mt-6"
              onClick={() => {
                setIsReminderModalOpen(false);
                setSendSuccess(false);
                setSelectedIds([]);
              }}
            >
              Done
            </Button>
          </div>
        ) : (
          <div className="space-y-4 pt-2">
            {/* Recipients List */}
            <div className="bg-surface rounded-xl p-3 max-h-32 overflow-y-auto">
              <p className="text-xs text-text-muted mb-2 font-medium">
                Recipients:
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedDefaulters.slice(0, 5).map((d) => (
                  <span
                    key={d.id}
                    className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full"
                  >
                    {d.studentName}
                  </span>
                ))}
                {selectedDefaulters.length > 5 && (
                  <span className="text-xs text-text-muted">
                    +{selectedDefaulters.length - 5} more
                  </span>
                )}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="text-sm font-medium text-text-secondary mb-2 block">
                Message
              </label>
              <textarea
                value={reminderMessage}
                onChange={(e) => setReminderMessage(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                placeholder="Enter reminder message..."
              />
              <p className="text-xs text-text-muted mt-1">
                {reminderMessage.length} characters
              </p>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                variant="ghost"
                onClick={() => setIsReminderModalOpen(false)}
                disabled={isSending}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSendReminders}
                disabled={isSending}
                className="bg-red-600 hover:bg-red-700"
              >
                {isSending ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send to {selectedIds.length} Parent(s)
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </motion.div>
  );
}
