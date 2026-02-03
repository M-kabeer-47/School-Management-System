"use client";

import { motion } from "framer-motion";
import { Building2, MapPin, Phone, Mail, Globe, Clock } from "lucide-react";
import { schoolContact } from "@/lib/student/mock-data/contact";
import { ContactItem } from "./ContactItem";

export const SchoolInfoCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-background rounded-2xl border border-border shadow-sm overflow-hidden"
    >
      <div className="px-5 py-4 border-b border-border bg-surface/50">
        <h2 className="font-semibold text-text-primary font-heading flex items-center gap-2">
          <Building2 className="w-5 h-5 text-accent" /> School Information
        </h2>
      </div>
      <div className="p-5 space-y-4">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-text-primary font-heading">
            {schoolContact.name}
          </h3>
        </div>

        <ContactItem icon={MapPin} label="Address">
          {schoolContact.address}
        </ContactItem>

        <ContactItem icon={Phone} label="Phone Numbers">
          <div className="space-y-1">
            {schoolContact.phone.map((p, i) => (
              <a
                key={i}
                href={`tel:${p}`}
                className="block hover:text-accent transition-colors"
              >
                {p}
              </a>
            ))}
          </div>
        </ContactItem>

        <ContactItem icon={Mail} label="Email">
          <div className="space-y-1">
            {schoolContact.email.map((e, i) => (
              <a
                key={i}
                href={`mailto:${e}`}
                className="block hover:text-accent transition-colors break-all"
              >
                {e}
              </a>
            ))}
          </div>
        </ContactItem>

        {schoolContact.website && (
          <ContactItem icon={Globe} label="Website">
            <a
              href={`https://${schoolContact.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              {schoolContact.website}
            </a>
          </ContactItem>
        )}

        <ContactItem icon={Clock} label="Office Hours">
          {schoolContact.officeHours}
        </ContactItem>
      </div>
    </motion.div>
  );
};
