"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Send,
  CheckCircle,
  Plus,
  ChevronUp,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SearchBar } from "@/components/ui/SearchBar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Pagination } from "@/components/admin/students/Pagination";
import {
  RecipientSelector,
  ComposeMessageForm,
  MessageHistoryCard,
  ConfirmSendModal,
} from "@/components/admin/communication/messages";
import {
  sentMessages,
  sampleStudents,
  getStaffAsRecipients,
} from "@/lib/admin/mock-data/messages";
import {
  MessageRecipient,
  MessageChannel,
  SentMessage,
  RecipientType,
  StaffRecipient,
} from "@/lib/admin/types/messages";

const ITEMS_PER_PAGE = 10;

export default function MessagesPage() {
  // Recipient type state
  const [recipientType, setRecipientType] = useState<RecipientType>("students");

  // Form state - separate for students and staff
  const [selectedStudents, setSelectedStudents] = useState<MessageRecipient[]>(
    [],
  );
  const [selectedStaff, setSelectedStaff] = useState<StaffRecipient[]>([]);
  const [sendToAll, setSendToAll] = useState(false);
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [channel, setChannel] = useState<MessageChannel>("sms");

  // UI state
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [messages, setMessages] = useState(sentMessages);

  // History filters
  const [historySearch, setHistorySearch] = useState("");
  const [channelFilter, setChannelFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate recipient count based on type
  const recipientCount = useMemo(() => {
    if (recipientType === "everyone") {
      return sampleStudents.length + getStaffAsRecipients().length;
    }
    if (sendToAll) {
      return recipientType === "students"
        ? sampleStudents.length
        : getStaffAsRecipients().length;
    }
    return recipientType === "students"
      ? selectedStudents.length
      : selectedStaff.length;
  }, [sendToAll, recipientType, selectedStudents.length, selectedStaff.length]);

  const canSend =
    content.trim() &&
    (recipientType === "everyone" ||
      sendToAll ||
      (recipientType === "students" && selectedStudents.length > 0) ||
      (recipientType === "staff" && selectedStaff.length > 0));

  // Filter messages
  const filteredMessages = useMemo(() => {
    return messages.filter((message) => {
      const matchesSearch =
        historySearch === "" ||
        message.content.toLowerCase().includes(historySearch.toLowerCase()) ||
        (message.subject?.toLowerCase().includes(historySearch.toLowerCase()) ??
          false);

      const matchesChannel =
        channelFilter === "all" || message.channel === channelFilter;

      return matchesSearch && matchesChannel;
    });
  }, [messages, historySearch, channelFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredMessages.length / ITEMS_PER_PAGE);
  const paginatedMessages = filteredMessages.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleSend = () => {
    if (canSend) {
      setShowConfirm(true);
    }
  };

  const confirmSend = async () => {
    setIsSending(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Add new message to history
    const newMessage: SentMessage = {
      id: `msg-${Date.now()}`,
      subject: subject || undefined,
      content,
      channel,
      recipientType:
        recipientType === "everyone" || sendToAll ? "all" : "selected",
      recipientCount,
      recipients:
        recipientType === "everyone" || sendToAll
          ? undefined
          : selectedStudents,
      sentBy: "Admin",
      sentAt: new Date().toISOString(),
      delivery: {
        sms:
          channel === "sms" || channel === "both"
            ? { sent: true, delivered: true, sentAt: new Date().toISOString() }
            : undefined,
        whatsapp:
          channel === "whatsapp" || channel === "both"
            ? { sent: true, delivered: true, sentAt: new Date().toISOString() }
            : undefined,
      },
    };

    setMessages([newMessage, ...messages]);
    setIsSending(false);
    setShowConfirm(false);
    setShowSuccess(true);

    // Reset form and collapse composer
    setSelectedStudents([]);
    setSelectedStaff([]);
    setSendToAll(false);
    setSubject("");
    setContent("");
    setChannel("sms");
    setIsComposerOpen(false);

    setTimeout(() => setShowSuccess(false), 3000);
  };

  const hasActiveFilters = historySearch !== "" || channelFilter !== "all";

  const clearHistoryFilters = () => {
    setHistorySearch("");
    setChannelFilter("all");
    setCurrentPage(1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Success Toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-4 z-50 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            Message sent successfully!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary font-heading flex items-center gap-3">
            Messages
            <MessageSquare className="w-7 h-7 text-accent" />
          </h1>
          <p className="text-text-secondary mt-1">
            Send SMS and WhatsApp messages to students, parents, and staff
          </p>
        </div>
        {!isComposerOpen && (
          <Button onClick={() => setIsComposerOpen(true)}>
            <Plus className="w-4 h-4" />
            New Message
          </Button>
        )}
      </div>

      {/* Collapsible Compose Section */}
      <AnimatePresence>
        {isComposerOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="bg-background rounded-2xl border border-border shadow-sm">
              <div className="p-5 border-b border-border flex items-center justify-between">
                <h2 className="font-semibold text-text-primary flex items-center gap-2">
                  <Send className="w-5 h-5 text-accent" />
                  Compose Message
                </h2>
                <button
                  onClick={() => setIsComposerOpen(false)}
                  className="p-2 rounded-lg hover:bg-surface text-text-muted hover:text-text-primary transition-colors"
                >
                  <ChevronUp className="w-5 h-5" />
                </button>
              </div>
              <div className="p-5 space-y-6">
                <RecipientSelector
                  recipientType={recipientType}
                  onRecipientTypeChange={setRecipientType}
                  selectedStudents={selectedStudents}
                  onStudentSelectionChange={setSelectedStudents}
                  selectedStaff={selectedStaff}
                  onStaffSelectionChange={setSelectedStaff}
                  sendToAll={sendToAll}
                  onSendToAllChange={setSendToAll}
                />
                <ComposeMessageForm
                  subject={subject}
                  content={content}
                  channel={channel}
                  onSubjectChange={setSubject}
                  onContentChange={setContent}
                  onChannelChange={setChannel}
                  onSend={handleSend}
                  disabled={!canSend}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* History Section */}
      <div className="bg-background rounded-2xl border border-border shadow-sm">
        <div className="p-5 border-b border-border">
          <h2 className="font-semibold text-text-primary">Message History</h2>
        </div>

        {/* History Filters */}
        <div className="p-5 border-b border-border">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <SearchBar
                placeholder="Search messages..."
                value={historySearch}
                onChange={(value) => {
                  setHistorySearch(value);
                  setCurrentPage(1);
                }}
              />
            </div>
            <div className="flex gap-3">
              <Select
                value={channelFilter}
                onValueChange={(value) => {
                  setChannelFilter(value);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Channel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Channels</SelectItem>
                  <SelectItem value="sms">SMS Only</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp Only</SelectItem>
                  <SelectItem value="both">SMS & WhatsApp</SelectItem>
                </SelectContent>
              </Select>
              {hasActiveFilters && (
                <Button variant="ghost" onClick={clearHistoryFilters}>
                  <X className="w-4 h-4" />
                  Clear
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Messages List */}
        <div className="p-5 space-y-3">
          {paginatedMessages.length > 0 ? (
            paginatedMessages.map((message, index) => (
              <MessageHistoryCard
                key={message.id}
                message={message}
                index={index}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-text-muted" />
              </div>
              <h3 className="font-medium text-text-primary">
                {hasActiveFilters ? "No messages found" : "No messages yet"}
              </h3>
              <p className="text-sm text-text-muted mt-1">
                {hasActiveFilters
                  ? "Try adjusting your filters"
                  : "Compose your first message to get started"}
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredMessages.length > ITEMS_PER_PAGE && (
          <div className="p-5 border-t border-border">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredMessages.length}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>

      {/* Confirm Modal */}
      <ConfirmSendModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={confirmSend}
        recipientCount={recipientCount}
        channel={channel}
        isLoading={isSending}
      />
    </motion.div>
  );
}
