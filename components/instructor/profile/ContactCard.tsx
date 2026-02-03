"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Save, X, Mail, Phone, MessageCircle } from "lucide-react";
import { InfoRow } from "./InfoRow";

interface ContactInfo {
  email: string;
  phone: string;
  whatsapp?: string;
}

interface ContactCardProps {
  contact: ContactInfo;
  onSave?: (contact: ContactInfo) => void;
}

export const ContactCard = ({ contact, onSave }: ContactCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ContactInfo>(contact);

  const handleChange = (field: keyof ContactInfo, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave?.(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(contact);
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-background rounded-2xl border border-border shadow-sm overflow-hidden"
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-border flex items-center justify-between bg-surface/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent-gradient flex items-center justify-center">
            <Phone className="w-5 h-5 text-white" />
          </div>
          <h3 className="font-semibold text-text-primary font-heading">
            Contact Information
          </h3>
        </div>

        {isEditing ? (
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className="p-2 rounded-lg hover:bg-surface-hover text-text-muted hover:text-error transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <button
              onClick={handleSave}
              className="p-2 rounded-lg bg-accent text-white hover:bg-accent-hover transition-colors"
            >
              <Save className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1.5 rounded-lg hover:bg-surface-hover text-text-muted hover:text-accent transition-colors text-sm font-medium"
          >
            Edit
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="grid grid-cols-1 gap-4">
          <InfoRow
            icon={Mail}
            label="Email Address"
            value={contact.email}
            isEditing={isEditing}
            formValue={formData.email}
            onChange={(value) => handleChange("email", value)}
          />
          <InfoRow
            icon={Phone}
            label="Phone Number"
            value={contact.phone}
            isEditing={isEditing}
            formValue={formData.phone}
            onChange={(value) => handleChange("phone", value)}
          />
          <InfoRow
            icon={MessageCircle}
            label="WhatsApp"
            value={contact.whatsapp || ""}
            isEditing={isEditing}
            formValue={formData.whatsapp}
            onChange={(value) => handleChange("whatsapp", value)}
          />
        </div>
      </div>
    </motion.div>
  );
};
