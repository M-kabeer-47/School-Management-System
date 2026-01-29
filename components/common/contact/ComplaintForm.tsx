"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { cn } from "@/lib/shadcn/utils";

interface ComplaintFormProps {
  onSubmit?: (data: {
    subject: string;
    category: string;
    message: string;
  }) => void;
}

const categories = [
  { value: "academic", label: "Academic" },
  { value: "facilities", label: "Facilities" },
  { value: "transport", label: "Transport" },
  { value: "fees", label: "Fees" },
  { value: "staff", label: "Staff" },
  { value: "other", label: "Other" },
];

export const ComplaintForm = ({ onSubmit }: ComplaintFormProps) => {
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{
    subject?: string;
    category?: string;
    message?: string;
  }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!subject.trim()) newErrors.subject = "Subject is required";
    if (!category) newErrors.category = "Please select a category";
    if (!message.trim()) newErrors.message = "Message is required";
    if (message.trim().length < 20)
      newErrors.message = "Message must be at least 20 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit?.({ subject, category, message });
    setIsSubmitted(true);

    // Reset after showing success
    setTimeout(() => {
      setSubject("");
      setCategory("");
      setMessage("");
      setIsSubmitted(false);
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-success-light rounded-2xl p-8 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-success mx-auto flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          Complaint Submitted!
        </h3>
        <p className="text-sm text-text-secondary">
          Your complaint has been received. We will review it and respond soon.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="Subject"
        placeholder="Brief description of your concern"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        error={errors.subject}
      />

      <div className="w-full">
        <label className="block text-sm font-medium text-text-secondary mb-1.5">
          Category
        </label>
        <Select value={category} onValueChange={(value) => setCategory(value)}>
          <SelectTrigger
            className={cn(
              "h-11 w-full rounded-xl border-2 bg-background px-4 py-2 text-sm text-text-primary transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent",
              "hover:border-border-strong",
              errors.category
                ? "border-error focus:border-error focus:ring-error/30"
                : "border-border",
            )}
          >
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category && (
          <p className="mt-1.5 text-xs text-error">{errors.category}</p>
        )}
      </div>

      <Textarea
        label="Message"
        placeholder="Please describe your concern in detail..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={5}
        error={errors.message}
      />

      <button
        type="submit"
        className="w-full h-12 bg-accent-gradient text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-accent/20"
      >
        <Send className="w-4 h-4" />
        Submit Complaint
      </button>
    </form>
  );
};
